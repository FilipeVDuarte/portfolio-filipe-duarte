#!/usr/bin/env node
/**
 * generate-letterboxd-archive.mjs
 *
 * Runs ONCE to build src/data/letterboxd-archive.json with all diary films.
 *
 * Strategy:
 *  1. Read diary.csv + reviews.csv
 *  2. Fetch current RSS (last ~50 films)
 *  3. Identify CSV entries absent from RSS (the "old" films)
 *  4. Scrape og:image from each old film's Letterboxd page
 *  5. Merge RSS items + old scraped items → sort → save JSON
 *
 * Run: node scripts/generate-letterboxd-archive.mjs
 */

import fs   from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http  from 'node:http';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');
const RSS_URL   = 'https://letterboxd.com/pipo_criticas/rss/';
const OUT       = path.join(ROOT, 'src', 'data', 'letterboxd-archive.json');

// ── CSV parser ────────────────────────────────────────────────────────────────
// Handles quoted fields (including multiline) and "" escape sequences.
function parseCSV(content) {
  const rows = [];
  let row   = [];
  let field = '';
  let inQ   = false;

  for (let i = 0; i < content.length; i++) {
    const ch   = content[i];
    const next = content[i + 1];

    if (ch === '"') {
      if (inQ && next === '"') { field += '"'; i++; }
      else                     { inQ = !inQ; }
    } else if (ch === ',' && !inQ) {
      row.push(field); field = '';
    } else if (ch === '\r' && next === '\n' && !inQ) {
      row.push(field); field = '';
      rows.push(row);  row = [];
      i++;
    } else if (ch === '\n' && !inQ) {
      row.push(field); field = '';
      rows.push(row);  row = [];
    } else if (ch === '\r' && !inQ) {
      // lone CR – skip
    } else {
      field += ch;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }

  if (rows.length < 2) return [];
  const headers = rows[0].map(h => h.trim());
  return rows
    .slice(1)
    .filter(r => r.some(f => f.trim()))
    .map(r => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? '').trim()])));
}

// ── HTML helpers ──────────────────────────────────────────────────────────────
function decodeHtml(s) {
  return s
    .replace(/&amp;/g,  '&').replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>').replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'").replace(/&apos;/g, "'");
}

// Convert plain-text review (from CSV) to HTML paragraphs.
// Preserves any inline <b>/<i> tags already present.
function textToHtml(text) {
  if (!text || !text.trim()) return '';
  return text.trim()
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

// ── HTTP fetch with redirect following ───────────────────────────────────────
function fetchUrl(url, maxHops = 8) {
  return new Promise((resolve, reject) => {
    const go = (u, hops) => {
      const lib = u.startsWith('https') ? https : http;
      const req = lib.get(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120',
          'Accept':     'text/html,*/*',
        },
      }, res => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          if (hops >= maxHops) return reject(new Error('Too many redirects'));
          res.resume();
          const next = new URL(res.headers.location, u).href;
          return go(next, hops + 1);
        }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', c => (body += c));
        res.on('end', () => resolve({ url: u, body, status: res.statusCode }));
      });
      req.on('error', reject);
      req.setTimeout(15000, () => { req.destroy(new Error('Timeout')); });
    };
    go(url, 0);
  });
}

// ── RSS parser ────────────────────────────────────────────────────────────────
function parseRSS(xml) {
  const films  = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;

  while ((m = itemRe.exec(xml)) !== null) {
    const it  = m[1];
    const lbx = tag =>
      it.match(new RegExp(`<letterboxd:${tag}>([\\s\\S]*?)<\\/letterboxd:${tag}>`))?.[1]?.trim() ?? '';

    const watched = lbx('watchedDate');
    if (!watched) continue;

    const cdata      = it.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)?.[1] ?? '';
    const poster     = cdata.match(/src="(https:\/\/a\.ltrbxd\.com[^"]+)"/)?.[1] ?? '';
    const hasSpoiler = cdata.includes('This review may contain spoilers');

    const reviewHtml = cdata
      .replace(/<p>\s*<img[^>]*>\s*<\/p>/g, '')
      .replace(/<p>\s*<em>This review may contain spoilers\.<\/em>\s*<\/p>/g, '')
      .trim();

    const rStr = lbx('memberRating');
    const link = it.match(/<link>(https:\/\/letterboxd\.com[^<]+)<\/link>/)?.[1] ?? '';
    const guid = it.match(/<guid[^>]*>([^<]+)<\/guid>/)?.[1]?.trim() ?? '';

    films.push({
      guid,
      filmTitle:  decodeHtml(lbx('filmTitle')),
      filmYear:   lbx('filmYear'),
      rating:     rStr ? parseFloat(rStr) : 0,
      watched,
      month:      watched.slice(0, 7),
      rewatch:    lbx('rewatch') === 'Yes',
      like:       lbx('memberLike') === 'Yes',
      link,
      poster,
      reviewHtml,
      hasSpoiler,
    });
  }
  return films;
}

// ── og:image extractor ────────────────────────────────────────────────────────
function extractOgImage(html) {
  // Both attribute orderings: property first OR content first
  const m =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  const url = m?.[1] ?? '';
  // Only accept Letterboxd CDN or TMDb URLs (poster images)
  if (url.includes('a.ltrbxd.com') || url.includes('image.tmdb.org')) return url;
  // Fallback: look for a resized film-poster img src in the page
  const fb = html.match(/src="(https:\/\/a\.ltrbxd\.com\/resized\/film-poster[^"]+)"/);
  return fb?.[1] ?? '';
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // ── 1. Read CSVs ────────────────────────────────────────────────────────────
  console.log('📖  Reading CSV files…');
  const diaryCSV   = fs.readFileSync(path.join(ROOT, 'src/data/letterboxd/diary.csv'),   'utf-8');
  const reviewsCSV = fs.readFileSync(path.join(ROOT, 'src/data/letterboxd/reviews.csv'), 'utf-8');

  const diaryEntries   = parseCSV(diaryCSV);
  const reviewEntries  = parseCSV(reviewsCSV);
  console.log(`    diary.csv   → ${diaryEntries.length} entries`);
  console.log(`    reviews.csv → ${reviewEntries.length} entries`);

  // Build review map: Letterboxd URI → review text
  const reviewMap = {};
  for (const r of reviewEntries) {
    if (r['Letterboxd URI']) reviewMap[r['Letterboxd URI']] = r['Review'] ?? '';
  }

  // ── 2. Fetch RSS ────────────────────────────────────────────────────────────
  console.log('\n📡  Fetching RSS…');
  const { body: rssXml } = await fetchUrl(RSS_URL);
  const rssFilms = parseRSS(rssXml);
  console.log(`    RSS → ${rssFilms.length} items`);

  // Build RSS lookup: "normalised-title|watchedDate" → film object
  const rssMap = new Map();
  for (const f of rssFilms) {
    rssMap.set(`${f.filmTitle.toLowerCase()}|${f.watched}`, f);
  }

  // ── 3. Identify old CSV entries missing from RSS ────────────────────────────
  const oldEntries = diaryEntries.filter(d => {
    const key = `${d['Name'].toLowerCase()}|${d['Watched Date']}`;
    return !rssMap.has(key);
  });

  console.log(`\n🔍  ${oldEntries.length} CSV entries not in RSS (will be scraped):`);
  oldEntries.forEach(e => console.log(`     • ${e['Name']} (${e['Year']})  [${e['Watched Date']}]`));

  // ── 4. Scrape posters for old entries ───────────────────────────────────────
  const scraped = [];
  for (let i = 0; i < oldEntries.length; i++) {
    const entry = oldEntries[i];
    const label = `${entry['Name']} (${entry['Year']})`;
    console.log(`\n[${i + 1}/${oldEntries.length}]  ${label}`);

    let poster       = '';
    let resolvedLink = entry['Letterboxd URI'];

    try {
      const { url: resolvedUrl, body: html, status } = await fetchUrl(entry['Letterboxd URI']);
      resolvedLink = resolvedUrl;
      poster       = extractOgImage(html);
      console.log(`    status : ${status}`);
      console.log(`    link   : ${resolvedLink}`);
      console.log(`    poster : ${poster ? poster.slice(0, 72) + '…' : '(none)'}`);
    } catch (err) {
      console.warn(`    ⚠ scrape failed: ${err.message}`);
    }

    const reviewText = reviewMap[entry['Letterboxd URI']] ?? '';

    scraped.push({
      guid:       entry['Letterboxd URI'],
      filmTitle:  entry['Name'],
      filmYear:   entry['Year'],
      rating:     parseFloat(entry['Rating']) || 0,
      watched:    entry['Watched Date'],
      month:      entry['Watched Date'].slice(0, 7),
      rewatch:    entry['Rewatch'] === 'Yes',
      like:       false,
      link:       resolvedLink,
      poster,
      reviewHtml: textToHtml(reviewText),
      hasSpoiler: false,
    });

    if (i < oldEntries.length - 1) await sleep(700);
  }

  // ── 5. Merge: scraped old + RSS (RSS wins on duplicates) ────────────────────
  const merged = new Map();
  for (const f of scraped) {
    merged.set(`${f.filmTitle.toLowerCase()}|${f.watched}`, f);
  }
  for (const f of rssFilms) {
    merged.set(`${f.filmTitle.toLowerCase()}|${f.watched}`, f);
  }

  const allFilms = Array.from(merged.values());
  allFilms.sort((a, b) => b.watched.localeCompare(a.watched));

  // ── 6. Save ─────────────────────────────────────────────────────────────────
  fs.writeFileSync(OUT, JSON.stringify(allFilms, null, 2), 'utf-8');

  const missing = allFilms.filter(f => !f.poster);
  console.log(`\n✅  Saved ${allFilms.length} films → ${path.relative(ROOT, OUT)}`);
  console.log(`    With poster  : ${allFilms.length - missing.length}`);
  console.log(`    Without poster: ${missing.length}`);
  if (missing.length) {
    console.log('    Missing:');
    missing.forEach(f => console.log(`      • ${f.filmTitle} (${f.filmYear})`));
  }
}

main().catch(err => { console.error('\n💥 Fatal:', err); process.exit(1); });

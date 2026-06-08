# Portfolio — Filipe Duarte

**Diretor Criativo & Desenvolvedor**  
Site: [filipeduarte.netlify.app](https://filipeduarte.netlify.app)

Portfolio pessoal com design Neo-Brutalista, suporte a PT/EN, modo escuro e estudos de caso documentados.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Astro 6.4.2 (output estático) |
| Estilização | CSS3 puro com custom properties |
| Interatividade | Vanilla JavaScript |
| Animações | CSS transitions + Lottie.js |
| Fontes | Self-hosted WOFF2 (Syne, Inter, Space Mono) |
| Dados | JSON, CSV (integração Letterboxd) |
| Hosting | Netlify |
| Build | Clean-CSS + Astro CLI |
| Node | 22 |

---

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # minifica CSS + build Astro → dist/
npm run preview      # preview do build estático
```

---

## Estrutura do Projeto

```
portfolio-filipe-duarte/
├── src/
│   ├── pages/
│   │   ├── index.astro                # Homepage
│   │   ├── projetos.astro             # Grade de projetos filtrável
│   │   ├── sobre.astro                # Sobre / carreira
│   │   ├── criticas.astro             # Críticas de filmes (Letterboxd)
│   │   ├── kit.astro                  # Design system / componentes
│   │   └── projetos/                  # Estudos de caso
│   │       ├── mobi_studio.astro
│   │       ├── mobi_3d.astro
│   │       ├── mobi_estampas.astro
│   │       ├── mobi_ric.astro
│   │       ├── mobi_alcas.astro
│   │       ├── mobi_namorados.astro
│   │       ├── mobi_placas.astro
│   │       ├── animas_cavalry.astro
│   │       ├── cavaleiro_de_latao.astro
│   │       └── unisenac_vivencias.astro
│   ├── layouts/
│   │   ├── Base.astro                 # Layout mestre (meta, nav, footer)
│   │   └── CaseStudy.astro            # Template para estudos de caso
│   ├── components/
│   │   ├── Nav.astro                  # Header + menu mobile
│   │   ├── Footer.astro               # Footer (variante minimal / contato)
│   │   ├── CustomCursor.astro         # Cursor SVG contextual
│   │   ├── CaseAssetGallery.astro     # Galeria de assets por fase
│   │   ├── CaseMethodology.astro      # Cards de metodologia
│   │   └── CaseRepoStats.astro        # Cards de stats do repositório
│   └── data/
│       ├── letterboxd/                # Exports CSV do Letterboxd
│       └── letterboxd-archive.json    # JSON consolidado de filmes
├── public/
│   ├── css/
│   │   ├── style.css                  # Stylesheet principal (~5000 linhas)
│   │   ├── style.min.css              # Versão minificada (gerada no build)
│   │   └── case.css                   # Estilos específicos de estudos de caso
│   ├── js/
│   │   ├── main.js                    # Interações, i18n, tema, filtros
│   │   └── lottie.min.js              # Player Lottie
│   ├── assets/
│   │   ├── fonts/                     # WOFF2 self-hosted
│   │   ├── Anima_hero.json            # Animação Lottie do hero
│   │   ├── i18n.json                  # Traduções PT ↔ EN
│   │   ├── FD - Wordmark.svg          # Logotipo
│   │   └── Mouse_*.svg                # Cursores (4 variantes × 2 temas)
│   ├── img/
│   │   ├── og-image.jpg               # OG meta image (claro)
│   │   ├── og-image-dark.jpg          # OG meta image (escuro)
│   │   └── webp/                      # Banners responsivos dos projetos
│   ├── projetos/                      # Assets dos estudos de caso
│   │   ├── mobi_studio/
│   │   ├── mobi_3d/
│   │   ├── mobi_estampas/
│   │   ├── mobi_ric/
│   │   ├── mobi_alcas/
│   │   ├── mobi_namorados/
│   │   ├── mobi_placas/
│   │   ├── animas_cavalry/
│   │   ├── cavaleiro_de_latao/
│   │   └── unisenac_vivencias/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt                       # Contexto para modelos de IA
├── scripts/
│   └── generate-letterboxd-archive.mjs  # Processa CSVs → JSON consolidado
├── astro.config.mjs
├── netlify.toml
└── package.json
```

---

## Páginas

| Rota | Página |
|------|--------|
| `/` | Homepage com hero animado, projetos em destaque e contato |
| `/projetos` | Grade com 13 projetos filtrável por categoria |
| `/sobre` | Timeline de carreira, certificações e depoimentos |
| `/criticas` | Críticas de filmes integradas ao Letterboxd |
| `/kit` | Design system com tipografia, cores e componentes |

### Estudos de Caso (`/projetos/*`)

| Slug | Projeto |
|------|---------|
| `mobi_studio` | Customizador interativo de capas (Canvas API) |
| `mobi_3d` | Renders e animações 3D de produtos |
| `mobi_estampas` | Mais de 70 estampas autorais |
| `mobi_ric` | Identidade visual — Rap In Cena festival |
| `mobi_alcas` | Campanha de alças de bolsa |
| `mobi_namorados` | Audiovisual de Dia dos Namorados |
| `mobi_placas` | Gráficos para placas, carteiras e bolsas |
| `animas_cavalry` | 19 experimentos de motion design procedural |
| `cavaleiro_de_latao` | Jogo roguelike em Godot |
| `unisenac_vivencias` | Identidade visual universitária |

---

## Design System

**Estética:** Neo-Brutalista — bordas sólidas, sombras offset sem blur, cores de alta saturação.

**Fontes:**
- Display: Syne (variável 100–900)
- Corpo: Inter (variável)
- Mono: Space Mono (400, 700)

**Tokens principais (CSS Custom Properties):**
- Cores: `--color-bg`, `--color-ink`, `--color-yellow`, `--color-teal`, `--color-pink`, `--color-purple`
- Tipografia: escala fluida com `clamp()` de `--text-xs` até `--text-hero`
- Espaçamento: `--space-1` a `--space-32` (0.25rem – 8rem)
- Sombras: offset 3px–12px, sem blur (Neo-Brutalista)
- Transições: `--transition-fast` (120ms), `--transition-base` (220ms)

**Modo escuro:** sobrescreve todos os tokens via `html[data-theme="dark"]`.

---

## Funcionalidades

- **i18n PT/EN** — atributos `data-en` para tradução client-side
- **Dark Mode** — toggle com persistência de sessão
- **Cursor customizado** — 4 estados (padrão, hover, click, click+hover) × 2 temas
- **Filtro de projetos** — filtragem por categoria sem reload
- **Carrossel de certificações** — draggable/swipeable
- **Reveal on scroll** — IntersectionObserver
- **Integração Letterboxd** — RSS + CSV → JSON consolidado
- **SEO completo** — JSON-LD, OG tags, canonical, sitemap, robots.txt

---

## SEO & Meta

- JSON-LD: `Person`, `WebSite`, `CollectionPage`, `Article` (por estudo de caso)
- OG/Twitter tags em todas as páginas
- Canonical URLs apontando para `filipeduarte.netlify.app`
- Sitemap XML e robots.txt

---

## Deploy

Hospedado na **Netlify** com deploy automático a partir do branch `main`.

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

---

## Integração Letterboxd

Os dados de filmes são gerados localmente a partir dos exports CSV do Letterboxd:

```bash
node scripts/generate-letterboxd-archive.mjs
```

O script consolida ratings, reviews, diary, likes e dados do RSS em um único `src/data/letterboxd-archive.json` consumido pela página `/criticas`.

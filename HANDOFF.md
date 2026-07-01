# HANDOFF — Portfólio Filipe Duarte

> **Documento principal de referência do projeto.** Consulte aqui antes de mexer em qualquer
> parte do site — arquitetura, convenções, pendências conhecidas e histórico de sessões ficam
> todos neste arquivo. Ao terminar uma sessão de trabalho relevante, **atualize as seções
> pertinentes acima** e adicione uma entrada no [Log de sessões](#log-de-sessões) no final.
>
> Última atualização: 2026-07-01

---

## 1. O que é este projeto

Portfólio pessoal de **Filipe Duarte** (Produtor Multimídia / Direção de Arte) — site estático
com estudos de caso de branding, motion design, desenvolvimento web e um jogo (Godot).

- **Produção:** https://filipeduarte.netlify.app
- **Repo:** https://github.com/FilipeVDuarte/portfolio-filipe-duarte (branch `main`, deploy automático via Netlify a cada push)
- **Licença:** CC BY-NC-ND 4.0 ([LICENSE.md](LICENSE.md)) — visualização/compartilhamento com atribuição permitidos; uso comercial e obras derivadas, não.

## 2. Stack

| Camada         | Tecnologia                                                     |
| -------------- | ---------------------------------------------------------------|
| Framework      | [Astro](https://astro.build) 6.4.2 — `output: 'static'`, `build.format: 'file'` (preserva URLs `.html`) |
| Estilização  | CSS3 puro, custom properties, Neo-Brutalista (bordas sólidas, sombras duras deslocadas) |
| Interatividade | Vanilla JavaScript (`public/js/main.js`)                        |
| Animações    | Lottie.js + CSS transitions                                     |
| Fontes         | Self-hosted WOFF2 — Syne (display), Inter (body), Space Mono (mono) |
| Dados          | JSON + CSV (integração Letterboxd, ver seção 6)                 |
| Deploy         | Netlify, Node 22 (`netlify.toml`)                                |

Não há framework de UI (React/Vue/etc). Astro é usado só como compositor de templates
(`.astro` = HTML + frontmatter JS/TS, sem hidratação client-side de componentes).

## 3. Estrutura de pastas

```
src/
  layouts/
    Base.astro        # <head>, nav, footer, cursor customizado, main.js — usado por TODAS as páginas
    CaseStudy.astro    # estende Base, injeta case.css, expõe slot "head-extra"
  components/
    Nav.astro, Footer.astro, CustomCursor.astro
    CaseAssetGallery.astro, CaseMethodology.astro, CaseRepoStats.astro   # usados nos estudos de caso
  pages/
    index.astro, projetos.astro, sobre.astro, criticas.astro, kit.astro
    projetos/*.astro   # 10 estudos de caso (ver tabela na seção 4)
  data/
    letterboxd-archive.json     # arquivo consolidado (gerado 1x pelo script, ver seção 6)
    letterboxd/*.csv            # export bruto do Letterboxd (diary, reviews, ratings, watched, etc.)

public/
  css/style.css        # FONTE do CSS — editar sempre aqui
  css/style.min.css     # GERADO — é isto que o site realmente carrega (ver seção 5, gotcha)
  css/case.css          # CSS compartilhado dos estudos de caso
  assets/               # SVGs de cursor, fontes, i18n.json, Lottie JSON
  img/, projetos/       # imagens WebP e vídeos .webm de hover dos cases

scripts/
  generate-letterboxd-archive.mjs   # script local, roda sob demanda (não faz parte do build)

_docs/                  # documentação auxiliar (NÃO faz parte do site, só referência/histórico)
  DESIGN.md                          # design tokens em YAML (cores, tipografia, spacing, sombras)
  ACTION-PLAN.md, FULL-AUDIT-REPORT.md   # auditoria de SEO de 2026-05-20 (score 64/100 na época)
  FILIPE_DUARTE_BIBLIA.md            # arquivo-fonte universal de bio/currículo (site, LinkedIn, CV)
  filipe-duarte-portfolio-completo.md
  ProjetoCavaleiro/                  # projeto Godot completo (assets do jogo "Cavaleiro de Latão")

.github/workflows/rebuild-rss.yml   # cron diário que aciona rebuild no Netlify (ver seção 7)
```

## 4. Páginas e rotas

| Rota            | Conteúdo                                          |
| --------------- | -------------------------------------------------- |
| `/`           | Homepage                                            |
| `/projetos`   | Grade de projetos (filtro por categoria, sem reload) |
| `/sobre`      | Trajetória e carreira                              |
| `/criticas`   | Diário de Cinema — críticas do Letterboxd         |
| `/kit`        | Design system / style guide                        |

### Estudos de caso (`/projetos/<slug>`)

| Slug                 | Projeto                                        |
| --------------------- | ----------------------------------------------- |
| `mobi_studio`        | Customizador interativo de capas (Canvas API)   |
| `mobi_3d`            | Renders e animações 3D de produtos            |
| `mobi_estampas`      | +70 estampas autorais                           |
| `mobi_ric`           | Identidade — Rap In Cena festival              |
| `mobi_alcas`         | Campanha de alças                              |
| `mobi_namorados`     | Audiovisual — Dia dos Namorados                |
| `mobi_placas`        | Gráficos para placas e carteiras               |
| `animas_cavalry`     | 19 experimentos de motion procedural (Cavalry)  |
| `cavaleiro_de_latao` | Jogo roguelike em Godot                         |
| `unisenac_vivencias` | Identidade visual universitária                |

**Para adicionar um novo estudo de caso:** copie um arquivo existente em `src/pages/projetos/`,
ajuste o frontmatter/props e o conteúdo. Nav, footer e CSS já vêm de `Base`/`CaseStudy` — não
precisa tocar neles.

## 5. Sistema de design

Tokens completos em [_docs/DESIGN.md](_docs/DESIGN.md) (YAML). Resumo:

- **Cor de marca:** amarelo `#FFC300`. Fundo `#F2F0EF` / tinta `#1b1b1d` no light mode.
- **Dark mode:** troca de custom properties via `data-theme="dark"` no `<html>` (não é
  duplicação de CSS — ver `CustomCursor.astro` para exemplo de como o JS observa essa mudança).
- **Tipografia:** Syne (display), Inter (body), Space Mono (mono/tags) — escala fluida com `clamp()`.
- **Elevação:** sombras duras deslocadas (`3px 3px 0 var(--color-ink)` até `12px 12px 0`), sem blur.
- **Pills/tags:** desde 2026-07-01, todo elemento tipo pill (`.tag`, `.hero__status-dot`,
  `.hero__role`, `.tech-tag`) usa fundo branco + texto tinta, sem sombra, `border-radius: var(--radius-pill)` (999px) — ver changelog na seção 9.

**⚠️ Gotcha crítico:** o site carrega `public/css/style.min.css`, **não** `style.css`. Editar só
a fonte não tem efeito nenhum em produção nem no build. Sempre que alterar `style.css`, rodar:
```bash
npm run build:css   # ou npm run build, que já inclui esse passo
```

**Gotcha Astro:** `{` e `}` dentro de texto de template `.astro` são interpretados como
expressões JS. Blocos de código (ex. JS de exemplo em `mobi_studio.astro`) precisam ser
definidos como string no frontmatter e injetados com `set:html={codeBlock}` — nunca `{` literal
no corpo do template.

**Gotcha `<style is:global>`:** evitar CSS global dentro de componentes/layouts `.astro`
(causou erros de parse do esbuild tipo "Expected } but found res"). Usar arquivo estático em
`public/css/` em vez disso.

## 6. Cursor customizado

[src/components/CustomCursor.astro](src/components/CustomCursor.astro) — `<div id="custom-cursor">`
posicionado via JS (`mousemove`), 4 estados (default/hover/click/click-hover) × 2 temas
(light/dark), SVGs em `public/assets/Mouse_*.svg`. Desabilitado em ponteiros "coarse" (touch).
O CSS força `cursor: none !important` globalmente (`public/css/style.css:3251`, commit `1ebea9a`).

**Bug conhecido, não resolvido:** usuário relata que em produção o cursor nativo do SO ainda
aparece por baixo do cursor customizado. Não reproduzido localmente (ferramentas de automação
não renderizam cursor real do SO). Ver pendências na seção 9.

## 7. Integração Letterboxd (`/criticas`)

Fluxo de dados em duas camadas:

1. **Arquivo consolidado** — `src/data/letterboxd-archive.json`, gerado uma vez por
   [scripts/generate-letterboxd-archive.mjs](scripts/generate-letterboxd-archive.mjs): lê os
   CSVs de export (`src/data/letterboxd/*.csv`), busca o RSS atual, identifica filmes do CSV
   que não estão mais no RSS (os "antigos"), faz scraping do `og:image` de cada um, e funde
   tudo num JSON ordenado. **Roda sob demanda** (`node scripts/generate-letterboxd-archive.mjs`),
   não faz parte do `npm run build`.
2. **Overlay de RSS fresco** — [src/pages/criticas.astro](src/pages/criticas.astro) busca
   `https://letterboxd.com/pipo_criticas/rss/` via `fetch` **no frontmatter**, ou seja, **só no
   momento do build** (o site é estático). Isso sobrepõe os ~50 itens mais recentes do RSS por
   cima do arquivo consolidado (chave: `título-normalizado|data-assistido`).

**Consequência:** uma atualização no Letterboxd sozinha nunca aparece no site — precisa de um
novo build/deploy. Ver seção 8 para o workflow que resolve isso.

## 8. Build & Deploy

```bash
npm install
npm run dev          # astro dev — servidor local
npm run build:css    # cleancss: style.css → style.min.css
npm run build        # build:css + astro build → dist/
npm run preview      # preview do build estático
```

- **Netlify** ([netlify.toml](netlify.toml)): `command = npm run build`, `publish = dist`,
  Node 22. Dispara automaticamente a cada `git push` na branch conectada.
- **Rebuild agendado** ([.github/workflows/rebuild-rss.yml](.github/workflows/rebuild-rss.yml)):
  roda todo dia às 08:00 (America/Sao_Paulo) + trigger manual (aba Actions → "Run workflow").
  Faz um `POST` num **Build Hook** do Netlify usando o secret `NETLIFY_BUILD_HOOK`. Existe para
  manter `/criticas` atualizada sem depender de um push manual (ver seção 7).

## 9. Pendências conhecidas

### ⚠️ Secret `NETLIFY_BUILD_HOOK` não configurado (confirmado via `gh secret list` em 2026-07-01 — lista vazia)
O workflow de rebuild diário existe mas **vai falhar** até isso ser configurado:
1. Netlify → Site settings → Build & deploy → Build hooks → **Add build hook** (branch `main`). Copiar a URL.
2. GitHub → repo Settings → Secrets and variables → Actions → **New repository secret** →
   nome `NETLIFY_BUILD_HOOK`, valor = URL do passo 1.
3. Depois disso o workflow funciona sozinho (cron diário + botão manual).

Isso não pode ser feito via CLI sem acesso aos dois painéis — ação pendente do usuário.

### ❓ Cursor nativo visível por baixo do customizado (produção)
Não reproduzido localmente. Hipóteses: deploy do Netlify desatualizado em relação ao `main`
(mesma causa-raiz da pendência acima), ou comportamento específico de navegador/SO/acessibilidade.
**Próximos passos:** confirmar no painel Netlify se o último deploy corresponde ao commit mais
recente; se sim, reproduzir com o usuário (navegador/SO exatos, se acontece em toda página ou só
sobre elementos específicos como `<video>`/iframes, se hard-refresh resolve).

### Consistência de pills pendente (menor)
`.cd-chip` em [src/pages/criticas.astro](src/pages/criticas.astro) (chips do Diário de Cinema)
não foi incluído na padronização de pills de 2026-07-01 (não foi pedido pelo usuário, e já não
tinha `box-shadow`). Candidato a uma passada de consistência futura.

## 10. Docs auxiliares em `_docs/`

Não fazem parte do site — são referência para quem trabalha no projeto:

- **DESIGN.md** — design tokens completos em YAML (fonte de verdade para cores/tipografia/spacing).
- **ACTION-PLAN.md** / **FULL-AUDIT-REPORT.md** — auditoria de SEO de 2026-05-20 (score 64/100
  na época; `robots.txt`/`sitemap.xml` já existem na raiz, conferir se as demais recomendações
  críticas foram aplicadas antes de reauditar).
- **FILIPE_DUARTE_BIBLIA.md** / **filipe-duarte-portfolio-completo.md** — arquivo-fonte universal
  de bio, currículo e pitches (usado para manter site, LinkedIn e CV consistentes).
- **ProjetoCavaleiro/** — projeto Godot completo (assets, addons, licença) do jogo referenciado
  no case `cavaleiro_de_latao`. Pasta pesada (muitos binários), não precisa ser tocada para
  trabalhar no site.

## 11. Convenções gerais

- Site é **bilíngue PT/EN** via atributos `data-en` + tradução client-side (`main.js`) — texto
  em português é o padrão/fallback no HTML.
- Sempre confirmar escopo antes de mudanças visuais amplas ("só a home" vs "todo o site").
- Rodar `npm run build:css` sempre que `style.css` for editado (gotcha da seção 5).
- Verificar visualmente em light **e** dark mode antes de considerar uma mudança de CSS concluída.

---

## Log de sessões

> Entradas mais recentes no topo. Histórico de decisões e descobertas pontuais — para o estado
> atual/arquitetura, veja as seções acima.

### 2026-07-01

**Pedido:** RSS do Letterboxd desatualizado em `/criticas`; cursor nativo do SO visível por
baixo do customizado em produção; pills não-clicáveis (badges como "Disponível para
oportunidades", "Porto Alegre e Região Metropolitana", pills de papel) pareciam botões
clicáveis demais.

**Feito:**
- **Pills (resolvido, escopo: todo o site):** novo token `--radius-pill: 999px`; `.tag` (base +
  variantes dark/red/green/blue), `.hero__status-dot`, `.hero__role` e `.tech-tag` achatados
  para fundo branco + texto tinta, sem `box-shadow`, com border-radius cápsula. Removidas
  cores por `nth-child` (teal/roxo/rosa) do `.hero__role` e os overrides de dark mode que só
  existiam para essas cores. CSS minificado regenerado (`npm run build:css`). Verificado em
  light/dark mode, home e `/projetos`, sem erros de console. Detalhes na seção 5.
- **RSS (parcialmente resolvido):** causa raiz confirmada — site estático, fetch só roda no
  build, sem automação prévia. Criado `.github/workflows/rebuild-rss.yml` (cron diário +
  manual). **Falta:** configurar secret `NETLIFY_BUILD_HOOK` (ver seção 9 — pendência do
  usuário, não pode ser feito via CLI).
- **Cursor (não resolvido):** código revisado e correto (`cursor: none !important` aplicado,
  confirmado via `getComputedStyle` no `astro dev` local). Não reproduzido localmente — bug só
  ocorre em produção segundo o usuário. Investigação requer acesso ao painel Netlify e/ou
  reprodução ao vivo com o usuário (ver seção 9).
- **Consolidação:** este arquivo (`HANDOFF.md`) foi reescrito como documento de referência
  principal do projeto (era antes um log de sessão único), consolidando stack, estrutura,
  design system, integração Letterboxd, build/deploy e pendências.

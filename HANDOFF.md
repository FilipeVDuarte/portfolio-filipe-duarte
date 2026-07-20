# HANDOFF — Portfólio Filipe Duarte

> **Documento principal de referência do projeto.** Consulte aqui antes de mexer em qualquer
> parte do site — arquitetura, convenções, pendências conhecidas e histórico de sessões ficam
> todos neste arquivo. Ao terminar uma sessão de trabalho relevante, **atualize as seções
> pertinentes acima** e adicione uma entrada no [Log de sessões](#log-de-sessões) no final.
>
> Última atualização: 2026-07-19

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
| `serra_gaucha`       | Branding territorial — Concurso Marca SERRA GAÚCHA (G30), 49 municípios |
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

### ✅ Secret `NETLIFY_BUILD_HOOK` configurado e workflow validado (2026-07-06)
Secret criado em 2026-07-05T17:29:31Z (confirmado via `gh secret list`). As 5 execuções
anteriores (`gh run list`) falharam por terem rodado **antes** do secret existir — todas
com duração de 5-9s, batendo no `exit 1` do guard clause. Disparei manualmente
(`gh workflow run rebuild-rss.yml`) em 2026-07-06 14:11 UTC para confirmar: **sucesso**
(run `28797932700`, o `curl -sf` para o Build Hook retornou OK). O workflow está
funcional; só falta observar se a próxima execução agendada (`0 11 * * *`) dispara
normalmente (o cron do GitHub Actions costuma atrasar 1-2h em horários de pico, não é bug).

### ❓ Cursor nativo visível por baixo do customizado (produção)
Não reproduzido localmente. Hipóteses: deploy do Netlify desatualizado em relação ao `main`
(mesma causa-raiz da pendência acima), ou comportamento específico de navegador/SO/acessibilidade.
**Próximos passos:** confirmar no painel Netlify se o último deploy corresponde ao commit mais
recente; se sim, reproduzir com o usuário (navegador/SO exatos, se acontece em toda página ou só
sobre elementos específicos como `<video>`/iframes, se hard-refresh resolve).

### ✅ Imagens da galeria "Serra Gaúcha" otimizadas (2026-07-19)
Ao criar o case `serra_gaucha` (2026-07-18), as imagens de aplicações tinham sido
copiadas em alta resolução (4000×2667px+, até 6.6MB cada) sem otimização. Confirmado em
2026-07-19: `public/projetos/serra_gaucha/aplicacoes/*.webp` já existe (24K–164K cada) e
`serra_gaucha.astro` referencia essas versões `.webp` — pendência resolvida.

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

### 2026-07-19 — Fix mobile: card flutuante na seção "Processo & Solução" (Serra Gaúcha)

**Pedido:** na versão mobile do case `serra_gaucha`, seção 03 ("Processo & Solução"), o card
da imagem (`.symbol-story__media`) trocava de imagem mas ficava parado no topo, sem acompanhar
o scroll como no desktop (que usa `position: sticky` + `translateY` calculado). Pedido: enquanto
o texto 01 estiver em foco, o card fica onde está; a partir do texto 02, o card passa a "flutuar"
sobre o texto anterior (02 sobre 01, 03 sobre 02, 04 sobre 03), permanecendo sobre o 04 até o fim
da seção, com o mesmo comportamento invertido ao rolar para cima.

**Feito:** em [src/pages/projetos/serra_gaucha.astro](src/pages/projetos/serra_gaucha.astro),
reaproveitado o `IntersectionObserver` que já existia (trocava texto/imagem ativos):
- JS: `setActive()` agora também alterna a classe `is-pinned` no `.symbol-story__media` — ativa
  a partir do step 2, desativa ao voltar para o step 1.
- CSS: nova regra `@media (max-width: 799px) { .symbol-story__media.is-pinned { position:
  sticky; top: calc(60px + var(--space-4)); z-index: 5; } }` — o desktop (`min-width: 800px`)
  já tinha seu próprio `sticky` sempre ativo, não foi tocado.

**Verificação:** `astro dev` em porta alternativa (a 4321 já estava ocupada por outro processo
não relacionado ao preview), viewport mobile 375×812. Automação de scroll via `scrollIntoView`/
`scrollTo` se mostrou pouco confiável para dar tempo do `IntersectionObserver` disparar (efeito
de scroll simulado, não bug do código); validado de forma direta via `getComputedStyle` +
`getBoundingClientRect`: com a classe `is-pinned` ativa, o card fica em `position: sticky`,
`top: 76px`, e o texto 01 confirmadamente passa por baixo dele (`overlapsStep1: true`). Aprovado
pelo usuário.

### 2026-07-18 a 2026-07-19 — Novo case "Serra Gaúcha — Raiz e Colheita"

**Pedido:** criar página de estudo de caso para o projeto de branding territorial
"Serra Gaúcha — Raiz e Colheita" (Concurso de Criação da Marca SERRA GAÚCHA / G30),
incluindo um leitor de PDF embutido para o Manual de Identidade Visual; depois, revisar
e fechar a página de projetos (banner do card + comportamento de hover).

**Feito:**
- **Novo case criado:** `src/pages/projetos/serra_gaucha.astro`, seguindo o padrão de
  `mobi_3d.astro` (layout `CaseStudy.astro`). Seções: hero, contexto/briefing (49
  municípios, 4 pilares, prazo de 17 dias), papel no projeto, processo/solução (conceito
  "Raiz e Colheita", símbolo gralha-azul/araucária), mapa interativo dos municípios por
  microrregião (SVG + JS inline), leitor de documentos com abas (MIV / Defesa Conceitual
  / Aplicações Exemplificadas, via `<iframe>` + botão de download), galeria de aplicações
  (mockups de vinho, geleia, chá, placas, outdoor, gravura em madeira), e resultado
  (honesto: projeto não avançou aos 10 semifinalistas de 48 propostas).
- **Assets:** `pdf/`, `logos/` (expandido para lockups — Default, Duo Color, Selo, em
  variações horizontal/vertical/cor — substituindo o set antigo de 5 PNGs de logo),
  `aplicacoes/*.webp` (imagens de mockup otimizadas, 24K–164K cada, eram JPGs/PNGs de até
  6.6MB na versão inicial), `Banner_KeyVisual.png` e `Banner_portfolio.png` (banner
  separado para o card da listagem), `Tokens de Cor - Paleta Definitiva.json`,
  `mapa-municipios.svg`.
- **Listagem (`projetos.astro`):** card do case adicionado no topo do grid (categoria
  `design-grafico`), contador de filtro em "14 projetos". Banner do card trocado de
  `Banner_KeyVisual.png` para `Banner_portfolio.png` (consistência com o hero do case).
  Removida a classe `proj-card__static` da imagem do card — sem vídeo de hover para esse
  projeto, a classe fazia a imagem sumir (`opacity: 0`) ao passar o mouse, já que essa
  regra CSS existe para dar lugar a um `<video class="proj-card__hover">` que este card
  não tem. Confirmado via `getComputedStyle` que a opacidade permanece `1` no hover.
- **Imagens da galeria:** confirmado que já estavam otimizadas em `.webp` e que a página
  referencia essas versões (não os originais grandes) — ver seção 9.
- **HANDOFF-serra-gaucha-page.md removido** (era um handoff temporário da sessão anterior
  que criou a página; conteúdo relevante consolidado aqui).

**Notas:**
- Página revisada e aprovada pelo usuário antes do fechamento desta sessão.
- Leitor de PDF via `<iframe>` não foi testado em mobile Safari/iOS nesta sessão (pode
  forçar download em vez de preview inline) — considerar se vale a pena revisitar.

### 2026-07-06 — Verificação de saúde geral

**Pedido:** conferir se está tudo funcionando corretamente.

**Verificado:**
- **Pills:** `--radius-pill`, `.tag`, `.hero__status-dot`, `.hero__role` e `.tech-tag`
  continuam corretos em `style.css` e `style.min.css` (commitados). Re-testado
  visualmente no `astro dev` (light/dark) — sem erros de console.
- **Build de produção:** `npm run build` completo sem erros — 15 páginas geradas.
- **Workflow de rebuild:** secret `NETLIFY_BUILD_HOOK` **já foi configurado pelo usuário**
  (criado 2026-07-05T17:29:31Z). As execuções agendadas de 07-02 a 07-05 falharam porque
  rodaram antes do secret existir. Disparei manualmente (`gh workflow run rebuild-rss.yml`)
  para validar com o secret já presente → **sucesso** (run `28797932700`). Workflow
  confirmado funcional — ver seção 9.
- **Cursor duplicado:** segue não reproduzido/não resolvido — nada de novo a reportar,
  continua exigindo reprodução ao vivo (ver seção 9).
- 17 arquivos fora do escopo desta tarefa seguem modificados e não commitados na árvore
  de trabalho (`main.js`, `Footer.astro`, várias páginas — provavelmente trabalho de i18n
  em andamento). Não foram tocados nem commitados por mim.

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

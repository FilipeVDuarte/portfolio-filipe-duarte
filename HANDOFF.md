# Handoff — Sessão 2026-07-01

> Este arquivo documenta apenas o que foi feito/descoberto nesta sessão.
> Será preenchido/completado em uma sessão futura.

## Pedido original

1. RSS do Letterboxd está atualizado na fonte, mas a página `/criticas` não reflete isso.
2. Cursor personalizado aparece, mas o cursor nativo do SO continua visível por baixo dele.
3. Pills não-clicáveis (ex.: "Disponível para oportunidades", "Porto Alegre e Região
   Metropolitana", pills de papel como "Programação") se parecem demais com botões
   clicáveis. Pedido: inverter cores (fundo branco, texto preto), remover sombra de
   elevação, adicionar arredondamento suave estilo Apple.

## O que foi feito

### ✅ Pills (resolvido)
Escopo confirmado com o usuário: aplicar em **todo o site**, não só na home.

- Arquivo: [public/css/style.css](public/css/style.css)
- Novo token `--radius-pill: 999px` (formato cápsula, confirmado com o usuário).
- `.tag` (base) e todas as variantes (`.tag--dark/red/green/blue`) achatadas para
  `background: var(--color-white); color: var(--color-ink);` — sem `box-shadow`,
  com `border-radius: var(--radius-pill)`. `.tag--ghost` mantido (transparente).
- `.hero__status-dot` — mesmo tratamento (era `--color-teal` + sombra).
- `.hero__role` (pills "3D / Programação / Design / UX/UI / Audiovisual") —
  removidas as cores por `nth-child` (teal/roxo/rosa) e a sombra; removidos também
  os overrides de dark mode que só existiam para corrigir contraste dessas cores
  (não são mais necessários).
- `.tech-tag` — já não tinha sombra/cor, só recebeu o `border-radius` para manter a
  mesma linguagem visual de "pill" no site.
- **Rebuild do CSS minificado**: `npm run build:css` foi rodado (o site carrega
  `style.min.css`, não `style.css` — editar só a fonte não é suficiente).
- **Fora do escopo, propositalmente não tocado**: `.cd-chip` em
  [src/pages/criticas.astro](src/pages/criticas.astro) (chips do Diário de Cinema) —
  não foi mencionado pelo usuário e já não tem `box-shadow`. Ficou pendente de uma
  eventual passada de consistência futura.
- Verificado visualmente via preview (light e dark mode, home e `/projetos`) — sem
  erros de console.

### ⚠️ RSS não atualiza (parcialmente resolvido — falta ação do usuário)

**Causa raiz confirmada no código:** o site é estático (`astro.config.mjs` →
`output: 'static'`). [src/pages/criticas.astro](src/pages/criticas.astro) busca o RSS
do Letterboxd via `fetch` no frontmatter — isso só roda **no momento do build**. Não
havia nenhum GitHub Action nem build hook agendado no repositório, então a página só
reflete o Letterboxd quando alguém dá `git push` (o que dispara o deploy automático
do Netlify) — atualizações no Letterboxd sozinhas nunca chegam ao site.

**O que foi criado:** [.github/workflows/rebuild-rss.yml](.github/workflows/rebuild-rss.yml)
— roda todo dia às 08:00 (horário de Brasília) e também pode ser disparado manualmente
pela aba Actions do GitHub. Ele faz um `POST` num Build Hook do Netlify usando o secret
`NETLIFY_BUILD_HOOK`.

**Ação pendente do usuário (não posso fazer isso sem acesso ao painel):**
1. No Netlify: Site settings → Build & deploy → Build hooks → **Add build hook**
   (branch `main`). Copiar a URL gerada.
2. No GitHub: Settings → Secrets and variables → Actions → **New repository secret**
   → nome `NETLIFY_BUILD_HOOK`, valor = URL do passo 1.
3. Depois disso o workflow já funciona sozinho (cron diário + botão manual "Run workflow").

Se quiser um intervalo diferente de 1x/dia, é só ajustar o `cron:` no arquivo do workflow.

### ❓ Cursor nativo visível por baixo do personalizado (não resolvido — precisa investigação ao vivo)

- Código revisado: [src/components/CustomCursor.astro](src/components/CustomCursor.astro)
  e a regra `*, *::before, *::after { cursor: none !important; }` em
  [public/css/style.css:3251](public/css/style.css) (adicionada em 2026-06-07, commit
  `1ebea9a`).
- Testado no `astro dev` local via preview automatizado: `cursor: none` está sendo
  aplicado corretamente (`getComputedStyle` confirma `cursor: "none"` em `html`/`body`,
  e `#custom-cursor` existe e funciona). **Não consegui reproduzir o bug localmente** —
  ferramentas de automação (Playwright/preview headless) não renderizam o cursor real
  do sistema operacional, então esse tipo de bug é literalmente invisível para mim
  nessas condições.
- O usuário confirmou que o problema acontece **no site publicado (produção)**, não
  testado ainda no localhost.
- **Hipótese mais provável:** o deploy publicado no Netlify pode estar desatualizado
  em relação ao código-fonte atual (mesma cadeia de causa do problema do RSS — falta
  de rebuild/redeploy recente), OU é um comportamento específico de navegador/SO que
  só aparece em produção (cache do navegador, extensão, configuração de acessibilidade
  do Windows mostrando um cursor "de localização", etc.).
- **Próximos passos para a próxima sessão:**
  1. Confirmar no painel do Netlify se o deploy mais recente corresponde ao commit
     mais recente do `main`.
  2. Se estiver atualizado e o bug persistir: reproduzir com o usuário informando
     navegador/SO exatos, se acontece em toda a página ou só sobre elementos
     específicos (iframes de vídeo em páginas de projeto, `<video>`, scrollbar, etc.),
     e se um hard-refresh (Ctrl+Shift+R) resolve.

## Arquivos alterados nesta sessão

- `public/css/style.css` (fonte)
- `public/css/style.min.css` (gerado via `npm run build:css`)
- `.github/workflows/rebuild-rss.yml` (novo)
- `HANDOFF.md` (novo, este arquivo)

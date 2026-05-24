---
name: Portfólio - Filipe Duarte
version: "1.0"
description: >
  Sistema visual Neo-Brutalista do portfólio de Filipe Duarte.
  Três famílias tipográficas com papéis distintos. Amarelo como cor de marca.
  Bordas sólidas e sombras duras deslocadas como linguagem de profundidade.
  Dark mode via troca de variáveis CSS. Escala tipográfica fluida com clamp().

colors:
  # Light mode
  bg: "#F2F0EF"
  surface: "#F2F0EF"
  ink: "#1b1b1d"
  muted: "#6B6B6B"
  yellow: "#FFC300"
  purple: "#7C4DFF"
  purple-dark: "#4B0082"
  teal: "#00BFAE"
  pink: "#FF2D55"

  # Dark mode overrides
  bg-dk: "#1B1B1D"
  ink-dk: "#E5D2AF"
  yellow-dk: "#7B4600"
  teal-dk: "#008579"
  pink-dk: "#E71C42"

typography:
  font-display: "'Syne', sans-serif"
  font-body: "'Inter', sans-serif"
  font-mono: "'Space Mono', monospace"

  text-xs:   "clamp(0.75rem, 1.5vw, 0.875rem)"
  text-sm:   "clamp(0.875rem, 1.8vw, 1rem)"
  text-base: "clamp(1rem, 2vw, 1.125rem)"
  text-lg:   "clamp(1.125rem, 2.2vw, 1.375rem)"
  text-xl:   "clamp(1.375rem, 2.5vw, 1.75rem)"
  text-2xl:  "clamp(1.75rem, 3.5vw, 2.5rem)"
  text-3xl:  "clamp(1.375rem, 5vw, 3.5rem)"
  text-4xl:  "clamp(2rem, 7vw, 5.5rem)"
  text-hero: "clamp(2rem, 6vw, 8rem)"

spacing:
  space-1:  "0.25rem"
  space-2:  "0.5rem"
  space-3:  "0.75rem"
  space-4:  "1rem"
  space-5:  "1.25rem"
  space-6:  "1.5rem"
  space-8:  "2rem"
  space-10: "2.5rem"
  space-12: "3rem"
  space-16: "4rem"
  space-20: "5rem"
  space-24: "6rem"
  space-32: "8rem"

borders:
  border-width: "2px"
  border-width-thick: "3px"
  border: "2px solid var(--color-border)"
  border-thick: "3px solid var(--color-border)"

elevation:
  shadow-sm: "3px 3px 0px var(--color-ink)"
  shadow-md: "5px 5px 0px var(--color-ink)"
  shadow-lg: "8px 8px 0px var(--color-ink)"
  shadow-xl: "12px 12px 0px var(--color-ink)"

rounded:
  sm: "2px"
  md: "4px"

transitions:
  fast: "120ms ease"
  base: "220ms ease"
  slow: "400ms ease"

layout:
  container-max: "1240px"
  container-pad: "clamp(1rem, 4vw, 2rem)"
  section-pad: "clamp(4rem, 8vw, 7rem)"

components:
  btn:
    fontFamily: "{typography.font-display}"
    fontSize: "{typography.text-sm}"
    fontWeight: "700"
    textTransform: "uppercase"
    letterSpacing: "0.04em"
    padding: "{spacing.space-4} {spacing.space-8}"
    border: "{borders.border-thick}"
    shadow: "{elevation.shadow-md}"

  btn-primary:
    background: "{colors.ink}"
    color: "{colors.yellow}"

  btn-secondary:
    background: "{colors.surface}"
    color: "{colors.ink}"

  btn-yellow:
    background: "{colors.yellow}"
    color: "{colors.ink}"

  btn-hover:
    transform: "translate(-3px, -3px)"
    shadow: "{elevation.shadow-lg}"

  tag:
    fontFamily: "{typography.font-mono}"
    fontSize: "{typography.text-xs}"
    fontWeight: "700"
    textTransform: "uppercase"
    letterSpacing: "0.08em"
    padding: "{spacing.space-1} {spacing.space-3}"
    border: "{borders.border}"
    background: "{colors.yellow}"
    shadow: "{elevation.shadow-sm}"

  tag-dark:
    background: "{colors.ink}"
    color: "{colors.bg}"

  tag-green:
    background: "{colors.teal}"

  tag-red:
    background: "{colors.pink}"
    color: "{colors.surface}"

  nav:
    height: "60px"
    background: "{colors.bg}"
    border-bottom: "{borders.border}"

  nav-scrolled:
    shadow: "0 4px 0 var(--color-ink)"

  metric-card:
    border: "{borders.border-thick}"
    background: "{colors.surface}"
    shadow: "{elevation.shadow-md}"
    padding: "{spacing.space-5} {spacing.space-4}"

  metric-card-hover:
    transform: "translate(-3px, -3px)"
    shadow: "{elevation.shadow-lg}"
---

## Overview

**Portfólio Filipe Duarte** é uma página de apresentação pessoal com linguagem visual Neo-Brutalista: bordas visíveis, sombras sólidas deslocadas, tipografia pesada e amarelo como única cor de acento forte. O estilo é direto e sem ornamentos — cada elemento ganha destaque pela estrutura, não pela decoração.

O sistema funciona em dois modos (claro/escuro) via troca de variáveis CSS em `html[data-theme="dark"]`, e suporta dois idiomas (PT/EN) com atributos `data-en` e `data-i18n` no HTML.

Qualquer nova seção ou componente deve parecer que saiu da mesma mão: borda preta visível, sombra deslocada para baixo-direita, amarelo como destaque pontual.

---

## Colors

O sistema usa uma hierarquia de três camadas:

**Camada 1 — Base estrutural:**
`#F2F0EF` (bg/surface) e `#1b1b1d` (ink/border). Toda interface começa aqui. Fundo off-white quente, texto e bordas quase-preto. O off-white (`#F2F0EF`) em vez de branco puro reduz fadiga visual e dá caráter.

**Camada 2 — Cor de marca (sinal primário):**
`#FFC300` (yellow) é a única cor de acento forte. Aparece em botão primário (como texto sobre fundo preto), hover de nav links, tags padrão e fundos de destaque. É o amarelo que identifica o portfólio.

**Camada 3 — Cores funcionais (papéis específicos):**
- `#7C4DFF` purple — destaque inline (`highlight`) em texto corrido, sinaliza termos importantes
- `#00BFAE` teal — status "disponível", tags verdes, metric-card destaque
- `#FF2D55` pink — tags vermelhas, roles com acento emocional (ex: "Programação")

**Dark mode:** As variáveis de bg, ink, yellow, teal e pink têm contrapartes `-dk` ativadas via atributo `data-theme="dark"` no `<html>`. O amarelo escuro (`#7B4600`) garante contraste adequado sem vibrar no fundo escuro.

**Regra de ouro:** Cor só entra se comunicar algo. Yellow = ação/destaque, Purple = ênfase semântica, Teal = positivo/disponível, Pink = energia/contraste.

---

## Typography

Três famílias com papéis rígidos:

| Família | Token | Papel |
|---|---|---|
| **Syne** | `font-display` | Títulos, headline do hero, logo, botões de ação |
| **Inter** | `font-body` | Texto corrido, parágrafos, bio, descrições |
| **Space Mono** | `font-mono` | Tags, nav links, labels de seção, section-label, badges |

A escala tipográfica é inteiramente fluida via `clamp()` — nenhum breakpoint manual muda tamanho de fonte. O valor do meio na função clamp usa `vw` para interpolação contínua entre mínimo e máximo.

**Pesos usados:** 400 (body regular), 500 (suporte), 600 (ênfase leve), 700 (labels, botões, mono), 800 (títulos display). Nunca abaixo de 400 — Inter perde legibilidade nos tamanhos usados.

**Letter-spacing:**
- Display Syne 800: `letter-spacing: -0.04em` a `-0.06em` — compensa spreading óptico em pesos extremos
- Mono labels: `letter-spacing: 0.06em` a `0.12em` — amplia espaço para legibilidade em capslock
- Nunca tracking negativo em pesos abaixo de 700

**Linha de referência:** `body { line-height: 1.6 }`. Textos de suporte usam `1.5`. Headlines grandes usam `1` ou menos.

---

## Layout

Página single-page com seções empilhadas verticalmente. Container centralizado com `max-width: 1240px`.

```
┌─────────────────────────────────────────────┐
│  CONTAINER (max-width: 1240px)              │
│  padding: clamp(1rem, 4vw, 2rem)            │
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  HERO  (min-height: 100svh)          │   │
│  │  grid: 1col mobile / 2col ≥992px     │   │
│  └──────────────────────────────────────┘   │
│  ┌──────────────────────────────────────┐   │
│  │  SEÇÕES (padding-block: section-pad) │   │
│  │  border-bottom: 3px solid ink        │   │
│  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Hero:** `min-height: 100svh` (usa `svh` para mobile sem barra de endereço interferindo). Grid de 1 coluna em mobile, 2 colunas (`1fr 1fr`) a partir de 992px. Centralização via `margin-block: auto` no inner — nunca `justify-content: center` no flex pai (causa data loss quando conteúdo excede min-height).

**Seções padrão:** `padding-block: clamp(4rem, 8vw, 7rem)`. Separadas por `border-bottom: 3px solid var(--color-border)`. Fundo alterna entre `--color-bg` e `--color-surface` (mesmo valor no light, mas semântica preservada para dark mode).

**Grids internos:** Geralmente `1fr` mobile → `1fr 1fr` a partir de 640px. Métricas usam `repeat(2, 1fr)` → `repeat(4, 1fr)` em 640px+.

---

## Elevation & Depth

Sombra sempre sólida, sempre preta, sempre deslocada para baixo-direita (X+, Y+). Zero blur.

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `3px 3px 0px ink` | Tags, nav links hover, elementos pequenos |
| `shadow-md` | `5px 5px 0px ink` | Botões em repouso, metric-cards, cards de projeto |
| `shadow-lg` | `8px 8px 0px ink` | Hover de botões e cards — cresce junto com translate |
| `shadow-xl` | `12px 12px 0px ink` | Elementos de destaque máximo (uso raro) |

**Comportamento de botão:**
- Repouso: `shadow-md`, sem transform
- Hover: `transform: translate(-3px, -3px)` + `shadow-lg` — simula elevação
- O translate negativo (sobe/esquerda) + shadow maior cria ilusão de que o botão se aproxima do usuário

**Nav scrolled:** Quando a página é rolada, o nav ganha `box-shadow: 0 4px 0 var(--color-ink)` — sombra na borda inferior, sem deslocamento lateral, para indicar que o nav está "preso" acima do conteúdo.

---

## Shapes

Border-radius é mínimo por intenção — Neo-Brutalismo não arredonda agressivamente:

| Valor | Token | Contexto |
|---|---|---|
| `4px` | `radius-md` | Tags, botões, metric-cards |
| `2px` | `radius-sm` | Elementos mínimos, badges internos |
| `50%` | — | Status dot do hero (círculo perfeito) |
| `0` | — | Padrão implícito — maioria dos elementos |

A ausência de arredondamento é intencional. Cantos quadrados reforçam a estética de construção direta, sem polish excessivo.

---

## Components

### Navegação

Nav fixo no topo (`position: fixed`, `z-index: 1000`), altura `60px`, `border-bottom: 2px solid ink`. Em scroll, ganha `box-shadow: 0 4px 0 ink`.

- **Logo:** Syne 800, span de iniciais com `background: ink; color: yellow` — inverte as cores base
- **Links (desktop):** Space Mono, caps, border `2px transparent` em repouso → hover: `background: yellow; border-color: ink; shadow-sm`
- **CTA "Contato":** Fundo ink, texto yellow, `shadow-sm`, hover eleva com translate + `shadow-md`
- **Controls (lang/theme):** Mesma estrutura dos links, hover: yellow. Estado ativo: ink/yellow invertido, `transform: translate(2px, 2px)` (pressionado)
- **Mobile:** hamburger com 3 spans que animam para X quando aberto. Menu mobile exibido via JS com `display: flex; flex-direction: column`

### Botões

Três variantes — hierarquia clara:

**Primário (`btn--primary`):** Fundo `ink`, texto `yellow`. Ação principal do usuário (ex: "Ver Projetos ↓"). Syne 700, caps.

**Secundário (`btn--secondary`):** Fundo `surface`, texto `ink`. Ações importantes mas não finais (ex: "LinkedIn ↗").

**Amarelo (`btn--yellow`):** Fundo `yellow`, texto `ink`. Destaque lateral (ex: "Behance ↗"). Mesmo peso visual do primário, diferente por cor.

**Todos os botões:** `border: 3px solid ink; shadow-md`. Hover: `translate(-3px, -3px)` + `shadow-lg`. `transition: 120ms ease`.

### Tags

Componente `tag`: Space Mono, caps, `font-size: text-xs`, `letter-spacing: 0.08em`. Background `yellow` por padrão. Border `2px solid ink`. `shadow-sm`.

Variantes por modificador:
- `.tag--dark` — background ink, texto bg (invertido)
- `.tag--green` — background teal
- `.tag--red` — background pink, texto surface
- `.tag--ghost` — background transparent

### Section Label

Indicador de seção numerada (`01 — Sobre Mim`). Space Mono, caps, `text-xs`, `color: muted`. Decorado com linha de `2rem × 2px` à esquerda via `::before`. `letter-spacing: 0.12em` — o mais espaçado do sistema.

### Value Boxes

Cards de proposta de valor na seção Sobre. Border `2px solid ink`, `shadow-md`. Hover: `translate(-3px, -3px)` + `shadow-lg`. Sem border-radius explícito (herdado do padrão `radius-md` se aplicado, senão `0`).

### Metric Cards

Grid `2col → 4col`. Border `3px solid ink`, `shadow-md`. Os dois primeiros filhos recebem backgrounds de cor: `nth-child(1)` = yellow, `nth-child(2)` = teal. Número em Syne 800, `text-3xl`, `letter-spacing: -0.04em`. Label em Space Mono caps.

### Status Dot (Hero)

Indicador de disponibilidade. Background `teal`. `::before` com círculo `8px`, animação `pulse` (opacity + scale, `1.8s ease-in-out infinite`).

### Hero Roles

Badges de especialidade inline no hero. Cada role é uma tag com borders. O 4º filho (Programação) recebe background `pink; color: surface` — quebra o padrão e sinaliza diversidade de stack.

### Hero Bio

Parágrafo com `border-left: 4px solid ink; padding-left: space-5`. A barra lateral visível funciona como âncora visual — separa o bio do headline sem usar outro elemento.

### Hero Decoration

Texto "FD" absoluto, `right: -2rem`, `opacity: 0.06`, Syne 800, `clamp(8rem, 20vw, 18rem)`. Elemento decorativo quase invisível — textura de fundo sem peso visual.

---

## Animation

| Token | Valor | Uso |
|---|---|---|
| `transition-fast` | `120ms ease` | Hover de botões, links, controles — feedback imediato |
| `transition-base` | `220ms ease` | Sombra do nav, hamburger spans |
| `transition-slow` | `400ms ease` | Reveal de seções (data-reveal), transições de painel |

**Keyframes canônicos:**

`pulse` — Status dot do hero. `opacity: 1, scale(1)` → `opacity: 0.4, scale(0.85)` → `opacity: 1, scale(1)`. `1.8s ease-in-out infinite`. Indica disponibilidade ativa.

`data-reveal` — Elementos entram com scroll. Padrão: `opacity: 0, translateY(20px)` → `opacity: 1, translateY(0)` via IntersectionObserver. `data-reveal-delay` adiciona stagger (`0.1s` por unidade de delay).

**Hover de botões e cards:** Sempre `translate(-3px, -3px)` no hover. Nunca translate positivo em hover — translate positivo é reservado para estado "ativo/pressionado" (ex: nav controls ativos usam `translate(2px, 2px)` para parecerem afundados).

---

## Dark Mode

Ativado via `html[data-theme="dark"]` pelo botão `#theme-toggle` em JS. Usa troca de variáveis CSS — nenhum componente precisa de classe extra.

Substituições principais:
- `--color-bg` → `#1B1B1D`
- `--color-ink` → `#E5D2AF` (sépia quente — evita branco puro em fundo escuro)
- `--color-yellow` → `#7B4600` (amarelo queimado — contraste ok sem vibrar)
- `--color-teal` → `#008579`
- `--color-pink` → `#E71C42`

O logo inverte para `background: teal-dk`. O CTA do nav usa `yellow-dk`. O `highlight-yellow` em dark mode muda `color: ink` para o texto destacado permanecer legível.

---

## Internacionalização (i18n)

Dois idiomas: PT (padrão) e EN. Ativado pelo botão `#lang-toggle`.

- `data-en="texto em inglês"` — atributo em elementos simples (nav links, tags, botões)
- `data-i18n="chave"` — atributo em elementos com conteúdo mais complexo (headings, parágrafos)

JS alterna entre os textos via dataset. Nenhum arquivo de tradução externo — tudo inline no HTML.

---

## Do's and Don'ts

### Fazer

- Use `border: 3px solid var(--color-border)` + `box-shadow: 5px 5px 0px var(--color-ink)` em botões e cards de ação. Nunca borda mais fina em elementos interativos principais.
- Use `Syne` em títulos e botões, `Inter` em texto corrido, `Space Mono` em labels/tags/mono. Os papéis não se misturam.
- Aplique `letter-spacing: -0.04em` em Syne 800. Sem ele, o espaçamento fica óptico errado em pesos extremos.
- Use `transform: translate(-3px, -3px)` em hover de cards e botões. A direção é sempre negativa (cima/esquerda) — simula elevação.
- Use `clamp()` para todos os tamanhos de fonte e espaçamentos fluidos. Nunca defina um tamanho fixo que quebre o sistema fluido.
- Preserve `min-height: 100svh` (não `100vh`) no hero — `svh` exclui a barra de endereço do mobile do cálculo.
- Mantenha o `data-theme` e `data-en` nos novos elementos — dark mode e i18n são requisitos funcionais, não opcionais.
- Use `--color-muted` (`#6B6B6B`) para texto de suporte e labels secundários. Nunca `--color-ink` em texto decorativo.

### Não fazer

- **Não use gradientes.** Nenhum elemento do sistema usa gradiente decorativo. Gradiente quebra o vocabulário Neo-Brutal.
- **Não invente cores fora da paleta.** Se algo precisa de nova cor, questione se o componente está sendo construído corretamente. A paleta cobre todos os casos.
- **Não use `box-shadow` com blur** em botões, cards ou nav. Sombra com blur é para elementos flutuantes (tooltips, dropdowns) — nunca para estrutura.
- **Não use `border-radius` acima de `4px`** exceto em elementos circulares (`border-radius: 50%`). Arredondamento excessivo quebra a estética Neo-Brutal.
- **Não use `font-weight` abaixo de 400** em Inter. Abaixo disso, a fonte perde legibilidade nos tamanhos usados.
- **Não use `transition: all`.** Liste as propriedades explicitamente (`transform, box-shadow`) para evitar jank em propriedades não-intencionais.
- **Não centralize o hero com `justify-content: center`** no flex pai — isso causa "data loss" quando o conteúdo excede o `min-height`. Use `margin-block: auto` no filho.
- **Não use `100vh` no hero.** Usa `100svh` — `vh` no mobile inclui a barra de endereço e causa overflow.
- **Não crie uma 4ª variante de botão.** As três variantes (primary/secondary/yellow) cobrem todos os casos. Uma quarta é sinal de que a arquitetura do componente precisa revisão.
- **Não coloque cor decorativa** em elementos sem significado funcional. Yellow = acento/ação, Purple = ênfase semântica, Teal = positivo/disponível, Pink = energia. Se a cor não comunica nada, remova-a.

---

## Tokens Reference

Todos os tokens são variáveis CSS definidas em `:root` em [`css/style.css`](css/style.css). Dark mode sobrescreve os tokens de cor em `html[data-theme="dark"]` no topo do mesmo arquivo.

Não há arquivo de tokens separado (JSON/Figma) — o CSS é a fonte de verdade. Ao adicionar novos tokens, defina sempre em `:root` com o prefixo `--color-`, `--font-`, `--text-`, `--space-`, `--shadow-` ou `--transition-` conforme a categoria.

---

*DESIGN.md — Portfólio Filipe Duarte v1.0*
*Mantenedor: Filipe Duarte*
*Última atualização: Maio 2026*
*Referência de implementação: filipeduarte.netlify.app*

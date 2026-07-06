# HANDOFF — PS2 Memory Card Layout (protótipo Three.js)

> Documento de referência para continuar este protótipo em outra sessão.
> Última atualização: 2026-07-06

---

## 1. O que é isto

Protótipo isolado (fora do build do Astro) recriando a interface do **Memory Card do
PlayStation 2**, com ícones 3D renderizados em Three.js sobre uma camada de overlay
HTML/CSS. Vive em `projetos/ideias_a_implementar/` — ainda não integrado ao site
principal, é uma ideia sendo explorada.

- **Arquivo principal:** [`PS2 Memory Card.dc.html`](<PS2 Memory Card.dc.html>)
- **Runtime:** [`support.js`](support.js) — bundle gerado (React + um framework de
  componentes próprio, "DC") que interpreta o arquivo `.dc.html`. **Não editar
  `support.js` manualmente** — é gerado por `dc-runtime/src/*.ts` com `bun run build`
  (esse diretório fonte não está neste projeto).
- **Formato `.dc.html`:** um HTML com tags customizadas (`<x-dc>`, `<helmet>`, `<sc-for>`),
  interpolação `{{ }}` e um `<script type="text/x-dc" data-dc-script>` contendo uma classe
  `Component extends DCLogic` com `state`, `renderVals()` (retorna os valores usados nos
  `{{ }}` do template) e lifecycle (`componentDidMount`/`componentWillUnmount`), ao estilo
  React class component.

## 2. Como rodar/testar localmente

Não faz parte do `npm run dev` do Astro. Para visualizar:

```bash
python -m http.server 8090 --directory "projetos/ideias_a_implementar/PlayStation 2 Memory Card Layout"
```

Depois abra `http://localhost:8090/PS2%20Memory%20Card.dc.html`.

Um atalho já foi registrado em `.claude/launch.json` como config **`ps2-memcard`**
(`preview_start` com esse nome sobe o servidor na porta 8090).

> **Gotcha de cache:** o Chrome do preview às vezes restaura a página via **bfcache**
> ao navegar para a mesma URL, preservando estado antigo do React (index selecionado,
> etc.). Se o estado parecer "errado" após reload, force um cache-bust:
> `window.location.replace(url + '?v=' + Date.now())`.

## 3. Arquitetura Three.js atual

Uma única `THREE.Scene` + uma única `THREE.PerspectiveCamera` (FOV 34°, posição
`(0,0,8)`, olhando de frente pelo eixo Z — sem ângulo isométrico) renderizada num
`<canvas>` fullscreen (`position:fixed;inset:0`) que fica **atrás** da camada HTML
(header, grid de hit-areas, painel de detalhes, legenda).

Por quê uma cena única (e não uma cena/câmera por ícone, como numa versão anterior)?
Porque a tela de detalhes precisa **transladar o ícone selecionado** para fora da área
do grid (metade esquerda da tela) — impossível de fazer com viewport/scissor por célula.

Componentes-chave no script (`Component` em `PS2 Memory Card.dc.html`):

- `screenToWorld(px, py)` — faz unproject de um ponto de tela (pixels) para o plano
  `z=0` do mundo 3D, dada a câmera atual. É o que permite alinhar os 15 ícones 3D com
  os centros das células do grid HTML (invisíveis, só usadas como hit-area + referência
  de posição/tamanho), e também calcular a posição-alvo do ícone na tela de detalhes.
- `updateGridPositions()` — recalcula (só quando o retângulo do grid muda, cacheado por
  chave) as posições-mundo de cada célula **e** o `baseScale`: um fator de escala único
  derivado da largura real (em unidades de mundo) da primeira célula, para que o
  icosaedro (geometria fixa, raio 0.62) sempre preencha ~68% da célula independente do
  tamanho de tela/FOV. **Isso é frágil** — se mudar o layout do grid CSS (colunas,
  gaps, `top`), reconferir se os ícones continuam proporcionais (não sobrepondo linhas).
- `tick()` — loop de render (`requestAnimationFrame`). Para cada ícone, decide posição-alvo
  (célula do grid ou âncora da tela de detalhes) e escala-alvo, aplica lerp de posição
  e a lógica de foco (ver seção 4). Só ali no final chama `renderer.render(scene, camera)`.
- `makeIcon(color)` — cria um icosaedro (`MeshPhongMaterial`, shininess alto) + um plano
  de sombra (textura radial gerada via `<canvas>` 2D, `makeRadialTexture`). Todos os
  ícones são icosaedros idênticos, diferenciados só pela cor (`COLORS[]`).
- Glow: um único `THREE.Sprite` compartilhado (não um por ícone), reposicionado a cada
  frame na posição do ícone selecionado, com opacidade/escala pulsando via `Math.sin`.

## 4. Estados e comportamento

`state = { selectedIndex, mode: 'grid' | 'detail', detailOption: 0 | 1 }`

- **Grid, inativo:** `scale = baseScale`, `rotation.y = 0` (fixo de frente).
- **Grid, focado (selecionado):** "pop" com easing até `baseScale * 1.2`, rotação
  contínua no Y (`rotY += 0.035`/frame). Ao perder o foco, reset **instantâneo**
  (sem easing) para scale/rotation base — é proposital, replica o comportamento
  "trava e desliga" do PS2 original.
- **Detalhe (`mode==='detail'`):** grid HTML escondido (`display:none` via
  `gridDisplay`), ícone selecionado translada (lerp de posição) para uma âncora de
  tela (~27%/52% da viewport) e escala para `baseScale * 2.3`, mantendo a rotação
  contínua. Os outros 14 ícones somem (`targetScale = 0`, instantâneo). Fundo muda
  instantaneamente (sem transição) de cinza para gradiente vermelho/azul (`DETAIL_BG`).
  Painel HTML à direita mostra nome/data/tamanho (dados sintéticos, ver `SIZES`/`DATES`
  no script) e opções COPY/DELETE (destaque azul conforme `detailOption`).

### Teclado

| Tecla | Modo grid | Modo detalhe |
|---|---|---|
| `ArrowUp/Down/Left/Right` | navega entre os 15 slots | Up/Down alterna COPY/DELETE |
| `Enter` / `x` / `X` | confirma seleção → entra no modo detalhe | — |
| `Escape` / `Backspace` | — | volta ao grid |

Clique: clicar num slot já selecionado confirma (equivalente a `Enter`); clicar em
outro slot apenas seleciona. Os botões de legenda (✕ Enter / △ Back) também são
clicáveis.

## 5. Decisões de fidelidade ao PS2 original

Pedido explícito do usuário nesta sessão (ver histórico da conversa para o descritivo
completo):

1. Câmera perspectiva de frente (sem isometria), FOV baixo (~34°).
2. Todos os ícones são icosaedros, diferenciados só pela cor.
3. Rotação só ocorre quando o ícone está focado/selecionado (parado quando inativo).
4. Sombra estática por sprite/plano com textura radial (não CSS).
5. Glow por sprite pulsante atrás do ícone focado.
6. Tela de detalhes com translação + zoom do ícone, fundo vibrante instantâneo, painel
   HTML com Copy/Delete.
7. Fonte pixelada ('Press Start 2P', via Google Fonts) na UI 2D inteira.

Ainda **não implementado / possíveis próximos passos** (não foi pedido, mas ficou
evidente durante o desenvolvimento):

- Fonte 'Press Start 2P' depende de rede (Google Fonts CDN) — sem fallback local. Se
  o site for para produção/offline, considerar hospedar o `.woff2` localmente (o
  projeto principal já faz self-hosting de fontes, ver `HANDOFF.md` raiz seção 2).
- Sem tratamento de erro se `THREE` não carregar (`waitForThree` faz polling infinito
  via `requestAnimationFrame` — funciona, mas não há timeout/fallback visual).
- `three@0.160.0` via CDN (`unpkg`) usa a build UMD deprecada (`three.min.js`), que
  gera warnings de depreciação e "multiple instances of Three.js" no console (inofensivo
  aqui, mas vale migrar para ESM se este protótipo evoluir para produção). O
  `package.json` do projeto principal já tem `three@^0.185.1` como dependência — se
  este protótipo for integrado ao Astro futuramente, importar dali em vez do CDN.
- Ações COPY/DELETE não fazem nada (só alternam destaque visual) — são placeholders.
- Dados de nome/data/tamanho são sintéticos (`TITLES`, `DATES`, `SIZES` no topo do
  script), não vêm de nenhuma fonte real.

## 6. Como validar depois de mexer

Sempre testar via preview (não dá para confiar só em leitura de código, é um protótipo
visual/interativo):

1. Subir servidor (`ps2-memcard` em `.claude/launch.json` ou comando `python -m
   http.server` acima).
2. Screenshot do grid parado — checar se os 15 ícones não se sobrepõem entre linhas
   (indício de `baseScale` desalinhado se o layout do grid mudar).
3. Disparar `ArrowRight`/`ArrowLeft`/`ArrowUp`/`ArrowDown` e conferir que o glow e o
   texto do título (canto superior direito) sempre apontam para o mesmo slot.
4. Disparar `Enter` e conferir a transição para o modo detalhe (fundo, translação,
   painel).
5. Disparar `Escape` e conferir volta ao grid mantendo o item selecionado.
6. Checar console (`preview_console_logs`) por erros reais (os warnings de depreciação
   do Three.js UMD são esperados e podem ser ignorados).

## 7. Log de sessões

### 2026-07-06 — Sessão 1 (Claude)

- Primeira renderização Three.js funcional dos 15 ícones (formas variadas: icosaedro,
  cone, torus, octaedro, caixa), câmera perspectiva por-célula com scissor/viewport.
- Bug encontrado e corrigido: câmera com `aspect` fixo em 1 distorcia os ícones porque
  as células do grid não são quadradas — corrigido atualizando `camera.aspect` por
  frame conforme o tamanho real da célula.
- A pedido do usuário: unificados todos os ícones em icosaedros (só cor varia); trocada
  a câmera para ortográfica isométrica a 45°; rotação restrita ao item selecionado.
- A pedido do usuário (mudança maior): reescrita completa da arquitetura para cena
  única + câmera em perspectiva frontal (ver seção 3), adicionando a tela de detalhes
  completa (translação/zoom do ícone, fundo vibrante, painel Copy/Delete), sombras e
  glow via sprites em vez de CSS, e fonte pixelada na UI 2D. Descoberto e corrigido bug
  de escala (ícones grandes demais/sobrepondo linhas) introduzindo `baseScale` derivado
  do tamanho real da célula em unidades de mundo. Validado via preview: navegação,
  confirmação, alternância Copy/Delete e volta ao grid — sem erros de console.

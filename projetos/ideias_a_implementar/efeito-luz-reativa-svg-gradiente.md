# Efeito de Luz Reativa no Logo — Obsidian Download Button

**Referência:** https://obsidian.md/download  
**Elemento:** `.download-button.logo-shimmer` → `.card-logo` (SVG do logo)

---

## O que é o efeito

Ao mover o mouse pela página, o logo da Obsidian reage com uma **iluminação interna 3D**. Os gradientes dentro do SVG se deslocam de acordo com a posição do cursor, criando a ilusão de que uma fonte de luz está sendo refletida no logo de diferentes ângulos.

Não é um tilt/parallax do elemento inteiro — é o **interior do logo que se ilumina** conforme o mouse se move.

---

## Como funciona: 3 camadas técnicas

### 1. SVG com múltiplos `radialGradient` como "fontes de luz"

O SVG do logo tem 4 gradientes radiais nomeados, cada um representando um canto/luz:

```svg
<radialGradient id="logo-top-left" ...>
<radialGradient id="logo-top-right" ...>
<radialGradient id="logo-bottom-right" ...>
<radialGradient id="logo-bottom-left" ...>
```

Cada gradiente usa um `gradientTransform="matrix(...)"` que define posição e formato da luz.

---

### 2. Rastreamento global do mouse

```js
var Kt = 0, Wt = 0;
var la = "ontouchstart" in window; // desativa em touch

document.addEventListener("mousemove", o => {
  if (!la) {
    Kt = o.clientX;
    Wt = o.clientY;
    Gt(); // chama a função de atualização dos gradientes
  }
}, { passive: true });
```

O `passive: true` garante performance sem bloquear o scroll.

---

### 3. Sigmoid + `gradientTransform` dinâmico

```js
var sa = fishAll(".logo-shimmer .card-logo");
var Ut = o => 1 / (1 + Math.exp(-o)); // função sigmoid

function Gt() {
  let f = window.innerWidth, s = window.innerHeight;

  for (let u of sa) {
    let d = u.getBoundingClientRect();

    // Skip elementos fora da viewport
    if (d.top >= s || d.bottom <= 0 || d.left >= f || d.right <= 0) continue;

    // Normaliza mouse em relação ao centro do elemento (-0.5 a +0.5 aprox.)
    let m = (Kt - (d.left + d.width / 2)) / f;
    let h = (Wt - (d.top + d.height / 2)) / s;

    // Sigmoid comprime o valor: nunca vai ao extremo, movimento suave
    m = 50 * (2 * Ut(15 * m) - 1);
    h = 50 * (2 * Ut(15 * h) - 1);

    // Atualiza as 4 matrizes de gradiente com offsets baseados na posição do mouse
    u.find("#logo-top-left").setAttribute("gradientTransform",
      `matrix(-56 -288 149 -29 ${m * 1.75 + 210} ${h * 1.75 + 306})`);

    u.find("#logo-top-right").setAttribute("gradientTransform",
      `matrix(50 -379 280 37 ${m * 1.25 + 460} ${h * 1.5 + 334})`);

    u.find("#logo-bottom-right").setAttribute("gradientTransform",
      `matrix(-77 -157 180 -89 ${-m * 1.5 + 346} ${-h * 1.25 + 526})`);

    u.find("#logo-bottom-left").setAttribute("gradientTransform",
      `matrix(-29 -189 126 -19 ${-m * 1.25 + 134} ${-h * 1.25 + 452})`);
  }
}
```

**Por que sigmoid?** Ela "amortece" a sensibilidade — o movimento começa suave, reage com força no centro e suaviza nas bordas. Sem ela, o efeito ficaria brusco ou limitado por clamp manual.

Os gradientes dos cantos opostos se movem em direção **contrária** (`-m`, `-h`), o que cria a ilusão de perspectiva/profundidade.

---

## CSS de suporte

```css
/* Contenedor do logo: overflow hidden para cortar a luz nas bordas */
.card-logo {
  position: relative;
  overflow: hidden;
  box-shadow:
    rgba(255, 255, 255, 0.024) 0px 1px 0px 1px inset,
    rgba(0, 0, 0, 0.05) 0px 5px 10px 5px;
}

/* Sombra "falsa" embaixo do logo, anima junto */
.card-logo::after {
  transition: 3000ms ease-in-out;
  position: absolute;
  bottom: 15%;
  width: 45%;
  height: 30%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 999px;
  content: "";
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 50px 15px;
}

/* Leve scale no hover (apenas retina/HiDPI) */
.card-grow:hover {
  transform: scale(1.012);
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Efeito paralelo: `.card-shimmer` com CSS variables

Para os outros cards da página (não o logo), existe um efeito separado:

```js
for (let o of fishAll(".cards .card-shimmer")) {
  o.addEventListener("mousemove", f => {
    let s = o.getBoundingClientRect();
    o.setCssProps({
      "--mouse-x": `${f.clientX - s.left}px`,
      "--mouse-y": `${f.clientY - s.top}px`
    });
  }, { passive: true });
}
```

Aqui a posição do mouse é relativa ao **próprio card** (não à janela), e é exposta via CSS custom properties `--mouse-x`/`--mouse-y` para uso em `radial-gradient()` no CSS.

---

## Resumo das técnicas

| Técnica | Para quê |
|---|---|
| SVG `radialGradient` com `gradientTransform` dinâmico | Luz interna reativa no logo |
| Função sigmoid (`1 / (1 + e^-x)`) | Suavizar e amortecer o movimento |
| Gradientes opostos com sinal invertido | Criar ilusão de profundidade/perspectiva |
| `getBoundingClientRect()` + check de viewport | Performance: só processa o que está visível |
| `passive: true` no mousemove | Não bloqueia scroll |
| `--mouse-x` / `--mouse-y` CSS vars | Efeito de brilho nos cards via CSS puro |
| `.card-logo::after` com `box-shadow` | Sombra embaixo do logo como "projeção de luz" |

---

## Ideias de aplicação no portfólio

- Logo/avatar do portfólio com luz interna reativa
- Cards de projeto com brilho/shimmer seguindo o cursor
- Hero section com SVG de fundo reagindo ao mouse
- Ícones de skills/tecnologias com gradiente interno reativo

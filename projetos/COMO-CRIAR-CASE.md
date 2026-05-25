# Como criar uma página de case

Referência para criar novos cases a partir do template `case.html`.
**Última atualização:** Maio 2026 — baseado no `mobistudio.html`.

---

## 1. Estrutura de arquivos

```
portfolio-filipe-duarte/
├── case.html                  ← template original (não editar)
├── projetos/
│   ├── [slug].html            ← arquivo do case (criar aqui)
│   └── [slug]/                ← pasta de assets do case
│       ├── Banner_[Proj]_21_9.webp
│       ├── processo_01.webp
│       ├── processo_02.webp
│       ├── processo_03.webp
│       ├── processo_04.webp
│       ├── processo_05.webp
│       └── demonstrativo.gif  (ou screenshot final)
```

**Convenção de slug:** letras minúsculas, sem espaço, sem acento.
Ex.: `mobistudio`, `projeto-x`, `nome-do-cliente`.

---

## 2. Criar o arquivo

1. Copiar `case.html` para `projetos/[slug].html`
2. Criar pasta `projetos/[slug]/` e colocar os assets dentro

---

## 3. Ajustar os caminhos (pasta projetos está um nível abaixo)

Todos os links devem usar `../` para subir um nível:

| O que              | Caminho correto                    |
|--------------------|------------------------------------|
| CSS                | `../css/style.css`                 |
| JS                 | `../js/main.js`                    |
| Ícone              | `../icon.svg`                      |
| Logo nav           | `../assets/FD - Wordmark.svg`      |
| Links de navegação | `../projetos.html`, `../sobre.html`, `../index.html#contato` |
| Imagens do case    | `[slug]/nome-da-imagem.webp` (sem `../`) |

---

## 4. Checklist de substituição — o que trocar no template

### `<head>`
- [ ] `<meta name="description">` — descrever o projeto em 1–2 frases
- [ ] `<link rel="canonical">` — `https://filipeduarte.netlify.app/projetos/[slug].html`
- [ ] `<meta og:title>` — `[Nome do Projeto] — Filipe Duarte`
- [ ] `<meta og:description>` — mesma descrição curta
- [ ] `<meta og:url>` — URL canônica do case
- [ ] `<title>` — `[Nome do Projeto] — Case · Filipe Duarte`

### Header do case
- [ ] **Eyebrow** (`.case-header__eyebrow`) — `Case · [Categoria] · [Cliente ou Autoral]`
- [ ] **Título** (`<h1>`) — nome do projeto com `<br />` se necessário
- [ ] **Data** — `Mês Ano → [atual | Mês Ano]`
- [ ] **Tags** (`.tech-tag`) — stack real usada no projeto

### Hero
- [ ] Trocar o `<div class="case-hero__placeholder">` por `<img>` quando a imagem estiver pronta
- [ ] Proporção obrigatória: **21:9** — `Banner_[Proj]_21_9.webp`
- [ ] `loading="eager"` no hero (above the fold)

### 01 — Contexto
- [ ] Parágrafo principal: cliente, dor, contexto
- [ ] Card **Contexto** — quem é o cliente / situação
- [ ] Card **Problema central** — 1 frase direta
- [ ] Card **Oportunidade** (fundo amarelo) — ângulo estratégico

### 02 — Meu Papel
- [ ] 3 `role-card` com os domínios reais (ex.: Design, Front-end, Deploy)
- [ ] Cada card: `role-card__title` + `role-card__desc` descrevendo o que foi feito

### 03 — Processo
- [ ] **`case-img-pair`** — 2 imagens do processo (ex.: wireframe → UI final)
  - Proporção: **4:3** — `processo_01.webp`, `processo_02.webp`
  - Atualizar `alt` e `caption`
- [ ] **Narrativa** (`.case-narrative`) — decisão técnica/design mais importante
- [ ] **Code block** — trecho de código real (ver regra abaixo ⚠️)
- [ ] **`case-img-trio`** — 3 imagens quadradas (1:1) de features ou etapas
  - `processo_03.webp`, `processo_04.webp`, `processo_05.webp`
  - Usar `case-img-pair__caption` embaixo de cada imagem

### 04 — Resultado
- [ ] **Metric cards** — 2 números reais do projeto (tempo, commits, versões, etc.)
- [ ] **Texto de impacto** (`.case-resultado__impact`) — resultado concreto
- [ ] **CTA principal** — link ao vivo do projeto
- [ ] **Screenshot/GIF** — `demonstrativo.gif` ou screenshot final (4:3)
  - `loading="lazy"` nos assets abaixo do fold

### Próximo case
- [ ] Atualizar `href` para o próximo `[slug].html`
- [ ] Atualizar o título do próximo projeto
- [ ] Substituir `<div class="case-next__thumb-placeholder">` por `<img>` quando disponível

---

## 5. ⚠️ Regra crítica — Code block

O `.case-code` usa `white-space: pre`. Isso significa que **toda indentação do HTML vira espaço visual no browser**.

**Errado** (o HTML indentado aparece indentado na tela):
```html
<div class="case-code">
  <span class="tok-keyword">function</span> foo() {
    return true;
  }
</div>
```

**Certo** (o conteúdo começa colado na tag de abertura, sem espaços antes):
```html
<div class="case-code"><span class="tok-keyword">function</span> foo() {
  return true;
}</div>
```

Classes de sintaxe disponíveis:
| Classe          | Uso                         |
|-----------------|-----------------------------|
| `tok-comment`   | Comentários (`// …`)        |
| `tok-keyword`   | Palavras-chave (`const`, `async`, `return`) |
| `tok-string`    | Strings (`'valor'`)         |
| `tok-fn`        | Nomes de funções            |

---

## 6. Imagens — formatos e proporções

| Slot             | Proporção | Formato  | Atributo       |
|------------------|-----------|----------|----------------|
| Hero banner      | 21:9      | `.webp`  | `loading="eager"` |
| Processo (pair)  | 4:3       | `.webp`  | `loading="lazy"` |
| Processo (trio)  | 1:1       | `.webp`  | `loading="lazy"` |
| Screenshot final | 4:3       | `.webp` ou `.gif` | `loading="lazy"` |
| Thumb próx. case | 80×80 px  | `.webp`  | `loading="lazy"` |

---

## 7. Links — o que manter e o que omitir

- **Manter:** link ao vivo do projeto (`.btn--primary`)
- **Omitir:** link do Behance (`.btn--secondary`) — migração em andamento para o portfolio próprio
- **Footer:** os links do Behance no footer podem permanecer por enquanto (remoção futura em lote)

---

## 8. Internacionalização (i18n)

Atributo `data-en="…"` em qualquer elemento de texto vira a versão em inglês quando o usuário clica em **EN** na nav. Preencher sempre que existir equivalente em inglês claro.

Exemplos do template:
```html
<p class="case-header__eyebrow" data-en="Case · Web Dev · Client">
  Case · Dev Web · Cliente
</p>
<span class="case-header__date" data-en="Apr 2026 → current">Abr 2026 → atual</span>
```

---

## 9. Acessibilidade — itens obrigatórios

- [ ] `aria-labelledby` em cada `<section>` apontando para o `id` do título interno
- [ ] `alt` descritivo em todas as `<img>`
- [ ] `role="img"` + `aria-label` no hero quando for `<div>`
- [ ] `aria-label` no `<div class="case-code">` descrevendo o trecho de código
- [ ] `aria-hidden="true"` nos elementos decorativos (setas, placeholders)

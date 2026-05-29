# SEO Audit — filipeduarte.netlify.app
**Data:** 2026-05-20  
**Tipo de site:** Portfólio pessoal — Produtor Multimídia  
**Mercado-alvo:** Porto Alegre e Região Metropolitana, Brasil  
**Idioma:** pt-BR  

---

## SEO Health Score: 64 / 100

| Categoria | Peso | Pontuação | Ponderado |
|-----------|------|-----------|-----------|
| Technical SEO | 22% | 55/100 | 12,1 |
| Content Quality (E-E-A-T) | 23% | 85/100 | 19,6 |
| On-Page SEO | 20% | 75/100 | 15,0 |
| Schema / Structured Data | 10% | 5/100 | 0,5 |
| Performance (CWV estimado) | 10% | 72/100 | 7,2 |
| AI Search Readiness (GEO) | 10% | 40/100 | 4,0 |
| Imagens | 5% | 82/100 | 4,1 |
| **Total** | **100%** | — | **62,5 / 100** |

---

## Sumário Executivo

### Top 5 Problemas Críticos
1. **Sem robots.txt** — retorna 404; o Google não tem orientações de crawl
2. **Sem sitemap.xml** — retorna 404; dificulta indexação
3. **Sem structured data (JSON-LD)** — nenhum schema implementado; zero rich results possíveis
4. **Open Graph incompleto** — faltam `og:image`, `og:url`, `og:locale`; partilhas nas redes sociais aparecem sem imagem
5. **Sem canonical tag** — sem sinal claro para o Google sobre a URL canónica

### Top 5 Quick Wins
1. Adicionar `robots.txt` (5 min)
2. Adicionar `sitemap.xml` (10 min)
3. Adicionar `<link rel="canonical">` no head (2 min)
4. Completar Open Graph com `og:image`, `og:url`, `og:locale` (10 min)
5. Adicionar JSON-LD `Person` schema (20 min)

---

## 1. Technical SEO

### 1.1 Crawlability
| Item | Status | Detalhe |
|------|--------|---------|
| robots.txt | ❌ 404 | Inexistente — Google crawla sem restrições mas não tem orientação |
| sitemap.xml | ❌ 404 | Inexistente — Google precisa descobrir a página por links |
| Canonical tag | ❌ Ausente | Sem `<link rel="canonical" href="https://filipeduarte.netlify.app/">` |
| Meta robots | ✅ Ausente mas OK | Sem `noindex` — página está indexável |
| Redirect cadeia | ✅ OK | Sem redirecionamentos detectados |

### 1.2 Indexabilidade
| Item | Status | Detalhe |
|------|--------|---------|
| `<html lang="pt-BR">` | ✅ Correto | Idioma declarado corretamente |
| `<meta charset="UTF-8">` | ✅ Correto | |
| `<meta name="viewport">` | ✅ Correto | `width=device-width, initial-scale=1.0` |
| Title tag | ✅ OK | "Filipe Duarte - Produtor Multimídia" (34 chars) |
| Meta description | ✅ OK | 154 chars — dentro do limite |
| Hreflang | N/A | Site monolíngue, não necessário |

### 1.3 Segurança & Headers
| Item | Status | Detalhe |
|------|--------|---------|
| HTTPS | ✅ OK | Netlify fornece SSL automático |
| `rel="noopener noreferrer"` | ✅ Correto | Todos os links externos têm o atributo |
| Favicon | ⚠️ Parcial | Apenas `icon.svg` — sem variantes 32×32, 180×180 (Apple Touch) |

---

## 2. On-Page SEO

### 2.1 Title Tag
- **Atual:** `Filipe Duarte - Produtor Multimídia` (34 chars)
- **Status:** ✅ Dentro do limite (recomendado: 50–60 chars)
- **Oportunidade:** Poderia incluir localização ou diferencial: `Filipe Duarte — Produtor Multimídia · Porto Alegre`

### 2.2 Meta Description
- **Atual:** "Filipe Duarte - Produtor Multimídia. Design + Código + IA Generativa. Adobe Certified. Portfólio de projetos e experiências em Porto Alegre e Região Metropolitana"
- **Status:** ✅ OK (154 chars)
- **Oportunidade:** Adicionar call-to-action implícita: "Disponível para CLT, freelance e projetos colaborativos."

### 2.3 Estrutura de Headings
```
H1: PRODUTOR Multimídia ✅ (único H1)
  H2: 01 — Sobre Mim
  H2: 02 — Ferramentas & Competências
  H2: 03 — Projetos em Destaque
    H3: MobiStudio
    H3: Rap In Cena
    H3: Estampas MobiStudio
    ... (5 H3 adicionais)
  H2: 04 — Experiência Profissional
    H3: Auxiliar de Marketing
    H3: Estágio — Design de Mídias Sociais...
    H3: Monitor — Voluntário
    H3: Estágio — Design de Criação & Web Design
    H3: Designer Gráfico Freelancer
  H2: 05 — Formação & Certificações
    H3: (títulos de formação)
  H2: 06 — Depoimentos
  H2: 07 — Em Desenvolvimento
  H2: 08 — Contato
```
- **Status:** ✅ Hierarquia clara e consistente
- **Oportunidade:** H1 não inclui o nome "Filipe Duarte" — recrutadores que procuram pelo nome não encontram o keyword primário no H1

### 2.4 Internal Linking
- **Status:** ⚠️ Apenas âncoras internas (`#sobre`, `#projetos`, etc.)
- **Nota:** Para um single-page portfolio isto é esperado e aceitável
- **Oportunidade:** Adicionar uma página de projeto individual por projeto principal melhora indexabilidade futura

### 2.5 Conteúdo
- **Extensão:** ~2.500 palavras estimadas — ✅ Adequado para portfólio
- **Densidade de keywords:** Naturalmente bem distribuída (design, multimídia, Porto Alegre, Adobe, Figma)
- **Legibilidade:** ✅ Português claro, frases concisas, bullet points
- **Emojis em headers:** ⚠️ Emojis em `section-label` e `dev-card__icon` — podem fragmentar texto para parsers SEO

---

## 3. Open Graph & Social

| Tag | Status | Valor Atual |
|-----|--------|-------------|
| `og:title` | ✅ | "Filipe Duarte - Produtor Multimídia" |
| `og:description` | ✅ | Presente |
| `og:type` | ✅ | "website" |
| `og:image` | ❌ **AUSENTE** | Partilhas no LinkedIn/WhatsApp/X aparecem sem imagem |
| `og:url` | ❌ **AUSENTE** | URL canónica não declarada |
| `og:locale` | ❌ Ausente | Deveria ser `pt_BR` |
| Twitter Card (`twitter:card`) | ❌ **AUSENTE** | Sem preview no X/Twitter |
| Twitter Card (`twitter:title`) | ❌ Ausente | — |
| Twitter Card (`twitter:description`) | ❌ Ausente | — |
| Twitter Card (`twitter:image`) | ❌ Ausente | — |

**Impacto:** Quando alguém partilha o link do portfólio no LinkedIn, WhatsApp ou X, aparece sem imagem de preview — prejudica a impressão profissional.

---

## 4. Structured Data (Schema.org)

**Status: ZERO schemas implementados** ❌

### Schemas Recomendados para este Portfólio

#### 4.1 Person Schema (CRÍTICO para portfólio pessoal)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Filipe Velasco Duarte Delfino",
  "alternateName": "Filipe Duarte",
  "jobTitle": "Produtor Multimídia",
  "url": "https://filipeduarte.netlify.app/",
  "email": "filipe.velascoduarte@gmail.com",
  "telephone": "+55-51-9-9605-1030",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Gravataí",
    "addressRegion": "RS",
    "addressCountry": "BR"
  },
  "sameAs": [
    "https://linkedin.com/in/filipevelascoduarte",
    "https://behance.net/filipevelascoduarte"
  ],
  "knowsAbout": ["Design Gráfico", "Produção Multimídia", "UX/UI", "Adobe Photoshop", "Figma", "Blender", "JavaScript"],
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "name": "Adobe Certified Professional"
  }
}
```

#### 4.2 WebSite Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Filipe Duarte — Portfólio",
  "url": "https://filipeduarte.netlify.app/",
  "author": { "@type": "Person", "name": "Filipe Duarte" }
}
```

#### 4.3 ItemList para Projetos (Oportunidade)
Cada projeto pode ter um `CreativeWork` schema com `name`, `description`, `url`, `author`.

---

## 5. Imagens

| Imagem | Alt Text | Formato | Otimização |
|--------|----------|---------|-----------|
| Banner_MobiStudio_Portfolio.jpg | ✅ "Banner MobiStudio" | JPG | ⚠️ Verificar tamanho |
| Banner_MobiNoRIC_Portfolio.jpg | ✅ "Banner Rap in Cena" | JPG | ⚠️ Verificar tamanho |
| mobiStudio Banner.png | ✅ "Capa do projeto Estampas Autorais mobiStudio" | ⚠️ PNG | Converter para WebP |
| customic-3d.jpg | ✅ "Projeto 3D - Capa Customic" | JPG | ⚠️ Verificar tamanho |
| mobifans-3d.jpg | ✅ "3D Material Mobifans" | JPG | ⚠️ Verificar tamanho |
| dia-dos-namorados.jpg | ✅ "Audiovisual - Campanha Dia dos Namorados" | JPG | ⚠️ Verificar tamanho |
| wallets.jpg | ✅ "Mobifans - Placas, Wallets e Crossbody" | JPG | ⚠️ Verificar tamanho |
| Correio do Povo (externo) | ✅ "Foto publicada no Correio do Povo" | JPG externo | N/A |
| Banner_Linkedin.png | — não referenciada | PNG | Não está no HTML |

**Positivo:** Todos os `<img>` têm atributo `alt` — o WebFetch deu falso negativo anteriormente.  
**Oportunidade:** Converter PNG e JPGs grandes para WebP (30–50% menor) e adicionar `loading="lazy"` nas imagens abaixo da fold.

---

## 6. Performance (CWV Estimado)

| Métrica | Estimativa | Target |
|---------|-----------|--------|
| LCP (Largest Contentful Paint) | ⚠️ ~2–3s | < 2,5s |
| INP (Interaction to Next Paint) | ✅ Baixo | < 200ms |
| CLS (Cumulative Layout Shift) | ✅ Provável OK | < 0,1 |

**Análise:**
- ✅ Apenas 1 CSS externo (`css/style.css`) + 1 JS (`js/main.js`) — minimal render-blocking
- ✅ `preconnect` para Google Fonts implementado
- ⚠️ Google Fonts (2 `link` preconnect) — pode causar layout shift se a fonte carregar tarde
- ⚠️ Imagens sem `loading="lazy"` — pode impactar LCP se as imagens de projeto forem grandes
- ⚠️ Imagens sem `width` e `height` declarados no HTML — causa CLS
- ⚠️ PNG de 1 arquivo (`mobiStudio Banner.png`) — PNGs tendem a ser maiores

**Recomendação:** Executar PageSpeed Insights real em `https://filipeduarte.netlify.app/` para métricas de campo.

---

## 7. AI Search Readiness (GEO)

| Sinal | Status | Detalhe |
|-------|--------|---------|
| `llms.txt` | ❌ Ausente | Ficheiro de instruções para AI crawlers |
| Conteúdo estruturado | ✅ Bom | Seções bem definidas, fáceis de extrair |
| Dados factuais citáveis | ✅ Excelente | Métricas concretas (9,56/10, 4+ anos, 50% redução) |
| FAQ section | ❌ Ausente | Perguntas e respostas aumentam citabilidade em AI Overviews |
| Schema Person | ❌ Ausente | Fundamental para AI entender quem é o autor |
| Depoimentos (Review signals) | ✅ Bom | 4 depoimentos com nome e contexto |
| Menção em media (Correio do Povo) | ✅ Excelente | Link para artigo credita autoridade |

**Nota:** O portfólio tem excelente conteúdo factual (métricas, projetos concretos, certificações) que é altamente citável por AI — o principal gap é estrutural (schema) e técnico (llms.txt).

---

## 8. E-E-A-T Assessment

| Pilar | Score | Evidências |
|-------|-------|-----------|
| **Experience** | 8/10 | 4+ anos documentados, projetos reais com resultados mensuráveis |
| **Expertise** | 8/10 | Adobe Certified, ferramentas específicas listadas, certificações Anthropic |
| **Authoritativeness** | 7/10 | Foto publicada no Correio do Povo, depoimentos com contexto profissional |
| **Trustworthiness** | 8/10 | Email real, WhatsApp, LinkedIn verificável, Behance com trabalhos reais |

**E-E-A-T Global: 7,75/10** — Forte para um portfólio pessoal. O gap principal é `schema` que formalizaria estes sinais para o Google.

---

## 9. Acessibilidade (Impacto SEO)

| Item | Status | Detalhe |
|------|--------|---------|
| `aria-label` nos botões | ✅ | Nav hamburger, scroll-to-top, contact links |
| `aria-labelledby` nas sections | ✅ | Todas as sections têm `aria-labelledby` |
| `role="list"` / `role="listitem"` | ✅ | Timeline e contact links |
| `aria-hidden="true"` em decorativos | ✅ | Elementos decorativos marcados |
| Skip to main content | ❌ Ausente | Útil para screen readers |
| Contraste de cores | ⚠️ A verificar | Depende dos valores em `style.css` |

---

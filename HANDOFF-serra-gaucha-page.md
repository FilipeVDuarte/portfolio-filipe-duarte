# Handoff: Página de Portfólio — Serra Gaúcha (Raiz e Colheita)

Gerado: 2026-07-18.

## 1. Objetivo
Criar dentro do portfólio (`projetos/`) uma página de case completa para o projeto "Serra Gaúcha — Raiz e Colheita" (Concurso de Criação da Marca SERRA GAÚCHA / G30). Sem vídeo, só imagens. Pedido extra do usuário: um "leitor de PDF" embutido na página para o Manual de Identidade Visual.

Contexto do projeto em si (branding, não o portfólio): ver `G:\Meu Drive\Desafio Serra Gaúcha\HANDOFF.md`, seção 7 — resultado do concurso saiu, projeto não avançou aos 10 semifinalistas (de 48 propostas válidas), sigilo do regulamento não se aplica mais, resultado criativo completo pode ser mostrado publicamente.

## 2. Estado atual — já feito nesta sessão

### Assets copiados para `public/projetos/serra_gaucha/`
Copiado do Drive (`G:\Meu Drive\Desafio Serra Gaúcha\...`) para o repo do portfólio:
- `pdf/MIV.pdf` (21MB, manual de identidade final)
- `pdf/Defesa-Conceitual.pdf` (63KB)
- `pdf/Aplicacoes-Exemplificadas.pdf` (5.2MB)
- `logos/Logo-Duo-Color.png`, `Logo-Default.png`, `Logo-Negativo.png`, `Logo-Araucaria.png`, `Logo-Pinhao.png` (3000×3000 cada)
- `Banner_KeyVisual.png` (1618×694, usado como hero/banner)
- `aplicacoes/`: `Mockup_Vinho.jpg`, `Mockup_JarraGeleia.jpg`, `Mockup_PacoteCha.png`, `Mockup_Placa_01.jpg`, `Mockup_Placa_02.jpg`, `Mockup_Outdoor.jpg`, `Mockup_GravuraMadeira.jpg`

**Nota:** `Mockup_Vinho_2.jpg` está com 0 bytes na origem (arquivo quebrado/não sincronizado no Drive) — não foi copiado, por isso a galeria usa só 1 mockup de vinho.

**Atenção a tamanho de arquivo:** não havia `cwebp`/`imagemagick` disponíveis neste ambiente para otimizar as imagens (o resto do site usa `.webp`). Vários arquivos ficaram grandes: `Mockup_Placa_01.jpg` (6.6MB), `Mockup_Placa_02.jpg` (4.5MB), `Mockup_Outdoor.jpg` (4.4MB), `Mockup_GravuraMadeira.jpg` (5.3MB), `Mockup_PacoteCha.png` (2.0MB). **Isso precisa ser otimizado/convertido para `.webp` antes de publicar** — são originais em 4000×2667px+ sendo usados como thumbnails de galeria.

### Página criada
`src/pages/projetos/serra_gaucha.astro` — segue o mesmo padrão de `mobi_3d.astro` (layout `CaseStudy.astro`), com:
1. Breadcrumb + header (título "Serra Gaúcha — Raiz e Colheita")
2. Hero com `Banner_KeyVisual.png`
3. 01 — Contexto/Briefing (concurso G30, 49 municípios, 4 pilares, prazo de 17 dias)
4. 02 — Meu Papel (pesquisa territorial, conceito & símbolo, manual & aplicações)
5. 03 — Processo & Solução (conceito "Raiz e Colheita", símbolo gralha-azul/araucária, paleta, tipografia, par de imagens com as 4 variações de logo, bloco `case-code` com ficha técnica)
6. **Leitor de documentos** (seção nova, não existia padrão no site) — 3 abas (MIV / Defesa Conceitual / Aplicações) trocando `<iframe>`s que apontam pros PDFs em `public/projetos/serra_gaucha/pdf/`, com botão de download. CSS e JS inline dentro da própria página (`.doc-reader`, tabs trocam `src`... na verdade os 3 iframes já carregam todos, JS só alterna visibilidade + troca o link de download).
7. Galeria de aplicações (mockups de vinho, geleia, chá, placas, outdoor, gravura em madeira)
8. 04 — Resultado (honesto sobre não ter avançado, hipótese de lacuna em Representatividade Regional — indústria/inovação não cobertos nas aplicações)
9. Card "Próximo case" apontando para `mobi_placas.html`

### Listagem atualizada
`src/pages/projetos.astro`: adicionado card do projeto (categoria `design-grafico`) logo no topo do grid (antes do Design Kit), contador de filtro atualizado de "13 projetos" para "14 projetos".

## 3. Pendências / próximos passos

1. **Otimizar imagens** — converter os JPGs/PNGs grandes de `public/projetos/serra_gaucha/aplicacoes/` para `.webp` (como o resto do site faz) e redimensionar para tamanho de thumbnail razoável (ex. 1260px de largura, como os banners de outros projetos). Sem isso a página vai pesar muito no carregamento.
2. **Testar no navegador** — a sessão travou tentando subir o `astro dev` (server em `G:\Meu Drive\...` é lento pra bootar por causa do Google Drive como filesystem — não deu erro, só demorou). Rodar `npm run dev` localmente e verificar:
   - A página carrega em `/projetos/serra_gaucha.html`
   - O leitor de PDF (abas + iframe) funciona — iframes de PDF podem não renderizar em todos os navegadores/dispositivos (especialmente mobile Safari/iOS, que costuma forçar download em vez de preview inline). Testar em pelo menos desktop Chrome e mobile.
   - Os 3 PDFs carregam corretamente (o MIV tem 21MB, pode demorar).
   - Card na página `/projetos.html` aparece corretamente com filtro "Design Gráfico".
3. **Considerar fallback do leitor de PDF** — se o iframe nativo não funcionar bem em mobile, pode valer a pena trocar por PDF.js (biblioteca) para um viewer mais confiável cross-device, ou pelo menos deixar bem visível o botão de download como já está.
4. **Revisar textos** — os textos da página (contexto, processo, resultado) foram escritos nesta sessão com base no handoff do projeto de branding; vale o usuário revisar tom e precisão antes de publicar (ex. menção ao "pivô orientado por mentoria informal" — checar se cabe mencionar isso no portfólio público).
5. **Build final**: rodar `npm run build` antes de deploy pra garantir que não há erro de build com a nova página/imagens.

## 4. Arquivos tocados nesta sessão (git status)
```
 M src/pages/projetos.astro
?? public/projetos/serra_gaucha/
?? src/pages/projetos/serra_gaucha.astro
```
Nada foi commitado ainda.

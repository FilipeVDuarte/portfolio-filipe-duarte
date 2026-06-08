<div align="center">

# Filipe Duarte — Portfolio

[![Astro](https://img.shields.io/badge/Astro-6.4.2-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Site](https://img.shields.io/website?url=https%3A%2F%2Ffilipeduarte.netlify.app&style=for-the-badge&label=deploy&color=00C7B7)](https://filipeduarte.netlify.app)
[![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey?style=for-the-badge)](LICENSE.md)

<br/>

<table>
  <tr>
    <td><img src="public/img/og-image.jpg" alt="Portfolio — light mode" width="480"/></td>
    <td><img src="public/img/og-image-dark.jpg" alt="Portfolio — dark mode" width="480"/></td>
  </tr>
</table>

</div>

---

**PT** — Portfolio pessoal de Filipe Duarte, Diretor Criativo & Desenvolvedor. Estudos de caso de branding, motion design, desenvolvimento web e jogos — construídos com Astro, design Neo-Brutalista e atenção obsessiva aos detalhes.

**EN** — Personal portfolio of Filipe Duarte, Creative Director & Developer. Case studies on branding, motion design, web development and games — built with Astro, Neo-Brutalist design and obsessive attention to detail.

→ **[filipeduarte.netlify.app](https://filipeduarte.netlify.app)**

---

## Páginas / Pages

| Rota          | PT                     | EN             |
| ------------- | ---------------------- | -------------- |
| `/`         | Homepage               | Homepage       |
| `/projetos` | Grade de projetos      | Projects grid  |
| `/sobre`    | Trajetória e carreira | About & career |
| `/criticas` | Críticas de filmes    | Film reviews   |
| `/kit`      | Design system          | Design system  |

### Estudos de caso / Case studies

| Slug                             | Projeto                                       |
| -------------------------------- | --------------------------------------------- |
| `/projetos/mobi_studio`        | Customizador interativo de capas (Canvas API) |
| `/projetos/mobi_3d`            | Renders e animações 3D de produtos          |
| `/projetos/mobi_estampas`      | +70 estampas autorais                         |
| `/projetos/mobi_ric`           | Identidade — Rap In Cena festival            |
| `/projetos/mobi_alcas`         | Campanha de alças                            |
| `/projetos/mobi_namorados`     | Audiovisual — Dia dos Namorados              |
| `/projetos/mobi_placas`        | Gráficos para placas e carteiras             |
| `/projetos/animas_cavalry`     | 19 experimentos de motion procedural          |
| `/projetos/cavaleiro_de_latao` | Jogo roguelike em Godot                       |
| `/projetos/unisenac_vivencias` | Identidade visual universitária              |

---

## Stack

| Camada         | Tecnologia                                          |
| -------------- | --------------------------------------------------- |
| Framework      | [Astro](https://astro.build) 6.4.2 — output estático |
| Estilização  | CSS3 puro com custom properties (Neo-Brutalista)    |
| Interatividade | Vanilla JavaScript                                  |
| Animações    | Lottie.js + CSS transitions                         |
| Fontes         | Self-hosted WOFF2 — Syne, Inter, Space Mono        |
| Dados          | JSON + CSV (integração Letterboxd)                |
| Deploy         | Netlify (Node 22)                                   |

---

## Rodando localmente / Running locally

```bash
# instalar dependências
npm install

# servidor de desenvolvimento
npm run dev

# build de produção (minifica CSS + compila Astro)
npm run build

# preview do build estático
npm run preview
```

---

## Funcionalidades / Features

- **i18n PT/EN** — tradução client-side via atributos `data-en`
- **Dark mode** — tema completo via CSS custom properties
- **Cursor customizado** — 4 estados × 2 temas
- **Filtro de projetos** — por categoria, sem reload
- **Letterboxd** — RSS + CSV → JSON consolidado via script local
- **SEO** — JSON-LD, OG tags, canonical, sitemap, robots.txt
- **Performance** — fontes self-hosted, imagens WebP, CSS minificado

---

## Contato / Contact

<div>
  <a href="https://www.linkedin.com/in/filipe-velasco/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-filipe--velasco-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
   
  <a href="mailto:filipe.velascoduarte@gmail.com">
    <img src="https://img.shields.io/badge/Email-filipe.velascoduarte%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
</div>

---

## Licença / License

[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey?style=flat-square)](LICENSE.md)

**PT** — Este projeto está licenciado sob [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](LICENSE.md). Você pode visualizar e compartilhar o material com atribuição, mas **não pode usá-lo comercialmente nem criar obras derivadas**.

**EN** — This project is licensed under [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International](LICENSE.md). You may view and share the material with attribution, but **commercial use and derivative works are not permitted**.

© 2026 Filipe Duarte

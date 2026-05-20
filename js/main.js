/* ============================================
   FILIPE DUARTE — PORTFOLIO
   main.js — Interações e animações
   ============================================ */



(function () {
  'use strict';

  // SVG do ícone real — versão original (fundo escuro) e invertida (fundo amarelo)
  const svgOriginal = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="10" fill="#1B1B1D"/><path d="M40.8557 29.5186C43.4546 29.5186 45.6012 29.7689 47.2953 30.2694C48.9894 30.7699 50.3178 31.4534 51.2803 32.3197C52.2429 33.186 52.9167 34.1775 53.3017 35.294C53.706 36.3914 53.9082 37.5465 53.9082 38.7593C53.9082 39.9721 53.6868 41.1369 53.244 42.2534C52.8012 43.3508 52.0696 44.3326 51.0493 45.1989C50.0482 46.0652 48.7103 46.7487 47.0354 47.2492C45.3798 47.7497 43.3198 48 40.8557 48H20.0641V29.5186H40.8557ZM27.2834 42.2246H40.5669C41.645 42.2246 42.5594 42.1572 43.3102 42.0224C44.061 41.8684 44.6578 41.647 45.1006 41.3582C45.5626 41.0695 45.8899 40.7133 46.0824 40.2898C46.2942 39.847 46.4001 39.3368 46.4001 38.7593C46.4001 38.1818 46.2942 37.6812 46.0824 37.2577C45.8899 36.8149 45.5626 36.4491 45.1006 36.1604C44.6578 35.8716 44.061 35.6598 43.3102 35.5251C42.5594 35.371 41.645 35.294 40.5669 35.294H27.2834V42.2246Z" fill="#FFC300"/><path d="M39.9841 15.08V20.5667H18.0952V23.0212H35.999V27.9304H18.0952V33.5614H10.8759V15.08H39.9841Z" fill="#FFC300"/></svg>`;

  const svgInvertido = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" rx="10" fill="#FFC300"/><path d="M40.8557 29.5186C43.4546 29.5186 45.6012 29.7689 47.2953 30.2694C48.9894 30.7699 50.3178 31.4534 51.2803 32.3197C52.2429 33.186 52.9167 34.1775 53.3017 35.294C53.706 36.3914 53.9082 37.5465 53.9082 38.7593C53.9082 39.9721 53.6868 41.1369 53.244 42.2534C52.8012 43.3508 52.0696 44.3326 51.0493 45.1989C50.0482 46.0652 48.7103 46.7487 47.0354 47.2492C45.3798 47.7497 43.3198 48 40.8557 48H20.0641V29.5186H40.8557ZM27.2834 42.2246H40.5669C41.645 42.2246 42.5594 42.1572 43.3102 42.0224C44.061 41.8684 44.6578 41.647 45.1006 41.3582C45.5626 41.0695 45.8899 40.7133 46.0824 40.2898C46.2942 39.847 46.4001 39.3368 46.4001 38.7593C46.4001 38.1818 46.2942 37.6812 46.0824 37.2577C45.8899 36.8149 45.5626 36.4491 45.1006 36.1604C44.6578 35.8716 44.061 35.6598 43.3102 35.5251C42.5594 35.371 41.645 35.294 40.5669 35.294H27.2834V42.2246Z" fill="#1B1B1D"/><path d="M39.9841 15.08V20.5667H18.0952V23.0212H35.999V27.9304H18.0952V33.5614H10.8759V15.08H39.9841Z" fill="#1B1B1D"/></svg>`;

  function toDataUri(svg) {
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  const titulos = ["Filipe Duarte", "Produtor Multimídia", "Entre em contato!"];
  const favicons = [toDataUri(svgOriginal), toDataUri(svgInvertido), toDataUri(svgOriginal)];

  let index = 0;
  const faviconEl = document.querySelector('link[rel="icon"]');

  setInterval(() => {
    document.title = titulos[index];
    if (faviconEl && favicons[index]) {
      faviconEl.setAttribute('href', favicons[index]);
    }
    index = (index + 1) % titulos.length;
  }, 2500);


  /* ------------------------------------------
     NAV: sticky shadow + mobile menu
  ------------------------------------------ */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const navMobile = document.querySelector('.nav__mobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile .nav__link');

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    toggleScrollTop();
  }

  function toggleMenu() {
    const open = hamburger.classList.toggle('open');
    if (navMobile) {
      navMobile.style.display = open ? 'flex' : 'none';
    }
    hamburger.setAttribute('aria-expanded', open);
  }

  hamburger && hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      if (navMobile) navMobile.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------
     SCROLL TO TOP
  ------------------------------------------ */
  const scrollTopBtn = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ------------------------------------------
     REVEAL ON SCROLL (IntersectionObserver)
  ------------------------------------------ */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ------------------------------------------
     TOOL CHIPS: hover tooltip com nível
  ------------------------------------------ */
  const toolChips = document.querySelectorAll('.tool-chip[data-level]');

  toolChips.forEach(chip => {
    chip.setAttribute('title', 'Nível: ' + chip.dataset.level);
  });

  /* ------------------------------------------
     SMOOTH SCROLL para âncoras internas
  ------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ------------------------------------------
     HERO: efeito parallax leve no texto de fundo
  ------------------------------------------ */
  const heroDeco = document.querySelector('.hero__decoration');

  function onParallax() {
    if (!heroDeco) return;
    const y = window.scrollY;
    heroDeco.style.transform = `translateY(calc(-50% + ${y * 0.18}px))`;
  }

  /* ------------------------------------------
     EVENT LISTENERS
  ------------------------------------------ */
  window.addEventListener('scroll', () => {
    onScroll();
    onParallax();
  }, { passive: true });

  /*
   * Fecha o menu mobile ao redimensionar para desktop.
   * CSS !important não sobrepõe inline styles setados por JS,
   * então este listener garante que o menu feche mesmo que
   * o celular seja girado ou a janela seja alargada.
   */
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      hamburger.classList.remove('open');
      if (navMobile) navMobile.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }, { passive: true });

  /* Inicializar estado */
  onScroll();

  /* ------------------------------------------
     YEAR AUTOMÁTICO no footer
  ------------------------------------------ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

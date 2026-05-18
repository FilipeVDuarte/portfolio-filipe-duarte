/* ============================================
   FILIPE DUARTE — PORTFOLIO
   main.js — Interações e animações
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     NAV: sticky shadow + mobile menu
  ------------------------------------------ */
  const nav         = document.querySelector('.nav');
  const hamburger   = document.querySelector('.nav__hamburger');
  const navMobile   = document.querySelector('.nav__mobile');
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
     COUNTER ANIMATION para métricas do hero
  ------------------------------------------ */
  function animateCounter(el, target, suffix, duration) {
    const start     = performance.now();
    const isDecimal = target % 1 !== 0;

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = isDecimal
        ? (eased * target).toFixed(2)
        : Math.round(eased * target);

      el.textContent = current + (suffix || '');

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const metricCards = document.querySelectorAll('.metric-card[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target.querySelector('.metric-card__number');
        const target = parseFloat(entry.target.dataset.count);
        const suffix = entry.target.dataset.suffix || '';
        animateCounter(el, target, suffix, 1400);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  metricCards.forEach(card => counterObserver.observe(card));

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
      const navH   = nav ? nav.offsetHeight : 0;
      const top    = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
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

  /* Inicializar estado */
  onScroll();

  /* ------------------------------------------
     YEAR AUTOMÁTICO no footer
  ------------------------------------------ */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

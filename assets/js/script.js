'use strict';

/*
 * Progressive enhancement only. Everything on the page works with JavaScript
 * switched off; this file adds the mobile menu, scroll state, section
 * highlighting, the work filter and the reveal animation.
 */

/* ------------------------------------------------------- mobile menu --- */

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

function closeNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080) closeNav();
  });
}

/* ----------------------------------------------------- header shadow --- */

if (header) {
  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });
}

/* -------------------------------------------------- active nav link ---- */

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('main section[id]'));

if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
  const setActive = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ----------------------------------------------------- work filtering -- */

const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const workCards = Array.from(document.querySelectorAll('.work-card'));

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    workCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

/* ------------------------------------------------------------ reveal --- */

const revealTargets = Array.from(document.querySelectorAll(
  '.section-head, .capability-card, .work-card, .timeline-item, .cert-item, .press-item'
));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;
      target.classList.add('is-visible');
      observer.unobserve(target);

      // Drop the animation classes again once the fade has finished, so the
      // stagger delay never slows down later hover transitions.
      window.setTimeout(() => {
        target.classList.remove('reveal', 'is-visible');
        target.style.transitionDelay = '';
      }, 800);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal');
    target.style.transitionDelay = `${(index % 4) * 70}ms`;
    revealObserver.observe(target);
  });

  // Safety net: if the observer has not reported on something the visitor can
  // actually see (some browsers defer the first callback), show it anyway.
  window.setTimeout(() => {
    revealTargets.forEach((target) => {
      if (!target.classList.contains('reveal')) return;

      const rect = target.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;

      if (onScreen) {
        target.classList.remove('reveal');
        target.style.transitionDelay = '';
      }
    });
  }, 3000);
}

/* -------------------------------------------------------- footer year -- */

const yearSlots = document.querySelectorAll('[data-year]');
const currentYear = String(new Date().getFullYear());

yearSlots.forEach((slot) => {
  slot.textContent = currentYear;
});
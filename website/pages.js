// ============================================================
// CLARICITO — INNER PAGES JS (pages.js)
// Shared across: About · Philosophy · Privacy · Terms
// ============================================================

// ---- Nav scroll behaviour ----
// Nav starts scrolled (styled) on inner pages — stays styled always
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  // Always keep scrolled class on inner pages — just add glow on scroll
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 1px 40px rgba(0,0,0,0.3)';
  } else {
    nav.style.boxShadow = '';
  }
}, { passive: true });

// ---- Mobile hamburger ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

function closeMobile() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

// ---- Scroll-triggered fade animations ----
const fadeEls = document.querySelectorAll(
  '.page-pillar, .commitment-card, .philosophy-belief, ' +
  '.aside-card, .legal-promise-card, .page-cta-inner'
);

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll(
        '.page-pillar, .commitment-card, .legal-promise-card'
      );
      let delay = 0;
      siblings.forEach((s, idx) => { if (s === entry.target) delay = idx * 80; });
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

fadeEls.forEach(el => obs.observe(el));

// ---- Legal TOC smooth scroll + active highlight ----
const tocLinks = document.querySelectorAll('.legal-toc a');
const legalSections = document.querySelectorAll('.legal-section');

if (tocLinks.length > 0) {
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Highlight active TOC section on scroll
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  legalSections.forEach(s => sectionObs.observe(s));
}

// ---- Subtle cursor trail (reused from main site) ----
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;
const trail = document.createElement('div');
trail.style.cssText = `
  position:fixed; width:6px; height:6px;
  background:rgba(212,175,55,0.35); border-radius:50%;
  pointer-events:none; z-index:9999;
  transform:translate(-50%,-50%);
  mix-blend-mode:screen;
`;
document.body.appendChild(trail);
document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
(function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();
if ('ontouchstart' in window) trail.style.display = 'none';

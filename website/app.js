// ============================================================
// CLARICITO WEBSITE — JavaScript
// ============================================================

// ---- NAV scroll behavior ----
const nav = document.getElementById('nav');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScrollY = scrollY;
}, { passive: true });

// ---- Mobile hamburger ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  // animate hamburger lines
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

// ---- Scroll-triggered fade-up animations ----
const fadeElements = document.querySelectorAll(
  '.feature-card, .type-card, .circle-card, .testimonial-card, ' +
  '.pillar, .clari-copy, .clari-visual, .mood-copy, .mood-visual, ' +
  '.dashboard-copy, .dashboard-visual, .rel-insight-card, ' +
  '.statement-inner, .section-title, .section-sub'
);

fadeElements.forEach(el => {
  el.classList.add('fade-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards in the same parent
      const parent = entry.target.parentElement;
      const siblings = parent.querySelectorAll('.fade-up');
      let delay = 0;
      siblings.forEach((sib, idx) => {
        if (sib === entry.target) delay = idx * 80;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

fadeElements.forEach(el => observer.observe(el));

// ---- Form submission ----
function handleSubmit(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const email = document.getElementById('email').value.trim();
  const typeInput = document.querySelector('input[name="type"]:checked');
  const type = typeInput ? typeInput.value : 'notSure';

  if (!firstName || !email) return;

  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Joining...';
  btn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    document.querySelector('.waitlist-form').style.display = 'none';
    document.getElementById('success').style.display = 'block';
    // Scroll the success message into view
    document.getElementById('success').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
}

// ---- Smooth active nav link highlighting ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ---- Typewriter effect for hero ----
// (subtle animated underline on the italic word)
const italicEl = document.querySelector('.hero-headline em');
if (italicEl) {
  italicEl.style.display = 'inline-block';
  italicEl.style.borderBottom = '1px solid transparent';
  setTimeout(() => {
    italicEl.style.transition = 'border-color 1s ease 1.2s';
    italicEl.style.borderColor = 'rgba(212, 175, 55, 0.4)';
  }, 100);
}

// ---- Type card hover color ----
const typeColors = {
  architect: 'rgba(212, 175, 55, 0.06)',
  harmonizer: 'rgba(212, 175, 55, 0.06)',
  champion: 'rgba(212, 175, 55, 0.06)',
  realist: 'rgba(212, 175, 55, 0.06)',
  adventurer: 'rgba(212, 175, 55, 0.06)',
  guardian: 'rgba(212, 175, 55, 0.06)',
};

document.querySelectorAll('.type-card').forEach(card => {
  const type = card.getAttribute('data-type');
  card.addEventListener('mouseenter', () => {
    card.style.background = typeColors[type] || '';
    card.style.borderColor = 'rgba(212, 175, 55, 0.2)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
    card.style.borderColor = '';
  });
});

// ---- Chat bubble staggered animation ----
const bubbles = document.querySelectorAll('.chat-bubble');
bubbles.forEach((bubble, i) => {
  bubble.style.animationDelay = `${i * 0.4 + 0.5}s`;
  bubble.style.opacity = '0';
  bubble.style.animation = `fadeSlideIn 0.6s ease ${i * 0.4 + 0.5}s both`;
});

// ---- Parallax orb effect on scroll ----
const orbs = document.querySelectorAll('.orb-1, .orb-2, .orb-3');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = (i + 1) * 0.08;
    orb.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ---- Cursor trail effect (subtle, gold) ----
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

const trail = document.createElement('div');
trail.style.cssText = `
  position: fixed;
  width: 6px;
  height: 6px;
  background: rgba(212, 175, 55, 0.4);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(trail);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.15;
  trailY += (mouseY - trailY) * 0.15;
  trail.style.left = trailX + 'px';
  trail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Hide trail on mobile
if ('ontouchstart' in window) {
  trail.style.display = 'none';
}

// ---- Dashboard bar animation on scroll ----
const dashSection = document.querySelector('.dashboard-section');
let dashAnimated = false;

if (dashSection) {
  const dashObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !dashAnimated) {
      dashAnimated = true;
      document.querySelectorAll('.dash-bar-fill').forEach((bar, i) => {
        bar.style.animationDelay = `${i * 0.15}s`;
        bar.style.animationDuration = '1.2s';
      });
    }
  }, { threshold: 0.3 });
  dashObs.observe(dashSection);
}

// ---- Mood card subtle hover tilt ----
const moodCardFront = document.querySelector('.mood-card-front');
if (moodCardFront) {
  moodCardFront.addEventListener('mousemove', (e) => {
    const rect = moodCardFront.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    moodCardFront.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
  });
  moodCardFront.addEventListener('mouseleave', () => {
    moodCardFront.style.transform = '';
  });
}

// ---- Console easter egg ----
console.log('%c✦ Claricito', 'color: #D4AF37; font-family: Georgia, serif; font-size: 24px; font-weight: 300;');
console.log('%cKnow yourself. Grow your world.', 'color: #888; font-size: 12px; letter-spacing: 2px;');

// ---- Auto-update copyright year ----
(function () {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
})();

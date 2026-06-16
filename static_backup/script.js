// ==============================
// CUSTOM CURSOR — midlife.engineering style
// Warm orange dot + trailing ring
// ==============================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Track mouse position — dot follows instantly
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

// Ring follows with smooth lag (midlife style easing)
function animateRing() {
  const ease = 0.1;
  ringX += (mouseX - ringX) * ease;
  ringY += (mouseY - ringY) * ease;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Hover state on interactive elements
const interactives = document.querySelectorAll(
  'a, button, .btn, .skill-card, .project-card, .edu-card, .contact-item, .social-link, .timeline-content, .profile-item, .tag'
);
interactives.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// Fade on leave/enter
document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity = '1';
  cursorRing.style.opacity = '1';
});

// ==============================
// NAVBAR SCROLL EFFECT
// ==============================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveNav();
});

// ==============================
// ACTIVE NAV LINK
// ==============================
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.section === current) link.classList.add('active');
  });
}

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ==============================
// TYPING EFFECT — midlife minimal
// ==============================
const phrases = [
  'Full-Stack Developer',
  'Software Engineer',
  'Node.js & React Dev',
  'API Architect',
  'Problem Solver',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const phrase = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      isDeleting = true;
      return setTimeout(typeEffect, 2200);
    }
    setTimeout(typeEffect, 75);
  } else {
    typedEl.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeEffect, 38);
  }
}
setTimeout(typeEffect, 1000);

// ==============================
// SCROLL REVEAL
// ==============================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ==============================
// ANIMATED COUNTERS
// ==============================
function animateCounter(el, target, duration = 1600) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
    el.textContent = Math.floor(eased * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count));
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ==============================
// PARALLAX ORBS — mouse follow
// midlife.engineering signature effect
// ==============================
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');
const orb3 = document.querySelector('.orb-3');

let orbMouseX = 0, orbMouseY = 0;
let orbCurrentX1 = 0, orbCurrentY1 = 0;
let orbCurrentX2 = 0, orbCurrentY2 = 0;

document.addEventListener('mousemove', (e) => {
  // Normalize to -1 → 1
  orbMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  orbMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateOrbs() {
  const ease = 0.04;

  orbCurrentX1 += (orbMouseX * 28 - orbCurrentX1) * ease;
  orbCurrentY1 += (orbMouseY * 28 - orbCurrentY1) * ease;
  orbCurrentX2 += (-orbMouseX * 20 - orbCurrentX2) * ease;
  orbCurrentY2 += (-orbMouseY * 20 - orbCurrentY2) * ease;

  if (orb1) orb1.style.transform = `translate(${orbCurrentX1}px, ${orbCurrentY1}px)`;
  if (orb2) orb2.style.transform = `translate(${orbCurrentX2}px, ${orbCurrentY2}px)`;
  if (orb3) orb3.style.transform = `translate(${orbCurrentX1 * 0.5}px, ${orbCurrentY1 * 0.5}px)`;

  requestAnimationFrame(animateOrbs);
}
animateOrbs();

// ==============================
// SUBTLE TILT ON CARDS
// midlife-inspired micro-interaction
// ==============================
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5);
    const y = ((e.clientY - rect.top) / rect.height - 0.5);
    card.style.transform = `scale(1.01) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
    card.style.transition = 'transform 0.08s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.35s ease, background 0.25s ease';
  });
});

// ==============================
// PAGE LOAD FADE IN
// ==============================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Trigger hero reveals
  document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 110);
  });
});

// ==============================
// SCROLL PROGRESS INDICATOR
// ==============================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px;
  background: #ff611a; z-index: 9999;
  width: 0%; transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + '%';
});

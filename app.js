/* ═══════════════════════════════════════════════
   SPOON CONSULTING — FINANCE PACK APP.JS
═══════════════════════════════════════════════ -*/

// ── Navbar scroll effect ─────────────────────
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

// ── Back to top ───────────────────────────────
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Mobile nav toggle ─────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Intersection Observer for reveal animations ─
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger sibling reveal elements
function assignRevealDelays() {
  const groups = document.querySelectorAll(
    '.problems-grid, .metrics-grid, .pillars-grid, .pricing-grid, .testimonials-grid, .benefits-cards, .about-stats-grid, .timeline-phases, .architecture-flow'
  );
  groups.forEach(group => {
    const children = group.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.dataset.delay = i * 100;
    });
  });
}

assignRevealDelays();

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Animated stat counters (hero) ────────────
function animateCounter(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start);
  }, 16);
}

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target));
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ── Dashboard Tabs ────────────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetContent = document.getElementById(`tab-${target}`);
    if (targetContent) {
      targetContent.classList.add('active');
      targetContent.style.animation = 'none';
      targetContent.offsetHeight; // reflow
      targetContent.style.animation = 'fadeInTab 0.35s ease forwards';
    }
  });
});

// Inject fadeInTab keyframe dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInTab {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .tab-content.active {
    animation: fadeInTab 0.35s ease forwards;
  }
`;
document.head.appendChild(styleSheet);

// ── Smooth scroll for all anchor links ────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Form submission ────────────────────────────
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  // Simulate submission
  const btn = form.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
    success.style.animation = 'fadeInUp 0.5s ease forwards';
  }, 1200);
}

// ── Navbar active section highlighting ────────
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchorLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active-nav');
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));

// Add active-nav style
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-links a.active-nav { color: var(--teal) !important; }`;
document.head.appendChild(navStyle);

// ── Parallax subtle effect on hero shapes ────
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, i) => {
    const speed = 0.05 + (i * 0.02);
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
}, { passive: true });

// ── Income table colgroup fix (4-col vs 5-col) ─
// The income-header-row and income-row for cashflow have 5 cols
// handled via inline style overrides on parent mockup

console.log('%cSpoon Consulting Finance Pack — loaded ✓', 'color:#4CC9C5;font-weight:bold;font-size:14px;');

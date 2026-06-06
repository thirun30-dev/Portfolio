/* ================================================================
   PORTFOLIO — script.js
   Thirunavukkarasu Veeramani · Robotics Engineer
   ================================================================ */

/* ── SCROLL PROGRESS BAR ── */
const progressBar = document.getElementById('scroll-progress');
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}

/* ── BACK TO TOP ── */
const backToTop = document.getElementById('back-to-top');
function handleBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── NAV SCROLL SHRINK ── */
const navbar = document.getElementById('navbar');
function handleNavScroll() {
  if (!navbar) return;
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── COMBINED SCROLL HANDLER ── */
window.addEventListener('scroll', () => {
  updateProgress();
  handleBackToTop();
  handleNavScroll();
}, { passive: true });

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* ── TIMELINE ZIGZAG SCROLL REVEAL ── */
const timelineItems = document.querySelectorAll('.timeline-item.reveal-left, .timeline-item.reveal-right');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
    }
  });
}, { threshold: 0.15 });
timelineItems.forEach(el => timelineObserver.observe(el));

/* ── SKILL BAR ANIMATION ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        const w = fill.getAttribute('data-w');
        setTimeout(() => { fill.style.width = w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-bars').forEach(el => skillObserver.observe(el));

/* ── ACTIVE NAV HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

/* ── CURSOR VARIABLES & FOLLOW PHYSICS ── */
let mouseX = -1000, mouseY = -1000;
let cursorX = -1000, cursorY = -1000;
let ringX = -1000, ringY = -1000;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const glow = document.querySelector('.hero-glow');
  if (glow) {
    const x = (e.clientX / window.innerWidth) * 24 - 12;
    const y = (e.clientY / window.innerHeight) * 24 - 12;
    glow.style.transform = `translate(${x}px, ${y}px)`;
  }
});

const cursor = document.getElementById('custom-cursor');
const cursorRing = document.getElementById('custom-cursor-ring');

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.25;
  cursorY += (mouseY - cursorY) * 0.25;
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

function setupHoverEffects() {
  const clickables = document.querySelectorAll('a, button, .pill, .tool-chip, .contact-item');
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-card-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-card-hover'));
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
setupHoverEffects();

/* ── PROJECT ACCORDION Toggles ── */
function setupProjectAccordion() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const header = card.querySelector('.project-header');
    const collapse = card.querySelector('.project-info-collapse');
    if (!header || !collapse) return;

    header.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    header.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));

    header.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');

      // Collapse all other project cards
      projectCards.forEach(c => {
        if (c !== card && c.classList.contains('expanded')) {
          c.classList.remove('expanded');
          const otherCollapse = c.querySelector('.project-info-collapse');
          if (otherCollapse) otherCollapse.style.maxHeight = '0px';
        }
      });

      // Toggle this card
      if (isExpanded) {
        card.classList.remove('expanded');
        collapse.style.maxHeight = '0px';
      } else {
        card.classList.add('expanded');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });

  // Re-adjust heights when viewport is resized
  window.addEventListener('resize', () => {
    projectCards.forEach(c => {
      if (c.classList.contains('expanded')) {
        const collapse = c.querySelector('.project-info-collapse');
        if (collapse) collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });
  });
}
setupProjectAccordion();

/* ── PROJECT FILTER TABS ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
        // Reset collapsed state if it's hidden
        card.classList.remove('expanded');
        const collapse = card.querySelector('.project-info-collapse');
        if (collapse) collapse.style.maxHeight = '0px';
      }
    });

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  });
});

/* ================================================================
   TYPEWRITER EFFECT
   ================================================================ */
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const roles = [
    'Robotics Engineer',
    'Embedded Systems Dev',
    'AI / ML Enthusiast',
    'Autonomous Nav Builder',
    'PID Control Expert',
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      typewriterEl.textContent = current.slice(0, charIdx);
    } else {
      charIdx++;
      typewriterEl.textContent = current.slice(0, charIdx);
    }

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 300;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

/* ================================================================
   NEURAL NETWORK PARTICLE SYSTEM
   — Dynamic constellation with repulsion, pulse waves & depth
   ================================================================ */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  /* ── CONFIG ── */
  const NODE_COUNT    = 110;
  const LINK_DIST     = 130;
  const MOUSE_DIST    = 180;
  const REPEL_DIST    = 120;
  const REPEL_FORCE   = 0.5;
  const RETURN_EASE   = 0.04;
  const MAX_SPEED     = 1.1;
  const PULSE_INTERVAL= 3200; // ms between auto-pulses
  const PULSE_SPEED   = 2.2;
  const PULSE_MAX_R   = 280;

  let W, H;
  let nodes = [];
  let pulses = [];
  let lastPulseTime = 0;
  let clickPulseNode = null;

  /* ─ Palette ─ */
  const PALETTES = [
    { r: 0,   g: 229, b: 255 }, // cyan   – accent
    { r: 255, g: 75,  b: 110 }, // rose   – accent2
    { r: 57,  g: 255, b: 20  }, // neon green – accent3
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* ─ Node class ─ */
  class Node {
    constructor() { this.init(); }
    init() {
      this.ox   = Math.random() * W;    // origin X (home)
      this.oy   = Math.random() * H;
      this.x    = this.ox;
      this.y    = this.oy;
      this.vx   = (Math.random() - 0.5) * 0.5;
      this.vy   = (Math.random() - 0.5) * 0.5;
      this.z    = Math.random();        // depth 0‒1
      this.r    = 0.6 + this.z * 2.2;  // radius by depth
      this.baseAlpha = 0.25 + this.z * 0.55;
      this.alpha= this.baseAlpha;
      this.phase= Math.random() * Math.PI * 2;
      this.phaseSpeed = 0.008 + Math.random() * 0.018;
      const p   = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      this.cr   = p.r; this.cg = p.g; this.cb = p.b;
      this.lit  = false; // lit by a pulse?
      this.litDecay = 0;
    }

    update(t) {
      /* drift */
      this.ox += this.vx;
      this.oy += this.vy;
      if (this.ox < 0) this.ox = W;
      if (this.ox > W) this.ox = 0;
      if (this.oy < 0) this.oy = H;
      if (this.oy > H) this.oy = 0;

      /* mouse repulsion */
      const rect = canvas.getBoundingClientRect();
      const mxR  = mouseX - rect.left;
      const myR  = mouseY - rect.top;
      const dxM  = this.x - mxR;
      const dyM  = this.y - myR;
      const distM= Math.sqrt(dxM * dxM + dyM * dyM);
      if (distM < REPEL_DIST && distM > 0) {
        const force = (REPEL_DIST - distM) / REPEL_DIST;
        this.x += (dxM / distM) * force * REPEL_FORCE * 4;
        this.y += (dyM / distM) * force * REPEL_FORCE * 4;
      }

      /* ease back to origin */
      this.x += (this.ox - this.x) * RETURN_EASE;
      this.y += (this.oy - this.y) * RETURN_EASE;

      /* speed cap */
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > MAX_SPEED) {
        this.vx = (this.vx / speed) * MAX_SPEED;
        this.vy = (this.vy / speed) * MAX_SPEED;
      }

      /* breathing alpha */
      this.phase += this.phaseSpeed;
      this.alpha  = this.baseAlpha + Math.sin(this.phase) * 0.18;

      /* pulse lit decay */
      if (this.litDecay > 0) {
        this.litDecay -= 0.025;
        if (this.litDecay < 0) this.litDecay = 0;
        this.lit = this.litDecay > 0;
      }
    }

    draw() {
      const a = Math.max(0, Math.min(1, this.alpha));
      const litBoost = this.litDecay;

      ctx.save();

      if (litBoost > 0) {
        /* glowing halo when lit */
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * (3 + litBoost * 5));
        grad.addColorStop(0,   `rgba(${this.cr},${this.cg},${this.cb},${a * 0.9 + litBoost * 0.4})`);
        grad.addColorStop(0.4, `rgba(${this.cr},${this.cg},${this.cb},${litBoost * 0.25})`);
        grad.addColorStop(1,   `rgba(${this.cr},${this.cg},${this.cb},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * (3 + litBoost * 5), 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      /* core dot */
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r + litBoost * this.r * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.cr},${this.cg},${this.cb},${a + litBoost * 0.6})`;
      ctx.fill();

      ctx.restore();
    }
  }

  /* ─ Pulse ring class ─ */
  class Pulse {
    constructor(x, y, cr, cg, cb) {
      this.x  = x; this.y = y;
      this.cr = cr; this.cg = cg; this.cb = cb;
      this.r  = 0;
      this.alpha = 0.85;
      this.alive = true;
    }
    update() {
      this.r     += PULSE_SPEED;
      this.alpha -= 0.85 / (PULSE_MAX_R / PULSE_SPEED);
      if (this.r > PULSE_MAX_R || this.alpha <= 0) this.alive = false;

      /* light up nearby nodes */
      nodes.forEach(n => {
        const dx = n.x - this.x;
        const dy = n.y - this.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(d - this.r) < 18) {
          n.litDecay = 1;
          n.cr = this.cr; n.cg = this.cg; n.cb = this.cb;
        }
      });
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${this.cr},${this.cg},${this.cb},${Math.max(0, this.alpha)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* inner soft glow */
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0, this.r - 3), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${this.cr},${this.cg},${this.cb},${Math.max(0, this.alpha * 0.35)})`;
      ctx.lineWidth = 6;
      ctx.stroke();

      ctx.restore();
    }
  }

  /* ─ Draw connections ─ */
  function drawLinks() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const t    = 1 - dist / LINK_DIST;
          const litA = Math.max(nodes[i].litDecay, nodes[j].litDecay);
          const baseO= t * 0.14;
          const litO = litA * 0.55 * t;

          /* pick colour from lit node */
          const nc   = litA > 0 ? (nodes[i].litDecay >= nodes[j].litDecay ? nodes[i] : nodes[j]) : nodes[i];

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${nc.cr},${nc.cg},${nc.cb},${baseO + litO})`;
          ctx.lineWidth   = 0.5 + litA * 1.2;
          ctx.stroke();
        }
      }

      /* mouse attraction lines */
      const rect = canvas.getBoundingClientRect();
      const mxR  = mouseX - rect.left;
      const myR  = mouseY - rect.top;
      if (mxR >= 0 && mxR <= W && myR >= 0 && myR <= H) {
        const n    = nodes[i];
        const dx   = n.x - mxR;
        const dy   = n.y - myR;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const t = 1 - dist / MOUSE_DIST;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mxR, myR);
          ctx.strokeStyle = `rgba(${n.cr},${n.cg},${n.cb},${t * 0.3})`;
          ctx.lineWidth   = t * 1.2;
          ctx.stroke();
        }
      }
    }
  }

  /* ─ Auto-pulse emitter ─ */
  function maybeEmitPulse(t) {
    if (t - lastPulseTime > PULSE_INTERVAL) {
      lastPulseTime = t;
      /* pick a random node as origin */
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      const p = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      pulses.push(new Pulse(n.x, n.y, p.r, p.g, p.b));
    }
  }

  /* ─ Click: emit pulse at cursor position ─ */
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const cx   = e.clientX - rect.left;
    const cy   = e.clientY - rect.top;
    const p    = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    pulses.push(new Pulse(cx, cy, p.r, p.g, p.b));
  });

  /* ─ Main loop ─ */
  function animate(t = 0) {
    ctx.clearRect(0, 0, W, H);

    maybeEmitPulse(t);

    drawLinks();

    nodes.forEach(n => { n.update(t); n.draw(); });

    pulses = pulses.filter(p => p.alive);
    pulses.forEach(p => { p.update(); p.draw(); });

    requestAnimationFrame(animate);
  }

  /* ─ Init ─ */
  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, () => new Node());
    pulses = [];
  }

  window.addEventListener('resize', init);
  init();
  requestAnimationFrame(animate);
}

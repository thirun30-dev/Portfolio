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

/* ── FUTURISTIC INTRO/LOADER OVERLAY ── */
function initIntroLoader() {
  const overlay = document.getElementById('intro-overlay');
  const loaderFill = document.getElementById('intro-loader-fill');
  const terminal = document.getElementById('intro-terminal');
  if (!overlay || !loaderFill || !terminal) return;

  const logs = [
    { text: "System diagnostics initiating...", type: "system", delay: 100 },
    { text: "Establishing secure link to REC network node...", type: "info", delay: 250 },
    { text: "Loading kinematics solver: 2WD Differential Drive... [OK]", type: "success", delay: 450 },
    { text: "Connecting to ESP32 websocket interface... Host: 192.168.1.45", type: "info", delay: 650 },
    { text: "Calibrating MPU6050 6-Axis IMU sensor...", type: "info", delay: 850 },
    { text: "Sensor offset computed: [X:-12, Y:45, Z:8]. Calibration OK.", type: "success", delay: 1050 },
    { text: "Loading ROS2 navigation modules (AMCL, Nav2)...", type: "info", delay: 1250 },
    { text: "Compiling Embedded C firmware package...", type: "info", delay: 1450 },
    { text: "Robotics system state: ACTIVE. Battery charge: 92%.", type: "success", delay: 1650 },
    { text: "Retrieving B.S. Data Science models from IIT Madras servers...", type: "info", delay: 1850 },
    { text: "Connecting OpenCV lane detection neural pipeline... edge thresholds set.", type: "success", delay: 2050 },
    { text: "Initializing portfolio web interface shell...", type: "info", delay: 2200 },
    { text: "SYSTEM ONLINE. Welcome to Thirunavukkarasu's space.", type: "system", delay: 2400 }
  ];

  // Animate the loader fill width alongside logs
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 2;
    if (progress > 100) progress = 100;
    loaderFill.style.width = progress + '%';
    if (progress === 100) {
      clearInterval(progressInterval);
    }
  }, 50);

  logs.forEach(log => {
    setTimeout(() => {
      const p = document.createElement('div');
      p.className = `terminal-line ${log.type}`;
      p.textContent = `> ${log.text}`;
      terminal.appendChild(p);
      terminal.scrollTop = terminal.scrollHeight;
    }, log.delay);
  });

  // End sequence
  setTimeout(() => {
    overlay.classList.add('fade-out');
    document.body.classList.remove('intro-active');
    
    // Trigger typewriter effect
    startTypewriter();
  }, 2900);
}

/* ── PROJECT DETAILS MODAL ── */
function setupProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img');
  const modalNum = document.getElementById('modal-num');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalLinks = document.getElementById('modal-links');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  document.querySelectorAll('.btn-project-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card) return;
      const detailsData = card.querySelector('.project-details-data');
      if (!detailsData) return;

      const img = detailsData.querySelector('.detail-img-src')?.textContent || '';
      const num = detailsData.querySelector('.detail-num')?.textContent || '';
      const badgeHtml = detailsData.querySelector('.detail-status-badge')?.innerHTML || '';
      const title = detailsData.querySelector('.detail-title')?.textContent || '';
      const date = detailsData.querySelector('.detail-date')?.textContent || '';
      const descHtml = detailsData.querySelector('.detail-desc')?.innerHTML || '';
      const tagsHtml = detailsData.querySelector('.detail-tags')?.innerHTML || '';
      const linkBtn = detailsData.querySelector('.project-link-btn');

      if (modalImg) {
        modalImg.src = img;
        modalImg.alt = title;
      }
      if (modalNum) modalNum.textContent = num;
      if (modalBadge) modalBadge.innerHTML = badgeHtml;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDate) modalDate.textContent = date;
      if (modalDesc) modalDesc.innerHTML = descHtml;
      if (modalTags) modalTags.innerHTML = tagsHtml;

      if (modalLinks) {
        if (linkBtn) {
          modalLinks.style.display = 'block';
          modalLinks.innerHTML = linkBtn.outerHTML;
          // Apply cursor-hover to cloned button
          const modalLinkBtn = modalLinks.querySelector('.project-link-btn');
          if (modalLinkBtn) {
            modalLinkBtn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            modalLinkBtn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
          }
        } else {
          modalLinks.style.display = 'none';
          modalLinks.innerHTML = '';
        }
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock page scroll
      
      // Cursor aura update
      document.body.classList.remove('cursor-hover');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalCloseBtn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    modalCloseBtn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
setupProjectModal();

/* ── AI PORTFOLIO ASSISTANT ── */
function setupAIChatbot() {
  const container = document.getElementById('ai-chat-container');
  const toggle = document.getElementById('ai-chat-toggle');
  const windowEl = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-chat-close');
  const messagesContainer = document.getElementById('ai-chat-messages');
  const form = document.getElementById('ai-chat-input-form');
  const input = document.getElementById('ai-chat-input');
  const suggestions = document.getElementById('ai-chat-suggestions');

  if (!container || !toggle || !windowEl || !closeBtn || !messagesContainer) return;

  // Toggle Chat window open/close
  toggle.addEventListener('click', () => {
    const isOpen = windowEl.classList.contains('active');
    if (isOpen) {
      windowEl.classList.remove('active');
      container.classList.remove('chat-open');
    } else {
      windowEl.classList.add('active');
      container.classList.add('chat-open');
      // Clear ping badge animation when user opens chat
      const ping = toggle.querySelector('.chat-toggle-ping');
      if (ping) ping.style.display = 'none';
      
      // Focus input
      setTimeout(() => input.focus(), 300);
    }
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('active');
    container.classList.remove('chat-open');
  });

  // Suggestion buttons
  if (suggestions) {
    suggestions.querySelectorAll('.chat-suggest-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.getAttribute('data-query');
        const text = btn.textContent;
        handleUserMessage(text, query);
      });
      btn.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      btn.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // Handle Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    input.value = '';
    handleUserMessage(query, query);
  });

  // Main flow for user messages
  function handleUserMessage(text, query) {
    // Append user message bubble
    appendBubble(text, 'user');

    // Show typing state
    showTypingIndicator();

    // Generate response
    const botResponse = getBotResponse(query);

    // Simulate delay
    setTimeout(() => {
      removeTypingIndicator();
      appendBubble(botResponse, 'bot');
    }, 800 + Math.random() * 600);
  }

  function appendBubble(content, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = content;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Apply cursor-hover to custom-scroll-buttons or links inside the bubble
    bubble.querySelectorAll('.chat-scroll-btn, .chat-inline-link').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  function showTypingIndicator() {
    removeTypingIndicator(); // clear existing
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot typing';
    bubble.id = 'chat-typing-indicator';
    bubble.innerHTML = 'Thinking<span></span><span></span><span></span>';
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
  }

  // Simple rule-based bot logic
  function getBotResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('project') || q.includes('robix') || q.includes('zeno') || q.includes('lane') || q.includes('race')) {
      return `TK has built some highly interesting robotic systems:<br>
      • <strong>ROBIX AMR</strong>: An autonomous mobile robot built with ESP32 & ROS featuring obstacle avoidance.<br>
      • <strong>Zeno</strong>: A self-balancing robot utilizing PID stabilization and MPU6050 sensor offset controls.<br>
      • <strong>Bluetooth Race Bot</strong>: An ESP32 high-speed RC racer.<br>
      • <strong>Lane Detection</strong>: An OpenCV autonomous computer vision navigation pipeline.<br><br>
      You can explore detail popups in the projects grid, or click below to check them:<br>
      <button class="chat-scroll-btn" data-target="#projects">◈ Scroll to Projects</button>`;
    }

    if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('ros') || q.includes('python') || q.includes('c++')) {
      return `TK's primary technical competencies cover:<br>
      • <strong>Robotics & Embedded C</strong>: ROS/ROS2, ESP32, PID algorithms, sensor integration (IMU, LiDAR, Depth cameras).<br>
      • <strong>Languages & Tools</strong>: Python, C/C++, SQL, OpenCV, Git/GitHub, MATLAB/Simulink.<br>
      • <strong>Data Science</strong>: Statistical Modeling, analytical forecasting, database management.<br><br>
      You can inspect the full skill progress metrics here:<br>
      <button class="chat-scroll-btn" data-target="#skills">◈ Scroll to Skills</button>`;
    }

    if (q.includes('education') || q.includes('iit') || q.includes('rec') || q.includes('college') || q.includes('degree') || q.includes('cgpa')) {
      return `TK is pursuing a double degree track:<br>
      1. <strong>B.E. in Robotics and Automation Engineering</strong> at Rajalakshmi Engineering College (REC), Chennai. Current CGPA: <strong>8.2/10</strong>.<br>
      2. <strong>Online B.S. in Data Science & Applications</strong> at IIT Madras, focusing on data structures, statistical analysis, and machine learning algorithms.<br><br>
      Scroll to his academic details for more info:<br>
      <button class="chat-scroll-btn" data-target="#education">◈ Scroll to Education</button>`;
    }

    if (q.includes('achievement') || q.includes('robocon') || q.includes('hackathon') || q.includes('gold') || q.includes('sih')) {
      return `Some of TK's core academic and team achievements:<br>
      • <strong>DD Robocon 2025</strong>: Mechanical & Control Design Lead for the national championship team.<br>
      • <strong>Smart India Hackathon 2024</strong>: National Finalist and Team Lead for an IoT agricultural disease-detecting rover.<br>
      • <strong>Elite+Gold Medalist</strong>: Awarded by NPTEL for Python for Data Science and programming constructs.<br><br>
      Jump directly to his accomplishments:<br>
      <button class="chat-scroll-btn" data-target="#achievements">◈ Scroll to Achievements</button>`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('linkedin') || q.includes('hire') || q.includes('github') || q.includes('resume')) {
      return `Let's build something remarkable! You can get in touch with TK via:<br>
      • ✉ <strong>Email</strong>: <a href="mailto:thirusriram3012@gmail.com" class="chat-inline-link">thirusriram3012@gmail.com</a><br>
      • 📞 <strong>Phone</strong>: <a href="tel:+919345744397" class="chat-inline-link">+91 93457 44397</a><br>
      • ◈ <strong>GitHub</strong>: <a href="https://github.com/thirun30-dev" target="_blank" class="chat-inline-link">github.com/thirun30-dev</a><br>
      • <strong>LinkedIn</strong>: <a href="https://linkedin.com/in/thirunavukkarasu-veeramani-140b6a317" target="_blank" class="chat-inline-link">linkedin.com/in/thirunavukkarasu-veeramani</a><br><br>
      Or go straight to the contacts form:<br>
      <button class="chat-scroll-btn" data-target="#contact">◈ Scroll to Contact</button>`;
    }

    // Default response
    return `I'm TK's AI assistant chatbot. Ask me about:<br>
    • His <strong>projects</strong> (ROBIX, Zeno, Lane detection...)<br>
    • Technical <strong>skills</strong> (ROS, ESP32, Python, PID...)<br>
    • <strong>Education</strong> (REC Robotics B.E. or IIT Madras B.S.)<br>
    • <strong>Achievements</strong> (DD Robocon, Smart India Hackathon finalist...)<br>
    • How to <strong>contact</strong> him.<br><br>
    Or select one of the suggestions below!`;
  }

  // Global event delegation for smooth scroll buttons in chat bubbles
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('chat-scroll-btn')) {
      const targetId = e.target.getAttribute('data-target');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        
        // On mobile, close chat window to not block visibility
        if (window.innerWidth <= 480) {
          windowEl.classList.remove('active');
          container.classList.remove('chat-open');
        }
      }
    }
  });
}
setupAIChatbot();

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
let typewriterStarted = false;

function type() {
  if (!typewriterEl) return;
  const roles = [
    'Robotics Engineer',
    'Embedded Systems Dev',
    'AI / ML Enthusiast',
    'Autonomous Nav Builder',
    'PID Control Expert',
  ];
  
  // Keep typewriter variables static/scoped globally to survive recursive timeout calls
  if (!window.typewriterState) {
    window.typewriterState = {
      roleIdx: 0,
      charIdx: 0,
      isDeleting: false
    };
  }
  
  const state = window.typewriterState;
  const current = roles[state.roleIdx];

  if (state.isDeleting) {
    state.charIdx--;
    typewriterEl.textContent = current.slice(0, state.charIdx);
  } else {
    state.charIdx++;
    typewriterEl.textContent = current.slice(0, state.charIdx);
  }

  let delay = state.isDeleting ? 55 : 95;

  if (!state.isDeleting && state.charIdx === current.length) {
    delay = 1800;
    state.isDeleting = true;
  } else if (state.isDeleting && state.charIdx === 0) {
    state.isDeleting = false;
    state.roleIdx = (state.roleIdx + 1) % roles.length;
    delay = 300;
  }

  setTimeout(type, delay);
}

function startTypewriter() {
  if (typewriterStarted) return;
  typewriterStarted = true;
  setTimeout(type, 300);
}

// Initialize loading screen sequence or fallback
if (!document.getElementById('intro-overlay')) {
  document.body.classList.remove('intro-active');
  startTypewriter();
} else {
  initIntroLoader();
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

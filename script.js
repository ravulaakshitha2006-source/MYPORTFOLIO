/* ============================================================
   RAVULA AKSHITHA – PORTFOLIO JAVASCRIPT
   ============================================================ */

"use strict";

// ──────────────────────────────────────────
//  CURSOR GLOW + DOT
// ──────────────────────────────────────────
const cursorGlow = document.getElementById("cursorGlow");

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  // Smooth glow trail
  cursorGlow.style.left = x + "px";
  cursorGlow.style.top  = y + "px";

  // CSS-variable-driven custom cursor dot
  document.documentElement.style.setProperty("--cx", x + "px");
  document.documentElement.style.setProperty("--cy", y + "px");
});

// ──────────────────────────────────────────
//  PARTICLE CANVAS
// ──────────────────────────────────────────
const canvas  = document.getElementById("particleCanvas");
const ctx     = canvas.getContext("2d");
let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor((window.innerWidth * window.innerHeight) / 14000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      o:  Math.random() * 0.5 + 0.1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${(1 - dist / 130) * 0.12})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }
    }
  }

  // Draw dots
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124,58,237,${p.o})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  animFrame = requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  cancelAnimationFrame(animFrame);
  resizeCanvas();
  createParticles();
  drawParticles();
});

// ──────────────────────────────────────────
//  NAVBAR SCROLL
// ──────────────────────────────────────────
const navbar   = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

function updateNavbar() {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link highlight
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.section === current) link.classList.add("active");
  });
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

// ──────────────────────────────────────────
//  HAMBURGER MENU
// ──────────────────────────────────────────
const hamburger   = document.getElementById("hamburger");
const navLinksEl  = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksEl.classList.toggle("open");
});

navLinksEl.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksEl.classList.remove("open");
  });
});

// ──────────────────────────────────────────
//  TYPED TEXT
// ──────────────────────────────────────────
const phrases   = [
  "ML Models",
  "AI Solutions",
  "Deep Learning Systems",
  "Predictive Pipelines",
  "Smart Automation",
  "Data-Driven Apps",
];
let phI = 0, chI = 0, deleting = false;
const typedEl = document.getElementById("typedText");

function typeLoop() {
  const current = phrases[phI];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++chI);
    if (chI === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --chI);
    if (chI === 0) {
      deleting = false;
      phI = (phI + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

// ──────────────────────────────────────────
//  STAT COUNTER ANIMATION
// ──────────────────────────────────────────
const statNums = document.querySelectorAll(".stat-num");
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const heroSection = document.getElementById("home");
  const rect = heroSection.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    statsAnimated = true;
    statNums.forEach((el) => {
      const target = parseFloat(el.dataset.target);
      const isFloat = target % 1 !== 0;
      const duration = 1600;
      const start = performance.now();
      function update(now) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const val = ease * target;
        el.textContent = isFloat ? val.toFixed(1) : Math.floor(val);
        if (t < 1) requestAnimationFrame(update);
        else el.textContent = isFloat ? target.toFixed(1) : target;
      }
      requestAnimationFrame(update);
    });
  }
}

window.addEventListener("scroll", animateStats, { passive: true });
animateStats();

// ──────────────────────────────────────────
//  SCROLL REVEAL
// ──────────────────────────────────────────
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

// ──────────────────────────────────────────
//  PROGRESS BAR ANIMATIONS
// ──────────────────────────────────────────
const bars = document.querySelectorAll(".bar-fill");

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => {
          el.style.width = el.dataset.width + "%";
        }, 300);
        barObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.3 }
);

bars.forEach((b) => barObserver.observe(b));

// ──────────────────────────────────────────
//  SMOOTH SCROLL (NAV LINKS)
// ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ──────────────────────────────────────────
//  PROJECT CARD – TILT EFFECT
// ──────────────────────────────────────────
document.querySelectorAll(".project-card, .timeline-card, .cert-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const rx   = ((e.clientY - cy) / (rect.height / 2)) * 5;
    const ry   = ((e.clientX - cx) / (rect.width  / 2)) * -5;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ──────────────────────────────────────────
//  SCROLL CUE FADE
// ──────────────────────────────────────────
const scrollCue = document.getElementById("scrollCue");
if (scrollCue) {
  window.addEventListener("scroll", () => {
    scrollCue.style.opacity = window.scrollY > 80 ? "0" : "1";
  }, { passive: true });
}

// ──────────────────────────────────────────
//  INTERACTIVE SKILL TAGS
// ──────────────────────────────────────────
document.querySelectorAll(".skill-tag, .tag").forEach((tag) => {
  tag.addEventListener("mouseenter", () => {
    tag.style.transform = "scale(1.08)";
  });
  tag.addEventListener("mouseleave", () => {
    tag.style.transform = "";
  });
});

// ──────────────────────────────────────────
//  CURSOR: CHANGE ON LINKS/BTNS
// ──────────────────────────────────────────
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    document.documentElement.style.setProperty("--cursor-size", "14px");
    cursorGlow.style.background =
      "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)";
  });
  el.addEventListener("mouseleave", () => {
    document.documentElement.style.setProperty("--cursor-size", "10px");
    cursorGlow.style.background =
      "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)";
  });
});

// ──────────────────────────────────────────
//  NAVBAR CTA VISIBILITY ON SCROLL
// ──────────────────────────────────────────
const navCta = document.getElementById("navCta");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    navCta.style.opacity = "1";
    navCta.style.pointerEvents = "auto";
  } else {
    navCta.style.opacity = "0.7";
  }
}, { passive: true });

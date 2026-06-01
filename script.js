/* ═══════════════════════════════════════════════
   HAPPY BIRTHDAY — INTERACTIVE STORY
   script.js
═══════════════════════════════════════════════ */
"use strict";

/* ── CONFIG ── */
const CONFIG = {
  recipientName: "Người Thân Yêu",
  senderName:    "Anh ♥",
};

/* ── STATE ── */
let currentLayer = 1;
const overlay = document.getElementById("transition-overlay");

/* ════════════════════════════════════════
   LAYER TRANSITION ENGINE
════════════════════════════════════════ */
function goToLayer(next, transitionType = "fade") {
  const from = document.getElementById(`layer-${currentLayer}`);
  const to   = document.getElementById(`layer-${next}`);
  if (!to) return;

  if (transitionType === "flash") {
    overlay.classList.add("flash");
    setTimeout(() => {
      from.classList.remove("active");
      to.classList.add("active");
      overlay.classList.remove("flash");
      currentLayer = next;
      onLayerEnter(next);
    }, 250);
  } else if (transitionType === "iris") {
    // cinematic iris wipe
    overlay.style.transition = "opacity .5s ease";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "all";
    setTimeout(() => {
      from.classList.remove("active");
      to.classList.add("active");
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      currentLayer = next;
      onLayerEnter(next);
    }, 500);
  } else {
    // default fade
    overlay.style.transition = "opacity .6s ease";
    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "all";
    setTimeout(() => {
      from.classList.remove("active");
      to.classList.add("active");
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      currentLayer = next;
      onLayerEnter(next);
    }, 600);
  }
}

function onLayerEnter(n) {
  if (n === 1) initLayer1();
  if (n === 2) initLayer2();
  if (n === 3) initLayer3();
  if (n === 4) initLayer4();
  if (n === 5) initLayer5();
  if (n === 6) initLayer6();
  if (n === 7) initLayer7();
  if (n === 8) initLayer8();
}

/* ════════════════════════════════════════
   LAYER 1 — GIFT BOX + STARS
════════════════════════════════════════ */
function initLayer1() {
  initStarsCanvas();
  typeText(document.getElementById("l1-tagline"), "Anh có một món quà dành cho em...", 65, () => {
    document.getElementById("l1-tagline").classList.add("show");
  });

  const giftBox = document.getElementById("giftBox");
  const giftHint = document.getElementById("giftHint");
  giftBox.addEventListener("click", onGiftClick, { once: true });

  function onGiftClick() {
    giftHint.style.opacity = "0";
    giftBox.classList.add("shake");
    setTimeout(() => {
      giftBox.classList.remove("shake");
      giftBox.classList.add("opening");
      // Burst particles from gift
      burstGiftParticles();
      setTimeout(() => goToLayer(2, "flash"), 900);
    }, 600);
  }
}

function burstGiftParticles() {
  const box = document.getElementById("giftBox");
  const rect = box.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const colors = ["#E8C96A","#E84393","#9B5DE5","#00D4AA","#FF6BAF","#F4A261"];

  for (let i = 0; i < 60; i++) {
    const el = document.createElement("div");
    const ang = (Math.random() * Math.PI * 2);
    const dist = Math.random() * 200 + 80;
    el.style.cssText = `
      position:fixed;
      left:${cx}px; top:${cy}px;
      width:${Math.random()*6+3}px; height:${Math.random()*6+3}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>.5?'50%':'3px'};
      pointer-events:none; z-index:9000;
      animation: burstOut .8s cubic-bezier(.22,1,.36,1) forwards;
      --dx:${Math.cos(ang)*dist}px; --dy:${Math.sin(ang)*dist}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  if (!document.getElementById("burst-style")) {
    const s = document.createElement("style");
    s.id = "burst-style";
    s.textContent = "@keyframes burstOut{from{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(.3)}}";
    document.head.appendChild(s);
  }
}

function initStarsCanvas() {
  const cv = document.getElementById("stars-canvas");
  if (!cv || cv._init) return;
  cv._init = true;
  const ct = cv.getContext("2d");

  function resize() { cv.width = innerWidth; cv.height = innerHeight; }
  resize(); addEventListener("resize", resize);

  const stars = Array.from({ length: 280 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + 0.2, a: Math.random() * 0.5 + 0.1,
    ph: Math.random() * Math.PI * 2, spd: Math.random() * 0.012 + 0.004,
    c: ["#E8C96A","#9B5DE5","#E84393","#fff"][Math.floor(Math.random()*4)]
  }));

  (function draw() {
    ct.clearRect(0, 0, cv.width, cv.height);
    stars.forEach(s => {
      s.ph += s.spd;
      ct.save();
      ct.globalAlpha = s.a * (0.5 + 0.5 * Math.sin(s.ph));
      ct.fillStyle = s.c;
      ct.beginPath(); ct.arc(s.x, s.y, s.r, 0, Math.PI*2); ct.fill();
      ct.restore();
    });
    requestAnimationFrame(draw);
  })();
}

/* ════════════════════════════════════════
   LAYER 2 — FIRST MEMORY + PARTICLES
════════════════════════════════════════ */
function initLayer2() {
  initParticlesCanvas();
  const frame = document.getElementById("memoryFrame");
  const text  = document.getElementById("l2-text");
  const btn   = document.getElementById("l2-btn");

  setTimeout(() => frame.classList.add("show"), 200);

  const msg = "Còn nhớ ngày đầu tiên chúng ta gặp nhau không?";
  setTimeout(() => {
    typeText(text, msg, 55, () => {
      setTimeout(() => {
        btn.style.transition = "opacity .8s ease";
        btn.style.opacity = "1";
      }, 600);
    });
  }, 1200);

  btn.addEventListener("click", () => goToLayer(3, "iris"), { once: true });
}

function initParticlesCanvas() {
  const cv = document.getElementById("particles-canvas");
  if (!cv || cv._init) return;
  cv._init = true;
  const ct = cv.getContext("2d");
  let W, H;
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener("resize", resize);

  const particles = Array.from({ length: 120 }, () => spawnParticle(W, H));

  function spawnParticle(W, H) {
    return {
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .5, vy: -(Math.random() * .6 + .2),
      r: Math.random() * 2 + .5, a: Math.random() * .5 + .1,
      ph: Math.random() * Math.PI * 2, spd: Math.random() * .02 + .01,
      c: ["#E8C96A","#9B5DE5","#E84393","#00D4AA"][Math.floor(Math.random()*4)]
    };
  }

  (function loop() {
    ct.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.ph += p.spd;
      if (p.y < -10) { Object.assign(p, spawnParticle(W, H)); p.y = H + 10; }
      ct.save();
      ct.globalAlpha = p.a * (0.5 + 0.5 * Math.sin(p.ph));
      ct.fillStyle = p.c;
      ct.beginPath(); ct.arc(p.x, p.y, p.r, 0, Math.PI*2); ct.fill();
      ct.restore();
    });
    requestAnimationFrame(loop);
  })();
}

/* ════════════════════════════════════════
   LAYER 3 — POLAROID GALLERY
════════════════════════════════════════ */
function initLayer3() {
  const polaroids = document.querySelectorAll(".polaroid");
  const btn = document.getElementById("l3-btn");

  polaroids.forEach(p => {
    const delay = parseInt(p.dataset.delay || 0);
    setTimeout(() => p.classList.add("in"), 300 + delay);
  });

  setTimeout(() => {
    btn.style.transition = "opacity .8s ease";
    btn.style.opacity = "1";
  }, 300 + 750 + 1200);

  btn.addEventListener("click", () => goToLayer(4, "fade"), { once: true });
}

/* ════════════════════════════════════════
   LAYER 4 — ENVELOPE + LETTER
════════════════════════════════════════ */
function initLayer4() {
  const envOuter = document.getElementById("envOuter");
  const envScene = document.getElementById("envelopeScene");
  const letterReveal = document.getElementById("letterReveal");
  const btn = document.getElementById("l4-btn");

  envOuter.addEventListener("click", openEnvelope, { once: true });

  function openEnvelope() {
    envOuter.classList.add("opened");
    setTimeout(() => {
      envScene.style.transition = "opacity .5s ease, transform .5s ease";
      envScene.style.opacity = "0";
      envScene.style.transform = "translateY(-20px) scale(.9)";
      setTimeout(() => {
        envScene.style.display = "none";
        letterReveal.style.display = "block";
        requestAnimationFrame(() => requestAnimationFrame(() => {
          letterReveal.classList.add("show");
          animateLetterLines();
        }));
      }, 500);
    }, 800);
  }

  function animateLetterLines() {
    const lines = document.querySelectorAll(".lp-line");
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add("visible"), 400 + i * 380);
    });
    const totalTime = 400 + (lines.length - 1) * 380 + 600;
    setTimeout(() => {
      btn.style.transition = "opacity .8s ease";
      btn.style.opacity = "1";
    }, totalTime);
    btn.addEventListener("click", () => goToLayer(5, "iris"), { once: true });
  }
}

/* ════════════════════════════════════════
   LAYER 5 — PORTAL + TIMELINE
════════════════════════════════════════ */
function initLayer5() {
  initPortalCanvas();
  const door = document.getElementById("portalDoor");
  const doorWrap = document.getElementById("portalDoorWrap");
  const tlReveal = document.getElementById("timelineReveal");
  const btn = document.getElementById("l5-btn");

  door.addEventListener("click", openPortal, { once: true });

  function openPortal() {
    door.classList.add("opening");
    setTimeout(() => {
      doorWrap.style.transition = "opacity .5s ease";
      doorWrap.style.opacity = "0";
      setTimeout(() => {
        doorWrap.style.display = "none";
        tlReveal.style.display = "flex";
        requestAnimationFrame(() => requestAnimationFrame(() => {
          tlReveal.classList.add("show");
          animateTimelineNodes();
        }));
      }, 500);
    }, 1200);
  }

  function animateTimelineNodes() {
    const nodes = document.querySelectorAll(".tl-node");
    nodes.forEach((node, i) => {
      setTimeout(() => node.classList.add("in"), 300 + i * 600);
    });
    const totalTime = 300 + (nodes.length - 1) * 600 + 800;
    setTimeout(() => {
      btn.style.transition = "opacity .8s ease";
      btn.style.opacity = "1";
    }, totalTime);
    btn.addEventListener("click", () => goToLayer(6, "fade"), { once: true });
  }
}

function initPortalCanvas() {
  const cv = document.getElementById("portal-canvas");
  if (!cv || cv._init) return;
  cv._init = true;
  const ct = cv.getContext("2d");
  let W, H;
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener("resize", resize);

  const rings = Array.from({ length: 6 }, (_, i) => ({
    r: 80 + i * 50, a: 0, spd: .008 - i * .001,
    col: ["#9B5DE5","#E84393","#E8C96A","#00D4AA","#9B5DE5","#E84393"][i]
  }));

  (function loop() {
    ct.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    rings.forEach(ring => {
      ring.a += ring.spd;
      ct.save();
      ct.globalAlpha = 0.12 + .06 * Math.sin(ring.a);
      ct.strokeStyle = ring.col;
      ct.lineWidth = 1;
      ct.beginPath();
      ct.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ct.stroke();
      ct.restore();
    });
    requestAnimationFrame(loop);
  })();
}

/* ════════════════════════════════════════
   LAYER 6 — READY?
════════════════════════════════════════ */
function initLayer6() {
  initReadyCanvas();
  const content = document.querySelector(".l6-content");
  const questionEl = document.getElementById("readyQ");
  const readyBtn = document.getElementById("readyBtn");

  setTimeout(() => content.classList.add("show"), 100);

  const question = "Em đã sẵn sàng cho bất ngờ cuối cùng chưa?";
  setTimeout(() => typeText(questionEl, question, 55), 700);

  readyBtn.addEventListener("click", () => {
    readyBtn.style.transform = "scale(1.1)";
    readyBtn.style.boxShadow = "0 0 60px rgba(155,93,229,.8)";
    setTimeout(() => goToLayer(7, "iris"), 700);
  }, { once: true });
}

function initReadyCanvas() {
  const cv = document.getElementById("ready-canvas");
  if (!cv || cv._init) return;
  cv._init = true;
  const ct = cv.getContext("2d");
  let W, H;
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener("resize", resize);

  const sparks = Array.from({ length: 80 }, () => ({
    x: Math.random() * 1000, y: Math.random() * 800,
    r: Math.random() * 1.5 + .3, a: Math.random(),
    ph: Math.random() * Math.PI * 2, spd: Math.random() * .02 + .008,
    c: ["#9B5DE5","#E84393","#E8C96A"][Math.floor(Math.random()*3)]
  }));

  (function loop() {
    ct.clearRect(0, 0, W, H);
    sparks.forEach(s => {
      s.ph += s.spd;
      ct.save();
      ct.globalAlpha = s.a * (.4 + .6 * Math.abs(Math.sin(s.ph)));
      ct.fillStyle = s.c;
      ct.beginPath();
      ct.arc(s.x / 1000 * W, s.y / 800 * H, s.r, 0, Math.PI*2);
      ct.fill();
      ct.restore();
    });
    requestAnimationFrame(loop);
  })();
}

/* ════════════════════════════════════════
   LAYER 7 — GRAND FINALE
════════════════════════════════════════ */
function initLayer7() {
  const cv = document.getElementById("finale-canvas");
  const ct = cv.getContext("2d");
  cv.width = innerWidth; cv.height = innerHeight;

  // Set name
  document.getElementById("finaleName").textContent = CONFIG.recipientName;

  // Add hearts
  const heartsEl = document.getElementById("finaleHearts");
  ["♥","❤️","💖","💗","💝"].forEach(h => {
    const span = document.createElement("span");
    span.className = "fh"; span.textContent = h;
    heartsEl.appendChild(span);
  });

  // Show content
  setTimeout(() => {
    document.getElementById("l7Content").classList.add("show");
  }, 400);

  // Fireworks
  const fw = createFireworks(cv, ct, innerWidth, innerHeight, 12, 7000);
  let rafId;
  (function loop() {
    ct.clearRect(0, 0, cv.width, cv.height);
    fw.tick();
    rafId = requestAnimationFrame(loop);
    if (fw.done()) { cancelAnimationFrame(rafId); }
  })();

  // Confetti waves
  setTimeout(() => launchConfetti(), 300);
  setTimeout(() => launchConfetti(), 1500);
  setTimeout(() => launchConfetti(), 3000);

  // Show next button
  setTimeout(() => {
    const btn = document.getElementById("l7-btn");
    btn.style.transition = "opacity 1s ease";
    btn.style.opacity = "1";
    btn.addEventListener("click", () => goToLayer(8, "fade"), { once: true });
  }, 5000);

  addEventListener("resize", () => { cv.width = innerWidth; cv.height = innerHeight; });
}

/* ════════════════════════════════════════
   LAYER 8 — CINEMATIC SLIDESHOW
════════════════════════════════════════ */
function initLayer8() {
  const slideFrame = document.getElementById("slideFrame");
  const footer = document.querySelector(".l8-footer");
  const restartBtn = document.getElementById("l8-restart");

  setTimeout(() => slideFrame.classList.add("show"), 300);
  setTimeout(() => footer.classList.add("show"), 1500);

  // Slideshow logic
  const slides = document.querySelectorAll(".sf-photo");
  const bars   = document.querySelectorAll(".sf-bar");
  let current  = 0;
  let timer;

  function goSlide(idx) {
    slides[current].classList.remove("active");
    bars[current].classList.remove("active");
    // Reset bar animation
    const oldBar = bars[current].cloneNode(true);
    bars[current].parentNode.replaceChild(oldBar, bars[current]);

    current = idx;
    slides[current].classList.add("active");
    bars[current].classList.add("active");

    clearTimeout(timer);
    timer = setTimeout(() => {
      const next = (current + 1) % slides.length;
      goSlide(next);
      if (next === 0) {
        // Cycle done — show restart
        setTimeout(() => {
          restartBtn.style.transition = "opacity .8s ease";
          restartBtn.style.opacity = "1";
        }, 4200);
      }
    }, 4200);
  }

  // Bar click navigation
  document.querySelectorAll(".sf-bar").forEach((bar, i) => {
    bar.addEventListener("click", () => goSlide(i));
  });

  goSlide(0);

  // Confetti drizzle
  initSlideCanvas();

  // Restart
  restartBtn.addEventListener("click", () => {
    clearTimeout(timer);
    goToLayer(1, "fade");
    // Reset layer 1 state
    setTimeout(() => {
      document.getElementById("l1-tagline").classList.remove("show");
      document.getElementById("l1-tagline").textContent = "";
      document.getElementById("giftHint").style.opacity = "1";
      const gb = document.getElementById("giftBox");
      gb.classList.remove("shake","opening");
    }, 700);
  }, { once: true });
}

function initSlideCanvas() {
  const cv = document.getElementById("slide-canvas");
  if (!cv || cv._init) return;
  cv._init = true;
  const ct = cv.getContext("2d");
  let W, H;
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener("resize", resize);

  const flakes = Array.from({ length: 60 }, () => ({
    x: Math.random() * 1000, y: Math.random() * 800,
    spd: Math.random() * .8 + .3, drift: (Math.random()-.5) * .3,
    r: Math.random() * 1.5 + .3, a: Math.random() * .3 + .1,
    c: ["#E8C96A","#E84393","#9B5DE5","#fff"][Math.floor(Math.random()*4)]
  }));

  (function loop() {
    ct.clearRect(0, 0, W, H);
    flakes.forEach(f => {
      f.y += f.spd; f.x += f.drift;
      if (f.y > H) { f.y = -5; f.x = Math.random() * W; }
      ct.save();
      ct.globalAlpha = f.a;
      ct.fillStyle = f.c;
      ct.beginPath(); ct.arc(f.x / 1000 * W, f.y, f.r, 0, Math.PI*2); ct.fill();
      ct.restore();
    });
    requestAnimationFrame(loop);
  })();
}

/* ════════════════════════════════════════
   FIREWORKS ENGINE
════════════════════════════════════════ */
function createFireworks(canvas, ctx, W, H, count = 8, duration = 6000) {
  const particles = [];
  const COLS = ["#E8C96A","#F4A261","#E84393","#9B5DE5","#00D4AA","#ffffff","#FF6BAF","#C77DFF"];

  function burst(cx, cy) {
    const col = COLS[Math.floor(Math.random() * COLS.length)];
    const num = Math.floor(Math.random() * 80) + 60;
    for (let i = 0; i < num; i++) {
      const ang = (i / num) * Math.PI * 2 + (Math.random() - .5) * .3;
      const spd = Math.random() * 7 + 2;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        a: 1, r: Math.random() * 3 + 1, col, tail: []
      });
    }
  }

  // Stagger initial bursts
  for (let i = 0; i < count; i++) {
    setTimeout(() => burst(W*.15 + Math.random()*W*.7, H*.05 + Math.random()*H*.5), i * 250);
  }
  const iv = setInterval(() => {
    if (Math.random() > .4) burst(W*.15 + Math.random()*W*.7, H*.05 + Math.random()*H*.55);
  }, duration / (count * 3));
  setTimeout(() => clearInterval(iv), duration);

  return {
    particles,
    tick() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.tail.unshift({ x: p.x, y: p.y });
        if (p.tail.length > 5) p.tail.pop();
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.07;
        p.vx *= 0.97; p.vy *= 0.97;
        p.a -= 0.016;
        if (p.a <= 0) { particles.splice(i, 1); continue; }
        p.tail.forEach((t, ti) => {
          ctx.save();
          ctx.globalAlpha = p.a * (1 - ti / p.tail.length) * .35;
          ctx.fillStyle = p.col;
          ctx.beginPath(); ctx.arc(t.x, t.y, p.r * (1 - ti * .15), 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
        ctx.save();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = p.col;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }
    },
    done() { return particles.length === 0; }
  };
}

/* ════════════════════════════════════════
   CONFETTI
════════════════════════════════════════ */
function launchConfetti() {
  let c = document.getElementById("confetti-c");
  if (!c) {
    c = document.createElement("div");
    c.id = "confetti-c";
    c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9500;overflow:hidden;";
    document.body.appendChild(c);
  }
  const cols = ["#E8C96A","#E84393","#9B5DE5","#00D4AA","#FF6BAF","#fff","#F4A261"];

  if (!document.getElementById("cf-style")) {
    const s = document.createElement("style");
    s.id = "cf-style";
    s.textContent = "@keyframes cfFall{0%{transform:translateY(-20px) rotate(0) scale(1);opacity:1}85%{opacity:1}100%{transform:translateY(105vh) rotate(720deg) scale(.4);opacity:0}}";
    document.head.appendChild(s);
  }

  for (let i = 0; i < 120; i++) {
    const p = document.createElement("div");
    const w = Math.random() * 9 + 4, h = Math.random() * 9 + 4;
    p.style.cssText = `
      position:absolute;top:-20px;
      left:${Math.random()*100}%;
      width:${w}px;height:${h}px;
      background:${cols[i % cols.length]};
      border-radius:${Math.random()>.5?'50%':'3px'};
      animation:cfFall ${Math.random()*2.5+2}s ease ${Math.random()*.8}s forwards;
    `;
    c.appendChild(p);
  }
  setTimeout(() => { if (c) c.innerHTML = ""; }, 5000);
}

/* ════════════════════════════════════════
   TYPEWRITER HELPER
════════════════════════════════════════ */
function typeText(el, text, speed = 60, onDone) {
  el.textContent = "";
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed + Math.random() * 20);
    } else if (onDone) {
      onDone();
    }
  }
  tick();
}

/* ════════════════════════════════════════
   BOOT
════════════════════════════════════════ */
window.addEventListener("DOMContentLoaded", () => {
  // Set names from config
  document.getElementById("finaleName").textContent = CONFIG.recipientName;

  // Kick off Layer 1
  initLayer1();

  // Overlay starts opaque, fade out to reveal layer 1
  overlay.style.opacity = "1";
  overlay.style.transition = "none";
  setTimeout(() => {
    overlay.style.transition = "opacity 1.5s ease";
    overlay.style.opacity = "0";
  }, 300);
});
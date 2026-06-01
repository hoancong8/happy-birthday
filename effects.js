/* ═══════════════════════════════════════════════
   ADVANCED EFFECTS ENGINE
═══════════════════════════════════════════════ */

/* ════════════════════════════════════════
   MOUSE GLOW TRAIL EFFECT
════════════════════════════════════════ */
function initMouseGlowTrail() {
  let lastTime = 0;
  const throttle = 30;

  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTime < throttle) return;
    lastTime = now;

    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    document.body.appendChild(glow);

    setTimeout(() => glow.remove(), 600);
  });
}

/* ════════════════════════════════════════
   CUSTOM CURSOR TRACKING
════════════════════════════════════════ */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 12) + 'px';
    cursor.style.top = (e.clientY - 12) + 'px';
    cursor.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}

/* ════════════════════════════════════════
   LIGHT RAYS EFFECT
════════════════════════════════════════ */
function initLightRays() {
  const container = document.createElement('div');
  container.className = 'light-rays';

  const rayCount = 8;
  for (let i = 0; i < rayCount; i++) {
    const ray = document.createElement('div');
    ray.className = 'light-ray';
    ray.style.left = Math.random() * 100 + '%';
    ray.style.animationDelay = Math.random() * 2 + 's';
    ray.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(ray);
  }

  document.body.appendChild(container);
}

/* ════════════════════════════════════════
   GRADIENT MESH ANIMATION
════════════════════════════════════════ */
function initGradientMesh() {
  const mesh = document.createElement('div');
  mesh.className = 'gradient-mesh';
  document.body.appendChild(mesh);
}

/* ════════════════════════════════════════
   AURORA OVERLAY
════════════════════════════════════════ */
function initAuroraOverlay() {
  const aurora = document.createElement('div');
  aurora.className = 'aurora-overlay';
  document.body.appendChild(aurora);
}

/* ════════════════════════════════════════
   FLOATING HEARTS
════════════════════════════════════════ */
function createFloatingHeart(x, y, duration = 3000) {
  const hearts = ['♥', '❤️', '💖', '💗', '💝', '✨', '🌸'];
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  const driftAmount = (Math.random() - 0.5) * 100;
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.setProperty('--drift', driftAmount + 'px');
  heart.style.animationDuration = duration + 'ms';

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), duration);
}

function launchHeartRain(count = 15, delay = 100) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createFloatingHeart(x, y);
    }, i * delay);
  }
}

/* ════════════════════════════════════════
   RIBBON TRAIL EFFECT
════════════════════════════════════════ */
function initRibbonTrail() {
  const elements = document.querySelectorAll('button, .gift-box, .env-outer, .portal-door');

  elements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const interval = setInterval(() => {
        if (!el.matches(':hover')) {
          clearInterval(interval);
          return;
        }

        const rect = el.getBoundingClientRect();
        const x = rect.left + rect.width * Math.random();
        const y = rect.top + rect.height * Math.random();

        const trail = document.createElement('div');
        trail.className = 'ribbon-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);

        setTimeout(() => trail.remove(), 800);
      }, 30);
    });
  });
}

/* ════════════════════════════════════════
   BUTTON RIPPLE EFFECT
════════════════════════════════════════ */
function initButtonRipples() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach(btn => {
    btn.classList.add('btn-ripple');

    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';

      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* ════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════ */
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.memory-frame, .letter-paper, .polaroid').forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
}

/* ════════════════════════════════════════
   PULSE BLOOM ON ELEMENTS
════════════════════════════════════════ */
function addPulseBloom(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('pulse-bloom');
  });
}

/* ════════════════════════════════════════
   ENHANCED BUTTON HOVER GLOW
════════════════════════════════════════ */
function enhanceButtonEffects() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.classList.add('glow-hover');
    });

    btn.addEventListener('mouseleave', () => {
      btn.classList.remove('glow-hover');
    });

    // Click heart rain effect
    btn.addEventListener('click', () => {
      launchHeartRain(8, 50);
    });
  });
}

/* ════════════════════════════════════════
   FLOATING ELEMENTS
════════════════════════════════════════ */
function addFloatingAnimation(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const delay = Math.random() * 0.5;
    el.style.animation = `float 3s ease-in-out ${delay}s infinite`;
  });
}

/* ════════════════════════════════════════
   INTERACTIVE ELEMENT TRACKING
════════════════════════════════════════ */
function initInteractiveTracking() {
  const interactiveElements = document.querySelectorAll('.gift-box, .env-outer, .portal-door, button');

  interactiveElements.forEach(el => {
    el.addEventListener('click', function (e) {
      // Create burst of hearts
      const rect = this.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      for (let i = 0; i < 5; i++) {
        createFloatingHeart(cx, cy, 2000);
      }
    });
  });
}

/* ════════════════════════════════════════
   RANDOM SPARKLE PARTICLES
════════════════════════════════════════ */
function initSparkles() {
  setInterval(() => {
    if (Math.random() > 0.7) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: #E8C96A;
        border-radius: 50%;
        pointer-events: none;
        z-index: 8000;
        animation: sparkleAnimation 1s ease-out forwards;
      `;

      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }, 500);

  // Add sparkle animation if not exists
  if (!document.getElementById('sparkle-style')) {
    const style = document.createElement('style');
    style.id = 'sparkle-style';
    style.textContent = `
      @keyframes sparkleAnimation {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0) translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ════════════════════════════════════════
   PARALLAX MOUSE MOVEMENT
════════════════════════════════════════ */
function initParallaxElements() {
  const parallaxElements = document.querySelectorAll('.gift-box, .memory-frame, .envelope-scene');

  document.addEventListener('mousemove', (e) => {
    const xPercent = e.clientX / window.innerWidth;
    const yPercent = e.clientY / window.innerHeight;

    parallaxElements.forEach(el => {
      const moveX = (xPercent - 0.5) * 10;
      const moveY = (yPercent - 0.5) * 10;
      el.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    });
  });
}

/* ════════════════════════════════════════
   TEXT SHIMMER EFFECT
════════════════════════════════════════ */
function addTextShimmer(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('shimmer-text');
  });
}

/* ════════════════════════════════════════
   INITIALIZE ALL EFFECTS
════════════════════════════════════════ */
function initAllAdvancedEffects() {
  // Start after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEffects);
  } else {
    setupEffects();
  }

  function setupEffects() {
    // Initialize all effects
    initMouseGlowTrail();
    initCustomCursor();
    initLightRays();
    initGradientMesh();
    initAuroraOverlay();
    initRibbonTrail();
    initButtonRipples();
    enhanceButtonEffects();
    initInteractiveTracking();
    initSparkles();
    initParallaxElements();

    // Add shimmer to titles
    addTextShimmer('.finale-name, .sec-title, .tl-heading, .ready-question');

    // Add floating animation to specific elements
    addFloatingAnimation('.bow-center, .env-seal');

    // Add pulse bloom effects
    addPulseBloom('.gift-box, .env-outer, .portal-door, .ready-btn');

    console.log('✨ All advanced effects initialized!');
  }
}

// Auto-initialize when script loads
initAllAdvancedEffects();

// Optional: Export for manual control
window.EffectsAPI = {
  launchHeartRain,
  createFloatingHeart,
  initSparkles,
  addFloatingAnimation,
  addTextShimmer,
  addPulseBloom
};

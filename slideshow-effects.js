/* ════════════════════════════════════════
   ENHANCED SLIDESHOW ENGINE
════════════════════════════════════════ */

/**
 * Initialize enhanced slideshow with particle effects
 */
function initEnhancedSlideshow() {
  const slideFrame = document.getElementById('slideFrame');
  const footer = document.querySelector('.l8-footer');
  const slides = document.querySelectorAll('.sf-photo');
  const bars = document.querySelectorAll('.sf-bar');
  let current = 0;
  let timer;

  // Add decorative corners to slide frame
  addSlideFrameDecorations(slideFrame);

  // Animate slide frame entrance
  setTimeout(() => slideFrame.classList.add('show'), 300);

  // Animate footer entrance
  setTimeout(() => footer.classList.add('show'), 1500);

  /**
   * Transition to specific slide
   */
  function goSlide(idx) {
    // Remove active classes
    slides[current].classList.remove('active');
    bars[current].classList.remove('active');

    // Reset bar animation
    const oldBar = bars[current].cloneNode(true);
    bars[current].parentNode.replaceChild(oldBar, bars[current]);

    current = idx;
    slides[current].classList.add('active');
    bars[current].classList.add('active');

    // Create transition particles
    createSlideTransitionParticles(slideFrame, current);

    // Launch hearts on slide change
    launchHeartRain(6, 80);

    clearTimeout(timer);
    timer = setTimeout(() => {
      const next = (current + 1) % slides.length;
      goSlide(next);

      // Show restart button after full cycle
      if (next === 0) {
        setTimeout(() => {
          const restartBtn = document.getElementById('l8-restart');
          restartBtn.style.transition = 'opacity .8s ease';
          restartBtn.style.opacity = '1';
        }, 4200);
      }
    }, 4200);
  }

  // Bar click navigation
  bars.forEach((bar, i) => {
    bar.addEventListener('click', () => {
      goSlide(i);
    });

    // Add hover effects
    bar.addEventListener('mouseenter', function () {
      this.style.cursor = 'pointer';
    });
  });

  // Start slideshow
  goSlide(0);

  // Confetti drizzle
  initSlideCanvasEnhanced();

  // Restart button
  const restartBtn = document.getElementById('l8-restart');
  restartBtn.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      goToLayer(1, 'fade');

      // Reset layer 1 state
      setTimeout(() => {
        document.getElementById('l1-tagline').classList.remove('show');
        document.getElementById('l1-tagline').textContent = '';
        document.getElementById('giftHint').style.opacity = '1';
        const gb = document.getElementById('giftBox');
        gb.classList.remove('shake', 'opening');
      }, 700);
    },
    { once: true }
  );
}

/**
 * Add decorative corners to slide frame
 */
function addSlideFrameDecorations(frameEl) {
  const corners = ['tl', 'tr', 'bl', 'br'];
  corners.forEach((corner) => {
    const div = document.createElement('div');
    div.className = `decoration-corner ${corner}`;
    frameEl.appendChild(div);
  });
}

/**
 * Create transition particles between slides
 */
function createSlideTransitionParticles(frameEl, slideIdx) {
  const rect = frameEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const particleCount = 12;
  const colors = ['#E8C96A', '#E84393', '#9B5DE5', '#00D4AA', '#FF6BAF'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 100 + Math.random() * 50;
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: fixed;
      left: ${cx}px;
      top: ${cy}px;
      width: 6px;
      height: 6px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9500;
      box-shadow: 0 0 10px ${color};
      animation: transitionBurst 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
      --angle: ${angle};
      --dist: ${distance}px;
    `;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }

  // Add animation if not exists
  if (!document.getElementById('transition-burst-style')) {
    const style = document.createElement('style');
    style.id = 'transition-burst-style';
    style.textContent = `
      @keyframes transitionBurst {
        from {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        to {
          opacity: 0;
          transform: translate(calc(-50% + cos(var(--angle)) * var(--dist)), calc(-50% + sin(var(--angle)) * var(--dist))) scale(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Enhanced slide canvas with better confetti
 */
function initSlideCanvasEnhanced() {
  const cv = document.getElementById('slide-canvas');
  if (!cv || cv._init) return;
  cv._init = true;
  const ct = cv.getContext('2d');
  let W, H;

  function resize() {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  }
  resize();
  addEventListener('resize', resize);

  // Confetti particles
  const flakes = Array.from({ length: 80 }, () => ({
    x: Math.random() * 1000,
    y: Math.random() * 800,
    spd: Math.random() * 1.2 + 0.5,
    drift: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 2 + 1,
    a: Math.random() * 0.4 + 0.1,
    c: ['#E8C96A', '#E84393', '#9B5DE5', '#00D4AA', '#fff'][
      Math.floor(Math.random() * 5)
    ],
    rotation: Math.random() * Math.PI * 2,
    rotationSpd: Math.random() * 0.05 - 0.025,
  }));

  (function loop() {
    ct.clearRect(0, 0, W, H);

    flakes.forEach((f) => {
      f.y += f.spd;
      f.x += f.drift;
      f.rotation += f.rotationSpd;

      if (f.y > H) {
        f.y = -5;
        f.x = Math.random() * W;
      }

      ct.save();
      ct.globalAlpha = f.a;
      ct.fillStyle = f.c;
      ct.translate(f.x / 1000 * W, f.y);
      ct.rotate(f.rotation);
      ct.beginPath();
      ct.arc(0, 0, f.r, 0, Math.PI * 2);
      ct.fill();
      ct.restore();
    });

    requestAnimationFrame(loop);
  })();
}

/**
 * Add glow effects to bars on hover
 */
function enhanceSlideProgressBars() {
  const bars = document.querySelectorAll('.sf-bar');

  bars.forEach((bar) => {
    bar.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 0 20px rgba(232, 201, 106, 0.5)';
      this.style.transform = 'scaleY(1.5)';
    });

    bar.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
      this.style.transform = '';
    });
  });
}

/**
 * Create star particles around slides
 */
function initSlideStarField() {
  setInterval(() => {
    if (Math.random() > 0.85) {
      const slideFrame = document.getElementById('slideFrame');
      if (!slideFrame) return;

      const rect = slideFrame.getBoundingClientRect();
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;

      const star = document.createElement('div');
      star.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 3px;
        height: 3px;
        background: #E8C96A;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9000;
        box-shadow: 0 0 8px #E8C96A;
        animation: starTwinkle 1s ease-out forwards;
      `;

      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1000);
    }
  }, 300);
}

/**
 * Add twinkle animation if not exists
 */
function ensureTwinkleAnimation() {
  if (!document.getElementById('star-twinkle-style')) {
    const style = document.createElement('style');
    style.id = 'star-twinkle-style';
    style.textContent = `
      @keyframes starTwinkle {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.5);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Initialize all slideshow enhancements
 */
function setupSlideShowEnhancements() {
  // Wait for layer 8 to be active
  const checkLayer8 = setInterval(() => {
    const layer8 = document.getElementById('layer-8');
    if (layer8 && layer8.classList.contains('active')) {
      clearInterval(checkLayer8);

      initEnhancedSlideshow();
      enhanceSlideProgressBars();
      ensureTwinkleAnimation();
      initSlideStarField();

      console.log('✨ Slideshow enhancements activated!');
    }
  }, 100);

  // Fallback: Initialize after a delay
  setTimeout(() => {
    clearInterval(checkLayer8);
  }, 30000);
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSlideShowEnhancements);
} else {
  setupSlideShowEnhancements();
}

// Export for manual control
window.SlideshowAPI = {
  initEnhancedSlideshow,
  createSlideTransitionParticles,
  enhanceSlideProgressBars,
};

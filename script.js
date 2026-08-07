document.addEventListener('DOMContentLoaded', () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
  });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const isMobileViewport = () => window.matchMedia('(max-width: 768px)').matches;

  if (toggle && nav) {
    let closeButton = nav.querySelector('.menu-close');
    if (!closeButton) {
      closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'menu-close';
      closeButton.setAttribute('aria-label', 'Cerrar menu');
      closeButton.textContent = 'x';
      nav.prepend(closeButton);
    }

    // Ensure the mobile menu starts closed on load.
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    if (isMobileViewport()) {
      nav.style.removeProperty('transform');
      nav.style.removeProperty('opacity');
    }

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    closeButton.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      if (!nav.classList.contains('open')) return;
      const clickedInsideNav = nav.contains(event.target);
      const clickedToggle = toggle.contains(event.target);
      if (!clickedInsideNav && !clickedToggle) {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('resize', () => {
      if (!isMobileViewport()) {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.style.removeProperty('transform');
        nav.style.removeProperty('opacity');
      }
    });
  }

  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.main-nav a');
  const contactForm = document.querySelector('#contact-mail-form');
  const heroTitle = document.querySelector('.hero-section h1');
  const heroText = document.querySelector('.hero-section p');
  const heroButton = document.querySelector('.inscripcion');
  const heroSection = document.querySelector('.hero-section');
  const heroLayers = heroSection ? Array.from(heroSection.querySelectorAll('.hero-frente, .hero-capa')) : [];
  const heroContent = document.querySelector('.hero-content > div');
  const heroBaseImage = document.querySelector('.hero-frente');
  const heroLayer11 = document.querySelector('.hero-capa-1-1');
  const heroLayer2 = document.querySelector('.hero-capa-2');
  const heroLayer3 = document.querySelector('.hero-capa-3');
  const heroLayer4 = document.querySelector('.hero-capa-4');
  const heroLayer5 = document.querySelector('.hero-capa-5');
  const heroLayer6 = document.querySelector('.hero-capa-6');
  const heroLayer7 = document.querySelector('.hero-capa-7');
  const waves = document.querySelectorAll('.wave');
  const welcomeSection = document.querySelector('.contenido-principal');
  const entryTimingScale = 2.6;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const gmail = String(formData.get('gmail') || '').trim();
      const nombre = String(formData.get('nombre') || '').trim();
      const titulo = String(formData.get('titulo') || '').trim();
      const texto = String(formData.get('texto') || '').trim();

      const destino = 'tuerquitasjardinmaternaluomvc@gmail.com';
      const asunto = titulo || 'Mensaje desde la web del jardin';
      const cuerpo = [
        `Gmail: ${gmail}`,
        `Nombre: ${nombre}`,
        '',
        texto
      ].join('\n');

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(destino)}&su=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      window.open(gmailUrl, '_blank', 'noopener');
    });
  }

  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    gsap.from(header, {
      y: -40,
      opacity: 0,
      duration: 0.9 * entryTimingScale,
      ease: 'power3.out'
    });

    const heroTargets = [heroTitle, heroText, heroButton].filter(Boolean);
    if (heroTargets.length) {
      gsap.from(heroTargets, {
        y: 24,
        opacity: 0,
        stagger: 0.12 * entryTimingScale,
        duration: 0.9 * entryTimingScale,
        delay: 0.25 * entryTimingScale,
        ease: 'power2.out'
      });
    }
  }

  // Keep the base banner image fixed while animating only capa 1.1.
  if (heroBaseImage) {
    heroBaseImage.style.transform = 'translate3d(0, 0, 0)';
  }

  if (heroLayer11) {
    if (prefersReducedMotion) {
      heroLayer11.style.transform = 'translate3d(0, 0, 0)';
    } else {
      const startTime = performance.now();

      const animateLayer11 = (time) => {
        const elapsed = (time - startTime) / 1000;
        const moveX = Math.sin(elapsed * 0.9) * 6;
        const moveY = Math.cos(elapsed * 1.15) * 4;
        heroLayer11.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
        window.requestAnimationFrame(animateLayer11);
      };

      window.requestAnimationFrame(animateLayer11);
    }
  }

  if (heroLayer2) {
    if (prefersReducedMotion) {
      heroLayer2.style.opacity = '1';
      heroLayer2.style.transform = 'translate3d(0, 0, 0)';
    } else {
      const fadeDurationMs = 900 * entryTimingScale;
      const fadeStartTime = performance.now();

      // Start transparent and static; move only after it is fully visible.
      heroLayer2.style.opacity = '0';
      heroLayer2.style.transform = 'translate3d(0, 0, 0)';

      const fadeInLayer2 = (time) => {
        const progress = Math.min((time - fadeStartTime) / fadeDurationMs, 1);
        heroLayer2.style.opacity = progress.toFixed(3);

        if (progress < 1) {
          window.requestAnimationFrame(fadeInLayer2);
          return;
        }

        const moveStartTime = time;
        const animateLayer2 = (frameTime) => {
          const elapsed = (frameTime - moveStartTime) / 1000;
          const moveX = Math.sin(elapsed * 0.95) * 8;
          heroLayer2.style.transform = `translate3d(${moveX.toFixed(2)}px, 0, 0)`;
          window.requestAnimationFrame(animateLayer2);
        };

        window.requestAnimationFrame(animateLayer2);
      };

      window.requestAnimationFrame(fadeInLayer2);
    }
  }

  const animateLayerEntranceAndDrift = (layer, fromX, driftSpeed, driftDistance) => {
    if (!layer) return;

    if (prefersReducedMotion) {
      layer.style.opacity = '1';
      layer.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    const entranceDurationMs = 1000 * entryTimingScale;
    const entranceStart = performance.now();

    layer.style.opacity = '0';
    layer.style.transform = `translate3d(${fromX}px, 0, 0)`;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const runEntrance = (time) => {
      const t = Math.min((time - entranceStart) / entranceDurationMs, 1);
      const eased = easeOutCubic(t);
      const currentX = fromX * (1 - eased);

      layer.style.opacity = t.toFixed(3);
      layer.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

      if (t < 1) {
        window.requestAnimationFrame(runEntrance);
        return;
      }

      const driftStart = time;
      const runDrift = (frameTime) => {
        const elapsed = (frameTime - driftStart) / 1000;
        const driftX = Math.sin(elapsed * driftSpeed) * driftDistance;
        layer.style.transform = `translate3d(${driftX.toFixed(2)}px, 0, 0)`;
        window.requestAnimationFrame(runDrift);
      };

      window.requestAnimationFrame(runDrift);
    };

    window.requestAnimationFrame(runEntrance);
  };

  // Capa 3 entra de izquierda a derecha; capa 4 entra de derecha a izquierda.
  animateLayerEntranceAndDrift(heroLayer3, -90, 1.1, 4);
  animateLayerEntranceAndDrift(heroLayer4, 90, 1.05, 4);

  const animateLayerFromBottom = (layer, fromY, config = {}) => {
    if (!layer) return;

    const {
      driftAxis = 'y',
      driftDistance = 4,
      driftSpeed = 1.0,
      baseX = 0,
      baseY = 0,
      durationMs = 1000 * entryTimingScale
    } = config;

    if (prefersReducedMotion) {
      layer.style.opacity = '1';
      layer.style.transform = `translate3d(${baseX}px, ${baseY}px, 0)`;
      return;
    }

    const entranceStart = performance.now();
    layer.style.opacity = '0';
    layer.style.transform = `translate3d(${baseX}px, ${fromY}px, 0)`;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const runEntrance = (time) => {
      const t = Math.min((time - entranceStart) / durationMs, 1);
      const eased = easeOutCubic(t);
      const currentY = fromY * (1 - eased) + baseY;

      layer.style.opacity = t.toFixed(3);
      layer.style.transform = `translate3d(${baseX}px, ${currentY.toFixed(2)}px, 0)`;

      if (t < 1) {
        window.requestAnimationFrame(runEntrance);
        return;
      }

      const driftStart = time;
      const runDrift = (frameTime) => {
        const elapsed = (frameTime - driftStart) / 1000;
        const wave = Math.sin(elapsed * driftSpeed) * driftDistance;
        const driftX = driftAxis === 'x' ? baseX + wave : baseX;
        const driftY = driftAxis === 'y' ? baseY + wave : baseY;
        layer.style.transform = `translate3d(${driftX.toFixed(2)}px, ${driftY.toFixed(2)}px, 0)`;
        window.requestAnimationFrame(runDrift);
      };

      window.requestAnimationFrame(runDrift);
    };

    window.requestAnimationFrame(runEntrance);
  };

  // Capas 5, 6 y 7: entrada de abajo hacia arriba.
  // Capa 6: deriva lateral como la capa 3.
  animateLayerFromBottom(heroLayer5, 120, { driftAxis: 'y', driftDistance: 3, driftSpeed: 1.0, baseY: 32 });
  animateLayerFromBottom(heroLayer6, 120, { driftAxis: 'x', driftDistance: 4, driftSpeed: 1.05, durationMs: 2200 * entryTimingScale });
  animateLayerFromBottom(heroLayer7, 120, { driftAxis: 'y', driftDistance: 3, driftSpeed: 0.95 });

  const handleScroll = () => {
    if (!heroSection) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const heroHeight = Math.max(heroSection.offsetHeight, 320);
    const fadeDistance = Math.max(heroHeight * 1.6, 700);
    const progress = Math.min(scrollY / fadeDistance, 1);
    const lift = progress * 85;

    // Apply fade + upward movement to every banner layer.
    heroLayers.forEach((layer, index) => {
      const opacityFactor = layer.classList.contains('hero-frente') ? 0.45 : 1.05;
      layer.style.opacity = String(Math.max(0, 1 - progress * opacityFactor));
    });

    // Move the whole banner block up so all layers travel together.
    heroSection.style.transform = `translate3d(0, ${-lift.toFixed(2)}px, 0)`;

    // Keep content block synchronized with the banner fade.
    heroSection.style.opacity = String(Math.max(0, 1 - progress * 0.9));
    if (header) {
      header.style.opacity = String(Math.max(0, 1 - progress * 0.9));
    }
    if (heroContent) {
      heroContent.style.transform = `translate3d(0, ${-Math.min(progress * 12, 12)}px, 0)`;
      heroContent.style.opacity = String(Math.max(0, 1 - progress * 0.55));
    }

    waves.forEach((wave, index) => {
      wave.style.transform = 'translate3d(0, 0, 0)';
      wave.style.filter = `blur(${Math.min(progress * (0.8 + index * 0.2), 1.4)}px)`;
      wave.style.opacity = String(Math.max(0, 1 - progress * (0.88 + index * 0.04)));
    });

    if (welcomeSection) {
      welcomeSection.style.opacity = String(Math.min(0.1 + progress * 1.1, 1));
      welcomeSection.style.transform = `translate3d(0, ${Math.min(progress * 20, 20)}px, 0)`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});


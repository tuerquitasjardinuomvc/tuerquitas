document.addEventListener('DOMContentLoaded', () => {
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
  const heroContent = document.querySelector('.hero-content > div');
  const waves = document.querySelectorAll('.wave');
  const welcomeSection = document.querySelector('.contenido-principal');

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
      duration: 0.9,
      ease: 'power3.out'
    });

    const heroTargets = [heroTitle, heroText, heroButton].filter(Boolean);
    if (heroTargets.length) {
      gsap.from(heroTargets, {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        delay: 0.25,
        ease: 'power2.out'
      });
    }
  }

  const handleScroll = () => {
    if (!heroSection || !heroContent || !waves.length) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const heroHeight = Math.max(heroSection.offsetHeight, 320);
    const maxScroll = Math.min(window.innerHeight * 0.9, heroHeight * 1.7);
    const progress = Math.min(scrollY / maxScroll, 1);
    const lift = progress * 120;

    heroSection.style.opacity = String(Math.max(0.18, 1 - progress * 0.92));
    heroSection.style.transform = `translate3d(0, ${-lift}px, 0)`;
    heroContent.style.transform = `translate3d(0, ${-Math.min(progress * 12, 12)}px, 0)`;
    heroContent.style.opacity = String(Math.max(0, 1 - progress * 0.55));

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


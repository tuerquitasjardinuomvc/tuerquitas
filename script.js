const closeMenu = (toggle, nav) => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
};

const initMenu = () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu(toggle, nav));
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = toggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) {
      closeMenu(toggle, nav);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu(toggle, nav);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initMenu();

  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.main-nav a');
  const heroTitle = document.querySelector('.hero-section h1');
  const heroText = document.querySelector('.hero-section p');
  const heroButton = document.querySelector('.inscripcion');
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content > div');
  const waves = document.querySelectorAll('.wave');
  const welcomeSection = document.querySelector('.contenido-principal');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    gsap.from(header, {
      y: -40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from(navLinks, {
      y: -14,
      opacity: 0,
      stagger: 0.08,
      duration: 0.7,
      delay: 0.15,
      ease: 'power3.out'
    });

    gsap.from([heroTitle, heroText, heroButton], {
      y: 24,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      delay: 0.25,
      ease: 'power2.out'
    });
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


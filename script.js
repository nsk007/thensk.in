const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const themeToggle = document.querySelector('.theme-toggle');

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.body.dataset.theme = initialTheme;

const updateThemeToggle = () => {
  const isDark = document.body.dataset.theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  const label = themeToggle?.querySelector('.theme-toggle__label');
  if (label) label.textContent = isDark ? 'Light mode' : 'Dark mode';
};

updateThemeToggle();

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = nextTheme;
  localStorage.setItem('theme', nextTheme);
  updateThemeToggle();
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.textContent = isOpen ? 'Menu' : 'Close';
  mobileMenu.hidden = isOpen;
});

mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'Menu';
    mobileMenu.hidden = true;
  });
});

document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((item) => item.classList.toggle('is-active', item === button));
    document.querySelectorAll('.project').forEach((project) => {
      project.classList.toggle('is-hidden', filter !== 'all' && project.dataset.category !== filter);
    });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .proof-strip, .site-footer').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  cursorGlow?.style.setProperty('left', `${event.clientX}px`);
  cursorGlow?.style.setProperty('top', `${event.clientY}px`);
}, { passive: true });

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const yearEl = document.getElementById('year');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const demoToast = document.getElementById('demoToast');

const STORAGE_KEY = 'site-theme';

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function toggleTheme() {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

function showToast(message) {
  // Minimal unobtrusive toast
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'toast';
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, 2000);
}

function initYear() {
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initTheme() {
  setTheme(getPreferredTheme());
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function initForm() {
  if (!form || !formStatus) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    formStatus.textContent = `Thanks${name ? `, ${name}` : ''}! Message sent (demo).`;
    form.reset();
  });
}

function initDemoToast() {
  if (!demoToast) return;
  demoToast.addEventListener('click', () => showToast('Button clicked!'));
}

initTheme();
initYear();
initForm();
initDemoToast();


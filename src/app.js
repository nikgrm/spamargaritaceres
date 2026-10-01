// Progressive enhancement: navigation and content work without JavaScript.
const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('main-nav');
const mobile = window.matchMedia('(max-width: 64rem)');

function closeMenu(returnFocus = false) {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Abrir navegación');
  navigation.classList.remove('is-open');
  if (returnFocus) menu.focus();
}

if (menu && navigation) {
  document.documentElement.classList.add('enhanced');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
    navigation.classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) closeMenu();
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());
}

// A single, finite entrance. No carousel, timers or hidden no-JS content.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('welcome-motion');
}

// This site adds no analytics/advertising. Only the preference cookie is saved.
const preferenceName = 'mc_cookie_preference';
const cookieBanner = document.getElementById('cookie-banner');
const cookieSettings = document.querySelector('.cookie-settings');
const cookieStatus = document.getElementById('cookie-status');
let preferenceTrigger = null;

function savedCookiePreference() {
  try {
    const value = document.cookie.split('; ').find(row => row.startsWith(`${preferenceName}=`))?.split('=')[1];
    return ['v1-accepted', 'v1-necessary'].includes(value) ? value : null;
  } catch { return null; }
}

function updateCookiePosition() {
  if (cookieBanner && !cookieBanner.hidden) {
    document.body.style.setProperty('--cookie-banner-height', `${Math.ceil(cookieBanner.getBoundingClientRect().height)}px`);
  }
}

function showCookieBanner(openedByUser = false) {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  document.body.classList.add('cookies-open');
  updateCookiePosition();
  if (openedByUser) cookieBanner.querySelector('button').focus({ preventScroll: true });
}

if (cookieBanner && cookieSettings) {
  cookieSettings.hidden = false;
  if (!savedCookiePreference()) showCookieBanner();
  cookieSettings.addEventListener('click', () => {
    preferenceTrigger = cookieSettings;
    showCookieBanner(true);
  });
  cookieBanner.addEventListener('click', event => {
    const choice = event.target.closest('[data-cookie-choice]');
    if (!choice) return;
    const value = choice.dataset.cookieChoice;
    if (!['accepted', 'necessary'].includes(value)) return;
    try {
      const secure = location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${preferenceName}=v1-${value}; Max-Age=15552000; Path=/; SameSite=Lax${secure}`;
    } catch { /* Browser restrictions do not block the visitor's journey. */ }
    cookieBanner.hidden = true;
    document.body.classList.remove('cookies-open');
    cookieStatus.textContent = savedCookiePreference()
      ? 'Tu preferencia de cookies se ha guardado. Puedes cambiarla al pie de la página.'
      : 'Tu elección se ha aplicado a esta visita. El navegador no permite guardarla.';
    const destination = preferenceTrigger || document.getElementById('contenido');
    if (destination) {
      if (!preferenceTrigger) destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }
    preferenceTrigger = null;
  });
  if ('ResizeObserver' in window) new ResizeObserver(updateCookiePosition).observe(cookieBanner);
  else window.addEventListener('resize', updateCookiePosition, { passive: true });
  window.addEventListener('pageshow', () => {
    if (savedCookiePreference()) {
      cookieBanner.hidden = true;
      document.body.classList.remove('cookies-open');
    }
  });
}

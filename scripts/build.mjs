import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => readFile(path.join(root, file), 'utf8');
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const pages = JSON.parse(await read('src/data/pages.json'));
const groups = JSON.parse(await read('src/data/services.json'));
const navigation = [['index.html', 'Inicio'], ['tratamientos.html', 'Tratamientos'], ['experiencias.html', 'Experiencias'], ['nosotros.html', 'Nosotros'], ['contacto.html', 'Contacto']];
const whatsapp = (message) => `https://wa.me/573218415441?text=${encodeURIComponent(message)}`;
const reservation = whatsapp('Hola, quiero agendar mi valoración sin costo.');
const link = (url, label, className = 'text-link') => `<a class="${className}" href="${url}" target="_blank" rel="noopener">${label}</a>`;

function header(file) {
  return `<a class="skip" href="#contenido">Ir al contenido</a>
  <div class="announcement">Un momento para ti. <a href="contacto.html">Valoración sin costo</a></div>
  <header class="header"><div class="header-inner wrap">
    <a class="official-brand" href="index.html" aria-label="Margarita Cáceres, inicio"><img src="assets/logo-oficial.jpg" alt="Margarita Cáceres Spa y Estética" width="1024" height="792" decoding="async"></a>
    <button class="menu-toggle" aria-label="Abrir navegación" aria-expanded="false" aria-controls="main-nav">Menú <span class="menu-icon" aria-hidden="true"></span></button>
    <nav id="main-nav" aria-label="Navegación principal">${navigation.map(([url, title]) => `<a href="${url}"${file === url ? ' aria-current="page"' : ''}>${title}</a>`).join('')}</nav>
    ${link(reservation, 'Reservar una cita', 'button small')}
  </div></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap footer-grid">
    <div><a class="footer-brand" href="index.html"><img src="assets/logo-oficial.jpg" alt="Margarita Cáceres Spa y Estética" width="1024" height="792" loading="lazy" decoding="async"></a></div>
    <div class="footer-contact"><p class="eyebrow">TU PRÓXIMO MOMENTO</p><a class="footer-phone" href="tel:+573218415441">+57 321 841 5441</a><p>Atención y reservas por WhatsApp.</p>${link(reservation, 'Conversemos')}</div>
    <nav aria-label="Navegación del pie de página"><p class="eyebrow">EXPLORA EL SPA</p>${navigation.map(([url, title]) => `<a href="${url}">${title}</a>`).join('')}</nav>
  </div><div class="wrap footer-bottom"><p>© 2026 Margarita Cáceres. Todos los derechos reservados.</p><button class="cookie-settings" type="button" hidden>Preferencias de cookies</button><span>Belleza, cuidado y bienestar.</span></div></footer>`;
}

function visitorControls() {
  return `<a class="whatsapp-float" href="${whatsapp('Hola, me gustaría recibir información sobre los tratamientos de Margarita Cáceres.')}" target="_blank" rel="noopener" aria-label="Hablar con Margarita Cáceres por WhatsApp (se abre en otra pestaña)">
    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.45 0 .08 5.37.08 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.97 11.97 0 0 0 5.84 1.49h.01C18.65 23.86 24 18.5 24 11.9a11.83 11.83 0 0 0-3.48-8.42ZM12.05 21.84a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.68.97.98-3.59-.24-.37a9.93 9.93 0 1 1 8.34 4.58Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.49 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
    <span>Hablemos por WhatsApp</span>
  </a>
  <section class="cookie-banner" id="cookie-banner" role="region" aria-labelledby="cookie-title" hidden>
    <div class="cookie-copy"><p class="eyebrow">TU PRIVACIDAD</p><h2 id="cookie-title">Tú eliges.</h2><p>No añadimos cookies de publicidad ni de analítica. Guardamos tu elección para recordarla en tus próximas visitas.</p>
    <details class="cookie-details"><summary>Detalles sobre las cookies</summary><p>La cookie <strong>mc_cookie_preference</strong> recuerda tu elección durante 180 días. Puedes revisar tu decisión en «Preferencias de cookies», al pie de cualquier página.</p></details></div>
    <div class="cookie-actions"><button class="button" type="button" data-cookie-choice="accepted">Aceptar</button><button class="button cookie-essential" type="button" data-cookie-choice="necessary">Solo necesarias</button></div>
  </section><p class="sr-only" role="status" id="cookie-status"></p>`;
}

function catalog() {
  return groups.map((group, index) => `<section class="catalog-group" id="${group.id || 'faciales'}">
    <div class="catalog-heading"><span class="section-number">0${index + 1}</span><h3 class="group-title">${escape(group.title)}</h3><p class="group-note">${escape(group.note)}</p><span class="category-count">${group.items.length} tratamientos</span></div>
    <div class="catalog-items">${group.items.map(([name, description], itemIndex) => `<details class="treatment"${index === 0 && itemIndex === 0 ? ' open' : ''}><summary>${escape(name)}<span class="plus" aria-hidden="true"></span></summary><div class="detail-content"><p>${escape(description)}</p>${link(whatsapp(`Hola, me gustaría recibir información sobre ${name}.`), 'Consultar este tratamiento')}</div></details>`).join('')}</div>
  </section>`).join('\n');
}

function rituals() {
  const items = [
    ['Pausa esencial', ['Masaje relajante', 'Manta térmica', 'Presoterapia']],
    ['Tiempo de calma', ['Masaje relajante', 'Sauna']],
    ['Bienestar en equilibrio', ['Masaje relajante', 'Sauna', 'Presoterapia']],
    ['Calidez volcánica', ['Masaje relajante', 'Sauna', 'Piedras volcánicas', 'Presoterapia']],
    ['Pausa renovadora', ['Masaje relajante', 'Sauna', 'Detox iónica', 'Presoterapia']],
    ['Ritual de chocolate', ['Masaje relajante', 'Sauna', 'Piedras volcánicas', 'Chocolaterapia']]
  ];
  return items.map(([title, treatments], i) => `<article class="ritual-card"><div class="ritual-top"><span class="ritual-number">0${i + 1}</span><p class="eyebrow">COMBO ${i + 1}</p></div><h3>${title}</h3><ul>${treatments.map(t => `<li>${t}</li>`).join('')}</ul>${i === 5 ? '<p class="gift">Incluye hidratación facial de obsequio</p>' : ''}${link(whatsapp(`Hola, me gustaría reservar el combo ${i + 1} de relajación.`), 'Elegir esta experiencia', 'button ritual-button')}</article>`).join('\n');
}

for (const page of pages) {
  let content = await read(`src/pages/${page.file}`);
  content = content.replace('<div id="catalog-content"></div>', catalog()).replace('<div id="ritual-content" class="ritual-grid"></div>', `<div class="ritual-grid">${rituals()}</div>`);
  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escape(page.title)}</title><meta name="description" content="${escape(page.description)}">
  <meta name="theme-color" content="#143c32">
  <link rel="icon" type="image/jpeg" href="assets/logo-oficial.jpg">
  <link rel="preload" href="assets/fonts/serif.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/sans.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="style.css"><script src="app.js" defer></script>
</head>
<body class="page-${page.file.replace('.html', '')}">
${header(page.file)}<main id="contenido">${content}</main>${footer()}${visitorControls()}
</body></html>`;
  await writeFile(path.join(root, page.file), html);
}

const css = (await Promise.all(['base', 'components', 'pages', 'responsive', 'visitor'].map(name => read(`src/styles/${name}.css`)))).join('\n');
await writeFile(path.join(root, 'style.css'), css);
await writeFile(path.join(root, 'app.js'), await read('src/app.js'));
console.log(`Built ${pages.length} static pages; ${groups.reduce((sum, group) => sum + group.items.length, 0)} treatment descriptions.`);


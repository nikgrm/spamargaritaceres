# Margarita Cáceres · Spa y Estética

Web completa y autónoma, lista para subir a un repositorio o alojamiento estático.
Incluye cinco páginas, 38 fichas de servicios, seis experiencias, logo oficial,
animaciones de entrada, botones con relieve, acceso flotante a WhatsApp y preferencias de cookies.

## Publicar desde un repositorio en GitHub

1. Descomprime el ZIP.
2. Sube su contenido a la raíz del repositorio. `index.html` debe quedar al mismo nivel que `README.md`, no dentro de otra carpeta.
3. En el repositorio, abre **Settings → Pages**.
4. Selecciona **Deploy from a branch**, la rama **main** y la carpeta **/(root)**. Guarda.
5. Cuando termine la publicación, utiliza la dirección que aparece en Pages.

No hace falta instalar paquetes ni ejecutar una compilación para publicar esta versión.
El archivo `.nojekyll` está incluido; consérvalo. No subas solamente el ZIP: sube los archivos descomprimidos.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Otro alojamiento o dominio propio

Puedes servir esta misma carpeta como una web estática. La página de entrada es `index.html`.
Los enlaces y recursos son relativos y funcionan también en una subcarpeta del dominio.
La URL final depende del alojamiento; un dominio propio se configura con ese proveedor.

## Editar el contenido

- `src/pages/`: contenido de las cinco páginas.
- `src/data/services.json`: las 38 fichas de tratamientos.
- `src/data/pages.json`: títulos y descripciones.
- `src/styles/`: diseño, efectos, adaptación a pantallas y aviso de cookies.
- `src/app.js`: menú, animación de entrada y preferencias de cookies.
- `scripts/build.mjs`: cabecera, pie, experiencias y elementos compartidos.
- `assets/`: imágenes, logo y fuentes locales. Las licencias de las fuentes se conservan en `assets/fonts/`.

Después de editar las fuentes, ejecuta `npm run build` con Node.js 18 o superior.
El comando regenera los HTML, `style.css` y `app.js` en la raíz sin dependencias externas.
Sube también esos archivos actualizados al repositorio.

## Contacto y privacidad

WhatsApp: +57 321 841 5441.
No se incluyen publicidad ni analítica. La cookie `mc_cookie_preference` conserva la elección del visitante durante 180 días.
No hay formularios ni base de datos de visitantes. Las reservas se confirman con el equipo por WhatsApp.
La dirección y los horarios no se muestran porque todavía no se han proporcionado.

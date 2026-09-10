// PostHog — mismo proyecto compartido con el resto de los sitios de devsChile
// (devschile.cl, pegas, tienda, log...). Cada evento se etiqueta con
// site='beerjs.cl' para poder filtrar sin depender de `$host`.
//
// El token es público (es el que viaja en el bundle de todos los otros sitios),
// así que va literal: este sitio es HTML plano y no tiene paso de build donde
// inyectar variables de entorno.
(function () {
  var POSTHOG_KEY = 'phc_pMbrDFcoVoYS9kqBRmgLEzdTjuNXYqV4sypn7YsnFuY4';
  var POSTHOG_HOST = 'https://us.i.posthog.com';
  var SITE = 'beerjs.cl';

  var script = document.createElement('script');
  script.src = 'https://us-assets.i.posthog.com/static/array.js';
  script.async = true;
  script.crossOrigin = 'anonymous';

  script.onload = function () {
    if (!window.posthog || typeof window.posthog.init !== 'function') return;

    window.posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      respect_dnt: true
    });

    window.posthog.register({ site: SITE });

    window.posthog.startExceptionAutocapture({
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false
    });
  };

  document.head.appendChild(script);
})();

// Fon müziği: film klasöründe audio/mix.m4a yoksa (ör. GitHub Pages'te) müziği
// "muzikler" sürümündeki (release) dosyadan çalar.
//   5. sınıf: films/<slug>/      → Damla_<slug>_muzik.m4a
//   6–8. sınıf: films-<g>/<slug>/ → Damla_<g>sinif_<slug>_muzik.m4a
(function () {
  var aud = document.getElementById('aud');
  var m = location.pathname.match(/\/films(?:-(\d))?\/([^/]+)\/(?:index\.html)?$/);
  if (!aud || !m) return;
  var ad = m[1] ? 'Damla_' + m[1] + 'sinif_' + m[2] + '_muzik.m4a' : 'Damla_' + m[2] + '_muzik.m4a';
  var url = 'https://github.com/hakanatas/damla-fen/releases/download/muzikler/' + ad;
  function yedek() { if (aud.src !== url) { aud.src = url; aud.load(); } }
  if (/\.github\.io$/.test(location.hostname) || aud.error) yedek();
  else aud.addEventListener('error', yedek, { once: true });
})();

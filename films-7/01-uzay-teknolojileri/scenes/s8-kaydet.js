// SAHNE 8 — Gözlem defterine kaydetme (FB.7.1.1 özet · FB.7.1.2 model süreci)
(function () {
  const F = U7;
  const ITEMS = [
    'Uzay: atmosferin ötesindeki uçsuz bucaksız ortam',
    'Roket, uydu, sonda, istasyon, mekik, gezici araç, teleskop',
    'Benzer: insan yapımı, uzayı keşfe yardım eder',
    'Farklı: insanlı / insansız · Dünya çevresi / uzak gök cisimleri',
    'Yerli uydular: TÜRKSAT 6A (haberleşme), İMECE (gözlem)',
    'Teleskop: yer tabanlı (gözlemevi) · uzay (Hubble, James Webb)',
    'Modelimi önerdim, yeni kanıtlarla yeniledim.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) { F.record(ctx, t, E.s('record'), 'Gözlem Defteri · Uzay Teknolojileri', ITEMS, { step: 1.0, size: 38, gap: 76 }); }
  });
})();

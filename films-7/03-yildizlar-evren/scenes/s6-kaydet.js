// SAHNE 6 — Gözlem defterine kaydetme (FB.7.1.4 · FB.7.1.5 özet)
(function () {
  const F = U7;
  const ITEMS = [
    'Yıldız: ısı ve ışık yayan gaz kütlesi · mavi sıcak, kırmızı soğuk',
    'Işık yılı: ışığın 1 yılda aldığı yol (≈ 9,5 trilyon km)',
    'Bulutsu → önyıldız → yıldız · yaşamı kütle belirler',
    'Küçük kütleli: kırmızı dev → gezegenimsi bulutsu → beyaz cüce',
    'Büyük kütleli: kırmızı süperdev → süpernova → nötron yıldızı / kara delik',
    'Takımyıldızlar: Büyükayı, Küçükayı, Kraliçe, Avcı',
    'Dünya ⊂ Güneş sistemi ⊂ Samanyolu ⊂ evren'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) { F.record(ctx, t, E.s('record'), 'Gözlem Defteri · Yıldızlar ve Evren', ITEMS, { step: 1.1, size: 38, gap: 76 }); }
  });
})();

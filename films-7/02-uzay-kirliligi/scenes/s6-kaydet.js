// SAHNE 6 — Rapor gibi kaydetme (FB.7.1.3 süreç özeti · SDB3.3)
(function () {
  const F = U7;
  const ITEMS = [
    'Problem: görevi biten araçlar ve parçalar uzayda kalır',
    'Sonuçlar: çarpışma riski · düşen parçalar · gözlemlere etkisi',
    'Özet: araç ve parça arttıkça sorunlar da artar',
    'Veri: nesne sayısı artıyor → tahmin: risk yükselir',
    'Çözüm: atmosfere indir · topla · görev sonunu baştan planla',
    'Değerlendirme: önle + temizle; ülkeler birlikte kural koymalı'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Rapor', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) { F.record(ctx, t, E.s('record'), 'Rapor · Uzay Kirliliği', ITEMS, { step: 1.25, size: 40, gap: 84 }); }
  });
})();

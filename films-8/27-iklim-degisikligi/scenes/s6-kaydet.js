// SAHNE 6 — Kaydet · Sıra sende (karbon ayak izi hesabı, iklim sorunu için çözüm önerisi)
(function () {
  const { PAL } = INK;
  const U = U7;
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('record');
      U.record(ctx, t, s0, 'Küresel İklim Değişikliği', [
        'Sera gazları ısının bir kısmını tutar; doğal olarak gerekli.',
        'Fosil yakıt ve kesilen ormanlar → sera gazları artar.',
        'Sonuçlar: buzul erimesi, kuraklık, sel, yangın, sağlık',
        'Ozon incelmesi ayrı bir sorun; tek kış iklim değildir.',
        'Kuraklık için: musluk onarımı, yağmur suyu, damla sulama'
      ], { step: 1.2, size: 40, lh: 96, colors: [PAL.ink, U.HEAT, PAL.ink, U.AMBER, PAL.water] });
      U.damla(ctx, t, { x: 1700, y: 1040, s: 0.95, view: 'q3', flip: true, expr: 'happy', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 9 });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Karbon ayak izi hesabı ve iklim sorunu için çözüm', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const sT = E.s('task');
      U.task(ctx, t, sT, E.e('task') + 2, 'Sıra sende!', [
        'Güvenilir bir siteden karbon ayak izini hesapla.',
        'Küçültmek için düzenli bir tasarruf planı yap.',
        'Grubunla ülkemizden bir iklim sorunu seç:',
        'kuraklık, sel, orman yangını...',
        'Çözüm önerini sınıfta paylaş ve birlikte değerlendirin.'
      ], { x: 170, y: 170, w: 1330, h: 620, lh: 78, step: 1.0, colors: [PAL.ink, PAL.ink, PAL.ink, U.HEAT, PAL.ink] });
      const tk = E.se(t, sT, sT + 0.7);
      if (tk > 0) E.layer(ctx, tk, c => U.damla(c, t, { x: 1720, y: 880, s: 1.2, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]], seed: 9 }));
    }
  });
})();

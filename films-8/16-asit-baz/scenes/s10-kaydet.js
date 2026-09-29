// SAHNE 10 — Kaydet · Sıra sende (mor lahana deneyi, performans görevi) · Sıradaki: pH cetveli · bitiş
(function () {
  const { PAL } = INK;
  const U = U5;
  const ITEMS = [
    'Suda asit H⁺, baz OH⁻ iyonu verir.',
    'Ortak: sulu çözeltisi elektrik iletir, ayıraç rengini değiştirir.',
    'Asit + baz → tuz + su (etkileri azalır).',
    'Turnusol: asitte kırmızı, bazda mavi olur.',
    'Mor lahana: asit kırmızı-pembe, nötr mor, baz mavi-yeşil.',
    'Önerme → gözlem → sonuç → tahmin → sorgula.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      U.record(ctx, t, E.s('record'), 'Gözlem Defteri · Asitler ve Bazlar', ITEMS, { step: 1.0, lh: 84, size: 42, colors: [null, null, null, null, U.CABBAGE, U.AMBER] });
      U.damla(ctx, t, { x: 1650, y: 1000, s: 0.95, flip: true, look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Mor lahana deneyi görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next');
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', ['Öğretmeninle mor lahana suyu hazırla.', 'Evdeki maddeleri eşit miktarda behere koy.', 'Renkleri tabloya yaz: asit mi, baz mı, nötr mü?', 'Tadına, kokusuna bakma; gözlük ve eldiven tak.'], { x: 200, y: 190, w: 1220, h: 540, lh: 76, step: 0.9, colors: [null, null, null, U.RED] });
      const tk = Math.min(E.se(t, st, st + 0.7), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (tk > 0) E.layer(ctx, tk, c => U.damla(c, t, { x: 1660, y: 880, s: 1.2, flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]] }));
      const nk = E.se(t, sn, sn + 0.8);
      if (nk > 0) E.layer(ctx, nk, c => {
        INK.label(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center' });
        INK.label(c, 'pH Cetveli', 960, 330, { size: 80, align: 'center', weight: 700 });
        INK.label(c, 'Limon mu daha asidik, sirke mi?', 960, 410, { size: 42, align: 'center', alpha: 0.8 });
        U.phRuler(c, 330, 520, 84, 90, E.se(t, sn + 0.6, sn + 3.0));
        U.lemon(c, 330 + 84 * 2.5, 700, 0.9);
        U.damla(c, t, { x: 1690, y: 860, s: 0.95, flip: true, expr: 'curious', look: [-0.9, 0.1], arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
      U.end(ctx, t, '16 · Asitler ve Bazlar', 'FB.8.5.5 · FB.8.5.6');
    }
  });
})();

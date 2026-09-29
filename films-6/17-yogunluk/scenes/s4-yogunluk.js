// SAHNE 4 — Aynı saf maddenin kütlesi ve hacmi aynı oranda artar → yoğunluk = kütle ÷ hacim (g/cm³); taş: 54 ÷ 20 = 2,7
(function () {
  const { PAL } = INK;
  const F = F617;
  const BR = '#8A4A10';
  function ratio(ctx, t) {
    const s0 = E.s('ratio');
    const k1 = E.se(t, s0 + 0.3, s0 + 1.0, 'out'), k2 = E.se(t, s0 + 4.2, s0 + 5.0, 'out');
    const by = 560;
    if (k1 > 0) E.layer(ctx, k1, c => F.cube(c, 480, by, 110, 'iron', { seed: 401 }));
    if (k2 > 0) E.layer(ctx, k2, c => { F.cube(c, 1180, by, 110, 'iron', { seed: 402 }); F.cube(c, 1310, by, 110, 'iron', { seed: 403 }); });
    P.write(ctx, '1 küp', 500, 330, E.seg(t, s0 + 0.6, s0 + 1.4), { size: 46, align: 'center' });
    P.write(ctx, '2 küp', 1260, 330, E.seg(t, s0 + 4.4, s0 + 5.2), { size: 46, align: 'center' });
    // değerler
    const L = [['10 cm³', 480, 650, s0 + 1.4, PAL.water], ['79 g', 480, 730, s0 + 2.6, BR], ['20 cm³', 1245, 650, s0 + 5.2, PAL.water], ['158 g', 1245, 730, s0 + 6.2, BR]];
    L.forEach(([s, x, y, a, col]) => P.write(ctx, s, x, y, E.seg(t, a, a + 0.8), { size: 56, align: 'center', color: col }));
    // ×2 okları
    const ka = E.se(t, s0 + 7.2, s0 + 8.0), kb = E.se(t, s0 + 8.0, s0 + 8.8);
    if (ka > 0) { P.arrow(ctx, [640, 632], [1080, 632], ka, { w: 3, bend: 30, color: PAL.water }); if (ka > 0.9) F.txt(ctx, '× 2', 860, 600, { size: 44, align: 'center', color: PAL.water }); }
    if (kb > 0) { P.arrow(ctx, [640, 712], [1080, 712], kb, { w: 3, bend: -30, color: BR }); if (kb > 0.9) F.txt(ctx, '× 2', 860, 786, { size: 44, align: 'center', color: BR }); }
    INK.label(ctx, '(aynı demirden)', 1600, 470, { size: 34, alpha: 0.65 * E.se(t, s0 + 5.0, s0 + 5.8) });
  }
  function def(ctx, t) {
    const s0 = E.s('def');
    P.write(ctx, '79 ÷ 10 = 7,9', 560, 250, E.seg(t, s0 + 0.2, s0 + 1.2), { size: 54, align: 'center' });
    P.write(ctx, '158 ÷ 20 = 7,9', 1180, 250, E.seg(t, s0 + 0.9, s0 + 1.9), { size: 54, align: 'center' });
    P.write(ctx, 'hep aynı!', 1600, 250, E.seg(t, s0 + 2.0, s0 + 2.8), { size: 46, color: PAL.life });
    // formül kartı
    const kc = E.se(t, s0 + 2.8, s0 + 3.6, 'out');
    if (kc > 0) E.layer(ctx, kc, c => {
      F.card(c, 360, 320, 1560, 560, { seed: 1841, fill: '#FBF3DE' });
      F.txt(c, 'yoğunluk = kütle ÷ hacim', 960, 420, { size: 72, align: 'center' });
      F.txt(c, 'birimi: g/cm³', 960, 510, { size: 50, align: 'center', color: BR });
    });
    // taş örneği
    const ks = E.se(t, s0 + 6.0, s0 + 6.8, 'out');
    if (ks > 0) E.layer(ctx, ks, c => F.stone(c, 520, 760, 1.1, 7));
    P.write(ctx, 'taş: 54 g ÷ 20 cm³ = 2,7 g/cm³', 660, 740, E.seg(t, s0 + 6.4, s0 + 8.2), { size: 56 });
  }
  E.scene({
    name: 'Yoğunluk', concept: 'Yoğunluk = kütle ÷ hacim', from: 'ratio', to: 'def', trFrom: [960, 500],
    draw(ctx, t) {
      F.desk(ctx, 860, 4);
      const aD = E.se(t, E.s('def') - 0.3, E.s('def') + 0.5);
      if (aD < 1) E.layer(ctx, 1 - aD, c => ratio(c, t));
      if (aD > 0) E.layer(ctx, aD, c => def(c, t));
      const sd = E.s('def');
      F.damla(ctx, t, { x: 1700, y: 862, s: 1.05, flip: true, expr: t > sd + 3.5 ? 'happy' : 'thinking', look: [-0.8, 0.1], arms: t > sd + 3.5 && t < sd + 5.5 ? [[-1, 2.5], [1, 2.5]] : [[-1, 0.35], [1, 0.4]], seed: 3 });
    }
  });
})();

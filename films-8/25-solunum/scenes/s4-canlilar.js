// SAHNE 4 — Solunum tüm canlılar için ortaktır; tüketiciler besini dışarıdan alır, üreticiler kendileri üretir (FB.8.7.3 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  const ORGS = [
    ['insan', (c, x, y) => U.kid(c, x, y + 10, 0.55, { hair: 'long', shirt: U.HEAT, seed: 2 }), 'c'],
    ['fare', (c, x, y) => U.mouse(c, x - 6, y, 0.9), 'c'],
    ['serçe', (c, x, y) => U.sparrow(c, x, y, 0.9), 'c'],
    ['balık', (c, x, y) => U.fish(c, x + 10, y, 0.9, 1, '#D98A2B', 1), 'c'],
    ['ot', (c, x, y, t) => U.grass(c, x, y, 0.9, t), 'p'],
    ['ağaç', (c, x, y, t) => U.tree(c, x, y + 95, 0.38, t), 'p'],
    ['mantar', (c, x, y) => U.mushroom(c, x, y, 0.9), 'o'],
    ['bakteri', (c, x, y, t) => U.bacteria(c, x, y, 1.1, t), 'o']
  ];
  E.scene({
    name: 'Tüm canlılar', concept: 'Solunum tüm canlılarda ortaktır', from: 'all', to: 'producer', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('all'), sc = E.s('consumer'), sp = E.s('producer');
      ORGS.forEach(([name, dr, kind], i) => {
        const col = i % 4, row = Math.floor(i / 4), x = 190 + col * 400, y = 190 + row * 300;
        const k = E.se(t, sa + 0.3 + i * 0.35, sa + 0.9 + i * 0.35, 'out'); if (k <= 0) return;
        let dim = 1;
        if (t > sc) dim = kind === 'c' ? 1 : 0.35 + 0.65 * (1 - E.se(t, sc, sc + 0.6));
        if (t > sp) dim = kind === 'p' ? 1 : 0.35;
        E.layer(ctx, k * dim, c => {
          U.orgCard(c, x, y, 340, 250, name, (cc, cx, cy) => dr(cc, cx, cy, t), 5400 + i, { tint: kind === 'p' ? U.LIFE : kind === 'c' ? U.HEAT : '#9A9387' });
          const kc = E.se(t, sa + 4.0 + i * 0.15, sa + 4.5 + i * 0.15);
          if (kc > 0) { P.check(c, x + 300, y + 40, 34, kc, { w: 5, color: U.LIFE_D }); }
          // tüketici: besini dışarıdan alır
          if (kind === 'c' && t > sc + 0.8) { const u = ((t - sc) * 0.5 + i * 0.2) % 1; U.sugar(c, x + 30 + u * 140, y + 70 + Math.sin(u * 3) * 10, 12 * Math.min(1, (1 - u) * 5)); }
          // üretici: güneş ışığıyla kendi besinini üretir
          if (kind === 'p' && t > sp + 0.8) { P.sun(c, x + 50, y + 50, 18, t, { nrays: 8, cells: false, glow: false }); const k2 = E.se(t, sp + 1.6, sp + 2.4); if (k2 > 0) { U.sugar(c, x + 290, y + 130, 14 * P.pop(k2)); } const k3 = E.se(t, sp + 4.0, sp + 4.8); if (k3 > 0) U.atp(c, x + 290, y + 185, 20 * P.pop(k3)); }
        });
      });
      const ka = E.se(t, sa + 4.0, sa + 4.6) * (1 - E.se(t, sc - 0.3, sc + 0.2));
      if (ka > 0) E.layer(ctx, ka, c => P.write(c, 'hepsi solunum yapar!', 960, 850, 1, { size: 56, align: 'center', color: U.LIFE_D }));
      const kc = E.se(t, sc + 0.4, sc + 1.0) * (1 - E.se(t, sp - 0.3, sp + 0.2));
      if (kc > 0) E.layer(ctx, kc, c => P.write(c, 'Tüketici: besini dışarıdan, yiyerek alır', 960, 850, E.seg(t, sc + 0.4, sc + 1.8), { size: 52, align: 'center', color: '#8E4A3A' }));
      const kp = E.se(t, sp + 0.4, sp + 1.0);
      if (kp > 0) E.layer(ctx, kp, c => P.write(c, 'Üretici: fotosentezle besin üretir → solunumla enerji elde eder', 960, 850, E.seg(t, sp + 0.4, sp + 2.4), { size: 46, align: 'center', color: U.LIFE_D }));
    }
  });
})();

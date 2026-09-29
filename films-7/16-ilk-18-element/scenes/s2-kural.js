// SAHNE 2 — Sembol yazım kuralı: tek harf büyük; iki harf → ilki büyük ikincisi küçük; Latince kökenli sembol (Na ← natrium) (FB.7.5.5 a)
(function () {
  const { PAL, stroke } = INK;
  const F = F7M;
  E.scene({
    name: 'Yazım kuralı', concept: 'Sembollerin yazılışı', from: 'rule1', to: 'latin', trFrom: [700, 300],
    draw(ctx, t) {
      const s1 = E.s('rule1'), s2 = E.s('rule2'), sl = E.s('latin');
      const TS = 160;
      [['H', 1, 'hidrojen'], ['C', 6, 'karbon'], ['N', 7, 'azot'], ['O', 8, 'oksijen']].forEach(([s, n, nm], i) => {
        const k = E.se(t, s1 + 0.6 + i * 0.5, s1 + 1.1 + i * 0.5, 'out'); if (k <= 0) return;
        F.tile(ctx, 330 + i * 185, 200, TS * P.pop(k), TS * P.pop(k), s, n, nm, { tint: PAL.water, tintA: 0.12 });
      });
      P.write(ctx, 'tek harf → BÜYÜK', 1110, 300, E.seg(t, s1 + 2.6, s1 + 3.6), { size: 50, color: PAL.water });
      [['He', 2, 'helyum'], ['Na', 11, 'sodyum'], ['Cl', 17, 'klor']].forEach(([s, n, nm], i) => {
        const k = E.se(t, s2 + 0.6 + i * 0.5, s2 + 1.1 + i * 0.5, 'out'); if (k <= 0) return;
        F.tile(ctx, 330 + i * 185, 420, TS * P.pop(k), TS * P.pop(k), s, n, nm, { tint: PAL.water, tintA: 0.12 });
      });
      P.write(ctx, 'iki harf → Büyük + küçük', 925, 520, E.seg(t, s2 + 2.2, s2 + 3.2), { size: 50, color: PAL.water });
      // yanlış yazımlar
      const wk = E.se(t, s2 + 4.0, s2 + 4.6);
      if (wk > 0) E.layer(ctx, wk, c => {
        F.txt(c, 'NA', 1560, 400, { size: 64, align: 'center' }); P.cross(c, 1560, 380, 42, E.se(t, s2 + 4.3, s2 + 4.9), { w: 7, color: F.RED });
        F.txt(c, 'na', 1700, 400, { size: 64, align: 'center' }); P.cross(c, 1700, 380, 42, E.se(t, s2 + 4.7, s2 + 5.3), { w: 7, color: F.RED });
        F.txt(c, 'yanlış', 1630, 460, { size: 34, align: 'center', color: F.RED });
      });
      // Latince köken
      const lk = E.se(t, sl + 0.2, sl + 0.8, 'out');
      if (lk > 0) E.layer(ctx, lk, c => {
        F.card(c, 330, 650, 1500, 870, { seed: 1101 });
        F.tile(c, 370, 675, 170, 170, 'Na', 11, 'sodyum', { tint: PAL.water, tintA: 0.2, lw: 3 });
        P.arrow(c, [760, 760], [570, 760], E.se(t, sl + 0.8, sl + 1.4), { w: 3, head: 13 });
        P.write(c, '“natrium”', 790, 740, E.seg(t, sl + 1.0, sl + 2.0), { size: 60, color: F.BR });
        P.write(c, 'Latince ad', 790, 810, E.seg(t, sl + 1.8, sl + 2.6), { size: 40, weight: 400 });
        P.write(c, '(S, kükürdün sembolü)', 1090, 745, E.seg(t, sl + 3.0, sl + 4.2), { size: 32, weight: 400, alpha: 0.8 });
      });
      F.damla(ctx, t, { x: 1720, y: 900, s: 0.95, flip: true, expr: t > sl ? 'happy' : 'curious', look: [-0.8, -0.2], seed: 3, arms: [[-1, 0.35], [1, 1.8]] });
    }
  });
})();

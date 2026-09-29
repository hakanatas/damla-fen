// SAHNE 3 — Sulu çözeltide iyonlar: asit → H⁺, baz → OH⁻ (FB.8.5.5 a; program: "sulu çözeltilerine verdikleri iyonlar belirtilir")
(function () {
  const { PAL, rng } = INK;
  const U = U5;
  const BY = 820;
  function ions(ctx, cx, top, bottom, w, sym, ch, col, n, t, seed, k) {
    const r = rng(seed);
    for (let i = 0; i < n; i++) {
      const a = r() * 6.28, sp = 0.4 + r() * 0.5;
      const x = cx + (r() - 0.5) * w * 0.7 + Math.sin(t * sp + a) * 16, y = top + 30 + r() * (bottom - top - 60) + Math.cos(t * sp * 1.3 + a) * 12;
      const kk = Math.max(0, Math.min(1, k * n - i)); if (kk <= 0) continue;
      ctx.save(); ctx.globalAlpha *= kk;
      U.ball(ctx, x, y, 30, col);
      U.ion(ctx, sym, ch, x, y + 10, 30, { align: 'center', color: PAL.ink });
      ctx.restore();
    }
  }
  E.scene({
    name: 'İyonlar', concept: 'Asit H⁺, baz OH⁻ iyonu verir', from: 'ions', to: 'ions', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('ions');
      U.bench(ctx, -40, 1960, BY, 1701);
      const kA = E.se(t, s0 + 0.3, s0 + 1.0, 'out'), kB = E.se(t, s0 + 3.6, s0 + 4.3, 'out');
      if (kA > 0) E.layer(ctx, kA, c => {
        const r = U.beaker(c, 560, BY, 2.0, { liq: '#E7D2DC', lvl: 0.75, seed: 4700 });
        ions(c, 560, r.ly, BY - 20, 300, 'H', '+', '#F0B3C8', 7, t, 4701, E.se(t, s0 + 1.0, s0 + 3.0));
        U.txt(c, 'asit + su', 560, BY + 70, { size: 40, align: 'center', color: U.ACID });
        U.txt(c, 'hidrojen iyonu', 560, 330, { size: 44, align: 'center', color: U.ACID, alpha: E.se(t, s0 + 1.8, s0 + 2.4) });
        U.ion(c, 'H', '+', 560, 270, 60, { align: 'center', color: U.ACID, alpha: E.se(t, s0 + 1.8, s0 + 2.4) });
      });
      if (kB > 0) E.layer(ctx, kB, c => {
        const r = U.beaker(c, 1360, BY, 2.0, { liq: '#D3DDF0', lvl: 0.75, seed: 4710 });
        ions(c, 1360, r.ly, BY - 20, 300, 'OH', '−', '#B5C9EC', 7, t, 4711, E.se(t, s0 + 4.3, s0 + 6.3));
        U.txt(c, 'baz + su', 1360, BY + 70, { size: 40, align: 'center', color: U.BASE });
        U.txt(c, 'hidroksit iyonu', 1360, 330, { size: 44, align: 'center', color: U.BASE, alpha: E.se(t, s0 + 5.0, s0 + 5.6) });
        U.ion(c, 'OH', '−', 1360, 270, 60, { align: 'center', color: U.BASE, alpha: E.se(t, s0 + 5.0, s0 + 5.6) });
      });
      U.damla(ctx, t, { x: 960, y: BY, s: 0.9, view: 'front', expr: 'curious', look: [t < s0 + 3.6 ? -0.8 : 0.8, -0.2], arms: [[-1, t < s0 + 3.6 ? 2.0 : 0.4], [1, t < s0 + 3.6 ? 0.4 : 2.0]] });
      U.txt(ctx, '(çizim ölçekli değildir)', 1780, 200, { size: 28, align: 'right', alpha: 0.55 });
    }
  });
})();

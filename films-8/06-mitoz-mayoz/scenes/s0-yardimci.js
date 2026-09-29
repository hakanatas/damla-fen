// Film 6'ya özel yardımcılar (sahne değil): kromozom takımlı hücre çizimi.
// Model: 2 çift = 4 kromozom (insanda 23 çift = 46). Mavi: babadan, kehribar: anneden gelen üye.
(function (G) {
  const F = G.G8, K = G.KIT;
  const M = {};
  M.LONG = 'L'; M.SHORT = 'S';
  // tam takım (vücut hücresi): uzun çift + kısa çift
  M.full = [{ L: 1, c: F.CH1 }, { L: 1, c: F.CH2 }, { L: 0, c: F.CH1 }, { L: 0, c: F.CH2 }];
  // set: [{L:1|0, c, tip?, tipArm?}], o: {dup, scale, split}
  M.cell = (ctx, x, y, r, set, o = {}) => {
    F.cell(ctx, x, y, r, r * 0.93, { nuc: o.nuc !== false, nr: r * 0.72, seed: o.seed ?? 5700, lw: Math.max(2, r * 0.018) });
    const n = set.length, sc = o.scale ?? r / 190;
    set.forEach((ch, i) => {
      const px = x + (i - (n - 1) / 2) * 62 * sc * (o.dup ? 1.25 : 1), len = (ch.L ? 150 : 95) * sc;
      F.chromo(ctx, px, y + (ch.L ? 0 : 10 * sc), len, ch.c, { dup: !!o.dup, w: 26 * sc, rot: (i % 2 ? 0.12 : -0.1), tip: ch.tip, tipArm: ch.tipArm, split: o.split });
    });
  };
  M.count = (ctx, txt, x, y, k = 1, o = {}) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; K.node(ctx, txt, x, y, 1, { size: o.size ?? 34, nopop: true, tint: o.tint, tintA: 0.3, seed: o.seed ?? 3 }); ctx.restore(); };
  G.M6 = M;
})(window);

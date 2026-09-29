// SAHNE 1 — Merak (temel kabul: pil/ampul sayısı parlaklığı değiştirir; köprü: tel de değişken olabilir)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Merak', concept: 'Tel değişirse parlaklık değişir mi?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('q'), 'sine') });
      CK.table(ctx, 820);
      F20.rig(ctx, 1140, 820, 1.0, F20.B(F20.R(50, false, 'nicr')), t, { cm: 50 });
      const o = { x: 300, y: 822, s: 1.25, view: 'q3', expr: 'happy', look: [0.8, -0.2], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 1.9 + 0.1 * Math.sin(t * 3)]] };
      if (t > sq) { o.expr = 'thinking'; o.look = [0.6, -0.8]; o.arms = [[-1, 0.4], [1, [30, -150]]]; }
      DAMLA.draw(ctx, o);
      ctx.restore();
      // bilinen: pil ve ampul sayısı
      const kk = Math.min(E.se(t, sh + 1.0, sh + 1.6), 1 - E.se(t, sq - 0.2, sq + 0.3));
      if (kk > 0) E.layer(ctx, kk, c => {
        CK.card(c, 620, 170, 700, 190, { seed: 11 });
        INK.label(c, 'Biliyorum:', 660, 230, { size: 40, weight: 700, color: '#8A4A10' });
        INK.label(c, 'pil sayısı ↑  →  parlaklık ↑', 660, 285, { size: 38 });
        INK.label(c, 'ampul sayısı ↑  →  parlaklık ↓', 660, 335, { size: 38 });
      });
      const kb = E.se(t, sq + 0.2, sq + 0.8, 'out');
      if (kb > 0) {
        P.bubble(ctx, 1000, 270, 860, 300, [470, 760], kb, 5);
        if (kb > 0.6) {
          const ws = [['nicr', false, 180], ['nicr', true, 300], ['cu', false, 180]];
          ws.forEach(([m, th, len], i) => { const k = E.se(t, sq + 0.7 + i * 0.3, sq + 1.1 + i * 0.3); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; stroke(ctx, [[700 + i * 220, 200], [700 + i * 220 + len * 0.6, 200 + (i - 1) * 6]], { w: th ? 8 : 3, color: m === 'cu' ? CK.COPPER : F20.NICR, dry: false, taper: 0 }); ctx.restore(); });
          P.write(ctx, 'Tel değişirse parlaklık değişir mi?', 1000, 320, E.seg(t, sq + 1.6, sq + 3.0), { size: 46, align: 'center' });
        }
      }
      CK.titleCard(ctx, t, 20, 'Elektriksel Direnç ve Reosta');
    }
  });
})();

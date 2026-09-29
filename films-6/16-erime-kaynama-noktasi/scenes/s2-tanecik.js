// SAHNE 2 — Tanecikli yapı (toplarla model), saf ve saf olmayan madde (element/bileşik/karışım kavramlarına girilmeden)
(function () {
  const { PAL, line, stroke, circlePts, rng, dashed } = INK;
  const F = G16;
  function balls(ctx, cx, cy, mixed, t, k, seed) {
    const R = rng(seed); const n = 16;
    for (let i = 0; i < n; i++) {
      const col = i % 4, row = (i / 4) | 0;
      const x = cx - 105 + col * 70 + (R() - 0.5) * 16 + Math.sin(t * 2 + i) * 3, y = cy - 105 + row * 70 + (R() - 0.5) * 16 + Math.cos(t * 1.7 + i) * 3;
      const other = mixed && R() < 0.45;
      const kk = E.clamp(k * 2 - i / n); if (kk <= 0) continue;
      ctx.save(); ctx.globalAlpha *= kk;
      F.particle(ctx, x, y, other ? 20 : 26, 0, other ? { fill: '#F3D9A6', color: PAL.light } : {});
      ctx.restore();
    }
  }
  E.scene({
    name: 'Tanecikli yapı', concept: 'Saf ve saf olmayan maddeler taneciklerden oluşur', from: 'particles', to: 'both', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('particles'), su = E.s('pure'), sb = E.s('both');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      P.write(ctx, 'Maddeler taneciklerden oluşur', 290, 215, E.seg(t, sp + 0.3, sp + 2.0), { size: 50 });
      INK.label(ctx, '(toplarla model)', 990, 215, { size: 34, alpha: 0.7 * E.se(t, sp + 2.0, sp + 2.8) });
      const A = [560, 510], B = [1200, 510];
      const ka = E.se(t, sp + 1.6, sp + 3.6), kb = E.se(t, su + 3.6, su + 5.6);
      [[A, ka, false], [B, kb, true]].forEach(([p, k, mixed], i) => {
        if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = Math.min(1, k * 2);
        dashed(ctx, F.rectPts(p[0] - 180, p[1] - 180, p[0] + 180, p[1] + 180, 30), { w: 2.4, on: 12, off: 9, color: PAL.water });
        ctx.restore();
        balls(ctx, p[0], p[1], mixed, t, k, 2301 + i * 7);
      });
      const la = E.se(t, su + 0.4, su + 1.2);
      if (la > 0) { INK.label(ctx, 'saf madde', A[0], 750, { size: 46, weight: 700, align: 'center', color: PAL.water, alpha: la }); INK.label(ctx, 'aynı cins tanecikler · ör. saf su', A[0], 800, { size: 32, align: 'center', alpha: la * 0.85 }); }
      const lb = E.se(t, su + 4.6, su + 5.4);
      if (lb > 0) { INK.label(ctx, 'saf olmayan madde', B[0], 750, { size: 46, weight: 700, align: 'center', color: F.AMBER, alpha: lb }); INK.label(ctx, 'farklı cins tanecikler · ör. tuzlu su', B[0], 800, { size: 32, align: 'center', alpha: lb * 0.85 }); }
      const qk = E.se(t, sb + 0.2, sb + 1.0);
      if (qk > 0) E.layer(ctx, qk, c => {
        INK.label(c, 'ikisi de taneciklerden oluşur', 880, 860, { size: 38, weight: 700, align: 'center', rot: 0 });
        F.card(c, 1420, 250, 330, 330, { fill: '#F6E7B8', seed: 2310 });
        INK.label(c, 'Saf maddeyi', 1585, 320, { size: 38, weight: 700, align: 'center' });
        INK.label(c, 'ne ayırt eder?', 1585, 370, { size: 38, weight: 700, align: 'center' });
        P.write(c, 'erime noktası?', 1450, 450, E.seg(t, sb + 2.2, sb + 3.2), { size: 36, color: F.AMBER });
        P.write(c, 'kaynama noktası?', 1450, 520, E.seg(t, sb + 3.0, sb + 4.0), { size: 36, color: F.HEAT });
      });
      DAMLA.draw(ctx, {
        x: 1760, y: 1060, s: 0.95, view: 'q3', flip: true, t, seed: 2, blink: E.blink(t, 6), squash: E.breath(t), talk: E.talk(t),
        expr: t > sb ? 'thinking' : 'curious', look: [-0.7, -0.4], arms: [[-1, 0.35], [1, 0.4]]
      });
    }
  });
})();

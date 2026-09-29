// SAHNE 1 — Merak: hücreler bir araya gelince ne olur?
(function () {
  const { PAL, stroke, circlePts } = INK;
  E.scene({
    name: 'Merak', concept: 'Hücreler bir araya gelince', from: 'title', to: 'hello',
    draw(ctx, t) {
      const F = F10, hill = P.hillLine(E.W), sh = E.s('hello');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('hello'), 'sine') });
      P.landscape(ctx, E.W, E.H, t, { hill });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      const think = t > sh + 3;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr: think ? 'thinking' : (t > sh ? 'happy' : 'neutral'), look: think ? [0.6, -0.7] : [0, 0.1], blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: think ? [[-1, 0.3], [1, [30, -86]]] : (t > sh ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : [[-1, 0.35], [1, 0.35]]) });
      ctx.restore();
      // thought bubble: many cells coming together
      const k = E.se(t, sh + 3.4, sh + 4.1, 'out');
      if (k > 0) {
        P.bubble(ctx, 1380, 400, 620, 380, [900, 520], k, 3);
        if (k > 0.6) {
          const m = E.se(t, sh + 4.4, sh + 7.5);
          const R = INK.rng(7);
          for (let i = 0; i < 9; i++) {
            const a = R() * 6.28, d = 220 + R() * 60;
            const tx = 1260 + (i % 3) * 110 + (Math.floor(i / 3) % 2) * 50, ty = 330 + Math.floor(i / 3) * 62;
            const x = E.lerp(1380 + Math.cos(a) * d * 0.9, tx, m), y = E.lerp(400 + Math.sin(a) * d * 0.45, ty, m);
            F.muscleCell(ctx, x, y, 120, 34, 0, 60 + i, { w: 1.8 });
          }
          if (m >= 1) P.write(ctx, '?', 1600, 500, E.se(t, sh + 7.5, sh + 8.2), { size: 110, align: 'center' });
        }
      }
      F.title(ctx, t, 10, 'Hücreden Organizmaya', 3);
    }
  });
})();

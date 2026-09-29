// SAHNE 1 — Merak + köprü kurma: tuğla/duvar ↔ hücre/canlı (TYMM köprü kurma önerisi)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Merak', concept: 'Canlılar neyden yapılmıştır?', from: 'title', to: 'cell',
    draw(ctx, t) {
      const F = F09, hill = P.hillLine(E.W);
      const sh = E.s('hello'), sb = E.s('bricks'), sc = E.s('cell');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540 + 10 * E.se(t, 0, sh + 3, 'sine'), z: 1 + 0.03 * E.se(t, 0, sh + 3, 'sine') });
      P.landscape(ctx, E.W, E.H, t, { hill });
      // brick wall on the right
      const wx = 1230, wy = P.hillY(hill, 1500) + 30;
      F.bricks(ctx, wx, wy, 6, 6, 88, 40, 1);
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      let arms = [[-1, 0.35], [1, 0.35]], look = [0, 0.1], expr = 'neutral', flip = false, view = 'front', prop = null;
      if (t < sh + 0.4) { expr = 'neutral'; }
      else if (t < sb) { arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; expr = 'happy'; }
      else if (t < sc) { view = 'q3'; arms = [[-1, 0.35], [1, 1.9 + 0.08 * Math.sin(t * 3)]]; look = [0.8, -0.1]; expr = t > sb + 4 ? 'thinking' : 'curious'; }
      else { view = 'q3'; flip = true; prop = 'lens'; arms = [[-1, 0.3], [1, 2.0]]; look = [0.8, -0.2]; expr = 'curious'; }
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view, flip, expr, look, blink: E.blink(t, 2), squash: E.breath(t), arms, t, talk: E.talk(t), seed: 1, prop, propTilt: -0.4 });
      ctx.restore();

      // --- bricks: a wall is made of small bricks ---
      if (t > sb) {
        const k = E.se(t, sb + 0.4, sb + 1.2);
        const bx = wx + 88 * 2 + 44, by = wy - 40 * 3 - 20; // one brick (row 2 offset)
        ctx.save(); ctx.globalAlpha = k * (1 - E.se(t, sc + 0.2, sc + 1));
        stroke(ctx, circlePts(bx, by, 62, 36, 40), { w: 4, closed: true, color: PAL.light, seed: 12 });
        ctx.restore();
        F.tag(ctx, 'bir tuğla', 1560, 520, [bx + 30, by - 30], E.se(t, sb + 0.8, sb + 1.8) * (1 - E.se(t, sc + 0.2, sc + 1)), { size: 44 });
        E.inkText(ctx, 'Canlılar neyden yapılmış?', 960, 250, t, sb + 3.4, sc + 0.6, { size: 70, align: 'center' });
      }
      // --- cell: magnified leaf shows cells ---
      if (t > sc) {
        const k = E.se(t, sc + 0.3, sc + 1.1, 'out');
        const cx = 470, cy = 390, R = 190 * P.pop(k);
        const tree = [236, P.hillY(hill, 230) - 150];
        ctx.save(); ctx.globalAlpha = k; INK.dashed(ctx, [[tree[0] + 10, tree[1] - 20], [cx - 60, cy + R - 10]], { w: 2, on: 8, off: 7 }); ctx.restore();
        if (R > 2) F.fov(ctx, cx, cy, R, 'leaf', E.se(t, sc + 0.8, sc + 2), t);
        const kl = E.se(t, sc + 1.6, sc + 2.6);
        F.tag(ctx, 'hücreler', 760, 300, [cx + 60, cy - 30], kl, { size: 52, color: '#3E5A1A' });
        P.write(ctx, 'gözle görülmez', 760, 360, E.se(t, sc + 3.6, sc + 4.6), { size: 38, weight: 400 });
        // analogy
        const ka = E.se(t, sc + 4.4, sc + 5.4);
        if (ka > 0) E.layer(ctx, ka, c => {
          F.card(c, 1180, 180, 1760, 400, { seed: 21 });
          P.write(c, 'tuğla → duvar', 1470, 265, 1, { size: 50, align: 'center', color: '#8A4A2A' });
          P.write(c, 'hücre → canlı', 1470, 350, E.se(t, sc + 5, sc + 6), { size: 50, align: 'center', color: '#3E5A1A' });
        });
      }
      F.title(ctx, t, 9, 'Canlıların Yapı Taşı: Hücre', 3);
    }
  });
})();

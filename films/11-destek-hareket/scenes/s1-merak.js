// SAHNE 1 — Merak + köprü kurma: bina iskeleti ↔ vücudumuzun iskeleti
(function () {
  const { PAL, line, stroke } = INK;
  E.scene({
    name: 'Merak', concept: 'Bizi ayakta tutan ne?', from: 'title', to: 'building',
    draw(ctx, t) {
      const F = F11, hill = P.hillLine(E.W), sh = E.s('hello'), sb = E.s('building');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('building'), 'sine') });
      P.landscape(ctx, E.W, E.H, t, { hill });
      const bx = 1250, by = P.hillY(hill, 1460) + 24;
      F.building(ctx, bx, by, E.se(t, sb + 0.2, sb + 3.2), t);
      const dx = 760, dy = P.hillY(hill, dx) + 4;
      let arms = [[-1, 0.35], [1, 0.35]], expr = 'neutral', look = [0, 0.1], view = 'front';
      if (t > sh && t < sh + 3.5) { arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; expr = 'happy'; }
      else if (t > sh + 3.5 && t < sb) { arms = [[-1, 0.35], [1, 1.6]]; expr = 'curious'; look = [0.2, 0.3]; }
      else if (t >= sb) { view = 'q3'; arms = [[-1, 0.35], [1, 2.0 + 0.06 * Math.sin(t * 3)]]; expr = t > sb + 4.5 ? 'thinking' : 'curious'; look = [0.8, -0.4]; }
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view, expr, look, blink: E.blink(t, 2), squash: E.breath(t), arms, t, talk: E.talk(t), seed: 1 });
      ctx.restore();
      // "no skeleton" joke: dashed outline where bones would be
      const kn = Math.min(E.se(t, sh + 1.2, sh + 2), 1 - E.se(t, sb - 0.5, sb));
      if (kn > 0) { ctx.save(); ctx.globalAlpha *= kn; P.write(ctx, 'iskelet: yok!', 1030, 560, 1, { size: 50, color: PAL.water }); INK.leader(ctx, [1020, 545], [880, 640], { w: 2 }); ctx.restore(); }
      if (t > sb) {
        F.tag(ctx, 'iskelet', 1215, 420, [bx + 140, by - 330], E.se(t, sb + 2.6, sb + 3.4), { size: 50, align: 'right', color: '#5A5560' });
        E.inkText(ctx, 'Bizi ayakta tutan ne?', 900, 240, t, sb + 4.2, E.e('building') + 1, { size: 64, align: 'center' });
      }
      F.title(ctx, t, 11, 'Destek ve Hareket Sistemi', 3);
    }
  });
})();

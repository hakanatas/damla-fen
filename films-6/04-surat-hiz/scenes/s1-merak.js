// SAHNE 1 — Merak: evden okula yürüyüş; alınan yol ve konum soruları (köprü kurma)
(function () {
  const { PAL, line, stroke } = INK;
  E.scene({
    name: 'Merak', concept: 'Günlük yaşamda hareket', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      const hill = P.hillLine(E.W, 880);
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('q'), 'sine') });
      ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = PAL.water; ctx.fillRect(-100, -100, 2200, 1000); ctx.restore();
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      F64.house(ctx, 280, P.hillY(hill, 280) + 8, 1.1);
      F64.school(ctx, 1600, P.hillY(hill, 1600) + 8, 1.1);
      INK.label(ctx, 'ev', 280, P.hillY(hill, 280) + 60, { size: 40, weight: 700, align: 'center' });
      const walk = E.se(t, sh + 1.5, E.e('q') - 0.5, 'sine');
      const dx = E.lerp(470, 1160, walk), dy = P.hillY(hill, dx) + 4;
      const moving = walk > 0 && walk < 1;
      DAMLA.draw(ctx, { x: dx, y: dy - (moving ? Math.abs(Math.sin(t * 6)) * 6 : 0), s: 1.2, view: moving ? 'side' : 'q3', expr: t > sq ? 'curious' : 'happy', look: [1, t > sq ? -0.3 : 0], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        feet: moving ? E.walk(t * 6) : undefined, arms: t < sh + 1.5 ? [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] : [[-1, 0.3 + (moving ? 0.3 * Math.sin(t * 6) : 0)], [1, 0.3 - (moving ? 0.3 * Math.sin(t * 6) : 0)]] });
      ctx.restore();
      // question bubbles
      const b1 = E.se(t, sq + 0.3, sq + 1.0, 'out'), b2 = E.se(t, sq + 3.0, sq + 3.7, 'out');
      if (b1 > 0) { P.bubble(ctx, 620, 430, 520, 170, null, b1, 3); if (b1 > 0.6) INK.label(ctx, 'Ne kadar yol aldım?', 620, 448, { size: 46, weight: 700, align: 'center' }); }
      if (b2 > 0) { P.bubble(ctx, 1300, 380, 520, 170, null, b2, 5); if (b2 > 0.6) INK.label(ctx, 'Okul nerede, hangi yönde?', 1300, 398, { size: 42, weight: 700, align: 'center' }); }
      F64.title(ctx, t, 4, 'Ne Kadar Hızlı, Hangi Yöne?', 2);
    }
  });
})();

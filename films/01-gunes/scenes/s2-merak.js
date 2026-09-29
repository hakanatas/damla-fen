// SAHNE 2 — Merak: bilim soru sormakla başlar (TYMM: öğrenciler merak ettikleri soruları sorar)
(function () {
  const { PAL, line, stroke, circlePts, arrowHead } = INK;
  function thermo(ctx, x, y) { const b = [[x - 7, y - 40], [x + 7, y - 40], [x + 7, y + 8], [x - 7, y + 8]]; stroke(ctx, b.concat([b[0]]), { w: 2.4, closed: true }); P.fillPts(ctx, circlePts(x, y + 16, 13, 13, 20), '#B5553F', 0.85); stroke(ctx, circlePts(x, y + 16, 13, 13, 20), { w: 2.4, closed: true }); P.fillPts(ctx, [[x - 3, y - 20], [x + 3, y - 20], [x + 3, y + 8], [x - 3, y + 8]], '#B5553F', 0.85); }
  function ruler(ctx, x, y) { const b = [[x - 45, y - 12], [x + 45, y - 12], [x + 45, y + 12], [x - 45, y + 12], [x - 45, y - 12]]; P.fillPts(ctx, b, PAL.light, 0.5); stroke(ctx, b, { w: 2.4, closed: true }); for (let i = -4; i <= 4; i++) line(ctx, [x + i * 10, y - 12], [x + i * 10, y - 12 + (i % 2 ? 7 : 12)], { w: 1.4, dry: false }); }
  function spin(ctx, x, y, t) { const a0 = t * 2; const pts = P.arc(x, y, 24, a0, a0 + 4.8, 30); stroke(ctx, pts, { w: 3 }); arrowHead(ctx, pts[27], pts[30], 11, { w: 2.6 }); }
  E.scene({
    name: 'Merak', concept: 'Soru sorma: bilim soruyla başlar', from: 'neighbor', to: 'science', tr: 0.01,
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const s0 = E.s('neighbor'), sq = E.s('questions'), ss = E.s('science');
      const cz = E.se(t, s0, s0 + 4, 'sine');
      ctx.save();
      // continue from scene 1's final camera, then settle on Damla + sky
      E.cam(ctx, E.camLerp({ x: 930, y: 560, z: 1.07 }, { x: 960, y: 520, z: 1.12 }, cz));
      const g = ctx.createRadialGradient(1500, 290, 50, 1500, 290, 900); g.addColorStop(0, 'rgba(227,160,58,0.3)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      P.sun(ctx, 1500, 290, 115, t, { nrays: 22 });
      P.landscape(ctx, E.W, E.H, t, { hill });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      // poses
      let arms = [[-1, 0.35], [1, 0.35]], look = [0, 0.1], expr = 'neutral', lean = 0;
      if (t < sq) { const k = E.se(t, s0 + 0.6, s0 + 1.4); arms = [[-1, 0.35], [1, 0.35 + k * 1.95]]; look = t > s0 + 3.5 && t < s0 + 5.6 ? [0.7, -0.5] : [0.15, 0.05]; }
      else if (t < ss) { arms = [[-1, 0.3], [1, [30, -86]]]; expr = 'thinking'; look = [-0.5, -0.7]; lean = Math.sin(t * 1.2) * 0.03; }
      else { const k = E.se(t, ss + 2.5, ss + 3.4, 'back'); arms = [[-1, 0.3 + k * 0.1], [1, 0.35 + k * 1.75]]; expr = 'determined'; look = [0.3, -0.1]; }
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr, look, blink: E.blink(t, 3), squash: E.breath(t), arms, lean, t, talk: E.talk(t), seed: 1, prop: t > ss + 2.5 ? 'lens' : null, propTilt: -0.5 });

      // question bubbles
      const Q = [
        { at: sq + 2.1, x: 440, y: 330, w: 0, h: 150, txt: 'Neden bu kadar sıcak?', ic: thermo, tail: [720, 560] },
        { at: sq + 4.6, x: 1130, y: 200, w: 0, h: 140, txt: 'Ne kadar büyük?', ic: ruler, tail: [900, 540] },
        { at: sq + 6.7, x: 1330, y: 650, w: 0, h: 140, txt: 'O da döner mi?', ic: spin, tail: [940, 660] }
      ];
      Q.forEach((q, i) => {
        const k = E.se(t, q.at, q.at + 0.55, 'out'); if (k <= 0) return;
        const shrink = E.se(t, ss + 1.5, ss + 2.8); // later they drift aside, smaller
        ctx.save(); ctx.font = '700 40px Kalam'; q.w = ctx.measureText(q.txt).width + 190; ctx.globalAlpha = 1 - 0.45 * shrink;
        P.bubble(ctx, q.x, q.y, q.w, q.h, q.tail, k, 3 + i);
        if (k > 0.6) {
          q.ic(ctx, q.x - q.w / 2 + 70, q.y + 4, t);
          P.write(ctx, q.txt, q.x - q.w / 2 + 125, q.y + 14, E.seg(t, q.at + 0.3, q.at + 1.3), { size: 40 });
        }
        ctx.restore();
      });
      // big question mark drawn in ink
      if (t > sq + 0.3) { const k = E.se(t, sq + 0.3, sq + 1.4); ctx.save(); ctx.globalAlpha = 0.9 - 0.5 * E.se(t, ss, ss + 1); P.drawOn(ctx, P.arc(820, 180, 34, Math.PI * 1.1, Math.PI * 2.45, 30).concat([[832, 238], [822, 262]]), k, { w: 9 }); if (k > 0.95) INK.inkDot(ctx, 822, 290, 7); ctx.restore(); }
      ctx.restore();
    }
  });
})();

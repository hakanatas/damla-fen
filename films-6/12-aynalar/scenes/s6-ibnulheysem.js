// SAHNE 6 — İbnülheysem: düz ve küresel aynalarla deneyler, yansıma kanununun geometrik kanıtı (D19.2)
// Portre çizilmez; el yazması sayfa + geometrik şema (açılar hesaplanır).
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F612, V = F.V, DEG = Math.PI / 180;

  E.scene({
    name: 'İbnülheysem', concept: 'Bilim tarihi: yansıma kanunu', from: 'ibn', to: 'ibn2', trFrom: [960, 520],
    draw(ctx, t) {
      const si = E.s('ibn'), s2 = E.s('ibn2');
      // el yazması sayfa
      const pg = [[330, 190], [1590, 180], [1600, 860], [340, 872], [330, 190]];
      ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.3)'; ctx.shadowBlur = 26; P.fillPts(ctx, pg, '#F3E3BE'); ctx.restore();
      wash(ctx, pg, '#C9A56A', 0.22, 1401, { bleed: 2, blooms: 3 });
      stroke(ctx, pg, { w: 3, closed: true, seed: 1402 });
      // süsleme çizgileri
      stroke(ctx, [[380, 230], [1550, 222], [1556, 822], [386, 830], [380, 230]], { w: 1.6, closed: true, color: '#8A4A10', seed: 1403, dry: false });
      P.write(ctx, 'İbnülheysem', 440, 320, E.seg(t, si + 0.4, si + 1.6), { size: 70, color: '#8A4A10' });
      P.write(ctx, '(yaklaşık 965 – 1040)', 440, 380, E.seg(t, si + 1.4, si + 2.4), { size: 36 });
      P.write(ctx, 'düz ve küresel aynalarla deneyler', 440, 470, E.seg(t, si + 2.6, si + 4.0), { size: 40 });
      P.write(ctx, 'Kitâbü’l-Menâzır (Optik Kitabı)', 440, 780, E.seg(t, s2 + 2.0, s2 + 3.4), { size: 40, color: '#8A4A10' });
      // şema 1: düz ayna, eşit açılar (hesaplanır)
      const O = [700, 700], N = [0, -1], th = 38 * DEG, L = 200;
      const S = [O[0] - L * Math.sin(th), O[1] - L * Math.cos(th)], D = V.norm(V.sub(O, S)), RF = V.reflect(D, N), Q = V.add(O, V.mul(RF, L));
      const k1 = E.se(t, s2 + 0.2, s2 + 1.2);
      if (k1 > 0) { ctx.save(); ctx.globalAlpha *= k1;
        line(ctx, [520, O[1]], [880, O[1]], { w: 4, color: '#5B6B75', seed: 1410 });
        F.ray(ctx, S, O, 1, { w: 2.6, head: 12, seed: 1411 }); F.ray(ctx, O, Q, 1, { w: 2.6, head: 12, seed: 1412 });
        const np = []; for (let i = 0; i <= 20; i++) np.push([O[0], O[1] - 200 * i / 20]); dashed(ctx, np, { w: 2, on: 9, off: 7, color: PAL.water });
        F.angleArc(ctx, O, N, V.norm(V.sub(S, O)), 70, { fill: PAL.water, fillA: 0.2, color: PAL.water, w: 2.2 });
        F.angleArc(ctx, O, N, RF, 70, { fill: PAL.light, fillA: 0.3, color: '#8A4A10', w: 2.2 });
        INK.label(ctx, '=', O[0], O[1] - 90, { size: 40, weight: 700, align: 'center' });
        ctx.restore(); }
      // şema 2: küresel ayna kesiti
      const k2 = E.se(t, si + 4.0, si + 5.0);
      if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2;
        F.arcMirror(ctx, [1000, 560], 300, -0.5, 0.5, 'concave', { seed: 1420 });
        F.arcMirror(ctx, [1760, 560], 300, Math.PI - 0.5, Math.PI + 0.5, 'convex', { seed: 1421 });
        INK.label(ctx, 'küresel aynalar', 1380, 790, { size: 34, align: 'center', alpha: 0.8 });
        ctx.restore(); }
      DAMLA.draw(ctx, { x: 1740, y: 905, s: 0.8, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 6, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4]] });
    }
  });
})();

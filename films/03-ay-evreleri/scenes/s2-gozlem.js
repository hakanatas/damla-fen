// SAHNE 2 — Gözlem planı (ortam, zaman, süre) ve bir aylık gözlem defteri (performans görevi örneği)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const SYN = 29.53;
  const PLAN = [['Nerede?', 'açık bir alanda'], ['Kiminle?', 'bir yetişkinle'], ['Ne zaman?', 'Ay’ın göründüğü saatlerde'], ['Ne kadar?', 'yaklaşık bir ay']];
  const DAYS = [1, 5, 9, 13, 17, 21, 25, 29];   // gözlem günleri; Ay'ın yaşı = gün + 1
  E.scene({
    name: 'Gözlem', concept: 'Gözlem planı ve gözlem defteri', from: 'plan', to: 'diary', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('plan'), sd = E.s('diary');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      const A = 1 - E.se(t, sd - 0.2, sd + 0.5);
      if (A > 0) E.layer(ctx, A, c => {
        P.write(c, 'Gözlem Planı', 290, 215, E.seg(t, sp + 0.2, sp + 1.2), { size: 62 });
        PLAN.forEach(([a, b], i) => {
          const at = sp + 1.2 + i * 1.4, y = 340 + i * 120;
          P.write(c, a, 300, y, E.seg(t, at, at + 0.5), { size: 48, color: PAL.water });
          P.write(c, b, 640, y, E.seg(t, at + 0.4, at + 1.4), { size: 48 });
        });
        P.icon.calendar(c, 1450, 520, 1.3, '30');
        P.icon.eye(c, 1450, 330, 0.6);
      });
      const B = E.se(t, sd - 0.1, sd + 0.6);
      if (B > 0) E.layer(ctx, B, c => {
        P.write(c, 'Gözlem Defterim · Ay', 290, 215, E.seg(t, sd + 0.1, sd + 1.1), { size: 62 });
        DAYS.forEach((d, i) => {
          const col = i % 4, row = (i / 4) | 0, x = 400 + col * 330, y = 390 + row * 290;
          const k = E.se(t, sd + 0.8 + i * 0.7, sd + 1.3 + i * 0.7, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k;
          const fr = [[x - 140, y - 110], [x + 140, y - 112], [x + 142, y + 120], [x - 138, y + 122], [x - 140, y - 110]];
          P.fillPts(c, fr, '#262A40', 0.9); stroke(c, fr, { w: 2.2, closed: true, seed: 40 + i });
          const age = d + 1, e = (age / SYN) * 6.2832;
          if (age < SYN - 0.8) F03.phaseMoon(c, x, y - 10, 62, e, { alpha: 0.92 });
          else { c.save(); c.globalAlpha *= 0.8; dashed(c, circlePts(x, y - 10, 62, 62, 50), { w: 2, on: 8, off: 7, color: '#FBF3DC' }); c.restore(); INK.label(c, 'görünmedi', x, y + 5, { size: 28, align: 'center', color: '#FBF3DC' }); }
          c.restore();
          INK.label(c, d + '. gün', x, y + 165, { size: 36, weight: 700, align: 'center', alpha: k });
        });
      });
      DAMLA.draw(ctx, { x: 1690, y: 1045, s: 1.0, view: 'q3', flip: true, expr: t > sd + 6 ? 'surprised' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

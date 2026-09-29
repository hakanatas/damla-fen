// SAHNE 3 — Büyüklük (az/çok kuvvet → uzun/kısa ok) ve yön (okun ucu) + "ne kadar?" sorusu
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const BR = '#8A4A10';
  function lane(ctx, t, y, at, arrowLen, dist, lab, i) {
    const k = E.se(t, at, at + 0.6); if (k <= 0) return;
    ctx.save(); ctx.globalAlpha = k;
    stroke(ctx, [[100, y], [1800, y + 2]], { w: 3, seed: 2100 + i, taper: 0.02 });
    const m = E.se(t, at + 1.4, at + 3.4, 'out');
    const x0 = 360, cx = x0 + dist * m;
    F05.car(ctx, cx, y, 0.95, t, dist * m);
    // push arrow (appears, then fades as the car leaves)
    const ak = E.se(t, at + 0.5, at + 1.3);
    if (ak > 0) P.arrow(ctx, [x0 - 95 - arrowLen - 10, y - 50], [x0 - 100, y - 50], ak, { w: 3 + arrowLen / 40, head: 12 + arrowLen / 14, color: BR });
    P.write(ctx, lab, 110, y - 150, E.seg(t, at + 0.4, at + 1.4), { size: 44 });
    if (m > 0.98) { ctx.save(); dashed(ctx, [[x0, y + 30], [cx, y + 30]], { w: 2, on: 10, off: 8 }); ctx.restore(); }
    ctx.restore();
  }
  E.scene({
    name: 'Büyüklük ve yön', concept: 'Kuvvetin büyüklüğü ve yönü', from: 'size', to: 'howmuch', trFrom: [300, 600],
    draw(ctx, t) {
      const ss = E.s('size'), sd = E.s('dir'), sh = E.s('howmuch');
      ctx.fillStyle = 'rgba(46,106,140,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const aD = E.se(t, sd - 0.3, sd + 0.5), aH = E.se(t, sh - 0.3, sh + 0.5);
      if (aD < 1) E.layer(ctx, 1 - aD, c => {
        lane(c, t, 440, ss + 0.2, 70, 260, 'hafifçe itiyorum → az kuvvet', 0);
        lane(c, t, 780, ss + 3.2, 230, 980, 'güçlüce itiyorum → çok kuvvet', 1);
        E.inkText(c, 'uzun ok = büyük kuvvet', 1450, 620, t, ss + 6.6, 1e9, { size: 46, align: 'center', color: BR });
      });
      if (aD > 0 && aH < 1) E.layer(ctx, Math.min(aD, 1 - aH), c => {
        const y = 700; stroke(c, [[100, y], [1800, y + 2]], { w: 3, seed: 2150, taper: 0.02 });
        const m1 = E.se(t, sd + 1.2, sd + 2.6, 'out'), m2 = E.se(t, sd + 4.0, sd + 5.6, 'out');
        const cx = 960 + 260 * m1 - 520 * m2;
        F05.car(c, cx, y, 1, t, 260 * m1 - 520 * m2);
        const a1 = E.se(t, sd + 0.4, sd + 1.1) * (1 - E.se(t, sd + 3.0, sd + 3.4));
        if (a1 > 0) { P.arrow(c, [cx - 290, y - 50], [cx - 105, y - 50], a1, { w: 6, head: 22, color: BR }); INK.label(c, 'sağa itme', cx - 200, y - 90, { size: 40, weight: 700, align: 'center', alpha: a1, color: BR }); }
        const a2 = E.se(t, sd + 3.3, sd + 3.9) * (1 - E.se(t, sd + 6.2, sd + 6.6));
        if (a2 > 0) {
          line(c, [cx - 94, y - 50], [cx - 150, y - 50], { w: 2, dry: false, alpha: a2 });
          P.arrow(c, [cx - 110, y - 50], [cx - 300, y - 50], a2, { w: 6, head: 22, color: BR }); INK.label(c, 'sola çekme', cx - 200, y - 90, { size: 40, weight: 700, align: 'center', alpha: a2, color: BR });
        }
        // arrow anatomy card
        const ck = E.se(t, sd + 5.8, sd + 6.6, 'out');
        if (ck > 0) {
          c.save(); c.translate(960, 330); c.scale(P.pop(ck), P.pop(ck));
          F05.card(c, -380, -130, 380, 130, { seed: 2160 });
          P.arrow(c, [-280, 10], [180, 10], 1, { w: 7, head: 28, color: BR });
          stroke(c, INK.wobble(circlePts(176, 10, 46, 46, 30), 2, 2161), { w: 3, closed: true, color: PAL.light });
          INK.label(c, 'okun ucu → yön', 180, 100, { size: 40, weight: 700, align: 'center' });
          INK.label(c, 'okun boyu → büyüklük', -110, -40, { size: 40, weight: 700, align: 'center' });
          c.restore();
        }
      });
      if (aH > 0) E.layer(ctx, aH, c => {
        // two arrows with question marks
        P.arrow(c, [300, 380], [520, 380], E.se(t, sh + 0.4, sh + 1.0), { w: 5, head: 18, color: BR });
        P.arrow(c, [300, 560], [800, 560], E.se(t, sh + 0.8, sh + 1.6), { w: 8, head: 26, color: BR });
        E.inkText(c, 'az = ?', 600, 395, t, sh + 1.2, 1e9, { size: 56 });
        E.inkText(c, 'çok = ?', 880, 580, t, sh + 1.6, 1e9, { size: 56 });
        E.inkText(c, 'Tahmin yetmez → ÖLÇ!', 620, 780, t, sh + 3.4, 1e9, { size: 70, align: 'center', color: BR });
        DAMLA.draw(c, { x: 1450, y: 880, s: 1.4, view: 'q3', flip: true, expr: t > sh + 3.4 ? 'determined' : 'thinking', look: [-0.7, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 3,
          arms: t > sh + 3.4 ? [[-1, 0.4], [1, 2.6]] : [[-1, 0.3], [1, [30, -86]]] });
      });
      // Damla observer in size/dir phases
      if (aH < 1) E.layer(ctx, 1 - aH, c => DAMLA.draw(c, { x: 1720, y: 1010, s: 0.9, view: 'q3', flip: true, expr: 'curious', look: [-0.9, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.4], [1, 2.3]] }));
    }
  });
})();

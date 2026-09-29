// SAHNE 1 — Soru: "Hareketi zorlaştıran veya kolaylaştıran etkiler var mıdır?" (TYMM açılış sorusu)
(function () {
  const { PAL, line, stroke } = INK;
  const BR = '#8A4A10', FY = 840;
  E.scene({
    name: 'Soru', concept: 'Hareketi ne durdurur?', from: 'title', to: 'slide',
    draw(ctx, t) {
      const sh = E.s('hello'), ss = E.s('slide');
      ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, FY); ctx.restore();
      F08.floor(ctx, FY, 1);
      const push = E.se(t, ss + 0.3, ss + 1.0), u = E.seg(t, ss + 1.0, ss + 4.2), slide = 1 - (1 - u) * (1 - u);
      const bx = 700 + 60 * push + 560 * slide;
      F08.box(ctx, bx, FY);
      if (u > 0.02 && u < 0.97) { for (let i = 0; i < 3; i++) line(ctx, [bx - 30 - i * 30, FY - 40 - i * 30], [bx - 90 - i * 30, FY - 40 - i * 30], { w: 2, dry: false, alpha: 0.5 }); }
      if (u > 0.02) { const k = E.se(t, ss + 1.2, ss + 1.8); INK.stroke(ctx, INK.circlePts(bx + 90, FY + 2, 110, 16, 30), { w: 3, closed: true, color: PAL.light, alpha: k * (u < 0.98 ? 1 : 1) }); }
      if (u >= 1) E.inkText(ctx, '?', bx + 90, FY - 190, t, ss + 4.3, 1e9, { size: 120, align: 'center', color: BR });
      E.inkText(ctx, 'Onu ne durdurdu?', 960, 260, t, ss + 4.6, 1e9, { size: 70, align: 'center' });
      const dx = 520 + 150 * push * (1 - E.se(t, ss + 1.4, ss + 2.2));
      DAMLA.draw(ctx, { x: dx, y: FY, s: 1.4, view: t < ss ? 'front' : 'q3', expr: t < 1.2 ? 'neutral' : (t < ss ? 'happy' : (t < ss + 4 ? 'determined' : 'curious')), look: t < ss ? [0, 0] : [0.8, 0.1], blink: t < 1.2 ? 1 : E.blink(t, 2), squash: E.breath(t), t, seed: 1, lean: 0.14 * push * (1 - E.seg(t, ss + 1.0, ss + 1.6)),
        arms: t > sh && t < ss ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : (t >= ss && t < ss + 1.4 ? [[-1, [80, -110]], [1, [96, -118]]] : [[-1, 0.4], [1, 0.4]]) });
      F08.title(ctx, t, 8, 'Sürtünme Kuvveti', 2);
    }
  });
})();

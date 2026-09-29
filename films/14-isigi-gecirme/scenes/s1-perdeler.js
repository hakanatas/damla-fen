// SAHNE 1 — Perdeler: tül kapanınca oda aydınlık kalır, kalın perde kapanınca kararır
// (TYMM köprü kurma: evlerde farklı perde türlerinin gece/gündüz kullanımı)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F14;
  const WX0 = 600, WX1 = 1320, WY0 = 170, WY1 = 700, FLOOR = 820;

  function tulPts(x0, x1) { const p = []; for (let i = 0; i <= 30; i++) { const u = i / 30; p.push([x0 + (x1 - x0) * u + Math.sin(u * 20) * 6, WY0 - 30]); } return p.concat([[x1, WY1 + 40], [x0, WY1 + 40]]); }

  E.scene({
    name: 'Perdeler', concept: 'Perdeler ışığı farklı geçirir', from: 'title', to: 'why',
    draw(ctx, t) {
      const sc = E.s('curtain'), sw = E.s('why');
      const kt = E.se(t, sc + 0.3, sc + 2.0), kp = E.se(t, sc + 3.6, sc + 5.4);
      const light = 1 - 0.35 * kt - 0.65 * kp;
      // outside: sky + tree, sunlight from upper left
      const win = [[WX0, WY0], [WX1, WY0], [WX1, WY1], [WX0, WY1]];
      P.fillPts(ctx, win, '#CFE3EC'); wash(ctx, win, '#9CC4D6', 0.4, 11, { bleed: 2 });
      F.glow(ctx, WX0 + 60, WY0 + 40, 380, 1);
      P.fillPts(ctx, [[WX0, 600], [WX1, 580], [WX1, WY1], [WX0, WY1]], '#B9C58F', 0.9);
      line(ctx, [1150, 600], [1156, 470], { w: 8, seed: 12 }); const cr = INK.wobble(circlePts(1160, 430, 80, 64, 40), 6, 13); wash(ctx, cr, PAL.life, 0.5, 14); stroke(ctx, cr, { w: 3, closed: true, seed: 15 });
      // window frame
      stroke(ctx, win.concat([win[0]]), { w: 6, closed: true, seed: 16 });
      line(ctx, [(WX0 + WX1) / 2, WY0], [(WX0 + WX1) / 2, WY1], { w: 5, seed: 17 }); line(ctx, [WX0, 430], [WX1, 430], { w: 5, seed: 18 });
      P.fillPts(ctx, [[WX0 - 40, WY1], [WX1 + 40, WY1], [WX1 + 50, WY1 + 26], [WX0 - 50, WY1 + 26]], '#E6DCC6'); stroke(ctx, [[WX0 - 40, WY1], [WX1 + 40, WY1], [WX1 + 50, WY1 + 26], [WX0 - 50, WY1 + 26], [WX0 - 40, WY1]], { w: 2.6, closed: true });
      // walls/floor
      stroke(ctx, [[-20, FLOOR], [1940, FLOOR - 4]], { w: 3, seed: 19 });
      P.fillPts(ctx, [[-20, FLOOR], [1940, FLOOR - 4], [1940, 1100], [-20, 1100]], '#D9C8A6', 0.5);
      // sunlight patch on the floor (through window)
      if (light > 0.02) {
        const patch = [[WX0 + 300, FLOOR + 10], [WX1 + 380, FLOOR + 6], [WX1 + 520, 1060], [WX0 + 380, 1060]];
        ctx.save(); ctx.globalCompositeOperation = 'lighter'; P.fillPts(ctx, patch, 'rgba(240,180,80,1)', 0.28 * light); ctx.restore();
        const n = 6; for (let i = 0; i < n; i++) { const x = WX0 + 90 + i * 110; const a = [x, WY0 + 60 + (i % 2) * 90]; F.ray(ctx, a, [a[0] + 380, a[1] + 380], 1, { w: 2.6, head: 12, heads: [0.55], alpha: light * 0.8, seed: 20 + i }); }
      }
      // curtains: tül from the left, thick from the right
      line(ctx, [WX0 - 80, WY0 - 34], [WX1 + 80, WY0 - 34], { w: 6, seed: 25 });
      if (kt > 0) { const tp = tulPts(WX0 - 40, WX0 - 40 + (WX1 - WX0 + 80) * kt); P.fillPts(ctx, tp, 'rgba(250,248,242,0.62)'); for (let i = 0; i < 14 * kt; i++) stroke(ctx, P.bez([WX0 - 30 + i * 55, WY0 - 28], [WX0 - 20 + i * 55, 400], [WX0 - 30 + i * 55, WY1 + 38], 12), { w: 1.3, alpha: 0.35, dry: false, seed: 30 + i }); stroke(ctx, tp, { w: 2, closed: true, alpha: 0.6, dry: false }); }
      else { const tp = tulPts(WX0 - 90, WX0 - 30); P.fillPts(ctx, tp, 'rgba(250,248,242,0.8)'); stroke(ctx, tp, { w: 2, closed: true, alpha: 0.6 }); }
      const px0 = WX1 + 40 - (WX1 - WX0 + 80) * kp, pc = [[px0, WY0 - 30], [WX1 + 90, WY0 - 30], [WX1 + 90, WY1 + 40], [px0, WY1 + 40]];
      P.fillPts(ctx, pc, '#4E6B38', 0.95); wash(ctx, pc, '#3A5230', 0.4, 40, { bleed: 2, blooms: 1 });
      for (let i = 0; i < 6; i++) line(ctx, [px0 + 30 + i * (WX1 + 60 - px0) / 6, WY0 - 20], [px0 + 36 + i * (WX1 + 60 - px0) / 6, WY1 + 30], { w: 1.6, alpha: 0.35, dry: false, seed: 41 + i });
      stroke(ctx, pc.concat([pc[0]]), { w: 3, closed: true, seed: 42 });
      // labels
      P.write(ctx, 'tül', WX0 + 120, WY1 + 110, E.seg(t, sc + 1.6, sc + 2.4), { size: 44, align: 'center' });
      P.write(ctx, 'kalın perde', WX1 - 60, WY1 + 110, E.seg(t, sc + 4.8, sc + 5.8), { size: 44, align: 'center', color: t > sc + 4 ? PAL.white : PAL.ink });
      // room darkness
      F.dark(ctx, 0.55 * (1 - light));
      // Damla
      const think = t > sw;
      DAMLA.draw(ctx, { x: 1620, y: FLOOR + 60, s: 1.4, view: 'q3', flip: true, expr: think ? 'thinking' : (kp > 0.5 ? 'surprised' : 'happy'), look: [-0.7, -0.2], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1,
        arms: think ? [[-1, 0.3], [1, [30, -86]]] : (t < E.s('curtain') ? [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] : [[-1, 0.35], [1, 1.4]]) });
      if (think) {
        const k = E.se(t, sw + 0.6, sw + 1.6);
        ctx.save(); ctx.globalAlpha = k; P.fillPts(ctx, [[560, 360], [1360, 352], [1366, 470], [566, 478]], '#FBF8F1', 0.94); stroke(ctx, [[560, 360], [1360, 352], [1366, 470], [566, 478], [560, 360]], { w: 3, closed: true, color: F.AMB }); ctx.restore();
        P.write(ctx, 'Maddeler ışığı farklı geçirir.', 963, 432, E.seg(t, sw + 1.2, sw + 2.6), { size: 56, align: 'center' });
      }
      // title
      const t1 = E.e('title') + 1.2;
      if (t < t1) { ctx.save(); ctx.globalAlpha = 0.85 * Math.min(E.se(t, 0.2, 0.9), 1 - E.se(t, t1 - 0.6, t1)); P.fillPts(ctx, [[380, 50], [1540, 44], [1546, 330], [386, 336]], '#F1EADB'); ctx.restore(); }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 150, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '14 · Işık Geçer mi?', 960, 235, t, 1.2, t1, { size: 58, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 4', 960, 292, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 175], [960, 185], [1280, 171], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();

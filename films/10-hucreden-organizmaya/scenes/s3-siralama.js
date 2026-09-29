// SAHNE 3 — Hiyerarşik ilişki: basamaklar + yanlış bir ifadenin düzeltilmesi
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const RED = '#A23A2A';
  const NAMES = ['hücre', 'doku', 'organ', 'sistem', 'organizma'];
  F10.icons = (ctx, i, x, y, s, t) => { // small level icons centered at (x,y)
    const F = F10;
    if (i === 0) F.muscleCell(ctx, x, y, 120 * s, 32 * s, 0, 301, { w: 2 });
    else if (i === 1) F.tissue(ctx, x, y, 150 * s, 100 * s, 1, 7, { L: 70 * s, T: 20 * s });
    else if (i === 2) F.heart(ctx, x, y + 8 * s, 0.33 * s, t);
    else if (i === 3) F.kid(ctx, x, y + 70 * s, 0.34 * s, { xray: 1, t });
    else F.kid(ctx, x, y + 70 * s, 0.34 * s, { t });
  };
  E.scene({
    name: 'Sıralama', concept: 'Hiyerarşik ilişki', from: 'ladder', to: 'fix', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F10, sl = E.s('ladder'), sw = E.s('wrong'), sf = E.s('fix');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      const FL = 660;
      NAMES.forEach((n, i) => {
        const at = sl + 0.4 + i * 1.3, k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        const x0 = 290 + i * 290, top = FL - 70 - i * 70;
        const st = [[x0, FL], [x0, top], [x0 + 270, top - 2], [x0 + 270, FL], [x0, FL]];
        ctx.save(); ctx.globalAlpha *= k;
        P.fillPts(ctx, st, i === 4 ? '#DCE4BE' : '#F3ECDD'); wash(ctx, st, PAL.life, 0.12 + i * 0.07, 400 + i, { bleed: 1, blooms: 0 }); stroke(ctx, st, { w: 2.6, closed: true, seed: 410 + i });
        ctx.restore();
        P.write(ctx, n, x0 + 135, top + 52, k, { size: 44, align: 'center', color: '#3E5A1A' });
        ctx.save(); ctx.globalAlpha *= k; F.icons(ctx, i, x0 + 135, top - (i > 2 ? 85 : 70), i > 2 ? 1.35 : 1.15, t); ctx.restore();
        if (i > 0) { const ka = E.se(t, at + 0.3, at + 0.9); P.arrow(ctx, [x0 - 150, top - 40 + 70 * 0], [x0 - 20, top - 60], ka, { w: 2.4, head: 11, bend: 30, color: '#8A4A10' }); }
      });
      P.write(ctx, 'Her basamak, öncekilerden oluşur.', 960, 718, E.se(t, sl + 7, sl + 8.4), { size: 46, align: 'center' });
      // wrong statement + correction
      const kw = E.se(t, sw + 0.2, sw + 0.9, 'out');
      if (kw > 0) {
        const fadeLine = 1;
        ctx.save(); ctx.translate(700, 830); ctx.rotate(-0.03); ctx.scale(P.pop(kw), P.pop(kw));
        const note = [[-330, -62], [330, -66], [334, 62], [-326, 66], [-330, -62]];
        P.fillPts(ctx, note, '#F6E7B8', 0.97); stroke(ctx, note, { w: 2.4, closed: true, seed: 61 });
        ctx.font = '700 44px Kalam'; ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.fillText('“Organ, dokudan küçüktür.”', 0, 14);
        ctx.restore();
        P.cross(ctx, 700, 830, 90, E.se(t, sf + 0.3, sf + 1.0), { w: 12, color: RED });
        if (t > sf + 1) INK.label(ctx, 'YANLIŞ', 1070, 800, { size: 48, weight: 700, color: RED, alpha: E.se(t, sf + 1, sf + 1.6), rot: -0.08 });
        P.write(ctx, 'Organ, dokulardan oluşur.', 1130, 868, E.se(t, sf + 2.4, sf + 3.6), { size: 44, color: '#3E5A1A' });
        P.check(ctx, 1090, 848, 56, E.se(t, sf + 3.6, sf + 4.2), { w: 6, color: '#3E5A1A' });
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > sf + 1 ? 'happy' : (t > sw ? 'thinking' : 'neutral'), look: [-0.7, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

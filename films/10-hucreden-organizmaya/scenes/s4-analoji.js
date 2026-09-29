// SAHNE 4 — Analoji: ev, mahalle, ilçe, il, ülke (TYMM örneği)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const PL = ['ev', 'mahalle', 'ilçe', 'il', 'ülke'];
  const XS = [330, 650, 970, 1290, 1610];
  function place(ctx, i, x, y, t) {
    const F = F10;
    if (i === 0) F.house(ctx, x, y + 50, 1.2, 3);
    else if (i === 1) F.neighborhood(ctx, x, y + 10, 0.72, 2);
    else if (i === 2) F.district(ctx, x, y, 0.85, 5);
    else if (i === 3) { F.region(ctx, x, y, 120, 95, 610, { cuts: 3, col: '#C08A3A', a: 0.3 }); INK.inkDot(ctx, x + 10, y - 5, 7); }
    else { F.region(ctx, x, y, 150, 90, 620, { cuts: 7, amp: 0.1 }); }
  }
  E.scene({
    name: 'Analoji', concept: 'Ev · mahalle · ilçe · il · ülke', from: 'analogy', to: 'match', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F10, sa = E.s('analogy'), sp = E.s('places'), sm = E.s('match');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const up = E.se(t, sm, sm + 1.2);
      const py = E.lerp(560, 690, up);
      P.write(ctx, 'Yaşadığımız yerler', 960, E.lerp(260, 900 - 40, 0) , E.se(t, sa + 0.4, sa + 1.6) * (1 - up), { size: 60, align: 'center' });
      PL.forEach((n, i) => {
        const at = sa + 2.0 + i * 1.9, k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(XS[i], py); ctx.scale(P.pop(k) * E.lerp(1, 0.8, up), P.pop(k) * E.lerp(1, 0.8, up)); ctx.translate(-XS[i], -py);
        place(ctx, i, XS[i], py, t); ctx.restore();
        P.write(ctx, n, XS[i], py + E.lerp(170, 140, up), k, { size: 48, align: 'center', color: '#8A4A10' });
        if (i > 0) P.arrow(ctx, [XS[i - 1] + 110, py + E.lerp(170, 140, up) - 14], [XS[i] - 90, py + E.lerp(170, 140, up) - 14], E.se(t, at, at + 0.6), { w: 2.4, head: 11, color: '#8A4A10' });
      });
      // body row + matches
      if (up > 0) {
        PL.forEach((n, i) => {
          const at = sm + 0.8 + i * 1.2, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const y = 300;
          ctx.save(); ctx.globalAlpha *= k; F10.icons(ctx, i, XS[i], y - 20, 1.1, t); ctx.restore();
          P.write(ctx, ['hücre', 'doku', 'organ', 'sistem', 'organizma'][i], XS[i], y + 110, k, { size: 46, align: 'center', color: '#3E5A1A' });
          INK.label(ctx, '≈', XS[i], 520, { size: 70, weight: 700, align: 'center', alpha: E.se(t, at + 0.3, at + 0.8) });
        });
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.7, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

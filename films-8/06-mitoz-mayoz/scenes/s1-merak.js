// SAHNE 1 — Merak (köprü kurma: yaranın iyileşmesi) · beyin fırtınası: büyüme, onarım, üreme · iki bölünme çeşidi
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = G8;
  const LX = 1130, LY = 500, LR = 330;
  const GAP = [3, 4, 5];
  function skin(c, t) {
    const sw = E.s('wound');
    wash(c, circlePts(LX, LY, LR, LR, 60), '#E9C9B0', 0.3, 2000, { bleed: 2, blooms: 1 });
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) {
      const x = LX - 4 * 96 + i * 96 + (r % 2 ? 48 : 0), y = LY - 150 + r * 100;
      const gap = r === 0 && GAP.includes(i);
      let k = 1;
      if (gap) { const at = sw + 3.2 + GAP.indexOf(i) * 1.0; k = P.pop(E.seg(t, at, at + 0.8)); if (k <= 0) continue; }
      const cb = K.blob(x, y, 44 * k, 42 * k, 2100 + r * 20 + i, 0.06, 30);
      P.fillPts(c, cb, '#FBF1E8'); wash(c, cb, F.CELL, gap ? 0.55 : 0.35, 2200 + r * 20 + i, { bleed: 0.8, blooms: 0 }); stroke(c, cb, { w: 2.2, closed: true, dry: false, seed: 2300 + i });
      INK.inkDot(c, x, y, 8 * k, { color: '142,106,140', alpha: 0.8 });
    }
    // yara boşluğu
    const fill = E.se(t, sw + 3.0, sw + 6.2);
    if (fill < 1) { c.save(); c.globalAlpha *= 1 - fill; const wb = K.blob(LX, LY - 150, 160, 44, 2400, 0.1, 40); wash(c, wb, '#B5553F', 0.35, 2401, { bleed: 2, blooms: 1 }); c.restore(); }
  }
  function chip(c, i, x, y, t, txt) {
    K.card(c, x - 150, y - 150, 300, 300, { seed: 2500 + i, tint: PAL.life, tintA: 0.08 });
    if (i === 0) { F.plant(c, x - 60, y + 90, 90, 1); F.plant(c, x + 40, y + 90, 190, 2); P.arrow(c, [x - 40, y + 30], [x + 10, y - 20], 1, { w: 2.2, head: 10 }); }
    if (i === 1) { c.save(); c.translate(x, y); c.rotate(-0.4); const b = K.rrect(0, 0, 220, 70, 30); P.fillPts(c, b, '#F1D9C0'); stroke(c, b, { w: 2.6, closed: true }); const p = K.rrect(0, 0, 80, 56, 10); P.fillPts(c, p, PAL.white); for (let a = -2; a <= 2; a++) INK.inkDot(c, a * 14, 0, 2.4); c.restore(); }
    if (i === 2) { const d = 30 + 12 * Math.sin(t * 2); [-1, 1].forEach(s => F.cell(c, x + s * d, y - 10, 62, 58, { nuc: true, nr: 26, seed: 2600 + (s > 0 ? 5 : 0), lw: 2 })); }
    K.text(c, txt, x, y + 128, { size: 40, align: 'center', color: K.LIFE_D });
  }
  E.scene({
    name: 'Merak', concept: 'Yara neden kapanır? Hücre bölünmesi', from: 'title', to: 'two',
    draw(ctx, t) {
      const sw = E.s('wound'), ss = E.s('storm'), s2 = E.s('two');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.06)'); g.addColorStop(1, 'rgba(111,138,58,0.16)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const lk = Math.min(E.se(t, sw + 0.8, sw + 1.8, 'out'), 1 - E.se(t, ss - 0.2, ss + 0.6));
      if (lk > 0) E.layer(ctx, lk, c => {
        const cp = circlePts(LX, LY, LR, LR, 80); P.fillPts(c, cp, '#FBF8F1');
        c.save(); P.path(c, cp); c.clip(); skin(c, t); c.restore();
        stroke(c, cp, { w: 5, closed: true, seed: 2700 }); line(c, [LX + LR * 0.72, LY + LR * 0.72], [LX + LR * 1.02, LY + LR * 1.02], { w: 12, taper: 0.02 });
        K.text(c, 'deri hücreleri (temsilî)', LX, LY + LR + 48, { size: 34, align: 'center', alpha: 0.7 });
        F.tag(c, 'yeni hücreler', [LX + 420, LY - 300], [LX + 40, LY - 205], E.se(t, sw + 5, sw + 5.8), { size: 42, align: 'left' });
      });
      const ck = E.se(t, ss + 0.3, ss + 1.0);
      if (ck > 0) E.layer(ctx, ck, c => {
        ['büyüme', 'onarım', 'üreme'].forEach((w, i) => { const k = E.se(t, ss + 0.6 + i * 1.2, ss + 1.3 + i * 1.2, 'out'); if (k > 0) E.layer(c, k, c2 => chip(c2, i, 790 + i * 380, 440, t, w)); });
        const hk = E.se(t, ss + 4.4, ss + 5.2);
        if (hk > 0) { c.save(); c.globalAlpha *= hk; K.text(c, 'Hepsinde hücreler bölünür.', 1170, 720, { size: 50, align: 'center' }); c.restore(); }
        const tk = E.se(t, s2 + 0.4, s2 + 1.2);
        if (tk > 0) { c.save(); c.globalAlpha *= tk; K.node(c, 'Mitoz', 950, 830, 1, { size: 52, nopop: true, tint: PAL.water, seed: 1 }); K.node(c, 'Mayoz', 1390, 830, 1, { size: 52, nopop: true, tint: PAL.light, seed: 2 }); K.text(c, '⟷', 1170, 846, { size: 56, align: 'center' }); c.restore(); }
      });
      K.damla(ctx, t, { x: 400, y: 880, s: 1.4, expr: t > ss ? 'happy' : 'curious', look: [0.7, -0.1], talk: E.talk(t), arms: [[-1, 0.4], [1, t > sw + 1 && t < ss ? 1.6 : 0.6]] });
      K.title(ctx, t, 6, 'Hücreler Bölünüyor: Mitoz ve Mayoz', 3);
    }
  });
})();

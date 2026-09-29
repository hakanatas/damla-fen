// SAHNE 6 — Cinsiyetin belirlenmesi: kadında XX, erkekte XY; yumurta hep X, sperm X ya da Y → cinsiyeti babadan gelen eşey kromozomu belirler (%50 – %50)
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT, F = G8;
  const XC = '#C07F1E', YC = PAL.water;
  function chip(c, txt, x, y, k, col) { if (k <= 0) return; c.save(); c.globalAlpha *= k; const cp = circlePts(x, y, 40, 40, 26); P.fillPts(c, cp, '#FBF8F1'); INK.wash(c, cp, col, 0.35, 3700 + x, { bleed: 0.5, blooms: 0 }); stroke(c, cp, { w: 2.4, closed: true, dry: false }); K.text(c, txt, x, y + 17, { size: 46, align: 'center' }); c.restore(); }
  E.scene({
    name: 'Cinsiyet', concept: 'Babadan gelen eşey kromozomu', from: 'sex1', to: 'sex3', trFrom: [960, 540],
    draw(ctx, t) {
      const s1 = E.s('sex1'), s3 = E.s('sex3');
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const pk = E.se(t, s1 + 0.3, s1 + 1.1);
      E.layer(ctx, pk, c => {
        K.card(c, 150, 190, 520, 300, { seed: 3710, tint: XC, tintA: 0.08 });
        K.text(c, 'Kadın: XX', 410, 260, { size: 46, align: 'center' });
        F.egg(c, 300, 390, 62); K.text(c, 'X', 300, 408, { size: 48, align: 'center' });
        K.text(c, 'yumurta: hep X', 520, 405, { size: 34, align: 'center', alpha: E.se(t, s1 + 4.5, s1 + 5.3) });
        K.card(c, 150, 540, 520, 330, { seed: 3720, tint: YC, tintA: 0.08 });
        K.text(c, 'Erkek: XY', 410, 610, { size: 46, align: 'center' });
        const sk = E.se(t, s1 + 5.5, s1 + 6.3);
        if (sk > 0) { c.save(); c.globalAlpha *= sk; F.sperm(c, 380, 700, 0.9, t, 'X'); F.sperm(c, 380, 800, 0.9, t + 0.3, 'Y'); K.text(c, 'sperm: X ya da Y', 540, 760, { size: 32, align: 'center' }); c.restore(); }
      });
      // tablo
      const tk = E.se(t, s1 + 7, s1 + 7.8);
      if (tk > 0) E.layer(ctx, tk, c => {
        const x = 820, y = 200, cs = 190;
        const grid = [[x + cs, y + cs], [x + 3 * cs, y + cs], [x + 3 * cs, y + 3 * cs], [x + cs, y + 3 * cs], [x + cs, y + cs]];
        P.fillPts(c, grid, '#FBF8F1', 0.9); stroke(c, grid, { w: 3, closed: true }); line(c, [x + 2 * cs, y + cs], [x + 2 * cs, y + 3 * cs], { w: 2.4, dry: false }); line(c, [x + cs, y + 2 * cs], [x + 3 * cs, y + 2 * cs], { w: 2.4, dry: false });
        chip(c, 'X', x + 1.5 * cs, y + 0.5 * cs, 1, YC); chip(c, 'Y', x + 2.5 * cs, y + 0.5 * cs, 1, YC);
        chip(c, 'X', x + 0.5 * cs, y + 1.5 * cs, 1, XC); chip(c, 'X', x + 0.5 * cs, y + 2.5 * cs, 1, XC);
        K.text(c, 'babadan (sperm)', x + 2 * cs, y - 10, { size: 32, align: 'center', alpha: 0.75 });
        K.text(c, 'anneden', x + 0.5 * cs, y + 3 * cs + 50, { size: 32, align: 'center', alpha: 0.75 });
        const R = [['XX', 'kız'], ['XY', 'erkek'], ['XX', 'kız'], ['XY', 'erkek']];
        R.forEach(([g, w], i) => { const cx = x + (1.5 + (i % 2)) * cs, cy = y + (1.5 + (i >> 1)) * cs, k = E.se(t, s1 + 8.2 + i * 0.5, s1 + 8.7 + i * 0.5); if (k <= 0) return; c.save(); c.globalAlpha *= k; K.text(c, g, cx, cy + 4, { size: 50, align: 'center', color: w === 'kız' ? '#8A4A10' : PAL.water }); K.text(c, w, cx, cy + 50, { size: 32, align: 'center', alpha: 0.75 }); c.restore(); });
      });
      const rk = E.se(t, s3 + 0.4, s3 + 1.2);
      if (rk > 0) E.layer(ctx, rk, c => {
        K.card(c, 1470, 260, 360, 460, { seed: 3730, tint: PAL.life, tintA: 0.08 });
        K.text(c, 'kız: 2/4', 1650, 360, { size: 44, align: 'center', color: '#8A4A10' });
        K.text(c, 'erkek: 2/4', 1650, 430, { size: 44, align: 'center', color: PAL.water });
        K.text(c, '%50 – %50', 1650, 520, { size: 52, align: 'center' });
        K.text(c, 'Belirleyen:', 1650, 590, { size: 32, align: 'center', alpha: 0.75 });
        K.text(c, 'babadan gelen', 1650, 632, { size: 34, align: 'center', color: K.LIFE_D });
        K.text(c, 'X ya da Y', 1650, 670, { size: 34, align: 'center', color: K.LIFE_D });
      });
    }
  });
})();

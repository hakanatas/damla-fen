// SAHNE 5 — Argümantasyon: çürüme ve yanmanın olumlu/olumsuz etkileri (E3.10)
(function () {
  const { PAL, stroke, line, circlePts, rng, wobble } = INK;
  const U = U5;
  const NEG = '#A0602A';   // olumsuz: koyu kehribar (kırmızı yalnızca güvenlik/YANLIŞ için)
  function tooth(c, x, y, s) {
    c.save(); c.translate(x, y); c.scale(s, s);
    const p = [[-40, -40], [-20, -52], [0, -44], [20, -52], [40, -40], [44, 0], [30, 50], [16, 52], [8, 10], [-8, 10], [-16, 52], [-30, 50], [-44, 0], [-40, -40]];
    P.fillPts(c, p, '#FBF8F1'); stroke(c, p, { w: 2.6, closed: true, dry: false });
    P.fillPts(c, wobble(circlePts(14, -28, 12, 9, 12), 2, 2301), '#4A3A2A', 0.85);
    c.restore();
  }
  function soil(c, x, y, t, k) { // yaprak → toprak
    const g = [[x - 130, y], [x + 130, y], [x + 130, y + 60], [x - 130, y + 60]]; P.fillPts(c, g, '#7A5A3A', 0.85); stroke(c, [[x - 130, y], [x + 130, y]], { w: 2.4, dry: false });
    const r = rng(2302); for (let i = 0; i < 6; i++) { const lx = x - 100 + i * 40, ly = E.lerp(y - 40 - (i % 2) * 20, y + 20, k); c.save(); c.globalAlpha *= 1 - 0.7 * k; const lf = circlePts(lx, ly, 22, 10, 14, i); P.fillPts(c, lf, i % 2 ? '#B5873A' : PAL.life, 0.85); stroke(c, lf, { w: 1.6, closed: true, dry: false }); c.restore(); }
    // fidan
    if (k > 0.6) { const h = 90 * (k - 0.6) / 0.4; line(c, [x + 60, y], [x + 60, y - h], { w: 3, color: PAL.life, dry: false }); P.fillPts(c, circlePts(x + 72, y - h, 14, 7, 12, -0.5), PAL.life); P.fillPts(c, circlePts(x + 48, y - h + 10, 14, 7, 12, 0.5), PAL.life); }
  }
  E.scene({
    name: 'Tartış', concept: 'Olumlu ve olumsuz etkiler', from: 'argue', to: 'fire', trFrom: [960, 450],
    draw(ctx, t) {
      const sa = E.s('argue'), sb = E.s('bad'), sg = E.s('good'), sf = E.s('fire');
      // başlık sütunları
      U.txt(ctx, 'olumsuz (−)', 590, 205, { size: 46, align: 'center', color: NEG, alpha: E.se(t, sa + 0.8, sa + 1.4) });
      U.txt(ctx, 'olumlu (+)', 1330, 205, { size: 46, align: 'center', color: PAL.life, alpha: E.se(t, sa + 0.8, sa + 1.4) });
      line(ctx, [960, 170], [962, 900], { w: 2.4, dry: false, alpha: 0.5 * E.se(t, sa + 0.6, sa + 1.2) });
      // satır etiketleri
      U.txt(ctx, 'ÇÜRÜME', 90, 420, { size: 40, color: U.AMBER, alpha: E.se(t, sa + 0.3, sa + 0.9) });
      if (t > sf) U.txt(ctx, 'YANMA', 90, 760, { size: 40, color: U.AMBER, alpha: E.se(t, sf + 0.1, sf + 0.6) });
      // çürüme: olumsuz
      const bk = E.se(t, sb + 0.2, sb + 0.8);
      if (bk > 0) E.layer(ctx, bk, c => { U.apple(c, 470, 400, 0.9, 0.85); tooth(c, 700, 400, 1.2); U.txt(c, 'besin ve diş çürümesi', 590, 520, { size: 36, align: 'center' }); });
      // çürüme: olumlu
      const gk = E.se(t, sg + 0.2, sg + 0.8);
      if (gk > 0) E.layer(ctx, gk, c => { soil(c, 1330, 430, t, E.se(t, sg + 1.0, sg + 5.0)); U.txt(c, 'canlı atıklar toprağı besler', 1330, 540, { size: 36, align: 'center' }); });
      // yanma
      const fk = E.se(t, sf + 0.3, sf + 0.9);
      if (fk > 0) E.layer(ctx, fk, c => {
        // olumlu: ocakta yemek
        const pot = [[1250, 680], [1410, 680], [1395, 740], [1265, 740], [1250, 680]]; P.fillPts(c, pot, '#9A9FA6'); stroke(c, pot, { w: 2.4, closed: true, dry: false }); U.steam(c, 1330, 676, 120, 60, 1, t, 2310); U.flame(c, 1330, 790, 0.55, t, 1);
        U.txt(c, 'ısınma, yemek pişirme', 1330, 860, { size: 36, align: 'center' });
      });
      const fk2 = E.se(t, sf + 2.6, sf + 3.2);
      if (fk2 > 0) E.layer(ctx, fk2, c => {
        // olumsuz: kontrolsüz yangın + duman
        for (let i = 0; i < 3; i++) U.flame(c, 480 + i * 90, 800 - (i % 2) * 20, 1.1 + (i % 2) * 0.3, t + i, 1);
        for (let i = 0; i < 4; i++) { const u = ((t * 0.3 + i / 4) % 1); c.save(); c.globalAlpha *= 0.55 * (1 - u); P.fillPts(c, circlePts(560 + u * 160, 690 - u * 90, 24 + u * 26, 16 + u * 18, 16), '#6E6A64'); c.restore(); }
        U.txt(c, 'kontrolsüz yangın, duman', 590, 860, { size: 36, align: 'center' });
      });
      U.damla(ctx, t, { x: 960, y: 640, s: 0.62, view: 'front', expr: t > sg ? 'happy' : 'thinking', look: [t > sg ? 0.6 : -0.6, 0], arms: [[-1, 1.6 + 0.2 * Math.sin(t * 5)], [1, 1.6 + 0.2 * Math.cos(t * 5)]] });
    }
  });
})();

// SAHNE 5 — Uzay araştırmalarında insanlar: Alper Gezeravcı, Nüzhet Gökdoğan; astronom / astronot (D19.4)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = U7;
  function helmet(c, x, y, s) {
    c.save(); c.translate(x, y); c.scale(s, s);
    const sh = [[-120, 150], [-100, 70], [100, 70], [120, 150]]; P.fillPts(c, sh.concat([[120, 150]]), PAL.white, 1); stroke(c, sh, { w: 3, seed: 121 });
    const h = circlePts(0, 0, 95, 95, 60); P.fillPts(c, h, PAL.white, 1); wash(c, h, '#9A9387', 0.2, 122, { bleed: 1, blooms: 0 }); stroke(c, h, { w: 3.4, closed: true, seed: 123 });
    const v = circlePts(0, 5, 70, 55, 40); P.fillPts(c, v, PAL.water, 0.85); c.save(); c.globalAlpha = 0.5; P.fillPts(c, circlePts(-25, -15, 18, 10, 16, -0.5), PAL.white, 1); c.restore(); stroke(c, v, { w: 2.6, closed: true, seed: 124 });
    c.restore();
  }
  E.scene({
    name: 'İnsanlar', concept: 'Astronot ve astronom', from: 'alper', to: 'nuzhet', trFrom: [500, 480],
    draw(ctx, t) {
      const sa = E.s('alper'), sn = E.s('nuzhet');
      const ka = E.se(t, sa + 0.1, sa + 0.8, 'out');
      if (ka > 0) E.layer(ctx, ka, c => {
        F.card(c, 110, 170, 800, 620, { seed: 130 });
        F.station(c, 700, 290, 0.32, t);
        helmet(c, 260, 330, 0.7);
        INK.label(c, 'Alper Gezeravcı', 150, 520, { size: 54, weight: 700 });
        INK.label(c, 'ilk Türk astronot', 150, 575, { size: 40, color: F.AMBER_D, weight: 700 });
        P.write(c, 'uzaya çıkış: 18 Ocak 2024', 150, 645, E.seg(t, sa + 2.0, sa + 3.2), { size: 38 });
        P.write(c, 'Uluslararası Uzay İstasyonu’nda', 150, 700, E.seg(t, sa + 4.0, sa + 5.2), { size: 38 });
        P.write(c, 'bilimsel deneyler', 150, 748, E.seg(t, sa + 4.8, sa + 5.8), { size: 38 });
        // görev arması: anlamı öğrenciye araştırma görevi
        const pk = E.se(t, sa + 6.0, sa + 6.8);
        c.save(); c.globalAlpha = pk; INK.dashed(c, circlePts(740, 560, 80, 80, 120), { w: 2.4, on: 8, off: 6 }); c.restore();
        INK.label(c, 'görev arması', 740, 552, { size: 30, align: 'center', weight: 700, alpha: pk });
        INK.label(c, 'ne anlatıyor?', 740, 588, { size: 28, align: 'center', alpha: pk, color: F.AMBER_D });
      });
      const kn = E.se(t, sn + 0.1, sn + 0.8, 'out');
      if (kn > 0) E.layer(ctx, kn, c => {
        F.card(c, 1010, 170, 800, 620, { seed: 131 });
        P.icon.telescope(c, 1170, 330, 1.05);
        P.icon.books(c, 1600, 330, 0.8);
        INK.label(c, 'Nüzhet Gökdoğan', 1050, 520, { size: 54, weight: 700 });
        INK.label(c, 'ilk Türk kadın astronom', 1050, 575, { size: 40, color: F.AMBER_D, weight: 700 });
        P.write(c, 'İstanbul Üniversitesi’nde astronomi', 1050, 645, E.seg(t, sn + 2.4, sn + 3.6), { size: 38 });
        P.write(c, 'araştırmaları; pek çok astronom yetiştirdi', 1050, 700, E.seg(t, sn + 3.6, sn + 5.0), { size: 38 });
      });
      // kavramlar şeridi
      const tk = E.se(t, sn + 5.2, sn + 6.0);
      if (tk > 0) {
        INK.label(ctx, 'astronom: uzayı inceleyen bilim insanı  ·  astronomi: uzay bilimi', 960, 850, { size: 34, align: 'center', alpha: tk });
        INK.label(ctx, 'astronot · kozmonot · taykonot: uzayda çalışan kişi', 960, 900, { size: 34, align: 'center', alpha: E.se(t, sn + 6.0, sn + 6.8) });
      }
    }
  });
})();

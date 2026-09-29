// SAHNE 6 — Çevremizdeki karışımlar: katı-sıvı, sıvı-gaz, sıvı-sıvı, katı-katı, katı-gaz, gaz-gaz → homojen/heterojen etiketleme (ç)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  const ROWS = [
    ['katı – sıvı', 'tuzlu su', 0],
    ['sıvı – gaz', 'gazoz (su + karbondioksit)', 0],
    ['sıvı – sıvı', 'zeytinyağı + su', 1],
    ['katı – katı', 'kum + demir tozu', 1],
    ['katı – gaz', 'tozlu hava', 1],
    ['gaz – gaz', 'hava', 0]
  ];
  E.scene({
    name: 'Çevremizde', concept: 'Çevredeki karışımları etiketleme', from: 'around', to: 'around', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('around');
      P.notebook(ctx, 170, 170, 1580, 730);
      const X = [300, 640, 1260, 1520], y0 = 260, RH = 98;
      INK.label(ctx, 'Hâller', X[0], y0, { size: 42, weight: 700, alpha: 0.7 });
      INK.label(ctx, 'Örnek', X[1], y0, { size: 42, weight: 700, alpha: 0.7 });
      INK.label(ctx, 'Homojen', X[2], y0, { size: 42, weight: 700, alpha: 0.8, color: PAL.water });
      INK.label(ctx, 'Heterojen', X[3], y0, { size: 42, weight: 700, alpha: 0.8, color: K.AMBER });
      stroke(ctx, K.linePts([280, y0 + 20], [1700, y0 + 16], 40), { w: 2.6, seed: 5901 });
      ROWS.forEach((r, i) => {
        const at = sa + 1.0 + i * 1.7, y = y0 + 90 + i * RH;
        P.write(ctx, r[0], X[0], y, E.seg(t, at, at + 0.6), { size: 44 });
        P.write(ctx, r[1], X[1], y, E.seg(t, at + 0.4, at + 1.1), { size: 44 });
        P.check(ctx, (r[2] ? X[3] : X[2]) + 90, y - 22, 48, E.se(t, at + 1.1, at + 1.5), { w: 6, color: r[2] ? K.AMBER : PAL.water });
      });
      INK.label(ctx, 'anlam çözümleme tablosu', 1700, 880, { size: 30, align: 'right', alpha: 0.55 * E.se(t, sa + 0.5, sa + 1.2) });
    }
  });
})();

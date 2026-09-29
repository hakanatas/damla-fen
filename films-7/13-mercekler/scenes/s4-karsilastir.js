// SAHNE 4 — Karşılaştırma tablosu: ince ve kalın kenarlı merceklerin nitelikleri (FB.7.4.2 b, c)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F713;
  const ROWS = [
    ['şekli', 'ortası kalın, kenarı ince', 'ortası ince, kenarı kalın'],
    ['paralel ışınlar', 'toplanır', 'dağılır'],
    ['odak noktası', 'ışınlar kesişir', 'uzantılar kesişir'],
    ['yakındaki yazı', 'büyük görünür', 'küçük görünür']
  ];
  const X = [330, 810, 1350], Y0 = 440, RH = 100;

  E.scene({
    name: 'Karşılaştır', concept: 'Mercek niteliklerinin karşılaştırılması', from: 'compare', to: 'compare', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('compare');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 160, 1620, 750);
      P.write(ctx, 'Gözlem Defteri · Mercekler', 290, 245, E.seg(t, sc + 0.3, sc + 1.3), { size: 56 });
      if (t > sc + 1.3) P.drawOn(ctx, P.bez([286, 266], [600, 278], [990, 262], 30), E.se(t, sc + 1.3, sc + 1.8), { w: 3, color: PAL.light });
      // başlıklar + küçük profiller
      const kh = E.se(t, sc + 1.2, sc + 1.9);
      if (kh > 0) E.layer(ctx, kh, c => {
        F.drawLens(c, F.lens(X[1] - 70, 345, 42, 30, 70, true), { seed: 1101, w: 2.4 });
        F.drawLens(c, F.lens(X[2] - 60, 345, 42, 6, 70, false), { seed: 1103, w: 2.4 });
        INK.label(c, 'ince kenarlı', X[1] - 20, 360, { size: 42, weight: 700 });
        INK.label(c, 'kalın kenarlı', X[2] - 10, 360, { size: 42, weight: 700 });
        line(c, [300, 392], [1720, 388], { w: 2.4, dry: false, seed: 1105 });
        line(c, [700, 300], [700, 830], { w: 1.6, dry: false, alpha: 0.5, seed: 1106 });
        line(c, [1240, 300], [1240, 830], { w: 1.6, dry: false, alpha: 0.5, seed: 1107 });
      });
      ROWS.forEach((r, i) => {
        const at = sc + 1.8 + i * 1.5, y = Y0 + i * RH + 10;
        P.write(ctx, r[0], X[0], y, E.seg(t, at, at + 0.7), { size: 38, color: PAL.water });
        P.write(ctx, r[1], X[1] - 90, y, E.seg(t, at + 0.4, at + 1.2), { size: 38 });
        P.write(ctx, r[2], X[2] - 90, y, E.seg(t, at + 0.8, at + 1.6), { size: 38 });
      });
      const kf = E.se(t, sc + 7.9, sc + 8.4);
      if (kf > 0) { P.write(ctx, 'ince kenarlı → toplayıcı mercek · kalın kenarlı → dağıtıcı mercek', 960, 860, E.seg(t, sc + 7.9, sc + 9.2), { size: 36, align: 'center', color: '#8A4A10' }); }
    }
  });
})();

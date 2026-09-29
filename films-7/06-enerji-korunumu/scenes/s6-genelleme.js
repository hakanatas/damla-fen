// SAHNE 6 — Genelleme (FB.7.2.3 b, tümevarım): 4 gözlem → örüntü → genelleme; toplam enerji sabit (nitel, matematik yok)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F7E, A = F76;
  const OBS = ['sarkaç', 'serbest düşme', 'sarmal yay', 'hız treni'];
  E.scene({
    name: 'Genelleme', concept: 'Enerjinin korunumu', from: 'general', to: 'total', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('general'), st = E.s('total');
      const up = E.se(t, st - 0.2, st + 0.8); // toplam aşamasında şema yukarı küçülür
      E.layer(ctx, 1 - 0.75 * up, c => {
        OBS.forEach((o, i) => {
          const x = 280 + i * 280, y = 250; const k = E.se(t, sg + 0.2 + i * 0.3, sg + 0.8 + i * 0.3); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; F.tag(c, o, x, y, { size: 38, seed: 6600 + i }); P.arrow(c, [x, y + 30], [760 + (x - 700) * 0.25, 380], 1, { w: 2.4, head: 12 }); c.restore();
        });
        const pk = E.se(t, sg + 1.4, sg + 2.0); if (pk > 0) { c.save(); c.globalAlpha *= pk; F.tag(c, 'örüntü: kinetik ⇄ potansiyel (+ ısı)', 700, 440, { size: 40, seed: 6610, color: '#8A4A10' }); P.arrow(c, [700, 470], [700, 540], 1, { w: 2.6, head: 14 }); c.restore(); }
      });
      const gk = E.se(t, sg + 2.2, sg + 3.0, 'out');
      if (gk > 0) E.layer(ctx, gk, c => {
        F.card(c, 150, 560, 1300, 850, { seed: 6620, fill: '#F6E7B8' });
        P.write(c, 'Enerji yoktan var olmaz,', 200, 640, E.seg(t, sg + 2.6, sg + 3.8), { size: 50 });
        P.write(c, 'var olan enerji yok olmaz;', 200, 710, E.seg(t, sg + 3.8, sg + 5.0), { size: 50 });
        P.write(c, 'yalnızca bir türden başka türe dönüşür.', 200, 790, E.seg(t, sg + 5.2, sg + 6.8), { size: 50, color: '#8A4A10' });
      });
      // toplam sabit: bileşim değişir, toplam aynı
      const tk = E.se(t, st + 0.3, st + 1.0);
      if (tk > 0) E.layer(ctx, tk, c => {
        const ph = (t - st) * 1.6, heat = 0.25 * E.se(t, st + 1.5, st + 7);
        const mech = 1 - heat, pe = mech * (0.5 + 0.5 * Math.cos(ph));
        A.bars(c, 1270, 430, A.std(pe, mech - pe, heat, true), { total: true, H: 250, bw: 56, gap: 150, size: 30 });
        F.txt(c, 'toplam enerji hep aynı', 1570, 540, { size: 40, align: 'center', color: '#8A4A10' });
        F.txt(c, 'Enerjinin korunumu', 1570, 610, { size: 52, align: 'center' });
      });
    }
  });
})();

// SAHNE 4 — Gazlar: ağzına balon takılı boş şişeler sıcak ve soğuk suda (TYMM örnek etkinliği; balonlara gülen yüz: E2.5)
(function () {
  const { PAL, line, stroke } = INK;
  const F = G15;
  E.scene({
    name: 'Balonlu şişeler', concept: 'Gazlar ısı alınca genleşir, ısı verince büzülür', from: 'gas', to: 'gas-obs', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('gas'), so = E.s('gas-obs');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 110, 1340, 790, 2401);
      const dip = E.se(t, sg + 3.2, sg + 5.0);
      const inf = E.se(t, so + 0.2, so + 3.5);
      const B = [[500, 'hot'], [1000, 'cold']];
      B.forEach(([cx, kind], i) => {
        F.basin(ctx, cx, 790, 380, 180, kind, t, { front: false });
        const by = E.lerp(560, 778, dip);
        F.bottleBalloon(ctx, cx, by, 1.05, (i === 0 ? 1 : -1) * inf, t);
        // şişeyi suyun içinde göster: yarı saydam su örtüsü
        if (dip > 0.2) { const wy = 790 - 180 + 34; ctx.save(); ctx.globalAlpha = 0.18 * dip; ctx.fillStyle = PAL.water; ctx.fillRect(cx - 170, wy + 4, 340, 790 - wy - 10); ctx.restore(); }
        F.basinFront(ctx, cx, 790, 380, 180, kind, t);
      });
      // sonuç etiketleri
      if (inf > 0.4) {
        const k = E.seg(inf, 0.4, 1);
        P.write(ctx, 'şişti!', 500, 250, k, { size: 54, align: 'center', color: F.HEAT });
        P.write(ctx, 'büzüldü!', 1000, 400, k, { size: 54, align: 'center', color: PAL.water });
      }
      // sağda not kartı
      const ck = E.se(t, so + 3.4, so + 4.2, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 1380, 170, 470, 420, { fill: '#FBF6E8', seed: 2410 });
        INK.label(c, 'Şişedeki hava', 1615, 235, { size: 42, weight: 700, align: 'center', color: F.AMBER });
        P.write(c, 'ısı aldı →', 1420, 320, E.seg(t, so + 4.0, so + 4.8), { size: 40, color: F.HEAT });
        P.write(c, 'genleşti', 1610, 320, E.seg(t, so + 4.6, so + 5.4), { size: 40 });
        P.write(c, 'ısı verdi →', 1420, 410, E.seg(t, so + 5.2, so + 6.0), { size: 40, color: PAL.water });
        P.write(c, 'büzüldü', 1625, 410, E.seg(t, so + 5.8, so + 6.6), { size: 40 });
        INK.label(c, 'gazlar genleşir ve büzülür', 1615, 520, { size: 34, weight: 700, align: 'center', alpha: E.se(t, so + 6.6, so + 7.4) });
      });
      DAMLA.draw(ctx, {
        x: 1600, y: 900, s: 1.05, view: 'q3', flip: true, t, seed: 4, blink: E.blink(t, 13), squash: E.breath(t), talk: E.talk(t),
        expr: inf > 0.5 ? 'happy' : 'curious', look: [-0.8, -0.3], arms: inf > 0.6 && inf < 1 ? [[-1, 2.3], [1, 2.3]] : [[-1, 0.4], [1, 1.2]]
      });
    }
  });
})();

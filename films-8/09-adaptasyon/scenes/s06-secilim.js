// SAHNE 6 — Varyasyon ve doğal seçilim (model): karlı ortamda tavşanlar
(function () {
  const { PAL, stroke, line, circlePts, wobble } = INK;
  const F = F809;
  // 8 tavşan: açıklık 0 (koyu) .. 1 (açık)
  const SH = [0.05, 0.12, 0.25, 0.38, 0.66, 0.8, 0.9, 1.0];
  const tone = v => { const a = [122, 92, 62], b = [246, 242, 232]; return `rgb(${a.map((x, i) => Math.round(x + (b[i] - x) * v)).join(',')})`; };
  E.scene({
    name: 'Doğal seçilim', concept: 'Varyasyon; doğal seçilim (model)', from: 'variation', to: 'generations', trFrom: [960, 700],
    draw(ctx, t) {
      const sv = E.s('variation'), ss = E.s('select'), su = E.s('survive'), sg = E.s('generations');
      const sl = F.snowBg(ctx, t, -200, E.W + 200, { base: 840 });
      const gen = E.se(t, sg - 0.2, sg + 0.8);
      const sceneA = 1 - gen;
      if (sceneA > 0) E.layer(ctx, sceneA, c => {
        SH.forEach((v, i) => {
          const x = 250 + i * 200, y = 830;
          const dark = v < 0.5;
          const seen = dark ? E.se(t, ss + 2.0 + i * 0.15, ss + 2.6 + i * 0.15) : 0;
          const gone = dark ? E.se(t, su - 0.2, su + 0.8) : 0;
          if (gone >= 1) return;
          c.save(); c.globalAlpha *= 1 - gone * 0.85;
          F.hare(c, x, y, 1.0, tone(v), { light: v > 0.5, flip: i % 2 === 1 });
          if (seen > 0) { c.globalAlpha *= seen; stroke(c, wobble(circlePts(x + 10, y - 60, 70, 70, 30), 3, 6200 + i), { w: 3.4, closed: true, color: F.HEAT }); }
          c.restore();
          // yavrular
          if (!dark) { const bk = E.se(t, su + 1.2 + i * 0.12, su + 1.8 + i * 0.12, 'out'); if (bk > 0) { c.save(); c.globalAlpha *= bk; F.hare(c, x + 60, y + 4, 0.5 * P.pop(bk), tone(Math.min(1, v + 0.05)), { light: true }); c.restore(); } }
        });
        if (t > sv + 1.2) { c.save(); c.globalAlpha *= E.se(t, sv + 1.2, sv + 2.0); P.drawOn(c, F.dense([[240, 620], [1680, 620]]), 1, { w: 3, color: PAL.inkSoft }); INK.label(c, 'koyu', 250, 600, { size: 38, weight: 700 }); INK.label(c, 'açık', 1680, 600, { size: 38, weight: 700, align: 'right' }); INK.label(c, 'aynı türde farklılıklar = VARYASYON', 960, 560, { size: 46, weight: 700, align: 'center', color: F.AMB }); c.restore(); }
        // avcı
        const hk = E.se(t, ss + 0.6, ss + 1.6);
        if (hk > 0 && t < su + 1) { c.save(); c.globalAlpha *= hk * (1 - E.se(t, su + 0.2, su + 1.0)); F.hawk(c, E.lerp(2000, 1450, hk), 280, 1.1, t); INK.label(c, 'avcı (şahin)', E.lerp(2000, 1450, hk), 370, { size: 38, weight: 700, align: 'center' }); c.restore(); }
        if (t > ss + 3.0 && t < su) E.inkText(c, 'koyu renkliler karda kolay fark edilir', 620, 300, t, ss + 3.0, su + 0.3, { size: 44, align: 'center', color: F.HEAT });
        if (t > su) E.inkText(c, 'açık renkliler hayatta kalıp yavru bırakır', 820, 300, t, su + 0.8, sg + 0.2, { size: 46, align: 'center', color: PAL.water });
      });
      // nesiller modeli
      if (gen > 0) E.layer(ctx, gen, c => {
        F.card(c, 260, 170, 1400, 680, 6300);
        F.fit(c, 'Nesiller boyunca (model · ölçekli değildir)', 960, 240, 1200, 44);
        const GEN = [[4, 4], [6, 2], [7, 1]];
        GEN.forEach(([lt, dk], r) => {
          const at = sg + 1.0 + r * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const y = 360 + r * 150;
          c.save(); c.globalAlpha *= k;
          INK.label(c, (r + 1) + '. nesil', 320, y, { size: 40, weight: 700 });
          for (let j = 0; j < 8; j++) { const light = j < lt; F.hare(c, 560 + j * 125, y + 36, 0.62, light ? tone(0.9) : tone(0.1), { light }); }
          c.restore();
        });
        if (t > sg + 5) E.inkText(c, 'DOĞAL SEÇİLİM', 960, 820, t, sg + 5.0, 1e9, { size: 56, align: 'center', color: PAL.life });
      });
    }
  });
})();

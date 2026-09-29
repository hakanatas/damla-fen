// SAHNE 7 — Evreler her ay periyodik olarak tekrar eder (≈ 29,5 gün); zaman birimi "ay" (KB2.16.1 genelleme)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const AMB = '#C07F1E', SYN = 29.53;
  E.scene({
    name: 'Periyot', concept: 'Evrelerin periyodik tekrarı ve zaman birimi ay', from: 'period', to: 'month', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('period'), sm = E.s('month');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      E.inkText(ctx, 'Evre takvimi', 960, 200, t, sp + 0.2, 1e9, { size: 58, align: 'center' });
      // 30 günlük şerit (2 × 15), 1. gün dolunay
      for (let d = 1; d <= 30; d++) {
        const i = d - 1, x = 190 + (i % 15) * 110, y = 320 + ((i / 15) | 0) * 180;
        const k = E.se(t, sp + 0.4 + i * 0.1, sp + 0.7 + i * 0.1); if (k <= 0) continue;
        ctx.save(); ctx.globalAlpha = k;
        P.fillPts(ctx, circlePts(x, y, 46, 46, 30), '#262A40', 0.9);
        const age = (14.77 + i) % SYN, e = age / SYN * 6.2832;
        if (age > 1 && age < SYN - 1) F03.phaseMoon(ctx, x, y, 38, e, { alpha: 0.9 }); else dashed(ctx, circlePts(x, y, 38, 38, 30), { w: 1.6, on: 6, off: 5, color: '#FBF3DC' });
        INK.label(ctx, String(d), x, y + 78, { size: 28, weight: 700, align: 'center', alpha: 0.75 });
        ctx.restore();
      }
      const kh = E.se(t, sp + 4, sp + 4.8);
      if (kh > 0) {
        ctx.save(); ctx.globalAlpha = kh;
        stroke(ctx, INK.wobble(circlePts(190, 320, 58, 58, 30), 2, 5), { w: 4, closed: true, color: AMB });
        stroke(ctx, INK.wobble(circlePts(190 + 14 * 110, 500, 58, 58, 30), 2, 6), { w: 4, closed: true, color: AMB });
        INK.label(ctx, 'dolunay', 190, 250, { size: 32, weight: 700, align: 'center', color: '#8A4A10' });
        INK.label(ctx, 'yine dolunay', 190 + 14 * 110, 430, { size: 32, weight: 700, align: 'center', color: '#8A4A10' });
        ctx.restore();
        P.write(ctx, 'aynı evre ≈ 29,5 günde bir tekrar eder', 960, 690, E.seg(t, sp + 5, sp + 6.6), { size: 50, align: 'center' });
      }
      // dipnot: 27,3 ile 29,5 farkı
      const kn = E.se(t, sp + 6.8, sp + 7.6) * (1 - E.se(t, sm - 0.3, sm + 0.3));
      if (kn > 0) {
        ctx.save(); ctx.globalAlpha = kn;
        INK.label(ctx, 'Not: Ay, Dünya çevresindeki turunu ≈ 27,3 günde tamamlar. Aynı evre ≈ 29,5 günde gelir,', 960, 780, { size: 30, align: 'center' });
        INK.label(ctx, 'çünkü bu sürede Dünya da Güneş çevresinde ilerler.', 960, 822, { size: 30, align: 'center' });
        ctx.restore();
      }
      // 1 yıl = 12 ay
      const ky = E.se(t, sm + 0.4, sm + 1.2);
      if (ky > 0) {
        for (let m = 0; m < 12; m++) { const k = E.se(t, sm + 1.0 + m * 0.2, sm + 1.3 + m * 0.2); if (k <= 0) continue; ctx.save(); ctx.globalAlpha = k; P.moon(ctx, 340 + m * 105, 800, 30); ctx.restore(); }
        P.write(ctx, '1 yıl = 12 ay', 960, 890, E.seg(t, sm + 3.4, sm + 4.4), { size: 44, align: 'center', color: '#8A4A10' });
      }
    }
  });
})();

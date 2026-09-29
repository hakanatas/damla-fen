// SAHNE 5 — Veriye dayalı olmayan önerme ("Büyük cisim daha yoğundur") veriyle sınanır → geçersiz; yoğunluk ayırt edici özelliktir
(function () {
  const { PAL } = INK;
  const F = F617, RED = F.RED, BR = '#8A4A10';
  E.scene({
    name: 'Önermeler', concept: 'Veriye dayalı / dayalı olmayan önerme', from: 'claim', to: 'verdict', trFrom: [960, 300],
    draw(ctx, t) {
      const s0 = E.s('claim'), sv = E.s('verdict');
      F.desk(ctx, 860, 5);
      // önerme kartı
      const kc = E.se(t, s0 + 0.2, s0 + 0.9, 'out');
      if (kc > 0) E.layer(ctx, kc, c => {
        F.card(c, 560, 175, 1360, 290, { seed: 1851 });
        F.txt(c, '“Büyük cisim daha yoğundur.”', 960, 250, { size: 54, align: 'center' });
      });
      P.write(ctx, 'veriye dayanmıyor, yalnızca tahmin', 960, 345, E.seg(t, s0 + 2.8, s0 + 4.2), { size: 40, align: 'center', color: BR });
      // büyük tahta blok, küçük demir küp
      const kb = E.se(t, s0 + 4.6, s0 + 5.4, 'out');
      if (kb > 0) E.layer(ctx, kb, c => {
        F.cube(c, 640, 800, 200, 'wood', { seed: 501 });
        F.cube(c, 1140, 800, 110, 'iron', { seed: 502 });
      });
      P.write(ctx, '30 g · 60 cm³', 1000, 560, E.seg(t, s0 + 5.8, s0 + 7.0), { size: 44 });
      INK.label(ctx, 'büyük tahta blok', 1000, 500, { size: 34, alpha: 0.7 * E.se(t, s0 + 5.6, s0 + 6.4) });
      P.write(ctx, '79 g · 10 cm³', 1260, 730, E.seg(t, sv - 0.8, sv + 0.2), { size: 44 });
      INK.label(ctx, 'küçük demir küp', 1260, 672, { size: 34, alpha: 0.7 * E.se(t, sv - 1.0, sv - 0.2) });
      // hesaplar
      P.write(ctx, '30 ÷ 60 = 0,5 g/cm³', 1000, 625, E.seg(t, sv + 0.2, sv + 1.4), { size: 48, color: PAL.water });
      P.write(ctx, '79 ÷ 10 = 7,9 g/cm³', 1260, 800, E.seg(t, sv + 1.4, sv + 2.6), { size: 48, color: PAL.water });
      // geçersiz
      if (t > sv + 3.0) {
        P.cross(ctx, 1320, 232, 36, E.se(t, sv + 3.0, sv + 3.5), { w: 8, color: RED });
        const k = P.pop(E.seg(t, sv + 3.3, sv + 3.8));
        ctx.save(); ctx.translate(1550, 232); ctx.rotate(-0.08); ctx.scale(k, k);
        F.txt(ctx, 'GEÇERSİZ', 0, 18, { size: 50, color: RED, align: 'center' });
        INK.stroke(ctx, F.rect(-130, -32, 130, 36), { w: 3, closed: true, color: RED, dry: false, seed: 1852 });
        ctx.restore();
      }
      // sonuç
      const kr = E.se(t, sv + 5.0, sv + 5.8, 'out');
      if (kr > 0) E.layer(ctx, kr, c => {
        F.card(c, 110, 365, 640, 490, { seed: 1853, fill: '#FBF3DE' });
        F.txt(c, 'yoğunluk → maddenin cinsi', 375, 420, { size: 40, align: 'center' });
        F.txt(c, 'ayırt edici özellik', 375, 472, { size: 40, align: 'center', color: BR });
      });
      F.damla(ctx, t, { x: 1790, y: 862, s: 0.9, flip: true, expr: t > sv + 3 ? 'determined' : 'thinking', look: [-0.8, -0.2], seed: 4 });
    }
  });
})();

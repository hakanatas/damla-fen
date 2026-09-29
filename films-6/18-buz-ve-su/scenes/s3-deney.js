// SAHNE 3 — Veri toplama: 100 g (100 cm³) su dondurulur → buz ≈ 109 cm³, kütle 100 g → yoğunluk ≈ 0,92 g/cm³;
// donunca hacim artar → boru, kapalı şişe çatlar (güvenlik: dondurucuya cam şişe konmaz)
(function () {
  const { PAL, stroke, line, dashed } = INK;
  const F = F618, RED = F.RED, BR = '#8A4A10';
  const CX0 = 360, CY0 = 380, CW = 240, CH = 400, CBY = CY0 + CH; // bardak
  const PX = 2.5; // px / cm³
  function cup(ctx, t, iceK) {
    const hW = 100 * PX, hI = 109 * PX;
    const h = E.lerp(hW, hI, iceK);
    const col = iceK > 0.5 ? '#9CC3D6' : PAL.water;
    F.beaker(ctx, CX0, CY0, CW, CH, { layers: [{ h, color: col, alpha: iceK > 0.5 ? 0.35 : 0.45, edge: iceK > 0.5 ? '#3E6E88' : PAL.water }], seed: 4 });
    if (iceK > 0.5) { // buz dokusu: çatlak çizgiler + kabarık üst
      ctx.save(); ctx.globalAlpha *= E.clamp((iceK - 0.5) * 2);
      line(ctx, [CX0 + 40, CBY - 60], [CX0 + 110, CBY - 150], { w: 1.6, color: PAL.white, dry: false });
      line(ctx, [CX0 + 150, CBY - 40], [CX0 + 190, CBY - 120], { w: 1.6, color: PAL.white, dry: false });
      stroke(ctx, P.bez([CX0 + 6, CBY - h], [CX0 + CW / 2, CBY - h - 16], [CX0 + CW - 6, CBY - h], 20), { w: 2.4, color: '#3E6E88', dry: false });
      ctx.restore();
    }
    // işaret çizgisi (100 cm³)
    const my = CBY - 2 - hW;
    ctx.save(); ctx.globalAlpha *= E.se(t, E.s('exp') + 2.4, E.s('exp') + 3.0);
    dashed(ctx, F.densePts([CX0 - 40, my], [CX0 + CW + 40, my], 60), { w: 3, on: 12, off: 8, color: F.AMB });
    ctx.restore();
    return { my, top: CBY - 2 - h };
  }
  function freezer(ctx, x, y, k) {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    const b = F.rect(x, y, x + 300, y + 420);
    P.fillPts(ctx, b, '#EEF3F5'); stroke(ctx, b, { w: 3, closed: true, seed: 2031 });
    line(ctx, [x, y + 140], [x + 300, y + 140], { w: 2.4, dry: false });
    line(ctx, [x + 260, y + 40], [x + 260, y + 100], { w: 6, taper: 0 }); line(ctx, [x + 260, y + 180], [x + 260, y + 260], { w: 6, taper: 0 });
    for (let k2 = 0; k2 < 3; k2++) { const an = k2 * Math.PI / 3; line(ctx, [x + 120 - Math.cos(an) * 40, y + 70 - Math.sin(an) * 40], [x + 120 + Math.cos(an) * 40, y + 70 + Math.sin(an) * 40], { w: 3, color: '#5E7F96', dry: false }); }
    INK.label(ctx, 'dondurucu', x + 150, y + 470, { size: 36, align: 'center' });
    ctx.restore();
  }
  function exp(ctx, t) {
    const se = E.s('exp'), sf = E.s('frozen'), sc = E.s('calc');
    const iceK = E.se(t, sf + 0.2, sf + 1.6);
    const { my, top } = cup(ctx, t, iceK);
    INK.label(ctx, 'plastik bardak', CX0 + CW / 2, CBY + 60, { size: 34, align: 'center', alpha: 0.8 * E.se(t, se + 0.6, se + 1.2) });
    P.write(ctx, '100 g · 100 cm³', CX0 - 60, my - 30, E.seg(t, se + 3.0, se + 4.4), { size: 40, align: 'right', color: PAL.water });
    // dondurucu
    const fk = Math.min(E.se(t, se + 5.0, se + 5.8), 1 - E.se(t, sf + 1.6, sf + 2.4));
    freezer(ctx, 1000, 330, fk);
    if (fk > 0.5 && t < sf + 1.6) P.arrow(ctx, [CX0 + CW + 60, 520], [980, 520], E.se(t, se + 6.0, se + 7.0), { w: 4, bend: 40 });
    if (t > sf - 0.2 && t < sf + 2.4) INK.label(ctx, 'ertesi gün…', 1150, 300, { size: 40, align: 'center', alpha: 0.8 * Math.min(E.se(t, sf - 0.2, sf + 0.4), 1 - E.se(t, sf + 1.6, sf + 2.4)) });
    // sonuç etiketleri
    const kfade = 1 - E.se(t, sc - 0.4, sc + 0.2);
    if (iceK > 0.9 && kfade > 0) E.layer(ctx, kfade, ctx => {
      P.arrow(ctx, [CX0 + CW + 50, my], [CX0 + CW + 50, top - 4], E.se(t, sf + 1.8, sf + 2.4), { w: 3.4, head: 12, color: '#3E6E88' });
      P.write(ctx, 'çizginin üstüne çıktı!', CX0 + CW + 90, top + 10, E.seg(t, sf + 2.2, sf + 3.4), { size: 44, color: '#3E6E88' });
      P.write(ctx, 'hacim ≈ 109 cm³', CX0 + CW + 90, top + 80, E.seg(t, sf + 3.6, sf + 4.8), { size: 44 });
      P.write(ctx, 'kütle: hâlâ 100 g', CX0 + CW + 90, top + 150, E.seg(t, sf + 5.4, sf + 6.6), { size: 44, color: BR });
    });
    // veri tablosu
    const kt = E.se(t, sc - 0.2, sc + 0.6, 'out');
    if (kt > 0) E.layer(ctx, kt, c => {
      F.card(c, 880, 520, 1880, 880, { seed: 2032 });
      F.table(c, 900, 540, [140, 150, 190, 480], [
        ['hâl', 'kütle', 'hacim', 'yoğunluk'],
        ['su', '100 g', '100 cm³', '100 ÷ 100 = 1 g/cm³'],
        ['buz', '100 g', '≈ 109 cm³', '100 ÷ 109 ≈ 0,92 g/cm³']
      ], 76, i => E.seg(t, sc + 0.2 + i * 1.6, sc + 1.4 + i * 1.6), { size: 35, colColor: [null, null, null, PAL.water] });
      P.write(c, 'buz, sudan az yoğundur', 1375, 840, E.seg(t, sc + 5.6, sc + 6.8), { size: 46, align: 'center', color: BR });
    });
  }
  function pipe(ctx, t) {
    const sp = E.s('pipe');
    F.card(ctx, 180, 180, 1740, 850, { seed: 2033 });
    P.write(ctx, 'Su donunca hacmi artar.', 960, 280, E.seg(t, sp + 0.2, sp + 1.4), { size: 60, align: 'center' });
    F.pipe(ctx, 560, 520, 1.1, E.se(t, sp + 1.8, sp + 2.6));
    F.glassBottle(ctx, 1300, 700, 1.1, E.se(t, sp + 2.8, sp + 3.6));
    INK.label(ctx, 'su borusu', 560, 640, { size: 38, align: 'center' });
    INK.label(ctx, 'kapalı cam şişe', 1450, 540, { size: 38 });
    const kw = E.se(t, sp + 5.2, sp + 6.0);
    if (kw > 0) { ctx.save(); ctx.globalAlpha *= kw; line(ctx, [200, 740], [1720, 736], { w: 2.4, color: RED, dry: false }); F.txt(ctx, '⚠  Dondurucuya cam şişe koyma!', 700, 810, { size: 50, color: RED, align: 'center' }); ctx.restore(); }
  }
  E.scene({
    name: 'Veri topla', concept: 'Suyun ve buzun yoğunluğu', from: 'exp', to: 'pipe', trFrom: [480, 560],
    draw(ctx, t) {
      F.desk(ctx, 860, 3);
      const aP = E.se(t, E.s('pipe') - 0.3, E.s('pipe') + 0.5);
      if (aP < 1) E.layer(ctx, 1 - aP, c => exp(c, t));
      if (aP > 0) E.layer(ctx, aP, c => pipe(c, t));
      if (t < E.s('calc')) F.damla(ctx, t, { x: 1650, y: 862, s: 1.1, flip: true, expr: t > E.s('frozen') + 1.5 ? 'surprised' : 'curious', look: [-0.8, 0.1], seed: 2, arms: [[-1, 0.35], [1, 0.4]] });
    }
  });
})();

// SAHNE 3 — Deney tasarımı: araç (termometre) seçimi, aynı tür sıvı + eşit miktar, güvenlik
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F18;
  const RED = '#A23A2A';
  function tools(ctx, t) {
    const sd = E.s('design');
    P.write(ctx, 'Deney tasarımı', 290, 205, E.seg(t, sd + 0.1, sd + 1.2), { size: 62 });
    const T = [
      [360, 'termometre (2)', c => { F.thermo(c, 330, 640, 300, 0.3, { w: 18 }); F.thermo(c, 390, 640, 300, 0.3, { w: 18 }); }],
      [760, 'özdeş iki kap', c => { F.box(c, 660, 480, 90, 150, { seed: 80 }); F.box(c, 770, 480, 90, 150, { seed: 81 }); }],
      [1160, 'büyük kap', c => F.box(c, 1070, 440, 180, 190, { seed: 82 })],
      [1560, 'karıştırıcı', c => { line(c, [1520, 640], [1600, 380], { w: 7, seed: 83, taper: 0.03 }); }]
    ];
    T.forEach(([x, n, d], i) => {
      const k = E.se(t, sd + 0.8 + i * 0.6, sd + 1.4 + i * 0.6, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; d(ctx); INK.label(ctx, n, x, 720, { size: 42, weight: 700, align: 'center' }); ctx.restore();
    });
    const hk = E.se(t, sd + 3.6, sd + 4.4);
    if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; stroke(ctx, INK.wobble(circlePts(360, 495, 140, 190, 60), 4, 85), { w: 4.5, closed: true, color: PAL.light, seed: 86 }); ctx.restore(); P.write(ctx, 'sıcaklığı ölçmek için', 360, 800, E.seg(t, sd + 4.2, sd + 5.2), { size: 36, align: 'center', color: '#8A4A10' }); }
    P.write(ctx, '+ çalışma yaprağı', 1560, 800, E.seg(t, sd + 3.4, sd + 4.4), { size: 36, align: 'center', alpha: 0.8 });
  }
  function vars(ctx, t) {
    const sv = E.s('vars');
    P.write(ctx, 'Değişkenleri kontrol et', 290, 205, E.seg(t, sv + 0.1, sv + 1.2), { size: 62 });
    F.beakerPair(ctx, t, { xs: [420, 760], y: 420, lv: 150, labels: false });
    INK.label(ctx, 'su', 520, 720, { size: 48, weight: 700, align: 'center', color: PAL.water }); INK.label(ctx, 'su', 860, 720, { size: 48, weight: 700, align: 'center', color: F.HEAT });
    const ke = E.se(t, sv + 2.4, sv + 3.2);
    if (ke > 0) { ctx.save(); ctx.globalAlpha = ke; dashed(ctx, F.linePts([390, 510], [990, 510]), { w: 2.4, on: 12, off: 8, color: '#8A4A10' }); INK.label(ctx, 'eşit miktar', 1000, 520, { size: 40, weight: 700, color: '#8A4A10' }); ctx.restore(); }
    P.write(ctx, 'aynı tür sıvı ✓', 690, 800, E.seg(t, sv + 1.0, sv + 2.0), { size: 44, align: 'center', color: PAL.life });
    // yanlış örnek: su + yağ
    const kx = E.se(t, sv + 3.6, sv + 4.4, 'out');
    if (kx > 0) { ctx.save(); ctx.globalAlpha = kx; F.glass(ctx, 1330, 480, 130, 170, 110, { seed: 87 }); F.bottle(ctx, 1600, 650, 0.9, '#A8A03A'); INK.label(ctx, 'su + yağ', 1480, 720, { size: 42, weight: 700, align: 'center' }); ctx.restore(); P.cross(ctx, 1480, 560, 110, E.se(t, sv + 4.4, sv + 5.0), { w: 10, color: RED }); P.write(ctx, 'bu deneyde değil', 1480, 800, E.seg(t, sv + 4.8, sv + 5.8), { size: 38, align: 'center', color: RED }); }
  }
  function safety(ctx, t) {
    const sf = E.s('safety');
    const card = [[380, 170], [1540, 160], [1550, 880], [390, 890], [380, 170]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
    stroke(ctx, card, { w: 3.4, closed: true, color: RED, seed: 90 });
    line(ctx, [390, 250], [1540, 240], { w: 3, color: RED, dry: false });
    ctx.font = '700 50px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 965, 222);
    const L = ['Sıcak suyu bir yetişkin hazırlar.', 'Kaynar su kullanılmaz; ısıya dayanıklı kap kullanılır.', 'Cam termometreyi dikkatli tut, karıştırıcı olarak kullanma.'];
    L.forEach((s, i) => P.write(ctx, '• ' + s, 450, 360 + i * 90, E.seg(t, sf + 0.4 + i * 1.3, sf + 1.6 + i * 1.3), { size: 40 }));
    P.write(ctx, 'Dikkatli ve sabırlı çalış!', 965, 760, E.seg(t, sf + 4.2, sf + 5.2), { size: 58, align: 'center', color: RED });
  }
  E.scene({
    name: 'Deney tasarımı', concept: 'Araç seçimi, değişkenler, güvenlik', from: 'design', to: 'safety', trFrom: [360, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 830);
      const aV = E.se(t, E.s('vars') - 0.4, E.s('vars') + 0.3), aS = E.se(t, E.s('safety') - 0.2, E.s('safety') + 0.5);
      if (aV < 1) E.layer(ctx, 1 - aV, c => tools(c, t));
      if (aV > 0) E.layer(ctx, aV * (1 - 0.7 * aS), c => vars(c, t));
      if (aS > 0) { ctx.save(); ctx.translate((1 - aS) * 900, 0); safety(ctx, t); ctx.restore(); }
    }
  });
})();

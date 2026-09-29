// SAHNE 4 — Veriler: çap oranları (≈109, ≈1/4) ve hacim karşılaştırması (≈1,3 milyon; ≈50)
(function () {
  const { PAL, line, stroke, circlePts, dashed, leader } = INK;
  const HOT = '#B5553F';
  function phaseSun(ctx, t) {
    const s = E.s('sun-size');
    const cx = 620, cy = 500, R = 290;
    P.sun(ctx, cx, cy, R, t, { nrays: 26, cells: false });
    const ex = cx + R + 120, er = R / 109;
    P.earth(ctx, ex, cy, er);
    ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, [[cx - R, cy + R + 40], [cx + R, cy + R + 40]], { w: 2.4, on: 10, off: 7 }); ctx.restore();
    INK.label(ctx, 'Güneş’in çapı', cx, cy + R + 85, { size: 36, weight: 700, align: 'center' });
    // büyüteç: Dünya
    const mx = 1300, my = 420, mr = 150;
    const k = E.se(t, s + 1.0, s + 1.8, 'out');
    if (k > 0) {
      ctx.save(); ctx.globalAlpha = k;
      leader(ctx, [ex + 6, cy - 4], [mx - mr * 0.8, my + mr * 0.6], { w: 1.4, dot: false });
      ctx.beginPath(); ctx.arc(mx, my, mr, 0, 7); ctx.fillStyle = '#FAF6EC'; ctx.fill();
      P.earth(ctx, mx, my, 60);
      stroke(ctx, circlePts(mx, my, mr, mr, 50), { w: 5, closed: true }); line(ctx, [mx + mr * 0.7, my + mr * 0.7], [mx + mr * 1.1, my + mr * 1.1], { w: 12, taper: 0.02 });
      INK.label(ctx, 'Dünya', mx, my + mr + 50, { size: 38, weight: 700, align: 'center' });
      ctx.restore();
    }
    P.write(ctx, '≈ 109 kat', 1560, 720, E.seg(t, s + 2.6, s + 3.6), { size: 70, color: HOT, align: 'center' });
  }
  function phaseMoon(ctx, t) {
    const s = E.s('moon-size');
    const ex = 700, ey = 500, er = 180, mr = er * 0.273;
    P.earth(ctx, ex, ey, er);
    INK.label(ctx, 'Dünya', ex, ey + er + 60, { size: 42, weight: 700, align: 'center' });
    // yan yana Ay'lar Dünya çapı boyunca
    const n = Math.min(4, Math.floor(E.seg(t, s + 1.2, s + 3.2) * 4.99));
    for (let i = 0; i < n; i++) P.moon(ctx, ex - er + mr + i * 2 * mr * 0.915, ey + er + 120 + 20, mr);
    if (n > 0) { ctx.save(); ctx.globalAlpha = 0.7; dashed(ctx, [[ex - er, ey - er - 30], [ex - er, ey + er + 200]], { w: 1.6 }); dashed(ctx, [[ex + er, ey - er - 30], [ex + er, ey + er + 200]], { w: 1.6 }); ctx.restore(); }
    const k = E.se(t, s + 0.4, s + 1.2, 'out');
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; P.moon(ctx, 1250, 470, mr); INK.label(ctx, 'Ay', 1250, 470 + mr + 50, { size: 42, weight: 700, align: 'center' }); ctx.restore(); }
    P.write(ctx, 'Ay’ın çapı ≈ Dünya’nınkinin 1/4’ü', 1340, 700, E.seg(t, s + 3.2, s + 4.6), { size: 50, align: 'center', color: HOT });
  }
  function phaseVol(ctx, t) {
    const s = E.s('vol-data');
    // sol: Güneş ≈ 1.300.000 Dünya
    F04.card(ctx, 140, 190, 780, 660, { seed: 31 });
    P.sun(ctx, 330, 470, 130, t, { nrays: 16, cells: false, glow: false });
    INK.label(ctx, '=', 545, 490, { size: 70, weight: 700, align: 'center' });
    P.earth(ctx, 620, 470, 8);
    INK.label(ctx, '× 1.300.000', 645, 490, { size: 48, weight: 700, alpha: E.se(t, s + 1.0, s + 1.8) });
    P.write(ctx, 'Güneş’e ≈ 1 milyon 300 bin Dünya sığar', 530, 760, E.seg(t, s + 1.6, s + 3.2), { size: 36, align: 'center' });
    // sağ: Dünya ≈ 50 Ay
    const kr = E.se(t, s + 3.6, s + 4.4);
    if (kr > 0) E.layer(ctx, kr, c => {
      F04.card(c, 1000, 190, 780, 660, { seed: 32 });
      P.earth(c, 1140, 440, 100);
      INK.label(c, '=', 1290, 460, { size: 70, weight: 700, align: 'center' });
      const n = Math.floor(E.seg(t, s + 4.4, s + 7.4) * 50.99);
      for (let i = 0; i < n; i++) P.moon(c, 1360 + (i % 10) * 38, 300 + ((i / 10) | 0) * 42, 15);
      P.write(c, 'Dünya’ya ≈ 50 Ay sığar', 1390, 760, E.seg(t, s + 7.2, s + 8.4), { size: 40, align: 'center' });
    });
    INK.label(ctx, '(hacim karşılaştırması · çizim ölçekli değildir)', 960, 900, { size: 28, align: 'center', alpha: 0.6 });
  }
  E.scene({
    name: 'Veriler', concept: 'Çap ve hacim verileri', from: 'sun-size', to: 'vol-data', trFrom: [960, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const a = E.se(t, E.s('moon-size') - 0.3, E.s('moon-size') + 0.4), b = E.se(t, E.s('vol-data') - 0.3, E.s('vol-data') + 0.4);
      if (a < 1) E.layer(ctx, 1 - a, c => phaseSun(c, t));
      if (a > 0 && b < 1) E.layer(ctx, Math.min(a, 1 - b), c => phaseMoon(c, t));
      if (b > 0) E.layer(ctx, b, c => phaseVol(c, t));
    }
  });
})();

// SAHNE 5 — Modeli yenileme (FB.5.1.4 b): temsilî büyüklükler ve uzaklıklar. Dünya = nohut (1 cm) ölçeğinde:
// Ay ≈ 2,7 mm (susam), Güneş ≈ 109 cm (≈ 1 m top); Ay 30 cm, Güneş ≈ 117 m uzakta.
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead, wash } = INK;
  const HOT = '#B5553F';
  function nohut(ctx, x, y, r) { const p = INK.wobble(circlePts(x, y, r, r * 0.95, 30), r * 0.05, 11); P.fillPts(ctx, p, '#E2C48E', 1); wash(ctx, p, '#B8925E', 0.4, 12, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: Math.max(1.2, r * 0.03), closed: true }); if (r > 20) stroke(ctx, P.bez([x + r * 0.5, y - r * 0.6], [x + r * 0.9, y - r * 0.9], [x + r * 0.95, y - r * 0.4], 10), { w: r * 0.03 }); }
  function susam(ctx, x, y, r) { const p = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; p.push([x + Math.cos(a) * r * 0.7, y + Math.sin(a) * r * (1 - 0.3 * Math.sin(a))]); } P.fillPts(ctx, p, '#F1E3C4', 1); stroke(ctx, p, { w: Math.max(1, r * 0.06), closed: true }); }
  function phaseA(ctx, t) {
    const s = E.s('revise');
    P.write(ctx, 'Model 2: temsilî büyüklükler', 960, 230, E.seg(t, s + 0.3, s + 1.6), { size: 58, align: 'center' });
    const k1 = E.se(t, s + 1.4, s + 2.2, 'out'), k2 = E.se(t, s + 4.0, s + 4.8, 'out');
    if (k1 > 0) { ctx.save(); ctx.translate(640, 520); ctx.scale(P.pop(k1), P.pop(k1)); P.earth(ctx, -190, 0, 110); INK.label(ctx, '=', -30, 20, { size: 60, weight: 700, align: 'center' }); nohut(ctx, 110, 0, 110); ctx.restore(); if (k1 > 0.9) { INK.label(ctx, 'Dünya = nohut', 640, 720, { size: 44, weight: 700, align: 'center' }); INK.label(ctx, '(≈ 1 cm)', 640, 770, { size: 34, align: 'center', alpha: 0.75 }); } }
    if (k2 > 0) { ctx.save(); ctx.translate(1350, 520); ctx.scale(P.pop(k2), P.pop(k2)); P.moon(ctx, -100, 0, 30); INK.label(ctx, '=', -20, 18, { size: 56, weight: 700, align: 'center' }); susam(ctx, 50, 0, 30); ctx.restore(); if (k2 > 0.9) { INK.label(ctx, 'Ay = susam tanesi', 1350, 720, { size: 44, weight: 700, align: 'center' }); INK.label(ctx, '(≈ 3 mm)', 1350, 770, { size: 34, align: 'center', alpha: 0.75 }); } }
    INK.label(ctx, '(nohut ve susam büyütülerek çizildi)', 960, 880, { size: 28, align: 'center', alpha: 0.6 * k1 });
  }
  function phaseB(ctx, t) {
    const s = E.s('sunball');
    const bx = 1180, by = 560, br = 300;
    const k = E.se(t, s + 0.3, s + 1.3, 'out');
    ctx.save(); ctx.translate(bx, by); ctx.scale(P.pop(k), P.pop(k)); P.sun(ctx, 0, 0, br, t, { rays: false, glow: false, cells: false }); ctx.restore();
    if (k > 0.9) {
      ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, [[bx - br, by + br + 40], [bx + br, by + br + 40]], { w: 2.4 }); ctx.restore();
      INK.label(ctx, 'Güneş ≈ 1 m (109 cm)', bx, by + br + 90, { size: 44, weight: 700, align: 'center', color: HOT });
    }
    // gerçek ölçekte nohut (≈ 2,75 px) + büyüteç
    const nx = 560, ny = 640, nr = br / 109;
    nohut(ctx, nx, ny, nr);
    const km = E.se(t, s + 2.0, s + 2.8, 'out');
    if (km > 0) { ctx.save(); ctx.globalAlpha = km; INK.leader(ctx, [nx, ny - 4], [470, 470], { w: 1.4, dot: false }); ctx.beginPath(); ctx.arc(420, 400, 90, 0, 7); ctx.fillStyle = '#FAF6EC'; ctx.fill(); nohut(ctx, 420, 400, 40); stroke(ctx, circlePts(420, 400, 90, 90, 40), { w: 4, closed: true }); INK.label(ctx, 'nohut (Dünya)', 420, 530, { size: 34, weight: 700, align: 'center' }); ctx.restore(); }
    DAMLA.draw(ctx, { x: 700, y: 900, s: 1.1, view: 'q3', expr: 'surprised', look: [0.9, -0.5], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.4], [1, 2.5]] });
  }
  function phaseC(ctx, t) {
    const s = E.s('dist');
    // üst: 30 cm cetvel
    const x0 = 360, x1 = 1260, y = 300;
    const rul = [[x0 - 20, y - 20], [x1 + 20, y - 20], [x1 + 20, y + 30], [x0 - 20, y + 30], [x0 - 20, y - 20]];
    P.fillPts(ctx, rul, PAL.light, 0.4); stroke(ctx, rul, { w: 2.4, closed: true });
    for (let i = 0; i <= 30; i++) line(ctx, [x0 + i * 30, y - 20], [x0 + i * 30, y - 20 + (i % 5 ? 12 : 22)], { w: 1.4, dry: false, seed: i });
    INK.label(ctx, '0', x0, y + 70, { size: 30, align: 'center' }); INK.label(ctx, '30 cm', x1, y + 70, { size: 30, align: 'center' });
    nohut(ctx, x0, y - 50, 15); susam(ctx, x1, y - 42, 5);
    INK.label(ctx, 'Dünya', x0, y - 90, { size: 34, weight: 700, align: 'center' });
    const ka = E.se(t, s + 0.8, s + 1.6);
    if (ka > 0) INK.label(ctx, 'Ay: 30 cm ötede', x1 + 60, y - 30, { size: 44, weight: 700, alpha: ka });
    // alt: futbol sahası
    const kf = E.se(t, s + 3.0, s + 3.8);
    if (kf > 0) E.layer(ctx, kf, c => {
      const fx0 = 330, fx1 = 1530, fy = 620, fh = 240;
      const fld = [[fx0, fy - fh / 2], [fx1, fy - fh / 2], [fx1, fy + fh / 2], [fx0, fy + fh / 2], [fx0, fy - fh / 2]];
      P.fillPts(c, fld, PAL.life, 0.35); stroke(c, fld, { w: 3, closed: true, color: '#FBF8F1' }); stroke(c, fld, { w: 1.4, closed: true });
      line(c, [(fx0 + fx1) / 2, fy - fh / 2], [(fx0 + fx1) / 2, fy + fh / 2], { w: 2.4, color: '#FBF8F1' });
      stroke(c, circlePts((fx0 + fx1) / 2, fy, 50, 50, 30), { w: 2.4, closed: true, color: '#FBF8F1' });
      INK.label(c, 'futbol sahası ≈ 105 m', (fx0 + fx1) / 2, fy + fh / 2 + 45, { size: 32, align: 'center', alpha: 0.8 });
      nohut(c, 200, fy, 7); INK.label(c, 'Dünya', 200, fy - 30, { size: 30, weight: 700, align: 'center' });
      P.sun(c, 1750, fy, 60, t, { rays: false, glow: false, cells: false }); INK.label(c, 'Güneş', 1750, fy - 85, { size: 34, weight: 700, align: 'center' });
      const kd = E.se(t, s + 4.0, s + 5.2);
      if (kd > 0) { const p = [[215, fy - 150], [1690, fy - 150]]; dashed(c, P.partial(P.bez(p[0], [950, fy - 160], p[1], 40), kd), { w: 3, on: 14, off: 9 }); if (kd > 0.98) { arrowHead(c, [1600, fy - 150], p[1], 16, { w: 3 }); arrowHead(c, [300, fy - 150], p[0], 16, { w: 3 }); } }
      P.write(c, '≈ 117 m', 950, fy - 175, E.seg(t, s + 5.0, s + 6.0), { size: 56, align: 'center', color: HOT });
    });
    INK.label(ctx, 'Bu yüzden kâğıt üstündeki çizimlerde uzaklıklar ölçekli değildir.', 960, 895, { size: 32, align: 'center', alpha: 0.75 * E.se(t, s + 6.5, s + 7.3) });
  }
  E.scene({
    name: 'Model 2', concept: 'Modeli verilerle yenileme: temsilî büyüklük ve uzaklık', from: 'revise', to: 'dist', trFrom: [960, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const a = E.se(t, E.s('sunball') - 0.3, E.s('sunball') + 0.4), b = E.se(t, E.s('dist') - 0.3, E.s('dist') + 0.4);
      if (a < 1) E.layer(ctx, 1 - a, c => phaseA(c, t));
      if (a > 0 && b < 1) E.layer(ctx, Math.min(a, 1 - b), c => phaseB(c, t));
      if (b > 0) E.layer(ctx, b, c => phaseC(c, t));
    }
  });
})();

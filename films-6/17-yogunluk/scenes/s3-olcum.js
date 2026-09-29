// SAHNE 3 — Taşın kütlesi (terazi, 54 g) ve hacmi (dereceli silindir: 70 − 50 = 20 cm³); dikkat notları + taşırma kabı
(function () {
  const { PAL, dashed } = INK;
  const F = F617;
  function mass(ctx, t) {
    const s0 = E.s('mass');
    const a1 = s0 + 1.4, a2 = s0 + 3.0, a3 = s0 + 4.6;
    const n = t > a3 ? 3 : t > a2 ? 2 : t > a1 ? 1 : 0;
    const tgt = [-0.2, -0.08, -0.035, 0][n];
    const prev = [-0.2, -0.2, -0.08, -0.035][n];
    const at = [s0, a1, a2, a3][n];
    const tilt = E.lerp(prev, tgt, E.se(t, at, at + 0.8, 'back'));
    const stoneK = E.se(t, s0 + 0.2, s0 + 0.9, 'in');
    F.balance(ctx, 700, 860, {
      s: 1.1, tilt,
      left: (c, x, y) => { if (stoneK > 0) F.stone(c, x, E.lerp(y - 300, y - 2, stoneK), 1.05); },
      right: (c, x, y) => {
        if (n >= 1) F.mass(c, x - 30, y - 2, '50 g', 0.95);
        if (n >= 2) F.mass(c, x + 28, y - 2, '2 g', 0.55);
        if (n >= 3) F.mass(c, x + 62, y - 2, '2 g', 0.55);
      }
    });
    const rows = [['50 g', a1], ['+ 2 g', a2], ['+ 2 g', a3]];
    rows.forEach(([s, a], i) => P.write(ctx, s, 1260, 300 + i * 70, E.seg(t, a + 0.1, a + 0.7), { size: 54, align: 'right' }));
    if (t > a3 + 0.6) {
      P.drawOn(ctx, P.bez([1080, 460], [1170, 464], [1270, 458], 20), E.se(t, a3 + 0.6, a3 + 1.0), { w: 3 });
      P.write(ctx, '54 g', 1260, 540, E.seg(t, a3 + 1.0, a3 + 1.8), { size: 70, align: 'right', color: '#8A4A10' });
      P.write(ctx, 'denge!', 700, 330, E.seg(t, a3 + 0.8, a3 + 1.6), { size: 50, align: 'center', color: PAL.life });
    }
    F.damla(ctx, t, { x: 1560, y: 862, s: 1.3, flip: true, expr: t > a3 + 0.8 ? 'happy' : 'curious', look: [-0.8, 0.2], arms: [[-1, 0.35], [1, 1.2]], seed: 1 });
  }
  function volume(ctx, t) {
    const s0 = E.s('vol');
    const drop = E.se(t, s0 + 2.4, s0 + 3.3, 'in'), rise = E.se(t, s0 + 3.2, s0 + 4.2);
    const lev = E.lerp(50, 70, rise);
    const cx = 700, by = 830;
    let yF = null;
    yF = F.cylinder(ctx, cx, by, 150, 540, 100, lev, {
      step: 5, labelEvery: 10,
      inside: c => { const sy = E.lerp(180, by - 4, drop); if (drop > 0 || t > s0 + 1.8) F.stone(c, cx, sy, 0.75, 7); }
    });
    const y50 = by - 540 * 0.5, y70 = by - 540 * 0.7;
    // ilk seviye çizgisi
    ctx.save(); ctx.globalAlpha = 0.8 * E.se(t, s0 + 0.6, s0 + 1.2); dashed(ctx, F.densePts([cx - 130, y50], [cx - 80, y50], 30), { w: 2.4, on: 10, off: 7 }); ctx.restore();
    P.write(ctx, 'ilk: 50 cm³', cx - 150, y50 + 14, E.seg(t, s0 + 0.6, s0 + 1.6), { size: 44, align: 'right' });
    if (rise > 0.9) {
      dashed(ctx, F.densePts([cx - 130, y70], [cx - 80, y70], 30), { w: 2.4, on: 10, off: 7, color: PAL.water });
      P.write(ctx, 'son: 70 cm³', cx - 150, y70 + 14, E.seg(t, s0 + 4.2, s0 + 5.0), { size: 44, align: 'right', color: PAL.water });
    }
    // hesap
    const kx = 1080;
    P.write(ctx, 'son − ilk', kx, 400, E.seg(t, s0 + 5.2, s0 + 6.0), { size: 50 });
    P.write(ctx, '70 − 50 = 20 cm³', kx, 480, E.seg(t, s0 + 6.2, s0 + 7.4), { size: 62, color: PAL.water });
    P.write(ctx, '→ taşın hacmi', kx, 560, E.seg(t, s0 + 7.4, s0 + 8.4), { size: 52 });
    F.damla(ctx, t, { x: 1620, y: 862, s: 1.2, flip: true, expr: rise > 0.5 ? 'surprised' : 'curious', look: [-0.8, 0], arms: [[-1, 0.35], [1, 0.4]], seed: 2 });
  }
  function care(ctx, t) {
    const s0 = E.s('care');
    // sol: dikkat notları
    F.card(ctx, 150, 250, 820, 640, { seed: 1831 });
    P.write(ctx, 'Dikkat', 485, 320, E.seg(t, s0 + 0.2, s0 + 1.0), { size: 56, align: 'center', color: '#8A4A10' });
    P.write(ctx, 'Cisim silindire sığmalı.', 200, 430, E.seg(t, s0 + 0.8, s0 + 2.0), { size: 46 });
    P.check(ctx, 770, 410, 40, E.se(t, s0 + 2.0, s0 + 2.4), { w: 6, color: PAL.life });
    P.write(ctx, 'Su taşmamalı.', 200, 520, E.seg(t, s0 + 2.2, s0 + 3.2), { size: 46 });
    P.check(ctx, 770, 500, 40, E.se(t, s0 + 3.2, s0 + 3.6), { w: 6, color: PAL.life });
    INK.label(ctx, '(suda çözünmeyen katılar için)', 485, 600, { size: 30, align: 'center', alpha: 0.65 * E.se(t, s0 + 3.4, s0 + 4.2) });
    // sağ: taşırma kabı
    const x0 = 1040, y0 = 360, w = 240, h = 330;
    const drop = E.se(t, s0 + 4.0, s0 + 4.8, 'in');
    const flow = E.seg(t, s0 + 4.7, s0 + 6.4);
    F.overflow(ctx, x0, y0, w, h, y0 + 40, {
      inside: c => { if (t > s0 + 3.6) F.stone(c, x0 + w / 2, E.lerp(250, y0 + h - 4, drop), 1.0, 7); }
    });
    // toplama kabı
    const cx0 = 1370, cy0 = 560, cw = 140, ch = 170;
    F.beaker(ctx, cx0, cy0, cw, ch, { layers: [{ h: 60 * flow, color: PAL.water }], seed: 3 });
    if (flow > 0 && flow < 1) {
      const pts = P.bez([x0 + w + 68, y0 + 72], [x0 + w + 100, y0 + 110], [x0 + w + 104, cy0 + ch - 60 * flow], 16);
      INK.stroke(ctx, pts, { w: 6, color: PAL.water, alpha: 0.7, dry: false });
    }
    P.write(ctx, 'taşırma kabı', x0 + w / 2, 300, E.seg(t, s0 + 3.6, s0 + 4.4), { size: 44, align: 'center' });
    P.write(ctx, 'taşan su', cx0 + cw / 2, 790, E.seg(t, s0 + 6.2, s0 + 7.0), { size: 40, align: 'center', color: PAL.water });
    P.write(ctx, '= cismin hacmi', cx0 + cw / 2, 845, E.seg(t, s0 + 6.8, s0 + 7.8), { size: 40, align: 'center', color: PAL.water });
  }
  E.scene({
    name: 'Ölçüm', concept: 'Kütle ve hacim ölçümü', from: 'mass', to: 'care', trFrom: [700, 500],
    draw(ctx, t) {
      F.desk(ctx, 860, 3);
      const aV = E.se(t, E.s('vol') - 0.4, E.s('vol') + 0.4), aC = E.se(t, E.s('care') - 0.4, E.s('care') + 0.4);
      if (aV < 1) E.layer(ctx, 1 - aV, c => mass(c, t));
      if (aV > 0 && aC < 1) E.layer(ctx, Math.min(aV, 1 - aC), c => volume(c, t));
      if (aC > 0) E.layer(ctx, aC, c => care(c, t));
    }
  });
})();

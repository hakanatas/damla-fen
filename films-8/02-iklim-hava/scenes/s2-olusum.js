// SAHNE 2 — Atmosfer ve su buharı; yağmur, kar, dolu, çiy, kırağı, sis oluşumları + hâl değişimi sınıflandırması (KB2.5)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F82;
  const ROWS = [ // [olay, hâl değişimi, beat]
    ['Yağmur', 'yoğuşma', 'rain'], ['Kar', 'kırağılaşma', 'snow'], ['Dolu', 'donma', 'hail'],
    ['Çiy', 'yoğuşma', 'dew'], ['Kırağı', 'kırağılaşma', 'dew'], ['Sis', 'yoğuşma', 'fog']
  ];
  const vis = (t, id) => Math.min(E.se(t, E.s(id) + 0.1, E.s(id) + 0.7), 1 - E.se(t, E.e(id) - 0.25, E.e(id) + 0.25));
  const falling = (ctx, t, x0, x1, y0, y1, n, seed, fn) => { const R = INK.rng(seed); for (let i = 0; i < n; i++) { const x = x0 + R() * (x1 - x0), sp = 0.4 + R() * 0.4, ph = (t * sp + R()) % 1; fn(x + Math.sin(t + i) * 6, y0 + ph * (y1 - y0), i, R); } };
  function air(c, t) {
    const s0 = E.s('air');
    const sea = [[150, 790], [700, 792], [700, 900], [150, 900]];
    P.fillPts(c, sea, PAL.water, 0.35); stroke(c, [[150, 790], [700, 792]], { w: 3, seed: 201 });
    for (let i = 0; i < 4; i++) stroke(c, P.arc(220 + i * 130, 820, 30, Math.PI * 1.1, Math.PI * 1.9, 10), { w: 2, color: PAL.water, dry: false, seed: 202 + i });
    const land = [[700, 792], [900, 740], [1150, 700], [1360, 720], [1360, 900], [700, 900]];
    P.fillPts(c, land, PAL.life, 0.3); stroke(c, land.slice(0, 4), { w: 3, seed: 206 });
    F.sunIcon(c, 290, 280, 60, t);
    [320, 450, 580].forEach((x, i) => F.upArrow(c, x, 770, E.lerp(770, 480, E.se(t, s0 + 0.6 + i * 0.2, s0 + 2.0 + i * 0.2)), { ph: i, seed: 210 + i }));
    F.lbl(c, 'buharlaşma', 450, 450, E.se(t, s0 + 1.8, s0 + 2.4), { weight: 700, color: PAL.water, align: 'center' });
    const ck = E.se(t, s0 + 2.8, s0 + 3.8, 'out');
    if (ck > 0) { c.save(); c.globalAlpha *= ck; F.cloud(c, 900, 330, 0.9, 220); c.restore(); }
    F.lbl(c, 'yoğuşma → bulut', 900, 470, E.se(t, s0 + 3.6, s0 + 4.2), { weight: 700, align: 'center' });
    const R = INK.rng(230); for (let i = 0; i < 40; i++) { const x = 180 + R() * 1150, y = 200 + R() * 520 + Math.sin(t * 1.3 + i) * 6; if (Math.hypot(x - 900, y - 330) < 240 || Math.hypot(x - 290, y - 280) < 110) continue; c.save(); c.globalAlpha *= 0.5; c.fillStyle = PAL.water; c.beginPath(); c.arc(x, y, 3, 0, 7); c.fill(); c.restore(); }
    F.lbl(c, '• su buharı (gaz)', 1060, 640, E.se(t, s0 + 1.0, s0 + 1.6), { size: 34, color: PAL.water });
  }
  function rain(c, t) {
    const s0 = E.s('rain');
    F.cloud(c, 700, 320, 1.2, 240, { dark: 0.6 });
    F.lbl(c, 'su buharı soğur, yoğuşur', 700, 310, E.se(t, s0 + 0.6, s0 + 1.2), { size: 36, align: 'center', weight: 700 });
    const fk = E.se(t, s0 + 3.5, s0 + 4.3);
    if (fk > 0) falling(c, t, 420, 980, 460, 880, 26, 241, (x, y) => { c.save(); c.globalAlpha *= fk; F.drop(c, x, y, 7); c.restore(); });
    // büyüteç: damlacıklar birleşiyor
    const zx = 1150, zy = 400, zr = 130, mk = E.se(t, s0 + 1.8, s0 + 3.6);
    P.fillPts(c, circlePts(zx, zy, zr, zr, 50), '#FBF8F1', 0.95); stroke(c, circlePts(zx, zy, zr, zr, 50), { w: 4, closed: true, seed: 243 });
    line(c, [zx - zr * 0.7, zy + zr * 0.7], [zx - zr * 1.2, zy + zr * 1.2], { w: 9, seed: 244 });
    const d = E.lerp(55, 0, mk), r = E.lerp(16, 22, E.se(t, s0 + 3.2, s0 + 3.6));
    if (mk < 0.95) { F.drop(c, zx - d, zy, 16); F.drop(c, zx + d, zy + 10, 16); } else F.drop(c, zx, zy + 10, 24);
    [[-80, -60], [70, -70], [-60, 70], [85, 55]].forEach(([dx, dy]) => F.drop(c, zx + dx, zy + dy, 7, { a: 0.55 }));
    F.lbl(c, 'damlacıklar birleşir', zx, zy + zr + 50, E.se(t, s0 + 2.0, s0 + 2.6), { align: 'center', weight: 700 });
    F.lbl(c, 'ağırlaşınca düşer', zx, zy + zr + 95, E.se(t, s0 + 3.6, s0 + 4.2), { align: 'center', color: PAL.water });
  }
  function snow(c, t) {
    const s0 = E.s('snow');
    F.cloud(c, 700, 320, 1.2, 250, { dark: 0.4 });
    F.thermo(c, 400, 380, 110, 0.12, { color: PAL.water });
    F.lbl(c, '0 °C altı', 500, 300, E.se(t, s0 + 0.8, s0 + 1.4), { size: 40, weight: 700, color: PAL.water });
    const fk = E.se(t, s0 + 1.2, s0 + 2.0);
    if (fk > 0) falling(c, t * 0.5, 420, 980, 460, 880, 22, 251, (x, y, i) => { c.save(); c.globalAlpha *= fk; F.flake(c, x, y, 10, t * 0.5 + i, { w: 1.8 }); c.restore(); });
    const zx = 1150, zy = 400, zr = 130;
    P.fillPts(c, circlePts(zx, zy, zr, zr, 50), '#FBF8F1', 0.95); stroke(c, circlePts(zx, zy, zr, zr, 50), { w: 4, closed: true, seed: 253 });
    line(c, [zx - zr * 0.7, zy + zr * 0.7], [zx - zr * 1.2, zy + zr * 1.2], { w: 9, seed: 254 });
    F.flake(c, zx, zy, 80 * E.se(t, s0 + 1.6, s0 + 3.0, 'out'), 0.2, { w: 4 });
    F.lbl(c, 'su buharı → buz kristali', zx, zy + zr + 50, E.se(t, s0 + 2.6, s0 + 3.2), { align: 'center', weight: 700 });
    F.lbl(c, '(gaz → katı)', zx, zy + zr + 95, E.se(t, s0 + 3.0, s0 + 3.6), { align: 'center', color: PAL.water });
  }
  function hail(c, t) {
    const s0 = E.s('hail');
    F.cloud(c, 700, 470, 1.35, 260, { dark: 0.8 }); F.cloud(c, 700, 250, 1.0, 262, { dark: 0.6 });
    F.lbl(c, 'soğuk (0 °C altı)', 700, 225, E.se(t, s0 + 1.8, s0 + 2.4), { size: 36, weight: 700, align: 'center', color: PAL.water });
    const ak = E.se(t, s0 + 0.5, s0 + 1.5);
    [560, 640].forEach((x, i) => F.upArrow(c, x, 560, E.lerp(560, 300, ak), { ph: i, seed: 263 + i, color: PAL.ink, w: 4.5, alpha: 1 }));
    F.lbl(c, 'güçlü yukarı hava akımı', 470, 640, E.se(t, s0 + 1.0, s0 + 1.6), { size: 34, weight: 700, align: 'center' });
    // dolaşan dolu tanesi (yukarı–aşağı)
    const ph = (t - s0) * 1.2; const hx = 800 + Math.cos(ph) * 70, hy = 400 + Math.sin(ph) * 130;
    F.hail(c, hx, hy, 12 + 6 * E.se(t, s0 + 2, s0 + 6), 3);
    const fk = E.se(t, s0 + 5.5, s0 + 6.3);
    if (fk > 0) falling(c, t, 440, 960, 640, 880, 14, 265, (x, y) => { c.save(); c.globalAlpha *= fk; F.hail(c, x, y, 11, 2); c.restore(); });
    const zx = 1150, zy = 420;
    const zk = E.se(t, s0 + 3.2, s0 + 4.0, 'out');
    if (zk > 0) { F.hail(c, zx, zy, 110 * zk, 4); F.lbl(c, 'donma: buz katmanları', zx, zy + 170, E.se(t, s0 + 3.8, s0 + 4.4), { align: 'center', weight: 700 }); F.lbl(c, '(kesit)', zx, zy + 212, E.se(t, s0 + 3.8, s0 + 4.4), { align: 'center', size: 32, alpha: 0.7 }); }
  }
  function dew(c, t) {
    const s0 = E.s('dew'), mid = 755;
    P.moon(c, mid, 240, 42);
    F.lbl(c, 'açık ve serin gece', mid, 330, E.se(t, s0 + 0.4, s0 + 1.0), { size: 34, align: 'center', alpha: 0.8 });
    line(c, [mid, 360], [mid + 2, 880], { w: 2, alpha: 0.4, dry: false, seed: 270 });
    const leaf = (cx, cy, seed) => { const pts = P.bez([cx - 180, cy + 40], [cx, cy - 120], [cx + 180, cy - 10], 20).concat(P.bez([cx + 180, cy - 10], [cx + 10, cy + 110], [cx - 180, cy + 40], 20)); P.fillPts(c, pts, PAL.life, 0.55); stroke(c, pts, { w: 3, closed: true, seed }); line(c, [cx - 180, cy + 40], [cx + 170, cy - 8], { w: 2, seed: seed + 1, alpha: 0.7 }); };
    leaf(450, 620, 271); leaf(1060, 620, 273);
    const k1 = E.se(t, s0 + 0.8, s0 + 2.2);
    [[-90, -10], [-20, -30], [50, -20], [110, -25], [-50, 30], [30, 20]].forEach(([dx, dy], i) => { if (k1 > i / 6) F.drop(c, 450 + dx, 620 + dy, 9, { a: 0.7 }); });
    F.lbl(c, 'Çiy', 450, 450, E.se(t, s0 + 0.5, s0 + 1.1), { size: 52, weight: 700, align: 'center', color: PAL.water });
    F.lbl(c, '0 °C üstü · yoğuşma', 450, 790, E.se(t, s0 + 1.6, s0 + 2.2), { size: 36, align: 'center' });
    const k2 = E.se(t, s0 + 4.0, s0 + 5.4);
    [[-90, -10], [-20, -30], [50, -20], [110, -25], [-50, 30], [30, 20], [0, 0]].forEach(([dx, dy], i) => { if (k2 > i / 7) F.flake(c, 1060 + dx, 620 + dy, 11, i, { w: 1.8, color: '#EEF4F7' }); if (k2 > i / 7) F.flake(c, 1060 + dx, 620 + dy, 11, i, { w: 0.9, color: PAL.water }); });
    F.lbl(c, 'Kırağı', 1060, 450, E.se(t, s0 + 3.6, s0 + 4.2), { size: 52, weight: 700, align: 'center', color: PAL.water });
    F.lbl(c, '0 °C altı · kırağılaşma', 1060, 790, E.se(t, s0 + 5.0, s0 + 5.6), { size: 36, align: 'center' });
  }
  function fog(c, t) {
    const s0 = E.s('fog');
    const hill = [[150, 760], [400, 700], [700, 740], [1000, 690], [1360, 730], [1360, 900], [150, 900]];
    P.fillPts(c, hill, PAL.life, 0.3); stroke(c, hill.slice(0, 5), { w: 3, seed: 281 });
    [[330, 700], [620, 725], [900, 690], [1180, 705]].forEach(([x, y], i) => { line(c, [x, y + 20], [x + 3, y - 90], { w: 6, seed: 282 + i }); const cr = circlePts(x + 3, y - 120, 45, 40, 24); wash(c, cr, PAL.life, 0.45, 290 + i, { bleed: 2 }); stroke(c, cr, { w: 2.4, closed: true, seed: 295 + i }); });
    const fk = E.se(t, s0 + 0.5, s0 + 3.0);
    for (let i = 0; i < 5; i++) { const y = 560 + i * 45, x = 150 + ((t * 20 + i * 90) % 200) - 100; c.save(); c.globalAlpha = 0.55 * fk; c.fillStyle = '#F4F2EE'; c.beginPath(); c.ellipse(x + 600, y, 700, 34, 0, 0, 7); c.fill(); c.restore(); }
    F.lbl(c, 'yere yakın havada yoğuşma', 750, 420, E.se(t, s0 + 1.5, s0 + 2.1), { size: 42, weight: 700, align: 'center' });
    F.lbl(c, 'havada asılı minik damlacıklar → görüş azalır', 750, 480, E.se(t, s0 + 3.0, s0 + 3.6), { size: 36, align: 'center', color: PAL.water });
  }
  const DRAW = { air, rain, snow, hail, dew, fog };
  E.scene({
    name: 'Oluşumlar', concept: 'Hava olaylarının oluşumu', from: 'air', to: 'fog', trFrom: [960, 540],
    draw(ctx, t) {
      Object.keys(DRAW).forEach(id => F.fade(ctx, vis(t, id), c => DRAW[id](c, t)));
      // hâl değişimi tablosu
      const tk = E.se(t, E.s('rain') + 0.2, E.s('rain') + 0.8);
      F.fade(ctx, tk, c => {
        F.card(c, 1400, 170, 470, 700, { seed: 300 });
        INK.label(c, 'Olay', 1440, 240, { size: 36, weight: 700 });
        INK.label(c, 'Hâl değişimi', 1840, 240, { size: 36, weight: 700, align: 'right' });
        stroke(c, [[1430, 258], [1845, 260]], { w: 2.4, dry: false, seed: 301 });
        ROWS.forEach((r, i) => {
          const s0 = E.s(r[2]) + (i === 4 ? 4.2 : 0.8), k = E.se(t, s0, s0 + 0.6);
          if (k <= 0) return; const y = 330 + i * 92;
          c.save(); c.globalAlpha *= k;
          INK.label(c, r[0], 1440, y, { size: 40, weight: 700, color: PAL.water });
          INK.label(c, r[1], 1840, y, { size: 38, align: 'right', color: r[1] === 'donma' ? PAL.ink : r[1] === 'yoğuşma' ? PAL.water : F.BROWN });
          c.restore();
        });
      });
      DAMLA.draw(ctx, { x: 1300, y: 905, s: 0.7, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.5], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 2, arms: [[-1, 2.0], [1, 0.35]] });
    }
  });
})();

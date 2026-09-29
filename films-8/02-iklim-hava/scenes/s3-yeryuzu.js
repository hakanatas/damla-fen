// SAHNE 3 — Yaşamı büyük ölçekte etkileyen hava olayları; hava olaylarının yeryüzü şekillerine etkisi (kıyı, çöl, peri bacaları)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F82;
  const vis = (t, a, b) => Math.min(E.se(t, E.s(a) + 0.1, E.s(a) + 0.7), 1 - E.se(t, E.e(b) - 0.25, E.e(b) + 0.25));
  function storm(c, t) {
    const s0 = E.s('storm');
    const cards = [['Fırtına', 0], ['Kasırga', 1], ['Hortum', 2], ['Dolu', 3]];
    cards.forEach(([n, i]) => {
      const k = E.se(t, s0 + 0.3 + i * 0.8, s0 + 0.9 + i * 0.8, 'out'); if (k <= 0) return;
      const x = 170 + i * 420, y = 200, w = 340, h = 440, cx = x + w / 2, cy = y + 200;
      c.save(); c.globalAlpha *= k;
      F.card(c, x, y, w, h, { seed: 400 + i });
      if (i === 0) { // eğilen ağaç + rüzgâr
        const bend = 0.25 + 0.08 * Math.sin(t * 3);
        line(c, [cx - 40, cy + 130], [cx - 40 + 120 * bend, cy - 40], { w: 8, seed: 410, bend: 0.1 });
        const cr = circlePts(cx - 40 + 150 * bend + 20, cy - 80, 70, 50, 24); wash(c, cr, PAL.life, 0.5, 411); stroke(c, cr, { w: 2.4, closed: true, seed: 412 });
        [0, 1, 2].forEach(j => F.wind(c, x + 20, cy - 110 + j * 70, 150, t, { ph: j, seed: 413 + j }));
      } else if (i === 1) { // kasırga (üstten, spiral)
        for (let a = 0; a < 3; a++) { const pts = []; for (let j = 0; j <= 40; j++) { const q = j / 40, ang = a * 2.094 - q * 5 - t * 1.5, r = 20 + q * 120; pts.push([cx + Math.cos(ang) * r, cy + Math.sin(ang) * r * 0.9]); } stroke(c, pts, { w: 4, color: '#6E7482', dry: false, seed: 420 + a }); }
        stroke(c, circlePts(cx, cy, 16, 14, 20), { w: 2.4, closed: true, seed: 424 });
      } else if (i === 2) { // hortum
        F.cloud(c, cx, cy - 110, 0.55, 430, { dark: 0.8 });
        const pts = []; for (let j = 0; j <= 20; j++) { const q = j / 20; pts.push([cx + Math.sin(q * 6 + t * 4) * 8 * q + (q * q) * 30, cy - 60 + q * 200]); }
        const wid = q => 55 * (1 - q) + 8;
        const L = pts.map((p, j) => [p[0] - wid(j / 20), p[1]]), Rr = pts.map((p, j) => [p[0] + wid(j / 20), p[1]]).reverse();
        const poly = L.concat(Rr); P.fillPts(c, poly, '#8E939E', 0.7); stroke(c, poly, { w: 2.4, closed: true, seed: 431, dry: false });
        line(c, [x + 30, cy + 142], [x + w - 30, cy + 142], { w: 3, seed: 432 });
      } else { // dolu
        F.cloud(c, cx, cy - 110, 0.55, 440, { dark: 0.8 });
        const R = INK.rng(441); for (let j = 0; j < 9; j++) { const hx = x + 50 + R() * (w - 100), ph = (t * 0.8 + R()) % 1; F.hail(c, hx, cy - 30 + ph * 170, 10, 2); }
        line(c, [x + 30, cy + 142], [x + w - 30, cy + 142], { w: 3, seed: 442 });
      }
      INK.label(c, n, cx, y + h - 40, { size: 44, weight: 700, align: 'center' });
      c.restore();
    });
    F.lbl(c, 'Araştır, poster yap: yaşamı nasıl etkiler? Nasıl korunuruz?', 960, 730, E.se(t, s0 + 4.0, s0 + 4.8), { size: 40, align: 'center', color: PAL.water, weight: 700 });
  }
  function land(c, t) {
    const s0 = E.s('land');
    // kıyı: yalıyar + dalga
    const cliff = [[160, 420], [520, 430], [560, 520], [540, 620], [600, 760], [600, 860], [160, 860]];
    P.fillPts(c, cliff, '#B08A5E', 0.55); stroke(c, cliff.slice(0, 6), { w: 3, seed: 450 });
    const sea = [[560, 700], [900, 700], [900, 860], [600, 860]];
    P.fillPts(c, sea, PAL.water, 0.35);
    for (let i = 0; i < 3; i++) { const wx = 880 - ((t * 60 + i * 110) % 330); stroke(c, P.arc(wx, 700, 34, Math.PI, Math.PI * 1.85, 12), { w: 3.4, color: PAL.water, dry: false, seed: 451 + i }); }
    // aşınmış parçalar
    [[620, 845, 12], [660, 850, 9], [700, 852, 7]].forEach(([x, y, r], i) => P.fillPts(c, circlePts(x, y, r, r * 0.7, 12), '#8C7A60', 0.9));
    F.lbl(c, 'Dalgalar kıyıyı aşındırır', 530, 330, E.se(t, s0 + 1.8, s0 + 2.4), { size: 42, weight: 700, align: 'center' });
    // çöl kum tepeleri
    const shift = E.se(t, s0 + 4, s0 + 8) * 70;
    [[1170, 720, 150], [1420, 700, 180], [1660, 730, 140]].forEach(([x, y, r], i) => {
      const xx = x + shift * (1 - i * 0.2);
      const dune = P.bez([xx - r * 1.3, 860], [xx - r * 0.2, y - r * 0.7], [xx + r * 0.5, 860], 24);
      P.fillPts(c, dune, '#E0B870', 0.6); stroke(c, dune, { w: 3, seed: 460 + i });
      c.save(); c.globalAlpha *= 0.3; stroke(c, [[xx - r * 1.05, 860 - r * 0.02]].concat(P.bez([xx - r * 1.05, 860], [xx - r * 0.25, y - r * 0.42], [xx + r * 0.3, 860], 16)), { w: 1.6, dry: false, seed: 466 + i }); c.restore();
    });
    stroke(c, [[960, 862], [1860, 862]], { w: 3, seed: 469 });
    [0, 1].forEach(j => F.wind(c, 980, 420 + j * 70, 220, t, { ph: j, seed: 470 + j }));
    F.lbl(c, 'Rüzgâr kum tepelerini taşır', 1400, 330, E.se(t, s0 + 4.5, s0 + 5.1), { size: 42, weight: 700, align: 'center' });
    F.lbl(c, '→ çöllerin haritasını çıkarmak zordur', 1400, 385, E.se(t, s0 + 6.0, s0 + 6.6), { size: 36, align: 'center', color: F.BROWN });
  }
  function peri(c, t) {
    const s0 = E.s('peri');
    const base = 860;
    const ground = [[160, base - 40], [1760, base - 60], [1760, base], [160, base]];
    P.fillPts(c, ground, '#D9C3A0', 0.6);
    [[520, 330, 90], [760, 260, 110], [1000, 360, 80], [1230, 300, 95], [1450, 380, 70]].forEach(([x, top, hw], i) => {
      const cone = [[x - hw, base - 40], [x - hw * 0.35, top + 40], [x + hw * 0.35, top + 40], [x + hw, base - 40]];
      P.fillPts(c, cone, '#E6CFA6', 0.95); wash(c, cone, '#C9A474', 0.35, 480 + i, { bleed: 2, blooms: 1 }); stroke(c, cone, { w: 3, seed: 485 + i });
      const hat = circlePts(x, top + 30, hw * 0.55, 26, 24); P.fillPts(c, hat, '#6E5A48', 0.95); stroke(c, hat, { w: 2.6, closed: true, seed: 490 + i });
    });
    const rk = E.se(t, s0 + 0.8, s0 + 1.6);
    if (rk > 0) { const R = INK.rng(495); for (let i = 0; i < 30; i++) { const x = 300 + R() * 1400, ph = (t * 1.3 + R()) % 1, y = 180 + ph * 250; line(c, [x, y], [x - 6, y + 22], { w: 2, color: PAL.water, dry: false, alpha: 0.6 * rk, seed: 496 + i }); } }
    [0, 1].forEach(j => F.wind(c, 180, 560 + j * 80, 200, t, { ph: j, seed: 500 + j }));
    F.lbl(c, 'Kapadokya · peri bacaları', 960, 200, E.se(t, s0 + 0.4, s0 + 1.0), { size: 50, weight: 700, align: 'center', color: F.BROWN });
    F.lbl(c, 'sert kaya “şapka” alttaki yumuşak kayayı korur', 960, 255, E.se(t, s0 + 3.5, s0 + 4.1), { size: 34, align: 'center', alpha: 0.85 });
  }
  E.scene({
    name: 'Büyük olaylar · yeryüzü', concept: 'Etkiler', from: 'storm', to: 'peri', trFrom: [960, 400],
    draw(ctx, t) {
      F.fade(ctx, vis(t, 'storm', 'storm'), c => storm(c, t));
      F.fade(ctx, vis(t, 'land', 'land'), c => land(c, t));
      F.fade(ctx, vis(t, 'peri', 'peri'), c => peri(c, t));
      DAMLA.draw(ctx, { x: 1790, y: 905, s: 0.7, view: 'q3', flip: true, expr: t > E.s('peri') ? 'happy' : 'surprised', look: [-0.8, -0.5], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.35], [1, 0.35]] });
    }
  });
})();

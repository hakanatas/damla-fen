// SAHNE 3 — Isı iletiminin nitelikleri (FB.5.5.5 a): tanecikten taneciğe aktarım; iletken / yalıtkan tanımı
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F20;
  function bar(ctx, x0, x1, y, rows, front, t, o = {}) {
    const H = rows * 34 + 26, cols = Math.round((x1 - x0) / 46);
    const box = [[x0, y - H / 2], [x1, y - H / 2 - 3], [x1 + 3, y + H / 2], [x0 + 2, y + H / 2 + 2], [x0, y - H / 2]];
    P.fillPts(ctx, box, o.fill ?? '#EEF1F2', 0.9); if (o.grain) { ctx.save(); ctx.globalAlpha = 0.3; for (let i = 0; i < 6; i++) line(ctx, [x0 + 10, y - H / 2 + 10 + i * H / 6], [x1 - 10, y - H / 2 + 14 + i * H / 6], { w: 1.2, color: '#6B4A25', dry: false, seed: 3400 + i }); ctx.restore(); }
    stroke(ctx, box, { w: 3, closed: true, seed: o.seed ?? 3401 });
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const u = (c + 0.5) / cols, h = E.clamp((front - u) / 0.18 + 0.5) * (front > 0 ? 1 : 0);
      const amp = 1.5 + 8 * h, ph = r * 1.7 + c * 2.3;
      const px = x0 + (c + 0.5) * (x1 - x0) / cols + Math.sin(t * (9 + 6 * h) + ph) * amp, py = y - (rows - 1) * 17 + r * 34 + Math.cos(t * (8 + 5 * h) + ph * 1.3) * amp;
      ctx.save(); ctx.fillStyle = F.mixCol('#2E6A8C', '#B5553F', h); ctx.globalAlpha = 0.75; ctx.beginPath(); ctx.arc(px, py, 11, 0, 7); ctx.fill(); ctx.restore();
      stroke(ctx, circlePts(px, py, 11, 11, 14), { w: 1.4, closed: true, dry: false, seed: 3410 + (r * cols + c) % 20 });
    }
  }
  function source(ctx, x, y, h, t) {
    const b = [[x - 70, y - h / 2], [x + 10, y - h / 2], [x + 10, y + h / 2], [x - 70, y + h / 2], [x - 70, y - h / 2]];
    P.fillPts(ctx, b, '#F2C9A8'); wash(ctx, b, F.HEAT, 0.5, 3420, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 3421 });
    for (let i = 0; i < 3; i++) { const p = []; for (let j = 0; j <= 16; j++) { const u = j / 16; p.push([x - 50 + i * 22 + Math.sin(u * 8 + t * 5 + i) * 5, y - h / 2 - 8 - u * 46]); } stroke(ctx, p, { w: 2.6, color: F.HEAT, dry: false }); }
  }
  E.scene({
    name: 'Isı iletimi', concept: 'Tanecikten taneciğe ısı aktarımı; iletken ve yalıtkan', from: 'conduct', to: 'define', trFrom: [300, 500],
    draw(ctx, t) {
      const sc = E.s('conduct'), sd = E.s('define');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const sw = E.se(t, sd - 0.3, sd + 0.6);
      // layout A: single bar
      if (sw < 1) E.layer(ctx, 1 - sw, c => {
        const front = E.se(t, sc + 1.2, sc + 7.5, 'sine') * 1.05;
        source(c, 330, 500, 200, t);
        bar(c, 340, 1540, 500, 3, front, t);
        const fx = 340 + 1200 * Math.min(1, front);
        if (front > 0.02) { P.arrow(c, [360, 360], [Math.max(420, fx), 360], 1, { w: 5, color: F.HEAT, head: 20 }); INK.label(c, 'ısı', (360 + Math.max(420, fx)) / 2, 335, { size: 42, weight: 700, color: F.HEAT, align: 'center' }); }
        INK.label(c, 'sıcak uç', 400, 660, { size: 40, weight: 700, color: F.HEAT, align: 'center' });
        INK.label(c, 'soğuk uç', 1480, 660, { size: 40, weight: 700, color: PAL.water, align: 'center' });
        P.write(c, 'Titreşen tanecikler, komşularını da titreştirir.', 960, 780, E.seg(t, sc + 3.5, sc + 5.5), { size: 46, align: 'center' });
        INK.label(c, '(model; ölçekli değildir)', 1540, 250, { size: 28, align: 'right', alpha: 0.6 });
      });
      // layout B: metal vs wood
      if (sw > 0) E.layer(ctx, sw, c => {
        const fm = E.se(t, sd + 0.6, sd + 4.5) * 1.05, fw = E.se(t, sd + 0.6, sd + 6) * 0.2;
        source(c, 470, 330, 150, t); source(c, 470, 650, 150, t);
        bar(c, 480, 1300, 330, 2, fm, t, { fill: '#E6EAEC' });
        bar(c, 480, 1300, 650, 2, fw, t, { fill: '#EBD9BF', grain: true, seed: 3430 });
        INK.label(c, 'metal', 340, 345, { size: 44, weight: 700, align: 'right' });
        INK.label(c, 'tahta', 340, 665, { size: 44, weight: 700, align: 'right' });
        const lk1 = E.se(t, sd + 2.2, sd + 3), lk2 = E.se(t, sd + 4.2, sd + 5);
        if (lk1 > 0) { P.write(c, 'ısıyı iyi iletir', 1360, 320, lk1, { size: 42 }); P.write(c, 'ısı iletkeni', 1360, 380, E.seg(lk1, 0.3, 1), { size: 50, color: F.HEAT }); }
        if (lk2 > 0) { P.write(c, 'ısıyı iyi iletmez', 1360, 640, lk2, { size: 42 }); P.write(c, 'ısı yalıtkanı', 1360, 700, E.seg(lk2, 0.3, 1), { size: 50, color: PAL.water }); }
      });
      DAMLA.draw(ctx, { x: 1700, y: 930 - 0 * sw, s: 0.95, view: 'q3', flip: true, t, seed: 4, blink: E.blink(t, 5), squash: E.breath(t), talk: E.talk(t), expr: 'curious', look: [-0.8, -0.6], arms: [[-1, 0.35], [1, 2.3 + Math.sin(t * 2) * 0.08]] });
    }
  });
})();

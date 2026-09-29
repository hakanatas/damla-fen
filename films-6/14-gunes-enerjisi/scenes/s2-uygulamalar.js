// SAHNE 2 — Güneş enerjisinin günlük hayat ve teknolojideki uygulamaları (FB.6.4.7; OB1: örnek verme)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F614;
  const CARDS = [
    { id: 'drying', x: 150, y: 190, title: 'Güneşte kurutma' },
    { id: 'collector', x: 990, y: 190, title: 'Güneş kolektörü: suyu ısıtır' },
    { id: 'panel', x: 150, y: 570, title: 'Güneş paneli: ışık → elektrik' },
    { id: 'examples', x: 990, y: 570, title: 'Teknolojide' }
  ];
  const CW = 780, CH = 330;
  function drying(c, x, y, t, k) {
    P.sun(c, x + 90, y + 110, 40, t, { nrays: 12, cells: false, glow: false });
    line(c, [x + 180, y + 110], [x + 740, y + 118], { w: 2, dry: false, seed: 101 });
    // shirt
    const sx = x + 260, sy = y + 175; const sh = [[sx - 40, sy - 55], [sx + 40, sy - 55], [sx + 70, sy - 30], [sx + 50, sy - 10], [sx + 38, sy - 20], [sx + 38, sy + 60], [sx - 38, sy + 60], [sx - 38, sy - 20], [sx - 50, sy - 10], [sx - 70, sy - 30], [sx - 40, sy - 55]];
    P.fillPts(c, sh, '#9EB7C8'); stroke(c, sh, { w: 2.4, closed: true, seed: 102 });
    // string of red peppers
    for (let i = 0; i < 7; i++) { const px = x + 420, py = y + 130 + i * 24; const pp = [[px - 10, py], [px + 10, py], [px + 4, py + 26], [px, py + 30], [px - 4, py + 26], [px - 10, py]]; P.fillPts(c, pp, '#B84532', 0.9); stroke(c, pp, { w: 1.6, closed: true, dry: false, seed: 110 + i }); }
    line(c, [x + 420, y + 116], [x + 420, y + 300], { w: 1.2, dry: false, alpha: 0.6 });
    // tray of apricots
    const tr = [[x + 500, y + 280], [x + 740, y + 280], [x + 720, y + 305], [x + 520, y + 305], [x + 500, y + 280]]; P.fillPts(c, tr, '#C9A878'); stroke(c, tr, { w: 2.2, closed: true, seed: 120 });
    for (let i = 0; i < 6; i++) { const ax = x + 530 + i * 36, ay = y + 268; P.fillPts(c, circlePts(ax, ay, 15, 12, 14), '#E39A3A', 0.95); stroke(c, circlePts(ax, ay, 15, 12, 14), { w: 1.6, closed: true, dry: false }); }
    INK.label(c, 'çamaşır · biber · kayısı', x + 600, y + 200, { size: 30, weight: 700, align: 'center', alpha: 0.8 });
  }
  function collector(c, x, y, t, k) {
    P.sun(c, x + 90, y + 110, 40, t, { nrays: 12, cells: false, glow: false });
    const roof = [[x + 220, y + 320], [x + 480, y + 110], [x + 740, y + 320]]; P.fillPts(c, roof.concat([roof[0]]), F.HEAT, 0.5); stroke(c, roof, { w: 3, seed: 130 });
    // collector on the right slope
    c.save(); c.translate(x + 590, y + 250); c.rotate(0.68); c.translate(-(x + 590), -(y + 250));
    const tank = [[x + 500, y + 160], [x + 690, y + 160], [x + 690, y + 200], [x + 500, y + 200], [x + 500, y + 160]]; P.fillPts(c, tank, '#E3DDCF'); P.fillPts(c, tank, F.HEAT, 0.45 * E.se(t, E.s('collector') + 3, E.s('collector') + 5)); stroke(c, tank, { w: 2.4, closed: true, seed: 131 });
    const pl = [[x + 500, y + 205], [x + 690, y + 205], [x + 690, y + 260], [x + 500, y + 260], [x + 500, y + 205]]; P.fillPts(c, pl, '#26252C', 0.95); stroke(c, pl, { w: 2.4, closed: true, seed: 132 });
    for (let i = 1; i < 7; i++) line(c, [x + 500 + i * 27, y + 207], [x + 500 + i * 27, y + 258], { w: 1.4, color: '#8C8578', dry: false });
    c.restore();
    [0, 1, 2].forEach(i => F.ray(c, [x + 135, y + 120 + i * 18], [x + 520 + i * 40, y + 190 + i * 20], E.se(t, E.s('collector') + 1 + i * 0.2, E.s('collector') + 2 + i * 0.2), { w: 2.6, head: 12, seed: 140 + i }));
    const hk = E.se(t, E.s('collector') + 2.4, E.s('collector') + 3.4);
    for (let i = 0; i < 3; i++) F.squiggle(c, x + 560 + i * 45, y + 170 + i * 30, t, i, hk, 40);
    if (hk > 0) { INK.label(c, 'depodaki', x + 30, y + 272, { size: 30, weight: 700, color: F.HEAT, alpha: hk }); INK.label(c, 'su ısınır', x + 30, y + 310, { size: 30, weight: 700, color: F.HEAT, alpha: hk }); }
    INK.label(c, 'koyu yüzey ışığı soğurur', x + 250, y + 110, { size: 28, weight: 700, alpha: E.se(t, E.s('collector') + 3, E.s('collector') + 3.6) });
  }
  function panel(c, x, y, t, k) {
    const sp = E.s('panel');
    P.sun(c, x + 90, y + 110, 40, t, { nrays: 12, cells: false, glow: false });
    F.standPanel(c, x + 340, y + 310, 230, { shine: 1 });
    [0, 1, 2].forEach(i => F.ray(c, [x + 135, y + 110 + i * 18], [x + 260 + i * 50, y + 170 + i * 10], E.se(t, sp + 0.6 + i * 0.2, sp + 1.6 + i * 0.2), { w: 2.6, head: 12, seed: 150 + i }));
    const wk = E.se(t, sp + 1.8, sp + 3.0);
    if (wk > 0) P.drawOn(c, [[x + 440, y + 230], [x + 520, y + 260], [x + 600, y + 260], [x + 620, y + 220]], wk, { w: 3, color: PAL.ink });
    F.bulb(c, x + 640, y + 170, 1.1, E.se(t, sp + 3.0, sp + 3.6));
    INK.label(c, 'elektrik', x + 560, y + 300, { size: 30, weight: 700, alpha: E.se(t, sp + 3.2, sp + 3.8) });
  }
  function examples(c, x, y, t, k) {
    const s0 = E.s('examples');
    [['calculator', 'hesap makinesi'], ['streetlamp', 'sokak lambası'], ['pump', 'sulama pompası'], ['satellite', 'uydu']].forEach(([ic, n], i) => {
      const at = s0 + 0.3 + i * 1.6, kk = E.se(t, at, at + 0.6, 'out'); if (kk <= 0) return;
      const ix = x + 105 + i * 190, iy = y + 190;
      c.save(); c.translate(ix, iy); c.scale(P.pop(kk), P.pop(kk)); c.translate(-ix, -iy); F.icon[ic](c, ix, iy, i === 3 ? 0.75 : 0.85); c.restore();
      INK.label(c, n, ix, y + 305, { size: 25, weight: 700, align: 'center', alpha: kk });
    });
  }
  const DRAW = { drying, collector, panel, examples };
  E.scene({
    name: 'Uygulamalar', concept: 'Günlük hayatta ve teknolojide güneş enerjisi', from: 'drying', to: 'examples', trFrom: [960, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(227,160,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      CARDS.forEach((cd, i) => {
        const s = E.s(cd.id), k = E.se(t, s - 0.1, s + 0.6, 'out'); if (k <= 0) return;
        const active = t < E.e(cd.id) || cd.id === 'examples';
        E.layer(ctx, k * (active ? 1 : 0.8), c => {
          c.save(); c.translate(cd.x + CW / 2, cd.y + CH / 2); c.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); c.translate(-(cd.x + CW / 2), -(cd.y + CH / 2));
          F.card(c, cd.x, cd.y, CW, CH, { seed: 160 + i, color: active ? F.AMB : PAL.ink, w: active ? 3.2 : 2.4 });
          c.save(); P.path(c, [[cd.x, cd.y - 6], [cd.x + CW + 6, cd.y - 6], [cd.x + CW + 6, cd.y + CH + 4], [cd.x, cd.y + CH + 4]]); c.closePath(); c.clip();
          DRAW[cd.id](c, cd.x, cd.y, t, k);
          c.restore();
          INK.label(c, cd.title, cd.x + 30, cd.y + 52, { size: 38, weight: 700 });
          c.restore();
        });
      });
    }
  });
})();

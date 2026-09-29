// SAHNE 9 — Sıra sende (model tasarla, sun, karşılaştır, yenile · SDB2.1, D16.3) + araştırma + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  function task(ctx, t) {
    const st = E.s('task'), sr = E.s('research');
    F.card(ctx, 230, 170, 1440, 700, { seed: 160 });
    P.write(ctx, 'Sıra sende!', 310, 270, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: F.AMBER_D });
    P.drawOn(ctx, P.bez([306, 292], [500, 302], [700, 288], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
    P.write(ctx, '1. Atık malzemelerle bir gözlem aracı modeli tasarla:', 310, 380, E.seg(t, st + 1.2, st + 2.6), { size: 44 });
    const icons = [(c, x, y) => P.icon.binoculars(c, x, y, 0.55), (c, x, y) => P.icon.telescope(c, x, y - 10, 0.6), (c, x, y) => F.satellite(c, x, y, 0.3, t), (c, x, y) => F.rover(c, x, y + 30, 0.35, t)];
    ['dürbün', 'teleskop', 'uydu', 'gezici araç'].forEach((n, i) => { const k = E.se(t, st + 2.6 + i * 0.5, st + 3.1 + i * 0.5, 'out'); if (k <= 0) return; const x = 470 + i * 300;
      E.layer(ctx, k, c => { icons[i](c, x, 470); INK.label(c, n, x, 560, { size: 36, weight: 700, align: 'center' }); }); });
    P.write(ctx, '2. Arkadaşlarına sun, onları dinle; modelleri karşılaştır ve geliştir.', 310, 650, E.seg(t, st + 5.0, st + 6.6), { size: 40 });
    P.write(ctx, '3. Araştır: Alper Gezeravcı’nın görev armasındaki', 310, 745, E.seg(t, sr + 0.2, sr + 1.4), { size: 40, color: PAL.water });
    P.write(ctx, '    semboller ne anlatıyor?', 310, 800, E.seg(t, sr + 1.2, sr + 2.0), { size: 40, color: PAL.water });
  }
  function next(ctx, t) {
    const sn = E.s('next');
    F.night(ctx, 1);
    F.stars(ctx, t, 1, { n: 70, seed: 78, area: [0, 0, E.W, 900] });
    P.earth(ctx, 1400, 640, 170);
    // görevi biten uydular ve parçalar
    for (let i = 0; i < 16; i++) { const R = INK.rng(300 + i); const a = R() * 6.28 + t * 0.12 * (R() > 0.5 ? 1 : -1), d = 240 + R() * 90; F.shard(ctx, 1400 + Math.cos(a) * d, 640 + Math.sin(a) * d * 0.55, 6 + R() * 9, 300 + i); }
    F.satellite(ctx, 1400 + Math.cos(t * 0.2) * 300, 640 + Math.sin(t * 0.2) * 160, 0.3, t, { rot: t * 0.3 });
    DAMLA.draw(ctx, { x: 480, y: 905, s: 1.3, view: 'front', expr: 'curious', look: [0.8, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 700, 260, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center', color: '#FBF3DC' });
    E.inkText(ctx, '2 · Uzay Kirliliği', 700, 345, t, sn + 1.2, E.e('end'), { size: 70, align: 'center', color: '#FBF3DC' });
    F.endCard(ctx, t, E.s('end'), '1', 'Uzayı Keşfeden Teknolojiler', 'FB.7.1.1 · FB.7.1.2');
  }
  E.scene({
    name: 'Sıra sende', concept: 'Model görevi', from: 'task', to: 'research', trFrom: [960, 540],
    draw(ctx, t) {
      task(ctx, t);
      DAMLA.draw(ctx, { x: 1770, y: 905, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({ name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [1400, 640], draw(ctx, t) { next(ctx, t); } });
})();

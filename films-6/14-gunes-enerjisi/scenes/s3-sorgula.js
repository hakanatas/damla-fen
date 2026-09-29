// SAHNE 3 — Sorgula (FB.6.4.7 a: fikirleri sorgular) — gece / bulutlu gün; depolama
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F614, RED = F614.RED;
  const COLS = [
    { x: 420, n: 'güneşli gün', sky: 'rgba(227,160,58,0.18)', prod: 1 },
    { x: 960, n: 'bulutlu gün', sky: 'rgba(120,128,140,0.18)', prod: 0.3 },
    { x: 1500, n: 'gece', sky: 'rgba(24,25,40,0.55)', prod: 0 }
  ];
  E.scene({
    name: 'Sorgula', concept: 'Güneş enerjisi her zaman işe yarar mı?', from: 'question', to: 'cloud', trFrom: [960, 300],
    draw(ctx, t) {
      const sq = E.s('question'), sc = E.s('claim'), scl = E.s('cloud');
      const appear = [sq + 0.4, scl + 0.2, sc + 4.4];
      COLS.forEach((C, i) => {
        const k = E.se(t, appear[i], appear[i] + 0.7, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          const x0 = C.x - 240, y0 = 400;
          const fr = [[x0, y0], [x0 + 480, y0 - 4], [x0 + 484, y0 + 330], [x0 + 2, y0 + 334], [x0, y0]];
          P.fillPts(c, fr, '#FAF6EC'); P.fillPts(c, fr, C.sky); stroke(c, fr, { w: 2.6, closed: true, seed: 200 + i });
          if (i === 0) { P.sun(c, x0 + 90, y0 + 80, 45, t, { nrays: 12, cells: false, glow: false }); [0, 1].forEach(j => F.ray(c, [x0 + 130, y0 + 100 + j * 20], [x0 + 250 + j * 40, y0 + 180 + j * 10], 1, { w: 2.6, head: 12, seed: 210 + j })); }
          if (i === 1) { P.sun(c, x0 + 110, y0 + 80, 40, t, { nrays: 10, cells: false, glow: false }); F.cloud(c, x0 + 150, y0 + 105, 0.8, 3); F.ray(c, [x0 + 230, y0 + 130], [x0 + 300, y0 + 185], 1, { w: 2, head: 10, alpha: 0.5, seed: 212 }); }
          if (i === 2) { P.moon(c, x0 + 90, y0 + 80, 36); for (let j = 0; j < 6; j++) INK.inkDot(c, x0 + 170 + j * 50, y0 + 50 + (j % 2) * 40, 2.4, { color: '240,235,220' }); }
          F.standPanel(c, C.x + 40, y0 + 310, 200, { seed: i });
          INK.label(c, C.n, C.x, y0 - 18, { size: 38, weight: 700, align: 'center' });
          // production bar (qualitative)
          const bk = E.se(t, appear[i] + 0.8, appear[i] + 1.8);
          const by = y0 + 380; const bw = 360;
          stroke(c, [[C.x - 180, by - 22], [C.x + 180, by - 22], [C.x + 180, by + 22], [C.x - 180, by + 22], [C.x - 180, by - 22]], { w: 2.2, closed: true, dry: false, seed: 220 + i });
          if (C.prod > 0) P.fillPts(c, [[C.x - 176, by - 18], [C.x - 176 + (bw - 8) * C.prod * bk, by - 18], [C.x - 176 + (bw - 8) * C.prod * bk, by + 18], [C.x - 176, by + 18]], PAL.light, 0.85);
          INK.label(c, C.prod === 0 ? 'elektrik üretimi: yok' : C.prod < 1 ? 'elektrik üretimi: az' : 'elektrik üretimi: çok', C.x, by + 68, { size: 32, weight: 700, align: 'center', alpha: bk });
        });
      });
      // question mark when asking
      if (t < sc + 0.3) E.inkText(ctx, 'Her zaman, her yerde işe yarar mı?', 960, 250, t, sq + 3, sc + 0.3, { size: 54, align: 'center', color: '#8A4A10' });
      // claim card
      const ck = Math.min(E.se(t, sc + 0.2, sc + 0.9, 'out'), 1 - E.se(t, scl - 0.2, scl + 0.4));
      if (ck > 0) E.layer(ctx, ck, c => {
        c.save(); c.translate(960, 240); c.rotate(-0.015); c.translate(-960, -240);
        F.card(c, 420, 160, 1080, 140, { fill: '#F6E7B8', seed: 230 });
        INK.label(c, 'İddia:', 460, 212, { size: 34, weight: 400, alpha: 0.7 });
        INK.label(c, '“Güneş paneli gece de elektrik üretir.”', 960, 262, { size: 52, weight: 700, align: 'center' });
        c.restore();
        P.cross(c, 960, 232, 80, E.se(t, sc + 5.4, sc + 6.2), { w: 12, color: RED });
        if (t > sc + 6) INK.label(c, 'YANLIŞ', 1570, 250, { size: 48, weight: 700, color: RED, alpha: E.se(t, sc + 6, sc + 6.6), rot: -0.08 });
      });
      // storage: battery charged during the day, used at night
      const sk = E.se(t, scl + 3.0, scl + 3.8);
      if (sk > 0) E.layer(ctx, sk, c => {
        F.card(c, 500, 160, 920, 150, { seed: 240 });
        F.battery(c, 640, 235, 0.9, E.se(t, scl + 3.4, scl + 5.4));
        INK.label(c, 'akü', 640, 298, { size: 28, weight: 700, align: 'center' });
        INK.label(c, 'gündüz depola → gece kullan', 1030, 252, { size: 44, weight: 700, align: 'center' });
        P.arrow(c, [590, 400], [560, 318], E.se(t, scl + 3.8, scl + 4.6), { w: 3, bend: 30, head: 12 });
        P.arrow(c, [1400, 318], [1330, 400], E.se(t, scl + 4.6, scl + 5.4), { w: 3, bend: -30, head: 12 });
      });
    }
  });
})();

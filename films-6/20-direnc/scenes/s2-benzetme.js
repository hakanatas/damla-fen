// SAHNE 2 — Analoji (FB.6.6.2 uygulaması): uzun/kısa, tek/çift şeritli, çakıllı/asfalt yol → elektriksel direnç
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const ROWS = [
    { id: 'road1', y: 290, easy: { name: 'kısa yol', lanes: 1, surf: 'asphalt', pts: () => [[520, 290], [860, 290]] }, hard: { name: 'uzun yol', lanes: 1, surf: 'asphalt', pts: () => { const p = []; for (let i = 0; i <= 60; i++) { const u = i / 60; p.push([1040 + u * 560, 290 + Math.sin(u * Math.PI * 4) * 40]); } return p; } }, factor: 'uzunluk' },
    { id: 'road2', y: 490, easy: { name: 'çift şeritli yol', lanes: 2, surf: 'asphalt', pts: () => [[520, 490], [860, 490]] }, hard: { name: 'tek şeritli yol', lanes: 1, surf: 'asphalt', pts: () => [[1040, 490], [1380, 490]] }, factor: 'kesit alanı' },
    { id: 'road3', y: 690, easy: { name: 'asfalt yol', lanes: 1, surf: 'asphalt', pts: () => [[520, 690], [860, 690]] }, hard: { name: 'çakıllı yol', lanes: 1, surf: 'gravel', pts: () => [[1040, 690], [1380, 690]] }, factor: 'iletkenin cinsi' }
  ];
  const CARS = ['#E3A03A', '#2E6A8C', '#6F8A3A'];
  E.scene({
    name: 'Benzetme', concept: 'Yol benzetmesiyle direnç', from: 'roads', to: 'resist', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('roads'), sx = E.s('resist');
      ctx.save();
      ctx.fillStyle = 'rgba(111,138,58,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      P.write(ctx, 'Aynı sayıda araç, farklı yollar', 960, 190, E.seg(t, sr + 0.3, sr + 1.6), { size: 52, align: 'center' });
      const dim = 1 - 0.55 * E.se(t, sx + 3.0, sx + 3.8);
      ROWS.forEach((r, i) => {
        const at = E.s(r.id), k = E.se(t, at - 0.1, at + 0.6); if (k <= 0) return;
        E.layer(ctx, k * dim, c => {
          [['easy', 1.0], ['hard', [1.0, 0.6, 0.45][i]]].forEach(([side, speed]) => {
            const R = r[side], pts = R.pts(); let len = 0; for (let q = 1; q < pts.length; q++) len += Math.hypot(pts[q][0] - pts[q - 1][0], pts[q][1] - pts[q - 1][1]);
            F20.road(c, pts, R.lanes, R.surf, 600 + i * 7);
            // araçlar: kolay yolda hızlı, zor yolda yavaş (tek şeritte arka arkaya)
            for (let j = 0; j < 3; j++) {
              const u = ((t - at) * 70 * speed / len + j * 0.28) % 1;
              const lane = R.lanes === 2 ? (j % 2 ? -14 : 14) : 0;
              const [x, y, a] = F20.along(pts, u);
              F20.car(c, x - Math.sin(a) * lane, y + Math.cos(a) * lane, a, CARS[j]);
            }
            const ex = pts[pts.length - 1];
            line(c, [ex[0] + 30, ex[1] + 20], [ex[0] + 30, ex[1] - 40], { w: 2.6, dry: false }); P.fillPts(c, [[ex[0] + 30, ex[1] - 40], [ex[0] + 62, ex[1] - 30], [ex[0] + 30, ex[1] - 20]], CK.AMBD, 0.9);
            const lx = (pts[0][0] + ex[0]) / 2;
            INK.label(c, R.name, lx, r.y + (i === 0 && side === 'hard' ? 102 : 78), { size: 36, weight: 700, align: 'center', color: side === 'hard' ? '#8A4A10' : PAL.ink });
          });
          INK.label(c, 'daha zor', 1560, r.y + 14 + (i === 0 ? 70 : 0), { size: 36, weight: 700, color: '#8A4A10', alpha: E.se(t, at + 1.2, at + 1.8) });
        });
        // faktör etiketi (direnç)
        const kf = E.se(t, sx + 3.6 + i * 0.7, sx + 4.2 + i * 0.7, 'out');
        if (kf > 0) {
          ctx.save(); ctx.translate(290, r.y); ctx.rotate(-0.03); ctx.scale(P.pop(kf), P.pop(kf));
          CK.card(ctx, -150, -40, 300, 80, { seed: 70 + i, fill: '#F6E7B8' });
          INK.label(ctx, r.factor, 0, 12, { size: 38, weight: 700, align: 'center' });
          ctx.restore();
        }
      });
      // tanım
      const kd = E.se(t, sx + 0.3, sx + 1.0);
      if (kd > 0) {
        E.layer(ctx, kd, c => { CK.card(c, 330, 790, 1260, 110, { seed: 90, fill: '#FBF8F1' }); });
        P.write(ctx, 'Elektriksel direnç: telin akıma karşı gösterdiği zorluk', 960, 862, E.seg(t, sx + 0.8, sx + 2.8), { size: 44, align: 'center' });
      }
      ctx.restore();
    }
  });
})();

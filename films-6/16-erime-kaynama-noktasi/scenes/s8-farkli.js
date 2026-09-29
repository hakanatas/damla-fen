// SAHNE 8 — Farklı saf maddeler (performans görevi örneği): laurik asit ve stearik asit su banyosunda eritilir → farklı erime noktaları;
// erime ve kaynama noktası tablosu (ayırt edici özellik)
(function () {
  const { PAL, line, stroke, circlePts, arrowHead } = INK;
  const F = G16;
  const GX0 = 960, GX1 = 1720, GY0 = 230, GY1 = 700;
  const gx = m => GX0 + 30 + m / 10 * (GX1 - GX0 - 60), gy = T => GY1 - 30 - (T - 20) / 70 * (GY1 - GY0 - 60);
  const LAU = '#C07F1E', STE = '#7A6F62';
  const TABLE = [
    ['su', '0', '100'],
    ['etil alkol', '−114', '78'],
    ['laurik asit', '44', '—'],
    ['stearik asit', '69', '—'],
    ['demir', '1538', '2862']
  ];
  E.scene({
    name: 'Farklı saf maddeler', concept: 'Erime ve kaynama noktaları ayırt edici özelliktir', from: 'others', to: 'table', trFrom: [330, 600],
    draw(ctx, t) {
      const so = E.s('others'), sr = E.s('others-res'), st = E.s('table');
      const m = E.clamp((t - so - 1.5) / (E.e('others-res') - 1.2 - so - 1.5)) * 10;
      const Tl = F.Tl(m), Ts = F.Ts(m);
      const sl = m < 1.9 ? 1 : m < 4 ? 1 - (m - 1.9) / 2.1 : 0, ss = m < 5.5 ? 1 : m < 8 ? 1 - (m - 5.5) / 2.5 : 0;
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 40, 820, 800, 2901);
      F.heater(ctx, 330, 710, 340, E.se(t, so + 0.8, so + 1.5), t);
      F.beaker(ctx, 330, 710, 320, 300, { level: 0.62, t, steam: 0.3 });
      F.tube(ctx, 260, 690, 420, 0.3, sl, LAU, t, 2910);
      F.tube(ctx, 400, 690, 420, 0.3, ss, STE, t, 2920);
      F.miniThermo(ctx, 264, 250, 600, Tl, { min: 0, max: 100, seed: 2911 });
      F.miniThermo(ctx, 404, 250, 600, Ts, { min: 0, max: 100, seed: 2921 });
      INK.label(ctx, 'laurik asit', 160, 250, { size: 32, weight: 700, align: 'center', color: LAU, rot: 0 });
      INK.label(ctx, 'stearik asit', 520, 250, { size: 32, weight: 700, align: 'center', color: STE, rot: 0 });
      INK.label(ctx, Math.round(Tl) + ' °C', 160, 300, { size: 36, weight: 700, align: 'center', color: F.HEAT, rot: 0 });
      INK.label(ctx, Math.round(Ts) + ' °C', 520, 300, { size: 36, weight: 700, align: 'center', color: F.HEAT, rot: 0 });
      INK.label(ctx, 'sıcak su banyosu', 330, 870, { size: 32, weight: 700, align: 'center', color: PAL.water, rot: 0 });
      // grafik
      const ga = 1 - E.se(t, st - 0.2, st + 0.5);
      const gk = E.se(t, so + 0.8, so + 1.6) * ga;
      if (gk > 0) E.layer(ctx, gk, c => {
        F.card(c, 900, 160, 880, 700, { seed: 2930 });
        stroke(c, [[GX0, GY0], [GX0, GY1], [GX1, GY1]], { w: 3, seed: 2931 });
        arrowHead(c, [GX0, GY0 + 10], [GX0, GY0 - 10], 12, { w: 3 });
        INK.label(c, 'sıcaklık (°C)', GX0 + 14, GY0 + 4, { size: 28, weight: 700 });
        INK.label(c, 'süre (dk)', GX1, GY1 + 50, { size: 28, weight: 700, align: 'right' });
        [20, 40, 60, 80].forEach(v => { line(c, [GX0 - 10, gy(v)], [GX0 + 4, gy(v)], { w: 2, dry: false }); INK.label(c, String(v), GX0 - 16, gy(v) + 10, { size: 26, align: 'right' }); });
        [[F.Tl, LAU], [F.Ts, STE]].forEach(([fn, col], i) => { const cur = []; for (let j = 0; j <= Math.round(m * 20); j++) { const mm = j / 20; cur.push([gx(mm), gy(fn(mm))]); } if (cur.length > 1) stroke(c, cur, { w: 4, color: col, taper: 0.02, seed: 2932 + i }); });
        if (m > 3) INK.label(c, 'laurik asit ≈ 44 °C', gx(3.4), gy(33), { size: 32, weight: 700, color: LAU, align: 'center', alpha: E.clamp((m - 3) / 0.8) });
        if (m > 7) INK.label(c, 'stearik asit ≈ 69 °C', gx(8.3), gy(57), { size: 32, weight: 700, color: STE, align: 'center', alpha: E.clamp((m - 7) / 0.8) });
        const fk = E.se(t, sr + 5.5, sr + 6.5);
        if (fk > 0) INK.label(c, 'Erime noktaları farklı!', 1340, 820, { size: 40, weight: 700, color: F.AMBER, align: 'center', alpha: fk, rot: 0 });
      });
      // tablo
      const tk = E.se(t, st + 0.2, st + 0.9);
      if (tk > 0) E.layer(ctx, tk, c => {
        F.card(c, 900, 160, 880, 700, { fill: '#FBF6E8', seed: 2940 });
        INK.label(c, 'Saf maddeler (yaklaşık değerler)', 1340, 225, { size: 38, weight: 700, align: 'center', color: F.AMBER, rot: 0 });
        INK.label(c, 'madde', 1060, 300, { size: 32, weight: 700, align: 'center', rot: 0 });
        INK.label(c, 'erime noktası', 1400, 300, { size: 32, weight: 700, align: 'center', rot: 0 });
        INK.label(c, 'kaynama noktası', 1640, 300, { size: 32, weight: 700, align: 'center', rot: 0 });
        line(c, [930, 322], [1750, 320], { w: 2.6, dry: false, seed: 2941 });
        line(c, [1260, 260], [1262, 800], { w: 1.6, dry: false, alpha: 0.6, seed: 2942 }); line(c, [1530, 260], [1532, 800], { w: 1.6, dry: false, alpha: 0.6, seed: 2943 });
        TABLE.forEach(([a, b, d], i) => {
          const y = 390 + i * 88, k = E.se(t, st + 0.9 + i * 0.6, st + 1.6 + i * 0.6); if (k <= 0) return;
          P.write(c, a, 1060, y, k, { size: 38, align: 'center' });
          P.write(c, b + ' °C', 1400, y, E.seg(k, 0.2, 1), { size: 38, align: 'center', color: PAL.water });
          P.write(c, d === '—' ? '—' : d + ' °C', 1640, y, E.seg(k, 0.4, 1), { size: 38, align: 'center', color: F.HEAT });
        });
        INK.label(c, 'deniz seviyesinde (1 atm) · — : okul deneyinde ölçülmez', 1340, 830, { size: 24, align: 'center', alpha: 0.65, rot: 0 });
      });
      DAMLA.draw(ctx, {
        x: 700, y: 900, s: 0.8, view: 'q3', flip: true, t, seed: 7, blink: E.blink(t, 19), squash: E.breath(t), talk: E.talk(t),
        expr: t > st ? 'happy' : 'curious', look: [-0.6, -0.5], arms: [[-1, 0.4], [1, 1.3]]
      });
    }
  });
})();

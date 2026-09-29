// SAHNE 7 — Donma noktası: deney tüpündeki su buz-tuz karışımında soğutulur; 0 °C'de donar, donarken sıcaklık sabit; erime noktası = donma noktası
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = G16;
  const GX0 = 1000, GX1 = 1700, GY0 = 300, GY1 = 700;
  const gx = m => GX0 + 30 + m / 10 * (GX1 - GX0 - 60), gy = T => GY1 - 30 - (T + 10) / 35 * (GY1 - GY0 - 60);
  E.scene({
    name: 'Donma noktası', concept: 'Donma noktası; erime noktasına eşit', from: 'freeze', to: 'equal', trFrom: [500, 600],
    draw(ctx, t) {
      const sf = E.s('freeze'), se = E.s('equal');
      const m = E.clamp((t - sf - 0.6) / 7.2) * 10;
      const T = F.Tc(m), solid = m < 4 ? 0 : m < 8 ? (m - 4) / 4 : 1;
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 80, 900, 800, 2801);
      // soğutma banyosu (buz + tuz)
      F.beaker(ctx, 450, 796, 300, 260, { level: 0.6, ice: 0.9, t: 0 });
      F.tube(ctx, 450, 760, 360, 0.45, solid, PAL.water, t, 2810);
      F.miniThermo(ctx, 450, 430, 700, T, { min: -20, max: 40, seed: 2811 });
      INK.label(ctx, 'buz + tuz karışımı', 450, 895, { size: 34, weight: 700, align: 'center', color: PAL.water, rot: 0 });
      INK.label(ctx, 'deney tüpünde su', 640, 420, { size: 32, weight: 700, rot: 0 });
      INK.leader(ctx, [630, 410], [480, 620], { bend: 0.1 });
      // büyük sıcaklık etiketi
      ctx.save(); ctx.font = '700 60px Kalam'; ctx.fillStyle = F.HEAT; ctx.textAlign = 'center'; ctx.fillText(F.fmtT(T), 760, 560); ctx.restore();
      if (m > 4.1 && m < 8) INK.label(ctx, 'donuyor: sabit!', 760, 630, { size: 42, weight: 700, color: PAL.water, align: 'center', alpha: E.clamp((m - 4.1) / 0.5) });
      // soğuma grafiği
      stroke(ctx, [[GX0, GY0], [GX0, GY1], [GX1, GY1]], { w: 3, seed: 2820 });
      INK.label(ctx, 'sıcaklık (°C)', GX0 + 14, GY0 - 16, { size: 30, weight: 700 });
      INK.label(ctx, 'süre (dk)', GX1, GY1 + 50, { size: 30, weight: 700, align: 'right' });
      [-10, 0, 10, 20].forEach(v => { line(ctx, [GX0 - 10, gy(v)], [GX0 + 4, gy(v)], { w: 2, dry: false }); INK.label(ctx, String(v).replace('-', '−'), GX0 - 18, gy(v) + 10, { size: 28, align: 'right', weight: v === 0 ? 700 : 400 }); });
      const cur = []; for (let i = 0; i <= Math.round(m * 20); i++) { const mm = i / 20; cur.push([gx(mm), gy(F.Tc(mm))]); }
      if (cur.length > 1) stroke(ctx, cur, { w: 4, color: PAL.water, taper: 0.02, seed: 2821 });
      if (m > 5) { ctx.save(); ctx.globalAlpha = E.clamp((m - 5) / 0.8); P.fillPts(ctx, [[gx(4) - 8, gy(0) - 22], [gx(8) + 8, gy(0) - 24], [gx(8) + 8, gy(0) + 22], [gx(4) - 8, gy(0) + 24]], PAL.light, 0.35); ctx.restore(); INK.label(ctx, 'donma noktası: 0 °C', gx(6), gy(0) - 52, { size: 38, weight: 700, align: 'center', color: PAL.water, alpha: E.clamp((m - 5) / 0.8) }); }
      // eşitlik kartı
      const ek = E.se(t, se + 0.2, se + 1.0, 'out');
      if (ek > 0) E.layer(ctx, ek, c => {
        F.card(c, 930, 790, 880, 110, { fill: '#F6E7B8', seed: 2830 });
        INK.label(c, 'Su: erime noktası = donma noktası = 0 °C', 1370, 860, { size: 40, weight: 700, align: 'center', rot: 0 });
      });
      DAMLA.draw(ctx, {
        x: 170, y: 800, s: 0.9, view: 'q3', t, seed: 6, blink: E.blink(t, 17), squash: E.breath(t), talk: E.talk(t),
        expr: m > 4 && m < 8 ? 'surprised' : 'curious', look: [0.8, -0.3], arms: [[-1, 0.4], [1, 1.2]]
      });
    }
  });
})();

// SAHNE 5 — Gözlem verilerinden sonuç çıkarma (FB.5.5.4 c): tablo → sıcaklık-zaman grafiği, düzlükler = hâl değişimi
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const F = F19;
  const X0 = 330, X1 = 1390, Y0 = 250, Y1 = 800; // axes box
  const xOf = m => X0 + 40 + m / 12 * (X1 - X0 - 80), yOf = T => Y1 - 40 - (T + 20) / 130 * (Y1 - Y0 - 60);
  E.scene({
    name: 'Grafik ve sonuç', concept: 'Erime ve kaynama boyunca sıcaklık sabit kalır', from: 'conclude', to: 'conclude', trFrom: [1500, 500],
    draw(ctx, t) {
      const sc = E.s('conclude');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      P.write(ctx, 'Sıcaklık – zaman grafiğim', 290, 200, E.seg(t, sc + 0.2, sc + 1.4), { size: 54 });
      // axes
      const ak = E.se(t, sc + 0.3, sc + 1.2);
      P.drawOn(ctx, [[X0, Y1], [X0, Y0 - 10]], ak, { w: 3.2 }); P.drawOn(ctx, [[X0, Y1], [X1 + 20, Y1]], ak, { w: 3.2 });
      if (ak >= 1) { arrowHead(ctx, [X0, Y0 + 10], [X0, Y0 - 12], 14, { w: 3 }); arrowHead(ctx, [X1, Y1], [X1 + 22, Y1], 14, { w: 3 }); }
      INK.label(ctx, 'sıcaklık (°C)', X0 + 16, Y0 + 12, { size: 32, weight: 700, alpha: ak });
      INK.label(ctx, 'süre (dk)', X1 + 20, Y1 - 22, { size: 32, weight: 700, align: 'right', alpha: ak });
      [-10, 0, 20, 40, 60, 80, 100].forEach(v => { line(ctx, [X0 - 10, yOf(v)], [X0 + 4, yOf(v)], { w: 2, dry: false }); INK.label(ctx, String(v).replace('-', '−'), X0 - 18, yOf(v) + 10, { size: 28, align: 'right', alpha: ak, weight: v === 0 || v === 100 ? 700 : 400 }); });
      [0, 2, 4, 6, 8, 10, 12].forEach(m => { line(ctx, [xOf(m), Y1 - 4], [xOf(m), Y1 + 10], { w: 2, dry: false }); INK.label(ctx, String(m), xOf(m), Y1 + 42, { size: 28, align: 'center', alpha: ak }); });
      // data points from the table
      F.ROWS.forEach(([m], i) => { const k = E.se(t, sc + 1.2 + i * 0.25, sc + 1.5 + i * 0.25, 'out'); if (k > 0) INK.inkDot(ctx, xOf(m), yOf(F.T(m)), 7 * P.pop(k)); });
      // curve through the data (heating curve)
      const curve = []; for (let i = 0; i <= 240; i++) { const m = i / 240 * 12; curve.push([xOf(m), yOf(F.T(m))]); }
      P.drawOn(ctx, curve, E.se(t, sc + 3, sc + 5), { w: 4.2, color: F.HEAT, taper: 0.02 });
      // plateau bands
      const b1 = E.se(t, sc + 5, sc + 5.8), b2 = E.se(t, sc + 6, sc + 6.8);
      const band = (m0, m1, T, k, txt, sub, ly) => {
        if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = k; P.fillPts(ctx, [[xOf(m0) - 8, yOf(T) - 22], [xOf(m1) + 8, yOf(T) - 24], [xOf(m1) + 8, yOf(T) + 22], [xOf(m0) - 8, yOf(T) + 24]], PAL.light, 0.35); ctx.restore();
        P.write(ctx, txt, (xOf(m0) + xOf(m1)) / 2, ly, k, { size: 44, align: 'center', color: '#8A4A10' });
        P.write(ctx, sub, (xOf(m0) + xOf(m1)) / 2, ly + 46, E.seg(k, 0.3, 1), { size: 34, align: 'center', weight: 400 });
      };
      band(1, 5, 0, b1, 'erime', 'sıcaklık sabit: 0 °C', yOf(0) - 100);
      band(10, 12, 100, b2, 'kaynama', '≈ 100 °C sabit', yOf(100) + 80);
      if (b2 > 0) INK.label(ctx, '(deniz seviyesinde)', xOf(11), yOf(100) + 162, { size: 28, align: 'center', alpha: 0.65 * E.seg(b2, 0.5, 1) });
      // phase notes along the rising parts
      const pn = E.se(t, sc + 6.8, sc + 7.6);
      if (pn > 0) { INK.label(ctx, 'su ısınıyor', xOf(7.2) + 30, yOf(45), { size: 32, alpha: pn, rot: -0.55 }); }
      // conclusion strip on the right
      const ck = E.se(t, sc + 7.2, sc + 8);
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 1450, 330, 290, 400, { fill: '#F6E7B8', seed: 2501 });
        INK.label(c, 'Sonuç', 1595, 390, { size: 46, weight: 700, align: 'center', color: '#8A4A10' });
        ['Hâl değişirken', 'ısı alınır', 'ama sıcaklık', 'sabit kalır.'].forEach((s, i) => INK.label(c, s, 1595, 460 + i * 58, { size: 38, weight: 700, align: 'center', rot: 0 }));
      });
      DAMLA.draw(ctx, {
        x: 1700, y: 1060, s: 0.95, view: 'q3', flip: true, t, seed: 5, blink: E.blink(t, 15), squash: E.breath(t), talk: E.talk(t),
        expr: ck > 0.5 ? 'happy' : 'thinking', look: [-0.8, -0.5], arms: [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]]
      });
    }
  });
})();

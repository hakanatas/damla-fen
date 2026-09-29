// SAHNE 6 — Veri analizi (b): tablo → sıcaklık-zaman grafiği; düz bölgeler = hâl değişimi (erime noktası 0 °C, kaynama noktası ≈100 °C)
(function () {
  const { PAL, line, stroke, arrowHead } = INK;
  const F = G16;
  const X0 = 330, X1 = 1330, Y0 = 250, Y1 = 800;
  const xOf = m => X0 + 40 + m / 11 * (X1 - X0 - 80), yOf = T => Y1 - 40 - (T + 20) / 130 * (Y1 - Y0 - 60);
  E.scene({
    name: 'Grafik', concept: 'Sıcaklık-zaman grafiği ve veri analizi', from: 'graph', to: 'meaning', trFrom: [1500, 500],
    draw(ctx, t) {
      const sg = E.s('graph'), sm = E.s('meaning');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      P.write(ctx, 'Sıcaklık – zaman grafiğim', 290, 200, E.seg(t, sg + 0.2, sg + 1.4), { size: 54 });
      const ak = E.se(t, sg + 0.3, sg + 1.2);
      P.drawOn(ctx, [[X0, Y1], [X0, Y0 - 10]], ak, { w: 3.2 }); P.drawOn(ctx, [[X0, Y1], [X1 + 20, Y1]], ak, { w: 3.2 });
      if (ak >= 1) { arrowHead(ctx, [X0, Y0 + 10], [X0, Y0 - 12], 14, { w: 3 }); arrowHead(ctx, [X1, Y1], [X1 + 22, Y1], 14, { w: 3 }); }
      INK.label(ctx, 'sıcaklık (°C)', X0 + 16, Y0 + 12, { size: 32, weight: 700, alpha: ak });
      INK.label(ctx, 'süre (dk)', X1 + 20, Y1 - 22, { size: 32, weight: 700, align: 'right', alpha: ak });
      [-20, 0, 20, 40, 60, 80, 100].forEach(v => { line(ctx, [X0 - 10, yOf(v)], [X0 + 4, yOf(v)], { w: 2, dry: false }); INK.label(ctx, String(v).replace('-', '−'), X0 - 18, yOf(v) + 10, { size: 28, align: 'right', alpha: ak, weight: v === 0 || v === 100 ? 700 : 400 }); });
      for (let m = 0; m <= 11; m++) { line(ctx, [xOf(m), Y1 - 4], [xOf(m), Y1 + 10], { w: 2, dry: false }); INK.label(ctx, String(m), xOf(m), Y1 + 42, { size: 28, align: 'center', alpha: ak }); }
      F.ROWS.forEach((m, i) => { const k = E.se(t, sg + 1.2 + i * 0.2, sg + 1.5 + i * 0.2, 'out'); if (k > 0) INK.inkDot(ctx, xOf(m), yOf(F.T(m)), 7 * P.pop(k)); });
      const curve = []; for (let i = 0; i <= 220; i++) { const m = i / 220 * 11; curve.push([xOf(m), yOf(F.T(m))]); }
      P.drawOn(ctx, curve, E.se(t, sg + 3.6, sg + 5.4), { w: 4.2, color: F.HEAT, taper: 0.02 });
      const band = (m0, m1, T, k, txt, sub, ly, col) => {
        if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = k; P.fillPts(ctx, [[xOf(m0) - 8, yOf(T) - 22], [xOf(m1) + 8, yOf(T) - 24], [xOf(m1) + 8, yOf(T) + 22], [xOf(m0) - 8, yOf(T) + 24]], PAL.light, 0.35); ctx.restore();
        P.write(ctx, txt, (xOf(m0) + xOf(m1)) / 2, ly, k, { size: 42, align: 'center', color: col });
        P.write(ctx, sub, (xOf(m0) + xOf(m1)) / 2, ly + 44, E.seg(k, 0.3, 1), { size: 32, align: 'center', weight: 400 });
      };
      band(1, 4, 0, E.se(t, sg + 5.4, sg + 6.2), 'erime noktası', 'buz eriyor · 0 °C', yOf(0) - 110, PAL.water);
      band(9, 11, 100, E.se(t, sg + 6.4, sg + 7.2), 'kaynama noktası', '≈ 100 °C', yOf(100) + 80, F.HEAT);
      if (t > sg + 7) INK.label(ctx, '(deniz seviyesinde)', xOf(10), yOf(100) + 162, { size: 28, align: 'center', alpha: 0.65 * E.se(t, sg + 7, sg + 7.8) });
      const pn = E.se(t, sg + 7.0, sg + 7.8);
      if (pn > 0) INK.label(ctx, 'su ısınıyor', xOf(6.3) + 30, yOf(45), { size: 32, alpha: pn, rot: -0.5 });
      const ck = E.se(t, sm + 0.3, sm + 1.0);
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 1400, 300, 330, 430, { fill: '#F6E7B8', seed: 2701 });
        INK.label(c, 'Düz bölge', 1565, 365, { size: 44, weight: 700, align: 'center', color: F.AMBER });
        ['hâl değişiyor', 'ısı alınıyor', 'ama sıcaklık', 'değişmiyor'].forEach((s, i) => INK.label(c, s, 1565, 440 + i * 62, { size: 38, weight: 700, align: 'center', rot: 0, color: i === 1 ? F.HEAT : PAL.ink }));
      });
      DAMLA.draw(ctx, {
        x: 1760, y: 1060, s: 0.9, view: 'q3', flip: true, t, seed: 5, blink: E.blink(t, 15), squash: E.breath(t), talk: E.talk(t),
        expr: ck > 0.5 ? 'happy' : 'thinking', look: [-0.8, -0.5], arms: [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]]
      });
    }
  });
})();

// SAHNE 3 — Özetleme (FB.7.1.3 b) · veri (OB7) · veriye dayalı tahmin (FB.7.1.3 c)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  const GX = 300, GY = 800, GW = 1100, GH = 480;
  const curve = u => Math.pow(u, 1.8) * 0.8 + u * 0.12;   // şematik: artan eğilim (sayı verilmez)
  E.scene({
    name: 'Veri ve tahmin', concept: 'Özet, veri, tahmin', from: 'summary', to: 'predict', trFrom: [960, 400],
    draw(ctx, t) {
      const ss = E.s('summary'), sd = E.s('data'), sp = E.s('predict');
      const sk = E.se(t, ss + 0.2, ss + 0.9, 'out') * (1 - E.se(t, sd - 0.3, sd + 0.3));
      if (sk > 0) E.layer(ctx, sk, c => {
        P.notebook(c, 260, 220, 1400, 560);
        P.write(c, 'Özetim:', 400, 330, E.seg(t, ss + 0.6, ss + 1.4), { size: 56, color: F.AMBER_D });
        P.write(c, 'Uzaydaki araç ve parça sayısı arttıkça', 400, 440, E.seg(t, ss + 1.4, ss + 3.4), { size: 50 });
        P.write(c, 'çarpışma ve gözlem sorunları da artar.', 400, 520, E.seg(t, ss + 3.4, ss + 5.4), { size: 50 });
        P.drawOn(c, P.bez([396, 545], [700, 556], [1180, 540], 30), E.se(t, ss + 5.6, ss + 6.4), { w: 3, color: PAL.light });
        INK.label(c, '(kendi cümlemle)', 1500, 650, { size: 32, align: 'right', alpha: 0.7 * E.se(t, ss + 6, ss + 6.8) });
      });
      const gk = E.se(t, sd + 0.1, sd + 0.8);
      if (gk > 0) E.layer(ctx, gk, c => {
        P.drawOn(c, [[GX, GY], [GX + GW + 40, GY]], gk, { w: 3, seed: 460 }); P.drawOn(c, [[GX, GY], [GX, GY - GH - 40]], gk, { w: 3, seed: 461 });
        INK.arrowHead(c, [GX + GW + 20, GY], [GX + GW + 44, GY], 14, { w: 3 }); INK.arrowHead(c, [GX, GY - GH - 20], [GX, GY - GH - 44], 14, { w: 3 });
        INK.label(c, 'yıllar', GX + GW + 40, GY + 50, { size: 36, weight: 700, align: 'right' });
        INK.label(c, 'yörüngedeki nesne sayısı', GX + 20, GY - GH - 40, { size: 36, weight: 700 });
        INK.label(c, '1957: ilk yapay uydu', GX, GY + 50, { size: 32, align: 'center' });
        INK.label(c, 'bugün', GX + GW * 0.7, GY + 50, { size: 32, align: 'center' });
        const k = E.se(t, sd + 1.0, sd + 4.5);
        const pts = []; for (let i = 0; i <= 60 * k; i++) { const u = i / 60 * 0.7 / 0.7; pts.push([GX + u * GW * 0.7, GY - curve(u) * GH * 0.72]); }
        if (pts.length > 1) stroke(c, pts, { w: 5, color: PAL.water, seed: 462, taper: 0.02 });
        // tahmin: kesikli devam
        const pk = E.se(t, sp + 0.8, sp + 3.2);
        if (pk > 0) { const dp = []; for (let i = 0; i <= 200 * pk; i++) { const u = 1 + i / 200 * 0.43; dp.push([GX + u * GW * 0.7, GY - curve(u) * GH * 0.72]); }
          if (dp.length > 1) INK.dashed(c, dp, { w: 4, color: F.AMBER_D, on: 12, off: 9 }); }
        INK.label(c, 'tahmin: önlem alınmazsa', 1150, 300, { size: 36, weight: 700, color: F.AMBER_D, alpha: E.se(t, sp + 2.4, sp + 3.2), align: 'right' });
        INK.label(c, '(şematik çizim; eğilim güvenilir kaynaklardan)', 1600, 890, { size: 28, align: 'right', alpha: 0.65 });
        F.card(c, 1480, 300, 380, 300, { seed: 463, fill: '#F6E7B8' });
        INK.label(c, 'Kaynaklar:', 1510, 360, { size: 34, weight: 700 });
        ['uzay ajansları', 'üniversiteler', 'bilim dergileri'].forEach((s, i) => INK.label(c, '• ' + s, 1510, 420 + i * 50, { size: 32 }));
      });
      DAMLA.draw(ctx, { x: 1750, y: 905, s: 0.75, view: 'q3', flip: true, expr: t > sp ? 'thinking' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 4, arms: [[-1, 0.35], [1, [30, -160], 0.4]] });
    }
  });
})();

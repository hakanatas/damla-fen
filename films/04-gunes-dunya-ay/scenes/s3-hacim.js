// SAHNE 3 — Hacim: maddenin boşlukta kapladığı yer; birimleri cm³, m³ (TYMM vurgusu)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  E.scene({
    name: 'Hacim', concept: 'Hacim ve birimleri (cm³, m³)', from: 'volume', to: 'units', trFrom: [960, 540],
    draw(ctx, t) {
      const sv = E.s('volume'), su = E.s('units');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      P.write(ctx, 'Hacim', 290, 215, E.seg(t, sv + 0.2, sv + 1.0), { size: 66, color: PAL.water });
      P.write(ctx, 'Maddenin boşlukta kapladığı yer', 520, 215, E.seg(t, sv + 1.0, sv + 2.8), { size: 50 });
      // su dolu bardakta taş örneği: kapladığı yer
      const kg = E.se(t, sv + 2.4, sv + 3.2);
      if (kg > 0) {
        ctx.save(); ctx.globalAlpha = kg;
        const gx = 460, gy = 760;
        const glass = [[gx - 90, gy - 300], [gx - 80, gy], [gx + 80, gy], [gx + 90, gy - 300]];
        const lvl = E.lerp(gy - 150, gy - 205, E.se(t, sv + 3.4, sv + 4.6));
        P.fillPts(ctx, [[gx - 86, lvl], [gx + 86, lvl], [gx + 80, gy], [gx - 80, gy]], PAL.water, 0.3);
        const sy = E.lerp(gy - 380, gy - 60, E.se(t, sv + 3.2, sv + 4.2, 'in'));
        P.fillPts(ctx, INK.wobble(circlePts(gx, sy, 46, 38, 24), 4, 7), '#8A857C', 0.9); stroke(ctx, INK.wobble(circlePts(gx, sy, 46, 38, 24), 4, 7), { w: 2.4, closed: true });
        stroke(ctx, glass, { w: 3 });
        ctx.restore();
        if (t > sv + 4.6) P.write(ctx, 'taş yer kaplar → su yükselir', 460, 850, E.seg(t, sv + 4.6, sv + 5.8), { size: 34, align: 'center' });
      }
      // 1 cm³ küp ve 2×2×2 kutu
      const kc = E.se(t, su + 0.2, su + 0.9, 'out');
      if (kc > 0) {
        ctx.save(); ctx.globalAlpha = kc;
        F04.cube(ctx, 820, 620, 110, { seed: 3 });
        INK.label(ctx, '1 cm', 875, 668, { size: 32, align: 'center', weight: 700 });
        INK.label(ctx, '1 cm', 990, 610, { size: 32, weight: 700 });
        ctx.restore();
        P.write(ctx, '= 1 cm³', 880, 460, E.seg(t, su + 2.4, su + 3.4), { size: 56, align: 'center', color: PAL.water });
      }
      const kx = E.se(t, su + 3.6, su + 4.2);
      if (kx > 0) {
        const bx = 1230, by = 760, a = 110, dx = a * 0.5, dy = a * 0.3;
        ctx.save(); ctx.globalAlpha = 0.8 * kx;
        const box = [[bx, by], [bx + 2 * a, by], [bx + 2 * a + 2 * dx, by - 2 * dy], [bx + 2 * a + 2 * dx, by - 2 * a - 2 * dy], [bx + 2 * dx, by - 2 * a - 2 * dy], [bx, by - 2 * a], [bx, by]];
        dashed(ctx, box, { w: 2.2, on: 10, off: 7 }); dashed(ctx, [[bx, by - 2 * a], [bx + 2 * a, by - 2 * a], [bx + 2 * a + 2 * dx, by - 2 * a - 2 * dy]], { w: 2.2, on: 10, off: 7 }); dashed(ctx, [[bx + 2 * a, by], [bx + 2 * a, by - 2 * a]], { w: 2.2, on: 10, off: 7 });
        ctx.restore();
        // küpler arkadan öne, alttan üste
        const order = []; for (let j = 1; j >= 0; j--) for (let kk = 0; kk < 2; kk++) for (let i = 0; i < 2; i++) order.push([i, j, kk]);
        const n = Math.floor(E.seg(t, su + 4.4, su + 7.0) * 8.99);
        order.slice(0, n).forEach(([i, j, kk], m) => F04.cube(ctx, bx + i * a + j * dx, by - kk * a - j * dy, a, { seed: 20 + m }));
        if (n > 0) { ctx.save(); ctx.font = '700 64px Kalam'; ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(250,246,236,0.9)'; ctx.fillStyle = PAL.ink; ctx.strokeText(String(n), 1580, 400); ctx.fillText(String(n), 1580, 400); ctx.restore(); }
        P.write(ctx, 'hacim = 8 cm³', 1390, 860, E.seg(t, su + 7.2, su + 8.2), { size: 54, align: 'center', color: PAL.water });
      }
      if (t > su + 8.4) INK.label(ctx, 'büyük hacimler için: m³', 880, 860, { size: 34, align: 'center', alpha: 0.75 * E.se(t, su + 8.4, su + 9) });
    }
  });
})();

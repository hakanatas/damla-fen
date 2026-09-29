// SAHNE 2 — Müzik aletleri: farklı kaynak → farklı titreşim (ses grafikleri); soru: aynı kaynaktan ince/kalın ses?
(function () {
  const { PAL, stroke } = INK; const F = S8;
  E.scene({
    name: 'Müzik aletleri', concept: 'Farklı kaynak, farklı titreşim', from: 'instr', to: 'q', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('instr'), sq = E.s('q');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const items = [['flüt', 330], ['bağlama', 960], ['davul', 1590]];
      items.forEach(([n, x], i) => {
        const k = E.se(t, si + 0.3 + i * 0.8, si + 1.0 + i * 0.8, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          F.card(c, x - 260, 200, 520, 560, 120 + i);
          const v = 0.6 + 0.4 * Math.sin(t * 3 + i);
          if (i === 0) F.flute(c, x - 200, 380, 0.95, t, v);
          if (i === 1) F.baglama(c, x + 110, 420, 0.55, t, v, { rot: 0.35 });
          if (i === 2) F.drum(c, x, 480, 0.8, t, v * 0.8, {});
          F.fit(c, n, x, 560, 400, 48);
          // farklı dalga biçimleri
          const pts = []; const x0 = x - 210, w = 420, y0 = 660;
          for (let j = 0; j <= 160; j++) {
            const u = j / 160; let y;
            if (i === 0) y = Math.sin(2 * Math.PI * 6 * u);
            if (i === 1) y = 0.7 * Math.sin(2 * Math.PI * 4 * u) + 0.35 * Math.sin(2 * Math.PI * 8 * u + 0.6) + 0.2 * Math.sin(2 * Math.PI * 12 * u);
            if (i === 2) y = Math.exp(-u * 4) * Math.sin(2 * Math.PI * 2.5 * u) * 1.3;
            pts.push([x0 + u * w, y0 - y * 40]);
          }
          P.drawOn(c, pts, E.se(t, si + 1.2 + i * 0.8, si + 2.4 + i * 0.8), { w: 3.4, color: F.AMB, dry: false, taper: 0.02 });
          INK.line(c, [x0, y0], [x0 + w, y0], { w: 1.2, dry: false, alpha: 0.4 });
        });
      });
      const kq = E.se(t, sq + 0.3, sq + 1.1);
      if (kq > 0) E.layer(ctx, kq, c => {
        F.card(c, 420, 790, 1080, 110, 131, { tint: PAL.light, tintA: 0.2 });
        F.fit(c, 'Aynı kaynaktan: bazen ince, bazen kalın ses. Neden?', 960, 862, 1020, 46);
      });
    }
  });
})();

// SAHNE 2 — Karışımın özellikleri: belirli oran/formül yok, belirli erime-kaynama noktası yok, bileşenler özelliğini korur
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  E.scene({
    name: 'Karışımın özellikleri', concept: 'Belirli oran yok; bileşenler özelliğini korur', from: 'ratio', to: 'keep', trFrom: [700, 600],
    draw(ctx, t) {
      const sr = E.s('ratio'), sk = E.s('keep');
      K.bench(ctx, -40, 1960, 860, 5400);
      stroke(ctx, K.linePts([1000, 200], [1000, 840], 40), { w: 2, alpha: 0.3, dry: false, seed: 5401 });
      // sol: az / çok şeker
      [[330, 0.3, 'az şeker'], [700, 1, 'çok şeker']].forEach(([x, g, lab], i) => {
        const k = E.se(t, sr + 0.4 + i * 0.8, sr + 1.0 + i * 0.8, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { K.beaker(c, x, 860, 220, 250, { level: 0.6, t, seed: 20 + i, tint: ['#E8DFC4', 0.1 + 0.25 * g] }); for (let j = 0; j < 8 * g + 2; j++) { const r = rng(5410 + j + i * 20); c.save(); c.fillStyle = '#FFFDF6'; c.strokeStyle = PAL.ink; c.lineWidth = 0.8; c.beginPath(); c.rect(x - 70 + r() * 140, 700 + r() * 130, 5, 5); c.fill(); c.stroke(); c.restore(); } });
        E.inkText(ctx, lab, x, 560, t, sr + 0.8 + i * 0.8, 1e9, { size: 40, align: 'center' });
        E.inkText(ctx, 'şekerli su ✓', x, 510, t, sr + 2.4 + i * 0.4, 1e9, { size: 40, align: 'center', color: PAL.water });
      });
      const nk = E.seg(t, sr + 4.2, sr + 5.2);
      if (nk > 0) {
        P.write(ctx, 'belirli oran ve formül yok', 515, 260, nk, { size: 50, align: 'center', color: K.AMBER });
        P.write(ctx, 'belirli erime ve kaynama noktası yok', 515, 340, E.seg(t, sr + 5.4, sr + 6.4), { size: 44, align: 'center', color: K.AMBER });
      }
      // sağ: kum + demir tozu, mıknatıs
      const pk = E.se(t, sk + 0.3, sk + 0.9, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        const plate = P.arc(1400, 820, 260, 0, Math.PI, 30, 40); P.fillPts(c, plate, '#FAF6EC'); stroke(c, plate, { w: 3, seed: 5420 }); stroke(c, [[1134, 820], [1666, 818]], { w: 3, seed: 5421 });
        const lift = E.se(t, sk + 2.4, sk + 4.2);
        const r = rng(5430);
        for (let i = 0; i < 70; i++) { const x = 1220 + r() * 360, y = 790 + r() * 30; c.save(); c.fillStyle = '#C9A56A'; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); c.restore(); }
        for (let i = 0; i < 40; i++) { const x0 = 1230 + r() * 340, y0 = 792 + r() * 26; const tx = 1370 + (r() - 0.5) * 110 + (i % 2 ? -1 : 1) * 45, ty = 470 + r() * 30; const u = E.clamp(lift * 1.4 - r() * 0.4); c.save(); c.fillStyle = '#3E3B44'; c.beginPath(); c.ellipse(E.lerp(x0, tx, u), E.lerp(y0, ty, u), 2.5, 6, 0.6 + i, 0, 7); c.fill(); c.restore(); }
        K.magnet(c, 1400, E.lerp(260, 380, E.se(t, sk + 1.0, sk + 2.4)), 1.2);
      });
      E.inkText(ctx, 'kum + demir tozu', 1080, 740, t, sk + 0.8, 1e9, { size: 38 });
      const kk = E.seg(t, sk + 4.4, sk + 5.4);
      if (kk > 0) P.write(ctx, 'demir hâlâ mıknatısa çekilir', 1400, 250, kk, { size: 46, align: 'center', color: K.AMBER });
    }
  });
})();

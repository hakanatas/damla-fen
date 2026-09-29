// SAHNE 7 — Verileri yorumlama ve değerlendirme; farklılıklara saygı (FB.8.3.8 c)
(function () {
  const { PAL, stroke, circlePts, wobble, wash } = INK;
  const F = F809;
  const HAB = [
    ['çöl', '#E3C98A', c => { F.fox(c, -40, 0, 0.5, 'desert'); F.cactus(c, 90, 0, 0.5); }],
    ['kutup', F.SNOW, c => { F.fox(c, -110, 0, 0.42, 'arctic'); F.bear(c, 30, 0, 0.42, 'polar'); }],
    ['orman', PAL.life, c => { F.bear(c, -40, 0, 0.5, 'brown'); }]
  ];
  E.scene({
    name: 'Yorumla', concept: 'Yorumlama; saygı', from: 'interpret', to: 'respect', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('interpret'), sr = E.s('respect');
      ctx.fillStyle = 'rgba(111,138,58,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      HAB.forEach(([name, col, fn], i) => {
        const at = si + 0.3 + i * 0.7, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const cx = 420 + i * 540, cy = 460;
        E.layer(ctx, k, c => {
          const blob = wobble(circlePts(cx, cy, 230, 190, 50), 10, 6400 + i);
          P.fillPts(c, blob, PAL.white, 0.9); wash(c, blob, col, 0.35, 6410 + i, { bleed: 3 }); stroke(c, blob, { w: 3, closed: true, seed: 6420 + i });
          c.save(); c.translate(cx, cy + 110); fn(c); c.restore();
          F.fit(c, name, cx, cy - 120, 300, 50);
          P.check(c, cx + 170, cy - 150, 44, E.se(t, si + 3.0 + i * 0.4, si + 3.4 + i * 0.4), { w: 6, color: F.GREEN });
        });
      });
      E.inkText(ctx, 'Özellikler, yaşanan ortamda hayatta kalmayı destekler.', 960, 760, t, si + 3.6, sr + 0.2, { size: 46, align: 'center' });
      const rk = E.se(t, sr + 0.4, sr + 1.1, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        F.wfit(c, 'Her canlı kendi ortamında değerlidir.', 960, 780, E.seg(t, sr + 0.6, sr + 1.8), 54, 1500, { align: 'center', color: F.GREEN });
        F.wfit(c, 'Farklılıklara saygı · yaşam alanlarını koru', 960, 860, E.seg(t, sr + 2.0, sr + 3.2), 44, 1500, { align: 'center' });
      });
    }
  });
})();

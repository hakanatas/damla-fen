// SAHNE 10 — Mutasyonların olumlu / olumsuz etkileri (tartışma)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const F = F808;
  E.scene({
    name: 'Etkiler', concept: 'Zararlı · etkisiz · yararlı', from: 'effects', to: 'effects', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('effects');
      F.warmBg(ctx);
      const COLS = [
        ['zararlı olabilir', F.HEAT, ['ör. bazı kalıtsal', 'hastalıklar'], c => { F.squirrel(c, 0, 90, 0.6, null, { t, albino: true }); P.icon.eye(c, 110, -90, 0.45); }],
        ['belirgin etkisi olmaz', PAL.water, ['birçok mutasyon', 'fark edilmez'], c => { F.squirrel(c, -70, 90, 0.5, '#9A6A3A', { t }); F.fit(c, '=', 10, 30, 80, 70); F.squirrel(c, 90, 90, 0.5, '#9A6A3A', { t: t + 1 }); }],
        ['yarar sağlayabilir', F.GREEN, ['canlıya avantaj', 'sağlayan yeni özellik'], c => { [-90, 0, 90].forEach((dx, i) => F.squirrel(c, dx, 90, 0.42, ['#9A6A3A', '#6A4A2A', '#B08050'][i], { t: t + i })); }]
      ];
      COLS.forEach(([h, col, sub, fn], i) => {
        const at = se + 0.6 + i * 1.8, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const cx = 400 + i * 560;
        E.layer(ctx, k, c => {
          F.card(c, cx - 250, 200, 500, 560, 4400 + i, { tint: col, tintA: 0.1 });
          F.fit(c, h, cx, 280, 460, 48, { color: col });
          c.save(); c.translate(cx, 440); fn(c); c.restore();
          sub.forEach((s, j) => F.fit(c, s, cx, 640 + j * 48, 450, 38, { weight: 400 }));
        });
      });
      if (t > se + 1.4) { const k = E.se(t, se + 1.4, se + 2.0); ctx.save(); ctx.globalAlpha *= k; F.fit(ctx, 'beyaz kürk ormanda kolay fark edilir', 400, 588, 470, 34, { weight: 400 }); ctx.restore(); }
      E.inkText(ctx, 'Mutasyonlar, canlılardaki çeşitliliğin kaynaklarından biridir.', 960, 850, t, se + 6.4, 1e9, { size: 44, align: 'center', color: F.AMB });
    }
  });
})();

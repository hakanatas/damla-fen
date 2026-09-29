// SAHNE 5 — Aa × Aa çaprazlaması: her çocuk için 1/4 olasılık
(function () {
  const { PAL, stroke, line, circlePts, wobble } = INK;
  const F = F808;
  const X0 = 700, Y0 = 330, CW = 230, CH = 190;
  const CELLS = [['A', 'A'], ['A', 'a'], ['A', 'a'], ['a', 'a']]; // [anne, baba] sıralı: satır = anne, sütun = baba
  E.scene({
    name: 'Çaprazlama', concept: 'Aa × Aa; olasılık', from: 'cross', to: 'quarter', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('cross'), sq = E.s('quarter');
      F.warmBg(ctx);
      // ebeveynler
      const pk = E.se(t, sc + 0.3, sc + 1.0, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        F.person(c, 330, 560, 0.9, 'Aa', { seed: 31 }); F.fit(c, 'ebeveyn 1', 330, 610, 260, 38);
        F.person(c, 1640, 560, 0.9, 'Aa', { seed: 32 }); F.fit(c, 'ebeveyn 2', 1640, 610, 260, 38);
        F.fit(c, '×', 915, 225, 100, 70, { color: F.AMB });
      });
      // tablo
      const gk = E.se(t, sc + 1.4, sc + 2.4);
      if (gk > 0) {
        ctx.save(); ctx.globalAlpha *= gk;
        const box = F.rr(X0, Y0, CW * 2, CH * 2, 10, 3); P.fillPts(ctx, box, PAL.white, 0.9); stroke(ctx, box, { w: 3, closed: true, seed: 3800 });
        line(ctx, [X0 + CW, Y0], [X0 + CW, Y0 + 2 * CH], { w: 2.4, dry: false }); line(ctx, [X0, Y0 + CH], [X0 + 2 * CW, Y0 + CH], { w: 2.4, dry: false });
        ctx.restore();
        // üreme hücrelerindeki aleller
        const ak = E.se(t, sc + 2.4, sc + 3.2, 'out');
        if (ak > 0) { ['A', 'a'].forEach((L, i) => { F.allele(ctx, X0 + CW * (i + 0.5), Y0 - 50, 30 * P.pop(ak), L); F.allele(ctx, X0 - 50, Y0 + CH * (i + 0.5), 30 * P.pop(ak), L); }); }
        CELLS.forEach(([a, b], i) => {
          const r = Math.floor(i / 2), cI = i % 2, at = sc + 3.6 + i * 0.8, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const cx = X0 + CW * (cI + 0.5), cy = Y0 + CH * (r + 0.5);
          const g = [a, b].sort((p, q) => p === 'A' ? -1 : 1);
          F.allele(ctx, cx - 36, cy, 32 * P.pop(k), g[0]); F.allele(ctx, cx + 36, cy, 32 * P.pop(k), g[1]);
        });
      }
      // 1/4 vurgusu
      const qk = E.se(t, sq + 0.3, sq + 1.0);
      if (qk > 0) {
        ctx.save(); ctx.globalAlpha *= qk;
        stroke(ctx, wobble(circlePts(X0 + CW * 1.5, Y0 + CH * 1.5, 105, 80, 36), 3, 3810), { w: 4, closed: true, color: F.AMB });
        ctx.restore();
        E.inkText(ctx, 'aa → 1/4', X0 + 2 * CW + 50, Y0 + CH * 1.55, t, sq + 0.8, 1e9, { size: 60, color: F.AMB });
        E.inkText(ctx, 'AA, Aa → 3/4 hastalık görülmez', 960, 815, t, sq + 3.2, 1e9, { size: 48, align: 'center' });
        E.inkText(ctx, 'Olasılık her çocuk için ayrı ayrı geçerlidir.', 960, 885, t, sq + 5.0, 1e9, { size: 40, align: 'center', weight: 400, alpha: 0.85 });
      }
    }
  });
})();

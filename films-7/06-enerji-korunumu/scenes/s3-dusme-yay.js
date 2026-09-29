// SAHNE 3 — Gözlem 2: serbest düşme · Gözlem 3: sarmal yay (esneklik → kinetik → çekim potansiyel)
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = F7E, A = F76;
  E.scene({
    name: 'Serbest düşme', concept: 'Düşen cisimde potansiyel → kinetik', from: 'fall', to: 'fall', trFrom: [500, 500],
    draw(ctx, t) {
      const s = E.s('fall');
      const x = 520, y0 = 260, r = 36, fy = 840, yl = fy - r;
      const u = E.seg(t, s + 2.0, s + 5.2); // yavaş çekim, y ∝ u² (düzgün hızlanan)
      const y = y0 + (yl - y0) * u * u;
      line(ctx, [200, fy], [860, fy], { w: 3.4, seed: 6300 });
      // stroboskop izleri (eşit zaman aralıkları)
      if (u > 0) for (let i = 1; i <= 6; i++) { const ui = i / 6; if (ui > u) break; const yy = y0 + (yl - y0) * ui * ui; ctx.save(); ctx.globalAlpha *= 0.28; stroke(ctx, INK.circlePts(x, yy, r, r, 30), { w: 2, closed: true, dry: false }); ctx.restore(); }
      F.ball(ctx, x, y, r, F.KE, 6310, { stripe: true });
      E.inkText(ctx, 'eşit zaman aralıklarında konumlar', x + 70, 500, t, s + 5.4, 1e9, { size: 30, alpha: 0.7 });
      E.inkText(ctx, 'yavaş çekim', x, 200, t, s + 2.0, s + 5.4, { size: 32, align: 'center', alpha: 0.6 });
      const h = 1 - (y - y0) / (yl - y0);
      A.bars(ctx, 1080, 760, A.std(h, 1 - h, 0, false), { total: true, H: 340 });
      DAMLA.draw(ctx, { x: 300, y: fy, s: 0.9, view: 'q3', expr: u > 0.9 ? 'surprised' : 'curious', look: [0.6, -0.6], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Sarmal yay', concept: 'Esneklik potansiyel → kinetik → çekim potansiyel', from: 'spring', to: 'spring', trFrom: [520, 700],
    draw(ctx, t) {
      const s = E.s('spring');
      const x = 520, gy = 840, Ln = 180, r = 36, H = 400;
      const comp = 0.6 * E.se(t, s + 0.6, s + 2.2) * (1 - E.seg(t, s + 3.0, s + 3.7));
      const top = gy - Ln * (1 - comp);
      const fl = E.seg(t, s + 3.7, s + 5.6); // yükselme (yavaş çekim): h = H(1-(1-u)²)
      const hh = H * (1 - (1 - fl) * (1 - fl));
      const by = t < s + 3.7 ? top - r : gy - Ln - r - hh;
      line(ctx, [300, gy], [760, gy], { w: 3.4, seed: 6320 });
      F.vspring(ctx, x, gy, top + 12, { coils: 9, r: 34, seed: 6321 });
      const pl = F.rect(x - 56, top, x + 56, top + 14); P.fillPts(ctx, pl, '#8A6A45', 0.7); stroke(ctx, pl, { w: 2.2, closed: true, seed: 6322 });
      F.ball(ctx, x, by, r, F.KE, 6323, { stripe: true });
      if (t > s + 0.4 && t < s + 3.0) F.vec(ctx, [x + 110, top - 170], [x + 110, top - 40], 1, { w: 4, head: 14, label: 'sıkıştır', lx: 70, ly: 0, size: 30 });
      if (fl > 0.99) E.inkText(ctx, 'en yüksek nokta', x + 70, by + 10, t, s + 5.6, 1e9, { size: 32, color: F.PE });
      // enerji çubukları: esneklik, kinetik, çekim
      const ela = t < s + 3.0 ? comp / 0.6 : 1 - E.seg(t, s + 3.0, s + 3.7);
      const g = t < s + 3.7 ? 0 : hh / H;
      const ke = t < s + 3.0 ? 0 : 1 - ela - g;
      A.bars(ctx, 1000, 760, [
        { v: ela, col: A.ELA, name: 'esneklik\npotansiyel', hatch: true },
        { v: Math.max(0, ke), col: F.KE, lcol: '#9A6412', name: 'kinetik' },
        { v: g, col: F.PE, name: 'çekim\npotansiyel' }
      ], { H: 340, gap: 190, total: t > s + 2.2 });
      DAMLA.draw(ctx, { x: 250, y: gy, s: 0.9, view: 'q3', expr: fl > 0.5 ? 'surprised' : 'determined', look: [0.6, -0.4], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.9]] });
    }
  });
})();

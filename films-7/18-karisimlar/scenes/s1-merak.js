// SAHNE 1 — Merak: günlük hayattaki karışımlar (salata, ayran, limonata) — köprü kurma
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const K = K7;
  window.F18 = {
    damla(ctx, t, o) { DAMLA.draw(ctx, Object.assign({ view: 'q3', expr: 'neutral', look: [0.3, 0], blink: E.blink(t, o.seed ?? 4), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.35]] }, o)); },
    glass(ctx, cx, by, w, h, col, a, o = {}) { // bardak (üstten biraz geniş)
      const L = cx - w / 2, R = cx + w / 2, top = by - h, lv = by - 10 - (h - 30) * (o.level ?? 0.8);
      const liq = [[L + 8 + (lv - top) * 0.06, lv], [R - 8 - (lv - top) * 0.06, lv], [R - 12 - h * 0.06, by - 8], [L + 12 + h * 0.06, by - 8]];
      P.fillPts(ctx, liq, col, a); wash(ctx, liq, col, 0.3, 5100 + (o.seed ?? 0), { bleed: 1, blooms: 0 });
      const g = [[L, top], [L + h * 0.08, by], [R - h * 0.08, by], [R, top]]; stroke(ctx, g, { w: 3, seed: 5110 + (o.seed ?? 0) });
      line(ctx, [R - 18, top + 20], [R - 22 - h * 0.05, by - 30], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    }
  };
  function salad(ctx, cx, cy, t) {
    const bowl = P.arc(cx, cy, 150, 0, Math.PI, 30, 90); P.fillPts(ctx, bowl, '#FAF6EC');
    const r = INK.rng(5200); const cols = [PAL.life, '#8FB35A', '#C95C3A', '#E3C454', PAL.life];
    for (let i = 0; i < 14; i++) { const x = cx - 120 + r() * 240, y = cy - 10 - r() * 50; const c = circlePts(x, y, 22 + r() * 12, 14 + r() * 8, 18, r() * 3); P.fillPts(ctx, c, cols[i % 5], 0.85); stroke(ctx, c, { w: 1.6, closed: true, dry: false, seed: 5210 + i }); }
    stroke(ctx, bowl, { w: 3.2, seed: 5230 }); stroke(ctx, [[cx - 156, cy], [cx + 156, cy - 2]], { w: 3, seed: 5231 });
  }
  E.scene({
    name: 'Merak', concept: 'Günlük hayatta karışımlar', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      K.bench(ctx, -40, 1960, 860, 5300);
      const items = [
        (c) => salad(c, 1030, 790, t),
        (c) => F18.glass(c, 1340, 860, 150, 230, '#F4F1E6', 0.95, { seed: 1 }),
        (c) => { F18.glass(c, 1600, 860, 150, 230, '#EFD560', 0.8, { seed: 2 }); P.fillPts(c, circlePts(1640, 640, 34, 34, 24), '#E8E070', 0.9); stroke(c, circlePts(1640, 640, 34, 34, 24), { w: 2.4, closed: true, dry: false }); }
      ];
      const names = [['salata', 1030, 580], ['ayran', 1340, 580], ['limonata', 1600, 560]];
      items.forEach((f, i) => { const k = E.se(t, 0.6 + i * 0.4, 1.2 + i * 0.4, 'out'); if (k > 0) E.layer(ctx, k, f); });
      names.forEach(([n, x, y], i) => E.inkText(ctx, n, x, y, t, sh + 1.2 + i * 0.8, 1e9, { size: 44, align: 'center' }));
      const kk = E.seg(t, sh + 3.8, sh + 4.8);
      if (kk > 0) { P.drawOn(ctx, [[900, 470], [904, 450], [1700, 448], [1704, 470]], kk, { w: 3 }); P.write(ctx, 'hepsi birer karışım', 1300, 420, kk, { size: 52, align: 'center', color: PAL.water }); }
      const bk = E.se(t, sq + 0.5, sq + 1.2, 'out');
      if (bk > 0) {
        P.bubble(ctx, 600, 265, 820, 190, [480, 560], bk, 5);
        if (bk > 0.7) { P.write(ctx, 'karışım', 300, 280, E.seg(t, sq + 1.2, sq + 2.0), { size: 54 }); INK.label(ctx, '↔', 540, 280, { size: 56, weight: 700, align: 'center', alpha: E.se(t, sq + 2.0, sq + 2.4) }); P.write(ctx, 'saf madde ?', 600, 280, E.seg(t, sq + 2.2, sq + 3.0), { size: 54 }); }
      }
      F18.damla(ctx, t, { x: 420, y: 860, s: 1.4, look: t > sq ? [0.4, -0.6] : [0.8, -0.1], expr: t > sq ? 'thinking' : (t > sh ? 'happy' : 'neutral'),
        arms: t > sh && t < sh + 2 ? [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 8)]] : (t > sq ? [[-1, 0.35], [1, [30, -86]]] : [[-1, 0.35], [1, 1.3]]) });
      K.title(ctx, t, '18 · Karışımlar ve Çözünme Hızı', 5);
    }
  });
})();

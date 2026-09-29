// SAHNE 2 — Gözlem 1: sarkaç (yavaş çekim). Çubuklar nitel: potansiyel ∝ yükseklik, kinetik = kalan (sürtünme ihmal)
(function () {
  const { PAL, line, dashed } = INK;
  const F = F7E, A = F76;
  const TH0 = 0.75;
  window.F76.th2 = function (t) { // senaryolu açı
    const st = E.s('p-top'), sb = E.s('p-bottom'), su = E.s('p-up');
    const rel = st + 5.0, tb = sb + 0.8, tu = su + 3.2;
    if (t < rel) return -TH0 * E.se(t, st + 0.8, st + 2.4);
    if (t < tb) return -TH0 * Math.cos(Math.PI / 2 * E.seg(t, rel, tb));
    if (t < tu) return -TH0 * Math.cos(Math.PI / 2 + Math.PI / 2 * E.seg(t, tb + 1.2, tu));
    return TH0 * Math.cos((t - tu) * 2.4);
  };
  E.scene({
    name: 'Sarkaç', concept: 'Potansiyel ⇄ kinetik dönüşümü', from: 'p-top', to: 'p-up', trFrom: [560, 500],
    draw(ctx, t) {
      const st = E.s('p-top'), sb = E.s('p-bottom'), su = E.s('p-up');
      const px = 560, py = 250, L = 420, r = 40;
      const th = F76.th2(t);
      const h = (1 - Math.cos(th)) / (1 - Math.cos(TH0));
      const pull = t < st + 5.0;
      // en alçak nokta çizgisi ve yükseklik
      const low = py + L, topY = py + L * Math.cos(TH0);
      const dl = (x0, x1, y) => { const p = []; for (let x = x0; x <= x1; x += 4) p.push([x, y + r]); ctx.save(); ctx.globalAlpha *= 0.5; dashed(ctx, p, { w: 2, on: 10, off: 8 }); ctx.restore(); };
      dl(px - 420, px + 420, low); dl(px - 420, px + 420, topY);
      if (t > st + 2.6) A.ghost(ctx, px, py, L, -TH0, r, 0.22);
      if (t > sb + 1) A.ghost(ctx, px, py, L, 0, r, 0.22);
      A.pend(ctx, px, py, L, th, r, { floor: 850, half: 400 });
      if (pull && t > st + 0.6) F.vec(ctx, [px - 60, py + L - 40], [px - 60 - 180 * E.se(t, st + 0.8, st + 2.4), py + L - 80], 1, { w: 4, head: 14 });
      const slow = t > st + 5 && t < su + 3.2;
      if (slow) E.inkText(ctx, 'yavaş çekim', px, py - 40, t, st + 5.1, su + 3.2, { size: 34, align: 'center', alpha: 0.6 });
      E.inkText(ctx, 'bir an durur', px - 286, topY - 60, t, st + 3.0, 1e9, { size: 34, align: 'center', color: F.PE });
      E.inkText(ctx, 'en hızlı', px + 80, low + r + 50, t, sb + 1.0, 1e9, { size: 34, color: '#9A6412' });
      E.inkText(ctx, 'yine durur', px + 286, topY - 60, t, su + 3.3, 1e9, { size: 34, align: 'center', color: F.PE });
      // çubuklar
      E.layer(ctx, E.se(t, st + 1.0, st + 1.8), c => {
        F.txt(c, 'enerji (nitel)', 1330, 250, { size: 36, align: 'center', alpha: 0.7 });
        A.bars(c, 1100, 700, A.std(h, t < st + 5 ? 0 : 1 - h, 0, false), { total: true, H: 340 });
      });
      DAMLA.draw(ctx, { x: 1790, y: 860, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.9, -0.2], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });
})();

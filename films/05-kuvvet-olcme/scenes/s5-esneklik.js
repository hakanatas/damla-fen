// SAHNE 5 — Esneklik: kuvvet büyüdükçe yay daha çok uzar, kuvvet kalkınca eski hâline döner (TYMM: esneklik kavramı)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const BR = '#8A4A10', X = 760, Y = 90, FY = 912;
  function miniSpring(ctx, x, y, len, k) { // small spring hanging from a bar
    line(ctx, [x - 60, y], [x + 60, y], { w: 5, taper: 0 });
    F05.spring(ctx, x, y + 6, y + 6 + len, { coils: 9, r: 20, w: 2.4 });
    const b = F05.rect(x - 26, y + 6 + len, x + 26, y + 40 + len); P.fillPts(ctx, b, PAL.paperDeep); stroke(ctx, b, { w: 2.4, closed: true, dry: false });
  }
  E.scene({
    name: 'Esneklik', concept: 'Yayın esnekliği', from: 'stretch', to: 'elastic', trFrom: [760, 500],
    draw(ctx, t) {
      const ss = E.s('stretch'), se = E.s('elastic');
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      F05.floor(ctx, FY, 3);
      line(ctx, [600, Y + 4], [1000, Y + 2], { w: 7, taper: 0.02, seed: 2301 });
      stroke(ctx, [[1000, Y + 2], [1004, FY]], { w: 7, seed: 2302, taper: 0.02 });
      // force profile
      const rel = ss + 5.4;
      let F = 3 * E.se(t, ss + 0.8, ss + 2.2) + 4 * E.se(t, ss + 3.0, ss + 4.4);
      if (t > rel) { const u = t - rel; F = 7 * Math.exp(-3 * u) * Math.cos(9 * u); }
      const holding = t < rel;
      const r = F05.dyn(ctx, X, Y, { L: 460, W: 100, max: 10, F });
      // rest line + stretch bracket
      ctx.save(); ctx.globalAlpha = 0.6; dashed(ctx, [[X - 60, r.s0], [X + 150, r.s0]], { w: 2, on: 8, off: 7, color: BR }); ctx.restore();
      if (F > 0.3) {
        const bx = X + 120; line(ctx, [bx, r.s0], [bx, r.py], { w: 2.4, dry: false, color: BR }); INK.arrowHead(ctx, [bx, r.py - 10], [bx, r.py], 10, { w: 2.4, color: BR });
        INK.label(ctx, 'uzama', bx + 14, (r.s0 + r.py) / 2 + 12, { size: 36, weight: 700, color: BR });
      }
      // readings
      [[3, ss + 2.2, ss + 3.0], [7, ss + 4.4, rel]].forEach(([v, a, b], i) => {
        const k = Math.min(E.se(t, a, a + 0.4), 1 - E.se(t, b, b + 0.3)); if (k <= 0) return;
        INK.label(ctx, v + ' N', X + 260, r.py + 16, { size: 64, weight: 700, alpha: k });
      });
      // force arrow at hook (length ∝ F)
      if (holding && F > 0.3) P.arrow(ctx, [X + 44, r.hook[1] - 6], [X + 44, r.hook[1] - 6 + 9 * F], 1, { w: 3 + F * 0.5, head: 14 + F, color: BR });
      if (t > rel && t < rel + 2.2) E.inkText(ctx, 'bıraktım!', X - 250, 520, t, rel, rel + 2.4, { size: 48, color: BR });
      // Damla pulls the hook
      const dx = 630, s = 1.3;
      const hl = [(X - dx) / s - 4, (r.hook[1] - FY) / s + 4];
      const pull = E.clamp(F / 7);
      DAMLA.draw(ctx, { x: dx, y: FY, s, view: 'q3', expr: holding ? (F > 5 ? 'determined' : 'curious') : (t < se ? 'surprised' : 'happy'), look: [0.5, -0.8], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1,
        lean: holding ? -0.08 * pull : 0,
        arms: holding && t > ss + 0.3 ? [[-1, 0.5 + 0.4 * pull], [1, hl]] : [[-1, 0.35], [1, 0.4]] });
      // elasticity panel
      const pk = E.se(t, se, se + 0.8);
      if (pk > 0) E.layer(ctx, pk, c => {
        F05.card(c, 1130, 150, 1850, 860, { seed: 2310 });
        P.write(c, 'esneklik', 1490, 240, E.seg(t, se + 0.3, se + 1.3), { size: 70, align: 'center', color: BR });
        const cols = [[1250, 'kuvvet yok', 70, se + 1.0], [1490, 'kuvvet var', 190, se + 2.2], [1730, 'kuvvet kalktı', 70, se + 3.4]];
        cols.forEach(([x, lab, len, at], i) => {
          const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k;
          const L2 = i === 1 ? E.lerp(70, 190, E.se(t, at + 0.2, at + 1.0)) : len;
          miniSpring(c, x, 320, L2, k);
          if (i === 1) P.arrow(c, [x, 360 + L2], [x, 450 + L2], E.se(t, at + 0.2, at + 0.8), { w: 4, head: 16, color: BR });
          c.font = '700 36px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; c.fillText(lab, x, 700);
          c.font = '400 32px Kalam'; c.fillText(['kısa', 'yay uzar', 'eski hâline döner'][i], x, 745);
          c.restore();
          if (i > 0) P.arrow(c, [x - 190, 480], [x - 60, 480], E.se(t, at - 0.2, at + 0.3), { w: 2.4, head: 12 });
        });
        E.inkText(c, 'Dinamometre esneklik sayesinde çalışır.', 1490, 820, t, se + 4.6, 1e9, { size: 38, align: 'center' });
      });
    }
  });
})();

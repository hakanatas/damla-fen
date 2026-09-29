// SAHNE 2 — Köprü: saatin camından duvara yansıyan ışık lekesi + güvenlik uyarısı
// Leke konumu hesaplanır: güneş ışını d, cam normali n(φ), r = d − 2(d·n)n, duvar x = WALL ile kesişim.
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F611, V = F.V;
  const WALL = 1560, FLOOR = 860, W = [860, 690], SRC = [330, 380];
  const D = V.norm(V.sub(W, SRC));
  const DEG = Math.PI / 180;

  function phiAt(t) {
    const sw = E.s('watch');
    const k = E.se(t, sw + 3.0, sw + 3.6);
    return (8 + k * 5 * Math.sin((t - sw - 3.0) * 1.3)) * DEG;
  }
  function spot(phi) {
    const n = [Math.sin(phi), -Math.cos(phi)];
    const r = V.reflect(D, n); const tt = (WALL - W[0]) / r[0];
    return { n, r, p: [WALL, W[1] + r[1] * tt] };
  }

  E.scene({
    name: 'Saatin camı', concept: 'Köprü: yansıyan ışık lekesi', from: 'watch', to: 'safety', trFrom: [860, 690],
    draw(ctx, t) {
      const sw = E.s('watch'), ss = E.s('safety');
      // oda: duvar, pencere, zemin, masa
      const wallP = [[WALL, 150], [1920, 150], [1920, FLOOR], [WALL, FLOOR]];
      wash(ctx, wallP.concat([wallP[0]]), '#D9C9A6', 0.35, 620, { bleed: 1, blooms: 0 });
      line(ctx, [WALL, 150], [WALL, FLOOR], { w: 3.2, seed: 621 });
      line(ctx, [60, FLOOR], [1880, FLOOR], { w: 3, seed: 622 });
      const win = [[150, 190], [440, 186], [444, 470], [154, 474], [150, 190]];
      P.fillPts(ctx, win, '#F8E6B8', 0.8); stroke(ctx, win, { w: 3.2, closed: true, seed: 623 });
      line(ctx, [297, 190], [299, 472], { w: 2.6, seed: 624 }); line(ctx, [152, 330], [442, 328], { w: 2.6, seed: 625 });
      P.sun(ctx, 225, 255, 34, t, { nrays: 12, cells: false });
      // masa
      const top = [[640, 720], [1080, 716], [1080, 734], [640, 738], [640, 720]];
      P.fillPts(ctx, top, '#B08A5A', 0.9); stroke(ctx, top, { w: 2.6, closed: true, seed: 626 });
      line(ctx, [670, 736], [676, FLOOR], { w: 4, seed: 627 }); line(ctx, [1050, 734], [1046, FLOOR], { w: 4, seed: 628 });
      INK.label(ctx, 'duvar', WALL + 180, FLOOR - 30, { size: 36, align: 'center', alpha: 0.7 });

      const phi = phiAt(t), sp = spot(phi);
      // güneş ışını pencereden cama
      const kin = E.se(t, sw + 0.3, sw + 1.3);
      F.ray(ctx, SRC, W, kin, { seed: 631, heads: [0.5] });
      // yansıyan ışın camdan duvara
      const kout = E.se(t, sw + 1.3, sw + 2.3);
      F.ray(ctx, W, sp.p, kout, { seed: 632, heads: [0.5] });
      // saat
      F.watch(ctx, W[0], W[1], phi, 0.9);
      // leke
      if (kout > 0.98) {
        const a = E.se(t, sw + 2.2, sw + 2.7);
        F.glow(ctx, sp.p[0] + 8, sp.p[1], 110, a, '250,215,120');
        const el = circlePts(sp.p[0] + 6, sp.p[1], 14, 46, 30);
        ctx.save(); ctx.globalAlpha *= a; P.fillPts(ctx, el, '#FFE9A8', 0.95); stroke(ctx, el, { w: 2, closed: true, color: F.AMB, dry: false }); ctx.restore();
        INK.label(ctx, 'ışık lekesi', WALL + 40, sp.p[1] + 12, { size: 36, weight: 700, alpha: a * (1 - E.se(t, ss, ss + 0.5)) });
      }
      INK.label(ctx, 'saatin camı', W[0], W[1] + 110, { size: 36, align: 'center', alpha: E.se(t, sw + 1, sw + 1.6) });
      // saat eğilirken ok
      if (t > sw + 3.2 && t < ss) { const k = E.se(t, sw + 3.2, sw + 3.8); ctx.save(); ctx.globalAlpha *= k; stroke(ctx, P.arc(W[0], W[1] + 10, 120, -2.2, -0.9, 20), { w: 2.4, dry: false }); INK.arrowHead(ctx, [W[0] + 120 * Math.cos(-0.95), W[1] + 10 + 120 * Math.sin(-0.95)], [W[0] + 120 * Math.cos(-0.9), W[1] + 10 + 120 * Math.sin(-0.9)], 12, { w: 2.4 }); INK.arrowHead(ctx, [W[0] + 120 * Math.cos(-2.15), W[1] + 10 + 120 * Math.sin(-2.15)], [W[0] + 120 * Math.cos(-2.2), W[1] + 10 + 120 * Math.sin(-2.2)], 12, { w: 2.4 }); ctx.restore(); }
      // Damla
      DAMLA.draw(ctx, { x: 520, y: FLOOR, s: 1.25, view: 'q3', expr: t > ss ? 'surprised' : (t > sw + 3.2 ? 'curious' : 'happy'), look: t > ss ? [0.2, 0] : [0.8, 0.1], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 2,
        arms: t > ss ? [[-1, 0.35], [1, 2.6]] : [[-1, 0.35], [1, [100, -120], 1]] });
      // güvenlik kartı
      F.warn(ctx, 500, 200, 1000, 230, E.se(t, ss + 0.2, ss + 0.8, 'out'), ['Dikkat!', 'Yansıyan güneş ışığını', 'kimsenin gözüne tutma!'], { size: 46, lh: 60 });
    }
  });
})();

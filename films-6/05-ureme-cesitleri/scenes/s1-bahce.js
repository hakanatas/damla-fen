// SAHNE 1 — Bahçe: iki gözlem (tavuk-civciv, çilek-fide) ve merak sorusu
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  E.scene({
    name: 'Bahçe', concept: 'Merak: canlılar nasıl çoğalır?', from: 'title', to: 'q',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello'), so = E.s('obs'), sq = E.s('q');
      const zin = E.se(t, sh, sh + 3, 'sine');
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * zin, y: 540 + 30 * zin, z: 1 + 0.05 * zin });
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [150, P.hillY(hill, 150) + 6] });
      // çilek
      const sx = 820, sy = P.hillY(hill, sx) + 6;
      const kr = E.se(t, so + 5.2, so + 7.6), kp = E.se(t, so + 7.2, so + 8.6, 'out');
      F.strawberry(ctx, sx, sy, 1.1, kr, kp, t, { run: 240, flower: true });
      // tavuk ve civciv
      const hx = 1460, hy = P.hillY(hill, hx) + 6;
      F.hen(ctx, hx, hy, 1.15, t);
      const cx = 1680, cy = P.hillY(hill, cx) + 6;
      const kc = E.se(t, so + 0.8, so + 2.0, 'back');
      F.shell(ctx, cx + 70, cy, 1);
      if (kc > 0) F.chick(ctx, cx, cy, 1.25 * kc, t, 1);
      // etiketler
      const k1 = E.se(t, so + 1.6, so + 2.6);
      if (k1 > 0) { F.tag(ctx, 'yumurta → civciv', 1560, 560, [cx, cy - 80], k1, { size: 40, seed: 12 }); }
      const k2 = E.se(t, so + 7.6, so + 8.6);
      if (k2 > 0) F.tag(ctx, 'çilek → yeni fide', 960, 610, [sx + 250, sy - 30], k2, { size: 40, seed: 13 });
      // Damla
      const dx = 470, dy = P.hillY(hill, dx) + 4;
      const inQ = t >= sq;
      const look = t < so ? [0.2, 0.1] : t < so + 4.5 ? [0.9, 0.1] : t < sq ? [0.5, 0.2] : [-0.2, -0.6];
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: inQ ? 'thinking' : (t > so ? 'curious' : 'happy'), look, blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: inQ ? [[-1, 0.3], [1, [30, -86]]] : (t < so && t > sh + 0.4 ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : [[-1, 0.35], [1, 0.5]]), prop: t > so && !inQ ? 'lens' : null, propTilt: -0.3 });
      // merak balonu
      const kb = E.se(t, sq + 0.4, sq + 1.0, 'out');
      if (kb > 0) {
        ctx.save(); ctx.font = '700 46px Kalam'; const txt = 'Hepsi aynı yolla mı çoğalır?'; const w = ctx.measureText(txt).width + 120; ctx.restore();
        P.bubble(ctx, 900, 330, w, 150, [560, 520], kb, 4);
        if (kb > 0.6) P.write(ctx, txt, 900, 346, E.seg(t, sq + 0.8, sq + 2.2), { size: 46, align: 'center' });
      }
      ctx.restore();
      F.title(ctx, t, '5', 'Canlılar Nasıl Çoğalır?', '3');
    }
  });
})();

// SAHNE 3–4 — Doğurarak ve yumurtayla çoğalma (kısaca; iç/dış döllenme ve iç/dış gelişmeye girilmez); büyüme ve gelişme
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F07;
  E.scene({
    name: 'Doğurarak · yumurtayla', concept: 'Doğurarak ve yumurtayla çoğalma', from: 'birth', to: 'egg', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('birth'), se = E.s('egg');
      line(ctx, [960, 190], [960, 880], { w: 3, seed: 70, alpha: E.se(t, sb, sb + 0.6) });
      P.write(ctx, 'Doğurarak çoğalanlar', 480, 240, E.seg(t, sb + 0.2, sb + 1.2), { size: 54, align: 'center', color: '#8E4A6A' });
      const pop = (at, fn) => { const k = E.se(t, at, at + 0.6, 'out'); if (k > 0) E.layer(ctx, k, fn); };
      const lab = (c, txt, x, y) => INK.label(c, txt, x, y, { size: 40, weight: 700, align: 'center' });
      pop(sb + 1.4, c => { F.cat(c, 220, 500, 0.75, { base: '#C98F5A', seed: 5200 }, t); F.cat(c, 330, 500, 0.36, { base: '#C98F5A', patch: '#EDE4D3', seed: 5360 }, t + 1); lab(c, 'kedi', 270, 560); });
      pop(sb + 2.4, c => { F.cow(c, 690, 500, 0.95); lab(c, 'inek', 700, 560); });
      pop(sb + 3.4, c => { const w = [[90, 780], [470, 776], [470, 830], [90, 834]]; INK.wash(c, w, PAL.water, 0.22, 71, { bleed: 2, blooms: 0 }); F.dolphin(c, 280, 750, 0.95, t); lab(c, 'yunus', 280, 870); });
      pop(sb + 4.4, c => { F.bat(c, 700, 730, 1.0, t); lab(c, 'yarasa', 700, 870); });
      const ke = E.se(t, se - 0.2, se + 0.6);
      if (ke > 0) E.layer(ctx, ke, c => {
        P.write(c, 'Yumurtayla çoğalanlar', 1440, 240, E.seg(t, se + 0.2, se + 1.2), { size: 54, align: 'center', color: '#A06A10' });
        const pop2 = (at, fn) => { const k = E.se(t, at, at + 0.6, 'out'); if (k > 0) E.layer(c, k, fn); };
        pop2(se + 1.4, cc => { F.hen(cc, 1140, 500, 0.7, t); F.eggs(cc, 1290, 480, 3, 18, { ov: 1 }); lab(cc, 'tavuk', 1200, 560); });
        pop2(se + 2.4, cc => { F.eggs(cc, 1540, 480, 4, 14, {}); F.turtle(cc, 1700, 500, 0.85); lab(cc, 'kaplumbağa', 1640, 560); });
        pop2(se + 3.4, cc => { const w = [[1020, 700], [1420, 696], [1420, 830], [1020, 834]]; INK.wash(cc, w, PAL.water, 0.22, 72, { bleed: 2, blooms: 0 }); F.fish(cc, 1170, 750, 0.95, t); F.eggs(cc, 1340, 780, 6, 9, { dot: 1, fill: '#F1F0E4' }); lab(cc, 'balık', 1220, 870); });
        pop2(se + 4.4, cc => { F.leaf(cc, 1560, 800, 170, -0.25, 73, { wr: 0.4 }); F.eggs(cc, 1650, 770, 4, 7, { fill: '#F6ECC0' }); F.butterfly(cc, 1700, 680, 0.8, t); lab(cc, 'kelebek', 1660, 870); });
      });
    }
  });
  E.scene({
    name: 'Büyüme ve gelişme', concept: 'Yavru büyür ve gelişir', from: 'grow', to: 'grow', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('grow'); const gy = 800;
      line(ctx, [150, gy], [1770, gy - 4], { w: 3, seed: 80 });
      const C = [[380, 0.45, 'yavru', 0.4], [880, 0.72, 'genç', 1.8], [1420, 1.0, 'yetişkin', 3.2]];
      C.forEach(([x, s, n, at], i) => { const k = E.se(t, s0 + at, s0 + at + 0.7, 'out'); if (k <= 0) return; E.layer(ctx, k, c => { F.cat(c, x, gy, s, { base: '#C98F5A', stripe: '#8A5A30', seed: 5280 }, t + i); INK.label(c, n, x, gy + 70, { size: 42, weight: 700, align: 'center' }); });
        if (i > 0) P.arrow(ctx, [C[i - 1][0] + 130, gy - 90], [x - 140, gy - 90], E.se(t, s0 + at - 0.4, s0 + at + 0.3), { w: 3, head: 14 }); });
      P.write(ctx, 'Beslenir, büyür ve gelişir.', 960, 300, E.seg(t, s0 + 4.2, s0 + 5.4), { size: 58, align: 'center' });
      P.write(ctx, 'Yavru, doğduğunda annesine benzer.', 960, 380, E.seg(t, s0 + 5.4, s0 + 6.6), { size: 44, align: 'center', weight: 400 });
    }
  });
})();

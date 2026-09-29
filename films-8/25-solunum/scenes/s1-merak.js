// SAHNE 1 — Merak: ip atlayan Ela; hareketin enerjisi nereden? Soluk alıp verme ≠ hücrede solunum (FB.8.7.3 giriş)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  E.scene({
    name: 'Merak', concept: 'Enerji nereden gelir? Solunum nerede olur?', from: 'title', to: 'breath',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q'), sb = E.s('breath');
      const hill = P.hillLine(E.W, 950);
      const kScene = 1 - E.se(t, sb - 0.2, sb + 0.6);
      E.layer(ctx, Math.max(kScene, 0.0011), c => {
        P.sun(c, 1680, 230, 70, t, { nrays: 16, cells: false });
        P.landscape(c, E.W, E.H, t, { hill, tree: false });
        // Ela ip atlıyor (büst + ip)
        const ex = 1180, ph = t * 5.2, jump = Math.abs(Math.sin(ph / 2)) * 36;
        const ey = P.hillY(hill, ex) - 145 - jump;
        const ra = ph / 2 % Math.PI;  // ip fazı
        const back = Math.sin(ph / 2 + Math.PI / 2) > 0;
        const rope = () => { const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const x = ex - 150 + u * 300; const yy = ey + 120 - Math.sin(u * Math.PI) * 330 * Math.cos(ph / 2 + Math.PI / 2 * 0); pts.push([x, yy]); } stroke(c, pts, { w: 3, color: '#8A4A10', dry: false }); };
        if (back) rope();
        U.kid(c, ex, ey, 1.0, { hair: 'long', shirt: U.HEAT, expr: t > sq ? 'o' : 'smile', seed: 2 });
        if (!back) rope();
        INK.label(c, 'Ela', ex + 140, ey + 40, { size: 38, weight: 700, alpha: 0.85 });
        for (let j = 0; j < 2; j++) { const u = ((t * 0.9) + j / 2) % 1; U.drop(c, ex + 70 + j * 20, ey - 150 + u * 50, 8, { alpha: (1 - u) * 0.8 * E.se(t, sh + 2, sh + 3) }); }
        const dx = 620, dy = P.hillY(hill, dx) + 4;
        U.damla(c, t, { x: dx, y: dy, s: 1.3, expr: t > sq ? 'thinking' : 'curious', look: [0.8, -0.3], arms: t > sq ? [[-1, 0.4], [1, [34, -96]]] : U.wave(t) });
        // besin → ? → enerji
        const kq = E.se(t, sq + 0.3, sq + 1.0);
        if (kq > 0) E.layer(c, kq, cc => {
          U.card(cc, 250, 190, 900, 190, 5101, { tint: U.AMB, tintA: 0.1 });
          // elma + ekmek
          const ap = circlePts(360, 280, 42, 40, 30); U.shape(cc, ap, '#B5553F', 0.55, 5102); line(cc, [360, 242], [366, 222], { w: 3, color: '#6E5234', dry: false }); U.leaf(cc, 368, 232, 28, -0.6, 5103);
          const br = U.rr(420, 250, 110, 70, 26, 4); U.shape(cc, br, '#C9A46A', 0.6, 5104);
          U.fit(cc, 'besin', 440, 360, 200, 34, { alpha: 0.8 });
          P.arrow(cc, [570, 285], [700, 285], E.se(t, sq + 1.2, sq + 1.8), { w: 3.4 });
          U.fit(cc, '?', 760, 312, 80, 90, { color: '#8A5A12' });
          P.arrow(cc, [820, 285], [950, 285], E.se(t, sq + 2.2, sq + 2.8), { w: 3.4 });
          const ks = E.se(t, sq + 2.8, sq + 3.4);
          if (ks > 0) { for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283 + t * 0.6; line(cc, [1030 + Math.cos(a) * 26, 280 + Math.sin(a) * 26], [1030 + Math.cos(a) * (26 + 26 * ks), 280 + Math.sin(a) * (26 + 26 * ks)], { w: 3, color: U.AMB, dry: false }); } INK.inkDot(cc, 1030, 280, 16, { color: '227,160,58' }); U.fit(cc, 'enerji', 1030, 360, 200, 34, { color: '#8A5A12' }); }
        });
      });
      // soluk alıp verme ≠ hücrede solunum
      const kb = E.se(t, sb, sb + 0.8);
      if (kb > 0) E.layer(ctx, kb, c => {
        U.card(c, 170, 200, 720, 560, 5110, { tint: PAL.water, tintA: 0.08 });
        U.card(c, 1030, 200, 720, 560, 5111, { tint: U.LIFE, tintA: 0.1 });
        P.write(c, 'soluk alıp verme', 530, 280, E.seg(t, sb + 0.4, sb + 1.4), { size: 50, align: 'center', color: '#1F4A63' });
        U.kid(c, 470, 520, 1.1, { hair: 'long', shirt: U.HEAT, expr: 'o', seed: 2 });
        const u = (t * 0.5) % 1;
        P.arrow(c, [680, 470], [560, 470], 1, { w: 3, color: PAL.water }); P.arrow(c, [560, 520], [680, 520], 1, { w: 3, color: '#6E6A64' });
        U.fit(c, 'hava girer', 695, 478, 170, 30, { align: 'left', color: '#1F4A63' }); U.fit(c, 'hava çıkar', 695, 528, 170, 30, { align: 'left', color: '#4A4640' });
        U.fit(c, 'akciğerlerde gaz alışverişi', 530, 720, 640, 34, { alpha: 0.8 });
        P.write(c, 'hücrede solunum', 1390, 280, E.seg(t, sb + 2.6, sb + 3.6), { size: 50, align: 'center', color: U.LIFE_D });
        const kc = E.se(t, sb + 3.0, sb + 4.0);
        if (kc > 0) { c.save(); c.globalAlpha *= kc; U.animalCell(c, 1390, 500, 220, 160, 3, { ms: 1.2 }); c.restore(); }
        U.stamp(c, 1390, 715, 'asıl solunum burada!', E.se(t, sb + 5.0, sb + 5.6, 'out'), { size: 40, rot: -0.06 });
      });
      U.title(ctx, t, '25 · Besinden Enerjiye: Canlılarda Solunum', 'Fen Bilimleri · 8. sınıf · Ünite 7', U.LIFE);
    }
  });
})();

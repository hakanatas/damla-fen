// SAHNE 3 — Soğurma (FB.6.4.4 a: nitelikleri tanımlar, c: verilere dayanarak soğurmayı açıklar)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  function squiggle(ctx, x, y, t, i, a) {
    const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([x + Math.sin(u * 9 + t * 5 + i) * 6, y - u * 60]); }
    ctx.save(); ctx.globalAlpha *= a; stroke(ctx, pts, { w: 3, color: F.HEAT, seed: 60 + i }); ctx.restore();
  }
  E.scene({
    name: 'Soğurma', concept: 'Işık yansır ya da soğurulur', from: 'absorb', to: 'summer', trFrom: [960, 300],
    draw(ctx, t) {
      const sa = E.s('absorb'), sh = E.s('heat'), su = E.s('summer');
      const toShirt = E.se(t, su + 0.2, su + 1.4);
      const SURF = [{ x: 560, c: F.OBJ.white, name: 'beyaz yüzey', refl: [1, 1, 1, 0], seed: 1 }, { x: 1360, c: F.OBJ.black, name: 'siyah yüzey', refl: [0, 0, 0.35, 0], seed: 2 }];
      const Y = 640;
      SURF.forEach((S, si) => {
        // surface slab → T-shirt in the summer beat
        E.layer(ctx, 1 - toShirt, c => {
          const slab = [[S.x - 250, Y], [S.x + 250, Y - 4], [S.x + 252, Y + 110], [S.x - 248, Y + 112], [S.x - 250, Y]];
          P.fillPts(c, slab, S.c); stroke(c, slab, { w: 3, closed: true, seed: 70 + si });
          if (si === 1) { // absorbed energy warms the black surface
            const hk = E.se(t, sh + 0.8, sh + 2.2);
            if (hk > 0) { const g = c.createRadialGradient(S.x, Y + 50, 10, S.x, Y + 50, 260); g.addColorStop(0, `rgba(181,85,63,${0.45 * hk})`); g.addColorStop(1, 'rgba(181,85,63,0)'); c.fillStyle = g; c.fillRect(S.x - 260, Y - 30, 520, 200); }
          }
          INK.label(c, S.name, S.x, Y + 170, { size: 40, weight: 700, align: 'center' });
        });
        if (toShirt > 0) E.layer(ctx, toShirt, c => {
          F.tshirt(c, S.x, Y + 40, 0.9, S.c, S.seed + 5);
          INK.label(c, si ? 'daha sıcak' : 'daha serin', S.x, Y + 190, { size: 44, weight: 700, align: 'center', color: si ? F.HEAT : PAL.water });
        });
        // incoming rays
        const X0 = [S.x - 180, S.x - 60, S.x + 60, S.x + 180];
        X0.forEach((xh, i) => {
          const a = [xh - 150, 210], b = [xh, Y - 4];
          F.ray(ctx, a, b, E.se(t, sa + 0.4 + i * 0.15, sa + 1.4 + i * 0.15), { w: 3.2, head: 14, seed: 80 + i + si * 10 });
          const k2 = E.se(t, sa + 2.2 + i * 0.12, sa + 3.2 + i * 0.12);
          if (S.refl[i]) F.ray(ctx, b, [xh + 120, Y - 250], k2, { w: 3.2, head: 14, seed: 90 + i + si * 10, alpha: S.refl[i] });
          if (S.refl[i] < 1 && k2 > 0) {
          // absorbed (or mostly absorbed): ray ends in the surface, small ink dot + heat squiggle
            INK.inkDot(ctx, b[0], b[1] + 2, 5 * k2, { color: '192,127,30' });
            if (t > sh) squiggle(ctx, b[0] + 12, Y - 20, t, i + si * 4, E.se(t, sh + 0.6 + i * 0.2, sh + 1.4 + i * 0.2) * (si ? 1 : 0.8));
          }
        });
      });
      // labels
      INK.label(ctx, 'gelen ışık', 250, 250, { size: 38, weight: 700, alpha: E.se(t, sa + 1.2, sa + 1.8), color: '#8A4A10' });
      if (t > sa + 3.0) {
        INK.label(ctx, 'yansıyan ışık', 760, 360, { size: 36, weight: 700, alpha: E.se(t, sa + 3.0, sa + 3.6), color: '#8A4A10' });
        E.layer(ctx, E.se(t, sa + 4.0, sa + 4.8), c => {
          INK.label(c, 'soğurulan ışık', 1560, 470, { size: 36, weight: 700, color: '#8A4A10' });
          P.arrow(c, [1555, 480], [1480, 610], 1, { w: 2.4, head: 11, bend: -10 });
        });
      }
      // heat note
      if (t > sh + 2.4) E.inkText(ctx, 'soğurulan ışık → ısınma', 960, 890, t, sh + 2.4, su + 0.3, { size: 46, align: 'center', color: F.HEAT });
      // comparison box
      if (t > sh + 4.2 && t < su + 0.6) {
        const k = Math.min(E.se(t, sh + 4.2, sh + 5), 1 - E.se(t, su, su + 0.6));
        E.layer(ctx, k, c => {
          INK.label(c, 'çoğunu yansıtır', 560, Y + 225, { size: 38, weight: 700, align: 'center', color: PAL.water });
          INK.label(c, 'çoğunu soğurur', 1360, Y + 225, { size: 38, weight: 700, align: 'center', color: F.HEAT });
        });
      }
      // summer: Damla in the corner with a sun hat feel
      if (toShirt > 0) E.layer(ctx, toShirt, c => {
        E.inkText(c, 'Yazın açık renkli giysi → daha az ışık soğurulur', 960, 185, t, su + 1.2, 1e9, { size: 44, align: 'center' });
      });
    }
  });
})();

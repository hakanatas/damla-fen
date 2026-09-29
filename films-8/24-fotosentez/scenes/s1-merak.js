// SAHNE 1 — Merak: fidan büyüyüp ağaç olacak; bitkiler nasıl büyür? Beyin fırtınası; üretici kavramı (FB.8.7.1 giriş)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const U = U7;
  E.scene({
    name: 'Merak', concept: 'Bitkiler nasıl büyür? Üretici', from: 'title', to: 'producer',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q'), sb = E.s('brain'), sp = E.s('producer');
      const hill = P.hillLine(E.W, 930);
      ctx.save();
      E.cam(ctx, { x: 960 + 40 * E.se(t, 0, sq, 'sine'), y: 540, z: 1 + 0.04 * E.se(t, 0, sq, 'sine') });
      P.sun(ctx, 1640, 250, 80, t, { nrays: 18, cells: false });
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      const fx = 1240, fy = P.hillY(hill, fx) + 4;
      // gelecekteki ağaç (kesikli hayal)
      const kf = E.se(t, sq + 0.5, sq + 2.0) * (1 - E.se(t, sb - 0.2, sb + 0.4));
      if (kf > 0) {
        const pts = []; const tr = INK.wobble(circlePts(fx, fy - 420, 230, 170, 60), 10, 101);
        for (let i = 1; i < tr.length; i++) { const a = tr[i - 1], b = tr[i], n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4); for (let j = 0; j < n; j++) pts.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]); }
        ctx.save(); ctx.globalAlpha = kf * 0.8; dashed(ctx, P.partial(pts, kf), { w: 3, color: U.LIFE_D, on: 12, off: 9 });
        const trunk = []; for (let y = fy; y > fy - 260; y -= 4) trunk.push([fx + (fy - y) * 0.02, y]); dashed(ctx, trunk, { w: 3, color: '#6E5234', on: 12, off: 9 });
        ctx.restore();
        INK.label(ctx, 'yıllar sonra?', fx + 250, fy - 560, { size: 40, weight: 700, alpha: kf, color: U.LIFE_D });
      }
      U.sapling(ctx, fx, fy, 1.3, t);
      INK.label(ctx, 'fidan', fx + 60, fy + 50, { size: 36, weight: 700, alpha: E.se(t, sh + 1, sh + 2) });
      // Damla
      const dx = 760, dy = P.hillY(hill, dx) + 4;
      const thinking = t > sq && t < sp;
      U.damla(ctx, t, { x: dx, y: dy, s: 1.35, expr: thinking ? 'thinking' : (t > sp ? 'curious' : 'happy'), look: thinking ? [0.3, -0.7] : [0.8, 0.1],
        arms: t < sq ? U.wave(t) : thinking ? [[-1, 0.4], [1, [34, -96]]] : [[-1, 0.4], [1, 2.0]] });
      ctx.restore();

      // beyin fırtınası balonu
      const kb = E.se(t, sb, sb + 0.8) * (1 - E.se(t, sp - 0.3, sp + 0.3));
      if (kb > 0) {
        P.bubble(ctx, 960, 330, 1180, 330, [800, 600], kb, 3);
        if (kb > 0.7) E.layer(ctx, E.clamp((kb - 0.7) / 0.3), c => {
          const items = [['toprak?', 530], ['su?', 820], ['ışık?', 1100], ['hava?', 1390]];
          items.forEach(([txt, x], i) => {
            const at = sb + 0.8 + i * 1.0, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
            c.save(); c.translate(x, 290); c.scale(P.pop(k), P.pop(k));
            if (i === 0) { const pile = P.arc(0, 30, 60, Math.PI, 2 * Math.PI, 20, 36); U.shape(c, pile.concat([[60, 30]]), U.BROWN, 0.6, 1201); }
            if (i === 1) U.drop(c, 0, 10, 26);
            if (i === 2) P.sun(c, 0, 4, 30, t, { nrays: 12, cells: false, glow: false });
            if (i === 3) { for (let j = 0; j < 3; j++) stroke(c, P.bez([-50, -14 + j * 18], [0, -34 + j * 18], [50, -6 + j * 18], 16), { w: 2.6, dry: false, alpha: 0.7 }); }
            c.restore();
            P.write(c, txt, x, 390, E.seg(t, at + 0.2, at + 0.9), { size: 48, align: 'center' });
          });
        });
      }
      // üretici kartı
      const kp = E.se(t, sp + 0.2, sp + 0.9);
      if (kp > 0) E.layer(ctx, kp, c => {
        U.card(c, 300, 190, 1320, 250, 1210, { tint: U.LIFE, tintA: 0.12 });
        U.grass(c, 440, 300, 0.9, t); P.arrow(c, [510, 316], [600, 316], E.se(t, sp + 0.8, sp + 1.4), { w: 3 });
        U.hopper(c, 690, 316, 0.7); INK.label(c, 'besin zinciri', 560, 410, { size: 30, alpha: 0.7, align: 'center' });
        P.write(c, 'Bitkiler üreticidir:', 820, 290, E.seg(t, sp + 1.0, sp + 2.0), { size: 52, color: U.LIFE_D });
        P.write(c, 'besinlerini kendileri üretir.', 820, 370, E.seg(t, sp + 1.9, sp + 3.0), { size: 50 });
        P.write(c, 'Ama nasıl?', 1320, 410, E.seg(t, sp + 3.6, sp + 4.3), { size: 56, color: U.AMB });
      });
      U.title(ctx, t, '24 · Işıktan Besine: Fotosentez', 'Fen Bilimleri · 8. sınıf · Ünite 7', U.LIFE);
    }
  });
})();

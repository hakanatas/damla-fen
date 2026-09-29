// SAHNE 1–3 — Merak; çiçekli/çiçeksiz sınıflandırma (çiçeksizlerin özelliklerine girilmez); temel kısımlar
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F06;
  E.scene({
    name: 'Merak', concept: 'Çiçek nasıl meyve ve tohuma dönüşür?', from: 'title', to: 'hello',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello');
      ctx.save(); const z = E.se(t, sh, sh + 5, 'sine'); E.cam(ctx, { x: 960 + 120 * z, y: 540 + 40 * z, z: 1 + 0.12 * z });
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [180, P.hillY(hill, 180) + 6] });
      [[1180, 0.9], [1380, 1.1], [1560, 0.8]].forEach(([x, s], i) => F.plant(ctx, x, P.hillY(hill, x) + 8, s, t + i, { roots: false }));
      const bx = 1380 + Math.sin(t * 1.3) * 160, by = 470 + Math.sin(t * 2.1) * 50; F.bee(ctx, bx, by, 1, t);
      const dx = 760, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: t > sh ? 'curious' : 'happy', look: [0.8, -0.3], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > sh + 0.3 ? [[-1, 0.35], [1, 1.9]] : [[-1, 0.35], [1, 0.5]], prop: t > sh + 0.3 ? 'lens' : null, propTilt: -0.4 });
      ctx.restore();
      const kq = E.se(t, sh + 1.5, sh + 2.3, 'out');
      if (kq > 0) { P.bubble(ctx, 560, 330, 620, 150, [700, 560], kq, 3); if (kq > 0.6) { P.write(ctx, 'çiçek → meyve → tohum ?', 560, 346, E.seg(t, sh + 1.9, sh + 3.2), { size: 44, align: 'center' }); } }
      F.title(ctx, t, '6', 'Çiçekten Tohuma, Tohumdan Fideye', '3');
    }
  });

  E.scene({
    name: 'Sınıflandır', concept: 'Çiçekli ve çiçeksiz bitkiler', from: 'classify', to: 'classify', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('classify'); const gy = 800;
      const soil = [[80, gy], [1840, gy - 6], [1840, gy + 90], [80, gy + 96]]; INK.wash(ctx, soil, '#8A6A45', 0.18, 90, { bleed: 3, blooms: 0 }); line(ctx, [80, gy], [1840, gy - 6], { w: 3, seed: 91 });
      line(ctx, [1180, 190], [1180, 880], { w: 3, seed: 92, alpha: E.se(t, s0, s0 + 0.8) });
      P.write(ctx, 'Çiçekli bitkiler', 620, 250, E.seg(t, s0 + 0.3, s0 + 1.3), { size: 62, align: 'center', color: F.LIFE_D });
      P.write(ctx, 'Çiçeksiz bitkiler', 1500, 250, E.seg(t, s0 + 1.0, s0 + 2.0), { size: 62, align: 'center', color: '#5A6A7A' });
      const pop = (at, fn) => { const k = E.se(t, at, at + 0.6, 'out'); if (k > 0) E.layer(ctx, k, fn); };
      pop(s0 + 1.2, c => { F.tree(c, 330, gy, 1.2, t); INK.label(c, 'elma ağacı', 330, 860, { size: 38, weight: 700, align: 'center' }); });
      pop(s0 + 1.8, c => { F.beanPlant(c, 640, gy, 1.5); INK.label(c, 'fasulye', 640, 860, { size: 38, weight: 700, align: 'center' }); });
      pop(s0 + 2.4, c => { F.daisy(c, 930, gy, 1.6, t); INK.label(c, 'papatya', 930, 860, { size: 38, weight: 700, align: 'center' }); });
      pop(s0 + 4.2, c => { F.fern(c, 1380, gy, 1.6); INK.label(c, 'eğrelti otu', 1380, 860, { size: 38, weight: 700, align: 'center' }); });
      pop(s0 + 5.4, c => { F.moss(c, 1680, gy, 1.2); INK.label(c, 'kara yosunu', 1680, 860, { size: 38, weight: 700, align: 'center' }); });
    }
  });

  E.scene({
    name: 'Temel kısımlar', concept: 'Kök, gövde, yaprak, çiçek', from: 'parts', to: 'parts', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('parts'); const gy = 640, x = 900;
      const soil = [[300, gy], [1500, gy - 4], [1500, gy + 240], [300, gy + 244]]; INK.wash(ctx, soil, '#8A6A45', 0.3, 95, { bleed: 3, blooms: 1 }); line(ctx, [300, gy], [1500, gy - 4], { w: 3, seed: 96 });
      const top = F.plant(ctx, x, gy, 1.25, t);
      const L = [['çiçek', 1180, 250, [top[0] + 30, top[1] - 20], 0.8], ['yaprak', 1240, 420, [x + 100, gy - 1.25 * 330 * 0.45 - 20], 1.8], ['gövde', 560, 460, [x - 4, gy - 150], 2.8], ['kök', 560, 800, [x - 40, gy + 70], 3.8]];
      L.forEach(([txt, tx, ty, p, at], i) => F.tag(ctx, txt, tx, ty, p, E.se(t, s0 + at, s0 + at + 0.8), { size: 50, align: tx > x ? 'left' : 'right', seed: 30 + i }));
      DAMLA.draw(ctx, { x: 1640, y: 900, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 2, arms: [[-1, 1.6], [1, 0.4]] });
    }
  });
})();

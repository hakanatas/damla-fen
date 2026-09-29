// SAHNE 1 — Haber ve merak (Köprü kurma: günlük hayattaki tutulma haberleri · E3.8 soru sorma)
(function () {
  const { PAL, line, stroke, circlePts, hatch } = INK;
  const F = G62;
  function paper(ctx, x, y, s, t, k) { // gazete
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.05); ctx.scale(s, s);
    const pg = [[-230, -150], [230, -160], [236, 150], [-226, 158], [-230, -150]];
    ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.3)'; ctx.shadowBlur = 20; P.fillPts(ctx, pg, '#F4EFE2', 1); ctx.restore();
    stroke(ctx, pg, { w: 3, closed: true, seed: 11 });
    INK.label(ctx, 'GÜNLÜK BİLİM', 0, -112, { size: 30, weight: 700, align: 'center', font: 'Fraunces', rot: 0 });
    line(ctx, [-210, -96], [210, -100], { w: 2, dry: false });
    P.write(ctx, 'Gökyüzünde', -205, -40, k, { size: 52, rot: 0 });
    P.write(ctx, 'tutulma var!', -205, 18, E.clamp(k * 1.6 - 0.6), { size: 52, rot: 0, color: '#8A4A10' });
    // küçük şematik resim
    P.sun(ctx, 130, 90, 34, t, { nrays: 12, cells: false, glow: false });
    P.fillPts(ctx, circlePts(146, 86, 33, 33, 30), '#2A2A36', 0.9);
    hatch(ctx, -205, 70, 250, 26, { n: 8, ang: 0, w: 1.4, alpha: 0.35 }); hatch(ctx, -205, 110, 250, 26, { n: 8, ang: 0, w: 1.4, alpha: 0.35 });
    ctx.restore();
  }
  E.scene({
    name: 'Haber', concept: 'Soru sorma', from: 'title', to: 'q',
    draw(ctx, t) {
      const sn = E.s('news'), sq = E.s('q');
      const hill = P.hillLine(E.W, 940);
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('q'), 'sine') });
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1700, P.hillY(hill, 1700) + 6] });
      const dx = 560, dy = P.hillY(hill, dx) + 4;
      const hold = E.se(t, sn + 0.2, sn + 1.0);
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view: 'q3', expr: t > sq ? 'thinking' : (t > sn + 2 ? 'surprised' : 'curious'), look: [0.8, -0.1], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: [[-1, 0.35], [1, 0.35 + hold * 1.3]] });
      ctx.restore();
      const pk = E.se(t, sn + 0.3, sn + 1.2, 'out') * (1 - E.se(t, sq - 0.2, sq + 0.4));
      if (pk > 0) E.layer(ctx, pk, c => paper(c, 1150, 480, 1.25 * P.pop(pk), t, E.seg(t, sn + 1.2, sn + 3.4)));
      const bk = E.se(t, sq + 0.3, sq + 1.1, 'out') * (1 - E.se(t, E.e('q') - 0.5, E.e('q')));
      if (bk > 0) {
        P.bubble(ctx, 1170, 480, 820, 400, [760, 660], bk, 4);
        if (bk > 0.9) {
          P.write(ctx, 'Tutulma nasıl olur?', 1170, 380, E.seg(t, sq + 0.9, sq + 1.9), { size: 50, align: 'center' });
          P.write(ctx, 'Güneş neden kararır?', 1170, 455, E.seg(t, sq + 2.3, sq + 3.3), { size: 50, align: 'center' });
          P.write(ctx, 'Ay neden kararır?', 1170, 530, E.seg(t, sq + 3.6, sq + 4.6), { size: 50, align: 'center' });
          P.write(ctx, 'Her ay olur mu?', 1170, 605, E.seg(t, sq + 5.0, sq + 6.0), { size: 50, align: 'center', color: '#8A4A10' });
        }
      }
      F.title(ctx, t, E.e('title') + 1.4, '2', 'Güneş ve Ay Tutulmaları', 1);
    }
  });
})();

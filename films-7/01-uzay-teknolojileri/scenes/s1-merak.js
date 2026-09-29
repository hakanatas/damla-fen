// SAHNE 1 — Merak: gece gökyüzünde kayan ışık = yapay uydu (yansıyan Güneş ışığı) · sorular (E3.4, E3.8)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  E.scene({
    name: 'Merak', concept: 'Soru sorma', from: 'title', to: 'q',
    draw(ctx, t) {
      const hill = P.hillLine(E.W, 930);
      const sh = E.s('hello'), ss = E.s('sat'), sq = E.s('q');
      const nk = 0.25 + 0.75 * E.se(t, 4.5, 8);
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('q'), 'sine') });
      F.night(ctx, nk);
      F.stars(ctx, t, nk, { n: 80, seed: 71, area: [0, 0, E.W, 720], avoid: [[960, 260, 420]] });
      // kayan uydu ışığı (göz kırpmaz, sabit parlaklık)
      const u = E.seg(t, sh + 1.0, E.e('q'));
      const ux = E.lerp(250, 1700, u), uy = 330 - Math.sin(u * Math.PI) * 170;
      if (t > sh + 0.6) {
        ctx.save(); ctx.globalAlpha = E.se(t, sh + 0.6, sh + 1.4);
        for (let i = 1; i < 14; i++) { const uu = Math.max(0, u - i * 0.006); ctx.globalAlpha = E.se(t, sh + 0.6, sh + 1.4) * (0.35 - i * 0.025); ctx.fillStyle = '#FFF6DE'; ctx.beginPath(); ctx.arc(E.lerp(250, 1700, uu), 330 - Math.sin(uu * Math.PI) * 170, 3, 0, 7); ctx.fill(); }
        ctx.globalAlpha = E.se(t, sh + 0.6, sh + 1.4); F.star(ctx, ux, uy, 6, '#FFF1C8', 0, { spikes: false });
        ctx.restore();
      }
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1650, P.hillY(hill, 1650) + 6] });
      ctx.save(); ctx.globalAlpha = 0.45 * nk; P.fillPts(ctx, hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]), F.NIGHT, 1); ctx.restore();
      const dx = 560, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, {
        x: dx, y: dy, s: 1.35, view: 'q3', expr: t > sq ? 'thinking' : (t > ss ? 'surprised' : 'curious'), look: [0.6 + 0.4 * u, -0.9], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > sq + 0.5 ? [[-1, 0.35], [1, [40, -150], 0.4]] : [[-1, 0.35], [1, 0.35 + 2.1 * E.se(t, sh + 3, sh + 3.8) * (1 - E.se(t, ss + 0.5, ss + 1.2))]]
      });
      E.inkText(ctx, 'göz kırpmıyor, kayıyor!', ux - 60, uy + 70, t, sh + 3.4, ss + 0.4, { size: 40, color: '#FBF3DC', align: 'center' });
      ctx.restore();
      // yansıma şeması (ön bilgi: ışığın yansıması)
      const ik = E.se(t, ss + 0.4, ss + 1.2, 'out') * (1 - E.se(t, sq - 0.4, sq + 0.2));
      if (ik > 0) E.layer(ctx, ik, c => {
        F.card(c, 1010, 430, 820, 400, { seed: 12 });
        P.sun(c, 1080, 520, 44, t, { nrays: 12, cells: false });
        F.satellite(c, 1560, 520, 0.55, t, { rot: 0.2 });
        const rk = E.se(t, ss + 1.2, ss + 2.4);
        [[1140, 505], [1140, 535]].forEach(([x, y], i) => P.arrow(c, [x, y], [1480, 515 + i * 14], rk, { w: 3, color: PAL.light, head: 12 }));
        P.icon.eye(c, 1300, 760, 0.6);
        const rk2 = E.se(t, ss + 2.4, ss + 3.4);
        P.arrow(c, [1520, 560], [1340, 730], rk2, { w: 3, color: PAL.light, head: 12, bend: -10 });
        INK.label(c, 'Güneş ışığı', 1180, 480, { size: 34, weight: 700, color: F.AMBER_D, alpha: rk });
        INK.label(c, 'yansıyan ışık', 1500, 680, { size: 34, weight: 700, color: F.AMBER_D, alpha: rk2 });
        INK.label(c, '(çizim ölçekli değildir)', 1800, 815, { size: 26, align: 'right', alpha: 0.6 });
      });
      // soru balonu
      const bk = E.se(t, sq + 0.3, sq + 1.1, 'out') * (1 - E.se(t, E.e('q') - 0.5, E.e('q')));
      if (bk > 0) {
        P.bubble(ctx, 1200, 470, 800, 330, [760, 690], bk, 3);
        if (bk > 0.9) {
          P.write(ctx, 'Uzay nedir?', 1200, 400, E.seg(t, sq + 0.8, sq + 1.6), { size: 50, align: 'center' });
          P.write(ctx, 'Hangi araçlarla keşfediyoruz?', 1200, 475, E.seg(t, sq + 1.8, sq + 3.0), { size: 50, align: 'center' });
          P.write(ctx, 'Türkiye uzayda neler yapıyor?', 1200, 550, E.seg(t, sq + 3.4, sq + 4.6), { size: 50, align: 'center' });
          INK.label(ctx, '?', 850, 390, { size: 70, weight: 700, color: PAL.light, alpha: 0.9 });
          INK.label(ctx, '?', 1540, 560, { size: 70, weight: 700, color: PAL.light, alpha: 0.9 });
        }
      }
      F.title(ctx, t, E.e('title') + 1.4, '1', 'Uzayı Keşfeden Teknolojiler', 1);
    }
  });
})();

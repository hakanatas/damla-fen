// SAHNE 1 — Merak: Güneş'in yaşam süreciyle ilgili sorular (FB.7.1.4 · E3.4, E3.8)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  E.scene({
    name: 'Merak', concept: 'Soru sorma', from: 'title', to: 'hello',
    draw(ctx, t) {
      const hill = P.hillLine(E.W, 930);
      const sh = E.s('hello');
      const nk = 0.3 + 0.7 * E.se(t, 4, 7.5);
      F.night(ctx, nk);
      F.stars(ctx, t, nk, { n: 110, seed: 91, area: [0, 0, E.W, 760], avoid: [[960, 260, 420]] });
      F.star(ctx, 1600, 200, 7, '#AFC8FF', t); F.star(ctx, 1300, 420, 6, '#FFB38A', t); F.star(ctx, 300, 330, 6, '#FFF1C8', t);
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1650, P.hillY(hill, 1650) + 6] });
      ctx.save(); ctx.globalAlpha = 0.45 * nk; P.fillPts(ctx, hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]), F.NIGHT, 1); ctx.restore();
      DAMLA.draw(ctx, { x: 560, y: P.hillY(hill, 560) + 4, s: 1.35, view: 'q3', expr: t > sh + 4 ? 'thinking' : 'curious', look: [0.7, -0.8], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > sh + 4 ? [[-1, 0.35], [1, [40, -150], 0.4]] : [[-1, 0.35], [1, 0.35 + 2.0 * E.se(t, sh + 0.5, sh + 1.2)]] });
      const bk = E.se(t, sh + 1.5, sh + 2.3, 'out');
      if (bk > 0) {
        P.bubble(ctx, 1240, 450, 820, 340, [760, 690], bk, 3);
        if (bk > 0.9) {
          P.sun(ctx, 1000, 400, 56, t, { nrays: 12, cells: false });
          P.write(ctx, 'Güneş de bir yıldız!', 1350, 400, E.seg(t, sh + 2.4, sh + 3.4), { size: 48, align: 'center' });
          P.write(ctx, 'Nasıl doğdu?', 1350, 480, E.seg(t, sh + 4.0, sh + 4.8), { size: 48, align: 'center' });
          P.write(ctx, 'Bir gün söner mi?', 1350, 560, E.seg(t, sh + 5.6, sh + 6.6), { size: 48, align: 'center' });
        }
      }
      F.title(ctx, t, E.e('title') + 1.4, '3', 'Yıldızlar, Galaksiler ve Evren', 1);
    }
  });
})();

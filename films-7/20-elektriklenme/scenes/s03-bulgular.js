// SAHNE 3 — Bulgular: elektriklenmenin tanımı ve çeşitleri; doğa ve teknolojideki örnekler (FB.7.6.1 b)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  const EX = [
    ['şimşek ve yıldırım', 'doğada', (c, x, y, t) => F.stormCloud(c, x, y - 30, 0.9, t)],
    ['kapı kolunda çarpılma', 'günlük yaşamda', (c, x, y, t) => F.doorKnob(c, x - 50, y, 0.75, t)],
    ['fotokopi makinesi', 'teknolojide', (c, x, y, t) => F.copier(c, x - 20, y + 10, 0.95, t)],
    ['elektrostatik boyama', 'teknolojide', (c, x, y, t) => F.sprayGun(c, x - 20, y, 0.95, t)]
  ];
  E.scene({
    name: 'Bulgular', concept: 'Elektriklenme; doğa ve teknoloji', from: 'define', to: 'examples', trFrom: [960, 300],
    draw(ctx, t) {
      const sd = E.s('define'), se = E.s('examples');
      // tanım kartı (üstte) — örneklerde yukarı küçülür
      const up = E.se(t, se - 0.2, se + 0.8);
      ctx.save(); ctx.translate(960, E.lerp(430, 300, up)); ctx.scale(E.lerp(1, 0.72, up), E.lerp(1, 0.72, up)); ctx.translate(-960, -430);
      F.card(ctx, 330, 230, 1260, 420, 91, { tint: F.AMB, tintA: 0.1 });
      P.write(ctx, 'ELEKTRİKLENME', 960, 330, E.seg(t, sd + 0.3, sd + 1.5), { size: 76, align: 'center', font: 'Kalam' });
      P.drawOn(ctx, P.bez([700, 352], [960, 362], [1220, 348], 30), E.se(t, sd + 1.3, sd + 1.9), { w: 3, color: F.AMB });
      F.wfit(ctx, 'Cisimlerin elektrik yükü kazanması', 960, 420, E.seg(t, sd + 1.6, sd + 3.0), 46, 1100, { align: 'center' });
      [['sürtünme', 520], ['dokunma', 960], ['etki', 1400]].forEach(([w, x], i) => {
        const at = sd + 3.0 + i * 0.8;
        P.arrow(ctx, [960, 450], [x, 520], E.se(t, at, at + 0.5), { w: 3, bend: 0, head: 14 });
        F.stamp(ctx, x, 580, w + ' ile', E.seg(t, at + 0.3, at + 0.8), { color: PAL.ink, size: 44, rot: -0.03 });
      });
      ctx.restore();
      // örnekler
      EX.forEach(([name, where, ic], i) => {
        const at = se + 1.0 + i * 1.6, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const x = 150 + i * 420, y = 520;
        E.layer(ctx, k, c => {
          F.card(c, x, y, 380, 360, 95 + i);
          ic(c, x + 190, y + 150, t);
          F.fit(c, name, x + 190, y + 300, 340, 36);
          F.fit(c, where, x + 190, y + 342, 340, 30, { weight: 400, color: F.AMB });
        });
      });
    }
  });
})();

// SAHNE 9 — Vücut hücresi / üreme hücresi: mutasyon kalıtsal mı? (TYMM vurgusu)
(function () {
  const { PAL, stroke } = INK;
  const F = F808;
  E.scene({
    name: 'Kalıtsal mı?', concept: 'Üreme hücresindeki mutasyon kalıtsaldır', from: 'body', to: 'germ', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('body'), sg = E.s('germ');
      F.warmBg(ctx);
      // sol: vücut hücresi
      const lk = E.se(t, sb + 0.2, sb + 0.9, 'out');
      if (lk > 0) E.layer(ctx, lk, c => {
        F.card(c, 130, 190, 800, 660, 4300);
        F.fit(c, 'Vücut hücresi', 530, 270, 700, 54);
        [[330, 440], [430, 420], [380, 520]].forEach(([x, y], i) => F.cell(c, x, y, 58, '#D9A78A', i, { spark: i === 0 ? E.se(t, sb + 1.0, sb + 1.6) : 0 }));
        if (t > sb + 1.6) P.arrow(c, [500, 470], [640, 470], E.se(t, sb + 1.6, sb + 2.3), { w: 3.4 });
        if (t > sb + 2.1) { c.save(); c.globalAlpha *= E.se(t, sb + 2.1, sb + 2.7); F.squirrel(c, 760, 610, 0.55, '#9A6A3A', { t }); F.fit(c, 'yavru', 780, 660, 200, 36); c.restore(); }
        P.cross(c, 530, 760, 30, E.se(t, sb + 2.6, sb + 3.1), { w: 7, color: F.RED });
        F.wfit(c, 'aktarılmaz', 580, 775, E.seg(t, sb + 2.8, sb + 3.6), 48, 320, { color: F.RED });
      });
      // sağ: üreme hücresi
      const rk = E.se(t, sg + 0.2, sg + 0.9, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 990, 190, 800, 660, 4301, { tint: F.AMB, tintA: 0.08 });
        F.fit(c, 'Üreme hücresi', 1390, 270, 700, 54, { color: F.AMB });
        F.egg(c, 1180, 470, 90, { spark: E.se(t, sg + 1.0, sg + 1.6) });
        F.sperm(c, 1130, 640, 0.8, t);
        if (t > sg + 1.6) P.arrow(c, [1300, 470], [1450, 470], E.se(t, sg + 1.6, sg + 2.3), { w: 3.4 });
        if (t > sg + 2.1) { c.save(); c.globalAlpha *= E.se(t, sg + 2.1, sg + 2.7); F.squirrel(c, 1600, 610, 0.55, null, { t, albino: true }); F.fit(c, 'yavru', 1620, 660, 200, 36); c.restore(); }
        P.check(c, 1350, 750, 48, E.se(t, sg + 2.6, sg + 3.1), { w: 7, color: F.GREEN });
        F.wfit(c, 'aktarılabilir (kalıtsal)', 1400, 775, E.seg(t, sg + 2.8, sg + 3.8), 48, 380, { color: F.GREEN });
      });
    }
  });
})();

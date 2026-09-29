// SAHNE 5 — Zigot → embriyo → fetüs → bebek; bilgi haritası (FB.6.3.5 b: kavramlar arası ilişkiler)
(function () {
  const { PAL } = INK; const K = KIT, F = F08;
  const XS = [210, 560, 900, 1270, 1650], Y = 520;
  E.scene({
    name: 'Zigottan bebeğe', concept: 'Zigot, embriyo, fetüs, bebek: bilgi haritası', from: 'develop', to: 'baby', trFrom: [210, 520],
    draw(ctx, t) {
      const sd = E.s('develop'), sb = E.s('baby');
      const at = [sd + 0.2, sd + 1.2, sd + 3.4, sd + 6.2, sb + 0.5];
      const k = at.map(a => E.se(t, a, a + 0.7, 'out'));
      // 0: sperm + yumurta
      if (k[0] > 0) E.layer(ctx, k[0], c => { F.egg(c, XS[0], Y, 62); F.sperm(c, XS[0] + 72, Y - 10, 0.55, Math.PI - 0.15, t); });
      // 1: zigot → bölünme
      if (k[1] > 0) E.layer(ctx, k[1], c => { const n = t < sd + 2.2 ? 1 : t < sd + 2.8 ? 2 : t < sd + 3.4 ? 4 : 8; F.cluster(c, XS[1], Y, 60, n); });
      // 2: embriyo
      if (k[2] > 0) E.layer(ctx, k[2], c => F.fetus(c, XS[2], Y, 0.85, 0));
      // 3: fetüs
      if (k[3] > 0) E.layer(ctx, k[3], c => F.fetus(c, XS[3], Y, 1.15, 1));
      // 4: bebek
      if (k[4] > 0) E.layer(ctx, k[4], c => F.baby(c, XS[4], Y + 10, 1.25));
      const NAMES = ['sperm + yumurta', 'zigot', 'embriyo', 'fetüs', 'bebek'];
      NAMES.forEach((n, i) => K.text(ctx, n, XS[i], 690, { size: i ? 46 : 36, align: 'center', color: i ? K.LIFE_D : PAL.ink, alpha: k[i] }));
      const ARR = ['döllenme', 'bölünme', '≈ 8 hafta', '≈ 9 ay'];
      ARR.forEach((n, i) => {
        const a0 = at[i + 1] - 0.5, ka = E.se(t, a0, a0 + 0.6); if (ka <= 0) return;
        const x0 = XS[i] + (i === 0 ? 110 : 95), x1 = XS[i + 1] - (i === 3 ? 95 : 90);
        P.arrow(ctx, [x0, Y], [x1, Y], ka, { w: 3, head: 13, color: K.LIFE_D });
        K.text(ctx, n, (x0 + x1) / 2, Y - 30, { size: 32, align: 'center', alpha: ka * 0.85 });
      });
      // rahimde gelişir parantezi
      const rk = E.se(t, sd + 7, sd + 7.8);
      if (rk > 0) { ctx.save(); ctx.globalAlpha = rk; P.drawOn(ctx, P.bez([XS[2] - 90, 740], [(XS[2] + XS[4]) / 2, 790], [XS[4] - 60, 740], 30), rk, { w: 3, color: PAL.light }); ctx.restore(); K.text(ctx, 'rahimde gelişir', (XS[2] + XS[4]) / 2 - 20, 820, { size: 38, align: 'center', color: K.AMBER_D, alpha: rk }); }
      // bilgi haritası çerçevesi
      const mk = E.se(t, sb + 3.0, sb + 4.0);
      if (mk > 0) { ctx.save(); ctx.globalAlpha = mk; INK.stroke(ctx, INK.wobble(K.rrect(960, 560, 1820, 620, 30), 2, 7300), { w: 3, closed: true, color: K.LIFE_D }); ctx.restore(); K.node(ctx, 'Bilgi haritam', 960, 250, mk, { size: 50, tint: PAL.life, seed: 4 }); }
      INK.label(ctx, '(çizimler ölçekli değildir)', 1830, 215, { size: 28, align: 'right', alpha: 0.55 * k[1] });
    }
  });
})();

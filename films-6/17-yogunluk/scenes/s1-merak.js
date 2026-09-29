// SAHNE 1 — Merak: aynı büyüklükte tahta ve demir küp; eşit kollu terazide demir ağır basar.
(function () {
  const { PAL, line } = INK;
  const F = F617;
  E.scene({
    name: 'Merak', concept: 'Aynı hacim, farklı kütle', from: 'title', to: 'puzzle',
    draw(ctx, t) {
      const sh = E.s('hello'), sp = E.s('puzzle');
      const cam = E.se(t, 0, sh + 1.5, 'sine');
      ctx.save(); E.cam(ctx, { x: 960 + 20 * cam, y: 560 - 20 * cam, z: 1 + 0.04 * cam });
      F.desk(ctx, 860, 1);
      const tilt = 0.2 * E.se(t, sp + 0.1, sp + 1.2, 'back');
      const dropW = E.se(t, sh + 4.2, sh + 5.0, 'in'), dropI = E.se(t, sh + 5.4, sh + 6.2, 'in');
      const bal = F.balance(ctx, 1150, 860, {
        s: 1.1, tilt,
        left: (c, x, y) => { if (dropW > 0) F.cube(c, x, E.lerp(y - 360, y - 2, dropW), 110, 'wood'); },
        right: (c, x, y) => { if (dropI > 0) F.cube(c, x, E.lerp(y - 360, y - 2, dropI), 110, 'iron'); }
      });
      // etiketler
      const [pl, pr] = bal.pans;
      P.write(ctx, 'tahta', pl[0], pl[1] + 80, E.seg(t, sh + 5.0, sh + 5.8), { size: 44, align: 'center' });
      P.write(ctx, 'demir', pr[0], pr[1] + 80, E.seg(t, sh + 6.2, sh + 7.0), { size: 44, align: 'center' });
      // Damla
      const surprised = t > sp + 0.3 && t < sp + 3;
      F.damla(ctx, t, {
        x: 430, y: 862, s: 1.45, expr: t < sp ? 'curious' : surprised ? 'surprised' : 'thinking', look: [0.8, 0.1],
        arms: t < sp ? [[-1, 0.35], [1, 1.6 + 0.2 * Math.sin(t * 2)]] : surprised ? [[-1, 1.3], [1, 1.3]] : [[-1, 0.35], [1, [34, -128]]], handR: t > sp + 3 ? 12 : 0
      });
      ctx.restore();
      // soru kartı (ekran uzayı)
      if (t > sp + 1.2) {
        const k = E.se(t, sp + 1.2, sp + 1.9, 'out');
        E.layer(ctx, k, c => {
          F.card(c, 1420, 190, 1860, 420, { seed: 1811 });
          P.write(c, 'hacim: aynı', 1460, 260, E.seg(t, sp + 1.6, sp + 2.4), { size: 44 });
          P.check(c, 1780, 240, 44, E.se(t, sp + 2.4, sp + 2.8), { w: 6, color: PAL.life });
          P.write(c, 'kütle: farklı', 1460, 330, E.seg(t, sp + 2.8, sp + 3.6), { size: 44 });
          P.write(c, 'Neden?', 1640, 395, E.seg(t, sp + 4.0, sp + 4.8), { size: 48, color: AMBC, align: 'center' });
        });
      }
      F.title(ctx, t, 17, 'Aynı Hacim, Farklı Kütle: Yoğunluk', 5);
    }
  });
  const AMBC = '#8A4A10';
})();

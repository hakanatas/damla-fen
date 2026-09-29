// SAHNE 1 — Merak: renksiz periyodik tablo + dört renkli kalem → dört element sınıfı
(function () {
  const { PAL, stroke, line } = INK;
  const U = U5;
  const GEO = { X0: 330, Y0: 356, GX: 50, GY: 42, W: 46, H: 38, FY: 660 };
  const ORDER = ['metal', 'ametal', 'yari', 'soy'];
  function pencil(ctx, x, y, col, a, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const b = [[-110, -11], [70, -11], [70, 11], [-110, 11], [-110, -11]];
    P.fillPts(ctx, b, col, 0.95); stroke(ctx, b, { w: 2.4, closed: true, dry: false });
    const tip = [[70, -11], [104, 0], [70, 11], [70, -11]]; P.fillPts(ctx, tip, '#EBD9B4'); stroke(ctx, tip, { w: 2, closed: true, dry: false });
    P.fillPts(ctx, [[94, -4], [104, 0], [94, 4]], col); line(ctx, [-60, -2], [40, -2], { w: 1.4, alpha: 0.4, dry: false });
    ctx.restore();
  }
  E.scene({
    name: 'Merak', concept: 'Renksiz tablo, dört sınıf', from: 'title', to: 'classes',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q'), sc = E.s('classes');
      U.bench(ctx, -40, 1960, 880, 1301);
      // renksiz tablo kâğıdı
      const tk = E.se(t, sh + 1.0, sh + 2.0);
      if (tk > 0) E.layer(ctx, tk, c => {
        U.card(c, 280, 292, 1000, 460, { seed: 1310 });
        U.fullTable(c, GEO, (z, x, y, q) => {
          if (z < 0) { U.tile(c, x, y, GEO.W, GEO.H, '*', null, null, { lw: 1.2 }); return; }
          U.tile(c, x, y, GEO.W, GEO.H, U.SYM[z - 1], null, null, { lw: 1.2 });
        });
        U.txt(c, 'Periyodik tablo (renksiz)', 780, 336, { size: 34, align: 'center', alpha: 0.7 });
      });
      // soru işaretleri
      const qk = E.se(t, sq + 0.3, sq + 1.0) * (1 - E.se(t, sc, sc + 0.5));
      if (qk > 0) ['?', '?', '?'].forEach((s, i) => U.txt(ctx, s, 1330 + i * 44, 330 - i * 30 + Math.sin(t * 3 + i) * 6, { size: 70 + i * 10, alpha: qk, color: PAL.water }));
      // dört kalem + etiketler
      ORDER.forEach((k, i) => {
        const cl = U.CLS[k];
        const at = sh + 2.0 + i * 0.35, pk = E.se(t, at, at + 0.6, 'out'); if (pk <= 0) return;
        const lift = E.se(t, sc + 0.4 + i * 0.9, sc + 0.9 + i * 0.9, 'out');
        const x = 420 + i * 230, y = 866 - 10 * lift;
        E.layer(ctx, pk, c => pencil(c, x, y, cl.c, -0.05 + i * 0.03, 0.9));
        if (lift > 0) P.write(ctx, cl.pl, x - 10, 822, lift, { size: 42, align: 'center' });
      });
      const talk = t > sh;
      U.damla(ctx, t, { x: 1600, y: 880, s: 1.35, view: 'q3', flip: true, expr: t > sq && t < sc ? 'thinking' : 'curious', look: [-0.8, 0.1], arms: talk ? [[-1, 1.2 + 0.1 * Math.sin(t * 3)], [1, 0.4]] : [[-1, 0.35], [1, 0.35]] });
      U.title(ctx, t, '13 · Periyodik Tablonun Haritası');
    }
  });
})();

// SAHNE 7 — Yanlış uygulamaları doğru davranışlarla değiştirme (dengeli beslenme, su, hareket, teknoloji bağımlılığı)
(function () {
  const { PAL } = INK; const K = KIT;
  const ROWS = [['kahvaltıyı atlamak', 'düzenli ve dengeli beslenmek', 'habits', 0.8], ['hızlı hızlı yemek', 'yavaş yemek, iyi çiğnemek', 'habits', 3.0], ['az su içmek', 'yeterince su içmek', 'habits', 5.0],
    ['saatlerce ekran başında oturmak', 'spor ve sosyal etkinlikler', 'active', 0.8]];
  E.scene({
    name: 'Doğru davranışlar', concept: 'Sindirim sistemi sağlığı: yanlış → doğru', from: 'habits', to: 'active', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('habits'), sa = E.s('active');
      ctx.fillStyle = 'rgba(111,138,58,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 110, 170, 1440, 720);
      P.write(ctx, 'Yanlış', 330, 262, E.seg(t, sh + 0.1, sh + 0.6), { size: 48, color: K.RED });
      P.write(ctx, 'Doğru', 990, 262, E.seg(t, sh + 0.3, sh + 0.8), { size: 48, color: K.LIFE_D });
      if (t > sh + 0.5) P.drawOn(ctx, P.bez([190, 288], [800, 298], [1500, 286], 30), E.se(t, sh + 0.5, sh + 1.1), { w: 3, color: PAL.light });
      ROWS.forEach(([bad, good, b, off], i) => { const at = E.s(b) + off, y = 370 + i * 110;
        const k1 = E.seg(t, at, at + 0.7), k2 = E.seg(t, at + 0.9, at + 1.7);
        P.cross(ctx, 230, y - 14, 15, k1, { w: 5, color: K.RED }); P.write(ctx, bad, 270, y, k1, { size: 36 });
        P.arrow(ctx, [870, y - 14], [920, y - 14], E.se(t, at + 0.6, at + 0.9), { w: 3, head: 11 });
        P.check(ctx, 950, y - 16, 34, k2, { w: 6, color: K.LIFE_D }); P.write(ctx, good, 990, y, k2, { size: 36, color: K.LIFE_D });
      });
      const nk = E.se(t, sa + 3.2, sa + 4.0);
      if (nk > 0) { K.text(ctx, 'teknoloji bağımlılığı → hareketsizlik, düzensiz beslenme', 270, 840, { size: 32, alpha: nk * 0.85, color: K.RED }); }
      const cheer = t > sa + 1;
      K.damla(ctx, t, { x: 1720, y: 900, s: 1.1, flip: true, expr: cheer ? 'happy' : 'determined', look: [-0.7, 0.1], arms: cheer ? [[-1, 2.5], [1, 2.5 + 0.2 * Math.sin(t * 6)]] : [[-1, 0.4], [1, 1.3]] });
    }
  });
})();

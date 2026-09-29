// SAHNE 6 — Dolaşım sistemi sağlığı: yanlış uygulamalar → doğru davranışlar (hastalıklara girilmez)
(function () {
  const { PAL } = INK; const K = KIT, F = F09;
  const ROWS = [['geç yatmak', 'düzenli ve yeterli uyku', 'habits', 0.6], ['tuzlu, yağlı atıştırmalık', 'dengeli beslenme, az tuz ve yağ', 'habits', 2.8], ['hareketsiz kalmak', 'düzenli spor, sosyal etkinlik', 'habits', 5.0],
    ['saatlerce ekran başında', 'ekran süresini sınırlamak', 'screen', 2.0]];
  E.scene({
    name: 'Doğru davranışlar', concept: 'Dolaşım sistemi sağlığı: yanlış → doğru', from: 'habits', to: 'screen', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('habits'), ss = E.s('screen');
      ctx.fillStyle = 'rgba(111,138,58,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 110, 170, 1440, 720);
      P.write(ctx, 'Yanlış', 330, 262, E.seg(t, sh + 0.1, sh + 0.6), { size: 48, color: K.RED });
      P.write(ctx, 'Doğru', 960, 262, E.seg(t, sh + 0.3, sh + 0.8), { size: 48, color: K.LIFE_D });
      if (t > sh + 0.5) P.drawOn(ctx, P.bez([190, 288], [800, 298], [1500, 286], 30), E.se(t, sh + 0.5, sh + 1.1), { w: 3, color: PAL.light });
      ROWS.forEach(([bad, good, b, off], i) => { const at = E.s(b) + off, y = 370 + i * 110;
        const k1 = E.seg(t, at, at + 0.7), k2 = E.seg(t, at + 0.9, at + 1.7);
        P.cross(ctx, 230, y - 14, 15, k1, { w: 5, color: K.RED }); P.write(ctx, bad, 270, y, k1, { size: 36 });
        P.arrow(ctx, [800, y - 14], [860, y - 14], E.se(t, at + 0.6, at + 0.9), { w: 3, head: 11 });
        P.check(ctx, 910, y - 16, 34, k2, { w: 6, color: K.LIFE_D }); P.write(ctx, good, 950, y, k2, { size: 36, color: K.LIFE_D }); });
      const nk = E.se(t, ss + 0.2, ss + 1.0);
      if (nk > 0) K.text(ctx, 'teknoloji bağımlılığı → uyku azalır, hareketsizlik artar', 270, 840, { size: 32, alpha: nk * 0.85, color: K.RED });
      const bt = ((t % 0.85) / 0.85) < 0.3 ? Math.sin(((t % 0.85) / 0.85) / 0.3 * Math.PI) : 0;
      F.heart(ctx, 1720, 420, 1.0, { beat: bt });
      K.text(ctx, 'sağlıklı kalp', 1720, 540, { size: 32, align: 'center', color: K.LIFE_D, alpha: E.se(t, sh + 6, sh + 6.6) });
      K.damla(ctx, t, { x: 1730, y: 900, s: 1.0, flip: true, expr: t > sh + 6 ? 'happy' : 'determined', look: [-0.7, 0.1], arms: t > sh + 6 ? [[-1, 2.5], [1, 2.5 + 0.2 * Math.sin(t * 6)]] : [[-1, 0.4], [1, 1.3]] });
    }
  });
})();

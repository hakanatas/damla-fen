// SAHNE 4 — Münazara: mantıksal temellendirme, mantıksal çelişkiyi tespit, geçerli fikri kabul (FB.6.7.3 a, b, c)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  function podium(c, x, y, col, seed, label) {
    const p = [[x - 150, y], [x - 130, y - 110], [x + 130, y - 110], [x + 150, y], [x - 150, y]];
    P.fillPts(c, p, '#FBF8F1'); wash(c, p, col, 0.35, seed, { bleed: 1, blooms: 0 }); stroke(c, p, { w: 2.8, closed: true, seed: seed + 1 });
    F.fit(c, label, x, y - 42, 240, 40);
  }
  E.scene({
    name: 'Münazara', concept: 'Mantıksal temellendirme ve çelişki', from: 'debate', to: 'valid', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('debate'), sc = E.s('contra'), sv = E.s('valid');
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const dA = 1 - E.se(t, sv - 0.2, sv + 0.5);
      if (dA > 0) E.layer(ctx, dA, c => {
        const k1 = E.se(t, sd + 0.2, sd + 0.8, 'out');
        if (k1 > 0) { c.save(); c.globalAlpha *= k1; podium(c, 900, 860, PAL.life, 91, '1. grup'); podium(c, 1560, 860, PAL.water, 95, '2. grup'); c.restore(); }
        // 1. grup iddiası
        const b1 = E.se(t, sd + 1.2, sd + 1.9);
        if (b1 > 0) {
          P.bubble(c, 1000, 330, 700, 230, [900, 700], b1, 6);
          F.fit(c, '“Doğal gaz daha az', 1000, 300, 600, 44); F.fit(c, 'duman çıkarır, hava temizlenir.”', 1000, 360, 620, 40);
          const ok = E.se(t, sd + 5.6, sd + 6.4);
          if (ok > 0) { P.check(c, 1170, 490, 60, ok, { w: 9, color: F.GREEN }); c.save(); c.globalAlpha *= ok; F.fit(c, 'mantıklı gerekçe', 990, 515, 300, 34, { color: F.GREEN }); c.restore(); }
        }
        // 2. grup iddiası
        const b2 = E.se(t, sc + 0.2, sc + 0.9);
        if (b2 > 0) {
          P.bubble(c, 1540, 520, 620, 150, [1560, 748], b2, 8);
          F.fit(c, '“Doğal gaz tamamen', 1540, 510, 540, 42); F.fit(c, 'zararsızdır.”', 1540, 558, 540, 42);
          const xk = E.se(t, sc + 2.4, sc + 3.2);
          if (xk > 0) {
            c.save(); c.translate(1560, 250); c.rotate(-0.05); c.globalAlpha *= xk;
            const st = F.rr(-220, -60, 440, 120, 16); P.fillPts(c, st, PAL.white, 0.95); stroke(c, st, { w: 5, closed: true, color: F.RED, seed: 97 });
            F.fit(c, 'ÇELİŞKİ!', 0, 26, 400, 70, { color: F.RED });
            c.restore();
            P.cross(c, 1830, 520, 34, xk, { w: 8, color: F.RED });
          }
          const ek = E.se(t, sc + 4.4, sc + 5.4);
          if (ek > 0) { c.save(); c.globalAlpha *= ek; F.card(c, 1330, 318, 460, 106, 98, { tint: PAL.light, tintA: 0.2, blur: 8 }); F.fit(c, 'yanınca CO₂ oluşur →', 1560, 362, 420, 36); F.fit(c, 'iklim değişikliği', 1560, 406, 420, 36, { color: F.HEAT }); c.restore(); }
        }
      });
      // geçerli fikir
      const vA = E.se(t, sv, sv + 0.6);
      if (vA > 0) E.layer(ctx, vA, c => {
        F.card(c, 620, 190, 1200, 560, 101, { tint: F.GREEN, tintA: 0.1 });
        P.write(c, 'Geçerli fikir', 1220, 290, E.seg(t, sv + 0.3, sv + 1.1), { size: 66, align: 'center', color: F.GREEN });
        P.write(c, 'Her yakıtın çevreye bir etkisi vardır.', 1220, 400, E.seg(t, sv + 1.0, sv + 2.4), { size: 50, align: 'center' });
        P.write(c, 'Etkiler yakıta göre farklıdır.', 1220, 480, E.seg(t, sv + 2.2, sv + 3.4), { size: 46, align: 'center', weight: 400 });
        P.write(c, 'Az tüketmek + güvenli kullanmak', 1220, 600, E.seg(t, sv + 3.6, sv + 5.0), { size: 54, align: 'center', color: F.HEAT });
        P.drawOn(c, P.bez([860, 630], [1220, 642], [1580, 626], 30), E.se(t, sv + 5.0, sv + 5.8), { w: 3.4, color: F.HEAT });
      });
      F.damla(ctx, t, { x: 330, y: 890, expr: t > sv ? 'happy' : (t > sc + 2.4 ? 'surprised' : 'thinking'), view: 'q3', arms: t > sv ? [[-1, 0.4], [1, 2.2]] : [[-1, 0.4], [1, [34, -150]]], look: [0.8, -0.4] });
    }
  });
})();

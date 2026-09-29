// SAHNE 7 — Yay kalınlığı: ölçülecek kuvvete uygun dinamometre seçimi (TYMM: "ölçülecek kuvvete uygun kalınlıkta yaylar")
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', RED = '#A23A2A', X1 = 470, X2 = 1000, Y = 70, FY = 912;
  function mini(ctx, x, y, len, thick, lab) {
    line(ctx, [x - 50, y], [x + 50, y], { w: 5, taper: 0 });
    F05.spring(ctx, x, y + 6, y + 6 + len, { coils: thick ? 7 : 11, r: 18, w: thick ? 6 : 2.2 });
    const b = F05.rect(x - 28, y + 6 + len, x + 28, y + 46 + len); P.fillPts(ctx, b, PAL.paperDeep); stroke(ctx, b, { w: 2.4, closed: true, dry: false });
    F05.txt(ctx, '5 N', x, y + 36 + len, { size: 26, align: 'center' });
    F05.txt(ctx, lab, x, y + 90 + len, { size: 34, align: 'center' });
  }
  E.scene({
    name: 'Yay kalınlığı', concept: 'Kuvvete uygun yay kalınlığı seçme', from: 'bag', to: 'choose', trFrom: [470, 500],
    draw(ctx, t) {
      const sb = E.s('bag'), so = E.s('over'), sk = E.s('thick'), sc = E.s('choose');
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      F05.floor(ctx, FY, 5);
      line(ctx, [370, Y + 4], [1130, Y + 2], { w: 7, taper: 0.02, seed: 2501 });
      stroke(ctx, [[1130, Y + 2], [1134, FY]], { w: 7, seed: 2502, taper: 0.02 });
      // bag on thin, then moved to thick
      const onThin = E.se(t, sb + 1.2, sb + 1.8) * (1 - E.se(t, sk + 0.3, sk + 0.9));
      const onThick = E.se(t, sk + 1.0, sk + 1.6);
      const F1 = 30 * E.se(t, sb + 1.6, sb + 3.2, 'in') * (1 - E.se(t, sk + 0.3, sk + 0.9));
      const F2 = 30 * E.se(t, sk + 1.4, sk + 2.6, 'back');
      const over = F1 > 10;
      const shake = over && t < so ? Math.sin(t * 50) * 3 : 0;
      const r1 = F05.dyn(ctx, X1 + shake, Y, { L: 330, W: 88, max: 10, F: F1, thick: 1, num: 30 });
      const r2 = F05.dyn(ctx, X2, Y, { L: 330, W: 100, max: 50, F: F2, thick: 2, num: 30 });
      if (onThin > 0) E.layer(ctx, onThin, c => F05.bag(c, X1 + shake, r1.hook[1] - 4, 0.65));
      if (onThick > 0) E.layer(ctx, onThick, c => F05.bag(c, X2, r2.hook[1] - 4, 0.65));
      // labels
      P.write(ctx, 'ince yay', X1 - 64, 300, 1, { size: 40, align: 'right' }); P.write(ctx, '0–10 N', X1 - 64, 346, 1, { size: 34, weight: 400, align: 'right' });
      P.write(ctx, 'kalın yay', X2 - 70, 300, 1, { size: 40, align: 'right' }); P.write(ctx, '0–50 N', X2 - 70, 346, 1, { size: 34, weight: 400, align: 'right' });
      if (over) {
        const k = E.se(t, sb + 3.0, sb + 3.4, 'out');
        stroke(ctx, INK.wobble(circlePts(X1, r1.bot - 20, 80, 50, 40), 2, 2510), { w: 4, closed: true, color: RED, alpha: k });
        INK.label(ctx, 'sınır!', X1 + 90, r1.bot - 60, { size: 44, weight: 700, color: RED, alpha: k });
      }
      if (F2 > 29) { const k = E.se(t, sk + 2.6, sk + 3.0); INK.label(ctx, '30 N', X2 + 100, r2.py + 18, { size: 50, weight: 700, color: BR, alpha: k }); }
      // right column cards
      const aO = E.se(t, so, so + 0.6) * (1 - E.se(t, sk - 0.3, sk + 0.3));
      if (aO > 0) E.layer(ctx, aO, c => {
        F05.card(c, 1250, 160, 1850, 560, { color: RED, seed: 2520 });
        line(c, [1260, 234], [1840, 228], { w: 3, color: RED, dry: false });
        F05.txt(c, '⚠  DİKKAT', 1550, 212, { size: 46, align: 'center', color: RED });
        P.write(c, 'Ölçüm sınırını aşma!', 1550, 320, E.seg(t, so + 0.8, so + 2.0), { size: 50, align: 'center' });
        P.write(c, 'Aşırı gerilen yay', 1550, 410, E.seg(t, so + 2.2, so + 3.2), { size: 42, weight: 400, align: 'center' });
        P.write(c, 'bozulabilir.', 1550, 466, E.seg(t, so + 3.0, so + 4.0), { size: 42, weight: 400, align: 'center' });
      });
      const aT = E.se(t, sk + 3.0, sk + 3.8) * (1 - E.se(t, sc - 0.3, sc + 0.3));
      if (aT > 0) E.layer(ctx, aT, c => {
        F05.card(c, 1250, 150, 1850, 800, { seed: 2530 });
        P.write(c, 'aynı kuvvet, farklı uzama', 1550, 225, E.seg(t, sk + 3.4, sk + 4.6), { size: 42, align: 'center' });
        const u = E.se(t, sk + 4.4, sk + 5.8);
        mini(c, 1420, 290, E.lerp(60, 250, u), false, 'ince: çok uzar');
        mini(c, 1690, 290, E.lerp(50, 110, u), true, 'kalın: az uzar');
      });
      const aC = E.se(t, sc - 0.1, sc + 0.6);
      if (aC > 0) E.layer(ctx, aC, c => {
        F05.card(c, 1250, 150, 1850, 800, { seed: 2540 });
        P.write(c, 'Doğru dinamometreyi seç', 1550, 230, E.seg(t, sc + 0.2, sc + 1.4), { size: 44, align: 'center' });
        const k1 = E.se(t, sc + 1.0, sc + 1.6, 'out'), k2 = E.se(t, sc + 3.4, sc + 4.0, 'out');
        if (k1 > 0) { c.save(); c.globalAlpha = k1; F05.apple(c, 1330, 290, 0.7); F05.txt(c, 'küçük kuvvet', 1420, 350, { size: 40 }); F05.txt(c, '→ ince yaylı', 1420, 400, { size: 40, color: BR }); c.restore(); }
        if (k2 > 0) { c.save(); c.globalAlpha = k2; F05.bag(c, 1330, 500, 0.5); F05.txt(c, 'büyük kuvvet', 1420, 580, { size: 40 }); F05.txt(c, '→ kalın yaylı', 1420, 630, { size: 40, color: BR }); c.restore(); }
        E.inkText(c, 'Kuvvete uygun yayı seç!', 1550, 740, t, sc + 5.2, 1e9, { size: 42, align: 'center', color: BR });
      });
      // Damla
      const expr = t < sb + 3 ? 'curious' : (t < sk + 2.6 ? (t < so ? 'surprised' : 'sad') : 'happy');
      DAMLA.draw(ctx, { x: 740, y: FY, s: 1.05, view: 'q3', flip: t < sk + 1, expr, look: t < sk + 1 ? [0.7, -0.5] : [0.8, -0.6], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 3,
        arms: t > sb + 3 && t < so ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.4], [1, t > sk + 2.6 ? 2.3 : 0.4]] });
    }
  });
})();

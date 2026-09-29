// SAHNE 1 — Merak: masada sekiz olay (FB.8.5.2 uygulama malzemeleri)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  // [ad, çizim, sütun, satır, adın geçtiği beat, sıra]
  const ITEMS = [
    ['ekmek dilimleme', 'bread', 0, 0, 'hello', 0], ['patates haşlama', 'potato', 1, 0, 'hello', 1], ['mum yakma', 'candle', 2, 0, 'hello', 2], ['kâğıt yırtma', 'sheet', 3, 0, 'hello', 3],
    ['buz eritme', 'ice', 0, 1, 'hello2', 0], ['tahta kırma', 'wood', 1, 1, 'hello2', 1], ['çaya şeker atma', 'sugar', 2, 1, 'hello2', 2], ['çaya limon sıkma', 'lemon', 3, 1, 'hello2', 3]
  ];
  const XS = [290, 680, 1070, 1460], YS = [500, 800];
  U5.drawItem = function (ctx, kind, x, by, s, k, t) { // k: 0..1 işlemin ilerlemesi; by: taban çizgisi
    if (kind === 'bread') { U.bread(ctx, x - 40 * s, by - 60 * s, 0.9 * s, k); U.knife(ctx, x + 80 * s, by - 150 * s + 40 * s * Math.sin(k * 12) * (k < 1 && k > 0 ? 1 : 0), s * 0.8, 1.3); }
    else if (kind === 'potato') { const pot = [[x - 110 * s, by - 110 * s], [x + 110 * s, by - 110 * s], [x + 95 * s, by], [x - 95 * s, by], [x - 110 * s, by - 110 * s]]; P.fillPts(ctx, pot, '#9A9FA6', 0.9); stroke(ctx, pot, { w: 2.6, closed: true, dry: false }); U.potato(ctx, x, by - 120 * s, 0.9 * s, k); U.steam(ctx, x, by - 150 * s, 160 * s, 90 * s, k, t, 71); }
    else if (kind === 'candle') U.candle(ctx, x, by, 150 * s, t, { lit: k, w: 50 * s, fs: s });
    else if (kind === 'sheet') U.sheet(ctx, x, by - 100 * s, 0.9 * s, k);
    else if (kind === 'ice') U.ice(ctx, x, by, 1.7 * s, 0.75 * k);
    else if (kind === 'wood') U.wood(ctx, x, by - 40 * s, s, k);
    else if (kind === 'sugar') { U.cup(ctx, x, by, s, { tea: '#A0522D' }); if (k < 1) { const cy = E.lerp(by - 190 * s, by - 60 * s, Math.min(1, k * 1.6)); const sz = 26 * s * (1 - Math.max(0, k - 0.6) / 0.4); if (sz > 1) { const c = U.rect(x - sz, cy - sz, x + sz, cy + sz); P.fillPts(ctx, c, '#FFFDF6'); stroke(ctx, c, { w: 2, closed: true, dry: false }); } } }
    else if (kind === 'lemon') { U.cup(ctx, x, by, s, { tea: `rgb(${Math.round(E.lerp(160, 205, k))},${Math.round(E.lerp(82, 140, k))},${Math.round(E.lerp(45, 70, k))})` }); U.lemon(ctx, x + 90 * s, by - 170 * s + 30 * s * k, s * 0.9); if (k > 0.2 && k < 0.9) for (let i = 0; i < 3; i++) U.ball(ctx, x + 70 * s - i * 8, by - 130 * s + ((t * 120 + i * 30) % 60) * s, 5 * s, '#EFD34E'); }
  };
  E.scene({
    name: 'Merak', concept: 'Sekiz günlük olay', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), s2 = E.s('hello2'), sq = E.s('q');
      U.bench(ctx, -40, 1960, 880, 1401);
      ITEMS.forEach(([nm, kind, c, r, beat, j]) => {
        const b0 = E.s(beat), dur = E.e(beat) - b0 - 0.4, at = b0 + 0.3 + j * dur / 4;
        const ak = E.se(t, at - 0.3, at + 0.3, 'out'); if (ak <= 0) return;
        const k = E.se(t, at + 0.2, at + dur / 4 + 0.6);
        const x = XS[c], by = YS[r];
        E.layer(ctx, ak, cx => {
          if (r === 0) { cx.save(); cx.globalAlpha *= 0.5; line(cx, [x - 170, by + 8], [x + 170, by + 6], { w: 2.4, dry: false, color: '#8A6A45' }); cx.restore(); }
          U5.drawItem(cx, kind, x, by, 0.8, k, t);
          U.txt(cx, nm, x, by + 50, { size: 36, align: 'center' });
        });
      });
      const qk = E.se(t, sq + 0.4, sq + 1.2);
      U.damla(ctx, t, { x: 1790, y: 880, s: 1.0, view: 'q3', flip: true, expr: t > sq ? 'thinking' : 'curious', look: [-0.9, -0.1], arms: qk > 0 ? [[-1, 2.6], [1, 0.4]] : [[-1, 1.2], [1, 0.4]] });
      if (qk > 0) ['?', '?'].forEach((s, i) => U.txt(ctx, s, 1760 + i * 50, 600 - i * 40 + Math.sin(t * 3 + i) * 6, { size: 70 + i * 12, alpha: qk, color: PAL.water }));
      U.title(ctx, t, '14 · Değişimin İzleri');
    }
  });
})();

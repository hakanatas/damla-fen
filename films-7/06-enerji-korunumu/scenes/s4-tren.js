// SAHNE 4 — Gözlem 4: eğik düzlem / oyuncak hız treni (sürat, enerji korunumuyla hesaplanan zaman tablosundan) → örüntü (FB.7.2.3 a)
(function () {
  const { PAL, line } = INK;
  const F = F7E, A = F76;
  E.scene({
    name: 'Hız treni', concept: 'Yükseklik–sürat örüntüsü', from: 'coaster', to: 'pattern2', trFrom: [300, 400],
    draw(ctx, t) {
      const sc = E.s('coaster'), sp = E.s('pattern'), s2 = E.s('pattern2');
      A.track(ctx);
      const run = (t - (sc + 1.0)) * (A.RUN / 6.5); // bütün tur ≈ 6,5 sn
      const x = A.xAt(run);
      // izler (eşit zaman aralıkları → aralık büyükse sürat büyük)
      for (let i = 1; i < 26; i++) { const tt = i * A.RUN / 26; if (tt > run) break; const xx = A.xAt(tt); INK.inkDot(ctx, xx, A.trackY(xx) - 64, 4, { alpha: 0.5 }); }
      A.car(ctx, x, t);
      if (run > 0 && run < A.RUN) E.inkText(ctx, 'noktalar: eşit zaman aralıkları', 1180, 900 - 24, t, sc + 1.2, sp + 0.5, { size: 30, align: 'center', alpha: 0.7 });
      const y = A.trackY(x), pe = (A.LOW - y) / (A.LOW - A.TOP);
      E.layer(ctx, 0.95, c => A.bars(c, 1530, 380, A.std(pe, 1 - pe, 0, false), { H: 200, bw: 56, gap: 160, size: 32 }));
      // örüntü kartı
      const pk = E.se(t, sp + 0.3, sp + 1.0, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        F.card(c, 640, 150, 1440, 395, { seed: 6400 });
        P.write(c, 'Örüntü', 680, 205, E.seg(t, sp + 0.5, sp + 1.2), { size: 50, color: '#8A4A10' });
        P.write(c, 'yükseklik ↓  →  sürat ↑', 680, 262, E.seg(t, sp + 1.4, sp + 2.8), { size: 44 });
        P.write(c, 'yükseklik ↑  →  sürat ↓', 680, 316, E.seg(t, sp + 3.6, sp + 5.0), { size: 44 });
        P.write(c, '⇒ potansiyel enerji ⇄ kinetik enerji', 680, 372, E.seg(t, s2 + 0.3, s2 + 1.6), { size: 40, color: '#8A4A10' });
      });
    }
  });
})();

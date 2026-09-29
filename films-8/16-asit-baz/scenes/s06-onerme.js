// SAHNE 6 — Ayıraç (belirteç) tanımı · ön bilgiyle önermeler (FB.8.5.6 a) · gözleme dayalı olan/olmayan önermeler (b)
(function () {
  const { PAL } = INK;
  const U = U5;
  const BY = 830;
  U5.row = (ctx, t, o = {}) => { // altı beher (eşit miktar, üstünde adları)
    const xs = o.xs ?? [230, 440, 650, 860, 1070, 1280];
    U.SAMP.forEach((sm, i) => {
      const k = o.show ? o.show(i) : 1; if (k <= 0) return;
      const col = o.col ? o.col(i) : sm.col;
      E.layer(ctx, k, c => U.beaker(c, xs[i], BY, o.s ?? 0.82, { liq: col, lvl: 0.55, name: sm.name, nameSize: 30, seed: 5000 + i * 3, liqA: sm.name === 'süt' && !o.col ? 0.95 : 0.55 }));
    });
    return xs;
  };
  E.scene({
    name: 'Ayıraç ve önermeler', concept: 'Ayıraç; gözleme dayalı olan ve olmayan önermeler', from: 'how', to: 'claims2', trFrom: [960, 500],
    draw(ctx, t) {
      const sh = E.s('how'), sc = E.s('claims'), s2 = E.s('claims2');
      U.bench(ctx, -40, 1960, BY, 1801);
      U5.row(ctx, t, { show: i => E.se(t, sh + 0.2 + i * 0.25, sh + 0.7 + i * 0.25, 'out') });
      // ayıraç tanımı
      const dk = Math.min(E.se(t, sh + 2.0, sh + 2.7, 'out'), 1 - E.se(t, sc - 0.2, sc + 0.4));
      if (dk > 0) E.layer(ctx, dk, c => {
        U.card(c, 330, 200, 1260, 300, { seed: 5100, tint: U.CABBAGE, tintA: 0.1 });
        P.write(c, 'Ayıraç (belirteç):', 380, 285, E.seg(t, sh + 2.6, sh + 3.4), { size: 56, color: U.CABBAGE });
        P.write(c, 'asit, baz ya da nötr ortamda', 420, 370, E.seg(t, sh + 3.3, sh + 4.3), { size: 46 });
        P.write(c, 'farklı renk alan madde', 420, 440, E.seg(t, sh + 4.1, sh + 5.0), { size: 46 });
      });
      // önerme kartları
      const CL = [['1) Limon suyu asittir.', 0.6], ['2) Sabunlu su bazdır.', 2.6], ['3) Süt beyaz olduğu için nötrdür.', 4.6]];
      CL.forEach(([s, d], i) => {
        const k = E.se(t, sc + d, sc + d + 0.5, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { U.card(c, 150, 185 + i * 125, 1020, 100, { seed: 5110 + i }); P.write(c, s, 190, 250 + i * 125, E.seg(t, sc + d + 0.3, sc + d + 1.5), { size: 46 }); });
      });
      const d1 = E.se(t, s2 + 0.4, s2 + 0.9, 'back'), d3 = E.se(t, s2 + 2.4, s2 + 2.9, 'back');
      U.stamp(ctx, 1390, 235, 'deneyime dayalı', PAL.life, d1, { size: 34 });
      U.stamp(ctx, 1390, 360, 'deneyime dayalı', PAL.life, d1, { size: 34 });
      U.stamp(ctx, 1390, 485, 'gözleme dayalı değil', U.AMBER, d3, { size: 34 });
      const sk = E.se(t, s2 + 4.4, s2 + 5.2);
      if (sk > 0) P.write(ctx, '→ ayıraçla sına!', 1390, 580, sk, { size: 44, align: 'center', color: U.CABBAGE });
      U.damla(ctx, t, { x: 1690, y: BY, s: 0.95, flip: true, expr: t > sc && t < s2 ? 'thinking' : 'curious', look: [-0.8, -0.1], arms: [[-1, 1.2], [1, 1.4 + 0.12 * Math.sin(t * 9)]], prop: 'notebook' });
    }
  });
})();

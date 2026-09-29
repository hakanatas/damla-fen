// SAHNE 5 — Karşılaştırma tablosu (FB.8.3.3 b benzerlikler, c farklılıklar) — gözlem defterinde
(function () {
  const { PAL, line } = INK; const K = KIT;
  const ROWS = [
    ['Nerede?', 'vücut hücreleri', 'üreme ana hücreleri'],
    ['Amacı', 'büyüme, onarım, eşeysiz üreme', 'üreme hücreleri oluşturmak'],
    ['Aşama', 'bir', 'iki'],
    ['Yeni hücre', '2', '4'],
    ['Kromozom sayısı', 'aynı kalır (46 → 46)', 'yarıya iner (46 → 23)'],
    ['Kalıtsal bilgi', 'ana hücreyle aynı', 'farklı (çeşitlilik)']
  ];
  const CX = [300, 700, 1230];
  E.scene({
    name: 'Karşılaştırma', concept: 'Benzerlikler ve farklılıklar', from: 'same', to: 'diff', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('same'), sd = E.s('diff');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 850);
      P.write(ctx, 'Mitoz – Mayoz karşılaştırma tablosu', 1700, 160, E.seg(t, ss + 0.2, ss + 1.4), { size: 56, align: 'right' });
      // benzerlikler
      P.write(ctx, 'Benzerlikler:', 290, 240, E.seg(t, ss + 1.4, ss + 2.2), { size: 40, color: K.LIFE_D });
      P.write(ctx, '✓ İkisi de hücre bölünmesidir.', 540, 240, E.seg(t, ss + 2.4, ss + 3.6), { size: 40 });
      P.write(ctx, '✓ İkisinden önce de DNA eşlenir.', 540, 290, E.seg(t, ss + 4.2, ss + 5.4), { size: 40 });
      // tablo
      const hk = E.se(t, sd + 0.2, sd + 1.0);
      if (hk > 0) { ctx.save(); ctx.globalAlpha *= hk;
        K.text(ctx, 'Farklılıklar', CX[0], 365, { size: 40, color: K.LIFE_D });
        K.text(ctx, 'Mitoz', CX[1], 365, { size: 46, color: PAL.water }); K.text(ctx, 'Mayoz', CX[2], 365, { size: 46, color: '#C07F1E' });
        line(ctx, [280, 385], [1720, 389], { w: 2.6 }); line(ctx, [680, 330], [682, 870], { w: 2, alpha: 0.6 }); line(ctx, [1210, 330], [1212, 870], { w: 2, alpha: 0.6 });
        ctx.restore(); }
      ROWS.forEach((r, i) => {
        const at = sd + 1.2 + i * 2.1, y = 445 + i * 76;
        P.write(ctx, r[0], CX[0], y, E.seg(t, at, at + 0.6), { size: 36, alpha: 0.8 });
        const w1 = r[1].length > 20 ? 34 : 38;
        P.write(ctx, r[1], CX[1], y, E.seg(t, at + 0.4, at + 1.2), { size: w1 });
        P.write(ctx, r[2], CX[2], y, E.seg(t, at + 0.9, at + 1.7), { size: 38 });
        if (i < ROWS.length - 1 && t > at) line(ctx, [280, y + 24], [1720, y + 26], { w: 1, alpha: 0.25 * E.se(t, at, at + 0.5), dry: false });
      });
    }
  });
})();

// SAHNE 5 — Karşılaştırma: benzer (ortak) ve farklı özellikler listesi (FB.8.5.5 b, c) + asit + baz → tuz + su (denklemsiz)
(function () {
  const { PAL, line } = INK;
  const U = U5;
  const COLS = [
    { x: 110, w: 540, head: 'ASİT', col: U.ACID, items: [['suda H⁺ iyonu verir'], ['bazı metallerle', 'tepkimeye girer'], ['mermerle', 'tepkimeye girer']], beat: 'diff', d: 0.6 },
    { x: 690, w: 540, head: 'ORTAK', col: PAL.ink, items: [['suda iyon verir'], ['sulu çözeltisi', 'elektrik iletir'], ['ayıraçların rengini', 'değiştirir'], ['aşındırıcı olabilir']], beat: 'common', d: 1.2 },
    { x: 1270, w: 540, head: 'BAZ', col: U.BASE, items: [['suda OH⁻ iyonu verir'], ['cam, porselen, seramikle', 'tepkimeye girebilir'], ['yağlarla', 'tepkimeye girer']], beat: 'diff', d: 3.4 }
  ];
  E.scene({
    name: 'Karşılaştır', concept: 'Benzer ve farklı özellikler', from: 'common', to: 'salt', trFrom: [960, 400],
    draw(ctx, t) {
      const sc = E.s('common'), ss = E.s('salt');
      COLS.forEach((C, ci) => {
        const hk = E.se(t, sc + 0.2 + ci * 0.25, sc + 0.8 + ci * 0.25, 'out'); if (hk <= 0) return;
        E.layer(ctx, hk, c => {
          U.card(c, C.x, 180, C.w, 520, { seed: 4900 + ci, tint: ci === 1 ? PAL.light : C.col, tintA: ci === 1 ? 0.1 : 0.08 });
          U.txt(c, C.head, C.x + C.w / 2, 250, { size: 54, align: 'center', color: C.col });
          line(c, [C.x + 40, 272], [C.x + C.w - 40, 268], { w: 2.4, dry: false, color: C.col, alpha: 0.7 });
        });
        let y = 340;
        C.items.forEach((lines, i) => {
          const at = E.s(C.beat) + C.d + i * 1.3;
          lines.forEach((l, j) => P.write(ctx, l, C.x + 34 + (j ? 30 : 0), y + j * 46, E.seg(t, at + j * 0.4, at + j * 0.4 + 0.8), { size: 36 }));
          if (t > at) { ctx.save(); ctx.globalAlpha *= E.se(t, at, at + 0.3); INK.inkDot(ctx, C.x + 20, y - 12, 5); ctx.restore(); }
          y += 46 * lines.length + 26;
        });
      });
      // tuz + su
      const kk = E.se(t, ss + 0.3, ss + 1.0, 'out');
      if (kk > 0) E.layer(ctx, kk, c => {
        U.card(c, 330, 735, 1260, 150, { seed: 4920, tint: PAL.light, tintA: 0.14 });
        const y = 815; let x = 440; c.font = '700 56px Kalam'; const W = s => c.measureText(s).width;
        P.write(c, 'asit', x, y, E.seg(t, ss + 0.8, ss + 1.4), { size: 56, color: U.ACID }); x += W('asit') + 24;
        P.write(c, '+', x, y, E.seg(t, ss + 1.2, ss + 1.5), { size: 56 }); x += W('+') + 24;
        P.write(c, 'baz', x, y, E.seg(t, ss + 1.4, ss + 2.0), { size: 56, color: U.BASE }); x += W('baz') + 30;
        if (t > ss + 2.0) P.arrow(c, [x, y - 18], [x + 110, y - 18], E.se(t, ss + 2.0, ss + 2.6), { w: 4, head: 16 });
        x += 140;
        P.write(c, 'tuz + su', x, y, E.seg(t, ss + 2.6, ss + 3.4), { size: 56, color: PAL.water });
        P.write(c, 'birbirinin etkisini azaltır', 1550, 830, E.seg(t, ss + 3.4, ss + 4.4), { size: 36, align: 'right', color: U.AMBER });
      });
    }
  });
})();

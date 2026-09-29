// SAHNE 4 — Yaygın asit ve bazların günlük adları ve formülleri (programda sayılanlar)
(function () {
  const { PAL, line } = INK;
  const U = U5;
  const ACIDS = [['tuz ruhu', 'hidroklorik asit', 'HCl'], ['kezzap', 'nitrik asit', 'HNO3'], ['akü asidi', 'sülfürik asit', 'H2SO4'], ['sirke', 'asetik asit', 'CH3COOH'], ['gazoz', 'karbonik asit', 'H2CO3']];
  const BASES = [['sud kostik', 'sodyum hidroksit', 'NaOH'], ['potas kostik', 'potasyum hidroksit', 'KOH'], ['sönmüş kireç', 'kalsiyum hidroksit', 'Ca(OH)2'], ['amonyak', 'amonyak', 'NH3']];
  function table(ctx, x, y, w, head, col, rows, t, t0, step, seed) {
    const h = 150 + rows.length * 76;
    U.card(ctx, x, y, w, h, { seed, tint: col, tintA: 0.08 });
    U.txt(ctx, head, x + w / 2, y + 66, { size: 50, align: 'center', color: col });
    U.txt(ctx, 'günlük adı', x + 30, y + 118, { size: 28, alpha: 0.6 }); U.txt(ctx, 'kimyasal adı', x + 290, y + 118, { size: 28, alpha: 0.6 }); U.txt(ctx, 'formül', x + w - 30, y + 118, { size: 28, align: 'right', alpha: 0.6 });
    line(ctx, [x + 24, y + 132], [x + w - 24, y + 130], { w: 2, dry: false, alpha: 0.5 });
    rows.forEach(([a, b, f], i) => {
      const at = t0 + i * step, k = E.se(t, at, at + 0.6); if (k <= 0) return;
      const yy = y + 190 + i * 76;
      P.write(ctx, a, x + 30, yy, E.seg(t, at, at + 0.7), { size: 38 });
      P.write(ctx, b, x + 290, yy, E.seg(t, at + 0.2, at + 0.9), { size: 32, color: PAL.inkSoft });
      ctx.save(); ctx.globalAlpha *= E.se(t, at + 0.5, at + 1.0); U.formula(ctx, f, x + w - 30, yy, 40, { align: 'right', color: col }); ctx.restore();
    });
  }
  E.scene({
    name: 'Yaygın asit ve bazlar', concept: 'Günlük adlar ve formüller', from: 'names', to: 'names2', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('names'), sb = E.s('names2');
      const k1 = E.se(t, sa + 0.1, sa + 0.7, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => table(c, 110, 190, 820, 'Asitler', U.ACID, ACIDS, t, sa + 0.8, 1.35, 4800));
      const k2 = E.se(t, sb + 0.1, sb + 0.7, 'out');
      if (k2 > 0) E.layer(ctx, k2, c => table(c, 990, 190, 820, 'Bazlar', U.BASE, BASES, t, sb + 0.8, 1.2, 4810));
      U.damla(ctx, t, { x: 1560, y: 900, s: 0.62, flip: true, expr: 'happy', look: [-0.7, -0.3], arms: [[-1, 1.2], [1, 1.4 + 0.12 * Math.sin(t * 9)]], prop: 'notebook' });
    }
  });
})();

// SAHNE 7 — Turnusol kâğıdı ile gözlem: limon suyu, sabunlu su, saf su (FB.8.5.6 c — gözlem verilerinden sonuç)
(function () {
  const { PAL } = INK;
  const U = U5;
  const BY = 840, S = 1.15;
  const L = U.LIT;
  // her beher: ad, sıvı, [mavi şerit hedef rengi, kırmızı şerit hedef rengi], değişim zamanı (beat, gecikme), sonuç
  const CUPS = [
    { x: 520, name: 'limon suyu', liq: '#F1E08A', blueTo: L.red, redTo: L.red, beat: 'litmus2', d: 0.6, res: 'asit', col: U.ACID },
    { x: 960, name: 'sabunlu su', liq: '#ECEFF0', blueTo: L.blue, redTo: L.blue, beat: 'litmus2', d: 4.6, res: 'baz', col: U.BASE },
    { x: 1400, name: 'saf su', liq: '#D3E5EE', blueTo: L.blue, redTo: L.red, beat: 'litmus3', d: 0.4, res: 'nötr', col: PAL.ink }
  ];
  function legendRow(ctx, x, y, from, to, word, k, wk) {
    ctx.save(); ctx.globalAlpha *= k;
    const r1 = U.rect(x, y - 22, x + 130, y + 22); P.fillPts(ctx, r1, from, 0.7); INK.stroke(ctx, r1, { w: 2, closed: true, dry: false });
    U.txt(ctx, '+ ' + word, x + 150, y + 14, { size: 40 });
    ctx.restore();
    if (wk > 0) { P.arrow(ctx, [x + 330, y], [x + 430, y], wk, { w: 3.5, head: 14 }); ctx.save(); ctx.globalAlpha *= wk; const r2 = U.rect(x + 460, y - 22, x + 590, y + 22); P.fillPts(ctx, r2, to, 0.8); INK.stroke(ctx, r2, { w: 2, closed: true, dry: false }); ctx.restore(); }
  }
  E.scene({
    name: 'Turnusol', concept: 'Turnusol kâğıdı ile gözlem', from: 'litmus', to: 'litmus3', trFrom: [960, 540],
    draw(ctx, t) {
      const sl = E.s('litmus');
      U.bench(ctx, -40, 1960, BY, 1901);
      // açıklama (lejant)
      const lk = Math.min(E.se(t, sl + 0.3, sl + 0.9), 1 - E.se(t, E.s('litmus2') - 0.2, E.s('litmus2') + 0.4));
      if (lk > 0) E.layer(ctx, lk, c => {
        U.card(c, 560, 190, 800, 250, { seed: 5200 });
        U.txt(c, 'mavi turnusol', 600, 250, { size: 32, alpha: 0.7 }); legendRow(c, 600, 290, L.blue, L.red, 'asit', 1, E.se(t, sl + 1.6, sl + 2.4));
        U.txt(c, 'kırmızı turnusol', 600, 360, { size: 32, alpha: 0.7 }); legendRow(c, 600, 400, L.red, L.blue, 'baz', E.se(t, sl + 3.3, sl + 3.8), E.se(t, sl + 4.4, sl + 5.2));
      });
      const bk = E.se(t, sl + 0.2, sl + 0.9, 'out');
      if (bk > 0) E.layer(ctx, bk, c => {
        CUPS.forEach((C, i) => {
          const r = U.beaker(c, C.x, BY, S, { liq: C.liq, lvl: 0.55, name: C.name, nameSize: 34, seed: 5210 + i * 3, liqA: 0.6 });
          const t0 = E.s(C.beat) + C.d;
          const dip = E.se(t, t0 - 0.6, t0, 'io');            // şeritler iner
          const ch = E.se(t, t0 + 0.3, t0 + 1.8);              // renk değişimi
          const sy = E.lerp(420, 520, dip), h = 300;
          const wet = Math.max(0, Math.min(1, (sy + h - r.ly) / h)) * (dip >= 1 ? 1 : dip);
          const stK = E.se(t, E.s('litmus2') - 0.2, E.s('litmus2') + 0.4);
          if (stK > 0) E.layer(c, stK, c2 => {
            U.strip(c2, C.x - 30, sy, 36, h, L.blue, C.blueTo, wet, ch, { seed: 5230 + i * 5 });
            U.strip(c2, C.x + 30, sy, 36, h, L.red, C.redTo, wet, ch, { seed: 5240 + i * 5 });
            U.tweezer(c2, C.x - 30, sy, 0.6); U.tweezer(c2, C.x + 30, sy, 0.6);
          });
          const rk = E.se(t, t0 + 1.9, t0 + 2.4, 'back');
          U.stamp(c, C.x, 290, C.res, C.col, rk, { size: 44, rot: -0.05 });
        });
      });
      U.damla(ctx, t, { x: 1760, y: BY, s: 0.95, flip: true, expr: t > E.s('litmus2') ? 'surprised' : 'curious', look: [-0.9, 0.1], arms: [[-1, 1.3], [1, 0.4]] });
    }
  });
})();

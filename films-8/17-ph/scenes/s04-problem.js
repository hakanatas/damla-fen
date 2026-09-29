// SAHNE 4 — Probleme dayalı senaryo: mermer tezgâhta limon lekesi → problemi betimle, hipotez kur (FB.8.5.8)
(function () {
  const { PAL, line, circlePts, rng } = INK;
  const U = U5;
  function marble(ctx, x0, y0, x1, y1) {
    const top = [[x0 + 60, y0], [x1 - 60, y0], [x1, y1], [x0, y1], [x0 + 60, y0]];
    P.fillPts(ctx, top, '#EEEBE4'); INK.wash(ctx, top, '#9A9FA6', 0.18, 6300, { bleed: 2, blooms: 2 });
    const r = rng(6301);
    for (let i = 0; i < 7; i++) { const a = [x0 + r() * (x1 - x0), y0 + r() * (y1 - y0)]; const b = [a[0] + 120 + r() * 200, a[1] + (r() - 0.5) * 80]; INK.stroke(ctx, P.bez(a, [(a[0] + b[0]) / 2, a[1] - 30 + r() * 60], b, 20), { w: 1.4, color: '#8C9198', alpha: 0.55, dry: false }); }
    INK.stroke(ctx, top, { w: 3, closed: true, seed: 6302 });
    const fr = [[x0, y1], [x1, y1], [x1, y1 + 40], [x0, y1 + 40], [x0, y1]]; P.fillPts(ctx, fr, '#D9D5CC'); INK.stroke(ctx, fr, { w: 3, closed: true, seed: 6303 });
  }
  E.scene({
    name: 'Problem', concept: 'Problemi betimleme ve hipotez', from: 'problem', to: 'hypo', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('problem'), sh = E.s('hypo');
      marble(ctx, 120, 560, 1500, 800);
      U.txt(ctx, 'mermer tezgâh', 280, 865, { size: 34, alpha: 0.7 });
      U.halfLemon(ctx, 1120, 600, 1.1);
      // damla düşer, sonra mat leke
      const fall = E.se(t, sp + 0.5, sp + 1.4, 'in');
      if (fall < 1 && t > sp + 0.3) { const y = E.lerp(560, 680, fall); P.fillPts(ctx, circlePts(900, y, 10, 14, 16), '#EFD34E', 0.9); INK.stroke(ctx, circlePts(900, y, 10, 14, 16), { w: 1.6, closed: true, dry: false }); }
      const spot = E.se(t, sp + 1.4, sp + 3.2);
      if (spot > 0) {
        const s = INK.wobble(circlePts(880, 690, 80 * Math.min(1, spot * 1.5), 26 * Math.min(1, spot * 1.5), 40), 3, 6310);
        P.fillPts(ctx, s, '#FFFFFF', 0.55 * spot); INK.stroke(ctx, s, { w: 1.6, closed: true, dry: false, alpha: 0.5 * spot });
        if (spot > 0.6) { P.arrow(ctx, [700, 500], [820, 660], E.se(t, sp + 3.0, sp + 3.8), { w: 3, head: 12, color: U.AMBER }); P.write(ctx, 'mat leke', 600, 480, E.seg(t, sp + 3.2, sp + 4.0), { size: 42, color: U.AMBER }); }
      }
      // betimleme + hipotez kartı
      const ck = E.se(t, sp + 4.0, sp + 4.6, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        U.card(c, 900, 190, 880, 270, { seed: 6320 });
        U.txt(c, 'Problem: Neden mat leke oluştu?', 940, 260, { size: 40 });
        const hk = E.se(t, sh + 0.3, sh + 0.8);
        if (hk > 0) { P.write(c, 'Hipotez:', 940, 340, E.seg(t, sh + 0.3, sh + 1.0), { size: 44, color: U.AMBER }); P.write(c, 'Asitler mermerle tepkimeye girer.', 960, 405, E.seg(t, sh + 0.9, sh + 2.2), { size: 44 }); }
      });
      U.damla(ctx, t, { x: 1700, y: 800, s: 0.9, flip: true, expr: t < sh ? 'surprised' : 'determined', look: [-0.9, 0.3], arms: [[-1, t < sh ? 1.3 : 2.4], [1, 0.4]] });
    }
  });
})();

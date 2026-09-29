// SAHNE 1 — Merak: limon suyu ve sirke, ikisi de asit; ama asitlik dereceleri aynı mı? (FB.8.5.7 açık uçlu soru)
(function () {
  const { PAL } = INK;
  const U = U5;
  const BY = 820;
  E.scene({
    name: 'Merak', concept: 'Asitlik derecesi farklı olabilir mi?', from: 'title', to: 'hello2',
    draw(ctx, t) {
      const sh = E.s('hello'), s2 = E.s('hello2');
      U.bench(ctx, -40, 1960, BY, 2101);
      const k = E.se(t, sh + 0.2, sh + 0.9, 'out');
      if (k > 0) E.layer(ctx, k, c => {
        U.beaker(c, 560, BY, 1.4, { liq: U.SAMP[0].col, lvl: 0.6, name: 'limon suyu', nameSize: 38, seed: 6000 });
        U.beaker(c, 1060, BY, 1.4, { liq: U.SAMP[1].col, lvl: 0.6, name: 'sirke', nameSize: 38, seed: 6003 });
        U.halfLemon(c, 390, BY - 40, 0.9);
        U.stamp(c, 560, 470, 'asit', U.ACID, E.se(t, sh + 1.2, sh + 1.7, 'back'), { size: 42 });
        U.stamp(c, 1060, 470, 'asit', U.ACID, E.se(t, sh + 1.8, sh + 2.3, 'back'), { size: 42 });
        const qk = E.se(t, sh + 3.0, sh + 3.8);
        if (qk > 0) U.txt(c, '= ?', 810, 640, { size: 90, align: 'center', color: PAL.water, alpha: qk });
      });
      // lahana ipucu: renk tonları
      const ck = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        U.card(c, 1250, 200, 560, 330, { seed: 6010 });
        U.txt(c, 'mor lahana suyunda', 1530, 260, { size: 36, align: 'center', alpha: 0.75 });
        [['#C8233F', 'limon'], ['#D8467E', 'sirke']].forEach(([col, nm], i) => {
          const x = 1400 + i * 260, r = U.rect(x - 90, 300, x + 90, 420);
          P.fillPts(c, r, col, 0.5); INK.wash(c, r, col, 0.8, 6020 + i, { bleed: 1.5, blooms: 1 }); INK.stroke(c, r, { w: 2, closed: true, dry: false });
          U.txt(c, nm, x, 470, { size: 36, align: 'center' });
        });
        P.write(c, 'ton farkı = ipucu?', 1530, 515, E.seg(t, s2 + 2.0, s2 + 3.0), { size: 34, align: 'center', color: U.AMBER });
      });
      U.damla(ctx, t, { x: 1720, y: BY, s: 0.95, flip: true, expr: t > s2 ? 'thinking' : 'curious', look: [-0.9, -0.2], arms: [[-1, 1.2], [1, 0.4]] });
      U.title(ctx, t, '17 · pH Cetveli');
    }
  });
})();

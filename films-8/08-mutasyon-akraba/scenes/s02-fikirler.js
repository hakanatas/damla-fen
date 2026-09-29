// SAHNE 2 — Beyin fırtınası: üç fikir notu (sonra s06'da sınanacak)
(function () {
  const { PAL } = INK;
  const F = F808;
  F.IDEAS = [
    ['Akraba evliliğinde', 'her çocuk hasta doğar.'],
    ['Akraba olmayanlarda bu', 'hastalıklar hiç görülmez.'],
    ['Akraba evliliği, kalıtsal hastalık', 'görülme olasılığını artırır.']
  ];
  F.NOTE_Y = [300, 500, 700];
  F.board = (ctx, t, t0, o = {}) => {
    F.IDEAS.forEach((l, i) => F.note(ctx, 540, F.NOTE_Y[i], 780, 170, l, o.k ? o.k[i] : E.se(t, t0 + 0.6 + i * 1.5, t0 + 1.3 + i * 1.5, 'out'), { num: (i + 1) + '.', rot: [-0.015, 0.012, -0.008][i], seed: 3500 + i * 7, size: 40 }));
  };
  E.scene({
    name: 'Beyin fırtınası', concept: 'Fikirleri toplama', from: 'ideas', to: 'ideas', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('ideas');
      F.warmBg(ctx);
      F.board(ctx, t, si);
      F.damla(ctx, t, { x: 1450, y: 870, s: 1.3, flip: true, expr: 'determined', look: [-0.8, -0.1], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]] });
      const bk = E.se(t, si + 5.0, si + 5.6);
      if (bk > 0) { P.bubble(ctx, 1480, 360, 560, 190, [1450, 560], bk, 8); P.write(ctx, 'Kanıtlarla sınayacağım!', 1480, 380, E.seg(t, si + 5.3, si + 6.3), { size: 46, align: 'center' }); }
    }
  });
})();

// SAHNE 6 — Gözlem defterine kaydetme (OB7)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F82;
  const ITEMS = [
    ['Hava olayları: atmosferde, kısa sürede, dar alanda', ''],
    ['İklim: geniş alanlarda uzun yılların ortalaması', ''],
    ['Yağmur, çiy, sis → yoğuşma · dolu → donma', 'kar, kırağı → kırağılaşma (gaz → katı)'],
    ['Meteoroloji → meteorolog · İklim bilimi → iklim bilimci', ''],
    ['Hava olayları yeryüzünü şekillendirir', 'kıyılar, kum tepeleri, peri bacaları']
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 165, 1620, 750);
      P.write(ctx, 'Gözlem Defteri · Hava ve İklim', 290, 250, E.seg(t, sr + 0.3, sr + 1.4), { size: 58 });
      if (t > sr + 1.4) P.drawOn(ctx, P.bez([286, 272], [640, 284], [1060, 268], 30), E.se(t, sr + 1.4, sr + 1.9), { w: 3, color: PAL.light });
      let y = 345;
      ITEMS.forEach(([a, b], i) => {
        const at = sr + 1.6 + i * 1.4;
        const box = [[300, y - 38], [340, y - 40], [342, y + 2], [302, y + 4], [300, y - 38]];
        if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(ctx, 320, y - 18, 38, E.se(t, at + 0.9, at + 1.3), { w: 5 });
        P.write(ctx, a, 370, y, E.seg(t, at, at + 1.1), { size: 42 });
        if (b) P.write(ctx, '→ ' + b, 410, y + 48, E.seg(t, at + 0.7, at + 1.5), { size: 34, weight: 400, color: F.BROWN });
        y += b ? 125 : 82;
      });
      DAMLA.draw(ctx, { x: 1700, y: 1060, s: 1.05, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

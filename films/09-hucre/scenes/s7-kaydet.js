// SAHNE 7 — Kaydet, Sıra sende (hücre modeli performans görevi), sonraki film, bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const ITEMS = [
    'Canlılar hücrelerden oluşur.',
    'Hücreyi mikroskopla gözlemleriz.',
    'Temel kısımlar: zar, sitoplazma, çekirdek.',
    'Yalnızca bitkide: hücre duvarı, kloroplast.',
    'Koful bitkide büyük, hayvanda küçük.'
  ];
  function record(ctx, t) {
    const sr = E.s('record'), st = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    const la = 1 - E.se(t, st - 0.2, st + 0.6);
    if (la > 0) E.layer(ctx, la, c => {
      P.write(c, 'Gözlem Defteri · Hücre', 290, 170, E.seg(t, sr + 0.2, sr + 1.3), { size: 64 });
      if (t > sr + 1.3) P.drawOn(c, P.bez([286, 192], [620, 204], [950, 188], 30), E.se(t, sr + 1.3, sr + 1.8), { w: 3, color: PAL.light });
      ITEMS.forEach((txt, i) => {
        const at = sr + 1.3 + i * 1.1, y = 300 + i * 100;
        const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
        if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(c, 324, y - 22, 46, E.se(t, at + 0.8, at + 1.2), { w: 6 });
        P.write(c, txt, 385, y, E.seg(t, at, at + 1.1), { size: 46 });
      });
      const k = E.se(t, sr + 2, sr + 3);
      c.save(); c.globalAlpha = k; F09.plantCell(c, 1440, 330, 250, 180, {}); F09.animalCell(c, 1440, 610, 230, 180, {}); c.restore();
    });
    // task card
    const tk = E.se(t, st, st + 0.8, 'out');
    if (tk > 0) E.layer(ctx, tk, c => {
      P.write(c, 'Sıra sende!', 960, 330, E.seg(t, st + 0.4, st + 1.4), { size: 84, align: 'center', color: '#8A4A10' });
      P.write(c, 'Arkadaşlarınla bir hücre modeli tasarla.', 960, 430, E.seg(t, st + 1.2, st + 2.6), { size: 52, align: 'center' });
      const M = [['oyun hamuru', 560], ['boncuk, düğme', 960], ['atık malzeme', 1360]];
      M.forEach(([m, x], i) => {
        const k = E.se(t, st + 2.8 + i * 0.6, st + 3.4 + i * 0.6, 'out'); if (k <= 0) return;
        const b = INK.wobble(circlePts(x, 590, 150 * P.pop(k), 58 * P.pop(k), 40), 2, 300 + i); P.fillPts(c, b, '#F6E7B8', 0.9); stroke(c, b, { w: 2.6, closed: true, seed: 310 + i });
        INK.label(c, m, x, 604, { size: 40, weight: 700, align: 'center', alpha: k });
      });
      P.write(c, 'Hangi parçayı hangi malzemeyle gösterirdin?', 960, 760, E.seg(t, st + 5, st + 6.4), { size: 44, align: 'center', weight: 400 });
    });
    DAMLA.draw(ctx, { x: 1830, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > st ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5, prop: t > st ? null : 'notebook', arms: t > st ? [[-1, 0.4], [1, 2.3 + 0.2 * Math.sin(t * 5)]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
  }
  function next(ctx, t) {
    const sn = E.s('next');
    const hill = P.hillLine(E.W);
    P.landscape(ctx, E.W, E.H, t, { hill });
    const dx = 820, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view: 'q3', expr: 'happy', look: [0.6, -0.5], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, E.e('next') + 1, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Hücreden Organizmaya', 960, 285, t, sn + 1.1, E.e('next') + 1, { size: 76, align: 'center' });
    // growing chain of circles: cell → ...
    for (let i = 0; i < 5; i++) {
      const k = E.se(t, sn + 1.8 + i * 0.5, sn + 2.3 + i * 0.5, 'out'); if (k <= 0) continue;
      const x = 1180 + i * 130 + i * i * 6, y = 520, r = (14 + i * 12) * P.pop(k);
      const c = circlePts(x, y, r, r, 30); P.fillPts(ctx, c, '#DCE4BE'); INK.wash(ctx, c, PAL.life, 0.5, 400 + i, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 2.4, closed: true, seed: 410 + i });
      if (i) P.arrow(ctx, [x - 130 - i * 4 + (14 + (i - 1) * 12) + 8, y], [x - r - 8, y], k, { w: 2.4, head: 10 });
    }
    F09.endCard(ctx, t, 9, 'Canlıların Yapı Taşı: Hücre', 'FB.5.3.1');
  }
  E.scene({ name: 'Kaydet', concept: 'Kaydetme ve performans görevi', from: 'record', to: 'task', trFrom: [960, 540], draw: record });
  E.scene({ name: 'Sıradaki', concept: 'Hücreden organizmaya', from: 'next', to: 'end', trFrom: [820, 700], draw: next });
})();

// SAHNE 7 — Gözlem defterine kaydetme (FB.6.1.1 ç etiketleme özeti · FB.6.1.2 model süreci)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G61;
  const ITEMS = [
    ['İç gezegenler: Merkür, Venüs, Dünya, Mars', 'küçük · karasal · halkasız'],
    ['Dış gezegenler: Jüpiter, Satürn, Uranüs, Neptün', 'büyük · gazsal · halkalı'],
    ['Mars ile Jüpiter arasında: asteroit kuşağı', ''],
    ['gök taşı → meteor → meteorit → meteor çukuru', ''],
    ['Modelimi önerdim, yeni kanıtla yeniledim.', '']
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1620, 740);
      P.write(ctx, 'Gözlem Defteri · Güneş Sistemi', 290, 260, E.seg(t, sr + 0.3, sr + 1.5), { size: 60 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 282], [700, 294], [1130, 278], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
      let y = 360;
      ITEMS.forEach(([a, b], i) => {
        const at = sr + 1.8 + i * 1.7;
        const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
        if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(ctx, 322, y - 20, 40, E.se(t, at + 1.0, at + 1.4), { w: 5 });
        P.write(ctx, a, 375, y, E.seg(t, at, at + 1.2), { size: 44 });
        if (b) { P.write(ctx, '→ ' + b, 420, y + 50, E.seg(t, at + 0.8, at + 1.6), { size: 38, weight: 400, color: '#8A4A10' }); }
        y += b ? 140 : 95;
      });
      DAMLA.draw(ctx, { x: 1700, y: 1060, s: 1.05, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

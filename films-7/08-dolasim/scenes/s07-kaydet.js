// SAHNE 7 — Gözlem verilerini kaydetme: yapı / görevi
(function () {
  const { PAL } = INK; const K = KIT, F = F08;
  const ROWS = [['kalp', 'kasılıp gevşeyerek kanı pompalar'], ['atardamar', 'kanı kalpten vücuda götürür'], ['toplardamar', 'kanı vücuttan kalbe getirir'], ['kılcal damar', 'hücrelerle madde alışverişi'],
    ['plazma', 'su, besin ve atık taşır'], ['alyuvar', 'oksijen taşır'], ['akyuvar', 'mikroplara karşı savunur'], ['kan pulcuğu', 'pıhtılaşmayı sağlar']];
  E.scene({
    name: 'Kaydet', concept: 'Gözlem verilerini kaydetme', from: 'record', to: 'record', trFrom: [800, 500],
    draw(ctx, t) {
      const s = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1370, 730);
      P.write(ctx, 'Yapı', 240, 255, E.seg(t, s + 0.2, s + 0.8), { size: 46, color: K.LIFE_D });
      P.write(ctx, 'Görevi', 640, 255, E.seg(t, s + 0.5, s + 1.1), { size: 46, color: K.LIFE_D });
      if (t > s + 1) P.drawOn(ctx, P.bez([230, 280], [800, 290], [1460, 278], 30), E.se(t, s + 1, s + 1.6), { w: 3, color: PAL.light });
      ROWS.forEach((r, i) => { const y = 340 + i * 68, at = s + 1.2 + i * 0.95;
        P.write(ctx, r[0], 240, y, E.seg(t, at, at + 0.5), { size: 38, color: i < 4 ? '#8E3A30' : PAL.ink });
        P.write(ctx, r[1], 640, y, E.seg(t, at + 0.35, at + 1.0), { size: 38 }); });
      const cheer = t > s + 9;
      K.damla(ctx, t, { x: 1690, y: 900, s: 1.15, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

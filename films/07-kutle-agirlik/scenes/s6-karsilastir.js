// SAHNE 6 — Benzerlikler ve farklılıklar listesi (FB.5.2.3 b, c; KB2.7 karşılaştırma)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  E.scene({
    name: 'Karşılaştırma', concept: 'Kütle ve ağırlığın benzerlik ve farklılıkları', from: 'same', to: 'diff', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('same'), sd = E.s('diff');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 840);
      const aD = E.se(t, sd - 0.3, sd + 0.5);
      // similarities
      E.layer(ctx, 1 - 0.85 * aD, c => {
        const up = aD;
        P.write(c, 'Benzerlikler', 290, 185, E.seg(t, ss + 0.4, ss + 1.4), { size: 56, color: PAL.life });
        const S = ['İkisi de ölçülebilir ve bir birimi vardır.', 'Aynı yerde kütle artınca ağırlık da artar.', 'Maddesi olan her cismin ikisi de vardır.'];
        S.forEach((s, i) => { const at = ss + 2.4 + i * 2.4; const y = 265 + i * 62; if (t > at - 0.2) { stroke(c, [[296, y - 36], [334, y - 38], [336, y], [298, y + 2], [296, y - 36]], { w: 2.2, closed: true, seed: 4600 + i }); P.check(c, 316, y - 18, 36, E.se(t, at + 0.8, at + 1.2), { w: 4.4 }); } P.write(c, s, 360, y, E.seg(t, at, at + 1.2), { size: 42 }); });
      });
      if (aD > 0) E.layer(ctx, aD, c => {
        P.write(c, 'Farklılıklar', 290, 480, E.seg(t, sd + 0.3, sd + 1.2), { size: 56, color: BR });
        const rows = [['', 'KÜTLE', 'AĞIRLIK'], ['tanım', 'madde miktarı', 'yer çekimi kuvveti'], ['birim', 'kg, g', 'Newton (N)'], ['ölçme aracı', 'eşit kollu terazi', 'dinamometre'], ['yere göre', 'değişmez', 'değişir']];
        F07.table(c, 290, 505, [300, 520, 560], rows, 68, i => E.seg(t, sd + 1.2 + i * 2.0, sd + 2.2 + i * 2.0), { size: 40, colColor: [null, PAL.water, BR] });
      });
      DAMLA.draw(ctx, { x: 1700, y: 1050, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 2, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

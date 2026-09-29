// SAHNE 4 — Örüntü oluşturma ve genelleme (FB.5.2.4 a, b: tümevarımsal akıl yürütme; OB7 anlam çözümleme)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  const COLS = [['KATI', 480, ['halıda kayan kutu', 'buzda kayan ayakkabı'], 'sürtünme'], ['SIVI', 960, ['havuzda yürümek', 'suda yüzen balık'], 'su direnci'], ['GAZ', 1440, ['bisiklet sürmek', 'paraşütle inmek'], 'hava direnci']];
  E.scene({
    name: 'Örüntü', concept: 'Örüntüden genellemeye', from: 'pattern', to: 'general2', trFrom: [960, 450],
    draw(ctx, t) {
      const sp = E.s('pattern'), sg = E.s('general'), s2 = E.s('general2');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      COLS.forEach(([head, x, ex, fr], ci) => {
        const hk = E.seg(t, sp + 0.3 + ci * 0.5, sp + 1.1 + ci * 0.5);
        P.write(ctx, head, x, 170, hk, { size: 50, align: 'center', color: [PAL.ink, PAL.water, '#6F8A9A'][ci] });
        ex.forEach((e, j) => {
          const at = sp + 0.8 + ci * 1.1 + j * 0.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const y0 = 205 + j * 140;
          ctx.save(); ctx.globalAlpha = k;
          F08.card(ctx, x - 200, y0, x + 200, y0 + 120, { seed: 5700 + ci * 2 + j });
          F08.txt(ctx, e, x, y0 + 46, { size: 34, align: 'center' });
          P.arrow(ctx, [x + 20, y0 + 88], [x + 150, y0 + 88], 1, { w: 3, head: 12 });
          P.arrow(ctx, [x - 20, y0 + 88], [x - 150, y0 + 88], 1, { w: 4, head: 14, color: BR });
          ctx.restore();
          const hl = E.se(t, sp + 4.6 + (ci * 2 + j) * 0.3, sp + 5.0 + (ci * 2 + j) * 0.3);
          if (hl > 0) stroke(ctx, INK.wobble(circlePts(x - 85, y0 + 88, 90, 22, 30), 2, 5710 + ci * 2 + j), { w: 3, closed: true, color: PAL.light, alpha: hl });
        });
        F08.txt(ctx, fr, x, 505, { size: 34, align: 'center', color: BR, alpha: E.se(t, sp + 6.0, sp + 6.6) });
      });
      E.inkText(ctx, 'Örüntü: her örnekte ortam harekete karşı koyuyor.', 960, 570, t, sp + 6.8, 1e9, { size: 44, align: 'center' });
      const gk = E.se(t, sg, sg + 0.6, 'out');
      if (gk > 0) {
        ctx.save(); ctx.globalAlpha = gk;
        const b = [[280, 610], [1640, 606], [1644, 890], [284, 894], [280, 610]]; P.fillPts(ctx, b, '#F6E7B8', 0.9); stroke(ctx, b, { w: 3, closed: true, seed: 5720 });
        ctx.restore();
        P.write(ctx, 'Genelleme', 320, 662, E.seg(t, sg + 0.3, sg + 1.1), { size: 48, color: BR });
        const L = [['• Sürtünme katı, sıvı ve gaz ortamlarda vardır.', sg + 1.2], ['• Harekete zıt yönde etki eder.', sg + 3.4], ['• Yüzey pürüzlüleştikçe sürtünme artar.', s2 + 0.3], ['• Su ve hava direnci de birer sürtünmedir.', s2 + 3.0]];
        L.forEach(([s, at], i) => P.write(ctx, s, 330, 712 + i * 47, E.seg(t, at, at + 1.6), { size: 36 }));
      }
    }
  });
})();

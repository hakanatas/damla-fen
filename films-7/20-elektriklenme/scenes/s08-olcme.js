// SAHNE 8 — Ölçme ve veri analizi (FB.7.6.2 b): değişkenler, üç tekrar, ortalama, sütun grafiği. Veriler örnek (temsilî) veridir.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  const ROWS = [['5', '3', '4', '2', '3'], ['10', '6', '5', '7', '6'], ['20', '10', '9', '11', '10']];
  const AVG = [3, 6, 10];
  E.scene({
    name: 'Ölçme', concept: 'Değişkenler; veri analizi', from: 'measure', to: 'data', trFrom: [600, 300],
    draw(ctx, t) {
      const sm = E.s('measure'), sv = E.s('variables'), sd = E.s('data');
      // tablo
      const cols = [['sürtme sayısı', 230], ['1. deneme', 170], ['2. deneme', 170], ['3. deneme', 170], ['ortalama', 170]];
      const kr = ROWS.map((r, i) => E.se(t, sd + 0.3 + i * 0.9, sd + 0.9 + i * 0.9));
      F.fit(ctx, 'Çekilen kâğıt parçası sayısı', 575, 200, 900, 44, { color: F.AMB });
      F.table(ctx, 120, 230, cols, ROWS, 74, E.se(t, sm + 1.0, sm + 2.4), kr, { size: 34, cellCol: (i, j) => j === 4 ? F.AMB : null });
      // değişken kartları
      const V = [['değiştirdiğim', 'sürtme sayısı', F.AMB], ['ölçtüğüm', 'çekilen kâğıt sayısı', F.NEG], ['sabit tuttuğum', 'balon · kâğıt boyutu · uzaklık', PAL.ink]];
      V.forEach(([h, v, col], i) => {
        const at = sv + 0.5 + i * 1.4, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k;
        F.card(ctx, 120, 570 + i * 105, 910, 88, 800 + i);
        F.fit(ctx, h + ':', 140, 628 + i * 105, 260, 34, { align: 'left', weight: 400 });
        F.fit(ctx, v, 420, 628 + i * 105, 590, 40, { align: 'left', color: col });
        ctx.restore();
      });
      // sağ: deney düzeneği küçük çizimi → grafik
      const gk = E.se(t, sd + 2.6, sd + 3.4);
      E.layer(ctx, 1 - gk, c => {
        F.balloon(c, 1450, 420, 80, F.HEAT, { strLen: 60 });
        stroke(c, [[1250, 760], [1650, 758]], { w: 3.4, seed: 811 });
        for (let i = 0; i < 10; i++) F.bit(c, 1300 + (i % 5) * 70, 745 - Math.floor(i / 5) * 12, 1, i);
        P.arrow(c, [1600, 560], [1600, 740], 1, { w: 2.2, bend: 0, head: 10 }); P.arrow(c, [1600, 740], [1600, 560], 1, { w: 2.2, bend: 0, head: 10 });
        F.fit(c, 'hep aynı uzaklık', 1600, 820, 360, 34);
        F.damla(c, t, { x: 1760, y: 880, s: 0.9, view: 'q3', flip: true, expr: 'thinking', look: [-0.8, -0.3] });
      });
      if (gk > 0) E.layer(ctx, gk, c => {
        const x0 = 1200, y0 = 800, H = 480, W = 560, max = 12;
        stroke(c, [[x0, y0 - H - 20], [x0, y0], [x0 + W, y0]], { w: 3, seed: 821 });
        for (let v = 0; v <= max; v += 4) { const y = y0 - v / max * H; line(c, [x0 - 10, y], [x0, y], { w: 2, dry: false }); F.fit(c, String(v), x0 - 20, y + 10, 50, 28, { align: 'right', weight: 400 }); }
        AVG.forEach((a, i) => {
          const k = E.se(t, sd + 3.4 + i * 0.6, sd + 4.2 + i * 0.6, 'out');
          const bx = x0 + 60 + i * 170, h = a / max * H * k;
          if (h > 1) F.shape(c, [[bx, y0], [bx + 110, y0], [bx + 110, y0 - h], [bx, y0 - h]], F.AMB, 0.6, 830 + i);
          F.fit(c, ROWS[i][0] + ' kez', bx + 55, y0 + 40, 150, 32);
          if (k > 0.9) F.fit(c, String(a), bx + 55, y0 - h - 12, 80, 34, { color: F.AMB });
        });
        F.fit(c, 'ortalama kâğıt sayısı', x0 + W / 2, y0 - H - 40, 500, 34);
        P.arrow(c, [x0 + 70, y0 - 150], [x0 + 545, y0 - 370], E.se(t, sd + 5.6, sd + 6.6), { w: 3, color: F.GREEN, bend: 10 });
        F.fit(c, 'örnek veri', x0 + W - 10, y0 + 80, 200, 26, { align: 'right', weight: 400, alpha: 0.7 });
      });
    }
  });
})();

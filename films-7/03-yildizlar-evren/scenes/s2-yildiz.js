// SAHNE 2 — Yıldızların genel özellikleri: renk–sıcaklık, büyüklük (ayrıntıya girmeden), ışık yılı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  E.scene({
    name: 'Yıldız', concept: 'Renk, sıcaklık, ışık yılı', from: 'star', to: 'ly', trFrom: [960, 450],
    draw(ctx, t) {
      const ss = E.s('star'), sc = E.s('color'), sl = E.s('ly');
      F.night(ctx, 1);
      F.stars(ctx, t, 0.8, { n: 70, seed: 92, area: [0, 150, E.W, 900] });
      const a1 = 1 - E.se(t, sc - 0.3, sc + 0.4);
      if (a1 > 0) E.layer(ctx, a1, c => {
        F.star(c, 960, 480, 60, '#FFE6A8', t);
        INK.label(c, 'ısı ve ışık yayar', 960, 760, { size: 46, weight: 700, color: '#FBF3DC', align: 'center', alpha: E.se(t, ss + 1.5, ss + 2.3) });
        INK.label(c, 'dev gaz kütlesi', 960, 820, { size: 40, color: '#FBF3DC', align: 'center', alpha: E.se(t, ss + 2.5, ss + 3.3) });
      });
      const a2 = E.se(t, sc - 0.2, sc + 0.5) * (1 - E.se(t, sl - 0.3, sl + 0.4));
      if (a2 > 0) E.layer(ctx, a2, c => {
        [['#9DB8FF', 'mavi', 36, 420], ['#FFF1B0', 'sarı', 26, 960], ['#FF9A6A', 'kırmızı', 44, 1500]].forEach(([col, n, r, x], i) => {
          const k = E.se(t, sc + 0.3 + i * 0.8, sc + 0.9 + i * 0.8); if (k <= 0) return;
          c.save(); c.globalAlpha = k; F.star(c, x, 430, r, col, t); c.restore();
          INK.label(c, n, x, 620, { size: 44, weight: 700, color: '#FBF3DC', align: 'center', alpha: k });
        });
        const k = E.se(t, sc + 2.8, sc + 4);
        c.save(); c.globalAlpha = k; P.arrow(c, [1500, 700], [420, 700], k, { w: 4, color: PAL.light, head: 16 }); c.restore();
        INK.label(c, 'daha sıcak', 420, 770, { size: 38, weight: 700, color: '#FBF3DC', align: 'center', alpha: k });
        INK.label(c, 'daha soğuk', 1500, 770, { size: 38, weight: 700, color: '#FBF3DC', align: 'center', alpha: k });
        INK.label(c, 'yüzey sıcaklığı', 960, 670, { size: 34, color: '#FBF3DC', align: 'center', alpha: k });
        INK.label(c, 'büyüklükleri de farklı', 960, 860, { size: 36, color: '#FBF3DC', align: 'center', alpha: E.se(t, sc + 4.5, sc + 5.2) });
      });
      const a3 = E.se(t, sl - 0.2, sl + 0.5);
      if (a3 > 0) E.layer(ctx, a3, c => {
        P.earth(c, 260, 520, 70);
        F.star(c, 1680, 520, 24, '#FFE6A8', t);
        const k = E.se(t, sl + 1, sl + 5);
        c.save(); c.globalAlpha = 0.8; P.drawOn(c, [[1640, 520], [E.lerp(1640, 350, k), 520]], 1, { w: 4, color: PAL.light, dry: false }); c.restore();
        if (k > 0 && k < 1) F.star(c, E.lerp(1640, 350, k), 520, 6, '#FFF1C8', 0, { spikes: false });
        INK.dashed(c, (() => { const p = []; for (let x = 350; x <= 1640; x += 4) p.push([x, 620]); return p; })(), { w: 2, color: '#FBF3DC', on: 10, off: 8 });
        INK.label(c, 'ışığın 1 yılda aldığı yol = 1 ışık yılı', 995, 680, { size: 44, weight: 700, color: '#FBF3DC', align: 'center', alpha: E.se(t, sl + 2.5, sl + 3.3) });
        INK.label(c, '≈ 9,5 trilyon km', 995, 760, { size: 56, weight: 700, color: '#F6D58A', align: 'center', alpha: E.se(t, sl + 5, sl + 5.8) });
        INK.label(c, 'ışık yılı bir uzaklık birimidir, zaman değil!', 995, 850, { size: 36, color: '#FBF3DC', align: 'center', alpha: E.se(t, sl + 6.5, sl + 7.3) });
        INK.label(c, '(çizim ölçekli değildir)', 1880, 300, { size: 26, color: '#FBF3DC', align: 'right', alpha: 0.7 });
      });
    }
  });
})();

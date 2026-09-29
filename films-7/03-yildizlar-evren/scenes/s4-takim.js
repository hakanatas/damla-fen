// SAHNE 4 — Takımyıldızlar: Büyükayı, Küçükayı, Kraliçe, Avcı (FB.7.1.4 uygulama metni)
(function () {
  const { PAL, line, stroke } = INK;
  const F = U7;
  // yaklaşık biçimler (şematik)
  const BA = { pts: [[140, 470], [215, 450], [285, 455], [350, 480], [335, 545], [428, 557], [470, 490]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]] };
  const POL = [620, 250];
  const KA = { pts: [POL, [680, 290], [735, 320], [790, 360], [850, 380], [870, 440], [805, 425]], lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]] };
  const KR = { pts: [[920, 230], [985, 300], [1040, 250], [1100, 310], [1160, 240]], lines: [[0, 1], [1, 2], [2, 3], [3, 4]] };
  const AV = { pts: [[1440, 330, '#FF9A6A', 9], [1640, 350, '#FFFFFF', 6], [1520, 520, '#FFFFFF', 5], [1555, 510, '#FFFFFF', 5], [1590, 500, '#FFFFFF', 5], [1470, 700, '#FFFFFF', 5], [1670, 690, '#AFC8FF', 9]], lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6]] };
  function draw(c, C, k, t) {
    C.lines.forEach(([a, b], i) => { const kk = E.clamp(k * 1.6 - i * 0.08); if (kk > 0) P.drawOn(c, [C.pts[a], [E.lerp(C.pts[a][0], C.pts[b][0], kk), E.lerp(C.pts[a][1], C.pts[b][1], kk)]], 1, { w: 2, color: '#F6D58A', dry: false, alpha: 0.8 }); });
    C.pts.forEach(p => F.star(c, p[0], p[1], p[3] ?? 6, p[2] ?? '#FFF6DE', t));
  }
  E.scene({
    name: 'Takımyıldızlar', concept: 'Takımyıldız', from: 'const', to: 'const', trFrom: [620, 250],
    draw(ctx, t) {
      const sc = E.s('const');
      F.night(ctx, 1.2);
      F.stars(ctx, t, 0.7, { n: 90, seed: 94, area: [0, 150, E.W, 900] });
      const k = (a) => E.se(t, sc + a, sc + a + 1.4);
      draw(ctx, BA, k(1.5), t); INK.label(ctx, 'Büyükayı', 300, 640, { size: 42, weight: 700, color: '#FBF3DC', align: 'center', alpha: k(2) });
      draw(ctx, KA, k(3.2), t); INK.label(ctx, 'Küçükayı', 800, 500, { size: 42, weight: 700, color: '#FBF3DC', align: 'center', alpha: k(3.7) });
      INK.label(ctx, 'Kutup Yıldızı', 620, 210, { size: 32, color: '#F6D58A', align: 'center', alpha: k(4.2) });
      const pk = k(4.6); if (pk > 0) { ctx.save(); ctx.globalAlpha = 0.6 * pk; INK.dashed(ctx, (() => { const p = []; for (let i = 0; i <= 60; i++) p.push([E.lerp(470, 600, i / 60), E.lerp(490, 265, i / 60)]); return p; })(), { w: 2, color: '#FBF3DC', on: 6, off: 6 }); ctx.restore(); }
      draw(ctx, KR, k(5.2), t); INK.label(ctx, 'Kraliçe', 1040, 380, { size: 42, weight: 700, color: '#FBF3DC', align: 'center', alpha: k(5.7) });
      draw(ctx, AV, k(6.8), t); INK.label(ctx, 'Avcı', 1560, 790, { size: 42, weight: 700, color: '#FBF3DC', align: 'center', alpha: k(7.3) });
      INK.label(ctx, 'kırmızımsı', 1440, 290, { size: 28, color: '#FFB38A', align: 'center', alpha: k(8.2) });
      INK.label(ctx, 'mavimsi beyaz', 1720, 750, { size: 28, color: '#AFC8FF', align: 'center', alpha: k(8.2) });
      INK.label(ctx, 'çizgiler hayalîdir · (şematik)', 60, 900, { size: 30, color: '#FBF3DC', alpha: 0.75 * k(2.5) });
      DAMLA.draw(ctx, { x: 960, y: 905, s: 0.8, view: 'back', expr: 'curious', look: [0, -1], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.35], [1, 2.3]] });
    }
  });
})();

// SAHNE 7 — Yorumla ve değerlendir: "Ay'ın karanlık yüzü" kavram yanılgısı
(function () {
  const { PAL, line, stroke, circlePts, dashed, leader } = INK;
  const RED = '#A23A2A', AMB = '#C07F1E';
  E.scene({
    name: 'Yorumla', concept: 'Arka yüz karanlık değildir (kavram yanılgısı)', from: 'darkside', to: 'darkside', trFrom: [960, 540],
    draw(ctx, t) {
      const s = E.s('darkside');
      ctx.save(); ctx.fillStyle = 'rgba(30,38,72,0.10)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // yanlış ifade
      const kq = E.se(t, s + 0.2, s + 0.9, 'out');
      if (kq > 0) { ctx.save(); ctx.globalAlpha = kq; INK.label(ctx, '“Ay’ın karanlık yüzü”', 960, 250, { size: 64, weight: 700, align: 'center' }); ctx.restore(); }
      P.cross(ctx, 960, 228, 70, E.se(t, s + 1.0, s + 1.6), { w: 12, color: RED });
      if (t > s + 1.5) INK.label(ctx, 'YANLIŞ', 1330, 262, { size: 48, weight: 700, color: RED, alpha: E.se(t, s + 1.5, s + 2.0), rot: -0.08 });
      // diyagram
      const kd = E.se(t, s + 2.0, s + 2.8);
      if (kd > 0) E.layer(ctx, kd, c => {
        const my = 590;
        P.sun(c, -110, my, 250, t, { nrays: 18, cells: false });
        INK.label(c, 'Güneş', 40, my + 300, { size: 38, weight: 700 });
        for (let i = -1; i <= 1; i++) P.arrow(c, [200, my + i * 60], [880, my + i * 40], E.se(t, s + 2.4, s + 3.6), { w: 3.4, color: AMB, bend: 0, head: 14 });
        F02.halfLit(c, 990, my, 100, Math.PI, { alpha: 0.75 });
        P.earth(c, 1600, my, 80);
        INK.label(c, 'Dünya', 1600, my + 130, { size: 38, weight: 700, align: 'center' });
        INK.label(c, 'Ay', 990, my + 150, { size: 38, weight: 700, align: 'center' });
        c.save(); c.globalAlpha = 0.6; dashed(c, [[1085, my], [1515, my]], { w: 2.4, on: 12, off: 9 }); c.restore();
        const k1 = E.se(t, s + 3.6, s + 4.4);
        if (k1 > 0) { c.save(); c.globalAlpha = k1; leader(c, [640, 420], [920, my - 40], { w: 2.2, bend: -0.2 }); c.restore(); P.write(c, 'arka yüz: aydınlık!', 420, 400, k1, { size: 46, color: '#8A4A10' }); }
        const k2 = E.se(t, s + 5.6, s + 6.4);
        if (k2 > 0) { c.save(); c.globalAlpha = k2; leader(c, [1230, 790], [1060, my + 50], { w: 2.2, bend: 0.2 }); c.restore(); P.write(c, 'Dünya’ya dönük yüz', 1200, 820, k2, { size: 42 }); }
        INK.label(c, '(çizim ölçekli değildir)', 1560, 900, { size: 28, alpha: 0.6 });
      });
    }
  });
})();

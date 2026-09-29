// SAHNE 2 — Güvenlik: Güneş tutulmasına çıplak gözle / uygun olmayan araçla bakılmaz
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G62, RED = '#A23A2A';

  function eclipseGlasses(ctx, x, y, s) { // karton çerçeve + koyu filtre
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fr = [[-150, -50], [150, -50], [150, 50], [30, 50], [0, 20], [-30, 50], [-150, 50], [-150, -50]];
    P.fillPts(ctx, fr, '#E9C46A', 1); stroke(ctx, fr, { w: 3, closed: true, seed: 21 });
    [-80, 80].forEach((dx, i) => { const l = circlePts(dx, -2, 46, 32, 30); P.fillPts(ctx, l, '#1C1B22', 0.92); stroke(ctx, l, { w: 2.4, closed: true, seed: 22 + i }); });
    line(ctx, [-150, -40], [-230, -60], { w: 4 }); line(ctx, [150, -40], [230, -60], { w: 4 });
    ctx.restore();
  }
  function sunglasses(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [-60, 60].forEach((dx, i) => { const l = circlePts(dx, 0, 48, 38, 30); P.fillPts(ctx, l, '#4A4A58', 0.7); stroke(ctx, l, { w: 4, closed: true, seed: 30 + i }); });
    line(ctx, [-14, -6], [14, -6], { w: 4 }); line(ctx, [-108, -6], [-150, -20], { w: 4 }); line(ctx, [108, -6], [150, -20], { w: 4 });
    ctx.restore();
  }

  E.scene({
    name: 'Güvenlik', concept: 'Güneş tutulmasını güvenli izleme', from: 'safety', to: 'glasses', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('safety'), sg = E.s('glasses');
      ctx.fillStyle = 'rgba(162,58,42,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      // çıplak göz ✗
      const a1 = 1 - E.se(t, sg - 0.3, sg + 0.5);
      if (a1 > 0) E.layer(ctx, a1, c => {
        P.sun(c, 1280, 470, 120, t, { nrays: 20, cells: false });
        P.fillPts(c, circlePts(1320, 462, 118, 118, 50), '#2A2A36', 0.9);
        P.icon.eye(c, 640, 480, 1.7, E.se(t, ss + 1.0, ss + 1.8));
        P.arrow(c, [820, 470], [1110, 470], E.se(t, ss + 0.4, ss + 1.0), { w: 4, head: 16 });
        E.inkText(c, 'Çıplak gözle ASLA bakma!', 960, 780, t, ss + 1.4, 1e9, { size: 64, align: 'center', color: RED });
      });
      if (a1 < 1) E.layer(ctx, 1 - a1, c => {
        F.card(c, 200, 170, 1520, 700, { seed: 40, color: RED });
        INK.label(c, '⚠ Güvenli izleme', 260, 250, { size: 52, weight: 700, color: RED });
        eclipseGlasses(c, 560, 450, 1.15);
        P.check(c, 560, 600, 70, E.se(t, sg + 1.0, sg + 1.6), { w: 9, color: PAL.life });
        P.write(c, 'onaylı tutulma gözlüğü', 560, 720, E.seg(t, sg + 1.2, sg + 2.4), { size: 44, align: 'center' });
        P.write(c, '+ bir yetişkin eşliğinde', 560, 790, E.seg(t, sg + 2.4, sg + 3.6), { size: 44, align: 'center', color: '#8A4A10' });
        // yasak araçlar
        const xs = [1080, 1330, 1560];
        sunglasses(c, xs[0], 450, 0.95); P.icon.binoculars(c, xs[1], 450, 0.95); P.icon.telescope(c, xs[2], 450, 0.8);
        ['güneş gözlüğü', 'dürbün', 'teleskop'].forEach((n, i) => { INK.label(c, n, xs[i], 580, { size: 36, weight: 700, align: 'center' });
          P.cross(c, xs[i], 450, 70, E.se(t, sg + 5.0 + i * 0.6, sg + 5.6 + i * 0.6), { w: 10, color: RED }); });
        P.write(c, 'Bunlarla asla bakma!', 1320, 700, E.seg(t, sg + 6.8, sg + 8.0), { size: 46, align: 'center', color: RED });
      });
    }
  });
})();

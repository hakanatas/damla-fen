// SAHNE 3 — Güneş tutulması: Güneş – Ay – Dünya aynı hizada, Yeni Ay, gölge dar bir bölgeye düşer (FB.6.1.3 a)
// TYMM tutulma türlerini (tam/parçalı/halkalı) adlandırmaz → film de adlandırmaz.
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G62;
  const S = [150, 520], RS = 190, EA = [1560, 520], RE = 120, MR = 30;

  function diagram(ctx, t) {
    const ss = E.s('solar'), sn = E.s('newmoon'), sw = E.s('narrow');
    const ma = Math.PI + 0.45 * (1 - E.se(t, ss + 0.3, ss + 3.0)), mx = EA[0] + Math.cos(ma) * 450, my = EA[1] + Math.sin(ma) * 450;
    const aligned = E.se(t, ss + 2.8, ss + 3.6);
    P.sun(ctx, S[0], S[1], RS, t, { nrays: 24, cells: false });
    // ışık ışınları
    ctx.save(); ctx.globalAlpha = 0.5;
    [-150, -80, 80, 150].forEach((dy, i) => line(ctx, [S[0] + RS + 30, S[1] + dy * 0.9], [EA[0] - RE - 10, EA[1] + dy * 0.75], { w: 2.4, color: '#C07F1E', dry: false, seed: 10 + i }));
    ctx.restore();
    // Ay'ın Dünya çevresindeki yörüngesi (bir kısmı)
    ctx.save(); ctx.globalAlpha = 0.45; dashed(ctx, P.arc(EA[0], EA[1], 450, Math.PI - 0.8, Math.PI + 0.8, 60), { w: 1.6, on: 8, off: 8 }); ctx.restore();
    // gölge konisi
    if (aligned > 0) {
      const pen = [[mx, my - MR], [EA[0] - RE + 8, EA[1] - 70], [EA[0] - RE + 8, EA[1] + 70], [mx, my + MR]];
      const umb = [[mx, my - MR], [EA[0] - RE + 2, EA[1] - 12], [EA[0] - RE + 2, EA[1] + 12], [mx, my + MR]];
      ctx.save(); ctx.globalAlpha = aligned; P.fillPts(ctx, pen, '#2A2A36', 0.16); P.fillPts(ctx, umb, '#2A2A36', 0.5); ctx.restore();
    }
    P.earth(ctx, EA[0], EA[1], RE);
    // Dünya'nın Güneş'e bakan yarısı aydınlık, diğer yarısı gece
    P.fillPts(ctx, P.arc(EA[0], EA[1], RE * 1.01, -Math.PI / 2, Math.PI / 2, 30), '#262A40', 0.55);
    if (aligned > 0) { ctx.save(); ctx.globalAlpha = aligned; P.fillPts(ctx, circlePts(EA[0] - RE + 8, EA[1], 10, 22, 20), '#1C1B22', 0.75); ctx.restore(); }
    // Ay: Güneş'e bakan yüzü aydınlık, Dünya'ya bakan yüzü karanlık (Yeni Ay)
    P.moon(ctx, mx, my, MR);
    P.fillPts(ctx, P.arc(mx, my, MR * 1.02, -Math.PI / 2, Math.PI / 2, 20), '#262A40', 0.75);
    INK.label(ctx, 'Güneş', S[0] + 20, S[1] + RS + 90, { size: 44, weight: 700, align: 'center' });
    INK.label(ctx, 'Ay', mx, my - MR - 24, { size: 44, weight: 700, align: 'center' });
    INK.label(ctx, 'Dünya', EA[0], EA[1] + RE + 60, { size: 44, weight: 700, align: 'center' });
    // sıralama
    E.inkText(ctx, 'Güneş  →  Ay  →  Dünya', 760, 225, t, ss + 3.4, 1e9, { size: 58, align: 'center', color: '#8A4A10' });
    E.inkText(ctx, 'aynı hizada', 760, 285, t, ss + 4.2, 1e9, { size: 38, align: 'center' });
    // Yeni Ay notu
    const nk = E.se(t, sn + 0.4, sn + 1.2);
    if (nk > 0) { ctx.save(); ctx.globalAlpha = nk; INK.leader(ctx, [1000, 700], [mx + 6, my + MR + 6], { bend: -0.2 }); ctx.restore();
      P.write(ctx, 'Yeni Ay', 900, 740, E.seg(t, sn + 0.8, sn + 1.8), { size: 48, color: '#8A4A10' });
      INK.label(ctx, 'Ay’ın Dünya’ya bakan yüzü karanlık', 900, 790, { size: 32, alpha: 0.75 * nk }); }
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, ss + 2, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
  }

  function view(ctx, t) { // gölgenin düştüğü yerden görünüş (şematik)
    const sn = E.s('newmoon'); const k = E.se(t, sn + 3.2, sn + 4.0, 'out'); if (k <= 0) return;
    const cx = 1570, cy = 235, r = 105 * P.pop(k);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
    const dark = E.se(t, sn + 4.0, sn + 6.0);
    ctx.fillStyle = `rgb(${E.lerp(170, 40, dark) | 0},${E.lerp(200, 48, dark) | 0},${E.lerp(222, 80, dark) | 0})`; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r);
    P.sun(ctx, cx, cy - 10, 44, t, { nrays: 14, cells: false, glow: false });
    P.fillPts(ctx, circlePts(E.lerp(cx + 60, cx + 3, dark), cy - 10, 44, 44, 30), '#1C1B22', 0.95);
    ctx.restore();
    stroke(ctx, circlePts(cx, cy, r, r, 60), { w: 5, closed: true });
    INK.label(ctx, 'gündüz ortalık kararır', cx - 130, cy + 70, { size: 34, weight: 700, align: 'right', alpha: k });
  }

  function zoom(ctx, t) { // dar bölge
    const sw = E.s('narrow');
    const cx = 960, cy = 560, R = 300;
    P.fillPts(ctx, circlePts(cx, cy, R * 1.25, R * 1.25, 60), '#262A40', 0.08);
    P.earth(ctx, cx, cy, R);
    const k = E.se(t, sw + 0.8, sw + 2.0);
    const sx = cx - 70 + 140 * E.se(t, sw + 2.0, sw + 7.0);   // gölge Dünya üzerinde kayar
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
    ctx.globalAlpha = k * 0.35; P.fillPts(ctx, circlePts(sx, cy - 30, 110, 90, 40), '#1C1B22', 1);
    ctx.globalAlpha = k * 0.8; P.fillPts(ctx, circlePts(sx, cy - 30, 26, 20, 30), '#1C1B22', 1);
    ctx.restore();
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; INK.leader(ctx, [1400, 330], [sx + 20, cy - 36], { bend: 0.2 }); ctx.restore(); }
    P.write(ctx, 'Ay’ın gölgesi', 1410, 320, E.seg(t, sw + 1.4, sw + 2.4), { size: 48, color: '#8A4A10' });
    P.write(ctx, 'yalnızca bu bölgeden görülür', 1410, 375, E.seg(t, sw + 2.6, sw + 4.0), { size: 36 });
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, sw + 1, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
  }

  E.scene({
    name: 'Güneş tutulması', concept: 'Güneş tutulmasının nitelikleri', from: 'solar', to: 'narrow', trFrom: [960, 520],
    draw(ctx, t) {
      const a = E.se(t, E.s('narrow') - 0.3, E.s('narrow') + 0.6);
      if (a < 1) E.layer(ctx, 1 - a, c => { diagram(c, t); view(c, t); });
      if (a > 0) E.layer(ctx, a, c => zoom(c, t));
    }
  });
})();

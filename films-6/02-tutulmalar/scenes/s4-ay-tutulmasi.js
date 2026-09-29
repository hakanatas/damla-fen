// SAHNE 4 — Ay tutulması: Güneş – Dünya – Ay aynı hizada, Dolunay, gece yarısında her yerden görülür (FB.6.1.3 a)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G62;
  const S = [150, 520], RS = 190, EA = [860, 520], RE = 120, MR = 34, OR = 480;

  function diagram(ctx, t) {
    const sl = E.s('lunar'), sf = E.s('fullmoon');
    const ma = -0.42 * (1 - E.se(t, sl + 0.3, sl + 3.2)), mx = EA[0] + Math.cos(ma) * OR, my = EA[1] + Math.sin(ma) * OR;
    const inShadow = E.se(t, sl + 2.8, sl + 3.8);
    P.sun(ctx, S[0], S[1], RS, t, { nrays: 24, cells: false });
    ctx.save(); ctx.globalAlpha = 0.5;
    [-150, -80, 80, 150].forEach((dy, i) => line(ctx, [S[0] + RS + 30, S[1] + dy * 0.9], [EA[0] - RE - 10, EA[1] + dy * 0.75], { w: 2.4, color: '#C07F1E', dry: false, seed: 10 + i }));
    ctx.restore();
    // Dünya'nın gölgesi (sağa doğru daralan koni)
    const pen = [[EA[0], EA[1] - RE], [1900, EA[1] - 170], [1900, EA[1] + 170], [EA[0], EA[1] + RE]];
    const umb = [[EA[0], EA[1] - RE], [1900, EA[1] - 50], [1900, EA[1] + 50], [EA[0], EA[1] + RE]];
    P.fillPts(ctx, pen, '#2A2A36', 0.1); P.fillPts(ctx, umb, '#2A2A36', 0.32);
    INK.label(ctx, 'Dünya’nın gölgesi', 1560, 470, { size: 34, weight: 700, align: 'center', alpha: 0.7, rot: 0 });
    ctx.save(); ctx.globalAlpha = 0.45; dashed(ctx, P.arc(EA[0], EA[1], OR, -0.75, 0.75, 60), { w: 1.6, on: 8, off: 8 }); ctx.restore();
    P.earth(ctx, EA[0], EA[1], RE);
    P.fillPts(ctx, P.arc(EA[0], EA[1], RE * 1.01, -Math.PI / 2, Math.PI / 2, 30), '#262A40', 0.55);
    // Ay: Güneş'e bakan yüzü aydınlık → Dünya'dan bakınca tamamı aydınlık (Dolunay); gölgede kararır, kızılımsı
    P.moon(ctx, mx, my, MR);
    P.fillPts(ctx, P.arc(mx, my, MR * 1.02, -Math.PI / 2, Math.PI / 2, 20), '#262A40', 0.6);
    if (inShadow > 0) { ctx.save(); ctx.globalAlpha = inShadow; P.fillPts(ctx, circlePts(mx, my, MR * 1.03, MR * 1.03, 30), '#7A3524', 0.75); ctx.restore(); }
    INK.label(ctx, 'Güneş', S[0] + 20, S[1] + RS + 90, { size: 44, weight: 700, align: 'center' });
    INK.label(ctx, 'Dünya', EA[0], EA[1] + RE + 60, { size: 44, weight: 700, align: 'center' });
    INK.label(ctx, 'Ay', mx, my - MR - 22, { size: 44, weight: 700, align: 'center' });
    E.inkText(ctx, 'Güneş  →  Dünya  →  Ay', 760, 225, t, sl + 3.4, 1e9, { size: 58, align: 'center', color: '#8A4A10' });
    E.inkText(ctx, 'aynı hizada', 760, 285, t, sl + 4.2, 1e9, { size: 38, align: 'center' });
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, sl + 2, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
    // Dolunay → kararma (Dünya'dan görünüş)
    const k = E.se(t, sf + 0.3, sf + 1.1, 'out');
    if (k > 0) {
      const cx = 1180, cy = 745, r = 90 * P.pop(k), d = E.se(t, sf + 1.6, sf + 4.6);
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.fillStyle = '#23294A'; ctx.fillRect(cx - r, cy - r, 2 * r, 2 * r); ctx.restore();
      F.stars(ctx, t, k, { n: 8, seed: 3, area: [cx - r * 0.8, cy - r * 0.8, cx + r * 0.8, cy + r * 0.8] });
      P.moon(ctx, cx, cy, 52 * Math.min(1, P.pop(k)));
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, 53, 0, 7); ctx.clip(); ctx.globalAlpha = d;
      P.fillPts(ctx, circlePts(cx, cy, 54, 54, 30), '#7A3524', 0.8); ctx.restore();
      stroke(ctx, circlePts(cx, cy, r, r, 50), { w: 4, closed: true });
      P.write(ctx, 'Dolunay', 1300, 725, E.seg(t, sf + 0.8, sf + 1.8), { size: 48, color: '#8A4A10' });
      P.write(ctx, '→ kararır, kızılımsı görünür', 1300, 780, E.seg(t, sf + 2.4, sf + 4.0), { size: 36 });
    }
  }

  function wide(ctx, t) {
    const sw = E.s('wide');
    const cx = 960, cy = 540, R = 260;
    F.night(ctx, 0.8);
    F.stars(ctx, t, 1, { n: 50, seed: 9, area: [0, 150, E.W, 880], avoid: [[cx, cy, 330], [1580, 420, 120]] });
    // Güneş solda (ekran dışı): Dünya'nın sağ yarısı gece
    P.earth(ctx, cx, cy, R);
    const nk = E.se(t, sw + 0.6, sw + 1.6);
    P.fillPts(ctx, P.arc(cx, cy, R * 1.01, -Math.PI / 2, Math.PI / 2, 40), '#262A40', 0.6);
    if (nk > 0) { ctx.save(); ctx.globalAlpha = nk; stroke(ctx, P.arc(cx, cy, R + 14, -Math.PI / 2, Math.PI / 2, 40), { w: 6, color: PAL.light }); ctx.restore(); }
    P.moon(ctx, 1580, 420, 60); P.fillPts(ctx, circlePts(1580, 420, 61, 61, 30), '#7A3524', 0.7);
    INK.label(ctx, 'Ay', 1580, 530, { size: 40, weight: 700, align: 'center', color: '#FBF3DC' });
    for (let i = 0; i < 3; i++) { const a = -0.9 + i * 0.9, p = [cx + Math.cos(a) * (R + 30), cy + Math.sin(a) * (R + 30)]; const k = E.se(t, sw + 1.4 + i * 0.4, sw + 2.2 + i * 0.4); if (k > 0) { ctx.save(); ctx.globalAlpha = k * 0.8; P.arrow(ctx, p, E.mix(p, [1510, 430], 0.55), k, { w: 3, color: '#FBF3DC', head: 12 }); ctx.restore(); } }
    P.write(ctx, 'Ay’ı gören her yerden izlenir', 960, 215, E.seg(t, sw + 1.8, sw + 3.2), { size: 54, align: 'center', color: '#FBF3DC' });
    const sk = E.se(t, sw + 4.2, sw + 5.0);
    if (sk > 0) { ctx.save(); ctx.globalAlpha = sk; F.card(ctx, 180, 700, 560, 110, { seed: 60 }); ctx.restore();
      P.check(ctx, 240, 752, 50, E.se(t, sw + 4.6, sw + 5.2), { w: 7, color: PAL.life });
      INK.label(ctx, 'çıplak gözle güvenli', 300, 775, { size: 44, weight: 700, alpha: sk }); }
    E.inkText(ctx, 'gece', cx + 110, cy + 10, t, sw + 1.2, 1e9, { size: 44, color: '#FBF3DC' });
    E.inkText(ctx, 'gündüz', cx - 220, cy + 10, t, sw + 1.2, 1e9, { size: 44 });
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, sw + 1, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.75, color: '#FBF3DC' });
  }

  E.scene({
    name: 'Ay tutulması', concept: 'Ay tutulmasının nitelikleri', from: 'lunar', to: 'wide', trFrom: [860, 520],
    draw(ctx, t) {
      const a = E.se(t, E.s('wide') - 0.3, E.s('wide') + 0.6);
      if (a < 1) E.layer(ctx, 1 - a, c => diagram(c, t));
      if (a > 0) E.layer(ctx, a, c => wide(c, t));
    }
  });
})();

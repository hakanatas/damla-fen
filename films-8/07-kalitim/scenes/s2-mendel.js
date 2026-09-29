// SAHNE 2 — Mendel ve bezelye: bezelyenin avantajları · karakter örnekleri (tohum rengi, tohum şekli, çiçek rengi, bitki boyu)
(function () {
  const { PAL, stroke, line } = INK; const K = KIT, F = G8;
  const WHY = ['kolay yetişir', 'kısa sürede çok tohum verir', 'kendi kendini tozlaşabilir', 'özellikleri belirgindir'];
  const TR = [['Tohum rengi', 'sarı', 'yeşil'], ['Tohum şekli', 'düzgün', 'buruşuk'], ['Çiçek rengi', 'mor', 'beyaz'], ['Bitki boyu', 'uzun', 'kısa']];
  function trait(c, i, x, y) {
    K.card(c, x - 185, y - 230, 370, 460, { seed: 3200 + i, tint: PAL.life, tintA: 0.06 });
    K.text(c, TR[i][0], x, y - 170, { size: 42, align: 'center' });
    const a = x - 80, b = x + 80, yy = y + 10;
    if (i === 0) { F.pea(c, a, yy, 42, 'Y', { seed: 1 }); F.pea(c, b, yy, 42, 'G', { seed: 2 }); }
    if (i === 1) { F.pea(c, a, yy, 42, 'Y', { seed: 3 }); F.pea(c, b, yy, 42, 'Y', { seed: 4, wr: true }); }
    if (i === 2) { F.flower(c, a, yy, 1.3, true); F.flower(c, b, yy, 1.3, false); }
    if (i === 3) { F.plant(c, a, yy + 110, 230, 1); F.plant(c, b, yy + 110, 90, 2); }
    K.text(c, TR[i][1], a, y + 180, { size: 36, align: 'center', color: K.LIFE_D }); K.text(c, TR[i][2], b, y + 180, { size: 36, align: 'center', color: '#8A4A10' });
    line(c, [x, y - 120], [x, y + 200], { w: 1.4, alpha: 0.3, dry: false });
  }
  E.scene({
    name: 'Mendel ve bezelye', concept: 'Bezelyenin avantajları; karakter', from: 'mendel', to: 'traits', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('mendel'), sw = E.s('why'), st = E.s('traits');
      ctx.fillStyle = 'rgba(111,138,58,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      const gk = Math.min(E.se(t, sm + 0.2, sm + 1.0), 1 - E.se(t, st - 0.2, st + 0.6));
      if (gk > 0) E.layer(ctx, gk, c => {
        // bahçe
        const soil = [[150, 760], [860, 752], [870, 800], [140, 806], [150, 760]]; INK.wash(c, soil, '#8A6A45', 0.35, 3300, { bleed: 2, blooms: 0 });
        for (let i = 0; i < 5; i++) F.plant(c, 220 + i * 140, 765, 200 + (i % 2) * 90, i);
        F.pod(c, 500, 848, 200, ['Y', 'Y', 'G', 'Y', 'Y']);
        K.text(c, 'Gregor Mendel', 500, 260, { size: 60, align: 'center', fam: 'Fraunces', weight: 600 });
        K.text(c, '1800’ler · bezelye deneyleri', 500, 318, { size: 38, align: 'center', alpha: 0.75 });
        const wk = E.se(t, sw + 0.2, sw + 1.0);
        if (wk > 0) E.layer(c, wk, c2 => {
          K.card(c2, 980, 200, 760, 560, { seed: 3310 });
          K.text(c2, 'Neden bezelye?', 1360, 280, { size: 50, align: 'center' });
          WHY.forEach((w, i) => { const k = E.se(t, sw + 1.2 + i * 1.3, sw + 1.8 + i * 1.3); if (k <= 0) return; c2.save(); c2.globalAlpha *= k; P.check(c2, 1050, 370 + i * 95, 40, 1, { color: K.LIFE_D, w: 5 }); K.text(c2, w, 1100, 390 + i * 95, { size: 42, maxW: 600 }); c2.restore(); });
        });
      });
      const tk = E.se(t, st + 0.2, st + 1.0);
      if (tk > 0) E.layer(ctx, tk, c => {
        TR.forEach((_, i) => { const k = E.se(t, st + 0.3 + i * 0.9, st + 1.0 + i * 0.9, 'out'); if (k > 0) E.layer(c, k, c2 => trait(c2, i, 300 + i * 440, 500)); });
        const kk = E.se(t, st + 5, st + 5.8);
        if (kk > 0) { c.save(); c.globalAlpha *= kk; K.text(c, 'Her biri bir karakter', 960, 820, { size: 52, align: 'center', color: K.LIFE_D }); c.restore(); }
      });
    }
  });
})();

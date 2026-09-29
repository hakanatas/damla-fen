// SAHNE 4 — Yapay uyduları görevlerine göre sınıflandırma, günlük hayat, yerli uydular, TUA ve TÜBİTAK UZAY (D19.4)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  const EX = 560, EY = 540;
  const TYPES = [
    { n: 'haberleşme', a: -2.3, o: {} },
    { n: 'gözlem', a: -0.75, o: { cam: true, dish: false } },
    { n: 'hava tahmini', a: 0.7, o: { cam: true } },
    { n: 'yer-yön bulma', a: 2.35, o: { dish: false } }
  ];
  function cloud(c, x, y, s, col = PAL.white) {
    const pts = []; [[-40, 0, 26], [-10, -18, 32], [26, -6, 26], [0, 8, 30]].forEach(([dx, dy, r]) => pts.push(circlePts(x + dx * s, y + dy * s, r * s, r * s, 24)));
    pts.forEach(p => P.fillPts(c, p, col, 1)); pts.forEach((p, i) => stroke(c, p, { w: 2, closed: true, dry: false, seed: 60 + i, alpha: 0.6 }));
  }
  function daily(c, t, i, x, y) {
    F.card(c, x - 150, y - 110, 300, 220, { seed: 70 + i });
    if (i === 0) { const ph = [[x - 40, y - 80], [x + 40, y - 80], [x + 40, y + 40], [x - 40, y + 40], [x - 40, y - 80]]; P.fillPts(c, ph, '#DCE6DD', 1); stroke(c, ph, { w: 2.6, closed: true, seed: 81 });
      stroke(c, [[x - 30, y + 20], [x - 5, y - 10], [x + 10, y], [x + 30, y - 50]], { w: 3, color: PAL.water, dry: false }); P.fillPts(c, circlePts(x + 30, y - 58, 9, 9, 14), PAL.light, 1); }
    if (i === 1) { P.sun(c, x + 30, y - 40, 30, t, { nrays: 10, cells: false }); cloud(c, x - 10, y + 0, 1); }
    if (i === 2) { const tv = [[x - 70, y - 60], [x + 70, y - 60], [x + 70, y + 30], [x - 70, y + 30], [x - 70, y - 60]]; P.fillPts(c, tv, '#DDE7EE', 1); stroke(c, tv, { w: 2.8, closed: true, seed: 83 }); line(c, [x - 20, y - 60], [x - 45, y - 95], { w: 2 }); line(c, [x + 20, y - 60], [x + 45, y - 95], { w: 2 }); }
    INK.label(c, ['harita, konum', 'hava durumu', 'TV yayını, iletişim'][i], x, y + 85, { size: 32, weight: 700, align: 'center' });
  }
  E.scene({
    name: 'Uydular', concept: 'Uydu çeşitleri ve yerli uydular', from: 'sats', to: 'tua', trFrom: [600, 560],
    draw(ctx, t) {
      const ss = E.s('sats'), sd = E.s('daily'), st = E.s('tr'), su = E.s('tua');
      F.night(ctx, 0.35);
      F.stars(ctx, t, 0.8, { n: 60, seed: 74, area: [0, 150, E.W, 900], color: '#FFFFFF' });
      const ak = 1 - E.se(t, st - 0.3, st + 0.5);
      if (ak > 0) E.layer(ctx, ak, c => {
        const ok = E.se(t, ss + 0.2, ss + 1.2);
        const orb = circlePts(EX, EY, 400, 190, 200, -0.12);
        P.drawOn(c, orb, ok, { w: 2, alpha: 0.6, color: '#FBF3DC' });
        P.earth(c, EX, EY, 150);
        TYPES.forEach((ty, i) => {
          const k = E.se(t, ss + 1.4 + i * 1.3, ss + 2.0 + i * 1.3, 'out'); if (k <= 0) return;
          const a = ty.a + (t - ss) * 0.04, x = EX + Math.cos(a) * 400 * Math.cos(-0.12) - Math.sin(a) * 190 * Math.sin(-0.12), y = EY + Math.cos(a) * 400 * Math.sin(-0.12) + Math.sin(a) * 190 * Math.cos(-0.12);
          F.satellite(c, x, y, 0.32 * P.pop(k), t, ty.o);
          const lx = x, ly = y + (y > EY ? 85 : -55);
          c.save(); c.globalAlpha = k; c.font = '700 36px Kalam'; const w = c.measureText(ty.n).width; const x0 = Math.max(30, lx - w / 2);
          P.fillPts(c, [[x0 - 14, ly - 38], [x0 + w + 14, ly - 40], [x0 + w + 12, ly + 12], [x0 - 12, ly + 14]], '#FAF6EC', 0.95); stroke(c, [[x0 - 14, ly - 38], [x0 + w + 14, ly - 40], [x0 + w + 12, ly + 12], [x0 - 12, ly + 14], [x0 - 14, ly - 38]], { w: 2, closed: true, seed: 90 + i, dry: false });
          c.restore();
          INK.label(c, ty.n, x0, ly, { size: 36, weight: 700, alpha: k });
        });
        [[1290, 420], [1640, 420], [1465, 720]].forEach(([x, y], i) => { const k = E.se(t, sd + 0.4 + i * 1.3, sd + 1.0 + i * 1.3, 'out'); if (k > 0) E.layer(c, k, cc => daily(cc, t, i, x, y)); });
        INK.label(c, '(çizim ölçekli değildir)', 1880, 890, { size: 26, align: 'right', alpha: 0.6, color: '#FBF3DC' });
      });
      // yerli uydular
      const bk = E.se(t, st + 0.1, st + 0.9);
      if (bk > 0) E.layer(ctx, bk, c => {
        [[560, 'TÜRKSAT 6A', 'haberleşme uydusu', {}], [1360, 'İMECE', 'gözlem uydusu', { cam: true, dish: false }]].forEach(([x, n, f, o], i) => {
          const k = E.se(t, st + 0.4 + i * 3.0, st + 1.0 + i * 3.0, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k;
          F.card(c, x - 330, 190, 660, 420, { seed: 100 + i });
          F.satellite(c, x, 340, 0.8, t, { ...o, rot: Math.sin(t * 0.6 + i) * 0.05 });
          INK.label(c, n, x, 500, { size: 56, weight: 700, align: 'center' });
          INK.label(c, f + ' · yerli', x, 560, { size: 38, align: 'center', color: F.AMBER_D });
          c.restore();
        });
        [[560, 'TÜBİTAK UZAY'], [1360, 'Türkiye Uzay Ajansı (TUA)']].forEach(([x, n], i) => {
          const k = E.se(t, su + 0.4 + i * 1.4, su + 1.0 + i * 1.4, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k; F.card(c, x - 310, 700, 620, 120, { seed: 110 + i, fill: '#F6E7B8' }); c.restore();
          INK.label(c, n, x, 778, { size: 44, weight: 700, align: 'center', alpha: k });
        });
        const lk = E.se(t, su + 3.2, su + 4.2);
        if (lk > 0) INK.label(c, 'uzay çalışmalarını yürüten kurumlarımız', 960, 880, { size: 34, align: 'center', alpha: lk * 0.8 });
      });
    }
  });
})();

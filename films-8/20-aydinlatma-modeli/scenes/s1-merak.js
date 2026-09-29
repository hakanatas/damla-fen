// SAHNE 1 — Merak: geçmişten günümüze aydınlatma araçları, tahmin, gelecek araştırması  (+ ortak yardımcılar: window.F20M)
(function () {
  const { PAL, stroke, line, circlePts, wash, inkDot } = INK;
  const U = U6;
  const M = window.F20M = {};
  // alev (x,y: tabanı)
  M.flame = (ctx, x, y, s, t, seed = 0) => {
    const f = 1 + 0.08 * Math.sin(t * 9 + seed) + 0.05 * Math.sin(t * 23 + seed * 2);
    const g = ctx.createRadialGradient(x, y - 30 * s, 0, x, y - 30 * s, 90 * s); g.addColorStop(0, 'rgba(240,190,90,0.45)'); g.addColorStop(1, 'rgba(227,160,58,0)');
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 30 * s, 90 * s, 0, 7); ctx.fill(); ctx.restore();
    const pts = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; const r = 1 - Math.sin(a / 2) * 0; pts.push([x + Math.sin(a) * 16 * s * (a < Math.PI ? Math.sin(a / 2) : Math.sin(a / 2)), y - (1 - Math.cos(a)) * 30 * s * f]); }
    P.fillPts(ctx, pts, PAL.light, 0.9); P.fillPts(ctx, pts.map(p => [x + (p[0] - x) * 0.5, y - (y - p[1]) * 0.55]), '#FBE7B8', 0.95);
    stroke(ctx, pts, { w: 2.2 * s, closed: true, dry: false, color: '#C07F1E', seed: 2001 + seed });
  };
  M.torch = (ctx, x, y, t) => { line(ctx, [x + 10, y + 80], [x - 6, y - 40], { w: 12, color: '#8A6A45', taper: 0.05 }); const w = CK.rect(x - 22, y - 60, 40, 26); P.fillPts(ctx, w, '#6B4E2E'); stroke(ctx, w, { w: 2.4, closed: true, dry: false }); M.flame(ctx, x - 2, y - 58, 1.4, t, 1); };
  M.oil = (ctx, x, y, t) => { const b = P.bez([x - 70, y + 30], [x, y + 90], [x + 60, y + 20], 20).concat([[x + 80, y + 8], [x + 40, y + 20], [x - 70, y + 30]]); P.fillPts(ctx, b, '#C7865A'); wash(ctx, b, '#8A4A10', 0.35, 2010, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 2011 }); M.flame(ctx, x + 72, y + 8, 0.9, t, 2); };
  M.candle = (ctx, x, y, t) => { const c = CK.rect(x - 22, y - 30, 44, 110); P.fillPts(ctx, c, PAL.white); stroke(ctx, c, { w: 3, closed: true, seed: 2012 }); line(ctx, [x, y - 30], [x, y - 42], { w: 2.4, dry: false }); M.flame(ctx, x, y - 40, 1, t, 3); };
  M.gas = (ctx, x, y, t) => { const base = [[x - 50, y + 80], [x + 50, y + 80], [x + 36, y + 30], [x - 36, y + 30]]; P.fillPts(ctx, base, '#8C877E'); stroke(ctx, base.concat([base[0]]), { w: 3, closed: true, seed: 2013 });
    const gl = P.bez([x - 20, y + 30], [x - 70, y - 20], [x - 18, y - 80], 20).concat([[x + 18, y - 80]]).concat(P.bez([x + 18, y - 80], [x + 70, y - 20], [x + 20, y + 30], 20)); P.fillPts(ctx, gl, PAL.white, 0.6); M.flame(ctx, x, y + 14, 0.8, t, 4); stroke(ctx, gl, { w: 2.8, closed: true, seed: 2014 }); };
  M.fluo = (ctx, x, y, t) => { const tube = CK.rect(x - 90, y - 16, 180, 32); const g = ctx.createRadialGradient(x, y, 10, x, y, 130); g.addColorStop(0, 'rgba(220,235,240,0.7)'); g.addColorStop(1, 'rgba(220,235,240,0)'); ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - 140, y - 130, 280, 260); ctx.restore(); P.fillPts(ctx, tube, '#EEF4F2'); stroke(ctx, CK.densify(CK.densify(tube)), { w: 3, closed: true, seed: 2015 }); [x - 98, x + 90].forEach(ex => P.fillPts(ctx, CK.rect(ex, y - 12, 8, 24), '#8C877E')); };
  M.led = (ctx, x, y, t) => { const g = ctx.createRadialGradient(x, y - 20, 4, x, y - 20, 90); g.addColorStop(0, 'rgba(255,250,235,0.9)'); g.addColorStop(1, 'rgba(255,250,235,0)'); ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y - 20, 90, 0, 7); ctx.fill(); ctx.restore();
    const dome = P.arc(x, y - 20, 26, Math.PI, Math.PI * 2, 20).concat([[x + 26, y + 10], [x - 26, y + 10]]); P.fillPts(ctx, dome, '#F4F0E4'); stroke(ctx, dome, { w: 3, closed: true, seed: 2016 }); P.fillPts(ctx, CK.rect(x - 32, y + 10, 64, 10), '#D8D0BF'); line(ctx, [x - 10, y + 20], [x - 10, y + 70], { w: 3, dry: false }); line(ctx, [x + 10, y + 20], [x + 10, y + 60], { w: 3, dry: false }); };
  M.bulbOn = (ctx, x, y, t) => { CK.bulb(ctx, x, y + 70, 0.9, 1, t, { rays: false }); };
  M.ITEMS = [['meşale', M.torch], ['yağ kandili', M.oil], ['mum', M.candle], ['gaz lambası', M.gas], ['akkor ampul', M.bulbOn], ['floresan', M.fluo], ['LED', M.led]];
  // açık kitap
  M.book = (ctx, x, y, s, light = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const L = [[0, 0], [-120, -20], [-124, 50], [0, 64]], R = [[0, 0], [120, -20], [124, 50], [0, 64]];
    [L, R].forEach((pg, i) => { P.fillPts(ctx, pg, PAL.white); if (light > 0) P.fillPts(ctx, pg, PAL.light, 0.35 * light); stroke(ctx, pg.concat([pg[0]]), { w: 2.6, closed: true, seed: 2020 + i }); for (let j = 0; j < 4; j++) line(ctx, [(i ? 18 : -104), 8 + j * 11 - (i ? 0 : 3)], [(i ? 104 : -18), 4 + j * 11 + (i ? -3 : 0)], { w: 1.4, dry: false, alpha: 0.5 }); });
    ctx.restore();
  };

  E.scene({
    name: 'Merak', concept: 'Geçmişten günümüze aydınlatma araçları', from: 'title', to: 'future',
    draw(ctx, t) {
      const sp = E.s('past'), st = E.s('trend'), sf = E.s('future');
      const n = M.ITEMS.length, xs = M.ITEMS.map((_, i) => 150 + i * 235), y = 560;
      // zaman oku
      const ak = E.se(t, sp, sp + 1.5);
      if (ak > 0) { P.arrow(ctx, [90, 760], [1840, 760], ak, { w: 3.4, head: 18 }); U.txt(ctx, 'geçmiş', 110, 810, { size: 36, alpha: ak }); U.txt(ctx, 'günümüz', 1580, 810, { size: 36, alpha: ak, align: 'right' }); }
      const elec = E.se(t, sp + 5.6, sp + 6.4);
      if (elec > 0) { ctx.save(); ctx.globalAlpha = elec; P.drawOn(ctx, [[1030, 400], [1650, 400]], elec, { w: 3, color: PAL.light }); U.txt(ctx, 'elektrikle çalışanlar', 1340, 385, { size: 34, align: 'center', color: U.AMBER }); ctx.restore(); }
      M.ITEMS.forEach(([nm, fn], i) => {
        const at = sp + 0.6 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { fn(c, xs[i], y, t); U.txt(c, nm, xs[i], 720, { size: 34, align: 'center' }); });
      });
      // gelecek?
      const fk = E.se(t, sf + 0.3, sf + 1);
      if (fk > 0) E.layer(ctx, fk, c => {
        const x = 1800; const box = CK.rect(x - 90, 450, 170, 220);
        INK.dashed(c, CK.densify(CK.densify(CK.densify(CK.densify(box)))), { w: 2.6, on: 10, off: 8 });
        U.txt(c, '?', x - 5, 590, { size: 110, align: 'center', color: PAL.water });
        U.txt(c, 'gelecek', x - 5, 720, { size: 34, align: 'center', color: PAL.water });
      });
      // tahmin: eğilimler
      const TR = [['daha güvenli', PAL.life], ['daha az enerji', PAL.light], ['daha uzun ömürlü', PAL.water]];
      TR.forEach(([s, col], i) => { const at = st + 1 + i * 1.3; E.inkText(ctx, '↗ ' + s, 330 + i * 560, 870, t, at, sf + 0.3, { size: 42, align: 'center', color: i === 1 ? U.AMBER : col }); });
      if (t > sf + 0.3) { const k = E.se(t, sf + 1.2, sf + 2); if (k > 0) { ctx.save(); ctx.globalAlpha = k; P.icon.books(ctx, 640, 855, 0.5); P.icon.laptop(ctx, 800, 850, 0.55, t); U.txt(ctx, 'güvenilir kaynaklar', 900, 868, { size: 34 }); ctx.restore(); } }
      E.layer(ctx, E.se(t, 6.5, 7.3), c => U.damla(c, t, { x: 960, y: 420, s: 0.8, view: 'front', expr: t > st ? 'thinking' : 'curious', look: [0, 0.6], arms: [[-1, 0.35], [1, 0.4]], shadow: false }));
      U.title(ctx, t, '20 · Aydınlatma Aracı Tasarlıyorum');
    }
  });
})();

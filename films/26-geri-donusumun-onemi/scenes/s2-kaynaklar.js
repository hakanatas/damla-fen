// SAHNE 2 — Kaynaklar (FB.5.7.2 a): doğal kaynak → ürün; sınırlı kaynak; kaynakların etkili kullanımı
(function () {
  const { PAL, line, stroke, circlePts, rng, wash } = INK;
  const COLS = [420, 800, 1180, 1560], RY = 390, PY = 700;
  function sand(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const m = P.arc(0, 50, 100, Math.PI, 2 * Math.PI, 30, 80).concat([[-100, 50]]);
    P.fillPts(ctx, m, '#EBD9A6'); wash(ctx, m, '#C9A45A', 0.5, 810, { bleed: 2 }); stroke(ctx, m, { w: 3, closed: true, seed: 811 });
    const R = rng(812); ctx.fillStyle = '#8A6A45'; for (let i = 0; i < 60; i++) { const a = Math.PI + R() * Math.PI, d = Math.sqrt(R()) * 0.9; ctx.globalAlpha = 0.5; ctx.fillRect(Math.cos(a) * d * 100, 50 + Math.sin(a) * d * 80, 2, 2); }
    ctx.restore();
  }
  function ore(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const r = [[-90, 50], [-70, -10], [-20, -40], [40, -30], [90, 10], [80, 50], [-90, 50]];
    P.fillPts(ctx, r, '#B9B2A4'); wash(ctx, r, '#6B6358', 0.5, 820, { bleed: 2 }); stroke(ctx, r, { w: 3, closed: true, seed: 821 });
    [[-40, 5], [10, -10], [40, 25], [-10, 30]].forEach(([dx, dy], i) => { const v = INK.wobble(circlePts(dx, dy, 12, 8, 8), 2, 822 + i); P.fillPts(ctx, v, i % 2 ? '#C07F1E' : '#8E8E8E', 0.85); stroke(ctx, v, { w: 1.6, closed: true, dry: false }); });
    ctx.restore();
  }
  function barrel(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-50, -60], [50, -60], [54, 60], [-54, 60], [-50, -60]];
    P.fillPts(ctx, b, '#4A4A52'); wash(ctx, b, '#2E2D33', 0.6, 830); stroke(ctx, b, { w: 3, closed: true, seed: 831 });
    [-25, 25].forEach(dy => line(ctx, [-52, dy], [52, dy], { w: 2.4, color: '#8E8E8E', dry: false }));
    const d = P.bez([0, -30], [-20, 0], [0, 12], 10).concat(P.bez([0, 12], [20, 0], [0, -30], 10)); P.fillPts(ctx, d, '#C8962E', 0.95);
    ctx.restore();
  }
  function hourglass(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-40, -70], [40, -70], { w: 6 }); line(ctx, [-40, 70], [40, 70], { w: 6 });
    const g = [[-32, -66], [32, -66], [4, 0], [32, 66], [-32, 66], [-4, 0], [-32, -66]]; P.fillPts(ctx, g, PAL.white, 0.9); stroke(ctx, g, { w: 3, closed: true, dry: false });
    const f = (t * 0.15) % 1; P.fillPts(ctx, [[-26 * (1 - f), -60 + 56 * f], [26 * (1 - f), -60 + 56 * f], [3, -4], [-3, -4]], '#E2C47A', 0.9);
    P.fillPts(ctx, [[-28, 62], [28, 62], [28 * f, 62 - 40 * f], [-28 * f, 62 - 40 * f]], '#E2C47A', 0.9);
    ctx.restore();
  }
  const RES = [
    { draw: (c, x, y, s, t) => W7.tree(c, x, y + 95, 0.85 * s, 5, t), name: 'ağaç', prod: 'gazete', pname: 'kâğıt' },
    { draw: (c, x, y, s) => sand(c, x, y + 10, s), name: 'kum', prod: 'camSise', pname: 'cam' },
    { draw: (c, x, y, s) => ore(c, x, y + 10, s), name: 'maden', prod: 'icecek', pname: 'metal' },
    { draw: (c, x, y, s) => barrel(c, x, y, s), name: 'petrol', prod: 'plastikSise', pname: 'plastik' }
  ];
  E.scene({
    name: 'Kaynaklar', concept: 'Doğal kaynaklar ve etkili kullanım', from: 'resource', to: 'efficient', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('resource'), sn = E.s('natural'), sc = E.s('chain'), sl = E.s('limited'), se = E.s('efficient');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      const diag = 1 - E.se(t, se - 0.2, se + 0.6);
      if (diag > 0) E.layer(ctx, diag, c => {
        P.write(c, 'Doğal kaynaklar', 1180, 190, E.seg(t, sr + 0.6, sr + 1.8), { size: 62, align: 'center' });
        if (t > sr + 1.8) P.drawOn(c, P.bez([950, 212], [1180, 222], [1410, 208], 30), E.se(t, sr + 1.8, sr + 2.3), { w: 3, color: PAL.life });
        RES.forEach((r, i) => {
          const at = sn + 0.3 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          r.draw(c, COLS[i], RY, P.pop(k), t);
          P.write(c, r.name, COLS[i], RY + 130, E.seg(t, at + 0.3, at + 1.1), { size: 46, align: 'center' });
          // ürün
          const pa = sc + 0.4 + i * 1.8, pk = E.se(t, pa, pa + 0.6, 'out');
          if (pk > 0) {
            P.arrow(c, [COLS[i], RY + 150], [COLS[i], PY - 90], E.se(t, pa, pa + 0.5), { w: 3, head: 13 });
            W7.item(c, r.prod, COLS[i], PY, 0.95 * P.pop(pk));
            P.write(c, r.pname, COLS[i], PY + 110, E.seg(t, pa + 0.4, pa + 1.2), { size: 46, align: 'center', color: '#3F7A3A' });
          }
          // sınırlı damgası
          const lk = E.se(t, sl + 0.4 + i * 0.3, sl + 0.8 + i * 0.3, 'out');
          if (lk > 0) {
            c.save(); c.translate(COLS[i] + 70, RY - 70); c.rotate(-0.18); c.scale(P.pop(lk), P.pop(lk));
            const st = W7.rr(-72, -26, 144, 50, 8); P.fillPts(c, st, PAL.white, 0.9); stroke(c, st, { w: 3, closed: true, color: '#C07F1E', dry: false });
            W7.fit(c, 'sınırlı', 0, 12, 130, 36, { color: '#8A5A12' }); c.restore();
          }
        });
        const hk = E.se(t, sl + 2.6, sl + 3.4, 'out');
        if (hk > 0) { hourglass(c, 1780, 560, 0.9 * P.pop(hk), t); P.write(c, 'yenilenmesi', 1780, 680, E.seg(t, sl + 3.2, sl + 4.0), { size: 34, align: 'center' }); P.write(c, 'uzun sürer', 1780, 720, E.seg(t, sl + 3.6, sl + 4.4), { size: 34, align: 'center' }); }
      });
      // etkili kullanım kartı
      const ek = E.se(t, se + 0.1, se + 0.8, 'out');
      if (ek > 0) E.layer(ctx, ek, c => {
        const card = [[380, 220], [1540, 210], [1550, 760], [390, 770], [380, 220]];
        c.save(); c.shadowColor = 'rgba(40,30,20,0.25)'; c.shadowBlur = 26; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
        P.write(c, 'Kaynakların etkili kullanımı', 960, 340, E.seg(t, se + 0.5, se + 1.7), { size: 66, align: 'center', color: '#3F7A3A' });
        P.drawOn(c, P.bez([560, 366], [960, 378], [1360, 360], 30), E.se(t, se + 1.7, se + 2.2), { w: 3, color: PAL.life });
        P.write(c, 'israf etmeden,', 960, 480, E.seg(t, se + 2.0, se + 3.0), { size: 54, align: 'center' });
        P.write(c, 'ihtiyacımız kadar kullanmak', 960, 560, E.seg(t, se + 3.0, se + 4.4), { size: 54, align: 'center' });
        W7.tree(c, 520, 720, 0.6, 7, t); W7.recycle(c, 1400, 650, 50, E.se(t, se + 4.4, se + 5.4), { w: 9 });
      });
      // Damla
      const pk = E.se(t, sr + 0.1, sr + 0.9, 'out');
      DAMLA.draw(ctx, { x: 150, y: 1075 + (1 - pk) * 300, s: 0.95, view: 'q3', expr: t > se + 4 ? 'happy' : 'curious', look: [0.8, -0.5], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 3, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]] });
    }
  });
})();

// props.js — 8. sınıf Film 2'ye özel çizim yardımcıları (window.F82)
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, wobble, arrowHead, dashed } = G.INK;
  const F = {};
  F.RED = '#A23A2A'; F.HEAT = '#B5553F'; F.AMBER = '#C07F1E'; F.BROWN = '#8A4A10';
  F.ICE = '#9CC3D8';

  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y + 3], [x + w - 2, y + h], [x + 3, y + h - 2], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.28)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC', o.a ?? 0.97); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed: o.seed ?? 7, color: o.color });
  };
  F.dense = (a, b, step = 4) => { const n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); const p = []; for (let i = 0; i <= n; i++) p.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return p; };
  F.fade = (ctx, k, fn) => { if (k <= 0) return; E.layer(ctx, k, fn); };
  F.lbl = (ctx, txt, x, y, a, o = {}) => { if (a <= 0) return; INK.label(ctx, txt, x, y, { size: 38, ...o, alpha: (o.alpha ?? 0.95) * a }); };

  // bulut (cx,cy merkez, s ölçek, dark 0..1)
  F.cloud = (ctx, cx, cy, s, seed = 1, o = {}) => {
    const pts = []; const bumps = [[-0.62, 0.1, 0.42], [-0.28, -0.25, 0.5], [0.12, -0.38, 0.55], [0.5, -0.12, 0.45], [0.72, 0.15, 0.32], [0.1, 0.15, 0.6], [-0.4, 0.2, 0.4]];
    ctx.save();
    const col = o.dark ? '#B9BCC4' : '#FBF8F1';
    bumps.forEach(([bx, by, br]) => P.fillPts(ctx, circlePts(cx + bx * 200 * s, cy + by * 120 * s, br * 150 * s, br * 120 * s, 28), col, 1));
    ctx.restore();
    for (let i = 0; i <= 80; i++) { // dış kontur: çemberlerin birleşiminin dış sınırını açı taramasıyla bul
      const a = i / 80 * 6.283; let best = 0;
      bumps.forEach(([bx, by, br]) => {
        const cx0 = bx * 200 * s, cy0 = by * 120 * s, rx = br * 150 * s, ry = br * 120 * s;
        // ışın–elips kesişimi (kaba): örnekle
        for (let d = best; d < 400 * s; d += 3 * s) { const px = Math.cos(a) * d - cx0, py = Math.sin(a) * d - cy0; if ((px * px) / (rx * rx) + (py * py) / (ry * ry) <= 1) best = d; }
      });
      pts.push([cx + Math.cos(a) * best, cy + Math.sin(a) * best]);
    }
    if (o.dark) wash(ctx, pts, '#6E7482', 0.3 * o.dark, seed, { bleed: 2, blooms: 1 });
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, seed: seed + 3, dry: false });
    return pts;
  };
  F.drop = (ctx, x, y, r, o = {}) => { // (x,y): alt dairenin merkezi; uç yukarıda
    const pts = [[x, y - 2.1 * r]]; const a0 = -Math.PI / 2 + Math.acos(1 / 2.1), a1 = 1.5 * Math.PI - Math.acos(1 / 2.1);
    for (let i = 0; i <= 20; i++) { const a = a0 + (a1 - a0) * i / 20; pts.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); }
    pts.push([x, y - 2.1 * r]);
    P.fillPts(ctx, pts, o.color ?? PAL.water, o.a ?? 0.75); stroke(ctx, pts, { w: Math.max(1, r * 0.14), closed: true, dry: false, seed: 11, alpha: 0.8 });
  };
  F.flake = (ctx, x, y, r, rot = 0, o = {}) => {
    for (let i = 0; i < 6; i++) { const a = rot + i * Math.PI / 3, ex = x + Math.cos(a) * r, ey = y + Math.sin(a) * r;
      line(ctx, [x, y], [ex, ey], { w: o.w ?? 2.2, color: o.color ?? PAL.water, dry: false, seed: 20 + i, taper: 0.1 });
      const mx = x + Math.cos(a) * r * 0.6, my = y + Math.sin(a) * r * 0.6;
      [-0.6, 0.6].forEach(d => line(ctx, [mx, my], [mx + Math.cos(a + d) * r * 0.32, my + Math.sin(a + d) * r * 0.32], { w: (o.w ?? 2.2) * 0.8, color: o.color ?? PAL.water, dry: false, seed: 30 + i }));
    }
  };
  F.hail = (ctx, x, y, r, layers = 3) => {
    P.fillPts(ctx, circlePts(x, y, r, r * 0.92, 24), '#EEF4F7', 1);
    for (let i = layers; i >= 1; i--) stroke(ctx, circlePts(x, y, r * i / layers, r * 0.92 * i / layers, 24), { w: Math.max(1, r * 0.06), closed: true, dry: false, color: i === layers ? PAL.ink : F.ICE, seed: 40 + i });
  };
  F.thermo = (ctx, x, y, h, lvl, o = {}) => {
    const col = o.color ?? F.HEAT;
    const tube = [[x - 11, y - 12], [x - 11, y - h], [x + 11, y - h], [x + 11, y - 12], [x - 11, y - 12]];
    P.fillPts(ctx, tube, PAL.white, 1);
    const top = y - 12 - (h - 24) * E.clamp(lvl);
    P.fillPts(ctx, [[x - 5, y - 10], [x - 5, top], [x + 5, top], [x + 5, y - 10]], col, 0.95);
    P.fillPts(ctx, circlePts(x, y, 20, 20, 24), col, 0.95);
    stroke(ctx, [[x - 11, y - 14], [x - 11, y - h], [x + 11, y - h], [x + 11, y - 14]], { w: 2.4, dry: false, seed: 60 });
    stroke(ctx, circlePts(x, y, 20, 20, 24), { w: 2.4, closed: true, dry: false, seed: 61 });
  };
  F.upArrow = (ctx, x, y0, y1, o = {}) => { const pts = []; for (let i = 0; i <= 24; i++) { const k = i / 24; pts.push([x + Math.sin(k * 9 + (o.ph ?? 0)) * 10, E.lerp(y0, y1, k)]); } stroke(ctx, pts, { w: o.w ?? 3, color: o.color ?? PAL.water, dry: false, seed: o.seed ?? 70, alpha: o.alpha ?? 0.8 }); arrowHead(ctx, pts[21], pts[24], 14, { w: 2.6, color: o.color ?? PAL.water }); };
  F.wind = (ctx, x, y, len, t, o = {}) => { const pts = []; for (let i = 0; i <= 30; i++) { const k = i / 30; pts.push([x + k * len, y + Math.sin(k * 6 + t * 3 + (o.ph ?? 0)) * 8]); }
    stroke(ctx, pts, { w: o.w ?? 3, color: o.color ?? '#7E8792', dry: false, seed: o.seed ?? 80, alpha: 0.8 });
    const end = pts[30]; stroke(ctx, P.arc(end[0] - 4, end[1] - 16, 16, Math.PI / 2, -Math.PI, 14), { w: o.w ?? 3, color: o.color ?? '#7E8792', dry: false, seed: (o.seed ?? 80) + 1, alpha: 0.8 }); };
  F.sunIcon = (ctx, x, y, r, t) => P.sun(ctx, x, y, r, t, { nrays: 12, cells: false, glow: false });

  F.title = (ctx, t, t1, num, name, unit = 1) => {
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, se, num, name, code) => {
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, num + ' · ' + name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  G.F82 = F;
})(window);

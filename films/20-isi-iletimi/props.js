// props.js — Film 20'ye özel çizim yardımcıları (window.F20)
// ısınan çubuk, tencere/ocak, sıcak su kabı, boncuk-tereyağı, sınıflandırma eşyaları, ev kesiti
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, dashed, hatch } = G.INK;
  const HEAT = '#B5553F', STEEL = '#9AA3A8', WOOD = '#B08A5A', COPPER = '#C27A45', RED = '#A23A2A';
  const F = { HEAT, STEEL, WOOD, COPPER, RED };
  const mixCol = (a, b, k) => { const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16)); return 'rgb(' + pa.map((v, i) => Math.round(v + (pb[i] - v) * k)).join(',') + ')'; };
  F.mixCol = mixCol;

  // çubuk: a (sıcak uç) → b; heat = ısı cephesinin ilerlemesi 0..1
  F.rod = (ctx, a, b, w, col, heat, t, o = {}) => {
    const n = 24;
    for (let i = 0; i < n; i++) {
      const u0 = i / n, u1 = (i + 1) / n, um = (u0 + u1) / 2;
      const h = E.clamp((heat - um) / 0.25 + 0.5) * (heat > 0 ? 1 : 0);
      const p0 = [a[0] + (b[0] - a[0]) * u0, a[1] + (b[1] - a[1]) * u0], p1 = [a[0] + (b[0] - a[0]) * u1 + (b[0] - a[0]) * 0.004, a[1] + (b[1] - a[1]) * u1 + (b[1] - a[1]) * 0.004];
      ctx.save(); ctx.strokeStyle = mixCol(col, HEAT, h * 0.85); ctx.lineWidth = w; ctx.lineCap = 'butt';
      ctx.beginPath(); ctx.moveTo(...p0); ctx.lineTo(...p1); ctx.stroke(); ctx.restore();
    }
    // outline
    const d = [b[0] - a[0], b[1] - a[1]], L = Math.hypot(...d), nx = -d[1] / L * w / 2, ny = d[0] / L * w / 2;
    line(ctx, [a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], { w: 2, dry: false, seed: o.seed ?? 3001 });
    line(ctx, [a[0] - nx, a[1] - ny], [b[0] - nx, b[1] - ny], { w: 2, dry: false, seed: (o.seed ?? 3001) + 1 });
    line(ctx, [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], { w: 2, dry: false });
    // heat shimmer near the front
    if (o.shimmer && heat > 0.05) {
      const u = Math.min(1, heat), px = a[0] + d[0] * u * 0.9, py = a[1] + d[1] * u * 0.9;
      for (let i = 0; i < 2; i++) { const p = []; for (let j = 0; j <= 14; j++) { const v = j / 14; p.push([px + (i ? 18 : -18) + Math.sin(v * 8 + t * 6 + i) * 4, py - 10 - v * 40]); } ctx.save(); ctx.globalAlpha = 0.7 * Math.min(1, heat * 2); stroke(ctx, p, { w: 2.4, color: HEAT, dry: false }); ctx.restore(); }
    }
  };

  // --- kaşıklar ---
  F.spoon = (ctx, bowl, tip, kind, heat, t) => { // bowl: kaşık ağzı (çorbanın içinde), tip: sap ucu
    const col = kind === 'wood' ? WOOD : STEEL;
    F.rod(ctx, bowl, tip, kind === 'wood' ? 16 : 11, col, heat, t, { shimmer: kind !== 'wood', seed: kind === 'wood' ? 3010 : 3020 });
    if (kind === 'wood') { ctx.save(); ctx.globalAlpha = 0.4; for (let i = 1; i < 5; i++) { const u = i / 5; line(ctx, [bowl[0] + (tip[0] - bowl[0]) * u - 3, bowl[1] + (tip[1] - bowl[1]) * u], [bowl[0] + (tip[0] - bowl[0]) * (u + 0.08) - 3, bowl[1] + (tip[1] - bowl[1]) * (u + 0.08)], { w: 1.2, color: '#6B4A25', dry: false }); } ctx.restore(); }
  };

  // --- ocak + tencere ---
  F.stove = (ctx, cx, top, w, on, t) => {
    const b = [[cx - w / 2, top], [cx + w / 2, top], [cx + w / 2, top + 150], [cx - w / 2, top + 150], [cx - w / 2, top]];
    P.fillPts(ctx, b, '#E8E1D3'); wash(ctx, b, '#8A8279', 0.25, 3030, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 3031 });
    line(ctx, [cx - w / 2 + 20, top + 60], [cx + w / 2 - 20, top + 60], { w: 1.6, dry: false, alpha: 0.6 });
    [-1, 0, 1].forEach(i => stroke(ctx, circlePts(cx + i * 70, top + 105, 18, 18, 20), { w: 2.4, closed: true, seed: 3032 + i }));
    if (on) { for (let i = 0; i < 9; i++) { const x = cx - 80 + i * 20, h = 18 + 8 * Math.sin(t * 9 + i * 1.7); const fl = [[x - 7, top - 2], [x, top - 2 - h], [x + 7, top - 2]]; P.fillPts(ctx, fl, PAL.water, 0.55); } }
  };
  F.pot = (ctx, cx, bottom, w, h, t, o = {}) => {
    const L = cx - w / 2, R = cx + w / 2, top = bottom - h;
    const body = [[L, top], [R, top], [R - 6, bottom], [L + 6, bottom], [L, top]];
    P.fillPts(ctx, body, o.col ?? '#C9CED1'); wash(ctx, body, '#6E767B', 0.3, 3040, { bleed: 1 });
    // soup surface
    P.fillPts(ctx, circlePts(cx, top + 4, w / 2 - 4, 14, 40), '#D89A4A', 0.9);
    stroke(ctx, body, { w: 3.2, closed: true, seed: 3041 });
    stroke(ctx, circlePts(cx, top, w / 2, 16, 50), { w: 3, closed: true, seed: 3042 });
    // handles
    if (o.handles !== false) [-1, 1].forEach(s => { const hx = s < 0 ? L : R; const hp = [[hx, top + 30], [hx + s * 46, top + 26], [hx + s * 50, top + 48], [hx, top + 52]]; P.fillPts(ctx, hp, o.handleCol ?? '#3A3740'); stroke(ctx, hp.concat([hp[0]]), { w: 2.4, closed: true, seed: 3043 + s }); });
  };

  // --- küçük eşya ikonları (≈140 px) ---
  const it = {};
  it.metalKasik = (ctx, s, t) => { F.rod(ctx, [-50, 40], [50, -40], 10, STEEL, 0, t); P.fillPts(ctx, circlePts(-58, 46, 22, 14, 24, -0.7), STEEL); stroke(ctx, circlePts(-58, 46, 22, 14, 24, -0.7), { w: 2.4, closed: true }); };
  it.tahtaKasik = (ctx, s, t) => { F.rod(ctx, [-50, 40], [50, -40], 14, WOOD, 0, t); P.fillPts(ctx, circlePts(-60, 48, 24, 16, 24, -0.7), WOOD); stroke(ctx, circlePts(-60, 48, 24, 16, 24, -0.7), { w: 2.4, closed: true }); };
  it.bakirTel = (ctx) => { for (let i = 0; i < 5; i++) stroke(ctx, circlePts(-30 + i * 14, 0, 24, 46, 30), { w: 5, closed: true, color: COPPER, dry: false, seed: 3050 + i }); line(ctx, [30, 30], [80, 60], { w: 5, color: COPPER, dry: false }); };
  it.folyo = (ctx) => { const r = rng(3060); const p = []; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283, d = 50 + r() * 22; p.push([Math.cos(a) * d * 1.2, Math.sin(a) * d * 0.8]); } p.push(p[0]); P.fillPts(ctx, p, '#D5DADD'); wash(ctx, p, '#7E878C', 0.35, 3061, { bleed: 1 }); stroke(ctx, p, { w: 2.4, closed: true }); for (let i = 0; i < 6; i++) line(ctx, [(r() - 0.5) * 80, (r() - 0.5) * 60], [(r() - 0.5) * 80, (r() - 0.5) * 60], { w: 1.2, alpha: 0.6, dry: false }); };
  it.civi = (ctx) => { const b = [[-70, -6], [50, -5], [80, 0], [50, 5], [-70, 6]]; P.fillPts(ctx, b, '#8E949A'); stroke(ctx, b.concat([b[0]]), { w: 2.4, closed: true }); const hd = [[-78, -20], [-68, -20], [-68, 20], [-78, 20], [-78, -20]]; P.fillPts(ctx, hd, '#7B8187'); stroke(ctx, hd, { w: 2.4, closed: true }); };
  it.spatula = (ctx) => { F.rod(ctx, [-60, 50], [30, -30], 12, '#5E8FAE', 0, 0); const h = [[20, -40], [70, -84], [96, -58], [48, -18], [20, -40]]; P.fillPts(ctx, h, '#5E8FAE'); stroke(ctx, h, { w: 2.4, closed: true }); };
  it.eldiven = (ctx) => { const p = [[-40, 70], [-46, -20], [-30, -60], [10, -66], [34, -40], [36, 0], [60, -10], [68, 10], [40, 40], [40, 70], [-40, 70]]; P.fillPts(ctx, p, '#B5553F', 0.8); wash(ctx, p, '#8A3A2A', 0.3, 3070); stroke(ctx, p, { w: 2.6, closed: true }); for (let y = -40; y < 60; y += 14) line(ctx, [-36, y], [30, y + 2], { w: 1.2, alpha: 0.5, dry: false, color: PAL.white }); P.fillPts(ctx, [[-44, 56], [42, 56], [42, 74], [-44, 74]], '#E6DCC6'); };
  it.mantar = (ctx) => { const c = circlePts(0, 0, 70, 46, 40); P.fillPts(ctx, c, '#C9A777'); stroke(ctx, c, { w: 2.6, closed: true }); const r = rng(3080); for (let i = 0; i < 30; i++) { ctx.fillStyle = 'rgba(110,80,40,0.6)'; ctx.beginPath(); ctx.arc((r() - 0.5) * 110, (r() - 0.5) * 70, 1.5 + r() * 2, 0, 7); ctx.fill(); } };
  it.hava = (ctx, s, t) => { const c = INK.wobble(circlePts(0, 0, 70, 52, 40), 3, 3090); P.fillPts(ctx, c, '#EAF2F6', 0.9); ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, c, { w: 2.4, on: 10, off: 8 }); ctx.restore(); const r = rng(3091); for (let i = 0; i < 7; i++) { const x = (r() - 0.5) * 90 + Math.sin((t || 0) * 1.5 + i) * 8, y = (r() - 0.5) * 60 + Math.cos((t || 0) * 1.2 + i) * 6; stroke(ctx, circlePts(x, y, 5, 5, 12), { w: 1.4, closed: true, dry: false, color: PAL.water }); } };
  F.item = (ctx, name, x, y, s, t, label) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); it[name](ctx, s, t); ctx.restore();
    if (label) INK.label(ctx, label, x, y + 95 * s + 20, { size: 32, weight: 700, align: 'center', rot: 0 });
  };

  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 3100 });
    return c;
  };
  F.steam = (ctx, cx, y, w, hgt, k, t, seed = 1) => {
    const r = rng(seed); const n = 3 + Math.round(3 * k);
    for (let i = 0; i < n; i++) {
      const x0 = cx - w / 2 + w * (i + 0.5) / n + (r() - 0.5) * 16; const ph = r() * 6;
      const p = []; for (let j = 0; j <= 26; j++) { const u = j / 26; p.push([x0 + Math.sin(u * 7 + t * 2.2 + ph) * 12 * (0.4 + u), y - 10 - u * hgt]); }
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.3) * 0.5; stroke(ctx, p, { w: 3, color: '#8FA9B8', seed: seed + i, dry: false, taper: 0.45 }); ctx.restore();
    }
  };
  G.F20 = F;
})(window);

// props.js — 6. sınıf Film 14'e özel çizim yardımcıları (window.F614)
// Işık/enerji = kehribar; ısı = #B5553F; su = PAL.water. Işınlar düz çizgi + ok ucu.
(function (G) {
  const { PAL, line, stroke, circlePts, arrowHead, wash, inkDot, wobble } = G.INK;
  const F = {};
  const AMB = '#C07F1E', RED = '#A23A2A', HEAT = '#B5553F', PANEL = '#34506B';
  F.AMB = AMB; F.RED = RED; F.HEAT = HEAT; F.PANEL = PANEL;

  F.glow = (ctx, x, y, r, a = 1, col = '240,180,80') => {
    if (a <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${col},${0.55 * a})`); g.addColorStop(0.35, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
  };
  const at = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  F.ray = (ctx, a, b, k = 1, o = {}) => {
    if (k <= 0) return;
    const e = at(a, b, Math.min(1, k)), col = o.color ?? AMB, w = o.w ?? 3.4;
    ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    line(ctx, a, e, { w, color: col, dry: false, taper: o.taper ?? 0.03, seed: o.seed ?? 7, vary: 0.2 });
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
    (o.heads ?? [0.55]).forEach(f => { if (k < f + 0.02) return; const q = at(a, b, f); arrowHead(ctx, [q[0] - u[0] * 10, q[1] - u[1] * 10], q, o.head ?? 16, { w: w * 0.9, color: col }); });
    ctx.restore(); return e;
  };
  F.card = (ctx, x, y, w, h, o = {}) => {
    const pts = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6; P.fillPts(ctx, pts, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 91 });
    return pts;
  };
  F.fit = (ctx, txt, maxW, size, weight = 700) => { ctx.save(); ctx.font = `${weight} ${size}px Kalam`; const w = ctx.measureText(txt).width; ctx.restore(); return w > maxW ? Math.floor(size * maxW / w) : size; };
  F.squiggle = (ctx, x, y, t, i, a = 1, h = 60) => {
    if (a <= 0) return; const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([x + Math.sin(u * 9 + t * 5 + i) * 6, y - u * h]); }
    ctx.save(); ctx.globalAlpha *= a; stroke(ctx, pts, { w: 3, color: HEAT, seed: 60 + i }); ctx.restore();
  };
  F.thermo = (ctx, x, y, h, lv, s = 1) => {
    const tw = 9 * s, top = y - h;
    const tube = [[x - tw, top], [x + tw, top], [x + tw, y - 14 * s], [x - tw, y - 14 * s], [x - tw, top]];
    P.fillPts(ctx, tube, '#FBF8F1'); stroke(ctx, tube, { w: 2.4, closed: true, seed: 721, dry: false });
    const b = circlePts(x, y, 17 * s, 17 * s, 24); P.fillPts(ctx, b, HEAT, 0.9); stroke(ctx, b, { w: 2.4, closed: true, seed: 722, dry: false });
    const ly = E.lerp(y - 14 * s, top + 8 * s, E.clamp(lv));
    P.fillPts(ctx, [[x - 4 * s, ly], [x + 4 * s, ly], [x + 4 * s, y - 8 * s], [x - 4 * s, y - 8 * s]], HEAT, 0.9);
  };
  // solar panel in perspective: quad corners a(top-left) b(top-right) c(bottom-right) d(bottom-left), grid n×m
  F.panel = (ctx, a, b, c, d, n = 3, m = 4, o = {}) => {
    const q = [a, b, c, d, a];
    P.fillPts(ctx, q, PANEL, 0.92); wash(ctx, q, '#23384D', 0.35, 810 + (o.seed ?? 0), { bleed: 1, blooms: 0 });
    for (let i = 1; i < n; i++) line(ctx, at(a, d, i / n), at(b, c, i / n), { w: 1.3, color: '#C9D6E0', dry: false, seed: 820 + i });
    for (let j = 1; j < m; j++) line(ctx, at(a, b, j / m), at(d, c, j / m), { w: 1.3, color: '#C9D6E0', dry: false, seed: 830 + j });
    stroke(ctx, q, { w: 2.8, closed: true, seed: 840 + (o.seed ?? 0) });
    if (o.shine) { ctx.save(); ctx.globalAlpha *= o.shine * 0.5; line(ctx, at(a, c, 0.2), at(a, c, 0.35), { w: 5, color: '#FFFFFF', dry: false }); ctx.restore(); }
  };
  // flat panel on a stand: centre bottom (x, y), width w
  F.standPanel = (ctx, x, y, w, o = {}) => {
    const h = w * 0.55, top = y - w * 0.75;
    line(ctx, [x, y], [x, top + h * 0.7], { w: 6, seed: 850 });
    F.panel(ctx, [x - w / 2 + w * 0.12, top], [x + w / 2 + w * 0.12, top], [x + w / 2, top + h], [x - w / 2, top + h], 3, 4, o);
    return { top, h };
  };
  F.bulb = (ctx, x, y, s = 1, on = 1) => {
    if (on > 0) F.glow(ctx, x, y, 150 * s, on);
    const g = circlePts(x, y, 26 * s, 26 * s, 36);
    P.fillPts(ctx, g, on > 0.5 ? '#FFF3CF' : PAL.white, 0.95);
    if (on > 0) { ctx.save(); ctx.globalAlpha *= on; wash(ctx, g, PAL.light, 0.55, 51, { bleed: 1, blooms: 0 }); ctx.restore(); }
    const fp = []; for (let i = 0; i <= 8; i++) fp.push([x - 9 * s + i * 2.25 * s, y + (i % 2 ? -4 : 4) * s]);
    stroke(ctx, fp, { w: 1.6 * s, color: on > 0.5 ? '#8A4A10' : PAL.ink, dry: false, taper: 0 });
    stroke(ctx, g, { w: 2.6 * s, closed: true, seed: 52 });
    const b0 = y + 24 * s, b1 = y + 46 * s, base = [[x - 13 * s, b0], [x + 13 * s, b0], [x + 11 * s, b1], [x - 11 * s, b1], [x - 13 * s, b0]];
    P.fillPts(ctx, base, '#B9B2A2'); stroke(ctx, base, { w: 2.2 * s, closed: true, seed: 53, dry: false });
  };
  F.cloud = (ctx, x, y, s, seed = 1, fill = '#EDEAE3') => {
    const pts = []; const n = 60;
    for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const bump = 1 + 0.16 * Math.abs(Math.sin(a * 3.5 + seed)); pts.push([x + Math.cos(a) * 130 * s * bump, y + Math.sin(a) * 55 * s * bump * (Math.sin(a) > 0 ? 0.6 : 1)]); }
    P.fillPts(ctx, pts, fill, 0.97); wash(ctx, pts, '#8E949C', 0.18, 860 + seed, { bleed: 2, blooms: 1 }); stroke(ctx, pts, { w: 2.6, closed: true, seed: 861 + seed });
  };
  F.battery = (ctx, x, y, s, lv) => {
    const b = [[x - 70 * s, y - 36 * s], [x + 60 * s, y - 36 * s], [x + 60 * s, y + 36 * s], [x - 70 * s, y + 36 * s], [x - 70 * s, y - 36 * s]];
    P.fillPts(ctx, b, '#FBF8F1'); stroke(ctx, b, { w: 2.8, closed: true, seed: 870 });
    P.fillPts(ctx, [[x + 60 * s, y - 14 * s], [x + 74 * s, y - 14 * s], [x + 74 * s, y + 14 * s], [x + 60 * s, y + 14 * s]], PAL.ink, 0.9);
    const w = 118 * s * E.clamp(lv); P.fillPts(ctx, [[x - 64 * s, y - 30 * s], [x - 64 * s + w, y - 30 * s], [x - 64 * s + w, y + 30 * s], [x - 64 * s, y + 30 * s]], PAL.life, 0.8);
  };
  // icons, centred, s=1 → ~160 px
  F.icon = {};
  F.icon.calculator = (ctx, x, y, s) => {
    const b = [[x - 55 * s, y - 75 * s], [x + 55 * s, y - 75 * s], [x + 55 * s, y + 75 * s], [x - 55 * s, y + 75 * s], [x - 55 * s, y - 75 * s]];
    P.fillPts(ctx, b, '#D8D2C4'); stroke(ctx, b, { w: 2.6, closed: true, seed: 880 });
    F.panel(ctx, [x - 42 * s, y - 64 * s], [x + 42 * s, y - 64 * s], [x + 42 * s, y - 44 * s], [x - 42 * s, y - 44 * s], 1, 4, { seed: 1 });
    const scr = [[x - 42 * s, y - 36 * s], [x + 42 * s, y - 36 * s], [x + 42 * s, y - 10 * s], [x - 42 * s, y - 10 * s], [x - 42 * s, y - 36 * s]]; P.fillPts(ctx, scr, '#C9D3B4'); stroke(ctx, scr, { w: 1.8, closed: true, dry: false });
    for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) { const bx = x - 30 * s + i * 30 * s, by = y + 8 * s + j * 18 * s; stroke(ctx, circlePts(bx, by, 9 * s, 6 * s, 12), { w: 1.6, closed: true, dry: false }); }
  };
  F.icon.streetlamp = (ctx, x, y, s) => {
    line(ctx, [x, y + 80 * s], [x, y - 60 * s], { w: 6 * s, seed: 881 });
    line(ctx, [x, y - 60 * s], [x + 50 * s, y - 70 * s], { w: 5 * s, seed: 882 });
    const sh = [[x + 30 * s, y - 72 * s], [x + 76 * s, y - 76 * s], [x + 70 * s, y - 60 * s], [x + 36 * s, y - 58 * s], [x + 30 * s, y - 72 * s]]; P.fillPts(ctx, sh, '#8C8578'); stroke(ctx, sh, { w: 2, closed: true, dry: false });
    F.glow(ctx, x + 54 * s, y - 50 * s, 60 * s, 0.7);
    F.panel(ctx, [x - 60 * s, y - 100 * s], [x - 4 * s, y - 108 * s], [x - 4 * s, y - 80 * s], [x - 60 * s, y - 74 * s], 1, 3, { seed: 2 });
  };
  F.icon.pump = (ctx, x, y, s) => {
    P.fillPts(ctx, [[x - 90 * s, y + 60 * s], [x + 90 * s, y + 60 * s], [x + 90 * s, y + 80 * s], [x - 90 * s, y + 80 * s]], PAL.life, 0.5);
    F.panel(ctx, [x - 80 * s, y - 70 * s], [x - 10 * s, y - 80 * s], [x - 16 * s, y - 30 * s], [x - 86 * s, y - 22 * s], 2, 3, { seed: 3 });
    line(ctx, [x - 48 * s, y - 26 * s], [x - 48 * s, y + 60 * s], { w: 4 * s });
    const pb = [[x + 10 * s, y + 10 * s], [x + 50 * s, y + 10 * s], [x + 50 * s, y + 60 * s], [x + 10 * s, y + 60 * s], [x + 10 * s, y + 10 * s]]; P.fillPts(ctx, pb, '#8C8578'); stroke(ctx, pb, { w: 2, closed: true, dry: false });
    line(ctx, [x + 50 * s, y + 20 * s], [x + 80 * s, y + 20 * s], { w: 4 * s });
    for (let i = 0; i < 4; i++) inkDot(ctx, x + 86 * s + i * 4 * s, y + 30 * s + i * 8 * s, 3 * s, { color: '46,106,140' });
  };
  F.icon.satellite = (ctx, x, y, s) => {
    const b = [[x - 24 * s, y - 24 * s], [x + 24 * s, y - 24 * s], [x + 24 * s, y + 24 * s], [x - 24 * s, y + 24 * s], [x - 24 * s, y - 24 * s]]; P.fillPts(ctx, b, '#D9C7A4'); stroke(ctx, b, { w: 2.4, closed: true });
    F.panel(ctx, [x - 110 * s, y - 20 * s], [x - 30 * s, y - 20 * s], [x - 30 * s, y + 20 * s], [x - 110 * s, y + 20 * s], 1, 4, { seed: 4 });
    F.panel(ctx, [x + 30 * s, y - 20 * s], [x + 110 * s, y - 20 * s], [x + 110 * s, y + 20 * s], [x + 30 * s, y + 20 * s], 1, 4, { seed: 5 });
    stroke(ctx, P.arc(x, y - 40 * s, 16 * s, Math.PI * 0.1, Math.PI * 0.9, 12), { w: 2, dry: false }); line(ctx, [x, y - 24 * s], [x, y - 44 * s], { w: 2, dry: false });
  };
  // roof-top solar collector with water tank: base at (x,y), s scale
  F.collector = (ctx, x, y, s, t, heatK = 0) => {
    // tank
    const tk = [[x - 20 * s, y - 250 * s], [x + 200 * s, y - 250 * s], [x + 200 * s, y - 180 * s], [x - 20 * s, y - 180 * s], [x - 20 * s, y - 250 * s]];
    P.fillPts(ctx, tk, '#E3DDCF'); stroke(ctx, tk, { w: 2.6, closed: true, seed: 890 });
    // dark absorber plate (tilted)
    const a = [x - 30 * s, y - 175 * s], b = [x + 210 * s, y - 175 * s], c = [x + 250 * s, y], d = [x - 70 * s, y];
    P.fillPts(ctx, [a, b, c, d, a], '#26252C', 0.95); stroke(ctx, [a, b, c, d, a], { w: 2.8, closed: true, seed: 891 });
    for (let i = 1; i < 8; i++) line(ctx, at(a, b, i / 8), at(d, c, i / 8), { w: 1.6, color: '#8C8578', dry: false, seed: 892 + i });
    if (heatK > 0) for (let i = 0; i < 3; i++) F.squiggle(ctx, x + 20 * s + i * 70 * s, y - 70 * s, t, i, heatK, 50 * s);
  };
  F.house = (ctx, x, y, w, h, o = {}) => { // simple house front: base at (x,y) left-bottom
    const wall = [[x, y], [x, y - h], [x + w, y - h], [x + w, y], [x, y]];
    P.fillPts(ctx, wall, o.wall ?? '#E8DCC4'); stroke(ctx, wall, { w: 2.8, closed: true, seed: 900 + (o.seed ?? 0) });
    const roof = [[x - 30, y - h], [x + w / 2, y - h - h * 0.55], [x + w + 30, y - h], [x - 30, y - h]];
    P.fillPts(ctx, roof, o.roof ?? '#B5553F', 0.8); stroke(ctx, roof, { w: 2.8, closed: true, seed: 901 + (o.seed ?? 0) });
    const win = [[x + w * 0.2, y - h * 0.7], [x + w * 0.42, y - h * 0.7], [x + w * 0.42, y - h * 0.4], [x + w * 0.2, y - h * 0.4], [x + w * 0.2, y - h * 0.7]];
    P.fillPts(ctx, win, '#FFF3CF'); stroke(ctx, win, { w: 2.2, closed: true, dry: false });
    const door = [[x + w * 0.6, y], [x + w * 0.6, y - h * 0.55], [x + w * 0.8, y - h * 0.55], [x + w * 0.8, y]]; P.fillPts(ctx, door, '#8A6A45', 0.85); stroke(ctx, door, { w: 2.2, dry: false });
    return roof;
  };
  F.chimney = (ctx, x, y, t, smoke = 1) => {
    const c = [[x, y], [x, y - 120], [x + 40, y - 120], [x + 40, y]]; P.fillPts(ctx, c, '#8C8578'); stroke(ctx, c, { w: 2.4, dry: false });
    for (let i = 0; i < 4 && smoke > 0; i++) { const u = ((t * 0.3 + i / 4) % 1); const r = 20 + u * 50; ctx.save(); ctx.globalAlpha *= smoke * (1 - u) * 0.5; P.fillPts(ctx, circlePts(x + 20 + u * 90, y - 140 - u * 160, r, r * 0.8, 20), '#5F5A55'); ctx.restore(); }
  };
  F.car = (ctx, x, y, s) => {
    const body = [[x - 120 * s, y], [x - 120 * s, y - 40 * s], [x - 70 * s, y - 42 * s], [x - 40 * s, y - 80 * s], [x + 60 * s, y - 80 * s], [x + 100 * s, y - 42 * s], [x + 130 * s, y - 38 * s], [x + 130 * s, y], [x - 120 * s, y]];
    P.fillPts(ctx, body, '#5E8DB0', 0.9); stroke(ctx, body, { w: 2.6, closed: true, seed: 950 });
    F.panel(ctx, [x - 34 * s, y - 92 * s], [x + 56 * s, y - 92 * s], [x + 60 * s, y - 80 * s], [x - 40 * s, y - 80 * s], 1, 4, { seed: 6 });
    [-70, 80].forEach(dx => { P.fillPts(ctx, circlePts(x + dx * s, y, 24 * s, 24 * s, 20), PAL.ink); P.fillPts(ctx, circlePts(x + dx * s, y, 10 * s, 10 * s, 12), '#B9B2A2'); });
  };
  G.F614 = F;
})(window);

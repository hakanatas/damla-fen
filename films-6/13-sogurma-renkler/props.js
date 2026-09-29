// props.js — 6. sınıf Film 13'e özel çizim yardımcıları (window.F613)
// Işık = kehribar (#C07F1E). Işınlar daima DÜZ çizgi + ok ucu. Tayf renkleri YALNIZCA ışık/renk içeriğinde, sulu boya tonlarıyla.
(function (G) {
  const { PAL, line, stroke, circlePts, arrowHead, wash, inkDot, wobble } = G.INK;
  const F = {};
  const AMB = '#C07F1E', RED = '#A23A2A', HEAT = '#B5553F';
  F.AMB = AMB; F.RED = RED; F.HEAT = HEAT;
  // gökkuşağı renkleri (sulu boya tonları; güvenlik kırmızısı #A23A2A'dan farklı)
  F.SPEC = [
    { n: 'kırmızı', c: '#CC4B3C' }, { n: 'turuncu', c: '#E0822F' }, { n: 'sarı', c: '#E9C340' },
    { n: 'yeşil', c: '#5E9E48' }, { n: 'mavi', c: '#3D7FC0' }, { n: 'lacivert', c: '#34458F' }, { n: 'mor', c: '#7B4C9C' }
  ];
  F.OBJ = { white: '#F7F3EA', red: '#C8453A', green: '#5E9A45', black: '#2A2830' };

  F.glow = (ctx, x, y, r, a = 1, col = '240,180,80') => {
    if (a <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${col},${0.55 * a})`); g.addColorStop(0.35, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
  };
  const at = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  F.at = at;
  F.ray = (ctx, a, b, k = 1, o = {}) => {
    if (k <= 0) return;
    const e = at(a, b, Math.min(1, k)), col = o.color ?? AMB, w = o.w ?? 3.4;
    ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    line(ctx, a, e, { w, color: col, dry: false, taper: o.taper ?? 0.03, seed: o.seed ?? 7, vary: 0.2 });
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, u = [(b[0] - a[0]) / L, (b[1] - a[1]) / L];
    (o.heads ?? [0.55]).forEach(f => {
      if (k < f + 0.02) return; const q = at(a, b, f); const p = [q[0] - u[0] * 10, q[1] - u[1] * 10];
      arrowHead(ctx, p, q, o.head ?? 16, { w: w * 0.9, color: col });
    });
    ctx.restore();
    return e;
  };
  // bundle of the 7 colours travelling together (= beyaz ışık), a→b, perpendicular spacing sp
  F.bundle = (ctx, a, b, k = 1, o = {}) => {
    if (k <= 0) return;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, n = [-(b[1] - a[1]) / L, (b[0] - a[0]) / L], sp = o.sp ?? 5;
    const idx = o.only ?? [0, 1, 2, 3, 4, 5, 6];
    idx.forEach((i, j) => { const off = (i - 3) * sp; F.ray(ctx, [a[0] + n[0] * off, a[1] + n[1] * off], [b[0] + n[0] * off, b[1] + n[1] * off], k, { color: F.SPEC[i].c, w: o.w ?? 2.6, heads: i === 3 || idx.length === 1 ? (o.heads ?? [0.55]) : [], head: 14, seed: 300 + i }); });
  };
  // white light beam: pale band with amber edges
  F.beam = (ctx, a, b, k = 1, wd = 26) => {
    if (k <= 0) return; const e = at(a, b, k);
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, n = [-(b[1] - a[1]) / L * wd / 2, (b[0] - a[0]) / L * wd / 2];
    const poly = [[a[0] + n[0], a[1] + n[1]], [e[0] + n[0], e[1] + n[1]], [e[0] - n[0], e[1] - n[1]], [a[0] - n[0], a[1] - n[1]]];
    P.fillPts(ctx, poly, '#FFF8E4', 0.95);
    line(ctx, poly[0], poly[1], { w: 2.2, color: AMB, dry: false, taper: 0.02, seed: 41 }); line(ctx, poly[3], poly[2], { w: 2.2, color: AMB, dry: false, taper: 0.02, seed: 42 });
  };
  F.card = (ctx, x, y, w, h, o = {}) => {
    const pts = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6; P.fillPts(ctx, pts, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 91 });
    return pts;
  };
  // font size that fits text into maxW
  F.fit = (ctx, txt, maxW, size, weight = 700) => { ctx.save(); ctx.font = `${weight} ${size}px Kalam`; const w = ctx.measureText(txt).width; ctx.restore(); return w > maxW ? Math.floor(size * maxW / w) : size; };

  // T-shirt centred at (x,y), s=1 → ~220 wide
  F.tshirt = (ctx, x, y, s, fill, seed = 1, a = 1) => {
    const p = [[-40, -90], [-18, -78], [0, -74], [18, -78], [40, -90], [110, -55], [88, -8], [62, -22], [64, 95], [-64, 95], [-62, -22], [-88, -8], [-110, -55], [-40, -90]]
      .map(q => [x + q[0] * s, y + q[1] * s]);
    ctx.save(); ctx.globalAlpha *= a;
    P.fillPts(ctx, p, fill, 0.95); if (fill !== F.OBJ.white) wash(ctx, p, fill, 0.35, 700 + seed, { bleed: 1.5, blooms: 1 });
    stroke(ctx, p, { w: 2.8 * Math.max(0.6, s), closed: true, seed: 710 + seed });
    stroke(ctx, P.arc(x, y - 78 * s, 20 * s, 0.15, Math.PI - 0.15, 12), { w: 2 * s, dry: false, color: fill === F.OBJ.black ? '#6B6760' : PAL.ink });
    ctx.restore();
  };
  // thermometer: bottom bulb at (x,y), tube height h, level 0..1
  F.thermo = (ctx, x, y, h, lv, s = 1) => {
    const tw = 9 * s, top = y - h;
    const tube = [[x - tw, top], [x + tw, top], [x + tw, y - 14 * s], [x - tw, y - 14 * s], [x - tw, top]];
    P.fillPts(ctx, tube, '#FBF8F1'); stroke(ctx, tube, { w: 2.4, closed: true, seed: 721, dry: false });
    const b = circlePts(x, y, 17 * s, 17 * s, 24); P.fillPts(ctx, b, HEAT, 0.9); stroke(ctx, b, { w: 2.4, closed: true, seed: 722, dry: false });
    const ly = E.lerp(y - 14 * s, top + 8 * s, E.clamp(lv));
    P.fillPts(ctx, [[x - 4 * s, ly], [x + 4 * s, ly], [x + 4 * s, y - 8 * s], [x - 4 * s, y - 8 * s]], HEAT, 0.9);
    for (let i = 1; i < 6; i++) { const yy = y - 14 * s - (h - 14 * s) * i / 6; line(ctx, [x + tw, yy], [x + tw + 8 * s, yy], { w: 1.3, dry: false }); }
  };
  // box in 3/4 view; front face (x,y) top-left, w×h
  F.box = (ctx, x, y, w, h, fill, seed = 1) => {
    const d = w * 0.28;
    const front = [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
    const top = [[x, y], [x + d, y - d * 0.6], [x + w + d, y - d * 0.6], [x + w, y], [x, y]];
    const side = [[x + w, y], [x + w + d, y - d * 0.6], [x + w + d, y + h - d * 0.6], [x + w, y + h], [x + w, y]];
    const dark = fill === F.OBJ.black;
    P.fillPts(ctx, front, fill); P.fillPts(ctx, top, dark ? '#3C3A42' : '#FFFDF7'); P.fillPts(ctx, side, dark ? '#1E1C23' : '#E3DDCF');
    [front, top, side].forEach((p, i) => stroke(ctx, p, { w: 2.6, closed: true, seed: 730 + seed * 3 + i }));
  };
  F.apple = (ctx, x, y, r, col, seed = 1) => {
    const p = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2; const rr = r * (1 - 0.13 * Math.pow(Math.max(0, -Math.sin(a)), 8) - 0.05 * Math.pow(Math.max(0, Math.sin(a)), 8)); p.push([x + Math.cos(a) * rr * 1.06, y + Math.sin(a) * rr * 0.95]); }
    P.fillPts(ctx, p, col, 0.95); wash(ctx, p, col, 0.3, 740 + seed, { bleed: 1, blooms: 1 });
    stroke(ctx, p, { w: 2.8, closed: true, seed: 741 + seed });
    line(ctx, [x, y - r * 0.8], [x + r * 0.12, y - r * 1.25], { w: 3.4, seed: 742 });
    const lf = [[x + r * 0.1, y - r * 1.05], [x + r * 0.45, y - r * 1.35], [x + r * 0.7, y - r * 1.15], [x + r * 0.35, y - r * 0.98], [x + r * 0.1, y - r * 1.05]];
    P.fillPts(ctx, lf, col === F.OBJ.red ? PAL.life : col, 0.85); stroke(ctx, lf, { w: 2, closed: true, seed: 743, dry: false });
  };
  F.leaf = (ctx, x, y, s, col, seed = 1) => {
    const p = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; p.push([x + Math.cos(a) * 80 * s, y + Math.sin(a) * 38 * s * Math.abs(Math.cos(a * 0.5)) * 1.3]); }
    P.fillPts(ctx, p, col, 0.95); wash(ctx, p, col, 0.3, 750 + seed, { bleed: 1, blooms: 0 });
    stroke(ctx, p, { w: 2.6, closed: true, seed: 751 + seed });
    line(ctx, [x - 95 * s, y + 4 * s], [x + 70 * s, y - 2 * s], { w: 1.8, dry: false, bend: 0.04, color: col === F.OBJ.black ? '#6B6760' : PAL.ink });
  };
  F.ball = (ctx, x, y, r, col, seed = 1) => {
    const p = circlePts(x, y, r, r, 40);
    P.fillPts(ctx, p, col, 0.97); if (col !== F.OBJ.white) wash(ctx, p, col, 0.3, 760 + seed, { bleed: 1, blooms: 1 });
    ctx.save(); ctx.globalAlpha *= 0.35; P.fillPts(ctx, circlePts(x - r * 0.35, y - r * 0.35, r * 0.22, r * 0.16, 16), '#FFFFFF'); ctx.restore();
    stroke(ctx, p, { w: 2.8, closed: true, seed: 761 + seed });
  };
  F.cloth = (ctx, x, y, w, h, col, seed = 1) => { // folded fabric swatch
    const p = [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2 - 6], [x + w / 2 + 6, y + h / 2], [x - w / 2 + 4, y + h / 2 + 4], [x - w / 2, y - h / 2]];
    P.fillPts(ctx, p, col, 0.97); stroke(ctx, p, { w: 2.6, closed: true, seed: 770 + seed });
    line(ctx, [x - w / 2 + 10, y + h / 6], [x + w / 2 - 6, y + h / 6 - 4], { w: 1.4, dry: false, color: col === F.OBJ.black ? '#6B6760' : PAL.ink, alpha: 0.6 });
  };
  // lamp (colored LED torch) pointing along angle a; (x,y) = lens centre
  F.lamp = (ctx, x, y, a, s, col) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const head = [[0, -34], [-40, -22], [-40, 22], [0, 34], [0, -34]], body = [[-40, -18], [-170, -16], [-170, 16], [-40, 18], [-40, -18]];
    P.fillPts(ctx, body, '#8C8578', 0.9); stroke(ctx, body, { w: 2.8, closed: true, seed: 781 });
    P.fillPts(ctx, head, '#A9A294', 0.9); stroke(ctx, head, { w: 2.8, closed: true, seed: 782 });
    P.fillPts(ctx, [[0, -32], [7, -32], [7, 32], [0, 32]], col, 1); stroke(ctx, [[0, -32], [7, -32], [7, 32], [0, 32], [0, -32]], { w: 2, closed: true, dry: false });
    ctx.restore();
  };
  // triangular glass prism, apex up, centre (x,y), side L
  F.prismPts = (x, y, L) => { const h = L * 0.866; return [[x, y - h * 2 / 3], [x + L / 2, y + h / 3], [x - L / 2, y + h / 3], [x, y - h * 2 / 3]]; };
  F.prism = (ctx, x, y, L) => {
    const p = F.prismPts(x, y, L);
    P.fillPts(ctx, p, '#CFE3EA', 0.55); wash(ctx, p, PAL.water, 0.14, 790, { bleed: 1, blooms: 1 });
    stroke(ctx, p, { w: 3.2, closed: true, seed: 791 });
    line(ctx, [x - L * 0.12, y - L * 0.2], [x - L * 0.28, y + L * 0.12], { w: 2, color: '#FFFFFF', dry: false, alpha: 0.8 });
  };
  // Newton wheel: centre, radius, rotation, blend (0 = colours, 1 = beyaza yakın), paintK (0..7 sectors drawn)
  F.wheel = (ctx, x, y, r, rot, blend, paintK = 7) => {
    const n = 7;
    for (let i = 0; i < n; i++) {
      const kk = E.clamp(paintK - i); if (kk <= 0) continue;
      const a0 = rot + i / n * Math.PI * 2 - Math.PI / 2, a1 = a0 + Math.PI * 2 / n * kk;
      const p = [[x, y]].concat(P.arc(x, y, r, a0, a1, 16)).concat([[x, y]]);
      P.fillPts(ctx, p, F.SPEC[i].c, 0.9 * (1 - blend * 0.85));
    }
    if (blend > 0) { // fast spin: colours merge (eye cannot follow) → pale, off-white disc
      ctx.save(); ctx.globalAlpha *= blend * 0.92; P.fillPts(ctx, circlePts(x, y, r, r, 60), '#EFEAE0'); ctx.restore();
      for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha *= blend * 0.25; stroke(ctx, P.arc(x, y, r * (0.3 + i * 0.14), rot * 3 + i, rot * 3 + i + 2.2, 24), { w: 2, color: '#B8B1A4', dry: false }); ctx.restore(); }
    }
    for (let i = 0; i < n && blend < 1; i++) { const a = rot + i / n * Math.PI * 2 - Math.PI / 2; if (paintK > i) { ctx.save(); ctx.globalAlpha *= 1 - blend; line(ctx, [x, y], [x + Math.cos(a) * r, y + Math.sin(a) * r], { w: 1.8, dry: false, seed: 800 + i }); ctx.restore(); } }
    stroke(ctx, circlePts(x, y, r, r, 80), { w: 3.4, closed: true, seed: 810 });
    inkDot(ctx, x, y, 7);
  };
  F.eyeIcon = (ctx, x, y, s) => P.icon.eye(ctx, x, y, s, 0);

  G.F613 = F;
})(window);

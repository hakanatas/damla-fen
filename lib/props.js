// props.js — reusable procedural ink props for the Fen series (sun, earth, moon, landscape, notebook, icons)
(function (G) {
  const { PAL, rng, noiseFn, stroke, line, wash, circlePts, inkDot, dashed, hatch, arrowHead, wobble } = G.INK;
  const P = {};
  const path = (ctx, pts) => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
  P.path = path;
  P.fillPts = (ctx, pts, col, a = 1) => { const A0 = ctx.globalAlpha; ctx.save(); ctx.globalAlpha = A0 * a; ctx.fillStyle = col; path(ctx, pts); ctx.closePath(); ctx.fill(); ctx.restore(); };

  // draw first k (0..1) of a polyline
  P.partial = (pts, k) => { if (k >= 1) return pts; const n = Math.max(2, Math.floor(pts.length * k)); return pts.slice(0, n); };
  P.drawOn = (ctx, pts, k, o = {}) => { if (k <= 0) return; stroke(ctx, P.partial(pts, k), { taper: 0.1, ...o }); };
  P.arc = (cx, cy, r, a0, a1, n = 40, ry) => { const p = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * (ry ?? r)]); } return p; };
  P.bez = (a, c, b, n = 30) => { const p = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; p.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]); } return p; };

  // handwriting reveal (left→right clip)
  P.write = (ctx, txt, x, y, k, o = {}) => { const A0 = ctx.globalAlpha;
    if (k <= 0) return;
    ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 40}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left';
    const w = ctx.measureText(txt).width; const x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    ctx.translate(x0, y); ctx.rotate(o.rot ?? -0.012); ctx.translate(-x0, -y);
    ctx.beginPath(); ctx.rect(x0 - 10, y - (o.size ?? 40) * 1.2, (w + 20) * Math.min(1, k), (o.size ?? 40) * 1.7); ctx.clip();
    ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha = A0 * (o.alpha ?? 0.93); ctx.fillText(txt, x, y);
    ctx.restore();
    return w;
  };
  P.pop = (k) => { // 0..1 → scale with overshoot
    if (k <= 0) return 0; if (k >= 1) return 1; const c1 = 2.2, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
  };

  // ---------------- SUN ----------------
  P.sun = (ctx, x, y, r, t, o = {}) => {
    const R = rng(o.seed ?? 901);
    if (o.glow !== false) {
      const g = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.1);
      g.addColorStop(0, 'rgba(227,160,58,0.28)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, 7); ctx.fill(); ctx.restore();
    }
    const disk = circlePts(x, y, r, r, Math.max(40, Math.min(140, r * 0.6 | 0)));
    P.fillPts(ctx, disk, '#F6D9A0', 0.9);
    wash(ctx, disk, PAL.light, 0.62, 902 + (o.seed ?? 0), { bleed: Math.max(1, r * 0.025), blooms: 3 });
    // limb darkening
    ctx.save(); const lg = ctx.createRadialGradient(x, y, r * 0.55, x, y, r); lg.addColorStop(0, 'rgba(150,80,10,0)'); lg.addColorStop(1, 'rgba(150,80,10,0.22)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
    // granulation cells (slowly boiling)
    if (o.cells !== false && r > 40) {
      ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.97, 0, 7); ctx.clip(); ctx.globalAlpha = 0.3;
      const n = Math.min(40, (r / 9) | 0);
      for (let i = 0; i < n; i++) {
        const a = R() * 6.283, d = Math.sqrt(R()) * r * 0.9, s = r * (0.04 + R() * 0.05);
        const cx = x + Math.cos(a) * d + Math.sin(t * 0.7 + i) * s * 0.3, cy = y + Math.sin(a) * d + Math.cos(t * 0.6 + i * 2) * s * 0.3;
        stroke(ctx, circlePts(cx, cy, s * (1 + 0.15 * Math.sin(t * 1.3 + i)), s * 0.8, 14), { w: Math.max(0.8, r * 0.004), closed: true, dry: false, seed: 930 + i, color: '#8A5A12' });
      }
      ctx.restore();
    }
    if (o.spots) o.spots.forEach(sp => P.sunspot(ctx, sp[0], sp[1], sp[2], sp[3] ?? 1));
    stroke(ctx, wobble(circlePts(x, y, r, r, 110), Math.max(0.8, r * 0.006), 903), { w: Math.max(2, r * 0.013), closed: true, seed: 904 });
    if (o.rays !== false) {
      const n = o.nrays ?? 24;
      for (let i = 0; i < n; i++) {
        const a = i / n * 6.283 + R() * 0.12 + t * 0.03, pulse = 1 + 0.08 * Math.sin(t * 2 + i * 1.7);
        const r1 = r * (1.12 + R() * 0.05), r2 = r1 + r * (0.16 + R() * 0.2) * pulse;
        line(ctx, [x + Math.cos(a) * r1, y + Math.sin(a) * r1], [x + Math.cos(a) * r2, y + Math.sin(a) * r2], { w: Math.max(1.5, r * 0.02), seed: 910 + i, bend: 0.05 });
      }
    }
  };
  P.sunspot = (ctx, x, y, s, fore = 1) => { // fore: foreshortening (0..1) horizontal squash near limb
    ctx.save();
    ctx.fillStyle = 'rgba(110,60,15,0.55)'; ctx.beginPath(); ctx.ellipse(x, y, s * 1.7 * fore, s * 1.5, 0, 0, 7); ctx.fill();
    ctx.fillStyle = PAL.ink; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.ellipse(x, y, s * fore, s * 0.9, 0.3, 0, 7); ctx.fill();
    ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.ellipse(x + s * 2.1 * fore, y + s * 0.6, s * 0.45 * fore, s * 0.4, 0, 0, 7); ctx.fill();
    ctx.restore();
  };

  // ---------------- EARTH ----------------
  P.earth = (ctx, x, y, r, o = {}) => {
    if (r < 7) {
      ctx.save(); ctx.fillStyle = '#5E8FAE'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(0.6, r * 0.28); ctx.stroke(); ctx.restore(); return;
    }
    const disk = circlePts(x, y, r, r, 60);
    P.fillPts(ctx, disk, PAL.white, 1);
    wash(ctx, disk, PAL.water, 0.55, 1101, { bleed: Math.max(0.5, r * 0.02), blooms: 1 });
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
    const rot = o.rot ?? 0;
    [[-0.35, -0.3, 0.45, 0.28], [0.25, 0.15, 0.32, 0.42], [-0.1, 0.55, 0.3, 0.15], [0.6, -0.45, 0.2, 0.18]].forEach(([dx, dy, w, h], i) => {
      const cx = x + ((dx + rot + 3) % 2.2 - 1.1) * r, cy = y + dy * r;
      const land = wobble(circlePts(cx, cy, w * r, h * r, 30), r * 0.07, 1110 + i);
      wash(ctx, land, PAL.life, 0.7, 1120 + i, { bleed: r * 0.02, blooms: 0 });
    });
    ctx.restore();
    stroke(ctx, wobble(disk, r * 0.01, 1130), { w: Math.max(1.4, r * 0.035), closed: true, seed: 1131 });
  };
  P.moon = (ctx, x, y, r, o = {}) => {
    const disk = circlePts(x, y, r, r, 60);
    P.fillPts(ctx, disk, PAL.white, 0.95);
    wash(ctx, disk, '#9A9387', 0.35, 1201, { bleed: r * 0.02, blooms: 2 });
    [[-0.35, -0.2, 0.14], [-0.15, 0.35, 0.1], [0.3, 0.1, 0.16], [0.1, -0.45, 0.08], [-0.5, 0.25, 0.07]].forEach(([dx, dy, s], i) =>
      stroke(ctx, circlePts(x + dx * r, y + dy * r, s * r, s * r * 0.85, 18), { w: Math.max(1, r * 0.018), closed: true, alpha: 0.55, dry: false, seed: 1210 + i }));
    stroke(ctx, wobble(disk, r * 0.01, 1220), { w: Math.max(1.6, r * 0.035), closed: true, seed: 1221 });
  };

  // ---------------- LANDSCAPE ----------------
  P.hillLine = (W, base = 900) => { const pts = []; for (let i = 0; i <= 140; i++) { const x = -200 + i / 140 * (W + 400); pts.push([x, base - Math.sin(i / 140 * 3.1 + 0.4) * 55 - Math.sin(i / 140 * 13) * 10 - (x > 600 && x < 1100 ? Math.sin((x - 600) / 500 * Math.PI) * 60 : 0)]); } return pts; };
  P.hillY = (hill, x) => { for (let i = 1; i < hill.length; i++) if (hill[i][0] >= x) { const a = hill[i - 1], b = hill[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } return hill[hill.length - 1][1]; };
  P.landscape = (ctx, W, H, t, o = {}) => {
    const hill = o.hill ?? P.hillLine(W);
    const hf = hill.concat([[W + 200, H + 200], [-200, H + 200]]);
    P.fillPts(ctx, hf, PAL.paper, 1);
    wash(ctx, hf, PAL.life, 0.24, 970, { bleed: 3, blooms: 3 });
    stroke(ctx, hill, { w: 4, seed: 971, taper: 0.03 });
    for (let i = 0; i < 90; i++) { const p = hill[(i * 7 + 3) % hill.length]; const sway = Math.sin(t * 1.6 + i) * 1.5; line(ctx, [p[0], p[1] + 4], [p[0] + 3 - (i % 3) * 2 + sway, p[1] - 12 - (i % 4) * 3], { w: 1.6, alpha: 0.6, dry: false, seed: 980 + i }); }
    if (o.tree !== false) {
      const T = o.treeAt ?? [230, P.hillY(hill, 230) + 6]; line(ctx, T, [T[0] + 6, T[1] - 120], { w: 7, seed: 990, taper: 0.1 });
      const sw = Math.sin(t * 0.9) * 3;
      const crown = wobble(circlePts(T[0] + 6 + sw, T[1] - 160, 70, 58, 50), 6, 991);
      wash(ctx, crown, PAL.life, 0.45, 992, { bleed: 3 }); stroke(ctx, crown, { w: 3, closed: true, seed: 993 });
    }
    return hill;
  };

  // ---------------- NOTEBOOK PAGE ----------------
  P.notebook = (ctx, x, y, w, h, o = {}) => {
    const pg = [[x, y], [x + w, y + 4], [x + w - 3, y + h], [x + 3, y + h - 2], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 8;
    P.fillPts(ctx, pg, '#FAF6EC', 1); ctx.restore();
    // grid (gözlem defteri kareli)
    ctx.save(); ctx.globalAlpha = 0.16; ctx.strokeStyle = PAL.water; ctx.lineWidth = 1;
    const g = o.grid ?? 34;
    for (let gx = x + 70; gx < x + w - 10; gx += g) { ctx.beginPath(); ctx.moveTo(gx, y + 20); ctx.lineTo(gx, y + h - 20); ctx.stroke(); }
    for (let gy = y + 30; gy < y + h - 10; gy += g) { ctx.beginPath(); ctx.moveTo(x + 60, gy); ctx.lineTo(x + w - 20, gy); ctx.stroke(); }
    ctx.restore();
    stroke(ctx, pg, { w: 2.4, closed: true, seed: 1301 });
    // spiral rings
    for (let ry = y + 40; ry < y + h - 20; ry += 56) {
      ctx.save(); ctx.fillStyle = PAL.paperDeep; ctx.beginPath(); ctx.arc(x + 28, ry, 8, 0, 7); ctx.fill(); ctx.restore();
      stroke(ctx, P.arc(x + 20, ry, 16, Math.PI * 0.6, Math.PI * 1.9, 16, 11), { w: 3, seed: ry | 0, dry: false });
    }
  };

  // thought bubble (cloud) — k: 0..1 pop
  P.bubble = (ctx, x, y, w, h, tail, k, seed = 1) => {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pts = []; const nz = noiseFn(seed); const n = 90;
    for (let i = 0; i <= n; i++) { const a = i / n * 6.283; const bump = 1 + 0.07 * Math.abs(Math.sin(a * 5 + seed)); pts.push([Math.cos(a) * w / 2 * bump, Math.sin(a) * h / 2 * bump]); }
    P.fillPts(ctx, pts, '#FBF8F1', 0.96); stroke(ctx, pts, { w: 2.6, closed: true, seed: 1400 + seed });
    ctx.restore();
    if (tail && k > 0.5) { const tk = E_clamp((k - 0.5) * 2); [[0.35, 11], [0.62, 7], [0.85, 4.5]].forEach(([f, r], i) => { if (tk > i / 3) { const px = x + (tail[0] - x) * f, py = y + (tail[1] - y) * f; P.fillPts(ctx, circlePts(px, py, r, r, 16), '#FBF8F1'); stroke(ctx, circlePts(px, py, r, r, 16), { w: 2, closed: true, dry: false }); } }); }
  };
  const E_clamp = (v) => Math.max(0, Math.min(1, v));

  P.check = (ctx, x, y, s, k, o = {}) => { if (k <= 0) return; const pts = P.bez([x - s * 0.5, y], [x - s * 0.15, y + s * 0.25], [x - s * 0.1, y + s * 0.45], 10).concat(P.bez([x - s * 0.1, y + s * 0.45], [x + s * 0.1, y - s * 0.1], [x + s * 0.7, y - s * 0.6], 14)); P.drawOn(ctx, pts, k, { w: o.w ?? s * 0.13, color: o.color ?? PAL.ink }); };
  P.cross = (ctx, x, y, s, k, o = {}) => { if (k <= 0) return; const k1 = E_clamp(k * 2), k2 = E_clamp(k * 2 - 1); P.drawOn(ctx, P.bez([x - s, y - s], [x + s * 0.1, y + s * 0.1], [x + s, y + s], 16), k1, { w: o.w ?? s * 0.18, color: o.color }); P.drawOn(ctx, P.bez([x + s, y - s], [x, y + s * 0.1], [x - s, y + s], 16), k2, { w: o.w ?? s * 0.18, color: o.color }); };
  P.arrow = (ctx, a, b, k = 1, o = {}) => { const pts = P.bez(a, o.c ?? [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - (o.bend ?? 0)], b, 30); P.drawOn(ctx, pts, k, { w: o.w ?? 3, color: o.color }); if (k >= 0.98) arrowHead(ctx, pts[pts.length - 4], pts[pts.length - 1], o.head ?? 16, { w: o.w ?? 3, color: o.color }); };

  // ---------------- ICONS (drawn at center x,y with size s ≈ 1 → ~160px) ----------------
  P.icon = {};
  P.icon.books = (ctx, x, y, s) => {
    const cols = ['#8A6A45', PAL.water, PAL.life];
    [[-60, 20, 120, 34, 0.02], [-52, -16, 108, 34, -0.04], [-64, -52, 116, 34, 0.05]].forEach(([dx, dy, w, h, r], i) => {
      ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(r);
      const b = [[dx, dy], [dx + w, dy], [dx + w, dy + h], [dx, dy + h], [dx, dy]]; P.fillPts(ctx, b, PAL.paper); wash(ctx, b, cols[i], 0.45, 1500 + i, { bleed: 1, blooms: 0 });
      stroke(ctx, b, { w: 2.6, closed: true, seed: 1510 + i }); line(ctx, [dx + 14, dy + 4], [dx + 14, dy + h - 4], { w: 1.6, dry: false }); line(ctx, [dx + 30, dy + h / 2], [dx + w - 20, dy + h / 2], { w: 1.2, alpha: 0.6, dry: false });
      ctx.restore();
    });
  };
  P.icon.laptop = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const scr = [[-70, -70], [70, -70], [70, 20], [-70, 20], [-70, -70]]; P.fillPts(ctx, scr, PAL.white); stroke(ctx, scr, { w: 3, closed: true, seed: 1520 });
    const base = [[-90, 22], [90, 22], [100, 44], [-100, 44], [-90, 22]]; P.fillPts(ctx, base, PAL.paperDeep); stroke(ctx, base, { w: 3, closed: true, seed: 1521 });
    // mini sun on screen + text lines
    P.fillPts(ctx, circlePts(-34, -30, 22, 22, 24), PAL.light, 0.8); stroke(ctx, circlePts(-34, -30, 22, 22, 24), { w: 1.6, closed: true, dry: false });
    [-50, -34, -18, 0].forEach((yy, i) => line(ctx, [0, yy], [56 - (i === 3 ? 20 : 0), yy], { w: 2, alpha: 0.6, dry: false, seed: 1530 + i }));
    ctx.restore();
  };
  P.icon.observatory = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bld = [[-70, 60], [-70, -10], [70, -10], [70, 60], [-70, 60]]; P.fillPts(ctx, bld, PAL.white); stroke(ctx, bld, { w: 3, closed: true, seed: 1540 });
    const dome = P.arc(0, -10, 72, Math.PI, 2 * Math.PI, 30, 64); P.fillPts(ctx, dome, PAL.paperDeep); wash(ctx, dome, PAL.water, 0.25, 1541, { bleed: 1, blooms: 0 }); stroke(ctx, dome, { w: 3, seed: 1542 });
    const slit = [[-8, -72], [10, -72], [14, -12], [-12, -12]]; P.fillPts(ctx, slit, PAL.ink, 0.85);
    // telescope with solar filter cap (amber)
    line(ctx, [4, -40], [62, -104], { w: 11, seed: 1543, taper: 0.02 });
    ctx.save(); ctx.translate(62, -104); ctx.rotate(-0.83); P.fillPts(ctx, [[-4, -10], [10, -10], [10, 10], [-4, 10]], PAL.light, 0.95); stroke(ctx, [[-4, -10], [10, -10], [10, 10], [-4, 10], [-4, -10]], { w: 2, closed: true, dry: false }); ctx.restore();
    const door = [[-14, 60], [-14, 24], [14, 24], [14, 60]]; stroke(ctx, door, { w: 2.4, seed: 1544 });
    ctx.restore();
  };
  P.icon.probe = (ctx, x, y, s, t = 0) => { // Parker-like probe: heat shield + body + solar panels
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(t * 0.8) * 0.05);
    const shield = P.arc(-40, 0, 64, -1.2, 1.2, 24, 70); const sh = shield.concat([[-44, 60], [-44, -60]]);
    P.fillPts(ctx, sh, PAL.white); wash(ctx, sh, '#9A9387', 0.35, 1550, { bleed: 1, blooms: 0 }); stroke(ctx, sh, { w: 3, closed: true, seed: 1551 });
    const body = [[-38, -22], [40, -26], [44, 24], [-38, 22], [-38, -22]]; P.fillPts(ctx, body, PAL.paperDeep); stroke(ctx, body, { w: 3, closed: true, seed: 1552 });
    [[-6, -26, -70], [-6, 24, 70]].forEach(([px, py, d], i) => { const pn = [[px, py], [px + 34, py], [px + 34, py + d * 0.55], [px, py + d * 0.55], [px, py]]; P.fillPts(ctx, pn, PAL.water, 0.5); stroke(ctx, pn, { w: 2.4, closed: true, seed: 1553 + i }); hatch(ctx, px + 2, py + d * 0.27, 30, Math.abs(d) * 0.5, { n: 3, ang: 1.57, w: 1, alpha: 0.6 }); });
    line(ctx, [44, 0], [84, 0], { w: 2.4 }); inkDot(ctx, 88, 0, 4);
    ctx.restore();
  };
  P.icon.binoculars = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [-34, 34].forEach((dx, i) => { const b = [[dx - 26, -40], [dx + 26, -40], [dx + 30, 40], [dx - 30, 40], [dx - 26, -40]]; P.fillPts(ctx, b, PAL.paperDeep); stroke(ctx, b, { w: 3, closed: true, seed: 1560 + i }); P.fillPts(ctx, circlePts(dx, 44, 28, 10, 24), PAL.ink, 0.8); });
    line(ctx, [-8, -10], [8, -10], { w: 8, taper: 0 });
    ctx.restore();
  };
  P.icon.telescope = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const tube = [[-80, 10], [60, -52], [74, -26], [-66, 36], [-80, 10]]; P.fillPts(ctx, tube, PAL.paperDeep); stroke(ctx, tube, { w: 3, closed: true, seed: 1570 });
    line(ctx, [-6, 14], [-40, 80], { w: 3 }); line(ctx, [-6, 14], [26, 80], { w: 3 }); line(ctx, [-6, 14], [-6, 84], { w: 3 });
    ctx.restore();
  };
  P.icon.magnifier = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [28, 28], [74, 74], { w: 12, taper: 0.02 });
    const g = circlePts(0, 0, 44, 44, 40); P.fillPts(ctx, g, PAL.white, 0.9); wash(ctx, g, PAL.water, 0.14, 1580, { bleed: 1, blooms: 0 }); stroke(ctx, g, { w: 5, closed: true, seed: 1581 });
    ctx.restore();
  };
  P.icon.eye = (ctx, x, y, s, crossed = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const up = P.arc(0, 30, 90, Math.PI * 1.18, Math.PI * 1.82, 24), dn = P.arc(0, -30, 90, Math.PI * 0.18, Math.PI * 0.82, 24);
    const shape = up.concat(dn); P.fillPts(ctx, shape, PAL.white); stroke(ctx, up, { w: 4 }); stroke(ctx, dn, { w: 4 });
    P.fillPts(ctx, circlePts(0, 0, 24, 24, 24), PAL.water, 0.7); P.fillPts(ctx, circlePts(0, 0, 11, 11, 16), PAL.ink); P.fillPts(ctx, circlePts(-6, -6, 4, 4, 10), PAL.white);
    ctx.restore();
    if (crossed > 0) P.cross(ctx, x, y, 70 * s, crossed, { w: 11 * s, color: '#A23A2A' });
  };
  P.icon.pencil = (ctx, x, y, s, a = -0.6) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); const b = [[-60, -8], [40, -8], [60, 0], [40, 8], [-60, 8], [-60, -8]]; P.fillPts(ctx, b, PAL.light, 0.8); stroke(ctx, b, { w: 2.4, closed: true }); P.fillPts(ctx, [[52, -3], [60, 0], [52, 3]], PAL.ink); ctx.restore(); };
  P.icon.calendar = (ctx, x, y, s, txt) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-60, -50], [60, -50], [60, 60], [-60, 60], [-60, -50]]; P.fillPts(ctx, b, PAL.white); stroke(ctx, b, { w: 3, closed: true, seed: 1590 });
    const top = [[-60, -50], [60, -50], [60, -22], [-60, -22]]; P.fillPts(ctx, top, '#A23A2A', 0.7);
    [-30, 30].forEach(dx => line(ctx, [dx, -62], [dx, -40], { w: 4 }));
    if (txt) { ctx.font = '700 44px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(txt, 0, 36); }
    ctx.restore();
  };
  P.icon.clock = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const c = circlePts(0, 0, 60, 60, 48); P.fillPts(ctx, c, PAL.white); stroke(ctx, c, { w: 3.4, closed: true, seed: 1600 });
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; line(ctx, [Math.cos(a) * 50, Math.sin(a) * 50], [Math.cos(a) * 56, Math.sin(a) * 56], { w: 2, dry: false }); }
    const a = -Math.PI / 2 + t; line(ctx, [0, 0], [Math.cos(a) * 44, Math.sin(a) * 44], { w: 3.2, taper: 0.1 }); line(ctx, [0, 0], [26, 8], { w: 4, taper: 0.1 }); inkDot(ctx, 0, 0, 4);
    ctx.restore();
  };

  G.P = P;
})(window);

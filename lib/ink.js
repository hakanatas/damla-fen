// ink.js — "Gözlem Defteri" procedural ink + watercolor toolkit (Canvas 2D, seeded, deterministic)
(function (G) {
  const PAL = {
    paper: '#F1EADB', paperDeep: '#E6DCC6',
    ink: '#1C1B22', inkSoft: 'rgba(28,27,34,0.55)',
    water: '#2E6A8C',   // su / madde  (prusya mavisi)
    light: '#E3A03A',   // ışık / enerji (kehribar)
    life: '#6F8A3A',    // canlılar (yosun yeşili)
    white: '#FBF8F1'
  };

  function rng(seed) {
    let a = (seed * 2654435761) >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  // smooth 1D noise from seeded sines
  function noiseFn(seed) {
    const r = rng(seed); const ks = [];
    for (let i = 0; i < 4; i++) ks.push({ f: 0.6 + r() * 3.2 * (i + 1), p: r() * 6.283, a: 1 / (i + 1.3) });
    const norm = ks.reduce((s, k) => s + k.a, 0);
    return t => ks.reduce((s, k) => s + Math.sin(t * k.f + k.p) * k.a, 0) / norm;
  }

  function paper(ctx, w, h, seed = 1) {
    ctx.save();
    ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, w, h);
    // warm uneven wash
    const r = rng(seed);
    for (let i = 0; i < 14; i++) {
      const x = r() * w, y = r() * h, rad = (0.2 + r() * 0.5) * Math.max(w, h);
      const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
      g.addColorStop(0, r() < 0.5 ? 'rgba(214,196,160,0.10)' : 'rgba(255,252,242,0.14)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    }
    // vignette
    const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(120,95,60,0.16)');
    ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
    // fibers
    ctx.lineCap = 'round';
    for (let i = 0; i < w * h / 9000; i++) {
      const x = r() * w, y = r() * h, a = r() * 6.28, l = 4 + r() * 16;
      ctx.strokeStyle = `rgba(110,90,60,${0.03 + r() * 0.05})`; ctx.lineWidth = 0.6;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + Math.cos(a + 0.6) * l / 2, y + Math.sin(a + 0.6) * l / 2, x + Math.cos(a) * l, y + Math.sin(a) * l); ctx.stroke();
    }
    // grain
    const img = ctx.getImageData(0, 0, w, h), d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (r() - 0.5) * 16;
      d[i] += n; d[i + 1] += n; d[i + 2] += n * 0.9;
    }
    ctx.putImageData(img, 0, 0);
    ctx.restore();
  }

  // resample a closed/open parametric fn into points
  function sample(fn, n, closed) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const t = closed ? i / n : i / n;
      pts.push(fn(t));
    }
    return pts;
  }
  function wobble(pts, amp, seed, freq = 1) {
    seed += G.INK.boil * 313;
    const nz = noiseFn(seed), nz2 = noiseFn(seed + 7);
    return pts.map((p, i) => {
      const t = i / pts.length * 10 * freq;
      return [p[0] + nz(t) * amp, p[1] + nz2(t) * amp];
    });
  }

  // brush stroke with pressure-varying width
  function stroke(ctx, pts, o = {}) { const A0 = ctx.globalAlpha;
    const w = o.w ?? 3, seed = (o.seed ?? 3) + (o.noBoil ? 0 : G.INK.boil * 977), col = o.color ?? PAL.ink, alpha = o.alpha ?? 1;
    const taper = o.taper ?? 0.25, varA = o.vary ?? 0.45;
    const nz = noiseFn(seed);
    ctx.save(); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const n = pts.length - 1;
    for (let i = 0; i < n; i++) {
      const t = i / n;
      let tp = 1;
      if (!o.closed) { if (t < taper) tp = 0.35 + 0.65 * (t / taper); if (t > 1 - taper) tp = Math.min(tp, 0.35 + 0.65 * ((1 - t) / taper)); }
      ctx.globalAlpha = A0 * alpha;
      ctx.lineWidth = Math.max(0.4, w * tp * (1 + nz(t * 9) * varA));
      ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]); ctx.stroke();
    }
    // dry-brush ghost
    if (o.dry !== false) {
      ctx.globalAlpha = A0 * alpha * 0.22; ctx.lineWidth = Math.max(0.4, w * 0.35);
      const off = w * 0.5;
      ctx.beginPath();
      pts.forEach((p, i) => { const q = [p[0] + nz(i * 0.3 + 4) * off, p[1] + nz(i * 0.3 + 9) * off]; i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); });
      ctx.stroke();
    }
    ctx.restore();
  }
  function line(ctx, a, b, o = {}) {
    const bend = o.bend ?? 0; const pts = [];
    const mx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, my = (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend;
    for (let i = 0; i <= 24; i++) { const t = i / 24, u = 1 - t; pts.push([u * u * a[0] + 2 * u * t * mx + t * t * b[0], u * u * a[1] + 2 * u * t * my + t * t * b[1]]); }
    stroke(ctx, pts, o);
    return pts;
  }
  function dashed(ctx, pts, o = {}) {
    const on = o.on ?? 6, off = o.off ?? 6; let acc = 0, seg = [], draw = true;
    for (let i = 1; i < pts.length; i++) {
      const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      acc += d; seg.push(pts[i - 1]);
      if (acc > (draw ? on : off)) { seg.push(pts[i]); if (draw && seg.length > 1) stroke(ctx, seg, { ...o, taper: 0.4, dry: false }); seg = []; acc = 0; draw = !draw; }
    }
  }

  // watercolor wash inside polygon, with darkened edge + granulation
  function wash(ctx, pts, color, alpha = 0.35, seed = 5, o = {}) { const A0 = ctx.globalAlpha;
    const r = rng(seed + G.INK.boil * 71);
    ctx.save();
    for (let k = 0; k < 4; k++) {
      const jp = wobble(pts, (o.bleed ?? 3) * (1 + k * 0.6), seed + k * 13, 1.4);
      ctx.globalAlpha = A0 * alpha / 2.6; ctx.fillStyle = color;
      ctx.beginPath(); jp.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill();
    }
    // edge darkening (pigment pooling)
    ctx.strokeStyle = color;
    const ep = wobble(pts, 1.6, seed + 99, 1.2);
    ctx.beginPath(); ep.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
    ctx.globalAlpha = A0 * alpha * 0.22; ctx.lineWidth = (o.edge ?? 2.2) * 2.2; ctx.stroke();
    ctx.globalAlpha = A0 * alpha * 0.4; ctx.lineWidth = (o.edge ?? 2.2); ctx.stroke();
    // granulation
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.clip();
    let minx = 1e9, miny = 1e9, maxx = -1e9, maxy = -1e9; pts.forEach(p => { minx = Math.min(minx, p[0]); maxx = Math.max(maxx, p[0]); miny = Math.min(miny, p[1]); maxy = Math.max(maxy, p[1]); });
    const cnt = Math.min(700, (maxx - minx) * (maxy - miny) / 90);
    ctx.fillStyle = color;
    for (let i = 0; i < cnt; i++) { ctx.globalAlpha = A0 * alpha * (0.15 + r() * 0.35); ctx.fillRect(minx + r() * (maxx - minx), miny + r() * (maxy - miny), 1 + r(), 1 + r()); }
    // soft bloom (cauliflower) spots
    for (let i = 0; i < (o.blooms ?? 2); i++) {
      const x = minx + r() * (maxx - minx), y = miny + r() * (maxy - miny), rr = 6 + r() * (maxx - minx) * 0.18;
      ctx.globalAlpha = A0 * alpha * 0.25; ctx.strokeStyle = color; ctx.lineWidth = 1;
      ctx.beginPath(); for (let a = 0; a <= 6.3; a += 0.25) { const q = rr * (1 + (r() - 0.5) * 0.3); ctx.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } ctx.stroke();
    }
    ctx.restore();
  }
  function circlePts(cx, cy, rx, ry, n = 64, rot = 0) {
    const pts = [];
    for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2 + rot; pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * (ry ?? rx)]); }
    return pts;
  }
  function inkDot(ctx, x, y, r, o = {}) { const A0 = ctx.globalAlpha;
    ctx.save();
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 1.7);
    const c = o.color ?? '28,27,34';
    g.addColorStop(0, `rgba(${c},${o.alpha ?? 0.95})`); g.addColorStop(0.55, `rgba(${c},${(o.alpha ?? 0.95) * 0.9})`); g.addColorStop(0.62, `rgba(${c},0.25)`); g.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.7, 0, 7); ctx.fill(); ctx.restore();
  }
  function splash(ctx, x, y, r, seed, o = {}) { const A0 = ctx.globalAlpha;
    const R = rng(seed); ctx.save(); ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha = A0 * (o.alpha ?? 0.85);
    for (let i = 0; i < (o.n ?? 9); i++) { const a = R() * 6.28, d = r * (0.6 + R() * 1.6), s = r * 0.08 + R() * r * 0.12; ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, s, 0, 7); ctx.fill(); }
    ctx.restore();
  }
  function label(ctx, text, x, y, o = {}) { const A0 = ctx.globalAlpha;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.02);
    ctx.font = `${o.weight ?? 400} ${o.size ?? 26}px ${o.font ?? 'Kalam'}`; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha = A0 * (o.alpha ?? 0.92);
    ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic';
    ctx.fillText(text, 0, 0); ctx.restore();
  }
  function arrowHead(ctx, p, q, s = 9, o = {}) {
    const a = Math.atan2(q[1] - p[1], q[0] - p[0]);
    line(ctx, q, [q[0] - Math.cos(a - 0.45) * s, q[1] - Math.sin(a - 0.45) * s], { w: o.w ?? 1.6, dry: false, taper: 0.5, color: o.color });
    line(ctx, q, [q[0] - Math.cos(a + 0.45) * s, q[1] - Math.sin(a + 0.45) * s], { w: o.w ?? 1.6, dry: false, taper: 0.5, color: o.color });
  }
  function leader(ctx, from, to, o = {}) {
    const pts = line(ctx, from, to, { w: o.w ?? 1.5, bend: o.bend ?? 0.18, seed: o.seed ?? 11, dry: false, taper: 0.15, color: o.color });
    if (o.dot !== false) inkDot(ctx, to[0], to[1], 2.6);
    return pts;
  }
  function hatch(ctx, x, y, w, h, o = {}) {
    const R = rng(o.seed ?? 4); const n = o.n ?? 6, ang = o.ang ?? -0.9;
    for (let i = 0; i < n; i++) {
      const t = (i + 0.5) / n; const cx = x + t * w, cy = y + (R() - 0.5) * 2;
      line(ctx, [cx - Math.cos(ang) * h / 2, cy - Math.sin(ang) * h / 2], [cx + Math.cos(ang) * h / 2, cy + Math.sin(ang) * h / 2], { w: o.w ?? 1.2, dry: false, alpha: o.alpha ?? 0.6, seed: i + 30, color: o.color });
    }
  }

  G.INK = { boil: 0, PAL, rng, noiseFn, paper, sample, wobble, stroke, line, dashed, wash, circlePts, inkDot, splash, label, arrowHead, leader, hatch };
})(window);

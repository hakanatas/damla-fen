// props.js — Film 13'e özel çizim yardımcıları (window.F13)
// Işık = kehribar (#C07F1E). Işınlar daima DÜZ çizgi + ok ucu (kaynaktan dışarı).
(function (G) {
  const { PAL, line, stroke, circlePts, arrowHead, wash, inkDot, wobble, rng } = G.INK;
  const F = {};
  const AMB = '#C07F1E', RED = '#A23A2A';
  F.AMB = AMB; F.RED = RED;

  // soft light glow
  F.glow = (ctx, x, y, r, a = 1, col = '240,180,80') => {
    if (a <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${col},${0.55 * a})`); g.addColorStop(0.35, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
  };
  // darkness overlay (room lights off)
  F.dark = (ctx, a, x0 = -300, y0 = -300, w = 2600, h = 1700) => { if (a <= 0) return; ctx.save(); ctx.fillStyle = `rgba(24,25,40,${a})`; ctx.fillRect(x0, y0, w, h); ctx.restore(); };

  const at = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  F.at = at;
  // light ray: straight amber line a→b drawn up to k (0..1), arrow heads at fractions `heads`
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
  // n rays from (x,y) in all directions between radius r0 and r1
  F.burst = (ctx, x, y, n, r0, r1, k = 1, o = {}) => {
    for (let i = 0; i < n; i++) {
      const a = (o.a0 ?? 0) + i / n * Math.PI * 2;
      F.ray(ctx, [x + Math.cos(a) * r0, y + Math.sin(a) * r0], [x + Math.cos(a) * r1, y + Math.sin(a) * r1], k, { heads: o.heads ?? [0.6], w: o.w ?? 2.8, head: o.head ?? 13, seed: 20 + i, alpha: o.alpha });
    }
  };

  // bare bulb (point-like light source); s=1 → glass radius 26
  F.bulb = (ctx, x, y, s = 1, on = 1, o = {}) => {
    if (on > 0 && o.glow !== false) F.glow(ctx, x, y, 150 * s, on);
    const g = circlePts(x, y, 26 * s, 26 * s, 36);
    P.fillPts(ctx, g, on > 0.5 ? '#FFF3CF' : PAL.white, 0.95);
    if (on > 0) { ctx.save(); ctx.globalAlpha *= on; wash(ctx, g, PAL.light, 0.55, 51, { bleed: 1, blooms: 0 }); ctx.restore(); }
    // filament
    const fp = []; for (let i = 0; i <= 8; i++) fp.push([x - 9 * s + i * 2.25 * s, y + (i % 2 ? -4 : 4) * s]);
    stroke(ctx, fp, { w: 1.6 * s, color: on > 0.5 ? '#8A4A10' : PAL.ink, dry: false, taper: 0 });
    stroke(ctx, g, { w: 2.6 * s, closed: true, seed: 52 });
    // screw base (drawn in direction o.baseDir, default down)
    const bd = o.baseDir ?? 1;
    const b0 = y + bd * 24 * s, b1 = y + bd * 46 * s;
    const base = [[x - 13 * s, b0], [x + 13 * s, b0], [x + 11 * s, b1], [x - 11 * s, b1], [x - 13 * s, b0]];
    P.fillPts(ctx, base, '#B9B2A2'); stroke(ctx, base, { w: 2.2 * s, closed: true, seed: 53, dry: false });
    for (let i = 1; i < 3; i++) { const yy = b0 + (b1 - b0) * i / 3; line(ctx, [x - 12 * s, yy], [x + 12 * s, yy + bd * 3 * s], { w: 1.4 * s, dry: false }); }
  };
  // small night lamp on a stand: floor point (x, yFloor), bulb centre at (x, bulbY)
  F.nightLamp = (ctx, x, yFloor, bulbY, on = 1, s = 1) => {
    const base = circlePts(x, yFloor - 6, 70 * s, 12 * s, 30); P.fillPts(ctx, base, '#8A6A45', 0.9); stroke(ctx, base, { w: 2.4, closed: true, seed: 61 });
    line(ctx, [x, yFloor - 12], [x, bulbY + 46 * s], { w: 6 * s, seed: 62, taper: 0.02 });
    F.bulb(ctx, x, bulbY, s, on);
  };
  // candle: base centre (x,y); returns key points
  F.candle = (ctx, x, y, t, o = {}) => {
    const h = o.h ?? 200, w = o.w ?? 50, top = y - h, fh = o.fh ?? 120;
    const body = [[x - w / 2, y], [x - w / 2, top + 6], [x - w / 4, top], [x + w / 2, top + 4], [x + w / 2, y], [x - w / 2, y]];
    P.fillPts(ctx, body, '#F5EEDC'); wash(ctx, body, '#D9C9A6', 0.35, 71, { bleed: 1, blooms: 0 });
    stroke(ctx, body, { w: 2.8, closed: true, seed: 72 });
    line(ctx, [x, top + 2], [x + 2, top - 14], { w: 2.4, seed: 73 });
    const fl = flame(x, top - 10, fh, t);
    F.glow(ctx, x, top - fh * 0.45, fh * 1.4, o.glow ?? 1);
    P.fillPts(ctx, fl, '#F2B640', 0.9); wash(ctx, fl, '#E07B20', 0.45, 74, { bleed: 1, blooms: 0 });
    P.fillPts(ctx, flame(x, top - 12, fh * 0.45, t + 1), '#FFF1C4', 0.9);
    stroke(ctx, fl, { w: 2.2, closed: true, seed: 75, color: '#8A4A10', dry: false });
    return { tip: [x, top - 10 - fh], fbase: [x, top - 10], top: [x, top], base: [x, y] };
  };
  function flame(x, yb, fh, t) { // teardrop, flickers a little
    const pts = [], fl = Math.sin(t * 9) * 0.04 + Math.sin(t * 13.7) * 0.03;
    for (let i = 0; i <= 40; i++) {
      const a = i / 40 * Math.PI * 2, u = (1 - Math.cos(a)) / 2; // 0 at base-centre → 1 at tip
      const yy = yb - u * fh, ww = Math.sin(a) * fh * 0.26 * Math.pow(Math.sin(Math.PI * Math.min(0.999, u * 0.9 + 0.08)), 0.9);
      pts.push([x + ww + Math.sin(u * 3 + t * 6) * fh * fl * u, yy]);
    }
    return pts;
  }
  F.flame = flame;

  // flashlight pointing along angle a; (x,y) = centre of the lens; s=1 → body 170 long
  F.flashlight = (ctx, x, y, a, s = 1, on = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const head = [[0, -38], [-46, -24], [-46, 24], [0, 38], [0, -38]];
    const body = [[-46, -20], [-190, -18], [-190, 18], [-46, 20]];
    P.fillPts(ctx, body.concat([body[0]]), '#5E7F93', 0.9); stroke(ctx, body.concat([body[0]]), { w: 2.8, closed: true, seed: 81 });
    P.fillPts(ctx, head, '#7FA0B3', 0.9); stroke(ctx, head, { w: 2.8, closed: true, seed: 82 });
    // reflector (ayna) inside the head: a curved line
    stroke(ctx, P.arc(8, 0, 40, Math.PI * 0.62, Math.PI * 1.38, 20), { w: 2.4, color: '#E6E1D5', dry: false });
    line(ctx, [-120, -18], [-120, -28], { w: 6, seed: 83 }); // switch
    P.fillPts(ctx, [[0, -36], [6, -36], [6, 36], [0, 36]], on ? '#FFF1C4' : PAL.white, 1); stroke(ctx, [[0, -36], [6, -36], [6, 36], [0, 36], [0, -36]], { w: 2, closed: true, dry: false });
    ctx.restore();
  };

  // paper card with shadow
  F.card = (ctx, x, y, w, h, o = {}) => {
    const pts = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6; P.fillPts(ctx, pts, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 91 });
    return pts;
  };
  // 5-point star (small, natural light source icon)
  F.star = (ctx, x, y, r, seed = 1) => {
    const pts = []; for (let i = 0; i <= 10; i++) { const a = -Math.PI / 2 + i / 10 * Math.PI * 2, rr = i % 2 ? r * 0.45 : r; pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); }
    P.fillPts(ctx, pts, PAL.light, 0.85); stroke(ctx, pts, { w: 2, closed: true, seed, dry: false });
  };

  // segment intersection: ray p + t*d with segment a-b → t or null
  F.hit = (p, d, a, b) => {
    const ex = b[0] - a[0], ey = b[1] - a[1], den = d[0] * ey - d[1] * ex; if (Math.abs(den) < 1e-9) return null;
    const qx = a[0] - p[0], qy = a[1] - p[1];
    const t = (qx * ey - qy * ex) / den, u = (qx * d[1] - qy * d[0]) / den;
    return (t > 0 && u >= 0 && u <= 1) ? t : null;
  };
  F.firstHit = (p, d, polys) => { let best = null; polys.forEach(pl => { for (let i = 1; i < pl.length; i++) { const t = F.hit(p, d, pl[i - 1], pl[i]); if (t != null && (best == null || t < best)) best = t; } }); return best; };

  G.F13 = F;
})(window);

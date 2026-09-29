// damla.js — character rig for "Damla" (a curious water-droplet scientist)
// Local units: feet on ground at (0,0); ~220 units tall at s=1. Everything is a pure function of options.
(function (G) {
  const { PAL, rng, noiseFn, stroke, line, wash, circlePts, inkDot, dashed, hatch } = G.INK;
  const H = 85, W = 76, CY = -133;

  function outline0(t, curl) { // t in [0, 2PI)
    const y0 = -Math.cos(t);
    let x0 = Math.sin(t) * Math.pow(Math.max(0, Math.sin(t / 2)), 0.85);
    x0 += curl * Math.pow(Math.max(0, -y0 - 0.55), 2) * 1.9;
    return [x0 * W, y0 * H + CY];
  }
  function edgeX(y) { // half-width at height y (no curl)
    const y0 = (y - CY) / H; if (Math.abs(y0) >= 1) return 0;
    const t = Math.acos(-y0); return Math.sin(t) * Math.pow(Math.sin(t / 2), 0.85) * W;
  }
  function squashPt(p, sq) { const sx = 1 / Math.sqrt(sq); return [p[0] * sx, (p[1] - (CY + H)) * sq + CY + H]; }

  function bodyPts(o, n = 120) {
    const sq = o.squash ?? 1, curl = o.curl ?? 0.35, pts = [];
    for (let i = 0; i <= n; i++) pts.push(squashPt(outline0(i / n * Math.PI * 2, curl), sq));
    return pts;
  }

  // ---------- face parts ----------
  const BROW = { // [innerDy, outerDy] per side (+1 right eye, -1 left eye)
    neutral: s => [0, 0], curious: s => s > 0 ? [-9, -12] : [-1, 1], surprised: s => [-11, -8],
    thinking: s => s > 0 ? [-6, -3] : [4, 1], happy: s => [-5, -2], determined: s => [7, -3], sad: s => [-8, 4], sleepy: s => [0, 2]
  };
  function eye(ctx, cx, cy, rx, ry, side, o) {
    const ex = o.expr ?? 'neutral', look = o.look ?? [0, 0], blink = o.blink ?? 0;
    if (ex === 'happy') { // closed arcs ∩
      const pts = []; for (let i = 0; i <= 20; i++) { const a = Math.PI + i / 20 * Math.PI; pts.push([cx + Math.cos(a) * rx * 0.95, cy + 4 + Math.sin(a) * ry * 0.55]); }
      stroke(ctx, pts, { w: 3.6, seed: 40 + side, taper: 0.3 });
    } else {
      const sc = ex === 'surprised' ? 1.12 : 1;
      rx *= sc; ry *= sc;
      const ep = circlePts(cx, cy, rx, ry, 48);
      ctx.save(); ctx.fillStyle = PAL.white; ctx.beginPath(); ep.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.fill();
      ctx.clip();
      const pr = rx * (ex === 'surprised' ? 0.34 : 0.5);
      const px = cx + look[0] * (rx - pr - 1.5), py = cy + look[1] * (ry - pr - 1.5);
      ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(px, py, pr, 0, 7); ctx.fill();
      ctx.fillStyle = PAL.white; ctx.beginPath(); ctx.arc(px - pr * 0.35, py - pr * 0.4, pr * 0.3, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(px + pr * 0.3, py + pr * 0.35, pr * 0.12, 0, 7); ctx.fill();
      // lids
      let lid = null; // y offsets of lid line at inner/outer
      if (ex === 'sad') lid = [-ry * 0.6, -ry * 0.05];
      if (ex === 'determined') lid = [-ry * 0.02, -ry * 0.38];
      if (ex === 'thinking') lid = [-ry * 0.35, -ry * 0.35];
      if (ex === 'sleepy') lid = [0, 0];
      if (blink > 0) lid = [-ry + blink * 2 * ry, -ry + blink * 2 * ry];
      if (lid) {
        const xi = cx - side * rx, xo = cx + side * rx;
        ctx.fillStyle = PAL.paper; ctx.beginPath(); ctx.moveTo(xi, cy - ry - 4); ctx.lineTo(xo, cy - ry - 4); ctx.lineTo(xo, cy + lid[1]); ctx.lineTo(xi, cy + lid[0]); ctx.closePath(); ctx.fill();
        ctx.globalAlpha = 0.42; ctx.fillStyle = PAL.water; ctx.fill(); ctx.globalAlpha = 1;
        ctx.restore(); ctx.save();
        line(ctx, [xi - side * 1, cy + lid[0]], [xo + side * 1, cy + lid[1]], { w: 2.6, seed: 60 + side, taper: 0.2, dry: false });
      }
      ctx.restore();
      stroke(ctx, G.INK.wobble(ep, 0.6, 70 + side), { w: 2.3, seed: 71 + side, closed: true, vary: 0.35 });
    }
    // brow
    const b = BROW[ex] ? BROW[ex](side) : [0, 0];
    const by = cy - ry - 10;
    line(ctx, [cx - side * rx * 0.75, by + b[0]], [cx + side * rx * 0.85, by + b[1]], { w: 3.4, bend: side * 0.08, seed: 80 + side, taper: 0.35 });
  }
  function mouth(ctx, x, y, o) {
    const ex = o.expr ?? 'neutral';
    const f = (pts, w = 2.6) => stroke(ctx, pts, { w, seed: 91, taper: 0.35 });
    const arc = (rx, ry, a0, a1, cx = x, cy = y) => { const p = []; for (let i = 0; i <= 20; i++) { const a = a0 + (a1 - a0) * i / 20; p.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return p; };
    ctx.save();
    if ((o.talk ?? 0) > 0.06 && ex !== 'surprised') {
      const ry = 2.5 + o.talk * 8.5, rx = 6 + o.talk * 4 + (ex === 'happy' ? 5 : 0);
      const p = circlePts(x, y + 2, rx, ry, 28); ctx.fillStyle = PAL.ink; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill();
      if (o.talk > 0.4) { ctx.fillStyle = 'rgba(205,95,72,0.65)'; ctx.beginPath(); ctx.ellipse(x + 1, y + 2 + ry * 0.5, rx * 0.55, ry * 0.35, 0, 0, 7); ctx.fill(); }
      ctx.restore(); return;
    }
    if (ex === 'neutral' || ex === 'sleepy') f(arc(8, 4, 0.35, Math.PI - 0.35));
    else if (ex === 'curious') { const p = circlePts(x + 2, y + 1, 4.5, 5.2, 24); ctx.fillStyle = PAL.ink; ctx.globalAlpha = 0.85; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); }
    else if (ex === 'surprised') { const p = circlePts(x, y + 3, 8, 11, 32); ctx.fillStyle = PAL.ink; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.fillStyle = 'rgba(200,90,70,0.55)'; ctx.beginPath(); ctx.ellipse(x, y + 9, 5, 3, 0, 0, 7); ctx.fill(); }
    else if (ex === 'thinking') f([[x - 6, y + 2], [x - 1, y], [x + 3, y + 2], [x + 8, y]], 2.4);
    else if (ex === 'happy') {
      const p = arc(15, 13, 0, Math.PI); p.push([x - 15, y]); ctx.fillStyle = PAL.ink; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(205,95,72,0.7)'; ctx.beginPath(); ctx.ellipse(x + 2, y + 9, 8, 4, 0, 0, 7); ctx.fill();
      ctx.fillStyle = PAL.white; ctx.fillRect(x - 9, y, 7, 3);
    }
    else if (ex === 'determined') f([[x - 9, y + 1], [x, y + 2], [x + 9, y - 3]], 2.8);
    else if (ex === 'sad') f(arc(8, 4, Math.PI + 0.35, 2 * Math.PI - 0.35, x, y + 5));
    ctx.restore();
  }

  // ---------- body parts ----------
  function particles(ctx, o, pts) {
    const r = rng((o.seed ?? 1) * 17 + 3), t = o.t ?? 0, st = o.state ?? 'liquid';
    ctx.save();
    if (st !== 'vapor') { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.clip(); }
    const list = [];
    if (st === 'ice') {
      for (let row = 0; row < 3; row++) for (let c = 0; c < 4 - (row === 0 ? 1 : 0); c++) list.push([-33 + c * 22 + (row % 2) * 11, -64 - row * 20]);
    } else if (st === 'vapor') {
      for (let i = 0; i < 9; i++) list.push([(r() - 0.5) * 190 + Math.sin(t * 1.3 + i) * 8, -40 - r() * 230 + Math.cos(t + i) * 8]);
    } else {
      [[-32,-62],[-12,-57],[8,-61],[28,-63],[-24,-79],[-4,-75],[16,-78],[36,-82],[-42,-94]].forEach((q,i)=>list.push([q[0]+(r()-0.5)*5+Math.sin(t*0.9+i)*3, q[1]+(r()-0.5)*4+Math.cos(t*1.1+i*2)*2.5]));
    }
    list.forEach((p, i) => {
      const pp = st === 'vapor' ? p : squashPt(p, o.squash ?? 1);
      ctx.globalAlpha = st === 'vapor' ? 0.55 : 0.5;
      stroke(ctx, circlePts(pp[0], pp[1], 5, 5, 16), { w: 1.3, seed: 200 + i, closed: true, dry: false, vary: 0.2 });
      ctx.globalAlpha = 0.3; ctx.fillStyle = PAL.water; ctx.beginPath(); ctx.arc(pp[0], pp[1], 3.6, 0, 7); ctx.fill();
    });
    if (st === 'ice') { // lattice bonds
      ctx.globalAlpha = 0.35;
      list.forEach((p, i) => list.forEach((q, j) => { if (j > i && Math.hypot(p[0] - q[0], p[1] - q[1]) < 24) line(ctx, p, q, { w: 1, dry: false, seed: i * 9 + j }); }));
    }
    ctx.restore();
  }

  function arm(ctx, side, a, o, len = 46) {
    const sy = -116, sx = side * edgeX(sy) * 0.93 / Math.sqrt(o.squash ?? 1);
    let d;
    if (typeof a === 'object') { const dx = a[0] - sx, dy = a[1] - sy, L = Math.hypot(dx, dy) || 1; len = Math.max(22, Math.min(95, L)); d = [dx / L, dy / L]; }
    else d = [side * Math.sin(a), Math.cos(a)];
    const hand = [sx + d[0] * len, sy + d[1] * len];
    line(ctx, [sx, sy], hand, { w: 3.2, bend: -side * 0.22 * (o.armBend ?? 1), seed: 300 + side, taper: 0.12 });
    if (o.handR) { // open mitten (e.g. covering the eyes)
      const hp = circlePts(hand[0], hand[1], o.handR * 1.15, o.handR, 28, 0.3 * side);
      ctx.save(); ctx.fillStyle = '#A9C6D6'; ctx.beginPath(); hp.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.restore();
      stroke(ctx, hp, { w: 2.6, closed: true, seed: 330 + side, dry: false });
      for (let f = -1; f <= 1; f++) line(ctx, [hand[0] + f * o.handR * 0.45, hand[1] - o.handR * 0.95], [hand[0] + f * o.handR * 0.4, hand[1] - o.handR * 0.35], { w: 1.6, dry: false, seed: 340 + f });
    } else inkDot(ctx, hand[0], hand[1], 5.2);
    return { hand, dir: d };
  }
  function leg(ctx, side, o, foot) {
    const hip = [side * 14, -50];
    const f = [side * 17 + foot[0], foot[1]];
    line(ctx, hip, f, { w: 3.4, bend: side * 0.12, seed: 400 + side, taper: 0.1 });
    const dir = o.face ?? 1;
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(f[0] + dir * 4, f[1] - 3, 9.5, 5.2, dir * -0.08, 0, 7); ctx.fill(); ctx.restore();
  }
  function goggles(ctx, o, faceX) {
    const view = o.view ?? 'front', y = -171, e = edgeX(y) / Math.sqrt(o.squash ?? 1);
    const sq = o.squash ?? 1; const yy = squashPt([0, y], sq)[1];
    // strap
    line(ctx, [-e - 1, yy + 4], [e + 1, yy + 4], { w: 5.5, bend: -0.05, seed: 501, taper: 0.05 });
    if (view === 'back') { ctx.save(); ctx.fillStyle = PAL.ink; ctx.fillRect(-7, yy - 1, 14, 10); ctx.restore(); return; }
    const lens = (cx, rx) => {
      const p = circlePts(cx, yy, rx, 11, 36);
      ctx.save(); ctx.fillStyle = PAL.white; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.restore();
      wash(ctx, p, PAL.water, 0.18, 510 + cx | 0, { bleed: 0.6, blooms: 0 });
      stroke(ctx, p, { w: 3.6, seed: 520 + cx | 0, closed: true, vary: 0.3 });
      line(ctx, [cx - rx * 0.45, yy - 4], [cx - rx * 0.05, yy - 7], { w: 1.8, color: PAL.white, dry: false });
    };
    if (view === 'side') lens(faceX - 6, 7);
    else if (view === 'q3') { lens(faceX - 13, 9.5); lens(faceX + 12, 11); }
    else { lens(faceX - 14, 11.5); lens(faceX + 14, 11.5); line(ctx, [faceX - 3, yy], [faceX + 3, yy], { w: 3, dry: false }); }
  }
  function backpack(ctx, o, mode) {
    // mode: 'straps' (front), 'side', 'back'
    if (mode === 'straps') {
      [-1, 1].forEach(s => line(ctx, [s * 44, -150], [s * 52, -104], { w: 4, bend: s * 0.1, seed: 600 + s, taper: 0.1 }));
      return;
    }
    const pts = mode === 'side' ? [[-104, -152], [-62, -158], [-58, -84], [-100, -80]] : [[-36, -152], [36, -152], [40, -76], [-40, -76]];
    const poly = G.INK.wobble(pts.concat([pts[0]]).flatMap((p, i, a) => i < a.length - 1 ? [p, [(p[0] + a[i + 1][0]) / 2, (p[1] + a[i + 1][1]) / 2]] : [p]), 1.2, 610);
    ctx.save(); ctx.fillStyle = PAL.paper; ctx.beginPath(); poly.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.restore();
    wash(ctx, poly, '#8A6A45', 0.35, 611, { bleed: 1.2, blooms: 1 });
    stroke(ctx, poly, { w: 2.8, seed: 612, closed: true });
    // flap + rolled notebook
    if (mode === 'side') { line(ctx, [-104, -130], [-60, -134], { w: 2.2 }); stroke(ctx, circlePts(-84, -160, 20, 7, 24), { w: 2, closed: true }); line(ctx,[-62,-150],[-40,-146],{w:3}); }
    else { line(ctx, [-38, -128], [38, -128], { w: 2.2, bend: -0.12 }); ctx.save(); ctx.fillStyle = PAL.ink; ctx.fillRect(-5, -120, 10, 8); ctx.restore(); }
  }

  function lensProp(ctx, hand, dir, o = {}) {
    const a = Math.atan2(dir[1], dir[0]) + (o.tilt ?? 0);
    const tip = [hand[0] + Math.cos(a) * 20, hand[1] + Math.sin(a) * 20];
    line(ctx, [hand[0] - Math.cos(a) * 6, hand[1] - Math.sin(a) * 6], tip, { w: 5.5, taper: 0.05, seed: 700 });
    const c = [tip[0] + Math.cos(a) * 19, tip[1] + Math.sin(a) * 19];
    const p = circlePts(c[0], c[1], 19, 19, 40);
    ctx.save(); ctx.fillStyle = 'rgba(251,248,241,0.55)'; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.restore();
    wash(ctx, p, PAL.water, 0.12, 701, { bleed: 0.5, blooms: 0 });
    stroke(ctx, p, { w: 4, closed: true, seed: 702 });
    line(ctx, [c[0] - 11, c[1] - 3], [c[0] - 4, c[1] - 11], { w: 2.2, color: PAL.white, dry: false });
    return c;
  }
  function notebookProp(ctx, hand, o = {}) {
    const [x, y] = hand; const p = [[x - 22, y - 26], [x + 12, y - 30], [x + 16, y + 4], [x - 18, y + 8], [x - 22, y - 26]];
    ctx.save(); ctx.fillStyle = PAL.white; ctx.beginPath(); p.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.restore();
    stroke(ctx, p, { w: 2.2, closed: true, seed: 720 });
    for (let i = 0; i < 4; i++) line(ctx, [x - 16, y - 20 + i * 7], [x + 8 - (i == 3 ? 10 : 0), y - 22 + i * 7], { w: 0.9, dry: false, alpha: 0.6, seed: 730 + i });
  }
  function pencilProp(ctx, hand, a) {
    const tip = [hand[0] + Math.cos(a) * 22, hand[1] + Math.sin(a) * 22], back = [hand[0] - Math.cos(a) * 14, hand[1] - Math.sin(a) * 14];
    line(ctx, back, tip, { w: 4.5, taper: 0.02, seed: 740 });
    inkDot(ctx, tip[0], tip[1], 1.8);
  }

  // ---------- main ----------
  function draw(ctx, o) {
    const s = o.s ?? 1, view = o.view ?? 'front', st = o.state ?? 'liquid';
    ctx.save(); ctx.translate(o.x, o.y); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.rotate(o.lean ?? 0);
    if (st === 'vapor') ctx.translate(0, -26);
    // shadow
    if (o.shadow !== false && st !== 'vapor') { ctx.save(); ctx.globalAlpha = 0.14; ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(0, 2, 46, 7, 0, 0, 7); ctx.fill(); ctx.restore(); }
    const pts = bodyPts(o);
    const faceX = { front: 0, q3: 17, side: 42, back: 0 }[view];

    // behind-body items
    if (view === 'side') backpack(ctx, o, 'side');
    if (o.armsBack) o.armsBack.forEach(([sd, a]) => arm(ctx, sd, a, o));
    // legs
    if (st !== 'vapor') {
      const feet = o.feet ?? [[0, 0], [0, 0]];
      leg(ctx, -1, { ...o, face: view === 'front' || view === 'back' ? -0.3 : 1 }, feet[0]);
      leg(ctx, 1, { ...o, face: view === 'front' || view === 'back' ? 0.3 : 1 }, feet[1]);
    } else {
      ctx.save(); ctx.globalAlpha = 0.35; line(ctx, [-14, -50], [-20, -8], { w: 2, bend: 0.3 }); line(ctx, [14, -50], [22, -12], { w: 2, bend: -0.3 }); ctx.restore();
    }

    // BODY
    if (st === 'ice') {
      const R = rng(33); const n = 11; const ip = [];
      for (let i = 0; i <= n; i++) { const t = (i % n) / n * Math.PI * 2; const p = squashPt(outline0(t, 0.05), 1); ip.push([p[0] * (1.02 + (R() - 0.5) * 0.08), p[1] + (R() - 0.5) * 6]); }
      ctx.save(); ctx.fillStyle = PAL.white; ctx.globalAlpha = 0.7; ctx.beginPath(); ip.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.fill(); ctx.restore();
      wash(ctx, ip, '#6FA6C4', 0.35, 44, { bleed: 1, blooms: 1 });
      particles(ctx, o, ip);
      for (let i = 0; i < 5; i++) { const a = ip[i * 2 + 1], b = [ip[i * 2 + 1][0] * 0.35, -120 + (R() - 0.5) * 30]; ctx.globalAlpha = 1; line(ctx, a, b, { w: 1, alpha: 0.35, dry: false, seed: 800 + i }); }
      for (let i = 0; i < n; i++) line(ctx, ip[i], ip[i + 1], { w: 3.2, seed: 810 + i, taper: 0.08, bend: 0.01 });
      // frost ticks
      for (let i = 0; i < 12; i++) { const p = ip[(i * 3) % n]; const q = [p[0] + (R() - 0.5) * 20, p[1] + (R() - 0.5) * 20]; ctx.save(); ctx.globalAlpha = 0.6; line(ctx, [q[0] - 3, q[1]], [q[0] + 3, q[1]], { w: 1, dry: false }); line(ctx, [q[0], q[1] - 3], [q[0], q[1] + 3], { w: 1, dry: false }); ctx.restore(); }
    } else if (st === 'vapor') {
      ctx.save(); ctx.globalAlpha = 0.6;
      wash(ctx, pts, PAL.water, 0.16, 45, { bleed: 7, blooms: 3 });
      ctx.restore();
      particles(ctx, o, pts);
      ctx.save(); ctx.globalAlpha = 0.75; dashed(ctx, G.INK.wobble(pts, 3, 46), { w: 2.4, on: 14, off: 9 }); ctx.restore();
      // wisps
      [[-40, -230], [10, -250], [52, -222]].forEach(([x, y], i) => { const p = []; for (let k = 0; k <= 30; k++) { const tt = k / 30; p.push([x + Math.sin(tt * 7 + i) * 9 * (1 - tt), y - tt * 60]); } ctx.save(); ctx.globalAlpha = 0.45; stroke(ctx, p, { w: 2, seed: 850 + i }); ctx.restore(); });
    } else {
      ctx.save(); ctx.fillStyle = 'rgba(251,248,241,0.6)'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.fill(); ctx.restore();
      wash(ctx, pts, PAL.water, 0.42, 47 + (o.seed ?? 0), { bleed: 1.6, blooms: 2 });
      // deeper tone at bottom (volume)
      ctx.save(); ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.clip();
      const g = ctx.createLinearGradient(0, -150, 0, -45); g.addColorStop(0, 'rgba(46,106,140,0)'); g.addColorStop(1, 'rgba(30,70,100,0.35)');
      ctx.fillStyle = g; ctx.fillRect(-120, -230, 240, 200); ctx.restore();
      particles(ctx, o, pts);
      // shine
      const sh = []; for (let i = 0; i <= 16; i++) { const t = 4.95 + i / 16 * 0.75; const p = squashPt(outline0(t, o.curl ?? 0.35), o.squash ?? 1); sh.push([p[0] * 0.78, (p[1] - CY) * 0.8 + CY]); }
      stroke(ctx, sh, { w: 4.2, color: PAL.white, dry: false, taper: 0.4, alpha: 0.9 });
      ctx.save(); ctx.fillStyle = PAL.white; ctx.beginPath(); ctx.arc(sh[16][0] + 2, sh[16][1] + 13, 2.6, 0, 7); ctx.fill(); ctx.restore();
      stroke(ctx, G.INK.wobble(pts, 0.8, 48), { w: 3.6, seed: 49 + (o.seed ?? 0), closed: true, vary: 0.5 });
    }

    // face
    if (view !== 'back') {
      const ey = squashPt([0, -128], o.squash ?? 1)[1];
      const alpha = st === 'vapor' ? 0.8 : 1; ctx.save(); ctx.globalAlpha = alpha;
      if (view === 'front') { eye(ctx, faceX - 22, ey, 15, 19, -1, o); eye(ctx, faceX + 22, ey, 15, 19, 1, o); }
      else if (view === 'q3') { eye(ctx, faceX - 20, ey, 12.5, 18, -1, o); eye(ctx, faceX + 19, ey, 15, 19, 1, o); }
      else { eye(ctx, faceX, ey, 11, 18, 1, o); }
      mouth(ctx, faceX * 1.12 + (view === 'side' ? 6 : 0), squashPt([0, -94], o.squash ?? 1)[1], o);
      if (o.expr === 'happy') { hatch(ctx, faceX - 44, ey + 16, 16, 9, { n: 3, seed: 5, alpha: 0.5, color: '#B5553F' }); hatch(ctx, faceX + 28, ey + 16, 16, 9, { n: 3, seed: 6, alpha: 0.5, color: '#B5553F' }); }
      ctx.restore();
    }
    if (st !== 'vapor') goggles(ctx, o, faceX);
    if (view === 'back') backpack(ctx, o, 'back');
    

    // arms (front)
    const arms = o.arms ?? [[-1, 0.35], [1, 0.35]];
    const res = {};
    arms.forEach(([sd, a, bend]) => { res[sd] = arm(ctx, sd, a, { ...o, armBend: bend ?? 1 }); });
    if (o.prop === 'lens' && res[1]) res.lens = lensProp(ctx, res[1].hand, res[1].dir, { tilt: o.propTilt ?? 0 });
    if (o.prop === 'notebook') { if (res[-1]) notebookProp(ctx, res[-1].hand); if (res[1]) pencilProp(ctx, res[1].hand, -2.4); }
    if (o.hold) o.hold(ctx, res);
    ctx.restore();
    return res;
  }

  G.DAMLA = { lensProp, notebookProp, pencilProp, draw, bodyPts, edgeX, H, W, CY };
})(window);

// props.js — 6. sınıf Film 11'e özel çizim yardımcıları (window.F611)
// Işık = kehribar (#C07F1E). Işınlar daima DÜZ çizgi + ok ucu. Yansıma VEKTÖRLE hesaplanır: r = d − 2(d·n)n
(function (G) {
  const { PAL, line, stroke, circlePts, arrowHead, wash, dashed, rng } = G.INK;
  const F = {};
  const AMB = '#C07F1E', RED = '#A23A2A';
  F.AMB = AMB; F.RED = RED;

  // ---------- vektör yardımcıları ----------
  const V = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, k) => [a[0] * k, a[1] * k], dot: (a, b) => a[0] * b[0] + a[1] * b[1],
    len: a => Math.hypot(a[0], a[1]), norm: a => { const L = Math.hypot(a[0], a[1]) || 1; return [a[0] / L, a[1] / L]; },
    dir: ang => [Math.cos(ang), Math.sin(ang)],
    // yansıma: d gelen yön (birim), n yüzey normali (birim)
    reflect: (d, n) => { const k = 2 * (d[0] * n[0] + d[1] * n[1]); return [d[0] - k * n[0], d[1] - k * n[1]]; },
    angle: (a, b) => Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / ((Math.hypot(a[0], a[1]) || 1) * (Math.hypot(b[0], b[1]) || 1)))))
  };
  F.V = V;

  // ---------- film 13'ten kopyalanan yardımcılar ----------
  F.glow = (ctx, x, y, r, a = 1, col = '240,180,80') => {
    if (a <= 0) return;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${col},${0.55 * a})`); g.addColorStop(0.35, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
  };
  F.dark = (ctx, a, x0 = -300, y0 = -300, w = 2600, h = 1700) => { if (a <= 0) return; ctx.save(); ctx.fillStyle = `rgba(24,25,40,${a})`; ctx.fillRect(x0, y0, w, h); ctx.restore(); };
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
  // el feneri: (x,y) = camın ortası, a = ışık yönü açısı
  F.flashlight = (ctx, x, y, a, s = 1, on = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const head = [[0, -38], [-46, -24], [-46, 24], [0, 38], [0, -38]];
    const body = [[-46, -20], [-190, -18], [-190, 18], [-46, 20]];
    P.fillPts(ctx, body.concat([body[0]]), '#5E7F93', 0.9); stroke(ctx, body.concat([body[0]]), { w: 2.8, closed: true, seed: 81 });
    P.fillPts(ctx, head, '#7FA0B3', 0.9); stroke(ctx, head, { w: 2.8, closed: true, seed: 82 });
    line(ctx, [-120, -18], [-120, -28], { w: 6, seed: 83 });
    P.fillPts(ctx, [[0, -36], [6, -36], [6, 36], [0, 36]], on ? '#FFF1C4' : PAL.white, 1); stroke(ctx, [[0, -36], [6, -36], [6, 36], [0, 36], [0, -36]], { w: 2, closed: true, dry: false });
    ctx.restore();
  };
  F.card = (ctx, x, y, w, h, o = {}) => {
    const pts = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6; P.fillPts(ctx, pts, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 91 });
    return pts;
  };

  // ---------- yüzeyler ----------
  // yandan görünen ayna (x0..x1, üst yüzey y): gümüş yüzey + arkada tarama
  F.mirror = (ctx, x0, x1, y, o = {}) => {
    const th = o.th ?? 22;
    const body = [[x0, y], [x1, y], [x1, y + th], [x0, y + th], [x0, y]];
    P.fillPts(ctx, body, '#DCE6EC', 0.95);
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y + th * 0.45, x1 - x0, th * 0.55); ctx.clip();
    for (let x = x0 - 20; x < x1 + 20; x += 16) line(ctx, [x, y + th + 2], [x + 14, y + th * 0.4], { w: 1.4, dry: false, seed: x | 0 });
    ctx.restore();
    line(ctx, [x0, y], [x1, y], { w: 4.2, seed: 501, taper: 0.01, color: '#5B6B75' });
    stroke(ctx, body, { w: 2.2, closed: true, seed: 502, dry: false });
  };
  // buruşuk folyo profili: kırık çizgi (x0..x1), eğimler ±maxSlope
  F.rough = (x0, x1, y, n, amp, seed) => {
    const r = rng(seed); const pts = [];
    for (let i = 0; i <= n; i++) {
      const x = x0 + (x1 - x0) * i / n + (i > 0 && i < n ? (r() - 0.5) * (x1 - x0) / n * 0.5 : 0);
      pts.push([x, y + (i % 2 ? -1 : 1) * amp * (0.35 + r() * 0.65)]);
    }
    return pts;
  };
  // yüzeyin kaynak tarafına bakan birim normali (segment a→b, gelen yön d)
  F.segNormal = (a, b, d) => { let n = V.norm([-(b[1] - a[1]), b[0] - a[0]]); if (V.dot(n, d) > 0) n = V.mul(n, -1); return n; };
  // ışın p + t d ile kırık çizginin ilk kesişimi → {q, n} ya da null
  F.hitPoly = (p, d, pl) => {
    let best = null;
    for (let i = 1; i < pl.length; i++) {
      const a = pl[i - 1], b = pl[i], ex = b[0] - a[0], ey = b[1] - a[1], den = d[0] * ey - d[1] * ex; if (Math.abs(den) < 1e-9) continue;
      const qx = a[0] - p[0], qy = a[1] - p[1], t = (qx * ey - qy * ex) / den, u = (qx * d[1] - qy * d[0]) / den;
      if (t > 1e-6 && u >= 0 && u <= 1 && (!best || t < best.t)) best = { t, q: [p[0] + d[0] * t, p[1] + d[1] * t], n: F.segNormal(a, b, d) };
    }
    return best;
  };
  // folyo yüzeyi çizimi (düzgün ya da pürüzlü)
  F.foil = (ctx, pl, o = {}) => {
    const under = pl.concat([[pl[pl.length - 1][0], pl[pl.length - 1][1] + 26], [pl[0][0], pl[0][1] + 26]]);
    P.fillPts(ctx, under, '#C9D0D4', 0.9);
    stroke(ctx, pl, { w: 3.6, seed: o.seed ?? 520, color: '#4E5A62', taper: 0.02 });
  };
  // iki doğrultu arası açı yayı (merkez O, yönler u1→u2 kısa yoldan)
  F.angleArc = (ctx, O, u1, u2, r, o = {}) => {
    let a1 = Math.atan2(u1[1], u1[0]), a2 = Math.atan2(u2[1], u2[0]);
    let da = a2 - a1; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    const pts = P.arc(O[0], O[1], r, a1, a1 + da * (o.k ?? 1), 30);
    if (o.fill) { P.fillPts(ctx, [O].concat(pts).concat([O]), o.fill, o.fillA ?? 0.35); }
    stroke(ctx, pts, { w: o.w ?? 3, color: o.color ?? PAL.ink, dry: false, taper: 0.05, seed: o.seed ?? 530 });
    return [O[0] + Math.cos(a1 + da / 2) * r, O[1] + Math.sin(a1 + da / 2) * r];
  };
  // iletki (normal yukarı, 0° = normal, iki yana 90°)
  F.protractor = (ctx, O, r, k = 1) => {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    const arc = P.arc(O[0], O[1], r, Math.PI, 2 * Math.PI, 60);
    P.fillPts(ctx, [[O[0] - r, O[1]]].concat(arc).concat([[O[0] + r, O[1]]]), 'rgba(250,246,236,0.55)');
    stroke(ctx, arc, { w: 2.2, color: PAL.water, dry: false, seed: 540 });
    for (let dgr = -90; dgr <= 90; dgr += 5) {
      const a = -Math.PI / 2 + dgr * Math.PI / 180, L = dgr % 30 === 0 ? 26 : dgr % 10 === 0 ? 16 : 9;
      line(ctx, [O[0] + Math.cos(a) * r, O[1] + Math.sin(a) * r], [O[0] + Math.cos(a) * (r - L), O[1] + Math.sin(a) * (r - L)], { w: 1.4, color: PAL.water, dry: false, seed: 541 + dgr });
      if (dgr % 30 === 0) INK.label(ctx, Math.abs(dgr) + '°', O[0] + Math.cos(a) * (r + 30), O[1] + Math.sin(a) * (r + 30) + 10, { size: 26, align: 'center', color: PAL.water, rot: 0 });
    }
    ctx.restore();
  };

  // kol saati (yandan): cam yüzeyi merkez (x,y), eğim phi (radyan, 0 = yatay)
  F.watch = (ctx, x, y, phi, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(phi); ctx.scale(s, s);
    const strap = [[-150, 18], [-60, 14], [-60, 30], [-150, 34]], strap2 = [[60, 14], [150, 18], [150, 34], [60, 30]];
    [strap, strap2].forEach((p, i) => { P.fillPts(ctx, p.concat([p[0]]), '#8A6A45', 0.9); stroke(ctx, p.concat([p[0]]), { w: 2.2, closed: true, seed: 560 + i, dry: false }); });
    const cs = [[-62, 4], [62, 4], [58, 40], [-58, 40], [-62, 4]];
    P.fillPts(ctx, cs, '#B9B2A2'); stroke(ctx, cs, { w: 2.6, closed: true, seed: 563 });
    const gl = [[-56, 0], [56, 0], [56, 6], [-56, 6], [-56, 0]];
    P.fillPts(ctx, gl, '#EAF3F7'); line(ctx, [-56, 0], [56, 0], { w: 3.4, color: '#5B6B75', dry: false, taper: 0.02 });
    ctx.restore();
  };

  // kırmızı uyarı kartı
  F.warn = (ctx, x, y, w, h, k, lines, o = {}) => {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      const pts = [[x, y], [x + w, y - 5], [x + w + 5, y + h], [x + 3, y + h + 3], [x, y]];
      c.save(); c.shadowColor = 'rgba(60,20,10,0.25)'; c.shadowBlur = 18; P.fillPts(c, pts, '#FBEDE6'); c.restore();
      stroke(c, pts, { w: 4, closed: true, color: RED, seed: 570 });
      // üçgen işaret
      const tx = x + 80, ty = y + h / 2; const tri = [[tx, ty - 44], [tx + 46, ty + 36], [tx - 46, ty + 36], [tx, ty - 44]];
      P.fillPts(c, tri, '#F6D2C6'); stroke(c, tri, { w: 4, closed: true, color: RED, seed: 571 });
      INK.label(c, '!', tx, ty + 26, { size: 56, weight: 700, color: RED, align: 'center', rot: 0 });
      lines.forEach((l, i) => INK.label(c, l, x + 150, y + 64 + i * (o.lh ?? 56), { size: o.size ?? 44, weight: 700, color: i === 0 ? RED : PAL.ink, rot: -0.01 }));
    });
  };


  // çıplak ampul (noktasal kaynak); s=1 → cam yarıçapı 26 (film 13'ten)
  F.bulb = (ctx, x, y, s = 1, on = 1) => {
    if (on > 0) F.glow(ctx, x, y, 150 * s, on);
    const g = circlePts(x, y, 26 * s, 26 * s, 36);
    P.fillPts(ctx, g, on > 0.5 ? '#FFF3CF' : PAL.white, 0.95);
    if (on > 0) { ctx.save(); ctx.globalAlpha *= on; wash(ctx, g, PAL.light, 0.55, 51, { bleed: 1, blooms: 0 }); ctx.restore(); }
    const fp = []; for (let i = 0; i <= 8; i++) fp.push([x - 9 * s + i * 2.25 * s, y + (i % 2 ? -4 : 4) * s]);
    stroke(ctx, fp, { w: 1.6 * s, color: on > 0.5 ? '#8A4A10' : PAL.ink, dry: false, taper: 0 });
    stroke(ctx, g, { w: 2.6 * s, closed: true, seed: 52 });
    const b0 = y - 24 * s, b1 = y - 46 * s;
    const base = [[x - 13 * s, b0], [x + 13 * s, b0], [x + 11 * s, b1], [x - 11 * s, b1], [x - 13 * s, b0]];
    P.fillPts(ctx, base, '#B9B2A2'); stroke(ctx, base, { w: 2.2 * s, closed: true, seed: 53, dry: false });
    line(ctx, [x, b1], [x, b1 - 60 * s], { w: 2.4, seed: 54 });
  };
  // ışını kırık çizgiler üzerinde izle (en çok nb yansıma): [[p0,p1],[p1,p2],...]
  F.trace = (p, d, polys, nb = 2, Lend = 400) => {
    const segs = []; let cur = p, dir = V.norm(d);
    for (let b = 0; b <= nb; b++) {
      let best = null; polys.forEach(pl => { const h = F.hitPoly(cur, dir, pl); if (h && (!best || h.t < best.t)) best = h; });
      if (!best || b === nb) { segs.push([cur, V.add(cur, V.mul(dir, Lend))]); break; }
      segs.push([cur, best.q, best.n]); cur = V.add(best.q, V.mul(best.n, 0.01)); dir = V.reflect(dir, best.n);
    }
    return segs;
  };

  G.F611 = F;
})(window);

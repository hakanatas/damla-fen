// props.js — 7. sınıf Film 12'ye özel çizim yardımcıları (window.F712)
// Işık = kehribar. Işınlar DÜZ çizgi + ok ucu. Kırılma, Snell yasasının vektör biçimiyle
// (n1 sinθ1 = n2 sinθ2) İÇERİDE hesaplanır; filmde yasa adı ve formül gösterilmez (TYMM sınırlaması).
(function (G) {
  const { PAL, line, stroke, circlePts, arrowHead, wash, dashed } = G.INK;
  const F = {};
  const AMB = '#C07F1E', RED = '#A23A2A', DEG = Math.PI / 180;
  F.AMB = AMB; F.RED = RED; F.DEG = DEG;
  F.N = { hava: 1.00, su: 1.33, cam: 1.50 };

  // ---------- vektör yardımcıları (film 6-11'den) ----------
  const V = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, k) => [a[0] * k, a[1] * k], dot: (a, b) => a[0] * b[0] + a[1] * b[1],
    len: a => Math.hypot(a[0], a[1]), norm: a => { const L = Math.hypot(a[0], a[1]) || 1; return [a[0] / L, a[1] / L]; },
    angle: (a, b) => Math.acos(Math.max(-1, Math.min(1, (a[0] * b[0] + a[1] * b[1]) / ((Math.hypot(a[0], a[1]) || 1) * (Math.hypot(b[0], b[1]) || 1)))))
  };
  // kırılma: d gelen yön (birim), n yüzey normali (birim, gelen tarafa bakan: n·d < 0), n1 → n2
  V.refract = (d, n, n1, n2) => {
    let c = -V.dot(n, d); if (c < 0) { n = V.mul(n, -1); c = -c; }
    const eta = n1 / n2, k = 1 - eta * eta * (1 - c * c);
    if (k < 0) return null; // (tam yansıma — filmde bu duruma hiç girilmez)
    return V.norm(V.add(V.mul(d, eta), V.mul(n, eta * c - Math.sqrt(k))));
  };
  F.V = V;

  // gelme açısı (normalden, derece) → kırılma açısı (derece)
  F.refrAngle = (thDeg, n1, n2) => Math.asin(Math.sin(thDeg * DEG) * n1 / n2) / DEG;

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
  F.dline = (ctx, a, b, o = {}) => { // yoğun örneklenmiş kesikli çizgi
    if (!isFinite(a[0] + a[1] + b[0] + b[1])) return;
    const n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4)); const pts = [];
    for (let i = 0; i <= n; i++) pts.push(at(a, b, i / n));
    dashed(ctx, pts, { w: o.w ?? 2.6, on: o.on ?? 12, off: o.off ?? 9, color: o.color ?? PAL.water, alpha: o.alpha });
  };
  // ışık kutusu (fener biçimli, dar yarıklı): (x,y) = çıkış ağzı, a = ışık yönü
  F.lightbox = (ctx, x, y, a, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const body = [[-150, -30], [0, -30], [0, 30], [-150, 30], [-150, -30]];
    P.fillPts(ctx, body, '#5E7F93', 0.9); stroke(ctx, body, { w: 2.8, closed: true, seed: 81 });
    const slit = [[0, -8], [8, -8], [8, 8], [0, 8], [0, -8]];
    P.fillPts(ctx, slit, '#FFF1C4', 1); stroke(ctx, slit, { w: 2, closed: true, dry: false });
    line(ctx, [-110, -30], [-110, -40], { w: 6, seed: 83 });
    ctx.restore();
  };
  F.card = (ctx, x, y, w, h, o = {}) => {
    const pts = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; ctx.shadowOffsetY = 6; P.fillPts(ctx, pts, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 91 });
    return pts;
  };
  // iki doğrultu arası açı yayı (merkez O, u1→u2 kısa yoldan)
  F.angleArc = (ctx, O, u1, u2, r, o = {}) => {
    let a1 = Math.atan2(u1[1], u1[0]), a2 = Math.atan2(u2[1], u2[0]);
    let da = a2 - a1; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    const pts = P.arc(O[0], O[1], r, a1, a1 + da * (o.k ?? 1), 30);
    if (o.fill) { P.fillPts(ctx, [O].concat(pts).concat([O]), o.fill, o.fillA ?? 0.3); }
    stroke(ctx, pts, { w: o.w ?? 3, color: o.color ?? PAL.ink, dry: false, taper: 0.05, seed: o.seed ?? 530 });
    return [O[0] + Math.cos(a1 + da / 2) * r, O[1] + Math.sin(a1 + da / 2) * r];
  };

  // ---------- ortamlar ----------
  // yandan görünen kap: üst yüzey ySurf, taban y1; x0..x1. medium: 'su' | 'cam'
  F.medium = (ctx, x0, x1, ySurf, y1, medium = 'su', o = {}) => {
    const box = [[x0, ySurf], [x1, ySurf], [x1, y1], [x0, y1], [x0, ySurf]];
    if (medium === 'cam') {
      P.fillPts(ctx, box, '#DDE8EC', 0.95); wash(ctx, box, '#7FA3B3', 0.35, o.seed ?? 710, { bleed: 1.5, blooms: 1 });
      for (let i = 0; i < 4; i++) line(ctx, [x0 + 30 + i * 22, ySurf + 14], [x0 + 10 + i * 22, ySurf + 60], { w: 1.4, alpha: 0.35, dry: false, color: '#FBF8F1', seed: 711 + i });
      stroke(ctx, box, { w: 3, closed: true, seed: 712, color: '#4E6A78' });
    } else {
      P.fillPts(ctx, box, '#D9E6EC', 0.9); wash(ctx, box, PAL.water, 0.32, o.seed ?? 713, { bleed: 2, blooms: 2 });
      stroke(ctx, [[x0, ySurf], [x1, ySurf]], { w: 3.4, seed: 714, color: PAL.water, taper: 0.01 });
      if (o.walls !== false) { stroke(ctx, [[x0, ySurf - 70], [x0, y1], [x1, y1], [x1, ySurf - 70]], { w: 3.2, seed: 715, taper: 0.01 }); }
    }
  };

  // kurşun kalem (a: arka uç, b: sivri uç); alpha ile hayalet çizim
  F.pencil = (ctx, a, b, o = {}) => {
    const u = V.norm(V.sub(b, a)), nrm = [-u[1], u[0]], w = o.w ?? 14, L = V.len(V.sub(b, a));
    const cone = Math.min(46, L * 0.25), c0 = V.sub(b, V.mul(u, cone));
    const P0 = V.add(a, V.mul(nrm, w)), P1 = V.add(c0, V.mul(nrm, w)), P2 = V.sub(c0, V.mul(nrm, w)), P3 = V.sub(a, V.mul(nrm, w));
    ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    const body = [P0, P1, P2, P3, P0];
    P.fillPts(ctx, body, o.fill ?? '#E3B04A', 0.95);
    line(ctx, V.add(a, V.mul(nrm, w * 0.33)), V.add(c0, V.mul(nrm, w * 0.33)), { w: 1.2, alpha: 0.4, dry: false });
    line(ctx, V.sub(a, V.mul(nrm, w * 0.33)), V.sub(c0, V.mul(nrm, w * 0.33)), { w: 1.2, alpha: 0.4, dry: false });
    const tip = [P1, b, P2, P1];
    P.fillPts(ctx, tip, '#EBD3A8', 1);
    const lead = [V.add(V.sub(b, V.mul(u, cone * 0.35)), V.mul(nrm, w * 0.35)), b, V.sub(V.sub(b, V.mul(u, cone * 0.35)), V.mul(nrm, w * 0.35))];
    P.fillPts(ctx, lead, PAL.ink, 0.9);
    stroke(ctx, body, { w: 2.2, closed: true, seed: o.seed ?? 720, dry: false });
    stroke(ctx, tip, { w: 2.2, closed: true, seed: (o.seed ?? 720) + 1, dry: false });
    if (o.eraser !== false) { const e0 = V.sub(a, V.mul(u, 22)); const er = [V.add(a, V.mul(nrm, w)), V.add(e0, V.mul(nrm, w)), V.sub(e0, V.mul(nrm, w)), V.sub(a, V.mul(nrm, w))]; P.fillPts(ctx, er, '#D98C8C', 0.9); stroke(ctx, er.concat([er[0]]), { w: 2, closed: true, dry: false }); }
    ctx.restore();
  };

  // su-hava yüzeyinde (y = ySurf) kırılan ışının, su içindeki T noktasından çıkıp gözdeki Eye'a ulaştığı yüzey noktasını bul (ikiye bölme)
  F.surfPoint = (T, Eye, ySurf, n1 = 1.33, n2 = 1.0) => {
    // x arttıkça havadaki kırılan ışının Eye'a göre hangi yanda kaldığını ölç
    const miss = x => { const S = [x, ySurf]; const d = V.norm(V.sub(S, T)); const r = V.refract(d, [0, 1], n1, n2); if (!r) return (Eye[0] < T[0] ? 1e9 : -1e9); const w = V.sub(Eye, S); return r[0] * w[1] - r[1] * w[0]; };
    let lo = Math.min(T[0], Eye[0]), hi = Math.max(T[0], Eye[0]);
    let flo = miss(lo);
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2, fm = miss(m); if (Math.sign(fm) === Math.sign(flo)) { lo = m; flo = fm; } else hi = m; }
    return [(lo + hi) / 2, ySurf];
  };
  // görünür (sanal) nokta: göze giden, birbirine çok yakın iki ışının geriye uzantılarının kesişimi
  F.apparent = (T, Eye, ySurf, n1 = 1.33, n2 = 1.0) => {
    const S1 = F.surfPoint(T, Eye, ySurf, n1, n2);
    const toE = V.norm(V.sub(Eye, S1)), perp = [-toE[1], toE[0]];
    const S2 = F.surfPoint(T, V.add(Eye, V.mul(perp, 3)), ySurf, n1, n2);
    const d1 = V.norm(V.sub(Eye, S1)), d2 = V.norm(V.sub(V.add(Eye, V.mul(perp, 3)), S2));
    // S1 - s d1 = S2 - u d2 çöz
    const a = -d1[0], b = d2[0], c = -d1[1], d = d2[1], ex = S2[0] - S1[0], ey = S2[1] - S1[1];
    const det = a * d - b * c; const s = (ex * d - b * ey) / det;
    return { S: S1, A: [S1[0] - d1[0] * s, S1[1] - d1[1] * s] };
  };

  F.warnTri = (ctx, x, y, s = 1) => {
    const tri = [[x, y - 44 * s], [x + 46 * s, y + 36 * s], [x - 46 * s, y + 36 * s], [x, y - 44 * s]];
    P.fillPts(ctx, tri, '#F6D2C6'); stroke(ctx, tri, { w: 4, closed: true, color: RED, seed: 571 });
    INK.label(ctx, '!', x, y + 26 * s, { size: 56 * s, weight: 700, color: RED, align: 'center', rot: 0 });
  };

  G.F712 = F;
})(window);

// props.js — 6. sınıf Film 12'ye özel çizim yardımcıları (window.F612)
// Işık = kehribar (#C07F1E). Küresel ayna yansıması VEKTÖRLE hesaplanır: r = d − 2(d·n)n, n = çemberin o noktadaki normali.
// Film 11 (F611) yardımcılarının kopyası + küresel ayna, yuvarlak ayna, çaydanlık, ambulans, kaşık.
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
  // iki doğrultu arası açı yayı (merkez O, yönler u1→u2 kısa yoldan)
  F.angleArc = (ctx, O, u1, u2, r, o = {}) => {
    let a1 = Math.atan2(u1[1], u1[0]), a2 = Math.atan2(u2[1], u2[0]);
    let da = a2 - a1; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI;
    const pts = P.arc(O[0], O[1], r, a1, a1 + da * (o.k ?? 1), 30);
    if (o.fill) { P.fillPts(ctx, [O].concat(pts).concat([O]), o.fill, o.fillA ?? 0.35); }
    stroke(ctx, pts, { w: o.w ?? 3, color: o.color ?? PAL.ink, dry: false, taper: 0.05, seed: o.seed ?? 530 });
    return [O[0] + Math.cos(a1 + da / 2) * r, O[1] + Math.sin(a1 + da / 2) * r];
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

  // ---------- küresel ayna (kesit): merkez C, yarıçap R, yay açıları a0..a1 ----------
  // type 'concave': ışık çemberin içinden gelir (uzak kesişim), n = C'ye doğru
  // type 'convex' : ışık dışarıdan gelir (yakın kesişim), n = dışa doğru
  F.hitArc = (p, d, C, R, a0, a1, type) => {
    const pc = V.sub(p, C), b = V.dot(d, pc), c = V.dot(pc, pc) - R * R, disc = b * b - c;
    if (disc < 0) return null;
    const sq = Math.sqrt(disc), ts = type === 'concave' ? [-b + sq] : [-b - sq];
    for (const t of ts) {
      if (t <= 1e-6) continue; const q = V.add(p, V.mul(d, t));
      let a = Math.atan2(q[1] - C[1], q[0] - C[0]);
      const inSpan = (x) => { let lo = Math.min(a0, a1), hi = Math.max(a0, a1); for (const k of [-2, -1, 0, 1, 2]) { const y = x + k * 2 * Math.PI; if (y >= lo && y <= hi) return true; } return false; };
      if (!inSpan(a)) continue;
      const n = type === 'concave' ? V.norm(V.sub(C, q)) : V.norm(V.sub(q, C));
      return { t, q, n };
    }
    return null;
  };
  // paralel ışın demeti: yüzeyden yansıyan ışınları hesapla → [{p, q, r}]
  F.beamArc = (ps, d, C, R, a0, a1, type) => ps.map(p => { const h = F.hitArc(p, d, C, R, a0, a1, type); return h ? { p, q: h.q, n: h.n, r: V.reflect(d, h.n) } : null; }).filter(Boolean);
  // kesit çizimi: yansıtıcı yüzey + arka tarama (arka taraf: concave → dış, convex → iç)
  F.arcMirror = (ctx, C, R, a0, a1, type, o = {}) => {
    const pts = P.arc(C[0], C[1], R, a0, a1, 50);
    const back = P.arc(C[0], C[1], type === 'concave' ? R + 18 : R - 18, a0, a1, 50);
    P.fillPts(ctx, pts.concat(back.slice().reverse()), '#DCE6EC', 0.95);
    for (let i = 2; i < 50; i += 3) line(ctx, pts[i], back[i + 1] || back[i], { w: 1.3, dry: false, seed: 900 + i });
    stroke(ctx, pts, { w: 4.4, color: '#5B6B75', seed: o.seed ?? 901, taper: 0.02 });
  };

  // yuvarlak ayna (önden): içerik fn(ctx) ayna içinde kırpılarak çizilir
  F.roundMirror = (ctx, x, y, r, fn, o = {}) => {
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.1, x, y, r);
    g.addColorStop(0, '#F4F8FA'); g.addColorStop(1, o.edge ?? '#B9C7CF');
    const c = circlePts(x, y, r, r, 60);
    P.fillPts(ctx, c, g);
    if (fn) { ctx.save(); P.path(ctx, c); ctx.clip(); fn(ctx); ctx.restore(); }
    // parlama
    ctx.save(); ctx.globalAlpha *= 0.5; stroke(ctx, P.arc(x, y, r * 0.8, Math.PI * 1.1, Math.PI * 1.4, 16), { w: 6, color: '#FFFFFF', dry: false }); ctx.restore();
    const fr = circlePts(x, y, r + 12, r + 12, 60);
    stroke(ctx, fr, { w: 10, closed: true, color: o.frame ?? '#8A6A45', seed: 910, dry: false });
    stroke(ctx, c, { w: 2.4, closed: true, seed: 911, dry: false });
  };

  // çaydanlık (paslanmaz çelik), gövde merkezi (x,y); içerik fn gövdeye kırpılır
  F.kettle = (ctx, x, y, s, fn) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = circlePts(0, 0, 150, 120, 60);
    const spout = [[120, -10], [230, -110], [245, -100], [150, 40]];
    P.fillPts(ctx, spout.concat([spout[0]]), '#B9C3C9'); stroke(ctx, spout.concat([spout[0]]), { w: 3, closed: true, seed: 920 });
    const g = ctx.createRadialGradient(-50, -50, 10, 0, 0, 170); g.addColorStop(0, '#F6F9FA'); g.addColorStop(0.6, '#C9D2D7'); g.addColorStop(1, '#8E9BA3');
    P.fillPts(ctx, body, g);
    if (fn) { ctx.save(); P.path(ctx, body); ctx.clip(); fn(ctx); ctx.restore(); }
    stroke(ctx, body, { w: 3.4, closed: true, seed: 921 });
    stroke(ctx, P.arc(0, -80, 120, Math.PI * 1.1, Math.PI * 1.9, 30), { w: 9, color: '#3A3A40', seed: 922 });
    const lid = circlePts(0, -118, 70, 16, 30); P.fillPts(ctx, lid, '#C9D2D7'); stroke(ctx, lid, { w: 2.6, closed: true, seed: 923 });
    ctx.save(); ctx.globalAlpha *= 0.6; stroke(ctx, P.arc(0, 0, 118, Math.PI * 1.08, Math.PI * 1.35, 14), { w: 7, color: '#FFFFFF', dry: false }); ctx.restore();
    ctx.restore();
  };

  // ambulansın önden görünüşü; yazı TERS (ayna yazısı) yazılır. (x,y) = alt orta
  F.ambulance = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-230, 0], [-230, -330], [-200, -360], [200, -360], [230, -330], [230, 0], [-230, 0]];
    P.fillPts(ctx, body, '#FBF8F1'); stroke(ctx, body, { w: 3.4, closed: true, seed: 930 });
    const ws = [[-190, -330], [190, -330], [200, -210], [-200, -210], [-190, -330]];
    P.fillPts(ctx, ws, '#BCD3DF'); stroke(ctx, ws, { w: 3, closed: true, seed: 931 });
    P.fillPts(ctx, [[-230, -120], [230, -120], [230, -95], [-230, -95]], PAL.water, 0.8);
    // tepe lambası (kehribar)
    const lb = [[-60, -360], [60, -360], [50, -392], [-50, -392], [-60, -360]]; P.fillPts(ctx, lb, PAL.light, 0.6 + 0.4 * Math.abs(Math.sin(t * 5))); stroke(ctx, lb, { w: 2.6, closed: true, seed: 932 });
    // farlar, tekerlekler
    [-160, 160].forEach((fx, i) => { const f = circlePts(fx, -50, 30, 22, 20); P.fillPts(ctx, f, '#FFF1C4'); stroke(ctx, f, { w: 2.4, closed: true, seed: 933 + i }); });
    [-170, 170].forEach((wx, i) => P.fillPts(ctx, [[wx - 35, 0], [wx + 35, 0], [wx + 35, 30], [wx - 35, 30]], PAL.ink, 0.9));
    // ters yazı
    ctx.save(); ctx.translate(0, -140); ctx.scale(-1, 1); ctx.font = '700 64px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.water; ctx.fillText('AMBULANS', 0, 0); ctx.restore();
    ctx.restore();
  };

  // kaşık: (x,y) kepçe merkezi; side 'in' (iç, çukur) ya da 'out' (sırt, tümsek)
  F.spoon = (ctx, x, y, s, side) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const h = [[-10, 90], [10, 90], [16, 330], [-16, 330], [-10, 90]]; P.fillPts(ctx, h, '#C9D2D7'); stroke(ctx, h, { w: 2.6, closed: true, seed: 940 });
    const b = circlePts(0, 0, 70, 100, 50);
    const g = side === 'in' ? ctx.createRadialGradient(0, 20, 5, 0, 0, 110) : ctx.createRadialGradient(-25, -35, 5, 0, 0, 110);
    if (side === 'in') { g.addColorStop(0, '#8E9BA3'); g.addColorStop(1, '#EEF3F5'); } else { g.addColorStop(0, '#FFFFFF'); g.addColorStop(1, '#9AA6AD'); }
    P.fillPts(ctx, b, g); stroke(ctx, b, { w: 3, closed: true, seed: 941 });
    ctx.restore();
  };

  G.F612 = F;
})(window);

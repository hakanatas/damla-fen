// props.js — 6. sınıf Ünite 6 (Elektriğin İletimi ve Direnç) devre çizim yardımcıları → window.CK
// Gerçekçi devre elemanları (pil, pil yatağı, ampul, duy, anahtar, kablo) + TS/IEC tarzı semboller + devre şeması.
// Temel kısım 5. sınıf 22–24. filmlerin props.js dosyasından kopyalandı (6. sınıf etiketleriyle). Filme özel ekler dosyanın sonunda.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const P = G.P;
  const CK = {};
  const RED = CK.RED = '#A23A2A', AMB = PAL.light, AMBD = CK.AMBD = '#C07F1E', COPPER = CK.COPPER = '#B8742E';
  const rect = CK.rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
  const densify = CK.densify = (pts) => pts.flatMap((p, i, a) => i < a.length - 1 ? [p, [(p[0] + a[i + 1][0]) / 2, (p[1] + a[i + 1][1]) / 2]] : [p]);
  const W = (ctx, x, y, s, fn) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); };
  const T = (x, y, s, p) => [x + p[0] * s, y + p[1] * s];

  // ---------- paper card with soft shadow ----------
  CK.card = (ctx, x, y, w, h, o = {}) => {
    const pts = wobble(densify(densify([[x, y], [x + w, y + 3], [x + w - 2, y + h], [x + 2, y + h - 3], [x, y]])), o.wob ?? 1.2, o.seed ?? 21);
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, pts, o.fill ?? '#FAF6EC', o.alpha ?? 1); ctx.restore();
    stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: (o.seed ?? 21) + 1 });
    return pts;
  };

  // ---------- light glow for a lit bulb (b: brightness 0..~1.4) ----------
  CK.glow = (ctx, x, y, b, s = 1) => {
    if (b <= 0.01) return;
    const R = (60 + 150 * b) * s;
    const g = ctx.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, `rgba(240,190,90,${Math.min(0.85, 0.25 + 0.45 * b)})`); g.addColorStop(0.45, `rgba(227,160,58,${Math.min(0.45, 0.12 + 0.25 * b)})`); g.addColorStop(1, 'rgba(227,160,58,0)');
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill(); ctx.restore();
  };
  CK.rays = (ctx, x, y, b, s = 1, t = 0) => {
    if (b <= 0.05) return; const n = 12;
    for (let i = 0; i < n; i++) {
      const a = i / n * 6.283 + 0.13, r1 = (52 + 6 * b) * s, r2 = r1 + (10 + 38 * b) * s * (1 + 0.06 * Math.sin(t * 3 + i));
      line(ctx, [x + Math.cos(a) * r1, y + Math.sin(a) * r1], [x + Math.cos(a) * r2, y + Math.sin(a) * r2], { w: (1.6 + 1.4 * Math.min(1, b)) * s, color: AMBD, alpha: Math.min(1, 0.35 + 0.6 * b), dry: false, seed: 800 + i });
    }
  };

  // =============== GERÇEKÇİ ELEMANLAR ===============
  // pil (yatay; + ucu sağda). (x,y) merkez. Döndürür: {neg, pos}
  CK.battery = (ctx, x, y, s = 1, o = {}) => {
    W(ctx, x, y, s, () => {
      if (o.rot) ctx.rotate(o.rot);
      const body = densify(densify([[-80, -30], [70, -30], [70, 30], [-80, 30], [-80, -30]]));
      P.fillPts(ctx, body, '#EDE6D6'); wash(ctx, body, '#3F3B45', 0.8, 31, { bleed: 1, blooms: 0 });
      const band = rect(20, -30, 50, 60); wash(ctx, band, AMB, 0.85, 32, { bleed: 0.8, blooms: 0 });
      const nub = rect(70, -11, 13, 22); P.fillPts(ctx, nub, '#B8B2A6'); stroke(ctx, nub, { w: 2.2, closed: true, dry: false, seed: 33 });
      stroke(ctx, body, { w: 3, closed: true, seed: 34 });
      line(ctx, [-62, -20], [10, -20], { w: 2.2, color: PAL.white, alpha: 0.45, dry: false });
      ctx.font = '700 34px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('+', 46, 12);
      ctx.fillStyle = PAL.white; ctx.fillText('−', -56, 12);
    });
    const c = Math.cos(o.rot ?? 0), sn = Math.sin(o.rot ?? 0);
    return { neg: [x + (-80 * c) * s, y + (-80 * sn) * s], pos: [x + (83 * c) * s, y + (83 * sn) * s] };
  };
  // pil yatağı (içinde pil olabilir). Uçlar: sol (−) ve sağ (+) metal dil
  CK.holder = (ctx, x, y, s = 1, o = {}) => {
    W(ctx, x, y, s, () => {
      const tray = densify(densify([[-112, -40], [112, -40], [112, 40], [-112, 40], [-112, -40]]));
      P.fillPts(ctx, tray, '#E6DCC6'); wash(ctx, tray, '#5B5560', 0.55, 41, { bleed: 1, blooms: 0 });
      stroke(ctx, tray, { w: 3, closed: true, seed: 42 });
      // yay (−) ve düz plaka (+)
      const sp = []; for (let i = 0; i <= 40; i++) { const u = i / 40; sp.push([-104 + u * 22, Math.sin(u * Math.PI * 9) * 18]); }
      stroke(ctx, sp, { w: 2.6, color: '#8C877E', dry: false, seed: 43 });
      stroke(ctx, rect(96, -22, 7, 44), { w: 2.4, closed: true, color: '#8C877E', dry: false });
      // uç dilleri
      [[-112, 1], [112, -1]].forEach(([ex, d], i) => { const tab = rect(ex - (d > 0 ? 26 : 0), 22, 26, 12); P.fillPts(ctx, tab, COPPER, 0.85); stroke(ctx, tab, { w: 2, closed: true, dry: false, seed: 44 + i }); });
      if (o.battery !== false) CK.battery(ctx, -6, 0, 0.98);
    });
    return { neg: T(x, y, s, [-128, 28]), pos: T(x, y, s, [128, 28]) };
  };
  // duy: (x,y) taban ortası. top: ampulün oturduğu nokta
  CK.socket = (ctx, x, y, s = 1) => {
    W(ctx, x, y, s, () => {
      const base = densify([[-66, -14], [66, -14], [70, 0], [-70, 0], [-66, -14]]);
      P.fillPts(ctx, base, '#E6DCC6'); wash(ctx, base, '#8A6A45', 0.5, 51, { bleed: 1, blooms: 0 }); stroke(ctx, base, { w: 2.6, closed: true, seed: 52 });
      const cup = densify([[-30, -50], [30, -50], [34, -14], [-34, -14], [-30, -50]]);
      P.fillPts(ctx, cup, '#EDE6D6'); wash(ctx, cup, '#3F3B45', 0.45, 53, { bleed: 1, blooms: 0 }); stroke(ctx, cup, { w: 2.8, closed: true, seed: 54 });
      [-50, 50].forEach((ex, i) => { P.fillPts(ctx, circlePts(ex, -7, 8, 5, 16), COPPER, 0.9); stroke(ctx, circlePts(ex, -7, 8, 5, 16), { w: 1.8, closed: true, dry: false, seed: 55 + i }); });
    });
    return { a: T(x, y, s, [-50, -7]), b: T(x, y, s, [50, -7]), top: T(x, y, s, [0, -44]) };
  };
  // ampul: (x,y) vida tabanının altı. b: parlaklık (0 = sönük)
  CK.bulb = (ctx, x, y, s = 1, b = 0, t = 0, o = {}) => {
    const gc = T(x, y, s, [0, -82]);
    if (b > 0 && o.glow !== false) CK.glow(ctx, gc[0], gc[1], b, s);
    W(ctx, x, y, s, () => {
      // vida
      const base = rect(-17, -36, 34, 34); P.fillPts(ctx, base, '#B8B2A6'); stroke(ctx, base, { w: 2.4, closed: true, dry: false, seed: 61 });
      for (let i = 0; i < 4; i++) line(ctx, [-17, -30 + i * 8], [17, -26 + i * 8], { w: 1.6, alpha: 0.7, dry: false, seed: 62 + i });
      P.fillPts(ctx, rect(-7, -2, 14, 7), PAL.ink, 0.9);
      // cam
      const glass = circlePts(0, -82, 42, 42, 60).filter(p => p[1] < -48 || Math.abs(p[0]) > 30);
      const neck = [[-17, -36], [-26, -52]].concat(P.arc(0, -82, 42, Math.PI * 0.77, Math.PI * 2.23, 50)).concat([[26, -52], [17, -36]]);
      P.fillPts(ctx, neck, b > 0 ? '#FFF1C9' : PAL.white, b > 0 ? 0.6 + Math.min(0.4, b * 0.35) : 0.65);
      if (b > 0) P.fillPts(ctx, neck, AMB, Math.min(0.5, 0.12 + 0.3 * b));
      else wash(ctx, neck, PAL.water, 0.1, 63, { bleed: 0.6, blooms: 0 });
      stroke(ctx, neck, { w: 3, seed: 64 });
      // tel
      const fc = b > 0 ? '#B35F12' : PAL.ink;
      line(ctx, [-7, -36], [-11, -80], { w: 1.8, dry: false, color: PAL.inkSoft, seed: 65 }); line(ctx, [7, -36], [11, -80], { w: 1.8, dry: false, color: PAL.inkSoft, seed: 66 });
      const fil = []; for (let i = 0; i <= 30; i++) { const u = i / 30; fil.push([-11 + u * 22, -82 + Math.sin(u * Math.PI * 8) * 4]); }
      stroke(ctx, fil, { w: b > 0 ? 3 : 2, color: fc, dry: false, seed: 67 });
      line(ctx, [-24, -98], [-14, -114], { w: 3, color: PAL.white, alpha: 0.8, dry: false });
    });
    if (b > 0 && o.rays !== false) CK.rays(ctx, gc[0], gc[1], b, s, t);
    return { center: gc, tip: T(x, y, s, [0, 4]), side: T(x, y, s, [17, -20]) };
  };
  // anahtar (bıçaklı tip). k: 0 açık → 1 kapalı. Uçlar: a, b
  CK.switch = (ctx, x, y, s = 1, k = 0) => {
    W(ctx, x, y, s, () => {
      const board = densify(densify([[-96, -26], [96, -26], [96, 0], [-96, 0], [-96, -26]]));
      P.fillPts(ctx, board, '#EDE0C4'); wash(ctx, board, '#8A6A45', 0.55, 71, { bleed: 1, blooms: 0 }); stroke(ctx, board, { w: 2.6, closed: true, seed: 72 });
      const hinge = rect(-66, -44, 14, 18), clip = rect(52, -44, 16, 18);
      [hinge, clip].forEach((r, i) => { P.fillPts(ctx, r, '#B8B2A6'); stroke(ctx, r, { w: 2, closed: true, dry: false, seed: 73 + i }); });
      [-82, 82].forEach((ex, i) => { P.fillPts(ctx, circlePts(ex, -13, 8, 6, 16), COPPER, 0.9); stroke(ctx, circlePts(ex, -13, 8, 6, 16), { w: 1.8, closed: true, dry: false, seed: 75 + i }); });
      const a = -(1 - k) * 0.72; const L = 140;
      const p0 = [-59, -40], p1 = [p0[0] + Math.cos(a) * L, p0[1] + Math.sin(a) * L];
      line(ctx, p0, p1, { w: 7, color: '#8C877E', dry: false, taper: 0.02 }); line(ctx, p0, p1, { w: 2, color: PAL.ink, dry: false, alpha: 0.6 });
      const hx = p0[0] + Math.cos(a) * (L + 14), hy = p0[1] + Math.sin(a) * (L + 14);
      P.fillPts(ctx, circlePts(hx, hy, 14, 9, 20, a), PAL.ink, 0.9);
      inkDot(ctx, p0[0], p0[1], 4);
    });
    return { a: T(x, y, s, [-82, -13]), b: T(x, y, s, [82, -13]) };
  };
  // bağlantı kablosu: a→b, sarkma ile. o: {sag, c:[kontrol], color, k}
  CK.wire = (ctx, a, b, o = {}) => {
    const c = o.c ?? [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + (o.sag ?? 40)];
    const pts = P.bez(a, c, b, 40); const k = o.k ?? 1; if (k <= 0) return pts;
    const col = o.color ?? '#2E6A8C';
    P.drawOn(ctx, pts, k, { w: (o.w ?? 7), color: col, dry: false });
    P.drawOn(ctx, pts, k, { w: (o.w ?? 7) * 0.25, color: PAL.white, alpha: 0.35, dry: false });
    inkDot(ctx, a[0], a[1], 4.5, { color: '184,116,46' });
    if (k >= 0.98) inkDot(ctx, b[0], b[1], 4.5, { color: '184,116,46' });
    return pts;
  };
  // tek başına bir kablo (eleman kartı için): kıvrımlı, iki ucu soyulmuş
  CK.cable = (ctx, x, y, s = 1, color = '#2E6A8C') => {
    W(ctx, x, y, s, () => {
      const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([-90 + u * 180, Math.sin(u * Math.PI * 2.2) * 28]); }
      stroke(ctx, pts, { w: 9, color, dry: false, taper: 0.02 });
      stroke(ctx, pts, { w: 2.4, color: PAL.white, alpha: 0.35, dry: false, taper: 0.02 });
      const e0 = pts[0], e1 = pts[60];
      line(ctx, e0, [e0[0] - 18, e0[1] + 2], { w: 3.4, color: COPPER, dry: false, taper: 0.1 });
      line(ctx, e1, [e1[0] + 18, e1[1] - 4], { w: 3.4, color: COPPER, dry: false, taper: 0.1 });
    });
  };
  // priz simgesi (güvenlik kartı için)
  CK.outlet = (ctx, x, y, s = 1) => {
    W(ctx, x, y, s, () => {
      const plate = densify(densify([[-60, -60], [60, -60], [60, 60], [-60, 60], [-60, -60]]));
      P.fillPts(ctx, plate, PAL.white); stroke(ctx, plate, { w: 3, closed: true, seed: 81 });
      stroke(ctx, circlePts(0, 0, 40, 40, 40), { w: 2.6, closed: true, seed: 82 });
      [-15, 15].forEach(dx => P.fillPts(ctx, circlePts(dx, 0, 7, 7, 14), PAL.ink));
    });
  };

  // =============== SEMBOLLER (TS/IEC) ===============
  // Hepsi (x,y) merkezli, yatay; rot ile döndürülür. L: uç (bağlantı) yarı uzunluğu. o.k: 0..1 çizim ilerlemesi
  const SW = 4.2;
  const segs = (ctx, list, k, w = SW) => { list.forEach(([a, b], i) => { const kk = E.clamp(k * list.length - i); if (kk > 0) P.drawOn(ctx, [a, [E.lerp(a[0], b[0], kk), E.lerp(a[1], b[1], kk)]], 1, { w, dry: false, taper: 0.04 }); }); };
  CK.symL = (type, n = 1) => type === 'pil' ? 58 + (n - 1) * 20 : type === 'ampul' ? 58 : type === 'anahtar' ? 58 : 58;
  CK.sym = (ctx, type, x, y, s = 1, o = {}) => {
    const k = o.k ?? 1; if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s);
    const L = o.L ?? CK.symL(type, o.n ?? 1);
    if (type === 'pil') {
      const n = o.n ?? 1, gap = 40;
      const xs = []; for (let i = 0; i < n; i++) xs.push((i - (n - 1) / 2) * gap);
      const list = [[[-L, 0], [xs[0] - 7, 0]]];
      xs.forEach((cx, i) => { if (i > 0) list.push([[xs[i - 1] + 7, 0], [cx - 7, 0]]); });
      list.push([[xs[n - 1] + 7, 0], [L, 0]]);
      if (o.leads !== false) segs(ctx, list, k);
      const kp = E.seg(k, 0.2, 0.8);
      xs.forEach((cx, i) => {
        P.drawOn(ctx, [[cx - 7, -36], [cx - 7, 36]], kp, { w: SW, dry: false, taper: 0.04 });   // uzun çizgi (+)
        P.drawOn(ctx, [[cx + 7, -18], [cx + 7, 18]], kp, { w: SW * 2.3, dry: false, taper: 0.02 }); // kısa kalın çizgi (−)
      });
      if (o.pm && k > 0.7) [['+', xs[0] - 26], ['−', xs[n - 1] + 26]].forEach(([ch, px]) => { ctx.save(); ctx.globalAlpha *= E.seg(k, 0.7, 1); ctx.translate(px, -58); ctx.rotate(-(o.rot ?? 0)); ctx.font = '700 40px Kalam'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.ink; ctx.fillText(ch, 0, 0); ctx.restore(); });
    } else if (type === 'ampul') {
      const b = o.lit ?? 0;
      if (b > 0) { const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 30 + 60 * b); g.addColorStop(0, `rgba(227,160,58,${Math.min(0.8, 0.3 + 0.4 * b)})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 30 + 60 * b, 0, 7); ctx.fill(); }
      if (o.leads !== false) segs(ctx, [[[-L, 0], [-28, 0]], [[28, 0], [L, 0]]], k);
      const kc = E.seg(k, 0.1, 0.7);
      if (o.fill !== false) P.fillPts(ctx, circlePts(0, 0, 28, 28, 40), b > 0 ? '#FBE7B8' : PAL.white, kc > 0 ? 0.9 : 0);
      P.drawOn(ctx, P.arc(0, 0, 28, Math.PI, Math.PI * 3, 48), kc, { w: SW, dry: false, taper: 0.02 });
      const kx = E.seg(k, 0.6, 1), d = 28 * 0.7071;
      P.drawOn(ctx, [[-d, -d], [d, d]], E.seg(kx, 0, 0.5), { w: SW * 0.85, dry: false, taper: 0.05 });
      P.drawOn(ctx, [[d, -d], [-d, d]], E.seg(kx, 0.5, 1), { w: SW * 0.85, dry: false, taper: 0.05 });
    } else if (type === 'anahtar') {
      const cl = o.closed ?? 0;
      if (o.leads !== false) segs(ctx, [[[-L, 0], [-34, 0]], [[34, 0], [L, 0]]], k);
      const kc = E.seg(k, 0.3, 0.8);
      if (kc > 0) [-29, 29].forEach(cx => { P.fillPts(ctx, circlePts(cx, 0, 5.5, 5.5, 16), PAL.white); P.drawOn(ctx, circlePts(cx, 0, 5.5, 5.5, 16), kc, { w: 2.8, dry: false, closed: true }); });
      const a = -(1 - cl) * 0.52, len = 60, p0 = [-26, -2];
      P.drawOn(ctx, [p0, [p0[0] + Math.cos(a) * len, p0[1] + Math.sin(a) * len]], E.seg(k, 0.6, 1), { w: SW, dry: false, taper: 0.04 });
    } else if (type === 'kablo') {
      segs(ctx, [[[-L, 0], [L, 0]]], k);
    }
    ctx.restore();
  };

  // =============== DEVRE ŞEMASI ===============
  // box {x0,y0,x1,y1}; comps: [{type, side:'top'|'right'|'bottom'|'left', f, n, closed, lit, id}]
  // o.k: 0..1 çizim ilerlemesi (çevre boyunca, sol üstten saat yönünde)
  CK.loop = (ctx, B, comps, o = {}) => {
    const k = o.k ?? 1, s = o.s ?? 1;
    const sides = [
      { id: 'top', a: [B.x0, B.y0], b: [B.x1, B.y0], rot: 0 },
      { id: 'right', a: [B.x1, B.y0], b: [B.x1, B.y1], rot: Math.PI / 2 },
      { id: 'bottom', a: [B.x1, B.y1], b: [B.x0, B.y1], rot: 0 },
      { id: 'left', a: [B.x0, B.y1], b: [B.x0, B.y0], rot: Math.PI / 2 }
    ];
    let acc = 0; const pieces = [], placed = [];
    sides.forEach(sd => {
      const len = Math.hypot(sd.b[0] - sd.a[0], sd.b[1] - sd.a[1]), dir = [(sd.b[0] - sd.a[0]) / len, (sd.b[1] - sd.a[1]) / len];
      const cs = comps.filter(c => c.side === sd.id).map(c => ({ c, u: c.f * len })).sort((p, q) => p.u - q.u);
      let cur = 0;
      cs.forEach(({ c, u }) => {
        const L = (c.L ?? CK.symL(c.type, c.n ?? 1)) * s;
        if (u - L > cur) pieces.push({ from: acc + cur, to: acc + u - L, a: [sd.a[0] + dir[0] * cur, sd.a[1] + dir[1] * cur], b: [sd.a[0] + dir[0] * (u - L), sd.a[1] + dir[1] * (u - L)] });
        placed.push({ c, at: acc + u, x: sd.a[0] + dir[0] * u, y: sd.a[1] + dir[1] * u, rot: sd.rot, L });
        cur = u + L;
      });
      pieces.push({ from: acc + cur, to: acc + len, a: [sd.a[0] + dir[0] * cur, sd.a[1] + dir[1] * cur], b: sd.b });
      acc += len;
    });
    const total = acc, prog = k * total;
    ctx.save(); if (o.alpha != null) ctx.globalAlpha *= o.alpha;
    pieces.forEach((pc, i) => {
      if (prog <= pc.from) return; const kk = E.clamp((prog - pc.from) / Math.max(1, pc.to - pc.from));
      const ln = Math.hypot(pc.b[0] - pc.a[0], pc.b[1] - pc.a[1]); if (ln < 1) return;
      stroke(ctx, [pc.a, [E.lerp(pc.a[0], pc.b[0], kk), E.lerp(pc.a[1], pc.b[1], kk)]], { w: (o.w ?? SW) * s, dry: false, taper: 0.0, seed: 900 + i, color: o.color });
    });
    // köşeler: küçük kare birleşim (dik açı)
    placed.forEach(p => {
      const kk = E.clamp((prog - (p.at - p.L)) / (2 * p.L)); if (kk <= 0) return;
      CK.sym(ctx, p.c.type, p.x, p.y, s, { rot: p.rot, k: kk, n: p.c.n, closed: p.c.closed, lit: p.c.lit, pm: p.c.pm, L: p.L / s });
    });
    ctx.restore();
    return placed;
  };

  // =============== ORTAK KARTLAR ===============
  CK.titleCard = (ctx, t, num, title, unit = 6) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + title, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  CK.endCard = (ctx, t, num, title, code) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, num + ' · ' + title, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // Elektrik güvenliği kartı. x,y sol üst; items zamanları t0'dan itibaren
  CK.safetyCard = (ctx, t, t0, x, y, o = {}) => {
    const w = o.w ?? 860, h = o.h ?? 780;
    CK.card(ctx, x, y, w, h, { color: RED, w: 3.2, seed: 88 });
    line(ctx, [x + 10, y + 80], [x + w - 10, y + 76], { w: 3, color: RED, dry: false });
    ctx.save(); ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  ELEKTRİK GÜVENLİĞİ', x + w / 2, y + 58); ctx.restore();
    const items = o.items ?? [];
    items.forEach((it, i) => {
      const at = t0 + (it.at ?? i * 2), yy = y + 150 + i * (o.gap ?? 150);
      const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
      ctx.save(); ctx.translate(x + 95, yy); ctx.scale(P.pop(k) * 1.15, P.pop(k) * 1.15); it.icon(ctx, t); ctx.restore();
      if (it.mark === 'x') P.cross(ctx, x + 95, yy, 52, E.se(t, at + 0.5, at + 1.1), { w: 9, color: RED });
      if (it.mark === 'ok') P.check(ctx, x + 172, yy + 4, 40, E.se(t, at + 0.5, at + 1.1), { w: 7, color: PAL.life });
      P.write(ctx, it.a, x + 210, yy + (it.b ? -6 : 14), E.seg(t, at + 0.2, at + 1.3), { size: 42, color: it.red ? RED : PAL.ink });
      if (it.b) P.write(ctx, it.b, x + 210, yy + 42, E.seg(t, at + 0.8, at + 1.9), { size: 32, weight: 400 });
    });
  };
  // kısa devre simgesi: pil + iki ucunu birleştiren tek kablo
  CK.shortIcon = (ctx, t) => { CK.battery(ctx, 0, 0, 0.5); CK.wire(ctx, [-40, 0], [42, 0], { c: [0, -70], w: 5 }); };

  // masa (ön görünüş): üst kenarı y0
  CK.table = (ctx, y0 = 800) => {
    const top = []; for (let i = 0; i <= 40; i++) top.push([-100 + i / 40 * 2120, y0 + Math.sin(i * 0.7) * 1.5]);
    const poly = top.concat([[2020, 1180], [-100, 1180]]);
    P.fillPts(ctx, poly, '#E9DCC0', 1); wash(ctx, poly, '#8A6A45', 0.28, 991, { bleed: 2, blooms: 2 });
    stroke(ctx, top, { w: 3.4, seed: 992, taper: 0.02 });
    for (let i = 0; i < 5; i++) { const yy = y0 + 40 + i * 50; const g = []; for (let j = 0; j <= 30; j++) g.push([-100 + j / 30 * 2120, yy + Math.sin(j * 0.9 + i) * 4]); stroke(ctx, g, { w: 1.2, alpha: 0.25, dry: false, seed: 993 + i, color: '#6B4E2E' }); }
  };
  // tam gerçekçi devre (ön görünüş): pil yatağı – anahtar – duy+ampul. k: anahtar kapalılık, b: parlaklık
  CK.realCircuit = (ctx, x, y, s, k, b, t) => {
    const h = CK.holder(ctx, x - 250 * s, y - 40 * s, s);
    const sw = CK.switch(ctx, x + 40 * s, y, s, k);
    const so = CK.socket(ctx, x + 300 * s, y, s);
    CK.wire(ctx, h.pos, sw.a, { sag: 40 * s });
    CK.wire(ctx, sw.b, so.a, { sag: 36 * s });
    CK.wire(ctx, so.b, h.neg, { c: [x + 20 * s, y - 330 * s], color: '#3A3842' });
    const bl = CK.bulb(ctx, so.top[0], so.top[1] + 6 * s, s, b, t);
    return { holder: h, sw, socket: so, bulb: bl };
  };

  // devre elemanları listesi: gerçekçi çizim (0,0 merkezli) + sembol türü (yoksa null)
  CK.ELEM = [
    { id: 'pil', name: 'pil', sym: 'pil', draw: (c, s) => CK.battery(c, 0, 0, s) },
    { id: 'ampul', name: 'ampul', sym: 'ampul', draw: (c, s, b = 0, t = 0) => CK.bulb(c, 0, 62 * s, s, b, t) },
    { id: 'anahtar', name: 'anahtar', sym: 'anahtar', draw: (c, s) => CK.switch(c, 0, 26 * s, s, 0) },
    { id: 'kablo', name: 'bağlantı kablosu', sym: 'kablo', draw: (c, s) => CK.cable(c, 0, 0, s) },
    { id: 'duy', name: 'duy', sym: null, draw: (c, s) => CK.socket(c, 0, 26 * s, s) },
    { id: 'yatak', name: 'pil yatağı', sym: null, draw: (c, s) => CK.holder(c, 0, -4 * s, s, { battery: false }) }
  ];
  // sembol kartı (kart eşleştirme)
  CK.symCard = (ctx, type, x, y, s = 1, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.rot) ctx.rotate(o.rot);
    const fl = o.flip ?? 1; // 1: yüzü açık, 0: arkası
    ctx.scale(Math.max(0.02, Math.abs(fl * 2 - 1)), 1);
    const w = o.w ?? 280, h = o.h ?? 100;
    if (fl < 0.5) {
      CK.card(ctx, -w / 2, -h / 2, w, h, { fill: '#F6E7B8', seed: 240 + (o.seed ?? 0), shadow: o.shadow });
      INK.hatch(ctx, -w / 2 + 16, 0, w - 32, h - 30, { n: 9, ang: -0.8, w: 2, alpha: 0.35, color: CK.AMBD, seed: 7 });
      ctx.font = '700 54px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = CK.AMBD; ctx.fillText('?', 0, 18);
    } else {
      CK.card(ctx, -w / 2, -h / 2, w, h, { fill: PAL.white, seed: 250 + (o.seed ?? 0), shadow: o.shadow });
      if (type === 'anahtar') { CK.sym(ctx, 'anahtar', -w / 4 + 4, 8, 0.72, { closed: 0 }); CK.sym(ctx, 'anahtar', w / 4 - 4, 8, 0.72, { closed: 1 }); INK.label(ctx, 'açık', -w / 4 + 4, -24, { size: 22, align: 'center', alpha: 0.6 }); INK.label(ctx, 'kapalı', w / 4 - 4, -24, { size: 22, align: 'center', alpha: 0.6 }); }
      else CK.sym(ctx, type, 0, 0, type === 'kablo' ? 1.6 : 1.15, {});
    }
    ctx.restore();
  };


  // ================= FİLM 19'a özel (6. sınıf): iletkenlik test düzeneği + test edilen maddeler =================
  const F19 = {};
  const GREY = '#8C877E', SILVER = '#B8B2A6';
  // timsah kıskacı: p = ağız ucu (temas noktası), dir: +1 ağız sağa bakar, -1 sola. color: kılıf rengi
  F19.clip = (ctx, p, dir, s = 1, color = '#2E6A8C') => {
    ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(dir * s, s);
    const sleeve = densify([[-78, -14], [-38, -16], [-34, 14], [-78, 12], [-78, -14]]);
    P.fillPts(ctx, sleeve, color, 0.9); stroke(ctx, sleeve, { w: 2.4, closed: true, seed: 301, dry: false });
    const up = [[-38, -12], [-6, -12], [0, -3], [-38, -2]], dn = [[-38, 2], [0, 3], [-6, 12], [-38, 12]];
    [up, dn].forEach((j, i) => { P.fillPts(ctx, j, SILVER, 0.95); stroke(ctx, j.concat([j[0]]), { w: 2, closed: true, dry: false, seed: 302 + i }); });
    for (let i = 0; i < 4; i++) { line(ctx, [-30 + i * 7, -3], [-27 + i * 7, 0], { w: 1.2, dry: false, alpha: 0.7 }); }
    ctx.restore();
    return [p[0] - dir * 78 * s, p[1]];   // kablo bağlantı noktası (arka uç)
  };
  // test edilen maddeler: (0,0) merkez, yatay, ~200 px uzunluk (s=1)
  const M = {};
  M.nail = (ctx) => { const b = [[-100, -5], [78, -5], [104, 0], [78, 5], [-100, 5], [-100, -5]]; P.fillPts(ctx, b, '#8E8A86'); wash(ctx, b, '#4A4F57', 0.5, 311, { bleed: 0.5, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 312, dry: false }); const hd = rect(-108, -16, 9, 32); P.fillPts(ctx, hd, '#6E6A66'); stroke(ctx, hd, { w: 2.2, closed: true, dry: false }); };
  M.foil = (ctx) => { const b = wobble(densify(densify([[-100, -18], [100, -14], [98, 16], [-98, 18], [-100, -18]])), 3, 321); P.fillPts(ctx, b, '#D9D8D4'); wash(ctx, b, '#9A9CA3', 0.45, 322, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2, closed: true, seed: 323, dry: false }); for (let i = 0; i < 5; i++) line(ctx, [-80 + i * 40, -12], [-66 + i * 40, 12], { w: 1.2, alpha: 0.5, dry: false, color: GREY, seed: 324 + i }); };
  M.copper = (ctx) => { const pts = []; for (let i = 0; i <= 50; i++) { const u = i / 50; pts.push([-100 + u * 200, Math.sin(u * Math.PI * 3) * 4]); } stroke(ctx, pts, { w: 6, color: COPPER, dry: false, taper: 0.02 }); stroke(ctx, pts, { w: 1.6, color: '#F2C58E', alpha: 0.7, dry: false, taper: 0.05 }); };
  M.ruler = (ctx) => { const b = rect(-104, -16, 208, 32); P.fillPts(ctx, b, '#CFE0E6', 0.8); wash(ctx, b, PAL.water, 0.25, 331, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 332, dry: false }); for (let i = 0; i <= 20; i++) line(ctx, [-96 + i * 9.6, -16], [-96 + i * 9.6, -16 + (i % 5 ? 8 : 14)], { w: 1, dry: false, alpha: 0.7 }); };
  M.wood = (ctx) => { const b = densify([[-102, -12], [102, -11], [102, 11], [-102, 12], [-102, -12]]); P.fillPts(ctx, b, '#D8B57E'); wash(ctx, b, '#8A6A45', 0.5, 341, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 342, dry: false }); for (let i = 0; i < 3; i++) line(ctx, [-90, -6 + i * 6], [90, -5 + i * 6], { w: 1, alpha: 0.4, dry: false, bend: 0.01, color: '#6B4E2E', seed: 343 + i }); };
  M.glass = (ctx) => { const b = densify([[-100, -10], [100, -10], [100, 10], [-100, 10], [-100, -10]]); P.fillPts(ctx, b, '#E4F0EE', 0.7); stroke(ctx, b, { w: 2, closed: true, seed: 351, dry: false, color: '#5E8FAE' }); line(ctx, [-90, -4], [80, -4], { w: 2, color: PAL.white, alpha: 0.9, dry: false }); };
  M.eraser = (ctx) => { const b = densify([[-100, -20], [100, -20], [100, 20], [-100, 20], [-100, -20]]); P.fillPts(ctx, b, '#EFD2CB'); const s2 = rect(-100, -20, 70, 40); P.fillPts(ctx, s2, PAL.water, 0.55); stroke(ctx, b, { w: 2.4, closed: true, seed: 361, dry: false }); };
  M.pencil = (ctx) => { const b = [[-100, -9], [60, -9], [60, 9], [-100, 9], [-100, -9]]; P.fillPts(ctx, b, AMB, 0.85); stroke(ctx, b, { w: 2, closed: true, dry: false, seed: 371 }); const cone = [[60, -9], [92, -2], [92, 2], [60, 9]]; P.fillPts(ctx, cone, '#E9D2A8'); stroke(ctx, cone.concat([cone[0]]), { w: 1.8, dry: false }); P.fillPts(ctx, [[86, -3], [104, 0], [86, 3]], '#3F3B45'); line(ctx, [-100, 0], [60, 0], { w: 1, alpha: 0.4, dry: false }); };
  M.lead = (ctx) => { const b = rect(-100, -4, 200, 8); P.fillPts(ctx, b, '#4A4850'); stroke(ctx, b, { w: 1.6, closed: true, dry: false, seed: 381 }); line(ctx, [-94, -1.5], [94, -1.5], { w: 1, color: PAL.white, alpha: 0.4, dry: false }); };
  F19.M = M;
  // örnek listesi: id, ad, çizim, parlaklık (0: yanmaz), grup
  F19.S = [
    { id: 'nail', name: 'demir çivi', b: 0.95, g: 'i' },
    { id: 'foil', name: 'alüminyum folyo', b: 0.95, g: 'i' },
    { id: 'copper', name: 'bakır tel', b: 0.95, g: 'i' },
    { id: 'ruler', name: 'plastik cetvel', b: 0, g: 'y' },
    { id: 'wood', name: 'tahta çubuk', b: 0, g: 'y' },
    { id: 'glass', name: 'cam çubuk', b: 0, g: 'y' },
    { id: 'eraser', name: 'silgi (lastik)', b: 0, g: 'y' },
    { id: 'lead', name: 'kalem ucu (grafit)', b: 0.28, g: 'i' }
  ];
  F19.sample = (ctx, id, x, y, s = 1, rot = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); M[id](ctx); ctx.restore(); };
  // test düzeneği: pil yatağı (sol) – duy+ampul (orta) – iki kablo ucu (sağda boşluk). (cx,y): masa hizası
  // gap: kıskaçların ağız uçları arasındaki mesafe (s=1 birimi). sample: örnek id (veya null). b: parlaklık
  F19.rig = (ctx, cx, y, s, b, t, o = {}) => {
    const h = CK.holder(ctx, cx - 360 * s, y - 40 * s, s * 0.9);
    const so = CK.socket(ctx, cx - 20 * s, y, s);
    const gx = cx + (o.gx ?? 390) * s, gy = y - 36 * s, half = (o.gap ?? 200) / 2 * s;
    if (o.sample) F19.sample(ctx, o.sample, gx, gy, s * (o.ss ?? 1));
    const cA = F19.clip(ctx, [gx - half + 12 * s, gy], 1, s * 0.9, '#2E6A8C');
    const cB = F19.clip(ctx, [gx + half - 12 * s, gy], -1, s * 0.9, '#3A3842');
    CK.wire(ctx, h.pos, so.a, { sag: 40 * s });
    CK.wire(ctx, so.b, cA, { sag: 40 * s });
    CK.wire(ctx, cB, h.neg, { c: [cx + 80 * s, y - 420 * s], color: '#3A3842' });
    const bl = CK.bulb(ctx, so.top[0], so.top[1] + 6 * s, s, b, t);
    return { holder: h, socket: so, bulb: bl, gap: [gx, gy] };
  };
  // boşluklu devre şeması (pil solda, ampul üstte, boşluk sağda)
  F19.schema = (ctx, x0, y0, w, h, o = {}) => {
    const k = o.k ?? 1, s = o.s ?? 0.8, lit = o.lit ?? 0;
    CK.sym(ctx, 'pil', x0, y0 + h / 2, s, { rot: Math.PI / 2, k, pm: o.pm });
    CK.sym(ctx, 'ampul', x0 + w / 2, y0, s, { k, lit });
    const Lp = CK.symL('pil') * s, La = CK.symL('ampul') * s, gm = y0 + h / 2, gh = (o.gap ?? 60) / 2;
    const segsL = [
      [[x0, y0 + h / 2 - Lp], [x0, y0]], [[x0, y0], [x0 + w / 2 - La, y0]], [[x0 + w / 2 + La, y0], [x0 + w, y0]], [[x0 + w, y0], [x0 + w, gm - gh]],
      [[x0 + w, gm + gh], [x0 + w, y0 + h]], [[x0 + w, y0 + h], [x0, y0 + h]], [[x0, y0 + h], [x0, y0 + h / 2 + Lp]]
    ];
    segsL.forEach(([a, b2], i) => { const kk = E.clamp(k * segsL.length - i); if (kk > 0) stroke(ctx, [a, [E.lerp(a[0], b2[0], kk), E.lerp(a[1], b2[1], kk)]], { w: 5 * s / 0.8, dry: false, taper: 0, seed: 700 + i }); });
    if (k > 0.6) [gm - gh, gm + gh].forEach(yy => { P.fillPts(ctx, circlePts(x0 + w, yy, 8, 8, 16), PAL.white); stroke(ctx, circlePts(x0 + w, yy, 8, 8, 16), { w: 3, closed: true, dry: false }); });
    return { gap: [x0 + w, gm] };
  };
  G.F19 = F19;

  G.CK = CK;
})(window);

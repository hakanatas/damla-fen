// props.js — 8. sınıf Ünite 6 (Filmler 18–20) ortak devre çizim yardımcıları → window.CK (kısa ad: U6)
// Aynı dosya 18-seri-paralel, 19-akim-gerilim ve 20-aydinlatma-modeli klasörlerinde birebir kopyadır.
// Temel kısım films-6/20-direnc/props.js'ten kopyalandı (pil, yatak, duy, ampul, anahtar, kablo, TS/IEC semboller, direnç/reosta).
// 8. sınıf ekleri: ampermetre/voltmetre (sembol + dijital alet), şema kurucu, seri/paralel düzenek, tablo, başlık/bitiş kartları.
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
      P.drawOn(ctx, P.bez(p0, [p0[0] + Math.cos(a) * len / 2, p0[1] + Math.sin(a) * len / 2], [p0[0] + Math.cos(a) * len, p0[1] + Math.sin(a) * len], 16), E.seg(k, 0.6, 1), { w: SW, dry: false, taper: 0.04 });
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

  // semboller: direnç (dikdörtgen) ve reosta (dikdörtgen + çapraz ok) — TS EN 60617 / IEC
  const baseSym = CK.sym;
  CK.sym = (ctx, type, x, y, s = 1, o = {}) => {
    if (type !== 'direnc' && type !== 'reosta') return baseSym(ctx, type, x, y, s, o);
    const k = o.k ?? 1; if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s);
    const L = o.L ?? 58;
    if (o.leads !== false) { P.drawOn(ctx, [[-L, 0], [-34, 0]], E.clamp(k * 2), { w: 4.2, dry: false, taper: 0.04 }); P.drawOn(ctx, [[34, 0], [L, 0]], E.clamp(k * 2 - 1), { w: 4.2, dry: false, taper: 0.04 }); }
    const r = [[-34, -14], [34, -14], [34, 14], [-34, 14], [-34, -14]];
    if (k > 0.3) P.fillPts(ctx, r, PAL.white, 0.9);
    P.drawOn(ctx, densify(densify(r)), E.seg(k, 0.2, 0.8), { w: 4.2, dry: false, taper: 0.02 });
    if (type === 'reosta') {
      const ka = E.seg(k, 0.7, 1); if (ka > 0) { const a = [-30, 30], b = [34, -32]; P.drawOn(ctx, [a, [E.lerp(a[0], b[0], ka), E.lerp(a[1], b[1], ka)]], 1, { w: 3.4, dry: false, taper: 0.02 }); if (ka > 0.95) INK.arrowHead(ctx, a, b, 13, { w: 3.4 }); }
    }
    ctx.restore();
  };

  // ================= 8. SINIF ÜNİTE 6 EKLERİ (filmler 18–20) =================
  const U = CK;   // kısa ad
  U.HEAT = '#B5553F'; U.AMBER = '#8A4A10';
  U.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); ctx.fillText(s, 0, 0); } else ctx.fillText(s, x, y); ctx.restore(); };
  U.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'neutral', look: [0.6, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.4]] }, o));

  // semboller: ampermetre (A) ve voltmetre (V) — daire içinde harf
  const sym2 = CK.sym;
  CK.sym = (ctx, type, x, y, s = 1, o = {}) => {
    if (type !== 'A' && type !== 'V') return sym2(ctx, type, x, y, s, o);
    const k = o.k ?? 1; if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.fillPts(ctx, circlePts(0, 0, 30, 30, 40), o.tint ?? PAL.white, 0.95);
    P.drawOn(ctx, P.arc(0, 0, 30, -Math.PI / 2, Math.PI * 1.5, 48), E.seg(k, 0, 0.7), { w: 4.2, dry: false, taper: 0.02 });
    if (k > 0.5) { ctx.globalAlpha *= E.seg(k, 0.5, 1); ctx.font = '700 38px Kalam'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.ink; ctx.fillText(type, 0, 3); }
    ctx.restore();
  };
  // sembol gövdesinin yarı genişliği (kabloyu silmek için)
  const half = (c) => c.type === 'pil' ? ((c.n ?? 1) - 1) * 20 + 14 : c.type === 'anahtar' ? 36 : c.type === 'ampul' ? 30 : 34;
  // devre şeması: wires = [[p0,p1,...], ...] (dik kablolar), comps = [{type,x,y,rot,n,lit,closed,pm}]
  // o.k: çizim ilerlemesi, o.bg: kabloyu silecek zemin rengi
  U.sch = (ctx, wires, comps, o = {}) => {
    const k = o.k ?? 1; if (k <= 0) return;
    const kw = E.clamp(k * 1.6);
    // bileşen gövdelerini kablodan dışla (evenodd kırpma) — zemin rengi gerektirmez
    ctx.save(); ctx.beginPath(); ctx.rect(-1e4, -1e4, 2e4, 2e4);
    comps.forEach(c => { const h = half(c) - (c.type === 'anahtar' ? 4 : 0), r = c.rot ?? 0, cs = Math.cos(r), sn = Math.sin(r); const q = [[-h, -9], [h, -9], [h, 9], [-h, 9]].map(([a, b]) => [c.x + a * cs - b * sn, c.y + a * sn + b * cs]); ctx.moveTo(q[0][0], q[0][1]); q.slice(1).forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath(); });
    ctx.clip('evenodd');
    wires.forEach((w, i) => { const d = []; for (let j = 0; j < w.length - 1; j++) { const a = w[j], b = w[j + 1], n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 12)); for (let q = 0; q < n; q++) d.push([E.lerp(a[0], b[0], q / n), E.lerp(a[1], b[1], q / n)]); } d.push(w[w.length - 1]); P.drawOn(ctx, d, kw, { w: o.w ?? 4.2, dry: false, taper: 0, seed: 700 + i, color: o.color }); });
    ctx.restore();
    const kc = E.seg(k, 0.35, 1);
    comps.forEach((c, i) => {
      if (kc <= 0) return;
      const h = half(c), rot = c.rot ?? 0;
      if (c.gap) { [-1, 1].forEach(d => inkDot(ctx, c.x + Math.cos(rot) * h * d, c.y + Math.sin(rot) * h * d, 4.5)); return; } // sökülmüş eleman: açık uçlar
      CK.sym(ctx, c.type, c.x, c.y, c.s ?? 1, { rot, k: E.clamp(kc * 1.4 - i * 0.05), n: c.n, lit: c.lit, closed: c.closed, pm: c.pm, leads: false });
      if (c.label) U.txt(ctx, c.label, c.x + (c.lx ?? 0), c.y + (c.ly ?? -50), { size: c.ls ?? 30, align: 'center', alpha: 0.8 * E.clamp(kc * 2) });
    });
  };
  // hazır şemalar: seri (n ampul üstte) ve paralel (n kol). (x,y) sol üst, w,h boyut
  U.schSeries = (ctx, x, y, w, h, n, o = {}) => {
    const comps = [{ type: 'pil', n: o.cells ?? 2, x: x + w / 2, y: y + h, pm: o.pm }];
    for (let i = 0; i < n; i++) comps.push({ type: 'ampul', x: x + w * (i + 1) / (n + 1), y, lit: (o.gapAt === i) ? 0 : o.lit ?? 0, gap: o.gapAt === i });
    if (o.sw != null) comps.push({ type: 'anahtar', x: x, y: y + h / 2, rot: Math.PI / 2, closed: o.sw });
    U.sch(ctx, [[[x, y + h], [x, y], [x + w, y], [x + w, y + h], [x, y + h]]], comps, o);
  };
  U.schParallel = (ctx, x, y, w, h, n, o = {}) => {
    const xs = []; for (let i = 0; i < n; i++) xs.push(x + w * (i + 1) / n);
    const wires = [[[x, y + h], [x, y], [xs[n - 1], y], [xs[n - 1], y + h], [x, y + h]]];
    xs.slice(0, n - 1).forEach(bx => wires.push([[bx, y], [bx, y + h]]));
    const comps = [{ type: 'pil', n: o.cells ?? 2, x: x, y: y + h / 2, rot: Math.PI / 2 }];
    xs.forEach((bx, i) => comps.push({ type: 'ampul', x: bx, y: y + h / 2, rot: Math.PI / 2, lit: o.gapAt === i ? 0 : o.lit ?? 0, gap: o.gapAt === i }));
    U.sch(ctx, wires, comps, o);
    if (o.dots !== false && E.seg(o.k ?? 1, 0.5, 1) > 0) xs.slice(0, n - 1).forEach(bx => { inkDot(ctx, bx, y, 5); inkDot(ctx, bx, y + h, 5); });
  };

  // çok pilli yatak: n pil yan yana (seri). (x,y) merkez. döndürür {neg,pos}
  U.pack = (ctx, x, y, s, n = 2, o = {}) => {
    const gap = 175 * s, x0 = x - (n - 1) * gap / 2;
    const tray = densify(densify([[x0 - 110 * s, y - 42 * s], [x0 + (n - 1) * gap + 110 * s, y - 42 * s], [x0 + (n - 1) * gap + 110 * s, y + 42 * s], [x0 - 110 * s, y + 42 * s], [x0 - 110 * s, y - 42 * s]]));
    P.fillPts(ctx, tray, '#E6DCC6'); wash(ctx, tray, '#5B5560', 0.5, 41, { bleed: 1, blooms: 0 }); stroke(ctx, tray, { w: 3, closed: true, seed: 42 });
    for (let i = 0; i < n; i++) CK.battery(ctx, x0 + i * gap, y, s * 0.98);
    const neg = [x0 - 128 * s, y + 28 * s], pos = [x0 + (n - 1) * gap + 128 * s, y + 28 * s];
    [neg, pos].forEach((p, i) => { const tab = rect(p[0] - (i ? 26 * s : 0), p[1] - 6 * s, 26 * s, 12 * s); P.fillPts(ctx, tab, COPPER, 0.85); stroke(ctx, tab, { w: 2, closed: true, dry: false, seed: 44 + i }); });
    if (o.label !== false) U.txt(ctx, n + ' pil', x, y + 90 * s, { size: Math.max(30, 34 * s), align: 'center', alpha: 0.75 });
    return { neg, pos };
  };
  // ampul + duy birlikte. (x,y) duy tabanı. b parlaklık. o.out: 0..1 ampul sökülüyor (yukarı kalkar, yana yatar)
  U.lamp = (ctx, x, y, s, b, t, o = {}) => {
    const so = CK.socket(ctx, x, y, s);
    const out = o.out ?? 0;
    if (out > 0) {
      const lx = so.top[0] + 70 * s * out, ly = so.top[1] + 6 * s - 90 * s * Math.sin(out * Math.PI * 0.5);
      ctx.save(); ctx.translate(lx, ly); ctx.rotate(0.5 * out); CK.bulb(ctx, 0, 0, s, 0, t); ctx.restore();
    } else CK.bulb(ctx, so.top[0], so.top[1] + 6 * s, s, b, t);
    return so;
  };
  // gerçekçi seri düzenek: n ampul yan yana, altta pil yatağı. (cx,y) duyların taban hizası (orta)
  U.rigSeries = (ctx, cx, y, s, n, b, t, o = {}) => {
    const gap = 250 * s, xs = []; for (let i = 0; i < n; i++) xs.push(cx + (i - (n - 1) / 2) * gap);
    const pk = U.pack(ctx, cx, y + 170 * s, s * 0.8, o.cells ?? 2, { label: o.packLabel });
    const socks = xs.map((x, i) => U.lamp(ctx, x, y, s, (o.outAt === i || o.outAt != null) ? 0 : b, t, { out: o.outAt === i ? (o.outK ?? 1) : 0 }));
    for (let i = 0; i < n - 1; i++) CK.wire(ctx, socks[i].b, socks[i + 1].a, { sag: 36 * s, w: 6 });
    CK.wire(ctx, pk.pos, socks[n - 1].b, { c: [xs[n - 1] + 180 * s, y + 120 * s], w: 6 });
    CK.wire(ctx, socks[0].a, pk.neg, { c: [xs[0] - 180 * s, y + 120 * s], color: '#3A3842', w: 6 });
    return { xs, socks };
  };
  // gerçekçi paralel düzenek: her ampul kendi kolunda; üst ve alt ray
  U.rigParallel = (ctx, cx, y, s, n, b, t, o = {}) => {
    const gap = 250 * s, xs = []; for (let i = 0; i < n; i++) xs.push(cx + (i - (n - 1) / 2) * gap);
    const yT = y - 250 * s, yB = y + 60 * s, xL = xs[0] - 150 * s, xR = xs[n - 1] + 90 * s;
    const pk = U.pack(ctx, cx, y + 190 * s, s * 0.8, o.cells ?? 2, { label: o.packLabel });
    const col = '#2E6A8C', colN = '#3A3842';
    stroke(ctx, [[xL, yT], [xR, yT]], { w: 6, color: col, dry: false, taper: 0 });
    stroke(ctx, [[xL, yB], [xR, yB]], { w: 6, color: colN, dry: false, taper: 0 });
    const socks = xs.map((x, i) => U.lamp(ctx, x, y, s, o.outAt === i ? 0 : b, t, { out: o.outAt === i ? (o.outK ?? 1) : 0 }));
    socks.forEach((so, i) => {
      CK.wire(ctx, [so.a[0] - 20 * s, yT], so.a, { c: [so.a[0] - 26 * s, (yT + so.a[1]) / 2], w: 5 });
      CK.wire(ctx, so.b, [so.b[0] + 10 * s, yB], { c: [so.b[0] + 8 * s, (so.b[1] + yB) / 2], w: 5, color: colN });
      inkDot(ctx, so.a[0] - 20 * s, yT, 5); inkDot(ctx, so.b[0] + 10 * s, yB, 5);
    });
    CK.wire(ctx, pk.pos, [xR, yT], { c: [xR + 10 * s, pk.pos[1] - 10 * s], w: 6 });
    CK.wire(ctx, pk.neg, [xL, yB], { c: [xL - 10 * s, pk.neg[1] - 10 * s], w: 6, color: colN });
    return { xs, socks };
  };

  // dijital ölçü aleti (ampermetre / voltmetre). (x,y) merkez; txt: ekrandaki okuma; kind: 'A' | 'V'
  U.meter = (ctx, x, y, s, kind, txt, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = densify(densify([[-110, -140], [110, -140], [110, 140], [-110, 140], [-110, -140]]));
    P.fillPts(ctx, body, kind === 'A' ? '#E8D9B5' : '#D7E2E6'); wash(ctx, body, kind === 'A' ? PAL.light : PAL.water, 0.35, kind === 'A' ? 611 : 612, { bleed: 1, blooms: 0 });
    stroke(ctx, body, { w: 3.2, closed: true, seed: 613 });
    const lcd = rect(-86, -116, 172, 88); P.fillPts(ctx, lcd, '#C9D3B4'); stroke(ctx, lcd, { w: 2.4, closed: true, dry: false, seed: 614 });
    ctx.font = '700 58px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.globalAlpha *= (o.lcdA ?? 1); ctx.fillText(txt, 0, -52); ctx.globalAlpha /= (o.lcdA ?? 1) || 1;
    P.fillPts(ctx, circlePts(0, 30, 46, 46, 40), PAL.white, 0.9); stroke(ctx, circlePts(0, 30, 46, 46, 40), { w: 2.8, closed: true, seed: 615 });
    ctx.font = '700 54px Kalam'; ctx.fillText(kind, 0, 49);
    [[-56, '−', '#3A3842'], [56, '+', COPPER]].forEach(([dx, ch, c], i) => { P.fillPts(ctx, circlePts(dx, 108, 15, 15, 20), c, 0.9); stroke(ctx, circlePts(dx, 108, 15, 15, 20), { w: 2, closed: true, dry: false, seed: 616 + i }); ctx.font = '700 30px Kalam'; ctx.fillStyle = PAL.ink; ctx.fillText(ch, dx + (i ? 30 : -30), 118); });
    ctx.restore();
    if (o.name) U.txt(ctx, o.name, x, y + 190 * s, { size: Math.max(32, 38 * s), align: 'center' });
    return { neg: [x - 56 * s, y + 108 * s], pos: [x + 56 * s, y + 108 * s] };
  };
  // basit tablo: rows[0] başlık. reveal(i) → 0..1 (satır görünürlüğü)
  U.grid = (ctx, x, y, colW, rowH, rows, reveal, o = {}) => {
    const W = colW.reduce((a, b) => a + b, 0), H = rowH * rows.length;
    P.fillPts(ctx, rect(x, y, W, rowH), o.head ?? '#F2E3BF', 0.9);
    const hl = o.hl ?? []; hl.forEach(([ri, col]) => P.fillPts(ctx, rect(x, y + ri * rowH, W, rowH), col, 0.35));
    stroke(ctx, densify(densify(rect(x, y, W, H))), { w: 2.6, closed: true, dry: false, seed: 630 });
    for (let r = 1; r < rows.length; r++) line(ctx, [x, y + r * rowH], [x + W, y + r * rowH], { w: r === 1 ? 2.4 : 1.4, dry: false, alpha: r === 1 ? 1 : 0.6, seed: 631 + r });
    let cx = x; colW.slice(0, -1).forEach((w, i) => { cx += w; line(ctx, [cx, y], [cx, y + H], { w: 1.6, dry: false, alpha: 0.7, seed: 640 + i }); });
    rows.forEach((row, r) => {
      const k = r === 0 ? 1 : reveal(r); if (k <= 0) return;
      let xx = x; row.forEach((cell, c) => {
        const size = r === 0 ? (o.hs ?? 34) : (o.fs ?? 36);
        if (typeof cell === 'function') cell(ctx, xx + colW[c] / 2, y + r * rowH + rowH / 2, k);
        else P.write(ctx, String(cell), xx + colW[c] / 2, y + r * rowH + rowH / 2 + size * 0.36, r === 0 ? 1 : k, { size, align: 'center', weight: r === 0 || c === 0 ? 700 : 400, color: (o.colColor && o.colColor[c]) || PAL.ink });
        xx += colW[c];
      });
    });
  };
  // parlaklık göstergesi (küçük ampul simgesi + ışınlar) — tabloda kullanılır
  U.bright = (ctx, x, y, b, k = 1) => {
    ctx.save(); ctx.globalAlpha *= k;
    if (b > 0) { const g = ctx.createRadialGradient(x, y, 0, x, y, 18 + 26 * b); g.addColorStop(0, `rgba(227,160,58,${0.3 + 0.5 * b})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 18 + 26 * b, 0, 7); ctx.fill(); }
    P.fillPts(ctx, circlePts(x, y, 13, 13, 20), b > 0 ? '#FBE7B8' : PAL.white, 0.95); stroke(ctx, circlePts(x, y, 13, 13, 20), { w: 2.2, closed: true, dry: false });
    if (b > 0.05) for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; line(ctx, [x + Math.cos(a) * 18, y + Math.sin(a) * 18], [x + Math.cos(a) * (20 + 16 * b), y + Math.sin(a) * (20 + 16 * b)], { w: 2, color: AMBD, dry: false, alpha: 0.4 + 0.6 * b }); }
    ctx.restore();
  };

  // ---------- başlık / bitiş / görev kartı (8. sınıf, Ünite 6) ----------
  U.title = (ctx, t, line2, unit = 6) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, line2, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  U.end = (ctx, t, line2, codes) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, line2, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // görev kartı: lines = [metin, ...] (her biri ~1.1 sn arayla yazılır)
  U.task = (ctx, t, t0, t1, head, lines, o = {}) => {
    const rk = Math.min(E.se(t, t0, t0 + 0.7, 'out'), 1 - E.se(t, t1 - 0.4, t1 + 0.3)); if (rk <= 0) return;
    E.layer(ctx, rk, c => {
      const x = o.x ?? 300, y = o.y ?? 170, w = o.w ?? 1320, h = o.h ?? 620;
      CK.card(c, x, y, w, h, { seed: 2601, fill: '#FAF6EC' });
      INK.hatch(c, x + 24, y + 40, 12, 70, { n: 1, ang: 1.57, w: 6, alpha: 0.8, color: PAL.light, seed: 3 });
      P.write(c, head, x + 60, y + 92, E.seg(t, t0 + 0.4, t0 + 1.3), { size: 62, color: U.AMBER });
      lines.forEach((ln, i) => { const at = t0 + 1.2 + i * (o.step ?? 1.1); P.write(c, ln, x + 70, y + 180 + i * (o.gap ?? 70), E.seg(t, at, at + 1.2), { size: o.size ?? 42, weight: ln.startsWith('•') ? 400 : 700 }); });
    });
  };
  // "sıradaki gözlem" ekranı
  U.next = (ctx, t, t0, t1, line2, draw) => {
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, t0 + 0.5, t1, { size: 48, align: 'center', weight: 400 });
    E.inkText(ctx, line2, 960, 320, t, t0 + 1.1, t1, { size: 70, align: 'center' });
    if (draw) draw(ctx);
  };
  // elektrik güvenliği ögeleri (safetyCard için)
  U.SAFE = {
    outlet: { icon: (c) => CK.outlet(c, 0, 0, 0.6), mark: 'x', a: 'Prize, ev elektriğine dokunma!', b: 'Deneyler yalnızca pille yapılır.', red: true },
    short: { icon: (c, t) => CK.shortIcon(c, t), mark: 'x', a: 'Kısa devre yapma!', b: 'Pilin iki ucunu tek kabloyla birleştirme.', red: true },
    hot: { icon: (c, t) => CK.bulb(c, 0, 50, 0.55, 0.9, t, { rays: false }), mark: null, a: 'Ampul ısınabilir.', b: 'Yanan ampule dokunma.' },
    adult: { icon: (c, t) => DAMLA.draw(c, { x: 0, y: 50, s: 0.42, view: 'front', expr: 'happy', t, seed: 1, shadow: false, arms: [[-1, 0.4], [1, 2.3]] }), mark: 'ok', a: 'Bir yetişkin eşliğinde çalış.', b: 'Deneyden sonra masayı topla.' }
  };

  G.CK = CK; G.U6 = CK;
})(window);

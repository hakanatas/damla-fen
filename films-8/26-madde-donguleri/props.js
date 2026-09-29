// props.js — 8. sınıf Ünite 7 (Filmler 26–27) ortak çizim yardımcıları → window.U7
// Aynı dosya 26-madde-donguleri ve 27-iklim-degisikligi klasörlerinde birebir kopyadır.
// Temel: films-8/15-tepkimeler-yasam/props.js (U5: txt, kart, başlık, bitiş, görev, kaydet). Doğa/döngü çizimleri yeni.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const HEAT = '#B5553F', RED = '#A23A2A', AMBER = '#8A4A10', SUB = '#C07F1E', GREEN = '#3F7A3A';
  const CO2C = '#6B6460', O2C = '#2E6A8C', H2OC = '#4F8FB5', IR = '#B5553F';
  const U = { HEAT, RED, AMBER, SUB, GREEN, CO2C, O2C, H2OC, IR };

  U.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  U.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillText(s, x, y); ctx.restore(); };
  // metni verilen genişliğe sığdır (font küçültür)
  U.fit = (ctx, s, x, y, maxW, size, o = {}) => { ctx.save(); let z = size; ctx.font = `${o.weight ?? 700} ${z}px Kalam`; while (ctx.measureText(s).width > maxW && z > 14) { z--; ctx.font = `${o.weight ?? 700} ${z}px Kalam`; } ctx.restore(); U.txt(ctx, s, x, y, Object.assign({}, o, { size: z, align: o.align ?? 'center' })); return z; };

  // ---------- kart ----------
  U.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, o.seed ?? 2100, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 2100 });
    return c;
  };

  // ---------- kimyasal formül (alt simgeli): 'CO2' → CO₂ ----------
  U.formula = (ctx, f, x, y, size, o = {}) => {
    const parts = f.match(/[A-Z][a-z]?|\d+/g) || [];
    ctx.save(); ctx.textBaseline = 'alphabetic';
    let W = 0; parts.forEach(p => { ctx.font = `700 ${/\d/.test(p) ? size * 0.62 : size}px Kalam`; W += ctx.measureText(p).width + (/\d/.test(p) ? 2 : 0); });
    let cx = (o.align ?? 'center') === 'center' ? x - W / 2 : x;
    ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.textAlign = 'left';
    parts.forEach(p => { const sub = /\d/.test(p); ctx.font = `700 ${sub ? size * 0.62 : size}px Kalam`; ctx.fillText(p, cx + (sub ? 2 : 0), y + (sub ? size * 0.22 : 0)); cx += ctx.measureText(p).width + (sub ? 2 : 0); });
    ctx.restore(); return W;
  };
  // gaz rozeti: yuvarlak etiket içinde formül
  U.gas = (ctx, f, x, y, r, col, o = {}) => {
    const cp = circlePts(x, y, r, r * 0.8, 28);
    P.fillPts(ctx, cp, '#FBF8F1', 0.95); wash(ctx, cp, col, 0.35, 2300 + f.length, { bleed: 1, blooms: 0 });
    stroke(ctx, cp, { w: 2.4, closed: true, color: col, dry: false, seed: 2310 + f.length });
    U.formula(ctx, f, x, y + r * 0.28, r * 0.78, { color: o.txt ?? PAL.ink });
  };

  // ---------- etiketli ok (döngü okları) ----------
  U.flow = (ctx, a, b, k, o = {}) => {
    if (k <= 0) return; const col = o.color ?? PAL.ink;
    P.arrow(ctx, a, b, k, { w: o.w ?? 4, color: col, bend: o.bend ?? 0, head: o.head ?? 18, c: o.c });
    if (o.label && k > 0.6) {
      const mx = o.lx ?? (a[0] + b[0]) / 2, my = o.ly ?? (a[1] + b[1]) / 2 - (o.bend ?? 0) / 2;
      ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.6) / 0.4);
      ctx.font = `700 ${o.size ?? 36}px Kalam`; const w = ctx.measureText(o.label).width;
      const al = o.align ?? 'center', x0 = al === 'center' ? mx - w / 2 : al === 'right' ? mx - w : mx;
      ctx.fillStyle = 'rgba(250,246,236,0.9)'; ctx.beginPath(); ctx.roundRect(x0 - 10, my - (o.size ?? 36) * 0.9, w + 20, (o.size ?? 36) * 1.2, 10); ctx.fill();
      ctx.restore();
      ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.6) / 0.4); U.txt(ctx, o.label, mx, my, { size: o.size ?? 36, align: al, color: o.lcolor ?? col }); ctx.restore();
    }
  };

  // ---------- doğa ----------
  U.cloud = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pts = []; for (let i = 0; i <= 80; i++) { const a = i / 80 * 6.283; const b = 1 + 0.16 * Math.abs(Math.sin(a * 3.5 + (o.seed ?? 1))); pts.push([Math.cos(a) * 120 * b, Math.sin(a) * 52 * b - (Math.sin(a) < 0 ? 18 * Math.abs(Math.sin(a)) : 0)]); }
    P.fillPts(ctx, pts, o.fill ?? '#FBF8F1', o.alpha ?? 0.97);
    if (o.dark) wash(ctx, pts, '#6E7C88', 0.35 * o.dark, 2400, { bleed: 2, blooms: 1 });
    wash(ctx, pts, PAL.water, 0.12, 2401, { bleed: 2, blooms: 1 });
    stroke(ctx, pts, { w: 3 / s, closed: true, seed: 2402 + (o.seed ?? 0), alpha: 0.9 });
    ctx.restore();
  };
  U.rain = (ctx, x, y, w, h, t, k = 1, o = {}) => {
    if (k <= 0) return; const r = rng(o.seed ?? 2410); const n = o.n ?? 14;
    for (let i = 0; i < n; i++) {
      const xx = x - w / 2 + r() * w, ph = r(); const u = (t * (o.speed ?? 0.9) + ph) % 1; const yy = y + u * h;
      ctx.save(); ctx.globalAlpha *= k * Math.sin(u * Math.PI);
      if (o.snow) { stroke(ctx, circlePts(xx + Math.sin(t * 2 + i) * 6, yy, 5, 5, 10), { w: 1.6, closed: true, dry: false, color: PAL.water }); line(ctx, [xx - 6 + Math.sin(t * 2 + i) * 6, yy], [xx + 6 + Math.sin(t * 2 + i) * 6, yy], { w: 1.4, dry: false, color: PAL.water }); }
      else line(ctx, [xx, yy], [xx - 5, yy + 22], { w: 2.4, dry: false, color: o.color ?? PAL.water });
      ctx.restore();
    }
  };
  U.sea = (ctx, x0, x1, y, t, o = {}) => { // deniz yüzeyi y; aşağısı su
    const top = []; for (let i = 0; i <= 80; i++) { const x = x0 + (x1 - x0) * i / 80; top.push([x, y + Math.sin(x * 0.02 + t * 1.6) * 6 + Math.sin(x * 0.05 - t) * 3]); }
    const body = top.concat([[x1, o.bottom ?? 1200], [x0, o.bottom ?? 1200]]);
    P.fillPts(ctx, body, '#D6E5EC', 0.95); wash(ctx, body, PAL.water, o.alpha ?? 0.45, 2420, { bleed: 3, blooms: 2 });
    stroke(ctx, top, { w: 3, seed: 2421, taper: 0.02 });
    for (let j = 0; j < 5; j++) { const yy = y + 40 + j * 38, xx = x0 + 60 + ((j * 173 + t * 20) % (x1 - x0 - 160)); stroke(ctx, P.bez([xx, yy], [xx + 30, yy - 10], [xx + 60, yy], 10), { w: 2, alpha: 0.5, dry: false, color: PAL.water }); }
  };
  U.mountain = (ctx, x, by, w, h, o = {}) => {
    const m = [[x - w / 2, by], [x - w * 0.18, by - h * 0.72], [x - w * 0.04, by - h * 0.9], [x + w * 0.04, by - h], [x + w * 0.2, by - h * 0.78], [x + w / 2, by]];
    P.fillPts(ctx, m, '#E4DCCB'); wash(ctx, m, '#7C7466', 0.35, 2430, { bleed: 2, blooms: 1 });
    if (o.snow !== false) { const sc = o.snow ?? 1; const cap = [[x - w * 0.18 + w * 0.06, by - h * 0.72 - h * 0.02], [x - w * 0.04, by - h * 0.9], [x + w * 0.04, by - h], [x + w * 0.2, by - h * 0.78], [x + w * 0.14, by - h * 0.72], [x + w * 0.06, by - h * 0.78], [x - w * 0.02, by - h * 0.7], [x - w * 0.1, by - h * 0.74]]; P.fillPts(ctx, cap, '#FBF8F1', 0.95 * sc); stroke(ctx, cap.slice(4).concat([cap[0]]), { w: 2, dry: false, alpha: 0.6 * sc }); }
    stroke(ctx, m, { w: 3.4, seed: 2431 });
  };
  U.tree = (ctx, x, by, s, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    line(ctx, [0, 0], [4, -110], { w: 9, seed: 2440, taper: 0.1, color: '#5B4430' });
    const sw = Math.sin(t * 0.9 + x) * 3;
    const crown = wobble(circlePts(4 + sw, -150, 66, 56, 44), 6, 2441 + (o.seed ?? 0));
    P.fillPts(ctx, crown, '#E5EED6', 0.95); wash(ctx, crown, o.color ?? PAL.life, 0.55, 2442, { bleed: 3 }); stroke(ctx, crown, { w: 3, closed: true, seed: 2443 });
    ctx.restore();
  };
  U.stump = (ctx, x, by, s) => { ctx.save(); ctx.translate(x, by); ctx.scale(s, s); const b = [[-18, 0], [-16, -34], [16, -34], [18, 0]]; P.fillPts(ctx, b, '#B98A55'); stroke(ctx, b, { w: 2.6, dry: false }); stroke(ctx, circlePts(0, -34, 16, 5, 16), { w: 2, closed: true, dry: false }); ctx.restore(); };
  U.leaf = (ctx, x, y, s, a = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); const l = []; for (let i = 0; i <= 30; i++) { const u = i / 30 * 6.283; l.push([Math.cos(u) * 60, Math.sin(u) * 26 * (1 - 0.3 * Math.cos(u))]); } P.fillPts(ctx, l, '#8FAE4A', 0.9); stroke(ctx, l, { w: 2.4, closed: true, dry: false }); line(ctx, [-60, 0], [60, 0], { w: 1.8, dry: false, alpha: 0.7 }); ctx.restore(); };
  U.sheep = (ctx, x, by, s, t = 0) => {
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    [[-30, 0], [-12, 0], [12, 0], [30, 0]].forEach(([lx], i) => line(ctx, [lx, -34], [lx + (i % 2 ? 2 : -2), 0], { w: 4, dry: false }));
    const b = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283; const r = 1 + 0.08 * Math.sin(a * 9); b.push([Math.cos(a) * 55 * r, -58 + Math.sin(a) * 32 * r]); }
    P.fillPts(ctx, b, '#FBF8F1'); stroke(ctx, b, { w: 2.6, closed: true, dry: false, seed: 2450 });
    const hd = circlePts(62, -72 + Math.sin(t * 1.5) * 2, 17, 13, 18); P.fillPts(ctx, hd, '#5B5550'); stroke(ctx, hd, { w: 2, closed: true, dry: false });
    ctx.restore();
  };
  U.factory = (ctx, x, by, s, t, smoke = 1) => {
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const b = [[-110, 0], [-110, -90], [-60, -60], [-60, -90], [-10, -60], [-10, -90], [40, -60], [40, -120], [110, -120], [110, 0], [-110, 0]];
    P.fillPts(ctx, b, '#D9CDB4'); wash(ctx, b, '#8A6A45', 0.3, 2460, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.8, closed: true, seed: 2461 });
    const ch = [[60, -120], [60, -200], [88, -200], [88, -120]]; P.fillPts(ctx, ch, '#BFB39B'); stroke(ctx, ch, { w: 2.6, dry: false });
    [[-80, -30], [-30, -30], [20, -30], [70, -40]].forEach(([wx, wy]) => { const w = U.rect(wx - 12, wy - 14, wx + 12, wy + 10); P.fillPts(ctx, w, '#F6D9A0', 0.8); stroke(ctx, w, { w: 1.6, dry: false }); });
    if (smoke > 0) U.smoke(ctx, 74, -206, t, smoke, 1);
    ctx.restore();
  };
  U.smoke = (ctx, x, y, t, k = 1, s = 1, seed = 2470) => {
    for (let i = 0; i < 5; i++) { const u = (t * 0.35 + i / 5) % 1; const cx = x + Math.sin(u * 4 + i) * 16 * s + u * 60 * s, cy = y - u * 170 * s, r = (14 + u * 36) * s;
      const cp = wobble(circlePts(cx, cy, r, r * 0.8, 20), 2, seed + i); ctx.save(); ctx.globalAlpha *= k * (1 - u) * 0.8; P.fillPts(ctx, cp, '#8E8A86', 0.55); stroke(ctx, cp, { w: 1.6, closed: true, dry: false, alpha: 0.5 }); ctx.restore(); }
  };
  U.car = (ctx, x, by, s, t, smoke = 1) => {
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const b = [[-80, -16], [-78, -46], [-40, -50], [-20, -80], [40, -80], [60, -50], [84, -44], [86, -16], [-80, -16]];
    P.fillPts(ctx, b, '#C98A6C'); stroke(ctx, b, { w: 2.8, closed: true, seed: 2480 });
    const win = [[-12, -52], [-2, -72], [34, -72], [48, -52], [-12, -52]]; P.fillPts(ctx, win, '#D6E5EC'); stroke(ctx, win, { w: 2, closed: true, dry: false });
    [-48, 52].forEach(wx => { const w = circlePts(wx, -14, 16, 16, 20); P.fillPts(ctx, w, '#3A3842'); stroke(ctx, w, { w: 2, closed: true, dry: false }); });
    if (smoke > 0) U.smoke(ctx, -96, -20, t, smoke, 0.45, 2490);
    ctx.restore();
  };
  U.house = (ctx, x, by, s) => {
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const b = U.rect(-60, -90, 60, 0); P.fillPts(ctx, b, '#F1E6D0'); stroke(ctx, b, { w: 2.6, dry: false });
    const r = [[-76, -86], [0, -150], [76, -86], [-76, -86]]; P.fillPts(ctx, r, '#B5553F', 0.75); stroke(ctx, r, { w: 2.6, closed: true, dry: false });
    const d = U.rect(-14, -50, 14, 0); P.fillPts(ctx, d, '#8A6A45', 0.8); stroke(ctx, d, { w: 2, dry: false });
    const w = U.rect(24, -70, 48, -44); P.fillPts(ctx, w, '#F6D9A0', 0.8); stroke(ctx, w, { w: 2, dry: false });
    ctx.restore();
  };
  U.thermo = (ctx, x, y, h, k, o = {}) => { // k 0..1 dolum
    const tube = [[x - 14, y - h], [x + 14, y - h], [x + 14, y - 10], [x - 14, y - 10], [x - 14, y - h]];
    P.fillPts(ctx, tube, '#FBF8F1'); const lv = y - 10 - (h - 20) * k;
    P.fillPts(ctx, U.rect(x - 7, lv, x + 7, y), o.color ?? HEAT, 0.9);
    const bulb = circlePts(x, y + 8, 26, 26, 24); P.fillPts(ctx, bulb, o.color ?? HEAT, 0.95); stroke(ctx, bulb, { w: 2.6, closed: true, dry: false });
    stroke(ctx, tube, { w: 2.6, closed: true, dry: false });
    for (let i = 1; i < 6; i++) line(ctx, [x + 14, y - 10 - (h - 20) * i / 6], [x + 26, y - 10 - (h - 20) * i / 6], { w: 1.6, dry: false });
  };
  U.faucet = (ctx, x, y, s, t, drip = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-70, -20], [30, -20], [40, -10], [40, 20], [20, 20], [20, 0], [-70, 0], [-70, -20]]; P.fillPts(ctx, b, '#A7ADB4'); stroke(ctx, b, { w: 2.6, closed: true, dry: false });
    const h = U.rect(-20, -44, 4, -20); P.fillPts(ctx, h, '#8C9198'); stroke(ctx, h, { w: 2, dry: false });
    if (drip > 0) { const u = (t * 0.8) % 1; const d = circlePts(30, 30 + u * 90, 7, 10, 14); ctx.save(); ctx.globalAlpha *= drip; P.fillPts(ctx, d, PAL.water, 0.8); ctx.restore(); }
    ctx.restore();
  };

  // ---------- defter kapağı (final) ----------
  U.cover = (ctx, x, y, w, h, col, title, o = {}) => {
    const c = [[x, y], [x + w, y + 3], [x + w - 2, y + h], [x + 2, y + h - 2], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.3)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, '#F6EFDF'); ctx.restore();
    wash(ctx, c, col, 0.55, 2500 + (o.seed ?? 0), { bleed: 2, blooms: 2 }); stroke(ctx, c, { w: 3, closed: true, seed: 2501 + (o.seed ?? 0) });
    line(ctx, [x + 26, y + 6], [x + 26, y + h - 6], { w: 5, alpha: 0.6, dry: false, color: PAL.ink });
    const lb = [[x + w * 0.2, y + 30], [x + w * 0.9, y + 32], [x + w * 0.9, y + 110], [x + w * 0.2, y + 108], [x + w * 0.2, y + 30]];
    P.fillPts(ctx, lb, '#FBF8F1', 0.96); stroke(ctx, lb, { w: 2, closed: true, dry: false });
    U.fit(ctx, title, x + w * 0.55, y + 88, w * 0.62, 46);
  };

  // ---------- başlık / bitiş / görev / kaydet (8. sınıf) ----------
  U.title = (ctx, t, line2, unit = 7) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, line2, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.life }); ctx.restore(); }
  };
  U.end = (ctx, t, line2, codes) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, line2, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.life });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  U.task = (ctx, t, t0, t1, head, lines, o = {}) => {
    const rk = Math.min(E.se(t, t0, t0 + 0.7, 'out'), 1 - E.se(t, t1 - 0.4, t1 + 0.3)); if (rk <= 0) return;
    E.layer(ctx, rk, c => {
      const x = o.x ?? 300, y = o.y ?? 180, w = o.w ?? 1320, h = o.h ?? 560;
      const card = [[x, y + 10], [x + w, y], [x + w + 10, y + h], [x + 10, y + h + 12], [x, y + 10]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true, seed: 2601 });
      P.write(c, head, x + 70, y + 110, E.seg(t, t0 + 0.4, t0 + 1.3), { size: 68, color: AMBER });
      lines.forEach((l, i) => { const a = t0 + 1.2 + i * (o.step ?? 1.0), yy = y + 200 + i * (o.lh ?? 72); P.write(c, l, x + 80, yy, E.seg(t, a, a + 1.0), { size: o.size ?? 44, color: o.colors && o.colors[i] ? o.colors[i] : PAL.ink }); });
    });
  };
  U.record = (ctx, t, t0, head, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, head, 290, 260, E.seg(t, t0 + 0.3, t0 + 1.5), { size: 62 });
    if (t > t0 + 1.5) P.drawOn(ctx, P.bez([286, 282], [700, 294], [1110, 278], 30), E.se(t, t0 + 1.5, t0 + 2.0), { w: 3, color: PAL.water });
    const st = o.step ?? 1.3;
    items.forEach((txt, i) => {
      const at = t0 + 2.0 + i * st, y = 370 + i * (o.lh ?? 84);
      const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.2, closed: true, seed: 90 + i });
      P.check(ctx, 322, y - 20, 40, E.se(t, at + 0.9, at + 1.3), { w: 5.5 });
      P.write(ctx, txt, 372, y, E.seg(t, at, at + 1.1), { size: o.size ?? 44, color: o.colors && o.colors[i] ? o.colors[i] : PAL.ink });
    });
  };
  U.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'neutral', look: [0.6, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.4]] }, o));

  G.U7 = U;
})(window);

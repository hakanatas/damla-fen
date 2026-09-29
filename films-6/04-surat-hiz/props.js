// props.js — 6. sınıf Film 4'e özel çizim yardımcıları (dinamometre, araba, tablo: films/05-kuvvet-olcme/props.js'ten kopyalandı)
// Global: window.F64
window.F64 = (function () {
  const { PAL, line, stroke, circlePts, wash, inkDot, wobble } = INK;
  const AMB = '#C07F1E';
  const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  const txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 30}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillText(s, x, y); ctx.restore(); };

  // helical spring from (x,y0) to (x,y1). o: coils, r (radius), w (wire width)
  function spring(ctx, x, y0, y1, o = {}) {
    const n = o.coils ?? 12, r = o.r ?? 16, w = o.w ?? 2.4, col = o.color ?? PAL.ink, tilt = r * 0.3, len = y1 - y0;
    for (let c = 0; c < n; c++) for (let h = 1; h >= 0; h--) {
      const pts = [];
      for (let i = 0; i <= 12; i++) { const u = c + h * 0.5 + i / 24; const a = u * 2 * Math.PI; pts.push([x - Math.cos(a) * r, y0 + len * (u / n) + Math.sin(a) * tilt]); }
      stroke(ctx, pts, { w: h === 0 ? w : w * 0.75, alpha: h === 0 ? 1 : 0.4, color: col, dry: false, taper: 0, vary: 0.15, seed: 700 + c * 2 + h, noBoil: true });
    }
  }

  // Dinamometre. (x,y): üst halkanın tepesi. o: L gövde boyu, W gövde eni, max (N), step (etiket aralığı), F (N),
  // thick (1 ince, 2 kalın), hookOnly. Döner: { hook:[x,y] (asma noktası), py (gösterge), s0, s1 }
  function dyn(ctx, x, y, o = {}) {
    const L = o.L ?? 460, W = o.W ?? 84, max = o.max ?? 10, th = o.thick ?? 1, F = Math.max(0, o.F ?? 0);
    const step = o.step ?? (max <= 10 ? 1 : 5), lab = o.lab ?? (max <= 10 ? 2 : 10);
    const top = y + 44, bot = top + L, s0 = top + L * 0.3, s1 = bot - 34;
    let frac = F / max; const over = Math.min(1, Math.max(0, frac - 1) * 1.5); frac = Math.min(1, frac);
    const py = s0 + (s1 - s0) * frac + over * (bot - 12 - s1);
    // ring + neck
    stroke(ctx, circlePts(x, y + 16, 17, 17, 30), { w: 5, closed: true, seed: 801, noBoil: true });
    line(ctx, [x, y + 33], [x, top + 2], { w: 5, dry: false });
    // tube
    const tube = rect(x - W / 2, top, x + W / 2, bot);
    P.fillPts(ctx, tube, '#FBF8F1', 0.9);
    wash(ctx, tube, th > 1 ? '#8A6A45' : PAL.water, 0.13, 810 + th, { bleed: 1, blooms: 0 });
    // scale ticks (outside, right side) + numbers
    ctx.save();
    for (let v = 0; v <= max + 1e-6; v += step) {
      const yy = s0 + (s1 - s0) * v / max, major = Math.abs(v / lab - Math.round(v / lab)) < 1e-6;
      line(ctx, [x + W / 2 - (major ? 22 : 12), yy], [x + W / 2, yy], { w: major ? 2.4 : 1.4, dry: false, taper: 0, noBoil: true });
      if (major) txt(ctx, String(v), x + W / 2 + 10, yy + 11, { size: o.num ?? 32 });
    }
    txt(ctx, 'N', x + W / 2 + 10, top + 30, { size: 32, color: AMB });
    ctx.restore();
    // spring
    const sw = th > 1 ? 6 : 2.4;
    spring(ctx, x, top + 10, py - 4, { coils: th > 1 ? 8 : 13, r: W * 0.27, w: sw });
    line(ctx, [x - W / 2 + 4, top + 8], [x + W / 2 - 4, top + 8], { w: 4, dry: false, taper: 0 });
    // rod down to hook
    const hy = py + (bot - s0) + 26;
    line(ctx, [x, py], [x, hy], { w: 4, dry: false, taper: 0 });
    // pointer (gösterge)
    P.fillPts(ctx, rect(x - W / 2 + 3, py - 5, x + W / 2 + 2, py + 5), AMB, 0.95);
    stroke(ctx, rect(x - W / 2 + 3, py - 5, x + W / 2 + 2, py + 5), { w: 1.6, closed: true, dry: false, noBoil: true });
    // bottom cap
    P.fillPts(ctx, rect(x - W / 2, bot - 8, x + W / 2, bot + 4), PAL.paperDeep, 1);
    stroke(ctx, tube, { w: 3.2, closed: true, seed: 820, noBoil: true });
    // hook
    const hk = P.arc(x, hy + 16, 16, -Math.PI / 2, Math.PI * 1.05, 24);
    stroke(ctx, hk, { w: 4.4, seed: 830, taper: 0.1 });
    return { hook: [x, hy + 32], py, s0, s1, top, bot, W };
  }

  // hanging string from hook point down `len`
  const str = (ctx, x, y, len) => { stroke(ctx, circlePts(x, y - 4, 7, 6, 16), { w: 2, closed: true, dry: false }); line(ctx, [x, y + 2], [x, y + len], { w: 2, dry: false }); };
  // objects hang from (x,y) = hook point; each returns bottom y
  function apple(ctx, x, y, s = 1) {
    str(ctx, x, y, 22 * s); const cy = y + 22 * s + 48 * s;
    const body = wobble(circlePts(x, cy, 52 * s, 46 * s, 50), 1.5, 901);
    P.fillPts(ctx, body, '#F2D3B8'); wash(ctx, body, '#B5553F', 0.6, 902, { bleed: 2 }); stroke(ctx, body, { w: 3, closed: true, seed: 903 });
    const leaf = [[x + 4, cy - 44 * s], [x + 30 * s, cy - 62 * s], [x + 44 * s, cy - 50 * s], [x + 18 * s, cy - 40 * s]]; P.fillPts(ctx, leaf, PAL.life, 0.8); stroke(ctx, leaf.concat([leaf[0]]), { w: 2, dry: false });
    return cy + 46 * s;
  }
  function book(ctx, x, y, s = 1) {
    str(ctx, x, y, 30 * s); const t = y + 30 * s;
    line(ctx, [x, t], [x - 70 * s, t + 22 * s], { w: 2, dry: false }); line(ctx, [x, t], [x + 70 * s, t + 22 * s], { w: 2, dry: false });
    const b = rect(x - 80 * s, t + 22 * s, x + 80 * s, t + 130 * s); P.fillPts(ctx, b, PAL.paper); wash(ctx, b, PAL.life, 0.5, 911, { bleed: 1.5, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 912 });
    line(ctx, [x - 80 * s, t + 112 * s], [x + 80 * s, t + 112 * s], { w: 1.6, dry: false }); txt(ctx, 'FEN', x, t + 84 * s, { size: 34 * s, align: 'center', alpha: 0.8 });
    return t + 130 * s;
  }
  function bottle(ctx, x, y, s = 1) {
    str(ctx, x, y, 22 * s); const t = y + 22 * s;
    const cap = rect(x - 14 * s, t, x + 14 * s, t + 20 * s); P.fillPts(ctx, cap, PAL.water, 0.8); stroke(ctx, cap, { w: 2.4, closed: true, dry: false });
    const b = [[x - 14 * s, t + 20 * s], [x + 14 * s, t + 20 * s], [x + 40 * s, t + 60 * s], [x + 40 * s, t + 200 * s], [x - 40 * s, t + 200 * s], [x - 40 * s, t + 60 * s], [x - 14 * s, t + 20 * s]];
    P.fillPts(ctx, b, PAL.white, 0.8); const water = [[x - 40 * s, t + 80 * s], [x + 40 * s, t + 80 * s], [x + 40 * s, t + 200 * s], [x - 40 * s, t + 200 * s]]; wash(ctx, water, PAL.water, 0.45, 921, { bleed: 1 });
    stroke(ctx, b, { w: 3, closed: true, seed: 922 }); line(ctx, [x - 40 * s, t + 80 * s], [x + 40 * s, t + 80 * s], { w: 1.4, dry: false, alpha: 0.6 });
    return t + 200 * s;
  }
  function bag(ctx, x, y, s = 1) {
    const t = y + 4 * s;
    stroke(ctx, P.arc(x, t + 50 * s, 44 * s, Math.PI * 1.1, Math.PI * 1.9, 20), { w: 5, seed: 931 });
    const b = [[x - 95 * s, t + 40 * s], [x + 95 * s, t + 40 * s], [x + 105 * s, t + 250 * s], [x - 105 * s, t + 250 * s], [x - 95 * s, t + 40 * s]];
    P.fillPts(ctx, b, PAL.paper); wash(ctx, b, '#B5553F', 0.55, 932, { bleed: 2, blooms: 2 }); stroke(ctx, b, { w: 3.4, closed: true, seed: 933 });
    const pk = rect(x - 60 * s, t + 140 * s, x + 60 * s, t + 225 * s); wash(ctx, pk, '#8A6A45', 0.35, 934, { bleed: 1 }); stroke(ctx, pk, { w: 2.4, closed: true, seed: 935 });
    line(ctx, [x - 60 * s, t + 165 * s], [x + 60 * s, t + 165 * s], { w: 2, dry: false });
    return t + 250 * s;
  }
  // el kantarı (spring hand scale) with a bag of tomatoes, size ~ 1 → 360px tall
  function kantar(ctx, x, y, s = 1, F = 0.5) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, P.arc(0, -150, 46, Math.PI, 2 * Math.PI, 20), { w: 9, seed: 941 }); line(ctx, [-46, -150], [46, -150], { w: 9, taper: 0 });
    line(ctx, [0, -150], [0, -120], { w: 5, dry: false });
    const body = circlePts(0, -60, 62, 62, 50); P.fillPts(ctx, body, PAL.white); wash(ctx, body, PAL.water, 0.2, 942, { bleed: 1, blooms: 0 }); stroke(ctx, body, { w: 4, closed: true, seed: 943 });
    for (let i = 0; i <= 10; i++) { const a = -Math.PI * 1.25 + i / 10 * Math.PI * 1.5; line(ctx, [Math.cos(a) * 44, -60 + Math.sin(a) * 44], [Math.cos(a) * 54, -60 + Math.sin(a) * 54], { w: i % 5 ? 1.4 : 2.6, dry: false, taper: 0 }); }
    const a = -Math.PI * 1.25 + F * Math.PI * 1.5; line(ctx, [0, -60], [Math.cos(a) * 42, -60 + Math.sin(a) * 42], { w: 3.4, color: AMB, dry: false }); inkDot(ctx, 0, -60, 4);
    line(ctx, [0, 2], [0, 30], { w: 4, dry: false }); stroke(ctx, P.arc(0, 42, 12, -Math.PI / 2, Math.PI, 16), { w: 4 });
    const sack = [[-50, 70], [50, 70], [70, 190], [-70, 190], [-50, 70]]; P.fillPts(ctx, sack, PAL.paper); wash(ctx, sack, '#B5553F', 0.18, 944, { bleed: 1 }); stroke(ctx, sack, { w: 3, closed: true, seed: 945 });
    line(ctx, [-50, 70], [0, 54], { w: 2 }); line(ctx, [50, 70], [0, 54], { w: 2 });
    [[-28, 120], [12, 110], [34, 150], [-10, 158], [-40, 162]].forEach(([tx, ty], i) => { const c = circlePts(tx, ty, 20, 18, 20); P.fillPts(ctx, c,'#C8573A', 0.75); stroke(ctx, c, { w: 1.8, closed: true, dry: false, seed: 950 + i }); });
    ctx.restore();
  }
  // toy car (side view), x,y = bottom center
  function car(ctx, x, y, s = 1, t = 0, rolled = 0) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-90, -30], [-80, -62], [-30, -66], [-10, -98], [50, -98], [70, -64], [92, -58], [94, -30], [-90, -30]];
    P.fillPts(ctx, body, PAL.paper); wash(ctx, body, PAL.water, 0.5, 961, { bleed: 1.5, blooms: 1 }); stroke(ctx, body, { w: 3.2, closed: true, seed: 962 });
    const win = [[-2, -90], [44, -90], [60, -66], [-14, -66], [-2, -90]]; P.fillPts(ctx, win, PAL.white, 0.9); stroke(ctx, win, { w: 2, closed: true, dry: false });
    [-52, 56].forEach((wx, i) => {
      const w = circlePts(wx, -22, 22, 22, 28); P.fillPts(ctx, w, PAL.ink, 0.9); P.fillPts(ctx, circlePts(wx, -22, 8, 8, 16), PAL.paperDeep);
      const a = -rolled / 22; line(ctx, [wx, -22], [wx + Math.cos(a) * 16, -22 + Math.sin(a) * 16], { w: 2, color: PAL.paperDeep, dry: false });
    });
    ctx.restore();
  }
  // ruled table: cols = [w...], rows = [[..],[..]] (first row header). k = reveal per row via fn(i)
  function table(ctx, x, y, cols, rows, rowH, kFn, o = {}) {
    const W = cols.reduce((a, b) => a + b, 0);
    rows.forEach((r, i) => {
      const k = kFn(i); if (k <= 0) return; const yy = y + i * rowH;
      if (i === 0) P.fillPts(ctx, rect(x, yy, x + W, yy + rowH), PAL.light, 0.25 * Math.min(1, k * 2));
      line(ctx, [x, yy + rowH], [x + W * Math.min(1, k * 1.5), yy + rowH], { w: i === 0 ? 3 : 1.8, dry: false, seed: 970 + i });
      let cx = x; r.forEach((c, j) => { P.write(ctx, c, cx + 20, yy + rowH * 0.7, E.clamp(k * (1 + 0.3 * cols.length) - j * 0.3), { size: o.size ?? 40, weight: i === 0 ? 700 : 400, color: (o.colColor && i > 0 && o.colColor[j]) || PAL.ink }); cx += cols[j]; });
    });
    if (kFn(0) > 0) { let cx = x; const n = rows.filter((r, i) => kFn(i) > 0).length; for (let j = 1; j < cols.length; j++) { cx += cols[j - 1]; line(ctx, [cx, y], [cx, y + rowH * n], { w: 1.8, dry: false, seed: 990 + j }); } }
  }
  return { AMB, rect, txt, spring, dyn, apple, book, bottle, bag, kantar, car, table };
})();
// room floor (desk/classroom floor) under y
F64.floor = function (ctx, y, seed = 1) {
  const { PAL, stroke, wash } = INK;
  const f = [[-200, y], [2120, y], [2120, 1300], [-200, 1300]];
  P.fillPts(ctx, f, PAL.paper, 1); wash(ctx, f, '#8A6A45', 0.22, 1700 + seed, { bleed: 3, blooms: 2 });
  stroke(ctx, [[-100, y], [700, y - 2], [1400, y + 1], [2020, y - 1]], { w: 3.4, seed: 1710 + seed, taper: 0.02 });
  for (let i = 0; i < 9; i++) { const x = -60 + i * 250; INK.line(ctx, [x, y + 20], [x - 60, 1100], { w: 1.2, alpha: 0.25, dry: false, seed: 1720 + i }); }
};
// paper card with shadow
F64.card = function (ctx, x0, y0, x1, y1, o = {}) {
  const c = [[x0, y0], [x1, y0 - 4], [x1 + 4, y1], [x0 + 3, y1 + 3], [x0, y0]];
  ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
  INK.stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color, seed: o.seed ?? 1800 });
};

// ---------------- Film 4'e özgü ----------------
(function () {
  const { PAL, line, stroke, circlePts, wash, inkDot, dashed } = INK;
  const F = window.F64;
  F.BR = '#8A4A10';              // kuvvet okları (seri: film 5 ile aynı)
  F.RES = '#1C1B22';             // bileşke: kalın mürekkep + kehribar vurgulu şerit
  F.BAL = '#6F8A3A';             // dengeleyici kuvvet
  F.U = 60;                      // ölçek: 1 N = 60 px (defterde 1 kare)

  F.title = function (ctx, t, n, name, unit) {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, n + ' · ' + name, 960, 285, t, 1.2, t1, { size: 54, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = function (ctx, t, name, code) {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.9; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, name, 960, 515, { size: 52, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // kareli defter zemini: hücre = U px, x ekseni 'ox' noktasına hizalı
  F.grid = function (ctx, x0, y0, x1, y1, ox, oy, a = 1) {
    const U = F.U;
    P.fillPts(ctx, [[x0 - 8, y0 - 8], [x1 + 8, y0 - 10], [x1 + 10, y1 + 8], [x0 - 6, y1 + 10]], '#FAF6EC', 0.92 * a);
    ctx.save(); ctx.globalAlpha *= 0.28 * a; ctx.strokeStyle = PAL.water; ctx.lineWidth = 1.3;
    for (let x = ox - Math.floor((ox - x0) / U) * U; x <= x1; x += U) { ctx.beginPath(); ctx.moveTo(x, y0); ctx.lineTo(x, y1); ctx.stroke(); }
    for (let y = oy - Math.floor((oy - y0) / U) * U; y <= y1; y += U) { ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= a; stroke(ctx, [[x0 - 8, y0 - 8], [x1 + 8, y0 - 10], [x1 + 10, y1 + 8], [x0 - 6, y1 + 10], [x0 - 8, y0 - 8]], { w: 2, closed: true, seed: 3001, noBoil: true }); ctx.restore();
  };
  // ölçekli kuvvet oku: xa uygulama noktası, n (N) büyüklük, dir ±1, k çizim ilerlemesi
  F.farrow = function (ctx, xa, y, n, dir, k, o = {}) {
    if (k <= 0 || n <= 0) return;
    const U = F.U, L = n * U, col = o.color ?? F.BR, w = o.w ?? 6;
    const x1 = xa + dir * L * Math.min(1, k);
    if (o.res) { ctx.save(); ctx.globalAlpha *= 0.55; P.fillPts(ctx, [[xa, y - 13], [x1, y - 13], [x1, y + 13], [xa, y + 13]], PAL.light, 0.6); ctx.restore(); }
    stroke(ctx, [[xa, y], [x1 - dir * 4, y]], { w, color: col, taper: 0.02, dry: false, vary: 0.2, seed: o.seed ?? 3010 });
    if (k >= 0.98) {
      const h = o.head ?? 20;
      P.fillPts(ctx, [[x1 + dir * 4, y], [x1 - dir * h * 1.3, y - h * 0.62], [x1 - dir * h * 1.05, y], [x1 - dir * h * 1.3, y + h * 0.62]], col, 1);
    }
    if (o.dot !== false) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(xa, y, w * 1.25, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.label && k > 0.6) {
      ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.6) * 2.5);
      ctx.font = `700 ${o.size ?? 40}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = o.lcolor ?? col;
      ctx.fillText(o.label, xa + dir * L / 2, y + (o.ly ?? -22)); ctx.restore();
    }
  };
  // tahta kasa: cx merkez, fy zemin
  F.box = function (ctx, cx, fy, w = 190, h = 150, seed = 3050) {
    const b = [[cx - w / 2, fy - h], [cx + w / 2, fy - h - 2], [cx + w / 2 + 2, fy], [cx - w / 2, fy], [cx - w / 2, fy - h]];
    P.fillPts(ctx, b, '#E8D2A8'); wash(ctx, b, '#8A6A45', 0.45, seed, { bleed: 1.5, blooms: 1 });
    for (let i = 1; i < 3; i++) line(ctx, [cx - w / 2 + 6, fy - h * i / 3], [cx + w / 2 - 6, fy - h * i / 3], { w: 1.6, alpha: 0.55, dry: false, seed: seed + i });
    line(ctx, [cx - w / 2 + 10, fy - h + 8], [cx + w / 2 - 10, fy - 8], { w: 2.4, alpha: 0.6, dry: false, seed: seed + 5 });
    stroke(ctx, b, { w: 3.2, closed: true, seed: seed + 9 });
  };
  // yatay dinamometre: kanca (hx,y) noktasında, gövde dir yönünde uzanır (dir=+1 sağa çeker)
  F.hdyn = function (ctx, hx, y, dir, force, o = {}) {
    const L = o.L ?? 250, W = o.W ?? 56, max = o.max ?? 10, s = o.s ?? 1;
    const top = 44, bot = top + L, s0 = top + L * 0.3, s1 = bot - 34;
    const frac = Math.min(1, Math.max(0, force) / max), py = s0 + (s1 - s0) * frac;
    const hookY = py + (bot - s0) + 26 + 32;
    ctx.save(); ctx.translate(hx, y); ctx.scale(s, s); ctx.rotate(dir > 0 ? Math.PI / 2 : -Math.PI / 2); ctx.translate(0, -hookY);
    F.dyn(ctx, 0, 0, { L, W, max, F: force, num: 24, step: 1, lab: 2 });
    ctx.restore();
    return hx + dir * (hookY) * s; // halka ucu
  };
  // ip (hafif sarkık değil, gergin)
  F.rope = function (ctx, a, b, seed = 3070) { line(ctx, a, b, { w: 2.6, dry: false, seed, color: '#6B5236', taper: 0.02 }); };
  // okunabilir büyük değer etiketi
  F.tag = function (ctx, txt, x, y, o = {}) {
    ctx.save(); ctx.font = `700 ${o.size ?? 44}px Kalam`; const w = ctx.measureText(txt).width;
    const pad = 16, h = (o.size ?? 44) * 1.25;
    const bx = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
    const r = [[bx - pad, y - h * 0.78], [bx + w + pad, y - h * 0.8], [bx + w + pad + 2, y + h * 0.3], [bx - pad, y + h * 0.32], [bx - pad, y - h * 0.78]];
    P.fillPts(ctx, r, o.fill ?? '#FBF8F1', 0.95); stroke(ctx, r, { w: 2, closed: true, dry: false, seed: o.seed ?? 3090, color: o.color ?? PAL.ink });
    ctx.fillStyle = o.color ?? PAL.ink; ctx.textAlign = 'left'; ctx.fillText(txt, bx, y); ctx.restore();
  };
})();
// kasa + dinamometre düzeneği. R/L: [{F, dy, color}] sağa/sola çeken dinamometreler (dy: kutu ortasına göre)
F64.rig = function (ctx, cx, fy, R = [], L = [], o = {}) {
  const w = o.w ?? 180, h = o.h ?? 170, gap = o.gap ?? 70, s = o.s ?? 0.72;
  INK.line(ctx, [cx - 900, fy], [cx + 900, fy + 2], { w: 3, seed: 3060, taper: 0.02 });
  F64.box(ctx, cx, fy, w, h, 3051);
  const my = fy - h / 2;
  const one = (d, dir, i) => {
    const y = my + (d.dy ?? 0), ex = cx + dir * w / 2, hx = ex + dir * gap;
    F64.rope(ctx, [ex, y], [hx, y], 3075 + i);
    ctx.save(); if (d.alpha != null) ctx.globalAlpha *= d.alpha;
    const re = F64.hdyn(ctx, hx, y, dir, d.F, { s });
    if (d.label !== false) F64.tag(ctx, d.F + ' N', re + dir * 62, y + 14, { size: 40, color: d.color ?? F64.BR, seed: 3095 + i });
    ctx.restore();
  };
  R.forEach((d, i) => one(d, 1, i)); L.forEach((d, i) => one(d, -1, i + 5));
};

// ---------------- Film 4'e özgü ----------------
F64.YOL = '#8A4A10';        // alınan yol (kahverengi iz)
F64.YER = '#2E6A8C';        // yer değiştirme / hız oku (mavi)
F64.house = function (ctx, x, y, s = 1) { // y: zemin
  const { PAL, stroke, wash } = INK;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const b = [[-80, 0], [-80, -110], [80, -110], [80, 0], [-80, 0]]; P.fillPts(ctx, b, '#FBF8F1'); wash(ctx, b, '#B5553F', 0.25, 4001, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 4002 });
  const r = [[-100, -110], [0, -190], [100, -110], [-100, -110]]; P.fillPts(ctx, r, '#8A4A10', 0.7); stroke(ctx, r, { w: 3, closed: true, seed: 4003 });
  const d = [[-20, 0], [-20, -60], [20, -60], [20, 0]]; P.fillPts(ctx, d, '#8A6A45', 0.8); stroke(ctx, d, { w: 2.4, seed: 4004 });
  const w = [[35, -85], [65, -85], [65, -55], [35, -55], [35, -85]]; P.fillPts(ctx, w, PAL.water, 0.35); stroke(ctx, w, { w: 2, closed: true, dry: false });
  ctx.restore();
};
F64.school = function (ctx, x, y, s = 1) {
  const { PAL, stroke, wash, line } = INK;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const b = [[-150, 0], [-150, -150], [150, -150], [150, 0], [-150, 0]]; P.fillPts(ctx, b, '#FBF8F1'); wash(ctx, b, PAL.light, 0.3, 4011, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 4012 });
  const r = [[-165, -150], [0, -205], [165, -150], [-165, -150]]; P.fillPts(ctx, r, '#8A6A45', 0.6); stroke(ctx, r, { w: 3, closed: true, seed: 4013 });
  for (let i = 0; i < 4; i++) { const wx = -120 + i * 70; const w = [[wx, -120], [wx + 40, -120], [wx + 40, -85], [wx, -85], [wx, -120]]; P.fillPts(ctx, w, PAL.water, 0.3); stroke(ctx, w, { w: 1.8, closed: true, dry: false }); }
  const d = [[-25, 0], [-25, -55], [25, -55], [25, 0]]; P.fillPts(ctx, d, '#8A6A45', 0.8); stroke(ctx, d, { w: 2.4, seed: 4014 });
  line(ctx, [0, -205], [0, -260], { w: 2.4 }); P.fillPts(ctx, [[0, -260], [40, -250], [0, -238]], '#E3A03A', 0.9);
  ctx.font = '700 30px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('OKUL', 0, -160 + 0);
  ctx.restore();
};
// bisiklet (yan görünüş), x,y = teker altı ortası; roll: tekerlek dönüşü (px)
F64.bike = function (ctx, x, y, s = 1, roll = 0) {
  const { PAL, stroke, line, circlePts } = INK;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  [-55, 55].forEach((wx, i) => { stroke(ctx, circlePts(wx, -38, 36, 36, 32), { w: 3.4, closed: true, seed: 4020 + i, dry: false }); const a = roll / 36; for (let k = 0; k < 3; k++) line(ctx, [wx, -38], [wx + Math.cos(a + k * 2.09) * 34, -38 + Math.sin(a + k * 2.09) * 34], { w: 1.2, dry: false, alpha: 0.6 }); });
  const fr = [[-55, -38], [-10, -38], [30, -86], [-28, -86], [-55, -38]]; stroke(ctx, fr, { w: 4, color: PAL.water, seed: 4025, dry: false });
  line(ctx, [-10, -38], [-34, -100], { w: 4, color: PAL.water, dry: false }); line(ctx, [30, -86], [55, -38], { w: 4, color: PAL.water, dry: false });
  line(ctx, [30, -86], [36, -112], { w: 3.4, dry: false }); line(ctx, [26, -112], [50, -114], { w: 4, dry: false });
  P.fillPts(ctx, [[-50, -104], [-18, -104], [-22, -96], [-48, -96]], PAL.ink, 0.9);
  // rider (simple child silhouette)
  line(ctx, [-34, -104], [-10, -170], { w: 7, color: '#B5553F', dry: false }); line(ctx, [-16, -150], [36, -112], { w: 4, color: '#B5553F', dry: false });
  P.fillPts(ctx, circlePts(-4, -192, 20, 20, 20), '#F2D3B8'); stroke(ctx, circlePts(-4, -192, 20, 20, 20), { w: 2.4, closed: true, dry: false });
  const pd = roll / 20; line(ctx, [-30, -104], [-10 + Math.cos(pd) * 14, -38 + Math.sin(pd) * 14], { w: 5, color: '#5A4632', dry: false });
  ctx.restore();
};
// yüzücü (üstten), x,y merkez; dir: +1 sağa
F64.swimmer = function (ctx, x, y, dir, t) {
  const { PAL, stroke, line, circlePts } = INK;
  ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
  const a = Math.sin(t * 8) * 0.8;
  line(ctx, [-40, 0], [10, 0], { w: 16, color: '#B5553F', dry: false, taper: 0.3 });
  line(ctx, [0, -6], [0 + Math.cos(a) * 38, -26], { w: 6, color: '#E0B090', dry: false }); line(ctx, [0, 6], [0 - Math.cos(a) * 38 + 20, 26], { w: 6, color: '#E0B090', dry: false });
  P.fillPts(ctx, circlePts(22, 0, 13, 12, 18), '#2E6A8C'); stroke(ctx, circlePts(22, 0, 13, 12, 18), { w: 2, closed: true, dry: false });
  for (let i = 0; i < 3; i++) stroke(ctx, P.arc(-60 - i * 18, 0, 10 + i * 5, 1.9, 4.4, 10), { w: 1.6, color: PAL.white, alpha: 0.9, dry: false });
  ctx.restore();
};
// hız göstergesi (km/h): v değeri
F64.gauge = function (ctx, x, y, r, v, max = 120) {
  const { PAL, stroke, line, circlePts, inkDot } = INK;
  const c = circlePts(x, y, r, r, 60); P.fillPts(ctx, c, '#FBF8F1'); stroke(ctx, c, { w: 5, closed: true, seed: 4040 });
  const a0 = Math.PI * 0.75, a1 = Math.PI * 2.25;
  for (let k = 0; k <= max; k += 10) {
    const a = a0 + (a1 - a0) * k / max, big = k % 20 === 0;
    line(ctx, [x + Math.cos(a) * r * (big ? 0.78 : 0.85), y + Math.sin(a) * r * (big ? 0.78 : 0.85)], [x + Math.cos(a) * r * 0.93, y + Math.sin(a) * r * 0.93], { w: big ? 3 : 1.6, dry: false, taper: 0 });
    if (big) { ctx.save(); ctx.font = `700 ${r * 0.14}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(String(k), x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62 + r * 0.05); ctx.restore(); }
  }
  const a = a0 + (a1 - a0) * v / max;
  line(ctx, [x, y], [x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8], { w: 6, color: '#C07F1E', dry: false, taper: 0.3 });
  inkDot(ctx, x, y, 10);
  ctx.save(); ctx.font = `700 ${r * 0.2}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('km/h', x, y + r * 0.5); ctx.restore();
};
// yön oku (hız oku) — büyüklük ölçekli
F64.varrow = function (ctx, a, b, k = 1, o = {}) { P.arrow(ctx, a, b, k, { w: o.w ?? 6, head: o.head ?? 20, color: o.color ?? F64.YER }); };

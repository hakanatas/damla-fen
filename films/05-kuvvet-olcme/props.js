// props.js — Film 5'e özel çizim yardımcıları: yay, dinamometre, asılan cisimler, el kantarı, tablo
// Global: window.F05
window.F05 = (function () {
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
F05.floor = function (ctx, y, seed = 1) {
  const { PAL, stroke, wash } = INK;
  const f = [[-200, y], [2120, y], [2120, 1300], [-200, 1300]];
  P.fillPts(ctx, f, PAL.paper, 1); wash(ctx, f, '#8A6A45', 0.22, 1700 + seed, { bleed: 3, blooms: 2 });
  stroke(ctx, [[-100, y], [700, y - 2], [1400, y + 1], [2020, y - 1]], { w: 3.4, seed: 1710 + seed, taper: 0.02 });
  for (let i = 0; i < 9; i++) { const x = -60 + i * 250; INK.line(ctx, [x, y + 20], [x - 60, 1100], { w: 1.2, alpha: 0.25, dry: false, seed: 1720 + i }); }
};
// title card lines (same as series)
F05.title = function (ctx, t, n, name, unit) {
  const t1 = E.e('title') + 1.4;
  E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
  E.inkText(ctx, n + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
  E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
  if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: INK.PAL.light }); ctx.restore(); }
};
// end card (same as series)
F05.endCard = function (ctx, t, name, code) {
  const { PAL } = INK; const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
  if (ek > 0) E.layer(ctx, ek, c => {
    c.fillStyle = PAL.paper; c.globalAlpha = 0.9; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
    INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
    INK.label(c, name, 960, 515, { size: 56, weight: 700, align: 'center' });
    P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
    INK.label(c, 'Fen Bilimleri · 5. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
    INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
    DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
  });
};
// paper card with shadow
F05.card = function (ctx, x0, y0, x1, y1, o = {}) {
  const c = [[x0, y0], [x1, y0 - 4], [x1 + 4, y1], [x0 + 3, y1 + 3], [x0, y0]];
  ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
  INK.stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color, seed: o.seed ?? 1800 });
};

// props.js — 6. sınıf Film 17'ye özel çizim yardımcıları (window.F617)
// Eşit kollu terazi + kütle takımı (films/07-kutle-agirlik'ten uyarlandı), dereceli silindir, taşırma kabı,
// küpler (tahta / demir), taş, mum, beher, su tankı, kart, tablo, başlık ve bitiş kartları.
// Tüm çizimler t'nin saf fonksiyonudur.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const F = {};
  const AMB = '#C07F1E', RED = '#A23A2A', OIL = '#C9A227';
  F.AMB = AMB; F.RED = RED; F.OIL = OIL;
  F.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  // kesikli çizgi için yoğun noktalar (INK.dashed yalnızca ardışık noktalar arasında çalışır)
  F.densePts = (a, b, n = 60) => { const o = []; for (let i = 0; i <= n; i++) o.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return o; };
  F.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillText(s, x, y); ctx.restore(); };

  // ---- masa / zemin
  F.desk = (ctx, y = 860, seed = 1) => {
    const f = [[-200, y], [2120, y], [2120, 1300], [-200, 1300]];
    P.fillPts(ctx, f, PAL.paper, 1); wash(ctx, f, '#8A6A45', 0.22, 1700 + seed, { bleed: 3, blooms: 2 });
    stroke(ctx, [[-100, y], [700, y - 2], [1400, y + 1], [2020, y - 1]], { w: 3.4, seed: 1710 + seed, taper: 0.02 });
    for (let i = 0; i < 9; i++) { const x = -60 + i * 250; line(ctx, [x, y + 20], [x - 60, 1100], { w: 1.2, alpha: 0.25, dry: false, seed: 1720 + i }); }
  };

  // ---- kâğıt kart (x0,y0,x1,y1)
  F.card = (ctx, x0, y0, x1, y1, o = {}) => {
    const c = [[x0, y0], [x1, y0 - 4], [x1 + 4, y1], [x0 + 3, y1 + 3], [x0, y0]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color, seed: o.seed ?? 1800 });
  };

  // ---- eşit kollu terazi. (x,y) taban alt orta. o: s, tilt (rad, + → sağ kefe aşağı), left/right: fn(ctx, px, panY)
  F.balance = (ctx, x, y, o = {}) => {
    const s = o.s ?? 1, tilt = o.tilt ?? 0;
    const H = 300 * s, arm = 210 * s, hang = 150 * s;
    const base = [[x - 110 * s, y], [x + 110 * s, y], [x + 80 * s, y - 28 * s], [x - 80 * s, y - 28 * s], [x - 110 * s, y]];
    P.fillPts(ctx, base, '#C9A87A'); wash(ctx, base, '#8A6A45', 0.35, 4001, { bleed: 1, blooms: 0 }); stroke(ctx, base, { w: 3, closed: true, seed: 4002 });
    line(ctx, [x, y - 28 * s], [x, y - H], { w: 8 * s, taper: 0, seed: 4003 });
    stroke(ctx, P.arc(x, y - H, 110 * s, Math.PI / 2 - 0.35, Math.PI / 2 + 0.35, 14), { w: 2, dry: false, alpha: 0.7 });
    line(ctx, [x, y - H + 102 * s], [x, y - H + 118 * s], { w: 2.4, dry: false });
    const na = Math.PI / 2 - tilt;
    line(ctx, [x, y - H], [x + Math.cos(na) * 112 * s, y - H + Math.sin(na) * 112 * s], { w: 3, color: AMB, dry: false, taper: 0 });
    const ex = Math.cos(tilt) * arm, ey = Math.sin(tilt) * arm;
    const L = [x - ex, y - H - ey], R = [x + ex, y - H + ey];
    line(ctx, L, R, { w: 9 * s, taper: 0.02, seed: 4004 }); inkDot(ctx, x, y - H, 7 * s);
    const pans = [];
    [[L, o.left], [R, o.right]].forEach(([e, fn], i) => {
      const pc = [e[0], e[1] + hang];
      line(ctx, e, [pc[0] - 70 * s, pc[1]], { w: 1.8, dry: false }); line(ctx, e, [pc[0] + 70 * s, pc[1]], { w: 1.8, dry: false });
      if (fn) fn(ctx, pc[0], pc[1]);
      const bowl = P.arc(pc[0], pc[1], 78 * s, 0, Math.PI, 20, 22 * s);
      P.fillPts(ctx, bowl.concat([[pc[0] - 78 * s, pc[1]]]), '#D8C39A'); stroke(ctx, bowl, { w: 3, seed: 4010 + i }); line(ctx, [pc[0] - 80 * s, pc[1]], [pc[0] + 80 * s, pc[1]], { w: 3, dry: false, taper: 0 });
      pans.push(pc);
    });
    return { pans, pivot: [x, y - H] };
  };
  // kütle takımı parçası (x, by alt orta); lab: '50 g'
  F.mass = (ctx, x, by, lab, sc = 1) => {
    const w = 34 * sc, h = 48 * sc;
    const b = [[x - w, by], [x + w, by], [x + w * 0.9, by - h], [x - w * 0.9, by - h], [x - w, by]];
    P.fillPts(ctx, b, '#C9A04A'); wash(ctx, b, '#8A5A12', 0.3, 4020, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, dry: false });
    const k = circlePts(x, by - h - 8 * sc, 12 * sc, 10 * sc, 16); P.fillPts(ctx, k, '#C9A04A'); stroke(ctx, k, { w: 2, closed: true, dry: false });
    F.txt(ctx, lab, x, by - h * 0.28, { size: 24 * sc, align: 'center' });
  };

  // ---- küp (x, by alt orta, a kenar px). kind: 'wood' | 'iron'
  F.cube = (ctx, x, by, a, kind = 'wood', o = {}) => {
    const d = a * 0.28, seed = o.seed ?? (kind === 'wood' ? 300 : 320);
    const front = [[x - a / 2, by], [x + a / 2, by], [x + a / 2, by - a], [x - a / 2, by - a], [x - a / 2, by]];
    const top = [[x - a / 2, by - a], [x + a / 2, by - a], [x + a / 2 + d, by - a - d * 0.8], [x - a / 2 + d, by - a - d * 0.8], [x - a / 2, by - a]];
    const side = [[x + a / 2, by], [x + a / 2 + d, by - d * 0.8], [x + a / 2 + d, by - a - d * 0.8], [x + a / 2, by - a], [x + a / 2, by]];
    const base = kind === 'wood' ? ['#E2BE86', '#8A5A2A'] : kind === 'wax' ? ['#F4EEDD', '#B8A57A'] : ['#A7A9AE', '#3E4049'];
    P.fillPts(ctx, front, base[0]); wash(ctx, front, base[1], kind === 'wood' ? 0.4 : 0.5, seed, { bleed: 1, blooms: 1 });
    P.fillPts(ctx, top, base[0]); wash(ctx, top, base[1], 0.22, seed + 1, { bleed: 1, blooms: 0 });
    P.fillPts(ctx, side, base[0]); wash(ctx, side, base[1], 0.65, seed + 2, { bleed: 1, blooms: 0 });
    if (kind === 'wood') for (let i = 1; i < 4; i++) line(ctx, [x - a / 2 + 6, by - i * a / 4], [x + a / 2 - 6, by - i * a / 4 + 3], { w: 1.2, alpha: 0.45, dry: false, bend: 0.04, seed: seed + 10 + i });
    else if (kind === 'iron') line(ctx, [x - a / 2 + a * 0.15, by - a * 0.8], [x - a / 2 + a * 0.35, by - a * 0.8], { w: 3, color: PAL.white, alpha: 0.7, dry: false });
    [front, top, side].forEach((p, i) => stroke(ctx, p, { w: o.w ?? 2.8, closed: true, seed: seed + 5 + i, dry: false }));
  };
  // ---- taş (x,y alt orta)
  F.stone = (ctx, x, y, s = 1, seed = 5) => {
    const pts = wobble(circlePts(x, y - 30 * s, 44 * s, 30 * s, 40), 4 * s, seed);
    P.fillPts(ctx, pts, '#B9B2A3'); wash(ctx, pts, '#6E675C', 0.5, seed + 1, { bleed: 1.5, blooms: 2 });
    stroke(ctx, pts, { w: 3, closed: true, seed: seed + 2 });
    line(ctx, [x - 18 * s, y - 40 * s], [x + 6 * s, y - 46 * s], { w: 1.4, dry: false, alpha: 0.5 });
  };
  // ---- mum (x,y alt orta)
  F.candle = (ctx, x, y, s = 1, o = {}) => {
    const w = 34 * s, h = 110 * s;
    const b = [[x - w, y], [x + w, y], [x + w, y - h], [x - w, y - h], [x - w, y]];
    P.fillPts(ctx, b, '#F6F0DF'); wash(ctx, b, '#C9B98F', 0.3, 3401, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.8, closed: true, seed: 3402, dry: false });
    stroke(ctx, circlePts(x, y - h, w, 8 * s, 24), { w: 2, closed: true, dry: false, alpha: 0.8 });
    line(ctx, [x, y - h], [x + 2, y - h - 18 * s], { w: 3, dry: false, taper: 0.1 });
  };

  // ---- dereceli silindir. (x, by) alt orta. w,h iç ölçüler (px); max: en üst çizgi (cm³); level: su (cm³)
  // döner: yFor(v) → v cm³ seviyesinin y'si
  F.cylinder = (ctx, x, by, w, h, max, level, o = {}) => {
    const x0 = x - w / 2, x1 = x + w / 2, y0 = by - h;
    const yFor = v => by - h * v / max;
    const foot = [[x - w * 1.1, by + 14], [x + w * 1.1, by + 14], [x + w * 0.9, by], [x - w * 0.9, by], [x - w * 1.1, by + 14]];
    P.fillPts(ctx, foot, '#D9CFBC'); stroke(ctx, foot, { w: 2.6, closed: true, dry: false, seed: 3501 });
    P.fillPts(ctx, F.rect(x0, y0 - 30, x1, by), PAL.white, 0.5);
    if (level > 0) {
      const wy = yFor(level); const wp = [[x0 + 3, wy], [x1 - 3, wy], [x1 - 3, by - 2], [x0 + 3, by - 2], [x0 + 3, wy]];
      wash(ctx, wp, o.color ?? PAL.water, 0.42, 3510, { bleed: 1, blooms: 1 });
      stroke(ctx, P.bez([x0 + 3, wy - 4], [x, wy + 6], [x1 - 3, wy - 4], 16), { w: 2.6, color: o.color ?? PAL.water, dry: false });
    }
    if (o.inside) o.inside(ctx);
    // derece çizgileri
    const step = o.step ?? 10;
    for (let v = step; v <= max; v += step) {
      const yy = yFor(v), big = v % (o.labelEvery ?? 20) === 0;
      line(ctx, [x1 - 4, yy], [x1 - (big ? 34 : 20), yy], { w: 1.8, dry: false, seed: 3520 + v });
      if (big) F.txt(ctx, String(v), x1 + 12, yy + 10, { size: o.labelSize ?? 28, weight: 400, alpha: 0.85 });
    }
    // cam
    stroke(ctx, [[x0 - 8, y0 - 36], [x0, y0 - 28], [x0, by], [x1, by], [x1, y0 - 28], [x1 + 8, y0 - 36]], { w: 3.2, seed: 3530, taper: 0.03 });
    line(ctx, [x0 + 10, y0 + 10], [x0 + 10, y0 + Math.min(h * 0.4, 140)], { w: 3, color: PAL.white, dry: false, alpha: 0.9 });
    if (o.unit !== false) F.txt(ctx, 'cm³', x1 + 10, y0 - 14, { size: 26, weight: 400, alpha: 0.75 });
    return yFor;
  };

  // ---- beher / bardak. (x0,y0) sol üst, w,h. fill: su yüksekliği (px). o.layers: [{h, color, alpha}] alttan
  F.beaker = (ctx, x0, y0, w, h, o = {}) => {
    const by = y0 + h;
    P.fillPts(ctx, [[x0, y0], [x0 + 2, by], [x0 + w - 2, by], [x0 + w, y0]], PAL.white, 0.5);
    let yb = by - 2;
    (o.layers ?? []).forEach((L, i) => {
      if (L.h <= 0) return; const yt = yb - L.h;
      const p = [[x0 + 4, yt], [x0 + w - 4, yt], [x0 + w - 4, yb], [x0 + 4, yb], [x0 + 4, yt]];
      wash(ctx, p, L.color, L.alpha ?? 0.45, 3600 + i * 7 + (o.seed ?? 0), { bleed: 1, blooms: 1 });
      line(ctx, [x0 + 5, yt], [x0 + w - 5, yt], { w: 2.4, color: L.edge ?? L.color, dry: false });
      yb = yt;
    });
    if (o.inside) o.inside(ctx);
    stroke(ctx, [[x0, y0], [x0 + 2, by], [x0 + w - 2, by + 1], [x0 + w, y0 - 1]], { w: 3.2, seed: 3620 + (o.seed ?? 0), taper: 0.03 });
    line(ctx, [x0 - 8, y0 - 2], [x0 + 4, y0 + 2], { w: 3, dry: false }); line(ctx, [x0 + w + 8, y0 - 2], [x0 + w - 4, y0 + 2], { w: 3, dry: false });
    line(ctx, [x0 + 12, y0 + 16], [x0 + 12, y0 + Math.min(h - 16, 80)], { w: 3, color: PAL.white, dry: false, alpha: 0.9 });
    if (o.marks) o.marks.forEach(([yy, lab]) => { line(ctx, [x0 + w - 4, yy], [x0 + w - 26, yy], { w: 1.8, dry: false }); if (lab) F.txt(ctx, lab, x0 + w + 10, yy + 9, { size: 26, weight: 400, alpha: 0.8 }); });
  };

  // ---- taşırma kabı (x0, y0 sol üst). spout sağda
  F.overflow = (ctx, x0, y0, w, h, fillTop, o = {}) => {
    const by = y0 + h;
    P.fillPts(ctx, F.rect(x0, y0, x0 + w, by), PAL.white, 0.5);
    const p = [[x0 + 4, fillTop], [x0 + w - 4, fillTop], [x0 + w - 4, by - 2], [x0 + 4, by - 2], [x0 + 4, fillTop]];
    wash(ctx, p, PAL.water, 0.42, 3701, { bleed: 1, blooms: 1 }); line(ctx, [x0 + 5, fillTop], [x0 + w - 5, fillTop], { w: 2.4, color: PAL.water, dry: false });
    if (o.inside) o.inside(ctx);
    stroke(ctx, [[x0, y0 - 10], [x0, by], [x0 + w, by], [x0 + w, y0 + 40]], { w: 3.2, seed: 3702, taper: 0.02 });
    // oluk
    stroke(ctx, [[x0 + w, y0 + 40], [x0 + w + 70, y0 + 64]], { w: 3.2, seed: 3703, dry: false });
    stroke(ctx, [[x0 + w, y0 + 58], [x0 + w + 66, y0 + 80]], { w: 3.2, seed: 3704, dry: false });
  };

  // ---- sıvı yağ şişesi (x,y alt orta)
  F.oilBottle = (ctx, x, y, s = 1) => {
    const b = [[x - 34 * s, y], [x - 34 * s, y - 90 * s], [x - 14 * s, y - 120 * s], [x - 12 * s, y - 150 * s], [x + 12 * s, y - 150 * s], [x + 14 * s, y - 120 * s], [x + 34 * s, y - 90 * s], [x + 34 * s, y], [x - 34 * s, y]];
    P.fillPts(ctx, b, PAL.white, 0.6);
    const lq = [[x - 31 * s, y - 3 * s], [x - 31 * s, y - 88 * s], [x + 31 * s, y - 88 * s], [x + 31 * s, y - 3 * s]];
    wash(ctx, lq, OIL, 0.6, 91, { bleed: 1, blooms: 1 });
    stroke(ctx, b, { w: 3, closed: true, seed: 92 });
    P.fillPts(ctx, [[x - 14 * s, y - 150 * s], [x + 14 * s, y - 150 * s], [x + 14 * s, y - 166 * s], [x - 14 * s, y - 166 * s]], PAL.ink, 0.85);
  };

  // ---- cetvelli tablo: cols=[w...], rows=[[...]] (ilk satır başlık). kFn(i) → 0..1
  F.table = (ctx, x, y, cols, rows, rowH, kFn, o = {}) => {
    const W = cols.reduce((a, b) => a + b, 0);
    rows.forEach((r, i) => {
      const k = kFn(i); if (k <= 0) return; const yy = y + i * rowH;
      if (i === 0) P.fillPts(ctx, F.rect(x, yy, x + W, yy + rowH), PAL.light, 0.25 * Math.min(1, k * 2));
      line(ctx, [x, yy + rowH], [x + W * Math.min(1, k * 1.5), yy + rowH], { w: i === 0 ? 3 : 1.8, dry: false, seed: 970 + i });
      let cx = x; r.forEach((c, j) => { P.write(ctx, c, cx + 18, yy + rowH * 0.7, E.clamp(k * (1 + 0.3 * cols.length) - j * 0.3), { size: o.size ?? 38, weight: i === 0 ? 700 : 400, color: (o.colColor && i > 0 && o.colColor[j]) || PAL.ink }); cx += cols[j]; });
    });
    if (kFn(0) > 0) { let cx = x; const n = rows.filter((r, i) => kFn(i) > 0).length; for (let j = 1; j < cols.length; j++) { cx += cols[j - 1]; line(ctx, [cx, y], [cx, y + rowH * n], { w: 1.8, dry: false, seed: 990 + j }); } }
  };

  // ---- başlık kartı (6. sınıf)
  F.title = (ctx, t, n, name, unit) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, n + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  // ---- bitiş kartı (6. sınıf)
  F.endCard = (ctx, t, name, code) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.9; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      G.INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      G.INK.label(c, name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      G.INK.label(c, 'Fen Bilimleri · 6. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      G.INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };

  // ---- su tankı (akvaryum). x0,y0 sol üst; w,h; waterY: su yüzeyi
  F.tank = (ctx, x0, y0, w, h, waterY, o = {}) => {
    const by = y0 + h;
    P.fillPts(ctx, F.rect(x0, y0, x0 + w, by), PAL.white, 0.45);
    const wp = [[x0 + 4, waterY], [x0 + w - 4, waterY], [x0 + w - 4, by - 3], [x0 + 4, by - 3], [x0 + 4, waterY]];
    wash(ctx, wp, PAL.water, o.alpha ?? 0.36, o.seed ?? 3801, { bleed: 1.5, blooms: 2 });
    return () => { // ön cam + yüzey çizgisi (cisimlerden sonra çizilir)
      P.fillPts(ctx, F.rect(x0 + 4, waterY, x0 + w - 4, by - 3), PAL.water, 0.1);
      const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([x0 + 5 + u * (w - 10), waterY + Math.sin(u * 18 + (o.t ?? 0) * 2) * 2]); }
      stroke(ctx, pts, { w: 2.6, color: PAL.water, dry: false, taper: 0.02 });
      stroke(ctx, [[x0, y0], [x0, by], [x0 + w, by], [x0 + w, y0]], { w: 3.4, seed: 3802, taper: 0.02 });
      line(ctx, [x0 + 14, y0 + 20], [x0 + 14, y0 + 120], { w: 3, color: PAL.white, dry: false, alpha: 0.9 });
    };
  };

  // ---- basit Damla sarmalayıcı
  F.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'neutral', look: [0.6, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 0.4]] }, o));

  G.F617 = F;
})(window);

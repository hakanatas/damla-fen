// props.js — 8. sınıf Ünite 6 (Filmler 21–23) ortak çizim yardımcıları → window.W6
// Aynı dosya 21-enerji-donusumu, 22-santraller ve 23-elektrik-tasarrufu klasörlerinde birebir kopyadır.
// Kaynaklar: films-8/15-tepkimeler-yasam/props.js (U5: kart, başlık, bitiş, görev, defter, güvenlik kartı)
//            films-6/14-gunes-enerjisi/props.js (F614: parıltı, ampul, güneş paneli, termometre, ev)
// Renk kodu: elektrik #34506B · ısı #B5553F · ışık kehribar · ses #6B5B8C · hareket #3F7A7A · kırmızı yalnızca güvenlik/YANLIŞ.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble, arrowHead, hatch } = G.INK;
  const HEAT = '#B5553F', RED = '#A23A2A', AMBER = '#8A4A10', SUB = '#C07F1E', SOUND = '#6B5B8C', MOVE = '#3F7A7A', ELEC = '#34506B', METAL = '#9A968C';
  const W = { HEAT, RED, AMBER, SUB, SOUND, MOVE, ELEC, METAL };
  W.EN = {
    elektrik: { c: ELEC, n: 'Elektrik' }, isi: { c: HEAT, n: 'Isı' }, isik: { c: SUB, n: 'Işık' },
    ses: { c: SOUND, n: 'Ses' }, hareket: { c: MOVE, n: 'Hareket' }
  };

  // ---------- temel ----------
  W.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  W.rr = (x, y, w, h, r, n = 5) => { const p = []; const c = [[x + w - r, y + r, -Math.PI / 2], [x + w - r, y + h - r, 0], [x + r, y + h - r, Math.PI / 2], [x + r, y + r, Math.PI]];
    c.forEach(([cx, cy, a0]) => { for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } }); p.push(p[0]); return p; };
  W.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); ctx.fillText(s, 0, 0); } else ctx.fillText(s, x, y); ctx.restore(); };
  W.fit = (ctx, s, maxW, size, weight = 700) => { ctx.save(); ctx.font = `${weight} ${size}px Kalam`; const w = ctx.measureText(s).width; ctx.restore(); return w > maxW ? Math.floor(size * maxW / w) : size; };
  W.shape = (ctx, pts, col, a = 0.6, seed = 1, o = {}) => { P.fillPts(ctx, pts, o.fill ?? PAL.white, 1); if (col) wash(ctx, pts, col, a, seed, { bleed: o.bleed ?? 1, blooms: 0 }); stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, seed: seed + 1, dry: false, color: o.line }); };
  W.glow = (ctx, x, y, r, a = 1, col = '240,180,80') => {
    if (a <= 0) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(${col},${0.55 * a})`); g.addColorStop(0.35, `rgba(${col},${0.22 * a})`); g.addColorStop(1, `rgba(${col},0)`);
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
  };
  W.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, o.seed ?? 2100, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 2100 });
    return c;
  };
  W.flow = (ctx, a, b, k = 1, o = {}) => { if (k <= 0) return; P.arrow(ctx, a, b, k, { w: o.w ?? 5, color: o.color ?? PAL.ink, bend: o.bend ?? 0, head: o.head ?? 20, c: o.c }); };
  W.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'neutral', look: [0.6, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.4]] }, o));

  // ---------- enerji sembolleri ----------
  W.sym = (ctx, type, x, y, s = 1, t = 0) => {
    const c = W.EN[type].c;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (type === 'isi') for (let i = -1; i <= 1; i++) { const p = []; for (let j = 0; j <= 16; j++) { const u = j / 16; p.push([i * 16 + Math.sin(u * 9 + t * 5 + i) * 5, 22 - u * 44]); } stroke(ctx, p, { w: 4, color: c, dry: false, seed: 3100 + i }); }
    if (type === 'isik') { P.fillPts(ctx, circlePts(0, 0, 10, 10, 16), c, 0.95); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; line(ctx, [Math.cos(a) * 16, Math.sin(a) * 16], [Math.cos(a) * 26, Math.sin(a) * 26], { w: 3.4, color: c, dry: false, seed: 3110 + i }); } }
    if (type === 'ses') { P.fillPts(ctx, [[-22, -8], [-12, -8], [0, -18], [0, 18], [-12, 8], [-22, 8]], c, 0.9); [12, 22].forEach((r, i) => stroke(ctx, P.arc(0, 0, r, -0.8, 0.8, 12), { w: 3.4, color: c, dry: false, seed: 3120 + i })); }
    if (type === 'hareket') { const p = P.arc(0, 0, 20, -2.6 + t * 2, 1.4 + t * 2, 24); stroke(ctx, p, { w: 4, color: c, dry: false, seed: 3130 }); arrowHead(ctx, p[p.length - 3], p[p.length - 1], 11, { w: 3.4, color: c }); }
    if (type === 'elektrik') { const b = [[4, -26], [-12, 4], [0, 4], [-6, 26], [14, -6], [2, -6], [8, -26]]; P.fillPts(ctx, b, '#E8C35A', 1); stroke(ctx, b.concat([b[0]]), { w: 2.6, closed: true, color: c, dry: false, seed: 3140 }); }
    ctx.restore();
  };
  // etiket kapsülü: sembol + ad
  W.badge = (ctx, type, x, y, k = 1, o = {}) => {
    if (k <= 0) return; const e = W.EN[type], size = o.size ?? 40, name = o.name ?? e.n;
    ctx.save(); ctx.font = `700 ${size}px Kalam`; const tw = ctx.measureText(name).width; ctx.restore();
    const w = tw + size * 1.9, h = size * 1.45, x0 = x - w / 2, y0 = y - h / 2;
    ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -y);
    const pill = W.rr(x0, y0, w, h, h / 2, 6);
    P.fillPts(ctx, pill, '#FBF8F1'); wash(ctx, pill, e.c, 0.28, 3200 + name.length, { bleed: 1, blooms: 0 }); stroke(ctx, pill, { w: 2.6, closed: true, color: e.c, dry: false, seed: 3201 });
    W.sym(ctx, type, x0 + h * 0.52, y, size / 60, o.t ?? 0);
    W.txt(ctx, name, x0 + h * 0.95, y + size * 0.34, { size, color: e.c === SUB ? AMBER : e.c });
    ctx.restore();
    return w;
  };

  // ---------- devre parçaları ----------
  W.bulb = (ctx, x, y, s = 1, on = 1) => {
    if (on > 0) W.glow(ctx, x, y, 150 * s, on);
    const g = circlePts(x, y, 26 * s, 26 * s, 36);
    P.fillPts(ctx, g, on > 0.5 ? '#FFF3CF' : PAL.white, 0.95);
    if (on > 0) { ctx.save(); ctx.globalAlpha *= on; wash(ctx, g, PAL.light, 0.55, 51, { bleed: 1, blooms: 0 }); ctx.restore(); }
    const fp = []; for (let i = 0; i <= 8; i++) fp.push([x - 9 * s + i * 2.25 * s, y + (i % 2 ? -4 : 4) * s]);
    stroke(ctx, fp, { w: 1.6 * s, color: on > 0.5 ? '#8A4A10' : PAL.ink, dry: false, taper: 0 });
    stroke(ctx, g, { w: 2.6 * s, closed: true, seed: 52 });
    const b0 = y + 24 * s, b1 = y + 46 * s, base = [[x - 13 * s, b0], [x + 13 * s, b0], [x + 11 * s, b1], [x - 11 * s, b1], [x - 13 * s, b0]];
    P.fillPts(ctx, base, '#B9B2A2'); stroke(ctx, base, { w: 2.2 * s, closed: true, seed: 53, dry: false });
  };
  // yan görünüş pil: merkez (x,y), + ucu sağda
  W.cell = (ctx, x, y, s = 1) => {
    const b = W.rect(x - 70 * s, y - 30 * s, x + 60 * s, y + 30 * s);
    P.fillPts(ctx, b, '#3E4A57'); P.fillPts(ctx, W.rect(x + 10 * s, y - 30 * s, x + 60 * s, y + 30 * s), '#C9A35A');
    stroke(ctx, b, { w: 2.6, closed: true, seed: 3300 });
    P.fillPts(ctx, W.rect(x + 60 * s, y - 10 * s, x + 72 * s, y + 10 * s), METAL); stroke(ctx, W.rect(x + 60 * s, y - 10 * s, x + 72 * s, y + 10 * s), { w: 2, closed: true, dry: false });
    W.txt(ctx, '+', x + 36 * s, y + 12 * s, { size: 34 * s, align: 'center' }); W.txt(ctx, '−', x - 30 * s, y + 12 * s, { size: 34 * s, align: 'center', color: '#FBF8F1' });
  };
  W.wire = (ctx, pts, k = 1, o = {}) => P.drawOn(ctx, pts, k, { w: o.w ?? 4, color: o.color ?? '#3A3530', dry: false });
  // akım taneleri (yalnızca "akım geçiyor" göstergesi; yön soyut)
  W.dots = (ctx, pts, t, a = 1, n = 10, col = '#E8C35A') => {
    if (a <= 0) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    for (let j = 0; j < n; j++) { let u = ((t * 0.25 + j / n) % 1) * L; let i = 0; while (i < seg.length - 1 && u > seg[i]) { u -= seg[i]; i++; } const f = u / seg[i]; const p = [E.lerp(pts[i][0], pts[i + 1][0], f), E.lerp(pts[i][1], pts[i + 1][1], f)];
      ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(p[0], p[1], 6, 0, 7); ctx.fill(); ctx.strokeStyle = AMBER; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
  };
  W.thermo = (ctx, x, y, h, lv, s = 1) => {
    const tw = 9 * s, top = y - h;
    const tube = [[x - tw, top], [x + tw, top], [x + tw, y - 14 * s], [x - tw, y - 14 * s], [x - tw, top]];
    P.fillPts(ctx, tube, '#FBF8F1'); stroke(ctx, tube, { w: 2.4, closed: true, seed: 721, dry: false });
    const b = circlePts(x, y, 17 * s, 17 * s, 24); P.fillPts(ctx, b, HEAT, 0.9); stroke(ctx, b, { w: 2.4, closed: true, seed: 722, dry: false });
    const ly = E.lerp(y - 14 * s, top + 8 * s, E.clamp(lv));
    P.fillPts(ctx, [[x - 4 * s, ly], [x + 4 * s, ly], [x + 4 * s, y - 8 * s], [x - 4 * s, y - 8 * s]], HEAT, 0.9);
    for (let i = 1; i < 6; i++) line(ctx, [x + tw, y - 14 * s - i * (h - 22 * s) / 6], [x + tw + 8 * s, y - 14 * s - i * (h - 22 * s) / 6], { w: 1.4, dry: false });
  };
  W.squiggle = (ctx, x, y, t, i, a = 1, h = 60, col = HEAT) => {
    if (a <= 0) return; const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([x + Math.sin(u * 9 + t * 5 + i) * 6, y - u * h]); }
    ctx.save(); ctx.globalAlpha *= a; stroke(ctx, pts, { w: 3, color: col, seed: 60 + i }); ctx.restore();
  };
  W.waves = (ctx, x, y, t, a = 1, col = SOUND, n = 3, r0 = 20, dir = 0) => { // ses dalgası yayları
    if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    for (let i = 0; i < n; i++) { const u = ((t * 0.8 + i / n) % 1); const r = r0 + u * 60; ctx.globalAlpha = a * (1 - u); stroke(ctx, P.arc(x, y, r, dir - 0.7, dir + 0.7, 14), { w: 3, color: col, dry: false, seed: 3400 + i }); }
    ctx.restore();
  };
  // priz (ön görünüş)
  W.socket = (ctx, x, y, s = 1) => {
    const b = W.rr(x - 60 * s, y - 60 * s, 120 * s, 120 * s, 18 * s); W.shape(ctx, b, null, 0, 3500);
    const c = circlePts(x, y, 38 * s, 38 * s, 30); P.fillPts(ctx, c, '#E6DFD0'); stroke(ctx, c, { w: 2.2, closed: true, dry: false });
    [-14, 14].forEach(dx => P.fillPts(ctx, circlePts(x + dx * s, y, 6 * s, 6 * s, 12), PAL.ink));
  };
  // çoklu priz: sol uç (x,y), n yuva
  W.strip = (ctx, x, y, n = 4, s = 1, plugs = 0) => {
    const w = (40 + n * 70) * s, b = W.rr(x, y - 34 * s, w, 68 * s, 14 * s); W.shape(ctx, b, null, 0, 3510);
    for (let i = 0; i < n; i++) { const cx = x + (40 + i * 70) * s; P.fillPts(ctx, circlePts(cx, y, 24 * s, 24 * s, 20), '#E6DFD0'); [-8, 8].forEach(dx => P.fillPts(ctx, circlePts(cx + dx * s, y, 4 * s, 4 * s, 10), PAL.ink));
      if (i < plugs) { const pl = W.rr(cx - 22 * s, y - 26 * s, 44 * s, 52 * s, 8 * s); W.shape(ctx, pl, '#3A3530', 0.5, 3520 + i); line(ctx, [cx, y - 26 * s], [cx + (i - n / 2) * 20 * s, y - 110 * s], { w: 4, color: '#3A3530', bend: 0.2, dry: false, seed: 3530 + i }); } }
    line(ctx, [x, y], [x - 80 * s, y + 30 * s], { w: 5, color: '#3A3530', bend: 0.25, dry: false });
    return w;
  };
  // doğru akım motoru + pervane (yan görünüş), merkez (x,y)
  W.motor = (ctx, x, y, s, t, spin = 0) => {
    const b = W.rr(x - 50 * s, y - 40 * s, 100 * s, 80 * s, 16 * s); W.shape(ctx, b, METAL, 0.5, 3600);
    line(ctx, [x - 30 * s, y - 40 * s], [x - 30 * s, y + 40 * s], { w: 1.6, dry: false, alpha: 0.6 });
    line(ctx, [x + 50 * s, y], [x + 90 * s, y], { w: 5 * s, color: '#5A564E', dry: false });
    // pervane: dönme = yatay sıkışma
    const a = t * 14 * spin;
    for (let i = 0; i < 2; i++) { const ph = a + i * Math.PI; const h = Math.cos(ph) * 110 * s; const bl = [[x + 90 * s, y], [x + 104 * s, y + h * 0.5], [x + 92 * s, y + h], [x + 84 * s, y + h * 0.5], [x + 90 * s, y]];
      P.fillPts(ctx, bl, '#D9C7A4', 0.95); stroke(ctx, bl, { w: 2.2, closed: true, dry: false, seed: 3610 + i }); }
    if (spin > 0.3) for (let i = 0; i < 2; i++) stroke(ctx, P.arc(x + 92 * s, y, 125 * s, (i ? 0.6 : -1.4), (i ? 1.4 : -0.6), 12, 125 * s), { w: 2, alpha: 0.35 * spin, dry: false, seed: 3620 + i });
    inkDot(ctx, x + 90 * s, y, 5 * s);
  };

  // ---------- ev aletleri (merkez x,y; s=1 → ~160 px) ----------
  const A = {};
  A.iron = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, 40], [70, 40], [66, 10], [30, -20], [-70, -20], [-80, 40]]; W.shape(ctx, b, '#8FB0C4', 0.5, 3700);
    const h = [[-50, -20], [-40, -60], [30, -60], [40, -20]]; stroke(ctx, h, { w: 5, seed: 3701 });
    P.fillPts(ctx, W.rect(-82, 40, 72, 50), METAL); stroke(ctx, W.rect(-82, 40, 72, 50), { w: 2, closed: true, dry: false });
    line(ctx, [-50, -40], [-100, -60], { w: 3, color: '#3A3530', dry: false, bend: -0.2 });
    ctx.restore(); if (on > 0) for (let i = 0; i < 3; i++) W.squiggle(ctx, x - 40 * s + i * 40 * s, y + 20 * s - 60 * s, t, i, on, 50 * s); };
  A.kettle = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-50, 60], [50, 60], [44, -40], [-44, -40], [-50, 60]]; W.shape(ctx, b, '#C9D6E0', 0.6, 3710);
    P.fillPts(ctx, W.rect(-58, 60, 58, 74), '#3A3530'); stroke(ctx, P.arc(50, 10, 34, -1.4, 1.4, 16), { w: 6, seed: 3711 });
    stroke(ctx, [[-44, -30], [-78, -52]], { w: 7, seed: 3712 }); stroke(ctx, [[-30, -40], [-20, -52], [20, -52], [30, -40]], { w: 3, dry: false });
    ctx.restore(); if (on > 0) for (let i = 0; i < 3; i++) W.squiggle(ctx, x - 90 * s + i * 12 * s, y - 60 * s, t, i + 3, on, 50 * s, '#8FA9B8'); };
  A.toaster = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = W.rr(-70, -40, 140, 90, 22); W.shape(ctx, b, '#C9C2B2', 0.6, 3720);
    [-28, 12].forEach((dx, i) => { P.fillPts(ctx, W.rect(dx, -46, dx + 18, -38), PAL.ink); P.fillPts(ctx, W.rect(dx - 2, -70, dx + 20, -44), '#D9B07A'); stroke(ctx, W.rect(dx - 2, -70, dx + 20, -44), { w: 1.8, closed: true, dry: false }); });
    line(ctx, [70, 0], [84, 0], { w: 4, dry: false }); ctx.restore(); if (on > 0) for (let i = 0; i < 2; i++) W.squiggle(ctx, x - 20 * s + i * 40 * s, y - 80 * s, t, i + 6, on, 40 * s); };
  A.heater = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = W.rr(-80, -60, 160, 110, 12); W.shape(ctx, b, '#C9C2B2', 0.5, 3730);
    for (let i = 0; i < 3; i++) { const yy = -36 + i * 28; const p = []; for (let j = 0; j <= 30; j++) p.push([-60 + j * 4, yy + Math.sin(j * 1.6) * 5]); stroke(ctx, p, { w: 4, color: on > 0.3 ? '#D9582F' : '#6B6460', dry: false, seed: 3731 + i }); }
    line(ctx, [-60, 50], [-60, 70], { w: 5, dry: false }); line(ctx, [60, 50], [60, 70], { w: 5, dry: false });
    ctx.restore(); if (on > 0) W.glow(ctx, x, y - 10 * s, 110 * s, on * 0.8, '217,88,47'); };
  A.lamp = (ctx, x, y, s, t = 0, on = 1) => { // masa lambası
    if (on > 0) W.glow(ctx, x + 10 * s, y + 10 * s, 140 * s, on);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sh = [[-50, -10], [50, -10], [30, -70], [-30, -70], [-50, -10]]; W.shape(ctx, sh, PAL.light, 0.55, 3740);
    line(ctx, [0, -10], [0, 60], { w: 6, dry: false }); P.fillPts(ctx, circlePts(0, 66, 44, 10, 20), '#8A6A45'); stroke(ctx, circlePts(0, 66, 44, 10, 20), { w: 2.2, closed: true, dry: false });
    ctx.restore(); };
  A.flashlight = (ctx, x, y, s, t = 0, on = 1) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (on > 0) { ctx.save(); ctx.globalAlpha *= 0.45 * on; P.fillPts(ctx, [[60, -26], [150, -70], [150, 70], [60, 26]], '#F6D9A0'); ctx.restore(); }
    const b = W.rect(-80, -18, 30, 18); W.shape(ctx, b, '#5E7F9A', 0.6, 3750);
    const h = [[30, -18], [60, -30], [60, 30], [30, 18], [30, -18]]; W.shape(ctx, h, '#5E7F9A', 0.6, 3751);
    P.fillPts(ctx, W.rect(-30, -26, -12, -18), PAL.ink); ctx.restore(); };
  A.speaker = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = W.rr(-50, -70, 100, 140, 10); W.shape(ctx, b, '#6B6460', 0.5, 3760);
    const sp = circlePts(0, 18, 34 + (on > 0 ? Math.sin(t * 30) * 2 : 0), 34, 30); P.fillPts(ctx, sp, '#3A3530'); stroke(ctx, sp, { w: 2.4, closed: true, dry: false });
    P.fillPts(ctx, circlePts(0, 18, 10, 10, 12), '#8C8578'); P.fillPts(ctx, circlePts(0, -42, 14, 14, 14), '#3A3530');
    ctx.restore(); if (on > 0) W.waves(ctx, x + 60 * s, y, t, on, SOUND, 3, 20 * s); };
  A.bell = (ctx, x, y, s, t = 0, on = 0) => { const sw = on > 0 ? Math.sin(t * 28) * 0.12 * on : 0; ctx.save(); ctx.translate(x, y - 40 * s); ctx.rotate(sw); ctx.scale(s, s);
    const b = [[-54, 70], [54, 70], [40, 30], [34, -20], [0, -40], [-34, -20], [-40, 30], [-54, 70]]; W.shape(ctx, b, '#D9B45A', 0.7, 3770);
    P.fillPts(ctx, circlePts(0, 80, 12, 12, 14), '#8A6A45'); line(ctx, [0, -40], [0, -56], { w: 4, dry: false });
    ctx.restore(); if (on > 0) { W.waves(ctx, x + 70 * s, y, t, on, SOUND, 3, 18 * s); W.waves(ctx, x - 70 * s, y, t, on, SOUND, 3, 18 * s, Math.PI); } };
  A.fan = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [0, 10], [0, 80], { w: 7, dry: false }); P.fillPts(ctx, circlePts(0, 84, 50, 12, 20), '#6B6460'); stroke(ctx, circlePts(0, 84, 50, 12, 20), { w: 2.2, closed: true, dry: false });
    const cg = circlePts(0, -30, 66, 66, 48); P.fillPts(ctx, cg, '#FBF8F1', 0.8);
    const a0 = t * 9 * on; for (let i = 0; i < 3; i++) { const a = a0 + i * 2.094; const bl = [[0, -30], [Math.cos(a - 0.35) * 56, -30 + Math.sin(a - 0.35) * 56], [Math.cos(a + 0.25) * 60, -30 + Math.sin(a + 0.25) * 60], [0, -30]]; P.fillPts(ctx, bl, '#8FB0C4', 0.9); stroke(ctx, bl, { w: 2, closed: true, dry: false, seed: 3780 + i }); }
    stroke(ctx, cg, { w: 2.6, closed: true, seed: 3783 }); for (let i = 0; i < 6; i++) { const a = i / 6 * 3.1416; line(ctx, [Math.cos(a) * 66, -30 + Math.sin(a) * 66], [-Math.cos(a) * 66, -30 - Math.sin(a) * 66], { w: 1, alpha: 0.35, dry: false }); }
    inkDot(ctx, 0, -30, 7); ctx.restore(); };
  A.mixer = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const j = [[-40, -70], [40, -70], [30, 30], [-30, 30], [-40, -70]]; W.shape(ctx, j, '#BFD4DF', 0.4, 3790);
    const base = W.rr(-50, 30, 100, 50, 10); W.shape(ctx, base, '#6B6460', 0.5, 3791);
    const a = t * 20 * on; line(ctx, [0, 30], [0, 0], { w: 3, dry: false }); line(ctx, [-Math.cos(a) * 22, 0], [Math.cos(a) * 22, 0], { w: 5, dry: false });
    if (on > 0) stroke(ctx, P.arc(0, -10, 26, 0, 5, 20, 8), { w: 2, alpha: 0.5 * on, dry: false });
    P.fillPts(ctx, circlePts(0, 56, 8, 8, 10), '#E3A03A'); ctx.restore(); };
  A.dryer = (ctx, x, y, s, t = 0, on = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, -50], [30, -50], [60, -34], [60, 10], [30, 26], [-80, 26], [-80, -50]]; W.shape(ctx, b, '#D98FA0', 0.5, 3800);
    const h = [[-40, 26], [-10, 26], [-20, 100], [-46, 100], [-40, 26]]; W.shape(ctx, h, '#D98FA0', 0.5, 3801);
    P.fillPts(ctx, circlePts(-80, -12, 12, 34, 16), '#6B6460'); const a = t * 12 * on; for (let i = 0; i < 3; i++) line(ctx, [-80, -12], [-80 + Math.cos(a + i * 2.1) * 4, -12 + Math.sin(a + i * 2.1) * 26], { w: 2, dry: false, color: '#FBF8F1' });
    ctx.restore(); if (on > 0) for (let i = 0; i < 3; i++) { const u = ((t * 1.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha *= on * (1 - u); line(ctx, [x + 70 * s + u * 60 * s, y - 34 * s + i * 20 * s], [x + 110 * s + u * 60 * s, y - 34 * s + i * 20 * s], { w: 3, color: HEAT, dry: false, seed: 3810 + i }); ctx.restore(); } };
  A.tv = (ctx, x, y, s, t = 0, on = 0, standby = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const f = W.rr(-90, -66, 180, 116, 8); W.shape(ctx, f, '#3A3530', 0.6, 3820);
    const sc = W.rect(-78, -56, 78, 38); P.fillPts(ctx, sc, on > 0 ? '#9FC0D6' : '#26252C');
    if (on > 0) { ctx.save(); ctx.globalAlpha *= on; P.fillPts(ctx, circlePts(-30, -20, 18, 18, 16), PAL.light, 0.9); P.fillPts(ctx, [[-78, 38], [-20, -6], [30, 20], [78, -10], [78, 38]], PAL.life, 0.7); ctx.restore(); }
    line(ctx, [-30, 50], [-44, 74], { w: 4, dry: false }); line(ctx, [30, 50], [44, 74], { w: 4, dry: false });
    if (standby > 0) { ctx.save(); ctx.globalAlpha *= standby; P.fillPts(ctx, circlePts(70, 45, 5, 5, 10), '#E0402A'); W.glow(ctx, 70, 45, 22, 1, '224,64,42'); ctx.restore(); }
    ctx.restore(); };
  W.A = A;
  W.APP = { // ad, çizim, birincil dönüşüm(ler)
    utu: { n: 'ütü', f: A.iron, e: ['isi'] }, isitici: { n: 'su ısıtıcısı', f: A.kettle, e: ['isi'] },
    ampul: { n: 'ampul', f: (c, x, y, s, t, on) => W.bulb(c, x, y - 10 * s, s * 1.5, on ? 0.9 : 0), e: ['isik'] }, fener: { n: 'el feneri', f: A.flashlight, e: ['isik'] },
    hoparlor: { n: 'hoparlör', f: A.speaker, e: ['ses'] }, zil: { n: 'kapı zili', f: A.bell, e: ['ses'] },
    vantilator: { n: 'vantilatör', f: A.fan, e: ['hareket'] }, mikser: { n: 'mikser', f: A.mixer, e: ['hareket'] },
    kurutma: { n: 'saç kurutma m.', f: A.dryer, e: ['isi', 'hareket'] }, tv: { n: 'televizyon', f: A.tv, e: ['isik', 'ses'] }
  };

  // ---------- ev kesiti (oda odası ışıklar) ----------
  W.house = (ctx, x, y, w, h, o = {}) => { // sol-alt (x,y)
    const wall = W.rect(x, y - h, x + w, y); P.fillPts(ctx, wall, o.wall ?? '#E8DCC4'); stroke(ctx, wall, { w: 3, closed: true, seed: 3900 + (o.seed ?? 0) });
    const roof = [[x - 40, y - h], [x + w / 2, y - h - h * 0.45], [x + w + 40, y - h], [x - 40, y - h]]; P.fillPts(ctx, roof, o.roof ?? HEAT, 0.75); stroke(ctx, roof, { w: 3, closed: true, seed: 3901 + (o.seed ?? 0) });
    const lights = o.lights ?? []; const cols = o.cols ?? 2, rows = o.rows ?? 2;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c; const cw = w / cols, ch = h / rows; const wx = x + c * cw + cw * 0.22, wy = y - h + r * ch + ch * 0.2; const ww = cw * 0.56, wh = ch * 0.5;
      const on = lights[i] ?? 0; const win = W.rect(wx, wy, wx + ww, wy + wh); P.fillPts(ctx, win, '#2E3A48', 0.85);
      if (on > 0) { ctx.save(); ctx.globalAlpha *= on; P.fillPts(ctx, win, '#FFE7A8'); ctx.restore(); W.glow(ctx, wx + ww / 2, wy + wh / 2, ww * 0.9, on * 0.6); }
      stroke(ctx, win, { w: 2.2, closed: true, dry: false, seed: 3910 + i }); line(ctx, [wx + ww / 2, wy], [wx + ww / 2, wy + wh], { w: 1.6, dry: false }); }
    return roof;
  };

  // ---------- santral parçaları ----------
  // türbin çarkı (ön görünüş) merkez, yarıçap r, açı a
  W.turbine = (ctx, x, y, r, a, o = {}) => {
    const n = o.n ?? 8; const c = circlePts(x, y, r, r, 40); P.fillPts(ctx, c, '#FBF8F1', 0.7);
    for (let i = 0; i < n; i++) { const b = a + i / n * 6.283; const p = [[x + Math.cos(b) * r * 0.2, y + Math.sin(b) * r * 0.2], [x + Math.cos(b + 0.25) * r * 0.95, y + Math.sin(b + 0.25) * r * 0.95], [x + Math.cos(b + 0.5) * r * 0.9, y + Math.sin(b + 0.5) * r * 0.9], [x + Math.cos(b + 0.2) * r * 0.2, y + Math.sin(b + 0.2) * r * 0.2]]; P.fillPts(ctx, p, o.col ?? '#7E8FA6', 0.9); stroke(ctx, p, { w: 1.6, closed: true, dry: false, seed: 4000 + i }); }
    stroke(ctx, c, { w: 2.6, closed: true, dry: false, seed: 4010 }); P.fillPts(ctx, circlePts(x, y, r * 0.18, r * 0.18, 16), '#5A564E');
  };
  // jeneratör: kutu içinde mıknatıs (K/G) ve dönen tel sargı; merkez
  W.generator = (ctx, x, y, s, a, lit = 0) => {
    const b = W.rr(x - 90 * s, y - 70 * s, 180 * s, 140 * s, 14 * s); W.shape(ctx, b, METAL, 0.35, 4020);
    P.fillPts(ctx, W.rect(x - 80 * s, y - 50 * s, x - 50 * s, y + 50 * s), '#B5553F', 0.85); P.fillPts(ctx, W.rect(x + 50 * s, y - 50 * s, x + 80 * s, y + 50 * s), '#5E7F9A', 0.85);
    W.txt(ctx, 'N', x - 65 * s, y + 12 * s, { size: 30 * s, align: 'center', color: '#FBF8F1' }); W.txt(ctx, 'S', x + 65 * s, y + 12 * s, { size: 30 * s, align: 'center', color: '#FBF8F1' });
    const cw = Math.abs(Math.cos(a)) * 34 * s + 4; const coil = W.rect(x - cw, y - 40 * s, x + cw, y + 40 * s); stroke(ctx, coil, { w: 3.4, closed: true, color: '#B8732E', dry: false });
    for (let i = 1; i < 4; i++) line(ctx, [x - cw, y - 40 * s + i * 20 * s], [x + cw, y - 40 * s + i * 20 * s], { w: 1.6, color: '#B8732E', dry: false });
    if (lit > 0) W.sym(ctx, 'elektrik', x, y - 100 * s, 1.1 * s * lit);
  };
  W.water = (ctx, pts, a = 0.5, seed = 4030) => { P.fillPts(ctx, pts, '#BFD4DF', 0.9); wash(ctx, pts, PAL.water, a, seed, { bleed: 2, blooms: 1 }); };
  // baraj kesiti: gölet solda, baraj gövdesi, cebri boru, türbin; (x,y) = baraj tabanı merkezi
  W.dam = (ctx, x, y, s, t, flow = 1) => {
    W.water(ctx, [[x - 420 * s, y - 250 * s], [x - 40 * s, y - 250 * s], [x - 40 * s, y], [x - 420 * s, y]], 0.5, 4031);
    for (let i = 0; i < 4; i++) line(ctx, [x - 400 * s + i * 90 * s + Math.sin(t + i) * 8, y - 238 * s], [x - 350 * s + i * 90 * s + Math.sin(t + i) * 8, y - 238 * s], { w: 2, color: '#FBF8F1', dry: false });
    const d = [[x - 50 * s, y - 280 * s], [x + 10 * s, y - 280 * s], [x + 110 * s, y], [x - 50 * s, y], [x - 50 * s, y - 280 * s]]; W.shape(ctx, d, '#B9B2A2', 0.5, 4032);
    const pipe = [[x - 40 * s, y - 150 * s], [x + 40 * s, y - 60 * s], [x + 150 * s, y - 40 * s]]; stroke(ctx, pipe, { w: 22 * s, color: '#5A564E', dry: false }); stroke(ctx, pipe, { w: 14 * s, color: '#8FB9D0', dry: false });
    if (flow > 0) W.dots(ctx, pipe, t * 2, flow, 6, '#FBF8F1');
    W.turbine(ctx, x + 180 * s, y - 40 * s, 40 * s, t * 5 * flow, { n: 6 });
    W.water(ctx, [[x + 110 * s, y - 20 * s], [x + 420 * s, y - 20 * s], [x + 420 * s, y], [x + 110 * s, y]], 0.4, 4033);
  };
  // soğutma kulesi (+ buhar)
  W.tower = (ctx, x, y, s, t, steam = 1) => {
    const tw = [[x - 70 * s, y], [x - 46 * s, y - 120 * s], [x - 52 * s, y - 200 * s], [x + 52 * s, y - 200 * s], [x + 46 * s, y - 120 * s], [x + 70 * s, y], [x - 70 * s, y]]; W.shape(ctx, tw, '#C9C2B2', 0.5, 4040);
    for (let i = 0; i < 5 && steam > 0; i++) { const u = ((t * 0.25 + i / 5) % 1); const r = (30 + u * 50) * s; ctx.save(); ctx.globalAlpha *= steam * (1 - u) * 0.7; P.fillPts(ctx, circlePts(x + u * 40 * s, y - 220 * s - u * 170 * s, r, r * 0.75, 20), '#FBF8F1'); stroke(ctx, circlePts(x + u * 40 * s, y - 220 * s - u * 170 * s, r, r * 0.75, 20), { w: 1.4, closed: true, alpha: 0.4, dry: false }); ctx.restore(); }
  };
  W.stack = (ctx, x, y, s, t, smoke = 1) => { // baca + gri duman
    const c = [[x - 18 * s, y], [x - 12 * s, y - 240 * s], [x + 12 * s, y - 240 * s], [x + 18 * s, y]]; W.shape(ctx, c, '#8C8578', 0.4, 4050);
    for (let i = 0; i < 5 && smoke > 0; i++) { const u = ((t * 0.3 + i / 5) % 1); const r = (16 + u * 44) * s; ctx.save(); ctx.globalAlpha *= smoke * (1 - u) * 0.55; P.fillPts(ctx, circlePts(x + u * 110 * s, y - 260 * s - u * 130 * s, r, r * 0.8, 20), '#5F5A55'); ctx.restore(); }
  };
  W.building = (ctx, x, y, w, h, seed = 4060, col = '#D8D0BE') => { const b = W.rect(x, y - h, x + w, y); W.shape(ctx, b, col, 0.4, seed); for (let i = 0; i < Math.floor(w / 50); i++) P.fillPts(ctx, W.rect(x + 20 + i * 50, y - h + 20, x + 44 + i * 50, y - h + 44), '#6B6460', 0.6); };
  W.wind = (ctx, x, y, h, t, spin = 1) => { // (x,y) taban
    const top = y - h; P.fillPts(ctx, [[x - 8, y], [x - 4, top], [x + 4, top], [x + 8, y]], '#EDEAE3'); stroke(ctx, [[x - 8, y], [x - 4, top], [x + 4, top], [x + 8, y]], { w: 2.2, dry: false });
    const a = t * 2.2 * spin, L = h * 0.5;
    for (let i = 0; i < 3; i++) { const b = a + i * 2.094; const p = [[x, top], [x + Math.cos(b - 0.08) * L * 0.4, top + Math.sin(b - 0.08) * L * 0.4], [x + Math.cos(b) * L, top + Math.sin(b) * L], [x + Math.cos(b + 0.1) * L * 0.4, top + Math.sin(b + 0.1) * L * 0.4], [x, top]]; P.fillPts(ctx, p, '#FBF8F1'); stroke(ctx, p, { w: 2, closed: true, dry: false, seed: 4070 + i }); }
    P.fillPts(ctx, circlePts(x, top, 9, 9, 12), '#8C8578');
  };
  const at = (a, b, f) => [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  W.panel = (ctx, a, b, c, d, n = 3, m = 4, seed = 0) => {
    const q = [a, b, c, d, a]; P.fillPts(ctx, q, '#34506B', 0.92); wash(ctx, q, '#23384D', 0.35, 810 + seed, { bleed: 1, blooms: 0 });
    for (let i = 1; i < n; i++) line(ctx, at(a, d, i / n), at(b, c, i / n), { w: 1.3, color: '#C9D6E0', dry: false, seed: 820 + i });
    for (let j = 1; j < m; j++) line(ctx, at(a, b, j / m), at(d, c, j / m), { w: 1.3, color: '#C9D6E0', dry: false, seed: 830 + j });
    stroke(ctx, q, { w: 2.6, closed: true, seed: 840 + seed });
  };
  W.standPanel = (ctx, x, y, w, seed = 0) => { const h = w * 0.5, top = y - w * 0.7; line(ctx, [x, y], [x, top + h * 0.7], { w: 5, seed: 850 }); W.panel(ctx, [x - w / 2 + w * 0.14, top], [x + w / 2 + w * 0.14, top], [x + w / 2, top + h], [x - w / 2, top + h], 2, 4, seed); };
  W.sea = (ctx, x0, x1, y, t, amp = 14, a = 0.5) => { const p = []; for (let i = 0; i <= 80; i++) { const x = x0 + (x1 - x0) * i / 80; p.push([x, y + Math.sin(x * 0.02 + t * 2) * amp]); } const f = p.concat([[x1, y + 200], [x0, y + 200]]); W.water(ctx, f, a, 4080); stroke(ctx, p, { w: 2.6, color: PAL.water, dry: false, seed: 4081 }); return p; };
  W.buoy = (ctx, x, y, s, t) => { const dy = Math.sin(x * 0.02 + t * 2) * 14; const b = W.rr(x - 40 * s, y + dy - 30 * s, 80 * s, 50 * s, 12 * s); W.shape(ctx, b, '#D9B45A', 0.7, 4090); line(ctx, [x, y + dy + 20 * s], [x, y + 140 * s], { w: 3, dry: false }); };
  W.ground = (ctx, x0, x1, y, h, col = '#8A6A45', seed = 4100) => { const g = [[x0, y], [x1, y], [x1, y + h], [x0, y + h], [x0, y]]; P.fillPts(ctx, g, '#E6DCC6'); wash(ctx, g, col, 0.4, seed, { bleed: 2, blooms: 2 }); stroke(ctx, [[x0, y], [x1, y]], { w: 3, dry: false }); };
  // bisiklet tekerleği + dinamo + far
  W.wheel = (ctx, x, y, r, a) => { stroke(ctx, circlePts(x, y, r, r, 60), { w: 6, closed: true, seed: 4110 }); stroke(ctx, circlePts(x, y, r - 8, r - 8, 60), { w: 1.6, closed: true, dry: false });
    for (let i = 0; i < 12; i++) { const b = a + i / 12 * 6.283; line(ctx, [x, y], [x + Math.cos(b) * (r - 8), y + Math.sin(b) * (r - 8)], { w: 1.2, dry: false, alpha: 0.7, seed: 4111 + i }); } inkDot(ctx, x, y, 7); };

  // ---------- enerji etiketi (A–G) ----------
  W.LBL = [['A', '#2E8B3E'], ['B', '#5BA33B'], ['C', '#A8C43A'], ['D', '#F2D23A'], ['E', '#F0A73A'], ['F', '#E26A2C'], ['G', '#C8352A']];
  W.energyLabel = (ctx, x, y, s, k = 1, hi = -1) => { // sol-üst (x,y)
    const w = 360 * s, h = 440 * s; W.card(ctx, x, y, w, h, { seed: 4120 });
    W.txt(ctx, 'ENERJİ', x + w / 2, y + 52 * s, { size: 40 * s, align: 'center', color: ELEC });
    W.LBL.forEach(([L, c], i) => { const kk = E.clamp(k * 7 - i); if (kk <= 0) return; const yy = y + 80 * s + i * 50 * s, bw = (120 + i * 26) * s * kk;
      const bar = [[x + 24 * s, yy], [x + 24 * s + bw, yy], [x + 24 * s + bw + 20 * s, yy + 20 * s], [x + 24 * s + bw, yy + 40 * s], [x + 24 * s, yy + 40 * s]]; P.fillPts(ctx, bar, c, 0.92);
      W.txt(ctx, L, x + 40 * s, yy + 34 * s, { size: 34 * s, color: '#FBF8F1' });
      if (i === hi) { const ar = [[x + w - 20 * s, yy - 4 * s], [x + w - 90 * s, yy - 4 * s], [x + w - 112 * s, yy + 20 * s], [x + w - 90 * s, yy + 44 * s], [x + w - 20 * s, yy + 44 * s]]; P.fillPts(ctx, ar, PAL.ink); W.txt(ctx, L, x + w - 55 * s, yy + 34 * s, { size: 36 * s, align: 'center', color: '#FBF8F1' }); } });
  };
  // altı şapka
  W.hat = (ctx, x, y, s, col, seed = 4130) => {
    const brim = circlePts(x, y, 70 * s, 16 * s, 30); const crown = [[x - 44 * s, y], [x - 40 * s, y - 70 * s], [x + 40 * s, y - 72 * s], [x + 44 * s, y]];
    P.fillPts(ctx, crown, col, 0.95); P.fillPts(ctx, brim, col, 0.95);
    stroke(ctx, crown, { w: 2.4, dry: false, seed }); stroke(ctx, brim, { w: 2.4, closed: true, dry: false, seed: seed + 1 });
    line(ctx, [x - 42 * s, y - 16 * s], [x + 42 * s, y - 16 * s], { w: 5 * s, color: 'rgba(28,27,34,0.35)', dry: false });
  };
  W.coin = (ctx, x, y, r) => { const c = circlePts(x, y, r, r, 24); P.fillPts(ctx, c, '#E3C170'); stroke(ctx, c, { w: 2.2, closed: true, dry: false }); stroke(ctx, circlePts(x, y, r * 0.7, r * 0.7, 20), { w: 1.2, closed: true, dry: false, alpha: 0.6 }); W.txt(ctx, '₺', x, y + r * 0.35, { size: r, align: 'center', color: AMBER }); };

  // ---------- ortak kartlar ----------
  W.safety = (ctx, x, y, w, items, t, t0, o = {}) => {
    const lh = o.lh ?? 78, h = 110 + items.length * lh;
    const k = Math.min(E.se(t, t0, t0 + 0.6, 'out'), o.t1 ? 1 - E.se(t, o.t1 - 0.4, o.t1) : 1); if (k <= 0) return;
    E.layer(ctx, k, c => {
      const card = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
      c.save(); c.shadowColor = 'rgba(60,20,10,0.25)'; c.shadowBlur = 24; P.fillPts(c, card, '#FBF2EC'); c.restore();
      stroke(c, card, { w: 3.2, closed: true, color: RED, seed: 2520 });
      c.save(); c.font = '700 48px Kalam'; c.fillStyle = RED; c.textAlign = 'center'; c.fillText(o.head ?? '⚠  GÜVENLİK', x + w / 2, y + 64); c.restore();
      line(c, [x + 30, y + 86], [x + w - 30, y + 80], { w: 3, color: RED, dry: false });
      items.forEach((it, i) => {
        const a = (o.ats ? o.ats[i] : t0 + 0.6 + i * (o.step ?? 0.9)); const yy = y + 150 + i * lh;
        if (t > a) { c.save(); c.globalAlpha *= E.se(t, a, a + 0.3); P.fillPts(c, circlePts(x + 46, yy - 14, 13, 13, 18), RED, 0.85); c.restore(); }
        P.write(c, it, x + 76, yy, E.seg(t, a, a + 0.8), { size: o.size ?? 40 });
      });
    });
  };
  W.title = (ctx, t, line2, unit = 6) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, line2, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  W.end = (ctx, t, line2, codes) => {
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
  W.task = (ctx, t, t0, t1, head, lines, o = {}) => {
    const rk = Math.min(E.se(t, t0, t0 + 0.7, 'out'), 1 - E.se(t, t1 - 0.4, t1 + 0.3)); if (rk <= 0) return;
    E.layer(ctx, rk, c => {
      const x = o.x ?? 300, y = o.y ?? 180, w = o.w ?? 1320, h = o.h ?? 560;
      const card = [[x, y + 10], [x + w, y], [x + w + 10, y + h], [x + 10, y + h + 12], [x, y + 10]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true, seed: 2601 });
      P.write(c, head, x + 70, y + 110, E.seg(t, t0 + 0.4, t0 + 1.3), { size: 68, color: AMBER });
      lines.forEach((l, i) => { const a = t0 + 1.2 + i * (o.step ?? 1.0), yy = y + 200 + i * (o.lh ?? 72); P.write(c, l, x + 80, yy, E.seg(t, a, a + 1.0), { size: o.size ?? 44 }); });
      if (o.extra) o.extra(c);
    });
  };
  W.record = (ctx, t, t0, head, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, head, 290, 260, E.seg(t, t0 + 0.3, t0 + 1.5), { size: 62 });
    if (t > t0 + 1.5) P.drawOn(ctx, P.bez([286, 282], [700, 294], [1110, 278], 30), E.se(t, t0 + 1.5, t0 + 2.0), { w: 3, color: PAL.light });
    const st = o.step ?? 1.3;
    items.forEach((txt, i) => {
      const a = t0 + 2.0 + i * st, y = 370 + i * (o.lh ?? 84);
      const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
      if (t > a - 0.3) stroke(ctx, box, { w: 2.2, closed: true, seed: 90 + i });
      P.check(ctx, 322, y - 20, 40, E.se(t, a + 0.9, a + 1.3), { w: 5.5 });
      P.write(ctx, txt, 372, y, E.seg(t, a, a + 1.1), { size: o.size ?? 44, color: o.colors && o.colors[i] ? o.colors[i] : PAL.ink });
    });
  };
  // sıradaki film kartı (Damla + başlık)
  W.next = (ctx, t, t0, t1, head, draw) => {
    const k = Math.min(E.se(t, t0, t0 + 0.7), 1 - E.se(t, t1 - 0.3, t1 + 0.4)); if (k <= 0) return;
    E.layer(ctx, k, c => {
      W.txt(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center', weight: 400 });
      P.write(c, head, 960, 320, E.seg(t, t0 + 0.6, t0 + 1.8), { size: 76, align: 'center' });
      if (draw) draw(c);
    });
  };

  G.W6 = W;
})(window);

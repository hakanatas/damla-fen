// props.js — 8. sınıf Ünite 2 (Yaşamı Kolaylaştıran Kuvvet) filmleri için ortak çizim yardımcıları.
// Aynı dosya 03-basit-makineler ve 04-is-kolayligi-modeli klasörlerinde bulunur (her film kendi kopyasını yükler).
// Bazı parçalar films-7/04-fiziksel-is/props.js ve films/05-kuvvet-olcme/props.js'ten uyarlanmıştır. Global: window.F8M
window.F8M = (function () {
  const { PAL, line, stroke, circlePts, wash, inkDot, wobble, dashed } = INK;
  const F = {};
  F.FORCE = '#8A4A10';     // giriş kuvveti (bizim uyguladığımız) — kahverengi
  F.LOAD = PAL.water;      // yükün ağırlığı / çıkış kuvveti — su mavisi
  F.PATH = '#C07F1E';      // alınan yol — koyu kehribar, kesikli
  F.ROPE = '#5A4632';
  F.WOOD = '#8A6A45';
  F.RED = '#A23A2A';
  F.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  F.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 36}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.012); ctx.fillText(s, 0, 0); ctx.restore(); };
  F.tw = (ctx, s, size = 36, weight = 700) => { ctx.save(); ctx.font = `${weight} ${size}px Kalam`; const w = ctx.measureText(s).width; ctx.restore(); return w; };
  F.rot = (p, c, a) => { const dx = p[0] - c[0], dy = p[1] - c[1], co = Math.cos(a), si = Math.sin(a); return [c[0] + dx * co - dy * si, c[1] + dx * si + dy * co]; };

  // ---------- başlık ve bitiş kartları ----------
  F.title = function (ctx, t, n, name) {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, n + ' · ' + name, 960, 285, t, 1.2, t1, { size: 54, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite 2', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = function (ctx, t, name, code) {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.fillRect(0, 0, E.W, E.H);
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, name, 960, 515, { size: 52, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };

  // ---------- zemin, kart, etiket ----------
  F.floor = function (ctx, y, seed = 1, x0 = -200, x1 = 2120, y2 = 1300, col = '#8A6A45') {
    const f = [[x0, y], [x1, y], [x1, y2], [x0, y2]];
    P.fillPts(ctx, f, PAL.paper, 1); wash(ctx, f, col, 0.2, 1700 + seed, { bleed: 3, blooms: 2 });
    stroke(ctx, [[x0 + 60, y], [(x0 + x1) / 2, y - 2], [x1 - 60, y - 1]], { w: 3.2, seed: 1710 + seed, taper: 0.02 });
  };
  F.card = function (ctx, x0, y0, x1, y1, o = {}) {
    const c = [[x0, y0], [x1, y0 - 4], [x1 + 4, y1], [x0 + 3, y1 + 3], [x0, y0]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color, seed: o.seed ?? 1800 });
  };
  F.tag = function (ctx, txt, x, y, o = {}) {
    ctx.save(); ctx.font = `700 ${o.size ?? 40}px Kalam`; const w = ctx.measureText(txt).width;
    const pad = 14, h = (o.size ?? 40) * 1.25;
    const bx = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
    const r = [[bx - pad, y - h * 0.78], [bx + w + pad, y - h * 0.8], [bx + w + pad + 2, y + h * 0.3], [bx - pad, y + h * 0.32], [bx - pad, y - h * 0.78]];
    P.fillPts(ctx, r, o.fill ?? '#FBF8F1', 0.95); stroke(ctx, r, { w: 2, closed: true, dry: false, seed: o.seed ?? 3090, color: o.color ?? PAL.ink });
    ctx.fillStyle = o.color ?? PAL.ink; ctx.textAlign = 'left'; ctx.fillText(txt, bx, y); ctx.restore();
    return w + 2 * pad;
  };

  // ---------- oklar ----------
  F.vec = function (ctx, a, b, k = 1, o = {}) {
    if (k <= 0) return; const col = o.color ?? F.FORCE, w = o.w ?? 6;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 1) return;
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, kk = Math.min(1, k);
    const e = [a[0] + ux * L * kk, a[1] + uy * L * kk];
    stroke(ctx, [a, [e[0] - ux * 6, e[1] - uy * 6]], { w, color: col, taper: 0.02, dry: false, vary: 0.2, seed: o.seed ?? 3010 });
    if (k >= 0.98) { const h = o.head ?? 20; const px = -uy, py = ux;
      P.fillPts(ctx, [[e[0] + ux * 4, e[1] + uy * 4], [e[0] - ux * h * 1.3 + px * h * 0.62, e[1] - uy * h * 1.3 + py * h * 0.62], [e[0] - ux * h * 1.05, e[1] - uy * h * 1.05], [e[0] - ux * h * 1.3 - px * h * 0.62, e[1] - uy * h * 1.3 - py * h * 0.62]], col, 1); }
    if (o.label && k > 0.6) { ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.6) * 2.5); F.txt(ctx, o.label, (a[0] + b[0]) / 2 + (o.lx ?? 0), (a[1] + b[1]) / 2 + (o.ly ?? -20), { size: o.size ?? 34, color: o.lcolor ?? col, align: o.align ?? 'center' }); ctx.restore(); }
  };
  F.dash = function (ctx, a, b, k = 1, o = {}) {
    if (k <= 0) return; const col = o.color ?? F.PATH; const kk = Math.min(1, k);
    const e = [a[0] + (b[0] - a[0]) * kk, a[1] + (b[1] - a[1]) * kk];
    const pts = []; const n = Math.max(2, Math.ceil(Math.hypot(e[0] - a[0], e[1] - a[1]) / 4)); for (let i = 0; i <= n; i++) pts.push([a[0] + (e[0] - a[0]) * i / n, a[1] + (e[1] - a[1]) * i / n]);
    dashed(ctx, pts, { w: o.w ?? 3.4, on: 12, off: 8, color: col });
    if (o.arrow !== false && k >= 0.98 && pts.length > 3) INK.arrowHead(ctx, pts[pts.length - 3], e, 14, { w: 3.2, color: col });
  };
  // yoğun örneklenmiş kesikli eğri (pts seyrekse sıklaştır)
  F.dense = function (pts, step = 4) { const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) out.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]); } return out; };
  // ölçü çizgisi (dikey): x, y0→y1, etiket
  F.dim = function (ctx, x, y0, y1, label, o = {}) {
    const col = o.color ?? F.PATH;
    line(ctx, [x, y0], [x, y1], { w: 2.4, color: col, dry: false, taper: 0 });
    line(ctx, [x - 12, y0], [x + 12, y0], { w: 2.4, color: col, dry: false, taper: 0 });
    line(ctx, [x - 12, y1], [x + 12, y1], { w: 2.4, color: col, dry: false, taper: 0 });
    if (label) F.txt(ctx, label, x + (o.side ?? 1) * 20, (y0 + y1) / 2 + 12, { size: o.size ?? 36, color: col, align: (o.side ?? 1) > 0 ? 'left' : 'right' });
  };

  // ---------- kaldıraç parçaları ----------
  F.fulcrum = function (ctx, x, y, s = 1, seed = 2100) {
    const tri = [[x, y], [x + 52 * s, y + 86 * s], [x - 52 * s, y + 86 * s], [x, y]];
    P.fillPts(ctx, tri, PAL.paperDeep); wash(ctx, tri, F.WOOD, 0.45, seed, { bleed: 1, blooms: 0 }); stroke(ctx, tri, { w: 3, closed: true, seed: seed + 1 });
    return y + 86 * s;
  };
  // tahta: pivot = tahtanın alt yüzünün destekle değdiği nokta; phi>0 → sol uç yukarı; a: sol kol, b: sağ kol
  F.plank = function (ctx, pv, phi, a, b, o = {}) {
    const th = o.th ?? 22, u = [Math.cos(phi), Math.sin(phi)], n = [Math.sin(phi), -Math.cos(phi)];
    const P0 = d => [pv[0] + u[0] * d, pv[1] + u[1] * d];
    const T = d => { const p = P0(d); return [p[0] + n[0] * th, p[1] + n[1] * th]; };
    const poly = [P0(-a), P0(b), T(b), T(-a), P0(-a)];
    P.fillPts(ctx, poly, '#E8D2A8'); wash(ctx, poly, F.WOOD, 0.5, o.seed ?? 2110, { bleed: 1, blooms: 0 }); stroke(ctx, poly, { w: 3, closed: true, seed: (o.seed ?? 2110) + 1 });
    return { top: T, bot: P0, u, n };
  };
  // ağırlık bloğu: (cx,by) taban ortası; ang: dönme (radyan, taban ortası etrafında)
  F.block = function (ctx, cx, by, w, h, label, o = {}) {
    ctx.save(); ctx.translate(cx, by); ctx.rotate(o.ang ?? 0);
    const b = [[-w / 2, -h], [w / 2, -h - 2], [w / 2 + 2, 0], [-w / 2, 0], [-w / 2, -h]];
    P.fillPts(ctx, b, '#D9D4CA'); wash(ctx, b, o.col ?? '#5C6670', 0.5, o.seed ?? 2130, { bleed: 1.5, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: (o.seed ?? 2130) + 1 });
    stroke(ctx, P.arc(0, -h - 2, w * 0.16, Math.PI, 2 * Math.PI, 14), { w: 3.4, seed: (o.seed ?? 2130) + 2 });
    if (label) F.txt(ctx, label, 0, -h / 2 + 13, { size: o.size ?? 36, align: 'center', color: PAL.white, rot: 0 });
    ctx.restore();
  };
  F.stone = function (ctx, cx, by, r, seed = 2150) {
    const pts = wobble(circlePts(cx, by - r * 0.62, r, r * 0.64, 40), r * 0.08, seed);
    P.fillPts(ctx, pts, '#CFC8BA'); wash(ctx, pts, '#6F6A60', 0.5, seed + 1, { bleed: 2, blooms: 2 }); stroke(ctx, pts, { w: 3.2, closed: true, seed: seed + 2 });
  };

  // ---------- makara, ip, kanca, tavan ----------
  F.pulley = function (ctx, x, y, r, rot = 0, o = {}) {
    const seed = o.seed ?? 2200;
    const rim = circlePts(x, y, r, r, 48);
    P.fillPts(ctx, rim, '#EDE3CF'); wash(ctx, rim, o.col ?? F.WOOD, 0.4, seed, { bleed: 1, blooms: 0 });
    stroke(ctx, rim, { w: 3.2, closed: true, seed: seed + 1, noBoil: true });
    stroke(ctx, circlePts(x, y, r * 0.8, r * 0.8, 40), { w: 1.6, closed: true, alpha: 0.6, dry: false, seed: seed + 2, noBoil: true });
    for (let i = 0; i < 3; i++) { const a = rot + i * 2 * Math.PI / 3; line(ctx, [x + Math.cos(a) * r * 0.16, y + Math.sin(a) * r * 0.16], [x + Math.cos(a) * r * 0.78, y + Math.sin(a) * r * 0.78], { w: 2.4, dry: false, seed: seed + 3 + i }); }
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(x, y, Math.max(4, r * 0.12), 0, 7); ctx.fill(); ctx.restore();
  };
  F.rope = function (ctx, a, b, o = {}) { line(ctx, a, b, { w: o.w ?? 3.4, color: o.color ?? F.ROPE, dry: false, taper: 0, vary: 0.1, seed: o.seed ?? 2250 }); };
  F.ropeArc = function (ctx, x, y, r, a0, a1, o = {}) { stroke(ctx, P.arc(x, y, r, a0, a1, 24), { w: o.w ?? 3.4, color: o.color ?? F.ROPE, dry: false, taper: 0, vary: 0.1, seed: o.seed ?? 2260 }); };
  F.ceiling = function (ctx, x0, x1, y, seed = 2270) {
    const b = F.rect(x0, y - 26, x1, y); P.fillPts(ctx, b, '#E8D2A8'); wash(ctx, b, F.WOOD, 0.55, seed, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: seed + 1 });
    for (let x = x0 + 10; x < x1 - 10; x += 26) line(ctx, [x, y - 26], [x + 16, y - 44], { w: 1.8, dry: false, alpha: 0.7, seed: seed + x });
  };
  F.hook = function (ctx, x, y, s = 1) { // (x,y) askı noktası (üst); kanca aşağı
    line(ctx, [x, y], [x, y + 20 * s], { w: 3.4, dry: false, taper: 0 });
    stroke(ctx, P.arc(x, y + 32 * s, 12 * s, -Math.PI / 2, Math.PI * 1.1, 20), { w: 3.4, taper: 0.1, seed: 2280 });
    return y + 44 * s;
  };
  // bağlantı çatalı (makara askısı): makara merkezinden yukarı/aşağı
  F.strap = function (ctx, x, y, r, dir = -1, len = 40) {
    const e = y + dir * (r + len);
    line(ctx, [x - r * 0.3, y], [x - 4, e], { w: 3, dry: false, taper: 0 }); line(ctx, [x + r * 0.3, y], [x + 4, e], { w: 3, dry: false, taper: 0 });
    return e;
  };

  // ---------- dişli çark ----------
  F.gear = function (ctx, x, y, r, n, rot = 0, o = {}) {
    const seed = o.seed ?? 2300, td = o.td ?? Math.max(10, r * 0.16), pts = [];
    for (let i = 0; i < n; i++) {
      const a0 = rot + i * 2 * Math.PI / n, da = 2 * Math.PI / n;
      const R0 = r - td / 2, R1 = r + td / 2;
      [[0.0, R0], [0.18, R0], [0.3, R1], [0.7, R1], [0.82, R0]].forEach(([f, R]) => pts.push([x + Math.cos(a0 + f * da) * R, y + Math.sin(a0 + f * da) * R]));
    }
    pts.push(pts[0]);
    P.fillPts(ctx, pts, '#EDE3CF'); wash(ctx, pts, o.col ?? F.WOOD, 0.45, seed, { bleed: 1, blooms: 0 });
    stroke(ctx, pts, { w: 2.6, closed: true, seed: seed + 1, noBoil: true, vary: 0.2 });
    stroke(ctx, circlePts(x, y, r * 0.55, r * 0.55, 36), { w: 1.6, closed: true, alpha: 0.5, dry: false, seed: seed + 2, noBoil: true });
    // işaret kolu (dönmeyi görmek için)
    line(ctx, [x, y], [x + Math.cos(rot + 0.1) * r * 0.62, y + Math.sin(rot + 0.1) * r * 0.62], { w: 5, color: o.mark ?? F.RED, dry: false, taper: 0.1 });
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(x, y, Math.max(5, r * 0.08), 0, 7); ctx.fill(); ctx.restore();
  };
  // dönme yönü oku (yay): cw=true saat yönü
  F.spin = function (ctx, x, y, r, cw, k = 1, o = {}) {
    if (k <= 0) return; const a0 = -Math.PI * 0.85, a1 = -Math.PI * 0.15;
    const pts = cw ? P.arc(x, y, r, a0, a1, 30) : P.arc(x, y, r, a1, a0, 30);
    P.drawOn(ctx, pts, k, { w: 3.4, color: o.color ?? F.FORCE });
    if (k >= 0.98) INK.arrowHead(ctx, pts[pts.length - 4], pts[pts.length - 1], 16, { w: 3.4, color: o.color ?? F.FORCE });
  };

  // ---------- eğik düzlem ----------
  F.ramp = function (ctx, x0, y0, x1, y1, seed = 2350) { // x0,y0 alt sol köşe; x1: sağ alt; y1: tepe yüksekliği (sağda)
    const tri = [[x0, y0], [x1, y0], [x1, y1], [x0, y0]];
    P.fillPts(ctx, tri, '#E8D2A8'); wash(ctx, tri, F.WOOD, 0.4, seed, { bleed: 2, blooms: 1 }); stroke(ctx, tri, { w: 3.2, closed: true, seed: seed + 1 });
  };

  // ---------- vida ----------
  F.screw = function (ctx, x, y, len, r, turn = 0, o = {}) { // (x,y) baş merkezi, aşağı doğru
    const head = [[x - r * 2, y - 16], [x + r * 2, y - 16], [x + r * 1.6, y + 10], [x - r * 1.6, y + 10], [x - r * 2, y - 16]];
    P.fillPts(ctx, head, '#D9D4CA'); wash(ctx, head, '#5C6670', 0.4, 2400, { bleed: 1 }); stroke(ctx, head, { w: 3, closed: true, seed: 2401 });
    line(ctx, [x - r * 1.2 * Math.cos(turn), y - 3], [x + r * 1.2 * Math.cos(turn), y - 3], { w: 4, dry: false });
    const body = [[x - r, y + 10], [x + r, y + 10], [x + r, y + len - r * 1.2], [x, y + len], [x - r, y + len - r * 1.2], [x - r, y + 10]];
    P.fillPts(ctx, body, '#E3DED4'); wash(ctx, body, '#5C6670', 0.3, 2402, { bleed: 1 }); stroke(ctx, body, { w: 2.8, closed: true, seed: 2403 });
    const pitch = o.pitch ?? 26; const ph = ((turn / (2 * Math.PI)) % 1 + 1) % 1 * pitch;
    for (let yy = y + 22 + ph; yy < y + len - r * 1.3; yy += pitch) line(ctx, [x - r - 7, yy + pitch * 0.4], [x + r + 7, yy], { w: 3, dry: false, seed: 2410 + (yy | 0) });
  };

  // ---------- el arabası, cımbız, bayrak direği (küçük ikonlar) ----------
  F.icon = {};
  F.icon.wheelbarrow = function (ctx, x, y, s = 1) { // y: zemin
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const tray = [[-70, -70], [40, -70], [20, -30], [-60, -30], [-70, -70]]; P.fillPts(ctx, tray, '#E8D2A8'); wash(ctx, tray, PAL.life, 0.5, 2500); stroke(ctx, tray, { w: 3, closed: true, seed: 2501 });
    stroke(ctx, circlePts(-62, -18, 18, 18, 24), { w: 3, closed: true, seed: 2502 });
    line(ctx, [-62, -18], [70, -48], { w: 4 }); line(ctx, [10, -30], [16, 0], { w: 3 });
    ctx.restore();
  };
  F.icon.tweezers = function (ctx, x, y, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, [[-70, -6], [60, -22], [72, -4]], { w: 4, seed: 2510 }); stroke(ctx, [[-70, 6], [60, 22], [72, 4]], { w: 4, seed: 2511 });
    line(ctx, [-74, -8], [-74, 8], { w: 5 });
    ctx.restore();
  };
  F.icon.flag = function (ctx, x, y, s = 1) { // y: zemin
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [0, 0], [0, -150], { w: 4 }); F.pulley(ctx, 0, -150, 10, 0, { seed: 2520 });
    const fl = [[4, -130], [66, -120], [4, -100], [4, -130]]; P.fillPts(ctx, fl, F.RED, 0.8); stroke(ctx, fl, { w: 2, closed: true });
    line(ctx, [10, -150], [10, -10], { w: 1.8, color: F.ROPE, dry: false });
    ctx.restore();
  };
  F.icon.seesaw = function (ctx, x, y, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.fulcrum(ctx, 0, -46, 0.55, 2530); F.plank(ctx, [0, -46], 0.18, 90, 90, { th: 10, seed: 2531 });
    ctx.restore();
  };
  F.icon.hookPulley = function (ctx, x, y, s = 1) { // y: tavan
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-60, 0], [60, 0], { w: 4 });
    F.rope(ctx, [-24, 0], [-24, 70], { w: 2.6 }); F.rope(ctx, [24, 0], [24, 70], { w: 2.6 });
    F.pulley(ctx, 0, 70, 24, 0.3, { seed: 2540 }); F.hook(ctx, 0, 94, 0.9);
    F.block(ctx, 0, 170, 60, 50, '', { seed: 2541 });
    ctx.restore();
  };
  F.icon.ramp = function (ctx, x, y, s = 1) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.ramp(ctx, -90, 0, 90, -80, 2550); const a = Math.atan2(-80, 180);
    F.block(ctx, -10, -80 * (80 / 180), 40, 32, '', { ang: a, seed: 2551 });
    ctx.restore();
  };
  F.icon.screw = function (ctx, x, y, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); F.screw(ctx, 0, -70, 120, 14, 0.4, { pitch: 18 }); ctx.restore(); };
  F.icon.well = function (ctx, x, y, s = 1) { // y: zemin
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const w = F.rect(-60, -40, 60, 0); P.fillPts(ctx, w, '#D9D4CA'); wash(ctx, w, '#6F6A60', 0.4, 2560); stroke(ctx, w, { w: 3, closed: true, seed: 2561 });
    line(ctx, [-56, -40], [-56, -120], { w: 4 }); line(ctx, [56, -40], [56, -120], { w: 4 });
    const drum = F.rect(-40, -126, 40, -106); P.fillPts(ctx, drum, '#E8D2A8'); stroke(ctx, drum, { w: 2.4, closed: true, seed: 2562 });
    line(ctx, [56, -116], [80, -116], { w: 3 }); line(ctx, [80, -116], [80, -86], { w: 3 }); line(ctx, [80, -86], [96, -86], { w: 4 });
    F.rope(ctx, [0, -106], [0, -60], { w: 2.2 }); const bk = [[-12, -60], [12, -60], [9, -40], [-9, -40], [-12, -60]]; P.fillPts(ctx, bk, PAL.water, 0.5); stroke(ctx, bk, { w: 2, closed: true });
    ctx.restore();
  };
  F.icon.bikeGears = function (ctx, x, y, s = 1, rot = 0) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.gear(ctx, -45, 0, 42, 18, rot, { seed: 2570, td: 8 }); F.gear(ctx, 60, 0, 20, 9, -rot * 2, { seed: 2571, td: 7 });
    line(ctx, [-45, -46], [60, -24], { w: 2.4, dry: false, color: F.ROPE }); line(ctx, [-45, 46], [60, 24], { w: 2.4, dry: false, color: F.ROPE });
    ctx.restore();
  };

  // ---------- dinamometre (films/05-kuvvet-olcme'den sadeleştirildi) ----------
  function spring(ctx, x, y0, y1, o = {}) {
    const n = o.coils ?? 10, r = o.r ?? 12, w = o.w ?? 2.2, len = y1 - y0, pts = [];
    for (let i = 0; i <= n * 20; i++) { const u = i / (n * 20); const a = u * n * 2 * Math.PI; pts.push([x - Math.cos(a) * r, y0 + len * u + Math.sin(a) * r * 0.25]); }
    stroke(ctx, pts, { w, dry: false, taper: 0, vary: 0.15, seed: 2600, noBoil: true });
  }
  // (x,y): üst halka; F: gösterge (N); max; L: gövde boyu. Döner: alt kanca noktası
  F.dyn = function (ctx, x, y, Fv, o = {}) {
    const L = o.L ?? 220, W = o.W ?? 50, max = o.max ?? 10;
    const top = y + 24, bot = top + L, s0 = top + L * 0.18, s1 = bot - 22;
    const py = s0 + (s1 - s0) * E.clamp(Fv / max);
    stroke(ctx, circlePts(x, y + 10, 10, 10, 20), { w: 3.4, closed: true, seed: 2610, noBoil: true });
    line(ctx, [x, y + 20], [x, top], { w: 3.4, dry: false, taper: 0 });
    const tube = F.rect(x - W / 2, top, x + W / 2, bot); P.fillPts(ctx, tube, '#FBF8F1', 0.95); wash(ctx, tube, PAL.water, 0.12, 2611, { bleed: 1, blooms: 0 });
    for (let v = 0; v <= max; v += 1) { const yy = s0 + (s1 - s0) * v / max, mj = v % 5 === 0; line(ctx, [x + W / 2 - (mj ? 16 : 9), yy], [x + W / 2, yy], { w: mj ? 2.2 : 1.2, dry: false, taper: 0, noBoil: true }); if (mj) F.txt(ctx, String(v), x + W / 2 + 8, yy + 9, { size: 26, rot: 0 }); }
    spring(ctx, x, top + 6, py - 3, { r: W * 0.26 });
    P.fillPts(ctx, F.rect(x - W / 2 + 2, py - 4, x + W / 2 + 2, py + 4), '#C07F1E', 0.95);
    stroke(ctx, tube, { w: 2.8, closed: true, seed: 2612, noBoil: true });
    const hy = bot + 30; line(ctx, [x, py], [x, hy], { w: 3, dry: false, taper: 0 });
    stroke(ctx, P.arc(x, hy + 11, 11, -Math.PI / 2, Math.PI * 1.05, 18), { w: 3.4, seed: 2613, taper: 0.1 });
    return [x, hy + 22];
  };

  return F;
})();

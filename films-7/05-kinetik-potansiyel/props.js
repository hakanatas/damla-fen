// props.js — 7. sınıf Ünite 2 (Kuvvet ve Enerji) filmleri için ortak çizim yardımcıları.
// Aynı dosya 04-fiziksel-is, 05-kinetik-potansiyel ve 06-enerji-korunumu klasörlerinde bulunur (her film yalnızca kendi kopyasını yükler).
// Bazı parçalar films-6/03-bileske-kuvvet/props.js'ten uyarlanmıştır. Global: window.F7E
window.F7E = (function () {
  const { PAL, line, stroke, circlePts, wash, inkDot, wobble, dashed } = INK;
  const F = {};
  F.FORCE = '#8A4A10';     // kuvvet okları (seri boyunca kahverengi)
  F.DISP = PAL.water;      // yer değiştirme okları
  F.PE = '#8A4A10';        // potansiyel enerji (koyu kehribar/kahve)
  F.KE = '#E3A03A';        // kinetik enerji (kehribar)
  F.HEAT = '#B5553F';      // ısı
  F.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  F.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 36}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.012); ctx.fillText(s, 0, 0); ctx.restore(); };
  F.tw = (ctx, s, size = 36, weight = 700) => { ctx.save(); ctx.font = `${weight} ${size}px Kalam`; const w = ctx.measureText(s).width; ctx.restore(); return w; };

  // ---------- başlık ve bitiş kartları ----------
  F.title = function (ctx, t, n, name) {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, n + ' · ' + name, 960, 285, t, 1.2, t1, { size: 54, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 7. sınıf · Ünite 2', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = function (ctx, t, name, code) {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, name, 960, 515, { size: 52, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };

  // ---------- zemin, kart, tablo ----------
  F.floor = function (ctx, y, seed = 1, x0 = -200, x1 = 2120, y2 = 1300) {
    const f = [[x0, y], [x1, y], [x1, y2], [x0, y2]];
    P.fillPts(ctx, f, PAL.paper, 1); wash(ctx, f, '#8A6A45', 0.2, 1700 + seed, { bleed: 3, blooms: 2 });
    stroke(ctx, [[x0 + 60, y], [(x0 + x1) / 2, y - 2], [x1 - 60, y - 1]], { w: 3.2, seed: 1710 + seed, taper: 0.02 });
  };
  F.card = function (ctx, x0, y0, x1, y1, o = {}) {
    const c = [[x0, y0], [x1, y0 - 4], [x1 + 4, y1], [x0 + 3, y1 + 3], [x0, y0]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color, seed: o.seed ?? 1800 });
  };
  // ruled table: cols = [w...], rows = [[..],..] (ilk satır başlık). kFn(i) → satır açılışı 0..1
  F.table = function (ctx, x, y, cols, rows, rowH, kFn, o = {}) {
    const W = cols.reduce((a, b) => a + b, 0);
    rows.forEach((r, i) => {
      const k = kFn(i); if (k <= 0) return; const yy = y + i * rowH;
      if (i === 0) P.fillPts(ctx, F.rect(x, yy, x + W, yy + rowH), PAL.light, 0.25 * Math.min(1, k * 2));
      line(ctx, [x, yy + rowH], [x + W * Math.min(1, k * 1.5), yy + rowH], { w: i === 0 ? 3 : 1.8, dry: false, seed: 970 + i });
      let cx = x; r.forEach((c, j) => { P.write(ctx, c, cx + 16, yy + rowH * 0.68, E.clamp(k * (1 + 0.3 * cols.length) - j * 0.3), { size: o.size ?? 38, weight: i === 0 ? 700 : 400, color: (o.colColor && i > 0 && o.colColor[j]) || PAL.ink }); cx += cols[j]; });
    });
    if (kFn(0) > 0) { let cx = x; const n = rows.filter((r, i) => kFn(i) > 0).length; for (let j = 1; j < cols.length; j++) { cx += cols[j - 1]; line(ctx, [cx, y], [cx, y + rowH * n], { w: 1.8, dry: false, seed: 990 + j }); } }
  };
  F.tag = function (ctx, txt, x, y, o = {}) {
    ctx.save(); ctx.font = `700 ${o.size ?? 40}px Kalam`; const w = ctx.measureText(txt).width;
    const pad = 14, h = (o.size ?? 40) * 1.25;
    const bx = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
    const r = [[bx - pad, y - h * 0.78], [bx + w + pad, y - h * 0.8], [bx + w + pad + 2, y + h * 0.3], [bx - pad, y + h * 0.32], [bx - pad, y - h * 0.78]];
    P.fillPts(ctx, r, o.fill ?? '#FBF8F1', 0.95); stroke(ctx, r, { w: 2, closed: true, dry: false, seed: o.seed ?? 3090, color: o.color ?? PAL.ink });
    ctx.fillStyle = o.color ?? PAL.ink; ctx.textAlign = 'left'; ctx.fillText(txt, bx, y); ctx.restore();
  };

  // ---------- oklar ----------
  // kalın düz ok a→b (k: çizim ilerlemesi). o: color, w, head, label, lx, ly, size, dot
  F.vec = function (ctx, a, b, k = 1, o = {}) {
    if (k <= 0) return; const col = o.color ?? F.FORCE, w = o.w ?? 6;
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 1) return;
    const ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L, kk = Math.min(1, k);
    const e = [a[0] + ux * L * kk, a[1] + uy * L * kk];
    stroke(ctx, [a, [e[0] - ux * 6, e[1] - uy * 6]], { w, color: col, taper: 0.02, dry: false, vary: 0.2, seed: o.seed ?? 3010 });
    if (k >= 0.98) { const h = o.head ?? 20; const px = -uy, py = ux;
      P.fillPts(ctx, [[e[0] + ux * 4, e[1] + uy * 4], [e[0] - ux * h * 1.3 + px * h * 0.62, e[1] - uy * h * 1.3 + py * h * 0.62], [e[0] - ux * h * 1.05, e[1] - uy * h * 1.05], [e[0] - ux * h * 1.3 - px * h * 0.62, e[1] - uy * h * 1.3 - py * h * 0.62]], col, 1); }
    if (o.dot) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(a[0], a[1], w * 1.2, 0, 7); ctx.fill(); ctx.restore(); }
    if (o.label && k > 0.6) { ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.6) * 2.5); F.txt(ctx, o.label, (a[0] + b[0]) / 2 + (o.lx ?? 0), (a[1] + b[1]) / 2 + (o.ly ?? -20), { size: o.size ?? 34, color: o.lcolor ?? col, align: o.align ?? 'center' }); ctx.restore(); }
  };
  // kesikli yer değiştirme oku
  F.disp = function (ctx, a, b, k = 1, o = {}) {
    if (k <= 0) return; const col = o.color ?? F.DISP; const kk = Math.min(1, k);
    const e = [a[0] + (b[0] - a[0]) * kk, a[1] + (b[1] - a[1]) * kk];
    const pts = []; const n = Math.max(2, Math.ceil(Math.hypot(e[0] - a[0], e[1] - a[1]) / 4)); for (let i = 0; i <= n; i++) pts.push([a[0] + (e[0] - a[0]) * i / n, a[1] + (e[1] - a[1]) * i / n]);
    dashed(ctx, pts, { w: o.w ?? 3.4, on: 14, off: 9, color: col });
    if (k >= 0.98 && pts.length > 3) INK.arrowHead(ctx, pts[pts.length - 3], e, 16, { w: 3.4, color: col });
    if (o.label && k > 0.6) { ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.6) * 2.5); F.txt(ctx, o.label, (a[0] + b[0]) / 2 + (o.lx ?? 0), (a[1] + b[1]) / 2 + (o.ly ?? 40), { size: o.size ?? 32, color: col, align: o.align ?? 'center' }); ctx.restore(); }
  };

  // ---------- nesneler ----------
  F.box = function (ctx, cx, fy, w = 190, h = 150, seed = 3050, col = '#8A6A45') {
    const b = [[cx - w / 2, fy - h], [cx + w / 2, fy - h - 2], [cx + w / 2 + 2, fy], [cx - w / 2, fy], [cx - w / 2, fy - h]];
    P.fillPts(ctx, b, '#E8D2A8'); wash(ctx, b, col, 0.45, seed, { bleed: 1.5, blooms: 1 });
    for (let i = 1; i < 3; i++) line(ctx, [cx - w / 2 + 6, fy - h * i / 3], [cx + w / 2 - 6, fy - h * i / 3], { w: 1.6, alpha: 0.55, dry: false, seed: seed + i });
    line(ctx, [cx - w / 2 + 10, fy - h + 8], [cx + w / 2 - 10, fy - 8], { w: 2.4, alpha: 0.6, dry: false, seed: seed + 5 });
    stroke(ctx, b, { w: 3.2, closed: true, seed: seed + 9 });
  };
  // okul çantası: (x,y) = sapın tepesi; s ölçek; döner: alt y
  F.bag = function (ctx, x, y, s = 1, col = '#4F6D7A', seed = 931) {
    const t = y;
    stroke(ctx, P.arc(x, t + 40 * s, 34 * s, Math.PI * 1.08, Math.PI * 1.92, 20), { w: 5 * Math.max(0.6, s), seed });
    const b = [[x - 70 * s, t + 32 * s], [x + 70 * s, t + 32 * s], [x + 78 * s, t + 170 * s], [x - 78 * s, t + 170 * s], [x - 70 * s, t + 32 * s]];
    P.fillPts(ctx, b, PAL.paper); wash(ctx, b, col, 0.6, seed + 1, { bleed: 2, blooms: 1 }); stroke(ctx, b, { w: 3.2, closed: true, seed: seed + 2 });
    const pk = F.rect(x - 44 * s, t + 96 * s, x + 44 * s, t + 152 * s); wash(ctx, pk, col, 0.4, seed + 3, { bleed: 1 }); stroke(ctx, pk, { w: 2.2, closed: true, seed: seed + 4 });
    line(ctx, [x - 44 * s, t + 112 * s], [x + 44 * s, t + 112 * s], { w: 1.8, dry: false });
    return t + 170 * s;
  };
  F.ball = function (ctx, x, y, r, col = PAL.water, seed = 1500, o = {}) {
    const d = circlePts(x, y, r, r, 40);
    P.fillPts(ctx, d, PAL.white, 0.95); wash(ctx, d, col, o.alpha ?? 0.6, seed, { bleed: Math.max(1, r * 0.05), blooms: 1 });
    if (o.stripe) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); stroke(ctx, P.arc(x - r * 1.3, y, r * 1.1, -0.9, 0.9, 20), { w: Math.max(1.4, r * 0.07), color: PAL.white, dry: false, seed: seed + 2 }); ctx.restore(); }
    stroke(ctx, wobble(d, Math.max(0.6, r * 0.02), seed + 1), { w: Math.max(2, r * 0.07), closed: true, seed: seed + 3 });
  };
  // yatay yay (sarmal): x0 sabit uç, x1 serbest uç, y eksen
  F.hspring = function (ctx, x0, x1, y, o = {}) {
    const n = o.coils ?? 9, r = o.r ?? 26, w = o.w ?? 3, col = o.color ?? PAL.ink, len = x1 - x0;
    const pts = []; const N = n * 24;
    for (let i = 0; i <= N; i++) { const u = i / N; const a = u * n * 2 * Math.PI; pts.push([x0 + len * u + Math.sin(a) * r * 0.25, y - Math.cos(a) * r]); }
    stroke(ctx, pts, { w, color: col, dry: false, taper: 0, vary: 0.15, seed: o.seed ?? 1600, noBoil: true });
  };
  // dikey yay: y0 alt sabit uç, y1 üst serbest uç (y1 < y0)
  F.vspring = function (ctx, x, y0, y1, o = {}) {
    const n = o.coils ?? 8, r = o.r ?? 30, w = o.w ?? 3, col = o.color ?? PAL.ink, len = y1 - y0;
    const pts = []; const N = n * 24;
    for (let i = 0; i <= N; i++) { const u = i / N; const a = u * n * 2 * Math.PI; pts.push([x - Math.cos(a) * r, y0 + len * u + Math.sin(a) * r * 0.22]); }
    stroke(ctx, pts, { w, color: col, dry: false, taper: 0, vary: 0.15, seed: o.seed ?? 1610, noBoil: true });
  };
  F.shelf = function (ctx, x0, x1, y, seed = 1620) {
    const s = F.rect(x0, y, x1, y + 22); P.fillPts(ctx, s, '#E8D2A8'); wash(ctx, s, '#8A6A45', 0.5, seed, { bleed: 1, blooms: 0 }); stroke(ctx, s, { w: 2.6, closed: true, seed: seed + 1 });
  };

  // ---------- enerji çubukları (nitel; sayı yok) ----------
  // vals: {pe, ke, heat} 0..1 ; x: sol, yb: taban; o.H yükseklik, o.which: dizi, o.total: yığılmış toplam sütunu
  F.ebars = function (ctx, x, yb, vals, o = {}) {
    const H = o.H ?? 300, bw = o.bw ?? 84, gap = o.gap ?? 190;
    const items = (o.which ?? ['pe', 'ke', 'heat']).map(k => ({ k, v: vals[k] ?? 0, col: { pe: F.PE, ke: F.KE, heat: F.HEAT }[k], name: { pe: 'potansiyel', ke: 'kinetik', heat: 'ısı' }[k] }));
    items.forEach((it, i) => {
      const cx = x + i * gap + bw / 2;
      line(ctx, [cx - bw / 2 - 12, yb], [cx + bw / 2 + 12, yb], { w: 2.4, dry: false, seed: 1630 + i });
      const hgt = H * E.clamp(it.v);
      if (hgt > 1) { const r = F.rect(cx - bw / 2, yb - hgt, cx + bw / 2, yb); P.fillPts(ctx, r, it.col, 0.75); stroke(ctx, r, { w: 2.4, closed: true, dry: false, seed: 1640 + i, noBoil: true }); }
      F.txt(ctx, it.name, cx, yb + 44, { size: o.size ?? 34, align: 'center', color: it.col === F.KE ? '#9A6412' : it.col });
    });
    if (o.total) {
      const cx = x + items.length * gap + bw / 2 + 20; let acc = 0;
      line(ctx, [cx - bw / 2 - 12, yb], [cx + bw / 2 + 12, yb], { w: 2.4, dry: false, seed: 1650 });
      items.forEach((it, i) => { const h = H * E.clamp(it.v); if (h > 0.5) P.fillPts(ctx, F.rect(cx - bw / 2, yb - acc - h, cx + bw / 2, yb - acc), it.col, 0.75); acc += h; });
      stroke(ctx, F.rect(cx - bw / 2, yb - H, cx + bw / 2, yb), { w: 3, closed: true, seed: 1651, noBoil: true });
      F.txt(ctx, 'toplam', cx, yb + 44, { size: o.size ?? 34, align: 'center' });
    }
  };

  // ---------- kapanış: defter sayfası ----------
  F.record = function (ctx, t, head, items, o = {}) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, head, 290, 170, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 192], [640, 204], [1010, 188], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    const step = o.step ?? 1.6;
    items.forEach((txt, i) => {
      const at = sr + 2.0 + i * step, y = 285 + i * (o.dy ?? 96);
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
      P.write(ctx, txt, 385, y, E.seg(t, at, at + 1.2), { size: o.size ?? 44 });
    });
    const cheer = t > sr + 2.0 + items.length * step + 0.6;
    DAMLA.draw(ctx, {
      x: 1660, y: 1010, s: 1.05, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: cheer ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook'
    });
  };
  // Sıra sende kartı + sonraki film tanıtımı
  F.outro = function (ctx, t, o) {
    const st = E.s('task'), sn = E.s('next'), se = E.s('end');
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.10)'); g.addColorStop(1, 'rgba(46,106,140,0.10)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, st, st + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 200, 190, 1440, 800, { seed: 1900 });
      P.write(c, 'Sıra sende!', 270, 300, E.seg(t, st + 0.3, st + 1.2), { size: 72, color: '#8A4A10' });
      o.task.forEach((l, i) => P.write(c, l, 270, 410 + i * 78, E.seg(t, st + 1.0 + i * 0.9, st + 2.2 + i * 0.9), { size: 46 }));
      if (o.taskNote) INK.label(c, o.taskNote, 270, 760, { size: 32, alpha: 0.65 * E.se(t, st + 4, st + 5) });
      DAMLA.draw(c, { x: 1650, y: 900, s: 1.2, view: 'q3', flip: true, expr: 'happy', look: [-0.8, 0], blink: E.blink(t, 13), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.4], [1, [-60, -170]]] });
    });
    const nk = E.se(t, sn - 0.1, sn + 0.8);
    if (nk > 0) E.layer(ctx, nk, c => {
      if (o.nextArt) o.nextArt(c, t, sn);
      E.inkText(c, 'Sıradaki gözlem:', 960, 250, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(c, o.next, 960, 340, t, sn + 1.1, 1e9, { size: 70, align: 'center' });
      DAMLA.draw(c, { x: 960, y: 860, s: 1.3, view: 'front', expr: 'happy', look: [0, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
    F.endCard(ctx, t, o.name, o.code);
  };
  return F;
})();

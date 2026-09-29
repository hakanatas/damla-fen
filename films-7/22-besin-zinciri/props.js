// props.js — 7. sınıf Film 22 → window.F722
// Ot, çekirge, kurbağa, yılan, şahin, fare, buğday, serçe, mantar, bakteri, ölü yaprak, su yosunu, balık, balıkçıl; canlı kartı.
// Ortak taban (rr / shape / fit / card) 6. sınıf Ünite 7 props.js (F621/F622) dosyalarından uyarlanmıştır.
(function (G) {
  // ---------------- ORTAK TABAN (7. sınıf Ünite 6–7 filmleri: 20, 21, 22, 23) ----------------
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, hatch, arrowHead, rng } = G.INK;
  const F = {};
  const RED = '#A23A2A', HEAT = '#B5553F', GREEN = '#3F7A3A', AMB = '#C07F1E', POS = '#C0612A', NEG = '#2E6A8C';
  Object.assign(F, { RED, HEAT, GREEN, AMB, POS, NEG });
  const closeP = pts => pts.concat([pts[0]]);
  F.closeP = closeP;
  F.rr = (x, y, w, h, r, n = 5) => {
    const p = [];
    [[x + w - r, y + r, -Math.PI / 2, 0], [x + w - r, y + h - r, 0, Math.PI / 2], [x + r, y + h - r, Math.PI / 2, Math.PI], [x + r, y + r, Math.PI, 1.5 * Math.PI]]
      .forEach(([cx, cy, a0, a1]) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    return p.concat([p[0]]);
  };
  F.shape = (ctx, pts, col, a = 0.5, seed = 1, o = {}) => {
    const p = (pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) ? pts : closeP(pts);
    P.fillPts(ctx, p, o.base ?? PAL.white, o.baseA ?? 0.96);
    if (col) wash(ctx, p, col, a, seed, { bleed: o.bleed ?? 1, blooms: o.blooms ?? 0 });
    stroke(ctx, p, { w: o.w ?? 2.6, closed: true, seed: seed + 1, color: o.color });
  };
  // sabit metin, genişliğe sığdırılır
  F.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); ctx.fillText(txt, 0, 0); } else ctx.fillText(txt, x, y);
    ctx.restore();
  };
  // el yazısıyla açılan metin, genişliğe sığdırılır
  F.wfit = (ctx, txt, x, y, k, size, maxW, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px Kalam`;
    while (ctx.measureText(txt).width > maxW && sz > 20) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px Kalam`; }
    ctx.restore(); return P.write(ctx, txt, x, y, k, Object.assign({}, o, { size: sz }));
  };
  F.card = (ctx, x, y, w, h, seed = 1, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = o.blur ?? 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, seed + 3, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed, color: o.color });
    return c;
  };
  // damga (ör. "DOĞRU", "YANLIŞ", "KAYNAK YOK")
  F.stamp = (ctx, x, y, txt, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k), col = o.color ?? GREEN, size = o.size ?? 44;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12); ctx.scale(s, s);
    ctx.font = `700 ${size}px Kalam`; const w = ctx.measureText(txt).width + 40, h = size * 1.35;
    const b = F.rr(-w / 2, -h / 2, w, h, 10, 3); P.fillPts(ctx, b, PAL.white, 0.7);
    stroke(ctx, b, { w: 4, closed: true, color: col, seed: 17, dry: false });
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3);
    ctx.restore();
  };
  // elektrik yükü işareti: sign = +1 / -1 (el çizimi; yazı tipine bağlı değil)
  F.charge = (ctx, x, y, sign, r = 14, o = {}) => {
    const col = sign > 0 ? POS : NEG;
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1);
    if (o.ring !== false) { P.fillPts(ctx, circlePts(x, y, r, r, 18), PAL.white, 0.9); stroke(ctx, circlePts(x, y, r, r, 18), { w: Math.max(1.2, r * 0.12), closed: true, dry: false, color: col, seed: 31 }); }
    const a = r * 0.58, w = Math.max(2, r * 0.22);
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - a, y); ctx.lineTo(x + a, y); if (sign > 0) { ctx.moveTo(x, y - a); ctx.lineTo(x, y + a); } ctx.stroke();
    ctx.restore();
  };
  // Damla sarmalayıcı
  F.damla = (ctx, t, o = {}) => {
    DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'curious', look: [0.6, -0.2], blink: E.blink(t, o.bseed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.4], [1, 0.5]] }, o));
  };
  F.wave = (t) => [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]];
  // başlık kartı (filmin ilk sahnesi)
  F.title = (ctx, t, head, unit, col) => {
    const t1 = E.e('title') + 1.2;
    if (t > t1) return;
    const k = Math.min(E.se(t, 0.3, 1.0), 1 - E.se(t, t1 - 0.6, t1));
    ctx.save(); ctx.globalAlpha = 0.84 * k; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 120, E.W, 270); ctx.restore();
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, head, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: col ?? PAL.light }); ctx.restore(); }
  };
  // bitiş kartı
  F.endCard = (ctx, t, head, codes, col, extra) => {
    const se = E.s('end'), ek = E.se(t, se, se + 0.8);
    if (ek <= 0) return;
    E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, extra ? 360 : 400, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, head, 960, extra ? 445 : 485, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([600, extra ? 475 : 515], [960, extra ? 486 : 526], [1320, extra ? 470 : 510], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: col ?? PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, extra ? 565 : 610, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, extra ? 620 : 670, { size: 32, align: 'center', alpha: 0.7 });
      if (extra) INK.label(c, extra, 960, 690, { size: 36, weight: 700, align: 'center', color: col ?? AMB, alpha: 0.9 });
      DAMLA.draw(c, { x: 960, y: 905, s: 0.85, view: 'front', expr: 'happy', t, seed: 1, arms: F.wave(t) });
    });
  };
  // gözlem defteri sayfası: başlık + onaylı maddeler
  F.notebookPage = (ctx, t, t0, heading, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 740);
    F.wfit(ctx, heading, 290, 270, E.seg(t, t0 + 0.3, t0 + 1.5), 60, 1300);
    if (t > t0 + 1.5) P.drawOn(ctx, P.bez([286, 292], [720, 304], [1180, 288], 30), E.se(t, t0 + 1.5, t0 + 2.0), { w: 3, color: o.col ?? PAL.light });
    const gap = o.gap ?? 1.0, dy = o.dy ?? 100;
    items.forEach((it, i) => {
      const [txt, col] = Array.isArray(it) ? it : [it, PAL.ink];
      const at = t0 + 1.6 + i * gap, y = 385 + i * dy;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.8, at + 1.2), { w: 6, color: GREEN });
      F.wfit(ctx, txt, 385, y, E.seg(t, at, at + 1.0), 42, o.maxW ?? 1120, { color: col });
    });
  };
  // "Sıra sende" kartı
  F.taskCard = (ctx, t, sk, k, lines, o = {}) => {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      const x0 = o.x ?? 300, x1 = o.x1 ?? 1620;
      const card = [[x0, 160], [x1, 150], [x1 + 10, 830], [x0 + 10, 842], [x0, 160]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.write(c, 'Sıra sende!', (x0 + x1) / 2, 270, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: o.col ?? GREEN });
      lines.forEach((s, i) => { const at = sk + 1.3 + i * (o.gap ?? 1.0); F.wfit(c, (i + 1) + '. ' + s, x0 + 90, 390 + i * 92, E.seg(t, at, at + 1.1), 46, o.maxW ?? 1100); });
      if (o.extra) o.extra(c);
    });
  };
  // basit tablo: cols = [[başlık, genişlik], ...], rows = [[hücre...], ...]
  F.table = (ctx, x, y, cols, rows, rowH, kHead, kRows, o = {}) => {
    const W = cols.reduce((s, c) => s + c[1], 0), H = rowH * (rows.length + 1);
    const box = F.rr(x, y, W, H, 8, 2);
    P.fillPts(ctx, box, PAL.white, 0.9 * Math.min(1, kHead * 2));
    if (kHead <= 0) return;
    stroke(ctx, P.partial(box, kHead), { w: 2.6, seed: 41 });
    let cx = x; const size = o.size ?? 36;
    cols.forEach(([h, w], j) => {
      if (j > 0) P.drawOn(ctx, [[cx, y], [cx, y + H]], kHead, { w: 1.8, dry: false });
      ctx.save(); ctx.globalAlpha *= E.clamp(kHead * 1.5); F.fit(ctx, h, cx + w / 2, y + rowH * 0.68, w - 16, size, { color: o.headCol ? o.headCol[j] ?? PAL.ink : PAL.ink }); ctx.restore();
      cx += w;
    });
    P.drawOn(ctx, [[x, y + rowH], [x + W, y + rowH]], kHead, { w: 2.2, dry: false });
    rows.forEach((r, i) => {
      const kr = kRows[i] ?? 0; if (kr <= 0) return;
      const yy = y + rowH * (i + 1);
      if (i > 0) P.drawOn(ctx, [[x, yy], [x + W, yy]], kr, { w: 1.2, dry: false, alpha: 0.6 });
      let xx = x;
      r.forEach((cell, j) => {
        const w = cols[j][1];
        ctx.save(); ctx.globalAlpha *= E.clamp(kr * 1.4);
        const col = (o.cellCol && o.cellCol(i, j)) || PAL.ink;
        F.fit(ctx, cell, xx + w / 2, yy + rowH * 0.68, w - 16, o.cellSize ?? size - 2, { color: col, weight: o.cellWeight ?? 700 });
        ctx.restore(); xx += w;
      });
    });
    return [W, H];
  };
  // ---------------- FİLM 22 (Besin zinciri) çizimleri — hepsi MERKEZ (x,y), s=1 ≈ 120–160 px ----------------
  // kurbağa, balık, serçe, balıkçıl, ağaç: 6. sınıf F621 çizimlerinden uyarlandı
  const LEAF = '#4E6B2A';
  F.grass = (ctx, x, y, s = 1, t = 0, seed = 1) => {
    ctx.save(); ctx.translate(x, y + 50 * s); ctx.scale(s, s);
    const R = rng(2400 + seed);
    for (let i = 0; i < 11; i++) { const dx = (i - 5) * 9 + (R() - 0.5) * 6, h = 60 + R() * 50, sw = Math.sin(t * 1.4 + i + seed) * 5; stroke(ctx, P.bez([dx, 0], [dx + sw * 0.5, -h * 0.5], [dx + sw + (i - 5) * 3, -h], 10), { w: 3, color: i % 2 ? PAL.life : LEAF, dry: false, seed: 2401 + i }); }
    ctx.restore();
  };
  F.hopper = (ctx, x, y, s = 1, t = 0) => { // çekirge
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-50, 6], [-30, -14], [30, -16], [52, -4], [40, 12], [-40, 16]];
    F.shape(ctx, b, '#7FA23A', 0.7, 2410);
    const hd = circlePts(52, -6, 14, 13, 16); P.fillPts(ctx, hd, '#9CBB55'); stroke(ctx, hd, { w: 2, closed: true, dry: false }); inkDot(ctx, 58, -9, 2.6);
    stroke(ctx, P.bez([56, -16], [70, -50], [96, -58], 10), { w: 1.4, dry: false }); stroke(ctx, P.bez([50, -16], [56, -54], [80, -66], 10), { w: 1.4, dry: false });
    const leg = [[0, -8], [-36, -44], [-58, 16]]; stroke(ctx, leg, { w: 4, color: '#5C7A28', dry: false, seed: 2411 });
    line(ctx, [20, 10], [28, 26], { w: 2, dry: false }); line(ctx, [30, 8], [44, 24], { w: 2, dry: false });
    stroke(ctx, [[-40, -6], [10, -18], [26, -8]], { w: 1.4, dry: false, alpha: 0.6 });
    ctx.restore();
  };
  F.frog = (ctx, x, y, s = 1, flip = 1) => {
    ctx.save(); ctx.translate(x, y + 20 * s); ctx.scale(s * 1.5 * flip, s * 1.5);
    const leg = [[-30, 0], [-44, -10], [-30, -22], [-14, -10]]; P.fillPts(ctx, leg, '#6F8A3A', 0.9); stroke(ctx, leg, { w: 2, seed: 731 });
    const b = [[-34, 0], [-30, -26], [0, -40], [30, -30], [36, -8], [26, 0], [-34, 0]];
    P.fillPts(ctx, b, '#8FAE52', 1); wash(ctx, b, PAL.life, 0.5, 732, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 733 });
    [[8, -40], [26, -36]].forEach(([ex, ey]) => { P.fillPts(ctx, circlePts(ex, ey, 8, 8, 14), PAL.white); stroke(ctx, circlePts(ex, ey, 8, 8, 14), { w: 1.6, closed: true, dry: false }); inkDot(ctx, ex + 1, ey, 2.8); });
    line(ctx, [14, -18], [34, -16], { w: 1.4, dry: false, bend: -0.1 });
    line(ctx, [18, 0], [24, -12], { w: 2, dry: false }); line(ctx, [18, 0], [30, 0], { w: 2, dry: false });
    ctx.restore();
  };
  F.snake = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([-80 + u * 150, 14 + Math.sin(u * 9 + t * 2) * 16 * (1 - u * 0.3) - u * 10]); }
    stroke(ctx, pts, { w: 22, color: '#8A6A45', dry: false, taper: 0.35, seed: 2420 }); stroke(ctx, pts, { w: 8, color: '#C9A46A', dry: false, taper: 0.4, seed: 2421 });
    for (let i = 4; i < 36; i += 5) inkDot(ctx, pts[i][0], pts[i][1], 2.4, { alpha: 0.6 });
    const h = pts[40]; const hd = circlePts(h[0] + 8, h[1] - 4, 16, 11, 16); P.fillPts(ctx, hd, '#8A6A45'); stroke(ctx, hd, { w: 2, closed: true, dry: false }); inkDot(ctx, h[0] + 14, h[1] - 8, 2.4);
    line(ctx, [h[0] + 24, h[1] - 2], [h[0] + 38, h[1]], { w: 1.4, color: F.HEAT, dry: false }); line(ctx, [h[0] + 38, h[1]], [h[0] + 44, h[1] - 5], { w: 1.2, color: F.HEAT, dry: false }); line(ctx, [h[0] + 38, h[1]], [h[0] + 44, h[1] + 5], { w: 1.2, color: F.HEAT, dry: false });
    ctx.restore();
  };
  F.hawk = (ctx, x, y, s = 1, t = 0) => { // şahin (süzülen)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fl = Math.sin(t * 3) * 6;
    const w1 = [[-10, -4], [-70, -30 - fl], [-100, -20 - fl], [-60, 6], [-10, 8]], w2 = [[10, -4], [70, -30 - fl], [100, -20 - fl], [60, 6], [10, 8]];
    [w1, w2].forEach((w, i) => { F.shape(ctx, w, '#8A6A45', 0.6, 2430 + i); for (let k = 0; k < 3; k++) line(ctx, [(i ? 1 : -1) * (40 + k * 14), -14 - fl * 0.6], [(i ? 1 : -1) * (46 + k * 16), 2], { w: 1.2, dry: false, alpha: 0.6 }); });
    const b = [[-14, -10], [14, -10], [12, 30], [0, 44], [-12, 30]]; F.shape(ctx, b, '#C9A46A', 0.6, 2433);
    const hd = circlePts(0, -18, 13, 12, 16); P.fillPts(ctx, hd, '#C9A46A'); stroke(ctx, hd, { w: 2, closed: true, dry: false }); inkDot(ctx, -5, -20, 2.2); inkDot(ctx, 5, -20, 2.2);
    P.fillPts(ctx, [[-4, -12], [4, -12], [0, -2]], '#E3A03A');
    ctx.restore();
  };
  F.mouse = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y + 10 * s); ctx.scale(s, s);
    const b = circlePts(0, 0, 44, 26, 28); F.shape(ctx, b, '#9A9387', 0.6, 2440);
    const hd = [[34, -18], [70, 2], [34, 18]]; F.shape(ctx, hd, '#9A9387', 0.6, 2441);
    P.fillPts(ctx, circlePts(30, -26, 12, 12, 14), '#D9A7B0'); stroke(ctx, circlePts(30, -26, 12, 12, 14), { w: 1.8, closed: true, dry: false });
    inkDot(ctx, 50, -4, 2.4); inkDot(ctx, 70, 2, 2.6);
    stroke(ctx, P.bez([-42, 4], [-80, 30], [-96, -6], 12), { w: 2, dry: false });
    ctx.restore();
  };
  F.seeds = (ctx, x, y, s = 1) => { // başak
    ctx.save(); ctx.translate(x, y + 50 * s); ctx.scale(s, s);
    line(ctx, [0, 0], [4, -110], { w: 2.6, color: '#8A6A45', dry: false });
    for (let i = 0; i < 7; i++) [-1, 1].forEach(sd => { const g = circlePts(4 + sd * 9, -100 + i * 12, 6, 11, 12, sd * 0.5); P.fillPts(ctx, g, '#E3A03A', 0.85); stroke(ctx, g, { w: 1.2, closed: true, dry: false }); });
    ctx.restore();
  };
  F.sparrow = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x - 10 * s, y + 18 * s); ctx.scale(s * 1.4, s * 1.4);
    const b = [[-30, -6], [-10, -26], [16, -26], [26, -14], [16, 0], [-10, 2], [-30, -6]];
    P.fillPts(ctx, b, '#E8D6B4', 1); wash(ctx, b, '#8A6A45', 0.55, 751, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2, closed: true, seed: 752 });
    const hd = circlePts(22, -30, 13, 12, 18); P.fillPts(ctx, hd, '#C9A46A', 1); stroke(ctx, hd, { w: 1.8, closed: true, dry: false });
    P.fillPts(ctx, [[33, -32], [44, -28], [33, -25]], '#E3A03A'); inkDot(ctx, 25, -33, 2.2);
    stroke(ctx, [[-16, -14], [4, -22], [8, -8], [-10, -4]], { w: 1.6, seed: 753 });
    line(ctx, [-30, -6], [-46, 2], { w: 2.6, dry: false }); line(ctx, [0, 1], [-2, 14], { w: 1.4, dry: false }); line(ctx, [8, 0], [8, 14], { w: 1.4, dry: false });
    ctx.restore();
  };
  F.mushroom = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y + 40 * s); ctx.scale(s, s);
    const st = [[-12, 0], [12, 0], [9, -46], [-9, -46]]; F.shape(ctx, st, null, 0, 2450);
    const cap = P.arc(0, -44, 48, Math.PI, 2 * Math.PI, 24, 36).concat([[48, -44]]); F.shape(ctx, cap, '#B5553F', 0.6, 2451);
    [[-20, -62], [8, -70], [24, -54]].forEach(([dx, dy]) => P.fillPts(ctx, circlePts(dx, dy, 5, 4, 10), PAL.white));
    ctx.restore();
  };
  F.bacteria = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [[-30, -14, 0.4], [20, -24, -0.3], [0, 16, 0.9], [34, 18, 0.1], [-34, 22, -0.6]].forEach(([dx, dy, a], i) => {
      const c = circlePts(dx + Math.sin(t + i) * 2, dy, 16, 7, 18, a); P.fillPts(ctx, c, '#9CBB55', 0.8); stroke(ctx, c, { w: 1.6, closed: true, dry: false, seed: 2460 + i });
    });
    ctx.restore();
  };
  F.deadLeaf = (ctx, x, y, s = 1, rot = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    const lf = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; lf.push([Math.cos(a) * 34, Math.sin(a) * 16 * (1 - 0.3 * Math.cos(a))]); }
    F.shape(ctx, lf, '#A0703A', 0.6, 2470); line(ctx, [-34, 0], [34, 0], { w: 1.4, dry: false });
    ctx.restore();
  };
  F.algae = (ctx, x, y, s = 1, t = 0) => { // su yosunu / fitoplankton
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 7; i++) { const a = i * 0.9, r = 12 + (i % 3) * 14; const cx = Math.cos(a) * r, cy = Math.sin(a) * r * 0.8 + Math.sin(t + i) * 2; const c = circlePts(cx, cy, 7, 7, 12); P.fillPts(ctx, c, PAL.life, 0.75); stroke(ctx, c, { w: 1.2, closed: true, dry: false }); }
    ctx.restore();
  };
  F.fish = (ctx, x, y, s = 1, dir = 1, col = '#D98A2B', seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir * 1.6, s * 1.6);
    const b = [[36, 0], [16, -14], [-12, -12], [-26, 0], [-12, 12], [16, 14], [36, 0]];
    const tail = [[-24, 0], [-44, -14], [-40, 0], [-44, 14], [-24, 0]];
    P.fillPts(ctx, tail, col, 0.8); stroke(ctx, tail, { w: 1.6, closed: true, dry: false, seed: 740 + seed });
    P.fillPts(ctx, b, PAL.white, 1); wash(ctx, b, col, 0.6, 741 + seed, { bleed: 0.8, blooms: 0 }); stroke(ctx, b, { w: 2, closed: true, seed: 742 + seed });
    inkDot(ctx, 24, -3, 2.4);
    ctx.restore();
  };
  F.heron = (ctx, x, y, s = 1) => { // merkez ≈ gövde; ayaklar aşağıda
    ctx.save(); ctx.translate(x, y + 70 * s); ctx.scale(s * 0.8, s * 0.8);
    line(ctx, [-4, 0], [-2, -80], { w: 2.4, dry: false }); line(ctx, [8, 0], [6, -80], { w: 2.4, dry: false });
    const b = [[-40, -92], [-10, -118], [30, -112], [36, -88], [0, -78], [-40, -92]];
    P.fillPts(ctx, b, PAL.white, 1); wash(ctx, b, '#8F97A0', 0.55, 761, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 762 });
    const neck = P.bez([24, -110], [0, -150], [30, -176], 16); stroke(ctx, neck, { w: 7, color: '#8F97A0', dry: false }); stroke(ctx, neck, { w: 1.6, dry: false });
    const hd = circlePts(34, -180, 10, 8, 16); P.fillPts(ctx, hd, PAL.white); stroke(ctx, hd, { w: 1.8, closed: true, dry: false });
    line(ctx, [42, -180], [76, -172], { w: 3.4, color: '#C07F1E', dry: false }); inkDot(ctx, 34, -182, 2);
    ctx.restore();
  };
  // canlı kartı: (x,y) sol üst, w,h; draw(ctx, cx, cy)
  F.orgCard = (ctx, x, y, w, h, name, draw, seed, o = {}) => {
    F.card(ctx, x, y, w, h, seed, { tint: o.tint, tintA: 0.14, color: o.border });
    draw(ctx, x + w / 2, y + h * 0.44);
    F.fit(ctx, name, x + w / 2, y + h - 18, w - 16, o.size ?? 32);
  };
  F.ORG = {
    ot: ['ot', (c, x, y, t) => F.grass(c, x, y, 0.9, t)],
    cekirge: ['çekirge', (c, x, y, t) => F.hopper(c, x - 10, y, 0.85, t)],
    kurbaga: ['kurbağa', (c, x, y) => F.frog(c, x, y, 0.9)],
    yilan: ['yılan', (c, x, y, t) => F.snake(c, x - 10, y, 0.8, t)],
    sahin: ['şahin', (c, x, y, t) => F.hawk(c, x, y, 0.75, t)],
    mantar: ['mantar', (c, x, y) => F.mushroom(c, x, y, 0.9)],
    bakteri: ['bakteri', (c, x, y, t) => F.bacteria(c, x, y, 1, t)],
    fare: ['fare', (c, x, y) => F.mouse(c, x - 6, y, 0.85)],
    bugday: ['buğday', (c, x, y) => F.seeds(c, x, y, 0.85)],
    serce: ['serçe', (c, x, y, t) => F.sparrow(c, x, y, 0.85, t)]
  };
  G.F722 = F;
})(window);

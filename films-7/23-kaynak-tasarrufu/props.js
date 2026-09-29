// props.js — 7. sınıf Film 23 → window.F723
// Musluk + damla, lavabo, ölçü kabı, buzul, yer altı suyu, tişört, ekmek, buğday, pamuk, saksı çiçeği, leğen, yağ şişesi, arıtma tesisi, diş fırçası, bardak, anahtar, fatura.
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
  // ---------------- FİLM 23 (Kaynakların tasarruflu kullanımı) çizimleri ----------------
  const METAL = '#9A9387';
  F.dropPts = (x, y, r) => { const d = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; d.push([x + Math.sin(a) * r * Math.pow(Math.abs(Math.sin(a / 2)), 0.8) * 1.3, y - Math.cos(a) * r * 1.4]); } return d; };
  F.drop = (ctx, x, y, r, col = PAL.water, a = 0.75) => { const d = F.dropPts(x, y, r); P.fillPts(ctx, d, col, a); stroke(ctx, d, { w: Math.max(1.4, r * 0.12), closed: true, dry: false }); };
  // musluk: (x,y) ağız ucu; o.dripT damla fazı
  F.tap = (ctx, x, y, s, t, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.shape(ctx, [[-200, -80], [-40, -80], [-40, -40], [-200, -40]], METAL, 0.5, 3300);
    F.shape(ctx, [[-40, -80], [10, -80], [20, -60], [20, 0], [-20, 0], [-20, -40], [-40, -40]], METAL, 0.5, 3301);
    F.shape(ctx, [[-130, -120], [-100, -120], [-100, -80], [-130, -80]], METAL, 0.5, 3302);
    F.shape(ctx, [[-160, -134], [-70, -134], [-70, -118], [-160, -118]], F.HEAT, 0.4, 3303);
    ctx.restore();
    if (o.drip !== false) { const k = ((t * (o.rate ?? 0.9)) % 1); const dy = y + 12 * s + E.ease.in(k) * (o.fall ?? 200); if (k < 0.92) F.drop(ctx, x, dy, 9 * s * (0.6 + 0.4 * Math.min(1, k * 3))); }
  };
  F.sink = (ctx, x, y, w, s = 1) => { // lavabo üst kenarı ortası (x,y)
    const b = P.bez([x - w / 2, y], [x, y + 170 * s], [x + w / 2, y], 30).concat([[x - w / 2, y]]);
    F.shape(ctx, b, PAL.water, 0.12, 3310); stroke(ctx, [[x - w / 2 - 20, y], [x + w / 2 + 20, y]], { w: 6, seed: 3311 });
    P.fillPts(ctx, circlePts(x, y + 70 * s, 10, 5, 12), PAL.ink, 0.8);
  };
  // ölçü kabı: (x,y) taban ortası; level 0..1 (0..250 mL)
  F.cup = (ctx, x, y, s, level, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-60, -200], [60, -200], [52, 0], [-52, 0]];
    P.fillPts(ctx, closeP(b), PAL.white, 0.6);
    if (level > 0) { const h = 190 * level; const wl = [[-52 - 8 * level, -h], [52 + 8 * level, -h], [52, 0], [-52, 0]]; P.fillPts(ctx, closeP(wl), PAL.water, 0.45); line(ctx, [-54 - 8 * level, -h], [54 + 8 * level, -h], { w: 2, color: PAL.water, dry: false }); }
    for (let i = 1; i <= 5; i++) { const yy = -i * 38; line(ctx, [-58 + i * 1.6, yy], [-30, yy], { w: 1.6, dry: false }); if (i % 2 === 0 || o.all) F.fit(ctx, (i * 50) + '', -26, yy + 8, 60, 20, { align: 'left', weight: 400 }); }
    stroke(ctx, closeP(b), { w: 3, closed: true, seed: 3320 });
    F.fit(ctx, 'mL', 30, -12, 40, 20, { weight: 400 });
    ctx.restore();
  };
  F.glacier = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const g = [[-80, 30], [-50, -30], [-20, -10], [10, -60], [40, -20], [80, 30]]; F.shape(ctx, g, '#BFD6E2', 0.6, 3330);
    line(ctx, [10, -60], [0, 10], { w: 1.4, dry: false, alpha: 0.6 });
    ctx.restore();
  };
  F.ground = (ctx, x, y, s) => { // yer altı suyu kesiti
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const r = [[-80, -40], [80, -40], [80, 40], [-80, 40]]; F.shape(ctx, r, '#8A6A45', 0.45, 3340);
    const w = [[-80, 5], [80, 5], [80, 40], [-80, 40]]; P.fillPts(ctx, closeP(w), PAL.water, 0.45);
    for (let i = 0; i < 6; i++) inkDot(ctx, -60 + i * 24, -20 + (i % 2) * 8, 3, { color: '60,40,20', alpha: 0.6 });
    ctx.restore();
  };
  F.tshirt = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-30, -60], [-70, -40], [-90, 0], [-60, 10], [-50, -10], [-50, 70], [50, 70], [50, -10], [60, 10], [90, 0], [70, -40], [30, -60], [15, -45], [-15, -45]];
    F.shape(ctx, b, PAL.water, 0.4, 3350);
    ctx.restore();
  };
  F.bread = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = P.arc(0, 10, 90, Math.PI, 2 * Math.PI, 24, 60).concat([[90, 30], [-90, 30]]); F.shape(ctx, b, '#D9A45A', 0.6, 3360);
    [-40, 0, 40].forEach(dx => stroke(ctx, [[dx - 14, -20], [dx + 14, -34]], { w: 2, dry: false }));
    ctx.restore();
  };
  F.wheatField = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 5; i++) { const dx = (i - 2) * 20; line(ctx, [dx, 40], [dx + 2, -30], { w: 2, color: '#8A6A45', dry: false }); P.fillPts(ctx, circlePts(dx + 2, -42, 6, 14, 12), '#E3A03A', 0.9); } ctx.restore(); };
  F.cotton = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, [0, 40], [0, -10], { w: 2.4, color: LEAF2, dry: false }); [[-16, -20], [14, -24], [0, -40]].forEach(([dx, dy]) => { P.fillPts(ctx, circlePts(dx, dy, 14, 12, 14), PAL.white); stroke(ctx, circlePts(dx, dy, 14, 12, 14), { w: 1.6, closed: true, dry: false }); }); ctx.restore(); };
  const LEAF2 = '#4E6B2A';
  F.plant = (ctx, x, y, s, t = 0) => { // saksıda çiçek
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pot = [[-40, 0], [40, 0], [30, 60], [-30, 60]]; F.shape(ctx, pot, F.HEAT, 0.5, 3370);
    line(ctx, [0, 0], [Math.sin(t) * 3, -80], { w: 3, color: LEAF2 });
    [[-18, -40, -0.6], [18, -30, 0.6]].forEach(([dx, dy, a]) => { const l = circlePts(dx, dy, 18, 8, 14, a); P.fillPts(ctx, l, PAL.life, 0.8); stroke(ctx, l, { w: 1.4, closed: true, dry: false }); });
    for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; const p = circlePts(Math.cos(a) * 12, -80 + Math.sin(a) * 12, 10, 7, 12, a); P.fillPts(ctx, p, '#D9A7B0', 0.9); stroke(ctx, p, { w: 1.2, closed: true, dry: false }); }
    P.fillPts(ctx, circlePts(0, -80, 7, 7, 10), '#E3A03A');
    ctx.restore();
  };
  F.basin = (ctx, x, y, s, level = 0.5) => { // leğen (yıkama suyu)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, -40], [80, -40], [60, 20], [-60, 20]]; F.shape(ctx, b, METAL, 0.3, 3380);
    P.fillPts(ctx, closeP([[-76, -40 + 50 * (1 - level)], [76, -40 + 50 * (1 - level)], [60, 18], [-60, 18]]), PAL.water, 0.4);
    ctx.restore();
  };
  F.oilBottle = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-24, 60], [24, 60], [24, -20], [10, -40], [10, -60], [-10, -60], [-10, -40], [-24, -20]]; F.shape(ctx, b, '#E3C04A', 0.55, 3390);
    F.fit(ctx, 'yağ', 0, 26, 44, 20);
    ctx.restore();
  };
  F.plant2 = F.plant;
  F.treatment = (ctx, x, y, s, t) => { // arıtma tesisi: iki havuz + bina
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bld = [[-40, 0], [-40, -90], [40, -90], [40, 0]]; F.shape(ctx, bld, METAL, 0.35, 3400);
    [[-150, 0], [110, 0]].forEach(([cx], i) => { const p = circlePts(cx, -10, 70, 22, 30); P.fillPts(ctx, p, i ? PAL.water : '#8A7A5A', 0.5); stroke(ctx, p, { w: 2.4, closed: true, seed: 3401 + i }); });
    const a = t * 1.5; line(ctx, [-150, -10], [-150 + Math.cos(a) * 60, -10 + Math.sin(a) * 18], { w: 2.4, dry: false });
    ctx.restore();
  };
  F.brush = (ctx, x, y, s, rot = -0.4) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); F.shape(ctx, [[-70, -8], [50, -8], [50, 8], [-70, 8]], PAL.water, 0.5, 3410); for (let i = 0; i < 6; i++) line(ctx, [20 + i * 6, -8], [20 + i * 6, -24], { w: 2, dry: false }); ctx.restore(); };
  F.glass = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = [[-30, -70], [30, -70], [24, 0], [-24, 0]]; P.fillPts(ctx, closeP([[-27, -35], [27, -35], [24, 0], [-24, 0]]), PAL.water, 0.4); stroke(ctx, closeP(g), { w: 2.6, closed: true, seed: 3420 }); ctx.restore(); };
  F.wrench = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.6); ctx.scale(s, s); line(ctx, [-60, 0], [40, 0], { w: 14, color: METAL, taper: 0 }); const h = P.arc(56, 0, 22, 0.8, 5.5, 20); stroke(ctx, h, { w: 12, color: METAL }); stroke(ctx, h, { w: 2, dry: false }); ctx.restore(); };
  F.bill = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.rotate(0.05); ctx.scale(s, s); const b = [[-60, -80], [60, -80], [60, 80], [-60, 80]]; F.shape(ctx, b, null, 0, 3430); F.fit(ctx, 'SU FATURASI', 0, -50, 110, 20, { color: PAL.water }); for (let i = 0; i < 5; i++) line(ctx, [-44, -20 + i * 20], [44 - (i % 2) * 20, -20 + i * 20], { w: 1.6, dry: false, alpha: 0.6 }); ctx.restore(); };
  G.F723 = F;
})(window);

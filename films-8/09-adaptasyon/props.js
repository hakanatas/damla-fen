// props.js — 8. sınıf Film 09 → window.F809
// Çöl tilkisi, kutup tilkisi, kutup ayısı, boz ayı, kaktüs, deve, tavşan, şahin; çöl ve kar arka planları.
// Ortak taban (rr / shape / fit / wfit / card / stamp / title / endCard / notebookPage / taskCard / table) 7. sınıf F722'den uyarlanmıştır.
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
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, extra ? 565 : 610, { size: 32, align: 'center', alpha: 0.7 });
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
  // ---------------- FİLM 8.09 (Adaptasyon) çizimleri — hepsi AYAK NOKTASI (x,y), sağa bakar; o.flip sola ----------------
  F.SAND = '#D9B272'; F.SNOW = '#9DB7C9'; F.BROWN = '#7A5230';
  const legs = (ctx, xs, y0, y1, w, seed) => xs.forEach((x, i) => line(ctx, [x, y0], [x + (i % 2 ? 3 : -3), y1], { w, seed: seed + i, taper: 0.1 }));
  // tilki: kind 'desert' (çöl tilkisi / fenek) | 'arctic' (kutup tilkisi)
  F.fox = (ctx, x, y, s = 1, kind = 'desert', o = {}) => {
    const d = kind === 'desert', col = d ? F.SAND : '#EDE8DD', base = PAL.white;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    const sw = Math.sin((o.t ?? 0) * 2) * 5;
    const tail = d ? P.bez([-70, -70], [-150, -60 + sw], [-160, -20 + sw], 14).concat(P.bez([-160, -20 + sw], [-120, -30], [-70, -52], 12))
                   : P.bez([-70, -76], [-170, -80 + sw], [-175, -20 + sw], 14).concat(P.bez([-175, -20 + sw], [-120, -20], [-70, -46], 12));
    F.shape(ctx, tail, col, d ? 0.55 : 0.25, 5000, { base });
    if (d) P.fillPts(ctx, circlePts(-156, -24 + sw, 10, 9, 12), PAL.ink, 0.8);
    legs(ctx, [-50, -30, 40, 58], -40, 0, d ? 5 : 8, 5010);
    const bd = wobble(circlePts(0, -70, d ? 78 : 84, d ? 36 : 46, 40), 2, 5020);
    F.shape(ctx, bd, col, d ? 0.55 : 0.25, 5021, { base });
    // baş + burun
    const hd = wobble(circlePts(88, -106, d ? 30 : 36, d ? 28 : 32, 30), 1.2, 5030);
    const ear = d ? [[[64, -126], [52, -222], [92, -132]], [[92, -130], [110, -220], [116, -120]]]
                  : [[[70, -130], [72, -158], [90, -136]], [[96, -134], [108, -160], [114, -128]]];
    ear.forEach((e, i) => { F.shape(ctx, e, col, d ? 0.55 : 0.25, 5040 + i, { base }); if (d) P.fillPts(ctx, [[e[0][0] + 8, e[0][1] - 6], [e[1][0], e[1][1] + 26], [e[2][0] - 6, e[2][1] - 4]], '#E8B8A0', 0.6); });
    const sn = d ? [[108, -118], [150, -100], [108, -90]] : [[112, -114], [140, -102], [112, -92]];
    F.shape(ctx, sn, col, d ? 0.55 : 0.25, 5050, { base });
    F.shape(ctx, hd, col, d ? 0.55 : 0.25, 5051, { base });
    P.fillPts(ctx, circlePts(d ? 150 : 140, -101, 5, 4, 10), PAL.ink, 1);
    P.fillPts(ctx, circlePts(96, -112, 5, 5, 10), PAL.ink, 1); P.fillPts(ctx, circlePts(95, -114, 1.6, 1.6, 6), PAL.white, 1);
    ctx.restore();
  };
  // ayı: kind 'polar' | 'brown'
  F.bear = (ctx, x, y, s = 1, kind = 'polar', o = {}) => {
    const p = kind === 'polar', col = p ? '#F2ECDD' : F.BROWN, a = p ? 0.35 : 0.6;
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    [[-80, 0], [-44, 0], [60, 0], [96, 0]].forEach(([lx], i) => F.shape(ctx, [[lx - 20, -70], [lx + 20, -70], [lx + 22, 0], [lx - 24, 0]], col, a, 5100 + i));
    const bd = wobble(circlePts(0, -100, 130, 70, 44), 3, 5110); F.shape(ctx, bd, col, a, 5111);
    if (!p) F.shape(ctx, P.arc(-10, -150, 60, Math.PI * 1.1, Math.PI * 1.9, 14, 34), col, 0.7, 5112); // omuz tümseği
    F.shape(ctx, circlePts(118, -168, 16, 15, 16), col, a, 5113); F.shape(ctx, circlePts(158, -168, 16, 15, 16), col, a, 5114);
    const hd = wobble(circlePts(140, -130, 50, 42, 34), 1.5, 5115); F.shape(ctx, hd, col, a, 5116);
    F.shape(ctx, circlePts(180, -118, 24, 18, 20), p ? '#F2ECDD' : '#A27A50', 0.5, 5117);
    P.fillPts(ctx, circlePts(198, -122, 7, 6, 12), PAL.ink, 1);
    P.fillPts(ctx, circlePts(150, -140, 5, 5, 10), PAL.ink, 1);
    ctx.restore();
  };
  F.cactus = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.shape(ctx, [[-26, 0], [-28, -170], [-14, -196], [14, -196], [28, -170], [26, 0]], PAL.life, 0.6, 5200);
    F.shape(ctx, [[26, -80], [70, -84], [72, -140], [54, -146], [52, -104], [26, -104]], PAL.life, 0.6, 5201);
    F.shape(ctx, [[-26, -60], [-64, -64], [-66, -118], [-50, -122], [-48, -84], [-26, -84]], PAL.life, 0.6, 5202);
    for (let i = 0; i < 10; i++) { const yy = -20 - i * 17; line(ctx, [-26, yy], [-36, yy - 5], { w: 1.6, dry: false }); line(ctx, [26, yy], [36, yy - 5], { w: 1.6, dry: false }); }
    for (let i = 0; i < 4; i++) line(ctx, [-8 + i * 6, -40], [-8 + i * 6, -180], { w: 1, alpha: 0.4, dry: false });
    ctx.restore();
  };
  // tek hörgüçlü deve
  F.camel = (ctx, x, y, s = 1, o = {}) => {
    const col = '#C9A06A';
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    [[-70], [-46], [52], [76]].forEach(([lx], i) => { line(ctx, [lx, -130], [lx + (i % 2 ? 4 : -4), -8], { w: 11, seed: 5300 + i, taper: 0.05, color: '#7A5A30' }); F.shape(ctx, circlePts(lx + (i % 2 ? 4 : -4), -4, 14, 6, 12), col, 0.5, 5310 + i); });
    const bd = P.bez([-110, -150], [-100, -210], [-40, -200], 12).concat(P.bez([-40, -200], [0, -290], [40, -200], 16)).concat(P.bez([40, -200], [100, -200], [110, -150], 12)).concat(P.bez([110, -150], [0, -100], [-110, -150], 16));
    F.shape(ctx, bd, col, 0.55, 5320);
    const nk = P.bez([90, -180], [150, -200], [150, -280], 14).concat([[182, -292], [206, -270], [190, -254], [168, -250]]).concat(P.bez([168, -250], [150, -190], [110, -150], 12));
    F.shape(ctx, nk, col, 0.55, 5330);
    P.fillPts(ctx, circlePts(178, -276, 4.5, 4, 10), PAL.ink, 1);
    for (let i = 0; i < 4; i++) line(ctx, [172 + i * 3, -282], [168 + i * 5, -292], { w: 1.4, dry: false });
    ctx.restore();
  };
  // tavşan (oturan) — col: kürk
  F.hare = (ctx, x, y, s = 1, col = '#F6F2E8', o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    const light = o.light ?? true, a = light ? 0.2 : 0.7;
    F.shape(ctx, wobble(circlePts(0, -40, 44, 38, 30), 1.5, 5400), col, a, 5401);
    F.shape(ctx, circlePts(-44, -44, 12, 12, 14), '#FBF8F1', 0.3, 5402);
    F.shape(ctx, [[30, -76], [22, -140], [38, -142], [46, -80]], col, a, 5403);
    F.shape(ctx, [[42, -74], [48, -136], [62, -132], [54, -72]], col, a, 5404);
    F.shape(ctx, wobble(circlePts(44, -66, 24, 20, 24), 1, 5405), col, a, 5406);
    P.fillPts(ctx, circlePts(52, -70, 3.6, 3.6, 8), PAL.ink, 1);
    ctx.restore();
  };
  // şahin silueti (süzülen) — merkez
  F.hawk = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const f = Math.sin(t * 2) * 8;
    const w = [[-120, -10 + f], [-40, -18], [-14, -8], [14, -8], [40, -18], [120, -10 + f], [40, 4], [10, 10], [0, 36], [-10, 10], [-40, 4]];
    F.shape(ctx, w, '#6A4A30', 0.7, 5500);
    ctx.restore();
  };
  F.dense = (pts, step = 4) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const [a, b] = [pts[i - 1], pts[i]]; const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) o.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]); } return o; };
  // arka planlar
  F.desertBg = (ctx, t, x0 = -200, x1 = E.W + 200, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.28)'); g.addColorStop(1, 'rgba(227,160,58,0.06)');
    ctx.fillStyle = g; ctx.fillRect(x0, -200, x1 - x0, E.H + 400);
    const dune = []; for (let i = 0; i <= 60; i++) { const x = x0 + i / 60 * (x1 - x0); dune.push([x, (o.base ?? 820) - Math.sin(i / 60 * 5 + 1) * 34]); }
    const df = dune.concat([[x1, E.H + 200], [x0, E.H + 200]]); P.fillPts(ctx, df, PAL.paper); wash(ctx, df, '#E3C98A', 0.55, 5600, { bleed: 3 }); stroke(ctx, dune, { w: 3.4, seed: 5601 });
    return dune;
  };
  F.snowBg = (ctx, t, x0 = -200, x1 = E.W + 200, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.24)'); g.addColorStop(1, 'rgba(46,106,140,0.05)');
    ctx.fillStyle = g; ctx.fillRect(x0, -200, x1 - x0, E.H + 400);
    const R = rng(5610);
    for (let i = 0; i < 40; i++) { const sx = x0 + R() * (x1 - x0), sy = ((R() * E.H + t * (30 + R() * 30)) % 900); P.fillPts(ctx, circlePts(sx, sy, 3, 3, 8), PAL.white, 0.9); }
    const sl = []; for (let i = 0; i <= 60; i++) { const x = x0 + i / 60 * (x1 - x0); sl.push([x, (o.base ?? 820) - Math.sin(i / 60 * 4 + 2) * 26]); }
    const sf = sl.concat([[x1, E.H + 200], [x0, E.H + 200]]); P.fillPts(ctx, sf, '#FBF8F1'); wash(ctx, sf, F.SNOW, 0.22, 5620, { bleed: 3 }); stroke(ctx, sl, { w: 3.4, seed: 5621 });
    return sl;
  };
  G.F809 = F;
})(window);

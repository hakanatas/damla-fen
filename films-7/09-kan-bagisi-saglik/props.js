// props.js — Film 7/09 · ortak KIT (6/09'dan kopya, 7. sınıf) + filme özel çizimler (F09)
// KIT: kart, düğüm, konuşma balonu, giyinik çocuk büstü, başlık / bitiş kartı, metin sığdırma.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, noiseFn } = G.INK;
  const K = {};
  K.RED = '#A23A2A'; K.LIFE = PAL.life; K.LIFE_D = '#4E6628'; K.AMBER_D = '#C07F1E'; K.CARD = '#FAF6EC';
  K.rrect = (cx, cy, w, h, r, n = 8) => {
    const p = [], hw = w / 2 - r, hh = h / 2 - r;
    [[hw, hh, 0], [-hw, hh, Math.PI / 2], [-hw, -hh, Math.PI], [hw, -hh, Math.PI * 1.5]].forEach(([x, y, a0]) => {
      for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; p.push([cx + x + Math.cos(a) * r, cy + y + Math.sin(a) * r]); }
    });
    p.push(p[0]); return p;
  };
  K.blob = (cx, cy, rx, ry, seed, amp = 0.08, n = 70) => { const nz = noiseFn(seed); const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const k = 1 + nz(a * 1.6) * amp; p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); } p[n] = p[0]; return p; };
  K.font = (ctx, size, weight = 700, fam = 'Kalam') => { ctx.font = `${weight} ${size}px ${fam}`; };
  K.fit = (ctx, txt, maxW, size, weight = 700, fam = 'Kalam') => { let s = size; K.font(ctx, s, weight, fam); while (s > 20 && ctx.measureText(txt).width > maxW) { s -= 1; K.font(ctx, s, weight, fam); } return s; };
  K.wrap = (ctx, txt, maxW, size, weight = 700) => { K.font(ctx, size, weight); const out = []; let cur = ''; txt.split(' ').forEach(w => { const tr = (cur + ' ' + w).trim(); if (ctx.measureText(tr).width > maxW && cur) { out.push(cur); cur = w; } else cur = tr; }); out.push(cur); return out; };
  // plain text (with optional auto-fit); o: size, weight, color, align, alpha, maxW, rot, fam
  K.text = (ctx, txt, x, y, o = {}) => {
    const A0 = ctx.globalAlpha; ctx.save();
    let s = o.size ?? 36; if (o.maxW) s = K.fit(ctx, txt, o.maxW, s, o.weight ?? 700, o.fam ?? 'Kalam'); else K.font(ctx, s, o.weight ?? 700, o.fam ?? 'Kalam');
    ctx.textAlign = o.align ?? 'left'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha = A0 * (o.alpha ?? 0.94);
    ctx.translate(x, y); ctx.rotate(o.rot ?? -0.01); ctx.fillText(txt, 0, 0); ctx.restore();
  };
  // paper card (top-left x,y)
  K.card = (ctx, x, y, w, h, o = {}) => {
    const pg = wobble(K.rrect(x + w / 2, y + h / 2, w, h, o.r ?? 18, 6), 1.2, o.seed ?? 4100);
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, pg, o.fill ?? K.CARD, 1); ctx.restore();
    if (o.tint) wash(ctx, pg, o.tint, o.tintA ?? 0.18, (o.seed ?? 4100) + 1, { bleed: 1.5, blooms: 1 });
    stroke(ctx, pg, { w: o.w ?? 2.6, closed: true, seed: (o.seed ?? 4100) + 2, color: o.line ?? PAL.ink });
    return pg;
  };
  // centered box node with text; k: pop 0..1
  K.node = (ctx, txt, x, y, k, o = {}) => {
    if (k <= 0) return 0; const size = o.size ?? 38;
    ctx.save(); K.font(ctx, size); const lines = Array.isArray(txt) ? txt : [txt]; const tw = Math.max(...lines.map(l => ctx.measureText(l).width)); ctx.restore();
    const w = o.w ?? tw + 44, h = o.h ?? size * (0.5 + lines.length * 1.1);
    ctx.save(); ctx.translate(x, y); const s = o.nopop ? 1 : P.pop(k); ctx.scale(s, s);
    const b = wobble(K.rrect(0, 0, w, h, 16, 6), 1.1, 4200 + (o.seed ?? lines[0].length));
    P.fillPts(ctx, b, o.fill ?? '#FBF8F1'); if (o.tint) wash(ctx, b, o.tint, o.tintA ?? 0.32, 4210 + (o.seed ?? 0), { bleed: 1, blooms: 0 });
    stroke(ctx, b, { w: o.lw ?? 2.6, closed: true, seed: 4220 + (o.seed ?? 0), color: o.line ?? PAL.ink });
    K.font(ctx, size); ctx.textAlign = 'center'; ctx.fillStyle = o.color ?? PAL.ink;
    const y0 = -(lines.length - 1) * size * 0.55 + size * 0.36;
    lines.forEach((l, i) => ctx.fillText(l, 0, y0 + i * size * 1.1));
    ctx.restore(); return w;
  };
  // speech bubble (rounded rect + tail); lines of text inside
  K.say = (ctx, lines, x, y, w, h, tail, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = wobble(K.rrect(0, 0, w, h, 26, 8), 1.2, 4300 + (o.seed ?? 0));
    const tl = [[-w * 0.12, h / 2 - 4], [(tail[0] - x) / s, (tail[1] - y) / s], [w * 0.06, h / 2 - 4]];
    P.fillPts(ctx, tl, o.fill ?? '#FBF8F1'); P.fillPts(ctx, b, o.fill ?? '#FBF8F1');
    stroke(ctx, b, { w: 2.6, closed: true, seed: 4310 + (o.seed ?? 0) });
    stroke(ctx, [tl[0], tl[1], tl[2]], { w: 2.4, seed: 4320 + (o.seed ?? 0), dry: false });
    const size = o.size ?? 36; K.font(ctx, size); ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink;
    const y0 = -(lines.length - 1) * size * 0.58 + size * 0.34;
    lines.forEach((l, i) => ctx.fillText(l, 0, y0 + i * size * 1.16));
    ctx.restore();
  };
  // clothed child bust (head + shoulders, T-shirt). o: shirt, hair('short'|'long'|'bun'|'curly'), skin, expr('smile'|'think'|'o')
  K.kid = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const skin = o.skin ?? '#F0D5BC', hairC = o.hairC ?? '#3B2A20', shirt = o.shirt ?? PAL.water;
    const body = P.bez([-110, 150], [-105, 40], [-40, 30], 12).concat([[40, 30]], P.bez([40, 30], [105, 40], [110, 150], 12)); body.push([-110, 150]);
    P.fillPts(ctx, body, PAL.white); wash(ctx, body, shirt, 0.55, 4400 + (o.seed ?? 0), { bleed: 1.2, blooms: 1 }); stroke(ctx, body, { w: 3, closed: true, seed: 4401 });
    stroke(ctx, P.bez([-26, 30], [0, 56], [26, 30], 10), { w: 2.4, seed: 4402, dry: false });
    const neck = [[-18, 0], [18, 0], [20, 34], [-20, 34]]; P.fillPts(ctx, neck, skin);
    if (o.hair === 'long') { [-1, 1].forEach(sd => P.fillPts(ctx, [[sd * 50, -96], [sd * 74, -70], [sd * 80, 26], [sd * 46, 26], [sd * 50, -60]], hairC, 0.92)); }
    const head = K.blob(0, -58, 58, 64, 4420 + (o.seed ?? 0), 0.03); P.fillPts(ctx, head, skin); stroke(ctx, head, { w: 3, closed: true, seed: 4421 });
    // hair cap
    const cap = P.arc(0, -62, 62, Math.PI * 1.02, Math.PI * 1.98, 20, 66).concat(P.bez([60, -70], [10, -92], [-60, -66], 10));
    P.fillPts(ctx, cap, hairC, 0.95);
    if (o.hair === 'bun') { const bn = circlePts(0, -130, 24, 20, 20); P.fillPts(ctx, bn, hairC); }
    if (o.hair === 'curly') for (let i = 0; i < 7; i++) { const a = Math.PI * (1.05 + i * 0.15); P.fillPts(ctx, circlePts(Math.cos(a) * 58, -62 + Math.sin(a) * 64, 16, 16, 12), hairC); }
    // face
    const ex = o.expr ?? 'smile';
    [-22, 22].forEach(dx => { ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(dx, -58, 5.5, 7, 0, 0, 7); ctx.fill(); ctx.restore(); });
    if (ex === 'smile') stroke(ctx, P.arc(0, -40, 18, 0.25, Math.PI - 0.25, 12), { w: 2.8, dry: false, seed: 4430 });
    else if (ex === 'o') stroke(ctx, circlePts(0, -30, 7, 9, 14), { w: 2.6, closed: true, dry: false });
    else line(ctx, [-12, -30], [12, -34], { w: 2.8, dry: false });
    if (ex === 'think') line(ctx, [8, -76], [30, -80], { w: 2.6, dry: false });
    ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#D9826C'; ctx.beginPath(); ctx.ellipse(-36, -38, 10, 6, 0, 0, 7); ctx.ellipse(36, -38, 10, 6, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.restore();
  };
  K.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ view: 'q3', expr: 'curious', blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, seed: 1 }, o));
  K.alpha = (t, a0, a1, b0, b1, d = 0.6) => Math.min(E.se(t, a0, a0 + d), 1 - E.se(t, b0 - d * 0.7, b0)); // fade in at a0, out ending at b0
  // title card (drawn over first scene)
  K.title = (ctx, t, num, title, unit) => {
    const t1 = E.e('title') + 1.4;
    if (t > t1) return;
    const bk = Math.min(E.se(t, 0.2, 0.9), 1 - E.se(t, t1 - 1.0, t1));
    if (bk > 0) { ctx.save(); ctx.globalAlpha = 0.72 * bk; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 120, E.W, 300); ctx.restore(); }
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + title, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 7. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  // end card (layer fades in at beat 'end')
  K.end = (ctx, t, num, title, codes) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      K.text(c, num + ' · ' + title, 960, 515, { size: 56, align: 'center', maxW: 1700 });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 900, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // "Sıra sende" + "Sıradaki" scene body (shared layout). o: {task:[lines], nextTitle, icon(ctx,x,y,t)}
  K.outro = (ctx, t, o) => {
    const st = E.s('task'), sn = E.s('next');
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.10)'); g.addColorStop(1, 'rgba(227,160,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, st, st + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      K.card(c, 250, 170, 1230, 560, { seed: 4600, tint: PAL.life, tintA: 0.1 });
      P.write(c, 'Sıra sende!', 320, 280, E.seg(t, st + 0.3, st + 1.2), { size: 76, color: K.LIFE_D });
      o.task.forEach((l, i) => P.write(c, l, 320, 390 + i * 76, E.seg(t, st + 1.0 + i * 0.9, st + 2.2 + i * 0.9), { size: 50 }));
      if (o.taskNote) INK.label(c, o.taskNote, 320, 390 + o.task.length * 76 + 20, { size: 32, alpha: 0.65 * E.se(t, st + 3, st + 4) });
    });
    const nk = E.se(t, sn, sn + 0.8, 'out');
    if (nk > 0) E.layer(ctx, nk, c => {
      E.inkText(c, 'Sıradaki gözlem:', 960, 240, t, sn + 0.3, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(c, o.nextTitle, 960, 330, t, sn + 0.8, 1e9, { size: 66, align: 'center' });
      if (o.icon) o.icon(c, t);
    });
    K.damla(ctx, t, { x: 1640, y: 900, s: 1.2, flip: true, expr: t > sn ? 'happy' : 'curious', look: [-0.6, -0.2], arms: [[-1, 0.4], [1, t > sn ? 2.4 + 0.3 * Math.sin(t * 7) : 0.5]] });
  };
  G.KIT = K;
})(window);

// ---------------- F09: altı şapka, kan torbası, hastane, Kızılay hilali, sade kalp ve akciğer ----------------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot } = G.INK;
  const K = G.KIT, F = {};
  F.SKIN = '#F1E4D2'; F.BLOOD = '#B8453A'; F.CRES = '#D23B30';
  const cr = (pts, n = 8) => {
    const out = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
    out.push(pts[pts.length - 1]); return out; };
  const closed = (pts, n) => { const c = cr(pts.concat([pts[0], pts[1]]), n); return c.slice(n, c.length - n + 1); };
  F.cr = cr; F.closed = closed;
  // altı şapka renkleri (kırmızı şapka, güvenlik kırmızısından ayrı bir tondur)
  F.HATS = [['white', 'Beyaz', '#FBF8F1'], ['red', 'Kırmızı', '#C4625A'], ['black', 'Siyah', '#2A2830'], ['yellow', 'Sarı', '#E8C04A'], ['green', 'Yeşil', '#6F8A3A'], ['blue', 'Mavi', '#3E6FA8']];
  F.hat = (ctx, x, y, s, col, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (o.glow) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.9)'; ctx.shadowBlur = 30; P.fillPts(ctx, circlePts(0, 10, 90, 22, 30), col); ctx.restore(); }
    const brim = circlePts(0, 10, 90, 22, 40); P.fillPts(ctx, brim, col); stroke(ctx, brim, { w: 3, closed: true, seed: 9001 });
    const crown = closed([[-52, 8], [-56, -40], [-40, -70], [0, -78], [40, -70], [56, -40], [52, 8]], 5); P.fillPts(ctx, crown, col); wash(ctx, crown, col === '#FBF8F1' ? '#C9C2B0' : PAL.ink, 0.12, 9002, { bleed: 1, blooms: 0 }); stroke(ctx, crown, { w: 3, seed: 9003 });
    const band = [[-54, -6], [54, -6], [53, 8], [-53, 8]]; P.fillPts(ctx, band, PAL.ink, col === '#2A2830' ? 0.0 : 0.55); if (col === '#2A2830') P.fillPts(ctx, band, '#6A6870', 0.9);
    ctx.restore(); };
  // kan torbası (fill 0..1)
  F.bag = (ctx, x, y, s, fill = 1, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = closed([[-70, -100], [70, -100], [80, -60], [80, 90], [60, 115], [-60, 115], [-80, 90], [-80, -60]], 5);
    P.fillPts(ctx, b, '#F7F2EA');
    if (fill > 0) { ctx.save(); P.path(ctx, b); ctx.clip(); const lv = E.lerp(118, -95, fill); ctx.fillStyle = '#9E2F26'; ctx.globalAlpha *= 0.85; ctx.fillRect(-90, lv, 180, 240); ctx.restore(); }
    stroke(ctx, b, { w: 3, closed: true, seed: 9010 });
    const lab = K.rrect(0, 20, 90, 60, 8); P.fillPts(ctx, lab, '#FBF8F1', 0.95); stroke(ctx, lab, { w: 2, closed: true, dry: false });
    line(ctx, [-30, 8], [30, 8], { w: 2, dry: false, alpha: 0.6 }); line(ctx, [-30, 30], [18, 30], { w: 2, dry: false, alpha: 0.6 });
    stroke(ctx, [[0, -100], [0, -140]], { w: 5, dry: false }); stroke(ctx, circlePts(0, -150, 12, 12, 16), { w: 3, closed: true, dry: false });
    stroke(ctx, cr([[40, 115], [50, 160], [30, 200]], 8), { w: 4, dry: false, color: '#9E2F26', alpha: fill > 0 ? 0.8 : 0.3 });
    ctx.restore(); };
  F.hospital = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bd = [[-150, 120], [-150, -110], [150, -110], [150, 120], [-150, 120]]; P.fillPts(ctx, bd, '#FBF8F1'); wash(ctx, bd, PAL.water, 0.12, 9020, { bleed: 1, blooms: 0 }); stroke(ctx, bd, { w: 3, closed: true, seed: 9021 });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { if (r === 2 && (c === 1 || c === 2)) continue; const w = [[-120 + c * 66, -80 + r * 64], [-80 + c * 66, -80 + r * 64], [-80 + c * 66, -44 + r * 64], [-120 + c * 66, -44 + r * 64]]; P.fillPts(ctx, w, PAL.water, 0.35); stroke(ctx, w.concat([w[0]]), { w: 1.6, closed: true, dry: false }); }
    const door = [[-30, 120], [-30, 60], [30, 60], [30, 120]]; stroke(ctx, door, { w: 2.4 });
    const sg = K.rrect(0, -150, 80, 70, 10); P.fillPts(ctx, sg, PAL.water, 0.9); stroke(ctx, sg, { w: 2.6, closed: true, dry: false });
    ctx.font = '700 52px Kalam'; ctx.fillStyle = '#FBF8F1'; ctx.textAlign = 'center'; ctx.fillText('H', 0, -130);
    ctx.restore(); };
  F.factory = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const f = [[-110, 70], [-110, -10], [-50, -50], [-50, -10], [10, -50], [10, -10], [70, -50], [70, -110], [100, -110], [100, 70], [-110, 70]]; P.fillPts(ctx, f, PAL.paperDeep); stroke(ctx, f, { w: 3, closed: true, seed: 9030 });
    ctx.restore(); };
  // Türk Kızılay amblemi: kırmızı hilal (sade)
  F.crescent = (ctx, x, y, r) => { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.arc(x + r * 0.32, y, r * 0.8, 0, 7, true); ctx.fillStyle = F.CRES; ctx.fill('evenodd'); ctx.restore();
    stroke(ctx, circlePts(x, y, r, r, 50), { w: 2, alpha: 0.4, closed: true, dry: false }); };
  F.van = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-130, 40], [-130, -60], [60, -60], [100, -20], [130, 0], [130, 40], [-130, 40]]; P.fillPts(ctx, b, '#FBF8F1'); stroke(ctx, b, { w: 3, closed: true, seed: 9040 });
    const win = [[64, -52], [96, -20], [64, -20]]; P.fillPts(ctx, win, PAL.water, 0.4); F.crescent(ctx, -30, -12, 26);
    [-80, 80].forEach(wx => { P.fillPts(ctx, circlePts(wx, 44, 22, 22, 20), PAL.ink); P.fillPts(ctx, circlePts(wx, 44, 8, 8, 12), '#AAA'); });
    ctx.restore(); };
  F.HEARTP = closed([[-46, -52], [-10, -62], [30, -58], [58, -30], [62, 8], [44, 44], [18, 70], [-12, 60], [-44, 30], [-60, -8]], 7);
  F.heart = (ctx, x, y, s, o = {}) => { const b = 1 - 0.07 * (o.beat ?? 0); ctx.save(); ctx.translate(x, y); ctx.rotate(-0.3); ctx.scale(s * b, s * b);
    P.fillPts(ctx, F.HEARTP, '#F0CFC6'); wash(ctx, F.HEARTP, '#B8574A', 0.65, 9050, { bleed: 1.2, blooms: 1 }); stroke(ctx, F.HEARTP, { w: 3 / s + 0.8, closed: true, color: '#6E2A22', seed: 9051 }); ctx.restore(); };
  F.lung = (ctx, x, y, s, side) => { ctx.save(); ctx.translate(x, y); ctx.scale(s * side, s);
    const L = closed([[0, -90], [26, -70], [40, -20], [46, 50], [30, 88], [-10, 92], [-30, 60], [-20, 10], [-12, -40]], 6);
    P.fillPts(ctx, L, '#F4DCD6'); wash(ctx, L, '#D98C9A', 0.4, 9060, { bleed: 1, blooms: 0 }); stroke(ctx, L, { w: 2.4 / s, closed: true, color: '#8A5A62', seed: 9061 }); ctx.restore(); };
  // küçük insan figürü (dayanışma zinciri)
  F.person = (ctx, x, y, s, col) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); P.fillPts(ctx, circlePts(0, -70, 18, 18, 16), F.SKIN); stroke(ctx, circlePts(0, -70, 18, 18, 16), { w: 2.4, closed: true, dry: false });
    const b = closed([[-24, -46], [24, -46], [30, 10], [-30, 10]], 3); P.fillPts(ctx, b, col, 0.8); stroke(ctx, b, { w: 2.4, closed: true, dry: false }); ctx.restore(); };
  G.F09 = F;
})(window);

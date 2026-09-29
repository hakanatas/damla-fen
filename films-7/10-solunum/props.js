// props.js — Film 7/10 · ortak KIT (6/09 kopyası, 7. sınıf) + filme özel çizimler (F10)
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

// ---------------- F10: solunum sistemi şemaları (ders kitabı üslubu, sade, ölçekli değildir) ----------------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, noiseFn, rng } = G.INK;
  const K = G.KIT, F = {};
  F.SKIN = '#F1E4D2'; F.AIR = PAL.water; F.LUNG = '#E7B7A8'; F.LUNG_D = '#9E5A4C'; F.MUS = '#A8604E';
  F.RICH = '#C0584A'; F.POOR = '#76638F'; F.CO2 = '#7A6A58'; F.CART = '#EFE6D2';
  const cr = (pts, n = 8, closed = false) => {
    const P0 = closed ? pts.concat([pts[0]]) : pts, N = P0.length, g = i => closed ? P0[(i + N - 1) % (N - 1)] : P0[Math.max(0, Math.min(N - 1, i))];
    const out = []; for (let i = 0; i < N - 1; i++) { const p0 = closed ? P0[(i - 1 + N - 1) % (N - 1)] : g(i - 1), p1 = P0[i], p2 = P0[i + 1], p3 = closed ? P0[(i + 2) % (N - 1)] : g(i + 2);
      for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
    out.push(P0[N - 1]); return out; };
  F.cr = cr;
  const pathAt = (pts, u) => { const n = pts.length - 1, f = E.clamp(u) * n, i = Math.min(n - 1, Math.floor(f)); return E.mix(pts[i], pts[i + 1], f - i); };
  F.pathAt = pathAt;
  // ---- ana şema geometrisi (yerel koordinat: soluk borusu çatallanması = 0,0) ----
  F.HEAD = cr([[55, -200], [60, -232], [92, -266], [140, -280], [156, -314], [150, -330], [158, -345], [150, -368], [190, -386], [150, -426], [140, -445], [134, -482], [92, -545], [-40, -575], [-140, -520], [-150, -420], [-72, -300], [-66, -200]], 6);
  F.NASAL = cr([[150, -410], [80, -428], [14, -418], [2, -392], [70, -378], [148, -374]], 6, true);
  F.MOUTH = cr([[146, -338], [70, -344], [24, -334], [64, -322], [146, -326]], 6, true);
  F.PHAR = cr([[6, -404], [-14, -366], [-18, -322], [-10, -284], [0, -254]], 6);
  F.LUNG_R = cr([[-38, -30], [-95, -66], [-170, -40], [-238, 60], [-272, 200], [-282, 330], [-210, 318], [-130, 322], [-60, 345], [-40, 240], [-44, 100]], 6, true);
  F.LUNG_L = cr([[38, -30], [95, -66], [170, -40], [238, 60], [272, 200], [282, 332], [210, 326], [140, 334], [66, 350], [72, 250], [110, 200], [64, 150], [44, 90]], 6, true);
  F.DIA = u => { const h = E.lerp(0, 42, u); return cr([[-330, 390 + h * 0.3], [-190, 330 + h], [-40, 356 + h * 0.6], [0, 372 + h * 0.5], [60, 356 + h * 0.6], [190, 336 + h], [330, 392 + h * 0.3]], 8); };
  F.AIRPATH = cr([[196, -380], [150, -392], [70, -400], [10, -396], [-14, -366], [-16, -320], [-6, -280], [0, -240], [0, -120], [0, -4], [-60, 44], [-120, 100], [-170, 170], [-200, 230]], 6);
  // dal ağacı (deterministik)
  const tree = (seed) => { const r = rng(seed), segs = [];
    const grow = (p, a, len, d, w) => { if (d > 4) return; const q = [p[0] + Math.cos(a) * len, p[1] + Math.sin(a) * len]; segs.push([p, q, w, d]); const sp = 0.42 + r() * 0.2; grow(q, a - sp, len * 0.7, d + 1, w * 0.66); grow(q, a + sp, len * 0.7, d + 1, w * 0.66); };
    return { segs, grow }; };
  const TREES = [-1, 1].map(sd => { const T = tree(sd > 0 ? 5101 : 5102); T.grow([sd * 82, 58], Math.PI / 2 - sd * 0.62, 80, 1, 12); return T.segs; });
  // o: {hi, k:{head,tract,lungs,dia,tree}, dia:u, air:u, lungScale}
  F.resp = (ctx, x, y, s, o = {}) => {
    const hi = o.hi, dim = part => (hi && hi.indexOf(part) < 0) ? 0.32 : 1, glow = part => hi && hi.indexOf(part) >= 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    // gövde silueti
    const torso = cr([[-66, -200], [-150, -176], [-330, -140], [-360, 40], [-350, 420], [350, 420], [360, 40], [330, -140], [150, -176], [66, -200]], 6);
    ctx.save(); ctx.globalAlpha *= 0.55; P.fillPts(ctx, torso, F.SKIN); stroke(ctx, torso, { w: 2.4, seed: 5201, alpha: 0.6 }); ctx.restore();
    P.fillPts(ctx, F.HEAD.concat([[-66, -200]]), F.SKIN); stroke(ctx, F.HEAD, { w: 3, seed: 5202 });
    [[118, -470]].forEach(([ex, ey]) => { ctx.save(); ctx.fillStyle = PAL.ink; ctx.globalAlpha *= 0.7; ctx.beginPath(); ctx.ellipse(ex, ey, 6, 7, 0, 0, 7); ctx.fill(); ctx.restore(); });
    const part = (name, fn) => { ctx.save(); ctx.globalAlpha *= dim(name); if (glow(name)) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.85)'; ctx.shadowBlur = 26; fn(); ctx.restore(); } fn(); ctx.restore(); };
    // ağız (bağlam) ve burun boşluğu
    ctx.save(); ctx.globalAlpha *= 0.4; P.fillPts(ctx, F.MOUTH, '#E9C3B4'); stroke(ctx, F.MOUTH, { w: 1.8, closed: true, dry: false, seed: 5203 }); ctx.restore();
    part('nose', () => { P.fillPts(ctx, F.NASAL, '#DCE8EE'); wash(ctx, F.NASAL, F.AIR, 0.35, 5204, { bleed: 1, blooms: 0 }); stroke(ctx, F.NASAL, { w: 2.6, closed: true, seed: 5205, color: '#1F4A63' });
      for (let i = 0; i < 5; i++) line(ctx, [150 - i * 9, -374], [146 - i * 9, -386], { w: 1.4, dry: false, seed: 5206 + i }); });
    // yutak
    part('phar', () => { stroke(ctx, F.PHAR, { w: 30, color: '#E4C9BC', dry: false, taper: 0 }); stroke(ctx, F.PHAR.map(p => [p[0] - 15, p[1]]), { w: 2.4, seed: 5210, dry: false }); stroke(ctx, F.PHAR.map(p => [p[0] + 15, p[1]]).slice(10), { w: 2.4, seed: 5211, dry: false }); });
    // gırtlak
    part('larynx', () => { const L = K.rrect(0, -226, 58, 54, 12); P.fillPts(ctx, L, F.CART); stroke(ctx, L, { w: 2.8, closed: true, seed: 5212 });
      line(ctx, [-16, -226], [-3, -216], { w: 2, dry: false }); line(ctx, [16, -226], [3, -216], { w: 2, dry: false });
      stroke(ctx, [[-4, -254], [14, -270], [22, -262]], { w: 3.2, dry: false, seed: 5213, taper: 0.1 }); });
    // soluk borusu
    part('trachea', () => { const T = [[-20, -199], [20, -199], [20, -6], [-20, -6]]; P.fillPts(ctx, T, F.CART); stroke(ctx, [[-20, -199], [-20, -6]], { w: 2.6, seed: 5214 }); stroke(ctx, [[20, -199], [20, -6]], { w: 2.6, seed: 5215 });
      for (let yy = -188; yy < -10; yy += 16) stroke(ctx, P.arc(0, yy - 8, 21, 0.35, Math.PI - 0.35, 10, 8), { w: 2, dry: false, seed: 5216 + yy }); });
    // akciğerler
    part('lungs', () => { [F.LUNG_R, F.LUNG_L].forEach((L, i) => { P.fillPts(ctx, L, '#F4DDD4'); wash(ctx, L, F.LUNG, 0.6, 5230 + i, { bleed: 2, blooms: 1 }); stroke(ctx, L, { w: 3, closed: true, seed: 5232 + i, color: F.LUNG_D }); }); });
    // bronşlar ve bronşçuklar
    part('bronchi', () => { [-1, 1].forEach(sd => { stroke(ctx, [[sd * 8, -4], [sd * 50, 30], [sd * 82, 58]], { w: 22, color: F.CART, dry: false, taper: 0 }); stroke(ctx, [[sd * 8, -4], [sd * 50, 30], [sd * 82, 58]], { w: 2.4, dry: false, seed: 5240 + sd, alpha: 0.9 }); }); });
    part('tree', () => { TREES.forEach(segs => segs.forEach(([p, q, w, d]) => { line(ctx, p, q, { w: Math.max(1.4, w * 0.8), color: d > 2 ? F.LUNG_D : '#8E6D5A', dry: false, seed: 5250 + d, taper: 0.1 }); if (d === 4) inkDot(ctx, q[0], q[1], 4, { color: '158,90,76' }); })); });
    // diyafram
    part('dia', () => { const D = F.DIA(o.dia ?? 0); stroke(ctx, D, { w: 14, color: F.MUS, dry: false, taper: 0.05, alpha: 0.85 }); stroke(ctx, D.map(p => [p[0], p[1] + 7]), { w: 2, dry: false, seed: 5260 }); });
    // hava akışı
    if (o.air != null && o.air > 0) { for (let j = 0; j < 7; j++) { const u = (o.air + j / 7) % 1; const p = pathAt(F.AIRPATH, u); inkDot(ctx, p[0], p[1], 7, { color: '46,106,140' }); } }
    ctx.restore();
    const tr = p => [x + p[0] * s, y + p[1] * s];
    return { nose: tr([95, -400]), phar: tr([-16, -330]), larynx: tr([24, -226]), trachea: tr([20, -110]), bronchi: tr([56, 34]), tree: tr([200, 150]), lungs: tr([240, 250]), dia: tr([240, 352]), tip: tr([-190, 200]), tr };
  };
  // ---- alveol kümesi büyüteci ----
  F.alveoli = (ctx, cx, cy, r, t, o = {}) => {
    const ring = circlePts(cx, cy, r, r, 80);
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.2)'; ctx.shadowBlur = 20; P.fillPts(ctx, ring, '#FBF5EE'); ctx.restore();
    ctx.save(); ctx.beginPath(); ring.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.clip();
    const sc = r / 250;
    stroke(ctx, [[cx - r, cy - 40 * sc], [cx - 120 * sc, cy - 20 * sc], [cx - 50 * sc, cy]], { w: 30 * sc, color: F.LUNG_D, dry: false, taper: 0, alpha: 0.5 });
    const cells = [[0, 0], [55, -50], [70, 20], [20, 70], [-30, 60], [110, -10], [95, 75], [40, -95], [125, -80]];
    cells.forEach(([dx, dy], i) => { const px = cx + (dx + 10) * sc, py = cy + dy * sc, rr = (40 + (i % 3) * 5) * sc; const c = circlePts(px, py, rr, rr, 28);
      P.fillPts(ctx, c, '#F7E3DB'); wash(ctx, c, F.LUNG, 0.5, 5300 + i, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 2.4, closed: true, dry: false, seed: 5310 + i, color: F.LUNG_D });
      if (o.cap !== false) for (let k = 0; k < 3; k++) { const a0 = i * 1.3 + k * 2.1; stroke(ctx, P.arc(px, py, rr * (0.75 + k * 0.1), a0, a0 + 1.6, 10), { w: 4.5 * sc + 1, color: k % 2 ? F.RICH : F.POOR, dry: false, alpha: 0.9, seed: 5320 + i * 3 + k }); } });
    ctx.restore(); stroke(ctx, ring, { w: 3, closed: true, seed: 5330 });
  };
  // ---- tek alveol ve kılcal damar (gaz değişimi) ----
  F.exchange = (ctx, t, k, o = {}) => {
    const cx = o.cx ?? 760, cy = o.cy ?? 470, R = 190;
    const alv = wobble(circlePts(cx, cy, R, R * 0.92, 90), 3, 5401);
    P.fillPts(ctx, alv, '#F7E7E0'); wash(ctx, alv, F.LUNG, 0.45, 5402, { bleed: 2, blooms: 1 }); stroke(ctx, alv, { w: 4, closed: true, seed: 5403, color: F.LUNG_D });
    // bronşçuk girişi
    const stem = [[cx - 60, cy - R * 0.85], [cx - 90, cy - R - 70], [cx - 110, cy - R - 130]];
    stroke(ctx, stem.map(p => [p[0] - 34, p[1]]), { w: 3, seed: 5404, color: F.LUNG_D }); stroke(ctx, stem.map(p => [p[0] + 34, p[1]]), { w: 3, seed: 5405, color: F.LUNG_D });
    // kılcal damar: soldan (oksijence fakir) sağa (oksijence zengin)
    const cap = []; for (let i = 0; i <= 60; i++) { const a = Math.PI * (1.05 - i / 60 * 1.1); cap.push([cx + Math.cos(a) * (R + 42), cy + Math.sin(a) * -(R * 0.92 + 42) * -1]); }
    const capPts = cap.map(p => [p[0], p[1]]);
    capPts.forEach((p, i) => { if (!i) return; const q = capPts[i - 1]; const col = i < 30 ? F.POOR : F.RICH; const m = Math.abs(i - 30) < 8 ? (i - 22) / 16 : (i < 30 ? 0 : 1);
      line(ctx, q, p, { w: 44, color: m <= 0 ? F.POOR : m >= 1 ? F.RICH : (m < 0.5 ? F.POOR : F.RICH), dry: false, taper: 0, alpha: 0.55 }); });
    stroke(ctx, cap.map(([px, py]) => { const a = Math.atan2(py - cy, px - cx); return [px + Math.cos(a) * 22, py + Math.sin(a) * 22]; }), { w: 2.6, seed: 5406 });
    stroke(ctx, cap.map(([px, py]) => { const a = Math.atan2(py - cy, px - cx); return [px - Math.cos(a) * 22, py - Math.sin(a) * 22]; }), { w: 2.6, seed: 5407 });
    // kan akış okları
    P.arrow(ctx, [cap[2][0] - 70, cap[2][1] - 10], [cap[2][0] - 10, cap[2][1]], 1, { w: 3, color: F.POOR });
    P.arrow(ctx, [cap[58][0] + 10, cap[58][1]], [cap[58][0] + 70, cap[58][1] - 10], 1, { w: 3, color: F.RICH });
    // gazlar
    const o2 = o.o2 ?? 0, co2 = o.co2 ?? 0;
    for (let j = 0; j < 8; j++) { const ph = (t * 0.35 + j / 8) % 1; const a = Math.PI * (0.2 + j / 8 * 0.6);
      if (o2 > 0) { const r0 = R * 0.35, r1 = R + 42; const rr = E.lerp(r0, r1, E.ease.io(ph)); ctx.save(); ctx.globalAlpha *= o2 * Math.min(1, (1 - ph) * 4, ph * 6 + 0.2); inkDot(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92, 9, { color: '46,106,140' }); ctx.restore(); }
      if (co2 > 0) { const a2 = a + 0.2, r0 = R + 42, r1 = R * 0.35; const rr = E.lerp(r0, r1, E.ease.io(ph)); ctx.save(); ctx.globalAlpha *= co2 * Math.min(1, (1 - ph) * 4, ph * 6 + 0.2); inkDot(ctx, cx + Math.cos(a2) * rr, cy + Math.sin(a2) * rr * 0.92, 9, { color: '122,106,88' }); ctx.restore(); } }
    return { cx, cy, R, capL: cap[4], capR: cap[56], stemTop: [cx - 110, cy - R - 130] };
  };
  // ---- göğüs kafesi + akciğer + diyafram (mekanizma). u: 0 soluk verilmiş .. 1 soluk alınmış ----
  F.chest = (ctx, x, y, s, u, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const ex = 1 + 0.06 * u, ey = 1 + 0.1 * u;
    // akciğerler (genişler)
    [F.LUNG_R, F.LUNG_L].forEach((L, i) => { const P2 = L.map(([px, py]) => [px * ex, py * ey + 10 * u]); P.fillPts(ctx, P2, '#F4DDD4'); wash(ctx, P2, F.LUNG, 0.55, 5501 + i, { bleed: 2, blooms: 0 }); stroke(ctx, P2, { w: 3, closed: true, seed: 5503 + i, color: F.LUNG_D }); });
    const T = [[-18, -200], [18, -200], [18, -6], [-18, -6]]; P.fillPts(ctx, T, F.CART); stroke(ctx, [[-18, -200], [-18, -6]], { w: 2.4, seed: 5505 }); stroke(ctx, [[18, -200], [18, -6]], { w: 2.4, seed: 5506 });
    [-1, 1].forEach(sd => stroke(ctx, [[sd * 8, -4], [sd * 50, 30], [sd * 80, 60]], { w: 18, color: F.CART, dry: false, taper: 0 }));
    // kaburgalar (yukarı-dışa kalkar)
    for (let i = 0; i < 6; i++) { const yy = -70 + i * 62; [-1, 1].forEach(sd => { const lift = u * (12 + i * 3); const pts = P.bez([sd * 26, yy - 10], [sd * (330 + 18 * u), yy - 50 - lift * 0.4], [sd * (280 + 22 * u), yy + 70 - lift], 18);
      stroke(ctx, pts, { w: 9, color: '#E9DFC8', dry: false, taper: 0.05 }); stroke(ctx, pts, { w: 2, color: '#8A6A45', dry: false, alpha: 0.8, seed: 5510 + i * 2 + (sd > 0 ? 1 : 0) }); }); }
    // omurga/göğüs kemiği ipucu
    stroke(ctx, [[0, -90], [0, 230]], { w: 10, color: '#E9DFC8', dry: false, taper: 0 }); stroke(ctx, [[-5, -90], [-5, 230]], { w: 1.6, color: '#8A6A45', dry: false }); stroke(ctx, [[5, -90], [5, 230]], { w: 1.6, color: '#8A6A45', dry: false });
    // diyafram: soluk verince kubbe (yüksek), alınca aşağı ve düz
    const h = E.lerp(-40, 30, u);
    const D = cr([[-320, 400], [-190, 320 + h + 10], [-40, 340 + h * 0.6], [0, 350 + h * 0.5], [40, 340 + h * 0.6], [190, 320 + h + 10], [320, 400]], 8);
    stroke(ctx, D, { w: 16, color: F.MUS, dry: false, taper: 0.05, alpha: 0.9 }); stroke(ctx, D.map(p => [p[0], p[1] + 8]), { w: 2, dry: false, seed: 5530 });
    ctx.restore();
    const tr = p => [x + p[0] * s, y + p[1] * s];
    return { top: tr([0, -200]), dia: tr([190, 320 + h + 10]), diaL: tr([-190, 320 + h + 10]), ribR: tr([300 + 22 * u, 60]), ribL: tr([-300 - 22 * u, 60]), tr };
  };
  // ---- şişe-balon modeli. u: 0 zar serbest .. 1 zar aşağı çekildi ----
  F.jar = (ctx, x, y, s, u, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-60, -250], [-60, -210], [-150, -150], [-150, 190], [150, 190], [150, -150], [60, -210], [60, -250]];
    const bp = cr(body, 5);
    ctx.save(); ctx.globalAlpha *= 0.35; P.fillPts(ctx, bp.concat([[150, 190], [-150, 190]]), '#DCEAF0'); ctx.restore();
    stroke(ctx, bp, { w: 3.2, seed: 5601, color: '#1F4A63' });
    line(ctx, [-110, -130], [-110, 150], { w: 2, alpha: 0.35, dry: false, color: '#FFFFFF' });
    // tıpa ve Y boru
    const cap = K.rrect(0, -262, 140, 34, 8); P.fillPts(ctx, cap, '#C9B8A0'); stroke(ctx, cap, { w: 2.6, closed: true, seed: 5602 });
    stroke(ctx, [[0, -330], [0, -60]], { w: 14, color: '#EDE6DA', dry: false, taper: 0 }); stroke(ctx, [[-7, -330], [-7, -62]], { w: 2, dry: false }); stroke(ctx, [[7, -330], [7, -62]], { w: 2, dry: false });
    [-1, 1].forEach(sd => { stroke(ctx, [[0, -62], [sd * 60, -10]], { w: 12, color: '#EDE6DA', dry: false, taper: 0 }); stroke(ctx, [[0, -62], [sd * 60, -10]], { w: 1.8, dry: false });
      const br = 34 + 30 * u; const b = circlePts(sd * (66 + 8 * u), -10 + br * 0.95, br * 0.85, br, 30); P.fillPts(ctx, b, '#F2C9BC'); wash(ctx, b, F.LUNG, 0.6, 5610 + sd, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, dry: false, seed: 5612 + sd, color: F.LUNG_D }); });
    // lastik zar
    const pull = 80 * u; const mem = P.bez([-150, 190], [0, 190 + pull * 2], [150, 190], 30);
    stroke(ctx, mem, { w: 7, color: F.MUS, dry: false, taper: 0 });
    stroke(ctx, [[0, 190 + pull], [0, 230 + pull]], { w: 4, dry: false }); P.fillPts(ctx, circlePts(0, 238 + pull, 12, 12, 16), '#C9B8A0'); stroke(ctx, circlePts(0, 238 + pull, 12, 12, 16), { w: 2, closed: true, dry: false });
    ctx.restore();
    const tr = p => [x + p[0] * s, y + p[1] * s];
    return { tube: tr([0, -300]), bottle: tr([150, -80]), balloon: tr([-100 - 10 * u, 30 + 20 * u]), mem: tr([150, 190]), knob: tr([0, 238 + pull]), tr };
  };
  // ---- simgeler ----
  F.cigarette = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-140, -16], [110, -16], [110, 16], [-140, 16]]; P.fillPts(ctx, b, '#FBF8F1'); const f = [[-140, -16], [-80, -16], [-80, 16], [-140, 16]]; P.fillPts(ctx, f, '#D9A55A'); stroke(ctx, b.concat([b[0]]), { w: 2.6, seed: 5701 }); line(ctx, [-80, -16], [-80, 16], { w: 2, dry: false });
    P.fillPts(ctx, [[110, -16], [124, -12], [124, 12], [110, 16]], '#7A6A58'); inkDot(ctx, 122, 0, 9, { color: '227,160,58' });
    for (let i = 0; i < 3; i++) { const ph = (t * 0.4 + i / 3) % 1; const pts = []; for (let j = 0; j <= 20; j++) { const v = j / 20; pts.push([130 + v * 60 + Math.sin(v * 7 + t * 2 + i) * 16, -20 - v * 170 * (0.4 + ph * 0.6)]); }
      stroke(ctx, pts, { w: 5, color: '#8C8580', alpha: 0.55 * (1 - ph * 0.6), dry: false, taper: 0.4, seed: 5710 + i }); }
    ctx.restore(); };
  F.crescent = (ctx, x, y, r, k = 1) => { const outer = circlePts(x, y, r, r, 60), inner = circlePts(x + r * 0.36, y - r * 0.08, r * 0.8, r * 0.8, 60);
    ctx.save(); ctx.beginPath(); outer.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); inner.slice().reverse().forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath();
    ctx.fillStyle = PAL.life; ctx.globalAlpha *= 0.85 * k; ctx.fill('evenodd'); ctx.restore(); };
  F.phone = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const b = K.rrect(0, 0, 90, 160, 16); P.fillPts(ctx, b, '#FBF8F1'); stroke(ctx, b, { w: 3, closed: true, seed: 5801 }); const sc = K.rrect(0, -8, 70, 110, 6); P.fillPts(ctx, sc, '#DCEAF0'); stroke(ctx, sc, { w: 1.8, closed: true, dry: false }); P.fillPts(ctx, circlePts(0, 62, 7, 7, 12), PAL.ink, 0.6); ctx.restore(); };
  F.window = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const fr = [[-80, -90], [80, -90], [80, 90], [-80, 90], [-80, -90]]; P.fillPts(ctx, fr, '#DCEAF0'); wash(ctx, fr, PAL.water, 0.2, 5901, { bleed: 1, blooms: 0 }); stroke(ctx, fr, { w: 3, closed: true, seed: 5902 }); line(ctx, [0, -90], [0, 90], { w: 3 }); line(ctx, [-80, 0], [80, 0], { w: 3 });
    for (let i = 0; i < 3; i++) { const yy = -50 + i * 50, ph = (t * 0.6 + i * 0.3) % 1; const pts = []; for (let j = 0; j <= 16; j++) pts.push([-150 + j * 12 + ph * 40, yy + Math.sin(j * 0.6 + t * 3 + i) * 6]); stroke(ctx, pts, { w: 3, color: PAL.water, alpha: 0.7, dry: false, taper: 0.4 }); }
    ctx.restore(); };
  F.plate = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const pl = circlePts(0, 0, 90, 60, 40); P.fillPts(ctx, pl, '#FBF8F1'); stroke(ctx, pl, { w: 3, closed: true, seed: 5951 }); stroke(ctx, circlePts(0, 0, 66, 42, 40), { w: 1.6, closed: true, dry: false, alpha: 0.5 });
    const ap = circlePts(-22, -8, 26, 24, 24); P.fillPts(ctx, ap, '#C9573F', 0.85); stroke(ctx, ap, { w: 2, closed: true, dry: false }); line(ctx, [-22, -32], [-18, -46], { w: 2.4, dry: false });
    const lf = circlePts(26, 0, 30, 16, 20); P.fillPts(ctx, lf, PAL.life, 0.8); stroke(ctx, lf, { w: 2, closed: true, dry: false }); ctx.restore(); };
  F.ball = (ctx, x, y, r) => { const p = circlePts(x, y, r, r, 30); P.fillPts(ctx, p, '#F4C77A'); wash(ctx, p, PAL.light, 0.6, 5960, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: 3, closed: true, dry: false });
    stroke(ctx, P.arc(x - r * 1.4, y, r * 1.1, -0.75, 0.75, 16), { w: 2.2, dry: false }); stroke(ctx, P.arc(x + r * 1.4, y, r * 1.1, Math.PI - 0.75, Math.PI + 0.75, 16), { w: 2.2, dry: false }); line(ctx, [x, y - r], [x, y + r], { w: 2.2, dry: false }); };
  G.F10 = F;
})(window);

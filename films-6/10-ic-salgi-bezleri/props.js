// props.js — Film 6/10 · ortak KIT (08–10 aynı kopya) + filme özel çizimler (F10)
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
    E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
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
      INK.label(c, 'Fen Bilimleri · 6. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
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

// ---------------- F10: iç salgı bezleri modeli (bezlerin yapısına girilmez; yalnızca konum işaretleri) ----------------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot } = G.INK;
  const K = G.KIT, F = {};
  F.SKIN = '#F1E4D2'; F.GL = '#C07F1E'; F.BLOOD = '#F2D4CC';
  const cr = (pts, n = 8) => { const out = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
    out.push(pts[pts.length - 1]); return out; };
  const arm = (side, a, b) => { const S = [side * 108, -190]; const E1 = [S[0] + side * Math.sin(a) * 150, S[1] + Math.cos(a) * 150]; const a2 = a + b; return [S, E1, [E1[0] + side * Math.sin(a2) * 140, E1[1] + Math.cos(a2) * 140]]; };
  // bez konumları (yerel koordinat)
  F.GLANDS = { pit: [0, -292], thy: [0, -222], adr: [48, -52], pan: [-8, -80], sex: [0, 50] };
  // sade önden vücut silueti + bez işaretleri. o: {hi:[...ids], lit(0..1), armR}
  F.body = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const limbs = [arm(1, ...(o.armR ?? [0.32, 0.1])), arm(-1, 0.32, 0.1), [[50, 30], [62, 180], [72, 330]], [[-50, 30], [-62, 180], [-72, 330]]];
    const torso = cr([[-60, -232], [-112, -205], [-100, -60], [-80, 60], [0, 75], [80, 60], [100, -60], [112, -205], [60, -232]], 6);
    [[PAL.ink, 1], [F.SKIN, 0]].forEach(([col, ex]) => {
      ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha *= ex ? 0.55 : 1;
      limbs.forEach((L, i) => { ctx.lineWidth = (i < 2 ? 50 : 66) + ex * 5; ctx.beginPath(); ctx.moveTo(...L[0]); ctx.lineTo(...L[1]); ctx.lineTo(...L[2]); ctx.stroke(); });
      ctx.lineWidth = 44 + ex * 5; ctx.beginPath(); ctx.moveTo(0, -300); ctx.lineTo(0, -215); ctx.stroke();
      ctx.beginPath(); torso.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); if (ex) { ctx.lineWidth = 5; ctx.stroke(); } else ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, -290, 64 + ex * 2.5, 72 + ex * 2.5, 0, 0, 7); ctx.fill(); ctx.restore();
    });
    // bağlam için soluk organ taslakları: beyin, böbrekler
    ctx.save(); ctx.globalAlpha *= 0.35; stroke(ctx, K.blob(0, -312, 50, 34, 10301, 0.06), { w: 2, closed: true, dry: false });
    [-1, 1].forEach(sd => stroke(ctx, K.blob(sd * 48, -20, 18, 30, 10302 + sd, 0.05), { w: 2, closed: true, dry: false })); ctx.restore();
    const lit = o.lit ?? 1, hi = o.hi ?? [];
    const mark = (id, shape) => { const on = hi.length === 0 || hi.includes(id); ctx.save(); ctx.globalAlpha *= lit * (on ? 1 : 0.35);
      if (on && hi.length) { ctx.save(); ctx.globalAlpha *= 0.4 + 0.2 * Math.sin((o.t ?? 0) * 5); ctx.fillStyle = PAL.light; const g = F.GLANDS[id]; ctx.beginPath(); ctx.arc(g[0], g[1], 30, 0, 7); ctx.fill(); ctx.restore(); }
      shape(); ctx.restore(); };
    const blobF = (pts, seed) => { P.fillPts(ctx, pts, '#F4D9A6'); wash(ctx, pts, PAL.light, 0.55, seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, pts, { w: 2.4, closed: true, dry: false, color: '#8A5A12' }); };
    mark('pit', () => blobF(circlePts(0, -292, 9, 8, 16), 10310));
    mark('thy', () => { blobF(K.blob(-12, -222, 12, 9, 10311, 0.05), 10312); blobF(K.blob(12, -222, 12, 9, 10313, 0.05), 10314); });
    mark('adr', () => [-1, 1].forEach(sd => blobF(P.arc(sd * 48, -44, 15, Math.PI, Math.PI * 2, 10, 12).concat([[sd * 48 + 15, -44]]), 10315 + sd)));
    mark('pan', () => blobF(cr([[-48, -80], [-20, -92], [20, -86], [40, -74], [10, -70], [-30, -70], [-48, -80]], 5), 10318));
    mark('sex', () => [-1, 1].forEach(sd => blobF(circlePts(sd * 34, 50, 11, 8, 14), 10319 + sd)));
    ctx.restore();
    const tr = p => [x + p[0] * s, y + p[1] * s];
    const A = { tr, head: tr([0, -290]), heart: tr([-22, -140]), handR: tr(limbs[0][2]) }; Object.keys(F.GLANDS).forEach(k => A[k] = tr(F.GLANDS[k])); return A;
  };
  F.heart = (ctx, x, y, s, beat = 0) => { const k = s * (1 + 0.12 * beat); ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    const h = P.bez([0, 30], [-60, -10], [-30, -40], 14).concat(P.bez([-30, -40], [-8, -52], [0, -26], 10), P.bez([0, -26], [8, -52], [30, -40], 10), P.bez([30, -40], [60, -10], [0, 30], 14));
    P.fillPts(ctx, h, '#E7A89A'); wash(ctx, h, '#B5553F', 0.45, 10330, { bleed: 1, blooms: 0 }); stroke(ctx, h, { w: 3 / k * s, closed: true, dry: false }); ctx.restore(); };
  // kan damarı (yatay dalgalı) + taşınan hormonlar
  F.vessel = (ctx, x0, x1, y, t, o = {}) => { const top = [], bot = [], n = 40; for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, yy = y + Math.sin(i * 0.3) * (o.amp ?? 20); top.push([x, yy - 30]); bot.push([x, yy + 30]); }
    P.fillPts(ctx, top.concat(bot.slice().reverse()), F.BLOOD); stroke(ctx, top, { w: 3, seed: 10340 }); stroke(ctx, bot, { w: 3, seed: 10341 });
    const dots = o.dots ?? 0; for (let j = 0; j < dots; j++) { const u = ((t * (o.speed ?? 0.12) + j / dots) % 1); if (o.until !== undefined && u > o.until) continue; const i = u * n; const px = x0 + (x1 - x0) * u, py = y + Math.sin(i * 0.3) * (o.amp ?? 20); inkDot(ctx, px, py, 9, { color: '192,127,30' }); } };
  F.house = (ctx, x, y, w, h) => { const hs = [[x, y + h], [x, y], [x + w / 2, y - h * 0.38], [x + w, y], [x + w, y + h], [x, y + h]]; P.fillPts(ctx, hs, '#FBF5E8'); wash(ctx, hs, PAL.light, 0.12, 10350, { bleed: 2, blooms: 1 }); stroke(ctx, hs, { w: 3.4, seed: 10351 }); };
  F.balloon = (ctx, x, y, r) => { const b = K.blob(x, y, r * 0.85, r, 10360, 0.02); P.fillPts(ctx, b, '#8FB3C9'); wash(ctx, b, PAL.water, 0.5, 10361, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, dry: false }); stroke(ctx, P.bez([x, y + r], [x + 20, y + r + 60], [x - 10, y + r + 160], 16), { w: 2, dry: false }); };
  G.F10 = F;
})(window);

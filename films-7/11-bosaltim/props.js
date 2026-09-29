// props.js — Film 7/11 · ortak KIT (6/09 kopyası, 7. sınıf) + filme özel çizimler (F11)
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

// ---------------- F11: boşaltım sistemi şemaları (ders kitabı üslubu; böbreğin iç yapısı çizilmez) ----------------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, rng } = G.INK;
  const K = G.KIT, F = {};
  F.SKIN = '#F1E4D2'; F.KID = '#C9806C'; F.KID_D = '#8A4A3C'; F.URINE = '#D9B64A'; F.URINE_D = '#9C7F22'; F.RICH = '#C0584A'; F.POOR = '#76638F';
  F.LUNG = '#E7B7A8'; F.LUNG_D = '#9E5A4C';
  const cr = (pts, n = 8, closed = false) => {
    const P0 = closed ? pts.concat([pts[0]]) : pts, N = P0.length, g = i => P0[Math.max(0, Math.min(N - 1, i))];
    const out = []; for (let i = 0; i < N - 1; i++) { const p0 = closed ? P0[(i - 1 + N - 1) % (N - 1)] : g(i - 1), p1 = P0[i], p2 = P0[i + 1], p3 = closed ? P0[(i + 2) % (N - 1)] : g(i + 2);
      for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
    out.push(P0[N - 1]); return out; };
  F.cr = cr;
  F.pathAt = (pts, u) => { const n = pts.length - 1, f = E.clamp(u) * n, i = Math.min(n - 1, Math.floor(f)); return E.mix(pts[i], pts[i + 1], f - i); };
  // fasulye biçimli böbrek (sd: -1 sol görüntü, +1 sağ görüntü; girinti içe bakar)
  F.bean = (cx, cy, rx, ry, sd) => { const p = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * Math.PI * 2; const inward = Math.cos(a) * -sd; const dent = inward > 0 ? 0.32 * Math.pow(inward, 4) * Math.exp(-Math.pow(Math.sin(a) * 2.2, 2)) : 0; p.push([cx + Math.cos(a) * rx * (1 - dent), cy + Math.sin(a) * ry]); } return p; };
  F.URE = sd => cr([[sd * 100, -112], [sd * 90, -40], [sd * 105, 80], [sd * 90, 190], [sd * 52, 250]], 8);
  F.BLAD = cr([[0, 228], [70, 240], [95, 290], [70, 350], [0, 362], [-70, 350], [-95, 290], [-70, 240]], 6, true);
  F.URETH = [[0, 360], [0, 400], [0, 440]];
  F.URINEPATH = sd => cr([[sd * 150, -120], [sd * 100, -112], [sd * 90, -40], [sd * 105, 80], [sd * 90, 190], [sd * 52, 250], [0, 300], [0, 360], [0, 440]], 6);
  // o: {hi:[...], urine:u, fill:0..1 (kese dolumu), blood:u}
  F.body = (ctx, x, y, s, o = {}) => {
    const hi = o.hi, dim = p => (hi && hi.indexOf(p) < 0) ? 0.3 : 1, glow = p => hi && hi.indexOf(p) >= 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const torso = cr([[-150, -340], [-300, -300], [-300, -60], [-250, 150], [-300, 330], [-250, 460], [250, 460], [300, 330], [250, 150], [300, -60], [300, -300], [150, -340]], 6);
    ctx.save(); ctx.globalAlpha *= 0.55; P.fillPts(ctx, torso, F.SKIN); stroke(ctx, torso, { w: 2.4, seed: 11201, alpha: 0.6 }); ctx.restore();
    const part = (name, fn) => { ctx.save(); ctx.globalAlpha *= dim(name); if (glow(name)) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.85)'; ctx.shadowBlur = 26; fn(); ctx.restore(); } fn(); ctx.restore(); };
    // kan damarları (özel ad verilmez)
    part('vessels', () => { [[-16, F.RICH], [16, F.POOR]].forEach(([dx, col], i) => { stroke(ctx, [[dx, -330], [dx, 200]], { w: 14, color: col, dry: false, taper: 0, alpha: 0.55 });
      [-1, 1].forEach(sd => stroke(ctx, cr([[dx, -120 + i * 22], [sd * 60, -118 + i * 22], [sd * 104, -128 + i * 28]], 6), { w: 9, color: col, dry: false, taper: 0, alpha: 0.6 })); }); });
    part('kidney', () => { [-1, 1].forEach(sd => { const b = F.bean(sd * 165, -120, 70, 112, sd); P.fillPts(ctx, b, '#E3B2A2'); wash(ctx, b, F.KID, 0.6, 11210 + sd, { bleed: 1.5, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 11212 + sd, color: F.KID_D }); }); });
    part('ureter', () => { [-1, 1].forEach(sd => { stroke(ctx, F.URE(sd), { w: 9, color: '#EBD58E', dry: false, taper: 0 }); stroke(ctx, F.URE(sd), { w: 2.2, color: F.URINE_D, dry: false, seed: 11220 + sd, alpha: 0.9 }); }); });
    part('bladder', () => { P.fillPts(ctx, F.BLAD, '#F3E3B8'); const f = o.fill ?? 0.4; if (f > 0) { ctx.save(); ctx.beginPath(); F.BLAD.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.clip(); ctx.fillStyle = F.URINE; ctx.globalAlpha *= 0.55; ctx.fillRect(-120, 362 - f * 134, 240, 200); ctx.restore(); }
      stroke(ctx, F.BLAD, { w: 3, closed: true, seed: 11230, color: F.URINE_D }); });
    part('urethra', () => { stroke(ctx, F.URETH, { w: 12, color: '#EBD58E', dry: false, taper: 0 }); stroke(ctx, F.URETH.map(p => [p[0] - 6, p[1]]), { w: 2, dry: false, color: F.URINE_D }); stroke(ctx, F.URETH.map(p => [p[0] + 6, p[1]]), { w: 2, dry: false, color: F.URINE_D }); });
    if (o.urine != null && o.urine > 0) [-1, 1].forEach(sd => { const pth = F.URINEPATH(sd); for (let j = 0; j < 5; j++) { const u = (o.urine + j / 5 + (sd > 0 ? 0.1 : 0)) % 1; const p = F.pathAt(pth, u); inkDot(ctx, p[0], p[1], 6, { color: '176,140,40' }); } });
    ctx.restore();
    const tr = p => [x + p[0] * s, y + p[1] * s];
    return { kidney: tr([225, -150]), kidneyL: tr([-225, -150]), vessels: tr([16, -260]), ureter: tr([100, 60]), bladder: tr([90, 300]), urethra: tr([6, 420]), tr };
  };
  // ---- simgeler (organ kartları) ----
  F.liver = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); const p = cr([[-110, -20], [-40, -60], [60, -62], [120, -40], [110, 0], [40, 30], [-40, 50], [-100, 30]], 6, true); P.fillPts(c, p, '#B9765E'); wash(c, p, '#7E3F2E', 0.4, 11301, { bleed: 1, blooms: 0 }); stroke(c, p, { w: 3, closed: true, seed: 11302, color: '#5E2E22' }); line(c, [10, -58], [-10, 40], { w: 2, dry: false, alpha: 0.6, color: '#5E2E22' }); c.restore(); };
  F.skin = (c, x, y, s, t) => { c.save(); c.translate(x, y); c.scale(s, s); const top = [[-120, -40], [120, -40], [120, 60], [-120, 60]]; P.fillPts(c, top, '#F1D9C4'); P.fillPts(c, [[-120, -40], [120, -40], [120, -22], [-120, -22]], '#E3BFA4'); stroke(c, [[-120, -40], [120, -40]], { w: 2.6, seed: 11310 });
    [-60, 40].forEach((gx, i) => { stroke(c, cr([[gx, -40], [gx + 6, -10], [gx - 4, 20], [gx + 4, 36]], 6), { w: 2.4, dry: false, color: PAL.water }); stroke(c, circlePts(gx + 4, 44, 12, 10, 16), { w: 2.4, closed: true, dry: false, color: PAL.water });
      const ph = (t * 0.5 + i * 0.5) % 1; const d = []; for (let k = 0; k <= 30; k++) { const a = k / 30 * Math.PI * 2; d.push([gx + Math.cos(a) * 10 * (1 - 0.5 * Math.max(0, -Math.sin(a)) ** 2), -54 - ph * 30 + Math.sin(a) * 12 - (Math.sin(a) < 0 ? 10 * (-Math.sin(a)) ** 4 : 0)]); }
      c.save(); c.globalAlpha *= 1 - ph * 0.6; P.fillPts(c, d, '#BFD8E6'); stroke(c, d, { w: 1.8, closed: true, dry: false, color: PAL.water }); c.restore(); });
    stroke(c, [[-120, 60], [120, 60]], { w: 1.6, dry: false, alpha: 0.4 }); c.restore(); };
  F.lungs = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); [-1, 1].forEach(sd => { const p = cr([[sd * 20, -60], [sd * 70, -80], [sd * 120, -10], [sd * 130, 80], [sd * 70, 90], [sd * 24, 90], [sd * 20, 10]], 6, true); P.fillPts(c, p, '#F4DDD4'); wash(c, p, F.LUNG, 0.55, 11320 + sd, { bleed: 1, blooms: 0 }); stroke(c, p, { w: 2.6, closed: true, seed: 11322 + sd, color: F.LUNG_D }); });
    stroke(c, [[0, -120], [0, -20]], { w: 14, color: '#EFE6D2', dry: false, taper: 0 }); stroke(c, [[-7, -120], [-7, -22]], { w: 1.8, dry: false }); stroke(c, [[7, -120], [7, -22]], { w: 1.8, dry: false }); c.restore(); };
  F.colon = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); const p = cr([[70, 80], [100, 40], [100, -60], [60, -80], [0, -76], [-60, -80], [-100, -60], [-100, 50], [-60, 80], [-30, 90]], 8);
    stroke(c, p, { w: 34, color: '#D9A58A', dry: false, taper: 0 }); stroke(c, p, { w: 2.2, dry: false, seed: 11330, color: '#7E4A36', alpha: 0.8 });
    for (let i = 2; i < p.length - 2; i += 6) { const a = Math.atan2(p[i + 1][1] - p[i - 1][1], p[i + 1][0] - p[i - 1][0]) + Math.PI / 2; line(c, [p[i][0] - Math.cos(a) * 16, p[i][1] - Math.sin(a) * 16], [p[i][0] + Math.cos(a) * 16, p[i][1] + Math.sin(a) * 16], { w: 1.6, dry: false, alpha: 0.5 }); }
    c.restore(); };
  F.glass = (c, x, y, s, f = 0.7) => { c.save(); c.translate(x, y); c.scale(s, s); const g = [[-50, -80], [50, -80], [40, 80], [-40, 80]]; const wy = 80 - 160 * f;
    P.fillPts(c, [[-50 + (80 - wy) / 160 * 10 * 0 + (wy + 80) / 160 * 10, wy], [50 - (wy + 80) / 160 * 10, wy], [40, 80], [-40, 80]], '#BFD8E6'); wash(c, [[-48, wy], [48, wy], [40, 80], [-40, 80]], PAL.water, 0.35, 11340, { bleed: 1, blooms: 0 });
    stroke(c, g.concat([g[0]]).slice(1), { w: 3, seed: 11341 }); line(c, [-50, -80], [50, -80], { w: 2, dry: false, alpha: 0.5 }); c.restore(); };
  F.shaker = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); const b = [[-40, -40], [40, -40], [46, 80], [-46, 80]]; P.fillPts(c, b, '#FBF8F1'); stroke(c, b.concat([b[0]]), { w: 3, seed: 11350 }); const cap = cr([[-40, -40], [-34, -80], [0, -92], [34, -80], [40, -40]], 6); P.fillPts(c, cap, '#A8A8B0'); stroke(c, cap, { w: 2.6, seed: 11351 });
    [[-12, -70], [0, -76], [12, -70]].forEach(([hx, hy]) => inkDot(c, hx, hy, 3)); K.text(c, 'TUZ', 0, 30, { size: 30, align: 'center' }); c.restore(); };
  F.screen = (c, x, y, s) => { c.save(); c.translate(x, y); c.scale(s, s); const b = K.rrect(0, 0, 110, 180, 16); P.fillPts(c, b, '#3A3A44'); const sc = K.rrect(0, -6, 92, 140, 6); P.fillPts(c, sc, '#9CB8C8'); stroke(c, b, { w: 3, closed: true, seed: 11360 }); c.restore(); };
  F.soap = (c, x, y, s, t) => { c.save(); c.translate(x, y); c.scale(s, s); const b = K.rrect(0, 20, 150, 70, 26); P.fillPts(c, b, '#E8D3E8'); wash(c, b, '#9C7FB0', 0.3, 11370, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 3, closed: true, seed: 11371 });
    [[-40, -40, 18], [10, -60, 24], [50, -30, 14]].forEach(([bx, by, r], i) => stroke(c, circlePts(bx, by - Math.sin(t * 2 + i) * 6, r, r, 18), { w: 2, closed: true, dry: false, color: PAL.water })); c.restore(); };
  F.ball = (c, x, y, r) => { const p = circlePts(x, y, r, r, 30); P.fillPts(c, p, '#F4C77A'); wash(c, p, PAL.light, 0.6, 11380, { bleed: 1, blooms: 0 }); stroke(c, p, { w: 3, closed: true, dry: false });
    stroke(c, P.arc(x - r * 1.4, y, r * 1.1, -0.75, 0.75, 16), { w: 2.2, dry: false }); stroke(c, P.arc(x + r * 1.4, y, r * 1.1, Math.PI - 0.75, Math.PI + 0.75, 16), { w: 2.2, dry: false }); line(c, [x, y - r], [x, y + r], { w: 2.2, dry: false }); };
  F.drop = (c, x, y, r, col = '#BFD8E6') => { const d = []; for (let k = 0; k <= 30; k++) { const a = k / 30 * Math.PI * 2; d.push([x + Math.cos(a) * r * (1 - 0.5 * Math.max(0, -Math.sin(a)) ** 2), y + Math.sin(a) * r * 1.1 - (Math.sin(a) < 0 ? r * (-Math.sin(a)) ** 4 : 0)]); } P.fillPts(c, d, col); stroke(c, d, { w: 1.8, closed: true, dry: false, color: PAL.water }); };
  G.F11 = F;
})(window);

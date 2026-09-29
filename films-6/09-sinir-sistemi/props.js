// props.js — Film 6/09 · ortak KIT (08–10 aynı kopya) + filme özel çizimler (F09)
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

// ---------------- F09: sinir sistemi modeli (sade, etiketli şema; beynin ayrıntılı yapısı çizilmez) ----------------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot } = G.INK;
  const K = G.KIT, F = {};
  F.SKIN = '#F1E4D2'; F.CNS = PAL.life; F.CNS_D = '#4E6628'; F.SIG = '#E3A03A';
  const cr = (pts, n = 8) => { // Catmull-Rom yumuşatma
    const out = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
    out.push(pts[pts.length - 1]); return out; };
  F.cr = cr;
  // kol geometrisi: side ±1, a: omuzdan açı (0 aşağı), b: dirsek bükümü
  F.arm = (side, a, b) => { const S = [side * 108, -190]; const E1 = [S[0] + side * Math.sin(a) * 150, S[1] + Math.cos(a) * 150]; const a2 = a + b; const H = [E1[0] + side * Math.sin(a2) * 140, E1[1] + Math.cos(a2) * 140]; return [S, E1, H]; };
  F.legs = side => [[side * 50, 30], [side * 62, 180], [side * 72, 330]];
  // önden vücut modeli. o: {armR:[a,b], armL:[a,b], cns(0..1), pns(0..1), hi:'brain'|'cord'|...}
  F.body = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const aR = o.armR ?? [0.32, 0.1], aL = o.armL ?? [0.32, 0.1];
    const limbs = [F.arm(1, ...aR), F.arm(-1, ...aL), F.legs(1), F.legs(-1)];
    const torso = cr([[-60, -232], [-112, -205], [-100, -60], [-80, 60], [0, 75], [80, 60], [100, -60], [112, -205], [60, -232]], 6);
    const passes = [[PAL.ink, 1], [F.SKIN, 0]];
    passes.forEach(([col, extra]) => {
      ctx.save(); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha *= extra ? 0.55 : 1;
      limbs.forEach((L, i) => { ctx.lineWidth = (i < 2 ? 50 : 66) + extra * 5; ctx.beginPath(); ctx.moveTo(...L[0]); ctx.lineTo(...L[1]); ctx.lineTo(...L[2]); ctx.stroke(); });
      ctx.lineWidth = 44 + extra * 5; ctx.beginPath(); ctx.moveTo(0, -300); ctx.lineTo(0, -215); ctx.stroke();
      ctx.fillStyle = col; ctx.beginPath(); torso.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); if (extra) { ctx.lineWidth = 5; ctx.stroke(); } else ctx.fill();
      ctx.beginPath(); ctx.ellipse(0, -290, 64 + extra * 2.5, 72 + extra * 2.5, 0, 0, 7); ctx.fill();
      ctx.restore();
    });
    // gözler (yüz ayrıntısı yok)
    [-22, 22].forEach(dx => { ctx.save(); ctx.fillStyle = PAL.ink; ctx.globalAlpha *= 0.7; ctx.beginPath(); ctx.ellipse(dx, -268, 6, 7, 0, 0, 7); ctx.fill(); ctx.restore(); });
    const cns = o.cns ?? 1, pns = o.pns ?? 1, hi = o.hi;
    // çevresel sinirler
    if (pns > 0) { ctx.save(); ctx.globalAlpha *= pns;
      const nerve = (pts, sd) => stroke(ctx, pts, { w: 2.4, color: '#5A4A3A', dry: false, seed: sd, taper: 0.3 });
      limbs.forEach((L, i) => { const off = i < 2 ? 0 : 0; const pts = cr([[0, i < 2 ? -205 : 40], L[0], L[1], L[2]], 10); nerve(pts, 9100 + i);
        [0.35, 0.6, 0.85].forEach((f, j) => { const p = pts[Math.floor(f * (pts.length - 1))], q = pts[Math.floor(f * (pts.length - 1)) + 2]; const dx = q[0] - p[0], dy = q[1] - p[1], d = Math.hypot(dx, dy) || 1; line(ctx, p, [p[0] + (dx / d) * 18 - (dy / d) * 22 * (j % 2 ? 1 : -1), p[1] + (dy / d) * 18 + (dx / d) * 22 * (j % 2 ? 1 : -1)], { w: 1.6, color: '#5A4A3A', dry: false }); });
        [[-1, 0.4], [0, 0.7], [1, 0.4]].forEach(([d, l], j) => { const E2 = L[2], E1 = L[1]; const a = Math.atan2(E2[1] - E1[1], E2[0] - E1[0]) + d * 0.5; line(ctx, E2, [E2[0] + Math.cos(a) * 30 * l, E2[1] + Math.sin(a) * 30 * l], { w: 1.6, color: '#5A4A3A', dry: false }); }); });
      for (let yy = -170; yy <= 20; yy += 38) [-1, 1].forEach(sd => line(ctx, [0, yy], [sd * 80, yy + 22], { w: 1.8, color: '#5A4A3A', dry: false, bend: 0.1 * sd, seed: 9200 + yy }));
      ctx.restore(); }
    // merkezî sinir sistemi
    if (cns > 0) { ctx.save(); ctx.globalAlpha *= cns;
      const dim = part => (hi && hi !== part) ? 0.35 : 1;
      ctx.save(); ctx.globalAlpha *= dim('brain'); const br = K.blob(0, -312, 50, 36, 9301, 0.06); P.fillPts(ctx, br, '#DCE6C4'); wash(ctx, br, F.CNS, 0.55, 9302, { bleed: 1, blooms: 0 }); stroke(ctx, br, { w: 2.6, closed: true, seed: 9303, color: F.CNS_D }); ctx.restore();
      ctx.save(); ctx.globalAlpha *= dim('cord'); stroke(ctx, [[0, -282], [0, -200], [2, -80], [0, 40]], { w: 11, color: F.CNS_D, taper: 0.05, dry: false }); stroke(ctx, [[0, -282], [0, -200], [2, -80], [0, 40]], { w: 6, color: '#9DBB6A', taper: 0.05, dry: false }); ctx.restore();
      ctx.restore(); }
    ctx.restore();
    const tr = p => [x + p[0] * s, y + p[1] * s];
    return { brain: tr([0, -312]), eye: tr([22, -268]), neck: tr([0, -230]), cordMid: tr([0, -100]), cordBot: tr([0, 40]), handR: tr(limbs[0][2]), elbowR: tr(limbs[0][1]), shR: tr(limbs[0][0]), handL: tr(limbs[1][2]), footR: tr(limbs[2][2]), head: tr([0, -290]), tr };
  };
  // yandan baş şeması (yüz sağa bakar). hi: 'brain'|'cereb'|'medulla'|'cord'
  F.HEAD = cr([[440, 900], [432, 700], [360, 560], [330, 420], [380, 280], [520, 200], [680, 220], [790, 320], [805, 420], [855, 505], [812, 540], [822, 585], [800, 612], [790, 660], [720, 700], [660, 720], [650, 900]], 8);
  F.head = (ctx, o = {}) => {
    const hi = o.hi, dim = part => hi && hi !== part ? 0.3 : 1, glow = part => hi === part;
    P.fillPts(ctx, F.HEAD, F.SKIN); stroke(ctx, F.HEAD, { w: 3, seed: 9401 });
    // kafatası ve omurga (kemik korunma) — kesikli çizgi
    ctx.save(); ctx.globalAlpha *= 0.5 * (o.bone ?? 1); INK.dashed(ctx, cr([[395, 560], [365, 420], [405, 290], [525, 225], [670, 243], [765, 330], [780, 420]], 8), { w: 3, color: '#8A6A45' }); ctx.restore();
    const vert = []; for (let i = 0; i < 5; i++) vert.push([478 + i * 1, 640 + i * 52]);
    vert.forEach(([vx, vy], i) => { const v = K.rrect(vx, vy, 70, 38, 10); ctx.save(); ctx.globalAlpha *= 0.6 * (o.bone ?? 1); P.fillPts(ctx, v, '#EFE4CC'); stroke(ctx, v, { w: 2, closed: true, dry: false, color: '#8A6A45', seed: 9410 + i }); ctx.restore(); });
    const part = (name, fn) => { ctx.save(); ctx.globalAlpha *= dim(name); if (glow(name)) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.8)'; ctx.shadowBlur = 30; fn(true); ctx.restore(); } fn(false); ctx.restore(); };
    part('brain', () => { const b = K.blob(575, 390, 205, 140, 9420, 0.05); P.fillPts(ctx, b, '#E4ECCD'); wash(ctx, b, F.CNS, 0.5, 9421, { bleed: 1.5, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 9422, color: F.CNS_D });
      [[470, 330, 540, 300, 600, 340], [620, 300, 690, 320, 720, 380], [450, 420, 520, 400, 580, 440], [610, 420, 670, 450, 740, 430]].forEach((q, i) => stroke(ctx, P.bez([q[0], q[1]], [q[2], q[3]], [q[4], q[5]], 12), { w: 2, color: F.CNS_D, alpha: 0.5, dry: false, seed: 9430 + i })); });
    part('cereb', () => { const c = K.blob(450, 545, 82, 50, 9440, 0.04); P.fillPts(ctx, c, '#D2E0B0'); wash(ctx, c, F.CNS, 0.6, 9441, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 3, closed: true, seed: 9442, color: F.CNS_D });
      for (let i = 0; i < 4; i++) stroke(ctx, P.arc(450, 545 + 18 - i * 12, 70 - i * 6, Math.PI * 1.1, Math.PI * 1.9, 12, 30 - i * 3), { w: 1.6, color: F.CNS_D, alpha: 0.55, dry: false }); });
    part('medulla', () => { const m = [[515, 505], [560, 505], [552, 625], [522, 625]]; P.fillPts(ctx, m, '#BFD38F'); stroke(ctx, m.concat([m[0]]), { w: 3, closed: true, seed: 9450, color: F.CNS_D }); });
    part('cord', () => { const c = [[522, 625], [552, 625], [545, 900], [525, 900]]; P.fillPts(ctx, c, '#A9C476'); stroke(ctx, [[522, 625], [525, 900]], { w: 3, seed: 9451, color: F.CNS_D }); stroke(ctx, [[552, 625], [545, 900]], { w: 3, seed: 9452, color: F.CNS_D }); });
    return { brain: [620, 350], cereb: [420, 560], medulla: [540, 580], cord: [535, 780], skull: [370, 400], spine: [478, 800] };
  };
  F.ball = (ctx, x, y, r, rot = 0) => { const p = circlePts(x, y, r, r, 30); P.fillPts(ctx, p, '#F4C77A'); wash(ctx, p, PAL.light, 0.6, 9500, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: 3, closed: true, dry: false });
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); stroke(ctx, P.arc(-r * 1.4, 0, r * 1.1, -0.75, 0.75, 16), { w: 2.2, dry: false }); stroke(ctx, P.arc(r * 1.4, 0, r * 1.1, Math.PI - 0.75, Math.PI + 0.75, 16), { w: 2.2, dry: false }); line(ctx, [0, -r], [0, r], { w: 2.2, dry: false }); ctx.restore(); };
  // bir yol boyunca ilerleyen sinyal (kehribar nokta + iz)
  F.pulse = (ctx, pts, u, o = {}) => { if (u <= 0 || u >= 1.001) return; const n = pts.length - 1; const f = Math.min(u, 1) * n, i = Math.min(n - 1, Math.floor(f)); const p = E.mix(pts[i], pts[i + 1], f - i);
    P.drawOn(ctx, pts.slice(0, i + 2), 1, { w: o.w ?? 5, color: o.color ?? F.SIG, alpha: 0.7 }); inkDot(ctx, p[0], p[1], o.r ?? 9, { color: '227,160,58' }); };
  G.F09 = F;
})(window);

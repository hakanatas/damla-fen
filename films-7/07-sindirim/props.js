// props.js — Film 7/07 · ortak KIT (6/09'dan kopya, 7. sınıf) + filme özel çizimler (F07)
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

// ---------------- F07: sade önden gövde şeması + sindirim kanalı ve yardımcı organlar ----------------
// Dünya koordinatları (x ≈ 340–830, y ≈ 160–905). Ders kitabı üslubunda şematik, ölçekli değildir.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot } = G.INK;
  const K = G.KIT, F = {};
  F.SKIN = '#F1E4D2';
  F.C = { gut: '#D98C7A', gutD: '#9C5A4A', liver: '#8A4B3A', panc: '#E0B35A', small: '#E6A889', large: '#C98E6B', sec: '#C07F1E' };
  const cr = (pts, n = 8) => {
    const out = []; for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
      for (let j = 0; j < n; j++) { const t = j / n, t2 = t * t, t3 = t2 * t; out.push([0, 1].map(k => 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3))); } }
    out.push(pts[pts.length - 1]); return out; };
  F.cr = cr;
  const closed = (pts, n) => { const c = cr(pts.concat([pts[0], pts[1]]), n); return c.slice(n, c.length - n + 1); };
  // polyline yardımcıları
  F.len = pts => { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return L; };
  F.at = (pts, u) => { const L = F.len(pts) * E.clamp(u); let acc = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (acc + d >= L) { const f = d ? (L - acc) / d : 0; return E.mix(pts[i - 1], pts[i], f); } acc += d; } return pts[pts.length - 1]; };
  F.upto = (pts, u) => { const L = F.len(pts) * E.clamp(u); let acc = 0; const out = [pts[0]]; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (acc + d >= L) { out.push(E.mix(pts[i - 1], pts[i], d ? (L - acc) / d : 0)); return out; } out.push(pts[i]); acc += d; } return out; };

  // gövde silüeti (baş, boyun, gövde, kollar) — yüz ayrıntısı yok, yalnızca göz noktaları
  F.silhouette = (ctx, o = {}) => {
    const torso = closed([[528, 398], [440, 410], [372, 448], [352, 560], [374, 720], [388, 905], [732, 905], [746, 720], [768, 560], [748, 448], [680, 410], [592, 398]], 6);
    const arms = [[[378, 455], [334, 650], [318, 870]], [[742, 455], [786, 650], [802, 870]]];
    [[PAL.ink, 1], [F.SKIN, 0]].forEach(([col, ex]) => {
      ctx.save(); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (ex) ctx.globalAlpha *= 0.55;
      arms.forEach(A => { ctx.lineWidth = 56 + ex * 5; ctx.beginPath(); ctx.moveTo(...A[0]); ctx.lineTo(...A[1]); ctx.lineTo(...A[2]); ctx.stroke(); });
      ctx.lineWidth = 66 + ex * 5; ctx.beginPath(); ctx.moveTo(560, 300); ctx.lineTo(560, 410); ctx.stroke();
      ctx.beginPath(); torso.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); if (ex) { ctx.lineWidth = 5; ctx.stroke(); } else ctx.fill();
      ctx.beginPath(); ctx.ellipse(560, 250, 76 + ex * 2.5, 88 + ex * 2.5, 0, 0, 7); ctx.fill();
      ctx.restore();
    });
    [-26, 26].forEach(dx => { ctx.save(); ctx.fillStyle = PAL.ink; ctx.globalAlpha *= 0.7; ctx.beginPath(); ctx.ellipse(560 + dx, 232, 6, 7, 0, 0, 7); ctx.fill(); ctx.restore(); });
    // gövdenin alt kenarı (kesit bitişi) soluk
    ctx.save(); ctx.globalAlpha *= 0.5; INK.dashed(ctx, F.cr([[392, 904], [560, 910], [728, 904]], 30), { w: 2, on: 8, off: 8 }); ctx.restore();
  };

  // sindirim kanalının orta hattı (lokmanın yolu)
  const COIL = [[540, 716], [560, 742], [640, 752], [646, 772], [482, 778], [476, 798], [646, 804], [648, 826], [486, 830], [470, 846]];
  F.PATH = cr([[560, 298], [560, 332], [562, 366], [574, 450], [588, 532], [630, 568], [650, 610], [620, 646], [566, 652], [532, 668], [524, 698]].concat(COIL, [[452, 844], [444, 790], [448, 728], [520, 720], [610, 718], [672, 726], [680, 800], [670, 856], [620, 876], [578, 882], [576, 904]]), 6);
  // parçaların sınırları (PATH üzerindeki oran, yaklaşık) — sahneler lokmayı durak durak ilerletir
  F.STOPS = { mouth: 0.0, pharynx: 0.035, esoph: 0.1, stomach: 0.2, pylorus: 0.25, small: 0.36, smallEnd: 0.6, large: 0.72, anus: 1.0 };
  F.stopU = name => { // PATH üzerinde, verilen noktaya en yakın oran
    const P0 = { mouth: [560, 298], pharynx: [561, 345], esoph: [576, 460], stomach: [650, 610], pylorus: [566, 652], small: [640, 752], smallEnd: [470, 846], large: [520, 720], anus: [576, 904] }[name];
    let best = 0, bd = 1e9, L = F.len(F.PATH), acc = 0; for (let i = 1; i < F.PATH.length; i++) { acc += Math.hypot(F.PATH[i][0] - F.PATH[i - 1][0], F.PATH[i][1] - F.PATH[i - 1][1]); const d = Math.hypot(F.PATH[i][0] - P0[0], F.PATH[i][1] - P0[1]); if (d < bd) { bd = d; best = acc / L; } } return best; };

  const LIVER = closed([[392, 522], [470, 500], [566, 504], [626, 518], [600, 556], [540, 588], [470, 610], [410, 604], [386, 570]], 6);
  const STOM = closed([[584, 530], [606, 510], [652, 506], [694, 528], [714, 574], [706, 626], [680, 664], [636, 684], [592, 676], [566, 660], [562, 640], [596, 646], [632, 630], [648, 598], [638, 566], [610, 552]], 6);
  const PANC = closed([[552, 690], [600, 682], [660, 676], [700, 672], [706, 684], [662, 698], [604, 704], [556, 706]], 5);
  F.LIVER = LIVER; F.STOM = STOM; F.PANC = PANC;
  // o.hi: 'mouth'|'pharynx'|'esoph'|'stomach'|'small'|'large'|'liver'|'panc'  o.k: kanal çizim oranı (0..1), o.aux: yardımcı organ görünürlüğü
  F.organs = (ctx, o = {}) => {
    const hi = o.hi, dim = p => (hi && !(Array.isArray(hi) ? hi.includes(p) : hi === p)) ? 0.32 : 1;
    const kc = o.k ?? 1, aux = o.aux ?? 1;
    const part = (name, fn) => { ctx.save(); ctx.globalAlpha *= dim(name); fn(); ctx.restore(); };
    const glow = name => hi && (Array.isArray(hi) ? hi.includes(name) : hi === name);
    // karaciğer (arkada)
    if (aux > 0) part('liver', () => { ctx.save(); ctx.globalAlpha *= aux; if (glow('liver')) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.9)'; ctx.shadowBlur = 28; P.fillPts(ctx, LIVER, '#E9C9B8'); ctx.restore(); }
      P.fillPts(ctx, LIVER, '#E9C9B8'); wash(ctx, LIVER, F.C.liver, 0.55, 7101, { bleed: 1.5, blooms: 1 }); stroke(ctx, LIVER, { w: 2.6, closed: true, seed: 7102, color: '#5E3226' }); ctx.restore(); });
    // ağız ve yutak
    const kseg = (a, b) => E.clamp((kc - a) / (b - a));
    part('mouth', () => { const m = circlePts(560, 298, 30 * Math.max(0.05, kseg(0, 0.03)), 13, 30); if (kc > 0) { P.fillPts(ctx, m, '#B8645A', 0.85); stroke(ctx, m, { w: 2.2, closed: true, dry: false, color: '#6A2E26' });
      ctx.save(); ctx.fillStyle = '#FBF8F1'; for (let i = -2; i <= 2; i++) ctx.fillRect(560 + i * 9 - 3.5, 287, 7, 6); ctx.restore(); } });
    part('pharynx', () => { const k = kseg(0.02, 0.06); if (k <= 0) return; const f = [[544, 316], [576, 316], [570, 358 * 1], [550, 358]]; ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, f, F.C.gut, 0.75); stroke(ctx, f.concat([f[0]]), { w: 2, closed: true, dry: false, color: F.C.gutD }); ctx.restore(); });
    // yemek borusu
    part('esoph', () => { const k = kseg(0.05, 0.16); if (k <= 0) return; const tube = cr([[560, 356], [566, 420], [578, 480], [588, 534]], 8); const pp = F.upto(tube, k);
      stroke(ctx, pp, { w: 18, color: F.C.gutD, taper: 0.02, dry: false }); stroke(ctx, pp, { w: 12, color: '#E7B2A4', taper: 0.02, dry: false }); });
    // mide
    part('stomach', () => { const k = kseg(0.15, 0.3); if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; if (glow('stomach')) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.9)'; ctx.shadowBlur = 26; P.fillPts(ctx, STOM, '#F2D2C8'); ctx.restore(); }
      P.fillPts(ctx, STOM, '#F2D2C8'); wash(ctx, STOM, F.C.gut, 0.55, 7110, { bleed: 1.2, blooms: 1 }); stroke(ctx, STOM, { w: 2.8, closed: true, seed: 7111, color: F.C.gutD });
      [[616, 540, 690, 590], [630, 600, 690, 640]].forEach((q, i) => stroke(ctx, F.cr([[q[0], q[1]], [(q[0] + q[2]) / 2 + 6, (q[1] + q[3]) / 2 - 8], [q[2], q[3]]], 8), { w: 1.5, alpha: 0.45, color: F.C.gutD, dry: false, seed: 7112 + i }));
      ctx.restore(); });
    // pankreas (midenin arkasında, altında)
    if (aux > 0) part('panc', () => { ctx.save(); ctx.globalAlpha *= aux; if (glow('panc')) { ctx.save(); ctx.shadowColor = 'rgba(227,160,58,0.9)'; ctx.shadowBlur = 24; P.fillPts(ctx, PANC, '#F3E0B4'); ctx.restore(); }
      P.fillPts(ctx, PANC, '#F3E0B4'); wash(ctx, PANC, F.C.panc, 0.6, 7120, { bleed: 1, blooms: 0 }); stroke(ctx, PANC, { w: 2.2, closed: true, seed: 7121, color: '#8A6A2A' }); ctx.restore(); });
    // ince bağırsak (onikiparmak kısmı dahil, kıvrımlı tüp)
    part('small', () => { const k = kseg(0.25, 0.62); if (k <= 0) return; const tube = cr([[566, 652], [532, 668], [524, 698]].concat(COIL), 7); const pp = F.upto(tube, k);
      stroke(ctx, pp, { w: 17, color: '#A8664E', taper: 0.01, dry: false }); stroke(ctx, pp, { w: 11, color: '#F0C3AA', taper: 0.01, dry: false }); });
    // kalın bağırsak (çerçeve) + anüs
    part('large', () => { const k = kseg(0.6, 1.0); if (k <= 0) return; const tube = cr([[470, 846], [452, 844], [444, 790], [448, 728], [520, 720], [610, 718], [672, 726], [680, 800], [670, 856], [620, 876], [578, 882], [576, 900]], 8); const pp = F.upto(tube, k);
      stroke(ctx, pp, { w: 30, color: '#8E5A3E', taper: 0.01, dry: false }); stroke(ctx, pp, { w: 23, color: '#E3BC9C', taper: 0.01, dry: false });
      for (let i = 4; i < pp.length - 6; i += 5) { const a = pp[i - 1], b = pp[i + 1]; const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1; line(ctx, [pp[i][0] - dy / d * 10, pp[i][1] + dx / d * 10], [pp[i][0] + dy / d * 10, pp[i][1] - dx / d * 10], { w: 1.4, alpha: 0.45, color: '#8E5A3E', dry: false, seed: 7130 + i }); }
      if (k > 0.98) inkDot(ctx, 576, 902, 4); });
    // safra ve pankreas öz suyu kanalları
    if ((o.ducts ?? 0) > 0) { ctx.save(); ctx.globalAlpha *= o.ducts; stroke(ctx, cr([[520, 592], [528, 632], [530, 668]], 8), { w: 4, color: '#6E8A3A', dry: false }); stroke(ctx, cr([[600, 694], [560, 690], [534, 684]], 8), { w: 4, color: '#8A6A2A', dry: false }); ctx.restore(); }
  };
  // lokma (besin) — PATH üzerinde u konumunda; boy küçülür (sindirim)
  F.bolus = (ctx, u, o = {}) => { const p = F.at(F.PATH, u); const r = o.r ?? E.lerp(12, 5, E.clamp((u - 0.2) / 0.5));
    const b = circlePts(p[0], p[1], r, r * 0.85, 16); P.fillPts(ctx, b, '#E8D27A', 0.95); wash(ctx, b, PAL.life, 0.5, 7140, { bleed: 0.5, blooms: 0 }); stroke(ctx, b, { w: 1.8, closed: true, dry: false }); return p; };
  // yarım elma
  F.apple = (ctx, x, y, s, bite = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const a = closed([[0, -40], [30, -46], [48, -20], [44, 20], [20, 44], [-20, 44], [-44, 20], [-48, -20], [-30, -46]], 6); P.fillPts(ctx, a, '#F4E3B0'); wash(ctx, a, '#B5553F', 0.5, 7150, { bleed: 1, blooms: 0 }); stroke(ctx, a, { w: 3, closed: true, seed: 7151 });
    if (bite > 0) { const bb = circlePts(46, -8, 22, 24, 20); P.fillPts(ctx, bb, '#F7EEDB'); stroke(ctx, P.arc(46, -8, 22, Math.PI * 0.55, Math.PI * 1.45, 12, 24), { w: 2.4, dry: false }); }
    line(ctx, [0, -42], [4, -62], { w: 4 }); const lf = closed([[4, -56], [22, -70], [34, -62], [18, -52]], 4); P.fillPts(ctx, lf, PAL.life, 0.7); stroke(ctx, lf, { w: 2, closed: true, dry: false });
    ctx.restore(); };
  // enzim sembolü (yapısı verilmez: yalnızca "makas" benzeri bir işaret)
  F.enzyme = (ctx, x, y, s, open = 0.5) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const jaw = a => closed([[0, 0], [Math.cos(a) * 46, Math.sin(a) * 46 - 6], [Math.cos(a) * 52, Math.sin(a) * 52 + 8]], 3);
    [-1, 1].forEach(sd => { const a = sd * open * 0.6; const j = [[0, 0], [52 * Math.cos(a) , 52 * Math.sin(a)], [40 * Math.cos(a + sd * 0.25), 40 * Math.sin(a + sd * 0.25)]]; });
    const body = circlePts(-10, 0, 30, 26, 24); P.fillPts(ctx, body, '#F6D9A0'); wash(ctx, body, PAL.light, 0.6, 7160, { bleed: 1, blooms: 0 }); stroke(ctx, body, { w: 2.6, closed: true, dry: false });
    [-1, 1].forEach(sd => { const a = sd * (0.12 + open * 0.5); const tip = [14 + Math.cos(a) * 44, Math.sin(a) * 44]; const pp = [[14, sd * 6], [14 + Math.cos(a) * 20, Math.sin(a) * 20 + sd * 6], tip]; stroke(ctx, pp, { w: 6, color: '#C07F1E', dry: false, taper: 0.3 }); });
    ctx.restore(); };
  // besin zinciri (kimyasal sindirim modeli): n boncuk, cut 0..1 ayrılma
  F.chain = (ctx, x, y, n, cut, o = {}) => { const gap = 46; const cols = ['#E8D27A', '#D9A86A', '#E8D27A', '#C9B45A', '#D9A86A', '#E8D27A'];
    for (let i = 0; i < n; i++) { const off = (i - (n - 1) / 2); const px = x + off * gap * (1 + cut * 0.9) , py = y + (cut > 0 ? Math.sin(i * 2.1) * 26 * cut : 0);
      if (i < n - 1 && cut < 0.5) { ctx.save(); ctx.globalAlpha *= 1 - cut * 2; line(ctx, [px + 14, py], [px + gap - 14, py], { w: 4, dry: false }); ctx.restore(); }
      const c = circlePts(px, py, 17 * (1 - cut * 0.35), 17 * (1 - cut * 0.35), 16); P.fillPts(ctx, c, cols[i % cols.length], 0.95); stroke(ctx, c, { w: 2, closed: true, dry: false, seed: 7170 + i }); } };
  G.F07 = F;
})(window);

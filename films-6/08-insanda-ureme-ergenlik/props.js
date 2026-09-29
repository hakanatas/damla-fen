// props.js — Film 6/08 · ortak KIT (6. sınıf Ünite 3 filmleri 08–10'da aynı kopya) + filme özel çizimler (F08)
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

// ---------------- F08: üreme ve ergenlik şemaları (ders kitabı üslubunda, sade, etiketli) ----------------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot } = G.INK;
  const K = G.KIT, F = {};
  F.ORG = '#EAD3C4'; F.ORGW = '#B8786A';
  // yumurta hücresi (büyük, çekirdekli)
  F.egg = (ctx, x, y, r, o = {}) => {
    const glow = o.glow ?? 0;
    if (glow > 0) { const g = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 1.6); g.addColorStop(0, `rgba(227,160,58,${0.35 * glow})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.6, 0, 7); ctx.fill(); }
    const halo = circlePts(x, y, r * 1.12, r * 1.12, 70); stroke(ctx, halo, { w: 2, closed: true, alpha: 0.35, dry: false, color: K.LIFE_D });
    const c = K.blob(x, y, r, r, 5001, 0.02); P.fillPts(ctx, c, '#F6ECCF'); wash(ctx, c, PAL.life, 0.22, 5002, { bleed: 2, blooms: 2 });
    // besin (sarı tanecikler)
    const R = INK.rng(5003); ctx.save(); ctx.fillStyle = PAL.light; for (let i = 0; i < 40; i++) { const a = R() * 6.28, d = Math.sqrt(R()) * r * 0.85; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, r * 0.025 + 1, 0, 7); ctx.fill(); } ctx.restore();
    const n = circlePts(x - r * 0.15, y - r * 0.1, r * 0.2, r * 0.2, 30); P.fillPts(ctx, n, '#8E6A8C', 0.55); stroke(ctx, n, { w: 2, closed: true, dry: false });
    stroke(ctx, c, { w: Math.max(2, r * 0.02), closed: true, seed: 5004, color: K.LIFE_D });
  };
  // sperm (baş + kuyruk). dir: radyan, t: kuyruk dalgası
  F.sperm = (ctx, x, y, s, dir, t) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(dir); ctx.scale(s, s);
    const tail = []; for (let i = 0; i <= 30; i++) { const u = i / 30; tail.push([-14 - u * 110, Math.sin(u * 9 - t * 14) * 7 * u]); }
    stroke(ctx, tail, { w: 2.4, taper: 0.5, dry: false, color: K.LIFE_D, noBoil: true });
    const h = circlePts(0, 0, 16, 10, 24); P.fillPts(ctx, h, '#DDE6C3'); stroke(ctx, h, { w: 2.4, closed: true, dry: false, color: K.LIFE_D });
    ctx.restore();
  };
  // dişi üreme sistemi (önden şema). returns anchors
  F.female = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const A = {};
    // rahim (armut)
    const ut = P.bez([-10, 150], [-40, 120], [-60, 60], 10).concat(P.bez([-60, 60], [-110, -40], [-90, -80], 14), P.bez([-90, -80], [0, -110], [90, -80], 16), P.bez([90, -80], [110, -40], [60, 60], 14), P.bez([60, 60], [40, 120], [10, 150], 10)); ut.push(ut[0]);
    P.fillPts(ctx, ut, F.ORG); wash(ctx, ut, F.ORGW, 0.35, 5101, { bleed: 1.5, blooms: 1 }); stroke(ctx, ut, { w: 3, closed: true, seed: 5102 });
    // iç boşluk (üçgen)
    const cav = P.bez([-8, 118], [-30, 20], [-50, -52], 10).concat(P.bez([-50, -52], [0, -64], [50, -52], 10), P.bez([50, -52], [30, 20], [8, 118], 10)); cav.push(cav[0]);
    P.fillPts(ctx, cav, '#F7EAE0'); stroke(ctx, cav, { w: 1.8, closed: true, seed: 5103, alpha: 0.7, dry: false });
    // dölyolu
    const vg = [[-26, 150], [26, 150], [34, 300], [-34, 300]]; P.fillPts(ctx, vg, F.ORG); wash(ctx, vg, F.ORGW, 0.28, 5104, { bleed: 1, blooms: 0 });
    stroke(ctx, [[-26, 150], [-34, 300]], { w: 3, seed: 5105 }); stroke(ctx, [[26, 150], [34, 300]], { w: 3, seed: 5106 });
    stroke(ctx, [[-10, 152], [-12, 300]], { w: 1.4, alpha: 0.5, dry: false }); stroke(ctx, [[10, 152], [12, 300]], { w: 1.4, alpha: 0.5, dry: false });
    // yumurta kanalları + yumurtalıklar
    [-1, 1].forEach(sd => {
      const tube = P.bez([sd * 86, -76], [sd * 180, -130], [sd * 250, -70], 24).concat(P.bez([sd * 250, -70], [sd * 285, -40], [sd * 270, 0], 10));
      stroke(ctx, tube, { w: 14, color: PAL.ink, taper: 0.02, dry: false, seed: 5110 + sd }); stroke(ctx, tube, { w: 9, color: '#E5C2B2', taper: 0.02, dry: false, seed: 5111 + sd });
      // saçaklar
      for (let i = 0; i < 5; i++) { const ax = sd * (262 + (i - 2) * 8), ay = 4; line(ctx, [ax, ay], [ax + sd * (i - 2) * 6, ay + 26], { w: 2.2, dry: false, seed: 5120 + i }); }
      const ov = K.blob(sd * 190, 20, 44, 28, 5130 + sd, 0.06); P.fillPts(ctx, ov, '#F1DFC4'); wash(ctx, ov, PAL.life, 0.25, 5131 + sd, { bleed: 1, blooms: 0 }); stroke(ctx, ov, { w: 2.6, closed: true, seed: 5132 + sd });
      line(ctx, [sd * 150, 16], [sd * 70, -20], { w: 2.2, alpha: 0.6, dry: false }); // bağ
    });
    ctx.restore();
    return F.femaleA(x, y, s);
  };
  F.femaleA = (x, y, s) => {
    const tr = p => [x + p[0] * s, y + p[1] * s];
    const tube = sd => P.bez([sd * 86, -76], [sd * 180, -130], [sd * 250, -70], 24).concat(P.bez([sd * 250, -70], [sd * 285, -40], [sd * 270, 0], 10)).map(tr);
    return { ovL: tr([-190, 20]), ovR: tr([190, 20]), tubeL: tube(-1), tubeR: tube(1), uterus: tr([0, 0]), cav: tr([0, 30]), vag: tr([0, 250]), tubeMidR: tr([180, -104]) };
  };
  // bebek (kundak)
  F.baby = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bl = K.blob(0, 20, 60, 80, 5201, 0.05); P.fillPts(ctx, bl, PAL.white); wash(ctx, bl, PAL.light, 0.35, 5202, { bleed: 1, blooms: 0 }); stroke(ctx, bl, { w: 3, closed: true, seed: 5203 });
    const hd = circlePts(0, -58, 38, 36, 30); P.fillPts(ctx, hd, '#F0D5BC'); stroke(ctx, hd, { w: 3, closed: true, seed: 5204 });
    stroke(ctx, P.arc(-13, -58, 7, 0.2, Math.PI - 0.2, 8), { w: 2.2, dry: false }); stroke(ctx, P.arc(13, -58, 7, 0.2, Math.PI - 0.2, 8), { w: 2.2, dry: false });
    stroke(ctx, P.arc(0, -44, 8, 0.3, Math.PI - 0.3, 8), { w: 2.2, dry: false });
    stroke(ctx, P.bez([-50, -10], [0, 20], [50, -10], 12), { w: 2.2, alpha: 0.6, dry: false });
    ctx.restore();
  };
  // fetüs / embriyo (sade, kıvrık şekil). g: 0 (embriyo) .. 1 (fetüs)
  F.fetus = (ctx, x, y, s, g) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sac = circlePts(0, 0, 90, 90, 50); P.fillPts(ctx, sac, '#EEF1E0'); stroke(ctx, sac, { w: 2.2, closed: true, alpha: 0.6, dry: false, color: K.LIFE_D });
    const hr = 20 + g * 14;
    const bodyP = P.bez([hr * 0.6, -20], [55, 20], [10, 50], 14).concat(P.bez([10, 50], [-40, 40], [-hr * 0.4, 0], 12)); bodyP.push(bodyP[0]);
    P.fillPts(ctx, bodyP, '#F0D0BC'); stroke(ctx, bodyP, { w: 2.6, closed: true, seed: 5301 });
    const hd = circlePts(-4, -26, hr, hr * 0.95, 30); P.fillPts(ctx, hd, '#F0D0BC'); stroke(ctx, hd, { w: 2.6, closed: true, seed: 5302 });
    if (g > 0.5) { inkDot(ctx, -12, -28, 2.6); line(ctx, [0, 30], [22, 22], { w: 2, dry: false }); line(ctx, [18, 0], [34, -4], { w: 2, dry: false }); }
    ctx.restore();
  };
  // küçük hücre kümesi (bölünen zigot)
  F.cluster = (ctx, x, y, r, n) => {
    const pos = n <= 1 ? [[0, 0]] : n <= 2 ? [[-0.5, 0], [0.5, 0]] : n <= 4 ? [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]] : [[-0.6, -0.6], [0.1, -0.7], [0.7, -0.2], [-0.7, 0.1], [0, 0], [0.6, 0.5], [-0.3, 0.7], [0.2, 0.2]];
    const rr = n <= 1 ? r : n <= 2 ? r * 0.55 : n <= 4 ? r * 0.5 : r * 0.38;
    stroke(ctx, circlePts(x, y, r * 1.18, r * 1.18, 50), { w: 2, closed: true, alpha: 0.4, dry: false, color: K.LIFE_D });
    pos.forEach(([px, py], i) => { const c = circlePts(x + px * r * 0.7, y + py * r * 0.7, rr, rr, 26); P.fillPts(ctx, c, '#F6ECCF'); wash(ctx, c, PAL.life, 0.25, 5400 + i, { bleed: 0.6, blooms: 0 }); stroke(ctx, c, { w: 2, closed: true, dry: false, color: K.LIFE_D }); });
  };
  // kapı pervazı boy çizgileri
  F.door = (ctx, x, y0, y1) => {
    const fr = [[x, y1 + 10], [x, y0], [x + 400, y0], [x + 400, y1 + 10]];
    const fp = fr.concat([[x + 360, y1 + 10], [x + 360, y0 + 40], [x + 40, y0 + 40], [x + 40, y1 + 10]]);
    P.fillPts(ctx, fp, '#E3CFAE'); wash(ctx, fp, '#8A6A45', 0.25, 5501, { bleed: 1, blooms: 1 });
    stroke(ctx, fr, { w: 3.4, seed: 5502 }); stroke(ctx, [[x + 40, y1 + 10], [x + 40, y0 + 40], [x + 360, y0 + 40], [x + 360, y1 + 10]], { w: 2.4, seed: 5503 });
    ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = '#8A6A45'; ctx.fillRect(x + 42, y0 + 42, 316, y1 - y0 - 32); ctx.restore();
  };
  G.F08 = F;
})(window);

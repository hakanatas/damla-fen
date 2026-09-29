// props.js — 8. sınıf Ünite 3 ortak KIT (7/07'den kopya, 8. sınıf) + G8 genetik çizimleri (05-dna · 06-mitoz-mayoz · 07-kalitim'de aynı dosya)
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
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
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
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
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

// ---------------- G8: 8. sınıf "Yaşamın Gizemi" ortak çizimleri (05-dna · 06-mitoz-mayoz · 07-kalitim) ----------------
// Nükleotid, DNA merdiveni / çift sarmal, kromozom, hücre, bezelye, çaprazlama tablosu, üreme hücreleri.
// Şematik çizimlerdir; ölçekli değildir. Bağ adları, pürin/pirimidin ayrımı, bölünme evreleri çizilmez (TYMM).
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, noiseFn } = G.INK;
  const K = G.KIT, F = {};
  // baz renkleri (eşleşen çiftler: A–T kehribar/mavi, G–C yeşil/mor)
  F.BC = { A: '#E3A03A', T: '#2E6A8C', G: '#6F8A3A', C: '#8E6A8C' };
  F.BN = { A: 'Adenin', T: 'Timin', G: 'Guanin', C: 'Sitozin' };
  F.PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
  F.PHOS = '#B08A5A'; F.SUGAR = '#EAD9A8'; F.CELL = '#E2B48E'; F.NUC = '#8E6A8C';
  F.CH1 = '#2E6A8C'; F.CH2 = '#C07F1E';     // kromozom çiftinin iki üyesi (biri anneden, biri babadan)
  F.YEL = '#E2BE3C'; F.GRN = '#7FA04A';
  // baz uzunluğu (birim): A,G uzun; T,C kısa → doğru çiftlerde basamak boyu eşit olur
  F.BL = { A: 1.2, G: 1.2, T: 0.8, C: 0.8 };
  // uç şekli: A sivri çıkıntı ↔ T V-girinti; G yuvarlak çıkıntı ↔ C yuvarlak girinti
  F.TIP = { A: 'tab3', T: 'notch3', G: 'tabR', C: 'notchR' };

  // tek bir bazın gövdesi: yerel koordinatta 0'dan L'ye (+x), yarı yükseklik h
  function basePoly(L, h, tip) {
    const p = [[0, -h]]; const d = h * 0.9;
    if (tip === 'tab3') p.push([L, -h], [L + d, 0], [L, h]);
    else if (tip === 'notch3') p.push([L, -h], [L - d, 0], [L, h]);
    else if (tip === 'tabR') { p.push([L, -h]); for (let i = 1; i < 12; i++) { const a = -Math.PI / 2 + i / 12 * Math.PI; p.push([L + Math.cos(a) * d, Math.sin(a) * h]); } p.push([L, h]); }
    else { p.push([L, -h]); for (let i = 1; i < 12; i++) { const a = -Math.PI / 2 + i / 12 * Math.PI; p.push([L - Math.cos(a) * d, Math.sin(a) * h]); } p.push([L, h]); }
    p.push([0, h], [0, -h]); return p;
  }
  // baz çiz: (x,y) şekere bağlandığı nokta, ang yönü, u birim uzunluk (px), h yarı yükseklik
  F.base = (ctx, b, x, y, ang, u, h, o = {}) => {
    const L = F.BL[b] * u; const pts = basePoly(L, h, F.TIP[b]).map(([px, py]) => [x + Math.cos(ang) * px - Math.sin(ang) * py, y + Math.sin(ang) * px + Math.cos(ang) * py]);
    P.fillPts(ctx, pts, '#FBF8F1', 1); wash(ctx, pts, o.ghost ? '#B8B0A0' : F.BC[b], o.ghost ? 0.3 : 0.75, 5000 + b.charCodeAt(0) + (o.seed ?? 0), { bleed: 0.6, blooms: 0 });
    stroke(ctx, pts, { w: o.w ?? 2, closed: true, dry: false, seed: 5010 + (o.seed ?? 0), alpha: o.ghost ? 0.5 : 1 });
    if (o.letter !== false && u * F.BL[b] > 26) {
      const cx = x + Math.cos(ang) * L * 0.45, cy = y + Math.sin(ang) * L * 0.45;
      ctx.save(); ctx.font = `700 ${Math.round(h * 1.35)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.ink; ctx.globalAlpha *= o.ghost ? 0.5 : 1; ctx.fillText(b, cx, cy + 1); ctx.restore();
    }
    return [x + Math.cos(ang) * L, y + Math.sin(ang) * L];
  };
  F.sugar = (ctx, x, y, r, seed = 0) => {
    const p = []; for (let i = 0; i <= 5; i++) { const a = -Math.PI / 2 + i / 5 * Math.PI * 2; p.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); }
    P.fillPts(ctx, p, F.SUGAR, 1); stroke(ctx, p, { w: Math.max(1.4, r * 0.09), closed: true, dry: false, seed: 5100 + seed });
  };
  F.phos = (ctx, x, y, r, seed = 0, letter = true) => {
    const c = circlePts(x, y, r, r, 22); P.fillPts(ctx, c, '#EBDCC6', 1); wash(ctx, c, F.PHOS, 0.6, 5200 + seed, { bleed: 0.4, blooms: 0 });
    stroke(ctx, c, { w: Math.max(1.4, r * 0.1), closed: true, dry: false, seed: 5210 + seed });
    if (letter && r > 13) { ctx.save(); ctx.font = `700 ${Math.round(r * 1.1)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.ink; ctx.fillText('P', x, y + 1); ctx.restore(); }
  };
  // tam nükleotid (büyük gösterim): fosfat – şeker – baz; (x,y) şekerin merkezi, s ölçek, dir +1 sağa / -1 sola
  F.nucleotide = (ctx, x, y, s, b, o = {}) => {
    const dir = o.dir ?? 1; const ang = dir > 0 ? 0 : Math.PI;
    const px = x - dir * 78 * s, py = y - 44 * s;
    line(ctx, [px, py], [x, y], { w: 3 * s, dry: false, seed: 5300 });
    line(ctx, [x + dir * 28 * s, y], [x + dir * 44 * s, y], { w: 3 * s, dry: false, seed: 5301 });
    F.phos(ctx, px, py, 26 * s, 1);
    F.sugar(ctx, x, y, 32 * s, 2);
    F.base(ctx, b, x + dir * 42 * s, y, ang, 110 * s, 22 * s, { seed: o.seed ?? 3 });
    return { phos: [px, py], sugar: [x, y], base: [x + dir * (42 + 60) * s, y] };
  };

  // DNA: o = {x, y (üst basamak), n, gap, u (baz birimi px), seq, partners (isteğe bağlı yanlış eşler), twist 0..1, phase,
  //          show (kaç basamak görünür), dx(i) basamak kayması, L/R: {k, ghost} zincir görünürlüğü, detail (şeker/fosfat), h, letters}
  F.dna = (ctx, o) => {
    const n = o.n, gap = o.gap ?? 60, u = o.u ?? 60, h = o.h ?? 13, seq = o.seq, tw = o.twist ?? 0, ph = o.phase ?? 0;
    const W = 2 * u; // doğru çiftte toplam basamak boyu (1.2 + 0.8) u
    const show = o.show ?? n; const rows = []; const SL = o.L ?? { k: 1 }, SR = o.R ?? { k: 1 };
    for (let i = 0; i < n; i++) {
      const th = ph + i * 0.63; const c = E.lerp(1, Math.cos(th), tw); const z = Math.sin(th) * tw;
      const dx = o.dx ? o.dx(i) : 0, y = o.y + i * gap;
      rows.push({ i, y, c, z, xl: o.x + dx - (W / 2) * c, xr: o.x + dx + (W / 2) * c, b: seq[i], p: (o.partners && o.partners[i]) || F.PAIR[seq[i]], k: E.clamp(show - i) });
    }
    const drawStrand = (side, pass) => {
      const S = side < 0 ? SL : SR; if ((S.k ?? 1) <= 0) return;
      for (let i = 0; i < n - 1; i++) {
        const A = rows[i], B = rows[i + 1]; if (A.k <= 0 || B.k <= 0) continue;
        const zz = side < 0 ? -(A.z + B.z) / 2 : (A.z + B.z) / 2; const front = zz >= -0.05;
        if ((pass === 'back') === front) continue;
        const ax = side < 0 ? A.xl : A.xr, bx = side < 0 ? B.xl : B.xr;
        ctx.save(); ctx.globalAlpha *= (front ? 1 : 0.45) * Math.min(A.k, B.k) * (S.k ?? 1);
        line(ctx, [ax, A.y], [bx, B.y], { w: o.detail ? 3 : 7 * (front ? 1 : 0.7), dry: false, seed: 5400 + i + (side > 0 ? 50 : 0), color: S.ghost ? '#9C8F7C' : (o.detail ? PAL.ink : '#6B5A44'), taper: 0.02 });
        if (o.detail) F.phos(ctx, (ax + bx) / 2, (A.y + B.y) / 2, 13 * (o.ds ?? 1), i + (side > 0 ? 40 : 0), false);
        ctx.restore();
      }
    };
    drawStrand(-1, 'back'); drawStrand(1, 'back');
    rows.forEach(r => {
      if (r.k <= 0) return; const ac = Math.abs(r.c);
      ctx.save(); ctx.globalAlpha *= r.k;
      const hh = h * (0.6 + 0.4 * ac);
      if (tw > 0 && r.z < 0) ctx.globalAlpha *= 0.6;
      if (ac > 0.12) {
        const uu = u * ac, dirL = r.c >= 0 ? 0 : Math.PI, dirR = r.c >= 0 ? Math.PI : 0;
        if ((SL.k ?? 1) > 0) { ctx.save(); ctx.globalAlpha *= SL.k ?? 1; F.base(ctx, r.b, r.xl, r.y, dirL, uu, hh, { seed: r.i, letter: o.letters !== false, ghost: SL.ghost }); ctx.restore(); }
        if ((SR.k ?? 1) > 0) { ctx.save(); ctx.globalAlpha *= SR.k ?? 1; F.base(ctx, r.p, r.xr, r.y, dirR, uu, hh, { seed: r.i + 20, letter: o.letters !== false, ghost: SR.ghost }); ctx.restore(); }
      }
      if (o.detail) { if ((SL.k ?? 1) > 0) F.sugar(ctx, r.xl, r.y, 15 * (o.ds ?? 1), r.i); if ((SR.k ?? 1) > 0) F.sugar(ctx, r.xr, r.y, 15 * (o.ds ?? 1), r.i + 30); }
      ctx.restore();
    });
    drawStrand(-1, 'front'); drawStrand(1, 'front');
    return rows;
  };

  // kromozom: (x,y) merkez, len boy, col renk; o: {dup (eşlenmiş, X biçimi), rot, w, split 0..1 (kardeş kopyaların ayrılması)}
  F.chromo = (ctx, x, y, len, col, o = {}) => {
    const w = o.w ?? Math.max(9, len * 0.2), rot = o.rot ?? 0;
    const arm = (a, sx, seed) => {
      ctx.save(); ctx.translate(x + sx, y); ctx.rotate(rot + a);
      const hl = len / 2, pw = v => w / 2 * (1 - 0.38 * Math.exp(-Math.pow(v / (len * 0.1), 2)));
      const pp = [];
      for (let i = 0; i <= 16; i++) { const v = -hl + i / 16 * len; pp.push([pw(v), v]); }
      for (let i = 1; i < 10; i++) { const aa = i / 10 * Math.PI; pp.push([Math.cos(aa) * w / 2, hl + Math.sin(aa) * w / 2]); }
      for (let i = 16; i >= 0; i--) { const v = -hl + i / 16 * len; pp.push([-pw(v), v]); }
      for (let i = 1; i < 10; i++) { const aa = Math.PI + i / 10 * Math.PI; pp.push([Math.cos(aa) * w / 2, -hl + Math.sin(aa) * w / 2]); }
      pp.push(pp[0]);
      P.fillPts(ctx, pp, '#FBF8F1', 1); wash(ctx, pp, col, 0.75, 5500 + seed, { bleed: 0.5, blooms: 0 });
      stroke(ctx, pp, { w: Math.max(1.4, w * 0.12), closed: true, dry: false, seed: 5510 + seed });
      const tc = o.tip && (o.tipArm === undefined || o.tipArm === seed) ? o.tip : null;
      if (tc) { ctx.save(); P.path(ctx, pp); ctx.clip(); const tb = [[-w, -hl - w], [w, -hl - w], [w, -hl + len * 0.32], [-w, -hl + len * 0.32], [-w, -hl - w]]; P.fillPts(ctx, tb, '#FBF8F1', 1); wash(ctx, tb, tc, 0.8, 5520 + seed, { bleed: 0.3, blooms: 0 }); ctx.restore(); stroke(ctx, pp, { w: Math.max(1.4, w * 0.12), closed: true, dry: false, seed: 5510 + seed }); }
      for (let i = 1; i < 4; i++) { const vy = -hl + i / 4 * len + (i === 2 ? len * 0.12 : 0); line(ctx, [-w * 0.35, vy], [w * 0.35, vy], { w: 1.2, alpha: 0.35, dry: false }); }
      ctx.restore();
    };
    if (o.dup) { const sp = (o.split ?? 0); const g = w * 0.42 + sp * len * 0.6; arm(-0.18 * (1 - sp), -g, 1); arm(0.18 * (1 - sp), g, 2); if (sp < 0.2) inkDot(ctx, x, y, w * 0.22); }
    else arm(0, 0, 3);
  };

  // hücre: yuvarlak (hayvan hücresi benzeri), o: {nuc: true, nr, tint, seed, membraneOnly}
  F.cell = (ctx, x, y, rx, ry, o = {}) => {
    const b = K.blob(x, y, rx, ry, o.seed ?? 5600, 0.05, 80);
    P.fillPts(ctx, b, '#FBF4EA', 1); wash(ctx, b, o.tint ?? F.CELL, o.tintA ?? 0.35, (o.seed ?? 5600) + 1, { bleed: 1, blooms: 1 });
    stroke(ctx, b, { w: o.lw ?? 3, closed: true, seed: (o.seed ?? 5600) + 2 });
    if (o.nuc) {
      const nr = o.nr ?? Math.min(rx, ry) * 0.62; const nb = K.blob(x, y, nr, nr * 0.94, (o.seed ?? 5600) + 3, 0.04, 60);
      P.fillPts(ctx, nb, '#F4ECF2', 1); wash(ctx, nb, F.NUC, o.nucA ?? 0.25, (o.seed ?? 5600) + 4, { bleed: 0.8, blooms: 0 });
      INK.dashed(ctx, densify(nb, 4), { w: 2, on: 10, off: 6, seed: (o.seed ?? 5600) + 5 });
    }
    return b;
  };
  function densify(pts, step) { const out = []; for (let i = 0; i < pts.length - 1; i++) { const [a, b] = [pts[i], pts[i + 1]]; const d = Math.hypot(b[0] - a[0], b[1] - a[1]); const n = Math.max(1, Math.ceil(d / step)); for (let j = 0; j < n; j++) out.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]); } out.push(pts[pts.length - 1]); return out; }
  F.densify = densify;

  // bezelye tohumu: col 'Y' sarı / 'G' yeşil, wr: buruşuk
  F.pea = (ctx, x, y, r, col, o = {}) => {
    const b = K.blob(x, y, r, r * 0.94, o.seed ?? 5700, o.wr ? 0.16 : 0.03, 40);
    P.fillPts(ctx, b, '#FBF8F1', 1); wash(ctx, b, col === 'Y' ? F.YEL : F.GRN, 0.85, (o.seed ?? 5700) + 1, { bleed: 0.5, blooms: 0 });
    stroke(ctx, b, { w: Math.max(1.4, r * 0.09), closed: true, dry: false, seed: (o.seed ?? 5700) + 2 });
    if (o.wr) for (let i = 0; i < 3; i++) line(ctx, [x - r * 0.5 + i * r * 0.4, y - r * 0.4], [x - r * 0.3 + i * r * 0.35, y + r * 0.3], { w: 1.4, alpha: 0.6, dry: false, bend: 0.2 });
    ctx.save(); ctx.globalAlpha *= 0.55; P.fillPts(ctx, circlePts(x - r * 0.35, y - r * 0.35, r * 0.18, r * 0.12, 12), '#FFFFFF'); ctx.restore();
  };
  // bezelye baklası (açık), peas: ['Y','G',...]
  F.pod = (ctx, x, y, w, peas, o = {}) => {
    const h = w * 0.28; const top = P.bez([x - w / 2, y], [x, y - h * 1.3], [x + w / 2, y - 6], 20), bot = P.bez([x + w / 2, y - 6], [x, y + h * 1.1], [x - w / 2, y], 20);
    const pod = top.concat(bot); P.fillPts(ctx, pod, '#E9F0D6', 1); wash(ctx, pod, PAL.life, 0.5, 5750, { bleed: 1, blooms: 0 }); stroke(ctx, pod, { w: 2.6, closed: true, seed: 5751 });
    const n = peas.length; peas.forEach((c, i) => F.pea(ctx, x - w * 0.36 + i * (w * 0.72 / Math.max(1, n - 1)), y - h * 0.05, h * 0.42, c, { seed: 5760 + i, wr: o.wr }));
  };
  // bezelye çiçeği (mor / beyaz)
  F.flower = (ctx, x, y, s, purple) => {
    for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2 - Math.PI / 2; const pc = K.blob(x + Math.cos(a) * 20 * s, y + Math.sin(a) * 20 * s, 18 * s, 14 * s, 5800 + i, 0.06, 20);
      P.fillPts(ctx, pc, '#FBF8F1'); if (purple) wash(ctx, pc, '#7A4E8C', 0.6, 5810 + i, { bleed: 0.5, blooms: 0 }); stroke(ctx, pc, { w: 1.8, closed: true, dry: false, seed: 5820 + i }); }
    inkDot(ctx, x, y, 6 * s, { color: '192,127,30' });
  };
  // bezelye bitkisi: boy (px)
  F.plant = (ctx, x, y, hgt, seed = 0) => {
    const st = P.bez([x, y], [x + 16, y - hgt * 0.5], [x - 4, y - hgt], 20); stroke(ctx, st, { w: 4, color: '#4E6628', seed: 5900 + seed });
    for (let i = 1; i <= Math.max(2, Math.round(hgt / 60)); i++) {
      const k = i / (Math.max(2, Math.round(hgt / 60)) + 0.6), p = st[Math.round(k * 20)], sd = i % 2 ? 1 : -1;
      const lf = K.blob(p[0] + sd * 22, p[1], 22, 11, 5910 + i + seed, 0.06, 24); P.fillPts(ctx, lf, '#E9F0D6'); wash(ctx, lf, PAL.life, 0.6, 5920 + i, { bleed: 0.5, blooms: 0 }); stroke(ctx, lf, { w: 1.8, closed: true, dry: false });
    }
  };

  // çaprazlama (Punnett) tablosu. o: {x, y (sol üst), cs (hücre boyu), top:[g,g], left:[g,g], t, t0 (ilk hücre), dt, trait: {S:'Y'} baskın harf}
  F.geno = (a, b) => (a === a.toUpperCase() ? a + b : b + a);
  F.punnett = (ctx, o) => {
    const { x, y, cs, top, left, t } = o; const k0 = E.se(t, o.tIn ?? o.t0 - 1.5, (o.tIn ?? o.t0 - 1.5) + 0.8);
    if (k0 <= 0) return;
    ctx.save(); ctx.globalAlpha *= k0;
    const grid = [[x + cs, y + cs], [x + 3 * cs, y + cs], [x + 3 * cs, y + 3 * cs], [x + cs, y + 3 * cs], [x + cs, y + cs]];
    P.fillPts(ctx, grid, '#FBF8F1', 0.9);
    stroke(ctx, grid, { w: 3, closed: true, seed: 6000 });
    line(ctx, [x + 2 * cs, y + cs], [x + 2 * cs, y + 3 * cs], { w: 2.4, dry: false, seed: 6001 });
    line(ctx, [x + cs, y + 2 * cs], [x + 3 * cs, y + 2 * cs], { w: 2.4, dry: false, seed: 6002 });
    const gam = (g, gx, gy, sd) => { const c = circlePts(gx, gy, cs * 0.3, cs * 0.3, 26); P.fillPts(ctx, c, '#FBF8F1'); wash(ctx, c, o.gcol ?? PAL.life, 0.25, 6010 + sd, { bleed: 0.5, blooms: 0 }); stroke(ctx, c, { w: 2.2, closed: true, dry: false, seed: 6020 + sd });
      ctx.save(); ctx.font = `700 ${Math.round(cs * 0.36)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.ink; ctx.fillText(g, gx, gy + 2); ctx.restore(); };
    top.forEach((g, i) => gam(g, x + (1.5 + i) * cs, y + cs * 0.5, i));
    left.forEach((g, i) => gam(g, x + cs * 0.5, y + (1.5 + i) * cs, i + 5));
    ctx.restore();
    const res = [];
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c, ta = o.t0 + idx * (o.dt ?? 0.8), k = E.se(t, ta, ta + 0.5, 'out');
      const gt = F.geno(left[r], top[c]); res.push(gt); if (k <= 0) continue;
      const cx = x + (1.5 + c) * cs, cy = y + (1.5 + r) * cs; const dom = gt[0] === gt[0].toUpperCase();
      ctx.save(); ctx.globalAlpha *= k;
      if (o.hi && o.hi(gt, idx) > 0) { const hb = [[cx - cs / 2 + 5, cy - cs / 2 + 5], [cx + cs / 2 - 5, cy - cs / 2 + 5], [cx + cs / 2 - 5, cy + cs / 2 - 5], [cx - cs / 2 + 5, cy + cs / 2 - 5], [cx - cs / 2 + 5, cy - cs / 2 + 5]]; wash(ctx, hb, o.hiCol ?? PAL.light, 0.4 * o.hi(gt, idx), 6040 + idx, { bleed: 1, blooms: 0 }); }
      ctx.font = `700 ${Math.round(cs * 0.3)}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(gt, cx - cs * 0.14, cy + cs * 0.1);
      if (o.pea !== false) F.pea(ctx, cx + cs * 0.27, cy + cs * 0.02, cs * 0.13, dom ? 'Y' : 'G', { seed: 6050 + idx, wr: o.wr && !dom });
      ctx.restore();
    }
    return res;
  };

  // üreme hücreleri
  F.egg = (ctx, x, y, r, lab) => {
    const c = K.blob(x, y, r, r, 6100, 0.03, 50); P.fillPts(ctx, c, '#FBF1E6'); wash(ctx, c, '#D9A07A', 0.35, 6101, { bleed: 1, blooms: 1 }); stroke(ctx, c, { w: 3, closed: true, seed: 6102 });
    stroke(ctx, circlePts(x, y, r * 1.08, r * 1.08, 50), { w: 1.4, closed: true, alpha: 0.4, dry: false });
    if (lab) K.text(ctx, lab, x, y + r * 0.2, { size: r * 0.6, align: 'center' });
  };
  F.sperm = (ctx, x, y, s, t, lab, ang = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    const tail = []; for (let i = 0; i <= 30; i++) { const u = i / 30; tail.push([-20 * s - u * 110 * s, Math.sin(u * 9 - t * 10) * 9 * s * u]); }
    stroke(ctx, tail, { w: 3 * s, dry: false, taper: 0.6, seed: 6110 });
    const hd = circlePts(0, 0, 26 * s, 19 * s, 30); P.fillPts(ctx, hd, '#EEF2F5'); wash(ctx, hd, PAL.water, 0.35, 6111, { bleed: 0.5, blooms: 0 }); stroke(ctx, hd, { w: 2.6, closed: true, dry: false, seed: 6112 });
    if (lab) { ctx.rotate(-ang); K.text(ctx, lab, 0, 9 * s, { size: 26 * s, align: 'center' }); }
    ctx.restore();
  };
  // küçük büyüteç halkası (yakınlaştırma geçişi)
  F.lensRing = (ctx, x, y, r, k = 1) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; stroke(ctx, circlePts(x, y, r, r, 60), { w: 4, closed: true, seed: 6200 }); line(ctx, [x + r * 0.72, y + r * 0.72], [x + r * 1.2, y + r * 1.2], { w: 9, taper: 0.02, seed: 6201 }); ctx.restore(); };
  // ok + etiket (işaret çizgisi)
  F.tag = (ctx, txt, from, to, k, o = {}) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; INK.leader(ctx, from, to, { w: 1.8, bend: o.bend ?? 0.15 }); K.text(ctx, txt, from[0], from[1] + (o.dy ?? -8), { size: o.size ?? 36, align: o.align ?? 'center', color: o.color }); ctx.restore(); };

  G.G8 = F;
})(window);

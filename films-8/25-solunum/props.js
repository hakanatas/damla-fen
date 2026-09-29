// props.js — 8. sınıf Ünite 7 (Filmler 24–25) ortak çizim yardımcıları → window.U7
// Aynı dosya 24-fotosentez ve 25-solunum klasörlerinde birebir kopyadır.
// Kaynaklar: films-7/22-besin-zinciri/props.js (F722: kart, tablo, görev kartı, canlılar),
//            films-7/10-solunum/props.js (K.kid: çocuk büstü), films-6/06-bitkilerde-ureme/props.js (yaprak).
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, wobble, inkDot, hatch, noiseFn } = G.INK;
  const U = {};
  const RED = '#A23A2A', AMB = '#C07F1E', LIFE = PAL.life, LIFE_D = '#4E6626', LIFE_L = '#DDE6C2', BROWN = '#8A6A45', HEAT = '#B5553F';
  const O2C = '#2E6A8C', CO2C = '#6E6A64', SUG = '#C07F1E', MITO = '#C9805A';
  Object.assign(U, { RED, AMB, LIFE, LIFE_D, LIFE_L, BROWN, HEAT, O2C, CO2C, SUG, MITO });
  const closeP = pts => pts.concat([pts[0]]);
  U.closeP = closeP;
  U.rr = (x, y, w, h, r, n = 5) => {
    const p = [];
    [[x + w - r, y + r, -Math.PI / 2, 0], [x + w - r, y + h - r, 0, Math.PI / 2], [x + r, y + h - r, Math.PI / 2, Math.PI], [x + r, y + r, Math.PI, 1.5 * Math.PI]]
      .forEach(([cx, cy, a0, a1]) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    return p.concat([p[0]]);
  };
  U.blob = (cx, cy, rx, ry, seed, amp = 0.08, n = 70, rot = 0) => { const nz = noiseFn(seed); const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const k = 1 + nz(a * 1.6) * amp; const x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; p.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); } p[n] = p[0]; return p; };
  U.shape = (ctx, pts, col, a = 0.5, seed = 1, o = {}) => {
    const p = (pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) ? pts : closeP(pts);
    P.fillPts(ctx, p, o.base ?? PAL.white, o.baseA ?? 0.96);
    if (col) wash(ctx, p, col, a, seed, { bleed: o.bleed ?? 1, blooms: o.blooms ?? 0 });
    if (o.w !== 0) stroke(ctx, p, { w: o.w ?? 2.6, closed: true, seed: seed + 1, color: o.color, dry: false });
  };
  U.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.fillText(txt, 0, 0);
    ctx.restore();
  };
  U.wfit = (ctx, txt, x, y, k, size, maxW, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px Kalam`;
    while (ctx.measureText(txt).width > maxW && sz > 20) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px Kalam`; }
    ctx.restore(); return P.write(ctx, txt, x, y, k, Object.assign({}, o, { size: sz }));
  };
  // ---- alt simgeli kimya metni: "CO_2" → CO₂ (küçük ve aşağı kaydırılmış rakam) ----
  const parts = str => { const out = []; const re = /_(\d+)/g; let last = 0, m; while ((m = re.exec(str))) { if (m.index > last) out.push([str.slice(last, m.index), 0]); out.push([m[1], 1]); last = re.lastIndex; } if (last < str.length) out.push([str.slice(last), 0]); return out; };
  U.richW = (ctx, str, size, weight = 700) => { ctx.save(); let W = 0; parts(str).forEach(([s, sub]) => { ctx.font = `${weight} ${sub ? Math.round(size * 0.62) : size}px Kalam`; W += ctx.measureText(s).width; }); ctx.restore(); return W; };
  U.rich = (ctx, str, x, y, k = 1, o = {}) => {
    if (k <= 0) return 0;
    const size = o.size ?? 44, weight = o.weight ?? 700, ss = Math.round(size * 0.62), ps = parts(str);
    const W = U.richW(ctx, str, size, weight), al = o.align ?? 'left', x0 = al === 'center' ? x - W / 2 : al === 'right' ? x - W : x;
    ctx.save();
    ctx.translate(x0, y); ctx.rotate(o.rot ?? -0.012);
    if (k < 1) { ctx.beginPath(); ctx.rect(-10, -size * 1.2, (W + 20) * k, size * 1.8); ctx.clip(); }
    ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 0.95); ctx.textAlign = 'left';
    let cx = 0; ps.forEach(([s, sub]) => { ctx.font = `${weight} ${sub ? ss : size}px Kalam`; ctx.fillText(s, cx, sub ? size * 0.24 : 0); cx += ctx.measureText(s).width; });
    ctx.restore(); return W;
  };
  // gaz taneciği rozeti (CO₂ / O₂)
  U.gas = (ctx, x, y, kind, r = 30, o = {}) => {
    const col = kind === 'O_2' ? O2C : CO2C;
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1);
    const c = circlePts(x, y, r, r, 26); P.fillPts(ctx, c, PAL.white, 0.95); wash(ctx, c, col, 0.35, 8100 + (kind.length), { bleed: 0.6, blooms: 0 });
    stroke(ctx, c, { w: 2.2, closed: true, dry: false, color: col, seed: 8110 });
    U.rich(ctx, kind, x, y + r * 0.3, 1, { size: Math.round(r * 0.85), align: 'center', color: kind === 'O_2' ? '#1F4A63' : '#3E3A36', rot: 0 });
    ctx.restore();
  };
  // su damlası simgesi
  U.drop = (ctx, x, y, r = 16, o = {}) => {
    const pts = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; const q = Math.sin(a / 2); pts.push([x + Math.sin(a) * r * Math.pow(q, 1.2), y - Math.cos(a) * r * 1.2]); }
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1); P.fillPts(ctx, pts, '#CFE0EA', 0.95); wash(ctx, pts, PAL.water, 0.45, 8120, { bleed: 0.5, blooms: 0 }); stroke(ctx, pts, { w: 1.8, closed: true, dry: false, color: '#1F4A63' }); ctx.restore();
  };
  // besin (glikoz) altıgeni
  U.sugar = (ctx, x, y, r = 22, o = {}) => {
    const h = []; for (let i = 0; i <= 6; i++) { const a = i / 6 * Math.PI * 2 + Math.PI / 6; h.push([x + Math.cos(a) * r, y + Math.sin(a) * r]); }
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1); P.fillPts(ctx, h, '#F6E2B8', 0.98); wash(ctx, h, SUG, 0.5, 8130, { bleed: 0.5, blooms: 0 }); stroke(ctx, h, { w: 2, closed: true, dry: false, color: '#7A4E10' }); ctx.restore();
  };
  // ATP "enerji parası" (yapısı çizilmez)
  U.atp = (ctx, x, y, r = 30, o = {}) => {
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1);
    const c = circlePts(x, y, r, r, 28); P.fillPts(ctx, c, '#F8E3B0'); wash(ctx, c, PAL.light, 0.6, 8140, { bleed: 0.6, blooms: 0 });
    stroke(ctx, c, { w: 2.4, closed: true, dry: false, color: '#8A5A12' }); stroke(ctx, circlePts(x, y, r * 0.8, r * 0.8, 24), { w: 1.2, closed: true, dry: false, color: '#8A5A12', alpha: 0.6 });
    U.fit(ctx, 'ATP', x, y + r * 0.26, r * 1.5, Math.round(r * 0.72), { color: '#6A420C' });
    ctx.restore();
  };
  // ışık ışını (kehribar, dalgalı)
  U.ray = (ctx, a, b, k = 1, o = {}) => { if (k <= 0) return; const n = 40, pts = []; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; for (let i = 0; i <= n * k; i++) { const u = i / n, w = Math.sin(u * L / 18 + (o.ph ?? 0)) * (o.amp ?? 5); pts.push([a[0] + dx * u + nx * w, a[1] + dy * u + ny * w]); } if (pts.length > 1) stroke(ctx, pts, { w: o.w ?? 3.4, color: o.color ?? AMB, dry: false, taper: 0.1 }); if (k >= 0.98) G.INK.arrowHead(ctx, pts[pts.length - 3], pts[pts.length - 1], 14, { w: o.w ?? 3.4, color: o.color ?? AMB }); };

  U.card = (ctx, x, y, w, h, seed = 1, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = o.blur ?? 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, seed + 3, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed, color: o.color });
    return c;
  };
  U.stamp = (ctx, x, y, txt, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k), col = o.color ?? LIFE_D, size = o.size ?? 44;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12); ctx.scale(s, s);
    ctx.font = `700 ${size}px Kalam`; const w = ctx.measureText(txt).width + 40, h = size * 1.35;
    const b = U.rr(-w / 2, -h / 2, w, h, 10, 3); P.fillPts(ctx, b, PAL.white, 0.75);
    stroke(ctx, b, { w: 4, closed: true, color: col, seed: 17, dry: false });
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3);
    ctx.restore();
  };
  // etiket çipi (renkli yıkama)
  U.chip = (ctx, x, y, txt, col, k, size = 40, o = {}) => {
    if (k <= 0) return;
    const w = U.richW(ctx, o.rich ? txt : txt.replace(/_/g, ''), size) + 44;
    const b = U.rr(x - w / 2, y - size * 0.95, w, size * 1.45, 16, 4);
    ctx.save(); ctx.globalAlpha *= E.clamp(k * 1.5); P.fillPts(ctx, b, '#FBF8F1'); wash(ctx, b, col, 0.3, 7300 + (x | 0) % 97, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 7310 + (y | 0) % 13, dry: false }); ctx.restore();
    if (o.rich) U.rich(ctx, txt, x, y, k, { size, align: 'center' }); else P.write(ctx, txt, x, y, k, { size, align: 'center' });
  };
  U.damla = (ctx, t, o = {}) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'curious', look: [0.6, -0.2], blink: E.blink(t, o.bseed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.4], [1, 0.5]] }, o));
  U.wave = (t) => [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]];
  U.title = (ctx, t, head, unit, col) => {
    const t1 = E.e('title') + 1.2;
    if (t > t1) return;
    const k = Math.min(E.se(t, 0.3, 1.0), 1 - E.se(t, t1 - 0.6, t1));
    ctx.save(); ctx.globalAlpha = 0.84 * k; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 120, E.W, 270); ctx.restore();
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, head, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: col ?? LIFE }); ctx.restore(); }
  };
  U.endCard = (ctx, t, head, codes, col) => {
    const se = E.s('end'), ek = E.se(t, se, se + 0.8);
    if (ek <= 0) return;
    E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.94; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 400, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, head, 960, 485, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([600, 515], [960, 526], [1320, 510], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: col ?? LIFE });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 610, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 670, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 905, s: 0.85, view: 'front', expr: 'happy', t, seed: 1, arms: U.wave(t) });
    });
  };
  U.taskCard = (ctx, t, sk, k, lines, o = {}) => {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      const x0 = o.x ?? 300, x1 = o.x1 ?? 1620;
      const card = [[x0, 160], [x1, 150], [x1 + 10, 830], [x0 + 10, 842], [x0, 160]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.write(c, 'Sıra sende!', (x0 + x1) / 2, 270, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: o.col ?? LIFE_D });
      lines.forEach((s, i) => { const at = sk + 1.3 + i * (o.gap ?? 1.0); U.wfit(c, (i + 1) + '. ' + s, x0 + 90, 390 + i * 92, E.seg(t, at, at + 1.1), 46, o.maxW ?? 1100); });
      if (o.extra) o.extra(c);
    });
  };
  // güvenlik kartı (kırmızı yalnızca burada)
  U.safety = (ctx, t, t0, t1, lines, o = {}) => {
    const k = Math.min(E.se(t, t0, t0 + 0.6, 'out'), 1 - E.se(t, t1 - 0.5, t1)); if (k <= 0) return;
    E.layer(ctx, k, c => {
      const x0 = o.x ?? 360, y0 = o.y ?? 200, w = o.w ?? 1200, h = o.h ?? 90 + lines.length * 78;
      U.card(c, x0, y0, w, h, 9001, { tint: RED, tintA: 0.08, color: RED, w: 4 });
      const tx = x0 + 110, ty = y0 + h / 2;
      const tri = [[tx, ty - 62], [tx + 66, ty + 52], [tx - 66, ty + 52], [tx, ty - 62]]; P.fillPts(c, tri, '#F6E3DD'); stroke(c, tri, { w: 5, closed: true, color: RED, dry: false });
      U.fit(c, '!', tx, ty + 38, 60, 74, { color: RED });
      lines.forEach((l, i) => U.wfit(c, l, x0 + 220, y0 + 92 + i * 78, E.seg(t, t0 + 0.4 + i * 0.8, t0 + 1.4 + i * 0.8), 46, w - 260, { color: i === 0 ? RED : PAL.ink }));
    });
  };

  // ---------------- BİTKİLER ----------------
  U.leaf = (ctx, x, y, len, ang, seed, o = {}) => {
    const w = len * (o.wr ?? 0.42), pts = [];
    for (let i = 0; i <= 24; i++) { const u = i / 24; pts.push([u * len, -Math.sin(u * Math.PI) * w * (1 - 0.25 * u)]); }
    for (let i = 24; i >= 0; i--) { const u = i / 24; pts.push([u * len, Math.sin(u * Math.PI) * w * (1 - 0.25 * u)]); }
    const c = Math.cos(ang), s = Math.sin(ang); const P2 = pts.map(p => [x + p[0] * c - p[1] * s, y + p[0] * s + p[1] * c]);
    P.fillPts(ctx, P2, o.fill ?? '#DDE6C2'); wash(ctx, P2, o.col ?? LIFE, o.a ?? 0.6, seed, { bleed: 1, blooms: 0 }); stroke(ctx, P2, { w: o.w ?? 2.2, closed: true, seed: seed + 1, dry: false });
    if (o.vein !== false) line(ctx, [x, y], [x + len * 0.85 * c, y + len * 0.85 * s], { w: 1.2, dry: false, alpha: 0.6, seed: seed + 3 });
    return P2;
  };
  // saksıda bitki: (x,y) saksı ağzı ortası. o.wilt 0..1 (susuzluk), o.h yükseklik
  U.potPlant = (ctx, x, y, s, t = 0, o = {}) => {
    const wilt = o.wilt ?? 0, H = (o.h ?? 230) * s, sway = Math.sin(t * 0.9) * 3 * s;
    const top = [x + sway + wilt * 40 * s, y - H * (1 - wilt * 0.25)];
    stroke(ctx, P.bez([x, y], [x + wilt * 50 * s, y - H * 0.7], top, 20), { w: 5 * s, color: LIFE_D, seed: 8200, taper: 0.05 });
    [[0.35, -1], [0.5, 1], [0.68, -1], [0.82, 1], [1, -1]].forEach(([u, d], i) => {
      const px = x + (top[0] - x) * u, py = y + (top[1] - y) * u;
      const base = d > 0 ? -0.55 : Math.PI + 0.55, droop = wilt * 1.1 * (d > 0 ? 1 : -1);
      U.leaf(ctx, px, py, 78 * s * (1 - u * 0.25), base + droop, 8210 + i * 7, { fill: wilt > 0.5 ? '#E6E2C0' : '#DDE6C2', col: wilt > 0.5 ? '#9A9A4A' : LIFE });
    });
    const pot = [[x - 70 * s, y - 6 * s], [x + 70 * s, y - 6 * s], [x + 52 * s, y + 104 * s], [x - 52 * s, y + 104 * s]];
    U.shape(ctx, pot, HEAT, 0.5, 8250);
    const rim = [[x - 80 * s, y - 20 * s], [x + 80 * s, y - 20 * s], [x + 78 * s, y + 8 * s], [x - 78 * s, y + 8 * s]]; U.shape(ctx, rim, HEAT, 0.6, 8252);
    return top;
  };
  // ağaç / fidan: (x,y) taban. s ölçek
  U.tree = (ctx, x, y, s, t = 0, o = {}) => {
    line(ctx, [x, y], [x + 4 * s, y - 170 * s], { w: 16 * s, color: '#6E5234', seed: 8300, taper: 0.1 });
    line(ctx, [x + 2 * s, y - 110 * s], [x - 50 * s, y - 170 * s], { w: 6 * s, color: '#6E5234', seed: 8301, taper: 0.2 });
    line(ctx, [x + 3 * s, y - 130 * s], [x + 55 * s, y - 185 * s], { w: 6 * s, color: '#6E5234', seed: 8302, taper: 0.2 });
    const sw = Math.sin(t * 0.8) * 3 * s;
    [[0, -250, 130, 100], [-80, -200, 80, 64], [85, -205, 80, 62]].forEach(([dx, dy, rx, ry], i) => {
      const cr = wobble(circlePts(x + dx * s + sw, y + dy * s, rx * s, ry * s, 50), 7 * s, 8310 + i);
      P.fillPts(ctx, cr, '#DDE6C2'); wash(ctx, cr, LIFE, 0.55, 8320 + i, { bleed: 2, blooms: 1 }); stroke(ctx, cr, { w: 2.8, closed: true, seed: 8330 + i, dry: false });
    });
  };
  U.sapling = (ctx, x, y, s, t = 0) => {
    line(ctx, [x, y], [x + 2, y - 120 * s], { w: 4 * s, color: LIFE_D, seed: 8340, taper: 0.1 });
    [[0.45, -1], [0.65, 1], [0.85, -1], [1, 1]].forEach(([u, d], i) => U.leaf(ctx, x + 2 * u, y - 120 * s * u, 46 * s, d > 0 ? -0.6 : Math.PI + 0.6, 8350 + i * 5));
  };
  // büyük yaprak (yakın çekim): merkez (cx,cy), boy L, açı ang
  U.bigLeaf = (ctx, cx, cy, L, ang = -0.25, seed = 8400) => {
    const w = L * 0.38, pts = [];
    for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([u * L - L / 2, -Math.sin(u * Math.PI) * w * (1 - 0.3 * u) * (1 + 0.04 * Math.sin(u * 30))]); }
    for (let i = 40; i >= 0; i--) { const u = i / 40; pts.push([u * L - L / 2, Math.sin(u * Math.PI) * w * (1 - 0.3 * u) * (1 + 0.04 * Math.sin(u * 27))]); }
    const c = Math.cos(ang), s = Math.sin(ang), T = p => [cx + p[0] * c - p[1] * s, cy + p[0] * s + p[1] * c];
    const L2 = pts.map(T);
    P.fillPts(ctx, L2, '#DDE6C2'); wash(ctx, L2, LIFE, 0.62, seed, { bleed: 3, blooms: 2 }); stroke(ctx, L2, { w: 3.4, closed: true, seed: seed + 1 });
    stroke(ctx, [T([-L / 2 - 80, 6]), T([-L / 2, 0]), T([L * 0.45, 0])], { w: 4, seed: seed + 2, color: LIFE_D, dry: false });
    for (let i = 1; i < 7; i++) { const u = i / 7 - 0.5; [-1, 1].forEach(d => line(ctx, T([u * L, 0]), T([u * L + L * 0.1, d * w * 0.7 * Math.sin((u + 0.5) * Math.PI)]), { w: 1.6, dry: false, alpha: 0.7, color: LIFE_D, seed: seed + 10 + i * 2 + d })); }
    return { stem: T([-L / 2 - 80, 6]), T };
  };
  // kloroplast (tilakoit yığınları basit çizgiler)
  U.chloro = (ctx, x, y, rx, ry, rot = 0, seed = 1) => {
    const c = circlePts(x, y, rx, ry, 30, rot); P.fillPts(ctx, c, '#C9D9A0'); wash(ctx, c, LIFE, 0.6, 8500 + seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, c, { w: 1.8, closed: true, dry: false, color: LIFE_D, seed: 8510 + seed });
    const cs = Math.cos(rot), sn = Math.sin(rot);
    for (let i = -2; i <= 2; i++) { const px = x + i * rx * 0.32 * cs, py = y + i * rx * 0.32 * sn; for (let j = -1; j <= 1; j++) { const qx = px - j * 4 * sn, qy = py + j * 4 * cs; line(ctx, [qx - ry * 0.3 * sn * -1 - 5 * cs, qy - 5 * sn], [qx + 5 * cs, qy + 5 * sn], { w: 1.4, dry: false, color: LIFE_D, alpha: 0.8, seed: 8520 + i * 3 + j }); } }
  };
  // bitki hücresi (dikdörtgen çeper + kloroplastlar)
  U.plantCell = (ctx, x, y, w, h, seed = 1, o = {}) => {
    const b = U.rr(x - w / 2, y - h / 2, w, h, 16, 4);
    P.fillPts(ctx, b, '#EEF2DC'); wash(ctx, b, LIFE, 0.18, 8600 + seed, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 8610 + seed, color: LIFE_D });
    stroke(ctx, U.rr(x - w / 2 + 7, y - h / 2 + 7, w - 14, h - 14, 12, 4), { w: 1.4, closed: true, dry: false, alpha: 0.6 });
    const R = rng(8620 + seed); const n = o.n ?? 6;
    for (let i = 0; i < n; i++) { const a = i / n * 6.283 + R() * 0.4; U.chloro(ctx, x + Math.cos(a) * w * 0.3, y + Math.sin(a) * h * 0.3, w * 0.12, w * 0.07, a + 1.57, seed * 10 + i); }
  };
  // hayvan hücresi + mitokondri
  U.mito = (ctx, x, y, s = 1, rot = 0, seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    const b = circlePts(0, 0, 46, 24, 30); P.fillPts(ctx, b, '#F3D9C6'); wash(ctx, b, MITO, 0.6, 8700 + seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, dry: false, color: '#7A4630' });
    const cr = []; for (let i = 0; i <= 60; i++) { const u = i / 60; cr.push([-36 + u * 72, Math.sin(u * Math.PI * 7) * 14 * Math.sin(u * Math.PI)]); } stroke(ctx, cr, { w: 1.6, dry: false, color: '#7A4630', alpha: 0.8 });
    ctx.restore();
  };
  U.animalCell = (ctx, x, y, rx, ry, seed = 1, o = {}) => {
    const b = U.blob(x, y, rx, ry, 8800 + seed, 0.06);
    P.fillPts(ctx, b, '#F6E6DA'); wash(ctx, b, '#D9A78A', 0.35, 8810 + seed, { bleed: 1.5, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 8820 + seed });
    const nu = circlePts(x - rx * 0.1, y + ry * 0.05, rx * 0.22, ry * 0.24, 30); P.fillPts(ctx, nu, '#E4C2D0'); wash(ctx, nu, '#8E4A6A', 0.35, 8830 + seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, nu, { w: 2.2, closed: true, dry: false });
    if (o.mito !== false) (o.mitoAt ?? [[0.45, -0.35, 0.4], [0.5, 0.35, -0.5], [-0.5, -0.45, 2.6], [-0.45, 0.5, 0.9]]).forEach(([dx, dy, r], i) => U.mito(ctx, x + dx * rx, y + dy * ry, (o.ms ?? 1) * rx / 300, r, seed * 10 + i));
  };

  // ---------------- DENEY DÜZENEĞİ ----------------
  // LED masa lambası: (x,y) taban ortası; baş sağa bakar. on: 0..1 parlaklık, col: ışık rengi
  U.lamp = (ctx, x, y, s = 1, on = 1, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const base = [[-50, 0], [50, 0], [44, -16], [-44, -16]]; U.shape(ctx, base, '#6E6A64', 0.5, 8900);
    line(ctx, [0, -16], [-20, -140], { w: 7, seed: 8901, color: '#4A4640', dry: false });
    line(ctx, [-20, -140], [40, -200], { w: 7, seed: 8902, color: '#4A4640', dry: false });
    inkDot(ctx, -20, -140, 6);
    const head = [[30, -230], [80, -214], [96, -168], [52, -178]]; U.shape(ctx, head, '#6E6A64', 0.6, 8903);
    ctx.restore();
    return [x + 78 * s, y - 188 * s]; // ışığın çıktığı nokta
  };
  U.glow = (ctx, from, to, spread, k, col = '227,160,58') => {
    if (k <= 0) return; const dx = to[0] - from[0], dy = to[1] - from[1], L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
    const g = ctx.createLinearGradient(from[0], from[1], to[0], to[1]); g.addColorStop(0, `rgba(${col},${0.42 * k})`); g.addColorStop(1, `rgba(${col},${0.06 * k})`);
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(from[0] + nx * 12, from[1] + ny * 12); ctx.lineTo(to[0] + nx * spread, to[1] + ny * spread); ctx.lineTo(to[0] - nx * spread, to[1] - ny * spread); ctx.lineTo(from[0] - nx * 12, from[1] - ny * 12); ctx.closePath(); ctx.fill(); ctx.restore();
  };
  // su bitkisi (Elodea benzeri): kesik ucu yukarıda (x,y); aşağı doğru uzanır
  U.elodea = (ctx, x, y, len, seed = 1, t = 0) => {
    const stem = P.bez([x, y], [x + 10, y + len * 0.5], [x - 6 + Math.sin(t * 0.8) * 3, y + len], 20);
    stroke(ctx, stem, { w: 3.2, color: LIFE_D, seed: 8950 + seed, dry: false });
    for (let i = 2; i < 20; i += 2) { const p = stem[i]; for (let j = 0; j < 3; j++) { const a = j / 3 * 6.283 + i * 0.7; const lx = Math.cos(a) * 20, ly = Math.sin(a) * 6 - 6; const lf = circlePts(p[0] + lx * 0.6, p[1] + ly, 12, 4.5, 12, Math.atan2(ly, lx)); P.fillPts(ctx, lf, '#9DBA5E', 0.9); stroke(ctx, lf, { w: 1, closed: true, dry: false, color: LIFE_D, alpha: 0.8 }); } }
  };
  // kabarcıklar: (x,y) çıkış noktası, yüzey y=ys; rate kabarcık/sn; yalnızca t0 sonrası
  U.bubbles = (ctx, x, y, ys, t, t0, rate, o = {}) => {
    if (rate <= 0 || t < t0) return; const sp = o.speed ?? 110, life = (y - ys) / sp;
    const i1 = Math.floor((t - t0) * rate), i0 = Math.max(0, Math.floor((t - t0 - life) * rate));
    for (let i = i0; i <= i1; i++) { const te = t0 + i / rate, age = t - te; if (age < 0 || age > life) continue; const R = rng(9000 + i); const r = 3.5 + R() * 3; const px = x + Math.sin(i * 1.7 + age * 4) * 5, py = y - age * sp; stroke(ctx, circlePts(px, py, r, r, 12), { w: 1.6, closed: true, dry: false, color: O2C, noBoil: true }); }
  };
  // beher: sol üst (x,y), w,h; su seviyesi oranı lvl
  U.beaker = (ctx, x, y, w, h, lvl = 0.8, o = {}) => {
    const wy = y + h * (1 - lvl); const water = [[x + 4, wy], [x + w - 4, wy], [x + w - 4, y + h - 4], [x + 4, y + h - 4]];
    P.fillPts(ctx, water, o.tint ?? '#D5E4EC', 0.8); wash(ctx, water, PAL.water, 0.16, 9100, { bleed: 1, blooms: 0 });
    line(ctx, [x + 6, wy], [x + w - 6, wy], { w: 1.8, color: PAL.water, dry: false, alpha: 0.8 });
    stroke(ctx, [[x - 10, y - 6], [x, y], [x, y + h], [x + w, y + h], [x + w, y], [x + w + 10, y - 6]], { w: 3.2, seed: 9101, dry: false });
    for (let i = 1; i < 5; i++) line(ctx, [x + w - 34, y + h * i / 5], [x + w - 8, y + h * i / 5], { w: 1.4, dry: false, alpha: 0.6 });
    return wy;
  };
  U.ruler = (ctx, x0, y, pxPerCm, ncm, labels = [10, 20, 30, 40], o = {}) => {
    const r = [[x0 - 10, y - 12], [x0 + ncm * pxPerCm + 10, y - 12], [x0 + ncm * pxPerCm + 10, y + 26], [x0 - 10, y + 26]];
    U.shape(ctx, r, '#E3C27A', 0.4, 9200, { w: 2 });
    for (let i = 0; i <= ncm; i++) { const xx = x0 + i * pxPerCm; line(ctx, [xx, y - 12], [xx, y - 12 + (i % 10 === 0 ? 20 : i % 5 === 0 ? 13 : 7)], { w: 1.2, dry: false }); }
    labels.forEach(v => { if (v <= ncm) U.fit(ctx, String(v), x0 + v * pxPerCm, y + 22, 60, 20, { alpha: 0.8 }); });
  };
  U.thermo = (ctx, x, y, h, lvl, o = {}) => {
    const tube = U.rr(x - 9, y - h, 18, h, 9, 3); P.fillPts(ctx, tube, PAL.white); stroke(ctx, tube, { w: 2, closed: true, dry: false });
    const bulb = circlePts(x, y + 8, 16, 16, 20); P.fillPts(ctx, bulb, HEAT); stroke(ctx, bulb, { w: 2, closed: true, dry: false });
    P.fillPts(ctx, [[x - 4, y], [x + 4, y], [x + 4, y - h * lvl], [x - 4, y - h * lvl]], HEAT);
  };

  // ---------------- İNSAN VE CANLILAR (F722 ve K.kid'den uyarlandı) ----------------
  U.kid = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const skin = o.skin ?? '#F0D5BC', hairC = o.hairC ?? '#3B2A20', shirt = o.shirt ?? PAL.water;
    const body = P.bez([-110, 150], [-105, 40], [-40, 30], 12).concat([[40, 30]], P.bez([40, 30], [105, 40], [110, 150], 12)); body.push([-110, 150]);
    P.fillPts(ctx, body, PAL.white); wash(ctx, body, shirt, 0.55, 4400 + (o.seed ?? 0), { bleed: 1.2, blooms: 1 }); stroke(ctx, body, { w: 3, closed: true, seed: 4401 });
    stroke(ctx, P.bez([-26, 30], [0, 56], [26, 30], 10), { w: 2.4, seed: 4402, dry: false });
    const neck = [[-18, 0], [18, 0], [20, 34], [-20, 34]]; P.fillPts(ctx, neck, skin);
    if (o.hair === 'long') { [-1, 1].forEach(sd => P.fillPts(ctx, [[sd * 50, -96], [sd * 74, -70], [sd * 80, 26], [sd * 46, 26], [sd * 50, -60]], hairC, 0.92)); }
    const head = U.blob(0, -58, 58, 64, 4420 + (o.seed ?? 0), 0.03); P.fillPts(ctx, head, skin); stroke(ctx, head, { w: 3, closed: true, seed: 4421 });
    const cap = P.arc(0, -62, 62, Math.PI * 1.02, Math.PI * 1.98, 20, 66).concat(P.bez([60, -70], [10, -92], [-60, -66], 10));
    P.fillPts(ctx, cap, hairC, 0.95);
    const ex = o.expr ?? 'smile';
    [-22, 22].forEach(dx => { ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(dx, -58, 5.5, ex === 'tired' ? 3 : 7, 0, 0, 7); ctx.fill(); ctx.restore(); });
    if (ex === 'smile') stroke(ctx, P.arc(0, -40, 18, 0.25, Math.PI - 0.25, 12), { w: 2.8, dry: false, seed: 4430 });
    else if (ex === 'o' || ex === 'tired') stroke(ctx, circlePts(0, -30, 7, 9, 14), { w: 2.6, closed: true, dry: false });
    else line(ctx, [-12, -30], [12, -34], { w: 2.8, dry: false });
    ctx.save(); ctx.globalAlpha = ex === 'tired' ? 0.45 : 0.25; ctx.fillStyle = '#D9826C'; ctx.beginPath(); ctx.ellipse(-36, -38, 10, 6, 0, 0, 7); ctx.ellipse(36, -38, 10, 6, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.restore();
  };
  const LEAF = '#4E6B2A';
  U.grass = (ctx, x, y, s = 1, t = 0, seed = 1) => {
    ctx.save(); ctx.translate(x, y + 50 * s); ctx.scale(s, s);
    const R = rng(2400 + seed);
    for (let i = 0; i < 11; i++) { const dx = (i - 5) * 9 + (R() - 0.5) * 6, h = 60 + R() * 50, sw = Math.sin(t * 1.4 + i + seed) * 5; stroke(ctx, P.bez([dx, 0], [dx + sw * 0.5, -h * 0.5], [dx + sw + (i - 5) * 3, -h], 10), { w: 3, color: i % 2 ? PAL.life : LEAF, dry: false, seed: 2401 + i }); }
    ctx.restore();
  };
  U.hopper = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-50, 6], [-30, -14], [30, -16], [52, -4], [40, 12], [-40, 16]];
    U.shape(ctx, b, '#7FA23A', 0.7, 2410);
    const hd = circlePts(52, -6, 14, 13, 16); P.fillPts(ctx, hd, '#9CBB55'); stroke(ctx, hd, { w: 2, closed: true, dry: false }); inkDot(ctx, 58, -9, 2.6);
    stroke(ctx, P.bez([56, -16], [70, -50], [96, -58], 10), { w: 1.4, dry: false }); stroke(ctx, P.bez([50, -16], [56, -54], [80, -66], 10), { w: 1.4, dry: false });
    stroke(ctx, [[0, -8], [-36, -44], [-58, 16]], { w: 4, color: '#5C7A28', dry: false, seed: 2411 });
    line(ctx, [20, 10], [28, 26], { w: 2, dry: false }); line(ctx, [30, 8], [44, 24], { w: 2, dry: false });
    ctx.restore();
  };
  U.frog = (ctx, x, y, s = 1, flip = 1) => {
    ctx.save(); ctx.translate(x, y + 20 * s); ctx.scale(s * 1.5 * flip, s * 1.5);
    const leg = [[-30, 0], [-44, -10], [-30, -22], [-14, -10]]; P.fillPts(ctx, leg, '#6F8A3A', 0.9); stroke(ctx, leg, { w: 2, seed: 731 });
    const b = [[-34, 0], [-30, -26], [0, -40], [30, -30], [36, -8], [26, 0], [-34, 0]];
    P.fillPts(ctx, b, '#8FAE52', 1); wash(ctx, b, PAL.life, 0.5, 732, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 733 });
    [[8, -40], [26, -36]].forEach(([ex, ey]) => { P.fillPts(ctx, circlePts(ex, ey, 8, 8, 14), PAL.white); stroke(ctx, circlePts(ex, ey, 8, 8, 14), { w: 1.6, closed: true, dry: false }); inkDot(ctx, ex + 1, ey, 2.8); });
    line(ctx, [14, -18], [34, -16], { w: 1.4, dry: false, bend: -0.1 });
    ctx.restore();
  };
  U.snake = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([-80 + u * 150, 14 + Math.sin(u * 9 + t * 2) * 16 * (1 - u * 0.3) - u * 10]); }
    stroke(ctx, pts, { w: 22, color: '#8A6A45', dry: false, taper: 0.35, seed: 2420 }); stroke(ctx, pts, { w: 8, color: '#C9A46A', dry: false, taper: 0.4, seed: 2421 });
    const h = pts[40]; const hd = circlePts(h[0] + 8, h[1] - 4, 16, 11, 16); P.fillPts(ctx, hd, '#8A6A45'); stroke(ctx, hd, { w: 2, closed: true, dry: false }); inkDot(ctx, h[0] + 14, h[1] - 8, 2.4);
    ctx.restore();
  };
  U.mouse = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y + 10 * s); ctx.scale(s, s);
    const b = circlePts(0, 0, 44, 26, 28); U.shape(ctx, b, '#9A9387', 0.6, 2440);
    const hd = [[34, -18], [70, 2], [34, 18]]; U.shape(ctx, hd, '#9A9387', 0.6, 2441);
    P.fillPts(ctx, circlePts(30, -26, 12, 12, 14), '#D9A7B0'); stroke(ctx, circlePts(30, -26, 12, 12, 14), { w: 1.8, closed: true, dry: false });
    inkDot(ctx, 50, -4, 2.4); inkDot(ctx, 70, 2, 2.6);
    stroke(ctx, P.bez([-42, 4], [-80, 30], [-96, -6], 12), { w: 2, dry: false });
    ctx.restore();
  };
  U.sparrow = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x - 10 * s, y + 18 * s); ctx.scale(s * 1.4, s * 1.4);
    const b = [[-30, -6], [-10, -26], [16, -26], [26, -14], [16, 0], [-10, 2], [-30, -6]];
    P.fillPts(ctx, b, '#E8D6B4', 1); wash(ctx, b, '#8A6A45', 0.55, 751, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2, closed: true, seed: 752 });
    const hd = circlePts(22, -30, 13, 12, 18); P.fillPts(ctx, hd, '#C9A46A', 1); stroke(ctx, hd, { w: 1.8, closed: true, dry: false });
    P.fillPts(ctx, [[33, -32], [44, -28], [33, -25]], '#E3A03A'); inkDot(ctx, 25, -33, 2.2);
    line(ctx, [-30, -6], [-46, 2], { w: 2.6, dry: false }); line(ctx, [0, 1], [-2, 14], { w: 1.4, dry: false }); line(ctx, [8, 0], [8, 14], { w: 1.4, dry: false });
    ctx.restore();
  };
  U.mushroom = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y + 40 * s); ctx.scale(s, s);
    const st = [[-12, 0], [12, 0], [9, -46], [-9, -46]]; U.shape(ctx, st, null, 0, 2450);
    const cap = P.arc(0, -44, 48, Math.PI, 2 * Math.PI, 24, 36).concat([[48, -44]]); U.shape(ctx, cap, '#B5553F', 0.6, 2451);
    [[-20, -62], [8, -70], [24, -54]].forEach(([dx, dy]) => P.fillPts(ctx, circlePts(dx, dy, 5, 4, 10), PAL.white));
    ctx.restore();
  };
  U.bacteria = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [[-30, -14, 0.4], [20, -24, -0.3], [0, 16, 0.9], [34, 18, 0.1], [-34, 22, -0.6]].forEach(([dx, dy, a], i) => { const c = circlePts(dx + Math.sin(t + i) * 2, dy, 16, 7, 18, a); P.fillPts(ctx, c, '#9CBB55', 0.8); stroke(ctx, c, { w: 1.6, closed: true, dry: false, seed: 2460 + i }); });
    ctx.restore();
  };
  U.fish = (ctx, x, y, s = 1, dir = 1, col = '#D98A2B', seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir * 1.6, s * 1.6);
    const b = [[36, 0], [16, -14], [-12, -12], [-26, 0], [-12, 12], [16, 14], [36, 0]];
    const tail = [[-24, 0], [-44, -14], [-40, 0], [-44, 14], [-24, 0]];
    P.fillPts(ctx, tail, col, 0.8); stroke(ctx, tail, { w: 1.6, closed: true, dry: false, seed: 740 + seed });
    P.fillPts(ctx, b, PAL.white, 1); wash(ctx, b, col, 0.6, 741 + seed, { bleed: 0.8, blooms: 0 }); stroke(ctx, b, { w: 2, closed: true, seed: 742 + seed });
    inkDot(ctx, 24, -3, 2.4);
    ctx.restore();
  };
  // canlı kartı
  U.orgCard = (ctx, x, y, w, h, name, draw, seed, o = {}) => {
    U.card(ctx, x, y, w, h, seed, { tint: o.tint, tintA: 0.14, color: o.border });
    draw(ctx, x + w / 2, y + h * 0.44);
    U.fit(ctx, name, x + w / 2, y + h - 18, w - 16, o.size ?? 32);
  };
  // basit gece/gündüz simgeleri
  U.moon = (ctx, x, y, r) => { const c = circlePts(x, y, r, r, 30); P.fillPts(ctx, c, '#F4EBD2'); wash(ctx, c, '#9A9387', 0.3, 9300, { bleed: 0.6, blooms: 0 }); stroke(ctx, c, { w: 2.4, closed: true, dry: false }); ctx.save(); ctx.globalCompositeOperation = 'source-over'; ctx.restore(); };

  G.U7 = U;
})(window);

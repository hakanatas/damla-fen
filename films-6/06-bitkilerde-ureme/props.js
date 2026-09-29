// props.js — Film 6-06'ya özel çizimler (window.F06). Üstte Ünite 3 filmleri için ortak yardımcılar.
// ---------- ORTAK YARDIMCILAR (Ünite 3 filmleri: 05, 06, 07 için aynı taban) ----------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const F = G.F06 = G.F06 || {};
  const RED = '#A23A2A'; F.RED = RED;
  F.LIFE = PAL.life; F.LIFE_D = '#4E6626'; F.LIFE_L = '#B9CB8C'; F.BROWN = '#8A6A45'; F.WARM = '#B5553F';
  F.rrect = (cx, cy, w, h, r, n = 10) => {
    const p = [], hw = w / 2 - r, hh = h / 2 - r;
    [[hw, hh, 0], [-hw, hh, Math.PI / 2], [-hw, -hh, Math.PI], [hw, -hh, Math.PI * 1.5]].forEach(([x, y, a0]) => {
      for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; p.push([cx + x + Math.cos(a) * r, cy + y + Math.sin(a) * r]); }
    });
    p.push(p[0]); return p;
  };
  F.blob = (cx, cy, rx, ry, seed, amp = 0.08, n = 70, rot = 0) => { const nz = G.INK.noiseFn(seed); const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const k = 1 + nz(a * 1.6) * amp; const x = Math.cos(a) * rx * k, y = Math.sin(a) * ry * k; p.push([cx + x * Math.cos(rot) - y * Math.sin(rot), cy + x * Math.sin(rot) + y * Math.cos(rot)]); } p[n] = p[0]; return p; };
  // fill + wash + outline in one call
  F.shape = (ctx, pts, o = {}) => {
    if (o.fill !== null) P.fillPts(ctx, pts, o.fill ?? PAL.white, o.fa ?? 1);
    if (o.col) wash(ctx, pts, o.col, o.a ?? 0.55, o.seed ?? 7, { bleed: o.bleed ?? 1, blooms: o.blooms ?? 0 });
    if (o.w !== 0) stroke(ctx, pts, { w: o.w ?? 2.6, closed: true, seed: (o.seed ?? 7) + 1, dry: false, color: o.line });
  };
  F.fit = (ctx, txt, size, maxW, weight = 700, font = 'Kalam') => { ctx.save(); ctx.font = `${weight} ${size}px ${font}`; const w = ctx.measureText(txt).width; ctx.restore(); return w > maxW ? Math.floor(size * maxW / w) : size; };
  F.card = (ctx, x0, y0, x1, y1, o = {}) => {
    const card = [[x0, y0 + 6], [x1, y0], [x1 + 8, y1], [x0 + 8, y1 + 8], [x0, y0 + 6]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, card, { w: 3, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 88 });
  };
  F.tag = (ctx, txt, tx, ty, p, k, o = {}) => {
    if (k <= 0) return;
    P.write(ctx, txt, tx, ty, k, { size: o.size ?? 38, align: o.align ?? 'left', color: o.color, weight: o.weight });
    if (p && k > 0.3) { ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.3) / 0.5); const al = o.align ?? 'left'; const from = o.from ?? [al === 'left' ? tx - 10 : al === 'right' ? tx + 10 : tx, ty - (o.size ?? 38) * 0.35]; G.INK.leader(ctx, from, p, { w: 1.8, bend: o.bend ?? 0.15, seed: o.seed ?? 11 }); ctx.restore(); }
  };
  // green highlighter swipe behind text
  F.marker = (ctx, x, y, w, k, col = F.LIFE, a = 0.3) => { if (k <= 0) return; const pts = [[x, y - 18], [x + w * k, y - 22], [x + w * k, y + 12], [x, y + 14]]; P.fillPts(ctx, pts, col, a); };
  // table: rows[0] header. o:{x,y,cols:[w..],rh,at:[t..],size,head:true}
  F.table = (ctx, t, o) => {
    const { x, y, cols, rh, rows, at } = o; const W = cols.reduce((a, b) => a + b, 0); const n = rows.length;
    const kf = E.se(t, at[0] - 0.4, at[0] + 0.4); if (kf <= 0) return;
    ctx.save(); ctx.globalAlpha *= kf;
    if (o.head !== false) { const hp = [[x, y], [x + W, y], [x + W, y + rh], [x, y + rh]]; P.fillPts(ctx, hp, o.headCol ?? F.LIFE, 0.2); }
    for (let i = 0; i <= n; i++) { const ki = i === 0 ? 1 : E.se(t, at[i - 1] - 0.2, at[i - 1] + 0.4); if (ki > 0) line(ctx, [x - 6, y + i * rh], [x - 6 + (W + 12) * ki, y + i * rh], { w: i === 0 || i === 1 || i === n ? 2.6 : 1.6, seed: 700 + i, dry: false }); }
    let cx = x; const vk = E.se(t, at[n - 1] - 0.2, at[n - 1] + 0.6);
    for (let j = 1; j < cols.length; j++) { cx += cols[j - 1]; line(ctx, [cx, y - 4], [cx, y + rh * E.lerp(1, n, vk) + 4], { w: 2, seed: 720 + j, dry: false }); }
    ctx.restore();
    rows.forEach((r, i) => {
      let xx = x; r.forEach((cell, j) => {
        if (cell) {
          const sz = F.fit(ctx, cell, o.size ?? 38, cols[j] - 30, 700);
          const col = (o.colColor && o.colColor[j]) || (i === 0 ? PAL.ink : PAL.ink);
          P.write(ctx, cell, xx + 16, y + i * rh + rh * 0.66, E.seg(t, at[i] + j * 0.35, at[i] + j * 0.35 + 0.9), { size: sz, color: col });
        }
        xx += cols[j];
      });
    });
  };
  F.title = (ctx, t, num, name, unit) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    const sz = F.fit(ctx, num + ' · ' + name, 56, 1700);
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: sz, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: F.LIFE }); ctx.restore(); }
  };
  F.endCard = (ctx, t, num, name, code) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.94; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      G.INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      G.INK.label(c, num + ' · ' + name, 960, 515, { size: F.fit(c, num + ' · ' + name, 56, 1700), weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: F.LIFE });
      G.INK.label(c, 'Fen Bilimleri · 6. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      G.INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // "Sıra sende" card. lines: [{txt, at}] ; icon(ctx, k)
  F.taskCard = (ctx, t, t0, t1, head, lines, icon) => {
    const rk = Math.min(E.se(t, t0, t0 + 0.7, 'out'), 1 - E.se(t, t1 - 0.5, t1));
    if (rk <= 0) return;
    E.layer(ctx, rk, c => {
      F.card(c, 250, 180, 1670, 820, { seed: 95 });
      if (icon) icon(c, 440, 520);
      P.write(c, head, 640, 300, E.seg(t, t0 + 0.4, t0 + 1.4), { size: 76, color: '#8A4A10' });
      lines.forEach((l, i) => P.write(c, l.txt, 640, 410 + i * 82, E.seg(t, l.at, l.at + 1.3), { size: F.fit(c, l.txt, l.size ?? 50, 990), color: l.color }));
    });
  };
  // simple generic leaf
  F.leaf = (ctx, x, y, len, ang, seed, o = {}) => {
    const w = len * (o.wr ?? 0.42), pts = [];
    for (let i = 0; i <= 24; i++) { const u = i / 24; pts.push([u * len, -Math.sin(u * Math.PI) * w * (1 - 0.25 * u)]); }
    for (let i = 24; i >= 0; i--) { const u = i / 24; pts.push([u * len, Math.sin(u * Math.PI) * w * (1 - 0.25 * u)]); }
    const c = Math.cos(ang), s = Math.sin(ang); const P2 = pts.map(p => [x + p[0] * c - p[1] * s, y + p[0] * s + p[1] * c]);
    F.shape(ctx, P2, { fill: o.fill ?? '#DDE6C2', col: o.col ?? F.LIFE, a: o.a ?? 0.6, seed, w: o.w ?? 2.2 });
    if (o.vein !== false) line(ctx, [x, y], [x + len * 0.85 * c, y + len * 0.85 * s], { w: 1.2, dry: false, alpha: 0.6, seed: seed + 3 });
    return P2;
  };
})(window);

// ---------- FİLM 06'YA ÖZEL ÇİZİMLER ----------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const F = G.F06;
  const fill = (ctx, pts, col, a = 1) => P.fillPts(ctx, pts, col, a);
  F.PETAL = '#D98AA0'; F.PETAL_D = '#B0607A'; F.POLLEN = '#E3C04A';

  // basit çiçek (önden), merkez (x,y)
  F.bloom = (ctx, x, y, r, sd = 1, o = {}) => {
    const n = o.n ?? 6;
    for (let i = 0; i < n; i++) { const a = i / n * 6.283 + (o.rot ?? 0.3); const pp = F.blob(x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9, r * 0.8, r * 0.5, sd * 10 + i, 0.08, 30, a); F.shape(ctx, pp, { fill: o.fill ?? '#F3DDE3', col: o.col ?? F.PETAL_D, a: o.a ?? 0.45, seed: 6000 + sd * 10 + i, w: 1.8 }); }
    fill(ctx, circlePts(x, y, r * 0.5, r * 0.5, 16), o.center ?? F.POLLEN); stroke(ctx, circlePts(x, y, r * 0.5, r * 0.5, 16), { w: 1.6, closed: true, dry: false });
  };
  // çiçekli bitki: kök, gövde, yapraklar, çiçek. (x,y) toprak seviyesi
  F.plant = (ctx, x, y, s, t = 0, o = {}) => {
    const H = (o.h ?? 330) * s, sway = Math.sin(t * 0.9) * 4 * s;
    if (o.roots !== false) { const R = [[-60, 70], [-25, 110], [10, 120], [45, 95], [70, 60]]; R.forEach(([dx, dy], i) => { line(ctx, [x, y + 4], [x + dx * s, y + dy * s], { w: 3 * s, bend: 0.15 * (i % 2 ? 1 : -1), color: '#8A6A45', seed: 6100 + i }); line(ctx, [x + dx * s * 0.6, y + dy * s * 0.6], [x + dx * s * 0.6 + (dx > 0 ? 18 : -18) * s, y + dy * s * 0.6 + 26 * s], { w: 1.6, color: '#8A6A45', dry: false, seed: 6110 + i }); }); }
    const top = [x + sway, y - H];
    line(ctx, [x, y], top, { w: 6 * s, color: F.LIFE_D, seed: 6120, bend: 0.03, taper: 0.05 });
    [[0.3, -1], [0.45, 1], [0.62, -1], [0.75, 1]].forEach(([u, d], i) => F.leaf(ctx, x + sway * u, y - H * u, 110 * s * (1 - u * 0.3), d > 0 ? -0.5 : Math.PI + 0.5, 6130 + i * 7));
    if (o.flower !== false) F.bloom(ctx, top[0], top[1] - 20 * s, 40 * s, 3);
    return top;
  };
  // eğrelti otu ve kara yosunu (çiçeksiz örnekleri — özelliklerine girilmez)
  F.fern = (ctx, x, y, s, sd = 1) => {
    [-0.5, -0.15, 0.2, 0.55].forEach((a, i) => {
      const L = (170 - Math.abs(a) * 60) * s; const pts = P.bez([x, y], [x + Math.sin(a) * L * 0.4, y - L * 0.7], [x + Math.sin(a) * L * 1.1, y - L * 0.95], 20);
      stroke(ctx, pts, { w: 2.6, color: F.LIFE_D, seed: 6200 + i });
      for (let j = 3; j < 19; j += 2) { const p = pts[j], q = pts[j + 1]; const ang = Math.atan2(q[1] - p[1], q[0] - p[0]); const l = 26 * s * (1 - j / 22); [1, -1].forEach(d => F.leaf(ctx, p[0], p[1], l, ang + d * 1.2, 6210 + i * 40 + j + d, { vein: false, w: 1.2, wr: 0.35 })); }
    });
  };
  F.moss = (ctx, x, y, s) => {
    const mound = P.arc(x, y, 90 * s, Math.PI, Math.PI * 2, 30, 34 * s); F.shape(ctx, mound.concat([mound[0]]), { fill: '#C9D6A0', col: F.LIFE, a: 0.7, seed: 6300 });
    for (let i = 0; i < 16; i++) { const px = x - 80 * s + i * 10.5 * s; const py = y - Math.sqrt(Math.max(0, 1 - ((px - x) / (90 * s)) ** 2)) * 34 * s; line(ctx, [px, py + 4], [px + Math.sin(i) * 3, py - 18 * s], { w: 1.6, color: F.LIFE_D, dry: false, seed: 6310 + i }); }
  };
  F.tree = (ctx, x, y, s, t = 0) => {
    line(ctx, [x, y], [x + 4, y - 150 * s], { w: 12 * s, color: '#6E5234', seed: 6400, taper: 0.1 });
    const crown = wobble(circlePts(x + 4, y - 210 * s, 105 * s, 85 * s, 50), 7 * s, 6401); F.shape(ctx, crown, { fill: '#DDE6C2', col: F.LIFE, a: 0.55, seed: 6402 });
    [[-50, -230], [30, -260], [60, -200], [-20, -180], [-60, -170], [10, -225]].forEach(([dx, dy], i) => F.bloom(ctx, x + dx * s, y + dy * s, 11 * s, 40 + i, { n: 5, fill: '#FBF3F4', col: '#D9A0B0', a: 0.3 }));
  };
  F.daisy = (ctx, x, y, s, t = 0) => { line(ctx, [x, y], [x, y - 170 * s], { w: 3.4, color: F.LIFE_D, seed: 6450 }); F.leaf(ctx, x, y - 50 * s, 60 * s, Math.PI + 0.6, 6451); F.leaf(ctx, x, y - 80 * s, 55 * s, -0.6, 6452); F.bloom(ctx, x, y - 185 * s, 26 * s, 7, { n: 12, fill: '#FBF8F1', col: '#9A9387', a: 0.2 }); };
  F.beanPlant = (ctx, x, y, s) => { line(ctx, [x, y], [x - 6, y - 190 * s], { w: 3.6, color: F.LIFE_D, seed: 6460, bend: 0.05 }); [[0.35, 1], [0.6, -1], [0.85, 1]].forEach(([u, d], i) => F.leaf(ctx, x - 6 * u, y - 190 * s * u, 70 * s, d > 0 ? -0.4 : Math.PI + 0.4, 6461 + i * 3, { wr: 0.55 })); F.bloom(ctx, x + 18 * s, y - 110 * s, 12 * s, 9, { n: 5, fill: '#FBF8F1', col: '#B8A6C9', a: 0.4 }); const pod = F.blob(x - 26 * s, y - 70 * s, 12 * s, 40 * s, 6470, 0.05, 30, 0.3); F.shape(ctx, pod, { fill: '#CFDDA6', col: F.LIFE, a: 0.6, seed: 6471, w: 2 }); };
  // arı
  F.bee = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fl = Math.sin(t * 40) * 0.5 + 0.5;
    [[-6, -1], [8, 1]].forEach(([dx, d], i) => { const w = F.blob(dx, -26 - fl * 6, 18, 12, 6500 + i, 0.05, 20, -0.6 * d); P.fillPts(ctx, w, '#FBF8F1', 0.8); stroke(ctx, w, { w: 1.6, closed: true, dry: false }); });
    const b = circlePts(0, 0, 30, 20, 30); F.shape(ctx, b, { fill: '#F2D27A', col: PAL.light, a: 0.6, seed: 6510, w: 2.2 });
    [-8, 6].forEach(dx => { ctx.save(); P.path(ctx, b); ctx.clip(); fill(ctx, [[dx - 5, -24], [dx + 5, -24], [dx + 5, 24], [dx - 5, 24]], PAL.ink, 0.8); ctx.restore(); });
    fill(ctx, circlePts(30, -2, 12, 12, 16), PAL.ink, 0.85); line(ctx, [36, -10], [46, -26], { w: 1.4, dry: false }); line(ctx, [-30, 0], [-40, 2], { w: 2, dry: false });
    ctx.restore();
  };
  // ÇİÇEK KESİTİ (şematik): o.hi = 'canak'|'tac'|'erkek'|'disi' ; o.fruit 0..1 (yumurtalık → meyve)
  F.flowerX = (ctx, cx, cy, s, t, o = {}) => {
    const hi = o.hi, dim = p => (hi && hi !== p ? 0.45 : 1), fr = o.fruit ?? 0, fade = 1 - E.clamp(fr * 1.6);
    const S = (x, y) => [cx + x * s, cy + y * s];
    // sap
    line(ctx, S(0, 330), S(0, 150), { w: 14 * s, color: F.LIFE_D, seed: 6600, taper: 0 });
    // taç yapraklar
    if (fade > 0) { ctx.save(); ctx.globalAlpha *= dim('tac') * fade; [-1, 1].forEach((d, i) => { const pet = P.bez(S(d * 40, 140), S(d * 250, 60), S(d * 210, -160), 20).concat(P.bez(S(d * 210, -160), S(d * 120, -40), S(d * 30, 120), 20)); F.shape(ctx, pet, { fill: '#F3DDE3', col: F.PETAL_D, a: 0.5, seed: 6610 + i }); }); const back = F.blob(cx, cy - 20 * s, 150 * s, 150 * s, 6615, 0.06); ctx.restore(); }
    // çanak yapraklar
    ctx.save(); ctx.globalAlpha *= dim('canak') * (0.4 + 0.6 * fade); [-1, 1].forEach((d, i) => { const sp = [S(d * 20, 170), S(d * 110, 150), S(d * 130, 110), S(d * 40, 150)]; F.shape(ctx, sp, { fill: '#CFDDA6', col: F.LIFE, a: 0.7, seed: 6620 + i }); }); ctx.restore();
    // tabla
    F.shape(ctx, F.blob(cx, cy + 150 * s, 60 * s, 24 * s, 6625, 0.05), { fill: '#CFDDA6', col: F.LIFE, a: 0.6, seed: 6626 });
    // erkek organlar
    if (fade > 0) { ctx.save(); ctx.globalAlpha *= dim('erkek') * fade; [-1, 1].forEach((d, i) => [0, 1].forEach(j => { const bx = d * (95 + j * 40), by = -40 + j * 40; line(ctx, S(d * (30 + j * 12), 140), S(bx, by), { w: 3 * s + 0.6, color: '#9A7A40', seed: 6630 + i * 2 + j, bend: 0.08 * d }); const an = F.blob(cx + bx * s, cy + by * s - 16 * s, 16 * s, 26 * s, 6640 + i * 2 + j, 0.06, 24, d * 0.25); F.shape(ctx, an, { fill: '#F6E2A0', col: F.POLLEN, a: 0.8, seed: 6645 + i * 2 + j, w: 2 }); if ((o.pollenOn ?? 1) > 0) for (let q = 0; q < 4; q++) inkDot(ctx, cx + (bx + (q - 1.5) * 5 * d) * s, cy + (by - 16 + (q % 2 ? 8 : -8)) * s, 2.4 * s, { color: '200,160,40', alpha: 0.9 }); })); ctx.restore(); }
    // dişi organ: yumurtalık, dişicik borusu, tepecik
    ctx.save(); ctx.globalAlpha *= dim('disi');
    const ovR = E.lerp(1, 1.0, fr);
    if (fr < 0.5) { const sty = [S(-7, 80), S(-9, -110), S(9, -110), S(7, 80)]; ctx.save(); ctx.globalAlpha *= 1 - fr * 2; F.shape(ctx, sty, { fill: '#DCE6C0', col: F.LIFE, a: 0.5, seed: 6650, w: 2 }); const st = F.blob(cx, cy - 122 * s, 26 * s, 14 * s, 6651, 0.12); F.shape(ctx, st, { fill: '#E4EBCB', col: F.LIFE_D, a: 0.6, seed: 6652, w: 2.2 }); ctx.restore(); }
    // yumurtalık → meyve (kın)
    const ow = E.lerp(46, 62, fr) * s, oh = E.lerp(60, 150, fr) * s, oy = cy + E.lerp(100, 20, fr) * s;
    const ov = F.blob(cx, oy, ow, oh, 6653, 0.04); F.shape(ctx, ov, { fill: fr > 0.5 ? '#C9D99A' : '#DCE6C0', col: F.LIFE, a: 0.5 + 0.3 * fr, seed: 6654, w: 2.6 });
    const nS = 4; for (let i = 0; i < nS; i++) { const yy = oy + (i - 1.5) * oh * 0.42; const r = E.lerp(7, 22, fr) * s; const sd = circlePts(cx, yy, r * 1.1, r * 0.85, 18); F.shape(ctx, sd, { fill: fr > 0.5 ? '#F2E6C8' : '#FBF8F1', col: '#A07A45', a: 0.2 + 0.4 * fr, seed: 6660 + i, w: 1.6 }); }
    ctx.restore();
    return { tepecik: S(0, -122), basicik: S(-95, -56), basicik2: S(135, -16), yumurtalik: [cx, oy], taslak: [cx, oy - 0.63 * oh], borusu: S(0, -40), tac: S(-200, -120), canak: S(-120, 125), sap: S(0, 280) };
  };
  // yaşam döngüsü evreleri
  F.seed = (ctx, x, y, s, sd = 1) => { const b = F.blob(x, y, 24 * s, 16 * s, 6700 + sd, 0.05, 30, -0.3); F.shape(ctx, b, { fill: '#F2E6C8', col: '#A07A45', a: 0.55, seed: 6701 + sd }); stroke(ctx, P.arc(x + 4 * s, y - 2 * s, 5 * s, 0.5, 3.8, 10), { w: 1.4, dry: false }); };
  // fide: h gövde boyu (px), pale: karanlıkta gelişmiş (soluk, ince), hook: kıvrık uç
  F.seedling = (ctx, x, y, h, o = {}) => {
    const pale = o.pale ?? 0, col = pale ? '#C9C07A' : F.LIFE_D, w = pale ? 3 : 5;
    if (h <= 0) return;
    const pts = P.bez([x, y], [x + 8, y - h * 0.5], [x + (pale ? 10 : 2), y - h], 20); stroke(ctx, pts, { w, color: col, seed: 6720 + (o.sd ?? 0) });
    const tp = pts[pts.length - 1]; const ls = (o.leaf ?? 1) * (pale ? 0.45 : 1);
    if (ls > 0) [-1, 1].forEach((d, i) => F.leaf(ctx, tp[0], tp[1], 44 * ls * (o.ls ?? 1), d > 0 ? -0.5 : Math.PI + 0.5, 6730 + i + (o.sd ?? 0) * 3, { fill: pale ? '#F2EDC8' : '#DDE6C2', col: pale ? '#C9C07A' : F.LIFE, a: pale ? 0.5 : 0.6 }));
  };
  F.pot = (ctx, x, y, s) => { const p = [[x - 70 * s, y], [x + 70 * s, y], [x + 54 * s, y + 110 * s], [x - 54 * s, y + 110 * s]]; F.shape(ctx, p, { fill: '#E8C9A6', col: '#A0522D', a: 0.45, seed: 6750 }); const soil = [[x - 66 * s, y + 2], [x + 66 * s, y + 2], [x + 64 * s, y + 18 * s], [x - 64 * s, y + 18 * s]]; fill(ctx, soil, '#6E5234', 0.7); };
  // cam kap + pamuk + tohumlar. o: wet, dark, sprout(0..1), n tohum, label
  F.jar = (ctx, x, y, s, o = {}) => {
    const W = 120 * s, H = 170 * s;
    const glass = [[x - W, y - H], [x - W, y], [x + W, y], [x + W, y - H]];
    P.fillPts(ctx, glass.concat([glass[0]]), '#F4F6F2', 0.8);
    // pamuk
    const cot = F.blob(x, y - 34 * s, W * 0.92, 30 * s, 6760, 0.1); F.shape(ctx, cot, { fill: '#FFFFFF', col: o.wet ? PAL.water : '#C8C0B0', a: o.wet ? 0.35 : 0.15, seed: 6761, w: 1.8 });
    const n = o.n ?? 5, sp = o.sprout ?? 0;
    for (let i = 0; i < n; i++) {
      const sx = x + (i - (n - 1) / 2) * 42 * s, sy = y - 62 * s + (i % 2) * 6 * s;
      const kk = E.clamp(sp * 1.4 - i * 0.08);
      if (kk > 0.15) { const rl = 50 * s * E.clamp((kk - 0.15) / 0.4); line(ctx, [sx, sy + 6], [sx + 4, sy + 6 + rl], { w: 2.2, color: '#D8CFB8', dry: false, seed: 6770 + i }); stroke(ctx, [[sx, sy + 6], [sx + 4, sy + 6 + rl]], { w: 1, dry: false, alpha: 0.6 }); }
      if (kk > 0.5) F.seedling(ctx, sx, sy - 8, 90 * s * E.clamp((kk - 0.5) / 0.5), { pale: o.dark ? 1 : 0, leaf: E.clamp((kk - 0.7) / 0.3), ls: 0.6 * s, sd: i });
      F.seed(ctx, sx, sy, 0.9 * s, i);
    }
    stroke(ctx, glass, { w: 3, seed: 6780 });
    line(ctx, [x - W - 10, y - H], [x + W + 10, y - H], { w: 3, seed: 6781 });
    if (o.dark) { const box = [[x - W - 24, y - H - 70 * s], [x + W + 24, y - H - 70 * s], [x + W + 24, y + 6], [x - W - 24, y + 6]]; ctx.save(); ctx.globalAlpha *= o.dark; P.fillPts(ctx, box.concat([box[0]]), '#3A3440', 0.28); stroke(ctx, box.concat([box[0]]), { w: 2.6, seed: 6782, color: '#3A3440' }); ctx.restore(); }
    if (o.label) { INK.label(ctx, o.label, x, y - H - (o.dark ? 90 : 26) * s, { size: 64 * Math.min(1, s * 1.2), weight: 700, align: 'center' }); }
  };
  // faktör ikonları
  F.icoWater = (ctx, x, y, s) => { const d = [[x, y - 40 * s]].concat(P.arc(x, y + 6 * s, 28 * s, -0.3, Math.PI + 0.3, 20)).concat([[x, y - 40 * s]]); d.splice(1, 0); const pts = P.arc(x, y + 6 * s, 28 * s, -0.25, Math.PI + 0.25, 20); const drop = [[x, y - 44 * s]].concat(pts.reverse()).concat([[x, y - 44 * s]]); F.shape(ctx, P.arc(x, y + 6 * s, 28 * s, -0.25, Math.PI + 0.25, 20).concat([[x, y - 44 * s]]), { fill: '#D6E4EC', col: PAL.water, a: 0.6, seed: 6800 }); };
  F.icoThermo = (ctx, x, y, s) => { const b = [[x - 9 * s, y - 50 * s], [x + 9 * s, y - 50 * s], [x + 9 * s, y + 10 * s], [x - 9 * s, y + 10 * s]]; stroke(ctx, b.concat([b[0]]), { w: 2.4, closed: true }); fill(ctx, circlePts(x, y + 22 * s, 16 * s, 16 * s, 20), F.WARM, 0.85); stroke(ctx, circlePts(x, y + 22 * s, 16 * s, 16 * s, 20), { w: 2.4, closed: true }); fill(ctx, [[x - 4 * s, y - 20 * s], [x + 4 * s, y - 20 * s], [x + 4 * s, y + 10 * s], [x - 4 * s, y + 10 * s]], F.WARM, 0.85); };
  F.icoAir = (ctx, x, y, s, t = 0) => { [0, 1, 2].forEach(i => { const yy = y - 24 * s + i * 24 * s, o = Math.sin(t * 2 + i) * 6; const pts = P.bez([x - 50 * s + o, yy], [x, yy - 14 * s], [x + 40 * s + o, yy], 16); stroke(ctx, pts, { w: 2.6, color: PAL.water, dry: false, seed: 6810 + i }); stroke(ctx, P.arc(x + 40 * s + o, yy + 10 * s, 10 * s, -Math.PI / 2, Math.PI * 0.8, 10), { w: 2.4, color: PAL.water, dry: false }); }); };
  F.icoSoil = (ctx, x, y, s) => { const m = [[x - 50 * s, y + 20 * s], [x - 30 * s, y - 20 * s], [x + 30 * s, y - 24 * s], [x + 50 * s, y + 20 * s]]; F.shape(ctx, m, { fill: '#D9C29C', col: '#8A6A45', a: 0.7, seed: 6820 }); [[-20, 0], [5, -8], [22, 6], [-5, 10]].forEach(([dx, dy], i) => { fill(ctx, [[x + dx * s, y + dy * s - 6], [x + dx * s + 6, y + dy * s], [x + dx * s, y + dy * s + 6], [x + dx * s - 6, y + dy * s]], ['#8E6A8C', PAL.water, '#B5553F', F.LIFE][i], 0.8); }); };
})(window);

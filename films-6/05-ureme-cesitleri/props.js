// props.js — Film 6-05'e özel çizimler (window.F05). Üstte Ünite 3 filmleri için ortak yardımcılar.
// ---------- ORTAK YARDIMCILAR (Ünite 3 filmleri: 05, 06, 07 için aynı taban) ----------
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const F = G.F05 = G.F05 || {};
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

// ---------- FİLM 05'E ÖZEL ÇİZİMLER ----------
// Canlılar yosun yeşili (PAL.life) vurgusuyla; hayvanlar doğal, toprak tonlarında ve şematik.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const F = G.F05;
  const fill = (ctx, pts, col, a = 1) => P.fillPts(ctx, pts, col, a);

  // ---- tavuk (sağa bakar), ayak noktası (x,y)
  F.hen = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bob = Math.sin(t * 2.2) * 2;
    line(ctx, [-12, -30], [-16, 0], { w: 3.4, color: '#C07F1E' }); line(ctx, [14, -30], [12, 0], { w: 3.4, color: '#C07F1E' });
    line(ctx, [-16, 0], [-2, 2], { w: 3, color: '#C07F1E', dry: false }); line(ctx, [12, 0], [26, 2], { w: 3, color: '#C07F1E', dry: false });
    const tail = [[-60, -80], [-104, -140], [-92, -96], [-118, -112], [-84, -64]];
    F.shape(ctx, tail, { fill: '#EFE6D4', col: F.BROWN, a: 0.35, seed: 5101 });
    const body = F.blob(0, -78, 74, 54, 5102, 0.05);
    F.shape(ctx, body, { fill: '#F5EFE2', col: F.BROWN, a: 0.3, seed: 5103 });
    stroke(ctx, P.arc(-6, -82, 42, 0.2, 2.2, 20, 26), { w: 2, dry: false, alpha: 0.7 });           // kanat
    const hx = 62, hy = -136 + bob;
    const neck = [[34, -110], [hx - 18, hy + 6], [hx + 20, hy + 10], [60, -100]];
    fill(ctx, neck, '#F5EFE2');
    const comb = [[hx - 16, hy - 22], [hx - 10, hy - 40], [hx - 2, hy - 26], [hx + 6, hy - 42], [hx + 12, hy - 24], [hx + 18, hy - 34], [hx + 18, hy - 18]];
    F.shape(ctx, comb, { fill: '#D98C66', col: '#C9794A', a: 0.6, seed: 5104, w: 2 });
    const head = circlePts(hx, hy, 27, 25, 30); F.shape(ctx, head, { fill: '#F5EFE2', col: F.BROWN, a: 0.2, seed: 5105 });
    const beak = [[hx + 24, hy - 6], [hx + 46, hy + 2], [hx + 24, hy + 8]]; F.shape(ctx, beak, { fill: '#F0C060', col: '#C07F1E', a: 0.6, seed: 5106, w: 2 });
    fill(ctx, P.arc(hx + 16, hy + 18, 8, 0, Math.PI, 12, 12), '#D98C66');
    inkDot(ctx, hx + 10, hy - 6, 3.6);
    ctx.restore();
  };
  F.chick = (ctx, x, y, s, t = 0, seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const hop = Math.abs(Math.sin(t * 5 + seed)) * 4;
    ctx.translate(0, -hop);
    line(ctx, [-6, -8], [-8, 0], { w: 2.4, color: '#C07F1E', dry: false }); line(ctx, [6, -8], [6, 0], { w: 2.4, color: '#C07F1E', dry: false });
    const b = circlePts(0, -30, 26, 23, 30); F.shape(ctx, b, { fill: '#F6E2A0', col: PAL.light, a: 0.55, seed: 5110 + seed });
    const h = circlePts(18, -54, 15, 14, 24); F.shape(ctx, h, { fill: '#F6E2A0', col: PAL.light, a: 0.5, seed: 5112 + seed });
    F.shape(ctx, [[31, -58], [44, -53], [31, -49]], { fill: '#E3A03A', seed: 5114, w: 1.6 });
    inkDot(ctx, 22, -58, 2.6);
    ctx.restore();
  };
  F.shell = (ctx, x, y, s) => {
    const cup = [[x - 30 * s, y - 26 * s], [x - 18 * s, y - 36 * s], [x - 8 * s, y - 26 * s], [x + 4 * s, y - 38 * s], [x + 14 * s, y - 26 * s], [x + 30 * s, y - 34 * s]].concat(P.arc(x, y - 30 * s, 31 * s, 0.1, Math.PI - 0.1, 20, 28 * s).reverse().reverse());
    F.shape(ctx, cup, { fill: '#FBF8F1', col: F.BROWN, a: 0.15, seed: 5120 });
  };
  // ---- çilek: üç yaprakçıklı yaprak
  F.tri = (ctx, x, y, s, ang, seed) => {
    const tx = x + Math.sin(ang) * 80 * s, ty = y - Math.cos(ang) * 80 * s;
    line(ctx, [x, y], [tx, ty], { w: 2.6 * s + 0.6, color: F.LIFE_D, seed });
    [-0.75, 0, 0.75].forEach((d, i) => F.leaf(ctx, tx, ty, 46 * s, ang - Math.PI / 2 + d, seed + i * 5, { wr: 0.55 }));
  };
  // çilek bitkisi; k: sürünücü gövde (kol) uzaması, k2: yavru fide
  F.strawberry = (ctx, x, y, s, k = 0, k2 = 0, t = 0, o = {}) => {
    const dir = o.dir ?? 1, runL = (o.run ?? 260) * s;
    if (k > 0) {
      const run = P.bez([x + 10 * dir * s, y - 10 * s], [x + runL * 0.5 * dir, y - 90 * s], [x + runL * dir, y], 30);
      P.drawOn(ctx, run, k, { w: 3, color: F.LIFE_D, seed: 5130 });
      if (k2 > 0) {
        const px = x + runL * dir, py = y;
        for (let i = 0; i < 4; i++) line(ctx, [px + (i - 1.5) * 6, py], [px + (i - 1.5) * 12, py + 22 * k2], { w: 1.4, dry: false, seed: 5140 + i, alpha: 0.8 });
        [-0.5, 0.35].forEach((a, i) => F.tri(ctx, px, py, s * 0.55 * k2, a, 5150 + i * 20));
      }
    }
    [-0.6, 0.05, 0.6].forEach((a, i) => F.tri(ctx, x, y, s, a + Math.sin(t * 0.8 + i) * 0.03, 5160 + i * 20));
    if (o.flower) { const fx = x - 50 * s, fy = y - 70 * s; line(ctx, [x, y], [fx, fy], { w: 2, color: F.LIFE_D }); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; F.shape(ctx, circlePts(fx + Math.cos(a) * 10 * s, fy + Math.sin(a) * 10 * s, 9 * s, 9 * s, 14), { fill: '#FBF8F1', seed: 5170 + i, w: 1.4 }); } fill(ctx, circlePts(fx, fy, 6 * s, 6 * s, 12), '#E3C04A'); }
  };
  // ---- kedi (önden, oturur); o: {base, stripe, patch, patchSide}
  F.cat = (ctx, x, y, s, o = {}, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const base = o.base ?? '#C98F5A', sd = o.seed ?? 5200;
    const tail = P.bez([36, -20], [110, -30], [84, -110], 24); stroke(ctx, tail, { w: 12, color: base, seed: sd, taper: 0.1, dry: false }); stroke(ctx, tail, { w: 2, seed: sd + 1, dry: false, alpha: 0.6 });
    const body = F.blob(0, -58, 50, 60, sd + 2, 0.04);
    F.shape(ctx, body, { fill: '#F4ECDD', col: base, a: 0.75, seed: sd + 3 });
    const earL = [[-38, -150], [-34, -196], [-8, -168]], earR = [[38, -150], [34, -196], [8, -168]];
    F.shape(ctx, earL, { fill: '#F4ECDD', col: base, a: 0.75, seed: sd + 4, w: 2.2 }); F.shape(ctx, earR, { fill: '#F4ECDD', col: base, a: 0.75, seed: sd + 5, w: 2.2 });
    const head = F.blob(0, -140, 46, 40, sd + 6, 0.03);
    F.shape(ctx, head, { fill: '#F4ECDD', col: base, a: 0.75, seed: sd + 7 });
    if (o.patch) { ctx.save(); P.path(ctx, head); ctx.clip(); const px = (o.patchSide ?? 1) * 22; wash(ctx, F.blob(px, -146, 26, 22, sd + 8, 0.2), o.patch, 0.9, sd + 9, { bleed: 1, blooms: 0 }); ctx.restore();
      ctx.save(); P.path(ctx, body); ctx.clip(); wash(ctx, F.blob(-(o.patchSide ?? 1) * 22, -40, 30, 26, sd + 10, 0.2), o.patch, 0.9, sd + 11, { bleed: 1, blooms: 0 }); ctx.restore(); }
    if (o.stripe) { [[-14, -178, -12, -160], [0, -182, 0, -162], [14, -178, 12, -160]].forEach(([a, b, c2, d], i) => line(ctx, [a, b], [c2, d], { w: 4, color: o.stripe, dry: false, seed: sd + 12 + i }));
      [-70, -52, -34].forEach((yy, i) => { line(ctx, [-50, yy], [-26, yy + 4], { w: 4, color: o.stripe, dry: false, seed: sd + 20 + i }); line(ctx, [50, yy], [26, yy + 4], { w: 4, color: o.stripe, dry: false, seed: sd + 24 + i }); }); }
    stroke(ctx, head, { w: 2.6, closed: true, seed: sd + 30, dry: false });
    const bl = E.blink(t, sd) > 0.5;
    [-17, 17].forEach(ex => { if (bl) line(ctx, [ex - 7, -144], [ex + 7, -144], { w: 2.4, dry: false }); else { fill(ctx, circlePts(ex, -144, 7, 9, 16), '#9DB06A'); fill(ctx, circlePts(ex, -144, 2.4, 7, 12), PAL.ink); } });
    fill(ctx, [[-6, -128], [6, -128], [0, -121]], '#C98080');
    stroke(ctx, [[0, -121], [0, -116], [-6, -112]], { w: 1.6, dry: false }); stroke(ctx, [[0, -116], [6, -112]], { w: 1.6, dry: false });
    [[-1, -124], [-1, -118], [1, -124], [1, -118]].forEach(([d, yy], i) => line(ctx, [d * 12, yy], [d * 46, yy + (i % 2 ? 6 : -4)], { w: 1.1, dry: false, alpha: 0.7, seed: sd + 40 + i }));
    ctx.restore();
  };
  // ---- amip bölünmesi: k 0..1
  const amR = (a, r, t, sd) => r * (1 + 0.09 * Math.sin(3 * a + t * 0.8 + sd) + 0.05 * Math.sin(5 * a - t * 1.1 + sd * 2));
  F.amoeba = (ctx, cx, cy, r, k, t, sd = 1) => {
    const ks = E.clamp((k - 0.35) / 0.55), rc = r * E.lerp(1, 0.74, E.ease.io(ks)), d = E.ease.io(ks) * rc * 2.3;
    const C = d > 0.5 ? [[cx - d / 2, cy], [cx + d / 2, cy]] : [[cx, cy]];
    const outl = C.map((c, i) => { const p = []; for (let j = 0; j <= 90; j++) { const a = j / 90 * 6.283; const rr = amR(a, rc, t, sd + i * 3); p.push([c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr]); } return p; });
    outl.forEach((p, i) => { fill(ctx, p, '#E4EBCB'); wash(ctx, p, F.LIFE, 0.35, 5300 + i, { bleed: 1.5, blooms: 1 }); });
    // outer contour only
    outl.forEach((p, i) => {
      let run = []; const oc = C[1 - i];
      p.forEach(q => { const inside = oc && Math.hypot(q[0] - oc[0], q[1] - oc[1]) < rc * 0.93; if (!inside) run.push(q); else { if (run.length > 1) stroke(ctx, run, { w: 2.8, seed: 5310 + i, dry: false, taper: 0 }); run = []; } });
      if (run.length > 1) stroke(ctx, run, { w: 2.8, seed: 5312 + i, dry: false, taper: 0 });
    });
    // çekirdek(ler)
    const kn = E.clamp((k - 0.08) / 0.3), dn = E.ease.io(kn) * rc * 0.9;
    const nuc = dn < 2 ? [[cx, cy]] : [[C.length > 1 ? C[0][0] : cx - dn / 2, cy], [C.length > 1 ? C[1][0] : cx + dn / 2, cy]];
    nuc.forEach((n, i) => { const nr = r * 0.2 * (dn < 2 ? 1 + kn * 0.2 : 0.85); const np = circlePts(n[0], n[1], nr * (dn < 2 ? 1 + kn * 0.5 : 1), nr, 24); F.shape(ctx, np, { fill: '#C9B9CF', col: '#8E6A8C', a: 0.5, seed: 5320 + i, w: 2 }); });
    C.forEach((c, i) => { const vp = circlePts(c[0] + rc * 0.35, c[1] - rc * 0.35, rc * 0.1, rc * 0.1, 14); stroke(ctx, vp, { w: 1.4, closed: true, dry: false, alpha: 0.6 }); });
  };
  F.bacterium = (ctx, x, y, s, rot, sd) => { const p = F.rrect(0, 0, 60 * s, 24 * s, 12 * s, 6).map(q => [x + q[0] * Math.cos(rot) - q[1] * Math.sin(rot), y + q[0] * Math.sin(rot) + q[1] * Math.cos(rot)]); F.shape(ctx, p, { fill: '#E4EBCB', col: F.LIFE, a: 0.5, seed: sd, w: 2 }); };
  // ---- hidra; kb: tomurcuk 0..1
  F.hydra = (ctx, x, y, s, t, kb = 0, o = {}) => {
    const H = 200 * s, cxAt = u => x + Math.sin(u * 2.2 + t * 0.9) * 7 * s * u, wAt = u => (13 + 7 * u) * s;
    const L = [], R = [];
    for (let i = 0; i <= 24; i++) { const u = i / 24; L.push([cxAt(u) - wAt(u), y - u * H]); R.push([cxAt(u) + wAt(u), y - u * H]); }
    const topX = cxAt(1), topY = y - H;
    const dome = P.arc(topX, topY, wAt(1), 0, -Math.PI, 12, wAt(1) * 0.7).reverse();
    const foot = P.arc(cxAt(0), y, wAt(0), Math.PI, 0, 10, 6 * s).reverse();
    const body = L.concat(dome.slice(1, -1)).concat(R.reverse()).concat(foot);
    // tentacles
    for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.36; const pts = []; for (let j = 0; j <= 16; j++) { const u = j / 16; pts.push([topX + Math.cos(a) * u * 95 * s + Math.sin(u * 7 + t * 2 + i) * 6 * s * u, topY + Math.sin(a) * u * 80 * s + u * u * 20 * s]); } stroke(ctx, pts, { w: 4 * s + 0.8, seed: 5400 + i, taper: 0.6, color: F.LIFE_D }); }
    // bud
    if (kb > 0 && kb < 1) {
      const ab = Math.min(1, (1 - kb) / 0.12);
      ctx.save(); ctx.globalAlpha *= ab;
      const bx = cxAt(0.45) + wAt(0.45) - 4 * s, by = y - 0.45 * H, bl = 85 * s * Math.min(1, kb * 1.3), a = -0.55;
      const ex = bx + Math.cos(a) * bl, ey = by + Math.sin(a) * bl, bw = 12 * s * Math.min(1, kb * 1.6);
      const nx = -Math.sin(a), ny = Math.cos(a);
      const bud = [[bx - nx * bw * 1.1, by - ny * bw * 1.1 - 6 * s], [ex - nx * bw, ey - ny * bw], [ex + nx * bw, ey + ny * bw], [bx + nx * bw * 1.1, by + ny * bw * 1.1 + 6 * s]];
      F.shape(ctx, bud, { fill: '#DCE6C0', col: F.LIFE, a: 0.55, seed: 5410, w: 2.4 });
      if (kb > 0.45) for (let i = 0; i < 4; i++) { const ta = a + (i - 1.5) * 0.45, tl = (kb - 0.45) * 90 * s; line(ctx, [ex, ey], [ex + Math.cos(ta) * tl, ey + Math.sin(ta) * tl], { w: 2.6 * s + 0.6, color: F.LIFE_D, seed: 5420 + i, taper: 0.6 }); }
      ctx.restore();
    }
    F.shape(ctx, body, { fill: '#DCE6C0', col: F.LIFE, a: 0.55, seed: 5430, w: 2.8 });
    fill(ctx, circlePts(topX, topY + 2, 8 * s, 4 * s, 12), F.LIFE_D, 0.8);
  };
  F.yeast = (ctx, x, y, s, k, sd = 1) => {
    const m = circlePts(x, y, 34 * s, 26 * s, 30); F.shape(ctx, m, { fill: '#F2EAD0', col: '#B89B5A', a: 0.45, seed: 5450 + sd });
    if (k > 0) { const r = 18 * s * k; const b = circlePts(x + 34 * s + r * 0.75, y - 10 * s, r, r * 0.85, 20); F.shape(ctx, b, { fill: '#F2EAD0', col: '#B89B5A', a: 0.45, seed: 5460 + sd, w: 2 }); }
    fill(ctx, circlePts(x - 6 * s, y, 7 * s, 6 * s, 12), '#8E6A8C', 0.6);
  };
  // ---- deniz yıldızı: L[5] kol uzunlukları (0..1), newA: yeni doku (soluk) başlangıç oranı
  F.starfish = (ctx, x, y, R, rot, Ls, sd = 1, o = {}) => {
    const Rin = R * 0.3, pts = [];
    for (let j = 0; j <= 200; j++) {
      const a = j / 200 * 6.283; let best = Rin;
      for (let i = 0; i < 5; i++) { const aa = rot + i / 5 * 6.283 - Math.PI / 2; let dA = Math.atan2(Math.sin(a - aa), Math.cos(a - aa)); const L = Math.max(Ls[i] * R, Rin * 1.05); const width = 0.55 * (R / L) ** 0.2; const f = Math.max(0, 1 - Math.abs(dA) / width); const r = Rin + (L - Rin) * Math.pow(f, 1.6); if (r > best) best = r; }
      pts.push([x + Math.cos(a) * best, y + Math.sin(a) * best]);
    }
    F.shape(ctx, pts, { fill: '#EFD5B0', col: '#C98B52', a: 0.6, seed: 5500 + sd, w: 2.8 });
    // tex dots along arms
    for (let i = 0; i < 5; i++) { const aa = rot + i / 5 * 6.283 - Math.PI / 2; const L = Ls[i] * R; for (let d = Rin * 0.6; d < L - 10; d += 16) inkDot(ctx, x + Math.cos(aa) * d, y + Math.sin(aa) * d, 2.2, { alpha: 0.55 }); }
    if (o.newArms) o.newArms.forEach(i => { const aa = rot + i / 5 * 6.283 - Math.PI / 2; const L = Ls[i] * R; if (L > Rin * 1.3) { ctx.save(); ctx.globalAlpha *= 0.5; line(ctx, [x + Math.cos(aa) * Rin, y + Math.sin(aa) * Rin], [x + Math.cos(aa) * L * 0.9, y + Math.sin(aa) * L * 0.9], { w: 7, color: '#FBF8F1', dry: false, taper: 0.5 }); ctx.restore(); } });
  };
  // ---- planarya: u0..u1 aralığı (0 kuyruk, 1 baş); yeni doku: nu0..nu1 soluk
  F.worm = (ctx, x, y, len, u0, u1, nu0, nu1, sd = 1) => {
    const wAt = u => (u > 0.82 ? 14 + 10 * Math.sin((u - 0.82) / 0.18 * Math.PI * 0.9) : 8 + 8 * Math.sin(Math.min(1, u / 0.82) * Math.PI * 0.55 + 0.4)) * (u > 0.97 ? (1 - u) / 0.03 * 0.6 + 0.4 : 1);
    const top = [], bot = [];
    for (let i = 0; i <= 40; i++) { const u = u0 + (u1 - u0) * i / 40; const xx = x + (u - u0) * len, yy = y + Math.sin(u * 8) * 3; top.push([xx, yy - wAt(u)]); bot.push([xx, yy + wAt(u)]); }
    const pts = top.concat(bot.reverse()); pts.push(pts[0]);
    F.shape(ctx, pts, { fill: '#E8DDCB', col: '#9A7A5A', a: 0.55, seed: 5600 + sd, w: 2.4 });
    if (nu1 > nu0) { ctx.save(); P.path(ctx, pts); ctx.clip(); fill(ctx, [[x + (nu0 - u0) * len, y - 40], [x + (nu1 - u0) * len, y - 40], [x + (nu1 - u0) * len, y + 40], [x + (nu0 - u0) * len, y + 40]], '#FBF8F1', 0.65); ctx.restore(); }
    if (u1 > 0.9) { const hx = x + (0.9 - u0) * len; inkDot(ctx, hx, y - 6, 2.6); inkDot(ctx, hx, y + 6 + Math.sin(0.9 * 8) * 0, 2.6); }
  };
  // ---- kertenkele (sağa bakar). tail: 0 yok, 1 tam; o.regrow: yeni kuyruk soluk
  F.lizard = (ctx, x, y, s, tail = 1, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const col = '#8FA35E';
    [[-40, 1], [40, 1], [-30, -1], [50, -1]].forEach(([lx, d], i) => { const up = d > 0 ? 18 : -18; line(ctx, [lx, up * 0.4], [lx + 16, up * 1.8], { w: 7, color: col, seed: 5700 + i, dry: false }); line(ctx, [lx + 16, up * 1.8], [lx + 28, up * 1.9], { w: 3, color: F.LIFE_D, dry: false }); });
    if (tail > 0) { const tl = 230 * tail; const tp = []; for (let i = 0; i <= 30; i++) { const u = i / 30; tp.push([-70 - u * tl, Math.sin(u * 3 + t * 2) * 12 * u]); }
      const L = tp.map((p, i) => [p[0], p[1] - 16 * (1 - i / 30) - 1]), R = tp.map((p, i) => [p[0], p[1] + 16 * (1 - i / 30) + 1]); const poly = L.concat(R.reverse());
      F.shape(ctx, poly, { fill: o.regrow ? '#EEF0DC' : '#D8E0BC', col: col, a: o.regrow ? 0.3 : 0.7, seed: 5710, w: 2.2 }); }
    const body = F.blob(0, 0, 80, 22, 5720, 0.04); F.shape(ctx, body, { fill: '#D8E0BC', col, a: 0.7, seed: 5721 });
    const head = F.blob(100, -4, 34, 18, 5722, 0.03); F.shape(ctx, head, { fill: '#D8E0BC', col, a: 0.7, seed: 5723 });
    inkDot(ctx, 112, -10, 3.4);
    ctx.restore();
  };
  F.tailPiece = (ctx, x, y, s, t) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const tp = []; for (let i = 0; i <= 24; i++) { const u = i / 24; tp.push([-u * 200, Math.sin(u * 4 + t * 7) * 14 * u]); } const L = tp.map((p, i) => [p[0], p[1] - 14 * (1 - i / 24) - 1]), R = tp.map((p, i) => [p[0], p[1] + 14 * (1 - i / 24) + 1]); F.shape(ctx, L.concat(R.reverse()), { fill: '#D8E0BC', col: '#8FA35E', a: 0.7, seed: 5730, w: 2.2 }); ctx.restore(); };
  // ---- patates (gövde yumrusu) ; k: filiz
  F.potato = (ctx, x, y, s, k) => {
    const b = F.blob(x, y, 110 * s, 70 * s, 5800, 0.07); F.shape(ctx, b, { fill: '#E8D3A8', col: '#A07A45', a: 0.55, seed: 5801, w: 2.8 });
    [[-50, -30, -2.2], [20, -48, -1.4], [70, -10, -0.6], [-10, 20, 1.5]].forEach(([dx, dy, a], i) => {
      const ex = x + dx * s, ey = y + dy * s; stroke(ctx, P.arc(ex, ey, 6 * s, 0.4, 2.8, 8), { w: 2, dry: false });
      if (k > 0 && i < 3) { const L = 90 * s * k; const tip = [ex + Math.cos(a) * L, ey + Math.sin(a) * L]; line(ctx, [ex, ey], tip, { w: 4, color: F.LIFE_D, seed: 5810 + i, bend: 0.1 }); if (k > 0.5) F.leaf(ctx, tip[0], tip[1], 30 * s * (k - 0.5) * 2, a + 0.7, 5820 + i, { vein: false }); }
    });
  };
  // ---- sardunya çeliği bardakta ; k: kökler
  F.cutting = (ctx, x, y, s, k, t) => {
    const g = [[x - 60 * s, y - 170 * s], [x + 60 * s, y - 170 * s], [x + 50 * s, y], [x - 50 * s, y]];
    const wtr = [[x - 57 * s, y - 110 * s], [x + 57 * s, y - 110 * s], [x + 50 * s, y - 2], [x - 50 * s, y - 2]]; wash(ctx, wtr, PAL.water, 0.3, 5900, { bleed: 1, blooms: 0 });
    line(ctx, [x + 4 * s, y - 20 * s], [x - 6 * s, y - 280 * s], { w: 5, color: F.LIFE_D, seed: 5901 });
    [[-6, -250, -2.5], [-2, -200, -0.5], [-6, -280, -1.6]].forEach(([dx, dy, a], i) => { const lx = x + dx * s, ly = y + dy * s; const ex = lx + Math.cos(a) * 60 * s, ey = ly + Math.sin(a) * 50 * s; line(ctx, [lx, ly], [ex, ey], { w: 2, color: F.LIFE_D, dry: false }); const lf = F.blob(ex, ey, 34 * s, 30 * s, 5910 + i, 0.12); F.shape(ctx, lf, { fill: '#DDE6C2', col: F.LIFE, a: 0.6, seed: 5915 + i }); stroke(ctx, circlePts(ex, ey, 18 * s, 15 * s, 20), { w: 1.2, closed: true, dry: false, alpha: 0.5, color: F.LIFE_D }); });
    if (k > 0) for (let i = 0; i < 6; i++) { const a = Math.PI / 2 + (i - 2.5) * 0.35; const L = 70 * s * k * (0.7 + (i % 3) * 0.15); line(ctx, [x + 4 * s, y - 24 * s], [x + 4 * s + Math.cos(a) * L, y - 24 * s + Math.sin(a) * L * 0.8], { w: 1.6, dry: false, bend: 0.12, seed: 5920 + i, color: '#8A6A45' }); }
    stroke(ctx, g, { w: 2.6, seed: 5930 });
  };
  // eşey hücresi noktası
  F.gamete = (ctx, x, y, r, col, sd) => { const c = circlePts(x, y, r, r, 20); F.shape(ctx, c, { fill: '#FBF8F1', col, a: 0.6, seed: sd, w: 2 }); };
})(window);

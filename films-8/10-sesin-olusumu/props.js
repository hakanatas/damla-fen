// props.js — 8. sınıf Ünite 4 "Sesin Dünyası" ortak çizimleri → window.S8
// Filmler 10 (sesin oluşumu), 11 (ses özellikleri), 12 (ses yalıtımı) aynı dosyayı kullanır (her klasörde birebir kopya).
// Ortak taban (rr / shape / fit / wfit / card / stamp / title / endCard / notebookPage / taskCard / table)
// 7. sınıf F723 props.js dosyasından uyarlanmıştır (bitiş kartı 8. sınıf).
// Renk kodu: ses dalgası = kehribar (enerji) · tanecikler = su mavisi (madde) · kırmızı yalnızca güvenlik / YANLIŞ.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, hatch, arrowHead, rng, dashed } = G.INK;
  const F = {};
  const RED = '#A23A2A', AMB = '#C07F1E', GREEN = '#3F7A3A', WOOD = '#8A6A45', METAL = '#9A9387', SKIN = '#D9B38C', SND = '#C07F1E';
  Object.assign(F, { RED, AMB, GREEN, WOOD, METAL, SND });
  const closeP = pts => pts.concat([pts[0]]);
  F.closeP = closeP;
  F.rr = (x, y, w, h, r, n = 5) => {
    const p = [];
    [[x + w - r, y + r, -Math.PI / 2, 0], [x + w - r, y + h - r, 0, Math.PI / 2], [x + r, y + h - r, Math.PI / 2, Math.PI], [x + r, y + r, Math.PI, 1.5 * Math.PI]]
      .forEach(([cx, cy, a0, a1]) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    return p.concat([p[0]]);
  };
  F.shape = (ctx, pts, col, a = 0.5, seed = 1, o = {}) => {
    const p = (pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) ? pts : closeP(pts);
    P.fillPts(ctx, p, o.base ?? PAL.white, o.baseA ?? 0.96);
    if (col) wash(ctx, p, col, a, seed, { bleed: o.bleed ?? 1, blooms: o.blooms ?? 0 });
    stroke(ctx, p, { w: o.w ?? 2.6, closed: true, seed: seed + 1, color: o.color });
  };
  F.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); ctx.fillText(txt, 0, 0); } else ctx.fillText(txt, x, y);
    ctx.restore();
  };
  F.wfit = (ctx, txt, x, y, k, size, maxW, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px Kalam`;
    while (ctx.measureText(txt).width > maxW && sz > 20) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px Kalam`; }
    ctx.restore(); return P.write(ctx, txt, x, y, k, Object.assign({}, o, { size: sz }));
  };
  F.card = (ctx, x, y, w, h, seed = 1, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = o.blur ?? 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, seed + 3, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed, color: o.color });
    return c;
  };
  F.stamp = (ctx, x, y, txt, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k), col = o.color ?? GREEN, size = o.size ?? 44;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12); ctx.scale(s, s);
    ctx.font = `700 ${size}px Kalam`; const w = ctx.measureText(txt).width + 40, h = size * 1.35;
    const b = F.rr(-w / 2, -h / 2, w, h, 10, 3); P.fillPts(ctx, b, PAL.white, 0.75);
    stroke(ctx, b, { w: 4, closed: true, color: col, seed: 17, dry: false });
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3);
    ctx.restore();
  };
  F.damla = (ctx, t, o = {}) => {
    DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'curious', look: [0.6, -0.2], blink: E.blink(t, o.bseed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.4], [1, 0.5]] }, o));
  };
  F.wave = (t) => [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]];
  F.title = (ctx, t, head, unit, col) => {
    const t1 = E.e('title') + 1.2;
    if (t > t1) return;
    const k = Math.min(E.se(t, 0.3, 1.0), 1 - E.se(t, t1 - 0.6, t1));
    ctx.save(); ctx.globalAlpha = 0.84 * k; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 120, E.W, 270); ctx.restore();
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, head, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: col ?? PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, head, codes, col) => {
    const se = E.s('end'), ek = E.se(t, se, se + 0.8);
    if (ek <= 0) return;
    E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 400, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      F.fit(c, head, 960, 485, 1500, 56, { rot: -0.02 });
      P.drawOn(c, P.bez([600, 515], [960, 526], [1320, 510], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: col ?? PAL.light });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 610, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 670, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 905, s: 0.85, view: 'front', expr: 'happy', t, seed: 1, arms: F.wave(t) });
    });
  };
  F.notebookPage = (ctx, t, t0, heading, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 740);
    F.wfit(ctx, heading, 290, 270, E.seg(t, t0 + 0.3, t0 + 1.5), 58, 1300);
    if (t > t0 + 1.5) P.drawOn(ctx, P.bez([286, 292], [720, 304], [1180, 288], 30), E.se(t, t0 + 1.5, t0 + 2.0), { w: 3, color: o.col ?? PAL.light });
    const gap = o.gap ?? 1.0, dy = o.dy ?? 96;
    items.forEach((it, i) => {
      const [txt, col] = Array.isArray(it) ? it : [it, PAL.ink];
      const at = t0 + 1.6 + i * gap, y = 385 + i * dy;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.8, at + 1.2), { w: 6, color: GREEN });
      F.wfit(ctx, txt, 385, y, E.seg(t, at, at + 1.0), 40, o.maxW ?? 1120, { color: col });
    });
  };
  F.taskCard = (ctx, t, sk, k, lines, o = {}) => {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      const x0 = o.x ?? 300, x1 = o.x1 ?? 1620;
      const card = [[x0, 160], [x1, 150], [x1 + 10, 830], [x0 + 10, 842], [x0, 160]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.write(c, o.head ?? 'Sıra sende!', (x0 + x1) / 2, 270, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: o.col ?? GREEN });
      lines.forEach((s, i) => { const at = sk + 1.3 + i * (o.gap ?? 1.0); F.wfit(c, (i + 1) + '. ' + s, x0 + 90, 390 + i * 92, E.seg(t, at, at + 1.1), 44, o.maxW ?? 1100); });
      if (o.extra) o.extra(c);
    });
  };
  F.table = (ctx, x, y, cols, rows, rowH, kHead, kRows, o = {}) => {
    const W = cols.reduce((s, c) => s + c[1], 0), H = rowH * (rows.length + 1);
    const box = F.rr(x, y, W, H, 8, 2);
    P.fillPts(ctx, box, PAL.white, 0.9 * Math.min(1, kHead * 2));
    if (kHead <= 0) return;
    stroke(ctx, P.partial(box, kHead), { w: 2.6, seed: 41 });
    let cx = x; const size = o.size ?? 36;
    cols.forEach(([h, w], j) => {
      if (j > 0) P.drawOn(ctx, [[cx, y], [cx, y + H]], kHead, { w: 1.8, dry: false });
      ctx.save(); ctx.globalAlpha *= E.clamp(kHead * 1.5); F.fit(ctx, h, cx + w / 2, y + rowH * 0.68, w - 16, size, { color: o.headCol ? o.headCol[j] ?? PAL.ink : PAL.ink }); ctx.restore();
      cx += w;
    });
    P.drawOn(ctx, [[x, y + rowH], [x + W, y + rowH]], kHead, { w: 2.2, dry: false });
    rows.forEach((r, i) => {
      const kr = kRows[i] ?? 0; if (kr <= 0) return;
      const yy = y + rowH * (i + 1);
      if (i > 0) P.drawOn(ctx, [[x, yy], [x + W, yy]], kr, { w: 1.2, dry: false, alpha: 0.6 });
      let xx = x;
      r.forEach((cell, j) => {
        const w = cols[j][1];
        ctx.save(); ctx.globalAlpha *= E.clamp(kr * 1.4);
        const col = (o.cellCol && o.cellCol(i, j)) || PAL.ink;
        F.fit(ctx, cell, xx + w / 2, yy + rowH * 0.68, w - 16, o.cellSize ?? size - 2, { color: col, weight: o.cellWeight ?? 700 });
        ctx.restore(); xx += w;
      });
    });
    return [W, H];
  };
  // kırmızı güvenlik kartı
  F.safety = (ctx, x, y, w, h, head, k) => {
    if (k <= 0) return;
    ctx.save(); ctx.translate((1 - k) * 700, 0);
    const card = [[x, y], [x + w, y - 10], [x + w + 8, y + h], [x + 8, y + h + 10], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
    stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 88 });
    line(ctx, [x + 10, y + 76], [x + w, y + 66], { w: 3, color: RED, dry: false });
    F.fit(ctx, '⚠  ' + head, x + w / 2, y + 52, w - 40, 44, { color: RED });
    ctx.restore();
  };

  // ================= SES ÇİZİMLERİ =================
  // sinüs noktaları (y yukarı pozitif)
  F.sine = (x0, y0, len, amp, cyc, ph = 0, n) => {
    n = n || Math.max(48, Math.ceil(cyc * 28)); const pts = [];
    for (let i = 0; i <= n; i++) { const u = i / n; pts.push([x0 + u * len, y0 - amp * Math.sin(2 * Math.PI * cyc * u + ph)]); }
    return pts;
  };
  F.waveLine = (ctx, x0, y0, len, amp, cyc, o = {}) => {
    const pts = F.sine(x0, y0, len, amp, cyc, o.ph ?? 0);
    P.drawOn(ctx, pts, o.k ?? 1, { w: o.w ?? 4, color: o.color ?? SND, dry: false, taper: 0.02, seed: o.seed ?? 5 });
    return pts;
  };
  // ses grafiği (osiloskop benzeri, defter karesinde): aynı süre içinde cyc titreşim
  F.graph = (ctx, x, y, w, h, cyc, amp, k, o = {}) => {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= Math.min(1, k * 5);
    const b = F.rr(x, y, w, h, 10, 3);
    P.fillPts(ctx, b, PAL.white, 0.9); stroke(ctx, b, { w: 2.4, closed: true, seed: o.seed ?? 61 });
    ctx.save(); ctx.globalAlpha *= 0.25; ctx.strokeStyle = PAL.water; ctx.lineWidth = 1;
    for (let gx = x + w / 8; gx < x + w - 2; gx += w / 8) { ctx.beginPath(); ctx.moveTo(gx, y + 6); ctx.lineTo(gx, y + h - 6); ctx.stroke(); }
    ctx.restore();
    line(ctx, [x + 14, y + h / 2], [x + w - 14, y + h / 2], { w: 1.4, dry: false, alpha: 0.5 });
    F.waveLine(ctx, x + 24, y + h / 2, w - 48, amp, cyc, { k, w: o.w ?? 4, color: o.color ?? SND, ph: o.ph ?? 0 });
    if (o.axis !== false) INK.label(ctx, 'zaman →', x + w - 12, y + h + 34, { size: 28, align: 'right', alpha: 0.6 });
    ctx.restore();
  };
  // yayılan dalga cepheleri (yaylar)
  F.rings = (ctx, x, y, t, o = {}) => {
    const gap = o.gap ?? 60, sp = o.speed ?? 120, maxR = o.maxR ?? 400, r0 = o.r0 ?? 30, a0 = o.a0 ?? -0.6, a1 = o.a1 ?? 0.6, col = o.color ?? SND;
    const n = Math.ceil((maxR - r0) / gap) + 1, off = ((t * sp) % gap + gap) % gap;
    for (let i = 0; i < n; i++) {
      const r = r0 + off + i * gap; if (r > maxR) continue;
      if (o.front != null && r > r0 + o.front) continue;
      const fade = o.noFade ? 1 : 1 - (r - r0) / (maxR - r0) * (o.fadeK ?? 0.85);
      ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1) * fade;
      stroke(ctx, P.arc(x, y, r, a0, a1, Math.max(8, ((a1 - a0) * r / 14) | 0)), { w: (o.w ?? 3.4) * (o.wFade ? fade : 1), color: col, dry: false, taper: 0.25, seed: 70 + i });
      ctx.restore();
    }
  };
  // titreşim işaretleri ))) (((
  F.vib = (ctx, x, y, t, o = {}) => {
    const r0 = o.r0 ?? 26, sp = o.span ?? 0.7, col = o.color ?? SND, a = o.alpha ?? 1;
    [-1, 1].forEach(side => {
      if (o.side && o.side !== side) return;
      for (let j = 0; j < (o.n ?? 3); j++) {
        const r = r0 + j * (o.gap ?? 12), pulse = 0.5 + 0.5 * Math.sin(t * 14 - j * 1.4);
        const c = side > 0 ? 0 : Math.PI;
        ctx.save(); ctx.globalAlpha *= a * (0.35 + 0.65 * pulse);
        stroke(ctx, P.arc(x, y, r, c - sp / 2, c + sp / 2, 10), { w: o.w ?? 3, color: col, dry: false, taper: 0.3 });
        ctx.restore();
      }
    });
  };
  // boyuna ses dalgası tanecik modeli: her tanecik denge konumu çevresinde ileri-geri titreşir
  F.particles = (ctx, x0, y0, w, h, t, o = {}) => {
    const d = o.d ?? 26, rows = o.rows ?? Math.max(1, Math.floor(h / d)), lam = o.lam ?? 180, amp = o.amp ?? 16, f = o.f ?? 1, R = rng(o.seed ?? 5);
    const cols = Math.floor(w / d), rad = o.r ?? 6.5;
    ctx.save(); ctx.lineWidth = 1.4; ctx.strokeStyle = PAL.ink;
    const fill = o.fill ?? PAL.water;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const jx = (R() - 0.5) * d * 0.3, jy = (R() - 0.5) * d * 0.35;
      if (o.skip && R() < o.skip) continue;
      const bx = x0 + c * d + d / 2 + jx, by = y0 + r * d + d / 2 + jy, u = bx - x0;
      let env = 1; if (o.front != null) env = E.clamp((o.front - u) / 50);
      const dx = amp * env * Math.sin(2 * Math.PI * (u / lam - f * t));
      const hi = o.hi && o.hi[0] === r && o.hi[1] === c;
      ctx.globalAlpha = (o.alpha ?? 1) * (hi ? 1 : 0.8);
      ctx.fillStyle = hi ? PAL.light : fill;
      ctx.beginPath(); ctx.arc(bx + dx, by, hi ? rad * 1.5 : rad, 0, 7); ctx.fill(); ctx.stroke();
      if (hi) { ctx.save(); ctx.globalAlpha = 0.7; ctx.setLineDash([5, 5]); ctx.beginPath(); ctx.moveTo(bx, by - 26); ctx.lineTo(bx, by + 26); ctx.stroke(); ctx.restore(); }
    }
    ctx.restore();
  };
  // masa (üst yüzey y)
  F.desk = (ctx, x0, x1, y, o = {}) => {
    const top = [[x0, y], [x1, y - 2], [x1, y + 26], [x0, y + 28]];
    F.shape(ctx, top, WOOD, 0.55, o.seed ?? 201);
    if (o.legs !== false) { line(ctx, [x0 + 40, y + 28], [x0 + 44, y + (o.legH ?? 200)], { w: 7, color: WOOD }); line(ctx, [x1 - 40, y + 28], [x1 - 44, y + (o.legH ?? 200)], { w: 7, color: WOOD }); }
  };
  // masa kenarında cetvel: (x,y) masa kenarı, over: taşan uzunluk, amp: uç genliği
  F.ruler = (ctx, x, y, over, t, amp, o = {}) => {
    const inLen = o.inLen ?? 230, th = 12, fq = o.fq ?? 9;
    const tip = amp * Math.sin(t * fq * 2 * Math.PI);
    const body = (dy) => { const up = [], dn = []; up.push([x - inLen, y - th]); dn.push([x - inLen, y]); for (let i = 0; i <= 16; i++) { const u = i / 16, yy = dy * u * u; up.push([x + u * over, y - th + yy]); dn.push([x + u * over, y + yy]); } return up.concat(dn.reverse()); };
    if (amp > 0.5) [-1, 1].forEach(s => { const g = body(s * amp); P.fillPts(ctx, closeP(g), PAL.light, 0.12); });
    const b = closeP(body(tip)); P.fillPts(ctx, b, '#F2D38A', 0.95); stroke(ctx, b, { w: 2.2, closed: true, seed: 211 });
    for (let i = 1; i < (inLen + over) / 24; i++) { const xx = x - inLen + i * 24; if (xx > x) break; line(ctx, [xx, y - th], [xx, y - th + (i % 2 ? 5 : 8)], { w: 1.1, dry: false }); }
    // bastıran el / ağırlık
    if (o.hand !== false) { const hp = wobble(circlePts(x - inLen * 0.55, y - th - 18, 46, 22, 30), 2, 212); P.fillPts(ctx, hp, PAL.water, 0.35); stroke(ctx, hp, { w: 2.4, closed: true, seed: 213 }); }
    return [x + over, y - th / 2 + tip];
  };
  // davul (yan görünüm), grains: pirinç taneleri, vib 0..1
  F.drum = (ctx, x, y, s, t, vib = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const top = circlePts(0, -150, 120, 30, 40), bot = P.arc(0, 0, 120, 0, Math.PI, 24, 30);
    const body = [[-120, -150]].concat(P.arc(0, 0, 120, Math.PI, 0, 24, 30).reverse().map(p => p)).concat([[120, -150]]);
    const shell = [[-120, -150], [-120, 0]].concat(P.arc(0, 0, 120, Math.PI, 0, 24, 30)).concat([[120, 0], [120, -150]]);
    P.fillPts(ctx, shell, '#B5553F', 0.55); stroke(ctx, shell, { w: 2.6, seed: 221 });
    for (let i = 0; i < 6; i++) { const a = -110 + i * 44; line(ctx, [a, -148], [a + 22, -4 + Math.abs(a + 11) * 0.12], { w: 1.6, dry: false, alpha: 0.7 }); line(ctx, [a + 22, -4 + Math.abs(a + 11) * 0.12], [a + 44, -148], { w: 1.6, dry: false, alpha: 0.7 }); }
    const skinDy = vib * 5 * Math.sin(t * 60);
    const sk = circlePts(0, -150 + skinDy, 120, 30, 40); P.fillPts(ctx, sk, '#F3E6C8'); stroke(ctx, sk, { w: 2.6, closed: true, seed: 222 });
    if (o.grains) { const R = rng(223); for (let i = 0; i < 14; i++) { const gx = (R() - 0.5) * 170, gy = -150 + (R() - 0.5) * 30; const jump = vib * (18 + R() * 30) * Math.abs(Math.sin(t * (9 + R() * 4) + i)); ctx.save(); ctx.translate(gx, gy - jump - 3); ctx.rotate(R() * 3); ctx.fillStyle = '#FFFDF4'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(0, 0, 6, 3, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); } }
    if (o.stick) { const a = o.stick; ctx.save(); ctx.translate(150, -260); ctx.rotate(-0.4 + (1 - a) * 0.8); line(ctx, [0, 0], [-130, 90], { w: 7, color: WOOD, taper: 0 }); P.fillPts(ctx, circlePts(-132, 92, 13, 13, 16), '#F3E6C8'); stroke(ctx, circlePts(-132, 92, 13, 13, 16), { w: 2, closed: true, dry: false }); ctx.restore(); }
    ctx.restore();
  };
  // bağlama (saz): gövde merkezi (x,y), sap sola-yukarı; vib: tel titreşimi 0..1
  F.baglama = (ctx, x, y, s, t, vib = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0.35); ctx.scale(s, s);
    const body = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; const r = 1 + 0.18 * Math.cos(a); body.push([Math.cos(a) * 110 * r, Math.sin(a) * 70]); }
    F.shape(ctx, body, WOOD, 0.6, 231);
    const neck = [[-100, -12], [-470, -9], [-470, 9], [-100, 12]]; F.shape(ctx, neck, WOOD, 0.4, 233);
    const head = [[-470, -14], [-560, -18], [-560, 18], [-470, 14]]; F.shape(ctx, head, WOOD, 0.7, 235);
    for (let i = 0; i < 3; i++) line(ctx, [-490 - i * 24, -18], [-490 - i * 24, -36], { w: 4, dry: false });
    for (let j = 0; j < 7; j++) line(ctx, [-150 - j * 44, -11], [-150 - j * 44, 11], { w: 1.2, dry: false, alpha: 0.6 });
    // teller: köprü (60,0) → eşik (-470,0)
    const x1 = 70, x2 = -470;
    for (let st = -1; st <= 1; st++) {
      const amp = vib * 7 * Math.sin(t * 70 + st), pts = [];
      for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([x1 + (x2 - x1) * u, st * 5 + amp * Math.sin(Math.PI * u)]); }
      stroke(ctx, pts, { w: 1.3, dry: false, color: '#3a3a3a' });
      if (vib > 0.05) { ctx.save(); ctx.globalAlpha *= 0.25 * vib; P.fillPts(ctx, closeP(P.bez([x1, st * 5], [(x1 + x2) / 2, st * 5 + 14 * vib], [x2, st * 5], 20).concat(P.bez([x2, st * 5], [(x1 + x2) / 2, st * 5 - 14 * vib], [x1, st * 5], 20))), PAL.light); ctx.restore(); }
    }
    line(ctx, [70, -12], [70, 12], { w: 4, dry: false });
    ctx.restore();
  };
  // flüt: sol uç (x,y), yatay
  F.flute = (ctx, x, y, s, t, vib = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const tb = [[0, -14], [420, -14], [420, 14], [0, 14]]; F.shape(ctx, tb, WOOD, 0.35, 241);
    for (let i = 0; i < 6; i++) { P.fillPts(ctx, circlePts(170 + i * 38, 0, 6, 5, 12), PAL.ink, 0.85); }
    P.fillPts(ctx, circlePts(50, 0, 9, 6, 12), PAL.ink, 0.85);
    if (vib > 0) { ctx.save(); ctx.globalAlpha *= vib; const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([60 + u * 350, Math.sin(u * 30 - t * 30) * 5]); } stroke(ctx, pts, { w: 2.2, color: SND, dry: false }); ctx.restore(); }
    ctx.restore();
  };
  // diyapazon: sap ucu (x,y) aşağıda, çatal yukarı; vib 0..1
  F.fork = (ctx, x, y, s, t, vib = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s);
    const d = vib * 5 * Math.sin(t * 80);
    line(ctx, [0, 0], [0, -90], { w: 9, color: METAL, taper: 0 }); stroke(ctx, [[0, 0], [0, -90]], { w: 1.6, dry: false });
    const U = P.arc(0, -110, 26, 0, Math.PI, 16).reverse();
    stroke(ctx, U, { w: 9, color: METAL, taper: 0, dry: false });
    [-1, 1].forEach(sd => {
      const px = sd * 26 + sd * d; line(ctx, [sd * 26, -110], [px, -250], { w: 9, color: METAL, taper: 0, dry: false });
      if (vib > 0.05) { ctx.save(); ctx.globalAlpha *= 0.3; line(ctx, [sd * 26, -110], [sd * 26 - sd * 6 * vib, -250], { w: 7, color: METAL, taper: 0, dry: false }); line(ctx, [sd * 26, -110], [sd * 26 + sd * 6 * vib, -250], { w: 7, color: METAL, taper: 0, dry: false }); ctx.restore(); }
    });
    ctx.restore();
  };
  // çalar saat: merkez (x,y), ring 0..1 (çekiç çanlara vuruyor)
  F.clock = (ctx, x, y, s, t, ring = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-34, 44], [-50, 70], { w: 5 }); line(ctx, [34, 44], [50, 70], { w: 5 });
    [-1, 1].forEach(sd => { const b = P.arc(sd * 38, -60, 26, Math.PI, 2 * Math.PI, 14).concat([[sd * 38 + 26, -58], [sd * 38 - 26, -58]]); F.shape(ctx, b, AMB, 0.6, 250 + sd); });
    const ham = ring * Math.sin(t * 40) * 0.5; ctx.save(); ctx.translate(0, -50); ctx.rotate(ham); line(ctx, [0, 0], [0, -46], { w: 3 }); inkDot(ctx, 0, -48, 6); ctx.restore();
    const face = circlePts(0, 0, 58, 58, 40); F.shape(ctx, face, PAL.water, 0.3, 255, { w: 3.2 });
    P.fillPts(ctx, circlePts(0, 0, 46, 46, 30), PAL.white, 1);
    for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; line(ctx, [Math.cos(a) * 38, Math.sin(a) * 38], [Math.cos(a) * 44, Math.sin(a) * 44], { w: 2, dry: false }); }
    line(ctx, [0, 0], [0, -30], { w: 3, dry: false }); line(ctx, [0, 0], [Math.cos(t * 0.3) * 22, Math.sin(t * 0.3) * 22], { w: 3, dry: false });
    if (ring > 0.05) F.vib(ctx, 0, -70, t, { r0: 80, gap: 14, alpha: ring, span: 0.8 });
    ctx.restore();
  };
  // fanus (cam çan) + taban; air 0..1 içerideki hava miktarı
  F.jar = (ctx, x, y, s, t, air = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const base = [[-230, 0], [230, 0], [240, 34], [-240, 34]]; F.shape(ctx, base, METAL, 0.5, 261);
    const dome = [[-190, 0]].concat(P.arc(0, -230, 190, Math.PI, 2 * Math.PI, 40)).concat([[190, 0]]);
    // hava tanecikleri
    const n = Math.round(46 * air), R = rng(262);
    ctx.save(); ctx.fillStyle = PAL.water; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1;
    for (let i = 0; i < 46; i++) { const px = (R() - 0.5) * 340, py = -20 - R() * 380, ph = R() * 6; if (i >= n) continue; if (Math.hypot(px, (py + 230) * 1) > 175 && py < -230) continue; const jx = Math.sin(t * 3 + ph) * 6, jy = Math.cos(t * 2.6 + ph * 2) * 6; ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(px + jx, py + jy, 5, 0, 7); ctx.fill(); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.12; P.fillPts(ctx, closeP(dome), PAL.water); ctx.restore();
    stroke(ctx, dome, { w: 3.4, seed: 263 });
    stroke(ctx, P.arc(-40, -250, 140, Math.PI * 1.15, Math.PI * 1.4, 12), { w: 5, color: PAL.white, dry: false, alpha: 0.8 });
    ctx.restore();
  };
  F.pump = (ctx, x, y, s, t, run = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, -120], [80, -120], [80, 0], [-80, 0]]; F.shape(ctx, b, METAL, 0.55, 271);
    F.fit(ctx, 'POMPA', 0, -70, 140, 30);
    const w = circlePts(0, -30, 20, 20, 20); stroke(ctx, w, { w: 2.4, closed: true }); line(ctx, [0, -30], [Math.cos(t * 8 * run) * 18, -30 + Math.sin(t * 8 * run) * 18], { w: 2.4, dry: false });
    ctx.restore();
  };
  // kulak (profil), (x,y) merkez; flip: sola bakan
  F.ear = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    const outer = P.bez([-10, -70], [70, -90], [50, 10], 20).concat(P.bez([50, 10], [34, 60], [0, 70], 14)).concat(P.bez([0, 70], [-20, 70], [-24, 50], 8));
    P.fillPts(ctx, closeP(outer.concat([[-20, -20]])), SKIN, 0.9);
    stroke(ctx, outer, { w: 3.4, seed: 281 });
    stroke(ctx, P.bez([0, -46], [40, -56], [28, 0], 14).concat(P.bez([28, 0], [20, 20], [4, 22], 8)), { w: 2.4, seed: 282 });
    inkDot(ctx, 4, 8, 5);
    ctx.restore();
  };
  // balon (hava/su dolu)
  F.balloon = (ctx, x, y, r, kind, o = {}) => {
    const b = wobble(circlePts(x, y, r, r * 1.08, 40), 1.5, 291);
    P.fillPts(ctx, b, PAL.white, 0.9);
    if (kind === 'water') wash(ctx, b, PAL.water, 0.55, 292, { bleed: 1, blooms: 0 });
    else wash(ctx, b, '#C9B8E0', 0.35, 293, { bleed: 1, blooms: 0 });
    stroke(ctx, b, { w: 2.8, closed: true, seed: 294 });
    line(ctx, [x - 8, y + r * 1.08], [x + 8, y + r * 1.08 + 12], { w: 3 });
    stroke(ctx, P.arc(x - r * 0.35, y - r * 0.4, r * 0.35, Math.PI * 1.1, Math.PI * 1.5, 8), { w: 4, color: PAL.white, dry: false });
  };
  // su kabı (yan kesit) + yüzey halkaları (üstten görünüm elipsleri)
  F.bowl = (ctx, x, y, w, h, o = {}) => {
    const b = [[x - w / 2, y - h], [x - w / 2 + 16, y], [x + w / 2 - 16, y], [x + w / 2, y - h]];
    const water = [[x - w / 2 + 4, y - h * 0.75], [x - w / 2 + 16, y - 4], [x + w / 2 - 16, y - 4], [x + w / 2 - 4, y - h * 0.75]];
    P.fillPts(ctx, closeP(water), PAL.water, 0.35); stroke(ctx, b, { w: 3, seed: 301 });
    stroke(ctx, circlePts(x, y - h, w / 2, 16, 40), { w: 2.4, closed: true, seed: 302, alpha: 0.7 });
  };
  F.ripples = (ctx, x, y, t, t0, o = {}) => {
    if (t < t0) return; const sp = o.speed ?? 110, n = o.n ?? 5, per = o.per ?? 0.55, maxR = o.maxR ?? 260;
    for (let i = 0; i < n; i++) {
      const age = t - t0 - i * per; if (age < 0) continue; const r = age * sp; if (r > maxR) continue;
      ctx.save(); ctx.globalAlpha *= 1 - r / maxR; stroke(ctx, circlePts(x, y, r, r * (o.flat ?? 0.28), 50), { w: 4.5, closed: true, color: PAL.water, dry: false, seed: 310 + i }); ctx.restore();
    }
  };
  // ağaç (rüzgârda sallanan)
  F.tree = (ctx, x, y, s, t, wind = 0, seed = 320) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [0, 0], [4, -170], { w: 12, color: WOOD, taper: 0.1 }); line(ctx, [2, -110], [-50, -170], { w: 6, color: WOOD }); line(ctx, [3, -130], [50, -190], { w: 6, color: WOOD });
    const sw = wind * 8 * Math.sin(t * 2.2);
    [[-60, -210, 80, 62], [50, -230, 85, 66], [0, -280, 90, 70]].forEach(([cx, cy, rx, ry], i) => { const cr = wobble(circlePts(cx + sw, cy, rx, ry, 40), 6, seed + i); wash(ctx, cr, PAL.life, 0.5, seed + 5 + i, { bleed: 3 }); stroke(ctx, cr, { w: 2.6, closed: true, seed: seed + 9 + i }); });
    if (wind > 0) { const R = rng(seed + 20); for (let i = 0; i < 16; i++) { const lx = (R() - 0.5) * 200 + sw, ly = -200 - R() * 130, a = Math.sin(t * 12 + i) * 0.6 * wind; ctx.save(); ctx.translate(lx, ly); ctx.rotate(a); P.fillPts(ctx, circlePts(0, 0, 10, 5, 12), '#4E6B24', 0.8); ctx.restore(); } }
    ctx.restore();
  };
  F.windLines = (ctx, x, y, t, k = 1) => {
    for (let i = 0; i < 4; i++) { const ph = (t * 0.6 + i * 0.27) % 1, xx = x + ph * 500, yy = y + i * 46; ctx.save(); ctx.globalAlpha *= k * Math.sin(ph * Math.PI) * 0.7; stroke(ctx, P.bez([xx, yy], [xx + 60, yy - 18], [xx + 150, yy], 16).concat(P.arc(xx + 160, yy - 14, 14, Math.PI / 2, -Math.PI, 10)), { w: 2.4, dry: false }); ctx.restore(); }
  };
  // hoparlör (önü sağa)
  F.speaker = (ctx, x, y, s, t, vib = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-70, -110], [60, -110], [60, 110], [-70, 110]]; F.shape(ctx, b, '#5B5566', 0.55, 341);
    const d = vib * 4 * Math.sin(t * 50);
    const cone = circlePts(6 + d, 30, 20, 50, 30); P.fillPts(ctx, cone, '#3a3842', 0.8); stroke(ctx, cone, { w: 2.4, closed: true });
    stroke(ctx, circlePts(6 + d, -60, 12, 26, 20), { w: 2.2, closed: true });
    ctx.restore();
  };
  // kulaklık
  F.headphones = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, P.arc(0, 0, 70, Math.PI * 1.05, Math.PI * 1.95, 24), { w: 9, color: '#3a3842' });
    [-1, 1].forEach(sd => { const c = F.rr(sd * 70 - 20, -10, 40, 64, 14, 3); F.shape(ctx, c, '#5B5566', 0.6, 351 + sd); });
    ctx.restore();
  };
  // uçak (yan)
  F.plane = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-160, -10], [120, -18], [170, 0], [120, 18], [-160, 12]]; F.shape(ctx, body, METAL, 0.3, 361);
    F.shape(ctx, [[-10, 0], [60, 0], [-40, 80], [-70, 80]], METAL, 0.5, 363); F.shape(ctx, [[-140, -8], [-110, -8], [-150, -60], [-170, -60]], METAL, 0.5, 365);
    for (let i = 0; i < 6; i++) P.fillPts(ctx, circlePts(-60 + i * 26, -4, 5, 4, 10), PAL.water, 0.8);
    ctx.restore();
  };
  // pencere (4 cam)
  F.window = (ctx, x, y, w, h, t, shake = 0) => {
    const d = shake * 3 * Math.sin(t * 45);
    const f = [[x + d, y], [x + w + d, y], [x + w + d, y + h], [x + d, y + h]]; F.shape(ctx, f, PAL.water, 0.18, 371, { w: 4 });
    line(ctx, [x + w / 2 + d, y], [x + w / 2 + d, y + h], { w: 4 }); line(ctx, [x + d, y + h / 2], [x + w + d, y + h / 2], { w: 4 });
    if (shake > 0.05) { F.vib(ctx, x + w / 2, y + h / 2, t, { r0: w / 2 + 16, gap: 14, alpha: shake, span: 0.9 }); }
  };
  // kedi ve aslan başları (basit)
  F.cat = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const head = circlePts(0, 0, 70, 60, 40); F.shape(ctx, head, '#9A9387', 0.35, 381);
    [-1, 1].forEach(sd => { const e = [[sd * 30, -48], [sd * 62, -100], [sd * 66, -30]]; F.shape(ctx, e, '#9A9387', 0.35, 383 + sd); P.fillPts(ctx, circlePts(sd * 24, -10, 8, 11, 12), PAL.ink); for (let j = -1; j <= 1; j++) line(ctx, [sd * 28, 20 + j * 8], [sd * 90, 14 + j * 14], { w: 1.4, dry: false }); });
    P.fillPts(ctx, [[-7, 10], [7, 10], [0, 18]], '#B5553F'); stroke(ctx, P.arc(-8, 22, 8, 0.2, Math.PI - 0.2, 8), { w: 2, dry: false }); stroke(ctx, P.arc(8, 22, 8, 0.2, Math.PI - 0.2, 8), { w: 2, dry: false });
    ctx.restore();
  };
  F.lion = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const mane = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2; const r = 118 + 16 * Math.sin(a * 11); mane.push([Math.cos(a) * r, Math.sin(a) * r * 0.95]); }
    F.shape(ctx, mane, '#A8651E', 0.6, 391);
    const head = circlePts(0, 10, 72, 70, 40); F.shape(ctx, head, AMB, 0.45, 393);
    [-1, 1].forEach(sd => { P.fillPts(ctx, circlePts(sd * 28, -8, 8, 9, 12), PAL.ink); });
    P.fillPts(ctx, [[-12, 18], [12, 18], [0, 30]], PAL.ink);
    const m = circlePts(0, 52, 26, 20, 20); P.fillPts(ctx, m, '#6B2A1A', 0.9); stroke(ctx, m, { w: 2, closed: true });
    ctx.restore();
  };
  // ses şiddeti göstergesi (5 blok) — birim YOK (program sınırı)
  F.meter = (ctx, x, y, level, k = 1, o = {}) => {
    const n = 5, bw = o.bw ?? 30, gap = 8;
    for (let i = 0; i < n; i++) {
      const bx = x + i * (bw + gap), bh = 18 + i * 10, by = y - bh; const b = [[bx, by], [bx + bw, by], [bx + bw, y], [bx, y]];
      const on = level > i + 0.5 ? E.clamp(k * n - i) : 0;
      P.fillPts(ctx, closeP(b), PAL.white, 0.9); if (on > 0) P.fillPts(ctx, closeP(b), i >= 4 && o.warn ? RED : SND, 0.85 * on);
      stroke(ctx, closeP(b), { w: 1.8, closed: true, dry: false, seed: 400 + i });
    }
  };
  // yüzeyler: metal tepsi (sert, düz), tahta, girintili çıkıntılı gözenekli sünger
  F.surface = (ctx, x, y, w, h, kind, o = {}) => {
    if (kind === 'metal') { const b = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; F.shape(ctx, b, METAL, 0.6, 411); for (let i = 0; i < 3; i++) line(ctx, [x + 20 + i * 30, y + 10], [x + 40 + i * 30, y + h - 10], { w: 2, color: PAL.white, dry: false, alpha: 0.8 }); }
    else if (kind === 'wood') { const b = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; F.shape(ctx, b, WOOD, 0.55, 413); for (let i = 1; i < 4; i++) stroke(ctx, P.bez([x + 8, y + i * h / 4], [x + w / 2, y + i * h / 4 + 8], [x + w - 8, y + i * h / 4], 12), { w: 1.2, dry: false, alpha: 0.6 }); }
    else if (kind === 'foam') {
      const pts = [[x, y + h]]; const nz = 10; for (let i = 0; i <= nz; i++) { pts.push([x + (i % 2 ? 28 : 0), y + i * h / nz]); }
      pts.push([x + w, y]); pts.push([x + w, y + h]);
      // dişli ön yüz (sol kenar: girintili çıkıntılı)
      F.shape(ctx, pts, '#C9A0B8', 0.5, 415);
      const R = rng(416); ctx.save(); ctx.fillStyle = PAL.ink; ctx.globalAlpha *= 0.35; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(x + 20 + R() * (w - 26), y + 6 + R() * (h - 12), 1.5 + R() * 2.5, 0, 7); ctx.fill(); } ctx.restore();
    } else if (kind === 'cloth') { const pts = []; for (let i = 0; i <= 20; i++) pts.push([x + Math.sin(i * 1.3) * 10, y + i * h / 20]); const b = pts.concat([[x + w, y + h], [x + w, y]]); F.shape(ctx, b, '#8C5A7A', 0.45, 417); for (let i = 1; i < 5; i++) stroke(ctx, [[x + i * w / 5, y + 6], [x + i * w / 5 + 4, y + h - 6]], { w: 1.4, dry: false, alpha: 0.5 }); }
    else if (kind === 'tile') { const b = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; F.shape(ctx, b, '#8FB3C4', 0.35, 419); for (let gy = y + 40; gy < y + h; gy += 40) line(ctx, [x, gy], [x + w, gy], { w: 1.4, dry: false, alpha: 0.6 }); for (let gx = x + 40; gx < x + w; gx += 40) line(ctx, [gx, y], [gx, y + h], { w: 1.4, dry: false, alpha: 0.6 }); }
  };
  // Selimiye benzeri cami silueti (merkezi kubbe + 4 minare) — şematik
  F.mosque = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const base = [[-230, 0], [230, 0], [230, -110], [-230, -110]]; F.shape(ctx, base, '#D9CBB0', 0.5, 431);
    [-1, 1].forEach(sd => { const hd = [[sd * 230, -110]].concat(P.arc(sd * 165, -110, 65, Math.PI, 2 * Math.PI, 16)).concat([[sd * 100, -110]]); F.shape(ctx, hd.map(p => [p[0], p[1]]), '#8FA3AE', 0.45, 433 + sd); });
    const dome = [[-150, -130]].concat(P.arc(0, -150, 150, Math.PI, 2 * Math.PI, 36)).concat([[150, -130]]);
    const drum = [[-160, -110], [160, -110], [160, -150], [-160, -150]]; F.shape(ctx, drum, '#D9CBB0', 0.5, 436);
    F.shape(ctx, dome.map(p => [p[0], p[1] + 0]), '#8FA3AE', 0.5, 437);
    line(ctx, [0, -300], [0, -340], { w: 3 }); inkDot(ctx, 0, -344, 5);
    for (let i = -3; i <= 3; i++) { const a = [[i * 50 - 12, -30], [i * 50 + 12, -30], [i * 50 + 12, -70], [i * 50 - 12, -70]]; P.fillPts(ctx, closeP(P.arc(i * 50, -70, 12, Math.PI, 2 * Math.PI, 8).concat([[i * 50 + 12, -30], [i * 50 - 12, -30]])), PAL.ink, 0.5); }
    [-270, -250, 250, 270].forEach((mx, i) => { const w = 12; const m = [[mx - w / 2, 0], [mx + w / 2, 0], [mx + w / 2, -400], [mx, -440], [mx - w / 2, -400]]; F.shape(ctx, m, '#D9CBB0', 0.4, 440 + i, { w: 2 }); line(ctx, [mx - 12, -250], [mx + 12, -250], { w: 2, dry: false }); line(ctx, [mx - 12, -330], [mx + 12, -330], { w: 2, dry: false }); });
    ctx.restore();
  };
  F.car = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-120, -20], [-100, -60], [-40, -90], [50, -90], [100, -50], [130, -40], [130, -10], [-120, -10]]; F.shape(ctx, b, '#B5553F', 0.55, 451);
    P.fillPts(ctx, [[-30, -80], [40, -80], [80, -50], [-70, -50]], PAL.water, 0.4);
    [-70, 80].forEach(wx => { const w = circlePts(wx, -8, 24, 24, 24); P.fillPts(ctx, w, '#3a3842'); stroke(ctx, w, { w: 2.4, closed: true }); });
    ctx.restore();
  };
  F.bird = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = circlePts(0, 0, 30, 20, 24); F.shape(ctx, b, PAL.life, 0.5, 461);
    const h = circlePts(28, -18, 14, 14, 16); F.shape(ctx, h, PAL.life, 0.5, 463);
    P.fillPts(ctx, [[40, -20], [58, -16], [40, -12]], AMB); inkDot(ctx, 31, -21, 2.5);
    const fl = Math.sin(t * 6) * 10; stroke(ctx, [[-6, -6], [-26, -30 - fl], [10, -10]], { w: 2.4 });
    line(ctx, [-28, 4], [-50, 10], { w: 3 });
    ctx.restore();
  };
  F.whale = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = P.bez([-160, 0], [-60, -90], [120, -30], 24).concat(P.bez([120, -30], [150, 10], [100, 40], 10)).concat(P.bez([100, 40], [-40, 60], [-160, 0], 20));
    F.shape(ctx, b, '#4B6B82', 0.55, 471);
    const fl = Math.sin(t * 2) * 10; const tl = [[-150, 0], [-250, -14 + fl], [-215, 2 + fl * 0.5], [-250, 16 + fl]]; F.shape(ctx, tl, '#4B6B82', 0.55, 473); F.shape(ctx, [[20, 30], [60, 34], [-10, 75]], '#4B6B82', 0.6, 474); for (let i = 0; i < 4; i++) stroke(ctx, P.bez([-40 + i * 25, 42], [0 + i * 25, 46], [40 + i * 22, 36], 8), { w: 1.2, dry: false, alpha: 0.6 }); inkDot(ctx, 40, -52, 3);
    inkDot(ctx, 90, -6, 4);
    ctx.restore();
  };
  F.ship = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.shape(ctx, [[-180, 0], [180, 0], [140, 60], [-150, 60]], '#5B5566', 0.55, 481);
    F.shape(ctx, [[-60, 0], [60, 0], [60, -60], [-60, -60]], PAL.white, 0, 483);
    F.shape(ctx, [[10, -60], [40, -60], [40, -110], [10, -110]], '#B5553F', 0.5, 485);
    ctx.restore();
  };
  // Güneş patlaması (flare)
  F.flare = (ctx, x, y, r, t, k) => {
    if (k <= 0) return;
    const a = -0.6; const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const rr = r + Math.sin(u * Math.PI) * r * 0.55 * k; const aa = a - 0.35 + u * 0.7; pts.push([x + Math.cos(aa) * rr, y + Math.sin(aa) * rr]); }
    stroke(ctx, pts, { w: 10, color: '#D26A1E', dry: false }); stroke(ctx, pts, { w: 3, color: '#FFE3A0', dry: false });
  };
  // karton boru (ses yönlendirmek için)
  F.tube = (ctx, a, b, r = 26, seed = 491) => {
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), nx = -Math.sin(ang) * r, ny = Math.cos(ang) * r;
    const q = [[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]];
    F.shape(ctx, q, WOOD, 0.3, seed);
    stroke(ctx, circlePts(b[0], b[1], r * 0.35, r, 16, ang), { w: 2, closed: true, dry: false });
  };
  G.S8 = F;
})(window);

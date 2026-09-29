// props.js — 7. sınıf Film 20 → window.F720
// Kaydırak, saçlı çocuk, balon, yün kumaş, kâğıt parçaları, kavanoz elektroskop, şimşek bulutu, kapı kolu, fotokopi, elektrostatik boya, priz, Van de Graaff.
// Ortak taban (rr / shape / fit / card) 6. sınıf Ünite 7 props.js (F621/F622) dosyalarından uyarlanmıştır.
(function (G) {
  // ---------------- ORTAK TABAN (7. sınıf Ünite 6–7 filmleri: 20, 21, 22, 23) ----------------
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, hatch, arrowHead, rng } = G.INK;
  const F = {};
  const RED = '#A23A2A', HEAT = '#B5553F', GREEN = '#3F7A3A', AMB = '#C07F1E', POS = '#C0612A', NEG = '#2E6A8C';
  Object.assign(F, { RED, HEAT, GREEN, AMB, POS, NEG });
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
  // sabit metin, genişliğe sığdırılır
  F.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    if (o.rot) { ctx.translate(x, y); ctx.rotate(o.rot); ctx.fillText(txt, 0, 0); } else ctx.fillText(txt, x, y);
    ctx.restore();
  };
  // el yazısıyla açılan metin, genişliğe sığdırılır
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
  // damga (ör. "DOĞRU", "YANLIŞ", "KAYNAK YOK")
  F.stamp = (ctx, x, y, txt, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k), col = o.color ?? GREEN, size = o.size ?? 44;
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12); ctx.scale(s, s);
    ctx.font = `700 ${size}px Kalam`; const w = ctx.measureText(txt).width + 40, h = size * 1.35;
    const b = F.rr(-w / 2, -h / 2, w, h, 10, 3); P.fillPts(ctx, b, PAL.white, 0.7);
    stroke(ctx, b, { w: 4, closed: true, color: col, seed: 17, dry: false });
    ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 3);
    ctx.restore();
  };
  // elektrik yükü işareti: sign = +1 / -1 (el çizimi; yazı tipine bağlı değil)
  F.charge = (ctx, x, y, sign, r = 14, o = {}) => {
    const col = sign > 0 ? POS : NEG;
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1);
    if (o.ring !== false) { P.fillPts(ctx, circlePts(x, y, r, r, 18), PAL.white, 0.9); stroke(ctx, circlePts(x, y, r, r, 18), { w: Math.max(1.2, r * 0.12), closed: true, dry: false, color: col, seed: 31 }); }
    const a = r * 0.58, w = Math.max(2, r * 0.22);
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - a, y); ctx.lineTo(x + a, y); if (sign > 0) { ctx.moveTo(x, y - a); ctx.lineTo(x, y + a); } ctx.stroke();
    ctx.restore();
  };
  // Damla sarmalayıcı
  F.damla = (ctx, t, o = {}) => {
    DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'curious', look: [0.6, -0.2], blink: E.blink(t, o.bseed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.4], [1, 0.5]] }, o));
  };
  F.wave = (t) => [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]];
  // başlık kartı (filmin ilk sahnesi)
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
  // bitiş kartı
  F.endCard = (ctx, t, head, codes, col, extra) => {
    const se = E.s('end'), ek = E.se(t, se, se + 0.8);
    if (ek <= 0) return;
    E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, extra ? 360 : 400, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, head, 960, extra ? 445 : 485, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([600, extra ? 475 : 515], [960, extra ? 486 : 526], [1320, extra ? 470 : 510], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: col ?? PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, extra ? 565 : 610, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, extra ? 620 : 670, { size: 32, align: 'center', alpha: 0.7 });
      if (extra) INK.label(c, extra, 960, 690, { size: 36, weight: 700, align: 'center', color: col ?? AMB, alpha: 0.9 });
      DAMLA.draw(c, { x: 960, y: 905, s: 0.85, view: 'front', expr: 'happy', t, seed: 1, arms: F.wave(t) });
    });
  };
  // gözlem defteri sayfası: başlık + onaylı maddeler
  F.notebookPage = (ctx, t, t0, heading, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 740);
    F.wfit(ctx, heading, 290, 270, E.seg(t, t0 + 0.3, t0 + 1.5), 60, 1300);
    if (t > t0 + 1.5) P.drawOn(ctx, P.bez([286, 292], [720, 304], [1180, 288], 30), E.se(t, t0 + 1.5, t0 + 2.0), { w: 3, color: o.col ?? PAL.light });
    const gap = o.gap ?? 1.0, dy = o.dy ?? 100;
    items.forEach((it, i) => {
      const [txt, col] = Array.isArray(it) ? it : [it, PAL.ink];
      const at = t0 + 1.6 + i * gap, y = 385 + i * dy;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.8, at + 1.2), { w: 6, color: GREEN });
      F.wfit(ctx, txt, 385, y, E.seg(t, at, at + 1.0), 42, o.maxW ?? 1120, { color: col });
    });
  };
  // "Sıra sende" kartı
  F.taskCard = (ctx, t, sk, k, lines, o = {}) => {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      const x0 = o.x ?? 300, x1 = o.x1 ?? 1620;
      const card = [[x0, 160], [x1, 150], [x1 + 10, 830], [x0 + 10, 842], [x0, 160]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.write(c, 'Sıra sende!', (x0 + x1) / 2, 270, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: o.col ?? GREEN });
      lines.forEach((s, i) => { const at = sk + 1.3 + i * (o.gap ?? 1.0); F.wfit(c, (i + 1) + '. ' + s, x0 + 90, 390 + i * 92, E.seg(t, at, at + 1.1), 46, o.maxW ?? 1100); });
      if (o.extra) o.extra(c);
    });
  };
  // basit tablo: cols = [[başlık, genişlik], ...], rows = [[hücre...], ...]
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
  // ---------------- FİLM 20 (Elektriklenme) çizimleri ----------------
  // oyun parkı zemini
  F.park = (ctx, t, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.16)'); g.addColorStop(1, 'rgba(46,106,140,0)');
    ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
    const hill = P.hillLine(E.W, 860);
    const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]);
    P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.22, 2001, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 2002, taper: 0.03 });
    return hill;
  };
  // kaydırak: (x,y) merdiven dibi; kayma yolu fonksiyonu döner
  F.slide = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    // merdiven
    line(ctx, [0, 0], [40, -300], { w: 6, seed: 2010 }); line(ctx, [50, 0], [90, -300], { w: 6, seed: 2011 });
    for (let i = 1; i < 8; i++) { const k = i / 8; line(ctx, [k * 40, -k * 300], [50 + k * 40, -k * 300], { w: 3.4, seed: 2012 + i, dry: false }); }
    // platform
    const pl = [[30, -300], [130, -300], [130, -286], [30, -286]]; F.shape(ctx, pl, AMB, 0.5, 2020);
    // oluk
    const top = P.bez([130, -300], [260, -290], [360, -120], 30).concat(P.bez([360, -120], [420, -20], [540, -12], 20));
    const bot = top.map(p => [p[0], p[1] + 26]).reverse();
    const body = top.concat(bot); P.fillPts(ctx, body, PAL.white); wash(ctx, body, HEAT, 0.55, 2021, { bleed: 1.5, blooms: 1 });
    stroke(ctx, top, { w: 4, seed: 2022 }); stroke(ctx, bot, { w: 3, seed: 2023 });
    line(ctx, [520, 14], [520, 60], { w: 5 }); line(ctx, [300, -100], [300, 60], { w: 5, seed: 2024 });
    ctx.restore();
    return top.map(p => [x + p[0] * s, y + p[1] * s]);
  };
  // saçlı çocuk (baş + gövde) — ayak noktası; spread 0 (düz) → 1 (dikilmiş)
  F.kid = (ctx, x, y, s, t, spread = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(o.rot ?? 0);
    const sit = o.sit ?? 0;
    // gövde
    const bodyH = 90 - sit * 30;
    const tor = [[-30, -40 - bodyH], [30, -40 - bodyH], [36, -40], [-36, -40]]; F.shape(ctx, tor, o.shirt ?? PAL.water, 0.55, 2030);
    if (sit > 0.5) { line(ctx, [-20, -40], [40, -38], { w: 12, color: '#4C5A73', taper: 0 }); line(ctx, [40, -38], [50, -4], { w: 12, color: '#4C5A73', taper: 0 }); }
    else { line(ctx, [-16, -40], [-18, 0], { w: 12, color: '#4C5A73', taper: 0 }); line(ctx, [16, -40], [18, 0], { w: 12, color: '#4C5A73', taper: 0 }); }
    const armA = o.armsUp ? -2.4 : 0.3;
    [-1, 1].forEach(sd => line(ctx, [sd * 28, -30 - bodyH], [sd * 28 + Math.sin(armA) * sd * 55, -30 - bodyH + Math.cos(armA) * 55], { w: 8, color: '#E4B98E', taper: 0.1, seed: 2031 + sd }));
    // baş
    const hy = -40 - bodyH - 58;
    const R = rng(2040);
    // saç telleri (arkada)
    const n = 34;
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1), a0 = Math.PI * (1.0 + u);             // baş üst yarısı
      const bx = Math.cos(a0) * 44, by = hy + Math.sin(a0) * 46;
      const flatA = u < 0.5 ? Math.PI * 0.62 : Math.PI * 0.38;        // aşağı sarkık
      const upA = a0 + (R() - 0.5) * 0.25;                            // radyal dışa
      let aa = E.lerp(flatA, upA, spread) + Math.sin(t * 3 + i) * 0.04 * spread;
      if (o.pull) { const ta = Math.atan2(o.target[1] - by, o.target[0] - bx); let d = ta - aa; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; const w = o.pull * Math.max(0, Math.cos(ta - a0)); aa += d * w; }
      const L = 58 + R() * 26;
      const mid = [bx + Math.cos((a0 + aa) / 2) * L * 0.2, by + Math.sin((a0 + aa) / 2) * L * 0.2];
      stroke(ctx, P.bez([bx, by], [mid[0] + Math.cos(aa) * L * 0.35, mid[1] + Math.sin(aa) * L * 0.35], [bx + Math.cos(aa) * L, by + Math.sin(aa) * L], 10), { w: 3, color: '#5A3A22', seed: 2050 + i, dry: false });
      if (o.hairPos && i % 5 === 2 && spread > 0.3) F.charge(ctx, bx + Math.cos(aa) * L * 0.7, by + Math.sin(aa) * L * 0.7, 1, 9, { alpha: E.clamp((spread - 0.3) * 2) * o.hairPos });
    }
    const face = circlePts(0, hy, 44, 48, 36); P.fillPts(ctx, face, '#F3D2B0'); stroke(ctx, face, { w: 2.6, closed: true, seed: 2060 });
    const cap = P.arc(0, hy, 45, Math.PI * 1.05, Math.PI * 1.95, 20, 49); P.fillPts(ctx, cap.concat([[0, hy - 20]]), '#5A3A22', 0.95);
    inkDot(ctx, -14, hy + 4, 3.4); inkDot(ctx, 14, hy + 4, 3.4);
    const sm = o.surprised ? circlePts(0, hy + 24, 7, 9, 16) : null;
    if (sm) { P.fillPts(ctx, sm, PAL.ink, 0.85); } else stroke(ctx, P.arc(0, hy + 16, 12, 0.3, Math.PI - 0.3, 12), { w: 2.4, dry: false });
    ctx.restore();
  };
  // balon (merkez); charges: [[dx,dy,sign],...]
  F.balloon = (ctx, x, y, r, col = HEAT, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
    const b = []; for (let i = 0; i <= 50; i++) { const a = i / 50 * 6.283; b.push([Math.cos(a) * r * (1 - 0.08 * Math.max(0, Math.sin(a))), Math.sin(a) * r * 1.18 + (Math.sin(a) > 0 ? Math.sin(a) * r * 0.06 : 0)]); }
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, col, 0.6, o.seed ?? 2070, { bleed: 1.2, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 2071 });
    line(ctx, [-r * 0.45, -r * 0.6], [-r * 0.25, -r * 0.85], { w: r * 0.1, color: PAL.white, dry: false });
    const kn = [[-7, r * 1.22], [7, r * 1.22], [0, r * 1.36]]; P.fillPts(ctx, kn.concat([kn[0]]), col, 0.9); stroke(ctx, kn.concat([kn[0]]), { w: 1.8, dry: false });
    if (o.string !== false) stroke(ctx, P.bez([0, r * 1.36], [14, r * 1.36 + 60], [-6, r * 1.36 + (o.strLen ?? 130)], 16), { w: 1.6, dry: false, seed: 2072 });
    (o.charges ?? []).forEach(([dx, dy, sg]) => F.charge(ctx, dx * r, dy * r, sg, o.cr ?? 12, { alpha: o.ca ?? 1 }));
    ctx.restore();
  };
  // yün kumaş (merkez)
  F.wool = (ctx, x, y, w, h, o = {}) => {
    const c = [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2 + 6], [x + w / 2 - 4, y + h / 2], [x - w / 2 + 6, y + h / 2 - 4]];
    F.shape(ctx, c, '#8A6A45', 0.55, 2080);
    ctx.save(); P.path(ctx, closeP(c)); ctx.clip();
    for (let j = 0; j < h / 16; j++) for (let i = 0; i < w / 18; i++) { const px = x - w / 2 + 10 + i * 18, py = y - h / 2 + 10 + j * 16; stroke(ctx, [[px - 5, py - 4], [px, py + 4], [px + 5, py - 4]], { w: 1.4, dry: false, alpha: 0.5, seed: i + j }); }
    ctx.restore();
    (o.charges ?? []).forEach(([dx, dy, sg]) => F.charge(ctx, x + dx * w / 2, y + dy * h / 2, sg, o.cr ?? 12, { alpha: o.ca ?? 1 }));
  };
  // kâğıt parçası
  F.bit = (ctx, x, y, s = 1, seed = 1, a = 0) => {
    const R = rng(2090 + seed); const w = 16 + R() * 12, h = 10 + R() * 8;
    ctx.save(); ctx.translate(x, y); ctx.rotate(a + R() * 1.2); ctx.scale(s, s);
    const p = [[-w / 2, -h / 2], [w / 2, -h / 2 + 2], [w / 2 - 2, h / 2], [-w / 2 + 1, h / 2 - 1]];
    P.fillPts(ctx, closeP(p), PAL.white); stroke(ctx, closeP(p), { w: 1.4, closed: true, dry: false, seed: 2091 + seed });
    ctx.restore();
  };
  // kavanoz elektroskop: (x,y) kavanoz tabanı ortası; open 0..1; o.charges (topuz ve yapraklar)
  F.electroscope = (ctx, x, y, s, open, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const jar = F.rr(-110, -300, 220, 300, 26, 6);
    P.fillPts(ctx, jar, '#EEF4F6', 0.8); wash(ctx, jar, PAL.water, 0.12, 2100, { bleed: 1, blooms: 0 });
    // kapak (yalıtkan)
    const lid = F.rr(-120, -330, 240, 40, 8, 3); F.shape(ctx, lid, '#8A6A45', 0.55, 2101);
    // metal çubuk + topuz
    line(ctx, [0, -400], [0, -150], { w: 7, color: '#6F6B66', taper: 0, seed: 2102 });
    const kb = circlePts(0, -420, 26, 26, 28); P.fillPts(ctx, kb, '#D8D4CC'); wash(ctx, kb, '#6F6B66', 0.4, 2103, { bleed: 1, blooms: 0 }); stroke(ctx, kb, { w: 2.8, closed: true, seed: 2104 });
    // folyo yapraklar
    const ang = 0.05 + open * 0.62;
    [-1, 1].forEach(sd => {
      ctx.save(); ctx.translate(0, -150); ctx.rotate(sd * ang);
      const lf = [[-6, 0], [6, 0], [8, 100], [-8, 100]]; P.fillPts(ctx, closeP(lf), '#E9E4D8'); wash(ctx, closeP(lf), '#9A9387', 0.5, 2105 + sd, { bleed: 0.6, blooms: 0 }); stroke(ctx, closeP(lf), { w: 1.8, closed: true, dry: false, seed: 2107 + sd });
      (o.leafCharges ?? []).forEach(([dy, sg]) => F.charge(ctx, 0, dy * 100, sg, 11, { alpha: o.ca ?? 1 }));
      ctx.restore();
    });
    // cam parlaması + kontur
    stroke(ctx, jar, { w: 3, closed: true, seed: 2110 });
    line(ctx, [-84, -250], [-84, -60], { w: 6, color: PAL.white, dry: false, alpha: 0.7 });
    (o.knobCharges ?? []).forEach(([dx, dy, sg]) => F.charge(ctx, dx, -420 + dy, sg, 11, { alpha: o.ca ?? 1 }));
    if (o.labels) {
      ctx.save(); ctx.globalAlpha *= o.labels;
      INK.leader(ctx, [150, -450], [28, -424], { bend: 0.1 }); INK.label(ctx, 'metal topuz', 160, -452, { size: 34, weight: 700 });
      INK.leader(ctx, [170, -340], [118, -312], { bend: 0.1 }); INK.label(ctx, 'yalıtkan kapak', 180, -342, { size: 34, weight: 700 });
      INK.leader(ctx, [170, -210], [6, -220], { bend: 0.1 }); INK.label(ctx, 'metal tel', 180, -212, { size: 34, weight: 700 });
      INK.leader(ctx, [170, -80], [Math.sin(ang) * 80 + 4, -150 + Math.cos(ang) * 80], { bend: -0.1 }); INK.label(ctx, 'folyo yapraklar', 180, -82, { size: 34, weight: 700 });
      ctx.restore();
    }
    ctx.restore();
  };
  // kıvılcım
  F.spark = (ctx, x, y, s, t, col = AMB) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + Math.sin(t * 9) * 0.2; const r1 = 10, r2 = 28 + 6 * Math.sin(t * 13 + i); line(ctx, [Math.cos(a) * r1, Math.sin(a) * r1], [Math.cos(a) * r2, Math.sin(a) * r2], { w: 3, color: col, dry: false, seed: 2120 + i }); }
    ctx.restore();
  };
  // şimşek bulutu (merkez)
  F.stormCloud = (ctx, x, y, s, t, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const c = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * 6.283; const r = 1 + 0.16 * Math.abs(Math.sin(a * 3.5)); c.push([Math.cos(a) * 90 * r, Math.sin(a) * 44 * r]); }
    P.fillPts(ctx, c, '#D9D6D0'); wash(ctx, c, '#4C5A73', 0.55, 2130, { bleed: 1.5, blooms: 1 }); stroke(ctx, c, { w: 2.8, closed: true, seed: 2131 });
    if (o.bolt !== false && Math.sin(t * 5) > -0.3) { const bl = [[10, 40], [-14, 90], [8, 92], [-18, 150]]; stroke(ctx, bl, { w: 6, color: '#E3A03A', dry: false, seed: 2132 }); stroke(ctx, bl, { w: 2, color: PAL.ink, dry: false, seed: 2133 }); }
    ctx.restore();
  };
  // kapı kolu + kıvılcım
  F.doorKnob = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const d = [[-70, -90], [60, -90], [60, 90], [-70, 90]]; F.shape(ctx, d, '#8A6A45', 0.4, 2140);
    const h = F.rr(10, -12, 70, 20, 8, 3); F.shape(ctx, h, '#6F6B66', 0.5, 2141); P.fillPts(ctx, circlePts(18, -2, 16, 16, 18), '#9A9387'); stroke(ctx, circlePts(18, -2, 16, 16, 18), { w: 2, closed: true, dry: false });
    F.spark(ctx, 96, -2, 0.7, t);
    // parmak
    line(ctx, [170, 10], [118, 2], { w: 18, color: '#E4B98E', taper: 0 }); stroke(ctx, P.arc(118, 2, 9, Math.PI * 0.5, Math.PI * 1.5, 10), { w: 2, dry: false });
    ctx.restore();
  };
  // fotokopi makinesi
  F.copier = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rr(-90, -60, 180, 110, 8, 3); F.shape(ctx, b, '#9A9387', 0.35, 2150);
    const lid = F.rr(-96, -76, 192, 18, 5, 2); F.shape(ctx, lid, '#6F6B66', 0.4, 2151);
    const tray = [[90, 0], [140, -10], [146, 6], [90, 14]]; F.shape(ctx, tray, null, 0, 2152);
    const pp = [[100, -8], [136, -16], [140, -4], [102, 4]]; F.shape(ctx, pp, null, 0, 2153);
    [0, 1, 2].forEach(i => line(ctx, [108, -6 + i * 3], [132, -12 + i * 3], { w: 1, dry: false, alpha: 0.6 }));
    P.fillPts(ctx, circlePts(-50, -20, 20, 20, 20), '#4C5A73', 0.4); stroke(ctx, circlePts(-50, -20, 20, 20, 20), { w: 2, closed: true, dry: false });
    ctx.restore();
  };
  // elektrostatik boyama: tabanca + parçacıklar + metal levha
  F.sprayGun = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const g = [[-90, -20], [-10, -24], [-10, 4], [-40, 4], [-50, 50], [-72, 50], [-66, 4], [-90, 4]]; F.shape(ctx, g, '#6F6B66', 0.4, 2160);
    line(ctx, [-10, -10], [10, -10], { w: 6, taper: 0 });
    for (let i = 0; i < 14; i++) { const k = (t * 0.8 + i / 14) % 1; const yy = -10 + (i % 5 - 2) * 8 * k; inkDot(ctx, 14 + k * 110, yy, 3, { color: '46,106,140', alpha: 0.9 }); }
    const pl = [[130, -60], [150, -60], [150, 50], [130, 50]]; F.shape(ctx, pl, PAL.water, 0.5, 2161);
    ctx.restore();
  };
  // bilgi kaynağı kartı simgeleri
  F.center = (ctx, x, y, s) => { // bilim merkezi binası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const roof = [[-80, -30], [0, -80], [80, -30]]; F.shape(ctx, roof, AMB, 0.45, 2170);
    const b = [[-72, -30], [72, -30], [72, 50], [-72, 50]]; F.shape(ctx, b, null, 0, 2171);
    [-48, -16, 16, 48].forEach(cx => line(ctx, [cx, -24], [cx, 46], { w: 5, taper: 0, seed: cx | 0 }));
    stroke(ctx, circlePts(0, -48, 10, 10, 14), { w: 2, closed: true, dry: false }); inkDot(ctx, 0, -48, 3);
    ctx.restore();
  };
  F.teacher = (ctx, x, y, s) => { // yazı tahtası + tebeşir yazısı
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, -60], [80, -60], [80, 40], [-80, 40]]; F.shape(ctx, b, '#3F5A45', 0.85, 2180, { base: '#3F5A45' });
    ctx.strokeStyle = PAL.white; ctx.lineWidth = 3; ctx.lineCap = 'round';
    // + ve − işaretleri tebeşirle
    ctx.beginPath(); ctx.moveTo(-50, -20); ctx.lineTo(-26, -20); ctx.moveTo(-38, -32); ctx.lineTo(-38, -8); ctx.moveTo(20, -20); ctx.lineTo(44, -20); ctx.stroke();
    line(ctx, [-50, 16], [40, 16], { w: 2, color: PAL.white, dry: false });
    line(ctx, [-60, 40], [-70, 70], { w: 4 }); line(ctx, [60, 40], [70, 70], { w: 4 });
    ctx.restore();
  };
  // sıcak priz (güvenlik)
  F.outlet = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rr(-60, -60, 120, 120, 16, 4); F.shape(ctx, b, null, 0, 2190);
    stroke(ctx, circlePts(0, 0, 40, 40, 30), { w: 2.4, closed: true, dry: false });
    P.fillPts(ctx, circlePts(-15, 0, 6, 6, 12), PAL.ink); P.fillPts(ctx, circlePts(15, 0, 6, 6, 12), PAL.ink);
    ctx.restore();
  };
  // Van de Graaff jeneratörü
  F.vdg = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const base = F.rr(-60, -30, 120, 30, 6, 2); F.shape(ctx, base, '#6F6B66', 0.5, 2200);
    const col = [[-14, -30], [14, -30], [14, -170], [-14, -170]]; F.shape(ctx, col, PAL.water, 0.2, 2201);
    const dome = circlePts(0, -220, 62, 58, 36); P.fillPts(ctx, dome, '#E0DDD6'); wash(ctx, dome, '#9A9387', 0.45, 2202, { bleed: 1, blooms: 1 }); stroke(ctx, dome, { w: 3, closed: true, seed: 2203 });
    line(ctx, [-30, -236], [-18, -254], { w: 5, color: PAL.white, dry: false });
    ctx.restore();
  };
  G.F720 = F;
})(window);

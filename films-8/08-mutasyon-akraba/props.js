// props.js — 8. sınıf Film 08 → window.F808
// İnsan figürü (alel çipleriyle), sincap, DNA sarmalı, hücreler, radyasyon/kimyasal simgeleri, sağlıklı yaşam simgeleri.
// Ortak taban (rr / shape / fit / wfit / card / stamp / title / endCard / notebookPage / taskCard / table) 7. sınıf F722'den uyarlanmıştır.
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
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, extra ? 565 : 610, { size: 32, align: 'center', alpha: 0.7 });
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
  // ---------------- FİLM 8.08 (Akraba evliliği · Mutasyon) çizimleri ----------------
  F.AC = PAL.water; F.aC = AMB;             // A (baskın) mavi, a (çekinik) koyu kehribar
  // alel çipi
  F.allele = (ctx, x, y, r, L, o = {}) => {
    const col = L === 'A' ? F.AC : F.aC;
    const c = circlePts(x, y, r, r, 28);
    P.fillPts(ctx, c, col, o.a ?? 0.9); stroke(ctx, c, { w: 2, closed: true, dry: false, seed: 3100 + (L === 'A' ? 0 : 1) });
    ctx.save(); ctx.font = `700 ${Math.round(r * 1.35)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = PAL.white; ctx.fillText(L, x, y + r * 0.08); ctx.restore();
  };
  // sade insan figürü (cinsiyetsiz, damgalamasız) — ayak noktası (x,y), s=1 ≈ 200 px
  const SKIN = ['#E7CFA9', '#D8B48C', '#C99E76', '#E2C39B', '#BF9270', '#EBD5B5'];
  const CLOTH = ['#7C9A6A', '#6F8FA8', '#B98A5A', '#9C7FA6', '#8FA47A', '#C58F6E', '#6E8C8C'];
  F.person = (ctx, x, y, s = 1, geno = null, o = {}) => {
    const seed = o.seed ?? 1;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-52, 0], [-50, -80], [-40, -112], [-16, -124], [16, -124], [40, -112], [50, -80], [52, 0]];
    F.shape(ctx, body, CLOTH[seed % CLOTH.length], 0.55, 3200 + seed);
    const hd = circlePts(0, -162, 34, 36, 36);
    F.shape(ctx, hd, SKIN[seed % SKIN.length], 0.75, 3220 + seed);
    if (o.hair !== false) { const hr = P.arc(0, -166, 36, Math.PI * 1.05, Math.PI * 1.95, 18, 34); stroke(ctx, hr, { w: 6, seed: 3240 + seed, color: ['#3A2A1E', '#5A3E28', '#2A2622'][seed % 3] }); }
    inkDot(ctx, -11, -162, 3.2); inkDot(ctx, 11, -162, 3.2);
    stroke(ctx, P.arc(0, -154, 10, 0.4, Math.PI - 0.4, 10, 6), { w: 2, dry: false, seed: 3260 });
    if (geno) { F.allele(ctx, -21, -70, 19, geno[0]); F.allele(ctx, 21, -70, 19, geno[1]); }
    ctx.restore();
  };
  // sincap — ayak noktası (x,y), sağa bakar; s=1 ≈ 200 px boy; col: kürk rengi; albino: pembe göz
  F.squirrel = (ctx, x, y, s = 1, col = '#9A6A3A', o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    const white = o.albino;
    const base = white ? '#FBF8F1' : PAL.white, a = white ? 0.12 : 0.6;
    const sw = Math.sin((o.t ?? 0) * 1.8) * 4;
    // kuyruk (arkada, yukarı kıvrık)
    const tail = P.bez([-40, -30], [-150 + sw, -60], [-110, -170], 16).concat(P.bez([-110, -170], [-60, -230 + sw], [-20, -170], 12)).concat(P.bez([-20, -170], [-70, -120], [-10, -60], 12));
    F.shape(ctx, tail, white ? '#E6DCC6' : col, white ? 0.35 : 0.5, 3300, { base });
    // gövde
    const bd = wobble(circlePts(10, -62, 52, 62, 40), 2, 3310);
    F.shape(ctx, bd, white ? '#E6DCC6' : col, a, 3311, { base });
    // karın
    P.fillPts(ctx, circlePts(28, -52, 24, 40, 24), '#FBF8F1', 0.8);
    // baş
    const hd = wobble(circlePts(48, -128, 36, 32, 36), 1.5, 3320);
    F.shape(ctx, hd, white ? '#E6DCC6' : col, a, 3321, { base });
    const ear = [[30, -150], [36, -182], [52, -154]];
    F.shape(ctx, ear, white ? '#E8B8BC' : col, 0.6, 3322, { base });
    // göz, burun
    P.fillPts(ctx, circlePts(62, -132, 7, 7, 14), white ? '#D46A78' : PAL.ink, 1);
    P.fillPts(ctx, circlePts(60, -134, 2.2, 2.2, 8), PAL.white, 1);
    P.fillPts(ctx, circlePts(84, -124, 4.5, 3.5, 10), white ? '#D98E98' : PAL.ink, 1);
    // ayaklar + fındık
    stroke(ctx, [[0, -2], [-6, 2], [18, 2]], { w: 3, seed: 3330 });
    stroke(ctx, [[36, -2], [30, 2], [52, 2]], { w: 3, seed: 3331 });
    if (o.nut) { const n = circlePts(74, -96, 12, 14, 16); F.shape(c2(ctx), n, '#8A5A2A', 0.7, 3340); }
    ctx.restore();
  };
  const c2 = c => c;
  // DNA çift sarmal (dikey) — merkez x, üst y0, uzunluk L; o.mut: değişen basamak indeksi, o.mk: 0..1 vurgusu
  const BASECOL = { A: '#C07F1E', T: '#6F8A3A', G: '#2E6A8C', C: '#B5553F' };
  const PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
  F.dna = (ctx, x, y0, L, t, o = {}) => {
    const seq = o.seq ?? 'ATGCGTACATGC', n = seq.length, amp = o.amp ?? 70, ph = (o.spin ?? 0.6) * t;
    const L1 = [], L2 = [];
    for (let i = 0; i <= 80; i++) { const u = i / 80, yy = y0 + u * L, a = u * Math.PI * 3 + ph; L1.push([x + Math.sin(a) * amp, yy]); L2.push([x + Math.sin(a + Math.PI) * amp, yy]); }
    for (let i = 0; i < n; i++) {
      const u = (i + 0.5) / n, yy = y0 + u * L, a = u * Math.PI * 3 + ph;
      const xa = x + Math.sin(a) * amp, xb = x + Math.sin(a + Math.PI) * amp, xm = (xa + xb) / 2;
      let b1 = seq[i]; let b2 = PAIR[b1];
      const isM = o.mut === i && (o.mk ?? 0) > 0;
      if (isM && o.mk > 0.5) { b1 = o.to ?? 'G'; b2 = PAIR[b1]; }
      ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 11;
      ctx.strokeStyle = BASECOL[b1]; ctx.beginPath(); ctx.moveTo(xa, yy); ctx.lineTo(xm, yy); ctx.stroke();
      ctx.strokeStyle = BASECOL[b2]; ctx.beginPath(); ctx.moveTo(xm, yy); ctx.lineTo(xb, yy); ctx.stroke(); ctx.restore();
      if (isM) { const g = circlePts(xm, yy, 44 + 6 * Math.sin(t * 6), 22, 30); ctx.save(); ctx.globalAlpha *= Math.min(1, o.mk * 2); stroke(ctx, g, { w: 3.5, closed: true, color: HEAT, seed: 3350 }); ctx.restore(); }
    }
    stroke(ctx, L1, { w: 5, seed: 3360, taper: 0.05 }); stroke(ctx, L2, { w: 5, seed: 3361, taper: 0.05 });
  };
  // hücre (vücut hücresi) — merkez
  F.cell = (ctx, x, y, r, col = '#D9A78A', seed = 1, o = {}) => {
    const c = wobble(circlePts(x, y, r * 1.1, r * 0.92, 40), r * 0.05, 3400 + seed);
    F.shape(ctx, c, col, 0.45, 3401 + seed);
    const nu = circlePts(x + r * 0.1, y - r * 0.05, r * 0.36, r * 0.32, 24);
    F.shape(ctx, nu, o.nuc ?? '#8A6A9A', 0.55, 3410 + seed);
    if (o.spark) { ctx.save(); ctx.globalAlpha *= o.spark; for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283; line(ctx, [x + r * 0.1 + Math.cos(a) * r * 0.42, y + Math.sin(a) * r * 0.42], [x + r * 0.1 + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.62], { w: 3, color: HEAT, dry: false }); } ctx.restore(); }
  };
  F.egg = (ctx, x, y, r, o = {}) => {
    const c = circlePts(x, y, r, r, 44); F.shape(ctx, c, '#E3A03A', 0.28, 3420);
    stroke(ctx, circlePts(x, y, r * 1.12, r * 1.12, 44), { w: 1.6, closed: true, alpha: 0.5, dry: false });
    F.shape(ctx, circlePts(x + r * 0.1, y, r * 0.3, r * 0.28, 22), '#8A6A9A', 0.55, 3421);
    if (o.spark) { ctx.save(); ctx.globalAlpha *= o.spark; stroke(ctx, circlePts(x + r * 0.1, y, r * 0.45, r * 0.42, 22), { w: 3.5, closed: true, color: HEAT, seed: 3422 }); ctx.restore(); }
  };
  F.sperm = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.shape(ctx, circlePts(0, 0, 18, 12, 20), '#8A6A9A', 0.4, 3430);
    const tl = []; for (let i = 0; i <= 30; i++) { const u = i / 30; tl.push([-16 - u * 90, Math.sin(u * 9 - t * 8) * 8 * u]); }
    stroke(ctx, tl, { w: 2.4, seed: 3431, dry: false });
    ctx.restore();
  };
  // radyasyon işareti (el çizimi) — merkez
  F.radiation = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bg = circlePts(0, 0, 70, 70, 40); F.shape(ctx, bg, '#E3C24A', 0.7, 3440);
    for (let i = 0; i < 3; i++) { const a0 = -Math.PI / 2 + i * 2.094 - 0.52, a1 = a0 + 1.047; const p = [[Math.cos(a0) * 16, Math.sin(a0) * 16]]; P.arc(0, 0, 58, a0, a1, 12).forEach(q => p.push(q)); p.push([Math.cos(a1) * 16, Math.sin(a1) * 16]); P.fillPts(ctx, p, PAL.ink, 0.9); }
    P.fillPts(ctx, circlePts(0, 0, 11, 11, 16), PAL.ink, 0.9);
    ctx.restore();
  };
  // kimyasal şişe — merkez
  F.bottle = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-18, -70], [18, -70], [18, -34], [52, 30], [52, 64], [-52, 64], [-52, 30], [-18, -34]];
    F.shape(ctx, b, '#8FA47A', 0.35, 3450);
    const liq = [[-50, 20], [50, 20], [50, 62], [-50, 62]]; P.fillPts(ctx, liq, '#7FA05A', 0.55);
    const lab = [[-30, 28], [30, 28], [30, 56], [-30, 56], [-30, 28]]; P.fillPts(ctx, lab, PAL.white, 0.95); stroke(ctx, lab, { w: 1.6, closed: true, dry: false });
    ctx.save(); ctx.font = '700 26px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('!', 0, 52); ctx.restore();
    stroke(ctx, [[-22, -80], [22, -80], [22, -70], [-22, -70], [-22, -80]], { w: 2.4, closed: true });
    ctx.restore();
  };
  // simgeler: elma, şapka, eldiven+gözlük, sigara yasak
  F.apple = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const a = P.arc(-18, 0, 38, -2.2, 1.9, 18).concat(P.arc(18, 0, 38, 1.2, 5.3, 18)); F.shape(ctx, wobble(circlePts(0, 4, 56, 50, 36), 3, 3460), '#B5553F', 0.55, 3461);
    line(ctx, [0, -44], [6, -70], { w: 4 }); F.shape(ctx, [[6, -62], [40, -78], [16, -52]], PAL.life, 0.6, 3462);
    ctx.restore();
  };
  F.hat = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.shape(ctx, circlePts(0, 20, 90, 22, 36), '#E3C98A', 0.6, 3470);
    F.shape(ctx, P.arc(0, 18, 50, Math.PI, 2 * Math.PI, 20, 50), '#E3C98A', 0.6, 3471);
    stroke(ctx, P.arc(0, 12, 50, Math.PI * 1.02, Math.PI * 1.98, 16, 8), { w: 6, color: PAL.water, dry: false });
    ctx.restore();
  };
  F.goggles = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [-38, 38].forEach((dx, i) => F.shape(ctx, circlePts(dx, 0, 32, 24, 24), PAL.water, 0.25, 3480 + i));
    line(ctx, [-6, 0], [6, 0], { w: 5 }); line(ctx, [-70, 0], [-90, -6], { w: 4 }); line(ctx, [70, 0], [90, -6], { w: 4 });
    ctx.restore();
  };
  F.noSmoke = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const cg = [[-60, -10], [44, -10], [44, 10], [-60, 10]]; F.shape(ctx, cg, null, 0, 3490); P.fillPts(ctx, [[30, -10], [44, -10], [44, 10], [30, 10]], '#C07F1E', 0.8);
    for (let i = 0; i < 3; i++) { const p = []; for (let j = 0; j <= 12; j++) { const u = j / 12; p.push([54 + Math.sin(u * 8 + i) * 5 + i * 8, -14 - u * 40]); } stroke(ctx, p, { w: 1.8, alpha: 0.6, dry: false }); }
    stroke(ctx, circlePts(0, 0, 76, 76, 44), { w: 7, closed: true, color: RED, seed: 3491 });
    line(ctx, [-54, -54], [54, 54], { w: 7, color: RED });
    ctx.restore();
  };
  // Sticky-note fikir kartı
  F.note = (ctx, x, y, w, h, txt, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s);
    F.card(ctx, -w / 2, -h / 2, w, h, o.seed ?? 3500, { fill: o.fill ?? '#FBF1CF' });
    INK.label(ctx, o.num ?? '', -w / 2 + 22, -h / 2 + 50, { size: 40, weight: 700, color: AMB });
    const lines = Array.isArray(txt) ? txt : [txt];
    lines.forEach((l, i) => F.fit(ctx, l, 20, -h / 2 + 62 + i * 50 - (lines.length - 1) * 0 , w - 90, o.size ?? 38));
    ctx.restore();
  };
  // noktaları sıklaştır (INK.dashed için)
  F.dense = (pts, step = 4) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const [a, b] = [pts[i - 1], pts[i]]; const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) o.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]); } return o; };
  G.F808 = F;
})(window);

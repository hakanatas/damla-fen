// props.js — Film 16'ya özel çizim yardımcıları (window.F16)
// Tanecik modelleri (katı / sıvı / gaz), kaplar, terazi, taş, balon, enjektör.
// Tüm hareketler t'nin saf fonksiyonudur (durum tutulmaz).
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, dashed, arrowHead } = G.INK;
  const F = {};
  const tri = (v, L) => { const m = ((v % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };
  const wrap = (v, L) => ((v % L) + L) % L;
  F.tri = tri;
  // kesikli çizgi için yoğun dikdörtgen noktaları
  F.rectPts = (x0, y0, x1, y1, n = 30) => { const c = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]; const out = []; for (let i = 0; i < 4; i++) for (let j = 0; j < n; j++) out.push([c[i][0] + (c[i + 1][0] - c[i][0]) * j / n, c[i][1] + (c[i + 1][1] - c[i][1]) * j / n]); out.push([x0, y0]); return out; };

  // ---- tek tanecik: su mavisi dolgu + mürekkep çevre + yön çizgisi (dönmeyi göstermek için)
  F.particle = (ctx, x, y, r, ang = 0, o = {}) => {
    const A0 = ctx.globalAlpha;
    ctx.save();
    ctx.fillStyle = o.fill ?? '#BFD6E3'; ctx.globalAlpha = A0 * (o.alpha ?? 1);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = o.color ?? PAL.water; ctx.globalAlpha = A0 * (o.alpha ?? 1) * 0.55;
    ctx.beginPath(); ctx.arc(x - r * 0.12, y + r * 0.12, r * 0.78, 0, 7); ctx.fill();
    ctx.globalAlpha = A0 * (o.alpha ?? 1);
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.2, r * 0.13);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke();
    if (o.mark !== false) { // yön işareti: küçük beyaz parıltı + çizgi → dönme görünür olur
      ctx.strokeStyle = PAL.white; ctx.lineWidth = Math.max(1.4, r * 0.18); ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * r * 0.2, y + Math.sin(ang) * r * 0.2); ctx.lineTo(x + Math.cos(ang) * r * 0.68, y + Math.sin(ang) * r * 0.68); ctx.stroke();
    }
    ctx.restore();
  };

  // ---- tanecik alanları; R = [x, y, w, h] (kabın iç bölgesi). o.speed: hız çarpanı, o.r: yarıçap
  // katı: düzenli kafes + titreşim
  F.solidPts = (R, t, o = {}) => {
    const r = o.r ?? 16, d = r * 2.12, sp = o.speed ?? 1, amp = (o.amp ?? 2.6) * Math.min(2.2, sp);
    const cols = o.cols ?? Math.floor((R[2] - 8) / d), rows = o.rows ?? Math.floor((R[3] - 8) / d);
    const x0 = R[0] + (R[2] - cols * d) / 2 + d / 2, y0 = R[1] + R[3] - d / 2 - (o.lift ?? 4);
    const out = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i;
      out.push([x0 + i * d + Math.sin(t * 13 * sp + k * 1.7) * amp, y0 - j * d + Math.cos(t * 11 * sp + k * 2.3) * amp, 0.4 + k * 0.9]);
    }
    return out;
  };
  // sıvı: kabın altında satırlar; satırlar kayar (öteleme), tanecikler döner + titreşir
  F.liquidPts = (R, t, o = {}) => {
    const r = o.r ?? 16, sp = o.speed ?? 1, rows = o.rows ?? 3, d = r * 2.35;
    const R0 = rng(o.seed ?? 7); const out = [];
    for (let j = 0; j < rows; j++) {
      const n = Math.max(2, Math.floor(R[2] / d)); const gap = R[2] / n;
      const v = (j % 2 ? -1 : 1) * (18 + 10 * R0()) * sp;
      for (let i = 0; i < n; i++) {
        const k = j * n + i;
        const x = R[0] + wrap(i * gap + v * t + j * gap * 0.5, R[2]);
        const y = R[1] + R[3] - r - 3 - j * r * 1.95 + Math.sin(t * 3.1 * sp + k * 1.3) * r * 0.22;
        out.push([x + Math.sin(t * 9 * sp + k) * 1.8, y, t * (1.6 + R0() * 1.5) * sp * (R0() < 0.5 ? -1 : 1) + k]);
      }
    }
    return out;
  };
  // gaz: kabın her yerinde serbest, duvarlarda seken tanecikler
  F.gasPts = (R, t, o = {}) => {
    const r = o.r ?? 16, sp = o.speed ?? 1, n = o.n ?? 9; const R0 = rng(o.seed ?? 21); const out = [];
    const W = R[2] - 2 * r - 4, H = R[3] - 2 * r - 4;
    for (let i = 0; i < n; i++) {
      const bx = R0() * W, by = R0() * H, a = R0() * 6.283, v = (70 + R0() * 60) * sp;
      out.push([R[0] + r + 2 + tri(bx + Math.cos(a) * v * t, W), R[1] + r + 2 + tri(by + Math.sin(a) * v * t, H), t * (2 + R0() * 2) * sp + i, Math.cos(a), Math.sin(a)]);
    }
    return out;
  };
  F.drawPts = (ctx, pts, r, o = {}) => {
    if (o.bonds) { ctx.save(); ctx.globalAlpha *= 0.3; for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dd = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]); if (dd < r * 2.5) { ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[j][0], pts[j][1]); ctx.stroke(); } } ctx.restore(); }
    pts.forEach((p, i) => {
      if (o.trail && p.length > 4) { ctx.save(); ctx.globalAlpha *= 0.35; ctx.strokeStyle = PAL.water; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p[0] - p[3] * r * 1.2, p[1] - p[4] * r * 1.2); ctx.lineTo(p[0] - p[3] * r * 2.6, p[1] - p[4] * r * 2.6); ctx.stroke(); ctx.restore(); }
      F.particle(ctx, p[0], p[1], r, p[2], { mark: o.mark, fill: o.fill, color: o.color, alpha: o.hl && o.hl !== i ? 0.5 : 1 });
    });
  };
  F.field = (ctx, kind, R, t, o = {}) => {
    const r = o.r ?? 16;
    const pts = kind === 'solid' ? F.solidPts(R, t, o) : kind === 'liquid' ? F.liquidPts(R, t, o) : F.gasPts(R, t, o);
    ctx.save(); if (o.clip !== false) { ctx.beginPath(); ctx.rect(R[0] - 2, R[1] - 2, R[2] + 4, R[3] + 4); ctx.clip(); }
    F.drawPts(ctx, pts, o.dr ?? (kind === 'liquid' ? r * 0.86 : r), { ...o, mark: o.mark ?? kind !== 'solid', bonds: o.bonds ?? kind === 'solid' });
    ctx.restore();
    return pts;
  };

  // ---- kaplar
  F.box = (ctx, x, y, w, h, o = {}) => { // cam kap (üstü açık ya da kapalı). (x,y)=sol üst
    const seed = o.seed ?? 1;
    const pts = [[x, y], [x + 2, y + h], [x + w - 2, y + h + 1], [x + w, y - 1]];
    if (o.fill !== false) P.fillPts(ctx, [[x, y], [x + 2, y + h], [x + w - 2, y + h], [x + w, y]], PAL.white, 0.55);
    stroke(ctx, pts, { w: o.w ?? 3.4, seed, taper: 0.03 });
    // cam parıltısı
    line(ctx, [x + 12, y + 16], [x + 12, y + Math.min(h - 16, 80)], { w: 3, color: PAL.white, dry: false, alpha: 0.9 });
    if (o.lid) { line(ctx, [x - 10, y - 2], [x + w + 10, y - 2], { w: 6, seed: seed + 3, taper: 0.02 }); }
    else { line(ctx, [x - 8, y - 2], [x + 4, y + 2], { w: 3, dry: false }); line(ctx, [x + w + 8, y - 2], [x + w - 4, y + 2], { w: 3, dry: false }); }
    return [x + 5, y + 5, w - 10, h - 9];
  };
  F.water = (ctx, x, y, w, h, level, o = {}) => { // kap içindeki su: level (px, alttan)
    const top = y + h - level;
    const pts = [[x + 3, top], [x + w - 3, top], [x + w - 3, y + h - 2], [x + 3, y + h - 2], [x + 3, top]];
    wash(ctx, pts, o.color ?? PAL.water, o.alpha ?? 0.4, o.seed ?? 31, { bleed: 1.2, blooms: 1 });
    line(ctx, [x + 4, top], [x + w - 4, top], { w: 2.4, color: o.color ?? PAL.water, dry: false, bend: 0.01 });
    return top;
  };

  // ---- terazi (eşit kollu). tilt: + ise sol kefe aşağı
  F.balance = (ctx, cx, by, s, tilt, left, right) => {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s);
    const baseP = [[-70, 0], [70, 0], [60, -18], [-60, -18], [-70, 0]]; P.fillPts(ctx, baseP, '#D8C3A0'); stroke(ctx, baseP, { w: 3, closed: true, seed: 61 });
    line(ctx, [0, -18], [0, -220], { w: 6, seed: 62, taper: 0.02 });
    const a = -tilt * 0.22, L = 190; const ca = Math.cos(a), sa = Math.sin(a);
    const lx = -L * ca, ly = -220 - L * sa * -1, rx = L * ca, ry = -220 + L * sa * -1;
    const lp = [-L * ca, -220 + L * Math.sin(-a)], rp = [L * ca, -220 - L * Math.sin(-a)];
    line(ctx, lp, rp, { w: 6, seed: 63, taper: 0.02 });
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.moveTo(-14, -205); ctx.lineTo(14, -205); ctx.lineTo(0, -232); ctx.fill(); ctx.restore();
    // ibre
    line(ctx, [0, -220], [-Math.sin(a) * -60, -220 - Math.cos(a) * 60], { w: 3, dry: false, color: '#8A4A10' });
    [[lp, left, -1], [rp, right, 1]].forEach(([p, item, sd], i) => {
      const py = p[1] + 110;
      line(ctx, p, [p[0] - 58, py], { w: 1.6, dry: false }); line(ctx, p, [p[0] + 58, py], { w: 1.6, dry: false });
      const pan = P.arc(p[0], py, 70, 0, Math.PI, 20, 18); P.fillPts(ctx, pan, '#C9B48E'); stroke(ctx, pan.concat([pan[0]]), { w: 3, closed: true, seed: 64 + i });
      if (item) item(ctx, p[0], py);
    });
    ctx.restore();
  };

  // ---- nesneler
  F.stone = (ctx, x, y, s = 1, seed = 5) => { // (x,y) = alt orta
    const pts = G.INK.wobble(circlePts(x, y - 34 * s, 52 * s, 34 * s, 40), 5 * s, seed);
    P.fillPts(ctx, pts, '#B9B2A3'); wash(ctx, pts, '#6E675C', 0.5, seed + 1, { bleed: 1.5, blooms: 2 });
    stroke(ctx, pts, { w: 3, closed: true, seed: seed + 2 });
    line(ctx, [x - 20 * s, y - 44 * s], [x + 6 * s, y - 50 * s], { w: 1.4, dry: false, alpha: 0.5 });
  };
  F.balloon = (ctx, x, y, s = 1, inflated = 1, o = {}) => { // (x,y) = alt (düğüm)
    const col = o.color ?? '#C8553F';
    if (inflated < 0.15) { // sönük balon: pörsümüş şekil
      const pts = [[x - 40 * s, y], [x - 30 * s, y - 14 * s], [x + 10 * s, y - 20 * s], [x + 38 * s, y - 10 * s], [x + 44 * s, y - 2 * s], [x - 40 * s, y]];
      P.fillPts(ctx, pts, col, 0.8); stroke(ctx, pts, { w: 2.6, closed: true, seed: 71 }); return;
    }
    const rx = 58 * s * (0.3 + 0.7 * inflated), ry = 70 * s * (0.3 + 0.7 * inflated);
    const b = circlePts(x, y - ry - 10 * s, rx, ry, 50);
    P.fillPts(ctx, b, col, 0.85); wash(ctx, b, '#8A2A1A', 0.25, 72, { bleed: 1, blooms: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 73 });
    P.fillPts(ctx, [[x - 8 * s, y], [x + 8 * s, y], [x, y - 12 * s]], col); stroke(ctx, [[x - 8 * s, y], [x + 8 * s, y], [x, y - 12 * s], [x - 8 * s, y]], { w: 2, dry: false });
    line(ctx, [x - rx * 0.45, y - ry * 1.5], [x - rx * 0.25, y - ry * 1.75], { w: 4, color: PAL.white, dry: false, alpha: 0.8 });
  };
  F.glass = (ctx, x, y, w, h, level, o = {}) => { // su bardağı; (x,y)=sol üst
    F.water(ctx, x, y, w, h, level, o);
    F.box(ctx, x, y, w, h, { fill: false, seed: o.seed ?? 9 });
  };
  F.block = (ctx, x, y, w, h, o = {}) => { // tahta blok / buz küpü; (x,y)=sol üst
    const p = [[x, y], [x + w, y + 2], [x + w - 2, y + h], [x + 2, y + h - 1], [x, y]];
    P.fillPts(ctx, p, o.fill ?? '#D9B27A'); wash(ctx, p, o.color ?? '#8A5A2A', o.alpha ?? 0.45, o.seed ?? 81, { bleed: 1, blooms: 1 });
    stroke(ctx, p, { w: 3, closed: true, seed: (o.seed ?? 81) + 1 });
    if (o.grain !== false) for (let i = 1; i < 4; i++) line(ctx, [x + 6, y + i * h / 4], [x + w - 8, y + i * h / 4 + 3], { w: 1.2, alpha: 0.5, dry: false, bend: 0.03 });
  };
  F.bottle = (ctx, x, y, s, col) => { // (x,y) = alt orta; sıvı yağ şişesi
    const b = [[x - 34 * s, y], [x - 34 * s, y - 90 * s], [x - 14 * s, y - 120 * s], [x - 12 * s, y - 150 * s], [x + 12 * s, y - 150 * s], [x + 14 * s, y - 120 * s], [x + 34 * s, y - 90 * s], [x + 34 * s, y], [x - 34 * s, y]];
    P.fillPts(ctx, b, PAL.white, 0.6);
    const lq = [[x - 31 * s, y - 3 * s], [x - 31 * s, y - 88 * s], [x + 31 * s, y - 88 * s], [x + 31 * s, y - 3 * s]];
    wash(ctx, lq, col, 0.6, 91, { bleed: 1, blooms: 1 });
    stroke(ctx, b, { w: 3, closed: true, seed: 92 });
    P.fillPts(ctx, [[x - 14 * s, y - 150 * s], [x + 14 * s, y - 150 * s], [x + 14 * s, y - 166 * s], [x - 14 * s, y - 166 * s]], PAL.ink, 0.85);
  };
  F.steam = (ctx, x, y, s, t, o = {}) => { // buhar kıvrımları; (x,y) = çıkış noktası
    for (let i = 0; i < 3; i++) {
      const pts = []; for (let j = 0; j <= 26; j++) { const u = j / 26; pts.push([x + (i - 1) * 26 * s + Math.sin(u * 8 + t * 4 + i * 2) * 9 * s * (0.4 + u), y - u * 110 * s]); }
      ctx.save(); ctx.globalAlpha *= 0.7 * (o.alpha ?? 1); stroke(ctx, pts, { w: 3, seed: 95 + i, color: o.color ?? '#5E7F96' }); ctx.restore();
    }
  };
  F.cup = (ctx, x, y, s = 1) => { // fincan; (x,y)=alt orta
    const c = [[x - 60 * s, y - 90 * s], [x + 60 * s, y - 90 * s], [x + 48 * s, y], [x - 48 * s, y], [x - 60 * s, y - 90 * s]];
    P.fillPts(ctx, c, PAL.white); wash(ctx, c, PAL.water, 0.18, 97, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 3, closed: true, seed: 98 });
    stroke(ctx, P.arc(x + 62 * s, y - 50 * s, 24 * s, -1.4, 1.4, 16), { w: 3, seed: 99 });
  };

  // ---- enjektör (yatay). x,y: gövdenin sol-orta noktası (kapalı uç solda), L: gövde uzunluğu, p: pistonun konumu (px, soldan)
  F.syringe = (ctx, x, y, L, p, kind, t, o = {}) => {
    const h = o.h ?? 110;
    // kapalı uç (tıpa)
    P.fillPts(ctx, [[x - 44, y - 16], [x, y - 16], [x, y + 16], [x - 44, y + 16]], '#A23A2A', 0.75);
    stroke(ctx, [[x - 44, y - 16], [x, y - 16], [x, y + 16], [x - 44, y + 16], [x - 44, y - 16]], { w: 2.6, closed: true, seed: 101 });
    const barrel = [[x, y - h / 2], [x + L, y - h / 2], [x + L, y + h / 2], [x, y + h / 2], [x, y - h / 2]];
    P.fillPts(ctx, barrel, PAL.white, 0.6);
    // içerik
    const R = [x + 4, y - h / 2 + 4, Math.max(20, p - 8), h - 8];
    if (kind === 'air') F.field(ctx, 'gas', R, t, { r: 11, n: 12, speed: 0.9, seed: 33 });
    else { wash(ctx, [[R[0], R[1]], [R[0] + R[2], R[1]], [R[0] + R[2], R[1] + R[3]], [R[0], R[1] + R[3]]], PAL.water, 0.35, 102, { bleed: 1, blooms: 0 }); F.field(ctx, 'liquid', R, t, { r: 11, rows: 4, speed: 0.6, seed: 34 }); }
    stroke(ctx, barrel, { w: 3.4, closed: true, seed: 103 });
    for (let i = 1; i < 10; i++) line(ctx, [x + i * L / 10, y - h / 2], [x + i * L / 10, y - h / 2 + (i % 5 ? 14 : 26)], { w: 1.6, dry: false, alpha: 0.7 });
    // kulakçıklar
    line(ctx, [x + L, y - h / 2 - 30], [x + L, y + h / 2 + 30], { w: 6, taper: 0.02, seed: 104 });
    // piston
    const px = x + p;
    P.fillPts(ctx, [[px, y - h / 2 + 3], [px + 14, y - h / 2 + 3], [px + 14, y + h / 2 - 3], [px, y + h / 2 - 3]], PAL.ink, 0.85);
    line(ctx, [px + 14, y], [px + L + 60, y], { w: 9, taper: 0.01, seed: 105 });
    line(ctx, [px + L + 60, y - 50], [px + L + 60, y + 50], { w: 9, taper: 0.02, seed: 106 });
    return px + L + 60;
  };

  // ---- termometre (dikey); (x,y) = hazne merkezi, h: boy, lvl: 0..1 sıvı yüksekliği
  F.thermo = (ctx, x, y, h, lvl, o = {}) => {
    const w = o.w ?? 18, col = o.color ?? '#B5553F';
    const tube = [[x - w / 2, y - 14], [x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2, y - 14]];
    P.fillPts(ctx, tube.concat([[x, y]]), PAL.white, 0.95);
    const top = y - 14 - (h - 26) * lvl;
    P.fillPts(ctx, [[x - w * 0.22, y - 10], [x - w * 0.22, top], [x + w * 0.22, top], [x + w * 0.22, y - 10]], col, 0.9);
    P.fillPts(ctx, circlePts(x, y, w * 0.95, w * 0.95, 24), col, 0.9);
    stroke(ctx, P.arc(x, y, w * 0.95, -Math.PI / 2 + 0.55, Math.PI * 1.5 - 0.55, 24), { w: 2.6, seed: 131 });
    stroke(ctx, tube.concat([[x + w / 2, y - h], [x, y - h - w / 2], [x - w / 2, y - h]]).slice(0, 4), { w: 2.6, seed: 132 });
    stroke(ctx, P.arc(x, y - h, w / 2, Math.PI, Math.PI * 2, 10), { w: 2.6, seed: 133 });
    for (let i = 0; i <= (o.ticks ?? 8); i++) { const yy = y - 26 - (h - 40) * i / (o.ticks ?? 8); line(ctx, [x + w / 2, yy], [x + w / 2 + (i % 2 ? 7 : 13), yy], { w: 1.4, dry: false }); }
  };

  // ---- büyüteç halkası
  F.lensRing = (ctx, x, y, r, o = {}) => {
    stroke(ctx, circlePts(x, y, r, r, 90), { w: o.w ?? 9, closed: true, seed: 111 });
    const a = o.ang ?? 0.8;
    line(ctx, [x + Math.cos(a) * r * 1.02, y + Math.sin(a) * r * 1.02], [x + Math.cos(a) * r * 1.45, y + Math.sin(a) * r * 1.45], { w: 22, taper: 0.02, seed: 112 });
  };

  // ---- küçük hazır kartlar: başlık + çerçeve
  F.card = (ctx, x, y, w, h, o = {}) => { // (x,y)=merkez
    const fr = G.INK.wobble([[-w / 2, -h / 2], [0, -h / 2 - 2], [w / 2, -h / 2 - 3], [w / 2 + 2, 0], [w / 2 + 3, h / 2], [0, h / 2 + 2], [-w / 2 - 1, h / 2 + 3], [-w / 2 - 2, 0], [-w / 2, -h / 2]].map(p => [p[0] + x, p[1] + y]), 1.5, o.seed ?? 120);
    if (o.shadow !== false) { ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, fr, o.fill ?? '#FAF6EC', 0.97); ctx.restore(); }
    else P.fillPts(ctx, fr, o.fill ?? '#FAF6EC', 0.97);
    stroke(ctx, fr, { w: o.w ?? 2.6, closed: true, seed: (o.seed ?? 120) + 1, color: o.color });
  };

  G.F16 = F;
})(window);

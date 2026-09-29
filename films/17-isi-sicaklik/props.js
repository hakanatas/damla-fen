// props.js — Film 17'ye özel çizim yardımcıları (window.F17)
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

  const HEAT = '#B5553F', AMB = '#C07F1E';
  F.HEAT = HEAT; F.AMB = AMB;
  F.desk = (ctx, y = 830) => {
    ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
    const top = [[-50, y], [1970, y - 8], [1970, 1130], [-50, 1130]];
    P.fillPts(ctx, top, '#E4D2B0', 0.9); wash(ctx, top, '#8A6A45', 0.35, 401, { bleed: 2, blooms: 2 });
    stroke(ctx, [[-50, y], [1970, y - 8]], { w: 3.4, seed: 402, taper: 0.02 });
    for (let i = 0; i < 5; i++) line(ctx, [-50 + i * 420, y + 40 + (i % 2) * 30], [300 + i * 420, y + 38 + (i % 2) * 30], { w: 1.2, alpha: 0.35, dry: false, seed: 403 + i });
  };
  // dalgalı ısı oku (kehribar/kiremit): a → b, k: 0..1
  F.heatArrow = (ctx, a, b, k, o = {}) => {
    if (k <= 0) return; const col = o.color ?? HEAT; const n = 40; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const pts = []; for (let i = 0; i <= n * k; i++) { const u = i / n; const w = Math.sin(u * (o.waves ?? 5) * 6.283 - (o.t ?? 0) * 6) * (o.amp ?? 9) * Math.min(1, (1 - u) * 6); pts.push([a[0] + dx * u - uy * w, a[1] + dy * u + ux * w]); }
    stroke(ctx, pts, { w: o.w ?? 4.5, color: col, seed: o.seed ?? 150 });
    if (k > 0.97) arrowHead(ctx, [b[0] - ux * 20, b[1] - uy * 20], b, o.head ?? 18, { w: (o.w ?? 4.5) * 0.85, color: col });
  };
  // çocuk figürü (kavram karikatürü için); (x,y)=ayak
  F.kid = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * (o.flip ? -1 : 1), s);
    line(ctx, [-14, -70], [-18, 0], { w: 4, seed: 160 }); line(ctx, [14, -70], [18, 0], { w: 4, seed: 161 });
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(-22, -3, 12, 6, 0, 0, 7); ctx.ellipse(22, -3, 12, 6, 0, 0, 7); ctx.fill(); ctx.restore();
    const body = [[-40, -170], [40, -170], [50, -66], [-50, -66], [-40, -170]];
    P.fillPts(ctx, body, PAL.white); wash(ctx, body, o.shirt ?? '#8A6A45', 0.55, 162 + (o.seed ?? 0), { bleed: 1.2, blooms: 1 }); stroke(ctx, body, { w: 3, closed: true, seed: 163 });
    const armA = o.arm ?? 0; line(ctx, [36, -160], [70, -120 - armA * 60], { w: 3.4, seed: 164 }); inkDot(ctx, 70, -120 - armA * 60, 5); line(ctx, [-36, -160], [-60, -100], { w: 3.4, seed: 165 }); inkDot(ctx, -60, -100, 5);
    const head = circlePts(0, -218, 46, 48, 40); P.fillPts(ctx, head, '#F3DCC0'); stroke(ctx, head, { w: 3, closed: true, seed: 166 });
    // saç
    const hs = o.hair ?? 0;
    if (hs === 0) { const hp = P.arc(0, -222, 48, Math.PI * 1.05, Math.PI * 1.95, 20).concat([[30, -246], [0, -240], [-30, -246]]); P.fillPts(ctx, hp, '#3A2A1E', 0.9); }
    else if (hs === 1) { const hp = P.arc(0, -222, 50, Math.PI * 0.9, Math.PI * 2.1, 24); P.fillPts(ctx, hp.concat([[40, -170], [52, -200], [-52, -200], [-40, -170]]).slice(0, 25), '#6B3D1E', 0.9); stroke(ctx, [[-48, -210], [-54, -150]], { w: 9, color: '#6B3D1E', seed: 167 }); stroke(ctx, [[48, -210], [54, -150]], { w: 9, color: '#6B3D1E', seed: 168 }); }
    else { for (let i = -3; i <= 3; i++) line(ctx, [i * 12, -262], [i * 14, -242], { w: 5, color: '#2A2320', dry: false, seed: 170 + i }); }
    // yüz
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(-15, -214, 4.5, 0, 7); ctx.arc(15, -214, 4.5, 0, 7); ctx.fill(); ctx.restore();
    if (o.mouth === 'o') { ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(0, -190, 6, 8, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else stroke(ctx, P.arc(0, -200, 13, 0.4, Math.PI - 0.4, 12), { w: 2.6, seed: 175 });
    ctx.restore();
  };
  // konuşma balonu (yuvarlatılmış dikdörtgen + kuyruk); (x,y)=merkez
  F.speech = (ctx, x, y, w, h, tail, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const r = 30, pts = [];
    const cs = [[w / 2 - r, -h / 2 + r, -Math.PI / 2], [w / 2 - r, h / 2 - r, 0], [-w / 2 + r, h / 2 - r, Math.PI / 2], [-w / 2 + r, -h / 2 + r, Math.PI]];
    cs.forEach(([cx, cy, a0]) => { for (let i = 0; i <= 8; i++) { const a = a0 + i / 8 * Math.PI / 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    pts.push(pts[0]);
    const tx = tail[0] - x, ty = tail[1] - y; const bx = Math.max(-w / 2 + 40, Math.min(w / 2 - 80, tx));
    const tp = [[bx, h / 2 - 2], [tx, ty], [bx + 44, h / 2 - 2]];
    P.fillPts(ctx, pts, o.fill ?? '#FBF8F1', 0.97); P.fillPts(ctx, tp, o.fill ?? '#FBF8F1', 0.97);
    stroke(ctx, pts, { w: 2.6, closed: true, seed: o.seed ?? 180, color: o.color }); stroke(ctx, tp, { w: 2.6, seed: (o.seed ?? 180) + 1, color: o.color });
    ctx.restore();
  };
  F.flame = (ctx, x, y, s, t, o = {}) => { // (x,y) = alev tabanı
    for (let j = 0; j < 3; j++) {
      const h = (64 - j * 17) * s * (1 + 0.12 * Math.sin(t * 9 + j * 2)), w = (22 - j * 6) * s, sw = Math.sin(t * 7 + j) * 5 * s;
      const cy = y - w;
      const pts = P.arc(x, cy, w, -0.1, Math.PI + 0.1, 16);
      pts.push(...P.bez([x - w, cy], [x - w * 0.6, cy - h * 0.5], [x + sw, cy - h], 12).slice(1));
      pts.push(...P.bez([x + sw, cy - h], [x + w * 0.6, cy - h * 0.5], [x + w, cy], 12).slice(1));
      P.fillPts(ctx, pts, ['#C8553F', '#E3A03A', '#F6D9A0'][j], 0.92);
    }
  };
  F.stove = (ctx, x, y, s, t) => { // soba; (x,y)=alt orta
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, 0], [-80, -170], [80, -170], [80, 0]]; P.fillPts(ctx, b, '#4A4650'); wash(ctx, b, '#1C1B22', 0.4, 190, { bleed: 1, blooms: 1 }); stroke(ctx, b.concat([b[0]]), { w: 3.4, closed: true, seed: 191 });
    line(ctx, [30, -170], [30, -330], { w: 22, taper: 0, seed: 192, color: '#4A4650' }); stroke(ctx, [[19, -170], [19, -330]], { w: 2.6, seed: 193 }); stroke(ctx, [[41, -170], [41, -330]], { w: 2.6, seed: 194 });
    const door = [[-50, -40], [-50, -120], [20, -120], [20, -40], [-50, -40]]; P.fillPts(ctx, door, '#2A2830'); stroke(ctx, door, { w: 2.4, closed: true, seed: 195 });
    F.flame(ctx, -15, -48, 0.9, t);
    ctx.restore();
  };
  F.cooktop = (ctx, x, y, s, t, o = {}) => { // ocak + tencere/çaydanlık yok; (x,y)=üst yüzey orta
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-130, 0], [130, 0], [130, 90], [-130, 90], [-130, 0]]; P.fillPts(ctx, b, '#D8D2C4'); stroke(ctx, b, { w: 3, closed: true, seed: 196 });
    [-60, 60].forEach((dx, i) => { for (let k = 0; k < 7; k++) F.flame(ctx, dx - 36 + k * 12, -2, 0.28, t + k); stroke(ctx, circlePts(dx, 2, 44, 8, 30), { w: 2.4, closed: true, seed: 197 + i }); });
    [-80, -30, 30, 80].forEach(dx => stroke(ctx, circlePts(dx, 50, 11, 11, 16), { w: 2.4, closed: true, seed: 199 }));
    ctx.restore();
  };
  F.iceCube = (ctx, x, y, s = 1, melt = 0, seed = 1) => { // (x,y)=merkez; melt 0..1 küçülür
    const sz = 22 * s * (1 - melt); if (sz < 1.5) return;
    const p = G.INK.wobble([[x - sz, y - sz], [x + sz, y - sz * 0.9], [x + sz * 0.95, y + sz], [x - sz * 0.9, y + sz * 0.95], [x - sz, y - sz]], 1.2, 200 + seed);
    P.fillPts(ctx, p, '#EAF3F7', 0.95); wash(ctx, p, '#6FA6C4', 0.35, 201 + seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, p, { w: 2.2, closed: true, seed: 202 + seed });
    line(ctx, [x - sz * 0.5, y - sz * 0.5], [x - sz * 0.1, y - sz * 0.6], { w: 2, color: PAL.white, dry: false });
  };
  F.pot = (ctx, x, y, w, h, level, o = {}) => { // tencere; (x,y)=sol üst
    const bd = [[x, y], [x + 6, y + h], [x + w - 6, y + h], [x + w, y]];
    P.fillPts(ctx, bd.concat([bd[0]]), '#C9C4BA', 0.5);
    const top = F.water(ctx, x + 4, y, w - 8, h, level, { seed: o.seed ?? 205, alpha: 0.4 });
    stroke(ctx, bd, { w: 4, seed: 206 }); line(ctx, [x - 14, y], [x + w + 14, y], { w: 5, seed: 207 });
    [[x - 40, y + 30, x, y + 30], [x + w, y + 30, x + w + 40, y + 30]].forEach(([a, b, c, d], i) => line(ctx, [a, b], [c, d], { w: 7, seed: 208 + i }));
    return top;
  };
  F.spoon = (ctx, x0, y0, x1, y1, warm = 0) => { // sap ucu (x0,y0) → kepçe (x1,y1)
    const col = `rgb(${Math.round(175 + 45 * warm)},${Math.round(175 - 60 * warm)},${Math.round(178 - 90 * warm)})`;
    const a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a), ny = Math.cos(a);
    const hw0 = 9, hw1 = 5;
    const q = [[x0 + nx * hw0, y0 + ny * hw0], [x1 + nx * hw1, y1 + ny * hw1], [x1 - nx * hw1, y1 - ny * hw1], [x0 - nx * hw0, y0 - ny * hw0], [x0 + nx * hw0, y0 + ny * hw0]];
    P.fillPts(ctx, q, col); stroke(ctx, q, { w: 2.4, closed: true, seed: 211 });
    const e = circlePts(x1 + Math.cos(a) * 22, y1 + Math.sin(a) * 22, 28, 17, 24, a);
    P.fillPts(ctx, e, col); stroke(ctx, e, { w: 2.6, closed: true, seed: 212 });
  };
  F.calorimeter = (ctx, x, y, s, t) => { // (x,y)=alt orta; iç içe kaplar + kapak + termometre + karıştırıcı
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const out = [[-150, 0], [-150, -260], [150, -260], [150, 0], [-150, 0]]; P.fillPts(ctx, out, '#E8E0CF'); wash(ctx, out, '#8A6A45', 0.3, 215, { bleed: 1, blooms: 1 }); stroke(ctx, out, { w: 3.4, closed: true, seed: 216 });
    // yalıtım dokusu
    ctx.save(); ctx.globalAlpha = 0.35; for (let i = 0; i < 26; i++) { const yy = -20 - i * 9.4; line(ctx, [-146, yy], [-112, yy - 6], { w: 1.2, dry: false, seed: 220 + i }); line(ctx, [112, yy], [146, yy - 6], { w: 1.2, dry: false, seed: 250 + i }); } ctx.restore();
    const inn = [[-110, -20], [-110, -230], [110, -230], [110, -20], [-110, -20]]; P.fillPts(ctx, inn, PAL.white, 0.8);
    F.water(ctx, -110, -230, 220, 210, 140, { alpha: 0.35, seed: 217 });
    stroke(ctx, inn, { w: 2.8, closed: true, seed: 218 });
    const lid = [[-165, -262], [165, -262], [165, -292], [-165, -292], [-165, -262]]; P.fillPts(ctx, lid, '#8A6A45', 0.8); stroke(ctx, lid, { w: 3, closed: true, seed: 219 });
    ctx.restore();
    F.thermo(ctx, x + 50 * s, y - 60 * s, 360 * s, 0.45, { w: 16 * s });
    line(ctx, [x - 50 * s, y - 60 * s], [x - 50 * s, y - 380 * s], { w: 4, seed: 221 }); line(ctx, [x - 80 * s, y - 60 * s], [x - 20 * s, y - 60 * s], { w: 4, seed: 222 });
  };
  F.digiThermo = (ctx, x, y, s, txt) => { // dijital termometre; (x,y)=merkez
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-40, -90], [40, -90], [40, 40], [-40, 40], [-40, -90]]; P.fillPts(ctx, b, PAL.white); stroke(ctx, b, { w: 3, closed: true, seed: 225 });
    const sc = [[-30, -76], [30, -76], [30, -30], [-30, -30], [-30, -76]]; P.fillPts(ctx, sc, '#CFE0C8'); stroke(ctx, sc, { w: 2, closed: true, seed: 226 });
    ctx.font = '700 26px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(txt, 0, -44);
    line(ctx, [0, 40], [0, 140], { w: 5, seed: 227 }); inkDot(ctx, 0, 142, 4);
    stroke(ctx, circlePts(0, 5, 12, 12, 16), { w: 2, closed: true, seed: 228 });
    ctx.restore();
  };
  F.feverThermo = (ctx, x, y, s) => { // ateşölçer (dijital, uzun ince)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.5);
    const b = [[-80, -16], [70, -12], [96, 0], [70, 12], [-80, 16], [-80, -16]]; P.fillPts(ctx, b, PAL.white); stroke(ctx, b, { w: 3, closed: true, seed: 230 });
    const sc = [[-60, -9], [0, -9], [0, 9], [-60, 9], [-60, -9]]; P.fillPts(ctx, sc, '#CFE0C8'); stroke(ctx, sc, { w: 1.8, closed: true, seed: 231 });
    P.fillPts(ctx, [[84, -5], [100, 0], [84, 5]], '#9A9A9A');
    ctx.restore();
  };
  F.weather = (ctx, x, y, s, t) => { // hava durumu kartı
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    F.card(ctx, 0, 0, 170, 190, { seed: 235, shadow: false });
    P.sun(ctx, -20, -30, 36, t, { nrays: 12, glow: false, cells: false });
    const cl = [[-10, 10], [60, 10], [70, -6], [50, -20], [30, -16], [10, -24], [-6, -8], [-10, 10]]; P.fillPts(ctx, cl, PAL.white); stroke(ctx, cl, { w: 2.4, closed: true, seed: 236 });
    ctx.font = '700 40px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('24 °C', 0, 70);
    ctx.restore();
  };

  G.F17 = F;
})(window);

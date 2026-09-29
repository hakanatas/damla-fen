// props.js — Film 22 (Isınma yakıtları ve çevre) çizimleri → window.F622
// Kışlık evler, soba, kombi, yakıtlar (odun, kömür, fuel-oil, doğal gaz, tüp gaz), duman, akciğer, CO dedektörü, güvenlik simgeleri.
// rr / fit / card yardımcıları 5. sınıf Ünite 7 props.js (W7) dosyasından uyarlanmıştır.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, hatch } = G.INK;
  const F = {};
  const RED = '#A23A2A', HEAT = '#B5553F', GREEN = '#3F7A3A', SMOKE = '#6F6B66';
  Object.assign(F, { RED, HEAT, GREEN, SMOKE });
  const closeP = pts => pts.concat([pts[0]]);
  F.rr = (x, y, w, h, r, n = 5) => {
    const p = [];
    [[x + w - r, y + r, -Math.PI / 2, 0], [x + w - r, y + h - r, 0, Math.PI / 2], [x + r, y + h - r, Math.PI / 2, Math.PI], [x + r, y + r, Math.PI, 1.5 * Math.PI]]
      .forEach(([cx, cy, a0, a1]) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    return p.concat([p[0]]);
  };
  F.shape = (ctx, pts, col, a = 0.5, seed = 1, o = {}) => {
    const p = (pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) ? pts : closeP(pts);
    P.fillPts(ctx, p, o.base ?? PAL.white, o.baseA ?? 0.96);
    if (col) wash(ctx, p, col, a, seed, { bleed: o.bleed ?? 1, blooms: 0 });
    stroke(ctx, p, { w: o.w ?? 2.6, closed: true, seed: seed + 1 });
  };
  F.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    ctx.fillText(txt, x, y); ctx.restore();
  };
  F.card = (ctx, x, y, w, h, seed = 1, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = o.blur ?? 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, seed + 3, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed, color: o.color });
  };
  // duman bulutları: (x,y) çıkış noktası, yukarı ve rüzgârla sağa kayar
  F.smoke = (ctx, x, y, t, o = {}) => {
    const n = o.n ?? 5, col = o.col ?? SMOKE, a = o.a ?? 0.5, s = o.s ?? 1, drift = o.drift ?? 50;
    for (let i = 0; i < n; i++) {
      const k = ((t * (o.speed ?? 0.25) + i / n) % 1);
      ctx.save(); ctx.globalAlpha *= (1 - k) * a;
      P.fillPts(ctx, circlePts(x + k * drift * s + Math.sin(t + i) * 6, y - k * 170 * s, (12 + k * 30) * s, (9 + k * 22) * s, 20), col, 0.8);
      ctx.restore();
    }
  };
  // ev (ayak noktası, s=1 → ~220px)
  F.house = (ctx, x, y, s = 1, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const w = o.w ?? 180, col = o.col ?? '#B5553F';
    const b = [[-w / 2, 0], [-w / 2, -120], [w / 2, -120], [w / 2, 0], [-w / 2, 0]];
    F.shape(ctx, b, '#D8C096', 0.4, 400 + (o.seed ?? 0));
    const roof = [[-w / 2 - 16, -118], [0, -200], [w / 2 + 16, -118], [-w / 2 - 16, -118]];
    F.shape(ctx, roof, col, 0.55, 410 + (o.seed ?? 0));
    if (o.snow !== false) { const sn = [[-w / 2 - 16, -118], [0, -200], [w / 2 + 16, -118], [w / 2 + 6, -110], [0, -186], [-w / 2 - 6, -110]]; P.fillPts(ctx, sn, PAL.white, 0.95); }
    const cx = w * 0.22; const ch = [[cx, -150], [cx, -226], [cx + 26, -226], [cx + 26, -168]]; P.fillPts(ctx, closeP(ch), '#E6DCC6'); stroke(ctx, ch, { w: 2.4, seed: 420 });
    [[-w / 2 + 22, -92], [w / 2 - 62, -92]].forEach(([wx, wy], i) => { const wn = F.rr(wx, wy, 40, 40, 3); P.fillPts(ctx, wn, PAL.light, o.lit === false ? 0.15 : 0.7); stroke(ctx, wn, { w: 2, closed: true, dry: false }); line(ctx, [wx + 20, wy], [wx + 20, wy + 40], { w: 1.4, dry: false }); });
    const door = F.rr(-18, -64, 36, 64, 3); P.fillPts(ctx, door, '#8A6A45', 0.7); stroke(ctx, door, { w: 2, closed: true, dry: false });
    if (o.smoke !== false) F.smoke(ctx, cx + 13, -232, t + (o.seed ?? 0), { n: 5, a: o.smokeA ?? 0.5, col: o.smokeCol });
    ctx.restore();
  };
  // soba (ayak noktası): gövde + ateş kapağı + boru
  F.stove = (ctx, x, y, s = 1, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-40, 0], [-44, -26], { w: 5, dry: false }); line(ctx, [40, 0], [44, -26], { w: 5, dry: false });
    const body = F.rr(-60, -210, 120, 186, 14); P.fillPts(ctx, body, '#4A4852'); wash(ctx, body, '#2E2D33', 0.4, 431, { bleed: 1, blooms: 0 }); stroke(ctx, body, { w: 3, closed: true, seed: 432 });
    const door = F.rr(-34, -130, 68, 60, 6); P.fillPts(ctx, door, '#2A2930'); stroke(ctx, door, { w: 2.4, closed: true, dry: false });
    if (o.fire !== false) { ctx.save(); P.path(ctx, door); ctx.clip(); const fk = o.fire ?? 1; for (let i = 0; i < 3; i++) { const fx = -16 + i * 16, h = (26 + 10 * Math.sin(t * 7 + i * 2)) * fk; P.fillPts(ctx, [[fx - 10, -72], [fx + Math.sin(t * 9 + i) * 4, -72 - h], [fx + 10, -72]], i === 1 ? PAL.light : '#C8553D', 0.95); } ctx.restore(); }
    // boru
    const pipe = o.pipe ?? [[0, -210], [0, -330], [160, -330]];
    for (let i = 1; i < pipe.length; i++) line(ctx, pipe[i - 1], pipe[i], { w: 22, color: '#5A5862', taper: 0, dry: false });
    for (let i = 1; i < pipe.length; i++) { line(ctx, pipe[i - 1], pipe[i], { w: 2, dry: false, alpha: 0.7 }); }
    ctx.restore();
  };
  // kombi (merkez)
  F.boiler = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rr(-60, -80, 120, 160, 12); P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#9A9387', 0.2, 441, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.8, closed: true, seed: 442 });
    const scr = F.rr(-30, -50, 60, 30, 4); P.fillPts(ctx, scr, '#DCE7EA'); stroke(ctx, scr, { w: 1.8, closed: true, dry: false });
    [-20, 20].forEach(dx => { stroke(ctx, circlePts(dx, 30, 10, 10, 16), { w: 2, closed: true, dry: false }); });
    line(ctx, [0, -80], [0, -120], { w: 12, color: '#9A9387', taper: 0, dry: false });
    [-30, -10, 10, 30].forEach(dx => line(ctx, [dx, 80], [dx, 110], { w: 4, dry: false }));
    ctx.restore();
  };
  // ---------- yakıtlar (merkez, ~120px)
  F.logs = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [[-30, 20], [30, 20], [0, -16]].forEach(([dx, dy], i) => {
      const l = F.rr(dx - 44, dy - 16, 88, 32, 14); P.fillPts(ctx, l, '#B58A5A'); wash(ctx, l, '#6B4A22', 0.5, 450 + i, { bleed: 1, blooms: 0 }); stroke(ctx, l, { w: 2.4, closed: true, seed: 451 + i });
      const e = circlePts(dx + 44, dy, 10, 16, 16); P.fillPts(ctx, e, '#E8D6B4'); stroke(ctx, e, { w: 2, closed: true, dry: false }); stroke(ctx, circlePts(dx + 44, dy, 4, 7, 10), { w: 1.2, closed: true, dry: false });
    });
    ctx.restore();
  };
  F.coal = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const R = G.INK.rng(461);
    for (let i = 0; i < 9; i++) { const cx = (R() - 0.5) * 100, cy = 30 - Math.abs(cx) * 0.3 - R() * 40 - (i > 5 ? 20 : 0), r = 14 + R() * 10; const p = wobble(circlePts(cx, cy, r, r * 0.8, 7, R() * 3), 2, 462 + i); P.fillPts(ctx, p, '#2E2D33'); stroke(ctx, p, { w: 1.6, closed: true, dry: false }); line(ctx, [cx - r * 0.3, cy - r * 0.4], [cx + r * 0.2, cy - r * 0.5], { w: 1.4, color: PAL.white, alpha: 0.5, dry: false }); }
    ctx.restore();
  };
  F.canister = (ctx, x, y, s = 1) => { // fuel-oil bidonu
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-40, 60], [-40, -40], [-20, -60], [40, -60], [40, 60], [-40, 60]]; P.fillPts(ctx, b, '#C8553D', 0.9); wash(ctx, b, '#8A2F22', 0.3, 471, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 472 });
    const cap = F.rr(14, -76, 20, 16, 3); P.fillPts(ctx, cap, '#3C3B45'); stroke(ctx, cap, { w: 1.8, closed: true, dry: false });
    const hd = F.rr(-24, -54, 30, 12, 5); stroke(ctx, hd, { w: 2.4, closed: true, dry: false });
    const dp = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.283; dp.push([Math.sin(a) * 14 * Math.pow(Math.sin(a / 2), 0.8), 12 - Math.cos(a) * 20]); } P.fillPts(ctx, dp, PAL.white, 0.9);
    ctx.restore();
  };
  F.gasFlame = (ctx, x, y, s = 1, t = 0) => { // doğal gaz borusu + mavi alev
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-70, 40], [0, 40], { w: 14, color: '#E2B737', taper: 0, dry: false }); line(ctx, [0, 40], [0, 10], { w: 14, color: '#E2B737', taper: 0, dry: false });
    line(ctx, [-70, 33], [0, 33], { w: 1.6, dry: false }); line(ctx, [-70, 47], [7, 47], { w: 1.6, dry: false });
    const bur = F.rr(-30, 0, 60, 14, 4); P.fillPts(ctx, bur, '#5A5862'); stroke(ctx, bur, { w: 2, closed: true, dry: false });
    for (let i = 0; i < 5; i++) { const fx = -24 + i * 12, h = 30 + 8 * Math.sin(t * 8 + i * 1.7); P.fillPts(ctx, [[fx - 6, 0], [fx, -h], [fx + 6, 0]], '#3E74B0', 0.85); P.fillPts(ctx, [[fx - 3, 0], [fx, -h * 0.5], [fx + 3, 0]], '#9CC3E0', 0.9); }
    ctx.restore();
  };
  F.lpg = (ctx, x, y, s = 1) => { // tüp
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rr(-38, -50, 76, 110, 30); P.fillPts(ctx, b, '#3E74B0', 0.85); wash(ctx, b, '#2E4A7A', 0.3, 481, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 482 });
    const top = F.rr(-18, -72, 36, 24, 6); P.fillPts(ctx, top, '#9A9387'); stroke(ctx, top, { w: 2, closed: true, dry: false });
    line(ctx, [-34, 10], [34, 10], { w: 2, color: PAL.white, dry: false, alpha: 0.7 });
    ctx.restore();
  };
  F.FUELS = {
    odun: { name: 'odun', hal: 0, draw: (c, x, y, s) => F.logs(c, x, y, s) },
    komur: { name: 'kömür', hal: 0, draw: (c, x, y, s) => F.coal(c, x, y, s) },
    fuel: { name: 'fuel-oil', hal: 1, draw: (c, x, y, s) => F.canister(c, x, y, s * 0.9) },
    dogal: { name: 'doğal gaz', hal: 2, draw: (c, x, y, s, t) => F.gasFlame(c, x + 20, y + 10, s, t) },
    tup: { name: 'tüp gaz', hal: 2, draw: (c, x, y, s) => F.lpg(c, x, y, s * 0.9) }
  };
  // akciğer (merkez)
  F.lungs = (ctx, x, y, s = 1, dirty = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [0, -90], [0, -30], { w: 10, color: '#C98A7A', taper: 0, dry: false }); line(ctx, [0, -30], [-24, -10], { w: 7, color: '#C98A7A', dry: false }); line(ctx, [0, -30], [24, -10], { w: 7, color: '#C98A7A', dry: false });
    [-1, 1].forEach((sd, i) => { const l = []; for (let k = 0; k <= 30; k++) { const a = k / 30 * 6.283; l.push([sd * (48 + Math.cos(a) * 36), 20 + Math.sin(a) * 66 * (Math.cos(a) * sd < 0 ? 1 : 0.95)]); } P.fillPts(ctx, l, '#E8B4A6'); wash(ctx, l, '#C8553D', 0.3, 491 + i, { bleed: 1, blooms: 0 }); if (dirty > 0) wash(ctx, l, SMOKE, 0.5 * dirty, 493 + i, { bleed: 1, blooms: 2 }); stroke(ctx, l, { w: 2.6, closed: true, seed: 495 + i }); });
    ctx.restore();
  };
  // CO dedektörü (merkez)
  F.detector = (ctx, x, y, s = 1, t = 0, alarm = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rr(-56, -56, 112, 112, 20); P.fillPts(ctx, b, PAL.white); stroke(ctx, b, { w: 2.8, closed: true, seed: 501 });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) inkDot(ctx, -24 + c * 16, -26 + r * 12, 2.2);
    F.fit(ctx, 'CO', 0, 38, 80, 30);
    const led = circlePts(36, -36, 7, 7, 12); P.fillPts(ctx, led, alarm > 0 && Math.sin(t * 12) > 0 ? RED : GREEN, 0.95);
    if (alarm > 0) for (let i = 0; i < 3; i++) { ctx.save(); ctx.globalAlpha *= alarm * 0.8; stroke(ctx, P.arc(0, 0, 76 + i * 18, -0.6, 0.6, 12), { w: 2.4, color: RED, dry: false }); stroke(ctx, P.arc(0, 0, 76 + i * 18, Math.PI - 0.6, Math.PI + 0.6, 12), { w: 2.4, color: RED, dry: false }); ctx.restore(); }
    ctx.restore();
  };
  F.brush = (ctx, x, y, s = 1) => { // baca fırçası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.5);
    line(ctx, [0, 70], [0, -30], { w: 5, color: '#6B4A22', dry: false });
    for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; line(ctx, [0, -50], [Math.cos(a) * 34, -50 + Math.sin(a) * 34], { w: 2, dry: false }); }
    ctx.restore();
  };
  F.wrench = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(0.7);
    line(ctx, [0, 60], [0, -30], { w: 14, color: '#8E8E8E', taper: 0, dry: false });
    const hd = circlePts(0, -46, 26, 26, 24); P.fillPts(ctx, hd, '#8E8E8E'); P.fillPts(ctx, [[-9, -76], [9, -76], [9, -46], [-9, -46]], '#F1EADB'); stroke(ctx, hd, { w: 2.2, closed: true, dry: false });
    ctx.restore();
  };
  F.window = (ctx, x, y, s = 1, open = 1, t = 0) => { // açılan pencere (merkez)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fr = F.rr(-70, -80, 140, 160, 4); P.fillPts(ctx, fr, '#DCE7EA'); wash(ctx, fr, PAL.water, 0.2, 511, { bleed: 1, blooms: 0 }); stroke(ctx, fr, { w: 3, closed: true, seed: 512 });
    const sw = 70 * (1 - open * 0.6);
    const sash = [[0, -80], [sw, -80 - open * 14], [sw, 80 + open * 14], [0, 80], [0, -80]]; P.fillPts(ctx, sash, PAL.white, 0.7); stroke(ctx, sash, { w: 2.4, closed: true, dry: false });
    for (let i = 0; i < 3; i++) { const k = ((t * 0.5 + i / 3) % 1); const yy = -40 + i * 40; ctx.save(); ctx.globalAlpha *= Math.sin(k * Math.PI) * open; P.arrow(ctx, [-60 + k * 20, yy], [-10 + k * 40, yy - 6], 1, { w: 2.4, color: PAL.water, head: 9, bend: 6 }); ctx.restore(); }
    ctx.restore();
  };
  F.thermo = (ctx, x, y, s = 1, lvl = 0.5, col = HEAT) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const tube = F.rr(-14, -90, 28, 130, 14); P.fillPts(ctx, tube, PAL.white); stroke(ctx, tube, { w: 2.4, closed: true, dry: false });
    P.fillPts(ctx, circlePts(0, 56, 22, 22, 20), col); stroke(ctx, circlePts(0, 56, 22, 22, 20), { w: 2.4, closed: true, dry: false });
    P.fillPts(ctx, F.rr(-6, 40 - 120 * lvl, 12, 120 * lvl + 10, 5), col);
    ctx.restore();
  };
  F.snow = (ctx, t, n = 50, seed = 7, a = 0.8) => {
    const R = G.INK.rng(seed);
    for (let i = 0; i < n; i++) { const x0 = R() * 1920, sp = 30 + R() * 40, ph = R(); const y = ((t * sp + ph * 1100) % 1100) - 20; const x = x0 + Math.sin(t * 0.8 + i) * 20; ctx.save(); ctx.globalAlpha *= a * (0.5 + R() * 0.5); ctx.fillStyle = PAL.white; ctx.beginPath(); ctx.arc(x, y, 2.5 + R() * 3, 0, 7); ctx.fill(); ctx.restore(); }
  };
  // küçük simge kartları için sorunlar
  F.drop = (ctx, x, y, s = 1, col = PAL.water, dirty = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const d = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; d.push([Math.sin(a) * 34 * Math.pow(Math.sin(a / 2), 0.8), -Math.cos(a) * 48]); } P.fillPts(ctx, d, col, 0.6); if (dirty) { wash(ctx, d, '#6B4A22', 0.5 * dirty, 521, { bleed: 1, blooms: 2 }); } stroke(ctx, d, { w: 2.4, closed: true, dry: false }); ctx.restore(); };
  F.pine = (ctx, x, y, s = 1, col = PAL.life) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line(ctx, [0, 0], [0, -30], { w: 6, color: '#5A4028', dry: false }); const tr = [[-36, -24], [0, -110], [36, -24], [-36, -24]]; P.fillPts(ctx, tr, col, 0.75); stroke(ctx, tr, { w: 2.2, closed: true, dry: false }); ctx.restore(); };

  G.F622 = F;
})(window);

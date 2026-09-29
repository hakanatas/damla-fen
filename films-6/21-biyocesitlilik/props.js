// props.js — Film 21 (Biyoçeşitlilik) çizimleri → window.F621
// Gölet, çiçek, arı, kelebek, kurbağa, balık, kuş, balıkçıl, ağaç; nesli tükenen/tehlikedeki canlılar; tehdit simgeleri.
// rr / shape / fit yardımcıları 5. sınıf Ünite 7 props.js (W7) dosyasından kopyalanmıştır.
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, hatch } = G.INK;
  const F = {};
  const RED = '#A23A2A', GREEN = '#3F7A3A';
  F.RED = RED; F.GREEN = GREEN;
  const closeP = pts => pts.concat([pts[0]]);
  F.rr = (x, y, w, h, r, n = 5) => {
    const p = [];
    [[x + w - r, y + r, -Math.PI / 2, 0], [x + w - r, y + h - r, 0, Math.PI / 2], [x + r, y + h - r, Math.PI / 2, Math.PI], [x + r, y + r, Math.PI, 1.5 * Math.PI]]
      .forEach(([cx, cy, a0, a1]) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    return p.concat([p[0]]);
  };
  function shape(ctx, pts, col, a = 0.5, seed = 1, o = {}) {
    const p = (pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1]) ? pts : closeP(pts);
    P.fillPts(ctx, p, o.base ?? PAL.white, o.baseA ?? 0.96);
    if (col) wash(ctx, p, col, a, seed, { bleed: o.bleed ?? 1, blooms: o.blooms ?? 0 });
    stroke(ctx, p, { w: o.w ?? 2.8, closed: true, seed: seed + 1 });
  }
  F.shape = shape;
  F.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    ctx.fillText(txt, x, y); ctx.restore();
  };
  // kâğıt kart (gölgeli)
  F.card = (ctx, x, y, w, h, seed = 1, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 4], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = o.blur ?? 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, seed + 3, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed, color: o.color });
  };

  // ------------------------------------------------ CANLILAR (merkez x,y; s=1 yaklaşık 80–140px)
  F.flower = (ctx, x, y, s = 1, col = '#C8553D', seed = 1, t = 0, h = 90) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sw = Math.sin(t * 1.3 + seed) * 4;
    line(ctx, [0, 0], [sw, -h], { w: 3, color: '#4E6B2A', seed: 700 + seed, bend: 0.06 });
    const lf = [[0, -h * 0.35], [18, -h * 0.5], [30, -h * 0.42], [14, -h * 0.34]]; P.fillPts(ctx, lf, PAL.life, 0.7); stroke(ctx, lf, { w: 1.6, dry: false, seed: 701 + seed });
    for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + seed; const pc = circlePts(sw + Math.cos(a) * 15, -h + Math.sin(a) * 15, 12, 8, 14, a); P.fillPts(ctx, pc, col, 0.8); stroke(ctx, pc, { w: 1.3, closed: true, dry: false, seed: 702 + i }); }
    P.fillPts(ctx, circlePts(sw, -h, 8, 8, 12), '#E3A03A', 1); stroke(ctx, circlePts(sw, -h, 8, 8, 12), { w: 1.4, closed: true, dry: false });
    ctx.restore();
  };
  F.bee = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fl = Math.sin(t * 40) * 0.5;
    [[-6, -1], [8, -1]].forEach(([dx], i) => { const wg = circlePts(dx, -16, 11, 15 * (0.7 + 0.3 * Math.abs(fl)), 16, 0.4 * (i ? 1 : -1)); P.fillPts(ctx, wg, PAL.white, 0.8); stroke(ctx, wg, { w: 1.4, closed: true, dry: false }); });
    const b = circlePts(0, 0, 22, 14, 24); P.fillPts(ctx, b, '#E2B737', 1);
    ctx.save(); P.path(ctx, b); ctx.clip(); [-8, 4].forEach(dx => { ctx.fillStyle = PAL.ink; ctx.fillRect(dx, -16, 6, 32); }); ctx.restore();
    stroke(ctx, b, { w: 2, closed: true, dry: false }); inkDot(ctx, 17, -3, 2.4);
    ctx.restore();
  };
  F.butterfly = (ctx, x, y, s = 1, t = 0, col = '#D98A2B') => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const f = 0.35 + 0.65 * Math.abs(Math.sin(t * 6));
    [-1, 1].forEach(sd => {
      const up = circlePts(sd * 18 * f, -12, 20 * f, 17, 18), dn = circlePts(sd * 13 * f, 10, 13 * f, 12, 16);
      [up, dn].forEach((w, i) => { P.fillPts(ctx, w, col, 0.8); stroke(ctx, w, { w: 1.6, closed: true, dry: false, seed: 720 + i }); });
    });
    line(ctx, [0, -20], [0, 20], { w: 4, dry: false }); line(ctx, [0, -20], [-8, -32], { w: 1.4, dry: false }); line(ctx, [0, -20], [8, -32], { w: 1.4, dry: false });
    ctx.restore();
  };
  F.frog = (ctx, x, y, s = 1, flip = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * flip, s);
    const leg = [[-30, 0], [-44, -10], [-30, -22], [-14, -10]]; P.fillPts(ctx, leg, '#6F8A3A', 0.9); stroke(ctx, leg, { w: 2, seed: 731 });
    const b = [[-34, 0], [-30, -26], [0, -40], [30, -30], [36, -8], [26, 0], [-34, 0]];
    P.fillPts(ctx, b, '#8FAE52', 1); wash(ctx, b, PAL.life, 0.5, 732, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 733 });
    [[8, -40], [26, -36]].forEach(([ex, ey]) => { P.fillPts(ctx, circlePts(ex, ey, 8, 8, 14), PAL.white); stroke(ctx, circlePts(ex, ey, 8, 8, 14), { w: 1.8, closed: true, dry: false }); inkDot(ctx, ex + 1, ey, 2.8); });
    line(ctx, [14, -18], [34, -16], { w: 1.6, dry: false, bend: -0.1 });
    line(ctx, [18, 0], [24, -12], { w: 2.4, dry: false }); line(ctx, [18, 0], [30, 0], { w: 2.4, dry: false });
    ctx.restore();
  };
  F.fish = (ctx, x, y, s = 1, dir = 1, col = '#D98A2B', seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
    const b = [[36, 0], [16, -14], [-12, -12], [-26, 0], [-12, 12], [16, 14], [36, 0]];
    const tail = [[-24, 0], [-44, -14], [-40, 0], [-44, 14], [-24, 0]];
    P.fillPts(ctx, tail, col, 0.8); stroke(ctx, tail, { w: 1.8, closed: true, dry: false, seed: 740 + seed });
    P.fillPts(ctx, b, PAL.white, 1); wash(ctx, b, col, 0.6, 741 + seed, { bleed: 0.8, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 742 + seed });
    inkDot(ctx, 24, -3, 2.6); line(ctx, [8, -10], [4, 8], { w: 1.2, alpha: 0.6, dry: false, bend: 0.2 });
    ctx.restore();
  };
  F.bird = (ctx, x, y, s = 1, t = 0, flip = 1) => { // serçe (tünemiş)
    ctx.save(); ctx.translate(x, y); ctx.scale(s * flip, s);
    const b = [[-30, -6], [-10, -26], [16, -26], [26, -14], [16, 0], [-10, 2], [-30, -6]];
    P.fillPts(ctx, b, '#E8D6B4', 1); wash(ctx, b, '#8A6A45', 0.55, 751, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.2, closed: true, seed: 752 });
    const hd = circlePts(22, -30, 13, 12, 18); P.fillPts(ctx, hd, '#C9A46A', 1); stroke(ctx, hd, { w: 2, closed: true, dry: false });
    P.fillPts(ctx, [[33, -32], [44, -28], [33, -25]], '#E3A03A'); inkDot(ctx, 25, -33, 2.2);
    const wg = [[-16, -14], [4, -22], [8, -8], [-10, -4]]; stroke(ctx, wg, { w: 1.8, seed: 753 });
    line(ctx, [-30, -6], [-46, 2 + Math.sin(t * 3) * 2], { w: 3, dry: false });
    line(ctx, [0, 1], [-2, 14], { w: 1.6, dry: false }); line(ctx, [8, 0], [8, 14], { w: 1.6, dry: false });
    ctx.restore();
  };
  F.heron = (ctx, x, y, s = 1, t = 0) => { // balıkçıl — ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-4, 0], [-2, -80], { w: 2.4, dry: false }); line(ctx, [8, 0], [6, -80], { w: 2.4, dry: false });
    const b = [[-40, -92], [-10, -118], [30, -112], [36, -88], [0, -78], [-40, -92]];
    P.fillPts(ctx, b, PAL.white, 1); wash(ctx, b, '#8F97A0', 0.55, 761, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 762 });
    const neck = P.bez([24, -110], [0, -150], [30, -176], 16); stroke(ctx, neck, { w: 7, color: '#8F97A0', dry: false }); stroke(ctx, neck, { w: 1.6, dry: false });
    const hd = circlePts(34, -180, 10, 8, 16); P.fillPts(ctx, hd, PAL.white); stroke(ctx, hd, { w: 1.8, closed: true, dry: false });
    line(ctx, [42, -180], [76, -172], { w: 3.4, color: '#C07F1E', dry: false }); inkDot(ctx, 34, -182, 2);
    line(ctx, [28, -186], [10, -190], { w: 1.6, dry: false });
    ctx.restore();
  };
  F.tree = (ctx, x, y, s = 1, seed = 1, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [0, 0], [3, -110], { w: 10, seed: 280 + seed, taper: 0.1, color: '#5A4028' });
    const crown = wobble(circlePts(3 + Math.sin(t * 0.9 + seed) * 2, -165, o.rx ?? 70, o.ry ?? 62, 44), 7, 281 + seed);
    P.fillPts(ctx, crown, PAL.paper, 1); wash(ctx, crown, o.col ?? PAL.life, 0.55, 282 + seed, { bleed: 3 }); stroke(ctx, crown, { w: 3, closed: true, seed: 283 + seed });
    ctx.restore();
  };
  F.reeds = (ctx, x, y, s = 1, t = 0, seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 5; i++) { const dx = (i - 2) * 9, h = 90 + ((i * 37 + seed * 11) % 40), sw = Math.sin(t * 1.1 + i + seed) * 5; line(ctx, [dx, 0], [dx + sw, -h], { w: 2.4, color: '#4E6B2A', seed: 790 + i, bend: 0.05 }); if (i % 2 === 0) { const c = circlePts(dx + sw, -h + 12, 5, 16, 14); P.fillPts(ctx, c, '#8A5A34', 0.9); } }
    ctx.restore();
  };
  F.pond = (ctx, cx, cy, rx, ry, t = 0) => {
    const p = wobble(circlePts(cx, cy, rx, ry, 70), 6, 801);
    P.fillPts(ctx, p, '#DCE7EA', 1); wash(ctx, p, PAL.water, 0.42, 802, { bleed: 3, blooms: 3 }); stroke(ctx, p, { w: 3, closed: true, seed: 803 });
    for (let i = 0; i < 4; i++) { const k = ((t * 0.25 + i / 4) % 1); ctx.save(); ctx.globalAlpha *= (1 - k) * 0.6; stroke(ctx, circlePts(cx - rx * 0.3 + i * rx * 0.2, cy + (i % 2) * ry * 0.3 - ry * 0.1, 20 + k * 60, (20 + k * 60) * 0.28, 30), { w: 1.6, closed: true, dry: false, color: PAL.white }); ctx.restore(); }
    return p;
  };
  // ----- nesli tükenen / tehlike altındaki canlılar
  F.tiger = (ctx, x, y, s = 1) => { // Hazar kaplanı (şematik) — ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const col = '#D98A2B';
    [[-50, 0], [-30, 0], [34, 0], [52, 0]].forEach(([lx], i) => line(ctx, [lx, -40], [lx + (i % 2 ? 2 : -2), 0], { w: 11, color: col, dry: false, taper: 0 }));
    const b = [[-70, -40], [-60, -74], [40, -78], [70, -60], [66, -34], [-60, -30], [-70, -40]];
    P.fillPts(ctx, b, '#F0C98A', 1); wash(ctx, b, col, 0.6, 811, { bleed: 1, blooms: 0 });
    for (let i = 0; i < 7; i++) line(ctx, [-50 + i * 16, -76], [-44 + i * 16, -52], { w: 4, dry: false, seed: 812 + i });
    stroke(ctx, b, { w: 2.6, closed: true, seed: 813 });
    const tl = P.bez([-68, -60], [-110, -70], [-104, -110], 16); stroke(ctx, tl, { w: 8, color: col, dry: false }); stroke(ctx, tl, { w: 1.4, dry: false });
    const hd = circlePts(80, -84, 28, 25, 24); P.fillPts(ctx, hd, '#F0C98A', 1); wash(ctx, hd, col, 0.55, 814, { bleed: 1, blooms: 0 }); stroke(ctx, hd, { w: 2.6, closed: true, seed: 815 });
    [[62, -104], [96, -106]].forEach(([ex, ey]) => { const e = circlePts(ex, ey, 8, 8, 12); P.fillPts(ctx, e, col); stroke(ctx, e, { w: 2, closed: true, dry: false }); });
    inkDot(ctx, 72, -88, 2.4); inkDot(ctx, 90, -88, 2.4); P.fillPts(ctx, [[78, -76], [86, -76], [82, -70]], PAL.ink);
    [[60, -80], [100, -80]].forEach(([sx, sy], i) => line(ctx, [sx, sy], [sx + (i ? 10 : -10), sy - 6], { w: 3, dry: false }));
    ctx.restore();
  };
  F.ibis = (ctx, x, y, s = 1) => { // kelaynak — ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-6, 0], [-4, -46], { w: 3, color: '#B5553F', dry: false }); line(ctx, [8, 0], [6, -46], { w: 3, color: '#B5553F', dry: false });
    const b = [[-54, -40], [-20, -86], [26, -92], [36, -62], [0, -44], [-54, -40]];
    P.fillPts(ctx, b, '#3C3B45', 1); wash(ctx, b, '#4F6E4A', 0.35, 821, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 822 });
    line(ctx, [26, -88], [40, -120], { w: 10, color: '#3C3B45', dry: false });
    const hd = circlePts(44, -126, 11, 10, 16); P.fillPts(ctx, hd, '#C8553D', 1); stroke(ctx, hd, { w: 1.8, closed: true, dry: false });
    stroke(ctx, P.bez([52, -126], [86, -122], [96, -94], 14), { w: 4, color: '#B5553F', dry: false });
    for (let i = 0; i < 4; i++) line(ctx, [30 + i * 3, -104], [22 + i * 5, -92], { w: 1.6, dry: false });
    inkDot(ctx, 46, -128, 2);
    ctx.restore();
  };
  F.seal = (ctx, x, y, s = 1) => { // Akdeniz foku — ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-90, 0], [-100, -14], [-86, -26], [-40, -40], [30, -52], [70, -44], [84, -24], [70, 0], [-90, 0]];
    P.fillPts(ctx, b, '#C9C6BE', 1); wash(ctx, b, '#6F6B66', 0.6, 831, { bleed: 1, blooms: 1 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 832 });
    const fl = [[-96, -12], [-120, -26], [-116, 2], [-96, -4]]; P.fillPts(ctx, fl, '#8C8880'); stroke(ctx, fl, { w: 2, seed: 833 });
    const f2 = [[20, -6], [36, 8], [46, 0], [34, -12]]; P.fillPts(ctx, f2, '#8C8880'); stroke(ctx, f2, { w: 2, seed: 834 });
    inkDot(ctx, 62, -38, 3); inkDot(ctx, 80, -30, 2.6);
    for (let i = 0; i < 3; i++) line(ctx, [78, -26 + i * 3], [100, -32 + i * 6], { w: 1.1, dry: false });
    ctx.restore();
  };
  F.oak = (ctx, x, y, s = 1, t = 0) => { // kasnak meşesi — ayak noktası + meşe yaprağı
    F.tree(ctx, x, y, s, 9, t, { col: '#4F7A34', rx: 76, ry: 60 });
    ctx.save(); ctx.translate(x + 90 * s, y - 60 * s); ctx.scale(s, s); ctx.rotate(-0.5);
    const lf = []; for (let i = 0; i <= 40; i++) { const u = i / 40, a = u * Math.PI * 2; const r = 1 + 0.18 * Math.abs(Math.sin(a * 3.5)); lf.push([Math.cos(a) * 16 * r, Math.sin(a) * 34 * r]); }
    P.fillPts(ctx, lf, PAL.life, 0.8); stroke(ctx, lf, { w: 1.8, closed: true, dry: false }); line(ctx, [0, 36], [0, -30], { w: 1.4, dry: false });
    ctx.restore();
  };
  F.mullet = (ctx, x, y, s = 1, dir = 1) => F.fish(ctx, x, y, s, dir, '#8FA5B5', 7); // inci kefali (gümüşi)
  F.sheep = (ctx, x, y, s = 1, seed = 1) => { // ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [[-24], [-10], [14], [26]].forEach(([lx]) => line(ctx, [lx, -24], [lx, 0], { w: 4, dry: false }));
    const b = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283; const r = 1 + 0.1 * Math.abs(Math.sin(a * 5)); b.push([Math.cos(a) * 40 * r, -40 + Math.sin(a) * 22 * r]); }
    P.fillPts(ctx, b, PAL.white); stroke(ctx, b, { w: 2.2, closed: true, seed: 841 + seed });
    const hd = circlePts(44, -48, 11, 14, 16, 0.4); P.fillPts(ctx, hd, '#3C3B45'); stroke(ctx, hd, { w: 1.6, closed: true, dry: false });
    ctx.restore();
  };
  F.buildings = (ctx, x, y, s = 1) => { // ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [[-70, 40, 110], [-26, 44, 150], [22, 48, 90]].forEach(([bx, bw, bh], i) => {
      const b = F.rr(bx, -bh, bw, bh, 2, 1); P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#9A9387', 0.45, 851 + i, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 852 + i });
      for (let r = 0; r < Math.floor(bh / 28); r++) for (let c = 0; c < 2; c++) P.fillPts(ctx, F.rr(bx + 8 + c * (bw / 2 - 2), -bh + 12 + r * 28, 10, 12, 1, 1), PAL.light, 0.55);
    });
    line(ctx, [-90, 0], [90, 0], { w: 2.6 });
    ctx.restore();
  };
  F.flame = (ctx, x, y, s = 1, t = 0, seed = 1) => { // ayak noktası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const fl = (h, w, col, ph) => { const p = []; for (let i = 0; i <= 30; i++) { const u = i / 30, a = u * Math.PI * 2; const yy = -h * (1 - Math.cos(a)) / 2; const xx = Math.sin(a) * w * Math.pow(Math.sin(a / 2 + 0.01), 0.3) * (1 - (-yy / h) * 0.6); p.push([xx + Math.sin(t * 7 + ph + u * 6) * 3 * (-yy / h), yy]); } return p; };
    const a = fl(90, 34, '#C8553D', seed), b = fl(56, 20, '#E3A03A', seed + 2);
    P.fillPts(ctx, a, '#C8553D', 0.85); stroke(ctx, a, { w: 2, closed: true, dry: false, seed: 861 }); P.fillPts(ctx, b, '#E3A03A', 0.95);
    ctx.restore();
  };
  F.sprayer = (ctx, x, y, s = 1, t = 0) => { // tarım ilacı / gübre püskürtücü — merkez
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const tank = F.rr(-34, -30, 56, 76, 12); P.fillPts(ctx, tank, PAL.white); wash(ctx, tank, '#B5553F', 0.35, 871, { bleed: 1, blooms: 0 }); stroke(ctx, tank, { w: 2.6, closed: true, seed: 872 });
    line(ctx, [22, -10], [60, -34], { w: 4, dry: false }); line(ctx, [60, -34], [70, -30], { w: 5, dry: false });
    for (let i = 0; i < 6; i++) { const k = ((t * 0.9 + i / 6) % 1); inkDot(ctx, 76 + k * 40, -30 + (i - 2.5) * 6 * k, 3 * (1 - k * 0.5), { color: '181,85,63', alpha: 0.8 * (1 - k) }); }
    ctx.font = '700 26px Kalam'; ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.fillText('ilaç', -6, 16);
    ctx.restore();
  };
  F.factory = (ctx, x, y, s = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-120, 0], [-120, -90], [-70, -130], [-70, -90], [-20, -130], [-20, -90], [30, -130], [30, -90], [120, -90], [120, 0], [-120, 0]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#9A9387', 0.45, 301, { bleed: 1.5 }); stroke(ctx, b, { w: 3, closed: true, seed: 302 });
    const ch = [[70, -90], [70, -190], [96, -190], [96, -90]]; P.fillPts(ctx, closeP(ch), PAL.white); wash(ctx, closeP(ch), '#9A9387', 0.5, 303); stroke(ctx, ch, { w: 3, seed: 304 });
    for (let i = 0; i < 3; i++) { const wn = F.rr(-100 + i * 60, -60, 34, 30, 3); P.fillPts(ctx, wn, PAL.light, 0.45); stroke(ctx, wn, { w: 2, closed: true, dry: false }); }
    for (let i = 0; i < 3; i++) { const c = ((t * 0.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha *= (1 - c) * 0.6; P.fillPts(ctx, circlePts(83 + c * 40, -210 - c * 90, 14 + c * 20, 10 + c * 14, 20), '#6F6B66', 0.5); ctx.restore(); }
    ctx.restore();
  };
  F.seeds = (ctx, x, y, s = 1) => { // yerel tohum torbası + başak — merkez
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const bag = [[-40, 50], [-46, -10], [-30, -34], [30, -34], [46, -10], [40, 50], [-40, 50]];
    P.fillPts(ctx, bag, '#E8D6B4'); wash(ctx, bag, '#8A6A45', 0.4, 881, { bleed: 1, blooms: 0 }); stroke(ctx, bag, { w: 2.6, closed: true, seed: 882 });
    line(ctx, [-30, -30], [30, -30], { w: 3, dry: false });
    ctx.font = '700 24px Kalam'; ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.fillText('yerel', 0, 18);
    for (let i = 0; i < 3; i++) { const bx = -14 + i * 14; line(ctx, [bx, -30], [bx + (i - 1) * 8, -80], { w: 2, color: '#8A6A45', dry: false }); for (let j = 0; j < 4; j++) { const gy = -60 - j * 8, gx = bx + (i - 1) * 8 * ((j + 2) / 6); P.fillPts(ctx, circlePts(gx - 4, gy, 3.5, 6, 10, -0.5), '#C99A22'); P.fillPts(ctx, circlePts(gx + 4, gy, 3.5, 6, 10, 0.5), '#C99A22'); } }
    ctx.restore();
  };
  F.book = (ctx, x, y, s = 1, col = PAL.water) => { // açık kitap
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    [-1, 1].forEach((sd, i) => { const pg = [[0, -40], [sd * 70, -48], [sd * 72, 36], [0, 44]]; P.fillPts(ctx, closeP(pg), PAL.white); wash(ctx, closeP(pg), col, 0.15, 891 + i, { bleed: 1, blooms: 0 }); stroke(ctx, closeP(pg), { w: 2.4, closed: true, seed: 892 + i }); for (let r = 0; r < 4; r++) line(ctx, [sd * 12, -26 + r * 16], [sd * 58, -30 + r * 16], { w: 1.4, alpha: 0.5, dry: false }); });
    ctx.restore();
  };
  F.film = (ctx, x, y, s = 1) => { // belgesel (ekran + oynat)
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sc = F.rr(-70, -46, 140, 92, 8); P.fillPts(ctx, sc, '#DCE7EA'); wash(ctx, sc, PAL.life, 0.3, 895, { bleed: 1, blooms: 0 }); stroke(ctx, sc, { w: 2.6, closed: true, seed: 896 });
    P.fillPts(ctx, [[-14, -20], [22, 0], [-14, 20]], PAL.ink, 0.85);
    ctx.restore();
  };

  G.F621 = F;
})(window);

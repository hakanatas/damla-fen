// Film 6'ya özel çizimler (sahne değil): sarkaç, genel enerji çubukları, hız treni rayı ve vagonu. Global: window.F76
window.F76 = (function () {
  const { PAL, line, stroke, circlePts, wash, dashed, hatch } = INK;
  const F = F7E, A = {};
  A.ELA = '#6B5236';  // esneklik potansiyel (taralı)
  // sarkaç: askı (px,py), ip boyu L, açı th (radyan, 0 = düşey), top yarıçapı r
  A.pend = (ctx, px, py, L, th, r = 40, o = {}) => {
    if (o.stand !== false) {
      const fy = o.floor ?? py + L + r + 70;
      const hw = o.half ?? 280;
      line(ctx, [px - hw - 20, py], [px + hw + 20, py], { w: 7, seed: 6000, taper: 0.03 });
      line(ctx, [px - hw, py], [px - hw - 20, fy], { w: 6, seed: 6001 }); line(ctx, [px + hw, py], [px + hw + 20, fy], { w: 6, seed: 6002 });
      line(ctx, [px - hw - 100, fy], [px + hw + 100, fy], { w: 3.4, seed: 6003 });
    }
    const bx = px + Math.sin(th) * L, by = py + Math.cos(th) * L;
    line(ctx, [px, py], [bx, by], { w: 2.2, dry: false, seed: 6004 });
    INK.inkDot(ctx, px, py, 5);
    F.ball(ctx, bx, by, r, o.col ?? F.KE, 6010, { stripe: true });
    return [bx, by];
  };
  A.ghost = (ctx, px, py, L, th, r = 40, a = 0.25) => { const bx = px + Math.sin(th) * L, by = py + Math.cos(th) * L; ctx.save(); ctx.globalAlpha *= a; line(ctx, [px, py], [bx, by], { w: 1.4, dry: false }); stroke(ctx, circlePts(bx, by, r, r, 30), { w: 2, closed: true, dry: false }); ctx.restore(); return [bx, by]; };
  // genel çubuklar: items [{v, col, name, hatch}] ; o.total → yığılmış toplam
  A.bars = (ctx, x, yb, items, o = {}) => {
    const H = o.H ?? 280, bw = o.bw ?? 80, gap = o.gap ?? 180, size = o.size ?? 32;
    items.forEach((it, i) => {
      const cx = x + i * gap + bw / 2;
      line(ctx, [cx - bw / 2 - 12, yb], [cx + bw / 2 + 12, yb], { w: 2.4, dry: false, seed: 6030 + i });
      const h = H * E.clamp(it.v);
      if (h > 1) { const r = F.rect(cx - bw / 2, yb - h, cx + bw / 2, yb); P.fillPts(ctx, r, it.col, it.hatch ? 0.35 : 0.75); if (it.hatch) { ctx.save(); ctx.beginPath(); ctx.rect(cx - bw / 2, yb - h, bw, h); ctx.clip(); for (let k = -bw; k < h + bw; k += 16) line(ctx, [cx - bw / 2, yb - k], [cx + bw / 2, yb - k - bw], { w: 2.2, color: it.col, dry: false, taper: 0, seed: 6040 + (k | 0), noBoil: true }); ctx.restore(); } stroke(ctx, r, { w: 2.4, closed: true, dry: false, seed: 6050 + i, noBoil: true }); }
      (it.name.split('\n')).forEach((nm, j) => F.txt(ctx, nm, cx, yb + 40 + j * 34, { size, align: 'center', color: it.lcol ?? it.col }));
    });
    if (o.total) {
      const cx = x + items.length * gap + bw / 2 + 10; let acc = 0;
      line(ctx, [cx - bw / 2 - 12, yb], [cx + bw / 2 + 12, yb], { w: 2.4, dry: false, seed: 6060 });
      items.forEach(it => { const h = H * E.clamp(it.v); if (h > 0.5) P.fillPts(ctx, F.rect(cx - bw / 2, yb - acc - h, cx + bw / 2, yb - acc), it.col, it.hatch ? 0.35 : 0.75); acc += h; });
      stroke(ctx, F.rect(cx - bw / 2, yb - H, cx + bw / 2, yb), { w: 3.2, closed: true, seed: 6061, noBoil: true });
      F.txt(ctx, 'toplam', cx, yb + 40, { size, align: 'center' });
    }
  };
  // standart üçlü: çekim potansiyel, kinetik, ısı
  A.std = (pe, ke, heat, withHeat = true) => {
    const it = [{ v: pe, col: F.PE, name: 'potansiyel' }, { v: ke, col: F.KE, lcol: '#9A6412', name: 'kinetik' }];
    if (withHeat) it.push({ v: heat, col: F.HEAT, name: 'ısı' });
    return it;
  };
  // hız treni rayı: y(x)
  const KN = [[160, 300], [600, 770], [960, 470], [1300, 760], [1600, 560]];
  A.trackY = x => { // Catmull-Rom benzeri pürüzsüz: kosinüs interpolasyonu
    for (let i = 1; i < KN.length; i++) if (x <= KN[i][0]) { const [x0, y0] = KN[i - 1], [x1, y1] = KN[i]; const u = (x - x0) / (x1 - x0); return y0 + (y1 - y0) * (1 - Math.cos(u * Math.PI)) / 2; }
    return KN[KN.length - 1][1];
  };
  A.TOP = 300; A.LOW = 770;
  // zaman tablosu (enerji korunumu: v = sqrt(2g(y - y0) + v0²))
  const LUT = (() => { const g = 900, v0 = 60; const out = [[160, 0]]; let tt = 0, px = 160, py = A.trackY(160); for (let x = 162; x <= 1600; x += 2) { const y = A.trackY(x); const ds = Math.hypot(x - px, y - py); const v = Math.sqrt(2 * g * (y - A.TOP) + v0 * v0); tt += ds / v; out.push([x, tt]); px = x; py = y; } return out; })();
  A.RUN = LUT[LUT.length - 1][1];
  A.xAt = tt => { if (tt <= 0) return 160; for (let i = 1; i < LUT.length; i++) if (LUT[i][1] >= tt) { const a = LUT[i - 1], b = LUT[i]; return a[0] + (b[0] - a[0]) * (tt - a[1]) / (b[1] - a[1]); } return 1600; };
  A.track = (ctx) => {
    const pts = []; for (let x = 160; x <= 1600; x += 6) pts.push([x, A.trackY(x)]);
    const fill = pts.concat([[1600, 880], [160, 880]]); P.fillPts(ctx, fill, PAL.paperDeep, 0.5);
    for (let x = 200; x < 1600; x += 90) line(ctx, [x, A.trackY(x) + 6], [x, 880], { w: 2, alpha: 0.4, dry: false, seed: 6100 + x });
    stroke(ctx, pts, { w: 4, seed: 6090, taper: 0.02 });
    stroke(ctx, pts.map(p => [p[0], p[1] + 12]), { w: 2, alpha: 0.6, seed: 6091, taper: 0.02, dry: false });
    line(ctx, [120, 880], [1640, 880], { w: 3, seed: 6092 });
  };
  A.car = (ctx, x, t) => {
    const y = A.trackY(x), dy = A.trackY(x + 3) - A.trackY(x - 3), a = Math.atan2(dy, 6);
    ctx.save(); ctx.translate(x, y); ctx.rotate(a);
    const b = [[-50, -10], [50, -10], [56, -52], [-56, -52], [-50, -10]]; P.fillPts(ctx, b, PAL.paper); wash(ctx, b, '#B5553F', 0.55, 6120, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.8, closed: true, seed: 6121 });
    [-30, 30].forEach((wx, i) => { P.fillPts(ctx, circlePts(wx, -8, 11, 11, 16), PAL.ink, 0.9); });
    ctx.restore();
  };
  return A;
})();

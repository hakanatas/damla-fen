// props.js — Ünite 7 (Sürdürülebilir Yaşam ve Geri Dönüşüm) ortak çizimleri → window.W7
// Evsel katı atıklar, Sıfır Atık kutuları, geri dönüşüm sembolü, mutfak zemini.
// (Bu dosya 25, 26 ve 27. filmlerde aynı içerikle kopya olarak bulunur.)
(function (G) {
  const { PAL, stroke, line, wash, circlePts, wobble, inkDot, hatch, arrowHead } = G.INK;
  const W7 = {};
  const RED = '#A23A2A';
  W7.RED = RED;
  // Sıfır Atık Yönetmeliği standart renkleri
  W7.BINS = {
    mavi: { col: '#3E74B0', name: 'kâğıt-karton', tr: 'Mavi' },
    sari: { col: '#E2B737', name: 'plastik', tr: 'Sarı' },
    yesil: { col: '#4F8A45', name: 'cam', tr: 'Yeşil' },
    gri: { col: '#8E8E8E', name: 'metal', tr: 'Gri' },
    kahve: { col: '#8A5A34', name: 'organik', tr: 'Kahverengi' },
    siyah: { col: '#2E2D33', name: 'diğer', tr: 'Siyah' }
  };
  const closeP = pts => pts.concat([pts[0]]);
  W7.rr = (x, y, w, h, r, n = 5) => {
    const p = [];
    [[x + w - r, y + r, -Math.PI / 2, 0], [x + w - r, y + h - r, 0, Math.PI / 2], [x + r, y + h - r, Math.PI / 2, Math.PI], [x + r, y + r, Math.PI, 1.5 * Math.PI]]
      .forEach(([cx, cy, a0, a1]) => { for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } });
    return p.concat([p[0]]);
  };
  const rr = W7.rr;
  function shape(ctx, pts, col, a = 0.5, seed = 1, o = {}) {
    const p = o.open ? pts : (pts[0][0] === pts[pts.length - 1][0] && pts[0][1] === pts[pts.length - 1][1] ? pts : closeP(pts));
    P.fillPts(ctx, p, o.base ?? PAL.white, o.baseA ?? 0.96);
    if (col) wash(ctx, p, col, a, seed, { bleed: o.bleed ?? 1, blooms: o.blooms ?? 0 });
    stroke(ctx, p, { w: o.w ?? 2.8, closed: true, seed: seed + 1 });
  }
  W7.shape = shape;
  const hl = (ctx, a, b, al = 0.85, w = 3) => line(ctx, a, b, { w, color: PAL.white, dry: false, alpha: al });

  // metni verilen genişliğe sığdır (yazı boyunu küçültür)
  W7.fit = (ctx, txt, x, y, maxW, size, o = {}) => {
    ctx.save(); let sz = size; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`;
    while (ctx.measureText(txt).width > maxW && sz > 18) { sz -= 1; ctx.font = `${o.weight ?? 700} ${sz}px ${o.font ?? 'Kalam'}`; }
    ctx.textAlign = o.align ?? 'center'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1);
    ctx.fillText(txt, x, y); ctx.restore();
  };

  // ------------------------------------------------------------------ ATIKLAR (merkez 0,0; ~120px)
  const D = {};
  D.gazete = ctx => {
    const p = [[-64, -46], [62, -50], [66, 44], [-60, 48]];
    shape(ctx, p, '#CFC4AA', 0.35, 11, { base: '#F2ECDD' });
    line(ctx, [-50, -32], [40, -34], { w: 7, taper: 0.05, dry: false, seed: 12 });
    const box = [[-50, -18], [-10, -19], [-9, 16], [-49, 17], [-50, -18]]; stroke(ctx, box, { w: 1.8, closed: true, dry: false }); hatch(ctx, -48, -1, 36, 30, { n: 5, w: 1, alpha: 0.5 });
    for (let i = 0; i < 5; i++) line(ctx, [2, -14 + i * 8], [50, -15 + i * 8], { w: 1.3, alpha: 0.55, dry: false, seed: 13 + i });
    for (let i = 0; i < 3; i++) line(ctx, [-50, 26 + i * 7], [52, 25 + i * 7], { w: 1.3, alpha: 0.55, dry: false, seed: 20 + i });
    line(ctx, [0, -48], [2, 46], { w: 1.2, alpha: 0.35, dry: false });
  };
  D.karton = ctx => {
    const col = '#B08A5A';
    shape(ctx, [[-52, -8], [38, -8], [38, 52], [-52, 52]], col, 0.6, 31, { base: '#E8D9BC' });
    shape(ctx, [[38, -8], [62, -26], [62, 34], [38, 52]], '#8A6A45', 0.55, 33, { base: '#E0CFAE' });
    shape(ctx, [[-52, -8], [-30, -40], [18, -46], [38, -8]], col, 0.45, 35, { base: '#EFE3CB' });
    shape(ctx, [[38, -8], [62, -26], [74, -58], [48, -40]], col, 0.45, 37, { base: '#EFE3CB' });
    line(ctx, [-20, -8], [-20, 52], { w: 5, color: '#C9B48A', dry: false, alpha: 0.8 });
    ctx.save(); ctx.globalAlpha *= 0.7; line(ctx, [-6, 14], [22, 14], { w: 2 }); arrowHead(ctx, [-6, 14], [-6, 2], 6, { w: 2 }); ctx.restore();
  };
  D.camSise = ctx => {
    const p = [[-9, -64], [9, -64], [9, -36]].concat(P.bez([9, -36], [24, -26], [24, -6], 8)).concat([[24, 52]]).concat(P.bez([24, 52], [24, 62], [14, 62], 4)).concat([[-14, 62]]).concat(P.bez([-14, 62], [-24, 62], [-24, 52], 4)).concat([[-24, -6]]).concat(P.bez([-24, -6], [-24, -26], [-9, -36], 8));
    shape(ctx, p, '#4F8A45', 0.42, 41, { base: '#E4EEE0', baseA: 0.8 });
    stroke(ctx, rr(-11, -70, 22, 10, 3), { w: 2.4, closed: true, seed: 42 });
    hl(ctx, [-15, -4], [-15, 44]); hl(ctx, [-4, -54], [-4, -40], 0.7, 2);
  };
  D.kavanoz = ctx => {
    shape(ctx, rr(-36, -30, 72, 84, 14), '#7FA8B8', 0.3, 51, { base: '#EAF1F2', baseA: 0.8 });
    shape(ctx, rr(-32, -48, 64, 20, 4), '#8E8E8E', 0.65, 53, { base: '#DDDDDD' });
    for (let i = 0; i < 4; i++) line(ctx, [-24 + i * 16, -46], [-24 + i * 16, -30], { w: 1.2, alpha: 0.5, dry: false });
    hl(ctx, [-24, -14], [-24, 36]); hl(ctx, [-14, -18], [-14, -6], 0.6, 2);
  };
  D.konserve = ctx => {
    const body = [[-34, -36], [34, -36], [34, 44]].concat(P.arc(0, 44, 34, 0, Math.PI, 14, 10)).concat([[-34, -36]]);
    shape(ctx, body, '#8E8E8E', 0.55, 61, { base: '#E6E6E4' });
    for (let i = 0; i < 4; i++) stroke(ctx, P.arc(0, -18 + i * 16, 34, 0.1, Math.PI - 0.1, 14, 6), { w: 1.3, alpha: 0.55, dry: false, seed: 62 + i });
    const top = circlePts(0, -36, 34, 10, 30); P.fillPts(ctx, top, '#D5D5D2'); stroke(ctx, top, { w: 2.4, closed: true, seed: 66 });
    // yarı açık kapak
    const lid = [[-30, -38], [30, -38], [26, -70], [-24, -64], [-30, -38]]; shape(ctx, lid, '#8E8E8E', 0.45, 67, { base: '#E2E2DF' });
    hl(ctx, [-24, -20], [-24, 36]);
  };
  D.icecek = ctx => {
    const body = [[-22, -44], [-26, -36], [-26, 50]].concat(P.arc(0, 50, 26, Math.PI, 0, 12, 6).reverse().reverse()).concat([[26, 50], [26, -36], [22, -44]]);
    const b2 = [[-20, -48], [20, -48], [26, -38], [26, 50], [-26, 50], [-26, -38], [-20, -48]];
    shape(ctx, b2, '#A8B4BC', 0.5, 71, { base: '#EEF0F1' });
    P.fillPts(ctx, [[-26, -6], [26, -6], [26, 22], [-26, 22]], '#3E74B0', 0.55); line(ctx, [-26, -6], [26, -6], { w: 1.4, dry: false }); line(ctx, [-26, 22], [26, 22], { w: 1.4, dry: false });
    stroke(ctx, circlePts(0, -48, 20, 5, 24), { w: 2, closed: true, seed: 72, dry: false });
    stroke(ctx, circlePts(4, -49, 7, 2.5, 12), { w: 1.6, closed: true, dry: false });
    hl(ctx, [-16, -34], [-16, 44]);
  };
  D.plastikSise = ctx => {
    const p = [[-9, -58], [9, -58], [9, -46]].concat(P.bez([9, -46], [26, -34], [26, -16], 8)).concat([[26, 10], [22, 16], [26, 22], [26, 54], [18, 62], [-18, 62], [-26, 54], [-26, 22], [-22, 16], [-26, 10], [-26, -16]]).concat(P.bez([-26, -16], [-26, -34], [-9, -46], 8));
    shape(ctx, p, '#7FB0CF', 0.3, 81, { base: '#EEF5F8', baseA: 0.85 });
    shape(ctx, rr(-11, -72, 22, 15, 3), '#3E74B0', 0.8, 83, { base: '#C9DCEA' });
    P.fillPts(ctx, [[-26, 24], [26, 24], [26, 44], [-26, 44]], '#E3A03A', 0.5);
    line(ctx, [-26, 24], [26, 24], { w: 1.3, dry: false }); line(ctx, [-26, 44], [26, 44], { w: 1.3, dry: false });
    hl(ctx, [-16, -20], [-16, 8]); hl(ctx, [-16, 50], [-14, 54], 0.6, 2);
  };
  D.yogurt = ctx => {
    const p = [[-40, -30], [40, -30], [30, 40], [-30, 40]];
    shape(ctx, p, '#F2F0E8', 0.2, 91, { base: '#FBFAF6' });
    P.fillPts(ctx, [[-37, -8], [37, -8], [34, 14], [-34, 14]], PAL.water, 0.35);
    stroke(ctx, circlePts(0, -30, 40, 8, 30), { w: 2.4, closed: true, seed: 92 });
    hl(ctx, [-28, -20], [-22, 32], 0.6);
  };
  D.muz = ctx => {
    const Y = '#E2C04A';
    const peel = (pts, s) => shape(ctx, pts, Y, 0.7, s, { base: '#F6E7A8' });
    peel([[-10, -10], [-40, 20], [-58, 30], [-50, 40], [-24, 30], [-6, 12]], 101);
    peel([[10, -10], [40, 18], [60, 24], [54, 36], [26, 30], [6, 12]], 103);
    peel([[-12, -6], [-8, 50], [0, 60], [8, 50], [12, -6]], 105);
    peel([[-10, -8], [-16, -40], [-8, -60], [2, -62], [10, -40], [10, -8]], 107);
    line(ctx, [-2, -62], [0, -72], { w: 5, color: '#6B4A2A' });
    [[-40, 28], [34, 26], [0, 40], [-4, -34]].forEach(([x, y], i) => { ctx.save(); ctx.globalAlpha *= 0.6; ctx.fillStyle = '#6B4A2A'; ctx.beginPath(); ctx.arc(x, y, 3 + i % 2, 0, 7); ctx.fill(); ctx.restore(); });
  };
  D.elma = ctx => {
    const p = P.arc(0, -34, 34, Math.PI * 1.05, Math.PI * 1.95, 14, 20).concat([[18, -20], [10, 0], [12, 20], [26, 32]]).concat(P.arc(0, 40, 32, -0.2, Math.PI + 0.2, 14, 20)).concat([[-26, 32], [-12, 20], [-10, 0], [-18, -20]]);
    shape(ctx, p, '#EAD9A0', 0.45, 111, { base: '#F7EFD5' });
    // kabuk (yeşil elma)
    stroke(ctx, P.arc(0, -34, 34, Math.PI * 1.05, Math.PI * 1.95, 14, 20), { w: 6, color: '#8FAE4A' });
    stroke(ctx, P.arc(0, 40, 32, -0.2, Math.PI + 0.2, 14, 20), { w: 6, color: '#8FAE4A' });
    line(ctx, [0, -54], [4, -74], { w: 4, color: '#6B4A2A' });
    [[-4, 2], [4, 10]].forEach(([x, y]) => { ctx.save(); ctx.fillStyle = '#4A3420'; ctx.beginPath(); ctx.ellipse(x, y, 3, 5, 0.3, 0, 7); ctx.fill(); ctx.restore(); });
  };
  D.pil = ctx => {
    shape(ctx, rr(-52, -18, 94, 36, 8), '#2E2D33', 0.75, 121, { base: '#8A8A8A' });
    P.fillPts(ctx, rr(14, -18, 28, 36, 6), '#C07F1E', 0.8); stroke(ctx, rr(-52, -18, 94, 36, 8), { w: 2.8, closed: true, seed: 122 });
    shape(ctx, rr(42, -8, 10, 16, 2), '#8E8E8E', 0.6, 123);
    ctx.save(); ctx.font = '700 26px Kalam'; ctx.fillStyle = PAL.white; ctx.textAlign = 'center'; ctx.fillText('+', 28, 9); ctx.fillText('–', -38, 8); ctx.restore();
    hl(ctx, [-44, -9], [10, -10], 0.5, 2.4);
  };
  D.kumas = ctx => {
    const p = []; const n = 28;
    for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const r = (i % 2 ? 52 : 44) * (1 + 0.12 * Math.sin(a * 3)); p.push([Math.cos(a) * r * 1.2, Math.sin(a) * r * 0.85]); }
    shape(ctx, p, '#6D86B0', 0.45, 131, { base: '#E4EAF3' });
    ctx.save(); P.path(ctx, p); ctx.clip(); ctx.globalAlpha *= 0.5;
    for (let i = -4; i <= 4; i++) { line(ctx, [i * 18, -60], [i * 18 + 10, 60], { w: 3, color: '#3E5E8C', dry: false }); line(ctx, [-70, i * 16], [70, i * 16 - 6], { w: 2, color: '#3E5E8C', dry: false }); }
    ctx.restore();
  };
  D.mendil = ctx => {
    const p = wobble(circlePts(0, 0, 54, 40, 22), 9, 141);
    shape(ctx, p, '#BDB7AA', 0.3, 142, { base: '#FBFAF6' });
    [[[-30, -10], [4, 6]], [[10, -24], [26, 12]], [[-16, 18], [20, 22]], [[-40, 6], [-20, -24]]].forEach(([a, b], i) => line(ctx, a, b, { w: 1.4, alpha: 0.6, dry: false, seed: 143 + i }));
    wash(ctx, wobble(circlePts(14, 8, 16, 11, 16), 3, 147), '#8A7A5A', 0.35, 148);
  };
  D.pecete = ctx => {
    const p = wobble(circlePts(0, 0, 50, 44, 22), 10, 151);
    shape(ctx, p, '#E9E1CE', 0.3, 152, { base: '#FBF8EE' });
    [[-24, -18, 14], [16, 10, 18], [-8, 20, 10]].forEach(([x, y, r], i) => wash(ctx, wobble(circlePts(x, y, r, r * 0.8, 16), 3, 153 + i), '#C8A050', 0.55, 156 + i));
    [[[-30, 0], [0, -10]], [[4, -30], [20, -4]], [[-20, 30], [14, 30]]].forEach(([a, b], i) => line(ctx, a, b, { w: 1.4, alpha: 0.55, dry: false, seed: 160 + i }));
  };
  D.porselen = ctx => {
    const R = 50; const shards = [[0.2, 2.2, [-6, 4]], [2.3, 4.1, [4, 8]], [4.2, 6.4, [6, -6]]];
    shards.forEach(([a0, a1, [dx, dy]], i) => {
      const p = [[dx + Math.cos((a0 + a1) / 2) * 6, dy + Math.sin((a0 + a1) / 2) * 6]].concat(P.arc(dx, dy, R, a0, a1, 16));
      shape(ctx, p, '#D9DDE3', 0.25, 171 + i * 3, { base: '#FBFBF8' });
      ctx.save(); ctx.globalAlpha *= 0.8; stroke(ctx, P.arc(dx, dy, R - 9, a0 + 0.08, a1 - 0.08, 14), { w: 3, color: '#3E74B0', dry: false }); ctx.restore();
      for (let k = 0; k < 3; k++) { const a = a0 + (a1 - a0) * (k + 0.5) / 3; ctx.save(); ctx.fillStyle = '#3E74B0'; ctx.globalAlpha *= 0.7; ctx.beginPath(); ctx.arc(dx + Math.cos(a) * (R - 20), dy + Math.sin(a) * (R - 20), 2.6, 0, 7); ctx.fill(); ctx.restore(); }
    });
  };
  D.yag = ctx => {
    const p = [[-10, -60], [10, -60], [10, -44], [28, -30], [28, 58], [-28, 58], [-28, -30], [-10, -44]];
    P.fillPts(ctx, closeP(p), '#F4EEDC', 0.9);
    P.fillPts(ctx, [[-28, -2], [28, -6], [28, 58], [-28, 58]], '#8A6420', 0.75);
    stroke(ctx, closeP(p), { w: 2.8, closed: true, seed: 181 });
    shape(ctx, rr(-12, -72, 24, 14, 3), '#6B6B6B', 0.6, 183);
    hl(ctx, [-18, -24], [-18, 46], 0.7);
  };
  D.torba = ctx => { // dolu çöp torbası
    const p = [[-70, 70], [-84, 20], [-72, -40], [-40, -70], [-12, -80], [-6, -98], [6, -98], [12, -80], [44, -70], [74, -40], [86, 20], [70, 70]];
    shape(ctx, p, '#3A3A40', 0.7, 191, { base: '#8C8C94' });
    line(ctx, [-10, -86], [10, -86], { w: 4 }); line(ctx, [-4, -98], [-16, -112], { w: 3 }); line(ctx, [4, -98], [16, -114], { w: 3 });
    [[[-40, -40], [-30, 30]], [[20, -50], [40, 20]], [[-60, 10], [-50, 50]]].forEach(([a, b], i) => line(ctx, a, b, { w: 2, color: '#9A9AA2', alpha: 0.7, dry: false, seed: 192 + i }));
  };
  W7.D = D;
  W7.KIND = { gazete: 'kagit', karton: 'kagit', camSise: 'cam', kavanoz: 'cam', konserve: 'metal', icecek: 'metal', plastikSise: 'plastik', yogurt: 'plastik', muz: 'organik', elma: 'organik', pil: 'pil', kumas: 'tekstil', mendil: 'diger', pecete: 'diger', porselen: 'diger', yag: 'yag' };
  W7.NAME = { gazete: 'gazete', karton: 'karton kutu', camSise: 'cam şişe', kavanoz: 'cam kavanoz', konserve: 'konserve kutusu', icecek: 'içecek kutusu', plastikSise: 'pet şişe', yogurt: 'yoğurt kabı', muz: 'muz kabuğu', elma: 'elma koçanı', pil: 'pil', kumas: 'kumaş parçası', mendil: 'ıslak mendil', pecete: 'kirli peçete', porselen: 'kırık porselen', yag: 'atık yağ' };
  W7.item = (ctx, key, x, y, s = 1, rot = 0, alpha = 1) => {
    if (s <= 0.01 || alpha <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); if (alpha < 1) ctx.globalAlpha *= alpha; D[key](ctx); ctx.restore();
  };

  // ------------------------------------------------------------------ GERİ DÖNÜŞÜM SEMBOLÜ
  W7.recycle = (ctx, x, y, r, k = 1, o = {}) => {
    if (k <= 0) return; const col = o.color ?? '#3F7A3A', w = o.w ?? Math.max(3, r * 0.16);
    const V = [0, 1, 2].map(i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 3 + (o.rot ?? 0); return [x + Math.cos(a) * r, y + Math.sin(a) * r]; });
    for (let i = 0; i < 3; i++) {
      const kk = E.clamp(k * 3 - i); if (kk <= 0) continue;
      const a = V[i], b = V[(i + 1) % 3];
      const p0 = E.mix(a, b, 0.14), p1 = E.mix(a, b, 0.8);
      const mid = E.mix(p0, p1, 0.5), nx = -(b[1] - a[1]), ny = b[0] - a[0], L = Math.hypot(nx, ny);
      const c = [mid[0] + nx / L * r * 0.12, mid[1] + ny / L * r * 0.12];
      const pts = P.bez(p0, c, p1, 20);
      P.drawOn(ctx, pts, kk, { w, color: col, taper: 0.02, vary: 0.12, dry: false });
      if (kk >= 0.98) {
        const q = pts[pts.length - 1], pq = pts[pts.length - 4], ang = Math.atan2(q[1] - pq[1], q[0] - pq[0]), hs = r * 0.3;
        const tip = [q[0] + Math.cos(ang) * hs * 0.9, q[1] + Math.sin(ang) * hs * 0.9];
        const l = [q[0] + Math.cos(ang + Math.PI / 2) * hs * 0.6, q[1] + Math.sin(ang + Math.PI / 2) * hs * 0.6], rgt = [q[0] - Math.cos(ang + Math.PI / 2) * hs * 0.6, q[1] - Math.sin(ang + Math.PI / 2) * hs * 0.6];
        P.fillPts(ctx, [tip, l, rgt, tip], col, 1);
      }
    }
  };
  W7.leaf = (ctx, x, y, r, col = '#E8D8B8') => {
    const p = P.bez([x, y + r], [x - r * 1.1, y - r * 0.1], [x, y - r], 12).concat(P.bez([x, y - r], [x + r * 1.1, y - r * 0.1], [x, y + r], 12));
    P.fillPts(ctx, p, col, 0.95); stroke(ctx, p, { w: 2, closed: true, dry: false }); line(ctx, [x, y + r * 1.2], [x, y - r * 0.6], { w: 1.6, dry: false });
  };

  // ------------------------------------------------------------------ SIFIR ATIK KUTUSU (ayak noktası x,y; s=1 → ~190×250)
  W7.bin = (ctx, key, x, y, s = 1, o = {}) => {
    const B = W7.BINS[key]; const lid = o.lid ?? 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.save(); ctx.globalAlpha *= 0.14; ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(0, 4, 96, 10, 0, 0, 7); ctx.fill(); ctx.restore();
    const body = [[-84, -206], [84, -206], [70, -8], [-70, -8], [-84, -206]];
    P.fillPts(ctx, body, PAL.white, 1); wash(ctx, body, B.col, key === 'siyah' ? 0.95 : 0.8, 200 + key.length * 7, { bleed: 1.2, blooms: 1 });
    stroke(ctx, body, { w: 3.2, closed: true, seed: 210 + key.length });
    // tekerlekler
    [-54, 54].forEach(dx => { P.fillPts(ctx, circlePts(dx, -6, 12, 12, 16), PAL.ink, 0.9); });
    // ön panel (etiket plakası)
    const plate = W7.rr(-58, -150, 116, 76, 10);
    P.fillPts(ctx, plate, PAL.white, 0.9); stroke(ctx, plate, { w: 2, closed: true, dry: false, seed: 214 });
    if (key === 'kahve') W7.leaf(ctx, 0, -112, 26, '#B8D08A');
    else if (key === 'siyah') { stroke(ctx, circlePts(0, -112, 24, 24, 24), { w: 3, closed: true, dry: false }); line(ctx, [-16, -128], [16, -96], { w: 3, dry: false }); }
    else W7.recycle(ctx, 0, -110, 26, 1, { color: B.col === '#E2B737' ? '#A4801A' : B.col, w: 6 });
    // kapak
    ctx.save(); ctx.translate(90, -206); ctx.rotate(-lid * 1.1);
    const lp = W7.rr(-186, -22, 188, 24, 6); P.fillPts(ctx, lp, PAL.white, 1); wash(ctx, lp, B.col, key === 'siyah' ? 1 : 0.9, 220 + key.length, { bleed: 0.8, blooms: 0 }); stroke(ctx, lp, { w: 3, closed: true, seed: 224 });
    line(ctx, [-110, -22], [-76, -22], { w: 5, taper: 0.05 });
    ctx.restore();
    ctx.restore();
    if (o.label) W7.fit(ctx, o.label === true ? B.name : o.label, x, y + 44 * s + 8, 230 * s, o.size ?? 38, { alpha: o.labelA ?? 1 });
  };
  W7.pilBox = (ctx, x, y, s = 1) => { // atık pil toplama kutusu
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-70, -200], [70, -200], [70, 0], [-70, 0], [-70, -200]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#D9A43A', 0.75, 231, { bleed: 1 }); stroke(ctx, b, { w: 3.2, closed: true, seed: 232 });
    const slot = W7.rr(-40, -186, 80, 14, 5); P.fillPts(ctx, slot, PAL.ink, 0.9);
    const pl = W7.rr(-54, -150, 108, 110, 10); P.fillPts(ctx, pl, PAL.white, 0.92); stroke(ctx, pl, { w: 2, closed: true, dry: false });
    ctx.save(); ctx.translate(0, -112); ctx.rotate(-0.5); ctx.scale(0.62, 0.62); D.pil(ctx); ctx.restore();
    W7.fit(ctx, 'ATIK PİL', 0, -54, 96, 26);
    ctx.restore();
  };
  W7.oilBin = (ctx, x, y, s = 1) => { // atık yağ kumbarası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-66, -170], [66, -170], [72, 0], [-72, 0], [-66, -170]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#6F6A3A', 0.75, 241, { bleed: 1 }); stroke(ctx, b, { w: 3.2, closed: true, seed: 242 });
    const top = [[-50, -170], [-30, -206], [30, -206], [50, -170]]; P.fillPts(ctx, closeP(top), PAL.white); wash(ctx, closeP(top), '#6F6A3A', 0.6, 243); stroke(ctx, top, { w: 3, seed: 244 });
    P.fillPts(ctx, circlePts(0, -206, 22, 6, 20), PAL.ink, 0.9);
    const pl = W7.rr(-52, -146, 104, 110, 10); P.fillPts(ctx, pl, PAL.white, 0.92); stroke(ctx, pl, { w: 2, closed: true, dry: false });
    const drop = P.bez([0, -130], [-24, -98], [0, -84], 10).concat(P.bez([0, -84], [24, -98], [0, -130], 10)); P.fillPts(ctx, drop, '#C8962E', 0.9); stroke(ctx, drop, { w: 2, closed: true, dry: false });
    W7.fit(ctx, 'ATIK YAĞ', 0, -50, 92, 26);
    ctx.restore();
  };
  W7.textileBox = (ctx, x, y, s = 1) => { // tekstil (giysi) toplama kutusu
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-74, -230], [74, -230], [74, 0], [-74, 0], [-74, -230]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#6D86B0', 0.7, 251, { bleed: 1 }); stroke(ctx, b, { w: 3.2, closed: true, seed: 252 });
    const slot = W7.rr(-46, -206, 92, 30, 6); P.fillPts(ctx, slot, PAL.ink, 0.85);
    const pl = W7.rr(-56, -160, 112, 116, 10); P.fillPts(ctx, pl, PAL.white, 0.92); stroke(ctx, pl, { w: 2, closed: true, dry: false });
    // tişört simgesi
    const ts = [[-26, -142], [-10, -148], [10, -148], [26, -142], [36, -124], [24, -118], [22, -84], [-22, -84], [-24, -118], [-36, -124], [-26, -142]];
    P.fillPts(ctx, ts, '#6D86B0', 0.6); stroke(ctx, ts, { w: 2, closed: true, dry: false });
    W7.fit(ctx, 'TEKSTİL', 0, -54, 100, 26);
    ctx.restore();
  };

  // ------------------------------------------------------------------ ZEMİNLER
  W7.room = (ctx, t, o = {}) => { // mutfak: duvar, pencere, tezgâh
    const fy = o.floor ?? 820;
    ctx.save(); ctx.globalAlpha *= 0.14; ctx.fillStyle = '#C9A46A'; ctx.fillRect(-300, -300, E.W + 600, fy + 300); ctx.restore();
    // fayans bandı
    ctx.save(); ctx.globalAlpha *= 0.25; ctx.strokeStyle = PAL.water; ctx.lineWidth = 1.2;
    for (let yy = fy - 190; yy < fy - 20; yy += 56) { ctx.beginPath(); ctx.moveTo(-300, yy); ctx.lineTo(E.W + 300, yy); ctx.stroke(); }
    for (let xx = -300; xx < E.W + 300; xx += 56) { ctx.beginPath(); ctx.moveTo(xx, fy - 190); ctx.lineTo(xx, fy - 20); ctx.stroke(); }
    ctx.restore();
    // pencere
    if (o.window !== false) {
      const wx = o.wx ?? 1380, wy = 150, ww = 380, wh = 330;
      const fr = [[wx, wy], [wx + ww, wy + 3], [wx + ww - 2, wy + wh], [wx + 2, wy + wh - 2], [wx, wy]];
      P.fillPts(ctx, fr, '#EAF1F2', 1);
      const sky = [[wx + 8, wy + 8], [wx + ww - 8, wy + 10], [wx + ww - 10, wy + wh - 8], [wx + 10, wy + wh - 10], [wx + 8, wy + 8]];
      wash(ctx, sky, o.night ? '#2E4A6E' : PAL.water, o.night ? 0.55 : 0.22, 261, { bleed: 2, blooms: 1 });
      if (o.night) { P.moon(ctx, wx + ww * 0.7, wy + 90, 34); }
      stroke(ctx, fr, { w: 4, closed: true, seed: 262 });
      line(ctx, [wx + ww / 2, wy + 2], [wx + ww / 2, wy + wh - 2], { w: 3.4 }); line(ctx, [wx + 2, wy + wh / 2], [wx + ww - 2, wy + wh / 2], { w: 3.4 });
      line(ctx, [wx - 20, wy + wh + 6], [wx + ww + 20, wy + wh + 8], { w: 5, taper: 0.03 });
    }
    // tezgâh
    const top = [[-300, fy], [E.W + 300, fy + 4], [E.W + 300, E.H + 300], [-300, E.H + 300]];
    P.fillPts(ctx, closeP(top), '#E8D6B4', 1); wash(ctx, closeP(top), '#8A6A45', 0.35, 263, { bleed: 2, blooms: 2 });
    stroke(ctx, [[-300, fy], [E.W + 300, fy + 4]], { w: 4, taper: 0.02, seed: 264 });
    ctx.save(); ctx.globalAlpha *= 0.3; for (let i = 0; i < 5; i++) line(ctx, [-300, fy + 40 + i * 50], [E.W + 300, fy + 44 + i * 50], { w: 1.3, dry: false, seed: 265 + i, color: '#6B4A2A' }); ctx.restore();
  };
  W7.kitchenCan = (ctx, x, y, s = 1, lid = 0) => { // mutfak çöp kovası
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-70, -190], [70, -190], [60, 0], [-60, 0], [-70, -190]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, '#9A9387', 0.5, 271, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 272 });
    ctx.save(); ctx.translate(74, -192); ctx.rotate(-lid * 1.3);
    const l = W7.rr(-150, -18, 152, 20, 8); P.fillPts(ctx, l, PAL.white); wash(ctx, l, '#9A9387', 0.6, 273); stroke(ctx, l, { w: 3, closed: true, seed: 274 });
    ctx.restore();
    ctx.restore();
  };
  // eldiven (DAMLA.draw hold içinde el noktasına)
  W7.glove = (ctx, hand, side = 1) => {
    const [x, y] = hand; const p = circlePts(x, y, 11, 9, 20, 0.3 * side);
    P.fillPts(ctx, p, '#E2B737', 1); stroke(ctx, p, { w: 2.2, closed: true, dry: false });
    line(ctx, [x + side * 6, y - 6], [x + side * 13, y - 13], { w: 5, color: '#C99A22', dry: false });
  };
  // ağaç (kaynak) — ayak noktası
  W7.tree = (ctx, x, y, s = 1, seed = 1, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [0, 0], [3, -110], { w: 9, seed: 280 + seed, taper: 0.1, color: '#5A4028' });
    const crown = wobble(circlePts(3 + Math.sin(t * 0.9 + seed) * 2, -160, 64, 58, 44), 6, 281 + seed);
    P.fillPts(ctx, crown, PAL.paper, 1); wash(ctx, crown, PAL.life, 0.55, 282 + seed, { bleed: 3 }); stroke(ctx, crown, { w: 3, closed: true, seed: 283 + seed });
    ctx.restore();
  };
  W7.stump = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-22, 0], [-18, -34], [18, -36], [22, 0]]; P.fillPts(ctx, closeP(b), '#C9A46A'); wash(ctx, closeP(b), '#8A6A45', 0.5, 291); stroke(ctx, b, { w: 3, seed: 292 });
    const top = circlePts(0, -35, 18, 6, 20); P.fillPts(ctx, top, '#E8D6B4'); stroke(ctx, top, { w: 2.4, closed: true, dry: false }); stroke(ctx, circlePts(0, -35, 8, 3, 14), { w: 1.2, closed: true, dry: false });
    ctx.restore();
  };
  // fabrika (tesis)
  W7.factory = (ctx, x, y, s = 1, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-120, 0], [-120, -90], [-70, -130], [-70, -90], [-20, -130], [-20, -90], [30, -130], [30, -90], [120, -90], [120, 0], [-120, 0]];
    P.fillPts(ctx, b, PAL.white); wash(ctx, b, o.col ?? '#9A9387', 0.45, 301, { bleed: 1.5 }); stroke(ctx, b, { w: 3, closed: true, seed: 302 });
    const ch = [[70, -90], [70, -190], [96, -190], [96, -90]]; P.fillPts(ctx, closeP(ch), PAL.white); wash(ctx, closeP(ch), o.col ?? '#9A9387', 0.5, 303); stroke(ctx, ch, { w: 3, seed: 304 });
    for (let i = 0; i < 3; i++) { const wn = W7.rr(-100 + i * 60, -60, 34, 30, 3); P.fillPts(ctx, wn, PAL.light, 0.45); stroke(ctx, wn, { w: 2, closed: true, dry: false }); }
    const door = [[70, 0], [70, -50], [104, -50], [104, 0]]; stroke(ctx, door, { w: 2.4, seed: 305 });
    if (o.smoke !== false) for (let i = 0; i < 3; i++) { const c = ((t * 0.3 + i / 3) % 1); ctx.save(); ctx.globalAlpha *= (1 - c) * 0.5; stroke(ctx, circlePts(83 + c * 40, -210 - c * 90, 14 + c * 20, 10 + c * 14, 20), { w: 2, closed: true, dry: false, seed: 306 + i }); ctx.restore(); }
    ctx.restore();
  };

  G.W7 = W7;
})(window);

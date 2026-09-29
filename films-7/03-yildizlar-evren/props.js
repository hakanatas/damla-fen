// props.js — 7. sınıf Ünite 1 (Uzay Çağı) filmlerine özel çizim yardımcıları (window.U7)
// Aynı dosya 01-uzay-teknolojileri, 02-uzay-kirliligi ve 03-yildizlar-evren klasörlerinde kopyadır.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, wobble, hatch, inkDot } = G.INK;
  const F = {};
  F.GRADE = 7;
  F.RED = '#A23A2A';
  F.AMBER_D = '#8A4A10';
  F.NIGHT = '#1E2440';

  // ---------- gece gökyüzü ----------
  F.night = (ctx, k) => {
    if (k <= 0) return;
    const g = ctx.createLinearGradient(0, 0, 0, E.H);
    g.addColorStop(0, `rgba(24,30,60,${0.78 * k})`); g.addColorStop(0.65, `rgba(40,52,92,${0.62 * k})`); g.addColorStop(1, `rgba(60,70,110,${0.42 * k})`);
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(-400, -400, E.W + 800, E.H + 800); ctx.restore();
  };
  F.stars = (ctx, t, k, o = {}) => {
    if (k <= 0) return; const R = rng(o.seed ?? 21); const n = o.n ?? 40;
    const [x0, y0, x1, y1] = o.area ?? [0, 0, E.W, 760];
    ctx.save();
    for (let i = 0; i < n; i++) {
      const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), s = 3 + R() * 6, tw = 0.55 + 0.45 * Math.sin(t * (1.5 + R() * 3) + i);
      if (o.avoid && o.avoid.some(([ax, ay, ar]) => Math.hypot(x - ax, y - ay) < ar)) continue;
      ctx.globalAlpha = k * tw * 0.9; ctx.fillStyle = o.color ?? '#FBF3DC'; ctx.beginPath(); ctx.arc(x, y, s * 0.28, 0, 7); ctx.fill();
      if (s > 6.5) { ctx.strokeStyle = o.color ?? '#FBF3DC'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke(); }
    }
    ctx.restore();
  };
  // parlayan yıldız (renk: yüzey sıcaklığı ipucu)
  F.star = (ctx, x, y, r, col = '#FFF1C8', t = 0, o = {}) => {
    const A0 = ctx.globalAlpha; ctx.save();
    const tw = 1 + 0.06 * Math.sin(t * 3 + x * 0.01);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2 * tw);
    g.addColorStop(0, col); g.addColorStop(0.25, col + 'AA'); g.addColorStop(1, col + '00');
    ctx.globalAlpha = A0 * (o.glow ?? 0.9); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3.2 * tw, 0, 7); ctx.fill();
    ctx.globalAlpha = A0; ctx.fillStyle = o.core ?? '#FFFDF4'; ctx.beginPath(); ctx.arc(x, y, r * 0.55, 0, 7); ctx.fill();
    if (o.spikes !== false) { ctx.strokeStyle = col; ctx.globalAlpha = A0 * 0.7; ctx.lineWidth = Math.max(1, r * 0.08); ctx.beginPath();
      ctx.moveTo(x - r * 2.2, y); ctx.lineTo(x + r * 2.2, y); ctx.moveTo(x, y - r * 2.2); ctx.lineTo(x, y + r * 2.2); ctx.stroke(); }
    ctx.restore();
  };
  // bulutsu: gaz ve toz bulutu
  F.nebula = (ctx, x, y, r, cols, seed = 1, k = 1) => {
    if (k <= 0) return; const R = rng(seed); const A0 = ctx.globalAlpha; ctx.save();
    for (let i = 0; i < 9; i++) {
      const a = R() * 6.28, d = R() * r * 0.55, rr = r * (0.35 + R() * 0.4), c = cols[i % cols.length];
      const cx = x + Math.cos(a) * d, cy = y + Math.sin(a) * d * 0.7;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr); g.addColorStop(0, c + '88'); g.addColorStop(1, c + '00');
      ctx.globalAlpha = A0 * k * 0.85; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = A0 * k; ctx.fillStyle = '#FFF6E0';
    for (let i = 0; i < 26; i++) { const a = R() * 6.28, d = R() * r * 0.8; ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7, 0.8 + R() * 1.6, 0, 7); ctx.fill(); }
    ctx.restore();
  };
  // galaksi (türü adlandırılmaz; yalnızca yıldız topluluğu olarak çizilir)
  F.galaxy = (ctx, x, y, r, t = 0, o = {}) => {
    const R = rng(o.seed ?? 5); const A0 = ctx.globalAlpha; const tilt = o.tilt ?? 0.42, rot = (o.rot ?? 0) + t * (o.spin ?? 0.02);
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.ang ?? -0.35); ctx.scale(1, tilt);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r); g.addColorStop(0, 'rgba(255,236,190,0.95)'); g.addColorStop(0.18, 'rgba(240,210,160,0.55)'); g.addColorStop(0.6, 'rgba(170,180,220,0.18)'); g.addColorStop(1, 'rgba(170,180,220,0)');
    ctx.globalAlpha = A0; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
    const n = o.n ?? 520;
    for (let i = 0; i < n; i++) {
      const arm = i % 2, u = R(), d = r * (0.08 + 0.9 * Math.pow(u, 0.8));
      const a = arm * Math.PI + d / r * 4.2 + rot + (R() - 0.5) * 0.55;
      const s = 0.6 + R() * 1.8;
      ctx.globalAlpha = A0 * (0.35 + R() * 0.6); ctx.fillStyle = R() < 0.25 ? '#C9D6FF' : '#FFF4DC';
      ctx.beginPath(); ctx.arc(Math.cos(a) * d, Math.sin(a) * d, s * (r / 260), 0, 7); ctx.fill();
    }
    ctx.restore();
  };

  // ---------- uzay teknolojileri (elle çizilmiş defter stili) ----------
  // roket: (x,y) taban; yukarı bakar. o.flame 0..1
  F.rocket = (ctx, x, y, s, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s);
    if (o.flame > 0) {
      const fl = (o.flame) * (1 + 0.12 * Math.sin(t * 40));
      const f = [[-22, 0], [0, 110 * fl], [22, 0]]; P.fillPts(ctx, f, PAL.light, 0.9);
      P.fillPts(ctx, [[-11, 0], [0, 60 * fl], [11, 0]], '#FFF1C8', 0.95);
    }
    const body = [[-26, 0], [-26, -190], [-20, -222], [0, -262], [20, -222], [26, -190], [26, 0], [-26, 0]];
    P.fillPts(ctx, body, PAL.white, 1); wash(ctx, body, '#9A9387', 0.18, 701, { bleed: 1, blooms: 0 });
    stroke(ctx, body, { w: 3, closed: true, seed: 702 });
    [[-26, -60, -58, 4], [26, -60, 58, 4]].forEach(([a, b, c, d], i) => { const fin = [[a, b], [c, d], [a, d - 4]]; P.fillPts(ctx, fin, PAL.water, 0.75); stroke(ctx, fin.concat([fin[0]]), { w: 2.6, closed: true, seed: 703 + i }); });
    line(ctx, [-26, -150], [26, -150], { w: 2, alpha: 0.7, seed: 705 }); line(ctx, [-26, -40], [26, -40], { w: 2, alpha: 0.7, seed: 706 });
    stroke(ctx, circlePts(0, -190, 10, 10, 20), { w: 2.4, closed: true, seed: 707 });
    ctx.restore();
  };
  // yapay uydu: gövde + iki güneş paneli + çanak anten
  F.satellite = (ctx, x, y, s, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0); ctx.scale(s, s);
    const pn = (sx) => { const p = [[sx * 44, -22], [sx * 150, -22], [sx * 150, 22], [sx * 44, 22], [sx * 44, -22]];
      P.fillPts(ctx, p, PAL.water, 0.55); stroke(ctx, p, { w: 2.4, closed: true, seed: 720 + sx });
      for (let i = 1; i < 4; i++) line(ctx, [sx * (44 + i * 26.5), -22], [sx * (44 + i * 26.5), 22], { w: 1.2, alpha: 0.7, dry: false, seed: 722 + i });
      line(ctx, [sx * 30, 0], [sx * 44, 0], { w: 3, seed: 726 }); };
    if (o.panels !== false) { pn(-1); pn(1); }
    const b = [[-30, -34], [30, -34], [30, 34], [-30, 34], [-30, -34]];
    P.fillPts(ctx, b, '#E9C98A', 1); wash(ctx, b, PAL.light, 0.35, 727, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 728 });
    hatch(ctx, -24, -20, 48, 40, { n: 4, ang: -0.8, w: 1, alpha: 0.35, seed: 729 });
    if (o.dish !== false) { line(ctx, [0, -34], [0, -52], { w: 2.6 }); const d = P.arc(0, -64, 26, 0.15, Math.PI - 0.15, 16, 14); stroke(ctx, d, { w: 2.8, seed: 730 }); line(ctx, [-24, -60], [24, -60], { w: 2, seed: 731 }); inkDot(ctx, 0, -76, 3); }
    if (o.cam) { P.fillPts(ctx, circlePts(0, 44, 12, 8, 16), PAL.ink, 0.85); line(ctx, [0, 34], [0, 38], { w: 3 }); }
    ctx.restore();
  };
  // uzay istasyonu: kiriş + modüller + büyük paneller
  F.station = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    line(ctx, [-190, 0], [190, 0], { w: 6, seed: 740, taper: 0 });
    [-170, -110, 110, 170].forEach((px, i) => [-1, 1].forEach(sy => { const p = [[px - 24, sy * 14], [px + 24, sy * 14], [px + 24, sy * 110], [px - 24, sy * 110], [px - 24, sy * 14]]; P.fillPts(ctx, p, PAL.water, 0.5); stroke(ctx, p, { w: 2, closed: true, seed: 741 + i * 2 + sy }); line(ctx, [px, sy * 14], [px, sy * 110], { w: 1, alpha: 0.6, dry: false }); }));
    [[-60, 30, 90, 36], [0, 60, 44, 30], [0, -52, 36, 28]].forEach(([mx, my, w, h], i) => { const m = [[mx - w / 2, my - h / 2], [mx + w / 2, my - h / 2], [mx + w / 2, my + h / 2], [mx - w / 2, my + h / 2], [mx - w / 2, my - h / 2]]; P.fillPts(ctx, m, PAL.white, 1); wash(ctx, m, '#9A9387', 0.25, 750 + i, { bleed: 1, blooms: 0 }); stroke(ctx, m, { w: 2.6, closed: true, seed: 752 + i }); });
    const core = [[-50, -14], [60, -14], [60, 14], [-50, 14], [-50, -14]]; P.fillPts(ctx, core, PAL.white, 1); stroke(ctx, core, { w: 3, closed: true, seed: 755 });
    ctx.restore();
  };
  // uzay mekiği (yan görünüş)
  F.shuttle = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-150, -10], [70, -22], [130, -14], [160, 0], [130, 14], [70, 20], [-150, 18], [-150, -10]];
    P.fillPts(ctx, b, PAL.white, 1); stroke(ctx, b, { w: 3, closed: true, seed: 760 });
    const wing = [[-120, 18], [40, 20], [-100, 62], [-140, 62], [-120, 18]]; P.fillPts(ctx, wing, '#CFC6B4', 1); stroke(ctx, wing, { w: 2.6, closed: true, seed: 761 });
    const tail = [[-140, -10], [-110, -10], [-150, -74], [-160, -74], [-140, -10]]; P.fillPts(ctx, tail, PAL.white, 1); stroke(ctx, tail, { w: 2.6, closed: true, seed: 762 });
    P.fillPts(ctx, [[100, -12], [128, -8], [118, -2], [96, -4]], PAL.ink, 0.8);
    P.fillPts(ctx, [[160, 0], [130, 14], [70, 20], [70, 8], [140, 4]], PAL.ink, 0.75);
    ctx.restore();
  };
  // gezici araç (Ay/Mars yüzeyi)
  F.rover = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-80, -70], [80, -70], [86, -34], [-86, -34], [-80, -70]]; P.fillPts(ctx, b, PAL.white, 1); wash(ctx, b, PAL.light, 0.25, 770, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 771 });
    const pn = [[-90, -82], [70, -82], [74, -72], [-94, -72], [-90, -82]]; P.fillPts(ctx, pn, PAL.water, 0.6); stroke(ctx, pn, { w: 2.2, closed: true, seed: 772 });
    line(ctx, [50, -82], [54, -150], { w: 4, seed: 773 }); const hd = [[36, -168], [76, -168], [76, -146], [36, -146], [36, -168]]; P.fillPts(ctx, hd, PAL.white, 1); stroke(ctx, hd, { w: 2.6, closed: true, seed: 774 });
    P.fillPts(ctx, circlePts(46, -157, 5, 5, 10), PAL.ink); P.fillPts(ctx, circlePts(64, -157, 5, 5, 10), PAL.ink);
    [-70, 0, 70].forEach((wx, i) => { line(ctx, [wx, -34], [wx, -18], { w: 3 }); const w = circlePts(wx, -2, 18, 18, 22); P.fillPts(ctx, w, '#6E6558', 1); stroke(ctx, w, { w: 2.6, closed: true, seed: 775 + i }); line(ctx, [wx - 12, -2], [wx + 12, -2], { w: 1.4, alpha: 0.6, dry: false }); });
    ctx.restore();
  };
  // uzay teleskobu (Hubble benzeri silindir)
  F.hubble = (ctx, x, y, s, t = 0, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.25); ctx.scale(s, s);
    [-1, 1].forEach(sy => { const p = [[-60, sy * 46], [60, sy * 46], [60, sy * 100], [-60, sy * 100], [-60, sy * 46]]; P.fillPts(ctx, p, PAL.water, 0.5); stroke(ctx, p, { w: 2.2, closed: true, seed: 780 + sy }); line(ctx, [0, sy * 40], [0, sy * 46], { w: 3 }); });
    const b = [[-120, -40], [110, -40], [110, 40], [-120, 40], [-120, -40]]; P.fillPts(ctx, b, '#DCDCD6', 1); wash(ctx, b, '#9A9387', 0.28, 783, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 784 });
    const back = [[-160, -34], [-120, -34], [-120, 34], [-160, 34], [-160, -34]]; P.fillPts(ctx, back, '#E9C98A', 1); stroke(ctx, back, { w: 2.6, closed: true, seed: 785 });
    stroke(ctx, [[110, -40], [150, -58], [152, -46]], { w: 2.6, seed: 786 }); // açık kapak
    P.fillPts(ctx, [[104, -34], [112, -34], [112, 34], [104, 34]], PAL.ink, 0.7);
    ctx.restore();
  };
  // James Webb benzeri: altıgen parçalı altın ayna + katmanlı güneş kalkanı
  F.webb = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let i = 0; i < 4; i++) { const d = i * 8; const sh = [[-170 + d, 70 - d * 0.3], [0, 30 - d], [170 - d, 70 - d * 0.3], [0, 118 - d], [-170 + d, 70 - d * 0.3]]; P.fillPts(ctx, sh, i % 2 ? '#C9B8D6' : '#D8CBE0', 0.9); stroke(ctx, sh, { w: 1.8, closed: true, seed: 790 + i, alpha: 0.8 }); }
    const hx = (cx, cy, r) => { const p = []; for (let i = 0; i <= 6; i++) { const a = i / 6 * 6.283 + Math.PI / 6; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } return p; };
    const r = 20, dx = r * 1.732, dy = r * 1.5;
    const cells = [];
    for (let row = -2; row <= 2; row++) { const n = 5 - Math.abs(row); for (let c = 0; c < n; c++) { const cx = (c - (n - 1) / 2) * dx, cy = -40 + row * dy; if (row === 0 && c === 2) continue; cells.push([cx, cy]); } }
    cells.forEach(([cx, cy], i) => { const h = hx(cx, cy, r - 1.5); P.fillPts(ctx, h, '#E3B64A', 1); wash(ctx, h, PAL.light, 0.4, 800 + i, { bleed: 0.5, blooms: 0 }); stroke(ctx, h, { w: 1.6, closed: true, dry: false, seed: 820 + i }); });
    line(ctx, [-60, -110], [0, -40], { w: 2, seed: 850, alpha: 0.8 }); line(ctx, [60, -110], [0, -40], { w: 2, seed: 851, alpha: 0.8 }); line(ctx, [0, -130], [0, -110], { w: 2 });
    stroke(ctx, [[-60, -110], [60, -110]], { w: 2, seed: 852 });
    ctx.restore();
  };
  // görevi bitmiş parça / uzay çöpü (köşeli kırık parça)
  F.shard = (ctx, x, y, r, seed = 1, o = {}) => {
    const R = rng(seed); const n = 5 + (seed % 3); const pts = [];
    const rot = (o.rot ?? 0) + R() * 6.28;
    for (let i = 0; i < n; i++) { const a = rot + i / n * 6.283 + (R() - 0.5) * 0.6; const q = r * (0.55 + R() * 0.6); pts.push([x + Math.cos(a) * q, y + Math.sin(a) * q]); }
    pts.push(pts[0]);
    P.fillPts(ctx, pts, o.fill ?? ['#B7AE9E', '#8FA7B3', '#D8BE86', '#A39C90'][seed % 4], o.a ?? 0.95);
    stroke(ctx, pts, { w: Math.max(1, r * 0.12), closed: true, dry: false, seed, color: o.color });
  };

  // ---------- kart, yazı yardımcıları ----------
  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y + 3], [x + w - 2, y + h], [x + 3, y + h - 2], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.28)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC', o.a ?? 0.97); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed: o.seed ?? 7, color: o.color });
  };
  F.fitFont = (ctx, txt, maxW, size, weight = 700, font = 'Kalam') => {
    let s = size; ctx.font = `${weight} ${s}px ${font}`;
    while (ctx.measureText(txt).width > maxW && s > 20) { s -= 2; ctx.font = `${weight} ${s}px ${font}`; }
    return s;
  };
  // kutucuk + tik / çarpı
  F.tick = (ctx, x, y, k, yes) => { if (k <= 0) return; if (yes) P.check(ctx, x, y, 40, k, { w: 5, color: '#4E6B22' }); else P.cross(ctx, x, y, 14, k, { w: 4, color: '#6E6558' }); };

  F.title = (ctx, t, t1, num, name, unit = 1) => {
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · ' + F.GRADE + '. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, se, num, name, code) => {
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H);
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, num + ' · ' + name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · ' + F.GRADE + '. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // gözlem defteri kaydı (satır listesi)
  F.record = (ctx, t, sr, head, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 750);
    P.write(ctx, head, 290, 250, E.seg(t, sr + 0.3, sr + 1.5), { size: 58 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 272], [700, 284], [1180, 268], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    let y = 345; const step = o.step ?? 1.4, size = o.size ?? 40;
    items.forEach((a, i) => {
      const at = sr + 1.8 + i * step;
      const box = [[300, y - 38], [340, y - 40], [342, y + 2], [302, y + 4], [300, y - 38]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 320, y - 18, 36, E.se(t, at + 0.9, at + 1.3), { w: 5 });
      const fs = F.fitFont(ctx, a, 1330, size, 700);
      P.write(ctx, a, 370, y, E.seg(t, at, at + 1.2), { size: fs });
      y += o.gap ?? 78;
    });
    DAMLA.draw(ctx, { x: 1720, y: 1060, s: 1.0, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
  };
  G.U7 = F;
})(window);

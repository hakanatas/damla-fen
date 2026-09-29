// props.js — 6. sınıf Film 2'ye özel çizim yardımcıları (window.G62)
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, wobble, arrowHead, dashed } = G.INK;
  const F = {};

  // Gezegen verileri: çap (Dünya = 1), renk, karasal/gazsal, halka, uydu (yalnızca var/yok; sayı verilmez)
  F.PLANETS = [
    { n: 'Merkür', d: 0.38, c: '#9A9387', gas: false, ring: false, moon: false },
    { n: 'Venüs', d: 0.95, c: '#D9B26A', gas: false, ring: false, moon: false },
    { n: 'Dünya', d: 1.0, c: PAL.water, gas: false, ring: false, moon: true },
    { n: 'Mars', d: 0.53, c: '#B8683F', gas: false, ring: false, moon: true },
    { n: 'Jüpiter', d: 11.2, c: '#C49A6C', gas: true, ring: true, moon: true },
    { n: 'Satürn', d: 9.45, c: '#DDBF7A', gas: true, ring: true, moon: true },
    { n: 'Uranüs', d: 4.0, c: '#8FC1C4', gas: true, ring: true, moon: true },
    { n: 'Neptün', d: 3.88, c: '#3C5FA0', gas: true, ring: true, moon: true }
  ];

  F.night = (ctx, k) => {
    if (k <= 0) return;
    const g = ctx.createLinearGradient(0, 0, 0, E.H);
    g.addColorStop(0, `rgba(24,30,60,${0.72 * k})`); g.addColorStop(0.65, `rgba(40,52,92,${0.55 * k})`); g.addColorStop(1, `rgba(60,70,110,${0.35 * k})`);
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(-300, -300, E.W + 600, E.H + 600); ctx.restore();
  };
  F.stars = (ctx, t, k, o = {}) => {
    if (k <= 0) return; const R = rng(o.seed ?? 21); const n = o.n ?? 40;
    const [x0, y0, x1, y1] = o.area ?? [0, 0, E.W, 760];
    ctx.save();
    for (let i = 0; i < n; i++) {
      const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), s = 3 + R() * 6, tw = 0.55 + 0.45 * Math.sin(t * (1.5 + R() * 3) + i);
      if (o.avoid && o.avoid.some(([ax, ay, ar]) => Math.hypot(x - ax, y - ay) < ar)) continue;
      ctx.globalAlpha = k * tw * 0.9; ctx.fillStyle = '#FBF3DC'; ctx.beginPath(); ctx.arc(x, y, s * 0.28, 0, 7); ctx.fill();
      if (s > 6) { ctx.strokeStyle = '#FBF3DC'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke(); }
    }
    ctx.restore();
  };

  // Halka (arka yarı / ön yarı ayrı çizilir ki gezegenin önünden geçsin)
  function ring(ctx, x, y, r, half, o) {
    const rx = r * (o.bold ? 2.1 : 1.75), ry = rx * (o.tiltY ?? 0.26), rot = o.rot ?? -0.22;
    const a0 = half === 'back' ? Math.PI : 0, a1 = a0 + Math.PI;
    const pts = []; for (let i = 0; i <= 40; i++) { const a = a0 + (a1 - a0) * i / 40; const px = Math.cos(a) * rx, py = Math.sin(a) * ry; pts.push([x + px * Math.cos(rot) - py * Math.sin(rot), y + px * Math.sin(rot) + py * Math.cos(rot)]); }
    stroke(ctx, pts, { w: Math.max(1.2, r * (o.bold ? 0.12 : 0.03)), color: o.bold ? '#B89456' : '#7E7466', alpha: o.bold ? 0.85 : 0.6, dry: false, taper: 0.05, seed: 77 });
    if (o.bold) stroke(ctx, pts.map(p => [x + (p[0] - x) * 0.82, y + (p[1] - y) * 0.82]), { w: Math.max(1, r * 0.05), color: '#8A6A45', alpha: 0.6, dry: false, taper: 0.05, seed: 78 });
  }

  // Tek gezegen çizimi (idx: F.PLANETS sırası)
  F.planet = (ctx, idx, x, y, r, o = {}) => {
    const p = F.PLANETS[idx];
    const ringOn = o.rings !== false && p.ring;
    const ro = { bold: idx === 5, rot: idx === 6 ? -1.35 : -0.22, tiltY: idx === 6 ? 0.2 : 0.26 };
    if (ringOn) ring(ctx, x, y, r, 'back', ro);
    if (idx === 2) P.earth(ctx, x, y, r);
    else if (r < 6) { ctx.save(); ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(0.8, r * 0.3); ctx.stroke(); ctx.restore(); }
    else {
      const disk = circlePts(x, y, r, r, Math.max(28, Math.min(90, r | 0)));
      P.fillPts(ctx, disk, PAL.white, 1);
      wash(ctx, disk, p.c, 0.8, 300 + idx, { bleed: Math.max(0.6, r * 0.02), blooms: r > 30 ? 2 : 0 });
      if (idx === 4 || idx === 5) { // bantlar
        ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
        const bands = idx === 4 ? [-0.55, -0.3, 0.05, 0.3, 0.55] : [-0.4, -0.1, 0.25, 0.5];
        bands.forEach((b, i) => { ctx.globalAlpha = 0.45; ctx.fillStyle = i % 2 ? '#8A6A45' : '#B07A4A'; ctx.beginPath(); ctx.ellipse(x, y + b * r, r * 1.05, r * 0.07, 0, 0, 7); ctx.fill(); });
        if (idx === 4 && r > 20) { ctx.globalAlpha = 0.7; ctx.fillStyle = '#A5553A'; ctx.beginPath(); ctx.ellipse(x + r * 0.3, y + r * 0.38, r * 0.16, r * 0.09, 0, 0, 7); ctx.fill(); }
        ctx.restore();
      }
      if (idx === 0 && r > 10) for (let i = 0; i < 4; i++) stroke(ctx, circlePts(x + [-0.3, 0.3, 0.1, -0.1][i] * r, y + [-0.2, 0.1, -0.45, 0.4][i] * r, r * 0.13, r * 0.11, 12), { w: 1, closed: true, alpha: 0.5, dry: false });
      if (idx === 3 && r > 10) { ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = PAL.white; ctx.beginPath(); ctx.ellipse(x, y - r * 0.86, r * 0.35, r * 0.12, 0, 0, 7); ctx.fill(); ctx.restore(); }
      // gölge tarafı (Güneş solda)
      ctx.save(); const sg = ctx.createLinearGradient(x - r, y, x + r, y); sg.addColorStop(0.45, 'rgba(28,27,34,0)'); sg.addColorStop(1, 'rgba(28,27,34,0.28)');
      ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
      stroke(ctx, wobble(disk, Math.max(0.4, r * 0.01), 330 + idx), { w: Math.max(1.4, r * 0.035), closed: true, seed: 340 + idx });
    }
    if (ringOn) ring(ctx, x, y, r, 'front', ro);
  };

  // Asteroit kuşağı: (cx,cy) merkezli elips yay üzerinde taşlar
  F.belt = (ctx, cx, cy, rx, ry, k, o = {}) => {
    if (k <= 0) return; const R = rng(o.seed ?? 55); const n = o.n ?? 160;
    ctx.save(); ctx.fillStyle = o.color ?? '#6E6558';
    for (let i = 0; i < n * k; i++) {
      const a = (o.a0 ?? 0) + R() * ((o.a1 ?? 6.283) - (o.a0 ?? 0)), d = 1 + (R() - 0.5) * (o.spread ?? 0.1), s = (o.size ?? 2.2) * (0.5 + R());
      ctx.globalAlpha = 0.55 + R() * 0.4;
      ctx.beginPath(); ctx.ellipse(cx + Math.cos(a) * rx * d, cy + Math.sin(a) * ry * d, s * 1.2, s, R() * 3, 0, 7); ctx.fill();
    }
    ctx.restore();
  };

  // taş (gök taşı) — düzensiz kaya
  F.rock = (ctx, x, y, r, seed = 1, o = {}) => {
    const R = rng(seed); const pts = [];
    for (let i = 0; i <= 12; i++) { const a = i / 12 * 6.283; const q = r * (0.75 + R() * 0.4); pts.push([x + Math.cos(a) * q, y + Math.sin(a) * q * 0.85]); }
    pts[12] = pts[0];
    P.fillPts(ctx, pts, o.fill ?? '#8C8272', 0.95); stroke(ctx, pts, { w: Math.max(1.2, r * 0.1), closed: true, dry: false, seed });
  };

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
  F.dash = (ctx, x, y, s, k) => { if (k <= 0) return; P.drawOn(ctx, [[x - s * 0.4, y], [x + s * 0.4, y]], k, { w: 4, alpha: 0.55 }); };

  F.title = (ctx, t, t1, num, name, unit = 1) => {
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, se, num, name, code) => {
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, num + ' · ' + name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  G.G62 = F;
})(window);

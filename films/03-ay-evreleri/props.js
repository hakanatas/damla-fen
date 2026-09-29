// props.js — Film 3'ye özel çizim yardımcıları (window.F03)
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, arrowHead, wobble } = G.INK;
  const F = {};
  F.NIGHT = 'rgba(30,38,72,';
  // gece gökyüzü: kâğıdın üstüne lacivert mürekkep yıkaması (k: 0..1)
  F.night = (ctx, k, o = {}) => {
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
      const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0), s = 3 + R() * 6, tw = 0.6 + 0.4 * Math.sin(t * (1 + R() * 2) + i);
      if (o.avoid && o.avoid.some(([ax, ay, ar]) => Math.hypot(x - ax, y - ay) < ar)) continue;
      ctx.globalAlpha = k * tw * 0.9;
      ctx.fillStyle = '#FBF3DC'; ctx.beginPath(); ctx.arc(x, y, s * 0.28, 0, 7); ctx.fill();
      if (s > 6) { ctx.strokeStyle = '#FBF3DC'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y); ctx.moveTo(x, y - s); ctx.lineTo(x, y + s); ctx.stroke(); }
    }
    ctx.restore();
  };
  // parlayan dolunay (gece için hâle)
  F.glowMoon = (ctx, x, y, r, a = 1) => {
    const g = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.6);
    g.addColorStop(0, `rgba(251,246,226,${0.45 * a})`); g.addColorStop(1, 'rgba(251,246,226,0)');
    ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.6, 0, 7); ctx.fill(); ctx.restore();
    P.moon(ctx, x, y, r);
  };
  // yakın plan Ay: daha çok krater + koyu düzlükler (maria)
  F.bigMoon = (ctx, x, y, r, t) => {
    const disk = circlePts(x, y, r, r, 90);
    P.fillPts(ctx, disk, PAL.white, 1);
    wash(ctx, disk, '#9A9387', 0.4, 1201, { bleed: r * 0.012, blooms: 3 });
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
    [[-0.3, -0.35, 0.34, 0.22], [0.2, -0.1, 0.28, 0.2], [-0.05, 0.3, 0.3, 0.14]].forEach(([dx, dy, w, h], i) => {
      const m = wobble(circlePts(x + dx * r, y + dy * r, w * r, h * r, 40), r * 0.03, 60 + i);
      wash(ctx, m, '#6F6A63', 0.45, 70 + i, { bleed: r * 0.01, blooms: 1 });
    });
    const R = rng(9);
    for (let i = 0; i < 26; i++) {
      const a = R() * 6.283, d = Math.sqrt(R()) * r * 0.9, s = r * (0.025 + R() * 0.07);
      const cx = x + Math.cos(a) * d, cy = y + Math.sin(a) * d, fs = Math.sqrt(Math.max(0.2, 1 - (d / r) ** 2));
      const c = circlePts(cx, cy, s * fs, s, 20, a);
      ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = '#5E5850'; ctx.beginPath(); ctx.arc(cx + s * 0.2, cy + s * 0.2, s * 0.85, 0, 7); ctx.fill(); ctx.restore();
      stroke(ctx, c, { w: Math.max(1, r * 0.007), closed: true, alpha: 0.7, dry: false, seed: 80 + i });
    }
    ctx.restore();
    stroke(ctx, wobble(disk, r * 0.006, 1220), { w: Math.max(2, r * 0.012), closed: true, seed: 1221 });
  };
  // üstten görünüm: Güneş'in olduğu yön (sunAng) aydınlık, öbür yarı karanlık
  F.halfLit = (ctx, x, y, r, sunAng, o = {}) => {
    P.moon(ctx, x, y, r);
    const a0 = sunAng + Math.PI / 2, pts = P.arc(x, y, r * 1.01, a0, a0 + Math.PI, 30);
    P.fillPts(ctx, pts, o.dark ?? '#262A40', o.alpha ?? 0.72);
  };
  // Dünya'dan görünen evre: e = 0 yeni ay, π dolunay; 0..π büyüyen (sağ taraf aydınlık, Kuzey Yarım Küre)
  F.phaseMoon = (ctx, x, y, r, e, o = {}) => {
    if (o.litOnly) { // gökyüzü için: yalnızca aydınlık kısım + çok soluk "Dünya ışığı"
      ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? 0);
      P.fillPts(ctx, circlePts(0, 0, r, r, 40), o.dark ?? '#262A40', 0.35);
      const ee = ((e % 6.2832) + 6.2832) % 6.2832, c = Math.cos(ee), wax = ee <= Math.PI, lp = [];
      for (let i = 0; i <= 30; i++) { const a = -Math.PI / 2 + i / 30 * Math.PI; lp.push([(wax ? 1 : -1) * Math.cos(a) * r * 1.02, Math.sin(a) * r * 1.02]); }
      for (let i = 0; i <= 30; i++) { const yy = r - i / 30 * 2 * r; const xx = c * Math.sqrt(Math.max(0, r * r - yy * yy)); lp.push([wax ? xx : -xx, yy]); }
      ctx.save(); P.path(ctx, lp); ctx.closePath(); ctx.clip(); P.moon(ctx, 0, 0, r); ctx.restore();
      ctx.restore(); return;
    }
    if (o.rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot); ctx.translate(-x, -y); }
    P.moon(ctx, x, y, r);
    e = ((e % 6.2832) + 6.2832) % 6.2832; const c = Math.cos(e), wax = e <= Math.PI, pts = [];
    for (let i = 0; i <= 30; i++) { const a = -Math.PI / 2 - i / 30 * Math.PI; pts.push([x + (wax ? 1 : -1) * Math.cos(a) * r * 1.01, y + Math.sin(a) * r * 1.01]); }
    for (let i = 0; i <= 30; i++) { const yy = r - i / 30 * 2 * r; const xx = c * Math.sqrt(Math.max(0, r * r - yy * yy)); pts.push([x + (wax ? xx : -xx), y + yy]); }
    P.fillPts(ctx, pts, o.dark ?? '#262A40', o.alpha ?? 0.8);
    if (o.rot) ctx.restore();
  };
  // Türk bayrağı (dalgalanan; G = yükseklik). Bayrak kırmızısı uyarı kırmızısından (#A23A2A) ayrı tutulur.
  F.FLAG_RED = '#C8323A';
  F.flag = (ctx, x, y, G, t, o = {}) => {
    const L = G * 1.5, n = 24;
    const wav = (u) => Math.sin(u * 5 - t * 3.2) * G * 0.04 * u;
    const pt = (u, v) => [x + u * L, y + v * G + wav(u)];
    const poly = []; for (let i = 0; i <= n; i++) poly.push(pt(i / n, 0)); for (let i = n; i >= 0; i--) poly.push(pt(i / n, 1));
    P.fillPts(ctx, poly, F.FLAG_RED, 0.95); wash(ctx, poly, '#9E2129', 0.35, 301, { bleed: 1.5, blooms: 1 });
    // hilal ve yıldız (yaklaşık resmî oranlar)
    const cxo = x + 0.5 * G, cxi = x + 0.5625 * G, cy = y + 0.5 * G, dy = wav(0.36);
    ctx.save(); ctx.translate(0, dy);
    ctx.fillStyle = '#FBF8F1'; ctx.beginPath(); ctx.arc(cxo, cy, 0.25 * G, 0, 7); ctx.fill();
    ctx.fillStyle = F.FLAG_RED; ctx.beginPath(); ctx.arc(cxi, cy, 0.2 * G, 0, 7); ctx.fill();
    const sx = x + 0.8 * G, sy = cy, R = 0.125 * G; ctx.beginPath();
    for (let i = 0; i < 10; i++) { const a = Math.PI + i * Math.PI / 5, rr = i % 2 ? R * 0.382 : R; ctx.lineTo(sx + Math.cos(a) * rr, sy + Math.sin(a) * rr); }
    ctx.closePath(); ctx.fillStyle = '#FBF8F1'; ctx.fill();
    ctx.restore();
    stroke(ctx, poly.concat([poly[0]]), { w: 2.6, closed: true, seed: 302 });
    line(ctx, [x - 4, y - 20], [x - 4, y + G * 3.2], { w: 6, taper: 0.02, seed: 303 });
  };
  // yuvarlak çerçeveli kart
  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y + 3], [x + w - 2, y + h], [x + 3, y + h - 2], [x, y]];
    ctx.save(); ctx.shadowColor = 'rgba(40,30,20,0.28)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC', o.a ?? 0.97); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, seed: o.seed ?? 7, color: o.color });
  };
  // yörünge oku (saat yönünün tersi = ekranda açı azalır)
  F.orbitArrow = (ctx, cx, cy, rx, ry, a0, a1, o = {}) => {
    const pts = P.arc(cx, cy, rx, a0, a1, 40, ry); stroke(ctx, pts, { w: o.w ?? 4, color: o.color ?? '#C07F1E', dry: false });
    arrowHead(ctx, pts[36], pts[40], o.head ?? 18, { w: (o.w ?? 4) * 0.9, color: o.color ?? '#C07F1E' });
  };
  F.fitFont = (ctx, txt, maxW, size, weight = 700, font = 'Kalam') => {
    let s = size; ctx.font = `${weight} ${s}px ${font}`;
    while (ctx.measureText(txt).width > maxW && s > 20) { s -= 2; ctx.font = `${weight} ${s}px ${font}`; }
    return s;
  };
  // başlık kartı (01-gunes ile aynı düzen)
  F.title = (ctx, t, t1, num, name) => {
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 1', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, se, num, name, code) => {
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, num + ' · ' + name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  G.F03 = F;
})(window);

// props.js — 6. sınıf Film 15'e özel çizim yardımcıları (window.G15)
// Kaynaklar: films/19-hal-degisimi/props.js (kart, buhar, termometre ölçeği), films/16-tanecikli-yapi/props.js (tanecik, rectPts)
// Yeni: su leğeni (sıcak/soğuk), balonlu şişe, pipetli şişe, Gravzant halkası, ispirto ocağı, metal çubuk, ray, elektrik direği.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, dashed } = G.INK;
  const HEAT = '#B5553F', COLD = '#6FA6C4', RED = '#A23A2A', AMBER = '#8A4A10';
  const F = { HEAT, COLD, RED, AMBER };

  // kesikli çizgi için yoğun örneklenmiş noktalar (INK.dashed seyrek noktada çalışmaz)
  F.rectPts = (x0, y0, x1, y1, n = 30) => { const c = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]; const out = []; for (let i = 0; i < 4; i++) for (let j = 0; j < n; j++) out.push([c[i][0] + (c[i + 1][0] - c[i][0]) * j / n, c[i][1] + (c[i + 1][1] - c[i][1]) * j / n]); out.push([x0, y0]); return out; };
  F.linePts = (a, b, n = 40) => { const o = []; for (let i = 0; i <= n; i++) o.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return o; };

  // ---------- kart (sol üst köşe) ----------
  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 2100 });
    return c;
  };
  F.bench = (ctx, x0, x1, y, seed = 1500) => {
    const b = [[x0, y], [x1, y - 4], [x1 + 10, y + 40], [x0 - 10, y + 44], [x0, y]];
    P.fillPts(ctx, b, '#E3D3B3'); wash(ctx, b, '#8A6A45', 0.4, seed, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: seed + 1 });
  };

  // ---------- buhar kıvrımları ----------
  F.steam = (ctx, cx, y, w, hgt, k, t, seed = 1) => {
    if (k <= 0) return; const r = rng(seed); const n = 3 + Math.round(3 * k);
    for (let i = 0; i < n; i++) {
      const x0 = cx - w / 2 + w * (i + 0.5) / n + (r() - 0.5) * 12; const ph = r() * 6;
      const p = []; for (let j = 0; j <= 24; j++) { const u = j / 24; p.push([x0 + Math.sin(u * 7 + t * 2.2 + ph) * 10 * (0.4 + u), y - 8 - u * hgt]); }
      ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.3) * 0.5;
      stroke(ctx, p, { w: 3, color: '#8FA9B8', seed: seed + i, dry: false, taper: 0.45 });
      ctx.restore();
    }
  };

  // ---------- su leğeni: (cx, by) = alt orta ----------
  F.basin = (ctx, cx, by, w, h, kind, t, o = {}) => {
    const L = cx - w / 2, R = cx + w / 2, top = by - h, wy = top + 34;
    const col = kind === 'hot' ? HEAT : COLD;
    const wave = []; for (let i = 0; i <= 24; i++) { const x = L + 12 + (w - 24) * i / 24; wave.push([x, wy + Math.sin(i * 0.9 + t * 2) * 2]); }
    const wp = wave.concat([[R - 16, by - 6], [L + 16, by - 6]]);
    P.fillPts(ctx, wp, '#E4ECEF', 0.9); wash(ctx, wp, PAL.water, 0.28, 1511 + (kind === 'hot' ? 1 : 0), { bleed: 1.2, blooms: 1 });
    wash(ctx, wp, col, kind === 'hot' ? 0.1 : 0.22, 1513 + (kind === 'hot' ? 1 : 0), { bleed: 1, blooms: 0 });
    if (o.front !== false) F.basinFront(ctx, cx, by, w, h, kind, t, o);
    return { wy, top };
  };
  F.basinFront = (ctx, cx, by, w, h, kind, t, o = {}) => {
    const L = cx - w / 2, R = cx + w / 2, top = by - h;
    if (kind === 'cold') { // buz küpleri
      const r = rng(1520);
      for (let i = 0; i < 4; i++) {
        const s = 34 + r() * 8, x = L + 40 + i * (w - 80) / 3, y = top + 44 + (i % 2) * 6;
        const cube = [[x - s / 2, y - s / 2], [x + s / 2, y - s / 2 - 3], [x + s / 2 + 2, y + s / 2], [x - s / 2, y + s / 2 + 2], [x - s / 2, y - s / 2]];
        P.fillPts(ctx, cube, '#F2F7FA', 0.95); wash(ctx, cube, COLD, 0.45, 1521 + i, { bleed: 0.6, blooms: 0 }); stroke(ctx, cube, { w: 2, closed: true, seed: 1525 + i, dry: false });
      }
    }
    const glass = [[L - 10, top], [L + 6, by - 4], [R - 6, by - 4], [R + 10, top]];
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = PAL.white; P.path(ctx, glass); ctx.fill(); ctx.restore();
    stroke(ctx, glass, { w: 3.4, seed: 1530 + (kind === 'hot' ? 1 : 0) });
    line(ctx, [R - 30, top + 20], [R - 26, by - 30], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    if (kind === 'hot') F.steam(ctx, cx, top + 10, w * 0.8, 90, o.steam ?? 1, t, 1540);
    if (o.label !== false) INK.label(ctx, kind === 'hot' ? 'sıcak su' : 'soğuk su', cx, by + 92, { size: 36, weight: 700, align: 'center', color: kind === 'hot' ? HEAT : PAL.water, rot: 0 });
  };

  // ---------- balonlu cam şişe: (cx, by) alt orta; k: −1 (büzülmüş) .. 0 .. 1 (şişmiş) ----------
  F.bottleBalloon = (ctx, cx, by, s, k, t, o = {}) => {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s);
    const b = [[-48, 0], [-50, -110], [-20, -150], [-16, -190], [16, -190], [20, -150], [50, -110], [48, 0], [-48, 0]];
    P.fillPts(ctx, b, PAL.white, 0.45); wash(ctx, b, '#9FB9C4', 0.18, 1601, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 1602 });
    line(ctx, [-34, -100], [-34, -20], { w: 3, color: PAL.white, dry: false, alpha: 0.9 });
    // balloon
    const col = o.color ?? '#C8553F';
    const kk = Math.max(-1, Math.min(1, k));
    if (kk >= 0) {
      const rx = 30 + 46 * kk, ry = 34 + 58 * kk, cy = -196 - ry * 0.95 + Math.sin(t * 2) * 1.5;
      const bp = circlePts(0, cy, rx, ry, 46);
      P.fillPts(ctx, bp, col, 0.85); wash(ctx, bp, '#8A2A1A', 0.22, 1603, { bleed: 1, blooms: 1 }); stroke(ctx, bp, { w: 2.8, closed: true, seed: 1604 });
      line(ctx, [-rx * 0.5, cy - ry * 0.45], [-rx * 0.28, cy - ry * 0.7], { w: 4, color: PAL.white, dry: false, alpha: 0.8 });
      if (o.face !== false && kk > 0.35) { // gülen yüz (TYMM: E2.5 oyunseverlik)
        const f = E.clamp((kk - 0.35) / 0.3);
        ctx.save(); ctx.globalAlpha *= f;
        inkDot(ctx, -rx * 0.28, cy - ry * 0.12, 4.5); inkDot(ctx, rx * 0.28, cy - ry * 0.12, 4.5);
        stroke(ctx, P.arc(0, cy + ry * 0.05, rx * 0.36, 0.3, Math.PI - 0.3, 16), { w: 3, seed: 1605, dry: false });
        ctx.restore();
      }
    } else { // büzülmüş: şişe ağzına doğru çekilmiş, pörsük
      const d = -kk;
      const pts = [[-18, -190], [-22 + 4 * d, -205 + 10 * d], [-12, -222 + 18 * d], [8, -226 + 20 * d], [20, -210 + 12 * d], [18, -190]];
      P.fillPts(ctx, pts, col, 0.85); stroke(ctx, pts, { w: 2.6, seed: 1606 });
      if (o.face !== false && d > 0.4) { ctx.save(); ctx.globalAlpha *= E.clamp((d - 0.4) / 0.3); inkDot(ctx, -6, -210 + 16 * d, 2.6); inkDot(ctx, 8, -210 + 16 * d, 2.6); line(ctx, [-6, -200 + 14 * d], [8, -200 + 14 * d], { w: 2, dry: false }); ctx.restore(); }
    }
    // neck ring
    P.fillPts(ctx, [[-20, -196], [20, -196], [20, -184], [-20, -184]], col, 0.9); stroke(ctx, [[-20, -196], [20, -196], [20, -184], [-20, -184], [-20, -196]], { w: 2, closed: true, dry: false });
    ctx.restore();
  };

  // ---------- pipetli şişe (renkli su): (cx, by); lvl: pipetteki su yüksekliği (px, şişe ağzının üstünden) ----------
  F.flaskStraw = (ctx, cx, by, s, lvl, t) => {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s);
    const b = [[-60, 0], [-62, -120], [-22, -170], [-20, -200], [20, -200], [22, -170], [62, -120], [60, 0], [-60, 0]];
    const wat = [[-57, -4], [-59, -118], [-20, -166], [-17, -196], [17, -196], [20, -166], [59, -118], [57, -4]];
    P.fillPts(ctx, wat, PAL.water, 0.55); wash(ctx, wat, PAL.water, 0.35, 1611, { bleed: 1, blooms: 1 });
    stroke(ctx, b, { w: 3.2, closed: true, seed: 1612 });
    // tıpa
    P.fillPts(ctx, [[-24, -200], [24, -200], [22, -226], [-22, -226]], '#9A6B3E', 0.9); stroke(ctx, [[-24, -200], [24, -200], [22, -226], [-22, -226], [-24, -200]], { w: 2.4, closed: true, seed: 1613 });
    // pipet
    const top = -440, bot = -60;
    const col = -226 - lvl;
    P.fillPts(ctx, [[-6, bot], [-6, col], [6, col], [6, bot]], PAL.water, 0.8);
    stroke(ctx, [[-9, top], [-9, bot]], { w: 2.4, seed: 1614 }); stroke(ctx, [[9, top], [9, bot]], { w: 2.4, seed: 1615 });
    line(ctx, [-34, -60], [-34, -110], { w: 3, color: PAL.white, dry: false, alpha: 0.85 });
    ctx.restore();
    return { colY: by + col * s };
  };

  // ---------- büyük termometre ölçeği (F19'dan uyarlandı) ----------
  F.thermo = (ctx, x, y0, y1, T, o = {}) => {
    const min = o.min ?? -10, max = o.max ?? 50, step = o.step ?? 10, yOf = v => y1 - (v - min) / (max - min) * (y1 - y0);
    const tw = o.tw ?? 16, br = o.br ?? 28;
    const tube = [[x - tw, y1 + 8], [x - tw, y0 - 6], ...P.arc(x, y0 - 6, tw, Math.PI, 2 * Math.PI, 12), [x + tw, y1 + 8]];
    P.fillPts(ctx, tube.concat(P.arc(x, y1 + br + 4, br, -1.0, Math.PI + 1.0, 20).reverse()), PAL.white, 0.95);
    const ly = yOf(Math.max(min, Math.min(max, T)));
    P.fillPts(ctx, [[x - 6, y1 + 10], [x - 6, ly], [x + 6, ly], [x + 6, y1 + 10]], HEAT, 0.9);
    P.fillPts(ctx, circlePts(x, y1 + br + 4, br - 7, br - 7, 30), HEAT, 0.9);
    stroke(ctx, tube, { w: 3, seed: 2001 });
    stroke(ctx, P.arc(x, y1 + br + 4, br, -1.0, Math.PI + 1.0, 30).reverse(), { w: 3, seed: 2002 });
    for (let v = min; v <= max; v += step) {
      const y = yOf(v);
      line(ctx, [x - tw - 16, y], [x - tw - 2, y], { w: 2, dry: false, seed: 2010 + v });
      INK.label(ctx, String(v).replace('-', '−'), x - tw - 24, y + 10, { size: 28, align: 'right', rot: 0 });
    }
    INK.label(ctx, '°C', x, y0 - 36, { size: 30, weight: 700, align: 'center', rot: 0 });
    return { yOf, ly };
  };

  // ---------- ispirto ocağı: (cx, by) alt orta ----------
  F.burner = (ctx, cx, by, on, t, s = 1) => {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s);
    const body = [[-60, 0], [-56, -60], [-26, -84], [26, -84], [56, -60], [60, 0], [-60, 0]];
    P.fillPts(ctx, body, PAL.white, 0.5); wash(ctx, body, '#8FA9B8', 0.25, 1621, { bleed: 1, blooms: 0 }); stroke(ctx, body, { w: 3, closed: true, seed: 1622 });
    P.fillPts(ctx, [[-14, -84], [14, -84], [12, -104], [-12, -104]], '#8A8378', 0.9); stroke(ctx, [[-14, -84], [14, -84], [12, -104], [-12, -104], [-14, -84]], { w: 2.2, closed: true, dry: false });
    if (on > 0) {
      const fl = 1 + 0.08 * Math.sin(t * 17) + 0.05 * Math.sin(t * 29);
      const hgt = 90 * on * fl;
      const flame = [[-16, -104], [-14, -104 - hgt * 0.45], [0, -104 - hgt], [14, -104 - hgt * 0.45], [16, -104]];
      ctx.save(); const g = ctx.createRadialGradient(0, -104 - hgt * 0.4, 4, 0, -104 - hgt * 0.4, hgt * 0.9); g.addColorStop(0, 'rgba(227,160,58,0.35)'); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(-hgt, -104 - hgt * 1.4, hgt * 2, hgt * 1.5); ctx.restore();
      P.fillPts(ctx, P.bez(flame[0], [0, -104 - hgt * 1.25], flame[4], 20), PAL.light, 0.9);
      P.fillPts(ctx, P.bez([-7, -104], [0, -104 - hgt * 0.7], [7, -104], 14), '#F6D9A0', 0.95);
      stroke(ctx, P.bez(flame[0], [0, -104 - hgt * 1.25], flame[4], 20), { w: 2.2, color: HEAT, dry: false });
    }
    ctx.restore();
  };

  // ---------- Gravzant halkası ----------
  // ringX, ringY: halka merkezi (halka yatay, perspektif elips). ballY: kürenin merkez y'si. heat: 0..1 (sıcak küre rengi)
  F.ringStand = (ctx, x, y, R, part) => { // part: 'back' | 'front'
    if (part === 'back') {
      // stand
      line(ctx, [x + R + 120, y - 20], [x + R + 124, y + 360], { w: 8, seed: 1631, taper: 0.02 });
      line(ctx, [x + R, y], [x + R + 124, y - 6], { w: 6, seed: 1632, taper: 0.02 });
      const base = [[x + R + 40, y + 360], [x + R + 210, y + 358], [x + R + 214, y + 384], [x + R + 36, y + 386], [x + R + 40, y + 360]];
      P.fillPts(ctx, base, '#8A8378', 0.85); stroke(ctx, base, { w: 2.6, closed: true, seed: 1633 });
      stroke(ctx, P.arc(x, y, R, Math.PI, 2 * Math.PI, 40, R * 0.28), { w: 7, seed: 1634, color: '#5C564E' });
    } else {
      stroke(ctx, P.arc(x, y, R, 0, Math.PI, 40, R * 0.28), { w: 8, seed: 1635, color: '#4A4540' });
    }
  };
  F.ball = (ctx, x, y, r, heat, chainTop) => {
    if (chainTop) { line(ctx, [x, y - r], chainTop, { w: 2.2, dry: false, seed: 1641 }); const h = [[chainTop[0] - 12, chainTop[1] - 70], [chainTop[0] + 12, chainTop[1] - 70], [chainTop[0] + 10, chainTop[1]], [chainTop[0] - 10, chainTop[1]]]; P.fillPts(ctx, h, '#9A6B3E', 0.95); stroke(ctx, h.concat([h[0]]), { w: 2.4, closed: true, seed: 1642 }); }
    const c = circlePts(x, y, r, r, 40);
    P.fillPts(ctx, c, '#B9B7B2', 1); wash(ctx, c, '#5C5850', 0.45, 1643, { bleed: 0.8, blooms: 1 });
    if (heat > 0) { ctx.save(); ctx.globalAlpha *= heat; const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 1.8); g.addColorStop(0, 'rgba(181,85,63,0.8)'); g.addColorStop(0.55, 'rgba(181,85,63,0.35)'); g.addColorStop(1, 'rgba(181,85,63,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.8, 0, 7); ctx.fill(); ctx.restore(); }
    stroke(ctx, c, { w: 3, closed: true, seed: 1644 });
    line(ctx, [x - r * 0.5, y - r * 0.45], [x - r * 0.2, y - r * 0.65], { w: 4, color: PAL.white, dry: false, alpha: 0.8 });
  };

  // ---------- metal çubuk (yatay): (x, y) sol uç ----------
  F.rod = (ctx, x, y, len, col, seed) => {
    const p = [[x, y - 11], [x + len, y - 11], [x + len, y + 11], [x, y + 11], [x, y - 11]];
    P.fillPts(ctx, p, col, 0.9); wash(ctx, p, '#3A3530', 0.25, seed, { bleed: 0.6, blooms: 0 });
    stroke(ctx, p, { w: 2.4, closed: true, seed: seed + 1, dry: false });
    line(ctx, [x + 6, y - 5], [x + len - 6, y - 5], { w: 2, color: PAL.white, dry: false, alpha: 0.6 });
  };

  // ---------- tanecik (F16'dan) ----------
  F.particle = (ctx, x, y, r, ang = 0, o = {}) => {
    const A0 = ctx.globalAlpha;
    ctx.save();
    ctx.fillStyle = o.fill ?? '#BFD6E3'; ctx.globalAlpha = A0;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = o.color ?? PAL.water; ctx.globalAlpha = A0 * 0.55;
    ctx.beginPath(); ctx.arc(x - r * 0.12, y + r * 0.12, r * 0.78, 0, 7); ctx.fill();
    ctx.globalAlpha = A0; ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.2, r * 0.13);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke();
    ctx.fillStyle = PAL.white; ctx.beginPath(); ctx.arc(x - r * 0.35, y - r * 0.35, r * 0.2, 0, 7); ctx.fill();
    ctx.restore();
  };
  // düzenli katı kafes: merkez (cx, cy), n×m, aralık d, titreşim amp, hız sp
  F.lattice = (ctx, cx, cy, n, m, r, d, amp, sp, t, o = {}) => {
    const pts = [];
    for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) {
      const k = j * n + i;
      pts.push([cx + (i - (n - 1) / 2) * d + Math.sin(t * 13 * sp + k * 1.7) * amp, cy + (j - (m - 1) / 2) * d + Math.cos(t * 11 * sp + k * 2.3) * amp]);
    }
    // bonds
    ctx.save(); ctx.globalAlpha *= 0.3; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.4;
    for (let j = 0; j < m; j++) for (let i = 0; i < n; i++) { const a = pts[j * n + i]; if (i < n - 1) { const b = pts[j * n + i + 1]; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); } if (j < m - 1) { const b = pts[(j + 1) * n + i]; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); } }
    ctx.restore();
    pts.forEach(p => F.particle(ctx, p[0], p[1], r, 0, o));
    return pts;
  };
  // titreşim çizgileri (hareket vurgusu)
  F.jiggle = (ctx, x, y, r, k, t, seed) => {
    if (k <= 0) return; ctx.save(); ctx.globalAlpha *= 0.55 * k;
    for (let s = -1; s <= 1; s += 2) { const a = s * 0.5 + Math.sin(t * 8 + seed) * 0.2; ctx.strokeStyle = HEAT; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r + 7, a - 0.5 + (s < 0 ? Math.PI : 0), a + 0.5 + (s < 0 ? Math.PI : 0)); ctx.stroke(); }
    ctx.restore();
  };

  // ---------- elektrik direği + tel (sarkma: sag px) ----------
  F.poles = (ctx, x0, x1, top, ground, sag, seed = 1700) => {
    [x0, x1].forEach((x, i) => {
      line(ctx, [x, ground], [x + 2, top - 20], { w: 9, seed: seed + i, taper: 0.02, color: '#6B4E32' });
      line(ctx, [x - 50, top], [x + 50, top - 2], { w: 6, seed: seed + 2 + i, taper: 0.02, color: '#6B4E32' });
      [-40, 40].forEach(dx => { P.fillPts(ctx, circlePts(x + dx, top - 8, 6, 8, 12), '#D6D2C8', 1); });
    });
    [-40, 40].forEach((dx, j) => {
      const a = [x0 + dx, top - 12], b = [x1 + dx, top - 12];
      stroke(ctx, P.bez(a, [(a[0] + b[0]) / 2, top - 12 + sag * 2], b, 40), { w: 2.4, seed: seed + 5 + j, dry: false });
    });
  };

  // ---------- ray parçası: (x, y) sol üst, boşluk ile ----------
  F.rails = (ctx, x, y, segLen, n, gap, seed = 1750) => {
    // traversler
    for (let i = 0; i < n * 5; i++) { const tx = x + 20 + i * (segLen + gap) / 5; const p = [[tx, y - 30], [tx + 36, y - 30], [tx + 40, y + 110], [tx + 4, y + 110], [tx, y - 30]]; P.fillPts(ctx, p, '#B08A5A', 0.85); stroke(ctx, p, { w: 2, closed: true, seed: seed + i, dry: false }); }
    [0, 80].forEach((dy, j) => {
      for (let i = 0; i < n; i++) {
        const sx = x + i * (segLen + gap);
        const p = [[sx, y + dy - 8], [sx + segLen, y + dy - 8], [sx + segLen, y + dy + 8], [sx, y + dy + 8], [sx, y + dy - 8]];
        P.fillPts(ctx, p, '#9AA0A4', 1); stroke(ctx, p, { w: 2.4, closed: true, seed: seed + 40 + i + j * 10, dry: false });
      }
    });
  };

  G.G15 = F;
})(window);

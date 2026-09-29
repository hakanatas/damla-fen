// props.js — 7. sınıf "Maddenin Doğasına Yolculuk" filmleri (14 · 15 · 16) için ortak çizim yardımcıları (window.F7M)
// Atom parçacıkları, çekirdek, katmanlı atom, elektron bulutu, top-çubuk molekül modelleri, periyodik tablo kutucukları,
// kâğıt kart, masa, tablo, başlık/bitiş kartları. Her şey t'nin saf fonksiyonudur.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, arrowHead } = G.INK;
  const F = {};
  F.RED = '#A23A2A'; F.BR = '#8A4A10';
  // parçacık renkleri (kırmızı yalnızca uyarı/YANLIŞ için ayrıldığından proton sıcak toprak rengi)
  F.C = { p: '#D98A6C', n: '#BDB4A3', e: PAL.water };
  // element renkleri (top-çubuk modelleri) — aynı cins atom → aynı renk ve boyut
  F.EL = {
    H: { fill: '#F7F2E6', r: 30, txt: PAL.ink },
    O: { fill: '#5E8FB0', r: 44, txt: '#FBF8F1' },
    C: { fill: '#55525C', r: 42, txt: '#FBF8F1' },
    N: { fill: '#8E7FB8', r: 42, txt: '#FBF8F1' },
    Fe: { fill: '#8C9198', r: 40, txt: '#FBF8F1' },
    Cu: { fill: '#C07A45', r: 40, txt: '#FBF8F1' },
    He: { fill: '#E9DDB8', r: 34, txt: PAL.ink }
  };

  F.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  F.densePts = (pts, step = 4) => { const o = []; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i]; const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 0; j < n; j++) o.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]); } o.push(pts[pts.length - 1]); return o; };
  F.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillText(s, x, y); ctx.restore(); };
  F.fit = (ctx, s, maxW, size, weight = 700, font = 'Kalam') => { ctx.save(); let z = size; ctx.font = `${weight} ${z}px ${font}`; while (ctx.measureText(s).width > maxW && z > 12) { z -= 2; ctx.font = `${weight} ${z}px ${font}`; } ctx.restore(); return z; };

  // ---- masa / zemin
  F.desk = (ctx, y = 860, seed = 1) => {
    const f = [[-200, y], [2120, y], [2120, 1300], [-200, 1300]];
    P.fillPts(ctx, f, PAL.paper, 1); wash(ctx, f, '#8A6A45', 0.2, 1700 + seed, { bleed: 3, blooms: 2 });
    stroke(ctx, [[-100, y], [700, y - 2], [1400, y + 1], [2020, y - 1]], { w: 3.4, seed: 1710 + seed, taper: 0.02 });
  };
  // ---- kâğıt kart
  F.card = (ctx, x0, y0, x1, y1, o = {}) => {
    const c = [[x0, y0], [x1, y0 - 4], [x1 + 4, y1], [x0 + 3, y1 + 3], [x0, y0]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) P.fillPts(ctx, c, o.tint, o.tintA ?? 0.12);
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color, seed: o.seed ?? 1800 });
  };
  // ---- tablo
  F.table = (ctx, x, y, cols, rows, rowH, kFn, o = {}) => {
    const W = cols.reduce((a, b) => a + b, 0);
    rows.forEach((r, i) => {
      const k = kFn(i); if (k <= 0) return; const yy = y + i * rowH;
      if (i === 0) P.fillPts(ctx, F.rect(x, yy, x + W, yy + rowH), o.head ?? PAL.water, 0.18 * Math.min(1, k * 2));
      line(ctx, [x, yy + rowH], [x + W * Math.min(1, k * 1.5), yy + rowH], { w: i === 0 ? 3 : 1.8, dry: false, seed: 970 + i });
      let cx = x; r.forEach((c, j) => { const col = (o.cellColor && o.cellColor(i, j)) || PAL.ink; P.write(ctx, c, cx + 16, yy + rowH * 0.7, E.clamp(k * (1 + 0.3 * cols.length) - j * 0.3), { size: o.size ?? 38, weight: i === 0 ? 700 : (o.bodyWeight ?? 400), color: col }); cx += cols[j]; });
    });
    if (kFn(0) > 0) { let cx = x; const n = rows.filter((r, i) => kFn(i) > 0).length; for (let j = 1; j < cols.length; j++) { cx += cols[j - 1]; line(ctx, [cx, y], [cx, y + rowH * n], { w: 1.8, dry: false, seed: 990 + j }); } }
  };

  // ---- başlık / bitiş kartı (7. sınıf)
  F.title = (ctx, t, name, unit = 5) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 7. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.water }); ctx.restore(); }
  };
  F.endCard = (ctx, t, name, code) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      G.INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      G.INK.label(c, name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.water });
      G.INK.label(c, 'Fen Bilimleri · 7. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      G.INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  F.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'neutral', look: [0.6, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 0.4]] }, o));

  // ---- gölgeli top (atom / parçacık). o.sym: içindeki yazı
  F.ball = (ctx, x, y, r, fill, o = {}) => {
    const A0 = ctx.globalAlpha;
    ctx.save();
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
    g.addColorStop(0, '#FFFDF6'); g.addColorStop(0.25, fill); g.addColorStop(1, o.dark ?? shade(fill, -0.32));
    ctx.fillStyle = g; ctx.globalAlpha = A0 * (o.alpha ?? 1); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.2, Math.min(3.2, r * 0.07)); ctx.stroke();
    if (o.sym) { ctx.font = `700 ${Math.round(o.symSize ?? r * 0.9)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.txt ?? PAL.ink; ctx.fillText(o.sym, x, y + r * 0.06); }
    ctx.restore();
  };
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f); return `rgb(${m(r)},${m(g)},${m(b)})`; }
  F.shade = shade;
  F.proton = (ctx, x, y, r, a = 1) => F.ball(ctx, x, y, r, F.C.p, { sym: '+', txt: PAL.ink, alpha: a });
  F.neutron = (ctx, x, y, r, a = 1) => F.ball(ctx, x, y, r, F.C.n, { alpha: a });
  F.electron = (ctx, x, y, r, a = 1) => F.ball(ctx, x, y, r, '#6FA0C2', { sym: '−', txt: '#FBF8F1', alpha: a });

  // ---- çekirdek: np proton + nn nötron, sıkı paket (deterministik spiral dizilim)
  F.nucleus = (ctx, x, y, np, nn, r, o = {}) => {
    const N = np + nn; const pts = [];
    for (let i = 0; i < N; i++) { const a = i * 2.39996, d = r * 1.05 * Math.sqrt(i); pts.push([x + Math.cos(a) * d, y + Math.sin(a) * d]); }
    // proton/nötron sırasını karıştır (deterministik)
    const kinds = []; for (let i = 0; i < N; i++) kinds.push(i < np ? 'p' : 'n');
    const R = rng(o.seed ?? 77); for (let i = N - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [kinds[i], kinds[j]] = [kinds[j], kinds[i]]; }
    // dıştan içe çiz (içtekiler üstte görünsün)
    for (let i = N - 1; i >= 0; i--) { const [px, py] = pts[i]; kinds[i] === 'p' ? F.proton(ctx, px, py, r, o.alpha ?? 1) : F.neutron(ctx, px, py, r, o.alpha ?? 1); }
    return r * 1.05 * Math.sqrt(Math.max(1, N - 1)) + r;
  };
  // ---- katmanlı (Bohr) atom: shells = [2, 8, 1] elektron sayıları; R0: ilk katman yarıçapı, dR: aralık
  F.bohr = (ctx, x, y, np, nn, shells, t, o = {}) => {
    const R0 = o.R0 ?? 110, dR = o.dR ?? 70, er = o.er ?? 13, nr = o.nr ?? 13, spin = o.spin ?? 0.5;
    shells.forEach((n, k) => {
      const R = R0 + k * dR;
      stroke(ctx, circlePts(x, y, R, R, 90), { w: 2, closed: true, alpha: 0.55, dry: false, seed: 300 + k, color: o.ringColor });
    });
    F.nucleus(ctx, x, y, np, nn, nr, { seed: o.seed ?? 5 });
    shells.forEach((n, k) => {
      const R = R0 + k * dR, kk = o.kShell ? o.kShell(k) : 1;
      for (let i = 0; i < n; i++) {
        if (o.kE && o.kE(k, i) <= 0) continue;
        const a = i / n * Math.PI * 2 + t * spin / (1 + k * 0.5) + k * 0.4;
        F.electron(ctx, x + Math.cos(a) * R, y + Math.sin(a) * R, er, (o.kE ? o.kE(k, i) : 1) * kk);
      }
    });
  };
  // ---- elektron bulutu: yoğunluk merkezde fazla, dışa doğru azalır (bulunma ihtimali). Titrek noktalar.
  F.cloud = (ctx, x, y, R, t, o = {}) => {
    const n = o.n ?? 900; const frame = Math.floor(t * 10);
    const r = rng(1000 + frame % 20);
    ctx.save(); ctx.fillStyle = o.color ?? PAL.water;
    for (let i = 0; i < n; i++) {
      // üstel dağılım: yakında sık, uzakta seyrek
      const d = Math.min(R, -Math.log(1 - r() * 0.985) * R * 0.28); const a = r() * 6.283;
      ctx.globalAlpha = (o.alpha ?? 0.7) * (0.35 + r() * 0.65);
      ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 1.6 + r() * 1.8, 0, 7); ctx.fill();
    }
    const g = ctx.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, 'rgba(46,106,140,0.28)'); g.addColorStop(0.6, 'rgba(46,106,140,0.08)'); g.addColorStop(1, 'rgba(46,106,140,0)');
    ctx.globalAlpha = o.alpha ?? 0.7; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill();
    ctx.restore();
  };

  // ---- bağ (çubuk): n = 1, 2, 3 (tekli, ikili, üçlü)
  F.bond = (ctx, a, b, n = 1, o = {}) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const gap = o.gap ?? 13, w = o.w ?? 9;
    for (let i = 0; i < n; i++) {
      const off = (i - (n - 1) / 2) * gap;
      const p = [a[0] + nx * off, a[1] + ny * off], q = [b[0] + nx * off, b[1] + ny * off];
      ctx.save(); ctx.lineCap = 'round';
      ctx.strokeStyle = PAL.ink; ctx.lineWidth = w + 3.5; ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke();
      ctx.strokeStyle = '#E8DCC2'; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke();
      ctx.restore();
    }
  };
  // ---- molekül: atoms = [[el, dx, dy], ...] (birim: px, s ile ölçeklenir), bonds = [[i, j, n], ...]
  F.molecule = (ctx, x, y, s, atoms, bonds, o = {}) => {
    const P2 = atoms.map(([el, dx, dy]) => [x + dx * s, y + dy * s]);
    (bonds || []).forEach(([i, j, n]) => F.bond(ctx, P2[i], P2[j], n, { w: 9 * s, gap: 13 * s }));
    // arkadan öne: küçük y önce
    atoms.map((a, i) => i).sort((i, j) => (atoms[i][3] ?? 0) - (atoms[j][3] ?? 0)).forEach(i => {
      const [el] = atoms[i]; const d = F.EL[el]; const rr = (o.same ? 38 : d.r) * s;
      F.ball(ctx, P2[i][0], P2[i][1], rr, o.same ? '#C9C1B0' : d.fill, { sym: o.sym === false ? null : el, txt: o.same ? PAL.ink : d.txt, symSize: rr * 0.85 });
    });
    return P2;
  };
  // yaygın moleküller (doğru geometri: H₂O bükük ≈104,5°, CO₂ doğrusal, O₂ ikili bağ, N₂ üçlü bağ)
  const ANG = 104.5 / 2 * Math.PI / 180, dOH = 98;
  F.MOL = {
    H2: { atoms: [['H', -44, 0], ['H', 44, 0]], bonds: [[0, 1, 1]] },
    O2: { atoms: [['O', -68, 0], ['O', 68, 0]], bonds: [[0, 1, 2]] },
    N2: { atoms: [['N', -66, 0], ['N', 66, 0]], bonds: [[0, 1, 3]] },
    H2O: { atoms: [['O', 0, -30], ['H', -Math.sin(ANG) * dOH, -30 + Math.cos(ANG) * dOH, 1], ['H', Math.sin(ANG) * dOH, -30 + Math.cos(ANG) * dOH, 1]], bonds: [[0, 1, 1], [0, 2, 1]] },
    H2O_lin: { atoms: [['H', -98, 0], ['O', 0, 0], ['H', 98, 0]], bonds: [[0, 1, 1], [1, 2, 1]] },
    CO2: { atoms: [['O', -122, 0], ['C', 0, 0], ['O', 122, 0]], bonds: [[0, 1, 2], [1, 2, 2]] },
    CO2_bent: { atoms: [['C', 0, -18], ['O', -Math.sin(ANG) * 122, -18 + Math.cos(ANG) * 122, 1], ['O', Math.sin(ANG) * 122, -18 + Math.cos(ANG) * 122, 1]], bonds: [[0, 1, 2], [0, 2, 2]] }
  };
  F.mol = (ctx, name, x, y, s = 1, o = {}) => { const m = F.MOL[name]; return F.molecule(ctx, x, y, s, m.atoms, m.bonds, o); };

  // ---- periyodik tablo kutucuğu
  F.tile = (ctx, x, y, w, h, sym, num, name, o = {}) => {
    const A0 = ctx.globalAlpha; ctx.save(); ctx.globalAlpha = A0 * (o.alpha ?? 1);
    const box = F.rect(x, y, x + w, y + h);
    P.fillPts(ctx, box, o.fill ?? '#FBF8F1', 1);
    if (o.tint) P.fillPts(ctx, box, o.tint, o.tintA ?? 0.25);
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = o.lw ?? 2; ctx.strokeRect(x, y, w, h);
    if (num != null) { ctx.font = `700 ${Math.round(h * 0.2)}px Kalam`; ctx.fillStyle = PAL.ink; ctx.globalAlpha = A0 * (o.alpha ?? 1) * 0.75; ctx.textAlign = 'left'; ctx.fillText(String(num), x + w * 0.08, y + h * 0.24); ctx.globalAlpha = A0 * (o.alpha ?? 1); }
    if (sym) { ctx.font = `700 ${Math.round(h * (name ? 0.42 : 0.5))}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = o.symColor ?? PAL.ink; ctx.fillText(sym, x + w / 2, y + h * (name ? 0.64 : 0.7)); }
    if (name) { let z = Math.round(h * 0.15); ctx.font = `700 ${z}px Kalam`; while (ctx.measureText(name).width > w * 0.92 && z > 8) { z--; ctx.font = `700 ${z}px Kalam`; } ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(name, x + w / 2, y + h * 0.9); }
    ctx.restore();
  };
  // ilk 18 element (proton sayısı sırasıyla), grup (A) ve periyot
  F.ELEMS = [
    ['H', 'hidrojen', 1, 1], ['He', 'helyum', 8, 1],
    ['Li', 'lityum', 1, 2], ['Be', 'berilyum', 2, 2], ['B', 'bor', 3, 2], ['C', 'karbon', 4, 2], ['N', 'azot', 5, 2], ['O', 'oksijen', 6, 2], ['F', 'flor', 7, 2], ['Ne', 'neon', 8, 2],
    ['Na', 'sodyum', 1, 3], ['Mg', 'magnezyum', 2, 3], ['Al', 'alüminyum', 3, 3], ['Si', 'silisyum', 4, 3], ['P', 'fosfor', 5, 3], ['S', 'kükürt', 6, 3], ['Cl', 'klor', 7, 3], ['Ar', 'argon', 8, 3]
  ];
  // A grubu numarası → 18 sütunlu tablodaki sütun (1A→1, 2A→2, 3A..8A → 13..18)
  F.colOfA = g => g <= 2 ? g : g + 10;
  // elektron dizilimi (ilk 18: 2, 8, 8)
  F.shells = z => { const s = []; let r = z; [2, 8, 8].forEach(m => { if (r > 0) { s.push(Math.min(m, r)); r -= Math.min(m, r); } }); return s; };

  // ---- kum tanesi
  F.grain = (ctx, x, y, r, seed) => { const R = rng(seed); const pts = []; for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283; const q = r * (0.75 + R() * 0.4); pts.push([x + Math.cos(a) * q, y + Math.sin(a) * q * 0.85]); } pts.push(pts[0]); P.fillPts(ctx, pts, ['#D9B77A', '#C9A263', '#E4C792'][seed % 3]); ctx.save(); ctx.strokeStyle = 'rgba(28,27,34,0.7)'; ctx.lineWidth = 1.3; P.path(ctx, pts); ctx.stroke(); ctx.restore(); };

  // ---- "yeni kanıt" rozeti
  F.evidence = (ctx, x, y, k, txt = 'yeni kanıt!') => {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.06);
    const pts = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.283; const rr = i % 2 ? 58 : 74; pts.push([Math.cos(a) * rr * 1.9, Math.sin(a) * rr * 0.72]); }
    P.fillPts(ctx, pts, '#F6E7B8'); stroke(ctx, pts, { w: 2.6, closed: true, dry: false, seed: 1990 });
    ctx.font = '700 36px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = F.BR; ctx.fillText(txt, 0, 12);
    ctx.restore();
  };

  G.F7M = F;
})(window);

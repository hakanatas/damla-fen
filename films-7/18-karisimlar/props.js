// props.js — 7. sınıf Ünite 5 (Filmler 17–19) ortak çizim yardımcıları → window.K7
// Aynı dosya 17-bilesik-formulleri, 18-karisimlar ve 19-karisim-ayirma klasörlerinde birebir kopyadır.
// Kaynak: films-6/16-erime-kaynama-noktasi/props.js (kart, tezgâh, ısıtıcı, buhar) uyarlandı; formül/atom/ayırma düzenekleri yeni.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, dashed, wobble } = G.INK;
  const HEAT = '#B5553F', RED = '#A23A2A', AMBER = '#8A4A10', SUB = '#C07F1E';
  const K = { HEAT, RED, AMBER, SUB };

  // ---------- temsili atom renkleri (kırmızı yalnızca güvenlik için ayrıldığından O mavi) ----------
  K.EL = {
    H: { c: '#FBF8F1', r: 0.72 }, O: { c: '#5E8FAE', r: 1 }, C: { c: '#4A4750', r: 1, tc: '#FBF8F1' },
    N: { c: '#8C7BB8', r: 1 }, S: { c: '#E2C454', r: 1.12 }, Cl: { c: '#93B560', r: 1.12 }, Na: { c: '#C49A6C', r: 1.2 }
  };
  K.atom = (ctx, x, y, r, el, o = {}) => {
    const d = K.EL[el] || { c: '#ddd', r: 1 }; const R = r * (o.raw ? 1 : d.r);
    const cp = circlePts(x, y, R, R, 36);
    P.fillPts(ctx, cp, d.c, 0.96);
    wash(ctx, cp, d.c === '#FBF8F1' ? '#B9AE98' : d.c, 0.35, 2200 + (o.seed ?? 0), { bleed: 0.8, blooms: 0 });
    ctx.save(); const g = ctx.createRadialGradient(x - R * 0.35, y - R * 0.4, R * 0.1, x, y, R); g.addColorStop(0, 'rgba(255,255,255,0.45)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill(); ctx.restore();
    stroke(ctx, cp, { w: Math.max(1.6, R * 0.07), closed: true, dry: false, seed: 2210 + (o.seed ?? 0) });
    if (o.label !== false && R > 13) { ctx.save(); ctx.font = `700 ${Math.round(R * (el.length > 1 ? 0.8 : 0.95))}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = d.tc ?? PAL.ink; ctx.fillText(el, x, y + R * 0.06); ctx.restore(); }
    return R;
  };
  K.bond = (ctx, a, b, o = {}) => line(ctx, a, b, { w: o.w ?? 7, color: o.color ?? '#6B6460', dry: false, taper: 0.02, seed: o.seed ?? 2230 });

  // ---------- top-çubuk molekül modelleri (merkez x,y; r = büyük atom yarıçapı; k: 0..1 atomlar sırayla belirir) ----------
  K.MOL = {
    H2O: [['O', 0, 0], ['H', -1.35, 1.05], ['H', 1.35, 1.05]],
    CO: [['C', -1.05, 0], ['O', 1.05, 0]],
    CO2: [['O', -2.1, 0], ['C', 0, 0], ['O', 2.1, 0]],
    NH3: [['N', 0, -0.2], ['H', -1.55, 0.75], ['H', 1.55, 0.75], ['H', 0.25, 1.65]],
    SO2: [['S', 0, 0.2], ['O', -1.75, -0.95], ['O', 1.75, -0.95]],
    HCl: [['H', -1.0, 0], ['Cl', 1.0, 0]],
    O2: [['O', -1.05, 0], ['O', 1.05, 0]], H2: [['H', -0.8, 0], ['H', 0.8, 0]], N2: [['N', -1.05, 0], ['N', 1.05, 0]]
  };
  K.mol = (ctx, kind, x, y, r, k = 1, o = {}) => {
    const A = K.MOL[kind]; if (!A || k <= 0) return; const n = A.length;
    const vis = A.map((a, i) => E.clamp(k * n - i));
    ctx.save();
    for (let i = 1; i < n; i++) { const c = kind === 'CO2' || kind === 'CO' || kind === 'O2' || kind === 'H2' || kind === 'N2' || kind === 'HCl' ? i - 1 : 0; if (vis[i] > 0.5 && vis[c] > 0.5) K.bond(ctx, [x + A[c][1] * r, y + A[c][2] * r], [x + A[i][1] * r, y + A[i][2] * r], { w: r * 0.16, seed: 2240 + i }); }
    A.forEach((a, i) => { if (vis[i] <= 0) return; const s = P.pop(vis[i]); K.atom(ctx, x + a[1] * r, y + a[2] * r, r * 0.78 * s, a[0], { seed: i + (o.seed ?? 0), label: o.label }); });
    ctx.restore();
  };

  // ---------- formül yazımı: 'C6H12O6' → alt simgeler küçük ve aşağıda ----------
  K.tok = (str) => { const out = []; let m; const re = /([A-Z][a-z]?)|(\d+)|([^A-Za-z\d]+)|([a-z]+)/g; while ((m = re.exec(str))) out.push(m[2] ? { s: m[2], sub: true } : { s: m[0], sub: false }); return out; };
  K.fw = (ctx, str, size, o = {}) => { let w = 0; K.tok(str).forEach(tk => { ctx.font = `${o.weight ?? 700} ${tk.sub ? size * 0.6 : size}px ${o.font ?? 'Kalam'}`; w += ctx.measureText(tk.s).width + (tk.sub ? size * 0.02 : 0); }); return w; };
  // k: 0..1 soldan sağa el yazısı açılışı; o.subColor: alt simge rengi (vurgu); o.align
  K.formula = (ctx, str, x, y, size, o = {}) => {
    const k = o.k ?? 1; if (k <= 0) return 0;
    ctx.save(); const w = K.fw(ctx, str, size, o);
    let x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
    ctx.translate(x0, y); ctx.rotate(o.rot ?? -0.01); ctx.translate(-x0, -y);
    if (k < 1) { ctx.beginPath(); ctx.rect(x0 - 10, y - size * 1.2, (w + 20) * k, size * 1.9); ctx.clip(); }
    ctx.globalAlpha *= (o.alpha ?? 0.95); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    let cx = x0;
    K.tok(str).forEach(tk => {
      ctx.font = `${o.weight ?? 700} ${tk.sub ? size * 0.6 : size}px ${o.font ?? 'Kalam'}`;
      ctx.fillStyle = tk.sub ? (o.subColor ?? o.color ?? PAL.ink) : (o.color ?? PAL.ink);
      ctx.fillText(tk.s, cx + (tk.sub ? size * 0.02 : 0), y + (tk.sub ? size * 0.24 : 0));
      cx += ctx.measureText(tk.s).width + (tk.sub ? size * 0.02 : 0);
    });
    ctx.restore(); return w;
  };
  // Metin + formül karışık satır: parçalar dizisi [{t:'metin'} | {f:'H2O'}]
  K.rich = (ctx, parts, x, y, size, o = {}) => {
    const ws = parts.map(p => { if (p.f) return K.fw(ctx, p.f, size, o); ctx.font = `${o.weight ?? 700} ${size}px Kalam`; return ctx.measureText(p.t).width; });
    const W = ws.reduce((a, b) => a + b, 0); let cx = o.align === 'center' ? x - W / 2 : x;
    const k = o.k ?? 1; if (k <= 0) return W;
    ctx.save(); if (k < 1) { ctx.beginPath(); ctx.rect(cx - 10, y - size * 1.2, (W + 20) * k, size * 1.9); ctx.clip(); }
    parts.forEach((p, i) => {
      if (p.f) K.formula(ctx, p.f, cx, y, size, { ...o, align: 'left', k: 1, color: p.color ?? o.color, subColor: o.subColor });
      else { ctx.save(); ctx.font = `${o.weight ?? 700} ${size}px Kalam`; ctx.fillStyle = p.color ?? o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 0.93); ctx.textAlign = 'left'; ctx.fillText(p.t, cx, y); ctx.restore(); }
      cx += ws[i];
    });
    ctx.restore(); return W;
  };

  // ---------- kart / tezgâh ----------
  K.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, o.seed ?? 2100, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 2100 });
    return c;
  };
  K.bench = (ctx, x0, x1, y, seed = 1500) => {
    const b = [[x0, y], [x1, y - 4], [x1 + 10, y + 40], [x0 - 10, y + 44], [x0, y]];
    P.fillPts(ctx, b, '#E3D3B3'); wash(ctx, b, '#8A6A45', 0.4, seed, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: seed + 1 });
  };
  K.linePts = (a, b, n = 40) => { const o = []; for (let i = 0; i <= n; i++) o.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return o; };

  // ---------- buhar ----------
  K.steam = (ctx, cx, y, w, hgt, k, t, seed = 1) => {
    if (k <= 0) return; const r = rng(seed); const n = 3 + Math.round(3 * k);
    for (let i = 0; i < n; i++) {
      const x0 = cx - w / 2 + w * (i + 0.5) / n + (r() - 0.5) * 12; const ph = r() * 6;
      const p = []; for (let j = 0; j <= 24; j++) { const u = j / 24; p.push([x0 + Math.sin(u * 7 + t * 2.2 + ph) * 10 * (0.4 + u), y - 8 - u * hgt]); }
      ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.3) * 0.5;
      stroke(ctx, p, { w: 3, color: '#8FA9B8', seed: seed + i, dry: false, taper: 0.45 });
      ctx.restore();
    }
  };

  // ---------- elektrikli ısıtıcı: üst yüzey orta (cx, top) ----------
  K.heater = (ctx, cx, top, w, heat = 0, t = 0) => {
    const h = 86;
    const body = [[cx - w / 2, top + 14], [cx + w / 2, top + 12], [cx + w / 2 + 10, top + h], [cx - w / 2 - 10, top + h + 2], [cx - w / 2, top + 14]];
    P.fillPts(ctx, body, '#D9CDB4'); wash(ctx, body, '#8A6A45', 0.3, 1901, { bleed: 1, blooms: 1 });
    stroke(ctx, body, { w: 3, closed: true, seed: 1902 });
    const plate = [[cx - w / 2 + 16, top], [cx + w / 2 - 16, top - 2], [cx + w / 2 - 6, top + 14], [cx - w / 2 + 6, top + 15], [cx - w / 2 + 16, top]];
    P.fillPts(ctx, plate, '#4A4550'); stroke(ctx, plate, { w: 2.6, closed: true, seed: 1903 });
    if (heat > 0) {
      ctx.save(); ctx.globalAlpha *= heat * (0.75 + 0.1 * Math.sin(t * 5));
      const g = ctx.createRadialGradient(cx, top + 6, 4, cx, top + 6, w * 0.55); g.addColorStop(0, 'rgba(210,90,50,0.95)'); g.addColorStop(1, 'rgba(210,90,50,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - w / 2, top - 30, w, 50); ctx.restore();
    }
    stroke(ctx, circlePts(cx + w / 2 - 50, top + 52, 17, 17, 24), { w: 2.6, closed: true, seed: 1904 });
    line(ctx, [cx + w / 2 - 50, top + 52], [cx + w / 2 - 50 + 12 * Math.cos(-2 + heat * 2.4), top + 52 + 12 * Math.sin(-2 + heat * 2.4)], { w: 3, dry: false });
    ctx.save(); ctx.fillStyle = heat > 0 ? HEAT : '#8b8378'; ctx.beginPath(); ctx.arc(cx - w / 2 + 44, top + 52, 8, 0, 7); ctx.fill(); ctx.restore();
  };

  // ---------- beher: alt orta (cx, by), w × h ----------
  // o: level 0..1, tint [renk, alfa] (çözelti rengi), oil (0..1 üst yağ tabakası oranı), sand (0..1 dibe çökmüş kum),
  //    cloud (0..1 askıda kum), cubes (0..1 çözünmemiş şeker küpü), grains (0..1 toz tanesi), t, stir (0..1), steam
  K.beaker = (ctx, cx, by, w, h, o = {}) => {
    const t = o.t ?? 0, L = cx - w / 2, R = cx + w / 2, top = by - h;
    const lev = o.level ?? 0, wy = by - 8 - lev * (h - 26);
    if (lev > 0) {
      const amp = 1.4 + 4 * (o.stir ?? 0);
      const wave = []; for (let i = 0; i <= 24; i++) { const x = L + 7 + (w - 14) * i / 24; wave.push([x, wy + Math.sin(i * 0.9 + t * (2 + 8 * (o.stir ?? 0))) * amp]); }
      const wp = wave.concat([[R - 7, by - 10], [cx, by - 6], [L + 7, by - 10]]);
      P.fillPts(ctx, wp, '#DCE8EE', 0.9); wash(ctx, wp, PAL.water, 0.26, 1911 + (o.seed ?? 0), { bleed: 1.2, blooms: 1 });
      if (o.tint) wash(ctx, wp, o.tint[0], o.tint[1], 1915 + (o.seed ?? 0), { bleed: 1, blooms: 0 });
      // suspended sand
      if (o.cloud > 0) { const r = rng(1917 + (o.seed ?? 0)); ctx.save(); ctx.fillStyle = '#9C7A48'; for (let i = 0; i < 90 * o.cloud; i++) { const x = L + 12 + r() * (w - 24), y = wy + 8 + r() * (by - wy - 20); ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(x + Math.sin(t * 2 + i) * 3, y + Math.cos(t * 1.7 + i) * 3, 2 + r() * 2, 0, 7); ctx.fill(); } ctx.restore(); }
      // oil layer on top
      if (o.oil > 0) {
        const oy = wy + (by - wy) * 0; const ob = wy + (by - 10 - wy) * o.oil;
        const op = wave.concat([[R - 7, ob], [L + 7, ob]]);
        P.fillPts(ctx, op, '#EFD98A', 0.95); wash(ctx, op, '#C9A227', 0.45, 1918, { bleed: 1, blooms: 0 });
        stroke(ctx, [[L + 8, ob], [R - 8, ob + 1]], { w: 2, color: '#9C7E1E', dry: false, alpha: 0.8 });
      }
      stroke(ctx, wave, { w: 2, color: o.oil > 0 ? '#9C7E1E' : PAL.water, dry: false, alpha: 0.8 });
    }
    if (o.sand > 0) {
      const sh = 14 + 38 * o.sand; const r = rng(1919 + (o.seed ?? 0));
      const pile = [[L + 8, by - 10]]; for (let i = 0; i <= 16; i++) { const u = i / 16; pile.push([L + 8 + u * (w - 16), by - 10 - sh * (0.75 + 0.25 * Math.sin(u * Math.PI)) - r() * 4]); } pile.push([R - 8, by - 10]);
      P.fillPts(ctx, pile, '#C9A56A', 0.95); wash(ctx, pile, '#8A6A45', 0.5, 1920, { bleed: 1, blooms: 0 });
      ctx.save(); ctx.fillStyle = '#6B4E32'; for (let i = 0; i < 40; i++) { ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(L + 14 + r() * (w - 28), by - 14 - r() * sh * 0.8, 1.5 + r() * 1.5, 0, 7); ctx.fill(); } ctx.restore();
    }
    if (o.cubes > 0) { for (let i = 0; i < 2; i++) { const s = 40 * Math.sqrt(o.cubes); const x = cx - 26 + i * 50, y = by - 14 - s / 2; const c = [[x - s / 2, y - s / 2], [x + s / 2, y - s / 2], [x + s / 2, y + s / 2], [x - s / 2, y + s / 2], [x - s / 2, y - s / 2]]; P.fillPts(ctx, c, '#FFFDF6', 0.95); stroke(ctx, c, { w: 2, closed: true, dry: false, seed: 1930 + i }); for (let j = 0; j < 5; j++) inkDot(ctx, x - s * 0.3 + (j * 7) % s * 0.6, y - s * 0.3 + (j * 11) % s * 0.6, 1.2, { alpha: 0.4 }); } }
    if (o.grains > 0) { const r = rng(1940 + (o.seed ?? 0)); ctx.save(); ctx.fillStyle = '#FFFDF6'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 0.8; for (let i = 0; i < 60 * o.grains; i++) { const x = L + 16 + r() * (w - 32), y = by - 14 - r() * 18; ctx.beginPath(); ctx.rect(x, y, 4, 4); ctx.fill(); ctx.stroke(); } ctx.restore(); }
    const glass = [[L - 8, top - 4], [L, top + 6], [L + 2, by - 16], [L + 16, by], [R - 16, by], [R - 2, by - 16], [R, top + 6], [R + 8, top - 4]];
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = PAL.white; P.path(ctx, glass); ctx.fill(); ctx.restore();
    stroke(ctx, glass, { w: 3.2, seed: 1970 + (o.seed ?? 0) });
    for (let i = 1; i <= 4; i++) line(ctx, [L + 4, by - 20 - i * (h - 40) / 5], [L + 22, by - 20 - i * (h - 40) / 5], { w: 1.4, dry: false, alpha: 0.6, seed: 1971 + i });
    line(ctx, [R - 20, top + 24], [R - 16, by - 40], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    if (o.steam > 0) K.steam(ctx, cx, top + 4, w * 0.7, 110, o.steam, t, 1990 + (o.seed ?? 0));
    if (o.spoon > 0) { const a = Math.sin(t * 7) * 0.35 * o.spoon; ctx.save(); ctx.translate(cx, top - 20); ctx.rotate(a); line(ctx, [0, -60], [0, h - 40], { w: 5, color: '#8A8378', taper: 0.02, dry: false }); ctx.restore(); }
    return { wy, top, L, R };
  };

  // ---------- kronometre ----------
  K.watch = (ctx, x, y, s, frac, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const c = circlePts(0, 0, 50, 50, 40); P.fillPts(ctx, c, PAL.white); stroke(ctx, c, { w: 3, closed: true, seed: 2301, dry: false });
    line(ctx, [0, -50], [0, -64], { w: 5, dry: false }); line(ctx, [-12, -66], [12, -66], { w: 5, dry: false });
    if (frac > 0) { ctx.save(); ctx.fillStyle = o.color ?? 'rgba(227,160,58,0.45)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 44, -Math.PI / 2, -Math.PI / 2 + frac * 6.283); ctx.closePath(); ctx.fill(); ctx.restore(); }
    const a = -Math.PI / 2 + frac * 6.283; line(ctx, [0, 0], [Math.cos(a) * 40, Math.sin(a) * 40], { w: 3, dry: false }); inkDot(ctx, 0, 0, 4);
    ctx.restore();
  };

  // ---------- güvenlik kartı ----------
  K.safety = (ctx, x, y, w, items, t, t0, o = {}) => {
    const h = 110 + items.length * 78;
    const k = E.se(t, t0, t0 + 0.6, 'out'); if (k <= 0) return;
    E.layer(ctx, k, c => {
      const card = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
      c.save(); c.shadowColor = 'rgba(60,20,10,0.25)'; c.shadowBlur = 24; P.fillPts(c, card, '#FBF2EC'); c.restore();
      stroke(c, card, { w: 3.2, closed: true, color: RED, seed: 2520 });
      c.save(); c.font = '700 48px Kalam'; c.fillStyle = RED; c.textAlign = 'center'; c.fillText('⚠  GÜVENLİK', x + w / 2, y + 64); c.restore();
      line(c, [x + 30, y + 86], [x + w - 30, y + 80], { w: 3, color: RED, dry: false });
      items.forEach((it, i) => {
        const at = t0 + 0.6 + i * (o.step ?? 0.9); const yy = y + 150 + i * 78;
        if (t > at) { c.save(); c.globalAlpha *= E.se(t, at, at + 0.3); P.fillPts(c, circlePts(x + 46, yy - 14, 13, 13, 18), RED, 0.85); c.restore(); }
        P.write(c, it, x + 76, yy, E.seg(t, at, at + 0.8), { size: o.size ?? 40, color: i === (o.hi ?? -1) ? RED : PAL.ink });
      });
    });
  };

  // ---------- başlık / sıradaki / bitiş ----------
  K.title = (ctx, t, line2, unit) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, line2, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 7. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  K.end = (ctx, t, line2, codes) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, line2, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // Sıra sende kartı (k: görünürlük, satırlar el yazısıyla açılır)
  K.task = (ctx, t, t0, t1, head, lines, o = {}) => {
    const rk = Math.min(E.se(t, t0, t0 + 0.7, 'out'), 1 - E.se(t, t1 - 0.4, t1 + 0.3)); if (rk <= 0) return;
    E.layer(ctx, rk, c => {
      const x = o.x ?? 300, y = o.y ?? 180, w = o.w ?? 1320, h = o.h ?? 560;
      const card = [[x, y + 10], [x + w, y], [x + w + 10, y + h], [x + 10, y + h + 12], [x, y + 10]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true, seed: 2601 });
      P.write(c, head, x + 70, y + 110, E.seg(t, t0 + 0.4, t0 + 1.3), { size: 68, color: AMBER });
      lines.forEach((l, i) => {
        const a = t0 + 1.2 + i * (o.step ?? 1.0), yy = y + 200 + i * (o.lh ?? 72);
        if (typeof l === 'string') P.write(c, l, x + 80, yy, E.seg(t, a, a + 1.0), { size: o.size ?? 44 });
        else K.rich(c, l, x + 80, yy, o.size ?? 44, { k: E.seg(t, a, a + 1.0) });
      });
    });
  };

  // ---------- ayırma düzenekleri ----------
  // süzme hunisi + süzgeç kâğıdı: huni ağzı orta (cx, top)
  K.funnel = (ctx, cx, top, s = 1, o = {}) => {
    ctx.save(); ctx.translate(cx, top); ctx.scale(s, s);
    const cone = [[-90, 0], [-12, 110], [-12, 190], [12, 190], [12, 110], [90, 0]];
    if (o.paper !== false) { const pp = [[-78, 6], [0, 104], [78, 6]]; P.fillPts(ctx, pp, '#FFFDF6', 0.95); stroke(ctx, pp, { w: 1.6, dry: false, seed: 2401, alpha: 0.7 }); }
    if (o.fill > 0) { const yy = 104 - 90 * o.fill; const f = [[-78 * (104 - yy) / 98, yy], [0, 104], [78 * (104 - yy) / 98, yy]]; P.fillPts(ctx, f, o.fillCol ?? '#C9D9E2', 0.9); }
    if (o.residue > 0) { const f = [[-30 * o.residue, 104 - 34 * o.residue], [0, 104], [30 * o.residue, 104 - 34 * o.residue]]; P.fillPts(ctx, f, '#C9A56A', 0.95); }
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = PAL.white; P.path(ctx, cone); ctx.fill(); ctx.restore();
    stroke(ctx, cone, { w: 3, seed: 2402 });
    ctx.restore();
  };
  // ayırma hunisi: gövde merkezi (cx, cy); water/oil: 0..1 miktar; tap: musluk açık mı
  K.sepFunnel = (ctx, cx, cy, s, water, oil, tap, t) => {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
    // body: pear shape from y=-160 (neck) to y=120 (stem start)
    const body = []; for (let i = 0; i <= 40; i++) { const u = i / 40, y = -150 + u * 270; const r = 20 + 110 * Math.sin(Math.pow(u, 0.8) * Math.PI) * (1 - 0.75 * u) + (u > 0.9 ? 0 : 0); body.push([r, y]); }
    const right = body, left = body.map(p => [-p[0], p[1]]).reverse();
    const shape = right.concat(left);
    // liquids (fill by clip)
    const total = water + oil; const yb = 120, ytop = yb - 250 * Math.min(1, total * 0.85);
    ctx.save(); P.path(ctx, shape); ctx.closePath(); ctx.clip();
    const wTop = yb - 250 * Math.min(1, water * 0.85);
    if (water > 0) { ctx.fillStyle = 'rgba(46,106,140,0.35)'; ctx.fillRect(-150, wTop, 300, yb - wTop + 4); }
    if (oil > 0) { ctx.fillStyle = 'rgba(214,176,52,0.6)'; ctx.fillRect(-150, ytop, 300, wTop - ytop); stroke(ctx, [[-140, wTop], [140, wTop]], { w: 2, color: '#9C7E1E', dry: false }); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.1; ctx.fillStyle = PAL.white; P.path(ctx, shape); ctx.fill(); ctx.restore();
    stroke(ctx, shape, { w: 3.2, seed: 2410 });
    // neck + stopper
    stroke(ctx, [[-20, -150], [-20, -190]], { w: 3, dry: false }); stroke(ctx, [[20, -150], [20, -190]], { w: 3, dry: false });
    P.fillPts(ctx, [[-24, -190], [24, -190], [20, -215], [-20, -215]], '#8A8378', 0.9);
    // stem + tap
    stroke(ctx, [[-8, 120], [-8, 230]], { w: 3, dry: false }); stroke(ctx, [[8, 120], [8, 230]], { w: 3, dry: false });
    const tp = [[-26, 150], [26, 150], [26, 170], [-26, 170], [-26, 150]]; P.fillPts(ctx, tp, '#6B6460', 0.9); stroke(ctx, tp, { w: 2, closed: true, dry: false });
    line(ctx, [0, 160], tap ? [0, 132] : [36, 160], { w: 6, dry: false, taper: 0.02 });
    if (tap && water > 0.02) { const r = rng(2420); for (let i = 0; i < 6; i++) { const u = ((t * 1.6 + i / 6) % 1); ctx.save(); ctx.fillStyle = 'rgba(46,106,140,0.6)'; ctx.beginPath(); ctx.ellipse(0, 236 + u * 110, 4, 7, 0, 0, 7); ctx.fill(); ctx.restore(); } }
    ctx.restore();
  };
  // buharlaştırma kabı (porselen kapsül): üst orta (cx, y)
  K.dish = (ctx, cx, y, w, water, salt, t) => {
    const ry = w * 0.28;
    if (water > 0) { const wl = y + ry * (1 - water); const pts = P.arc(cx, y, w / 2 - 5, 0, Math.PI, 40, ry - 5).filter(p => p[1] >= wl); if (pts.length > 2) { P.fillPts(ctx, pts, '#BFD4DF', 0.9); stroke(ctx, [[pts[pts.length - 1][0], wl], [pts[0][0], wl]], { w: 1.6, color: PAL.water, dry: false, alpha: 0.7 }); } }
    if (salt > 0) { const r = rng(2430); ctx.save(); ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#6F8FA0'; ctx.lineWidth = 1.2; for (let i = 0; i < 46 * salt; i++) { const u = (r() - 0.5) * 1.6; const x = cx + u * (w / 2 - 14), yy = y + ry * Math.sqrt(Math.max(0, 1 - u * u)) * (0.62 + 0.3 * r()); ctx.beginPath(); ctx.rect(x - 3.5, yy - 3.5, 7, 7); ctx.fill(); ctx.stroke(); } ctx.restore(); }
    const bowl = P.arc(cx, y, w / 2, 0, Math.PI, 30, ry);
    P.fillPts(ctx, bowl, PAL.white, 0.2);
    stroke(ctx, bowl, { w: 3.2, seed: 2431 }); stroke(ctx, [[cx - w / 2 - 6, y], [cx + w / 2 + 6, y - 2]], { w: 3, seed: 2432, dry: false });
  };
  // elek: merkez (cx, cy)
  K.sieve = (ctx, cx, cy, w, t, o = {}) => {
    const rim = circlePts(cx, cy, w / 2, w * 0.16, 40);
    ctx.save(); P.path(ctx, rim); ctx.clip(); ctx.globalAlpha *= 0.35; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1;
    for (let x = cx - w / 2; x < cx + w / 2; x += 9) { ctx.beginPath(); ctx.moveTo(x, cy - w); ctx.lineTo(x, cy + w); ctx.stroke(); }
    for (let y = cy - w * 0.2; y < cy + w * 0.2; y += 6) { ctx.beginPath(); ctx.moveTo(cx - w, y); ctx.lineTo(cx + w, y); ctx.stroke(); }
    ctx.restore();
    stroke(ctx, rim, { w: 4, closed: true, seed: 2440 });
    stroke(ctx, P.arc(cx, cy, w / 2, 0, Math.PI, 30, w * 0.16).map(p => [p[0], p[1] + 30]), { w: 3, seed: 2441 });
    line(ctx, [cx - w / 2, cy], [cx - w / 2, cy + 30], { w: 3, dry: false }); line(ctx, [cx + w / 2, cy], [cx + w / 2, cy + 30], { w: 3, dry: false });
  };
  // mıknatıs (U): merkez (cx, cy)
  K.magnet = (ctx, cx, cy, s = 1) => {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
    const outer = P.arc(0, 0, 60, Math.PI, 0, 24).reverse(); const u = [[-60, 70]].concat(P.arc(0, 0, 60, Math.PI, 2 * Math.PI, 24)).concat([[60, 70], [30, 70]]).concat(P.arc(0, 0, 30, 2 * Math.PI, Math.PI, 24)).concat([[-30, 70], [-60, 70]]);
    P.fillPts(ctx, u, '#9A9387', 0.9); stroke(ctx, u, { w: 3, closed: true, seed: 2450 });
    P.fillPts(ctx, [[-60, 40], [-30, 40], [-30, 70], [-60, 70]], '#FBF8F1', 0.95); P.fillPts(ctx, [[30, 40], [60, 40], [60, 70], [30, 70]], '#FBF8F1', 0.95);
    ctx.font = '700 24px Kalam'; ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.fillText('N', -45, 64); ctx.fillText('S', 45, 64);
    ctx.restore();
  };

  G.K7 = K;
})(window);

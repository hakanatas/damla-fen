// props.js — Film 19'a özel çizim yardımcıları (window.F19)
// beher, ısıtıcı, büyük termometre ölçeği, deney saati, sıcaklık-zaman verisi
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, dashed, hatch } = G.INK;
  const HEAT = '#B5553F', ICE = '#6FA6C4', RED = '#A23A2A';
  const F = { HEAT, ICE, RED };

  // ---------- Deney verisi (örnek; ölçekli değildir) ----------
  // Sıcaklık (°C) — süre (dk): buz −10 °C → 1. dk 0 °C, 1–5 dk erime (0 °C sabit), 5–10 dk su 20 °C/dk ısınır, 10. dk'dan sonra ≈100 °C kaynama
  F.T = m => m < 1 ? -10 + 10 * m : m < 5 ? 0 : m < 10 ? (m - 5) * 20 : 100;
  F.ice = m => m < 1 ? 1 : m < 5 ? 1 - (m - 1) / 4 : 0;
  F.ROWS = [[0, 'buz'], [2, 'buz eriyor'], [4, 'buz eriyor'], [6, 'su, buharlaşıyor'], [8, 'su, buharlaşıyor'], [10, 'su kaynıyor'], [12, 'su kaynıyor']];
  // piecewise-linear map through keyframes [[t, v], ...] (monotonic)
  F.pw = (x, K) => { if (x <= K[0][0]) return K[0][1]; for (let i = 1; i < K.length; i++) if (x <= K[i][0]) { const a = K[i - 1], b = K[i]; return b[0] === a[0] ? b[1] : a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } return K[K.length - 1][1]; };
  F.inv = (v, K) => { for (let i = 1; i < K.length; i++) if (v <= K[i][1] && K[i][1] > K[i - 1][1]) { const a = K[i - 1], b = K[i]; if (v < a[1]) return a[0]; return a[0] + (b[0] - a[0]) * (v - a[1]) / (b[1] - a[1]); } for (let i = 0; i < K.length; i++) if (K[i][1] >= v) return K[i][0]; return K[K.length - 1][0]; };

  // ---------- Isıtıcı (elektrikli ısıtıcı tabla) ----------
  F.heater = (ctx, cx, top, w, heat = 0, t = 0) => {
    const h = 86;
    const body = [[cx - w / 2, top + 14], [cx + w / 2, top + 12], [cx + w / 2 + 10, top + h], [cx - w / 2 - 10, top + h + 2], [cx - w / 2, top + 14]];
    P.fillPts(ctx, body, '#D9CDB4'); wash(ctx, body, '#8A6A45', 0.3, 1901, { bleed: 1, blooms: 1 });
    stroke(ctx, body, { w: 3, closed: true, seed: 1902 });
    const plate = [[cx - w / 2 + 16, top], [cx + w / 2 - 16, top - 2], [cx + w / 2 - 6, top + 14], [cx - w / 2 + 6, top + 15], [cx - w / 2 + 16, top]];
    P.fillPts(ctx, plate, '#4A4550'); stroke(ctx, plate, { w: 2.6, closed: true, seed: 1903 });
    if (heat > 0) { // glow of the plate
      ctx.save(); ctx.globalAlpha = heat * (0.75 + 0.1 * Math.sin(t * 5));
      const g = ctx.createRadialGradient(cx, top + 6, 4, cx, top + 6, w * 0.55); g.addColorStop(0, 'rgba(210,90,50,0.95)'); g.addColorStop(1, 'rgba(210,90,50,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - w / 2, top - 30, w, 50); ctx.restore();
    }
    // knob + light
    stroke(ctx, circlePts(cx + w / 2 - 50, top + 52, 17, 17, 24), { w: 2.6, closed: true, seed: 1904 });
    line(ctx, [cx + w / 2 - 50, top + 52], [cx + w / 2 - 50 + 12 * Math.cos(-2 + heat * 2.4), top + 52 + 12 * Math.sin(-2 + heat * 2.4)], { w: 3, dry: false });
    ctx.save(); ctx.fillStyle = heat > 0 ? HEAT : '#8b8378'; ctx.beginPath(); ctx.arc(cx - w / 2 + 44, top + 52, 8, 0, 7); ctx.fill(); ctx.restore();
    stroke(ctx, circlePts(cx - w / 2 + 44, top + 52, 8, 8, 16), { w: 1.8, closed: true, dry: false });
  };

  // ---------- Beher: bottom center (cx, by), w × h ----------
  // o: level (0..1 su), ice (0..1 buz miktarı), steam (0..1), boil (0..1), t, drops (yoğuşma damlacıkları)
  F.beaker = (ctx, cx, by, w, h, o = {}) => {
    const t = o.t ?? 0, L = cx - w / 2, R = cx + w / 2, top = by - h;
    const inner = y => [L + 6, y];
    // water
    const lev = o.level ?? 0;
    const wy = by - 8 - lev * (h - 30);
    if (lev > 0) {
      const wave = []; for (let i = 0; i <= 24; i++) { const x = L + 7 + (w - 14) * i / 24; wave.push([x, wy + Math.sin(i * 0.9 + t * (2 + 6 * (o.boil ?? 0))) * (1.5 + 3 * (o.boil ?? 0))]); }
      const wp = wave.concat([[R - 7, by - 10], [cx, by - 6], [L + 7, by - 10]]);
      P.fillPts(ctx, wp, '#DCE8EE', 0.9); wash(ctx, wp, PAL.water, 0.32, 1911, { bleed: 1.2, blooms: 1 });
      stroke(ctx, wave, { w: 2, color: PAL.water, dry: false, alpha: 0.8 });
    }
    // ice cubes (bottom-heavy pile, shrink with melting)
    const ice = o.ice ?? 0;
    if (ice > 0.01) {
      const r = rng(1920); const n = 7;
      for (let i = 0; i < n; i++) {
        const row = i < 4 ? 0 : 1; const col = row === 0 ? i : i - 4;
        const s0 = 44 + r() * 10, s = s0 * Math.sqrt(ice) * (0.9 + 0.2 * r());
        const x = L + 30 + col * ((w - 60) / (row === 0 ? 3 : 2.3)) + (row ? 30 : 0) + (r() - 0.5) * 10;
        const floatY = lev > 0 ? Math.min(by - 14 - s / 2 - row * 44, wy + s * 0.15) : by - 14 - s / 2 - row * 44;
        const y = Math.max(floatY, by - 14 - s / 2 - row * 44 * Math.max(0, 1 - lev * 0.5));
        const a = (r() - 0.5) * 0.5;
        ctx.save(); ctx.translate(x, y); ctx.rotate(a);
        const cube = [[-s / 2, -s / 2 + 3], [-s / 2 + 3, -s / 2], [s / 2 - 3, -s / 2], [s / 2, -s / 2 + 3], [s / 2, s / 2 - 3], [s / 2 - 3, s / 2], [-s / 2 + 3, s / 2], [-s / 2, s / 2 - 3], [-s / 2, -s / 2 + 3]];
        P.fillPts(ctx, cube, '#F2F7FA', 0.95); wash(ctx, cube, ICE, 0.45, 1930 + i, { bleed: 0.6, blooms: 0 });
        stroke(ctx, cube, { w: 2, closed: true, seed: 1940 + i, dry: false });
        line(ctx, [-s * 0.3, -s * 0.25], [-s * 0.05, -s * 0.33], { w: 2, color: PAL.white, dry: false });
        ctx.restore();
      }
    }
    // boiling bubbles
    const boil = o.boil ?? 0;
    if (boil > 0 && lev > 0) {
      const r = rng(1950);
      for (let i = 0; i < 26 * boil; i++) {
        const x0 = L + 20 + r() * (w - 40), sp = 70 + r() * 90, ph = r();
        const u = ((t * sp / (by - wy) + ph) % 1); const y = by - 12 - u * (by - 12 - wy);
        const rad = 3 + u * 7 + r() * 3;
        ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = 'rgba(251,248,241,0.8)'; ctx.beginPath(); ctx.arc(x0 + Math.sin(t * 6 + i) * 3, y, rad, 0, 7); ctx.fill(); ctx.restore();
        stroke(ctx, circlePts(x0 + Math.sin(t * 6 + i) * 3, y, rad, rad, 14), { w: 1.3, closed: true, dry: false, color: PAL.water, seed: 1960 + i });
      }
    }
    // glass
    const glass = [[L - 8, top - 4], [L, top + 6], [L + 2, by - 16], [L + 16, by], [R - 16, by], [R - 2, by - 16], [R, top + 6], [R + 8, top - 4]];
    ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = PAL.white; P.path(ctx, glass); ctx.fill(); ctx.restore();
    stroke(ctx, glass, { w: 3.4, seed: 1970 });
    for (let i = 1; i <= 4; i++) line(ctx, [L + 4, by - 20 - i * (h - 40) / 5], [L + 26, by - 20 - i * (h - 40) / 5], { w: 1.6, dry: false, alpha: 0.7, seed: 1971 + i });
    line(ctx, [R - 22, top + 30], [R - 18, by - 50], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    // condensation drops on the outside
    if (o.drops) { const r = rng(1980); for (let i = 0; i < 18 * o.drops; i++) { const side = r() < 0.5 ? L - 2 : R + 2, y = top + 30 + r() * (h - 50); ctx.save(); ctx.fillStyle = 'rgba(46,106,140,0.55)'; ctx.beginPath(); ctx.ellipse(side, y, 3.4, 4.6, 0, 0, 7); ctx.fill(); ctx.restore(); } }
    // steam wisps
    const steam = o.steam ?? 0;
    if (steam > 0) F.steam(ctx, cx, top + 4, w * 0.8, o.steamH ?? (130 + 70 * steam), steam, t, 1990);
    return { wy, top };
  };
  F.steam = (ctx, cx, y, w, hgt, k, t, seed = 1) => {
    const r = rng(seed); const n = 3 + Math.round(4 * k);
    for (let i = 0; i < n; i++) {
      const x0 = cx - w / 2 + w * (i + 0.5) / n + (r() - 0.5) * 16; const ph = r() * 6, sp = 0.35 + r() * 0.25;
      const u0 = (t * sp + r()) % 1;
      const p = []; for (let j = 0; j <= 26; j++) { const u = j / 26; p.push([x0 + Math.sin(u * 7 + t * 2.2 + ph) * 12 * (0.4 + u), y - 10 - u * hgt * (0.6 + 0.4 * k)]); }
      ctx.save(); ctx.globalAlpha = Math.min(1, k * 1.3) * (0.55 - 0.25 * Math.abs(u0 - 0.5));
      stroke(ctx, p, { w: 3, color: '#8FA9B8', seed: seed + i, dry: false, taper: 0.45 });
      ctx.restore();
    }
  };

  // ---------- büyük termometre ölçeği ----------
  // x: tüp merkezi, y0: üst (max), y1: alt (min), T: sıcaklık
  F.thermo = (ctx, x, y0, y1, T, o = {}) => {
    const min = o.min ?? -20, max = o.max ?? 110, yOf = v => y1 - (v - min) / (max - min) * (y1 - y0);
    const tw = o.tw ?? 18, br = o.br ?? 30;
    const tube = [[x - tw, y1 + 8], [x - tw, y0 - 6], ...P.arc(x, y0 - 6, tw, Math.PI, 2 * Math.PI, 12), [x + tw, y1 + 8]];
    P.fillPts(ctx, tube.concat(P.arc(x, y1 + br + 4, br, -1.0, Math.PI + 1.0, 20).reverse()), PAL.white, 0.95);
    // liquid
    const ly = yOf(Math.max(min, Math.min(max, T)));
    P.fillPts(ctx, [[x - 7, y1 + 10], [x - 7, ly], [x + 7, ly], [x + 7, y1 + 10]], HEAT, 0.9);
    P.fillPts(ctx, circlePts(x, y1 + br + 4, br - 7, br - 7, 30), HEAT, 0.9);
    stroke(ctx, tube, { w: 3, seed: 2001 });
    stroke(ctx, P.arc(x, y1 + br + 4, br, -1.0, Math.PI + 1.0, 30).reverse(), { w: 3, seed: 2002 });
    for (let v = min; v <= max; v += 10) {
      const y = yOf(v), big = v % 50 === 0 || v === 0 || v === 100;
      line(ctx, [x - tw - (big ? 22 : 12), y], [x - tw - 2, y], { w: big ? 2.4 : 1.6, dry: false, seed: 2010 + v });
      if (o.labels !== false && (v % 20 === 0 || v === 100 || v === -10)) { if (v === 100 || v % 20 === 0) INK.label(ctx, String(v).replace('-', '−'), x - tw - 30, y + 10, { size: v === 0 || v === 100 ? 34 : 28, weight: v === 0 || v === 100 ? 700 : 400, align: 'right', rot: 0 }); }
    }
    INK.label(ctx, '°C', x, y0 - 40, { size: 32, weight: 700, align: 'center', rot: 0 });
    return { yOf, ly };
  };
  F.fmtT = v => (Math.round(v) < 0 ? '−' + Math.abs(Math.round(v)) : String(Math.round(v))) + ' °C';

  // ---------- kutu / kart ----------
  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 2100 });
    return c;
  };

  G.F19 = F;
})(window);

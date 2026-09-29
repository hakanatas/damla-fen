// props.js — 8. sınıf Filmler 16–17 (asitler, bazlar, pH) çizim yardımcıları → window.U5
// Aynı dosya 16-asit-baz ve 17-ph klasörlerinde birebir kopyadır.
// Temel: films-8/14-kimyasal-degisim/props.js (U5: kart, tezgâh, güvenlik kartı, başlık/bitiş, görev, kayıt) — sadeleştirildi.
// Yeni: beher, turnusol şeridi, mor lahana renk skalası, pH cetveli, GHS uyarı işaretleri, gözlük/eldiven, ürün şişesi.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts } = G.INK;
  const HEAT = '#B5553F', RED = '#A23A2A', AMBER = '#8A4A10', SUB = '#C07F1E';
  const U = { HEAT, RED, AMBER, SUB };

  U.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  U.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillText(s, x, y); ctx.restore(); };

  // ---------- renk yardımcıları ----------
  const hx = h => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  U.mix = (a, b, k) => { const A = hx(a), B = hx(b); k = Math.max(0, Math.min(1, k)); const c = A.map((v, i) => Math.round(v + (B[i] - v) * k)); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); };
  function shade(hex, f) { const [r, g, b] = hx(hex); const m = v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f); return `rgb(${m(r)},${m(g)},${m(b)})`; }
  U.shade = shade;
  // turnusol kâğıdı renkleri
  U.LIT = { red: '#C8374A', blue: '#3D6FBE' };
  // mor lahana suyu: pH → renk (kırmızı → pembe → mor → mavi → yeşil → sarı)
  const CAB = [[0, '#B81A33'], [2, '#C8233F'], [3.5, '#D8467E'], [5, '#A0519E'], [7, '#6E4FA2'], [8, '#4263B8'], [9.5, '#2F8F96'], [11, '#3E9A4A'], [12.5, '#9CB63A'], [14, '#DCC232']];
  U.cab = ph => { for (let i = 1; i < CAB.length; i++) if (ph <= CAB[i][0]) return U.mix(CAB[i - 1][1], CAB[i][1], (ph - CAB[i - 1][0]) / (CAB[i][0] - CAB[i - 1][0])); return CAB[CAB.length - 1][1]; };
  U.CABBAGE = '#6E4FA2';
  U.PINK = '#E0579A';   // fenolftalein (bazda pembe)
  U.ACID = '#B8406E'; U.BASE = '#3D6FBE';   // başlık renkleri (asit / baz)
  // deney örnekleri: ad, doğal renk, mor lahana suyuyla renk (yaklaşık pH: 2, 3, 6,7, 7, 8,3, ~10)
  U.SAMP = [
    { name: 'limon suyu', col: '#F1E08A', cab: '#C8233F' },
    { name: 'sirke', col: '#EFE3C4', cab: '#D8467E' },
    { name: 'süt', col: '#FFFFFF', cab: '#9C86C8' },
    { name: 'saf su', col: '#D3E5EE', cab: '#6E4FA2' },
    { name: 'karbonatlı su', col: '#E2EAEE', cab: '#3F63B8' },
    { name: 'sabunlu su', col: '#ECEFF0', cab: '#3E9A4A' }
  ];
  U.MO = { red: '#C8323A', yellow: '#E6BE34' };  // metil oranj

  U.ball = (ctx, x, y, r, fill, o = {}) => {
    const A0 = ctx.globalAlpha; ctx.save();
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
    g.addColorStop(0, '#FFFDF6'); g.addColorStop(0.25, fill); g.addColorStop(1, shade(fill, -0.32));
    ctx.fillStyle = g; ctx.globalAlpha = A0 * (o.alpha ?? 1); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.2, Math.min(3.2, r * 0.07)); ctx.stroke();
    ctx.restore();
  };
  // iyon yazımı: H + üst simge
  U.ion = (ctx, sym, ch, x, y, size, o = {}) => {
    ctx.save(); ctx.font = `700 ${size}px Kalam`; const w1 = ctx.measureText(sym).width; ctx.font = `700 ${size * 0.62}px Kalam`; const w2 = ctx.measureText(ch).width;
    const W = w1 + w2 + 4; const x0 = o.align === 'center' ? x - W / 2 : x;
    ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillStyle = o.color ?? PAL.ink; ctx.textAlign = 'left';
    ctx.font = `700 ${size}px Kalam`; ctx.fillText(sym, x0, y);
    ctx.font = `700 ${size * 0.62}px Kalam`; ctx.fillStyle = o.chColor ?? o.color ?? PAL.ink; ctx.fillText(ch, x0 + w1 + 4, y - size * 0.42);
    ctx.restore(); return W;
  };
  // alt simgeli formül: 'H2SO4' → rakamlar alt simge; '(OH)2' desteklenir
  U.formula = (ctx, f, x, y, size, o = {}) => {
    ctx.save(); ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillStyle = o.color ?? PAL.ink; ctx.textAlign = 'left';
    const parts = []; for (const ch of f) parts.push(/[0-9]/.test(ch) ? [ch, 1] : [ch, 0]);
    let W = 0; parts.forEach(([c, sub]) => { ctx.font = `700 ${sub ? size * 0.62 : size}px Kalam`; W += ctx.measureText(c).width; });
    let cx = o.align === 'center' ? x - W / 2 : o.align === 'right' ? x - W : x;
    parts.forEach(([c, sub]) => { ctx.font = `700 ${sub ? size * 0.62 : size}px Kalam`; ctx.fillText(c, cx, y + (sub ? size * 0.2 : 0)); cx += ctx.measureText(c).width; });
    ctx.restore(); return W;
  };

  // ---------- kart / tezgâh ----------
  U.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    if (o.tint) wash(ctx, c, o.tint, o.tintA ?? 0.18, o.seed ?? 2100, { bleed: 1, blooms: 0 });
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 2100 });
    return c;
  };
  U.bench = (ctx, x0, x1, y, seed = 1500) => {
    const b = [[x0, y], [x1, y - 4], [x1 + 10, y + 40], [x0 - 10, y + 44], [x0, y]];
    P.fillPts(ctx, b, '#E3D3B3'); wash(ctx, b, '#8A6A45', 0.4, seed, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: seed + 1 });
  };
  U.stamp = (ctx, x, y, txt, col, k, o = {}) => {
    if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.08); ctx.scale(k, k);
    ctx.font = `700 ${o.size ?? 36}px Kalam`; const w = ctx.measureText(txt).width / 2 + 24;
    P.fillPts(ctx, U.rect(-w, -32, w, 32), '#FBF8F1', 0.85);
    stroke(ctx, U.rect(-w, -32, w, 32), { w: 3.4, closed: true, color: col, dry: false }); U.txt(ctx, txt, 0, 13, { size: o.size ?? 36, align: 'center', color: col }); ctx.restore();
  };

  // ---------- beher (cam) ----------
  // o: liq (renk), lvl 0..1, name, bub 0..1 (kabarcık), t, seed, solid(ctx, cx, bottomY, s) içerideki katı
  U.beaker = (ctx, cx, by, s, o = {}) => {
    const w = 150 * s, h = 190 * s, x0 = cx - w / 2, x1 = cx + w / 2, top = by - h;
    const body = [[x0 - 8 * s, top], [x0, top + 10 * s], [x0 + 2 * s, by - 10 * s], [x0 + 12 * s, by], [x1 - 12 * s, by], [x1 - 2 * s, by - 10 * s], [x1, top + 10 * s], [x1 + 8 * s, top - 2 * s]];
    const lvl = o.lvl ?? 0.6, ly = by - 6 * s - (h - 20 * s) * lvl;
    ctx.save(); P.path(ctx, body); ctx.closePath(); ctx.clip();
    ctx.globalAlpha *= 0.14; ctx.fillStyle = '#DCE7EC'; ctx.fillRect(x0 - 10, top - 10, w + 20, h + 20);
    ctx.restore();
    if (o.solid) o.solid(ctx, cx, by - 8 * s, s);
    if (o.liq && lvl > 0) {
      const liq = [[x0 + 1 * s, ly], [x1 - 1 * s, ly], [x1 - 2 * s, by - 10 * s], [x1 - 12 * s, by - 2 * s], [x0 + 12 * s, by - 2 * s], [x0 + 2 * s, by - 10 * s], [x0 + 1 * s, ly]];
      P.fillPts(ctx, liq, o.liq, o.liqA ?? 0.55);
      wash(ctx, liq, o.liq, o.washA ?? 0.5, o.seed ?? 4100, { bleed: 1.2 * s, blooms: 1 });
      line(ctx, [x0 + 2 * s, ly], [x1 - 2 * s, ly], { w: 2, dry: false, color: shade(o.liq, -0.3), alpha: 0.8 });
    }
    if (o.bub > 0 && o.liq) {
      const r = rng(o.seed ?? 4101);
      for (let i = 0; i < 14; i++) {
        const u = ((o.t ?? 0) * (0.5 + r() * 0.5) + r()) % 1, bx = cx + (r() - 0.5) * w * 0.55, byy = by - 30 * s - u * (by - 30 * s - ly);
        ctx.save(); ctx.globalAlpha *= o.bub * (1 - u * 0.5); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1.6; ctx.fillStyle = 'rgba(251,248,241,0.8)'; ctx.beginPath(); ctx.arc(bx, byy, (3 + r() * 4) * s, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
      }
    }
    // dereceler
    for (let i = 1; i <= 3; i++) { const yy = by - h * (0.22 * i); line(ctx, [x0 + 8 * s, yy], [x0 + 30 * s, yy], { w: 1.6, dry: false, alpha: 0.5 }); }
    stroke(ctx, body, { w: 2.8 * Math.max(0.7, s), seed: o.seed ?? 4102 });
    line(ctx, [x1 - 16 * s, top + 30 * s], [x1 - 14 * s, by - 40 * s], { w: 3, color: PAL.white, dry: false, alpha: 0.7 });
    if (o.name) U.txt(ctx, o.name, cx, by + (o.nameDy ?? 44) * Math.max(0.8, s), { size: o.nameSize ?? 32, align: 'center' });
    return { top, ly };
  };

  // ---------- turnusol şeridi ----------
  // (x, y): üst orta; base: kuru renk, col: ıslak renk, wet: ıslak bölüm oranı, k: renk değişimi 0..1
  U.strip = (ctx, x, y, w, h, base, col, wet, k, o = {}) => {
    const r = U.rect(x - w / 2, y, x + w / 2, y + h);
    P.fillPts(ctx, r, '#FBF8F1'); wash(ctx, r, base, 0.85, o.seed ?? 4200, { bleed: 0.6, blooms: 0 });
    if (wet > 0) { const wr = U.rect(x - w / 2, y + h * (1 - wet), x + w / 2, y + h); wash(ctx, wr, U.mix(base, col, k), 0.95, (o.seed ?? 4200) + 1, { bleed: 0.8, blooms: 1 }); if (k > 0.05) P.fillPts(ctx, wr, U.mix(base, col, k), 0.35 * k); }
    stroke(ctx, r, { w: 2, closed: true, dry: false, seed: (o.seed ?? 4200) + 2 });
  };
  // cımbız (şeridi tutan)
  U.tweezer = (ctx, x, y, s = 1) => {
    line(ctx, [x - 8 * s, y + 10 * s], [x - 26 * s, y - 120 * s], { w: 5 * s, color: '#8C9198', dry: false });
    line(ctx, [x + 8 * s, y + 10 * s], [x + 26 * s, y - 120 * s], { w: 5 * s, color: '#8C9198', dry: false });
    line(ctx, [x - 26 * s, y - 120 * s], [x + 26 * s, y - 120 * s], { w: 5 * s, color: '#8C9198', dry: false });
  };

  // ---------- GHS uyarı işaretleri ----------
  U.ghs = (ctx, x, y, s, kind) => {
    const d = 90 * s, dia = [[x, y - d], [x + d, y], [x, y + d], [x - d, y], [x, y - d]];
    P.fillPts(ctx, dia, '#FFFFFF');
    ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 12 * s; ctx.lineJoin = 'round'; P.path(ctx, dia); ctx.closePath(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = PAL.ink; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 3;
    if (kind === 'corr') {
      // iki tüpten damlayan sıvı: solda yüzey, sağda el aşınıyor
      [[-26, -48, 0.5], [26, -48, -0.5]].forEach(([tx, ty, a]) => { ctx.save(); ctx.translate(tx, ty); ctx.rotate(a); ctx.strokeRect(-7, -22, 14, 34); ctx.restore(); });
      [[-18, -14], [-18, 0], [18, -14], [18, 0]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(dx, dy, 3.2, 0, 7); ctx.fill(); });
      ctx.beginPath(); ctx.moveTo(-50, 22); ctx.lineTo(-24, 22); ctx.lineTo(-20, 16); ctx.lineTo(-14, 22); ctx.lineTo(-6, 22); ctx.lineTo(-6, 36); ctx.lineTo(-50, 36); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(6, 36); ctx.lineTo(6, 24); ctx.lineTo(14, 20); ctx.lineTo(20, 26); ctx.lineTo(26, 18); ctx.lineTo(34, 24); ctx.lineTo(50, 24); ctx.lineTo(50, 36); ctx.closePath(); ctx.fill();
      ctx.fillRect(-56, 40, 112, 6);
    } else {
      ctx.fillRect(-7, -48, 14, 58); ctx.beginPath(); ctx.arc(0, 30, 9, 0, 7); ctx.fill();
    }
    ctx.restore();
  };
  U.goggles = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const L = circlePts(-40, 0, 34, 26, 28), R = circlePts(40, 0, 34, 26, 28);
    [L, R].forEach((c, i) => { P.fillPts(ctx, c, '#CFE3EC', 0.8); stroke(ctx, c, { w: 4, closed: true, dry: false, seed: 4300 + i }); });
    line(ctx, [-8, -4], [8, -4], { w: 5, dry: false }); line(ctx, [-74, -4], [-96, -10], { w: 5, dry: false }); line(ctx, [74, -4], [96, -10], { w: 5, dry: false });
    ctx.restore();
  };
  U.glove = (ctx, x, y, s = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const g = [[-34, 60], [-36, -10], [-48, -34], [-40, -42], [-26, -24], [-26, -66], [-16, -70], [-10, -34], [-8, -76], [2, -78], [6, -34], [10, -70], [20, -68], [20, -30], [28, -56], [38, -52], [32, 0], [30, 60], [-34, 60]];
    P.fillPts(ctx, g, '#8FC1A6'); wash(ctx, g, '#3E7F5C', 0.3, 4310, { bleed: 1, blooms: 0 }); stroke(ctx, g, { w: 3, closed: true, dry: false, seed: 4311 });
    ctx.restore();
  };
  // ürün şişesi (etiketli) — cx, by: taban orta
  U.product = (ctx, cx, by, s, o = {}) => {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s);
    const w = o.w ?? 110, h = o.h ?? 230, nw = o.neck ?? 30;
    const body = [[-w / 2, 0], [-w / 2, -h * 0.72], [-nw, -h * 0.9], [-nw, -h], [nw, -h], [nw, -h * 0.9], [w / 2, -h * 0.72], [w / 2, 0], [-w / 2, 0]];
    P.fillPts(ctx, body, o.col ?? '#CFE3EC', 0.9); wash(ctx, body, o.col ?? '#CFE3EC', 0.45, o.seed ?? 4400, { bleed: 1, blooms: 1 });
    stroke(ctx, body, { w: 3, closed: true, seed: (o.seed ?? 4400) + 1 });
    const cap = U.rect(-nw - 4, -h - 34, nw + 4, -h); P.fillPts(ctx, cap, o.cap ?? '#4E7FA0'); stroke(ctx, cap, { w: 2.4, closed: true, dry: false });
    const lb = U.rect(-w / 2 + 10, -h * 0.62, w / 2 - 10, -h * 0.18); P.fillPts(ctx, lb, '#FBF8F1', 0.95); stroke(ctx, lb, { w: 2, closed: true, dry: false });
    if (o.label) { let z = o.lsize ?? 26; ctx.font = `700 ${z}px Kalam`; while (ctx.measureText(o.label).width > w - 26 && z > 12) { z--; ctx.font = `700 ${z}px Kalam`; } U.txt(ctx, o.label, 0, -h * 0.42, { size: z, align: 'center' }); }
    if (o.sub) U.txt(ctx, o.sub, 0, -h * 0.25, { size: o.subSize ?? 22, align: 'center', color: o.subCol ?? PAL.water });
    if (o.ghs) U.ghs(ctx, 0, -h * 0.05 - 4, 0.22, o.ghs);
    ctx.restore();
  };
  U.lemon = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const l = circlePts(0, 0, 40, 28, 28); P.fillPts(ctx, l, '#EFD34E'); wash(ctx, l, '#C9A22A', 0.3, 3050, { bleed: 1, blooms: 1 }); stroke(ctx, l, { w: 2.4, closed: true, seed: 3050 }); ctx.restore(); };
  U.halfLemon = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const l = circlePts(0, 0, 40, 40, 28); P.fillPts(ctx, l, '#F6E27A'); stroke(ctx, l, { w: 3, closed: true, seed: 3051, color: '#B8911E' }); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; line(ctx, [0, 0], [Math.cos(a) * 32, Math.sin(a) * 32], { w: 1.6, dry: false, color: '#C9A22A', alpha: 0.8 }); } ctx.restore(); };
  U.bowl = (ctx, cx, by, s, fill = '#FBF8F1') => { ctx.save(); ctx.translate(cx, by); ctx.scale(s, s); const b = P.arc(0, -50, 80, 0, Math.PI, 24, 50); P.fillPts(ctx, b, '#E9E2D0'); stroke(ctx, b, { w: 3, seed: 4410 }); const top = circlePts(0, -50, 80, 14, 30); P.fillPts(ctx, top, fill); stroke(ctx, top, { w: 2.4, closed: true, dry: false }); ctx.restore(); };
  U.soap = (ctx, cx, by, s) => { ctx.save(); ctx.translate(cx, by); ctx.scale(s, s); const b = [[-70, 0], [-76, -40], [-60, -56], [60, -56], [76, -40], [70, 0], [-70, 0]]; P.fillPts(ctx, b, '#F2D9C4'); wash(ctx, b, '#D9A07A', 0.3, 4420, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.8, closed: true, seed: 4421 }); for (let i = 0; i < 4; i++) { const c = circlePts(-30 + i * 22, -70 - (i % 2) * 14, 10, 10, 14); P.fillPts(ctx, c, '#FBF8F1', 0.9); stroke(ctx, c, { w: 1.6, closed: true, dry: false, color: PAL.water }); } ctx.restore(); };

  // ---------- pH cetveli ----------
  // x0: 0 kutusunun sol kenarı, cw: kutu genişliği; k: 0..1 açılma; o.vals (true → rakamlar)
  U.phRuler = (ctx, x0, y, cw, h, k, o = {}) => {
    for (let i = 0; i <= 14; i++) {
      const kk = Math.max(0, Math.min(1, k * 15 - i)); if (kk <= 0) continue;
      const x = x0 + i * cw, r = U.rect(x, y, x + cw, y + h);
      ctx.save(); ctx.globalAlpha *= kk;
      P.fillPts(ctx, r, U.cab(i), 0.55); wash(ctx, r, U.cab(i), 0.75, 4500 + i, { bleed: 1.4, blooms: 1 });
      stroke(ctx, r, { w: 2.2, closed: true, dry: false, seed: 4520 + i });
      U.txt(ctx, String(i), x + cw / 2, y + h + 44, { size: o.numSize ?? 38, align: 'center', color: i === 7 ? PAL.ink : PAL.ink });
      ctx.restore();
    }
  };
  U.phX = (x0, cw, ph) => x0 + cw * (ph + 0.5);

  // ---------- güvenlik kartı ----------
  U.safety = (ctx, x, y, w, items, t, t0, o = {}) => {
    const lh = o.lh ?? 78, h = 110 + items.length * lh;
    const k = Math.min(E.se(t, t0, t0 + 0.6, 'out'), o.t1 ? 1 - E.se(t, o.t1 - 0.4, o.t1) : 1); if (k <= 0) return;
    E.layer(ctx, k, c => {
      const card = [[x, y], [x + w, y - 6], [x + w + 6, y + h], [x + 4, y + h + 4], [x, y]];
      c.save(); c.shadowColor = 'rgba(60,20,10,0.25)'; c.shadowBlur = 24; P.fillPts(c, card, '#FBF2EC'); c.restore();
      stroke(c, card, { w: 3.2, closed: true, color: RED, seed: 2520 });
      c.save(); c.font = '700 48px Kalam'; c.fillStyle = RED; c.textAlign = 'center'; c.fillText(o.head ?? '⚠  GÜVENLİK', x + w / 2, y + 64); c.restore();
      line(c, [x + 30, y + 86], [x + w - 30, y + 80], { w: 3, color: RED, dry: false });
      items.forEach((it, i) => {
        const at = t0 + 0.6 + i * (o.step ?? 0.9); const yy = y + 150 + i * lh;
        if (t > at) { c.save(); c.globalAlpha *= E.se(t, at, at + 0.3); P.fillPts(c, circlePts(x + 46, yy - 14, 13, 13, 18), RED, 0.85); c.restore(); }
        P.write(c, it, x + 76, yy, E.seg(t, at, at + 0.8), { size: o.size ?? 40, color: i === (o.hi ?? -1) ? RED : PAL.ink });
      });
    });
  };

  // ---------- başlık / bitiş / görev kartı (8. sınıf) ----------
  U.title = (ctx, t, line2, unit = 5) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, line2, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.water }); ctx.restore(); }
  };
  U.end = (ctx, t, line2, codes) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, line2, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.water });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + codes + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  U.task = (ctx, t, t0, t1, head, lines, o = {}) => {
    const rk = Math.min(E.se(t, t0, t0 + 0.7, 'out'), 1 - E.se(t, t1 - 0.4, t1 + 0.3)); if (rk <= 0) return;
    E.layer(ctx, rk, c => {
      const x = o.x ?? 300, y = o.y ?? 180, w = o.w ?? 1320, h = o.h ?? 560;
      const card = [[x, y + 10], [x + w, y], [x + w + 10, y + h], [x + 10, y + h + 12], [x, y + 10]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true, seed: 2601 });
      P.write(c, head, x + 70, y + 110, E.seg(t, t0 + 0.4, t0 + 1.3), { size: 68, color: AMBER });
      lines.forEach((l, i) => { const a = t0 + 1.2 + i * (o.step ?? 1.0), yy = y + 200 + i * (o.lh ?? 72); P.write(c, l, x + 80, yy, E.seg(t, a, a + 1.0), { size: o.size ?? 44, color: o.colors && o.colors[i] ? o.colors[i] : PAL.ink }); });
    });
  };
  U.record = (ctx, t, t0, head, items, o = {}) => {
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, head, 290, 260, E.seg(t, t0 + 0.3, t0 + 1.5), { size: 62 });
    if (t > t0 + 1.5) P.drawOn(ctx, P.bez([286, 282], [700, 294], [1110, 278], 30), E.se(t, t0 + 1.5, t0 + 2.0), { w: 3, color: PAL.water });
    const st = o.step ?? 1.3;
    items.forEach((txt, i) => {
      const at = t0 + 2.0 + i * st, y = 370 + i * (o.lh ?? 84);
      const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.2, closed: true, seed: 90 + i });
      P.check(ctx, 322, y - 20, 40, E.se(t, at + 0.9, at + 1.3), { w: 5.5 });
      P.write(ctx, txt, 372, y, E.seg(t, at, at + 1.1), { size: o.size ?? 44, color: o.colors && o.colors[i] ? o.colors[i] : PAL.ink });
    });
  };
  U.damla = (ctx, t, o) => DAMLA.draw(ctx, Object.assign({ s: 1.2, view: 'q3', expr: 'neutral', look: [0.6, 0], blink: E.blink(t, o.seed ?? 3), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.4]] }, o));

  G.U5 = U;
})(window);

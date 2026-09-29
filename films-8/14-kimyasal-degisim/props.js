// props.js — 8. sınıf Ünite 5 (Filmler 13–15) ortak çizim yardımcıları → window.U5
// Aynı dosya 13-periyodik-tablo, 14-kimyasal-degisim ve 15-tepkimeler-yasam klasörlerinde birebir kopyadır.
// Kaynaklar: films-7/17-bilesik-formulleri/props.js (K7: kart, tezgâh, beher, güvenlik kartı, atom/molekül)
//            films-7/16-ilk-18-element/props.js (F7M: tablo kutucuğu, katmanlı atom). Başlık/bitiş 8. sınıfa uyarlandı.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const HEAT = '#B5553F', RED = '#A23A2A', AMBER = '#8A4A10', SUB = '#C07F1E';
  const U = { HEAT, RED, AMBER, SUB };

  // ---------- element sınıfı renkleri (kırmızı yalnızca güvenlik/YANLIŞ için ayrıldı) ----------
  U.CLS = {
    metal: { c: '#7E8FA6', name: 'metal', pl: 'Metaller' },
    ametal: { c: '#E0C25A', name: 'ametal', pl: 'Ametaller' },
    yari: { c: '#8C7BB8', name: 'yarımetal', pl: 'Yarımetaller' },
    soy: { c: '#5FA39A', name: 'soy gaz', pl: 'Soy gazlar' }
  };
  U.SYM = ('H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe ' +
    'Cs Ba La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs Mt Ds Rg Cn Nh Fl Mc Lv Ts Og').split(' ');
  const AMET = [1, 6, 7, 8, 9, 15, 16, 17, 34, 35, 53], YARI = [5, 14, 32, 33, 51, 52, 84, 85], SOY = [2, 10, 18, 36, 54, 86];
  // 113–118: yapay, özellikleri tam bilinmiyor → sınıflandırılmadan (null)
  U.clsOf = z => SOY.includes(z) ? 'soy' : AMET.includes(z) ? 'ametal' : YARI.includes(z) ? 'yari' : (z >= 113 ? null : 'metal');
  // konum: {p: periyot 1..7, c: sütun 1..18} ya da f-bloğu {f: 1|2, i: 0..14}
  U.posOf = z => {
    if (z === 1) return { p: 1, c: 1 }; if (z === 2) return { p: 1, c: 18 };
    const st = [0, 0, 3, 11, 19, 37, 55, 87];
    let p = 7; for (let k = 2; k <= 7; k++) if (z >= st[k]) p = k;
    const o = z - st[p];
    if (p <= 3) return { p, c: o < 2 ? o + 1 : o + 11 };
    if (p <= 5) return { p, c: o + 1 };
    if (o < 2) return { p, c: o + 1 };
    if (o < 17) return { f: p - 5, i: o - 2 };
    return { p, c: o - 14 };
  };
  // A grubu adları (18 sütun)
  U.GL = ['1A', '2A', '3B', '4B', '5B', '6B', '7B', '8B', '8B', '8B', '1B', '2B', '3A', '4A', '5A', '6A', '7A', '8A'];
  U.colOfA = g => g <= 2 ? g : g + 10;
  U.shells = z => { const s = []; let r = z; [2, 8, 8].forEach(m => { if (r > 0) { s.push(Math.min(m, r)); r -= Math.min(m, r); } }); return s; };
  U.NAMES = ['hidrojen', 'helyum', 'lityum', 'berilyum', 'bor', 'karbon', 'azot', 'oksijen', 'flor', 'neon', 'sodyum', 'magnezyum', 'alüminyum', 'silisyum', 'fosfor', 'kükürt', 'klor', 'argon'];

  U.rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  U.linePts = (a, b, n = 40) => { const o = []; for (let i = 0; i <= n; i++) o.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return o; };
  U.txt = (ctx, s, x, y, o = {}) => { ctx.save(); ctx.font = `${o.weight ?? 700} ${o.size ?? 34}px ${o.font ?? 'Kalam'}`; ctx.textAlign = o.align ?? 'left'; ctx.textBaseline = o.base ?? 'alphabetic'; ctx.fillStyle = o.color ?? PAL.ink; ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillText(s, x, y); ctx.restore(); };

  // ---------- periyodik tablo kutucuğu ----------
  U.tile = (ctx, x, y, w, h, sym, num, name, o = {}) => {
    const A0 = ctx.globalAlpha; ctx.save(); ctx.globalAlpha = A0 * (o.alpha ?? 1);
    ctx.fillStyle = o.fill ?? '#FBF8F1'; ctx.fillRect(x, y, w, h);
    if (o.tint) { ctx.globalAlpha = A0 * (o.alpha ?? 1) * (o.tintA ?? 0.6); ctx.fillStyle = o.tint; ctx.fillRect(x, y, w, h); ctx.globalAlpha = A0 * (o.alpha ?? 1); }
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = o.lw ?? 2; ctx.strokeRect(x, y, w, h);
    if (num != null) { ctx.font = `700 ${Math.round(h * 0.22)}px Kalam`; ctx.fillStyle = PAL.ink; ctx.globalAlpha = A0 * (o.alpha ?? 1) * 0.75; ctx.textAlign = 'left'; ctx.fillText(String(num), x + w * 0.08, y + h * 0.26); ctx.globalAlpha = A0 * (o.alpha ?? 1); }
    if (sym) { ctx.font = `700 ${Math.round(h * (name ? 0.42 : 0.5))}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = o.symColor ?? PAL.ink; ctx.fillText(sym, x + w / 2, y + h * (name ? 0.64 : 0.72)); }
    if (name) { let z = Math.round(h * 0.16); ctx.font = `700 ${z}px Kalam`; while (ctx.measureText(name).width > w * 0.92 && z > 8) { z--; ctx.font = `700 ${z}px Kalam`; } ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(name, x + w / 2, y + h * 0.9); }
    ctx.restore();
  };
  // tam tablo: geo = {X0, Y0, GX, GY, W, H, FY (f-bloğu ilk satır y)}; color(z) → {k: 0..1 boya, cls}
  U.fullTable = (ctx, geo, fn) => {
    for (let z = 1; z <= 118; z++) {
      const q = U.posOf(z); let x, y;
      if (q.f) { x = geo.X0 + (q.i + 2) * geo.GX; y = geo.FY + (q.f - 1) * geo.GY; }
      else { x = geo.X0 + (q.c - 1) * geo.GX; y = geo.Y0 + (q.p - 1) * geo.GY; }
      fn(z, x, y, q);
    }
    // f-bloğu yer tutucuları (3. sütun, 6–7. periyot)
    [6, 7].forEach((p, i) => fn(-(i + 1), geo.X0 + 2 * geo.GX, geo.Y0 + (p - 1) * geo.GY, { p, c: 3, star: true }));
  };
  U.tableXY = (geo, z) => { const q = U.posOf(z); return q.f ? [geo.X0 + (q.i + 2) * geo.GX, geo.FY + (q.f - 1) * geo.GY] : [geo.X0 + (q.c - 1) * geo.GX, geo.Y0 + (q.p - 1) * geo.GY]; };
  // yarımetal "merdiven" çizgisi (B/Al ile Po/At arası sınır) — sütun/periyot köşe noktaları
  U.stairPts = (geo) => {
    const X = c => geo.X0 + (c - 1) * geo.GX - (geo.GX - geo.W) / 2, Y = p => geo.Y0 + (p - 1) * geo.GY - (geo.GY - geo.H) / 2;
    const cp = [[13, 2], [13, 3], [14, 3], [14, 4], [15, 4], [15, 5], [16, 5], [16, 6], [17, 6], [17, 7]];
    return cp.map(([c, p]) => [X(c), Y(p)]);
  };

  // ---------- katmanlı atom (Bohr modeli) ----------
  function shade(hex, f) { const n = parseInt(hex.slice(1), 16); let r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f); return `rgb(${m(r)},${m(g)},${m(b)})`; }
  U.shade = shade;
  U.ball = (ctx, x, y, r, fill, o = {}) => {
    const A0 = ctx.globalAlpha; ctx.save();
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
    g.addColorStop(0, '#FFFDF6'); g.addColorStop(0.25, fill); g.addColorStop(1, shade(fill, -0.32));
    ctx.fillStyle = g; ctx.globalAlpha = A0 * (o.alpha ?? 1); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = Math.max(1.2, Math.min(3.2, r * 0.07)); ctx.stroke();
    if (o.sym) { ctx.font = `700 ${Math.round(o.symSize ?? r * 0.9)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = o.txt ?? PAL.ink; ctx.fillText(o.sym, x, y + r * 0.06); }
    ctx.restore();
  };
  U.electron = (ctx, x, y, r, a = 1) => U.ball(ctx, x, y, r, '#6FA0C2', { sym: '−', txt: '#FBF8F1', alpha: a });
  U.nucleus = (ctx, x, y, np, nn, r, o = {}) => {
    const N = np + nn; const pts = [];
    for (let i = 0; i < N; i++) { const a = i * 2.39996, d = r * 1.05 * Math.sqrt(i); pts.push([x + Math.cos(a) * d, y + Math.sin(a) * d]); }
    const kinds = []; for (let i = 0; i < N; i++) kinds.push(i < np ? 'p' : 'n');
    const R = rng(o.seed ?? 77); for (let i = N - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [kinds[i], kinds[j]] = [kinds[j], kinds[i]]; }
    for (let i = N - 1; i >= 0; i--) { const [px, py] = pts[i]; if (kinds[i] === 'p') U.ball(ctx, px, py, r, '#D98A6C', { sym: '+', symSize: r * 1.2 }); else U.ball(ctx, px, py, r, '#BDB4A3'); }
  };
  // shells: [2,8,1]; o.kE(k,i) → 0..1 görünürlük; o.off(k,i) → [dx,dy] kayma (elektron verme/alma animasyonu)
  U.bohr = (ctx, x, y, np, nn, shells, t, o = {}) => {
    const R0 = o.R0 ?? 90, dR = o.dR ?? 55, er = o.er ?? 11, nr = o.nr ?? 8, spin = o.spin ?? 0.4;
    const nS = o.rings ?? shells.length;
    for (let k = 0; k < nS; k++) { const R = R0 + k * dR; stroke(ctx, circlePts(x, y, R, R, 90), { w: 2, closed: true, alpha: 0.55, dry: false, seed: 300 + k }); }
    U.nucleus(ctx, x, y, np, nn, nr, { seed: o.seed ?? 5 });
    shells.forEach((n, k) => {
      const R = R0 + k * dR, slots = o.slots && o.slots[k] ? o.slots[k] : n;
      for (let i = 0; i < n; i++) {
        const v = o.kE ? o.kE(k, i) : 1; if (v <= 0) continue;
        const a = i / slots * Math.PI * 2 + t * spin / (1 + k * 0.5) + k * 0.4 - Math.PI / 2;
        const off = o.off ? o.off(k, i) : [0, 0];
        U.electron(ctx, x + Math.cos(a) * R + off[0], y + Math.sin(a) * R + off[1], er, v);
      }
    });
  };
  // iyon yazımı: Na + üst simge
  U.ion = (ctx, sym, ch, x, y, size, o = {}) => {
    ctx.save(); ctx.font = `700 ${size}px Kalam`; const w1 = ctx.measureText(sym).width; ctx.font = `700 ${size * 0.62}px Kalam`; const w2 = ctx.measureText(ch).width;
    const W = w1 + w2 + 4; const x0 = o.align === 'center' ? x - W / 2 : x;
    ctx.globalAlpha *= (o.alpha ?? 1); ctx.fillStyle = o.color ?? PAL.ink; ctx.textAlign = 'left';
    ctx.font = `700 ${size}px Kalam`; ctx.fillText(sym, x0, y);
    ctx.font = `700 ${size * 0.62}px Kalam`; ctx.fillStyle = o.chColor ?? o.color ?? PAL.ink; ctx.fillText(ch, x0 + w1 + 4, y - size * 0.42);
    ctx.restore(); return W;
  };

  // ---------- temsili atomlar / boncuk modeli (H beyaz, O mavi) ----------
  U.EL = { H: { c: '#FBF8F1', r: 0.72 }, O: { c: '#5E8FAE', r: 1 }, C: { c: '#4A4750', r: 1, tc: '#FBF8F1' }, Na: { c: '#C49A6C', r: 1.2 }, Cl: { c: '#93B560', r: 1.12 } };
  U.atom = (ctx, x, y, r, el, o = {}) => {
    const d = U.EL[el] || { c: '#ddd', r: 1 }; const R = r * (o.raw ? 1 : d.r);
    const cp = circlePts(x, y, R, R, 32);
    P.fillPts(ctx, cp, d.c, 0.97);
    ctx.save(); const g = ctx.createRadialGradient(x - R * 0.35, y - R * 0.4, R * 0.1, x, y, R); g.addColorStop(0, 'rgba(255,255,255,0.5)'); g.addColorStop(1, 'rgba(0,0,0,0.12)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill(); ctx.restore();
    stroke(ctx, cp, { w: Math.max(1.6, R * 0.07), closed: true, dry: false, seed: 2210 + (o.seed ?? 0) });
    if (o.label && R > 13) { ctx.save(); ctx.font = `700 ${Math.round(R * 0.9)}px Kalam`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = d.tc ?? PAL.ink; ctx.fillText(el, x, y + R * 0.06); ctx.restore(); }
    return R;
  };
  U.bondLine = (ctx, a, b, w = 7) => line(ctx, a, b, { w, color: '#6B6460', dry: false, taper: 0.02, seed: 2230 });

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
  U.steam = (ctx, cx, y, w, hgt, k, t, seed = 1, col = '#8FA9B8') => {
    if (k <= 0) return; const r = rng(seed); const n = 3 + Math.round(2 * k);
    for (let i = 0; i < n; i++) {
      const x0 = cx - w / 2 + w * (i + 0.5) / n + (r() - 0.5) * 12; const ph = r() * 6;
      const p = []; for (let j = 0; j <= 20; j++) { const u = j / 20; p.push([x0 + Math.sin(u * 7 + t * 2.2 + ph) * 10 * (0.4 + u), y - 8 - u * hgt]); }
      ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.3) * 0.55; stroke(ctx, p, { w: 3, color: col, seed: seed + i, dry: false, taper: 0.45 }); ctx.restore();
    }
  };

  // ---------- alev / mum ----------
  U.flame = (ctx, x, y, s, t, k = 1) => { // y: fitil ucu
    if (k <= 0) return; const f = 1 + 0.08 * Math.sin(t * 13) + 0.05 * Math.sin(t * 7.3);
    ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k * f);
    const g = ctx.createRadialGradient(0, -30, 4, 0, -30, 90); g.addColorStop(0, 'rgba(255,214,120,0.55)'); g.addColorStop(1, 'rgba(255,214,120,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, -30, 90, 0, 7); ctx.fill();
    const sw = Math.sin(t * 5) * 3;
    // damla biçimli alev (tepesi sivri)
    const drop = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; const r = 18 * (1 - 0.6 * Math.max(0, -Math.cos(a))); drop.push([Math.sin(a) * r + sw * (1 + Math.cos(a)) * 0.4, Math.cos(a) * 34 - 26 - Math.max(0, -Math.cos(a)) * 14]); }
    P.fillPts(ctx, drop, '#F2B34A', 0.95);
    const inner = drop.map(p => [p[0] * 0.5, (p[1] + 26) * 0.55 - 14]); P.fillPts(ctx, inner, '#FFF1C4', 0.95);
    P.fillPts(ctx, drop.map(p => [p[0] * 0.35, (p[1] + 26) * 0.3 + 2]), '#6F9BC8', 0.55);
    stroke(ctx, drop, { w: 2, closed: true, dry: false, color: '#B7791C', seed: 3001 });
    ctx.restore();
  };
  U.candle = (ctx, x, by, h, t, o = {}) => { // o.lit (0..1), o.melt (0..1 erime damlası)
    const w = o.w ?? 56, top = by - h;
    const body = [[x - w / 2, by], [x - w / 2, top + 6], [x - w / 4, top], [x + w / 4, top + 2], [x + w / 2, top + 6], [x + w / 2, by]];
    P.fillPts(ctx, body, '#F4EBD6'); wash(ctx, body, '#D8C9A6', 0.35, 3010, { bleed: 1, blooms: 0 });
    if (o.melt > 0) { const d = [[x + w / 2 - 2, top + 8], [x + w / 2 + 4, top + 8 + 50 * o.melt], [x + w / 2 - 6, top + 14 + 50 * o.melt]]; P.fillPts(ctx, circlePts(x + w / 2, top + 10 + 50 * o.melt, 6, 9, 14), '#F4EBD6'); stroke(ctx, circlePts(x + w / 2, top + 10 + 50 * o.melt, 6, 9, 14), { w: 1.6, closed: true, dry: false }); }
    stroke(ctx, body, { w: 2.6, seed: 3011 });
    line(ctx, [x, top + 2], [x + 2, top - 18], { w: 3, dry: false });
    if ((o.lit ?? 0) > 0) U.flame(ctx, x + 2, top - 18, o.fs ?? 1, t, o.lit);
    // şamdan tabağı
    stroke(ctx, P.arc(x, by, w * 0.9, 0, Math.PI, 20, 12), { w: 2.6, seed: 3012 }); line(ctx, [x - w * 0.9, by], [x + w * 0.9, by], { w: 2.6, dry: false });
  };

  // ---------- mutfak nesneleri (merkez x,y; s ölçek) ----------
  U.bread = (ctx, x, y, s, cut = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const loaf = []; for (let i = 0; i <= 30; i++) { const a = Math.PI + i / 30 * Math.PI; loaf.push([Math.cos(a) * 110, Math.sin(a) * 60]); } loaf.push([110, 40], [-110, 40]);
    P.fillPts(ctx, loaf, '#D9A45E'); wash(ctx, loaf, '#8A5A22', 0.35, 3020, { bleed: 1, blooms: 1 }); stroke(ctx, loaf, { w: 2.6, closed: true, seed: 3021 });
    for (let i = 0; i < 3; i++) line(ctx, [-60 + i * 50, -40], [-40 + i * 50, -20], { w: 2, dry: false, alpha: 0.7 });
    if (cut > 0) { for (let i = 0; i < Math.ceil(cut * 3); i++) { const sx = 130 + i * 34 * cut; const sl = [[sx, -50], [sx + 22, -50], [sx + 22, 40], [sx, 40], [sx, -50]]; P.fillPts(ctx, sl, '#F1DDB0'); stroke(ctx, sl, { w: 2, closed: true, dry: false, seed: 3022 + i }); } }
    ctx.restore();
  };
  U.potato = (ctx, x, y, s, cooked = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const p = wobble(circlePts(0, 0, 70, 48, 30), 4, 3030); P.fillPts(ctx, p, cooked > 0.5 ? '#E8C77A' : '#C9A064'); wash(ctx, p, '#8A6A45', 0.3, 3031, { bleed: 1, blooms: 1 }); stroke(ctx, p, { w: 2.6, closed: true, seed: 3032 });
    [[-30, -10], [20, 14], [34, -18]].forEach(([dx, dy]) => inkDot(ctx, dx, dy, 3, { alpha: 0.6 }));
    ctx.restore();
  };
  U.cup = (ctx, x, by, s, o = {}) => { // o.tea: renk, o.lemon, o.sugar
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const body = [[-60, -110], [60, -110], [48, 0], [-48, 0], [-60, -110]];
    ctx.save(); P.path(ctx, body); ctx.clip(); ctx.fillStyle = o.tea ?? '#A0522D'; ctx.globalAlpha *= 0.85; ctx.fillRect(-70, -96, 140, 110); ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = PAL.white; P.path(ctx, body); ctx.fill(); ctx.restore();
    stroke(ctx, body, { w: 3, closed: true, seed: 3040 });
    stroke(ctx, P.arc(70, -60, 24, -1.4, 1.4, 14), { w: 3, seed: 3041 });
    ctx.restore();
  };
  U.lemon = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const l = circlePts(0, 0, 40, 28, 28); P.fillPts(ctx, l, '#EFD34E'); stroke(ctx, l, { w: 2.4, closed: true, seed: 3050 }); ctx.restore(); };
  U.sheet = (ctx, x, y, s, torn = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const d = 30 * torn;
    const L = [[-70, -90], [0, -90], [8, -50], [-6, -10], [10, 30], [0, 90], [-70, 90], [-70, -90]].map(p => [p[0] - d, p[1] + d * 0.3]);
    const R = [[0, -90], [70, -90], [70, 90], [0, 90], [10, 30], [-6, -10], [8, -50], [0, -90]].map(p => [p[0] + d, p[1] - d * 0.3]);
    [L, R].forEach((q, i) => { P.fillPts(ctx, q, '#FBF8F1'); stroke(ctx, q, { w: 2.2, closed: true, dry: false, seed: 3060 + i }); for (let j = 0; j < 5; j++) line(ctx, [q[0][0] + 10, -60 + j * 28 + (i ? -d * 0.3 : d * 0.3)], [q[0][0] + 55, -60 + j * 28 + (i ? -d * 0.3 : d * 0.3)], { w: 1.2, alpha: 0.4, dry: false }); });
    ctx.restore();
  };
  U.ice = (ctx, x, by, s, melt = 0) => {
    ctx.save(); ctx.translate(x, by); ctx.scale(s, s);
    const pud = circlePts(0, -4, 40 + 50 * melt, 8 + 6 * melt, 24); P.fillPts(ctx, pud, '#BFD4DF', 0.8 * Math.min(1, melt * 3)); if (melt > 0.05) stroke(ctx, pud, { w: 1.6, closed: true, dry: false, color: PAL.water, alpha: 0.7 });
    const h = 70 * (1 - melt); if (h > 3) { const c = [[-35 * (1 - melt * 0.3), -h - 6], [35 * (1 - melt * 0.3), -h - 6], [38, -6], [-38, -6], [-35 * (1 - melt * 0.3), -h - 6]]; P.fillPts(ctx, c, '#DCEAF1', 0.95); wash(ctx, c, PAL.water, 0.2, 3070, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 2.4, closed: true, dry: false, color: PAL.water }); }
    ctx.restore();
  };
  U.wood = (ctx, x, y, s, broken = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const g = 16 * broken, a = 0.25 * broken;
    [[-1, -a], [1, a]].forEach(([sd, ang], i) => {
      ctx.save(); ctx.translate(sd * g, 0); ctx.rotate(ang);
      const st = sd < 0 ? [[-110, -12], [0, -12], [6, -4], [-4, 2], [4, 12], [-110, 12], [-110, -12]] : [[0, -12], [110, -12], [110, 12], [4, 12], [-4, 2], [6, -4], [0, -12]];
      P.fillPts(ctx, st, '#B98A55'); wash(ctx, st, '#6B4E32', 0.3, 3080 + i, { bleed: 1, blooms: 0 }); stroke(ctx, st, { w: 2.2, closed: true, dry: false, seed: 3082 + i });
      ctx.restore();
    });
    ctx.restore();
  };
  U.knife = (ctx, x, y, s, a = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s); const bl = [[0, -6], [110, -4], [120, 6], [0, 8], [0, -6]]; P.fillPts(ctx, bl, '#D8DDE2'); stroke(ctx, bl, { w: 2, closed: true, dry: false }); const hd = [[-70, -8], [0, -8], [0, 10], [-70, 10], [-70, -8]]; P.fillPts(ctx, hd, '#6B4E32'); stroke(ctx, hd, { w: 2, closed: true, dry: false }); ctx.restore(); };

  // ---------- çivi (paslanma) / elma (çürüme) ----------
  U.nail = (ctx, x, y, s, rust = 0, ang = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
    const b = [[-80, -6], [70, -5], [100, 0], [70, 5], [-80, 6], [-80, -6]]; P.fillPts(ctx, b, '#A7ADB4');
    const hd = [[-92, -18], [-80, -18], [-80, 18], [-92, 18], [-92, -18]]; P.fillPts(ctx, hd, '#9A9FA6');
    if (rust > 0) { const r = rng(3100); for (let i = 0; i < 60 * rust; i++) { ctx.save(); ctx.globalAlpha *= 0.75; ctx.fillStyle = ['#A0522D', '#8B4513', '#B5652E'][i % 3]; ctx.beginPath(); ctx.arc(-85 + r() * 175, (r() - 0.5) * 12, 3 + r() * 4, 0, 7); ctx.fill(); ctx.restore(); } }
    stroke(ctx, b, { w: 2, closed: true, dry: false }); stroke(ctx, hd, { w: 2, closed: true, dry: false });
    ctx.restore();
  };
  U.apple = (ctx, x, y, s, rot = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s * (1 - 0.12 * rot));
    const a = []; for (let i = 0; i <= 40; i++) { const t = i / 40 * Math.PI * 2; const r = 60 * (1 - 0.18 * Math.pow(Math.max(0, -Math.cos(t)), 6)); a.push([Math.sin(t) * r * 1.05, -Math.cos(t) * r * 0.95]); }
    const wr = wobble(a, 2 + rot * 6, 3110);
    P.fillPts(ctx, wr, rot > 0.5 ? '#9C7A48' : '#C8553F'); if (rot > 0) P.fillPts(ctx, wr, '#6B4E32', Math.min(0.8, rot));
    wash(ctx, wr, '#6B2A1A', 0.2, 3111, { bleed: 1, blooms: 1 });
    if (rot > 0.2) { const r = rng(3112); for (let i = 0; i < 8 * rot; i++) P.fillPts(ctx, circlePts((r() - 0.5) * 70, (r() - 0.5) * 60, 8 + r() * 10, 6 + r() * 8, 12), '#3E3226', 0.5); }
    stroke(ctx, wr, { w: 2.6, closed: true, seed: 3113 });
    line(ctx, [0, -56], [6, -80], { w: 4, dry: false }); if (rot < 0.5) { const lf = circlePts(24, -76, 18, 8, 16, -0.4); P.fillPts(ctx, lf, PAL.life, 0.8); stroke(ctx, lf, { w: 1.6, closed: true, dry: false }); }
    ctx.restore();
  };

  // ---------- şişe (kapaklı) + dijital terazi ----------
  // o: level 0..1, foam 0..1, cap (bool), tilt, cup (0..1 içerde karbonat kabı), gas (0..1 kabarcık)
  U.bottle = (ctx, cx, by, s, t, o = {}) => {
    ctx.save(); ctx.translate(cx, by); ctx.rotate(o.tilt ?? 0); ctx.scale(s, s);
    const body = [[-60, 0], [-60, -150], [-40, -190], [-22, -200], [-22, -236], [22, -236], [22, -200], [40, -190], [60, -150], [60, 0], [-60, 0]];
    const lv = o.level ?? 0.35;
    ctx.save(); P.path(ctx, body); ctx.clip();
    ctx.fillStyle = 'rgba(214,190,140,0.55)'; ctx.fillRect(-80, -150 * lv - 4, 160, 160);
    if (o.foam > 0) { const r = rng(3120); ctx.fillStyle = '#FBF8F1'; for (let i = 0; i < 70 * o.foam; i++) { const yy = -150 * lv - r() * 90 * o.foam, xx = (r() - 0.5) * 110; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(xx + Math.sin(t * 3 + i) * 2, yy + Math.cos(t * 4 + i) * 2, 5 + r() * 7, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(28,27,34,0.35)'; ctx.lineWidth = 1; ctx.stroke(); } }
    if (o.gas > 0) { const r = rng(3121); for (let i = 0; i < 16; i++) { const u = (t * 0.6 + r()) % 1; ctx.globalAlpha = 0.6 * o.gas; ctx.strokeStyle = PAL.water; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc((r() - 0.5) * 90, -150 * lv - 20 - u * 150, 4 + r() * 3, 0, 7); ctx.stroke(); } }
    ctx.restore();
    if (o.cup > 0) { // karbonat dolu küçük kap (şişe içinde, sıvının üstünde asılı)
      const cp = [[-22, -150 * lv - 70], [22, -150 * lv - 70], [18, -150 * lv - 30], [-18, -150 * lv - 30], [-22, -150 * lv - 70]];
      P.fillPts(ctx, cp, '#FBF8F1', 0.9); P.fillPts(ctx, [[-20, -150 * lv - 58], [20, -150 * lv - 58], [18, -150 * lv - 32], [-18, -150 * lv - 32]], '#FFFFFF', o.cup); stroke(ctx, cp, { w: 1.8, closed: true, dry: false });
    }
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = PAL.white; P.path(ctx, body); ctx.fill(); ctx.restore();
    stroke(ctx, body, { w: 3, closed: true, seed: 3122 });
    line(ctx, [40, -140], [42, -30], { w: 3, color: PAL.white, dry: false, alpha: 0.8 });
    if (o.cap) { const c = [[-26, -236], [26, -236], [26, -262], [-26, -262], [-26, -236]]; P.fillPts(ctx, c, '#4E7FA0'); stroke(ctx, c, { w: 2.4, closed: true, dry: false }); }
    ctx.restore();
  };
  U.scale = (ctx, cx, by, w, txt, o = {}) => {
    const top = by - 60;
    const b = [[cx - w / 2, top + 10], [cx + w / 2, top + 10], [cx + w / 2 + 12, by], [cx - w / 2 - 12, by], [cx - w / 2, top + 10]];
    P.fillPts(ctx, b, '#D9CDB4'); wash(ctx, b, '#8A6A45', 0.25, 3130, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 3131 });
    const pl = [[cx - w / 2 + 20, top], [cx + w / 2 - 20, top], [cx + w / 2 - 12, top + 10], [cx - w / 2 + 12, top + 10], [cx - w / 2 + 20, top]]; P.fillPts(ctx, pl, '#8C9198'); stroke(ctx, pl, { w: 2.4, closed: true, dry: false });
    const dsp = [[cx - 110, top + 18], [cx + 110, top + 18], [cx + 110, by - 8], [cx - 110, by - 8], [cx - 110, top + 18]]; P.fillPts(ctx, dsp, '#2F3A33');
    ctx.save(); ctx.font = '700 34px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = o.color ?? '#B9F0A0'; ctx.fillText(txt, cx, by - 16); ctx.restore();
    return top;
  };

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
  // defter sayfası + maddeler (kaydet sahneleri)
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

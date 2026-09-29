// props.js — Film 21'e özel çizim yardımcıları (window.F21)
// karton ev modeli (kesit), ısı akışı okları, termos, mont, kuş, Harran kümbet evleri, küçük grafik
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, dashed, hatch } = G.INK;
  const HEAT = '#B5553F', CARD = '#D8BF96', PAPER = '#EFE9DA', TAPE = '#E3A03A', RED = '#A23A2A', COLD = '#2E6A8C';
  const F = { HEAT, CARD, PAPER, TAPE, RED, COLD };
  F.fmt = v => Math.round(v) + ' °C';
  // örnek veriler (0, 5, 10, 15, 20 dk) — ölçekli değildir
  F.D = { plain: [40, 36, 33, 30, 28], lined: [40, 38, 36, 34, 32], full: [40, 39, 37, 36, 35], sPlain: [5, 8, 11, 13, 15], sFull: [5, 6, 8, 9, 10] };
  F.at = (arr, m) => { const i = Math.min(3, Math.floor(m / 5)), u = E.clamp(m / 5 - i); return arr[i] + (arr[i + 1] - arr[i]) * u; };

  F.card = (ctx, x, y, w, h, o = {}) => {
    const c = [[x, y], [x + w, y - 4], [x + w + 4, y + h], [x + 3, y + h + 3], [x, y]];
    ctx.save(); if (o.shadow !== false) { ctx.shadowColor = 'rgba(60,40,20,0.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
    P.fillPts(ctx, c, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, c, { w: o.w ?? 2.6, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 4100 });
    return c;
  };
  function crumple(ctx, x, y, w, h, seed, k = 1) { // crumpled newspaper band
    if (k <= 0) return; const r = rng(seed);
    const hh = h * k; const band = [[x, y + h - hh], [x + w, y + h - hh], [x + w, y + h], [x, y + h]];
    P.fillPts(ctx, band, PAPER);
    ctx.save(); ctx.beginPath(); P.path(ctx, band); ctx.closePath(); ctx.clip();
    const n = Math.max(3, Math.round(w * hh / 500));
    for (let i = 0; i < n; i++) { const cx = x + r() * w, cy = y + h - r() * hh, rr = 8 + r() * 10; stroke(ctx, INK.wobble(circlePts(cx, cy, rr, rr * 0.8, 10), 2.5, seed + i), { w: 1.2, closed: true, dry: false, alpha: 0.55 }); }
    for (let i = 0; i < n / 2; i++) { const yy = y + h - r() * hh; line(ctx, [x + 2, yy], [x + w - 2, yy + (r() - 0.5) * 6], { w: 0.8, dry: false, alpha: 0.35 }); }
    ctx.restore();
    stroke(ctx, band.concat([band[0]]), { w: 1.4, closed: true, dry: false, alpha: 0.7 });
  }
  F.crumple = crumple;

  // karton ev modeli (kesit). base: taban y, w×h gövde
  // o: walls, roof, gaps, dbl (0..1 animasyon ilerlemeleri), T (şişe sıcaklığı), flow (ok görünürlüğü), inward (yaz: ısı içeri), t
  F.model = (ctx, cx, base, w, h, o = {}) => {
    const t = o.t ?? 0, x0 = cx - w / 2, x1 = cx + w / 2, top = base - h, th = 14;
    const walls = o.walls ?? 0, roof = o.roof ?? 0, gaps = o.gaps ?? 0, dbl = o.dbl ?? 0;
    // interior
    const inner = [[x0 + th, top + th], [x1 - th, top + th], [x1 - th, base], [x0 + th, base]];
    const warm = o.inward ? 0 : 1;
    P.fillPts(ctx, inner, o.inward ? '#E3EEF3' : '#F7EBD6');
    // cardboard walls
    const wl = [[x0, top, th, h], [x1 - th, top, th, h], [x0, top, w, th]];
    wl.forEach(([x, y, ww, hh], i) => { const r = [[x, y], [x + ww, y], [x + ww, y + hh], [x, y + hh], [x, y]]; P.fillPts(ctx, r, CARD); stroke(ctx, r, { w: 2, closed: true, dry: false, seed: 4110 + i }); });
    // window gap on the left wall (y from top+60 to top+130), door gap on right wall bottom
    const wy0 = top + 60, wy1 = top + 140;
    P.fillPts(ctx, [[x0 - 1, wy0], [x0 + th + 1, wy0], [x0 + th + 1, wy1], [x0 - 1, wy1]], '#DDEBF0');
    line(ctx, [x0 + th / 2, wy0], [x0 + th / 2, wy1], { w: 2, color: COLD, dry: false });
    if (dbl > 0) { ctx.save(); ctx.globalAlpha = dbl; line(ctx, [x0 + th + 12, wy0 + 4], [x0 + th + 12, wy1 - 4], { w: 2.4, color: COLD, dry: false }); ctx.restore(); }
    const dy0 = base - 90, gapH = 18 * (1 - gaps);
    P.fillPts(ctx, [[x1 - th - 1, dy0], [x1 + 1, dy0], [x1 + 1, base], [x1 - th - 1, base]], '#C7AE85');
    if (gapH > 0.5) P.fillPts(ctx, [[x1 - th - 1, base - gapH], [x1 + 1, base - gapH], [x1 + 1, base], [x1 - th - 1, base]], '#FAF6EC');
    if (gaps > 0) { ctx.save(); ctx.globalAlpha = gaps; P.fillPts(ctx, [[x1 - 6, dy0 + 60], [x1 + 8, dy0 + 60], [x1 + 8, base + 4], [x1 - 6, base + 4]], TAPE, 0.9); P.fillPts(ctx, [[x0 - 8, wy0 - 6], [x0 + 6, wy0 - 6], [x0 + 6, wy0 + 10], [x0 - 8, wy0 + 10]], TAPE, 0.9); P.fillPts(ctx, [[x0 - 8, wy1 - 10], [x0 + 6, wy1 - 10], [x0 + 6, wy1 + 6], [x0 - 8, wy1 + 6]], TAPE, 0.9); ctx.restore(); }
    // newspaper lining on side walls (inside)
    if (walls > 0) { crumple(ctx, x0 + th, top + th, 30, h - th, 4120, walls); crumple(ctx, x1 - th - 30, top + th, 30, h - th, 4121, walls); }
    // roof
    const rp = [[x0 - 24, top + 2], [cx, top - 120], [x1 + 24, top + 2]];
    P.fillPts(ctx, rp, '#C9A477'); stroke(ctx, rp.concat([rp[0]]), { w: 2.6, closed: true, seed: 4130 });
    if (roof > 0) crumple(ctx, x0 + th, top + th, w - 2 * th, 26, 4131, roof);
    stroke(ctx, [[x0, base], [x1, base]], { w: 3 });
    // bottle
    const bx = cx, bb = base - 4, bw = 56, bh = 120;
    const bot = [[bx - bw / 2, bb], [bx - bw / 2, bb - bh * 0.7], [bx - 12, bb - bh], [bx + 12, bb - bh], [bx + bw / 2, bb - bh * 0.7], [bx + bw / 2, bb]];
    const T = o.T ?? 40, hot = E.clamp((T - 15) / 25);
    P.fillPts(ctx, bot, o.inward ? '#CFE3EC' : F.mix(hot), 0.9); stroke(ctx, bot.concat([bot[0]]), { w: 2.4, closed: true, seed: 4140 });
    if (o.inward) for (let i = 0; i < 2; i++) { const q = [[bx - 14 + i * 14, bb - 40 - i * 22], [bx + 2 + i * 14, bb - 40 - i * 22], [bx + 2 + i * 14, bb - 24 - i * 22], [bx - 14 + i * 14, bb - 24 - i * 22]]; P.fillPts(ctx, q, '#F2F7FA'); stroke(ctx, q.concat([q[0]]), { w: 1.4, dry: false }); }
    line(ctx, [bx + 8, bb - 20], [bx + 30, bb - bh - 60], { w: 5, seed: 4141 }); inkDot(ctx, bx + 9, bb - 18, 5, { color: '181,85,63' });
    if (o.showT !== false) { ctx.save(); ctx.font = '700 40px Kalam'; const s = F.fmt(T); const tw = ctx.measureText(s).width; const lx = bx + 44, ly = bb - bh - 70; P.fillPts(ctx, [[lx - 8, ly - 36], [lx + tw + 12, ly - 38], [lx + tw + 14, ly + 12], [lx - 6, ly + 14]], '#FBF6E8', 0.95); ctx.fillStyle = o.inward ? COLD : HEAT; ctx.fillText(s, lx + 2, ly); ctx.restore(); }
    // heat-flow arrows (thickness ~ loss through each part)
    const fl = o.flow ?? 0;
    if (fl > 0) {
      const parts = [
        { a: [x0 + 20, top + 200], b: [x0 - 90, top + 200], loss: 1 - 0.65 * walls },
        { a: [x1 - 20, top + 170], b: [x1 + 90, top + 170], loss: 1 - 0.65 * walls },
        { a: [cx - 50, top + 20], b: [cx - 70, top - 170], loss: 1 - 0.7 * roof },
        { a: [x0 + 10, (wy0 + wy1) / 2], b: [x0 - 90, (wy0 + wy1) / 2 - 20], loss: 1 - 0.55 * dbl },
        { a: [x1 - 10, base - 8], b: [x1 + 100, base - 20], loss: 1 - 0.8 * gaps }
      ];
      parts.forEach((p, i) => {
        const u = ((t * 0.55 + i * 0.29) % 1), a = o.inward ? p.b : p.a, b = o.inward ? p.a : p.b;
        const W = 1.5 + 6 * p.loss;
        ctx.save(); ctx.globalAlpha = fl * (0.3 + 0.7 * Math.sin(u * Math.PI)) * (0.35 + 0.65 * p.loss);
        P.arrow(ctx, a, b, 1, { w: W, color: HEAT, head: 8 + 10 * p.loss });
        ctx.restore();
      });
    }
    return { top, x0, x1, wy0, wy1, dy0 };
  };
  F.mix = h => { const a = [220, 232, 238], b = [230, 170, 130]; return 'rgb(' + a.map((v, i) => Math.round(v + (b[i] - v) * h)).join(',') + ')'; };

  // küçük çizgi grafik: series [{d:[..], col, label}], m (0..20 dk ilerleme)
  F.chart = (ctx, x, y, w, h, series, m, o = {}) => {
    const lo = o.lo ?? 25, hi = o.hi ?? 42, X = v => x + v / 20 * w, Y = v => y + h - (v - lo) / (hi - lo) * h;
    stroke(ctx, [[x, y - 10], [x, y + h], [x + w + 10, y + h]], { w: 2.6 });
    INK.label(ctx, 'sıcaklık (°C)', x + 8, y - 16, { size: 26, weight: 700 });
    INK.label(ctx, 'süre (dk)', x + w + 10, y + h - 12, { size: 26, weight: 700, align: 'right' });
    [0, 5, 10, 15, 20].forEach(v => INK.label(ctx, String(v), X(v), y + h + 30, { size: 24, align: 'center' }));
    (o.ticks ?? [30, 35, 40]).forEach(v => INK.label(ctx, String(v), x - 10, Y(v) + 8, { size: 24, align: 'right' }));
    series.forEach(s => {
      const pts = []; for (let i = 0; i <= 40; i++) { const mm = i / 40 * Math.min(20, m); pts.push([X(mm), Y(F.at(s.d, mm))]); }
      if (m > 0) stroke(ctx, pts, { w: 4, color: s.col, taper: 0.02, dry: false });
      for (let i = 0; i <= 4; i++) if (m >= i * 5) inkDot(ctx, X(i * 5), Y(s.d[i]), 5);
      if (m >= 20 && s.label) INK.label(ctx, s.label, X(20) + 12, Y(s.d[4]) + 8, { size: 28, weight: 700, color: s.col });
    });
  };

  // ---- günlük yaşam ikonları ----
  F.thermos = (ctx, x, y, s, fill) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-42, 110], [-44, -70], [-30, -90], [30, -90], [44, -70], [42, 110], [-42, 110]];
    P.fillPts(ctx, b, '#7F9AA8'); wash(ctx, b, '#4B6470', 0.3, 4160, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true });
    const inb = [[-28, 96], [-28, -64], [28, -64], [28, 96]]; ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = 'rgba(251,248,241,0.8)'; ctx.lineWidth = 2; P.path(ctx, inb.concat([inb[0]])); ctx.stroke(); ctx.restore();
    P.fillPts(ctx, [[-24, -110], [24, -110], [24, -88], [-24, -88]], '#3A3740'); stroke(ctx, [[-24, -110], [24, -110], [24, -88], [-24, -88], [-24, -110]], { w: 2.4, closed: true });
    if (fill) P.fillPts(ctx, [[-22, 92], [-22, -30], [22, -30], [22, 92]], fill, 0.85);
    ctx.restore();
  };
  F.coat = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const c = [[-60, -80], [-20, -96], [0, -70], [20, -96], [60, -80], [100, 20], [70, 34], [56, -10], [56, 100], [-56, 100], [-56, -10], [-70, 34], [-100, 20], [-60, -80]];
    P.fillPts(ctx, c, '#6F8A3A', 0.85); wash(ctx, c, '#4E6428', 0.3, 4170); stroke(ctx, c, { w: 3, closed: true });
    line(ctx, [0, -70], [0, 100], { w: 2.4, dry: false });
    for (let i = 0; i < 4; i++) line(ctx, [-52, -40 + i * 34], [52, -38 + i * 34], { w: 1.4, dry: false, alpha: 0.4, bend: 0.06 });
    ctx.restore();
  };
  F.bird = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = INK.wobble(circlePts(0, 0, 70, 60, 40), 5, 4180); P.fillPts(ctx, b, '#A8886A'); wash(ctx, b, '#6B4A25', 0.3, 4181); stroke(ctx, b, { w: 3, closed: true });
    for (let i = 0; i < 10; i++) { const a = -2.6 + i * 0.5; line(ctx, [Math.cos(a) * 56, Math.sin(a) * 48], [Math.cos(a) * 74, Math.sin(a) * 64], { w: 2, dry: false, alpha: 0.7 }); }
    P.fillPts(ctx, circlePts(26, 10, 26, 22, 20), '#E7D7C0'); inkDot(ctx, 30, -18, 5); P.fillPts(ctx, [[50, -12], [70, -6], [50, 0]], TAPE);
    line(ctx, [-10, 58], [-14, 80], { w: 2.6 }); line(ctx, [14, 58], [16, 80], { w: 2.6 });
    ctx.restore();
  };
  // Harran kümbet evleri (konik kubbeli kerpiç yapılar)
  F.kumbet = (ctx, x, base, s, seed) => {
    ctx.save(); ctx.translate(x, base); ctx.scale(s, s);
    const wall = [[-80, 0], [-80, -70], [80, -70], [80, 0]];
    P.fillPts(ctx, wall, '#D9B48A'); wash(ctx, wall, '#A8743E', 0.35, seed, { bleed: 1 }); stroke(ctx, wall.concat([wall[0]]), { w: 2.6, closed: true, seed });
    const dome = []; for (let i = 0; i <= 30; i++) { const u = i / 30; const xx = -80 + u * 160; dome.push([xx, -70 - 170 * Math.pow(Math.sin(u * Math.PI), 1.6)]); }
    P.fillPts(ctx, dome, '#DDBB92'); wash(ctx, dome, '#A8743E', 0.35, seed + 1, { bleed: 1 }); stroke(ctx, dome, { w: 2.6, seed: seed + 2 });
    for (let r = 1; r < 7; r++) { const yy = -70 - r * 24; const half = 80 * Math.pow(1 - r / 7.2, 0.8); line(ctx, [-half, yy], [half, yy], { w: 1.1, dry: false, alpha: 0.45 }); }
    const door = [[-18, 0], [-18, -46], [18, -46], [18, 0]]; P.fillPts(ctx, door, '#5A3E22', 0.85);
    P.fillPts(ctx, circlePts(0, -212, 6, 6, 10), '#5A3E22', 0.8);
    ctx.restore();
  };
  G.F21 = F;
})(window);

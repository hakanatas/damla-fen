// props.js — Film 12 (Film 9–11 ortak yardımcılarının kopyası + örnek olay, sağlık ikonları).
// TYMM sınırlaması: organellerin ayrıntılı (iç) yapısı çizilmez; organeller yalnızca sade şekillerle gösterilir.
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble } = G.INK;
  const F = {};
  const RED = '#A23A2A';
  F.RED = RED;
  F.COL = {
    wall: '#7E9A45', cytoP: '#E4E6C4', cytoA: '#EFD9C2', nucleus: '#8E6A8C', mito: '#E3A03A', chloro: '#5F8A2E', vac: '#2E6A8C'
  };
  const rrect = (cx, cy, w, h, r, n = 10) => { // rounded rectangle polygon
    const p = [], hw = w / 2 - r, hh = h / 2 - r;
    [[hw, hh, 0], [-hw, hh, Math.PI / 2], [-hw, -hh, Math.PI], [hw, -hh, Math.PI * 1.5]].forEach(([x, y, a0]) => {
      for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; p.push([cx + x + Math.cos(a) * r, cy + y + Math.sin(a) * r]); }
    });
    p.push(p[0]); return p;
  };
  F.rrect = rrect;
  const blob = (cx, cy, rx, ry, seed, amp = 0.08, n = 70) => { const nz = G.INK.noiseFn(seed); const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; const k = 1 + nz(a * 1.6) * amp; p.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); } p[n] = p[0]; return p; };
  F.blob = blob;
  const fill = (ctx, pts, col, a = 1) => P.fillPts(ctx, pts, col, a);
  const alphaFor = (o, part) => { const sh = (o.show && o.show[part] !== undefined) ? o.show[part] : 1; const dim = (o.hi && o.hi !== part && !(Array.isArray(o.hi) && o.hi.includes(part))) ? 1 - 0.7 * (o.dim ?? 0) : 1; return sh * dim; };
  function part(ctx, o, name, fn) { const a = alphaFor(o, name); if (a <= 0.01) return; const A0 = ctx.globalAlpha; ctx.globalAlpha = A0 * a; fn(); ctx.globalAlpha = A0; }

  function mitoShape(x, y, s, rot) { const p = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; p.push([x + Math.cos(a) * s * Math.cos(rot) - Math.sin(a) * s * 0.5 * Math.sin(rot), y + Math.cos(a) * s * Math.sin(rot) + Math.sin(a) * s * 0.5 * Math.cos(rot)]); } return p; }
  function mito(ctx, x, y, s, rot, seed) { const p = mitoShape(x, y, s, rot); fill(ctx, p, '#F4D39A', 1); wash(ctx, p, F.COL.mito, 0.6, seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, p, { w: 2, closed: true, seed, dry: false }); }
  function chloro(ctx, x, y, s, rot, seed) { const p = mitoShape(x, y, s, rot); fill(ctx, p, '#9DBF6A', 1); wash(ctx, p, F.COL.chloro, 0.7, seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, p, { w: 1.8, closed: true, seed, dry: false, color: '#2F4A14' }); }

  // ---------- BİTKİ HÜCRESİ ----------
  // o: { show:{wall,membrane,cyto,nucleus,vacuole,chloro,mito}, hi, dim }
  F.plantCell = (ctx, x, y, w, h, o = {}) => {
    const outer = wobble(rrect(x, y, w, h, 26), 1.5, 3101), inner = rrect(x, y, w - 30, h - 30, 18);
    const anc = {};
    part(ctx, o, 'wall', () => {
      const A0 = ctx.globalAlpha; ctx.save(); ctx.beginPath(); outer.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
      inner.slice().reverse().forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath();
      ctx.fillStyle = '#9DB36A'; ctx.globalAlpha = A0 * 0.85; ctx.fill('evenodd'); ctx.restore();
      stroke(ctx, outer, { w: 4, closed: true, seed: 3103, color: '#3E5A1A' }); stroke(ctx, inner, { w: 1.4, closed: true, seed: 3113, color: '#3E5A1A', dry: false, alpha: 0.6 });
    });
    anc.wall = [x + w / 2 - 7, y - h * 0.18];
    part(ctx, o, 'cyto', () => { fill(ctx, inner, PAL.white); wash(ctx, inner, '#C9CF8E', 0.45, 3104, { bleed: 1, blooms: 2 }); });
    anc.cyto = [x - w * 0.36, y + h * 0.32];
    part(ctx, o, 'membrane', () => stroke(ctx, wobble(inner, 0.8, 3105), { w: 2.6, closed: true, seed: 3106, color: PAL.ink }));
    anc.membrane = [x - w / 2 + 15, y - h * 0.2];
    // big central vacuole
    const vac = blob(x + w * 0.06, y + h * 0.02, w * 0.28, h * 0.3, 3107, 0.07);
    part(ctx, o, 'vacuole', () => { fill(ctx, vac, '#E3EEF2'); wash(ctx, vac, F.COL.vac, 0.35, 3108, { bleed: 1, blooms: 1 }); stroke(ctx, vac, { w: 2.2, closed: true, seed: 3109, color: '#1F4A63' }); });
    anc.vacuole = [x + w * 0.06, y + h * 0.02];
    // nucleus pushed to the side
    const nx = x - w * 0.33, ny = y - h * 0.12, nr = Math.min(w, h) * 0.13;
    const nuc = blob(nx, ny, nr, nr * 0.92, 3110, 0.05, 40);
    part(ctx, o, 'nucleus', () => { fill(ctx, nuc, '#E8D6E4'); wash(ctx, nuc, F.COL.nucleus, 0.6, 3111, { bleed: 0.8, blooms: 0 }); stroke(ctx, nuc, { w: 2.6, closed: true, seed: 3112 }); inkDot(ctx, nx + nr * 0.2, ny + nr * 0.1, nr * 0.2, { color: '90,50,90', alpha: 0.7 }); });
    anc.nucleus = [nx, ny];
    // chloroplasts along the edge
    const CH = [[-0.08, -0.4, 0.3], [0.2, -0.4, -0.2], [0.4, -0.3, 1.2], [0.42, 0.05, 1.6], [0.38, 0.32, 2.2], [0.12, 0.4, 0.1], [-0.16, 0.38, -0.3], [-0.38, 0.28, 1.0], [-0.22, -0.36, 0.5], [-0.12, 0.2, 0.9]];
    part(ctx, o, 'chloro', () => CH.forEach(([dx, dy, r], i) => chloro(ctx, x + dx * w, y + dy * h, Math.min(w, h) * 0.055, r, 3120 + i)));
    anc.chloro = [x + 0.4 * w, y - 0.3 * h];
    const MI = [[-0.4, 0.06, 1.4], [0.28, 0.4, 0.2], [-0.3, -0.38, -0.2]];
    part(ctx, o, 'mito', () => MI.forEach(([dx, dy, r], i) => mito(ctx, x + dx * w, y + dy * h, Math.min(w, h) * 0.05, r, 3140 + i)));
    anc.mito = [x - 0.4 * w, y + 0.06 * h];
    return anc;
  };

  // ---------- HAYVAN HÜCRESİ ----------
  F.animalCell = (ctx, x, y, w, h, o = {}) => {
    const body = blob(x, y, w / 2, h / 2, 3244, 0.045, 90);
    const anc = {};
    part(ctx, o, 'cyto', () => { fill(ctx, body, PAL.white); wash(ctx, body, '#E2B48E', 0.4, 3202, { bleed: 1.2, blooms: 2 }); });
    anc.cyto = [x + w * 0.2, y + h * 0.28];
    part(ctx, o, 'membrane', () => stroke(ctx, wobble(body, 0.8, 3203), { w: 3, closed: true, seed: 3204 }));
    anc.membrane = [x + w / 2 * 0.98, y - h * 0.06];
    const nr = Math.min(w, h) * 0.16;
    const nuc = blob(x - w * 0.03, y - h * 0.02, nr, nr * 0.92, 3205, 0.05, 40);
    part(ctx, o, 'nucleus', () => { fill(ctx, nuc, '#E8D6E4'); wash(ctx, nuc, F.COL.nucleus, 0.6, 3206, { bleed: 0.8, blooms: 0 }); stroke(ctx, nuc, { w: 2.6, closed: true, seed: 3207 }); inkDot(ctx, x - w * 0.03 + nr * 0.2, y - h * 0.02 + nr * 0.1, nr * 0.2, { color: '90,50,90', alpha: 0.7 }); });
    anc.nucleus = [x - w * 0.03, y - h * 0.02];
    const VA = [[0.22, -0.22, 0.05], [-0.26, 0.2, 0.04], [0.28, 0.12, 0.035], [-0.12, -0.3, 0.035], [0.02, 0.3, 0.04]];
    part(ctx, o, 'vacuole', () => VA.forEach(([dx, dy, r], i) => { const c = circlePts(x + dx * w, y + dy * h, r * w, r * w * 0.9, 20); fill(ctx, c, '#E3EEF2'); wash(ctx, c, F.COL.vac, 0.4, 3210 + i, { bleed: 0.4, blooms: 0 }); stroke(ctx, c, { w: 1.6, closed: true, seed: 3215 + i, dry: false, color: '#1F4A63' }); }));
    anc.vacuole = [x + 0.22 * w, y - 0.22 * h];
    const MI = [[-0.3, -0.08, 1.2], [0.3, -0.02, -0.4], [-0.1, 0.32, 0.3], [0.12, -0.3, 0.6]];
    part(ctx, o, 'mito', () => MI.forEach(([dx, dy, r], i) => mito(ctx, x + dx * w, y + dy * h, Math.min(w, h) * 0.06, r, 3230 + i)));
    anc.mito = [x - 0.3 * w, y - 0.08 * h];
    return anc;
  };

  // ---------- MİKROSKOP (yandan) : (x,y) ayak tabanı ortası ----------
  // returns anchor points in world coords for labels
  F.microscope = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const metal = '#D9D2C2', dark = '#5A5560';
    // base (ayak)
    const base = [[-170, 0], [170, 0], [150, -46], [-150, -46], [-170, 0]];
    fill(ctx, base, metal); wash(ctx, base, dark, 0.3, 3301, { bleed: 1, blooms: 0 }); stroke(ctx, base, { w: 3, closed: true, seed: 3302 });
    // arm (kol) — C shape
    const cl = P.bez([-80, -46], [-190, -280], [10, -445], 30); const arm = [], armB = [];
    cl.forEach((p, i) => { const q = cl[Math.min(i + 1, cl.length - 1)], r0 = cl[Math.max(i - 1, 0)]; const dx = q[0] - r0[0], dy = q[1] - r0[1], L = Math.hypot(dx, dy) || 1; const hw = 30 - i * 0.35; arm.push([p[0] - dy / L * hw, p[1] + dx / L * hw]); armB.push([p[0] + dy / L * hw, p[1] - dx / L * hw]); });
    arm.push(...armB.reverse()); arm.push(arm[0]); fill(ctx, arm, metal); wash(ctx, arm, dark, 0.35, 3303, { bleed: 1, blooms: 0 }); stroke(ctx, arm, { w: 3, closed: true, seed: 3304 });
    // light source (ışık kaynağı) under the stage
    const lamp = circlePts(60, -120, 30, 22, 30);
    if (o.lampOn) { const g = ctx.createRadialGradient(60, -130, 5, 60, -150, 120); g.addColorStop(0, 'rgba(227,160,58,0.55)'); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(60, -150, 120, 0, 7); ctx.fill(); }
    fill(ctx, lamp, '#F6D9A0'); wash(ctx, lamp, PAL.light, 0.6, 3305, { bleed: 0.6, blooms: 0 }); stroke(ctx, lamp, { w: 2.6, closed: true, seed: 3306 });
    line(ctx, [60, -98], [60, -46], { w: 8, taper: 0.02, seed: 3307 });
    // stage (tabla)
    const stage = [[-60, -230], [190, -230], [190, -212], [-60, -212], [-60, -230]];
    fill(ctx, stage, dark, 0.85); stroke(ctx, stage, { w: 2.6, closed: true, seed: 3308 });
    // slide (lam) + clips
    const slide = [[0, -242], [140, -242], [140, -232], [0, -232], [0, -242]]; fill(ctx, slide, '#E3EEF2', 0.95); stroke(ctx, slide, { w: 1.8, closed: true, dry: false, seed: 3309 });
    fill(ctx, [[62, -246], [86, -246], [86, -242], [62, -242]], F.COL.wall, 0.9);
    line(ctx, [-20, -246], [20, -242], { w: 4, dry: false }); line(ctx, [180, -246], [140, -242], { w: 4, dry: false });
    // coarse + fine knobs (ayar vidaları)
    [[-100, -190, 34], [-100, -190, 18]].forEach(([kx, ky, r], i) => { const c = circlePts(kx, ky, r, r, 30); fill(ctx, c, i ? metal : dark, i ? 1 : 0.8); stroke(ctx, c, { w: 2.6, closed: true, seed: 3310 + i }); });
    // revolver + objectives
    const rev = [[20, -330], [100, -330], [118, -300], [2, -300], [20, -330]]; fill(ctx, rev, dark, 0.8); stroke(ctx, rev, { w: 2.6, closed: true, seed: 3312 });
    [[20, -0.35, 44], [60, 0, 58], [100, 0.35, 44]].forEach(([ox, a, L], i) => { ctx.save(); ctx.translate(ox, -300); ctx.rotate(a); const ob = [[-11, 0], [11, 0], [8, L], [-8, L], [-11, 0]]; fill(ctx, ob, i === 1 ? '#EEE8DA' : metal); stroke(ctx, ob, { w: 2.2, closed: true, seed: 3313 + i, dry: false }); ctx.restore(); });
    // tube (tüp) + eyepiece (göz merceği)
    const tube = [[35, -560], [85, -560], [88, -330], [32, -330], [35, -560]]; fill(ctx, tube, metal); wash(ctx, tube, dark, 0.25, 3316, { bleed: 1, blooms: 0 }); stroke(ctx, tube, { w: 3, closed: true, seed: 3317 });
    const eye = [[42, -630], [78, -630], [80, -560], [40, -560], [42, -630]]; fill(ctx, eye, '#EEE8DA'); stroke(ctx, eye, { w: 3, closed: true, seed: 3318 });
    fill(ctx, circlePts(60, -632, 18, 5, 20), PAL.ink, 0.8);
    // arm joins tube
    line(ctx, [-30, -440], [35, -440], { w: 10, taper: 0, seed: 3319 });
    ctx.restore();
    const W = (px, py) => [x + px * s, y + py * s];
    return { eye: W(80, -600), obj: W(110, -280), stage: W(190, -222), lamp: W(90, -120), knob: W(-134, -190), arm: W(-150, -300), base: W(-165, -20), slide: W(70, -240) };
  };

  // ---------- MİKROSKOP GÖRÜŞ ALANLARI ----------
  // kind: 'onion' | 'cheek' | 'leaf' ; k: 0..1 focus (blur→sharp simulated by alpha/offset)
  F.fov = (ctx, cx, cy, R, kind, k = 1, t = 0) => {
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
    const bg = kind === 'onion' ? '#F3E6C4' : kind === 'cheek' ? '#E6ECF2' : '#EEF2DC';
    ctx.fillStyle = bg; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    const r = rng(kind.length * 31 + 7);
    const soft = 1 - k;
    if (kind === 'onion' || kind === 'leaf') {
      const cw = kind === 'onion' ? 190 : 120, ch = kind === 'onion' ? 62 : 70;
      for (let row = -6; row <= 6; row++) for (let col = -4; col <= 4; col++) {
        const ox = cx + col * cw + (row % 2 ? cw / 2 : 0) + (r() - 0.5) * 8, oy = cy + row * ch + (r() - 0.5) * 4;
        if (Math.hypot(ox - cx, oy - cy) > R + cw) continue;
        const pts = wobble(rrect(ox, oy, cw - 6, ch - 6, 6, 3), 1.6, 3400 + row * 17 + col);
        if (kind === 'onion') { wash(ctx, pts, '#C08A3A', 0.25, 3500 + row * 9 + col, { bleed: 1, blooms: 0 }); }
        else wash(ctx, pts, '#A9C07A', 0.18, 3500 + row * 9 + col, { bleed: 1, blooms: 0 });
        stroke(ctx, pts, { w: 2.6, closed: true, seed: 3600 + row * 7 + col, dry: false, color: kind === 'onion' ? '#6B4A1E' : '#3E5A1A', alpha: 0.4 + 0.6 * k });
        if (kind === 'onion') { const nx = ox + (r() - 0.5) * cw * 0.5, ny = oy + (r() - 0.5) * 12; ctx.save(); ctx.globalAlpha *= 0.3 + 0.7 * k; ctx.fillStyle = '#7A4E1A'; ctx.beginPath(); ctx.ellipse(nx, ny, 12, 9, 0, 0, 7); ctx.fill(); ctx.restore(); }
        else { for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28 + r(); const px = ox + Math.cos(a) * (cw / 2 - 16), py = oy + Math.sin(a) * (ch / 2 - 14); ctx.save(); ctx.globalAlpha *= 0.4 + 0.6 * k; ctx.fillStyle = '#4F7A22'; ctx.beginPath(); ctx.ellipse(px + Math.sin(t * 0.8 + i) * 2, py, 7, 5, a, 0, 7); ctx.fill(); ctx.restore(); } }
      }
    } else { // cheek cells: flat, irregular, scattered
      const C = [[-120, -110, 110], [90, -140, 100], [150, 70, 115], [-60, 90, 105], [-200, 30, 80], [40, -10, 70], [220, -40, 70], [-150, 190, 80], [100, 210, 75]];
      C.forEach(([dx, dy, s], i) => {
        const p = blob(cx + dx, cy + dy, s, s * (0.75 + r() * 0.2), 3700 + i, 0.14, 40);
        wash(ctx, p, '#6D86B8', 0.22, 3710 + i, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: 2.2, closed: true, seed: 3720 + i, dry: false, color: '#2E3E6A', alpha: 0.4 + 0.6 * k });
        ctx.save(); ctx.globalAlpha *= 0.3 + 0.7 * k; ctx.fillStyle = '#3A4A86'; ctx.beginPath(); ctx.ellipse(cx + dx + s * 0.1, cy + dy - s * 0.05, s * 0.14, s * 0.12, 0, 0, 7); ctx.fill(); ctx.restore();
      });
    }
    if (soft > 0.01) { ctx.fillStyle = `rgba(250,246,236,${0.6 * soft})`; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); }
    // vignette of the eyepiece
    const v = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R); v.addColorStop(0, 'rgba(28,27,34,0)'); v.addColorStop(1, 'rgba(28,27,34,0.35)'); ctx.fillStyle = v; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    ctx.restore();
    stroke(ctx, circlePts(cx, cy, R, R, 90), { w: 10, closed: true, seed: 3800 });
    stroke(ctx, circlePts(cx, cy, R + 12, R + 12, 90), { w: 2.4, closed: true, seed: 3801, dry: false });
  };

  // ---------- TUĞLA DUVAR ----------
  F.bricks = (ctx, x, y, cols, rows, bw = 90, bh = 40, k = 1) => {
    let n = 0; const tot = cols * rows;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      n++; if (n / tot > k + 0.001) continue;
      const off = (r % 2) ? bw / 2 : 0; const bx = x + c * bw + off, by = y - (r + 1) * bh;
      if (r % 2 && c === cols - 1) continue;
      const b = wobble([[bx + 3, by + 3], [bx + bw - 3, by + 3], [bx + bw - 3, by + bh - 3], [bx + 3, by + bh - 3], [bx + 3, by + 3]], 1, 3900 + n);
      fill(ctx, b, '#E7C9A6'); wash(ctx, b, '#A0522D', 0.45, 3950 + n, { bleed: 0.8, blooms: 0 }); stroke(ctx, b, { w: 2, closed: true, seed: 4000 + n, dry: false });
    }
  };

  // ---------- kırmızı güvenlik kartı ----------
  F.card = (ctx, x0, y0, x1, y1, o = {}) => {
    const card = [[x0, y0 + 6], [x1, y0], [x1 + 8, y1], [x0 + 8, y1 + 8], [x0, y0 + 6]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, o.fill ?? '#FAF6EC'); ctx.restore();
    stroke(ctx, card, { w: 3, closed: true, color: o.color ?? PAL.ink, seed: o.seed ?? 88 });
  };

  // ---------- başlık ve bitiş kartı ----------
  F.title = (ctx, t, num, name, unit) => {
    const t1 = E.e('title') + 1.4;
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, num, name, code) => {
    const se = E.s('end'); const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.93; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      G.INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      G.INK.label(c, num + ' · ' + name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      G.INK.label(c, 'Fen Bilimleri · 5. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      G.INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  // label with leader: text at (tx,ty), leader to point p
  F.tag = (ctx, txt, tx, ty, p, k, o = {}) => {
    if (k <= 0) return;
    P.write(ctx, txt, tx, ty, k, { size: o.size ?? 38, align: o.align ?? 'left', color: o.color, weight: o.weight });
    if (p && k > 0.3) { ctx.save(); ctx.globalAlpha *= E.clamp((k - 0.3) / 0.5); ctx.font = `${o.weight ?? 700} ${o.size ?? 38}px Kalam`; const w = ctx.measureText(txt).width; const al = o.align ?? 'left'; const sx = al === 'right' ? tx + 8 : al === 'center' ? tx : tx - 8; const from = o.from ?? [al === 'left' ? tx - 10 : al === 'right' ? tx + 10 : tx, ty - (o.size ?? 38) * 0.35]; G.INK.leader(ctx, from, p, { w: 1.8, bend: o.bend ?? 0.15, seed: o.seed ?? 11 }); ctx.restore(); }
  };
  G.F12 = F;
})(window);

// ---- GEÇİCİ ÇÖZÜM (lib/engine.js): ardışık iki beat'in anahtar kavram etiketleri ~0,9 sn üst üste biniyor.
// Motorun kendi etiketini gizleyip aynı görünümde, bir sonraki etiket başlarken biten bir sürümünü çiziyoruz.
(function (G) {
  const E = G.E, { PAL, stroke, hatch } = G.INK;
  if (!E || E.__keyFix) return; E.__keyFix = true;
  const orig = E.renderFrame;
  function kwText(ctx, txt, x, y, k) { ctx.save(); ctx.font = '700 50px Kalam'; ctx.textAlign = 'left'; const blur = (1 - k) * 10; ctx.filter = blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : 'none'; ctx.globalAlpha = E.clamp(k * 1.3); ctx.fillStyle = PAL.ink; ctx.translate(x, y); ctx.rotate(-0.015); ctx.fillText(txt, 0, 0); ctx.restore(); }
  E.renderFrame = (ctx, t) => {
    const beats = G.NARRATION.beats, keys = beats.map(b => b.key);
    beats.forEach(b => { b.key = undefined; });
    try { orig(ctx, t); } finally { beats.forEach((b, i) => { b.key = keys[i]; }); }
    const kb = beats.filter(b => b.key);
    kb.forEach((b, i) => {
      const B = E.B(b.id); const t0 = B.s + 0.3; let t1 = Math.max(B.e, B.s + 4.5) + 1.2;
      if (kb[i + 1]) t1 = Math.min(t1, E.B(kb[i + 1].id).s + 0.3);
      if (t < t0 || t > t1) return;
      const k = Math.min(E.ease.out(E.seg(t, t0, t0 + 0.7)), 1 - E.ease.in(E.seg(t, t1 - 0.5, t1)));
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = '700 50px Kalam'; const w = ctx.measureText(b.key).width; const x = 70, y = 64;
      ctx.globalAlpha = k;
      const tag = [[x - 26, y - 6], [x + w + 30, y - 10], [x + w + 22, y + 74], [x - 22, y + 78], [x - 26, y - 6]];
      ctx.fillStyle = 'rgba(251,248,241,0.92)'; ctx.beginPath(); tag.forEach((p, j) => j ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.fill();
      stroke(ctx, tag, { w: 2.2, closed: true, seed: 5 + b.id.length, dry: false });
      hatch(ctx, x - 20, y + 2, 10, 60, { n: 1, ang: 1.57, w: 5, alpha: 0.8, color: PAL.light, seed: 3 });
      ctx.restore();
      kwText(ctx, b.key, x + 4, y + 52, k);
    });
  };
})(window);

// ================= Film 10'dan kopya çizimler (çocuk, kalp) =================
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble, dashed } = G.INK;
  const F = G.F12;
  const fill = (ctx, pts, col, a = 1) => P.fillPts(ctx, pts, col, a);
  F.ROSE = '#C07A6A'; F.VEIN = '#4E7898';
  // kas hücresi: iğ biçimli, tek çekirdekli model (ölçeksiz)
  F.spindle = (x, y, L, T, rot = 0, n = 30) => { const p = [], q = []; for (let i = 0; i <= n; i++) { const u = i / n, px = (u - 0.5) * L, py = T / 2 * Math.pow(Math.sin(Math.PI * u), 0.8); p.push([px, -py]); q.push([px, py]); } const pts = p.concat(q.reverse()); return pts.map(([a, b]) => [x + a * Math.cos(rot) - b * Math.sin(rot), y + a * Math.sin(rot) + b * Math.cos(rot)]); };
  F.muscleCell = (ctx, x, y, L, T, rot, seed, o = {}) => {
    const pts = F.spindle(x, y, L, T, rot);
    fill(ctx, pts, '#F4DDD4'); if (o.fast) fill(ctx, pts, F.ROSE, (o.a ?? 0.45) * 0.55); else wash(ctx, pts, F.ROSE, o.a ?? 0.45, seed, { bleed: Math.max(0.5, T * 0.02), blooms: 0 });
    stroke(ctx, pts, { w: o.w ?? 2.2, closed: true, seed: seed + 1, dry: false, color: o.col ?? PAL.ink });
    const nx = x, ny = y; ctx.save(); ctx.globalAlpha *= 0.8; ctx.fillStyle = '#7A4E78'; ctx.beginPath(); ctx.ellipse(nx, ny, L * 0.07, T * 0.2, rot, 0, 7); ctx.fill(); ctx.restore();
    return pts;
  };
  F.tissue = (ctx, cx, cy, w, h, k = 1, seed = 1, o = {}) => {
    const R = rng(seed); const region = F.blob(cx, cy, w / 2, h / 2, seed + 5, 0.06, 60);
    ctx.save(); P.path(ctx, region); ctx.closePath(); ctx.clip();
    fill(ctx, region, '#F7E7E0');
    const L = o.L ?? 190, T = o.T ?? 46, rows = Math.ceil(h / (T * 0.62)) + 2; let n = 0, tot = 0;
    for (let r = 0; r < rows; r++) for (let c = -1; c < Math.ceil(w / L) + 1; c++) tot++;
    for (let r = 0; r < rows; r++) for (let c = -1; c < Math.ceil(w / L) + 1; c++) {
      n++; const x = cx - w / 2 + c * L + (r % 2) * L / 2 + (R() - 0.5) * 20, y = cy - h / 2 + r * T * 0.62 + (R() - 0.5) * 6;
      if (n / tot > k) continue;
      F.muscleCell(ctx, x, y, L * 1.02, T, (R() - 0.5) * 0.06, seed * 31 + n, { a: 0.4, w: 1.6, fast: true });
    }
    ctx.restore();
    stroke(ctx, region, { w: 2.6, closed: true, seed: seed + 9 });
    return region;
  };
  // kalp (dostça, sade mürekkep çizimi — gerçekçi/kanlı değil)
  F.heart = (ctx, x, y, s, t = 0, o = {}) => {
    const b = 1 + (o.beat ?? 1) * 0.025 * Math.max(0, Math.sin(t * 7));
    ctx.save(); ctx.translate(x, y); ctx.scale(s * b, s * b);
    const tube = (pts, col, w) => { stroke(ctx, pts, { w: w + 4.5, color: PAL.ink, taper: 0, dry: false, seed: 5 }); stroke(ctx, pts, { w, color: col, taper: 0, dry: false, seed: 6 }); };
    tube(P.bez([112, -30], [120, -110], [118, -175], 16), '#8FB0C8', 24);          // toplardamar
    tube(P.bez([-40, -80], [-70, -130], [-95, -150], 16), '#D79A8A', 26);           // atardamar kolu
    tube(P.bez([10, -85], [0, -190], [70, -185], 20).concat(P.bez([70, -185], [110, -182], [95, -120], 12)), '#D08A7A', 30); // ana atardamar kıvrımı
    const body = P.bez([-100, -55], [-140, 70], [10, 150], 24).concat(P.bez([10, 150], [150, 70], [118, -35], 24), P.bez([118, -35], [80, -112], [10, -95], 16), P.bez([10, -95], [-60, -105], [-100, -55], 16));
    fill(ctx, body, '#F2D2C8'); wash(ctx, body, F.ROSE, 0.6, 1701, { bleed: 1.5, blooms: 2 });
    stroke(ctx, body, { w: 3.4, closed: true, seed: 1702 });
    stroke(ctx, P.bez([30, -80], [-10, 20], [5, 130], 20), { w: 2, dry: false, alpha: 0.6, seed: 1703 });
    stroke(ctx, P.bez([30, -60], [70, 20], [60, 80], 16), { w: 1.6, dry: false, alpha: 0.45, seed: 1704 });
    ctx.restore();
  };
  // çocuk figürü: (x,y) ayak; s=1 → ≈ 420 px
  F.kid = (ctx, x, y, s, o = {}) => {
    const ph = o.phase ?? 0, run = o.run ? 1 : 0, xr = o.xray ?? 0;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const skin = '#EBC9A6', shirt = o.shirt ?? '#9DB36A', pants = '#5E6E8A';
    const sw = Math.sin(ph) * run;
    const limb = (a, b, w, col) => { stroke(ctx, [a, b], { w: w + 6, color: PAL.ink, taper: 0, dry: false, seed: 11 }); stroke(ctx, [a, b], { w, color: col, taper: 0, dry: false, seed: 12 }); };
    const hipL = [-22, -165], hipR = [22, -165];
    const footL = [-26 + sw * 70, -4 - Math.max(0, -sw) * 30 * run], footR = [26 - sw * 70, -4 - Math.max(0, sw) * 30 * run];
    const kneeL = [(hipL[0] + footL[0]) / 2 + 12 * run, -85 - 10 * run], kneeR = [(hipR[0] + footR[0]) / 2 + 12 * run, -85 - 10 * run];
    const legC = xr > 0 ? '#F6ECE0' : pants;
    limb(hipL, kneeL, 26, legC); limb(kneeL, footL, 22, legC); limb(hipR, kneeR, 26, legC); limb(kneeR, footR, 22, legC);
    [footL, footR].forEach(f => { ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.ellipse(f[0] + 10, f[1] + 2, 20, 9, 0, 0, 7); ctx.fill(); ctx.restore(); });
    const shL = [-44, -290], shR = [44, -290];
    const handL = [-60 - sw * 55, -190 - Math.abs(sw) * 20], handR = [60 + sw * 55, -190 - Math.abs(sw) * 20];
    const elL = [(shL[0] + handL[0]) / 2 - 10, (shL[1] + handL[1]) / 2], elR = [(shR[0] + handR[0]) / 2 + 10, (shR[1] + handR[1]) / 2];
    const armC = xr > 0 ? '#F6ECE0' : skin;
    const torso = F.rrect(0, -228, 104, 150, 30);
    fill(ctx, torso, xr > 0 ? '#F6ECE0' : shirt); if (!xr) wash(ctx, torso, PAL.life, 0.3, 1801, { bleed: 1, blooms: 0 }); stroke(ctx, torso, { w: 3, closed: true, seed: 1802 });
    limb(shL, elL, 20, armC); limb(elL, handL, 18, armC);
    if (o.cast) { const e2 = [52, -215], h2 = [-12, -212]; limb(shR, e2, 20, skin); limb(e2, h2, 30, '#FBF8F1'); stroke(ctx, [[-44, -292], [60, -200]], { w: 5, color: PAL.water, dry: false }); stroke(ctx, [[-20, -196], [58, -198]], { w: 1.4, dry: false, alpha: 0.5 }); }
    else { limb(shR, elR, 20, armC); limb(elR, handR, 18, armC); }
    if (o.pads) [kneeL, kneeR].forEach(k => { const c = circlePts(k[0], k[1], 17, 15, 20); fill(ctx, c, '#5A5560'); stroke(ctx, c, { w: 2, closed: true, dry: false }); });
    if (o.skates) [footL, footR].forEach(f => { const b = [[f[0] - 18, f[1] - 22], [f[0] + 30, f[1] - 22], [f[0] + 32, f[1] + 6], [f[0] - 20, f[1] + 6], [f[0] - 18, f[1] - 22]]; fill(ctx, b, '#E3A03A'); stroke(ctx, b, { w: 2.4, closed: true, dry: false }); [-10, 6, 22].forEach(wx => { const w = circlePts(f[0] + wx, f[1] + 14, 8, 8, 14); fill(ctx, w, PAL.ink); }); });
    // head
    const head = circlePts(0, -350, 52, 54, 40); fill(ctx, head, skin); stroke(ctx, head, { w: 3, closed: true, seed: 1803 });
    const hair = P.arc(0, -352, 56, Math.PI * 1.02, Math.PI * 1.98, 20, 58).concat([[40, -370], [10, -380], [-30, -372]]); fill(ctx, hair, '#4A3526'); 
    inkDot(ctx, -18, -348, 4.2); inkDot(ctx, 18, -348, 4.2);
    if (o.sad) stroke(ctx, P.arc(0, -318, 12, Math.PI + 0.4, 2 * Math.PI - 0.4, 12), { w: 2.4, dry: false }); else stroke(ctx, P.arc(0, -335, 14, 0.3, Math.PI - 0.3, 12), { w: 2.4, dry: false });
    if (o.helmet) { const hm = P.arc(0, -360, 60, Math.PI * 1.02, Math.PI * 1.98, 24, 60).concat([[62, -352], [-62, -352]]); fill(ctx, hm, PAL.water, 0.9); stroke(ctx, hm, { w: 3, closed: true, dry: false }); stroke(ctx, [[-10, -418], [10, -418]], { w: 5, color: PAL.white, dry: false }); stroke(ctx, [[-52, -352], [-40, -305]], { w: 2, dry: false }); stroke(ctx, [[52, -352], [40, -305]], { w: 2, dry: false }); }
    // x-ray: circulatory system (heart + vessels)
    if (xr > 0) {
      ctx.save(); ctx.globalAlpha *= xr;
      const V = (pts, col) => stroke(ctx, pts, { w: 2.6, color: col, dry: false, seed: 1810 + pts.length, taper: 0.05 });
      const hx = 10, hy = -250;
      [[shL, elL, handL], [shR, elR, handR], [hipL, kneeL, footL], [hipR, kneeR, footR]].forEach((ch, i) => { V([[hx - 6, hy], ...ch.map(p => [p[0] - 3, p[1]])], F.ROSE); V([[hx + 6, hy + 6], ...ch.map(p => [p[0] + 3, p[1] + 3])], F.VEIN); });
      V([[hx, hy], [0, -290], [0, -302]], F.ROSE);
      ctx.restore();
      ctx.save(); ctx.globalAlpha *= xr; F.heart(ctx, 10, -250, 0.2, o.t ?? 0); ctx.restore();
    }
    if (o.lungs) { ctx.save(); ctx.globalAlpha *= o.lungs; [[-24, -250], [30, -250]].forEach(([lx, ly], i) => { const l = F.blob(lx, ly, 20, 38, 1820 + i, 0.08, 30); fill(ctx, l, '#F0C7C0', 0.9); stroke(ctx, l, { w: 2, closed: true, dry: false }); }); ctx.restore(); F.heart(ctx, 4, -238, 0.14 * (o.lungs), o.t ?? 0); }
    ctx.restore();
    const W = (p) => [x + p[0] * s, y + p[1] * s];
    return { heart: W([10, -250]), lungs: W([-24, -255]), leg: W([(hipR[0] + kneeR[0]) / 2, (hipR[1] + kneeR[1]) / 2]), head: W([0, -350]), hand: W(handR), arm: W([56, -225]), knee: W(kneeR) };
  };
  // yerleşim birimleri
  F.house = (ctx, x, y, s, seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-40, 0], [40, 0], [40, -60], [-40, -60], [-40, 0]]; fill(ctx, b, '#F1DDBF'); wash(ctx, b, '#C08A3A', 0.3, 1900 + seed, { bleed: 0.6, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 1910 + seed });
    const r = [[-52, -58], [0, -100], [52, -58], [-52, -58]]; fill(ctx, r, '#B0694A', 0.85); stroke(ctx, r, { w: 2.6, closed: true, seed: 1920 + seed });
    stroke(ctx, [[-12, 0], [-12, -30], [10, -30], [10, 0]], { w: 2, dry: false }); const wdw = [[18, -48], [32, -48], [32, -34], [18, -34], [18, -48]]; fill(ctx, wdw, '#E3EEF2'); stroke(ctx, wdw, { w: 1.6, closed: true, dry: false });
    ctx.restore();
  };
  F.neighborhood = (ctx, x, y, s, seed = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, [[-150, 30], [150, 20]], { w: 16, color: '#CFC3AD', taper: 0, dry: false }); dashed(ctx, [[-140, 28], [140, 21]], { w: 2, on: 10, off: 10, alpha: 0.6 });
    [[-100, 0], [-20, -10], [70, 0], [-60, 90], [40, 85], [120, 80]].forEach(([hx, hy], i) => F.house(ctx, hx, hy, 0.62, seed * 10 + i));
    ctx.restore();
  };
  F.region = (ctx, x, y, rx, ry, seed, o = {}) => { // il / ülke: bölge + iç sınırlar
    const b = F.blob(x, y, rx, ry, seed, o.amp ?? 0.12, 80);
    fill(ctx, b, '#EEE6D2'); wash(ctx, b, o.col ?? PAL.life, o.a ?? 0.35, seed + 1, { bleed: 1.5, blooms: 1 });
    const R = rng(seed + 3);
    ctx.save(); P.path(ctx, b); ctx.closePath(); ctx.clip();
    for (let i = 0; i < (o.cuts ?? 4); i++) { const a = R() * 3.14, cx = x + (R() - 0.5) * rx, cy = y + (R() - 0.5) * ry; ctx.save(); ctx.globalAlpha *= 0.6; dashed(ctx, wobble([[cx - Math.cos(a) * rx * 2, cy - Math.sin(a) * ry * 2], [cx, cy], [cx + Math.cos(a) * rx * 2, cy + Math.sin(a) * ry * 2]], 4, seed + 10 + i), { w: 1.8, on: 9, off: 7 }); ctx.restore(); }
    ctx.restore();
    stroke(ctx, b, { w: 3, closed: true, seed: seed + 2 });
    return b;
  };
  F.district = (ctx, x, y, s, seed = 1) => { // ilçe: birkaç mahalle
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.blob(0, 0, 150, 110, seed + 40, 0.1, 60); fill(ctx, b, '#EFE6D0'); wash(ctx, b, '#C08A3A', 0.18, seed + 41, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: seed + 42 });
    [[-60, -30], [55, -40], [-40, 55], [70, 45]].forEach(([hx, hy], i) => { for (let j = 0; j < 3; j++) F.house(ctx, hx + (j - 1) * 30, hy + (j % 2) * 10, 0.28, seed + i * 3 + j); });
    stroke(ctx, [[-150, 5], [150, 0]], { w: 5, color: '#CFC3AD', taper: 0, dry: false }); stroke(ctx, [[0, -110], [5, 110]], { w: 5, color: '#CFC3AD', taper: 0, dry: false });
    ctx.restore();
  };
  // terlik hayvanı (tek hücreli canlı) — sade model
  F.paramecium = (ctx, x, y, s, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.2 + Math.sin(t * 0.8) * 0.05);
    const b = P.bez([-200, 0], [-180, -95], [20, -80], 20).concat(P.bez([20, -80], [200, -70], [205, 5], 20), P.bez([205, 5], [190, 80], [30, 75], 20), P.bez([30, 75], [-40, 40], [-90, 60], 12), P.bez([-90, 60], [-190, 80], [-200, 0], 16));
    for (let i = 0; i < b.length; i += 2) { const p = b[i], q = b[(i + 1) % b.length]; const nx = -(q[1] - p[1]), ny = q[0] - p[0], L = Math.hypot(nx, ny) || 1; const w = Math.sin(t * 6 + i * 0.5) * 6; line(ctx, p, [p[0] - nx / L * 16 + w, p[1] - ny / L * 16], { w: 1.2, dry: false, alpha: 0.6, seed: 2000 + i }); }
    fill(ctx, b, '#EDF2DC'); wash(ctx, b, PAL.life, 0.35, 2050, { bleed: 1.2, blooms: 1 }); stroke(ctx, b, { w: 3.2, closed: true, seed: 2051 });
    const n = circlePts(40, -5, 42, 30, 30); fill(ctx, n, '#E8D6E4'); wash(ctx, n, '#8E6A8C', 0.55, 2052, { bleed: 0.6, blooms: 0 }); stroke(ctx, n, { w: 2.2, closed: true, seed: 2053 });
    [[-110, -20, 20], [140, 10, 16]].forEach(([vx, vy, r], i) => { const v = circlePts(vx, vy, r, r, 20); fill(ctx, v, '#E3EEF2'); stroke(ctx, v, { w: 1.8, closed: true, dry: false, seed: 2054 + i }); });
    ctx.restore();
  };
})(window);

// ================= Film 11 özel çizimleri =================
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble, dashed } = G.INK;
  const F = G.F12;
  const fill = (ctx, pts, col, a = 1) => P.fillPts(ctx, pts, col, a);
  F.BONE = '#F4EAD2'; F.HI = '#F2C572'; F.CART = '#A9CADB'; F.MUS = '#D98C7C';
  // karikatür kemik: a→b arası gövde + iki uçta yumru
  F.bone = (ctx, a, b, w, col = F.BONE, knob = true) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const ends = knob ? [a, b].flatMap(p => [[p[0] + nx * w * 0.42, p[1] + ny * w * 0.42], [p[0] - nx * w * 0.42, p[1] - ny * w * 0.42]]) : [];
    const r = w * 0.6;
    ctx.save(); ctx.lineCap = 'round';
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = w + 5; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke();
    ctx.fillStyle = PAL.ink; ends.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r + 2.5, 0, 7); ctx.fill(); });
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke();
    ctx.fillStyle = col; ends.forEach(p => { ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 7); ctx.fill(); });
    ctx.restore();
  };
  const curveBone = (ctx, pts, w, col) => { ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; P.path(ctx, pts); ctx.strokeStyle = PAL.ink; ctx.lineWidth = w + 5; ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); };
  const blobBone = (ctx, pts, col, seed) => { fill(ctx, pts, col); stroke(ctx, pts, { w: 2.6, closed: true, seed, dry: false }); };
  // İSKELET (önden, sade). (x,y) ayak; s=1 → ≈ 730 px. o.hi: {long, short, flat, fixed, semi, move} (0..1)
  F.skeleton = (ctx, x, y, s, o = {}) => {
    const h = o.hi || {}; const C = k => (h[k] ?? 0) > 0.5 ? F.HI : F.BONE;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    // spine
    for (let i = 0; i < 16; i++) { const yy = -585 + i * 17; const v = [[-11, yy], [11, yy], [11, yy + 12], [-11, yy + 12], [-11, yy]]; fill(ctx, v, (h.semi ?? 0) > 0.5 ? F.HI : F.BONE); stroke(ctx, v, { w: 1.8, closed: true, dry: false, seed: 3000 + i }); }
    // pelvis
    const pel = [[-18, -325], [-80, -345], [-98, -305], [-70, -270], [-35, -262], [0, -280], [35, -262], [70, -270], [98, -305], [80, -345], [18, -325], [-18, -325]];
    blobBone(ctx, pel, F.BONE, 3050);
    // ribs + sternum
    for (let i = 0; i < 6; i++) { const yy = -535 + i * 20; [-1, 1].forEach(sd => curveBone(ctx, P.bez([sd * 12, yy], [sd * (100 + i * 2), yy - 10], [sd * (74 + i * 3), yy + 42], 16), 7, C('flat'))); }
    const st = [[-11, -540], [11, -540], [9, -440], [-9, -440], [-11, -540]]; blobBone(ctx, st, C('flat'), 3060);
    // clavicles
    [-1, 1].forEach(sd => F.bone(ctx, [sd * 14, -552], [sd * 92, -545], 9));
    // arms
    [-1, 1].forEach(sd => {
      F.bone(ctx, [sd * 102, -540], [sd * 120, -405], 15, C('long'));
      F.bone(ctx, [sd * 114, -398], [sd * 124, -282], 8); F.bone(ctx, [sd * 127, -398], [sd * 137, -284], 8);
      const R = rng(40 + sd); for (let j = 0; j < 6; j++) { const c = circlePts(sd * (122 + (j % 3) * 8), -272 + Math.floor(j / 3) * 10, 5.5, 5, 10); fill(ctx, c, C('short')); stroke(ctx, c, { w: 1.4, closed: true, dry: false, seed: 3070 + j }); }
      for (let f = 0; f < 4; f++) curveBone(ctx, [[sd * (118 + f * 7), -252], [sd * (116 + f * 9), -215], [sd * (114 + f * 10), -190]], 4, F.BONE);
    });
    // legs
    [-1, 1].forEach(sd => {
      F.bone(ctx, [sd * 52, -290], [sd * 56, -155], 20, C('long'));
      F.bone(ctx, [sd * 50, -135], [sd * 52, -30], 13); F.bone(ctx, [sd * 70, -132], [sd * 72, -34], 7);
      const pt = circlePts(sd * 56, -146, 12, 11, 16); fill(ctx, pt, F.BONE); stroke(ctx, pt, { w: 1.8, closed: true, dry: false });
      for (let j = 0; j < 6; j++) { const c = circlePts(sd * (48 + (j % 3) * 9), -20 + Math.floor(j / 3) * 9, 5.5, 4.5, 10); fill(ctx, c, C('short')); stroke(ctx, c, { w: 1.4, closed: true, dry: false, seed: 3080 + j }); }
      for (let f = 0; f < 4; f++) curveBone(ctx, [[sd * (48 + f * 8), -4], [sd * (52 + f * 11), 6]], 4, F.BONE);
    });
    // skull
    const cr = circlePts(0, -668, 62, 64, 40); fill(ctx, cr, C('flat')); stroke(ctx, cr, { w: 2.8, closed: true, seed: 3090 });
    const jaw = P.bez([-44, -640], [-40, -588], [0, -586], 12).concat(P.bez([0, -586], [40, -588], [44, -640], 12)); fill(ctx, jaw, F.BONE); stroke(ctx, jaw, { w: 2.6, seed: 3091, dry: false });
    [-1, 1].forEach(sd => { const e = circlePts(sd * 23, -660, 14, 12, 18); fill(ctx, e, '#CFC3AD'); stroke(ctx, e, { w: 2, closed: true, dry: false }); });
    fill(ctx, [[-5, -640], [5, -640], [0, -628]], '#9A8E78');
    stroke(ctx, [[-20, -612], [20, -612]], { w: 1.6, dry: false, alpha: 0.6 });
    if ((h.fixed ?? 0) > 0) { ctx.save(); ctx.globalAlpha *= h.fixed; P.drawOn(ctx, [[-50, -700], [-35, -708], [-25, -698], [-10, -712], [5, -700], [20, -712], [35, -700], [50, -708]], 1, { w: 3.4, color: '#8A4A10' }); ctx.restore(); }
    // movable joints
    if ((h.move ?? 0) > 0) { ctx.save(); ctx.globalAlpha *= h.move; [[-1, -540, 102], [1, -540, 102], [-1, -402, 120], [1, -402, 120], [-1, -148, 56], [1, -148, 56], [-1, -288, 50], [1, -288, 50]].forEach(([sd, yy, xx]) => stroke(ctx, circlePts(sd * xx, yy, 20, 20, 24), { w: 3.4, closed: true, color: '#C07F1E', dry: false })); ctx.restore(); }
    ctx.restore();
    const W = (px, py) => [x + px * s, y + py * s];
    return { skull: W(40, -700), femur: W(56, -225), humerus: W(112, -470), carpal: W(132, -268), tarsal: W(66, -16), ribs: W(85, -470), sternum: W(0, -500), spine: W(0, -330), knee: W(56, -148), elbow: W(122, -402), shoulder: W(102, -540), hip: W(50, -288), pelvis: W(-90, -305) };
  };
  // bina iskeleti (köprü kurma)
  F.building = (ctx, x, y, k, t) => { // (x,y) zemin sol köşe; 3 sütun x 5 kat
    const W = 420, H = 560, cols = 4, fl = 5;
    for (let c = 0; c < cols; c++) { const cx = x + c * W / (cols - 1); P.drawOn(ctx, [[cx, y], [cx, y - H]], E.clamp(k * 1.6 - c * 0.1), { w: 8, color: '#5A5560' }); }
    for (let f = 1; f <= fl; f++) { const fy = y - f * H / fl; P.drawOn(ctx, [[x, fy], [x + W, fy]], E.clamp(k * 2 - 0.4 - f * 0.1), { w: 7, color: '#5A5560' }); }
    if (k > 0.6) for (let c = 0; c < cols; c++) for (let f = 1; f <= fl; f++) inkDot(ctx, x + c * W / (cols - 1), y - f * H / fl, 5);
    const wk = E.clamp((k - 0.7) / 0.3);
    if (wk > 0) { ctx.save(); ctx.globalAlpha *= 0.75 * wk; for (let f = 0; f < 2; f++) { const fy = y - f * H / fl; const p = [[x + 4, fy - 4], [x + W / 3 * 2 - 4, fy - 4], [x + W / 3 * 2 - 4, fy - H / fl + 6], [x + 4, fy - H / fl + 6]]; fill(ctx, p, '#E7C9A6'); } ctx.restore(); }
  };
  // büyük baş (kıkırdak: kulak kepçesi, burun ucu)
  F.head = (ctx, x, y, s, o = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const skin = '#EBC9A6';
    [-1, 1].forEach(sd => { const ear = F.blob(sd * 172, 10, 34, 58, 3200 + sd, 0.06, 30); fill(ctx, ear, skin); if (o.ear) { ctx.save(); ctx.globalAlpha *= o.ear; fill(ctx, ear, F.CART); ctx.restore(); } stroke(ctx, ear, { w: 3, closed: true, seed: 3210 + sd }); stroke(ctx, P.arc(sd * 170, 10, 18, sd > 0 ? -1.2 : 1.9, sd > 0 ? 1.2 : 4.3, 12, 34), { w: 2, dry: false, alpha: 0.6 }); });
    const face = circlePts(0, 0, 170, 185, 60); fill(ctx, face, skin); stroke(ctx, face, { w: 3.4, closed: true, seed: 3220 });
    const hair = P.arc(0, -5, 178, Math.PI * 1.05, Math.PI * 1.95, 30, 192).concat([[150, -110], [60, -140], [-40, -130], [-150, -110]]); fill(ctx, hair, '#4A3526');
    inkDot(ctx, -60, -10, 9); inkDot(ctx, 60, -10, 9);
    stroke(ctx, P.arc(0, 70, 42, 0.35, Math.PI - 0.35, 14), { w: 3, dry: false });
    const nose = P.bez([0, -20], [10, 30], [18, 42], 10).concat(P.bez([18, 42], [0, 52], [-16, 44], 8));
    const tip = circlePts(2, 40, 20, 13, 20);
    if (o.nose) { ctx.save(); ctx.globalAlpha *= o.nose; fill(ctx, tip, F.CART); ctx.restore(); }
    stroke(ctx, nose, { w: 2.6, dry: false });
    ctx.restore();
    return { ear: [x + 196 * s, y + 10 * s], earL: [x - 196 * s, y + 10 * s], nose: [x + 12 * s, y + 42 * s] };
  };
  // eklem çizimleri
  F.kneeBend = (ctx, x, y, s, ang) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); F.bone(ctx, [0, -150], [0, 0], 22); ctx.rotate(ang); F.bone(ctx, [0, 12], [0, 150], 16); ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); stroke(ctx, circlePts(0, 6, 26, 26, 24), { w: 3.4, closed: true, color: '#C07F1E', dry: false }); ctx.restore(); };
  F.spineBend = (ctx, x, y, s, ang) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(0, -i * 44); ctx.rotate(ang * i); const v = F.rrect(0, 0, 90, 34, 8); fill(ctx, v, F.BONE); stroke(ctx, v, { w: 2.4, closed: true, seed: 3300 + i }); if (i < 4) { stroke(ctx, [[-30, -24], [30, -24]], { w: 3, color: '#C07F1E', dry: false }); } ctx.restore(); } ctx.restore(); };
  F.skullSide = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const cr = circlePts(0, 0, 110, 100, 40); fill(ctx, cr, F.BONE); stroke(ctx, cr, { w: 3, closed: true, seed: 3310 }); P.drawOn(ctx, [[-90, -50], [-60, -70], [-40, -55], [-15, -80], [10, -62], [35, -85], [60, -65], [90, -48]], 1, { w: 3.6, color: '#8A4A10' }); P.drawOn(ctx, [[-10, -98], [0, -70], [-12, -40], [4, -10]], 1, { w: 3, color: '#8A4A10' }); ctx.restore(); };
  // kas çizimleri (dostça)
  F.armMuscle = (ctx, x, y, s, lift = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const skinCap = (a, b, w) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = PAL.ink; ctx.globalAlpha *= 0.8; ctx.lineWidth = w + 5; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); ctx.globalAlpha = 1; ctx.strokeStyle = '#F3DDC6'; ctx.lineWidth = w; ctx.stroke(); ctx.restore(); };
    skinCap([-10, -10], [178, 0], 92);
    ctx.save(); ctx.translate(178, 0); ctx.rotate(-lift); skinCap([0, 0], [165, 0], 70); ctx.restore();
    F.bone(ctx, [0, 0], [170, 0], 16);
    const mus = P.bez([20, -8], [90, -70], [160, -10], 16).concat(P.bez([160, -10], [90, -2], [20, -8], 10)); fill(ctx, mus, '#F0C2B6'); wash(ctx, mus, F.MUS, 0.6, 3320, { bleed: 1, blooms: 0 }); stroke(ctx, mus, { w: 2.6, closed: true, seed: 3321 });
    ctx.translate(178, 0); ctx.rotate(-lift); F.bone(ctx, [0, 0], [150, 0], 11); inkDot(ctx, 158, 0, 9);
    ctx.restore();
  };
  F.stomach = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const st = P.bez([-40, -110], [-70, 10], [0, 40], 16).concat(P.bez([0, 40], [80, 50], [90, -20], 14), P.bez([90, -20], [60, -40], [20, -20], 10), P.bez([20, -20], [0, -60], [-10, -110], 10));
    fill(ctx, st, '#F0C2B6'); wash(ctx, st, F.MUS, 0.45, 3330, { bleed: 1, blooms: 0 }); stroke(ctx, st, { w: 3, closed: true, seed: 3331 });
    const gut = []; for (let i = 0; i <= 80; i++) { const u = i / 80; gut.push([-60 + Math.sin(u * 20) * 60 * (0.6 + u * 0.4), 80 + u * 110]); }
    stroke(ctx, gut, { w: 14, color: PAL.ink, taper: 0, dry: false }); stroke(ctx, gut, { w: 9, color: '#E9B3A5', taper: 0, dry: false });
    ctx.restore();
  };
  // ağaç düğümü
  F.node = (ctx, txt, x, y, k, o = {}) => {
    if (k <= 0) return; ctx.save(); ctx.font = `700 ${o.size ?? 40}px Kalam`; const w = ctx.measureText(txt).width + 44, h = (o.size ?? 40) * 1.5; ctx.restore();
    ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
    const b = wobble(F.rrect(0, 0, w, h, 16, 6), 1.2, 3400 + txt.length); fill(ctx, b, o.fill ?? '#FBF8F1'); if (o.tint) wash(ctx, b, o.tint, 0.3, 3410 + txt.length, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.6, closed: true, seed: 3420 + txt.length });
    ctx.font = `700 ${o.size ?? 40}px Kalam`; ctx.textAlign = 'center'; ctx.fillStyle = o.color ?? PAL.ink; ctx.fillText(txt, 0, (o.size ?? 40) * 0.36); ctx.restore();
    return w;
  };
  F.edge = (ctx, a, b, k) => { if (k > 0) P.drawOn(ctx, P.bez(a, [a[0], (a[1] + b[1]) / 2 + 10], b, 20), k, { w: 2.4, color: PAL.ink }); };
})(window);

// ================= Film 12 özel çizimleri =================
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, inkDot, wobble, dashed } = G.INK;
  const F = G.F12;
  const fill = (ctx, pts, col, a = 1) => P.fillPts(ctx, pts, col, a);
  const RED = '#A23A2A';
  F.xray = (ctx, x, y, w, h, crack, t) => { // ışıklı panoda röntgen filmi (kol kemikleri)
    const fr = F.rrect(x, y, w + 40, h + 40, 16); fill(ctx, fr, '#D9D2C2'); stroke(ctx, fr, { w: 3, closed: true, seed: 5 });
    const film = F.rrect(x, y, w, h, 8); fill(ctx, film, '#23242C');
    const g = ctx.createRadialGradient(x, y, 10, x, y, w * 0.6); g.addColorStop(0, 'rgba(160,190,210,0.35)'); g.addColorStop(1, 'rgba(160,190,210,0)'); ctx.save(); ctx.fillStyle = g; P.path(ctx, film); ctx.fill(); ctx.restore();
    ctx.save(); P.path(ctx, film); ctx.clip();
    const bc = '#E6ECF0';
    const cap = (a, b, ww) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(190,210,225,0.25)'; ctx.lineWidth = ww * 3.2; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); ctx.restore(); };
    cap([x - w * 0.55, y - h * 0.05], [x + w * 0.55, y + h * 0.02], 34);
    F.bone(ctx, [x - w * 0.62, y - h * 0.2], [x - w * 0.12, y - h * 0.12], 22, bc);
    F.bone(ctx, [x - w * 0.06, y - h * 0.16], [x + w * 0.46, y - h * 0.02], 11, bc);
    F.bone(ctx, [x - w * 0.06, y - h * 0.04], [x + w * 0.46, y + h * 0.1], 12, bc);
    if (crack > 0) { const cx = x + w * 0.22, cy = y + h * 0.04; ctx.save(); ctx.globalAlpha *= crack; P.drawOn(ctx, [[cx - 6, cy - 16], [cx + 4, cy - 6], [cx - 4, cy + 2], [cx + 6, cy + 16]], 1, { w: 4, color: '#23242C' }); stroke(ctx, circlePts(cx, cy, 40, 40, 30), { w: 3.4, closed: true, color: PAL.light, dry: false }); ctx.restore(); }
    ctx.restore();
    return [x + w * 0.22, y + h * 0.04];
  };
  F.phone = (ctx, x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const b = F.rrect(0, 0, 90, 160, 14); fill(ctx, b, '#3A3842'); stroke(ctx, b, { w: 3, closed: true }); const sc = F.rrect(0, -6, 72, 116, 6); fill(ctx, sc, '#E3EEF2'); ctx.font = '700 36px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = RED; ctx.fillText('112', 0, 6); ctx.restore(); };
  F.adult = (ctx, x, y, s, o = {}) => { // yetişkin (sade): uzun gövde, önlük seçeneği
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const coat = o.coat ? '#FBF8F1' : '#8A6A45';
    [[-18, 0], [18, 0]].forEach(([fx]) => { stroke(ctx, [[fx * 0.8, -190], [fx, -4]], { w: 22, color: PAL.ink, taper: 0, dry: false }); stroke(ctx, [[fx * 0.8, -190], [fx, -4]], { w: 17, color: '#5E6E8A', taper: 0, dry: false }); });
    const body = F.rrect(0, -290, 110, 230, 34); fill(ctx, body, coat); stroke(ctx, body, { w: 3, closed: true });
    [-1, 1].forEach(sd => { stroke(ctx, [[sd * 52, -380], [sd * 66, -230]], { w: 22, color: PAL.ink, taper: 0, dry: false }); stroke(ctx, [[sd * 52, -380], [sd * 66, -230]], { w: 17, color: coat, taper: 0, dry: false }); });
    if (o.coat) { stroke(ctx, P.bez([-20, -390], [-30, -300], [0, -290], 12), { w: 3, color: PAL.water, dry: false }); stroke(ctx, P.bez([20, -390], [30, -300], [0, -290], 12), { w: 3, color: PAL.water, dry: false }); stroke(ctx, circlePts(0, -284, 8, 8, 12), { w: 3, closed: true, color: PAL.water, dry: false }); }
    const head = circlePts(0, -445, 46, 50, 30); fill(ctx, head, '#E6C19C'); stroke(ctx, head, { w: 3, closed: true });
    fill(ctx, P.arc(0, -448, 50, Math.PI * 1.05, Math.PI * 1.95, 20, 54).concat([[30, -470], [-30, -470]]), o.hair ?? '#7A6A5A');
    inkDot(ctx, -15, -442, 3.8); inkDot(ctx, 15, -442, 3.8); stroke(ctx, P.arc(0, -430, 12, 0.3, Math.PI - 0.3, 10), { w: 2.2, dry: false });
    ctx.restore();
  };
  // besinler
  F.food = (ctx, kind, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    if (kind === 'milk') { const g = [[-30, -50], [30, -50], [24, 50], [-24, 50], [-30, -50]]; fill(ctx, g, '#FFFFFF'); fill(ctx, [[-28, -30], [28, -30], [24, 50], [-24, 50]], '#F3F0E6'); stroke(ctx, g, { w: 3, closed: true }); }
    else if (kind === 'cheese') { const c = [[-50, 30], [50, 30], [50, -10], [-50, -30], [-50, 30]]; fill(ctx, c, '#F2D27A'); stroke(ctx, c, { w: 3, closed: true }); [[-20, 5], [20, 12]].forEach(([hx, hy]) => stroke(ctx, circlePts(hx, hy, 7, 6, 12), { w: 2, closed: true, dry: false })); }
    else if (kind === 'egg') { const e = circlePts(0, 0, 34, 44, 30); fill(ctx, e, '#FBF3E2'); stroke(ctx, e, { w: 3, closed: true }); }
    else if (kind === 'greens') { stroke(ctx, [[0, 50], [0, 0]], { w: 10, color: '#6F8A3A', taper: 0 }); [[-24, -10], [0, -28], [24, -10], [-12, -38], [12, -40]].forEach(([bx, by], i) => { const c = wobble(circlePts(bx, by, 22, 20, 18), 2, 10 + i); fill(ctx, c, '#6F8A3A'); stroke(ctx, c, { w: 2, closed: true, dry: false }); }); }
    else if (kind === 'bread') { const b = P.arc(0, -10, 50, Math.PI, 2 * Math.PI, 20, 30).concat([[50, 30], [-50, 30]]); fill(ctx, b, '#D9A45A'); stroke(ctx, b, { w: 3, closed: true }); }
    else if (kind === 'fish') { const f = P.bez([-50, 0], [0, -34], [40, 0], 14).concat(P.bez([40, 0], [0, 34], [-50, 0], 14)); fill(ctx, f, '#A9C0CF'); stroke(ctx, f, { w: 3, closed: true }); fill(ctx, [[40, 0], [62, -20], [62, 20]], '#A9C0CF'); stroke(ctx, [[40, 0], [62, -20], [62, 20], [40, 0]], { w: 3, closed: true }); inkDot(ctx, -28, -6, 4); }
    ctx.restore();
  };
  F.ball = (ctx, x, y, r, t = 0) => { const c = circlePts(x, y, r, r, 30); fill(ctx, c, '#FBF8F1'); stroke(ctx, c, { w: 3, closed: true }); fill(ctx, circlePts(x, y, r * 0.3, r * 0.3, 5, t), PAL.ink); for (let i = 0; i < 5; i++) { const a = t + i / 5 * 6.283; stroke(ctx, [[x + Math.cos(a) * r * 0.3, y + Math.sin(a) * r * 0.3], [x + Math.cos(a) * r * 0.95, y + Math.sin(a) * r * 0.95]], { w: 2, dry: false }); } };
  // yandan oturan figür: good=true dik, false kambur + ekran
  F.sitter = (ctx, x, y, s, good, t = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    stroke(ctx, [[-60, 0], [-60, -110], [40, -110], [40, 0]], { w: 4, color: '#8A6A45' }); stroke(ctx, [[-60, -110], [-66, -250]], { w: 5, color: '#8A6A45' });
    const hip = [-30, -125];
    const back = good ? P.bez(hip, [-38, -200], [-30, -270], 12) : P.bez(hip, [-10, -210], [30, -250], 12);
    const neck = back[back.length - 1];
    const head = good ? [neck[0] + 4, neck[1] - 40] : [neck[0] + 34, neck[1] - 10];
    stroke(ctx, back, { w: 8 }); stroke(ctx, [hip, [50, -125], [55, -10]], { w: 7 });
    const hc = circlePts(head[0], head[1], 30, 30, 24); fill(ctx, hc, '#EBC9A6'); stroke(ctx, hc, { w: 3, closed: true });
    const sh = back[Math.floor(back.length * 0.75)], hand = good ? [70, -190] : [70, -170];
    stroke(ctx, [sh, [sh[0] + 30, sh[1] + 50], hand], { w: 6 });
    const tab = good ? [[80, -230], [96, -230], [96, -150], [80, -150]] : [[62, -150], [108, -176], [114, -166], [68, -140]];
    fill(ctx, tab, '#3A3842'); stroke(ctx, tab.concat([tab[0]]), { w: 2.4, closed: true, dry: false });
    if (!good) { ctx.save(); ctx.globalAlpha *= 0.8; stroke(ctx, circlePts(neck[0] + 8, neck[1] - 4, 26, 26, 20), { w: 3.4, closed: true, color: RED, dry: false }); ctx.restore(); }
    ctx.restore();
  };
  F.bag = (ctx, x, y, s, two) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = F.rrect(0, 0, 110, 140, 22); fill(ctx, b, '#B0694A'); wash(ctx, b, '#8A3F2A', 0.3, 7, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true });
    const p = F.rrect(0, 30, 70, 50, 10); stroke(ctx, p, { w: 2.4, closed: true, dry: false });
    stroke(ctx, P.bez([-30, -70], [-40, -120], [0, -118], 10), { w: 6 }); if (two) stroke(ctx, P.bez([30, -70], [40, -120], [0, -118], 10), { w: 6 });
    ctx.restore();
  };
  F.RED = RED;
})(window);

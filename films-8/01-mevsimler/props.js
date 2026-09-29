// props.js — 8. sınıf Film 1'e özel çizim yardımcıları (window.F81)
(function (G) {
  const { PAL, rng, stroke, line, wash, circlePts, wobble, arrowHead, dashed } = G.INK;
  const F = {};
  const D2R = Math.PI / 180;
  F.TILT = 23.5 * D2R;          // eksen eğikliği
  F.RED = '#A23A2A';            // yalnızca güvenlik ve YANLIŞ
  F.HEAT = '#B5553F';
  F.AMBER = '#C07F1E';

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
  // yoğun noktalı düz çizgi (dashed için)
  F.dense = (a, b, step = 4) => { const n = Math.max(2, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); const p = []; for (let i = 0; i <= n; i++) p.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); return p; };
  F.dash = (ctx, a, b, o = {}) => dashed(ctx, F.dense(a, b), { w: o.w ?? 2.2, on: o.on ?? 10, off: o.off ?? 8, color: o.color, alpha: o.alpha });

  // "YANLIŞ" damgası (kırmızı)
  F.stamp = (ctx, txt, x, y, k, o = {}) => {
    if (k <= 0) return; const s = P.pop(k);
    ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? -0.12); ctx.scale(s, s);
    const sz = o.size ?? 60; ctx.font = `700 ${sz}px Kalam`; const w = ctx.measureText(txt).width;
    const b = [[-w / 2 - 22, -sz * 0.95], [w / 2 + 22, -sz * 0.95], [w / 2 + 20, sz * 0.35], [-w / 2 - 20, sz * 0.35]];
    stroke(ctx, b.concat([b[0]]), { w: 4, closed: true, color: F.RED, dry: false, seed: 61 });
    ctx.fillStyle = F.RED; ctx.globalAlpha *= 0.92; ctx.textAlign = 'center'; ctx.fillText(txt, 0, 0);
    ctx.restore();
  };

  // Gece tarafı: (lx,ly) ekranda Güneş yönü, lz izleyiciye doğru bileşen (birim vektör)
  F.shade = (ctx, x, y, r, lx, ly, lz, o = {}) => {
    const s = Math.hypot(lx, ly), ang = s < 1e-6 ? 0 : Math.atan2(ly, lx);
    const q = s < 1e-6 ? Math.sign(lz) : lz;
    const pts = [];
    for (let i = 0; i <= 30; i++) { const a = Math.PI / 2 + i / 30 * Math.PI; pts.push([Math.cos(a) * r * 1.01, Math.sin(a) * r * 1.01]); } // karanlık limb (sol yarı, yerel)
    for (let i = 0; i <= 30; i++) { const yy = r - i / 30 * 2 * r; const xx = -q * Math.sqrt(Math.max(0, r * r - yy * yy)); pts.push([xx, -yy]); }
    // yerel: Güneş +x yönünde; döndür
    const c = Math.cos(ang), sn = Math.sin(ang);
    const w = pts.map(([px, py]) => [x + px * c - py * sn, y + px * sn + py * c]);
    P.fillPts(ctx, w, o.dark ?? '#262A40', o.alpha ?? 0.62);
  };

  // Yandan görünüm Dünya: tilt (radyan, + → kuzey ucu sağa yatık), sun: -1 soldan, +1 sağdan, 0 yok
  F.axisVec = (tilt) => [Math.sin(tilt), -Math.cos(tilt)];
  F.latLine = (x, y, R, tilt, phi) => { // enlem çemberinin yandan görünümü (doğru parçası)
    const [ax, ay] = F.axisVec(tilt), ex = Math.cos(tilt), ey = Math.sin(tilt);
    const cx = x + ax * R * Math.sin(phi), cy = y + ay * R * Math.sin(phi), h = R * Math.cos(phi);
    return [[cx - ex * h, cy - ey * h], [cx + ex * h, cy + ey * h]];
  };
  F.globe = (ctx, x, y, R, o = {}) => {
    const tilt = o.tilt ?? 0;
    P.earth(ctx, x, y, R);
    if (o.sun) F.shade(ctx, x, y, R, o.sun, 0, 0, { alpha: o.night ?? 0.55 });
    const L = o.lines ?? {};
    const lk = o.linesK ?? 1;
    const drawLat = (phi, col, w, seed) => { const [a, b] = F.latLine(x, y, R, tilt, phi); P.drawOn(ctx, F.dense(a, b, 6), lk, { w, color: col, dry: false, seed }); };
    if (L.eq) drawLat(0, L.eqCol ?? PAL.ink, L.w ?? 3, 501);
    if (L.cancer) drawLat(F.TILT, L.cancerCol ?? F.AMBER, L.w ?? 3, 502);
    if (L.capricorn) drawLat(-F.TILT, L.capCol ?? F.AMBER, L.w ?? 3, 503);
    const ak = o.axisK ?? 0;
    if (ak > 0) {
      const [ax, ay] = F.axisVec(tilt), ext = o.axisExt ?? 1.3;
      const p0 = [x - ax * R * ext, y - ay * R * ext], p1 = [x + ax * R * ext, y + ay * R * ext];
      P.drawOn(ctx, F.dense(p0, p1, 6), ak, { w: o.axisW ?? 3.2, color: PAL.ink, dry: false, seed: 510 });
      if (ak > 0.95 && o.poles !== false) {
        const fs = o.poleSize ?? 34;
        INK.label(ctx, 'K', p1[0] + ax * fs * 0.6 - fs * 0.3, p1[1] + ay * fs * 0.4, { size: fs, weight: 700 });
        INK.label(ctx, 'G', p0[0] - ax * fs * 0.6 - fs * 0.3, p0[1] - ay * fs * 0.4 + fs * 0.7, { size: fs, weight: 700 });
      }
    }
  };
  // paralel Güneş ışınları (yatay), diskin kenarına kadar
  F.rays = (ctx, x0, cx, cy, R, ys, k, o = {}) => {
    if (k <= 0) return; const dir = o.dir ?? 1; // 1: soldan sağa
    ys.forEach((yy, i) => {
      const dy = yy - cy; if (Math.abs(dy) >= R) return;
      const hx = cx - dir * Math.sqrt(R * R - dy * dy);
      const kk = E.clamp(k * 1.4 - i * 0.04);
      if (kk <= 0) return;
      const a = [x0, yy], b = [E.lerp(x0, hx, kk), yy];
      stroke(ctx, [a, b], { w: o.w ?? 2.6, color: o.color ?? F.AMBER, dry: false, taper: 0.05, seed: 520 + i });
      if (kk > 0.97) arrowHead(ctx, [b[0] - dir * 10, yy], b, 12, { w: 2.4, color: o.color ?? F.AMBER });
    });
  };
  // dik açı işareti
  F.rightMark = (ctx, x, y, s, dirIn, o = {}) => { // dirIn: gelen ışın yönü (±1 yatay); yüzey dikey
    const d = -dirIn; stroke(ctx, [[x + d * s, y], [x + d * s, y - s], [x, y - s]], { w: 2.4, color: o.color ?? PAL.ink, dry: false, seed: 530 });
  };

  // Kuzey ekseni yönü yıldızı
  F.star = (ctx, x, y, r, a = 1) => {
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#E8C46A';
    ctx.beginPath(); for (let i = 0; i < 8; i++) { const rr = i % 2 ? r * 0.3 : r; const an = i / 8 * 6.283 - Math.PI / 2; i ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath(); ctx.fill();
    ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
  };

  // çubuk ve gölgesi (Güneş solda → gölge sağa)
  F.stick = (ctx, gx, gy, h, sh, k = 1, o = {}) => {
    if (sh > 0 && k > 0) {
      const tip = gx + sh * k;
      const th = o.th ?? 7; const poly = [[gx, gy - th], [tip, gy - th * 0.4], [tip, gy + th * 0.6], [gx, gy + th]];
      P.fillPts(ctx, poly, o.shadowCol ?? '#3A3440', o.shadowA ?? 0.72);
    }
    line(ctx, [gx, gy], [gx + 1, gy - h], { w: o.w ?? 8, color: o.col ?? '#6B4B2A', seed: o.seed ?? 540, taper: 0.05 });
  };

  // masa lambası: (x,y) ağız merkezi; ang: ışığın çıktığı yön
  F.lamp = (ctx, x, y, ang, s = 1, on = 1) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang - Math.PI / 2); ctx.scale(s, s);
    const shade = [[-70, 0], [70, 0], [34, -70], [-34, -70], [-70, 0]];
    P.fillPts(ctx, shade, '#5C6E7A', 1); stroke(ctx, shade, { w: 3, closed: true, seed: 550 });
    stroke(ctx, [[0, -70], [0, -140]], { w: 7, seed: 551, color: '#4A4F5A' });
    if (on > 0) { ctx.globalAlpha *= on; P.fillPts(ctx, P.arc(0, 0, 40, 0, Math.PI, 20, 18), '#FFE7A8', 1); }
    ctx.restore();
  };
  // termometre: (x,y) hazne merkezi; lvl 0..1
  F.thermo = (ctx, x, y, h, lvl, o = {}) => {
    const tube = [[x - 11, y - 12], [x - 11, y - h], [x + 11, y - h], [x + 11, y - 12]];
    P.fillPts(ctx, tube.concat([[x - 11, y - 12]]), PAL.white, 1);
    const top = y - 12 - (h - 24) * E.clamp(lvl);
    P.fillPts(ctx, [[x - 5, y - 10], [x - 5, top], [x + 5, top], [x + 5, y - 10]], F.HEAT, 0.95);
    P.fillPts(ctx, circlePts(x, y, 20, 20, 24), F.HEAT, 0.95);
    stroke(ctx, P.arc(x, y - h, 11, Math.PI, 0, 10).concat([[x + 11, y - 14]]), { w: 2.4, dry: false, seed: 560 });
    stroke(ctx, [[x - 11, y - 14], [x - 11, y - h]], { w: 2.4, dry: false, seed: 561 });
    stroke(ctx, circlePts(x, y, 20, 20, 24), { w: 2.4, closed: true, dry: false, seed: 562 });
    for (let i = 1; i < 6; i++) { const yy = y - 20 - (h - 30) * i / 6; line(ctx, [x + 11, yy], [x + 22, yy], { w: 1.6, dry: false, seed: 563 + i }); }
  };

  // güvenlik kartı (kırmızı çerçeve)
  F.safety = (ctx, x, y, w, h, lines, k, o = {}) => {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      F.card(c, x, y, w, h, { color: F.RED, w: 4, seed: 570 });
      // uyarı üçgeni
      const tx = x + 70, ty = y + h / 2;
      const tri = [[tx, ty - 44], [tx + 46, ty + 36], [tx - 46, ty + 36], [tx, ty - 44]];
      P.fillPts(c, tri, '#F4D9CF', 1); stroke(c, tri, { w: 4, color: F.RED, closed: true, seed: 571 });
      INK.label(c, '!', tx, ty + 26, { size: 56, weight: 700, color: F.RED, align: 'center', rot: 0 });
      lines.forEach((l, i) => INK.label(c, l, x + 140, y + 62 + i * 52, { size: o.size ?? 40, weight: i ? 400 : 700, color: i ? PAL.ink : F.RED }));
    });
  };

  F.title = (ctx, t, t1, num, name, unit = 1) => {
    E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
    E.inkText(ctx, num + ' · ' + name, 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
    E.inkText(ctx, 'Fen Bilimleri · 8. sınıf · Ünite ' + unit, 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
    if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
  };
  F.endCard = (ctx, t, se, num, name, code) => {
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, num + ' · ' + name, 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 8. sınıf · ' + code + ' · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  };
  G.F81 = F;
})(window);

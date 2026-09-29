// SAHNE 5 — Güneş'in yapısı: yıldız, sıcak gazlar (H, He), katmanlar (Dünya ile köprü), sıcaklıklar
// TYMM sınırlaması: Güneş'in katman isimleri verilmez (yalnızca 'katmanlı' olduğu ve merkez/yüzey).
(function () {
  const { PAL, line, stroke, circlePts, wash, rng, arrowHead, hatch } = INK;
  function sector(cx, cy, r0, r1, a0, a1, n = 40) { const p = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r1, cy + Math.sin(a) * r1]); } for (let i = n; i >= 0; i--) { const a = a0 + (a1 - a0) * i / n; p.push([cx + Math.cos(a) * r0, cy + Math.sin(a) * r0]); } p.push(p[0]); return p; }
  function waveArrow(ctx, x, y, a, len, k, col) { // wavy energy arrow
    if (k <= 0) return; const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40 * k; const d = u * len; const w = Math.sin(u * 22) * 9; pts.push([x + Math.cos(a) * d - Math.sin(a) * w, y + Math.sin(a) * d + Math.cos(a) * w]); }
    stroke(ctx, pts, { w: 4, color: col }); if (k > 0.97) arrowHead(ctx, pts[36], [x + Math.cos(a) * len, y + Math.sin(a) * len], 16, { w: 3.4, color: col });
  }
  function gasParticles(ctx, cx, cy, r, t, n, seed) {
    const R = rng(seed); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r * 0.985, 0, 7); ctx.clip();
    for (let i = 0; i < n; i++) {
      const he = R() < 0.25; const bx = cx - r + R() * 2 * r, by = cy - r + R() * 2 * r, vx = (R() - 0.5) * 140, vy = (R() - 0.5) * 140;
      const tri = (v, L) => { const m = ((v % (2 * L)) + 2 * L) % (2 * L); return m < L ? m : 2 * L - m; };
      const x = cx - r + tri(bx - (cx - r) + vx * t, 2 * r), y = cy - r + tri(by - (cy - r) + vy * t, 2 * r);
      const rr = he ? 9 : 6;
      ctx.fillStyle = he ? 'rgba(160,80,20,0.55)' : 'rgba(250,236,200,0.9)'; ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill();
      ctx.strokeStyle = '#6B3D10'; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.moveTo(x - vx * 0.1, y - vy * 0.1); ctx.lineTo(x - vx * 0.18, y - vy * 0.18); ctx.stroke(); ctx.globalAlpha = 1;
    }
    ctx.restore();
  }
  function earthCut(ctx, x, y, r, k, t) {
    P.earth(ctx, x, y, r);
    if (k <= 0) return; const a1 = -Math.PI / 2 + k * Math.PI / 2;
    const L = [[1, '#6E8B3D', 'yer kabuğu'], [0.93, '#C9853A', 'manto'], [0.5, '#8A3F14', 'çekirdek']];
    L.forEach(([f, c], i) => { const s = sector(x, y, 0, r * f, -Math.PI / 2, a1, 30); P.fillPts(ctx, s, PAL.white); wash(ctx, s, c, 0.75, 700 + i, { bleed: 0.8, blooms: 0 }); });
    stroke(ctx, [[x, y - r], [x, y], [x + Math.cos(a1) * r, y + Math.sin(a1) * r]], { w: 2.6 });
  }
  E.scene({
    name: 'Yapı', concept: 'Güneş bir yıldızdır; sıcak gazlar ve katmanlar', from: 'star', to: 'surface', trFrom: [960, 540],
    draw(ctx, t) {
      const s1 = E.s('star'), s2 = E.s('gas'), s3 = E.s('layers'), s4 = E.s('surface');
      // camera: overview → dive to the limb (gas) → overview shifted (layers)
      const toGas = E.se(t, s2 - 0.2, s2 + 1.6), back = E.se(t, s3 - 0.3, s3 + 1.4);
      const camA = { x: 960, y: 540, z: 1 }, camB = { x: 1110, y: 390, z: 2.6 }, camC = { x: 840, y: 540, z: 1 };
      const cam = back > 0 ? E.camLerp(camB, camC, back) : E.camLerp(camA, camB, toGas);
      ctx.save(); E.cam(ctx, cam);
      const sx = E.lerp(960, 1180, back), sy = 540, sr = 320;
      // twinkling stars on the page (the Sun is one of them)
      const R = rng(55);
      for (let i = 0; i < 16; i++) {
        const x = R() * 1920, y = R() * 1080; if (Math.hypot(x - sx, y - sy) < sr * 1.7) continue;
        const k = E.se(t, s1 + 1.8 + i * 0.08, s1 + 2.4 + i * 0.08) * (1 - back); if (k <= 0) continue;
        const s = (8 + R() * 10) * (0.8 + 0.2 * Math.sin(t * 3 + i));
        ctx.save(); ctx.globalAlpha = k; for (let j = 0; j < 4; j++) { const a = j * Math.PI / 4; line(ctx, [x - Math.cos(a) * s, y - Math.sin(a) * s], [x + Math.cos(a) * s, y + Math.sin(a) * s], { w: j % 2 ? 1.5 : 2.6, dry: false }); } ctx.restore();
      }
      P.sun(ctx, sx, sy, sr, t, { nrays: 30 });
      // energy out: light + heat
      if (back < 1) {
        const kL = E.se(t, s1 + 3.2, s1 + 4.4), kH = E.se(t, s1 + 4.0, s1 + 5.2), f = 1 - toGas;
        ctx.save(); ctx.globalAlpha = f;
        waveArrow(ctx, sx - sr * 1.25, sy - 60, Math.PI + 0.15, 250, kL, '#C07F1E'); waveArrow(ctx, sx + sr * 1.25, sy + 80, -0.1, 250, kH, '#B5553F');
        ctx.restore();
        if (f > 0.02) { ctx.save(); ctx.globalAlpha = f; if (kL > 0.8) INK.label(ctx, 'ışık', sx - sr * 1.25 - 200, sy - 110, { size: 54, weight: 700 }); if (kH > 0.8) INK.label(ctx, 'ısı', sx + sr * 1.25 + 150, sy + 150, { size: 54, weight: 700 }); ctx.restore(); }
      }
      // gas close-up
      const gk = Math.min(E.se(t, s2 + 0.6, s2 + 1.6), 1 - back);
      if (gk > 0) E.layer(ctx, gk, c => gasParticles(c, sx, sy, sr, t, 70, 91));
      // cutaways (layers)
      if (back > 0) {
        const ek = E.se(t, s3 + 0.4, s3 + 1.2, 'out'); const wedge = E.se(t, s3 + 3.2, s3 + 4.6);
        ctx.save(); ctx.globalAlpha = ek; earthCut(ctx, 300, 600, 150 * P.pop(ek), E.se(t, s3 + 1.0, s3 + 2.2), t); ctx.restore();
        if (ek > 0.9) { INK.label(ctx, 'Dünya', 300, 815, { size: 42, weight: 700, align: 'center' }); [['yer kabuğu', [388, 485]], ['manto', [370, 530]], ['çekirdek', [335, 570]]].forEach(([n, p], i) => { const a = E.se(t, s3 + 2 + i * 0.3, s3 + 2.6 + i * 0.3); if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; INK.label(ctx, n, 500, 430 + i * 48, { size: 34, weight: 700 }); INK.leader(ctx, [494, 420 + i * 48], p, { w: 1.6, bend: 0.1 }); ctx.restore(); }); }
        if (wedge > 0) {
          const a0 = -Math.PI / 2, a1 = a0 + wedge * Math.PI / 2;
          const cut = sector(sx, sy, 0, sr * 1.005, a0, a1, 40);
          P.fillPts(ctx, cut, PAL.paper);
          [[1, '#E9A94A', 'taşınım'], [0.7, '#F2C572', 'ışınım'], [0.25, '#FFF2C8', 'çekirdek']].forEach(([f, c], i) => { const s = sector(sx, sy, 0, sr * f, a0, a1, 40); P.fillPts(ctx, s, c, 1); wash(ctx, s, PAL.light, 0.25 + i * 0.1, 720 + i, { bleed: 1, blooms: 0 }); });
          // convection loops in the outer layer
          for (let i = 0; i < 3; i++) { const am = a0 + (i + 0.5) / 3 * (a1 - a0); const cxl = sx + Math.cos(am) * sr * 0.85, cyl = sy + Math.sin(am) * sr * 0.85; const pts = P.arc(cxl, cyl, sr * 0.1, t * 2 + i, t * 2 + i + 4.6, 20); if (wedge > 0.7) stroke(ctx, pts, { w: 2.2, color: '#8A4A10', dry: false }); }
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr * 0.25); glow.addColorStop(0, 'rgba(255,255,240,0.9)'); glow.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = glow; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.arc(sx, sy, sr * 0.25, a0, a1); ctx.fill();
          [0.25, 0.7].forEach(f => stroke(ctx, P.arc(sx, sy, sr * f, a0, a1, 30), { w: 2.2, dry: false }));
          stroke(ctx, [[sx, sy - sr], [sx, sy], [sx + Math.cos(a1) * sr, sy + Math.sin(a1) * sr]], { w: 3.2 });
        }
        // labels
        const kc = E.se(t, s3 + 5.0, s3 + 5.8);
        if (kc > 0) { P.write(ctx, 'merkez: en sıcak', sx - 560, sy - 330, kc, { size: 52 }); ctx.save(); ctx.globalAlpha = kc; INK.leader(ctx, [sx - 330, sy - 345], [sx + 35, sy - 35], { bend: -0.25, w: 2.4 }); ctx.restore(); }
        const kt = E.se(t, s3 + 8.2, s3 + 9.2);
        if (kt > 0) { P.write(ctx, '≈ 15 milyon °C', sx - 520, sy - 270, kt, { size: 48, color: '#B5553F' }); }
        if (wedge > 0.9) { ctx.save(); ctx.globalAlpha = 0.65 * E.se(t, s3 + 6, s3 + 7); INK.label(ctx, 'katmanlar', sx + 250, sy - 250, { size: 32 }); INK.leader(ctx, [sx + 245, sy - 258], [sx + 150, sy - 170], { w: 1.4 }); ctx.restore(); }
        const ks = E.se(t, s4 + 0.2, s4 + 1.2);
        if (ks > 0) {
          P.write(ctx, 'görünen yüzey', sx - 640, sy + 230, ks, { size: 48 });
          P.write(ctx, '≈ 5500 °C', sx - 640, sy + 290, E.se(t, s4 + 2.5, s4 + 3.4), { size: 48, color: '#B5553F' });
          ctx.save(); ctx.globalAlpha = ks; INK.leader(ctx, [sx - 330, sy + 218], [sx + Math.cos(2.5) * sr, sy + Math.sin(2.5) * sr], { bend: -0.2, w: 2.4 }); ctx.restore();
        }
      }
      ctx.restore();
      // screen-space notes for the gas close-up
      if (gk > 0.05) {
        E.inkText(ctx, 'katı değil: çok sıcak gaz', 980, 900, t, s2 + 1.2, E.s('layers') - 0.2, { size: 60, align: 'center' });
        const lk = E.se(t, s2 + 4.8, s2 + 5.6) * (1 - back);
        if (lk > 0) E.layer(ctx, lk, c => {
          const box = [[1370, 610], [1840, 604], [1846, 800], [1374, 806], [1370, 610]]; P.fillPts(c, box, '#FAF6EC', 0.94); stroke(c, box, { w: 2.4, closed: true });
          c.fillStyle = 'rgba(250,236,200,1)'; c.strokeStyle = '#6B3D10'; c.lineWidth = 2; c.beginPath(); c.arc(1420, 660, 12, 0, 7); c.fill(); c.stroke();
          c.fillStyle = 'rgba(160,80,20,0.7)'; c.beginPath(); c.arc(1420, 752, 17, 0, 7); c.fill(); c.stroke();
          INK.label(c, 'hidrojen (H)', 1455, 673, { size: 38, weight: 700 }); INK.label(c, 'helyum (He)', 1455, 765, { size: 38, weight: 700 });
        });
      }
    }
  });
})();

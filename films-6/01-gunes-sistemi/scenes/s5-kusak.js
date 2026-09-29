// SAHNE 5 — Asteroit kuşağı · gök taşı · meteor · meteorit · meteor çukuru (FB.6.1.1 anahtar kavramlar)
(function () {
  const { PAL, line, stroke, circlePts, dashed, rng } = INK;
  const F = G61;

  function beltView(ctx, t) {
    const sb = E.s('belt'); const S = G61.sys;
    const z = E.se(t, sb + 1.0, sb + 4.5);
    ctx.save(); E.cam(ctx, E.camLerp({ x: 960, y: 540, z: 1 }, { x: 760, y: 540, z: 1.35 }, z));
    P.sun(ctx, S.SX, S.SY, 120, t, { nrays: 22 });
    [3, 4].forEach(i => { const rx = S.ORB[i]; ctx.save(); ctx.globalAlpha = 0.5; dashed(ctx, P.arc(S.SX, S.SY, rx, -0.95, 0.95, 70, rx * S.RY), { w: 1.6, on: 8, off: 7, seed: 60 + i }); ctx.restore(); });
    F.belt(ctx, S.SX, S.SY, 682, 682 * S.RY, E.se(t, sb + 0.3, sb + 2.5), { a0: -0.95, a1: 0.95, n: 420, spread: 0.13, size: 2.2 });
    for (let i = 0; i < 8; i++) { if (i > 4) break; const [x, y] = S.pos(i); F.planet(ctx, i, x, y, S.VR[i]); }
    const [mx, my] = S.pos(3), [jx, jy] = S.pos(4);
    INK.label(ctx, 'Mars', mx, my + 50, { size: 34, weight: 700, align: 'center' });
    INK.label(ctx, 'Jüpiter', jx, jy - 78, { size: 34, weight: 700, align: 'center' });
    ctx.restore();
    const lk = E.se(t, sb + 3.5, sb + 4.3);
    if (lk > 0) {
      ctx.save(); ctx.globalAlpha = lk; INK.leader(ctx, [1090, 300], [900, 430], { bend: 0.15 }); ctx.restore();
      P.write(ctx, 'asteroit kuşağı', 1100, 290, E.seg(t, sb + 3.8, sb + 4.8), { size: 52, color: '#8A4A10' });
      INK.label(ctx, 'sayısız kaya parçası', 1105, 340, { size: 34, alpha: 0.75 * lk });
    }
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, sb + 1, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
  }

  // yan kesit: Dünya yüzeyi + atmosfer
  const C = [960, 2700], RE = 1990, RA = RE + 170;
  const A = [1780, 120], B = [860, C[1] - Math.sqrt(RE * RE - 100 * 100)];
  let UE = 0.5; for (let u = 0; u < 1; u += 0.002) { const q = E.mix(A, B, u); if (Math.hypot(q[0] - C[0], q[1] - C[1]) < RA) { UE = u; break; } }
  function earthSide(ctx, t) {
    const sr = E.s('rock'), sm = E.s('meteorit');
    // uzay → atmosfer
    ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = 'rgba(30,38,72,1)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
    F.stars(ctx, t, 0.8, { n: 30, seed: 8, area: [0, 0, E.W, 500] });
    const atm = circlePts(C[0], C[1], RA, RA, 200);
    P.fillPts(ctx, atm, '#9CC3DA', 0.55);
    ctx.save(); ctx.globalAlpha = 0.6; dashed(ctx, P.arc(C[0], C[1], RA, -Math.PI / 2 - 0.55, -Math.PI / 2 + 0.55, 90), { w: 2, on: 10, off: 8 }); ctx.restore();
    const ground = circlePts(C[0], C[1], RE, RE, 240);
    P.fillPts(ctx, ground, '#EFE3C6', 1); INK.wash(ctx, ground, PAL.life, 0.35, 90, { blooms: 0 });
    // çukur (meteorit ulaştıktan sonra)
    const ck = E.se(t, sm + 1.4, sm + 2.2);
    if (ck > 0) { ctx.save(); ctx.globalAlpha = ck; P.fillPts(ctx, circlePts(B[0], B[1] + 4, 60 * ck, 16 * ck, 30), '#6E5A3E', 0.8); ctx.restore(); }
    stroke(ctx, P.arc(C[0], C[1], RE, -Math.PI / 2 - 0.55, -Math.PI / 2 + 0.55, 120), { w: 4, seed: 91, taper: 0.02 });
    INK.label(ctx, 'atmosfer', 260, 700, { size: 38, weight: 700, alpha: 0.8, rot: 0.08 });
    INK.label(ctx, 'yeryüzü', 300, 895, { size: 38, weight: 700, alpha: 0.8, rot: 0.1 });
    // taşın yolu
    const u1 = E.ease.io(E.seg(t, sr + 0.3, sr + 4.0)) * (UE - 0.02);
    const u2 = E.ease.in(E.seg(t, sr + 4.6, sr + 7.2)) * (0.87 - UE);
    const u3 = E.ease.in(E.seg(t, sm + 0.2, sm + 1.5)) * 0.15;
    const u = u1 + u2 + u3; const p = E.mix(A, B, u);
    const inAtm = u > UE, glow = E.clamp((u - UE) / 0.08);
    const landed = u >= 0.999;
    if (inAtm && !landed) { // parlak iz (meteor)
      const tail = E.mix(A, B, Math.max(UE - 0.02, u - 0.22));
      for (let k = 0; k < 3; k++) { ctx.save(); ctx.globalAlpha = 0.35 + k * 0.2; ctx.strokeStyle = k === 2 ? '#FFF1C8' : PAL.light; ctx.lineWidth = (14 - k * 5) * glow; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); ctx.restore(); }
      const g = ctx.createRadialGradient(p[0], p[1], 2, p[0], p[1], 60); g.addColorStop(0, 'rgba(255,230,170,0.95)'); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p[0], p[1], 60, 0, 7); ctx.fill();
    }
    const rr = E.lerp(26, 9, E.clamp((u - UE) / (1 - UE)));
    if (t > sr) F.rock(ctx, p[0], p[1], rr, 12, { fill: inAtm ? '#6E4A2A' : '#8C8272' });
    // etiketler
    E.inkText(ctx, 'gök taşı', A[0] - 240, 250, t, sr + 1.0, sr + 5.0, { size: 50, color: '#FBF3DC' });
    if (t > sr + 1.2 && t < sr + 5) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, sr + 1.2, sr + 1.8), 1 - E.se(t, sr + 4.4, sr + 5)); INK.leader(ctx, [A[0] - 120, 262], [p[0] - 20, p[1] + 10], { color: '#FBF3DC', dot: false }); ctx.restore(); }
    E.inkText(ctx, 'meteor', 1320, 440, t, sr + 5.6, sm + 0.8, { size: 60, color: '#8A4A10' });
    E.inkText(ctx, '(atmosferde parlak bir iz bırakır)', 1320, 495, t, sr + 6.0, sm + 0.8, { size: 32 });
    // meteorit + çukur (büyüteç)
    const mk = E.se(t, sm + 2.0, sm + 2.8, 'out');
    if (mk > 0) {
      const mx = 1420, my = 560, r = 190 * P.pop(mk);
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, r, 0, 7); ctx.clip();
      ctx.fillStyle = '#E8F0F2'; ctx.fillRect(mx - r, my - r, 2 * r, 2 * r);
      const gr = [[mx - r, my + 20], [mx - 110, my + 20], [mx - 80, my + 90], [mx + 80, my + 90], [mx + 110, my + 20], [mx + r, my + 20], [mx + r, my + r], [mx - r, my + r]];
      P.fillPts(ctx, gr, '#EFE3C6', 1); INK.wash(ctx, gr, '#8A6A45', 0.45, 93, { blooms: 0 });
      stroke(ctx, gr.slice(0, 6), { w: 3.4, seed: 94 });
      F.rock(ctx, mx + 10, my + 70, 20, 12, { fill: '#5A4A3A' });
      ctx.restore();
      stroke(ctx, circlePts(mx, my, r, r, 70), { w: 6, closed: true });
      line(ctx, [mx - r * 0.7, my + r * 0.7], [mx - r * 1.05, my + r * 1.05], { w: 14, taper: 0.02 });
      E.inkText(ctx, 'meteorit', 1680, 690, t, sm + 2.8, 1e9, { size: 48, color: '#8A4A10' });
      E.inkText(ctx, 'meteor çukuru', 1420, 330, t, sm + 3.6, 1e9, { size: 48, align: 'center', color: '#8A4A10' });
      ctx.save(); ctx.globalAlpha = E.se(t, sm + 3.0, sm + 3.5); INK.leader(ctx, [1675, 675], [1440, 632], { bend: -0.2 }); ctx.restore();
      ctx.save(); ctx.globalAlpha = E.se(t, sm + 3.8, sm + 4.3); INK.leader(ctx, [1420, 345], [1400, 600], { bend: 0.1, dot: false }); ctx.restore();
    }
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, sr + 1, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
  }

  E.scene({
    name: 'Asteroit · meteor', concept: 'Asteroit kuşağı, gök taşı, meteor, meteorit', from: 'belt', to: 'meteorit', trFrom: [860, 540],
    draw(ctx, t) {
      const a = E.se(t, E.s('rock') - 0.3, E.s('rock') + 0.6);
      if (a < 1) E.layer(ctx, 1 - a, c => beltView(c, t));
      if (a > 0) E.layer(ctx, a, c => earthSide(c, t));
    }
  });
})();

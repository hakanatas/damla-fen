// SAHNE 2 — Damla'nın su yolculuğu: buharlaşma → (terleme) → yoğuşma → yağış (kar) → erime, akış, sızma → deniz
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const U = U7;
  const LAND = [[690, 772], [820, 758], [1000, 722], [1150, 640], [1300, 480], [1380, 390], [1440, 330], [1520, 400], [1640, 500], [1780, 570], [1960, 600], [1960, 1100], [690, 1100]];
  const RIVER = P.bez([1432, 352], [1160, 520], [1180, 640], 30).concat(P.bez([1180, 640], [1000, 760], [730, 772], 30).slice(1));
  const along = (pts, u) => { const f = E.clamp(u) * (pts.length - 1), i = Math.min(pts.length - 2, Math.floor(f)), r = f - i; return E.mix(pts[i], pts[i + 1], r); };
  const dense = (pts, step = 4) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) o.push(E.mix(a, b, j / n)); } return o; };

  function world(ctx, t, snowK) {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.14)'); g.addColorStop(1, 'rgba(46,106,140,0.02)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    P.sun(ctx, 380, 310, 74, t, { cells: false, nrays: 18 });
    U.sea(ctx, -40, 760, 760, t);
    P.fillPts(ctx, LAND, '#EEE6D2'); wash(ctx, LAND, '#8C8272', 0.3, 2630, { bleed: 3, blooms: 2 });
    const grass = LAND.slice(0, 5).concat([[1150, 700], [1000, 780], [690, 800]]);
    wash(ctx, grass, PAL.life, 0.28, 2631, { bleed: 2, blooms: 1 });
    // kar örtüsü
    const cap = [[1340, 440], [1380, 390], [1440, 330], [1520, 400], [1560, 440], [1520, 430], [1480, 450], [1440, 420], [1400, 450]];
    P.fillPts(ctx, cap, '#FBF8F1', 0.5 + 0.45 * snowK);
    stroke(ctx, LAND.slice(0, 11), { w: 3.4, seed: 2632 });
    // dere
    stroke(ctx, RIVER, { w: 10, color: '#8DB6CC', dry: false, taper: 0.05 });
    stroke(ctx, RIVER, { w: 2, color: PAL.water, dry: false, taper: 0.05, alpha: 0.8 });
    U.tree(ctx, 905, 750, 0.9, t, { seed: 1 }); U.tree(ctx, 1040, 712, 0.75, t, { seed: 2 });
  }

  E.scene({
    name: 'Su yolculuğu', concept: 'Su döngüsü: Damla hâl ve yer değiştirir', from: 'sea', to: 'melt', trFrom: [480, 780],
    draw(ctx, t) {
      const sS = E.s('sea'), sV = E.s('vapor'), sC = E.s('cloud'), sN = E.s('snow'), sM = E.s('melt'), eM = E.e('melt');
      const snowK = E.se(t, sN + 2, sN + 5) * (1 - 0.6 * E.se(t, sM, sM + 5));
      world(ctx, t, snowK);

      // ---- bulut: yoğuşmayla oluşur, dağa sürüklenir ----
      const cloudK = E.se(t, sC + 1.2, sC + 4.2, 'out');
      const cloudPos = E.mix([1000, 290], [1320, 230], E.se(t, sN, sN + 2.2));
      if (cloudK > 0) {
        ctx.save(); ctx.globalAlpha *= Math.min(1, cloudK * 1.5) * (1 - 0.5 * E.se(t, sM + 1, sM + 3)); U.cloud(ctx, cloudPos[0], cloudPos[1], 0.35 + 0.8 * cloudK, { seed: 3, dark: E.se(t, sN, sN + 2) }); ctx.restore();
        // damlacıklar (yoğuşma)
        if (t < sN + 3) for (let i = 0; i < 16; i++) { const r = INK.rng(2640 + i); const x = cloudPos[0] + (r() - 0.5) * 220 * cloudK, y = cloudPos[1] + (r() - 0.5) * 70 * cloudK; ctx.save(); ctx.globalAlpha *= 0.6 * cloudK; INK.inkDot(ctx, x, y, 3, { color: '46,106,140' }); ctx.restore(); }
      }
      // kar yağışı
      U.rain(ctx, 1350, 290, 260, 150, t, E.se(t, sN + 1.4, sN + 2.2) * (1 - E.se(t, sM, sM + 1)), { snow: true, n: 16, speed: 0.5, seed: 2650 });

      // ---- süreç okları ve etiketleri (şema kendiliğinden oluşur) ----
      U.flow(ctx, [470, 720], [560, 470], E.seg(t, sS + 1.8, sS + 3.2), { color: PAL.water, w: 3.5, bend: -20, label: 'buharlaşma', lx: 450, ly: 600, align: 'right', size: 40 });
      // terleme: ağaçtan su buharı kıvrımları
      const tk = E.se(t, sV + 1.8, sV + 2.8);
      if (tk > 0) {
        for (let i = 0; i < 4; i++) { const x0 = 870 + i * 55, y0 = 560 - (i % 2) * 30; const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([x0 + Math.sin(u * 8 + t * 3 + i) * 7, y0 - u * 90]); } ctx.save(); ctx.globalAlpha *= 0.6 * tk; stroke(ctx, pts, { w: 2.4, color: PAL.water, dry: false, seed: 2660 + i }); ctx.restore(); }
        P.write(ctx, 'terleme', 1010, 440, E.seg(t, sV + 2.2, sV + 3.2), { size: 40, color: PAL.water, align: 'center' });
      }
      P.write(ctx, 'yoğuşma', 780, 250, E.seg(t, sC + 2.4, sC + 3.4), { size: 40, color: PAL.water, align: 'center' });
      if (t > sC + 2.4) U.flow(ctx, [800, 270], [880, 285], E.seg(t, sC + 2.6, sC + 3.2), { color: PAL.water, w: 3 });
      P.write(ctx, 'yağış (kar)', 1640, 330, E.seg(t, sN + 2.2, sN + 3.2), { size: 40, color: PAL.water, align: 'center' });
      P.write(ctx, 'akış', 1300, 650, E.seg(t, sM + 1.8, sM + 2.6), { size: 40, color: PAL.water, align: 'center' });
      // sızma → yeraltı suyu
      const gk = E.seg(t, sM + 4.2, sM + 6.2);
      if (gk > 0) {
        const gw = dense(P.bez([1160, 720], [1000, 860], [760, 870], 30), 4);
        ctx.save(); dashed(ctx, P.partial(gw, gk), { w: 3, color: PAL.water, on: 10, off: 8 }); ctx.restore();
        if (gk >= 1) INK.arrowHead(ctx, gw[gw.length - 5], gw[gw.length - 1], 14, { w: 3, color: PAL.water });
        P.write(ctx, 'sızma → yeraltı suyu', 1180, 880, E.seg(t, sM + 5, sM + 6), { size: 38, color: PAL.water, align: 'left' });
      }
      // görünmezlik notu
      E.inkText(ctx, '(su buharı görünmez; çizimde gösterdik)', 1340, 790, t, sV + 3.2, sC + 1.2, { size: 32, weight: 400, align: 'center', alpha: 0.8 });
      E.inkText(ctx, 'bulut = sayısız minicik su damlacığı', 1330, 150 + 20, t, sC + 4.3, sN + 0.3, { size: 36, align: 'center', color: PAL.water });

      // ---- Damla'nın konumu ve hâli ----
      let x, y, s = 0.85, st = 'liquid', vk = 0, look = [0.2, -0.3], expr = 'happy', arms = [[-1, 0.6], [1, 0.6]], lean = 0, ph = t;
      if (t < sV) { // denizde, sonra yükselir
        const up = E.se(t, sS + 2.4, sV + 0.2);
        x = E.lerp(420, 520, up); y = E.lerp(790 + Math.sin(t * 1.6) * 5, 620, up); vk = E.se(t, sS + 2.4, sS + 3.6);
        ph = t + 3 * Math.max(0, t - (sS + 1)); arms = up > 0 ? [[-1, 2.4], [1, 2.4]] : [[-1, 0.8], [1, 0.8]];
      } else if (t < sC) { // su buharı olarak yükselir
        const u = E.se(t, sV, sC, 'sine'); x = E.lerp(520, 830, u); y = E.lerp(620, 380, u); vk = 1; ph = t * 3; look = [0.6, -0.5]; expr = 'curious';
      } else if (t < sN) { // yoğuşma
        const u = E.se(t, sC, sC + 1.5); x = E.lerp(830, 985, u); y = E.lerp(380, 330, u); vk = 1 - E.se(t, sC + 1.6, sC + 2.6); s = E.lerp(0.85, 0.5, E.se(t, sC + 1.6, sC + 2.6)); expr = 'surprised'; look = [0, 0];
        if (t > sC + 3) expr = 'happy';
      } else if (t < sM) { // kar tanesi olarak düşer
        const cp = cloudPos; const fall = E.se(t, sN + 2.2, sN + 5.4, 'in');
        x = E.lerp(cp[0] - 15, 1432, fall) + Math.sin(t * 2.5) * 16 * (1 - fall); y = E.lerp(cp[1] + 40, 352, fall); s = 0.5; st = t > sN + 1.4 ? 'ice' : 'liquid'; expr = t > sN + 1.4 ? 'surprised' : 'happy'; look = [0.2, 0.6];
        if (fall >= 1) expr = 'happy';
      } else { // erir, dere boyunca denize akar
        const u = E.se(t, sM + 0.9, sM + 5.4, 'io'); const p = along(RIVER, u); x = p[0]; y = p[1] + 4; s = 0.5; st = t > sM + 0.7 ? 'liquid' : 'ice'; expr = 'happy'; look = [-0.7, 0.2]; lean = -0.2 * Math.sin(u * Math.PI);
        if (u >= 1) { s = E.lerp(0.5, 0.75, E.se(t, sM + 5.4, sM + 6.2)); y = 780 + Math.sin(t * 1.6) * 5; x = E.lerp(730, 640, E.se(t, sM + 5.4, eM)); arms = [[-1, 2.5 + 0.3 * Math.sin(t * 8)], [1, 0.5]]; }
      }
      const flip = t >= sM;
      if (vk < 1) E.layer(ctx, 1 - vk, c => DAMLA.draw(c, { x, y, s, view: 'q3', flip, state: st, expr, look, lean, blink: E.blink(t, 4), squash: E.breath(t), t: ph, seed: 1, arms, shadow: false }));
      if (vk > 0) E.layer(ctx, vk, c => DAMLA.draw(c, { x, y, s, view: 'q3', flip, state: 'vapor', expr, look, blink: E.blink(t, 4), t: ph, seed: 1, arms: [[-1, 2.0], [1, 2.0]] }));
      // ısınma kıvrımları
      if (t > sS + 0.8 && t < sV) { const k = E.se(t, sS + 0.8, sS + 1.6) * (1 - E.se(t, sS + 3, sV)); for (let i = 0; i < 3; i++) { const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([360 + i * 60 + Math.sin(u * 9 + t * 5 + i) * 6, 740 - u * 60]); } ctx.save(); ctx.globalAlpha *= 0.8 * k; stroke(ctx, pts, { w: 3, color: '#C07F1E', dry: false, seed: 2670 + i }); ctx.restore(); } }
    }
  });
})();

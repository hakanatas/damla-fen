// SAHNE 5 — Işının yüzeye düşme açısı modeli: lamba + kareli kâğıt + termometre (güvenlik kartı)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F81;
  const TY = 700;                         // masa yüzeyi
  const L1 = [520, 380];                  // dik lamba ağzı
  const D = [Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)], N = [-D[1], D[0]]; // 30° eğik ışın
  const PC = [1300, TY], LL = 380, M = [PC[0] - D[0] * LL, PC[1] - D[1] * LL], HW = 60;
  const hit = (p) => { const s = (TY - p[1]) / D[1]; return [p[0] + D[0] * s, TY]; };
  E.scene({
    name: 'Işının düşme açısı', concept: 'Model ve gözlem', from: 'model', to: 'therm', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('model'), ss = E.s('safe'), sp = E.s('spread'), sh = E.s('therm');
      // masa
      const top = [[140, TY], [1780, TY + 2], [1780, TY + 56], [140, TY + 54]];
      P.fillPts(ctx, top, '#B08A5E', 0.55); stroke(ctx, top.concat([top[0]]), { w: 3, closed: true, seed: 801 });
      [[210, TY + 54], [1710, TY + 56]].forEach(([x, y], i) => line(ctx, [x, y], [x + 2, y + 150], { w: 9, seed: 802 + i, taper: 0.05 }));
      // kareli kâğıt (her kare 40 px)
      for (let x = 300; x <= 1600; x += 40) line(ctx, [x, TY], [x, TY + 14], { w: 1.6, dry: false, alpha: 0.6, seed: 810 + x });
      const on = E.se(t, sm + 1.5, sm + 2.2);
      // dik ışık demeti
      if (on > 0) {
        ctx.save(); ctx.globalAlpha *= on;
        P.fillPts(ctx, [[L1[0] - HW, L1[1]], [L1[0] + HW, L1[1]], [L1[0] + HW, TY], [L1[0] - HW, TY]], '#FFE7A8', 0.55);
        for (let i = -2; i <= 2; i++) line(ctx, [L1[0] + i * 26, L1[1] + 10], [L1[0] + i * 26, TY - 4], { w: 1.8, color: F.AMBER, dry: false, alpha: 0.8, seed: 820 + i });
        P.fillPts(ctx, [[L1[0] - HW, TY - 5], [L1[0] + HW, TY - 5], [L1[0] + HW, TY + 5], [L1[0] - HW, TY + 5]], '#F2B544', 0.95);
        // eğik ışık demeti
        const a0 = [M[0] + N[0] * HW, M[1] + N[1] * HW], a1 = [M[0] - N[0] * HW, M[1] - N[1] * HW];
        const b0 = hit(a0), b1 = hit(a1);
        P.fillPts(ctx, [a0, a1, b1, b0], '#FFE7A8', 0.55);
        for (let i = -2; i <= 2; i++) { const p = [M[0] + N[0] * i * 26, M[1] + N[1] * i * 26]; line(ctx, [p[0] + D[0] * 10, p[1] + D[1] * 10], hit(p), { w: 1.8, color: F.AMBER, dry: false, alpha: 0.8, seed: 830 + i }); }
        P.fillPts(ctx, [[b0[0], TY - 5], [b1[0], TY - 5], [b1[0], TY + 5], [b0[0], TY + 5]], '#F2B544', 0.5);
        ctx.restore();
      }
      F.lamp(ctx, L1[0], L1[1], Math.PI / 2, 0.85, on);
      F.lamp(ctx, M[0], M[1], Math.PI / 6, 0.85, on);
      // termometreler
      const hk = E.se(t, sh + 0.5, sh + 4.0);
      F.thermo(ctx, L1[0], TY - 22, 170, 0.3 + 0.5 * hk);
      F.thermo(ctx, PC[0], TY - 22, 170, 0.3 + 0.22 * hk);
      // etiketler
      const k1 = E.se(t, sm + 2.4, sm + 3.2);
      if (k1 > 0) { ctx.save(); ctx.globalAlpha *= k1;
        INK.label(ctx, 'dik (90°)', L1[0], TY + 110, { size: 42, weight: 700, align: 'center' });
        INK.label(ctx, 'eğik (30°)', PC[0], TY + 110, { size: 42, weight: 700, align: 'center' });
        // 30° açı yayı
        const arc = P.arc(PC[0] - 120, TY, 90, Math.PI, Math.PI + Math.PI / 6, 16);
        stroke(ctx, arc, { w: 2.6, color: PAL.ink, dry: false, seed: 840 });
        ctx.restore(); }
      const k2 = E.se(t, sp + 1.0, sp + 1.8), k3 = E.se(t, sp + 4.0, sp + 4.8);
      if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2; INK.label(ctx, '3 kare', L1[0], TY + 160, { size: 38, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      if (k3 > 0) { ctx.save(); ctx.globalAlpha *= k3; INK.label(ctx, '6 kare', PC[0], TY + 160, { size: 38, align: 'center', color: '#8A4A10' });
        INK.label(ctx, 'aynı ışık → 2 kat alan', 960, 250, { size: 46, weight: 700, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      const k4 = E.se(t, sh + 3.0, sh + 3.8);
      if (k4 > 0) { ctx.save(); ctx.globalAlpha *= k4;
        INK.label(ctx, 'daha çok ısındı', 610, 560, { size: 40, weight: 700, color: F.HEAT });
        INK.label(ctx, 'daha az ısındı', 1440, 560, { size: 40, weight: 700, color: PAL.water });
        ctx.restore(); }
      // güvenlik kartı
      const sk = Math.min(E.se(t, ss + 0.1, ss + 0.7), 1 - E.se(t, E.e('safe') - 0.3, E.e('safe') + 0.3));
      F.safety(ctx, 640, 165, 900, 140, ['Dikkat: lamba ısınır, dokunma!', 'Deneyi bir yetişkin eşliğinde yap.'], sk, { size: 38 });
      DAMLA.draw(ctx, { x: 1690, y: 905, s: 0.95, view: 'q3', flip: true, expr: t > sh + 3 ? 'happy' : t > ss && t < sp ? 'determined' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 5,
        arms: t > ss && t < sp ? [[-1, 2.3], [1, 0.35]] : [[-1, 0.35], [1, 0.35]], prop: t > sp ? 'lens' : undefined, propTilt: -0.3 });
    }
  });
})();

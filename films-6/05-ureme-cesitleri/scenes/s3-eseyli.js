// SAHNE 3 — Eşeyli üreme (ayrıntıya girilmeden): iki eşey hücresi birleşir, yavrular benzer ama aynı değil → çeşitlilik
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  const GINGER = '#C98F5A', GRAY = '#8E8A80';
  E.scene({
    name: 'Eşeyli üreme', concept: 'Eşeyli üreme; çeşitlilik', from: 'sex1', to: 'sex2', trFrom: [560, 540],
    draw(ctx, t) {
      const s1 = E.s('sex1'), s2 = E.s('sex2');
      // atalar
      F.cat(ctx, 560, 560, 1.15, { base: GINGER, seed: 5200 }, t);
      F.cat(ctx, 1360, 560, 1.15, { base: GRAY, stripe: '#4E4A44', seed: 5240 }, t);
      INK.label(ctx, 'ata (dişi)', 560, 620, { size: 38, weight: 700, align: 'center' });
      INK.label(ctx, 'ata (erkek)', 1360, 620, { size: 38, weight: 700, align: 'center' });
      // eşey hücreleri yola çıkar ve birleşir
      const kg = E.se(t, s1 + 1.5, s1 + 2.2, 'out'), km = E.se(t, s1 + 2.6, s1 + 5.4), kj = E.se(t, s1 + 5.2, s1 + 5.9);
      const C = [960, 430];
      if (kg > 0) {
        const a = E.mix([640, 400], [C[0] - 22, C[1]], km), b = E.mix([1280, 400], [C[0] + 16, C[1]], km);
        if (kj < 1) E.layer(ctx, 1 - kj, c => { F.gamete(c, a[0], a[1], 30 * kg, '#8E6A8C', 60); F.gamete(c, b[0], b[1], 14 * kg, '#5A7AA0', 61); });
        if (km > 0 && km < 1) { INK.dashed(ctx, P.bez([640, 400], [800, 360], a, 20), { w: 2, on: 8, off: 8, alpha: 0.5 }); INK.dashed(ctx, P.bez([1280, 400], [1120, 360], b, 20), { w: 2, on: 8, off: 8, alpha: 0.5 }); }
        if (kj > 0) { const r = 36 * P.pop(kj); const g = ctx.createRadialGradient(C[0], C[1], 10, C[0], C[1], 90); g.addColorStop(0, 'rgba(111,138,58,0.35)'); g.addColorStop(1, 'rgba(111,138,58,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(C[0], C[1], 90, 0, 7); ctx.fill(); F.gamete(ctx, C[0], C[1], r, F.LIFE, 62); }
        const kl = E.se(t, s1 + 2.0, s1 + 3.0);
        if (kl > 0 && kj < 1) { INK.label(ctx, 'eşey hücresi', 700, 330, { size: 34, align: 'center', alpha: kl * (1 - kj) }); INK.label(ctx, 'eşey hücresi', 1220, 330, { size: 34, align: 'center', alpha: kl * (1 - kj) }); }
        if (kj > 0) P.write(ctx, 'birleşir', 960, 350, E.seg(t, s1 + 5.8, s1 + 6.8), { size: 44, align: 'center', color: F.LIFE_D });
      }
      // yavrular
      const kk = E.se(t, s2 - 0.2, s2 + 1.2);
      if (kk > 0) {
        P.arrow(ctx, [960, 480], [960, 640], kk, { w: 3, head: 14 });
        const K = [
          { x: 760, o: { base: GINGER, stripe: '#4E4A44', seed: 5280 } },
          { x: 960, o: { base: GRAY, patch: GINGER, patchSide: 1, seed: 5320 } },
          { x: 1160, o: { base: GINGER, patch: '#EDE4D3', patchSide: -1, seed: 5360 } }
        ];
        K.forEach((kt, i) => { const k = E.se(t, s2 + 0.6 + i * 0.5, s2 + 1.3 + i * 0.5, 'back'); if (k > 0) E.layer(ctx, E.clamp(k), c => F.cat(c, kt.x, 880, 0.62 * Math.max(0.3, k), kt.o, t + i)); });
        INK.label(ctx, 'yavrular', 1300, 720, { size: 38, weight: 700, alpha: E.se(t, s2 + 1.4, s2 + 2) });
      }
      const kv = E.se(t, s2 + 3.2, s2 + 4.4);
      if (kv > 0) {
        P.write(ctx, 'benzer ama aynı değil', 1480, 790, kv, { size: 42, align: 'center' });
        P.write(ctx, '→ çeşitlilik', 1480, 850, E.seg(t, s2 + 4.6, s2 + 5.6), { size: 50, align: 'center', color: F.LIFE_D });
      }
      // Damla
      DAMLA.draw(ctx, { x: 250, y: 900, s: 0.95, view: 'q3', expr: t > s2 + 3 ? 'happy' : 'curious', look: [0.8, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 3,
        arms: [[-1, 0.35], [1, t > s2 + 3 ? 2.3 : 0.9]] });
    }
  });
})();

// SAHNE 3 — Çekinik alel, taşıyıcı, aa genotipi (FB.8.3.4–5 ön bilgisi)
(function () {
  const { PAL, stroke } = INK;
  const F = F808;
  E.scene({
    name: 'Taşıyıcı', concept: 'Çekinik alel ve taşıyıcı', from: 'recess', to: 'carrier', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('recess'), sc = E.s('carrier');
      F.warmBg(ctx);
      // alel lejantı
      const lk = E.se(t, sr + 0.8, sr + 1.6, 'out');
      if (lk > 0) E.layer(ctx, lk, c => {
        F.card(c, 560, 180, 800, 150, 3600);
        F.allele(c, 640, 255, 34, 'A'); INK.label(c, 'baskın alel', 695, 270, { size: 44, weight: 700 });
        const ak = E.se(t, sr + 2.2, sr + 3.0, 'out');
        if (ak > 0) { c.save(); c.globalAlpha *= ak; F.allele(c, 990, 255, 34 * P.pop(ak), 'a'); INK.label(c, 'çekinik alel', 1045, 270, { size: 44, weight: 700, color: F.AMB }); c.restore(); }
      });
      // üç genotip
      const P3 = [['AA', 520, 'sağlıklı', PAL.ink], ['Aa', 960, 'sağlıklı · taşıyıcı', F.AMB], ['aa', 1400, 'hastalık görülür', PAL.ink]];
      P3.forEach(([g, x, lab, col], i) => {
        const at = sc + 0.3 + i * (i === 2 ? 2.2 : 0.9), k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          F.person(c, x, 780, 1.25, g, { seed: 11 + i * 2 });
          F.fit(c, g, x, 470, 200, 56, { color: col });
          F.fit(c, lab, x, 850, 400, 42, { color: col });
        });
      });
      // taşıyıcı vurgusu
      if (t > sc + 1.5) { const k = E.se(t, sc + 1.5, sc + 2.3); ctx.save(); ctx.globalAlpha *= k; stroke(ctx, INK.wobble(INK.circlePts(960, 610, 180, 200, 50), 4, 3610), { w: 3.4, closed: true, color: F.AMB }); ctx.restore(); }
      F.damla(ctx, t, { x: 1760, y: 880, s: 0.95, flip: true, expr: 'curious', look: [-0.8, -0.2], arms: [[-1, 1.9], [1, 0.4]] });
    }
  });
})();

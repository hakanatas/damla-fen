// SAHNE 2 — Elektrik güvenliği (yalnızca pil, priz yok, kısa devre yok, kablolar ısınabilir, yetişkin eşliği)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function hotWire(ctx, t) {
    CK.cable(ctx, 0, 8, 0.45, '#2E6A8C');
    for (let i = 0; i < 3; i++) { const x = -24 + i * 24, ph = t * 3 + i; line(ctx, [x, -14], [x + 6 * Math.sin(ph), -52], { w: 3, color: '#B5553F', dry: false, bend: 0.2 * Math.sin(ph + 1) }); }
  }
  E.scene({
    name: 'Güvenlik', concept: 'Elektrikle güvenli deney', from: 'safety', to: 'safety2', trFrom: [960, 540],
    draw(ctx, t) {
      const s1 = E.s('safety'), s2 = E.s('safety2');
      ctx.save();
      CK.table(ctx, 860);
      const k0 = E.se(t, s1, s1 + 0.6);
      DAMLA.draw(ctx, {
        x: 420, y: 862, s: 1.45, view: 'q3', expr: 'determined', look: [0.7, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1,
        arms: [[-1, 0.4], [1, 2.2 + 0.6 * k0 + 0.1 * Math.sin(t * 3)]]
      });
      const kb = E.se(t, s1 + 0.1, s1 + 0.6, 'out');
      if (kb > 0) { P.bubble(ctx, 560, 300, 150, 150, [470, 480], kb, 7); INK.label(ctx, '!', 560, 340, { size: 110, weight: 700, color: CK.RED, align: 'center', alpha: kb }); }
      ctx.restore();
      const kc = E.se(t, s1 + 0.3, s1 + 1.0, 'out');
      ctx.save(); ctx.translate((1 - kc) * 900, 0);
      CK.safetyCard(ctx, t, s1 + 0.8, 870, 120, {
        w: 920, h: 790, gap: 172,
        items: [
          { icon: c => CK.outlet(c, 0, 0, 0.8), mark: 'x', a: 'Prizlerle asla oynama!', b: 'Şehir elektriği çok tehlikelidir.', red: true, at: 0 },
          { icon: c => CK.battery(c, 0, 0, 0.55), mark: 'ok', a: 'Deneyde yalnızca pil kullan.', at: 2.6 },
          { icon: CK.shortIcon, mark: 'x', a: 'Pilin iki ucunu tek kabloyla', b: 'birleştirme! (kısa devre)', red: true, at: s2 - s1 + 0.2 },
          { icon: hotWire, a: 'Kablolar ısınabilir. Bir yetişkin', b: 'eşliğinde çalış.', at: s2 - s1 + 3.2 }
        ]
      });
      ctx.restore();
    }
  });
})();

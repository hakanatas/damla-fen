// SAHNE 3 — Güvenlik: prizle oynanmaz, yalnızca pil; pilin uçları tek kabloyla birleştirilmez (kısa devre); yetişkin eşliğinde
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = CK.RED;
  function adult(ctx) { // yetişkin + çocuk simgesi
    [[-22, 0, 1], [26, 14, 0.7]].forEach(([dx, dy, s], i) => {
      stroke(ctx, circlePts(dx, dy - 44 * s, 15 * s, 15 * s, 20), { w: 3, closed: true, seed: 60 + i });
      line(ctx, [dx, dy - 28 * s], [dx, dy + 18 * s], { w: 3.4 });
      line(ctx, [dx, dy + 18 * s], [dx - 12 * s, dy + 48 * s], { w: 3 }); line(ctx, [dx, dy + 18 * s], [dx + 12 * s, dy + 48 * s], { w: 3 });
      line(ctx, [dx - 20 * s, dy - 6 * s], [dx + 20 * s, dy - 6 * s], { w: 3, bend: 0.1 });
    });
  }
  E.scene({
    name: 'Güvenlik', concept: 'Elektrikle güvenli çalışma', from: 'safe1', to: 'safe2', trFrom: [1650, 900],
    draw(ctx, t) {
      const s1 = E.s('safe1'), s2 = E.s('safe2');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 });
      CK.table(ctx, 860);
      // Damla solda: uyarı işareti yapar
      const k0 = E.se(t, s1, s1 + 0.6);
      DAMLA.draw(ctx, {
        x: 420, y: 862, s: 1.45, view: 'q3', expr: t < s1 + 1.2 ? 'surprised' : 'determined', look: [0.7, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: [[-1, 0.4], [1, 2.2 + 0.6 * k0 + 0.1 * Math.sin(t * 3)]]
      });
      // ünlem balonu
      const kb = E.se(t, s1 + 0.1, s1 + 0.6, 'out');
      if (kb > 0) { P.bubble(ctx, 560, 300, 150, 150, [470, 480], kb, 7); INK.label(ctx, '!', 560, 340, { size: 110, weight: 700, color: RED, align: 'center', alpha: kb }); }
      ctx.restore();

      const kc = E.se(t, s1 + 0.3, s1 + 1.0, 'out');
      ctx.save(); ctx.translate((1 - kc) * 900, 0);
      CK.safetyCard(ctx, t, s1 + 1.0, 870, 120, {
        w: 920, h: 790, gap: 172,
        items: [
          { icon: c => CK.outlet(c, 0, 0, 0.8), mark: 'x', a: 'Prizlerle asla oynama!', b: 'Şehir elektriği çok tehlikelidir.', red: true, at: 0 },
          { icon: c => CK.battery(c, 0, 0, 0.55), mark: 'ok', a: 'Deneylerde yalnızca pil kullan.', at: 2.4 },
          { icon: CK.shortIcon, mark: 'x', a: 'Pilin iki ucunu tek kabloyla', b: 'birleştirme! Pil ısınır, zarar verir.', red: true, at: s2 - s1 - 1.0 + 0.2 },
          { icon: adult, a: 'Bir yetişkin eşliğinde çalış.', at: s2 - s1 - 1.0 + 4.2 }
        ]
      });
      ctx.restore();
    }
  });
})();

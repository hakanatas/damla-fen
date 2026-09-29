// SAHNE 2 — Güvenlik: tat/koku yok, temas yok, gözlük-eldiven, öğretmen eşliği; etiketteki uyarı işaretleri (FB.8.5.5 sınırlamaları)
(function () {
  const { PAL } = INK;
  const U = U5;
  E.scene({
    name: 'Güvenlik', concept: 'Güvenlik önlemleri ve uyarı işaretleri', from: 'safety', to: 'symbols', trFrom: [600, 400],
    draw(ctx, t) {
      const ss = E.s('safety'), sy = E.s('symbols');
      U.safety(ctx, 120, 190, 1000, ['Tadına ve kokusuna bakma!', 'Çıplak elle dokunma!', 'Gözlük ve eldiven tak.', 'Öğretmeninin eşliğinde çalış.'], t, ss + 0.3, { step: 1.3, lh: 80, size: 44, hi: 0 });
      // gözlük + eldiven
      const gk = E.se(t, ss + 3.8, ss + 4.5, 'out');
      if (gk > 0) E.layer(ctx, gk, c => { U.goggles(c, 1420, 320, 1.3); U.glove(c, 1700, 330, 1.3); U.txt(c, 'gözlük', 1420, 440, { size: 36, align: 'center' }); U.txt(c, 'eldiven', 1700, 440, { size: 36, align: 'center' }); });
      // uyarı işaretleri
      const k1 = E.se(t, sy + 0.8, sy + 1.4, 'back'), k2 = E.se(t, sy + 3.2, sy + 3.8, 'back');
      if (k1 > 0) { ctx.save(); ctx.translate(1420, 690); ctx.scale(k1, k1); U.ghs(ctx, 0, 0, 1.25, 'corr'); ctx.restore(); U.txt(ctx, 'aşındırıcı', 1420, 870, { size: 40, align: 'center', alpha: Math.min(1, k1), color: U.RED }); }
      if (k2 > 0) { ctx.save(); ctx.translate(1700, 690); ctx.scale(k2, k2); U.ghs(ctx, 0, 0, 1.0, 'excl'); ctx.restore(); U.txt(ctx, 'tahriş edici', 1700, 870, { size: 36, align: 'center', alpha: Math.min(1, k2) }); }
      if (k1 > 0) P.write(ctx, 'cilt, göz ve yüzeyleri yakabilir', 1560, 560 - 30, E.se(t, sy + 4.4, sy + 5.6), { size: 34, align: 'center', color: U.RED });
      U.damla(ctx, t, { x: 560, y: 900, s: 0.85, view: 'front', expr: t > sy ? 'determined' : 'surprised', look: [0.5, -0.3], arms: [[-1, 0.4], [1, 2.3]] });
    }
  });
})();

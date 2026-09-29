// SAHNE 1 — Kaydırak: Ece kayar, saçları dikilir; merak sorusu (köprü kurma: kaydırakta saçların hareketlenmesi)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  E.scene({
    name: 'Kaydırak', concept: 'Köprü kurma; soru sorma', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hook'), sq = E.s('question');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1.05 - 0.05 * E.se(t, 0, sh + 2) });
      const hill = F.park(ctx, t);
      const path = F.slide(ctx, 820, 850, 1.15);
      // Ece: kayma (hook), sonra ayağa kalkar
      const k = E.se(t, sh + 1.0, sh + 3.4, 'in');
      const stand = E.se(t, sh + 3.4, sh + 4.2);
      const spread = E.se(t, sh + 1.2, sh + 3.6);
      const kidA = E.se(t, E.e('title') + 0.4, E.e('title') + 1.2);
      if (kidA <= 0) { /* başlık kartı açıkken görünmez */ } else if (stand <= 0) {
        const i = Math.min(path.length - 2, Math.floor(k * (path.length - 1)));
        const p = path[i], q = path[i + 1];
        const a = Math.atan2(q[1] - p[1], q[0] - p[0]) * 0.6;
        E.layer(ctx, kidA, c => F.kid(c, p[0] + 10, p[1] - 6, 0.95, t, spread, { sit: 1, rot: a, armsUp: k > 0.1 && k < 0.95, surprised: k > 0.3 }));
      } else {
        F.kid(ctx, E.lerp(1460, 1540, stand), 860, 1.0, t, spread, { sit: 0, surprised: true });
      }
      // Damla gözlemliyor
      const surprised = t > sh + 3.2 && t < sq;
      F.damla(ctx, t, { x: 470, y: 872, s: 1.3, view: 'q3', expr: surprised ? 'surprised' : 'curious', look: [0.9, -0.3], arms: surprised ? [[-1, [-40, -150]], [1, [40, -150]]] : [[-1, 0.4], [1, 0.6]] });
      // "Ece" etiketi
      if (t > sh + 4.4 && t < sq + 1) { ctx.save(); ctx.globalAlpha = E.se(t, sh + 4.4, sh + 5) * (1 - E.se(t, sq, sq + 0.8)); INK.label(ctx, 'Ece', 1560, 560, { size: 40, weight: 700 }); ctx.restore(); }
      ctx.restore();
      // soru baloncuğu
      const bk = E.se(t, sq + 0.2, sq + 0.9);
      if (bk > 0) {
        P.bubble(ctx, 1000, 330, 980, 250, [620, 560], bk, 4);
        P.write(ctx, 'Saçlar neden dikildi?', 1000, 305, E.seg(t, sq + 0.6, sq + 1.8), { size: 54, align: 'center' });
        P.write(ctx, 'Kazaktaki çıtırtıyla aynı sebep mi?', 1000, 380, E.seg(t, sq + 2.4, sq + 3.8), { size: 44, align: 'center', color: F.AMB });
      }
      F.title(ctx, t, '20 · Elektriklenme', 'Fen Bilimleri · 7. sınıf · Ünite 6', F.AMB);
    }
  });
})();

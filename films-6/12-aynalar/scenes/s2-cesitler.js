// SAHNE 2 — Üç ayna çeşidi (kesit) + kaşık benzetmesi
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F612;
  const XS = [420, 960, 1500], Y = 470;

  E.scene({
    name: 'Ayna çeşitleri', concept: 'Düz, çukur, tümsek ayna', from: 'three', to: 'spoon', trFrom: [960, 470],
    draw(ctx, t) {
      const st = E.s('three'), ss = E.s('spoon');
      const names = ['düz ayna', 'çukur ayna', 'tümsek ayna'], notes = ['yüzeyi düz', 'yüzeyi içe doğru', 'yüzeyi dışa doğru'];
      XS.forEach((x, i) => {
        const k = E.se(t, st + 0.6 + i * 1.3, st + 1.4 + i * 1.3); if (k <= 0) return;
        E.layer(ctx, k, c => {
          F.card(c, x - 230, 230, 460, 400, { seed: 1010 + i });
          if (i === 0) F.mirror(c, x - 150, x + 150, Y, { th: 20 });
          if (i === 1) F.arcMirror(c, [x, Y - 280], 300, Math.PI * 0.5 - 0.52, Math.PI * 0.5 + 0.52, 'concave', { seed: 1020 });
          if (i === 2) F.arcMirror(c, [x, Y + 300], 300, Math.PI * 1.5 - 0.52, Math.PI * 1.5 + 0.52, 'convex', { seed: 1021 });
          // parlak (yansıtıcı) yüz yukarıda: göz işareti
          P.icon.eye(c, x, Y - 130, 0.4);
          INK.label(c, names[i], x, Y + 110, { size: 44, weight: 700, align: 'center' });
          INK.label(c, notes[i], x, Y + 150, { size: 30, align: 'center', alpha: 0.7 });
        });
      });
      INK.label(ctx, 'kesit: parlak yüz yukarıda (göz tarafında)', 960, 690, { size: 30, align: 'center', alpha: 0.65 * E.se(t, st + 4.5, st + 5.2) * (1 - E.se(t, ss, ss + 0.5)) });
      // kaşık
      const kk = E.se(t, ss + 0.2, ss + 1.0);
      if (kk > 0) E.layer(ctx, kk, c => {
        F.spoon(c, 760, 745, 0.45, 'in'); F.spoon(c, 1160, 745, 0.45, 'out');
        P.arrow(c, [760, 692], [XS[1] - 40, 640], E.se(t, ss + 1.0, ss + 1.8), { w: 2.6, bend: -20, head: 12 });
        P.arrow(c, [1160, 692], [XS[2] - 60, 640], E.se(t, ss + 2.4, ss + 3.2), { w: 2.6, bend: 20, head: 12 });
        INK.label(c, 'kaşığın içi', 640, 800, { size: 34, weight: 700, align: 'right' });
        INK.label(c, 'kaşığın sırtı', 1280, 800, { size: 34, weight: 700 });
      });
      DAMLA.draw(ctx, { x: 180, y: 900, s: 0.85, view: 'q3', expr: 'curious', look: [0.8, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: [[-1, 0.35], [1, 1.9]] });
    }
  });
})();

// SAHNE 9 — Sıra sende (çimlenme düzeneği, performans görevi özendirme), sıradaki film, bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F06;
  E.scene({
    name: 'Sıra sende', concept: 'Çimlenme deneyi görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next'), se = E.s('end');
      const hill = P.hillLine(E.W);
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1760, P.hillY(hill, 1760) + 6] });
      // sıradaki: kelebek (hayvanlarda üreme)
      const kb = E.se(t, sn, sn + 1.5);
      if (kb > 0) { const bx = E.lerp(1900, 1350, kb) + Math.sin(t * 1.7) * 30, by = 520 + Math.sin(t * 2.3) * 40; const fl = 0.55 + 0.45 * Math.abs(Math.sin(t * 7));
        [[-1], [1]].forEach(([d], i) => { const w1 = F.blob(bx + d * 34 * fl, by - 16, 36 * fl, 30, 7500 + i, 0.1), w2 = F.blob(bx + d * 26 * fl, by + 22, 24 * fl, 20, 7502 + i, 0.1); F.shape(ctx, w1, { fill: '#F6E2A0', col: PAL.light, a: 0.55, seed: 7504 + i }); F.shape(ctx, w2, { fill: '#F6E2A0', col: PAL.light, a: 0.55, seed: 7506 + i }); });
        P.fillPts(ctx, circlePts(bx, by, 6, 30, 16), PAL.ink, 0.85); }
      const dx = 620, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: 'happy', look: [0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.6, se + 0.2, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, 'Hayvanlarda Üreme, Büyüme ve Gelişme', 960, 320, t, sn + 1.2, se + 0.2, { size: 70, align: 'center' });
      F.taskCard(ctx, t, st, sn, 'Sıra sende!', [
        { txt: 'Grubunla bir çimlenme düzeneği kur.', at: st + 1.4 },
        { txt: 'Yalnızca sıcaklığı değiştir (oda / buzdolabı).', at: st + 3.0 },
        { txt: 'Diğer her şeyi aynı tut.', at: st + 4.6 },
        { txt: 'Her gün gözle, çiz ve kaydet.', at: st + 6.0 },
        { txt: 'Hipotezin ne? Önermeni sonuçlara dayandır.', at: st + 7.4, color: F.LIFE_D, size: 44 }
      ], (c, x, y) => { F.jar(c, x - 20, y + 170, 0.8, { wet: 1, sprout: 0.9 }); F.icoThermo(c, x + 110, y - 80, 1.2); });
      F.endCard(ctx, t, '6', 'Çiçekten Tohuma, Tohumdan Fideye', 'FB.6.3.2 · FB.6.3.3');
    }
  });
})();

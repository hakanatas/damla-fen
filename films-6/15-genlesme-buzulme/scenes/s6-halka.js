// SAHNE 6 — Katılar: Gravzant halkası (soğuk küre geçer → ısıtılan küre geçmez → soğuyunca yine geçer)
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = G15;
  const RX = 900, RY = 520, RR = 64;
  E.scene({
    name: 'Gravzant halkası', concept: 'Katılar ısı alınca genleşir, ısı verince büzülür', from: 'solid', to: 'solid', trFrom: [900, 520],
    draw(ctx, t) {
      const s0 = E.s('solid'), u = t - s0;
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 200, 1240, 880, 2601);
      // küre yolu (anahtar kareler)
      const K = [[0, 900, 330], [0.6, 900, 330], [2.0, 900, 720], [2.6, 900, 720], [3.3, 900, 330], [3.9, 520, 600], [5.1, 520, 600], [5.8, 900, 330], [6.5, 900, RY - 26], [9.0, 900, RY - 26], [9.9, 900, 720]];
      let bx = K[K.length - 1][1], by = K[K.length - 1][2];
      for (let i = 1; i < K.length; i++) if (u <= K[i][0]) { const a = K[i - 1], b = K[i], k = E.ease.io(E.clamp((u - a[0]) / Math.max(0.001, b[0] - a[0]))); bx = E.lerp(a[1], b[1], k); by = E.lerp(a[2], b[2], k); break; }
      if (u < 0) { bx = 900; by = 330; }
      const heat = E.clamp((u - 3.9) / 1.2) * (1 - E.clamp((u - 6.8) / 2.1));
      const r = 58 + 8 * heat;
      const flameOn = E.clamp((u - 3.2) / 0.5) * (1 - E.clamp((u - 5.4) / 0.5));
      F.burner(ctx, 520, 880, flameOn, t, 1.1);
      F.ringStand(ctx, RX, RY, RR, 'back');
      F.ball(ctx, bx, by, r, heat, [bx, by - r - 110]);
      F.ringStand(ctx, RX, RY, RR, 'front');
      INK.label(ctx, 'halka', RX - RR - 30, RY + 10, { size: 34, weight: 700, align: 'right', rot: 0 });
      INK.label(ctx, 'küre', bx - r - 20, by + 60, { size: 34, weight: 700, align: 'right', rot: 0, alpha: u < 3 ? 1 : 0 });
      // sonuç kartı
      F.card(ctx, 1280, 160, 580, 480, { fill: '#FBF6E8', seed: 2610 });
      INK.label(ctx, '(çizim ölçekli değildir)', 1570, 610, { size: 26, align: 'center', alpha: 0.6 });
      INK.label(ctx, 'Gözlemlerim', 1570, 225, { size: 44, weight: 700, align: 'center', color: F.AMBER });
      const rows = [['soğuk küre', 'geçti', true, 2.0], ['ısıtılan küre', 'geçmedi', false, 6.6], ['soğuyan küre', 'yine geçti', true, 9.9]];
      rows.forEach(([a, b, ok, at], i) => {
        const y = 330 + i * 110, k = E.clamp((u - at) / 0.8); if (k <= 0) return;
        P.write(ctx, a, 1320, y, k, { size: 40, color: i === 1 ? F.HEAT : PAL.ink });
        P.write(ctx, '→ ' + b, 1560, y, E.seg(k, 0.3, 1), { size: 40 });
        if (ok) P.check(ctx, 1810, y - 16, 40, E.seg(k, 0.5, 1), { w: 5 }); else P.cross(ctx, 1812, y - 14, 14, E.seg(k, 0.5, 1), { w: 5, color: F.RED });
      });
      if (u > 6.6 && u < 9.2) INK.label(ctx, 'genleşti!', RX + 110, RY - 70, { size: 46, weight: 700, color: F.HEAT, alpha: E.clamp((u - 6.6) / 0.6) * (1 - E.clamp((u - 8.6) / 0.6)) });
      if (u > 8.4) INK.label(ctx, 'büzüldü', RX + 110, RY - 70, { size: 46, weight: 700, color: PAL.water, alpha: E.clamp((u - 8.4) / 0.6) });
      DAMLA.draw(ctx, {
        x: 1570, y: 900, s: 1.05, view: 'q3', flip: true, t, seed: 6, blink: E.blink(t, 17), squash: E.breath(t), talk: E.talk(t),
        expr: u > 6.5 && u < 9 ? 'surprised' : 'curious', look: [-0.9, -0.2], arms: [[-1, 0.4], [1, 1.2]], prop: 'notebook'
      });
    }
  });
})();

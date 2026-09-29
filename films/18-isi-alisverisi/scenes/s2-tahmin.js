// SAHNE 2 — TGA (Tahmin–Gözlem–Açıklama) tekniği: öğrencinin tahmini alınır (açık uçlu)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F18;
  F.tga = (ctx, t, active, a = 1, x0 = 700) => { // üst şerit: T · G · A
    const L = [['T', 'Tahmin'], ['G', 'Gözlem'], ['A', 'Açıklama']];
    ctx.save(); ctx.globalAlpha *= a;
    L.forEach(([l, n], i) => {
      const x = x0 + i * 260, y = 200, on = i === active;
      const c = INK.wobble(circlePts(x, y, 42, 42, 30), 1.5, 60 + i);
      P.fillPts(ctx, c, on ? '#F6E7B8' : '#FBF8F1'); stroke(ctx, c, { w: on ? 4 : 2.4, closed: true, seed: 63 + i, color: on ? '#8A4A10' : PAL.ink });
      INK.label(ctx, l, x, y + 16, { size: 46, weight: 700, align: 'center' });
      INK.label(ctx, n, x + 56, y + 14, { size: 38, weight: on ? 700 : 400, alpha: on ? 1 : 0.6 });
      if (i < 2) P.arrow(ctx, [x + 200, y], [x + 214, y], 1, { w: 2, head: 10 });
    });
    ctx.restore();
  };
  E.scene({
    name: 'Tahmin', concept: 'TGA: önce tahmin', from: 'predict', to: 'guesses', trFrom: [960, 200],
    draw(ctx, t) {
      const sp = E.s('predict'), sg = E.s('guesses');
      ctx.fillStyle = 'rgba(138,106,69,0.1)'; ctx.fillRect(0, 0, E.W, E.H);
      F.tga(ctx, t, 0, E.se(t, sp + 0.2, sp + 1.2));
      const kb = Math.min(E.se(t, sp + 0.3, sp + 1.0), 1 - E.se(t, sg, sg + 0.5));
      if (kb > 0) { ctx.save(); ctx.globalAlpha = kb; F.beakerPair(ctx, t, { xs: [620, 1100], y: 470 }); INK.label(ctx, '+', 960, 620, { size: 90, weight: 700, align: 'center' }); ctx.restore(); }
      // üç tahmin kartı
      const G = [
        { x: 400, a: '80 °C mi?', b: '(20 + 60)', col: F.HEAT },
        { x: 960, a: '20 °C’den', b: 'soğuk mu?', col: PAL.water },
        { x: 1520, a: '20 ile 60 °C', b: 'arasında mı?', col: '#8A4A10' }
      ];
      G.forEach((g, i) => {
        const k = E.se(t, sg + 0.3 + i * 2.2, sg + 0.9 + i * 2.2, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(g.x, 500); ctx.scale(P.pop(k), P.pop(k)); ctx.rotate([-0.03, 0.02, -0.015][i]);
        F.card(ctx, 0, 0, 440, 260, { seed: 70 + i });
        INK.label(ctx, g.a, 0, -10, { size: 58, weight: 700, align: 'center', color: g.col });
        INK.label(ctx, g.b, 0, 60, { size: 46, weight: 700, align: 'center', alpha: 0.85 });
        ctx.restore();
      });
      // tahmin satırı
      const kw = E.se(t, sg + 7.0, sg + 7.8);
      if (kw > 0) { ctx.save(); ctx.globalAlpha = kw; INK.label(ctx, 'Tahminim:', 560, 780, { size: 52, weight: 700 }); INK.dashed(ctx, F.linePts([830, 790], [1180, 790]), { w: 2.4, on: 12, off: 8 }); INK.label(ctx, '°C', 1200, 780, { size: 52, weight: 700 }); ctx.restore(); }
      DAMLA.draw(ctx, { x: 1640, y: 900, s: 1.05, view: 'q3', flip: true, expr: 'thinking', look: [-0.7, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]], prop: 'notebook' });
      const sk = E.se(t, sp + 1.2, sp + 2.0);
      if (sk > 0) P.write(ctx, 'Sence karışımın sıcaklığı kaç °C olur?', 960, 350, sk, { size: 48, align: 'center' });
    }
  });
})();

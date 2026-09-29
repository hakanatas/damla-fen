// SAHNE 6 — Günlük yaşamdan katı, sıvı ve gaz örnekleri + genelleme: doğada maddeler arası ısı alışverişi vardır (termal denge)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F18;
  function cards(ctx, t) {
    const sd = E.s('daily');
    const C = [
      { x: 360, at: sd + 0.3, title: 'çorbadaki kaşık', kind: 'katı ısı alır', d: c => { F.bowl(c, 360, 640, 1.2); F.spoon(c, 470, 430, 380, 560, E.se(t, sd + 1.5, sd + 4)); F.steam(c, 320, 540, 0.8, t, { color: F.HEAT }); F.heatArrow(c, [300, 580], [390, 520], E.se(t, sd + 1.2, sd + 2.2), { t, w: 3.6, amp: 5, waves: 2, head: 13 }); } },
      { x: 960, at: sd + 3.0, title: 'buzlu içecek', kind: 'sıvı ısı verir, buz alır', d: c => { F.glass(c, 880, 420, 160, 220, 170, { seed: 360, color: '#A8703A' }); F.iceCube(c, 925, 485, 1, 0.1 + 0.3 * E.se(t, sd + 4, sd + 9), 1); F.iceCube(c, 985, 495, 1, 0.1 + 0.3 * E.se(t, sd + 4, sd + 9), 2); F.heatArrow(c, [930, 600], [940, 520], E.se(t, sd + 3.8, sd + 4.8), { t, w: 3.6, amp: 5, waves: 2, head: 13 }); } },
      { x: 1560, at: sd + 5.8, title: 'kalorifer ve oda', kind: 'hava (gaz) ısı alır', d: c => { F.radiator(c, 1500, 650, 1.1); for (let i = 0; i < 3; i++) F.heatArrow(c, [1560 + i * 10, 470 - i * 10], [1680, 420 - i * 30], E.se(t, sd + 6.6 + i * 0.2, sd + 7.6 + i * 0.2), { t, w: 3.4, amp: 5, waves: 2, head: 12, seed: 370 + i }); F.field(c, 'gas', [1600, 360, 140, 150], t, { r: 9, n: 5, seed: 71 }); } }
    ];
    C.forEach((c, i) => {
      const k = E.se(t, c.at, c.at + 0.6, 'out'); if (k <= 0) return;
      ctx.save(); ctx.translate(c.x, 520); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-c.x, -520);
      F.card(ctx, c.x, 520, 520, 620, { seed: 380 + i });
      c.d(ctx);
      INK.label(ctx, c.title, c.x, 730, { size: 44, weight: 700, align: 'center' });
      INK.label(ctx, c.kind, c.x, 790, { size: 36, align: 'center', color: '#8A4A10' });
      ctx.restore();
    });
  }
  function nature(ctx, t) {
    const sn = E.s('nature');
    const hill = P.hillLine(E.W, 860);
    P.sun(ctx, 1560, 250, 100, t, { nrays: 20 });
    P.landscape(ctx, E.W, E.H, t, { hill });
    for (let i = 0; i < 3; i++) F.heatArrow(ctx, [1450 - i * 30, 320 + i * 40], [1150 - i * 120, 640 + i * 40], E.se(t, sn + 0.6 + i * 0.2, sn + 1.8 + i * 0.2), { t, w: 4, amp: 7, head: 15, seed: 390 + i });
    const k = E.se(t, sn + 0.4, sn + 1.2, 'out');
    if (k > 0) { ctx.save(); ctx.translate(760, 330); ctx.scale(P.pop(k), P.pop(k)); ctx.rotate(-0.02); F.card(ctx, 0, 0, 1060, 230, { seed: 395, fill: '#F6E7B8' }); INK.label(ctx, 'Doğada maddeler arasında', 0, -20, { size: 56, weight: 700, align: 'center' }); INK.label(ctx, 'hep ısı alışverişi vardır.', 0, 52, { size: 56, weight: 700, align: 'center', color: F.HEAT }); ctx.restore(); }
    const dx = 560, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.3, view: 'q3', expr: 'happy', look: [0.8, -0.5], blink: E.blink(t, 9), squash: E.breath(t), t: t * 1.4, seed: 1, arms: [[-1, 0.4], [1, 2.4]] });
  }
  E.scene({
    name: 'Günlük yaşam', concept: 'Katı, sıvı, gaz örnekleri; genelleme', from: 'daily', to: 'nature', trFrom: [960, 520],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(181,85,63,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const a = E.se(t, E.s('nature') - 0.4, E.s('nature') + 0.4);
      if (a < 1) E.layer(ctx, 1 - a, c => cards(c, t));
      if (a > 0) E.layer(ctx, a, c => nature(c, t));
    }
  });
})();

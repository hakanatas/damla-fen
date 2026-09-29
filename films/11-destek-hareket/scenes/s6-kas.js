// SAHNE 6 — Kas: nitelik (iskeletle birlikte hareket) ve kas çeşitleri (çalışma ilkesine girilmez)
(function () {
  const { PAL, stroke } = INK;
  E.scene({
    name: 'Kas', concept: 'Kas ve kas çeşitleri', from: 'muscle', to: 'muscletypes', trFrom: [700, 500],
    draw(ctx, t) {
      const F = F11, sm = E.s('muscle'), st = E.s('muscletypes');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, st - 0.3, st + 0.3), a2 = E.se(t, st - 0.1, st + 0.5);
      if (a1 > 0) E.layer(ctx, a1, c => {
        F.armMuscle(c, 300, 620, 1.6, 0.9 * (0.5 - 0.5 * Math.cos(t * 1.8)));
        P.write(c, 'Kas', 1120, 300, E.seg(t, sm + 0.3, sm + 1.2), { size: 64, color: '#A0522D' });
        P.write(c, 'kas + iskelet → hareket', 1120, 390, E.seg(t, sm + 1.4, sm + 2.8), { size: 46 });
        P.write(c, '3 çeşit', 1120, 520, E.seg(t, sm + 4.8, sm + 5.8), { size: 52, color: '#A0522D' });
        INK.label(c, '(sade çizim)', 560, 800, { size: 28, align: 'center', alpha: 0.5 });
      });
      if (a2 > 0) E.layer(ctx, a2, c => {
        const C = [
          ['iskelet kası', 'kol, bacak', 'isteğimizle çalışır', 400, st + 0.3, (cc, x, y) => F.armMuscle(cc, x - 170, y + 20, 0.95, 0.5 * (0.5 - 0.5 * Math.cos(t * 1.8)))],
          ['düz kas', 'mide, bağırsak', 'isteğimiz dışında', 960, st + 4.2, (cc, x, y) => F.stomach(cc, x, y - 40, 1)],
          ['kalp kası', 'yalnızca kalpte', 'isteğimiz dışında', 1520, st + 7.4, (cc, x, y) => F.heart(cc, x, y + 10, 0.8, t)]
        ];
        C.forEach(([n, where, ctrl, x, at, fn], i) => {
          const k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 520); c.scale(P.pop(k), P.pop(k));
          const card = INK.wobble(F.rrect(0, 0, 480, 640, 24, 6), 1.5, 80 + i); P.fillPts(c, card, '#FBF8F1'); stroke(c, card, { w: 2.6, closed: true, seed: 90 + i });
          c.restore();
          if (k > 0.5) fn(c, x, 430);
          P.write(c, n, x, 700, E.seg(t, at + 0.4, at + 1.4), { size: 48, align: 'center', color: '#A0522D' });
          P.write(c, where, x, 750, E.seg(t, at + 1, at + 2), { size: 34, weight: 400, align: 'center' });
          P.write(c, ctrl, x, 805, E.seg(t, at + 1.8, at + 2.8), { size: 36, align: 'center', color: i === 0 ? '#3E5A1A' : '#2E6A8C' });
        });
      });
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

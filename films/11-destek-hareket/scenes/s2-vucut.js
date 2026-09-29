// SAHNE 2 — Kendi vücudundan yola çıkma (açık uçlu sorular) + sistemin görevleri (nitelikleri tanımlar)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const Q = [
    ['body', 0.3, 'Koluna bastır: sert olan ne?', 'kemik'],
    ['bend', 0.2, 'Kolunu bük: nereden bükülüyor?', 'eklem'],
    ['bend', 3.0, 'Kulağına dokun: esnek olan ne?', 'kıkırdak'],
    ['move', 0.2, 'Kolunu kaldır: hareketi ne sağlıyor?', 'kas']
  ];
  function icon(ctx, i, x, y) {
    const F = F11;
    if (i === 0) { stroke(ctx, circlePts(x, y - 50, 16, 16, 20), { w: 2.6, closed: true }); stroke(ctx, [[x, y - 34], [x, y + 20]], { w: 2.6 }); stroke(ctx, [[x - 28, y - 14], [x + 28, y - 14]], { w: 2.6 }); stroke(ctx, [[x, y + 20], [x - 20, y + 60]], { w: 2.6 }); stroke(ctx, [[x, y + 20], [x + 20, y + 60]], { w: 2.6 }); INK.dashed(ctx, circlePts(x, y, 50, 72, 40), { w: 2, on: 8, off: 6 }); }
    else if (i === 1) { const c = [[x - 26, y + 60], [x - 26, y - 40], [x + 26, y - 40], [x + 26, y + 60]]; P.fillPts(ctx, c, '#E7DCC6'); stroke(ctx, c, { w: 2.6 }); stroke(ctx, [[x - 40, y - 46], [x + 40, y - 46]], { w: 5 }); stroke(ctx, [[x - 40, y + 64], [x + 40, y + 64]], { w: 5 }); }
    else if (i === 2) { const s = P.bez([x - 44, y - 50], [x, y - 64], [x + 44, y - 50], 12).concat(P.bez([x + 44, y - 50], [x + 44, y + 30], [x, y + 64], 12), P.bez([x, y + 64], [x - 44, y + 30], [x - 44, y - 50], 12)); P.fillPts(ctx, s, '#DCE4BE'); stroke(ctx, s, { w: 2.8, closed: true }); P.check(ctx, x - 8, y, 40, 1, { w: 5 }); }
    else { F.kid(ctx, x, y + 64, 0.3, { run: true, phase: 1 + 0 }); for (let j = 0; j < 3; j++) stroke(ctx, [[x - 70, y - 30 + j * 25], [x - 40, y - 30 + j * 25]], { w: 2.4, alpha: 0.5, dry: false }); }
  }
  E.scene({
    name: 'Vücudunu keşfet', concept: 'Destek ve hareket sistemi ve görevleri', from: 'body', to: 'jobs', trFrom: [520, 540],
    draw(ctx, t) {
      const F = F11, sm = E.s('move'), sj = E.s('jobs');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const xk = E.se(t, sj + 0.2, sj + 1.6);
      const liftArm = t > sm && t < sj;
      E.layer(ctx, 1 - xk * 0.85, c => {
        const kx = 520, ky = 900, ks = 1.6;
        F.kid(c, kx, ky, ks, { t });
      });
      if (xk > 0) E.layer(ctx, xk, c => F.skeleton(c, 520, 895, 0.9, {}));
      // touch markers
      const pts = { body: [595, 470], bend: [619, 520], ear: [608, 340], move: [590, 460] };
      const act = t < E.s('bend') ? 'body' : t < E.s('bend', 3.0) ? 'bend' : t < sm ? 'ear' : t < sj ? 'move' : null;
      if (act) { const p = pts[act]; const r = 26 + 6 * Math.sin(t * 6); ctx.save(); ctx.globalAlpha *= 0.9; stroke(ctx, circlePts(p[0], p[1], r, r, 30), { w: 4, closed: true, color: PAL.light, dry: false }); ctx.restore(); }
      // question cards
      const qa = 1 - E.se(t, sj - 0.3, sj + 0.4);
      if (qa > 0) E.layer(ctx, qa, c => {
        Q.forEach(([id, off, q, a], i) => {
          const at = E.s(id, off), k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const y = 260 + i * 160;
          c.save(); c.translate(1360, y); c.scale(P.pop(k), P.pop(k));
          const b = INK.wobble(F.rrect(0, 0, 1000, 120, 18, 6), 1.4, 40 + i); P.fillPts(c, b, '#FBF8F1'); stroke(c, b, { w: 2.4, closed: true, seed: 50 + i });
          c.restore();
          P.write(c, q, 890, y + 14, E.seg(t, at + 0.2, at + 1.4), { size: 38 });
          const ka = E.se(t, sm + 4.2 + i * 0.6, sm + 5 + i * 0.6);
          if (ka > 0) { P.write(c, '→ ' + a, 1835, y + 14, ka, { size: 44, color: '#3E5A1A', align: 'right' }); }
        });
      });
      // jobs
      if (xk > 0) {
        const J = [['şekil verir', 1120, 330], ['destekler', 1560, 330], ['iç organları korur', 1120, 640], ['hareketi sağlar', 1560, 640]];
        J.forEach(([n, x, y], i) => {
          const at = sj + 1.4 + i * 1.6, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          ctx.save(); ctx.translate(x, y - 30); ctx.scale(P.pop(k) * 1.4, P.pop(k) * 1.4); ctx.translate(-x, -(y - 30)); icon(ctx, i, x, y - 30); ctx.restore();
          P.write(ctx, n, x, y + 120, k, { size: 44, align: 'center', color: '#3E5A1A' });
        });
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.7, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

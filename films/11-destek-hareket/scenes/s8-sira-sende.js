// SAHNE 8 — Sıra sende (kendi vücudunda eklem bul) + sonraki film + bitiş
(function () {
  const { PAL, stroke, circlePts } = INK;
  function task(ctx, t) {
    const F = F11, st = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 80, 1620, 830);
    P.write(ctx, 'Sıra sende!', 700, 250, E.seg(t, st + 0.3, st + 1.3), { size: 84, align: 'center', color: '#8A4A10' });
    P.write(ctx, 'Vücudunda üç eklem bul.', 700, 360, E.seg(t, st + 1.2, st + 2.4), { size: 50, align: 'center' });
    P.write(ctx, 'Hangi çeşit? Defterine yaz.', 700, 430, E.seg(t, st + 2.4, st + 3.6), { size: 50, align: 'center' });
    ['eklem', 'yer', 'çeşidi'].forEach((h, i) => P.write(ctx, h, 330 + i * 250, 540, E.seg(t, st + 3.8, st + 4.6), { size: 40, color: '#6B4A1E' }));
    for (let r = 0; r < 4; r++) P.drawOn(ctx, [[320, 560 + r * 70], [1080, 558 + r * 70]], E.se(t, st + 4 + r * 0.2, st + 4.6 + r * 0.2), { w: 1.8, alpha: 0.6 });
    [1, 2].forEach(i => P.drawOn(ctx, [[310 + i * 250, 510], [310 + i * 250, 770]], E.se(t, st + 4.2, st + 4.8), { w: 1.6, alpha: 0.5 }));
    P.write(ctx, '1. diz', 330, 610, E.seg(t, st + 5, st + 5.8), { size: 38, color: '#2E6A8C' });
    P.write(ctx, 'bacak', 580, 610, E.seg(t, st + 5.6, st + 6.2), { size: 38, color: '#2E6A8C' });
    P.write(ctx, 'oynar', 830, 610, E.seg(t, st + 6.2, st + 6.8), { size: 38, color: '#2E6A8C' });
    const k = E.se(t, st + 1, st + 2);
    ctx.save(); ctx.globalAlpha *= k; F.kid(ctx, 1420, 830, 1.35, { t }); ctx.restore();
    [[1420 + 62 * 1.35, 830 - 240 * 1.35], [1420 + 22 * 1.35, 830 - 85 * 1.35], [1420 + 44 * 1.35, 830 - 290 * 1.35]].forEach((p, i) => {
      const kk = E.se(t, st + 2.4 + i * 0.5, st + 3 + i * 0.5); if (kk <= 0) return;
      INK.label(ctx, '?', p[0] + 40, p[1] - 10, { size: 50, weight: 700, color: '#C07F1E', alpha: kk });
      stroke(ctx, circlePts(p[0], p[1], 22, 22, 24), { w: 3.4, closed: true, color: '#C07F1E', dry: false, alpha: kk });
    });
    DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5, arms: [[-1, 0.4], [1, 2.3 + 0.2 * Math.sin(t * 5)]] });
  }
  function next(ctx, t) {
    const sn = E.s('next'), hill = P.hillLine(E.W);
    P.landscape(ctx, E.W, E.H, t, { hill });
    const dx = 820, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view: 'q3', expr: 'happy', look: [0.6, -0.5], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, E.e('next') + 1, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Destek ve Hareket Sistemimizin Sağlığı', 960, 285, t, sn + 1.1, E.e('next') + 1, { size: 70, align: 'center' });
    const k = E.se(t, sn + 2, sn + 3, 'out');
    if (k > 0) { ctx.save(); ctx.globalAlpha *= k; F11.kid(ctx, 1400, P.hillY(hill, 1400) + 8, 0.9, { run: true, phase: t * 7, t }); ctx.restore(); }
    F11.endCard(ctx, t, 11, 'Destek ve Hareket Sistemi', 'FB.5.3.3');
  }
  E.scene({ name: 'Sıra sende', concept: 'Kendi vücudunda eklem bul', from: 'task', to: 'task', trFrom: [960, 540], draw: task });
  E.scene({ name: 'Sıradaki', concept: 'Destek ve hareket sisteminin sağlığı', from: 'next', to: 'end', trFrom: [820, 700], draw: next });
})();

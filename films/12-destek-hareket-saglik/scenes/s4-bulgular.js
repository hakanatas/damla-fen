// SAHNE 4 — Bulunan bilgiler: dengeli beslenme, spor ve sosyal etkinlik, teknoloji bağımlılığı
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  E.scene({
    name: 'Bulgular', concept: 'Beslenme, spor, teknoloji bağımlılığı', from: 'food', to: 'tech', trFrom: [480, 540],
    draw(ctx, t) {
      const F = F12, sf = E.s('food'), ss = E.s('sport'), st = E.s('tech');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      P.write(ctx, 'Bulgularım', 560, 190, E.seg(t, sf + 0.2, sf + 1), { size: 58, color: '#8A4A10' });
      const X = [480, 960, 1440];
      const pan = (i, at) => { const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return 0; const fr = INK.wobble(F.rrect(X[i], 500, 440, 520, 20, 6), 1.5, 70 + i); ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, fr, PAL.white, 0.85); stroke(ctx, fr, { w: 2.4, closed: true, seed: 80 + i }); ctx.restore(); return k; };
      // food
      const k1 = pan(0, sf + 0.8);
      if (k1 > 0) {
        const plate = circlePts(X[0], 430, 170, 110, 50); ctx.save(); ctx.globalAlpha *= k1; P.fillPts(ctx, plate, '#FBF8F1'); stroke(ctx, plate, { w: 3, closed: true, seed: 90 }); stroke(ctx, circlePts(X[0], 430, 130, 82, 50), { w: 1.6, closed: true, dry: false, alpha: 0.5 });
        [['milk', -90, -20], ['cheese', 0, 30], ['egg', 90, -20], ['greens', -60, 60], ['bread', 60, 60], ['fish', 0, -50]].forEach(([kd, dx, dy], i) => { if (t > sf + 1.2 + i * 0.3) F.food(ctx, kd, X[0] + dx, 430 + dy * 0.9, 0.55); });
        ctx.restore();
        P.write(ctx, 'yeterli ve dengeli', X[0], 640, E.seg(t, sf + 2.6, sf + 3.6), { size: 40, align: 'center', color: '#3E5A1A' });
        P.write(ctx, 'beslenme', X[0], 690, E.seg(t, sf + 3.2, sf + 4), { size: 40, align: 'center', color: '#3E5A1A' });
        P.write(ctx, 'kemik ve kas gelişimi', X[0], 740, E.seg(t, sf + 4.2, sf + 5.2), { size: 30, weight: 400, align: 'center' });
      }
      // sport
      const k2 = pan(1, ss + 0.2);
      if (k2 > 0) {
        ctx.save(); ctx.globalAlpha *= k2; F.kid(ctx, X[1] - 40, 590, 0.75, { run: true, phase: t * 7, helmet: true, pads: true, t }); F.ball(ctx, X[1] + 120, 560 - Math.abs(Math.sin(t * 3.5)) * 60, 30, t * 3); ctx.restore();
        P.write(ctx, 'düzenli spor ve', X[1], 640, E.seg(t, ss + 1, ss + 2), { size: 40, align: 'center', color: '#3E5A1A' });
        P.write(ctx, 'sosyal etkinlik', X[1], 690, E.seg(t, ss + 1.6, ss + 2.4), { size: 40, align: 'center', color: '#3E5A1A' });
        P.write(ctx, 'koruyucu: kask, dizlik', X[1], 740, E.seg(t, ss + 5, ss + 6), { size: 30, weight: 400, align: 'center' });
      }
      // tech
      const k3 = pan(2, st + 0.2);
      if (k3 > 0) {
        ctx.save(); ctx.globalAlpha *= k3; F.sitter(ctx, X[2] - 30, 590, 0.95, false, t); P.icon.clock(ctx, X[2] + 130, 330, 0.6, t * 2); ctx.restore();
        P.write(ctx, 'saatlerce ekran', X[2], 640, E.seg(t, st + 1, st + 2), { size: 40, align: 'center', color: '#8A4A10' });
        P.write(ctx, 'boyun ve sırt yorulur', X[2], 690, E.seg(t, st + 2.4, st + 3.4), { size: 34, weight: 400, align: 'center' });
        P.write(ctx, 'hareketsiz kalırız', X[2], 740, E.seg(t, st + 4.6, st + 5.6), { size: 34, weight: 400, align: 'center' });
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();

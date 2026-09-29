// SAHNE 1 — Başlık + Büyüme (köprü: bebeklikten bugüne kendi gelişimi) + merak soruları
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F08;
  const MARKS = [[1, 800], [3, 715], [6, 615], [9, 530], [12, 455]];
  E.scene({
    name: 'Büyüme', concept: 'Köprü: kendi büyümemiz; merak soruları', from: 'title', to: 'questions',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('questions');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.07)'); g.addColorStop(1, 'rgba(111,138,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      F.door(ctx, 1160, 230, 880);
      stroke(ctx, [[60, 886], [1860, 882]], { w: 3, seed: 6001 });
      MARKS.forEach(([age, y], i) => {
        const k = E.se(t, sh + 0.8 + i * 0.8, sh + 1.3 + i * 0.8); if (k <= 0) return;
        P.drawOn(ctx, [[1222, y], [1276, y - 1], [1330, y - 2]], k, { w: 3.4 });
        K.text(ctx, age + ' yaş', 1345, y + 12, { size: 36, alpha: 0.9 * k });
      });
      const kq = E.se(t, sq + 0.4, sq + 1.2);
      if (kq > 0) { ctx.save(); ctx.globalAlpha = kq; INK.dashed(ctx, [[1222, 372], [1276, 371], [1330, 370]], { w: 3, color: PAL.life, on: 10, off: 8 }); ctx.restore(); K.text(ctx, '? ergenlik', 1345, 384, { size: 36, color: K.LIFE_D, alpha: kq }); }
      const ka = E.se(t, sh + 5.0, sh + 6.0);
      if (ka > 0) { P.arrow(ctx, [1580, 830], [1580, 430], ka, { w: 3, head: 16, color: K.LIFE_D }); K.text(ctx, 'büyüme ve gelişme', 1675, 800, { size: 34, color: K.LIFE_D, alpha: ka, rot: -Math.PI / 2 }); }
      // Damla
      const point = t > sh + 0.5 && t < sq;
      K.damla(ctx, t, { x: 860, y: 880, s: 1.5, expr: t > sq ? 'thinking' : 'curious', look: t > sq ? [-0.6, -0.5] : [0.8, -0.2],
        arms: point ? [[-1, 0.4], [1, 1.9 + 0.05 * Math.sin(t * 3)]] : t > sq ? [[-1, 0.4], [1, [34, -150], 1]] : [[-1, 0.35], [1, 0.35]] });
      // merak balonları
      K.say(ctx, ['Yeni bir insan', 'nasıl oluşur?'], 400, 300, 560, 170, [720, 520], E.se(t, sq + 0.3, sq + 1.0, 'out'), { size: 46, seed: 1 });
      K.say(ctx, ['Ergenlikte bedende ve', 'duygularda neler değişir?'], 400, 590, 600, 170, [730, 660], E.se(t, sq + 2.6, sq + 3.3, 'out'), { size: 42, seed: 2 });
      K.title(ctx, t, 8, 'İnsanda Üreme ve Ergenlik', 3);
    }
  });
})();

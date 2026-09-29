// SAHNE 1 — Merak: geri dönüşüm ülke kaynaklarını nasıl etkiler? (TYMM: açık uçlu soru)
(function () {
  const { PAL } = INK;
  E.scene({
    name: 'Merak', concept: 'Soru: geri dönüşüm ve kaynaklar', from: 'title', to: 'question',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello'), sq = E.s('question');
      ctx.save();
      const z = E.se(t, sh, E.e('question'), 'sine');
      E.cam(ctx, E.camLerp({ x: 960, y: 540, z: 1 }, { x: 1000, y: 520, z: 1.05 }, z));
      const g = ctx.createRadialGradient(1500, 250, 40, 1500, 250, 800); g.addColorStop(0, 'rgba(227,160,58,0.25)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      P.sun(ctx, 1560, 230, 70, t, { nrays: 16, cells: false });
      P.landscape(ctx, E.W, E.H, t, { hill });
      W7.tree(ctx, 1480, P.hillY(hill, 1480) + 6, 1.1, 2, t); W7.tree(ctx, 1700, P.hillY(hill, 1700) + 6, 0.9, 3, t);
      ['mavi', 'sari', 'yesil', 'gri'].forEach((k, i) => W7.bin(ctx, k, 1110 + i * 95, P.hillY(hill, 1110 + i * 95) + 8, 0.42));
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      let arms = [[-1, 0.35], [1, 0.35]], expr = 'neutral', look = [0, 0.1];
      if (t > sh + 0.4 && t < sq) { arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; expr = 'happy'; }
      if (t >= sq) { expr = 'thinking'; look = [0.6, -0.6]; arms = [[-1, 0.3], [1, [30, -86]]]; }
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr, look, blink: E.blink(t, 3), squash: E.breath(t), arms, t, talk: E.talk(t), seed: 1 });
      // soru balonu
      const bk = E.se(t, sq + 0.6, sq + 1.2, 'out');
      if (bk > 0) {
        P.bubble(ctx, 1180, 330, 660, 190, [900, 560], bk, 4);
        if (bk > 0.6) {
          W7.recycle(ctx, 930, 330, 34, E.se(t, sq + 1.0, sq + 1.8), { w: 7 });
          P.write(ctx, 'Geri dönüşüm, ülkemizin', 990, 318, E.seg(t, sq + 1.1, sq + 2.3), { size: 42 });
          P.write(ctx, 'kaynaklarını nasıl etkiler?', 990, 372, E.seg(t, sq + 2.0, sq + 3.2), { size: 42 });
        }
      }
      ctx.restore();
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '26 · Geri Dönüşüm Neden Önemli?', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 7', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.life }); ctx.restore(); }
    }
  });
})();

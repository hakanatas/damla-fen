// SAHNE 1 — Merak: basit sarkaç; yükselirken yavaşlar, alçalırken hızlanır → tümevarım planı
(function () {
  const { PAL, line } = INK;
  const F = F7E, A = F76;
  E.scene({
    name: 'Merak', concept: 'Sarkaçta hız ve yükseklik değişimi', from: 'title', to: 'plan',
    draw(ctx, t) {
      const sq = E.s('question'), sp = E.s('plan');
      const px = 620, py = 390, L = 330;
      const th = 0.6 * Math.cos(t * 2.6);
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('plan'), 'sine') });
      A.pend(ctx, px, py, L, th, 38);
      DAMLA.draw(ctx, { x: 1200, y: 828, s: 1.25, view: 'q3', flip: true, expr: t > sq + 3 && t < sp ? 'thinking' : 'happy', look: [-0.8, 0.1], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t < E.s('hello') + 3 && t > E.s('hello') ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : [[-1, [-80, -140]], [1, 0.4]] });
      const qk = E.se(t, sq + 1.0, sq + 1.8);
      if (qk > 0) { ctx.save(); ctx.globalAlpha *= qk;
        F.txt(ctx, 'en yavaş', px - 300, py + 250, { size: 36, align: 'center', color: F.PE });
        F.txt(ctx, 'en yavaş', px + 300, py + 250, { size: 36, align: 'center', color: F.PE });
        F.txt(ctx, 'en hızlı', px, py + L + 150, { size: 36, align: 'center', color: '#9A6412' });
        ctx.restore(); }
      ctx.restore();
      const pk = E.se(t, sp + 0.3, sp + 1.0, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        F.card(c, 1000, 190, 1830, 330, { seed: 6200 });
        const steps = ['4 gözlem', 'örüntü', 'genelleme'];
        steps.forEach((s, i) => { const x = 1100 + i * 270; const k = E.se(t, sp + 0.8 + i * 1.2, sp + 1.4 + i * 1.2); c.save(); c.globalAlpha *= k; F.txt(c, s, x + 40, 278, { size: 44, align: 'center', color: i === 2 ? '#8A4A10' : PAL.ink }); if (i) P.arrow(c, [x - 150, 262], [x - 70, 262], 1, { w: 2.6, head: 12 }); c.restore(); });
      });
      F.title(ctx, t, 6, 'Enerji Kaybolur mu? Enerjinin Korunumu');
    }
  });
})();

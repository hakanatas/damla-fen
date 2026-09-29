// SAHNE 1 — Park: enerji = iş yapabilme yeteneği (film 4 ile köprü) → hareket mi, konum mu?
(function () {
  const { PAL, line, stroke } = INK;
  const F = F7E, A = F75;
  E.scene({
    name: 'Parkta merak', concept: 'Enerji: iş yapabilme yeteneği', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), se = E.s('energy'), sq = E.s('question');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('question'), 'sine') });
      F.floor(ctx, 840, 3);
      A.tree(ctx, 260, 840, 1.25, t);
      // raf + saksı
      F.shelf(ctx, 520, 720, 640, 5100); A.pot(ctx, 620, 640, 0.9);
      // top → kutu (iş yapma)
      const m = E.se(t, se + 1.5, se + 3.3, 'in');
      const bx = 1560, br = 34;
      const ballX = E.lerp(1180, bx - 70 - br, m);
      const push = E.se(t, se + 3.3, se + 4.4, 'out');
      F.box(ctx, bx + 110 * push, 840, 140, 110, 5110);
      F.ball(ctx, ballX, 840 - br, br, F.KE, 5120, { stripe: true });
      if (m > 0 && m < 1) A.motion(ctx, ballX - 50, 840 - br, 3, 60, 0.5);
      if (push > 0) { F.disp(ctx, [bx, 875], [bx + 110, 875], push); E.inkText(ctx, 'kutu itildi → iş yapıldı', 1640, 690, t, se + 4.2, sq + 0.3, { size: 34, align: 'center', color: '#9A6412' }); }
      DAMLA.draw(ctx, { x: 960, y: 840, s: 1.25, view: t > se + 1 ? 'q3' : 'front', expr: t < sq + 3 ? 'happy' : 'thinking', look: t > se + 1 ? [0.8, 0.2] : [0, 0.1], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t < sh + 3 ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : [[-1, 1.1], [1, 1.4]], prop: t < sh + 3 ? null : 'notebook' });
      ctx.restore();
      const ck = Math.min(E.se(t, se + 0.3, se + 1.0, 'out'), 1 - E.se(t, sq - 0.3, sq + 0.2));
      if (ck > 0) E.layer(ctx, ck, c => { F.card(c, 1080, 200, 1820, 330, { seed: 5130 }); F.txt(c, 'Enerji: iş yapabilme yeteneği', 1450, 285, { size: 50, align: 'center' }); });
      if (t > sq + 0.4) {
        P.bubble(ctx, 1380, 330, 640, 190, [1080, 540], E.se(t, sq + 0.4, sq + 1.1, 'out'), 4);
        ctx.save(); ctx.globalAlpha *= E.se(t, sq + 1.0, sq + 1.6);
        F.txt(ctx, 'hareketinden mi?', 1380, 320, { size: 46, align: 'center', color: '#9A6412' });
        F.txt(ctx, 'konumundan mı?', 1380, 380, { size: 46, align: 'center', color: F.PE });
        ctx.restore();
      }
      F.title(ctx, t, 5, 'Hareket ve Konum: Kinetik ve Potansiyel Enerji');
    }
  });
})();

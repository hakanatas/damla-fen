// SAHNE 2 — Model hücre: insanda 46 kromozom (modelde 4), kromozom çiftleri, bölünme öncesi DNA eşlenmesi
(function () {
  const { PAL, stroke, line } = INK; const K = KIT, F = G8, M = M6;
  const X = 960, Y = 490, R = 320;
  E.scene({
    name: 'Kromozomlar', concept: 'Kromozom çiftleri, DNA eşlenmesi', from: 'model', to: 'copy', trFrom: [960, 500],
    draw(ctx, t) {
      const sm = E.s('model'), sp = E.s('pairs'), sc = E.s('copy');
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const ck = E.se(t, sm + 0.2, sm + 1.0, 'out');
      E.layer(ctx, ck, c => {
        const dk = E.se(t, sc + 1.0, sc + 3.0);
        F.cell(c, X, Y, R, R * 0.93, { nuc: true, nr: R * 0.72, seed: 5710 });
        const draw = (dup, a) => { if (a <= 0) return; E.layer(c, a, c2 => M.full.forEach((ch, i) => F.chromo(c2, X + (i - 1.5) * (dup ? 120 : 100), Y + (ch.L ? 0 : 20), ch.L ? 230 : 150, ch.c, { dup, w: 38, rot: i % 2 ? 0.1 : -0.08 }))); };
        draw(false, 1 - dk); draw(true, dk);
        K.text(c, '(çizim ölçekli değildir)', X, Y + R + 40, { size: 28, align: 'center', alpha: 0.55 });
      });
      // model notu
      const nk = E.se(t, sm + 2.5, sm + 3.3);
      if (nk > 0) { ctx.save(); ctx.globalAlpha *= nk; K.card(ctx, 1380, 200, 420, 200, { seed: 2800 }); K.text(ctx, 'insanda: 46', 1590, 275, { size: 48, align: 'center' }); K.text(ctx, 'modelde: 4', 1590, 345, { size: 48, align: 'center', color: K.LIFE_D }); ctx.restore(); }
      // çiftler
      const pk = E.se(t, sp + 0.5, sp + 1.3) * (1 - E.se(t, sc + 0.3, sc + 1.0));
      if (pk > 0) { ctx.save(); ctx.globalAlpha *= pk;
        [[X - 150, '1. çift'], [X + 50 + 50, '2. çift']].forEach(([cx, lab], i) => { const x0 = i ? X + 50 - 40 : X - 150 - 40, x1 = i ? X + 150 + 40 : X - 50 + 40; P.drawOn(ctx, P.bez([x0, Y + 170], [(x0 + x1) / 2, Y + 200], [x1, Y + 170], 20), 1, { w: 3 }); K.text(ctx, lab, (x0 + x1) / 2, Y + 240, { size: 38, align: 'center' }); void cx; });
        ctx.restore(); }
      const lg = E.se(t, sp + 2.0, sp + 2.8);
      if (lg > 0) { ctx.save(); ctx.globalAlpha *= lg; K.card(ctx, 1380, 460, 420, 180, { seed: 2810 });
        F.chromo(ctx, 1440, 510, 60, F.CH1, { w: 16 }); K.text(ctx, 'babadan gelen', 1480, 522, { size: 38 });
        F.chromo(ctx, 1440, 590, 60, F.CH2, { w: 16 }); K.text(ctx, 'anneden gelen', 1480, 602, { size: 38 }); ctx.restore(); }
      const dk2 = E.se(t, sc + 3.2, sc + 4.0);
      if (dk2 > 0) { ctx.save(); ctx.globalAlpha *= dk2; F.tag(ctx, 'iki özdeş kopya', [1560, 780], [X - 150 + 24, Y - 60], 1, { size: 42, dy: 44 }); ctx.restore(); }
      K.damla(ctx, t, { x: 280, y: 880, s: 1.3, expr: 'curious', look: [0.8, -0.2], talk: E.talk(t), prop: 'lens', arms: [[-1, 0.4], [1, 1.3]] });
    }
  });
})();

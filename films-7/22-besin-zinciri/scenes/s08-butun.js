// SAHNE 8 — Uyumlu bütün: her canlı değerli; nesillerin devamı doğanın dengesi için vazgeçilmez; canlıları koruma (D5.2, D9.3, OB8)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F722;
  E.scene({
    name: 'Uyumlu bütün', concept: 'Doğanın dengesi; koruma', from: 'whole', to: 'protect', trFrom: [960, 700],
    draw(ctx, t) {
      const sw = E.s('whole'), sp = E.s('protect');
      const hill = F.meadow(ctx, t, { sunX: 1700, sunY: 200 });
      const Y = x => P.hillY(hill, x);
      const items = [
        () => { for (let i = 0; i < 4; i++) F.grass(ctx, 300 + i * 60, Y(300 + i * 60) - 40, 1.0, t, i); },
        () => F.hopper(ctx, 560, Y(560) - 40, 0.8, t),
        () => F.frog(ctx, 800, Y(800) - 30, 0.9),
        () => F.snake(ctx, 1060, Y(1060) - 20, 0.9, t),
        () => F.mushroom(ctx, 1290, Y(1290) - 40, 0.9),
        () => F.hawk(ctx, 1250, 330 + Math.sin(t) * 10, 0.9, t),
        () => F.sparrow(ctx, 1520, Y(1520) - 40, 0.9, t)
      ];
      items.forEach((d, i) => { const k = E.se(t, sw + 0.3 + i * 0.25, sw + 0.8 + i * 0.25); if (k > 0) { ctx.save(); ctx.globalAlpha *= k; d(); ctx.restore(); } });
      // bağlar: kesikli halka
      const kr = E.se(t, sw + 2.4, sw + 4.0);
      if (kr > 0) {
        const ring = []; for (let i = 0; i <= 200; i++) { const a = i / 200 * Math.PI * 2 * kr; ring.push([920 + Math.cos(a - 2.6) * 700, 620 + Math.sin(a - 2.6) * 260]); }
        INK.dashed(ctx, ring, { w: 2.6, color: F.GREEN, on: 14, off: 10 });
      }
      F.wfit(ctx, 'Her canlı bu sistem için çok değerli.', 900, 250, E.seg(t, sw + 3.6, sw + 5.0), 52, 1000, { align: 'center', color: F.GREEN });
      const kp = E.se(t, sp + 0.3, sp + 1.0, 'out');
      if (kp > 0) E.layer(ctx, kp, c => {
        F.card(c, 400, 290, 1000, 120, 3100, { tint: F.GREEN, tintA: 0.12 });
        F.wfit(c, 'Nesiller devam etmeli → doğa dengede kalır', 900, 368, E.seg(t, sp + 0.6, sp + 2.0), 44, 920, { align: 'center' });
      });
      F.damla(ctx, t, { x: 1760, y: Y(1760) + 6, s: 1.1, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: t > sp ? [[-1, [-40, -150]], [1, [40, -150]]] : [[-1, 0.4], [1, 0.5]] });
    }
  });
})();

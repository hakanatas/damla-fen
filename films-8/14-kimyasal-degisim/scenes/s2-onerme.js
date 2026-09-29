// SAHNE 2 — Önermeler (a) · gözleme dayalı olan/olmayan önermeleri karşılaştırma (b)
(function () {
  const { PAL, stroke, line } = INK;
  const U = U5;
  E.scene({
    name: 'Önermeler', concept: 'Gözleme dayalı olan ve olmayan önermeler', from: 'claimA', to: 'claimC', trFrom: [700, 500],
    draw(ctx, t) {
      const sa = E.s('claimA'), sb = E.s('claimB'), sc = E.s('claimC');
      // önerme kartları
      const k1 = E.se(t, sa + 0.3, sa + 0.9, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => {
        U.card(c, 140, 200, 1020, 250, { seed: 1501 });
        P.write(c, '1) Eriyen buz yine sudur;', 190, 290, E.seg(t, sa + 1.0, sa + 2.6), { size: 50 });
        P.write(c, 'dondurunca yeniden buz olur.', 230, 370, E.seg(t, sa + 2.6, sa + 4.2), { size: 50 });
      });
      const k2 = E.se(t, sb + 0.2, sb + 0.8, 'out');
      if (k2 > 0) E.layer(ctx, k2, c => {
        U.card(c, 140, 520, 1020, 250, { seed: 1502 });
        P.write(c, '2) Yanan mum yok olur.', 190, 610, E.seg(t, sb + 0.8, sb + 2.2), { size: 50 });
        P.write(c, 'gözlemim: mum yalnızca küçüldü', 230, 690, E.seg(t, sb + 3.0, sb + 4.6), { size: 42, color: PAL.water });
      });
      // sağda küçük gözlemler: buz ⇄ su ; kısalan mum
      const iceM = 0.5 + 0.5 * Math.sin((t - sa) * 1.3);
      if (k1 > 0) { ctx.save(); ctx.globalAlpha *= k1; U.ice(ctx, 1380, 400, 1.4, t > sa + 1 ? iceM * 0.8 : 0); ctx.restore(); U.txt(ctx, 'buz ⇄ su', 1380, 450, { size: 38, align: 'center', alpha: k1 }); }
      if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2; const hh = E.lerp(170, 70, E.se(t, sb + 0.5, sb + 4)); U.candle(ctx, 1380, 760, hh, t, { lit: 1, w: 46 }); ctx.restore(); }
      // damgalar
      const d1 = E.se(t, sc + 0.4, sc + 0.9, 'back'), d2 = E.se(t, sc + 1.6, sc + 2.1, 'back');
      if (d1 > 0) { ctx.save(); ctx.translate(1000, 250); ctx.rotate(-0.08); ctx.scale(d1, d1); stroke(ctx, U.rect(-150, -34, 150, 34), { w: 3.4, closed: true, color: PAL.life }); U.txt(ctx, 'gözleme dayalı', 0, 14, { size: 38, align: 'center', color: PAL.life }); ctx.restore(); }
      if (d2 > 0) { ctx.save(); ctx.translate(1000, 570); ctx.rotate(-0.08); ctx.scale(d2, d2); stroke(ctx, U.rect(-170, -34, 170, 34), { w: 3.4, closed: true, color: U.AMBER }); U.txt(ctx, 'gözleme dayalı değil', 0, 14, { size: 38, align: 'center', color: U.AMBER }); ctx.restore(); }
      const sk = E.se(t, sc + 3.0, sc + 3.6);
      if (sk > 0) P.write(ctx, '→ gözlem verileriyle sına!', 190, 860, sk, { size: 46, color: U.AMBER });
      U.damla(ctx, t, { x: 1720, y: 880, s: 1.05, view: 'q3', flip: true, expr: t > sb + 2.5 && t < sc ? 'thinking' : 'curious', look: [-0.8, 0], arms: [[-1, 1.2], [1, 1.4 + 0.12 * Math.sin(t * 9)]], prop: 'notebook' });
    }
  });
})();

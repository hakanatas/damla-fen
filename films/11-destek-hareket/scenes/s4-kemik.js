// SAHNE 4 — Kemik: nitelikler (sert, destekler, korur) ve çeşitleri (uzun, kısa, yassı) + etiketleme
(function () {
  const { PAL } = INK;
  E.scene({
    name: 'Kemik', concept: 'Kemik ve kemik çeşitleri', from: 'bone', to: 'bonetypes', trFrom: [560, 540],
    draw(ctx, t) {
      const F = F11, sb = E.s('bone'), st = E.s('bonetypes');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const hi = { long: E.se(t, st + 2, st + 2.6), short: E.se(t, st + 4.6, st + 5.2), flat: E.se(t, st + 7, st + 7.6) };
      const A = F.skeleton(ctx, 560, 900, 0.95, { hi });
      INK.label(ctx, '(sade çizim · ölçekli değildir)', 560, 950 - 20, { size: 24, align: 'center', alpha: 0 });
      const a1 = 1 - E.se(t, st - 0.2, st + 0.4);
      if (a1 > 0) E.layer(ctx, a1, c => {
        P.write(c, 'Kemik: sert yapı', 1000, 260, E.seg(t, sb + 0.3, sb + 1.4), { size: 58 });
        P.write(c, 'vücudu destekler', 1000, 340, E.seg(t, sb + 2.2, sb + 3.2), { size: 44, weight: 400 });
        F.tag(c, 'kafatası → beyni korur', 1000, 470, A.skull, E.se(t, sb + 3.6, sb + 4.6), { size: 42, seed: 3 });
        F.tag(c, 'kaburgalar → kalbi ve akciğerleri korur', 1000, 570, A.ribs, E.se(t, sb + 4.8, sb + 5.8), { size: 40, seed: 4 });
      });
      if (t > st) {
        P.write(ctx, 'Şekillerine göre:', 1000, 250, E.seg(t, st + 0.3, st + 1.3), { size: 50 });
        F.tag(ctx, 'uzun kemik', 1000, 380, A.femur, E.se(t, st + 2, st + 2.8), { size: 48, color: '#8A4A10', seed: 5 });
        P.write(ctx, 'uyluk kemiği, kol kemiği', 1000, 430, E.seg(t, st + 2.8, st + 3.8), { size: 34, weight: 400 });
        F.tag(ctx, 'kısa kemik', 1000, 540, A.carpal, E.se(t, st + 4.6, st + 5.4), { size: 48, color: '#8A4A10', seed: 6 });
        P.write(ctx, 'el bileği, ayak bileği kemikleri', 1000, 590, E.seg(t, st + 5.4, st + 6.4), { size: 34, weight: 400 });
        F.tag(ctx, 'yassı kemik', 1000, 700, A.sternum, E.se(t, st + 7, st + 7.8), { size: 48, color: '#8A4A10', seed: 7 });
        P.write(ctx, 'kafatası, göğüs kemiği, kaburgalar', 1000, 750, E.seg(t, st + 7.8, st + 8.8), { size: 34, weight: 400 });
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

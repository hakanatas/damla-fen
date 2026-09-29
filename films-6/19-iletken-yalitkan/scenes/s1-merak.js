// SAHNE 1 — Merak: boşluklu devre, hangi maddeler iletir? (FB.6.6.1 ön değerlendirme: açık uçlu soru)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Merak', concept: 'Hangi maddeler elektriği iletir?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.03 * E.se(t, 0, E.e('q'), 'sine') });
      CK.table(ctx, 820);
      const r = F19.rig(ctx, 1100, 820, 1.1, 0, t, {});
      // boşluk vurgusu
      const kg = E.se(t, sh + 1.5, sh + 2.3);
      if (kg > 0) {
        ctx.save(); ctx.globalAlpha = kg;
        INK.dashed(ctx, circlePts(r.gap[0], r.gap[1], 150, 70, 60), { w: 3, color: CK.AMBD });
        ctx.restore();
        P.write(ctx, 'boşluk', r.gap[0], r.gap[1] + 130, E.seg(t, sh + 2.0, sh + 3.0), { size: 44, align: 'center', color: '#8A4A10' });
      }
      const o = { x: 330, y: 822, s: 1.3, view: 'q3', expr: 'curious', look: [0.8, -0.1], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.5]] };
      if (t > sh) { o.expr = 'happy'; o.arms = [[-1, 0.4], [1, 1.9 + 0.1 * Math.sin(t * 3)]]; }
      if (t > sh + 3) { o.expr = 'curious'; }
      if (t > sq) { o.expr = 'thinking'; o.look = [0.6, -0.8]; o.arms = [[-1, 0.4], [1, [30, -150]]]; }
      DAMLA.draw(ctx, o);
      ctx.restore();
      // düşünce balonu: maddeler
      const kb = E.se(t, sq + 0.2, sq + 0.8, 'out');
      if (kb > 0) {
        P.bubble(ctx, 1060, 270, 900, 300, [480, 760], kb, 5);
        if (kb > 0.6) {
          const ids = ['nail', 'ruler', 'foil', 'wood', 'glass', 'copper'];
          ids.forEach((id, i) => {
            const k = E.se(t, sq + 0.7 + i * 0.25, sq + 1.1 + i * 0.25, 'out'); if (k <= 0) return;
            ctx.save(); ctx.globalAlpha = k; F19.sample(ctx, id, 780 + (i % 3) * 280, 190 + Math.floor(i / 3) * 75, 0.62, (i % 2 ? 0.08 : -0.08)); ctx.restore();
          });
          P.write(ctx, 'Hangisi iletir? Hangisi iletmez?', 1060, 370, E.seg(t, sq + 1.8, sq + 3.2), { size: 46, align: 'center' });
        }
      }
      CK.titleCard(ctx, t, 19, 'İletken mi, Yalıtkan mı?');
    }
  });
})();

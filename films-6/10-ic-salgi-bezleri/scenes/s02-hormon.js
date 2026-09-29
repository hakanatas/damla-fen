// SAHNE 2 — Hormon tanımı: iç salgı bezi → kan → hedef organ
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F10;
  E.scene({
    name: 'Hormon', concept: 'Hormon ve iç salgı bezi tanımı', from: 'hormone', to: 'carry', trFrom: [330, 560],
    draw(ctx, t) {
      const sh = E.s('hormone'), sc = E.s('carry');
      const ck = E.se(t, sh + 0.3, sh + 1.0, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        K.card(c, 300, 175, 1320, 190, { seed: 10100, tint: PAL.light, tintA: 0.1 });
        K.text(c, 'Hormon', 350, 250, { size: 54, color: K.AMBER_D });
        P.write(c, 'İç salgı bezlerinin ürettiği, kanla taşınan kimyasal haberci madde', 350, 325, E.seg(t, sh + 1.0, sh + 3.5), { size: 40 });
      });
      // bez
      const gk = E.se(t, sh + 2.5, sh + 3.2, 'out');
      if (gk > 0) E.layer(ctx, gk, c => { const b = K.blob(320, 580, 90, 70, 10110, 0.07); P.fillPts(c, b, '#F4D9A6'); INK.wash(c, b, PAL.light, 0.6, 10111, { bleed: 1, blooms: 1 }); stroke(c, b, { w: 3, closed: true, color: '#8A5A12' });
        K.text(c, 'iç salgı bezi', 320, 710, { size: 40, align: 'center' }); });
      const vk = E.se(t, sh + 4.0, sh + 4.8);
      const flow = t < sc ? E.se(t, sh + 5.0, sc) : 1;
      if (vk > 0) E.layer(ctx, vk, c => {
        F.vessel(c, 410, 1480, 580, t, { dots: t > sc ? 8 : 0 });
        if (t < sc) for (let j = 0; j < 4; j++) { const u = flow * 0.35 - j * 0.07; if (u > 0) INK.inkDot(c, 410 + u * 1070, 580 + Math.sin(u * 40 * 0.3) * 20, 9, { color: '192,127,30' }); }
        K.text(c, 'kan damarı', 945, 690, { size: 38, align: 'center', alpha: 0.85 });
        P.arrow(c, [340, 470], [430, 550], 1, { w: 2.6, head: 10, bend: -20 }); K.text(c, 'doğrudan kana', 330, 450, { size: 34, align: 'center', color: K.AMBER_D });
      });
      const hk = E.se(t, sc + 0.5, sc + 1.2, 'out');
      if (hk > 0) E.layer(ctx, hk, c => { F.heart(c, 1620, 570, 1.5, Math.max(0, Math.sin(t * (t > sc + 4 ? 9 : 4)))); K.text(c, 'hedef organ', 1620, 710, { size: 40, align: 'center' }); });
      const ek = E.se(t, sc + 3.5, sc + 4.2);
      if (ek > 0) K.text(ctx, 'Her hormon belirli organları etkiler.', 960, 850, { size: 46, align: 'center', color: K.AMBER_D, alpha: ek });
    }
  });
})();

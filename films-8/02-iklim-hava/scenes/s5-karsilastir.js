// SAHNE 5 — Karşılaştırma (Venn şeması): benzerlikleri ve farklılıkları listeler (KB2.7)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F82;
  const LX = 745, RX = 1175, CY = 545, AX = 410, AY = 320;
  E.scene({
    name: 'Karşılaştır', concept: 'Benzerlik · farklılık', from: 'same', to: 'diff', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('same'), sd = E.s('diff');
      const k0 = E.se(t, ss + 0.1, ss + 1.2);
      const L = circlePts(LX, CY, AX, AY, 90), R = circlePts(RX, CY, AX, AY, 90);
      if (k0 > 0) {
        ctx.save(); ctx.globalAlpha *= k0;
        wash(ctx, L, PAL.water, 0.18, 701, { bleed: 2, blooms: 1 }); wash(ctx, R, PAL.light, 0.2, 702, { bleed: 2, blooms: 1 });
        ctx.restore();
        P.drawOn(ctx, L, k0, { w: 3.4, dry: false, seed: 703 }); P.drawOn(ctx, R, k0, { w: 3.4, dry: false, seed: 704 });
        F.lbl(ctx, 'Hava olayları', LX - 120, 205, k0, { size: 50, weight: 700, align: 'center', color: PAL.water });
        F.lbl(ctx, 'İklim', RX + 120, 205, k0, { size: 50, weight: 700, align: 'center', color: F.BROWN });
      }
      // benzerlikler (kesişim)
      F.lbl(ctx, 'ortak', 960, 345, E.se(t, ss + 1.2, ss + 1.8), { size: 34, weight: 700, align: 'center', color: F.AMBER });
      ['atmosferle', 'ilgilidir', '', 'sıcaklık,', 'yağış, rüzgâr', 'ile incelenir'].forEach((l, i) => {
        if (!l) return; const t0 = ss + (i < 2 ? 1.8 : 3.6) + i * 0.3;
        P.write(ctx, l, 960, 400 + i * 52, E.seg(t, t0, t0 + 0.7), { size: 36, align: 'center' });
      });
      // farklılıklar
      ['kısa süreli', 'hızla değişir', 'dar bir alanda', 'meteorolog', 'inceler'].forEach((l, i) => {
        const t0 = sd + 1.2 + i * 0.6;
        P.write(ctx, (i < 4 ? '• ' : '  ') + l, 380, 400 + i * 62, E.seg(t, t0, t0 + 0.7), { size: 40 });
      });
      ['uzun yılların', 'ortalaması', 'geniş alanlarda', 'yavaş değişir', 'iklim bilimci inceler'].forEach((l, i) => {
        const t0 = sd + 4.5 + i * 0.6;
        P.write(ctx, (i === 1 ? '  ' : '• ') + l, 1180, 400 + i * 62, E.seg(t, t0, t0 + 0.7), { size: 38 });
      });
      F.lbl(ctx, 'farklı', 520, 330, E.se(t, sd + 0.6, sd + 1.2), { size: 34, weight: 700, align: 'center', color: F.AMBER });
      F.lbl(ctx, 'farklı', 1400, 330, E.se(t, sd + 0.6, sd + 1.2), { size: 34, weight: 700, align: 'center', color: F.AMBER });
      DAMLA.draw(ctx, { x: 960, y: 905, s: 0.6, view: 'front', expr: t > sd ? 'happy' : 'thinking', look: [0, -0.6], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 5, arms: [[-1, 0.35], [1, 0.35]] });
    }
  });
})();

// SAHNE 3 — Güvenlik (ısıtma) · SAHNE 4 — Buharlaştırma ve ölçme/veri analizi (b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  function scale(ctx, cx, by, txt, k) { // dijital terazi
    const b = [[cx - 150, by - 60], [cx + 150, by - 62], [cx + 160, by], [cx - 160, by + 2], [cx - 150, by - 60]];
    P.fillPts(ctx, b, '#D9CDB4'); stroke(ctx, b, { w: 3, closed: true, seed: 7301 });
    const pan = [[cx - 120, by - 70], [cx + 120, by - 72], [cx + 110, by - 60], [cx - 110, by - 58]]; P.fillPts(ctx, pan, '#8A8378'); stroke(ctx, pan.concat([pan[0]]), { w: 2.4, closed: true, dry: false });
    const d = [[cx - 70, by - 44], [cx + 70, by - 44], [cx + 70, by - 12], [cx - 70, by - 12], [cx - 70, by - 44]]; P.fillPts(ctx, d, '#2E3A2E');
    if (k > 0) { ctx.save(); ctx.globalAlpha *= k; ctx.font = '700 30px Kalam'; ctx.fillStyle = '#B8E07A'; ctx.textAlign = 'center'; ctx.fillText(txt, cx, by - 18); ctx.restore(); }
  }
  E.scene({
    name: 'Güvenlik', concept: 'Isıtma güvenliği', from: 'safety', to: 'safety', trFrom: [400, 700],
    draw(ctx, t) {
      const ss = E.s('safety');
      K.bench(ctx, -40, 1960, 860, 7310);
      K.heater(ctx, 400, 770, 300, 0.7, t);
      K.dish(ctx, 400, 700, 220, 0.8, 0, t);
      K.steam(ctx, 400, 690, 150, 120, 0.6, t, 7311);
      INK.label(ctx, 'SICAK!', 400, 520, { size: 56, weight: 700, align: 'center', color: K.RED, alpha: E.se(t, ss + 0.3, ss + 0.9), rot: -0.06 });
      K.safety(ctx, 760, 170, 1060, [
        'Isıtmayı öğretmen gözetiminde yap.',
        'Koruyucu gözlük tak, saçını topla.',
        'Sıcak kaba dokunma; maşa kullan.',
        'Alkol yanıcıdır; aleve ve ısıtıcıya yaklaştırma.',
        'Laboratuvarda hiçbir şeyin tadına bakma.'
      ], t, ss + 0.2, { step: 1.2, size: 40, hi: 3 });
    }
  });
  E.scene({
    name: 'Buharlaştırma', concept: 'Buharlaştırma; ölçme ve veri analizi', from: 'evap', to: 'measure', trFrom: [500, 650], tr: 0.8,
    draw(ctx, t) {
      const se = E.s('evap'), sm = E.s('measure');
      K.bench(ctx, -40, 1960, 860, 7310);
      const ev = E.se(t, se + 0.8, se + 7.5);
      const heat = 1 - E.se(t, sm - 0.5, sm + 0.5);
      K.heater(ctx, 520, 770, 320, 0.8 * heat, t);
      K.dish(ctx, 520, 700, 240, 0.85 * (1 - ev), E.se(t, se + 3, se + 7.5), t);
      K.steam(ctx, 520, 690, 160, 140, 0.8 * (1 - ev) * heat, t, 7320);
      E.inkText(ctx, 'su buharlaşır ↑', 520, 420, t, se + 1.4, sm, { size: 44, align: 'center', color: PAL.water });
      E.inkText(ctx, 'tuz kalır', 780, 640, t, se + 5.6, 1e9, { size: 44, color: K.AMBER });
      // ölçüm tablosu
      const mk = E.se(t, sm + 0.3, sm + 0.9);
      if (mk > 0) E.layer(ctx, mk, c => {
        scale(c, 1380, 860, t > sm + 5.0 ? '9,9 g' : '10,0 g', 1);
        const card = K.card(c, 1060, 190, 680, 400, { seed: 7330 });
        P.write(c, 'Ölçüm (örnek veri)', 1100, 260, E.seg(t, sm + 0.5, sm + 1.4), { size: 44, color: K.AMBER });
        P.write(c, 'başta konan tuz:  10,0 g', 1100, 350, E.seg(t, sm + 1.4, sm + 2.4), { size: 42 });
        P.write(c, 'kapta kalan tuz:   9,9 g', 1100, 430, E.seg(t, sm + 5.0, sm + 6.0), { size: 42 });
        P.write(c, '≈ aynı → yöntem işe yaradı ✓', 1100, 520, E.seg(t, sm + 6.2, sm + 7.2), { size: 42, color: PAL.water });
      });
    }
  });
})();

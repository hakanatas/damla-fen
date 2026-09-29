// SAHNE 4 — Aile analojisi (D2.4) → iç salgı bezleri uyumlu bir bütündür; sinir sistemiyle birlikte denetler
(function () {
  const { PAL } = INK; const K = KIT, F = F10;
  const FAM = [[280, 'yemek yapar', { hair: 'short', shirt: PAL.water, seed: 1 }, 1.0], [450, 'alışveriş yapar', { hair: 'long', shirt: PAL.life, seed: 2 }, 1.0], [620, 'evi toplar', { hair: 'curly', shirt: PAL.light, seed: 3 }, 0.8], [790, 'çiçekleri sular', { hair: 'bun', shirt: '#B5553F', seed: 4 }, 0.75]];
  E.scene({
    name: 'Aile analojisi', concept: 'Uyumlu bir bütün', from: 'family', to: 'whole', trFrom: [520, 500],
    draw(ctx, t) {
      const sf = E.s('family'), sw = E.s('whole');
      const dim = 1 - 0.75 * E.se(t, sw, sw + 0.7);
      E.layer(ctx, dim, c => {
        F.house(c, 150, 340, 760, 470);
        FAM.forEach(([x, role, o, s], i) => {
          const k = E.se(t, sf + 0.5 + i * 0.5, sf + 1.0 + i * 0.5, 'out'); if (k <= 0) return;
          E.layer(c, k, cc => K.kid(cc, x, 690, 0.62 * s, Object.assign({ expr: 'smile' }, o)));
          K.node(c, role, x, i % 2 ? 450 : 530, E.se(t, sf + 2.5 + i * 0.6, sf + 3.0 + i * 0.6, 'out'), { size: 30, seed: 60 + i });
        });
        const ek = E.se(t, sf + 5.0, sf + 5.8);
        if (ek > 0) K.text(c, 'görevler farklı → ev düzenli', 530, 880, { size: 38, align: 'center', color: K.AMBER_D, alpha: ek });
        const bk = E.se(t, sf + 5.8, sf + 6.6, 'out');
        if (bk > 0) { E.layer(c, bk, cc => F.body(cc, 1450, 540, 0.9, { lit: 1, t })); K.text(c, '=', 1050, 580, { size: 110, align: 'center', alpha: bk }); K.text(c, 'hormonlar farklı → vücut dengede', 1450, 900, { size: 38, align: 'center', color: K.AMBER_D, alpha: E.se(t, sf + 7.2, sf + 8.0) }); }
      });
      const wk = E.se(t, sw + 0.3, sw + 1.0, 'out');
      if (wk > 0) E.layer(ctx, wk, c => {
        K.card(c, 420, 230, 1080, 560, { seed: 10300 });
        K.node(c, 'sinir sistemi', 700, 340, E.se(t, sw + 0.6, sw + 1.1, 'out'), { size: 44, tint: PAL.life, seed: 70 });
        K.node(c, 'iç salgı bezleri', 1220, 340, E.se(t, sw + 1.2, sw + 1.7, 'out'), { size: 44, tint: PAL.light, seed: 71 });
        const k3 = E.se(t, sw + 2.2, sw + 2.8, 'out');
        if (k3 > 0) { P.arrow(c, [700, 390], [900, 500], k3, { w: 3, head: 12 }); P.arrow(c, [1220, 390], [1020, 500], k3, { w: 3, head: 12 }); K.node(c, 'denetleyici ve düzenleyici sistemler', 960, 550, k3, { size: 44, seed: 72 }); }
        const k4 = E.se(t, sw + 4.2, sw + 4.8);
        if (k4 > 0) K.text(c, 'uyumlu bir bütün', 960, 700, { size: 60, align: 'center', color: K.AMBER_D, alpha: k4 });
      });
    }
  });
})();

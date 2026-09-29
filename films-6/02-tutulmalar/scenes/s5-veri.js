// SAHNE 5 — Veri topla, kaydet, karşılaştır: çalışma yaprağı (FB.6.1.3 b · KB2.7 karşılaştırma)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = G62;
  const ROWS = [
    ['Arada kalan', 'Ay', 'Dünya'],
    ['Ay’ın evresi', 'Yeni Ay', 'Dolunay'],
    ['Gölge nereye düşer?', 'Dünya’ya', 'Ay’a'],
    ['Nereden görülür?', 'dar bir bölgeden', 'Ay’ı gören her yerden'],
    ['Nasıl izlenir?', 'onaylı tutulma gözlüğüyle', 'çıplak gözle']
  ];
  const X0 = 190, X1 = 1730, C0 = 580, C1 = 1150, Y0 = 300, RH = 104;

  function mini(ctx, x, y, order) { // G–A–D ya da G–D–A sıralama çizimi
    P.sun(ctx, x - 120, y, 26, 0, { nrays: 10, cells: false, glow: false });
    const e = order === 'solar' ? x + 110 : x, m = order === 'solar' ? x : x + 110;
    P.earth(ctx, e, y, 20); P.moon(ctx, m, y, 10);
    ctx.save(); ctx.globalAlpha = 0.5; line(ctx, [x - 88, y], [x + 150, y], { w: 1.4, dry: false }); ctx.restore();
  }

  E.scene({
    name: 'Çalışma yaprağı', concept: 'Veri toplama, kaydetme, karşılaştırma', from: 'data', to: 'data', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('data');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, X0 - 40, 165, X1 - X0 + 80, 750);
      INK.label(ctx, 'Çalışma yaprağı', X0 + 60, 235, { size: 42, weight: 700, alpha: 0.6 });
      P.write(ctx, 'Güneş tutulması', (C0 + C1) / 2, 260, E.seg(t, sd + 0.3, sd + 1.2), { size: 46, align: 'center', color: '#8A4A10' });
      P.write(ctx, 'Ay tutulması', (C1 + X1) / 2, 260, E.seg(t, sd + 0.8, sd + 1.7), { size: 46, align: 'center', color: PAL.water });
      const mk = E.se(t, sd + 1.0, sd + 2.0);
      if (mk > 0) E.layer(ctx, mk, c => { mini(c, (C0 + C1) / 2 - 10, 310, 'solar'); mini(c, (C1 + X1) / 2 - 10, 310, 'lunar'); });
      ctx.save(); ctx.globalAlpha = 0.5;
      for (let i = 0; i <= ROWS.length; i++) line(ctx, [X0 + 60, Y0 + 50 + RH * i], [X1 - 20, Y0 + 50 + RH * i], { w: i === 0 ? 2.4 : 1.2, dry: false, seed: 20 + i });
      line(ctx, [C0, 220], [C0, Y0 + 50 + RH * ROWS.length], { w: 2, dry: false }); line(ctx, [C1, 220], [C1, Y0 + 50 + RH * ROWS.length], { w: 2, dry: false });
      ctx.restore();
      ROWS.forEach(([h, a, b], i) => {
        const y = Y0 + 50 + RH * (i + 0.5) + 14, at = sd + 2.0 + i * 1.8;
        const hs = F.fitFont(ctx, h, C0 - X0 - 95, 36);
        P.write(ctx, h, X0 + 70, y, E.seg(t, at, at + 0.6), { size: hs, weight: 700 });
        P.write(ctx, a, (C0 + C1) / 2, y, E.seg(t, at + 0.4, at + 1.1), { size: F.fitFont(ctx, a, C1 - C0 - 30, 40), align: 'center' });
        P.write(ctx, b, (C1 + X1) / 2, y, E.seg(t, at + 0.8, at + 1.5), { size: F.fitFont(ctx, b, X1 - C1 - 40, 40), align: 'center' });
      });
      DAMLA.draw(ctx, { x: 1790, y: 1060, s: 0.95, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

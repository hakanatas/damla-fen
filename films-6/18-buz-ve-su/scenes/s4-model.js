// SAHNE 4 — Buz suda yüzer (kanıt) → eski tanecik modeli ile çelişki → model yenilenir (FB.6.5.6 a-b)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F618, RED = F.RED, BR = '#8A4A10';
  function glass(ctx, t, x0, y0, s) {
    const sf = E.s('float');
    const w = 280 * s, h = 360 * s, wy = y0 + h - 250 * s;
    const a = 90 * s;
    const drop = E.se(t, sf + 0.4, sf + 1.4, 'out');
    const bob = Math.sin(t * 2.2) * 2 * s * drop;
    const fl = wy + a * 0.92; // buzun ≈ %92'si suyun içinde
    const by = E.lerp(y0 - 60 * s, fl, drop) + bob;
    F.beaker(ctx, x0, y0, w, h, { layers: [{ h: 250 * s, color: PAL.water }], seed: 6, inside: c => F.ice(c, x0 + w / 2 - 8 * s, by, a, { seed: 2041 }) });
    P.fillPts(ctx, F.rect(x0 + 4, wy, x0 + w - 4, y0 + h - 2), PAL.water, 0.12);
    return { wy, iceTop: by - a, x1: x0 + w };
  }
  E.scene({
    name: 'Model', concept: 'Model önerme ve yenileme', from: 'float', to: 'model2', trFrom: [960, 500],
    draw(ctx, t) {
      const sf = E.s('float'), m1 = E.s('model1'), m2 = E.s('model2');
      F.desk(ctx, 860, 4);
      const mv = E.se(t, m1 - 0.2, m1 + 1.0);
      const gx = E.lerp(760, 150, mv), gy = E.lerp(400, 500, mv), gs = E.lerp(1.3, 0.95, mv);
      const G = glass(ctx, t, gx, gy, gs);
      // yüzme etiketleri
      const kl = Math.min(E.se(t, sf + 2.4, sf + 3.2), 1 - mv);
      if (kl > 0) {
        ctx.save(); ctx.globalAlpha *= kl;
        INK.leader(ctx, [1330, 380], [gx + 190, G.iceTop + 4]); F.txt(ctx, 'küçük kısmı dışarıda', 1340, 390, { size: 40 });
        INK.leader(ctx, [1330, 560], [gx + 190, G.wy + 50]); F.txt(ctx, 'büyük kısmı suyun içinde', 1340, 570, { size: 40 });
        P.write(ctx, 'Buz yüzer!', 960, 300, E.seg(t, sf + 1.6, sf + 2.6), { size: 64, align: 'center', color: '#3E6E88' });
        ctx.restore();
      }
      if (mv > 0.9) P.write(ctx, 'buz yüzer', gx + 130, 460, 1, { size: 40, align: 'center', color: '#3E6E88' });
      // modeller
      const km = E.se(t, m1 + 0.6, m1 + 1.4, 'out');
      if (km > 0) E.layer(ctx, km, c => {
        F.txt(c, 'sıvı su', 780, 250, { size: 44, align: 'center', color: PAL.water });
        F.model(c, 780, 420, 320, 250, 'liquid', t, { seed: 44 });
        const swap = E.se(t, m2 + 0.6, m2 + 1.6);
        F.txt(c, swap < 0.5 ? 'buz · eski model' : 'buz · yeni model', 1240, 250, { size: 44, align: 'center', color: swap < 0.5 ? PAL.ink : '#3E6E88' });
        if (swap < 1) E.layer(c, 1 - swap, cc => F.model(cc, 1240, 420, 320, 250, 'solidOld', t, { seed: 45 }));
        if (swap > 0) E.layer(c, swap, cc => F.model(cc, 1240, 420, 320, 250, 'ice', t, { seed: 46, r: 13 }));
      });
      // eski modelin tahmini
      const kp = Math.min(E.se(t, m1 + 2.6, m1 + 3.4), 1 - E.se(t, m2 - 0.2, m2 + 0.4));
      if (kp > 0) {
        ctx.save(); ctx.globalAlpha *= kp;
        F.txt(ctx, 'daha sıkı → daha yoğun → buz batmalı?', 1010, 620, { size: 42, align: 'center' });
        P.cross(ctx, 1500, 606, 34, E.se(t, m1 + 5.0, m1 + 5.6), { w: 7, color: RED });
        P.write(ctx, 'kanıtla çelişiyor!', 1010, 700, E.seg(t, m1 + 5.4, m1 + 6.4), { size: 44, align: 'center', color: RED });
        ctx.restore();
      }
      // yeni model sonuçları
      P.write(ctx, 'düzenli ama daha boşluklu', 1240, 600, E.seg(t, m2 + 1.8, m2 + 3.0), { size: 40, align: 'center', color: '#3E6E88' });
      P.write(ctx, 'kütle aynı, hacim ↑  →  yoğunluk ↓', 1010, 680, E.seg(t, m2 + 3.4, m2 + 4.8), { size: 44, align: 'center' });
      const ks = E.se(t, m2 + 5.6, m2 + 6.4, 'out');
      if (ks > 0) E.layer(ctx, ks, c => {
        F.card(c, 430, 730, 1590, 830, { seed: 2042, fill: '#FBF3DE' });
        F.txt(c, 'Su özeldir: çoğu maddenin katısı, sıvısından yoğundur.', 1010, 795, { size: 34, align: 'center', color: BR });
      });
      INK.label(ctx, '(tanecik modeli · ölçekli değildir)', 1010, 175 + 0, { size: 28, align: 'center', alpha: 0.55 * km });
      F.damla(ctx, t, { x: 1690, y: 862, s: 1.05, flip: true, expr: t > m2 + 2 ? 'happy' : t > m1 + 5 ? 'surprised' : 'thinking', look: [-0.8, -0.1], seed: 3 });
    }
  });
})();

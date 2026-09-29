// SAHNE 5 — Bitkilerde solunum: yanlış bilgi düzeltilir; bitkiler gece-gündüz solunum yapar, fotosentez yalnızca ışıkta (FB.8.7.3 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  function flow(ctx, t, x, y, dir, kind, k, seed) { // dir: +1 bitkiden dışarı, -1 içeri
    if (k <= 0) return;
    for (let j = 0; j < 3; j++) { const u = ((t * 0.35) + j / 3 + seed * 0.1) % 1; const d = dir > 0 ? u : 1 - u; const px = x + d * 170, py = y - d * 60 + j * 14; ctx.save(); ctx.globalAlpha *= k * Math.min(1, u * 5, (1 - u) * 5); U.gas(ctx, px, py, kind, 24); ctx.restore(); }
  }
  E.scene({
    name: 'Bitkilerde solunum', concept: 'Bitkiler gece de gündüz de solunum yapar', from: 'myth', to: 'night', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('myth'), st = E.s('truth'), sd = E.s('day'), sn = E.s('night');
      // yanlış bilgi kartı
      const km = E.se(t, sm, sm + 0.6) * (1 - E.se(t, st - 0.2, st + 0.5));
      if (km > 0) E.layer(ctx, km, c => {
        U.card(c, 330, 280, 1260, 300, 5501);
        P.write(c, '“Bitkiler gündüz fotosentez,', 960, 390, E.seg(t, sm + 0.4, sm + 1.8), { size: 58, align: 'center' });
        P.write(c, 'gece solunum yapar.”', 960, 470, E.seg(t, sm + 1.6, sm + 2.8), { size: 58, align: 'center' });
        U.stamp(c, 1480, 560, 'YANLIŞ', E.se(t, sm + 3.6, sm + 4.2, 'out'), { color: U.RED, size: 52 });
        U.damla(c, t, { x: 960, y: 900, s: 0.9, expr: 'determined', look: [0, -0.6], arms: [[-1, 0.4], [1, [40, -100]]] });
      });
      const kt = E.se(t, st - 0.1, st + 0.7);
      if (kt <= 0) return;
      E.layer(ctx, kt, c => {
        // gece yarısı
        c.save(); c.fillStyle = 'rgba(40,58,92,0.26)'; c.fillRect(960, 0, 960, E.H); c.restore();
        line(c, [960, 330], [960, 880], { w: 2, dry: false, alpha: 0.5 });
        P.sun(c, 250, 420, 50, t, { nrays: 14, cells: false });
        U.moon(c, 1770, 420, 36);
        INK.label(c, 'gündüz', 480, 470, { size: 46, weight: 700, align: 'center' });
        INK.label(c, 'gece', 1440, 470, { size: 46, weight: 700, align: 'center' });
        // zaman şeritleri
        const b1 = E.se(t, st + 1.2, st + 2.6), b2 = E.se(t, st + 4.0, st + 5.0);
        if (b1 > 0) { const r = [[140, 200], [140 + 1640 * b1, 200], [140 + 1640 * b1, 250], [140, 250]]; U.shape(c, r, U.LIFE, 0.5, 5510, { w: 2 }); U.fit(c, 'solunum: gece ve gündüz', 960, 238, 900, 36, { alpha: E.clamp(b1 * 2 - 1) }); }
        if (b2 > 0) { const r = [[140, 270], [140 + 800 * b2, 270], [140 + 800 * b2, 320], [140, 320]]; U.shape(c, r, U.AMB, 0.5, 5511, { w: 2 }); U.fit(c, 'fotosentez: yalnızca ışıkta', 540, 308, 760, 36, { alpha: E.clamp(b2 * 2 - 1) }); }
        U.potPlant(c, 480, 740, 0.95, t);
        U.potPlant(c, 1440, 740, 0.95, t + 1);
        // gündüz: net O₂ çıkışı, CO₂ girişi
        const kd = E.se(t, sd, sd + 0.6);
        flow(c, t, 560, 600, +1, 'O_2', kd, 1); flow(c, t, 150, 680, +1, 'CO_2', kd * 0.8, 2);
        if (kd > 0) { P.write(c, 'fotosentez > solunum', 480, 910 - 40, E.seg(t, sd + 0.6, sd + 1.8), { size: 42, align: 'center', color: '#8A5A12' }); U.rich(c, 'dışarıya O_2 verir', 720, 390, E.seg(t, sd + 1.6, sd + 2.6), { size: 36, align: 'center', color: '#1F4A63' }); }
        // gece: O₂ girer, CO₂ çıkar
        const kn = E.se(t, sn, sn + 0.6);
        flow(c, t, 1520, 600, +1, 'CO_2', kn, 3); flow(c, t, 1110, 680, +1, 'O_2', kn, 4);
        if (kn > 0) { P.write(c, 'yalnızca solunum', 1440, 910 - 40, E.seg(t, sn + 0.6, sn + 1.8), { size: 42, align: 'center', color: U.LIFE_D }); U.rich(c, 'O_2 alır, CO_2 verir', 1560, 390, E.seg(t, sn + 1.6, sn + 2.6), { size: 34, align: 'center', color: '#4A4640' }); }
      });
    }
  });
})();

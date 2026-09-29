// SAHNE 3 — Dört karışım: şeker-su, tuz-su, kum-su, zeytinyağı-su (sınıfta karışım oluşturma; a: görünümleri farklıdır)
(function () {
  const { PAL, line, stroke } = INK;
  const K = K7;
  const B = [[360, 'şeker + su'], [760, 'tuz + su'], [1160, 'kum + su'], [1560, 'zeytinyağı + su']];
  window.F18.four = (ctx, t, st, o = {}) => { // st: {mix:0..1, settle:0..1}; o.only: gösterilecek indeksler, o.pos: özel konumlar, o.s ölçek
    const idx = o.only ?? [0, 1, 2, 3];
    idx.forEach(i => {
      const [x0, lab] = B[i]; const x = o.pos ? o.pos[i][0] : x0, by = o.pos ? o.pos[i][1] : 840, s = o.s ?? 1;
      const m = st.mix, d = st.settle;
      const opt = { level: 0.62, t, seed: 30 + i, stir: 0 };
      if (i === 0 || i === 1) { opt.grains = (1 - d) * m; }
      if (i === 2) { opt.cloud = m * (1 - d); opt.sand = m * d * 0.8 + 0.001; }
      if (i === 3) { opt.oil = m * (0.28 * d); opt.cloud = 0; }
      ctx.save(); ctx.translate(x, by); ctx.scale(s, s); ctx.translate(-x, -by);
      K.beaker(ctx, x, by, 230, 270, opt);
      if (i === 3 && m > 0 && d < 1) { const r = INK.rng(5500); for (let j = 0; j < 14; j++) { const yy = E.lerp(by - 40 - r() * 140, by - 170 - r() * 20, d); ctx.save(); ctx.fillStyle = 'rgba(214,176,52,0.75)'; ctx.beginPath(); ctx.ellipse(x - 80 + r() * 160, yy, 12, 7, 0, 0, 7); ctx.fill(); ctx.restore(); } }
      ctx.restore();
      if (o.labels !== false) INK.label(ctx, lab, x, by - 300 * s, { size: 40 * Math.max(0.85, s), weight: 700, align: 'center' });
    });
  };
  E.scene({
    name: 'Dört karışım', concept: 'Karışımların görünümü farklıdır', from: 'make', to: 'observe', trFrom: [960, 700],
    draw(ctx, t) {
      const sm = E.s('make'), so = E.s('observe');
      K.bench(ctx, -40, 1960, 840, 5501);
      const vis = [0, 1, 2, 3].filter(i => t > sm + 0.6 + i * 1.3);
      const mix = E.se(t, sm + 1.0, sm + 6.5), settle = E.se(t, so + 0.3, so + 5.0);
      vis.forEach(i => { const k = E.se(t, sm + 0.6 + i * 1.3, sm + 1.2 + i * 1.3, 'out'); E.layer(ctx, k, c => F18.four(c, t, { mix: E.seg(t, sm + 1.0 + i * 1.3, sm + 2.4 + i * 1.3), settle }, { only: [i] })); });
      // gözlem notları
      [['kayboldu', 360, 0.2, PAL.water], ['kayboldu', 760, 0.9, PAL.water], ['dibe çöktü', 1160, 2.6, K.AMBER], ['üstte katman', 1560, 3.8, K.AMBER]].forEach(([n, x, d, col]) =>
        E.inkText(ctx, n, x, 470, t, so + d + 0.6, 1e9, { size: 42, align: 'center', color: col }));
    }
  });
})();

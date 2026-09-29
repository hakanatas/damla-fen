// SAHNE 8 — Güvenlik · üç düzenek (temas yüzeyi, karıştırma, sıcaklık): tek değişken değişir, diğerleri aynı (ç, d) · neden-sonuç (b)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  // her deney: [sol etiketi, sağ etiketi, hızlı olan taraf (1=sağ), sol opt, sağ opt]
  const EXP = [
    { id: 'exp1', L: 'küp şeker', R: 'toz şeker', fast: 1, same: 'aynı su · aynı sıcaklık · karıştırma yok' },
    { id: 'exp2', L: 'karıştırılmıyor', R: 'karıştırılıyor', fast: 1, same: 'aynı su · aynı şeker · aynı sıcaklık' },
    { id: 'exp3', L: 'soğuk su', R: 'ılık su', fast: 1, same: 'aynı su miktarı · aynı şeker · karıştırma yok' }
  ];
  function expPart(ctx, t, i) {
    const X = EXP[i], s0 = E.s(X.id), dur = E.e(X.id) - s0;
    const slow = E.se(t, s0 + 1.5, s0 + dur + 3), fast = E.se(t, s0 + 1.5, s0 + dur * 0.62);
    K.bench(ctx, -40, 1960, 840, 6200);
    [[560, X.L, slow], [1360, X.R, fast]].forEach(([x, lab, d], side) => {
      const o = { level: 0.6, t, seed: 80 + side };
      if (i === 0) { if (side === 0) o.cubes = 1 - d; else o.grains = 1 - d; }
      else o.grains = 1 - d;
      if (i === 1 && side === 1) o.spoon = 1, o.stir = 0.6;
      if (i === 2 && side === 1) o.steam = 0.5, o.tint = ['#E8C4A0', 0.12];
      if (i === 2 && side === 0) o.tint = ['#8FB8D0', 0.15];
      K.beaker(ctx, x, 840, 260, 300, o);
      INK.label(ctx, lab, x, 500, { size: 48, weight: 700, align: 'center' });
      const tDone = side ? dur * 0.62 - 1.5 : dur + 1.5; K.watch(ctx, x + 230, 640, 1, E.clamp(t - s0 - 1.5, 0, tDone) / 12);
      if (d >= 0.999) INK.label(ctx, 'çözündü ✓', x + 230, 540, { size: 40, weight: 700, align: 'center', color: PAL.water });
    });
    INK.label(ctx, 'VS', 960, 700, { size: 50, weight: 700, align: 'center', alpha: 0.5 });
    P.write(ctx, X.same, 960, 410, E.seg(t, s0 + 0.8, s0 + 2.0), { size: 36, align: 'center', color: PAL.water });
    INK.label(ctx, 'örnek gözlem', 1760, 880, { size: 28, align: 'right', alpha: 0.5 });
  }
  function whyPart(ctx, t) {
    const sw = E.s('why');
    [[520, 'soğuk su', 0.6], [1400, 'sıcak su', 2.4]].forEach(([cx, lab, sp], j) => {
      const cy = 520, R = 240;
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip(); ctx.fillStyle = j ? '#F1E4DA' : '#E4EEF2'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
      const r = rng(6300 + j);
      for (let i = 0; i < 40; i++) { const ph = r() * 6.28, ax = 30 + r() * 40; const x = cx - R + r() * 2 * R + Math.sin(t * sp * 2 + ph) * ax * sp * 0.4, y = cy - R + r() * 2 * R + Math.cos(t * sp * 1.7 + ph) * ax * sp * 0.4; ctx.fillStyle = 'rgba(46,106,140,0.55)'; ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fill(); if (j) { stroke(ctx, [[x - 26, y], [x - 12, y]], { w: 2, dry: false, alpha: 0.4 }); } }
      const cube = [[cx - 50, cy - 50], [cx + 50, cy - 50], [cx + 50, cy + 50], [cx - 50, cy + 50], [cx - 50, cy - 50]]; P.fillPts(ctx, cube, '#FFFDF6'); stroke(ctx, cube, { w: 2.4, closed: true, dry: false });
      ctx.restore(); stroke(ctx, circlePts(cx, cy, R, R, 60), { w: 5, closed: true, seed: 6310 + j });
      INK.label(ctx, lab, cx, 230, { size: 46, weight: 700, align: 'center', color: j ? K.HEAT : PAL.water });
    });
    P.write(ctx, 'karıştırma → çözünen tanecikler çabuk dağılır', 960, 885, E.seg(t, sw + 5.0, sw + 6.4), { size: 38, align: 'center', color: K.AMBER });
    P.write(ctx, 'sıcaklık artar → tanecikler daha hızlı → şekere daha sık çarpar', 960, 822, E.seg(t, sw + 1.4, sw + 3.0), { size: 44, align: 'center', color: K.AMBER });
    E.inkText(ctx, '(model, ölçekli değildir)', 960, 520, t, sw + 0.8, 1e9, { size: 28, align: 'center', alpha: 0.55, weight: 400 });
  }
  E.scene({
    name: 'Güvenlik', concept: 'Sıcak su: yetişkin eşliğinde', from: 'safety', to: 'safety', trFrom: [1300, 500],
    draw(ctx, t) {
      const ss = E.s('safety');
      K.bench(ctx, -40, 1960, 860, 6200);
      K.beaker(ctx, 480, 860, 220, 260, { level: 0.6, t, seed: 90, steam: 0.9, tint: ['#E8C4A0', 0.12] });
      INK.label(ctx, 'SICAK!', 480, 480, { size: 56, weight: 700, align: 'center', color: K.RED, alpha: E.se(t, ss + 0.3, ss + 0.9), rot: -0.06 });
      K.safety(ctx, 880, 200, 900, ['Sıcak suyu bir yetişkin hazırlar.', 'Kaynar su kullanma; ılık su yeter.', 'Sıcak kabı çıplak elle tutma.', 'Laboratuvarda tadına bakma.'], t, ss + 0.2, { step: 1.0 });
    }
  });
  EXP.forEach((X, i) => E.scene({
    name: 'Deney ' + (i + 1), concept: ['Temas yüzeyi (tanecik boyutu)', 'Karıştırma', 'Suyun sıcaklığı'][i], from: X.id, to: X.id, tr: i ? 0.6 : 1.1, trFrom: [960, 600],
    draw(ctx, t) { expPart(ctx, t, i); }
  }));
  E.scene({
    name: 'Neden?', concept: 'Neden-sonuç: tanecik hareketi', from: 'why', to: 'why', trFrom: [960, 520],
    draw(ctx, t) { whyPart(ctx, t); }
  });
})();

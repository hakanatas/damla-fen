// SAHNE 7 — Karşılaştırma: benzerlikler (Venn) ve farklılıklar (tablo) listelenir; kavram karikatürüne dönüş (karar)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F17;
  function venn(ctx, t) {
    const s0 = E.s('similar');
    const k = E.se(t, s0 + 0.2, s0 + 1.2);
    [[760, F.HEAT, 'ISI', 520], [1160, PAL.water, 'SICAKLIK', 1400]].forEach(([x, col, nm, lx], i) => {
      const c = circlePts(x, 560, 340 * P.pop(k), 320 * P.pop(k), 80);
      INK.wash(ctx, c, col, 0.16, 800 + i, { bleed: 2, blooms: 1 }); stroke(ctx, c, { w: 3.4, closed: true, color: col, seed: 802 + i });
      INK.label(ctx, nm, lx, 250, { size: 62, weight: 700, align: 'center', color: col, alpha: k });
    });
    const L = [['enerji çeşidi', 'hesaplanır', 'J · cal'], ['ne kadar sıcak?', 'termometre', '°C']];
    L.forEach((arr, i) => arr.forEach((txt, j) => INK.label(ctx, txt, i ? 1320 : 600, 470 + j * 90, { size: 42, weight: 700, align: 'center', alpha: E.se(t, s0 + 1.0 + j * 0.3, s0 + 1.6 + j * 0.3) })));
    INK.label(ctx, 'ortak', 960, 360, { size: 36, align: 'center', alpha: 0.7 * E.se(t, s0 + 2, s0 + 2.6) });
    const C1 = ['tanecik', 'hareketiyle', 'ilgili'], C2 = ['ısı alınca', 'sıcaklık', 'genellikle', 'artar'];
    C1.forEach((txt, j) => P.write(ctx, txt, 960, 430 + j * 42, E.seg(t, s0 + 2.4 + j * 0.3, s0 + 3.2 + j * 0.3), { size: 36, align: 'center', color: PAL.ink }));
    C2.forEach((txt, j) => P.write(ctx, txt, 960, 600 + j * 42, E.seg(t, s0 + 4.6 + j * 0.3, s0 + 5.4 + j * 0.3), { size: 36, align: 'center', color: PAL.ink }));
  }
  function table(ctx, t) {
    const s0 = E.s('diff');
    ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 150, 1620, 740);
    const x0 = 250, c1 = 690, c2 = 1215, x3 = 1720, y0 = 200, hh = 90, rh = 120;
    const ROWS = [
      ['Nedir?', ['bir enerji çeşidi;', 'sıcaktan soğuğa aktarılır'], ['ne kadar sıcak ya da soğuk;', 'tanecik hareketiyle ilgili']],
      ['Nasıl bulunur?', ['kalorimetre kabı', 'yardımıyla hesaplanır'], ['termometreyle', 'ölçülür']],
      ['Birimi', ['joule (J)', 'kalori (cal)'], ['derece Celsius', '(°C)']],
      ['Madde miktarına', ['evet', '(aktarılan ısı)'], ['hayır', ''], 'bağlı mı?']
    ];
    const yEnd = y0 + hh + ROWS.length * rh, gk = E.se(t, s0 + 0.1, s0 + 0.8);
    ctx.save(); ctx.globalAlpha = gk;
    [y0, y0 + hh].concat(ROWS.map((_, i) => y0 + hh + (i + 1) * rh)).forEach((y, i) => line(ctx, [x0, y], [x3, y], { w: i < 2 ? 3 : 1.8, dry: false, seed: 820 + i }));
    [x0, c1, c2, x3].forEach((x, i) => line(ctx, [x, y0], [x, yEnd], { w: i === 1 ? 3 : 1.8, dry: false, seed: 830 + i }));
    INK.label(ctx, 'ISI', (c1 + c2) / 2, y0 + 64, { size: 54, weight: 700, align: 'center', color: F.HEAT });
    INK.label(ctx, 'SICAKLIK', (c2 + x3) / 2, y0 + 64, { size: 54, weight: 700, align: 'center', color: PAL.water });
    INK.label(ctx, 'Farklılıklar', (x0 + c1) / 2, y0 + 62, { size: 44, weight: 700, align: 'center', alpha: 0.75 });
    ctx.restore();
    ROWS.forEach(([f, a, b, f2], r) => {
      const at = s0 + 1.0 + r * 2.8, y = y0 + hh + r * rh;
      P.write(ctx, f, x0 + 24, y + (f2 ? 52 : 72), E.seg(t, at, at + 0.6), { size: 40 });
      if (f2) P.write(ctx, f2, x0 + 24, y + 98, E.seg(t, at + 0.2, at + 0.8), { size: 40 });
      [[a, c1, F.HEAT], [b, c2, PAL.water]].forEach(([L, cx, col], j) => L.forEach((txt, q) => { if (txt) P.write(ctx, txt, cx + 26, y + 52 + q * 44, E.seg(t, at + 0.5 + j * 0.9 + q * 0.3, at + 1.4 + j * 0.9 + q * 0.3), { size: 36, color: q === 0 ? PAL.ink : PAL.ink }); }));
    });
  }
  function verdict(ctx, t) {
    const s0 = E.s('verdict');
    ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
    F.cartoon(ctx, t, s0 - 30, { marks: [E.se(t, s0 + 1.6, s0 + 2.2), E.se(t, s0 + 2.0, s0 + 2.6), E.se(t, s0 + 0.6, s0 + 1.4)] });
    const k = E.se(t, s0 + 2.8, s0 + 3.5, 'out');
    if (k > 0) { ctx.save(); ctx.translate(960, 490); ctx.scale(P.pop(k), P.pop(k)); ctx.rotate(-0.03); F.card(ctx, 0, 0, 860, 100, { seed: 850, fill: '#F6E7B8' }); INK.label(ctx, 'Isı ≠ sıcaklık', 0, 18, { size: 60, weight: 700, align: 'center' }); ctx.restore(); }
  }
  E.scene({
    name: 'Karşılaştır', concept: 'Benzerlikler ve farklılıklar', from: 'similar', to: 'diff', trFrom: [960, 560],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
      const a = E.se(t, E.s('diff') - 0.4, E.s('diff') + 0.3);
      if (a < 1) E.layer(ctx, 1 - a, c => venn(c, t));
      if (a > 0) E.layer(ctx, a, c => table(c, t));
    }
  });
  E.scene({ name: 'Karar', concept: 'Kavram karikatürüne dönüş: Can haklı', from: 'verdict', to: 'verdict', trFrom: [1520, 330], draw(ctx, t) { verdict(ctx, t); } });
})();

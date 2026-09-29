// SAHNE 8 — Kaydet: kütle-hacim-yoğunluk tablosu (OB7) + genellemeler; SAHNE 9 — Sıra sende · Sıradaki · Bitiş
(function () {
  const { PAL, stroke, line } = INK;
  const F = F617, BR = '#8A4A10';
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Yoğunluk', 290, 250, E.seg(t, sr + 0.2, sr + 1.2), { size: 58 });
    const rows = [
      ['madde', 'kütle (g)', 'hacim (cm³)', 'yoğunluk (g/cm³)'],
      ['taş', '54', '20', '2,7'],
      ['demir', '79', '10', '7,9'],
      ['tahta', '30', '60', '0,5'],
      ['su', '100', '100', '1'],
      ['zeytinyağı', '92', '100', '0,92']
    ];
    F.table(ctx, 290, 290, [260, 250, 290, 380], rows, 66, i => E.seg(t, sr + 0.8 + i * 0.7, sr + 1.6 + i * 0.7), { size: 38, colColor: [null, null, null, PAL.water] });
    const g = [
      ['yoğunluk = kütle ÷ hacim', 290, 755, sr + 5.0, BR],
      ['aynı madde → aynı yoğunluk', 290, 815, sr + 5.8, PAL.ink],
      ['farklı madde → farklı yoğunluk', 950, 755, sr + 6.6, PAL.ink],
      ['sudan az yoğun → yüzer', 950, 815, sr + 7.4, PAL.ink]
    ];
    g.forEach(([s, x, y, a, col]) => P.write(ctx, '• ' + s, x, y, E.seg(t, a, a + 0.9), { size: 40, color: col }));
    F.damla(ctx, t, { x: 1640, y: 1000, s: 0.95, flip: true, expr: t > sr + 7 ? 'happy' : 'neutral', look: [-0.7, 0.3], prop: t > sr + 7 ? null : 'notebook', arms: t > sr + 7 ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], seed: 6 });
  }
  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next');
    F.desk(ctx, 860, 9);
    // Sıra sende kartı
    const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (k > 0) E.layer(ctx, k, c => {
      F.card(c, 300, 180, 1620, 780, { seed: 1891 });
      P.write(c, 'Sıra sende!', 380, 290, E.seg(t, sk + 0.3, sk + 1.2), { size: 72, color: BR });
      const L = ['1. Suda çözünmeyen üç cisim seç.', '2. Kütlesini terazide, hacmini silindirde ölç.', '3. Yoğunluğunu hesapla, tablona yaz.', '4. Suda nasıl konumlanacağını tahmin et, dene.'];
      L.forEach((s, i) => P.write(c, s, 400, 400 + i * 80, E.seg(t, sk + 1.2 + i * 1.3, sk + 2.4 + i * 1.3), { size: 46 }));
      INK.label(c, 'Malzemeleri toplayıp ortamı temiz bırak.', 400, 730, { size: 34, alpha: 0.7 * E.se(t, sk + 6.8, sk + 7.6) });
      F.stone(c, 1430, 700, 0.9, 11); F.cube(c, 1530, 702, 60, 'wood', { seed: 1892 });
    });
    // Sıradaki
    const kn = Math.min(E.se(t, sn + 0.2, sn + 1.0, 'out'), 1 - E.se(t, E.s('end'), E.s('end') + 0.8));
    if (kn > 0) E.layer(ctx, kn, c => {
      INK.label(c, 'Sıradaki gözlem:', 960, 250, { size: 48, align: 'center', alpha: 0.8 });
      INK.label(c, 'Buz Neden Yüzer?', 960, 340, { size: 76, weight: 700, align: 'center' });
      F.beaker(c, 860, 470, 200, 300, { layers: [{ h: 220, color: PAL.water }], seed: 9 });
      // buz küpü: ≈ %92'si suyun içinde
      const a = 80, top = 770 - 220 - 2; const by = top + a * 0.92 + Math.sin(t * 2) * 1.5;
      const ice = [[960 - a / 2, by], [960 + a / 2, by], [960 + a / 2, by - a], [960 - a / 2, by - a], [960 - a / 2, by]];
      P.fillPts(c, ice, '#E4F0F6', 0.9); INK.wash(c, ice, PAL.water, 0.25, 1893, { bleed: 1, blooms: 0 }); stroke(c, ice, { w: 2.6, closed: true, dry: false });
      F.damla(c, t, { x: 1340, y: 862, s: 1.1, flip: true, expr: 'curious', look: [-0.8, 0], seed: 7, arms: [[-1, 0.35], [1, 1.9]] });
    });
    F.endCard(ctx, t, '17 · Aynı Hacim, Farklı Kütle: Yoğunluk', 'FB.6.5.3 · FB.6.5.4');
  }
  E.scene({ name: 'Kaydet', concept: 'Verileri kaydetme; genelleme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 480], draw(ctx, t) { outro(ctx, t); } });
})();

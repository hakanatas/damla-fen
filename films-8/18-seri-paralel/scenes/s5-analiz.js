// SAHNE 7 — Veri tablosu ve analiz · evdeki lambalar paralel · paralel devre pili daha çabuk tüketir
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U6;
  const cell = (b, word) => (c, x, y, k) => { U.bright(c, x - 150, y, b, k); P.write(c, word, x - 115, y + 13, k, { size: 34, weight: 400 }); };
  const ROWS = [
    ['Devre', 'Her ampulün parlaklığı', 'Biri sökülünce'],
    ['tek ampul', cell(1, 'ölçüt'), '—'],
    ['2 ampul · seri', cell(0.4, 'sönük'), 'hepsi söner'],
    ['3 ampul · seri', cell(0.18, 'daha sönük'), 'hepsi söner'],
    ['2 ampul · paralel', cell(1, 'tek ampul kadar'), 'diğeri yanar'],
    ['3 ampul · paralel', cell(1, 'tek ampul kadar'), 'diğerleri yanar']
  ];
  // pil göstergesi (dolu oranı f)
  const cellIcon = (ctx, x, y, f, lbl) => {
    const body = CK.rect(x - 50, y - 110, 100, 220); P.fillPts(ctx, body, PAL.white, 0.9);
    const lv = CK.rect(x - 42, y + 102 - 204 * f, 84, 204 * f); if (f > 0) P.fillPts(ctx, lv, f > 0.3 ? PAL.life : PAL.light, 0.75);
    stroke(ctx, CK.densify(CK.densify(body)), { w: 3.2, closed: true, seed: 1850 });
    P.fillPts(ctx, CK.rect(x - 18, y - 126, 36, 16), PAL.ink, 0.85);
    U.txt(ctx, lbl, x, y + 170, { size: 38, align: 'center' });
  };
  E.scene({
    name: 'Veri analizi', concept: 'Verileri toplama ve analiz etme', from: 'data', to: 'drain', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('data'), sr = E.s('rs'), sp = E.s('rp'), sh = E.s('home'), sdr = E.s('drain');
      const tabA = 1 - E.se(t, sh - 0.2, sh + 0.5);
      if (tabA > 0) E.layer(ctx, tabA, c => {
        const hl = []; if (t > sr + 0.3) hl.push([2, PAL.light], [3, PAL.light]); if (t > sp + 0.3) hl.push([4, PAL.water], [5, PAL.water]);
        U.grid(c, 250, 170, [420, 560, 440], 82, ROWS, r => E.seg(t, sd + 0.6 + r * 0.9, sd + 1.6 + r * 0.9), { hl, hs: 38, fs: 38 });
        P.write(c, 'SERİ: tek yol → ampul arttıkça sönükleşir; biri sökülünce hepsi söner.', 960, 760, E.seg(t, sr + 0.5, sr + 3), { size: 40, align: 'center', color: U.AMBER });
        P.write(c, 'PARALEL: ayrı kollar → parlaklık aynı; biri sökülünce diğerleri yanar.', 960, 840, E.seg(t, sp + 0.5, sp + 3), { size: 40, align: 'center', color: PAL.water });
      });
      // evdeki lambalar (avize + paralel şema)
      const hA = Math.min(E.se(t, sh, sh + 0.7), 1 - E.se(t, sdr - 0.2, sdr + 0.5));
      if (hA > 0) E.layer(ctx, hA, c => {
        F18.avize(c, 560, 210, 1.1, [1, 0, 1], t, { crack: 1 });
        CK.card(c, 1000, 220, 760, 560, { seed: 1860 });
        U.schParallel(c, 1130, 330, 520, 300, 3, { gapAt: 1, lit: 0.9, bg: '#FAF6EC', cells: 1 });
        U.txt(c, 'evdeki lambalar paralel bağlı', 1380, 720, { size: 42, align: 'center', color: PAL.water });
        CK.card(c, 320, 640, 480, 110, { seed: 1861, color: CK.RED });
        U.txt(c, 'ev elektriği: yalnızca gözlem!', 560, 710, { size: 30, align: 'center', color: CK.RED });
      });
      // pil tükenmesi karşılaştırması
      const dA = E.se(t, sdr, sdr + 0.7);
      if (dA > 0) E.layer(ctx, dA, c => {
        const k = E.se(t, sdr + 1.2, sdr + 6.5, 'sine');
        cellIcon(c, 620, 470, 1 - 0.25 * k, '2 ampul · seri');
        cellIcon(c, 1300, 470, 1 - 0.75 * k, '2 ampul · paralel');
        U.txt(c, 'aynı sürede', 960, 480, { size: 36, align: 'center', alpha: 0.7 });
        P.write(c, 'paralel devrede pil daha çabuk biter', 960, 820, E.seg(t, sdr + 3, sdr + 4.6), { size: 46, align: 'center', color: U.AMBER });
      });
      U.damla(ctx, t, { x: 1790, y: 960, s: 0.75, view: 'q3', flip: true, expr: t > sh && t < sdr ? 'happy' : 'thinking', look: [-0.8, -0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

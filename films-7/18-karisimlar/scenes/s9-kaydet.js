// SAHNE 9 — Önermeler (d) · Sıra sende (anlam çözümleme tablosu) · Sıradaki: 19 Karışımları Ayırma · Bitiş
(function () {
  const { PAL, line, stroke } = INK;
  const K = K7;
  const ITEMS = [
    ['Homojen: her yeri aynı (şeker-su, tuz-su) → çözelti', PAL.ink],
    ['Heterojen: her yeri aynı değil (kum-su, zeytinyağı-su)', PAL.ink],
    ['Tanecik boyutu küçülürse çözünme hızlanır.', PAL.ink],
    ['Karıştırırsam çözünme hızlanır.', PAL.ink],
    ['Su sıcaklığı artarsa çözünme hızlanır.', PAL.ink],
    ['Kontrol edilen değişkenleri aynı tut!', PAL.water]
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Karışımlar', 290, 205, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 227], [640, 239], [1000, 223], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach(([txt, col], i) => {
      const at = sr + 2.4 + i * 1.35, y = 318 + i * 98;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.8, at + 1.2), { w: 6 });
      P.write(ctx, txt, 385, y, E.seg(t, at, at + 1.0), { size: 46, color: col });
    });
    F18.damla(ctx, t, { x: 1660, y: 1000, s: 1.0, view: 'q3', flip: true, look: [-0.7, 0.3], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
  }
  function nextPart(ctx, t) {
    const sn = E.s('next');
    K.bench(ctx, -40, 1960, 860, 6501);
    K.beaker(ctx, 1200, 860, 220, 260, { level: 0.62, t, seed: 95, sand: 0.4 });
    K.funnel(ctx, 1560, 470, 0.9, { residue: 0.5 });
    K.beaker(ctx, 1560, 860, 180, 200, { level: 0.35, t, seed: 96 });
    INK.label(ctx, '?', 1380, 560, { size: 110, weight: 700, align: 'center', color: K.AMBER, alpha: E.se(t, sn + 1.8, sn + 2.4) });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, '19 · Karışımları Ayırma', 960, 320, t, sn + 1.0, 1e9, { size: 76, align: 'center' });
    F18.damla(ctx, t, { x: 520, y: 860, s: 1.35, expr: 'happy', look: [0.8, -0.2], arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
  }
  E.scene({
    name: 'Önermeler', concept: 'Önermeleri kaydetme', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sy = E.s('yourturn');
      page(ctx, t);
      K.task(ctx, t, sy, E.e('yourturn'), 'Sıra sende!', [
        'Evde ve okulda gördüğün karışımları listele:',
        'katı-sıvı, sıvı-gaz, sıvı-sıvı, katı-katı, katı-gaz, gaz-gaz.',
        'Bir tablo çiz; her birini homojen ya da heterojen',
        'diye etiketle ve nedenini yaz.'
      ], { x: 220, y: 260, w: 1480, h: 520, size: 46, lh: 80, step: 1.0 });
    }
  });
  E.scene({
    name: 'Sıradaki: Ayırma', concept: 'Sonraki konu', from: 'next', to: 'end', trFrom: [1300, 700],
    draw(ctx, t) { nextPart(ctx, t); K.end(ctx, t, '18 · Karışımlar ve Çözünme Hızı', 'FB.7.5.8 · FB.7.5.9'); }
  });
})();

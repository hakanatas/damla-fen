// SAHNE 8 — Kaydet: operasyonel tanım; "Sıra sende" görevi; sonraki film; bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  const ITEMS = [
    'Kuvvet, itme ya da çekmedir.',
    'Her kuvvetin büyüklüğü ve yönü vardır.',
    'Dinamometrenin yayı esnektir.',
    'Kuvvete uygun kalınlıkta yay seçilir.'
  ];
  function page(ctx, t) {
    const sr = E.s('record'), stk = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Kuvvet', 290, 170, E.seg(t, sr + 0.3, sr + 1.5), { size: 64 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 192], [640, 204], [1000, 188], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    // definition box
    const dk = E.se(t, sr + 1.0, sr + 1.8, 'out');
    if (dk > 0) {
      ctx.save(); ctx.globalAlpha = dk;
      const b = [[290, 230], [1640, 226], [1644, 420], [294, 424], [290, 230]];
      P.fillPts(ctx, b, '#F6E7B8', 0.9); stroke(ctx, b, { w: 3, closed: true, seed: 2601 });
      P.write(ctx, 'Kuvvet, dinamometreyle ölçülen ve', 330, 305, E.seg(t, sr + 1.6, sr + 3.4), { size: 54 });
      P.write(ctx, 'birimi Newton (N) olan bir büyüklüktür.', 330, 385, E.seg(t, sr + 3.2, sr + 5.2), { size: 54 });
      ctx.restore();
    }
    ITEMS.forEach((txt, i) => {
      const at = sr + 5.4 + i * 1.1, y = 510 + i * 90;
      const box = [[300, y - 42], [348, y - 44], [350, y + 4], [302, y + 6], [300, y - 42]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 2610 + i });
      P.check(ctx, 324, y - 20, 44, E.se(t, at + 0.8, at + 1.2), { w: 6 });
      P.write(ctx, txt, 380, y, E.seg(t, at, at + 1.0), { size: 46 });
    });
    // mini dynamometer sketch on the page
    if (t > sr + 0.5) { ctx.save(); ctx.globalAlpha = E.se(t, sr + 0.5, sr + 1.5); ctx.translate(1500, 470); ctx.scale(0.62, 0.62); ctx.translate(-1500, -470); F05.dyn(ctx, 1500, 470, { L: 380, W: 90, max: 10, F: 3 + 2 * Math.sin(t * 1.2) }); ctx.restore(); }
    DAMLA.draw(ctx, { x: 1690, y: 1050, s: 1.1, view: 'q3', flip: true, expr: t > stk ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: t > stk ? [[-1, 0.4], [1, 2.4 + 0.2 * Math.sin(t * 6)]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > stk ? null : 'notebook' });
    // task card
    const tk = E.se(t, stk, stk + 0.7, 'out');
    if (tk > 0) E.layer(ctx, tk, c => {
      F05.card(c, 330, 180, 1560, 780, { seed: 2620 });
      P.write(c, 'Sıra sende!', 420, 290, E.seg(t, stk + 0.4, stk + 1.4), { size: 76, color: BR });
      P.write(c, '1. Kalem kutunu ve suluğunu dinamometreye as.', 420, 400, E.seg(t, stk + 1.2, stk + 2.6), { size: 46 });
      P.write(c, '2. Okuduğun değerleri Newton (N) ile tabloya yaz.', 420, 480, E.seg(t, stk + 2.4, stk + 3.8), { size: 46 });
      P.write(c, '3. Hangi dinamometreyi seçtin? Neden?', 420, 560, E.seg(t, stk + 3.6, stk + 5.0), { size: 46 });
      INK.label(c, 'grubunla çalış · ölçüm sınırını aşma · sonuçları karşılaştır', 420, 680, { size: 32, alpha: 0.65 * E.se(t, stk + 5, stk + 6) });
    });
  }
  function next(ctx, t) {
    const sn = E.s('next');
    ctx.fillStyle = 'rgba(46,106,140,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
    F05.floor(ctx, 880, 7);
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, '6 · Kendi Dinamometremi Tasarlıyorum', 960, 285, t, sn + 1.1, 1e9, { size: 70, align: 'center' });
    // materials sketch: rubber band, cup, ruler, paper clip
    const k = E.se(t, sn + 1.8, sn + 3.2);
    ctx.save(); ctx.globalAlpha = k;
    stroke(ctx, INK.wobble(circlePts(560, 780, 70, 26, 40), 2, 2701), { w: 5, closed: true, color: '#B5553F' });
    INK.label(ctx, 'lastik', 560, 850, { size: 34, align: 'center', weight: 700 });
    const cup = [[1300, 670], [1400, 670], [1385, 810], [1315, 810], [1300, 670]]; P.fillPts(ctx, cup, PAL.white); stroke(ctx, cup, { w: 3, closed: true, seed: 2702 });
    INK.label(ctx, 'bardak', 1350, 850, { size: 34, align: 'center', weight: 700 });
    const ru = F05.rect(1480, 740, 1760, 790); P.fillPts(ctx, ru, PAL.light, 0.5); stroke(ctx, ru, { w: 2.6, closed: true });
    for (let i = 0; i <= 14; i++) line(ctx, [1490 + i * 19, 740], [1490 + i * 19, 740 + (i % 2 ? 12 : 22)], { w: 1.4, dry: false });
    INK.label(ctx, 'cetvel', 1620, 850, { size: 34, align: 'center', weight: 700 });
    ctx.restore();
    DAMLA.draw(ctx, { x: 960, y: 880, s: 1.4, view: 'front', expr: 'happy', look: [0, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    F05.endCard(ctx, t, '5 · Kuvveti Ölçelim: Dinamometre', 'FB.5.2.1');
  }
  E.scene({ name: 'Kaydet', concept: 'Operasyonel tanım ve kayıt; Sıra sende', from: 'record', to: 'task', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıradaki', concept: 'Sonraki film: dinamometre modeli', from: 'next', to: 'end', trFrom: [960, 700], draw(ctx, t) { next(ctx, t); } });
})();

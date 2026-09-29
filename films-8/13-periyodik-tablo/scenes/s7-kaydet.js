// SAHNE 7 — Kaydet · Sıra sende (boyama performans görevi) · Sıradaki: fiziksel ve kimyasal değişimler · bitiş
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const ITEMS = [
    'Metal: parlak, iletken, tel ve levha olur.',
    'Ametal: mat, iletmez, katıysa kırılgan.',
    'Yarımetal: parlak ama kırılgan, biraz iletir.',
    'Soy gaz: tek atomlu, kararlı, 8A grubunda.',
    'Metal elektron verir, ametal elektron alır.',
    'H bir ametaldir; metaller alaşım oluşturur.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      U.record(ctx, t, sr, 'Gözlem Defteri · Element sınıfları', ITEMS, { step: 1.25, lh: 84, size: 44 });
      U.damla(ctx, t, { x: 1640, y: 1000, s: 1.0, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Boyama görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next'), se = E.s('end');
      // görev kartı
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', ['Renksiz bir periyodik tablo al.', 'Metal, ametal, yarımetal ve soy gazları', 'dört farklı renkle boya.', 'Renk anahtarı ekle; H’yi unutma!'], { x: 260, y: 190, w: 1080, h: 560, lh: 76 });
      const tk = Math.min(E.se(t, st, st + 0.7), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (tk > 0) E.layer(ctx, tk, c => {
        ['metal', 'ametal', 'yari', 'soy'].forEach((k, i) => { const x = 360 + i * 150, y = 690; P.fillPts(c, U.rect(x, y, x + 110, y + 30), U.CLS[k].c, 0.9); stroke(c, U.rect(x, y, x + 110, y + 30), { w: 2, closed: true, dry: false }); });
        U.damla(c, t, { x: 1600, y: 880, s: 1.3, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]] });
      });
      // sıradaki: mum + buz
      const nk = E.se(t, sn, sn + 0.8);
      if (nk > 0) E.layer(ctx, nk, c => {
        U.bench(c, -40, 1960, 820, 1901);
        U.candle(c, 700, 820, 190, t, { lit: 1, fs: 1.3 });
        U.ice(c, 1200, 820, 2.2, 0.35 + 0.1 * Math.sin(t * 0.8));
        INK.label(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center' });
        INK.label(c, 'Değişimin İzleri: Fiziksel ve Kimyasal Değişim', 960, 320, { size: 62, align: 'center', weight: 700 });
        INK.label(c, 'mum yanıyor', 700, 905, { size: 38, align: 'center', alpha: 0.8 });
        INK.label(c, 'buz eriyor', 1200, 905, { size: 38, align: 'center', alpha: 0.8 });
        U.damla(c, t, { x: 1600, y: 820, s: 1.1, view: 'q3', flip: true, expr: 'curious', look: [-0.9, 0.2], arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
      U.end(ctx, t, '13 · Periyodik Tablonun Haritası', 'FB.8.5.1');
    }
  });
})();

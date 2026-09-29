// SAHNE 5 — Gözlem verilerini kaydetme: yapı / görevi tablosu
(function () {
  const { PAL } = INK; const K = KIT;
  const ROWS = [['ağız', 'parçalar, ıslatır; sindirim başlar'], ['yutak · yemek borusu', 'lokmayı mideye iletir'], ['mide', 'karıştırır, öz su salgılar'], ['ince bağırsak', 'sindirim biter, besin kana geçer'],
    ['kalın bağırsak · anüs', 'su emilir, artıklar atılır'], ['karaciğer', 'safra üretir (yağlar)'], ['pankreas', 'enzimler gönderir']];
  E.scene({
    name: 'Kaydet', concept: 'Gözlem verilerini kaydetme', from: 'record', to: 'record', trFrom: [800, 500],
    draw(ctx, t) {
      const s = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1370, 730);
      P.write(ctx, 'Yapı', 240, 262, E.seg(t, s + 0.2, s + 0.8), { size: 46, color: K.LIFE_D });
      P.write(ctx, 'Görevi', 720, 262, E.seg(t, s + 0.5, s + 1.1), { size: 46, color: K.LIFE_D });
      if (t > s + 1) P.drawOn(ctx, P.bez([230, 288], [800, 298], [1460, 286], 30), E.se(t, s + 1, s + 1.6), { w: 3, color: PAL.light });
      ROWS.forEach((r, i) => { const y = 355 + i * 76, at = s + 1.3 + i * 1.1;
        P.write(ctx, r[0], 240, y, E.seg(t, at, at + 0.6), { size: 38, color: i >= 5 ? '#7A4A30' : PAL.ink });
        P.write(ctx, r[1], 720, y, E.seg(t, at + 0.4, at + 1.1), { size: 38 }); });
      K.text(ctx, 'kahverengi: yardımcı organlar (besin içlerinden geçmez)', 240, 880, { size: 28, alpha: 0.7 * E.se(t, s + 9, s + 9.6), color: '#7A4A30' });
      const cheer = t > s + 9.5;
      K.damla(ctx, t, { x: 1690, y: 900, s: 1.15, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

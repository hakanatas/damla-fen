// SAHNE 9 — Kaydet · Sıra sende (deney raporu) · Sıradaki: tepkimeler ve yaşam · bitiş
(function () {
  const { PAL } = INK;
  const U = U5;
  const ITEMS = [
    'Fiziksel değişim: tanecik yapısı değişmez.',
    'Kimyasal değişim: yeni madde oluşur, bağlar değişir.',
    'İpuçları: gaz, renk, ısı-ışık, koku-tat, çökelti.',
    'Kimyasal değişim = kimyasal tepkime.',
    'Tepkimede atom sayısı ve cinsi korunur.',
    'Toplam kütle korunur (kapalı kapta ölçtüm).'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      U.record(ctx, t, E.s('record'), 'Gözlem Defteri · Değişimler', ITEMS, { step: 1.15, lh: 84, size: 42 });
      U.damla(ctx, t, { x: 1640, y: 1000, s: 1.0, view: 'q3', flip: true, look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Deney raporu görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next');
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', ['Sirke-karbonat deneyini öğretmeninle yap.', 'Önce ve sonra kütleyi tabloya yaz.', 'Verileri yorumla, deney raporu hazırla.', 'Güvenlik kurallarına uy, masanı temizle.'], { x: 220, y: 190, w: 1180, h: 540, lh: 76, step: 0.9 });
      const tk = Math.min(E.se(t, st, st + 0.7), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (tk > 0) E.layer(ctx, tk, c => U.damla(c, t, { x: 1640, y: 880, s: 1.3, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]] }));
      const nk = E.se(t, sn, sn + 0.8);
      if (nk > 0) E.layer(ctx, nk, c => {
        U.bench(c, -40, 1960, 820, 2001);
        U.nail(c, 520, 790, 1.2, 0.8, -0.1);
        U.apple(c, 900, 750, 0.9, 0.6);
        U.bread(c, 1250, 760, 0.8, 0);
        INK.label(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center' });
        INK.label(c, 'Hayatın İçindeki Tepkimeler', 960, 320, { size: 72, align: 'center', weight: 700 });
        INK.label(c, 'paslanma · çürüme · mayalanma ...', 960, 420, { size: 42, align: 'center', alpha: 0.8 });
        U.damla(c, t, { x: 1620, y: 820, s: 1.1, view: 'q3', flip: true, expr: 'curious', look: [-0.9, 0.2], arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
      U.end(ctx, t, '14 · Değişimin İzleri', 'FB.8.5.2 · FB.8.5.3');
    }
  });
})();

// SAHNE 8 — Sıra sende (deney + TGA raporu + sanal deney + temizlik) · sıradaki film · bitiş
(function () {
  const { PAL } = INK;
  const U = U6;
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next'), se = E.s('end');
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', [
        'Grubunla seri ve paralel devreler çiz ve kur.',
        '• Özdeş ampuller kullan, parlaklıkları tabloya kaydet.',
        '• Bir ampulü sök: diğerlerine ne oluyor?',
        '• Güvenilir bir sitede sanal deneyle karşılaştır.',
        '• Sonuçlarını TGA tekniğiyle raporla.',
        '• Deneyden sonra malzemeleri topla, masanı temizle.'
      ], { size: 40, gap: 68, step: 1.2 });
      if (t > sn - 0.5) {
        const k = Math.min(E.se(t, sn, sn + 0.8), 1 - E.se(t, se, se + 0.6));
        E.layer(ctx, k, c => {
          U.next(c, t, sn, se + 0.5, '19 · Akım ve Gerilim');
          U.meter(c, 720, 600, 0.9, 'A', '0,20 A');
          U.meter(c, 1200, 600, 0.9, 'V', '3,0 V');
        });
      }
      if (t < se + 0.8) E.layer(ctx, 1 - E.se(t, se, se + 0.6), c => U.damla(c, t, { x: 1760, y: 930, s: 0.9, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], arms: [[-1, 0.35], [1, 2.3 + 0.3 * Math.sin(t * 7)]] }));
      U.end(ctx, t, '18 · Seri mi, Paralel mi?', 'FB.8.6.1');
    }
  });
})();

// SAHNE 5 — Sıra sende (ölçüm, tablo, grafik, TGA raporu, Georg Simon Ohm araştırması) · sıradaki film · bitiş
(function () {
  const U = U6;
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next'), se = E.s('end');
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', [
        'Grubunla pil sayısını değiştirerek ölç.',
        '• Ampermetreyi seri, voltmetreyi paralel bağla.',
        '• Ölçümleri tabloya ve akım–gerilim grafiğine kaydet.',
        '• Sonuçlarını TGA tekniğiyle raporla, gruplarla karşılaştır.',
        '• Araştır: Georg Simon Ohm (Giyorg Zimon Om) kimdi?',
        '• Deneyden sonra malzemeleri topla, masanı temizle.'
      ], { size: 40, gap: 68, step: 1.1 });
      if (t > sn - 0.5) {
        const k = Math.min(E.se(t, sn, sn + 0.8), 1 - E.se(t, se, se + 0.6));
        E.layer(ctx, k, c => {
          U.next(c, t, sn, se + 0.5, '20 · Aydınlatma Aracı Tasarlıyorum');
          CK.socket(c, 960, 800, 1.3); CK.bulb(c, 960, 749, 1.3, 1, t);
          P.bubble(c, 1360, 560, 260, 150, [1060, 650], E.se(t, sn + 1.2, sn + 1.8), 5);
          if (t > sn + 1.8) U.txt(c, 'fikir!', 1360, 575, { size: 44, align: 'center', color: U.AMBER });
        });
      }
      if (t < se + 0.8) E.layer(ctx, 1 - E.se(t, se, se + 0.6), c => U.damla(c, t, { x: 1760, y: 930, s: 0.9, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], arms: [[-1, 0.35], [1, 2.3 + 0.3 * Math.sin(t * 7)]] }));
      U.end(ctx, t, '19 · Akım ve Gerilim', 'FB.8.6.2 · FB.8.6.3 · FB.8.6.4');
    }
  });
})();

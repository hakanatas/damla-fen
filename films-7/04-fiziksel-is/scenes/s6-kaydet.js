// SAHNE 6 — Kaydet + Sıra sende (çalışma kâğıdı benzeri görev) + sonraki film: kinetik ve potansiyel enerji
(function () {
  const { PAL } = INK;
  const F = F7E;
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.record(ctx, t, 'Gözlem Defteri · Fiziksel anlamda iş', [
        'İş: kuvvet + kuvvet doğrultusunda yer değiştirme.',
        'Duvarı itmek, yükü yatay taşımak: iş yok.',
        'İş, kuvvete ve yer değiştirmeye bağlıdır.',
        'Günlük dildeki iş, fizikteki işten farklıdır.',
        'İşin birimi joule’dür (J).'
      ], { size: 42, dy: 100, step: 1.5 });
    }
  });
  E.scene({
    name: 'Sıra sende · Sıradaki', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      F.outro(ctx, t, {
        task: ['Evde ya da okulda 5 durum gözlemle.', 'Kuvvetin ve hareketin yönünü tabloya yaz.', 'Hangisinde fiziksel anlamda iş yapıldı?', 'Kararını gözlem verinle açıkla.'],
        next: 'Kinetik ve Potansiyel Enerji',
        name: '4 · Her Çaba İş mi? Fiziksel Anlamda İş', code: 'FB.7.2.1',
        nextArt(c, t, sn) {
          F.shelf(c, 240, 520, 600); F.ball(c, 380, 560, 40, F.PE, 4800);
          const x = 1450 + 60 * Math.sin((t - sn) * 1.5); F.ball(c, x, 700, 44, F.KE, 4810, { stripe: true });
          for (let i = 0; i < 3; i++) INK.line(c, [x - 70 - i * 10, 680 + i * 18], [x - 140 - i * 10, 680 + i * 18], { w: 2.4, alpha: 0.5, dry: false, seed: 4820 + i });
          INK.line(c, [1250, 744], [1650, 744], { w: 3, seed: 4830 });
        }
      });
    }
  });
})();

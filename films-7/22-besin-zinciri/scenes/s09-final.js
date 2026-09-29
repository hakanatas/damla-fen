// SAHNE 9 — Kaydet, Sıra sende (besin zinciri + ekoloji piramidi performans görevi), Sıradaki: Kaynakların Tasarruflu Kullanımı, bitiş kartı
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F722;
  const ITEMS = [
    'Üretici: kendi besinini üretir · Tüketici: başka canlıları yer',
    'Ayrıştırıcı: ölü canlıları ayrıştırır, maddeler toprağa döner.',
    'Ok yenilenden yiyene: enerjinin akış yönü (başta Güneş).',
    'Besin ağı: birbirine bağlı zincirler · Piramitte enerji azalır.',
    'Biyolojik birikim: zararlı madde yukarı çıktıkça artar.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Besin Zinciri', ITEMS, { col: PAL.life });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      const hill = F.meadow(ctx, t, { sun: false });
      // sıradaki: damlayan musluk
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        const tx = 1500, ty = 480;
        F.shape(c, [[tx - 120, ty - 30], [tx + 20, ty - 30], [tx + 20, ty + 10], [tx - 120, ty + 10]], '#9A9387', 0.5, 3200);
        F.shape(c, [[tx - 10, ty + 10], [tx + 20, ty + 10], [tx + 20, ty + 50], [tx - 10, ty + 50]], '#9A9387', 0.5, 3201);
        F.shape(c, [[tx - 60, ty - 70], [tx - 40, ty - 70], [tx - 40, ty - 30], [tx - 60, ty - 30]], '#9A9387', 0.5, 3202);
        const k = (t * 0.8) % 1; const dy = ty + 60 + k * 240;
        const d = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; d.push([tx + 5 + Math.sin(a) * 14 * Math.pow(Math.sin(a / 2), 0.8) * 1.4, dy - Math.cos(a) * 20]); }
        P.fillPts(c, d, PAL.water, 0.7); stroke(c, d, { w: 2, closed: true, dry: false });
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: 560, y: P.hillY(hill, 560) + 6, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Grubunla farklı canlı görselleri topla.', 'Üretici, tüketici, ayrıştırıcı diye grupla.', 'Besin zinciri ve ekoloji piramidi kur.', 'Neden-sonuç ilişkilerini sınıfa sun.'], {
        col: F.GREEN, maxW: 780, extra: c => {
          const k = E.se(t, sk + 1.5, sk + 2.3);
          c.save(); c.globalAlpha *= k; c.translate(1420, 560);
          const lv = [[-150, 150, PAL.life], [-110, 110, '#9CBB55'], [-70, 70, F.AMB], [-30, 30, F.HEAT]];
          lv.forEach(([a, b, col], i) => { const y1 = 170 - i * 85, y2 = y1 - 85; const w1 = 300 - i * 70, w2 = 300 - (i + 1) * 70; F.shape(c, [[-w1 / 2, y1], [w1 / 2, y1], [w2 / 2, y2], [-w2 / 2, y2]], col, 0.5, 3210 + i); });
          F.fit(c, 'ekoloji piramidi', 0, 230, 300, 30, { weight: 400 });
          c.restore();
        }
      });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1250, 230, t, sn + 0.5, se + 0.4, { size: 46, align: 'center', weight: 400 });
        E.inkText(ctx, '23 · Kaynakların Tasarruflu Kullanımı', 1250, 320, t, sn + 1.0, se + 0.4, { size: 62, align: 'center', color: PAL.water });
      }
      F.endCard(ctx, t, '22 · Besin Zinciri', 'FB.7.7.1', PAL.life);
    }
  });
})();

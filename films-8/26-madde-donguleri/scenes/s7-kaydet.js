// SAHNE 7 — Kaydet · Sıra sende · Sıradaki gözlem (küresel iklim değişikliği) · bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('record');
      U.record(ctx, t, s0, 'Madde Döngüleri', [
        'Madde yok olmaz; canlılar ve çevre arasında dolaşır.',
        'Su: buharlaşma, terleme → yoğuşma → yağış → akış',
        'Fotosentez karbondioksit alır, oksijen verir.',
        'Solunum, ayrıştırma ve yanma bunun tersini yapar.',
        'Bozan sorunlar: asit yağmuru, ozon incelmesi, sera etkisi'
      ], { step: 1.25, size: 40, lh: 96, colors: [PAL.ink, PAL.water, U.GREEN, PAL.ink, U.AMBER] });
      U.damla(ctx, t, { x: 1700, y: 1040, s: 0.95, view: 'q3', flip: true, expr: 'happy', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook', seed: 9 });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Poster görevi ve sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sT = E.s('task'), sN = E.s('next');
      U.task(ctx, t, sT, sN + 0.2, 'Sıra sende!', [
        'Bir madde döngüsü seç: su, karbon ya da oksijen.',
        'Poster ya da dijital içerikle aşamalarını göster.',
        'Döngüyü bozan bir insan etkinliğini ekle.',
        'Sınıfta paylaş, arkadaşlarının sorularını yanıtla.'
      ], { x: 200, y: 190, w: 1260, h: 560, lh: 80, step: 1.0 });
      const tk = Math.min(E.se(t, sT, sT + 0.7), 1 - E.se(t, sN - 0.2, sN + 0.5));
      if (tk > 0) E.layer(ctx, tk, c => U.damla(c, t, { x: 1680, y: 880, s: 1.3, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]], seed: 9 }));
      // sıradaki: ısınan Dünya
      const nk = E.se(t, sN, sN + 0.8);
      if (nk > 0) E.layer(ctx, nk, c => {
        const g = c.createRadialGradient(960, 620, 50, 960, 620, 700); g.addColorStop(0, 'rgba(227,160,58,0.25)'); g.addColorStop(1, 'rgba(181,85,63,0.05)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        INK.label(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center' });
        INK.label(c, 'Küresel İklim Değişikliği', 960, 320, { size: 76, align: 'center', weight: 700 });
        P.sun(c, 520, 560, 90, t, { cells: false, nrays: 18 });
        const atm = circlePts(960, 620, 230, 230, 60); wash(c, atm, U.HEAT, 0.22, 2900, { bleed: 3, blooms: 1 });
        P.earth(c, 960, 620, 160);
        U.thermo(c, 1300, 780, 320, 0.45 + 0.35 * E.se(t, sN + 1, sN + 5));
        U.damla(c, t, { x: 1620, y: 860, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.9, 0], arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]], seed: 9 });
      });
      U.end(ctx, t, '26 · Hiçbir Şey Kaybolmaz: Madde Döngüleri', 'FB.8.7.4 · FB.8.7.5');
    }
  });
})();

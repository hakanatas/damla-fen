// SAHNE 10 — Kaydet (FB.7.6.1 ç), Sıra sende (poster performans görevi), Sıradaki: Elektrik Yükleri, bitiş kartı
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  const ITEMS = [
    'Kaynaklar: ders kitabı, bilim sitesi, bilim merkezi, öğretmen',
    'Bilgiyi en az iki güvenilir kaynakla doğruladım.',
    'Sürtünme ve dokunma ile elektriklenme: temaslı',
    'Etki ile elektriklenme: temassız',
    ['Veri: sürtme sayısı arttıkça çekilen kâğıt arttı.', F.AMB]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bilgileri ve verileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Elektriklenme', ITEMS, { col: F.AMB });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Poster görevi; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
      const hill = F.park(ctx, t);
      // sıradaki: iki balon (biri iter, biri çeker — merak)
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        const sp = E.se(t, sn + 1.2, sn + 2.4);
        stroke(c, [[1150, 420], [1650, 420]], { w: 4, seed: 1001 });
        F.balloon(c, 1330 - sp * 40, 600, 60, F.HEAT, { string: false, rot: sp * 0.25 }); line(c, [1330 - sp * 40 + 10, 520], [1330, 420], { w: 1.6, dry: false });
        F.balloon(c, 1470 + sp * 40, 600, 60, F.HEAT, { string: false, rot: -sp * 0.25, seed: 2077 }); line(c, [1470 + sp * 40 - 10, 520], [1470, 420], { w: 1.6, dry: false });
        F.fit(c, '?', 1400, 560, 80, 90, { color: F.AMB });
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: 560, y: 872, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Doğadaki elektriklenme örneklerini bul.', 'Teknolojideki uygulamaları araştır.', 'Kaynaklarını yaz ve doğrula.', 'Poster ya da afiş hazırlayıp sun.'], {
        col: F.AMB, maxW: 820, extra: c => {
          const pk = E.se(t, sk + 1.5, sk + 2.3);
          c.save(); c.globalAlpha *= pk; c.translate(1400, 560); c.rotate(0.05);
          const ps = [[-150, -220], [150, -220], [150, 220], [-150, 220], [-150, -220]]; P.fillPts(c, ps, PAL.white); stroke(c, ps, { w: 2.6, closed: true, seed: 1011 });
          F.fit(c, 'ELEKTRİKLENME', 0, -170, 260, 34, { color: F.AMB });
          F.stormCloud(c, -60, -70, 0.55, t); F.balloon(c, 70, -80, 34, F.HEAT, { strLen: 40 });
          F.copier(c, -40, 90, 0.6, t); F.fit(c, 'poster', 60, 190, 200, 30, { weight: 400 });
          c.restore();
        }
      });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1400, 230, t, sn + 0.5, se + 0.4, { size: 46, align: 'center', weight: 400 });
        E.inkText(ctx, '21 · Elektrik Yükleri', 1400, 320, t, sn + 1.0, se + 0.4, { size: 70, align: 'center', color: F.AMB });
      }
      F.endCard(ctx, t, '20 · Elektriklenme', 'FB.7.6.1 · FB.7.6.2', F.AMB);
    }
  });
})();

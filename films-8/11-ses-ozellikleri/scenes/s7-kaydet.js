// SAHNE 7 — Kaydet, Sıra sende (müzik aleti tasarımı, V diyagramı), sıradaki: sesin madde ile etkileşimi, bitiş kartı
(function () {
  const { PAL, line, stroke, wash } = INK; const F = S8;
  const ITEMS = [
    'Frekans: 1 saniyedeki titreşim sayısı; birimi hertz (Hz).',
    'Yüksek frekans → ince ses · düşük frekans → kalın ses',
    'Aynı frekanstaki sesleri tınılarından ayırt ederiz.',
    'Kaynaktan uzaklaştıkça ses zayıf; şiddet artınca güçlü işitilir.',
    ['Çok şiddetli ses işitmeye zarar verir; kulağını koru!', F.RED]
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      F.notebookPage(ctx, t, E.s('record'), 'Gözlem Defteri · Sesin Özellikleri', ITEMS, { col: F.AMB, gap: 1.25 });
      F.damla(ctx, t, { x: 1660, y: 900, s: 0.95, flip: true, expr: 'neutral', look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende · Sıradaki', concept: 'Görev; sıradaki: sesin madde ile etkileşimi', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('task'), sn = E.s('next');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.10)'); g.addColorStop(1, 'rgba(46,106,140,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 870);
      const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]); P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.25, 3950, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 3951 });
      const nk = E.se(t, sn, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        F.surface(c, 1560, 420, 70, 380, 'tile');
        F.rings(c, 900, 610, t, { a0: -0.25, a1: 0.25, r0: 150, maxR: 640, gap: 60, speed: 120, noFade: true, alpha: 0.9 });
        P.arrow(c, [1540, 560], [1180, 440], E.se(t, sn + 1.5, sn + 2.5), { w: 4, color: F.AMB, bend: 0 });
        F.fit(c, 'yansıma?', 1260, 410, 260, 38); F.fit(c, 'soğurma?', 1600, 860, 260, 38);
      });
      const wave = t > sn;
      F.damla(ctx, t, { x: 470, y: P.hillY(hill, 470) + 6, s: 1.3, expr: 'happy', view: wave ? 'front' : 'q3', look: wave ? [0.6, -0.5] : [0.7, -0.3], arms: wave ? F.wave(t) : [[-1, 1.1], [1, 1.4]], prop: wave ? null : 'notebook' });
      const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
      F.taskCard(ctx, t, sk, ck, ['Farklı frekanslarda ses çıkaran bir müzik aleti tasarla.', 'Uzaklık ve şiddet deneyini yap, V diyagramıyla açıkla.', 'Değişkenlerini kontrol etmeyi unutma!', 'Müzik dersinde ince ve kalın sesleri karşılaştır.'], { col: F.AMB, maxW: 1150, gap: 1.2 });
      if (wave) {
        E.inkText(ctx, 'Sıradaki gözlem:', 1180, 220, t, sn + 0.5, E.s('end') + 0.4, { size: 48, align: 'center', weight: 400 });
        E.inkText(ctx, 'Sesin Madde ile Etkileşimi ve Ses Kirliliği', 1110, 300, t, sn + 1.0, E.s('end') + 0.4, { size: 54, align: 'center', color: F.AMB });
      }
      F.endCard(ctx, t, '11 · Sesin Özellikleri: Frekans ve Şiddet', 'FB.8.4.3 · FB.8.4.4', F.AMB);
    }
  });
})();

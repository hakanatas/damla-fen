// SAHNE 9 — Kaydet + Sıra sende (performans görevi: farklı saf maddelerin erime noktalarını karşılaştıran düzenek tasarla) + sıradaki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = G16, RED = F.RED;
  const ITEMS = [
    'Saf su 0 °C’de erir ve donar, ≈ 100 °C’de kaynar.',
    'Erime, donma ve kaynama sırasında sıcaklık sabit kalır.',
    'Aynı saf maddenin erime ve donma noktası eşittir.',
    'Farklı saf maddelerin bu noktaları farklıdır.',
    'Bu noktalar, saf maddeler için ayırt edicidir.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme ve Sıra sende', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 850);
      P.write(ctx, 'Gözlem Defteri · Erime, Donma, Kaynama', 290, 180, E.seg(t, sr + 0.3, sr + 1.5), { size: 58 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 200], [800, 212], [1330, 196], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
      const la = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        ITEMS.forEach((txt, i) => {
          const at = sr + 1.4 + i * 1.3, y = 300 + i * 96;
          const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
          if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 3020 + i });
          P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
          P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 44 });
        });
        const wy = 300 + 5 * 96, wat = sr + 1.4 + 5 * 1.3;
        P.write(c, '⚠  Isıtıcıyı yalnızca öğretmen kullanır; buhar da yakar!', 300, wy, E.seg(t, wat, wat + 1.4), { size: 44, color: RED });
      });
      const yk = E.se(t, sy, sy + 0.7);
      if (yk > 0) E.layer(ctx, yk, c => {
        F.heater(c, 470, 700, 300, 0, t);
        F.beaker(c, 470, 700, 280, 300, { level: 0.6, t: 0 });
        F.tube(c, 410, 680, 400, 0.3, 1, '#C07F1E', t, 3050);
        F.tube(c, 530, 680, 400, 0.3, 1, '#7A6F62', t, 3060);
        INK.label(c, '?', 410, 270, { size: 64, weight: 700, align: 'center', color: F.AMBER });
        INK.label(c, '?', 530, 270, { size: 64, weight: 700, align: 'center', color: F.AMBER });
        P.write(c, 'Sıra sende!', 800, 300, E.seg(t, sy + 0.4, sy + 1.4), { size: 72, color: F.AMBER });
        P.write(c, 'Farklı saf maddelerin erime', 800, 410, E.seg(t, sy + 1.2, sy + 2.6), { size: 50 });
        P.write(c, 'noktalarını karşılaştıran bir', 800, 475, E.seg(t, sy + 2.4, sy + 3.6), { size: 50 });
        P.write(c, 'deney düzeneği tasarla.', 800, 540, E.seg(t, sy + 3.4, sy + 4.4), { size: 50 });
        [['1', 'Soru ve değişkenler'], ['2', 'Ölç, tabloya yaz, grafik çiz'], ['3', 'Öğretmeninle, güvenle!']].forEach(([n, s], i) => {
          const at = sy + 4.4 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const y = 650 + i * 76; c.save(); c.translate(830, y - 16); c.scale(P.pop(k), P.pop(k)); P.fillPts(c, circlePts(0, 0, 26, 26, 24), PAL.light, 0.85); stroke(c, circlePts(0, 0, 26, 26, 24), { w: 2.2, closed: true }); c.font = '700 32px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.white; c.fillText(n, 0, 11); c.restore();
          P.write(c, s, 880, y, E.seg(t, at + 0.2, at + 1.0), { size: 44, color: i === 2 ? RED : PAL.ink });
        });
      });
      const cheer = t > sy + 7.5;
      DAMLA.draw(ctx, {
        x: 1660, y: 1040, s: 1.05, view: 'q3', flip: true, expr: cheer ? 'happy' : (t > sy ? 'curious' : 'neutral'), look: [-0.7, 0.2], blink: E.blink(t, 25), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t > sy ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.1]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > sy ? null : 'notebook'
      });
    }
  });
  E.scene({
    name: 'Sıradaki: Yoğunluk', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [960, 600],
    draw(ctx, t) {
      const sn = E.s('next'), se = E.s('end');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 200, 1720, 800, 3101);
      // eşit hacimde iki küp: tahta ve demir (teaser)
      const cube = (x, col, name, seed) => { const q = [[x - 80, 640], [x + 80, 636], [x + 82, 796], [x - 78, 798], [x - 80, 640]]; P.fillPts(ctx, q, col, 0.9); wash(ctx, q, '#3A3530', 0.25, seed, { bleed: 0.8, blooms: 1 }); stroke(ctx, q, { w: 3, closed: true, seed: seed + 1 }); INK.label(ctx, name, x, 870, { size: 36, weight: 700, align: 'center', rot: 0 }); };
      cube(1060, '#D9B27A', 'tahta', 3110); cube(1380, '#8A8378', 'demir', 3120);
      const q = E.se(t, sn + 1.5, sn + 3);
      if (q > 0) { INK.label(ctx, 'aynı hacim', 1220, 560, { size: 40, weight: 700, align: 'center', alpha: q }); INK.label(ctx, 'kütle ?', 1220, 480, { size: 56, weight: 700, align: 'center', color: F.AMBER, alpha: q }); }
      DAMLA.draw(ctx, { x: 600, y: 800, s: 1.35, view: 'q3', expr: 'curious', look: [0.8, -0.4], blink: E.blink(t, 27), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.3 + 0.2 * Math.sin(t * 3)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.6, se + 0.2, { size: 48, align: 'center', weight: 400 });
      E.inkText(ctx, '17 · Aynı Hacim, Farklı Kütle: Yoğunluk', 960, 270, t, sn + 1.2, se + 0.2, { size: 70, align: 'center' });
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '16 · Erime, Donma ve Kaynama Noktası', 960, 515, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([560, 545], [960, 556], [1360, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
        INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.5.2 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();

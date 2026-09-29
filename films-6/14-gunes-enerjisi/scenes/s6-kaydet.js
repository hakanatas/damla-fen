// SAHNE 6 — Kaydet (c: ulaştığı çıkarımları yansıtır) + Sıra sende (performans görevi) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F614, RED = F614.RED;
  const ITEMS = [
    'Güneş ışığı soğurulunca maddeler ısınır (güneşli oda).',
    'Kurutma, güneş kolektörü (suyu ısıtır), güneş paneli (elektrik).',
    'Hesap makinesi, sokak lambası, sulama pompası, uydu.',
    'Sorguladım: gece üretim yok, bulutta az → enerji depolanır.',
    'Avantaj: yenilenebilir; çalışırken duman ve zararlı gaz yok.',
    'Sınırlılık: kurulum maliyeti, geniş alan, panel geri dönüşümü.'
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Güneş Enerjisi', 290, 255, E.seg(t, sr + 0.3, sr + 1.5), { size: 60 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 277], [700, 289], [1180, 273], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.8 + i * 1.25, y = 360 + i * 88;
      const box = [[300, y - 38], [342, y - 40], [344, y + 2], [302, y + 4], [300, y - 38]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 321, y - 19, 40, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 370, y, E.seg(t, at, at + 1.1), { size: F.fit(ctx, txt, 1180, 42) });
    });
    const done = t > sr + 9.2;
    DAMLA.draw(ctx, { x: 1690, y: 1000, s: 0.8, view: 'q3', flip: true, expr: done ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: done ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: done ? null : 'notebook' });
  }
  function outro(ctx, t) {
    const stk = E.s('task'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(227,160,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 220, 170, 1400, 720, { seed: 901 });
      P.write(c, 'Sıra sende!', 290, 280, E.seg(t, stk + 0.4, stk + 1.4), { size: 72, color: '#8A4A10' });
      P.write(c, 'Güneş enerjisinin gelecekte kullanımıyla', 290, 375, E.seg(t, stk + 1.2, stk + 2.4), { size: 46 });
      P.write(c, 'ilgili özgün bir fikir üret: çiz, adlandır, sun.', 290, 435, E.seg(t, stk + 2.2, stk + 3.4), { size: 46 });
      P.write(c, 'Arkadaşlarının fikirlerini de saygıyla dinle.', 290, 505, E.seg(t, stk + 3.4, stk + 4.4), { size: 40, color: PAL.water });
      const sk = E.se(t, stk + 4.8, stk + 5.6);
      if (sk > 0) {
        c.save(); c.globalAlpha *= sk; c.font = '700 38px Kalam'; c.fillStyle = RED;
        c.fillText('⚠  Güneş’e asla doğrudan bakma.', 290, 630);
        c.fillText('⚠  Kolektör ve güneş ocağı yüzeyleri çok ısınabilir.', 290, 685);
        c.restore();
      }
      INK.label(c, 'Zenginleştirme: bir yetişkinle güneş fırını tasarla.', 290, 810, { size: 34, alpha: 0.7 * E.se(t, stk + 6, stk + 6.6) });
      // idea sketch: lightbulb + mini sun
      F.bulb(c, 1430, 330, 1.6, 0.6 + 0.4 * Math.abs(Math.sin(t * 2)));
      P.sun(c, 1500, 560, 40, t, { nrays: 10, cells: false, glow: false });
    });
    DAMLA.draw(ctx, { x: 1750, y: 960, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, talk: E.talk(t), arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      E.inkText(c, 'Sıradaki gözlem:', 960, 230, t, sn + 0.3, 1e9, { size: 48, align: 'center', weight: 400 });
      E.inkText(c, '15 · Genleşme ve Büzülme', 960, 315, t, sn + 0.8, 1e9, { size: 70, align: 'center' });
      // ball and ring sketch
      const k = E.se(t, sn + 1.2, sn + 2.0);
      if (k > 0) {
        c.save(); c.globalAlpha *= k;
        stroke(c, circlePts(760, 600, 90, 90, 50), { w: 8, closed: true, color: '#8C8578', seed: 960 });
        line(c, [760, 510], [760, 420], { w: 5 });
        const g = circlePts(1160, 600, 84, 84, 40); P.fillPts(c, g, '#B9B2A2'); stroke(c, g, { w: 3, closed: true, seed: 961 });
        for (let i = 0; i < 3; i++) F.squiggle(c, 1110 + i * 50, 500, t, i, 1, 50);
        INK.label(c, '?', 960, 630, { size: 100, weight: 700, align: 'center', color: '#8A4A10' });
        c.restore();
      }
    });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.fillRect(0, 0, E.W, E.H);
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '14 · Güneş Enerjisinden Yararlanma', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([600, 545], [960, 556], [1320, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.4.7 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }
  E.scene({ name: 'Kaydet', concept: 'Çıkarımları kaydetme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [1750, 700], draw(ctx, t) { outro(ctx, t); } });
})();

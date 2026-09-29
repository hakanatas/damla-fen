// SAHNE 9 — Kaydet + Sıra sende + sonraki film (14 · Güneş Enerjisi) + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613, RED = F613.RED;
  const ITEMS = [
    'Işık maddeye çarpınca yansır ya da soğurulur.',
    'Soğurulan ışık maddeyi ısıtır; siyah kutu daha çok ısındı.',
    'Beyaz ışık, tüm ışık renklerinin bileşimidir.',
    'Ana renkler: kırmızı, yeşil, mavi · Ara: sarı, camgöbeği, magenta',
    'Renkli cisim kendi rengini yansıtır, ötekileri soğurur.',
    'Beyaz cisim tüm renkleri yansıtır, siyah cisim soğurur.'
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Renklerin Sırrı', 290, 255, E.seg(t, sr + 0.3, sr + 1.5), { size: 60 });
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
    ctx.fillStyle = 'rgba(24,25,40,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 260, 190, 1360, 680, { seed: 901 });
      P.write(c, 'Sıra sende!', 330, 300, E.seg(t, stk + 0.4, stk + 1.4), { size: 72, color: '#8A4A10' });
      P.write(c, 'Renkli cisimleri farklı renkte ışıklar', 330, 400, E.seg(t, stk + 1.2, stk + 2.4), { size: 48 });
      P.write(c, 'altında gözle, gördüğünü tabloya yaz.', 330, 465, E.seg(t, stk + 2.2, stk + 3.4), { size: 48 });
      // mini table sketch
      const tx = 1180, ty = 300;
      const mk = E.se(t, stk + 1.0, stk + 2.0);
      if (mk > 0) {
        c.save(); c.globalAlpha *= mk;
        for (let i = 0; i <= 3; i++) line(c, [tx, ty + i * 70], [tx + 360, ty + i * 70], { w: 1.8, dry: false, seed: 910 + i });
        for (let j = 0; j <= 3; j++) line(c, [tx + j * 120, ty], [tx + j * 120, ty + 210], { w: 1.8, dry: false, seed: 920 + j });
        ['#FFF8E4', '#F3C9BF', '#CFE5C4'].forEach((col, j) => P.fillPts(c, [[tx + j * 120 + 4, ty + 4], [tx + j * 120 + 116, ty + 4], [tx + j * 120 + 116, ty + 66], [tx + j * 120 + 4, ty + 66]], col, 0.9));
        INK.label(c, '?', tx + 180, ty + 170, { size: 60, weight: 700, align: 'center', alpha: 0.6 });
        c.restore();
      }
      // safety
      const sk = E.se(t, stk + 3.6, stk + 4.4);
      if (sk > 0) {
        c.save(); c.globalAlpha *= sk;
        c.font = '700 40px Kalam'; c.fillStyle = RED; c.fillText('⚠  Işığı kimsenin gözüne tutma.', 330, 620);
        c.fillText('⚠  Güneş’e ve güçlü ışıklara doğrudan bakma.', 330, 680);
        c.restore();
      }
      INK.label(c, 'renkli ışık kaynağı: renkli LED fener', 330, 800, { size: 32, alpha: 0.65 * E.se(t, stk + 4.6, stk + 5.2) });
    });
    DAMLA.draw(ctx, { x: 1750, y: 960, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, talk: E.talk(t), arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // next film teaser
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      E.inkText(c, 'Sıradaki gözlem:', 960, 230, t, sn + 0.3, 1e9, { size: 48, align: 'center', weight: 400 });
      E.inkText(c, '14 · Güneş Enerjisinden Yararlanma', 960, 315, t, sn + 0.8, 1e9, { size: 70, align: 'center' });
      P.sun(c, 700, 560, 90, t, { nrays: 16, cells: false });
      const pk = E.se(t, sn + 1.2, sn + 2.0, 'out');
      if (pk > 0) { // tiny solar panel sketch
        c.save(); c.globalAlpha *= pk;
        const pn = [[1020, 700], [1320, 660], [1360, 780], [1060, 820], [1020, 700]]; P.fillPts(c, pn, '#3B5C78', 0.85); stroke(c, pn, { w: 3, closed: true, seed: 930 });
        for (let i = 1; i < 3; i++) line(c, [1020 + 13 * i + 0, 700 + 40 * i], [1320 + 13 * i, 660 + 40 * i], { w: 1.4, color: '#D9E3EA', dry: false });
        for (let j = 1; j < 4; j++) line(c, [1020 + 75 * j, 700 - 10 * j], [1060 + 75 * j, 820 - 10 * j], { w: 1.4, color: '#D9E3EA', dry: false });
        line(c, [1190, 800], [1190, 870], { w: 5 });
        c.restore();
        [0, 1, 2].forEach(i => F.ray(c, [790, 520 + i * 40], [1040 + i * 60, 690 + i * 10], E.se(t, sn + 1.6, sn + 2.6), { w: 3, head: 13, seed: 940 + i }));
      }
    });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '13 · Renklerin Sırrı: Soğurma ve Renkler', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([560, 545], [960, 556], [1360, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.4.4 · FB.6.4.5 · FB.6.4.6 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }
  E.scene({ name: 'Kaydet', concept: 'Bulguları gözlem defterine kaydetme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Görev ve sonraki konu', from: 'task', to: 'end', trFrom: [1750, 700], draw(ctx, t) { outro(ctx, t); } });
})();

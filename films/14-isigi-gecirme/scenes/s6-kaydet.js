// SAHNE 7 — Kaydet (FB.5.4.2: gruplandırma ve etiketleme sonuçları) + Sıra sende + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, arrowHead, wash } = INK;
  const F = F14, RED = F.RED;
  const ITEMS = [
    'Cam ve şeffaf dosya ışığı geçirdi → saydam',
    'Tül perde ve buzlu cam ışığın bir kısmını geçirdi → yarı saydam',
    'Karton, kitap ve folyo ışığı geçirmedi → opak',
    'Kalınlık arttıkça geçen ışık azalır (sis gibi).',
    'Sınıfımdaki, evimdeki, sokağımdaki maddeleri etiketledim.'
  ];
  function page(ctx, t) {
    const sr = E.s('record'), ss = E.s('sum');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Işık Geçer mi?', 290, 170, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 192], [700, 204], [1180, 188], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.8 + i * 1.3, y = 290 + i * 92;
      const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 322, y - 20, 42, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 375, y, E.seg(t, at, at + 1.1), { size: 42 });
    });
    // conclusion
    const ck = E.se(t, ss + 0.2, ss + 1.0);
    if (ck > 0) {
      const b = [[290, 745], [1640, 738], [1646, 850], [296, 858], [290, 745]];
      ctx.save(); ctx.globalAlpha = ck; P.fillPts(ctx, b, '#F6E7B8', 0.9); stroke(ctx, b, { w: 3, closed: true, color: F.AMB }); ctx.restore();
      [0, 1, 2].forEach(i => F.tag(ctx, i, [560, 968, 1380][i], 800, E.se(t, ss + 0.8 + i * 1.2, ss + 1.3 + i * 1.2)));
      if (t > ss + 1.8) INK.label(ctx, '·', 760, 812, { size: 60, weight: 700, align: 'center' }), INK.label(ctx, '·', 1176, 812, { size: 60, weight: 700, align: 'center' });
    }
    DAMLA.draw(ctx, { x: 1690, y: 1000, s: 0.8, view: 'q3', flip: true, expr: t > ss + 2.4 ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: t > ss + 2.4 ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > ss + 2.4 ? null : 'notebook' });
  }

  function poster(ctx, x, y) { // mini poster sketch with three columns
    const p = [[x, y], [x + 300, y - 4], [x + 304, y + 400], [x + 2, y + 402], [x, y]];
    P.fillPts(ctx, p, '#FBF8F1'); stroke(ctx, p, { w: 3, closed: true, seed: 905 });
    INK.label(ctx, 'AFİŞİM', x + 150, y + 50, { size: 36, weight: 700, align: 'center' });
    [0, 1, 2].forEach(i => { const cx = x + 55 + i * 95; P.fillPts(ctx, [[cx - 40, y + 80], [cx + 40, y + 80], [cx + 40, y + 108], [cx - 40, y + 108]], F.CLS[i].col, 0.7);
      F.icon(ctx, [['cam', 'dosya'], ['tul', 'buzlu'], ['kitap', 'folyo']][i][0], cx, y + 180, 0.45); F.icon(ctx, [['cam', 'dosya'], ['tul', 'buzlu'], ['kitap', 'folyo']][i][1], cx, y + 290, 0.45); });
  }

  function outro(ctx, t) {
    const stk = E.s('task'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
    // task card
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 300, 170, 1320, 620, { seed: 901 });
      poster(c, 370, 280);
      P.write(c, 'Sıra sende!', 760, 290, E.seg(t, stk + 0.4, stk + 1.4), { size: 72, color: '#8A4A10' });
      P.write(c, 'Çevrendeki maddeleri', 760, 400, E.seg(t, stk + 1.2, stk + 2.4), { size: 50 });
      P.write(c, 'ışığı geçirme durumlarına göre', 760, 470, E.seg(t, stk + 2.2, stk + 3.4), { size: 50 });
      P.write(c, 'sınıflandıran bir afiş hazırla.', 760, 540, E.seg(t, stk + 3.0, stk + 4.2), { size: 50 });
      [0, 1, 2].forEach(i => F.tag(c, i, [870, 1120, 1370][i], 660, E.se(t, stk + 4.4 + i * 0.4, stk + 4.9 + i * 0.4)));
    });
    DAMLA.draw(ctx, { x: 1720, y: 900, s: 1.1, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // next film teaser
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      E.inkText(c, 'Sıradaki gözlem:', 960, 210, t, sn + 0.3, 1e9, { size: 48, align: 'center', weight: 400 });
      E.inkText(c, '15 · Tam Gölge', 960, 295, t, sn + 0.8, 1e9, { size: 72, align: 'center' });
      const L = [360, 600];
      F.bulb(c, L[0], L[1], 1.2, 1);
      const k = E.se(t, sn + 1.2, sn + 1.8, 'out');
      if (k > 0) {
        c.save(); c.globalAlpha = k;
        const b = [[760, 540], [880, 540], [880, 660], [760, 660], [760, 540]]; P.fillPts(c, b, '#8A6A45', 0.85); stroke(c, b, { w: 3, closed: true });
        INK.label(c, 'opak cisim', 820, 515, { size: 38, weight: 700, align: 'center' });
        const scr = [[1400, 340], [1430, 340], [1430, 860], [1400, 860], [1400, 340]]; P.fillPts(c, scr, '#FBF8F1'); stroke(c, scr, { w: 3, closed: true });
        INK.label(c, 'ekran', 1460, 612, { size: 38, weight: 700, align: 'left' });
        INK.label(c, '?', 1200, 620, { size: 110, weight: 700, align: 'center', color: '#8A4A10' });
        c.restore();
      }
      [[-0.22, 0], [-0.13, 1], [0, 1], [0.13, 1], [0.22, 0]].forEach(([a, blocked], i) => {
        const d = [Math.cos(a), Math.sin(a)], end = blocked ? (760 - L[0]) / d[0] : (1398 - L[0]) / d[0];
        F.ray(c, [L[0] + d[0] * 40, L[1] + d[1] * 40], [L[0] + d[0] * end, L[1] + d[1] * end], E.se(t, sn + 1.6, sn + 3.0), { w: 3, head: 13, seed: 950 + i });
      });
    });
    // end card
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '14 · Işık Geçer mi?', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.4.2 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme; genelleme', from: 'record', to: 'sum', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Afiş görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [1720, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

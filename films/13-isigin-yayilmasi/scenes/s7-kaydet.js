// SAHNE 7 — Kaydet (FB.5.4.1 b: verileri kaydeder, c: açıklar) + Sıra sende + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, arrowHead, wash } = INK;
  const F = F13, RED = F.RED;
  const ITEMS = [
    'Işık, bir ışık kaynağından çıkar.',
    'Düz ruloda lamba görüldü, bükükte görülmedi.',
    'Karanlık kutuda mumun görüntüsü ters oluştu.',
    'Lambanın çevresindeki bütün kartlar aydınlandı.',
    'Işığın yolunu ok uçlu düz çizgiyle (ışınla) çizerim.'
  ];

  function page(ctx, t) {
    const sr = E.s('record'), ss = E.s('sum');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Işığın Yolculuğu', 290, 170, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 192], [700, 204], [1180, 188], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.8 + i * 1.3, y = 290 + i * 92;
      const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 322, y - 20, 42, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 375, y, E.seg(t, at, at + 1.1), { size: 42 });
    });
    // my drawing: rays in all directions from a source
    const dk = E.se(t, sr + 3.0, sr + 5.0);
    if (dk > 0) {
      const c = [1500, 420];
      F.bulb(ctx, c[0], c[1], 0.8, 1, { glow: false });
      F.burst(ctx, c[0], c[1], 12, 36, 175, dk, { w: 2.8, head: 12, heads: [0.65] });
      INK.label(ctx, 'benim çizimim', c[0], c[1] + 230, { size: 34, weight: 700, align: 'center', alpha: dk });
    }
    // conclusion
    const ck = E.se(t, ss + 0.2, ss + 1.0);
    if (ck > 0) {
      const b = [[290, 745], [1640, 738], [1646, 850], [296, 858], [290, 745]];
      ctx.save(); ctx.globalAlpha = ck; P.fillPts(ctx, b, '#F6E7B8', 0.9); stroke(ctx, b, { w: 3, closed: true, color: F.AMB }); ctx.restore();
      P.write(ctx, 'Işık, kaynağından her yöne ve doğrusal bir yolla yayılır.', 968, 815, E.seg(t, ss + 0.6, ss + 2.4), { size: 50, align: 'center' });
    }
    DAMLA.draw(ctx, { x: 1690, y: 1000, s: 0.8, view: 'q3', flip: true, expr: t > ss + 2.4 ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: t > ss + 2.4 ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > ss + 2.4 ? null : 'notebook' });
  }

  function tubeIcon(ctx, x, y, bent) { // small paper-roll sketch
    const pts = bent ? P.bez([x, y], [x + 90, y], [x + 120, y - 80], 20) : [[x, y], [x + 150, y]];
    stroke(ctx, pts, { w: 34, color: '#E6DCC6', dry: false, taper: 0 });
    stroke(ctx, pts.map(p => [p[0], p[1] - 17]), { w: 2.2, dry: false }); stroke(ctx, pts.map(p => [p[0], p[1] + 17]), { w: 2.2, dry: false });
  }

  function outro(ctx, t) {
    const stk = E.s('task'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
    // task card
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 300, 170, 1320, 620, { seed: 901 });
      tubeIcon(c, 420, 470, false); P.write(c, 'düz', 495, 540, 1, { size: 36, align: 'center' });
      tubeIcon(c, 420, 680, true); P.write(c, 'bükülmüş', 470, 750, 1, { size: 36, align: 'center' });
      P.write(c, 'Sıra sende!', 700, 290, E.seg(t, stk + 0.4, stk + 1.4), { size: 72, color: '#8A4A10' });
      P.write(c, 'Kâğıttan bir rulo yap.', 700, 400, E.seg(t, stk + 1.2, stk + 2.4), { size: 50 });
      P.write(c, 'Arkadaşına önce düz, sonra', 700, 480, E.seg(t, stk + 2.2, stk + 3.4), { size: 50 });
      P.write(c, 'bükülmüş ruloyla bak.', 700, 550, E.seg(t, stk + 3.0, stk + 4.2), { size: 50 });
      P.write(c, 'Gördüklerini ışın çizerek kaydet.', 700, 650, E.seg(t, stk + 4.0, stk + 5.4), { size: 50 });
    });
    DAMLA.draw(ctx, { x: 1720, y: 900, s: 1.1, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // next film teaser
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      E.inkText(c, 'Sıradaki gözlem:', 960, 210, t, sn + 0.3, 1e9, { size: 48, align: 'center', weight: 400 });
      E.inkText(c, '14 · Işık Geçer mi?', 960, 295, t, sn + 0.8, 1e9, { size: 72, align: 'center' });
      const L = [330, 600];
      F.bulb(c, L[0], L[1], 1.2, 1);
      const objs = [['cam', 780], ['buzlu cam', 1110], ['kitap', 1440]];
      objs.forEach(([name, x], i) => {
        const k = E.se(t, sn + 1.2 + i * 0.5, sn + 1.8 + i * 0.5, 'out'); if (k <= 0) return;
        c.save(); c.globalAlpha = k;
        if (i === 2) { const b = [[x - 70, 520], [x + 70, 520], [x + 70, 690], [x - 70, 690], [x - 70, 520]]; P.fillPts(c, b, '#8A6A45', 0.8); stroke(c, b, { w: 3, closed: true }); line(c, [x - 52, 520], [x - 52, 690], { w: 2 }); }
        else { const b = [[x - 18, 480], [x + 18, 480], [x + 18, 720], [x - 18, 720], [x - 18, 480]]; P.fillPts(c, b, i ? '#DDE6EA' : '#EAF3F7', 0.9); if (i) { for (let j = 0; j < 40; j++) INK.inkDot(c, x - 12 + (j * 37 % 24), 490 + (j * 53 % 220), 1.4, { alpha: 0.3 }); } stroke(c, b, { w: 3, closed: true, color: PAL.water }); }
        INK.label(c, name, x, 790, { size: 40, weight: 700, align: 'center' });
        INK.label(c, '?', x + 50, 470, { size: 60, weight: 700, align: 'center', color: '#8A4A10' });
        c.restore();
      });
      F.ray(c, [370, 600], [700, 600], E.se(t, sn + 1.0, sn + 2.2), { w: 3.4 });
    });
    // end card
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '13 · Işığın Yolculuğu', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.4.1 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme; genelleme', from: 'record', to: 'sum', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Rulo görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [1720, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

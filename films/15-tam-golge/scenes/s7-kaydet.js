// SAHNE 7 — Kaydet (FB.5.4.3 b: verileri kaydeder, c: değişkeni açıklar) + Sıra sende + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, arrowHead, wash } = INK;
  const F = F15, RED = F.RED;
  const ITEMS = [
    'Opak cisim ışığı geçirmez; arkasında tam gölge oluşur.',
    'Tam gölge, ışık almayan karanlık bölgedir.',
    'Tam gölgenin şekli cismin şekline benzer.',
    'Tam gölgeyi, kaynaktan kenarlara çizilen ışınlarla çizerim.',
    'Ekran sabitken cisim kaynağa yaklaştıkça gölge büyür.'
  ];  function page(ctx, t) {
    const sr = E.s('record'), ss = E.s('sum');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Tam Gölge', 290, 170, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
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
      P.write(ctx, 'mesafe azalır → tam gölge büyür', 968, 818, E.seg(t, ss + 0.6, ss + 2.2), { size: 52, align: 'center' });
    }
    DAMLA.draw(ctx, { x: 1690, y: 1000, s: 0.8, view: 'q3', flip: true, expr: t > ss + 2.4 ? 'happy' : 'neutral', look: [-0.7, -0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: t > ss + 2.4 ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > ss + 2.4 ? null : 'notebook' });
  }

  function tangramCard(ctx, x, y) {
    const pc = F.card(ctx, x, y, 300, 400, { seed: 905 });
    ['A', 'B', 'M', 's1', 's2', 'Q', 'R'].forEach((k, i) => F.poly(ctx, F.CAT[k], x + 170, y + 190, 95, F.TCOL[k], { w: 1.6, seed: 910 + i }));
    INK.label(ctx, 'tangramım', x + 150, y + 360, { size: 34, weight: 700, align: 'center' });
  }

  function outro(ctx, t) {
    const stk = E.s('task'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.08)'; ctx.fillRect(0, 0, E.W, E.H);
    // task card
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 300, 170, 1320, 620, { seed: 901 });
      tangramCard(c, 370, 280);
      P.write(c, 'Sıra sende!', 760, 290, E.seg(t, stk + 0.4, stk + 1.4), { size: 72, color: '#8A4A10' });
      P.write(c, 'Opak kartondan tangram yap,', 760, 395, E.seg(t, stk + 1.2, stk + 2.4), { size: 48 });
      P.write(c, 'gölgesini ışınlarla çiz.', 760, 460, E.seg(t, stk + 2.2, stk + 3.4), { size: 48 });
      P.write(c, 'Araştır:', 760, 565, E.seg(t, stk + 3.6, stk + 4.2), { size: 48, color: '#8A4A10' });
      P.write(c, 'Divriği Ulu Camii ve Darüşşifası’nın', 760, 625, E.seg(t, stk + 4.2, stk + 5.6), { size: 42 });
      P.write(c, 'kapısında beliren gölge nasıl oluşur?', 760, 682, E.seg(t, stk + 5.4, stk + 6.8), { size: 42 });
      INK.label(c, 'ek araştırma: güneş saati nasıl çalışır?', 760, 750, { size: 34, alpha: 0.7 * E.se(t, stk + 6.8, stk + 7.6) });
    });
    DAMLA.draw(ctx, { x: 1720, y: 900, s: 1.1, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // next film teaser
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      E.inkText(c, 'Sıradaki gözlem:', 960, 210, t, sn + 0.3, 1e9, { size: 48, align: 'center', weight: 400 });
      E.inkText(c, '16 · Maddenin Tanecikli Yapısı', 960, 295, t, sn + 0.8, 1e9, { size: 72, align: 'center' });
      const k = E.se(t, sn + 1.2, sn + 2.0, 'out');
      if (k > 0) {
        c.save(); c.translate(760, 600); c.scale(P.pop(k), P.pop(k)); c.translate(-760, -600);
        const box = circlePts(760, 600, 170, 170, 60); P.fillPts(c, box, '#FBF8F1', 0.95); INK.wash(c, box, PAL.water, 0.18, 960); stroke(c, box, { w: 3, closed: true });
        const R = INK.rng(961); for (let i = 0; i < 26; i++) { const a = R() * 6.28, r = Math.sqrt(R()) * 140, x = 760 + Math.cos(a) * r + Math.sin(t * 2 + i) * 6, y = 600 + Math.sin(a) * r + Math.cos(t * 2.3 + i) * 6; P.fillPts(c, circlePts(x, y, 12, 12, 14), PAL.water, 0.8); stroke(c, circlePts(x, y, 12, 12, 14), { w: 1.6, closed: true, dry: false }); }
        c.restore();
        INK.label(c, 'tanecikler · boşluklar · hareket', 1120, 610, { size: 40, weight: 700, alpha: k });
      }
    });
    // end card
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 1; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '15 · Tam Gölge', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.4.3 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme; genelleme', from: 'record', to: 'sum', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Tangram görevi, araştırma ve sonraki konu', from: 'task', to: 'end', trFrom: [1720, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

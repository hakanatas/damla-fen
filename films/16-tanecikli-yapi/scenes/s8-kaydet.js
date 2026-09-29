// SAHNE 8 — Kaydet + Sıra sende (performans görevi özendirilir) + sonraki gözlem: Isı ve sıcaklık + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F16;
  const ITEMS = [
    'Madde: kütlesi ve hacmi olan her şey.',
    'Madde tanecikli, boşluklu ve hareketlidir.',
    'Katı: titreşim. Sıvı, gaz: titreşim, dönme, öteleme.',
    'Sıvı ve gazlar akışkandır; gazlar sıkıştırılabilir.',
    'Hâl değişince boşluk ve hareketlilik değişir.'
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 880);
    P.write(ctx, 'Gözlem Defteri · Madde', 290, 175, E.seg(t, sr + 0.2, sr + 1.3), { size: 64 });
    if (t > sr + 1.3) P.drawOn(ctx, P.bez([286, 197], [640, 208], [1000, 192], 30), E.se(t, sr + 1.3, sr + 1.8), { w: 3, color: PAL.water });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.6 + i * 1.35, y = 300 + i * 105;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 385, y, E.seg(t, at, at + 1.1), { size: 46 });
    });
    // hâl değişimi mini modeli (son satırın altında)
    const mk = E.se(t, sr + 7.4, sr + 8.2);
    if (mk > 0) E.layer(ctx, mk, c => {
      ['solid', 'liquid', 'gas'].forEach((k, i) => {
        const x = 520 + i * 300, y = 830, r = 70;
        c.save(); c.beginPath(); c.arc(x, y, r, 0, 7); c.clip(); c.fillStyle = '#F4F1E8'; c.fillRect(x - r, y - r, 2 * r, 2 * r);
        F.field(c, k, [x - r, y - r, 2 * r, 2 * r], t, { r: 10, n: 5, cols: 7, rows: 7, rows_: 0, clip: false, lift: 0, seed: 50 + i, ...(k === 'liquid' ? { rows: 6 } : {}) });
        c.restore(); stroke(c, circlePts(x, y, r, r, 40), { w: 3, closed: true, seed: 95 + i });
        if (i < 2) P.arrow(c, [x + r + 20, y], [x + 300 - r - 20, y], 1, { w: 3, head: 13 });
      });
    });
    const cheer = t > sr + 8;
    DAMLA.draw(ctx, { x: 1640, y: 1040, s: 1.15, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
  }
  function task(ctx, t) {
    const sk = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    F.card(ctx, 960, 500, 1440, 700, { seed: 240 });
    P.write(ctx, 'Sıra sende!', 330, 250, E.seg(t, sk + 0.2, sk + 1.1), { size: 76, color: '#8A4A10' });
    P.write(ctx, 'Katı, sıvı ve gazdan ikişer örnek bul;', 330, 340, E.seg(t, sk + 1.0, sk + 2.2), { size: 48 });
    P.write(ctx, 'her birinin tanecik modelini çiz.', 330, 405, E.seg(t, sk + 2.0, sk + 3.2), { size: 48 });
    ['katı', 'sıvı', 'gaz'].forEach((n, i) => {
      const k = E.se(t, sk + 3.0 + i * 0.4, sk + 3.6 + i * 0.4); if (k <= 0) return;
      const x = 520 + i * 440, y = 610;
      ctx.save(); ctx.globalAlpha = k; dashed(ctx, F.rectPts(x - 150, y - 110, x + 150, y + 110), { w: 2.4, on: 12, off: 8 });
      INK.label(ctx, n, x, y + 160, { size: 42, weight: 700, align: 'center' });
      INK.label(ctx, '?', x, y + 26, { size: 80, weight: 700, align: 'center', alpha: 0.25 });
      ctx.restore();
    });
    P.icon.pencil(ctx, 1560, 290, 1.0, -0.5);
    INK.label(ctx, 'Arkadaşlarınla karşılaştırın.', 1640, 830, { size: 34, align: 'right', alpha: 0.7 * E.se(t, sk + 5, sk + 6) });
  }
  function next(ctx, t) {
    const sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(181,85,63,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
    F.desk(ctx);
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 215, t, sn + 0.5, se + 0.3, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Isı ve Sıcaklık Aynı Şey mi?', 960, 300, t, sn + 1.0, se + 0.3, { size: 72, align: 'center' });
    F.cup(ctx, 1180, 828, 1.4); F.steam(ctx, 1180, 690, 1.2, t, { color: '#B5553F' });
    F.thermo(ctx, 1420, 800, 330, 0.3 + 0.35 * E.se(t, sn + 1, sn + 4), {});
    DAMLA.draw(ctx, { x: 760, y: 832, s: 1.5, view: 'q3', expr: 'curious', look: [0.8, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t: t * 1.5, seed: 1, arms: [[-1, 0.35], [1, 2.2]] });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '16 · Maddenin Tanecikli Yapısı', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.water });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.5.1 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }
  E.scene({ name: 'Kaydet', concept: 'Bulguları gözlem defterine kaydetme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Performans görevi: ikişer örnek, tanecik modeli', from: 'task', to: 'task', trFrom: [960, 500], draw(ctx, t) { task(ctx, t); } });
  E.scene({ name: 'Sıradaki: Isı ve sıcaklık', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [1180, 700], draw(ctx, t) { next(ctx, t); } });
})();

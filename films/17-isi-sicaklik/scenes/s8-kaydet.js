// SAHNE 8 — Kaydet + Sıra sende (kavram karikatürü çiz, Anders Celsius araştır — zenginleştirme) + sonraki: ısı alışverişi
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F17;
  const ITEMS = [
    ['Isı: bir enerji çeşidi; sıcaktan soğuğa aktarılır.', F.HEAT],
    ['Isı ölçülmez, kalorimetre kabıyla hesaplanır. J · cal', F.HEAT],
    ['Sıcaklık: ne kadar sıcak ya da soğuk olduğu.', PAL.water],
    ['Sıcaklık termometreyle ölçülür. Birimi °C', PAL.water],
    ['Aktarılan ısı madde miktarına bağlıdır.', PAL.ink]
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 880);
    P.write(ctx, 'Gözlem Defteri · Isı ve Sıcaklık', 290, 175, E.seg(t, sr + 0.2, sr + 1.3), { size: 64 });
    if (t > sr + 1.3) P.drawOn(ctx, P.bez([286, 197], [700, 208], [1150, 192], 30), E.se(t, sr + 1.3, sr + 1.8), { w: 3, color: F.HEAT });
    ITEMS.forEach(([txt, col], i) => {
      const at = sr + 1.6 + i * 1.35, y = 310 + i * 110;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 385, y, E.seg(t, at, at + 1.1), { size: 46, color: col });
    });
    const cheer = t > sr + 8;
    DAMLA.draw(ctx, { x: 1640, y: 1040, s: 1.15, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
  }
  function task(ctx, t) {
    const sk = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    F.card(ctx, 960, 500, 1440, 700, { seed: 240 });
    P.write(ctx, 'Sıra sende!', 330, 250, E.seg(t, sk + 0.2, sk + 1.1), { size: 76, color: '#8A4A10' });
    P.write(ctx, '1. Isı ve sıcaklık için kendi', 330, 345, E.seg(t, sk + 1.0, sk + 2.2), { size: 48 });
    P.write(ctx, '    kavram karikatürünü çiz.', 330, 405, E.seg(t, sk + 1.8, sk + 3.0), { size: 48 });
    P.write(ctx, '2. Anders Celsius kimdi? Araştır!', 330, 505, E.seg(t, sk + 3.2, sk + 4.4), { size: 48 });
    INK.label(ctx, '(Selsiyus) · Biruni ve Galileo da termometrenin tarihinde yer alır', 380, 560, { size: 32, alpha: 0.7 * E.se(t, sk + 4.4, sk + 5.2) });
    INK.label(ctx, 'kütüphane · güvenilir dijital kaynaklar · öğretmenin', 330, 780, { size: 32, alpha: 0.6 * E.se(t, sk + 5.2, sk + 6) });
    // mini karikatür taslağı
    const k = E.se(t, sk + 1.4, sk + 2.2);
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; dashed(ctx, F.rectPts(1280, 290, 1600, 520), { w: 2.4, on: 12, off: 8 }); F.kid(ctx, 1380, 510, 0.6, { shirt: '#9A9387', hair: 0 }); F.kid(ctx, 1510, 510, 0.6, { shirt: '#9A9387', hair: 1, flip: true }); F.speech(ctx, 1440, 340, 200, 60, [1400, 380], 1, { seed: 260 }); INK.label(ctx, '?', 1440, 356, { size: 40, weight: 700, align: 'center' }); ctx.restore(); }
    P.icon.pencil(ctx, 1660, 680, 1.0, -0.5);
  }
  function next(ctx, t) {
    const sn = E.s('next'), se = E.s('end');
    F.desk(ctx);
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 215, t, sn + 0.5, se + 0.3, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Karışınca Ne Olur? Isı Alışverişi', 960, 300, t, sn + 1.0, se + 0.3, { size: 72, align: 'center' });
    // soğuk ve sıcak su kapları
    F.water(ctx, 1080, 600, 170, 220, 150, { seed: 900 }); F.box(ctx, 1080, 600, 170, 220, { fill: false, seed: 901 });
    F.water(ctx, 1360, 600, 170, 220, 150, { seed: 902, color: '#9A6A5A' }); F.box(ctx, 1360, 600, 170, 220, { fill: false, seed: 903 }); F.steam(ctx, 1445, 590, 0.8, t, { color: F.HEAT });
    INK.label(ctx, 'soğuk', 1165, 880, { size: 40, weight: 700, align: 'center', color: PAL.water }); INK.label(ctx, 'sıcak', 1445, 880, { size: 40, weight: 700, align: 'center', color: F.HEAT });
    INK.label(ctx, '?', 1305, 560, { size: 90, weight: 700, align: 'center', alpha: E.se(t, sn + 2, sn + 3) });
    DAMLA.draw(ctx, { x: 700, y: 832, s: 1.5, view: 'q3', expr: 'curious', look: [0.8, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.2]] });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '17 · Isı ve Sıcaklık Aynı Şey mi?', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: F.HEAT });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.5.2 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }
  E.scene({ name: 'Kaydet', concept: 'Bulguları gözlem defterine kaydetme', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Kavram karikatürü + Celsius araştırması', from: 'task', to: 'task', trFrom: [960, 500], draw(ctx, t) { task(ctx, t); } });
  E.scene({ name: 'Sıradaki: Isı alışverişi', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [1300, 700], draw(ctx, t) { next(ctx, t); } });
})();

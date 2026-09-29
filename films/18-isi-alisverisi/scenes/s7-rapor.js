// SAHNE 7 — Deney raporu (ADPA ile değerlendirilebilir) + Sıra sende (farklı miktar / sanal laboratuvar) + sonraki: hâl değişimi
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F18;
  function report(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 880);
    P.write(ctx, 'Deney Raporu · Isı Alışverişi', 290, 170, E.seg(t, sr + 0.2, sr + 1.3), { size: 62 });
    if (t > sr + 1.3) P.drawOn(ctx, P.bez([286, 192], [700, 202], [1100, 188], 30), E.se(t, sr + 1.3, sr + 1.8), { w: 3, color: F.HEAT });
    const L = [
      ['Soru:', 'Soğuk ve sıcak su karışınca sıcaklık ne olur?', PAL.ink],
      ['Tahmin:', '..... °C (senin tahminin)', PAL.ink],
      ['Ölçüm:', 'soğuk 20 °C · sıcak 60 °C · karışım 39 °C', PAL.water],
      ['Açıklama:', 'Isı sıcaktan soğuğa akar → termal denge.', F.HEAT],
      ['Not:', 'Aynı tür sıvı (su) ve eşit miktar kullanıldı.', PAL.ink]
    ];
    L.forEach(([a, b, col], i) => {
      const at = sr + 1.6 + i * 1.3, y = 300 + i * 105;
      P.write(ctx, a, 300, y, E.seg(t, at, at + 0.5), { size: 44, color: '#8A4A10' });
      P.write(ctx, b, 530, y, E.seg(t, at + 0.3, at + 1.3), { size: 44, color: col });
    });
    DAMLA.draw(ctx, { x: 1660, y: 1040, s: 1.1, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
  }
  function task(ctx, t) {
    const sk = E.s('task');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    F.card(ctx, 960, 500, 1440, 700, { seed: 240 });
    P.write(ctx, 'Sıra sende!', 330, 250, E.seg(t, sk + 0.2, sk + 1.1), { size: 76, color: '#8A4A10' });
    P.write(ctx, '1. Bir yetişkinle deneyi farklı', 330, 350, E.seg(t, sk + 1.0, sk + 2.2), { size: 48 });
    P.write(ctx, '    miktarlarda su ile tekrarla.', 330, 410, E.seg(t, sk + 1.8, sk + 3.0), { size: 48 });
    P.write(ctx, '2. Ya da sanal laboratuvarda dene.', 330, 500, E.seg(t, sk + 3.0, sk + 4.2), { size: 48 });
    P.write(ctx, 'Önce tahmin et, sonra ölç ve raporla!', 330, 620, E.seg(t, sk + 4.4, sk + 5.6), { size: 44, color: F.HEAT });
    INK.label(ctx, '⚠ Sıcak su: yalnızca yetişkin eşliğinde', 330, 760, { size: 36, weight: 700, color: '#A23A2A', alpha: E.se(t, sk + 5.4, sk + 6.2) });
    // küçük kaplar: az + çok
    const k = E.se(t, sk + 1.4, sk + 2.2);
    if (k > 0) { ctx.save(); ctx.globalAlpha = k; F.water(ctx, 1300, 380, 120, 180, 60, { seed: 400 }); F.box(ctx, 1300, 380, 120, 180, { fill: false, seed: 401 }); F.water(ctx, 1470, 330, 160, 230, 190, { seed: 402, color: '#9A6A5A' }); F.box(ctx, 1470, 330, 160, 230, { fill: false, seed: 403 }); INK.label(ctx, 'az', 1360, 610, { size: 38, weight: 700, align: 'center' }); INK.label(ctx, 'çok', 1550, 610, { size: 38, weight: 700, align: 'center' }); INK.label(ctx, '?', 1455, 710, { size: 70, weight: 700, align: 'center', alpha: 0.5 }); ctx.restore(); }
  }
  function next(ctx, t) {
    const sn = E.s('next'), se = E.s('end');
    F.desk(ctx);
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 215, t, sn + 0.5, se + 0.3, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, 'Buzdan Buhara: Hâl Değişimi', 960, 300, t, sn + 1.0, se + 0.3, { size: 72, align: 'center' });
    // Damla: buz → su (ısı alınca)
    const melt = E.se(t, sn + 1.5, sn + 4.0);
    const st = melt < 0.5 ? 'ice' : 'liquid';
    DAMLA.draw(ctx, { x: 960, y: 832, s: 1.6, view: 'front', expr: melt < 0.5 ? 'surprised' : 'happy', look: [0, -0.2], blink: E.blink(t, 12), squash: E.breath(t) * (1 + 0.1 * Math.sin(Math.min(1, Math.abs(melt - 0.5) * 8) * Math.PI) * (Math.abs(melt - 0.5) < 0.12 ? 1 : 0)), t, seed: 1, state: st, arms: [[-1, 0.4], [1, 0.4]] });
    P.sun(ctx, 1560, 470, 80, t, { nrays: 16, cells: false });
    for (let i = 0; i < 2; i++) F.heatArrow(ctx, [1450, 480 + i * 60], [1150, 560 + i * 60], E.se(t, sn + 0.8, sn + 1.8), { t, w: 4, amp: 7, head: 15, seed: 410 + i });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '18 · Karışınca Ne Olur? Isı Alışverişi', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([560, 545], [960, 556], [1360, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: F.HEAT });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.5.3 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }
  E.scene({ name: 'Rapor', concept: 'Deney raporu', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { report(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Farklı miktar / sanal laboratuvar', from: 'task', to: 'task', trFrom: [960, 500], draw(ctx, t) { task(ctx, t); } });
  E.scene({ name: 'Sıradaki: Hâl değişimi', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [960, 600], draw(ctx, t) { next(ctx, t); } });
})();

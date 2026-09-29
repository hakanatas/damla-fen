// SAHNE 5 — Kaydet + süreç; SAHNE 6 — Sıra sende (molekül modeli görevi) · Sıradaki: ilk 18 element · Bitiş
(function () {
  const { PAL, stroke, circlePts } = INK;
  const F = F7M;
  const ITEMS = [
    ['Molekül: aynı ya da farklı atomların birleşmesi.', PAL.ink],
    ['Model: aynı cins atom → aynı renk ve boyut.', PAL.ink],
    ['Su molekülü bükük (≈ 104,5°), CO₂ doğrusal.', PAL.ink],
    ['Element: tek cins atom (oksijen, azot, demir, bakır).', PAL.water],
    ['Bileşik: farklı cins atom (su, karbondioksit, etil alkol).', F.BR]
  ];
  const STEPS = ['Model öner', 'Yeni kanıt', 'Modeli yenile', 'Sınıflandır'];
  function page(ctx, t) {
    const sr = E.s('record'), sm = E.s('method');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Element ve Bileşik', 290, 250, E.seg(t, sr + 0.2, sr + 1.2), { size: 58 });
    P.drawOn(ctx, P.bez([286, 272], [700, 282], [1180, 268], 30), E.se(t, sr + 1.2, sr + 1.7), { w: 3, color: PAL.water });
    const listA = 1 - E.se(t, sm - 0.2, sm + 0.5);
    if (listA > 0) E.layer(ctx, listA, c => {
      ITEMS.forEach(([s, col], i) => {
        const at = sr + 1.5 + i * 1.5, y = 350 + i * 95;
        P.check(c, 320, y - 20, 40, E.se(t, at + 0.9, at + 1.3), { w: 5 });
        P.write(c, s, 370, y, E.seg(t, at, at + 1.2), { size: 44, color: col });
      });
    });
    const chA = E.se(t, sm - 0.1, sm + 0.6);
    if (chA > 0) E.layer(ctx, chA, c => {
      const xs = [430, 770, 1110, 1450], y = 520;
      STEPS.forEach((s, i) => {
        const at = sm + 0.1 + i * 1.0, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const r = 120 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 610 + i);
        P.fillPts(c, cp, i === 1 ? '#F6E7B8' : (i === 3 ? '#D6E6EF' : '#FBF8F1')); stroke(c, cp, { w: 3.4, closed: true, seed: 620 + i });
        c.save(); c.font = '700 38px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; const [a, b] = s.split(' '); if (b) { c.fillText(a, xs[i], y - 4); c.fillText(b, xs[i], y + 40); } else c.fillText(a, xs[i], y + 14); c.restore();
        if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 128, y], [xs[i] - 128, y], ak, { w: 3, head: 13 }); }
      });
    });
    const cheer = t > sm + 4;
    F.damla(ctx, t, { x: 1660, y: 1000, s: 0.95, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], prop: cheer ? null : 'notebook', arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], seed: 6 });
  }
  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next');
    F.desk(ctx, 880, 9);
    const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (k > 0) E.layer(ctx, k, c => {
      F.card(c, 220, 180, 1700, 800, { seed: 691 });
      P.write(c, 'Sıra sende!', 300, 290, E.seg(t, sk + 0.3, sk + 1.2), { size: 72, color: F.BR });
      const L = ['1. Hamurla H₂, O₂, H₂O ve CO₂ modelleri yap.', '2. Aynı cins atoma aynı renk ve boyutu ver.', '3. Arkadaşlarının modelleriyle karşılaştır, geliştir.', '4. Her modeli element ya da bileşik diye etiketle.'];
      L.forEach((s, i) => P.write(c, s, 320, 400 + i * 85, E.seg(t, sk + 0.9 + i * 1.2, sk + 2.0 + i * 1.2), { size: 46 }));
      F.mol(c, 'H2O', 1500, 660, 0.8);
    });
    const kn = Math.min(E.se(t, sn + 0.2, sn + 1.0, 'out'), 1 - E.se(t, E.s('end'), E.s('end') + 0.8));
    if (kn > 0) E.layer(ctx, kn, c => {
      INK.label(c, 'Sıradaki gözlem:', 960, 250, { size: 48, align: 'center', alpha: 0.8 });
      INK.label(c, 'İlk 18 Element ve Periyodik Tablo', 960, 340, { size: 72, weight: 700, align: 'center' });
      const els = [['H', 1], ['He', 2], ['Li', 3], ['Be', 4], ['B', 5], ['C', 6]];
      els.forEach(([s, n], i) => { const kk = E.se(t, sn + 0.8 + i * 0.25, sn + 1.2 + i * 0.25); F.tile(c, 490 + i * 160, 480, 140, 140, s, n, null, { alpha: kk, tint: PAL.water, tintA: 0.12 }); });
      F.damla(c, t, { x: 1720, y: 880, s: 1.0, flip: true, expr: 'curious', look: [-0.8, -0.1], seed: 7, arms: [[-1, 0.35], [1, 1.9]] });
    });
    F.endCard(ctx, t, '15 · Molekül Modelleri: Element mi, Bileşik mi?', 'FB.7.5.3 · FB.7.5.4');
  }
  E.scene({ name: 'Kaydet', concept: 'Bilgileri kaydetme; süreç', from: 'record', to: 'method', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Molekül modeli görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 480], draw(ctx, t) { outro(ctx, t); } });
})();

// SAHNE 6 — Kaydet + bilimsel süreç; SAHNE 7 — Sıra sende (poster görevi) · Sıradaki · Bitiş
(function () {
  const { PAL, stroke, circlePts } = INK;
  const F = F7M;
  const ITEMS = [
    'Madde, atom denen çok küçük taneciklerden oluşur.',
    'Çekirdek: proton (+) ve nötron (yüksüz).',
    'Elektron (−): çekirdeğin çevresinde, katmanlarda.',
    'Kütlenin neredeyse tamamı çekirdektedir.',
    'Atomun kimliğini proton sayısı belirler.',
    'Dalton → Thomson → Rutherford → Bohr → Modern'
  ];
  const STEPS = ['Soru sor', 'Bilgi topla', 'Doğrula', 'Çıkarım yap'];
  function page(ctx, t) {
    const sr = E.s('record'), sm = E.s('method');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Atom', 290, 250, E.seg(t, sr + 0.2, sr + 1.2), { size: 60 });
    P.drawOn(ctx, P.bez([286, 272], [560, 282], [860, 268], 30), E.se(t, sr + 1.2, sr + 1.7), { w: 3, color: PAL.water });
    const listA = 1 - E.se(t, sm - 0.2, sm + 0.5);
    if (listA > 0) E.layer(ctx, listA, c => {
      ITEMS.forEach((s, i) => {
        const at = sr + 1.6 + i * 1.5, y = 340 + i * 88;
        P.check(c, 320, y - 20, 40, E.se(t, at + 0.9, at + 1.3), { w: 5 });
        P.write(c, s, 370, y, E.seg(t, at, at + 1.2), { size: 44, color: i === 5 ? PAL.water : PAL.ink });
      });
    });
    const chA = E.se(t, sm - 0.1, sm + 0.6);
    if (chA > 0) E.layer(ctx, chA, c => {
      const xs = [430, 770, 1110, 1450], y = 520;
      STEPS.forEach((s, i) => {
        const at = sm + 0.1 + i * 1.1, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const r = 120 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 610 + i);
        P.fillPts(c, cp, i === 3 ? '#D6E6EF' : '#FBF8F1'); stroke(c, cp, { w: 3.4, closed: true, seed: 620 + i });
        c.save(); c.font = '700 40px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; const [a, b] = s.split(' '); if (b) { c.fillText(a, xs[i], y - 4); c.fillText(b, xs[i], y + 42); } else c.fillText(a, xs[i], y + 18); c.restore();
        if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 128, y], [xs[i] - 128, y], ak, { w: 3, head: 13 }); }
      });
      E.inkText(c, 'Bilim böyle ilerler!', 940, 770, t, sm + 4.6, 1e9, { size: 60, align: 'center' });
    });
    const cheer = t > sm + 4.4;
    F.damla(ctx, t, { x: 1660, y: 1000, s: 0.95, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], prop: cheer ? null : 'notebook', arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], seed: 6 });
  }
  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next');
    F.desk(ctx, 880, 9);
    const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (k > 0) E.layer(ctx, k, c => {
      F.card(c, 260, 180, 1660, 800, { seed: 691 });
      P.write(c, 'Sıra sende!', 340, 290, E.seg(t, sk + 0.3, sk + 1.2), { size: 72, color: F.BR });
      const L = ['1. Güvenilir kaynaklardan atom modellerini araştır.', '2. Her modeli çiz; bilim insanını ve yılını yaz.', '3. Modeller arasındaki yeni kanıtları oklarla göster.', '4. Posterini sınıfta sun, sorulara açık ol.'];
      L.forEach((s, i) => P.write(c, s, 360, 400 + i * 85, E.seg(t, sk + 1.0 + i * 1.3, sk + 2.2 + i * 1.3), { size: 46 }));
      INK.label(c, 'poster · afiş · dijital sunu', 360, 750, { size: 34, alpha: 0.7 * E.se(t, sk + 6.2, sk + 7) });
    });
    const kn = Math.min(E.se(t, sn + 0.2, sn + 1.0, 'out'), 1 - E.se(t, E.s('end'), E.s('end') + 0.8));
    if (kn > 0) E.layer(ctx, kn, c => {
      INK.label(c, 'Sıradaki gözlem:', 960, 250, { size: 48, align: 'center', alpha: 0.8 });
      INK.label(c, 'Molekül Modelleri: Element mi, Bileşik mi?', 960, 340, { size: 70, weight: 700, align: 'center' });
      F.mol(c, 'H2O', 640, 600, 1.2); F.mol(c, 'O2', 1000, 600, 1.1); F.mol(c, 'CO2', 1380, 600, 1.0);
      INK.label(c, 'H₂O', 640, 760, { size: 40, weight: 700, align: 'center' }); INK.label(c, 'O₂', 1000, 760, { size: 40, weight: 700, align: 'center' }); INK.label(c, 'CO₂', 1380, 760, { size: 40, weight: 700, align: 'center' });
      F.damla(c, t, { x: 1720, y: 880, s: 1.0, flip: true, expr: 'curious', look: [-0.8, -0.1], seed: 7, arms: [[-1, 0.35], [1, 1.9]] });
    });
    F.endCard(ctx, t, '14 · Atomun İçine Yolculuk', 'FB.7.5.1 · FB.7.5.2');
  }
  E.scene({ name: 'Kaydet', concept: 'Bilgileri kaydetme; bilimsel süreç', from: 'record', to: 'method', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Poster görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 480], draw(ctx, t) { outro(ctx, t); } });
})();

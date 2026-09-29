// SAHNE 8 — Kaydet; SAHNE 9 — Sıra sende (taka tasarımı) · Sıradaki: İletken mi, Yalıtkan mı? · Bitiş
(function () {
  const { PAL, stroke } = INK;
  const F = F618, BR = '#8A4A10';
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 740);
    P.write(ctx, 'Gözlem Defteri · Buz ve Su', 290, 250, E.seg(t, sr + 0.2, sr + 1.2), { size: 58 });
    const L = [
      ['su: 1 g/cm³ · buz: 100 ÷ 109 ≈ 0,92 g/cm³', PAL.water],
      ['Su donunca kütlesi aynı kalır, hacmi artar.', PAL.ink],
      ['Buz sudan az yoğundur → suda yüzer.', PAL.ink],
      ['Göller yüzeyden donar; derindeki canlılar yaşar.', PAL.life],
      ['Model: tekne + içindeki hava birlikte < 1 g/cm³ → yüzer.', BR]
    ];
    L.forEach(([s, col], i) => {
      const at = sr + 1.0 + i * 1.4, y = 350 + i * 95;
      P.check(ctx, 320, y - 22, 40, E.se(t, at + 0.9, at + 1.3), { w: 6, color: PAL.life });
      P.write(ctx, s, 370, y, E.seg(t, at, at + 1.1), { size: 44, color: col });
    });
    F.damla(ctx, t, { x: 1640, y: 1000, s: 0.95, flip: true, expr: t > sr + 7.5 ? 'happy' : 'neutral', look: [-0.7, 0.3], prop: t > sr + 7.5 ? null : 'notebook', arms: t > sr + 7.5 ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], seed: 6 });
  }
  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
    F.desk(ctx, 860, 9);
    const k = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (k > 0) E.layer(ctx, k, c => {
      F.card(c, 300, 180, 1620, 800, { seed: 1891 });
      P.write(c, 'Sıra sende!', 380, 290, E.seg(t, sk + 0.3, sk + 1.2), { size: 72, color: BR });
      const T = ['1. Hayal et, plan yap: kolay bulunan malzemelerle bir taka.', '2. Suda dene: kaç misket taşıyabiliyor?', '3. Arkadaşlarının modelleriyle karşılaştır.', '4. Tasarımını geliştir ve sınıfa sun.'];
      T.forEach((s, i) => P.write(c, s, 400, 400 + i * 80, E.seg(t, sk + 1.2 + i * 1.4, sk + 2.4 + i * 1.4), { size: 44 }));
      INK.label(c, 'Deneyden sonra ortamı temiz bırak.', 400, 745, { size: 34, alpha: 0.7 * E.se(t, sk + 7.0, sk + 7.8) });
      F.clayBoat(c, 1400, 740, 200, 60, { load: (cc, x, fy) => { F.marble(cc, x - 26, fy - 11); F.marble(cc, x, fy - 11); F.marble(cc, x + 26, fy - 11); } });
    });
    const kn = Math.min(E.se(t, sn + 0.2, sn + 1.0, 'out'), 1 - E.se(t, se, se + 0.8));
    if (kn > 0) E.layer(ctx, kn, c => {
      INK.label(c, 'Sıradaki gözlem:', 960, 250, { size: 48, align: 'center', alpha: 0.8 });
      INK.label(c, 'İletken mi, Yalıtkan mı?', 960, 340, { size: 76, weight: 700, align: 'center' });
      // pil + ampul simgesi
      const bat = F.rect(760, 560, 900, 640); P.fillPts(c, bat, '#C9A04A'); stroke(c, bat, { w: 3, closed: true, seed: 2091 });
      P.fillPts(c, F.rect(900, 585, 915, 615), PAL.ink, 0.8);
      const bulb = INK.circlePts(1120, 520, 50, 56, 30); P.fillPts(c, bulb, '#F6E7B8'); stroke(c, bulb, { w: 3, closed: true, seed: 2092 });
      P.fillPts(c, F.rect(1098, 572, 1142, 610), '#A7A9AE'); stroke(c, F.rect(1098, 572, 1142, 610), { w: 2.4, closed: true, dry: false });
      INK.line(c, [915, 600], [1100, 610], { w: 3, bend: 0.1 }); INK.line(c, [760, 600], [1140, 610], { w: 3, bend: -0.25 });
      F.damla(c, t, { x: 1420, y: 862, s: 1.1, flip: true, expr: 'curious', look: [-0.8, 0], seed: 7, arms: [[-1, 0.35], [1, 1.9]] });
    });
    F.endCard(ctx, t, '18 · Buz Neden Yüzer?', 'FB.6.5.5 · FB.6.5.6');
  }
  E.scene({ name: 'Kaydet', concept: 'Verileri kaydetme; çıkarım', from: 'record', to: 'record', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Taka tasarımı ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 480], draw(ctx, t) { outro(ctx, t); } });
})();

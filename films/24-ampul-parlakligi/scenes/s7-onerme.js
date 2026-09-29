// SAHNE 7 — Tekrar (D3.2) + dijital deney düzeneği (güvenilir kaynak) · önermeler (d) · SAHNE 8 — Sıra sende + sıradaki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  function bg(ctx) { ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H); }
  function strip(ctx, t, x, y, vary, fixed, k0) {
    for (let i = 0; i < 3; i++) {
      const k = E.se(t, k0 + i * 0.3, k0 + i * 0.3 + 0.4); if (k <= 0) continue;
      const nn = vary === 'pil' ? i + 1 : fixed, mm = vary === 'pil' ? fixed : i + 1, b = F24.B(nn, mm);
      ctx.save(); ctx.globalAlpha = k; CK.bulb(ctx, x + i * 150, y + 40, 0.5, b, t, { rays: false }); INK.label(ctx, (i + 1) + ' ' + vary, x + i * 150, y + 84, { size: 28, weight: 700, align: 'center' }); ctx.restore();
      F24.meter(ctx, x + i * 150 - 50, y + 96, 100, b, k);
    }
  }
  E.scene({
    name: 'Önermeler', concept: 'Tekrar, dijital deney, önermeler', from: 'repeat', to: 'prop2', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('repeat'), sp = E.s('prop'), s2 = E.s('prop2');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      const out = E.se(t, sp - 0.3, sp + 0.5);
      // --- tekrar ---
      if (out < 1) E.layer(ctx, 1 - out, c => {
        P.write(c, 'Tekrarla ve karşılaştır', 300, 215, E.seg(t, sr + 0.2, sr + 1.4), { size: 56 });
        INK.label(c, 'Deney 1 (1 ampul)', 300, 310, { size: 36, weight: 700, alpha: E.se(t, sr + 0.6, sr + 1.0) });
        strip(c, t, 360, 385, 'pil', 1, sr + 0.8);
        INK.label(c, 'Deney 2 (2 pil)', 300, 580, { size: 36, weight: 700, alpha: E.se(t, sr + 1.2, sr + 1.6) });
        strip(c, t, 360, 655, 'ampul', 2, sr + 1.4);
        // tekrar işaretleri
        ['1. tekrar', '2. tekrar'].forEach((s, i) => {
          const k = E.se(t, sr + 2.6 + i * 0.8, sr + 3.1 + i * 0.8); if (k <= 0) return;
          INK.label(c, s, 860, 420 + i * 60, { size: 34, alpha: k }); P.check(c, 1010, 406 + i * 60, 30, k, { w: 5, color: PAL.life });
          INK.label(c, s, 860, 690 + i * 60, { size: 34, alpha: k }); P.check(c, 1010, 676 + i * 60, 30, k, { w: 5, color: PAL.life });
        });
        INK.label(c, 'aynı sonuç', 1070, 450, { size: 34, weight: 700, color: '#5C7230', alpha: E.se(t, sr + 4.2, sr + 4.8) });
        INK.label(c, 'aynı sonuç', 1070, 720, { size: 34, weight: 700, color: '#5C7230', alpha: E.se(t, sr + 4.2, sr + 4.8) });
        // dijital deney düzeneği
        const kd = E.se(t, sr + 4.8, sr + 5.5, 'out');
        if (kd > 0) {
          c.save(); c.translate(1470, 560); c.scale(P.pop(kd), P.pop(kd));
          P.icon.laptop(c, 0, -40, 1.4);
          c.restore();
          P.write(c, 'dijital deney düzeneği', 1470, 690, E.seg(t, sr + 5.4, sr + 6.4), { size: 34, align: 'center' });
          P.write(c, '(güvenilir kaynak)', 1470, 735, E.seg(t, sr + 6.0, sr + 7.0), { size: 30, weight: 400, align: 'center' });
          P.check(c, 1570, 460, 40, E.se(t, sr + 6.8, sr + 7.3), { w: 6, color: PAL.life });
        }
      });
      // --- önermeler ---
      if (out > 0) E.layer(ctx, out, c => {
        P.write(c, 'Önermelerim', 300, 215, E.seg(t, sp + 0.2, sp + 1.2), { size: 60 });
        const box = (y, at, txt, vary, fixed, arrow) => {
          const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(960, y); c.scale(P.pop(k), P.pop(k));
          CK.card(c, -680, -150, 1360, 290, { fill: '#F6E7B8', seed: 90 + y });
          c.restore();
          strip(c, t, 440, y - 20, vary, fixed, at + 1.6);
          P.write(c, txt, 330, y - 92, E.seg(t, at + 0.4, at + 2.2), { size: 44 });
          INK.label(c, arrow, 1000, y + 50, { size: 48, weight: 700, color: '#8A4A10', alpha: E.se(t, at + 2.6, at + 3.2) });
        };
        box(420, sp + 0.6, 'Pil sayısı artarsa ampulün parlaklığı artar.', 'pil', 1, 'pil ↑  →  parlaklık ↑');
        box(750, s2 + 0.2, 'Ampul sayısı artarsa her ampulün parlaklığı azalır.', 'ampul', 2, 'ampul ↑  →  parlaklık ↓');
      });
      ctx.restore();
    }
  });

  // basit atık simgeleri (sonraki film tanıtımı)
  function bottle(ctx, x, y) { const b = [[x - 26, y], [x - 26, y - 110], [x - 12, y - 140], [x - 12, y - 165], [x + 12, y - 165], [x + 12, y - 140], [x + 26, y - 110], [x + 26, y], [x - 26, y]]; P.fillPts(ctx, b, PAL.water, 0.25); stroke(ctx, b, { w: 3, closed: true }); }
  function can(ctx, x, y) { const b = [[x - 34, y], [x - 34, y - 100], [x + 34, y - 100], [x + 34, y], [x - 34, y]]; P.fillPts(ctx, b, '#9A9387', 0.5); stroke(ctx, b, { w: 3, closed: true }); stroke(ctx, circlePts(x, y - 100, 34, 8, 24), { w: 2.4, closed: true }); }
  function paper(ctx, x, y) { const b = [[x - 50, y], [x - 40, y - 120], [x + 44, y - 124], [x + 50, y - 4], [x - 50, y]]; P.fillPts(ctx, b, PAL.white); stroke(ctx, b, { w: 3, closed: true }); for (let i = 0; i < 4; i++) line(ctx, [x - 30, y - 96 + i * 22], [x + 30, y - 98 + i * 22], { w: 1.4, dry: false, alpha: 0.5 }); }
  function recycle(ctx, x, y, r, t) {
    for (let i = 0; i < 3; i++) { const a0 = t * 0.4 + i * 2.094; const pts = P.arc(x, y, r, a0, a0 + 1.6, 20); stroke(ctx, pts, { w: 7, color: PAL.life, dry: false }); INK.arrowHead(ctx, pts[17], pts[20], 18, { w: 6, color: PAL.life }); }
  }
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi ve sonraki film', from: 'yourturn', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sy = E.s('yourturn'), sn = E.s('next');
      ctx.save();
      CK.table(ctx, 840);
      const ky = Math.min(E.se(t, sy + 0.1, sy + 0.8, 'out'), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (ky > 0) E.layer(ctx, ky, c => {
        CK.card(c, 300, 140, 1320, 640, { seed: 200 });
        P.write(c, 'Sıra sende!', 390, 250, E.seg(t, sy + 0.4, sy + 1.4), { size: 76, color: '#8A4A10' });
        const tasks = [['Grubunla tahminini yaz.', sy + 1.4], ['Pil ya da ampul sayısını değiştir; gerisini aynı tut.', sy + 3.0], ['Gözle, kaydet, açıkla. Deneyi tekrarla.', sy + 4.8]];
        tasks.forEach(([txt, at], i) => {
          const y = 370 + i * 100, k = E.se(t, at, at + 0.6); if (k <= 0) return;
          INK.label(c, String(i + 1) + '.', 410, y, { size: 46, weight: 700, alpha: k });
          P.write(c, txt, 470, y, E.seg(t, at + 0.1, at + 1.4), { size: 44 });
        });
        P.write(c, '⚠ Yalnızca pil · yetişkin eşliğinde', 390, 700, E.seg(t, sy + 6.6, sy + 7.8), { size: 38, color: CK.RED });
      });
      const kn = E.se(t, sn + 0.3, sn + 1.0);
      if (kn > 0) E.layer(ctx, kn, c => {
        bottle(c, 620, 838); can(c, 760, 838); paper(c, 900, 838);
        recycle(c, 1230, 640, 110, t);
      });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.8, E.s('end') + 0.5, { size: 46, align: 'center', weight: 400 });
      E.inkText(ctx, '25 · Atıklarımızı Tanıyalım', 960, 270, t, sn + 1.4, E.s('end') + 0.5, { size: 64, align: 'center' });
      DAMLA.draw(ctx, { x: 1700, y: 842, s: 1.15, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 2.4 + 0.3 * Math.sin(t * 7)], [1, 0.4]] });
      ctx.restore();
      CK.endCard(ctx, t, 24, 'Ampulün Parlaklığı: Hipotez Kuralım', 'FB.5.6.3');
    }
  });
})();

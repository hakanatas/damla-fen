// SAHNE 4 — Tanım (FB.7.2.1 a): iki şart; biri eksikse iş yok; günlük dildeki iş ≠ fiziksel iş (OB1)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F7E;
  function cond(ctx, x0, y0, x1, y1, n, lines, k, seed, crossed) {
    if (k <= 0) return;
    E.layer(ctx, k, c => {
      F.card(c, x0, y0, x1, y1, { seed });
      const cc = circlePts(x0 + 50, y0 + 58, 28, 28, 24); P.fillPts(c, cc, PAL.light, 0.6); stroke(c, cc, { w: 2.4, closed: true, seed: seed + 1 });
      F.txt(c, String(n), x0 + 50, y0 + 72, { size: 38, align: 'center' });
      lines.forEach((l, i) => F.txt(c, l, x0 + 100, y0 + 76 + i * 56, { size: 40 }));
      if (crossed > 0) { c.save(); c.globalAlpha *= 0.85; P.drawOn(c, P.bez([x0 + 20, y1 - 20], [(x0 + x1) / 2, (y0 + y1) / 2 + 10], [x1 - 20, y0 + 20], 20), crossed, { w: 7, color: '#6B5236' }); c.restore(); }
    });
  }
  E.scene({
    name: 'Tanım', concept: 'Fiziksel anlamda işin nitelikleri', from: 'define', to: 'both', trFrom: [960, 400],
    draw(ctx, t) {
      const sd = E.s('define'), sb = E.s('both');
      // şart kartları: "both" sırasında sırayla biri eksik gösterilir
      const c1 = E.se(t, sb + 5.2, sb + 5.8) * (1 - E.se(t, sb + 8.0, sb + 8.5));
      const c2 = E.se(t, sb + 2.4, sb + 3.0) * (1 - E.se(t, sb + 5.0, sb + 5.4));
      cond(ctx, 130, 240, 760, 440, 1, ['Kuvvet uygulanır.'], E.se(t, sd + 1.0, sd + 1.8, 'out'), 4400, c1);
      cond(ctx, 880, 240, 1610, 440, 2, ['Cisim, kuvvetin', 'doğrultusunda yer değiştirir.'], E.se(t, sd + 3.4, sd + 4.2, 'out'), 4410, c2);
      if (t > sd + 4.2) { ctx.save(); ctx.globalAlpha *= E.se(t, sd + 4.2, sd + 4.8); F.txt(ctx, '+', 820, 362, { size: 80, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      const rk = E.se(t, sd + 5.6, sd + 6.4, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        P.arrow(c, [865, 470], [865, 540], 1, { w: 3, head: 14 });
        F.tag(c, 'fiziksel anlamda iş yapılır', 865, 612, { size: 50, seed: 4420, fill: '#F6E7B8' });
      });
      // biri eksikse
      const ex = [[sb + 2.6, 'duvar: kuvvet var, yer değiştirme yok'], [sb + 5.4, 'taşıma: kuvvet ↑, hareket → (dik)']];
      ex.forEach(([at, txt], i) => {
        const k = E.se(t, at, at + 0.6); if (k <= 0) return;
        const y = 730 + i * 86;
        P.cross(ctx, 200, y - 14, 18, k, { w: 5 });
        P.write(ctx, txt, 250, y, E.seg(t, at, at + 1.2), { size: 42 });
        P.write(ctx, '→ iş yok', 1030, y, E.seg(t, at + 1.0, at + 1.6), { size: 42, color: '#6B5236' });
      });
      DAMLA.draw(ctx, { x: 1760, y: 890, s: 0.95, view: 'q3', flip: true, expr: t > sd + 6 ? 'happy' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 1,
        arms: [[-1, [-100, -150]], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Günlük dil ve fizik', concept: 'Günlük dildeki iş ile fiziksel iş farklıdır', from: 'daily', to: 'daily', trFrom: [960, 540],
    draw(ctx, t) {
      const s = E.s('daily');
      // sol: günlük dil
      const lk = E.se(t, s + 0.3, s + 1.0, 'out');
      if (lk > 0) E.layer(ctx, lk, c => {
        F.card(c, 150, 200, 820, 760, { seed: 4450 });
        F.txt(c, 'Günlük dilde iş', 485, 290, { size: 54, align: 'center' });
        P.icon.books(c, 380, 520, 1.3);
        P.icon.pencil(c, 600, 540, 1.0, -0.5);
        F.txt(c, 'ders çalışmak, emek, çaba', 485, 700, { size: 40, align: 'center', alpha: 0.85 });
      });
      const rk = E.se(t, s + 2.4, s + 3.1, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 1100, 200, 1770, 760, { seed: 4460 });
        F.txt(c, 'Fizikte iş', 1435, 290, { size: 54, align: 'center' });
        F.floor(c, 560, 21, 1140, 1730, 600);
        const m = E.se(t, s + 3.0, s + 5.0, 'sine');
        F.box(c, 1290 + 200 * m, 560, 130, 110, 4461);
        F.vec(c, [1250 + 200 * m, 400], [1370 + 200 * m, 400], 1, { label: 'kuvvet', ly: -18, size: 32 });
        F.disp(c, [1290, 590], [1490, 590], m, { label: 'yer değiştirme', ly: 40, size: 32 });
        F.txt(c, 'kuvvet + yer değiştirme', 1435, 700, { size: 40, align: 'center', alpha: 0.85 });
      });
      if (t > s + 4.4) { ctx.save(); ctx.globalAlpha *= E.se(t, s + 4.4, s + 5.0); F.txt(ctx, '≠', 960, 520, { size: 150, align: 'center', color: '#8A4A10', font: 'Fraunces' }); ctx.restore(); }
      DAMLA.draw(ctx, { x: 960, y: 890, s: 0.85, view: 'front', expr: t > s + 5 ? 'happy' : 'thinking', look: [0, -0.4], blink: E.blink(t, 8), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, [30, -150]]] });
    }
  });
})();

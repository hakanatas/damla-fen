// SAHNE 2 — Democritus ve "atomos"; atom tanımı; öğrencinin soruları (FB.7.5.2 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F7M;
  function column(c, x, y, s) { // Antik Yunan sütunu çizimi
    c.save(); c.translate(x, y); c.scale(s, s);
    const cap = F.rect(-70, -210, 70, -186), base = F.rect(-74, 0, 74, 22);
    P.fillPts(c, F.rect(-52, -186, 52, 0), '#EFE6D2'); P.fillPts(c, cap, '#E6DCC6'); P.fillPts(c, base, '#E6DCC6');
    stroke(c, cap, { w: 2.6, closed: true, seed: 201 }); stroke(c, base, { w: 2.6, closed: true, seed: 202 });
    [-52, 52].forEach((dx, i) => line(c, [dx, -186], [dx, 0], { w: 2.6, seed: 203 + i }));
    [-30, -10, 10, 30].forEach((dx, i) => line(c, [dx, -180], [dx, -6], { w: 1.4, alpha: 0.6, dry: false, seed: 206 + i }));
    [-1, 1].forEach(sd => stroke(c, P.arc(sd * 70, -198, 14, 0, 6.28, 20), { w: 2, dry: false }));
    c.restore();
  }
  E.scene({
    name: 'Atomos', concept: 'Atom kavramının ortaya çıkışı', from: 'democ', to: 'questions', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('democ'), sa = E.s('atomdef'), sq = E.s('questions');
      F.desk(ctx, 900, 3);
      // Democritus kartı
      F.card(ctx, 180, 190, 1060, 600, { seed: 211 });
      column(ctx, 920, 540, 1.3);
      P.write(ctx, 'Democritus', 240, 280, E.seg(t, sd + 0.3, sd + 1.2), { size: 60 });
      P.write(ctx, 'yaklaşık 2400 yıl önce (MÖ 5. yüzyıl)', 240, 340, E.seg(t, sd + 1.0, sd + 2.2), { size: 36, weight: 400 });
      P.write(ctx, '“atomos”', 240, 460, E.seg(t, sd + 2.0, sd + 3.0), { size: 88, color: PAL.water });
      P.write(ctx, '= bölünemez', 250, 545, E.seg(t, sd + 3.0, sd + 4.0), { size: 52 });
      // atom tanımı: folyo → atomlar (büyütülmüş)
      const ak = E.se(t, sa, sa + 0.7, 'out');
      if (ak > 0) E.layer(ctx, ak, c => {
        const fx = 260, fy = 760;
        const g = c.createLinearGradient(fx, fy, fx + 120, fy + 60); g.addColorStop(0, '#E9ECEE'); g.addColorStop(0.5, '#B9C0C6'); g.addColorStop(1, '#DDE2E5');
        c.fillStyle = g; c.fillRect(fx, fy - 40, 120, 70); stroke(c, F.rect(fx, fy - 40, fx + 120, fy + 30), { w: 2.4, closed: true, dry: false });
        INK.label(c, 'folyo', fx + 60, fy + 70, { size: 34, align: 'center' });
        const cx = 700, cy = 740, r = 140;
        P.arrow(c, [fx + 135, fy - 10], [cx - r - 12, cy - 6], E.se(t, sa + 0.4, sa + 1.0), { w: 2.6, head: 12, bend: 20 });
        const lk = E.se(t, sa + 0.8, sa + 1.4, 'out');
        if (lk > 0) {
          const disk = circlePts(cx, cy, r, r, 60); P.fillPts(c, disk, '#FBF8F1');
          c.save(); c.beginPath(); c.arc(cx, cy, r - 3, 0, 7); c.clip();
          for (let j = -4; j <= 4; j++) for (let i = -4; i <= 4; i++) { const x = cx + i * 38 + (j % 2 ? 19 : 0), y = cy + j * 33; F.ball(c, x + Math.sin(t * 9 + i * 3 + j) * 1.2, y, 17, '#AEB6BE'); }
          c.restore(); stroke(c, disk, { w: 4, closed: true, seed: 221 });
          P.write(c, 'atomlar', cx + r + 30, cy - 20, E.seg(t, sa + 1.4, sa + 2.2), { size: 50, color: PAL.water });
          INK.label(c, '(çok büyütülmüş çizim)', cx + r + 30, cy + 30, { size: 30, alpha: 0.65 * lk });
        }
      });
      // sorular
      const qk = E.se(t, sq, sq + 0.6, 'out');
      P.bubble(ctx, 1450, 330, 760, 330, [1560, 560], qk, 3);
      if (qk > 0.6) {
        P.write(ctx, 'Atomun içinde ne var?', 1450, 300, E.seg(t, sq + 0.6, sq + 1.8), { size: 46, align: 'center' });
        P.write(ctx, 'Atom nasıl modellendi?', 1450, 370, E.seg(t, sq + 2.0, sq + 3.2), { size: 46, align: 'center' });
        INK.label(ctx, '?', 1760, 250, { size: 70, weight: 700, color: PAL.water, alpha: E.se(t, sq + 3.2, sq + 3.8) });
      }
      F.damla(ctx, t, { x: 1600, y: 890, s: 1.15, view: 'q3', flip: true, expr: t > sq ? 'thinking' : 'curious', look: [-0.8, t > sq ? -0.6 : -0.2], seed: 4, arms: t > sq ? [[-1, 0.35], [1, [30, -150]]] : [[-1, 0.35], [1, 0.4]] });
    }
  });
})();

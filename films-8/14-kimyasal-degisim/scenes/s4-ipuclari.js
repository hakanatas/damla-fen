// SAHNE 4 — Kimyasal değişimin ipuçları (gaz çıkışı, renk değişimi, ısı ve ışık, koku ve tat değişimi, çökelti) + güvenlik
// SAHNE 5 — Sekiz olayı sınıflandır (anlam çözümleme)
(function () {
  const { PAL, stroke, line, circlePts, rng } = INK;
  const U = U5;
  function beaker(ctx, cx, by, w, h, o = {}) {
    const L = cx - w / 2, R = cx + w / 2, top = by - h, wy = by - h * 0.6;
    const liq = [[L + 4, wy], [R - 4, wy], [R - 4, by - 4], [L + 4, by - 4]];
    P.fillPts(ctx, liq, o.col ?? '#C9DCE6', 0.9);
    if (o.sed) { const r = rng(1701); ctx.save(); ctx.fillStyle = '#F4F1EA'; for (let i = 0; i < 40; i++) { ctx.beginPath(); ctx.arc(L + 10 + r() * (w - 20), by - 8 - r() * 16, 3 + r() * 3, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(28,27,34,0.4)'; ctx.stroke(); } ctx.restore(); for (let i = 0; i < 8; i++) { const u = ((o.t * 0.3 + i / 8) % 1); U.ball(ctx, L + 16 + (i * 37) % (w - 30), wy + 10 + u * (h * 0.55 - 30), 4, '#F4F1EA'); } }
    if (o.bub) for (let i = 0; i < 9; i++) { const u = ((o.t * 0.8 + i / 9) % 1); ctx.save(); ctx.strokeStyle = PAL.water; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(L + 16 + (i * 29) % (w - 30), by - 10 - u * (by - 10 - wy), 5 + (i % 3) * 2, 0, 7); ctx.stroke(); ctx.restore(); }
    const glass = [[L - 6, top], [L, top + 6], [L, by], [R, by], [R, top + 6], [R + 6, top]];
    stroke(ctx, glass, { w: 3, seed: 1702 });
  }
  const CL = [
    { t: 'gaz çıkışı', d: (c, x, y, t) => beaker(c, x, y + 80, 150, 170, { bub: 1, t }) },
    { t: 'renk değişimi', d: (c, x, y, t) => { const k = 0.5 + 0.5 * Math.sin(t * 1.2); [[x - 45, '#A0522D'], [x + 45, `rgb(${Math.round(E.lerp(160, 210, k))},${Math.round(E.lerp(82, 150, k))},45)`]].forEach(([xx, col], i) => { const s = circlePts(xx, y, 38, 38, 30); P.fillPts(c, s, col); stroke(c, s, { w: 2.4, closed: true, dry: false }); }); P.arrow(c, [x - 5, y], [x + 5, y], 1, { w: 2, head: 8 }); } },
    { t: 'ısı ve ışık', d: (c, x, y, t) => U.flame(c, x, y + 70, 1.6, t, 1) },
    { t: 'koku ve tat', t2: 'değişimi', d: (c, x, y, t) => { const s = circlePts(x, y + 30, 60, 30, 30); P.fillPts(c, s, '#F4F1EA'); stroke(c, s, { w: 2.4, closed: true, dry: false }); U.steam(c, x, y + 10, 100, 90, 1, t, 1711, '#9C8A5A'); } },
    { t: 'çökelti', t2: 'oluşumu', d: (c, x, y, t) => beaker(c, x, y + 80, 150, 170, { sed: 1, t }) }
  ];
  E.scene({
    name: 'İpuçları', concept: 'Kimyasal değişimin ipuçları; güvenlik', from: 'clues', to: 'notaste', trFrom: [960, 450],
    draw(ctx, t) {
      const sc = E.s('clues'), sn = E.s('notaste');
      const dim = 1 - 0.7 * E.se(t, sn, sn + 0.5);
      E.layer(ctx, dim, c => CL.forEach((C, i) => {
        const at = sc + 0.4 + i * 1.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const x = 200 + i * 380, y = 420;
        E.layer(c, k, cc => {
          U.card(cc, x - 170, 220, 340, 520, { seed: 1720 + i });
          C.d(cc, x, y, t);
          U.txt(cc, C.t, x, 640, { size: 40, align: 'center' });
          if (C.t2) U.txt(cc, C.t2, x, 690, { size: 40, align: 'center' });
        });
      }));
      U.safety(ctx, 460, 300, 1000, ['Deneylerde maddelerin tadına bakılmaz.', 'Maddeler doğrudan koklanmaz.', 'Deneyler öğretmen eşliğinde yapılır.'], t, sn + 0.2, { step: 0.9, hi: 0 });
      U.damla(ctx, t, { x: 1790, y: 905, s: 0.7, view: 'q3', flip: true, expr: t > sn ? 'determined' : 'curious', look: [-0.8, -0.3], arms: [[-1, t > sn ? 2.3 : 1.4], [1, 0.4]] });
    }
  });
  // --- Sınıflandır
  const PHYS = [['ekmek dilimleme', 'bread'], ['kâğıt yırtma', 'sheet'], ['buz eritme', 'ice'], ['tahta kırma', 'wood'], ['çayda şekerin çözünmesi', 'sugar']];
  const CHEM = [['patates haşlama', 'pişme, yeni madde', 'potato'], ['mum yakma', 'ısı, ışık, yeni gazlar', 'candle'], ['çaya limon sıkma', 'renk değişimi', 'lemon']];
  E.scene({
    name: 'Sınıflandır', concept: 'Fiziksel ve kimyasal değişimleri sınıflama', from: 'sort', to: 'sort2', trFrom: [960, 500],
    draw(ctx, t) {
      const ss = E.s('sort'), s2 = E.s('sort2');
      U.card(ctx, 120, 170, 820, 740, { seed: 1740, tint: PAL.water, tintA: 0.08 });
      U.card(ctx, 990, 170, 820, 740, { seed: 1741, tint: U.HEAT, tintA: 0.08 });
      U.txt(ctx, 'FİZİKSEL DEĞİŞİM', 530, 240, { size: 50, align: 'center', color: PAL.water });
      U.txt(ctx, 'KİMYASAL DEĞİŞİM', 1400, 240, { size: 50, align: 'center', color: U.HEAT });
      line(ctx, [180, 268], [880, 264], { w: 2.4, dry: false, color: PAL.water }); line(ctx, [1050, 268], [1750, 264], { w: 2.4, dry: false, color: U.HEAT });
      PHYS.forEach(([nm, kind], i) => {
        const at = ss + 3.0 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const y = 370 + i * 110;
        E.layer(ctx, k, c => { c.save(); c.translate(230, y); c.scale(0.42, 0.42); U5.drawItem(c, kind, 0, 60, 1, 1, t); c.restore(); P.write(c, nm, 330, y + 14, k, { size: 42 }); });
      });
      P.write(ctx, 'madde aynı madde kalır', 530, 880, E.seg(t, ss + 7.6, ss + 8.6), { size: 36, align: 'center', color: PAL.water });
      CHEM.forEach(([nm, why, kind], i) => {
        const at = s2 + 0.4 + i * 1.3, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const y = 380 + i * 150;
        E.layer(ctx, k, c => { c.save(); c.translate(1100, y); c.scale(0.42, 0.42); U5.drawItem(c, kind, 0, 60, 1, 1, t); c.restore(); P.write(c, nm, 1200, y, k, { size: 42 }); P.write(c, '→ ' + why, 1220, y + 50, E.seg(t, at + 3.0, at + 4.0), { size: 34, color: U.HEAT }); });
      });
      P.write(ctx, 'not: mumun erimesi fiziksel, yanması kimyasal', 1400, 850, E.seg(t, s2 + 5.4, s2 + 6.8), { size: 32, align: 'center', color: U.AMBER });
    }
  });
})();

// SAHNE 4 — Olası sonuçlar; münazara ve mantıksal tutarsızlık (tek soğuk kış ≠ iklim); geçerli fikir, Paris Anlaşması
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  const CARDS = [
    ['buzullar erir', (c, x, y, t, k) => { const ice = [[x - 90, y + 40], [x - 70, y - 40 + 30 * k], [x - 10, y - 60 + 40 * k], [x + 50, y - 30 + 30 * k], [x + 90, y + 40]]; P.fillPts(c, ice, '#E6EEF2'); wash(c, ice, PAL.water, 0.3, 3200, { bleed: 1, blooms: 0 }); stroke(c, ice, { w: 2.6, dry: false }); for (let i = 0; i < 3; i++) { const d = circlePts(x - 40 + i * 40, y + 56 + (t * 30 + i * 12) % 20, 5, 7, 12); P.fillPts(c, d, PAL.water, 0.8); } }],
    ['deniz seviyesi yükselir', (c, x, y, t, k) => { U.house(c, x + 30, y + 50, 0.55); const w = 30 * k; P.fillPts(c, U.rect(x - 110, y + 50 - w, x + 110, y + 60), PAL.water, 0.45); line(c, [x - 110, y + 50 - w], [x + 110, y + 50 - w], { w: 2.4, color: PAL.water, dry: false }); P.arrow(c, [x - 80, y + 40], [x - 80, y - 20], 1, { w: 3, color: PAL.water, head: 12 }); }],
    ['kuraklık', (c, x, y) => { const p = circlePts(x, y + 20, 110, 40, 30); P.fillPts(c, p, '#D9B77E'); stroke(c, p, { w: 2.4, closed: true, dry: false }); const r = INK.rng(3201); for (let i = 0; i < 6; i++) { const sx = x - 80 + r() * 160, sy = y + r() * 40; line(c, [sx, sy], [sx + 20 + r() * 20, sy + (r() - 0.5) * 20], { w: 1.8, dry: false }); } }],
    ['sel', (c, x, y, t) => { U.cloud(c, x, y - 30, 0.45, { dark: 1 }); U.rain(c, x, y - 10, 150, 60, t, 1, { n: 10, seed: 3202 }); stroke(c, Array.from({ length: 30 }, (_, i) => [x - 110 + i * 7.6, y + 60 + Math.sin(i * 0.8 + t * 3) * 5]), { w: 3, color: PAL.water, dry: false }); }],
    ['orman yangınları', (c, x, y, t) => { U.tree(c, x - 40, y + 70, 0.55, t, { seed: 8 }); U.tree(c, x + 50, y + 70, 0.45, t, { seed: 9 }); [[x - 40, y - 10], [x + 50, y + 10]].forEach(([fx, fy], i) => { const f = circlePts(fx, fy, 18, 34 + Math.sin(t * 9 + i) * 4, 18); P.fillPts(c, f, '#E3A03A', 0.9); stroke(c, f, { w: 2, closed: true, dry: false, color: U.HEAT }); }); }],
    ['tarım, su, sağlık etkilenir', (c, x, y, t) => { for (let i = 0; i < 5; i++) { const sx = x - 80 + i * 40; line(c, [sx, y + 60], [sx + 4, y - 20], { w: 3, color: '#A89A3A', dry: false }); const hd = circlePts(sx + 4, y - 34, 7, 16, 12); P.fillPts(c, hd, '#D9B040'); stroke(c, hd, { w: 1.6, closed: true, dry: false }); } }]
  ];
  E.scene({
    name: 'Olası sonuçlar', concept: 'İnsan ve çevre üzerindeki olası etkiler', from: 'effects', to: 'effects', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('effects');
      CARDS.forEach(([name, draw], i) => {
        const at = s0 + 0.4 + i * (i < 2 ? 0.9 : 1.0), k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const col = i % 3, row = Math.floor(i / 3), x = 390 + col * 570, y = 330 + row * 330;
        ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -y);
        U.card(ctx, x - 250, y - 130, 500, 290, { seed: 3210 + i });
        draw(ctx, x, y - 20, t, E.se(t, at + 0.6, at + 3));
        U.fit(ctx, name, x, y + 130, 460, 40);
        ctx.restore();
      });
      E.inkText(ctx, '(olası sonuçlar)', 1500, 180, t, s0 + 0.5, E.e('effects') + 1, { size: 36, align: 'center', weight: 400 });
    }
  });
  E.scene({
    name: 'Münazara', concept: 'Mantıksal tutarsızlığı bulma, geçerli fikir', from: 'debate', to: 'valid', trFrom: [960, 540],
    draw(ctx, t) {
      const sD = E.s('debate'), sV = E.s('valid');
      const dk = 1 - E.se(t, sV - 0.2, sV + 0.5);
      if (dk > 0) E.layer(ctx, dk, c => {
        // konuşmacı (arkadaş) — Damla'nın sınıf arkadaşı bir buz kristali damlası
        DAMLA.draw(c, { x: 330, y: 880, s: 1.0, view: 'q3', expr: 'determined', look: [0.7, -0.2], blink: E.blink(t, 9), t, seed: 11, state: 'ice', arms: [[-1, 0.4], [1, 2.1]] });
        P.bubble(c, 620, 330, 700, 250, [400, 640], E.se(t, sD + 0.3, sD + 1.0), 3);
        if (t > sD + 0.9) { P.write(c, '“Bu kış çok kar yağdı.', 620, 310, E.seg(t, sD + 0.9, sD + 2.0), { size: 44, align: 'center' }); P.write(c, 'Demek ki Dünya ısınmıyor.”', 620, 370, E.seg(t, sD + 1.8, sD + 2.9), { size: 44, align: 'center' }); }
        if (t > sD + 4) { const xk = E.se(t, sD + 4, sD + 4.6); line(c, [320, 390], [930, 350], { w: 6, color: U.RED, alpha: xk, dry: false }); c.save(); c.globalAlpha *= xk; c.translate(870, 470); c.rotate(-0.1); U.txt(c, 'TUTARSIZ', 0, 0, { size: 46, color: U.RED, align: 'center' }); c.restore(); }
        // grafik: yıllar (temsilî)
        const gk = E.se(t, sD + 4.6, sD + 5.4);
        if (gk > 0) {
          c.save(); c.globalAlpha *= gk;
          U.card(c, 1060, 220, 780, 560, { seed: 3230 });
          line(c, [1120, 700], [1800, 700], { w: 2.6, dry: false }); line(c, [1120, 700], [1120, 290], { w: 2.6, dry: false });
          INK.arrowHead(c, [1790, 700], [1800, 700], 12, { w: 2.6 }); INK.arrowHead(c, [1120, 300], [1120, 290], 12, { w: 2.6 });
          U.txt(c, 'yıllar', 1790, 745, { size: 32, align: 'right' });
          c.save(); c.translate(1100, 500); c.rotate(-Math.PI / 2); U.txt(c, 'ortalama sıcaklık', 0, 0, { size: 30, align: 'center' }); c.restore();
          const r = INK.rng(3231); const pts = [];
          for (let i = 0; i < 26; i++) { const x = 1150 + i * 25, base = 560 - i * 7, y = base + (r() - 0.5) * 70 + (i === 21 ? 60 : 0); pts.push([x, y]); }
          pts.forEach(([x, y], i) => { const k = E.se(t, sD + 5 + i * 0.05, sD + 5.3 + i * 0.05); if (k > 0) INK.inkDot(c, x, y, i === 21 ? 9 : 6, { color: i === 21 ? '46,106,140' : '181,85,63', alpha: 0.9 * k }); });
          const tk = E.seg(t, sD + 6.8, sD + 7.8); if (tk > 0) P.drawOn(c, [[1150, 560], [1775, 385]], tk, { w: 4, color: U.HEAT });
          if (t > sD + 7.4) { c.save(); c.globalAlpha *= E.se(t, sD + 7.4, sD + 8); stroke(c, circlePts(pts[21][0], pts[21][1], 26, 26, 20), { w: 2.6, closed: true, color: PAL.water, dry: false }); U.txt(c, 'tek kış', pts[21][0], pts[21][1] + 60, { size: 30, align: 'center', color: PAL.water }); U.txt(c, 'uzun yılların eğilimi', 1460, 330, { size: 32, align: 'center', color: U.HEAT }); c.restore(); }
          U.txt(c, '(temsilî çizim)', 1460, 770, { size: 26, align: 'center', weight: 400, alpha: 0.8 });
          c.restore();
        }
      });
      const vk = E.se(t, sV, sV + 0.7, 'out');
      if (vk > 0) E.layer(ctx, vk, c => {
        U.card(c, 300, 230, 1320, 560, { tint: PAL.life, tintA: 0.1, seed: 3240 });
        P.write(c, 'Geçerli fikrimiz', 960, 330, E.seg(t, sV + 0.3, sV + 1.2), { size: 60, align: 'center', color: U.GREEN });
        P.write(c, 'Bugünkü ısınmanın asıl nedeni insan etkinlikleri.', 960, 440, E.seg(t, sV + 1.0, sV + 2.4), { size: 46, align: 'center' });
        P.write(c, 'Çözümün parçası da biziz!', 960, 520, E.seg(t, sV + 2.2, sV + 3.2), { size: 46, align: 'center', color: PAL.water });
        // Paris Anlaşması rozeti
        const pk = E.se(t, sV + 3.6, sV + 4.4, 'out');
        if (pk > 0) { c.save(); c.globalAlpha *= pk; P.earth(c, 700, 660, 60); U.txt(c, 'Paris Anlaşması', 800, 650, { size: 42, color: U.AMBER }); U.txt(c, 'Türkiye de taraf', 800, 700, { size: 36 }); c.restore(); }
      });
      if (vk > 0) E.layer(ctx, vk, c => U.damla(c, t, { x: 1760, y: 900, s: 0.8, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], arms: [[-1, 0.4], [1, 2.3]], seed: 4 }));
    }
  });
})();

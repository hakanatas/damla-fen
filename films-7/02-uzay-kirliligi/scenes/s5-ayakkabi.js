// SAHNE 5 — Altı ayakkabı tekniğiyle tartışma ve çözümleri değerlendirme (FB.7.1.3 d · KB3.3 · SDB1.1, SDB2.2)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = U7;
  const SHOES = [
    { c: '#2B3A67', n: 'lacivert: kurallar', v: 'Hangi kurallar gerekli?' },
    { c: '#8E8E8E', n: 'gri: bilgi', v: 'Veriler ne diyor?' },
    { c: '#7A5230', n: 'kahverengi: pratik', v: 'Hangisi uygulanabilir?' },
    { c: '#E07B2A', n: 'turuncu: tehlike', v: 'Acil risk ne?' },
    { c: '#E6A7B8', n: 'pembe: duyarlılık', v: 'Astronotlar güvende mi?' },
    { c: '#6B3F8A', n: 'mor: sorumluluk', v: 'Kim, ne yapmalı?' }
  ];
  function shoe(c, x, y, s, col, seed) {
    c.save(); c.translate(x, y); c.scale(s, s);
    const p = [[-70, 0], [-70, -38], [-40, -46], [-10, -40], [20, -22], [62, -14], [76, 0], [-70, 0]];
    P.fillPts(c, p, col, 0.95); wash(c, p, '#000000', 0.08, seed, { bleed: 1, blooms: 0 }); stroke(c, p, { w: 3, closed: true, seed });
    P.fillPts(c, [[-72, 0], [78, 0], [78, 10], [-72, 10]], PAL.ink, 0.8);
    c.restore();
  }
  const ROWS = [['atmosfere indir', 'yüksek', 'orta'], ['ağ / robot kol', 'az parça', 'zor, pahalı'], ['baştan planla', 'yüksek (önler)', 'kolay']];
  E.scene({
    name: 'Değerlendir', concept: 'Altı ayakkabı, değerlendirme', from: 'shoes', to: 'evaluate', trFrom: [960, 500],
    draw(ctx, t) {
      const ss = E.s('shoes'), se = E.s('evaluate');
      const sk = 1 - E.se(t, se - 0.2, se + 0.5);
      if (sk > 0) E.layer(ctx, sk, c => {
        SHOES.forEach((s, i) => { const k = E.se(t, ss + 0.5 + i * 1.1, ss + 1.1 + i * 1.1, 'out'); if (k <= 0) return;
          const x = 360 + (i % 3) * 600, y = 360 + Math.floor(i / 3) * 330;
          E.layer(c, k, cc => { F.card(cc, x - 260, y - 150, 520, 280, { seed: 500 + i }); shoe(cc, x, y - 20, 1.1, s.c, 510 + i);
            INK.label(cc, s.n, x, y + 50, { size: 36, weight: 700, align: 'center' }); INK.label(cc, s.v, x, y + 100, { size: 32, align: 'center', color: F.AMBER_D }); }); });
      });
      const ek = E.se(t, se + 0.1, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        const X = [260, 820, 1250, 1680], Y0 = 250;
        ['çözüm', 'etkisi', 'kolaylık / maliyet'].forEach((h, i) => INK.label(c, h, i ? (X[i] + X[i + 1]) / 2 : X[0] + 20, Y0, { size: 40, weight: 700, align: i ? 'center' : 'left', color: F.AMBER_D }));
        stroke(c, [[X[0], Y0 + 30], [X[3], Y0 + 32]], { w: 2.6, seed: 520 });
        ROWS.forEach((r, i) => { const y = Y0 + 110 + i * 100, k = E.se(t, se + 1 + i * 1.3, se + 1.8 + i * 1.3);
          INK.label(c, r[0], X[0] + 20, y, { size: 40, weight: 700, alpha: k });
          INK.label(c, r[1], (X[1] + X[2]) / 2, y, { size: 38, align: 'center', alpha: k });
          INK.label(c, r[2], (X[2] + X[3]) / 2, y, { size: 38, align: 'center', alpha: k, color: r[2].startsWith('zor') ? F.RED : PAL.ink });
          stroke(c, [[X[0], y + 36], [X[3], y + 37]], { w: 1.2, alpha: 0.5 * k, seed: 521 + i }); });
        const ck = E.se(t, se + 5.2, se + 6.0, 'out');
        if (ck > 0) { c.save(); c.globalAlpha = ck; F.card(c, 260, 620, 1420, 200, { seed: 530, fill: '#E4ECE0' }); c.restore();
          INK.label(c, 'Sonuç: önlemek, temizlemekten daha kolay.', 300, 690, { size: 44, weight: 700, alpha: ck });
          INK.label(c, 'Ülkeler birlikte kurallar koymalı ve uymalı.', 300, 770, { size: 44, weight: 700, alpha: E.se(t, se + 6.5, se + 7.3), color: '#4E6B22' }); }
        INK.label(c, '(grubumuzun değerlendirmesi)', 1680, 880, { size: 28, align: 'right', alpha: 0.6 });
      });
    }
  });
})();

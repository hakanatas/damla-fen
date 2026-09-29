// SAHNE 8 — Veriye dayalı olan ve olmayan önermeleri karşılaştırma; önermeyi güçlendirme (FB.6.7.2 b, KB2.7)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F621;
  const CL = [
    ['Anız yakılan tarlada', 'toprak canlıları zarar görür.', 0, 'kaynak: tarım kurumu raporu'],
    ['Bence hayvanlar', 'hemen yeni yuva bulur.', 1, null],
    ['Göle karışan aşırı gübre', 'sudaki yaşamı bozar.', 0, 'kaynak: bilimsel araştırma'],
    ['Doğa her zaman', 'kendini kendisi onarır.', 1, null]
  ];
  const CX = [1010, 1560];
  E.scene({
    name: 'Karşılaştır', concept: 'Veriye dayalı ve dayalı olmayan önermeler', from: 'claims', to: 'compare', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('claims'), sm = E.s('compare');
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      // tablo başlıkları
      const hk = E.se(t, sc + 0.3, sc + 1.0, 'out');
      if (hk > 0) E.layer(ctx, hk, c => {
        [['Veriye dayalı', '#3F7A3A'], ['Veriye dayalı değil', '#8A4A10']].forEach(([h, col], i) => {
          F.fit(c, h, CX[i], 200, 500, 48, { color: col });
          P.drawOn(c, P.bez([CX[i] - 230, 222], [CX[i], 230], [CX[i] + 230, 220], 20), E.se(t, sc + 0.6, sc + 1.4), { w: 3, color: col });
        });
        line(c, [1285, 170], [1285, 640], { w: 2.4, alpha: 0.6, seed: 150 });
      });
      const rowCount = [0, 0];
      CL.forEach(([l1, l2, col, src], i) => {
        const at = sc + 1.0 + i * 1.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const row = rowCount[col]++;
        const mv = E.se(t, at + 0.7, at + 1.3);
        const x = E.lerp(1285, CX[col], mv), y = E.lerp(470, 330 + row * 190, mv), r = E.lerp(0.05 * (i % 2 ? 1 : -1), 0, mv);
        ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(P.pop(k), P.pop(k));
        F.card(ctx, -250, -80, 500, 160, 160 + i, { tint: col ? '#9A9387' : PAL.life, tintA: 0.12, blur: 12 });
        F.fit(ctx, l1, 0, -22, 460, 38); F.fit(ctx, l2, 0, 26, 460, 38);
        if (src && mv > 0.9) F.fit(ctx, src + ' ✓', 0, 64, 460, 26, { color: '#3F7A3A', weight: 400 });
        if (!src && mv > 0.9) F.fit(ctx, 'kanıt yok', 0, 64, 460, 26, { color: '#8A4A10', weight: 400 });
        ctx.restore();
      });
      // önermeyi güçlendirme
      const rk = E.se(t, sm + 2.8, sm + 3.4, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 700, 670, 1130, 220, 170, { tint: '#C99A22', tintA: 0.14 });
        F.fit(c, 'Eski önermem: Biyoçeşitliliği en çok çöpler tehdit eder.', 1265, 725, 1060, 34, { weight: 400, alpha: 0.7 });
        const sk = E.se(t, sm + 3.6, sm + 4.2); if (sk > 0) P.drawOn(c, [[760, 715], [1770, 712]], sk, { w: 3, color: '#8A4A10' });
        P.write(c, 'Yeni önermem: Kirlilik, tehditlerden yalnızca biridir.', 740, 800, E.seg(t, sm + 4.2, sm + 5.6), { size: 40, color: '#2F4A1E' });
        P.write(c, 'Habitat kaybı ve yangınlar da büyük tehdittir.', 740, 856, E.seg(t, sm + 5.4, sm + 6.8), { size: 40, color: '#2F4A1E' });
      });
      DAMLA.draw(ctx, { x: 330, y: 890, s: 1.4, view: 'q3', expr: t > sm + 4 ? 'happy' : 'thinking', look: [0.8, -0.4], blink: E.blink(t, 10), squash: E.breath(t), t, talk: E.talk(t), seed: 7, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

// SAHNE 7 — Dijital eşleştirme oyunu (E2.5) ve modelleri karşılaştırma / tarafsız değerlendirme (D6.1, SDB2.1)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const AMB = '#C07F1E';
  const LEFT = ['Dünya kendi ekseninde döner', 'Dünya, Güneş’in çevresinde dolanır', 'Ay, Dünya’nın çevresinde dolanır', 'Güneş kendi ekseninde döner'];
  const RIGHT = ['≈ 27,3 gün', '1 gün', '≈ 25 gün', '1 yıl'];
  const PAIR = [1, 3, 0, 2];   // LEFT[i] → RIGHT[PAIR[i]]
  function game(ctx, t) {
    const s = E.s('match');
    // tablet çerçevesi
    const fr = [[170, 170], [1750, 170], [1750, 880], [170, 880]];
    ctx.save(); ctx.beginPath(); ctx.roundRect(150, 150, 1620, 750, 40); ctx.fillStyle = '#2A2830'; ctx.fill(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.roundRect(190, 190, 1540, 670, 16); ctx.fillStyle = '#FAF6EC'; ctx.fill(); ctx.restore();
    INK.label(ctx, 'Eşleştir!', 960, 260, { size: 50, weight: 700, align: 'center', color: '#8A4A10' });
    LEFT.forEach((txt, i) => {
      const y = 350 + i * 130, k = E.se(t, s + 0.3 + i * 0.2, s + 0.8 + i * 0.2);
      ctx.save(); ctx.globalAlpha = k; F04.card(ctx, 250, y - 45, 700, 90, { seed: 50 + i }); INK.label(ctx, txt, 280, y + 12, { size: 36, weight: 700 }); ctx.restore();
    });
    RIGHT.forEach((txt, i) => {
      const y = 350 + i * 130, k = E.se(t, s + 0.6 + i * 0.2, s + 1.1 + i * 0.2);
      ctx.save(); ctx.globalAlpha = k; F04.card(ctx, 1330, y - 45, 330, 90, { seed: 60 + i, fill: '#FBF3DC' }); INK.label(ctx, txt, 1495, y + 14, { size: 42, weight: 700, align: 'center' }); ctx.restore();
    });
    LEFT.forEach((_, i) => {
      const at = s + 2.4 + i * 1.8, k = E.se(t, at, at + 0.8); if (k <= 0) return;
      const a = [955, 350 + i * 130], b = [1325, 350 + PAIR[i] * 130];
      P.drawOn(ctx, P.bez(a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 - 20], b, 30), k, { w: 4, color: AMB });
      if (k >= 1) { INK.inkDot(ctx, a[0], a[1], 6); INK.inkDot(ctx, b[0], b[1], 6); P.check(ctx, 1700, 340 + PAIR[i] * 130, 40, E.se(t, at + 0.8, at + 1.2), { w: 6, color: PAL.life }); }
    });
  }
  function compare(ctx, t) {
    const s = E.s('final');
    const models = [['Damla', 0], ['Ali', 1], ['Elif', 2]];
    models.forEach(([nm, i]) => {
      const x = 830 + i * 400, k = E.se(t, s + 0.3 + i * 0.4, s + 0.9 + i * 0.4, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k;
      F04.card(ctx, x - 170, 180, 340, 300, { seed: 70 + i, fill: i === 0 ? '#FBF3DC' : '#FAF6EC' });
      // küçük model çizimleri
      if (i === 0) { ctx.save(); ctx.beginPath(); ctx.rect(x - 166, 184, 332, 292); ctx.clip(); P.sun(ctx, x - 130, 330, 90, t, { rays: false, glow: false, cells: false }); P.earth(ctx, x + 60, 330, 18); P.moon(ctx, x + 105, 305, 5); F04.orbitArrow(ctx, x + 60, 330, 45, 45, 1.2, -1.2, { w: 2.4, head: 9 }); ctx.restore(); }
      if (i === 1) { P.sun(ctx, x - 60, 330, 50, t, { rays: false, glow: false, cells: false }); P.earth(ctx, x + 60, 330, 30); P.moon(ctx, x + 120, 300, 16); }
      if (i === 2) { P.sun(ctx, x - 70, 330, 70, t, { rays: false, glow: false, cells: false }); P.earth(ctx, x + 50, 330, 20); P.moon(ctx, x + 95, 310, 6); }
      INK.label(ctx, nm + ' · model', x, 450, { size: 34, weight: 700, align: 'center' });
      ctx.restore();
    });
    const kt = E.se(t, s + 2.0, s + 2.8);
    if (kt > 0) E.layer(ctx, kt, c => {
      const rows = ['Büyüklükler temsilî mi?', 'Yönler doğru mu?', 'Hareketler var mı?'];
      const marks = [[1, 0, 1], [1, 1, 0], [1, 1, 1]];
      rows.forEach((r, j) => {
        const y = 580 + j * 95;
        INK.label(c, r, 150, y, { size: 38, weight: 700 });
        for (let i = 0; i < 3; i++) {
          const x = 830 + i * 400, at = s + 3.0 + j * 1.2 + i * 0.3;
          const kk = E.se(t, at, at + 0.4);
          if (marks[j][i]) P.check(c, x, y - 14, 44, kk, { w: 6 }); else if (kk > 0) { c.save(); c.globalAlpha = kk; INK.label(c, 'geliştir', x, y, { size: 30, align: 'center', color: '#8A4A10' }); c.restore(); }
        }
        c.save(); c.globalAlpha = 0.35; line(c, [140, y + 30], [1780, y + 30], { w: 1.2, dry: false }); c.restore();
      });
    });
  }
  E.scene({
    name: 'Oyun ve karşılaştırma', concept: 'Eşleştirme oyunu; modelleri karşılaştırma', from: 'match', to: 'final', trFrom: [960, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const b = E.se(t, E.s('final') - 0.3, E.s('final') + 0.4);
      if (b < 1) E.layer(ctx, 1 - b, c => game(c, t));
      if (b > 0) E.layer(ctx, b, c => compare(c, t));
    }
  });
})();

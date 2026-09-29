// SAHNE 1 — Açılış: üç kuşak aile, kalıtım, soru (köprü kurma: günlük yaşamda karşılaşılan örnekler)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F808;
  F.warmBg = (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.13)'); g.addColorStop(1, 'rgba(111,138,58,0.08)');
    ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
  };
  E.scene({
    name: 'Açılış', concept: 'Kalıtım; akraba evliliği sorusu', from: 'title', to: 'question',
    draw(ctx, t) {
      const sq = E.s('question');
      F.warmBg(ctx);
      ctx.save(); E.cam(ctx, { x: 960 + 40 * E.se(t, 0, E.e('question'), 'sine'), y: 560, z: 1.02 });
      // üç kuşak (genotip gösterilmez)
      const fam = [[1120, 820, 0.95, 1], [1290, 820, 0.95, 2], [1460, 840, 0.8, 3], [1590, 850, 0.7, 4], [1720, 840, 0.8, 5]];
      const fk = E.se(t, 1.0, 3.5);
      fam.forEach(([x, y, s, sd], i) => { const k = E.se(t, 0.8 + i * 0.35, 1.6 + i * 0.35, 'out'); if (k > 0) E.layer(ctx, k, c => F.person(c, x, y + (1 - k) * 30, s, null, { seed: sd })); });
      // kuşak oku
      if (t > sq) { ctx.save(); ctx.globalAlpha *= E.se(t, sq + 0.6, sq + 1.4); P.arrow(ctx, [1100, 540], [1700, 560], E.se(t, sq + 0.6, sq + 2.0), { w: 3.4, bend: -60, color: F.AMB }); INK.label(ctx, 'kuşaktan kuşağa', 1400, 470, { size: 40, weight: 700, align: 'center', color: F.AMB }); ctx.restore(); }
      F.damla(ctx, t, { x: 520, y: 860, s: 1.35, expr: t > sq + 3 ? 'thinking' : 'curious', look: [0.8, -0.2], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4]] });
      ctx.restore();
      const bk = E.se(t, sq + 3.0, sq + 3.7);
      if (bk > 0) {
        P.bubble(ctx, 700, 330, 900, 250, [560, 560], bk, 6);
        P.write(ctx, 'Akraba evliliklerinin', 700, 310, E.seg(t, sq + 3.4, sq + 4.4), { size: 54, align: 'center' });
        P.write(ctx, 'genetik sonuçları neler?', 700, 385, E.seg(t, sq + 4.2, sq + 5.2), { size: 54, align: 'center', color: F.AMB });
      }
      F.title(ctx, t, '8 · Akraba Evliliği ve Mutasyon', 'Fen Bilimleri · 8. sınıf · Ünite 3', F.AMB);
    }
  });
})();

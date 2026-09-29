// SAHNE 3 — Adaptasyon tanımı (nitelikleri tanımlar)
(function () {
  const { PAL, stroke } = INK;
  const F = F809;
  E.scene({
    name: 'Adaptasyon', concept: 'Adaptasyonun nitelikleri', from: 'adapt', to: 'adapt', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('adapt');
      const g = ctx.createLinearGradient(0, 0, E.W, 0); g.addColorStop(0, 'rgba(227,160,58,0.14)'); g.addColorStop(1, 'rgba(46,106,140,0.14)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      F.card(ctx, 360, 190, 1200, 460, 5900, { tint: PAL.life, tintA: 0.1 });
      P.write(ctx, 'ADAPTASYON', 960, 300, E.seg(t, sa + 0.3, sa + 1.3), { size: 80, align: 'center', color: PAL.life });
      const KW = [['hayatta kalma', PAL.ink], ['ve üreme şansını artıran', PAL.ink], ['kalıtsal özellik', F.AMB]];
      KW.forEach(([s, col], i) => F.wfit(ctx, s, 960, 410 + i * 76, E.seg(t, sa + 1.4 + i * 1.3, sa + 2.4 + i * 1.3), 58, 1100, { align: 'center', color: col }));
      F.fox(ctx, 330, 880, 0.8, 'desert', { t });
      F.fox(ctx, 1600, 880, 0.8, 'arctic', { t: t + 1, flip: true });
      E.inkText(ctx, 'nesilden nesile aktarılır', 960, 800, t, sa + 5.8, 1e9, { size: 46, align: 'center', color: F.AMB });
    }
  });
})();

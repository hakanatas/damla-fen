// SAHNE 5 — Doğru nefes alma tekniği (programda "açıklanır")
(function () {
  const { PAL } = INK; const K = KIT, F = F10;
  const LIST = ['burundan al: hava süzülür, ısınır', 'derin ve yavaş al', 'diyafram inince karın hafifçe şişer', 'ağızdan ya da burundan yavaşça ver'];
  E.scene({
    name: 'Doğru nefes', concept: 'Doğru nefes alma tekniği', from: 'correct', to: 'correct', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('correct');
      const g = ctx.createLinearGradient(0, 0, E.W, 0); g.addColorStop(0, 'rgba(46,106,140,0.08)'); g.addColorStop(1, 'rgba(111,138,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const cyc = Math.max(0, t - s0 - 0.5) / 6, ph = cyc - Math.floor(cyc), u = 0.5 - 0.5 * Math.cos(ph * Math.PI * 2);
      F.chest(ctx, 430, 470, 0.62, u);
      K.text(ctx, u > 0.5 ? 'yavaşça al...' : 'yavaşça ver...', 430, 850, { size: 42, align: 'center', color: PAL.water, alpha: E.se(t, s0 + 0.5, s0 + 1) });
      K.card(ctx, 800, 200, 960, 520, { seed: 10500, tint: PAL.life, tintA: 0.08 });
      P.write(ctx, 'Doğru nefes alma', 850, 290, E.seg(t, s0 + 0.2, s0 + 1), { size: 58, color: K.LIFE_D });
      LIST.forEach((l, i) => { const a = s0 + 1 + i * 1.3; P.check(ctx, 880, 386 + i * 86, 36, E.se(t, a, a + 0.5), { w: 5, color: K.LIFE_D }); P.write(ctx, l, 930, 400 + i * 86, E.seg(t, a + 0.2, a + 1.1), { size: 42 }); });
    }
  });
})();

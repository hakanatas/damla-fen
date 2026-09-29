// SAHNE 5 — DNA ile çalışan bilim insanları: Franklin'in X-ışını fotoğrafı (1952) → Watson ve Crick'in çift sarmal modeli (1953)
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT, F = G8;
  function xray(c, x, y, s) {
    const sq = K.rrect(x, y, 300 * s, 300 * s, 20); P.fillPts(c, sq, '#2B2A31', 1); stroke(c, sq, { w: 3, closed: true, seed: 900 });
    c.save(); c.fillStyle = '#EDE3CF';
    for (let j = 1; j <= 6; j++) for (const sg of [-1, 1]) for (const d of [-1, 1]) {
      const px = x + d * j * 13 * s, py = y + sg * j * 19 * s; c.globalAlpha = 0.85 - j * 0.08;
      c.beginPath(); c.ellipse(px, py, 11 * s, 4 * s, 0, 0, 7); c.fill();
    }
    c.globalAlpha = 0.7; for (const sg of [-1, 1]) { c.beginPath(); c.ellipse(x, y + sg * 128 * s, 34 * s, 9 * s, 0, 0, 7); c.fill(); }
    c.restore();
  }
  E.scene({
    name: 'Bilim insanları', concept: 'Kanıt → model', from: 'sci', to: 'sci', trFrom: [760, 400],
    draw(ctx, t) {
      const s0 = E.s('sci');
      ctx.fillStyle = 'rgba(227,160,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const lk = E.se(t, s0 + 0.2, s0 + 1.0, 'out');
      E.layer(ctx, lk, c => {
        K.card(c, 220, 190, 640, 580, { seed: 910 });
        xray(c, 540, 420, 1);
        K.text(c, 'Rosalind Franklin', 540, 650, { size: 50, align: 'center' });
        K.text(c, 'X-ışını fotoğrafı · 1952', 540, 708, { size: 36, align: 'center', alpha: 0.75 });
        K.text(c, '(temsilî çizim)', 540, 745, { size: 26, align: 'center', alpha: 0.5 });
      });
      const rk = E.se(t, s0 + 2.8, s0 + 3.6, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        K.card(c, 1060, 190, 640, 580, { seed: 920, tint: PAL.life, tintA: 0.08 });
        F.dna(c, { x: 1380, y: 245, n: 11, gap: 30, u: 48, h: 9, seq: 'ATGCGTACCGA', twist: 1, phase: t * 0.8, letters: false });
        K.text(c, 'James Watson · Francis Crick', 1380, 650, { size: 44, align: 'center', maxW: 600 });
        K.text(c, 'çift sarmal modeli · 1953', 1380, 708, { size: 36, align: 'center', alpha: 0.75 });
      });
      const ak = E.se(t, s0 + 2.2, s0 + 3.0);
      if (ak > 0) { ctx.save(); ctx.globalAlpha *= ak; P.arrow(ctx, [880, 440], [1040, 440], ak, { w: 4, head: 16, bend: 20 }); K.text(ctx, 'kanıt', 960, 400, { size: 36, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      const bk = E.se(t, s0 + 5, s0 + 6);
      if (bk > 0) { ctx.save(); ctx.globalAlpha *= bk; K.text(ctx, 'Kanıt toplanır → model kurulur → gerekirse yenilenir.', 960, 870, { size: 44, align: 'center', color: K.LIFE_D }); ctx.restore(); }
    }
  });
})();

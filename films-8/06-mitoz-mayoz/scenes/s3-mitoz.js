// SAHNE 3 — Mitoz: 1 hücre → 2 hücre, kromozom sayısı aynı (46 → 46), kalıtsal bilgi aynı; büyüme, onarım, yenilenme; bir hücrelilerde eşeysiz üreme
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = G8, M = M6;
  const PX = 330, PY = 500, DX = 830, DY = [300, 700];
  function amoeba(c, x, y, t, k) {
    const d = 20 + 60 * E.ease.io(k);
    [-1, 1].forEach(s => { const b = K.blob(x + s * d, y, 70 - 10 * (1 - k), 56, 2900 + (s > 0 ? 3 : 0), 0.18, 50); P.fillPts(c, b, '#F4F0E0'); wash(c, b, PAL.life, 0.3, 2910 + (s > 0 ? 3 : 0), { bleed: 1, blooms: 1 }); stroke(c, b, { w: 2.4, closed: true, dry: false, seed: 2920 }); INK.inkDot(c, x + s * d, y, 12, { color: '142,106,140', alpha: 0.7 }); });
  }
  E.scene({
    name: 'Mitoz', concept: '1 → 2 hücre, kromozom sayısı aynı', from: 'mit1', to: 'mit4', trFrom: [330, 500],
    draw(ctx, t) {
      const s1 = E.s('mit1'), s2 = E.s('mit2'), s3 = E.s('mit3'), s4 = E.s('mit4');
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      K.text(ctx, 'Mitoz', 330, 215, { size: 64, align: 'center', color: PAL.water, alpha: E.se(t, s1, s1 + 0.8) });
      // ana hücre
      const sk = E.se(t, s1 + 1.5, s1 + 4.0);
      E.layer(ctx, 1 - 0.55 * sk, c => M.cell(c, PX, PY, 190, M.full, { dup: true, scale: 0.95 }));
      K.text(ctx, 'ana hücre', PX, PY - 208, { size: 30, align: 'center', alpha: 0.7 * E.se(t, s1 + 0.5, s1 + 1.2) });
      // kopyalar ayrılıp yavru hücrelere gider
      if (sk > 0) {
        DY.forEach((dy, j) => {
          const x = E.lerp(PX, DX, sk), y = E.lerp(PY, dy, sk), r = E.lerp(100, 160, sk);
          E.layer(ctx, E.clamp(sk * 2), c => M.cell(c, x, y, r, M.full, { dup: false, seed: 5720 + j }));
          P.arrow(ctx, [PX + 200, PY + (j ? 60 : -60)], [DX - 175, dy + (j ? -40 : 40)], E.se(t, s1 + 1.5, s1 + 2.5), { w: 3, head: 14 });
        });
      }
      // sayılar
      const nk = E.se(t, s2 + 0.3, s2 + 1.1);
      if (nk > 0) {
        M.count(ctx, '46', PX, PY + 250, nk, { size: 44, tint: PAL.water });
        DY.forEach((dy, j) => M.count(ctx, '46', DX + 215, dy, nk, { size: 44, tint: PAL.water, seed: 4 + j }));
        const ak = E.se(t, s2 + 3.0, s2 + 3.8);
        if (ak > 0) { ctx.save(); ctx.globalAlpha *= ak; K.text(ctx, 'aynı sayı · aynı kalıtsal bilgi', DX, 520, { size: 36, align: 'center', color: K.LIFE_D }); ctx.restore(); }
      }
      // sağ panel: görevler
      const gk = E.se(t, s3 + 0.2, s3 + 1.0);
      if (gk > 0) E.layer(ctx, gk, c => {
        K.card(c, 1170, 170, 640, 700, { seed: 2950, tint: PAL.water, tintA: 0.06 });
        K.text(c, 'Mitoz ne sağlar?', 1490, 245, { size: 46, align: 'center' });
        ['büyüme', 'yaraların onarılması', 'yıpranan hücrelerin yenilenmesi'].forEach((w, i) => {
          const k = E.se(t, s3 + 1.2 + i * 1.3, s3 + 1.8 + i * 1.3); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; P.check(c, 1230, 320 + i * 72, 34, 1, { color: K.LIFE_D, w: 4.5 }); K.text(c, w, 1270, 338 + i * 72, { size: 38, maxW: 520 }); c.restore();
        });
        K.text(c, '(vücut hücrelerinde)', 1490, 560, { size: 32, align: 'center', alpha: 0.65 * E.se(t, s3 + 5, s3 + 6) });
        const ak = E.se(t, s4 + 0.2, s4 + 1.0);
        if (ak > 0) { c.save(); c.globalAlpha *= ak; line(c, [1210, 600], [1770, 600], { w: 1.6, alpha: 0.4, dry: false });
          amoeba(c, 1400, 720, t, E.seg(t, s4 + 0.8, s4 + 3.5)); K.text(c, 'amip', 1400, 830, { size: 34, align: 'center' });
          K.text(c, 'bir hücreli →', 1640, 700, { size: 32, align: 'center' }); K.text(c, 'eşeysiz üreme', 1640, 745, { size: 34, align: 'center', color: K.LIFE_D }); c.restore(); }
      });
    }
  });
})();

// SAHNE 5 — FB.8.3.5 Problem 2: Ss × Ss → 2. döl: 1 SS : 2 Ss : 1 ss, 3 sarı : 1 yeşil · Mendel'in verisi (6022 : 2001) · olasılık · tahmin
(function () {
  const { PAL, stroke, line } = INK; const K = KIT, F = G8;
  E.scene({
    name: 'Problem 2', concept: 'Ss × Ss → 2. döl oranları', from: 'cross2', to: 'predict', trFrom: [480, 450],
    draw(ctx, t) {
      const s2 = E.s('cross2'), sf = E.s('f2'), sr = E.s('ratio'), sd = E.s('data'), sp = E.s('predict');
      ctx.fillStyle = 'rgba(227,160,58,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const hk = E.se(t, s2 + 0.2, s2 + 1.0);
      if (hk > 0) { ctx.save(); ctx.globalAlpha *= hk;
        K.text(ctx, '1. döl × 1. döl', 510, 200, { size: 44, align: 'center' });
        F.pea(ctx, 330, 250, 30, 'Y', { seed: 5 }); K.text(ctx, 'Ss', 400, 262, { size: 40, color: K.LIFE_D }); K.text(ctx, '×', 510, 262, { size: 50, align: 'center' }); F.pea(ctx, 600, 250, 30, 'Y', { seed: 6 }); K.text(ctx, 'Ss', 640, 262, { size: 40, color: K.LIFE_D });
        ctx.restore(); }
      const isSS = g => g === 'ss' ? E.se(t, sr + 5.5, sr + 6.3) : 0;
      F.punnett(ctx, { x: 200, y: 290, cs: 185, top: ['S', 's'], left: ['S', 's'], t, tIn: s2 + 1.5, t0: sf + 0.3, dt: 1.1, hi: isSS, hiCol: PAL.life });
      // oranlar
      const rk = E.se(t, sr + 0.3, sr + 1.0);
      if (rk > 0) E.layer(ctx, rk, c => {
        K.card(c, 900, 190, 880, 300, { seed: 3600 });
        K.text(c, 'Genotip:', 940, 270, { size: 42, color: PAL.water });
        K.text(c, '1 SS : 2 Ss : 1 ss', 1130, 270, { size: 50, alpha: E.se(t, sr + 0.6, sr + 1.4) });
        K.text(c, 'Fenotip:', 940, 370, { size: 42, color: PAL.water, alpha: E.se(t, sr + 2.2, sr + 3.0) });
        const fk = E.se(t, sr + 2.6, sr + 3.4);
        if (fk > 0) { c.save(); c.globalAlpha *= fk; for (let i = 0; i < 4; i++) F.pea(c, 1150 + i * 62, 356, 24, i < 3 ? 'Y' : 'G', { seed: 60 + i }); K.text(c, '3 sarı : 1 yeşil', 1420, 372, { size: 46 }); c.restore(); }
        const bk = E.se(t, sr + 5.5, sr + 6.3);
        if (bk > 0) { c.save(); c.globalAlpha *= bk; K.text(c, 'saklanan yeşil geri döndü: ss', 1340, 450, { size: 36, align: 'center', color: K.LIFE_D }); c.restore(); }
      });
      // Mendel'in verisi
      const dk = E.se(t, sd + 0.3, sd + 1.0) * (1 - E.se(t, sp - 0.2, sp + 0.5));
      if (dk > 0) E.layer(ctx, dk, c => {
        K.card(c, 900, 530, 880, 330, { seed: 3610, tint: PAL.life, tintA: 0.06 });
        K.text(c, 'Mendel’in sayımı (2. döl)', 1340, 595, { size: 40, align: 'center' });
        const bw = E.se(t, sd + 1.0, sd + 3.0), W = 560;
        [[6022, F.YEL, 'sarı'], [2001, F.GRN, 'yeşil']].forEach(([n, col, lab], i) => {
          const y = 650 + i * 70, w = W * n / 6022 * bw; const r = [[1100, y], [1100 + w, y], [1100 + w, y + 44], [1100, y + 44], [1100, y]];
          if (w > 2) { P.fillPts(c, r, '#FBF8F1'); INK.wash(c, r, col, 0.8, 3620 + i, { bleed: 0.5, blooms: 0 }); stroke(c, r, { w: 2, closed: true, dry: false }); }
          K.text(c, lab, 1085, y + 34, { size: 34, align: 'right' }); K.text(c, String(n), 1110 + w, y + 34, { size: 34, alpha: bw });
        });
        const ak = E.se(t, sd + 3.4, sd + 4.2);
        if (ak > 0) { c.save(); c.globalAlpha *= ak; K.text(c, '6022 ÷ 2001 ≈ 3 → yaklaşık 3 : 1', 1340, 830, { size: 38, align: 'center', color: K.LIFE_D }); c.restore(); }
      });
      // tahmin
      const pk = E.se(t, sp + 0.3, sp + 1.0);
      if (pk > 0) E.layer(ctx, pk, c => {
        K.card(c, 900, 530, 880, 330, { seed: 3630, tint: PAL.light, tintA: 0.08 });
        K.text(c, 'Tahmin', 1340, 595, { size: 44, align: 'center' });
        F.pea(c, 1010, 690, 30, 'G', { seed: 70 }); K.text(c, 'ss × ss', 1060, 704, { size: 44 });
        P.arrow(c, [1240, 690], [1360, 690], E.se(t, sp + 1.2, sp + 1.8), { w: 3, head: 13 });
        const k = E.se(t, sp + 1.8, sp + 2.6);
        if (k > 0) { c.save(); c.globalAlpha *= k; for (let i = 0; i < 4; i++) F.pea(c, 1410 + i * 62, 690, 24, 'G', { seed: 80 + i }); K.text(c, 'hep yeşil (ss)', 1500, 760, { size: 38, align: 'center', color: '#8A4A10' }); c.restore(); }
        const ok = E.se(t, sp + 4.5, sp + 5.3);
        if (ok > 0) { c.save(); c.globalAlpha *= ok; K.text(c, 'Diğer canlılarda da aktarım benzerdir.', 1340, 830, { size: 34, align: 'center', alpha: 0.8 }); c.restore(); }
      });
    }
  });
})();

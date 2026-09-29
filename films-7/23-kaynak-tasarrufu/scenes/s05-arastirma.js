// SAHNE 5 — Araştırma (FB.7.7.2 c) ve veri yorumlama (ç): damlayan musluk 10 dakikada 100 mL → 1 saatte 600 mL → 1 günde ≈ 14 L (Damla'nın örnek ölçümü)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F723;
  E.scene({
    name: 'Araştırma', concept: 'Ölçme; veriyi yorumlama', from: 'plan', to: 'interpret', trFrom: [500, 500],
    draw(ctx, t) {
      const sp = E.s('plan'), sm = E.s('measure'), si = E.s('interpret');
      F.tiles(ctx, 0);
      F.shape(ctx, [[180, 700], [900, 700], [900, 900], [180, 900]], '#8A6A45', 0.3, 3800);
      F.tap(ctx, 520, 330, 1.0, t, { fall: 190, rate: 1.1 });
      const lvl = 0.4 * E.se(t, sp + 1.5, sm + 1.0, 'sine');   // 100 mL (0,4 × 250)
      F.cup(ctx, 520, 700, 0.9, lvl);
      // saat
      const ck = E.se(t, sp + 1.0, sp + 1.6);
      ctx.save(); ctx.globalAlpha *= ck; P.icon.clock(ctx, 250, 380, 0.9, E.se(t, sp + 1.5, sm + 1.0) * Math.PI * 2); F.fit(ctx, '10 dakika', 250, 490, 220, 36); ctx.restore();
      F.damla(ctx, t, { x: 800, y: 700, s: 0.95, view: 'q3', flip: true, expr: t > si ? 'surprised' : 'curious', look: [-0.8, 0.3], prop: 'notebook', arms: [[-1, 0.5], [1, 1.3]] });
      // hesap kartları
      const rows = [['10 dakika', '100 mL', sm + 0.4], ['1 saat', '6 × 100 = 600 mL', sm + 2.4], ['1 gün', '24 × 600 = 14 400 mL ≈ 14 L', si + 0.3]];
      rows.forEach(([a, b, at], i) => {
        const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          F.card(c, 1000, 190 + i * 130, 820, 104, 3810 + i, { tint: i === 2 ? PAL.water : null, tintA: 0.12 });
          F.fit(c, a, 1110, 258 + i * 130, 190, 40, { color: PAL.water });
          F.fit(c, b, 1210, 258 + i * 130, 590, 40, { align: 'left', color: i === 2 ? PAL.water : PAL.ink });
        });
      });
      // 14 şişe (1 L)
      const kb = E.se(t, si + 1.6, si + 2.4);
      if (kb > 0) {
        for (let i = 0; i < 14; i++) {
          const k = E.se(t, si + 1.6 + i * 0.12, si + 2.0 + i * 0.12); if (k <= 0) continue;
          const x = 1030 + (i % 7) * 110, y = 690 + Math.floor(i / 7) * 120;
          ctx.save(); ctx.globalAlpha *= k;
          const b = [[x - 22, y + 40], [x + 22, y + 40], [x + 22, y - 20], [x + 8, y - 36], [x + 8, y - 48], [x - 8, y - 48], [x - 8, y - 36], [x - 22, y - 20]];
          P.fillPts(ctx, F.closeP(b), PAL.water, 0.4); stroke(ctx, F.closeP(b), { w: 2, closed: true, dry: false, seed: 3820 + i });
          ctx.restore();
        }
        F.fit(ctx, '= 14 şişe (1 L)', 1460, 612, 400, 34, { alpha: kb });
      }
      F.fit(ctx, 'Damla’nın örnek ölçümü', 540, 890, 500, 28, { weight: 400, alpha: 0.7 * E.se(t, sm, sm + 1) });
    }
  });
})();

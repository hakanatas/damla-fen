// SAHNE 4 — Zıt yönlü kuvvetler: 5 N sağa, 3 N sola → bileşke 2 N sağa (büyük kuvvetin yönü)
(function () {
  const { PAL, dashed } = INK;
  E.scene({
    name: 'Zıt yön', concept: 'Zıt yönlü kuvvetlerin bileşkesi', from: 'opp', to: 'diff', trFrom: [960, 400],
    draw(ctx, t) {
      const so = E.s('opp'), sd = E.s('diff');
      const U = F63.U;
      const rk = E.se(t, so + 0.3, so + 1.6), lk = E.se(t, so + 1.4, so + 2.7);
      F63.rig(ctx, 960, 470, [{ F: Math.round(5 * rk) }], [{ F: Math.round(3 * lk) }]);
      const x0 = 900, gy0 = 560, gy1 = 880;
      F63.grid(ctx, 240, gy0, 1680, gy1, x0, 620);
      INK.label(ctx, '1 kare = 1 N', 1660, gy0 - 16, { size: 34, weight: 700, align: 'right', alpha: 0.7 });
      ctx.save(); ctx.globalAlpha = 0.35; F63.box(ctx, x0, 700, 110, 110, 3401); ctx.restore();
      const k1 = E.se(t, so + 2.8, so + 3.8), k2 = E.se(t, so + 3.8, so + 4.8);
      const mv = E.se(t, sd + 0.4, sd + 2.2);
      F63.farrow(ctx, x0, 620, 5, 1, k1, { label: '5 N', seed: 3410 });
      // 3 N arrow: starts at x0 pointing left, then moves to the tip of the 5 N arrow (still pointing left)
      F63.farrow(ctx, x0 + 5 * U * mv, E.lerp(740, 660, mv), 3, -1, k2, { label: '3 N', seed: 3411, color: '#A0662A', ly: mv > 0.5 ? 50 : -22 });
      if (mv > 0.98) {
        ctx.save(); ctx.globalAlpha = 0.6;
        dashed(ctx, [[x0, 620], [x0, 820]], { w: 2, on: 8, off: 7 }); dashed(ctx, [[x0 + 2 * U, 660], [x0 + 2 * U, 820]], { w: 2, on: 8, off: 7 });
        ctx.restore();
      }
      const kr = E.se(t, sd + 2.6, sd + 3.8);
      F63.farrow(ctx, x0, 820, 2, 1, kr, { res: true, color: F63.RES, w: 8, head: 22, label: 'bileşke = 2 N', ly: 58, lcolor: PAL.ink, seed: 3412 });
      E.inkText(ctx, '5 N − 3 N = 2 N', 1440, 700, t, sd + 3.4, 1e9, { size: 56, align: 'center' });
      E.inkText(ctx, 'zıt yön → farkı al', 520, 700, t, sd + 4.4, 1e9, { size: 48, align: 'center', color: F63.BR });
      E.inkText(ctx, 'yönü: büyük kuvvetin yönü', 1440, 800, t, sd + 5.0, 1e9, { size: 40, align: 'center', color: F63.BR });
    }
  });
})();

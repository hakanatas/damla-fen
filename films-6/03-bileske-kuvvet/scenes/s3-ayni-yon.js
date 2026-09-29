// SAHNE 3 — Aynı yönlü kuvvetler: 3 N + 2 N → bileşke 5 N (oklar ölçekli, uç uca eklenir)
(function () {
  const { PAL, line, stroke, dashed } = INK;
  E.scene({
    name: 'Aynı yön', concept: 'Aynı yönlü kuvvetlerin bileşkesi', from: 'same', to: 'resultant', trFrom: [520, 400],
    draw(ctx, t) {
      const ss = E.s('same'), su = E.s('sum'), sr = E.s('resultant');
      const U = F63.U;
      // physical rig (top)
      const rk = E.se(t, ss + 0.3, ss + 1.6);
      const f1 = 3 * rk, f2 = 2 * E.se(t, ss + 1.4, ss + 2.7);
      F63.rig(ctx, 520, 470, [{ F: +f1.toFixed(0), dy: -45 }, { F: +f2.toFixed(0), dy: 45 }], []);
      // diagram (bottom)
      const x0 = 480, gy0 = 560, gy1 = 880;
      F63.grid(ctx, 240, gy0, 1680, gy1, x0, 620);
      INK.label(ctx, '1 kare = 1 N', 1660, gy0 - 16, { size: 34, weight: 700, align: 'right', alpha: 0.7 });
      ctx.save(); ctx.globalAlpha = 0.35; F63.box(ctx, x0, 700, 110, 110, 3301); ctx.restore();
      const k1 = E.se(t, ss + 2.8, ss + 3.8), k2 = E.se(t, ss + 3.8, ss + 4.8);
      const mv = E.se(t, su + 0.6, su + 2.4);
      F63.farrow(ctx, x0, 620, 3, 1, k1, { label: '3 N', seed: 3310 });
      F63.farrow(ctx, x0 + 3 * U * mv, E.lerp(740, 620, mv), 2, 1, k2, { label: '2 N', seed: 3311, color: '#A0662A', ly: mv > 0.5 ? -22 : -22 });
      if (mv > 0.98) {
        ctx.save(); ctx.globalAlpha = 0.6;
        dashed(ctx, [[x0, 620], [x0, 820]], { w: 2, on: 8, off: 7 }); dashed(ctx, [[x0 + 5 * U, 620], [x0 + 5 * U, 820]], { w: 2, on: 8, off: 7 });
        ctx.restore();
      }
      const kr = E.se(t, su + 3.2, su + 4.6);
      F63.farrow(ctx, x0, 820, 5, 1, kr, { res: true, color: F63.RES, w: 8, head: 24, label: 'bileşke = 5 N', ly: 58, lcolor: PAL.ink, seed: 3312 });
      E.inkText(ctx, '3 N + 2 N = 5 N', 1350, 690, t, sr + 0.6, 1e9, { size: 58, align: 'center' });
      E.inkText(ctx, 'aynı yön → topla', 1350, 790, t, sr + 2.2, 1e9, { size: 50, align: 'center', color: F63.BR });
      // Damla
      DAMLA.draw(ctx, { x: 1640, y: 470, s: 1.05, view: 'q3', flip: true, expr: t > sr ? 'happy' : 'curious', look: [-0.9, 0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 1,
        arms: t > sr + 0.5 ? [[-1, 0.4], [1, 2.6]] : [[-1, 0.4], [1, 0.9]], prop: t > sr + 0.5 ? null : 'notebook' });
    }
  });
})();

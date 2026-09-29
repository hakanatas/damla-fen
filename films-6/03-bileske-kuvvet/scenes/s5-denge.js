// SAHNE 5 — Dengelenmiş (bileşke 0) / dengelenmemiş (bileşke ≠ 0) kuvvetler ve dengeleyici kuvvet
(function () {
  const { PAL, dashed, stroke, circlePts } = INK;
  function header(ctx, gy0) {
    F63.grid(ctx, 240, gy0, 1680, 880, 900, 640);
    INK.label(ctx, '1 kare = 1 N', 1660, gy0 - 16, { size: 34, weight: 700, align: 'right', alpha: 0.7 });
  }
  E.scene({
    name: 'Denge', concept: 'Dengelenmiş, dengelenmemiş, dengeleyici kuvvet', from: 'equal', to: 'balancer2', trFrom: [960, 400],
    draw(ctx, t) {
      const se = E.s('equal'), sz = E.s('zero'), sb = E.s('balancer'), sb2 = E.s('balancer2');
      const U = F63.U, x0 = 900;
      const swap = E.se(t, sb - 0.4, sb + 0.4);
      // --- part A: 4 N / 4 N ---
      if (swap < 1) E.layer(ctx, 1 - swap, c => {
        const k = E.se(t, se + 0.3, se + 1.8);
        F63.rig(c, 960, 470, [{ F: Math.round(4 * k) }], [{ F: Math.round(4 * k) }]);
        header(c, 560);
        ctx.save();
        c.save(); c.globalAlpha = 0.35; F63.box(c, x0, 700, 110, 110, 3501); c.restore();
        F63.farrow(c, x0, 640, 4, 1, E.se(t, se + 2.0, se + 3.0), { label: '4 N', seed: 3510 });
        F63.farrow(c, x0, 640, 4, -1, E.se(t, se + 2.6, se + 3.6), { label: '4 N', seed: 3511, color: '#A0662A' });
        ctx.restore();
        E.inkText(c, '4 N − 4 N = 0', 1440, 780, t, se + 4.0, 1e9, { size: 56, align: 'center' });
        E.inkText(c, 'bileşke = 0', 900, 800, t, sz + 0.2, 1e9, { size: 54, align: 'center', color: PAL.ink });
        const bk = E.se(t, sz + 0.8, sz + 1.6, 'out');
        if (bk > 0) { c.save(); c.translate(460, 770); c.scale(P.pop(bk), P.pop(bk)); F63.tag(c, 'dengelenmiş', 0, 0, { size: 46, color: PAL.life, fill: '#EEF2E0' }); c.restore(); }
        // unbalanced reminder (from previous scene)
        const uk = E.se(t, sz + 3.2, sz + 4.2, 'out');
        if (uk > 0) E.layer(c, uk, d => {
          F63.card(d, 1260, 160, 1760, 360, { seed: 3520 });
          const U2 = 30;
          INK.line(d, [1380, 230], [1380 + 5 * U2, 230], { w: 5, color: F63.BR, dry: false }); INK.arrowHead(d, [1380, 230], [1380 + 5 * U2, 230], 14, { w: 4, color: F63.BR });
          INK.line(d, [1380, 262], [1380 - 3 * U2, 262], { w: 5, color: '#A0662A', dry: false }); INK.arrowHead(d, [1380, 262], [1380 - 3 * U2, 262], 14, { w: 4, color: '#A0662A' });
          INK.label(d, '5 N', 1600, 244, { size: 34, weight: 700, color: F63.BR });
          INK.label(d, '3 N', 1320, 312, { size: 34, weight: 700, color: '#A0662A', align: 'right' });
          INK.label(d, 'bileşke ≠ 0 → dengelenmemiş', 1510, 340, { size: 34, weight: 700, align: 'center', color: '#8A4A10' });
        });
      });
      // --- part B: 6 N right, 2 N left, + 4 N balancing force ---
      if (swap > 0) E.layer(ctx, swap, c => {
        const gk = E.se(t, sb + 4.6, sb + 6.0);
        F63.rig(c, 960, 470, [{ F: 6 }], [{ F: 2, dy: -45 }].concat(gk > 0 ? [{ F: Math.round(4 * gk), dy: 45, color: F63.BAL, alpha: Math.min(1, gk * 3) }] : []));
        header(c, 560);
        c.save(); c.globalAlpha = 0.35; F63.box(c, x0, 700, 110, 110, 3502); c.restore();
        F63.farrow(c, x0, 640, 6, 1, E.se(t, sb + 0.8, sb + 1.8), { label: '6 N', seed: 3530 });
        F63.farrow(c, x0, 640, 2, -1, E.se(t, sb + 1.4, sb + 2.4), { label: '2 N', seed: 3531, color: '#A0662A' });
        const rk = E.se(t, sb + 2.8, sb + 3.8);
        const cancel = E.se(t, sb2 + 0.3, sb2 + 1.2);
        E.layer(c, 1 - 0.7 * cancel, d => F63.farrow(d, x0, 800, 4, 1, rk, { res: true, color: F63.RES, w: 8, head: 22, label: 'bileşke 4 N', ly: -22, lcolor: PAL.ink, seed: 3532 }));
        F63.farrow(c, x0, 800, 4, -1, E.se(t, sb + 5.4, sb + 6.6), { color: F63.BAL, w: 8, head: 22, label: 'dengeleyici 4 N', ly: 54, seed: 3533 });
        E.inkText(c, 'yeni bileşke = 0', 1470, 720, t, sb2 + 0.6, 1e9, { size: 54, align: 'center', color: PAL.ink });
        E.inkText(c, 'eşit büyüklük, zıt yön', 1470, 810, t, sb2 + 2.2, 1e9, { size: 42, align: 'center', color: PAL.life });
      });
    }
  });
})();

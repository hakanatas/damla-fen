// SAHNE 2 — Tanım: basit makine neyi değiştirir? + giriş ve çıkış kuvveti
(function () {
  const { PAL, line, stroke } = INK;
  const F = F8M;
  const CARDS = [
    { x: 190, name: 'büyüklüğünü' },
    { x: 720, name: 'yönünü' },
    { x: 1250, name: 'yolunu' }
  ];
  E.scene({
    name: 'Tanım', concept: 'Basit makine; giriş ve çıkış kuvveti', from: 'define', to: 'inout', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('define'), si = E.s('inout');
      const cA = 1 - E.se(t, si - 0.1, si + 0.6);
      if (cA > 0) E.layer(ctx, cA, c => {
        P.write(c, 'Basit makine kuvvetin…', 960, 250, E.seg(t, sd + 0.3, sd + 1.6), { size: 62, align: 'center' });
        CARDS.forEach((cd, i) => {
          const at = sd + 1.4 + i * 1.5, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; c.translate(0, (1 - k) * 30);
          F.card(c, cd.x, 330, cd.x + 470, 700, { seed: 3100 + i });
          F.txt(c, cd.name, cd.x + 235, 410, { size: 50, align: 'center', color: F.FORCE });
          const y = 540, kk = E.se(t, at + 0.5, at + 1.3);
          if (i === 0) { F.vec(c, [cd.x + 60, y - 30], [cd.x + 250, y - 30], kk, { w: 9, head: 24 }); F.vec(c, [cd.x + 290, y + 60], [cd.x + 380, y + 60], E.se(t, at + 1.0, at + 1.6), { w: 5 }); F.txt(c, 'büyük → küçük', cd.x + 235, y + 140, { size: 36, align: 'center', alpha: 0.75 }); }
          if (i === 1) { F.vec(c, [cd.x + 140, y - 70], [cd.x + 140, y + 70], kk); F.vec(c, [cd.x + 330, y + 70], [cd.x + 330, y - 70], E.se(t, at + 1.0, at + 1.6)); F.txt(c, 'aşağı → yukarı', cd.x + 235, y + 140, { size: 36, align: 'center', alpha: 0.75 }); }
          if (i === 2) { F.dash(c, [cd.x + 60, y - 40], [cd.x + 180, y - 40], kk); F.dash(c, [cd.x + 60, y + 50], [cd.x + 410, y + 50], E.se(t, at + 1.0, at + 1.8)); F.txt(c, 'kısa ↔ uzun', cd.x + 235, y + 140, { size: 36, align: 'center', alpha: 0.75 }); }
          c.restore();
        });
      });
      // giriş / çıkış kuvveti
      const lA = E.se(t, si + 0.2, si + 0.9);
      if (lA > 0) E.layer(ctx, lA, c => {
        const pv = [860, 640];
        F.floor(c, 726, 3);
        F.fulcrum(c, pv[0], pv[1], 1, 3120);
        const pl = F.plank(c, pv, 0, 300, 560, { th: 22, seed: 3121 });
        const L = pl.top(-230); F.block(c, L[0], L[1], 150, 130, 'yük', { seed: 3122 });
        const R = pl.top(520);
        const k1 = E.se(t, si + 1.2, si + 2.0), k2 = E.se(t, si + 3.4, si + 4.2);
        F.vec(c, [R[0], R[1] - 230], [R[0], R[1] - 8], k1, { w: 7, head: 22 });
        if (k1 > 0.6) { c.save(); c.globalAlpha *= E.clamp((k1 - 0.6) * 2.5); F.txt(c, 'giriş kuvveti', R[0] - 30, R[1] - 250, { size: 44, color: F.FORCE, align: 'right' }); F.txt(c, '(bizim uyguladığımız)', R[0] - 30, R[1] - 200, { size: 34, alpha: 0.7, align: 'right' }); c.restore(); }
        F.vec(c, [L[0] + 105, L[1] - 4], [L[0] + 105, L[1] - 180], k2, { w: 7, head: 22, color: F.LOAD });
        if (k2 > 0.6) { c.save(); c.globalAlpha *= E.clamp((k2 - 0.6) * 2.5); F.txt(c, 'çıkış kuvveti', L[0] + 20, L[1] - 270, { size: 44, color: F.LOAD, align: 'center' }); F.txt(c, '(makinenin yüke uyguladığı)', L[0] + 20, L[1] - 222, { size: 32, alpha: 0.7, align: 'center' }); c.restore(); }
        INK.label(c, 'destek', pv[0] + 60, pv[1] + 70, { size: 36, alpha: 0.8 });
      });
      DAMLA.draw(ctx, { x: 1780, y: 905, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2, arms: [[-1, [-50, -150]], [1, 0.4]] });
    }
  });
})();

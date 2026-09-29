// SAHNE 4 — Mayoz: üreme ana hücrelerinde, iki aşama, 1 → 4 hücre, 46 → 23, kalıtsal bilgi farklı (çeşitlilik) · döllenme 23 + 23 = 46
// Evre adları verilmez (TYMM). Uçlardaki renk değişimi yalnızca "üreme hücreleri birbirinden farklıdır" bilgisini gösterir.
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT, F = G8, M = M6;
  const B = F.CH1, A = F.CH2;
  const PX = 250, PY = 500;
  const S1 = [{ x: 640, y: 320, set: [{ L: 1, c: B, tip: A, tipArm: 2 }, { L: 0, c: A }] }, { x: 640, y: 690, set: [{ L: 1, c: A, tip: B, tipArm: 1 }, { L: 0, c: B }] }];
  const S2 = [
    { x: 1030, y: 215, set: [{ L: 1, c: B }, { L: 0, c: A }] }, { x: 1030, y: 425, set: [{ L: 1, c: B, tip: A }, { L: 0, c: A }] },
    { x: 1030, y: 610, set: [{ L: 1, c: A, tip: B }, { L: 0, c: B }] }, { x: 1030, y: 815, set: [{ L: 1, c: A }, { L: 0, c: B }] }];
  E.scene({
    name: 'Mayoz', concept: 'İki aşama, 1 → 4 hücre, 46 → 23', from: 'may1', to: 'fert', trFrom: [250, 500],
    draw(ctx, t) {
      const m1 = E.s('may1'), m2 = E.s('may2'), m3 = E.s('may3'), m4 = E.s('may4'), sf = E.s('fert');
      ctx.fillStyle = 'rgba(227,160,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const tk = E.se(t, m1, m1 + 0.8);
      K.text(ctx, 'Mayoz', PX, 215, { size: 64, align: 'center', color: '#C07F1E', alpha: tk });
      K.text(ctx, 'üreme ana hücresi', PX, 300, { size: 32, align: 'center', alpha: 0.75 * E.se(t, m1 + 2, m1 + 3) });
      M.cell(ctx, PX, PY, 150, M.full, { dup: true, scale: 0.75 });
      // 1. aşama
      const a1 = E.se(t, m2 + 0.5, m2 + 2.5);
      if (a1 > 0) {
        S1.forEach((c1, j) => { E.layer(ctx, E.clamp(a1 * 2), c => M.cell(c, E.lerp(PX, c1.x, a1), E.lerp(PY, c1.y, a1), E.lerp(80, 118, a1), c1.set, { dup: true, scale: 0.62, seed: 5730 + j })); P.arrow(ctx, [PX + 160, PY + (j ? 50 : -50)], [c1.x - 130, c1.y + (j ? -30 : 30)], E.se(t, m2 + 0.5, m2 + 1.3), { w: 3, head: 13 }); });
        K.text(ctx, '1. aşama', 480, 512, { size: 32, align: 'center', color: '#8A4A10', alpha: E.se(t, m2 + 1.0, m2 + 1.8) });
      }
      // 2. aşama
      const a2 = E.se(t, m2 + 3.5, m2 + 5.5);
      if (a2 > 0) {
        S2.forEach((c2, j) => { const p = S1[j >> 1]; E.layer(ctx, E.clamp(a2 * 2), c => M.cell(c, E.lerp(p.x, c2.x, a2), E.lerp(p.y, c2.y, a2), E.lerp(60, 90, a2), c2.set, { dup: false, scale: 0.5, seed: 5740 + j })); P.arrow(ctx, [p.x + 125, p.y + (j % 2 ? 40 : -40)], [c2.x - 100, c2.y], E.se(t, m2 + 3.5, m2 + 4.3), { w: 2.6, head: 12 }); });
        K.text(ctx, '2. aşama', 835, 512, { size: 32, align: 'center', color: '#8A4A10', alpha: E.se(t, m2 + 4.0, m2 + 4.8) });
        const fk = E.se(t, m2 + 6, m2 + 7) * (1 - E.se(t, sf - 0.3, sf + 0.4));
        if (fk > 0) { ctx.save(); ctx.globalAlpha *= fk; K.text(ctx, '1 hücre → 4 hücre', 1520, 215, { size: 44, align: 'center', color: K.LIFE_D }); ctx.restore(); }
      }
      // sayılar
      const nk = E.se(t, m3 + 0.3, m3 + 1.1);
      if (nk > 0) {
        M.count(ctx, '46', PX, PY + 205, nk, { size: 42, tint: PAL.light });
        S2.forEach((c2, j) => M.count(ctx, '23', c2.x + 140, c2.y, E.se(t, m3 + 1.2 + j * 0.3, m3 + 1.8 + j * 0.3), { size: 40, tint: PAL.light, seed: 5 + j }));
        const sk = E.se(t, m3 + 3.5, m3 + 4.3);
        if (sk > 0 && t < sf + 0.5) { ctx.save(); ctx.globalAlpha *= sk * (1 - E.se(t, sf - 0.3, sf + 0.4)); K.text(ctx, 'sperm ya da yumurta', 1520, 300, { size: 38, align: 'center' }); K.text(ctx, '(üreme hücreleri)', 1520, 345, { size: 32, align: 'center', alpha: 0.65 }); ctx.restore(); }
      }
      // çeşitlilik
      const vk = E.se(t, m4 + 0.5, m4 + 1.3) * (1 - E.se(t, sf - 0.3, sf + 0.4));
      if (vk > 0) { ctx.save(); ctx.globalAlpha *= vk; P.drawOn(ctx, P.bez([1250, 160], [1295, 515], [1250, 870], 30), 1, { w: 3, color: K.LIFE_D }); K.text(ctx, 'dördü de', 1540, 560, { size: 44, align: 'center', color: K.LIFE_D }); K.text(ctx, 'birbirinden farklı', 1540, 615, { size: 44, align: 'center', color: K.LIFE_D }); K.text(ctx, '→ çeşitlilik', 1540, 680, { size: 40, align: 'center' }); ctx.restore(); }
      // döllenme
      const dk = E.se(t, sf + 0.3, sf + 1.1);
      if (dk > 0) E.layer(ctx, dk, c => {
        K.card(c, 1260, 170, 580, 700, { seed: 2990, tint: PAL.light, tintA: 0.07 });
        K.text(c, 'Döllenme', 1550, 240, { size: 48, align: 'center' });
        const mv = E.se(t, sf + 1.2, sf + 3.2);
        F.egg(c, 1640, 420, 80); M.count(c, '23', 1640, 420, 1, { size: 36, seed: 20 });
        c.save(); c.globalAlpha *= 1 - E.se(t, sf + 3.0, sf + 3.4); F.sperm(c, E.lerp(1380, 1540, mv), 420, 1, t, '23'); c.restore();
        P.arrow(c, [1550, 530], [1550, 610], E.se(t, sf + 3.3, sf + 3.9), { w: 3, head: 13 });
        const zk = E.se(t, sf + 3.6, sf + 4.4);
        if (zk > 0) { c.save(); c.globalAlpha *= zk; M.cell(c, 1550, 730, 95, M.full, { scale: 0.48, seed: 5760 }); M.count(c, 'zigot: 46', 1550, 845, 1, { size: 36, tint: PAL.life, seed: 21 }); c.restore(); }
      });
    }
  });
})();

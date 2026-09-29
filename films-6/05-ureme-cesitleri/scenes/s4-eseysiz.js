// SAHNE 4 — Eşeysiz üreme: tek ata, eşey hücresi birleşmez, yavrular atanın aynısı; dört çeşidin tanıtımı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  const CARDS = ['Bölünme', 'Tomurcuklanma', 'Rejenerasyon', 'Vejetatif üreme'];
  E.scene({
    name: 'Eşeysiz üreme', concept: 'Eşeysiz üreme: tek ata', from: 'asex1', to: 'asex2', trFrom: [1360, 540],
    draw(ctx, t) {
      const a1 = E.s('asex1'), a2 = E.s('asex2');
      const gy = 800;
      // zemin
      const soil = [[120, gy], [1800, gy - 6], [1800, gy + 90], [120, gy + 96]]; INK.wash(ctx, soil, '#8A6A45', 0.2, 70, { bleed: 3, blooms: 0 }); line(ctx, [120, gy], [1800, gy - 6], { w: 3, seed: 71 });
      // ata çilek ve iki yavru fide
      const X = [460, 860, 1260];
      const k1 = E.se(t, a1 + 1.0, a1 + 3.0), k2 = E.se(t, a1 + 3.0, a1 + 5.0);
      const run = (x0, x1, k, sd) => { if (k > 0) P.drawOn(ctx, P.bez([x0 + 12, gy - 10], [(x0 + x1) / 2, gy - 90], [x1, gy], 30), k, { w: 3, color: F.LIFE_D, seed: sd }); };
      run(X[0], X[1], k1, 80); run(X[1], X[2], k2, 81);
      const plant = (x, s, sd) => { for (let i = 0; i < 4; i++) line(ctx, [x + (i - 1.5) * 6, gy], [x + (i - 1.5) * 12, gy + 26 * s], { w: 1.4, dry: false, seed: sd + i, alpha: 0.8 }); [-0.6, 0.05, 0.6].forEach((a, i) => F.tri(ctx, x, gy, s, a + Math.sin(t * 0.8 + i) * 0.03, 5160 + i * 20)); };
      plant(X[0], 1.1, 90);
      const p1 = E.se(t, a1 + 2.4, a1 + 3.4, 'out'), p2 = E.se(t, a1 + 4.4, a1 + 5.4, 'out');
      if (p1 > 0) plant(X[1], 1.1 * p1, 94);
      if (p2 > 0) plant(X[2], 1.1 * p2, 98);
      // etiketler
      const kt = E.se(t, a1 + 0.6, a1 + 1.4);
      if (kt > 0) { P.write(ctx, 'tek ata', X[0], 540, kt, { size: 48, align: 'center' }); }
      const kn = E.se(t, a1 + 5.2, a1 + 6.2);
      if (kn > 0) {
        P.write(ctx, 'eşey hücresi birleşmez', 1560, 520, kn, { size: 40, align: 'center', color: F.LIFE_D });
      }
      const ke = E.se(t, a2 + 0.6, a2 + 1.8);
      if (ke > 0) {
        [[X[0], X[1]], [X[1], X[2]]].forEach(([a, b], i) => { const m = (a + b) / 2; ctx.save(); ctx.globalAlpha = ke; line(ctx, [m - 22, 600], [m + 22, 598], { w: 5, seed: 110 + i }); line(ctx, [m - 22, 620], [m + 22, 618], { w: 5, seed: 112 + i }); ctx.restore(); });
        P.write(ctx, 'yavrular = ata', 1560, 610, E.seg(t, a2 + 1.0, a2 + 2.0), { size: 48, align: 'center' });
        P.write(ctx, '(kalıtsal özellikler aynı)', 1560, 665, E.seg(t, a2 + 1.8, a2 + 2.8), { size: 34, align: 'center', weight: 400 });
      }
      // dört çeşit kartı
      CARDS.forEach((c, i) => {
        const at = a2 + 4.2 + i * 0.7, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const x = 390 + i * 380, y = 250; const s = P.pop(k);
        ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
        const card = F.rrect(0, 0, 340, 110, 18, 6); P.fillPts(ctx, card, '#FBF8F1'); INK.wash(ctx, card, F.LIFE, 0.2, 120 + i, { bleed: 1, blooms: 0 }); stroke(ctx, card, { w: 2.6, closed: true, seed: 124 + i });
        INK.label(ctx, String(i + 1), -140, -18, { size: 30, weight: 700, alpha: 0.5 });
        ctx.font = '700 44px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.font = `700 ${F.fit(ctx, c, 44, 290)}px Kalam`; ctx.fillText(c, 8, 16);
        ctx.restore();
      });
      // Damla
      DAMLA.draw(ctx, { x: 1700, y: 900, s: 0.9, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.1], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 4, arms: [[-1, 0.4], [1, 1.3]], prop: 'lens', propTilt: 0.3 });
    }
  });
})();

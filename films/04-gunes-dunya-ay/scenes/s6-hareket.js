// SAHNE 6 — Birbirlerine göre hareketler (kuzeyden bakış): Dünya 1 gün / 1 yıl; Ay ≈ 27,3 gün; Güneş ≈ 25 gün; hepsi saat yönünün tersine
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const AMB = '#C07F1E';
  const SX = 720, SY = 545, RO = 330;
  function spinArrow(ctx, x, y, r, t, sp, col, w = 3) { const a0 = -t * sp; const pts = P.arc(x, y, r, a0, a0 - 4.2, 24); stroke(ctx, pts, { w, color: col, dry: false }); arrowHead(ctx, pts[20], pts[24], 10 + w * 2, { w: w * 0.9, color: col }); }
  function ring(ctx, x, y, r, k, seed) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; stroke(ctx, INK.wobble(circlePts(x, y, r, r, 40), 3, seed), { w: 4, closed: true, color: AMB }); ctx.restore(); }
  E.scene({
    name: 'Hareketler', concept: 'Güneş, Dünya ve Ay\'ın birbirlerine göre hareketleri', from: 'earth', to: 'ccw', trFrom: [720, 545],
    draw(ctx, t) {
      const se = E.s('earth'), sm = E.s('moon'), ss = E.s('sun'), sc = E.s('ccw');
      ctx.save(); ctx.fillStyle = 'rgba(30,38,72,0.10)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      E.inkText(ctx, 'Kuzeyden bakış', 230, 250, t, se + 0.2, 1e9, { size: 44, align: 'center' });
      ctx.save(); ctx.globalAlpha = 0.6; dashed(ctx, circlePts(SX, SY, RO, RO, 140), { w: 2.2, on: 12, off: 9 }); ctx.restore();
      F04.orbitArrow(ctx, SX, SY, RO + 34, RO + 34, 2.2, 1.2, { w: 4, head: 16 });
      P.sun(ctx, SX, SY, 85, t, { nrays: 18, cells: false });
      if (t > ss) { ctx.save(); ctx.globalAlpha = E.se(t, ss + 0.3, ss + 1); spinArrow(ctx, SX, SY, 150, t, 0.6, AMB, 4); ctx.restore(); }
      // Dünya ve Ay (temsilî hızlar)
      const aE = 0.3 - (t - se) / 60 * 6.283;
      const ex = SX + Math.cos(aE) * RO, ey = SY + Math.sin(aE) * RO;
      ctx.save(); ctx.globalAlpha = 0.5; dashed(ctx, circlePts(ex, ey, 88, 88, 50), { w: 1.8, on: 8, off: 7 }); ctx.restore();
      P.earth(ctx, ex, ey, 34, { rot: t * 0.4 });
      spinArrow(ctx, ex, ey, 50, t, 2.4, PAL.water, 2.6);
      const aM = 0.5 - (t - se) / 7 * 6.283;
      const mx = ex + Math.cos(aM) * 88, my = ey + Math.sin(aM) * 88;
      P.moon(ctx, mx, my, 13);
      INK.label(ctx, 'Dünya', ex, ey - 100, { size: 32, weight: 700, align: 'center' });
      INK.label(ctx, 'Ay', mx + 22, my - 16, { size: 28, weight: 700 });
      ring(ctx, ex, ey, 60, Math.min(E.se(t, se + 0.5, se + 1.2), 1 - E.se(t, sm - 0.2, sm + 0.3)), 5);
      ring(ctx, mx, my, 26, Math.min(E.se(t, sm + 0.5, sm + 1.2), 1 - E.se(t, ss - 0.2, ss + 0.3)), 6);
      ring(ctx, SX, SY, 120, Math.min(E.se(t, ss + 0.5, ss + 1.2), 1 - E.se(t, sc - 0.2, sc + 0.3)), 7);
      INK.label(ctx, '(çizim ölçekli değildir; hızlar temsilîdir)', 40, 900, { size: 26, alpha: 0.6 });
      // sağ panel kartları
      const cards = [
        [se + 0.6, 'Dünya', PAL.water, ['kendi ekseni: 1 gün', 'Güneş çevresi: 1 yıl']],
        [sm + 0.4, 'Ay', '#6F6A63', ['Dünya çevresi: ≈ 27,3 gün', 'Dünya ile Güneş çevresinde']],
        [ss + 0.4, 'Güneş', AMB, ['kendi ekseni: ≈ 25 gün']]
      ];
      cards.forEach(([at, name, col, rows], i) => {
        const k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        const y = 180 + i * 190;
        E.layer(ctx, k, c => {
          F04.card(c, 1230, y, 620, 170, { seed: 40 + i });
          INK.label(c, name, 1265, y + 55, { size: 42, weight: 700, color: col });
          rows.forEach((r, j) => P.write(c, r, 1265, y + 105 + j * 44, E.seg(t, at + 0.6 + j * 1.4, at + 1.8 + j * 1.4), { size: 34 }));
        });
      });
      const kc = E.se(t, sc + 0.3, sc + 1.0, 'out');
      if (kc > 0) E.layer(ctx, kc, c => {
        F04.card(c, 1230, 750, 620, 150, { seed: 44, fill: '#FBF3DC' });
        P.icon.clock(c, 1310, 825, 0.5, 0);
        const ca = P.arc(1310, 825, 50, -0.6, -2.6, 20); stroke(c, ca, { w: 3.6, color: AMB, dry: false }); arrowHead(c, ca[16], ca[20], 12, { w: 3, color: AMB });
        P.write(c, 'hepsi saat yönünün tersine', 1385, 838, E.seg(t, sc + 0.8, sc + 2.2), { size: 34, color: '#8A4A10' });
      });
    }
  });
})();

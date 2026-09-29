// SAHNE 5 — Dünya üzerinde konuma göre ağırlık biraz değişir (TYMM: yer çekiminden hareketle konuma bağlı değişim)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  E.scene({
    name: 'Konum', concept: 'Ağırlık Dünya üzerindeki konuma göre değişebilir', from: 'earthpos', to: 'earthpos', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('earthpos');
      ctx.save(); ctx.fillStyle = 'rgba(46,106,140,0.1)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      const cx = 760, cy = 530, R = 300;
      P.earth(ctx, cx, cy, R, { rot: 0.3 });
      // mountain
      const mk = E.se(t, se + 5.5, se + 6.3);
      if (mk > 0) { const a = -0.55; const bx = cx + Math.cos(a) * R, by = cy + Math.sin(a) * R; ctx.save(); ctx.globalAlpha = mk; ctx.translate(bx, by); ctx.rotate(a + Math.PI / 2); const m = [[-50, 6], [0, -80], [50, 6]]; P.fillPts(ctx, m, '#8A6A45', 0.8); stroke(ctx, m, { w: 3 }); P.fillPts(ctx, [[-14, -56], [0, -80], [14, -56]], PAL.white); ctx.restore(); }
      // arrows toward the center (yer çekimi)
      const pts = [['kutup', -Math.PI / 2, 1.0, se + 1.0, 'biraz daha fazla'], ['ekvator', 0, 1.0, se + 3.4, 'biraz daha az'], ['yüksek dağ', -0.55, 1.18, se + 5.8, 'biraz daha az']];
      pts.forEach(([name, a, rf, at, eff], i) => {
        const k = E.se(t, at, at + 0.7); if (k <= 0) return;
        const px = cx + Math.cos(a) * R * rf, py = cy + Math.sin(a) * R * rf;
        ctx.save(); ctx.globalAlpha = k;
        P.fillPts(ctx, circlePts(px, py, 12, 12, 16), '#C8573A'); stroke(ctx, circlePts(px, py, 12, 12, 16), { w: 2, closed: true, dry: false });
        P.arrow(ctx, [px, py], [px - Math.cos(a) * 110, py - Math.sin(a) * 110], 1, { w: 5, head: 16, color: BR });
        ctx.restore();
        const lx = 1200, ly = 260 + i * 200;
        P.write(ctx, name + ':', lx, ly, E.seg(t, at + 0.2, at + 1.0), { size: 48 });
        P.write(ctx, 'ağırlık ' + eff, lx, ly + 60, E.seg(t, at + 0.8, at + 1.8), { size: 44, color: BR });
        ctx.save(); ctx.globalAlpha = 0.5 * k; INK.leader(ctx, [lx - 20, ly - 14], [px + (i === 1 ? 20 : 16), py - 6], { bend: 0.1, seed: 4500 + i }); ctx.restore();
      });
      E.inkText(ctx, 'kütle her yerde aynı kalır', 1420, 860, t, se + 8.0, 1e9, { size: 46, align: 'center', color: PAL.water });
      E.inkText(ctx, '(çizim ölçekli değildir)', 760, 900, t, se + 1.0, 1e9, { size: 28, align: 'center', alpha: 0.6, weight: 400 });
      INK.label(ctx, 'yer çekimi → merkeze doğru', 760, 196, { size: 36, weight: 700, align: 'center', alpha: E.se(t, se + 1.6, se + 2.4) });
    }
  });
})();

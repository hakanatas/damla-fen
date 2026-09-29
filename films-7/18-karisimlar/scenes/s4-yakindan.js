// SAHNE 4 — Yakından bakış (tanecik modeli): şeker her yere eşit dağılır; kum dağılmaz (KB2.2 sonuç çıkarma)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  function lens(ctx, cx, cy, R, t, kind, k) {
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
    ctx.fillStyle = '#E4EEF2'; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R);
    const r = rng(kind === 'sugar' ? 5600 : 5700);
    // su tanecikleri
    for (let i = 0; i < 70; i++) { const x = cx - R + r() * 2 * R + Math.sin(t * 2 + i) * 4, y = cy - R + r() * 2 * R + Math.cos(t * 1.7 + i) * 4; if (kind === 'sand' && y > cy + R * 0.45) continue; ctx.fillStyle = 'rgba(46,106,140,0.55)'; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); }
    if (kind === 'sugar') { for (let i = 0; i < 22; i++) { const x = cx - R * 0.9 + ((i * 0.618) % 1) * R * 1.8 + Math.sin(t * 1.5 + i) * 5, y = cy - R * 0.9 + ((i * 0.377 + (i % 5) * 0.2) % 1) * R * 1.8 + Math.cos(t * 1.3 + i) * 5; P.fillPts(ctx, circlePts(x, y, 14, 14, 16), '#FFFDF6'); stroke(ctx, circlePts(x, y, 14, 14, 16), { w: 2, closed: true, dry: false, seed: 5610 + i }); } }
    else { for (let i = 0; i < 9; i++) { const x = cx - R * 0.8 + i * R * 0.2, y = cy + R * 0.7 - (i % 3) * 30; const g = INK.wobble(circlePts(x, y, 34, 26, 18), 4, 5720 + i); P.fillPts(ctx, g, '#C9A56A'); stroke(ctx, g, { w: 2, closed: true, dry: false, seed: 5730 + i }); } }
    ctx.restore();
    stroke(ctx, circlePts(cx, cy, R, R, 60), { w: 6, closed: true, seed: kind === 'sugar' ? 5640 : 5740 });
    line(ctx, [cx + R * 0.72, cy + R * 0.72], [cx + R * 1.05, cy + R * 1.05], { w: 16, taper: 0.02 });
  }
  E.scene({
    name: 'Yakından bakış', concept: 'Her yerinde aynı özellik mi?', from: 'zoom', to: 'zoom2', trFrom: [560, 480],
    draw(ctx, t) {
      const sz = E.s('zoom'), s2 = E.s('zoom2');
      const k1 = E.se(t, sz + 0.3, sz + 1.2, 'out'), k2 = E.se(t, s2 + 0.3, s2 + 1.2, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => lens(c, 560, 500, 280, t, 'sugar'));
      if (k2 > 0) E.layer(ctx, k2, c => lens(c, 1360, 500, 280, t, 'sand'));
      E.inkText(ctx, 'şeker + su', 560, 175, t, sz + 0.8, 1e9, { size: 46, align: 'center' });
      E.inkText(ctx, 'kum + su', 1360, 175, t, s2 + 0.8, 1e9, { size: 46, align: 'center' });
      P.write(ctx, 'her yeri aynı', 560, 880, E.seg(t, sz + 3.2, sz + 4.2), { size: 50, align: 'center', color: PAL.water });
      P.write(ctx, 'her yeri aynı değil', 1360, 880, E.seg(t, s2 + 3.0, s2 + 4.0), { size: 50, align: 'center', color: K.AMBER });
      // lejant
      const lk = E.se(t, sz + 1.5, sz + 2.2);
      if (lk > 0) { ctx.save(); ctx.globalAlpha = lk; ctx.fillStyle = 'rgba(46,106,140,0.55)'; ctx.beginPath(); ctx.arc(900, 250, 9, 0, 7); ctx.fill(); INK.label(ctx, 'su', 920, 260, { size: 32 }); P.fillPts(ctx, circlePts(900, 300, 12, 12, 16), '#FFFDF6'); stroke(ctx, circlePts(900, 300, 12, 12, 16), { w: 2, closed: true, dry: false }); INK.label(ctx, 'şeker', 920, 310, { size: 32 }); ctx.restore(); }
      E.inkText(ctx, '(tanecik modeli, ölçekli değildir)', 960, 130, t, sz + 1.0, 1e9, { size: 30, align: 'center', alpha: 0.6, weight: 400 });
    }
  });
})();

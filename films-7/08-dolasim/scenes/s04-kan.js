// SAHNE 4 — Kanın yapısı (moleküler temele girilmez): plazma ve kan hücreleri; hücrelerin görevleri (yapıları verilmez)
(function () {
  const { PAL, stroke, wash, circlePts } = INK; const K = KIT, F = F08;
  E.scene({
    name: 'Kan', concept: 'Plazma ve kan hücrelerinin görevleri', from: 'blood', to: 'cells', trFrom: [420, 560],
    draw(ctx, t) {
      const sb = E.s('blood'), sc = E.s('cells');
      ctx.fillStyle = 'rgba(196,80,60,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      // tüp (ayrışmış kan örneği şeması)
      const x = 420, top = 260, bot = 820, w = 150, split = top + 40 + (bot - top - 40) * 0.55;
      const tubeP = [[x - w / 2, top], [x - w / 2, bot - 60]].concat(P.arc(x, bot - 60, w / 2, Math.PI, 0, 20), [[x + w / 2, top]]);
      const fk = E.se(t, sb + 0.5, sb + 2.5);
      ctx.save(); ctx.beginPath(); tubeP.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.clip();
      const lvl = E.lerp(bot, top + 40, fk);
      ctx.fillStyle = '#8E2F24'; ctx.fillRect(x - w, Math.max(lvl, split), 2 * w, bot);
      if (lvl < split) { ctx.fillStyle = '#EFD27A'; ctx.globalAlpha = 0.85; ctx.fillRect(x - w, lvl, 2 * w, split - lvl); ctx.globalAlpha = 1; ctx.fillStyle = '#F5F1E4'; ctx.fillRect(x - w, split - 3, 2 * w, 6); }
      ctx.restore();
      stroke(ctx, tubeP, { w: 3.5, seed: 8500 }); stroke(ctx, [[x - w / 2 - 14, top], [x + w / 2 + 14, top]], { w: 4 });
      INK.label(ctx, 'bekletilip ayrışmış kan örneği (şema)', x, 890, { size: 26, align: 'center', alpha: 0.6 });
      const lk = E.se(t, sb + 2.5, sb + 3.2);
      if (lk > 0) { ctx.save(); ctx.globalAlpha = lk; INK.leader(ctx, [560, (top + 40 + split) / 2], [x + 60, (top + 40 + split) / 2]); INK.leader(ctx, [560, (split + bot) / 2 + 20], [x + 60, (split + bot) / 2 + 20]); ctx.restore();
        K.text(ctx, 'plazma', 580, (top + 40 + split) / 2 + 12, { size: 42, alpha: lk, color: '#9A7A1E' }); K.text(ctx, '(≈ %55)', 580, (top + 40 + split) / 2 + 56, { size: 30, alpha: lk * 0.7 });
        K.text(ctx, 'kan hücreleri', 580, (split + bot) / 2 + 32, { size: 42, alpha: lk, color: '#8E2F24' }); K.text(ctx, '(≈ %45)', 580, (split + bot) / 2 + 76, { size: 30, alpha: lk * 0.7 }); }
      // plazma kartı
      const pk = E.se(t, sb + 3.5, sb + 4.2, 'out') * (1 - E.se(t, sc - 0.3, sc + 0.3));
      if (pk > 0) E.layer(ctx, pk, c => { K.card(c, 950, 300, 860, 300, { seed: 8510, tint: '#EFD27A', tintA: 0.15 }); K.text(c, 'Plazma: kanın sıvı kısmı', 1000, 390, { size: 46, color: '#9A7A1E' });
        P.write(c, 'su, besin ve atık maddeleri taşır', 1000, 480, E.seg(t, sb + 4.4, sb + 5.8), { size: 40 }); });
      // hücreler ve görevleri
      const ROWS = [['Alyuvar', 'oksijen taşır', (c, x, y) => { F.rbc(c, x - 22, y, 22); F.rbc(c, x + 22, y + 8, 22); }, F.OXY],
        ['Akyuvar', 'mikroplara karşı savunur', (c, x, y) => F.wbc(c, x, y, 34), '#6A6450'],
        ['Kan pulcuğu', 'pıhtılaşmayı sağlar', (c, x, y) => F.plt(c, x - 8, y - 6, 16), '#7A5A30']];
      ROWS.forEach(([n, job, ic, col], i) => { const at = sc + 0.3 + i * 3.2, k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return; const y = 300 + i * 190;
        E.layer(ctx, k, c => { K.card(c, 900, y - 70, 940, 160, { seed: 8520 + i, tint: col, tintA: 0.07 }); ic(c, 990, y + 10); K.text(c, n, 1080, y, { size: 46, color: col }); P.write(c, job, 1080, y + 58, E.seg(t, at + 0.6, at + 1.6), { size: 38 }); }); });
      if (t > sc + 9) INK.label(ctx, 'simgeler; hücrelerin yapısı gösterilmemiştir', 1370, 880, { size: 26, align: 'center', alpha: 0.6 * E.se(t, sc + 9, sc + 9.6) });
    }
  });
})();

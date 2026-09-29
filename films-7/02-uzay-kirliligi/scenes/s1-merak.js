// SAHNE 1 — Merak (E3.4, E3.8) ve iş birlikli grup (SDB2.1, SDB2.2, D14.1, E3.5)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  // yörüngedeki parçalar (deterministik)
  F.debrisField = (ctx, cx, cy, R, t, n, seed, k = 1, o = {}) => {
    if (k <= 0) return; const r = INK.rng(seed);
    for (let i = 0; i < n * k; i++) {
      const a = r() * 6.28 + t * (0.04 + r() * 0.06) * (r() > 0.2 ? 1 : -1), d = R * (1.12 + r() * (o.spread ?? 0.55)), tilt = 0.45 + r() * 0.4;
      const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * tilt;
      if (Math.sin(a) < 0 && Math.hypot((x - cx), (y - cy) / 1) < R) continue; // Dünya'nın arkası
      F.shard(ctx, x, y, (o.size ?? 7) * (0.5 + r()), seed * 7 + i, { rot: t * 0.5 });
    }
  };
  F.deadSat = (ctx, x, y, s, t, rot = 0) => { // görevi bitmiş uydu: bir paneli kırık, soluk
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= 0.9;
    F.satellite(ctx, 0, 0, s, t, { panels: false, dish: true });
    const p = [[-44 * s, -22 * s], [-150 * s, -22 * s], [-150 * s, 22 * s], [-44 * s, 22 * s]];
    P.fillPts(ctx, p, '#8C9AA2', 0.7); stroke(ctx, p.concat([p[0]]), { w: 2, closed: true, seed: 402 });
    ctx.save(); ctx.translate(90 * s, 20 * s); ctx.rotate(0.7); const q = [[0, -22 * s], [80 * s, -22 * s], [60 * s, 22 * s], [0, 22 * s]]; P.fillPts(ctx, q, '#8C9AA2', 0.7); stroke(ctx, q.concat([q[0]]), { w: 2, closed: true, seed: 403 }); ctx.restore();
    ctx.restore();
  };
  E.scene({
    name: 'Merak', concept: 'Soru sorma ve iş birliği', from: 'title', to: 'group',
    draw(ctx, t) {
      const sh = E.s('hello'), sg = E.s('group');
      F.night(ctx, 1);
      F.stars(ctx, t, 1, { n: 90, seed: 81, area: [0, 0, E.W, E.H] });
      P.earth(ctx, 1420, 1020, 420);
      F.debrisField(ctx, 1420, 1020, 420, t, 40, 5, E.se(t, sh + 2, sh + 5), { spread: 0.5, size: 8 });
      F.deadSat(ctx, 1450 + t * 5, 430 + Math.sin(t * 0.4) * 10, 0.7, t, t * 0.15);
      E.inkText(ctx, 'görevi biten uydu', 1480 + t * 5, 560, t, sh + 1.2, sg, { size: 38, color: '#FBF3DC', align: 'center' });
      DAMLA.draw(ctx, { x: 470, y: 900, s: 1.35, view: 'q3', expr: t > sg ? 'happy' : 'curious', look: [0.8, -0.6], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > sg ? [[-1, 0.35], [1, 1.2]] : [[-1, 0.35], [1, [40, -150], 0.4]], prop: t > sg ? 'notebook' : undefined });
      const bk = E.se(t, sh + 0.4, sh + 1.2, 'out') * (1 - E.se(t, sg - 0.4, sg + 0.2));
      if (bk > 0) {
        P.bubble(ctx, 760, 330, 620, 230, [560, 600], bk, 3);
        if (bk > 0.9) { P.write(ctx, 'Görevi biten araçlar', 760, 310, E.seg(t, sh + 1, sh + 2.2), { size: 48, align: 'center' });
          P.write(ctx, 'ne olur?', 760, 380, E.seg(t, sh + 2.2, sh + 3), { size: 48, align: 'center' }); }
      }
      const gk = E.se(t, sg + 0.3, sg + 1.1, 'out');
      if (gk > 0) E.layer(ctx, gk, c => {
        F.card(c, 640, 190, 700, 430, { seed: 410 });
        INK.label(c, 'Grubumuzun kuralları', 990, 260, { size: 46, weight: 700, align: 'center', color: F.AMBER_D });
        ['etkin dinle', 'açık fikirli ol', 'saygıyla konuş', 'görüşünü gerekçelendir'].forEach((s, i) => {
          const k = E.se(t, sg + 1.2 + i * 1.0, sg + 1.8 + i * 1.0); P.check(c, 720, 330 + i * 72, 36, k, { w: 5, color: '#4E6B22' });
          P.write(c, s, 770, 345 + i * 72, k, { size: 42 }); });
      });
      F.title(ctx, t, E.e('title') + 1.4, '2', 'Uzay Kirliliği', 1);
    }
  });
})();

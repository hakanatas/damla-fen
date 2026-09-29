// SAHNE 1 — Çayır: çekirge ot yer, kurbağa izler; soru (köprü kurma: çevrede görülen canlılar)
(function () {
  const { PAL, line, stroke, wash } = INK;
  const F = F722;
  F.meadow = (ctx, t, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.16)'); g.addColorStop(0.6, 'rgba(111,138,58,0.06)'); g.addColorStop(1, 'rgba(111,138,58,0)');
    ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
    if (o.sun !== false) P.sun(ctx, o.sunX ?? 1680, o.sunY ?? 210, 80, t, { nrays: 18, cells: false });
    const hill = P.hillLine(E.W, 870);
    const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]);
    P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.28, 2201, { bleed: 3, blooms: 3 }); stroke(ctx, hill, { w: 4, seed: 2202, taper: 0.03 });
    return hill;
  };
  E.scene({
    name: 'Çayır', concept: 'Merak; kim kimi yer?', from: 'title', to: 'question',
    draw(ctx, t) {
      const sm = E.s('meadow'), sq = E.s('question');
      ctx.save(); E.cam(ctx, { x: 960 + 60 * E.se(t, sm, sm + 5), y: 540, z: 1.04 });
      const hill = F.meadow(ctx, t);
      for (let i = 0; i < 6; i++) { const x = 820 + i * 120; F.grass(ctx, x, P.hillY(hill, x) - 40, 1.1, t, i); }
      const hop = Math.max(0, Math.sin(t * 2.2)) * 6;
      F.hopper(ctx, 1080, P.hillY(hill, 1080) - 58 - hop, 1.0, t);
      F.frog(ctx, 1500, P.hillY(hill, 1500) - 30, 1.0, -1);
      if (t > sm + 1.5) { ctx.save(); ctx.globalAlpha = E.se(t, sm + 1.5, sm + 2.2) * (1 - E.se(t, sq + 2, sq + 3)); INK.label(ctx, 'çekirge', 1030, P.hillY(hill, 1080) - 130, { size: 38, weight: 700 }); INK.label(ctx, 'kurbağa', 1440, P.hillY(hill, 1500) - 110, { size: 38, weight: 700 }); ctx.restore(); }
      F.damla(ctx, t, { x: 440, y: P.hillY(hill, 440) + 6, s: 1.3, view: 'q3', expr: t > sq ? 'thinking' : 'curious', look: [0.9, -0.1], prop: t < sq ? 'lens' : null, arms: t < sq ? [[-1, 0.4], [1, 1.8]] : [[-1, 0.4], [1, 0.6]] });
      ctx.restore();
      const bk = E.se(t, sq + 0.2, sq + 0.9);
      if (bk > 0) {
        P.bubble(ctx, 860, 330, 900, 230, [520, 560], bk, 4);
        P.write(ctx, 'Kim kimi yiyor?', 860, 310, E.seg(t, sq + 0.6, sq + 1.6), { size: 56, align: 'center' });
        P.write(ctx, 'Enerji nereden geliyor?', 860, 385, E.seg(t, sq + 2.0, sq + 3.2), { size: 48, align: 'center', color: F.AMB });
      }
      F.title(ctx, t, '22 · Besin Zinciri', 'Fen Bilimleri · 7. sınıf · Ünite 7', PAL.life);
    }
  });
})();

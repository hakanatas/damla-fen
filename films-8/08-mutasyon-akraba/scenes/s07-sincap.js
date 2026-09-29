// SAHNE 7 — Mutasyon örnek olayı: beyaz sincap; bilgi toplama araçlarını belirleme (FB.8.3.7 a)
(function () {
  const { PAL, stroke, line, wash, circlePts, wobble } = INK;
  const F = F808;
  F.forest = (ctx, t, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.14)'); g.addColorStop(1, 'rgba(138,106,69,0.16)');
    ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
    [[150, 0.9], [1780, 1.1], [1350, 0.75]].forEach(([x, s], i) => {
      ctx.save(); ctx.globalAlpha *= 0.85;
      F.shape(ctx, [[x - 26 * s, 900], [x - 18 * s, 380], [x + 18 * s, 380], [x + 26 * s, 900]], '#8A6A45', 0.5, 4000 + i);
      const cr = wobble(circlePts(x, 330 - 40 * s, 170 * s, 140 * s, 40), 12, 4010 + i); wash(ctx, cr, PAL.life, 0.45, 4020 + i, { bleed: 3 }); stroke(ctx, cr, { w: 3, closed: true, seed: 4030 + i });
      ctx.restore();
    });
    const hill = P.hillLine(E.W, 880);
    const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]);
    P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, '#8A6A45', 0.22, 4040, { bleed: 3, blooms: 3 }); stroke(ctx, hill, { w: 4, seed: 4041, taper: 0.03 });
    return hill;
  };
  E.scene({
    name: 'Beyaz sincap', concept: 'Örnek olay; araç seçimi', from: 'squirrel', to: 'tools', trFrom: [1100, 700],
    draw(ctx, t) {
      const sq = E.s('squirrel'), st = E.s('tools');
      const dim = E.se(t, st - 0.2, st + 0.8);
      ctx.save(); E.cam(ctx, { x: 960 + 50 * E.se(t, sq, sq + 6), y: 540, z: 1.03 });
      const hill = F.forest(ctx, t);
      F.squirrel(ctx, 820, P.hillY(hill, 820) + 4, 0.85, '#9A6A3A', { t, nut: true });
      F.squirrel(ctx, 1480, P.hillY(hill, 1480) + 4, 0.8, '#8A5A30', { t: t + 1, flip: true });
      F.squirrel(ctx, 1130, P.hillY(hill, 1130) + 4, 0.95, null, { t: t + 2, albino: true });
      if (t > sq + 2.4) { ctx.save(); ctx.globalAlpha *= E.se(t, sq + 2.4, sq + 3.2) * (1 - dim); INK.label(ctx, 'bembeyaz kürk, pembe gözler', 1130, P.hillY(hill, 1130) - 250, { size: 40, weight: 700, align: 'center' }); ctx.restore(); }
      F.damla(ctx, t, { x: 430, y: P.hillY(hill, 430) + 6, s: 1.3, expr: t > sq + 4.5 ? 'thinking' : 'surprised', look: [0.9, -0.1], prop: t < sq + 4.5 ? 'lens' : null, arms: t < sq + 4.5 ? [[-1, 0.4], [1, 1.8]] : [[-1, 0.4], [1, 0.6]] });
      ctx.restore();
      const bk = E.se(t, sq + 4.6, sq + 5.2) * (1 - dim);
      if (bk > 0) { P.bubble(ctx, 720, 300, 620, 170, [520, 560], bk, 9); P.write(ctx, 'Bu nasıl olabilir?', 720, 318, E.seg(t, sq + 5.0, sq + 6.0), { size: 56, align: 'center' }); }
      // araçlar
      if (dim > 0) {
        ctx.save(); ctx.globalAlpha = 0.78 * dim; ctx.fillStyle = PAL.paper; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
        const TOOLS = [
          ['güvenilir genel ağ adresleri', c => P.icon.laptop(c, 0, -10, 1.1, t)],
          ['basılı kaynaklar', c => P.icon.books(c, 0, 0, 1.05)],
          ['uzmanla görüşme', c => { F.person(c, -10, 85, 0.72, null, { seed: 41 }); P.bubble(c, 70, -70, 110, 70, null, 1, 12); INK.label(c, '?', 70, -56, { size: 44, weight: 700, align: 'center' }); }]
        ];
        TOOLS.forEach(([lab, fn], i) => {
          const at = st + 1.0 + i * 1.6, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const cx = 420 + i * 540, cy = 480;
          E.layer(ctx, k, c => {
            F.card(c, cx - 230, cy - 230, 460, 420, 4100 + i);
            c.save(); c.translate(cx, cy - 40); fn(c); c.restore();
            F.fit(c, lab, cx, cy + 150, 420, 40);
          });
        });
        E.inkText(ctx, 'Hangi araçla bilgiye ulaşırım?', 960, 200, t, st + 0.5, 1e9, { size: 54, align: 'center' });
      }
    }
  });
})();

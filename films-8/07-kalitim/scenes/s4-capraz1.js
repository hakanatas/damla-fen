// SAHNE 4 — FB.8.3.5 Problem 1: saf sarı (SS) × yeşil (ss) → 1. döl: hepsi Ss (sarı, melez)
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT, F = G8;
  function gamete(c, g, x, y, k) { if (k <= 0) return; c.save(); c.globalAlpha *= k; const cp = circlePts(x, y, 38, 38, 26); P.fillPts(c, cp, '#FBF8F1'); INK.wash(c, cp, PAL.life, 0.25, 3500, { bleed: 0.5, blooms: 0 }); stroke(c, cp, { w: 2.4, closed: true, dry: false }); K.text(c, g, x, y + 16, { size: 44, align: 'center' }); c.restore(); }
  E.scene({
    name: 'Problem 1', concept: 'SS × ss → 1. döl', from: 'cross1', to: 'f1', trFrom: [960, 540],
    draw(ctx, t) {
      const s1 = E.s('cross1'), sg = E.s('gam'), sf = E.s('f1');
      ctx.fillStyle = 'rgba(227,160,58,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const pk = E.se(t, s1 + 0.3, s1 + 1.1);
      E.layer(ctx, pk, c => {
        K.text(c, 'Ata (P):', 170, 250, { size: 40, alpha: 0.75 });
        F.pea(c, 400, 330, 56, 'Y', { seed: 1 }); K.text(c, 'SS', 400, 440, { size: 54, align: 'center', color: K.LIFE_D }); K.text(c, 'saf sarı', 400, 488, { size: 32, align: 'center', alpha: 0.7 });
        K.text(c, '×', 560, 350, { size: 70, align: 'center' });
        F.pea(c, 720, 330, 56, 'G', { seed: 2 }); K.text(c, 'ss', 720, 440, { size: 54, align: 'center', color: '#8A4A10' }); K.text(c, 'yeşil', 720, 488, { size: 32, align: 'center', alpha: 0.7 });
      });
      // üreme hücreleri
      const gk = E.se(t, sg + 0.5, sg + 1.3);
      if (gk > 0) {
        ctx.save(); ctx.globalAlpha *= gk; P.arrow(ctx, [400, 510], [400, 590], 1, { w: 2.6, head: 12 }); P.arrow(ctx, [720, 510], [720, 590], 1, { w: 2.6, head: 12 }); ctx.restore();
        gamete(ctx, 'S', 400, 640, gk); gamete(ctx, 's', 720, 640, E.se(t, sg + 1.2, sg + 2.0));
        ctx.save(); ctx.globalAlpha *= E.se(t, sg + 2.5, sg + 3.3); K.text(ctx, 'üreme hücreleri: her birinde tek gen', 560, 730, { size: 32, align: 'center', alpha: 0.75, maxW: 700 }); ctx.restore();
      }
      // tablo
      F.punnett(ctx, { x: 980, y: 190, cs: 170, top: ['S', 'S'], left: ['s', 's'], t, tIn: sf - 0.2, t0: sf + 1.0, dt: 0.7 });
      const lk = E.se(t, sf + 0.4, sf + 1.0);
      if (lk > 0) { ctx.save(); ctx.globalAlpha *= lk; K.text(ctx, 'SS’ten', 1320, 180, { size: 30, align: 'center', alpha: 0.7 }); K.text(ctx, 'ss’ten', 950, 540, { size: 30, align: 'center', alpha: 0.7, rot: -1.57 }); ctx.restore(); }
      const rk = E.se(t, sf + 4.0, sf + 4.8);
      if (rk > 0) { ctx.save(); ctx.globalAlpha *= rk; K.card(ctx, 1000, 740, 680, 130, { seed: 3510, tint: PAL.light, tintA: 0.12 }); K.text(ctx, '1. döl: %100 Ss → sarı, melez', 1340, 820, { size: 44, align: 'center' }); ctx.restore(); }
      K.damla(ctx, t, { x: 1790, y: 900, s: 0.95, flip: true, expr: t > sf + 4 ? 'happy' : 'thinking', look: [-0.8, -0.3], talk: E.talk(t), arms: [[-1, 0.4], [1, 0.6]] });
    }
  });
})();

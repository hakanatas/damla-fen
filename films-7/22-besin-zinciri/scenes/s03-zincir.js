// SAHNE 3 — Besin zinciri: ot → çekirge → kurbağa → yılan → şahin; oklar yenilenden yiyene (enerji akışı); başta Güneş ve üretici.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F722;
  const KEYS = ['ot', 'cekirge', 'kurbaga', 'yilan', 'sahin'];
  const LV = ['üretici', '1. tüketici', '2. tüketici', '3. tüketici', '4. tüketici'];
  const CW = 220, CH = 210, Y = 390;
  F.CX = i => 440 + i * 320;
  // zincir satırı (sahne 3 ve 4 ortak): o.cards(i) → 0..1, o.arrows(i) → 0..1, o.dim(i) → 0..1
  F.chainRow = (ctx, t, o) => {
    KEYS.forEach((key, i) => {
      const k = o.cards(i); if (k <= 0) return;
      const [name, draw] = F.ORG[key];
      const x = F.CX(i) - CW / 2;
      E.layer(ctx, k * (1 - 0.75 * (o.dim ? o.dim(i) : 0)), c => {
        c.save(); c.translate(F.CX(i), Y + CH / 2); c.scale(P.pop(E.clamp(k * 1.2)), P.pop(E.clamp(k * 1.2))); c.translate(-F.CX(i), -(Y + CH / 2));
        F.orgCard(c, x, Y, CW, CH, name, (cc, cx, cy) => draw(cc, cx, cy, t), 2600 + i, { size: 36, tint: i === 0 ? PAL.life : null });
        c.restore();
      });
      if (o.levels) { const kl = o.levels(i); if (kl > 0) F.fit(ctx, LV[i], F.CX(i), Y + CH + 50, CW, 34, { alpha: kl, color: i ? F.AMB : F.GREEN }); }
    });
    for (let i = 0; i < 4; i++) {
      const k = o.arrows(i); if (k <= 0) continue;
      P.arrow(ctx, [F.CX(i) + CW / 2 + 8, Y + CH / 2], [F.CX(i + 1) - CW / 2 - 8, Y + CH / 2], k, { w: 5, color: F.AMB, bend: 0, head: 16 });
    }
  };
  E.scene({
    name: 'Besin zinciri', concept: 'Zincir ve enerji akışı', from: 'chain', to: 'sun', trFrom: [300, 500],
    draw(ctx, t) {
      const sc = E.s('chain'), sa = E.s('arrows'), ss = E.s('sun');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.12)'); g.addColorStop(1, 'rgba(111,138,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // Güneş
      const ks = E.se(t, sc + 0.2, sc + 1.0);
      ctx.save(); ctx.globalAlpha *= ks; P.sun(ctx, 150, Y + CH / 2, 70, t, { nrays: 16, cells: false }); ctx.restore();
      P.arrow(ctx, [240, Y + CH / 2], [F.CX(0) - CW / 2 - 8, Y + CH / 2], E.se(t, ss + 0.6, ss + 1.6), { w: 5, color: F.AMB, bend: 0, head: 16 });
      F.chainRow(ctx, t, {
        cards: i => E.se(t, sc + 1.0 + i * 1.2, sc + 1.6 + i * 1.2, 'out'),
        arrows: i => E.se(t, sa + 0.6 + i * 0.7, sa + 1.2 + i * 0.7),
        levels: i => E.se(t, sa + 4.2 + i * 0.3, sa + 4.8 + i * 0.3)
      });
      // okun anlamı
      const km = E.se(t, sa + 1.4, sa + 2.2);
      if (km > 0) {
        ctx.save(); ctx.globalAlpha *= km;
        F.card(ctx, 560, 190, 800, 130, 2620);
        P.arrow(ctx, [600, 255], [760, 255], 1, { w: 5, color: F.AMB, bend: 0, head: 16 });
        F.fit(ctx, 'yenilen  →  yiyen  =  enerjinin yönü', 1050, 270, 560, 40);
        ctx.restore();
      }
      const kk = E.se(t, ss + 1.4, ss + 2.2);
      if (kk > 0) { ctx.save(); ctx.globalAlpha *= kk; F.fit(ctx, 'Güneş enerjisi → üretici → tüketiciler', 960, 800, 1100, 46, { color: F.AMB }); ctx.restore(); }
    }
  });
  E.scene({
    name: 'Neden-sonuç', concept: 'Nedensel ilişkiler', from: 'cause', to: 'effect', tr: 0.4, trFrom: [1130, 500],
    draw(ctx, t) {
      const sc = E.s('cause'), se = E.s('effect');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.12)'); g.addColorStop(1, 'rgba(111,138,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      P.sun(ctx, 150, Y + CH / 2, 70, t, { nrays: 16, cells: false });
      P.arrow(ctx, [240, Y + CH / 2], [F.CX(0) - CW / 2 - 8, Y + CH / 2], 1, { w: 5, color: F.AMB, bend: 0, head: 16 });
      const gone = E.se(t, sc + 1.2, sc + 2.4);
      F.chainRow(ctx, t, { cards: () => 1, arrows: i => (i === 1 || i === 2) ? 1 - gone * 0.8 : 1, dim: i => i === 2 ? gone : 0 });
      if (gone > 0) { F.fit(ctx, '?', F.CX(2), Y + CH / 2 + 30, 100, 120, { color: F.AMB, alpha: gone }); }
      F.wfit(ctx, 'Kurbağalar yok olursa...', 960, 250, E.seg(t, sc + 0.4, sc + 1.8), 56, 900, { align: 'center' });
      const eff = [[1, 'çoğalır', '↑', se + 0.6], [0, 'azalır', '↓', se + 2.2], [3, 'besin bulamaz', '↓', se + 4.0]];
      eff.forEach(([i, txt, arr, at]) => {
        const k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k;
        F.fit(ctx, arr + ' ' + txt, F.CX(i), Y + CH + 60, CW + 60, 42, { color: F.HEAT });
        ctx.restore();
        if (i === 1) for (let m = 0; m < 3; m++) { const km = E.se(t, at + 0.4 + m * 0.3, at + 0.8 + m * 0.3); if (km > 0) { ctx.save(); ctx.globalAlpha *= km; F.hopper(ctx, F.CX(1) - 70 + m * 70, Y + CH + 130, 0.45, t); ctx.restore(); } }
      });
      const kz = E.se(t, se + 6.0, se + 6.8);
      if (kz > 0) { ctx.save(); ctx.globalAlpha *= kz; F.fit(ctx, 'Bir halka, bütün zinciri etkiler.', 960, 860, 1000, 48, { color: F.GREEN }); ctx.restore(); }
    }
  });
})();

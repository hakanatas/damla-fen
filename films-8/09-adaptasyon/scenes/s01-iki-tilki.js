// SAHNE 1 — Çöl ve kutup: iki tilkiyi gözlemleme; merak ve soru (FB.8.3.8 a)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F809;
  E.scene({
    name: 'İki tilki', concept: 'Gözlem; merak', from: 'title', to: 'question',
    draw(ctx, t) {
      const sd = E.s('desert'), sa = E.s('arctic'), sq = E.s('question');
      const split = E.se(t, sa - 0.2, sa + 1.4);            // kutup yarısı sağdan açılır
      const xs = E.lerp(E.W + 200, 960, split);
      ctx.save(); ctx.beginPath(); ctx.rect(-10, -10, xs + 10, E.H + 20); ctx.clip();
      const dune = F.desertBg(ctx, t);
      P.sun(ctx, 300, 220, 80, t, { nrays: 18, cells: false });
      F.fox(ctx, E.lerp(700, 500, split), 800, 1.35, 'desert', { t });
      if (t > sd + 1.5) { ctx.save(); ctx.globalAlpha *= E.se(t, sd + 1.5, sd + 2.3); INK.label(ctx, 'çöl tilkisi', E.lerp(700, 500, split) + 20, 880, { size: 42, weight: 700, align: 'center' }); ctx.restore(); }
      ctx.restore();
      if (split > 0) {
        ctx.save(); ctx.beginPath(); ctx.rect(xs, -10, E.W - xs + 20, E.H + 20); ctx.clip();
        F.snowBg(ctx, t);
        F.fox(ctx, 1480, 800, 1.35, 'arctic', { t: t + 1, flip: false });
        if (t > sa + 1.5) { ctx.save(); ctx.globalAlpha *= E.se(t, sa + 1.5, sa + 2.3); INK.label(ctx, 'kutup tilkisi', 1500, 880, { size: 42, weight: 700, align: 'center' }); ctx.restore(); }
        ctx.restore();
        stroke(ctx, [[xs, -10], [xs + 6, 540], [xs - 4, 1090]], { w: 4, seed: 5700 });
      }
      // Damla ortada, soru
      const dk = E.se(t, sq - 0.2, sq + 0.6, 'out');
      if (dk > 0) E.layer(ctx, dk, c => F.damla(c, t, { x: 960, y: 900, s: 1.0, view: 'front', expr: 'thinking', look: [0, -0.4], arms: [[-1, 2.0], [1, 0.5]] }));
      const bk = E.se(t, sq + 0.4, sq + 1.1);
      if (bk > 0) { P.bubble(ctx, 960, 330, 760, 200, [960, 620], bk, 5); P.write(ctx, 'Neden bu kadar farklılar?', 960, 350, E.seg(t, sq + 0.8, sq + 2.0), { size: 56, align: 'center' }); }
      F.title(ctx, t, '9 · Canlıların Çevreye Uyumu', 'Fen Bilimleri · 8. sınıf · Ünite 3', PAL.life);
    }
  });
})();

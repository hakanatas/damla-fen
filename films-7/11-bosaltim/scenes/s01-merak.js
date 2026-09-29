// SAHNE 1 — Başlık + Merak: terleme, su içme; atıklar nasıl uzaklaştırılır?
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F11;
  E.scene({
    name: 'Merak', concept: 'Terleme ve su içme; atıkların uzaklaştırılması sorusu', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('question');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.12)'); g.addColorStop(1, 'rgba(111,138,58,0.14)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      stroke(ctx, [[60, 884], [1860, 880]], { w: 3, seed: 11001 });
      P.sun(ctx, 1770, 250, 64, t, { seed: 3 });
      const wk = E.se(t, sh, sh + 3.2), walking = t > sh && t < sh + 3.2;
      const x = E.lerp(260, 620, wk), bob = walking ? Math.abs(Math.sin(t * 9)) * 8 : 0;
      const drink = t > sh + 3.6;
      K.damla(ctx, t, { x, y: 880 - bob, s: 1.3, view: walking ? 'side' : 'q3', expr: t > sq ? 'thinking' : drink ? 'happy' : 'determined', look: [0.6, drink && t < sq ? -0.5 : -0.2], feet: walking ? E.walk(t * 9) : undefined,
        arms: drink && t < sq ? [[-1, 0.5], [1, [60, -150], 0.5]] : [[-1, 0.4], [1, t > sq ? 2.2 : 0.4]] });
      // ter damlacıkları
      if (t > sh + 1 && t < sq + 2) for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= (1 - ph) * E.se(t, sh + 1, sh + 1.6) * (1 - E.se(t, sq, sq + 2)); F.drop(ctx, x - 70 + i * 60, 880 - 290 - bob + ph * 60, 10); ctx.restore(); }
      if (drink && t < sq + 0.6) { ctx.save(); ctx.globalAlpha *= E.se(t, sh + 3.6, sh + 4.2) * (1 - E.se(t, sq, sq + 0.6)); F.glass(ctx, x + 95, 690, 0.6, E.lerp(0.8, 0.3, E.se(t, sh + 4.2, sq))); ctx.restore(); }
      const qk = E.se(t, sq + 0.4, sq + 1.1, 'out');
      K.node(ctx, 'Atıklar nasıl uzaklaştırılır?', 1250, 470, qk, { size: 50, tint: PAL.light, tintA: 0.25, seed: 1 });
      K.node(ctx, 'Hangi yapılar görev yapar?', 1250, 620, E.se(t, sq + 3, sq + 3.6, 'out'), { size: 50, tint: PAL.water, tintA: 0.2, seed: 2 });
      K.title(ctx, t, 11, 'Vücudumuzun Temizlik Ekibi: Boşaltım Sistemi', 3);
    }
  });
})();

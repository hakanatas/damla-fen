// SAHNE 1 — Başlık + Merak: balon patlar, kalp hızlanır; haberi kim taşıdı?
(function () {
  const { PAL, stroke, line } = INK; const K = KIT, F = F10;
  E.scene({
    name: 'Merak', concept: 'Heyecanla kalp hızlanır: haberci kim?', from: 'title', to: 'question',
    draw(ctx, t) {
      const ss = E.s('scare'), sq = E.s('question'), pop = ss + 2.0, popped = t > pop;
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.08)'); g.addColorStop(1, 'rgba(181,85,63,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      stroke(ctx, [[60, 884], [1860, 880]], { w: 3, seed: 10001 });
      if (!popped) F.balloon(ctx, 1080, 540 + Math.sin(t * 1.5) * 8, 90);
      else if (t < pop + 1.2) { const k = E.seg(t, pop, pop + 0.6); ctx.save(); ctx.globalAlpha = 1 - E.seg(t, pop + 0.6, pop + 1.2); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; line(ctx, [1080 + Math.cos(a) * (60 + k * 60), 540 + Math.sin(a) * (60 + k * 60)], [1080 + Math.cos(a) * (100 + k * 90), 540 + Math.sin(a) * (100 + k * 90)], { w: 4, color: PAL.water, dry: false }); } ctx.restore(); }
      if (popped) K.text(ctx, 'PAT!', 1080, 560, { size: 90, align: 'center', color: PAL.water, alpha: 1 - E.se(t, pop + 1.5, pop + 2.5) });
      K.damla(ctx, t, { x: 700, y: 880, s: 1.5, view: 'front', expr: popped ? 'surprised' : 'happy', look: [0.8, -0.3], squash: E.breath(t) * (popped && t < sq ? 1 + 0.03 * Math.sin(t * 30) : 1), arms: popped && t < sq ? [[-1, 2.4], [1, 2.4]] : [[-1, 0.4], [1, 0.4]] });
      // kalp
      const hk = E.se(t, pop + 0.4, pop + 1.0);
      if (hk > 0) { const rate = t < sq + 6 ? 9 : 5; E.layer(ctx, hk, c => F.heart(c, 880, 520, 1.0, Math.max(0, Math.sin(t * rate)))); K.text(ctx, 'küt küt!', 880, 440, { size: 40, align: 'center', color: '#B5553F', alpha: hk * (1 - E.se(t, sq, sq + 0.6)) }); }
      // soru
      const qk = E.se(t, sq + 0.4, sq + 1.0, 'out');
      if (qk > 0) {
        K.node(ctx, 'Kalbe “hızlan” haberini kim gönderdi?', 1400, 280, qk, { size: 40, tint: PAL.light, seed: 1 });
        const vk = E.se(t, sq + 4.0, sq + 4.8);
        if (vk > 0) E.layer(ctx, vk, c => { F.vessel(c, 1060, 1780, 580, t, { dots: 5 }); K.text(c, 'kanda taşınan bir madde', 1420, 700, { size: 40, align: 'center', color: K.AMBER_D }); });
        const nk = E.se(t, sq + 2.8, sq + 3.4);
        if (nk > 0) { K.text(ctx, 'bir sinir değil...', 1420, 440, { size: 40, align: 'center', alpha: nk }); }
      }
      K.title(ctx, t, 10, 'Kimyasal Haberciler: İç Salgı Bezleri', 3);
    }
  });
})();

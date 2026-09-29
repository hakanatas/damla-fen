// SAHNE 6 — Reosta (FB.6.6.3 a: reosta ile direncin niteliklerini tanımlar; b: veri toplar ve kaydeder)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const POS = [0.25, 0.5, 0.75, 1.0];
  const bOf = p => F20.B(F20.R(100 * p, false, 'nicr'));
  E.scene({
    name: 'Reosta', concept: 'Ayarlanabilir direnç: reosta', from: 'rheo', to: 'rheo-data', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('rheo'), sh = E.s('rheo-how'), so = E.s('rheo-obs'), sd = E.s('rheo-data');
      // sürgü konumu
      let p = 0.25;
      if (t > so) p = E.lerp(0.12, 1.0, E.se(t, so + 0.5, so + 7.5, 'sine'));
      if (t > sd) { const i = Math.min(3, Math.floor((t - sd - 0.3) / 1.6)); p = t < sd + 0.3 ? 1.0 : POS[Math.max(0, i)]; }
      const b = bOf(p);
      ctx.save();
      CK.table(ctx, 830);
      const r = F20.rig(ctx, 1000, 830, 1.0, b, t, { rheo: p, hi: E.se(t, sh + 2.5, sh + 3.3) });
      // etiketler
      const kh = E.se(t, sh + 0.4, sh + 1.0);
      if (kh > 0 && t < sd) {
        ctx.save(); ctx.globalAlpha = kh;
        INK.leader(ctx, [r.board.b[0] + 70, 640], [r.board.b[0] + 10, r.board.b[1] + 4]);
        INK.label(ctx, 'sürgü', r.board.b[0] + 80, 630, { size: 38, weight: 700 });
        INK.label(ctx, 'krom-nikel tel', 1500, 900, { size: 36, align: 'center' });
        ctx.restore();
        const ka = E.se(t, sh + 3.0, sh + 3.6);
        if (ka > 0) INK.label(ctx, 'akımın geçtiği tel', (r.board.a[0] + r.board.b[0]) / 2, 900, { size: 36, weight: 700, color: '#8A4A10', align: 'center', alpha: ka });
      }
      // laboratuvar reostası kartı
      const kl = Math.min(E.se(t, s0 + 1.5, s0 + 2.1, 'out'), 1 - E.se(t, sh + 1.0, sh + 1.6));
      if (kl > 0) {
        ctx.save(); ctx.translate(1180, 330); ctx.scale(P.pop(kl), P.pop(kl));
        CK.card(ctx, -300, -150, 600, 290, { seed: 120 });
        F20.labRheo(ctx, 0, -10, 1.0, 0.4 + 0.2 * Math.sin(t));
        INK.label(ctx, 'laboratuvar reostası', 0, 110, { size: 38, weight: 700, align: 'center' });
        ctx.restore();
      }
      // gözlem okları
      if (t > so && t < sd) {
        const k = E.se(t, so + 1.0, so + 1.6);
        E.layer(ctx, k, c => {
          INK.label(c, 'tel uzuyor  →  direnç artıyor  →  ampul sönükleşiyor', 960, 330, { size: 42, weight: 700, align: 'center', color: '#8A4A10' });
        });
      }
      // veri tablosu
      if (t > sd) {
        const kt = E.se(t, sd, sd + 0.5);
        E.layer(ctx, kt, c => {
          CK.card(c, 760, 150, 900, 330, { seed: 130 });
          INK.label(c, 'Sürgü konumu', 800, 215, { size: 36, weight: 700 });
          INK.label(c, 'Parlaklık', 800, 380, { size: 36, weight: 700 });
          POS.forEach((q, i) => {
            const at = sd + 0.3 + i * 1.6 + 0.6; if (t < at) return;
            const x = 1100 + i * 140, bb = bOf(q);
            INK.label(c, String(i + 1), x, 215, { size: 38, weight: 700, align: 'center' });
            CK.bulb(c, x, 330, 0.4, bb, t, { rays: false });
            F20.meter(c, x - 55, 400, 110, bb);
          });
          INK.label(c, '(1: kısa tel  →  4: uzun tel)', 1210, 460, { size: 30, align: 'center', alpha: 0.7 });
        });
      }
      DAMLA.draw(ctx, { x: 150, y: 832, s: 1.0, view: 'q3', expr: t > so ? 'surprised' : 'curious', look: [0.9, -0.3], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 1.6]], prop: t > sd ? 'notebook' : null });
      ctx.restore();
    }
  });
})();

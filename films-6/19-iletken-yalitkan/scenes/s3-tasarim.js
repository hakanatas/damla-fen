// SAHNE 3 — Düzenek tasarımı (FB.6.6.1 a: test için elektrik devresi tasarlar) · SAHNE 4 — Görev paylaşımı (D16.3, D20.2, SDB2.2)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function bg(ctx) { ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H); }
  E.scene({
    name: 'Tasarım', concept: 'Test devresini tasarlama', from: 'design', to: 'rule', trFrom: [1500, 700],
    draw(ctx, t) {
      const sd = E.s('design'), ss = E.s('schema'), sr = E.s('rule');
      ctx.save(); bg(ctx);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Düzeneğim', 290, 215, E.seg(t, sd + 0.2, sd + 1.2), { size: 58 });
      // malzemeler
      const parts = [
        { at: sd + 1.0, y: 340, draw: c => CK.holder(c, 420, 330, 0.62), name: 'pil (pil yatağında)' },
        { at: sd + 2.2, y: 500, draw: c => { CK.socket(c, 420, 540, 0.7); CK.bulb(c, 420, 513, 0.7, 0); }, name: 'ampul (duyda)' },
        { at: sd + 3.4, y: 680, draw: c => { F19.clip(c, [380, 680], 1, 0.9); F19.clip(c, [460, 680], -1, 0.9, '#3A3842'); }, name: 'uçları açık iki kablo' }
      ];
      parts.forEach((p, i) => {
        const k = E.se(t, p.at, p.at + 0.6, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => p.draw(c));
        P.write(ctx, p.name, 600, p.y + 14, E.seg(t, p.at + 0.3, p.at + 1.4), { size: 38 });
      });
      // şema
      const kS = E.se(t, ss + 0.1, ss + 2.2);
      const conduct = t > sr + 3.2, lit = conduct ? 0.9 : 0;
      if (kS > 0) {
        const g = F19.schema(ctx, 1060, 330, 440, 330, { k: kS, s: 0.8, lit, gap: 90 });
        const kl = E.se(t, ss + 2.0, ss + 2.6);
        if (kl > 0) {
          ctx.save(); ctx.globalAlpha = kl;
          INK.dashed(ctx, circlePts(g.gap[0], g.gap[1], 62, 70, 40), { w: 2.6, color: CK.AMBD });
          ctx.restore();
          INK.label(ctx, 'boşluk', g.gap[0] + 80, g.gap[1] + 12, { size: 38, weight: 700, color: '#8A4A10', alpha: kl });
          INK.label(ctx, 'devre açık → ampul yanmaz', 1280, 745, { size: 36, align: 'center', alpha: E.se(t, ss + 3.0, ss + 3.6) * (conduct ? 0.35 : 1) });
        }
        // boşluğa madde yerleşir
        const km = E.se(t, sr + 2.2, sr + 3.1, 'out');
        if (km > 0) {
          const y = E.lerp(g.gap[1] + 150, g.gap[1], km);
          ctx.save(); ctx.globalAlpha = km; F19.sample(ctx, 'nail', g.gap[0], y, 0.62, Math.PI / 2); ctx.restore();
        }
      }
      // kural
      const rk = E.seg(t, sr + 0.3, sr + 2.3);
      P.write(ctx, 'Madde elektriği iletirse → devre tamamlanır → ampul yanar.', 290, 860, rk, { size: 42 });
      ctx.save(); ctx.font = '700 42px Kalam'; const rw = ctx.measureText('Madde elektriği iletirse → devre tamamlanır → ampul yanar.').width; ctx.restore();
      if (conduct) P.check(ctx, 290 + rw + 50, 836, 40, E.se(t, sr + 3.4, sr + 4.0), { w: 6, color: PAL.life });
      DAMLA.draw(ctx, {
        x: 1690, y: 905, s: 0.75, view: 'q3', flip: true, expr: conduct ? 'happy' : 'curious', look: [-0.8, -0.2], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 3,
        arms: [[-1, 1.9 + 0.1 * Math.sin(t * 2)], [1, 0.4]], prop: 'notebook'
      });
      ctx.restore();
    }
  });

  // ---------------- SAHNE 4: görev paylaşımı ----------------
  E.scene({
    name: 'Görevler', concept: 'Grupta görev paylaşımı', from: 'group', to: 'group', trFrom: [960, 540],
    draw(ctx, t) {
      const sg = E.s('group');
      ctx.save(); bg(ctx);
      P.write(ctx, 'Grubumuzda görevler', 960, 250, E.seg(t, sg + 0.2, sg + 1.2), { size: 60, align: 'center' });
      const roles = [
        { x: 520, name: 'test eder', icon: c => { F19.clip(c, [-20, 0], 1, 1.1); F19.clip(c, [60, 0], -1, 1.1, '#3A3842'); F19.sample(c, 'nail', 20, 0, 0.35); } },
        { x: 960, name: 'gözler', icon: c => P.icon.eye(c, 0, 0, 0.9) },
        { x: 1400, name: 'kaydeder', icon: c => { P.icon.pencil(c, 20, 0, 1.0, -0.5); } }
      ];
      roles.forEach((r, i) => {
        const at = sg + 0.8 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(r.x, 540); ctx.rotate((i - 1) * 0.02); ctx.scale(P.pop(k), P.pop(k));
        CK.card(ctx, -190, -170, 380, 340, { seed: 40 + i, fill: i === 2 ? '#F6E7B8' : '#FAF6EC' });
        ctx.save(); ctx.translate(0, -30); r.icon(ctx); ctx.restore();
        INK.label(ctx, r.name, 0, 120, { size: 46, weight: 700, align: 'center' });
        ctx.restore();
      });
      // ortak ok: yardımlaşma
      const ka = E.se(t, sg + 4.8, sg + 5.8);
      if (ka > 0) { P.arrow(ctx, [620, 760], [1300, 760], ka, { bend: -40, w: 3, color: CK.AMBD }); P.write(ctx, 'yardımlaşarak, sırayla', 960, 850, E.seg(t, sg + 5.2, sg + 6.4), { size: 40, align: 'center', color: '#8A4A10' }); }
      ctx.restore();
    }
  });
})();

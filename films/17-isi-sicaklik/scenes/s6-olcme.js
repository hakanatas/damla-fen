// SAHNE 6 — Isı doğrudan ölçülmez; kalorimetre kabı yardımıyla hesaplanır. Birimler: ısı J / cal · sıcaklık °C
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F17;
  const RED = '#A23A2A';
  E.scene({
    name: 'Ölçme ve birimler', concept: 'Isı hesaplanır (kalorimetre kabı); J, cal · °C', from: 'measure', to: 'units', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('measure'), su = E.s('units');
      ctx.fillStyle = 'rgba(138,106,69,0.1)'; ctx.fillRect(0, 0, E.W, E.H);
      const up = E.se(t, su - 0.3, su + 0.6);
      // sol: termometre ısıyı ölçemez
      ctx.save(); ctx.globalAlpha = 1 - 0.85 * up;
      F.thermo(ctx, 380, 700, 420, 0.5, { w: 22 });
      INK.label(ctx, 'ısı ?', 520, 420, { size: 62, weight: 700, color: F.HEAT, alpha: E.se(t, sm + 0.4, sm + 1.0) });
      P.cross(ctx, 470, 480, 110, E.se(t, sm + 1.2, sm + 2.0), { w: 12, color: RED });
      P.write(ctx, 'doğrudan ölçülmez', 400, 820, E.seg(t, sm + 1.8, sm + 2.8), { size: 44, align: 'center', color: RED });
      // sağ: kalorimetre kabı
      const kc = E.se(t, sm + 2.4, sm + 3.2, 'out');
      if (kc > 0) {
        ctx.save(); ctx.translate(1180, 760); ctx.scale(P.pop(kc), P.pop(kc)); ctx.translate(-1180, -760);
        F.calorimeter(ctx, 1180, 760, 1.25, t);
        ctx.restore();
        P.write(ctx, 'kalorimetre kabı', 1180, 830, E.seg(t, sm + 3.0, sm + 4.0), { size: 50, align: 'center' });
        P.write(ctx, 'yardımıyla hesaplanır', 1180, 885, E.seg(t, sm + 3.8, sm + 4.8), { size: 40, align: 'center', color: '#8A4A10' });
        ctx.save(); ctx.globalAlpha = E.se(t, sm + 4.0, sm + 4.8); INK.leader(ctx, [1500, 460], [1370, 560], { w: 2 }); INK.label(ctx, 'yalıtımlı kap', 1510, 450, { size: 36, weight: 700 }); INK.leader(ctx, [1500, 330], [1250, 330], { w: 2 }); INK.label(ctx, 'termometre', 1510, 320, { size: 36, weight: 700 }); INK.leader(ctx, [1000, 300], [1118, 320], { w: 2 }); INK.label(ctx, 'karıştırıcı', 990, 290, { size: 36, weight: 700, align: 'right' }); ctx.restore();
      }
      ctx.restore();
      // birimler
      if (up > 0) E.layer(ctx, up, c => {
        const cards = [[560, 'ISI', 'joule (J)', 'kalori (cal)', F.HEAT], [1360, 'SICAKLIK', 'derece Celsius', '(°C)', PAL.water]];
        cards.forEach(([x, a, b, d, col], i) => {
          const k = E.se(t, su + 0.2 + i * 0.8, su + 0.8 + i * 0.8, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 470); c.scale(P.pop(k), P.pop(k));
          F.card(c, 0, 0, 640, 440, { seed: 700 + i });
          INK.label(c, a, 0, -120, { size: 60, weight: 700, align: 'center', color: col });
          INK.label(c, 'birimi', 0, -50, { size: 36, align: 'center', alpha: 0.7 });
          INK.label(c, b, 0, 40, { size: 62, weight: 700, align: 'center' });
          INK.label(c, (i ? '' : 'ya da ') + d, 0, 120, { size: 62, weight: 700, align: 'center' });
          c.restore();
        });
      });
    }
  });
})();

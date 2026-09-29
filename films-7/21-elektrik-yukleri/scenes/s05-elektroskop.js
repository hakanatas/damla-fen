// SAHNE 5 — Elektroskop: cismin yüklü olup olmadığını gösterir; yapraklar aynı cins yükle yüklenip birbirini iter.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F721;
  E.scene({
    name: 'Elektroskop', concept: 'Yük tespiti', from: 'scope', to: 'scope', trFrom: [900, 500],
    draw(ctx, t) {
      F.bg(ctx);
      const ss = E.s('scope');
      const app = E.se(t, ss + 0.6, ss + 2.0), back = E.se(t, ss + 3.6, ss + 4.6);
      const open = E.se(t, ss + 2.2, ss + 3.2);
      const ex = 900, ey = 900, kx = ex, ky = ey - 420;
      const lq = open > 0.5 ? [[0.45, -1], [0.8, -1]] : [];
      F.electroscope(ctx, ex, ey, 1.0, open, { leafCharges: lq, knobCharges: open > 0.5 ? [[0, 0, -1]] : [] });
      // yüklü plastik çubuk dokunur
      const rx = E.lerp(E.lerp(420, kx - 150, app), 420, back), ry = ky - 30;
      F.rod(ctx, rx, ry, 260, 'plastik', { rot: 0.15 });
      [-80, -20, 40].forEach(dx => F.charge(ctx, rx + dx, ry - 38 + dx * 0.15, -1, 13));
      if (open > 0.6) {
        ctx.save(); ctx.globalAlpha *= E.se(t, ss + 3.0, ss + 3.6);
        P.arrow(ctx, [kx - 40, ey - 70], [kx - 110, ey - 60], 1, { w: 3, bend: 0, color: F.AMB, head: 12 });
        P.arrow(ctx, [kx + 40, ey - 70], [kx + 110, ey - 60], 1, { w: 3, bend: 0, color: F.AMB, head: 12 });
        F.fit(ctx, 'iter', kx, ey - 30, 120, 36, { color: F.AMB });
        ctx.restore();
      }
      const kc = E.se(t, ss + 1.0, ss + 1.7, 'out');
      E.layer(ctx, kc, c => {
        F.card(c, 1220, 230, 600, 470, 501);
        F.wfit(c, 'Elektroskop', 1260, 300, E.seg(t, ss + 1.3, ss + 2.1), 54, 520, { color: F.AMB });
        F.wfit(c, 'yapraklar kapalı → yüksüz', 1260, 390, E.seg(t, ss + 2.0, ss + 3.0), 40, 520);
        F.wfit(c, 'yapraklar açık → yüklü', 1260, 460, E.seg(t, ss + 3.0, ss + 4.0), 40, 520);
        F.wfit(c, 'Yapraklar aynı cins yükle', 1260, 560, E.seg(t, ss + 4.4, ss + 5.4), 38, 520, { weight: 400 });
        F.wfit(c, 'yüklenir ve birbirini iter.', 1260, 620, E.seg(t, ss + 5.2, ss + 6.2), 38, 520, { weight: 400 });
      });
      F.damla(ctx, t, { x: 260, y: 890, s: 1.1, view: 'q3', expr: open > 0.5 ? 'surprised' : 'curious', look: [0.9, -0.4] });
    }
  });
})();

// SAHNE 5 — Akımın ısı etkisi: ütünün direnç teli; aynı etkiyle çalışan aletler; aşırı yük güvenliği
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6;
  E.scene({
    name: 'Isı etkisi', concept: 'Akım geçen tel ısınır', from: 'iron', to: 'fire', trFrom: [520, 520],
    draw(ctx, t) {
      const si = E.s('iron'), s2 = E.s('iron2'), sf = E.s('fire');
      const X = 560, Y = 560, S = 2.5;
      const out = E.se(t, sf - 0.2, sf + 0.6);
      // ütü kesiti
      const heat = E.se(t, si + 2.4, si + 5);
      W.A.iron(ctx, X, Y, S, t, heat);
      // kesit penceresi + direnç teli
      const cut = W.rect(X - 170, Y + 20, X + 130, Y + 90);
      P.fillPts(ctx, cut, '#FBF8F1', 0.95); stroke(ctx, cut, { w: 2, closed: true, dry: false });
      const coil = []; for (let i = 0; i <= 60; i++) { const u = i / 60; coil.push([X - 155 + u * 270, Y + 55 + Math.sin(u * 40) * 22]); }
      const col = heat > 0 ? `rgb(${Math.round(E.lerp(70, 226, heat))},${Math.round(E.lerp(64, 96, heat))},${Math.round(E.lerp(60, 40, heat))})` : '#46403C';
      if (heat > 0) W.glow(ctx, X - 20, Y + 55, 200, heat * 0.8, '226,96,40');
      stroke(ctx, coil, { w: 4, color: col, dry: false, taper: 0 });
      const cord = [[X - 250, Y - 150], [X - 330, Y - 210], [X - 400, Y - 180]];
      const ck = E.se(t, si + 1.0, si + 1.6);
      if (ck > 0) { W.dots(ctx, coil, t * 1.5, ck, 12); }
      INK.leader(ctx, [X - 200, Y + 200], [X - 110, Y + 72], { bend: -0.2 });
      P.write(ctx, 'direnç teli', X - 330, Y + 240, E.seg(t, si + 1.4, si + 2.4), { size: 42 });
      E.inkText(ctx, 'akım geçer → tel ısınır', X, 300, t, si + 3.0, sf + 0.4, { size: 48, align: 'center', color: W.HEAT });
      // aynı etkiyle çalışan aletler
      const k2 = E.se(t, s2 + 0.2, s2 + 0.8) * (1 - out);
      if (k2 > 0) E.layer(ctx, k2, c => {
        [['kettle', 'su ısıtıcısı', 1180], ['toaster', 'tost makinesi', 1450], ['heater', 'elektrikli ısıtıcı', 1720]].forEach(([f, n, x], i) => {
          const k = E.se(t, s2 + 0.4 + i * 0.7, s2 + 1.0 + i * 0.7, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 520); c.scale(P.pop(k), P.pop(k)); c.translate(-x, -520); W.A[f](c, x, 520, 0.95, t, 1); c.restore();
          W.txt(c, n, x, 680, { size: W.fit(c, n, 250, 36), align: 'center', alpha: k });
        });
        W.badge(c, 'isi', 1450, 790, E.se(t, s2 + 2.6, s2 + 3.2, 'out'), { size: 40, name: 'hepsi: ısı', t });
      });
      // aşırı yük uyarısı
      const fk = E.se(t, sf + 0.3, sf + 1.0);
      if (fk > 0) E.layer(ctx, fk, c => {
        const x0 = 1150, y0 = 560;
        W.strip(c, x0, y0, 4, 1.1, 4);
        const hot = E.se(t, sf + 1.0, sf + 3);
        W.glow(c, x0 + 170, y0, 260, hot * 0.7, '226,96,40');
        for (let i = 0; i < 4; i++) W.squiggle(c, x0 + 40 + i * 77, y0 - 50, t, i + 20, hot, 50);
        P.cross(c, x0 + 170, y0 - 40, 150, E.se(t, sf + 2.6, sf + 3.2), { w: 14, color: W.RED });
        P.write(c, 'Aşırı ısınan kablo yangın çıkarabilir!', 1440, 800, E.seg(t, sf + 3.0, sf + 4.4), { size: 40, align: 'center', color: W.RED });
      });
      W.damla(ctx, t, { x: 1000, y: 900, s: 0.85, expr: t > sf + 2.5 ? 'determined' : 'curious', look: [t > s2 ? 0.8 : -0.8, -0.2], flip: t < s2, arms: [[-1, 0.35], [1, t > sf + 2.5 ? 2.5 : 0.5]], seed: 7 });
    }
  });
})();

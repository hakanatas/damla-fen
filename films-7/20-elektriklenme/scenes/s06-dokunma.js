// SAHNE 6 — 2. deney: dokunma ile elektriklenme (temaslı). Yüklü balon elektroskobun topuzuna dokunur; yapraklar açılır ve açık kalır.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  const BQ = [[0.55, -0.5], [0.75, 0.1], [0.45, 0.6], [0.0, -0.2], [-0.4, 0.3], [-0.3, -0.6]];
  E.scene({
    name: 'Dokunma ile', concept: 'Dokunma ile elektriklenme (temaslı)', from: 'touch', to: 'touch2', trFrom: [1100, 450],
    draw(ctx, t) {
      const st = E.s('touch'), s2 = E.s('touch2');
      const ex = 1180, ey = 880, R = 90;
      const kx = ex, ky = ey - 420;
      const app = E.se(t, st + 0.8, st + 2.6), back = E.se(t, s2 + 0.3, s2 + 2.0);
      const bx = E.lerp(E.lerp(620, kx - 26 - R * 0.98, app), 640, back), by = E.lerp(E.lerp(420, ky - 10, app), 420, back);
      const flow = E.seg(t, st + 2.8, st + 4.6);
      const open = E.se(t, st + 3.4, st + 4.8);
      F.damla(ctx, t, { x: 230, y: 880, s: 1.1, view: 'q3', expr: open > 0.5 ? 'surprised' : 'curious', look: [0.9, -0.4] });
      // aktarılan 3 elektron: balondan topuza → yapraklara
      const moved = [0, 1, 2];
      const leafQ = [], knobQ = [];
      moved.forEach((m, i) => {
        const k = E.clamp(flow * 1.5 - i * 0.25);
        if (k >= 1) { if (i < 2) leafQ.push([i === 0 ? 0.55 : 0.85, -1]); else knobQ.push([0, -2, -1]); }
      });
      F.electroscope(ctx, ex, ey, 1.0, open, { leafCharges: leafQ, knobCharges: knobQ });
      F.balloon(ctx, bx, by, R, PAL.water, { strLen: 70, seed: 2076 });
      BQ.forEach(([dx, dy], i) => {
        const m = moved.indexOf(i);
        if (m < 0) { F.charge(ctx, bx + dx * R, by + dy * R, -1, 14); return; }
        const k = E.ease.io(E.clamp(flow * 1.5 - m * 0.25));
        if (k >= 1) return;
        // yol: balon → topuz → tel boyunca aşağı
        const p0 = [bx + dx * R, by + dy * R];
        let p;
        if (k < 0.4) p = E.mix(p0, [kx, ky], k / 0.4);
        else p = E.mix([kx, ky], [kx + (m === 2 ? 0 : 0), ey - 150], (k - 0.4) / 0.6);
        if (m === 2) p = E.mix(p0, [kx, ky - 2], Math.min(1, k / 0.4));
        F.charge(ctx, p[0], p[1], -1, 14);
      });
      // notlar
      if (t > st + 0.5) { ctx.save(); ctx.globalAlpha = E.se(t, st + 0.5, st + 1.2); F.fit(ctx, 'çizimde yalnızca fazla yükler gösterildi', 1180, 190, 640, 30, { weight: 400, alpha: 0.7 }); ctx.restore(); }
      if (app > 0.95 && back < 0.1) { ctx.save(); ctx.globalAlpha = E.se(t, st + 2.6, st + 3.0); F.fit(ctx, 'dokundu!', kx - 150, ky - 120, 240, 44, { color: F.AMB }); ctx.restore(); }
      const kp = E.se(t, s2 + 0.4, s2 + 1.1, 'out');
      if (kp > 0) E.layer(ctx, kp, c => {
        F.card(c, 1420, 250, 420, 330, 601);
        F.wfit(c, 'Balon uzakta,', 1450, 320, E.seg(t, s2 + 0.8, s2 + 1.8), 42, 360);
        F.wfit(c, 'yapraklar hâlâ açık.', 1450, 380, E.seg(t, s2 + 1.6, s2 + 2.8), 42, 360);
        F.wfit(c, 'Yük elektroskoba geçti.', 1450, 450, E.seg(t, s2 + 2.8, s2 + 4.0), 38, 360, { color: F.AMB });
        F.stamp(c, 1630, 530, 'TEMASLI', E.seg(t, s2 + 4.2, s2 + 4.8), { color: PAL.ink, size: 46 });
      });
    }
  });
})();

// SAHNE 4 — İtme ve çekme: aynı cins yükler iter, zıt cins yükler çeker; yüklü cisim nötr cismi de çeker (çekme tek başına kanıt değildir).
(function () {
  const { PAL, line, stroke } = INK;
  const F = F721;
  E.scene({
    name: 'İtme ve çekme', concept: 'Aynı cins iter, zıt cins çeker', from: 'repel', to: 'caution', trFrom: [480, 500],
    draw(ctx, t) {
      F.bg(ctx);
      const sr = E.s('repel'), sa = E.s('attract'), sc = E.s('caution');
      // panel 1: iki negatif balon iter
      const k1 = E.se(t, sr + 0.1, sr + 0.7);
      E.layer(ctx, k1, c => {
        F.card(c, 110, 170, 560, 700, 401);
        const ang = 0.05 + 0.28 * E.se(t, sr + 1.0, sr + 2.6, 'out');
        const pos = F.hang(c, 400, 250, 110, 150, [ang, ang], [F.HEAT, F.HEAT], t, { r: 50 });
        pos.forEach(([x, y]) => { [[-20, -10], [18, 12], [-4, 30]].forEach(([dx, dy]) => F.charge(c, x + dx, y + dy, -1, 12)); });
        if (t > sr + 2.8) pos.forEach(([x, y], i) => { c.save(); c.globalAlpha *= E.se(t, sr + 2.8, sr + 3.3); P.arrow(c, [x + (i ? 50 : -50), y + 10], [x + (i ? 120 : -120), y + 10], 1, { w: 3, bend: 0, color: F.AMB, head: 12 }); c.restore(); });
        F.wfit(c, 'aynı cins yükler', 390, 720, E.seg(t, sr + 3.2, sr + 4.2), 44, 500, { align: 'center' });
        F.wfit(c, 'İTER', 390, 800, E.seg(t, sr + 4.0, sr + 4.6), 60, 300, { align: 'center', color: F.AMB });
      });
      // panel 2: pozitif saç — negatif balon çeker
      const k2 = E.se(t, sa + 0.1, sa + 0.7);
      if (k2 > 0) E.layer(ctx, k2, c => {
        F.card(c, 690, 170, 560, 700, 402);
        const ex = 900, ey = 690, s = 0.75, hy = ey - s * (40 + 90 + 58);
        const pull = E.se(t, sa + 1.0, sa + 2.6);
        const bx = 1110, by = hy - 90;
        F.kid(c, ex, ey, s, t, 0.2, { pull: pull, target: [(bx - ex) / s, (by - ey) / s + 60], hairPos: 1 });
        F.balloon(c, bx, by, 50, F.HEAT, { strLen: 70 });
        [[-20, -10], [18, 12], [-4, 30]].forEach(([dx, dy]) => F.charge(c, bx + dx, by + dy, -1, 12));
        if (t > sa + 1.8) { c.save(); c.globalAlpha *= E.se(t, sa + 1.8, sa + 2.3); P.arrow(c, [1060, by + 60], [990, by + 60], 1, { w: 3, bend: 0, color: F.AMB, head: 12 }); c.restore(); }
        F.wfit(c, 'zıt cins yükler', 970, 780, E.seg(t, sa + 3.0, sa + 4.0), 44, 500, { align: 'center' });
        F.wfit(c, 'ÇEKER', 970, 850, E.seg(t, sa + 3.8, sa + 4.4), 56, 300, { align: 'center', color: F.AMB });
      });
      // panel 3: yüklü balon nötr kâğıdı da çeker
      const k3 = E.se(t, sc + 0.1, sc + 0.7);
      if (k3 > 0) E.layer(ctx, k3, c => {
        F.card(c, 1270, 170, 560, 700, 403);
        const bx = 1550, by = 330;
        F.balloon(c, bx, by, 55, F.HEAT, { string: false });
        [[-20, -10], [18, 12], [-4, 30]].forEach(([dx, dy]) => F.charge(c, bx + dx, by + dy, -1, 12));
        stroke(c, [[1360, 540], [1740, 538]], { w: 3, seed: 431 });
        for (let i = 0; i < 6; i++) { const up = E.se(t, sc + 1.0 + i * 0.15, sc + 1.5 + i * 0.15); F.bit(c, E.lerp(1420 + i * 55, bx - 30 + (i % 3) * 25, up * (i % 2)), E.lerp(528, by + 70 + (i % 3) * 6, up * (i % 2)), 1, i); }
        F.fit(c, 'nötr kâğıt da çekilir', 1550, 600, 500, 38);
        const kk = E.se(t, sc + 4.0, sc + 4.8);
        c.save(); c.globalAlpha *= kk;
        F.fit(c, 'çekme → zıt yük ya da nötr', 1550, 700, 520, 36);
        F.fit(c, 'itme → kesin aynı cins', 1550, 770, 520, 40, { color: F.AMB });
        c.restore();
        P.check(c, 1802, 752, 40, E.se(t, sc + 6.0, sc + 6.5), { w: 7, color: F.GREEN });
      });
    }
  });
})();

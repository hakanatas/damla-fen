// SAHNE 5 — 1. deney: sürtünme ile elektriklenme (temaslı). Elektronlar kumaştan balona geçer; protonlar yer değiştirmez.
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  // nötr çiftler (yerel, birim çember içinde)
  const BAL = [[-0.5, -0.45], [0.35, -0.55], [-0.2, 0.2], [0.5, 0.25]];
  const WOOL = [[-0.6, -0.3], [-0.15, 0.35], [0.3, -0.3], [0.65, 0.3]];
  const MOVE = [0, 2, 3];                    // kumaştan balona geçen elektronlar (kumaştaki çift indisleri)
  const DEST = [[-0.05, -0.85], [-0.75, 0.0], [0.15, 0.7]];
  E.scene({
    name: 'Sürtünme ile', concept: 'Sürtünme ile elektriklenme (temaslı)', from: 'rub', to: 'rub2', trFrom: [700, 500],
    draw(ctx, t) {
      const sr = E.s('rub'), s2 = E.s('rub2');
      const rubK = E.seg(t, sr + 1.0, sr + 5.5);
      const rubbing = rubK > 0 && rubK < 1;
      const lift = E.se(t, s2 - 0.4, s2 + 0.8);
      const wx = 640, wy = 720, ww = 420, wh = 190;
      const R = 105;
      const bx = E.lerp(640 + (rubbing ? Math.sin(t * 9) * 110 : 0), 1000, lift), by = E.lerp(wy - wh / 2 - R * 1.1, 420, lift);
      F.damla(ctx, t, { x: 210, y: 880, s: 1.1, view: 'q3', expr: rubbing ? 'determined' : (t > s2 ? 'happy' : 'curious'), look: [0.9, -0.2] });
      // kumaş
      F.wool(ctx, wx, wy, ww, wh);
      // balon
      F.balloon(ctx, bx, by, R, F.HEAT, { strLen: 60 });
      // yükler: çift = + ve − yan yana
      const eMove = E.seg(t, sr + 3.0, sr + 6.0);
      const cr = 15;
      BAL.forEach(([dx, dy], i) => { F.charge(ctx, bx + dx * R - 14, by + dy * R, 1, cr); F.charge(ctx, bx + dx * R + 14, by + dy * R, -1, cr); });
      WOOL.forEach(([dx, dy], i) => {
        const px = wx + dx * ww / 2, py = wy + dy * wh / 2;
        F.charge(ctx, px - 14, py, 1, cr);
        const m = MOVE.indexOf(i);
        if (m < 0) { F.charge(ctx, px + 14, py, -1, cr); return; }
        const k = E.ease.io(E.clamp(eMove * 1.6 - m * 0.3));
        const tx = bx + DEST[m][0] * R, ty = by + DEST[m][1] * R;
        const ex = E.lerp(px + 14, tx, k), ey = E.lerp(py, ty, k) - Math.sin(k * Math.PI) * 60;
        F.charge(ctx, ex, ey, -1, cr);
        if (k > 0.99 && t > s2) { ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 5); stroke(ctx, INK.circlePts(ex, ey, cr + 7, cr + 7, 20), { w: 2.4, closed: true, dry: false, color: F.NEG }); ctx.restore(); }
      });
      // etiketler
      if (t > sr + 3.2) {
        ctx.save(); ctx.globalAlpha = E.se(t, sr + 3.2, sr + 4.0) * (1 - lift);
        F.fit(ctx, 'bazı elektronlar kumaştan balona geçiyor', 640, 330, 760, 38, { color: F.NEG });
        ctx.restore();
      }
      // sağ panel: kayıt
      const kp = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (kp > 0) E.layer(ctx, kp, c => {
        F.card(c, 1260, 200, 540, 420, 501);
        F.wfit(c, 'Gözlemim', 1300, 265, E.seg(t, s2 + 0.6, s2 + 1.4), 50, 440, { color: F.AMB });
        F.wfit(c, 'balon: elektron aldı', 1300, 345, E.seg(t, s2 + 1.2, s2 + 2.2), 40, 460);
        F.wfit(c, 'kumaş: elektron verdi', 1300, 410, E.seg(t, s2 + 2.0, s2 + 3.0), 40, 460);
        F.wfit(c, 'protonlar (+) yerinde kaldı', 1300, 475, E.seg(t, s2 + 2.8, s2 + 3.8), 36, 460, { weight: 400 });
        F.wfit(c, 'ikisi de yüklendi', 1300, 560, E.seg(t, s2 + 3.4, s2 + 4.4), 44, 460, { color: F.AMB });
        F.stamp(c, 1530, 730, 'TEMASLI', E.seg(t, s2 + 3.8, s2 + 4.4), { color: PAL.ink, size: 54 });
      });
    }
  });
})();

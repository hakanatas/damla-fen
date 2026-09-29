// SAHNE 3 — Yansıma/soğurulma deneyi: iki boru + engel, yüzey değişir (metal, tahta, kumaş, sünger); veri → çıkarım.
// FB.8.4.5 b) veri toplar ve kaydeder · sert/düz/pürüzlü yüzey farklı oranda yansıtır · gözenekli/yumuşak/girintili çıkıntılı soğurur. Yankı YOK.
(function () {
  const { PAL, stroke, line, circlePts } = INK; const F = S8;
  const SURF = [['metal', 'metal tepsi', 5, 'çok güçlü'], ['wood', 'tahta', 4, 'güçlü'], ['cloth', 'kumaş', 2, 'zayıf'], ['foam', 'sünger (girintili)', 1, 'çok zayıf']];
  function pulses(c, a, b, t, alpha, off = 0) {
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    for (let i = 0; i < 4; i++) { const u = ((t * 0.7 + i / 4 + off) % 1); const x = a[0] + (b[0] - a[0]) * u, y = a[1] + (b[1] - a[1]) * u; const ang = Math.atan2(b[1] - a[1], b[0] - a[0]); c.save(); c.globalAlpha *= alpha * Math.sin(u * Math.PI); stroke(c, P.arc(x - Math.cos(ang) * 20, y - Math.sin(ang) * 20, 22, ang - 0.9, ang + 0.9, 10), { w: 4, color: F.AMB, dry: false }); c.restore(); }
  }
  E.scene({
    name: 'Yüzey deneyi', concept: 'Yansıma ve soğurulma: yüzeyin etkisi', from: 'setup', to: 'differ', trFrom: [700, 540],
    draw(ctx, t) {
      const su = E.s('setup'), ss = E.s('surfaces'), sd = E.s('data'), si = E.s('infer'), sf = E.s('differ');
      const aA = 1 - E.se(t, sf - 0.3, sf + 0.5), aB = E.se(t, sf - 0.3, sf + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        c.fillStyle = 'rgba(138,106,69,0.08)'; c.fillRect(0, 0, E.W, E.H);
        const idx = t < ss + 0.5 ? 0 : Math.min(3, Math.floor((t - ss - 0.5) / 2.1));
        const [kind, name, lvl] = SURF[idx];
        const hit = [680, 300];
        c.save(); c.translate(680, 270); c.rotate(-Math.PI / 2); F.surface(c, -30, -230, 60, 460, kind); c.restore();
        F.fit(c, name, 680, 215, 500, 42, { color: F.AMB });
        F.tube(c, [360, 740], [640, 340], 30, 651); F.tube(c, [1000, 740], [720, 340], 30, 652);
        const bar = [[672, 430], [688, 430], [688, 800], [672, 800]]; F.shape(c, bar, F.WOOD, 0.5, 653);
        F.fit(c, 'engel', 680, 840, 200, 30, { weight: 400, alpha: 0.7 });
        F.clock(c, 320, 800, 0.7, t, 0.5);
        F.ear(c, 1060, 800, 0.9, { flip: true });
        const on = E.se(t, su + 2, su + 3);
        pulses(c, [360, 740], hit, t, on);
        if (t > ss + 0.5) pulses(c, hit, [1000, 740], t, on * lvl / 5, 0.5);
        if (t > ss + 0.5 && (kind === 'foam' || kind === 'cloth')) { c.save(); c.globalAlpha *= 0.7; for (let i = 0; i < 4; i++) { const pts = []; for (let j = 0; j <= 10; j++) pts.push([600 + i * 50 + j * 4, 265 + Math.sin(j + t * 4 + i) * 5]); stroke(c, pts, { w: 2, color: F.AMB, dry: false }); } c.restore(); }
        if (t > ss + 0.5) { F.meter(c, 1110, 660, lvl, 1); F.fit(c, 'duyulan ses', 1190, 700, 250, 28, { weight: 400, alpha: 0.7 }); }
        // veri tablosu
        const kH = E.se(t, ss + 0.2, ss + 1.0);
        F.table(c, 1320, 220, [['yüzey', 280], ['yansıyan ses', 260]], SURF.map(s => [s[1], s[3]]), 72, kH, SURF.map((s, i) => E.se(t, ss + 1.6 + i * 2.1, ss + 2.3 + i * 2.1)), { size: 34, cellCol: (i, j) => j === 1 ? (i < 2 ? F.AMB : PAL.water) : null });
        const kI = E.se(t, si + 0.3, si + 1.1);
        if (kI > 0) E.layer(c, kI, c2 => {
          F.card(c2, 1300, 620, 580, 250, 661, { tint: PAL.light, tintA: 0.15 });
          F.wfit(c2, 'sert, düz → çok yansıtır', 1330, 690, E.seg(t, si + 0.8, si + 2), 40, 520, { color: F.AMB });
          F.wfit(c2, 'yumuşak, gözenekli,', 1330, 760, E.seg(t, si + 3.5, si + 4.5), 40, 520, { color: PAL.water });
          F.wfit(c2, 'girintili çıkıntılı → soğurur', 1330, 820, E.seg(t, si + 4.3, si + 5.5), 40, 520, { color: PAL.water });
        });
        F.damla(c, t, { x: 180, y: 600, s: 0.75, expr: 'curious', look: [0.8, -0.3], arms: [[-1, 0.4], [1, 2.1]] });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        F.bathRoom(c, 140, 250, 760, 560, t, 1);
        F.livingRoom(c, 1020, 250, 760, 560, t, 1);
        F.fit(c, 'fayans: sert, düz → yansıtır', 520, 870, 760, 42, { color: F.AMB });
        F.fit(c, 'halı, perde, koltuk → soğurur', 1400, 870, 760, 42, { color: PAL.water });
        P.write(c, 'Maddelerin sesi soğurma özellikleri farklıdır.', 960, 210, E.seg(t, sf + 0.4, sf + 1.8), { size: 50, align: 'center' });
      });
    }
  });
})();

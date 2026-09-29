// SAHNE 6 — Model öner (FB.8.6.7 a) ve yeni kayıtlara göre yenile (b): pil + motor + pervane
(function () {
  const { PAL, stroke, line } = INK;
  const W = W6;
  E.scene({
    name: 'Model', concept: 'Elektrik → hareket (+ ısı, ses) modeli', from: 'model', to: 'useful', trFrom: [500, 600],
    draw(ctx, t) {
      const sm = E.s('model'), st = E.s('test'), sr = E.s('revise'), su = E.s('useful');
      // tezgâh
      const bench = W.rect(120, 760, 900, 790); W.shape(ctx, bench, '#8A6A45', 0.5, 5300);
      // devre
      const ck = E.se(t, sm + 0.3, sm + 1.2, 'out');
      if (ck > 0) { ctx.save(); ctx.globalAlpha *= ck; W.cell(ctx, 360, 700, 1.1); ctx.restore(); }
      const wA = [[440, 700], [520, 700], [520, 610], [620, 610]], wB = [[280, 700], [240, 700], [240, 560], [620, 560]];
      const wk = E.se(t, sm + 1.2, sm + 2.4);
      W.wire(ctx, wA, wk); W.wire(ctx, wB, wk);
      const run = E.se(t, st + 0.2, st + 1.2);
      const mk = E.se(t, sm + 0.9, sm + 1.6, 'out');
      if (mk > 0) { ctx.save(); ctx.globalAlpha *= mk; W.motor(ctx, 690, 585, 1.3, t, run); ctx.restore(); }
      if (run > 0) { W.dots(ctx, wA, t, run, 4); W.dots(ctx, wB.slice().reverse(), t, run, 5); }
      // gözlem: ısınma + vızıltı
      const hk = E.se(t, st + 2.2, st + 3.2);
      if (hk > 0) { for (let i = 0; i < 3; i++) W.squiggle(ctx, 650 + i * 30, 510, t, i + 30, hk, 46); W.waves(ctx, 640, 640, t, hk, W.SOUND, 3, 30, 2.4); }
      W.damla(ctx, t, { x: 170, y: 745, s: 0.8, expr: t > st + 2.2 && t < sr ? 'surprised' : 'happy', look: [0.8, -0.2], arms: [[-1, 0.35], [1, t < st ? 1.6 : 0.5]], seed: 8 });
      // kayıt notu
      const nk = E.se(t, st + 0.8, st + 1.4);
      if (nk > 0) E.layer(ctx, nk, c => {
        W.card(c, 150, 815, 800, 90, { seed: 5310 });
        W.txt(c, 'Kayıt:', 175, 873, { size: 34, color: W.AMBER });
        P.write(c, 'pervane dönüyor ✓', 285, 873, E.seg(t, st + 1.2, st + 2.0), { size: 34 });
        P.write(c, 'motor ısındı!  vızıltı!', 610, 873, E.seg(t, st + 2.6, st + 3.6), { size: 34, color: W.HEAT });
      });
      // model kartı
      const bk = E.se(t, sm + 2.2, sm + 2.9);
      if (bk > 0) E.layer(ctx, bk, c => {
        W.card(c, 1000, 180, 820, 700, { seed: 5320 });
        const v2 = t > sr + 0.3;
        W.txt(c, v2 ? 'Modelim · 2. sürüm' : 'Modelim · 1. sürüm', 1060, 250, { size: 46, color: v2 ? W.AMBER : PAL.ink });
        if (v2) P.drawOn(c, P.bez([1056, 266], [1260, 276], [1440, 262], 20), E.se(t, sr + 0.3, sr + 0.9), { w: 3, color: PAL.light });
        const ex = 1170, ey = 540;
        W.badge(c, 'elektrik', ex, ey, E.se(t, sm + 2.8, sm + 3.4, 'out'), { size: 40 });
        const hy = v2 ? E.lerp(ey, 360, E.se(t, sr + 0.4, sr + 1.2)) : ey;
        W.flow(c, [ex + 125, ey - 10], [1510, hy], E.se(t, sm + 3.4, sm + 4.2), { color: W.MOVE });
        W.badge(c, 'hareket', 1640, hy, E.se(t, sm + 4.0, sm + 4.6, 'out'), { size: 40, t });
        if (v2) {
          W.flow(c, [ex + 125, ey], [1530, ey], E.se(t, sr + 1.4, sr + 2.0), { color: W.HEAT });
          W.badge(c, 'isi', 1630, ey, E.se(t, sr + 1.9, sr + 2.4, 'out'), { size: 40, t });
          W.flow(c, [ex + 125, ey + 10], [1530, 715], E.se(t, sr + 2.6, sr + 3.2), { color: W.SOUND });
          W.badge(c, 'ses', 1630, 720, E.se(t, sr + 3.1, sr + 3.6, 'out'), { size: 40, t });
        }
        const uk = E.se(t, su + 0.3, su + 1.0);
        if (uk > 0) {
          P.write(c, 'istenen', 1640, hy + 65, uk, { size: 32, align: 'center', color: W.MOVE });
          P.write(c, 'istenmeyen', 1630, ey + 65, E.se(t, su + 1.4, su + 2.1), { size: 32, align: 'center', alpha: 0.7 });
          P.write(c, 'istenmeyen', 1630, 785, E.se(t, su + 1.8, su + 2.5), { size: 32, align: 'center', alpha: 0.7 });        }
      });
    }
  });
})();

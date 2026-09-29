// SAHNE 7 — Tanecik açıklaması (hâl değişmeden: tanecikler hızlanır, aralarındaki mesafe az da olsa artar; tanecikler BÜYÜMEZ) + sonuç (c)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G15;
  E.scene({
    name: 'Tanecik modeli', concept: 'Genleşmede tanecikler arası mesafe artar; tanecikler büyümez', from: 'particles', to: 'conclude', trFrom: [960, 480],
    draw(ctx, t) {
      const sp = E.s('particles'), sn = E.s('notbigger'), sc = E.s('conclude');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      const A = 1 - E.se(t, sc - 0.2, sc + 0.5);
      if (A > 0) E.layer(ctx, A, c => {
        P.write(c, 'Metal kürenin içine yakından bakalım', 290, 205, E.seg(t, sp + 0.2, sp + 1.6), { size: 46 });
        const R = 20, heatK = E.se(t, sp + 2.2, sp + 5.0);
        // soğuk
        const k1 = E.se(t, sp + 0.6, sp + 1.4, 'out');
        if (k1 > 0) {
          c.save(); c.globalAlpha *= k1;
          stroke(c, F.rectPts(330, 300, 690, 660, 10), { w: 2.6, closed: true, color: PAL.water, seed: 2701 });
          F.lattice(c, 510, 480, 4, 4, R, 72, 1.6, 0.7, t);
          INK.label(c, 'soğuk küre', 510, 710, { size: 40, weight: 700, align: 'center', color: PAL.water });
          c.restore();
        }
        // sıcak
        if (heatK > 0) {
          const d = 72 + 14 * heatK, half = 180 + 21 * heatK;
          c.save(); c.globalAlpha *= E.clamp(heatK * 3);
          P.arrow(c, [720, 480], [840, 480], E.clamp(heatK * 2), { w: 4, color: F.HEAT, head: 16 });
          INK.label(c, 'ısı', 780, 450, { size: 36, weight: 700, color: F.HEAT, align: 'center' });
          c.save(); c.globalAlpha *= 0.6; dashed(c, F.rectPts(1100 - 180, 480 - 180, 1100 + 180, 480 + 180, 30), { w: 2.2, on: 10, off: 8, color: PAL.water }); c.restore();
          stroke(c, F.rectPts(1100 - half, 480 - half, 1100 + half, 480 + half, 10), { w: 2.6, closed: true, color: F.HEAT, seed: 2702 });
          const pts = F.lattice(c, 1100, 480, 4, 4, R, d, 1.6 + 3.4 * heatK, 0.7 + 1.3 * heatK, t);
          pts.forEach((p, i) => { if (i % 3 === 0) F.jiggle(c, p[0], p[1], R, heatK, t, i); });
          INK.label(c, 'ısıtılan küre', 1100, 710 + 21 * heatK, { size: 40, weight: 700, align: 'center', color: F.HEAT });
          c.restore();
          // mesafe ölçüsü
          const mk = E.se(t, sp + 5.2, sp + 6.2);
          if (mk > 0) {
            const x0 = 1100 - 1.5 * d + R + 4, x1 = x0 + d - 2 * R - 8, yy = 480 - 1.5 * d;
            c.save(); c.globalAlpha *= mk;
            line(c, [x0, yy], [x1, yy], { w: 2.6, color: F.AMBER, dry: false }); line(c, [x0, yy - 10], [x0, yy + 10], { w: 2.4, dry: false, color: F.AMBER }); line(c, [x1, yy - 10], [x1, yy + 10], { w: 2.4, dry: false, color: F.AMBER });
            INK.label(c, 'mesafe arttı', 1100, 480 - 201 - 16, { align: 'center', size: 36, weight: 700, color: F.AMBER });
            c.restore();
          }
        }
        // büyümez!
        const nk = E.se(t, sn + 0.2, sn + 1.0);
        if (nk > 0) {
          c.save(); c.globalAlpha *= nk;
          F.card(c, 1370, 250, 370, 520, { fill: '#FBF6E8', seed: 2710 });
          // yanlış: şişman tanecik
          F.particle(c, 1435, 395, 40); P.cross(c, 1435, 395, 42, E.se(t, sn + 1.0, sn + 1.8), { w: 7, color: F.RED });
          INK.label(c, 'tanecik büyür', 1630, 380, { size: 30, weight: 700, color: F.RED, align: 'center' }); INK.label(c, 'YANLIŞ', 1630, 420, { size: 30, weight: 700, color: F.RED, align: 'center' });
          // doğru: aynı boy
          const dk = E.se(t, sn + 2.2, sn + 3.0);
          if (dk > 0) {
            c.save(); c.globalAlpha *= dk;
            F.particle(c, 1430, 560, R); F.particle(c, 1490, 560, R); INK.label(c, '=', 1460, 540, { size: 30, weight: 700, align: 'center' });
            F.particle(c, 1430, 640, R); F.particle(c, 1530, 640, R);
            P.arrow(c, [1452, 610], [1508, 610], 1, { w: 2.4, color: F.AMBER, head: 9 });
            P.check(c, 1660, 580, 44, E.se(t, sn + 3.0, sn + 3.6), { w: 6 });
            INK.label(c, 'boyut aynı,', 1555, 720, { size: 32, weight: 700, align: 'center' });
            INK.label(c, 'mesafe değişir', 1555, 756, { size: 32, weight: 700, align: 'center', color: F.AMBER });
            c.restore();
          }
          c.restore();
        }
      });
      // SONUÇ
      const ck = E.se(t, sc + 0.2, sc + 0.9);
      if (ck > 0) E.layer(ctx, ck, c => {
        P.write(c, 'Sonucum', 290, 215, E.seg(t, sc + 0.3, sc + 1.1), { size: 56, color: F.AMBER });
        P.write(c, 'Isı alan maddeler genleşebilir.', 290, 320, E.seg(t, sc + 0.9, sc + 2.4), { size: 50, color: F.HEAT });
        P.write(c, 'Isı veren maddeler büzülebilir.', 290, 400, E.seg(t, sc + 2.3, sc + 3.8), { size: 50, color: PAL.water });
        const items = [['gaz', 'balonlu şişe'], ['sıvı', 'pipetli şişe'], ['katı', 'Gravzant halkası']];
        items.forEach(([a, b], i) => {
          const at = sc + 4.0 + i * 0.8, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const x = 380 + i * 400, y = 560;
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k));
          F.card(c, -160, -60, 330, 200, { fill: i === 0 ? '#F8EDE6' : i === 1 ? '#EAF1F4' : '#F1EFEA', seed: 2720 + i });
          INK.label(c, a, 5, 10, { size: 50, weight: 700, align: 'center' });
          INK.label(c, b, 5, 70, { size: 32, align: 'center', alpha: 0.8 });
          c.restore();
          P.check(c, x + 130, y - 30, 44, E.se(t, at + 0.5, at + 1.0), { w: 6 });
        });
        P.write(c, 'Gözlemlerim önermemi destekledi.', 290, 830, E.seg(t, sc + 6.6, sc + 8.0), { size: 46 });
      });
      DAMLA.draw(ctx, {
        x: 1760, y: 1060, s: 0.95, view: 'q3', flip: true, t, seed: 7, blink: E.blink(t, 19), squash: E.breath(t), talk: E.talk(t),
        expr: t > sc ? 'happy' : (t > sn ? 'determined' : 'thinking'), look: [-0.8, -0.5], arms: [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]]
      });
    }
  });
})();

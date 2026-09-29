// SAHNE 6 — Ölç ve kaydet: dinamometreyle farklı kuvvetleri ölçme, tabloya kaydetme ve karşılaştırma (TYMM: D3.3, OB7, KB2.6)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', X = 520, Y = 70, FY = 912;
  const OBJ = [['apple', 1, 'elma', 1.0], ['book', 4, 'kitap', 4.6], ['bottle', 5, 'su şişesi', 8.2]];
  E.scene({
    name: 'Ölç ve kaydet', concept: 'Dinamometreyle ölçme ve tabloya kaydetme', from: 'measure', to: 'table', trFrom: [520, 400],
    draw(ctx, t) {
      const sm = E.s('measure'), st = E.s('table');
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      F05.floor(ctx, FY, 4);
      line(ctx, [430, Y + 4], [760, Y + 2], { w: 7, taper: 0.02, seed: 2401 });
      stroke(ctx, [[760, Y + 2], [764, FY]], { w: 7, seed: 2402, taper: 0.02 });
      // which object is hanging
      let F = 0, cur = null, ca = 0;
      OBJ.forEach(([id, v, name, at], i) => {
        const inA = E.se(t, sm + at, sm + at + 0.5), outA = i < 2 ? E.se(t, sm + at + 3.2, sm + at + 3.6) : 0;
        const a = Math.min(inA, 1 - outA); if (a <= 0) return;
        cur = [id, v, name, at]; ca = a;
        F = v * E.se(t, sm + at + 0.4, sm + at + 1.4, 'back') * (1 - outA);
      });
      const r = F05.dyn(ctx, X, Y, { L: 380, W: 90, max: 10, F });
      if (cur) {
        const [id, v, name, at] = cur;
        E.layer(ctx, ca, c => { F05[id](c, X, r.hook[1] - 4, id === 'bottle' ? 0.9 : 1); });
        const rk = E.se(t, sm + at + 1.5, sm + at + 1.9) * (1 - E.se(t, sm + at + 3.0, sm + at + 3.3) * (id === 'bottle' ? 0 : 1));
        if (rk > 0) { INK.label(ctx, v + ' N', X + 150, r.py + 20, { size: 60, weight: 700, alpha: rk, color: BR }); P.arrow(ctx, [X + 142, r.py], [X + 100, r.py], rk, { w: 2.4, head: 10, color: BR }); }
      }
      // table card
      const ck = E.se(t, sm + 0.2, sm + 1.0, 'out');
      if (ck > 0) {
        ctx.save(); ctx.globalAlpha = ck;
        F05.card(ctx, 980, 170, 1840, 840, { seed: 2410 });
        P.write(ctx, 'Ölçüm tablom', 1410, 250, E.seg(t, sm + 0.6, sm + 1.6), { size: 56, align: 'center' });
        const rows = [['Asılan cisim', 'Kuvvet'], ['elma', '1 N'], ['kitap', '4 N'], ['su şişesi', '5 N']];
        const at = [sm + 0.9, sm + 2.9, sm + 6.5, sm + 10.1];
        F05.table(ctx, 1030, 290, [400, 360], rows, 84, i => E.seg(t, at[i], at[i] + 0.9), { size: 44 });
        // compare: bars ∝ value
        [1, 4, 5].forEach((v, i) => {
          const k = E.se(t, st + 1.0 + i * 0.4, st + 1.6 + i * 0.4); if (k <= 0) return;
          const y = 290 + (i + 1) * 84 + 30;
          P.fillPts(ctx, F05.rect(1560, y, 1560 + 48 * v * k, y + 28), BR, 0.55);
        });
        const k1 = E.se(t, st + 3.4, st + 4.0), k2 = E.se(t, st + 4.6, st + 5.2);
        if (k1 > 0) { stroke(ctx, INK.wobble(circlePts(1310, 290 + 3 * 84 + 44, 320, 46, 50), 2, 2420), { w: 3, closed: true, color: PAL.light, alpha: k1 }); P.write(ctx, 'en büyük: su şişesi', 1050, 710, E.seg(t, st + 3.6, st + 4.6), { size: 44 }); }
        if (k2 > 0) { stroke(ctx, INK.wobble(circlePts(1310, 290 + 84 + 44, 320, 46, 50), 2, 2421), { w: 3, closed: true, color: PAL.water, alpha: k2 }); P.write(ctx, 'en küçük: elma', 1050, 780, E.seg(t, st + 4.8, st + 5.8), { size: 44 }); }
        ctx.restore();
      }
      // Damla recording
      const toTable = t > st;
      DAMLA.draw(ctx, { x: 880, y: FY, s: 1.0, view: 'q3', flip: !toTable, expr: toTable ? 'happy' : 'curious', look: toTable ? [0.7, -0.6] : [0.8, -0.6], blink: E.blink(t, 10), squash: E.breath(t), t, seed: 2,
        arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

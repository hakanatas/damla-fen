// SAHNE 3 — Terazi ile kütle, dinamometre ile ağırlık ölçme; tabloya kaydetme; 1 kg ≈ 9,8 N (TYMM D3.3, OB7; matematikle ilişki)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', FY = 880;
  const kilo = (ctx, x, y) => { stroke(ctx, circlePts(x, y - 4, 7, 6, 16), { w: 2, closed: true, dry: false }); line(ctx, [x, y + 2], [x, y + 20], { w: 2, dry: false }); F07.mass(ctx, x, y + 90, '1 kg', 1.4); };
  E.scene({
    name: 'Ölçüm', concept: 'Kütle teraziyle, ağırlık dinamometreyle', from: 'balance', to: 'relation', trFrom: [520, 600],
    draw(ctx, t) {
      const sb = E.s('balance'), sd = E.s('dynam'), st = E.s('table'), sr = E.s('relation');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, FY); ctx.restore();
      F07.floor(ctx, FY, 3);
      const aT = E.se(t, st - 0.3, st + 0.6), aR = E.se(t, sr - 0.3, sr + 0.6);
      if (aT < 1) E.layer(ctx, 1 - aT, c => {
        // balance
        const m1 = E.se(t, sb + 2.6, sb + 3.0), m2 = E.se(t, sb + 4.4, sb + 4.8);
        const ap = E.se(t, sb + 0.6, sb + 1.0);
        const tilt = -0.26 * E.se(t, sb + 0.8, sb + 1.8, 'out') + 0.13 * E.se(t, sb + 2.8, sb + 3.6, 'out') + 0.13 * E.se(t, sb + 4.6, sb + 5.6, 'back');
        F07.balance(c, 520, FY, { s: 1, tilt,
          left: (cc, x, y) => { if (ap > 0) { cc.save(); cc.globalAlpha = ap; F07.apple(cc, x, y - 118, 0.85); cc.restore(); } },
          right: (cc, x, y) => { if (m1 > 0) F07.mass(cc, x - 32, y, '50 g', 0.9); if (m2 > 0) F07.mass(cc, x + 32, y, '50 g', 0.9); } });
        if (t > sb + 5.6) { const k = E.se(t, sb + 5.6, sb + 6.2); INK.label(c, 'denge!', 520, 490, { size: 50, weight: 700, align: 'center', alpha: k, color: PAL.life }); P.write(c, 'elmanın kütlesi = 100 g', 520, 200, E.seg(t, sb + 6.0, sb + 7.2), { size: 50, align: 'center', color: PAL.water }); }
        P.write(c, 'eşit kollu terazi', 520, 400, 1, { size: 38, align: 'center', alpha: 0.8 });
        // dynamometer
        const dk = E.se(t, sd - 0.2, sd + 0.6);
        if (dk > 0) E.layer(c, dk, cc => {
          line(cc, [1260, 150], [1520, 150], { w: 6, taper: 0 }); stroke(cc, [[1520, 150], [1524, FY]], { w: 6, taper: 0.02 });
          const F = 0.98 * E.se(t, sd + 1.0, sd + 2.2, 'back');
          const r = F07.dyn(cc, 1360, 146, { L: 380, W: 86, max: 10, F });
          if (t > sd + 0.6) F07.apple(cc, 1360, r.hook[1] - 4, 0.85);
          if (t > sd + 2.4) { const k = E.se(t, sd + 2.4, sd + 2.9); INK.label(cc, '≈ 1 N', 1500, r.py + 18, { size: 56, weight: 700, color: BR, alpha: k }); }
          P.write(cc, 'elmanın ağırlığı ≈ 1 N', 1250, 110, E.seg(t, sd + 3.0, sd + 4.2), { size: 50, align: 'center', color: BR });
        });
        DAMLA.draw(c, { x: 960, y: FY, s: 1.0, view: 'q3', flip: t < sd, expr: 'curious', look: t < sd ? [0.8, -0.3] : [0.8, -0.5], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
      });
      if (aT > 0 && aR < 1) E.layer(ctx, Math.min(aT, 1 - aR), c => {
        F07.card(c, 260, 170, 1660, 760, { seed: 4301 });
        P.write(c, 'Ölçüm tablom', 960, 250, E.seg(t, st + 0.3, st + 1.2), { size: 56, align: 'center' });
        const rows = [['Cisim', 'Kütle (terazi)', 'Ağırlık (dinamometre)'], ['elma', '100 g', '≈ 1 N'], ['kitap', '400 g', '≈ 4 N']];
        F07.table(c, 330, 290, [300, 420, 560], rows, 90, i => E.seg(t, st + 0.6 + i * 1.2, st + 1.6 + i * 1.2), { size: 44, colColor: [null, PAL.water, BR] });
        const k = E.se(t, st + 5.0, st + 5.8);
        if (k > 0) { c.save(); c.globalAlpha = k; P.arrow(c, [860, 690], [860, 580], 1, { w: 4, head: 16, color: PAL.water }); P.arrow(c, [1380, 690], [1380, 580], 1, { w: 4, head: 16, color: BR }); c.restore(); }
        E.inkText(c, 'kütle artınca ağırlık da artar', 960, 720, t, st + 5.4, 1e9, { size: 46, align: 'center' });
      });
      if (aR > 0) E.layer(ctx, aR, c => {
        line(c, [560, 150], [800, 150], { w: 6, taper: 0 }); stroke(c, [[800, 150], [804, FY]], { w: 6, taper: 0.02 });
        const F = 9.8 * E.se(t, sr + 0.6, sr + 1.8, 'back');
        const r = F07.dyn(c, 660, 146, { L: 400, W: 90, max: 20, step: 1, lab: 5, F });
        kilo(c, 660, r.hook[1]);
        if (t > sr + 1.8) INK.label(c, '≈ 9,8 N', 800 + 20, r.py + 18, { size: 54, weight: 700, color: BR, alpha: E.se(t, sr + 1.8, sr + 2.3) });
        F07.card(c, 1050, 230, 1760, 700, { seed: 4310 });
        P.write(c, 'Dünya’da:', 1110, 320, E.seg(t, sr + 2.0, sr + 2.8), { size: 48 });
        P.write(c, '1 kg  →  ≈ 9,8 N', 1110, 420, E.seg(t, sr + 2.6, sr + 3.8), { size: 56 });
        P.write(c, '2 kg  →  ≈ 19,6 N', 1110, 510, E.seg(t, sr + 4.0, sr + 5.2), { size: 56 });
        P.write(c, '(kabaca: 1 kg ≈ 10 N)', 1110, 610, E.seg(t, sr + 5.4, sr + 6.4), { size: 38, weight: 400 });
      });
    }
  });
})();

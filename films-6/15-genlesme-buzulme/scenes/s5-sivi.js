// SAHNE 5 — Sıvılar: pipetli renkli su şişesi sıcak suda (sıvı genleşir); termometre sıvının genleşip büzülmesiyle çalışır
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = G15;
  E.scene({
    name: 'Sıvılar ve termometre', concept: 'Sıvılar genleşir ve büzülür; termometre', from: 'liquid', to: 'thermo', trFrom: [480, 540],
    draw(ctx, t) {
      const sl = E.s('liquid'), st = E.s('thermo');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 110, 900, 800, 2501);
      const dip = E.se(t, sl + 1.6, sl + 3.0);
      const rise = E.se(t, sl + 3.2, sl + 6.8);
      F.basin(ctx, 480, 800, 400, 190, 'hot', t, { front: false });
      const r = F.flaskStraw(ctx, 480, E.lerp(610, 790, dip), 1.0, 20 + 150 * rise, t);
      if (dip > 0.2) { const wy = 800 - 190 + 34; ctx.save(); ctx.globalAlpha = 0.16 * dip; ctx.fillStyle = PAL.water; ctx.fillRect(300, wy + 4, 360, 800 - wy - 10); ctx.restore(); }
      F.basinFront(ctx, 480, 800, 400, 190, 'hot', t);
      INK.label(ctx, 'renkli su', 640, 560, { size: 32, weight: 700, color: PAL.water, alpha: 1 - dip * 0.999 });
      // başlangıç seviyesi işareti
      if (dip >= 1) {
        const y0 = 790 - 246;
        ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, F.linePts([440, y0], [520, y0], 20), { w: 2.4, on: 8, off: 6 }); ctx.restore();
        INK.label(ctx, 'başlangıç', 540, y0 + 10, { size: 30, alpha: 0.8, rot: 0 });
        if (rise > 0.3) { P.arrow(ctx, [560, y0 - 20], [560, r.colY + 10], E.seg(rise, 0.3, 1), { w: 3.4, color: F.HEAT, head: 14 }); P.write(ctx, 'yükseldi!', 590, r.colY + 40, E.seg(rise, 0.6, 1), { size: 46, color: F.HEAT }); }
      }
      // termometre (thermo beat)
      const tk = E.se(t, st + 0.2, st + 1.0);
      if (tk > 0) E.layer(ctx, tk, c => {
        const T = 20 + 25 * E.se(t, st + 1.2, st + 3.4) - 35 * E.se(t, st + 4.4, st + 6.6);
        const th = F.thermo(c, 1100, 240, 740, T, { min: -10, max: 50 });
        F.card(c, 1230, 250, 420, 210, { fill: '#FBF6E8', seed: 2510 });
        INK.label(c, 'ısınınca', 1440, 320, { size: 40, weight: 700, align: 'center', color: F.HEAT });
        INK.label(c, 'sıvı genleşir, yükselir', 1440, 390, { size: 36, align: 'center' });
        const k2 = E.se(t, st + 4.2, st + 5.0);
        if (k2 > 0) E.layer(c, k2, d => { F.card(d, 1230, 520, 420, 210, { fill: '#EEF3F5', seed: 2511 }); INK.label(d, 'soğuyunca', 1440, 590, { size: 40, weight: 700, align: 'center', color: PAL.water }); INK.label(d, 'sıvı büzülür, alçalır', 1440, 660, { size: 36, align: 'center' }); });
        const up = E.se(t, st + 1.2, st + 3.4) * (1 - k2);
        if (up > 0.05) P.arrow(c, [1160, 600], [1160, 460], up, { w: 4, color: F.HEAT, head: 14 });
        if (k2 > 0.05) P.arrow(c, [1160, 460], [1160, 600], k2, { w: 4, color: PAL.water, head: 14 });
        INK.label(c, Math.round(T) + ' °C', 1100, 850, { size: 44, weight: 700, color: F.HEAT, align: 'center', rot: 0 });
      });
      DAMLA.draw(ctx, {
        x: 1760, y: 920, s: 1.0, view: 'q3', flip: true, t, seed: 5, blink: E.blink(t, 15), squash: E.breath(t), talk: E.talk(t),
        expr: rise > 0.8 && t < st ? 'surprised' : 'curious', look: [-0.8, -0.4], arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]]
      });
    }
  });
})();

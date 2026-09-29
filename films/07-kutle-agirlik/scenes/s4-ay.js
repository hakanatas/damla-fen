// SAHNE 4 — Ay'da kütle ve ağırlık (TYMM sınırlama: yalnızca Dünya ve Ay; "kütle çekim" terimi kullanılmaz)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const BR = '#8A4A10', GY = 820;
  function sky(ctx) {
    ctx.save(); ctx.fillStyle = '#2A2830'; ctx.globalAlpha = 0.85; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
    const R = INK.rng(41); ctx.save(); ctx.fillStyle = PAL.white; for (let i = 0; i < 90; i++) { ctx.globalAlpha = 0.3 + R() * 0.6; ctx.beginPath(); ctx.arc(R() * E.W, R() * 600, 1 + R() * 1.8, 0, 7); ctx.fill(); } ctx.restore();
  }
  const whiteText = (ctx, s, x, y, o = {}) => F07.txt(ctx, s, x, y, { color: PAL.white, ...o });
  function dynCard(ctx, x, y, title, F, reading, k, dark) {
    ctx.save(); ctx.globalAlpha *= k;
    F07.card(ctx, x - 190, y, x + 190, y + 700, { seed: 4400 + (dark ? 1 : 0), fill: dark ? '#E4E0D8' : '#FAF6EC' });
    F07.txt(ctx, title, x, y + 60, { size: 42, align: 'center' });
    line(ctx, [x - 70, y + 90], [x + 70, y + 90], { w: 5, taper: 0 });
    const r = F07.dyn(ctx, x - 40, y + 86, { L: 230, W: 64, max: 100, step: 10, lab: 50, F, num: 26 });
    F07.sandbag(ctx, x - 40, r.hook[1] - 4, 0.5, true);
    F07.txt(ctx, reading, x, y + 670, { size: 50, align: 'center', color: BR });
    ctx.restore();
  }
  E.scene({
    name: 'Ay’da', concept: 'Ay’da kütle aynı, ağırlık az', from: 'tomoon', to: 'why', trFrom: [1580, 230],
    draw(ctx, t) {
      const s0 = E.s('tomoon'), sm = E.s('moonmass'), sb = E.s('balwhy'), sw = E.s('moonweight'), sy = E.s('why');
      sky(ctx);
      P.earth(ctx, 1810, 150, 62, { rot: t * 0.05 });
      F07.moonGround(ctx, GY);
      // travel: Damla flies in from the Earth
      const fly = E.se(t, s0 + 0.4, s0 + 3.4, 'out');
      const dx = E.lerp(1780, 330, fly), dy = E.lerp(180, GY, fly) - (fly < 1 ? Math.sin(fly * Math.PI) * 120 : 0);
      if (fly < 1) { ctx.save(); ctx.globalAlpha = 0.6; dashed(ctx, P.partial(P.bez([1780, 180], [1000, 80], [330, GY], 50), fly), { w: 2.4, on: 10, off: 10, color: PAL.white }); ctx.restore(); }
      // jump in "why"
      const jp = t > sy + 3 ? Math.max(0, Math.sin((t - sy - 3) * 2.2)) * 110 : 0;
      const phaseA = 1 - E.se(t, sw - 0.3, sw + 0.5);   // balance visible
      // balance with sandbag vs 6×1 kg
      if (phaseA > 0) E.layer(ctx, phaseA * E.se(t, s0 + 2.4, s0 + 3.4), c => {
        const bal = E.se(t, sm + 0.3, sm + 1.6, 'back');
        const tilt = -0.25 + 0.25 * bal;
        F07.balance(c, 960, GY, { s: 1, tilt,
          left: (cc, x, y) => F07.sandbag(cc, x, y, 0.62),
          right: (cc, x, y) => { const n = Math.round(6 * E.seg(t, sm + 0.1, sm + 1.2)); for (let i = 0; i < n; i++) F07.mass(cc, x - 50 + (i % 3) * 50, y - Math.floor(i / 3) * 62, '1 kg', 0.75); } });
        if (t > sm + 1.6) { whiteText(c, 'denge: kütle = 6 kg', 960, 330, { size: 52, align: 'center', alpha: E.se(t, sm + 1.6, sm + 2.2) }); }
        // why: both pans lighten equally
        const wk = E.se(t, sb + 1.0, sb + 1.8);
        if (wk > 0) {
          c.save(); c.globalAlpha = wk;
          [750, 1170].forEach(x => { P.arrow(c, [x, 640], [x, 700], 1, { w: 4, head: 14, color: '#E3A03A' }); });
          whiteText(c, 'iki kefe de aynı ölçüde hafifler', 960, 420, { size: 42, align: 'center' });
          c.restore();
        }
      });
      // dynamometers: Earth vs Moon
      if (phaseA < 1) E.layer(ctx, 1 - phaseA, c => {
        const Fe = 59 * E.se(t, sw + 0.4, sw + 1.4, 'back'), Fm = 9.7 * E.se(t, sw + 2.6, sw + 3.6, 'back');
        dynCard(c, 1060, 140, 'Dünya’da', Fe, '≈ 59 N', 1, false);
        dynCard(c, 1500, 140, 'Ay’da', Fm, t > sw + 3.6 ? '≈ 10 N' : '', E.se(t, sw + 2.0, sw + 2.6), true);
        // why: 1/6
        const yk = E.se(t, sy + 0.3, sy + 1.0);
        if (yk > 0) {
          c.save(); c.globalAlpha = yk;
          const bx = 580, by = 150;
          F07.card(c, bx - 250, by, bx + 250, by + 300, { seed: 4420 });
          F07.txt(c, 'Ay’ın cisimleri çekmesi', bx, by + 60, { size: 36, align: 'center' });
          P.fillPts(c, F07.rect(bx - 200, by + 100, bx + 200, by + 150), BR, 0.6); F07.txt(c, 'Dünya', bx + 190, by + 138, { size: 30, align: 'right', color: PAL.white });
          P.fillPts(c, F07.rect(bx - 200, by + 180, bx - 200 + 400 / 6, by + 230), BR, 0.6); F07.txt(c, 'Ay ≈ 1/6', bx - 120, by + 218, { size: 30 });
          F07.txt(c, 'yaklaşık 6 kat daha az', bx, by + 280, { size: 34, align: 'center', color: BR });
          c.restore();
        }
      });
      // Damla with helmet
      const dX = fly < 1 ? dx : (phaseA > 0.5 ? 330 : 330), dY = (fly < 1 ? dy : GY) - jp;
      DAMLA.draw(ctx, { x: dX, y: dY, s: 1.0, view: 'q3', expr: t > sy + 3 ? 'happy' : (t < sm ? 'happy' : 'curious'), look: [0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1, shadow: jp < 5,
        arms: jp > 5 ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.4], [1, 2.1]] });
      F07.helmet(ctx, dX, dY, 1.0);
      if (fly >= 1) INK.label(ctx, '(hayalî yolculuk · çizim ölçekli değildir)', 60, 1000 - 60, { size: 28, color: PAL.white, alpha: 0.7 * (1 - E.se(t, sm, sm + 1)) });
    }
  });
})();

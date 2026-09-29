// SAHNE 4 — Gösteri deneyi: buz ısıtılır, her 2 dakikada sıcaklık ölçülüp matris tabloya kaydedilir
// Erime (0 °C sabit) → su ısınır + buharlaşma → kaynama (≈100 °C sabit). Nicel veri (TYMM: nicel veri kayıtları, matris tablo)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F19;
  let K = null;
  const keys = () => K || (K = [
    [E.s('setup') + 0.5, 0], [E.s('warm-ice') + 0.4, 0], [E.e('warm-ice') - 0.6, 1],
    [E.s('melt-plateau') + 0.8, 1], [E.e('melt-plateau') - 0.6, 5],
    [E.s('evap') + 0.2, 5], [E.e('evap') - 0.3, 9.8], [E.s('boil') + 1.0, 10.2], [E.e('boil') - 1.2, 12.2]
  ]);
  F.simMin = t => F.pw(t, keys());
  E.scene({
    name: 'Gösteri deneyi', concept: 'Veri toplama: erime ve kaynamada sıcaklık sabit', from: 'setup', to: 'boil', trFrom: [320, 600],
    draw(ctx, t) {
      const ss = E.s('setup'), sm = E.s('melt-plateau'), se = E.s('evap'), sb = E.s('boil');
      const m = F.simMin(t), T = F.T(m), ice = F.ice(m);
      const boil = E.clamp((m - 9.9) / 0.4);
      const level = 0.12 + 0.43 * (1 - ice);
      const steam = m < 5 ? 0 : m < 10 ? 0.15 + 0.35 * (m - 5) / 5 : 1;
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      // bench
      const bench = [[40, 790], [820, 786], [830, 826], [30, 830], [40, 790]];
      P.fillPts(ctx, bench, '#E3D3B3'); wash(ctx, bench, '#8A6A45', 0.4, 2401, { bleed: 1 }); stroke(ctx, bench, { w: 3, closed: true, seed: 2402 });
      F.heater(ctx, 330, 700, 320, E.se(t, ss + 0.3, ss + 1.3), t);
      const bk = F.beaker(ctx, 330, 700, 260, 290, { level, ice, t, steam, boil });
      // small thermometer in the beaker
      line(ctx, [372, 684], [420, 330], { w: 7, seed: 2403 }); line(ctx, [372, 684], [420, 330], { w: 2.6, color: PAL.white, dry: false });
      INK.inkDot(ctx, 373, 680, 8, { color: '181,85,63' });
      // leader to the big scale
      ctx.save(); ctx.globalAlpha = 0.6; INK.dashed(ctx, P.bez([424, 330], [560, 250], [690, 260], 30), { w: 2, on: 8, off: 8 }); ctx.restore();
      // big thermometer scale
      const th = F.thermo(ctx, 760, 210, 760, T, {});
      const ly = th.ly;
      ctx.save(); ctx.font = '700 58px Kalam'; ctx.textAlign = 'left'; const txt = F.fmtT(T); const w = ctx.measureText(txt).width;
      const bx = 800, by = Math.min(Math.max(ly, 260), 740);
      P.fillPts(ctx, [[bx, by - 44], [bx + w + 36, by - 46], [bx + w + 38, by + 20], [bx + 2, by + 22]], '#FBF6E8', 0.95);
      stroke(ctx, [[bx, by - 44], [bx + w + 36, by - 46], [bx + w + 38, by + 20], [bx + 2, by + 22], [bx, by - 44]], { w: 2.4, closed: true, seed: 2404, color: F.HEAT });
      ctx.fillStyle = F.HEAT; ctx.fillText(txt, bx + 18, by + 4); ctx.restore();
      line(ctx, [778, ly], [798, by - 12], { w: 2, color: F.HEAT, dry: false });
      // clock (experiment time)
      P.icon.clock(ctx, 120, 330, 0.9, m / 12 * Math.PI * 2);
      INK.label(ctx, Math.floor(m) + '. dakika', 120, 430, { size: 36, weight: 700, align: 'center', rot: 0 });

      // plateau emphasis
      const meltHi = E.se(t, sm + 1.2, sm + 2) * (1 - E.se(t, se, se + 0.6));
      const boilHi = E.se(t, sb + 2.2, sb + 3);
      if (meltHi > 0) INK.label(ctx, 'sabit!', 830, th.yOf(0) + 80, { size: 44, weight: 700, color: F.HEAT, alpha: meltHi, rot: -0.05 });
      if (boilHi > 0) INK.label(ctx, 'sabit!', 830, 350, { size: 44, weight: 700, color: F.HEAT, alpha: boilHi, rot: -0.05 });
      // hâl labels on the beaker
      if (m > 1.2 && m < 5) E.inkText(ctx, 'erime', 330, 370, t, E.s('melt-plateau') + 0.8, E.e('melt-plateau') - 0.3, { size: 46, align: 'center', color: PAL.water });
      if (t > se + 3) E.inkText(ctx, 'buharlaşma', 250, 250, t, se + 3, sb + 0.5, { size: 44, align: 'center', color: PAL.water });
      if (t > sb + 0.5) E.inkText(ctx, 'kaynama', 250, 250, t, sb + 0.8, 1e9, { size: 50, align: 'center', color: F.HEAT });

      // matrix table
      const tk = E.se(t, ss + 1.2, ss + 2.2);
      if (tk > 0) E.layer(ctx, tk, c => {
        const X = [1080, 1270, 1490, 1850], Y0 = 190, RH = 86;
        F.card(c, 1060, 150, 810, 745, { seed: 2410 });
        const heads = ['süre (dk)', 'sıcaklık', 'gözlem'];
        heads.forEach((h, i) => INK.label(c, h, (X[i] + X[i + 1]) / 2, Y0 + 40, { size: 38, weight: 700, align: 'center', rot: 0 }));
        line(c, [1080, Y0 + 64], [1850, Y0 + 62], { w: 3, dry: false, seed: 2411 });
        [1270, 1490].forEach((x, i) => line(c, [x, Y0 + 4], [x + 2, Y0 + 64 + RH * 7 - 10], { w: 2, dry: false, alpha: 0.7, seed: 2412 + i }));
        F.ROWS.forEach(([mm, obs], i) => {
          const y = Y0 + 64 + RH * i + 58;
          const at = F.inv(mm, keys()) + 0.15; const k = E.se(t, at, at + 0.9);
          if (i > 0) c.save(), c.globalAlpha = 0.25, line(c, [1090, y - 58], [1840, y - 58], { w: 1.2, dry: false, seed: 2420 + i }), c.restore();
          if (k <= 0) return;
          const hl = k * ((mm === 2 || mm === 4) ? meltHi : (mm >= 10 ? boilHi : 0));
          if (hl > 0) { c.save(); c.globalAlpha = hl; P.fillPts(c, [[1280, y - 50], [1480, y - 52], [1482, y + 16], [1282, y + 18]], PAL.light, 0.35); c.restore(); }
          P.write(c, String(mm), 1175, y, k, { size: 42, align: 'center' });
          P.write(c, F.fmtT(F.T(mm)), 1380, y, E.seg(k, 0.2, 1), { size: 42, align: 'center', color: F.HEAT });
          P.write(c, obs, 1505, y, E.seg(k, 0.4, 1), { size: 34, weight: 400, color: mm >= 10 ? F.HEAT : PAL.ink });
        });
        INK.label(c, 'örnek veriler', 1840, 876, { size: 26, align: 'right', alpha: 0.6 });
      });
      // Damla watching from behind the safe line
      DAMLA.draw(ctx, {
        x: 590, y: 905, s: 0.95, view: 'q3', flip: true, t: t * (1 + boil), seed: 4, blink: E.blink(t, 13), squash: E.breath(t), talk: E.talk(t),
        expr: (meltHi > 0.5 || boilHi > 0.5) ? 'surprised' : 'curious', look: [-0.6, -0.5], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]], prop: 'notebook'
      });
    }
  });
})();

// SAHNE 5 — Ölçüm (b): buz ısıtılır, her dakika sıcaklık ölçülüp tabloya yazılır. Erime (0 °C sabit) → ısınma → kaynama (≈100 °C sabit)
(function () {
  const { PAL, line, stroke, wash } = INK;
  const F = G16;
  let K = null;
  const keys = () => K || (K = [
    [E.s('melt') + 0.3, 0], [E.s('melt') + 2.0, 1], [E.e('melt') - 0.8, 4],
    [E.s('heat') + 0.3, 4], [E.e('heat') - 0.4, 9], [E.s('boil') + 0.8, 9.2], [E.e('boil') - 0.8, 11]
  ]);
  F.simMin = t => F.pw(t, keys());
  E.scene({
    name: 'Ölçüm', concept: 'Her dakika sıcaklık ölçme ve kaydetme', from: 'melt', to: 'boil', trFrom: [330, 600],
    draw(ctx, t) {
      const sm = E.s('melt'), sb = E.s('boil');
      const m = F.simMin(t), T = F.T(m), ice = F.ice(m);
      const boil = E.clamp((m - 9) / 0.4);
      const level = 0.12 + 0.43 * (1 - ice);
      const steam = m < 4 ? 0 : m < 9 ? 0.1 + 0.3 * (m - 4) / 5 : 1;
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 40, 820, 790, 2601);
      F.heater(ctx, 300, 700, 320, 1, t);
      F.beaker(ctx, 300, 700, 260, 290, { level, ice, t, steam, boil });
      line(ctx, [342, 684], [390, 330], { w: 7, seed: 2603 }); line(ctx, [342, 684], [390, 330], { w: 2.6, color: PAL.white, dry: false });
      INK.inkDot(ctx, 343, 680, 8, { color: '181,85,63' });
      ctx.save(); ctx.globalAlpha = 0.6; INK.dashed(ctx, P.bez([394, 330], [520, 250], [640, 260], 30), { w: 2, on: 8, off: 8 }); ctx.restore();
      const th = F.thermo(ctx, 720, 210, 740, T, { min: -20, max: 110, step: 20 });
      ctx.save(); ctx.font = '700 54px Kalam'; ctx.textAlign = 'left'; const txt = F.fmtT(T); const w = ctx.measureText(txt).width;
      const bx = 760, by = Math.min(Math.max(th.ly, 260), 740);
      P.fillPts(ctx, [[bx, by - 42], [bx + w + 36, by - 44], [bx + w + 38, by + 20], [bx + 2, by + 22]], '#FBF6E8', 0.95);
      stroke(ctx, [[bx, by - 42], [bx + w + 36, by - 44], [bx + w + 38, by + 20], [bx + 2, by + 22], [bx, by - 42]], { w: 2.4, closed: true, seed: 2604, color: F.HEAT });
      ctx.fillStyle = F.HEAT; ctx.fillText(txt, bx + 18, by + 4); ctx.restore();
      P.icon.clock(ctx, 100, 560, 0.7, m / 12 * Math.PI * 2);
      INK.label(ctx, Math.floor(m) + '. dakika', 100, 650, { size: 30, weight: 700, align: 'center', rot: 0 });
      const meltHi = E.clamp((m - 1.1) / 0.3) * (1 - E.clamp((m - 3.9) / 0.3));
      const boilHi = E.clamp((m - 9.3) / 0.5);
      if (meltHi > 0) INK.label(ctx, 'erime: sabit!', 300, 340, { size: 44, weight: 700, color: PAL.water, align: 'center', alpha: meltHi, rot: -0.04 });
      if (boilHi > 0) INK.label(ctx, 'kaynama: sabit!', 300, 250, { size: 44, weight: 700, color: F.HEAT, align: 'center', alpha: boilHi, rot: -0.04 });
      // tablo: iki blok (0–5 dk, 6–11 dk)
      F.card(ctx, 1000, 150, 880, 720, { seed: 2610 });
      INK.label(ctx, 'Veri tablom', 1440, 210, { size: 44, weight: 700, align: 'center', color: F.AMBER, rot: 0 });
      [0, 1].forEach(b => {
        const X = 1030 + b * 430;
        INK.label(ctx, 'dk', X + 45, 275, { size: 32, weight: 700, align: 'center', rot: 0 });
        INK.label(ctx, '°C', X + 150, 275, { size: 32, weight: 700, align: 'center', rot: 0 });
        INK.label(ctx, 'gözlem', X + 300, 275, { size: 32, weight: 700, align: 'center', rot: 0 });
        line(ctx, [X, 295], [X + 400, 294], { w: 2.4, dry: false, seed: 2611 + b });
        line(ctx, [X + 90, 245], [X + 92, 840], { w: 1.6, dry: false, alpha: 0.6, seed: 2613 + b });
        line(ctx, [X + 210, 245], [X + 212, 840], { w: 1.6, dry: false, alpha: 0.6, seed: 2615 + b });
      });
      line(ctx, [1445, 240], [1447, 850], { w: 2.4, dry: false, seed: 2617 });
      F.ROWS.forEach((mm, i) => {
        const b = i < 6 ? 0 : 1, X = 1030 + b * 430, y = 360 + (i % 6) * 88;
        const at = F.inv(mm, keys()) + 0.1; const k = E.se(t, at, at + 0.7);
        if (k <= 0) return;
        const hl = (mm >= 1 && mm <= 4) ? meltHi : (mm >= 9 ? boilHi : 0);
        if (hl > 0) { ctx.save(); ctx.globalAlpha = hl; P.fillPts(ctx, [[X + 95, y - 44], [X + 206, y - 46], [X + 208, y + 14], [X + 97, y + 16]], mm >= 9 ? F.HEAT : F.COLD, 0.25); ctx.restore(); }
        P.write(ctx, String(mm), X + 45, y, k, { size: 38, align: 'center' });
        P.write(ctx, F.fmtT(F.T(mm)).replace(' °C', ''), X + 150, y, E.seg(k, 0.2, 1), { size: 38, align: 'center', color: F.HEAT });
        P.write(ctx, F.obs(mm), X + 222, y, E.seg(k, 0.4, 1), { size: 28, weight: 400 });
      });
      INK.label(ctx, 'örnek veriler · deniz seviyesi', 1860, 858, { size: 24, align: 'right', alpha: 0.6, rot: 0 });
      DAMLA.draw(ctx, {
        x: 560, y: 910, s: 0.85, view: 'q3', flip: true, t: t * (1 + boil), seed: 4, blink: E.blink(t, 13), squash: E.breath(t), talk: E.talk(t),
        expr: (meltHi > 0.5 || boilHi > 0.5) ? 'surprised' : 'curious', look: [-0.6, -0.5], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]], prop: 'notebook'
      });
    }
  });
})();

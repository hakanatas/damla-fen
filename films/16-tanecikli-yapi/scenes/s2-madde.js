// SAHNE 2 — Madde nedir? Kütle (eşit kollu terazi) + hacim (taş suya: su yükselir) → "kütlesi ve hacmi olan her şey madde"
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const F = F16;
  function balances(ctx, t) {
    const sm = E.s('mass');
    const defs = [
      { x: 400, at: sm + 0.4, L: (c, x, y) => F.stone(c, x, y - 2, 0.9), R: null, name: 'taş' },
      { x: 960, at: sm + 1.6, L: (c, x, y) => F.glass(c, x - 42, y - 118, 84, 116, 80, { seed: 12 }), R: (c, x, y) => F.box(c, x - 42, y - 118, 84, 116, { seed: 13 }), name: 'su', note: '(iki bardak da aynı)' },
      { x: 1520, at: sm + 2.8, L: (c, x, y) => F.balloon(c, x, y - 4, 0.95, 1), R: (c, x, y) => F.balloon(c, x, y - 4, 0.95, 0), name: 'balondaki hava', note: '(şişik – sönük)' }
    ];
    P.write(ctx, 'Kütlesi var mı?', 960, 235, E.seg(t, sm + 0.1, sm + 1.1), { size: 62, align: 'center' });
    defs.forEach((d, i) => {
      const k = E.se(t, d.at - 0.3, d.at + 0.3, 'out');
      const tilt = E.se(t, d.at + 0.4, d.at + 1.4, 'back');
      ctx.save(); ctx.globalAlpha = 0.35 + 0.65 * k;
      F.balance(ctx, d.x, 820, 0.85, tilt, d.L, d.R);
      ctx.restore();
      P.write(ctx, d.name, d.x, 880, E.seg(t, d.at, d.at + 0.8), { size: 42, align: 'center' });
      if (d.note) INK.label(ctx, d.note, d.x, 350, { size: 32, align: 'center', alpha: 0.65 * E.se(t, d.at + 0.8, d.at + 1.4) });
      P.check(ctx, d.x + 150, 470, 60, E.se(t, d.at + 1.4, d.at + 1.9), { w: 7, color: PAL.life });
    });
  }
  function volume(ctx, t) {
    const sv = E.s('volume');
    const bx = 780, by = 380, bw = 330, bh = 440;
    const drop = E.se(t, sv + 1.0, sv + 2.0, 'in');
    const rise = E.se(t, sv + 1.9, sv + 2.8);
    const L0 = 200, L1 = 262;
    // su ve taş
    const level = E.lerp(L0, L1, rise);
    const top = by + bh - level;
    const sy = E.lerp(280, by + bh - 4, drop);
    F.water(ctx, bx, by, bw, bh, level, { seed: 21 });
    F.stone(ctx, bx + bw / 2, sy, 1.25, 7);
    F.box(ctx, bx, by, bw, bh, { fill: false, seed: 22 });
    // eski seviye çizgisi + ok
    if (rise > 0) {
      ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, [[bx - 60, by + bh - L0], [bx + bw + 40, by + bh - L0]], { w: 2.4, on: 12, off: 8 }); ctx.restore();
      INK.label(ctx, 'önce', bx - 70, by + bh - L0 + 12, { size: 36, align: 'right', weight: 700, alpha: 0.8 });
      INK.label(ctx, 'sonra', bx - 70, top + 12, { size: 36, align: 'right', weight: 700, color: PAL.water, alpha: rise });
      if (rise > 0.5) P.arrow(ctx, [bx + bw + 60, by + bh - L0], [bx + bw + 60, top - 6], E.se(t, sv + 2.6, sv + 3.2), { w: 3.4, head: 14, color: PAL.water });
    }
    const k2 = E.seg(t, sv + 3.4, sv + 4.4);
    P.write(ctx, 'Su yükseldi:', 1250, 470, k2, { size: 52 });
    P.write(ctx, 'taş yer kaplar', 1250, 540, E.seg(t, sv + 4.2, sv + 5.2), { size: 52 });
    P.write(ctx, '→ hacmi var', 1250, 610, E.seg(t, sv + 5.0, sv + 6.0), { size: 52, color: PAL.water });
    // Damla solda işaret ediyor
    DAMLA.draw(ctx, { x: 420, y: 832, s: 1.5, view: 'q3', expr: rise > 0.5 ? 'surprised' : 'curious', look: [0.8, rise > 0.5 ? -0.3 : 0.2], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 1.9]] });
  }
  function definition(ctx, t) {
    const sd = E.s('def');
    F.card(ctx, 960, 510, 1240, 600, { seed: 140 });
    INK.label(ctx, 'MADDE', 960, 330, { size: 96, weight: 700, align: 'center', font: 'Fraunces', alpha: E.se(t, sd + 0.2, sd + 1.0) });
    P.drawOn(ctx, P.bez([780, 355], [960, 366], [1140, 350], 30), E.se(t, sd + 0.8, sd + 1.4), { w: 3.4, color: PAL.water });
    const rows = [['kütlesi olan', sd + 1.4], ['ve yer kaplayan, yani hacmi olan', sd + 2.6], ['her şey', sd + 4.0]];
    rows.forEach(([txt, at], i) => {
      P.write(ctx, txt, 470, 440 + i * 72, E.seg(t, at, at + 1.1), { size: 50, color: i === 2 ? '#8A4A10' : PAL.ink });
      if (i < 2) P.check(ctx, 420, 425 + i * 72, 44, E.se(t, at + 0.8, at + 1.2), { w: 6, color: PAL.life });
    });
    // örnek ikonlar
    const ik = E.se(t, sd + 4.8, sd + 5.6, 'out');
    if (ik > 0) {
      ctx.save(); ctx.globalAlpha = ik;
      F.stone(ctx, 560, 760, 0.8); F.glass(ctx, 720, 660, 80, 104, 70, { seed: 23 }); line(ctx, [960, 764], [964, 720], { w: 1.4, dry: false }); F.balloon(ctx, 964, 720, 0.8, 1);
      INK.label(ctx, '…ve ben de!', 1130, 740, { size: 44, weight: 700, color: PAL.water });
      ctx.restore();
    }
    DAMLA.draw(ctx, { x: 1440, y: 800, s: 1.05, view: 'q3', flip: true, expr: t > sd + 4.8 ? 'happy' : 'neutral', look: [-0.6, 0.1], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2, arms: t > sd + 4.8 ? [[-1, 0.4], [1, 2.6]] : [[-1, 0.35], [1, 0.4]] });
  }
  E.scene({
    name: 'Madde nedir?', concept: 'Kütlesi ve hacmi olan her şey maddedir', from: 'mass', to: 'def', trFrom: [960, 600],
    draw(ctx, t) {
      F.desk(ctx);
      const aV = E.se(t, E.s('volume') - 0.4, E.s('volume') + 0.4), aD = E.se(t, E.s('def') - 0.4, E.s('def') + 0.4);
      if (aV < 1) E.layer(ctx, 1 - aV, c => balances(c, t));
      if (aV > 0 && aD < 1) E.layer(ctx, Math.min(aV, 1 - aD), c => volume(c, t));
      if (aD > 0) E.layer(ctx, aD, c => definition(c, t));
    }
  });
})();

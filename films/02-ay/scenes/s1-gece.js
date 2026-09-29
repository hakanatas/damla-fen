// SAHNE 1 — Gece: Damla Ay'ı görür; Ay dürbünle güvenle gözlenebilir (Güneş'le karşıtlık)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = '#A23A2A';
  // ortak gece manzarası (s1, s2 ve s8 kullanır)
  F02.nightLand = (ctx, t, o = {}) => {
    const hill = P.hillLine(E.W);
    F02.night(ctx, o.k ?? 1);
    F02.stars(ctx, t, o.k ?? 1, { n: 46, seed: 21, avoid: [[o.mx ?? 1700, o.my ?? 200, 170]] });
    if (o.moon !== false) F02.glowMoon(ctx, o.mx ?? 1700, o.my ?? 200, o.mr ?? 75);
    P.landscape(ctx, E.W, E.H, t, { hill });
    const hf = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]);
    P.fillPts(ctx, hf, 'rgb(30,38,72)', 0.32);
    return hill;
  };
  E.scene({
    name: 'Gece', concept: 'Ay gözlemi; Ay\'a dürbünle bakmak güvenlidir', from: 'title', to: 'safe',
    draw(ctx, t) {
      const th = E.s('hello'), ts = E.s('safe');
      const dusk = E.se(t, 0, th + 3);
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * E.se(t, 0, E.e('safe'), 'sine'), y: 540, z: 1 + 0.05 * E.se(t, 0, E.e('safe'), 'sine') });
      const hill = F02.nightLand(ctx, t, { k: 0.35 + 0.65 * dusk });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      const raise = E.se(t, ts + 0.3, ts + 1.3);
      let arms = [[-1, 0.35], [1, 0.35]];
      if (t > th + 0.8 && t < ts) arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]];
      if (t >= ts) arms = [[-1, [E.lerp(-40, 4, raise), E.lerp(-100, -172, raise)]], [1, [E.lerp(40, 30, raise), E.lerp(-100, -176, raise)]]];
      DAMLA.draw(ctx, {
        x: dx, y: dy, s: 1.5, view: 'q3', expr: t >= ts ? 'curious' : 'happy', look: [0.8, -0.7],
        blink: E.blink(t, 2), squash: E.breath(t), arms, t, talk: E.talk(t), seed: 1,
        hold: (c, res) => { if (t < ts) return; const h1 = res[1].hand, h0 = res[-1].hand; const mx = (h0[0] + h1[0]) / 2, my = (h0[1] + h1[1]) / 2;
          [[-4, -150], [34, -152]].forEach(([bx, by], i) => { c.save(); c.translate(E.lerp(mx, bx, raise), E.lerp(my, by, raise)); c.rotate(0.7); const b = [[-11, -22], [11, -22], [13, 16], [-13, 16], [-11, -22]]; P.fillPts(c, b, '#3A3844', 1); INK.stroke(c, b, { w: 2.4, closed: true, seed: 90 + i }); P.fillPts(c, circlePts(0, -22, 11, 4, 16), '#8FB3C8', 1); c.restore(); }); }
      });
      ctx.restore();
      // güvenlik karşılaştırma kartı (Ay ✓ · Güneş ✗)
      const kc = Math.min(E.se(t, ts + 1.2, ts + 1.9, 'out'), 1 - E.se(t, E.e('safe') - 0.4, E.e('safe') + 0.2));
      if (kc > 0) E.layer(ctx, kc, c => {
        F02.card(c, 110, 210, 560, 420, { seed: 11 });
        P.moon(c, 200, 330, 46);
        P.check(c, 300, 322, 60, E.se(t, ts + 2.0, ts + 2.6), { w: 8 });
        INK.label(c, 'Ay: dürbünle', 370, 322, { size: 40, weight: 700 }); INK.label(c, 'bakılabilir', 370, 366, { size: 36 });
        P.sun(c, 200, 510, 42, t, { nrays: 12, glow: false, cells: false });
        P.cross(c, 300, 510, 30, E.se(t, ts + 3.2, ts + 3.8), { w: 8, color: RED });
        INK.label(c, 'Güneş: asla!', 370, 506, { size: 40, weight: 700, color: RED }); INK.label(c, 'filtresiz bakılmaz', 370, 550, { size: 32 });
      });
      F02.title(ctx, t, E.e('title') + 1.4, 2, 'Gökyüzündeki Komşumuz: Ay');
    }
  });
})();

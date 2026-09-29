// SAHNE 4 — Model önerme (FB.5.5.6 a) ve ilk test: kaplamasız ↔ gazete kâğıdıyla kaplı karton ev
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F21;
  E.scene({
    name: 'Model öner', concept: 'Isı yalıtımı modeli önerme ve test etme', from: 'plan', to: 'data1', trFrom: [520, 600],
    draw(ctx, t) {
      const sp = E.s('plan'), so = E.s('propose'), s1 = E.s('test1'), sd = E.s('data1');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const tb = [[60, 800], [1300, 796], [1310, 840], [50, 844], [60, 800]]; P.fillPts(ctx, tb, '#E3D3B3'); wash(ctx, tb, '#8A6A45', 0.4, 4501); stroke(ctx, tb, { w: 3, closed: true, seed: 4502 });
      const m = E.clamp((t - (s1 + 1)) / (E.e('test1') - s1 - 1.5)) * 20;
      const flow = E.se(t, s1 + 0.6, s1 + 1.4);
      const TA = F.at(F.D.plain, m), TB = F.at(F.D.lined, m);
      // model A
      const ak = E.se(t, sp + 0.3, sp + 1.0, 'out');
      const axA = E.lerp(640, 400, E.se(t, so - 0.2, so + 0.8));
      if (ak > 0) E.layer(ctx, ak, c => {
        F.model(c, axA, 796, 380, 330, { T: TA, t, flow, showT: t > s1 });
        INK.label(c, 'A: kaplamasız', axA, 866, { size: 36, weight: 700, align: 'center', alpha: E.se(t, so, so + 0.6) });
      });
      // plan labels
      const pl = E.se(t, sp + 1.5, sp + 2.3) * (1 - E.se(t, so - 0.3, so + 0.3));
      if (pl > 0) E.layer(ctx, pl, c => {
        INK.leader(c, [920, 330], [760, 420]); P.write(c, 'karton kutu = ev', 930, 330, E.seg(t, sp + 1.5, sp + 2.5), { size: 44 });
        INK.leader(c, [920, 560], [680, 720]); P.write(c, 'ılık su şişesi = evin ısısı', 930, 560, E.seg(t, sp + 3.5, sp + 4.8), { size: 44, color: F.HEAT });
        INK.leader(c, [920, 450], [690, 540]); P.write(c, 'termometre', 930, 450, E.seg(t, sp + 5.5, sp + 6.3), { size: 44 });
        INK.label(c, '(model; ölçekli değildir)', 930, 640, { size: 28, alpha: 0.6 });
      });
      // model B (lined walls)
      const bk = E.se(t, so + 0.2, so + 1.0, 'out');
      if (bk > 0) E.layer(ctx, bk, c => {
        F.model(c, 980, 796, 380, 330, { T: TB, t, flow, walls: E.se(t, so + 1.2, so + 3.2), showT: t > s1 });
        INK.label(c, 'B: duvarlar kaplı', 980, 866, { size: 36, weight: 700, align: 'center' });
        if (t < s1 + 0.5) { const lk = E.se(t, so + 3.2, so + 3.8); if (lk > 0) { INK.leader(c, [1150, 350], [1140, 520]); INK.label(c, 'buruşuk gazete kâğıdı', 1150, 330, { size: 32, weight: 700, alpha: lk, align: 'center' }); } }
      });
      // right panel: hypothesis → data chart
      const hk = E.se(t, so + 0.8, so + 1.5, 'out') * (1 - E.se(t, s1 + 0.2, s1 + 0.8));
      if (hk > 0) E.layer(ctx, hk, c => {
        F.card(c, 1340, 220, 510, 400, { fill: '#F6E7B8', seed: 4510 });
        P.write(c, 'Önerim (hipotez):', 1370, 290, E.seg(t, so + 1.2, so + 2.2), { size: 40, color: '#8A4A10' });
        ['Duvarları buruşuk gazete', 'kâğıdıyla kaplarsam,', 'ısı daha yavaş kaçar.'].forEach((s, i) => P.write(c, s, 1370, 370 + i * 64, E.seg(t, so + 2 + i * 1.0, so + 3.2 + i * 1.0), { size: 40 }));
        INK.label(c, 'Sonra test edip göreceğim.', 1370, 580, { size: 30, alpha: 0.7 * E.se(t, so + 5, so + 5.8) });
      });
      const ck = E.se(t, s1 + 0.4, s1 + 1.1, 'out');
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 1340, 160, 520, 590, { seed: 4520 });
        P.icon.clock(c, 1430, 250, 0.6, m / 20 * Math.PI * 2);
        INK.label(c, Math.round(m) + '. dakika', 1490, 262, { size: 36, weight: 700 });
        F.chart(c, 1420, 380, 360, 280, [{ d: F.D.plain, col: '#8B8378', label: 'A' }, { d: F.D.lined, col: F.HEAT, label: 'B' }], m, { lo: 25, hi: 42 });
        INK.label(c, 'örnek veriler', 1840, 735, { size: 24, align: 'right', alpha: 0.6 });
      });
      // result
      const rk = E.se(t, sd + 3.5, sd + 4.3);
      if (rk > 0) { P.write(ctx, 'B’de ısı daha yavaş kaçtı!', 1600, 830, rk, { size: 38, align: 'center', color: '#8A4A10' }); P.check(ctx, 1345, 800, 40, E.se(t, sd + 4.3, sd + 4.8), { w: 6 }); }
      DAMLA.draw(ctx, {
        x: 1790, y: 1070, s: 0.9, view: 'q3', flip: true, t, seed: 4, blink: E.blink(t, 5), squash: E.breath(t), talk: E.talk(t),
        expr: rk > 0.5 ? 'happy' : 'curious', look: [-0.8, -0.6], arms: [[-1, 0.35], [1, 2.3]], shadow: false
      });
    }
  });
})();

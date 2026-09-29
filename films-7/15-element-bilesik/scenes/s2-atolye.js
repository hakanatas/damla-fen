// SAHNE 2 — Model atölyesi: renk/boyut kuralı; aynı cins atomlu moleküller (H₂, O₂, N₂);
// su için model önerir → yeni kanıt (bükük, ≈104,5°, O > H) → modeli yeniler; CO₂ doğrusal (FB.7.5.3 a, b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F7M;
  const lin = F.MOL.H2O_lin.atoms, bent = F.MOL.H2O.atoms; // lin: H O H ; bent: O H H
  // morph: 0 → düz, aynı boy/renk ; 1 → bükük, doğru boy/renk
  function water(c, x, y, s, m) {
    const map = [[1, 0], [0, 1], [2, 2]]; // lin index → bent index  (O: 1→0, H: 0→1, H: 2→2)
    const pts = [], els = [];
    map.forEach(([li, bi]) => { const a = lin[li], b = bent[bi]; pts[bi] = [x + E.lerp(a[1], b[1], m) * s, y + E.lerp(a[2], b[2], m) * s]; els[bi] = b[0]; });
    F.bond(c, pts[0], pts[1], 1, { w: 9 * s, gap: 13 * s }); F.bond(c, pts[0], pts[2], 1, { w: 9 * s, gap: 13 * s });
    [1, 2, 0].forEach(i => {
      const d = F.EL[els[i]]; const r = E.lerp(38, d.r, m) * s;
      const fill = m < 0.5 ? '#C9C1B0' : d.fill;
      F.ball(c, pts[i][0], pts[i][1], r, fill, { sym: els[i], txt: m < 0.5 ? PAL.ink : d.txt, symSize: r * 0.85 });
    });
    return pts;
  }
  E.scene({
    name: 'Model atölyesi', concept: 'Molekül modeli önerme ve yenileme', from: 'material', to: 'co2', trFrom: [960, 700],
    draw(ctx, t) {
      const sma = E.s('material'), ss = E.s('same'), sw = E.s('water1'), sev = E.s('evidence'), sr = E.s('revise'), sc = E.s('co2');
      F.desk(ctx, 870, 4);
      // malzemeler: hamur topları + kürdanlar
      [['#F7F2E6', 30, 180], ['#F7F2E6', 30, 240], ['#5E8FB0', 44, 330], ['#55525C', 42, 430], ['#8E7FB8', 42, 530]].forEach(([col, r, x], i) => F.ball(ctx, x, 850 - r * 0.8, r * 0.8, col));
      for (let i = 0; i < 6; i++) line(ctx, [620 + i * 14, 858], [760 + i * 12, 842], { w: 3, color: '#C9A87A', dry: false, seed: 710 + i });
      INK.label(ctx, 'oyun hamuru · kürdan', 380, 905, { size: 30, alpha: 0.7, align: 'center' });
      // kural kartı
      const rk = Math.min(E.se(t, sma + 0.3, sma + 1.0, 'out'), 1 - E.se(t, ss - 0.2, ss + 0.4));
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 420, 200, 1500, 640, { seed: 721 });
        P.write(c, 'Model kuralı', 480, 290, E.seg(t, sma + 0.5, sma + 1.3), { size: 58, color: PAL.water });
        F.ball(c, 530, 400, 30, '#F7F2E6', { sym: 'H', symSize: 26 }); F.ball(c, 610, 400, 30, '#F7F2E6', { sym: 'H', symSize: 26 });
        P.write(c, 'aynı cins atom → aynı renk, aynı boyut', 680, 415, E.seg(t, sma + 1.3, sma + 2.6), { size: 42 });
        F.ball(c, 530, 540, 30, '#F7F2E6', { sym: 'H', symSize: 26 }); F.ball(c, 620, 540, 44, '#5E8FB0', { sym: 'O', txt: '#FBF8F1', symSize: 38 });
        P.write(c, 'farklı cins atom → farklı renk ya da boyut', 690, 555, E.seg(t, sma + 2.8, sma + 4.2), { size: 42 });
      });
      // aynı cins atomlu moleküller
      const sk = Math.min(E.se(t, ss, ss + 0.6, 'out'), 1 - E.se(t, sw - 0.2, sw + 0.4));
      if (sk > 0) E.layer(ctx, sk, c => {
        [['H2', 520, 'hidrojen · H₂', 0], ['O2', 960, 'oksijen · O₂', 3.0], ['N2', 1400, 'azot · N₂', 4.2]].forEach(([m, x, nm, d]) => {
          const k = E.se(t, ss + 0.3 + d, ss + 1.0 + d, 'out'); if (k <= 0) return;
          E.layer(c, k, c2 => F.mol(c2, m, x, 440, 1.3));
          P.write(c, nm, x, 600, E.seg(t, ss + 0.8 + d, ss + 1.6 + d), { size: 44, align: 'center' });
        });
        INK.label(c, 'O₂: ikili bağ · N₂: üçlü bağ', 960, 690, { size: 32, align: 'center', alpha: 0.6 * E.se(t, ss + 5.5, ss + 6.2) });
      });
      // su modeli
      const wk = E.se(t, sw, sw + 0.6, 'out');
      if (wk > 0) E.layer(ctx, wk, c => {
        const m = E.se(t, sr + 0.3, sr + 2.3, 'io');
        const shift = E.se(t, sc, sc + 1.0);
        const wx = E.lerp(760, 520, shift), wy = 470;
        if (t < sr + 0.3) P.write(c, '1. modelim', wx, 300, E.seg(t, sw + 0.6, sw + 1.4), { size: 46, align: 'center' });
        if (m > 0 && t < sc) P.write(c, 'yenilenmiş model', wx, 300, E.seg(t, sr + 1.8, sr + 2.8), { size: 46, align: 'center', color: PAL.water });
        const pts = water(c, wx, wy, 1.35, m);
        if (m > 0.95) {
          // açı yayı
          const a1 = Math.atan2(pts[1][1] - pts[0][1], pts[1][0] - pts[0][0]), a2 = Math.atan2(pts[2][1] - pts[0][1], pts[2][0] - pts[0][0]);
          const ak = E.se(t, sr + 2.3, sr + 3.0);
          c.save(); c.globalAlpha *= ak; stroke(c, P.arc(pts[0][0], pts[0][1], 95, a2, a1, 24), { w: 2.6, color: F.BR, dry: false }); c.restore();
          P.write(c, '≈ 104,5°', pts[0][0], pts[0][1] + 150, ak, { size: 40, align: 'center', color: F.BR });
          INK.label(c, 'H₂O', wx, 700, { size: 44, weight: 700, align: 'center', alpha: ak });
        }
        // yeni kanıt kartı
        const ek = Math.min(E.se(t, sev + 0.2, sev + 0.8, 'out'), 1 - E.se(t, sr + 2.0, sr + 2.8));
        if (ek > 0) E.layer(c, ek, c2 => {
          F.evidence(c2, 1330, 290, 1, 'yeni kanıt!');
          F.card(c2, 1100, 380, 1800, 690, { seed: 731 });
          P.write(c2, 'Ölçümler gösteriyor ki:', 1140, 450, E.seg(t, sev + 0.6, sev + 1.6), { size: 40 });
          P.write(c2, '• molekül bükük, açı ≈ 104,5°', 1140, 530, E.seg(t, sev + 1.6, sev + 2.8), { size: 40 });
          P.write(c2, '• oksijen atomu hidrojenden büyük', 1140, 610, E.seg(t, sev + 3.0, sev + 4.2), { size: 40 });
          // bükük hayalet taslak
          const gk = E.se(t, sev + 1.8, sev + 2.6);
          if (gk > 0 && t < sr + 0.3) { c2.save(); c2.globalAlpha *= 0.35 * gk; F.mol(c2, 'H2O', wx, wy, 1.35, { sym: false }); c2.restore(); }
        });
        // CO₂
        const ck = E.se(t, sc + 0.4, sc + 1.2, 'out');
        if (ck > 0) {
          E.layer(c, ck, c2 => F.mol(c2, 'CO2', 1320, 470, 1.25));
          const dk = E.se(t, sc + 1.4, sc + 2.2);
          if (dk > 0) { c.save(); c.globalAlpha *= dk; INK.dashed(c, F.densePts([[1100, 560], [1540, 560]], 4), { w: 2, on: 10, off: 8 }); c.restore(); }
          P.write(c, 'CO₂ · doğrusal (180°)', 1320, 640, E.seg(t, sc + 1.6, sc + 2.8), { size: 44, align: 'center', color: PAL.water });
          INK.label(c, 'bükük', wx, 760, { size: 38, align: 'center', alpha: dk, color: F.BR });
        }
      });
      F.damla(ctx, t, { x: 1780, y: 900, s: 0.9, flip: true, expr: t > sev && t < sr ? 'surprised' : (t > sr + 2 ? 'happy' : 'thinking'), look: [-0.8, -0.3], seed: 3, arms: [[-1, 0.35], [1, 1.6]] });
    }
  });
})();

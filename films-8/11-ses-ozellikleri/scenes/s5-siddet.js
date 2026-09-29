// SAHNE 5 — FB.8.4.4: problem ("Davulun sesi uzaktan hoş gelir"), ses şiddeti tanımı (birim YOK), iki deney (değişken kontrolü), iki ayrı önerme
(function () {
  const { PAL, stroke, line, wash } = INK; const F = S8;
  function strikeState(t, t0, per) { const ph = t - t0; if (ph < 0) return [0, 0.05]; const q = ph % per; return [Math.exp(-q * 2.2), 0.05 + 0.95 * Math.exp(-q * 9)]; }
  E.scene({
    name: 'Ses şiddeti ve uzaklık', concept: 'Uzaklık ve ses şiddetinin işitmeye etkisi', from: 'drumq', to: 'claims', trFrom: [960, 540],
    draw(ctx, t) {
      const sq = E.s('drumq'), sl = E.s('loud'), sh = E.s('hard'), s1 = E.s('exp1'), s2 = E.s('exp2'), sc = E.s('claims');
      const aA = 1 - E.se(t, sl - 0.3, sl + 0.5);
      const aB = Math.min(E.se(t, sl - 0.3, sl + 0.5), 1 - E.se(t, s1 - 0.3, s1 + 0.5));
      const aC = Math.min(E.se(t, s1 - 0.3, s1 + 0.5), 1 - E.se(t, sc - 0.3, sc + 0.5));
      const aD = E.se(t, sc - 0.3, sc + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        const hill = P.hillLine(E.W, 860); P.landscape(c, E.W, E.H, t, { hill, tree: false });
        const [v, st] = strikeState(t, sq + 0.5, 1.4);
        F.drum(c, 300, P.hillY(hill, 300) + 4, 0.55, t, v, { stick: st });
        F.rings(c, 330, P.hillY(hill, 300) - 90, t, { a0: -0.5, a1: 0.3, r0: 90, maxR: 1250, gap: 90, speed: 180, w: 6, wFade: true, fadeK: 0.95 });
        F.damla(c, t, { x: 1560, y: P.hillY(hill, 1560) + 4, s: 1.1, flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, [58, -150]]] });
        F.card(c, 460, 190, 1000, 120, 201, { tint: PAL.light, tintA: 0.2 });
        F.fit(c, '“Davulun sesi uzaktan hoş gelir.”', 960, 268, 940, 54, { font: 'Kalam' });
        P.write(c, 'Uzaklık ve ses şiddeti işitmeyi nasıl etkiler?', 960, 400, E.seg(t, sq + 3.5, sq + 5), { size: 44, align: 'center' });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        c.fillStyle = 'rgba(138,106,69,0.10)'; c.fillRect(0, 0, E.W, E.H);
        F.card(c, 260, 170, 1400, 120, 211, { tint: PAL.light, tintA: 0.18 });
        F.fit(c, 'Ses şiddeti: sesi şiddetli ya da zayıf işitmemize neden olan özellik', 960, 245, 1340, 44);
        const kh = E.se(t, sh - 0.2, sh + 0.6);
        [[520, 0.35, 14, 'hafif vuruş', 'küçük titreşim → zayıf ses'], [1400, 1, 60, 'sert vuruş', 'büyük titreşim → şiddetli ses']].forEach(([x, str, amp, a, b], i) => {
          const [v, st] = strikeState(t, sl + 1 + i * 0.7, 1.6);
          F.drum(c, x, 640, 0.9, t, v * str, { stick: st });
          F.rings(c, x + 100, 470, t, { a0: -0.7, a1: 0.2, r0: 90, maxR: 250, gap: 50, speed: 120, w: 1.5 + 4 * str, alpha: 0.3 + 0.7 * str });
          F.fit(c, a, x, 370, 400, 42);
          if (kh > 0) { c.save(); c.globalAlpha *= kh; F.graph(c, x - 260, 700, 520, 150, 5, amp, E.se(t, sh + 0.4 + i * 1.2, sh + 1.6 + i * 1.2), { axis: false, seed: 220 + i }); F.fit(c, b, x, 900, 700, 38, { color: i ? F.AMB : PAL.ink }); c.restore(); }
        });
        if (kh > 0) F.fit(c, 'aynı frekans', 960, 790, 220, 30, { weight: 400, alpha: 0.7 * kh });
      });
      if (aC > 0) E.layer(ctx, aC, c => {
        c.fillStyle = 'rgba(138,106,69,0.10)'; c.fillRect(0, 0, E.W, E.H);
        // Deney 1: vuruş sabit, uzaklık değişir
        const g1 = 500, g2 = 850;
        line(c, [120, g1], [1800, g1], { w: 3, color: F.WOOD }); line(c, [120, g2], [1800, g2], { w: 3, color: F.WOOD });
        F.fit(c, '1. deney · vuruş aynı, uzaklık değişiyor', 960, 205, 1200, 44);
        const [v1, st1] = strikeState(t, s1 + 0.4, 1.4);
        F.drum(c, 260, g1, 0.55, t, v1, { stick: st1 });
        c.save(); c.beginPath(); c.rect(0, 240, E.W, g1 - 230); c.clip();
        F.rings(c, 300, g1 - 90, t, { a0: -0.35, a1: 0.35, r0: 70, maxR: 1450, gap: 80, speed: 200, w: 6, wFade: true, fadeK: 0.9 });
        c.restore();
        const pos = [650, 1100, 1550]; const step = Math.min(2, Math.floor(Math.max(0, t - s1 - 1.5) / 2.2));
        const walkK = E.se(t, s1 + 1.5 + step * 2.2 - 0.8, s1 + 1.5 + step * 2.2);
        const dx = step === 0 ? pos[0] : E.lerp(pos[step - 1], pos[step], walkK);
        pos.forEach((p, i) => { F.fit(c, (i + 1) + '. konum', p, g1 + 40, 200, 30, { weight: 400, alpha: 0.7 }); });
        const lvl1 = [5, 3, 1][step];
        F.damla(c, t, { x: dx, y: g1, s: 0.62, flip: true, expr: 'curious', look: [-0.8, 0], feet: walkK < 1 && step > 0 ? E.walk(t * 10) : undefined, arms: [[-1, 0.4], [1, [58, -150]]] });
        F.meter(c, dx + 70, g1 - 90, lvl1, 1);
        // Deney 2: uzaklık sabit, vuruş değişir
        const k2 = E.se(t, s2 - 0.2, s2 + 0.6);
        if (k2 > 0) E.layer(c, k2, c2 => {
          F.fit(c2, '2. deney · uzaklık aynı, vuruş değişiyor', 960, 590, 1200, 44);
          const lvl = t < s2 + 3 ? 1 : t < s2 + 5.5 ? 3 : 5, str = lvl / 5;
          const [v2, st2] = strikeState(t, s2 + 0.6, 1.3);
          F.drum(c2, 260, g2, 0.55, t, v2 * str, { stick: st2 });
          c2.save(); c2.beginPath(); c2.rect(0, 620, E.W, g2 - 610); c2.clip();
          F.rings(c2, 300, g2 - 90, t, { a0: -0.35, a1: 0.35, r0: 70, maxR: 700, gap: 80, speed: 200, w: 1.5 + 5 * str, alpha: 0.3 + 0.7 * str });
          c2.restore();
          F.ear(c2, 900, g2 - 70, 0.7);
          F.meter(c2, 1000, g2 - 40, lvl, 1);
          F.fit(c2, ['hafif', 'orta', 'sert'][[1, 3, 5].indexOf(lvl)] + ' vuruş', 1450, g2 - 60, 400, 42, { color: F.AMB });
        });
      });
      if (aD > 0) E.layer(ctx, aD, c => {
        c.fillStyle = 'rgba(138,106,69,0.10)'; c.fillRect(0, 0, E.W, E.H);
        P.write(c, 'Önermelerim', 960, 225, E.seg(t, sc + 0.3, sc + 1.3), { size: 62, align: 'center' });
        [['1', 'Ses kaynağından uzaklaştıkça ses daha zayıf işitilir.', 1.0], ['2', 'Ses şiddeti arttıkça ses daha güçlü işitilir.', 4.4]].forEach(([n, s, d], i) => {
          const k = E.se(t, sc + d, sc + d + 0.7, 'out'); if (k <= 0) return;
          E.layer(c, k, c2 => {
            F.card(c2, 260, 300 + i * 270, 1400, 200, 231 + i, { tint: i ? PAL.light : PAL.water, tintA: 0.14 });
            F.stamp(c2, 360, 400 + i * 270, n, 1, { color: F.AMB, size: 60, rot: -0.05 });
            F.wfit(c2, s, 460, 418 + i * 270, E.seg(t, sc + d + 0.3, sc + d + 1.8), 50, 1150);
          });
        });
        F.fit(c, '(uzaklık ile ses şiddeti arasında sayısal ilişki aranmaz)', 960, 880, 1200, 30, { weight: 400, alpha: 0.6 * E.se(t, sc + 6, sc + 7) });
      });
    }
  });
})();

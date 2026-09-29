// SAHNE 6 — Model (ağaç şeridi, çift cam, perde) → araştırma (koşulların karşılaştırılması) → kanıta dayalı çözüm → sorumluluk (FB.8.4.6 b–e)
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const F = S8;
  E.scene({
    name: 'Çözüm', concept: 'Model, araştırma, kanıta dayalı çözüm', from: 'model', to: 'respons', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('model'), sr = E.s('research'), sa = E.s('analyze'), sp = E.s('respons');
      const aA = 1 - E.se(t, sr - 0.3, sr + 0.5), aB = Math.min(E.se(t, sr - 0.3, sr + 0.5), 1 - E.se(t, sp - 0.3, sp + 0.5)), aC = E.se(t, sp - 0.3, sp + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        c.fillStyle = 'rgba(111,138,58,0.07)'; c.fillRect(0, 0, E.W, E.H);
        const road = [[0, 800], [560, 800], [560, 900], [0, 900]]; F.shape(c, road, '#5B5566', 0.4, 851);
        F.car(c, 260, 840, 0.7, t);
        F.rings(c, 360, 790, t, { a0: -0.7, a1: 0.1, r0: 50, maxR: 700, gap: 55, speed: 120, fadeK: 0.95 });
        const k1 = E.se(t, sm + 1.0, sm + 1.8), k2 = E.se(t, sm + 3.0, sm + 3.8), k3 = E.se(t, sm + 5.0, sm + 5.8);
        if (k1 > 0) E.layer(c, k1, c2 => { [640, 760].forEach((x, i) => F.tree(c2, x, 830, 1.0, t, 0.1, 860 + i * 20)); F.stamp(c2, 700, 330, '1', 1, { color: F.AMB, size: 44 }); F.fit(c2, 'ağaç şeridi', 700, 900, 300, 36); });
        const wall = [[980, 830], [980, 300], [1800, 300], [1800, 830]]; F.shape(c, wall, '#D9CBB0', 0.45, 853);
        F.fit(c, 'sınıf', 1400, 360, 300, 44);
        F.window(c, 1040, 450, 200, 220, t, 0);
        if (k2 > 0) { c.save(); c.globalAlpha *= k2; line(c, [1052, 460], [1052, 660], { w: 3, color: PAL.water }); line(c, [1228, 460], [1228, 660], { w: 3, color: PAL.water }); F.stamp(c, 1140, 410, '2', 1, { color: F.AMB, size: 44 }); F.fit(c, 'çift cam', 1140, 720, 300, 36); c.restore(); }
        if (k3 > 0) E.layer(c, k3, c2 => { F.surface(c2, 1270, 430, 90, 300, 'cloth'); F.stamp(c2, 1320, 400, '3', 1, { color: F.AMB, size: 44 }); F.fit(c2, 'kalın perde', 1330, 780, 300, 36); });
        F.damla(c, t, { x: 1600, y: 820, s: 0.9, flip: true, expr: 'thinking', look: [-0.7, -0.3], arms: [[-1, 0.4], [1, [30, -86]]] });
        F.fit(c, 'Fikrim / modelim', 960, 220, 800, 56, { alpha: E.se(t, sm + 0.2, sm + 1) });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        c.fillStyle = 'rgba(138,106,69,0.08)'; c.fillRect(0, 0, E.W, E.H);
        P.write(c, 'Araştırma: aynı saatte, sınıfın aynı yerinde dinledim', 960, 215, E.seg(t, sr + 0.3, sr + 1.6), { size: 44, align: 'center' });
        const rows = [['pencere açık, perde yok', 5], ['pencere kapalı', 3], ['pencere kapalı + perde', 2]];
        rows.forEach(([n, l], i) => {
          const y = 330 + i * 150, k = E.se(t, sr + 1.8 + i * 1.6, sr + 2.5 + i * 1.6); if (k <= 0) return;
          E.layer(c, k, c2 => {
            F.card(c2, 300, y - 50, 1320, 120, 870 + i);
            F.wfit(c2, n, 350, y + 25, 1, 44, 700);
            F.meter(c2, 1150, y + 40, l, 1);
            F.fit(c2, ['çok gürültü', 'orta', 'az'][i], 1480, y + 25, 220, 38, { color: i ? PAL.water : F.AMB });
          });
        });
        const ka = E.se(t, sa + 0.3, sa + 1.1);
        if (ka > 0) E.layer(c, ka, c2 => {
          F.card(c2, 300, 770, 1320, 120, 881, { tint: PAL.light, tintA: 0.2 });
          F.stamp(c2, 420, 830, 'KANIT', 1, { color: F.GREEN, size: 36 });
          F.wfit(c2, 'Pencereyi kapat + perde kullan → gürültü azalır', 540, 848, E.seg(t, sa + 1, sa + 2.5), 44, 1040);
        });
      });
      if (aC > 0) E.layer(ctx, aC, c => {
        c.fillStyle = 'rgba(111,138,58,0.08)'; c.fillRect(0, 0, E.W, E.H);
        F.card(c, 260, 200, 1000, 620, 891);
        P.write(c, 'Saygı ve sorumluluk', 760, 300, E.seg(t, sp + 0.2, sp + 1.3), { size: 60, align: 'center', color: F.GREEN });
        ['Gereksiz korna çalma.', 'Gece müziğin sesini kıs.', 'Kulaklıkta sesi kıs.', 'Sessiz alanlara uy.'].forEach((s, i) => {
          const at = sp + 1 + i * 1.2, y = 420 + i * 100; P.check(c, 340, y - 20, 50, E.se(t, at + 0.5, at + 1), { w: 6, color: F.GREEN }); F.wfit(c, s, 400, y, E.seg(t, at, at + 1), 48, 800);
        });
        F.damla(c, t, { x: 1540, y: 860, s: 1.3, flip: true, expr: 'happy', look: [-0.6, -0.3], arms: [[-1, 0.4], [1, 2.4]] });
      });
    }
  });
})();

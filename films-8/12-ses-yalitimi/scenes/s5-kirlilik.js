// SAHNE 5 — Ses kirliliği: tanım, insana olumsuz etkiler (işitme kaybı dâhil), hayvanlara etkisi, problem tanımı (FB.8.4.6 a)
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const F = S8;
  E.scene({
    name: 'Ses kirliliği', concept: 'Ses kirliliği ve canlılara etkisi', from: 'noise', to: 'problem', trFrom: [960, 700],
    draw(ctx, t) {
      const sn = E.s('noise'), se = E.s('effects'), sa = E.s('animals'), sp = E.s('problem');
      const aA = Math.max(1 - E.se(t, se - 0.3, se + 0.5), E.se(t, sp - 0.3, sp + 0.5));
      const aB = Math.min(E.se(t, se - 0.3, se + 0.5), 1 - E.se(t, sa - 0.3, sa + 0.5));
      const aC = Math.min(E.se(t, sa - 0.3, sa + 0.5), 1 - E.se(t, sp - 0.3, sp + 0.5));
      if (aA > 0) E.layer(ctx, aA, c => {
        c.fillStyle = 'rgba(90,85,100,0.10)'; c.fillRect(0, 0, E.W, E.H);
        // okul
        const sc = [[1150, 780], [1150, 380], [1780, 380], [1780, 780]]; F.shape(c, sc, '#D9CBB0', 0.5, 801);
        F.fit(c, 'OKUL', 1465, 440, 300, 44);
        for (let i = 0; i < 4; i++) F.window(c, 1190 + i * 145, 490, 110, 110, t, 0.3);
        // yol + arabalar
        const road = [[0, 800], [E.W, 800], [E.W, 900], [0, 900]]; F.shape(c, road, '#5B5566', 0.4, 803);
        for (let i = 0; i < 8; i++) line(c, [60 + i * 240, 850], [160 + i * 240, 850], { w: 4, color: PAL.white, dry: false });
        [0, 1, 2].forEach(i => { const x = ((t * 130 + i * 420) % 1500) - 150; F.car(c, x, 840, 0.7, t); F.rings(c, x + 100, 790, t + i, { a0: -1.2, a1: -0.2, r0: 40, maxR: 200, gap: 40, speed: 120 }); });
        F.fit(c, 'korna · motor · fren', 520, 700, 500, 40, { color: F.AMB });
        const kd = E.se(t, sn + 4, sn + 4.8) * (1 - E.se(t, sp - 0.5, sp));
        if (kd > 0) E.layer(c, kd, c2 => { F.card(c2, 240, 190, 1000, 130, 805, { tint: PAL.light, tintA: 0.2 }); F.fit(c2, 'Ses kirliliği: gürültünün çevrede yaygınlaşması', 740, 272, 940, 42); });
        const kp = E.se(t, sp + 0.3, sp + 1.1);
        if (kp > 0) E.layer(c, kp, c2 => {
          F.card(c2, 200, 180, 1500, 170, 807, { tint: PAL.water, tintA: 0.14 });
          F.stamp(c2, 330, 265, 'PROBLEM', 1, { color: F.AMB, size: 36 });
          F.wfit(c2, 'Yol gürültüsü dersi nasıl etkiliyor?', 480, 245, E.seg(t, sp + 0.8, sp + 2), 46, 1150);
          F.wfit(c2, 'Nasıl azaltabiliriz?', 480, 310, E.seg(t, sp + 2, sp + 3), 46, 1150);
        });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        c.fillStyle = 'rgba(138,106,69,0.08)'; c.fillRect(0, 0, E.W, E.H);
        P.write(c, 'İnsanlara olumsuz etkileri', 960, 220, E.seg(t, se + 0.3, se + 1.4), { size: 58, align: 'center' });
        const cards = ['işitme kaybı', 'uykusuzluk', 'stres', 'dikkat dağınıklığı'];
        cards.forEach((n, i) => {
          const x = 330 + i * 420, k = E.se(t, se + 0.8 + i * 1.0, se + 1.5 + i * 1.0, 'out'); if (k <= 0) return;
          E.layer(c, k, c2 => {
            F.card(c2, x - 180, 300, 360, 440, 820 + i, i === 0 ? { color: F.RED } : {});
            if (i === 0) { F.ear(c2, x, 500, 1.3); F.vib(c2, x - 20, 480, t, { r0: 90, color: F.RED, side: -1 }); }
            if (i === 1) { const m = P.arc(x, 480, 70, -2.2, 2.2, 30).concat(P.arc(x + 30, 470, 60, 1.9, -1.9, 30).reverse()); F.shape(c2, m, PAL.light, 0.5, 830); INK.label(c2, 'z z', x + 70, 420, { size: 44, weight: 700 }); }
            if (i === 2) { stroke(c2, [[x - 90, 520], [x - 50, 440], [x - 10, 560], [x + 30, 430], [x + 70, 540], [x + 100, 470]], { w: 6, color: '#B5553F' }); }
            if (i === 3) { P.icon.books(c2, x, 510, 1.0); INK.label(c2, '?', x + 80, 440, { size: 70, weight: 700 }); }
            F.fit(c2, n, x, 680, 330, 40, { color: i === 0 ? F.RED : PAL.ink });
          });
        });
        F.fit(c, '⚠ Şiddetli sesler kulağa zarar verir.', 960, 840, 1200, 44, { color: F.RED, alpha: E.se(t, se + 4.5, se + 5.2) });
      });
      if (aC > 0) E.layer(ctx, aC, c => {
        const g = c.createLinearGradient(0, 520, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.35)'); g.addColorStop(1, 'rgba(46,106,140,0.6)');
        c.fillStyle = 'rgba(111,138,58,0.08)'; c.fillRect(0, 0, 960, E.H);
        c.fillStyle = g; c.fillRect(960, 520, 960, 560);
        line(c, [960, 180], [960, 900], { w: 2.4, dry: false, alpha: 0.5 });
        // kuşlar
        F.tree(c, 480, 860, 1.5, t, 0.2);
        F.bird(c, 380, 520, 1.2, t); F.bird(c, 640, 470, 1.1, t + 1);
        F.car(c, 230, 890, 0.8, t);
        F.rings(c, 310, 850, t, { a0: -1.6, a1: -0.9, r0: 60, maxR: 450, gap: 45, speed: 130 });
        F.fit(c, 'kuşlar birbirini duymakta zorlanır', 480, 250, 820, 40);
        // balina + gemi
        F.ship(c, 1450, 520, 0.9);
        F.whale(c, 1400, 780, 1.0, t);
        F.rings(c, 1450, 580, t, { a0: 0.4, a1: 2.7, r0: 40, maxR: 330, gap: 45, speed: 110 });
        F.fit(c, 'gemi gürültüsü balinaların', 1440, 250, 820, 40);
        F.fit(c, 'iletişimini bozar', 1440, 305, 820, 40);
      });
    }
  });
})();

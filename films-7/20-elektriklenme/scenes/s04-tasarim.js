// SAHNE 4 — Deney tasarımı: plan, malzemeler, kavanoz elektroskop (FB.7.6.2 a)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  E.scene({
    name: 'Deney tasarla', concept: 'Deney planı; elektroskop', from: 'design', to: 'elscope', trFrom: [1200, 400],
    draw(ctx, t) {
      const sd = E.s('design'), sm = E.s('materials'), se = E.s('elscope');
      const focus = E.se(t, se - 0.2, se + 1.0);
      // masa
      E.layer(ctx, 1 - focus, c => {
        stroke(c, [[480, 822], [1880, 818]], { w: 4, seed: 301 });
        c.save(); c.globalAlpha *= 0.25; c.fillStyle = '#8A6A45'; c.fillRect(480, 822, 1400, 30); c.restore();
      });
      F.damla(ctx, t, { x: 260, y: 880, s: 1.2, view: 'q3', expr: 'determined', look: [0.9, -0.3], prop: 'notebook', arms: [[-1, 0.5], [1, 1.3 + Math.sin(t * 8) * 0.1 * (t < sm ? 1 : 0)]] });
      // plan kartı
      E.layer(ctx, 1 - focus, c => {
        const k = E.se(t, sd + 0.2, sd + 0.8, 'out'); if (k <= 0) return;
        c.save(); c.globalAlpha *= k;
        F.card(c, 760, 170, 1020, 350, 311);
        F.wfit(c, 'Deney planım', 800, 240, E.seg(t, sd + 0.5, sd + 1.3), 56, 500, { color: F.AMB });
        F.wfit(c, 'Soru: Elektriklenme çeşitlerini nasıl gözlemlerim?', 800, 310, E.seg(t, sd + 1.2, sd + 2.6), 40, 940);
        ['1. sürtünme', '2. dokunma', '3. etki'].forEach((s, i) => F.wfit(c, s, 820 + i * 320, 420, E.seg(t, sd + 2.4 + i * 0.6, sd + 3.0 + i * 0.6), 46, 290));
        F.wfit(c, 'Her deneyde gözlem + kayıt', 820, 490, E.seg(t, sd + 4.0, sd + 4.8), 34, 800, { weight: 400 });
        c.restore();
        // malzemeler
        const items = [
          [0, 'balon', 690, () => { F.balloon(c, 680, 640, 50, F.HEAT, { strLen: 100 }); F.balloon(c, 790, 660, 46, PAL.water, { strLen: 90, seed: 2075 }); }],
          [1, 'yün kumaş', 1010, () => F.wool(c, 1010, 770, 200, 90)],
          [2, 'kâğıt parçaları', 1270, () => { for (let i = 0; i < 12; i++) F.bit(c, 1190 + (i % 6) * 32, 796 + Math.floor(i / 6) * 14, 1, i); }],
          [3, 'elektroskop', 1600, () => F.electroscope(c, 1600, 818, 0.52, 0)]
        ];
        items.forEach(([i, name, lx, draw]) => {
          const at = sm + 1.4 + i * 1.3, ki = E.se(t, at, at + 0.5, 'out'); if (ki <= 0) return;
          c.save(); c.globalAlpha *= ki; draw(); F.fit(c, name, lx, 900, 260, 34); c.restore();
        });
      });
      // elektroskop yakın plan
      if (focus > 0) E.layer(ctx, focus, c => {
        F.electroscope(c, 1000, 900, 1.05, 0, { labels: E.se(t, se + 0.8, se + 2.4) });
        // yüksüz / yüklü küçük karşılaştırma
        const km = E.se(t, se + 3.6, se + 4.4);
        if (km > 0) {
          c.save(); c.globalAlpha *= km;
          F.electroscope(c, 520, 890, 0.42, 0); F.fit(c, 'yüksüz: kapalı', 520, 650, 230, 34);
          F.electroscope(c, 760, 890, 0.42, 1); F.fit(c, 'yüklü: açık', 760, 650, 230, 34, { color: F.AMB });
          c.restore();
        }
      });
    }
  });
})();

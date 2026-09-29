// SAHNE 7 — Bulgular: yeterli su, dengeli beslenme, temizlik, hareket ve ekran süresi (hastalıklara girilmez)
(function () {
  const { PAL } = INK; const K = KIT, F = F11;
  const C = [['water', 'Yeterli su iç', 'atıklar idrarla kolay atılır', (c, x, y, t) => F.glass(c, x, y, 0.9, 0.5 + 0.3 * Math.sin(t))],
    ['food', 'Dengeli beslen', 'aşırı tuz, hazır yiyecek yorar', (c, x, y, t) => { F.shaker(c, x - 20, y, 0.8); P.cross(c, x - 20, y, 60, E.se(t, E.s('food') + 3, E.s('food') + 3.6), { color: K.RED, w: 10 }); }],
    ['hygiene', 'Temizliğe dikkat', 'idrarı tutma · el hijyeni', (c, x, y, t) => F.soap(c, x, y, 0.8, t)],
    ['active', 'Hareket et', 'ekran başında saatlerce kalma', (c, x, y, t) => { F.ball(c, x - 40, y + 30 - Math.abs(Math.sin(t * 3)) * 24, 40); F.screen(c, x + 55, y, 0.5); }]];
  E.scene({
    name: 'Bulgular', concept: 'Boşaltım sisteminin sağlığı için yapılması gerekenler', from: 'water', to: 'active', trFrom: [960, 500],
    draw(ctx, t) {
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.08)'); g.addColorStop(1, 'rgba(111,138,58,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const cur = C.map(c => c[0]).filter(id => t >= E.s(id)).pop();
      C.forEach(([id, h, l, ic], i) => { const s0 = E.s(id), k = E.se(t, s0 + 0.2, s0 + 0.9, 'out'); if (k <= 0) return;
        const x = 230 + (i % 2) * 740, y = 170 + Math.floor(i / 2) * 370, isCur = cur === id;
        E.layer(ctx, k, c => { K.card(c, x, y, 690, 330, { seed: 11700 + i, tint: isCur ? PAL.water : null, tintA: 0.1, w: isCur ? 3.6 : 2.4 });
          ic(c, x + 140, y + 170, t);
          K.text(c, (i + 1) + '. ' + h, x + 270, y + 110, { size: 44, color: '#1F4A63', maxW: 390 });
          const lw = K.wrap(c, l, 380, 36); lw.forEach((ln, j) => P.write(c, ln, x + 270, y + 180 + j * 50, E.seg(t, s0 + 1 + j * 0.8, s0 + 2 + j * 0.8), { size: 36 }));
          P.check(c, x + 630, y + 270, 40, E.se(t, s0 + 2.5, s0 + 3), { w: 6, color: K.LIFE_D }); }); });
      K.damla(ctx, t, { x: 1800, y: 905, s: 0.75, flip: true, expr: 'happy', look: [-0.7, -0.3], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();

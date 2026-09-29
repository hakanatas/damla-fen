// SAHNE 5 — İnsanlara ve doğaya faydası (OB8, D5.2) + gelecekte güneş enerjisi (özgün fikir üretme)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F614;
  function village(ctx, x0, t, solar, k) {
    const hill = [[x0, 800], [x0 + 860, 800]];
    [[x0 + 60, 250, 190], [x0 + 340, 220, 170], [x0 + 590, 230, 200]].forEach(([hx, w, h], i) => {
      const roof = F.house(ctx, hx, 800, w, h, { seed: i + (solar ? 10 : 0) });
      if (solar) {
        const a = roof[0], p = roof[1];
        const q = (f, g) => [a[0] + (p[0] - a[0]) * f, a[1] + (p[1] - a[1]) * f + g];
        F.panel(ctx, q(0.25, 0), q(0.7, 0), q(0.7, 18), q(0.25, 18), 1, 3, { seed: 20 + i });
      }
      F.chimney(ctx, hx + w - 50, 800 - h - 20, t + i, solar ? 0.15 : 1);
    });
    line(ctx, hill[0], hill[1], { w: 3, seed: 300 + (solar ? 1 : 0) });
  }
  E.scene({
    name: 'Gelecek', concept: 'Doğaya faydası ve gelecek fikirleri', from: 'nature', to: 'future', trFrom: [960, 540],
    draw(ctx, t) {
      const sn = E.s('nature'), sf = E.s('future');
      const toF = E.se(t, sf - 0.2, sf + 0.7);
      if (toF < 1) E.layer(ctx, 1 - toF, c => {
        // left: today — more fuel smoke; right: widespread solar — cleaner air
        c.save(); c.fillStyle = 'rgba(95,90,85,0.16)'; c.fillRect(80, 170, 870, 640); c.restore();
        c.save(); c.fillStyle = 'rgba(227,160,58,0.12)'; c.fillRect(970, 170, 870, 640); c.restore();
        village(c, 90, t, false, 1);
        const rk = E.se(t, sn + 0.8, sn + 1.8);
        E.layer(c, rk, c2 => village(c2, 980, t, true, rk));
        P.sun(c, 1700, 280, 55, t, { nrays: 14, cells: false });
        line(c, [960, 170], [960, 820], { w: 2.4, dry: false, seed: 310 });
        INK.label(c, 'çok yakıt yakılınca', 515, 230, { size: 40, weight: 700, align: 'center' });
        INK.label(c, 'güneş enerjisi yaygınlaşınca', 1350, 230, { size: 40, weight: 700, align: 'center', alpha: rk });
        E.inkText(c, 'daha çok duman', 515, 880, t, sn + 2.4, 1e9, { size: 42, align: 'center', color: '#5F5A55' });
        E.inkText(c, 'daha temiz hava', 1400, 880, t, sn + 3.4, 1e9, { size: 42, align: 'center', color: PAL.water });
      });
      if (toF > 0) E.layer(ctx, toF, c => {
        P.write(c, 'Gelecekte güneş enerjisi', 960, 250, E.seg(t, sf + 0.3, sf + 1.5), { size: 60, align: 'center' });
        const cards = [
          { x: 250, n: 'güneşle çalışan araçlar', d: cc => { F.car(cc, 460, 560, 1.2); } },
          { x: 760, n: 'panel kaplı çatılar', d: cc => { const r = F.house(cc, 870, 660, 200, 150, { seed: 40 }); const a = r[0], p = r[1]; const q = (f, g) => [a[0] + (p[0] - a[0]) * f, a[1] + (p[1] - a[1]) * f + g]; F.panel(cc, q(0.15, 0), q(0.85, 0), q(0.85, 24), q(0.15, 24), 1, 4, { seed: 41 }); } },
          { x: 1270, n: 'senin fikrin?', d: cc => { F.bulb(cc, 1470, 520, 2.0, 0.5 + 0.5 * Math.abs(Math.sin(t * 2))); INK.label(cc, '?', 1560, 470, { size: 90, weight: 700, color: '#8A4A10' }); } }
        ];
        cards.forEach((cd, i) => {
          const k = E.se(t, sf + 1.0 + i * 1.8, sf + 1.7 + i * 1.8, 'out'); if (k <= 0) return;
          c.save(); c.translate(cd.x + 200, 560); c.scale(P.pop(k), P.pop(k)); c.translate(-(cd.x + 200), -560);
          F.card(c, cd.x, 330, 400, 460, { seed: 320 + i, color: i === 2 ? F.AMB : PAL.ink, w: i === 2 ? 3.4 : 2.6 });
          cd.d(c);
          INK.label(c, cd.n, cd.x + 200, 750, { size: 36, weight: 700, align: 'center' });
          c.restore();
        });
      });
    }
  });
})();

// SAHNE 2 — Günlük yaşamda ısı akışını yavaşlatan örnekler (TYMM FB.5.5.6 uygulaması); yalıtım ısı/soğuk üretmez
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F21;
  function blocked(ctx, a, b, k, col) { // arrow that stops at a wall (dashed end)
    const m = [a[0] + (b[0] - a[0]) * 0.6, a[1] + (b[1] - a[1]) * 0.6];
    P.arrow(ctx, a, m, k, { w: 4, color: col, head: 12 });
  }
  E.scene({
    name: 'Günlük örnekler', concept: 'Isı akışını yavaşlatan örnekler', from: 'examples', to: 'notheat', trFrom: [960, 400],
    draw(ctx, t) {
      const se = E.s('examples'), st = E.s('thermos'), sn = E.s('notheat');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      const cards = [
        { x: 400, lab: 'termos', at: se + 0.5, draw: c => F.thermos(c, 400, 370, 1.0, null) },
        { x: 960, lab: 'mont', at: se + 1.8, draw: c => F.coat(c, 960, 370, 1.05) },
        { x: 1520, lab: 'kabarık tüyler', at: se + 3.4, draw: c => F.bird(c, 1520, 370, 1.3, t) }
      ];
      cards.forEach((cd, i) => {
        const k = E.se(t, cd.at, cd.at + 0.6, 'out'); if (k <= 0) return;
        const dim = (t > st && i !== 0 && t < sn) || (t > sn && i !== 1) ? 0.45 : 1;
        E.layer(ctx, dim, c => {
          c.save(); c.translate(cd.x, 380); c.scale(P.pop(k), P.pop(k)); c.translate(-cd.x, -380);
          F.card(c, cd.x - 220, 170, 440, 420, { seed: 4300 + i });
          cd.draw(c);
          INK.label(c, cd.lab, cd.x, 560, { size: 42, weight: 700, align: 'center', rot: 0 });
          c.restore();
        });
      });
      // thermos: tea stays hot, ayran stays cold
      const tk = E.se(t, st + 0.3, st + 1.0) * (1 - E.se(t, sn - 0.3, sn + 0.3));
      if (tk > 0) E.layer(ctx, tk, c => {
        F.card(c, 180, 630, 1060, 260, { seed: 4310, fill: '#FBF6E8' });
        F.thermos(c, 300, 745, 0.6, '#C8661E'); F.thermos(c, 760, 745, 0.6, '#F4F1EA');
        const a = E.se(t, st + 1.2, st + 2.2);
        for (let i = 0; i < 3; i++) { blocked(c, [300, 700 + i * 34], [440, 700 + i * 34], a, F.HEAT); }
        for (let i = 0; i < 3; i++) { blocked(c, [910, 700 + i * 34], [770, 700 + i * 34], a, F.HEAT); }
        P.write(c, 'çay sıcak kalır', 400, 745, E.seg(t, st + 2, st + 3), { size: 38 });
        P.write(c, 'ayran soğuk kalır', 930, 745, E.seg(t, st + 3, st + 4), { size: 38 });
        P.write(c, 'ısı içeri de dışarı da yavaş geçer', 710, 868, E.seg(t, st + 4.5, st + 6), { size: 34, align: 'center', color: '#8A4A10' });
      });
      // coat: no heat produced, loss slowed
      const nk = E.se(t, sn + 0.3, sn + 1.0);
      if (nk > 0) E.layer(ctx, nk, c => {
        F.card(c, 480, 640, 960, 240, { seed: 4320, fill: '#FBF6E8' });
        P.cross(c, 560, 715, 22, E.se(t, sn + 0.8, sn + 1.3), { w: 6, color: F.RED });
        P.write(c, 'Mont ısı üretir.', 610, 730, E.seg(t, sn + 0.8, sn + 1.8), { size: 44 });
        INK.label(c, 'YANLIŞ', 1000, 730, { size: 40, weight: 700, color: F.RED, alpha: E.se(t, sn + 1.8, sn + 2.3), rot: -0.06 });
        P.check(c, 560, 800, 44, E.se(t, sn + 2.6, sn + 3.2), { w: 6 });
        P.write(c, 'Mont, vücut ısısının kaçmasını yavaşlatır.', 610, 830, E.seg(t, sn + 2.6, sn + 4.2), { size: 44 });
      });
      DAMLA.draw(ctx, { x: 1760, y: 930, s: 0.9, view: 'q3', flip: true, t, seed: 2, blink: E.blink(t, 6), squash: E.breath(t), talk: E.talk(t), expr: t > sn ? 'determined' : 'curious', look: [-0.8, -0.4], arms: [[-1, 0.35], [1, 2.2 + Math.sin(t * 2) * 0.1]] });
    }
  });
})();

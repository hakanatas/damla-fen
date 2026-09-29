// SAHNE 4 — Bilgiyi doğrula (c): iddia → kaynaklar → üç tüplük paslanma kanıtı
(function () {
  const { PAL, stroke, line, circlePts, rng } = INK;
  const U = U5;
  function tube(ctx, x, top, h, o, t) {
    const w = 90, by = top + h;
    const body = [[x - w / 2, top], [x - w / 2, by - 40]].concat(P.arc(x, by - 40, w / 2, Math.PI, 0, 20)).concat([[x + w / 2, top]]);
    if (o.water) { const wy = top + h * (o.full ? 0.15 : 0.55); ctx.save(); P.path(ctx, body); ctx.clip(); ctx.fillStyle = 'rgba(46,106,140,0.25)'; ctx.fillRect(x - w, wy, 2 * w, h); if (o.oil) { ctx.fillStyle = 'rgba(214,176,52,0.6)'; ctx.fillRect(x - w, wy - 22, 2 * w, 22); } ctx.restore(); }
    if (o.dry) { const r = rng(2201); ctx.save(); ctx.fillStyle = '#F4F1EA'; for (let i = 0; i < 30; i++) { ctx.beginPath(); ctx.arc(x - 35 + r() * 70, by - 20 - r() * 40, 5, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(28,27,34,0.4)'; ctx.stroke(); } ctx.restore(); }
    U.nail(ctx, x, top + h * 0.45, 0.9, o.rust, Math.PI / 2);
    stroke(ctx, body, { w: 3, seed: 2202 });
    if (o.stopper) P.fillPts(ctx, U.rect(x - w / 2 - 6, top - 30, x + w / 2 + 6, top + 4), '#8A6A45', 0.9);
  }
  E.scene({
    name: 'Doğrula', concept: 'Bilgiyi kaynaklarla doğrulama', from: 'verify', to: 'fact', trFrom: [960, 450],
    draw(ctx, t) {
      const sv = E.s('verify'), sc = E.s('check'), sf = E.s('fact');
      // web sayfası kartı
      const wk = E.se(t, sv + 0.3, sv + 1.0);
      const toTop = E.se(t, sf - 0.2, sf + 0.8);
      E.layer(ctx, wk, c => {
        const y0 = E.lerp(260, 170, toTop), sc2 = E.lerp(1, 0.8, toTop);
        c.save(); c.translate(960, y0); c.scale(sc2, sc2); c.translate(-960, -y0);
        U.card(c, 460, y0, 1000, 200, { seed: 2210 });
        P.fillPts(c, U.rect(462, y0 + 2, 1458, y0 + 44), '#D9CDB4', 0.9);
        [0, 1, 2].forEach(i => P.fillPts(c, circlePts(490 + i * 28, y0 + 22, 8, 8, 12), '#8A8378'));
        U.txt(c, 'www.bir-site…', 600, y0 + 34, { size: 28, alpha: 0.6 });
        P.write(c, '“Demir yalnızca suda paslanır.”', 960, y0 + 130, E.seg(t, sv + 2.2, sv + 4.0), { size: 54, align: 'center' });
        const xk = E.se(t, sf + 4.0, sf + 4.8);
        if (xk > 0) { c.save(); c.globalAlpha *= xk; line(c, [560, y0 + 112], [1360, y0 + 116], { w: 5, color: U.RED, dry: false }); c.restore(); U.txt(c, 'YANLIŞ', 1390, y0 + 190, { size: 44, color: U.RED, alpha: xk, align: 'right' }); }
        c.restore();
      });
      // kaynaklar (check)
      const ck = Math.min(E.se(t, sc + 0.2, sc + 0.8), 1 - E.se(t, sf - 0.3, sf + 0.3));
      if (ck > 0) E.layer(ctx, ck, c => {
        const src = [['ders kitabı', (cc, x, y) => P.icon.books(cc, x, y, 1)], ['öğretmenim', (cc, x, y) => DAMLA.draw(cc, { x, y: y + 90, s: 0.75, view: 'front', expr: 'happy', t, seed: 7, arms: [[-1, 0.4], [1, 2.2]] })], ['arkadaşlarım', (cc, x, y) => { DAMLA.draw(cc, { x: x - 55, y: y + 90, s: 0.6, view: 'q3', expr: 'curious', t, seed: 8, arms: [[-1, 0.4], [1, 0.4]] }); DAMLA.draw(cc, { x: x + 55, y: y + 90, s: 0.6, view: 'q3', flip: true, expr: 'thinking', t, seed: 9, arms: [[-1, 0.4], [1, 0.4]] }); }]];
        src.forEach(([nm, ic], i) => {
          const x = 560 + i * 400, k = E.se(t, sc + 0.6 + i * 1.3, sc + 1.2 + i * 1.3, 'out'); if (k <= 0) return;
          E.layer(c, k, cc => { ic(cc, x, 620); U.txt(cc, nm, x, 800, { size: 42, align: 'center' }); P.check(cc, x + 120, 560, 40, E.se(t, sc + 1.2 + i * 1.3, sc + 1.6 + i * 1.3), { w: 5, color: PAL.life }); });
        });
      });
      // kanıt: üç tüp
      const fk = E.se(t, sf + 0.4, sf + 1.1);
      if (fk > 0) E.layer(ctx, fk, c => {
        const rust = E.se(t, sf + 1.4, sf + 3.6);
        const T = [[560, 'kuru hava', 'çok yavaş', { dry: 1, stopper: 1, rust: 0.05 * rust }], [960, 'havası alınmış su', 'çok yavaş', { water: 1, full: 1, oil: 1, stopper: 1, rust: 0.08 * rust }], [1360, 'su + hava', 'paslanır', { water: 1, rust: rust }]];
        T.forEach(([x, a, b, o], i) => {
          tube(c, x, 460, 320, o, t);
          U.txt(c, a, x, 830, { size: 36, align: 'center' });
          U.txt(c, b, x, 878, { size: 38, align: 'center', color: i === 2 ? U.HEAT : PAL.water, alpha: E.se(t, sf + 3.0 + i * 0.3, sf + 3.6 + i * 0.3) });
        });
        U.txt(c, 'Demir, su ve oksijen birlikte olunca paslanır.', 960, 395, { size: 38, align: 'center', color: U.AMBER, alpha: E.se(t, sf + 3.8, sf + 4.6) });
      });
      U.damla(ctx, t, { x: 1790, y: 900, s: 0.85, view: 'q3', flip: true, expr: t > sf + 4 ? 'determined' : 'thinking', look: [-0.8, -0.3], arms: [[-1, 1.3], [1, 0.4]], prop: 'lens' });
    }
  });
})();

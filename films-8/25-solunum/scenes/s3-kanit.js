// SAHNE 3 — Kanıt: soluk verilen havada CO₂ → kireç suyu bulanır (kontrol tüpü berrak kalır). Güvenlik kartı. (FB.8.7.3 a: inceleme)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  // deney tüpü: (x) merkez, üst y0, alt y1; milk 0..1 bulanıklık
  function tube(ctx, x, y0, y1, milk, t, bubbles, t0) {
    const w = 110;
    const liq = [[x - w / 2 + 5, y0 + 80], [x + w / 2 - 5, y0 + 80], [x + w / 2 - 5, y1 - w / 2], ...P.arc(x, y1 - w / 2, w / 2 - 5, 0, Math.PI, 16).slice(1), [x - w / 2 + 5, y0 + 80]];
    P.fillPts(ctx, liq, '#E4EEF2', 0.9);
    if (milk > 0) P.fillPts(ctx, liq, '#EFECE4', milk), INK.wash(ctx, liq, '#A8A298', 0.6 * milk, 5301, { bleed: 1, blooms: 0 });
    line(ctx, [x - w / 2 + 6, y0 + 80], [x + w / 2 - 6, y0 + 80], { w: 1.6, color: PAL.water, dry: false, alpha: 0.7 });
    stroke(ctx, [[x - w / 2, y0], [x - w / 2, y1 - w / 2], ...P.arc(x, y1 - w / 2, w / 2, Math.PI, 0, 20).reverse(), [x + w / 2, y1 - w / 2], [x + w / 2, y0]].map((p, i, a) => p), { w: 3, dry: false, seed: 5302 });
    if (bubbles) U.bubbles(ctx, x + 10, y1 - 60, y0 + 90, t, t0, 4, { speed: 160 });
  }
  E.scene({
    name: 'Kanıt: kireç suyu', concept: 'Soluk verilen havada CO₂ vardır', from: 'evid', to: 'lime', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('evid'), ss = E.s('safety'), sl = E.s('lime');
      line(ctx, [150, 860], [1780, 860], { w: 4, seed: 5310 });
      // tüp sehpası
      stroke(ctx, U.rr(820, 700, 640, 40, 8, 3), { w: 3, closed: true, dry: false, seed: 5311 }); line(ctx, [850, 740], [850, 860], { w: 4, dry: false }); line(ctx, [1430, 740], [1430, 860], { w: 4, dry: false });
      const blow = t > sl + 0.4;
      const milk = E.se(t, sl + 1.0, sl + 3.2);
      tube(ctx, 960, 380, 820, milk, t, blow, sl + 0.4);
      tube(ctx, 1320, 380, 820, 0, t, false, 0);
      P.write(ctx, 'A · üflenen', 960, 330, E.seg(t, se + 1.0, se + 1.8), { size: 38, align: 'center' });
      P.write(ctx, 'B · kontrol', 1320, 330, E.seg(t, se + 1.4, se + 2.2), { size: 38, align: 'center' });
      P.write(ctx, 'kireç suyu (berrak)', 1140, 250, E.seg(t, se + 2.0, se + 3.2), { size: 42, align: 'center', color: PAL.water });
      // Ela ve pipet
      U.kid(ctx, 480, 688, 1.15, { hair: 'long', shirt: U.HEAT, expr: blow ? 'o' : 'smile', seed: 2 });
      const kp = E.se(t, se + 3.0, se + 3.8);
      if (kp > 0) { ctx.save(); ctx.globalAlpha *= kp; stroke(ctx, [[500, 652], [720, 575], [950, 560], [968, 580], [968, 790]], { w: 7, color: '#E3C27A', dry: false, taper: 0 }); stroke(ctx, [[500, 652], [720, 575], [950, 560], [968, 580], [968, 790]], { w: 1.6, dry: false, alpha: 0.7 }); ctx.restore(); }
      // güvenlik gözlüğü
      if (kp > 0) { ctx.save(); ctx.globalAlpha *= kp; stroke(ctx, U.rr(410, 603, 140, 36, 14, 3), { w: 3, closed: true, color: '#3F6FB0', dry: false }); ctx.restore(); }
      if (blow) { const u = (t * 1.2) % 1; ctx.save(); ctx.globalAlpha *= 0.7 * (1 - u); for (let j = 0; j < 3; j++) INK.inkDot(ctx, 560 + u * 120 + j * 22, 630 - j * 6, 3, { color: '110,106,100' }); ctx.restore(); }
      // sonuç
      const kr = E.se(t, sl + 2.6, sl + 3.4);
      if (kr > 0) {
        P.write(ctx, 'bulandı!', 960, 908, kr, { size: 44, align: 'center', color: '#4A4640' });
        P.write(ctx, 'berrak kaldı', 1320, 908, kr, { size: 40, align: 'center', color: PAL.water });
        U.card(ctx, 1500, 380, 360, 200, 5320, { tint: '#6E6A64', tintA: 0.1 });
        U.rich(ctx, 'soluk verilen', 1680, 450, E.seg(t, sl + 3.3, sl + 4.1), { size: 36, align: 'center' });
        U.rich(ctx, 'havada CO_2 var', 1680, 505, E.seg(t, sl + 3.9, sl + 4.8), { size: 40, align: 'center', color: '#4A4640' });
      }
      U.damla(ctx, t, { x: 1640, y: 860, s: 0.8, flip: true, expr: kr > 0.5 ? 'happy' : 'curious', look: [-0.7, -0.3], arms: [[-1, 0.4], [1, 0.5]] });
      U.safety(ctx, t, ss, E.e('safety') + 0.2, ['Dikkat!', 'Kireç suyu içilmez; pipetle yalnızca üflenir.', 'Gözlük tak, yetişkin eşliğinde çalış.'], { x: 360, y: 230, w: 1200 });
    }
  });
})();

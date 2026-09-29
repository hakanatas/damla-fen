// SAHNE 1 — Merak · beyin fırtınası: hangi özellik farklarından yararlanırız? · bilinen yöntemler (eleme, süzme, mıknatıs)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  window.F19 = {
    damla(ctx, t, o) { DAMLA.draw(ctx, Object.assign({ view: 'q3', expr: 'neutral', look: [0.3, 0], blink: E.blink(t, o.seed ?? 5), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 0.35]] }, o)); }
  };
  const PROPS = [
    ['tanecik boyutu', (c, x, y) => { P.fillPts(c, circlePts(x - 30, y, 24, 24, 20), '#C9A56A'); stroke(c, circlePts(x - 30, y, 24, 24, 20), { w: 2, closed: true, dry: false }); for (let i = 0; i < 6; i++) { P.fillPts(c, circlePts(x + 16 + (i % 3) * 14, y - 8 + Math.floor(i / 3) * 16, 5, 5, 10), '#F3EBD8'); stroke(c, circlePts(x + 16 + (i % 3) * 14, y - 8 + Math.floor(i / 3) * 16, 5, 5, 10), { w: 1.2, closed: true, dry: false }); } }],
    ['çözünürlük', (c, x, y, t) => K.beaker(c, x, y + 40, 80, 90, { level: 0.6, t, seed: 3, grains: 0.3 })],
    ['yoğunluk', (c, x, y, t) => K.beaker(c, x, y + 40, 80, 90, { level: 0.7, t, seed: 4, oil: 0.35 })],
    ['erime ve kaynama noktası', (c, x, y) => { const b = [[x - 7, y - 40], [x + 7, y - 40], [x + 7, y + 14], [x - 7, y + 14]]; stroke(c, b.concat([b[0]]), { w: 2.4, closed: true }); P.fillPts(c, circlePts(x, y + 26, 13, 13, 20), K.HEAT, 0.85); stroke(c, circlePts(x, y + 26, 13, 13, 20), { w: 2.4, closed: true }); P.fillPts(c, [[x - 3, y - 26], [x + 3, y - 26], [x + 3, y + 14], [x - 3, y + 14]], K.HEAT, 0.85); }]
  ];
  E.scene({
    name: 'Merak', concept: 'Beyin fırtınası: özellik farkları', from: 'title', to: 'known',
    draw(ctx, t) {
      const sh = E.s('hello'), sb = E.s('brain'), sp = E.s('props'), sk = E.s('known');
      K.bench(ctx, -40, 1960, 860, 7001);
      // karışım beherleri (merak)
      const bA = Math.min(E.se(t, sh + 0.4, sh + 1.2), 1 - E.se(t, sb + 0.2, sb + 0.9));
      if (bA > 0) E.layer(ctx, bA, c => {
        [[1000, { sand: 0.5 }], [1250, { grains: 0.2, tint: ['#E8DFC4', 0.1] }], [1500, { oil: 0.3 }], [1750, { cloud: 0.3, sand: 0.2 }]].forEach(([x, o], i) => K.beaker(c, x, 860, 190, 230, Object.assign({ level: 0.62, t, seed: 10 + i }, o)));
        INK.label(c, 'bileşenlerine ayrılabilir mi?', 1370, 520, { size: 52, weight: 700, align: 'center', color: K.AMBER, alpha: E.se(t, sh + 2.4, sh + 3.2) });
      });
      // özellik kartları
      const pA = Math.min(E.se(t, sb + 0.8, sb + 1.4), 1 - E.se(t, sk - 0.2, sk + 0.5));
      if (pA > 0) E.layer(ctx, pA, c => {
        P.write(c, 'Maddeler neyle farklı?', 1330, 230, E.seg(t, sb + 1.0, sb + 2.2), { size: 56, align: 'center' });
        PROPS.forEach(([n, f], i) => {
          const at = sp + 0.5 + i * 1.3, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 850 + (i % 2) * 480, y = 380 + Math.floor(i / 2) * 200;
          E.layer(c, k, c2 => { K.card(c2, x, y - 70, 450, 150, { seed: 7010 + i }); f(c2, x + 70, y, t); if (n.length > 16) { INK.label(c2, 'erime ve', x + 130, y - 6, { size: 36, weight: 700 }); INK.label(c2, 'kaynama noktası', x + 130, y + 36, { size: 36, weight: 700 }); } else INK.label(c2, n, x + 140, y + 14, { size: 40, weight: 700 }); });
        });
        P.write(c, '→ bu farklardan yararlanırız', 1330, 800, E.seg(t, sp + 6.2, sp + 7.4), { size: 46, align: 'center', color: K.AMBER });
      });
      // bilinen yöntemler
      const kA = E.se(t, sk + 0.3, sk + 1.0);
      if (kA > 0) E.layer(ctx, kA, c => {
        K.sieve(c, 1000, 560, 230, t); K.funnel(c, 1350, 440, 0.9, {}); K.magnet(c, 1680, 520, 1.1);
        [['eleme', 1000], ['süzme', 1350], ['mıknatısla ayırma', 1680]].forEach(([n, x], i) => INK.label(c, n, x, 760, { size: 44, weight: 700, align: 'center', alpha: E.se(t, sk + 0.8 + i * 0.5, sk + 1.3 + i * 0.5) }));
        P.write(c, 'bunları biliyoruz ✓', 1340, 290, E.seg(t, sk + 2.4, sk + 3.4), { size: 50, align: 'center', color: PAL.water });
      });
      F19.damla(ctx, t, { x: 430, y: 860, s: 1.4, look: [0.8, -0.2], expr: t > sb && t < sk ? 'thinking' : (t > sh ? 'happy' : 'neutral'),
        arms: t > sh && t < sh + 2 ? [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 8)]] : (t > sb && t < sk ? [[-1, 0.35], [1, [30, -86]]] : [[-1, 0.35], [1, 1.2]]) });
      K.title(ctx, t, '19 · Karışımları Ayırma', 5);
    }
  });
})();

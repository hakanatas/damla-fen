// SAHNE 3 — Cetvel deneyi: bağımsız değişken taşan uzunluk; sabit: cetvel, vuruş; gözlenen: titreşim hızı ve ses (ince/kalın)
// FB.8.4.3 a) deney tasarlar · b) ölçme ve veri analizi yapar
(function () {
  const { PAL, stroke, line } = INK; const F = S8;
  const ROWS = [['uzun', 'yavaş', 'kalın'], ['orta', 'orta', 'orta'], ['kısa', 'hızlı', 'ince']];
  E.scene({
    name: 'Cetvel deneyi', concept: 'Titreşim hızı ↔ ince/kalın ses', from: 'design', to: 'data', trFrom: [500, 600],
    draw(ctx, t) {
      const sd = E.s('design'), sl = E.s('long'), ss = E.s('short'), sa = E.s('data');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      // taşan uzunluk: tasarımda uzun, sonra orta → kısa
      const kS = E.se(t, ss + 0.2, ss + 1.2), kS2 = E.se(t, ss + 3.2, ss + 4.2);
      const over = E.lerp(E.lerp(330, 230, kS), 150, kS2);
      const fq = E.lerp(E.lerp(2.2, 3.8, kS), 6.5, kS2);
      const hits = [sl + 0.6, sl + 3.6, ss + 1.4, ss + 4.4, sa + 0.5];
      let amp = 0; hits.forEach(h => { if (t > h) amp = Math.max(amp, 40 * Math.exp(-(t - h) * 0.7)); });
      if (t > sd + 1.5 && t < sl) amp = 0;
      F.desk(ctx, 80, 520, 600, { legH: 260 });
      const tip = F.ruler(ctx, 520, 600, over, t, amp * (over / 330), { fq, inLen: 330 });
      if (amp > 3) F.rings(ctx, tip[0] + 10, 588, t, { a0: -0.8, a1: 0.8, r0: 30, maxR: 200, gap: 110 / fq * 2, speed: 90, alpha: Math.min(1, amp / 25) });
      // taşan kısım ölçüsü
      line(ctx, [520, 660], [520 + over, 660], { w: 2, dry: false, color: F.AMB }); INK.arrowHead(ctx, [530, 660], [520, 660], 10, { w: 2, color: F.AMB }); INK.arrowHead(ctx, [510 + over, 660], [520 + over, 660], 10, { w: 2, color: F.AMB });
      F.fit(ctx, 'taşan kısım', 520 + over / 2, 700, 280, 32, { color: F.AMB });
      // titreşim grafiği
      if (t > sl) {
        const cyc = Math.round(fq * 1.4);
        F.graph(ctx, 120, 760, 620, 130, cyc, 36, 1, { seed: 141 });
        F.fit(ctx, fq < 3 ? 'yavaş titreşim' : fq < 5 ? 'orta' : 'hızlı titreşim', 430, 745, 400, 34, { alpha: 0.8 });
      }
      // değişkenler kartı
      const kv = E.se(t, sd + 0.4, sd + 1.2);
      if (kv > 0) E.layer(ctx, kv, c => {
        F.card(c, 1060, 170, 760, 250, 151);
        const R = [['değiştirdiğim:', 'taşan kısmın uzunluğu', F.AMB], ['aynı kalan:', 'cetvel · vuruş şiddeti', PAL.water], ['gözlediğim:', 'titreşim · ince/kalın', PAL.ink]];
        R.forEach(([a, b, col], i) => { const y = 240 + i * 66, k = E.seg(t, sd + 0.9 + i * 1.0, sd + 1.9 + i * 1.0); P.write(c, a, 1095, y, k, { size: 36, weight: 400 }); F.wfit(c, b, 1340, y, k, 40, 460, { color: col }); });
      });
      const kH = E.se(t, sl + 0.3, sl + 1.1);
      F.table(ctx, 1080, 470, [['taşan kısım', 250], ['titreşim', 230], ['ses', 220]], ROWS, 76, kH, [E.se(t, sl + 3.4, sl + 4.2), E.se(t, ss + 2.2, ss + 3.0), E.se(t, ss + 5.2, ss + 6.0)], {
        size: 36, cellCol: (i, j) => j === 2 ? (i === 0 ? PAL.water : i === 2 ? F.AMB : null) : null
      });
      const kc = E.se(t, sa + 1.0, sa + 1.8);
      if (kc > 0) E.layer(ctx, kc, c => {
        F.card(c, 1060, 800, 780, 100, 161, { tint: PAL.light, tintA: 0.2 });
        F.fit(c, 'Titreşim hızlandıkça ses incelir.', 1450, 866, 730, 48);
      });
      F.damla(ctx, t, { x: 940, y: 890, s: 0.8, flip: t < sa, expr: t > sa ? 'happy' : 'curious', look: t < sa ? [0.8, -0.2] : [0.7, -0.3], arms: [[-1, 0.4], [1, 2.1]] });
    }
  });
})();

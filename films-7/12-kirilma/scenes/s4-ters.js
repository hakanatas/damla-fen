// SAHNE 4 — Sudan havaya: çok yoğun → az yoğun ortamda ışık normalden uzaklaşır
// Gelme açısı 30° (sınır açısının çok altında; tam yansıma durumuna girilmez). Kırılan ışın V.refract (1,33 → 1,00).
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F712, V = F.V, DEG = F.DEG;
  const WS = 520, O = [880, WS], TH = 30 * DEG, R = 290;
  const S = [O[0] - R * Math.sin(TH), O[1] + R * Math.cos(TH)];
  const D = V.norm(V.sub(O, S));
  const RF = V.refract(D, [0, 1], F.N.su, F.N.hava);
  const END = V.add(O, V.mul(RF, 300)), STRAIGHT = V.add(O, V.mul(D, 300));
  const thI = Math.round(V.angle([0, 1], V.mul(D, -1)) / DEG), thR = Math.round(V.angle([0, -1], RF) / DEG);

  E.scene({
    name: 'Sudan havaya', concept: 'Çok yoğundan az yoğuna: normalden uzaklaşır', from: 'reverse', to: 'away', trFrom: [880, 520],
    draw(ctx, t) {
      const sr = E.s('reverse'), sa = E.s('away');
      F.medium(ctx, 260, 1460, WS, 880, 'su');
      INK.label(ctx, 'hava', 300, WS - 30, { size: 40, weight: 700, alpha: 0.8 });
      INK.label(ctx, 'su', 300, WS + 60, { size: 40, weight: 700, color: PAL.water });
      INK.label(ctx, '(az yoğun)', 390, WS - 30, { size: 30, alpha: 0.65 });
      INK.label(ctx, '(çok yoğun)', 350, WS + 60, { size: 30, alpha: 0.75, color: PAL.water });
      F.dline(ctx, [O[0], O[1] - 330], [O[0], O[1] + 340], { w: 3, color: PAL.water });
      INK.label(ctx, 'normal', O[0] + 16, O[1] - 300, { size: 38, color: PAL.water });
      F.lightbox(ctx, S[0], S[1], Math.atan2(D[1], D[0]), 0.7);
      INK.label(ctx, 'su geçirmez ışık kutusu', S[0] + 30, S[1] + 64, { size: 30, alpha: 0.75 });
      const k1 = E.se(t, sr + 1.0, sr + 2.2), k2 = E.se(t, sr + 2.2, sr + 3.4);
      F.ray(ctx, S, O, k1, { seed: 401 });
      F.ray(ctx, O, END, k2, { seed: 402 });
      const ka = E.se(t, sa + 0.3, sa + 1.2);
      if (ka > 0) {
        F.dline(ctx, O, F.at(O, STRAIGHT, ka), { color: PAL.ink, alpha: 0.45, w: 2.2 });
        E.inkText(ctx, 'düz gitseydi', STRAIGHT[0] + 12, STRAIGHT[1] - 12, t, sa + 1.0, 1e9, { size: 30, alpha: 0.7 });
        F.angleArc(ctx, O, [0, 1], V.mul(D, -1), 120, { k: ka, fill: PAL.water, fillA: 0.18, color: PAL.water, seed: 411 });
        F.angleArc(ctx, O, [0, -1], RF, 120, { k: E.se(t, sa + 1.0, sa + 2.0), fill: PAL.light, fillA: 0.25, color: '#8A4A10', seed: 412 });
        E.inkText(ctx, 'gelme ' + thI + '°', O[0] - 360, O[1] + 180, t, sa + 0.9, 1e9, { size: 36, color: PAL.water });
        E.inkText(ctx, 'kırılma ' + thR + '°', O[0] + 150, O[1] - 110, t, sa + 1.8, 1e9, { size: 36, color: '#8A4A10' });
      }
      // özet kartı
      const kc = E.se(t, sa + 2.4, sa + 3.1);
      if (kc > 0) E.layer(ctx, kc, c => {
        F.card(c, 1210, 170, 640, 200, { seed: 421 });
        P.write(c, 'hava → su: normale yaklaşır', 1240, 240, E.seg(t, sa + 2.6, sa + 3.8), { size: 38, color: PAL.water });
        P.write(c, 'su → hava: normalden uzaklaşır', 1240, 320, E.seg(t, sa + 3.6, sa + 4.9), { size: 38, color: '#8A4A10' });
      });
      DAMLA.draw(ctx, { x: 1700, y: 890, s: 1.0, view: 'q3', flip: true, expr: t > sa + 3 ? 'happy' : 'curious', look: [-0.9, -0.2], blink: E.blink(t, 21), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: [[-1, 0.35], [1, t > sa ? 2.1 : 0.35]] });
    }
  });
})();

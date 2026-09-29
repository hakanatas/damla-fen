// SAHNE 6 — Işık kaynağı döndürülür, iki açı iletkiyle ölçülür, veri seti tabloya kaydedilir (FB.6.4.2 a, b, c)
// Yansıyan ışın her karede vektörle hesaplanır; tablodaki sayılar ölçülen açıdan (V.angle) yazılır.
(function () {
  const { PAL, line, stroke, dashed, wash } = INK;
  const F = F611, V = F.V, DEG = Math.PI / 180;
  const O = [640, 780], N = [0, -1], R = 440;
  const TRIALS = [30, 45, 60];

  function thetaAt(t) { // derece
    const sm = E.s('measure'), sd = E.s('data');
    let th = 40;
    th = E.lerp(th, 30, E.se(t, sm + 1.5, sm + 3.2));
    th = E.lerp(th, 45, E.se(t, sd + 3.6, sd + 4.8));
    th = E.lerp(th, 60, E.se(t, sd + 7.0, sd + 8.2));
    return th;
  }
  // denemenin tabloya yazılma zamanı
  const rowAt = i => [E.s('data') + 0.8, E.s('data') + 5.0, E.s('data') + 8.4][i];

  E.scene({
    name: 'Ölçüm', concept: 'Gelme açısı = yansıma açısı', from: 'measure', to: 'sides', trFrom: [640, 780],
    draw(ctx, t) {
      const sm = E.s('measure'), se = E.s('equal'), ss = E.s('sides');
      // taraf gölgelendirme (sides)
      const sk = E.se(t, ss + 0.3, ss + 1.2);
      if (sk > 0) {
        ctx.save(); ctx.globalAlpha = 0.16 * sk; ctx.fillStyle = PAL.water; ctx.fillRect(170, 330, O[0] - 170, O[1] - 330); ctx.fillStyle = PAL.light; ctx.fillRect(O[0], 330, 1110 - O[0], O[1] - 330); ctx.restore();
        E.inkText(ctx, 'gelen ışın bu yanda', 190, 425, t, ss + 0.8, 1e9, { size: 34, color: PAL.water });
        E.inkText(ctx, 'yansıyan ışın bu yanda', 1095, 425, t, ss + 1.4, 1e9, { size: 34, color: '#8A4A10', align: 'right' });
      }
      F.mirror(ctx, 170, 1110, O[1]);
      F.protractor(ctx, O, 300, E.se(t, sm + 0.3, sm + 1.2));
      // normal
      const np = []; for (let i = 0; i <= 40; i++) np.push([O[0], O[1] - 400 * i / 40]);
      dashed(ctx, np, { w: sk > 0 ? 4 : 3, on: 14, off: 10, color: PAL.water });
      INK.label(ctx, 'normal', O[0] + 14, O[1] - 410, { size: 34, color: PAL.water, weight: 700 });
      // kaynak + ışınlar (hesaplanır)
      const th = thetaAt(t) * DEG;
      const S = [O[0] - R * Math.sin(th), O[1] - R * Math.cos(th)];
      const D = V.norm(V.sub(O, S)), RF = V.reflect(D, N), END = V.add(O, V.mul(RF, R));
      F.flashlight(ctx, S[0], S[1], Math.atan2(D[1], D[0]), 1.1, 1);
      F.ray(ctx, S, O, 1, { seed: 761, heads: [0.5] });
      F.ray(ctx, O, END, 1, { seed: 762, heads: [0.5] });
      const toS = V.norm(V.sub(S, O));
      F.angleArc(ctx, O, N, toS, 120, { fill: PAL.water, fillA: 0.2, color: PAL.water, seed: 763 });
      F.angleArc(ctx, O, N, RF, 120, { fill: PAL.light, fillA: 0.28, color: '#8A4A10', seed: 764 });
      const ai = Math.round(V.angle(N, toS) / DEG), ar = Math.round(V.angle(N, RF) / DEG);
      INK.label(ctx, ai + '°', O[0] - 60, O[1] - 140, { size: 34, weight: 700, align: 'center', color: PAL.water });
      INK.label(ctx, ar + '°', O[0] + 60, O[1] - 140, { size: 34, weight: 700, align: 'center', color: '#8A4A10' });
      // veri tablosu
      const ck = E.se(t, sm + 0.6, sm + 1.4);
      if (ck > 0) E.layer(ctx, ck, c => {
        F.card(c, 1150, 230, 640, 470, { seed: 765 });
        INK.label(c, 'Deneme', 1172, 300, { size: 30, weight: 700, color: '#8A4A10' });
        INK.label(c, 'Gelme açısı', 1330, 300, { size: 30, weight: 700, color: PAL.water });
        INK.label(c, 'Yansıma açısı', 1550, 300, { size: 30, weight: 700, color: '#8A4A10' });
        line(c, [1165, 322], [1775, 318], { w: 2.4, seed: 766 });
        [1310, 1530].forEach((x, i) => line(c, [x, 262], [x, 660], { w: 1.8, dry: false, seed: 767 + i }));
        TRIALS.forEach((d, i) => {
          const at = rowAt(i), y = 400 + i * 100;
          P.write(c, String(i + 1), 1225, y, E.seg(t, at, at + 0.4), { size: 44 });
          P.write(c, d + '°', 1395, y, E.seg(t, at + 0.2, at + 0.7), { size: 44, color: PAL.water });
          P.write(c, d + '°', 1625, y, E.seg(t, at + 0.7, at + 1.2), { size: 44, color: '#8A4A10' });
        });
      });
      // sonuç
      const ek = E.se(t, se + 0.2, se + 0.8);
      if (ek > 0) {
        const b = [[1150, 740], [1790, 734], [1796, 850], [1154, 856], [1150, 740]];
        ctx.save(); ctx.globalAlpha *= ek; P.fillPts(ctx, b, '#F6E7B8', 0.95); stroke(ctx, b, { w: 3, closed: true, color: F.AMB, seed: 768 }); ctx.restore();
        P.write(ctx, 'gelme açısı = yansıma açısı', 1472, 812, E.seg(t, se + 0.5, se + 2.0), { size: 46, align: 'center' });
      }
    }
  });
})();

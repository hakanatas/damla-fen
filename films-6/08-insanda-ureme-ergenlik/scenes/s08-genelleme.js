// SAHNE 8 — Örüntü → genelleme; tahminlere dönüş; saygı, empati, mahremiyet (FB.6.3.8 ç; D8, D14)
(function () {
  const { PAL, stroke, line } = INK; const K = KIT;
  const GX = 170, GY = 780, GW = 700, GH = 480;
  const X = age => GX + (age - 8) / 10 * GW;               // 8..18 yaş
  const curve = (mid, h0, h1) => { const p = []; for (let i = 0; i <= 60; i++) { const a = 8 + i / 60 * 10; const s = 1 / (1 + Math.exp(-(a - mid) * 1.3)); p.push([X(a), GY - (h0 + (a - 8) * 6 + s * h1)]); } return p; };
  const CURVES = [[11, 60, 250, PAL.light], [12.5, 50, 290, PAL.life], [14, 40, 320, PAL.water]];
  const CLAIMS = [['Ergenlik herkeste aynı yaşta başlar.', false], ['Sivilce yalnızca kirden çıkar.', false], ['Bu değişimler normaldir.', true]];
  E.scene({
    name: 'Genelleme', concept: 'Örüntü ve genelleme; yanlış bilgileri düzeltme; saygı', from: 'pattern', to: 'respect', trFrom: [520, 540],
    draw(ctx, t) {
      const sp = E.s('pattern'), sa = E.s('answers'), sr = E.s('respect');
      const gA = 1 - E.se(t, sr - 0.2, sr + 0.5);
      if (gA > 0) E.layer(ctx, gA, c => {
        stroke(c, [[GX, GY - GH], [GX, GY], [GX + GW + 20, GY]], { w: 3, seed: 7601 });
        P.fillPts(c, [[GX + GW + 30, GY], [GX + GW + 12, GY - 8], [GX + GW + 12, GY + 8]], PAL.ink);
        [8, 10, 12, 14, 16, 18].forEach(a => { line(c, [X(a), GY], [X(a), GY + 10], { w: 2, dry: false }); K.text(c, String(a), X(a), GY + 44, { size: 30, align: 'center', alpha: 0.8 }); });
        K.text(c, 'yaş', GX + GW / 2, GY + 88, { size: 32, alpha: 0.8, align: 'center' });
        K.text(c, 'boy', GX - 20, GY - GH - 16, { size: 34, alpha: 0.8 });
        CURVES.forEach(([mid, h0, h1, col], i) => { const k = E.se(t, sp + 0.6 + i * 1.3, sp + 2.0 + i * 1.3); if (k > 0) P.drawOn(c, curve(mid, h0, h1), k, { w: 4.5, color: col, seed: 7610 + i }); if (k > 0.95) INK.inkDot(c, X(mid), GY - (h0 + (mid - 8) * 6 + h1 / 2), 6); });
        K.text(c, 'hızlı büyüme herkeste farklı zamanda', GX + GW / 2 + 20, 230, { size: 34, align: 'center', alpha: E.se(t, sp + 4.4, sp + 5.0) });
        INK.label(c, 'temsilî grafik', GX + GW, GY - GH + 10, { size: 26, align: 'right', alpha: 0.5 });
      });
      // genelleme kartı
      const ck = E.se(t, sp + 1.0, sp + 1.8, 'out') * (1 - E.se(t, sa - 0.2, sa + 0.4));
      if (ck > 0) E.layer(ctx, ck, c => {
        K.card(c, 1010, 290, 800, 420, { seed: 7620, tint: PAL.life, tintA: 0.12 });
        K.text(c, 'Genelleme', 1060, 370, { size: 48, color: K.LIFE_D });
        ['Ergenlik herkeste olur;', 'ama başlama zamanı ve hızı', 'kişiden kişiye değişir.'].forEach((l, i) => P.write(c, l, 1060, 460 + i * 70, E.seg(t, sp + 2 + i * 1.3, sp + 3.3 + i * 1.3), { size: 46 }));
      });
      // tahminlere dönüş
      const ak = E.se(t, sa, sa + 0.6) * (1 - E.se(t, sr - 0.2, sr + 0.5));
      if (ak > 0) E.layer(ctx, ak, c => CLAIMS.forEach(([s, ok], i) => {
        const y = 300 + i * 160, at = sa + 0.6 + i * 2.2;
        K.node(c, s, 1360, y, E.se(t, at, at + 0.5, 'out'), { size: 38, w: 780, h: 110, seed: 20 + i });
        if (ok) P.check(c, 1800, y - 10, 70, E.se(t, at + 0.8, at + 1.4), { w: 9, color: K.LIFE_D });
        else P.cross(c, 1800, y, 34, E.se(t, at + 0.8, at + 1.4), { w: 8, color: K.RED });
      }));
      // saygı
      const rk = E.se(t, sr, sr + 0.7, 'out');
      if (rk > 0) E.layer(ctx, rk, c => {
        ['Saygı', 'Empati', 'Mahremiyet'].forEach((w, i) => K.node(c, w, 420 + i * 440, 330, E.se(t, sr + 0.3 + i * 0.7, sr + 0.9 + i * 0.7, 'out'), { size: 54, tint: [PAL.light, PAL.life, PAL.water][i], seed: 30 + i }));
        P.write(c, 'Farklılıklarla alay edilmez.', 280, 520, E.seg(t, sr + 1.5, sr + 2.8), { size: 50 });
        P.write(c, 'Herkesin bedeni kendine özeldir.', 280, 610, E.seg(t, sr + 2.8, sr + 4.1), { size: 50 });
      });
      K.damla(ctx, t, { x: t < sr ? 1000 : 1560, y: 905, s: 0.85, expr: t > sr ? 'happy' : 'curious', look: [t < sa ? -0.7 : 0.7, -0.4], arms: [[-1, 0.4], [1, t > sr ? 2.6 : 0.5]] });
    }
  });
})();

// SAHNE 6 — Fanus deneyi: hava boşaltıldıkça çekiç titreşse de ses duyulmaz → maddesel ortam gerekir, ses boşlukta yayılmaz.
// Uzay: madde eser düzeyde → Güneş'teki patlamaların sesi ulaşmaz (ışık ulaşır). FB.8.4.2 (TYMM vurgusu)
(function () {
  const { PAL, stroke, line, circlePts, wash, dashed } = INK; const F = S8;
  E.scene({
    name: 'Boşluk', concept: 'Ses boşlukta yayılmaz', from: 'jar', to: 'sun', trFrom: [760, 600],
    draw(ctx, t) {
      const sj = E.s('jar'), sf = E.s('fade'), sn = E.s('need'), ss = E.s('sun');
      const aA = 1 - E.se(t, ss - 0.3, ss + 0.6), aB = E.se(t, ss - 0.3, ss + 0.6);
      if (aA > 0) E.layer(ctx, aA, c => {
        c.fillStyle = 'rgba(138,106,69,0.10)'; c.fillRect(0, 0, E.W, E.H);
        const air = 1 - 0.97 * E.se(t, sj + 3, sf + 5);
        const jx = 800, jy = 830;
        F.rings(c, jx, 660, t, { a0: -0.55, a1: 0.55, r0: 230, maxR: 640, gap: 60, speed: 110, alpha: Math.pow(air, 1.6) });
        F.rings(c, jx, 660, t, { a0: Math.PI - 0.55, a1: Math.PI + 0.55, r0: 230, maxR: 520, gap: 60, speed: 110, alpha: Math.pow(air, 1.6) });
        F.clock(c, jx, 690, 0.95, t, 1);
        F.jar(c, jx, jy, 1.0, t, air);
        // hortum + pompa
        stroke(c, P.bez([jx + 235, jy + 18], [jx + 330, jy + 40], [jx + 395, jy + 10], 20), { w: 7, color: '#5B5566' });
        F.pump(c, jx + 470, jy + 34, 0.85, t, t > sj + 3 && t < sf + 5 ? 1 : 0);
        const kp = E.se(t, sj + 3, sj + 3.8) * (1 - E.se(t, sf + 5, sf + 5.6));
        if (kp > 0) { c.save(); c.globalAlpha *= kp; F.fit(c, 'hava boşaltılıyor', jx + 470, jy - 110, 360, 36); P.arrow(c, [jx + 250, jy - 60], [jx + 400, jy - 60], 1, { w: 3, bend: 0 }); c.restore(); }
        // dinleyen kulak + ses göstergesi
        F.ear(c, 1560, 560, 1.0, { flip: true });
        F.meter(c, 1480, 720, 5 * air, 1);
        F.fit(c, 'duyulan ses', 1575, 770, 260, 32, { weight: 400, alpha: 0.75 });
        const kz = E.se(t, sf + 4.8, sf + 5.6);
        if (kz > 0) F.stamp(c, 1570, 420, 'ses yok!', kz, { color: F.AMB, size: 46 });
        const kh = E.se(t, sf + 0.3, sf + 1.2);
        if (kh > 0) { c.save(); c.globalAlpha *= kh; INK.label(c, 'çekiç hâlâ titreşiyor', 330, 330, { size: 42, weight: 700, color: F.AMB }); INK.leader(c, [560, 345], [jx - 4, 612], { w: 1.8 }); c.restore(); }
        F.damla(c, t, { x: 230, y: 905, s: 0.9, expr: air < 0.2 ? 'surprised' : 'curious', look: [0.8, -0.3], arms: [[-1, 0.4], [1, [58, -150]]] });
        const kn = E.se(t, sn + 0.3, sn + 1.1);
        if (kn > 0) E.layer(c, kn, c2 => {
          F.card(c2, 1110, 170, 720, 170, 601, { tint: PAL.light, tintA: 0.2 });
          F.fit(c2, 'Ses boşlukta yayılmaz.', 1470, 245, 660, 56);
          F.fit(c2, 'Yayılması için maddesel ortam gerekir.', 1470, 305, 660, 38, { weight: 400 });
        });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        c.fillStyle = 'rgba(28,34,60,0.82)'; c.fillRect(0, 0, E.W, E.H);
        const R = INK.rng(611); c.fillStyle = PAL.white; for (let i = 0; i < 60; i++) { c.globalAlpha = 0.3 + R() * 0.5; c.beginPath(); c.arc(R() * E.W, R() * 900, 1 + R() * 2, 0, 7); c.fill(); } c.globalAlpha = 1;
        const sx = 330, sy = 520;
        P.sun(c, sx, sy, 170, t, { nrays: 24 });
        F.flare(c, sx, sy, 170, t, E.se(t, ss + 0.6, ss + 1.6));
        P.earth(c, 1660, 500, 60);
        INK.label(c, 'Dünya', 1660, 610, { size: 36, weight: 700, align: 'center', color: PAL.white });
        // ışık ulaşır
        const kl = E.se(t, ss + 1.4, ss + 3.2);
        for (let i = -1; i <= 1; i++) P.arrow(c, [540, 470 + i * 26], [1580, 490 + i * 10], kl, { w: 3, color: PAL.light, bend: 0, head: 14 });
        if (kl > 0.9) INK.label(c, 'ışık ulaşır', 1060, 430, { size: 42, weight: 700, align: 'center', color: PAL.light });
        // ses ulaşamaz
        const ks = E.se(t, ss + 3.4, ss + 4.4);
        if (ks > 0) {
          c.save(); c.globalAlpha *= ks;
          F.rings(c, sx + 60, sy + 120, t, { a0: -0.3, a1: 0.8, r0: 190, maxR: 330, gap: 40, speed: 70, color: '#E9B872' });
          INK.label(c, 'ses ulaşamaz', 1060, 650, { size: 42, weight: 700, align: 'center', color: '#E9B872' });
          c.restore();
        }
        const km = E.se(t, ss + 5.0, ss + 5.8);
        if (km > 0) { c.save(); c.globalAlpha *= km; INK.label(c, 'uzay: madde yok denecek kadar az', 1060, 770, { size: 40, align: 'center', color: PAL.white }); c.restore(); }
        INK.label(c, '(çizim ölçekli değildir)', 1780, 880, { size: 28, align: 'right', color: PAL.white, alpha: 0.6 });
      });
    }
  });
})();

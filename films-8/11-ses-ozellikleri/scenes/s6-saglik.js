// SAHNE 6 — Ses bir enerji türüdür (uçak camı titretir, böbrek taşı kırma) + şiddetli seslerin sağlığa zararı (güvenlik kartı)
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const F = S8;
  E.scene({
    name: 'Ses enerjisi · Sağlık', concept: 'Ses enerjidir; şiddetli ses işitmeye zarar verir', from: 'energy', to: 'protect', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('energy'), sd = E.s('danger'), sp = E.s('protect');
      const aA = 1 - E.se(t, sd - 0.3, sd + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        c.fillStyle = 'rgba(46,106,140,0.08)'; c.fillRect(0, 0, E.W, E.H);
        F.card(c, 150, 250, 760, 620, 241); F.card(c, 1010, 250, 760, 620, 242);
        // uçak ve titreyen cam
        const px = E.lerp(1000, 250, E.seg(t, se + 0.5, se + 7));
        c.save(); P.path(c, F.rr(150, 250, 760, 620, 1, 1)); c.clip();
        F.plane(c, px, 330, 0.9);
        F.rings(c, px, 360, t, { a0: 0.3, a1: 2.8, r0: 120, maxR: 320, gap: 55, speed: 120, alpha: 0.8 });
        c.restore();
        const house = [[330, 820], [330, 560], [530, 470], [730, 560], [730, 820]]; F.shape(c, house, '#D9CBB0', 0.4, 243);
        F.window(c, 450, 610, 160, 140, t, E.se(t, se + 1.5, se + 2.5));
        F.fit(c, 'cam titriyor', 530, 800, 300, 36, { color: F.AMB });
        // böbrek taşı
        const kidney = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; const r = 1 - 0.28 * Math.max(0, Math.cos(a)); kidney.push([1480 + Math.cos(a) * 140 * r, 520 + Math.sin(a) * 190]); }
        F.shape(c, kidney, '#B5553F', 0.35, 245);
        const crack = E.se(t, se + 5, se + 6.5);
        const sx = 1470, sy = 520;
        if (crack < 1) { F.shape(c, circlePts(sx, sy, 30, 24, 20), '#9A9387', 0.7, 247); if (crack > 0) { line(c, [sx - 20, sy - 10], [sx + 5, sy + 4], { w: 2, dry: false }); line(c, [sx + 5, sy + 4], [sx + 18, sy - 14], { w: 2, dry: false }); } }
        else { const R = INK.rng(248); for (let i = 0; i < 8; i++) { const a = R() * 6.28, d = 14 + R() * 26; P.fillPts(c, circlePts(sx + Math.cos(a) * d, sy + Math.sin(a) * d, 6 + R() * 5, 5 + R() * 4, 10), '#9A9387', 0.85); } }
        const dev = [[1060, 440], [1140, 440], [1140, 600], [1060, 600]]; F.shape(c, dev, '#5B5566', 0.5, 249);
        F.rings(c, 1060, 520, t, { a0: -0.35, a1: 0.35, r0: 140, maxR: 400, gap: 45, speed: 120, alpha: E.se(t, se + 3, se + 3.8), noFade: true });
        F.fit(c, 'böbrek taşı', 1480, 790, 400, 38); F.fit(c, 'ses dalgaları', 1180, 400, 300, 32, { color: F.AMB, alpha: E.se(t, se + 3.4, se + 4) });
        F.fit(c, 'Ses bir enerji türüdür.', 960, 215, 700, 48, { alpha: E.se(t, se + 0.5, se + 1.3) });
      });
      const k = E.se(t, sd - 0.2, sd + 0.6, 'out');
      if (k > 0) {
        F.safety(ctx, 340, 170, 1240, 700, 'İŞİTME SAĞLIĞI', k);
        E.layer(ctx, E.se(t, sd + 0.6, sd + 1.2), c => {
          F.speaker(c, 520, 380, 0.9, t, 1);
          F.rings(c, 580, 380, t, { a0: -0.5, a1: 0.5, r0: 70, maxR: 330, gap: 40, speed: 150, w: 6, color: F.RED });
          F.ear(c, 1000, 380, 1.0, { flip: true });
          F.meter(c, 1120, 440, 5, 1, { warn: true });
          F.wfit(c, 'Çok şiddetli ses → işitme kaybı', 960, 560, E.seg(t, sd + 1.2, sd + 2.4), 50, 1100, { align: 'center', color: F.RED });
          const tips = ['Kulaklıkta sesi kıs.', 'Ara vererek dinle.', 'Çok gürültülü yerde kulağını koru.'];
          tips.forEach((s, i) => { const at = sp + 0.5 + i * 1.8, y = 660 + i * 72; P.check(c, 470, y - 20, 46, E.se(t, at + 0.6, at + 1.1), { w: 6, color: F.GREEN }); F.wfit(c, s, 520, y, E.seg(t, at, at + 1.0), 44, 760); });
          c.save(); c.globalAlpha *= E.se(t, sp + 0.5, sp + 1.2); F.headphones(c, 1390, 720, 1.3); F.fit(c, 'kısık ses', 1390, 840, 250, 32, { weight: 400 }); c.restore();
        });
      }
    }
  });
})();

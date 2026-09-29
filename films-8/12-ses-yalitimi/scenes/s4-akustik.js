// SAHNE 4 — Akustik (ses bilimi) tanımı; Mimar Sinan · Selimiye Camii akustiği (FB.8.4.5 c; TYMM önerisi)
(function () {
  const { PAL, stroke, line, circlePts } = INK; const F = S8;
  E.scene({
    name: 'Akustik', concept: 'Akustik: ses bilimi; Selimiye Camii', from: 'acoustic', to: 'sinan', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('acoustic'), sn = E.s('sinan');
      ctx.fillStyle = 'rgba(227,160,58,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      const aA = 1 - E.se(t, sn - 0.3, sn + 0.5), aB = E.se(t, sn - 0.3, sn + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        F.card(c, 300, 190, 1320, 150, 701, { tint: PAL.light, tintA: 0.2 });
        F.fit(c, 'Akustik (ses bilimi)', 960, 262, 1200, 60, { font: 'Fraunces', weight: 600 });
        F.fit(c, 'sesi, oluşumundan gürültü kontrolüne kadar inceler', 960, 318, 1200, 36, { weight: 400 });
        const items = ['oluşum', 'iletim', 'soğurulma', 'gürültü kontrolü'];
        items.forEach((n, i) => {
          const x = 360 + i * 400, k = E.se(t, sa + 1.5 + i * 0.9, sa + 2.2 + i * 0.9, 'out'); if (k <= 0) return;
          E.layer(c, k, c2 => {
            F.card(c2, x - 160, 420, 320, 380, 710 + i);
            if (i === 0) { F.fork(c2, x, 700, 0.9, t, 1); F.vib(c2, x, 520, t, { r0: 50 }); }
            if (i === 1) { F.shape(c2, [[x - 20, 470], [x + 20, 470], [x + 20, 700], [x - 20, 700]], '#B5553F', 0.4, 720); F.rings(c2, x - 110, 585, t, { a0: -0.3, a1: 0.3, r0: 20, maxR: 250, gap: 40, speed: 80, noFade: true }); }
            if (i === 2) { c2.save(); c2.translate(x, 585); F.surface(c2, 0, -110, 90, 220, 'foam'); c2.restore(); F.rings(c2, x - 130, 585, t, { a0: -0.3, a1: 0.3, r0: 20, maxR: 130, gap: 40, speed: 80 }); }
            if (i === 3) { F.car(c2, x, 690, 0.8, t); F.meter(c2, x - 90, 560, 2, 1); }
            F.fit(c2, n, x, 770, 290, 38);
          });
        });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        const g = c.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.12)'); g.addColorStop(1, 'rgba(227,160,58,0.1)'); c.fillStyle = g; c.fillRect(0, 0, E.W, E.H);
        line(c, [100, 800], [1820, 800], { w: 3, color: F.WOOD });
        F.mosque(c, 760, 800, 1.2);
        // kubbe altında her yöne yayılan ses (şematik)
        c.save(); c.beginPath(); c.rect(500, 450, 520, 350); c.clip();
        F.rings(c, 760, 740, t, { a0: Math.PI, a1: 2 * Math.PI, r0: 30, maxR: 280, gap: 45, speed: 70, alpha: E.se(t, sn + 2, sn + 3), noFade: true });
        c.restore();
        P.write(c, 'Selimiye Camii', 1420, 380, E.seg(t, sn + 0.6, sn + 1.8), { size: 64, align: 'center', font: 'Fraunces', weight: 600 });
        P.write(c, 'Edirne · Mimar Sinan', 1420, 450, E.seg(t, sn + 1.4, sn + 2.6), { size: 44, align: 'center' });
        P.write(c, 'ses her yere iyi ulaşır', 1420, 560, E.seg(t, sn + 3.2, sn + 4.4), { size: 44, align: 'center', color: F.AMB });
        F.fit(c, '(çizim şematiktir)', 1420, 860, 400, 28, { weight: 400, alpha: 0.6 });
      });
    }
  });
})();

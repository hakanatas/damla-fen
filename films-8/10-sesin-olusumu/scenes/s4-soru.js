// SAHNE 4 — Farabi (merak) + "Ses her ortamda yayılır mı?" + deney tasarımı: değişkenler. FB.8.4.2 a) deney tasarlar
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const F = S8;
  function mediumIcon(c, x, y, kind, t) {
    const box = F.rr(x - 120, y - 110, 240, 220, 18, 4);
    P.fillPts(c, box, PAL.white, 0.9);
    c.save(); P.path(c, box); c.clip();
    if (kind === 'katı') { wash(c, box, F.WOOD, 0.35, 501, { bleed: 1, blooms: 0 }); F.particles(c, x - 120, y - 110, 240, 220, t, { d: 20, amp: 0, seed: 21, r: 6 }); }
    if (kind === 'sıvı') { wash(c, box, PAL.water, 0.25, 502, { bleed: 1, blooms: 0 }); F.particles(c, x - 120, y - 110, 240, 220, t, { d: 25, amp: 0, seed: 22, skip: 0.15, r: 6 }); }
    if (kind === 'gaz') { F.particles(c, x - 120, y - 110, 240, 220, t, { d: 34, amp: 0, seed: 23, skip: 0.6, r: 6 }); }
    c.restore();
    stroke(c, box, { w: 2.8, closed: true, seed: 505 });
    F.fit(c, kind, x, y + 160, 220, 46);
  }
  E.scene({
    name: 'Soru', concept: 'Ses her ortamda yayılır mı? Deney tasarımı', from: 'farabi', to: 'mediaq', trFrom: [960, 540],
    draw(ctx, t) {
      const sf = E.s('farabi'), sm = E.s('mediaq');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const aF = 1 - E.se(t, sm - 0.3, sm + 0.5), aM = E.se(t, sm - 0.3, sm + 0.5);
      if (aF > 0) E.layer(ctx, aF, c => {
        // eski el yazması sayfası
        const pg = F.card(c, 260, 220, 820, 620, 511, { tint: PAL.light, tintA: 0.22 });
        F.fit(c, 'Büyük Musiki Kitabı', 670, 320, 700, 58, { font: 'Fraunces', weight: 600 });
        F.fit(c, 'Farabi · 9.–10. yüzyıl', 670, 380, 700, 38, { weight: 400, alpha: 0.8 });
        for (let i = 0; i < 5; i++) line(c, [330, 450 + i * 34], [620 - (i % 2) * 40, 450 + i * 34], { w: 1.6, dry: false, alpha: 0.45 });
        for (let i = 0; i < 5; i++) line(c, [330, 660 + i * 34], [1010 - (i % 3) * 60, 660 + i * 34], { w: 1.6, dry: false, alpha: 0.45 });
        F.baglama(c, 880, 560, 0.42, t, 0.6, { rot: 0.5 });
        F.rings(c, 930, 540, t, { a0: -0.9, a1: 0.9, r0: 50, maxR: 140, gap: 28, speed: 60 });
        // Damla okuyor
        F.damla(c, t, { x: 1420, y: 880, s: 1.25, flip: true, expr: 'curious', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, 2.2]], prop: 'lens', propTilt: -0.3 });
        P.bubble(c, 1470, 300, 520, 170, [1420, 560], E.se(t, sf + 3.5, sf + 4.1, 'out'), 7);
        if (t > sf + 4) { F.wfit(c, 'Ses nasıl oluşur?', 1270, 285, E.seg(t, sf + 4.1, sf + 5), 42, 420); F.wfit(c, 'Nasıl yayılır?', 1270, 345, E.seg(t, sf + 4.8, sf + 5.6), 42, 420); }
      });
      if (aM > 0) E.layer(ctx, aM, c => {
        P.write(c, 'Ses her ortamda yayılır mı?', 960, 220, E.seg(t, sm + 0.3, sm + 1.6), { size: 64, align: 'center' });
        [['katı', 520], ['sıvı', 960], ['gaz', 1400]].forEach(([k, x], i) => {
          const ki = E.se(t, sm + 1.0 + i * 0.5, sm + 1.6 + i * 0.5, 'out'); if (ki <= 0) return;
          c.save(); c.translate(x, 420); c.scale(P.pop(ki), P.pop(ki)); c.translate(-x, -420); mediumIcon(c, x, 420, k, t); c.restore();
        });
        // değişkenler
        const kv = E.se(t, sm + 4.0, sm + 4.8);
        if (kv > 0) E.layer(c, kv, c2 => {
          F.card(c2, 330, 660, 1260, 220, 521);
          const R = [['değiştirdiğim:', 'ortam (katı · sıvı · gaz)', F.AMB], ['aynı kalan:', 'ses kaynağı · uzaklık', PAL.water], ['gözlediğim:', 'ses duyuluyor mu?', PAL.ink]];
          R.forEach(([a, b, col], i) => { const y = 725 + i * 62; const k = E.seg(t, sm + 4.4 + i * 0.9, sm + 5.3 + i * 0.9); P.write(c2, a, 380, y, k, { size: 40, weight: 400 }); P.write(c2, b, 700, y, k, { size: 42, color: col }); });
        });
      });
    }
  });
})();

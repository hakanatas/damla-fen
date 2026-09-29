// SAHNE 2 — Ses maddeyle karşılaşınca: bir kısmı yansır, bir kısmı iletilir, bir kısmı soğurulur (FB.8.4.5 a) + iletim örneği (komşu duvarı)
(function () {
  const { PAL, stroke, line, wash, circlePts, hatch } = INK; const F = S8;
  function clipRect(c, x0, x1, fn) { c.save(); c.beginPath(); c.rect(x0, 150, x1 - x0, 760); c.clip(); fn(); c.restore(); }
  E.scene({
    name: 'Yansıma · iletim · soğurulma', concept: 'Sesin madde ile etkileşimi', from: 'meet', to: 'transmit', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('meet'), st = E.s('terms'), sx = E.s('transmit');
      const aA = 1 - E.se(t, sx - 0.3, sx + 0.5), aB = E.se(t, sx - 0.3, sx + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        c.fillStyle = 'rgba(138,106,69,0.08)'; c.fillRect(0, 0, E.W, E.H);
        const wx0 = 960, wx1 = 1080, src = [300, 540];
        const wall = [[wx0, 230], [wx1, 230], [wx1, 850], [wx0, 850]]; F.shape(c, wall, '#B5553F', 0.35, 631);
        for (let yy = 260; yy < 840; yy += 40) line(c, [wx0, yy], [wx1, yy], { w: 1.2, dry: false, alpha: 0.5 });
        F.speaker(c, src[0] - 60, src[1], 0.9, t, 1);
        const kIn = E.se(t, sm + 0.3, sm + 1.2), kR = E.se(t, sm + 2.2, sm + 3), kT = E.se(t, sm + 3.6, sm + 4.4), kS = E.se(t, sm + 5, sm + 5.8);
        clipRect(c, 0, wx0, () => { c.globalAlpha *= kIn; F.rings(c, src[0], src[1], t, { a0: -0.45, a1: 0.45, r0: 60, maxR: wx0 - src[0] + 40, gap: 60, speed: 110, noFade: true }); });
        clipRect(c, 0, wx0, () => { c.globalAlpha *= kR * 0.7; F.rings(c, 2 * wx0 - src[0], src[1], t, { a0: Math.PI - 0.35, a1: Math.PI + 0.35, r0: wx0 - src[0] + 10, maxR: 1250, gap: 60, speed: 110, fadeK: 0.8 }); });
        clipRect(c, wx1, E.W, () => { c.globalAlpha *= kT * 0.45; F.rings(c, src[0] + 120, src[1], t, { a0: -0.3, a1: 0.3, r0: wx1 - src[0] - 110, maxR: 1650, gap: 60, speed: 110, w: 2, fadeK: 0.8 }); });
        if (kS > 0) { c.save(); c.globalAlpha *= kS; for (let i = 0; i < 7; i++) { const yy = 330 + i * 70, ph = t * 3 + i; const pts = []; for (let j = 0; j <= 12; j++) pts.push([wx0 + 20 + j * 7, yy + Math.sin(j * 1.3 + ph) * 6]); stroke(c, pts, { w: 2.2, color: F.AMB, dry: false, alpha: 0.5 + 0.5 * Math.sin(ph) * 0.5 }); } c.restore(); }
        // terimler
        const k1 = E.se(t, st + 0.4, st + 1.1), k2 = E.se(t, st + 2.2, st + 2.9), k3 = E.se(t, st + 4.0, st + 4.7);
        P.arrow(c, [900, 330], [520, 300], k1, { w: 4, color: F.AMB, bend: 10 }); if (k1 > 0.9) INK.label(c, 'yansıma', 700, 270, { size: 50, weight: 700, align: 'center' });
        P.arrow(c, [1110, 540], [1560, 540], k2, { w: 3, color: F.AMB, bend: 0 }); if (k2 > 0.9) INK.label(c, 'iletim', 1340, 500, { size: 50, weight: 700, align: 'center' });
        if (k3 > 0) { c.save(); c.globalAlpha *= k3; INK.label(c, 'soğurulma', 1020, 930 - 30, { size: 50, weight: 700, align: 'center' }); INK.leader(c, [1020, 858], [1020, 780], { w: 1.8, bend: 0 }); c.restore(); }
        if (kR > 0 && k1 <= 0) F.fit(c, 'geri döner', 700, 280, 300, 38, { alpha: kR });
        if (kT > 0 && k2 <= 0) F.fit(c, 'geçer', 1340, 500, 300, 38, { alpha: kT });
        if (kS > 0 && k3 <= 0) F.fit(c, 'tutulur', 1020, 900, 300, 38, { alpha: kS });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        const L = [[160, 250], [940, 250], [940, 860], [160, 860]], R = [[1060, 250], [1760, 250], [1760, 860], [1060, 860]];
        F.shape(c, L, '#E6DCC6', 0.3, 641); F.shape(c, R, '#E6DCC6', 0.3, 642);
        const wall = [[940, 250], [1060, 250], [1060, 860], [940, 860]]; F.shape(c, wall, '#B5553F', 0.4, 643);
        F.speaker(c, 400, 600, 1.0, t, 1);
        F.rings(c, 470, 580, t, { a0: -0.5, a1: 0.5, r0: 70, maxR: 470, gap: 55, speed: 110, noFade: true });
        c.save(); c.beginPath(); c.rect(1060, 250, 700, 610); c.clip(); c.globalAlpha *= 0.5; F.rings(c, 470, 580, t, { a0: -0.3, a1: 0.3, r0: 600, maxR: 1100, gap: 55, speed: 110, w: 2.2 }); c.restore();
        F.damla(c, t, { x: 1480, y: 830, s: 0.95, flip: true, expr: 'surprised', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, [58, -150]]] });
        F.meter(c, 1560, 520, 2, E.se(t, sx + 1, sx + 1.8));
        F.fit(c, 'komşu', 550, 320, 300, 44); F.fit(c, 'ben', 1410, 320, 300, 44);
        P.write(c, 'ses duvardan iletilir', 960, 215, E.seg(t, sx + 2, sx + 3.2), { size: 52, align: 'center', color: F.AMB });
      });
    }
  });
})();

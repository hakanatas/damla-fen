// SAHNE 6 — Yoğunluk farkından yararlanma: zeytinyağı-su (ayırma hunisi) · odun talaşı-su (yüzen talaşı toplama)
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  E.scene({
    name: 'Yoğunluk farkı', concept: 'Ayırma hunisi; yüzen talaş', from: 'density', to: 'sawdust', trFrom: [600, 500],
    draw(ctx, t) {
      const sd = E.s('density'), ss = E.s('sawdust');
      K.bench(ctx, -40, 1960, 860, 7601);
      // sehpa
      line(ctx, [300, 860], [300, 180], { w: 8, color: '#6B6460', taper: 0.02 }); line(ctx, [300, 330], [470, 330], { w: 5, color: '#6B6460', taper: 0.02 });
      const drain = E.se(t, sd + 3.0, sd + 8.0);
      const tap = t > sd + 3.0 && drain < 0.98;
      K.sepFunnel(ctx, 520, 360, 0.9, 0.55 * (1 - drain) + 0.001, 0.35, tap, t);
      K.beaker(ctx, 520, 860, 200, 200, { level: 0.08 + 0.5 * drain, t, seed: 60 });
      const lk = E.se(t, sd + 1.0, sd + 1.8);
      if (lk > 0) E.layer(ctx, lk, c => {
        INK.leader(c, [585, 322], [760, 240], { bend: -0.1 }); INK.label(c, 'zeytinyağı (üstte)', 775, 250, { size: 40, weight: 700, color: '#9C7E1E' });
        INK.leader(c, [600, 400], [760, 420], { bend: 0.1 }); INK.label(c, 'su (altta)', 775, 430, { size: 40, weight: 700, color: PAL.water });
        INK.leader(c, [548, 510], [760, 560], { bend: 0.1 }); INK.label(c, 'musluk', 775, 570, { size: 36, weight: 700 });
      });
      E.inkText(ctx, 'ayırma hunisi', 775, 170, t, sd + 0.6, 1e9, { size: 46 });
      // talaş
      const tk = E.se(t, ss + 0.2, ss + 0.8);
      if (tk > 0) E.layer(ctx, tk, c => {
        K.beaker(c, 1480, 860, 280, 300, { level: 0.6, t, seed: 61 });
        const wy = 860 - 8 - 0.6 * (300 - 26);
        const r = rng(7610), scoop = E.se(t, ss + 2.5, ss + 5.0);
        for (let i = 0; i < 22; i++) { const x = 1370 + r() * 220 + Math.sin(t + i) * 3, y = wy - 3 + r() * 8, a = r() * 3; if (i < 17 * scoop) continue; c.save(); c.translate(x, y); c.rotate(a); c.fillStyle = '#B08A5A'; c.fillRect(-10, -3, 20, 6); c.restore(); }
        // kaşık
        const sx = E.lerp(1700, 1500, Math.sin(scoop * Math.PI)), sy = E.lerp(420, wy - 10, Math.sin(scoop * Math.PI));
        if (t > ss + 2.0) { line(c, [sx + 60, sy - 120], [sx, sy], { w: 6, color: '#8A8378', taper: 0.02 }); P.fillPts(c, circlePts(sx - 10, sy + 4, 30, 14, 20), '#8A8378', 0.9); }
        INK.label(c, 'odun talaşı + su', 1480, 460, { size: 44, weight: 700, align: 'center' });
        P.write(c, 'talaş yüzer → toplanır', 1480, 380, E.seg(t, ss + 1.2, ss + 2.2), { size: 42, align: 'center', color: K.AMBER });
      });
      const nk = E.seg(t, sd + 5.2, sd + 6.2);
      if (nk > 0 && t < ss + 0.4) P.write(ctx, 'yoğunluğu az olan üstte kalır', 1330, 700, nk, { size: 44, align: 'center', color: K.AMBER, alpha: 0.93 * (1 - E.se(t, ss, ss + 0.4)) });
    }
  });
})();

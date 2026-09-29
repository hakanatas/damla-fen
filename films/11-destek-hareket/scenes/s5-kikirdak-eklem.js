// SAHNE 5 — Kıkırdak (nitelik + yer) ve eklem, eklem çeşitleri (yapıya girilmeden)
(function () {
  const { PAL, stroke, circlePts } = INK;
  E.scene({
    name: 'Kıkırdak ve eklem', concept: 'Kıkırdak; eklem çeşitleri', from: 'cartilage', to: 'jointtypes', trFrom: [560, 500],
    draw(ctx, t) {
      const F = F11, sc = E.s('cartilage'), sj = E.s('joint'), st = E.s('jointtypes');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, sj - 0.3, sj + 0.3), a2 = Math.min(E.se(t, sj - 0.1, sj + 0.5), 1 - E.se(t, st - 0.3, st + 0.3)), a3 = E.se(t, st - 0.1, st + 0.5);
      if (a1 > 0) E.layer(ctx, a1, c => {
        const H = F.head(c, 560, 520, 1.25, { ear: E.se(t, sc + 5, sc + 6), nose: E.se(t, sc + 6.5, sc + 7.5) });
        P.write(c, 'Kıkırdak', 1060, 280, E.seg(t, sc + 0.3, sc + 1.3), { size: 64, color: '#2E6A8C' });
        P.write(c, 'kemikten daha yumuşak ve esnek', 1060, 360, E.seg(t, sc + 1.6, sc + 3), { size: 42, weight: 400 });
        F.tag(c, 'kulak kepçesi', 1060, 520, H.ear, E.se(t, sc + 5, sc + 5.8), { size: 48, seed: 3 });
        F.tag(c, 'burun ucu', 1060, 680, H.nose, E.se(t, sc + 6.5, sc + 7.3), { size: 48, seed: 4, bend: -0.1 });
      });
      if (a2 > 0) E.layer(ctx, a2, c => {
        F.skeleton(c, 560, 900, 0.95, { hi: { move: E.se(t, sj + 1, sj + 1.8) } });
        P.write(c, 'Eklem', 1060, 330, E.seg(t, sj + 0.3, sj + 1.3), { size: 64, color: '#8A4A10' });
        P.write(c, 'kemiklerin birleştiği yer', 1060, 410, E.seg(t, sj + 1.4, sj + 2.6), { size: 44, weight: 400 });
        P.write(c, 'hareket etme durumuna göre', 1060, 540, E.seg(t, sj + 4, sj + 5.2), { size: 40, weight: 400 });
        P.write(c, '3 çeşit', 1060, 610, E.seg(t, sj + 5, sj + 5.8), { size: 52, color: '#8A4A10' });
      });
      if (a3 > 0) E.layer(ctx, a3, c => {
        const C = [
          ['oynamaz eklem', 'kafatası kemikleri arası', 400, st + 0.3, (cc, x, y) => F.skullSide(cc, x, y, 1)],
          ['yarı oynar eklem', 'omurlar arası', 960, st + 3.6, (cc, x, y) => F.spineBend(cc, x, y + 90, 1, 0.05 * Math.sin(t * 2))],
          ['oynar eklem', 'diz, dirsek, omuz', 1520, st + 6.6, (cc, x, y) => F.kneeBend(cc, x, y - 40, 0.9, 0.9 * (0.5 - 0.5 * Math.cos(t * 2.2)))]
        ];
        C.forEach(([n, ex, x, at, fn], i) => {
          const k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 520); c.scale(P.pop(k), P.pop(k));
          const card = INK.wobble(F.rrect(0, 0, 480, 640, 24, 6), 1.5, 60 + i); P.fillPts(c, card, '#FBF8F1'); stroke(c, card, { w: 2.6, closed: true, seed: 70 + i });
          c.restore();
          if (k > 0.5) fn(c, x, 470);
          P.write(c, n, x, 745, E.seg(t, at + 0.4, at + 1.4), { size: 46, align: 'center', color: '#8A4A10' });
          P.write(c, ex, x, 800, E.seg(t, at + 1.2, at + 2.2), { size: 34, weight: 400, align: 'center' });
        });
      });
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

// SAHNE 1 — Başlık + köprü: aynı ses banyoda ve salonda farklı duyulur (TYMM FB.8.4.5 tartışma sorusu). Yankıya girilmez.
(function () {
  const { PAL, stroke, line, wash, circlePts } = INK; const F = S8;
  // oda çizimleri (film içinde tekrar kullanılır)
  F.bathRoom = (c, x, y, w, h, t, ringA) => {
    F.surface(c, x, y, w, h, 'tile');
    const tub = [[x + 30, y + h - 150], [x + w - 30, y + h - 150], [x + w - 60, y + h - 20], [x + 60, y + h - 20]]; F.shape(c, tub, PAL.white, 0, 611);
    F.fit(c, 'banyo', x + w / 2, y + 60, 300, 46);
    if (ringA > 0) {
      c.save(); P.path(c, F.rr(x, y, w, h, 1, 1)); c.clip(); c.globalAlpha *= ringA;
      const sx = x + w * 0.45, sy = y + h * 0.5;
      F.rings(c, sx, sy, t, { a0: 0, a1: Math.PI * 2, r0: 60, maxR: 330, gap: 50, speed: 110, noFade: true, alpha: 0.9 });
      F.rings(c, 2 * x - sx, sy, t, { a0: -0.9, a1: 0.9, r0: 60, maxR: 700, gap: 50, speed: 110, alpha: 0.6 });
      F.rings(c, 2 * (x + w) - sx, sy, t, { a0: Math.PI - 0.9, a1: Math.PI + 0.9, r0: 60, maxR: 700, gap: 50, speed: 110, alpha: 0.6 });
      c.restore();
    }
  };
  F.livingRoom = (c, x, y, w, h, t, ringA) => {
    const bg = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; F.shape(c, bg, '#E6DCC6', 0.4, 621);
    F.surface(c, x + 10, y + 20, 110, h - 40, 'cloth'); F.surface(c, x + w - 120, y + 20, 110, h - 40, 'cloth');
    const rug = [[x + 60, y + h - 60], [x + w - 60, y + h - 60], [x + w - 20, y + h - 10], [x + 20, y + h - 10]]; F.shape(c, rug, '#8C5A7A', 0.5, 623);
    const sofa = [[x + 150, y + h - 230], [x + w - 150, y + h - 230], [x + w - 150, y + h - 90], [x + 150, y + h - 90]]; F.shape(c, sofa, PAL.life, 0.45, 625);
    F.fit(c, 'salon', x + w / 2, y + 60, 300, 46);
    if (ringA > 0) {
      c.save(); P.path(c, F.rr(x, y, w, h, 1, 1)); c.clip(); c.globalAlpha *= ringA;
      F.rings(c, x + w * 0.5, y + h * 0.45, t, { a0: 0, a1: Math.PI * 2, r0: 60, maxR: 250, gap: 50, speed: 110, fadeK: 1 });
      c.restore();
    }
  };
  E.scene({
    name: 'Banyo ve salon', concept: 'Köprü: aynı ses farklı duyulur', from: 'title', to: 'hook',
    draw(ctx, t) {
      const sh = E.s('hook');
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      const ka = E.se(t, 0.8, 2);
      const ring = E.se(t, sh + 0.6, sh + 1.6);
      E.layer(ctx, ka, c => {
        F.bathRoom(c, 140, 250, 760, 620, t, ring);
        F.livingRoom(c, 1020, 250, 760, 620, t, ring);
        F.damla(c, t, { x: 480, y: 740, s: 0.9, view: 'front', expr: 'happy', arms: [[-1, 1.4 + 0.2 * Math.sin(t * 4)], [1, 1.4 - 0.2 * Math.sin(t * 4)]], talk: 0.6 });
        F.damla(c, t, { x: 1400, y: 740, s: 0.9, view: 'front', expr: 'curious', arms: [[-1, 0.5], [1, 0.5]], seed: 2 });
        F.meter(c, 690, 820, 5, ring); F.meter(c, 1570, 820, 2, ring);
      });
      E.inkText(ctx, 'Neden farklı?', 960, 220, t, sh + 5, E.e('hook') + 0.6, { size: 60, align: 'center' });
      F.title(ctx, t, '12 · Sesin Madde ile Etkileşimi ve Ses Kirliliği', 'Fen Bilimleri · 8. sınıf · Ünite 4', F.AMB);
    }
  });
})();

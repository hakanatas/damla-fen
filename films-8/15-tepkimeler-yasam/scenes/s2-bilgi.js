// SAHNE 3 — Bilgiye ulaş (b): sindirim, enerji üretimi, fotosentez, pişme, mayalanma, temizlik, paslanma, çürüme, yanma, çevre kirliliği
(function () {
  const { PAL, stroke, line, circlePts, rng, wobble } = INK;
  const U = U5;
  const leaf = (c, x, y, s) => { const p = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; p.push([x + Math.cos(a) * 70 * s, y + Math.sin(a) * 34 * s * Math.abs(Math.cos(a * 0.5) + 0.3)]); } const lf = wobble(p, 2, 2101); P.fillPts(c, lf, PAL.life, 0.75); stroke(c, lf, { w: 2.4, closed: true }); line(c, [x - 70 * s, y], [x + 70 * s, y], { w: 1.6, dry: false }); };
  const ICONS = {
    sindirim: (c, x, y, t) => { const pl = circlePts(x - 30, y + 20, 70, 20, 30); P.fillPts(c, pl, PAL.white); stroke(c, pl, { w: 2.4, closed: true }); U.bread(c, x - 30, y + 2, 0.3, 0); P.arrow(c, [x + 40, y + 10], [x + 80, y + 10], 1, { w: 2.4, head: 9 }); const r = rng(2102); for (let i = 0; i < 6; i++) U.ball(c, x + 95 + r() * 40, y - 10 + r() * 40, 6, '#D9A45E'); },
    enerji: (c, x, y, t) => { const cl = wobble(circlePts(x, y + 10, 70, 55, 30), 3, 2103); P.fillPts(c, cl, '#F1E4DA'); stroke(c, cl, { w: 2.4, closed: true }); P.fillPts(c, circlePts(x - 20, y + 10, 18, 16, 16), '#C9A8C0'); const b = [[x + 20, y - 30], [x + 4, y + 12], [x + 22, y + 12], [x + 8, y + 50], [x + 44, y], [x + 26, y], [x + 40, y - 30]]; P.fillPts(c, b, PAL.light); stroke(c, b, { w: 2, closed: true, dry: false }); },
    fotosentez: (c, x, y, t) => { P.sun(c, x + 70, y - 40, 26, t, { cells: false, nrays: 10, glow: false }); leaf(c, x - 20, y + 20, 1); for (let i = 0; i < 3; i++) U.txt(c, 'O₂', x + 40 + i * 20, y + 60 - ((t * 30 + i * 20) % 50), { size: 22, color: PAL.water, alpha: 0.8 }); },
    pisme: (c, x, y, t) => { const pot = [[x - 70, y - 20], [x + 70, y - 20], [x + 60, y + 50], [x - 60, y + 50], [x - 70, y - 20]]; P.fillPts(c, pot, '#9A9FA6'); stroke(c, pot, { w: 2.4, closed: true, dry: false }); U.steam(c, x, y - 24, 110, 60, 1, t, 2104); U.flame(c, x, y + 90, 0.5, t, 1); },
    maya: (c, x, y, t) => { U.bread(c, x, y + 20, 0.6, 0); },
    temizlik: (c, x, y, t) => { const b = [[x - 30, y - 30], [x + 30, y - 30], [x + 36, y + 70], [x - 36, y + 70], [x - 30, y - 30]]; P.fillPts(c, b, '#BFD4DF'); stroke(c, b, { w: 2.4, closed: true, dry: false }); const hd = [[x - 20, y - 30], [x - 20, y - 60], [x + 40, y - 60], [x + 40, y - 48], [x + 10, y - 48], [x + 10, y - 30]]; P.fillPts(c, hd, '#E8E2D2'); stroke(c, hd, { w: 2.2, dry: false }); for (let i = 0; i < 5; i++) { const u = ((t * 0.8 + i / 5) % 1); U.ball(c, x + 50 + u * 60, y - 54 + (i - 2) * u * 10, 3, '#BFD4DF'); } },
    pas: (c, x, y, t) => { U.nail(c, x, y, 0.8, 0.9, -0.2); },
    curume: (c, x, y, t) => { U.apple(c, x, y + 10, 0.8, 0.8); },
    yanma: (c, x, y, t) => { line(c, [x - 60, y + 60], [x + 50, y + 40], { w: 14, color: '#8A5A22', taper: 0.02 }); line(c, [x - 50, y + 40], [x + 60, y + 60], { w: 14, color: '#6B4E32', taper: 0.02 }); U.flame(c, x, y + 40, 1.1, t, 1); },
    kirlilik: (c, x, y, t) => { const ch = U.rect(x - 60, y - 20, x - 20, y + 70); P.fillPts(c, ch, '#9A8F80'); stroke(c, ch, { w: 2.4, closed: true, dry: false }); for (let i = 0; i < 4; i++) { const u = ((t * 0.4 + i / 4) % 1); c.save(); c.globalAlpha *= 0.6 * (1 - u); P.fillPts(c, circlePts(x - 40 + u * 100, y - 30 - u * 60, 16 + u * 20, 12 + u * 14, 18), '#6E6A64'); c.restore(); } }
  };
  const ITEMS = [
    ['sindirim', 'sindirim', 'body', 0], ['enerji', 'enerji üretimi', 'body', 1], ['fotosentez', 'fotosentez', 'plant', 0], ['pisme', 'yemeğin pişmesi', 'kitchen', 0], ['maya', 'mayalanma', 'kitchen', 1],
    ['temizlik', 'temizlik maddeleri', 'kitchen', 2], ['pas', 'paslanma', 'outside', 0], ['curume', 'çürüme', 'outside', 1], ['yanma', 'yanma', 'outside', 2], ['kirlilik', 'çevre kirliliği', 'outside', 3]
  ];
  const GROUP = { body: 'vücutta', plant: 'bitkide', kitchen: 'evde', outside: 'dışarıda' };
  E.scene({
    name: 'Bilgi topla', concept: 'Günlük yaşamda kimyasal tepkimeler', from: 'collect', to: 'outside', trFrom: [960, 500],
    draw(ctx, t) {
      const sc = E.s('collect'), sb = E.s('body');
      const hk = Math.min(E.se(t, sc + 0.3, sc + 1.0), 1 - E.se(t, sb - 0.3, sb + 0.3));
      if (hk > 0) E.layer(ctx, hk, c => { P.write(c, 'Kimyasal tepkimeler her yerde!', 960, 540, E.seg(t, sc + 0.4, sc + 2.2), { size: 80, align: 'center', color: U.AMBER }); U.damla(c, t, { x: 960, y: 820, s: 1.1, view: 'front', expr: 'happy', arms: [[-1, 2.6], [1, 2.6]] }); });
      if (t > sb) U.damla(ctx, t, { x: 1860, y: 905, s: 0.6, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3], arms: [[-1, 1.3], [1, 0.4]], prop: 'notebook' });
      ITEMS.forEach(([ic, nm, beat, j], i) => {
        const b0 = E.s(beat), at = b0 + 0.3 + j * 1.2, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const col = i % 5, row = Math.floor(i / 5), x = 230 + col * 345, y = 175 + row * 370;
        E.layer(ctx, k, c => {
          U.card(c, x - 160, y, 320, 330, { seed: 2120 + i, tint: beat === 'outside' ? U.HEAT : beat === 'plant' ? PAL.life : beat === 'body' ? PAL.water : PAL.light, tintA: 0.1 });
          U.txt(c, GROUP[beat], x + 140, y + 36, { size: 26, align: 'right', alpha: 0.55 });
          ICONS[ic](c, x, y + 150, t);
          U.txt(c, nm, x, y + 300, { size: 36, align: 'center' });
        });
      });
    }
  });
})();

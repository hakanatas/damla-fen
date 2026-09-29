// SAHNE 3 — Ambalajlardaki pH değerleri (program: su, sabun, kozmetik ürün ambalajlarındaki "pH" değerleri inceletilir)
(function () {
  const { PAL, line, circlePts } = INK;
  const U = U5;
  const BY = 800, X0 = 700, CW = 70;
  E.scene({
    name: 'Etiketler', concept: 'Ambalajlardaki pH değerleri', from: 'label', to: 'label', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('label');
      U.bench(ctx, -40, 1960, BY, 2201);
      const k1 = E.se(t, s0 + 0.2, s0 + 0.8, 'out'), k2 = E.se(t, s0 + 2.6, s0 + 3.2, 'out');
      if (k1 > 0) E.layer(ctx, k1, c => U.product(c, 300, BY, 1.3, { col: '#F2C6D6', cap: '#B8406E', label: 'ŞAMPUAN', sub: 'pH 5,5', subSize: 30, subCol: U.ACID, seed: 6200, h: 250 }));
      if (k2 > 0) E.layer(ctx, k2, c => U.product(c, 560, BY, 1.3, { col: '#D3E5EE', cap: '#3D6FBE', label: 'İÇME SUYU', sub: 'pH 7,4', subSize: 30, subCol: PAL.water, seed: 6210, w: 100, h: 280, neck: 22 }));
      // büyüteç balonu: etiketteki yazı
      const zk = E.se(t, s0 + 1.0, s0 + 1.6, 'back');
      if (zk > 0) { P.bubble(ctx, 360, 330, 320, 150, [310, 560], zk, 7); if (zk > 0.8) U.txt(ctx, 'İçindekiler ... pH 5,5', 360, 345, { size: 32, align: 'center' }); }
      // küçük cetvel + işaretler
      const rk = E.se(t, s0 + 1.5, s0 + 3.5);
      U.phRuler(ctx, X0, 520, CW, 70, rk, { numSize: 30 });
      [[5.5, 'şampuan', U.ACID, s0 + 3.6], [7.4, 'içme suyu', PAL.water, s0 + 4.4]].forEach(([ph, nm, col, at], i) => {
        const k = E.se(t, at, at + 0.5); if (k <= 0) return;
        const x = X0 + CW * (ph + 0.5);
        ctx.save(); ctx.globalAlpha *= k;
        P.arrow(ctx, [x, 440 - i * 70], [x, 512], 1, { w: 3.5, head: 12, color: col });
        U.txt(ctx, nm + ' ' + String(ph).replace('.', ','), x, 425 - i * 70, { size: 38, align: 'center', color: col });
        ctx.restore();
      });
      const nk = E.se(t, s0 + 5.2, s0 + 6.0);
      if (nk > 0) P.write(ctx, 'şampuan hafif asidik · su nötre yakın', 1225, 720, nk, { size: 40, align: 'center', color: U.AMBER });
      U.damla(ctx, t, { x: 1780, y: BY, s: 0.8, flip: true, expr: 'happy', look: [-0.9, -0.2], arms: [[-1, 2.0], [1, 0.4]] });
    }
  });
})();

// SAHNE 3 — Ampul: elektrik → ışık (+ ısı); dönüşümün nitelikleri (FB.8.6.6 a)
(function () {
  const { PAL, stroke, line } = INK;
  const W = W6;
  const CX = 600;
  const wA = [[CX + 72, 740], [CX + 220, 740], [CX + 220, 505], [CX + 22, 505]];
  const wB = [[CX - 72, 740], [CX - 220, 740], [CX - 220, 505], [CX - 22, 505]];
  E.scene({
    name: 'Ampul', concept: 'Elektrik enerjisi → ışık + ısı', from: 'bulb', to: 'feat', trFrom: [600, 420],
    draw(ctx, t) {
      const sb = E.s('bulb'), s2 = E.s('bulb2'), s3 = E.s('bulb3'), sf = E.s('feat');
      // devre: pil + kablolar + ampul
      const wk = E.se(t, sb + 0.3, sb + 1.6);
      W.wire(ctx, wA, wk); W.wire(ctx, wB, wk);
      W.cell(ctx, CX, 740, 1.0);
      const on = E.se(t, sb + 1.6, sb + 2.2);
      W.bulb(ctx, CX, 430, 2.0, on);
      if (on > 0) { W.dots(ctx, wA.slice().reverse(), t, on * 0.9, 6); W.dots(ctx, wB, t, on * 0.9, 6); }
      if (t > sb + 2.4 && t < s2) W.txt(ctx, '?', CX + 110, 330, { size: 80, color: PAL.water, alpha: E.se(t, sb + 2.4, sb + 3) });
      // termometre
      const th = E.se(t, s3 + 0.2, s3 + 1.0, 'out');
      if (th > 0) { ctx.save(); ctx.globalAlpha *= th; W.thermo(ctx, CX + 140, 480, 190, 0.2 + 0.55 * E.se(t, s3 + 1.2, s3 + 4)); ctx.restore(); for (let i = 0; i < 2; i++) W.squiggle(ctx, CX + 70 + i * 26, 360, t, i, E.se(t, s3 + 1.5, s3 + 2.5), 50); }
      W.damla(ctx, t, { x: 190, y: 900, s: 1.0, expr: t < s2 ? 'curious' : (t < sf ? 'surprised' : 'happy'), look: [0.8, -0.4], arms: [[-1, 0.35], [1, t < s2 ? 2.2 : 0.5]], seed: 5 });
      // enerji şeması
      const e1 = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (e1 > 0) {
        W.badge(ctx, 'elektrik', 1130, 400, e1, { size: 44 });
        W.flow(ctx, [1260, 380], [1450, 300], E.se(t, s2 + 0.9, s2 + 1.7), { color: W.SUB });
        W.badge(ctx, 'isik', 1590, 290, E.se(t, s2 + 1.6, s2 + 2.2, 'out'), { size: 44 });
        E.inkText(ctx, 'Enerji yok olmaz, biçim değiştirir.', 1360, 560, t, s2 + 3.2, sf + 0.2, { size: 44, align: 'center' });
      }
      const e2 = E.se(t, s3 + 1.8, s3 + 2.6);
      if (e2 > 0) { W.flow(ctx, [1260, 420], [1450, 480], e2, { color: W.HEAT }); W.badge(ctx, 'isi', 1570, 490, E.se(t, s3 + 2.5, s3 + 3.1, 'out'), { size: 44 }); }
      // nitelikler kartı
      const fk = E.se(t, sf + 0.3, sf + 0.9);
      if (fk > 0) E.layer(ctx, fk, c => {
        W.card(c, 930, 620, 880, 250, { seed: 5020, tint: W.ELEC, tintA: 0.08 });
        W.txt(c, 'Nitelikler', 970, 680, { size: 40, color: W.ELEC });
        P.write(c, '• Elektrik enerjisi başka enerjilere dönüşür.', 970, 750, E.seg(t, sf + 1.0, sf + 2.6), { size: 38 });
        P.write(c, '• Çoğu alette birden fazla dönüşüm olur.', 970, 820, E.seg(t, sf + 3.2, sf + 4.8), { size: 38 });
      });
    }
  });
})();

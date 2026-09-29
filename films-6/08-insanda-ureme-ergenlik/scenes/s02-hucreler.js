// SAHNE 2 — Eşeyli üreme: eşey hücreleri (yumurta, sperm) ve döllenme → zigot (FB.6.3.5, kısaca)
(function () {
  const { PAL } = INK; const K = KIT, F = F08;
  E.scene({
    name: 'Eşey hücreleri', concept: 'Eşeyli üreme: yumurta, sperm, döllenme, zigot', from: 'cells', to: 'fert', trFrom: [620, 500],
    draw(ctx, t) {
      const sc = E.s('cells'), sp = E.s('compare'), sf = E.s('fert');
      const EX = 620, EY = 500, ER = 160;
      const fus = E.se(t, sf + 1.0, sf + 4.0), fused = t > sf + 4.0;
      const glow = fused ? E.se(t, sf + 4.0, sf + 4.8) * (0.7 + 0.3 * Math.sin(t * 3)) : 0;
      E.layer(ctx, E.se(t, sc + 0.3, sc + 1.2, 'out'), c => F.egg(c, EX, EY, ER, { glow }));
      // etiketler
      const zk = E.se(t, sf + 4.2, sf + 4.9);
      K.text(ctx, 'yumurta', EX, 262, { size: 52, align: 'center', color: K.LIFE_D, alpha: E.se(t, sc + 1.0, sc + 1.6) * (1 - zk) });
      K.text(ctx, 'anneden', EX, 300 - 0, { size: 32, align: 'center', alpha: 0.7 * E.se(t, sc + 1.4, sc + 2.0) * (1 - zk) });
      K.text(ctx, 'zigot', EX, 262, { size: 58, align: 'center', color: K.LIFE_D, alpha: zk });
      K.text(ctx, 'ilk hücre', EX, 300, { size: 32, align: 'center', alpha: 0.7 * zk });
      // sperm
      const ks = E.se(t, sc + 2.6, sc + 3.4, 'out') * (1 - E.se(t, sf + 4.0, sf + 4.6));
      const sx = E.lerp(1320, EX + ER + 8, fus), sy = 500 + Math.sin(fus * Math.PI * 2) * 40;
      const dir = Math.PI - Math.atan(Math.cos(fus * Math.PI * 2) * 0.5) * (fus > 0 && fus < 1 ? 1 : 0);
      if (ks > 0) E.layer(ctx, ks, c => F.sperm(c, sx, sy, 1.6, dir, t));
      const sl = E.se(t, sc + 3.0, sc + 3.6) * (1 - E.se(t, sf + 0.6, sf + 1.2));
      K.text(ctx, 'sperm', 1330, 400, { size: 52, align: 'center', color: K.LIFE_D, alpha: sl });
      K.text(ctx, 'babadan', 1330, 438, { size: 32, align: 'center', alpha: 0.7 * sl });
      INK.label(ctx, '(çizim ölçekli değildir)', 1820, 200, { size: 30, align: 'right', alpha: 0.6 * E.se(t, sc + 3, sc + 4) });
      // karşılaştırma listeleri
      const la = 1 - E.se(t, sf, sf + 0.6);
      if (la > 0) E.layer(ctx, la, c => {
        ['• büyüktür', '• hareket etmez', '• besin depolar'].forEach((s, i) => P.write(c, s, 470, 755 + i * 56, E.seg(t, sp + 0.4 + i * 1.1, sp + 1.3 + i * 1.1), { size: 40 }));
        ['• çok küçüktür', '• kuyruğuyla', '   hareket eder'].forEach((s, i) => P.write(c, s, 1190, 755 + i * 56, E.seg(t, sp + 4.0 + i * 1.0, sp + 4.9 + i * 1.0), { size: 40 }));
      });
      // döllenme denklemi
      const qk = E.se(t, sf + 4.6, sf + 5.4, 'out');
      if (qk > 0) E.layer(ctx, qk, c => {
        K.node(c, 'sperm + yumurta → zigot', 1330, 520, 1, { size: 50, tint: PAL.life, nopop: true, seed: 3 });
        K.text(c, 'Bu birleşmeye döllenme denir.', 1330, 640, { size: 40, align: 'center' });
      });
      K.damla(ctx, t, { x: 960, y: 905, s: 0.95, expr: fused ? 'surprised' : 'curious', look: fus > 0 && !fused ? [-0.7, -0.5] : [t < sp + 3.5 ? -0.8 : 0.8, -0.5], prop: 'lens', arms: [[-1, 0.4], [1, 1.6]] });
    }
  });
})();

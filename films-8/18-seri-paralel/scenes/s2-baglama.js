// SAHNE 2 — Devre görsellerini inceleme → iki çeşit bağlama çıkarımı (seri / paralel)
(function () {
  const { PAL, stroke, line } = INK;
  const U = U6;
  // akım yolu okları (geleneksel yön: pilin + ucundan dış devreye)
  const arrows = (ctx, list, k) => list.forEach(([a, b], i) => { const kk = E.clamp(k * list.length - i); if (kk > 0) P.arrow(ctx, a, b, kk, { w: 3.4, color: CK.AMBD, head: 14 }); });
  E.scene({
    name: 'İki bağlama', concept: 'Seri ve paralel bağlama', from: 'look', to: 'two', trFrom: [960, 540],
    draw(ctx, t) {
      const sl = E.s('look'), ss = E.s('series'), sp = E.s('parallel'), s2 = E.s('two');
      // kaynaklar (kitap + dizüstü) → sonra küçülüp kaybolur
      const src = 1 - E.se(t, ss - 0.3, ss + 0.4);
      if (src > 0) E.layer(ctx, src, c => {
        P.icon.books(c, 700, 520, 1.5); P.icon.laptop(c, 1220, 500, 1.6, t);
        // ekranda/sayfada küçük devre görselleri
        c.save(); c.translate(1150, 408); c.scale(0.3, 0.3); U.schSeries(c, 0, 0, 540, 300, 2, { w: 6, lit: 0.6 }); c.restore();
        U.txt(c, 'Farklı bağlanmış devre görselleri', 960, 800, { size: 44, align: 'center', alpha: E.se(t, sl + 1, sl + 2) });
      });
      // SERİ paneli
      const kS = E.se(t, ss + 0.2, ss + 2.2);
      if (kS > 0) {
        CK.card(ctx, 120, 190, 800, 690, { seed: 1811, alpha: Math.min(1, kS * 2) });
        P.write(ctx, 'Seri bağlama', 520, 270, E.seg(t, ss + 0.3, ss + 1.3), { size: 60, align: 'center' });
        U.schSeries(ctx, 250, 390, 540, 300, 2, { k: kS, bg: '#FAF6EC', lit: 0.5 * E.seg(t, ss + 2.2, ss + 2.8) });
        arrows(ctx, [[[222, 640], [222, 470]], [[285, 362], [385, 362]], [[818, 450], [818, 620]]], E.se(t, ss + 2.6, ss + 4.4));
        P.write(ctx, 'tek yol · ampuller art arda', 520, 810, E.seg(t, ss + 4.2, ss + 5.4), { size: 42, align: 'center', color: U.AMBER });
      }
      // PARALEL paneli
      const kP = E.se(t, sp + 0.2, sp + 2.2);
      if (kP > 0) {
        CK.card(ctx, 1000, 190, 800, 690, { seed: 1812, alpha: Math.min(1, kP * 2) });
        P.write(ctx, 'Paralel bağlama', 1400, 270, E.seg(t, sp + 0.3, sp + 1.3), { size: 60, align: 'center' });
        U.schParallel(ctx, 1130, 390, 560, 300, 2, { k: kP, bg: '#FAF6EC', lit: 0.8 * E.seg(t, sp + 2.2, sp + 2.8) });
        arrows(ctx, [[[1102, 500], [1102, 420]], [[1180, 362], [1370, 362]], [[1450, 362], [1650, 362]], [[1438, 420], [1438, 482]], [[1718, 420], [1718, 482]]], E.se(t, sp + 2.6, sp + 4.4));
        P.write(ctx, 'her ampul ayrı bir kolda', 1400, 810, E.seg(t, sp + 4.2, sp + 5.4), { size: 42, align: 'center', color: U.AMBER });
      }
      // çıkarım: iki çeşit bağlama
      const k2 = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (k2 > 0) {
        ctx.save(); ctx.globalAlpha = k2;
        P.drawOn(ctx, P.bez([330, 290], [520, 300], [710, 286], 20), E.se(t, s2 + 0.5, s2 + 1.2), { w: 4, color: PAL.light });
        P.drawOn(ctx, P.bez([1180, 290], [1400, 300], [1620, 286], 20), E.se(t, s2 + 0.9, s2 + 1.6), { w: 4, color: PAL.light });
        ctx.restore();
        E.inkText(ctx, '2 çeşit bağlama', 960, 180, t, s2 + 1.2, 1e9, { size: 50, align: 'center', color: U.AMBER });
      }
      // Damla (sağ altta, kaynakları incelerken büyüteçle)
      if (src > 0.02) E.layer(ctx, src, c => U.damla(c, t, { x: 300, y: 900, s: 1.1, view: 'q3', expr: 'curious', look: [0.9, -0.3], arms: [[-1, 0.35], [1, 2.0]], prop: 'lens', propTilt: -0.3 }));
    }
  });
})();

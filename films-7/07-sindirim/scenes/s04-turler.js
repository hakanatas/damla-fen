// SAHNE 4 — Enzim tanımı (yapısına girilmez) · fiziksel ve kimyasal sindirim karşılaştırması
(function () {
  const { PAL, stroke, line } = INK; const K = KIT, F = F07;
  E.scene({
    name: 'Fiziksel ve kimyasal sindirim', concept: 'Enzim; fiziksel ve kimyasal sindirimin farkı', from: 'enzyme', to: 'chemical', trFrom: [960, 500],
    draw(ctx, t) {
      const se = E.s('enzyme'), sp = E.s('physical'), sc = E.s('chemical');
      // enzim tanımı (ortada, sonra sağ sütuna küçülür)
      const ek = E.se(t, se + 0.2, se + 0.9, 'out'), eo = 1 - E.se(t, sp - 0.3, sp + 0.3);
      if (ek * eo > 0) E.layer(ctx, ek * eo, c => {
        K.card(c, 420, 240, 1080, 480, { seed: 7500, tint: PAL.light, tintA: 0.1 });
        F.enzyme(c, 640, 480, 2.0, 0.5 + 0.3 * Math.sin(t * 4));
        K.text(c, 'Enzim', 860, 380, { size: 64, color: K.AMBER_D });
        P.write(c, 'besinlerin parçalanmasını', 860, 470, E.seg(t, se + 1.0, se + 2.0), { size: 42 });
        P.write(c, 'hızlandıran özel madde', 860, 535, E.seg(t, se + 1.8, se + 2.8), { size: 42 });
        INK.label(c, 'çizim bir semboldür', 860, 640, { size: 28, alpha: 0.6 });
      });
      if (t < sp - 0.3) return;
      const ck = E.se(t, sp - 0.2, sp + 0.5);
      E.layer(ctx, ck, c => {
        K.card(c, 90, 190, 850, 690, { seed: 7510, tint: PAL.water, tintA: 0.07 });
        K.card(c, 980, 190, 850, 690, { seed: 7511, tint: PAL.light, tintA: 0.08 });
        K.text(c, 'Fiziksel sindirim', 515, 270, { size: 52, align: 'center', color: PAL.water });
        K.text(c, 'Kimyasal sindirim', 1405, 270, { size: 52, align: 'center', color: K.AMBER_D });
      });
      // fiziksel: elma parçası → küçük parçalar (aynı madde)
      const pk = E.se(t, sp + 1.0, sp + 3.0);
      ctx.save(); ctx.globalAlpha *= ck;
      if (pk < 1) F.apple(ctx, 515, 440, 1.3 * (1 - pk * 0.3), 0);
      if (pk > 0) { const R = INK.rng(7520); for (let i = 0; i < 7; i++) { const a = i / 7 * 6.28 + 0.3, d = 40 + R() * 70; const x = 515 + Math.cos(a) * d * pk * 1.6, y = 440 + Math.sin(a) * d * pk * 0.9; const s = 14 + R() * 10;
        const ch = [[x - s, y - s * 0.6], [x + s * 0.8, y - s], [x + s, y + s * 0.7], [x - s * 0.6, y + s]]; ctx.save(); ctx.globalAlpha *= pk; P.fillPts(ctx, ch, '#F4E3B0'); INK.wash(ctx, ch, '#B5553F', 0.3, 7521 + i, { bleed: 0.5, blooms: 0 }); stroke(ctx, ch.concat([ch[0]]), { w: 2, closed: true, dry: false }); ctx.restore(); } }
      P.write(ctx, 'büyük parça → küçük parçalar', 515, 610, E.seg(t, sp + 2.5, sp + 3.5), { size: 36, align: 'center' });
      P.write(ctx, 'maddenin yapısı değişmez', 515, 668, E.seg(t, sp + 3.4, sp + 4.4), { size: 38, align: 'center', color: PAL.water });
      K.text(ctx, 'örnek: çiğneme, midenin çalkalaması,', 515, 760, { size: 30, align: 'center', alpha: 0.85 * E.se(t, sp + 4.6, sp + 5.3) });
      K.text(ctx, 'safranın yağları damlacıklara ayırması', 515, 805, { size: 30, align: 'center', alpha: 0.85 * E.se(t, sp + 4.9, sp + 5.6) });
      // kimyasal: zincir + enzim → ayrı, farklı küçük maddeler
      const cut = E.se(t, sc + 2.2, sc + 3.4);
      const ex = E.lerp(1150, 1405, E.se(t, sc + 0.8, sc + 2.2));
      F.chain(ctx, 1405, 450, 6, cut);
      if (t > sc + 0.5 && t < sc + 4) { ctx.save(); ctx.globalAlpha *= Math.min(E.se(t, sc + 0.5, sc + 1), 1 - E.se(t, sc + 3.4, sc + 4)); F.enzyme(ctx, ex, 370, 0.8, 0.3 + 0.4 * Math.abs(Math.sin(t * 5))); ctx.restore(); }
      if (t > sc) K.text(ctx, 'enzim', 1150, 330, { size: 32, color: K.AMBER_D, alpha: E.se(t, sc + 0.5, sc + 1) * (1 - E.se(t, sc + 3.4, sc + 4)) });
      P.write(ctx, 'enzimlerle parçalanır', 1405, 610, E.seg(t, sc + 2.8, sc + 3.8), { size: 36, align: 'center' });
      P.write(ctx, 'yapısı farklı, çok küçük maddeler', 1405, 668, E.seg(t, sc + 3.6, sc + 4.6), { size: 36, align: 'center', color: K.AMBER_D });
      K.text(ctx, 'ağızda başlar, midede sürer,', 1405, 760, { size: 30, align: 'center', alpha: 0.85 * E.se(t, sc + 5.0, sc + 5.7) });
      K.text(ctx, 'ince bağırsakta tamamlanır', 1405, 805, { size: 30, align: 'center', alpha: 0.85 * E.se(t, sc + 5.3, sc + 6.0) });
      ctx.restore();
    }
  });
})();

// SAHNE 6 — Molekül yapılı elementler de formülle gösterilir (O₂, H₂, N₂) · bileşikle karşılaştırma (H₂O)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  const EL = [['O2', 380, 'oksijen'], ['H2', 760, 'hidrojen'], ['N2', 1140, 'azot']];
  E.scene({
    name: 'Elementler de formülle', concept: 'Molekül yapılı elementler: O₂, H₂, N₂', from: 'elements', to: 'o2', trFrom: [760, 420],
    draw(ctx, t) {
      const se = E.s('elements'), so = E.s('o2');
      EL.forEach(([f, x, nm], i) => {
        const at = se + 1.0 + i * 1.2;
        K.mol(ctx, f, x, 400, 72, E.seg(t, at, at + 0.8), { seed: 20 + i });
        K.formula(ctx, f, x, 610, 120, { align: 'center', k: E.seg(t, at + 0.6, at + 1.4), subColor: K.SUB });
        E.inkText(ctx, nm, x, 250, t, at + 0.3, 1e9, { size: 44, align: 'center', alpha: 0.85 });
      });
      // ayraç + H2O
      const hk = E.se(t, so + 0.2, so + 1.0);
      if (hk > 0) {
        ctx.save(); ctx.globalAlpha = hk; INK.dashed(ctx, K.linePts([1400, 210], [1400, 800], 120), { w: 2.4, on: 14, off: 12 }); ctx.restore();
        K.mol(ctx, 'H2O', 1650, 380, 66, E.seg(t, so + 0.4, so + 1.4), { seed: 30 });
        K.formula(ctx, 'H2O', 1650, 610, 120, { align: 'center', k: E.seg(t, so + 1.0, so + 1.8), subColor: K.SUB });
        E.inkText(ctx, 'su', 1650, 250, t, so + 0.6, 1e9, { size: 44, align: 'center', alpha: 0.85 });
      }
      // sınıflama etiketleri
      const ek = E.seg(t, so + 2.2, so + 3.2);
      if (ek > 0) {
        P.drawOn(ctx, [[300, 680], [304, 700], [1220, 698], [1224, 680]], ek, { w: 3 });
        P.write(ctx, 'tek cins atom  →  ELEMENT', 760, 770, ek, { size: 54, align: 'center', color: PAL.water });
      }
      const bk = E.seg(t, so + 5.4, so + 6.4);
      if (bk > 0) {
        P.drawOn(ctx, [[1520, 680], [1524, 700], [1776, 698], [1780, 680]], bk, { w: 3 });
        P.write(ctx, 'iki cins atom', 1650, 760, bk, { size: 46, align: 'center', color: K.AMBER });
        P.write(ctx, '→ BİLEŞİK', 1650, 822, E.seg(t, so + 6.2, so + 7.0), { size: 50, align: 'center', color: K.AMBER });
      }
    }
  });
})();

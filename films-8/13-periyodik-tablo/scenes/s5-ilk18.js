// SAHNE 5 — İlk 18 element: katman sayısı ↔ periyot, son katman elektron sayısı ↔ grup; Mg örneği; sınıf etiketleri; aynı grup → benzer özellik
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const TW = 176, TH = 132, X8 = 300, Y8 = 205, SX = 186, SY = 150;
  const pos8 = (g, p) => [X8 + (g - 1) * SX, Y8 + (p - 1) * SY];
  const GRP = [1, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  const PER = [1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3];
  E.scene({
    name: 'İlk 18 element', concept: 'Periyot, grup ve sınıf etiketi', from: 'first', to: 'labels', trFrom: [960, 400],
    draw(ctx, t) {
      const sf = E.s('first'), sm = E.s('mg'), sl = E.s('labels');
      // grup ve periyot başlıkları
      for (let g = 1; g <= 8; g++) { const [x] = pos8(g, 1); U.txt(ctx, g + 'A', x + TW / 2, Y8 - 12, { size: 34, align: 'center', color: PAL.water, alpha: E.se(t, sf + 1.2, sf + 2) }); }
      for (let p = 1; p <= 3; p++) { const [, y] = pos8(1, p); U.txt(ctx, p + '. periyot', X8 - 20, y + TH / 2 + 12, { size: 32, align: 'right', color: PAL.water, alpha: E.se(t, sf + 0.8, sf + 1.6) }); }
      for (let i = 0; i < 18; i++) {
        const z = i + 1, [x, y] = pos8(GRP[i], PER[i]);
        const k = E.se(t, sf + 0.1 + i * 0.08, sf + 0.6 + i * 0.08, 'out'); if (k <= 0) continue;
        const cls = U.clsOf(z), lk = E.se(t, sl + 0.2 + i * 0.12, sl + 0.7 + i * 0.12);
        const dim = (t > sm && t < sl && z !== 12) ? 0.4 : 1;
        E.layer(ctx, k * dim, c => {
          U.tile(c, x, y, TW, TH, U.SYM[i], z, U.NAMES[i], { lw: 2.2, tint: U.CLS[cls].c, tintA: 0.75 * lk });
          U.txt(c, U.shells(z).join(','), x + TW - 10, y + 30, { size: 26, align: 'right', color: PAL.water });
        });
      }
      // Mg örneği
      const mk = E.se(t, sm + 0.2, sm + 0.8) * (1 - E.se(t, sl, sl + 0.5));
      if (mk > 0) E.layer(ctx, mk, c => {
        const [x, y] = pos8(2, 3);
        stroke(c, U.rect(x - 8, y - 8, x + TW + 8, y + TH + 8), { w: 5, closed: true, color: U.AMBER, seed: 1701 });
        U.card(c, 300, 690, 1320, 210, { seed: 1702 });
        U.bohr(c, 440, 795, 12, 12, [2, 8, 2], t, { R0: 26, dR: 22, er: 7, nr: 3.6, spin: 0.3, seed: 12 });
        P.write(c, 'Mg: 2, 8, 2', 560, 760, E.seg(t, sm + 0.8, sm + 1.8), { size: 46 });
        P.write(c, '3 katman → 3. periyot', 560, 830, E.seg(t, sm + 2.2, sm + 3.4), { size: 44, color: PAL.water });
        P.write(c, 'son katmanda 2 elektron → 2A', 1080, 760, E.seg(t, sm + 3.8, sm + 5.0), { size: 36, color: PAL.water });
        P.write(c, '→ metal bölgesi', 1080, 830, E.seg(t, sm + 5.4, sm + 6.2), { size: 44, color: '#4E5E75' });
      });
      // renk anahtarı + 8A grubu vurgusu
      const lk = E.se(t, sl + 0.4, sl + 1.0);
      if (lk > 0) {
        ['metal', 'ametal', 'yari', 'soy'].forEach((k, i) => {
          const x = 300 + i * 330, y = 700;
          ctx.save(); ctx.globalAlpha *= lk; P.fillPts(ctx, U.rect(x, y, x + 44, y + 40), U.CLS[k].c, 0.85); ctx.strokeStyle = PAL.ink; ctx.lineWidth = 2; ctx.strokeRect(x, y, 44, 40); ctx.restore();
          U.txt(ctx, U.CLS[k].name, x + 56, y + 34, { size: 38, alpha: lk });
        });
        const gk = E.se(t, sl + 3.6, sl + 4.4);
        if (gk > 0) {
          const [x] = pos8(8, 1); ctx.save(); ctx.globalAlpha *= gk; stroke(ctx, U.rect(x - 10, Y8 - 10, x + TW + 10, Y8 + 2 * SY + TH + 10), { w: 4.5, closed: true, color: '#2F7A70', seed: 1711 }); ctx.restore();
          P.write(ctx, 'Aynı grup → genellikle benzer kimyasal özellik', 300, 820, gk, { size: 42, color: '#2F7A70' });
          P.write(ctx, '(8A: He, Ne, Ar hepsi kararlı)', 300, 875, E.seg(t, sl + 4.6, sl + 5.6), { size: 38, color: '#2F7A70' });
        }
      }
      U.damla(ctx, t, { x: 1790, y: 900, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.2], arms: [[-1, 1.4], [1, 0.4]], prop: 'notebook' });
    }
  });
})();

// SAHNE 3 — Karşılaştırma: yapılandırılmış grid (FB.7.1.1 b benzerlikler, c farklılıklar · KB2.7)
(function () {
  const { PAL, line, stroke } = INK;
  const F = U7;
  const X0 = 200, NW = 390, CW = 244, Y0 = 250, HH = 110, RH = 112;
  const ROWS = [
    { n: 'Yapay uydu', v: [1, 1, 0, 1, 0], d: (c, x, y, t) => F.satellite(c, x, y, 0.26, t) },
    { n: 'Uzay sondası', v: [1, 1, 0, 0, 1], d: (c, x, y, t) => P.icon.probe(c, x, y, 0.4, t) },
    { n: 'Uzay istasyonu', v: [1, 1, 1, 1, 0], d: (c, x, y, t) => F.station(c, x, y, 0.17, t) },
    { n: 'Gezici araç', v: [1, 1, 0, 0, 1], d: (c, x, y, t) => F.rover(c, x, y + 30, 0.3, t) }
  ];
  const HEAD = [['insan', 'yapımı'], ['uzayı keşfe', 'yardım eder'], ['insanlı'], ['Dünya’nın', 'çevresinde'], ['uzak gök', 'cismine gider']];
  E.scene({
    name: 'Karşılaştır', concept: 'Benzerlik ve farklılık', from: 'same', to: 'diff', trFrom: [960, 540],
    draw(ctx, t) {
      const sa = E.s('same'), sd = E.s('diff');
      const X1 = X0 + NW + CW * 5, Y1 = Y0 + HH + RH * ROWS.length;
      // bantlar
      const bk = E.se(t, sa + 0.6, sa + 1.4), fk = E.se(t, sd + 0.2, sd + 1.0);
      ctx.save(); ctx.globalAlpha = 0.18 * bk; ctx.fillStyle = PAL.life; ctx.fillRect(X0 + NW, Y0 - 70, CW * 2, Y1 - Y0 + 70); ctx.restore();
      ctx.save(); ctx.globalAlpha = 0.2 * fk; ctx.fillStyle = PAL.light; ctx.fillRect(X0 + NW + CW * 2, Y0 - 70, CW * 3, Y1 - Y0 + 70); ctx.restore();
      INK.label(ctx, 'BENZERLİKLER', X0 + NW + CW, Y0 - 22, { size: 36, weight: 700, align: 'center', color: '#4E6B22', alpha: bk });
      INK.label(ctx, 'FARKLILIKLAR', X0 + NW + CW * 3.5, Y0 - 22, { size: 36, weight: 700, align: 'center', color: F.AMBER_D, alpha: fk });
      // çizgiler
      const gk = E.se(t, sa + 0.1, sa + 1.2);
      P.drawOn(ctx, [[X0, Y0], [X1, Y0 + 2]], gk, { w: 2.6, seed: 31 });
      P.drawOn(ctx, [[X0, Y0 + HH], [X1, Y0 + HH + 1]], gk, { w: 2.6, seed: 32 });
      for (let r = 1; r <= ROWS.length; r++) P.drawOn(ctx, [[X0, Y0 + HH + RH * r], [X1, Y0 + HH + RH * r - 1]], gk, { w: 1.6, alpha: 0.6, seed: 33 + r });
      for (let c = 0; c <= 5; c++) { const x = X0 + NW + CW * c; P.drawOn(ctx, [[x, Y0], [x + 1, Y1]], gk, { w: c === 2 ? 3.2 : 1.6, alpha: c === 2 ? 1 : 0.6, seed: 40 + c }); }
      // başlıklar
      HEAD.forEach((h, c) => { const k = E.se(t, c < 2 ? sa + 0.8 + c * 0.4 : sd + 0.4 + (c - 2) * 0.4, (c < 2 ? sa + 1.4 + c * 0.4 : sd + 1.0 + (c - 2) * 0.4)); const x = X0 + NW + CW * (c + 0.5);
        h.forEach((ln, j) => INK.label(ctx, ln, x, Y0 + (h.length === 1 ? 68 : 48 + j * 38), { size: 32, weight: 700, align: 'center', alpha: k })); });
      // satırlar
      ROWS.forEach((r, i) => {
        const y = Y0 + HH + RH * (i + 0.5), k = E.se(t, sa + 0.4 + i * 0.3, sa + 1.0 + i * 0.3); if (k <= 0) return;
        E.layer(ctx, k, c => { r.d(c, X0 + 60, y, t); INK.label(c, r.n, X0 + 125, y + 14, { size: 38, weight: 700 }); });
        r.v.forEach((v, c) => { const x = X0 + NW + CW * (c + 0.5); const at = c < 2 ? sa + 2.0 + i * 0.35 + c * 0.15 : sd + 1.8 + (c - 2) * 1.3 + i * 0.3; F.tick(ctx, x, y, E.se(t, at, at + 0.4), !!v); });
      });
      INK.label(ctx, 'çoğu güneş paneliyle enerji üretir', X0 + NW + CW, Y1 + 50, { size: 30, align: 'center', alpha: 0.8 * E.se(t, sa + 5.5, sa + 6.3), color: '#4E6B22' });
      INK.label(ctx, '✓ var   ✗ yok', X1, Y1 + 50, { size: 30, align: 'right', alpha: 0.7 * gk });
      DAMLA.draw(ctx, { x: 105, y: 905, s: 0.62, view: 'q3', expr: t > sd ? 'thinking' : 'curious', look: [0.8, -0.3], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.35], [1, 1.9 + 0.2 * Math.sin(t * 2)]] });
    }
  });
})();

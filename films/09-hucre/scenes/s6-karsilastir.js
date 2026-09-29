// SAHNE 6 — Karşılaştırma tablosu: benzerlikler (b) ve farklılıklar (c) listelenir
(function () {
  const { PAL, line, stroke } = INK;
  const ROWS = [
    ['hücre zarı', 'var', 'var'], ['sitoplazma', 'var', 'var'], ['çekirdek', 'var', 'var'], ['mitokondri', 'var', 'var'],
    ['hücre duvarı', 'var', 'yok'], ['kloroplast', 'var', 'yok'], ['koful', 'büyük, az', 'küçük, çok'], ['şekil', 'köşeli', 'yuvarlak']
  ];
  const X0 = 250, X1 = 950, X2 = 1310, XE = 1490, Y0 = 300, RH = 66;
  E.scene({
    name: 'Karşılaştır', concept: 'Benzer ve farklı özellikler', from: 'compare', to: 'diff', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F09, sc = E.s('compare'), ss = E.s('same'), sd = E.s('diff');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      // header
      const kh = E.se(t, sc + 0.3, sc + 1.3);
      P.write(ctx, 'Bitki hücresi', X1, 245, kh, { size: 44, align: 'center', color: '#3E5A1A' });
      P.write(ctx, 'Hayvan hücresi', X2, 245, kh, { size: 44, align: 'center', color: '#6B3D2A' });
      P.drawOn(ctx, [[X0 - 20, Y0 - 34], [XE, Y0 - 38]], E.se(t, sc + 0.8, sc + 1.8), { w: 3 });
      P.drawOn(ctx, [[X1 - 180, 200], [X1 - 180, Y0 + RH * 8 - 30]], E.se(t, sc + 1, sc + 2), { w: 2, alpha: 0.6 });
      P.drawOn(ctx, [[X2 - 180, 200], [X2 - 180, Y0 + RH * 8 - 30]], E.se(t, sc + 1, sc + 2), { w: 2, alpha: 0.6 });
      ROWS.forEach(([n, a, b], i) => {
        const y = Y0 + i * RH + 22;
        const at = i < 4 ? ss + 0.4 + i * 1.1 : sd + 0.6 + (i - 4) * 1.5;
        const k = E.se(t, at, at + 0.7); if (k <= 0) return;
        if (i === 4) P.drawOn(ctx, [[X0 - 20, y - 48], [XE, y - 50]], k, { w: 1.6, alpha: 0.5 });
        P.write(ctx, n, X0, y, k, { size: 42 });
        const colA = a === 'yok' ? '#6B3D2A' : PAL.ink, colB = b === 'yok' ? '#6B3D2A' : PAL.ink;
        P.write(ctx, a, X1, y, E.se(t, at + 0.3, at + 1.0), { size: 40, align: 'center', weight: a === 'var' ? 700 : 700, color: colA });
        P.write(ctx, b, X2, y, E.se(t, at + 0.5, at + 1.2), { size: 40, align: 'center', color: colB });
      });
      // brackets
      const kb1 = E.se(t, ss + 4.8, ss + 5.8);
      if (kb1 > 0) {
        const y0 = Y0 - 20, y1 = Y0 + 4 * RH - 18;
        ctx.save(); ctx.globalAlpha = 0.25 * kb1; ctx.fillStyle = PAL.life; ctx.fillRect(X0 - 30, y0, XE - X0 + 40, y1 - y0); ctx.restore();
        P.drawOn(ctx, [[XE + 20, y0], [XE + 40, y0 + 6], [XE + 40, y1 - 6], [XE + 20, y1]], kb1, { w: 3, color: '#3E5A1A' });
        P.write(ctx, 'benzer', XE + 50, (y0 + y1) / 2 + 14, kb1, { size: 40, color: '#3E5A1A' });
      }
      const kb2 = E.se(t, sd + 6.6, sd + 7.6);
      if (kb2 > 0) {
        const y0 = Y0 + 4 * RH - 18, y1 = Y0 + 8 * RH - 18;
        ctx.save(); ctx.globalAlpha = 0.22 * kb2; ctx.fillStyle = PAL.light; ctx.fillRect(X0 - 30, y0, XE - X0 + 40, y1 - y0); ctx.restore();
        P.drawOn(ctx, [[XE + 20, y0], [XE + 40, y0 + 6], [XE + 40, y1 - 6], [XE + 20, y1]], kb2, { w: 3, color: '#8A4A10' });
        P.write(ctx, 'farklı', XE + 50, (y0 + y1) / 2 + 14, kb2, { size: 40, color: '#8A4A10' });
      }
      DAMLA.draw(ctx, { x: 1830, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > sd + 7.5 ? 'happy' : 'thinking', look: [-0.7, -0.4], blink: E.blink(t, 10), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

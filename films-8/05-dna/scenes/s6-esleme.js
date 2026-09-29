// SAHNE 6 — DNA'nın kendini eşlemesi (çift zincirli yapı üzerinden, basitçe) · eşleme hataları ve onarım
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT, F = G8;
  const SEQ = 'TACGGATC', N = 8;
  E.scene({
    name: 'DNA eşlenmesi', concept: 'Kalıp zincir, iki özdeş DNA', from: 'copy', to: 'error', trFrom: [960, 300],
    draw(ctx, t) {
      const sc = E.s('copy'), s2 = E.s('copy2'), se = E.s('error');
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const sep = E.seg(t, sc + 1.2, sc + 6.2);
      const rowSep = i => E.ease.io(E.clamp(sep * (N + 3) / 3 - i / 3));
      const D = 260;
      const newK = E.se(t, s2 + 1.0, s2 + 3.5);
      const dim = 1 - 0.7 * E.se(t, se + 0.2, se + 1.0);
      E.layer(ctx, dim, c => {
        const base = { y: 250, n: N, gap: 70, u: 66, h: 14, seq: SEQ, detail: true, ds: 0.95 };
        F.dna(c, Object.assign({}, base, { x: 960, dx: i => -rowSep(i) * D, L: { k: 1 }, R: { k: newK, ghost: true } }));
        F.dna(c, Object.assign({}, base, { x: 960, dx: i => rowSep(i) * D, L: { k: newK, ghost: true }, R: { k: 1 } }));
        const lk = E.se(t, s2 + 4.0, s2 + 5.0);
        if (lk > 0) { c.save(); c.globalAlpha *= lk;
          K.text(c, 'DNA 1', 700, 830, { size: 46, align: 'center' }); K.text(c, 'DNA 2', 1220, 830, { size: 46, align: 'center' });
          K.text(c, '= birbirinin aynısı', 960, 890, { size: 40, align: 'center', color: K.LIFE_D });
          // gösterge
          line(c, [1500, 330], [1560, 330], { w: 7, color: '#6B5A44', dry: false }); K.text(c, 'eski zincir (kalıp)', 1580, 342, { size: 34 });
          line(c, [1500, 390], [1560, 390], { w: 7, color: '#9C8F7C', dry: false, alpha: 0.6 }); K.text(c, 'yeni zincir', 1580, 402, { size: 34 });
          c.restore(); }
        if (t > sc + 1.5 && t < s2 + 1) E.inkText(c, 'fermuar gibi ayrılıyor', 1300, 250, t, sc + 2.0, s2 + 1.0, { size: 42, color: '#8A4A10' });
      });
      // hata ve onarım büyüteci
      const ek = E.se(t, se + 0.4, se + 1.2, 'out');
      if (ek > 0) E.layer(ctx, ek, c => {
        const x = 960, y = 470, r = 250; const cp = circlePts(x, y, r, r, 80);
        P.fillPts(c, cp, '#FBF8F1', 1); stroke(c, cp, { w: 5, closed: true, seed: 950 }); line(c, [x + r * 0.72, y + r * 0.72], [x + r * 1.05, y + r * 1.05], { w: 12, taper: 0.02 });
        const fix = E.se(t, se + 2.8, se + 3.8);
        const u = 110;
        F.base(c, 'A', x - u, y - 60, 0, u, 24, { seed: 960 });
        if (fix < 1) { c.save(); c.globalAlpha *= 1 - fix; F.base(c, 'C', x + u, y - 60, Math.PI, u, 24, { seed: 961 }); c.restore(); P.cross(c, x + 175, y - 150, 22, E.se(t, se + 1.6, se + 2.1) * (1 - fix), { color: K.RED, w: 6 }); }
        if (fix > 0) { c.save(); c.globalAlpha *= fix; F.base(c, 'T', x + u, y - 60, Math.PI, u, 24, { seed: 962 }); c.restore(); P.check(c, x + 175, y - 160, 50, E.se(t, se + 3.8, se + 4.3), { color: K.LIFE_D }); }
        K.text(c, 'hata → onarım', x, y + 60, { size: 44, align: 'center', alpha: E.se(t, se + 2.8, se + 3.6) });
        const nk = E.se(t, se + 4.6, se + 5.4);
        if (nk > 0) { c.save(); c.globalAlpha *= nk; K.text(c, 'Onarılamayan hata →', x, y + 130, { size: 40, align: 'center', color: '#8A4A10' }); K.text(c, 'kalıcı değişiklik', x, y + 180, { size: 40, align: 'center', color: '#8A4A10' }); c.restore(); }
      });
      K.damla(ctx, t, { x: 260, y: 880, s: 1.15, expr: t > s2 + 4 && t < se ? 'happy' : 'curious', look: [0.8, -0.2], talk: E.talk(t), arms: [[-1, 0.4], [1, 1.6]] });
    }
  });
})();

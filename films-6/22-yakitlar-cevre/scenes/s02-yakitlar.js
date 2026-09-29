// SAHNE 2 — Beyin fırtınası ile yakıt türleri; katı / sıvı / gaz olarak kısaca sınıflandırma (FB.6.7.3 uygulama metni)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  const ORDER = ['odun', 'komur', 'fuel', 'dogal', 'tup'];
  const BRAIN = [[820, 330], [1500, 300], [1660, 620], [1180, 720], [780, 640]];
  const COLS = [['Katı', '#8A6A45', 900], ['Sıvı', PAL.water, 1270], ['Gaz', '#6F6B66', 1640]];
  E.scene({
    name: 'Yakıtlar', concept: 'Yakıt türleri: katı, sıvı, gaz', from: 'brainstorm', to: 'classify', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('brainstorm'), sc = E.s('classify');
      ctx.fillStyle = 'rgba(181,85,63,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      // merkez fikir
      const cA = 1 - E.se(t, sc + 0.2, sc + 0.8);
      if (cA > 0) E.layer(ctx, cA, c => {
        const k = E.se(t, sb + 0.2, sb + 0.8, 'out');
        const cp = INK.wobble(circlePts(1210, 500, 190 * P.pop(k), 90 * P.pop(k), 50), 3, 31);
        P.fillPts(c, cp, '#F6E7B8'); stroke(c, cp, { w: 3, closed: true, seed: 32 });
        if (k > 0.8) { F.fit(c, 'Isınmak için', 1210, 490, 320, 42); F.fit(c, 'ne yakıyoruz?', 1210, 540, 320, 42, { color: F.HEAT }); }
        ORDER.forEach((key, i) => { const at = sb + 1.2 + i * 1.0; const lk = E.se(t, at - 0.2, at + 0.3); if (lk > 0) P.drawOn(c, [[1210 + (BRAIN[i][0] - 1210) * 0.42, 500 + (BRAIN[i][1] - 500) * 0.42], [1210 + (BRAIN[i][0] - 1210) * 0.72, 500 + (BRAIN[i][1] - 500) * 0.72]], lk, { w: 2.4, dry: false }); });
      });
      // başlıklar
      COLS.forEach(([name, col, x], i) => {
        const k = E.se(t, sc + 0.4 + i * 0.3, sc + 1.0 + i * 0.3, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { const hb = F.rr(x - 150, 180, 300, 76, 12); P.fillPts(c, hb, '#FBF8F1'); wash(c, hb, col, 0.4, 40 + i, { bleed: 1, blooms: 0 }); stroke(c, hb, { w: 2.6, closed: true, seed: 44 + i }); F.fit(c, name, x, 234, 260, 50); });
      });
      // yakıt kartları
      const rows = [0, 0, 0];
      ORDER.forEach((key, i) => {
        const fu = F.FUELS[key]; const at = sb + 1.2 + i * 1.0, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const row = rows[fu.hal]++;
        const mv = E.se(t, sc + 1.4 + i * 0.6, sc + 2.3 + i * 0.6);
        const x = E.lerp(BRAIN[i][0], COLS[fu.hal][2], mv), y = E.lerp(BRAIN[i][1], 400 + row * 230, mv);
        ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k) * E.lerp(1, 0.92, mv), P.pop(k) * E.lerp(1, 0.92, mv));
        F.card(ctx, -140, -95, 280, 190, 50 + i, { blur: 12 });
        fu.draw(ctx, 0, -20, 0.85, t);
        F.fit(ctx, fu.name, 0, 76, 250, 38);
        ctx.restore();
      });
      const nk = E.se(t, sc + 5.4, sc + 6.2, 'out');
      if (nk > 0) { ctx.save(); ctx.globalAlpha = nk; F.fit(ctx, 'Hepsi yanarken ısı verir.', 1270, 880, 700, 40, { color: F.HEAT }); ctx.restore(); }
      F.damla(ctx, t, { x: 330, y: 890, expr: t > sc ? 'happy' : 'thinking', view: 'q3', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

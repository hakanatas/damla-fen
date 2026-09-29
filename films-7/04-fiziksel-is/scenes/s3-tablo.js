// SAHNE 3 — Matris tablo (OB7, KB2.6): kuvvetin yönü ↔ hareket doğrultusu; karşılaştırma ve değerlendirme
(function () {
  const { PAL, line, stroke } = INK;
  const F = F7E;
  const COLS = [340, 190, 210, 290, 200];
  const ROWS = [
    ['Durum', 'Kuvvet', 'Hareket', 'Aynı doğrultu?', 'Fiziksel iş'],
    ['1 · kutu itme', '→ sağa', '→ sağa', 'evet', ''],
    ['2 · duvar itme', '→ sağa', 'yok', '—', ''],
    ['3 · çanta kaldırma', '↑ yukarı', '↑ yukarı', 'evet', ''],
    ['4 · çanta taşıma', '↑ yukarı', '→ yatay', 'hayır (dik)', '']
  ];
  const X0 = 160, Y0 = 215, RH = 106;
  E.scene({
    name: 'Matris tablo', concept: 'Verileri kaydetme ve karşılaştırma', from: 'table', to: 'nowork', trFrom: [700, 500],
    draw(ctx, t) {
      const st = E.s('table'), sc = E.s('compare'), sn = E.s('nowork');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 110, 175, 1400, 740, { grid: 34 });
      const W = COLS.reduce((a, b) => a + b, 0);
      // vurgular
      [[1, sc + 0.6], [3, sc + 1.4]].forEach(([r, at]) => { const k = E.se(t, at, at + 0.6); if (k > 0) P.fillPts(ctx, F.rect(X0, Y0 + r * RH + 4, X0 + W * k, Y0 + (r + 1) * RH - 4), PAL.light, 0.22); });
      [[2, sn + 0.6], [4, sn + 3.2]].forEach(([r, at]) => { const k = E.se(t, at, at + 0.6); if (k > 0) P.fillPts(ctx, F.rect(X0, Y0 + r * RH + 4, X0 + W * k, Y0 + (r + 1) * RH - 4), PAL.water, 0.1); });
      F.table(ctx, X0, Y0, COLS, ROWS, RH, i => E.se(t, st + 0.5 + i * 1.3, st + 1.7 + i * 1.3), { size: 36, colColor: [null, F.FORCE, F.DISP, null, null] });
      const ix = X0 + W - COLS[4] / 2;
      [1, 3].forEach((r, j) => P.check(ctx, ix - 10, Y0 + r * RH + 50, 50, E.se(t, sc + 2.4 + j * 0.8, sc + 2.9 + j * 0.8), { w: 6 }));
      [[2, sn + 1.2], [4, sn + 4.0]].forEach(([r, at]) => P.cross(ctx, ix, Y0 + r * RH + 52, 22, E.se(t, at, at + 0.6), { w: 5 }));
      // Damla
      const happy = t > sc + 3;
      DAMLA.draw(ctx, { x: 1700, y: 880, s: 1.05, view: 'q3', flip: true, expr: t > sn + 5 ? 'happy' : (happy ? 'curious' : 'neutral'), look: [-0.8, 0.2], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 1,
        arms: t < sc ? [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] : [[-1, [-95, -140]], [1, 0.4]], prop: t < sc ? 'notebook' : null });
    }
  });
})();

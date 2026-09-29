// SAHNE 9 — Sonuç çıkarma (c) · gözlemlenmemiş durum için tahmin (ç) · tahminin geçerliğini sorgulama (d)
(function () {
  const { PAL, line } = INK;
  const U = U5;
  E.scene({
    name: 'Sonuç ve tahmin', concept: 'Çıkarım, tahmin, sorgulama', from: 'infer', to: 'question', trFrom: [960, 540],
    draw(ctx, t) {
      const si = E.s('infer'), sp = E.s('predict'), sq = E.s('question');
      // sonuç: renk → tür
      const ik = E.se(t, si + 0.2, si + 0.8, 'out');
      if (ik > 0) E.layer(ctx, ik, c => {
        U.card(c, 150, 180, 800, 430, { seed: 5400 });
        P.write(c, 'Ayıracın rengi → maddenin türü', 190, 250, E.seg(t, si + 0.5, si + 1.8), { size: 42, color: U.CABBAGE });
        [['#C8233F', 'asit', U.ACID], [U.CABBAGE, 'nötr', PAL.ink], ['#3E9A4A', 'baz', U.BASE]].forEach(([col, w, tc], i) => {
          const at = si + 1.8 + i * 0.9; const k = E.se(t, at, at + 0.5); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; U.beaker(c, 300 + i * 250, 520, 0.8, { liq: col, lvl: 0.6, seed: 5410 + i }); U.txt(c, w, 300 + i * 250, 580, { size: 40, align: 'center', color: tc }); c.restore();
        });
        U.txt(c, '(mor lahana suyu)', 910, 250 + 46, { size: 28, align: 'right', alpha: 0.55 });
      });
      // tahmin: amonyaklı cam temizleyicisi
      const pk = E.se(t, sp + 0.2, sp + 0.8, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        U.product(c, 1130, 610, 0.95, { col: '#CFE0F2', cap: '#3D6FBE', label: 'CAM TEMİZLEYİCİ', sub: 'amonyaklı', subSize: 24, seed: 5420, w: 130, h: 260, ghs: 'excl' });
        U.txt(c, 'denenmedi!', 1130, 660, { size: 34, align: 'center', color: U.AMBER });
        U.strip(c, 1400, 250, 40, 240, U.LIT.red, U.LIT.red, 0, 0, { seed: 5430 });
        U.txt(c, 'kırmızı turnusol', 1400, 540, { size: 30, align: 'center', alpha: 0.75 });
        const ak = E.se(t, sp + 3.2, sp + 4.2);
        if (ak > 0) P.arrow(c, [1450, 370], [1560, 370], ak, { w: 3.5, head: 14, color: PAL.water });
        const gk = E.se(t, sp + 4.2, sp + 5.0);
        if (gk > 0) { c.save(); c.globalAlpha *= gk; const r = U.rect(1600, 250, 1640, 490); P.fillPts(c, r, U.LIT.blue, 0.35); const d = []; r.forEach((p, i) => { if (i) { const q = r[i - 1]; for (let s = 0; s <= 1; s += 0.02) d.push([q[0] + (p[0] - q[0]) * s, q[1] + (p[1] - q[1]) * s]); } }); INK.dashed(c, d, { w: 2.4, color: PAL.ink, on: 10, off: 8 }); c.restore(); }
        P.write(c, 'tahmin: mavi', 1620, 595, E.seg(t, sp + 5.0, sp + 6.0), { size: 36, align: 'center', color: U.BASE });
      });
      // sorgulama
      const qk = E.se(t, sq + 0.2, sq + 0.8, 'out');
      if (qk > 0) E.layer(ctx, qk, c => {
        U.card(c, 150, 700, 1360, 185, { seed: 5440, tint: PAL.light, tintA: 0.14 });
        P.write(c, '? Her asit ve baz aynı rengi verir mi?', 190, 770, E.seg(t, sq + 0.6, sq + 2.0), { size: 44 });
        P.write(c, 'zayıf olanlarda renk az değişebilir → deneyle sına', 220, 845, E.seg(t, sq + 3.4, sq + 5.0), { size: 38, color: U.AMBER });
      });
      U.damla(ctx, t, { x: 1720, y: 890, s: 0.85, flip: true, expr: t > sq ? 'thinking' : 'curious', look: [-0.8, -0.2], arms: [[-1, t > sp && t < sq ? 2.2 : 1.2], [1, 0.4]] });
    }
  });
})();

// SAHNE 5 — Veri topla ve kaydet (tablo), yorumla (denge), eleştirel bak ("ormanlar dünyanın akciğeri")
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  // hücre içeriği: ['CO2','+','su'] gibi parçalar (formül ya da düz yazı)
  function cell(ctx, parts, x, y, size) {
    let cx = x;
    parts.forEach(p => {
      if (/^(CO2|O2|H2O)$/.test(p)) { const w = U.formula(ctx, p, cx, y, size, { align: 'left', color: p === 'O2' ? U.O2C : U.CO2C }); cx += w + 14; }
      else { ctx.save(); ctx.font = `700 ${size}px Kalam`; const w = ctx.measureText(p).width; ctx.restore(); U.txt(ctx, p, cx, y, { size }); cx += w + 14; }
    });
  }
  const ROWS = [
    ['fotosentez', ['CO2', '+ su'], ['O2', '+ besin'], PAL.life],
    ['solunum', ['O2'], ['CO2'], PAL.ink],
    ['ayrıştırma', ['O2'], ['CO2'], '#8A6A45'],
    ['yanma', ['O2'], ['CO2'], U7.HEAT]
  ];
  const X = [250, 660, 960, 1260], Y0 = 330, RH = 105;
  E.scene({
    name: 'Veri ve yorum', concept: 'Şemadan veri toplama, kaydetme, yorumlama', from: 'table', to: 'lungs', trFrom: [960, 540],
    draw(ctx, t) {
      const sT = E.s('table'), sB = E.s('balance'), sL = E.s('lungs');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 130, 170, 1660, 740);
      const tabK = 1 - E.se(t, sL - 0.2, sL + 0.5);
      if (tabK > 0) E.layer(ctx, tabK, c => {
        // tablo çizgileri
        const gk = E.seg(t, sT + 0.2, sT + 1.4);
        P.drawOn(c, [[X[0] - 30, Y0 - 20], [X[3], Y0 - 20]], gk, { w: 3 });
        P.drawOn(c, [[X[1] - 30, Y0 - 90], [X[1] - 30, Y0 + RH * 4 - 20]], gk, { w: 2.4 });
        P.drawOn(c, [[X[2] - 30, Y0 - 90], [X[2] - 30, Y0 + RH * 4 - 20]], gk, { w: 2.4 });
        U.txt(c, 'Süreç', X[0], Y0 - 40, { size: 44, color: U.AMBER, alpha: gk });
        U.txt(c, 'Alır', X[1], Y0 - 40, { size: 44, color: U.AMBER, alpha: gk });
        U.txt(c, 'Verir', X[2], Y0 - 40, { size: 44, color: U.AMBER, alpha: gk });
        ROWS.forEach(([name, inn, out, col], i) => {
          const at = sT + 1.6 + i * 1.6, y = Y0 + 60 + i * RH, k = E.se(t, at, at + 0.6);
          if (k <= 0) return;
          P.write(c, name, X[0], y, E.seg(t, at, at + 0.7), { size: 44, color: col });
          c.save(); c.globalAlpha *= E.se(t, at + 0.4, at + 1.0); cell(c, inn, X[1], y, 44); cell(c, out, X[2], y, 44); c.restore();
          if (i < 3) { c.save(); c.globalAlpha *= 0.3 * k; line(c, [X[0] - 30, y + 40], [X[3], y + 40], { w: 1.4, dry: false }); c.restore(); }
        });
        // denge döngüsü
        const bk = E.se(t, sB + 0.2, sB + 1.0, 'out');
        if (bk > 0) {
          c.save(); c.globalAlpha *= bk;
          const A = [1400, 520], B = [1650, 520];
          U.gas(c, 'CO2', A[0], A[1], 70, U.CO2C); U.gas(c, 'O2', B[0], B[1], 70, U.O2C);
          c.restore();
          U.flow(c, [A[0] + 10, A[1] - 70], [B[0] - 10, B[1] - 70], E.seg(t, sB + 0.8, sB + 2.0), { c: [1525, 330], color: PAL.life, w: 4.5, label: 'fotosentez', ly: 350, size: 36, lcolor: U.GREEN });
          U.flow(c, [B[0] - 10, B[1] + 70], [A[0] + 10, A[1] + 70], E.seg(t, sB + 1.8, sB + 3.0), { c: [1525, 710], color: PAL.ink, w: 4.5, label: 'solunum · yanma', ly: 720, size: 34 });
          P.write(c, 'denge → hava yenilenir', 1430, 830, E.seg(t, sB + 3.4, sB + 4.6), { size: 38, align: 'center', color: PAL.water });
          // veri satırlarını vurgula
          c.save(); c.globalAlpha *= 0.8 * E.se(t, sB + 1, sB + 1.6); stroke(c, circlePts(X[0] + 100, Y0 + 45, 150, 46, 40), { w: 3, closed: true, color: PAL.life, dry: false }); stroke(c, circlePts(X[0] + 100, Y0 + 45 + RH, 140, 44, 40), { w: 3, closed: true, dry: false }); c.restore();
        }
      });
      // "Ormanlar dünyanın akciğeridir" — eleştirel bakış
      const lk = E.se(t, sL, sL + 0.7);
      if (lk > 0) E.layer(ctx, lk, c => {
        P.write(c, '“Ormanlar dünyanın akciğeridir.”', 960, 280, E.seg(t, sL + 0.3, sL + 1.5), { size: 58, align: 'center' });
        // akciğer
        const lx = 560, ly = 540;
        [-1, 1].forEach(sd => { const lobe = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283; lobe.push([lx + sd * 70 + Math.cos(a) * 58 * (1 + 0.1 * sd * Math.cos(a)), ly + 10 + Math.sin(a) * 100]); } P.fillPts(c, lobe, '#E9B8A8', 0.9); stroke(c, lobe, { w: 3, closed: true, dry: false, seed: 2740 + sd }); });
        line(c, [lx, ly - 150], [lx, ly - 60], { w: 8, dry: false }); line(c, [lx, ly - 60], [lx - 40, ly - 20], { w: 5, dry: false }); line(c, [lx, ly - 60], [lx + 40, ly - 20], { w: 5, dry: false });
        U.txt(c, 'akciğer', lx, ly + 150, { size: 42, align: 'center' });
        const ak = E.se(t, sL + 2, sL + 2.6);
        c.save(); c.globalAlpha *= ak; U.txt(c, 'alır:', lx - 340, ly - 20, { size: 38 }); U.formula(c, 'O2', lx - 225, ly - 20, 42, { align: 'left', color: U.O2C }); U.txt(c, 'verir:', lx - 340, ly + 50, { size: 38 }); U.formula(c, 'CO2', lx - 225, ly + 50, 42, { align: 'left', color: U.CO2C }); c.restore();
        // ağaç
        const tx = 1300;
        U.tree(c, tx, ly + 110, 1.1, t, { seed: 5 });
        U.txt(c, 'orman', tx, ly + 150, { size: 42, align: 'center', color: U.GREEN });
        const bk = E.se(t, sL + 3.4, sL + 4.0);
        c.save(); c.globalAlpha *= bk; U.txt(c, 'alır:', tx + 130, ly - 20, { size: 38 }); U.formula(c, 'CO2', tx + 250, ly - 20, 42, { align: 'left', color: U.CO2C }); U.txt(c, 'verir:', tx + 130, ly + 50, { size: 38 }); U.formula(c, 'O2', tx + 250, ly + 50, 42, { align: 'left', color: U.O2C }); c.restore();
        // ≠ ve sonuç
        const nk = E.se(t, sL + 4.4, sL + 5.0);
        c.save(); c.globalAlpha *= nk; U.txt(c, '≠', 930, ly + 40, { size: 110, align: 'center' }); c.restore();
        P.write(c, 'benzetme tam değil…', 700, 800, E.seg(t, sL + 5.2, sL + 6.2), { size: 44, align: 'center' });
        P.check(c, 1060, 780, 38, E.se(t, sL + 6.6, sL + 7.2), { w: 5, color: U.GREEN });
        P.write(c, 'ama önemini anlatır', 1310, 800, E.seg(t, sL + 6.6, sL + 7.6), { size: 44, align: 'center', color: U.GREEN });
      });
      const inL = t >= sL;
      U.damla(ctx, t, { x: inL ? 1690 : 1750, y: 890, s: 0.72, view: 'q3', flip: true, expr: inL ? 'thinking' : 'happy', look: [-0.8, -0.3], arms: inL ? [[-1, 0.4], [1, [22, -150], 1]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: inL ? null : 'notebook', seed: 7 });
    }
  });
})();

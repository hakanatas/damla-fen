// SAHNE 5 — Büyük harf kuralı, NaCl, yaygın bileşiklerde atom sayma, glikoz
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  const ROWS = [
    ['NH3', 'amonyak', [['N', 1], ['H', 3]]],
    ['SO2', 'kükürt dioksit', [['S', 1], ['O', 2]]],
    ['HCl', 'hidrojen klorür', [['H', 1], ['Cl', 1]]],
    ['H2SO4', 'sülfürik asit', [['H', 2], ['S', 1], ['O', 4]]],
    ['NaOH', 'sodyum hidroksit', [['Na', 1], ['O', 1], ['H', 1]]]
  ];
  function capsPart(ctx, t) {
    const sc = E.s('caps'), sn = E.s('nacl');
    const S = 240, cx = 960, y = 470;
    ctx.save(); ctx.font = `700 ${S}px Kalam`; const wN = ctx.measureText('N').width, wa = ctx.measureText('a').width, wC = ctx.measureText('C').width, wl = ctx.measureText('l').width; ctx.restore();
    const W = wN + wa + wC + wl; const x0 = cx - W / 2;
    const xs = [x0, x0 + wN, x0 + wN + wa, x0 + wN + wa + wC];
    const k = E.seg(t, sc + 0.3, sc + 1.4);
    ['N', 'a', 'C', 'l'].forEach((ch, i) => {
      const cap = i === 0 || i === 2, hk = E.se(t, sc + 2.0 + (i === 2 ? 0.8 : 0), sc + 2.6 + (i === 2 ? 0.8 : 0));
      if (cap && hk > 0) { const box = circlePts(xs[i] + (i === 0 ? wN : wC) / 2, y - S * 0.33, S * 0.34, S * 0.4, 40); P.fillPts(ctx, box, PAL.light, 0.28 * hk); stroke(ctx, box, { w: 4, closed: true, color: PAL.light, alpha: hk, seed: 3400 + i }); }
      P.write(ctx, ch, xs[i], y, E.clamp(k * 4 - i), { size: S, rot: 0 });
    });
    E.inkText(ctx, 'büyük harf', xs[0] + wN / 2, 190, t, sc + 2.4, sn + 0.4, { size: 40, align: 'center', color: K.AMBER });
    E.inkText(ctx, 'büyük harf', xs[2] + wC / 2, 190, t, sc + 3.2, sn + 0.4, { size: 40, align: 'center', color: K.AMBER });
    // parantezler: Na | Cl
    [[xs[0], xs[1] + wa, 'sodyum', 0], [xs[2], xs[3] + wl, 'klor', 1]].forEach(([a, b, txt, i]) => {
      const bk = E.se(t, sn + 0.8 + i * 1.4, sn + 1.6 + i * 1.4); if (bk <= 0) return;
      P.drawOn(ctx, [[a + 6, y + 40], [a + 10, y + 70], [b - 10, y + 70], [b - 6, y + 40]], bk, { w: 3.4 });
      K.atom(ctx, (a + b) / 2, y + 130, 30, i ? 'Cl' : 'Na', { seed: 60 + i, raw: true });
      P.write(ctx, txt, (a + b) / 2, y + 225, bk, { size: 50, align: 'center' });
    });
    const rk = E.seg(t, sn + 4.2, sn + 5.4);
    if (rk > 0) P.write(ctx, 'sodyum : klor  =  1 : 1', cx, 850, rk, { size: 52, align: 'center', color: K.AMBER });
  }
  function tablePart(ctx, t) {
    const st = E.s('table');
    const X = [300, 640, 1110], y0 = 240, RH = 118;
    INK.label(ctx, 'Formül', X[0], y0, { size: 44, weight: 700, alpha: 0.7 });
    INK.label(ctx, 'Bileşik', X[1], y0, { size: 44, weight: 700, alpha: 0.7 });
    INK.label(ctx, 'Atomlar (çeşit · sayı)', X[2], y0, { size: 44, weight: 700, alpha: 0.7 });
    stroke(ctx, K.linePts([260, y0 + 22], [1680, y0 + 16], 40), { w: 2.6, seed: 3420 });
    ROWS.forEach((r, i) => {
      const at = st + 0.8 + i * 2.4, y = y0 + 100 + i * RH;
      K.formula(ctx, r[0], X[0], y, 76, { k: E.seg(t, at, at + 0.7), subColor: K.SUB });
      P.write(ctx, r[1], X[1], y, E.seg(t, at + 0.4, at + 1.1), { size: 46 });
      let x = X[2];
      r[2].forEach(([el, n], j) => {
        const ak = E.se(t, at + 1.0 + j * 0.35, at + 1.4 + j * 0.35, 'out'); if (ak <= 0) { x += 170; return; }
        INK.label(ctx, String(n), x, y, { size: 50, weight: 700, color: K.SUB, alpha: ak });
        K.atom(ctx, x + 62, y - 17, 26 * P.pop(ak), el, { seed: 70 + i * 3 + j, raw: true });
        x += 170;
      });
      if (i < ROWS.length - 1) stroke(ctx, K.linePts([280, y + 34], [1660, y + 32], 30), { w: 1.2, alpha: 0.25, dry: false, seed: 3430 + i });
    });
  }
  function glucosePart(ctx, t) {
    const sg = E.s('glucose');
    K.formula(ctx, 'C6H12O6', 960, 360, 170, { align: 'center', k: E.seg(t, sg + 0.3, sg + 1.5), subColor: K.SUB });
    E.inkText(ctx, 'glikoz', 960, 200, t, sg + 0.2, 1e9, { size: 52, align: 'center' });
    [['C', 6, 430], ['H', 12, 960], ['O', 6, 1490]].forEach(([el, n, cx], i) => {
      const at = sg + 1.8 + i * 1.3;
      for (let j = 0; j < n; j++) {
        const k = E.se(t, at + j * 0.06, at + j * 0.06 + 0.3, 'out'); if (k <= 0) continue;
        const cols = el === 'H' ? 6 : 3, row = Math.floor(j / cols), col = j % cols;
        K.atom(ctx, cx + (col - (cols - 1) / 2) * 66, 510 + row * 66, 26 * P.pop(k), el, { seed: 80 + j, raw: true, label: el !== 'H' || true });
      }
      E.inkText(ctx, n + ' ' + ({ C: 'karbon', H: 'hidrojen', O: 'oksijen' })[el], cx, 700, t, at + 0.8, 1e9, { size: 46, align: 'center' });
    });
    const tk = E.seg(t, sg + 6.0, sg + 7.0);
    if (tk > 0) P.write(ctx, '6 + 12 + 6 = 24 atom', 960, 830, tk, { size: 62, align: 'center', color: K.AMBER });
  }
  E.scene({
    name: 'Atomları say', concept: 'Büyük harf kuralı; yaygın bileşiklerde atom çeşidi ve sayısı', from: 'caps', to: 'glucose', trFrom: [960, 400],
    draw(ctx, t) {
      const st = E.s('table'), sg = E.s('glucose');
      const a1 = 1 - E.se(t, st - 0.2, st + 0.5), a2 = Math.min(E.se(t, st + 0.2, st + 0.8), 1 - E.se(t, sg - 0.2, sg + 0.4)), a3 = E.se(t, sg + 0.1, sg + 0.6);
      if (a1 > 0) E.layer(ctx, a1, c => capsPart(c, t));
      if (a2 > 0) E.layer(ctx, a2, c => tablePart(c, t));
      if (a3 > 0) E.layer(ctx, a3, c => glucosePart(c, t));
      if (a1 > 0) E.layer(ctx, a1, c => F17.damla(c, t, { x: 230, y: 880, s: 1.05, look: [0.8, -0.4], expr: 'curious', arms: [[-1, 0.35], [1, [60, -100]]] }));
    }
  });
})();

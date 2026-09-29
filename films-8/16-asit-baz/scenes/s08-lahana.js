// SAHNE 8 — Doğal ayıraç: mor lahana suyu (altı beher, eşit miktar) · süt önermesinin sınanması · programdaki diğer ayıraçlar tablosu
(function () {
  const { PAL, line } = INK;
  const U = U5;
  const BY = 830;
  // programın listelediği ayıraçlar: turnusol (mavi/kırmızı), mor lahana suyu, fenolftalein, metil oranj
  const TAB = [
    ['turnusol', [['kırmızı', U.LIT.red], ['değişmez', null], ['mavi', U.LIT.blue]]],
    ['mor lahana', [['kırmızı-pembe', '#D23A62'], ['mor', U.CABBAGE], ['mavi-yeşil-sarı', '#3E9A4A']]],
    ['fenolftalein', [['renksiz', '#F4F1EA'], ['renksiz', '#F4F1EA'], ['pembe', U.PINK]]],
    ['metil oranj', [['kırmızı', U.MO.red], ['sarı', U.MO.yellow], ['sarı', U.MO.yellow]]]
  ];
  E.scene({
    name: 'Mor lahana suyu', concept: 'Doğal ayıraç; diğer ayıraçlar', from: 'cabbage', to: 'others', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('cabbage'), s2 = E.s('cab2'), sm = E.s('milk'), so = E.s('others');
      U.bench(ctx, -40, 1960, BY, 2001);
      // lahana suyu kavanozu
      const jk = Math.min(E.se(t, sc + 0.3, sc + 1.0), 1 - E.se(t, s2 + 0.5, s2 + 1.2));
      if (jk > 0) E.layer(ctx, jk, c => { U.beaker(c, 1500, BY, 1.0, { liq: U.CABBAGE, lvl: 0.8, name: 'mor lahana suyu', nameSize: 30, seed: 5300, liqA: 0.75 }); });
      // renkler: önce doğal renk → lahana eklenince mor → sırayla kendi rengine
      const pour = E.se(t, sc + 1.6, sc + 4.0);
      U5.row(ctx, t, {
        col: i => {
          const sm0 = U.SAMP[i]; const st = s2 + 0.3 + i * 1.3;
          const base = U.mix(sm0.col, U.CABBAGE, pour * 0.85);
          return U.mix(base, sm0.cab, E.se(t, st, st + 1.0));
        }
      });
      const hk = Math.min(E.se(t, s2 + 0.2, s2 + 0.8), 1 - E.se(t, sm - 0.2, sm + 0.3));
      if (hk > 0) { P.write(ctx, 'Aynı ayıraç, altı farklı madde:', 760, 330, hk * E.seg(t, s2 + 0.2, s2 + 1.4), { size: 52, align: 'center', color: U.CABBAGE }); P.write(ctx, 'renkler farklı!', 760, 410, E.seg(t, s2 + 1.4, s2 + 2.4) * hk, { size: 52, align: 'center', color: U.CABBAGE }); }
      // asit / nötr / baz köşeli ayraçları
      const bk = Math.min(E.se(t, s2 + 8.2, s2 + 9.0), 1 - E.se(t, so - 0.2, so + 0.3));
      if (bk > 0) E.layer(ctx, bk, c => {
        const grp = [[230, 440, 'asit', U.ACID], [650, 860, 'nötre yakın / nötr', PAL.ink], [1070, 1280, 'baz', U.BASE]];
        grp.forEach(([a, b, w, col], i) => {
          const y = 620; line(c, [a - 70, y + 20], [a - 70, y], { w: 3, dry: false, color: col }); line(c, [a - 70, y], [b + 70, y], { w: 3, dry: false, color: col }); line(c, [b + 70, y], [b + 70, y + 20], { w: 3, dry: false, color: col });
          U.txt(c, w, (a + b) / 2, y - 16, { size: 40, align: 'center', color: col });
        });
      });
      // süt önermesi
      const mk = Math.min(E.se(t, sm + 0.3, sm + 0.9), 1 - E.se(t, so - 0.2, so + 0.3));
      if (mk > 0) E.layer(ctx, mk, c => {
        INK.stroke(c, INK.circlePts(650, 745, 105, 120, 60), { w: 3.4, closed: true, color: U.AMBER, seed: 5310 });
        U.card(c, 330, 200, 1100, 230, { seed: 5320 });
        U.txt(c, '3) Süt beyaz olduğu için nötrdür.', 370, 275, { size: 42, alpha: 0.8 });
        P.write(c, 'önerme: doğru ✓', 400, 360, E.seg(t, sm + 1.2, sm + 2.2), { size: 44, color: PAL.life });
        P.write(c, 'gerekçe: yanlış ✗', 860, 360, E.seg(t, sm + 2.4, sm + 3.4), { size: 44, color: U.RED });
        P.write(c, 'kanıt = ayıracın rengi', 400, 410, E.seg(t, sm + 3.8, sm + 4.8), { size: 34, color: U.AMBER });
      });
      // diğer ayıraçlar tablosu
      const tk = E.se(t, so + 0.3, so + 1.0, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        const X = 250, Y = 170, W = 1420, CX = [X + 620, X + 900, X + 1200];
        U.card(c, X, Y, W, 440, { seed: 5330 });
        ['asitte', 'nötrde', 'bazda'].forEach((h, j) => U.txt(c, h, CX[j], Y + 62, { size: 38, align: 'center', color: [U.ACID, PAL.ink, U.BASE][j] }));
        line(c, [X + 30, Y + 82], [X + W - 30, Y + 80], { w: 2, dry: false, alpha: 0.5 });
        TAB.forEach(([nm, cells], i) => {
          const at = so + 1.0 + i * 1.2, rk = E.se(t, at, at + 0.6); if (rk <= 0) return;
          const y = Y + 150 + i * 82;
          c.save(); c.globalAlpha *= rk;
          U.txt(c, nm, X + 40, y + 12, { size: 40 });
          cells.forEach(([w, col], j) => {
            const r = U.rect(CX[j] - 125, y - 28, CX[j] + 125, y + 26);
            if (col) { P.fillPts(c, r, col, 0.35); INK.wash(c, r, col, 0.55, 5340 + i * 7 + j, { bleed: 1.2, blooms: 0 }); }
            INK.stroke(c, r, { w: 1.8, closed: true, dry: false, alpha: 0.6 });
            U.txt(c, w, CX[j], y + 12, { size: w.length > 12 ? 30 : 34, align: 'center' });
          });
          c.restore();
        });
      });
      U.damla(ctx, t, { x: 1760, y: BY, s: 0.9, flip: true, expr: t > s2 && t < sm ? 'surprised' : (t > sm && t < so ? 'thinking' : 'happy'), look: [-0.9, 0], arms: [[-1, 1.3], [1, 0.4]] });
    }
  });
})();

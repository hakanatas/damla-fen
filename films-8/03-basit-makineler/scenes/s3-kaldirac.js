// SAHNE 3 — Kaldıraç: eşit kollar → denge; kuvvet kolu 2 kat → yarı kuvvet; yol 2 kat → iş aynı. Üç kaldıraç türü.
(function () {
  const { PAL, line, stroke, dashed } = INK;
  const F = F8M;
  const XL = 600, XR = 1320, X0 = 540, X1 = 1380, PY = 610, TH = 22;
  const W = 40;            // yük (N)
  const U = 4.2;           // px / N (kuvvet oku ölçeği)
  function pivotX(t) { const s = E.s('longarm'); return E.lerp(960, (XR + 2 * XL) / 3, E.se(t, s + 0.6, s + 2.4)); }
  function phiAt(t) { const s = E.s('distance'); return Math.asin(0.25) * E.se(t, s + 0.8, s + 3.2); }

  function partA(ctx, t) {
    const sb = E.s('balance'), sl = E.s('longarm'), sd = E.s('distance'), sn = E.s('nowork');
    const xp = pivotX(t), phi = phiAt(t), pv = [xp, PY];
    F.floor(ctx, PY + 86, 5);
    F.fulcrum(ctx, xp, PY, 1, 3200);
    const pl = F.plank(ctx, pv, phi, xp - X0, X1 - xp, { th: TH, seed: 3201 });
    const dL = XL - xp, dR = XR - xp;
    const L = pl.top(dL), R = pl.top(dR);
    // referans (başlangıç) çizgileri
    if (t > sd + 0.5) {
      const k = E.se(t, sd + 0.5, sd + 1.0); ctx.save(); ctx.globalAlpha *= k * 0.7;
      const y0L = PY - TH, y0R = PY - TH;
      dashed(ctx, F.dense([[XL - 110, y0L], [XL + 90, y0L]]), { w: 2, on: 8, off: 7, color: F.PATH });
      dashed(ctx, F.dense([[XR - 90, y0R], [XR + 110, y0R]]), { w: 2, on: 8, off: 7, color: F.PATH });
      ctx.restore();
      const k2 = E.se(t, sd + 3.0, sd + 3.6);
      if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2; F.dim(ctx, XL - 130, y0L, L[1], '10 cm', { side: -1, size: 40 }); F.dim(ctx, XR + 130, y0R, R[1], '20 cm', { side: 1, size: 40 }); ctx.restore(); }
    }
    // sol yük (40 N)
    F.block(ctx, L[0], L[1], 130, 110, W + ' N', { ang: phi, seed: 3210 });
    // sağ taraf: denge sahnesinde eşit yük; sonra el kuvveti (20 N)
    const eqA = 1 - E.se(t, sl + 0.1, sl + 0.6);
    if (eqA > 0) { ctx.save(); ctx.globalAlpha *= eqA; F.block(ctx, R[0], R[1], 130, 110, W + ' N', { ang: phi, seed: 3211 }); ctx.restore(); }
    // ağırlık okları (yük) — denge: iki eşit ok
    const kb = E.se(t, sb + 1.4, sb + 2.2);
    if (kb > 0) F.vec(ctx, [L[0] - 100, L[1] - 110], [L[0] - 100, L[1] - 110 + W * U], kb, { color: F.LOAD, label: '40 N', lx: -52, ly: 0 });
    if (eqA > 0 && kb > 0) { ctx.save(); ctx.globalAlpha *= eqA; F.vec(ctx, [R[0] + 100, R[1] - 110], [R[0] + 100, R[1] - 110 + W * U], kb, { color: F.LOAD, label: '40 N', lx: 52, ly: 0 }); ctx.restore(); }
    // uzun kol: 20 N yeter
    const kf = E.se(t, sl + 2.6, sl + 3.4);
    if (kf > 0) { const fl = (W / 2) * U; F.vec(ctx, [R[0], R[1] - fl - 20], [R[0], R[1] - 6], kf, { w: 7, head: 22, label: '20 N yeter', lx: -110, ly: -10, size: 40 }); }
    // kol uzunlukları
    const ka = E.se(t, sl + 2.4, sl + 3.0) * (1 - E.se(t, sd + 0.2, sd + 0.8));
    if (ka > 0) {
      ctx.save(); ctx.globalAlpha *= ka; const y = PY + 130;
      [[XL, xp, 'yük kolu', F.LOAD], [xp, XR, 'kuvvet kolu (2 kat)', F.FORCE]].forEach(([a, b, s, col], i) => {
        line(ctx, [a, y], [b, y], { w: 2.6, color: col, dry: false, taper: 0 }); line(ctx, [a, y - 14], [a, y + 14], { w: 2.6, color: col, dry: false }); line(ctx, [b, y - 14], [b, y + 14], { w: 2.6, color: col, dry: false });
        F.txt(ctx, s, (a + b) / 2, y + 50, { size: 38, color: col, align: 'center' });
      });
      ctx.restore();
    }
    // eşit kollar (denge) işareti
    const ke = E.se(t, sb + 2.4, sb + 3.0) * (1 - E.se(t, sl + 0.2, sl + 0.7));
    if (ke > 0) { ctx.save(); ctx.globalAlpha *= ke; const y = PY + 130; [[XL, 960], [960, XR]].forEach(([a, b]) => { line(ctx, [a, y], [b, y], { w: 2.6, dry: false, taper: 0 }); line(ctx, [a, y - 14], [a, y + 14], { w: 2.6, dry: false }); line(ctx, [b, y - 14], [b, y + 14], { w: 2.6, dry: false }); }); F.txt(ctx, 'eşit kollar → denge', 960, y + 56, { size: 42, align: 'center' }); ctx.restore(); }
    // sonuç kartı
    const kn = E.se(t, sn + 0.3, sn + 1.0, 'out');
    if (kn > 0) E.layer(ctx, kn, c => {
      F.card(c, 470, 170, 1450, 330, { seed: 3230 });
      F.txt(c, 'kuvvet: yarıya indi', 520, 240, { size: 46, color: F.FORCE });
      F.txt(c, 'yol: 2 katına çıktı', 1010, 240, { size: 46, color: '#9A6412' });
      P.write(c, '→ yapılan iş aynı!', 960, 305, E.seg(t, sn + 1.6, sn + 2.8), { size: 50, align: 'center' });
    });
  }

  // üç kaldıraç türü: sıra = ['Y','D','K'] vb.
  const TYPES = [
    { name: 'destek ortada', ex: 'tahterevalli, makas, pense', ord: { Y: -190, D: 0, K: 190 }, kUp: false, tag: 'kollara bağlı' },
    { name: 'yük ortada', ex: 'el arabası, ceviz kıracağı', ord: { D: -190, Y: 0, K: 190 }, kUp: true, tag: 'hep kuvvetten kazanç' },
    { name: 'kuvvet ortada', ex: 'cımbız, maşa, olta', ord: { D: -190, K: 0, Y: 190 }, kUp: true, tag: 'hep yoldan kazanç' }
  ];
  function partB(ctx, t) {
    const st = E.s('types'), s2 = E.s('types2');
    TYPES.forEach((ty, i) => {
      const at = st + 0.6 + i * 1.6, k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
      const x0 = 80 + i * 600, cx = x0 + 280, y = 560;
      ctx.save(); ctx.globalAlpha *= k;
      F.card(ctx, x0, 190, x0 + 560, 850, { seed: 3300 + i });
      F.txt(ctx, ty.name, cx, 270, { size: 50, align: 'center', color: F.FORCE });
      const dx = cx + ty.ord.D, yx = cx + ty.ord.Y, kx = cx + ty.ord.K;
      F.fulcrum(ctx, dx, y, 0.62, 3310 + i);
      const pl = F.plank(ctx, [dx, y], 0, dx - (cx - 215), (cx + 215) - dx, { th: 16, seed: 3320 + i });
      const Yp = pl.top(yx - dx); F.block(ctx, Yp[0], Yp[1], 86, 72, 'yük', { seed: 3330 + i, size: 30 });
      const Kp = ty.kUp ? pl.bot(kx - dx) : pl.top(kx - dx);
      if (ty.kUp) F.vec(ctx, [Kp[0], Kp[1] + 130], [Kp[0], Kp[1] + 4], 1, { w: 6, head: 18 }); else F.vec(ctx, [Kp[0], Kp[1] - 130], [Kp[0], Kp[1] - 4], 1, { w: 6, head: 18 });
      F.txt(ctx, 'kuvvet', Kp[0], ty.kUp ? Kp[1] + 170 : Kp[1] - 145, { size: 34, align: 'center', color: F.FORCE });
      F.txt(ctx, 'destek', dx, y + 100, { size: 34, align: 'center', alpha: 0.8 });
      F.txt(ctx, ty.ex, cx, 815, { size: 36, align: 'center', alpha: 0.85 });
      ctx.restore();
      const kt = E.se(t, s2 + 0.3 + i * 0.9, s2 + 0.9 + i * 0.9, 'out');
      if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt; F.tag(ctx, ty.tag, cx, 360, { size: 38, color: i === 0 ? PAL.ink : (i === 1 ? F.FORCE : '#9A6412'), fill: i === 0 ? '#FBF8F1' : '#F6E7B8', seed: 3340 + i }); ctx.restore(); }
    });
  }

  E.scene({
    name: 'Kaldıraç', concept: 'Kuvvet kolu uzadıkça kuvvet azalır; yol artar', from: 'balance', to: 'nowork', trFrom: [960, 600],
    draw(ctx, t) {
      partA(ctx, t);
      const sd = E.s('distance');
      const cheer = t > E.s('nowork') + 1.5;
      DAMLA.draw(ctx, { x: 1720, y: 900, s: 0.95, view: 'q3', flip: true, expr: cheer ? 'happy' : (t > sd + 3 ? 'surprised' : 'curious'), look: [-0.8, -0.2], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 3, arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, [-50, -140]], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Kaldıraç türleri', concept: 'Destek, yük ve kuvvetin yerine göre üç tür', from: 'types', to: 'types2', trFrom: [960, 540],
    draw(ctx, t) { partB(ctx, t); }
  });
})();

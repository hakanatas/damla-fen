// SAHNE 4 — Makaralar: sabit (yön), hareketli (yarı kuvvet, 2 kat ip), makara sistemi (ikisi birden)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F8M;
  const CY = 170, U = 3.2, W = 40;   // tavan, px/N, yük (N)
  function grip(ctx, x, y) { const g = F.rect(x - 22, y, x + 22, y + 16); P.fillPts(ctx, g, F.FORCE, 0.85); stroke(ctx, g, { w: 2.2, closed: true, dry: false }); }
  function note(ctx, x, name, sub, k) {
    if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k;
    F.txt(ctx, name, x, 832, { size: 46, align: 'center' }); F.txt(ctx, sub, x, 885, { size: 36, align: 'center', color: F.FORCE, alpha: 0.9 }); ctx.restore();
  }

  function fixedRig(ctx, t, x) { // sabit makara
    const s = E.s('fixed'), h = 90 * E.se(t, s + 1.2, s + 4.2), r = 55, py = 290;
    F.ceiling(ctx, x - 150, x + 150, CY, 3400);
    line(ctx, [x, CY], [x, py - r - 6], { w: 4, dry: false });
    const topL = 600 - h, hy = 560 + h;
    F.rope(ctx, [x - r, py], [x - r, topL]); F.rope(ctx, [x + r, py], [x + r, hy]); F.ropeArc(ctx, x, py, r, Math.PI, 2 * Math.PI);
    F.pulley(ctx, x, py, r, h / r, { seed: 3410 });
    const by = F.hook(ctx, x - r, topL, 1); F.block(ctx, x - r, by + 100, 110, 100, W + ' N', { seed: 3411 });
    grip(ctx, x + r, hy);
    const k = E.se(t, s + 0.6, s + 1.2);
    F.vec(ctx, [x + r + 50, hy + 10], [x + r + 50, hy + 10 + W * U], k, { label: '40 N', lx: 50, ly: 10 });
    F.dash(ctx, [x - r - 90, 690], [x - r - 90, 600], E.se(t, s + 1.4, s + 2.4));
  }
  function movRig(ctx, t, x) { // hareketli makara
    const s = E.s('movable'), h = 60 * E.se(t, s + 1.4, s + 4.6), r = 55;
    F.ceiling(ctx, x - 150, x + 150, CY, 3420);
    const py = 560 - h, hy = 400 - 2 * h;
    F.rope(ctx, [x - r, CY], [x - r, py]); F.rope(ctx, [x + r, py], [x + r, hy]); F.ropeArc(ctx, x, py, r, 0, Math.PI);
    F.pulley(ctx, x, py, r, -h / r, { seed: 3430 });
    const sy = F.strap(ctx, x, py, r, 1, 10); const by = F.hook(ctx, x, sy, 1); F.block(ctx, x, by + 100, 110, 100, W + ' N', { seed: 3431 });
    grip(ctx, x + r, hy - 16);
    const k = E.se(t, s + 0.6, s + 1.2);
    F.vec(ctx, [x + r + 50, hy + 30], [x + r + 50, hy + 30 - (W / 2) * U], k, { label: '20 N', lx: 50, ly: 10 });
    const kt = E.se(t, s + 2.0, s + 2.6);
    if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt; F.txt(ctx, '20 N', x - r - 16, py - 120, { size: 32, align: 'right', color: F.LOAD }); F.txt(ctx, '20 N', x + r - 14, py - 60, { size: 32, align: 'right', color: F.LOAD }); ctx.restore(); }
    // ip 2 kat çekilir, yük 1 kat yükselir
    const kd = E.se(t, s + 4.6, s + 5.2);
    if (kd > 0) { ctx.save(); ctx.globalAlpha *= kd; F.dim(ctx, x + r + 150, 400, 400 - 2 * 60, '2h', { size: 34 }); F.dim(ctx, x - r - 70, 790, 790 - 60, 'h', { side: -1, size: 34 }); ctx.restore(); }
  }
  function sysRig(ctx, t, x) { // makara sistemi: sabit (sağ üst) + hareketli (sol alt)
    const s = E.s('system'), h = 60 * E.se(t, s + 1.2, s + 4.2), r = 45;
    const fx = x + 45, fy = 280, mx = x - 45;
    F.ceiling(ctx, x - 170, x + 170, CY, 3440);
    line(ctx, [fx, CY], [fx, fy - r - 6], { w: 4, dry: false });
    const py = 580 - h, hy = 540 + 2 * h;
    F.rope(ctx, [mx - r, CY], [mx - r, py]); F.ropeArc(ctx, mx, py, r, 0, Math.PI);
    F.rope(ctx, [mx + r, py], [fx - r, fy]); F.ropeArc(ctx, fx, fy, r, Math.PI, 2 * Math.PI);
    F.rope(ctx, [fx + r, fy], [fx + r, hy]);
    F.pulley(ctx, fx, fy, r, 2 * h / r, { seed: 3450 }); F.pulley(ctx, mx, py, r, -h / r, { seed: 3451 });
    const sy = F.strap(ctx, mx, py, r, 1, 8); const by = F.hook(ctx, mx, sy, 1); F.block(ctx, mx, by + 100, 110, 100, W + ' N', { seed: 3452 });
    grip(ctx, fx + r, hy);
    const k = E.se(t, s + 0.6, s + 1.2);
    F.vec(ctx, [fx + r + 50, hy + 10], [fx + r + 50, hy + 10 + (W / 2) * U], k, { label: '20 N', lx: 50, ly: 10 });
  }

  E.scene({
    name: 'Makaralar', concept: 'Sabit, hareketli makara ve makara sistemi', from: 'fixed', to: 'system', trFrom: [960, 400],
    draw(ctx, t) {
      const sf = E.s('fixed'), sm = E.s('movable'), ss = E.s('system');
      const dim = (a, b) => b ? 0.35 + 0.65 * (1 - E.se(t, b, b + 0.6)) : 1;
      const k1 = E.se(t, sf + 0.1, sf + 0.8), k2 = E.se(t, sm + 0.1, sm + 0.8), k3 = E.se(t, ss + 0.1, ss + 0.8);
      if (k1 > 0) E.layer(ctx, k1 * dim(sf, sm), c => { fixedRig(c, t, 330); note(c, 330, 'sabit makara', 'yönü değiştirir', 1); });
      if (k2 > 0) E.layer(ctx, k2 * dim(sm, ss), c => { movRig(c, t, 930); note(c, 930, 'hareketli makara', 'kuvvet yarı · ip 2 kat', 1); });
      if (k3 > 0) E.layer(ctx, k3, c => { sysRig(c, t, 1560); note(c, 1560, 'makara sistemi', 'yön değişir + kuvvet yarı', 1); });
      INK.label(ctx, '(sürtünme ve makara ağırlığı ihmal edildi)', 1880, 100, { size: 30, align: 'right', alpha: 0.6 * E.se(t, sf + 1, sf + 2) });
    }
  });
})();

// SAHNE 3 — Folyo deneyi (FB.6.4.1): görüntü gözlemi → yandan görünüşte ışın yolları (vektörle hesaplanır)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F611, V = F.V;
  const Y = 800, DEG = Math.PI / 180;
  const D = [Math.sin(35 * DEG), Math.cos(35 * DEG)];            // gelen yön: normalden 35°
  const FLAT = [[220, Y], [860, Y]];
  const ROUGH = F.rough(1060, 1700, Y, 18, 11, 7);
  const NR = 7, SP = 20;                                            // 7 paralel ışın, dik aralık 20 px
  const perp = [D[1], -D[0]];
  function beam(cx) { // cx: yüzeydeki orta çarpma noktası x; ışınlar yüzeyden 380 px geride başlar
    const c0 = V.sub([cx, Y], V.mul(D, 380));
    const rays = []; for (let i = 0; i < NR; i++) rays.push(V.add(c0, V.mul(perp, (i - (NR - 1) / 2) * SP)));
    return { c0, rays };
  }
  const BL = beam(540), BR = beam(1380);
  const TL = BL.rays.map(p => F.trace(p, D, [FLAT], 1, 360));
  const TR = BR.rays.map(p => F.trace(p, D, [ROUGH], 2, 330));
  // buruşuk folyo (ön görünüş) üçgen yüzleri
  const FACETS = (() => { const r = INK.rng(77); const g = []; const nx = 9, ny = 7, x0 = 1060, y0 = 250, w = 600, h = 440; const pt = [];
    for (let j = 0; j <= ny; j++) { pt[j] = []; for (let i = 0; i <= nx; i++) pt[j][i] = [x0 + w * i / nx + (i && i < nx ? (r() - 0.5) * 40 : 0), y0 + h * j / ny + (j && j < ny ? (r() - 0.5) * 36 : 0)]; }
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { g.push([[pt[j][i], pt[j][i + 1], pt[j + 1][i + 1]], 0.55 + r() * 0.45]); g.push([[pt[j][i], pt[j + 1][i + 1], pt[j + 1][i]], 0.55 + r() * 0.45]); }
    return g; })();

  function front(ctx, t) {
    const sf = E.s('foil'), sl = E.s('look');
    // düzgün folyo
    const L = [[260, 250], [860, 246], [862, 690], [262, 694], [260, 250]];
    const g = ctx.createLinearGradient(260, 250, 860, 690); g.addColorStop(0, '#E9EEF1'); g.addColorStop(0.5, '#C4CDD3'); g.addColorStop(1, '#E3E8EB');
    P.fillPts(ctx, L, g); stroke(ctx, L, { w: 3, closed: true, seed: 641 });
    // görüntü (düz aynadaki gibi): Damla'nın yansıması
    const ik = E.se(t, sl + 0.3, sl + 1.2);
    if (ik > 0) { ctx.save(); P.path(ctx, L); ctx.clip(); E.layer(ctx, 0.55 * ik, c => DAMLA.draw(c, { x: 560, y: 690, s: 1.55, view: 'q3', flip: true, expr: 'happy', look: [-0.3, 0], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 3, shadow: false })); ctx.restore(); }
    // buruşuk folyo
    FACETS.forEach(([tri, b], i) => { const v = Math.round(150 + b * 90); P.fillPts(ctx, tri.concat([tri[0]]), `rgb(${v},${v + 6},${v + 10})`); });
    FACETS.forEach(([tri], i) => { if (i % 3 === 0) stroke(ctx, tri.concat([tri[0]]), { w: 1, dry: false, alpha: 0.35, seed: 650 + i, taper: 0 }); });
    stroke(ctx, [[1060, 250], [1660, 246], [1662, 690], [1062, 694], [1060, 250]], { w: 3, closed: true, seed: 642 });
    INK.label(ctx, 'düzgün folyo', 560, 760, { size: 42, weight: 700, align: 'center', alpha: E.se(t, sf + 0.8, sf + 1.4) });
    INK.label(ctx, 'buruşuk folyo', 1360, 760, { size: 42, weight: 700, align: 'center', alpha: E.se(t, sf + 1.4, sf + 2.0) });
    INK.label(ctx, 'görüntü: net', 560, 820, { size: 38, align: 'center', color: PAL.water, alpha: E.se(t, sl + 1.4, sl + 2.0) });
    INK.label(ctx, 'görüntü: yok', 1360, 820, { size: 38, align: 'center', color: PAL.water, alpha: E.se(t, sl + 2.6, sl + 3.2) });
    DAMLA.draw(ctx, { x: 960, y: 900, s: 0.95, view: 'front', expr: t > sl ? 'curious' : 'happy', look: t > sl + 2.4 ? [0.8, -0.2] : (t > sl ? [-0.8, -0.2] : [0, 0]), blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 3 });
  }

  function side(ctx, t) {
    const sh = E.s('shine'), sr = E.s('regular'), sd = E.s('diffuse');
    INK.label(ctx, 'düzgün yüzey (yandan)', 540, 210, { size: 40, weight: 700, align: 'center' });
    INK.label(ctx, 'pürüzlü yüzey (yandan)', 1380, 210, { size: 40, weight: 700, align: 'center' });
    F.foil(ctx, FLAT, { seed: 661 }); F.foil(ctx, ROUGH, { seed: 662 });
    const ang = Math.atan2(D[1], D[0]);
    F.flashlight(ctx, BL.c0[0], BL.c0[1], ang, 1.6, 1); F.flashlight(ctx, BR.c0[0], BR.c0[1], ang, 1.6, 1);
    // gelen ışınlar (ikisi de aynı anda, aynı açı)
    const kin = E.se(t, sh + 1.0, sh + 2.4);
    // yansıyan: düzgün → regular beat'te, pürüzlü → diffuse beat'te
    const kL = E.se(t, sr + 0.1, sr + 1.4), kR = E.se(t, sd + 0.1, sd + 1.6);
    const draw = (T, kOut, seed) => T.forEach((segs, i) => {
      F.ray(ctx, segs[0][0], segs[0][1], kin, { w: 2.6, head: 12, heads: [0.6], seed: seed + i });
      for (let j = 1; j < segs.length; j++) {
        const kk = j === 1 ? kOut : E.clamp(kOut * 2 - 1);
        F.ray(ctx, segs[j][0], segs[j][1], kk, { w: 2.6, head: 12, heads: [0.6], seed: seed + 20 + i * 3 + j });
      }
    });
    draw(TL, kL, 670); draw(TR, kR, 700);
    E.inkText(ctx, 'paralel yansıdı → düzgün yansıma', 540, 890, t, sr + 1.2, 1e9, { size: 40, align: 'center', color: '#8A4A10' });
    E.inkText(ctx, 'dağıldı → dağınık yansıma', 1380, 890, t, sd + 1.4, 1e9, { size: 40, align: 'center', color: '#8A4A10' });
  }

  E.scene({
    name: 'Folyo deneyi', concept: 'Düzgün ve dağınık yansıma', from: 'foil', to: 'diffuse', trFrom: [960, 500],
    draw(ctx, t) {
      const sh = E.s('shine');
      const k = E.se(t, sh - 0.2, sh + 0.8);
      if (k < 1) E.layer(ctx, 1 - k, c => front(c, t));
      if (k > 0) E.layer(ctx, k, c => side(c, t));
    }
  });
})();

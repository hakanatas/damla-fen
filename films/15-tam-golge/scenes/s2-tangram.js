// SAHNE 2 — Tangram gölgeleri: opak kartondan tangram, pipete sabitleme, noktasal lamba + sabit ekran
// (TYMM: "saydam olmayan maddelerden tangram ... pipet, kalem vb. araçlara sabitleyip ... ekran üzerinde gölge")
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F15, RED = F.RED;
  const L = [300, 520], OX = 700, SX = 1150;             // lamp, object plane, screen plane (side view)
  const K = (SX - L[0]) / (OX - L[0]);                   // shadow magnification = 2.125 (computed)
  const PAN = { x: 1290, y: 200, w: 560, h: 580 }, PC = [PAN.x + PAN.w / 2, 520];   // front view of the screen; axis at y=520
  const KEYS = ['A', 'B', 'M', 's1', 's2', 'Q', 'R'];
  const tri = F.TAN.A.map(p => [(p[0] - 0.5) * 220, (0.5 - p[1] - 0.25) * 220]);   // upright triangle (apex up), local px

  function pieces(t) { // local polygons (relative to axis) of the object on the straw
    const sc = E.s('cat');
    const k = E.se(t, sc + 0.3, sc + 3.2);
    const out = [];
    KEYS.forEach((key, i) => {
      const cat = F.CAT[key].map(p => [(p[0] + 0.375) * 92, (p[1] - 0.025) * 92]);
      if (key === 'A') { out.push({ key, pts: tri.map((p, j) => E.mix(p, cat[j], k)) }); return; }
      const ki = E.se(t, sc + 0.3 + i * 0.3, sc + 1.8 + i * 0.3); if (ki <= 0) return;
      out.push({ key, pts: cat.map(p => [p[0] + (1 - ki) * 60, p[1] + (1 - ki) * 400]), a: ki });
    });
    return out;
  }

  function cutting(ctx, t) {
    const st = E.s('tangram');
    const S = 380, x0 = 770, y0 = 250;
    const sep = E.se(t, st + 3.2, st + 4.4);
    KEYS.forEach((key, i) => {
      const pts = F.TAN[key]; const c = pts.reduce((a, p) => [a[0] + p[0] / pts.length, a[1] + p[1] / pts.length], [0, 0]);
      const off = [(c[0] - 0.5) * 90 * sep, (c[1] - 0.5) * 90 * sep];
      F.poly(ctx, pts, x0 + off[0], y0 + off[1], S, F.TCOL[key], { stroke: sep > 0.02, seed: 700 + i });
    });
    if (sep <= 0.02) stroke(ctx, [[x0, y0], [x0 + S, y0], [x0 + S, y0 + S], [x0, y0 + S], [x0, y0]], { w: 3, closed: true });
    // cut lines drawn on
    const cuts = [[[0, 0], [1, 1]], [[1, 0.5], [0.5, 1]], [[0.5, 0.5], [0.75, 0.25]], [[0.75, 0.25], [0.75, 0.75]], [[0.25, 0.75], [0.5, 1]], [[0.25, 0.75], [0.5, 0.5]], [[0.75, 0.75], [0.5, 1]]];
    if (sep < 0.1) cuts.forEach((c, i) => { const k = E.se(t, st + 0.6 + i * 0.35, st + 0.95 + i * 0.35); if (k > 0) INK.dashed(ctx, P.partial(P.bez([x0 + c[0][0] * S, y0 + c[0][1] * S], [x0 + (c[0][0] + c[1][0]) / 2 * S, y0 + (c[0][1] + c[1][1]) / 2 * S], [x0 + c[1][0] * S, y0 + c[1][1] * S], 20), k), { w: 2.4, on: 10, off: 7 }); });
    P.write(ctx, 'opak karton', x0 + S / 2, y0 - 40, E.seg(t, st + 0.2, st + 1.2), { size: 44, align: 'center' });
    P.write(ctx, '7 parça', x0 + S / 2, y0 + S + 90, E.seg(t, st + 4.4, st + 5.2), { size: 44, align: 'center' });
    P.write(ctx, '✂  Makası bir yetişkin eşliğinde kullan.', 960, 860, E.seg(t, st + 1.2, st + 2.6), { size: 40, align: 'center', color: RED });
  }

  function setup(ctx, t) {
    const sk = E.s('stick'), sc = E.s('cast'), sca = E.s('cat');
    const on = E.se(t, sc + 0.2, sc + 0.6);
    const ps = pieces(t);
    let yMin = 1e9, yMax = -1e9; ps.forEach(p => { if ((p.a ?? 1) > 0.5) p.pts.forEach(q => { yMin = Math.min(yMin, q[1]); yMax = Math.max(yMax, q[1]); }); });
    const top = [OX, L[1] + yMin], bot = [OX, L[1] + yMax];
    // bench
    stroke(ctx, [[120, 840], [1220, 836]], { w: 4, seed: 710 });
    // screen (side view)
    const scr = [[SX, 220], [SX + 16, 220], [SX + 16, 836], [SX, 836], [SX, 220]];
    P.fillPts(ctx, scr, '#FBF8F1');
    if (on > 0) { const sT = F.proj(L, top, SX), sB = F.proj(L, bot, SX); P.fillPts(ctx, [[SX, 220], [SX + 6, 220], [SX + 6, 836], [SX, 836]], '#F2C46A', on * 0.8); P.fillPts(ctx, [[SX - 1, sT[1]], [SX + 17, sT[1]], [SX + 17, sB[1]], [SX - 1, sB[1]]], F.SHADOW, on); }
    stroke(ctx, scr, { w: 2.6, closed: true, seed: 711 });
    INK.label(ctx, 'ekran', SX + 8, 890, { size: 36, weight: 700, align: 'center' });
    // lamp on a stand
    line(ctx, [L[0], L[1] + 46], [L[0], 836], { w: 5, seed: 712 }); P.fillPts(ctx, circlePts(L[0], 832, 60, 10, 24), '#8A6A45', 0.9);
    // rays
    if (on > 0) {
      const rk = E.se(t, sc + 0.4, sc + 1.8);
      [-1, 1].forEach((sgn, i) => { const e = sgn < 0 ? top : bot; const d = [e[0] - L[0], e[1] - L[1]], n = Math.hypot(...d); F.ray(ctx, [L[0] + d[0] / n * 34, L[1] + d[1] / n * 34], F.proj(L, e, SX), rk, { w: 3.2, head: 13, heads: [0.3, 0.8], seed: 720 + i }); });
      [yMin - 70, yMin - 30, yMax + 30, yMax + 70].forEach((dy, i) => { const y = L[1] + dy; const e = F.proj(L, [OX, y], SX); F.ray(ctx, [L[0] + 30, L[1] + (y - L[1]) * 30 / (OX - L[0])], e, rk, { w: 2.4, head: 11, heads: [0.6], alpha: 0.6, seed: 730 + i }); });
      [-0.4, 0.4].forEach((f, i) => { const y = L[1] + f * (yMax - yMin); F.ray(ctx, [L[0] + 30, L[1] + (y - L[1]) * 30 / (OX - L[0])], [OX - 6, y], rk, { w: 2.4, head: 11, heads: [0.6], alpha: 0.6, seed: 740 + i }); });
    }
    F.bulb(ctx, L[0], L[1], 1, on, { baseDir: 1 });
    // straw + object seen edge-on
    line(ctx, [OX, bot[1]], [OX, 836], { w: 5, color: '#D0605A', seed: 713 });
    P.fillPts(ctx, [[OX - 5, top[1]], [OX + 5, top[1]], [OX + 5, bot[1]], [OX - 5, bot[1]]], '#B98C5A'); stroke(ctx, [[OX - 5, top[1]], [OX + 5, top[1]], [OX + 5, bot[1]], [OX - 5, bot[1]], [OX - 5, top[1]]], { w: 2.2, closed: true, dry: false });
    INK.label(ctx, 'pipet', OX + 20, 800, { size: 34, weight: 700 });
    INK.label(ctx, 'lamba', L[0], 900, { size: 36, weight: 700, align: 'center' });
    // mini front view of the object
    const mk = E.se(t, sk + 0.8, sk + 1.6);
    if (mk > 0) {
      ctx.save(); ctx.globalAlpha = mk;
      const mc = F.card(ctx, 470, 150, 300, 230, { seed: 750 });
      ctx.save(); P.path(ctx, mc); ctx.clip();
      ps.forEach(p => { ctx.save(); ctx.globalAlpha *= (p.a ?? 1); F.poly(ctx, p.pts, 620, 265, 0.52, F.TCOL[p.key], { w: 1.6, seed: 760 }); ctx.restore(); });
      ctx.restore();
      ctx.restore();
      INK.label(ctx, 'cisim (önden)', 620, 420, { size: 34, weight: 700, align: 'center', alpha: mk });
    }
    // front view of the screen
    const fk = E.se(t, sk + 2.2, sk + 3.0);
    if (fk > 0) {
      ctx.save(); ctx.globalAlpha = fk;
      const fr = F.card(ctx, PAN.x, PAN.y, PAN.w, PAN.h, { seed: 770 });
      ctx.save(); P.path(ctx, fr); ctx.clip();
      if (on > 0) { F.glow(ctx, PC[0], PC[1], 520, on); }
      ps.forEach(p => { if (on > 0) F.poly(ctx, p.pts.map(q => [q[0] * K, q[1] * K]), PC[0], PC[1], 1, F.SHADOW, { stroke: false, a: on * (p.a ?? 1) }); });
      ctx.restore(); ctx.restore();
      INK.label(ctx, 'ekrandan görünüş', PC[0], PAN.y - 22, { size: 36, weight: 700, align: 'center', alpha: fk });
    }
    if (t > sca + 3.4) P.write(ctx, 'kedi!', PC[0] + 170, PAN.y + 90, E.seg(t, sca + 3.4, sca + 4.2), { size: 56, color: '#8A4A10' });
    if (on > 0.5 && t < sca) P.write(ctx, 'gölge', PC[0], PAN.y + PAN.h - 40, E.seg(t, sc + 1.8, sc + 2.8), { size: 44, align: 'center' });
  }

  E.scene({
    name: 'Tangram', concept: 'Opak tangram parçalarıyla gölge', from: 'tangram', to: 'cat', trFrom: [960, 540],
    draw(ctx, t) {
      const sk = E.s('stick');
      ctx.fillStyle = 'rgba(24,25,40,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, sk - 0.2, sk + 0.6);
      E.layer(ctx, a1, c => cutting(c, t));
      const a2 = E.se(t, sk, sk + 0.8);
      E.layer(ctx, a2, c => setup(c, t));
      if (a1 > 0) E.layer(ctx, a1, c => DAMLA.draw(c, { x: 1500, y: 880, s: 1.2, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.35], [1, 1.6]] }));
    }
  });
})();

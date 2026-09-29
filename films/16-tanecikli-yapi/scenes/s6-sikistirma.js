// SAHNE 6 — Şekil, hacim ve sıkıştırılabilme (TYMM: katılar sıkıştırılamaz, sıvıların sıkıştırılamadığı varsayılır,
// gazların sıkıştırılabilirliği enjektörle gözlemlenir; katı/sıvı belirli hacim, gaz hacmi değişebilir)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F16;
  const RED = '#A23A2A';
  function shapes(ctx, t) {
    const sh = E.s('shape'), sv = E.s('vol2');
    const cols = [{ x: 360, name: 'katı', kind: 'solid' }, { x: 960, name: 'sıvı', kind: 'liquid' }, { x: 1560, name: 'gaz', kind: 'gas' }];
    P.write(ctx, 'Farklı kaplarda ne olur?', 960, 205, E.seg(t, sh + 0.1, sh + 1.3), { size: 58, align: 'center' });
    cols.forEach((c, i) => {
      const k = E.se(t, sh + 0.4 + i * 0.5, sh + 1.0 + i * 0.5, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k;
      INK.label(ctx, c.name, c.x, 300, { size: 50, weight: 700, align: 'center' });
      const boxes = [[c.x - 220, 440, 150, 280], [c.x - 30, 550, 250, 170]];
      boxes.forEach(([bx, by, bw, bh], j) => {
        const R = F.box(ctx, bx, by, bw, bh, { lid: c.kind === 'gas', seed: 200 + i * 3 + j });
        if (c.kind === 'solid') F.field(ctx, 'solid', [bx + bw / 2 - 48, by + bh - 100, 96, 96], t, { r: 14, cols: 3, rows: 3, lift: 0 });
        else if (c.kind === 'liquid') { const lv = 16800 / (bw - 10); F.water(ctx, bx, by, bw, bh, lv, { alpha: 0.3, seed: 205 + j }); F.field(ctx, 'liquid', [R[0], by + bh - lv, R[2], lv - 4], t, { r: 11, rows: Math.round(lv / 22) }); }
        else F.field(ctx, 'gas', R, t, { r: 11, n: 8, seed: 30 + j });
      });
      ctx.restore();
      const cap1 = c.kind === 'solid' ? 'şekli belirli' : 'kabın şeklini alır';
      const cap2 = c.kind === 'gas' ? 'hacmi değişir' : 'hacmi belirli';
      P.write(ctx, cap1, c.x, 790, E.seg(t, sh + 2.0 + i * 1.2, sh + 3.0 + i * 1.2), { size: 40, align: 'center' });
      P.write(ctx, cap2, c.x, 855, E.seg(t, sv + 0.3 + i * 1.2, sv + 1.3 + i * 1.2), { size: 40, align: 'center', color: c.kind === 'gas' ? '#8A4A10' : PAL.water });
    });
  }
  function syringes(ctx, t) {
    const ss = E.s('syringe'), sr = E.s('syr-res');
    const push = E.se(t, ss + 3.0, ss + 5.5);
    const rows = [{ y: 400, kind: 'air', name: 'hava', p: E.lerp(640, 280, push) }, { y: 720, kind: 'water', name: 'su', p: 640 - 6 * Math.sin(Math.min(1, push) * Math.PI) }];
    rows.forEach((r, i) => {
      const k = E.se(t, ss - 0.4 + i * 0.3, ss + 0.3 + i * 0.3, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k;
      INK.label(ctx, r.name, 170, r.y + 16, { size: 52, weight: 700, align: 'center', color: i ? PAL.water : PAL.ink });
      const hx = F.syringe(ctx, 300, r.y, 660, r.p, r.kind, t, { h: 120 });
      if (push > 0 && push < 1) P.arrow(ctx, [hx + 170, r.y], [hx + 30, r.y], 1, { w: 5, head: 20, color: '#8A4A10' });
      ctx.restore();
      const res = E.se(t, sr + 0.2 + i * 1.6, sr + 1.0 + i * 1.6);
      if (res > 0) {
        if (i === 0) { P.check(ctx, 1520, r.y - 150, 60, res, { w: 8, color: PAL.life }); P.write(ctx, 'sıkıştı!', 1580, r.y - 130, res, { size: 50 }); }
        else { P.cross(ctx, 1560, r.y - 150, 26, res, { w: 7, color: RED }); P.write(ctx, 'sıkışmadı', 1610, r.y - 130, res, { size: 50 }); }
      }
    });
    // uyarı notu
    const nk = E.se(t, ss + 1.2, ss + 2.0);
    if (nk > 0) { ctx.save(); ctx.globalAlpha = nk; INK.label(ctx, 'iğnesiz · ucu kapalı', 300, 250, { size: 36, weight: 700, color: RED }); INK.leader(ctx, [320, 262], [265, 380], { w: 2, bend: 0.2 }); ctx.restore(); }
    const gk = E.se(t, sr + 2.6, sr + 3.4);
    if (gk > 0) E.layer(ctx, gk, c => { INK.label(c, 'tanecikler arası boşluk azaldı', 640, 520, { size: 36, weight: 700, align: 'center', color: '#8A4A10' }); });
  }
  function assume(ctx, t) {
    const sa = E.s('assume');
    F.card(ctx, 960, 520, 1300, 520, { seed: 220 });
    INK.label(ctx, 'Sıkıştırılabilir mi?', 960, 350, { size: 64, weight: 700, align: 'center', alpha: E.se(t, sa + 0.1, sa + 0.7) });
    const L = [['Katılar', 'sıkıştırılamaz', RED, 0], ['Sıvılar', 'sıkıştırılamaz (varsayım)', RED, 1], ['Gazlar', 'sıkıştırılabilir', PAL.life, 2]];
    L.forEach(([a, b, col, i]) => {
      const at = sa + 0.6 + i * 1.3;
      P.write(ctx, a + ':', 420, 460 + i * 90, E.seg(t, at, at + 0.7), { size: 54 });
      P.write(ctx, b, 680, 460 + i * 90, E.seg(t, at + 0.4, at + 1.2), { size: 54, color: col });
    });
  }
  E.scene({
    name: 'Şekil, hacim, sıkıştırma', concept: 'Şekil, hacim ve sıkıştırılabilme', from: 'shape', to: 'assume', trFrom: [960, 540],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const aS = E.se(t, E.s('syringe') - 0.4, E.s('syringe') + 0.4), aA = E.se(t, E.s('assume') - 0.3, E.s('assume') + 0.4);
      if (aS < 1) E.layer(ctx, 1 - aS, c => shapes(c, t));
      if (aS > 0) E.layer(ctx, Math.min(aS, 1 - 0.75 * aA), c => syringes(c, t));
      if (aA > 0) E.layer(ctx, aA, c => assume(c, t));
    }
  });
})();

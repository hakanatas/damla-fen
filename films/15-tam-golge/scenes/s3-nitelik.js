// SAHNE 3 — Tam gölgenin nitelikleri: ışık almayan karanlık bölge; şekli cismin şekline benzer
// (FB.5.4.3 a) tam gölgenin niteliklerini tanımlar)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F15;
  const L = [330, 540], OX = 820, SX = 1400, H = 200;

  function side(ctx, t) {
    const sw = E.s('what');
    const top = [OX, L[1] - H / 2], bot = [OX, L[1] + H / 2], sT = F.proj(L, top, SX), sB = F.proj(L, bot, SX);
    // lit screen + shadow region
    const scr = [[SX, 170], [SX + 18, 170], [SX + 18, 860], [SX, 860], [SX, 170]];
    P.fillPts(ctx, scr, '#FBF8F1'); P.fillPts(ctx, [[SX, 170], [SX + 7, 170], [SX + 7, 860], [SX, 860]], '#F2C46A', 0.85);
    const rk = E.se(t, sw + 0.3, sw + 2.0);
    // rays in all directions from the point source; those hitting the object stop there
    for (let i = 0; i < 15; i++) {
      const y = 172 + i * 49, a = [SX, y];
      const yo = L[1] + (y - L[1]) * (OX - L[0]) / (SX - L[0]);
      const blocked = yo > top[1] && yo < bot[1];
      const end = blocked ? [OX - 6, yo] : a;
      const d = [end[0] - L[0], end[1] - L[1]], n = Math.hypot(...d);
      F.ray(ctx, [L[0] + d[0] / n * 34, L[1] + d[1] / n * 34], end, rk, { w: 2.4, head: 11, heads: [blocked ? 0.7 : 0.4], alpha: 0.75, seed: 800 + i });
    }
    const zk = E.se(t, sw + 2.4, sw + 3.4);
    if (zk > 0) {
      P.fillPts(ctx, [[OX + 6, top[1]], [SX, sT[1]], [SX, sB[1]], [OX + 6, bot[1]]], 'rgba(28,27,34,0.28)', zk);
      P.fillPts(ctx, [[SX - 1, sT[1]], [SX + 19, sT[1]], [SX + 19, sB[1]], [SX - 1, sB[1]]], F.SHADOW, zk);
      [top, bot].forEach((e, i) => F.ray(ctx, [L[0] + 30, L[1] + (e[1] - L[1]) * 30 / (OX - L[0])], F.proj(L, e, SX), 1, { w: 3.4, head: 13, heads: [0.25, 0.75], seed: 830 + i, alpha: zk }));
    }
    stroke(ctx, scr, { w: 2.6, closed: true, seed: 840 });
    F.bulb(ctx, L[0], L[1], 1, 1);
    const ob = [[OX - 7, top[1]], [OX + 7, top[1]], [OX + 7, bot[1]], [OX - 7, bot[1]], [OX - 7, top[1]]];
    P.fillPts(ctx, ob, '#B98C5A'); stroke(ctx, ob, { w: 2.6, closed: true });
    INK.label(ctx, 'noktasal ışık kaynağı', L[0], L[1] + 110, { size: 36, weight: 700, align: 'center' });
    INK.label(ctx, 'opak cisim', OX, top[1] - 30, { size: 36, weight: 700, align: 'center' });
    INK.label(ctx, 'ekran', SX + 60, 200, { size: 36, weight: 700 });
    if (zk > 0) {
      P.write(ctx, 'ışık almayan bölge', (OX + SX) / 2 + 20, L[1] + 12, E.seg(t, sw + 3.4, sw + 4.6), { size: 36, align: 'center', color: PAL.white });
      // bracket + label on the screen
      const bk = E.se(t, sw + 4.6, sw + 5.4);
      if (bk > 0) { ctx.save(); ctx.globalAlpha = bk; stroke(ctx, [[SX + 40, sT[1]], [SX + 60, sT[1]], [SX + 60, sB[1]], [SX + 40, sB[1]]], { w: 3, dry: false }); ctx.restore();
        P.write(ctx, 'tam gölge', SX + 80, L[1] + 16, bk, { size: 56, color: '#8A4A10' }); }
    }
  }

  function shapes(ctx, t) {
    const ss = E.s('shape');
    const rows = [[280, 'kare', (c, x, y, r, col) => P.fillPts(c, [[x - r, y - r], [x + r, y - r], [x + r, y + r], [x - r, y + r]], col)], [640, 'daire', (c, x, y, r, col) => P.fillPts(c, circlePts(x, y, r, r, 48), col)]];
    rows.forEach(([y, name, fn], i) => {
      const k = E.se(t, ss + 0.1 + i * 2.2, ss + 0.8 + i * 2.2, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k;
      F.card(ctx, 330, y - 120, 360, 240, { seed: 850 + i });
      fn(ctx, 510, y, 60, '#B98C5A');
      if (name === 'kare') stroke(ctx, [[450, y - 60], [570, y - 60], [570, y + 60], [450, y + 60], [450, y - 60]], { w: 2.6, closed: true }); else stroke(ctx, circlePts(510, y, 60, 60, 48), { w: 2.6, closed: true });
      F.card(ctx, 1130, y - 130, 440, 260, { fill: '#FBF1DC', seed: 860 + i });
      ctx.save(); P.path(ctx, [[1130, y - 130], [1570, y - 136], [1576, y + 130], [1134, y + 134]]); ctx.clip(); F.glow(ctx, 1350, y, 300, 0.8); ctx.restore();
      const sk = E.se(t, ss + 1.3 + i * 2.2, ss + 1.9 + i * 2.2);
      fn(ctx, 1350, y, 100, `rgba(28,27,34,${0.82 * sk})`);
      ctx.restore();
      P.arrow(ctx, [720, y], [1100, y], E.se(t, ss + 0.9 + i * 2.2, ss + 1.5 + i * 2.2), { w: 3.4, head: 16 });
      INK.label(ctx, 'cisim (' + name + ')', 510, y + 160, { size: 36, weight: 700, align: 'center', alpha: k });
      INK.label(ctx, name + ' tam gölge', 1350, y + 172, { size: 36, weight: 700, align: 'center', alpha: sk });
    });
  }

  E.scene({
    name: 'Tam gölge', concept: 'Tam gölgenin nitelikleri', from: 'what', to: 'shape', trFrom: [820, 540],
    draw(ctx, t) {
      const ss = E.s('shape');
      ctx.fillStyle = 'rgba(24,25,40,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      E.layer(ctx, 1 - E.se(t, ss + 0.1, ss + 0.8), c => side(c, t));
      E.layer(ctx, E.se(t, ss - 0.1, ss + 0.5), c => shapes(c, t));
    }
  });
})();

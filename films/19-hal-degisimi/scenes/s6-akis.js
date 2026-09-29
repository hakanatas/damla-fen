// SAHNE 6 — Hâl değişimi akış şeması (TYMM: akış şeması ile hâl değişimini çizerek gösterme)
// erime/donma · buharlaşma(kaynama)/yoğuşma · süblimleşme/kırağılaşma; ısı alır (kehribar) / ısı verir (mavi)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng, arrowHead } = INK;
  const F = F19, IN = '#C07F1E', OUT = PAL.water;
  const N = { k: [330, 760], s: [1190, 760], g: [760, 270] };
  const PAIRS = [ // [from, to, label a (ısı alır), label b (ısı verir), beat a, beat b]
    ['k', 's', 'erime', 'donma'],
    ['s', 'g', 'buharlaşma', 'yoğuşma'],
    ['k', 'g', 'süblimleşme', 'kırağılaşma']
  ];
  function arrowPair(ctx, A, B, ka, kb, la, lb, hlA, hlB) {
    const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), d = [dx / L, dy / L], p = [d[1], -d[0]];
    const r = 150, off = 22;
    const a0 = [A[0] + d[0] * r + p[0] * off, A[1] + d[1] * r + p[1] * off], a1 = [B[0] - d[0] * r + p[0] * off, B[1] - d[1] * r + p[1] * off];
    const b0 = [B[0] - d[0] * r - p[0] * off, B[1] - d[1] * r - p[1] * off], b1 = [A[0] + d[0] * r - p[0] * off, A[1] + d[1] * r - p[1] * off];
    const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    if (ka > 0) { P.arrow(ctx, a0, a1, ka, { w: 5 + hlA * 2, color: IN, bend: 0, head: 20 }); const da = Math.abs(d[1]) > 0.3 ? 118 : 72;
    P.write(ctx, la, mid[0] + p[0] * da, mid[1] + p[1] * da + 12, E.seg(ka, 0.5, 1), { size: 42, align: 'center', color: '#8A4A10' }); }
    if (kb > 0) { P.arrow(ctx, b0, b1, kb, { w: 5 + hlB * 2, color: OUT, bend: 0, head: 20 }); const db = Math.abs(d[1]) > 0.3 ? 118 : 72; P.write(ctx, lb, mid[0] - p[0] * db, mid[1] - p[1] * db + 14, E.seg(kb, 0.5, 1), { size: 42, align: 'center', color: OUT }); }
  }
  // ---- example vignettes (in card, centered at cx, cy) ----
  const EX = {
    donma(ctx, cx, cy, k, t) { // ice tray: water cells turn into ice
      const tray = [[cx - 170, cy - 60], [cx + 170, cy - 64], [cx + 176, cy + 60], [cx - 166, cy + 64], [cx - 170, cy - 60]];
      P.fillPts(ctx, tray, '#EDEFF0'); stroke(ctx, tray, { w: 3, closed: true, seed: 2601 });
      for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
        const x = cx - 150 + i * 78, y = cy - 48 + j * 52, c = [[x, y], [x + 66, y], [x + 66, y + 44], [x, y + 44], [x, y]];
        const fr = E.clamp(k * 1.6 - (i + j) * 0.12);
        P.fillPts(ctx, c, PAL.water, 0.35 * (1 - fr)); P.fillPts(ctx, c, '#F2F7FA', fr); if (fr > 0.2) wash(ctx, c, F.ICE, 0.4 * fr, 2610 + i + j * 4, { bleed: 0.5, blooms: 0 });
        stroke(ctx, c, { w: 2, closed: true, dry: false, seed: 2620 + i + j * 4 });
      }
      for (let i = 0; i < 3; i++) { const x = cx - 120 + i * 120; P.arrow(ctx, [x, cy - 80], [x, cy - 140], 1, { w: 3, color: OUT, head: 12 }); }
      INK.label(ctx, 'ısı verir', cx, cy - 158, { size: 32, weight: 700, color: OUT, align: 'center' });
    },
    yogusma(ctx, cx, cy, k, t) { // cold glass collects droplets
      const g = [[cx - 70, cy - 110], [cx + 70, cy - 110], [cx + 56, cy + 100], [cx - 56, cy + 100]];
      P.fillPts(ctx, g, PAL.water, 0.18); stroke(ctx, g.concat([g[0]]), { w: 3, seed: 2630 });
      for (let i = 0; i < 3; i++) { const q = [[cx - 40 + i * 26, cy - 40 + (i % 2) * 30], [cx - 10 + i * 26, cy - 40 + (i % 2) * 30], [cx - 10 + i * 26, cy - 10 + (i % 2) * 30], [cx - 40 + i * 26, cy - 10 + (i % 2) * 30]]; P.fillPts(ctx, q, '#F2F7FA'); stroke(ctx, q.concat([q[0]]), { w: 1.6, dry: false, seed: 2631 + i }); }
      const r = rng(2640);
      for (let i = 0; i < 14; i++) { const side = i % 2 ? 1 : -1, y = cy - 90 + r() * 180, x = cx + side * (70 - (y - cy + 110) * 0.066) + side * 4; const kk = E.clamp(k * 1.5 - r() * 0.5); if (kk <= 0) continue; ctx.save(); ctx.fillStyle = 'rgba(46,106,140,0.75)'; ctx.beginPath(); ctx.ellipse(x, y, 4 * kk, 6 * kk, 0, 0, 7); ctx.fill(); ctx.restore(); }
      for (let i = 0; i < 10; i++) { const side = i % 2 ? 1 : -1, u = ((t * 0.3 + r()) % 1); const x = cx + side * (200 - u * 120), y = cy - 80 + r() * 160; ctx.save(); ctx.globalAlpha = 0.55 * Math.sin(u * Math.PI); stroke(ctx, circlePts(x, y, 6, 6, 12), { w: 1.6, closed: true, dry: false, color: PAL.water }); ctx.restore(); }
      INK.label(ctx, 'buzlu su', cx, cy + 140, { size: 30, align: 'center', alpha: 0.7 });
    },
    sublim(ctx, cx, cy, k, t) { // naphthalene balls shrink, particles leave
      const r = rng(2650);
      for (let i = 0; i < 3; i++) { const x = cx - 90 + i * 90, y = cy + 60, rad = 34 * (1 - 0.45 * k); const c = circlePts(x, y, rad, rad, 30); P.fillPts(ctx, c, PAL.white); wash(ctx, c, '#9A9387', 0.25, 2651 + i, { bleed: 0.6, blooms: 0 }); stroke(ctx, c, { w: 2.6, closed: true, seed: 2655 + i }); }
      for (let i = 0; i < 14; i++) { const x0 = cx - 110 + r() * 220, u = (t * 0.25 + r()) % 1; ctx.save(); ctx.globalAlpha = 0.6 * Math.sin(u * Math.PI) * Math.min(1, k * 2); stroke(ctx, circlePts(x0 + Math.sin(u * 6 + i) * 10, cy + 20 - u * 190, 6, 6, 12), { w: 1.6, closed: true, dry: false }); ctx.restore(); }
      INK.label(ctx, 'naftalin', cx, cy + 140, { size: 30, align: 'center', alpha: 0.7 });
    },
    kiragi(ctx, cx, cy, k, t) { // frost on grass at night
      P.fillPts(ctx, [[cx - 200, cy - 150], [cx + 200, cy - 150], [cx + 200, cy + 110], [cx - 200, cy + 110]], '#3A4660', 0.8);
      P.moon(ctx, cx + 130, cy - 90, 28);
      const r = rng(2660);
      for (let i = 0; i < 16; i++) { const x = cx - 185 + i * 24, h = 60 + r() * 60, a = (r() - 0.5) * 0.5; const top = [x + Math.sin(a) * h, cy + 110 - Math.cos(a) * h]; line(ctx, [x, cy + 110], top, { w: 3, color: '#8FB06A', dry: false, seed: 2661 + i });
        if (k > 0.1) for (let j = 0; j < 4; j++) { const u = 0.3 + j * 0.2, px = x + Math.sin(a) * h * u, py = cy + 110 - Math.cos(a) * h * u; ctx.save(); ctx.globalAlpha = E.clamp(k * 1.5 - j * 0.15); line(ctx, [px - 6, py - 4], [px + 6, py + 4], { w: 1.6, color: PAL.white, dry: false }); line(ctx, [px - 6, py + 4], [px + 6, py - 4], { w: 1.6, color: PAL.white, dry: false }); ctx.restore(); } }
      INK.label(ctx, 'kırağı', cx - 120, cy - 100, { size: 34, weight: 700, color: PAL.white, align: 'center' });
    }
  };
  E.scene({
    name: 'Akış şeması', concept: 'Hâl değişimleri: ısı alma ve ısı verme', from: 'freeze', to: 'flow', trFrom: [960, 540],
    draw(ctx, t) {
      const sf = E.s('freeze'), sc = E.s('condense'), su = E.s('sub'), sr = E.s('frost'), sl = E.s('flow');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 100, 1680, 810, { grid: 34 });
      // nodes
      const nodes = [['k', 'ice', 'katı'], ['s', 'liquid', 'sıvı'], ['g', 'vapor', 'gaz']];
      nodes.forEach(([id, st, name], i) => {
        const k = E.se(t, sf + 0.1 + i * 0.25, sf + 0.7 + i * 0.25, 'out'); if (k <= 0) return;
        const [x, y] = N[id];
        E.layer(ctx, k, c => {
          DAMLA.draw(c, { x, y: y + 126, s: 0.95, state: st, t: t * (st === 'ice' ? 0.3 : st === 'vapor' ? 1.8 : 1), seed: 1, expr: 'neutral', blink: E.blink(t, 20 + i), look: [0, 0], shadow: st !== 'vapor' });
          INK.label(c, name, x + (id === 'g' ? 140 : 0), id === 'g' ? y + 20 : y - 170, { size: 46, weight: 700, align: 'center', color: PAL.ink });
        });
      });
      // arrows
      const hl = E.clamp(Math.sin((t - sl) * 3) * 0.5 + 0.5) * (t > sl + 1 ? 1 : 0);
      const K = [
        [E.se(t, sf + 1.0, sf + 2.0), E.se(t, sf + 4.0, sf + 5.0)],
        [E.se(t, sf + 1.8, sf + 2.8), E.se(t, sc + 0.5, sc + 1.5)],
        [E.se(t, su + 0.5, su + 1.5), E.se(t, sr + 0.5, sr + 1.5)]
      ];
      PAIRS.forEach(([a, b, la, lb], i) => arrowPair(ctx, N[a], N[b], K[i][0], K[i][1], la, lb, hl, 1 - hl));
      if (K[1][0] > 0.9) INK.label(ctx, '(kaynama)', 886, 648, { size: 30, align: 'center', color: '#8A4A10', alpha: E.seg(K[1][0], 0.9, 1) * 0.85 });
      // example card
      const ex = [['donma', 'Su → buz', '0 °C’de donar, sıcaklık sabit', sf + 2.4, sc], ['yogusma', 'Buhar → su damlası', 'soğuk yüzeyde ısı verir', sc + 0.8, su], ['sublim', 'Katı → gaz', 'sıvı olmadan buharlaşır', su + 0.8, sr], ['kiragi', 'Gaz → katı', 'soğuk gecede ısı verir', sr + 0.8, sl]];
      const ck = E.se(t, sf + 2.2, sf + 3.0, 'out');
      if (ck > 0) {
        ctx.save(); ctx.translate((1 - ck) * 700, 0);
        F.card(ctx, 1380, 180, 420, 690, { seed: 2670 });
        ex.forEach(([fn, h, cap, a, b]) => {
          const k = Math.min(E.se(t, a, a + 0.6), 1 - E.se(t, b - 0.2, b + 0.3)); if (k <= 0) return;
          E.layer(ctx, k, c => {
            INK.label(c, h, 1590, 250, { size: 42, weight: 700, align: 'center' });
            EX[fn](c, 1590, 490, E.se(t, a + 0.6, a + 4), t);
            INK.label(c, cap, 1590, 690, { size: 30, align: 'center', alpha: 0.85 });
          });
        });
        // legend (flow beat)
        const lk = E.se(t, sl + 0.3, sl + 1.0);
        if (lk > 0) E.layer(ctx, lk, c => {
          INK.label(c, 'Akış şeması', 1590, 260, { size: 44, weight: 700, align: 'center' });
          P.arrow(c, [1430, 380], [1560, 380], 1, { w: 6, color: IN, head: 18 }); INK.label(c, 'ısı alır', 1580, 392, { size: 40, weight: 700, color: '#8A4A10' });
          P.arrow(c, [1430, 480], [1560, 480], 1, { w: 6, color: OUT, head: 18 }); INK.label(c, 'ısı verir', 1580, 492, { size: 40, weight: 700, color: OUT });
          [['Isı alınca:', '#8A4A10'], ['katı → sıvı → gaz', PAL.ink], ['Isı verince:', OUT], ['gaz → sıvı → katı', PAL.ink]].forEach(([s, col], i) => INK.label(c, s, 1590, 600 + i * 58 + (i > 1 ? 20 : 0), { size: 36, weight: 700, align: 'center', rot: 0, color: col }));
        });
        ctx.restore();
      }
    }
  });
})();

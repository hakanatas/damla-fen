// SAHNE 4 — Geri dönüşüm sembolü (TYMM: geri dönüşüm sembolü tanıtılır, OB4) ve geri dönüşüm döngüsü
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const C = [960, 590], RX = 540, RY = 255;
  const at = a => [C[0] + Math.cos(a) * RX, C[1] + Math.sin(a) * RY];
  function pellets(ctx, x, y, s) {
    const R = rng(77); const cols = ['#7FB0CF', '#E2B737', '#FBFAF6', '#3E74B0'];
    for (let i = 0; i < 38; i++) {
      const a = R() * Math.PI, d = Math.sqrt(R()), px = x + Math.cos(a) * d * 90 * s, py = y - Math.sin(a) * d * 44 * s;
      const p = circlePts(px, py, 8 * s, 6 * s, 10); P.fillPts(ctx, p, cols[i % 4], 0.9); stroke(ctx, p, { w: 1.3, closed: true, dry: false, seed: 700 + i });
    }
  }
  E.scene({
    name: 'Sembol', concept: 'Geri dönüşüm sembolü ve döngüsü', from: 'symbol', to: 'define', trFrom: [560, 600],
    draw(ctx, t) {
      const ss = E.s('symbol'), sl = E.s('loop'), sd = E.s('define');
      // 1) ambalaj üzerinde sembol
      const bA = 1 - E.se(t, sl - 0.2, sl + 0.8);
      if (bA > 0) E.layer(ctx, bA, c => {
        const bx = 560, by = 580, s = 2.6;
        W7.item(c, 'plastikSise', bx, by, s * E.lerp(0.85, 1, E.se(t, ss, ss + 1, 'out')));
        const k = E.se(t, ss + 1.0, ss + 2.2);
        W7.recycle(c, bx, by + 34 * s, 17, k, { w: 4.5 });
        if (t > ss + 2.2) { // büyüteç halkası
          const mk = E.se(t, ss + 2.2, ss + 2.8);
          c.save(); c.globalAlpha *= mk; stroke(c, circlePts(bx, by + 34 * s, 44, 44, 40), { w: 4, closed: true }); line(c, [bx + 32, by + 34 * s + 32], [bx + 70, by + 34 * s + 70], { w: 10, taper: 0.02 });
          P.arrow(c, [bx + 60, by + 34 * s - 40], [1060, 520], E.se(t, ss + 2.6, ss + 3.4), { w: 3, bend: 60 }); c.restore();
        }
      });
      // büyük sembol: önce sağda, sonra ortaya küçülür
      const bigK = E.se(t, ss + 3.0, ss + 4.8);
      if (bigK > 0) {
        const mv = E.se(t, sl + 0.2, sl + 1.4), up = E.se(t, sd + 0.2, sd + 1.0);
        const x = E.lerp(1320, C[0], mv), y = E.lerp(560, C[1], mv) - 90 * up, r = E.lerp(170, 80, mv) * E.lerp(1, 0.75, up);
        W7.recycle(ctx, x, y, r, bigK, { w: r * 0.17 });
        E.inkText(ctx, 'geri dönüşüm sembolü', 1320, 820, t, ss + 4.4, sl + 0.4, { size: 52, align: 'center' });
      }
      // 2) döngü: toplanır → ayrıştırılır, işlenir → ham madde → yeni ürün
      if (t > sl + 1.0) {
        const ST = [
          { a: -Math.PI / 2, at: sl + 1.4, draw: (c, k) => W7.bin(c, 'sari', 960, 440, 0.55 * P.pop(k), { lid: 0.3 }), lab: 'toplanır', lx: 960, ly: 300, al: 'center' },
          { a: 0, at: sl + 3.0, draw: (c, k) => W7.factory(c, 1490, 620, 0.85 * P.pop(k), t), lab: 'ayrıştırılır, işlenir', lx: 1650, ly: 765, al: 'center' },
          { a: Math.PI / 2, at: sl + 5.0, draw: (c, k) => pellets(c, 960, 860, P.pop(k)), lab: 'ham madde', lx: 960, ly: 790, al: 'center' },
          { a: Math.PI, at: sl + 6.8, draw: (c, k) => { W7.item(c, 'plastikSise', 410, 585, 0.9 * P.pop(k), -0.1); W7.item(c, 'yogurt', 515, 615, 0.8 * P.pop(k)); }, lab: 'yeni ürün', lx: 255, ly: 605, al: 'center' }
        ];
        ST.forEach((s, i) => {
          const k = E.se(t, s.at, s.at + 0.6, 'out'); if (k <= 0) return;
          s.draw(ctx, k);
          P.write(ctx, s.lab, s.lx, s.ly, E.seg(t, s.at + 0.3, s.at + 1.2), { size: 44, align: s.al });
          // bir sonraki istasyona ok (saat yönünde)
          const ak = E.se(t, s.at + 0.8, s.at + 1.6);
          if (ak > 0) {
            const a0 = s.a + 0.55, a1 = s.a + Math.PI / 2 - 0.55, pts = [];
            for (let j = 0; j <= 30; j++) pts.push(at(a0 + (a1 - a0) * j / 30));
            P.drawOn(ctx, pts, ak, { w: 4, color: '#3F7A3A' });
            if (ak > 0.98) INK.arrowHead(ctx, pts[27], pts[30], 20, { w: 4, color: '#3F7A3A' });
          }
        });
      }
      // 3) tanım
      if (t > sd + 0.6) {
        P.write(ctx, 'geri dönüşüm', C[0], C[1] + 40, E.seg(t, sd + 0.6, sd + 1.6), { size: 60, align: 'center', color: '#3F7A3A' });
        P.write(ctx, 'atık → ham madde → yeni ürün', C[0], C[1] + 100, E.seg(t, sd + 1.6, sd + 3.0), { size: 40, align: 'center' });
      }
      // Damla sol altta
      const pk = E.se(t, ss + 0.3, ss + 1.1, 'out');
      DAMLA.draw(ctx, { x: 150, y: 1075 + (1 - pk) * 300, s: 0.95, view: 'q3', expr: t > sd ? 'happy' : 'curious', look: [0.8, -0.5], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 3, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]] });
    }
  });
})();

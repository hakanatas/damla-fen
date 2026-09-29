// SAHNE 2 — Gruplama: üretici, tüketici, ayrıştırıcı (kavramlar açıklanır; beyin fırtınası + ayrılıp birleşme)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F722;
  // [anahtar, sütun (0 üretici, 1 tüketici, 2 ayrıştırıcı), yer]
  const LIST = [['ot', 0, 0], ['cekirge', 1, 0], ['kurbaga', 1, 1], ['yilan', 1, 2], ['sahin', 1, 3], ['mantar', 2, 0], ['bakteri', 2, 1]];
  const CW = 210, CH = 190;
  const COLS = [[330, 'ÜRETİCİ', PAL.life, 'producer'], [960, 'TÜKETİCİ', F.AMB, 'consumer'], [1590, 'AYRIŞTIRICI', '#8A6A45', 'decomposer']];
  const slot = (col, j) => col === 1 ? [960 + (j % 2 ? 120 : -120), 560 + Math.floor(j / 2) * 180] : [COLS[col][0], 560 + j * 180];
  E.scene({
    name: 'Grupla', concept: 'Üretici, tüketici, ayrıştırıcı', from: 'group', to: 'decomposer', trFrom: [960, 300],
    draw(ctx, t) {
      const sg = E.s('group');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.10)'); g.addColorStop(1, 'rgba(227,160,58,0.06)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      COLS.forEach(([cx, name, col, beat], i) => {
        const sb = E.s(beat), k = E.se(t, sb, sb + 0.6); if (k <= 0) return;
        const w = i === 1 ? 560 : 300;
        const b = F.rr(cx - w / 2, 440, w, 460, 16, 3);
        ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, b, PAL.white, 0.5); stroke(ctx, b, { w: 2.2, closed: true, alpha: 0.6, seed: 2500 + i }); ctx.restore();
        F.stamp(ctx, cx, 432, name, E.seg(t, sb + 0.3, sb + 0.8), { color: col, size: 44, rot: -0.03 });
      });
      // üretici: Güneş ışığı
      const sp = E.s('producer'), kp = E.se(t, sp + 1.6, sp + 2.4);
      if (kp > 0) {
        ctx.save(); ctx.globalAlpha *= kp;
        P.sun(ctx, 110, 560, 46, t, { nrays: 12, cells: false, glow: false });
        P.arrow(ctx, [165, 575], [215, 600], 1, { w: 3, color: F.AMB, bend: 0, head: 10 });
        F.fit(ctx, 'ışık', 110, 650, 120, 30, { color: F.AMB });
        ctx.restore();
      }
      LIST.forEach(([key, col, j], i) => {
        const at = sg + 0.8 + i * 0.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const mv = E.se(t, E.s(COLS[col][3]) + 0.6, E.s(COLS[col][3]) + 1.8);
        const x0 = 150 + i * 240, y0 = 180;
        const [sx, sy] = slot(col, j);
        const s = E.lerp(1, 0.82, mv);
        const x = E.lerp(x0, sx - CW * s / 2, mv), y = E.lerp(y0, sy - CH * s / 2, mv);
        const [name, draw] = F.ORG[key];
        E.layer(ctx, k, c => { c.save(); c.translate(x, y); c.scale(s, s); F.orgCard(c, 0, 0, CW, CH, name, (cc, cx, cy) => draw(cc, cx, cy, t), 2510 + i); c.restore(); });
      });
      const sd = E.s('decomposer');
      E.layer(ctx, 1 - E.se(t, E.s('producer') - 0.2, E.s('producer') + 0.6), c => F.damla(c, t, { x: 960, y: 890, s: 1.2, view: 'front', expr: 'thinking', look: [0, -0.8] }));
    }
  });
})();

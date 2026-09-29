// SAHNE 7 — 3. deney: etki ile elektriklenme (temassız). Kâğıt parçaları sıçrar; yüksüz elektroskopta yapraklar yaklaşınca açılır, uzaklaşınca kapanır.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F720;
  const BITS = []; { const r = INK.rng(707); for (let i = 0; i < 14; i++) BITS.push([560 + r() * 360, 792 - r() * 8, r() * 3, r() * 0.9 - 0.45]); }
  const BQ = [[-0.5, 0.55], [0.0, 0.8], [0.5, 0.55], [-0.6, -0.1], [0.6, -0.1]];
  E.scene({
    name: 'Etki ile', concept: 'Etki ile elektriklenme (temassız)', from: 'induce', to: 'induce3', trFrom: [740, 500],
    draw(ctx, t) {
      const si = E.s('induce'), s2 = E.s('induce2'), s3 = E.s('induce3');
      const sw = E.se(t, s3 - 0.3, s3 + 0.7);     // kâğıt → elektroskop geçişi
      const R = 90;
      F.damla(ctx, t, { x: 230, y: 880, s: 1.1, view: 'q3', expr: 'curious', look: [0.9, -0.3] });
      // --- A) kâğıt parçaları
      E.layer(ctx, 1 - sw, c => {
        stroke(c, [[480, 800], [1080, 798]], { w: 4, seed: 701 });
        c.save(); c.globalAlpha *= 0.25; c.fillStyle = '#8A6A45'; c.fillRect(480, 800, 600, 26); c.restore();
        const down = E.se(t, si + 0.8, si + 2.8);
        const bx = 740, by = E.lerp(260, 560, down);
        F.balloon(c, bx, by, R, F.HEAT, { strLen: 120 });
        BQ.forEach(([dx, dy]) => F.charge(c, bx + dx * R, by + dy * R, -1, 13));
        const bot = by + R * 1.2;
        BITS.forEach(([x, y, s, a], i) => {
          const at = si + 3.2 + (i % 7) * 0.18, k = E.se(t, at, at + 0.45, 'in');
          const sticks = i % 2 === 0;
          const tx = bx + (x - bx) * 0.35, ty = bot - 6 - Math.abs(x - bx) * 0.25;
          const j = sticks ? k : Math.sin(k * Math.PI) * 0.45;
          F.bit(c, E.lerp(x, tx, j), E.lerp(y, ty, j), 1, i, a * (1 - j));
        });
        if (down > 0.95) { c.save(); c.globalAlpha *= E.se(t, si + 2.8, si + 3.3) * (1 - E.se(t, si + 3.2, si + 3.6)); P.arrow(c, [960, bot + 10], [960, 780], 1, { w: 2.4, bend: 0, head: 10 }); P.arrow(c, [960, 780], [960, bot + 10], 1, { w: 2.4, bend: 0, head: 10 }); F.fit(c, 'dokunmadan', 1060, (bot + 790) / 2 + 12, 220, 36, { align: 'left' }); c.restore(); }
        // yakın plan: yükler yer değiştirdi
        const kz = E.se(t, s2 + 0.2, s2 + 1.0, 'out');
        if (kz > 0) {
          c.save(); c.globalAlpha *= kz;
          const cx = 1440, cy = 470, rr = 250;
          const ring = circlePts(cx, cy, rr, rr, 80);
          P.fillPts(c, ring, '#FAF6EC', 0.97); stroke(c, ring, { w: 3.4, closed: true, seed: 711 });
          INK.leader(c, [cx - rr * 0.85, cy + rr * 0.5], [880, 780], { bend: 0.1, dot: false });
          // balonun alt kenarı
          const arc = P.arc(cx, cy - rr - 120, 260, Math.PI * 0.28, Math.PI * 0.72, 30);
          c.save(); P.path(c, ring); c.clip();
          P.fillPts(c, arc.concat([[cx - 300, cy - rr - 200], [cx + 300, cy - rr - 200]]), F.HEAT, 0.35); stroke(c, arc, { w: 3, seed: 712 });
          [-120, -40, 40, 120].forEach(dx => F.charge(c, cx + dx, cy - 150 + Math.abs(dx) * 0.28 + 20, -1, 16));
          c.restore();
          // kâğıt
          const pp = [[cx - 170, cy + 10], [cx + 170, cy - 4], [cx + 176, cy + 110], [cx - 164, cy + 120]];
          F.shape(c, pp, null, 0, 713);
          const sep = E.se(t, s2 + 1.2, s2 + 2.6);
          [-110, -40, 30, 100].forEach((dx, i) => {
            F.charge(c, cx + dx, E.lerp(cy + 60, cy + 30, sep), 1, 14);
            F.charge(c, cx + dx + 22, E.lerp(cy + 60, cy + 95, sep), -1, 14);
          });
          F.wfit(c, 'yükler yer değiştirdi', cx, cy + 172, E.seg(t, s2 + 2.4, s2 + 3.4), 40, 420, { align: 'center', color: F.AMB });
          c.restore();
          F.stamp(c, 1620, 820, 'TEMASSIZ', E.seg(t, s2 + 3.6, s2 + 4.2), { color: PAL.ink, size: 50 });
        }
      });
      // --- B) yüksüz elektroskop
      if (sw > 0) E.layer(ctx, sw, c => {
        const ex = 1150, ey = 880, kx = ex, ky = ey - 420;
        const near = E.se(t, s3 + 0.8, s3 + 2.2) * (1 - E.se(t, s3 + 4.0, s3 + 5.2));
        const bx = E.lerp(560, kx - 26 - R - 70, near), by = ky - 20;
        const open = near;
        const q = E.clamp(near * 1.4);
        F.electroscope(c, ex, ey, 1.0, open, { knobCharges: [[-14, 0, 1], [14, 0, 1]], leafCharges: [[0.55, -1]], ca: q });
        F.balloon(c, bx, by, R, F.HEAT, { strLen: 90 });
        BQ.forEach(([dx, dy]) => F.charge(c, bx + dx * R, by + dy * R, -1, 13));
        F.fit(c, near > 0.6 ? 'yaklaştı → açık' : (t > s3 + 4.5 ? 'uzaklaştı → kapalı' : ''), 1560, 360, 420, 44, { color: F.AMB });
        if (near > 0.8) F.fit(c, 'dokunmuyor', kx + 20, ky - 110, 220, 36);
      });
    }
  });
})();

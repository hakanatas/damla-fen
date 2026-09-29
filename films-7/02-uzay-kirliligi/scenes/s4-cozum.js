// SAHNE 4 — Çözüm önerileri ve önermeler üzerinden akıl yürütme (FB.7.1.3 ç · KB2.4)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  const CX = [360, 960, 1560];
  E.scene({
    name: 'Çözüm', concept: 'Çözüm önerileri, akıl yürütme', from: 'solutions', to: 'reason2', trFrom: [960, 500],
    draw(ctx, t) {
      const so = E.s('solutions'), sg = E.s('design'), sr = E.s('reason'), s2 = E.s('reason2');
      const up = E.se(t, sr - 0.2, sr + 0.8);
      ctx.save(); ctx.translate(0, -up * 60); const sc = 1 - up * 0.0;
      const cards = [
        { at: so + 0.3, n: '1. atmosfere indir, yak', d: c => { c.save(); c.globalAlpha = 0.5; P.fillPts(c, P.arc(CX[0], 760, 230, Math.PI * 1.15, Math.PI * 1.85, 30).concat([[CX[0] + 200, 560], [CX[0] - 200, 560]]), '#9CC3D8', 1); c.restore();
            const k = E.se(t, so + 1, so + 5); const y = E.lerp(300, 540, k); F.deadSat(c, CX[0] + k * 40, y, 0.35, t, 0.4);
            if (y > 470) P.fillPts(c, [[CX[0] + k * 40 - 20, y - 20], [CX[0] - 60, y - 140], [CX[0] + k * 40 + 20, y - 30]], PAL.light, 0.7); } },
        { at: so + 3.5, n: '2. ağ ya da robot kolla topla', d: c => { F.shard(c, CX[1] + 40, 420, 26, 55); const k = E.se(t, so + 4.2, so + 6);
            const net = []; for (let i = 0; i <= 5; i++) { line(c, [CX[1] - 120 + i * 30 + k * 70, 330 + k * 20], [CX[1] - 110 + i * 30 + k * 70, 500 - k * 10], { w: 1.4, dry: false, alpha: 0.8 }); line(c, [CX[1] - 130 + k * 70, 340 + i * 32], [CX[1] + 30 + k * 70, 340 + i * 30], { w: 1.4, dry: false, alpha: 0.8 }); }
            line(c, [CX[1] - 180, 560], [CX[1] - 120 + k * 70, 420], { w: 6, seed: 470 }); line(c, [CX[1] - 240, 600], [CX[1] - 180, 560], { w: 6, seed: 471 }); } },
        { at: sg + 0.3, n: '3. görev sonunu baştan planla', d: c => { const bp = [[CX[2] - 170, 300], [CX[2] + 170, 300], [CX[2] + 170, 540], [CX[2] - 170, 540], [CX[2] - 170, 300]]; P.fillPts(c, bp, '#DCE6EE', 1); stroke(c, bp, { w: 2.4, closed: true, seed: 472 });
            for (let i = 1; i < 6; i++) line(c, [CX[2] - 170, 300 + i * 40], [CX[2] + 170, 300 + i * 40], { w: 0.8, alpha: 0.35, dry: false });
            F.satellite(c, CX[2] - 60, 380, 0.3, t); P.arrow(c, [CX[2] - 10, 410], [CX[2] + 110, 500], E.se(t, sg + 1.5, sg + 3), { w: 3, bend: -30, head: 12, color: F.AMBER_D });
            INK.label(c, 'görev sonu: yörüngeden çık', CX[2], 580 - 10, { size: 26, align: 'center', alpha: E.se(t, sg + 2.5, sg + 3.2) }); } }
      ];
      cards.forEach((cd, i) => { const k = E.se(t, cd.at, cd.at + 0.6, 'out'); if (k <= 0) return; E.layer(ctx, k, c => { F.card(c, CX[i] - 270, 230, 540, 420, { seed: 480 + i }); c.save(); c.beginPath(); c.rect(CX[i] - 266, 234, 532, 360); c.clip(); cd.d(c); c.restore(); INK.label(c, cd.n, CX[i], 630, { size: F.fitFont(c, cd.n, 500, 38), weight: 700, align: 'center' }); }); });
      ctx.restore();
      // önermeler
      const rk = E.se(t, sr + 0.2, sr + 0.9);
      if (rk > 0) E.layer(ctx, rk, c => {
        F.card(c, 150, 640, 1620, 260, { seed: 490, fill: '#F6E7B8' });
        P.write(c, 'Eğer her yeni uydu görev sonunda yörüngeden çıkarsa', 190, 710, E.seg(t, sr + 0.8, sr + 3.0), { size: 40 });
        P.write(c, '→ yeni çöp birikmez.', 1260, 710, E.seg(t, sr + 3.4, sr + 4.6), { size: 40, color: '#4E6B22' });
        P.write(c, 'Ama eski çöpler yerinde kalır', 190, 790, E.seg(t, s2 + 0.3, s2 + 2.0), { size: 40 });
        P.write(c, '→ O hâlde: önle + temizle, birlikte!', 800, 790, E.seg(t, s2 + 2.6, s2 + 4.4), { size: 44, color: F.AMBER_D });
      });
    }
  });
})();

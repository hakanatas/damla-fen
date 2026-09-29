// SAHNE 8 — Bileşik makine: bisiklet (pedal-aynakol = çıkrık, zincir-dişliler = dişli çark, fren kolu = kaldıraç)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F8M;
  const RW = [640, 660], FW = [1240, 660], WR = 170, CR = [900, 680];

  function wheel(ctx, c, r, rot, seed) {
    stroke(ctx, circlePts(c[0], c[1], r, r, 70), { w: 9, closed: true, seed, noBoil: true, vary: 0.1 });
    stroke(ctx, circlePts(c[0], c[1], r - 12, r - 12, 60), { w: 1.6, closed: true, alpha: 0.6, dry: false, seed: seed + 1, noBoil: true });
    for (let i = 0; i < 12; i++) { const a = rot + i * Math.PI / 6; line(ctx, c, [c[0] + Math.cos(a) * (r - 12), c[1] + Math.sin(a) * (r - 12)], { w: 1.2, dry: false, alpha: 0.6, seed: seed + 2 + i }); }
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(c[0], c[1], 8, 0, 7); ctx.fill(); ctx.restore();
  }
  function bike(ctx, t) {
    const cr = t * 1.6, rr = cr * 20 / 9;
    wheel(ctx, RW, WR, rr, 3800); wheel(ctx, FW, WR, rr, 3820);
    const seatTop = [850, 430], head = [1160, 420];
    const fr = [[RW, CR], [CR, seatTop], [seatTop, head], [CR, [1150, 450]], [RW, seatTop], [head, FW]];
    fr.forEach(([a, b], i) => line(ctx, a, b, { w: 9, color: PAL.water, seed: 3840 + i, taper: 0.02 }));
    // sele ve gidon
    const seat = [[800, 410], [900, 404], [890, 426], [812, 430], [800, 410]]; P.fillPts(ctx, seat, PAL.ink);
    line(ctx, head, [1140, 360], { w: 7, seed: 3850 }); line(ctx, [1100, 350], [1200, 356], { w: 8, seed: 3851 });
    line(ctx, [1180, 360], [1235, 380], { w: 4, color: F.RED, seed: 3852 });       // fren kolu
    // zincir
    line(ctx, [CR[0], CR[1] - 58], [RW[0], RW[1] - 26], { w: 3, color: F.ROPE, dry: false, taper: 0 });
    line(ctx, [CR[0], CR[1] + 58], [RW[0], RW[1] + 26], { w: 3, color: F.ROPE, dry: false, taper: 0 });
    F.gear(ctx, RW[0], RW[1], 24, 9, rr, { seed: 3860, td: 8, mark: PAL.ink });
    F.gear(ctx, CR[0], CR[1], 55, 20, cr, { seed: 3861, td: 10, mark: PAL.ink });
    // pedal kolu (aynakol)
    const pa = [CR[0] + Math.cos(cr) * 100, CR[1] + Math.sin(cr) * 100];
    line(ctx, CR, pa, { w: 9, seed: 3862, taper: 0.05 });
    const pd = F.rect(pa[0] - 26, pa[1] - 8, pa[0] + 26, pa[1] + 8); P.fillPts(ctx, pd, PAL.ink);
    return { pa };
  }
  const CALL = [
    ['pedal + aynakol', 'çıkrık', [360, 230], () => [CR[0] - 40, CR[1] - 40]],
    ['zincir + dişliler', 'dişli çark', [360, 860], () => [760, 700]],
    ['fren kolu', 'kaldıraç', [1560, 260], () => [1215, 372]]
  ];
  E.scene({
    name: 'Bileşik makine', concept: 'Basit makinelerin birlikte çalışması', from: 'compound', to: 'advantage', trFrom: [900, 680],
    draw(ctx, t) {
      const sc = E.s('compound'), sa = E.s('advantage');
      ctx.save(); E.cam(ctx, { x: 960, y: 560, z: 1 });
      F.floor(ctx, 830, 11);
      bike(ctx, t);
      ctx.restore();
      CALL.forEach(([a, b, p, tgt], i) => {
        const at = sc + 2.2 + i * 1.3, k = E.se(t, at, at + 0.7, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k;
        const q = tgt(); INK.leader(ctx, [p[0] + (p[0] < 960 ? 170 : -170), p[1] + (p[1] > 540 ? -40 : 30)], q, { w: 2.2, bend: 0.12 });
        F.txt(ctx, a, p[0], p[1] - 10, { size: 40, align: 'center' });
        F.txt(ctx, '→ ' + b, p[0], p[1] + 38, { size: 40, align: 'center', color: F.FORCE });
        ctx.restore();
      });
      const kk = E.se(t, sa + 0.4, sa + 1.0, 'out');
      if (kk > 0) { ctx.save(); ctx.globalAlpha *= kk; F.tag(ctx, 'daha hızlı', 1560, 560, { size: 46, fill: '#F6E7B8', seed: 3870 }); F.tag(ctx, 'daha az yorularak', 1560, 660, { size: 46, fill: '#F6E7B8', seed: 3871 }); ctx.restore(); }
      DAMLA.draw(ctx, { x: 1700, y: 900, s: 0.8, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 10), squash: E.breath(t), t, seed: 6, arms: [[-1, [-50, -150]], [1, 0.4]] });
    }
  });
})();

// SAHNE 5 — Olumlu/olumsuz etkiler (balık kılçığı) ve sanatta sürtünme (TYMM: OB9 resim kâğıdı ve kalem türleri)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', HOT = '#B5553F';
  function fishbone(ctx, t, spl, smi) {
    const y = 480, x0 = 260, x1 = 1400;
    P.drawOn(ctx, [[x0, y], [x1, y]], E.se(t, spl + 0.2, spl + 1.0), { w: 6 });
    const head = [[x1, y - 110], [x1 + 250, y - 60], [x1 + 330, y], [x1 + 250, y + 60], [x1, y + 110], [x1, y - 110]];
    const hk = E.se(t, spl + 0.6, spl + 1.2);
    if (hk > 0) { ctx.save(); ctx.globalAlpha = hk; P.fillPts(ctx, head, '#F6E7B8'); stroke(ctx, head, { w: 3.4, closed: true }); F08.txt(ctx, 'Sürtünmenin', x1 + 150, y - 8, { size: 36, align: 'center' }); F08.txt(ctx, 'etkileri', x1 + 150, y + 36, { size: 36, align: 'center' }); ctx.restore(); }
    const tail = [[x0, y], [x0 - 90, y - 90], [x0 - 90, y + 90], [x0, y]]; if (hk > 0) stroke(ctx, tail, { w: 3.4, closed: true, alpha: hk });
    const up = ['yürüyebiliriz', 'fren yapabiliriz', 'kalemle yazabiliriz'], dn = ['taban aşınır', 'makine parçaları aşınır', 'parçalar ısınır'];
    up.forEach((s, i) => { const x = 520 + i * 330, at = spl + 1.4 + i * 1.6, k = E.se(t, at, at + 0.6); if (k <= 0) return; P.drawOn(ctx, [[x + 90, y], [x - 20, y - 190]], k, { w: 3.4, color: PAL.life }); P.write(ctx, s, x - 20, y - 210, E.seg(t, at + 0.3, at + 1.2), { size: 36, align: 'center', color: PAL.life }); });
    dn.forEach((s, i) => { const x = 520 + i * 330, at = smi + 0.8 + i * 1.6, k = E.se(t, at, at + 0.6); if (k <= 0) return; P.drawOn(ctx, [[x + 90, y], [x - 20, y + 190]], k, { w: 3.4, color: HOT }); P.write(ctx, s, x - 20, y + 245, E.seg(t, at + 0.3, at + 1.2), { size: 36, align: 'center', color: HOT }); });
    F08.txt(ctx, 'olumlu', 200, 280, { size: 44, color: PAL.life, alpha: E.se(t, spl + 1.0, spl + 1.6) });
    F08.txt(ctx, 'olumsuz', 200, 720, { size: 44, color: HOT, alpha: E.se(t, smi + 0.4, smi + 1.0) });
    const ok = E.se(t, smi + 6.0, smi + 6.8);
    if (ok > 0) { ctx.save(); ctx.globalAlpha = ok; const b = [[1330, 640], [1790, 636], [1794, 760], [1334, 764], [1330, 640]]; P.fillPts(ctx, b, '#FAF6EC'); stroke(ctx, b, { w: 2.6, closed: true }); F08.txt(ctx, 'azaltmak için: yağlama', 1562, 715, { size: 38, align: 'center', color: BR }); ctx.restore(); }
  }
  function art(ctx, t, sa) {
    // drawing paper with a charcoal sketch
    const pg = [[260, 190], [1060, 180], [1070, 840], [270, 850], [260, 190]];
    ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 20; P.fillPts(ctx, pg, '#EFE6D2'); ctx.restore();
    const R = INK.rng(12); ctx.save(); ctx.globalAlpha = 0.25; for (let i = 0; i < 500; i++) { ctx.fillStyle = '#8A7A60'; ctx.fillRect(270 + R() * 790, 190 + R() * 650, 1.5, 1.5); } ctx.restore();
    stroke(ctx, pg, { w: 2.4, closed: true });
    const k = E.seg(t, sa + 0.4, sa + 4.0);
    const tree = P.bez([600, 760], [620, 560], [590, 420], 30);
    P.drawOn(ctx, tree, E.clamp(k * 2), { w: 14, color: '#2A2830', alpha: 0.85 });
    if (k > 0.4) { const c = INK.wobble(circlePts(620, 360, 170, 130, 50), 10, 5801); P.drawOn(ctx, c, E.clamp((k - 0.4) * 2), { w: 10, color: '#2A2830', alpha: 0.7 }); }
    INK.hatch(ctx, 480, 380, 260, 200, { n: Math.round(20 * E.clamp((k - 0.5) * 2)), ang: -0.8, w: 3, alpha: 0.5, color: '#2A2830' });
    P.icon.pencil(ctx, 780, 700, 1.3, -0.9);
    F08.txt(ctx, 'resim kâğıdı + kara kalem', 665, 900 - 20, { size: 38, align: 'center', alpha: E.se(t, sa + 0.5, sa + 1.2) });
    // magnified tooth
    const lk = E.se(t, sa + 3.0, sa + 3.8, 'out');
    if (lk > 0) {
      const cx = 1420, cy = 470, rr = 250 * P.pop(lk);
      ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); ctx.fillStyle = '#FBF8F1'; ctx.fillRect(cx - rr, cy - rr, 2 * rr, 2 * rr);
      const pr = F08.profile(cx - rr, cx + rr, cy + 60, 60, 81, 16); P.fillPts(ctx, pr.concat([[cx + rr, cy + rr], [cx - rr, cy + rr]]), '#E6DAC0'); stroke(ctx, pr, { w: 3 });
      const R2 = INK.rng(5); for (let i = 1; i < pr.length - 1; i += 2) for (let j = 0; j < 6; j++) P.fillPts(ctx, circlePts(pr[i][0] + (R2() - 0.5) * 14, pr[i][1] - 6 - R2() * 16, 5, 5, 8), '#2A2830', 0.9);
      ctx.restore(); stroke(ctx, circlePts(cx, cy, rr, rr, 60), { w: 6, closed: true }); line(ctx, [cx + rr * 0.7, cy + rr * 0.7], [cx + rr * 1.05, cy + rr * 1.05], { w: 14, taper: 0.02 });
      E.inkText(ctx, 'pürüzlü kâğıt, kalemin tozunu tutar', 1420, 820, t, sa + 4.4, 1e9, { size: 40, align: 'center', color: BR });
    }
  }
  E.scene({
    name: 'Etkiler', concept: 'Sürtünmenin olumlu ve olumsuz etkileri; sanatta sürtünme', from: 'plus', to: 'art', trFrom: [960, 480],
    draw(ctx, t) {
      const spl = E.s('plus'), smi = E.s('minus'), sa = E.s('art');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const aA = E.se(t, sa - 0.3, sa + 0.6);
      if (aA < 1) E.layer(ctx, 1 - aA, c => fishbone(c, t, spl, smi));
      if (aA > 0) E.layer(ctx, aA, c => art(c, t, sa));
    }
  });
})();

// SAHNE 2 — Pürüzlü ve az pürüzlü yüzeyler; sürtünme kuvvetinin tanımı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  function lane(ctx, t, y, kind, at, dist, i) {
    const x0 = 360;
    if (kind === 'carpet') F08.carpet(ctx, 180, 1780, y); else F08.polished(ctx, 180, 1780, y);
    const u = E.seg(t, at, at + 2.6), sl = 1 - (1 - u) * (1 - u);
    F08.box(ctx, x0 + dist * sl, y, 150, 110, i);
    P.arrow(ctx, [x0 - 150, y - 55], [x0 - 20, y - 55], E.se(t, at - 0.6, at), { w: 5, head: 18 });
    F08.txt(ctx, kind === 'carpet' ? 'halı' : 'cilalı zemin', 190, y - 140, { size: 44 });
    if (u >= 1) F08.txt(ctx, kind === 'carpet' ? 'hemen durdu' : 'daha uzağa kaydı', x0 + dist + 180, y - 40, { size: 40, color: BR, alpha: E.se(t, at + 2.6, at + 3.2) });
  }
  function lens(ctx, cx, cy, r, amp, seed, lab, k) {
    if (k <= 0) return; const rr = r * P.pop(k);
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 7); ctx.clip(); ctx.fillStyle = '#FBF8F1'; ctx.fillRect(cx - rr, cy - rr, 2 * rr, 2 * rr);
    const pr = F08.profile(cx - rr, cx + rr, cy + 20, amp, seed, 22); P.fillPts(ctx, pr.concat([[cx + rr, cy + rr], [cx - rr, cy + rr]]), amp > 20 ? '#C98A74' : '#D8C39A'); stroke(ctx, pr, { w: 3 });
    ctx.restore(); stroke(ctx, circlePts(cx, cy, rr, rr, 50), { w: 6, closed: true }); line(ctx, [cx + rr * 0.7, cy + rr * 0.7], [cx + rr * 1.1, cy + rr * 1.1], { w: 12, taper: 0.02 });
    F08.txt(ctx, lab, cx, cy - rr - 20, { size: 40, align: 'center', alpha: k });
  }
  E.scene({
    name: 'Yüzeyler', concept: 'Pürüzlü ve az pürüzlü yüzeyler; sürtünme kuvveti', from: 'rough', to: 'def', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('rough'), sz = E.s('zoom'), sd = E.s('def');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      const aD = E.se(t, sd - 0.3, sd + 0.6);
      if (aD < 1) E.layer(ctx, 1 - aD, c => {
        const zk = E.se(t, sz - 0.2, sz + 0.6);
        c.save(); c.globalAlpha = 1 - 0.55 * zk;
        lane(c, t, 450, 'carpet', sr + 0.8, 170, 1);
        lane(c, t, 780, 'polished', sr + 1.4, 900, 2);
        c.restore();
        lens(c, 560, 330, 180, 34, 61, 'çok pürüzlü', E.se(t, sz + 0.4, sz + 1.2));
        lens(c, 1360, 330, 180, 7, 62, 'az pürüzlü', E.se(t, sz + 2.2, sz + 3.0));
        if (zk > 0) E.inkText(c, 'girinti ve çıkıntılar', 960, 640, t, sz + 5.0, 1e9, { size: 50, align: 'center', color: BR });
      });
      if (aD > 0) E.layer(ctx, aD, c => {
        // close-up of two surfaces
        const y = 560, off = 40 * Math.sin(E.seg(t, sd + 0.8, sd + 8) * 3);
        const bottom = F08.profile(200, 1720, y, 24, 71, 60);
        P.fillPts(c, bottom.concat([[1720, 900], [200, 900]]), '#C98A74', 0.8); stroke(c, bottom, { w: 3.4 });
        c.save(); c.translate(off, 0);
        const top = F08.profile(420, 1500, y - 6, -22, 72, 42);
        P.fillPts(c, [[420, 260], [1500, 260]].concat(top.slice().reverse()), '#D9BF8F'); INK.wash(c, [[420, 260], [1500, 260], [1500, y], [420, y]], '#8A6A45', 0.35, 5501, { bleed: 1 }); stroke(c, top, { w: 3.4 });
        F08.txt(c, 'kutu', 960, 360, { size: 50, align: 'center' });
        c.restore();
        F08.farrow(c, [1260, 330], [1600, 330], 'hareket', E.se(t, sd + 0.6, sd + 1.4), { color: PAL.ink, dy: -24, size: 42 });
        F08.farrow(c, [900, y + 60], [520, y + 60], 'sürtünme kuvveti', E.se(t, sd + 2.2, sd + 3.0), { dy: 70, size: 46, w: 6 });
        E.inkText(c, '(yakından görünüm · ölçekli değildir)', 960, 880, t, sd + 1.0, 1e9, { size: 30, align: 'center', alpha: 0.65, weight: 400 });
        E.inkText(c, 'temas eden yüzeyler arasında, harekete karşı koyar', 960, 200, t, sd + 3.4, 1e9, { size: 46, align: 'center' });
      });
      DAMLA.draw(ctx, { x: 1760, y: 1010, s: 0.8, view: 'q3', flip: true, expr: 'curious', look: [-0.9, -0.4], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.4], [1, 2.2]], prop: 'lens', propTilt: -0.4 });
    }
  });
})();

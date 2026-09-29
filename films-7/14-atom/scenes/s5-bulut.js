// SAHNE 5 — Elektronlar çok hızlı: yerleri saptanamaz → bulunma ihtimali (elektron bulutu); atomun yarıçapı; boşluk (FB.7.5.1)
(function () {
  const { PAL, line, stroke, circlePts, dashed, noiseFn } = INK;
  const F = F7M;
  const nx = noiseFn(71), ny = noiseFn(72);
  E.scene({
    name: 'Elektron bulutu', concept: 'Bulunma ihtimali ve atomun yarıçapı', from: 'fast', to: 'tiny', trFrom: [620, 500],
    draw(ctx, t) {
      const sf = E.s('fast'), sr = E.s('radius'), st = E.s('tiny');
      const ax = 600, ay = 500, R = 300;
      const zipA = 1 - E.se(t, sf + 3.5, sf + 4.5);
      const cloudA = E.se(t, sf + 3.0, sf + 5.0);
      if (cloudA > 0) E.layer(ctx, cloudA, c => F.cloud(c, ax, ay, R, t, { n: 1100, alpha: 0.8 }));
      F.ball(ctx, ax, ay, 16, F.C.p, { sym: '+', symSize: 20 });
      // hızlı elektron: izi bulanık, konumu belirsiz
      if (zipA > 0) E.layer(ctx, zipA, c => {
        const pts = []; for (let k = 0; k < 24; k++) { const tt = t * 3 - k * 0.02; pts.push([ax + nx(tt) * R * 0.75, ay + ny(tt) * R * 0.75]); }
        for (let k = 1; k < pts.length; k++) { c.save(); c.globalAlpha *= (1 - k / pts.length) * 0.6; line(c, pts[k - 1], pts[k], { w: 8 * (1 - k / pts.length), color: PAL.water, dry: false }); c.restore(); }
        F.electron(c, pts[0][0], pts[0][1], 16);
        [[-0.7, -0.4], [0.5, -0.6], [0.6, 0.5], [-0.4, 0.6]].forEach(([u, v], i) => INK.label(c, '?', ax + u * R, ay + v * R, { size: 60, weight: 700, alpha: 0.5 + 0.3 * Math.sin(t * 4 + i), align: 'center' }));
      });
      // açıklamalar (sağ)
      const k1 = Math.min(E.se(t, sf + 4.5, sf + 5.3), 1 - E.se(t, st - 0.2, st + 0.5));
      if (k1 > 0) {
        ctx.save(); ctx.globalAlpha *= k1; INK.leader(ctx, [1040, 360], [ax + 50, ay - 40], { w: 2 }); INK.leader(ctx, [1040, 560], [ax + 250, ay + 90], { w: 2 }); ctx.restore();
        P.write(ctx, 'yoğun bölge: ihtimal fazla', 1050, 370, k1, { size: 44 });
        P.write(ctx, 'seyrek bölge: ihtimal az', 1050, 570, Math.min(k1, E.seg(t, sf + 5.3, sf + 6.2)), { size: 44 });
      }
      // yarıçap
      const rk = E.se(t, sr + 0.2, sr + 1.2);
      if (rk > 0) {
        ctx.save(); ctx.globalAlpha *= rk; dashed(ctx, F.densePts(circlePts(ax, ay, R, R, 90), 4), { w: 2.6, on: 12, off: 10 }); ctx.restore();
        P.arrow(ctx, [ax, ay], [ax - R * 0.72, ay + R * 0.69], E.se(t, sr + 0.8, sr + 1.6), { w: 3, head: 13, color: F.BR });
        P.write(ctx, 'yarıçap', ax - 260, ay + 150, E.seg(t, sr + 1.4, sr + 2.2), { size: 46, color: F.BR, align: 'center' });
        INK.label(ctx, 'elektronların bulunabildiği son sınır', ax, ay - R - 24, { size: 36, align: 'center', alpha: E.se(t, sr + 1.6, sr + 2.4) });
      }
      // stadyum benzetmesi
      const sk = E.se(t, st, st + 0.7, 'out');
      if (sk > 0) E.layer(ctx, sk, c => {
        F.card(c, 1010, 210, 1850, 820, { seed: 511 });
        const cx = 1430, cy = 500;
        const outer = circlePts(cx, cy, 340, 190, 80), inner = circlePts(cx, cy, 250, 120, 70);
        P.fillPts(c, outer, '#E6DCC6'); stroke(c, outer, { w: 3, closed: true, seed: 512 });
        P.fillPts(c, inner, '#CFE0C0'); INK.wash(c, inner, PAL.life, 0.3, 513, { bleed: 2, blooms: 0 }); stroke(c, inner, { w: 2.6, closed: true, seed: 514 });
        for (let i = 0; i < 28; i++) { const a = i / 28 * 6.283; line(c, [cx + Math.cos(a) * 262, cy + Math.sin(a) * 132], [cx + Math.cos(a) * 330, cy + Math.sin(a) * 182], { w: 1.2, alpha: 0.45, dry: false, seed: 520 + i }); }
        c.save(); c.fillStyle = '#D8B26A'; c.beginPath(); c.arc(cx, cy, 6, 0, 7); c.fill(); c.strokeStyle = PAL.ink; c.lineWidth = 1.6; c.stroke(); c.restore();
        INK.leader(c, [cx, cy + 50], [cx, cy + 8], { w: 2, bend: 0 });
        P.write(c, 'nohut = çekirdek', cx, cy + 90, E.seg(t, st + 1.2, st + 2.2), { size: 40, align: 'center' });
        P.write(c, 'stadyum = atom', 1060, 290, E.seg(t, st + 0.6, st + 1.6), { size: 44 });
        P.write(c, 'Atomun büyük kısmı boşluktur.', 1060, 770, E.seg(t, st + 2.8, st + 4.2), { size: 42, color: PAL.water });
        INK.label(c, '(çizim ölçekli değildir)', 1810, 290, { size: 28, align: 'right', alpha: 0.6 });
      });
    }
  });
})();

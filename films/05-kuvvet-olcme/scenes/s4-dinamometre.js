// SAHNE 4 — Dinamometre: bölümleri, çalışma ilkesi, el kantarı (TYMM köprü kurma), birim Newton (N)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', X = 760, Y = 110;
  E.scene({
    name: 'Dinamometre', concept: 'Dinamometre ve Newton (N) birimi', from: 'dyn', to: 'newton', trFrom: [760, 400],
    draw(ctx, t) {
      const sd = E.s('dyn'), sp = E.s('parts'), sk = E.s('kantar'), sn = E.s('newton'), en = E.e('newton');
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      // stand bar
      const pk = E.se(t, sd + 0.2, sd + 1.0, 'out');
      line(ctx, [560, Y + 4], [980, Y + 2], { w: 7, taper: 0.02, seed: 2201 });
      stroke(ctx, [[980, Y + 2], [990, 900]], { w: 7, seed: 2202, taper: 0.02 });
      stroke(ctx, [[900, 902], [1080, 900]], { w: 7, seed: 2203, taper: 0.02 });
      const F = 4 * E.se(t, sp + 4.0, sp + 5.4) * (1 - E.se(t, en - 1.6, en - 0.6));
      let r;
      ctx.save(); ctx.translate(X, Y - 300 * (1 - pk)); ctx.translate(-X, -Y);
      r = F05.dyn(ctx, X, Y - 8, { L: 460, W: 110, max: 10, F, num: 30 });
      ctx.restore();
      // pull arrow at hook
      if (F > 0.05) {
        P.arrow(ctx, [X, r.hook[1] + 10], [X, r.hook[1] + 100], E.clamp(F / 1.2), { w: 5, head: 18, color: BR });
        INK.label(ctx, 'kuvvet', X + 30, r.hook[1] + 80, { size: 38, weight: 700, color: BR, alpha: E.clamp(F / 2) });
      }
      // part labels (left side)
      const L = [
        ['halka', [X - 20, Y + 10], 126, sp + 0.3],
        ['yay', [X - 34, r.top + 70], r.top + 80, sp + 1.2],
        ['kanca', [X - 18, r.hook[1] - 12], r.hook[1] + 4, sp + 3.0],
        ['gösterge', [X - 58, r.py], r.py + 12, sp + 6.4]
      ];
      L.forEach(([txt, to, y, at], i) => {
        const k = E.se(t, at, at + 0.7); if (k <= 0) return;
        P.write(ctx, txt, 560, y, k, { size: 46, align: 'right' });
        ctx.save(); ctx.globalAlpha = k; INK.leader(ctx, [572, y - 14], to, { bend: 0.1, seed: 2210 + i }); ctx.restore();
      });
      const ok = E.se(t, sp + 7.6, sp + 8.3) * (1 - E.se(t, sn + 1.4, sn + 2.0));
      if (ok > 0) {
        P.write(ctx, 'ölçek', 960, 330, ok, { size: 46 });
        ctx.save(); ctx.globalAlpha = ok; INK.leader(ctx, [955, 318], [X + 90, 360], { bend: -0.15, seed: 2220 }); ctx.restore();
        stroke(ctx, INK.wobble([[X + 58, r.s0 - 16], [X + 110, r.s0 - 16], [X + 110, r.s1 + 16], [X + 58, r.s1 + 16], [X + 58, r.s0 - 16]], 2, 2221), { w: 2.6, color: PAL.light, closed: true, alpha: ok });
      }
      // right side phases
      const aK = E.se(t, sk - 0.2, sk + 0.6), aN = E.se(t, sn - 0.2, sn + 0.6);
      if (aK < 1) E.layer(ctx, 1 - aK, c => {
        P.write(c, 'dinamometre', 1440, 250, E.seg(t, sd + 0.8, sd + 2.0), { size: 72, align: 'center' });
        P.write(c, 'kuvvetin büyüklüğünü ölçer', 1440, 320, E.seg(t, sd + 1.8, sd + 3.2), { size: 42, weight: 400, align: 'center' });
        DAMLA.draw(c, { x: 1460, y: 880, s: 1.35, view: 'q3', flip: true, expr: t < sp ? 'happy' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1,
          arms: [[-1, 0.4], [1, 2.1 + 0.06 * Math.sin(t * 2)]] });
      });
      if (aK > 0 && aN < 1) E.layer(ctx, Math.min(aK, 1 - aN), c => {
        P.write(c, 'el kantarı', 1440, 230, E.seg(t, sk + 0.6, sk + 1.6), { size: 64, align: 'center' });
        F05.kantar(c, 1440, 560, 1.25, 0.2 + 0.25 * E.se(t, sk + 1.0, sk + 2.4, 'back'));
        P.write(c, '= bir çeşit dinamometre', 1440, 880, E.seg(t, sk + 2.4, sk + 3.6), { size: 44, align: 'center', color: BR });
      });
      if (aN > 0) E.layer(ctx, aN, c => {
        F05.card(c, 1250, 200, 1850, 740, { seed: 2230 });
        c.save(); c.font = '700 200px Fraunces'; c.textAlign = 'center'; c.fillStyle = BR; c.globalAlpha = E.se(t, sn + 0.4, sn + 1.2); c.fillText('N', 1380, 440); c.restore();
        P.write(c, 'Newton', 1500, 360, E.seg(t, sn + 0.8, sn + 1.8), { size: 70 });
        P.write(c, 'kuvvet birimi', 1500, 420, E.seg(t, sn + 1.4, sn + 2.4), { size: 40, weight: 400 });
        P.write(c, '1 N, 2 N, 3 N ...', 1550, 560, E.seg(t, sn + 2.4, sn + 3.6), { size: 52, align: 'center' });
        P.write(c, 'Isaac Newton (1643–1727)', 1550, 660, E.seg(t, sn + 4.2, sn + 5.4), { size: 38, weight: 400, align: 'center' });
        // reading callout at the pointer
        const rk = E.se(t, sn + 2.0, sn + 2.8, 'out');
        if (rk > 0 && F > 3.9) {
          c.save(); c.globalAlpha = rk; P.arrow(c, [930, r.py - 56], [X + 130, r.py - 6], 1, { w: 3, head: 14, bend: 16 });
          INK.label(c, 'okunan değer: 4 N', 880, r.py - 76, { size: 42, weight: 700 }); c.restore();
        }
      });
    }
  });
})();

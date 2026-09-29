// SAHNE 4 — Model önerme (plan çizimi) ve ölçekleme (TYMM FB.5.2.2 a: basit araç gereçle model önerir)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const BR = '#8A4A10';
  const marbles = n => (ctx, x, by) => { for (let i = 0; i < n; i++) { const r = i % 4, row = Math.floor(i / 4); const cx = x - 27 + r * 18 + (row % 2) * 9, cy = by - 9 - row * 15; P.fillPts(ctx, circlePts(cx, cy, 8, 8, 12), PAL.water, 0.7); INK.stroke(ctx, circlePts(cx, cy, 8, 8, 12), { w: 1.4, closed: true, dry: false }); } };
  E.scene({
    name: 'Model öner', concept: 'Model önerme ve ölçekleme', from: 'plan', to: 'calib', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('plan'), sc = E.s('calib');
      const aC = E.se(t, sc - 0.3, sc + 0.6);
      if (aC < 1) E.layer(ctx, 1 - aC, c => {
        c.fillStyle = 'rgba(138,106,69,0.16)'; c.fillRect(0, 0, E.W, E.H);
        P.notebook(c, 150, 90, 1620, 820);
        P.write(c, 'Model 1 · plan çizimi', 290, 195, E.seg(t, sp + 0.3, sp + 1.5), { size: 56 });
        const mk = E.se(t, sp + 0.8, sp + 2.0);
        c.save(); c.globalAlpha = mk; F06.model(c, 900, 240, { type: 'band', F: 0, marks: 3 * E.seg(t, sp + 6.5, sp + 7.5) }); c.restore();
        const L = [
          ['kalem (askı)', [800, 276], 250, sp + 2.0, 'L'], ['lastik bant', [893, 340], 360, sp + 3.0, 'L'],
          ['ataş (gösterge)', [955, 410], 470, sp + 4.4, 'L'], ['bardak', [855, 520], 580, sp + 5.4, 'L'],
          ['karton (ölçek)', [1010, 470], 340, sp + 6.4, 'R']
        ];
        L.forEach(([txt, to, y, at, side], i) => {
          const k = E.se(t, at, at + 0.7); if (k <= 0) return;
          const x = side === 'L' ? 660 : 1160;
          P.write(c, txt, x, y, k, { size: 42, align: side === 'L' ? 'right' : 'left' });
          c.save(); c.globalAlpha = k; INK.leader(c, [side === 'L' ? x + 10 : x - 10, y - 14], to, { bend: side === 'L' ? 0.12 : -0.12, seed: 3400 + i }); c.restore();
        });
        E.inkText(c, 'Bu benim önerim; testle sınayacağım.', 1200, 800, t, sp + 7.8, 1e9, { size: 36, align: 'center', color: BR });
        DAMLA.draw(c, { x: 1690, y: 1050, s: 1.05, view: 'q3', flip: true, expr: 'thinking', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 2, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
      });
      if (aC > 0) E.layer(ctx, aC, c => {
        c.save(); c.globalAlpha = 0.1; c.fillStyle = PAL.water; c.fillRect(0, 0, E.W, E.H); c.restore();
        // calibration: n = 0..5, each mark at pointer
        const T0 = sc + 0.8, dt = 1.6;
        const n = E.clamp(Math.floor((t - T0) / dt), -1, 5);
        const loadN = n < 0 ? 0 : n;
        const prevF = Math.max(0, loadN - 1), f = n <= 0 ? 0 : E.lerp(prevF, loadN, E.se(t, T0 + n * dt, T0 + n * dt + 0.6, 'out'));
        const marks = n < 0 ? 0 : Math.min(6, n + E.seg(t, T0 + n * dt + 0.7, T0 + n * dt + 1.1));
        const r = F06.model(c, 620, 170, { type: 'band', F: f, marks, content: marbles(loadN * 3) });
        P.write(c, 'Model 1', 620, 900, 1, { size: 44, align: 'center' });
        // reference: real dynamometer card
        F06.card(c, 1060, 190, 1760, 860, { seed: 3420 });
        P.write(c, 'gerçek dinamometreyle ölçtüm:', 1410, 260, E.seg(t, sc + 0.4, sc + 1.4), { size: 38, align: 'center' });
        if (n >= 0) {
          const rd = F06.dyn(c, 1260, 290, { L: 260, W: 76, max: 10, F: loadN, num: 28 });
          if (loadN > 0) { c.save(); c.translate(1260, rd.hook[1]); c.scale(0.8, 0.8); c.translate(-1260, -rd.hook[1]); F06.cup(c, 1260, rd.hook[1] - 4, marbles(loadN * 3)); c.restore(); }
          else INK.label(c, 'boş bardak = 0', 1260, rd.hook[1] + 60, { size: 34, weight: 700, align: 'center' });
          c.save(); c.font = '700 110px Kalam'; c.textAlign = 'center'; c.fillStyle = BR; c.fillText(loadN + ' N', 1560, 540); c.restore();
          INK.label(c, loadN === 0 ? '(dara)' : '→ çizgi çiz', 1560, 610, { size: 36, align: 'center', weight: 700 });
        }
        DAMLA.draw(c, { x: 910, y: 900, s: 1.05, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.4], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 2,
          arms: [[-1, 0.4], [1, [-(r.y0 + r.step * loadN - 900) * 0 + 60, (r.y0 + r.step * loadN - 900) / 1.05 + 10]]], hold: (cc, res) => { if (res[1]) DAMLA.pencilProp(cc, res[1].hand, -2.6); } });
      });
      F06.badge(ctx, t, t < sc ? 2 : 3, 1);
    }
  });
})();

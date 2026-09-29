// SAHNE 6 — Karşılaştır ve yenile (TYMM: modelini arkadaşlarının modelleriyle karşılaştırır, hataları gelişim fırsatı görür — SDB1.3)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', RED = '#A23A2A', X = 560, Y = 160;
  const A = F06.block('A', 44);
  function mini(ctx, x, y, type, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); F06.model(ctx, x, y, { type, F: 0, marks: 6 }); ctx.restore(); }
  E.scene({
    name: 'Karşılaştır ve yenile', concept: 'Yeni kanıtla modeli yenileme', from: 'compare', to: 'retest', trFrom: [960, 450],
    draw(ctx, t) {
      const sc = E.s('compare'), sr = E.s('revise'), st = E.s('retest');
      const aR = E.se(t, sr - 0.3, sr + 0.6);
      if (aR < 1) E.layer(ctx, 1 - aR, c => {
        c.fillStyle = 'rgba(138,106,69,0.16)'; c.fillRect(0, 0, E.W, E.H);
        const C = [
          [390, 'Benim modelim', 'band', ['lastik bant', 'sıfıra dönmedi'], false, 0.3],
          [960, 'Arkadaşımın modeli', 'spring', ['tükenmez kalem yayı', 'hep sıfıra döndü'], true, 1.8],
          [1530, 'Başka bir model', 'band', ['iki kat lastik', 'ölçek çok sıkışık'], false, 3.2]
        ];
        C.forEach(([x, ttl, type, lines, ok, at], i) => {
          const k = E.se(t, sc + at, sc + at + 0.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 470); c.scale(P.pop(k), P.pop(k)); c.rotate([-0.02, 0.015, -0.01][i]); c.translate(-x, -470);
          F06.card(c, x - 250, 170, x + 250, 800, { seed: 3600 + i, color: ok ? '#C07F1E' : undefined, w: ok ? 4 : 2.6 });
          P.fillPts(c, [[x - 40, 150], [x + 40, 154], [x + 38, 186], [x - 42, 182]], 'rgba(227,200,140,0.75)');
          F06.txt(c, ttl, x, 240, { size: 40, align: 'center' });
          mini(c, x - 10, 270, type, 0.62);
          F06.txt(c, lines[0], x, 690, { size: 36, align: 'center' });
          F06.txt(c, lines[1], x, 740, { size: 36, align: 'center', color: ok ? PAL.life : RED });
          c.restore();
        });
        const hk = E.se(t, sc + 5.2, sc + 6.0);
        if (hk > 0) stroke(c, INK.wobble(circlePts(960, 485, 290, 355, 60), 3, 3620), { w: 5, closed: true, color: PAL.light, alpha: hk });
        E.inkText(c, 'Neden hep sıfıra dönüyor? → yay daha kararlı esniyor', 960, 880, t, sc + 6.2, 1e9, { size: 38, align: 'center', color: BR });
      });
      if (aR > 0) E.layer(ctx, aR, c => {
        c.save(); c.globalAlpha = 0.1; c.fillStyle = PAL.water; c.fillRect(0, 0, E.W, E.H); c.restore();
        const swap = E.se(t, sr + 1.2, sr + 2.6);
        const remark = E.se(t, sr + 3.4, sr + 7.4);
        // retest schedule
        let F = 0, content = null;
        if (t > st) {
          if (t < st + 3.2) { F = 2 * E.se(t, st + 0.4, st + 1.4, 'out'); content = A; }
          else if (t < st + 5.4) { F = 2 * (1 - E.se(t, st + 3.3, st + 4.1, 'out')); content = F > 1 ? A : null; }
          else { F = 2 * E.se(t, st + 5.6, st + 6.6, 'out'); content = A; }
        }
        const marks = t < st ? (remark < 0.02 ? 6 * (1 - E.se(t, sr + 2.6, sr + 3.3)) : 6 * remark) : 6;
        E.layer(c, 1 - swap, cc => F06.model(cc, X, Y, { type: 'band', F, marks, content }));
        let r = null; E.layer(c, swap, cc => { r = F06.model(cc, X, Y, { type: 'spring', F, marks, content }); });
        if (!r) r = { py: Y + 160 + 40 * F };
        P.write(c, t < sr + 1.2 ? 'Model 1' : 'Model 2', X, 900, 1, { size: 44, align: 'center' });
        const tag = (txt, a) => { if (a <= 0) return; c.save(); c.globalAlpha = a; F06.txt(c, txt, X + 190, r.py + 18, { size: 52 }); c.restore(); P.check(c, X + 320, r.py - 6, 40, a, { w: 5 }); };
        if (t > st) { if (t < st + 3.2) tag('2 N', E.se(t, st + 1.6, st + 2.0)); else if (t < st + 5.4) tag('0 N', E.se(t, st + 4.2, st + 4.6)); else tag('2 N', E.se(t, st + 6.8, st + 7.2)); }
        // change list card
        F06.card(c, 1060, 170, 1800, 760, { seed: 3630 });
        P.write(c, 'Model 2 · yenilediklerim', 1430, 240, E.seg(t, sr + 0.4, sr + 1.4), { size: 42, align: 'center' });
        const L = [['lastik bant → yay', sr + 1.4], ['ölçeği yeniden işaretle', sr + 3.4]];
        L.forEach(([s, at], i) => { const k = E.seg(t, at, at + 1.0); if (k > 0) { P.write(c, s, 1120, 320 + i * 70, k, { size: 40 }); P.check(c, 1740, 300 + i * 70, 36, E.se(t, at + 1.0, at + 1.4), { w: 4 }); } });
        if (t > st) {
          line(c, [1100, 470], [1760, 466], { w: 1.8, dry: false });
          P.write(c, 'Tekrar test', 1120, 530, E.seg(t, st + 0.2, st + 1.0), { size: 40, color: BR });
          const R = [['A cismi: 2 N', st + 2.0], ['boş: 0 N', st + 4.6], ['A tekrar: 2 N', st + 7.2]];
          R.forEach(([s, at], i) => { const k = E.seg(t, at, at + 0.8); if (k > 0) { P.write(c, s, 1120, 600 + i * 55, k, { size: 36 }); P.check(c, 1500, 584 + i * 55, 32, E.se(t, at + 0.6, at + 1.0), { w: 4 }); } });
        }
        DAMLA.draw(c, { x: 900, y: 900, s: 1.0, view: 'q3', flip: true, expr: t > st + 7.2 ? 'happy' : 'determined', look: [-0.8, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 2,
          arms: t > st + 7.2 ? [[-1, 2.6], [1, 2.6]] : [[-1, 0.4], [1, 2.0 + 0.1 * Math.sin(t * 5)]] });
      });
      F06.badge(ctx, t, t < st ? 5 : 4, 1);
    }
  });
})();

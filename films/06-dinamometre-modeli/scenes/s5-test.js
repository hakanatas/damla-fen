// SAHNE 5 — Test ve yeni kanıt: lastik bant sıfıra dönmüyor (TYMM FB.5.2.2 b: yeni kanıtlar)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10', RED = '#A23A2A', X = 560, Y = 160;
  const A = F06.block('A', 44), B = F06.block('B', 74, '#C9A87A');
  E.scene({
    name: 'Test', concept: 'Test etme ve yeni kanıt', from: 'test', to: 'why', trFrom: [560, 500],
    draw(ctx, t) {
      const st = E.s('test'), se = E.s('evidence'), sw = E.s('why');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // load schedule
      let F = 0, content = null, shift = 0;
      if (t < st + 4.0) { F = 2 * E.se(t, st + 0.6, st + 1.6, 'out'); content = t > st + 0.5 ? A : null; }
      else if (t < se) { F = 2 + 2 * E.se(t, st + 4.2, st + 5.2, 'out'); content = B; }
      else if (t < se + 4.4) { const k = E.se(t, se + 0.3, se + 1.2, 'out'); F = 4 * (1 - k); shift = 0.5 * k; content = k < 0.5 ? B : null; }
      else { shift = 0.5; F = 2 * E.se(t, se + 4.6, se + 5.6, 'out'); content = A; }
      const r = F06.model(ctx, X, Y, { type: 'band', F, shift, marks: 6, content });
      const read = F + shift;
      const tag = (txt, ok, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; F06.txt(ctx, txt, X + 190, r.py + 18, { size: 52, color: ok ? PAL.ink : RED }); ctx.restore(); if (ok) P.check(ctx, X + 330, r.py - 6, 40, a, { w: 5 }); else P.cross(ctx, X + 340, r.py - 6, 20, a, { w: 5, color: RED }); };
      if (t < st + 4.0) tag('2 N', true, E.se(t, st + 1.8, st + 2.2));
      else if (t < se) tag('4 N', true, E.se(t, st + 5.4, st + 5.8));
      else if (t < se + 4.4) tag('0,5 N', false, E.se(t, se + 1.4, se + 1.8));
      else tag('2,5 N', false, E.se(t, se + 5.8, se + 6.2));
      if (t > se + 1.4 && t < se + 4.4) E.inkText(ctx, 'sıfıra dönmedi!', X - 90, r.y0 - 30, t, se + 1.6, se + 4.4, { size: 44, color: RED, align: 'right' });
      // test log
      const lk = E.se(t, st + 0.2, st + 0.9, 'out');
      if (lk > 0) E.layer(ctx, lk, c => {
        F06.card(c, 1060, 170, 1800, 760, { seed: 3501 });
        P.write(c, 'Test kaydı · Model 1', 1430, 240, E.seg(t, st + 0.4, st + 1.4), { size: 44, align: 'center' });
        const rows = [['A cismi', '2 N', true, st + 2.4], ['B cismi', '4 N', true, st + 6.0], ['boş bardak', '0,5 N', false, se + 2.0], ['A tekrar', '2,5 N', false, se + 6.4]];
        rows.forEach(([a, b, ok, at], i) => {
          const k = E.seg(t, at, at + 0.8); if (k <= 0) return; const y = 330 + i * 80;
          P.write(c, a, 1110, y, k, { size: 42 }); P.write(c, b, 1450, y, k, { size: 42, color: ok ? PAL.ink : RED });
          if (ok) P.check(c, 1640, y - 16, 40, E.se(t, at + 0.5, at + 0.9), { w: 5 }); else P.cross(c, 1650, y - 14, 18, E.se(t, at + 0.5, at + 0.9), { w: 5, color: RED });
          line(c, [1100, y + 20], [1760, y + 18], { w: 1.2, dry: false, alpha: 0.4 });
        });
        // criteria check (why)
        const wk = E.se(t, sw + 3.0, sw + 3.8);
        if (wk > 0) {
          c.save(); c.globalAlpha = wk;
          P.write(c, 'Ölçütler:', 1110, 670, 1, { size: 38, color: BR });
          F06.txt(c, 'kolay okunur', 1290, 670, { size: 36 }); P.check(c, 1520, 654, 34, wk, { w: 4 });
          F06.txt(c, 'aynı sonuç', 1290, 725, { size: 36 }); P.cross(c, 1528, 712, 15, E.se(t, sw + 3.6, sw + 4.2), { w: 4, color: RED });
          c.restore();
        }
      });
      // why: magnified inset of the tired rubber band
      const ik = E.se(t, sw + 0.3, sw + 1.1, 'out');
      if (ik > 0) {
        const mx = 250, my = 380, mr = 150 * P.pop(ik);
        ctx.save(); ctx.beginPath(); ctx.arc(mx, my, mr, 0, 7); ctx.clip(); ctx.fillStyle = '#EDE0C4'; ctx.fillRect(mx - mr, my - mr, 2 * mr, 2 * mr);
        F06.band(ctx, mx - 40, my - 130, my + 130, { w: 16 }); F06.band(ctx, mx + 50, my - 130, my + 60, { w: 16, color: '#C98A74' });
        ctx.restore();
        stroke(ctx, circlePts(mx, my, mr, mr, 60), { w: 6, closed: true }); line(ctx, [mx + mr * 0.7, my + mr * 0.7], [mx + mr * 1.1, my + mr * 1.1], { w: 14, taper: 0.02 });
        INK.label(ctx, 'gevşemiş', mx - 40, my + mr + 50, { size: 36, weight: 700, align: 'center', alpha: ik });
        INK.label(ctx, 'yeni', mx + 90, my + mr + 50, { size: 36, weight: 700, align: 'center', alpha: ik });
        E.inkText(ctx, 'çok gerilen lastik', 70, 660, t, sw + 1.4, 1e9, { size: 40, color: BR }); E.inkText(ctx, 'tam geri dönmedi', 70, 710, t, sw + 1.8, 1e9, { size: 40, color: BR });
      }
      DAMLA.draw(ctx, { x: 900, y: 900, s: 1.0, view: 'q3', flip: true, expr: t < se + 1.4 ? 'happy' : (t < sw ? 'surprised' : 'thinking'), look: [-0.8, -0.4], blink: E.blink(t, 8), squash: E.breath(t), t, seed: 2,
        arms: t < se + 1.4 ? [[-1, 0.4], [1, 2.3]] : [[-1, 0.3], [1, [30, -86]]] });
      F06.badge(ctx, t, 4, 1);
    }
  });
})();

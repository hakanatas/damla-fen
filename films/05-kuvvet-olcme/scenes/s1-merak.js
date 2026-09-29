// SAHNE 1 — Merak: günlük hayatta itme ve çekme (TYMM temel kabul: kuvvetin cisimler üzerindeki etkisi bilinir)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const FY = 860;
  function vignette(ctx, i, x, y, k, u, t) { // k: pop, u: 0..1 action progress
    ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
    F05.card(ctx, -210, -150, 210, 150, { seed: 1810 + i });
    ctx.save(); ctx.beginPath(); ctx.rect(-205, -145, 410, 290); ctx.clip();
    line(ctx, [-200, 90], [200, 90], { w: 2.4, dry: false, seed: 1820 + i });
    if (i === 0) { // ball kicked
      const bx = -110 + 230 * E.ease.out(u), rot = u * 8;
      const b = circlePts(bx, 50, 40, 40, 30); P.fillPts(ctx, b, PAL.white); wash(ctx, b, PAL.light, 0.4, 1830, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 1831 });
      line(ctx, [bx + Math.cos(rot) * -38, 50 + Math.sin(rot) * -38], [bx + Math.cos(rot) * 38, 50 + Math.sin(rot) * 38], { w: 2, dry: false });
      if (u > 0.05 && u < 0.9) for (let j = 0; j < 3; j++) line(ctx, [bx - 60 - j * 6, 34 + j * 16], [bx - 100 - j * 10, 34 + j * 16], { w: 2, alpha: 0.6, dry: false });
      // impact burst + push arrow at the start
      const ik = 1 - E.seg(u, 0.25, 0.5);
      if (ik > 0) { ctx.save(); ctx.globalAlpha = ik; for (let j = 0; j < 7; j++) { const a = j / 7 * 6.28; line(ctx, [-160 + Math.cos(a) * 16, 50 + Math.sin(a) * 16], [-160 + Math.cos(a) * 34, 50 + Math.sin(a) * 34], { w: 2.4, color: '#8A4A10', dry: false }); } ctx.restore(); }
      P.arrow(ctx, [-200, 50], [-156, 50], Math.min(1, u * 5 + 0.3), { w: 3.4, head: 12, color: '#8A4A10' });
    } else if (i === 1) { // door pulled open
      const fr = [[-60, -120], [60, -120], [60, 90], [-60, 90]]; stroke(ctx, fr, { w: 3, seed: 1840 });
      P.fillPts(ctx, fr, PAL.ink, 0.75);
      const open = E.ease.io(u), dw = 120 * Math.cos(open * 1.25);
      const d = [[-60, -120], [-60 + dw, -120 - 16 * open], [-60 + dw, 90 + 16 * open], [-60, 90], [-60, -120]];
      P.fillPts(ctx, d, '#C9A87A'); wash(ctx, d, '#8A6A45', 0.4, 1841, { bleed: 1, blooms: 0 }); stroke(ctx, d, { w: 3, closed: true, seed: 1842 });
      INK.inkDot(ctx, -60 + dw * 0.85, -10, 5);
      if (u > 0.1) P.arrow(ctx, [-60 + dw * 0.85 + 20, -10], [-60 + dw * 0.85 + 110, -10], Math.min(1, u * 3), { w: 3.4, head: 14, color: '#8A4A10' });
    } else { // dough squeezed
      const sq = E.ease.io(u), w = 70 + 40 * sq, h = 55 - 28 * sq;
      const b = INK.wobble(circlePts(0, 90 - h, w, h, 36), 2, 1850); P.fillPts(ctx, b, '#EBD9B5'); wash(ctx, b, PAL.light, 0.35, 1851, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 1852 });
      const hy = 90 - 2 * h - 12; P.fillPts(ctx, [[-60, hy - 26], [60, hy - 26], [60, hy], [-60, hy]], '#A9C6D6'); stroke(ctx, [[-60, hy - 26], [60, hy - 26], [60, hy], [-60, hy], [-60, hy - 26]], { w: 2.6, closed: true, dry: false });
      P.arrow(ctx, [0, hy - 110], [0, hy - 36], Math.min(1, u * 3 + 0.2), { w: 3.4, head: 14, color: '#8A4A10' });
    }
    ctx.restore(); ctx.restore();
  }
  E.scene({
    name: 'Merak', concept: 'İtme ve çekme: kuvvetin etkileri', from: 'title', to: 'define',
    draw(ctx, t) {
      const sh = E.s('hello'), sp = E.s('push'), sd = E.s('define');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.02 * E.se(t, 0, sd, 'sine') });
      // soft wall wash
      ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = PAL.water; ctx.fillRect(-100, -100, 2200, FY + 100); ctx.restore();
      F05.floor(ctx, FY);
      // vignettes
      const V = [[420, 'top hareket etti', 0.2], [960, 'kapı açıldı', 2.8], [1500, 'şekli değişti', 5.4]];
      const out = E.se(t, sd - 0.3, sd + 0.6);
      if (t > sp && out < 1) E.layer(ctx, 1 - out, c => V.forEach(([x, lab, at], i) => {
        const k = E.se(t, sp + at, sp + at + 0.5, 'out'); if (k <= 0) return;
        vignette(c, i, x, 330, k, E.seg(t, sp + at + 0.5, sp + at + 2.2), t);
        P.write(c, lab, x, 540, E.seg(t, sp + at + 1.2, sp + at + 2.2), { size: 40, align: 'center' });
      }));
      // define: Damla pushes a box
      const dk = E.se(t, sd, sd + 0.8);
      const dx = E.lerp(960, 700, dk), boxX = dx + 145 + 60 * E.se(t, sd + 1.2, sd + 3.5);
      if (dk > 0) E.layer(ctx, dk, c => {
        const b = [[boxX, FY - 170], [boxX + 200, FY - 172], [boxX + 202, FY], [boxX + 2, FY], [boxX, FY - 170]];
        P.fillPts(c, b, '#D9BF8F'); wash(c, b, '#8A6A45', 0.45, 1860, { bleed: 1.5 }); stroke(c, b, { w: 3.4, closed: true, seed: 1861 });
        line(c, [boxX + 10, FY - 120], [boxX + 190, FY - 122], { w: 1.8, dry: false, alpha: 0.6 });
        P.arrow(c, [boxX + 230, FY - 90], [boxX + 420, FY - 90], E.se(t, sd + 1.4, sd + 2.2), { w: 5, head: 20, color: '#8A4A10' });
        P.write(c, 'itme', boxX + 320, FY - 120, E.seg(t, sd + 1.8, sd + 2.6), { size: 44, align: 'center', color: '#8A4A10' });
        E.inkText(c, 'itmek ya da çekmek = kuvvet uygulamak', 960, 300, t, sd + 2.4, 1e9, { size: 62, align: 'center' });
        P.drawOn(c, P.bez([440, 330], [960, 342], [1480, 326], 30), E.se(t, sd + 3.0, sd + 3.8), { w: 3, color: PAL.light });
      });
      // Damla
      let o = { x: dx, y: FY, s: 1.45, view: 'front', expr: 'neutral', look: [0, 0.1], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1 };
      if (t < sh + 0.8) { o.blink = t < 1.2 ? 1 : E.blink(t, 2); o.expr = 'happy'; }
      if (t > sh && t < sp) { o.expr = 'happy'; o.arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]]; }
      else if (t >= sp && t < sd) { o.expr = 'curious'; const which = t < sp + 2.8 ? -0.9 : (t < sp + 5.4 ? 0 : 0.9); o.look = [which, -0.9]; o.arms = [[-1, 0.35], [1, 0.4]]; }
      else if (t >= sd) {
        const push = E.se(t, sd + 0.5, sd + 1.2); o.view = 'q3'; o.expr = 'determined'; o.lean = 0.16 * push; o.look = [0.6, 0];
        o.arms = [[-1, [E.lerp(20, 80, push), E.lerp(-60, -110, push)]], [1, [E.lerp(50, 96, push), E.lerp(-60, -120, push)]]];
        if (t > sd + 1.2) o.feet = E.walk((t - sd) * 5 * (1 - E.seg(t, sd + 3.3, sd + 3.6)), 8, 5);
        o.x = dx + 60 * E.se(t, sd + 1.2, sd + 3.5);
      }
      if (t < 1.2) { for (let i = 0; i < 2; i++) { const c = ((t * 0.5 + i / 2) % 1); INK.label(ctx, 'z', o.x + 60 + c * 60, FY - 330 - c * 80, { size: 34 + i * 8, weight: 700, alpha: (1 - E.seg(t, 0.6, 1.2)) * 0.8 * Math.sin(c * Math.PI) }); } }
      DAMLA.draw(ctx, o);
      ctx.restore();
      F05.title(ctx, t, 5, 'Kuvveti Ölçelim: Dinamometre', 2);
    }
  });
})();

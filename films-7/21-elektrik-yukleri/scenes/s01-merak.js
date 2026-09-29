// SAHNE 1 — Merak: asılı iki balon birbirini iter; balon Ece'nin saçını çeker. Soru: neden bazen iter, bazen çeker?
(function () {
  const { PAL, line, stroke } = INK;
  const F = F721;
  F.bg = (ctx) => { const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.12)'); g.addColorStop(1, 'rgba(192,127,30,0.06)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H); };
  E.scene({
    name: 'İter mi, çeker mi?', concept: 'Soru sorma', from: 'title', to: 'hook2',
    draw(ctx, t) {
      const sh = E.s('hook'), s2 = E.s('hook2');
      F.bg(ctx);
      const sw = E.se(t, s2 - 0.2, s2 + 0.8);
      // A) asılı balonlar
      E.layer(ctx, (1 - sw) * E.se(t, E.e('title') + 0.2, E.e('title') + 1.0), c => {
        const ang = 0.03 + 0.3 * E.se(t, sh + 0.8, sh + 2.6, 'out') + 0.01 * Math.sin(t * 2);
        const pos = F.hang(c, 1150, 240, 160, 200, [ang, ang], [F.HEAT, F.HEAT], t);
        if (t > sh + 2.8) pos.forEach(([x, y], i) => { c.save(); c.globalAlpha *= E.se(t, sh + 2.8, sh + 3.4); P.arrow(c, [x + (i ? 40 : -40), y], [x + (i ? 130 : -130), y], 1, { w: 3, bend: 0, color: F.AMB, head: 14 }); c.restore(); });
      });
      // B) Ece'nin saçı ve balon
      if (sw > 0) E.layer(ctx, sw, c => {
        const app = E.se(t, s2 + 0.6, s2 + 2.4);
        const pull = E.se(t, s2 + 1.6, s2 + 3.2);
        const ex = 1320, ey = 880, s = 1.1;
        const hy = ey - s * (40 + 90 + 58);
        const bx = E.lerp(1760, ex + 150, app), by = E.lerp(260, hy - 150, app);
        F.kid(c, ex, ey, s, t, 0.15 + 0.15 * pull, { pull: pull * 0.9, target: [(bx - ex) / s, (by - ey) / s + 60] });
        F.balloon(c, bx, by, 62, F.HEAT, { strLen: 90 });
        if (t > s2 + 1.2) { c.save(); c.globalAlpha *= E.se(t, s2 + 1.2, s2 + 1.8); INK.label(c, 'Ece', ex - 160, ey - 60, { size: 40, weight: 700 }); c.restore(); }
      });
      F.damla(ctx, t, { x: 420, y: 880, s: 1.3, view: 'q3', expr: t > s2 + 3 ? 'thinking' : 'curious', look: [0.9, -0.3] });
      const bk = E.se(t, s2 + 3.4, s2 + 4.1);
      if (bk > 0) {
        P.bubble(ctx, 720, 330, 720, 210, [470, 560], bk, 5);
        P.write(ctx, 'Bazen iter, bazen çeker.', 720, 315, E.seg(t, s2 + 3.8, s2 + 4.8), { size: 48, align: 'center' });
        P.write(ctx, 'Neden?', 720, 385, E.seg(t, s2 + 4.8, s2 + 5.4), { size: 50, align: 'center', color: F.AMB });
      }
      F.title(ctx, t, '21 · Elektrik Yükleri', 'Fen Bilimleri · 7. sınıf · Ünite 6', F.AMB);
    }
  });
})();

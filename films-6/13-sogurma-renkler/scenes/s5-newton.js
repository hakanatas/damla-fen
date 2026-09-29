// SAHNE 5 — Newton çarkı (FB.6.4.5 b: gözlemleri kaydeder, c: beyaz ışık tüm renklerin bileşimidir çıkarımı)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  E.scene({
    name: 'Newton çarkı', concept: 'Beyaz ışık: tüm renklerin bileşimi', from: 'wheel', to: 'white', trFrom: [760, 520],
    draw(ctx, t) {
      const sw = E.s('wheel'), ss = E.s('spin'), sh = E.s('white');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const cx = 700, cy = 520, r = 280;
      // paint the 7 sectors one by one
      const paint = 7 * E.se(t, sw + 0.8, sw + 5.0, 'sine');
      // spin: angle grows with accelerating speed; blend follows speed
      const spinK = E.se(t, ss + 0.2, ss + 3.2, 'in');
      const tt = Math.max(0, t - (ss + 0.2));
      const rot = tt < 3 ? 0.9 * tt * tt : 8.1 + 5.4 * (tt - 3);
      const blend = E.se(t, ss + 1.4, ss + 3.4);
      F.wheel(ctx, cx, cy, r, rot, blend, paint);
      // motion arcs while spinning
      if (spinK > 0.05 && blend < 1) for (let i = 0; i < 3; i++) { const a0 = t * 7 + i * 2.1; const pts = P.arc(cx, cy, r + 30, a0, a0 + 1.1, 16); ctx.save(); ctx.globalAlpha *= 0.5 * spinK; stroke(ctx, pts, { w: 3, seed: 610 + i }); INK.arrowHead(ctx, pts[14], pts[16], 12, { w: 3 }); ctx.restore(); }
      else if (blend >= 1) for (let i = 0; i < 3; i++) { const a0 = t * 7 + i * 2.1; const pts = P.arc(cx, cy, r + 30, a0, a0 + 1.1, 16); ctx.save(); ctx.globalAlpha *= 0.5; stroke(ctx, pts, { w: 3, seed: 610 + i }); INK.arrowHead(ctx, pts[14], pts[16], 12, { w: 3 }); ctx.restore(); }
      INK.label(ctx, 'Newton çarkı', cx, cy + r + 80, { size: 44, weight: 700, align: 'center', alpha: E.se(t, sw + 0.5, sw + 1.2) });
      // colour list (the 7 sectors) on the right
      const listA = 1 - E.se(t, sh - 0.2, sh + 0.6);
      if (listA > 0) E.layer(ctx, listA, c => {
        F.SPEC.forEach((s, i) => {
          const at = sw + 0.8 + i * 0.6, k = E.se(t, at, at + 0.5); if (k <= 0) return;
          const y = 250 + i * 72;
          c.save(); c.globalAlpha *= k; P.fillPts(c, circlePts(1180, y - 12, 22, 22, 20), s.c, 0.9); stroke(c, circlePts(1180, y - 12, 22, 22, 20), { w: 2, closed: true, dry: false }); c.restore();
          P.write(c, s.n, 1225, y, k, { size: 44 });
        });
        // observation record
        if (t > ss + 3.2) {
          P.write(c, 'Gözlem: renkler kayboldu,', 1150, 800, E.seg(t, ss + 3.2, ss + 4.4), { size: 42, color: '#8A4A10' });
          P.write(c, 'çark beyaza yakın görünüyor.', 1150, 856, E.seg(t, ss + 4.2, ss + 5.4), { size: 42, color: '#8A4A10' });
        }
      });
      if (blend > 0.6 && t < sh + 0.6) { INK.label(ctx, 'beyaza yakın!', cx, cy - r - 40, { size: 42, weight: 700, align: 'center', alpha: E.se(t, ss + 3.2, ss + 3.8), rot: -0.08 }); }
      // inference card
      const ik = E.se(t, sh + 0.3, sh + 1.1, 'out');
      if (ik > 0) E.layer(ctx, ik, c => {
        F.card(c, 1100, 250, 700, 560, { fill: '#FBF3DC', color: F.AMB, seed: 620 });
        P.write(c, 'Çıkarım', 1150, 330, E.seg(t, sh + 0.5, sh + 1.3), { size: 54, color: '#8A4A10' });
        F.SPEC.forEach((s, i) => { const k = E.se(t, sh + 0.9 + i * 0.15, sh + 1.3 + i * 0.15); if (k > 0) { c.save(); c.globalAlpha *= k; P.fillPts(c, circlePts(1170 + i * 62, 430, 22, 22, 20), s.c, 0.9); c.restore(); } if (i < 6 && k > 0) INK.label(c, '+', 1201 + i * 62, 442, { size: 30, weight: 700, align: 'center', alpha: k }); });
        P.write(c, '= beyaz ışık', 1150, 530, E.seg(t, sh + 2.2, sh + 3.0), { size: 54 });
        P.write(c, 'Beyaz ışık, tüm ışık', 1150, 640, E.seg(t, sh + 3.0, sh + 4.0), { size: 44 });
        P.write(c, 'renklerinin bileşimidir.', 1150, 700, E.seg(t, sh + 3.6, sh + 4.6), { size: 44 });
      });
      DAMLA.draw(ctx, { x: 1000, y: 1030, s: 0.85, view: 'q3', flip: true, expr: blend > 0.6 ? 'surprised' : 'curious', look: [-0.7, -0.5], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 3, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });
})();

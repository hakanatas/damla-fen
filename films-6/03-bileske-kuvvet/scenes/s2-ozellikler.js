// SAHNE 2 — Kuvvetin özellikleri: uygulama noktası, doğrultu, yön, büyüklük (ölçekli ok: 1 kare = 1 N)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  E.scene({
    name: 'Kuvvetin özellikleri', concept: 'Uygulama noktası, doğrultu, yön, büyüklük', from: 'point', to: 'size', trFrom: [700, 560],
    draw(ctx, t) {
      const sp = E.s('point'), sl = E.s('line'), ss = E.s('size');
      const U = F63.U, ox = 600, oy = 560;
      F63.grid(ctx, 240, 260, 1440, 800, ox, oy);
      INK.label(ctx, '1 kare = 1 N', 1420, 240, { size: 36, weight: 700, align: 'right', alpha: 0.75 });
      // object
      F63.box(ctx, ox - 90, oy + 80, 180, 160, 3201);
      // doğrultu (dashed line through the arrow)
      const dk = E.se(t, sl + 0.4, sl + 2.0);
      if (dk > 0) {
        ctx.save(); ctx.globalAlpha = 0.85; dashed(ctx, P.partial(P.bez([260, oy], [850, oy], [1420, oy], 60), dk), { w: 2.6, on: 16, off: 12, color: PAL.water }); ctx.restore();
        E.inkText(ctx, 'doğrultu', 1250, oy - 40, t, sl + 1.4, 1e9, { size: 42, color: PAL.water });
      }
      // arrow (5 N to the right)
      const ak = E.se(t, sp + 0.6, sp + 1.8);
      F63.farrow(ctx, ox, oy, 5, 1, ak, { w: 7, head: 24, dot: true });
      // application point highlight
      const pk = E.se(t, sp + 2.4, sp + 3.2);
      if (pk > 0) {
        ctx.save(); ctx.globalAlpha = pk;
        P.drawOn(ctx, INK.wobble(circlePts(ox, oy, 30, 30, 40), 2, 3210), pk, { w: 3.4, color: PAL.light, closed: true });
        INK.leader(ctx, [ox - 10, oy - 180], [ox - 8, oy - 36], { bend: -0.2, w: 2 });
        ctx.restore();
        E.inkText(ctx, 'uygulama noktası', ox - 60, oy - 196, t, sp + 2.8, 1e9, { size: 44 });
      }
      // two directions on the same doğrultu
      const yk = E.se(t, sl + 4.0, sl + 5.0);
      if (yk > 0) {
        ctx.save(); ctx.globalAlpha = yk;
        P.arrow(ctx, [1180, oy + 70], [1400, oy + 70], 1, { w: 4, head: 16, color: PAL.water });
        INK.label(ctx, 'sağ yön', 1290, oy + 125, { size: 38, weight: 700, align: 'center', color: PAL.water });
        P.arrow(ctx, [520, oy - 110], [290, oy - 110], 1, { w: 4, head: 16, color: PAL.water });
        INK.label(ctx, 'sol yön', 400, oy - 130, { size: 38, weight: 700, align: 'center', color: PAL.water });
        ctx.restore();
      }
      // büyüklük: count squares
      for (let i = 0; i < 5; i++) {
        const k = E.se(t, ss + 0.6 + i * 0.45, ss + 0.9 + i * 0.45); if (k <= 0) continue;
        ctx.save(); ctx.globalAlpha = k;
        P.fillPts(ctx, [[ox + i * U + 3, oy + 3], [ox + (i + 1) * U - 3, oy + 3], [ox + (i + 1) * U - 3, oy + U - 3], [ox + i * U + 3, oy + U - 3]], PAL.light, 0.3);
        INK.label(ctx, String(i + 1), ox + i * U + U / 2, oy + 44, { size: 34, weight: 700, align: 'center' });
        ctx.restore();
      }
      if (t > ss + 3.2) F63.tag(ctx, 'büyüklük: 5 N', ox + 150, oy + 170, { size: 46, color: F63.BR });
      // Damla
      DAMLA.draw(ctx, { x: 1680, y: 860, s: 1.3, view: 'q3', flip: true, expr: t > ss + 3.2 ? 'happy' : 'curious', look: [-0.8, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1,
        arms: [[-1, 0.4], [1, [34, -150]]], prop: t > ss ? null : 'lens' });
    }
  });
})();

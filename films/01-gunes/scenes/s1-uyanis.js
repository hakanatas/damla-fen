// SAHNE 1 — Uyanış: Damla tanışır, Güneş doğar, ısınınca tanecikleri hızlanır.
(function () {
  const { PAL, line, stroke } = INK;
  E.scene({
    name: 'Uyanış', concept: 'Güneş: ısı ve ışık kaynağı', from: 'title', to: 'warm',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const tw = E.s('warm'), th = E.s('hello');
      const rise = E.se(t, tw + 0.2, tw + 6, 'io');
      const sunX = 1500, sunY = E.lerp(1080, 290, rise);
      ctx.save();
      E.cam(ctx, { x: 960 - 30 * E.se(t, 0, E.e('warm'), 'sine'), y: 540 + 20 * E.se(t, 0, E.e('warm'), 'sine'), z: 1 + 0.07 * E.se(t, 0, E.e('warm'), 'sine') });
      // dawn: cool wash that warms up as the Sun rises
      ctx.save(); ctx.globalAlpha = 0.16 * (1 - rise); ctx.fillStyle = PAL.water; ctx.fillRect(-200, -200, E.W + 400, E.H + 400); ctx.restore();
      const g = ctx.createRadialGradient(sunX, sunY, 50, sunX, sunY, 900); g.addColorStop(0, `rgba(227,160,58,${0.3 * rise})`); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      if (sunY < 1060) P.sun(ctx, sunX, sunY, 115, t, { nrays: 22 });
      P.landscape(ctx, E.W, E.H, t, { hill });

      // ---- Damla ----
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      const wake = E.se(t, th + 0.1, th + 0.8);
      const asleep = wake < 1;
      const stretch = E.seg(t, th + 0.5, th + 1.9), sb = Math.sin(stretch * Math.PI);
      const inWarm = t >= tw, bask = E.se(t, tw + 3.2, tw + 4.2);
      let arms = [[-1, 0.3], [1, 0.3]];
      if (stretch > 0 && stretch < 1) arms = [[-1, 0.3 + sb * 2.6], [1, 0.3 + sb * 2.6]];
      else if (t > th + 1.9 && !inWarm) arms = [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]];   // wave hello
      if (inWarm) arms = [[-1, 0.35 + bask * 0.7], [1, 0.35 + bask * 0.7]];
      const phase = t + 2.4 * Math.max(0, t - (tw + 3)); // particles move faster when warm
      const look = inWarm ? [E.lerp(0, 0.85, E.se(t, tw, tw + 1)), E.lerp(0.1, -0.45, E.se(t, tw, tw + 1))] : [0, 0.12];
      const expr = asleep ? 'neutral' : (bask > 0.5 && E.talk(t) < 0.05 ? 'happy' : (inWarm && bask > 0.5 ? 'happy' : 'neutral'));
      DAMLA.draw(ctx, {
        x: dx, y: dy, s: 1.5, view: 'front', expr, look,
        blink: asleep ? 1 - wake : E.blink(t, 2), squash: (asleep ? 0.93 + Math.sin(t * 1.4) * 0.02 : E.breath(t)) * (1 + sb * 0.08),
        arms, t: phase, talk: E.talk(t), seed: 1
      });
      // sleeping z's
      if (wake < 1) for (let i = 0; i < 3; i++) {
        const c = ((t * 0.45 + i / 3) % 1); const a = (1 - wake) * Math.sin(c * Math.PI);
        INK.label(ctx, 'z', dx + 60 + c * 70 + i * 6, dy - 330 - c * 90, { size: 34 + i * 8, weight: 700, alpha: a * 0.8 });
      }
      // heat squiggles + particle note
      if (t > tw + 3) {
        const k = E.se(t, tw + 3, tw + 4);
        for (let i = 0; i < 4; i++) {
          const ox = dx - 150 + i * 95 + (i > 1 ? 30 : 0), oy = dy - 190 - (i % 2) * 40; const pts = [];
          for (let j = 0; j <= 24; j++) { const u = j / 24; pts.push([ox + Math.sin(u * 9 + t * 5 + i) * 6, oy - u * 60]); }
          ctx.save(); ctx.globalAlpha = 0.8 * k; stroke(ctx, pts, { w: 3, color: '#C07F1E', seed: 50 + i }); ctx.restore();
        }
        E.inkText(ctx, 'ısınınca tanecikler hızlanır', dx + 170, dy - 80, t, tw + 4.4, E.e('warm') + 2, { size: 36, weight: 700 });
        if (t > tw + 4.6) ctx.save(), ctx.globalAlpha = E.se(t, tw + 4.6, tw + 5.2), P.arrow(ctx, [dx + 160, dy - 96], [dx + 60, dy - 110], 1, { w: 2.4, bend: 18, head: 12 }), ctx.restore();
      }
      ctx.restore();

      // ---- Title card ----
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '1 · Gökyüzündeki Komşumuz: Güneş', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 1', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();

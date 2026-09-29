// SAHNE 1 — Örnek olay: Ege korumasız paten kayarken düşüyor (TYMM: örnek olay yöntemi)
(function () {
  const { PAL, stroke, circlePts } = INK;
  E.scene({
    name: 'Örnek olay', concept: 'Destek ve hareket sistemini etkileyen bir durum', from: 'title', to: 'case',
    draw(ctx, t) {
      const F = F12, hill = P.hillLine(E.W), sh = E.s('hello'), sc = E.s('case');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 });
      P.landscape(ctx, E.W, E.H, t, { hill, tree: true });
      const dx = 520, dy = P.hillY(hill, dx) + 4;
      const fallT = sc + 3.2, fall = E.se(t, fallT, fallT + 0.5, 'in');
      // Ege skating
      const ex = t < fallT ? 1180 + 260 * Math.sin((t - sh) * 0.7) : 1180 + 260 * Math.sin((fallT - sh) * 0.7) + 60 * E.se(t, fallT, fallT + 0.6, 'out');
      const ey = P.hillY(hill, ex) + 6;
      if (t > sh + 0.3) {
        const k = E.se(t, sh + 0.3, sh + 1.2);
        ctx.save(); ctx.globalAlpha *= k; ctx.translate(ex, ey); ctx.rotate(-1.45 * fall);
        F.kid(ctx, 0, fall > 0 ? -14 * fall : 0, 0.85, { run: t < fallT, phase: t * 5, skates: true, sad: t > fallT + 0.6, t });
        ctx.restore();
        if (t > fallT + 0.5) {
          const a = Math.min(1, (t - fallT - 0.5) * 3) * (1 - E.se(t, fallT + 3.2, fallT + 3.8));
          for (let i = 0; i < 4; i++) { const ang = t * 3 + i * 1.57; INK.label(ctx, '✶', ex - 260 + Math.cos(ang) * 50, ey - 60 + Math.sin(ang) * 18, { size: 34, weight: 700, color: PAL.light, alpha: a, align: 'center' }); }
          P.write(ctx, 'Ah, kolum!', ex - 150, ey - 170, E.se(t, fallT + 0.8, fallT + 1.6), { size: 50, align: 'center' });
        }
        if (t > sh + 1.5) F.tag(ctx, 'Ege', ex + 90, ey - 380, [ex + 20, ey - 330], E.se(t, sh + 1.5, sh + 2.3) * (1 - fall), { size: 48, color: '#3E5A1A' });
        if (t > sc + 1) { const kk = E.se(t, sc + 1, sc + 2) * (1 - E.se(t, fallT - 0.2, fallT + 0.2)); P.write(ctx, 'kask yok · dizlik yok', 1180, 330, kk, { size: 44, align: 'center', color: '#8A4A10' }); }
      }
      const surprised = t > fallT && t < fallT + 3;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.4, view: 'q3', expr: surprised ? 'surprised' : (t > sh ? 'neutral' : 'happy'), look: [0.9, -0.1], blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: t > sh && t < sh + 3 ? [[-1, 0.35], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : (surprised ? [[-1, 1.8], [1, 1.8]] : [[-1, 0.35], [1, 0.4]]) });
      ctx.restore();
      F.title(ctx, t, 12, 'Destek ve Hareket Sistemimizin Sağlığı', 3);
    }
  });
})();

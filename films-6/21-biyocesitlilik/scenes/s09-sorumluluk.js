// SAHNE 10 — Vatandaşlık sorumluluğu, insan faaliyetlerinin olumlu/olumsuz etkileri, 22 Mayıs (OB6, D9.3, OB5)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F621;
  E.scene({
    name: 'Sorumluluk', concept: 'Vatandaş olarak sorumluluklar; 22 Mayıs', from: 'duty', to: 'duty', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('duty');
      const hill = F.HILL;
      ctx.save(); E.cam(ctx, { x: 960, y: 560, z: 1 });
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      // fidan dikimi: fidanlar büyür
      [1380, 1560, 1740].forEach((x, i) => { const g = E.se(t, sd + 1 + i * 0.6, sd + 4 + i * 0.6); F.tree(ctx, x, P.hillY(hill, x) + 6, 0.35 + 0.45 * g, 20 + i, t); });
      F.flower(ctx, 1280, P.hillY(hill, 1280) + 4, 0.9, '#C8553D', 5, t, 70);
      F.flower(ctx, 1460, P.hillY(hill, 1460) + 4, 0.8, '#FBF8F1', 6, t, 60);
      F.bee(ctx, 1300 + Math.sin(t * 1.4) * 40, 560, 1, t);
      const dx = 360, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.35, view: 'q3', expr: 'happy', look: [0.8, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 9, arms: [[-1, 0.4], [1, 2.2]] });
      ctx.restore();
      // takvim
      const ck = E.se(t, sd + 0.4, sd + 1.1, 'out');
      if (ck > 0) { ctx.save(); ctx.translate(900, 330); ctx.scale(P.pop(ck), P.pop(ck)); P.icon.calendar(ctx, 0, 0, 1.3, '22'); ctx.restore(); }
      E.inkText(ctx, '22 Mayıs', 1080, 290, t, sd + 1.0, 1e9, { size: 60, color: '#2F4A1E' });
      E.inkText(ctx, 'Dünya Biyolojik Çeşitlilik Günü', 1080, 360, t, sd + 1.6, 1e9, { size: 44 });
      // olumlu etkiler
      const R = ['fidan dikmek', 'yerel tohumu korumak', 'ateşle dikkatli olmak'];
      R.forEach((s, i) => {
        const at = sd + 3.0 + i * 0.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const x = 1010 + i * 310, y = 470;
        ctx.save(); ctx.globalAlpha = k;
        const b = F.rr(x - 148, y - 40, 296, 70, 12); P.fillPts(ctx, b, '#FBF8F1', 0.92); wash(ctx, b, PAL.life, 0.25, 210 + i, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 2.4, closed: true, seed: 214 + i });
        F.fit(ctx, s, x, y + 8, 276, 34, { color: '#2F4A1E' });
        ctx.restore();
      });
    }
  });
})();

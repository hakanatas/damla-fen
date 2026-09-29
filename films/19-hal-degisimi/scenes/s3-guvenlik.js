// SAHNE 3 — Güvenlik: gösteri deneyi yalnızca öğretmen/yetişkin tarafından; sıcak kap, ısıtıcı ve buhar yakar
(function () {
  const { PAL, line, stroke, circlePts, dashed, splash } = INK;
  const F = F19, RED = F.RED;
  E.scene({
    name: 'Güvenlik', concept: 'Isıtıcı ve sıcak kaplar yalnızca yetişkin eşliğinde', from: 'safety', to: 'hot', trFrom: [400, 700],
    draw(ctx, t) {
      const ss = E.s('safety'), sh = E.s('hot');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      // lab bench
      const bench = [[60, 760], [940, 756], [950, 800], [50, 804], [60, 760]];
      P.fillPts(ctx, bench, '#E3D3B3'); INK.wash(ctx, bench, '#8A6A45', 0.4, 2301, { bleed: 1 }); stroke(ctx, bench, { w: 3, closed: true, seed: 2302 });
      line(ctx, [90, 800], [96, 900], { w: 5, seed: 2303 }); line(ctx, [900, 800], [894, 900], { w: 5, seed: 2304 });
      const heat = E.se(t, sh + 0.2, sh + 1.2);
      F.heater(ctx, 320, 670, 300, heat, t);
      F.beaker(ctx, 320, 670, 220, 240, { level: 0.2, ice: 1, t, steam: heat * 0.5 });
      line(ctx, [370, 650], [410, 400], { w: 6, seed: 2305 }); INK.inkDot(ctx, 371, 642, 7, { color: '181,85,63' });
      // heat shimmer + "SICAK!"
      if (heat > 0) {
        for (let i = 0; i < 5; i++) { const ox = 180 + i * 70; const p = []; for (let j = 0; j <= 20; j++) { const u = j / 20; p.push([ox + Math.sin(u * 9 + t * 5 + i) * 6, 660 - u * 50]); } ctx.save(); ctx.globalAlpha = 0.8 * heat; stroke(ctx, p, { w: 3, color: F.HEAT, seed: 2310 + i }); ctx.restore(); }
        INK.label(ctx, 'SICAK!', 320, 350, { size: 56, weight: 700, align: 'center', color: RED, alpha: heat, rot: -0.06 });
      }
      // safe-distance line on the floor + Damla behind it
      const dk = E.se(t, ss + 1.2, ss + 2.4);
      if (dk > 0) { ctx.save(); ctx.globalAlpha = 0.85; dashed(ctx, P.partial([[640, 420], [640, 900]], dk), { w: 3.4, on: 16, off: 12, color: RED }); ctx.restore(); INK.label(ctx, 'güvenli mesafe', 660, 450, { size: 34, weight: 700, color: RED, alpha: E.seg(dk, 0.6, 1) }); }
      const stop = t > sh + 0.6;
      DAMLA.draw(ctx, {
        x: 800, y: 900, s: 1.35, view: 'q3', flip: true, t, seed: 3, blink: E.blink(t, 9), squash: E.breath(t), talk: E.talk(t),
        expr: stop ? 'determined' : 'curious', look: [-0.8, -0.1],
        arms: stop ? [[-1, 0.4], [1, 1.7]] : [[-1, 0.35], [1, 0.4]], handR: stop ? 12 : 0
      });
      // safety card
      const k = E.se(t, ss + 0.4, ss + 1.1, 'out');
      if (k > 0) {
        ctx.save(); ctx.translate((1 - k) * 800, 0);
        const card = [[1000, 150], [1850, 138], [1860, 900], [1010, 912], [1000, 150]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 2320 });
        line(ctx, [1010, 226], [1850, 216], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 1430, 200);
        const rows = [
          ['Isıtıcıyı yalnızca', 'öğretmen / yetişkin kullanır.', ss + 1.6],
          ['Deneyi güvenli', 'mesafeden izle.', ss + 3.4],
          ['Isıtıcıya ve sıcak kaba', 'asla dokunma!', sh + 0.6],
          ['Buhar da yakar,', 'uzak dur!', sh + 2.6]
        ];
        rows.forEach(([a, b, at], i) => {
          const y = 300 + i * 160, rk = E.se(t, at, at + 0.6, 'out'); if (rk <= 0) return;
          ctx.save(); ctx.translate(1080, y); ctx.scale(P.pop(rk), P.pop(rk));
          P.fillPts(ctx, circlePts(0, 0, 30, 30, 24), i < 2 ? PAL.light : RED, 0.85); stroke(ctx, circlePts(0, 0, 30, 30, 24), { w: 2.4, closed: true, seed: 2330 + i });
          ctx.font = '700 36px Kalam'; ctx.fillStyle = PAL.white; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 12); ctx.restore();
          P.write(ctx, a, 1140, y - 6, E.seg(t, at + 0.2, at + 1.0), { size: 42 });
          P.write(ctx, b, 1140, y + 46, E.seg(t, at + 0.8, at + 1.6), { size: 42, color: i >= 2 ? RED : PAL.ink });
        });
        ctx.restore();
      }
    }
  });
})();

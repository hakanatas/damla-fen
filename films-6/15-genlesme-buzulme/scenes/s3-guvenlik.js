// SAHNE 3 — Güvenlik: sıcak su ve ısıtıcıyı yalnızca yetişkin kullanır; ısınan metal uzun süre sıcak kalır
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G15, RED = F.RED;
  E.scene({
    name: 'Güvenlik', concept: 'Isı kaynakları yalnızca yetişkin eşliğinde', from: 'safety', to: 'safety', trFrom: [400, 700],
    draw(ctx, t) {
      const ss = E.s('safety');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 60, 940, 760, 2301);
      line(ctx, [90, 804], [96, 900], { w: 5, seed: 2303 }); line(ctx, [900, 804], [894, 900], { w: 5, seed: 2304 });
      F.basin(ctx, 270, 760, 300, 150, 'hot', t, { label: false });
      F.burner(ctx, 700, 760, 1, t, 1);
      F.ball(ctx, 700, 520, 40, 1, [700, 400]);
      INK.label(ctx, 'SICAK!', 480, 400, { size: 60, weight: 700, align: 'center', color: RED, alpha: E.se(t, ss + 0.5, ss + 1.2), rot: -0.06 });
      const dk = E.se(t, ss + 1.2, ss + 2.2);
      if (dk > 0) { ctx.save(); ctx.globalAlpha = 0.85; dashed(ctx, P.partial(F.linePts([960, 420], [960, 900], 60), dk), { w: 3.4, on: 16, off: 12, color: RED }); ctx.restore(); INK.label(ctx, 'güvenli mesafe', 960, 400, { size: 32, weight: 700, color: RED, align: 'center', alpha: E.seg(dk, 0.6, 1) }); }
      const stop = t > ss + 5.2;
      DAMLA.draw(ctx, {
        x: 1070, y: 900, s: 1.2, view: 'q3', flip: true, t, seed: 3, blink: E.blink(t, 9), squash: E.breath(t), talk: E.talk(t),
        expr: stop ? 'determined' : 'curious', look: [-0.8, -0.1],
        arms: stop ? [[-1, 0.4], [1, 1.7]] : [[-1, 0.35], [1, 0.4]], handR: stop ? 12 : 0
      });
      const k = E.se(t, ss + 0.2, ss + 0.9, 'out');
      if (k > 0) {
        ctx.save(); ctx.translate((1 - k) * 800, 0);
        const card = [[1180, 150], [1850, 140], [1860, 900], [1190, 910], [1180, 150]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 2320 });
        line(ctx, [1190, 226], [1850, 216], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 1520, 200);
        const rows = [
          ['Sıcak suyu yalnızca', 'bir yetişkin hazırlar.', ss + 0.9],
          ['Isıtıcıyı yalnızca', 'öğretmen kullanır.', ss + 2.4],
          ['Deneyi güvenli', 'mesafeden izle.', ss + 3.9],
          ['Isınan metale', 'asla dokunma!', ss + 5.4]
        ];
        rows.forEach(([a, b, at], i) => {
          const y = 310 + i * 160, rk = E.se(t, at, at + 0.6, 'out'); if (rk <= 0) return;
          ctx.save(); ctx.translate(1250, y); ctx.scale(P.pop(rk), P.pop(rk));
          P.fillPts(ctx, circlePts(0, 0, 30, 30, 24), i < 3 ? PAL.light : RED, 0.85); stroke(ctx, circlePts(0, 0, 30, 30, 24), { w: 2.4, closed: true, seed: 2330 + i });
          ctx.font = '700 36px Kalam'; ctx.fillStyle = PAL.white; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 12); ctx.restore();
          P.write(ctx, a, 1305, y - 6, E.seg(t, at + 0.2, at + 0.9), { size: 42 });
          P.write(ctx, b, 1305, y + 46, E.seg(t, at + 0.7, at + 1.4), { size: 42, color: i === 3 ? RED : PAL.ink });
        });
        ctx.restore();
      }
    }
  });
})();

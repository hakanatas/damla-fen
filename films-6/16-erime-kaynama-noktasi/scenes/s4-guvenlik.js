// SAHNE 4 — Güvenlik: ısıtıcıyı yalnızca öğretmen kullanır; sıcak kap, kaynar su ve buhar yakar; güvenli mesafe; koruyucu gözlük
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G16, RED = F.RED;
  E.scene({
    name: 'Güvenlik', concept: 'Isı kaynakları yalnızca öğretmen eşliğinde', from: 'safety', to: 'safety', trFrom: [400, 700],
    draw(ctx, t) {
      const ss = E.s('safety');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      F.bench(ctx, 60, 900, 770, 2501);
      line(ctx, [90, 814], [96, 900], { w: 5, seed: 2503 }); line(ctx, [860, 814], [854, 900], { w: 5, seed: 2504 });
      F.heater(ctx, 360, 680, 300, 1, t);
      F.beaker(ctx, 360, 680, 220, 240, { level: 0.55, t, steam: 1, boil: 1 });
      INK.label(ctx, 'SICAK!', 360, 330, { size: 60, weight: 700, align: 'center', color: RED, alpha: E.se(t, ss + 0.5, ss + 1.2), rot: -0.06 });
      const dk = E.se(t, ss + 1.2, ss + 2.2);
      if (dk > 0) { ctx.save(); ctx.globalAlpha = 0.85; dashed(ctx, P.partial(F.linePts([700, 420], [700, 900], 60), dk), { w: 3.4, on: 16, off: 12, color: RED }); ctx.restore(); INK.label(ctx, 'güvenli mesafe', 700, 400, { size: 32, weight: 700, color: RED, align: 'center', alpha: E.seg(dk, 0.6, 1) }); }
      const stop = t > ss + 6;
      DAMLA.draw(ctx, {
        x: 900, y: 900, s: 1.2, view: 'q3', flip: true, t, seed: 3, blink: E.blink(t, 9), squash: E.breath(t), talk: E.talk(t),
        expr: stop ? 'determined' : 'curious', look: [-0.8, -0.1],
        arms: stop ? [[-1, 0.4], [1, 1.7]] : [[-1, 0.35], [1, 0.4]], handR: stop ? 12 : 0
      });
      const k = E.se(t, ss + 0.2, ss + 0.9, 'out');
      if (k > 0) {
        ctx.save(); ctx.translate((1 - k) * 800, 0);
        const card = [[1100, 150], [1850, 140], [1860, 900], [1110, 910], [1100, 150]];
        ctx.save(); ctx.shadowColor = 'rgba(60,40,20,0.25)'; ctx.shadowBlur = 24; P.fillPts(ctx, card, '#FAF6EC'); ctx.restore();
        stroke(ctx, card, { w: 3, closed: true, color: RED, seed: 2520 });
        line(ctx, [1110, 226], [1850, 216], { w: 3, color: RED, dry: false });
        ctx.font = '700 46px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÜVENLİK', 1480, 200);
        const rows = [
          ['Isıtıcıyı yalnızca', 'öğretmen kullanır.', ss + 0.9],
          ['Koruyucu gözlük', 'takılır.', ss + 2.4],
          ['Deneyi güvenli', 'mesafeden izle.', ss + 3.9],
          ['Sıcak kap, kaynar su', 've buhar yakar!', ss + 5.4]
        ];
        rows.forEach(([a, b, at], i) => {
          const y = 310 + i * 160, rk = E.se(t, at, at + 0.6, 'out'); if (rk <= 0) return;
          ctx.save(); ctx.translate(1170, y); ctx.scale(P.pop(rk), P.pop(rk));
          P.fillPts(ctx, circlePts(0, 0, 30, 30, 24), i < 3 ? PAL.light : RED, 0.85); stroke(ctx, circlePts(0, 0, 30, 30, 24), { w: 2.4, closed: true, seed: 2530 + i });
          ctx.font = '700 36px Kalam'; ctx.fillStyle = PAL.white; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), 0, 12); ctx.restore();
          P.write(ctx, a, 1225, y - 6, E.seg(t, at + 0.2, at + 0.9), { size: 42 });
          P.write(ctx, b, 1225, y + 46, E.seg(t, at + 0.7, at + 1.4), { size: 42, color: i === 3 ? RED : PAL.ink });
        });
        ctx.restore();
      }
    }
  });
})();

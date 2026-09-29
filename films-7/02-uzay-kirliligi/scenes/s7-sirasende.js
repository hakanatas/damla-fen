// SAHNE 7 — Sıra sende (grup raporu performans görevi) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = U7;
  E.scene({
    name: 'Sıra sende', concept: 'Rapor görevi', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task');
      F.card(ctx, 230, 170, 1440, 700, { seed: 160 });
      P.write(ctx, 'Sıra sende!', 310, 270, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: F.AMBER_D });
      P.drawOn(ctx, P.bez([306, 292], [500, 302], [700, 288], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
      const steps = ['1. Grubunla bir uzay problemi seç.', '2. Güvenilir kaynaklardan veri topla.', '3. Veriye dayanarak tahmin yap.', '4. Çözüm öner, “eğer… ise…” diye akıl yürüt.', '5. Çözümleri değerlendir, raporunu hazırla.'];
      steps.forEach((s, i) => P.write(ctx, s, 330, 390 + i * 90, E.seg(t, st + 1.2 + i * 1.3, st + 2.4 + i * 1.3), { size: 46 }));
      DAMLA.draw(ctx, { x: 1770, y: 905, s: 0.85, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [1400, 500],
    draw(ctx, t) {
      const sn = E.s('next');
      F.night(ctx, 1); F.stars(ctx, t, 1, { n: 90, seed: 84, area: [0, 0, E.W, 900] });
      F.nebula(ctx, 1400, 420, 260, ['#C78FB0', '#7FA7D8', '#E3A03A'], 11, E.se(t, sn + 0.5, sn + 2));
      F.star(ctx, 1400, 430, 16, '#FFE6A8', t);
      F.galaxy(ctx, 1650, 760, 120, t, { seed: 4, n: 260 });
      DAMLA.draw(ctx, { x: 480, y: 905, s: 1.3, view: 'front', expr: 'happy', look: [0.8, -0.4], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 700, 260, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center', color: '#FBF3DC' });
      E.inkText(ctx, '3 · Yıldızlar, Galaksiler ve Evren', 700, 345, t, sn + 1.2, E.e('end'), { size: 62, align: 'center', color: '#FBF3DC' });
      F.endCard(ctx, t, E.s('end'), '2', 'Uzay Kirliliği', 'FB.7.1.3');
    }
  });
})();

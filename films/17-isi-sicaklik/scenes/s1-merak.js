// SAHNE 1 — Merak: mutfakta sıcak çay ve soba. "Isı ile sıcaklık aynı şey mi?" (günlük yaşamdan örnek olay, açık uçlu soru)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F17;
  E.scene({
    name: 'Merak', concept: 'Isı ile sıcaklık aynı şey mi?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save(); E.cam(ctx, { x: 960 - 15 * E.se(t, 0, sq + 8, 'sine'), y: 540, z: 1 + 0.03 * E.se(t, 0, sq + 8, 'sine') });
      // sıcak ışık
      const g = ctx.createRadialGradient(1500, 700, 40, 1500, 700, 700); g.addColorStop(0, 'rgba(200,110,60,0.18)'); g.addColorStop(1, 'rgba(200,110,60,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      F.desk(ctx);
      F.stove(ctx, 1560, 828, 1.35, t);
      // soba ısı dalgaları
      for (let i = 0; i < 3; i++) { const k = E.se(t, sq + 2.5 + i * 0.2, sq + 3.3 + i * 0.2); F.heatArrow(ctx, [1440, 640 + i * 50], [1300, 600 + i * 50], k, { t, amp: 7, w: 3.4, seed: 30 + i }); }
      F.cup(ctx, 1060, 828, 1.2); F.steam(ctx, 1060, 700, 1.1, t, { color: F.HEAT });
      // Damla
      const dx = 520, dy = 832, lookCup = t > sh + 2;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.75, view: 'q3', expr: t < sq ? (lookCup ? 'surprised' : 'happy') : 'thinking', look: t < sq ? (lookCup ? [0.9, 0.3] : [0.3, 0]) : [0.4, -0.7], blink: E.blink(t, 2), squash: E.breath(t), t: t * 1.6, seed: 1,
        arms: t < sh + 2 ? [[-1, 0.35], [1, t > sh ? 2.4 + 0.35 * Math.sin(t * 9) : 0.35]] : (t < sq ? [[-1, 0.35], [1, 1.8]] : [[-1, 0.3], [1, [30, -84]]]) });
      ctx.restore();
      // etiketler
      E.inkText(ctx, '“sıcak”', 1060, 520, t, sq + 0.8, E.e('q') + 1, { size: 56, align: 'center', color: F.HEAT });
      E.inkText(ctx, '“ısıtıyor”', 1560, 360, t, sq + 2.4, E.e('q') + 1, { size: 56, align: 'center', color: F.HEAT });
      const qk = E.seg(t, sq + 4.2, sq + 5.4);
      if (qk > 0) { P.write(ctx, 'ısı  =  sıcaklık ?', 960, 250, qk, { size: 82, align: 'center' }); if (t > sq + 5.4) P.cross(ctx, 960, 228, 26, 0, {}); }
      // başlık kartı
      const t1 = E.e('title') + 1.2;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '17 · Isı ve Sıcaklık Aynı Şey mi?', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: F.HEAT }); ctx.restore(); }
    }
  });
})();

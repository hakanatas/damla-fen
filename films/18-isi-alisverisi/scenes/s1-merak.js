// SAHNE 1 — Merak: soğuk ve sıcak su; karışınca sıcaklık ne olur? (açık uçlu soru)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F18;
  F.beakerPair = (ctx, t, o = {}) => { // soğuk (sol) ve sıcak (sağ) kaplar
    const xs = o.xs ?? [880, 1200], y = o.y ?? 590, w = o.w ?? 200, h = o.h ?? 240, lv = o.lv ?? 150;
    F.water(ctx, xs[0], y, w, h, lv, { seed: 50 }); F.box(ctx, xs[0], y, w, h, { fill: false, seed: 51 });
    F.water(ctx, xs[1], y, w, h, lv, { seed: 52, color: '#9A6A5A' }); F.box(ctx, xs[1], y, w, h, { fill: false, seed: 53 });
    F.steam(ctx, xs[1] + w / 2, y - 10, 0.9, t, { color: F.HEAT });
    if (o.labels !== false) { INK.label(ctx, 'soğuk su', xs[0] + w / 2, y + h + 55, { size: 42, weight: 700, align: 'center', color: PAL.water }); INK.label(ctx, 'sıcak su', xs[1] + w / 2, y + h + 55, { size: 42, weight: 700, align: 'center', color: F.HEAT }); }
  };
  E.scene({
    name: 'Merak', concept: 'Soğuk ve sıcak su karışınca ne olur?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      ctx.save(); E.cam(ctx, { x: 960 + 20 * E.se(t, 0, sq + 5, 'sine'), y: 540, z: 1 + 0.03 * E.se(t, 0, sq + 5, 'sine') });
      F.desk(ctx);
      const kb = E.se(t, sh + 1.0, sh + 1.8, 'out');
      if (kb > 0) { ctx.save(); ctx.globalAlpha = kb; F.beakerPair(ctx, t, { xs: [800, 1100] }); ctx.restore(); }
      // büyük boş kap ve soru
      const kq = E.se(t, sq + 0.6, sq + 1.4, 'out');
      if (kq > 0) {
        ctx.save(); ctx.globalAlpha = kq;
        F.box(ctx, 1480, 530, 280, 300, { seed: 54 });
        P.arrow(ctx, [1010, 560], [1500, 500], E.se(t, sq + 1.0, sq + 2.0), { w: 3, bend: 90, head: 14 });
        P.arrow(ctx, [1300, 560], [1520, 520], E.se(t, sq + 1.4, sq + 2.4), { w: 3, bend: 40, head: 14 });
        INK.label(ctx, '? °C', 1620, 720, { size: 70, weight: 700, align: 'center', alpha: E.se(t, sq + 2.2, sq + 3) });
        INK.label(ctx, 'karışım', 1620, 885, { size: 42, weight: 700, align: 'center' });
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 440, y: 832, s: 1.7, view: 'q3', expr: t < sq ? 'happy' : 'thinking', look: t < sq ? [0.8, 0.2] : [0.5, -0.6], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t < sh + 1.6 ? [[-1, 0.35], [1, t > sh ? 2.4 + 0.35 * Math.sin(t * 9) : 0.35]] : (t < sq ? [[-1, 0.35], [1, 1.8]] : [[-1, 0.3], [1, [30, -84]]]) });
      ctx.restore();
      const t1 = E.e('title') + 1.2;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '18 · Karışınca Ne Olur? Isı Alışverişi', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: F.HEAT }); ctx.restore(); }
    }
  });
})();

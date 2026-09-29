// SAHNE 4 — Model geliştirme (FB.7.7.2 b): evdeki suyun yolculuğu → atık su → arıtma tesisi → doğa; atık yağ lavaboya dökülmez; model yenileme (yıkama suyunu yeniden kullanma)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F723;
  const GRAY = '#6F6B66';
  E.scene({
    name: 'Model', concept: 'Evdeki su modeli; atık su', from: 'model', to: 'model2', trFrom: [400, 500],
    draw(ctx, t) {
      const sm = E.s('model'), sw = E.s('waste'), so = E.s('oil'), s2 = E.s('model2');
      F.tiles(ctx, 0);
      // zemin çizgisi
      const gr = [[-10, 700], [1930, 700], [1930, 900], [-10, 900]];
      P.fillPts(ctx, gr, '#E6DCC6'); wash(ctx, gr, '#8A6A45', 0.3, 3700, { bleed: 2, blooms: 2 }); stroke(ctx, [[-10, 700], [1930, 700]], { w: 4, seed: 3701 });
      // ev kesiti
      const house = [[120, 700], [120, 330], [430, 180], [740, 330], [740, 700]];
      F.shape(ctx, house, null, 0, 3702, { baseA: 0.85 });
      const k1 = E.se(t, sm + 0.6, sm + 1.4);
      ctx.save(); ctx.globalAlpha *= k1;
      F.sink(ctx, 430, 520, 220, 0.7);
      F.tap(ctx, 430, 420, 0.6, t, { fall: 100 });
      F.fit(ctx, 'musluk', 560, 390, 160, 32, { align: 'left' }); F.fit(ctx, 'lavabo', 560, 560, 160, 32, { align: 'left' });
      ctx.restore();
      // atık su borusu
      const pipe = [[430, 570], [430, 780], [1180, 780]];
      P.drawOn(ctx, pipe, E.se(t, sm + 2.0, sm + 3.6), { w: 12, color: GRAY });
      if (t > sm + 3.6) { ctx.save(); ctx.globalAlpha *= E.se(t, sm + 3.6, sm + 4.2); F.fit(ctx, 'atık su', 700, 840, 240, 36, { color: '#5A4028' }); ctx.restore(); }
      // kanalizasyon → arıtma → doğa
      const kw = E.se(t, sw + 0.3, sw + 1.0);
      if (kw > 0) {
        ctx.save(); ctx.globalAlpha *= kw;
        F.treatment(ctx, 1330, 690, 0.9, t);
        F.fit(ctx, 'arıtma tesisi', 1330, 560, 300, 36);
        ctx.restore();
        const riv = INK.wobble([[1560, 700], [1700, 690], [1930, 700], [1930, 740], [1700, 740], [1560, 730]], 3, 3710);
        const kr = E.se(t, sw + 2.2, sw + 3.2);
        if (kr > 0) { ctx.save(); ctx.globalAlpha *= kr; P.fillPts(ctx, riv, PAL.water, 0.5); stroke(ctx, riv, { w: 2.4, closed: true }); F.fit(ctx, 'doğaya', 1760, 660, 220, 34, { color: PAL.water }); P.arrow(ctx, [1440, 680], [1580, 700], 1, { w: 3, bend: -20, head: 12, color: PAL.water }); ctx.restore(); }
        // akan atık su noktaları
        for (let i = 0; i < 8; i++) { const k = ((t * 0.3 + i / 8) % 1); const x = E.lerp(440, 1170, k); INK.inkDot(ctx, x, 780, 4, { color: '120,100,70', alpha: 0.8 * kw }); }
        F.fit(ctx, 'kanalizasyon', 900, 760, 260, 30, { weight: 400, alpha: kw });
      }
      // atık yağ
      const ko = Math.min(E.se(t, so + 0.2, so + 0.8), 1 - E.se(t, s2 - 0.2, s2 + 0.4));
      if (ko > 0) E.layer(ctx, ko, c => {
        F.card(c, 820, 190, 560, 300, 3720);
        F.oilBottle(c, 930, 330, 1.2);
        P.arrow(c, [980, 300], [1080, 330], 1, { w: 3, bend: -10, head: 12 });
        F.sink(c, 1150, 330, 140, 0.5);
        P.cross(c, 1150, 350, 50, E.se(t, so + 1.2, so + 1.8), { w: 9, color: F.RED });
        F.fit(c, 'lavaboya dökme!', 1100, 450, 460, 38, { color: F.RED });
        F.wfit(c, 'ayrı toplanır', 1240, 250, E.seg(t, so + 3.0, so + 3.8), 34, 200, { align: 'center', color: F.GREEN }); P.check(c, 1350, 240, 30, E.se(t, so + 3.8, so + 4.2), { w: 6, color: F.GREEN });
      });
      // model yenileme: yıkama suyu → çiçek
      const k2 = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (k2 > 0) E.layer(ctx, k2, c => {
        F.basin(c, 640, 640, 0.9, 0.6);
        F.fit(c, 'yıkama suyu', 640, 745, 220, 30, { color: PAL.water });
        P.arrow(c, [720, 610], [960, 560], E.se(t, s2 + 1.2, s2 + 2.2), { w: 4, color: PAL.water, bend: 40, head: 14 });
        F.plant(c, 1020, 600, 1.0, t);
        F.stamp(c, 1060, 300, 'MODEL YENİLENDİ', E.seg(t, s2 + 2.4, s2 + 3.0), { color: F.GREEN, size: 44 });
      });
    }
  });
})();

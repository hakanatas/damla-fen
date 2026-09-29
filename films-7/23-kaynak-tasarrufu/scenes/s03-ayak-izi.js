// SAHNE 3 — Su ayak izi: üretimden tüketime kullanılan toplam tatlı su; görünmeyen su (tişört, ekmek). Sayısal değer verilmedi.
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F723;
  // ayak izi şekli (taban + 5 parmak)
  const SOLE = (() => { const p = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2; const r = 1 + 0.12 * Math.cos(a * 2); p.push([Math.cos(a) * 95 * r * (Math.sin(a) > 0 ? 0.85 : 1), Math.sin(a) * 190]); } return p; })();
  const TOES = [[-62, -250, 30], [-18, -278, 26], [22, -280, 22], [58, -266, 19], [86, -240, 16]];
  E.scene({
    name: 'Su ayak izi', concept: 'Görünen ve görünmeyen su', from: 'footprint', to: 'hidden', trFrom: [400, 540],
    draw(ctx, t) {
      const sf = E.s('footprint'), sh = E.s('hidden');
      F.tiles(ctx, 0);
      // ayak izi
      const kf = E.se(t, sf + 0.3, sf + 1.6);
      ctx.save(); ctx.translate(380, 600); ctx.rotate(0.12); ctx.scale(kf, kf);
      P.fillPts(ctx, SOLE, '#DCE7EA'); wash(ctx, SOLE, PAL.water, 0.5, 3600, { bleed: 3, blooms: 3 }); stroke(ctx, SOLE, { w: 3.4, closed: true, seed: 3601 });
      TOES.forEach(([x, y, r], i) => { const c = circlePts(x, y, r, r * 1.2, 20); P.fillPts(ctx, c, '#DCE7EA'); wash(ctx, c, PAL.water, 0.5, 3602 + i, { bleed: 1 }); stroke(ctx, c, { w: 2.6, closed: true, seed: 3610 + i }); });
      for (let i = 0; i < 7; i++) F.drop(ctx, -50 + (i % 3) * 50, -90 + Math.floor(i / 3) * 90, 12, PAL.white, 0.7);
      ctx.restore();
      // tanım
      const kd = E.se(t, sf + 0.8, sf + 1.5, 'out');
      if (kd > 0) E.layer(ctx, kd, c => {
        F.card(c, 720, 190, 1100, 250, 3620);
        F.wfit(c, 'Su ayak izi', 770, 265, E.seg(t, sf + 1.0, sf + 2.0), 58, 800, { color: PAL.water });
        F.wfit(c, 'üretimden tüketime kadar kullanılan', 770, 340, E.seg(t, sf + 2.0, sf + 3.4), 42, 1000);
        F.wfit(c, 'toplam tatlı su miktarı', 770, 400, E.seg(t, sf + 3.2, sf + 4.4), 42, 1000);
      });
      // görünmeyen su
      const items = [
        [1030, 'pamuk tarlası → tişört', (c, x) => { F.cotton(c, x - 110, 610, 1.4); F.tshirt(c, x + 90, 620, 0.9); }],
        [1520, 'buğday tarlası → ekmek', (c, x) => { F.wheatField(c, x - 110, 610, 1.2); F.bread(c, x + 90, 630, 0.9); }]
      ];
      items.forEach(([x, txt, draw], i) => {
        const at = sh + 0.4 + i * 1.8, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => {
          F.card(c, x - 230, 490, 460, 330, 3630 + i);
          draw(c, x);
          P.arrow(c, [x - 50, 600], [x + 10, 600], 1, { w: 3, bend: 0, head: 10 });
          for (let m = 0; m < 3; m++) { const kk = ((t * 0.6 + m / 3) % 1); F.drop(c, x - 150 + m * 40, 520 + kk * 40, 9, PAL.water, 0.7 * (1 - kk)); }
          F.fit(c, txt, x, 790, 420, 34);
        });
      });
      const kg = E.se(t, sh + 4.4, sh + 5.2);
      if (kg > 0) { ctx.save(); ctx.globalAlpha *= kg; F.fit(ctx, 'görünmeyen su da ayak izimize eklenir', 1275, 885, 900, 40, { color: F.AMB }); ctx.restore(); }
    }
  });
})();

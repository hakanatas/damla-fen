// SAHNE 7 — Değişimler: ortak olanlar / ortak olmayanlar; bedensel ve ruhsal (FB.6.3.8 b, c)
(function () {
  const { PAL, stroke, wash } = INK; const K = KIT;
  const COLS = [
    { x: 110, w: 500, title: 'Kızlarda', tint: PAL.light, beat: 'different', off: 0.3, items: ['göğüsler gelişir', 'kalçalar genişler', 'âdet döngüsü başlar'], note: 'çoğunlukla 8–13 yaşta başlar' },
    { x: 650, w: 620, title: 'Herkeste (ortak)', tint: PAL.life, beat: 'common', off: 0.3, items: ['boy uzar, kilo artar', 'ter bezleri daha çok çalışır', 'yağ bezleri → sivilce', 'kıllanma başlar'] },
    { x: 1310, w: 500, title: 'Erkeklerde', tint: PAL.water, beat: 'different', off: 3.6, items: ['ses kalınlaşır', 'sakal ve bıyık çıkar', 'omuzlar genişler', 'sperm üretimi başlar'], note: 'çoğunlukla 9–14 yaşta başlar' }
  ];
  const EMO = ['duygular çabuk değişebilir', 'arkadaşlık önem kazanır', 'bağımsızlık isteği artar'];
  E.scene({
    name: 'Değişimler', concept: 'Bedensel ve ruhsal değişimler: ortak olan / olmayan', from: 'common', to: 'different', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('common'), se = E.s('emotions');
      K.text(ctx, 'Bedensel değişimler', 960, 200, { size: 40, align: 'center', alpha: 0.8 });
      COLS.forEach((c, ci) => {
        const pg = INK.wobble(K.rrect(c.x + c.w / 2, 470, c.w, 470, 20), 1.2, 7500 + ci);
        P.fillPts(ctx, pg, '#FBF8F1', 0.9); wash(ctx, pg, c.tint, ci === 1 ? 0.2 : 0.12, 7510 + ci, { bleed: 1.5, blooms: 1 }); stroke(ctx, pg, { w: 2.6, closed: true, seed: 7520 + ci });
        K.text(ctx, c.title, c.x + c.w / 2, 290, { size: 44, align: 'center', color: ci === 1 ? K.LIFE_D : PAL.ink });
        const b0 = E.s(c.beat) + c.off;
        c.items.forEach((it, i) => P.write(ctx, '• ' + it, c.x + 26, 370 + i * 68, E.seg(t, b0 + i * 0.9, b0 + 0.9 + i * 0.9), { size: 36 }));
        if (c.note) K.text(ctx, c.note, c.x + c.w / 2, 670, { size: 30, align: 'center', alpha: 0.7 * E.se(t, b0 + 3.2, b0 + 3.8) });
      });
      // ruhsal değişimler (herkeste)
      const ek = E.se(t, se + 0.1, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        const pg = INK.wobble(K.rrect(960, 800, 1700, 170, 20), 1.2, 7530); P.fillPts(c, pg, '#FBF8F1', 0.9); wash(c, pg, PAL.life, 0.16, 7531, { bleed: 1.5, blooms: 1 }); stroke(c, pg, { w: 2.6, closed: true, seed: 7532 });
        K.text(c, 'Ruhsal değişimler · herkeste', 960, 765, { size: 38, align: 'center', color: K.LIFE_D });
        EMO.forEach((m, i) => P.write(c, m, 390 + i * 570, 835, E.seg(t, se + 0.6 + i * 1.0, se + 1.5 + i * 1.0), { size: 36, align: 'center' }));
      });
    }
  });
})();

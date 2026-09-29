// SAHNE 3 — Altı şapkalı düşünme (a: görüşleri mantıksal çerçevede sunar)
// SAHNE 4 — Görüş + gerekçe; başka görüşlerle kıyaslayıp mantıksal çelişkileri bulma (b)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const W = W6, D = D23;
  const HATS = [
    ['#FBF8F1', 'Beyaz · veriler', 'Bekleme modu da', 'elektrik harcar.'],
    ['#B5553F', 'Kırmızı · duygular', 'İsrafı görünce', 'üzülüyorum.'],
    ['#2E2B30', 'Siyah · riskler', 'İsraf edersek', 'kaynaklar tükenir.'],
    ['#E3C13A', 'Sarı · faydalar', 'Fatura azalır,', 'doğa korunur.'],
    ['#6F9A3A', 'Yeşil · yeni fikirler', 'Sınıfa bir enerji', 'sorumlusu seçelim!'],
    ['#4F7FAF', 'Mavi · özet', 'Tasarruf', 'hepimizin görevi.']
  ];
  E.scene({
    name: 'Altı şapka', concept: 'Altı şapkalı düşünme tekniği', from: 'hats', to: 'hats2', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('hats'), s2 = E.s('hats2');
      HATS.forEach(([col, head, l1, l2], i) => {
        const x0 = 120 + (i % 3) * 570, y0 = 190 + Math.floor(i / 3) * 330;
        const k = E.se(t, sh + 0.4 + i * 0.35, sh + 0.9 + i * 0.35, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(x0 + 270, y0 + 140); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x0 - 270, -y0 - 140);
        const act = t > s2 + 0.3 + i * 2.0;
        W.card(ctx, x0, y0, 540, 280, { seed: 7300 + i, tint: act ? col : null, tintA: 0.14, w: act ? 3.2 : 2.4 });
        W.hat(ctx, x0 + 95, y0 + 170, 0.95, col, 7310 + i * 3);
        W.txt(ctx, head, x0 + 190, y0 + 70, { size: W.fit(ctx, head, 330, 38) });
        const a = s2 + 0.3 + i * 2.0;
        P.write(ctx, l1, x0 + 190, y0 + 150, E.seg(t, a, a + 0.8), { size: 36, color: W.AMBER });
        P.write(ctx, l2, x0 + 190, y0 + 205, E.seg(t, a + 0.6, a + 1.4), { size: 36, color: W.AMBER });
        ctx.restore();
      });
      W.damla(ctx, t, { x: 1840, y: 905, s: 0.6, flip: true, expr: 'happy', look: [-0.8, -0.3], arms: [[-1, 2.2], [1, 0.4]], seed: 6 });
    }
  });

  E.scene({
    name: 'Çelişkiler', concept: 'Görüş, gerekçe ve mantıksal çelişki', from: 'myview', to: 'contra2', trFrom: [400, 600],
    draw(ctx, t) {
      const sm = E.s('myview'), sf = E.s('friend'), sc = E.s('contra'), sf2 = E.s('friend2'), sc2 = E.s('contra2');
      W.damla(ctx, t, { x: 300, y: 905, s: 1.05, expr: t < sf ? 'determined' : (t < sc ? 'thinking' : 'happy'), look: [0.7, -0.4], arms: [[-1, 0.35], [1, t < sf ? 2.4 : 0.6]], seed: 8 });
      const b1 = E.se(t, sm + 0.2, sm + 0.8, 'out');
      if (b1 > 0) E.layer(ctx, b1, c => {
        W.card(c, 120, 200, 800, 250, { seed: 7320, tint: W.MOVE, tintA: 0.1 });
        W.txt(c, 'Benim görüşüm', 160, 255, { size: 36, color: W.MOVE });
        P.write(c, 'Tasarruf önemlidir,', 160, 325, E.seg(t, sm + 0.6, sm + 1.6), { size: 44 });
        P.write(c, 'çünkü üretimde kaynak kullanılır, çevre etkilenir.', 160, 395, E.seg(t, sm + 1.6, sm + 3.4), { size: W.fit(c, 'çünkü üretimde kaynak kullanılır, çevre etkilenir.', 730, 38), color: W.AMBER });
      });
      // arkadaş görüşü 1 → evler
      const f1 = Math.min(E.se(t, sf + 0.2, sf + 0.8, 'out'), 1 - E.se(t, sf2 - 0.3, sf2 + 0.2));
      if (f1 > 0) E.layer(ctx, f1, c => {
        W.card(c, 1000, 200, 800, 170, { seed: 7321, tint: W.HEAT, tintA: 0.1 });
        W.txt(c, 'Bir arkadaşım:', 1040, 250, { size: 34, color: W.HEAT });
        P.write(c, '“Tek bir lambayı kapatmakla ne değişir ki?”', 1040, 320, E.seg(t, sf + 0.6, sf + 2.2), { size: W.fit(c, '“Tek bir lambayı kapatmakla ne değişir ki?”', 730, 40) });
        const hk = E.se(t, sc + 0.2, sc + 0.8);
        if (hk > 0) {
          for (let r = 0; r < 3; r++) for (let q = 0; q < 7; q++) { const i = r * 7 + q; const off = t > sc + 1.5 + i * 0.2; c.save(); c.globalAlpha *= hk; D.houseMini(c, 1060 + q * 110, 520 + r * 120, 1.0, !off); c.restore(); }
          E.inkText(c, 'küçük tasarruflar birleşince büyür', 1400, 870, t, sc + 3.6, 1e9, { size: 42, align: 'center', color: W.AMBER });
        }
      });
      // arkadaş görüşü 2 → tasarrufun doğru anlamı
      const f2 = E.se(t, sf2 + 0.2, sf2 + 0.8, 'out');
      if (f2 > 0) E.layer(ctx, f2, c => {
        W.card(c, 1000, 200, 800, 170, { seed: 7322, tint: W.HEAT, tintA: 0.1 });
        W.txt(c, 'Bir başkası:', 1040, 250, { size: 34, color: W.HEAT });
        P.write(c, '“Tasarruf, karanlıkta oturmak demek.”', 1040, 320, E.seg(t, sf2 + 0.6, sf2 + 2.0), { size: 40 });
        P.cross(c, 1762, 262, 32, E.se(t, sf2 + 2.4, sf2 + 2.9), { w: 9, color: W.RED });
        const dk = E.se(t, sc2 + 0.2, sc2 + 0.8);
        if (dk > 0) {
          c.save(); c.globalAlpha *= dk;
          W.card(c, 1000, 430, 800, 420, { seed: 7323, tint: PAL.light, tintA: 0.12 });
          W.A.lamp(c, 1180, 650, 1.2, t, 1); W.shape(c, W.rect(1060, 730, 1320, 752), '#8A6A45', 0.5, 7324); P.icon.books(c, 1260, 700, 0.35);
          c.restore();
          P.write(c, 'Tasarruf =', 1400, 540, E.seg(t, sc2 + 0.8, sc2 + 1.6), { size: 44, color: W.AMBER });
          P.write(c, 'ihtiyaç kadar kullan,', 1400, 610, E.seg(t, sc2 + 1.6, sc2 + 2.6), { size: 40 });
          P.write(c, 'israf etme.', 1400, 675, E.seg(t, sc2 + 2.6, sc2 + 3.4), { size: 40 });
          P.write(c, 'Ders çalışırken ışık yanar ✓', 1400, 800, E.seg(t, sc2 + 3.6, sc2 + 4.8), { size: 34, align: 'center', color: PAL.life });
        }
      });
    }
  });
})();

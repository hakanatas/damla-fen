// SAHNE 6 — Kanıta dayalı çözüm (d), değerlendirme ve paylaşma (e); finansal okuryazarlık (fatura)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F723;
  E.scene({
    name: 'Çözüm', concept: 'Kanıta dayalı çözüm; değerlendirme; paylaşma', from: 'solution', to: 'share', trFrom: [960, 500],
    draw(ctx, t) {
      const ss = E.s('solution'), se = E.s('evaluate'), sh = E.s('share');
      F.tiles(ctx, 0);
      // 1) çözümler
      const o1 = E.se(t, se - 0.2, se + 0.6);
      E.layer(ctx, 1 - o1, c => {
        F.card(c, 200, 190, 700, 660, 3900);
        F.fit(c, 'Musluğu tamir et', 550, 260, 600, 44, { color: PAL.water });
        const fixed = t > ss + 3.0;
        F.tap(c, 520, 520, 1.1, t, { drip: !fixed, fall: 150 });
        F.wrench(c, 700, 420, 0.9 * E.se(t, ss + 1.0, ss + 1.6));
        if (fixed) { F.fit(c, 'damlama bitti', 550, 790, 600, 40, { color: F.GREEN }); P.check(c, 760, 770, 40, E.se(t, ss + 3.0, ss + 3.5), { w: 7, color: F.GREEN }); }
        F.fit(c, 'kanıt: günde ≈ 14 L kayıp', 550, 330, 600, 34, { weight: 400 });
        const k2 = E.se(t, ss + 4.0, ss + 4.7, 'out');
        if (k2 > 0) {
          c.save(); c.globalAlpha *= k2;
          F.card(c, 1020, 190, 700, 660, 3901);
          F.fit(c, 'Fırçalarken musluğu kapat', 1370, 260, 620, 44, { color: PAL.water });
          F.brush(c, 1250, 520, 1.3); F.glass(c, 1500, 600, 1.4);
          F.fit(c, 'bardakla çalkala', 1370, 790, 600, 40, { color: F.GREEN });
          c.restore();
        }
      });
      // 2) değerlendirme tablosu
      if (o1 > 0) E.layer(ctx, o1, c => {
        const cols = [['çözüm', 560], ['etkisi', 220], ['kolaylık', 220], ['maliyet', 220]];
        const rows = [['musluğu tamir ettirmek', 'yüksek', 'orta', 'az'], ['fırçalarken musluğu kapatmak', 'orta', 'kolay', 'yok'], ['yıkama suyuyla çiçek sulamak', 'orta', 'kolay', 'yok']];
        F.table(c, 200, 200, cols, rows, 86, E.se(t, se + 0.5, se + 1.4), rows.map((r, i) => E.se(t, se + 1.4 + i * 0.9, se + 2.0 + i * 0.9)), { size: 36, cellSize: 32 });
        const kb = E.se(t, se + 5.2, se + 6.0);
        c.save(); c.globalAlpha *= kb;
        F.bill(c, 1580, 380, 1.3);
        P.arrow(c, [1700, 320], [1700, 460], 1, { w: 5, bend: 0, head: 16, color: F.GREEN });
        F.fit(c, 'fatura azalır', 1600, 560, 360, 38, { color: F.GREEN });
        c.restore();
        F.damla(c, t, { x: 330, y: 890, s: 0.95, view: 'q3', expr: 'thinking', look: [0.8, -0.5], prop: 'notebook', arms: [[-1, 0.5], [1, 1.3]] });
        F.wfit(c, 'Musluk tamiri: hem suyu hem faturayı korur.', 960, 700, E.seg(t, se + 6.0, se + 7.4), 44, 1400, { align: 'center' });
      });
      // 3) paylaşma: afiş
      const kp = E.se(t, sh + 0.2, sh + 0.9, 'out');
      if (kp > 0) E.layer(ctx, kp, c => {
        const b = F.rr(0, 0, E.W, E.H, 1, 1); P.fillPts(c, b, PAL.paper, 1); F.tiles(c, 0);
        F.shape(c, [[560, 170], [1360, 170], [1360, 860], [560, 860]], '#8A6A45', 0.35, 3910);   // pano
        c.save(); c.translate(960, 515); c.rotate(-0.03);
        F.card(c, -300, -310, 600, 620, 3911);
        F.fit(c, 'HER DAMLA', 0, -220, 520, 64, { color: PAL.water, font: 'Kalam' });
        F.fit(c, 'DEĞERLİ!', 0, -150, 520, 64, { color: PAL.water });
        F.drop(c, 0, -20, 50, PAL.water, 0.7);
        F.fit(c, 'Damlayan musluk: günde ≈ 14 L', 0, 110, 520, 32);
        F.fit(c, 'Fırçalarken musluğu kapat', 0, 160, 520, 32);
        F.fit(c, 'Yağı lavaboya dökme', 0, 210, 520, 32);
        F.fit(c, '7-B · Damla', 0, 280, 520, 26, { weight: 400, alpha: 0.7 });
        c.restore();
        F.damla(c, t, { x: 1560, y: 890, s: 1.1, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], arms: [[-1, [-80, -160]], [1, 0.5]] });
      });
    }
  });
})();

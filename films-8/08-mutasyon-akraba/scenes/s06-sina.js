// SAHNE 6 — Fikirleri sınama: tutarsızlıkları tespit, veriler, geçerli fikir, saygı (FB.8.3.6 b, c)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const F = F808;
  E.scene({
    name: 'Fikirleri sına', concept: 'Tutarsızlık; geçerli fikir', from: 'check1', to: 'respect', trFrom: [540, 500],
    draw(ctx, t) {
      const s1 = E.s('check1'), s2 = E.s('check2'), sd = E.s('data'), sv = E.s('valid'), sr = E.s('respect');
      F.warmBg(ctx);
      F.board(ctx, t, 0, { k: [1, 1, 1] });
      F.stamp(ctx, 850, F.NOTE_Y[0] + 62, 'TUTARSIZ', E.se(t, s1 + 2.2, s1 + 2.8, 'out'), { color: F.RED, size: 34, rot: -0.1 });
      F.stamp(ctx, 850, F.NOTE_Y[1] + 62, 'TUTARSIZ', E.se(t, s2 + 1.2, s2 + 1.8, 'out'), { color: F.RED, size: 34, rot: 0.08 });
      F.stamp(ctx, 850, F.NOTE_Y[2] + 62, 'GEÇERLİ', E.se(t, sv + 1.6, sv + 2.2, 'out'), { color: F.GREEN, size: 34, rot: -0.08 });
      // sağ panel: gerekçeler
      const rx = 960, rw = 730;
      const why1 = Math.min(E.se(t, s1 + 1.0, s1 + 1.8, 'out'), 1 - E.se(t, s2 - 0.3, s2 + 0.3));
      if (why1 > 0) E.layer(ctx, why1, c => {
        F.card(c, rx, 220, rw, 300, 3900);
        F.wfit(c, 'Aa × Aa → her çocukta', rx + rw / 2, 310, E.seg(t, s1 + 1.3, s1 + 2.3), 48, rw - 60, { align: 'center' });
        F.wfit(c, 'aa olasılığı 1/4', rx + rw / 2, 380, E.seg(t, s1 + 2.0, s1 + 3.0), 52, rw - 60, { align: 'center', color: F.AMB });
        F.wfit(c, '“her çocuk” değil, bir olasılık', rx + rw / 2, 460, E.seg(t, s1 + 3.0, s1 + 4.0), 42, rw - 60, { align: 'center' });
      });
      const why2 = Math.min(E.se(t, s2 + 0.3, s2 + 1.0, 'out'), 1 - E.se(t, sd - 0.3, sd + 0.3));
      if (why2 > 0) E.layer(ctx, why2, c => {
        F.card(c, rx, 360, rw, 300, 3901);
        F.wfit(c, 'Akraba olmayan iki kişi de', rx + rw / 2, 450, E.seg(t, s2 + 0.6, s2 + 1.6), 46, rw - 60, { align: 'center' });
        F.wfit(c, 'taşıyıcı olabilir.', rx + rw / 2, 515, E.seg(t, s2 + 1.4, s2 + 2.4), 46, rw - 60, { align: 'center' });
        F.wfit(c, 'Olasılık daha düşüktür, sıfır değildir.', rx + rw / 2, 600, E.seg(t, s2 + 2.4, s2 + 3.4), 42, rw - 60, { align: 'center', color: F.AMB });
      });
      // şematik veri grafiği
      const dk = Math.min(E.se(t, sd + 0.2, sd + 0.9, 'out'), 1 - E.se(t, sr - 0.3, sr + 0.3));
      if (dk > 0) E.layer(ctx, dk, c => {
        F.card(c, rx, 190, rw, 600, 3902);
        F.fit(c, 'Çekinik kalıtsal hastalıkların görülme sıklığı', rx + rw / 2, 260, rw - 60, 38);
        const ax = rx + 80, ay = 650;
        line(c, [ax, ay], [ax + 570, ay], { w: 3 }); line(c, [ax, ay], [ax, 310], { w: 3 });
        const b1 = E.se(t, sd + 1.2, sd + 2.6), b2 = E.se(t, sd + 1.8, sd + 3.2);
        const bar = (x, h, col, sd2) => { if (h < 2) return; F.shape(c, [[x, ay], [x + 160, ay], [x + 160, ay - h], [x, ay - h]], col, 0.6, sd2); };
        bar(ax + 60, 300 * b1, F.AMB, 3910); bar(ax + 330, 100 * b2, F.AC, 3911);
        F.fit(c, 'akraba evliliği', ax + 140, ay + 48, 260, 36); F.fit(c, 'akraba olmayan', ax + 410, ay + 48, 260, 36);
        F.fit(c, '(şematik; oranlar hastalığa göre değişir)', rx + rw / 2, 760, rw - 60, 30, { weight: 400, alpha: 0.75 });
      });
      // saygı kartı
      const sk = E.se(t, sr + 0.3, sr + 1.0, 'out');
      if (sk > 0) E.layer(ctx, sk, c => {
        F.card(c, rx, 240, rw, 400, 3903, { tint: PAL.life, tintA: 0.12 });
        F.wfit(c, 'Bu bir olasılık bilgisidir.', rx + rw / 2, 340, E.seg(t, sr + 0.6, sr + 1.6), 50, rw - 60, { align: 'center' });
        F.wfit(c, 'Kimseyi suçlamaz.', rx + rw / 2, 420, E.seg(t, sr + 1.6, sr + 2.6), 50, rw - 60, { align: 'center' });
        F.wfit(c, 'Herkes saygıyı hak eder.', rx + rw / 2, 530, E.seg(t, sr + 3.0, sr + 4.0), 56, rw - 60, { align: 'center', color: F.GREEN });
      });
      F.damla(ctx, t, { x: 1795, y: 905, s: 0.72, flip: true, expr: t > sr ? 'happy' : 'determined', look: [-0.8, -0.3], arms: t > sr ? [[-1, 2.6], [1, 2.6]] : [[-1, 2.0], [1, 0.4]] });
    }
  });
})();

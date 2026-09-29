// SAHNE 4 — Sorgula: soru sorma, bilgi toplama, bilginin doğruluğunu değerlendirme (FB.6.7.1 b, c, ç)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F621;
  E.scene({
    name: 'Sorgula', concept: 'Soru sor · bilgi topla · doğruluğu değerlendir', from: 'questions', to: 'check', trFrom: [330, 700],
    draw(ctx, t) {
      const sq = E.s('questions'), sc = E.s('check');
      ctx.fillStyle = 'rgba(46,106,140,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const inCheck = t >= sc;
      DAMLA.draw(ctx, { x: 330, y: 890, s: 1.45, view: 'q3', expr: inCheck ? 'determined' : 'thinking', look: [0.8, -0.5], blink: E.blink(t, 6), squash: E.breath(t), t, talk: E.talk(t), seed: 3, arms: inCheck ? [[-1, 0.4], [1, 1.5]] : [[-1, 0.4], [1, [34, -150]]], prop: inCheck ? 'lens' : null, propTilt: -0.3 });
      // sorular + kaynaklar
      const qa = 1 - E.se(t, sc - 0.2, sc + 0.4);
      if (qa > 0) E.layer(ctx, qa, c => {
        P.bubble(c, 1060, 270, 900, 150, [520, 560], E.se(t, sq + 0.2, sq + 0.9), 3);
        P.write(c, 'Bu çeşitlilik neden önemli?', 1060, 290, E.seg(t, sq + 0.6, sq + 1.8), { size: 52, align: 'center' });
        P.bubble(c, 1180, 470, 860, 140, [560, 620], E.se(t, sq + 2.2, sq + 2.9), 5);
        P.write(c, 'Bir tür yok olursa ne olur?', 1180, 490, E.seg(t, sq + 2.6, sq + 3.8), { size: 52, align: 'center' });
        const src = [['kitaplar', (cc) => F.book(cc, 0, 0, 1)], ['belgeseller', (cc) => F.film(cc, 0, 0, 1)], ['güvenilir siteler', (cc) => P.icon.laptop(cc, 0, 10, 0.8)]];
        src.forEach(([name, draw], i) => {
          const at = sq + 4.6 + i * 0.7, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 900 + i * 330, y = 700;
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k)); draw(c); c.restore();
          P.write(c, name, x, y + 110, E.seg(t, at + 0.2, at + 1.0), { size: 38, align: 'center' });
        });
        if (t > sq + 4.4) P.write(c, 'Bilgi topla:', 900, 590, E.seg(t, sq + 4.4, sq + 5.0), { size: 40, align: 'center', color: PAL.water });
      });
      // doğruluk değerlendirmesi
      if (inCheck) {
        const A = [
          ['Pek çok bitki, tozlaşma için', 'arı gibi canlılara ihtiyaç duyar.', 'Kaynak: ders kitabı · bilimsel kurum', true],
          ['Bir böcek türü yok olsa', 'doğa hiç etkilenmez.', 'Kaynak: ? (kimin yazdığı belirsiz paylaşım)', false]
        ];
        A.forEach(([l1, l2, srcTxt, ok], i) => {
          const at = sc + 0.5 + i * 1.6, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const y = 190 + i * 330;
          E.layer(ctx, k, c => {
            c.save(); c.translate((1 - k) * 300, 0);
            F.card(c, 720, y, 1060, 270, 30 + i, { tint: ok ? PAL.life : '#9A9387', tintA: 0.12 });
            F.fit(c, l1, 760, y + 75, 820, 48, { align: 'left' });
            F.fit(c, l2, 760, y + 135, 820, 48, { align: 'left' });
            F.fit(c, srcTxt, 760, y + 215, 820, 34, { align: 'left', weight: 400, alpha: 0.75 });
            const mk = E.se(t, sc + 3.6 + i * 1.3, sc + 4.4 + i * 1.3);
            if (ok) { P.check(c, 1670, y + 110, 90, mk, { w: 12, color: '#3F7A3A' }); if (mk > 0.9) F.fit(c, 'kanıta dayalı', 1680, y + 225, 170, 32, { color: '#3F7A3A' }); }
            else { P.cross(c, 1680, y + 115, 50, mk, { w: 12, color: F.RED }); if (mk > 0.9) F.fit(c, 'kanıtı yok', 1680, y + 225, 170, 32, { color: F.RED }); }
            c.restore();
          });
        });
      }
    }
  });
})();

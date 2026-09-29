// SAHNE 4 — Resmî kurumlar ve başvuru (Türk Kızılay), bağışçı koşulları, organ bağışı, yapılacaklar listesi
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F09;
  E.scene({
    name: 'Kurumlar ve organ bağışı', concept: 'Türk Kızılay; organ bağışı; yapılacaklar', from: 'kizilay', to: 'todo', trFrom: [500, 500],
    draw(ctx, t) {
      const sk = E.s('kizilay'), sa = E.s('apply'), sd = E.s('donor'), so = E.s('organ'), st = E.s('todo');
      ctx.fillStyle = 'rgba(210,59,48,0.04)'; ctx.fillRect(0, 0, E.W, E.H);
      const cards = (b, i, title, lines, tint, col) => { const s0 = E.s(b), e0 = E.e(b), k = Math.min(E.se(t, s0 + 0.2, s0 + 0.8, 'out'), 1 - E.se(t, e0 - 0.3, e0 + 0.2)); if (k <= 0) return;
        E.layer(ctx, k, c => { K.card(c, 1000, 220, 830, 500, { seed: 9400 + i, tint, tintA: 0.08 }); K.text(c, title, 1050, 310, { size: 54, color: col, maxW: 740 });
          lines.forEach((l, j) => P.write(c, l, 1050, 410 + j * 72, E.seg(t, s0 + 0.9 + j * 1.2, s0 + 2.0 + j * 1.2), { size: 40 })); }); };
      // sol görseller
      const lk = Math.min(E.se(t, sk + 0.2, sk + 1.0), 1 - E.se(t, so - 0.3, so + 0.3));
      if (lk > 0) E.layer(ctx, lk, c => {
        F.crescent(c, 480, 400, 120);
        K.text(c, 'Türk Kızılay', 480, 590, { size: 50, align: 'center', color: F.CRES });
        const ak = E.se(t, sa + 0.5, sa + 1.3); if (ak > 0) { c.save(); c.globalAlpha *= ak; F.van(c, 480, 760, 1.1); c.restore(); K.text(c, 'gezici kan bağış aracı', 480, 870, { size: 32, align: 'center', alpha: ak }); }
      });
      cards('kizilay', 0, 'Resmî kurumlar', ['Kan bağışını resmî kurumlar yürütür.', 'Başta Türk Kızılay gelir.'], F.CRES, F.CRES);
      cards('apply', 1, 'Nasıl başvurulur?', ['• Kızılay kan bağış merkezleri', '• gezici kan bağış araçları', '• bilgi: Kızılay’ın resmî sitesi'], PAL.water, PAL.water);
      cards('donor', 2, 'Bağışçı koşulları', ['• bağışı yetişkinler yapar', '• yaş, kilo ve sağlık durumu', '  bağıştan önce kontrol edilir'], PAL.light, K.AMBER_D);
      if (t > sd + 4 && t < so) K.text(ctx, 'Sen şimdi: gönüllü duyurucu olabilirsin!', 1415, 800, { size: 38, align: 'center', color: K.LIFE_D, alpha: E.se(t, sd + 4, sd + 4.7) * (1 - E.se(t, so - 0.3, so + 0.2)) });
      // organ bağışı
      const ok = Math.min(E.se(t, so + 0.2, so + 1.0), 1 - E.se(t, st - 0.3, st + 0.3));
      if (ok > 0) E.layer(ctx, ok, c => { F.heart(c, 400, 450, 1.3); F.lung(c, 600, 450, 0.9, 1); K.text(c, 'bağışlanan bir organ', 500, 640, { size: 38, align: 'center' }); K.text(c, 'bir hayat kurtarabilir', 500, 690, { size: 38, align: 'center' }); });
      cards('organ', 3, 'Organ bağışı', ['Kan bağışı gibi hayat kurtarır.', 'Başvuru: hastaneler ya da', 'il sağlık müdürlükleri'], PAL.life, K.LIFE_D);
      // yapılacaklar listesi
      const tk = E.se(t, st + 0.2, st + 0.9, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        P.notebook(c, 380, 190, 1160, 690);
        K.text(c, 'Yapılacaklar listemiz', 480, 290, { size: 54, color: K.LIFE_D });
        ['Kan ve organ bağışını öğren.', 'Aileni ve çevreni bilgilendir.', 'Kan bağışı kampanyalarını duyur.', 'İleride gönüllü bağışçı ol!'].forEach((l, i) => { const k = E.seg(t, st + 1.0 + i * 1.2, st + 2.0 + i * 1.2);
          P.write(c, l, 560, 400 + i * 100, k, { size: 44 }); c.save(); c.globalAlpha *= Math.min(1, k * 3); stroke(c, K.rrect(505, 386 + i * 100, 40, 40, 6), { w: 2.6, closed: true, dry: false }); c.restore(); P.check(c, 505, 384 + i * 100, 30, E.se(t, st + 1.8 + i * 1.2, st + 2.2 + i * 1.2), { w: 5, color: K.LIFE_D }); });
      });
    }
  });
})();

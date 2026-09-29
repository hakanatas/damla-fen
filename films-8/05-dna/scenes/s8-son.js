// SAHNE 8 — Sıra sende (DNA modeli tasarımı, performans görevi) · Sıradaki: Mitoz ve Mayoz · Bitiş
(function () {
  const K = KIT, F = G8;
  function divide(c, t) {
    const sn = E.s('next'), k = E.se(t, sn + 1.0, sn + 2.0); if (k <= 0) return;
    const d = 30 + 70 * (0.5 + 0.5 * Math.sin((t - sn) * 1.6 - 1.5));
    c.save(); c.globalAlpha *= k;
    [-1, 1].forEach(sd => { F.cell(c, 960 + sd * d, 600, 110, 100, { seed: 5650 + (sd > 0 ? 7 : 0) }); F.chromo(c, 960 + sd * d - 22, 600, 60, F.CH1, { w: 14, rot: 0.3 }); F.chromo(c, 960 + sd * d + 22, 600, 44, F.CH2, { w: 13, rot: -0.2 }); });
    c.restore();
  }
  E.scene({
    name: 'Sıra sende', concept: 'Model tasarlama görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Farklı malzemelerle kendi DNA', 'modelini tasarla. Fosfat, şeker, bazlar', 've A–T, G–C eşleşmelerini etiketle.'],
        taskNote: 'Ayrıca araştır: DNA üzerinde çalışan başka bilim insanları kimler?',
        nextTitle: '6 · Hücreler Bölünüyor: Mitoz ve Mayoz', icon: divide
      });
      K.end(ctx, t, 5, 'Yaşamın Şifresi: DNA', 'FB.8.3.1 · FB.8.3.2');
    }
  });
})();

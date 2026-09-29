// SAHNE 5 — Kontrol listesiyle değerlendirme (ölçüt ve sınırlılıklar; SDB1.3 öz yansıtma)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F8M;
  const ITEMS = [
    ['Ölçüt: yük 5 N’dan az kuvvetle kalktı mı?', true],
    ['Sınırlılık: yalnızca atık malzeme mi?', true],
    ['Güvenli ve sağlam mı?', true],
    ['Estetik ve özgün mü?', true],
    ['Karşılaştırıp yeniledim mi?', true],
    ['Zamanında bitirdim mi?', false]
  ];
  E.scene({
    name: 'Kontrol listesi', concept: 'Ölçütlere göre değerlendirme', from: 'check', to: 'check', trFrom: [960, 540],
    draw(ctx, t) {
      const s = E.s('check');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 850);
      P.write(ctx, 'Kontrol listesi · Model 3', 760, 180, E.seg(t, s + 0.2, s + 1.3), { size: 62 });
      if (t > s + 1.3) P.drawOn(ctx, P.bez([756, 202], [1090, 214], [1460, 198], 30), E.se(t, s + 1.3, s + 1.8), { w: 3, color: PAL.light });
      ITEMS.forEach(([txt, ok], i) => {
        const at = s + 1.4 + i * 1.0, y = 300 + i * 92;
        const box = [[300, y - 40], [344, y - 42], [346, y + 2], [302, y + 4], [300, y - 40]];
        if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 4400 + i });
        P.write(ctx, txt, 380, y, E.seg(t, at, at + 0.9), { size: 44 });
        if (ok) P.check(ctx, 322, y - 20, 40, E.se(t, at + 0.7, at + 1.0), { w: 6 });
      });
      // son madde henüz tamamlanmadı → dürüst öz değerlendirme
      const kn = E.se(t, s + 7.4, s + 8.0);
      if (kn > 0) { ctx.save(); ctx.globalAlpha *= kn; F.txt(ctx, '← bir ders geciktim; bir dahaki sefere plan!', 1000, 300 + 5 * 92, { size: 34, color: '#B5553F' }); ctx.restore(); }
      DAMLA.draw(ctx, { x: 1640, y: 1010, s: 1.05, view: 'q3', flip: true, expr: t > s + 7.4 ? 'thinking' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

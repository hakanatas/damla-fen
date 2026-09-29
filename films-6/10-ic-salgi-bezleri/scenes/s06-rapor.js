// SAHNE 6 — Doğrulanmış bulgular ve rapor (FB.6.3.9 b, ç)
(function () {
  const { PAL } = INK; const K = KIT;
  const ITEMS = [
    ['findings', 0.8, 'Dengeli beslenirim.'], ['findings', 2.0, 'İyotlu tuz kullanırım (az miktarda).'],
    ['findings', 3.4, 'Yeterince uyurum (büyüme hormonu en çok uykuda salgılanır).'], ['findings', 5.2, 'Düzenli hareket eder, spor yaparım.'],
    ['findings2', 0.4, 'Başımı ve omurgamı korurum (kask, emniyet kemeri).'], ['findings2', 2.2, 'Şekerli yiyecek ve içecekleri azaltırım.'],
    ['findings2', 4.0, 'Zararlı maddelerden uzak dururum.'], ['findings2', 5.6, 'İlaçları doktora sormadan kullanmam.']
  ];
  E.scene({
    name: 'Rapor', concept: 'Doğrulanan bilgileri kaydetme', from: 'findings', to: 'record', trFrom: [700, 500],
    draw(ctx, t) {
      const sf = E.s('findings'), sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 160, 1350, 740);
      P.write(ctx, 'Rapor: Sistemlerimizin sağlığı', 270, 255, E.seg(t, sf + 0.1, sf + 1.0), { size: 56, color: K.AMBER_D });
      if (t > sf + 1) P.drawOn(ctx, P.bez([266, 275], [650, 286], [1060, 272], 30), E.se(t, sf + 1, sf + 1.5), { w: 3, color: PAL.light });
      ITEMS.forEach(([b, off, txt], i) => {
        const at = E.s(b) + off, y = 340 + i * 68;
        P.write(ctx, txt, 330, y, E.seg(t, at, at + 1.3), { size: 36 });
        P.check(ctx, 285, y - 14, 34, E.se(t, at + 1.2, at + 1.6), { w: 5, color: K.LIFE_D });
      });
      INK.label(ctx, 'Kaynaklar: ders kitabı · güvenilir sağlık siteleri · uzman görüşü', 330, 880, { size: 28, alpha: 0.65 * E.se(t, sr + 0.5, sr + 1.2) });
      const cheer = t > sr + 2.2;
      K.damla(ctx, t, { x: 1680, y: 900, s: 1.15, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

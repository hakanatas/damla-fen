// SAHNE 9 — Ergenliği sağlıklı geçirmek: temizlik, beslenme, hareket, uyku, güvenilir yetişkin (FB.6.3.8; D13.4, D18.1, SDB3.3)
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const K = KIT;
  const icon = {
    drop: (c, x, y) => { const p = []; for (let i = 0; i <= 30; i++) { const a = i / 30 * Math.PI * 2; const r = 16; p.push([x + Math.sin(a) * r * Math.sin(a / 2), y - Math.cos(a) * 22]); } P.fillPts(c, p, PAL.water, 0.55); stroke(c, p, { w: 2.4, closed: true, dry: false }); },
    apple: (c, x, y) => { const p = K.blob(x, y + 2, 20, 18, 7701, 0.05); P.fillPts(c, p, PAL.life, 0.6); stroke(c, p, { w: 2.4, closed: true, dry: false }); line(c, [x, y - 14], [x + 4, y - 26], { w: 2.4, dry: false }); },
    ball: (c, x, y) => { const p = circlePts(x, y, 20, 20, 24); P.fillPts(c, p, PAL.light, 0.6); stroke(c, p, { w: 2.4, closed: true, dry: false }); line(c, [x - 20, y], [x + 20, y], { w: 1.8, dry: false }); line(c, [x, y - 20], [x, y + 20], { w: 1.8, dry: false, bend: 0.2 }); },
    moon: (c, x, y) => { const p = P.arc(x, y, 20, Math.PI * 0.3, Math.PI * 1.7, 20).concat(P.arc(x + 9, y, 14, Math.PI * 1.6, Math.PI * 0.4, 16, 16).reverse()); P.fillPts(c, circlePts(x, y, 20, 20, 24), '#3A4A6A', 0.35); stroke(c, circlePts(x, y, 20, 20, 24), { w: 2.4, closed: true, dry: false }); },
    talk: (c, x, y) => { const p = K.rrect(x, y - 4, 44, 32, 10); P.fillPts(c, p, PAL.white); stroke(c, p, { w: 2.4, closed: true, dry: false }); P.fillPts(c, [[x - 8, y + 12], [x - 14, y + 24], [x + 2, y + 12]], PAL.ink); }
  };
  const ITEMS = [
    ['drop', 'Her gün yıkanırım, temiz giysi giyerim.', 'healthy', 0.8],
    ['apple', 'Dengeli beslenir, bol su içerim.', 'healthy', 2.6],
    ['ball', 'Her gün hareket eder, spor yaparım.', 'healthy', 4.4],
    ['moon', 'Yeterince uyurum (≈ 9–11 saat).', 'healthy', 6.2],
    ['talk', 'Sorularımı ailemle, rehber öğretmenimle', 'talk', 0.6]
  ];
  E.scene({
    name: 'Sağlıklı ergenlik', concept: 'Kişisel temizlik, beslenme, uyku, güvenilir yetişkin', from: 'healthy', to: 'talk', trFrom: [700, 500],
    draw(ctx, t) {
      const sh = E.s('healthy');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 160, 1300, 730);
      P.write(ctx, 'Sağlıklı ergenlik listem', 270, 265, E.seg(t, sh + 0.1, sh + 1.0), { size: 60, color: K.LIFE_D });
      if (t > sh + 1.0) P.drawOn(ctx, P.bez([266, 285], [600, 296], [930, 282], 30), E.se(t, sh + 1.0, sh + 1.5), { w: 3, color: PAL.light });
      ITEMS.forEach(([ic, txt, b, off], i) => {
        const at = E.s(b) + off, y = 370 + i * 95, k = E.se(t, at, at + 0.5);
        if (k <= 0) return;
        ctx.save(); ctx.globalAlpha = k; icon[ic](ctx, 300, y - 14); ctx.restore();
        P.write(ctx, txt, 350, y, E.seg(t, at, at + 1.3), { size: 44 });
        if (i < 4) P.check(ctx, 1370, y - 20, 40, E.se(t, at + 1.4, at + 1.8), { w: 6, color: K.LIFE_D });
      });
      const st = E.s('talk');
      P.write(ctx, 'ya da doktorla konuşurum.', 350, 370 + 5 * 95 - 10, E.seg(t, st + 1.9, st + 3.2), { size: 44 });
      P.check(ctx, 1370, 370 + 4 * 95 - 20, 40, E.se(t, st + 3.3, st + 3.7), { w: 6, color: K.LIFE_D });
      const cheer = t > st + 4.2;
      K.damla(ctx, t, { x: 1650, y: 900, s: 1.2, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

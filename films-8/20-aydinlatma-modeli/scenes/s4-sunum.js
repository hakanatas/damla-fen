// SAHNE 6 — Dijital sunum, modelleri karşılaştırma, nezaket · SAHNE 7 — Sıra sende · sonraki film · bitiş
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK;
  const U = U6, M = window.F20M;
  // diğer grupların model kartları (basit çizimler)
  const OTHERS = [
    ['kavanoz fener', (c, x, y, t) => { const j = CK.rect(x - 45, y - 60, 90, 110); P.fillPts(c, j, '#DCE8EE', 0.7); stroke(c, CK.densify(CK.densify(j)), { w: 3, closed: true }); P.fillPts(c, CK.rect(x - 50, y - 75, 100, 16), '#8C877E'); CK.bulb(c, x, y + 30, 0.45, 1, t, { rays: false }); line(c, [x - 40, y - 75], [x, y - 110], { w: 2.4 }); line(c, [x + 40, y - 75], [x, y - 110], { w: 2.4 }); }],
    ['katlanır masa lambası', (c, x, y, t) => { line(c, [x - 50, y + 50], [x + 50, y + 50], { w: 6 }); line(c, [x, y + 50], [x - 20, y - 20], { w: 4 }); line(c, [x - 20, y - 20], [x + 30, y - 60], { w: 4 }); const sh = [[x + 5, y - 85], [x + 70, y - 60], [x + 50, y - 25]]; P.fillPts(c, sh, PAL.water, 0.6); stroke(c, sh.concat([sh[0]]), { w: 3, closed: true }); CK.glow(c, x + 70, y - 20, 0.4, 0.5); }],
    ['el feneri', (c, x, y, t) => { const b = CK.rect(x - 70, y - 20, 100, 40); P.fillPts(c, b, PAL.life, 0.55); stroke(c, CK.densify(b), { w: 3, closed: true }); const h = [[x + 30, y - 20], [x + 70, y - 38], [x + 70, y + 38], [x + 30, y + 20]]; P.fillPts(c, h, '#B8B2A6'); stroke(c, h.concat([h[0]]), { w: 3, closed: true }); for (let i = -2; i <= 2; i++) line(c, [x + 80, y + i * 12], [x + 130, y + i * 26], { w: 2.4, color: CK.AMBD, alpha: 0.7, dry: false }); }]
  ];
  E.scene({
    name: 'Sunum', concept: 'Modeli sunma, karşılaştırma, nezaket', from: 'present', to: 'kind', trFrom: [960, 400],
    draw(ctx, t) {
      const sp = E.s('present'), sk = E.s('kind');
      // perde / dijital sunum
      const scr = CK.rect(560, 160, 800, 440); P.fillPts(ctx, scr, PAL.white, 0.95); stroke(ctx, CK.densify(CK.densify(scr)), { w: 3.4, closed: true, seed: 2301 });
      line(ctx, [960, 600], [960, 660], { w: 3 });
      U.txt(ctx, 'Okuma lambam · Model 2', 960, 220, { size: 40, align: 'center', color: U.AMBER });
      ctx.save(); ctx.translate(760, 420); ctx.scale(0.45, 0.45); ctx.translate(-560, -600); U.schParallel(ctx, 360, 470, 400, 260, 2, { lit: 0.9, w: 7 }); M.book(ctx, 980, 700, 1); ctx.restore();
      ['paralel bağlama', 'folyo yansıtıcı', 'anahtarla tasarruf'].forEach((s, i) => U.txt(ctx, '• ' + s, 1060, 340 + i * 60, { size: 32, alpha: E.seg(t, sp + 0.8 + i * 0.6, sp + 1.3 + i * 0.6) }));
      // diğer grupların modelleri
      OTHERS.forEach(([nm, fn], i) => {
        const at = sp + 3 + i * 1, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const x = 330 + i * 630 + (i === 1 ? 0 : 0), y = 770;
        E.layer(ctx, k, c => { CK.card(c, x - 170, y - 130, 340, 250, { seed: 2310 + i }); fn(c, x, y - 20, t); U.txt(c, nm, x, y + 100, { size: 32, align: 'center' }); });
      });
      // nazik geri bildirim balonları
      const FB = [['Çok yaratıcı!', 1560, 330], ['Yansıtıcıyı büyütebilirsin.', 380, 330], ['Teşekkürler, deneyeceğim!', 1560, 480]];
      FB.forEach(([s, x, y], i) => { const at = sk + 0.4 + i * 1.3, k = E.se(t, at, at + 0.5); if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; CK.card(ctx, x - 190, y - 55, 380, 90, { seed: 2320 + i, fill: i === 2 ? '#F6E7B8' : '#FBF8F1' }); U.txt(ctx, s, x, y + 8, { size: 32, align: 'center' }); ctx.restore(); });
      U.damla(ctx, t, { x: 1810, y: 960, s: 0.75, view: 'q3', flip: true, expr: t > sk + 3 ? 'happy' : 'curious', look: [-0.8, -0.4], arms: [[-1, 1.9], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next'), se = E.s('end');
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', [
        'Grubunla özgün bir aydınlatma aracı modeli tasarla.',
        '• Bir ihtiyaç ve ölçütler belirle, araştır.',
        '• Modelini çiz, yalnızca pille kur ve dene.',
        '• Kanıtlarını kaydet, modelini yenile.',
        '• Dijital sunumla anlat; arkadaşlarını nazikçe dinle.',
        '• Estetik görünüm için görsel sanatlardan yararlan.'
      ], { size: 40, gap: 68, step: 1.2 });
      if (t > sn - 0.5) {
        const k = Math.min(E.se(t, sn, sn + 0.8), 1 - E.se(t, se, se + 0.6));
        E.layer(ctx, k, c => {
          U.next(c, t, sn, se + 0.5, '21 · Elektrik Enerjisinin Dönüşümü');
          CK.socket(c, 960, 800, 1.3); const bl = CK.bulb(c, 960, 749, 1.3, 1, t);
          for (let i = 0; i < 3; i++) { const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([1150 + i * 50 + Math.sin(u * 9 + t * 5 + i) * 7, 700 - u * 110]); } stroke(c, pts, { w: 3, color: U.HEAT, seed: 60 + i }); }
          U.txt(c, 'ışık', 760, 560, { size: 42, align: 'center', color: U.AMBER }); U.txt(c, 'ısı', 1200, 560, { size: 42, align: 'center', color: U.HEAT });
        });
      }
      if (t < se + 0.8) E.layer(ctx, 1 - E.se(t, se, se + 0.6), c => U.damla(c, t, { x: 1760, y: 930, s: 0.9, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], arms: [[-1, 0.35], [1, 2.3 + 0.3 * Math.sin(t * 7)]] }));
      U.end(ctx, t, '20 · Aydınlatma Aracı Tasarlıyorum', 'FB.8.6.5');
    }
  });
})();

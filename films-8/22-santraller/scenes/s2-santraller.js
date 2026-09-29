// SAHNE 3 — Santralleri kullandıkları enerji kaynağına göre ayrıştır (FB.8.6.8 b): 7 santral ve enerji dönüşüm zincirleri
(function () {
  const { PAL, stroke, line } = INK;
  const W = W6;
  const S = ST22;
  const INFO = {
    hes: { src: 'akarsu (su)', steps: ['suyun potansiyel enerjisi', 'kinetik enerji', 'türbin → jeneratör'], ex: 'Atatürk Barajı · Fırat Nehri', exAt: 'hes2' },
    termik: { src: 'kömür, doğal gaz', steps: ['yakıtın kimyasal enerjisi', 'ısı: su buhara döner', 'buhar → türbin → jeneratör'] },
    nukleer: { src: 'uranyum', steps: ['nükleer enerji', 'ısı: su buhara döner', 'buhar → türbin → jeneratör'], ex: 'Akkuyu NGS · Mersin', exAt: 'nukleer', exOff: 3.5 },
    jeo: { src: 'yer altı ısısı', steps: ['sıcak su ve buhar', 'türbin → jeneratör'], ex: 'Denizli · Aydın', exAt: 'jeo', exOff: 3.5 },
    ruzgar: { src: 'rüzgâr', steps: ['rüzgârın hareket enerjisi', 'türbin kanatları → jeneratör'] },
    dalga: { src: 'deniz dalgaları', steps: ['dalgaların hareket enerjisi', 'şamandıralar → jeneratör'] },
    gunes: { src: 'Güneş ışığı', steps: ['ışık enerjisi', 'güneş paneli'], note: 'türbin yok!' }
  };
  const KEYS = S.KEYS;
  function chain(ctx, key, t, a0) {
    const d = INFO[key];
    W.card(ctx, 1200, 200, 620, 600, { seed: 6300 });
    W.txt(ctx, S.NAMES[key] + ' santrali', 1510, 268, { size: W.fit(ctx, S.NAMES[key] + ' santrali', 560, 50), align: 'center', color: W.AMBER });
    W.txt(ctx, 'Kaynak: ' + d.src, 1510, 330, { size: 36, align: 'center' });
    line(ctx, [1250, 355], [1770, 350], { w: 1.6, dry: false, alpha: 0.5 });
    d.steps.forEach((st, i) => {
      const at = a0 + 0.8 + i * 1.0, y = 420 + i * 100;
      if (i > 0) W.flow(ctx, [1510, y - 80], [1510, y - 40], E.se(t, at - 0.3, at), { w: 3.4, head: 12 });
      P.write(ctx, st, 1510, y, E.seg(t, at, at + 0.8), { size: W.fit(ctx, st, 560, 38), align: 'center' });
    });
    const n = d.steps.length, by = 420 + n * 100 + 10, ab = a0 + 0.8 + n * 1.0;
    W.flow(ctx, [1510, by - 90], [1510, by - 40], E.se(t, ab - 0.3, ab), { w: 3.4, head: 12 });
    W.badge(ctx, 'elektrik', 1510, by, E.se(t, ab, ab + 0.5, 'out'), { size: 42, name: 'Elektrik enerjisi' });
    if (d.note) P.write(ctx, d.note, 1510, by + 90, E.seg(t, ab + 0.8, ab + 1.6), { size: 44, align: 'center', color: W.MOVE });
  }
  E.scene({
    name: 'Santraller', concept: 'Santralleri kaynağa göre ayrıştırma', from: 'sort', to: 'gunes', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('sort'), s0 = E.s('hes');
      // giriş: yedi santral küçük resimleri
      const ik = 1 - E.se(t, s0 - 0.2, s0 + 0.4);
      if (ik > 0) E.layer(ctx, ik, c => {
        KEYS.forEach((k, i) => {
          const kk = E.se(t, ss + 0.3 + i * 0.3, ss + 0.8 + i * 0.3, 'out'); if (kk <= 0) return;
          const x = 60 + i * 262, y = 330;
          c.save(); c.translate(x + 110, y + 66); c.scale(P.pop(kk), P.pop(kk)); c.translate(-x - 110, -y - 66);
          S.draw(c, k, x, y, 0.22, t); W.txt(c, S.NAMES[k], x + 110, y + 180, { size: W.fit(c, S.NAMES[k], 230, 36), align: 'center' });
          c.restore();
        });
        P.write(c, 'Hangi kaynağı kullanıyor?', 960, 640, E.seg(t, ss + 2.8, ss + 4), { size: 54, align: 'center', color: PAL.water });
        W.damla(c, t, { x: 960, y: 905, s: 0.9, view: 'front', expr: 'curious', look: [0, -0.4], arms: [[-1, 0.35], [1, 2.3]], seed: 5 });
      });
      // santral panelleri
      KEYS.forEach((k, i) => {
        const a0 = E.s(k), a1 = i < KEYS.length - 1 ? E.s(KEYS[i + 1]) : E.e('gunes') + 1;
        if (t < a0 || t > a1 + 0.6) return;
        const kk = E.se(t, a0, a0 + 0.5);
        E.layer(ctx, kk, c => {
          c.save(); c.beginPath(); c.rect(0, 160, E.W, 770); c.clip(); c.setTransform(1, 0, 0, 1, 0, 0); E.paper(c); c.restore();
          S.draw(c, k, 110, 200, 1.0, t);
          chain(c, k, t, a0);
          const d = INFO[k];
          if (d.ex) { const at = E.s(d.exAt) + (d.exOff ?? 0.3); const ek = E.se(t, at, at + 0.6, 'out'); if (ek > 0) { c.save(); c.globalAlpha *= ek; W.card(c, 140, 222, 560, 56, { seed: 6310, tint: PAL.life, tintA: 0.2 }); W.txt(c, 'Türkiye: ' + d.ex, 170, 262, { size: 34 }); c.restore(); } }
        });
      });
    }
  });
})();

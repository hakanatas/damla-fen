// SAHNE 8 — Bulgular: sağlıklı alışkanlıklar, sigara dumanı, bağımlılık, Yeşilay, ALO 191 (FB.7.3.7 b, c; hastalıklara girilmez)
(function () {
  const { PAL, stroke, wash } = INK; const K = KIT, F = F10;
  const ids = ['habits', 'smoke', 'addict', 'yesilay', 'alo'];
  const vis = (t, id) => { const i = ids.indexOf(id), a = E.s(id), b = i < ids.length - 1 ? E.s(ids[i + 1]) : E.e(id) + 5; return Math.min(E.se(t, a + 0.1, a + 0.8), 1 - E.se(t, b - 0.4, b + 0.1)); };
  const miniLungs = (c, x, y, s, haze, t) => { [F.LUNG_R, F.LUNG_L].forEach((L, i) => { const P2 = L.map(([px, py]) => [x + px * s, y + py * s]); P.fillPts(c, P2, '#F4DDD4'); wash(c, P2, F.LUNG, 0.5, 10800 + i, { bleed: 1, blooms: 0 }); stroke(c, P2, { w: 2.6, closed: true, seed: 10802 + i, color: F.LUNG_D }); });
    stroke(c, [[x, y - 200 * s], [x, y]], { w: 30 * s, color: F.CART, dry: false, taper: 0 });
    if (haze > 0) { const R = INK.rng(10810); for (let i = 0; i < 26; i++) { const px = x + (R() - 0.5) * 460 * s, py = y + R() * 340 * s - 20 * s; c.save(); c.globalAlpha *= haze * 0.5; INK.inkDot(c, px, py, 7 + R() * 6, { color: '120,112,106' }); c.restore(); } } };
  E.scene({
    name: 'Bulgular', concept: 'Sağlıklı alışkanlıklar, sigara ve bağımlılık, Yeşilay, ALO 191', from: 'habits', to: 'alo', trFrom: [960, 500],
    draw(ctx, t) {
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.10)'); g.addColorStop(1, 'rgba(227,160,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // 1) alışkanlıklar
      let k = vis(t, 'habits'), s0 = E.s('habits');
      if (k > 0) E.layer(ctx, k, c => { K.text(c, 'Bulgularım', 960, 240, { size: 60, align: 'center', color: K.LIFE_D });
        [[460, 'düzenli spor', (x, y) => F.ball(c, x, y - 10 + Math.abs(Math.sin(t * 3)) * -30, 70)], [960, 'dengeli beslenme', (x, y) => F.plate(c, x, y, 1.3)], [1460, 'odayı havalandırmak', (x, y) => F.window(c, x, y, 1, t)]].forEach(([x, l, ic], i) => {
          const a = E.se(t, s0 + 0.6 + i * 1.6, s0 + 1.2 + i * 1.6, 'out'); if (a <= 0) return;
          c.save(); c.globalAlpha *= a; ic(x, 480); c.restore(); K.text(c, l, x, 680, { size: 44, align: 'center', alpha: a }); P.check(c, x, 760, 40, E.se(t, s0 + 1.2 + i * 1.6, s0 + 1.8 + i * 1.6), { w: 6, color: K.LIFE_D }); }); });
      // 2) sigara dumanı
      k = vis(t, 'smoke'); s0 = E.s('smoke');
      if (k > 0) E.layer(ctx, k, c => { F.cigarette(c, 600, 560, 1.5, t); P.cross(c, 600, 540, 150, E.se(t, s0 + 1.5, s0 + 2.3), { color: K.RED, w: 16 });
        miniLungs(c, 1330, 460, 0.62, E.se(t, s0 + 1, s0 + 4), t);
        K.text(c, 'soluk yolları ve alveoller zarar görür', 1330, 740, { size: 40, align: 'center', alpha: E.se(t, s0 + 1.5, s0 + 2.2) });
        K.text(c, 'dumanlı ortamda durmak da zararlıdır', 1330, 800, { size: 40, align: 'center', color: K.RED, alpha: E.se(t, s0 + 4, s0 + 4.7) }); });
      // 3) bağımlılık
      k = vis(t, 'addict'); s0 = E.s('addict');
      if (k > 0) E.layer(ctx, k, c => { K.card(c, 330, 185, 1260, 150, { seed: 10820, tint: PAL.light, tintA: 0.12 });
        K.text(c, 'Bağımlılık:', 380, 250, { size: 46, color: K.AMBER_D }); K.text(c, 'bir maddeye ya da davranışa karşı', 640, 250, { size: 40 }); K.text(c, 'isteği kontrol edememek', 640, 305, { size: 40 });
        K.node(c, 'Bağımlı bir kişi neler yaşar?', 960, 470, E.se(t, s0 + 2, s0 + 2.6, 'out'), { size: 46, seed: 3 });
        [[480, 'sağlık'], [800, 'aile'], [1120, 'okul'], [1440, 'arkadaşlık']].forEach(([x, l], i) => { const a = E.se(t, s0 + 4 + i * 0.8, s0 + 4.6 + i * 0.8, 'out'); if (a <= 0) return;
          P.drawOn(c, P.bez([960, 515], [(960 + x) / 2, 560], [x, 640], 16), a, { w: 2.6 }); K.node(c, l, x, 700, a, { size: 42, tint: PAL.light, tintA: 0.2, seed: 10 + i }); });
        K.text(c, 'hepsi olumsuz etkilenebilir', 960, 820, { size: 40, align: 'center', alpha: E.se(t, s0 + 7.2, s0 + 7.8) }); });
      // 4) Yeşilay
      k = vis(t, 'yesilay'); s0 = E.s('yesilay');
      if (k > 0) E.layer(ctx, k, c => { const ck = E.se(t, s0 + 0.4, s0 + 1.2, 'out'); c.save(); c.translate(600, 500); c.scale(P.pop(ck), P.pop(ck)); F.crescent(c, 0, 0, 150, 1); c.restore();
        K.text(c, 'Yeşilay', 850, 470, { size: 96, fam: 'Fraunces', weight: 600, color: K.LIFE_D, alpha: E.se(t, s0 + 0.8, s0 + 1.4) });
        ['bağımlılıkla mücadele eder', 'farkındalık çalışmaları yapar', 'simgesi: yeşil hilal'].forEach((l, i) => P.write(c, '• ' + l, 860, 560 + i * 64, E.seg(t, s0 + 1.8 + i * 1.2, s0 + 2.8 + i * 1.2), { size: 42 }));
        INK.label(c, 'simge çizimi temsilîdir', 60, 900, { size: 28, alpha: 0.55 }); });
      // 5) ALO 191
      k = vis(t, 'alo'); s0 = E.s('alo');
      if (k > 0) E.layer(ctx, k, c => { F.phone(c, 560, 500, 1.6); K.text(c, 'ALO 191', 800, 470, { size: 100, color: '#1F4A63', alpha: E.se(t, s0 + 0.5, s0 + 1.1) });
        K.text(c, 'Sağlık Bakanlığı', 810, 560, { size: 44, alpha: E.se(t, s0 + 1.2, s0 + 1.8) }); K.text(c, 'Sigara Bırakma Danışma Hattı', 810, 620, { size: 44, alpha: E.se(t, s0 + 1.8, s0 + 2.4) });
        K.node(c, 'ücretsiz destek', 1010, 730, E.se(t, s0 + 3.2, s0 + 3.8, 'out'), { size: 42, tint: PAL.life, tintA: 0.25, seed: 20 }); });
      K.damla(ctx, t, { x: 1760, y: 905, s: 0.85, flip: true, expr: 'curious', look: [-0.7, -0.2], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();

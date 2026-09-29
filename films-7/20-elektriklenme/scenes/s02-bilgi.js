// SAHNE 2 — Bilgi toplama araçları; bulunan bilgiyi doğrulama (FB.7.6.1 a, b, c)
(function () {
  const { PAL, line, stroke } = INK;
  const F = F720;
  const SRC = [
    ['ders kitabı', (c, x, y) => P.icon.books(c, x, y, 0.9)],
    ['güvenilir dijital kaynak', (c, x, y, t) => P.icon.laptop(c, x, y, 0.9, t)],
    ['bilim merkezi', (c, x, y) => F.center(c, x, y, 1.0)],
    ['öğretmenim', (c, x, y) => F.teacher(c, x, y, 0.9)]
  ];
  E.scene({
    name: 'Bilgi topla', concept: 'Bilgi toplama araçları; doğrulama', from: 'tools', to: 'verify', trFrom: [960, 400],
    draw(ctx, t) {
      const st = E.s('tools'), sc = E.s('claim'), sv = E.s('verify');
      F.damla(ctx, t, { x: 250, y: 880, s: 1.15, view: 'q3', expr: t > sc && t < sv ? 'thinking' : 'curious', look: [0.8, -0.5], prop: t < sc ? 'lens' : 'notebook', arms: t < sc ? [[-1, 0.4], [1, 2.0]] : [[-1, 0.5], [1, 1.2]] });
      // 1) araç kartları
      const out = E.se(t, sc - 0.2, sc + 0.6);
      E.layer(ctx, 1 - out, c => {
        SRC.forEach(([name, ic], i) => {
          const at = st + 1.2 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const x = 560 + i * 350, y = 260;
          c.save(); c.translate(x + 140, y + 170); c.scale(P.pop(k), P.pop(k)); c.translate(-(x + 140), -(y + 170));
          F.card(c, x, y, 280, 340, 60 + i);
          ic(c, x + 140, y + 150, t);
          F.fit(c, name, x + 140, y + 300, 250, 36);
          c.restore();
        });
      });
      // 2) iddia kartı (web sayfası)
      const kc = E.se(t, sc + 0.2, sc + 0.9, 'out');
      if (kc > 0) E.layer(ctx, kc, c => {
        const x = 600, y = 190, w = 1180, h = 300;
        F.card(c, x, y, w, h, 71);
        const bar = F.rr(x + 10, y + 8, w - 20, 44, 6, 2); P.fillPts(c, bar, '#E6DCC6');
        [0, 1, 2].forEach(i => P.fillPts(c, INK.circlePts(x + 36 + i * 26, y + 30, 8, 8, 12), PAL.inkSoft));
        F.fit(c, 'www.   bir site   ...', x + 300, y + 40, 360, 26, { weight: 400, alpha: 0.7 });
        F.wfit(c, '“Elektriklenme yalnızca kışın olur.”', x + 60, y + 150, E.seg(t, sc + 0.8, sc + 2.2), 58, w - 340);
        F.wfit(c, 'kaynak: yok', x + 60, y + 240, E.seg(t, sc + 3.0, sc + 3.8), 40, 400, { color: PAL.inkSoft, weight: 400 });
        F.stamp(c, x + w - 200, y + 240, 'KAYNAK YOK', E.seg(t, sc + 3.6, sc + 4.1), { color: F.AMB, size: 40 });
        F.stamp(c, x + w - 150, y + 140, 'YANLIŞ', E.seg(t, sv + 2.4, sv + 2.9), { color: F.RED, size: 56, rot: 0.1 });
      });
      // 3) doğrulama: iki güvenilir kaynak + doğrusu
      const kv = E.se(t, sv + 0.1, sv + 0.8, 'out');
      if (kv > 0) E.layer(ctx, kv, c => {
        [[600, 'ders kitabı', (cc, x, y) => P.icon.books(cc, x, y, 0.6)], [900, 'bilim sitesi', (cc, x, y) => P.icon.laptop(cc, x, y, 0.6, t)]].forEach(([x, name, ic], i) => {
          F.card(c, x, 560, 280, 200, 80 + i);
          ic(c, x + 90, 650); F.fit(c, name, x + 90, 740, 170, 30);
          P.check(c, x + 220, 640, 60, E.se(t, sv + 0.8 + i * 0.5, sv + 1.3 + i * 0.5), { w: 8, color: F.GREEN });
        });
        F.wfit(c, 'karşılaştır', 1192, 630, E.seg(t, sv + 1.0, sv + 1.8), 40, 300, { color: F.AMB });
        P.arrow(c, [1200, 660], [1345, 690], E.se(t, sv + 1.2, sv + 1.8), { w: 3, color: F.AMB, bend: -10 });
        const d = F.card(c, 1360, 560, 440, 300, 83, { tint: F.GREEN, tintA: 0.12 });
        F.wfit(c, 'Doğrusu:', 1390, 620, E.seg(t, sv + 3.0, sv + 3.6), 40, 400, { color: F.GREEN });
        F.wfit(c, 'Her mevsim olur.', 1390, 690, E.seg(t, sv + 3.4, sv + 4.4), 40, 410);
        F.wfit(c, 'Kuru havada daha', 1390, 750, E.seg(t, sv + 4.2, sv + 5.0), 40, 410);
        F.wfit(c, 'kolay gözlenir.', 1390, 810, E.seg(t, sv + 4.8, sv + 5.6), 40, 410);
      });
    }
  });
})();

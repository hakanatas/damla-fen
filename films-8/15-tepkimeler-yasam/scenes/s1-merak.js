// SAHNE 1 — Merak ve araştırma sorusu · SAHNE 2 — Bilgi toplama araçlarını belirle (a)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  E.scene({
    name: 'Merak', concept: 'Araştırma sorusu', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q');
      const hill = P.hillLine(E.W);
      P.sun(ctx, 1740, 250, 80, t, { nrays: 18 });
      P.landscape(ctx, E.W, E.H, t, { hill });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      U.damla(ctx, t, { x: dx, y: dy, s: 1.4, view: 'q3', expr: t > sh ? 'curious' : 'happy', look: [0.6, -0.5], arms: [[-1, 0.35], [1, t > sh ? 2.3 : 0.4]] });
      // düşünce balonu: laboratuvar mı, hayatın içi mi?
      const bk = E.se(t, sh + 0.8, sh + 1.6);
      if (bk > 0) {
        P.bubble(ctx, 1240, 450, 420, 250, [dx + 60, dy - 330], bk, 3);
        if (bk > 0.9) {
          const L = 1130, B = 520;
          const fk = [[L - 18, B - 110], [L + 18, B - 110], [L + 18, B - 50], [L + 58, B], [L - 58, B], [L - 18, B - 50], [L - 18, B - 110]];
          P.fillPts(ctx, [[L - 40, B - 30], [L + 40, B - 30], [L + 58, B], [L - 58, B]], '#8FBF9A', 0.8); stroke(ctx, fk, { w: 3, closed: true });
          U.apple(ctx, 1260, 470, 0.45, 0.5); U.nail(ctx, 1360, 500, 0.45, 0.7, -0.3); U.flame(ctx, 1360, 430, 0.6, t, 1);
          U.txt(ctx, '?', 1200, 510, { size: 60, color: PAL.water });
        }
      }
      const qk = E.se(t, sq + 0.3, sq + 1.0);
      if (qk > 0) E.layer(ctx, qk, c => {
        U.card(c, 360, 160, 1200, 150, { seed: 2001, tint: PAL.light, tintA: 0.15 });
        U.txt(c, 'Araştırma sorusu:', 400, 215, { size: 36, color: U.AMBER });
        P.write(c, 'Kimyasal tepkimeler günlük yaşamımızı nasıl etkiler?', 400, 280, E.seg(t, sq + 0.8, sq + 2.6), { size: 46 });
      });
      U.title(ctx, t, '15 · Hayatın İçindeki Tepkimeler');
    }
  });
  const TOOLS = [
    ['okul kütüphanesi', 'kitaplar', (c, x, y) => P.icon.books(c, x, y, 1.1)],
    ['bilgisayar lab.', 'güvenilir dijital içerik', (c, x, y, t) => P.icon.laptop(c, x, y, 1.1, t)],
    ['görsel kaynaklar', 'afiş, belgesel', (c, x, y) => { const f = U.rect(x - 80, y - 70, x + 80, y + 60); P.fillPts(c, f, PAL.white); stroke(c, f, { w: 3, closed: true }); P.fillPts(c, U.rect(x - 60, y - 50, x + 60, y), '#BFD4DF'); U.flame(c, x - 20, y + 2, 0.4, 0, 1); for (let i = 0; i < 2; i++) line(c, [x - 60, y + 18 + i * 18], [x + 50, y + 18 + i * 18], { w: 2, dry: false, alpha: 0.6 }); }],
    ['kendi gözlemlerim', 'gözlem defteri', (c, x, y) => { P.icon.magnifier(c, x - 20, y - 10, 1); }]
  ];
  E.scene({
    name: 'Araçlar', concept: 'Bilgi toplama araçlarını belirleme', from: 'tools', to: 'toollist', trFrom: [960, 500],
    draw(ctx, t) {
      const st = E.s('tools'), sl = E.s('toollist');
      TOOLS.forEach(([nm, sub, ic], i) => {
        const at = sl + 0.3 + i * 1.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const x = 290 + i * 410;
        E.layer(ctx, k, c => {
          U.card(c, x - 180, 250, 360, 500, { seed: 2010 + i });
          ic(c, x, 430, t);
          U.txt(c, nm, x, 620, { size: 40, align: 'center' });
          U.txt(c, sub, x, 675, { size: 32, align: 'center', alpha: 0.75 });
          P.check(c, x + 130, 280, 40, E.se(t, at + 0.8, at + 1.2), { w: 5, color: PAL.life });
        });
      });
      P.write(ctx, 'Hangi araçlarla bilgi toplayacağım?', 960, 200, E.seg(t, st + 0.4, st + 2.0), { size: 48, align: 'center', color: U.AMBER });
      U.damla(ctx, t, { x: 1780, y: 900, s: 0.8, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.2], arms: [[-1, 1.3], [1, 0.4]], prop: 'notebook' });
    }
  });
})();

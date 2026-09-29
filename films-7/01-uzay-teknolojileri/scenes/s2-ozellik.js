// SAHNE 2 — Uzay kavramı ve uzay teknolojilerinin özellikleri (FB.7.1.1 a · OB1, OB4, OB7)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = U7;
  const CARDS = [
    { n: 'Roket', f: 'araçları uzaya fırlatır', d: (c, x, y, t) => F.rocket(c, x, y + 70, 0.5, t, { flame: 0.5 }) },
    { n: 'Yapay uydu', f: 'Dünya’nın çevresinde dolanır', d: (c, x, y, t) => F.satellite(c, x, y + 10, 0.72, t) },
    { n: 'Uzay sondası', f: 'insansız; uzak gök cisimlerine gider', d: (c, x, y, t) => P.icon.probe(c, x, y, 0.9, t) },
    { n: 'Uzay istasyonu', f: 'astronotlar yaşar, deney yapar', d: (c, x, y, t) => F.station(c, x, y, 0.5, t) },
    { n: 'Uzay mekiği', f: 'insan ve yük taşırdı', d: (c, x, y, t) => F.shuttle(c, x, y, 0.8) },
    { n: 'Gezici araç', f: 'Ay’ı ve Mars’ı yerinde inceler', d: (c, x, y, t) => F.rover(c, x, y + 50, 0.62, t) }
  ];
  const POS = [[360, 330], [960, 330], [1560, 330], [360, 690], [960, 690], [1560, 690]];
  F.techCards = (ctx, t, times, o = {}) => {
    CARDS.forEach((cd, i) => {
      const k = E.se(t, times[i], times[i] + 0.6, 'out'); if (k <= 0) return;
      const [x, y] = POS[i];
      ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
      F.card(ctx, -270, -165, 540, 330, { seed: 30 + i });
      ctx.save(); ctx.beginPath(); ctx.rect(-265, -160, 530, 220); ctx.clip(); cd.d(ctx, 0, -50, t); ctx.restore();
      INK.label(ctx, cd.n, 0, 100, { size: 42, weight: 700, align: 'center' });
      const fs = F.fitFont(ctx, cd.f, 500, 32, 400);
      INK.label(ctx, cd.f, 0, 145, { size: fs, align: 'center', alpha: 0.8, color: F.AMBER_D });
      ctx.restore();
    });
  };
  E.scene({
    name: 'Özellikler', concept: 'Uzay ve uzay teknolojileri', from: 'space', to: 'cards2', trFrom: [960, 300],
    draw(ctx, t) {
      const sp = E.s('space'), c1 = E.s('cards1'), c2 = E.s('cards2');
      // --- uzay kavramı ---
      const dk = 1 - E.se(t, c1 - 0.2, c1 + 0.5);
      if (dk > 0) E.layer(ctx, dk, c => {
        F.night(c, 1);
        F.stars(c, t, 1, { n: 90, seed: 72, area: [0, 0, E.W, 700] });
        F.galaxy(c, 1500, 260, 150, t, { seed: 3, n: 300 });
        P.moon(c, 420, 330, 46);
        // Dünya ve atmosfer
        const ak = E.se(t, sp + 0.5, sp + 1.5);
        const atm = circlePts(960, 1900, 1210, 1210, 160);
        c.save(); c.globalAlpha = 0.55 * ak; c.fillStyle = '#9CC3D8'; c.beginPath(); c.arc(960, 1900, 1210, 0, 7); c.fill(); c.restore();
        P.fillPts(c, circlePts(960, 1900, 1150, 1150, 200), PAL.water, 0.9); INK.wash(c, circlePts(960, 1900, 1150, 1150, 200), PAL.life, 0.25, 77, { bleed: 3, blooms: 2 }); stroke(c, P.arc(960, 1900, 1150, Math.PI * 1.1, Math.PI * 1.9, 120), { w: 4, seed: 78 });
        c.save(); c.globalAlpha = ak; INK.dashed(c, P.arc(960, 1900, 1210, Math.PI * 1.2, Math.PI * 1.8, 200), { w: 2, color: '#FBF3DC', on: 10, off: 8 }); c.restore();
        INK.label(c, 'atmosfer', 1420, 770, { size: 40, weight: 700, color: '#FBF3DC', alpha: ak });
        INK.label(c, 'Dünya', 960, 850, { size: 44, weight: 700, color: '#FBF3DC', align: 'center', alpha: ak });
        const uk = E.se(t, sp + 1.8, sp + 2.8);
        INK.label(c, 'UZAY', 960, 330, { size: 110, weight: 700, color: '#FBF3DC', align: 'center', alpha: uk, font: 'Fraunces' });
        INK.label(c, 'gezegenler · yıldızlar · galaksiler …', 960, 410, { size: 40, color: '#FBF3DC', align: 'center', alpha: E.se(t, sp + 3, sp + 4) });
        c.save(); c.globalAlpha = uk; P.arrow(c, [960, 640], [960, 460], uk, { w: 3, color: '#FBF3DC', head: 14 }); c.restore();
      });
      // --- teknoloji kartları ---
      if (t > c1 - 0.2) {
        P.write(ctx, 'Uzay teknolojileri ve özellikleri', 1850, 120, E.seg(t, c1, c1 + 1.2), { size: 50, align: 'right', color: PAL.ink });
        F.techCards(ctx, t, [c1 + 0.2, c1 + 3.0, c1 + 6.0, c2 + 0.1, c2 + 3.2, c2 + 6.6]);
        INK.label(ctx, 'kaynak: güvenilir kitaplar, ajans ve üniversite siteleri', 1880, 895, { size: 28, align: 'right', alpha: 0.6 * E.se(t, c1 + 1, c1 + 2) });
      }
    }
  });
})();

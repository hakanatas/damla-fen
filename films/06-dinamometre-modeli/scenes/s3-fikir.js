// SAHNE 3 — Fikir üretme, malzeme seçimi (esneklik!), güvenlik (TYMM: malzemelerin esnekliği ve kalınlığı; keskin araç güvenliği)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const BR = '#8A4A10', RED = '#A23A2A', DY = 760;
  const items = {
    band(ctx, x, t, u) { const rx = 50 + 70 * u; stroke(ctx, circlePts(x, DY - 26, rx, 16 - 6 * u, 40), { w: 5, closed: true, color: '#B5553F', seed: 3301 }); },
    karton(ctx, x) { const r = [[x - 70, DY - 150], [x + 70, DY - 154], [x + 72, DY], [x - 68, DY], [x - 70, DY - 150]]; P.fillPts(ctx, r, '#E3CFA6'); wash(ctx, r, '#8A6A45', 0.3, 3302, { bleed: 1 }); stroke(ctx, r, { w: 2.6, closed: true, seed: 3303 }); },
    bardak(ctx, x) { const c = [[x - 48, DY - 110], [x + 48, DY - 110], [x + 36, DY], [x - 36, DY], [x - 48, DY - 110]]; P.fillPts(ctx, c, PAL.white, 0.8); wash(ctx, c, PAL.water, 0.1, 3304, { bleed: 1, blooms: 0 }); stroke(ctx, c, { w: 2.6, closed: true, seed: 3305 }); },
    atas(ctx, x) { const p = P.arc(x - 10, DY - 20, 12, Math.PI / 2, Math.PI * 1.5, 10).concat(P.arc(x + 30, DY - 26, 18, -Math.PI / 2, Math.PI / 2, 12)).concat(P.arc(x - 6, DY - 26, 8, Math.PI / 2, Math.PI * 1.5, 10)).concat([[x + 26, DY - 32]]); stroke(ctx, p, { w: 3, dry: false, color: '#555' }); },
    cetvel(ctx, x) { const r = F06.rect(x - 110, DY - 40, x + 110, DY); P.fillPts(ctx, r, PAL.light, 0.5); stroke(ctx, r, { w: 2.4, closed: true }); for (let i = 0; i <= 20; i++) line(ctx, [x - 100 + i * 10, DY - 40], [x - 100 + i * 10, DY - 40 + (i % 5 ? 10 : 18)], { w: 1.2, dry: false }); },
    makas(ctx, x) { stroke(ctx, circlePts(x - 40, DY - 30, 20, 14, 20), { w: 4, closed: true, color: RED }); stroke(ctx, circlePts(x - 40, DY - 64, 20, 14, 20), { w: 4, closed: true, color: RED }); line(ctx, [x - 20, DY - 36], [x + 70, DY - 60], { w: 5, taper: 0.3 }); line(ctx, [x - 20, DY - 58], [x + 70, DY - 38], { w: 5, taper: 0.3 }); INK.inkDot(ctx, x + 6, DY - 47, 4); }
  };
  const LIST = [['band', 'lastik bant', 330, 0.2], ['karton', 'karton', 560, 1.4], ['bardak', 'plastik bardak', 780, 2.4], ['atas', 'ataş', 990, 3.3], ['cetvel', 'cetvel', 1210, 4.2], ['makas', 'makas', 1450, 5.2]];
  E.scene({
    name: 'Fikir ve malzeme', concept: 'Esnek malzeme seçimi ve güvenlik', from: 'ideas', to: 'safety', trFrom: [960, 700],
    draw(ctx, t) {
      const si = E.s('ideas'), sm = E.s('materials'), ss = E.s('safety');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, DY); ctx.restore();
      F06.floor(ctx, DY, 2);
      // idea bubble
      const bo = 1 - E.se(t, sm - 0.2, sm + 0.5);
      if (bo > 0) E.layer(ctx, bo, c => {
        const k = E.se(t, si + 0.4, si + 1.0, 'out');
        P.bubble(c, 1150, 330, 700, 300, [1640, 480], k, 5);
        if (k > 0.7) {
          F06.spring(c, 950, 230, 400, { coils: 9, r: 26, w: 3 });
          P.write(c, 'esnek yay → uzar,', 1030, 300, E.seg(t, si + 1.0, si + 2.2), { size: 44 });
          P.write(c, 'eski hâline döner', 1030, 360, E.seg(t, si + 1.8, si + 3.0), { size: 44 });
          P.write(c, 'Evde ne esnek?', 1030, 430, E.seg(t, si + 3.2, si + 4.2), { size: 44, color: BR });
        }
      });
      // materials on the desk
      LIST.forEach(([id, lab, x, at], i) => {
        const k = E.se(t, sm + at, sm + at + 0.5, 'out'); if (k <= 0) return;
        const u = id === 'band' ? E.se(t, sm + 5.6, sm + 6.6) * (1 - E.se(t, sm + 7.6, sm + 8.2)) : 0;
        ctx.save(); ctx.translate(x, DY); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -DY); items[id](ctx, x, t, u); ctx.restore();
        P.write(ctx, lab, x, DY + 60, E.seg(t, sm + at + 0.2, sm + at + 1.0), { size: 36, align: 'center' });
        if (id === 'band' && u > 0.05) {
          P.arrow(ctx, [x - 60, DY - 26], [x - 60 - 70 * u - 50, DY - 26], 1, { w: 3, head: 12, color: BR });
          P.arrow(ctx, [x + 60, DY - 26], [x + 60 + 70 * u + 50, DY - 26], 1, { w: 3, head: 12, color: BR });
          INK.label(ctx, 'esner!', x, DY - 90, { size: 44, weight: 700, align: 'center', color: BR, alpha: u });
        }
      });
      // safety card
      const sk = E.se(t, ss + 0.2, ss + 0.9, 'out');
      if (sk > 0) {
        ctx.save(); ctx.translate(0, (1 - sk) * -700);
        F06.card(ctx, 560, 130, 1480, 580, { color: RED, seed: 3320 });
        line(ctx, [570, 206], [1470, 200], { w: 3, color: RED, dry: false });
        F06.txt(ctx, '⚠  GÜVENLİK', 1020, 184, { size: 46, align: 'center', color: RED });
        ctx.save(); ctx.translate(700, 380); ctx.scale(1.6, 1.6); ctx.translate(-700, -DY + 20); items.makas(ctx, 700); ctx.restore();
        P.write(ctx, 'Makası dikkatli kullan.', 860, 350, E.seg(t, ss + 1.0, ss + 2.2), { size: 48 });
        P.write(ctx, 'Bir yetişkin eşliğinde!', 860, 430, E.seg(t, ss + 2.2, ss + 3.4), { size: 48, color: RED });
        P.write(ctx, 'Keskin ucu kendine ve arkadaşına tutma.', 860, 505, E.seg(t, ss + 3.4, ss + 4.6), { size: 32, weight: 400 });
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 1700, y: DY, s: 1.1, view: 'q3', flip: true, expr: t < sm ? 'thinking' : (t < ss ? 'curious' : 'determined'), look: t < sm ? [-0.5, -0.8] : [-0.8, 0.2], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 3,
        arms: t < sm ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.4], [1, t < ss ? 2.1 : 0.4]] });
      F06.badge(ctx, t, 1, 1 - E.se(t, ss, ss + 0.5) + E.se(t, ss + 5, ss + 5.6));
    }
  });
})();

// SAHNE 1 — Merak: üç komşu (Güneş, Dünya, Ay); hareketleri ve büyüklükleri ne? (açık uçlu sorular)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  // alacakaranlık manzarası: batıda Güneş, doğuda Ay (s1 ve s8 kullanır)
  F04.twilight = (ctx, t, o = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,70,110,0.32)'); g.addColorStop(0.7, 'rgba(227,150,70,0.22)'); g.addColorStop(1, 'rgba(227,150,70,0.1)');
    ctx.fillStyle = g; ctx.fillRect(-300, -300, E.W + 600, E.H + 600);
    P.sun(ctx, 190, 760, 95, t, { cells: false, nrays: 18 });
    const mg = ctx.createRadialGradient(1600, 360, 40, 1600, 360, 220); mg.addColorStop(0, 'rgba(251,248,241,0.5)'); mg.addColorStop(1, 'rgba(251,248,241,0)'); ctx.fillStyle = mg; ctx.fillRect(1360, 120, 480, 480);
    P.moon(ctx, 1600, 360, 70);
    const hill = P.hillLine(E.W);
    return P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1750, P.hillY(hill, 1750) + 6] });
  };
  E.scene({
    name: 'Merak', concept: 'Güneş, Dünya ve Ay: hareket ve büyüklük soruları', from: 'title', to: 'size-q',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('size-q');
      ctx.save();
      E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('size-q'), 'sine') });
      const hill = F04.twilight(ctx, t);
      const dx = 900, dy = P.hillY(hill, dx) + 4;
      const lk = t < sh + 2 ? [0, 0.1] : t < sh + 4 ? [-0.8, 0.2] : t < sh + 6 ? [0.8, -0.5] : [0, 0.6];
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'front', expr: t > sq ? 'thinking' : 'curious', look: lk, blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: t > sq ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.35], [1, 0.35 + 1.9 * E.se(t, sh + 0.4, sh + 1.2)]] });
      ctx.restore();
      const L = [['Güneş', 190, 620, sh + 1.8], ['Ay', 1600, 480, sh + 3.6], ['Dünya (üzerindeyiz)', 1300, 880, sh + 5.2]];
      L.forEach(([s, x, y, at]) => { if (t > at && t < sq + 0.5) E.inkText(ctx, s, x, y, t, at, sq + 0.5, { size: 46, align: 'center' }); });
      // büyüklük sorusu: üç soru işaretli top
      const kb = E.se(t, sq + 0.6, sq + 1.2, 'out');
      if (kb > 0) {
        P.bubble(ctx, 1300, 560, 620, 260, [1020, 640], kb, 4);
        if (kb > 0.6) [[P.sun, 1120, 60], [P.earth, 1300, 44], [P.moon, 1460, 30]].forEach(([fn, x, r], i) => {
          const k = E.se(t, sq + 1.2 + i * 0.5, sq + 1.7 + i * 0.5, 'out'); if (k <= 0) return;
          ctx.save(); ctx.globalAlpha = k; if (fn === P.sun) P.sun(ctx, x, 560, r, t, { nrays: 12, glow: false, cells: false }); else fn(ctx, x, 560, r); ctx.restore();
          INK.label(ctx, '?', x + r * 0.9, 560 - r * 0.8, { size: 44, weight: 700, alpha: k });
        });
      }
      F04.title(ctx, t, E.e('title') + 1.4, 4, 'Güneş, Dünya ve Ay');
    }
  });
})();

// SAHNE 8 — Sıra sende (analojili poster) · Sıradaki: İç Salgı Bezleri · Bitiş
(function () {
  const { PAL, stroke } = INK; const K = KIT;
  function vessel(c, t) { // kan damarında taşınan kimyasal haberciler (kehribar noktalar)
    const sn = E.s('next'), k = E.se(t, sn + 1.2, sn + 2.2); if (k <= 0) return;
    c.save(); c.globalAlpha = k;
    const top = [], bot = []; for (let i = 0; i <= 40; i++) { const x = 560 + i * 20, y = 600 + Math.sin(i * 0.3) * 30; top.push([x, y - 34]); bot.push([x, y + 34]); }
    P.fillPts(c, top.concat(bot.slice().reverse()), '#F2D4CC'); stroke(c, top, { w: 3 }); stroke(c, bot, { w: 3 });
    for (let j = 0; j < 7; j++) { const u = ((t * 0.12 + j / 7) % 1), i = u * 40, x = 560 + i * 20, y = 600 + Math.sin(i * 0.3) * 30; INK.inkDot(c, x, y, 9, { color: '192,127,30' }); }
    c.restore();
  }
  E.scene({
    name: 'Sıra sende', concept: 'Analojili poster görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Sinir sistemini benzetmelerle anlatan', 'bir poster tasarla. Grubunla', 'sınıfta sun.'],
        taskNote: 'İpucu: Her yapı için bir görev ve bir benzetme yaz.',
        nextTitle: '10 · Kimyasal Haberciler: İç Salgı Bezleri', icon: vessel
      });
      K.end(ctx, t, 9, 'Vücudumuzun Haberleşme Ağı: Sinir Sistemi', 'FB.6.3.6');
    }
  });
})();

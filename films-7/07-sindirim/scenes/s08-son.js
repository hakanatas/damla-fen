// SAHNE 8 — Sıra sende (yeniden kullanılabilir malzemelerle poster) · Sıradaki: Dolaşım Sistemi · Bitiş
(function () {
  const { PAL, stroke, wash, circlePts } = INK; const K = KIT;
  function heart(c, t) { const sn = E.s('next'), k = E.se(t, sn + 1.0, sn + 2.0); if (k <= 0) return;
    const beat = 1 + 0.06 * Math.max(0, Math.sin(t * 7)); c.save(); c.globalAlpha = k; c.translate(960, 600); c.scale(beat * 1.3, beat * 1.3);
    const h = F07.cr([[0, -40], [30, -80], [80, -60], [84, 0], [40, 60], [0, 96], [-40, 60], [-84, 0], [-80, -60], [-30, -80], [0, -40]], 8);
    P.fillPts(c, h, '#F2D4CC'); wash(c, h, '#C4503C', 0.5, 7700, { bleed: 1, blooms: 0 }); stroke(c, h, { w: 3, closed: true, dry: false }); c.restore();
    c.save(); c.globalAlpha = k; stroke(c, [[640, 600], [780, 600]], { w: 10, color: '#C4503C', dry: false }); stroke(c, [[1140, 600], [1280, 600]], { w: 10, color: '#5B5FA8', dry: false }); c.restore(); }
  E.scene({
    name: 'Sıra sende', concept: 'Poster görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Kumaş, kâğıt gibi yeniden kullanılabilir', 'malzemelerle bir sindirim sistemi', 'posteri hazırla. Görevleri de yaz.'],
        taskNote: 'Ayrıca: sindirim sağlığı için bir afiş tasarla.',
        nextTitle: '8 · Vücudumuzun Taşıma Ağı: Dolaşım Sistemi', icon: heart
      });
      K.end(ctx, t, 7, 'Besinlerin Yolculuğu: Sindirim Sistemi', 'FB.7.3.1 · FB.7.3.2');
    }
  });
})();

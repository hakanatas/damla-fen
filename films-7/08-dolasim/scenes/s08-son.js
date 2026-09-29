// SAHNE 8 — Sıra sende (rol oyunu) · Sıradaki: Kan Bağışı ve Dolaşım Sağlığı · Bitiş
(function () {
  const { PAL, stroke, wash } = INK; const K = KIT, F = F08;
  function drop(c, t) { const sn = E.s('next'), k = E.se(t, sn + 1.0, sn + 2.0); if (k <= 0) return;
    c.save(); c.globalAlpha = k; const d = F.closed([[960, 440], [1010, 540], [1030, 610], [1000, 680], [960, 700], [920, 680], [890, 610], [910, 540]], 6);
    P.fillPts(c, d, '#F0CFC6'); wash(c, d, F.OXY, 0.7, 8800, { bleed: 1, blooms: 0 }); stroke(c, d, { w: 3, closed: true, dry: false });
    c.restore(); }
  E.scene({
    name: 'Sıra sende', concept: 'Rol oyunu görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Arkadaşlarınla rol oyunu yapın:', 'kalp, damarlar ve kan hücreleri olun,', 'kanın yolculuğunu canlandırın.'],
        taskNote: 'İpucu: Küçük ve büyük kan dolaşımını ayrı ayrı oynayın.',
        nextTitle: '9 · Kan Bağışı ve Dolaşım Sağlığı', icon: drop
      });
      K.end(ctx, t, 8, 'Vücudumuzun Taşıma Ağı: Dolaşım Sistemi', 'FB.7.3.3');
    }
  });
})();

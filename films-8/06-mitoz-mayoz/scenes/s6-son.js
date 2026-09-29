// SAHNE 6 — Sıra sende (karşılaştırma posteri, grup çalışması) · Sıradaki: Kalıtım · Bitiş
(function () {
  const K = KIT, F = G8;
  function peas(c, t) { const sn = E.s('next'), k = E.se(t, sn + 1.0, sn + 2.0); if (k <= 0) return; c.save(); c.globalAlpha *= k; F.pod(c, 960, 620, 360, ['Y', 'Y', 'G', 'Y']); c.restore(); }
  E.scene({
    name: 'Sıra sende', concept: 'Poster görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Grubunla bir mitoz–mayoz', 'karşılaştırma posteri hazırla.', 'Benzerlik ve farklılıkları tabloya yaz.'],
        taskNote: 'Sunarken arkadaşlarının fikirlerini nezaketle dinle.',
        nextTitle: '7 · Aslı Ne İse Nesli Odur: Kalıtım', icon: peas
      });
      K.end(ctx, t, 6, 'Hücreler Bölünüyor: Mitoz ve Mayoz', 'FB.8.3.3');
    }
  });
})();

// SAHNE 7 — Sıra sende (afiş) · Sıradaki: Solunum Sistemi · Bitiş
(function () {
  const { PAL } = INK; const K = KIT, F = F09;
  function lungs(c, t) { const sn = E.s('next'), k = E.se(t, sn + 1.0, sn + 2.0); if (k <= 0) return; const br = 1 + 0.05 * Math.sin(t * 2);
    c.save(); c.globalAlpha = k; c.translate(960, 600); c.scale(br, br); c.translate(-960, -600);
    INK.stroke(c, [[960, 440], [960, 520]], { w: 10, color: '#8A5A62', dry: false }); INK.stroke(c, F.cr([[960, 520], [920, 545], [890, 560]], 6), { w: 7, color: '#8A5A62', dry: false }); INK.stroke(c, F.cr([[960, 520], [1000, 545], [1030, 560]], 6), { w: 7, color: '#8A5A62', dry: false });
    F.lung(c, 860, 620, 1.25, -1); F.lung(c, 1060, 620, 1.25, 1); c.restore(); }
  E.scene({
    name: 'Sıra sende', concept: 'Afiş görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Dolaşım sisteminin sağlığı ya da', 'kan bağışı için bir afiş tasarla.', 'Sınıfta arkadaşlarına sun.'],
        taskNote: 'İpucu: Bilgini güvenilir kaynaklarla doğrula, kaynağını yaz.',
        nextTitle: '10 · Solunum Sistemi', icon: lungs
      });
      K.end(ctx, t, 9, 'Kan Bağışı ve Dolaşım Sağlığı', 'FB.7.3.4 · FB.7.3.5');
    }
  });
})();

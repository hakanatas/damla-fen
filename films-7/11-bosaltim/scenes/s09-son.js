// SAHNE 9 — Sıra sende · Sıradaki: Işığın Kırılması · Bitiş
(function () {
  const { PAL, stroke, wash, line } = INK; const K = KIT;
  function refraction(c, t) { const sn = E.s('next'), k = E.se(t, sn + 1.2, sn + 2.2); if (k <= 0) return;
    c.save(); c.globalAlpha *= k;
    const w = [[640, 560], [1280, 560], [1280, 760], [640, 760]]; P.fillPts(c, w, '#DCEAF0'); wash(c, w, PAL.water, 0.35, 11901, { bleed: 1.5, blooms: 0 }); stroke(c, [[620, 560], [1300, 560]], { w: 3, seed: 11902 });
    INK.dashed(c, Array.from({ length: 80 }, (_, i) => [960, 420 + i * 4]), { w: 1.6, alpha: 0.5 });
    const kr = E.se(t, sn + 2, sn + 3.2); P.drawOn(c, [[760, 400], [960, 560]], Math.min(1, kr * 2), { w: 5, color: PAL.light });
    if (kr > 0.5) P.drawOn(c, [[960, 560], [1060, 740]], (kr - 0.5) * 2, { w: 5, color: PAL.light });
    c.restore(); }
  E.scene({
    name: 'Sıra sende', concept: 'Model ya da sağlık posteri görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, { task: ['Atık malzemelerle boşaltım', 'sistemini tanıtan bir model ya', 'da sağlık posteri hazırla.'],
        taskNote: 'İpucu: Bilgilerini güvenilir kaynaklarla doğrula.', nextTitle: '12 · Işığın Kırılması', icon: refraction });
      K.end(ctx, t, 11, 'Vücudumuzun Temizlik Ekibi: Boşaltım Sistemi', 'FB.7.3.8 · FB.7.3.9');
    }
  });
})();

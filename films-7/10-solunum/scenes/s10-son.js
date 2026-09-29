// SAHNE 10 — Sıra sende (maket / farkındalık posteri) · Sıradaki: Boşaltım Sistemi · Bitiş
(function () {
  const { PAL, stroke, wash, circlePts } = INK; const K = KIT;
  function kidneys(c, t) { const sn = E.s('next'), k = E.se(t, sn + 1.2, sn + 2.2); if (k <= 0) return;
    c.save(); c.globalAlpha *= k;
    [-1, 1].forEach(sd => { const pts = []; for (let i = 0; i <= 50; i++) { const a = i / 50 * Math.PI * 2; const r = 1 - 0.28 * Math.max(0, Math.cos(a - (sd > 0 ? Math.PI : 0))) ** 3; pts.push([960 + sd * 150 + Math.cos(a) * 70 * r, 560 + Math.sin(a) * 110 * r]); }
      P.fillPts(c, pts, '#D9A08E'); wash(c, pts, '#A8604E', 0.4, 11001 + sd, { bleed: 1, blooms: 0 }); stroke(c, pts, { w: 3, closed: true, seed: 11003 + sd }); });
    const d = []; for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2; d.push([960 + Math.cos(a) * 34 * (1 - 0.5 * Math.max(0, -Math.sin(a)) ** 2), 600 + Math.sin(a) * 40 - (Math.sin(a) < 0 ? 30 * (-Math.sin(a)) ** 4 : 0)]); }
    P.fillPts(c, d, '#DCEAF0'); wash(c, d, PAL.water, 0.5, 11005, { bleed: 1, blooms: 0 }); stroke(c, d, { w: 2.6, closed: true, dry: false }); c.restore(); }
  E.scene({
    name: 'Sıra sende', concept: 'Maket ve farkındalık görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, { task: ['Atık malzemelerle bir solunum', 'sistemi maketi yap ya da bir', 'farkındalık posteri hazırla.'],
        taskNote: 'İpucu: Bilgilerini güvenilir kaynaklardan doğrula.', nextTitle: '11 · Vücudumuzun Temizlik Ekibi: Boşaltım Sistemi', icon: kidneys });
      K.end(ctx, t, 10, 'Her Nefeste Bir Yolculuk: Solunum Sistemi', 'FB.7.3.6 · FB.7.3.7');
    }
  });
})();

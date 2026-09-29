// SAHNE 8 — Sıra sende (bezelye tohum şekli problemi) · Sıradaki: Akraba evliliği ve mutasyon · Bitiş
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT, F = G8;
  function tree(c, t) { // soy ağacı simgesi (kare: erkek, daire: kadın)
    const sn = E.s('next'), k = E.se(t, sn + 1.0, sn + 2.0); if (k <= 0) return;
    c.save(); c.globalAlpha *= k;
    const sq = (x, y) => { const p = [[x - 30, y - 30], [x + 30, y - 30], [x + 30, y + 30], [x - 30, y + 30], [x - 30, y - 30]]; P.fillPts(c, p, '#FBF8F1'); INK.wash(c, p, PAL.water, 0.3, 3800 + x, { bleed: 0.5, blooms: 0 }); stroke(c, p, { w: 2.6, closed: true, dry: false }); };
    const ci = (x, y) => { const p = circlePts(x, y, 32, 32, 30); P.fillPts(c, p, '#FBF8F1'); INK.wash(c, p, PAL.light, 0.35, 3810 + x, { bleed: 0.5, blooms: 0 }); stroke(c, p, { w: 2.6, closed: true, dry: false }); };
    line(c, [880, 520], [1040, 520], { w: 2.6 }); line(c, [960, 520], [960, 600], { w: 2.6 }); line(c, [860, 600], [1060, 600], { w: 2.6 });
    line(c, [860, 600], [860, 650], { w: 2.6 }); line(c, [1060, 600], [1060, 650], { w: 2.6 });
    sq(850, 520); ci(1070, 520); sq(860, 680); ci(1060, 680);
    c.restore();
  }
  E.scene({
    name: 'Sıra sende', concept: 'Problem görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Düzgün tohum (D), buruşuk tohuma (d)', 'baskındır. Dd × dd çaprazlamasını', 'tabloyla çöz. Genotip ve fenotip oranı?'],
        taskNote: 'İpucu: Önce her atanın üreme hücrelerini yaz.',
        nextTitle: '8 · Akraba Evliliği ve Mutasyon', icon: tree
      });
      K.end(ctx, t, 7, 'Aslı Ne İse Nesli Odur: Kalıtım', 'FB.8.3.4 · FB.8.3.5');
    }
  });
})();

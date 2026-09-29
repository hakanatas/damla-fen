// SAHNE 7 — Sıra sende (rapor görevi) · Sıradaki: Işığın Yansıması · Bitiş
(function () {
  const { PAL, stroke, line } = INK; const K = KIT;
  function mirror(c, t) {
    const sn = E.s('next'), k = E.se(t, sn + 1.2, sn + 2.2); if (k <= 0) return;
    c.save(); c.globalAlpha = k;
    const m = [[700, 700], [1220, 700], [1220, 720], [700, 720]]; P.fillPts(c, m, '#CFE0EA'); stroke(c, m.concat([m[0]]), { w: 3, closed: true }); INK.hatch(c, 700, 735, 520, 20, { n: 14, ang: -0.9 });
    const u = E.se(t, sn + 2.0, sn + 3.5);
    P.drawOn(c, [[760, 480], [960, 700]], Math.min(1, u * 2), { w: 5, color: PAL.light }); if (u > 0.5) P.drawOn(c, [[960, 700], [1160, 480]], (u - 0.5) * 2, { w: 5, color: PAL.light });
    INK.dashed(c, [[960, 700], [960, 470]], { w: 2 });
    c.restore();
  }
  E.scene({
    name: 'Sıra sende', concept: 'Rapor görevi; sıradaki konu', from: 'task', to: 'end', trFrom: [960, 450],
    draw(ctx, t) {
      K.outro(ctx, t, {
        task: ['Denetleyici ve düzenleyici sistemlerin', 'sağlığı için neler yapılabilir? Araştır,', 'doğrula ve kısa bir rapor hazırla.'],
        taskNote: 'Kaynaklarını ve bilgiyi nasıl doğruladığını da yaz.',
        nextTitle: '11 · Işığın Yansıması', icon: mirror
      });
      K.end(ctx, t, 10, 'Kimyasal Haberciler: İç Salgı Bezleri', 'FB.6.3.7 · FB.6.3.9');
    }
  });
})();

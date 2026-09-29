// SAHNE 6 — Gözlem verilerini kaydet: yapı ve görev tablosu (FB.7.3.6 b, c)
(function () {
  const { PAL } = INK; const K = KIT;
  const ROWS = [['burun', 'havayı süzer, ısıtır, nemlendirir'], ['yutak', 'hava ve besinin ortak yolu'], ['gırtlak', 'ses telleri; yutkunurken kapanır'], ['soluk borusu', 'havayı iletir; halkalar açık tutar'],
    ['bronş, bronşçuk', 'havayı akciğerlere dağıtır'], ['alveol', 'gaz değişimi: oksijen ve karbondioksit'], ['diyafram', 'soluk alıp vermeye yardım eder']];
  E.scene({
    name: 'Kaydet', concept: 'Yapı ve görevleri defter tablosuna kaydetme', from: 'record', to: 'record', trFrom: [800, 500],
    draw(ctx, t) {
      const sr = E.s('record'), dur = E.e('record') - sr;
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 165, 1400, 740);
      P.write(ctx, 'Yapı', 250, 245, E.seg(t, sr + 0.1, sr + 0.5), { size: 44, color: '#1F4A63' });
      P.write(ctx, 'Görevi', 640, 245, E.seg(t, sr + 0.3, sr + 0.7), { size: 44, color: '#1F4A63' });
      if (t > sr + 0.5) P.drawOn(ctx, P.bez([240, 268], [800, 276], [1500, 266], 30), E.se(t, sr + 0.5, sr + 1), { w: 3, color: PAL.light });
      ROWS.forEach((r, i) => { const y = 330 + i * 82, at = sr + 0.8 + i * (dur - 2) / ROWS.length;
        P.write(ctx, r[0], 250, y, E.seg(t, at, at + 0.4), { size: 38, color: PAL.ink }); P.write(ctx, r[1], 640, y, E.seg(t, at + 0.2, at + 0.8), { size: 38 }); });
      const cheer = t > sr + dur - 1.2;
      K.damla(ctx, t, { x: 1730, y: 900, s: 1.1, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

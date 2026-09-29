// SAHNE 7 — Kaydet: modelden toplanan veriler (FB.8.3.2 b, c) ve hiyerarşi (FB.8.3.1)
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = G8;
  const ITEMS = [
    'Kromozomda DNA, DNA’da genler bulunur.',
    'Genler nükleotidlerden oluşur.',
    'Nükleotid = fosfat + şeker + organik baz',
    'Bazlar: adenin, timin, guanin, sitozin',
    'Eşleşme her zaman: A – T ve G – C',
    'Çift zincir, çift sarmal; aralarında bağlar var.',
    'Bölünmeden önce DNA kendini eşler.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 60, 1620, 840);
      P.write(ctx, 'Gözlem Defteri · DNA', 290, 165, E.seg(t, sr + 0.2, sr + 1.3), { size: 64 });
      if (t > sr + 1.3) P.drawOn(ctx, P.bez([286, 186], [600, 198], [900, 182], 30), E.se(t, sr + 1.3, sr + 1.8), { w: 3, color: PAL.life });
      ITEMS.forEach((txt, i) => {
        const at = sr + 1.6 + i * 1.3, y = 270 + i * 88;
        P.check(ctx, 300, y - 20, 40, E.se(t, at + 0.9, at + 1.3), { w: 5, color: K.LIFE_D });
        P.write(ctx, txt, 350, y, E.seg(t, at, at + 1.1), { size: 46 });
      });
      // küçük model çizimi
      const mk = E.se(t, sr + 1.5, sr + 2.5);
      if (mk > 0) E.layer(ctx, mk, c => F.dna(c, { x: 1490, y: 250, n: 9, gap: 44, u: 54, h: 11, seq: 'ATGCCGTAG', twist: 0.85, phase: 0.4 + (t - sr) * 0.5, letters: false }));
      K.damla(ctx, t, { x: 1640, y: 890, s: 0.9, flip: true, expr: 'happy', look: [-0.6, -0.3], talk: E.talk(t), prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();

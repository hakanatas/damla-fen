// SAHNE 9 — Doğrulanmış bilgileri kaydet; yanlış alışkanlığı doğrusuyla değiştir (FB.7.3.7 ç)
(function () {
  const { PAL } = INK; const K = KIT;
  const ROWS = [[1, 'düzenli spor ve dengeli beslenme'], [1, 'odaları sık sık havalandırmak'], [0, 'sigara ve dumanlı ortam'], [1, 'destek: Yeşilay, ALO 191']];
  E.scene({
    name: 'Kaydet 2', concept: 'Sağlık bilgilerini kaydetme', from: 'record2', to: 'record2', trFrom: [800, 500],
    draw(ctx, t) {
      const sr = E.s('record2');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 200, 180, 1260, 700);
      P.write(ctx, 'Solunum sistemimin sağlığı', 300, 280, E.seg(t, sr + 0.1, sr + 0.9), { size: 54, color: K.LIFE_D });
      ROWS.forEach(([ok, l], i) => { const a = sr + 0.9 + i * 1.2, y = 400 + i * 110;
        if (ok) P.check(ctx, 320, y - 14, 44, E.se(t, a, a + 0.4), { w: 6, color: K.LIFE_D }); else P.cross(ctx, 320, y - 14, 22, E.se(t, a, a + 0.4), { color: K.RED, w: 6 });
        P.write(ctx, l, 380, y, E.seg(t, a + 0.1, a + 1), { size: 46, color: ok ? PAL.ink : K.RED }); });
      K.damla(ctx, t, { x: 1680, y: 900, s: 1.15, flip: true, expr: t > sr + 5 ? 'happy' : 'neutral', look: [-0.7, 0.3], prop: t > sr + 5 ? null : 'notebook', arms: t > sr + 5 ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
    }
  });
})();

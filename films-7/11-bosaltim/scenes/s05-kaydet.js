// SAHNE 5 — Gözlem verilerini kaydet: yapı ve özellik tablosu (FB.7.3.8 b, c)
(function () {
  const { PAL } = INK; const K = KIT, F = F11;
  const ROWS = [['böbrekler', 'kanı süzer; su ve tuz dengesini korur'], ['üreter', 'idrarı idrar kesesine taşır'], ['idrar kesesi', 'idrarı biriktirir'], ['üretra', 'idrarı vücut dışına atar'],
    ['karaciğer', 'amonyağı üreye çevirir'], ['deri', 'ter: su, tuz, bir miktar üre'], ['akciğerler', 'karbondioksit, su buharı'], ['kalın bağırsak', 'sindirilemeyen artıklar']];
  E.scene({
    name: 'Kaydet', concept: 'Yapı ve özellikleri tabloya kaydetme', from: 'record', to: 'record', trFrom: [800, 500],
    draw(ctx, t) {
      const sr = E.s('record'), dur = E.e('record') - sr;
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 160, 1400, 750);
      P.write(ctx, 'Yapı / organ', 250, 235, E.seg(t, sr + 0.1, sr + 0.5), { size: 42, color: F.KID_D });
      P.write(ctx, 'Özelliği', 640, 235, E.seg(t, sr + 0.3, sr + 0.7), { size: 42, color: F.KID_D });
      if (t > sr + 0.5) P.drawOn(ctx, P.bez([240, 258], [800, 266], [1500, 256], 30), E.se(t, sr + 0.5, sr + 1), { w: 3, color: PAL.light });
      ROWS.forEach((r, i) => { const y = 318 + i * 72, at = sr + 0.8 + i * (dur - 2.2) / ROWS.length;
        if (i === 4) INK.dashed(ctx, [[240, y - 50], [1500, y - 50]].reduce((a, p, j, arr) => j ? a.concat(Array.from({ length: 316 }, (_, q) => [240 + q * 4, y - 50])) : a, []), { w: 1.6, color: '#8A6A45' });
        P.write(ctx, r[0], 250, y, E.seg(t, at, at + 0.4), { size: 36, color: i < 4 ? PAL.ink : K.LIFE_D }); P.write(ctx, r[1], 640, y, E.seg(t, at + 0.2, at + 0.8), { size: 36 }); });
      const cheer = t > sr + dur - 1.2;
      K.damla(ctx, t, { x: 1730, y: 900, s: 1.1, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

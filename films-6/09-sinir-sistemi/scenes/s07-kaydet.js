// SAHNE 7 — Analojilerle özet (performans görevine örnek) + gözlem defterine kayıt
(function () {
  const { PAL } = INK; const K = KIT;
  const ROWS = [['beyin', 'düşünür, yorumlar, yönetir', 'yönetim merkezi'], ['beyincik', 'denge ve uyum', 'denge ustası'], ['omurilik soğanı', 'istemsiz hayati olaylar', 'otomatik pilot'], ['omurilik', 'ana iletim yolu, refleks', 'ana kablo'], ['sinirler', 'haberleri taşır', 'iletişim hatları']];
  const CX = [250, 560, 1080];
  E.scene({
    name: 'Kaydet', concept: 'Analojilerle özet ve kayıt', from: 'analogy', to: 'record', trFrom: [800, 500],
    draw(ctx, t) {
      const sa = E.s('analogy'), sr = E.s('record');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 170, 1370, 720);
      ['Yapı', 'Görevi', 'Benzetme'].forEach((h, i) => P.write(ctx, h, CX[i], 265, E.seg(t, sa + 0.2 + i * 0.3, sa + 0.8 + i * 0.3), { size: 46, color: i === 2 ? K.AMBER_D : K.LIFE_D }));
      if (t > sa + 1) P.drawOn(ctx, P.bez([240, 290], [800, 300], [1460, 288], 30), E.se(t, sa + 1, sa + 1.6), { w: 3, color: PAL.light });
      ROWS.forEach((r, i) => {
        const y = 370 + i * 100, at = sa + 1.2 + i * 1.6;
        r.forEach((c, j) => P.write(ctx, c, CX[j], y, E.seg(t, at + j * 0.45, at + 0.7 + j * 0.45), { size: 38, color: j === 2 ? K.AMBER_D : PAL.ink }));
        P.check(ctx, 1455, y - 18, 38, E.se(t, sr + 0.4 + i * 0.4, sr + 0.8 + i * 0.4), { w: 6, color: K.LIFE_D });
      });
      const cheer = t > sr + 2.8;
      K.damla(ctx, t, { x: 1690, y: 900, s: 1.15, flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], arms: cheer ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook' });
    }
  });
})();

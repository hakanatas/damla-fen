// SAHNE 4 — Karaciğerin görevi (kısaca) ve atık uzaklaştıran diğer organlar: deri, akciğerler, kalın bağırsak
(function () {
  const { PAL } = INK; const K = KIT, F = F11;
  const CARDS = [['liver', 'Karaciğer', ['amonyağı üreye', 'çevirir; üre', 'idrarla atılır'], (c, x, y, t) => F.liver(c, x, y, 0.9)],
    ['skin', 'Deri', ['ter: su, tuz,', 'bir miktar üre'], (c, x, y, t) => F.skin(c, x, y, 0.85, t)],
    ['lung', 'Akciğerler', ['karbondioksit ve', 'su buharı'], (c, x, y, t) => F.lungs(c, x, y + 10, 0.75)],
    ['colon', 'Kalın bağırsak', ['sindirilemeyen', 'artıklar (dışkı)'], (c, x, y, t) => F.colon(c, x, y, 0.8)]];
  E.scene({
    name: 'Diğer organlar', concept: 'Karaciğer, deri, akciğer, kalın bağırsak', from: 'liver', to: 'colon', trFrom: [960, 500],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const cur = CARDS.map(c => c[0]).filter(id => t >= E.s(id)).pop();
      CARDS.forEach(([id, h, lines, ic], i) => { const s0 = E.s(id), k = E.se(t, s0 + 0.2, s0 + 0.9, 'out'); if (k <= 0) return;
        const x = 230 + (i % 2) * 740, y = 170 + Math.floor(i / 2) * 370, isCur = cur === id;
        E.layer(ctx, k, c => { K.card(c, x, y, 690, 330, { seed: 11400 + i, tint: isCur ? '#D9B64A' : null, tintA: 0.14, w: isCur ? 3.6 : 2.4 });
          ic(c, x + 150, y + 165, t);
          K.text(c, h, x + 300, y + 90, { size: 50, color: i === 0 ? '#7E3F2E' : K.LIFE_D, maxW: 370 });
          lines.forEach((l, j) => P.write(c, l, x + 300, y + 155 + j * 50, E.seg(t, s0 + 1 + j * 0.9, s0 + 2 + j * 0.9), { size: 36 }));
          }); });
      K.damla(ctx, t, { x: 1800, y: 905, s: 0.75, flip: true, expr: 'curious', look: [-0.7, -0.3], arms: [[-1, 0.5], [1, 0.5]] });
    }
  });
})();

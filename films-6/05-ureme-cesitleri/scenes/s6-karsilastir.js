// SAHNE 9 — Karşılaştır: benzerlikleri listeler (b), farklılıkları listeler (c)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  const SIM = ['İkisinde de yeni canlılar oluşur.', 'İkisi de neslin devamını sağlar.', 'Yavrular, atalarından özellik alır.', 'Hem bitkilerde hem hayvanlarda görülür.'];
  const ROWS = [
    ['', 'Eşeyli üreme', 'Eşeysiz üreme'],
    ['Ata sayısı', 'genellikle iki', 'bir'],
    ['Eşey hücreleri', 'birleşir', 'birleşmez'],
    ['Yavrular', 'benzer, aynısı değil', 'atanın aynısı'],
    ['Çeşitlilik', 'fazla', 'çok az'],
    ['Hız', 'daha yavaş', 'daha hızlı']
  ];
  E.scene({
    name: 'Karşılaştır', concept: 'Benzerlik ve farklılıkları listeleme', from: 'cmp', to: 'adv', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('cmp'), sd = E.s('diff'), sa = E.s('adv');
      ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 160, 1620, 740);
      // benzerlikler
      const la = 1 - E.se(t, sd - 0.3, sd + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        P.write(c, 'Benzerlikler', 300, 270, E.seg(t, sc + 0.3, sc + 1.3), { size: 64, color: F.LIFE_D });
        SIM.forEach((txt, i) => { const at = sc + 1.4 + i * 1.5, y = 390 + i * 115;
          const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
          if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 90 + i });
          P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6, color: F.LIFE_D });
          P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 52 }); });
      });
      // farklılıklar tablosu
      const ta = E.se(t, sd - 0.1, sd + 0.6);
      if (ta > 0) E.layer(ctx, ta, c => {
        P.write(c, 'Farklılıklar', 300, 255, E.seg(t, sd + 0.2, sd + 1.2), { size: 60, color: '#8E4A6A' });
        const at = [sd + 0.8, sd + 2.4, sd + 4.0, sd + 5.6, sd + 7.2, sd + 8.8];
        // vurgular (adv)
        const hk1 = E.se(t, sa + 0.3, sa + 1.3), hk2 = E.se(t, sa + 2.4, sa + 3.4);
        F.marker(c, 1200, 290 + 5 * 84 + 55, 380, hk1, PAL.light, 0.4);
        F.marker(c, 690, 290 + 4 * 84 + 55, 380, hk2, PAL.light, 0.4);
        F.table(c, t, { x: 290, y: 290, cols: [380, 520, 520], rh: 84, rows: ROWS, at, size: 44, colColor: [PAL.ink, '#6E3A5A', F.LIFE_D] });
      });
      const cheer = t > sa + 4;
      DAMLA.draw(ctx, { x: 1800, y: 1045, s: 1.0, view: 'q3', flip: true, expr: cheer ? 'happy' : 'thinking', look: [-0.7, -0.2], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 5, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

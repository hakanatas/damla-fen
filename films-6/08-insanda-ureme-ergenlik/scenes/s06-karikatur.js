// SAHNE 6 — Ergenlik: kavram karikatürü, tahmin, güvenilir kaynaklardan bilgi toplama (FB.6.3.8 a)
(function () {
  const { PAL } = INK; const K = KIT, F = F08;
  const KIDS = [
    { x: 290, o: { hair: 'long', shirt: PAL.life, seed: 1 }, say: ['Ergenlik herkeste', 'aynı yaşta başlar.'] },
    { x: 740, o: { hair: 'short', shirt: PAL.water, seed: 2, hairC: '#5A3B22' }, say: ['Sivilce yalnızca', 'kirden çıkar.'] },
    { x: 1190, o: { hair: 'curly', shirt: PAL.light, seed: 3, hairC: '#2A2020' }, say: ['Bu değişimler', 'normaldir.'] }
  ];
  const SRC = [['ders kitabı', 'books'], ['rehber öğretmen', 'teacher'], ['sağlık uzmanı', 'doctor']];
  E.scene({
    name: 'Kavram karikatürü', concept: 'Ergenlik: tahmin et, bilgi topla', from: 'puberty', to: 'gather', trFrom: [740, 500],
    draw(ctx, t) {
      const sp = E.s('puberty'), sg = E.s('gather');
      K.text(ctx, 'Ergenlik = çocukluktan yetişkinliğe geçiş', 740, 215, { size: 44, align: 'center', color: K.LIFE_D, alpha: E.se(t, sp + 0.5, sp + 1.3) });
      KIDS.forEach((kd, i) => {
        const k = E.se(t, sp + 2.5 + i * 0.9, sp + 3.2 + i * 0.9, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => K.kid(c, kd.x, 740, 0.95, Object.assign({ expr: i === 1 ? 'think' : 'smile' }, kd.o)));
        K.say(ctx, kd.say, kd.x, 420, 410, 170, [kd.x + 20, 590], k, { size: 38, seed: 10 + i });
        K.text(ctx, '?', kd.x + 190, 330, { size: 60, color: PAL.light, alpha: k * (0.6 + 0.4 * Math.sin(t * 3 + i)) });
      });
      // kaynaklar
      SRC.forEach(([n, ic], i) => {
        const at = sg + 2.0 + i * 1.4, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const y = 205 + i * 165;
        E.layer(ctx, k, c => {
          K.card(c, 1430, y, 420, 140, { seed: 7400 + i, tint: PAL.water, tintA: 0.08 });
          if (ic === 'books') P.icon.books(c, 1510, y + 78, 0.5);
          else { K.kid(c, 1505, y + 78, 0.36, { hair: i === 1 ? 'bun' : 'short', shirt: i === 1 ? PAL.life : PAL.white, seed: 20 + i, hairC: '#4A4040' }); if (i === 2) { c.save(); c.strokeStyle = PAL.water; c.lineWidth = 6; c.beginPath(); c.moveTo(1532, y + 108); c.lineTo(1532, y + 128); c.moveTo(1522, y + 118); c.lineTo(1542, y + 118); c.stroke(); c.restore(); } }
          K.text(c, n, 1580, y + 88, { size: 36 });
        });
      });
      K.damla(ctx, t, { x: 1640, y: 900, s: 0.85, flip: true, expr: t > sg ? 'determined' : 'thinking', look: [-0.7, -0.4], arms: t > sg ? [[-1, 0.4], [1, 2.2]] : [[-1, 0.4], [1, [30, -150], 1]] });
    }
  });
})();

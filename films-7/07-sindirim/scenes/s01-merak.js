// SAHNE 1 — Başlık + Merak: Ela elmayı ısırır; lokma nereye gidiyor? Beyin fırtınası.
(function () {
  const { PAL, stroke } = INK; const K = KIT, F = F07;
  E.scene({
    name: 'Merak', concept: 'Besinin yolu: soru ve beyin fırtınası', from: 'title', to: 'storm',
    draw(ctx, t) {
      const sa = E.s('apple'), ss = E.s('storm');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.08)'); g.addColorStop(1, 'rgba(111,138,58,0.12)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      K.kid(ctx, 560, 690, 1.45, { shirt: PAL.life, hair: 'long', seed: 3, expr: t > sa + 2.2 && t < sa + 5 ? 'o' : 'smile' });
      const bite = t > sa + 2.4 ? 1 : 0, ak = E.se(t, sa + 0.6, sa + 2.2);
      F.apple(ctx, E.lerp(760, 650, ak), E.lerp(640, 660, ak), 1.1, bite);
      K.text(ctx, 'Ela', 560, 470, { size: 40, align: 'center', alpha: E.se(t, sa + 0.3, sa + 1) * (1 - E.se(t, ss, ss + 0.6)) });
      // soru: lokma nereye?
      const qk = E.se(t, sa + 3.2, sa + 4.4);
      if (qk > 0 && t < ss + 1) { ctx.save(); ctx.globalAlpha = qk * (1 - E.se(t, ss, ss + 0.8)); INK.dashed(ctx, F.cr([[560, 640], [520, 720], [560, 820], [640, 870]], 40), { w: 3, color: PAL.light }); ctx.restore();
        K.text(ctx, '?', 690, 880, { size: 80, color: '#C07F1E', alpha: qk * (1 - E.se(t, ss, ss + 0.8)) }); }
      // beyin fırtınası balonu
      const bk = E.se(t, ss + 0.2, ss + 1.0, 'out');
      P.bubble(ctx, 1150, 420, 700, 380, [1380, 700], bk, 3);
      if (bk > 0.6) {
        K.text(ctx, 'Beyin fırtınası', 1150, 320, { size: 46, align: 'center', color: K.LIFE_D, alpha: E.se(t, ss + 0.6, ss + 1.2) });
        [['ağız', 960, 410], ['mide', 1150, 440], ['bağırsak', 1330, 400], ['başka?', 1160, 530]].forEach(([w, x, y], i) => P.write(ctx, w, x, y, E.seg(t, ss + 1.4 + i * 0.9, ss + 2.2 + i * 0.9), { size: i === 3 ? 50 : 44, align: 'center', color: i === 3 ? '#C07F1E' : PAL.ink }));
      }
      K.damla(ctx, t, { x: 1560, y: 880, s: 1.25, flip: true, expr: t > ss ? 'thinking' : 'curious', look: [-0.7, -0.2], arms: [[-1, 0.4], [1, t > ss ? 2.2 : 0.5]] });
      K.title(ctx, t, 7, 'Besinlerin Yolculuğu: Sindirim Sistemi', 3);
    }
  });
})();

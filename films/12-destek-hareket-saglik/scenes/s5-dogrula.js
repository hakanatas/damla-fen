// SAHNE 5 — Doğrulama (c): yanlış bir iddia öğretmen, uzman, bilimsel kaynak ve arkadaş tartışmasıyla sınanır
(function () {
  const { PAL, stroke, line } = INK;
  const RED = '#A23A2A';
  E.scene({
    name: 'Doğrula', concept: 'Bilgiyi doğrulama', from: 'claim', to: 'wrong', trFrom: [540, 400],
    draw(ctx, t) {
      const F = F12, sc = E.s('claim'), sk = E.s('check'), sw = E.s('wrong');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 830);
      const kn = E.se(t, sc + 0.3, sc + 1, 'out');
      if (kn > 0) {
        ctx.save(); ctx.translate(620, 330); ctx.rotate(-0.04); ctx.scale(P.pop(kn), P.pop(kn));
        const note = [[-360, -120], [360, -128], [366, 120], [-356, 126], [-360, -120]];
        P.fillPts(ctx, note, '#F6E7B8', 0.95); stroke(ctx, note, { w: 2.4, closed: true, seed: 61 });
        ctx.font = '400 30px Kalam'; ctx.fillStyle = PAL.ink; ctx.globalAlpha *= 0.7; ctx.fillText('bir sitede okudum:', -320, -60); ctx.globalAlpha = 1;
        ctx.font = '700 42px Kalam'; ctx.fillText('“Çok süt içenin kemiği', -320, 6); ctx.fillText('asla kırılmaz!”', -320, 62);
        ctx.restore();
        if (t < sk) INK.label(ctx, '?', 1060, 360, { size: 120, weight: 700, alpha: E.se(t, sc + 3, sc + 3.6), color: '#8A4A10' });
      }
      P.cross(ctx, 620, 335, 150, E.se(t, sw + 0.2, sw + 0.9), { w: 14, color: RED });
      if (t > sw + 0.8) INK.label(ctx, 'YANLIŞ', 820, 520, { size: 56, weight: 700, color: RED, alpha: E.se(t, sw + 0.8, sw + 1.4), rot: -0.08 });
      const rows = [['öğretmenim', 0.3], ['doktor', 1.8], ['bilimsel kaynaklar', 3.4], ['arkadaşlarımla tartışma', 5.2]];
      if (t > sk) {
        P.arrow(ctx, [1000, 330], [1130, 300], E.se(t, sk, sk + 0.6), { w: 3, bend: 20 });
        rows.forEach(([txt, off], i) => {
          const at = sk + off, y = 250 + i * 95, k = E.se(t, at, at + 0.8); if (k <= 0) return;
          const box = [[1160, y - 40], [1216, y - 42], [1218, y + 14], [1162, y + 16], [1160, y - 40]];
          stroke(ctx, box, { w: 2.6, closed: true, seed: 70 + i });
          P.check(ctx, 1186, y - 16, 48, E.se(t, at + 0.5, at + 1.1), { w: 6 });
          P.write(ctx, txt, 1240, y + 6, k, { size: 42 });
        });
      }
      const kf = E.se(t, sw + 2.4, sw + 3.4);
      if (kf > 0) {
        P.write(ctx, 'Doğrusu:', 300, 700, kf, { size: 48, color: '#3E5A1A' });
        P.write(ctx, 'Beslenme kemikleri destekler; ama kazalardan', 300, 770, E.seg(t, sw + 3, sw + 4.6), { size: 42 });
        P.write(ctx, 'korunmak için kask ve dizlik de gerekir.', 300, 830, E.seg(t, sw + 4.2, sw + 5.8), { size: 42 });
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > sw ? 'determined' : 'thinking', look: [-0.7, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.06]] });
    }
  });
})();

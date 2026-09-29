// SAHNE 1 — Başlık + Merak: hastaların kana ihtiyacı; kan fabrikada üretilemez
(function () {
  const { PAL } = INK; const K = KIT, F = F09;
  E.scene({
    name: 'Merak', concept: 'Kan nereden gelir?', from: 'title', to: 'nofab',
    draw(ctx, t) {
      const sn = E.s('need'), sf = E.s('nofab');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.07)'); g.addColorStop(1, 'rgba(184,69,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      INK.stroke(ctx, [[60, 884], [1860, 880]], { w: 3, seed: 9101 });
      F.hospital(ctx, 380, 760, 1.0);
      K.text(ctx, 'hastane', 380, 845, { size: 34, align: 'center', color: '#FBF8F1', alpha: 0 });
      const fill = E.se(t, sf + 2.5, sf + 5.0);
      F.bag(ctx, 960, 620, 1.3, fill);
      if (t > sn + 2 && fill < 0.2) K.text(ctx, '?', 1080, 470, { size: 90, color: '#C07F1E', alpha: E.se(t, sn + 2, sn + 2.6) * (1 - E.se(t, sf + 2.5, sf + 3)) });
      if (t > sn + 1) { ctx.save(); ctx.globalAlpha = E.se(t, sn + 1, sn + 1.6); P.arrow(ctx, [760, 640], [560, 660], 1, { w: 3, head: 14 }); ctx.restore(); }
      // fabrika ✗ ve gönüllü ✓
      const fk = E.se(t, sf + 0.3, sf + 1.0);
      if (fk > 0) { ctx.save(); ctx.globalAlpha = fk; F.factory(ctx, 1320, 330, 0.9); P.cross(ctx, 1320, 320, 60, E.se(t, sf + 0.9, sf + 1.6), { w: 9, color: K.RED }); ctx.restore(); K.text(ctx, 'fabrikada üretilemez', 1320, 440, { size: 34, align: 'center', alpha: fk }); }
      const vk = E.se(t, sf + 1.8, sf + 2.5);
      if (vk > 0) { ctx.save(); ctx.globalAlpha = vk; K.kid(ctx, 1560, 640, 0.9, { shirt: PAL.life, hair: 'short', seed: 7, hairC: '#5A3E2E' }); P.arrow(ctx, [1440, 640], [1100, 620], E.se(t, sf + 2.3, sf + 3.0), { w: 3, head: 14, color: F.BLOOD }); ctx.restore();
        K.text(ctx, 'gönüllü bağışçı', 1560, 820, { size: 34, align: 'center', color: K.LIFE_D, alpha: vk }); }
      K.damla(ctx, t, { x: 1780, y: 880, s: 0.9, flip: true, expr: t > sf + 3 ? 'happy' : 'curious', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, 0.5]] });
      K.title(ctx, t, 9, 'Kan Bağışı ve Dolaşım Sağlığı', 3);
    }
  });
})();

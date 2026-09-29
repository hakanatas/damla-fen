// SAHNE 1 — Merak: akrabalar arasındaki benzerlikler · "Aslı ne ise nesli odur." · kalıtım tanımı
(function () {
  const { PAL, stroke, line } = INK; const K = KIT, F = G8;
  E.scene({
    name: 'Merak', concept: 'Benzerlikler ve kalıtım', from: 'title', to: 'inherit',
    draw(ctx, t) {
      const sf = E.s('family'), sp = E.s('proverb'), si = E.s('inherit');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.07)'); g.addColorStop(1, 'rgba(227,160,58,0.12)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const fk = E.se(t, 1.4, 2.6);
      E.layer(ctx, fk, c => {
        K.kid(c, 1060, 590, 1.25, { hair: 'curly', shirt: PAL.water, seed: 3, expr: 'smile' });
        K.kid(c, 1560, 590, 1.25, { hair: 'long', shirt: PAL.light, seed: 4, expr: 'smile', hairC: '#5A3A22' });
        K.kid(c, 1310, 730, 1.0, { hair: 'curly', shirt: PAL.life, seed: 5, expr: 'smile' });
        K.text(c, 'baba', 1060, 820, { size: 34, align: 'center', alpha: 0.7 }); K.text(c, 'anne', 1560, 820, { size: 34, align: 'center', alpha: 0.7 }); K.text(c, 'Ela', 1310, 895, { size: 36, align: 'center' });
        const k1 = E.se(t, sf + 2.0, sf + 2.8), k2 = E.se(t, sf + 3.6, sf + 4.4);
        if (k1 > 0) { c.save(); c.globalAlpha *= k1; INK.dashed(c, F.densify(P.bez([1290, 575], [1200, 420], [1100, 425], 20), 4), { w: 2.4, on: 10, off: 8, color: K.LIFE_D }); K.text(c, 'saçlar', 1200, 395, { size: 36, align: 'center', color: K.LIFE_D }); c.restore(); }
        if (k2 > 0) { c.save(); c.globalAlpha *= k2; INK.dashed(c, F.densify(P.bez([1335, 690], [1470, 560], [1545, 555], 20), 4), { w: 2.4, on: 10, off: 8, color: '#8A4A10' }); K.text(c, 'gülüş', 1405, 525, { size: 36, align: 'center', color: '#8A4A10' }); c.restore(); }
      });
      // atasözü kartı
      const pk = E.se(t, sp + 0.2, sp + 1.0, 'out');
      if (pk > 0) E.layer(ctx, pk, c => {
        K.card(c, 820, 150, 980, 210, { seed: 3100, tint: PAL.light, tintA: 0.1 });
        K.text(c, '“Aslı ne ise nesli odur.”', 1310, 235, { size: 56, align: 'center', fam: 'Fraunces', weight: 600 });
        const ik = E.se(t, si + 0.5, si + 1.3);
        if (ik > 0) { c.save(); c.globalAlpha *= ik; K.text(c, 'Özellikler genlerle aktarılır → kalıtım', 1310, 318, { size: 42, align: 'center', color: K.LIFE_D }); c.restore(); }
      });
      K.damla(ctx, t, { x: 400, y: 880, s: 1.45, expr: t > si ? 'happy' : 'curious', look: [0.8, -0.2], talk: E.talk(t), arms: [[-1, 0.4], [1, t > sf + 1 && t < sp ? 1.7 : 0.5]] });
      K.title(ctx, t, 7, 'Aslı Ne İse Nesli Odur: Kalıtım', 3);
    }
  });
})();

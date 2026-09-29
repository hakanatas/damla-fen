// SAHNE 6 — Bilgi toplama araçları ve doğrulama (FB.7.3.9 a, b, c)
(function () {
  const { PAL, stroke, circlePts } = INK; const K = KIT;
  const expert = (c, x, y, s) => { K.kid(c, x, y, s, { shirt: '#FBF8F1', hair: 'short', expr: 'smile', seed: 9 });
    c.save(); c.translate(x, y); c.scale(s, s); stroke(c, P.bez([-40, 34], [-50, 110], [0, 118], 14).concat(P.bez([0, 118], [50, 110], [40, 34], 14)), { w: 3.4, dry: false, color: '#5A4A3A' });
    P.fillPts(c, circlePts(0, 122, 12, 12, 16), '#8A8A92'); c.restore(); };
  E.scene({
    name: 'Bilgi toplama', concept: 'Güvenilir araçlar ve doğrulama', from: 'health', to: 'tools', trFrom: [960, 450],
    draw(ctx, t) {
      const sh = E.s('health'), st = E.s('tools');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(217,182,74,0.10)'); g.addColorStop(1, 'rgba(46,106,140,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      K.node(ctx, 'Boşaltım sistemimi nasıl korurum?', 960, 230, E.se(t, sh + 0.3, sh + 1, 'out'), { size: 52, tint: PAL.light, tintA: 0.25, seed: 1 });
      const cols = [[470, 'güvenilir', 'internet siteleri', (c, x, y) => P.icon.laptop(c, x, y, 1.1, t)], [960, 'basılı', 'kaynaklar', (c, x, y) => P.icon.books(c, x, y, 1.2)], [1450, 'uzmanla', 'görüşme', (c, x, y) => expert(c, x, y - 10, 0.72)]];
      cols.forEach(([x, a, b, ic], i) => { const k = E.se(t, sh + 3 + i * 0.9, sh + 3.6 + i * 0.9, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { K.card(c, x - 200, 330, 400, 360, { seed: 11600 + i }); ic(c, x, 470); K.text(c, a, x, 620, { size: 40, align: 'center' }); K.text(c, b, x, 668, { size: 36, align: 'center', alpha: 0.8 }); }); });
      const vk = E.se(t, st + 4, st + 4.7, 'out');
      if (vk > 0) { const V = ['öğretmenime danışırım', 'arkadaşlarımla tartışırım'];
        E.layer(ctx, vk, c => { K.card(c, 300, 730, 1420, 130, { seed: 11610, tint: PAL.life, tintA: 0.12 }); K.text(c, 'Doğrula:', 340, 810, { size: 46, color: K.LIFE_D });
          V.forEach((v, i) => { const a = st + 4.6 + i * 1.2, x = 580 + i * 560; P.check(c, x, 796, 30, E.se(t, a, a + 0.4), { w: 5, color: K.LIFE_D }); P.write(c, v, x + 36, 810, E.seg(t, a + 0.1, a + 0.9), { size: 38 }); }); }); }
      K.damla(ctx, t, { x: 180, y: 900, s: 0.85, view: 'q3', expr: 'curious', look: [0.6, -0.3], arms: [[-1, 0.5], [1, 2.2]] });
    }
  });
})();

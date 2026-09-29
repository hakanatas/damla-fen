// SAHNE 7 — Sağlık için bilgi toplama: araç belirleme, bilgi bulma, doğrulama (FB.7.3.7 a, b, c)
(function () {
  const { PAL, stroke, line, circlePts } = INK; const K = KIT;
  const expert = (c, x, y, s) => { K.kid(c, x, y, s, { shirt: '#FBF8F1', hair: 'bun', expr: 'smile', seed: 7 });
    c.save(); c.translate(x, y); c.scale(s, s); stroke(c, P.bez([-40, 34], [-50, 110], [0, 118], 14).concat(P.bez([0, 118], [50, 110], [40, 34], 14)), { w: 3.4, dry: false, color: '#5A4A3A' });
    P.fillPts(c, circlePts(0, 122, 12, 12, 16), '#8A8A92'); stroke(c, circlePts(0, 122, 12, 12, 16), { w: 2, closed: true, dry: false }); c.restore(); };
  E.scene({
    name: 'Bilgi toplama', concept: 'Güvenilir bilgi kaynakları ve doğrulama', from: 'health', to: 'verify', trFrom: [960, 450],
    draw(ctx, t) {
      const sh = E.s('health'), st = E.s('tools'), sv = E.s('verify');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.08)'); g.addColorStop(1, 'rgba(46,106,140,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const qk = E.se(t, sh + 0.3, sh + 1, 'out');
      K.node(ctx, 'Solunum sistemimi nasıl korurum?', 960, 230, qk, { size: 52, tint: PAL.light, tintA: 0.25, seed: 1 });
      const cols = [[470, 'güvenilir', 'internet siteleri', (c, x, y) => P.icon.laptop(c, x, y, 1.1, t)], [960, 'basılı', 'kaynaklar', (c, x, y) => P.icon.books(c, x, y, 1.2)], [1450, 'uzmanla görüşme', '(aile hekimi)', (c, x, y) => expert(c, x, y - 10, 0.72)]];
      cols.forEach(([x, a, b, ic], i) => { const k = E.se(t, st + 0.3 + i * 1.8, st + 1 + i * 1.8, 'out'); if (k <= 0) return;
        E.layer(ctx, k, c => { K.card(c, x - 200, 330, 400, 360, { seed: 10700 + i }); ic(c, x, 470); K.text(c, a, x, 620, { size: 40, align: 'center' }); K.text(c, b, x, 668, { size: 36, align: 'center', alpha: 0.8 }); }); });
      // doğrulama
      const vk = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (vk > 0) { const V = ['öğretmenime danışırım', 'bilimsel kaynaklarla karşılaştırırım', 'arkadaşlarımla tartışırım'];
        E.layer(ctx, vk, c => { K.card(c, 300, 712, 1420, 196, { seed: 10710, tint: PAL.life, tintA: 0.12 });
          K.text(c, 'Doğrula:', 340, 790, { size: 46, color: K.LIFE_D });
          V.forEach((v, i) => { const a = sv + 0.8 + i * 1.3, x = i === 2 ? 1210 : 560, y = i === 1 ? 866 : 790; P.check(c, x, y - 14, 30, E.se(t, a, a + 0.4), { w: 5, color: K.LIFE_D }); P.write(c, v, x + 36, y, E.seg(t, a + 0.1, a + 0.9), { size: 36 }); }); }); }
      K.damla(ctx, t, { x: 180, y: 900, s: 0.85, view: 'q3', expr: 'curious', look: [0.6, -0.3], arms: [[-1, 0.5], [1, 2.2]] });
    }
  });
})();

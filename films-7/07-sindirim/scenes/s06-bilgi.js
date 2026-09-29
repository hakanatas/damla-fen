// SAHNE 6 — FB.7.3.2: örnek olay (Arda) → bilgi toplama araçları → doğrulama
(function () {
  const { PAL, stroke, line, wash } = INK; const K = KIT;
  function tablet(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); const b = K.rrect(0, 0, 150, 100, 12); P.fillPts(c, b, '#3A3842'); stroke(c, b, { w: 3, closed: true }); const sc = K.rrect(0, 0, 128, 80, 6); P.fillPts(c, sc, '#9CC3D8'); c.restore(); }
  function expert(c, x, y, s) { K.kid(c, x, y, s, { shirt: '#FBF8F1', hair: 'short', seed: 9, hairC: '#6B5040' }); c.save(); c.translate(x, y); c.scale(s, s); stroke(c, P.bez([-30, 34], [-50, 90], [-10, 110], 12), { w: 3, dry: false, color: '#555' }); INK.inkDot(c, -10, 112, 6); c.restore(); }
  const TOOLS = [['güvenilir resmî siteler', (c, x, y) => P.icon.laptop(c, x, y, 1.0)], ['basılı kaynaklar', (c, x, y) => P.icon.books(c, x, y, 1.0)], ['uzman görüşü', (c, x, y) => expert(c, x, y + 30, 0.72)]];
  E.scene({
    name: 'Bilgi toplama', concept: 'Örnek olay, araç seçimi, doğrulama', from: 'case', to: 'verify', trFrom: [400, 500],
    draw(ctx, t) {
      const sc = E.s('case'), st = E.s('tools'), sv = E.s('verify');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.07)'); g.addColorStop(1, 'rgba(227,160,58,0.08)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // örnek olay
      const ck = 1 - E.se(t, st + 1.6, st + 2.4);
      if (ck > 0) E.layer(ctx, ck, c => {
        K.kid(c, 420, 640, 1.35, { shirt: PAL.water, hair: 'short', seed: 5, expr: 'think' });
        tablet(c, 560, 760, 1.0); K.text(c, 'Arda', 420, 420, { size: 40, align: 'center' });
        K.card(c, 820, 210, 960, 470, { seed: 7600, tint: PAL.light, tintA: 0.08 });
        K.text(c, 'Örnek olay', 870, 290, { size: 52, color: K.AMBER_D });
        ['kahvaltıyı atlıyor', 'ekran başında hızlı hızlı atıştırıyor', 'az su içiyor'].forEach((l, i) => { const k = E.seg(t, sc + 1.0 + i * 1.6, sc + 2.0 + i * 1.6); P.write(c, l, 920, 385 + i * 80, k, { size: 42 }); if (k > 0) K.text(c, '•', 885, 385 + i * 80, { size: 42, alpha: Math.min(1, k * 2) }); });
        K.text(c, 'Sindirimi nasıl etkiler?', 870, 630, { size: 40, color: PAL.water, alpha: E.se(t, st, st + 0.6) });
      });
      // araçlar
      const tk = E.se(t, st + 1.8, st + 2.6);
      if (tk > 0) E.layer(ctx, tk, c => {
        K.text(c, 'Bilgi toplama araçlarım', 960, 230, { size: 54, align: 'center', color: K.LIFE_D });
        TOOLS.forEach(([name, ic], i) => { const x = 380 + i * 580, k = E.se(t, st + 2.2 + i * 0.8, st + 2.9 + i * 0.8, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; K.card(c, x - 240, 290, 480, 380, { seed: 7610 + i, tint: PAL.life, tintA: 0.06 }); ic(c, x, 450); K.text(c, name, x, 630, { size: 38, align: 'center', maxW: 440 }); c.restore();
          P.check(c, x + 190, 320, 44, E.se(t, sv + 1.2 + i * 0.7, sv + 1.7 + i * 0.7), { w: 7, color: K.LIFE_D }); });
      });
      // doğrulama
      const vk = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (vk > 0) E.layer(ctx, vk, c => {
        K.card(c, 240, 715, 1440, 170, { seed: 7620, tint: PAL.life, tintA: 0.12 });
        K.text(c, 'Doğrula:', 290, 790, { size: 46, color: K.LIFE_D });
        P.write(c, 'kaynakları karşılaştır · öğretmene danış · diyetisyene sor', 490, 790, E.seg(t, sv + 0.8, sv + 3.0), { size: 38, alpha: 0.95 });
        K.text(c, 'sonra doğrulanan bilgiyi kaydet', 490, 850, { size: 32, alpha: 0.7 * E.se(t, sv + 3.2, sv + 3.8) });
      });
    }
  });
})();

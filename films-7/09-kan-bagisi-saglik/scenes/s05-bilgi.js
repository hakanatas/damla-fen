// SAHNE 5 — FB.7.3.5: örnek olay (Ece) → bilgi toplama araçları → doğrulama ve kayıt
(function () {
  const { PAL, stroke, circlePts } = INK; const K = KIT, F = F09;
  function tablet(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); const b = K.rrect(0, 0, 150, 100, 12); P.fillPts(c, b, '#3A3842'); stroke(c, b, { w: 3, closed: true }); P.fillPts(c, K.rrect(0, 0, 128, 80, 6), '#9CC3D8'); c.restore(); }
  function doctor(c, x, y, s) { K.kid(c, x, y, s, { shirt: '#FBF8F1', hair: 'bun', seed: 9, hairC: '#4A3428' }); c.save(); c.translate(x, y); c.scale(s, s); stroke(c, P.bez([-30, 34], [-50, 90], [-10, 110], 12), { w: 3, dry: false, color: '#555' }); INK.inkDot(c, -10, 112, 6); c.restore(); }
  const TOOLS = [['resmî siteler', 'ör. Sağlık Bakanlığı', (c, x, y) => P.icon.laptop(c, x, y, 1.0)], ['basılı kaynaklar', 'kitap, dergi', (c, x, y) => P.icon.books(c, x, y, 1.0)], ['doktorla görüşme', 'alan uzmanı', (c, x, y) => doctor(c, x, y + 30, 0.72)]];
  E.scene({
    name: 'Bilgi toplama', concept: 'Dolaşım sağlığı: örnek olay, araçlar, doğrulama', from: 'case', to: 'verify', trFrom: [400, 500],
    draw(ctx, t) {
      const sc = E.s('case'), st = E.s('tools'), sv = E.s('verify');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.09)'); g.addColorStop(1, 'rgba(227,160,58,0.07)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const ck = 1 - E.se(t, st - 0.2, st + 0.6);
      if (ck > 0) E.layer(ctx, ck, c => {
        // gece: ay
        P.moon(c, 200, 300, 50); K.text(c, '23.30', 300, 318, { size: 40, alpha: 0.8 });
        K.kid(c, 420, 660, 1.3, { shirt: '#6B5FA0', hair: 'long', seed: 12, expr: 'think' }); tablet(c, 560, 780, 1.0);
        K.text(c, 'Ece', 420, 450, { size: 40, align: 'center' });
        K.card(c, 820, 210, 960, 470, { seed: 9500, tint: PAL.light, tintA: 0.08 });
        K.text(c, 'Örnek olay', 870, 290, { size: 52, color: K.AMBER_D });
        ['gece geç saate kadar ekran başında', 'geç uyuyor, sabah yorgun', 'hiç spor yapmıyor'].forEach((l, i) => { const k = E.seg(t, sc + 2.5 + i * 1.5, sc + 3.5 + i * 1.5); P.write(c, l, 920, 385 + i * 80, k, { size: 42 }); if (k > 0) K.text(c, '•', 885, 385 + i * 80, { size: 42, alpha: Math.min(1, k * 2) }); });
        K.text(c, 'Dolaşım sistemi nasıl etkilenir?', 870, 630, { size: 40, color: PAL.water, alpha: E.se(t, sc + 7, sc + 7.6) });
      });
      const tk = E.se(t, st + 0.3, st + 1.0);
      if (tk > 0) E.layer(ctx, tk, c => {
        K.text(c, 'Bilgi toplama araçlarım', 960, 230, { size: 54, align: 'center', color: K.LIFE_D });
        TOOLS.forEach(([name, sub, ic], i) => { const x = 380 + i * 580, k = E.se(t, st + 0.8 + i * 1.2, st + 1.5 + i * 1.2, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha *= k; K.card(c, x - 240, 290, 480, 390, { seed: 9510 + i, tint: PAL.life, tintA: 0.06 }); ic(c, x, 450); K.text(c, name, x, 620, { size: 40, align: 'center', maxW: 440 }); K.text(c, sub, x, 660, { size: 30, align: 'center', alpha: 0.7 }); c.restore();
          P.check(c, x + 190, 320, 44, E.se(t, sv + 1.2 + i * 0.7, sv + 1.7 + i * 0.7), { w: 7, color: K.LIFE_D }); });
      });
      const vk = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (vk > 0) E.layer(ctx, vk, c => {
        K.card(c, 240, 715, 1440, 170, { seed: 9520, tint: PAL.life, tintA: 0.12 });
        K.text(c, 'Doğrula:', 290, 790, { size: 46, color: K.LIFE_D });
        P.write(c, 'kaynakları karşılaştır · öğretmene danış', 490, 790, E.seg(t, sv + 0.8, sv + 2.6), { size: 40 });
        K.text(c, '→ doğrulanan bilgiyi defterine kaydet', 490, 850, { size: 34, alpha: 0.75 * E.se(t, sv + 3, sv + 3.6) });
      });
    }
  });
})();

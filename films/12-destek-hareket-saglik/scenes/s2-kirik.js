// SAHNE 2 — Kemik kırığı (tek hastalık olarak) + kırık şüphesinde güvenlik kartı
(function () {
  const { PAL, stroke, line, circlePts, splash } = INK;
  const RED = '#A23A2A';
  E.scene({
    name: 'Kemik kırığı', concept: 'Kemik kırığı ve ilk yapılacaklar', from: 'xray', to: 'firstaid', trFrom: [700, 480],
    draw(ctx, t) {
      const F = F12, sx = E.s('xray'), sf = E.s('firstaid');
      ctx.fillStyle = 'rgba(46,106,140,0.07)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, sf + 0.1, sf + 0.8);
      if (a1 > 0) E.layer(ctx, a1, c => {
        const crack = F.xray(c, 640, 470, 680, 400, E.se(t, sx + 2.4, sx + 3.2), t);
        P.write(c, 'röntgen filmi', 640, 760, E.seg(t, sx + 0.6, sx + 1.6), { size: 44, align: 'center' });
        F.tag(c, 'kırık', 820, 220, [crack[0] + 10, crack[1] - 40], E.se(t, sx + 3, sx + 3.8), { size: 50, color: '#8A4A10' });
        const ke = E.se(t, sx + 4.4, sx + 5.2);
        if (ke > 0) { c.save(); c.globalAlpha *= ke; const A = F.kid(c, 1450, 870, 1.2, { cast: true, sad: true, t }); c.restore(); F.tag(c, 'alçı', 1660, 440, [1470, 610], E.se(t, sx + 5.2, sx + 6), { size: 48, seed: 5 }); }
      });
      if (t > sf) {
        const k = E.se(t, sf + 0.1, sf + 0.8, 'out');
        c2(ctx, t, k, sf);
      }
      DAMLA.draw(ctx, { x: 1840, y: 1045, s: 0.85, view: 'q3', flip: true, expr: t > sf ? 'determined' : 'sad', look: [-0.7, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 4, arms: [[-1, 0.4], [1, 0.5]] });
    }
  });
  function c2(ctx, t, k, sf) {
    const F = F12;
    ctx.save(); ctx.translate(0, (1 - k) * 900);
    F.card(ctx, 220, 150, 1700, 870, { color: RED, seed: 31 });
    line(ctx, [230, 232], [1700, 222], { w: 3, color: RED, dry: false });
    ctx.font = '700 50px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  KIRIK ŞÜPHESİNDE', 960, 208);
    const cols = [480, 960, 1440];
    // 1: do not move
    const k1 = E.se(t, sf + 1, sf + 1.8, 'out');
    if (k1 > 0) { ctx.save(); ctx.globalAlpha *= k1; F.bone(ctx, [cols[0] - 110, 470], [cols[0] + 110, 440], 20); [[-1], [1]].forEach(([d]) => P.arrow(ctx, [cols[0] + d * 40, 380], [cols[0] + d * 120, 350], 1, { w: 3, head: 12, bend: 12 })); P.cross(ctx, cols[0], 420, 80, E.se(t, sf + 1.8, sf + 2.4), { w: 10, color: RED }); ctx.restore();
      P.write(ctx, 'O bölgeyi', cols[0], 640, E.seg(t, sf + 1.6, sf + 2.6), { size: 44, align: 'center' }); P.write(ctx, 'hareket ettirme!', cols[0], 700, E.seg(t, sf + 2.2, sf + 3.2), { size: 44, align: 'center', color: RED }); }
    // 2: tell an adult
    const k2 = E.se(t, sf + 3.6, sf + 4.4, 'out');
    if (k2 > 0) { ctx.save(); ctx.globalAlpha *= k2; F.adult(ctx, cols[1], 560, 0.6, {}); P.bubble(ctx, cols[1] + 110, 290, 90, 80, [cols[1] + 40, 330], 1, 4); INK.label(ctx, '!', cols[1] + 110, 312, { size: 60, weight: 700, align: 'center', color: RED }); ctx.restore();
      P.write(ctx, 'Hemen bir yetişkine', cols[1], 640, E.seg(t, sf + 4.2, sf + 5.2), { size: 44, align: 'center' }); P.write(ctx, 'haber ver.', cols[1], 700, E.seg(t, sf + 4.8, sf + 5.6), { size: 44, align: 'center' }); }
    // 3: 112
    const k3 = E.se(t, sf + 5.8, sf + 6.6, 'out');
    if (k3 > 0) { ctx.save(); ctx.globalAlpha *= k3; F.phone(ctx, cols[2], 440, 1.3 * P.pop(k3)); ctx.restore();
      P.write(ctx, 'Gerekirse', cols[2], 640, E.seg(t, sf + 6.4, sf + 7.2), { size: 44, align: 'center' }); P.write(ctx, '112’yi ara.', cols[2], 700, E.seg(t, sf + 6.8, sf + 7.6), { size: 44, align: 'center', color: RED }); }
    P.write(ctx, 'Kırığı düzeltmeye çalışma; tedaviyi doktor yapar.', 960, 810, E.seg(t, sf + 8, sf + 9.4), { size: 38, weight: 400, align: 'center' });
    ctx.restore();
  }
})();

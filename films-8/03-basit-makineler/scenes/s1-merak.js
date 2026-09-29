// SAHNE 1 — Merak (köprü kurma): ağır taş → çubuk + destek → "İşimi azalttı mı?"
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F8M;
  const FY = 830, PV = [860, 722], A = 250, B = 520;
  function leverPhi(t) {
    const st = E.s('try');
    return E.lerp(-0.33, -0.12, E.se(t, st + 2.2, st + 4.2, 'io'));
  }
  E.scene({
    name: 'Merak', concept: 'Basit makineler işimizi kolaylaştırır mı?', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), st = E.s('try'), sq = E.s('question');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('question'), 'sine') });
      F.floor(ctx, FY, 1, -200, 2120, 1300, PAL.life);
      // arka planda çalı ve çiçekler
      [[180, 70], [1720, 90], [1880, 60]].forEach(([x, r], i) => { const b = circlePts(x, FY - r * 0.5, r * 1.3, r, 30); P.fillPts(ctx, b, PAL.paper); wash(ctx, b, PAL.life, 0.45, 3000 + i, { bleed: 3, blooms: 2 }); stroke(ctx, INK.wobble(b, 3, 3010 + i), { w: 2.6, closed: true, seed: 3020 + i }); });
      const lk = E.se(t, st - 0.2, st + 0.8);
      const phi = leverPhi(t);
      // destek taşı
      if (lk > 0) E.layer(ctx, lk, c => { F.fulcrum(c, PV[0], PV[1], 1.25, 3030); });
      // taş (çubuğun sol ucuna oturur)
      let lift = 0;
      if (lk > 0) { const u = [Math.cos(phi), Math.sin(phi)], n = [Math.sin(phi), -Math.cos(phi)]; const d = -A + 70; const ty = PV[1] + u[1] * d + n[1] * 20; lift = Math.max(0, FY - ty - 4); }
      F.stone(ctx, 610, FY - lift, 120, 3040);
      if (lk > 0) E.layer(ctx, lk, c => { F.plank(c, PV, phi, A, B, { th: 20, seed: 3050 }); });
      if (lift > 8) { ctx.save(); ctx.globalAlpha = E.se(t, st + 3.5, st + 4.2); F.txt(ctx, 'Kalktı!', 610, FY - lift - 200, { size: 52, align: 'center', color: F.FORCE }); ctx.restore(); }
      // Damla çubuğun sağ ucuna bastırır
      const endT = [PV[0] + Math.cos(phi) * (B - 20) + Math.sin(phi) * 20, PV[1] + Math.sin(phi) * (B - 20) - Math.cos(phi) * 20];
      const dx = 1430, dy = FY, s = 1.25;
      const pushing = t > st + 1.0 && t < sq + 0.5;
      const hand = [-(endT[0] - dx) / s, (endT[1] - dy) / s];   // flip: yerel x aynalanır
      DAMLA.draw(ctx, {
        x: dx, y: dy, s, view: 'q3', flip: true,
        expr: t < st ? 'surprised' : (t < st + 4.2 ? 'determined' : (t < sq + 2 ? 'happy' : 'thinking')),
        look: t < sq ? [-0.8, 0.2] : [-0.3, -0.6], blink: E.blink(t, 3), squash: E.breath(t) * (pushing && t < st + 4.2 ? 0.97 : 1), t, seed: 1,
        lean: pushing ? -0.12 : 0,
        arms: t < sh + 2.2 ? [[-1, 0.4], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : (pushing ? [[-1, hand], [1, [hand[0] + 16, hand[1] + 6]]] : (t > sq ? [[-1, [-30, -150]], [1, 0.4]] : [[-1, 0.5], [1, 0.5]]))
      });
      // kuvvet oku (bastırma)
      if (t > st + 1.6 && t < sq + 0.3) { const k = E.se(t, st + 1.6, st + 2.2); ctx.save(); ctx.globalAlpha = 1 - E.se(t, sq - 0.2, sq + 0.3); F.vec(ctx, [endT[0] - 40, endT[1] - 150], [endT[0] - 40, endT[1] - 40], k, { w: 6 }); ctx.restore(); }
      ctx.restore();
      // "ağır!" işaretleri
      if (t > sh + 1.4 && t < st + 0.3) { const k = E.se(t, sh + 1.4, sh + 2.0); ctx.save(); ctx.globalAlpha = k * (1 - E.se(t, st - 0.2, st + 0.3)); F.txt(ctx, 'çok ağır!', 610, FY - 290, { size: 50, align: 'center', color: F.RED }); ctx.restore(); }
      // soru balonu
      if (t > sq + 0.4) P.bubble(ctx, 1180, 330, 560, 150, [1360, 520], E.se(t, sq + 0.4, sq + 1.1, 'out'), 3);
      if (t > sq + 1.0) { ctx.save(); ctx.globalAlpha = E.se(t, sq + 1.0, sq + 1.5); F.txt(ctx, 'İşimi azalttı mı?', 1180, 348, { size: 54, align: 'center', color: F.FORCE }); ctx.restore(); }
      F.title(ctx, t, 3, 'İşi Kolaylaştıran Sırlar: Basit Makineler');
    }
  });
})();

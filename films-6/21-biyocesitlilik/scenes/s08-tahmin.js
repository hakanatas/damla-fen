// SAHNE 9 — Tahmin ve tahminin geçerliğini sorgulama (FB.6.7.2 c, ç)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F621;
  function panel(c, x, y, w, h, seed, fill) {
    const p = [[x, y], [x + w, y + 3], [x + w - 2, y + h], [x + 2, y + h - 2], [x, y]];
    P.fillPts(c, p, '#FBF8F1'); if (fill) fill(p); stroke(c, p, { w: 3, closed: true, seed });
  }
  E.scene({
    name: 'Tahmin', concept: 'Veriye dayalı tahmin ve geçerliği sorgulama', from: 'predict', to: 'valid', trFrom: [960, 540],
    draw(ctx, t) {
      const sp = E.s('predict'), sv = E.s('valid');
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const L = [700, 230, 500, 400], R = [1330, 230, 500, 400];
      // mera
      const mk = E.se(t, sp + 0.2, sp + 0.9, 'out');
      if (mk > 0) E.layer(ctx, mk, c => {
        panel(c, ...L, 180, p => wash(c, p, PAL.life, 0.2, 181, { bleed: 2, blooms: 1 }));
        const cols = ['#FBF8F1', '#C8553D', '#D98A2B', '#8A6AB0', '#E2B737'];
        for (let i = 0; i < 14; i++) F.flower(c, 740 + (i * 71) % 430, 600 - (i % 3) * 24, 0.55, cols[i % 5], i, t, 60 + (i % 4) * 10);
        F.bee(c, 820 + Math.sin(t * 1.6) * 30, 420, 0.9, t); F.bee(c, 1080, 460 + Math.sin(t * 2) * 12, 0.8, t + 1);
        F.butterfly(c, 960 + Math.sin(t) * 40, 360, 0.9, t);
        F.bird(c, 1140, 300, 0.8, t, -1);
        F.fit(c, 'Mera', 950, 290, 300, 50, { color: '#2F4A1E' });
      });
      // tarla
      const tk = E.se(t, sp + 2.8, sp + 3.6, 'out');
      if (tk > 0) E.layer(ctx, tk, c => {
        panel(c, ...R, 190, p => wash(c, p, '#8A5A34', 0.22, 191, { bleed: 2, blooms: 1 }));
        for (let r = 0; r < 5; r++) { const y = 360 + r * 55; line(c, [1360, y], [1800, y - 6], { w: 2.4, color: '#6B4A22', alpha: 0.7, seed: 192 + r }); for (let i = 0; i < 9; i++) { const x = 1380 + i * 48; line(c, [x, y], [x + 2, y - 34], { w: 2, color: '#C99A22', dry: false }); P.fillPts(c, circlePts(x + 2, y - 38, 4, 9, 10), '#C99A22'); } }
        F.fit(c, 'Tarla (tek tür ürün)', 1580, 290, 440, 44, { color: '#6B4A22' });
      });
      // ok (paneller arasında)
      const ak = E.se(t, sp + 1.8, sp + 2.6);
      if (ak > 0) { P.arrow(ctx, [1212, 430], [1322, 430], ak, { w: 4, head: 16, color: '#8A4A10' }); E.inkText(ctx, 'sürülürse', 1266, 400, t, sp + 2.4, 1e9, { size: 25, align: 'center', color: '#8A4A10' }); }
      // tahmin okları
      const dk = E.se(t, sp + 4.4, sp + 5.4, 'out');
      if (dk > 0) E.layer(ctx, dk, c => {
        ['bitki çeşidi ↓', 'arı ↓', 'kuş ↓'].forEach((s, i) => { const k = E.se(t, sp + 4.4 + i * 0.8, sp + 5.0 + i * 0.8, 'out'); if (k <= 0) return; c.save(); c.globalAlpha *= k; F.fit(c, s, [1440, 1640, 1770][i], 690, 200, 38, { color: '#8A4A10' }); c.restore(); });
        INK.label(c, '(temsili çizim)', 1820, 740, { size: 26, align: 'right', alpha: 0.6 });
      });
      // geçerlik
      const vk = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (vk > 0) E.layer(ctx, vk, c => {
        F.card(c, 700, 760, 1130, 130, 200, { tint: PAL.water, tintA: 0.1, blur: 10 });
        P.write(c, 'Geçerli mi?', 740, 810, E.seg(t, sv + 0.4, sv + 1.2), { size: 44, color: PAL.water });
        ['yeni veriler', 'arkadaşlarımın bulguları', 'öğretmenim'].forEach((s, i) => {
          const at = sv + 1.8 + i * 1.3, x = 760 + [0, 300, 740][i];
          P.check(c, x + 12, 845, 34, E.se(t, at, at + 0.5), { w: 6, color: '#3F7A3A' });
          P.write(c, s, x + 44, 866, E.seg(t, at + 0.2, at + 1.0), { size: 36, weight: 400 });
        });
      });
      DAMLA.draw(ctx, { x: 330, y: 890, s: 1.4, view: 'q3', expr: t > sv ? 'thinking' : 'curious', look: [0.8, -0.4], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 8, arms: t > sv ? [[-1, 0.4], [1, [34, -150]]] : [[-1, 0.4], [1, 2.0]] });
    }
  });
})();

// SAHNE 2 — Işık kaynakları (doğal / yapay), araştırma sorusu, göz güvenliği
// (TYMM ön değerlendirme: ışık kaynağı çeşitleri; KB2.7 soru sorma)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed, arrowHead } = INK;
  const F = F13, RED = F.RED;

  function sources(ctx, t) {
    const s0 = E.s('sources');
    // two notebook columns
    [[150, 'Doğal ışık kaynakları', 0], [1000, 'Yapay ışık kaynakları', 1]].forEach(([x, h, i]) => {
      const k = E.se(t, s0 + (i ? 3.4 : 0.3), s0 + (i ? 4.2 : 1.1), 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; F.card(ctx, x, 190, 770, 640, { seed: 200 + i }); ctx.restore();
      P.write(ctx, h, x + 385, 265, E.seg(t, s0 + (i ? 3.6 : 0.5), s0 + (i ? 4.8 : 1.7)), { size: 50, align: 'center', color: i ? PAL.water : '#8A4A10' });
      if (k > 0.9) P.drawOn(ctx, P.bez([x + 120, 290], [x + 385, 298], [x + 650, 286], 20), E.se(t, s0 + 1.5, s0 + 2.2), { w: 3, color: PAL.light });
    });
    // natural: Sun (small, safely drawn), stars
    const kn = E.se(t, s0 + 1.4, s0 + 2.2, 'out');
    if (kn > 0) {
      ctx.save(); ctx.translate(360, 520); ctx.scale(P.pop(kn), P.pop(kn)); P.sun(ctx, 0, 0, 80, t, { cells: false, nrays: 16 }); ctx.restore();
      P.write(ctx, 'Güneş', 360, 720, kn, { size: 44, align: 'center' });
    }
    const ks = E.se(t, s0 + 2.3, s0 + 3.1, 'out');
    if (ks > 0) {
      ctx.save(); ctx.fillStyle = 'rgba(43,53,80,0.75)'; ctx.beginPath(); ctx.roundRect(580, 400, 250, 240, 20); ctx.fill(); ctx.restore();
      [[640, 460, 26], [760, 450, 18], [700, 540, 32], [790, 590, 16], [620, 600, 14]].forEach(([x, y, r], i) => { if (ks > i / 5) F.star(ctx, x, y, r, 300 + i); });
      P.write(ctx, 'yıldızlar', 705, 720, ks, { size: 44, align: 'center' });
    }
    // artificial: bulb, flashlight, candle
    const items = [
      ['ampul', 1170, s0 + 5.0, (c, k) => F.bulb(c, 1170, 480, 1.5, 1)],
      ['el feneri', 1420, s0 + 5.8, (c, k) => { F.flashlight(c, 1470, 490, -0.5, 0.75, 1); for (let i = -1; i <= 1; i++) F.ray(c, [1480, 470 + i * 14], [1480 + Math.cos(-0.5 + i * 0.12) * 130, 470 + i * 14 + Math.sin(-0.5 + i * 0.12) * 130], 1, { w: 2.4, head: 11, seed: 40 + i }); }],
      ['mum', 1650, s0 + 6.6, (c, k) => F.candle(c, 1650, 640, t, { h: 130, w: 42, fh: 80, glow: 0.6 })]
    ];
    items.forEach(([name, x, a, fn]) => {
      const k = E.se(t, a, a + 0.7, 'out'); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = k; fn(ctx, k); ctx.restore();
      P.write(ctx, name, x, 720, k, { size: 44, align: 'center' });
    });
  }

  function question(ctx, t) {
    const sq = E.s('question');
    const C = [900, 520];
    F.bulb(ctx, C[0], C[1], 1.6, 1);
    // hypotheses drawn as grey dashed "guesses", not as rays
    const hyp = [
      { at: 1.8, label: 'eğri mi?', lx: 330, ly: 250, path: (() => { const p = []; for (let i = 0; i <= 60; i++) { const u = i / 60; p.push([C[0] - 70 - u * 420, C[1] - 40 - u * 170 + Math.sin(u * 12) * 30]); } return p; })() },
      { at: 3.0, label: 'düz mü?', lx: 1500, ly: 240, path: P.bez([C[0] + 70, C[1] - 40], [C[0] + 280, C[1] - 150], [C[0] + 490, C[1] - 260], 30) },
      { at: 4.6, label: 'tek yöne mi?', lx: 400, ly: 780, path: P.bez([C[0] - 70, C[1] + 50], [C[0] - 250, C[1] + 130], [C[0] - 430, C[1] + 210], 30) }
    ];
    hyp.forEach((h, i) => {
      const k = E.se(t, sq + h.at, sq + h.at + 1.0); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, P.partial(h.path, k), { w: 3, on: 12, off: 9 }); ctx.restore();
      if (k > 0.95) arrowHead(ctx, h.path[h.path.length - 3], h.path[h.path.length - 1], 16, { w: 3 });
      P.write(ctx, h.label, h.lx, h.ly, E.seg(t, sq + h.at + 0.5, sq + h.at + 1.3), { size: 50, align: 'center' });
    });
    // "her yöne mi?" : a fan of dashed guesses
    const kf = E.se(t, sq + 5.8, sq + 6.8);
    if (kf > 0) {
      for (let i = 0; i < 5; i++) { const a = 0.15 + i * 0.28; const p = [[C[0] + Math.cos(a) * 80, C[1] + Math.sin(a) * 80], [C[0] + Math.cos(a) * (80 + 300 * kf), C[1] + Math.sin(a) * (80 + 300 * kf)]]; ctx.save(); ctx.globalAlpha = 0.8; dashed(ctx, p, { w: 3, on: 12, off: 9 }); ctx.restore(); if (kf > 0.95) arrowHead(ctx, p[0], p[1], 14, { w: 3 }); }
      P.write(ctx, 'her yöne mi?', 1430, 800, E.seg(t, sq + 6.3, sq + 7.1), { size: 50, align: 'center' });
    }
    // big question mark
    const qk = E.se(t, sq + 0.3, sq + 1.3);
    if (qk > 0) { P.drawOn(ctx, P.arc(900, 230, 40, Math.PI * 1.1, Math.PI * 2.45, 30).concat([[914, 298], [902, 326]]), qk, { w: 10, color: '#8A4A10' }); if (qk > 0.95) INK.inkDot(ctx, 902, 360, 8, { color: '138,74,16' }); }
    DAMLA.draw(ctx, { x: 1700, y: 900, s: 1.1, view: 'q3', flip: true, expr: 'thinking', look: [-0.6, -0.5], blink: E.blink(t, 5), squash: E.breath(t), arms: [[-1, 0.3], [1, [30, -86]]], t, seed: 2 });
  }

  function safety(ctx, t) {
    const ss = E.s('safety');
    DAMLA.draw(ctx, { x: 330, y: 880, s: 1.5, view: 'q3', expr: 'neutral', blink: 1, handR: 15, arms: [[-1, [-34, -128]], [1, [2, -126]]], squash: E.breath(t), t, seed: 1 });
    const k = E.se(t, ss + 0.2, ss + 0.9, 'out');
    ctx.save(); ctx.translate((1 - k) * 900, 0);
    const card = F.card(ctx, 720, 170, 1080, 700, { color: RED, seed: 88, w: 3 });
    line(ctx, [730, 250], [1790, 242], { w: 3, color: RED, dry: false });
    ctx.font = '700 48px Kalam'; ctx.fillStyle = RED; ctx.textAlign = 'center'; ctx.fillText('⚠  GÖZ SAĞLIĞI', 1260, 228);
    const icons = [
      ['Güneş', 900, c => P.sun(c, 900, 450, 70, t, { cells: false, nrays: 14, glow: false })],
      ['lazer ışığı', 1260, c => { const b = [[1170, 470], [1300, 430], [1308, 452], [1178, 492], [1170, 470]]; P.fillPts(c, b, '#7FA0B3'); stroke(c, b, { w: 2.6, closed: true }); line(c, [1306, 441], [1370, 421], { w: 4, color: RED, dry: false }); }],
      ['güçlü fener', 1620, c => { F.flashlight(c, 1650, 450, 0, 0.8, 1); F.glow(c, 1660, 450, 60, 1); }]
    ];
    icons.forEach(([name, x, fn], i) => {
      const a = ss + 1.0 + i * 1.1, ki = E.se(t, a, a + 0.6, 'out'); if (ki <= 0) return;
      ctx.save(); ctx.globalAlpha = ki; fn(ctx); ctx.restore();
      P.cross(ctx, x, 450, 95, E.se(t, a + 0.4, a + 0.9), { w: 12, color: RED });
      P.write(ctx, name, x, 620, ki, { size: 44, align: 'center' });
    });
    P.write(ctx, 'Asla doğrudan bakma!', 1260, 760, E.seg(t, ss + 4.4, ss + 5.6), { size: 64, align: 'center', color: RED });
    ctx.restore();
  }

  E.scene({
    name: 'Işık kaynakları', concept: 'Doğal ve yapay ışık kaynakları; soru; güvenlik', from: 'sources', to: 'safety', trFrom: [470, 600],
    draw(ctx, t) {
      const sq = E.s('question'), ss = E.s('safety');
      const a1 = 1 - E.se(t, sq - 0.4, sq + 0.3), a2 = Math.min(E.se(t, sq - 0.1, sq + 0.6), 1 - E.se(t, ss - 0.4, ss + 0.3)), a3 = E.se(t, ss - 0.1, ss + 0.5);
      E.layer(ctx, a1, c => sources(c, t));
      E.layer(ctx, a2, c => question(c, t));
      E.layer(ctx, a3, c => safety(c, t));
    }
  });
})();

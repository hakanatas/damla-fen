// SAHNE 3 — Deney tasarımı (a): soru, malzemeler, yöntem, değişkenler (değiştirilen / ölçülen / sabit tutulan)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = G16;
  const ICONS = {
    buz(c, x, y) { const q = [[x - 32, y - 32], [x + 30, y - 35], [x + 33, y + 30], [x - 30, y + 33], [x - 32, y - 32]]; P.fillPts(c, q, '#F2F7FA'); wash(c, q, F.COLD, 0.45, 2401, { bleed: 0.6, blooms: 0 }); stroke(c, q, { w: 2.4, closed: true, seed: 2402 }); },
    beher(c, x, y) { F.beaker(c, x, y + 40, 80, 90, { level: 0.4, t: 0 }); },
    'ısıtıcı'(c, x, y) { F.heater(c, x, y - 10, 110, 0, 0); },
    termometre(c, x, y) { F.miniThermo(c, x, y - 50, y + 26, 30, { min: -20, max: 110 }); },
    kronometre(c, x, y) { P.icon.clock(c, x, y, 0.5, 1.2); }
  };
  E.scene({
    name: 'Deney tasarımı', concept: 'Soru, malzeme, yöntem ve değişkenler', from: 'design', to: 'vars', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('design'), st = E.s('tools'), sv = E.s('vars');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 810);
      P.write(ctx, 'Deney planım', 290, 205, E.seg(t, sd + 0.2, sd + 1.0), { size: 56, color: F.AMBER });
      P.write(ctx, 'Soru:', 290, 290, E.seg(t, sd + 1.0, sd + 1.6), { size: 44, color: F.AMBER });
      P.write(ctx, 'Suyun erime, donma ve kaynama noktası kaçtır?', 410, 290, E.seg(t, sd + 1.4, sd + 3.6), { size: 44 });
      // malzemeler
      if (t > st) {
        P.write(ctx, 'Malzemeler:', 290, 380, E.seg(t, st + 0.1, st + 0.8), { size: 44, color: F.AMBER });
        Object.keys(ICONS).forEach((name, i) => {
          const at = st + 0.6 + i * 0.6, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 360 + i * 230, y = 500;
          ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-x, -y); ICONS[name](ctx, x, y); ctx.restore();
          INK.label(ctx, name, x, 600, { size: 32, weight: 700, align: 'center', alpha: k, rot: 0 });
        });
        P.write(ctx, 'Yöntem: her dakika sıcaklığı ölç, tabloya yaz.', 290, 680, E.seg(t, st + 4.0, st + 6.0), { size: 42 });
      }
      // değişkenler kartı
      const vk = E.se(t, sv + 0.2, sv + 0.9, 'out');
      if (vk > 0) {
        ctx.save(); ctx.translate((1 - vk) * 700, 0);
        F.card(ctx, 1380, 330, 360, 400, { fill: '#F6E7B8', seed: 2410 });
        INK.label(ctx, 'Değişkenler', 1560, 390, { size: 42, weight: 700, align: 'center', color: F.AMBER });
        [['değiştirilen:', 'süre', sv + 0.8], ['ölçülen:', 'sıcaklık', sv + 2.4], ['sabit:', 'ısıtıcı ayarı', sv + 4.2]].forEach(([a, b, at], i) => {
          const y = 460 + i * 90;
          P.write(ctx, a, 1410, y, E.seg(t, at, at + 0.7), { size: 32, weight: 400 });
          P.write(ctx, b, 1410, y + 40, E.seg(t, at + 0.5, at + 1.2), { size: 38, color: i === 1 ? F.HEAT : PAL.ink });
        });
        ctx.restore();
      }
      DAMLA.draw(ctx, {
        x: 1765, y: 1060, s: 0.9, view: 'q3', flip: true, t, seed: 3, blink: E.blink(t, 8), squash: E.breath(t), talk: E.talk(t),
        expr: 'determined', look: [-0.7, -0.5], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.1]], prop: 'notebook'
      });
    }
  });
})();

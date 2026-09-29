// SAHNE 3 — Güvenlik (yalnızca pil, kısa devre yok, ince tel ısınabilir, yetişkin) · Deney tasarımı (FB.6.6.2 a)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function hotWire(ctx, t) {
    stroke(ctx, [[-50, 10], [50, 10]], { w: 3, color: F20.NICR, dry: false, taper: 0 });
    for (let i = 0; i < 3; i++) { const x = -24 + i * 24, ph = t * 3 + i; line(ctx, [x, -2], [x + 6 * Math.sin(ph), -44], { w: 3, color: '#B5553F', dry: false, bend: 0.2 * Math.sin(ph + 1) }); }
  }
  E.scene({
    name: 'Güvenlik', concept: 'Elektrikle güvenli deney', from: 'safety', to: 'safety', trFrom: [960, 540],
    draw(ctx, t) {
      const s1 = E.s('safety');
      ctx.save();
      CK.table(ctx, 860);
      DAMLA.draw(ctx, { x: 420, y: 862, s: 1.4, view: 'q3', expr: 'determined', look: [0.7, -0.2], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.6 + 0.1 * Math.sin(t * 3)]] });
      const kb = E.se(t, s1 + 0.1, s1 + 0.6, 'out');
      if (kb > 0) { P.bubble(ctx, 560, 300, 150, 150, [470, 480], kb, 7); INK.label(ctx, '!', 560, 340, { size: 110, weight: 700, color: CK.RED, align: 'center', alpha: kb }); }
      ctx.restore();
      const kc = E.se(t, s1 + 0.3, s1 + 1.0, 'out');
      ctx.save(); ctx.translate((1 - kc) * 900, 0);
      CK.safetyCard(ctx, t, s1 + 0.8, 870, 150, {
        w: 920, h: 700, gap: 190,
        items: [
          { icon: c => CK.battery(c, 0, 0, 0.55), mark: 'ok', a: 'Yalnızca pil kullan. Prize dokunma!', at: 0 },
          { icon: CK.shortIcon, mark: 'x', a: 'Pilin iki ucunu tek kabloyla', b: 'birleştirme! (kısa devre)', red: true, at: 2.2 },
          { icon: hotWire, a: 'İnce teller ısınabilir.', b: 'Bir yetişkin eşliğinde çalış.', at: 4.6 }
        ]
      });
      ctx.restore();
    }
  });

  E.scene({
    name: 'Tasarım', concept: 'Değişkenleri belirleme, deney tasarlama', from: 'design', to: 'design', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('design');
      ctx.save();
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 80, 1620, 900);
      P.write(ctx, 'Deney planım', 290, 215, E.seg(t, sd + 0.2, sd + 1.2), { size: 58 });
      const rows = [
        ['Değiştirdiğim (bağımsız değişken):', 'her seferinde yalnızca bir özelliği', 'telin uzunluğu · kesit alanı · cinsi'],
        ['Aynı tuttuğum (kontrol edilen):', 'aynı pil, aynı ampul, aynı kablolar', null],
        ['Gözlediğim (bağımlı değişken):', 'ampulün parlaklığı', null]
      ];
      rows.forEach(([a, b, c2], i) => {
        const at = sd + 1.0 + i * 1.8, y = 320 + i * 190, k = E.se(t, at, at + 0.5); if (k <= 0) return;
        INK.label(ctx, a, 300, y, { size: 42, weight: 700, color: '#8A4A10', alpha: k });
        P.write(ctx, b, 330, y + 58, E.seg(t, at + 0.3, at + 1.5), { size: 40 });
        if (c2) P.write(ctx, c2, 330, y + 112, E.seg(t, at + 1.0, at + 2.2), { size: 38, color: PAL.water });
      });
      DAMLA.draw(ctx, { x: 1560, y: 860, s: 1.0, view: 'q3', flip: true, expr: 'determined', look: [-0.8, -0.3], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 3, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
      ctx.restore();
    }
  });
})();

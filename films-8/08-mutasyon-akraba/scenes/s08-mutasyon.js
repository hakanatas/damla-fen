// SAHNE 8 — Mutasyon nedir? Nedenleri (FB.8.3.7 b)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F808;
  E.scene({
    name: 'Mutasyon', concept: 'DNA’da kalıcı değişiklik; nedenleri', from: 'define', to: 'causes', trFrom: [460, 540],
    draw(ctx, t) {
      const sd = E.s('define'), sc = E.s('causes');
      F.warmBg(ctx);
      const mk = E.se(t, sd + 2.0, sd + 3.2);
      F.dna(ctx, 420, 190, 680, t, { mut: 6, mk, to: 'G', seq: 'ATGCTTACAGCA', amp: 80 });
      if (mk > 0) { ctx.save(); ctx.globalAlpha *= E.se(t, sd + 3.0, sd + 3.8) * (1 - E.se(t, sc - 0.4, sc + 0.2)); P.arrow(ctx, [720, 480], [540, 486], E.se(t, sd + 3.0, sd + 3.8), { w: 3, color: F.HEAT, bend: 10 }); ctx.restore(); }
      E.inkText(ctx, 'kalıcı değişiklik', 735, 492, t, sd + 3.4, sc + 0.2, { size: 48, color: F.HEAT });
      E.inkText(ctx, '= MUTASYON', 735, 560, t, sd + 4.2, sc + 0.2, { size: 60 });
      // beyaz sincap: renk geni
      const wk = Math.min(E.se(t, sd + 5.2, sd + 6.0, 'out'), 1 - E.se(t, sc - 0.3, sc + 0.3));
      if (wk > 0) E.layer(ctx, wk, c => {
        F.squirrel(c, 1480, 820, 1.0, null, { t, albino: true });
        F.fit(c, 'renk maddesi üretiminde görev', 1480, 390, 560, 38, { weight: 400 });
        F.fit(c, 'alan bir gende mutasyon', 1480, 440, 560, 42);
      });
      // nedenler
      const CAUSES = [
        ['kendiliğinden', 'DNA eşlenirken hata', c => { F.dna(c, 0, -80, 150, t, { amp: 26, seq: 'ATGCA', mut: 2, mk: 1, to: 'T' }); }],
        ['radyasyon', 'ör. X ışını', c => F.radiation(c, 0, 0, 0.9)],
        ['aşırı güneş ışığı', 'mor ötesi (UV) ışınlar', c => P.sun(c, 0, 0, 52, t, { nrays: 16, cells: false })],
        ['bazı kimyasallar', 'ör. sigara dumanındaki maddeler', c => F.bottle(c, 0, 0, 0.95)]
      ];
      CAUSES.forEach(([h, sub, fn], i) => {
        const at = sc + 0.6 + i * 1.4, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const cx = 960 + (i % 2) * 460, cy = 330 + Math.floor(i / 2) * 330;
        E.layer(ctx, k, c => {
          F.card(c, cx - 200, cy - 140, 400, 300, 4200 + i, { tint: i ? F.HEAT : null, tintA: 0.06 });
          c.save(); c.translate(cx, cy - 30); fn(c); c.restore();
          F.fit(c, h, cx, cy + 90, 370, 42, { color: i ? F.HEAT : PAL.ink });
          F.fit(c, sub, cx, cy + 136, 370, 30, { weight: 400 });
        });
      });
      E.inkText(ctx, 'Radyasyon, aşırı güneş ışığı ve bazı kimyasallar olasılığı artırır.', 1190, 885, t, sc + 6.2, 1e9, { size: 38, align: 'center', color: F.HEAT });
    }
  });
})();

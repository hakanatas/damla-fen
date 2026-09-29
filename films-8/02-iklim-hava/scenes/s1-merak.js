// SAHNE 1 — Merak: hava çabuk değişir; sorular (E3.8); sıcaklık rekorları
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F82;
  E.scene({
    name: 'Merak', concept: 'Soru sorma', from: 'title', to: 'records',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('q'), sr = E.s('records');
      const hill = P.hillLine(E.W, 930);
      const dk = E.se(t, sh + 1.5, sh + 5);
      // gökyüzü kararıyor
      ctx.save(); ctx.globalAlpha = 0.25 * dk; ctx.fillStyle = '#5A6272'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      F.sunIcon(ctx, 1640, 300, 70, t);
      const cx = E.lerp(2300, 1520, E.se(t, sh + 0.5, sh + 4.5, 'out'));
      F.cloud(ctx, cx, 280, 1.2, 101, { dark: dk });
      F.cloud(ctx, cx + 380, 360, 0.8, 105, { dark: dk });
      // yağmur
      const rk = E.se(t, sh + 4.2, sh + 5.2);
      if (rk > 0) { const R = INK.rng(7); for (let i = 0; i < 70; i++) { const x = cx - 230 + R() * 700, ph = (t * 1.5 + R()) % 1, y = 380 + ph * 520; if (y > P.hillY(hill, x) - 8) continue; line(ctx, [x, y], [x - 7, y + 24], { w: 2, color: PAL.water, dry: false, alpha: 0.7 * rk, seed: 110 + i }); } }
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1760, P.hillY(hill, 1760) + 6] });
      const dx = 560, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.3, view: 'q3', expr: t > sq ? 'thinking' : t > sh + 4 ? 'surprised' : 'happy', look: [0.9, -0.7], blink: E.blink(t, 2), squash: E.breath(t), t, seed: 1,
        arms: t > sq ? [[-1, 0.35], [1, [40, -150], 0.4]] : [[-1, 0.35], [1, 0.35 + 2.0 * E.se(t, sh + 4.4, sh + 5.0)]] });
      // soru balonu
      const bk = E.se(t, sq + 0.3, sq + 1.1, 'out') * (1 - E.se(t, sr - 0.3, sr + 0.2));
      if (bk > 0) {
        P.bubble(ctx, 900, 360, 820, 280, [640, 690], bk, 3);
        if (bk > 0.9) {
          P.write(ctx, 'Yağmur, kar, dolu nasıl oluşur?', 900, 330, E.seg(t, sq + 0.9, sq + 2.2), { size: 48, align: 'center' });
          P.write(ctx, 'Hava ile iklim aynı şey mi?', 900, 410, E.seg(t, sq + 2.6, sq + 3.8), { size: 48, align: 'center' });
        }
      }
      // rekorlar kartı
      const ck = E.se(t, sr + 0.2, sr + 0.9);
      F.fade(ctx, ck, c => {
        F.card(c, 330, 175, 1260, 690, { seed: 120 });
        INK.label(c, 'Ölçülmüş sıcaklık rekorları', 960, 250, { size: 50, weight: 700, align: 'center', color: F.BROWN });
        const rows = [
          ['Dünya’da en yüksek: 56,7 °C', 'Death Valley (ABD), 1913', 0.95, F.HEAT],
          ['Dünya’da en düşük: −89,2 °C', 'Vostok İstasyonu (Antarktika), 1983', 0.05, PAL.water],
          ['Ülkemizde en düşük: −46,4 °C', 'Çaldıran (Van), 1990', 0.25, PAL.water]
        ];
        rows.forEach((r, i) => {
          const k = E.se(t, sr + 0.8 + i * 2.2, sr + 1.4 + i * 2.2); if (k <= 0) return;
          const y = 390 + i * 150;
          c.save(); c.globalAlpha *= k;
          F.thermo(c, 460, y + 20, 120, r[2], { color: r[3] });
          INK.label(c, r[0], 530, y - 20, { size: 46, weight: 700 });
          INK.label(c, r[1], 530, y + 28, { size: 34, alpha: 0.7 });
          c.restore();
        });
        F.lbl(c, 'Ülkemizde en yüksek değer kaç? → Araştır!', 960, 835, E.se(t, sr + 7.2, sr + 7.9), { size: 36, align: 'center', color: PAL.water, weight: 700 });
      });
      F.title(ctx, t, E.e('title') + 1.4, '2', 'İklim ve Hava Olayları', 1);
    }
  });
})();

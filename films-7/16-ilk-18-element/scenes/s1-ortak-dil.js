// SAHNE 1 — Ortak dil sorunu: farklı dillerde element adları → uluslararası sembol (FB.7.5.5)
(function () {
  const { PAL, stroke } = INK;
  const F = F7M;
  const LANG = [['oksijen', 'Türkçe', 820, 300], ['oxygen', 'İngilizce', 1500, 290], ['Sauerstoff', 'Almanca', 820, 640], ['oxygène', 'Fransızca', 1500, 650]];
  E.scene({
    name: 'Ortak dil', concept: 'Element sembolleri', from: 'title', to: 'symbol',
    draw(ctx, t) {
      const sh = E.s('hello'), sl = E.s('lang'), ss = E.s('symbol');
      F.desk(ctx, 880, 2);
      const conv = E.se(t, ss + 0.2, ss + 1.6, 'io');
      LANG.forEach(([w, lang, x, y], i) => {
        const k = E.se(t, sh + 1.8 + i * 0.9, sh + 2.4 + i * 0.9, 'out'); if (k <= 0) return;
        const cx = E.lerp(x, 1160, conv), cy = E.lerp(y, 470, conv), a = k * (1 - conv);
        if (a <= 0.01) return;
        E.layer(ctx, a, c => {
          F.card(c, cx - 170, cy - 75, cx + 170, cy + 75, { seed: 1000 + i });
          F.txt(c, w, cx, cy + 5, { size: 52, align: 'center' });
          F.txt(c, lang, cx, cy + 52, { size: 30, align: 'center', alpha: 0.65, weight: 400 });
        });
      });
      const qk = Math.min(E.se(t, sl + 2.5, sl + 3.2), 1 - E.se(t, ss, ss + 0.5));
      if (qk > 0) INK.label(ctx, '?', 1160, 510, { size: 150, weight: 700, color: F.BR, alpha: qk, align: 'center' });
      const ok = E.se(t, ss + 1.3, ss + 2.0, 'out');
      if (ok > 0) {
        const s = 260 * P.pop(ok);
        F.tile(ctx, 1160 - s / 2, 470 - s / 2, s, s, 'O', 8, 'oksijen', { tint: PAL.water, tintA: 0.18, lw: 3 });
        P.write(ctx, 'her dilde aynı sembol', 1160, 700, E.seg(t, ss + 2.2, ss + 3.2), { size: 48, align: 'center', color: PAL.water });
      }
      F.damla(ctx, t, { x: 330, y: 880, s: 1.3, view: 'q3', expr: t > ss + 2 ? 'happy' : (t > sl ? 'thinking' : 'curious'), look: [0.8, -0.2], seed: 2, arms: t > sl && t < ss ? [[-1, 0.35], [1, [40, -150]]] : [[-1, 0.35], [1, 1.9]] });
      F.title(ctx, t, '16 · İlk 18 Element ve Periyodik Tablo');
    }
  });
})();

// SAHNE 2 — Ortak dil: her dilde farklı ad, bilim dünyasında tek formül (E3.7)
(function () {
  const { PAL, line, stroke } = INK;
  const K = K7;
  const TAGS = [['su', 'Türkçe', 470, 330], ['water', 'İngilizce', 1450, 330], ['eau', 'Fransızca', 420, 600], ['Wasser', 'Almanca', 1500, 600]];
  E.scene({
    name: 'Ortak dil', concept: 'Formül: bilimin ortak dili', from: 'lang', to: 'common', trFrom: [960, 600],
    draw(ctx, t) {
      const sl = E.s('lang'), sc = E.s('common');
      K.bench(ctx, -40, 1960, 880, 3010);
      K.beaker(ctx, 960, 880, 240, 280, { level: 0.7, t, seed: 3 });
      const conv = E.se(t, sc + 0.3, sc + 2.0);
      TAGS.forEach((g, i) => {
        const at = sl + 0.5 + i * 1.1, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const x = E.lerp(g[2], E.lerp(g[2], 960, 0.35), conv), y = E.lerp(g[3], E.lerp(g[3], 470, 0.25), conv);
        E.layer(ctx, k * (1 - 0.55 * conv), c => {
          c.save(); c.font = '700 62px Kalam'; const w = c.measureText(g[0]).width + 70; c.restore();
          K.card(c, x - w / 2, y - 70, w, 110, { seed: 3100 + i });
          INK.label(c, g[0], x, y + 4, { size: 62, weight: 700, align: 'center' });
          INK.label(c, g[1], x, y + 80, { size: 32, align: 'center', alpha: 0.65 });
          P.arrow(c, [x + (x < 960 ? 80 : -80), y + 40], [x < 960 ? 840 : 1080, 640], E.se(t, at + 0.3, at + 0.9), { w: 2.4, head: 11, bend: -20 });
        });
      });
      // büyük formül
      const fk = E.seg(t, sc + 2.0, sc + 3.2);
      if (fk > 0) {
        const g = ctx.createRadialGradient(960, 420, 20, 960, 420, 300); g.addColorStop(0, `rgba(227,160,58,${0.22 * fk})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(560, 180, 800, 480);
        K.formula(ctx, 'H2O', 960, 470, 190, { align: 'center', k: fk, subColor: K.SUB });
        if (t > sc + 3.2) P.drawOn(ctx, P.bez([800, 505], [960, 515], [1120, 500], 24), E.se(t, sc + 3.2, sc + 3.8), { w: 4, color: PAL.light });
        E.inkText(ctx, 'formül', 960, 270, t, sc + 3.4, 1e9, { size: 46, align: 'center', color: K.AMBER });
      }
      F17.damla(ctx, t, { x: 210, y: 870, s: 1.2, look: [0.8, -0.3], expr: t > sc + 2.5 ? 'happy' : 'curious', arms: t > sc + 2.2 ? [[-1, 0.35], [1, [60, -110]]] : [[-1, 0.35], [1, 0.4]] });
    }
  });
})();

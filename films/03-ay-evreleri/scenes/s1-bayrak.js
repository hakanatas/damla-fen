// SAHNE 1 — Türk bayrağındaki hilal (D19.2) → Ay hep bu şekilde mi görünür? Tahmin.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  // akşam gökyüzü (s1 ve s8 kullanır)
  F03.dusk = (ctx, t, k = 1) => {
    const g = ctx.createLinearGradient(0, 0, 0, E.H);
    g.addColorStop(0, `rgba(36,46,86,${0.55 * k})`); g.addColorStop(0.6, `rgba(120,100,120,${0.25 * k})`); g.addColorStop(0.85, `rgba(227,150,70,${0.3 * k})`);
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(-300, -300, E.W + 600, E.H + 600); ctx.restore();
    const sg = ctx.createRadialGradient(1700, 900, 30, 1700, 900, 600); sg.addColorStop(0, `rgba(240,160,70,${0.5 * k})`); sg.addColorStop(1, 'rgba(240,160,70,0)');
    ctx.save(); ctx.fillStyle = sg; ctx.fillRect(1000, 300, 1000, 800); ctx.restore();
  };
  E.scene({
    name: 'Bayraktaki hilal', concept: 'Merak: Ay hep hilal mi görünür? Tahmin', from: 'title', to: 'predict',
    draw(ctx, t) {
      const sf = E.s('flag'), sp = E.s('predict');
      const hill = P.hillLine(E.W);
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * E.se(t, 0, E.e('predict'), 'sine'), y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('predict'), 'sine') });
      F03.dusk(ctx, t);
      F03.stars(ctx, t, E.se(t, 2, 8) * 0.8, { n: 26, seed: 31, area: [0, 0, E.W, 520], avoid: [[1350, 300, 110], [960, 250, 520]] });
      // akşamüstü batıda hilal: aydınlık yanı batmış Güneş'e (sağ alta) dönük
      const mg = ctx.createRadialGradient(1350, 300, 30, 1350, 300, 160); mg.addColorStop(0, 'rgba(251,246,226,0.35)'); mg.addColorStop(1, 'rgba(251,246,226,0)');
      ctx.fillStyle = mg; ctx.fillRect(1150, 100, 400, 400);
      F03.phaseMoon(ctx, 1350, 300, 60, 0.75, { rot: 0.55, litOnly: true, dark: '#4E5274' });
      P.landscape(ctx, E.W, E.H, t, { hill, tree: false });
      F03.flag(ctx, 270, 250, 200, t);
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      const lookFlag = t < sf + 3.6;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'q3', flip: lookFlag, expr: t >= sp ? 'thinking' : 'curious', look: lookFlag ? [0.7, -0.6] : [0.8, -0.7],
        blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: t < sf + 0.6 ? [[-1, 0.35], [1, 0.35]] : (lookFlag ? [[-1, 0.35], [1, 2.2]] : (t < sp ? [[-1, 0.35], [1, 2.5]] : [[-1, 0.3], [1, [30, -86]]])) });
      ctx.restore();
      // hilal etiketleri
      const kf = E.se(t, sf + 1.2, sf + 2.0);
      if (kf > 0 && t < sp + 0.5) { ctx.save(); ctx.globalAlpha = kf * (1 - E.se(t, sp, sp + 0.5)); INK.label(ctx, 'hilal', 420, 560, { size: 42, weight: 700 }); INK.leader(ctx, [410, 540], [330, 440], { w: 2, bend: 0.2 }); ctx.restore(); }
      if (t > sf + 3.8 && t < sp + 0.5) E.inkText(ctx, 'Ay hep böyle mi?', 1350, 440, t, sf + 3.8, sp + 0.5, { size: 46, align: 'center', color: '#FBF3DC' });
      // tahmin balonu
      const kb = E.se(t, sp + 0.5, sp + 1.1, 'out');
      if (kb > 0) {
        P.bubble(ctx, 1320, 560, 640, 250, [940, 600], kb, 5);
        if (kb > 0.6) {
          [[0.9, 1130], [1.57, 1270], [3.14, 1410]].forEach(([e, x], i) => { const k = E.se(t, sp + 1.2 + i * 0.8, sp + 1.7 + i * 0.8, 'out'); if (k > 0) { ctx.save(); ctx.globalAlpha = k; F03.phaseMoon(ctx, x, 545, 50, e); ctx.restore(); } });
          if (t > sp + 3.8) INK.label(ctx, '?', 1540, 575, { size: 110, weight: 700, alpha: E.se(t, sp + 3.8, sp + 4.3) });
          P.write(ctx, 'bazen ince, bazen yuvarlak', 1300, 650, E.seg(t, sp + 4.4, sp + 5.8), { size: 34, align: 'center' });
        }
      }
      F03.title(ctx, t, E.e('title') + 1.4, 3, 'Ay’ın Evreleri');
    }
  });
})();

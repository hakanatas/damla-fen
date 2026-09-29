// SAHNE 3 — Model önerme (FB.5.1.3 a): ilk model "Dünya'nın gölgesi" (yaygın kavram yanılgısı)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  // Güneş - Dünya - gölge - Ay çizimi (s3 ve s4 kullanır). sc: ölçek, origin (ox,oy)
  F03.shadowModel = (ctx, t, ox, oy, sc, k = 1, o = {}) => {
    ctx.save(); ctx.translate(ox, oy); ctx.scale(sc, sc);
    P.sun(ctx, -560, 0, 150, t, { nrays: 16, cells: false, glow: false });
    const ex = 0, er = 70;
    // gölge konisi (Güneş'in ters yönünde)
    const L = 700 * k;
    const cone = [[ex, -er], [ex + L, -er * (1 - 0.35 * k)], [ex + L, er * (1 - 0.35 * k)], [ex, er]];
    P.fillPts(ctx, cone, '#262A40', 0.55);
    for (let i = -1; i <= 1; i++) P.arrow(ctx, [-390, i * 50], [-90, i * 40], 1, { w: 3, color: '#C07F1E', bend: 0, head: 12 });
    P.earth(ctx, ex, 0, er);
    if (o.moon !== false) {
      const mx = 470, my = -52, mr = 48;
      P.moon(ctx, mx, my, mr);
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, mr * 1.01, 0, 7); ctx.clip(); P.fillPts(ctx, cone, '#1E2236', 0.8); ctx.restore();
      INK.label(ctx, 'Ay', mx, my - 70, { size: 38, weight: 700, align: 'center' });
    }
    if (o.labels !== false) {
      INK.label(ctx, 'Dünya', ex, 120, { size: 38, weight: 700, align: 'center' });
      INK.label(ctx, 'Dünya’nın gölgesi', 330, 130, { size: 34, align: 'center', alpha: 0.85 });
      INK.label(ctx, 'Güneş', -560, 210, { size: 38, weight: 700, align: 'center' });
    }
    ctx.restore();
  };
  E.scene({
    name: 'Model 1', concept: 'Model önerme: Dünya\'nın gölgesi modeli', from: 'why', to: 'model1', trFrom: [960, 540],
    draw(ctx, t) {
      const sw = E.s('why'), sm = E.s('model1');
      ctx.save(); ctx.fillStyle = 'rgba(30,38,72,0.08)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // why: Damla düşünür, soru işareti
      const dA = 1 - E.se(t, sm - 0.3, sm + 0.4);
      if (dA > 0) E.layer(ctx, dA, c => {
        DAMLA.draw(c, { x: 960, y: 820, s: 1.6, view: 'front', expr: 'thinking', look: [-0.4, -0.7], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.3], [1, [30, -86]]] });
        const k = E.se(t, sw + 0.4, sw + 1.4);
        c.save(); c.globalAlpha = 0.9; P.drawOn(c, P.arc(960, 220, 40, Math.PI * 1.1, Math.PI * 2.45, 30).concat([[974, 288], [962, 316]]), k, { w: 10 }); if (k > 0.95) INK.inkDot(c, 962, 350, 8); c.restore();
        P.write(c, 'Model öner', 1330, 400, E.seg(t, sw + 1.6, sw + 2.6), { size: 60, color: '#8A4A10' });
      });
      const mA = E.se(t, sm - 0.2, sm + 0.6);
      if (mA > 0) E.layer(ctx, mA, c => {
        P.write(c, 'Model 1: Dünya’nın gölgesi Ay’ı örtüyor', 960, 230, E.seg(t, sm + 0.2, sm + 1.8), { size: 54, align: 'center' });
        F03.shadowModel(c, t, 960, 560, 1, E.se(t, sm + 1.6, sm + 3.2));
        INK.label(c, '(çizim ölçekli değildir)', 960, 880, { size: 28, alpha: 0.6, align: 'center' });
        DAMLA.draw(c, { x: 1720, y: 860, s: 0.8, view: 'q3', flip: true, expr: 'determined', look: [-0.8, -0.2], blink: E.blink(t, 3), t, seed: 1, arms: [[-1, 0.4], [1, 2.3]] });
      });
    }
  });
})();

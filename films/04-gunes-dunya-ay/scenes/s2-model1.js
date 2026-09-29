// SAHNE 2 — İlk model (öneri): üç benzer boy top → gerçek büyüklükler? veri topla (bilimsel kaynaklar)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  E.scene({
    name: 'Model 1', concept: 'Model önerme; veri toplama ihtiyacı', from: 'model1', to: 'data-q', trFrom: [960, 600],
    draw(ctx, t) {
      const sm = E.s('model1'), sd = E.s('data-q');
      ctx.fillStyle = 'rgba(138,106,69,0.18)'; ctx.fillRect(0, 0, E.W, E.H);
      // masa
      const desk = [[0, 760], [E.W, 740], [E.W, E.H], [0, E.H]]; P.fillPts(ctx, desk, '#C9A77A', 0.55); stroke(ctx, [[0, 760], [E.W, 740]], { w: 3 });
      // karton model
      const k = E.se(t, sm + 0.3, sm + 1.2, 'out');
      ctx.save(); ctx.globalAlpha = k;
      const base = [[380, 760], [1180, 752], [1220, 800], [340, 810], [380, 760]]; P.fillPts(ctx, base, '#B8925E', 0.9); stroke(ctx, base, { w: 2.6, closed: true });
      const balls = [[520, 'sun', 78], [800, 'earth', 70], [1030, 'moon', 62]];
      balls.forEach(([x, kind, r], i) => {
        const kb = E.se(t, sm + 0.8 + i * 0.6, sm + 1.3 + i * 0.6, 'out'); if (kb <= 0) return;
        line(ctx, [x, 775], [x, 600], { w: 4, taper: 0.02, seed: 10 + i });
        const y = 600 - r * P.pop(kb) * 0.2 - r;
        if (kind === 'sun') P.sun(ctx, x, 540, r * P.pop(kb), t, { rays: false, glow: false, cells: false }); else if (kind === 'earth') P.earth(ctx, x, 540, r * P.pop(kb)); else P.moon(ctx, x, 540, r * P.pop(kb));
        INK.label(ctx, ['Güneş', 'Dünya', 'Ay'][i], x, 420, { size: 38, weight: 700, align: 'center' });
      });
      ctx.restore();
      P.write(ctx, 'Model 1', 780, 250, E.seg(t, sm + 0.3, sm + 1.2), { size: 62, align: 'center' });
      if (t > sm + 4.2) { const kk = E.se(t, sm + 4.2, sm + 5); ctx.save(); ctx.globalAlpha = kk; INK.label(ctx, 'neredeyse aynı boy?', 780, 330, { size: 44, align: 'center', color: '#8A4A10' }); ctx.restore(); }
      // veri topla: kaynaklar
      const kd = E.se(t, sd + 0.2, sd + 0.9, 'out');
      if (kd > 0) E.layer(ctx, kd, c => {
        F04.card(c, 1330, 200, 480, 480, { seed: 21 });
        P.icon.books(c, 1450, 330, 0.8); P.icon.laptop(c, 1680, 340, 0.75);
        P.write(c, 'Veri topla', 1570, 500, E.seg(t, sd + 0.8, sd + 1.8), { size: 52, align: 'center', color: '#8A4A10' });
        INK.label(c, 'bilimsel kaynaklar', 1570, 560, { size: 34, align: 'center', alpha: E.se(t, sd + 1.8, sd + 2.4) });
        INK.label(c, 'çap · hacim · uzaklık', 1570, 620, { size: 34, align: 'center', alpha: E.se(t, sd + 2.4, sd + 3.0) });
      });
      DAMLA.draw(ctx, { x: 1500, y: 1000, s: 1.1, view: 'q3', flip: true, expr: t > sm + 4 ? 'thinking' : 'happy', look: [-0.8, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2,
        arms: t > sm + 4 ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.4], [1, 2.2]] });
    }
  });
})();

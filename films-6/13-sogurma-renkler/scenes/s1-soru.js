// SAHNE 1 — Soru (köprü, TYMM FB.6.4.4: "Yaz aylarında açık renkli kıyafetler tercih edilmesinin nedeni ne olabilir?")
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  E.scene({
    name: 'Soru', concept: 'Yazın neden açık renk giyeriz?', from: 'title', to: 'hello',
    draw(ctx, t) {
      const hill = P.hillLine(E.W);
      const sh = E.s('hello');
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * E.se(t, 0, E.e('hello'), 'sine'), y: 540, z: 1 + 0.05 * E.se(t, 0, E.e('hello'), 'sine') });
      const g = ctx.createRadialGradient(1600, 250, 40, 1600, 250, 900); g.addColorStop(0, 'rgba(227,160,58,0.32)'); g.addColorStop(1, 'rgba(227,160,58,0)');
      ctx.fillStyle = g; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      P.sun(ctx, 1600, 250, 95, t, { nrays: 20 });
      P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [230, P.hillY(hill, 230) + 6] });
      // clothesline with a white and a black T-shirt
      const p1 = [1040, P.hillY(hill, 1040) + 4], p2 = [1640, P.hillY(hill, 1640) + 4];
      line(ctx, p1, [p1[0], 470], { w: 6, seed: 11, taper: 0.05 }); line(ctx, p2, [p2[0], 470], { w: 6, seed: 12, taper: 0.05 });
      const rope = P.bez([p1[0], 478], [1340, 520], [p2[0], 478], 30); stroke(ctx, rope, { w: 2.2, seed: 13, dry: false });
      const sway = Math.sin(t * 1.3) * 0.03;
      [[1200, F.OBJ.white], [1480, F.OBJ.black]].forEach(([x, c], i) => {
        const y = 510 + (i ? 6 : 8) + 95 * 0.62;
        ctx.save(); ctx.translate(x, 500); ctx.rotate(sway * (i ? -1 : 1)); ctx.translate(-x, -500);
        F.tshirt(ctx, x, y, 0.62, c, i + 1);
        line(ctx, [x - 30, 505], [x - 30, 530], { w: 3, color: '#8A6A45', dry: false }); line(ctx, [x + 30, 505], [x + 30, 530], { w: 3, color: '#8A6A45', dry: false });
        ctx.restore();
      });
      // Damla
      const dx = 700, dy = P.hillY(hill, dx) + 4;
      const talking = t > sh;
      DAMLA.draw(ctx, {
        x: dx, y: dy, s: 1.4, view: 'q3', expr: talking && t > sh + 3 ? 'thinking' : 'curious', look: talking ? [0.8, -0.3] : [0.3, 0],
        blink: E.blink(t, 2), squash: E.breath(t), t, talk: E.talk(t), seed: 1,
        arms: talking && t > sh + 3 ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.35], [1, 0.35 + 1.9 * E.se(t, sh + 0.3, sh + 1)]]
      });
      // question bubble
      const qk = E.se(t, sh + 2.6, sh + 3.2, 'out');
      if (qk > 0) {
        ctx.save(); ctx.font = '700 44px Kalam'; const w = ctx.measureText('Neden açık renk?').width + 90; ctx.restore();
        P.bubble(ctx, 1340, 300, w, 130, [820, 560], qk, 4);
        if (qk > 0.6) P.write(ctx, 'Neden açık renk?', 1340, 316, E.seg(t, sh + 3.0, sh + 4.0), { size: 44, align: 'center' });
      }
      ctx.restore();

      // title card
      const t1 = E.e('title') + 1.4;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '13 · Renklerin Sırrı: Soğurma ve Renkler', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 6. sınıf · Ünite 4', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([600, 230], [960, 240], [1320, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();

// SAHNE 1 — Merak: sıcak çorbadaki metal ve tahta kaşık (günlük yaşamdan açık uçlu soru)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F20;
  E.scene({
    name: 'İki kaşık', concept: 'Merak: hangi kaşığın sapı ısınır?', from: 'title', to: 'question',
    draw(ctx, t) {
      const sh = E.s('hello'), sq = E.s('question');
      ctx.save();
      E.cam(ctx, E.camLerp({ x: 960, y: 560, z: 1 }, { x: 900, y: 560, z: 1.1 }, E.se(t, sq - 1, sq + 2)));
      // kitchen wall tiles
      ctx.fillStyle = 'rgba(160,130,95,0.12)'; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      ctx.save(); ctx.globalAlpha = 0.18; for (let x = 0; x < E.W; x += 110) line(ctx, [x, 0], [x + 2, 640], { w: 1.4, color: PAL.water, dry: false, seed: x }); for (let y = 40; y < 640; y += 110) line(ctx, [0, y], [E.W, y + 2], { w: 1.4, color: PAL.water, dry: false, seed: y + 7 }); ctx.restore();
      // counter
      const ct = [[-100, 640], [E.W + 100, 636], [E.W + 100, 1200], [-100, 1200]]; P.fillPts(ctx, ct, '#E3D3B3'); wash(ctx, ct, '#8A6A45', 0.3, 3201); line(ctx, [-100, 640], [E.W + 100, 636], { w: 4 });
      F.stove(ctx, 760, 640, 520, true, t);
      const heat = E.se(t, sq + 0.5, sq + 5);
      // spoons (behind the front of the pot)
      F.spoon(ctx, [700, 560], [560, 300], 'metal', heat, t);
      F.spoon(ctx, [820, 560], [960, 300], 'wood', heat * 0.12, t);
      F.pot(ctx, 760, 640, 380, 170, t);
      F.steam(ctx, 760, 470, 260, 120, 0.8, t, 3210);
      // labels
      if (t > sh + 1.5) { INK.label(ctx, 'metal kaşık', 470, 270, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sh + 1.5, sh + 2.2) }); INK.label(ctx, 'tahta kaşık', 1060, 270, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sh + 2.2, sh + 2.9) }); }
      if (t > sq + 3.5) {
        P.write(ctx, 'sapı ısındı!', 470, 215, E.seg(t, sq + 3.5, sq + 4.5), { size: 44, align: 'center', color: F.HEAT });
        P.write(ctx, 'pek ısınmadı', 1060, 215, E.seg(t, sq + 4.3, sq + 5.3), { size: 44, align: 'center', color: PAL.water });
      }
      // Damla
      const think = t > sq + 5.5;
      DAMLA.draw(ctx, {
        x: 1380, y: 900, s: 1.45, view: 'q3', flip: true, t, seed: 1, blink: E.blink(t, 2), squash: E.breath(t), talk: E.talk(t),
        expr: think ? 'thinking' : (t > sq ? 'surprised' : 'curious'), look: [-0.8, -0.4],
        arms: think ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.35], [1, 2.2 + Math.sin(t * 2) * 0.1]]
      });
      if (think) { const k = E.se(t, sq + 5.5, sq + 6.6); ctx.save(); ctx.globalAlpha = 0.9; P.drawOn(ctx, P.arc(1400, 380, 30, Math.PI * 1.1, Math.PI * 2.45, 30).concat([[1410, 432], [1402, 452]]), k, { w: 8 }); if (k > 0.95) INK.inkDot(ctx, 1402, 478, 6); ctx.restore(); }
      ctx.restore();
      // title
      const t1 = E.e('title') + 1.2;
      if (t < t1) { const a = 1 - E.se(t, t1 - 0.8, t1); ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.translate(960, 265); ctx.scale(1.9, 1); const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 430); g.addColorStop(0, 'rgba(241,234,219,1)'); g.addColorStop(0.55, 'rgba(241,234,219,0.9)'); g.addColorStop(1, 'rgba(241,234,219,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -430, 1000, 860); ctx.restore(); }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '20 · Isıyı İleten, İletmeyen', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();

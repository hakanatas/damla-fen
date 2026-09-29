// SAHNE 7 — Sıra sende, araştırma (Hazinî — TYMM zenginleştirme), sonraki film, bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  E.scene({
    name: 'Sıra sende', concept: 'Ölç, karşılaştır, araştır', from: 'task', to: 'research', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sr = E.s('research');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      F07.card(ctx, 240, 130, 1680, 820, { seed: 4700 });
      P.write(ctx, 'Sıra sende!', 330, 235, E.seg(t, st + 0.3, st + 1.3), { size: 80, color: BR });
      P.write(ctx, '1. Üç cisim seç (silgi, kalem kutusu, suluk...).', 330, 330, E.seg(t, st + 1.0, st + 2.4), { size: 42 });
      P.write(ctx, '2. Kütlesini eşit kollu teraziyle ölç (g).', 330, 400, E.seg(t, st + 2.2, st + 3.6), { size: 42 });
      P.write(ctx, '3. Ağırlığını dinamometreyle ölç (N).', 330, 470, E.seg(t, st + 3.4, st + 4.8), { size: 42 });
      P.write(ctx, '4. Tabloya yaz, benzerlik ve farkları listele.', 330, 540, E.seg(t, st + 4.6, st + 6.0), { size: 42 });
      const rk = E.se(t, sr, sr + 0.6);
      if (rk > 0) { ctx.save(); ctx.globalAlpha = rk; line(ctx, [330, 600], [1590, 596], { w: 1.8, dry: false }); P.icon.books(ctx, 450, 710, 0.8); ctx.restore();
        P.write(ctx, 'Sen de araştır: Hazinî, yer çekimi', 580, 690, E.seg(t, sr + 0.4, sr + 1.8), { size: 46 });
        P.write(ctx, 'hakkında hangi fikri ileri sürdü?', 580, 750, E.seg(t, sr + 1.6, sr + 3.0), { size: 46 }); }
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film: sürtünme', from: 'next', to: 'end', trFrom: [960, 700],
    draw(ctx, t) {
      const sn = E.s('next');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.water; ctx.fillRect(0, 0, E.W, 860); ctx.restore();
      F07.floor(ctx, 860, 8);
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, '8 · Sürtünme Kuvveti', 960, 285, t, sn + 1.1, 1e9, { size: 72, align: 'center' });
      // a box sliding and slowing on a rough floor
      const u = E.ease.out(E.seg(t, sn + 1.6, sn + 5.0)); const bx = 1100 + 480 * u;
      const b = F07.rect(bx - 90, 700, bx + 90, 860); P.fillPts(ctx, b, '#D9BF8F'); INK.wash(ctx, b, '#8A6A45', 0.4, 4710, { bleed: 1.5 }); stroke(ctx, b, { w: 3, closed: true });
      if (u > 0.02 && u < 0.97) P.arrow(ctx, [bx - 110, 830], [bx - 250, 830], 1, { w: 4, head: 14, color: BR });
      for (let i = 0; i < 20; i++) line(ctx, [1040 + i * 38, 862], [1052 + i * 38, 872], { w: 1.6, dry: false, alpha: 0.6 });
      DAMLA.draw(ctx, { x: 620, y: 860, s: 1.4, view: 'q3', expr: 'curious', look: [0.8, -0.1], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.0]] });
      F07.endCard(ctx, t, '7 · Kütle ve Ağırlık', 'FB.5.2.3');
    }
  });
})();

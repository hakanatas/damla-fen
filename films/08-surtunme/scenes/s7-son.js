// SAHNE 7 — Sıra sende (balık kılçığı görevi), sonraki film, bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const BR = '#8A4A10';
  E.scene({
    name: 'Sıra sende', concept: 'Günlük hayattan örnek toplama', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      F08.card(ctx, 240, 130, 1680, 840, { seed: 5950 });
      P.write(ctx, 'Sıra sende!', 330, 235, E.seg(t, st + 0.3, st + 1.3), { size: 80, color: BR });
      P.write(ctx, 'Evinde sürtünmeyi artıran 3, azaltan 3 örnek bul.', 330, 320, E.seg(t, st + 1.0, st + 2.6), { size: 44 });
      P.write(ctx, 'Balık kılçığı şemasına yerleştir. Hangi ortamda?', 330, 385, E.seg(t, st + 2.4, st + 4.0), { size: 44 });
      // empty fishbone template
      const k = E.se(t, st + 4.0, st + 5.0);
      if (k > 0) {
        ctx.save(); ctx.globalAlpha = k;
        const y = 620; line(ctx, [420, y], [1320, y], { w: 4 });
        const head = [[1320, y - 70], [1480, y - 40], [1530, y], [1480, y + 40], [1320, y + 70], [1320, y - 70]]; P.fillPts(ctx, head, '#F6E7B8'); stroke(ctx, head, { w: 3, closed: true });
        F08.txt(ctx, 'sürtünme', 1420, y + 12, { size: 32, align: 'center' });
        for (let i = 0; i < 3; i++) { const x = 600 + i * 260; line(ctx, [x + 60, y], [x - 20, y - 120], { w: 2.6, color: PAL.life }); line(ctx, [x + 60, y], [x - 20, y + 120], { w: 2.6, color: '#B5553F' }); F08.txt(ctx, '?', x - 30, y - 130, { size: 40, color: PAL.life }); F08.txt(ctx, '?', x - 30, y + 165, { size: 40, color: '#B5553F' }); }
        F08.txt(ctx, 'artıran', 300, y - 90, { size: 36, color: PAL.life }); F08.txt(ctx, 'azaltan', 300, y + 110, { size: 36, color: '#B5553F' });
        ctx.restore();
      }
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film: hücre', from: 'next', to: 'end', trFrom: [960, 600],
    draw(ctx, t) {
      const sn = E.s('next');
      ctx.save(); ctx.globalAlpha = 0.1; ctx.fillStyle = PAL.life; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      E.inkText(ctx, 'Sıradaki gözlem · Ünite 3:', 960, 200, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, '9 · Canlıların Yapı Taşı: Hücre', 960, 285, t, sn + 1.1, 1e9, { size: 72, align: 'center' });
      const k = E.se(t, sn + 1.8, sn + 3.0);
      if (k > 0) {
        ctx.save(); ctx.globalAlpha = k;
        const pc = [[1180, 470], [1460, 460], [1470, 720], [1190, 730], [1180, 470]]; P.fillPts(ctx, pc, '#DCE6C4'); INK.wash(ctx, pc, PAL.life, 0.35, 5960, { bleed: 2 }); stroke(ctx, pc, { w: 4, closed: true });
        P.fillPts(ctx, circlePts(1330, 590, 34, 30, 20), '#8A6A45', 0.6); stroke(ctx, circlePts(1330, 590, 34, 30, 20), { w: 2.4, closed: true });
        const ac = INK.wobble(circlePts(560, 600, 140, 120, 50), 6, 5961); P.fillPts(ctx, ac, '#F3D6C8'); INK.wash(ctx, ac, '#B5553F', 0.25, 5962, { bleed: 2 }); stroke(ctx, ac, { w: 3.4, closed: true });
        P.fillPts(ctx, circlePts(570, 600, 34, 30, 20), '#8A6A45', 0.6); stroke(ctx, circlePts(570, 600, 34, 30, 20), { w: 2.4, closed: true });
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 900, y: 880, s: 1.3, view: 'front', expr: 'curious', look: [0, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 2.2]], prop: 'lens', propTilt: -0.5 });
      F08.endCard(ctx, t, '8 · Sürtünme Kuvveti', 'FB.5.2.4');
    }
  });
})();

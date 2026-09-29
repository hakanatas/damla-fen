// SAHNE 6 — Günlük yaşamdan örnek: gölge oyunu. Kukla lambaya yaklaşınca duvardaki gölgesi büyür.
// (TYMM: "Verilen cevaplar çerçevesinde günlük yaşamdan benzer örnekler")
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F15;
  const D = 600, SZ = 70;                                 // lamp–wall distance (px, side-view scale), puppet size

  function panel(ctx, x, d, name, k, t) {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    const fr = F.card(ctx, x, 190, 800, 600, { fill: '#EDE5D2', seed: 1100 + (d < 300 ? 1 : 0) });
    ctx.save(); P.path(ctx, fr); ctx.clip();
    ctx.fillStyle = 'rgba(24,25,40,0.30)'; ctx.fillRect(x, 190, 820, 620);
    // wall (front) on the right, floor line
    const wx = x + 470, wall = [[wx, 210], [x + 790, 210], [x + 790, 700], [wx, 700]];
    P.fillPts(ctx, wall, '#F4ECDA'); stroke(ctx, wall.concat([wall[0]]), { w: 2.4, closed: true, dry: false });
    const lamp = [x + 90, 470];
    const G = D / d;                                     // magnification of the shadow on the wall
    ctx.save(); P.path(ctx, wall); ctx.clip();
    F.glow(ctx, x + 630, 455, 380, 0.9);
    F.poly(ctx, F.BIRD, x + 630, 455, SZ * G, F.SHADOW, { stroke: false });
    ctx.restore();
    // lamp + puppet (drawn in front, between lamp and wall)
    F.bulb(ctx, lamp[0], lamp[1], 0.9, 1);
    line(ctx, [lamp[0], lamp[1] + 40], [lamp[0], 740], { w: 4 });
    const px = lamp[0] + (wx - 40 - lamp[0]) * d / D;
    F.poly(ctx, F.BIRD, px, 455, SZ, '#6F8FA3', { w: 2 });
    line(ctx, [px, 455 + SZ * 0.4], [px, 740], { w: 4, color: '#8A6A45' });
    ctx.restore(); ctx.restore();
    P.write(ctx, name, x + 400, 850, k, { size: 40, align: 'center' });
  }

  E.scene({
    name: 'Gölge oyunu', concept: 'Günlük yaşamdan örnek', from: 'hand', to: 'hand', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('hand');
      ctx.fillStyle = 'rgba(24,25,40,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      panel(ctx, 110, 480, 'kukla duvara yakın → küçük gölge', E.se(t, sh + 0.3, sh + 1.0, 'out'), t);
      panel(ctx, 1010, 160, 'kukla lambaya yakın → büyük gölge', E.se(t, sh + 2.4, sh + 3.1, 'out'), t);
    }
  });
})();

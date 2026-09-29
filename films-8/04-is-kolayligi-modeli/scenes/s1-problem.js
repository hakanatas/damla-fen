// SAHNE 1 — Problem (köprü kurma): balkon bahçesine toprak torbası taşımak yorucu → model tasarlama kararı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F8M;
  const FY = 860;
  window.F04 = window.F04 || {};
  // toprak torbası: (cx, by) taban ortası
  F04.sack = function (ctx, cx, by, s = 1, seed = 4000) {
    const pts = [[cx - 48 * s, by], [cx + 48 * s, by], [cx + 42 * s, by - 70 * s], [cx + 22 * s, by - 92 * s], [cx - 22 * s, by - 92 * s], [cx - 42 * s, by - 70 * s], [cx - 48 * s, by]];
    P.fillPts(ctx, pts, '#E8D2A8'); wash(ctx, pts, '#8A6A45', 0.55, seed, { bleed: 1.5, blooms: 1 }); stroke(ctx, pts, { w: 3, closed: true, seed: seed + 1 });
    line(ctx, [cx - 24 * s, by - 88 * s], [cx + 24 * s, by - 88 * s], { w: 2.4, dry: false });
    F.txt(ctx, 'toprak', cx, by - 36 * s, { size: 26 * s, align: 'center', alpha: 0.75, rot: 0 });
  };
  // balkon (okul duvarı): x0..x1 arası, döşeme y
  F04.balcony = function (ctx, x0, x1, y, seed = 4010) {
    const slab = F.rect(x0, y, x1, y + 28); P.fillPts(ctx, slab, '#D9D4CA'); wash(ctx, slab, '#6F6A60', 0.4, seed, { bleed: 1 }); stroke(ctx, slab, { w: 3, closed: true, seed: seed + 1 });
    line(ctx, [x0 + 10, y - 90], [x1 - 10, y - 90], { w: 4, seed: seed + 2 });
    for (let x = x0 + 20; x < x1 - 10; x += 36) line(ctx, [x, y], [x, y - 90], { w: 2.2, dry: false, seed: seed + x });
  };
  F04.plant = function (ctx, x, y, s = 1, seed = 4020) {
    const pot = [[x - 30 * s, y - 50 * s], [x + 30 * s, y - 50 * s], [x + 22 * s, y], [x - 22 * s, y], [x - 30 * s, y - 50 * s]];
    P.fillPts(ctx, pot, '#E8C4A8'); wash(ctx, pot, '#B5553F', 0.5, seed, { bleed: 1 }); stroke(ctx, pot, { w: 2.4, closed: true, seed: seed + 1 });
    const cr = circlePts(x, y - 95 * s, 48 * s, 44 * s, 24); P.fillPts(ctx, cr, PAL.paper); wash(ctx, cr, PAL.life, 0.55, seed + 2, { bleed: 2 }); stroke(ctx, INK.wobble(cr, 3, seed + 3), { w: 2.4, closed: true, seed: seed + 4 });
  };
  E.scene({
    name: 'Problem', concept: 'Günlük yaşamda bir problem', from: 'title', to: 'goal',
    draw(ctx, t) {
      const sh = E.s('hello'), sg = E.s('goal');
      ctx.save(); E.cam(ctx, { x: 960, y: 540, z: 1 + 0.04 * E.se(t, 0, E.e('goal'), 'sine') });
      // okul duvarı
      E.layer(ctx, E.se(t, 5.4, 6.6), c => {
        const wall = F.rect(1180, 120, 2120, FY); P.fillPts(c, wall, '#EFE3CC'); wash(c, wall, '#B5553F', 0.16, 4030, { bleed: 3, blooms: 2 }); stroke(c, [[1180, FY], [1180, 120]], { w: 3.4, seed: 4031 });
        for (let i = 0; i < 2; i++) { const w = F.rect(1320 + i * 300, 560, 1500 + i * 300, 760); P.fillPts(c, w, '#DCE8EE'); stroke(c, w, { w: 2.6, closed: true, seed: 4032 + i }); line(c, [1410 + i * 300, 560], [1410 + i * 300, 760], { w: 1.8, dry: false }); }
      });
      E.layer(ctx, E.se(t, 5.6, 6.6), c => { F04.balcony(c, 1000, 1900, 380, 4040); [1300, 1480, 1660].forEach((x, i) => F04.plant(c, x, 380, 0.9, 4050 + i * 5)); });
      F.floor(ctx, FY, 1, -200, 2120, 1300, PAL.life);
      // yerdeki torbalar
      F04.sack(ctx, 330, FY, 1.1, 4070); F04.sack(ctx, 440, FY, 1.1, 4072); F04.sack(ctx, 385, FY - 100, 1.05, 4074);
      // yükseklik
      const kh = E.se(t, sh + 2.0, sh + 2.8);
      if (kh > 0) { ctx.save(); ctx.globalAlpha *= kh; F.dim(ctx, 1120, FY, 408, 'balkon: 2. kat', { side: 1, size: 38 }); ctx.restore(); }
      // Damla bir torbayı zorla taşır
      const carry = t > sh + 0.8 && t < sg;
      const bob = carry ? Math.abs(Math.sin(t * 5)) * 6 : 0;
      const dx = 720 + (carry ? Math.sin((t - sh) * 0.8) * 40 : 0);
      DAMLA.draw(ctx, {
        x: dx, y: FY - bob, s: 1.2, view: 'q3', expr: carry ? 'sad' : (t >= sg ? 'determined' : 'happy'), look: [0.4, 0.1], blink: E.blink(t, 2), squash: E.breath(t) * (carry ? 0.94 : 1), t, seed: 1,
        feet: carry ? E.walk(t * 5) : undefined,
        arms: carry ? [[-1, [40, -110]], [1, [80, -110]]] : (t < sh + 0.8 ? [[-1, 0.4], [1, 2.35 + 0.35 * Math.sin(t * 9)]] : [[-1, 0.4], [1, [40, -170]]])
      });
      if (carry) F04.sack(ctx, dx + 75, FY - 110 - bob, 0.8, 4076);
      if (carry && t > sh + 2) for (let i = 0; i < 3; i++) { const k = ((t * 0.9 + i / 3) % 1); ctx.save(); ctx.globalAlpha = Math.sin(k * Math.PI) * 0.8; P.fillPts(ctx, circlePts(dx - 70 - i * 12, FY - 300 + k * 60, 6, 9, 12), PAL.water); ctx.restore(); }
      ctx.restore();
      if (t > sg + 0.4) P.bubble(ctx, 560, 330, 620, 170, [680, 560], E.se(t, sg + 0.4, sg + 1.1, 'out'), 4);
      if (t > sg + 1.0) { ctx.save(); ctx.globalAlpha = E.se(t, sg + 1.0, sg + 1.5); F.txt(ctx, 'Bir basit makine modeli!', 560, 350, { size: 50, align: 'center', color: F.FORCE }); ctx.restore(); }
      F.title(ctx, t, 4, 'Kendi Makinemi Tasarlıyorum: İş Kolaylığı Modeli');
    }
  });
})();

// SAHNE 1 — Merak: deniz kıyısında Damla; soru; madde döngüsünün tanımı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const U = U7;
  // kıyı: deniz solda, kumsal/çayır sağda
  function shore(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(46,106,140,0.10)'); g.addColorStop(0.6, 'rgba(227,160,58,0.08)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    P.sun(ctx, 1640, 250, 80, t, { cells: false, nrays: 18 });
    U.sea(ctx, -40, 1000, 740, t);
    const land = [[900, 760], [1040, 730], [1200, 700], [1500, 690], [1960, 700], [1960, 1100], [900, 1100]];
    P.fillPts(ctx, land, '#EFE3C4'); wash(ctx, land, '#C9A064', 0.3, 2610, { bleed: 2, blooms: 1 });
    stroke(ctx, land.slice(0, 5), { w: 3.2, seed: 2611 });
    U.tree(ctx, 1720, 700, 1.1, t, { seed: 1 }); U.tree(ctx, 1560, 696, 0.8, t, { seed: 2 });
  }
  E.scene({
    name: 'Merak', concept: 'Soru: madde Dünya’da nasıl dolaşır?', from: 'title', to: 'q',
    draw(ctx, t) {
      const sq = E.s('q');
      shore(ctx, t);
      const dx = 1250, dy = 712;
      U.damla(ctx, t, { x: dx, y: dy, s: 1.3, view: 'q3', flip: true, expr: t > sq ? 'curious' : 'happy', look: t > sq ? [-0.5, -0.6] : [-0.6, 0.1], arms: t > sq ? [[-1, 0.4], [1, 2.2]] : [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]], seed: 1 });
      // soru: üç madde rozeti yörüngede
      const k = E.se(t, sq + 2.0, sq + 3.0, 'out');
      if (k > 0) {
        [['H2O', U.H2OC], ['CO2', U.CO2C], ['O2', U.O2C]].forEach(([f, col], i) => {
          const a = t * 0.5 + i * 2.094, x = 600 + Math.cos(a) * 230, y = 420 + Math.sin(a) * 110;
          ctx.save(); ctx.globalAlpha *= k; U.gas(ctx, f, x, y, 62, col); ctx.restore();
        });
        ctx.save(); ctx.globalAlpha *= k; U.txt(ctx, '?', 600, 460, { size: 110, color: PAL.light, align: 'center' }); ctx.restore();
        P.write(ctx, 'Nasıl dolaşır? Neden tükenmez?', 600, 640, E.seg(t, sq + 3.2, sq + 4.4), { size: 46, align: 'center' });
      }
      U.title(ctx, t, '26 · Hiçbir Şey Kaybolmaz: Madde Döngüleri');
    }
  });
  E.scene({
    name: 'Madde döngüsü', concept: 'Tanım: madde canlılar ile çevre arasında dolaşır', from: 'define', to: 'define', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('define');
      // canlılar ⇄ çevre halkası
      const cx = 960, cy = 520;
      const L = [560, 520], R = [1360, 520];
      const kl = E.se(t, s0 + 0.3, s0 + 1.1, 'out'), kr = E.se(t, s0 + 0.8, s0 + 1.6, 'out');
      if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl;
        U.card(ctx, 330, 330, 460, 380, { tint: PAL.life, seed: 2620 });
        U.tree(ctx, 470, 640, 0.9, t); U.sheep(ctx, 640, 650, 0.9, t);
        U.txt(ctx, 'canlılar', 560, 400, { size: 52, align: 'center', color: U.GREEN });
        ctx.restore(); }
      if (kr > 0) { ctx.save(); ctx.globalAlpha *= kr;
        U.card(ctx, 1130, 330, 460, 380, { tint: PAL.water, seed: 2621 });
        U.txt(ctx, 'çevre', 1360, 400, { size: 52, align: 'center', color: PAL.water });
        U.cloud(ctx, 1260, 490, 0.45); U.gas(ctx, 'O2', 1480, 480, 44, U.O2C);
        U.sea(ctx, 1150, 1360, 610, t, { bottom: 690 }); P.fillPts(ctx, [[1370, 690], [1370, 620], [1570, 610], [1570, 690]], '#C9A064', 0.6);
        U.txt(ctx, 'hava · su · toprak', 1360, 680, { size: 34, align: 'center' });
        ctx.restore(); }
      const ka = E.seg(t, s0 + 1.6, s0 + 2.8), kb = E.seg(t, s0 + 2.4, s0 + 3.6);
      U.flow(ctx, [800, 360], [1120, 360], ka, { c: [960, 250], w: 5, color: PAL.ink });
      U.flow(ctx, [1120, 690], [800, 690], kb, { c: [960, 800], w: 5, color: PAL.ink });
      // dönen tanecikler
      if (kb >= 1) for (let i = 0; i < 6; i++) {
        const u = (t * 0.12 + i / 6) % 1, a = u * 6.283;
        const x = cx + Math.cos(a) * 320, y = cy + Math.sin(a) * 250;
        INK.inkDot(ctx, x, y, 7, { color: '46,106,140', alpha: 0.8 });
      }
      P.write(ctx, 'madde döngüsü', 960, 225, E.seg(t, s0 + 2.8, s0 + 4.0), { size: 60, align: 'center', color: PAL.water });
      P.write(ctx, 'madde yok olmaz, dolaşır', 960, 880, E.seg(t, s0 + 3.8, s0 + 5.0), { size: 44, align: 'center' });
      U.damla(ctx, t, { x: 1760, y: 900, s: 0.8, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 0.4], [1, 2.0]], seed: 2 });
    }
  });
})();

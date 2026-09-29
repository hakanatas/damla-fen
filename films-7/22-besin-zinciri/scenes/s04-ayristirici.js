// SAHNE 4 — Ayrıştırıcılar: ölü canlılar ve atıklar → mantar, bakteri → maddeler toprağa → bitkiler yeniden kullanır (madde döngüsü)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F722;
  E.scene({
    name: 'Ayrıştırıcılar', concept: 'Maddelerin toprağa dönüşü', from: 'recycle', to: 'recycle', trFrom: [700, 700],
    draw(ctx, t) {
      const sr = E.s('recycle');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(111,138,58,0.10)'); g.addColorStop(1, 'rgba(138,106,69,0.10)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // toprak kesiti
      const soil = [[-10, 620], [1930, 610], [1930, 900], [-10, 900]];
      P.fillPts(ctx, soil, '#E6DCC6'); wash(ctx, soil, '#8A6A45', 0.35, 2700, { bleed: 2, blooms: 3 }); stroke(ctx, [[-10, 620], [1930, 610]], { w: 4, seed: 2701 });
      // ölü yapraklar ve ölü çekirge
      const decay = E.se(t, sr + 2.0, sr + 6.5);
      ctx.save(); ctx.globalAlpha *= 1 - decay * 0.7;
      F.deadLeaf(ctx, 380, 600, 1.2, 0.2); F.deadLeaf(ctx, 470, 606, 1.0, -0.4); F.deadLeaf(ctx, 300, 608, 0.9, 0.9);
      ctx.save(); ctx.translate(560, 590); ctx.rotate(Math.PI); F.hopper(ctx, 0, 0, 0.6, 0); ctx.restore();
      ctx.restore();
      F.fit(ctx, 'ölü canlılar, atıklar', 430, 520, 400, 38);
      // ayrıştırıcılar
      const kd = E.se(t, sr + 0.8, sr + 1.6, 'out');
      ctx.save(); ctx.globalAlpha *= kd;
      F.mushroom(ctx, 800, 560, 1.2); F.mushroom(ctx, 880, 580, 0.8);
      F.bacteria(ctx, 700, 700, 1.1, t);
      F.fit(ctx, 'mantar', 840, 460, 200, 36); F.fit(ctx, 'bakteri', 700, 780, 200, 34);
      ctx.restore();
      P.arrow(ctx, [560, 540], [740, 500], E.se(t, sr + 1.4, sr + 2.2), { w: 4, color: '#8A6A45', bend: 30, head: 14 });
      // toprağa dönen maddeler (kahverengi noktalar) → köklere
      const R = INK.rng(2710);
      for (let i = 0; i < 16; i++) {
        const k = ((t - sr - 3) * 0.25 + i / 16) % 1; if (t < sr + 3) break;
        const x = E.lerp(760, 1360, k) + (R() - 0.5) * 20, y = 760 + Math.sin(k * Math.PI) * 40 + (i % 4) * 14 - 20;
        INK.inkDot(ctx, x, y, 4, { color: '138,106,69', alpha: 0.8 * Math.sin(k * Math.PI) });
      }
      const kt = E.se(t, sr + 3.4, sr + 4.2);
      if (kt > 0) { ctx.save(); ctx.globalAlpha *= kt; F.fit(ctx, 'maddeler toprağa döner', 1060, 870, 520, 38, { color: '#5A4028' }); ctx.restore(); }
      // bitki ve kökleri
      const grow = E.se(t, sr + 5.0, sr + 7.5);
      const px = 1450;
      for (let i = 0; i < 5; i++) stroke(ctx, P.bez([px, 620], [px + (i - 2) * 30, 690], [px + (i - 2) * 60, 740 + (i % 2) * 30], 12), { w: 2, color: '#5A4028', dry: false, seed: 2720 + i });
      F.grass(ctx, px, 620 - 50 - 20 * grow, 1.0 + 0.5 * grow, t, 3);
      F.fit(ctx, 'bitkiler yeniden kullanır', 1500, 400, 520, 38, { color: F.GREEN, alpha: E.se(t, sr + 5.5, sr + 6.3) });
      P.arrow(ctx, [1370, 790], [1430, 730], E.se(t, sr + 4.6, sr + 5.2), { w: 3, color: '#8A6A45', bend: 0, head: 12 });
      F.damla(ctx, t, { x: 1760, y: 600, s: 1.0, view: 'q3', flip: true, expr: 'curious', look: [-0.9, 0.3] });
    }
  });
})();

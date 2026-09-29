// SAHNE 6 — 1453: gemilerin yağlı kalaslar ve yuvarlak kütüklerle karadan Haliç'e indirilmesi (TYMM D19.2)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const BR = '#8A4A10';
  const hillY = x => 830 - 190 * Math.sin(Math.min(1, Math.max(0, (x - 0) / 1500)) * Math.PI);
  E.scene({
    name: '1453', concept: 'Tarihte sürtünmeyi azaltmak', from: 'ships', to: 'ships2', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('ships'), s2 = E.s('ships2');
      // warm sky
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,160,58,0.18)'); g.addColorStop(1, 'rgba(227,160,58,0.02)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      // Haliç water on the right
      const wtr = [[1380, 830], [1920, 830], [1920, 1080], [1380, 1080]]; P.fillPts(ctx, wtr, '#A9C6D6', 0.8); wash(ctx, wtr, PAL.water, 0.35, 5901, { bleed: 2 });
      F08.txt(ctx, 'Haliç', 1700, 890, { size: 44, color: PAL.water }); { const wl = []; for (let i = 0; i <= 20; i++) wl.push([1380 + i * 27, 830 + Math.sin(i * 0.9 + t * 2) * 4]); stroke(ctx, wl, { w: 3, color: PAL.water }); }
      // hill
      const hp = []; for (let i = 0; i <= 60; i++) { const x = -20 + i * 25; hp.push([x, hillY(x)]); }
      const hf = hp.concat([[1480, 1080], [-20, 1080]]); P.fillPts(ctx, hf, PAL.paper); wash(ctx, hf, PAL.life, 0.3, 5902, { bleed: 3 }); stroke(ctx, hp, { w: 3.4 });
      // planks along the slope (greased)
      for (let i = 0; i < 12; i++) { const x = 60 + i * 115; const y = hillY(x); line(ctx, [x - 50, y - 4 - (hillY(x - 50) - y)], [x + 50, y - 4 + (hillY(x + 50) - y)], { w: 6, color: '#8A6A45', taper: 0 }); if (i % 2 === 0) P.fillPts(ctx, circlePts(x, y - 2, 6, 3, 10), '#E3A03A', 0.9); }
      // galley moving up the slope on rolling logs
      const u = E.se(t, ss + 0.4, s2 + 7, 'sine');
      const sx = 260 + 380 * u, sy = hillY(sx), ang = Math.atan2(hillY(sx + 10) - hillY(sx - 10), 20);
      for (let i = -2; i <= 2; i++) { const lx = sx + i * 110 - (u * 900) % 110; F08.log(ctx, lx, hillY(lx) - 20, 18, u * 40 + i); }
      ctx.save(); ctx.translate(sx, sy - 38); ctx.rotate(ang); F08.galley(ctx, 0, 0, 0.9); ctx.restore();
      // ropes pulled up-hill
      line(ctx, [sx + 250, sy - 90], [sx + 380, hillY(sx + 380) - 40], { w: 2.4, dry: false });
      F08.farrow(ctx, [sx + 390, hillY(sx + 390) - 70], [sx + 520, hillY(sx + 520) - 90], 'çekme', E.se(t, ss + 1.0, ss + 1.8), { color: PAL.ink, size: 36 });
      E.inkText(ctx, '1453 · İstanbul’un fethi', 960, 150, t, ss + 0.5, 1e9, { size: 60, align: 'center' });
      // labels
      const k1 = E.se(t, ss + 3.0, ss + 3.8), k2 = E.se(t, ss + 5.0, ss + 5.8);
      if (k1 > 0) { F08.txt(ctx, 'yağlanmış kalaslar', 880, 470, { size: 42, alpha: k1 }); ctx.save(); ctx.globalAlpha = k1 * 0.7; INK.leader(ctx, [1030, 482], [1050, hillY(1050) - 6], { bend: 0.1 }); ctx.restore(); }
      if (k2 > 0) { F08.txt(ctx, 'yuvarlak kütükler', 60, 560, { size: 42, alpha: k2 }); ctx.save(); ctx.globalAlpha = k2 * 0.7; INK.leader(ctx, [180, 574], [sx - 220, hillY(sx - 220) - 24], { bend: 0.2 }); ctx.restore(); }
      // ships2: friction reduced
      const rk = E.se(t, s2 + 0.3, s2 + 1.0, 'out');
      if (rk > 0) {
        ctx.save(); ctx.globalAlpha = rk;
        F08.card(ctx, 1330, 250, 1870, 560, { seed: 5910 });
        F08.txt(ctx, 'yağ + yuvarlak kütük', 1600, 320, { size: 40, align: 'center' });
        F08.txt(ctx, '→ sürtünme azaldı', 1600, 390, { size: 44, align: 'center', color: BR });
        P.arrow(ctx, [1500, 470], [1440, 470], 1, { w: 3, head: 12, color: BR }); F08.txt(ctx, 'küçük sürtünme', 1520, 482, { size: 32 });
        F08.txt(ctx, '(çizim temsilîdir)', 1600, 540, { size: 26, align: 'center', alpha: 0.6, weight: 400 });
        ctx.restore();
      }
      DAMLA.draw(ctx, { x: 1340, y: hillY(1340) + 6, s: 0.8, view: 'q3', flip: true, expr: 'surprised', look: [-0.8, -0.2], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 3, arms: [[-1, 0.4], [1, 2.2]] });
    }
  });
})();

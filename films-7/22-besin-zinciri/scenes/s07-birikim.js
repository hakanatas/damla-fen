// SAHNE 7 — Biyolojik birikim: vücuttan atılamayan zararlı madde, su yosunu → küçük balık → büyük balık → balıkçıl zincirinde yukarı çıktıkça birikir.
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F722;
  const TOX = '#5E3F6B';                         // zararlı madde (mor) — kırmızı yalnızca güvenlik için
  const CH = [
    ['su yosunu', 330, 700, (c, x, y, t) => F.algae(c, x, y, 1.6, t), 2],
    ['küçük balık', 720, 650, (c, x, y, t) => F.fish(c, x, y, 0.9, 1, '#8FA5B5', 2), 6],
    ['büyük balık', 1130, 640, (c, x, y, t) => F.fish(c, x, y, 1.6, 1, '#D98A2B', 3), 14],
    ['balıkçıl', 1560, 470, (c, x, y, t) => F.heron(c, x, y, 1.3), 30]
  ];
  E.scene({
    name: 'Biyolojik birikim', concept: 'Zincirde zararlı madde birikimi', from: 'accum', to: 'accum2', trFrom: [300, 300],
    draw(ctx, t) {
      const sa = E.s('accum'), s2 = E.s('accum2');
      // göl
      const water = [[-10, 520], [1400, 520], [1400, 900], [-10, 900]];
      P.fillPts(ctx, water, '#DCE7EA'); wash(ctx, water, PAL.water, 0.4, 3000, { bleed: 3, blooms: 3 }); stroke(ctx, [[-10, 520], [1400, 520]], { w: 3, seed: 3001 });
      const shore = [[1400, 520], [1930, 540], [1930, 900], [1400, 900]]; P.fillPts(ctx, shore, '#E6DCC6'); wash(ctx, shore, PAL.life, 0.3, 3002, { bleed: 2 }); stroke(ctx, [[1400, 520], [1930, 540]], { w: 3, seed: 3003 });
      // boru ve zararlı madde
      F.shape(ctx, [[20, 300], [190, 300], [190, 330], [20, 330]], '#6F6B66', 0.5, 3004);
      F.fit(ctx, 'atık su', 110, 280, 200, 32);
      for (let i = 0; i < 10; i++) { const k = ((t * 0.5 + i / 10) % 1); INK.inkDot(ctx, 192 + Math.sin(i) * 6, 330 + k * 200 + (k > 0.9 ? 0 : 0), 4, { color: '94,63,107', alpha: 0.8 * (1 - k * 0.5) }); }
      const R = INK.rng(3010);
      for (let i = 0; i < 40; i++) INK.inkDot(ctx, 60 + R() * 1300, 560 + R() * 320, 2.4, { color: '94,63,107', alpha: 0.35 * E.se(t, sa + 0.5, sa + 2.0) });
      // zincir
      CH.forEach(([name, x, y, draw, n], i) => {
        const k = E.se(t, sa + 1.2 + i * 0.8, sa + 1.8 + i * 0.8, 'out'); if (k <= 0) return;
        ctx.save(); ctx.globalAlpha *= k; draw(ctx, x, y, t); F.fit(ctx, name, x, i === 3 ? 700 : 850, 260, 34); ctx.restore();
        if (i < 3) P.arrow(ctx, [x + 110, y - 30], [CH[i + 1][1] - 110, CH[i + 1][2] - 40], E.se(t, sa + 2.0 + i * 0.8, sa + 2.6 + i * 0.8), { w: 4, color: F.AMB, bend: 30, head: 14 });
        // birikim rozeti
        const kb = E.se(t, s2 + 0.5 + i * 1.0, s2 + 1.2 + i * 1.0, 'out'); if (kb <= 0) return;
        const bx = x, by = i === 3 ? 230 : 380, r = 64;
        ctx.save(); ctx.globalAlpha *= kb;
        const cc = circlePts(bx, by, r, r, 36); P.fillPts(ctx, cc, PAL.white, 0.95); stroke(ctx, cc, { w: 2.6, closed: true, seed: 3020 + i, color: TOX });
        const RR = INK.rng(3030 + i); for (let m = 0; m < n; m++) { const a = RR() * 6.283, d = Math.sqrt(RR()) * (r - 12); INK.inkDot(ctx, bx + Math.cos(a) * d, by + Math.sin(a) * d, 4.2, { color: '94,63,107', alpha: 0.95 }); }
        ctx.restore();
      });
      const kl = E.se(t, s2 + 4.4, s2 + 5.2);
      if (kl > 0) { ctx.save(); ctx.globalAlpha *= kl; P.arrow(ctx, [420, 290], [1440, 250], 1, { w: 5, color: TOX, bend: 20, head: 18 }); F.fit(ctx, 'yukarı çıktıkça birikim artar', 900, 212, 700, 42, { color: TOX }); ctx.restore(); }
      F.fit(ctx, '(çizim ölçekli değildir)', 1660, 890, 360, 26, { weight: 400, alpha: 0.65 });
    }
  });
})();

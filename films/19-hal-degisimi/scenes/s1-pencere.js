// SAHNE 1 — Donmuş uyanış: Damla kış sabahı pencerede buz olarak uyanır, Güneş ısıtınca erir (ön bilgi/deneyim)
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F19;
  function frost(ctx, x, y, dir, k, seed) { // corner frost fern
    if (k <= 0) return; const r = rng(seed);
    ctx.save(); ctx.globalAlpha = 0.75 * k;
    for (let i = 0; i < 6; i++) {
      const a = dir + (r() - 0.5) * 1.3, L = 60 + r() * 90; const b = [x + Math.cos(a) * L, y + Math.sin(a) * L];
      line(ctx, [x, y], b, { w: 2, color: PAL.white, dry: false, seed: seed + i });
      for (let j = 1; j < 5; j++) { const u = j / 5, px = x + Math.cos(a) * L * u, py = y + Math.sin(a) * L * u; [-0.7, 0.7].forEach(d => line(ctx, [px, py], [px + Math.cos(a + d) * 18 * (1 - u), py + Math.sin(a + d) * 18 * (1 - u)], { w: 1.4, color: PAL.white, dry: false })); }
    }
    ctx.restore();
  }
  E.scene({
    name: 'Donmuş uyanış', concept: 'Ön deneyim: ısı alan buz erir', from: 'title', to: 'melt',
    draw(ctx, t) {
      const sh = E.s('hello'), sm = E.s('melt');
      const rise = E.se(t, sm - 0.5, sm + 3.5, 'io');
      const melt = E.se(t, sm + 1.6, sm + 4.2, 'io');
      const X0 = 560, X1 = 1360, Y0 = 150, Y1 = 760;
      ctx.save();
      E.cam(ctx, { x: 960, y: 520 + 20 * E.se(t, 0, sh, 'sine'), z: 1.02 + 0.04 * E.se(t, 0, sm + 4, 'sine') });
      // wall
      ctx.fillStyle = 'rgba(160,130,95,0.14)'; ctx.fillRect(-200, -200, E.W + 400, E.H + 400);
      for (let x = -100; x < E.W + 200; x += 120) { ctx.save(); ctx.globalAlpha = 0.07; line(ctx, [x, -100], [x + 4, E.H + 100], { w: 2, color: '#8A6A45', dry: false, seed: x }); ctx.restore(); }
      // outside view (clipped to glass)
      ctx.save(); ctx.beginPath(); ctx.rect(X0, Y0, X1 - X0, Y1 - Y0); ctx.clip();
      const sky = ctx.createLinearGradient(0, Y0, 0, Y1); sky.addColorStop(0, `rgba(${E.lerp(150, 238, rise) | 0},${E.lerp(178, 214, rise) | 0},${E.lerp(200, 168, rise) | 0},0.9)`); sky.addColorStop(1, 'rgba(236,232,222,0.95)');
      ctx.fillStyle = sky; ctx.fillRect(X0, Y0, X1 - X0, Y1 - Y0);
      const sx = 1230, sy = E.lerp(820, 330, rise);
      P.sun(ctx, sx, sy, 70, t, { nrays: 16, cells: false });
      const hill = []; for (let i = 0; i <= 40; i++) { const x = X0 - 20 + i * (X1 - X0 + 40) / 40; hill.push([x, 620 - Math.sin(i / 40 * 3 + 0.5) * 50]); }
      const hf = hill.concat([[X1 + 20, Y1 + 20], [X0 - 20, Y1 + 20]]); P.fillPts(ctx, hf, '#F7F4EC'); wash(ctx, hf, '#9FB6C4', 0.18, 1905); stroke(ctx, hill, { w: 3, seed: 1906 });
      // bare tree
      line(ctx, [700, 600], [706, 430], { w: 6, seed: 1907 }); [[704, 500, -0.9, 60], [705, 470, 0.8, 55], [706, 450, -0.4, 40]].forEach(([x, y, a, L], i) => line(ctx, [x, y], [x + Math.sin(a) * L, y - Math.cos(a) * L], { w: 3, seed: 1908 + i }));
      // snowflakes (fade as sun rises)
      const R = rng(1910); ctx.save(); ctx.globalAlpha = 0.7 * (1 - rise); ctx.fillStyle = PAL.white;
      for (let i = 0; i < 40; i++) { const x = X0 + R() * (X1 - X0), y = Y0 + ((R() * (Y1 - Y0) + t * (30 + R() * 30)) % (Y1 - Y0)); ctx.beginPath(); ctx.arc(x + Math.sin(t + i) * 6, y, 2.5 + R() * 2, 0, 7); ctx.fill(); }
      ctx.restore();
      ctx.restore();
      // sunbeam into the room
      if (rise > 0.3) { ctx.save(); ctx.globalAlpha = 0.35 * E.seg(rise, 0.3, 1); const g = ctx.createLinearGradient(sx, sy, 960, 700); g.addColorStop(0, 'rgba(227,160,58,0.8)'); g.addColorStop(1, 'rgba(227,160,58,0.05)'); ctx.fillStyle = g; P.path(ctx, [[sx - 40, sy - 40], [sx + 40, sy + 40], [1090, 780], [820, 780]]); ctx.fill(); ctx.restore(); }
      // frost on glass
      const fk = 1 - E.se(t, sm + 1, sm + 4);
      frost(ctx, X0 + 6, Y0 + 6, 0.8, fk, 1911); frost(ctx, X1 - 6, Y0 + 6, 2.35, fk, 1912); frost(ctx, X0 + 6, Y1 - 6, -0.8, fk, 1913); frost(ctx, X1 - 6, Y1 - 6, -2.35, fk, 1914);
      // frame + mullions
      const fr = (a, b, c, d, s) => { const p = [[a, b], [c, b], [c, d], [a, d], [a, b]]; P.fillPts(ctx, p, '#E4D7BD'); wash(ctx, p, '#8A6A45', 0.35, s, { bleed: 1, blooms: 0 }); stroke(ctx, p, { w: 2.8, closed: true, seed: s + 1 }); };
      fr(X0 - 34, Y0 - 34, X1 + 34, Y0, 1920); fr(X0 - 34, Y0, X0, Y1, 1922); fr(X1, Y0, X1 + 34, Y1, 1924); fr(955 - 14, Y0, 955 + 14, Y1, 1926); fr(X0, 450, X1, 470, 1928);
      // sill
      const sill = [[X0 - 70, Y1], [X1 + 70, Y1 - 2], [X1 + 80, Y1 + 42], [X0 - 80, Y1 + 44], [X0 - 70, Y1]];
      P.fillPts(ctx, sill, '#E9DDC4'); wash(ctx, sill, '#8A6A45', 0.4, 1930, { bleed: 1 }); stroke(ctx, sill, { w: 3, closed: true, seed: 1931 });

      // ---- Damla: ice → liquid ----
      const dx = 960, dy = Y1 + 2;
      const shiver = t < sm + 2 ? Math.sin(t * 40) * 2 * (1 - melt) : 0;
      const base = { x: dx + shiver, y: dy, s: 1.25, view: 'front', t, seed: 1, blink: E.blink(t, 2), squash: E.breath(t) };
      const woke = E.se(t, sh - 0.4, sh + 0.4);
      const iceO = { ...base, state: 'ice', expr: t < sh ? 'sleepy' : 'surprised', blink: t < sh - 0.3 ? 1 : base.blink, look: t > sh + 2 ? [0, 0.8] : [0, 0], arms: [[-1, 0.5 + woke * 0.4], [1, 0.5 + woke * 0.4]] };
      const liqO = { ...base, state: 'liquid', expr: t > sm + 4.4 ? 'happy' : 'curious', look: [0.7, -0.4], talk: E.talk(t), arms: t > sm + 4.4 ? [[-1, 2.5 + 0.15 * Math.sin(t * 6)], [1, 2.5 + 0.15 * Math.sin(t * 6 + 1)]] : [[-1, 0.5], [1, 0.5]] };
      if (melt < 1) E.layer(ctx, 1 - melt, c => DAMLA.draw(c, iceO));
      if (melt > 0) E.layer(ctx, melt, c => DAMLA.draw(c, liqO));
      // drip puddle while melting
      if (melt > 0.2) { const pk = E.se(t, sm + 2.4, sm + 4.5); P.fillPts(ctx, circlePts(dx + 70, dy + 6, 40 * pk, 7 * pk, 24), PAL.water, 0.35); }
      // shiver marks while frozen
      if (t > sh && melt < 0.5) { ctx.save(); ctx.globalAlpha = 0.7 * (1 - melt * 2); [-1, 1].forEach(s => { for (let i = 0; i < 3; i++) line(ctx, [dx + s * (120 + i * 12), dy - 220 + i * 26], [dx + s * (135 + i * 12), dy - 210 + i * 26], { w: 2.4, dry: false, seed: 1940 + i }); }); ctx.restore(); }
      ctx.restore();

      // right-side notes (screen space)
      E.inkText(ctx, 'buz = katı', 1440, 400, t, sh + 3.0, sm + 2.0, { size: 46, color: PAL.water });
      if (t > sm + 1) {
        const k = E.se(t, sm + 1, sm + 2);
        P.write(ctx, 'ısı aldı', 1450, 330, k, { size: 50, color: F.HEAT });
        P.write(ctx, 'katı → sıvı', 1450, 470, E.seg(t, sm + 3.2, sm + 4.4), { size: 56 });
        P.write(ctx, 'eridi!', 1450, 540, E.seg(t, sm + 4.0, sm + 5.0), { size: 46, color: PAL.water });
      }
      // title card
      const t1 = E.e('title') + 1.2;
      if (t < t1) {
        const a = 1 - E.se(t, t1 - 0.8, t1);
        ctx.save(); ctx.globalAlpha = 0.92 * a; ctx.translate(960, 265); ctx.scale(1.9, 1); const g = ctx.createRadialGradient(0, 0, 40, 0, 0, 430); g.addColorStop(0, 'rgba(241,234,219,1)'); g.addColorStop(0.55, 'rgba(241,234,219,0.9)'); g.addColorStop(1, 'rgba(241,234,219,0)'); ctx.fillStyle = g; ctx.fillRect(-500, -430, 1000, 860); ctx.restore();
      }
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '19 · Buzdan Buhara: Hâl Değişimi', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.light }); ctx.restore(); }
    }
  });
})();

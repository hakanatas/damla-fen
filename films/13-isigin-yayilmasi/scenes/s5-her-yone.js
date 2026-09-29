// SAHNE 5 — Işık her yöne yayılır: lambanın çevresindeki kartlar; el feneri; bulut aralığından süzülen ışık
// (TYMM: el feneri, araba farları, bulutlu bir günde güneş ışığının yayılması örnekleri)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F13;
  const C = [900, 520], RC = 270, NC = 8;

  function ring(ctx, t) {
    const sa = E.s('alldirs'), sc = E.s('cards'), se = E.s('every');
    const on = E.se(t, sc + 0.1, sc + 0.5);
    INK.label(ctx, '(tepeden görünüş)', 330, 860, { size: 36, align: 'center', alpha: 0.7 * E.se(t, sa + 0.5, sa + 1.2) });
    F.bulb(ctx, C[0], C[1], 1.3, on);
    // rays: 8 towards the cards (stop at the card), 8 between the cards (go on)
    const kr = E.se(t, sc + 0.3, sc + 1.6), kx = E.se(t, se + 0.2, se + 1.6);
    for (let i = 0; i < 2 * NC; i++) {
      const a = i / (2 * NC) * Math.PI * 2 - Math.PI / 2, d = [Math.cos(a), Math.sin(a)];
      const toCard = i % 2 === 0, r1 = toCard ? RC - 14 : E.lerp(RC - 14, 460, kx);
      if (on > 0) F.ray(ctx, [C[0] + d[0] * 40, C[1] + d[1] * 40], [C[0] + d[0] * r1, C[1] + d[1] * r1], kr, { w: 3, head: 13, heads: toCard ? [0.6] : [0.45, 0.85], seed: 600 + i });
    }
    // cards
    for (let i = 0; i < NC; i++) {
      const a = i / NC * Math.PI * 2 - Math.PI / 2, d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]];
      const ki = E.se(t, sa + 0.8 + i * 0.35, sa + 1.3 + i * 0.35, 'out'); if (ki <= 0) continue;
      const r = RC + (1 - ki) * 200, c = [C[0] + d[0] * r, C[1] + d[1] * r], hl = 75, th = 14;
      const pts = [[c[0] - n[0] * hl, c[1] - n[1] * hl], [c[0] + n[0] * hl, c[1] + n[1] * hl], [c[0] + n[0] * hl + d[0] * th, c[1] + n[1] * hl + d[1] * th], [c[0] - n[0] * hl + d[0] * th, c[1] - n[1] * hl + d[1] * th]];
      const lit = on * E.se(t, sc + 1.2, sc + 1.8);
      P.fillPts(ctx, pts, PAL.white, ki);
      if (lit > 0) { F.glow(ctx, c[0], c[1], 90, lit * 0.7); P.fillPts(ctx, pts, '#F6D08A', lit); }
      stroke(ctx, pts.concat([pts[0]]), { w: 2.4, closed: true, seed: 620 + i, alpha: ki });
    }
    const lk = E.se(t, sc + 1.8, sc + 2.6);
    if (lk > 0) {
      [['arka', C[0], C[1] - RC - 45, 'center'], ['sağ', C[0] + RC + 45, C[1] + 14, 'left'], ['ön', C[0] + 95, C[1] + RC + 22, 'left'], ['sol', C[0] - RC - 45, C[1] + 14, 'right']]
        .forEach(([s, x, y, al], i) => P.write(ctx, s, x, y, E.seg(t, sc + 0.4 + i * 0.9, sc + 1.2 + i * 0.9), { size: 42, align: al }));
    }
    const ek = E.se(t, se + 0.8, se + 1.8);
    if (ek > 0) {
      P.write(ctx, 'her yöne!', 1610, 290, ek, { size: 76, align: 'center', color: '#8A4A10' });
      P.write(ctx, '(yukarıya ve aşağıya da)', 1610, 350, E.seg(t, se + 1.8, se + 2.8), { size: 34, weight: 400, align: 'center' });
    }
    const happy = t > sc + 1.8;
    DAMLA.draw(ctx, { x: 1640, y: 900, s: 1.0, view: 'q3', flip: true, expr: happy ? 'happy' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), arms: happy ? [[-1, 0.35], [1, 2.2]] : [[-1, 0.35], [1, 0.35]], t, seed: 4 });
  }

  function panels(ctx, t) {
    const st = E.s('torch'), sc = E.s('cloud');
    // --- flashlight panel ---
    const k1 = E.se(t, st + 0.1, st + 0.8, 'out');
    const shift = 440 * (1 - E.se(t, sc - 0.2, sc + 0.8));
    if (k1 > 0) {
      ctx.save(); ctx.translate(shift, 0);
      ctx.save(); ctx.globalAlpha = k1;
      const fr = F.card(ctx, 110, 200, 800, 640, { fill: '#EDE5D2', seed: 701 });
      ctx.save(); P.path(ctx, fr); ctx.clip();
      ctx.fillStyle = 'rgba(24,25,40,0.35)'; ctx.fillRect(110, 190, 820, 660);
      const L = [360, 540];
      // wall on the right, lit patch
      const kr = E.se(t, st + 1.0, st + 2.6);
      F.flashlight(ctx, L[0], L[1], 0, 1, 1);
      for (let i = -2; i <= 2; i++) {
        const a = i * 0.09, p = [L[0] + 6, L[1] + i * 13], q = [p[0] + Math.cos(a) * 520, p[1] + Math.sin(a) * 520];
        F.ray(ctx, p, q, kr, { w: 3.2, head: 13, heads: [0.45, 0.85], seed: 710 + i });
      }
      ctx.restore(); ctx.restore();
      P.write(ctx, 'el feneri', 510, 280, k1, { size: 52, align: 'center' });
      const ak = E.se(t, st + 2.4, st + 3.2);
      if (ak > 0) { ctx.save(); ctx.globalAlpha = ak; INK.leader(ctx, [300, 700], [352, 560], { w: 1.6, bend: 0.2, color: PAL.white }); ctx.restore(); P.write(ctx, 'ayna', 300, 750, ak, { size: 40, align: 'center', color: PAL.white }); }
      P.write(ctx, 'her ışın dümdüz', 640, 780, E.seg(t, st + 3.4, st + 4.6), { size: 42, align: 'center', color: '#F6D9A0' });
      ctx.restore();
    }
    // --- cloud gap panel ---
    const k2 = E.se(t, sc + 0.1, sc + 0.8, 'out');
    if (k2 > 0) {
      ctx.save(); ctx.globalAlpha = k2;
      const fr = F.card(ctx, 1000, 200, 800, 640, { fill: '#DCE6EA', seed: 702 });
      ctx.save(); P.path(ctx, fr); ctx.clip();
      const S = [1400, 170], GY = 390, G0 = 1340, G1 = 1470, GROUND = 790;
      F.glow(ctx, S[0], S[1] + 60, 300, 0.8);
      // beams: straight lines from the (hidden) Sun through the gap
      const kb = E.se(t, sc + 1.0, sc + 2.8);
      const proj = x => S[0] + (x - S[0]) * (GROUND - S[1]) / (GY - S[1]);
      if (kb > 0) {
        const yb = E.lerp(GY, GROUND, kb), pr = x => S[0] + (x - S[0]) * (yb - S[1]) / (GY - S[1]);
        ctx.save(); ctx.fillStyle = 'rgba(240,190,90,0.35)'; P.path(ctx, [[G0, GY], [G1, GY], [pr(G1), yb], [pr(G0), yb]]); ctx.closePath(); ctx.fill(); ctx.restore();
        for (let i = 0; i <= 4; i++) { const xg = E.lerp(G0 + 8, G1 - 8, i / 4); F.ray(ctx, [xg, GY], [proj(xg), GROUND], kb, { w: 2.8, head: 12, heads: [0.5], seed: 730 + i }); }
      }
      // ground
      const hill = [[990, 800], [1200, 770], [1450, 795], [1810, 760], [1810, 860], [990, 860]];
      P.fillPts(ctx, hill, '#B9C58F', 0.9); stroke(ctx, hill.slice(0, 4), { w: 3, seed: 740 });
      // clouds (with a gap between them); the Sun itself stays hidden
      const cloud = (cx, cy, w, h, seed) => { const pts = []; for (let i = 0; i <= 60; i++) { const a = i / 60 * Math.PI * 2; const bump = 1 + 0.12 * Math.abs(Math.sin(a * 4 + seed)); pts.push([cx + Math.cos(a) * w * bump, cy + Math.sin(a) * h * bump]); } P.fillPts(ctx, pts, '#F2F0EA'); wash(ctx, pts, '#8C96A0', 0.4, seed, { bleed: 2, blooms: 1 }); stroke(ctx, pts, { w: 3, closed: true, seed: seed + 1 }); };
      cloud(1170, 330, 190, 80, 751); cloud(1650, 335, 200, 85, 753); cloud(1400, 245, 170, 90, 755);
      ctx.restore(); ctx.restore();
      P.write(ctx, 'bulut aralığından süzülen ışık', 1400, 910 - 90, E.seg(t, sc + 2.8, sc + 4.0), { size: 40, align: 'center', color: '#5A3A10' });
    }
  }

  E.scene({
    name: 'Her yöne', concept: 'Işık kaynağından her yöne yayılır', from: 'alldirs', to: 'cloud', trFrom: [900, 520],
    draw(ctx, t) {
      const st = E.s('torch');
      ctx.fillStyle = 'rgba(24,25,40,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, st - 0.4, st + 0.3);
      E.layer(ctx, a1, c => ring(c, t));
      if (t > st - 0.2) panels(ctx, t);
    }
  });
})();

// SAHNE 3 — Rulo deneyi: düz rulodan lamba görülür, bükülmüş rulodan görülmez → ışık doğrusal yol izler
// (TYMM: "doğrusal ve doğrusal olmayan A4 kâğıdının rulo yapılarak kullanılması"; veri kaydetme)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F13;
  const DX = 1480, DY = 900, DS = 1.5;
  const EYE = [DX - 42 * DS, DY - 128 * DS];         // Damla's eye (side view, facing left, squash 1)
  const E0 = [EYE[0] - 14, EYE[1]];                  // tube end at the eye
  const LAMP = [340, EYE[1]];                        // bulb centre, same height as the eye
  const L1 = 220, RB = 110, L2 = 300, RT = 30;

  function centre(theta, alpha) {
    const pts = [], phis = []; let p = [E0[0], E0[1]], phi = Math.PI + alpha;
    const push = () => { pts.push([p[0], p[1]]); phis.push(phi); };
    push();
    const step = (ds, dphi) => { phi += dphi; p = [p[0] + Math.cos(phi) * ds, p[1] + Math.sin(phi) * ds]; push(); };
    for (let i = 0; i < L1 / 10; i++) step(10, 0);
    const arcL = RB * theta, na = Math.max(1, Math.ceil(arcL / 6));
    if (theta > 0.001) for (let i = 0; i < na; i++) step(arcL / na, theta / na);
    for (let i = 0; i < L2 / 10; i++) step(10, 0);
    return { pts, phis, M: p, dir: [Math.cos(phi), Math.sin(phi)] };
  }
  function geom(theta) { // rotate the bent tube (about the eye) so that its mouth aims at the lamp
    const f = a => { const g = centre(theta, a); const v = [LAMP[0] - g.M[0], LAMP[1] - g.M[1]]; return g.dir[0] * v[1] - g.dir[1] * v[0]; };
    let lo = -1.3, hi = 0.2, flo = f(lo);
    if (theta < 0.001) lo = hi = 0;
    else for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2, fm = f(m); if ((fm > 0) === (flo > 0)) { lo = m; flo = fm; } else hi = m; }
    const g = centre(theta, (lo + hi) / 2);
    g.wa = g.pts.map((q, i) => [q[0] - Math.sin(g.phis[i]) * RT, q[1] + Math.cos(g.phis[i]) * RT]);
    g.wb = g.pts.map((q, i) => [q[0] + Math.sin(g.phis[i]) * RT, q[1] - Math.cos(g.phis[i]) * RT]);
    return g;
  }
  const toLocal = w => [(DX - w[0]) / DS, (w[1] - DY) / DS];

  E.scene({
    name: 'Rulo deneyi', concept: 'Düz ve bükülmüş rulo ile gözlem', from: 'tube', to: 'data', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('tube'), ss = E.s('straight'), sb = E.s('bent'), sd = E.s('data');
      const theta = 0.9 * E.se(t, sb + 0.3, sb + 1.8);
      const g = geom(theta);
      ctx.fillStyle = 'rgba(24,25,40,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      // floor
      stroke(ctx, [[-20, DY + 4], [1940, DY]], { w: 3, seed: 3 });
      P.fillPts(ctx, [[-20, DY + 4], [1940, DY], [1940, 1100], [-20, 1100]], '#D9C8A6', 0.35);
      // lamp + faint rays in all directions
      F.nightLamp(ctx, LAMP[0], DY, LAMP[1], 1, 1.2);
      F.burst(ctx, LAMP[0], LAMP[1], 12, 50, 150, E.se(t, st + 0.8, st + 2.0), { a0: 0.26, alpha: 0.45, w: 2.2, head: 10 });
      P.write(ctx, 'gece lambası', LAMP[0], DY + 60, E.se(t, st + 1.0, st + 2.0), { size: 38, align: 'center' });

      // tube (cross-section)
      const poly = g.wa.concat(g.wb.slice().reverse());
      P.fillPts(ctx, poly, '#FAF6EC', 0.7); wash(ctx, poly, '#D9C9A6', 0.3, 61, { bleed: 1, blooms: 0 });
      stroke(ctx, g.wa, { w: 3.2, seed: 62, taper: 0.02 }); stroke(ctx, g.wb, { w: 3.2, seed: 63, taper: 0.02 });
      stroke(ctx, [g.wa[g.wa.length - 1], g.wb[g.wb.length - 1]], { w: 1.4, alpha: 0.4, dry: false });
      const mid = g.pts[Math.floor(g.pts.length * 0.75)];
      P.write(ctx, 'kâğıt rulo (kesit)', 1000, EYE[1] + 110, E.se(t, st + 1.6, st + 2.6) * (1 - E.se(t, sb, sb + 0.5)), { size: 36, align: 'center' });

      // ray: lamp → mouth → (eye | wall)
      const u0 = [g.M[0] - LAMP[0], g.M[1] - LAMP[1]], dM = Math.hypot(...u0), u = [u0[0] / dM, u0[1] / dM];
      const start = [LAMP[0] + u[0] * 34, LAMP[1] + u[1] * 34];
      let tt = F.firstHit([LAMP[0] + u[0] * (dM - 4), LAMP[1] + u[1] * (dM - 4)], u, [g.wa, g.wb]);
      let end, blocked = false;
      if (tt != null) { end = [LAMP[0] + u[0] * (dM - 4 + tt), LAMP[1] + u[1] * (dM - 4 + tt)]; blocked = true; } else end = [EYE[0] - 6, EYE[1]];
      let rk = 0;
      if (t < sb) rk = E.se(t, ss + 0.3, ss + 2.3, 'sine');
      else rk = E.se(t, sb + 2.0, sb + 3.2, 'sine');
      if (t >= sb && t < sb + 2.0) rk = 0;
      if (t >= sd) rk = 1;
      F.ray(ctx, start, end, rk, { heads: [0.25, 0.6], w: 4 });
      if (blocked && rk > 0.99) {
        F.glow(ctx, end[0], end[1], 40, 1);
        INK.leader(ctx, [1180, 660], [end[0] - 6, end[1] - 8], { w: 1.4, bend: 0.2 });
        P.write(ctx, 'ışık kıvrımı dönemez', 1100, 640, E.seg(t, sb + 3.3, sb + 4.3), { size: 40, align: 'center', color: '#8A4A10' });
      }

      // Damla holding the tube
      const h1 = toLocal(g.pts[12]), h2 = toLocal(g.pts[5]);
      const sees = t > ss + 2.3 && t < sb + 0.3;
      const expr = t < ss ? 'curious' : (t < sb + 0.3 ? (sees ? 'happy' : 'curious') : (t < sd ? 'surprised' : 'determined'));
      DAMLA.draw(ctx, { x: DX, y: DY, s: DS, view: 'side', flip: true, expr, look: [0.2, 0], blink: 0, squash: 1, arms: [[1, h1], [-1, h2]], t, seed: 1 });
      // re-draw the tube end over the hands so it reads as "held"
      stroke(ctx, g.wa.slice(0, 16), { w: 3.2, seed: 62, taper: 0.02 }); stroke(ctx, g.wb.slice(0, 16), { w: 3.2, seed: 63, taper: 0.02 });

      // what Damla sees (eye view inset)
      const ik = E.se(t, ss + 2.4, ss + 3.0, 'out') * (1 - E.se(t, sd - 0.2, sd + 0.4));
      if (ik > 0) {
        const cx = 1560, cy = 300, r = 105 * P.pop(ik);
        ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fillStyle = '#23242F'; ctx.fill(); ctx.clip();
        const see = t < sb + 1.2;
        if (see) { F.glow(ctx, cx, cy, 120, 1); F.bulb(ctx, cx, cy, 1.1, 1, { glow: false }); }
        ctx.restore();
        stroke(ctx, circlePts(cx, cy, r, r, 60), { w: 5, closed: true, seed: 71 });
        INK.label(ctx, 'rulonun içinden', cx, cy - r - 22, { size: 34, weight: 700, align: 'center' });
        P.write(ctx, see ? 'Görüyorum!' : 'Karanlık!', cx, cy + r + 58, 1, { size: 46, align: 'center', color: see ? '#8A4A10' : PAL.ink });
      }

      // data table
      const dk = E.se(t, sd + 0.2, sd + 0.9, 'out');
      if (dk > 0) {
        ctx.save(); ctx.translate(0, (1 - dk) * -400);
        F.card(ctx, 1080, 170, 760, 300, { seed: 77 });
        const rows = [['Rulo', 'Lamba görüldü mü?'], ['düz', 'evet'], ['bükülmüş', 'hayır']];
        line(ctx, [1100, 250], [1820, 246], { w: 2.4, dry: false }); line(ctx, [1330, 180], [1330, 460], { w: 2.4, dry: false }); line(ctx, [1100, 360], [1820, 356], { w: 1.4, alpha: 0.5, dry: false });
        rows.forEach(([a, b], i) => {
          const y = 228 + i * 108 + (i ? 12 : 0), k = i ? E.seg(t, sd + 0.8 + i * 1.3, sd + 1.8 + i * 1.3) : 1;
          P.write(ctx, a, 1215, y, k, { size: i ? 44 : 38, align: 'center' });
          P.write(ctx, b, i ? 1530 : 1575, y, k, { size: i ? 44 : 38, align: 'center' });
          if (i === 1) P.check(ctx, 1690, y - 16, 48, E.se(t, sd + 2.6, sd + 3.0), { w: 6 });
          if (i === 2) P.cross(ctx, 1690, y - 14, 22, E.se(t, sd + 4.0, sd + 4.4), { w: 6 });
        });
        ctx.restore();
      }
    }
  });
})();

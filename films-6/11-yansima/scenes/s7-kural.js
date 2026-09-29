// SAHNE 7 — Pürüzlü yüzeyde de her ışın kurala uyar (yerel normaller) + saatin camı: normal döner, leke kayar
(function () {
  const { PAL, line, stroke, dashed, wash } = INK;
  const F = F611, V = F.V, DEG = Math.PI / 180;
  const SURF = [[200, 780], [420, 700], [640, 800], [860, 710], [1080, 790], [1300, 720], [1520, 780], [1720, 720]];
  const D = [Math.sin(30 * DEG), Math.cos(30 * DEG)];
  const onSurf = x => { for (let i = 1; i < SURF.length; i++) if (SURF[i][0] >= x) { const a = SURF[i - 1], b = SURF[i]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]); } };
  const HITS = [330, 1030, 1420].map(x => [x, onSurf(x)]);
  const RAYS = HITS.map(h => { const p = V.sub(h, V.mul(D, 400)); return { p, segs: F.trace(p, D, [SURF], 1, 330) }; });

  function rough(ctx, t) {
    const sr = E.s('rule'), sw = E.s('why');
    const under = SURF.concat([[1720, 830], [200, 830]]);
    P.fillPts(ctx, under, '#C9D0D4', 0.9); stroke(ctx, SURF, { w: 4, seed: 781, color: '#4E5A62', taper: 0.02 });
    INK.label(ctx, 'pürüzlü yüzey (büyütülmüş)', 1700, 880, { size: 34, align: 'right', alpha: 0.75 });
    RAYS.forEach((r, i) => {
      const at = sr + 0.4 + i * 1.6;
      const s0 = r.segs[0], q = s0[1], n = s0[2];
      F.ray(ctx, s0[0], q, E.se(t, at, at + 0.7), { seed: 782 + i, heads: [0.5] });
      const kn = E.se(t, at + 0.7, at + 1.1);
      if (kn > 0) { const tp = V.add(q, V.mul(n, 170 * kn)); const pts = []; for (let j = 0; j <= 24; j++) pts.push(E.mix(q, tp, j / 24)); dashed(ctx, pts, { w: 2.6, on: 10, off: 8, color: PAL.water }); }
      const ko = E.se(t, at + 1.0, at + 1.7);
      for (let j = 1; j < r.segs.length; j++) F.ray(ctx, r.segs[j][0], r.segs[j][1], ko, { seed: 790 + i * 3 + j, heads: [0.6] });
      if (ko > 0.3) {
        const toS = V.mul(D, -1), rf = V.norm(V.sub(r.segs[1][1], r.segs[1][0]));
        ctx.save(); ctx.globalAlpha *= E.se(t, at + 1.4, at + 1.9);
        F.angleArc(ctx, q, n, toS, 62, { fill: PAL.water, fillA: 0.22, color: PAL.water, w: 2.4, seed: 800 + i });
        F.angleArc(ctx, q, n, rf, 62, { fill: PAL.light, fillA: 0.3, color: '#8A4A10', w: 2.4, seed: 810 + i });
        ctx.restore();
      }
    });
    E.inkText(ctx, 'her noktada: gelme açısı = yansıma açısı', 960, 230, t, sr + 5.4, 1e9, { size: 50, align: 'center', color: '#8A4A10' });
    E.inkText(ctx, 'normaller farklı yönde → ışınlar dağılır', 960, 300, t, sw + 0.3, 1e9, { size: 42, align: 'center', color: PAL.water });
  }

  // saatin camı: cam eğilince normal döner, yansıyan ışın ve leke kayar (hesaplanır)
  const G0 = [820, 700], WALL = 1600, SRC = [300, 390];
  function glass(ctx, t) {
    const sw = E.s('why');
    const phi = (8 + 6 * Math.sin((t - sw - 2.6) * 1.4)) * DEG;
    const u = [Math.cos(phi), Math.sin(phi)], n = [Math.sin(phi), -Math.cos(phi)];
    line(ctx, [WALL, 180], [WALL, 880], { w: 3, seed: 820 });
    wash(ctx, [[WALL, 180], [1880, 180], [1880, 880], [WALL, 880], [WALL, 180]], '#D9C9A6', 0.3, 821, { bleed: 1, blooms: 0 });
    INK.label(ctx, 'duvar', 1740, 860, { size: 34, align: 'center', alpha: 0.7 });
    ctx.save(); ctx.translate(G0[0], G0[1]); ctx.rotate(phi); F.mirror(ctx, -170, 170, 0, { th: 16 }); ctx.restore();
    INK.label(ctx, 'saatin camı', G0[0], G0[1] + 90, { size: 36, align: 'center', weight: 700 });
    const d = V.norm(V.sub(G0, SRC)), r = V.reflect(d, n), sp = V.add(G0, V.mul(r, (WALL - G0[0]) / r[0]));
    F.ray(ctx, SRC, G0, 1, { seed: 822, heads: [0.5] });
    F.ray(ctx, G0, sp, 1, { seed: 823, heads: [0.5] });
    const tp = V.add(G0, V.mul(n, 260)); const pts = []; for (let j = 0; j <= 30; j++) pts.push(E.mix(G0, tp, j / 30));
    dashed(ctx, pts, { w: 3, on: 12, off: 9, color: PAL.water });
    INK.label(ctx, 'normal', tp[0] + 14, tp[1] - 6, { size: 34, weight: 700, color: PAL.water });
    F.glow(ctx, WALL + 6, sp[1], 90, 1, '250,215,120');
    const el = INK.circlePts(WALL + 6, sp[1], 12, 40, 30); P.fillPts(ctx, el, '#FFE9A8'); stroke(ctx, el, { w: 2, closed: true, color: F.AMB, dry: false });
    E.inkText(ctx, 'cam eğilir → normal döner → leke kayar', 960, 230, t, sw + 2.6, 1e9, { size: 46, align: 'center', color: '#8A4A10' });
  }

  E.scene({
    name: 'Kural her yüzeyde', concept: 'Pürüzlü yüzeyde yerel normaller', from: 'rule', to: 'why', trFrom: [760, 710],
    draw(ctx, t) {
      const sw = E.s('why');
      const k = E.se(t, sw + 1.8, sw + 2.6);
      if (k < 1) E.layer(ctx, 1 - k, c => rough(c, t));
      if (k > 0) E.layer(ctx, k, c => glass(c, t));
    }
  });
})();

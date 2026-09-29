// SAHNE 3 — Hücre gözlemi: birden fazla örnek (bitki + hayvan), görüş alanları, mikroskop yoksa görseller
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  function onionIcon(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = P.bez([0, -70], [70, 10], [0, 50], 20).concat(P.bez([0, 50], [-70, 10], [0, -70], 20));
    P.fillPts(ctx, b, '#F0D9A8'); wash(ctx, b, '#C08A3A', 0.5, 61, { bleed: 1, blooms: 0 }); stroke(ctx, b, { w: 3, closed: true, seed: 62 });
    stroke(ctx, P.bez([0, -60], [30, 0], [0, 45], 14), { w: 1.6, dry: false, alpha: 0.6 }); stroke(ctx, P.bez([0, -60], [-30, 0], [0, 45], 14), { w: 1.6, dry: false, alpha: 0.6 });
    [-12, 0, 12].forEach(dx => line(ctx, [dx * 0.5, 50], [dx, 70], { w: 1.6, dry: false }));
    ctx.restore();
  }
  function swabIcon(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.6);
    line(ctx, [-70, 0], [60, 0], { w: 5, taper: 0 });
    const c = circlePts(70, 0, 20, 11, 20); P.fillPts(ctx, c, PAL.white); stroke(ctx, c, { w: 2.4, closed: true });
    ctx.restore();
  }
  function leafIcon(ctx, x, y, s) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.5);
    const l = P.bez([-70, 0], [0, -50], [70, 0], 20).concat(P.bez([70, 0], [0, 50], [-70, 0], 20));
    P.fillPts(ctx, l, '#B9CF8A'); wash(ctx, l, PAL.life, 0.6, 63, { bleed: 1, blooms: 0 }); stroke(ctx, l, { w: 3, closed: true, seed: 64 });
    line(ctx, [-90, 0], [60, 0], { w: 2 });
    ctx.restore();
  }
  function lam(ctx, x, y, col) {
    const b = INK.wobble([[x - 150, y - 44], [x + 150, y - 44], [x + 150, y + 44], [x - 150, y + 44], [x - 150, y - 44]], 1, 70 + x);
    P.fillPts(ctx, b, '#E3EEF2', 0.95); stroke(ctx, b, { w: 3, closed: true, seed: 71 });
    const s = INK.wobble(circlePts(x, y, 44, 30, 30), 3, 72 + x); wash(ctx, s, col, 0.55, 73 + x, { bleed: 1, blooms: 0 });
    const lm = [[x - 52, y - 40], [x + 52, y - 40], [x + 52, y + 40], [x - 52, y + 40], [x - 52, y - 40]]; P.fillPts(ctx, lm, '#FFFFFF', 0.35); stroke(ctx, lm, { w: 1.8, closed: true, dry: false, seed: 74 });
  }
  const VIEWS = [
    { id: 'onion', kind: 'onion', name: 'soğan zarı', a: 'köşeli', b: 'düzenli dizilmiş', col: '#3E5A1A' },
    { id: 'cheek', kind: 'cheek', name: 'yanak hücreleri', a: 'yuvarlak', b: 'düzensiz', col: '#2E3E6A' },
    { id: 'leaf', kind: 'leaf', name: 'yaprak', a: 'yeşil tanecikler', b: 'soğan zarında yoktu', col: '#3E5A1A' }
  ];
  E.scene({
    name: 'Gözlem', concept: 'Bitki ve hayvan hücresi gözlemi', from: 'samples', to: 'nomicro', trFrom: [960, 540],
    draw(ctx, t) {
      const F = F09, ss = E.s('samples'), so = E.s('onion'), sn = E.s('nomicro');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      const tab = [[-20, 905], [1940, 895], [1940, 1100], [-20, 1100]]; P.fillPts(ctx, tab, '#D9C4A0', 0.8); stroke(ctx, [[-20, 905], [1940, 895]], { w: 3.4, seed: 5 });
      // ---- phase A: three samples ----
      const outA = E.se(t, so - 0.6, so + 0.2);
      if (outA < 1) E.layer(ctx, 1 - outA, c => {
        P.write(c, 'Birden fazla örnek', 960, 250, E.seg(t, ss + 0.3, ss + 1.5), { size: 64, align: 'center' });
        const S = [[480, onionIcon, 'soğan zarı', '#C08A3A', 'bitki'], [960, swabIcon, 'yanak hücreleri', '#6D86B8', 'hayvan (insan)'], [1440, leafIcon, 'yaprak', PAL.life, 'bitki']];
        S.forEach(([x, ic, name, col, grp], i) => {
          const k = E.se(t, ss + 1.4 + i * 1.6, ss + 2.1 + i * 1.6, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 540); c.scale(P.pop(k), P.pop(k)); c.translate(-x, -540);
          c.translate(x, 540); c.scale(1.25, 1.25); c.translate(-x, -540); ic(c, x, 420, 0.9); lam(c, x, 580, col);
          c.restore();
          P.write(c, name, x, 730, k, { size: 46, align: 'center' });
          P.write(c, grp, x, 785, E.seg(t, ss + 2.2 + i * 1.6, ss + 3 + i * 1.6), { size: 34, weight: 400, align: 'center', color: i === 1 ? '#2E3E6A' : '#3E5A1A' });
        });
      });
      // ---- phase B: microscope views ----
      const inB = E.se(t, so - 0.2, so + 0.6), toPhotos = E.se(t, sn, sn + 1);
      if (inB > 0) E.layer(ctx, inB, c => {
        F.microscope(c, 300, 905, 0.72, { lampOn: true });
        // which view
        let vi = 0; if (t >= E.s('cheek')) vi = 1; if (t >= E.s('leaf')) vi = 2;
        const v = VIEWS[vi], s0 = E.s(v.id);
        const R = E.lerp(320, 0, toPhotos), cx = 1120, cy = 500;
        const eyeP = [300 + 60 * 0.72, 905 - 630 * 0.72];
        if (R > 5) {
          c.save(); c.globalAlpha = 0.5 * (1 - toPhotos); INK.dashed(c, [eyeP, [cx - R * 0.8, cy - R * 0.6]], { w: 2, on: 8, off: 7 }); INK.dashed(c, [eyeP, [cx - R * 0.8, cy + R * 0.6]], { w: 2, on: 8, off: 7 }); c.restore();
          const focus = E.se(t, s0 + 0.2, s0 + 1.4);
          F.fov(c, cx, cy, R, v.kind, focus, t);
          // cross-fade from previous view
          if (vi > 0 && t < s0 + 0.6) { c.save(); c.globalAlpha = 1 - E.seg(t, s0, s0 + 0.6); F.fov(c, cx, cy, R, VIEWS[vi - 1].kind, 1, t); c.restore(); }
          const kt = (1 - toPhotos);
          P.write(c, v.name, 1500, 270, E.seg(t, s0 + 0.4, s0 + 1.4) * kt, { size: 54, color: v.col });
          const pa = vi === 2 ? [cx - 30, cy - 70] : vi === 1 ? [cx - 100, cy - 110] : [cx + 60, cy - 30];
          F.tag(c, v.a, 1540, 420, pa, E.se(t, s0 + 1.6, s0 + 2.4) * kt, { size: 44, seed: 30 + vi });
          P.write(c, v.b, 1540, 520, E.seg(t, s0 + 3.2, s0 + 4.2) * kt, { size: 40, weight: 400 });
          if (vi === 0) F.tag(c, 'çekirdek', 1540, 640, [cx + 10, cy + 60], E.se(t, s0 + 4.4, s0 + 5.2) * kt, { size: 36, weight: 400, seed: 40 });
        }
        // photos / digital content
        if (toPhotos > 0) {
          const lk = P.pop(toPhotos); P.icon.laptop(c, 1150, 470, 1.6 * lk);
          if (lk > 0.3) { c.save(); c.translate(1150, 470); c.scale(lk, lk); P.fillPts(c, [[-106, -106], [106, -106], [106, 26], [-106, 26]], PAL.white); c.restore(); F09.animalCell(c, 1150, 430 + (1 - lk) * 0, 150 * lk, 100 * lk, {}); }
          VIEWS.forEach((w, i) => {
            const k = E.se(t, sn + 0.8 + i * 0.5, sn + 1.4 + i * 0.5, 'out'); if (k <= 0) return;
            const x = 850 + i * 300, y = 740;
            c.save(); c.translate(x, y); c.rotate((i - 1) * 0.06); c.scale(P.pop(k), P.pop(k));
            const fr = [[-110, -100], [110, -100], [110, 110], [-110, 110], [-110, -100]]; P.fillPts(c, fr, PAL.white); stroke(c, fr, { w: 2.4, closed: true, seed: 80 + i });
            c.restore();
            F.fov(c, x, y - 8, 85 * P.pop(k), w.kind, 1, t);
          });
          P.write(c, 'fotoğraflar · dijital içerikler', 1150, 230, E.seg(t, sn + 1.8, sn + 3), { size: 46, align: 'center' });
        }
      });
      // Damla
      const ob = t > so;
      DAMLA.draw(ctx, { x: ob ? 560 : 1720, y: ob ? 905 : 900, s: ob ? 1.05 : 0.95, view: 'q3', flip: !ob, expr: t > E.s('leaf') + 1 && t < sn ? 'surprised' : 'curious', look: ob ? [0.9, -0.4] : [-0.6, -0.2], blink: E.blink(t, 5), squash: E.breath(t), t, talk: E.talk(t), seed: 2, arms: ob ? [[-1, 0.4], [1, 2.1 + Math.sin(t * 2) * 0.06]] : [[-1, 0.35], [1, 0.4]] });
    }
  });
})();

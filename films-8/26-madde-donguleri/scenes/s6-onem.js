// SAHNE 6 — Döngülerin yaşam için önemi; döngüleri bozan sorunlar (ayrılıp birleşme): asit yağmurları, ozon tabakası, sera etkisi/küresel ısınma
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const U = U7;
  const dense = (pts, step = 4) => { const o = [pts[0]]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / step)); for (let j = 1; j <= n; j++) o.push(E.mix(a, b, j / n)); } return o; };
  function jar(ctx, x, by, lvl, col, name) {
    const w = 170, h = 260;
    const body = [[x - w / 2, by - h], [x - w / 2, by - 16], [x - w / 2 + 16, by], [x + w / 2 - 16, by], [x + w / 2, by - 16], [x + w / 2, by - h]];
    ctx.save(); P.path(ctx, body); ctx.closePath(); ctx.clip();
    P.fillPts(ctx, U.rect(x - w / 2, by - (h - 10) * lvl, x + w / 2, by + 2), col, 0.55);
    ctx.restore();
    stroke(ctx, body, { w: 3, seed: 2800 + name.length });
    const lid = U.rect(x - w / 2 - 8, by - h - 26, x + w / 2 + 8, by - h); P.fillPts(ctx, lid, '#D9CDB4'); stroke(ctx, lid, { w: 2.4, dry: false });
    U.txt(ctx, name, x, by + 50, { size: 40, align: 'center' });
  }
  function panel(ctx, x0, k, title, seed) {
    U.card(ctx, x0, 180, 540, 700, { seed, fill: '#FAF6EC' });
    U.fit(ctx, title, x0 + 270, 245, 490, 46, { color: U.AMBER });
  }
  E.scene({
    name: 'Yaşam için önemi', concept: 'Döngüler maddeyi yeniden kullanılır kılar', from: 'why', to: 'why', trFrom: [960, 540],
    draw(ctx, t) {
      const s0 = E.s('why'), e0 = E.e('why');
      const drain = E.se(t, s0 + 0.8, s0 + 4.2), refill = E.se(t, s0 + 5.0, s0 + 7.4);
      const lvl = 0.85 - 0.7 * drain + 0.7 * refill;
      jar(ctx, 560, 720, lvl, PAL.water, 'tatlı su');
      jar(ctx, 960, 720, lvl, '#8FB8D0', 'oksijen');
      jar(ctx, 1360, 720, lvl, PAL.life, 'besin');
      E.inkText(ctx, 'döngü olmasaydı → tükenirdi', 960, 300, t, s0 + 1.2, s0 + 5.0, { size: 52, align: 'center' });
      const lk = E.seg(t, s0 + 4.8, s0 + 6.6);
      if (lk > 0) { const loop = dense(P.arc(960, 700, 560, -Math.PI * 0.9, -Math.PI * 0.1, 80, 320), 5); ctx.save(); ctx.globalAlpha *= 0.9; P.drawOn(ctx, loop, lk, { w: 5, color: PAL.water }); ctx.restore(); if (lk >= 1) INK.arrowHead(ctx, loop[loop.length - 6], loop[loop.length - 1], 20, { w: 5, color: PAL.water }); }
      E.inkText(ctx, 'döngü → aynı madde tekrar kullanılır', 960, 300, t, s0 + 5.4, e0 + 1, { size: 52, align: 'center', color: PAL.water });
      U.damla(ctx, t, { x: 1720, y: 860, s: 0.85, view: 'q3', flip: true, expr: t > s0 + 5 ? 'happy' : 'sad', look: [-0.8, 0], arms: t > s0 + 5 ? [[-1, 2.4], [1, 2.4]] : [[-1, 0.3], [1, 0.3]], seed: 8 });
    }
  });
  E.scene({
    name: 'Döngüleri bozan sorunlar', concept: 'Asit yağmurları, ozon tabakası, sera etkisi ve küresel ısınma', from: 'jigsaw', to: 'green', trFrom: [960, 540],
    draw(ctx, t) {
      const sJ = E.s('jigsaw'), sA = E.s('acid'), sO = E.s('ozone'), sG = E.s('green');
      // ---- ayrılıp birleşme: dört grup ----
      const jk = 1 - E.se(t, sA - 0.4, sA + 0.3);
      if (jk > 0) E.layer(ctx, jk, c => {
        const topics = [['asit yağmurları', '#8A8A3A'], ['ozon tabakası', '#8C7BB8'], ['sera etkisi', U.HEAT], ['küresel ısınma', '#C07F1E']];
        topics.forEach(([nm, col], i) => {
          const x = 330 + i * 420, y = 470, at = sJ + 1.0 + i * 0.5, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha *= k;
          const tb = circlePts(x, y + 60, 110, 44, 36); P.fillPts(c, tb, '#E3D3B3'); stroke(c, tb, { w: 2.6, closed: true, dry: false });
          for (let j = 0; j < 4; j++) { const a = j / 4 * 6.283 + 0.4, px = x + Math.cos(a) * 150, py = y + 60 + Math.sin(a) * 70; P.fillPts(c, circlePts(px, py - 30, 22, 22, 18), col, 0.6); stroke(c, circlePts(px, py - 30, 22, 22, 18), { w: 2, closed: true, dry: false }); }
          U.fit(c, nm, x, y - 110, 380, 44, { color: col === '#C07F1E' ? U.AMBER : col });
          c.restore();
        });
        P.write(c, 'ayrıl → araştır → birleş, paylaş', 960, 760, E.seg(t, sJ + 4.6, sJ + 5.8), { size: 48, align: 'center' });
        U.flow(c, [330, 610], [860, 700], E.seg(t, sJ + 5.0, sJ + 5.8), { color: PAL.inkSoft, w: 3 });
        U.flow(c, [1590, 610], [1060, 700], E.seg(t, sJ + 5.0, sJ + 5.8), { color: PAL.inkSoft, w: 3 });
      });
      // ---- 1: asit yağmurları ----
      const ak = E.se(t, sA, sA + 0.6, 'out');
      if (ak > 0) E.layer(ctx, ak, c => {
        const x0 = 90; panel(c, x0, ak, 'Asit yağmurları', 2810);
        U.factory(c, x0 + 150, 700, 0.72, t, 1);
        U.cloud(c, x0 + 330, 360, 0.75, { seed: 5, dark: 0.8 });
        U.rain(c, x0 + 330, 400, 180, 300, t, 1, { color: '#8A8A3A', n: 16, seed: 2811 });
        // yaprakları dökülmüş ağaç
        line(c, [x0 + 430, 710], [x0 + 434, 590], { w: 8, color: '#5B4430', dry: false }); line(c, [x0 + 433, 630], [x0 + 470, 580], { w: 4, color: '#5B4430', dry: false }); line(c, [x0 + 432, 612], [x0 + 400, 570], { w: 4, color: '#5B4430', dry: false });
        line(c, [x0 + 20, 710], [x0 + 520, 706], { w: 3, dry: false });
        U.flow(c, [x0 + 170, 520], [x0 + 250, 400], E.seg(t, sA + 1, sA + 2), { color: PAL.inkSoft, w: 3 });
        P.write(c, 'bazı gazlar + yağmur suyu', x0 + 270, 770, E.seg(t, sA + 1.4, sA + 2.6), { size: 32, align: 'center' });
        P.write(c, 'orman, göl, yapılar zarar görür', x0 + 270, 830, E.seg(t, sA + 4, sA + 5.2), { size: 32, align: 'center' });
      });
      // ---- 2: ozon tabakası ----
      const ok = E.se(t, sO, sO + 0.6, 'out');
      if (ok > 0) E.layer(ctx, ok, c => {
        const x0 = 690; panel(c, x0, ok, 'Ozon tabakası', 2812);
        c.save(); c.beginPath(); c.rect(x0 + 6, 270, 528, 604); c.clip();
        const ex = x0 + 270;
        const ea = circlePts(ex, 1160, 450, 450, 120); P.fillPts(c, ea, '#D6E5EC'); wash(c, ea, PAL.water, 0.4, 2813, { bleed: 2, blooms: 1 }); stroke(c, ea, { w: 3, closed: true });
        // ozon katmanı (bir bölgesi incelmiş)
        const oz = P.arc(ex, 1160, 560, -Math.PI * 0.85, -Math.PI * 0.15, 80);
        for (let i = 0; i < oz.length - 1; i++) { const thin = Math.abs(i - 48) < 6 ? 0.2 : 1; c.save(); c.globalAlpha *= thin; line(c, oz[i], oz[i + 1], { w: 16, color: '#8C7BB8', dry: false, taper: 0 }); c.restore(); }
        c.restore();
        U.txt(c, 'ozon', x0 + 70, 680, { size: 34, color: '#6A5A98' }); U.txt(c, 'incelmiş', x0 + 400, 578, { size: 26, color: '#6A5A98', align: 'center' });
        P.sun(c, x0 + 100, 350, 44, t, { cells: false, nrays: 12, glow: false });
        // morötesi ışınlar: çoğu süzülür, incelmiş yerden biri geçer
        [[x0 + 230, 603, false], [x0 + 518, 728, true], [x0 + 150, 613, false]].forEach(([tx, ty, pass], i) => {
          const k = E.seg(t, sO + 1 + i * 0.4, sO + 2 + i * 0.4); if (k <= 0) return;
          const end = [tx, ty];
          const pts = dense([[x0 + 140, 380], end], 4);
          c.save(); dashed(c, P.partial(pts, k), { w: 3.5, color: '#C07F1E', on: 12, off: 8 }); c.restore();
          if (!pass && k >= 1) P.cross(c, tx, ty, 14, 1, { w: 4, color: PAL.ink });
        });
        U.txt(c, 'morötesi ışınlar', x0 + 400, 360, { size: 32, align: 'center', color: '#C07F1E' });
        P.write(c, 'bazı eski gazlar inceltti → yasaklandı', x0 + 270, 850, E.seg(t, sO + 4, sO + 5.4), { size: 30, align: 'center' });
      });
      // ---- 3: sera etkisi · küresel ısınma ----
      const gk = E.se(t, sG, sG + 0.6, 'out');
      if (gk > 0) E.layer(ctx, gk, c => {
        const x0 = 1290; panel(c, x0, gk, 'Sera etkisi · küresel ısınma', 2814);
        const ex = x0 + 230, ey = 560;
        const atm = circlePts(ex, ey, 200, 200, 60); wash(c, atm, '#C07F1E', 0.12 + 0.25 * E.se(t, sG + 1, sG + 4), 2815, { bleed: 3, blooms: 1 });
        P.earth(c, ex, ey, 130);
        for (let i = 0; i < 6; i++) { const at = sG + 1 + i * 0.5, k = E.se(t, at, at + 0.4, 'out'); if (k <= 0) continue; const a = -2.4 + i * 0.95; c.save(); c.globalAlpha *= k; U.gas(c, 'CO2', ex + Math.cos(a) * 172, ey + Math.sin(a) * 172, 30, U.CO2C); c.restore(); }
        U.thermo(c, x0 + 470, 700, 300, 0.35 + 0.45 * E.se(t, sG + 2, sG + 5));
        P.write(c, 'karbondioksit artar → ısı tutulur', x0 + 270, 800, E.seg(t, sG + 2.5, sG + 3.6), { size: 32, align: 'center' });
        P.write(c, '≠ ozon incelmesi', x0 + 270, 850, E.seg(t, sG + 5.4, sG + 6.4), { size: 34, align: 'center', color: U.AMBER });
      });
    }
  });
})();

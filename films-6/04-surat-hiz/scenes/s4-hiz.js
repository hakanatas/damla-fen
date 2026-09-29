// SAHNE 4 — Hız: birim zamandaki yer değiştirme (büyüklük + yön); aynı sürat, farklı hız; dairesel pist; sabit hız
(function () {
  const { PAL, line, stroke, dashed, circlePts } = INK;
  function road(ctx, y, seed) { P.fillPts(ctx, [[60, y], [1860, y], [1860, y + 22], [60, y + 22]], '#CFC3AA', 0.8); line(ctx, [60, y], [1860, y + 1], { w: 3, seed, taper: 0.01 }); }
  function compass(ctx, x, y) {
    P.arrow(ctx, [x, y], [x + 70, y], 1, { w: 3, head: 12 }); INK.label(ctx, 'D', x + 90, y + 12, { size: 30, weight: 700 });
    P.arrow(ctx, [x, y], [x - 70, y], 1, { w: 3, head: 12 }); INK.label(ctx, 'B', x - 112, y + 12, { size: 30, weight: 700 });
    INK.label(ctx, '(D: doğu, B: batı)', x, y + 50, { size: 26, align: 'center', alpha: 0.6 });
  }
  E.scene({
    name: 'Hız', concept: 'Hız: büyüklük ve yön', from: 'hiz', to: 'twocars', trFrom: [960, 540],
    draw(ctx, t) {
      const sh = E.s('hiz'), sc = E.s('twocars');
      const swap = E.se(t, sc - 0.3, sc + 0.5);
      compass(ctx, 1660, 230);
      if (swap < 1) E.layer(ctx, 1 - swap, c => {
        const ck = E.se(t, sh + 0.3, sh + 1.0, 'out');
        if (ck > 0) { c.save(); c.translate(760, 280); c.scale(P.pop(ck), P.pop(ck)); F64.card(c, -460, -100, 460, 100, { seed: 4301 });
          INK.label(c, 'Hız = birim zamandaki', 0, -18, { size: 46, weight: 700, align: 'center' }); INK.label(c, 'yer değiştirme', 0, 46, { size: 46, weight: 700, align: 'center', color: F64.YER }); c.restore(); }
        road(c, 720, 4302);
        const x = 380 + 250 * E.clamp(t - sh - 1, 0, 3.6);
        F64.bike(c, x, 720, 1, x);
        const ak = E.se(t, sh + 3.0, sh + 3.8);
        if (ak > 0) { F64.varrow(c, [x + 80, 560], [x + 80 + 250, 560], ak); c.save(); c.globalAlpha = ak; F64.tag(c, '5 m/s, doğuya', x + 200, 520, { size: 40, color: F64.YER, seed: 4303 }); c.restore(); }
        E.inkText(c, 'büyüklük + yön', 1400, 880, t, sh + 4.4, 1e9, { size: 50, align: 'center', color: F64.YER });
      });
      if (swap > 0) E.layer(ctx, swap, c => {
        road(c, 540, 4310); road(c, 820, 4311);
        const el = E.clamp(t - sc - 0.6, 0, 7);
        const xa = 300 + 160 * el, xb = 1620 - 160 * el;
        F64.car(c, xa, 540, 1, t, xa);
        c.save(); c.translate(xb, 820); c.scale(-1, 1); F64.car(c, 0, 0, 1, t, xb); c.restore();
        const ak = E.se(t, sc + 1.0, sc + 1.8);
        F64.varrow(c, [xa + 110, 440], [xa + 110 + 200, 440], ak); F64.varrow(c, [xb - 110, 720], [xb - 110 - 200, 720], ak);
        if (ak >= 1) { F64.tag(c, '50 km/h doğuya', xa + 210, 400, { size: 38, color: F64.YER, seed: 4312 }); F64.tag(c, '50 km/h batıya', xb - 210, 680, { size: 38, color: F64.YER, seed: 4313 }); }
        const rk = E.se(t, sc + 4.0, sc + 4.8);
        if (rk > 0) { c.save(); c.globalAlpha = rk;
          F64.card(c, 560, 150, 1360, 330, { seed: 4314 });
          INK.label(c, 'sürat: aynı', 760, 220, { size: 50, weight: 700, align: 'center', color: F64.YOL }); P.check(c, 920, 200, 40, 1, { w: 5 });
          INK.label(c, 'hız: farklı', 1150, 220, { size: 50, weight: 700, align: 'center', color: F64.YER });
          INK.label(c, '(yönleri zıt)', 960, 295, { size: 38, align: 'center', alpha: 0.75 });
          c.restore(); }
      });
    }
  });
  E.scene({
    name: 'Dairesel pist ve sabit hız', concept: 'Yön değişirse hız değişir; sabit hız', from: 'circle', to: 'consthiz', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('circle'), sh = E.s('consthiz');
      const swap = E.se(t, sh - 0.3, sh + 0.5);
      if (swap < 1) E.layer(ctx, 1 - swap, c => {
        const cx = 760, cy = 530, rx = 280, ry = 280;
        const tr = circlePts(cx, cy, rx + 40, ry + 40, 90), ti = circlePts(cx, cy, rx - 40, ry - 40, 90);
        P.fillPts(c, tr, '#D9A27A', 0.7); P.fillPts(c, ti, PAL.paper, 1); INK.wash(c, ti, PAL.life, 0.3, 4320, { bleed: 2, blooms: 1 });
        stroke(c, tr, { w: 3, closed: true, seed: 4321 }); stroke(c, ti, { w: 3, closed: true, seed: 4322 });
        dashed(c, circlePts(cx, cy, rx, ry, 90), { w: 2, on: 12, off: 10, color: PAL.white });
        // runner at constant angular rate on a circle → sabit sürat
        const a = -Math.PI / 2 + (t - sc) * 0.9;
        const px = cx + Math.cos(a) * rx, py = cy + Math.sin(a) * ry;
        // tangent direction
        let tx = -Math.sin(a) * rx, ty = Math.cos(a) * ry; const n = Math.hypot(tx, ty); tx /= n; ty /= n;
        // earlier arrows (ghosts) to show changing direction, same length
        for (let g = 1; g <= 3; g++) { const ag = a - g * 1.3; if (ag < -Math.PI / 2) continue; const gx = cx + Math.cos(ag) * rx, gy = cy + Math.sin(ag) * ry; let ux = -Math.sin(ag) * rx, uy = Math.cos(ag) * ry; const m = Math.hypot(ux, uy); ux /= m; uy /= m; c.save(); c.globalAlpha = 0.35; F64.varrow(c, [gx, gy], [gx + ux * 140, gy + uy * 140], 1, { w: 4, head: 14 }); c.restore(); }
        F64.varrow(c, [px, py], [px + tx * 140, py + ty * 140], 1);
        c.save(); c.fillStyle = '#B5553F'; c.beginPath(); c.arc(px, py, 18, 0, 7); c.fill(); c.restore(); stroke(c, circlePts(px, py, 18, 18, 20), { w: 2.4, closed: true, dry: false });
        E.inkText(c, 'sürat: sabit', 1530, 400, t, sc + 1.5, 1e9, { size: 52, align: 'center', color: F64.YOL });
        E.inkText(c, 'yön: sürekli değişiyor', 1530, 500, t, sc + 3.0, 1e9, { size: 46, align: 'center', color: F64.YER });
        E.inkText(c, '→ hız sabit değil', 1530, 600, t, sc + 4.4, 1e9, { size: 52, align: 'center', color: F64.YER });
      });
      if (swap > 0) E.layer(ctx, swap, c => {
        const RY = 640; road(c, RY, 4330);
        const el = E.clamp(t - sh - 0.6, 0, 7), v = 200, x = 200 + v * el;
        for (let k = 1; k <= 6; k++) { if (el < k) continue; const gx = 200 + v * k; c.save(); c.globalAlpha = 0.16; F64.car(c, gx, RY, 1, t, 0); c.restore(); F64.varrow(c, [gx + 30, RY - 150], [gx + 170, RY - 150], 1, { w: 4, head: 14 }); }
        F64.car(c, x, RY, 1, t, x); F64.varrow(c, [x + 30, RY - 150], [x + 170, RY - 150], 1, { w: 5, head: 16 });
        E.inkText(c, 'Sabit hız = aynı sürat + aynı yön', 960, 300, t, sh + 1.5, 1e9, { size: 58, align: 'center', color: F64.YER });
        E.inkText(c, 'düz bir yolda, hep aynı yönde', 960, 830, t, sh + 3.0, 1e9, { size: 46, align: 'center' });
      });
    }
  });
})();

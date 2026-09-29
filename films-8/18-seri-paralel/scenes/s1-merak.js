// SAHNE 1 — Merak: avizede bir ampul patlıyor, diğerleri yanıyor; süs ışığında hepsi sönüyor → soru
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK;
  const U = U6;
  const F18 = window.F18 = {};
  // oda (akşam): duvar, zemin, pencere
  F18.room = (ctx, t) => {
    P.fillPts(ctx, [[0, 0], [1920, 0], [1920, 1080], [0, 1080]], '#2B3A55', 0.12);
    const floor = [[-20, 880], [1940, 872], [1940, 1100], [-20, 1100]];
    P.fillPts(ctx, floor, '#E9DCC0'); wash(ctx, floor, '#8A6A45', 0.25, 181, { bleed: 2, blooms: 1 });
    stroke(ctx, [[-20, 880], [1940, 872]], { w: 3.4, seed: 182, taper: 0.02 });
    const win = U.rect(120, 190, 300, 380); P.fillPts(ctx, win, '#2E4A6E', 0.55); stroke(ctx, win, { w: 3.4, closed: true, seed: 183 });
    line(ctx, [270, 190], [270, 570], { w: 3, seed: 184 }); line(ctx, [120, 380], [420, 380], { w: 3, seed: 185 });
    const R = INK.rng(7); for (let i = 0; i < 9; i++) { const x = 135 + R() * 270, y = 205 + R() * 350; if (Math.abs(x - 270) > 8 && Math.abs(y - 380) > 8) INK.inkDot(ctx, x, y, 1.6 + R() * 1.4, { color: '251,248,241', alpha: 0.6 + 0.3 * Math.sin(t * 2 + i) }); }
    P.moon(ctx, 350, 260, 26);
  };
  // avize: tavandan sarkan, 3 kollu. bs: [b0,b1,b2] parlaklıklar; pop: patlama anı (0..1)
  F18.avize = (ctx, x, y, s, bs, t, o = {}) => {
    line(ctx, [x, -10], [x, y], { w: 4, seed: 186 });
    const ring = circlePts(x, y, 26 * s, 12 * s, 30); P.fillPts(ctx, ring, '#C9A968'); stroke(ctx, ring, { w: 2.6, closed: true, seed: 187 });
    [-1, 0, 1].forEach((d, i) => {
      const bx = x + d * 190 * s, by = y + (d === 0 ? 130 : 90) * s;
      stroke(ctx, P.bez([x + d * 20 * s, y], [x + d * 150 * s, y - 20 * s], [bx, by - 30 * s], 20), { w: 3.4, seed: 188 + i });
      const cup = [[bx - 24 * s, by - 34 * s], [bx + 24 * s, by - 34 * s], [bx + 16 * s, by], [bx - 16 * s, by]];
      P.fillPts(ctx, cup, '#C9A968'); stroke(ctx, cup.concat([cup[0]]), { w: 2.4, closed: true, seed: 191 + i });
      ctx.save(); ctx.translate(bx, by - 4 * s); ctx.rotate(Math.PI); CK.bulb(ctx, 0, 0, 0.8 * s, bs[i], t, { rays: bs[i] > 0.1 }); ctx.restore();
      if (o.crack === i) { // çatlak cam
        const cx = bx, cy = by + 66 * s;
        [[-14, -10], [10, -16], [16, 8], [-6, 16]].forEach(([dx, dy], j) => line(ctx, [cx, cy], [cx + dx * s, cy + dy * s], { w: 2, dry: false, seed: 195 + j }));
      }
    });
  };
  // süs ışığı (seri): n küçük ampul sarkık kablo üzerinde; b parlaklık
  F18.garland = (ctx, x0, x1, y, n, b, t) => {
    const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([E.lerp(x0, x1, u), y + Math.sin(u * Math.PI * (n - 1)) ** 2 * 18 + Math.sin(u * Math.PI) * 30]); }
    stroke(ctx, pts, { w: 3.4, color: PAL.life, dry: false, seed: 197 });
    for (let i = 0; i < n; i++) { const p = pts[Math.round((i + 0.5) / n * 40)]; ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(Math.PI); CK.bulb(ctx, 0, 0, 0.36, b, t, { rays: false }); ctx.restore(); }
  };

  E.scene({
    name: 'Merak', concept: 'Köprü kurma: evdeki ampuller', from: 'title', to: 'q',
    draw(ctx, t) {
      const sh = E.s('hello'), ss = E.s('string'), sq = E.s('q');
      F18.room(ctx, t);
      const popT = sh + 3.2, pk = E.seg(t, popT, popT + 0.35);
      const b1 = t < popT ? 1 : 0;
      const av = E.se(t, 6.2, 7.4);
      if (av > 0) E.layer(ctx, av, c => F18.avize(c, 1400, 250, 1.1, [1, b1, 1], t, { crack: t > popT ? 1 : null }));
      if (pk > 0 && pk < 1) { ctx.save(); ctx.globalAlpha = Math.sin(pk * Math.PI); INK.splash(ctx, 1400, 470, 70, 9, { color: '#E3A03A', n: 12 }); ctx.restore(); }
      if (t > popT + 0.4 && t < ss + 1) {
        const k = Math.min(E.se(t, popT + 0.4, popT + 1.2), 1 - E.se(t, ss, ss + 0.8));
        ctx.save(); ctx.globalAlpha = k;
        P.arrow(ctx, [1620, 640], [1450, 520], 1, { w: 3, bend: -30, head: 14 });
        U.txt(ctx, 'diğerleri hâlâ yanıyor!', 1640, 680, { size: 40, align: 'center' });
        ctx.restore();
      }
      // Damla
      const surprised = t > popT && t < popT + 2.2;
      U.damla(ctx, t, { x: 760, y: 900, s: 1.45, view: 'q3', expr: t < sh ? 'happy' : surprised ? 'surprised' : t > sq ? 'curious' : 'thinking', look: t > ss && t < sq ? [-0.3, -0.7] : [0.8, -0.8], arms: t > sq ? [[-1, 0.4], [1, [40, -150]]] : [[-1, 0.35], [1, surprised ? 2.2 : 0.4]] });
      // düşünce balonu: süs ışığı
      const bk = Math.min(E.se(t, ss + 0.2, ss + 1.0), 1 - E.se(t, sq + 0.2, sq + 0.9));
      if (bk > 0) E.layer(ctx, Math.min(1, bk * 1.5), c => {
        P.bubble(c, 720, 330, 720, 330, [760, 600], Math.min(1, bk * 1.2), 4);
        if (bk > 0.8) {
          const off = t > ss + 3.2; const flick = t > ss + 2.7 && t < ss + 3.2 ? (Math.sin(t * 60) > 0 ? 1 : 0) : 1;
          F18.garland(c, 430, 1010, 250, 6, off ? 0 : 0.8 * flick, t);
          if (off) { U.txt(c, 'biri bozuldu → hepsi söndü', 720, 430, { size: 38, align: 'center', color: U.AMBER }); }
        }
      });
      // soru kartı
      const qk = E.se(t, sq + 0.3, sq + 1.0);
      if (qk > 0) E.layer(ctx, qk, c => {
        CK.card(c, 200, 170, 960, 190, { seed: 1801, fill: '#FAF6EC' });
        U.txt(c, 'Araştırma sorum:', 240, 220, { size: 34, color: U.AMBER });
        P.write(c, 'Ampullerin bağlanma şekli', 240, 280, E.seg(t, sq + 0.8, sq + 2.0), { size: 48 });
        P.write(c, 'parlaklıklarını nasıl etkiler?', 240, 340, E.seg(t, sq + 1.8, sq + 3.0), { size: 48 });
      });
      U.title(ctx, t, '18 · Seri mi, Paralel mi?');
    }
  });
})();

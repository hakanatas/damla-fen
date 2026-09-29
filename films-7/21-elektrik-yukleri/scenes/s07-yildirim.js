// SAHNE 7 — Doğada yük birikimi: şimşek (bulutlar arası), yıldırım (bulut–yer); yıldırım güvenliği (köprü kurma: şimşek ve yıldırım oluşumu)
(function () {
  const { PAL, line, stroke, wash, circlePts } = INK;
  const F = F721;
  const bolt = (ctx, pts, k, t) => {
    if (k <= 0) return; const fl = 0.6 + 0.4 * Math.abs(Math.sin(t * 23));
    ctx.save(); ctx.globalAlpha *= fl;
    stroke(ctx, P.partial(pts, k), { w: 10, color: '#F3D48A', dry: false, taper: 0.05 });
    stroke(ctx, P.partial(pts, k), { w: 3, color: PAL.white, dry: false, taper: 0.05 });
    ctx.restore();
  };
  const zig = (a, b, n, amp, seed) => { const r = INK.rng(seed), p = []; for (let i = 0; i <= n; i++) { const u = i / n; p.push([E.lerp(a[0], b[0], u) + (i && i < n ? (r() - 0.5) * amp : 0), E.lerp(a[1], b[1], u) + (i && i < n ? (r() - 0.5) * amp * 0.4 : 0)]); } return p; };
  const B1 = zig([700, 300], [1150, 290], 9, 60, 71);
  const B2 = zig([1400, 360], [1480, 800], 10, 90, 72);
  E.scene({
    name: 'Şimşek ve yıldırım', concept: 'Doğada elektriklenme; güvenlik', from: 'storm', to: 'safe', trFrom: [960, 300],
    draw(ctx, t) {
      const ss = E.s('storm'), sb = E.s('bolt'), sf = E.s('safe');
      const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(40,50,80,0.55)'); g.addColorStop(1, 'rgba(40,50,80,0.15)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
      const hill = P.hillLine(E.W, 860);
      const gr = hill.concat([[E.W + 200, E.H + 200], [-200, E.H + 200]]); P.fillPts(ctx, gr, PAL.paper, 1); wash(ctx, gr, PAL.life, 0.3, 721, { bleed: 3, blooms: 2 }); stroke(ctx, hill, { w: 4, seed: 722 });
      // bulutlar + yükler (alt kısım çoğunlukla negatif)
      [[560, 290, 1.6], [1300, 300, 1.8]].forEach(([x, y, s], i) => {
        F.stormCloud(ctx, x, y, s, t, { bolt: false });
        const qk = E.se(t, ss + 1.0, ss + 2.0);
        [-90, -30, 30, 90].forEach(dx => F.charge(ctx, x + dx * s * 0.8, y + 40 * s, -1, 14, { alpha: qk }));
        [-50, 20, 80].forEach(dx => F.charge(ctx, x + dx * s * 0.8, y - 30 * s, 1, 14, { alpha: qk }));
      });
      // ağaç ve bina
      const tx = 1480;
      line(ctx, [tx, P.hillY(hill, tx) + 4], [tx + 4, P.hillY(hill, tx) - 110], { w: 10, color: '#5A4028', taper: 0.1 });
      const crown = INK.wobble(circlePts(tx + 4, P.hillY(hill, tx) - 170, 70, 62, 44), 7, 731); P.fillPts(ctx, crown, PAL.paper); wash(ctx, crown, PAL.life, 0.55, 732, { bleed: 3 }); stroke(ctx, crown, { w: 3, closed: true, seed: 733 });
      const hx = 360, hy = P.hillY(hill, hx) + 6;
      const house = [[hx - 90, hy], [hx - 90, hy - 110], [hx, hy - 180], [hx + 90, hy - 110], [hx + 90, hy]]; F.shape(ctx, house, F.HEAT, 0.35, 734);
      F.shape(ctx, [[hx - 22, hy], [hx - 22, hy - 60], [hx + 22, hy - 60], [hx + 22, hy]], '#8A6A45', 0.5, 736);
      // şimşek (bulutlar arası), yıldırım (bulut–yer)
      const f1 = E.seg(t, ss + 2.4, ss + 2.9) * (1 - E.seg(t, ss + 4.5, ss + 4.7)) + E.seg(t, ss + 5.2, ss + 5.4) * (1 - E.seg(t, ss + 6.2, ss + 6.4));
      bolt(ctx, B1, f1, t);
      if (f1 > 0.5) F.fit(ctx, 'şimşek', 925, 420, 300, 50, { color: '#F3D48A' });
      const f2 = E.seg(t, sb + 0.4, sb + 0.9) * (1 - E.seg(t, sb + 3.6, sb + 3.8));
      const tl = zig([1360, 380], [tx - 10, P.hillY(hill, tx) - 230], 9, 70, 73);
      bolt(ctx, tl, f2, t);
      if (f2 > 0.5) F.fit(ctx, 'yıldırım', 1700, 560, 300, 50, { color: '#F3D48A' });
      E.layer(ctx, 1 - E.se(t, sf, sf + 0.6), c => F.damla(c, t, { x: 820, y: P.hillY(hill, 820) + 6, s: 1.0, view: 'q3', expr: t > sb ? 'surprised' : 'curious', look: [0.6, -0.8] }));
      // güvenlik kartı
      const kf = E.se(t, sf + 0.1, sf + 0.8, 'out');
      if (kf > 0) E.layer(ctx, kf, c => {
        const card = [[240, 170], [1680, 160], [1690, 880], [250, 890], [240, 170]];
        c.save(); c.shadowColor = 'rgba(20,20,30,0.35)'; c.shadowBlur = 28; P.fillPts(c, card, '#FAF6EC'); c.restore();
        stroke(c, card, { w: 3.4, closed: true, color: F.RED, seed: 741 });
        line(c, [250, 245], [1680, 236], { w: 3, color: F.RED, dry: false });
        c.font = '700 48px Kalam'; c.fillStyle = F.RED; c.textAlign = 'center'; c.fillText('⚠  YILDIRIMLI HAVADA', 960, 222);
        const IT = [
          ['açık alanda durma', 0, (x, y) => { stroke(c, [[x - 110, y + 60], [x + 110, y + 60]], { w: 3 }); F.damla(c, t, { x, y: y + 60, s: 0.55, view: 'front', expr: 'surprised', shadow: false }); }],
          ['ağaç altına sığınma', 0, (x, y) => { line(c, [x, y + 60], [x + 2, y - 10], { w: 8, color: '#5A4028' }); const cr = INK.wobble(circlePts(x, y - 50, 60, 48, 36), 5, 751); P.fillPts(c, cr, PAL.paper); wash(c, cr, PAL.life, 0.5, 752, { bleed: 2 }); stroke(c, cr, { w: 2.6, closed: true }); }],
          ['sudan uzak dur', 0, (x, y) => { const w = INK.wobble(circlePts(x, y + 30, 110, 40, 40), 4, 753); P.fillPts(c, w, PAL.water, 0.35); stroke(c, w, { w: 2.6, closed: true }); }],
          ['güvenli bir binaya gir', 1, (x, y) => F.shape(c, [[x - 70, y + 60], [x - 70, y - 20], [x, y - 80], [x + 70, y - 20], [x + 70, y + 60]], F.HEAT, 0.35, 754)]
        ];
        IT.forEach(([txt, ok, draw], i) => {
          const at = sf + 0.8 + i * 1.3, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const x = 440 + i * 345, y = 470;
          c.save(); c.globalAlpha *= k; draw(x, y); F.fit(c, txt, x, 700, 320, 38); c.restore();
          if (ok) P.check(c, x, 790, 70, E.se(t, at + 0.5, at + 1.0), { w: 10, color: F.GREEN });
          else P.cross(c, x, 480, 80, E.se(t, at + 0.5, at + 1.0), { w: 12, color: F.RED });
        });
      });
    }
  });
})();

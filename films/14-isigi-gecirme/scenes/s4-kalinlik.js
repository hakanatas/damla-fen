// SAHNE 4 — Kalınlık arttıkça ışık geçirgenliği azalır; günlük hayattan sis örneği
// (TYMM: "Saydam ve yarı saydam maddelerin kalınlığı arttıkça ışık geçirgenliğinin azaldığı belirtilir ... sis")
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F14;
  const L = [345, 560], MX = 800, SX = 1215, BENCH = 780;
  const STEPS = [1, 3, 6], LVL = [0.9, 0.6, 0.35];   // qualitative drawing levels

  function bench(ctx, t) {
    const s0 = E.s('thick');
    const idx = t < s0 + 2.8 ? 0 : t < s0 + 5.0 ? 1 : 2, n = STEPS[idx], lv = LVL[idx];
    stroke(ctx, [[100, BENCH], [1460, BENCH - 3]], { w: 4, seed: 401 });
    const face = [[SX, 300], [SX + 110, 330], [SX + 110, 800], [SX, 776]];
    P.fillPts(ctx, face, '#FBF8F1'); stroke(ctx, face.concat([face[0]]), { w: 3, closed: true, seed: 402 });
    line(ctx, [MX, 700], [MX, BENCH], { w: 5, seed: 403 }); line(ctx, [MX - 60, BENCH - 2], [MX + 60, BENCH - 2], { w: 6, seed: 404 });
    F.flashlight(ctx, L[0], L[1], 0, 1, 1);
    line(ctx, [200, 580], [210, BENCH], { w: 4, seed: 405 }); line(ctx, [260, 580], [250, BENCH], { w: 4, seed: 406 });
    const w = n * 9, x0 = MX - w / 2, x1 = MX + w / 2;
    const rk = E.se(t, s0 + 0.2, s0 + 1.2);
    for (let i = -2; i <= 2; i++) {
      const a = i * 0.045, p = [L[0] + 8, L[1] + i * 16], m = [x0 - 2, p[1] + Math.tan(a) * (x0 - 2 - p[0])], s = [SX + 12, p[1] + Math.tan(a) * (SX + 12 - p[0])];
      F.ray(ctx, p, m, rk, { w: 3.2, head: 13, heads: [0.5], seed: 410 + i });
      if (rk > 0.99) F.ray(ctx, [x1 + 2, m[1] + Math.tan(a) * (x1 - x0)], s, 1, { w: 3.2, head: 13, heads: [0.5], alpha: lv, seed: 420 + i });
    }
    if (rk > 0.99) {
      const g = ctx.createRadialGradient(SX + 40, 560, 0, SX + 40, 560, 120);
      g.addColorStop(0, `rgba(250,210,120,${0.95 * lv})`); g.addColorStop(0.55, `rgba(245,190,90,${0.55 * lv})`); g.addColorStop(1, 'rgba(245,190,90,0)');
      ctx.save(); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(SX + 40, 560, 70, 110, 0, 0, 7); ctx.fill(); ctx.restore();
    }
    for (let j = 0; j < n; j++) F.sheet(ctx, 'dosya', x0 + 4.5 + j * 9, 560, 280);
    P.write(ctx, n + ' kat şeffaf dosya', MX, 390, 1, { size: 42, align: 'center' });
    P.write(ctx, 'ekran', SX + 55, 860, 1, { size: 40, align: 'center' });
    // bar chart: light on the screen (qualitative)
    const bx = 1500, by = 470;
    INK.label(ctx, 'ekrandaki ışık', 1650, 205, { size: 36, weight: 700, align: 'center' });
    line(ctx, [bx - 10, by], [1820, by - 2], { w: 2.4, dry: false });
    STEPS.forEach((nn, i) => {
      if (i > idx) return; const k = i < idx ? 1 : E.se(t, s0 + 1.2 + [0, 2.8, 5.0][i], s0 + 1.8 + [0, 2.8, 5.0][i]);
      const h = 200 * LVL[i] * k, x = bx + 20 + i * 105;
      const b = [[x, by], [x + 70, by], [x + 70, by - h], [x, by - h]];
      P.fillPts(ctx, b, '#F2C46A', 0.9); stroke(ctx, b.concat([b[0]]), { w: 2.2, closed: true, dry: false });
      INK.label(ctx, nn + ' kat', x + 35, by + 40, { size: 34, weight: 700, align: 'center' });
    });
  }

  function car(ctx, x, y, s, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const body = [[-130, 40], [-120, -20], [-80, -30], [-55, -85], [55, -85], [80, -30], [120, -20], [130, 40], [-130, 40]];
    P.fillPts(ctx, body, '#A23A2A', 0.75); stroke(ctx, body, { w: 3, closed: true });
    P.fillPts(ctx, [[-45, -75], [45, -75], [62, -32], [-62, -32]], '#CFE3EC', 0.9);
    [-85, 85].forEach(dx => { F.glow(ctx, dx, 0, 110, 1); P.fillPts(ctx, circlePts(dx, 0, 20, 16, 20), '#FFF1C4'); stroke(ctx, circlePts(dx, 0, 20, 16, 20), { w: 2.4, closed: true, dry: false }); });
    [-90, 90].forEach(dx => P.fillPts(ctx, [[dx - 20, 40], [dx + 20, 40], [dx + 20, 70], [dx - 20, 70]], PAL.ink, 0.9));
    ctx.restore();
  }
  function fogPanel(ctx, x, dens, name, t, k) {
    if (k <= 0) return;
    ctx.save(); ctx.globalAlpha *= k;
    const fr = F.card(ctx, x, 190, 760, 600, { fill: '#C7CFD3', seed: 450 + (dens > 0.5 ? 1 : 0) });
    ctx.save(); P.path(ctx, fr); ctx.clip();
    P.fillPts(ctx, [[x, 560], [x + 770, 560], [x + 770, 800], [x, 800]], '#8E9498', 0.8);
    P.fillPts(ctx, [[x + 360, 560], [x + 400, 560], [x + 700, 800], [x + 60, 800]], '#5E6468', 0.8);
    car(ctx, x + 380, 590, 0.9, t);
    // fog layers in front of the car: thicker fog → less light gets through
    for (let i = 0; i < 4; i++) { ctx.fillStyle = `rgba(225,228,230,${dens / 4 + 0.02})`; ctx.fillRect(x, 190 + i * 10, 770, 620); }
    ctx.restore(); ctx.restore();
    P.write(ctx, name, x + 380, 860, k, { size: 44, align: 'center' });
  }

  E.scene({
    name: 'Kalınlık ve sis', concept: 'Kalınlık arttıkça daha az ışık geçer', from: 'thick', to: 'fog', trFrom: [800, 560],
    draw(ctx, t) {
      const sr = E.s('rule'), sf = E.s('fog');
      ctx.fillStyle = 'rgba(24,25,40,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
      const a1 = 1 - E.se(t, sf - 0.3, sf + 0.4);
      E.layer(ctx, a1, c => {
        bench(c, t);
        const rk = E.se(t, sr + 0.2, sr + 0.9);
        if (rk > 0) {
          c.save(); c.globalAlpha = rk; const b = [[240, 140], [1400, 134], [1406, 270], [246, 276], [240, 140]]; P.fillPts(c, b, '#FBF8F1', 0.95); stroke(c, b, { w: 3, closed: true, color: F.AMB }); c.restore();
          P.write(c, 'Saydam ve yarı saydam maddeler', 823, 195, E.seg(t, sr + 0.5, sr + 1.8), { size: 48, align: 'center' });
          P.write(c, 'kalınlaştıkça daha az ışık geçirir.', 823, 252, E.seg(t, sr + 1.6, sr + 2.9), { size: 48, align: 'center' });
        }
      });
      fogPanel(ctx, 140, 0.25, 'az sis', t, E.se(t, sf - 0.1, sf + 0.6, 'out'));
      fogPanel(ctx, 1020, 1.0, 'yoğun sis', t, E.se(t, sf + 1.6, sf + 2.3, 'out'));
    }
  });
})();

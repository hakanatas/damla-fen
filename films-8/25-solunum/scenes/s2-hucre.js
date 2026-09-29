// SAHNE 2 — Hücrede solunum: besin + oksijen hücreye gelir; mitokondride enerji açığa çıkar; CO₂ ve su oluşur;
// enerji ATP'de depolanır (yapısı ve sayısal değer yok); ATP kullanımı ve ısı (FB.8.7.3 a)
// Kimyasal denklem, solunum türleri ve evreleri verilmez.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  const along = (pts, u) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let r = u * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const k = r / L[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]; } r -= L[i]; } return pts[pts.length - 1]; };
  function stream(ctx, t, t0, pts, n, v, k, draw) {
    if (k <= 0 || t < t0) return;
    for (let j = 0; j < n; j++) { const born = (t - t0) * v - j / n; if (born < 0) continue; const u = ((t - t0) * v + 1 - j / n) % 1; const a = k * Math.min(1, u * 6, (1 - u) * 6); if (a <= 0) continue; const p = along(pts, u); ctx.save(); ctx.globalAlpha *= a; draw(ctx, p[0], p[1], j); ctx.restore(); }
  }
  const CX = 800, CY = 540, MX = 1010, MY = 470;
  const O2P = [[170, 300], [520, 330], [MX - 90, MY - 20]];
  const SUGP = [[170, 440], [520, 430], [MX - 100, MY + 10]];
  const CO2P = [[MX, MY + 60], [720, 730], [170, 760]];
  const H2OP = [[MX + 40, MY + 60], [760, 800], [170, 840]];
  E.scene({
    name: 'Hücrede solunum', concept: 'Besinden enerji; CO₂ ve su; ATP', from: 'cell', to: 'use', trFrom: [800, 540],
    draw(ctx, t) {
      const sc = E.s('cell'), sm = E.s('mito'), sw = E.s('waste'), sa = E.s('atp'), su = E.s('use');
      // kılcal damar (kan)
      const vessel = [[110, 170], [230, 170], [230, 900], [110, 900]];
      U.shape(ctx, vessel, '#C98A7A', 0.45, 5201, { w: 2.4 });
      for (let i = 0; i < 6; i++) { const y = 900 - (((t * 60) + i * 130) % 730); const rb = circlePts(170, y, 22, 12, 18); P.fillPts(ctx, rb, '#D9A08E', 0.9); stroke(ctx, rb, { w: 1.4, closed: true, dry: false, color: '#8E4A3A' }); }
      INK.label(ctx, 'kan', 170, 950 - 40, { size: 32, align: 'center', weight: 700, alpha: 0.8 });
      // hücre
      U.animalCell(ctx, CX, CY, 470, 330, 7, { mitoAt: [[-0.55, -0.42, 2.6], [0.12, 0.72, 0.2], [0.5, 0.58, -0.4]], ms: 1 });
      const glow = E.se(t, sm + 1.2, sm + 2.2) * (1 - E.se(t, su + 3, su + 5) * 0.5);
      if (glow > 0) { const g = ctx.createRadialGradient(MX, MY, 30, MX, MY, 220); g.addColorStop(0, `rgba(227,160,58,${0.45 * glow})`); g.addColorStop(1, 'rgba(227,160,58,0)'); ctx.fillStyle = g; ctx.fillRect(MX - 230, MY - 230, 460, 460); }
      U.mito(ctx, MX, MY, 2.6, -0.15, 9);
      if (glow > 0) for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * 0.4, r1 = 140, r2 = 140 + 30 * glow * (1 + 0.2 * Math.sin(t * 6 + i)); line(ctx, [MX + Math.cos(a) * r1, MY + Math.sin(a) * r1 * 0.7], [MX + Math.cos(a) * r2, MY + Math.sin(a) * r2 * 0.7], { w: 3, color: U.AMB, dry: false }); }
      P.write(ctx, 'hücre', 1260, 250, E.seg(t, sc + 0.3, sc + 1.0), { size: 40, color: '#8E4A3A' });
      P.write(ctx, 'mitokondri', MX, MY - 110, E.seg(t, sm + 0.3, sm + 1.2), { size: 42, align: 'center', color: '#7A4630' });
      // girenler
      const ki = E.se(t, sc + 0.6, sc + 1.2);
      stream(ctx, t, sc + 0.6, O2P, 4, 0.22, ki, (c, x, y) => U.gas(c, x, y, 'O_2', 24));
      stream(ctx, t, sc + 2.4, SUGP, 4, 0.2, E.se(t, sc + 2.4, sc + 3.0), (c, x, y) => U.sugar(c, x, y, 17));
      if (ki > 0) { U.rich(ctx, 'oksijen (O_2)', 300, 250, E.seg(t, sc + 0.8, sc + 1.8), { size: 38, color: '#1F4A63' }); P.write(ctx, 'besin (glikoz)', 300, 490, E.seg(t, sc + 2.6, sc + 3.6), { size: 36, color: '#8A5A12' }); }
      // çıkanlar
      const kw = E.se(t, sw, sw + 0.6);
      stream(ctx, t, sw, CO2P, 4, 0.2, kw, (c, x, y) => U.gas(c, x, y, 'CO_2', 26));
      stream(ctx, t, sw + 1.4, H2OP, 4, 0.2, E.se(t, sw + 1.4, sw + 2.0), (c, x, y) => U.drop(c, x, y, 12));
      if (kw > 0) { U.rich(ctx, 'karbondioksit (CO_2)', 330, 700, E.seg(t, sw + 0.3, sw + 1.3), { size: 36, color: '#4A4640' }); P.write(ctx, 'su', 330, 880, E.seg(t, sw + 1.6, sw + 2.2), { size: 36, color: PAL.water }); }
      // ATP ve kullanımı (sağ panel)
      const ka = E.se(t, sa, sa + 0.6);
      if (ka > 0) {
        for (let j = 0; j < 3; j++) { const k = E.se(t, sa + 0.4 + j * 0.5, sa + 1.0 + j * 0.5, 'out'); if (k > 0 && t < su) U.atp(ctx, MX + 150 + j * 70, MY - 40 + (j % 2) * 60, 30 * P.pop(k)); }
        U.card(ctx, 1370, 190, 460, 250, 5210, { tint: PAL.light, tintA: 0.12 });
        U.atp(ctx, 1450, 290, 40);
        P.write(ctx, 'hücrenin', 1510, 280, E.seg(t, sa + 2.0, sa + 2.8), { size: 40 });
        P.write(ctx, 'enerji parası', 1510, 330, E.seg(t, sa + 2.6, sa + 3.4), { size: 42, color: '#8A5A12' });
        INK.label(ctx, '(enerjinin bir kısmı ATP’de depolanır)', 1600, 405, { size: 26, align: 'center', alpha: 0.7 * E.se(t, sa + 3.4, sa + 4.2) });
      }
      const kU = E.se(t, su, su + 0.6);
      if (kU > 0) {
        stream(ctx, t, su, [[MX + 130, MY], [1400, 560], [1440, 700]], 4, 0.3, kU, (c, x, y) => U.atp(c, x, y, 20));
        U.card(ctx, 1370, 480, 460, 390, 5220, { tint: U.LIFE, tintA: 0.08 });
        ['kaslar çalışır', 'büyüme', 'onarım'].forEach((txt, i) => { const k = E.seg(t, su + 0.6 + i * 1.0, su + 1.4 + i * 1.0); P.check(ctx, 1420, 555 + i * 70, 34, k, { w: 5, color: U.LIFE_D }); P.write(ctx, txt, 1460, 570 + i * 70, k, { size: 40 }); });
        const kh = E.se(t, su + 3.8, su + 4.6);
        if (kh > 0) { for (let i = 0; i < 3; i++) { const pts = []; for (let j = 0; j <= 20; j++) { const u = j / 20; pts.push([1430 + i * 26 + Math.sin(u * 8 + t * 5 + i) * 5, 820 - u * 50]); } stroke(ctx, pts, { w: 3, color: U.HEAT, alpha: kh, dry: false }); } P.write(ctx, 'bir kısmı ısı olur', 1530, 810, kh, { size: 38, color: U.HEAT }); }
      }
      U.damla(ctx, t, { x: 1250, y: 925, s: 0.7, flip: true, expr: t > sm + 1 ? 'surprised' : 'curious', look: [-0.6, -0.6], prop: 'lens', arms: [[-1, 0.4], [1, 1.3]] });
    }
  });
})();

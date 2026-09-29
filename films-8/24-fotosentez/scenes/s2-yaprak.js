// SAHNE 2 — Yaprağın içinde: klorofil ışığı yakalar; su + karbondioksit kullanılır, besin (glikoz) + oksijen üretilir (FB.8.7.1 a)
// Kimyasal denkleme girilmez: girenler/çıkanlar yalnızca yaprak şeması üzerinde gösterilir.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  const along = (pts, u) => { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; } let r = u * tot; for (let i = 0; i < L.length; i++) { if (r <= L[i]) { const k = r / L[i]; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k]; } r -= L[i]; } return pts[pts.length - 1]; };
  const LC = [900, 560], LL = 720, LA = -0.2;
  const WATER = [[430, 900], [462, 780], [492, 655], [640, 612], [820, 575]];
  const FOOD = [[800, 600], [640, 636], [506, 672], [478, 780], [452, 890]];
  const CO2P = [[1590, 820], [1330, 730], [1080, 630]];
  const O2P = [[1120, 520], [1380, 440], [1680, 400]];
  // akış: n parça, hız v; k görünürlük
  function stream(ctx, t, t0, pts, n, v, k, draw) {
    if (k <= 0 || t < t0) return;
    for (let j = 0; j < n; j++) { const u = ((t - t0) * v + j / n) % 1; const born = (t - t0) * v - j / n; if (born < 0) continue; const a = k * Math.min(1, u * 6, (1 - u) * 6); if (a <= 0) continue; const p = along(pts, u); ctx.save(); ctx.globalAlpha *= a; draw(ctx, p[0], p[1], j); ctx.restore(); }
  }
  E.scene({
    name: 'Yaprağın içinde', concept: 'Fotosentez: girenler ve çıkanlar', from: 'leaf', to: 'name', trFrom: [900, 560],
    draw(ctx, t) {
      const sl = E.s('leaf'), sc = E.s('chloro'), si = E.s('inputs'), sm = E.s('make'), so = E.s('oxygen'), sn = E.s('name');
      const zoom = E.se(t, sl, sl + 2.2, 'out');
      const kn = E.se(t, sn, sn + 1.2);
      ctx.save();
      // ad beat'inde şema sola kayar
      ctx.translate(-300 * kn, 20 * kn); ctx.translate(900, 560); ctx.scale(1 - 0.12 * kn, 1 - 0.12 * kn); ctx.translate(-900, -560);
      // güneş ve ışık
      P.sun(ctx, 290, 300, 70, t, { nrays: 16, cells: false });
      const kr = E.se(t, sc + 0.4, sc + 1.6);
      [[700, 540], [820, 505], [950, 490]].forEach((q, i) => U.ray(ctx, [370 + i * 14, 350 + i * 8], q, kr, { ph: t * 6 + i }));
      // gövde (dal) ve yaprak
      ctx.save(); ctx.translate(LC[0], LC[1]); ctx.scale(E.lerp(0.35, 1, zoom), E.lerp(0.35, 1, zoom)); ctx.translate(-LC[0], -LC[1]);
      stroke(ctx, P.bez([492, 655], [455, 760], [440, 920], 20), { w: 10, color: U.LIFE_D, dry: false, taper: 0 });
      U.bigLeaf(ctx, LC[0], LC[1], LL, LA);
      ctx.restore();
      if (kr > 0) P.write(ctx, 'ışık enerjisi', 150, 470, E.seg(t, sc + 1.2, sc + 2.2), { size: 42, color: '#A06A10' });
      // su: kökten yaprağa
      const ki = E.se(t, si, si + 0.6);
      stream(ctx, t, si, WATER, 6, 0.22, ki, (c, x, y) => U.drop(c, x, y, 13));
      if (ki > 0) P.write(ctx, 'su · kökten gelir', 520, 860, E.seg(t, si + 0.4, si + 1.4), { size: 42, color: PAL.water });
      // karbondioksit: havadan yaprağa
      const kc = E.se(t, si + 2.6, si + 3.2);
      stream(ctx, t, si + 2.6, CO2P, 4, 0.2, kc, (c, x, y) => U.gas(c, x, y, 'CO_2', 30));
      if (kc > 0) { U.rich(ctx, 'karbondioksit (CO_2)', 1590, 895, E.seg(t, si + 2.9, si + 3.9), { size: 40, align: 'center', color: '#4A4640' }); INK.label(ctx, '· havadan', 1590, 850, { size: 32, align: 'center', alpha: 0.7 * kc }); }
      // besin (glikoz): yaprakta oluşur, gövdeyle taşınır
      const km = E.se(t, sm + 0.3, sm + 1.0);
      if (km > 0) {
        [[880, 540], [980, 560], [1080, 520], [760, 580]].forEach(([x, y], i) => { const k = E.se(t, sm + 0.3 + i * 0.5, sm + 0.9 + i * 0.5, 'out'); if (k > 0) U.sugar(ctx, x, y, 20 * P.pop(k)); });
        stream(ctx, t, sm + 2.0, FOOD, 5, 0.18, E.se(t, sm + 2.0, sm + 2.6), (c, x, y) => U.sugar(c, x, y, 15));
        P.write(ctx, 'besin (glikoz)', 700, 745, E.seg(t, sm + 1.0, sm + 2.0), { size: 44, color: '#8A5A12' });
      }
      // oksijen: yapraktan havaya
      const ko = E.se(t, so, so + 0.6);
      stream(ctx, t, so, O2P, 4, 0.22, ko, (c, x, y) => U.gas(c, x, y, 'O_2', 28));
      if (ko > 0) { U.rich(ctx, 'oksijen (O_2)', 1690, 345, E.seg(t, so + 0.3, so + 1.3), { size: 42, align: 'center', color: '#1F4A63' }); INK.label(ctx, '· havaya', 1690, 470, { size: 32, align: 'center', alpha: 0.7 * ko }); }
      ctx.restore();

      // kloroplast büyüteci
      const kl = E.se(t, sc, sc + 0.8) * (1 - E.se(t, sm - 0.4, sm + 0.3));
      if (kl > 0) E.layer(ctx, kl, c => {
        c.save(); c.globalAlpha *= 0.8; INK.leader(c, [1020, 520], [1180, 400], { w: 2 }); c.restore();
        const R = 175, cx = 1330, cy = 290;
        const ring = circlePts(cx, cy, R, R, 80);
        c.save(); c.shadowColor = 'rgba(60,40,20,0.25)'; c.shadowBlur = 20; P.fillPts(c, ring, '#F4F2E2'); c.restore();
        c.save(); P.path(c, ring); c.clip();
        [[-100, -60], [40, -70], [-60, 70], [90, 60], [180, -10], [-190, 10]].forEach(([dx, dy], i) => U.plantCell(c, cx + dx, cy + dy, 130, 120, i + 1, { n: 5 }));
        c.restore(); stroke(c, ring, { w: 4, closed: true, seed: 2201 });
        U.chloro(c, 1640, 250, 60, 34, 0.2, 99);
        P.write(c, 'kloroplast', 1600, 175, E.seg(t, sc + 0.9, sc + 1.8), { size: 38, align: 'center', color: U.LIFE_D });
        P.write(c, 'klorofil', 1640, 330, E.seg(t, sc + 2.2, sc + 3.0), { size: 38, align: 'center', color: U.LIFE_D });
        P.write(c, 'ışığı yakalar', 1640, 372, E.seg(t, sc + 2.8, sc + 3.6), { size: 34, align: 'center', color: '#A06A10' });
      });
      // Damla (küçük, köşede)
      const kd = 1 - E.se(t, sn - 0.3, sn + 0.4);
      if (kd > 0) E.layer(ctx, kd, c => U.damla(c, t, { x: 1170, y: 900, s: 0.8, expr: t > sm ? 'surprised' : 'curious', look: [-0.6, -0.5], prop: 'lens', arms: [[-1, 0.4], [1, 1.3]] }));

      // FOTOSENTEZ özeti: kullanılanlar / üretilenler
      if (kn > 0) E.layer(ctx, kn, c => {
        P.write(c, 'FOTOSENTEZ', 1500, 215, E.seg(t, sn + 0.4, sn + 1.4), { size: 76, align: 'center', color: U.LIFE_D });
        U.card(c, 1150, 270, 700, 270, 2210, { tint: PAL.water, tintA: 0.1 });
        P.write(c, 'Kullanılanlar', 1190, 330, E.seg(t, sn + 1.0, sn + 1.8), { size: 44, color: PAL.water });
        U.drop(c, 1220, 400, 16); P.write(c, 'su', 1260, 412, E.seg(t, sn + 1.4, sn + 2.0), { size: 40 });
        U.gas(c, 1400, 398, 'CO_2', 26); P.write(c, 'karbondioksit', 1440, 412, E.seg(t, sn + 1.8, sn + 2.6), { size: 40 });
        P.sun(c, 1222, 482, 15, t, { nrays: 10, cells: false, glow: false }); P.write(c, 'ışık enerjisi (klorofil)', 1260, 496, E.seg(t, sn + 2.4, sn + 3.2), { size: 40, color: '#A06A10' });
        U.card(c, 1150, 580, 700, 200, 2220, { tint: U.LIFE, tintA: 0.12 });
        P.write(c, 'Üretilenler', 1190, 640, E.seg(t, sn + 3.2, sn + 4.0), { size: 44, color: U.LIFE_D });
        U.sugar(c, 1222, 708, 18); P.write(c, 'besin (glikoz)', 1260, 720, E.seg(t, sn + 3.6, sn + 4.4), { size: 40 });
        U.gas(c, 1560, 706, 'O_2', 26); P.write(c, 'oksijen', 1600, 720, E.seg(t, sn + 4.0, sn + 4.8), { size: 40 });
      });
    }
  });
})();

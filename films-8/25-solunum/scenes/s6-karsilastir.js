// SAHNE 6 — Fotosentez ve solunum karşılaştırması; birbirini tamamlayan süreçler; kavram haritası; solunumun önemi (FB.8.7.3 b)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  const ROWS = [
    ['Kimde olur?', 'üreticilerde (klorofilli hücrelerde)', 'tüm canlılarda'],
    ['Ne zaman?', 'yalnızca ışıkta', 'gece ve gündüz'],
    ['Kullanılanlar', 'CO_2 + su + ışık enerjisi', 'besin + O_2'],
    ['Oluşanlar', 'besin + O_2', 'enerji (ATP) + CO_2 + su'],
    ['Enerji', 'ışık enerjisi besinde depolanır', 'besindeki enerji açığa çıkar']
  ];
  const cellTxt = (c, txt, x, y, maxW, size, col) => { let sz = size; while (U.richW(c, txt, sz) > maxW && sz > 22) sz--; U.rich(c, txt, x, y, 1, { size: sz, align: 'center', color: col, rot: 0 }); };
  E.scene({
    name: 'Karşılaştır', concept: 'Fotosentez ↔ solunum; kavram haritası', from: 'compare', to: 'why', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('compare'), sl = E.s('link'), sm = E.s('map'), sw = E.s('why');
      // tablo
      const kT = 1 - E.se(t, sl - 0.3, sl + 0.4);
      if (kT > 0) E.layer(ctx, kT, c => {
        const X = 170, Y = 175, cols = [320, 640, 620], rh = 112, W = 1580;
        U.card(c, X - 16, Y - 16, W + 32, rh * 6 + 32, 5601);
        P.fillPts(c, [[X + cols[0], Y], [X + cols[0] + cols[1], Y], [X + cols[0] + cols[1], Y + rh], [X + cols[0], Y + rh]], U.LIFE, 0.18);
        P.fillPts(c, [[X + cols[0] + cols[1], Y], [X + W, Y], [X + W, Y + rh], [X + cols[0] + cols[1], Y + rh]], U.MITO, 0.2);
        U.fit(c, 'Fotosentez', X + cols[0] + cols[1] / 2, Y + 72, 600, 50, { color: U.LIFE_D });
        U.fit(c, 'Solunum', X + cols[0] + cols[1] + cols[2] / 2, Y + 72, 600, 50, { color: '#7A4630' });
        line(c, [X, Y + rh], [X + W, Y + rh], { w: 2.4, dry: false }); line(c, [X + cols[0], Y], [X + cols[0], Y + rh * 6], { w: 2, dry: false }); line(c, [X + cols[0] + cols[1], Y], [X + cols[0] + cols[1], Y + rh * 6], { w: 2, dry: false });
        ROWS.forEach((r, i) => {
          const at = sc + 1.0 + i * 2.0, k = E.se(t, at, at + 0.8); if (k <= 0) return;
          const y = Y + rh * (i + 1);
          if (i) line(c, [X, y], [X + W, y], { w: 1, dry: false, alpha: 0.5 });
          c.save(); c.globalAlpha *= k;
          U.fit(c, r[0], X + cols[0] / 2, y + 70, cols[0] - 20, 38);
          cellTxt(c, r[1], X + cols[0] + cols[1] / 2, y + 70, cols[1] - 30, 38, PAL.ink);
          c.restore();
          c.save(); c.globalAlpha *= E.se(t, at + 0.6, at + 1.4); cellTxt(c, r[2], X + cols[0] + cols[1] + cols[2] / 2, y + 70, cols[2] - 30, 38, PAL.ink); c.restore();
        });
      });
      // birbirini tamamlayan süreçler
      const kL = E.se(t, sl - 0.1, sl + 0.6) * (1 - E.se(t, sm - 0.3, sm + 0.4));
      if (kL > 0) E.layer(ctx, kL, c => {
        const A = [560, 540], B = [1360, 540], R = 190;
        [[A, U.LIFE, 'fotosentez', 5610], [B, U.MITO, 'solunum', 5611]].forEach(([p, col, nm, sd]) => { const cp = INK.wobble(circlePts(p[0], p[1], R, R * 0.8, 60), 3, sd); P.fillPts(c, cp, '#FBF8F1'); INK.wash(c, cp, col, 0.3, sd, { bleed: 1, blooms: 0 }); stroke(c, cp, { w: 3, closed: true, seed: sd + 1 }); U.fit(c, nm, p[0], p[1] + 16, 320, 52, { color: nm === 'solunum' ? '#7A4630' : U.LIFE_D }); });
        U.leaf(c, A[0] - 60, A[1] - 70, 90, -0.3, 5620); U.mito(c, B[0], B[1] - 80, 1.1, 0.1, 21);
        const k1 = E.se(t, sl + 0.8, sl + 1.8), k2 = E.se(t, sl + 2.4, sl + 3.4);
        P.arrow(c, [A[0] + 120, A[1] - 170], [B[0] - 120, B[1] - 170], k1, { w: 4, bend: 90, color: U.LIFE_D });
        if (k1 > 0.9) { U.sugar(c, 900, 330, 18); U.gas(c, 1000, 330, 'O_2', 24); U.fit(c, 'besin + oksijen', 960, 280, 400, 36, { color: U.LIFE_D }); }
        P.arrow(c, [B[0] - 120, B[1] + 170], [A[0] + 120, A[1] + 170], k2, { w: 4, bend: -90, color: '#7A4630' });
        if (k2 > 0.9) { U.gas(c, 900, 750, 'CO_2', 26); U.drop(c, 1010, 752, 16); U.fit(c, 'karbondioksit + su', 960, 820, 400, 36, { color: '#7A4630' }); }
        const k3 = E.se(t, sl + 3.6, sl + 4.4);
        if (k3 > 0) { P.sun(c, 220, 540, 44, t, { nrays: 12, cells: false }); P.arrow(c, [290, 540], [360, 540], k3, { w: 3.4, color: U.AMB }); P.arrow(c, [1560, 540], [1640, 540], k3, { w: 3.4, color: U.AMB }); U.atp(c, 1710, 540, 40 * P.pop(k3)); }
      });
      // kavram haritası
      const kM = E.se(t, sm - 0.1, sm + 0.6);
      if (kM > 0) E.layer(ctx, kM, c => {
        c.fillStyle = 'rgba(138,106,69,0.14)'; c.fillRect(0, 0, E.W, E.H);
        P.notebook(c, 150, 160, 1620, 740);
        const C = [960, 520];
        const NODES = [
          [[560, 290], 'tüm canlılarda olur', U.LIFE], [[1360, 290], 'hücrede (mitokondride)', U.MITO],
          [[420, 520], 'kullanır: besin + O_2', PAL.water], [[1500, 520], 'oluşturur: CO_2 + su', '#6E6A64'],
          [[600, 760], 'enerji → ATP', PAL.light], [[1320, 760], 'gece ve gündüz sürer', U.LIFE]
        ];
        const ck = E.se(t, sm + 0.4, sm + 1.0, 'out');
        NODES.forEach(([p, txt, col], i) => {
          const at = sm + 1.2 + i * 1.1, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          P.drawOn(c, [C, p], E.se(t, at - 0.2, at + 0.3), { w: 2.4 });
          U.chip(c, p[0], p[1] + 14, txt, col, k, 38, { rich: true });
        });
        if (ck > 0) { const b = U.rr(C[0] - 150, C[1] - 55, 300, 110, 30, 5); P.fillPts(c, b, '#FBF8F1'); INK.wash(c, b, U.MITO, 0.35, 5630, { bleed: 1, blooms: 0 }); stroke(c, b, { w: 3.4, closed: true, seed: 5631 }); U.fit(c, 'SOLUNUM', C[0], C[1] + 20, 260, 58 * ck, { color: '#7A4630' }); }
        const kw = E.se(t, sw, sw + 0.6);
        if (kw > 0) { const b = [[520, 850], [1400, 846], [1404, 896], [522, 900]]; P.fillPts(c, b, '#FBF8F1', kw); P.write(c, 'solunum durursa → enerji yok → yaşam durur', 960, 886, E.seg(t, sw + 0.3, sw + 2.0), { size: 42, align: 'center', color: '#8A4A10' }); }
      });
    }
  });
})();

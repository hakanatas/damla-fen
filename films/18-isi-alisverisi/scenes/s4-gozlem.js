// SAHNE 4 — Gözlem: karıştırmadan önce ve sonra termometreyle ölç, çalışma yaprağına kaydet (OB7, KB2.2); sabır (D12.3)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F18;
  const MIXC = '#6F8494';
  const lvl = T => 0.04 + T / 100 * 0.9; // termometre ölçeği: 0–100 °C
  function beaker(ctx, x, y, w, h, level, col, seed, ang = 0, px = 0, py = 0) {
    ctx.save(); if (ang) { ctx.translate(px, py); ctx.rotate(ang); ctx.translate(-px, -py); }
    if (level > 1) F.water(ctx, x, y, w, h, level, { seed, color: col });
    F.box(ctx, x, y, w, h, { fill: false, seed: seed + 1 });
    ctx.restore();
  }
  function sheet(ctx, t) {
    const sb = E.s('before'), sr = E.s('rec1'), sa = E.s('after');
    const k = E.se(t, sb + 0.2, sb + 1.0, 'out'); if (k <= 0) return;
    ctx.save(); ctx.translate((1 - k) * 700, 0);
    F.sheet(ctx, 1230, 160, 570, 720, { seed: 150 });
    INK.label(ctx, 'Çalışma Yaprağı', 1515, 230, { size: 46, weight: 700, align: 'center' });
    INK.label(ctx, 'Tahminim: ..... °C', 1270, 310, { size: 38, alpha: 0.75 });
    const rows = [['Soğuk su (önce):', '20 °C', PAL.water, sr + 0.3], ['Sıcak su (önce):', '60 °C', F.HEAT, sr + 1.3], ['Karışım (sonra):', '39 °C', '#5A4A4A', sa + 1.2]];
    rows.forEach(([a, b, col, at], i) => {
      const y = 400 + i * 80;
      INK.label(ctx, a, 1270, y, { size: 38, weight: 700 });
      P.write(ctx, b, 1760, y, E.seg(t, at, at + 0.8), { size: 42, align: 'right', color: col });
      line(ctx, [1268, y + 16], [1770, y + 16], { w: 1.2, alpha: 0.4, dry: false, seed: 160 + i });
    });
    // sayı doğrusu
    const nk = E.se(t, sa + 2.4, sa + 3.4);
    if (nk > 0) {
      ctx.save(); ctx.globalAlpha = nk;
      const x0 = 1300, x1 = 1730, y = 720, X = v => x0 + (v - 20) / 40 * (x1 - x0);
      line(ctx, [x0 - 20, y], [x1 + 20, y], { w: 3, dry: false, seed: 170 });
      [[20, PAL.water], [40, PAL.ink], [60, F.HEAT]].forEach(([v, col]) => { line(ctx, [X(v), y - 14], [X(v), y + 14], { w: 3, dry: false }); INK.label(ctx, v + '', X(v), y + 52, { size: 36, weight: 700, align: 'center', color: col }); });
      ctx.fillStyle = '#5A4A4A'; ctx.beginPath(); ctx.arc(X(39), y, 10, 0, 7); ctx.fill();
      INK.label(ctx, '39', X(39) - 4, y - 26, { size: 34, weight: 700, align: 'center', color: '#5A4A4A' });
      INK.label(ctx, 'neredeyse tam ortası', 1515, 830, { size: 34, align: 'center', alpha: 0.8 });
      ctx.restore();
    }
    ctx.restore();
  }
  E.scene({
    name: 'Gözlem', concept: 'Önce ve sonra ölç, kaydet', from: 'before', to: 'after', trFrom: [700, 600],
    draw(ctx, t) {
      const sb = E.s('before'), sm = E.s('mix'), sw = E.s('wait'), sa = E.s('after');
      F.desk(ctx, 800);
      F.tga(ctx, t, 1, 1, 330);
      const W = 190, H = 230, LV = 150, BX = 900, BY = 510, BW = 250, BH = 280;
      // dökme animasyonu
      const pc = E.seg(t, sm + 0.2, sm + 2.8), ph = E.seg(t, sm + 3.0, sm + 5.6);
      const pour = (u) => ({ move: E.ease.io(E.clamp(u / 0.35)), tilt: E.ease.io(E.clamp((u - 0.3) / 0.25)), empty: E.clamp((u - 0.45) / 0.4), back: E.ease.io(E.clamp((u - 0.85) / 0.15)) });
      const C = pour(pc), Hh = pour(ph);
      const bigLv = 120 * C.empty + 120 * Hh.empty;
      const bigCol = Hh.empty > 0 ? MIXC : PAL.water;
      // büyük kap
      if (bigLv > 1) F.water(ctx, BX, BY, BW, BH, bigLv, { seed: 180, color: bigCol, alpha: 0.42 });
      F.box(ctx, BX, BY, BW, BH, { fill: false, seed: 182 });
      INK.label(ctx, 'karışım', BX + BW / 2, 860, { size: 40, weight: 700, align: 'center' });
      // küçük kaplar
      [[C, 230, PAL.water, 184, 'soğuk su', 20], [Hh, 560, '#9A6A5A', 186, 'sıcak su', 60]].forEach(([S, x0, col, seed, nm, T], i) => {
        if (S.back >= 1) return;
        const fade = 1 - S.back;
        const tx = BX + 20 - W, ty = BY - 70;
        const x = E.lerp(x0, tx, S.move), y = E.lerp(560, ty, S.move);
        const ang = S.tilt * 1.3 * (1 - S.back);
        ctx.save(); ctx.globalAlpha = fade;
        beaker(ctx, x, y, W, H, S.tilt > 0 ? 0 : LV, col, seed, ang, x + W, y);
        if (S.tilt > 0.8 && S.empty > 0 && S.empty < 1) { // su akışı
          const lip = [x + W + 6, y + 10]; const pts = P.bez(lip, [lip[0] + 30, lip[1] + 40], [BX + 90, BY + BH - bigLv], 20);
          stroke(ctx, pts, { w: 10 * (1 - S.empty * 0.5), color: col, alpha: 0.7, seed: 190 + i, taper: 0.1 });
        }
        if (S.move === 0) { INK.label(ctx, nm, x + W / 2, 860, { size: 40, weight: 700, align: 'center', color: i ? F.HEAT : PAL.water }); if (i) F.steam(ctx, x + W / 2, y - 10, 0.8, t, { color: F.HEAT }); }
        ctx.restore();
        // ölçüm termometresi (önce)
        const tk = Math.min(E.se(t, sb + 0.4 + i * 0.6, sb + 1.0 + i * 0.6), 1 - E.se(t, sm - 0.2, sm + 0.3));
        if (tk > 0) {
          ctx.save(); ctx.globalAlpha = tk;
          const tl = E.lerp(lvl(22), lvl(T), E.se(t, sb + 1.0 + i * 0.6, sb + 2.6 + i * 0.6));
          F.thermo(ctx, x0 + W / 2 + 40, 760, 420, tl, { w: 18 });
          INK.label(ctx, T + ' °C', x0 + W / 2 - 30, 470, { size: 48, weight: 700, align: 'center', color: i ? F.HEAT : PAL.water, alpha: E.se(t, sb + 2.4 + i * 0.6, sb + 3.0 + i * 0.6) });
          ctx.restore();
        }
      });
      // karıştır + bekle
      const wk = E.se(t, sw - 0.2, sw + 0.6);
      if (wk > 0) {
        ctx.save(); ctx.globalAlpha = wk;
        const sx = BX + 80 + Math.sin(t * 6) * 40 * (1 - E.se(t, sa, sa + 0.6));
        line(ctx, [sx, BY + BH - 20], [sx + 40, BY - 110], { w: 6, seed: 195, taper: 0.03 });
        const settle = E.se(t, sw + 0.4, sw + 6.0);
        const tv = E.lerp(30, 39, settle) + Math.sin(t * 3) * 2.5 * (1 - settle);
        F.thermo(ctx, BX + BW - 60, BY + BH - 30, 440, lvl(tv), { w: 18 });
        P.icon.clock(ctx, 700, 380, 0.8, (t - sw) * 1.2);
        INK.label(ctx, 'bekle...', 700, 490, { size: 40, weight: 700, align: 'center', alpha: 1 - E.se(t, sa, sa + 0.5) });
        ctx.restore();
      }
      const ak = E.se(t, sa + 0.2, sa + 0.9, 'out');
      if (ak > 0) { ctx.save(); ctx.translate(700, 600); ctx.scale(P.pop(ak), P.pop(ak)); F.card(ctx, 0, 0, 230, 100, { seed: 196, fill: '#F6E7B8' }); INK.label(ctx, '39 °C', 0, 18, { size: 60, weight: 700, align: 'center', color: '#5A4A4A' }); ctx.restore(); }
      sheet(ctx, t);
    }
  });
})();

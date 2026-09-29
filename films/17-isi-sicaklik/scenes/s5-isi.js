// SAHNE 5 — Isı: bir enerji çeşidi; sıcaklığı yüksek olandan düşük olana aktarılır; aktarılan ısı madde miktarına bağlıdır
// (fincan ve tencere aynı sıcaklıkta; aynı buzlar → tencere hepsini eritir, fincan birkaçını)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F17;
  function blocks(ctx, t) {
    const s0 = E.s('heat1');
    const k = E.se(t, s0 + 0.2, s0 + 1.0, 'out');
    ctx.save(); ctx.globalAlpha = k;
    [[420, F.HEAT, 2.6, 'sıcak'], [800, PAL.water, 0.4, 'soğuk']].forEach(([x, col, sp, nm], i) => {
      const r = [[x, 400], [x + 380, 400], [x + 380, 740], [x, 740], [x, 400]];
      P.fillPts(ctx, r, PAL.white, 0.7); INK.wash(ctx, r, col, 0.22, 600 + i, { bleed: 1.5, blooms: 1 });
      F.field(ctx, 'solid', [x + 10, 410, 360, 320], t, { r: 20, speed: sp, amp: 2.2, fill: i ? '#BFD6E3' : '#EBC3B6', color: col });
      stroke(ctx, r, { w: 3.4, closed: true, seed: 610 + i });
      INK.label(ctx, nm, x + 190, 800, { size: 50, weight: 700, align: 'center', color: col });
    });
    ctx.restore();
    const ka = E.se(t, s0 + 2.2, s0 + 3.4);
    F.heatArrow(ctx, [560, 330], [1060, 330], ka, { t, w: 6, amp: 11, head: 22 });
    if (ka > 0.9) INK.label(ctx, 'ısı', 810, 280, { size: 58, weight: 700, align: 'center', color: F.HEAT });
    P.write(ctx, 'Isı bir enerji çeşididir.', 1300, 470, E.seg(t, s0 + 0.8, s0 + 2.0), { size: 48 });
    P.write(ctx, 'sıcaktan → soğuğa', 1300, 560, E.seg(t, s0 + 3.2, s0 + 4.2), { size: 48, color: F.HEAT });
    P.write(ctx, 'aktarılır', 1300, 630, E.seg(t, s0 + 3.8, s0 + 4.6), { size: 48, color: F.HEAT });
  }
  function spoon(ctx, t) {
    const s0 = E.s('spoon');
    const dip = E.se(t, s0 + 0.4, s0 + 1.6);
    const warm = E.se(t, s0 + 2.4, s0 + 6.0);
    const cx = 760, cy = 820, S = 2.4;
    const cup = [[cx - 60 * S, cy - 90 * S], [cx + 60 * S, cy - 90 * S], [cx + 48 * S, cy], [cx - 48 * S, cy], [cx - 60 * S, cy - 90 * S]];
    P.fillPts(ctx, cup, PAL.white);
    const tea = [[cx - 57 * S, cy - 78 * S], [cx + 57 * S, cy - 78 * S], [cx + 48 * S, cy - 3], [cx - 48 * S, cy - 3]];
    INK.wash(ctx, tea, '#9A5A2A', 0.55, 620, { bleed: 1, blooms: 1 });
    F.steam(ctx, cx - 40, cy - 230, 1.5, t, { color: F.HEAT });
    const y1 = E.lerp(330, 700, dip);
    F.spoon(ctx, cx + 250, y1 - 260, cx + 30, y1, warm);
    INK.wash(ctx, tea, '#9A5A2A', 0.3 * dip, 621, { bleed: 1, blooms: 0 });
    // bardak kenarı spoondan sonra (önde)
    stroke(ctx, cup, { w: 3.4, closed: true, seed: 98 }); stroke(ctx, P.arc(cx + 62 * S, cy - 50 * S, 24 * S, -1.4, 1.4, 16), { w: 3.4, seed: 99 });
    F.heatArrow(ctx, [cx - 120, cy - 60], [cx - 10, cy - 110], E.se(t, s0 + 2.0, s0 + 3.0), { t, w: 4, amp: 7, head: 15, seed: 630 });
    F.heatArrow(ctx, [cx + 110, cy - 40], [cx + 50, cy - 100], E.se(t, s0 + 2.4, s0 + 3.4), { t, w: 4, amp: 7, head: 15, seed: 631 });
    if (warm > 0.3) { ctx.save(); ctx.globalAlpha = warm * 0.8; for (let i = 0; i < 2; i++) { const pts = []; for (let j = 0; j <= 16; j++) { const u = j / 16; pts.push([cx + 200 + i * 40 + Math.sin(u * 7 + t * 5) * 6, y1 - 260 - 10 - u * 70]); } stroke(ctx, pts, { w: 2.6, color: F.HEAT, seed: 640 + i }); } ctx.restore(); }
    if (t > s0 + 3.0) INK.label(ctx, 'ısı', cx - 150, cy - 120, { size: 46, weight: 700, color: F.HEAT, alpha: E.se(t, s0 + 3.0, s0 + 3.6) });
    P.write(ctx, 'çay: sıcak', 1250, 380, E.seg(t, s0 + 0.8, s0 + 1.8), { size: 50, color: F.HEAT });
    P.write(ctx, 'kaşık: soğuk', 1250, 460, E.seg(t, s0 + 1.4, s0 + 2.4), { size: 50, color: PAL.water });
    P.write(ctx, 'ısı çaydan kaşığa geçer', 1250, 580, E.seg(t, s0 + 3.2, s0 + 4.4), { size: 46 });
    P.write(ctx, '→ kaşık ısınır', 1250, 650, E.seg(t, s0 + 4.6, s0 + 5.6), { size: 46, color: F.HEAT });
  }
  function amount(ctx, t) {
    const sq = E.s('amountq'), si = E.s('ice'), sa = E.s('amount');
    const addK = E.se(t, si + 0.3, si + 1.3);
    const C = { x: 330, y: 480, w: 200, h: 260, lv: 170 }, T = { x: 830, y: 420, w: 560, h: 320, lv: 230 };
    // fincan (küçük kap) ve tencere
    const cupTop = F.water(ctx, C.x, C.y, C.w, C.h, C.lv, { seed: 640 }); F.box(ctx, C.x, C.y, C.w, C.h, { fill: false, seed: 641 });
    const potTop = F.pot(ctx, T.x, T.y, T.w, T.h, T.lv, { seed: 642 });
    INK.label(ctx, 'bardak', C.x + C.w / 2, 800, { size: 46, weight: 700, align: 'center' });
    INK.label(ctx, 'tencere', T.x + T.w / 2, 800, { size: 46, weight: 700, align: 'center' });
    // buzlar: fincan 2 tanesini eritir, tencere 6'sını
    const cubes = n => Array.from({ length: n }, (_, i) => i);
    if (t > si) cubes(6).forEach(i => {
      const drop = E.se(t, si + 0.3 + i * 0.12, si + 1.1 + i * 0.12, 'in');
      // fincan
      { const x = C.x + 45 + (i % 3) * 55, y = E.lerp(C.y - 140, cupTop + 6 + Math.floor(i / 3) * 34, drop); const m = i < 2 ? E.se(t, si + 2.0 + i * 0.8, si + 4.0 + i * 0.8) : 0.15 * E.se(t, si + 3, si + 7); F.iceCube(ctx, x, y + Math.sin(t * 2 + i) * 2, 1, m, i); }
      { const x = T.x + 90 + i * 76, y = E.lerp(T.y - 150, potTop + 8, drop); const m = E.se(t, si + 1.8 + i * 0.6, si + 4.6 + i * 0.6); F.iceCube(ctx, x, y + Math.sin(t * 2 + i) * 2, 1, m, 10 + i); }
    });
    INK.label(ctx, '6 buz', C.x + C.w / 2, C.y - 170, { size: 36, align: 'center', alpha: 0.7 * addK * (1 - E.se(t, si + 2, si + 2.6)) });
    INK.label(ctx, '6 buz', T.x + T.w / 2, T.y - 180, { size: 36, align: 'center', alpha: 0.7 * addK * (1 - E.se(t, si + 2, si + 2.6)) });
    // termometreler: önce ikisi de 60 °C; buzdan sonra fincan çok soğur
    const lvC = E.lerp(0.6, 0.12, E.se(t, si + 1.6, si + 6)), lvT = E.lerp(0.6, 0.5, E.se(t, si + 1.6, si + 7));
    F.thermo(ctx, C.x + C.w + 60, C.y + C.h - 30, 300, lvC, { w: 18 });
    F.thermo(ctx, T.x + T.w + 80, T.y + T.h - 30, 360, lvT, { w: 18 });
    const rk = E.se(t, sq + 1.0, sq + 1.8) * (1 - E.se(t, si + 1.2, si + 1.8));
    if (rk > 0) { INK.label(ctx, '60 °C', C.x + C.w + 90, C.y + 40, { size: 42, weight: 700, color: F.HEAT, alpha: rk }); INK.label(ctx, '60 °C', T.x + T.w + 110, T.y + 20, { size: 42, weight: 700, color: F.HEAT, alpha: rk }); }
    const ek = E.se(t, sq + 2.2, sq + 3.0) * (1 - E.se(t, si - 0.3, si + 0.3));
    if (ek > 0) { ctx.save(); ctx.globalAlpha = ek; ctx.translate(960, 220); F.card(ctx, 0, 0, 760, 96, { seed: 650, fill: '#F6E7B8' }); INK.label(ctx, 'aynı sıcaklık: 60 °C', 0, 16, { size: 48, weight: 700, align: 'center' }); ctx.restore(); }
    P.write(ctx, 'yalnızca birkaçı eridi', C.x + C.w / 2, 870, E.seg(t, si + 6.2, si + 7.2), { size: 40, align: 'center', color: PAL.water });
    P.write(ctx, 'hepsi eridi!', T.x + T.w / 2, 870, E.seg(t, si + 6.0, si + 7.0), { size: 40, align: 'center', color: F.HEAT });
    // sonuç
    const fk = E.se(t, sa + 0.2, sa + 0.9, 'out');
    if (fk > 0) { ctx.save(); ctx.translate(960, 230); ctx.scale(P.pop(fk), P.pop(fk)); F.card(ctx, 0, 0, 1120, 150, { seed: 651, fill: '#FAF6EC' }); INK.label(ctx, 'Madde miktarı fazla olan,', 0, -12, { size: 46, weight: 700, align: 'center' }); INK.label(ctx, 'daha çok ısı aktarabilir.', 0, 46, { size: 46, weight: 700, align: 'center', color: F.HEAT }); ctx.restore(); }
    INK.label(ctx, '(çizim ölçekli değildir)', 1720, 200, { size: 28, align: 'center', alpha: 0.6 });
  }
  E.scene({
    name: 'Isı', concept: 'Isı bir enerji; sıcaktan soğuğa; madde miktarı', from: 'heat1', to: 'amount', trFrom: [810, 330],
    draw(ctx, t) {
      ctx.fillStyle = 'rgba(181,85,63,0.05)'; ctx.fillRect(0, 0, E.W, E.H);
      const aS = E.se(t, E.s('spoon') - 0.4, E.s('spoon') + 0.3), aA = E.se(t, E.s('amountq') - 0.4, E.s('amountq') + 0.3);
      if (aS < 1) E.layer(ctx, 1 - aS, c => blocks(c, t));
      if (aS > 0 && aA < 1) E.layer(ctx, Math.min(aS, 1 - aA), c => spoon(c, t));
      if (aA > 0) E.layer(ctx, aA, c => amount(c, t));
      const dk = E.se(t, E.s('heat1') + 0.5, E.s('heat1') + 1.2) * (1 - aS);
      if (dk > 0) E.layer(ctx, dk, c => DAMLA.draw(c, { x: 1680, y: 900, s: 1.1, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.3], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.35], [1, 1.9]] }));
    }
  });
})();

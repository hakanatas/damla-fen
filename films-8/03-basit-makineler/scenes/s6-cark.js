// SAHNE 6 — Çıkrık (kol 4 kat → kuvvet 1/4), dişli çarklar (24/12 diş: 1 tur → 2 tur, ters yön), kasnaklar (düz/çapraz kayış)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = F8M;
  const U = 3.4, W = 40;

  function windlass(ctx, t) {
    const s = E.s('wheel');
    const cx = 760, cy = 390, r = 40, R = 160;
    const th = -E.se(t, s + 1.4, s + 6.4, 'io') * 2 * Math.PI * 0.9;  // saat yönünün tersine
    // zemin + kuyu ağzı
    F.floor(ctx, 820, 9);
    const ring = F.rect(cx + r - 90, 760, cx + r + 90, 820); P.fillPts(ctx, ring, '#D9D4CA'); INK.wash(ctx, ring, '#6F6A60', 0.4, 3600); stroke(ctx, ring, { w: 3, closed: true, seed: 3601 });
    line(ctx, [cx, cy], [cx - 60, 820], { w: 7, seed: 3602 }); 
    // kolun çizdiği büyük çember
    dashed(ctx, circlePts(cx, cy, R, R, 240), { w: 2.2, on: 10, off: 8, color: F.PATH });
    // mil (tambur)
    const drum = circlePts(cx, cy, r, r, 40); P.fillPts(ctx, drum, '#E8D2A8'); INK.wash(ctx, drum, F.WOOD, 0.5, 3604, { bleed: 1 }); stroke(ctx, drum, { w: 3, closed: true, seed: 3605 });
    // ip ve kova (kova r·Δθ kadar yükselir)
    const rise = -th * r, by = 770 - rise;
    F.rope(ctx, [cx + r, cy], [cx + r, by - 60]);
    const bk = [[cx + r - 40, by - 60], [cx + r + 40, by - 60], [cx + r + 30, by], [cx + r - 30, by], [cx + r - 40, by - 60]];
    P.fillPts(ctx, bk, '#EDE3CF'); INK.wash(ctx, bk, PAL.water, 0.45, 3606, { bleed: 1 }); stroke(ctx, bk, { w: 3, closed: true, seed: 3607 });
    // kova ağırlığı yalnızca kova ağız üstündeyken tam görünsün: kuyu duvarı önde
    P.fillPts(ctx, F.rect(cx + r - 90, 780, cx + r + 90, 822), '#D9D4CA', 1); stroke(ctx, F.rect(cx + r - 90, 780, cx + r + 90, 822), { w: 3, closed: true, seed: 3608 });
    F.txt(ctx, W + ' N', cx + r - 52, by - 20, { size: 34, color: F.LOAD, align: 'right' });
    // kol
    const hx = cx + Math.cos(th) * R, hy = cy + Math.sin(th) * R;
    line(ctx, [cx, cy], [hx, hy], { w: 8, seed: 3609, taper: 0.05 });
    P.fillPts(ctx, circlePts(hx, hy, 14, 14, 18), F.FORCE, 0.9);
    ctx.save(); ctx.fillStyle = PAL.ink; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 7); ctx.fill(); ctx.restore();
    // teğet kuvvet (10 N)
    const tg = [Math.sin(th), -Math.cos(th)], fl = (W / 4) * U;
    F.vec(ctx, [hx, hy], [hx + tg[0] * fl * 1.0, hy + tg[1] * fl * 1.0], E.se(t, s + 0.8, s + 1.4), { w: 6, head: 18 });
    // etiketler
    const k = E.se(t, s + 0.4, s + 1.2);
    ctx.save(); ctx.globalAlpha *= k;
    F.txt(ctx, 'mil: r', cx - 150, cy + 16, { size: 36, align: 'right' });
    F.txt(ctx, 'kol: 4r', cx + R + 40, cy - 120, { size: 36, color: F.PATH });
    F.tag(ctx, 'kuvvet: 40 N’un dörtte biri = 10 N', 1440, 330, { size: 42, color: F.FORCE, seed: 3610 });
    F.txt(ctx, 'el büyük çember çizer,', 1440, 440, { size: 38, align: 'center' });
    F.txt(ctx, 'kova az yükselir', 1440, 490, { size: 38, align: 'center' });
    F.txt(ctx, 'örnek: kuyu çıkrığı, direksiyon, kapı kolu', 1440, 600, { size: 34, align: 'center', alpha: 0.8 });
    ctx.restore();
  }

  function gears(ctx, t) {
    const s = E.s('gears');
    const N1 = 24, N2 = 12, r1 = 190, r2 = 95, x1 = 700, y = 500, x2 = x1 + r1 + r2;
    const th1 = E.se(t, s + 1.0, s + 7.0, 'io') * 2 * Math.PI;         // büyük çark: 1 tur (saat yönü)
    const th2 = Math.PI - th1 * N1 / N2;   // diş-boşluk eşleşmesi: büyük dişin ortası 0°'de iken küçük çarkın boşluğu 180°'de
    F.gear(ctx, x1, y, r1, N1, th1 - Math.PI / N1, { seed: 3620, td: 22 });
    F.gear(ctx, x2, y, r2, N2, th2, { seed: 3621, td: 22 });
    F.spin(ctx, x1, y, r1 + 50, true, E.se(t, s + 1.0, s + 1.8));
    F.spin(ctx, x2, y, r2 + 50, false, E.se(t, s + 1.4, s + 2.2));
    F.txt(ctx, '24 diş', x1, y + r1 + 70, { size: 38, align: 'center' });
    F.txt(ctx, '12 diş', x2, y + r2 + 70, { size: 38, align: 'center' });
    const turns1 = th1 / (2 * Math.PI), turns2 = turns1 * 2;
    const k = E.se(t, s + 1.2, s + 1.8);
    ctx.save(); ctx.globalAlpha *= k;
    F.txt(ctx, 'büyük: ' + turns1.toFixed(1).replace('.', ',') + ' tur', 1420, 400, { size: 44 });
    F.txt(ctx, 'küçük: ' + turns2.toFixed(1).replace('.', ',') + ' tur', 1420, 470, { size: 44, color: F.FORCE });
    F.txt(ctx, 'yönler zıt', 1420, 560, { size: 40, alpha: 0.85 });
    F.txt(ctx, 'örnek: saat, bisiklet vitesi', 1420, 650, { size: 34, alpha: 0.8 });
    ctx.restore();
  }

  function belt(ctx, t) {
    const s = E.s('belts');
    const th = E.se(t, s + 1.0, s + 6.2, 'io') * 2 * Math.PI;
    const r = 80, d = 190, y = 470;
    [[500, false], [1340, true]].forEach(([cx, crossed], i) => {
      const k = E.se(t, s + 0.3 + i * 1.6, s + 1.0 + i * 1.6); if (k <= 0) return;
      ctx.save(); ctx.globalAlpha *= k;
      const A = [cx - d, y], B = [cx + d, y];
      stroke(ctx, circlePts(A[0], A[1], r + 6, r + 6, 50), { w: 6, closed: true, color: F.ROPE, dry: false, noBoil: true });
      stroke(ctx, circlePts(B[0], B[1], r + 6, r + 6, 50), { w: 6, closed: true, color: F.ROPE, dry: false, noBoil: true });
      if (!crossed) { line(ctx, [A[0], y - r - 6], [B[0], y - r - 6], { w: 6, color: F.ROPE, dry: false, taper: 0 }); line(ctx, [A[0], y + r + 6], [B[0], y + r + 6], { w: 6, color: F.ROPE, dry: false, taper: 0 }); }
      else { const R = r + 6, al = Math.asin(R / d), c = Math.cos(al), sn = Math.sin(al);
        [1, -1].forEach(sg => line(ctx, [cx - d * c * c, y - sg * d * c * sn], [cx + d * c * c, y + sg * d * c * sn], { w: 6, color: F.ROPE, dry: false, taper: 0 })); }
      F.pulley(ctx, A[0], A[1], r, th, { seed: 3630 + i });
      F.pulley(ctx, B[0], B[1], r, crossed ? -th : th, { seed: 3640 + i });
      F.spin(ctx, A[0], A[1], r + 50, true, E.se(t, s + 1.2 + i * 1.6, s + 2.0 + i * 1.6));
      F.spin(ctx, B[0], B[1], r + 50, !crossed, E.se(t, s + 1.5 + i * 1.6, s + 2.3 + i * 1.6));
      F.txt(ctx, crossed ? 'çapraz kayış' : 'düz kayış', cx, y + r + 110, { size: 44, align: 'center' });
      F.txt(ctx, crossed ? 'zıt yönde döner' : 'aynı yönde döner', cx, y + r + 165, { size: 38, align: 'center', color: F.FORCE });
      ctx.restore();
    });
    const ke = E.se(t, s + 4.0, s + 4.6);
    if (ke > 0) { ctx.save(); ctx.globalAlpha *= ke; F.txt(ctx, 'örnek: çamaşır makinesi, araba motoru', 960, 850, { size: 36, align: 'center', alpha: 0.8 }); ctx.restore(); }
  }

  E.scene({
    name: 'Çıkrık', concept: 'Kol uzadıkça kuvvet azalır', from: 'wheel', to: 'wheel', trFrom: [760, 390],
    draw(ctx, t) { windlass(ctx, t); }
  });
  E.scene({
    name: 'Dişli çark', concept: 'Dönmeyi aktarır, yönü ve hızı değiştirir', from: 'gears', to: 'gears', trFrom: [900, 500],
    draw(ctx, t) {
      gears(ctx, t);
      DAMLA.draw(ctx, { x: 1700, y: 900, s: 0.85, view: 'q3', flip: true, expr: 'curious', look: [-0.8, -0.4], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 5, arms: [[-1, [-50, -150]], [1, 0.4]] });
    }
  });
  E.scene({
    name: 'Kasnak', concept: 'Kayışla dönme aktarımı', from: 'belts', to: 'belts', trFrom: [960, 470],
    draw(ctx, t) { belt(ctx, t); }
  });
})();

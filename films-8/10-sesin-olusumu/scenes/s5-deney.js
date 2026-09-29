// SAHNE 5 — Deney: özdeş saat, aynı uzaklık, üç ortam → veri; yayılma hızı sınıflaması (katı > sıvı > gaz, genellikle; sayı yok);
// neden (tanecikler yakın/sıkı bağlı); kaynağın ortamı değişince duyulan ses değişir. FB.8.4.2 b) ölçme ve veri analizi
(function () {
  const { PAL, stroke, line, circlePts, wash } = INK; const F = S8;
  const ST = [['katı (tahta)', 'solid'], ['sıvı (su)', 'water'], ['gaz (hava)', 'air']];
  function station(c, cx, kind, t, kRing, kCheck) {
    const y = 580;
    if (kind === 'solid') { F.shape(c, [[cx - 230, y - 20], [cx + 230, y - 22], [cx + 230, y + 22], [cx - 230, y + 20]], F.WOOD, 0.6, 531); }
    else F.balloon(c, cx, y, 105, kind === 'water' ? 'water' : 'air');
    if (kRing > 0) { c.save(); c.globalAlpha *= kRing; F.rings(c, cx - 180, y, t, { a0: kind === 'solid' ? -0.07 : -0.5, a1: kind === 'solid' ? 0.07 : 0.5, r0: 70, maxR: 350, gap: 48, speed: 110, fadeK: 0.5 }); c.restore(); }
    F.clock(c, cx - 185, kind === 'solid' ? y - 85 : y, 0.62, t, 0.35);
    F.ear(c, cx + 205, kind === 'solid' ? y - 40 : y, 0.75);
    line(c, [cx - 185, 730], [cx + 205, 730], { w: 2, dry: false, alpha: 0.6 });
    INK.arrowHead(c, [cx + 150, 730], [cx + 205, 730], 12, { w: 2 }); INK.arrowHead(c, [cx - 130, 730], [cx - 185, 730], 12, { w: 2 });
    F.fit(c, 'aynı uzaklık', cx + 10, 770, 300, 28, { weight: 400, alpha: 0.7 });
    if (kCheck > 0) { P.check(c, cx - 60, 830, 50, kCheck, { w: 7, color: F.GREEN }); P.write(c, 'duyuldu', cx - 10, 850, kCheck, { size: 40, color: F.GREEN }); }
  }
  E.scene({
    name: 'Deney', concept: 'Ses katı, sıvı ve gazda yayılır; hız sınıflaması', from: 'setup', to: 'change', trFrom: [960, 560],
    draw(ctx, t) {
      const su = E.s('setup'), sr = E.s('result'), sp = E.s('speed'), sw = E.s('why'), sc = E.s('change');
      const aA = 1 - E.se(t, sp - 0.3, sp + 0.5), aB = Math.min(E.se(t, sp - 0.3, sp + 0.5), 1 - E.se(t, sc - 0.3, sc + 0.5)), aC = E.se(t, sc - 0.3, sc + 0.5);
      if (aA > 0) E.layer(ctx, aA, c => {
        P.write(c, 'Özdeş kaynak: aynı model üç saat', 960, 235, E.seg(t, su + 0.3, su + 1.5), { size: 50, align: 'center' });
        ST.forEach(([h, k], i) => {
          const cx = 350 + i * 610, ki = E.se(t, su + 1.2 + i * 1.2, su + 1.9 + i * 1.2, 'out'); if (ki <= 0) return;
          E.layer(c, ki, c2 => {
            F.fit(c2, h, cx + 10, 360, 440, 46, { color: i === 0 ? F.WOOD : i === 1 ? PAL.water : PAL.ink });
            station(c2, cx + 10, k, t, E.se(t, sr + 0.4 + i * 0.6, sr + 1.2 + i * 0.6), E.se(t, sr + 1.4 + i * 0.8, sr + 2.0 + i * 0.8));
          });
        });
      });
      if (aB > 0) E.layer(ctx, aB, c => {
        P.write(c, 'Sesin yayılma hızı (genellikle): katı > sıvı > gaz', 960, 215, E.seg(t, sp + 0.2, sp + 1.6), { size: 50, align: 'center' });
        const L = [['katı', 330, 20, 0, 560, F.WOOD], ['sıvı', 480, 25, 0.15, 290, PAL.water], ['gaz', 630, 34, 0.55, 110, PAL.ink]];
        const x0 = 330, x1 = 1700, t0 = sp + 1.4;
        line(c, [x0, 265], [x0, 700], { w: 2.4, dry: false }); INK.label(c, 'başlangıç', x0, 262, { size: 28, align: 'center', alpha: 0.7 });
        line(c, [x1, 265], [x1, 700], { w: 2.4, dry: false, color: F.GREEN }); INK.label(c, 'varış', x1, 262, { size: 28, align: 'center', alpha: 0.7, color: F.GREEN });
        let rank = 0;
        L.forEach(([name, y, d, skip, v, col], i) => {
          const lane = F.rr(x0, y - 60, x1 - x0, 120, 12, 3);
          P.fillPts(c, lane, PAL.white, 0.7);
          if (i === 0) wash(c, lane, F.WOOD, 0.2, 541, { bleed: 1, blooms: 0 }); if (i === 1) wash(c, lane, PAL.water, 0.18, 542, { bleed: 1, blooms: 0 });
          const pos = Math.min(x1 - x0, Math.max(0, (t - t0) * v));
          c.save(); P.path(c, lane); c.clip();
          F.particles(c, x0, y - 60, x1 - x0, 120, t, { d, skip, amp: 6, lam: 70, f: 2.5, front: pos, seed: 31 + i, r: 5.5 });
          c.restore();
          stroke(c, lane, { w: 2.2, closed: true, seed: 543 + i });
          if (t > t0) { const fx = x0 + pos; stroke(c, P.arc(fx - 50, y, 55, -0.95, 0.95, 14), { w: 5, color: F.AMB, dry: false }); }
          F.fit(c, name, 230, y + 14, 150, 46, { color: col });
          const arr = t0 + (x1 - x0) / v;
          if (t > arr) { rank = i + 1; F.stamp(c, x1 + 90, y, (i + 1) + '.', E.se(t, arr, arr + 0.4), { color: i === 0 ? F.GREEN : F.AMB, size: 46 }); }
        });
        F.fit(c, '(çizim ölçekli değildir)', 1560, 745, 400, 28, { weight: 400, alpha: 0.65 });
        // neden: tanecikler yakın ve sıkı bağlı
        const kw = E.se(t, sw + 0.3, sw + 1.1);
        if (kw > 0) E.layer(c, kw, c2 => {
          F.card(c2, 330, 770, 1370, 120, 551);
          const px = 380, py = 830;
          for (let r = 0; r < 2; r++) for (let q = 0; q < 7; q++) {
            const x = px + q * 30, y = py - 15 + r * 30;
            if (q < 6) stroke(c2, [[x + 7, y], [x + 11, y - 5], [x + 15, y + 5], [x + 19, y - 5], [x + 23, y]], { w: 1.4, dry: false });
            if (r === 0) line(c2, [x, y + 7], [x, y + 23], { w: 1.4, dry: false });
            c2.fillStyle = PAL.water; c2.strokeStyle = PAL.ink; c2.lineWidth = 1.2; c2.beginPath(); c2.arc(x, y, 6, 0, 7); c2.fill(); c2.stroke();
          }
          F.wfit(c2, 'katı: tanecikler çok yakın ve sıkıca bağlı → titreşimi hızla aktarır', 620, 845, E.seg(t, sw + 0.8, sw + 2.2), 38, 1050);
        });
      });
      if (aC > 0) E.layer(ctx, aC, c => {
        P.write(c, 'Kaynağın ortamı değişince duyulan ses de değişir', 960, 225, E.seg(t, sc + 0.3, sc + 1.6), { size: 50, align: 'center' });
        // sol: havada
        F.card(c, 200, 300, 700, 540, 561);
        F.fit(c, 'saat havada', 550, 370, 600, 44);
        F.rings(c, 430, 600, t, { a0: -0.5, a1: 0.5, r0: 60, maxR: 250, gap: 45, speed: 100 });
        F.clock(c, 400, 600, 0.8, t, 1);
        F.ear(c, 720, 600, 0.9);
        F.meter(c, 460, 800, 4, E.se(t, sc + 2.0, sc + 2.8));
        F.fit(c, 'güçlü', 740, 790, 200, 36, { alpha: E.se(t, sc + 2.6, sc + 3.0) });
        // sağ: su kabının içinde, kulak dışarıda
        F.card(c, 1020, 300, 700, 540, 562);
        F.fit(c, 'saat suyun içinde', 1370, 370, 600, 44);
        const tank = [[1090, 450], [1110, 720], [1440, 720], [1460, 450]];
        P.fillPts(c, F.closeP([[1094, 500], [1110, 716], [1440, 716], [1456, 500]]), PAL.water, 0.35); stroke(c, tank, { w: 3, seed: 563 });
        F.clock(c, 1275, 630, 0.7, t, 1);
        F.rings(c, 1275, 600, t, { a0: -Math.PI + 0.3, a1: -0.3, r0: 60, maxR: 120, gap: 30, speed: 60 });
        F.rings(c, 1275, 470, t, { a0: -1.2, a1: -0.3, r0: 40, maxR: 200, gap: 45, speed: 90, alpha: 0.35 });
        F.ear(c, 1600, 520, 0.9);
        F.meter(c, 1280, 800, 2, E.se(t, sc + 3.2, sc + 4.0));
        F.fit(c, 'zayıf', 1560, 790, 200, 36, { alpha: E.se(t, sc + 3.8, sc + 4.2) });
        F.fit(c, '(Damla’nın gözlemi)', 960, 895, 900, 28, { weight: 400, alpha: 0.6 });
      });
    }
  });
})();

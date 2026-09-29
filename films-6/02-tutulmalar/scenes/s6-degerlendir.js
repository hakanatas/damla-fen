// SAHNE 6 — Değerlendir: neden her ay tutulma olmuyor? Ay yörüngesi ≈ 5° eğik · Fergani (FB.6.1.3 c · D19.2)
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const F = G62;
  const TILT = 0.2;   // çizimde abartılmış eğim (gerçek ≈ 5°)

  function why(ctx, t) {
    const sw = E.s('why');
    // 12 ay: her ay bir Yeni Ay ve bir Dolunay
    for (let i = 0; i < 12; i++) {
      const k = E.se(t, sw + 0.8 + i * 0.25, sw + 1.2 + i * 0.25, 'out'); if (k <= 0) continue;
      const x = 290 + i * 122;
      P.moon(ctx, x, 360, 32 * P.pop(k)); P.fillPts(ctx, circlePts(x, 360, 33, 33, 24), '#262A40', 0.8 * k);
      P.moon(ctx, x, 480, 32 * P.pop(k));
      INK.label(ctx, (i + 1) + '. ay', x, 570, { size: 30, align: 'center', alpha: 0.7 * k });
    }
    E.inkText(ctx, 'Yeni Ay', 150, 372, t, sw + 1, 1e9, { size: 34, align: 'center' });
    E.inkText(ctx, 'Dolunay', 150, 492, t, sw + 1, 1e9, { size: 34, align: 'center' });
    E.inkText(ctx, 'Her ay tutulma?', 960, 720, t, sw + 4.5, 1e9, { size: 70, align: 'center', color: '#8A4A10' });
    P.cross(ctx, 1320, 700, 40, E.se(t, sw + 6.0, sw + 6.8), { w: 8, color: '#A23A2A' });
    DAMLA.draw(ctx, { x: 560, y: 900, s: 0.9, view: 'q3', expr: 'thinking', look: [0.6, -0.5], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 2, arms: [[-1, 0.35], [1, [40, -150], 0.4]] });
  }

  // yandan görünüş: Güneş solda, Dünya ortada, Ay'ın yörünge düzlemi eğik
  function tilt(ctx, t) {
    const st = E.s('tilt'), sm = E.s('miss');
    const EX = 900, EY = 530, OR = 420;
    P.sun(ctx, 110, EY, 150, t, { nrays: 20, cells: false });
    // Dünya'nın yörünge düzlemi (yatay) + Dünya'nın gölgesi (sağ) — Güneş ışığı Ay'ı gölgeye düşürür
    P.fillPts(ctx, [[EX, EY - 70], [1900, EY - 40], [1900, EY + 40], [EX, EY + 70]], '#2A2A36', 0.22);
    ctx.save(); ctx.globalAlpha = 0.7; dashed(ctx, [[260, EY], [1880, EY]], { w: 2, on: 12, off: 9 }); ctx.restore();
    INK.label(ctx, 'Dünya’nın yörünge düzlemi', 280, EY + 230, { size: 34, alpha: 0.75 });
    ctx.save(); ctx.globalAlpha = 0.5; line(ctx, [260, EY + 190], [300, EY + 10], { w: 1.4, dry: false }); ctx.restore();
    // Ay'ın yörüngesi (eğik çizgi)
    const k = E.se(t, st + 0.5, st + 2.0);
    const dx = Math.cos(TILT) * OR, dy = Math.sin(TILT) * OR;
    ctx.save(); ctx.globalAlpha = k; stroke(ctx, [[EX - dx, EY + dy], [EX + dx, EY - dy]], { w: 3.4, color: PAL.water }); ctx.restore();
    if (k > 0.5) {
      stroke(ctx, P.arc(EX, EY, 220, -TILT, 0, 16), { w: 2.4, color: '#8A4A10' });
      P.write(ctx, '≈ 5°', EX + 240, EY - 20, E.seg(t, st + 2.0, st + 3.0), { size: 50, color: '#8A4A10' });
      INK.label(ctx, 'Ay’ın yörüngesi', EX - dx + 110, EY + dy + 55, { size: 36, weight: 700, color: PAL.water, align: 'center', alpha: E.se(t, st + 2, st + 2.8) });
      INK.label(ctx, '(çizimde eğim abartılmıştır)', 280, EY + 275, { size: 28, alpha: 0.65 * E.se(t, st + 3, st + 3.6) });
    }
    P.earth(ctx, EX, EY, 70);
    // miss: Dolunay konumunda Ay çoğu ay gölgenin üstünden/altından geçer
    if (t > sm) {
      const cyc = [[-95, 'üstünden geçti'], [95, 'altından geçti'], [0, 'hizada: tutulma!']];
      const idx = Math.min(2, Math.floor((t - sm - 0.5) / 2.6));
      if (idx >= 0) {
        const [off, txt] = cyc[idx], lt = (t - sm - 0.5) - idx * 2.6, a = E.se(t, sm + 0.5 + idx * 2.6, sm + 1.0 + idx * 2.6);
        const mx = EX + dx * 0.95, my = EY + off;
        E.layer(ctx, idx === 2 ? a : a * (1 - E.se(lt, 2.2, 2.6)), c => {
          P.moon(c, mx, my, 30);
          if (idx === 2) P.fillPts(c, circlePts(mx, my, 31, 31, 24), '#7A3524', 0.7);
          INK.label(c, txt, mx + 60, my + 12, { size: 38, weight: 700, color: idx === 2 ? '#8A4A10' : PAL.ink });
        });
      }
    }
    E.inkText(ctx, 'Tutulma için Güneş, Dünya ve Ay tam aynı hizada olmalı.', 960, 230, t, sm + 6.6, 1e9, { size: 44, align: 'center' });
    E.inkText(ctx, '(çizim ölçekli değildir)', 1700, 890, t, st + 1, 1e9, { size: 30, weight: 400, align: 'center', alpha: 0.65 });
  }

  function fergani(ctx, t) {
    const sf = E.s('fergani');
    F.card(ctx, 330, 190, 1260, 640, { seed: 71 });
    P.write(ctx, 'Fergani (800’lü yıllar)', 960, 290, E.seg(t, sf + 0.3, sf + 1.4), { size: 60, align: 'center', color: '#8A4A10' });
    // usturlap benzeri çizim + takvim
    const k = E.se(t, sf + 1.0, sf + 2.0), cx = 640, cy = 540;
    if (k > 0) {
      stroke(ctx, P.partial(circlePts(cx, cy, 150, 150, 70), k), { w: 4 });
      stroke(ctx, P.partial(circlePts(cx, cy, 110, 110, 60), k), { w: 2 });
      for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283; line(ctx, [cx + Math.cos(a) * 130, cy + Math.sin(a) * 130], [cx + Math.cos(a) * 148, cy + Math.sin(a) * 148], { w: 1.4, dry: false, alpha: k }); }
      line(ctx, [cx - 140, cy + 20], [cx + 140, cy - 20], { w: 4, alpha: k }); INK.inkDot(ctx, cx, cy, 6);
      stroke(ctx, circlePts(cx, cy - 170, 16, 16, 20), { w: 3, closed: true, alpha: k });
    }
    P.icon.calendar(ctx, 1260, 650, 0.9, '?');
    P.write(ctx, 'Güneş ve Ay tutulmalarının', 1260, 460, E.seg(t, sf + 2.0, sf + 3.2), { size: 42, align: 'center' });
    P.write(ctx, 'zamanlarını belirleme yöntemi', 1260, 520, E.seg(t, sf + 3.0, sf + 4.2), { size: 42, align: 'center' });
    INK.label(ctx, 'Türk-İslam bilim insanı', 640, 780, { size: 34, align: 'center', alpha: 0.7 * E.se(t, sf + 4, sf + 4.6) });
  }

  E.scene({
    name: 'Değerlendir', concept: 'Neden her ay tutulma olmaz?', from: 'why', to: 'fergani', trFrom: [960, 540],
    draw(ctx, t) {
      const a = E.se(t, E.s('tilt') - 0.3, E.s('tilt') + 0.6), b = E.se(t, E.s('fergani') - 0.3, E.s('fergani') + 0.6);
      if (a < 1) E.layer(ctx, 1 - a, c => why(c, t));
      if (a > 0 && b < 1) E.layer(ctx, a * (1 - b * 0.8), c => tilt(c, t));
      if (b > 0) E.layer(ctx, b, c => fergani(c, t));
    }
  });
})();

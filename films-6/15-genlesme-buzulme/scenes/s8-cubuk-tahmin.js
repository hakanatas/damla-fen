// SAHNE 8 — Ayırt edici özellik: eşit uzunlukta farklı metal çubuklar, özdeş ısıtıcı, eşit süre → farklı uzama
// SAHNE 9 — Günlük yaşam (kavanoz kapağı, ray boşlukları) + gözlemlenmemiş durum için tahmin (ç) + geçerliği sorgulama (d)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed, rng } = INK;
  const F = G15;
  // doğrusal genleşme katsayıları (×10⁻⁶ /°C): Al ≈ 23, Cu ≈ 17, Fe ≈ 12  → çizimde oranlar korunur, büyüklük abartılır
  const RODS = [['alüminyum', '#C9CDD0', 23], ['bakır', '#C27A4A', 17], ['demir', '#6E6A66', 12]];
  E.scene({
    name: 'Metal çubuklar', concept: 'Genleşme saf maddeler için ayırt edici özelliktir', from: 'rods', to: 'rods-res', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('rods'), ss = E.s('rods-res');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const X0 = 420, L = 640, Y = [300, 470, 640];
      // duvar/kıskaç
      const wall = [[340, 220], [410, 218], [412, 720], [342, 722], [340, 220]]; P.fillPts(ctx, wall, '#C9B48E'); wash(ctx, wall, '#8A6A45', 0.4, 2801, { bleed: 1 }); stroke(ctx, wall, { w: 3, closed: true, seed: 2802 });
      const heatK = E.se(t, sr + 3.0, ss + 2.0);
      const on = E.se(t, sr + 2.4, sr + 3.0);
      // başlangıç ucu (kesikli)
      ctx.save(); ctx.globalAlpha = 0.75; dashed(ctx, F.linePts([X0 + L, 230], [X0 + L, 720], 60), { w: 2.4, on: 12, off: 9, color: PAL.water }); ctx.restore();
      INK.label(ctx, 'başlangıç', X0 + L, 760, { size: 30, align: 'center', alpha: 0.75, rot: 0 });
      RODS.forEach(([name, col, a], i) => {
        const y = Y[i], ext = a * 3.2 * heatK;
        F.rod(ctx, X0 - 20, y, L + 20 + ext, col, 2810 + i * 5);
        INK.label(ctx, name, 330, y + 12, { size: 38, weight: 700, align: 'right', rot: 0 });
        F.burner(ctx, X0 + 300, y + 118, on, t + i * 0.37, 0.55);
        if (heatK > 0.95) { ctx.save(); ctx.globalAlpha = E.se(t, ss - 0.4, ss + 0.4); line(ctx, [X0 + L, y - 26], [X0 + L + ext, y - 26], { w: 3, color: F.HEAT, dry: false }); ctx.restore(); }
      });
      P.icon.clock(ctx, 1260, 330, 0.8, heatK * Math.PI * 2);
      INK.label(ctx, 'eşit süre', 1260, 430, { size: 36, weight: 700, align: 'center', rot: 0 });
      INK.label(ctx, 'özdeş ısıtıcılar', 1260, 480, { size: 36, weight: 700, align: 'center', rot: 0, alpha: E.se(t, sr + 2.4, sr + 3.2) });
      INK.label(ctx, 'eşit uzunluk', X0 + L / 2, 210, { size: 36, weight: 700, align: 'center', alpha: E.se(t, sr + 0.8, sr + 1.6) });
      // sonuç: uzama çubuk grafiği
      const gk = E.se(t, ss + 1.0, ss + 1.8);
      if (gk > 0) E.layer(ctx, gk, c => {
        F.card(c, 1400, 160, 440, 560, { fill: '#FBF6E8', seed: 2830 });
        INK.label(c, 'uzama miktarı', 1620, 225, { size: 40, weight: 700, align: 'center', color: F.AMBER });
        RODS.forEach(([name, col, a], i) => {
          const h = a * 14 * E.se(t, ss + 1.6 + i * 0.3, ss + 2.6 + i * 0.3), x = 1470 + i * 130;
          const b = [[x, 620], [x, 620 - h], [x + 80, 620 - h], [x + 80, 620]];
          P.fillPts(c, b, col, 0.95); stroke(c, b.concat([b[0]]), { w: 2.4, closed: true, seed: 2831 + i, dry: false });
          INK.label(c, name, x + 40, 665, { size: 26, weight: 700, align: 'center', rot: 0 });
        });
        line(c, [1450, 620], [1810, 620], { w: 2.4, dry: false });
      });
      const fk = E.se(t, ss + 4.4, ss + 5.2);
      if (fk > 0) E.layer(ctx, fk, c => {
        F.card(c, 360, 790, 1080, 110, { fill: '#F6E7B8', seed: 2840 });
        INK.label(c, 'Farklı saf madde → farklı genleşme: ayırt edici özellik', 900, 862, { size: 40, weight: 700, align: 'center', rot: 0 });
      });
      INK.label(ctx, '(çizim ölçekli değildir)', 1620, 760, { size: 26, align: 'center', alpha: 0.6 });
      DAMLA.draw(ctx, {
        x: 1700, y: 1000, s: 0.8, view: 'q3', flip: true, t, seed: 8, blink: E.blink(t, 21), squash: E.breath(t), talk: E.talk(t),
        expr: t > ss ? 'surprised' : 'curious', look: [-0.8, -0.5], arms: [[-1, 0.4], [1, 1.3]]
      });
    }
  });

  // ---------------- Günlük yaşam + tahmin + geçerlik ----------------
  function frame(ctx, x, y, w, h, season, sag, t, seed) {
    F.card(ctx, x, y, w, h, { fill: season === 'yaz' ? '#FBF1DD' : '#EEF3F5', seed });
    ctx.save(); ctx.beginPath(); ctx.rect(x + 10, y + 10, w - 20, h - 20); ctx.clip();
    const g = y + h - 50; line(ctx, [x, g], [x + w, g], { w: 2.4, seed: seed + 1 });
    F.poles(ctx, x + 70, x + w - 70, y + 90, g, sag, seed + 10);
    if (season === 'yaz') P.sun(ctx, x + w / 2, y + 70, 30, t, { nrays: 12, cells: false, glow: false });
    else { const r = rng(seed); ctx.fillStyle = PAL.white; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(x + 20 + r() * (w - 40), y + 20 + ((r() * (h - 40) + t * 30) % (h - 60)), 3, 0, 7); ctx.fill(); } }
    ctx.restore();
  }
  E.scene({
    name: 'Günlük yaşam ve tahmin', concept: 'Gözlemlenmemiş durum için tahmin ve geçerliği sorgulama', from: 'life', to: 'validity', trFrom: [960, 540],
    draw(ctx, t) {
      const sl = E.s('life'), sp = E.s('predict'), sv = E.s('validity');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      // ---- günlük yaşam: kapak + raylar ----
      const la = 1 - E.se(t, sp - 0.2, sp + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        F.card(c, 200, 190, 520, 560, { fill: '#FBF6E8', seed: 2901 });
        // kavanoz kapağı özeti
        const lid = [[330, 430], [590, 430], [590, 500], [330, 500], [330, 430]];
        P.fillPts(c, lid, '#B9B7B2'); wash(c, lid, '#5C5850', 0.4, 2902, { bleed: 0.6, blooms: 0 }); stroke(c, lid, { w: 3, closed: true, seed: 2903 });
        const g = E.se(t, sl + 1.2, sl + 3.0);
        [[1, 0], [-1, 0]].forEach(([dx]) => { if (g > 0.1) P.arrow(c, [460 + dx * 140, 465], [460 + dx * (140 + 60 * g), 465], 1, { w: 3.4, color: F.HEAT, head: 12 }); });
        const glass = [[340, 500], [340, 660], [580, 660], [580, 500]]; stroke(c, glass, { w: 3, seed: 2904 }); P.fillPts(c, [[344, 540], [344, 656], [576, 656], [576, 540]], PAL.light, 0.55);
        INK.label(c, 'metal kapak genleşti,', 460, 300, { size: 36, weight: 700, align: 'center', color: F.HEAT });
        INK.label(c, 'gevşedi', 460, 345, { size: 36, weight: 700, align: 'center', color: F.HEAT });
        INK.label(c, 'kavanoz', 460, 710, { size: 32, align: 'center', alpha: 0.75 });
        // raylar
        const rk = E.se(t, sl + 3.8, sl + 4.6);
        if (rk > 0) E.layer(c, rk, d => {
          F.card(d, 800, 190, 940, 560, { fill: '#FBF6E8', seed: 2910 });
          INK.label(d, 'Raylar', 1270, 255, { size: 46, weight: 700, align: 'center', color: F.AMBER });
          const summer = 0.5 + 0.5 * Math.sin((t - sl - 5) * 1.2);
          const gap = 34 - 20 * summer;
          F.rails(d, 850, 420, 400 + (34 - gap) / 2, 2, gap, 2911);
          const gx = 850 + 400 + (34 - gap) / 2;
          P.fillPts(d, [[gx, 395], [gx + gap, 395], [gx + gap, 525], [gx, 525]], F.AMBER, 0.12);
          INK.leader(d, [gx + gap / 2, 360], [gx + gap / 2, 405], { bend: 0 });
          INK.label(d, 'boşluk', gx + gap / 2, 345, { size: 36, weight: 700, align: 'center' });
          P.sun(d, 1000, 650, 26, t, { nrays: 10, cells: false, glow: false });
          INK.label(d, 'yaz: ray uzar, boşluk daralır', 1040, 660, { size: 32, weight: 700, color: F.HEAT, alpha: 0.4 + 0.6 * summer });
          INK.label(d, 'kış: ray kısalır, boşluk açılır', 1040, 715, { size: 32, weight: 700, color: PAL.water, alpha: 0.4 + 0.6 * (1 - summer) });
        });
      });
      // ---- tahmin: elektrik telleri ----
      const pa = E.se(t, sp + 0.2, sp + 0.9);
      if (pa > 0) E.layer(ctx, pa, c => {
        const va = E.se(t, sv + 0.8, sv + 1.6);
        // büyük sahne (predict) → sola küçülür (validity)
        const sc = E.lerp(1, 0.001, va);
        if (sc > 0.01) E.layer(c, 1 - va, d => {
          const g = 820; line(d, [120, g], [1300, g + 4], { w: 3, seed: 2920 });
          F.poles(d, 260, 1160, 330, g, 30 + 28 * E.se(t, sp + 5.0, sp + 6.4), 2921);
          P.sun(d, 1250, 240, 44, t, { nrays: 14, cells: false });
        });
        const qk = E.se(t, sp + 0.8, sp + 1.6, 'out');
        if (va < 1) E.layer(c, qk * (1 - va), d => {
          F.card(d, 1330, 190, 520, 290, { fill: '#FBF6E8', seed: 2930 });
          P.write(d, 'Elektrik telleri', 1590, 260, E.seg(t, sp + 1.2, sp + 2.2), { size: 44, align: 'center' });
          P.write(d, 'yazın mı, kışın mı', 1590, 320, E.seg(t, sp + 2.0, sp + 3.0), { size: 44, align: 'center' });
          P.write(d, 'daha sarkık?', 1590, 380, E.seg(t, sp + 2.8, sp + 3.6), { size: 44, align: 'center' });
          INK.label(d, 'gözlemlemedim', 1590, 440, { size: 28, align: 'center', alpha: 0.6 * E.se(t, sp + 3.4, sp + 4.0) });
          const gk = E.se(t, sp + 4.6, sp + 5.3, 'out');
          if (gk > 0) { F.card(d, 1330, 520, 520, 250, { fill: '#F6E7B8', seed: 2931 }); P.write(d, 'Tahminim: Yazın!', 1370, 590, E.seg(t, sp + 4.8, sp + 5.8), { size: 44, color: F.AMBER }); P.write(d, 'Metal tel ısı alınca', 1370, 660, E.seg(t, sp + 5.6, sp + 6.4), { size: 38 }); P.write(d, 'genleşip uzar.', 1370, 715, E.seg(t, sp + 6.2, sp + 7.0), { size: 38 }); }
        });
        // geçerlik: iki fotoğraf karşılaştırması
        if (va > 0) E.layer(c, va, d => {
          INK.label(d, 'Tahminim geçerli mi?', 960, 230, { size: 54, weight: 700, align: 'center', color: F.AMBER });
          frame(d, 260, 300, 600, 400, 'yaz', 58, t, 2940);
          frame(d, 1060, 300, 600, 400, 'kış', 26, t, 2960);
          INK.label(d, 'yaz fotoğrafı', 560, 750, { size: 38, weight: 700, align: 'center', color: F.HEAT });
          INK.label(d, 'kış fotoğrafı', 1360, 750, { size: 38, weight: 700, align: 'center', color: PAL.water });
          P.arrow(d, [880, 500], [1040, 500], E.se(t, sv + 2.0, sv + 2.8), { w: 3.4, head: 14 }); P.arrow(d, [1040, 520], [880, 520], E.se(t, sv + 2.4, sv + 3.2), { w: 3.4, head: 14 });
          INK.label(d, 'karşılaştır', 960, 580, { size: 32, weight: 700, align: 'center', alpha: E.se(t, sv + 2.8, sv + 3.4) });
          const ok = E.se(t, sv + 4.0, sv + 4.8);
          if (ok > 0) { F.card(d, 460, 790, 1000, 100, { fill: '#F6E7B8', seed: 2980 }); INK.label(d, 'aynı tel · aynı yer · aynı saat', 960, 857, { size: 40, weight: 700, align: 'center', alpha: ok, rot: 0 }); }
        });
      });
      DAMLA.draw(ctx, {
        x: 1760, y: 1050, s: 0.85, view: 'q3', flip: true, t, seed: 9, blink: E.blink(t, 23), squash: E.breath(t), talk: E.talk(t),
        expr: t > sv ? 'determined' : (t > sp + 4.6 ? 'happy' : 'thinking'), look: [-0.8, -0.5], arms: t > sp + 4.6 ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.08]] : [[-1, 0.35], [1, 0.4]]
      });
    }
  });
})();

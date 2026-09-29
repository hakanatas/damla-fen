// SAHNE 5 — İşin bağlı olduğu faktörler (FB.7.2.1 c): yer değiştirme ve kuvvet; birim joule (nitel karşılaştırma, hesap yok)
(function () {
  const { PAL, line, stroke, circlePts, wash, dashed } = INK;
  const F = F7E;
  const M = 150; // 1 m = 150 px (çizim)
  function workBar(ctx, x, y, len, k, lab) {
    if (k <= 0) return;
    const r = F.rect(x, y - 26, x + len * k, y + 26);
    P.fillPts(ctx, r, PAL.light, 0.7); stroke(ctx, r, { w: 2.4, closed: true, dry: false, seed: 4500 + (len | 0), noBoil: true });
    if (lab && k > 0.95) F.txt(ctx, lab, x, y + 68, { size: 34, color: '#8A4A10' });
  }
  function track(ctx, t, fy, dist, t0, t1, seed, name) {
    F.floor(ctx, fy, seed, 150, 1000, fy + 90);
    for (let i = 0; i <= 4; i++) { const x = 260 + i * M; line(ctx, [x, fy], [x, fy + 16], { w: 2, dry: false, seed: seed + i }); F.txt(ctx, String(i), x, fy + 50, { size: 30, align: 'center', alpha: 0.7 }); }
    F.txt(ctx, 'm', 260 + 4 * M + 36, fy + 50, { size: 30, alpha: 0.7 });
    F.txt(ctx, name, 180, fy - 40, { size: 44, color: '#8A4A10' });
    const m = E.se(t, t0, t1, 'sine'), cx = 260 + dist * M * m;
    F.box(ctx, cx, fy, 120, 100, seed + 20);
    F.vec(ctx, [cx - 50, fy - 140], [cx + 70, fy - 140], 1, { label: 'aynı kuvvet', ly: -16, size: 30 });
    if (m > 0) F.disp(ctx, [260, fy + 76], [260 + dist * M, fy + 76], m, { label: dist + ' m', ly: 40, size: 34 });
    return m;
  }
  E.scene({
    name: 'Yer değiştirme', concept: 'İş, yer değiştirmeye bağlıdır', from: 'factors', to: 'farther', trFrom: [500, 500],
    draw(ctx, t) {
      const sf = E.s('factors'), sa = E.s('farther');
      const ka = E.se(t, sf + 0.3, sf + 1.0);
      if (ka > 0) E.layer(ctx, ka, c => track(c, t, 450, 2, sf + 2.5, sf + 4.8, 4510, 'A'));
      const kb = E.se(t, sf + 0.9, sf + 1.6);
      if (kb > 0) E.layer(ctx, kb, c => track(c, t, 790, 4, sf + 4.2, sf + 8.2, 4540, 'B'));
      // iş çubukları
      const bk = E.se(t, sa + 1.2, sa + 1.8);
      if (bk > 0) E.layer(ctx, bk, c => {
        F.txt(c, 'yapılan iş', 1120, 250, { size: 44 });
        F.txt(c, 'A', 1080, 420, { size: 40, color: '#8A4A10' }); workBar(c, 1120, 406, 230, E.se(t, sa + 1.6, sa + 2.6));
        F.txt(c, 'B', 1080, 760, { size: 40, color: '#8A4A10' }); workBar(c, 1120, 746, 460, E.se(t, sa + 2.4, sa + 3.8), 'daha çok iş');
      });
      DAMLA.draw(ctx, { x: 1800, y: 560, s: 0.8, view: 'q3', flip: true, expr: t > sa + 3.5 ? 'happy' : 'curious', look: [-0.8, 0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });

  E.scene({
    name: 'Kuvvet', concept: 'İş, uygulanan kuvvete bağlıdır', from: 'bigger', to: 'bigger', trFrom: [960, 600],
    draw(ctx, t) {
      const s = E.s('bigger');
      F.floor(ctx, 800, 31, -200, 2120);
      const H = 440;
      ctx.save(); ctx.globalAlpha *= 0.6 * E.se(t, s + 0.5, s + 1.2); dashed(ctx, (() => { const p = []; for (let x = 250; x <= 1180; x += 4) p.push([x, H]); return p; })(), { w: 2, on: 10, off: 8 }); ctx.restore();
      E.inkText(ctx, 'aynı yükseklik', 1180, H + 44, t, s + 0.8, 1e9, { size: 34, align: 'right', alpha: 0.8 });
      const m = E.se(t, s + 2.0, s + 4.6, 'io');
      // hafif çanta
      const lt = E.lerp(800 - 102, H - 102, m), ht = E.lerp(800 - 187, H - 187, m);
      F.bag(ctx, 450, lt, 0.6, '#9FB3BD', 4600);
      F.bag(ctx, 900, ht, 1.1, '#3A5563', 4610);
      F.vec(ctx, [450, lt + 10], [450, lt - 80], E.se(t, s + 1.0, s + 1.8), { label: 'kuvvet', lx: 70, ly: 10, size: 32 });
      F.vec(ctx, [900, ht + 10], [900, ht - 170], E.se(t, s + 1.4, s + 2.2), { label: 'daha büyük kuvvet', lx: 150, ly: 10, size: 32, w: 8, head: 24 });
      F.txt(ctx, 'hafif çanta', 450, 860, { size: 36, align: 'center' });
      F.txt(ctx, 'ağır çanta', 900, 860, { size: 36, align: 'center' });
      // iş çubukları (dikey)
      const bk = E.se(t, s + 5.0, s + 5.6);
      if (bk > 0) E.layer(ctx, bk, c => {
        F.txt(c, 'yapılan iş', 1440, 330, { size: 44, align: 'center' });
        const k1 = E.se(t, s + 5.4, s + 6.2), k2 = E.se(t, s + 6.0, s + 7.2);
        [[1340, 170, k1, 'hafif'], [1540, 340, k2, 'ağır']].forEach(([x, h, k, n], i) => {
          const r = F.rect(x - 45, 780 - h * k, x + 45, 780); if (k > 0) { P.fillPts(c, r, PAL.light, 0.7); stroke(c, r, { w: 2.4, closed: true, dry: false, seed: 4620 + i, noBoil: true }); }
          F.txt(c, n, x, 850, { size: 34, align: 'center', color: '#8A4A10' });
        });
      });
      DAMLA.draw(ctx, { x: 1780, y: 800, s: 0.85, view: 'q3', flip: true, expr: t > s + 7 ? 'happy' : 'curious', look: [-0.8, -0.2], blink: E.blink(t, 10), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, 0.4]] });
    }
  });

  E.scene({
    name: 'Sonuç ve birim', concept: 'İşin bağlı olduğu faktörler; birim joule', from: 'depends', to: 'joule', trFrom: [960, 400],
    draw(ctx, t) {
      const sd = E.s('depends'), sj = E.s('joule');
      F.card(ctx, 170, 180, 1520, 600, { seed: 4700 });
      P.write(ctx, 'Yapılan iş neye bağlıdır?', 240, 280, E.seg(t, sd + 0.3, sd + 1.4), { size: 58 });
      const L = [['1', 'uygulanan kuvvete', F.FORCE], ['2', 'kuvvet doğrultusundaki yer değiştirmeye', F.DISP]];
      L.forEach(([n, txt, col], i) => {
        const at = sd + 1.6 + i * 1.6, y = 400 + i * 100;
        const k = E.se(t, at, at + 0.5); if (k <= 0) return;
        const c = circlePts(270, y - 16, 26, 26, 24); ctx.save(); ctx.globalAlpha *= k; P.fillPts(ctx, c, col, 0.35); stroke(ctx, c, { w: 2.2, closed: true, seed: 4710 + i }); F.txt(ctx, n, 270, y - 2, { size: 36, align: 'center' }); ctx.restore();
        P.write(ctx, txt, 320, y, E.seg(t, at + 0.2, at + 1.4), { size: 48, color: col });
      });
      // birim
      const jk = E.se(t, sj + 0.2, sj + 1.0, 'out');
      if (jk > 0) E.layer(ctx, jk, c => {
        F.tag(c, 'Birim: joule (J)', 700, 760, { size: 72, seed: 4720, fill: '#F6E7B8' });
        INK.label(c, 'Adı: James Prescott Joule (1818–1889), İngiliz bilim insanı', 700, 850, { size: 32, align: 'center', alpha: 0.75 * E.se(t, sj + 3, sj + 4) });
      });
      DAMLA.draw(ctx, { x: 1720, y: 880, s: 1.05, view: 'q3', flip: true, expr: t > sj + 1 ? 'happy' : 'curious', look: [-0.8, 0], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 1, arms: t > sj + 1 ? [[-1, 2.6], [1, 2.6]] : [[-1, [-100, -140]], [1, 0.4]] });
    }
  });
})();

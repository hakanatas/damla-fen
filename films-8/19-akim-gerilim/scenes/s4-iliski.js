// SAHNE 4 — Akım–gerilim ilişkisi: soru, neden sabit direnç, düzenek, tablo, örüntü, grafik, genelleme (Ohm Yasası)
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U6;
  const R = 30, DATA = [1, 2, 3, 4].map(n => ({ n, V: 1.5 * n, I: 1.5 * n / R }));   // 1,5 V/pil; 30 Ω
  const f = F19.fmt;
  const BOX = { x0: 230, y0: 430, x1: 830, y1: 740 };
  E.scene({
    name: 'Soru ve düzenek', concept: 'Akım–gerilim ilişkisi: deney düzeneği', from: 'rq', to: 'rset', trFrom: [960, 540],
    draw(ctx, t) {
      const sq = E.s('rq'), sw = E.s('rwhy'), ss = E.s('rset');
      const qk = Math.min(E.se(t, sq + 0.3, sq + 1), 1 - E.se(t, sw - 0.2, sw + 0.4));
      if (qk > 0) E.layer(ctx, qk, c => {
        CK.card(c, 260, 250, 1400, 330, { seed: 1940, fill: '#FAF6EC' });
        U.txt(c, 'Yeni sorum:', 320, 330, { size: 40, color: U.AMBER });
        P.write(c, 'Gerilim artınca, bir elemanın üzerinden', 320, 420, E.seg(t, sq + 0.8, sq + 2.4), { size: 52 });
        P.write(c, 'geçen akım nasıl değişir?', 320, 500, E.seg(t, sq + 2.2, sq + 3.6), { size: 52 });
      });
      const wk = Math.min(E.se(t, sw, sw + 0.6), 1 - E.se(t, ss - 0.2, ss + 0.4));
      if (wk > 0) E.layer(ctx, wk, c => {
        CK.socket(c, 560, 620, 1.3); CK.bulb(c, 560, 569, 1.3, 1, t);
        U.txt(c, 'ampul: teli ısınır,', 560, 740, { size: 42, align: 'center' });
        U.txt(c, 'direnci değişir', 560, 800, { size: 42, align: 'center', color: U.HEAT });
        F19.resistor(c, 1340, 470, 1.6);
        U.txt(c, 'sabit direnç: 30 Ω', 1340, 620, { size: 46, align: 'center', color: U.AMBER, alpha: E.seg(t, sw + 3, sw + 4) });
        P.check(c, 1340, 700, 50, E.se(t, sw + 4, sw + 4.6), { w: 7, color: PAL.life });
        U.txt(c, 'bağımsız değişken: pil sayısı · kontrol: aynı eleman', 960, 890, { size: 36, align: 'center', alpha: 0.75 * E.seg(t, sw + 5, sw + 6) });
      });
      const sk = E.se(t, ss, ss + 0.6);
      if (sk > 0) E.layer(ctx, sk, c => {
        const n = 1 + Math.min(3, Math.floor(Math.max(0, t - ss - 2) / 1.2));
        F19.loop(c, Object.assign({ cells: n, el: 'direnc', A: 'right', V: true, k: E.se(t, ss, ss + 1.4) }, BOX));
        U.txt(c, '30 Ω', 530, 490, { size: 34, align: 'center' });
        U.txt(c, 'A: seri', 1000, 600, { size: 44 }); U.txt(c, 'V: direncin uçlarına paralel', 1000, 680, { size: 44 });
        U.txt(c, n + ' pil  →  ' + f(1.5 * n, 1) + ' V', 1000, 800, { size: 50, color: U.AMBER, alpha: E.seg(t, ss + 2, ss + 2.6) });
      });
      U.damla(ctx, t, { x: 1760, y: 960, s: 0.85, view: 'q3', flip: true, expr: 'thinking', look: [-0.8, -0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  // tablo, örüntü, grafik, genelleme
  E.scene({
    name: 'Veri ve genelleme', concept: 'Örüntü, grafik, Ohm Yasası', from: 'rtab', to: 'formula', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('rtab'), sp = E.s('pattern'), sg = E.s('graph'), so = E.s('ohm'), sf = E.s('formula');
      const showRatio = t > sp + 3;
      const rows = [['Pil', 'Gerilim (V)', 'Akım (A)'].concat(showRatio ? ['Gerilim ÷ Akım'] : [])];
      DATA.forEach(d => rows.push([String(d.n), f(d.V, 1), f(d.I, 2)].concat(showRatio ? ['30'] : [])));
      const tabA = 1 - E.se(t, so - 0.2, so + 0.5);
      if (tabA > 0) E.layer(ctx, tabA, c => {
        U.grid(c, 110, 200, showRatio ? [110, 210, 190, 260] : [110, 210, 190], 84, rows, r => E.seg(t, st + 0.6 + r * 1.1, st + 1.4 + r * 1.1), { hs: 32, fs: 42, hl: showRatio ? [[1, PAL.light], [2, PAL.light], [3, PAL.light], [4, PAL.light]].filter((_, i) => E.seg(t, sp + 3 + i * 0.4, sp + 3.4 + i * 0.4) > 0) : [] });
        // ×2 örüntüsü
        const pk = E.se(t, sp + 0.4, sp + 1.6);
        if (pk > 0 && t < sp + 3.2) { c.save(); c.globalAlpha = pk * (1 - E.se(t, sp + 2.6, sp + 3.2));
          [[85, 330, 405, 20], [85, 415, 575, 20], [640, 330, 405, 655], [640, 415, 575, 655]].forEach(([x, a, b, lx]) => { P.arrow(c, [x, a], [x, b], 1, { w: 3, color: U.AMBER, head: 12 }); U.txt(c, '×2', lx, (a + b) / 2 + 12, { size: 34, color: U.AMBER }); });
          c.restore(); }
        // canlı ölçüm aletleri (grafik gelene kadar): son kaydedilen satırın okumaları
        const mA = 1 - E.se(t, sg - 0.3, sg + 0.3);
        if (mA > 0) { let last = 0; for (let r = 1; r <= 4; r++) if (t > st + 0.6 + r * 1.1) last = r;
          if (last > 0) E.layer(c, mA, cc => { const d = DATA[last - 1];
            U.meter(cc, 1130, 480, 1.05, 'V', f(d.V, 1) + ' V', { name: 'voltmetre' });
            U.meter(cc, 1530, 480, 1.05, 'A', f(d.I, 2) + ' A', { name: 'ampermetre' });
            U.txt(cc, d.n + ' pil · 30 Ω', 1330, 250, { size: 44, align: 'center', color: U.AMBER }); }); }
        // grafik
        const gk = E.se(t, sg, sg + 0.6);
        if (gk > 0) {
          const gx = 1020, gy = 800, gw = 720, gh = 560;  // eksen başlangıcı sol alt
          c.save(); c.globalAlpha = gk;
          P.arrow(c, [gx, gy], [gx + gw + 30, gy], 1, { w: 3.2, head: 14 }); P.arrow(c, [gx, gy], [gx, gy - gh - 30], 1, { w: 3.2, head: 14 });
          U.txt(c, 'Akım (A)', gx + gw - 40, gy + 70, { size: 34, align: 'center' });
          U.txt(c, 'Gerilim (V)', gx + 10, gy - gh - 50, { size: 34 });
          U.txt(c, '0', gx - 26, gy + 34, { size: 30 });
          DATA.forEach(d => {
            const px = gx + d.I / 0.25 * gw, py = gy - d.V / 7.5 * gh;
            line(c, [px, gy - 8], [px, gy + 8], { w: 2, dry: false }); line(c, [gx - 8, py], [gx + 8, py], { w: 2, dry: false });
            U.txt(c, f(d.I, 2), px, gy + 40, { size: 26, align: 'center', alpha: 0.8 }); U.txt(c, f(d.V, 1), gx - 16, py + 9, { size: 26, align: 'right', alpha: 0.8 });
            INK.dashed(c, CK.densify(CK.densify(CK.densify(CK.densify([[gx, py], [px, py], [px, gy]])))), { w: 1.4, alpha: 0.4, on: 6, off: 6 });
          });
          c.restore();
          DATA.forEach((d, i) => { const k = E.se(t, sg + 0.8 + i * 0.6, sg + 1.2 + i * 0.6, 'out'); if (k > 0) INK.inkDot(c, gx + d.I / 0.25 * gw, gy - d.V / 7.5 * gh, 8 * P.pop(k), { color: '138,74,16' }); });
          const lk = E.se(t, sg + 3.4, sg + 5);
          if (lk > 0) P.drawOn(c, [[gx, gy], [gx + 0.23 / 0.25 * gw, gy - 6.9 / 7.5 * gh]], lk, { w: 4, color: PAL.water, dry: false });
          E.inkText(c, 'başlangıç noktasından geçen doğru', gx + 300, gy - gh + 30, t, sg + 5, 1e9, { size: 36, align: 'center', color: PAL.water });
        }
      });
      // genelleme + formül
      const oA = E.se(t, so, so + 0.6);
      if (oA > 0) E.layer(ctx, oA, c => {
        CK.card(c, 260, 190, 1400, 680, { seed: 1950, fill: '#FAF6EC' });
        P.write(c, 'Ohm Yasası', 960, 290, E.seg(t, so + 0.3, so + 1.2), { size: 72, align: 'center', color: U.AMBER });
        P.write(c, 'Bir iletkenin uçları arasındaki gerilimin,', 960, 390, E.seg(t, so + 1, so + 2.6), { size: 46, align: 'center' });
        P.write(c, 'içinden geçen akıma oranı sabittir.', 960, 455, E.seg(t, so + 2.4, so + 3.8), { size: 46, align: 'center' });
        const fk = E.seg(t, sf + 0.3, sf + 1.8);
        P.write(c, 'Direnç  =  Gerilim  ÷  Akım', 960, 590, fk, { size: 64, align: 'center' });
        P.write(c, '(Ω)            (V)          (A)', 960, 650, E.seg(t, sf + 1.8, sf + 3), { size: 38, align: 'center', color: U.AMBER });
        P.write(c, 'örnek:  6,0 V ÷ 0,20 A = 30 Ω', 960, 780, E.seg(t, sf + 3.4, sf + 4.8), { size: 50, align: 'center', color: PAL.water });
      });
      U.damla(ctx, t, { x: t > sg && t < so ? 560 : 1800, y: 960, s: 0.7, view: 'q3', flip: true, expr: t > so ? 'happy' : 'thinking', look: [-0.8, -0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
})();

// SAHNE 6 — Verileri kaydetme, yorumlama ve bilimsel çıkarım (İstanbul ≈41° K, öğle vakti)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F81;
  // hesap: öğle Güneş yüksekliği = 90° − 41° + δ ; gölge = 1 m / tan(yükseklik); gündüz süresi (kırılma dahil)
  const ROWS = [
    { d: '21 Haziran', a: '≈ 72°', s: '≈ 32 cm', g: '≈ 15 saat', alt: 72.4, sh: 0.317 },
    { d: '21 Mart · 23 Eylül', a: '≈ 49°', s: '≈ 87 cm', g: '≈ 12 saat', alt: 49.0, sh: 0.87 },
    { d: '21 Aralık', a: '≈ 26°', s: '≈ 209 cm', g: '≈ 9 saat', alt: 25.6, sh: 2.09 }
  ];
  const COLS = [205, 820, 1220, 1590];
  E.scene({
    name: 'Veri ve çıkarım', concept: 'Kaydet · yorumla · çıkarım', from: 'data', to: 'infer', trFrom: [960, 300],
    draw(ctx, t) {
      const sd = E.s('data'), si = E.s('interp'), sf = E.s('infer');
      const dim = 1 - 0.8 * E.se(t, sf, sf + 0.8);
      E.layer(ctx, dim, c => {
        F.card(c, 150, 165, 1620, 365, { seed: 901 });
        P.write(c, 'İstanbul (≈ 41° K) · öğle vakti', 205, 222, E.seg(t, sd + 0.3, sd + 1.3), { size: 40, color: '#8A4A10' });
        const hk = E.se(t, sd + 1.0, sd + 1.6);
        c.save(); c.globalAlpha *= hk;
        INK.label(c, 'Tarih', COLS[0], 285, { size: 34, weight: 700 });
        INK.label(c, 'Işının düşme açısı', COLS[1], 285, { size: 34, weight: 700, align: 'center' });
        INK.label(c, 'Gölge (1 m çubuk)', COLS[2], 285, { size: 34, weight: 700, align: 'center' });
        INK.label(c, 'Gündüz süresi', COLS[3], 285, { size: 34, weight: 700, align: 'center' });
        stroke(c, [[195, 302], [1740, 305]], { w: 2.4, dry: false, seed: 902 });
        c.restore();
        ROWS.forEach((r, i) => {
          const y = 360 + i * 66, t0 = sd + 1.8 + i * 1.5;
          P.write(c, r.d, COLS[0], y, E.seg(t, t0, t0 + 0.6), { size: 40 });
          P.write(c, r.a, COLS[1], y, E.seg(t, t0 + 0.3, t0 + 0.8), { size: 40, align: 'center', color: F.AMBER });
          P.write(c, r.s, COLS[2], y, E.seg(t, t0 + 0.5, t0 + 1.0), { size: 40, align: 'center' });
          P.write(c, r.g, COLS[3], y, E.seg(t, t0 + 0.7, t0 + 1.2), { size: 40, align: 'center', color: PAL.water });
        });
        // ölçekli çubuk-gölge çizimi (1 m = 120 px)
        const GY = 860, UH = 120;
        stroke(c, [[150, GY], [1200, GY + 2]], { w: 3, seed: 903 });
        ROWS.forEach((r, i) => {
          const x = [210, 520, 840][i], k = E.se(t, sd + 2.0 + i * 1.5, sd + 3.0 + i * 1.5);
          if (k <= 0) return;
          c.save(); c.globalAlpha *= k;
          const sh = r.sh * UH;
          F.stick(c, x, GY, UH, sh, 1, { w: 6, seed: 910 + i });
          const tip = [x + sh, GY], a = r.alt * Math.PI / 180, L = 190 / Math.sin(a);
          F.dash(c, tip, [tip[0] - Math.cos(a) * L, tip[1] - Math.sin(a) * L], { color: F.AMBER, w: 2.6 });
          INK.label(c, r.a.replace('≈ ', ''), tip[0] + 8, GY - 12, { size: 30, weight: 700, color: F.AMBER });
          INK.label(c, r.d.split(' · ')[0], x + sh / 2, GY + 42, { size: 30, align: 'center', alpha: 0.8 });
          c.restore();
        });
        // yorum listesi
        const ik = E.se(t, si + 0.3, si + 1.0);
        if (ik > 0) {
          c.save(); c.globalAlpha *= ik;
          F.card(c, 1260, 570, 520, 320, { seed: 920 });
          c.restore();
          P.write(c, 'Işınlar dike yaklaştıkça:', 1290, 632, E.seg(t, si + 0.6, si + 1.6), { size: 38, color: F.AMBER });
          ['• gölge kısalır', '• gündüz uzar', '• yüzey daha çok ısınır'].forEach((l, i) => P.write(c, l, 1300, 700 + i * 60, E.seg(t, si + 1.8 + i * 1.2, si + 2.8 + i * 1.2), { size: 40 }));
        }
      });
      // çıkarım zinciri
      const fk = E.se(t, sf + 0.3, sf + 1.0);
      if (fk > 0) E.layer(ctx, fk, c => {
        F.card(c, 260, 215, 1400, 640, { seed: 930 });
        INK.label(c, 'Bilimsel çıkarım', 960, 285, { size: 50, weight: 700, align: 'center', color: '#8A4A10' });
        const box = (x, y, w, h, txt, sz, col, seed) => { const b = [[x, y], [x + w, y + 2], [x + w - 2, y + h], [x + 2, y + h - 2], [x, y]]; P.fillPts(c, b, col, 0.18); stroke(c, b, { w: 2.6, closed: true, seed, dry: false }); INK.label(c, txt, x + w / 2, y + h / 2 + sz * 0.35, { size: sz, weight: 700, align: 'center' }); };
        const k1 = E.se(t, sf + 0.8, sf + 1.4), k2 = E.se(t, sf + 2.2, sf + 2.8), k3 = E.se(t, sf + 4.0, sf + 4.6);
        c.save(); c.globalAlpha *= k1;
        box(360, 330, 540, 90, 'Eksen eğikliği (≈ 23,5°)', 40, F.AMBER, 931);
        INK.label(c, '+', 960, 390, { size: 60, weight: 700, align: 'center' });
        box(1020, 330, 540, 90, 'Güneş etrafında dolanma', 40, PAL.water, 932);
        c.restore();
        if (k2 > 0) { c.save(); c.globalAlpha *= k2;
          P.arrow(c, [960, 430], [960, 490], 1, { w: 3.4 });
          box(360, 500, 1200, 110, 'ışınların düşme açısı ve gündüz süresi yıl boyunca değişir', 40, PAL.light, 933);
          c.restore(); }
        if (k3 > 0) { c.save(); c.globalAlpha *= k3;
          P.arrow(c, [960, 620], [960, 690], 1, { w: 3.4 });
          INK.label(c, 'MEVSİMLER', 960, 780, { size: 76, weight: 700, align: 'center', color: PAL.life });
          c.restore(); }
      });
      DAMLA.draw(ctx, { x: 100, y: 905, s: 0.7, view: 'q3', expr: t > sf ? 'happy' : 'thinking', look: [0.8, -0.6], blink: E.blink(t, 7), squash: E.breath(t), t, seed: 6,
        arms: [[-1, 0.35], [1, 1.2 + Math.sin(t * 9) * 0.1]], prop: 'notebook' });
    }
  });
})();

// SAHNE 6 — Hipotez: farklı cins sıvıların yoğunlukları farklıdır. Eşit hacim (100 cm³) su ve zeytinyağı tartılır,
// yoğunluklar hesaplanır, aynı kapta yağ üstte kalır (hesap somut olarak doğrulanır). Yağı lavaboya dökme uyarısı.
(function () {
  const { PAL, stroke, line } = INK;
  const F = F617, RED = F.RED, BR = '#8A4A10', OIL = F.OIL;
  function hypCard(ctx, t) {
    const s0 = E.s('hyp');
    const k = E.se(t, s0 + 0.2, s0 + 0.9, 'out');
    if (k > 0) E.layer(ctx, k, c => {
      F.card(c, 330, 170, 1590, 280, { seed: 1861, fill: '#FBF3DE' });
      F.txt(c, 'Hipotez: “Farklı cins sıvıların yoğunlukları farklıdır.”', 960, 242, { size: 48, align: 'center' });
    });
  }
  function measure(ctx, t) {
    const s0 = E.s('hyp'), sl = E.s('liquids'), sd = E.s('liqd');
    const kb = E.se(t, s0 + 3.0, s0 + 4.0, 'out');
    if (kb > 0) E.layer(ctx, kb, c => {
      F.beaker(c, 200, 470, 190, 280, { layers: [{ h: 200, color: PAL.water }], marks: [[548, '100 cm³']], seed: 1 });
      F.beaker(c, 560, 470, 190, 280, { layers: [{ h: 200, color: OIL, alpha: 0.55, edge: '#9A7A10' }], marks: [[548, '100 cm³']], seed: 2 });
      F.txt(c, 'su', 295, 800, { size: 44, align: 'center' });
      F.txt(c, 'zeytinyağı', 655, 800, { size: 44, align: 'center' });
    });
    // ölçümler
    const X = 960;
    const rows = [
      ['boş kap: 50 g', sl + 0.3, PAL.ink],
      ['kap + su: 150 g', sl + 1.8, PAL.ink],
      ['kap + yağ: 142 g', sl + 3.3, PAL.ink],
      ['su: 150 − 50 = 100 g', sl + 5.4, PAL.water],
      ['yağ: 142 − 50 = 92 g', sl + 7.0, '#8A6A10']
    ];
    rows.forEach(([s, a, col], i) => P.write(ctx, s, X, 380 + i * 64 + (i > 2 ? 20 : 0), E.seg(t, a, a + 1.1), { size: 46, color: col }));
    if (t > sl + 5.0) P.drawOn(ctx, P.bez([X, 548], [X + 250, 552], [X + 480, 546], 20), E.se(t, sl + 5.0, sl + 5.4), { w: 2.4 });
    // yoğunluklar
    const d = [['su: 100 ÷ 100 = 1 g/cm³', sd + 0.3, PAL.water], ['zeytinyağı: 92 ÷ 100 = 0,92 g/cm³', sd + 2.6, '#8A6A10']];
    d.forEach(([s, a, col], i) => P.write(ctx, s, X, 740 + i * 70, E.seg(t, a, a + 1.4), { size: 48, color: col }));
    if (t > sd + 4.4) { const k = E.se(t, sd + 4.4, sd + 5.0); ctx.save(); ctx.globalAlpha *= k; F.txt(ctx, 'farklı!', 1760, 780, { size: 48, color: PAL.life, align: 'center' }); ctx.restore(); }
  }
  function layer(ctx, t) {
    const s0 = E.s('layer');
    const pw = E.se(t, s0 + 0.2, s0 + 1.6), po = E.se(t, s0 + 1.8, s0 + 3.4);
    const x0 = 700, y0 = 330, w = 320, h = 480;
    F.beaker(ctx, x0, y0, w, h, { layers: [{ h: 190 * pw, color: PAL.water }, { h: 190 * po, color: OIL, alpha: 0.6, edge: '#9A7A10' }], seed: 5 });
    // dökülen akış
    if (pw > 0 && pw < 1) stroke(ctx, P.bez([x0 - 60, y0 - 40], [x0 + 20, y0 - 30], [x0 + 100, y0 + h - 190 * pw], 16), { w: 10, color: PAL.water, alpha: 0.6, dry: false });
    if (po > 0 && po < 1) stroke(ctx, P.bez([x0 + w + 60, y0 - 40], [x0 + w - 20, y0 - 30], [x0 + w - 100, y0 + h - 190 - 190 * po], 16), { w: 10, color: OIL, alpha: 0.7, dry: false });
    const kl = E.se(t, s0 + 3.6, s0 + 4.4);
    if (kl > 0) {
      ctx.save(); ctx.globalAlpha *= kl;
      INK.leader(ctx, [1180, 470], [x0 + w - 30, y0 + h - 285]); F.txt(ctx, 'zeytinyağı · 0,92 g/cm³', 1190, 480, { size: 44, color: '#8A6A10' });
      INK.leader(ctx, [1180, 690], [x0 + w - 30, y0 + h - 95]); F.txt(ctx, 'su · 1 g/cm³', 1190, 700, { size: 44, color: PAL.water });
      ctx.restore();
    }
    P.write(ctx, 'az yoğun olan üstte', 1190, 590, E.seg(t, s0 + 4.6, s0 + 5.6), { size: 44 });
    P.check(ctx, 1640, 575, 50, E.se(t, s0 + 5.6, s0 + 6.1), { w: 7, color: PAL.life });
    F.damla(ctx, t, { x: 400, y: 862, s: 1.2, expr: po > 0.8 ? 'happy' : 'curious', look: [0.7, -0.2], seed: 5 });
  }
  function oil(ctx, t) {
    const s0 = E.s('oil');
    const k = E.se(t, s0 + 0.1, s0 + 0.8, 'out');
    ctx.save(); ctx.translate((1 - k) * 600, 0);
    F.card(ctx, 260, 170, 1660, 840, { color: RED, seed: 1862 });
    line(ctx, [270, 250], [1650, 244], { w: 3, color: RED, dry: false });
    F.txt(ctx, '⚠  Yağı lavaboya dökme!', 960, 228, { size: 50, color: RED, align: 'center' });
    // lavabo
    const lx = 560, ly = 560;
    const sink = [[lx - 170, ly - 60], [lx + 170, ly - 60], [lx + 130, ly + 60], [lx - 130, ly + 60], [lx - 170, ly - 60]];
    P.fillPts(ctx, sink, PAL.white); stroke(ctx, sink, { w: 3, closed: true, seed: 1863 });
    stroke(ctx, INK.circlePts(lx, ly + 30, 18, 8, 20), { w: 2.4, closed: true, dry: false });
    line(ctx, [lx + 120, ly - 60], [lx + 120, ly - 170], { w: 8, taper: 0, seed: 1864 }); line(ctx, [lx + 120, ly - 170], [lx + 40, ly - 170], { w: 8, taper: 0, seed: 1865 });
    F.oilBottle(ctx, lx - 120, ly - 120, 0.8);
    P.cross(ctx, lx, ly - 30, 110, E.se(t, s0 + 1.2, s0 + 1.8), { w: 14, color: RED });
    F.txt(ctx, 'suları kirletir', lx, ly + 150, { size: 40, align: 'center', alpha: E.se(t, s0 + 1.8, s0 + 2.4) });
    // biriktir → geri dönüşüm
    const kr = E.se(t, s0 + 3.0, s0 + 4.0, 'out');
    if (kr > 0) {
      ctx.save(); ctx.globalAlpha *= kr;
      F.oilBottle(ctx, 1080, 640, 1.2);
      P.arrow(ctx, [1170, 520], [1360, 520], E.se(t, s0 + 4.0, s0 + 4.8), { w: 4, color: PAL.life, bend: 20 });
      // geri dönüşüm oku (üçlü döngü)
      const cx = 1480, cy = 520;
      for (let i = 0; i < 3; i++) { const a0 = i * 2.094 - 1.4; const pts = P.arc(cx, cy, 70, a0, a0 + 1.6, 20); stroke(ctx, pts, { w: 7, color: PAL.life, dry: false, seed: 1870 + i }); INK.arrowHead(ctx, pts[pts.length - 3], pts[pts.length - 1], 16, { w: 5, color: PAL.life }); }
      F.txt(ctx, 'biriktir', 1080, 720, { size: 40, align: 'center' });
      F.txt(ctx, 'ilgili kuruluşa ver', 1480, 650, { size: 40, align: 'center' });
      ctx.restore();
    }
    ctx.restore();
  }
  E.scene({
    name: 'Sıvıların yoğunluğu', concept: 'Hipotez kurma ve test etme', from: 'hyp', to: 'oil', trFrom: [960, 240],
    draw(ctx, t) {
      F.desk(ctx, 860, 6);
      const aL = E.se(t, E.s('layer') - 0.4, E.s('layer') + 0.4), aO = E.se(t, E.s('oil') - 0.3, E.s('oil') + 0.3);
      if (aO < 1) hypCard(ctx, t);
      if (aL < 1) E.layer(ctx, 1 - aL, c => measure(c, t));
      if (aL > 0 && aO < 1) E.layer(ctx, Math.min(aL, 1 - aO), c => layer(c, t));
      if (aO > 0) oil(ctx, t);
    }
  });
})();

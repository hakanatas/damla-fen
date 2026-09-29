// SAHNE 4 — Hava olayları ve iklim tanımları (KB2.5); meteoroloji/meteorolog, iklim bilimi/iklim bilimci; tahmin–gözlem (OB4, SDB1.2); meslekler
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F82;
  const vis = (t, a, b, out = true) => Math.min(E.se(t, E.s(a) + 0.1, E.s(a) + 0.7), out ? 1 - E.se(t, E.e(b) - 0.25, E.e(b) + 0.25) : 1);
  function icon(c, kind, x, y, s, t) {
    if (kind === 'sun') { F.sunIcon(c, x, y, 26 * s, t); return; }
    F.cloud(c, x, y - 4 * s, 0.22 * s, 520 + (kind === 'rain' ? 1 : 0), { dark: kind === 'cloud' ? 0.2 : 0.6, w: 2 });
    if (kind === 'rain') for (let i = -1; i <= 1; i++) line(c, [x + i * 16 * s, y + 24 * s], [x + i * 16 * s - 6, y + 44 * s], { w: 2.4, color: PAL.water, dry: false, seed: 525 + i });
  }
  function defs(c, t) {
    const sw = E.s('weather'), sc = E.s('climate'), ss = E.s('sci');
    const k1 = E.se(t, sw + 0.2, sw + 0.8, 'out');
    if (k1 > 0) { c.save(); c.globalAlpha *= k1;
      F.card(c, 170, 190, 730, 470, { seed: 530 });
      INK.label(c, 'Hava olayları', 535, 262, { size: 54, weight: 700, align: 'center', color: PAL.water });
      [['sun', 'sabah'], ['cloud', 'öğle'], ['rain', 'akşam']].forEach(([k, n], i) => { icon(c, k, 330 + i * 200, 360, 1.3, t); INK.label(c, n, 330 + i * 200, 445, { size: 32, align: 'center', alpha: 0.75 }); });
      c.restore(); }
    ['atmosferde gerçekleşir', 'kısa sürede değişir', 'dar bir alanda'].forEach((l, i) => P.write(c, '• ' + l, 220, 520 + i * 48, E.seg(t, sw + 1.4 + i * 1.0, sw + 2.2 + i * 1.0), { size: 38 }));
    const k2 = E.se(t, sc + 0.2, sc + 0.8, 'out');
    if (k2 > 0) { c.save(); c.globalAlpha *= k2;
      F.card(c, 1020, 190, 730, 470, { seed: 531 });
      INK.label(c, 'İklim', 1385, 262, { size: 54, weight: 700, align: 'center', color: F.BROWN });
      // yıllar boyunca ölçümler → ortalama çizgisi
      const R = INK.rng(532), x0 = 1090, x1 = 1680, yb = 420;
      for (let i = 0; i < 30; i++) { const x = x0 + (x1 - x0) * i / 29, h = 40 + R() * 50; line(c, [x, yb], [x, yb - h], { w: 5, color: PAL.water, dry: false, alpha: 0.55, seed: 533 + i }); }
      stroke(c, [[x0 - 10, yb], [x1 + 10, yb]], { w: 2.4, dry: false, seed: 570 });
      const ak = E.se(t, sc + 2.0, sc + 3.0); if (ak > 0) { P.drawOn(c, [[x0 - 10, yb - 65], [x1 + 10, yb - 65]], ak, { w: 4, color: F.AMBER, dry: false }); INK.label(c, 'ortalama', x1 + 10, yb - 78, { size: 30, weight: 700, color: F.AMBER, align: 'right', alpha: ak }); }
      INK.label(c, '30 yıl', (x0 + x1) / 2, yb + 38, { size: 30, align: 'center', alpha: 0.7 });
      c.restore(); }
    ['uzun yılların ortalaması', 'geniş alanlarda', 'kolay kolay değişmez'].forEach((l, i) => P.write(c, '• ' + l, 1070, 520 + i * 48, E.seg(t, sc + 1.2 + i * 1.0, sc + 2.0 + i * 1.0), { size: 38 }));
    // bilim dalları
    const b1 = E.se(t, ss + 0.3, ss + 1.0, 'out'), b2 = E.se(t, ss + 2.8, ss + 3.5, 'out');
    const badge = (x, top, bottom, col, k, seed) => { if (k <= 0) return; c.save(); c.globalAlpha *= k; F.card(c, x, 700, 730, 170, { seed, color: col }); INK.label(c, top, x + 365, 768, { size: 44, weight: 700, align: 'center', color: col }); INK.label(c, bottom, x + 365, 830, { size: 40, align: 'center' }); c.restore(); };
    badge(170, 'Meteoroloji', 'bilim insanı: meteorolog', PAL.water, b1, 540);
    badge(1020, 'İklim bilimi', 'bilim insanı: iklim bilimci', F.BROWN, b2, 541);
  }
  const DAYS = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const FC = ['sun', 'sun', 'cloud', 'rain', 'rain', 'sun', 'cloud'];
  const OB = ['sun', 'sun', 'rain', 'rain', 'rain', 'cloud', 'cloud'];
  function forecast(c, t) {
    const sf = E.s('forecast');
    F.card(c, 150, 180, 1320, 640, { seed: 550 });
    INK.label(c, 'Bir haftalık hava tahmini ve gözlemim (örnek)', 810, 245, { size: 42, weight: 700, align: 'center', color: F.BROWN });
    const cx = i => 440 + i * 145;
    INK.label(c, 'Tahmin', 190, 425, { size: 38, weight: 700 }); INK.label(c, 'Gözlem', 190, 575, { size: 38, weight: 700 }); INK.label(c, 'Doğru mu?', 190, 710, { size: 38, weight: 700 });
    DAYS.forEach((d, i) => {
      INK.label(c, d, cx(i), 320, { size: 34, weight: 700, align: 'center' });
      icon(c, FC[i], cx(i), 400, 1.0, t);
      const k = E.se(t, sf + 1.0 + i * 0.6, sf + 1.4 + i * 0.6); if (k <= 0) return;
      c.save(); c.globalAlpha *= k; icon(c, OB[i], cx(i), 550, 1.0, t); c.restore();
      if (FC[i] === OB[i]) P.check(c, cx(i) - 10, 690, 44, E.se(t, sf + 1.3 + i * 0.6, sf + 1.7 + i * 0.6), { color: PAL.life, w: 5 });
      else P.cross(c, cx(i), 695, 18, E.se(t, sf + 1.3 + i * 0.6, sf + 1.7 + i * 0.6), { w: 5 });
    });
    stroke(c, [[180, 470], [1440, 472]], { w: 1.8, dry: false, seed: 551, alpha: 0.6 }); stroke(c, [[180, 620], [1440, 622]], { w: 1.8, dry: false, seed: 552, alpha: 0.6 });
    F.lbl(c, '7 günün 5’inde tahmin doğru', 810, 790, E.se(t, sf + 5.8, sf + 6.4), { size: 40, weight: 700, align: 'center', color: PAL.life });
    // meteoroloji istasyonu
    const k = E.se(t, sf + 0.4, sf + 1.0); if (k <= 0) return;
    c.save(); c.globalAlpha *= k;
    const bx = 1560, by = 560;
    line(c, [bx + 20, by + 80], [bx + 20, by + 260], { w: 5, seed: 553 }); line(c, [bx + 120, by + 80], [bx + 120, by + 260], { w: 5, seed: 554 });
    const box = [[bx, by], [bx + 140, by], [bx + 140, by + 90], [bx, by + 90], [bx, by]]; P.fillPts(c, box, PAL.white, 1); stroke(c, box, { w: 3, closed: true, seed: 555 });
    for (let i = 1; i < 5; i++) line(c, [bx + 10, by + i * 18], [bx + 130, by + i * 18], { w: 1.4, dry: false, seed: 556 + i, alpha: 0.6 });
    line(c, [bx + 220, by + 260], [bx + 222, by - 120], { w: 4, seed: 561 });
    const a = t * 4; for (let i = 0; i < 3; i++) { const an = a + i * 2.094, ex = bx + 222 + Math.cos(an) * 50, ey = by - 120 + Math.sin(an) * 12; line(c, [bx + 222, by - 120], [ex, ey], { w: 2.4, dry: false, seed: 562 + i }); P.fillPts(c, circlePts(ex, ey, 12, 9, 12), PAL.ink, 0.85); }
    INK.label(c, 'meteoroloji', 1680, 350, { size: 32, align: 'center', weight: 700 });
    INK.label(c, 'istasyonu', 1680, 390, { size: 32, align: 'center', weight: 700 });
    c.restore();
  }
  function jobs(c, t) {
    const sj = E.s('jobs');
    const items = [['Çiftçi', 'ekim ve hasat'], ['Kaptan', 'dalga ve rüzgâr'], ['Pilot', 'görüş ve fırtına']];
    items.forEach(([n, d], i) => {
      const k = E.se(t, sj + 0.3 + i * 1.2, sj + 0.9 + i * 1.2, 'out'); if (k <= 0) return;
      const x = 380 + i * 580, y = 470;
      c.save(); c.globalAlpha *= k;
      F.card(c, x - 230, 220, 460, 560, { seed: 580 + i });
      if (i === 0) { for (let j = -2; j <= 2; j++) { line(c, [x + j * 40, y + 130], [x + j * 40 + 10, y - 60], { w: 3, color: PAL.life, seed: 590 + j }); for (let q = 0; q < 4; q++) { const gy = y - 50 + q * 22; P.fillPts(c, circlePts(x + j * 40 + 10 - q * 1.5, gy, 8, 14, 12), PAL.light, 0.9); } } line(c, [x - 150, y + 130], [x + 150, y + 130], { w: 3, seed: 595 }); }
      if (i === 1) { const hull = [[x - 150, y + 20], [x + 150, y + 20], [x + 110, y + 90], [x - 120, y + 90], [x - 150, y + 20]]; P.fillPts(c, hull, '#8A6A45', 0.7); stroke(c, hull, { w: 3, closed: true, seed: 596 }); const cab = [[x - 60, y + 20], [x - 60, y - 50], [x + 40, y - 50], [x + 40, y + 20]]; P.fillPts(c, cab.concat([[x - 60, y + 20]]), PAL.white, 1); stroke(c, cab, { w: 3, seed: 597 }); line(c, [x - 10, y - 50], [x - 10, y - 120], { w: 4, seed: 598 }); for (let j = 0; j < 4; j++) stroke(c, P.arc(x - 160 + j * 100, y + 115, 40, Math.PI * 1.1, Math.PI * 1.9, 10), { w: 3, color: PAL.water, dry: false, seed: 599 + j }); }
      if (i === 2) { const body = [[x - 170, y], [x + 150, y - 10], [x + 180, y + 5], [x + 150, y + 25], [x - 160, y + 30], [x - 170, y]]; P.fillPts(c, body, PAL.white, 1); stroke(c, body, { w: 3, closed: true, seed: 610 }); const wing = [[x - 20, y + 10], [x + 60, y + 10], [x - 40, y + 120], [x - 80, y + 120], [x - 20, y + 10]]; P.fillPts(c, wing, '#C9CDD4', 1); stroke(c, wing, { w: 3, closed: true, seed: 611 }); const tail = [[x - 150, y + 2], [x - 190, y - 70], [x - 150, y - 70], [x - 110, y]]; stroke(c, tail, { w: 3, seed: 612 }); F.cloud(c, x + 60, y - 120, 0.3, 613); }
      INK.label(c, n, x, 680, { size: 52, weight: 700, align: 'center' });
      INK.label(c, d, x, 735, { size: 34, align: 'center', alpha: 0.75 });
      c.restore();
    });
  }
  E.scene({
    name: 'Hava ve iklim', concept: 'Tanımlar · bilim dalları · tahmin', from: 'weather', to: 'jobs', trFrom: [960, 540],
    draw(ctx, t) {
      F.fade(ctx, Math.min(1, 1 - E.se(t, E.e('sci') - 0.25, E.e('sci') + 0.25)), c => defs(c, t));
      F.fade(ctx, vis(t, 'forecast', 'forecast'), c => forecast(c, t));
      F.fade(ctx, vis(t, 'jobs', 'jobs', false), c => jobs(c, t));
      const sf = E.s('forecast'), fa = t > sf && t < E.e('forecast');
      DAMLA.draw(ctx, { x: fa ? 1790 : 960, y: 905, s: 0.62, view: 'q3', flip: fa, expr: 'curious', look: [fa ? -0.8 : 0, -0.6], blink: E.blink(t, 5), squash: E.breath(t), t, seed: 4, arms: [[-1, 0.35], [1, 1.2 + Math.sin(t * 9) * 0.1]], prop: 'notebook' });
    }
  });
})();

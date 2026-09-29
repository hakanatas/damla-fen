// SAHNE 4 — Verileri kaydet (FB.6.4.1 b) + günlük hayattan örnekler + dağınık yansıma sayesinde görme
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F611, V = F.V;
  const COLS = [300, 640, 960, 1300], HDR = ['Yüzey', 'Görüntü', 'Işınlar', 'Yansıma türü'];
  const ROWS = [['Düzgün folyo', 'net görünür', 'paralel yansır', 'düzgün yansıma'], ['Buruşuk folyo', 'görünmez', 'dağılır', 'dağınık yansıma']];

  function page(ctx, t) {
    const st = E.s('table'), sv = E.s('everyday');
    ctx.fillStyle = 'rgba(138,106,69,0.14)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 720);
    P.write(ctx, 'Folyo deneyi · veri tablosu', 290, 250, E.seg(t, st + 0.3, st + 1.4), { size: 54 });
    // tablo çizgileri
    const tk = E.se(t, st + 1.2, st + 2.2);
    if (tk > 0) {
      ctx.save(); ctx.globalAlpha *= tk;
      line(ctx, [280, 350], [1690, 346], { w: 2.6, seed: 681 });
      [620, 940, 1280].forEach((x, i) => line(ctx, [x, 290], [x, 560], { w: 2, seed: 682 + i, dry: false }));
      HDR.forEach((h, i) => INK.label(ctx, h, COLS[i], 330, { size: 40, weight: 700, color: '#8A4A10' }));
      ctx.restore();
    }
    ROWS.forEach((row, r) => row.forEach((cell, c) => {
      const at = st + 2.2 + r * 2.6 + c * 0.6;
      P.write(ctx, cell, COLS[c], 420 + r * 100, E.seg(t, at, at + 0.7), { size: 40, color: c === 3 ? PAL.water : PAL.ink });
    }));
    // günlük hayat
    const ek = E.se(t, sv + 0.2, sv + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      line(c, [280, 600], [1690, 596], { w: 1.6, dry: false, alpha: 0.5 });
      P.write(c, 'düzgün yansıtır:', 300, 670, E.seg(t, sv + 0.3, sv + 1.2), { size: 42, color: '#8A4A10' });
      P.write(c, 'ayna · durgun su · cilalı metal', 300, 730, E.seg(t, sv + 1.0, sv + 2.4), { size: 40 });
      P.write(c, 'dağınık yansıtır:', 1000, 670, E.seg(t, sv + 3.0, sv + 3.9), { size: 42, color: '#8A4A10' });
      P.write(c, 'kâğıt · duvar · kumaş', 1000, 730, E.seg(t, sv + 3.7, sv + 5.0), { size: 40 });
      // küçük çizimler: durgun su ve kâğıt
      const wv = []; for (let i = 0; i <= 40; i++) wv.push([320 + i * 12, 800 + Math.sin(i * 0.7) * 3]);
      stroke(c, wv, { w: 2.4, color: PAL.water, seed: 690 });
      const pp = [[1020, 780], [1140, 776], [1146, 850], [1024, 854], [1020, 780]]; P.fillPts(c, pp, '#FFFFFF'); stroke(c, pp, { w: 2, closed: true, seed: 691 });
    });
    DAMLA.draw(ctx, { x: 1640, y: 880, s: 0.8, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 7), squash: E.breath(t), t, talk: E.talk(t), seed: 4,
      arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
  }

  // oda: lamba → kitap; kitabın bir noktasından her yöne dağılan ışınlar üç gözlemciye ulaşır
  const BULB = [960, 250], PT = [960, 640];
  const OBS = [[430, 560], [1500, 400], [1620, 610]];
  function room(ctx, t) {
    const s = E.s('see');
    line(ctx, [120, 700], [1800, 700], { w: 2.6, seed: 700 });
    const book = [[840, 640], [1080, 636], [1084, 700], [844, 702], [840, 640]];
    P.fillPts(ctx, book, '#6F8A3A', 0.55); stroke(ctx, book, { w: 2.6, closed: true, seed: 701 });
    INK.label(ctx, 'kitap', 960, 750, { size: 36, align: 'center', weight: 700 });
    F.bulb(ctx, BULB[0], BULB[1], 1.1, 1);
    F.ray(ctx, [BULB[0], BULB[1] + 32], PT, E.se(t, s + 0.4, s + 1.4), { seed: 702 });
    // dağınık: noktadan her yöne kısa ışınlar
    const kd = E.se(t, s + 1.4, s + 2.4);
    for (let i = 0; i < 9; i++) { const a = Math.PI + (i + 0.5) / 9 * Math.PI; const e = [PT[0] + Math.cos(a) * 170, PT[1] + Math.sin(a) * 170]; if (Math.abs(Math.cos(a)) < 0.12) continue; F.ray(ctx, PT, e, kd, { w: 2, head: 10, heads: [0.8], seed: 710 + i, alpha: 0.6 }); }
    // gözlemcilere
    const ko = E.se(t, s + 2.2, s + 3.4);
    OBS.forEach((o, i) => { const dir = V.norm(V.sub(o, PT)); F.ray(ctx, PT, V.sub(o, V.mul(dir, 70)), ko, { seed: 720 + i, heads: [0.6] }); });
    P.icon.eye(ctx, OBS[1][0], OBS[1][1], 0.55); P.icon.eye(ctx, OBS[2][0], OBS[2][1], 0.55);
    DAMLA.draw(ctx, { x: 360, y: 700 + 0, s: 1.1, view: 'q3', expr: 'happy', look: [0.8, 0.3], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 4 });
    INK.label(ctx, 'her yerden görülür', 1420, 520, { size: 38, weight: 700, align: 'center', color: '#8A4A10', alpha: E.se(t, s + 3.2, s + 3.8) });
  }

  E.scene({
    name: 'Veri tablosu', concept: 'Verileri kaydetme; günlük hayat', from: 'table', to: 'see', trFrom: [960, 540],
    draw(ctx, t) {
      const s = E.s('see');
      const k = E.se(t, s - 0.2, s + 0.6);
      if (k < 1) E.layer(ctx, 1 - k, c => page(c, t));
      if (k > 0) E.layer(ctx, k, c => room(c, t));
    }
  });
})();

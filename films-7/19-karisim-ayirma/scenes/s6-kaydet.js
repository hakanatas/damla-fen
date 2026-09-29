// SAHNE 7 — Kaydet (karışım · özellik farkı · yöntem) · Sıra sende (farklı büyüklükte katıları ayıran düzenek) · Sıradaki: 20 Elektriklenme · Bitiş
(function () {
  const { PAL, line, stroke, circlePts, rng } = INK;
  const K = K7;
  const ROWS = [
    ['kum + su', 'kum çözünmez', 'süzme'],
    ['tuz + su', 'kaynama noktası', 'buharlaştırma, damıtma'],
    ['etil alkol + su', 'kaynama noktası', 'damıtma'],
    ['zeytinyağı + su', 'yoğunluk', 'ayırma hunisi'],
    ['odun talaşı + su', 'yoğunluk', 'yüzeni toplama, süzme'],
    ['kepek + un', 'tanecik boyutu', 'eleme'],
    ['demir tozu + kum', 'mıknatısa çekilme', 'mıknatısla ayırma']
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Karışımları ayırma', 290, 205, E.seg(t, sr + 0.3, sr + 1.4), { size: 58 });
    const X = [290, 780, 1230], y0 = 285;
    INK.label(ctx, 'Karışım', X[0], y0, { size: 40, weight: 700, alpha: 0.7 });
    INK.label(ctx, 'Farklı özellik', X[1], y0, { size: 40, weight: 700, alpha: 0.7 });
    INK.label(ctx, 'Yöntem', X[2], y0, { size: 40, weight: 700, alpha: 0.7 });
    stroke(ctx, K.linePts([270, y0 + 18], [1720, y0 + 14], 40), { w: 2.6, seed: 7701 });
    ROWS.forEach((r, i) => {
      const at = sr + 1.6 + i * 1.4, y = y0 + 76 + i * 78;
      P.write(ctx, r[0], X[0], y, E.seg(t, at, at + 0.6), { size: 42 });
      P.write(ctx, r[1], X[1], y, E.seg(t, at + 0.4, at + 1.0), { size: 42, color: K.AMBER });
      P.write(ctx, r[2], X[2], y, E.seg(t, at + 0.8, at + 1.4), { size: 42, color: PAL.water });
    });
  }
  function nextPart(ctx, t) {
    const sn = E.s('next');
    K.bench(ctx, -40, 1960, 860, 7801);
    // balon ve kâğıt parçacıkları
    const bx = 1450, by = 560 + Math.sin(t * 1.3) * 8;
    const r = rng(7810); const lift = E.se(t, sn + 1.5, sn + 3.5);
    for (let i = 0; i < 12; i++) { const x0 = 1300 + r() * 300, y0 = 850 - r() * 6, tx = bx - 90 + r() * 180, ty = by + 120 + r() * 20; const u = E.clamp(lift * 1.5 - r() * 0.5); const x = E.lerp(x0, tx, u), y = E.lerp(y0, ty, u); c2(ctx, x, y, r() * 3); }
    const bal = circlePts(bx, by, 110, 135, 60); P.fillPts(ctx, bal, '#D98E4A', 0.85); INK.wash(ctx, bal, '#B5553F', 0.3, 7820, { bleed: 1, blooms: 0 }); stroke(ctx, bal, { w: 3.2, closed: true, seed: 7821 });
    stroke(ctx, P.bez([bx, by + 135], [bx + 30, by + 200], [bx - 10, by + 270], 20), { w: 2, dry: false });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, '20 · Elektriklenme', 960, 290, t, sn + 1.0, 1e9, { size: 76, align: 'center' });
    F19.damla(ctx, t, { x: 560, y: 860, s: 1.35, expr: 'happy', look: [0.8, -0.2], arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
  }
  function c2(ctx, x, y, a) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = '#FBF8F1'; ctx.strokeStyle = PAL.ink; ctx.lineWidth = 1; ctx.fillRect(-7, -5, 14, 10); ctx.strokeRect(-7, -5, 14, 10); ctx.restore(); }
  E.scene({
    name: 'Kaydet', concept: 'Özellik farkı → yöntem', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sy = E.s('yourturn');
      page(ctx, t);
      K.task(ctx, t, sy, E.e('yourturn'), 'Sıra sende!', [
        'Farklı büyüklükteki katı tanecikleri (ör. kum, çakıl,',
        'mercimek) birbirinden ayıran bir düzenek tasarla.',
        'Hipotezini yaz, dene; ayrılmazsa yöntemini değiştir.',
        'Deneyi öğretmeninle, güvenle yap!'
      ], { x: 220, y: 260, w: 1480, h: 520, size: 46, lh: 80, step: 1.0 });
    }
  });
  E.scene({
    name: 'Sıradaki: Elektriklenme', concept: 'Sonraki konu', from: 'next', to: 'end', trFrom: [1450, 560],
    draw(ctx, t) { nextPart(ctx, t); K.end(ctx, t, '19 · Karışımları Ayırma', 'FB.7.5.10'); }
  });
})();

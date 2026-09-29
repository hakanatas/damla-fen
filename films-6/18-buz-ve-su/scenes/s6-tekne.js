// SAHNE 6 — Yoğunluk modeli: madenî para batar, gemi yüzer. Hamur top (2 g/cm³) batar; aynı hamur tekne (hava dahil 100 cm³ → 0,4) yüzer;
// yük eklenince (0,7 → yüzer; 1,1 → batar). Model yenilenir: daha büyük hacimli tekne daha çok yük taşır. (Kaldırma kuvvetine girilmez.)
(function () {
  const { PAL, stroke, line } = INK;
  const F = F618, RED = F.RED, BR = '#8A4A10';
  const X0 = 250, Y0 = 430, W = 960, H = 400, WY = 520, BOT = Y0 + H - 4;
  function marbles(ctx, x, fy, n, spread = 1) {
    for (let i = 0; i < n; i++) { const row = i < 5 ? 0 : 1; const j = row ? i - 5 : i; F.marble(ctx, x + (j - (row ? 1 : 2)) * 24 * spread, fy - 11 - row * 20, 11); }
  }
  function question(ctx, t) {
    const sq = E.s('boatq');
    // bardakta batan para
    const k = E.se(t, sq + 1.0, sq + 2.6);
    F.beaker(ctx, 300, 420, 240, 380, { layers: [{ h: 300, color: PAL.water }], seed: 8, inside: c => F.coin(c, 420, E.lerp(380, 790, k), 30) });
    P.write(ctx, 'madenî para: batar', 420, 360, E.seg(t, sq + 1.4, sq + 2.6), { size: 42, align: 'center' });
    // denizde gemi
    const ks = E.se(t, sq + 3.0, sq + 3.8, 'out');
    if (ks > 0) E.layer(ctx, ks, c => {
      F.sea(c, 760, 1860, 640, 860, t, { seed: 2061 });
      F.ship(c, 1300, 650 + Math.sin(t * 1.4) * 3, 1.1);
      P.write(c, 'metal gemi: yüzer', 1300, 360, E.seg(t, sq + 3.6, sq + 4.8), { size: 42, align: 'center' });
      P.write(c, '?', 960, 560, E.seg(t, sq + 5.0, sq + 5.6), { size: 110, align: 'center', color: BR });
    });
  }
  function tank(ctx, t) {
    const sc = E.s('clay'), sb = E.s('boat'), sl = E.s('load'), sr = E.s('revise');
    const front = F.tank(ctx, X0, Y0, W, H, WY, { t });
    const bx = 730, L = 240, D = 80;
    if (t < sb) { // top batar
      const k = E.se(t, sc + 2.0, sc + 3.6);
      F.clayBall(ctx, bx, E.lerp(Y0 - 10, BOT, k), 36);
    } else if (t < sr) {
      // tekne: yoğunluk → batma derinliği
      const ap = E.se(t, sb + 0.2, sb + 1.2, 'out');
      let d = 0.4, n = 0, sink = 0;
      if (t > sl + 0.6) { n = 3; d = E.lerp(0.4, 0.7, E.se(t, sl + 0.6, sl + 1.6)); }
      if (t > sl + 4.6) { n = 7; d = E.lerp(0.7, 1.1, E.se(t, sl + 4.6, sl + 5.6)); }
      sink = E.se(t, sl + 6.2, sl + 8.0, 'in');
      const fy = Math.min(WY + D * Math.min(d, 1), BOT);
      const by = E.lerp(E.lerp(Y0 - 40, fy, ap), BOT, sink) + (sink === 0 ? Math.sin(t * 2) * 2 : 0);
      ctx.save(); ctx.translate(bx, by); ctx.rotate(sink * 0.18); ctx.translate(-bx, -by);
      F.clayBoat(ctx, bx, by, L, D, { load: n ? (c, x, fl) => marbles(c, x, fl, n) : null });
      // tekne içindeki hava: kesik çizgili bölge
      if (sink < 0.1 && ap > 0.9) { ctx.save(); ctx.globalAlpha *= 0.6; INK.dashed(ctx, F.densePts([bx - L / 2, by - D], [bx + L / 2, by - D], 60), { w: 2, on: 8, off: 6, color: PAL.water }); ctx.restore(); }
      ctx.restore();
    } else {
      const ap = E.se(t, sr + 0.2, sr + 1.2, 'out');
      const L2 = 400, D2 = 80, fy = WY + D2 * 0.55;
      const by = E.lerp(Y0 - 40, fy, ap) + Math.sin(t * 2) * 2;
      F.clayBoat(ctx, bx, by, L2, D2, { load: (c, x, fl) => marbles(c, x, fl, 7, 1.6) });
    }
    front();
  }
  function panel(ctx, t) {
    const sc = E.s('clay'), sb = E.s('boat'), sl = E.s('load'), sr = E.s('revise');
    const X = 1270;
    const A = (a, b) => Math.min(E.se(t, a - 0.3, a + 0.3), 1 - E.se(t, b - 0.3, b + 0.3));
    const k1 = A(sc, sb);
    if (k1 > 0) E.layer(ctx, k1, c => {
      P.write(c, 'hamur top', X, 460, E.seg(t, sc + 0.4, sc + 1.2), { size: 48, color: BR });
      P.write(c, '40 g · 20 cm³', X, 540, E.seg(t, sc + 1.2, sc + 2.2), { size: 44 });
      P.write(c, '40 ÷ 20 = 2 g/cm³', X, 610, E.seg(t, sc + 2.6, sc + 3.8), { size: 44, color: PAL.water });
      P.write(c, '> 1 → batar', X, 680, E.seg(t, sc + 4.4, sc + 5.4), { size: 44, color: RED });
    });
    const k2 = A(sb, sl);
    if (k2 > 0) E.layer(ctx, k2, c => {
      P.write(c, 'aynı hamurdan tekne', X, 460, E.seg(t, sb + 0.4, sb + 1.4), { size: 48, color: BR });
      P.write(c, '40 g · 100 cm³', X, 540, E.seg(t, sb + 1.6, sb + 2.6), { size: 44 });
      INK.label(c, '(içindeki hava dahil kapladığı yer)', X, 585, { size: 30, alpha: 0.7 * E.se(t, sb + 2.6, sb + 3.4) });
      P.write(c, '40 ÷ 100 = 0,4 g/cm³', X, 650, E.seg(t, sb + 4.0, sb + 5.2), { size: 44, color: PAL.water });
      P.write(c, '< 1 → yüzer', X, 720, E.seg(t, sb + 6.0, sb + 7.0), { size: 44, color: PAL.life });
    });
    const k3 = A(sl, sr);
    if (k3 > 0) E.layer(ctx, k3, c => {
      P.write(c, '+ 30 g yük', X, 460, E.seg(t, sl + 0.3, sl + 1.1), { size: 46, color: BR });
      P.write(c, '70 ÷ 100 = 0,7 → yüzer', X, 530, E.seg(t, sl + 1.4, sl + 2.8), { size: 42, color: PAL.life });
      P.write(c, '+ 40 g daha', X, 620, E.seg(t, sl + 4.3, sl + 5.1), { size: 46, color: BR });
      P.write(c, '110 ÷ 100 = 1,1 → batar', X, 690, E.seg(t, sl + 5.4, sl + 6.8), { size: 42, color: RED });
      INK.label(c, '(her misket 10 g)', X, 780, { size: 30, alpha: 0.65 * E.se(t, sl + 1.0, sl + 1.8) });
    });
    const k4 = E.se(t, sr - 0.3, sr + 0.3);
    if (k4 > 0) E.layer(ctx, k4, c => {
      P.write(c, 'daha geniş tekne', X, 460, E.seg(t, sr + 0.4, sr + 1.4), { size: 48, color: BR });
      P.write(c, '110 g · 200 cm³', X, 530, E.seg(t, sr + 1.4, sr + 2.4), { size: 42 });
      P.write(c, '110 ÷ 200 = 0,55 → yüzer', X, 600, E.seg(t, sr + 2.4, sr + 3.6), { size: 42, color: PAL.life });
      // arkadaşların modelleri
      const km = E.se(t, sr + 4.6, sr + 5.4, 'out');
      if (km > 0) {
        c.save(); c.globalAlpha *= km;
        F.card(c, X - 10, 650, 1860, 830, { seed: 2062 });
        F.txt(c, 'arkadaşlarımın modelleri', X + 290, 695, { size: 32, align: 'center', alpha: 0.8 });
        [0, 1, 2].forEach(i => { F.clayBoat(c, X + 90 + i * 200, 790, 120 + i * 20, 40 - i * 4); });
        c.restore();
      }
    });
  }
  E.scene({
    name: 'Tekne modeli', concept: 'Yoğunluk modeli: tekne tasarımı', from: 'boatq', to: 'revise', trFrom: [960, 540],
    draw(ctx, t) {
      F.desk(ctx, 860, 6);
      const aT = E.se(t, E.s('clay') - 0.4, E.s('clay') + 0.4);
      if (aT < 1) E.layer(ctx, 1 - aT, c => question(c, t));
      if (aT > 0) E.layer(ctx, aT, c => { tank(c, t); panel(c, t); });
      if (aT > 0) INK.label(ctx, 'hamur tekne modeli', 730, 240, { size: 40, align: 'center', weight: 700, alpha: aT * 0.85 });
    }
  });
})();

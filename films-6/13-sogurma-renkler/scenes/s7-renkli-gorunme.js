// SAHNE 7 — Cisimlerin renkli, beyaz ve siyah görünmesi (FB.6.4.6 a; TYMM: beyaz cisim güneş ışığında ve kırmızı ışık altında)
// Renk filtrelerine girilmez: renkli ışık KAYNAĞI (renkli fener) kullanılır.
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  function panel(ctx, x, y, w, h, title, seed) {
    F.card(ctx, x, y, w, h, { seed });
    INK.label(ctx, title, x + 36, y + 62, { size: 42, weight: 700 });
  }
  // one column of the reflection diagram
  function column(ctx, t, x, t0, kind) {
    const oy = 650;
    const a = E.se(t, t0, t0 + 0.6); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    if (kind === 'apple') F.apple(ctx, x, oy + 70, 80, F.OBJ.red, 1);
    else F.cloth(ctx, x, oy + 60, 230, 110, kind === 'white' ? F.OBJ.white : F.OBJ.black, kind === 'white' ? 2 : 3);
    ctx.restore();
    const inK = E.se(t, t0 + 0.4, t0 + 1.6);
    F.bundle(ctx, [x - 250, 250], [x - 14, oy - 10], inK, { sp: 6, w: 2.6 });
    if (kind === 'apple' && t > t0 + 1.2) INK.label(ctx, 'beyaz ışık', x - 222, 345, { size: 34, weight: 700, align: 'right', color: '#8A4A10', alpha: E.se(t, t0 + 1.2, t0 + 1.8) });
    const outK = E.se(t, t0 + 1.8, t0 + 3.0);
    const refl = kind === 'apple' ? [0] : kind === 'white' ? [0, 1, 2, 3, 4, 5, 6] : [];
    if (refl.length) F.bundle(ctx, [x + 14, oy - 10], [x + 250, 250], outK, { sp: 6, w: 2.8, only: refl });
    // absorbed colours end at the surface with little dots
    const abs = [0, 1, 2, 3, 4, 5, 6].filter(i => !refl.includes(i));
    if (outK > 0) abs.forEach((i, j) => INK.inkDot(ctx, x - 14 - (i - 3) * 4, oy - 10 + (i - 3) * 4, 3.4 * outK, { color: '160,110,40' }));
    const lab = kind === 'apple' ? ['kırmızıyı yansıtır', 'ötekileri soğurur'] : kind === 'white' ? ['hepsini yansıtır', ''] : ['hepsini soğurur', ''];
    if (t > t0 + 3.0) {
      INK.label(ctx, lab[0], x, oy + 205, { size: 36, weight: 700, align: 'center', alpha: E.se(t, t0 + 3.0, t0 + 3.6), color: kind === 'black' ? F.HEAT : PAL.ink });
      if (lab[1]) INK.label(ctx, lab[1], x, oy + 250, { size: 36, weight: 700, align: 'center', alpha: E.se(t, t0 + 3.6, t0 + 4.2), color: F.HEAT });
    }
    INK.label(ctx, kind === 'apple' ? 'kırmızı elma' : kind === 'white' ? 'beyaz kumaş' : 'siyah kumaş', x, 190, { size: 40, weight: 700, align: 'center', alpha: a });
  }
  E.scene({
    name: 'Renkli görünme', concept: 'Yansıtma ve soğurma ile renk', from: 'shop', to: 'bw', trFrom: [960, 540],
    draw(ctx, t) {
      const sshop = E.s('shop'), sr = E.s('redlight'), sa = E.s('apple'), sb = E.s('bw');
      const p1 = 1 - E.se(t, sr - 0.2, sr + 0.6), p2 = Math.min(E.se(t, sr - 0.2, sr + 0.6), 1 - E.se(t, sa - 0.2, sa + 0.6)), p3 = E.se(t, sa - 0.2, sa + 0.6);
      // --- shop vs home ---
      if (p1 > 0) E.layer(ctx, p1, c => {
        [[240, 'mağazada', '210,225,240', '#5E8DB0', 661], [1000, 'evde', '240,190,110', '#557E7E', 662]].forEach(([x, name, glow, shirt, seed]) => {
          panel(c, x, 220, 680, 600, name, seed);
          F.glow(c, x + 340, 330, 330, 0.9, glow);
          const bulb = circlePts(x + 340, 330, 26, 26, 24); P.fillPts(c, bulb, `rgb(${glow})`, 0.9); stroke(c, bulb, { w: 2.4, closed: true, dry: false });
          line(c, [x + 340, 230], [x + 340, 304], { w: 2.4, dry: false });
          F.tshirt(c, x + 340, 600, 1.05, shirt, seed);
        });
        const qk = E.se(t, sshop + 2.5, sshop + 3.1, 'out');
        if (qk > 0) INK.label(c, '?', 960, 560, { size: 150 * P.pop(qk), weight: 700, align: 'center', color: '#8A4A10' });
        INK.label(c, 'aynı giysi, farklı ışık', 960, 890, { size: 38, weight: 700, align: 'center', alpha: E.se(t, sshop + 3.2, sshop + 3.8) });
      });
      // --- white ball: sunlight vs red light ---
      if (p2 > 0) E.layer(ctx, p2, c => {
        panel(c, 200, 200, 700, 640, 'güneş ışığında', 663);
        panel(c, 1020, 200, 700, 640, 'kırmızı ışık altında', 664);
        const k1 = E.se(t, sr + 0.6, sr + 1.6), k2 = E.se(t, sr + 4.2, sr + 5.4);
        P.sun(c, 330, 330, 45, t, { nrays: 12, cells: false, glow: false });
        [0, 1, 2].forEach(i => F.ray(c, [380 + i * 10, 360 + i * 20], [560 + i * 20, 540 + i * 30], k1, { w: 3, head: 12, seed: 670 + i }));
        F.ball(c, 620, 640, 95, F.OBJ.white, 1);
        F.lamp(c, 1180, 360, 0.7, 0.8, '#E24A38');
        [0, 1, 2].forEach(i => F.ray(c, [1220 + i * 12, 400 + i * 16], [1400 + i * 20, 550 + i * 30], k2, { w: 3, head: 12, color: '#D0402F', seed: 680 + i }));
        F.ball(c, 1440, 640, 95, k2 > 0.5 ? '#D24A3C' : F.OBJ.white, 2);
        if (k2 > 0.5) F.glow(c, 1440, 640, 200, 0.6 * (k2 - 0.5) * 2, '226,74,56');
        INK.label(c, 'beyaz top', 620, 785, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sr + 1.8, sr + 2.4) });
        INK.label(c, '→ beyaz görünür', 620, 830, { size: 38, weight: 700, align: 'center', alpha: E.se(t, sr + 2.4, sr + 3.0) });
        INK.label(c, 'aynı top', 1440, 785, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sr + 5.2, sr + 5.8) });
        INK.label(c, '→ kırmızı görünür!', 1440, 830, { size: 38, weight: 700, align: 'center', alpha: E.se(t, sr + 6.2, sr + 6.8), color: '#B03A2C' });
      });
      // --- reflection & absorption: apple, white cloth, black cloth ---
      if (p3 > 0) E.layer(ctx, p3, c => {
        column(c, t, 420, sa + 0.2, 'apple');
        if (t > sa + 3.4) { P.icon.eye(c, 700, 250, 0.45, 0); INK.label(c, 'göz', 700, 320, { size: 30, weight: 700, align: 'center', alpha: E.se(t, sa + 3.4, sa + 4) }); }
        column(c, t, 1000, sb + 0.2, 'white');
        column(c, t, 1560, sb + 2.2, 'black');
      });
    }
  });
})();

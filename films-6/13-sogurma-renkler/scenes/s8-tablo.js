// SAHNE 8 — Veri tablosu, açıklama ve bilim tarihi (FB.6.4.6 b: veri toplar ve kaydeder; c: verileri açıklar; D19.2)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F613;
  const O = F613.OBJ;
  // görünen renk: [renk kodu, yazı]
  const LOOK = { w: [O.white, 'beyaz'], r: ['#C8453A', 'kırmızı'], g: ['#5E9A45', 'yeşil'], k: [O.black, 'siyah'] };
  const ROWS = [
    { name: 'beyaz top', draw: (c, x, y, col) => F.ball(c, x, y, 34, col, 3), cells: ['w', 'r', 'g'] },
    { name: 'kırmızı elma', draw: (c, x, y, col) => F.apple(c, x, y + 6, 32, col, 4), cells: ['r', 'r', 'k'] },
    { name: 'yeşil yaprak', draw: (c, x, y, col) => F.leaf(c, x, y, 0.5, col, 5), cells: ['g', 'k', 'g'] },
    { name: 'siyah kumaş', draw: (c, x, y, col) => F.cloth(c, x, y, 90, 50, col, 6), cells: ['k', 'k', 'k'] }
  ];
  const COLS = [['beyaz ışık', '#FFF8E4'], ['kırmızı ışık', '#F3C9BF'], ['yeşil ışık', '#CFE5C4']];
  const X0 = 180, CW = [330, 360, 360, 360], Y0 = 200, HH = 96, RH = 120;
  const cx = i => X0 + CW.slice(0, i).reduce((a, b) => a + b, 0);
  E.scene({
    name: 'Veri tablosu', concept: 'Beyaz ve renkli ışık altında cisimler', from: 'table', to: 'scholars', trFrom: [900, 500],
    draw(ctx, t) {
      const st = E.s('table'), sl = E.s('leaf'), se = E.s('explain'), sc = E.s('scholars');
      const W = CW.reduce((a, b) => a + b, 0), H = HH + RH * 4;
      const tabA = 1 - E.se(t, sc - 0.3, sc + 0.5);
      if (tabA > 0) E.layer(ctx, tabA, c => {
        F.card(c, X0 - 20, Y0 - 20, W + 40, H + 40, { seed: 690 });
        // header tints
        COLS.forEach(([n, tint], j) => { const x = cx(j + 1); P.fillPts(c, [[x, Y0], [x + CW[j + 1], Y0], [x + CW[j + 1], Y0 + HH], [x, Y0 + HH]], tint, 0.9); INK.label(c, n, x + CW[j + 1] / 2, Y0 + 64, { size: 38, weight: 700, align: 'center' }); });
        INK.label(c, 'cisim', X0 + CW[0] / 2, Y0 + 64, { size: 38, weight: 700, align: 'center' });
        for (let j = 1; j < 4; j++) line(c, [cx(j), Y0], [cx(j), Y0 + H], { w: 2, dry: false, alpha: 0.7, seed: 700 + j });
        for (let i = 0; i <= 4; i++) line(c, [X0, Y0 + HH + i * RH], [X0 + W, Y0 + HH + i * RH], { w: i === 0 ? 2.8 : 1.6, dry: false, alpha: i === 0 ? 1 : 0.5, seed: 710 + i });
        ROWS.forEach((r, i) => {
          const y = Y0 + HH + i * RH + RH / 2;
          const k0 = E.se(t, st + 0.2 + i * 0.4, st + 0.7 + i * 0.4); if (k0 <= 0) return;
          c.save(); c.globalAlpha *= k0; INK.label(c, r.name, X0 + CW[0] / 2, y + 14, { size: 38, weight: 700, align: 'center' }); c.restore();
          r.cells.forEach((code, j) => {
            const at = st + 2.2 + j * 2.4 + i * 0.5, k = E.se(t, at, at + 0.5); if (k <= 0) return;
            const x = cx(j + 1) + 90;
            c.save(); c.globalAlpha *= k; r.draw(c, x, y, LOOK[code][0]); c.restore();
            P.write(c, LOOK[code][1], x + 80, y + 14, k, { size: 38, color: code === 'k' ? PAL.ink : PAL.ink });
          });
        });
        // highlight: green leaf under red light → black
        const hk = E.se(t, sl + 0.4, sl + 1.2);
        if (hk > 0) { const x = cx(2) + CW[2] / 2, y = Y0 + HH + 2 * RH + RH / 2; P.drawOn(c, INK.wobble(circlePts(x, y, 170, 58, 60), 2, 720), hk, { w: 4, color: '#8A4A10' }); }
        const nk = Math.min(E.se(t, sl + 2.0, sl + 2.6), 1 - E.se(t, se, se + 0.5));
        if (nk > 0) E.layer(c, nk, c2 => {
          const tx = 'Kırmızı ışıkta yeşil ışık yok → yaprak yansıtacak ışık bulamaz → siyah görünür';
          P.write(c2, tx, X0 + W / 2, 865, E.seg(t, sl + 2.0, sl + 4.4), { size: F.fit(c2, tx, W, 40), align: 'center', color: '#8A4A10' });
        });
        // rule
        const rk = E.se(t, se + 0.3, se + 1.1);
        if (rk > 0) {
          c.save(); c.globalAlpha *= rk;
          const b = [[X0 - 20, 800], [X0 + W + 20, 794], [X0 + W + 24, 890], [X0 - 16, 896], [X0 - 20, 800]]; P.fillPts(c, b, '#F6E7B8', 0.95); stroke(c, b, { w: 3, closed: true, color: F.AMB, seed: 725 });
          c.restore();
          P.write(c, 'Cismin rengi = üzerine düşen ışık + yansıttığı renkler', X0 + W / 2, 860, E.seg(t, se + 0.6, se + 2.4), { size: F.fit(c, 'Cismin rengi = üzerine düşen ışık + yansıttığı renkler', W - 40, 46), align: 'center' });
        }
      });
      // Damla at the right edge
      if (tabA > 0) E.layer(ctx, tabA, c => DAMLA.draw(c, { x: 1780, y: 1000, s: 0.85, view: 'q3', flip: true, expr: t > sl ? 'thinking' : 'curious', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, talk: E.talk(t), seed: 5, arms: t < sl ? [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] : [[-1, 0.3], [1, [30, -86]]], prop: t < sl ? 'notebook' : null }));
      // scholars
      const sk = E.se(t, sc - 0.1, sc + 0.7);
      if (sk > 0) E.layer(ctx, sk, c => {
        P.write(c, 'Işık ve renk üzerine çalışan bilim insanlarımız', 960, 260, E.seg(t, sc + 0.2, sc + 1.6), { size: 50, align: 'center' });
        [[560, 'İbnülheysem', '10.–11. yüzyıl', 'ışığı ve görmeyi', 'deneylerle inceledi', 741], [1360, 'Ali Kuşçu', '15. yüzyıl', 'ışık ile renk', 'ilişkisini yorumladı', 742]].forEach(([x, n, era, l1, l2, seed], i) => {
          const k = E.se(t, sc + 1.0 + i * 1.2, sc + 1.7 + i * 1.2, 'out'); if (k <= 0) return;
          c.save(); c.translate(x, 560); c.scale(P.pop(k), P.pop(k)); c.translate(-x, -560);
          F.card(c, x - 330, 340, 660, 440, { seed });
          P.icon.books(c, x - 200, 520, 0.9);
          INK.label(c, n, x + 60, 470, { size: 56, weight: 700, align: 'center' });
          INK.label(c, era, x + 60, 530, { size: 34, align: 'center', alpha: 0.7 });
          INK.label(c, l1, x + 60, 630, { size: 38, weight: 700, align: 'center' });
          INK.label(c, l2, x + 60, 680, { size: 38, weight: 700, align: 'center' });
          c.restore();
        });
        INK.label(c, 'Türk-İslam bilim insanları', 960, 860, { size: 40, weight: 700, align: 'center', alpha: E.se(t, sc + 3.4, sc + 4), color: '#8A4A10' });
      });
    }
  });
})();

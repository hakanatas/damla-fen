// SAHNE 6 — Diğer faktörler: karbondioksit, sıcaklık, su, ışık rengi → önerme (FB.8.7.2 a, b, d)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const U = U7;
  const panel = (c, x, title, k, seed, col) => { U.card(c, x, 180, 540, 600, seed, { tint: col, tintA: 0.08 }); P.write(c, title, x + 270, 250, k, { size: 48, align: 'center', color: col === PAL.water ? '#1F4A63' : PAL.ink }); };
  E.scene({
    name: 'Diğer faktörler', concept: 'CO₂, sıcaklık, su, ışık rengi; önerme', from: 'co2', to: 'prop', trFrom: [960, 540],
    draw(ctx, t) {
      const s1 = E.s('co2'), s2 = E.s('temp'), s3 = E.s('color'), sp = E.s('prop');
      const kAll = 1 - E.se(t, sp - 0.2, sp + 0.6);
      if (kAll > 0) E.layer(ctx, kAll, c => {
        // 1 — karbondioksit
        const k1 = E.se(t, s1, s1 + 0.7, 'out');
        if (k1 > 0) E.layer(c, k1, cc => {
          panel(cc, 110, 'karbondioksit', E.seg(t, s1 + 0.2, s1 + 1.2), 6001, '#6E6A64');
          const wy = U.beaker(cc, 270, 340, 220, 320, 0.9);
          U.elodea(cc, 380, 470, 170, 2, t);
          const add = s1 + 1.6;
          U.bubbles(cc, 380, 466, wy + 6, t, s1, t < add + 1.2 ? 0.8 : 0, { speed: 110 });
          U.bubbles(cc, 380, 466, wy + 6, t, add + 1.2, 2.6, { speed: 110 });
          // kaşıkla karbonat
          const ks = E.se(t, add - 0.6, add) * (1 - E.se(t, add + 1.4, add + 2.0));
          if (ks > 0) { cc.save(); cc.globalAlpha *= ks; line(cc, [560, 300], [470, 350], { w: 5, color: '#9A9387', dry: false }); P.fillPts(cc, circlePts(460, 356, 20, 10, 16, -0.4), '#F4F1E8'); stroke(cc, circlePts(460, 356, 20, 10, 16, -0.4), { w: 2, closed: true, dry: false });
            for (let j = 0; j < 8; j++) { const u = ((t - add) * 1.4 + j / 8) % 1; if (t > add) INK.inkDot(cc, 452 + Math.sin(j * 3) * 6, 366 + u * 60, 2, { color: '154,147,135', alpha: 0.7 }); } cc.restore(); }
          P.write(cc, 'karbonat', 480, 400, E.seg(t, add - 0.4, add + 0.4), { size: 34, color: '#6E6A64' });
          U.rich(cc, 'suda CO_2 artar → hız artar', 380, 715, E.seg(t, add + 1.6, add + 3.0), { size: 38, align: 'center' });
          INK.label(cc, '(bir sınıra kadar)', 380, 760, { size: 28, align: 'center', alpha: 0.65 * E.se(t, add + 2.8, add + 3.4) });
        });
        // 2 — sıcaklık ve su
        const k2 = E.se(t, s2, s2 + 0.7, 'out');
        if (k2 > 0) E.layer(c, k2, cc => {
          panel(cc, 690, 'sıcaklık · su', E.seg(t, s2 + 0.2, s2 + 1.2), 6002, U.HEAT);
          const X = 750, Y = 540, W = 420, H = 220;
          line(cc, [X, Y], [X + W, Y], { w: 2.6, dry: false }); line(cc, [X, Y], [X, Y - H - 10], { w: 2.6, dry: false });
          INK.label(cc, 'hız', X + 8, Y - H - 16, { size: 28, alpha: 0.8 }); INK.label(cc, 'sıcaklık →', X + W - 120, Y + 36, { size: 28, alpha: 0.8 });
          const pts = []; for (let i = 0; i <= 50; i++) { const u = i / 50; pts.push([X + 10 + u * (W - 20), Y - H * 0.9 * Math.exp(-Math.pow((u - 0.52) / 0.2, 2))]); }
          P.drawOn(cc, pts, E.se(t, s2 + 0.6, s2 + 2.4), { w: 4, color: U.HEAT });
          const kt = E.se(t, s2 + 2.2, s2 + 2.8);
          if (kt > 0) { cc.save(); cc.globalAlpha *= kt; U.fit(cc, 'soğuk', X + 40, Y + 70, 120, 30, { color: PAL.water }); U.fit(cc, 'uygun', X + W * 0.52, Y + 70, 120, 30, { color: U.LIFE_D }); U.fit(cc, 'sıcak', X + W - 40, Y + 70, 120, 30, { color: U.HEAT }); cc.restore(); }
          const kw = E.se(t, s2 + 3.4, s2 + 4.0);
          if (kw > 0) { cc.save(); cc.globalAlpha *= kw; U.potPlant(cc, 800, 700, 0.3, t, { wilt: 1, h: 150 }); cc.restore(); U.drop(cc, 870, 690, 14, { alpha: kw * 0.6 }); P.cross(cc, 870, 690, 16, kw, { w: 3 }); U.wfit(cc, 'su azalınca hız azalır', 900, 720, E.seg(t, s2 + 3.6, s2 + 4.8), 32, 310); }
        });
        // 3 — ışık rengi
        const k3 = E.se(t, s3, s3 + 0.7, 'out');
        if (k3 > 0) E.layer(c, k3, cc => {
          panel(cc, 1270, 'ışık rengi', E.seg(t, s3 + 0.2, s3 + 1.2), 6003, U.AMB);
          const Y = 560, H = 250;
          line(cc, [1320, Y], [1770, Y], { w: 2.6, dry: false });
          [['kırmızı', '#C4624A', 0.9], ['yeşil', '#6F9A4A', 0.35], ['mavi', '#3F6FB0', 0.8]].forEach(([nm, col, v], i) => {
            const k = E.se(t, s3 + 0.8 + i * 0.6, s3 + 1.6 + i * 0.6, 'out'); const h = H * v * k, bx = 1340 + i * 145;
            if (h > 2) U.shape(cc, [[bx, Y], [bx + 110, Y], [bx + 110, Y - h], [bx, Y - h]], col, 0.7, 6010 + i, { w: 2.2 });
            U.fit(cc, nm, bx + 55, Y + 40, 140, 32, { alpha: E.clamp(k * 2) });
          });
          INK.label(cc, 'hız', 1300, Y - H - 20, { size: 28, alpha: 0.8 * k3 });
          P.write(cc, 'yeşil ışıkta daha yavaş:', 1540, 670, E.seg(t, s3 + 3.0, s3 + 4.2), { size: 34, align: 'center' });
          P.write(cc, 'yaprak yeşil ışığın çoğunu yansıtır', 1540, 715, E.seg(t, s3 + 4.0, s3 + 5.4), { size: 30, align: 'center', color: U.LIFE_D });
        });
      });
      // önerme
      const kp = E.se(t, sp - 0.1, sp + 0.7);
      if (kp > 0) E.layer(ctx, kp, c => {
        c.fillStyle = 'rgba(138,106,69,0.14)'; c.fillRect(0, 0, E.W, E.H);
        P.notebook(c, 190, 170, 1540, 720);
        P.write(c, 'Önerme', 320, 280, E.seg(t, sp + 0.3, sp + 1.1), { size: 70, color: U.LIFE_D });
        P.drawOn(c, P.bez([316, 300], [460, 308], [600, 296], 20), E.se(t, sp + 1.0, sp + 1.5), { w: 3, color: U.LIFE });
        P.write(c, 'Fotosentez hızını etkileyen faktörler:', 320, 390, E.seg(t, sp + 1.2, sp + 2.6), { size: 50 });
        P.write(c, 'ışık şiddeti · ışık rengi · karbondioksit miktarı', 360, 480, E.seg(t, sp + 2.4, sp + 4.0), { size: 48, color: '#8A5A12' });
        P.write(c, 'sıcaklık · su', 360, 560, E.seg(t, sp + 3.8, sp + 4.6), { size: 48, color: '#8A5A12' });
        P.write(c, 'Işık şiddeti arttıkça hız artar;', 320, 670, E.seg(t, sp + 4.6, sp + 5.8), { size: 46 });
        P.write(c, 'bir noktadan sonra artık artmaz.', 320, 740, E.seg(t, sp + 5.6, sp + 6.8), { size: 46 });
        U.damla(c, t, { x: 1640, y: 925, s: 0.85, flip: true, expr: 'happy', look: [-0.7, 0.2], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
      });
    }
  });
})();

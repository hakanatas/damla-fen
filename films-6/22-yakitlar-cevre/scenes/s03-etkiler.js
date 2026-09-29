// SAHNE 3 — Yakıt kullanımının çevre ve insan sağlığı üzerine etkileri (FB.6.7.3 a)
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F622;
  E.scene({
    name: 'Etkiler', concept: 'Yakıtların çevre ve sağlık üzerine etkileri', from: 'burn', to: 'health', trFrom: [960, 540],
    draw(ctx, t) {
      const sb = E.s('burn'), sh = E.s('health');
      ctx.fillStyle = 'rgba(46,70,110,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const bA = 1 - E.se(t, sh - 0.2, sh + 0.5);
      if (bA > 0) E.layer(ctx, bA, c => {
        // oda (kesit)
        const room = [[640, 330], [1180, 330], [1180, 860], [640, 860], [640, 330]];
        P.fillPts(c, room, '#F6EBD6'); wash(c, room, PAL.light, 0.14, 71, { bleed: 2, blooms: 1 }); stroke(c, room, { w: 4, closed: true, seed: 72 });
        F.stove(c, 820, 850, 1.05, t, { pipe: [[0, -210], [0, -420], [380, -420]] });
        // dışarı: baca
        line(c, [1180, 409], [1260, 409], { w: 23, color: '#5A5862', taper: 0, dry: false });
        const ch = [[1240, 440], [1240, 230], [1290, 230], [1290, 440]]; P.fillPts(c, ch.concat([ch[0]]), '#E6DCC6'); stroke(c, ch, { w: 2.6, seed: 73 });
        // ısı okları
        const hk = E.se(t, sb + 0.6, sb + 1.6);
        for (let i = 0; i < 4; i++) { const a = -0.5 + i * 0.35; const x0 = 900, y0 = 720 + i * 10; if (hk > 0) P.arrow(c, [x0, y0], [x0 + Math.cos(a) * 180, y0 + Math.sin(a) * 80], hk, { w: 3, color: '#C07F1E', head: 12, bend: 10 }); }
        if (hk > 0.9) F.fit(c, 'ısı', 1100, 640, 120, 44, { color: '#C07F1E' });
        // duman
        const sk = E.se(t, sb + 2.2, sb + 3.2);
        if (sk > 0) {
          c.save(); c.globalAlpha *= sk; F.smoke(c, 1265, 225, t, { n: 7, s: 1.6, a: 0.7, drift: 120 }); c.restore();
          c.save(); c.globalAlpha *= E.se(t, sb + 3.2, sb + 4.0);
          F.fit(c, 'duman · is · gazlar', 1560, 220, 480, 44, { color: '#4A4852' });
          c.restore();
        }
        // kış havası kirlenir
        const pk = E.se(t, sb + 5.4, sb + 6.6);
        if (pk > 0) {
          c.save(); c.globalAlpha *= pk;
          [[1380, 0.55], [1540, 0.65], [1700, 0.55]].forEach(([x, s], i) => F.house(c, x, 860, s, t + i, { seed: i, smokeA: 0.7, col: '#8A6A45' }));
          const hz = c.createLinearGradient(0, 380, 0, 860); hz.addColorStop(0, 'rgba(111,107,102,0.05)'); hz.addColorStop(1, 'rgba(111,107,102,0.45)'); c.fillStyle = hz; c.fillRect(1310, 380, 540, 480);
          line(c, [1310, 860], [1860, 860], { w: 3 });
          F.fit(c, 'Kışın hava kirlenir.', 1585, 330, 520, 46, { color: F.HEAT });
          c.restore();
        }
      });
      // sağlık
      const hA = E.se(t, sh, sh + 0.6);
      if (hA > 0) E.layer(ctx, hA, c => {
        const dk = E.se(t, sh + 0.8, sh + 3.0);
        F.lungs(c, 1000, 520, 2.0, dk);
        for (let i = 0; i < 6; i++) { const k = ((t * 0.3 + i / 6) % 1); c.save(); c.globalAlpha *= Math.sin(k * Math.PI) * 0.5 * dk; P.fillPts(c, circlePts(1000 + Math.sin(i * 2.1) * 30, 280 - k * 80 + 60, 12, 9, 14), F.SMOKE, 0.7); c.restore(); }
        F.card(c, 1260, 330, 560, 360, 81, { tint: F.HEAT, tintA: 0.1 });
        P.write(c, 'Kirli hava', 1540, 410, E.seg(t, sh + 0.6, sh + 1.4), { size: 52, align: 'center', color: F.HEAT });
        P.write(c, 'solunum yolu', 1540, 490, E.seg(t, sh + 1.4, sh + 2.4), { size: 44, align: 'center' });
        P.write(c, 'hastalıklarını artırabilir.', 1540, 545, E.seg(t, sh + 2.2, sh + 3.2), { size: 44, align: 'center' });
        P.write(c, 'çocuklar · yaşlılar', 1540, 640, E.seg(t, sh + 3.6, sh + 4.6), { size: 40, align: 'center', color: '#8A4A10' });
        F.fit(c, '(şematik çizim)', 1000, 760, 300, 28, { weight: 400, alpha: 0.6 });
      });
      F.damla(ctx, t, { x: 330, y: 890, expr: t > sh ? 'sad' : 'curious', view: 'q3', arms: [[-1, 0.4], [1, 2.0]], look: [0.8, -0.4] });
    }
  });
})();

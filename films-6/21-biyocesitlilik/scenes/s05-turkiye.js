// SAHNE 6 — Türkiye: endemik türler (D19.3) ve Kanuni Sultan Süleyman'ın 1539 Edirne kanunu
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F621;
  E.scene({
    name: 'Türkiye', concept: 'Endemik türler; doğayı koruma geleneği', from: 'endemic', to: 'kanuni', trFrom: [960, 540],
    draw(ctx, t) {
      const se = E.s('endemic'), sk = E.s('kanuni');
      ctx.fillStyle = 'rgba(111,138,58,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
      const eA = 1 - E.se(t, sk - 0.2, sk + 0.5);
      if (eA > 0) E.layer(ctx, eA, c => {
        F.card(c, 760, 150, 1060, 150, 61, { tint: PAL.life, tintA: 0.16 });
        P.write(c, 'Endemik tür', 1290, 210, E.seg(t, se + 0.3, se + 1.1), { size: 54, align: 'center', color: '#2F4A1E' });
        P.write(c, 'yalnızca belli bir bölgede doğal olarak yaşar', 1290, 268, E.seg(t, se + 1.0, se + 2.4), { size: 38, align: 'center', weight: 400 });
        const S = [
          ['inci kefali', 'Van Gölü havzası', (cc) => { F.mullet(cc, -30, 0, 2.0, 1); F.mullet(cc, 60, 40, 1.3, 1); const w = []; for (let i = 0; i <= 30; i++) w.push([-150 + i * 10, 70 + Math.sin(i * 0.8 + t * 2) * 4]); stroke(cc, w, { w: 2, color: PAL.water, dry: false }); }],
          ['kasnak meşesi', 'Isparta', (cc) => F.oak(cc, -20, 100, 0.9, t)]
        ];
        S.forEach(([name, place, draw], i) => {
          const at = se + 2.6 + i * 1.4, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const x = 1010 + i * 540, y = 570;
          c.save(); c.translate(x, y); c.scale(P.pop(k), P.pop(k)); c.translate(-x, -y);
          F.card(c, x - 230, y - 200, 460, 400, 70 + i, { tint: i ? PAL.life : PAL.water, tintA: 0.1 });
          c.save(); c.translate(x, y - 50); draw(c); c.restore();
          F.fit(c, name, x, y + 120, 420, 46, { color: '#2F4A1E' });
          F.fit(c, place, x, y + 170, 420, 34, { weight: 400 });
          c.restore();
        });
        const bk = E.se(t, se + 5.4, se + 6.2, 'out');
        if (bk > 0) { c.save(); c.globalAlpha *= bk; F.fit(c, 'Türkiye’de binlerce endemik bitki türü var.', 1280, 850, 1000, 42, { color: '#2F4A1E' }); c.restore(); }
      });
      // Kanuni — ferman
      const kA = E.se(t, sk, sk + 0.6);
      if (kA > 0) E.layer(ctx, kA, c => {
        const open = E.se(t, sk + 0.2, sk + 1.4);
        const x0 = 1260, hw = 520 * open, y0 = 170, y1 = 800;
        const sc = [[x0 - hw, y0], [x0 + hw, y0 + 6], [x0 + hw + 4, y1], [x0 - hw + 2, y1 + 4], [x0 - hw, y0]];
        c.save(); c.shadowColor = 'rgba(60,40,20,0.25)'; c.shadowBlur = 22; P.fillPts(c, sc, '#F3E6C8'); c.restore();
        wash(c, sc, '#C9A46A', 0.25, 81, { bleed: 2, blooms: 2 }); stroke(c, sc, { w: 2.6, closed: true, seed: 82, color: '#6B4A22' });
        [x0 - hw, x0 + hw].forEach((rx, i) => { const r = F.rr(rx - 18, y0 - 20, 36, y1 - y0 + 44, 16); P.fillPts(c, r, '#D8C096'); stroke(c, r, { w: 2.6, closed: true, seed: 83 + i, color: '#6B4A22' }); });
        if (open > 0.9) {
          P.write(c, '1539 · Edirne', x0, 280, E.seg(t, sk + 1.4, sk + 2.2), { size: 72, align: 'center', color: '#6B4A22', font: 'Fraunces', weight: 600 });
          P.write(c, 'Kanuni Sultan Süleyman', x0, 380, E.seg(t, sk + 2.0, sk + 3.0), { size: 50, align: 'center' });
          P.write(c, 'çevreyi korumaya yönelik kanun', x0, 450, E.seg(t, sk + 2.8, sk + 4.0), { size: 44, align: 'center', weight: 400 });
          // süs: yaprak dalı
          const bk = E.se(t, sk + 3.6, sk + 4.6);
          if (bk > 0) { const br = P.bez([x0 - 200, 560], [x0, 520], [x0 + 200, 560], 30); P.drawOn(c, br, bk, { w: 3, color: '#4E6B2A' }); for (let i = 1; i < 8; i++) if (bk > i / 8) { const p = br[i * 4]; P.fillPts(c, circlePts(p[0], p[1] - 14, 7, 14, 12, 0.4 * (i % 2 ? 1 : -1)), PAL.life, 0.8); } }
          P.write(c, 'Dünyanın ilk çevre koruma kanunu', x0, 660, E.seg(t, sk + 4.2, sk + 5.4), { size: 42, align: 'center', color: '#2F4A1E' });
          P.write(c, 'olarak anılır.', x0, 715, E.seg(t, sk + 5.0, sk + 5.8), { size: 42, align: 'center', color: '#2F4A1E' });
        }
      });
      DAMLA.draw(ctx, { x: 330, y: 890, s: 1.4, view: 'q3', expr: t > sk ? 'curious' : 'happy', look: [0.8, -0.4], blink: E.blink(t, 8), squash: E.breath(t), t, talk: E.talk(t), seed: 5, arms: [[-1, 0.4], [1, 2.1]] });
    }
  });
})();

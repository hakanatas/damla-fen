// SAHNE 2 — Sınıflandırma (OB4): görseller "hareketinden" ve "konumundan / durumundan" dolayı enerji olarak ayrılır
(function () {
  const { PAL, line, stroke } = INK;
  const F = F7E, A = F75;
  const CW = 290, CH = 220;
  const START = [[470, 420], [960, 420], [1450, 420], [470, 690], [960, 690], [1450, 690]];
  const TARGET = [[470, 420], [1080, 420], [470, 690], [1400, 420], [1080, 690], [1400, 690]];
  const NAMES = ['yuvarlanan top', 'daldaki elma', 'giden bisiklet', 'raftaki saksı', 'gerilmiş ok yayı', 'sıkışmış yay'];
  function art(ctx, i, t, x, y) {
    const gy = y + 70;
    if (i === 0) { const bx = x - 30 + 40 * Math.sin(t * 1.2); line(ctx, [x - 120, gy], [x + 120, gy], { w: 2.4, dry: false }); F.ball(ctx, bx, gy - 36, 36, F.KE, 5200, { stripe: true }); A.motion(ctx, bx - 50, gy - 36, 3, 44, 0.5); }
    if (i === 1) { stroke(ctx, P.bez([x - 120, y - 60], [x - 20, y - 50], [x + 90, y - 80], 20), { w: 7, color: '#6B5236', seed: 5210 }); const lf = INK.circlePts(x + 40, y - 80, 22, 12, 16, -0.4); INK.wash(ctx, lf, PAL.life, 0.6, 5211, { bleed: 1 }); stroke(ctx, lf, { w: 2, closed: true, seed: 5212 }); line(ctx, [x - 10, y - 54], [x - 10, y - 30], { w: 2, dry: false }); A.apple(ctx, x - 10, y - 6, 24, 5213); line(ctx, [x - 120, gy], [x + 120, gy], { w: 2.4, dry: false, alpha: 0.6 }); }
    if (i === 2) { line(ctx, [x - 120, gy], [x + 120, gy], { w: 2.4, dry: false }); A.bike(ctx, x + 10, gy, 0.9, t); A.motion(ctx, x - 90, gy - 60, 3, 36, 0.5); }
    if (i === 3) { F.shelf(ctx, x - 90, x + 90, y + 10, 5220); A.pot(ctx, x, y + 10, 0.8); line(ctx, [x - 120, gy], [x + 120, gy], { w: 2.4, dry: false, alpha: 0.6 }); }
    if (i === 4) A.bow(ctx, x + 10, y, 0.85, 1);
    if (i === 5) { line(ctx, [x - 100, gy], [x + 100, gy], { w: 2.4, dry: false }); F.vspring(ctx, x, gy, gy - 50, { coils: 8, r: 30 }); const pl = F.rect(x - 50, gy - 66, x + 50, gy - 50); P.fillPts(ctx, pl, '#8A6A45', 0.6); stroke(ctx, pl, { w: 2, closed: true }); F.vec(ctx, [x, gy - 150], [x, gy - 72], 1, { w: 5, head: 16 }); }
  }
  E.scene({
    name: 'Sınıflandırma', concept: 'Hareketinden ya da konumundan dolayı enerji', from: 'classify', to: 'sort', trFrom: [960, 540],
    draw(ctx, t) {
      const sc = E.s('classify'), ss = E.s('sort');
      const hk = E.se(t, ss + 0.2, ss + 1.0);
      if (hk > 0) E.layer(ctx, hk, c => {
        F.txt(c, 'Hareketinden dolayı', 470, 250, { size: 50, align: 'center', color: '#9A6412' });
        P.drawOn(c, P.bez([290, 272], [470, 280], [650, 268], 20), 1, { w: 3, color: F.KE });
        F.txt(c, 'Konumundan / durumundan dolayı', 1240, 250, { size: 50, align: 'center', color: F.PE });
        P.drawOn(c, P.bez([940, 272], [1240, 280], [1540, 268], 20), 1, { w: 3, color: F.PE });
        stroke(c, [[775, 230], [772, 850]], { w: 2, alpha: 0.5, seed: 5230 });
      });
      const order = [0, 2, 1, 3, 4, 5];
      NAMES.forEach((nm, i) => {
        const k = E.se(t, sc + 0.4 + i * 0.35, sc + 1.1 + i * 0.35, 'out'); if (k <= 0) return;
        const oi = order.indexOf(i), mv = E.se(t, ss + 1.2 + oi * 1.2, ss + 2.2 + oi * 1.2);
        const [x, y] = E.mix(START[i], TARGET[i], mv);
        E.layer(ctx, k, c => {
          F.card(c, x - CW / 2, y - CH / 2, x + CW / 2, y + CH / 2, { seed: 5240 + i, color: mv > 0.98 ? (i === 0 || i === 2 ? '#9A6412' : F.PE) : undefined });
          c.save(); c.beginPath(); c.rect(x - CW / 2, y - CH / 2, CW, CH); c.clip(); art(c, i, t, x, y - 10); c.restore();
          F.txt(c, nm, x, y + CH / 2 - 14, { size: 30, align: 'center', alpha: 0.85 });
        });
      });
      DAMLA.draw(ctx, { x: 1770, y: 900, s: 0.85, view: 'q3', flip: true, expr: t > ss + 8 ? 'happy' : 'curious', look: [-0.8, 0], blink: E.blink(t, 3), squash: E.breath(t), t, seed: 1, arms: [[-1, [-90, -130]], [1, 0.4]] });
    }
  });
})();

// SAHNE 2 — Beyin fırtınası → kuvvetin nitelikleri: büyüklük ve yön (FB.5.2.1 a; TYMM: açık uçlu sorular, beyin fırtınası)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const NODES = [
    ['itme', 480, 300, 0], ['çekme', 1330, 300, 0],
    ['hızlandırır, yavaşlatır', 470, 450, 0], ['yön değiştirir', 1360, 450, 0],
    ['ne kadar güçlü?', 540, 610, 1], ['şekil değiştirir', 1300, 610, 0],
    ['hangi yöne?', 920, 660, 2]
  ];
  E.scene({
    name: 'Beyin fırtınası', concept: 'Kuvvetin nitelikleri: büyüklük ve yön', from: 'brain', to: 'quality', trFrom: [960, 450],
    draw(ctx, t) {
      const sb = E.s('brain'), sq = E.s('quality');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 90, 1620, 820);
      P.write(ctx, 'Kuvvet deyince aklıma gelenler...', 290, 200, E.seg(t, sb + 0.4, sb + 2.0), { size: 56 });
      const cx = 920, cy = 450;
      // center node
      const ck = E.se(t, sb + 1.2, sb + 1.8, 'out');
      if (ck > 0) {
        const c = INK.wobble(circlePts(cx, cy, 120 * P.pop(ck), 70 * P.pop(ck), 50), 2, 2001);
        P.fillPts(ctx, c, '#F6E7B8'); stroke(ctx, c, { w: 3.4, closed: true, seed: 2002 });
        ctx.save(); ctx.globalAlpha = ck; ctx.font = '700 58px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText('KUVVET', cx, cy + 20); ctx.restore();
      }
      const dimK = E.se(t, sq + 1.0, sq + 2.0);
      NODES.forEach(([txt, x, y, q], i) => {
        const at = sb + 2.0 + i * 0.85, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const a = q ? 1 : 1 - 0.6 * dimK;
        ctx.save(); ctx.globalAlpha = a;
        // connector
        const ang = Math.atan2(y - cy, x - cx);
        const p0 = [cx + Math.cos(ang) * 128, cy + Math.sin(ang) * 76];
        ctx.font = '700 40px Kalam'; const w = ctx.measureText(txt).width + 50;
        const p1 = [x - Math.cos(ang) * (w / 2 + 4), y - Math.sin(ang) * 36];
        P.drawOn(ctx, [p0, p1], k, { w: 2.2, dry: false });
        ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
        const b = INK.wobble(circlePts(0, 0, w / 2, 40, 40), 1.5, 2010 + i);
        P.fillPts(ctx, b, q && dimK > 0 ? '#FBEFD3' : '#FBF8F1'); stroke(ctx, b, { w: 2.4, closed: true, seed: 2020 + i, color: q && dimK > 0 ? '#C07F1E' : PAL.ink });
        ctx.font = '700 40px Kalam'; ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(txt, 0, 13);
        ctx.restore();
      });
      // qualities
      const Q = [['BÜYÜKLÜK', 600, 810, 540, 610, 'az mı, çok mu?'], ['YÖN', 1320, 810, 920, 660, 'hangi yöne?']];
      Q.forEach(([txt, x, y, fx, fy, sub], i) => {
        const at = sq + 2.2 + i * 1.6, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        P.arrow(ctx, [fx + (i ? 90 : 0), fy + 45], [x - (i ? 150 : 0), y - 55], E.se(t, at - 0.3, at + 0.3), { w: 3, head: 14, color: '#C07F1E', bend: i ? -30 : 0 });
        ctx.save(); ctx.translate(x, y); ctx.scale(P.pop(k), P.pop(k));
        ctx.font = '700 60px Kalam'; const w = ctx.measureText(txt).width + 70;
        const r = [[-w / 2, -48], [w / 2, -52], [w / 2 + 4, 40], [-w / 2 + 2, 44], [-w / 2, -48]];
        P.fillPts(ctx, r, '#F6E7B8'); stroke(ctx, r, { w: 3.4, closed: true, seed: 2040 + i });
        ctx.textAlign = 'center'; ctx.fillStyle = PAL.ink; ctx.fillText(txt, 0, 18);
        ctx.restore();
      });
      if (t > sq + 5) P.write(ctx, 'kuvvetin nitelikleri', 960, 880, E.seg(t, sq + 5, sq + 6.2), { size: 40, align: 'center', color: '#8A4A10' });
      // Damla at the corner, writing then pointing
      const pk = E.se(t, sb + 0.2, sb + 1.0, 'out'), point = t > sq;
      DAMLA.draw(ctx, {
        x: 1700, y: 1060 + (1 - pk) * 300, s: 1.05, view: 'q3', flip: true, expr: point ? 'happy' : 'thinking', look: [-0.8, -0.4], blink: E.blink(t, 6), squash: E.breath(t), t, seed: 2,
        arms: point ? [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: point ? null : 'notebook'
      });
    }
  });
})();

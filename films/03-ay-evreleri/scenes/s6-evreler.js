// SAHNE 6 — Ay'ın evreleri: uzaydan (hep yarı aydınlık) ve Dünya'dan (değişen) görünüm; evre adları sırasıyla; büyürken sağ, küçülürken sol
(function () {
  const { PAL, line, stroke, circlePts, dashed, arrowHead } = INK;
  const AMB = '#C07F1E';
  const NAMES = ['Yeni Ay', 'Hilal', 'İlk Dördün', 'Şişkin Ay', 'Dolunay', 'Şişkin Ay', 'Son Dördün', 'Hilal'];
  const EX = 500, EY = 560, R = 240;
  function cardPos(i) { return [1000 + (i % 4) * 225, 400 + ((i / 4) | 0) * 320]; }
  E.scene({
    name: 'Evreler', concept: 'Ay\'ın evreleri: uzaydan ve Dünya\'dan görünüm', from: 'space', to: 'side', trFrom: [500, 560],
    draw(ctx, t) {
      const ss = E.s('space'), sn = E.s('names'), sd = E.s('side');
      ctx.save(); ctx.fillStyle = 'rgba(30,38,72,0.12)'; ctx.fillRect(0, 0, E.W, E.H); ctx.restore();
      // Güneş ışığı soldan
      for (let i = 0; i < 5; i++) { const y = EY - 280 + i * 140; ctx.save(); ctx.globalAlpha = 0.55; P.arrow(ctx, [20, y], [160, y], 1, { w: 3, color: AMB, bend: 0, head: 12 }); ctx.restore(); }
      INK.label(ctx, 'Güneş ışığı', 20, EY - 330, { size: 32, weight: 700, color: '#8A4A10' });
      ctx.save(); ctx.globalAlpha = 0.6; dashed(ctx, circlePts(EX, EY, R, R, 120), { w: 2.2, on: 12, off: 9 }); ctx.restore();
      P.earth(ctx, EX, EY, 56);
      INK.label(ctx, 'Dünya', EX, EY + 95, { size: 32, weight: 700, align: 'center' });
      // aktif evre (names boyunca 8 evre, sonra side boyunca tekrar)
      let cur = -1;
      if (t >= sn) cur = Math.min(8, Math.floor(E.seg(t, sn + 0.3, sn + 11.3) * 9));
      // uzaydan: 8 konumda hep yarı aydınlık Ay
      for (let i = 0; i < 8; i++) {
        const e = i / 8 * 6.2832, th = Math.PI - e;
        const k = E.se(t, ss + 0.5 + i * 0.25, ss + 0.9 + i * 0.25); if (k <= 0) continue;
        const x = EX + Math.cos(th) * R, y = EY + Math.sin(th) * R;
        ctx.save(); ctx.globalAlpha = k; F03.halfLit(ctx, x, y, 30, Math.PI, { alpha: 0.78 }); ctx.restore();
        if (cur % 8 === i && t < sd) { ctx.save(); ctx.globalAlpha = 0.9; stroke(ctx, circlePts(x, y, 44, 44, 30), { w: 4, closed: true, color: AMB }); ctx.restore(); }
        INK.label(ctx, String(i + 1), EX + Math.cos(th) * (R + 62), EY + Math.sin(th) * (R + 62) + 12, { size: 30, weight: 700, align: 'center', alpha: 0.7 * k });
      }
      // yörünge yönü
      if (t > ss + 2) { const pts = P.arc(EX, EY, R - 70, 2.6, 1.0, 24); ctx.save(); ctx.globalAlpha = E.se(t, ss + 2, ss + 2.8) * 0.8; stroke(ctx, pts, { w: 3, color: PAL.water, dry: false }); arrowHead(ctx, pts[20], pts[24], 12, { w: 2.6, color: PAL.water }); ctx.restore(); }
      E.inkText(ctx, 'Uzaydan: hep yarısı aydınlık', EX + 20, 215, t, ss + 1.0, 1e9, { size: 42, align: 'center' });
      // Dünya'dan görünüm kartları
      E.inkText(ctx, 'Dünya’dan görünüm', 1340, 200, t, ss + 3.6, 1e9, { size: 46, align: 'center' });
      for (let i = 0; i < 8; i++) {
        const [x, y] = cardPos(i);
        const k = t < sn ? E.se(t, ss + 4.0 + i * 0.12, ss + 4.4 + i * 0.12) * 0.35 : (cur >= i ? 1 : 0.35);
        ctx.save(); ctx.globalAlpha = k;
        const fr = [[x - 90, y - 90], [x + 90, y - 91], [x + 91, y + 90], [x - 89, y + 91], [x - 90, y - 90]];
        P.fillPts(ctx, fr, '#262A40', 0.9); stroke(ctx, fr, { w: 2, closed: true, seed: 60 + i });
        if (i === 0) { dashed(ctx, circlePts(x, y, 58, 58, 40), { w: 2, on: 7, off: 6, color: '#FBF3DC' }); }
        else F03.phaseMoon(ctx, x, y, 58, i / 8 * 6.2832, { alpha: 0.9 });
        INK.label(ctx, String(i + 1), x - 74, y - 64, { size: 26, weight: 700, color: '#FBF3DC' });
        ctx.restore();
        if (cur >= i && t >= sn) INK.label(ctx, NAMES[i], x, y + 132, { size: 34, weight: 700, align: 'center', alpha: E.se(t, sn + 0.3 + i * 11 / 9, sn + 0.8 + i * 11 / 9) });
        if (cur % 8 === i && t < sd && t >= sn) stroke(ctx, INK.wobble(circlePts(x, y, 108, 108, 40), 3, 70 + i), { w: 4, closed: true, color: AMB });
      }
      // büyüyen / küçülen
      const kb = E.se(t, sd + 0.6, sd + 1.4);
      if (kb > 0) {
        ctx.save(); ctx.globalAlpha = kb;
        stroke(ctx, INK.wobble([[885, 245], [1795, 245], [1795, 565], [885, 565], [885, 245]], 2, 81), { w: 3.4, closed: true, color: AMB });
        stroke(ctx, INK.wobble([[885, 575], [1795, 575], [1795, 895], [885, 895], [885, 575]], 2, 82), { w: 3.4, closed: true, color: PAL.water });
        ctx.restore();
        P.write(ctx, 'büyüyor → sağ taraf aydınlık', 1340, 290, E.seg(t, sd + 1.2, sd + 2.6), { size: 36, align: 'center', color: '#8A4A10' });
        P.write(ctx, 'küçülüyor → sol taraf aydınlık', 1340, 612, E.seg(t, sd + 3.2, sd + 4.6), { size: 36, align: 'center', color: PAL.water });
      }
    }
  });
})();

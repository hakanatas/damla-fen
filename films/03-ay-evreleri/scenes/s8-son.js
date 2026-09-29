// SAHNE 8 — Model süreci kaydı, Sıra sende (bir aylık gözlem + model), araştırma (hicri takvim), sonraki film, bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = '#A23A2A';
  const CHAIN = [['Tahmin', ''], ['Gözlem', 'bir ay'], ['Model 1', 'gölge'], ['Yeni kanıt', 'hilal Güneş’e yakın'], ['Model 2', 'lamba-top-baş']];
  E.scene({
    name: 'Kaydet ve görev', concept: 'Model önerme ve yenileme süreci; performans görevi', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      const A = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (A > 0) E.layer(ctx, A, c => {
        P.write(c, 'Gözlem Defteri · Ay’ın Evreleri', 290, 215, E.seg(t, sr + 0.2, sr + 1.2), { size: 60 });
        const xs = [380, 660, 940, 1220, 1500], y = 470;
        CHAIN.forEach(([a, b], i) => {
          const at = sr + 1.0 + i * 1.0, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const r = 118 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 140 + i);
          P.fillPts(c, cp, i === 4 ? '#F6E7B8' : '#FBF8F1'); stroke(c, cp, { w: 3.2, closed: true, seed: 150 + i });
          c.save(); c.font = '700 40px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; const w = a.split(' ');
          if (w.length > 1) { c.fillText(w[0], xs[i], y - 6); c.fillText(w[1], xs[i], y + 36); } else c.fillText(a, xs[i], y + 12); c.restore();
          if (b) INK.label(c, b, xs[i], y + 170, { size: 28, align: 'center', alpha: 0.75 });
          if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 122, y], [xs[i] - 122, y], ak, { w: 3, head: 12 }); }
        });
        P.cross(c, 940, 330, 34, E.se(t, sr + 4.2, sr + 4.6), { w: 7, color: RED });
        P.check(c, 1500, 330, 60, E.se(t, sr + 5.4, sr + 5.9), { w: 8 });
        P.write(c, 'Model, yeni kanıtla yenilenir.', 960, 760, E.seg(t, sr + 6, sr + 7.4), { size: 52, align: 'center' });
      });
      const B = E.se(t, sy - 0.1, sy + 0.6);
      if (B > 0) E.layer(ctx, B, c => {
        P.write(c, 'Sıra sende!', 290, 225, E.seg(t, sy + 0.3, sy + 1.3), { size: 70, color: '#8A4A10' });
        const L = ['1. Bir ay boyunca Ay’ı gözlemle.', '2. Her gözlemi çiz ya da fotoğrafla.', '3. Evrelerin modelini yap.', '4. Arkadaşlarının modelleriyle karşılaştır, yenile.'];
        L.forEach((s, i) => P.write(c, s, 300, 360 + i * 105, E.seg(t, sy + 1.2 + i * 1.3, sy + 2.2 + i * 1.3), { size: 46 }));
        [0.6, 1.57, 3.14, 4.71].forEach((e, i) => { const k = E.se(t, sy + 1.8 + i * 0.5, sy + 2.3 + i * 0.5); if (k > 0) { c.save(); c.globalAlpha = k; P.fillPts(c, circlePts(1410 + (i % 2) * 150, 400 + ((i / 2) | 0) * 150, 62, 62, 30), '#262A40', 0.9); F03.phaseMoon(c, 1410 + (i % 2) * 150, 400 + ((i / 2) | 0) * 150, 50, e); c.restore(); } });
        INK.label(c, 'gece gözlemlerini bir yetişkinle yap', 1480, 700, { size: 30, align: 'center', alpha: 0.75 * E.se(t, sy + 5, sy + 5.8) });
      });
      DAMLA.draw(ctx, { x: 1690, y: 1045, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Araştır ve sonraki', concept: 'Ay takvimi araştırması; sonraki film', from: 'research', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('research'), sn = E.s('next'), se = E.s('end');
      const hill = P.hillLine(E.W);
      F03.dusk(ctx, t);
      F03.stars(ctx, t, 0.7, { n: 24, seed: 33, area: [0, 0, E.W, 500] });
      F03.phaseMoon(ctx, 1600, 240, 55, 0.75, { rot: 0.55, litOnly: true, dark: '#4E5274' });
      P.landscape(ctx, E.W, E.H, t, { hill });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'q3', expr: 'happy', look: [0.8, -0.6], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      const rk = Math.min(E.se(t, sr, sr + 0.7, 'out'), 1 - E.se(t, sn - 0.4, sn + 0.3));
      if (rk > 0) E.layer(ctx, rk, c => {
        F03.card(c, 300, 170, 1320, 560, { seed: 91 });
        P.icon.books(c, 470, 440, 1.1);
        P.write(c, 'Sen de araştır!', 660, 290, E.seg(t, sr + 0.4, sr + 1.4), { size: 70, color: '#8A4A10' });
        P.write(c, 'Ramazan ayı ve dinî bayramlar,', 660, 400, E.seg(t, sr + 1.2, sr + 2.6), { size: 54 });
        P.write(c, 'hangi gök cisimlerinin', 660, 480, E.seg(t, sr + 2.6, sr + 3.8), { size: 54 });
        P.write(c, 'hareketine göre belirlenir?', 660, 560, E.seg(t, sr + 3.8, sr + 5.0), { size: 54 });
        INK.label(c, 'kütüphane · güvenilir dijital kaynaklar · öğretmenin', 660, 650, { size: 30, alpha: 0.6 * E.se(t, sr + 5, sr + 5.8) });
      });
      const nk = Math.min(E.se(t, sn + 0.3, sn + 1.0), 1 - E.se(t, se - 0.2, se + 0.4));
      if (nk > 0) E.layer(ctx, nk, c => {
        E.inkText(c, 'Sıradaki gözlem:', 960, 200, t, sn + 0.4, 1e9, { size: 50, align: 'center', weight: 400, color: '#FBF3DC' });
        E.inkText(c, 'Güneş, Dünya ve Ay', 960, 285, t, sn + 1.0, 1e9, { size: 76, align: 'center', color: '#FBF3DC' });
        const k = E.se(t, sn + 1.6, sn + 2.4, 'out');
        if (k > 0) { c.save(); c.globalAlpha = k; P.sun(c, 1250, 520, 60, t, { nrays: 14, cells: false }); P.earth(c, 1480, 520, 28); P.moon(c, 1560, 480, 11); c.restore(); }
      });
      F03.endCard(ctx, t, se, 3, 'Ay’ın Evreleri', 'FB.5.1.3');
    }
  });
})();

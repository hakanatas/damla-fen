// SAHNE 8 — Özet (bilimsel çıkarım süreci), Sıra sende, araştırma görevi, sonraki film, bitiş
(function () {
  const { PAL, line, stroke, circlePts, dashed } = INK;
  const AMB = '#C07F1E';
  const STEPS = [['Tanımla', 'nitelikler'], ['Kaydet', 'veriler'], ['Yorumla', 'sonuç çıkar']];
  E.scene({
    name: 'Özet', concept: 'Bilimsel çıkarım: tanımla, kaydet, yorumla', from: 'summary', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sm = E.s('summary'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 880);
      const A = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (A > 0) E.layer(ctx, A, c => {
        P.write(c, 'Gözlem Defteri · Ay', 290, 215, E.seg(t, sm + 0.2, sm + 1.2), { size: 62 });
        const xs = [520, 960, 1400], y = 420;
        STEPS.forEach(([a, b], i) => {
          const at = sm + 0.8 + i * 1.3, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
          const r = 140 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 110 + i);
          P.fillPts(c, cp, i === 2 ? '#F6E7B8' : '#FBF8F1'); stroke(c, cp, { w: 3.4, closed: true, seed: 120 + i });
          c.save(); c.font = '700 50px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.ink; c.fillText(a, xs[i], y + 6); c.font = '400 32px Kalam'; c.globalAlpha = 0.75; c.fillText(b, xs[i], y + 50); c.restore();
          if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 150, y], [xs[i] - 150, y], ak, { w: 3.4, head: 14 }); }
        });
        P.write(c, 'Ay kendi ışığını üretmez · hep aynı yüzü görünür', 960, 690, E.seg(t, sm + 4.6, sm + 6.2), { size: 44, align: 'center' });
        P.write(c, 'çünkü dönme ve dolanma süreleri eşittir (≈ 27,3 gün)', 960, 760, E.seg(t, sm + 6.0, sm + 7.6), { size: 40, align: 'center', color: '#8A4A10' });
      });
      // Sıra sende
      const B = E.se(t, sy - 0.1, sy + 0.6);
      if (B > 0) E.layer(ctx, B, c => {
        P.write(c, 'Sıra sende!', 290, 225, E.seg(t, sy + 0.3, sy + 1.3), { size: 70, color: '#8A4A10' });
        const cx = 760, cy = 700;
        c.save(); c.globalAlpha = 0.6; dashed(c, circlePts(cx, cy, 380, 110, 120), { w: 2.6, on: 14, off: 10 }); c.restore();
        F02.orbitArrow(c, cx, cy, 410, 130, 0.35, -0.5, { w: 4, head: 16 });
        // Dünya rolündeki arkadaş (elinde küre tabelası), Ay rolünde Damla
        DAMLA.draw(c, { x: cx, y: cy + 30, s: 0.95, view: 'front', expr: 'happy', blink: E.blink(t, 4), t, seed: 6, arms: [[-1, [-30, -210]], [1, [30, -210]]],
          hold: (cc) => { P.earth(cc, 0, -250, 34); } });
        INK.label(c, 'Dünya', cx, cy - 300, { size: 34, weight: 700, align: 'center' });
        const ph = Math.PI / 2 - E.seg(t, sy + 0.5, E.e('yourturn')) * 3.4;
        const ax = cx + Math.cos(ph) * 380, ay = cy + Math.sin(ph) * 110 + 30;
        DAMLA.draw(c, { x: ax, y: ay, s: 0.8, view: Math.sin(ph) > 0.5 ? 'back' : 'side', flip: Math.cos(ph) > 0, expr: 'happy', t, seed: 3, feet: E.walk(t * 9) });
        INK.label(c, 'Ay', ax, ay + 50, { size: 34, weight: 700, align: 'center' });
        F02.card(c, 1250, 330, 470, 400, { seed: 81 });
        P.icon.pencil(c, 1330, 420, 0.7, -0.5);
        ['1. Rol oynayın', '2. Hareketleri çizin', '3. Yönleri gösterin'].forEach((s, i) => P.write(c, s, 1290, 520 + i * 70, E.seg(t, sy + 1.5 + i * 1.2, sy + 2.5 + i * 1.2), { size: 38 }));
      });
    }
  });
  E.scene({
    name: 'Araştır ve sonraki', concept: 'Ali Kuşçu, Cacabey; sonraki film: Ay\'ın evreleri', from: 'research', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('research'), sn = E.s('next'), se = E.s('end');
      const hill = F02.nightLand(ctx, t, { mx: 1560, my: 260, mr: 70 });
      const dx = 820, dy = P.hillY(hill, dx) + 4;
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'q3', expr: 'happy', look: [0.8, -0.6], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      // araştırma kartı
      const rk = Math.min(E.se(t, sr, sr + 0.7, 'out'), 1 - E.se(t, sn - 0.4, sn + 0.3));
      if (rk > 0) E.layer(ctx, rk, c => {
        F02.card(c, 300, 170, 1320, 560, { seed: 91 });
        P.icon.books(c, 470, 420, 1.1);
        P.write(c, 'Sen de araştır!', 660, 290, E.seg(t, sr + 0.4, sr + 1.4), { size: 70, color: '#8A4A10' });
        P.write(c, 'Ali Kuşçu ve Cacabey kimdi?', 660, 400, E.seg(t, sr + 1.2, sr + 2.6), { size: 56 });
        P.write(c, 'Ay’daki Toros Dağları’nda', 660, 490, E.seg(t, sr + 2.8, sr + 4.0), { size: 50 });
        P.write(c, 'hangi Türk isimleri var?', 660, 560, E.seg(t, sr + 3.8, sr + 5.0), { size: 50 });
        INK.label(c, 'kütüphane · güvenilir dijital kaynaklar · öğretmenin', 660, 650, { size: 30, alpha: 0.6 * E.se(t, sr + 5, sr + 5.8) });
      });
      // sonraki: evreler
      const nk = Math.min(E.se(t, sn + 0.3, sn + 1.0), 1 - E.se(t, se - 0.2, se + 0.4));
      if (nk > 0) E.layer(ctx, nk, c => {
        E.inkText(c, 'Sıradaki gözlem:', 960, 200, t, sn + 0.4, 1e9, { size: 50, align: 'center', weight: 400, color: '#FBF3DC' });
        E.inkText(c, 'Ay’ın Evreleri', 960, 285, t, sn + 1.0, 1e9, { size: 76, align: 'center', color: '#FBF3DC' });
        [0.9, 1.57, 2.3, 3.14].forEach((e, i) => { const k = E.se(t, sn + 1.6 + i * 0.4, sn + 2.1 + i * 0.4, 'out'); if (k > 0) { c.save(); c.globalAlpha = k; F02.phaseMoon(c, 1250 + i * 150, 470, 52, e); c.restore(); } });
      });
      F02.endCard(ctx, t, se, 2, 'Gökyüzündeki Komşumuz: Ay', 'FB.5.1.2');
    }
  });
})();

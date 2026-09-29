// SAHNE 4 — Avantajlar ve sınırlılıklar (FB.6.4.7 b: akıl yürütür) + çıkarım
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F614;
  const PROS = ['yenilenebilir bir kaynak', 'çalışırken duman ve zararlı gaz çıkarmaz', 'güneş ışığı için ücret ödenmez'];
  const CONS = ['gece üretim yok, bulutlu havada az', 'depolama (akü) gerekebilir', 'kurulum maliyeti', 'geniş alan ihtiyacı', 'eski panellerin geri dönüşümü'];
  E.scene({
    name: 'Artı ve eksi', concept: 'Avantajlar ve sınırlılıklar', from: 'pros', to: 'decide', trFrom: [960, 500],
    draw(ctx, t) {
      const sp = E.s('pros'), sc = E.s('cons'), sd = E.s('decide');
      ctx.fillStyle = 'rgba(138,106,69,0.10)'; ctx.fillRect(0, 0, E.W, E.H);
      F.card(ctx, 150, 180, 1430, 600, { seed: 250 });
      const mid = 870;
      line(ctx, [mid, 200], [mid, 760], { w: 2.4, dry: false, seed: 251 });
      line(ctx, [170, 285], [1565, 280], { w: 2.6, dry: false, seed: 252 });
      P.fillPts(ctx, [[160, 190], [mid - 4, 190], [mid - 4, 276], [160, 276]], '#FBF3DC', 0.9);
      P.fillPts(ctx, [[mid + 4, 190], [1572, 190], [1572, 272], [mid + 4, 272]], '#E6E1D5', 0.9);
      P.write(ctx, '+ Avantajlar', 200, 255, E.seg(t, sp + 0.2, sp + 1.2), { size: 52, color: '#8A4A10' });
      P.write(ctx, '– Sınırlılıklar', mid + 40, 255, E.seg(t, sc + 0.2, sc + 1.2), { size: 52 });
      PROS.forEach((txt, i) => {
        const at = sp + 1.4 + i * 1.8, y = 370 + i * 90;
        P.write(ctx, '• ' + txt, 200, y, E.seg(t, at, at + 1.2), { size: F.fit(ctx, '• ' + txt, mid - 240, 42) });
      });
      CONS.forEach((txt, i) => {
        const at = sc + 1.0 + i * 1.3, y = 360 + i * 82;
        P.write(ctx, '• ' + txt, mid + 40, y, E.seg(t, at, at + 1.0), { size: F.fit(ctx, '• ' + txt, 1560 - mid - 50, 40) });
      });
      // balance scale doodle on the right
      const tilt = 0.08 * Math.sin(t * 1.5) * (1 - E.se(t, sd, sd + 1));
      const bx = 1770, by = 470;
      line(ctx, [bx, by + 200], [bx, by], { w: 4, seed: 260 });
      ctx.save(); ctx.translate(bx, by); ctx.rotate(tilt);
      line(ctx, [-110, 0], [110, 0], { w: 4, seed: 261 });
      [[-110, PAL.light], [110, '#8C8578']].forEach(([dx, col]) => { line(ctx, [dx, 0], [dx - 30, 70], { w: 1.6, dry: false }); line(ctx, [dx, 0], [dx + 30, 70], { w: 1.6, dry: false }); P.fillPts(ctx, P.arc(dx, 70, 40, 0, Math.PI, 16), col, 0.7); stroke(ctx, P.arc(dx, 70, 40, 0, Math.PI, 16), { w: 2.4, dry: false }); });
      ctx.restore();
      INK.label(ctx, 'tart!', bx, by + 250, { size: 36, weight: 700, align: 'center' });
      // conclusion
      const ck = E.se(t, sd + 0.2, sd + 1.0);
      if (ck > 0) {
        ctx.save(); ctx.globalAlpha *= ck;
        const b = [[150, 810], [1630, 804], [1634, 900], [154, 906], [150, 810]]; P.fillPts(ctx, b, '#F6E7B8', 0.95); stroke(ctx, b, { w: 3, closed: true, color: F.AMB, seed: 270 });
        ctx.restore();
        const tx = 'Çıkarım: Güneş enerjisi değerlidir; doğru yerde, doğru biçimde kullanılmalıdır.';
        P.write(ctx, tx, 890, 870, E.seg(t, sd + 0.5, sd + 2.8), { size: F.fit(ctx, tx, 1400, 46), align: 'center' });
      }
    }
  });
})();

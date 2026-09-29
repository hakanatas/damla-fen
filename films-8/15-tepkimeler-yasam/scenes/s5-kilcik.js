// SAHNE 6 — Kaydet (ç): balık kılçığı şeması (üst: olumlu, alt: olumsuz) · SAHNE 7 — Güvenlik, Sıra sende, Sıradaki, bitiş
(function () {
  const { PAL, stroke, line, circlePts } = INK;
  const U = U5;
  const NEG = '#A0602A';
  const XS = [420, 680, 940, 1200, 1460], SY = 540;
  const UP = [['fotosentez', 'besin, oksijen'], ['sindirim', 'enerji'], ['pişirme,', 'mayalanma'], ['yanma:', 'ısınma'], ['çürüme:', 'verimli toprak']];
  const DN = [['paslanma', 'eşya bozulur'], ['besin', 'çürümesi'], ['diş', 'çürümesi'], ['yanma:', 'yangın, duman'], ['hava', 'kirliliği']];
  E.scene({
    name: 'Balık kılçığı', concept: 'Bilgileri kaydetme', from: 'fish', to: 'fish2', trFrom: [960, 540],
    draw(ctx, t) {
      const sf = E.s('fish'), s2 = E.s('fish2');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      // omurga + baş + kuyruk
      P.drawOn(ctx, U.linePts([200, SY], [1520, SY], 40), E.se(t, sf + 0.2, sf + 1.4), { w: 6 });
      const hk = E.se(t, sf + 1.0, sf + 1.8);
      if (hk > 0) E.layer(ctx, hk, c => {
        const head = [[1520, 420], [1860, 460], [1880, 540], [1860, 620], [1520, 660], [1520, 420]];
        P.fillPts(c, head, '#FAF6EC'); stroke(c, head, { w: 3.4, closed: true, seed: 2401 });
        ['Kimyasal', 'tepkimelerin', 'günlük yaşama', 'etkileri'].forEach((l, i) => U.txt(c, l, 1690, 492 + i * 40, { size: 32, align: 'center' }));
        stroke(c, [[200, SY], [120, SY - 90], [140, SY], [120, SY + 90], [200, SY]], { w: 3.4, closed: true, seed: 2402 });
      });
      U.txt(ctx, '+ olumlu', 150, 205, { size: 42, color: PAL.life, alpha: hk });
      U.txt(ctx, '− olumsuz', 150, 885, { size: 42, color: NEG, alpha: hk });
      const hi = E.se(t, s2 + 0.4, s2 + 1.0);
      [[UP, -1, PAL.life], [DN, 1, NEG]].forEach(([L, d, col], side) => L.forEach(([a, b], i) => {
        const at = sf + 2.0 + (side * 5 + i) * 0.85, k = E.se(t, at, at + 0.5); if (k <= 0) return;
        const x = XS[i], ex = x - 130, ey = SY + d * 190;
        P.drawOn(ctx, U.linePts([x, SY], [ex, ey], 20), k, { w: 3.4, color: col });
        const emph = (i >= 3) ? hi : 0;
        if (emph > 0) { ctx.save(); ctx.globalAlpha *= emph; stroke(ctx, circlePts(ex, ey + d * 55, 125, 58, 40), { w: 3, closed: true, color: U.AMBER }); ctx.restore(); }
        const ty = d < 0 ? ey - 60 : ey + 50;
        P.write(ctx, a, ex, ty, E.seg(t, at + 0.3, at + 0.9), { size: 34, align: 'center' });
        P.write(ctx, b, ex, ty + 40, E.seg(t, at + 0.5, at + 1.1), { size: 30, align: 'center', color: col });
      }));
      const nk = E.se(t, s2 + 1.2, s2 + 1.8);
      if (nk > 0) P.write(ctx, 'aynı tepkime: hem + hem −', 1330, 880, nk, { size: 38, align: 'center', color: U.AMBER });
      U.damla(ctx, t, { x: 1790, y: 900, s: 0.7, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Güvenlik ve görev', concept: 'Temizlik maddeleri karıştırılmaz; afiş görevi; sıradaki film', from: 'safe', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const ss = E.s('safe'), st = E.s('task'), sn = E.s('next');
      const sk = 1 - E.se(t, st - 0.3, st + 0.3);
      if (sk > 0) E.layer(ctx, sk, c => {
        // iki şişe + çarpı
        [[330, '#E8E2D2', 'çamaşır suyu'], [640, '#D9E4C8', 'tuz ruhu']].forEach(([x, col, nm], i) => { const b = [[x - 55, 460], [x + 55, 460], [x + 60, 760], [x - 60, 760], [x - 55, 460]]; P.fillPts(c, b, col); stroke(c, b, { w: 3, closed: true, dry: false }); P.fillPts(c, U.rect(x - 25, 410, x + 25, 460), '#8A8378'); U.txt(c, nm, x, 820, { size: 34, align: 'center' }); P.fillPts(c, U.rect(x - 40, 560, x + 40, 640), '#FBF8F1'); U.txt(c, '⚠', x, 620, { size: 50, align: 'center', color: U.RED }); });
        P.cross(c, 485, 610, 40, E.se(t, ss + 0.8, ss + 1.6), { w: 9, color: U.RED });
        U.safety(c, 820, 250, 960, ['Temizlik maddelerini asla karıştırma!', 'Karışınca zehirli gazlar oluşabilir.', 'Etiketteki güvenlik işaretlerini oku.', 'Bir yetişkin gözetiminde kullan.'], t, ss + 0.3, { step: 1.0, hi: 0, size: 40 });
      });
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', ['Evinde gözlediğin kimyasal tepkimeleri araştır.', 'Kitap, güvenilir site, öğretmen: bilgini doğrula.', 'Olumlu ve olumsuz etkileri ayır.', 'Bulduklarınla bir afiş hazırla.'], { x: 220, y: 190, w: 1200, h: 540, lh: 76, step: 1.0 });
      const tk = Math.min(E.se(t, st, st + 0.7), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (tk > 0) E.layer(ctx, tk, c => U.damla(c, t, { x: 1650, y: 880, s: 1.3, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]] }));
      const nk = E.se(t, sn, sn + 0.8);
      if (nk > 0) E.layer(ctx, nk, c => {
        U.bench(c, -40, 1960, 820, 2451);
        U.lemon(c, 600, 780, 1.4); U.txt(c, 'limon', 600, 900, { size: 34, align: 'center' });
        const sb = [[860, 560], [960, 560], [975, 820], [845, 820], [860, 560]]; P.fillPts(c, sb, '#CFE0EA'); stroke(c, sb, { w: 3, closed: true, dry: false }); P.fillPts(c, U.rect(885, 520, 935, 560), '#8A8378'); U.txt(c, 'sabun', 910, 900, { size: 34, align: 'center' });
        U.bottle(c, 1200, 820, 0.9, t, { level: 0.5, cap: true });
        U.txt(c, 'sirke', 1200, 900, { size: 34, align: 'center' });
        INK.label(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center' });
        INK.label(c, 'Asitler ve Bazlar', 960, 320, { size: 76, align: 'center', weight: 700 });
        U.damla(c, t, { x: 1600, y: 820, s: 1.1, view: 'q3', flip: true, expr: 'curious', look: [-0.9, 0.2], arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
      U.end(ctx, t, '15 · Hayatın İçindeki Tepkimeler', 'FB.8.5.4');
    }
  });
})();

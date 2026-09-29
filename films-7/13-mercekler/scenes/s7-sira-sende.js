// SAHNE 7 — Sıra sende (performans görevi: kullanım alanları afişi) + Merak et (zenginleştirme: teleskop tasarımı) + sonraki film: Atom + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F713;

  function outro(ctx, t) {
    const stk = E.s('task'), srs = E.s('research'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 200, 170, 1340, 720, { seed: 1501 });
      // mini afiş
      const pst = [[260, 250], [520, 246], [522, 560], [262, 564], [260, 250]]; P.fillPts(c, pst, '#FBF8F1'); stroke(c, pst, { w: 2.4, closed: true, seed: 1502 });
      F.drawLens(c, F.lens(330, 320, 36, 26, 60, true), { seed: 1503, w: 2 }); F.drawLens(c, F.lens(450, 320, 36, 6, 60, false), { seed: 1505, w: 2 });
      for (let i = 0; i < 4; i++) { line(c, [285, 420 + i * 34], [380, 420 + i * 34], { w: 2, alpha: 0.5, dry: false, seed: 1510 + i }); line(c, [405, 420 + i * 34], [500, 420 + i * 34], { w: 2, alpha: 0.5, dry: false, seed: 1520 + i }); }
      line(c, [392, 380], [392, 540], { w: 1.4, alpha: 0.5, dry: false });
      P.write(c, 'Sıra sende!', 580, 260, E.seg(t, stk + 0.4, stk + 1.4), { size: 66, color: '#8A4A10' });
      P.write(c, 'Evindeki mercekli araçları bul.', 580, 340, E.seg(t, stk + 1.2, stk + 2.4), { size: 40 });
      P.write(c, 'İnce ve kalın kenarlı diye iki gruba ayır.', 580, 400, E.seg(t, stk + 2.2, stk + 3.6), { size: 40 });
      P.write(c, 'Etiketle ve bir afişle sınıfta sun.', 580, 460, E.seg(t, stk + 3.4, stk + 4.6), { size: 40 });
      INK.label(c, '⚠ Güneş ışığını mercekle toplama!', 580, 530, { size: 34, weight: 700, color: F.RED, alpha: E.se(t, stk + 4.6, stk + 5.2) });
      line(c, [260, 620], [1480, 616], { w: 1.6, dry: false, alpha: 0.5 * E.se(t, srs, srs + 0.5) });
      P.write(c, 'Merak et:', 270, 710, E.seg(t, srs + 0.3, srs + 1.0), { size: 46, color: '#8A4A10' });
      P.write(c, 'İki mercekle basit bir teleskop', 500, 710, E.seg(t, srs + 0.9, srs + 2.2), { size: 40 });
      P.write(c, 'nasıl tasarlanır?', 500, 768, E.seg(t, srs + 2.0, srs + 3.0), { size: 40 });
      INK.label(c, 'kaynak: kütüphane · güvenilir dijital kaynaklar · öğretmenin', 500, 840, { size: 28, alpha: 0.65 * E.se(t, srs + 3.0, srs + 3.8) });
    });
    if (t < se + 0.2) DAMLA.draw(ctx, { x: 1720, y: 885, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // sonraki film: atom (şematik; model ayrıntısına girilmez)
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      INK.label(c, 'Sıradaki gözlem:', 880, 260, { size: 50, align: 'center', alpha: 0.85 });
      INK.label(c, '14 · Atomun Yapısı', 880, 360, { size: 80, weight: 700, align: 'center' });
      const cx = 880, cy = 620;
      [0, 1.05, 2.1].forEach((r, i) => stroke(c, circlePts(0, 0, 230, 80, 60).map(([x, y]) => [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)]), { w: 2.4, closed: true, alpha: 0.6, seed: 1530 + i, dry: false }));
      const rr = INK.rng(1540);
      for (let i = 0; i < 7; i++) { const a = rr() * 6.28, d = rr() * 26; P.fillPts(c, circlePts(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 16, 16, 16), i % 2 ? '#B5553F' : '#9A9387', 0.9); stroke(c, circlePts(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 16, 16, 16), { w: 1.6, closed: true, dry: false }); }
      [0, 1.05, 2.1].forEach((r, i) => { const a = t * (1.2 + i * 0.3) + i * 2; const x = Math.cos(a) * 230, y = Math.sin(a) * 80; P.fillPts(c, circlePts(cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r), 9, 9, 12), PAL.water, 0.9); });
      INK.label(c, '(şematik çizim)', cx + 270, 800, { size: 28, alpha: 0.6 });
    });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '13 · Mercekler', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · FB.7.4.2 · FB.7.4.3 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 900, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi, merak sorusu, sonraki film', from: 'task', to: 'end', trFrom: [1700, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

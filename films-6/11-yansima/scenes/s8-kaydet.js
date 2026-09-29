// SAHNE 8 — Gözlem defteri + Sıra sende + Araştır (zenginleştirme) + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F611, RED = F.RED, V = F.V;
  const ITEMS = [
    'Işık, çarptığı yüzeyden yansır. Ay da böyle parlar.',
    'Düzgün yüzey: ışınlar paralel yansır → düzgün yansıma.',
    'Pürüzlü yüzey: ışınlar dağılır → dağınık yansıma.',
    'Açılar normale göre ölçülür: gelme açısı = yansıma açısı.',
    'Gelen ve yansıyan ışın, normalin iki farklı yanındadır.'
  ];

  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 750);
    P.write(ctx, 'Gözlem Defteri · Işığın Yansıması', 290, 250, E.seg(t, sr + 0.3, sr + 1.5), { size: 58 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 272], [700, 284], [1190, 268], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.8 + i * 1.5, y = 360 + i * 86;
      const box = [[300, y - 38], [342, y - 40], [344, y + 2], [302, y + 4], [300, y - 38]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 321, y - 19, 40, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 370, y, E.seg(t, at, at + 1.1), { size: 42 });
    });
    const wat = sr + 1.8 + 5 * 1.5;
    P.write(ctx, '⚠  Yansıyan güneş ışığını kimsenin gözüne tutma!', 300, 820, E.seg(t, wat, wat + 1.3), { size: 44, color: RED });
    DAMLA.draw(ctx, { x: 1650, y: 895, s: 0.72, view: 'q3', flip: true, expr: t > wat + 1.4 ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: t > wat + 1.4 ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > wat + 1.4 ? null : 'notebook' });
  }

  function doodle(ctx, x, y) { // küçük ayna + fener + iletki çizimi
    F.mirror(ctx, x - 120, x + 120, y, { th: 12 });
    const O = [x, y], S = [x - 120, y - 150], D = V.norm(V.sub(O, S)), RF = V.reflect(D, [0, -1]);
    F.ray(ctx, S, O, 1, { w: 2.6, head: 11, seed: 841 }); F.ray(ctx, O, V.add(O, V.mul(RF, 190)), 1, { w: 2.6, head: 11, seed: 842 });
    const np = []; for (let i = 0; i <= 20; i++) np.push([x, y - 170 * i / 20]); INK.dashed(ctx, np, { w: 2, on: 9, off: 7, color: PAL.water });
    stroke(ctx, P.arc(x, y, 110, Math.PI, 2 * Math.PI, 30), { w: 1.8, color: PAL.water, dry: false });
  }

  function outro(ctx, t) {
    const stk = E.s('task'), srs = E.s('research'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 260, 180, 1260, 690, { seed: 851 });
      doodle(c, 450, 430);
      P.write(c, 'Sıra sende!', 660, 280, E.seg(t, stk + 0.4, stk + 1.4), { size: 70, color: '#8A4A10' });
      P.write(c, 'Ayna ve el feneriyle üç farklı açı dene.', 660, 370, E.seg(t, stk + 1.2, stk + 2.6), { size: 42 });
      P.write(c, 'İki açıyı ölç, tabloya kaydet.', 660, 430, E.seg(t, stk + 2.4, stk + 3.6), { size: 42 });
      P.write(c, 'Sonuçlarını arkadaşlarınla karşılaştır.', 660, 490, E.seg(t, stk + 3.4, stk + 4.8), { size: 42 });
      line(c, [320, 580], [1460, 576], { w: 1.6, dry: false, alpha: 0.5 * E.se(t, srs, srs + 0.5) });
      P.write(c, 'Araştır:', 330, 660, E.seg(t, srs + 0.3, srs + 1.0), { size: 48, color: '#8A4A10' });
      P.write(c, 'Fotoğrafçıların spot lambalarındaki çanak', 540, 660, E.seg(t, srs + 0.9, srs + 2.4), { size: 40 });
      P.write(c, 'neden parlak ve pürüzlü yapılır?', 540, 720, E.seg(t, srs + 2.2, srs + 3.4), { size: 40 });
      INK.label(c, 'kaynak: kütüphane · güvenilir dijital kaynaklar · öğretmenin', 540, 800, { size: 30, alpha: 0.65 * E.se(t, srs + 3.4, srs + 4.2) });
    });
    if (t < se + 0.2) DAMLA.draw(ctx, { x: 1700, y: 880, s: 1.05, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // sonraki film
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      INK.label(c, 'Sıradaki gözlem:', 900, 260, { size: 50, align: 'center', alpha: 0.85 });
      INK.label(c, '12 · Aynalar', 900, 360, { size: 80, weight: 700, align: 'center' });
      const y = 600, xs = [500, 900, 1300];
      // düz
      line(c, [xs[0] - 110, y], [xs[0] + 110, y], { w: 6, color: '#5B6B75', seed: 861 });
      // çukur (ışık üstten gelir; yüzey içe doğru)
      stroke(c, P.arc(xs[1], y - 170, 200, Math.PI * 0.3, Math.PI * 0.7, 30), { w: 6, color: '#5B6B75', seed: 862 });
      // tümsek
      stroke(c, P.arc(xs[2], y + 170, 200, Math.PI * 1.3, Math.PI * 1.7, 30), { w: 6, color: '#5B6B75', seed: 863 });
      ['düz', 'çukur', 'tümsek'].forEach((s, i) => INK.label(c, s, xs[i], y + 90, { size: 44, weight: 700, align: 'center' }));
    });
    // bitiş kartı
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '11 · Işığın Yansıması', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.4.1 · FB.6.4.2 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 900, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme ve açıklama', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Görev, araştırma, sonraki film', from: 'task', to: 'end', trFrom: [1700, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

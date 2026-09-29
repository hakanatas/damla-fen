// SAHNE 7 — Gözlem tablosu (FB.6.4.3 b, c) + Sıra sende + Araştır (zenginleştirme) + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F612, RED = F.RED;
  const COLS = [290, 500, 1170];
  const HDR = ['Ayna', 'Görüntü', 'Nerede kullanılır?'];
  const ROWS = [
    ['Düz', 'düz, aynı boy, sağ-sol yer değiştirir', 'boy aynası, dikiz aynası'],
    ['Tümsek', 'düz ve küçük; geniş alan gösterir', 'kavşak ve mağaza aynası'],
    ['Çukur', 'yakında düz ve büyük; uzakta ters', 'diş hekimi aynası, el feneri']
  ];

  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 170, 1620, 730);
    P.write(ctx, 'Gözlem Defteri · Aynalar', 290, 255, E.seg(t, sr + 0.3, sr + 1.4), { size: 58 });
    const tk = E.se(t, sr + 1.2, sr + 2.0);
    if (tk > 0) { ctx.save(); ctx.globalAlpha *= tk;
      line(ctx, [270, 355], [1700, 350], { w: 2.6, seed: 1501 });
      [480, 1150].forEach((x, i) => line(ctx, [x, 300], [x, 690], { w: 2, dry: false, seed: 1502 + i }));
      HDR.forEach((h, i) => INK.label(ctx, h, COLS[i], 335, { size: 38, weight: 700, color: '#8A4A10' }));
      ctx.restore(); }
    ROWS.forEach((row, r) => row.forEach((cell, c) => {
      const at = sr + 2.0 + r * 2.4 + c * 0.7, y = 430 + r * 100;
      P.write(ctx, cell, COLS[c], y, E.seg(t, at, at + 0.8), { size: c === 0 ? 40 : 34, color: c === 1 ? PAL.water : PAL.ink });
    }));
    const wat = sr + 2.0 + 3 * 2.4 + 0.4;
    P.write(ctx, '⚠  Çukur aynayla güneş ışığını toplama, göze tutma!', 290, 780, E.seg(t, wat, wat + 1.4), { size: 42, color: RED });
    DAMLA.draw(ctx, { x: 1660, y: 890, s: 0.72, view: 'q3', flip: true, expr: 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
  }

  function outro(ctx, t) {
    const stk = E.s('task'), srs = E.s('research'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 260, 180, 1260, 690, { seed: 1511 });
      F.spoon(c, 440, 380, 0.7, 'in');
      P.write(c, 'Sıra sende!', 640, 280, E.seg(t, stk + 0.4, stk + 1.4), { size: 70, color: '#8A4A10' });
      P.write(c, 'Bir kaşığı yüzüne yaklaştır, sonra uzaklaştır.', 640, 370, E.seg(t, stk + 1.2, stk + 2.6), { size: 36 });
      P.write(c, 'Görüntün düz mü, ters mi? Büyük mü, küçük mü?', 640, 430, E.seg(t, stk + 2.4, stk + 3.8), { size: 36 });
      P.write(c, 'Kaşığın iki yüzünü de dene ve kaydet.', 640, 490, E.seg(t, stk + 3.6, stk + 4.8), { size: 36 });
      line(c, [320, 580], [1460, 576], { w: 1.6, dry: false, alpha: 0.5 * E.se(t, srs, srs + 0.5) });
      P.write(c, 'Araştır:', 330, 660, E.seg(t, srs + 0.3, srs + 1.0), { size: 48, color: '#8A4A10' });
      P.write(c, 'Kahkaha aynaları nasıl yapılır?', 540, 660, E.seg(t, srs + 0.9, srs + 2.2), { size: 40 });
      P.write(c, 'Periskopta hangi aynalar kullanılır?', 540, 720, E.seg(t, srs + 2.0, srs + 3.4), { size: 40 });
      INK.label(c, 'kaynak: kütüphane · güvenilir dijital kaynaklar · öğretmenin', 540, 800, { size: 30, alpha: 0.65 * E.se(t, srs + 3.4, srs + 4.2) });
    });
    const dk = 1 - E.se(t, se, se + 0.5);
    if (dk > 0) E.layer(ctx, dk, c => DAMLA.draw(c, { x: 1700, y: 880, s: 1.05, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] }));
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      INK.label(c, 'Sıradaki gözlem:', 900, 260, { size: 50, align: 'center', alpha: 0.85 });
      INK.label(c, '13 · Renklerin Sırrı: Soğurma ve Renkler', 900, 360, { size: 64, weight: 700, align: 'center' });
      // beyaz ışık, üç renkli top
      [['#A23A2A', 700], [PAL.life, 900], [PAL.water, 1100]].forEach(([col, x], i) => {
        const b = circlePts(x, 600, 70, 70, 40); P.fillPts(c, b, i === 0 ? '#C8553D' : col, 0.85); stroke(c, b, { w: 3, closed: true, seed: 1520 + i });
      });
      INK.label(c, 'Işık soğurulur mu? Cisimler neden renkli görünür?', 900, 760, { size: 42, align: 'center', weight: 700 });
    });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '12 · Aynalar', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([700, 545], [960, 556], [1220, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 6. sınıf · FB.6.4.3 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 900, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Gözlem verilerini kaydetme', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Görev, araştırma, sonraki film', from: 'task', to: 'end', trFrom: [1700, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

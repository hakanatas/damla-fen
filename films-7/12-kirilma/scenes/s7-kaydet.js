// SAHNE 7 — Gözlem defteri + Sıra sende + tartışma + Araştır (Mirim Çelebi) + sonraki film + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F712, V = F.V;
  const ITEMS = [
    'Kırılma: ışık bir saydam ortamdan diğerine geçerken yön değiştirir.',
    'Açılar normale göre ölçülür: gelme açısı ve kırılma açısı.',
    'Az yoğun → çok yoğun (hava → su, cam): normale yaklaşır.',
    'Çok yoğun → az yoğun (su → hava): normalden uzaklaşır.',
    'Sınıra dik gelen ışın kırılmaz, doğrultusu değişmez.',
    'Sudaki kalem kırık, havuzdaki balık yakın görünür.',
    'Prizma beyaz ışığı kırarak renklerine ayırır.'
  ];

  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 160, 1620, 750);
    P.write(ctx, 'Gözlem Defteri · Işığın Kırılması', 290, 245, E.seg(t, sr + 0.3, sr + 1.4), { size: 56 });
    if (t > sr + 1.4) P.drawOn(ctx, P.bez([286, 266], [700, 278], [1130, 262], 30), E.se(t, sr + 1.4, sr + 1.9), { w: 3, color: PAL.light });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.6 + i * 1.35, y = 345 + i * 76;
      const box = [[300, y - 36], [340, y - 38], [342, y + 2], [302, y + 4], [300, y - 36]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 320, y - 18, 38, E.se(t, at + 0.9, at + 1.3), { w: 6 });
      P.write(ctx, txt, 364, y, E.seg(t, at, at + 1.1), { size: 38 });
    });
    const done = t > sr + 1.6 + 7 * 1.35;
    DAMLA.draw(ctx, { x: 1650, y: 895, s: 0.62, view: 'q3', flip: true, expr: done ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5,
      arms: done ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: done ? null : 'notebook' });
  }

  function doodle(ctx, x, y) { // bardak + kalem küçük çizimi
    const g = [[x - 70, y - 110], [x - 64, y + 80], [x + 64, y + 80], [x + 70, y - 110]];
    const w = [[x - 68, y - 40], [x + 68, y - 40], [x + 64, y + 78], [x - 64, y + 78]];
    P.fillPts(ctx, w, PAL.water, 0.25); line(ctx, w[0], w[1], { w: 2.4, color: PAL.water, dry: false });
    stroke(ctx, g, { w: 3, seed: 701 });
    F.pencil(ctx, [x + 90, y - 190], [x + 20, y - 40], { w: 8, seed: 702 });
    ctx.save(); ctx.beginPath(); ctx.rect(x - 70, y - 40, 140, 120); ctx.clip(); F.pencil(ctx, [x + 14, y - 50], [x - 26, y + 60], { w: 8, eraser: false, seed: 703 }); ctx.restore();
  }

  function outro(ctx, t) {
    const stk = E.s('task'), sdc = E.s('discuss'), srs = E.s('research'), sn = E.s('next'), se = E.s('end');
    ctx.fillStyle = 'rgba(24,25,40,0.06)'; ctx.fillRect(0, 0, E.W, E.H);
    const tk = Math.min(E.se(t, stk, stk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (tk > 0) E.layer(ctx, tk, c => {
      F.card(c, 200, 170, 1340, 720, { seed: 851 });
      doodle(c, 380, 420);
      P.write(c, 'Sıra sende!', 560, 260, E.seg(t, stk + 0.4, stk + 1.4), { size: 66, color: '#8A4A10' });
      P.write(c, 'Bir bardak su ve bir kalemle deneyi yap.', 560, 340, E.seg(t, stk + 1.2, stk + 2.6), { size: 40 });
      P.write(c, 'Kalemi üç farklı açıdan gözlemle ve çiz.', 560, 400, E.seg(t, stk + 2.4, stk + 3.8), { size: 40 });
      P.write(c, 'Tartış: Havuz neden olduğundan sığ görünür?', 560, 490, E.seg(t, sdc + 0.3, sdc + 1.8), { size: 40 });
      P.write(c, 'Farklı fikirleri saygıyla dinle.', 560, 550, E.seg(t, sdc + 1.6, sdc + 2.8), { size: 36, color: PAL.life });
      line(c, [260, 620], [1480, 616], { w: 1.6, dry: false, alpha: 0.5 * E.se(t, srs, srs + 0.5) });
      P.write(c, 'Araştır:', 270, 700, E.seg(t, srs + 0.3, srs + 1.0), { size: 46, color: '#8A4A10' });
      P.write(c, 'Osmanlı bilgini Mirim Çelebi’nin', 470, 700, E.seg(t, srs + 0.9, srs + 2.2), { size: 40 });
      P.write(c, 'ışıkla ilgili çalışmaları nelerdir?', 470, 758, E.seg(t, srs + 2.0, srs + 3.2), { size: 40 });
      INK.label(c, 'kaynak: kütüphane · güvenilir dijital kaynaklar · öğretmenin', 470, 830, { size: 28, alpha: 0.65 * E.se(t, srs + 3.2, srs + 4.0) });
    });
    if (t < se + 0.2) DAMLA.draw(ctx, { x: 1720, y: 885, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    // sonraki film: ince ve kalın kenarlı mercek profilleri
    const nk = Math.min(E.se(t, sn, sn + 0.6), 1 - E.se(t, se - 0.3, se + 0.3));
    if (nk > 0) E.layer(ctx, nk, c => {
      INK.label(c, 'Sıradaki gözlem:', 880, 260, { size: 50, align: 'center', alpha: 0.85 });
      INK.label(c, '13 · Mercekler', 880, 360, { size: 80, weight: 700, align: 'center' });
      const y = 600;
      const lens = (cx, cy, h, tc, R, conv) => { // yandan mercek profili (iki küresel yüzey)
        const L = [], Rr = [];
        for (let i = 0; i <= 30; i++) { const yy = -h + 2 * h * i / 30, q = Math.sqrt(R * R - yy * yy);
          L.push([conv ? cx - tc / 2 + R - q : cx - tc / 2 - R + q, cy + yy]); Rr.push([conv ? cx + tc / 2 - R + q : cx + tc / 2 + R - q, cy + yy]); }
        return L.concat(Rr.reverse());
      };
      [[lens(700, y, 150, 110, 260, true), 861], [lens(1060, y, 150, 18, 260, false), 862]].forEach(([pts, sd]) => {
        P.fillPts(c, pts, '#DDE8EC', 0.95); stroke(c, pts.concat([pts[0]]), { w: 3.4, closed: true, color: '#4E6A78', seed: sd }); });
      INK.label(c, 'ince kenarlı', 700, 800, { size: 40, weight: 700, align: 'center' });
      INK.label(c, 'kalın kenarlı', 1060, 800, { size: 40, weight: 700, align: 'center' });
    });
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '12 · Işığın Kırılması', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
      INK.label(c, 'Fen Bilimleri · 7. sınıf · FB.7.4.1 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 900, s: 0.8, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({
    name: 'Kaydet', concept: 'Verileri kaydetme ve yorumlama', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Deney görevi, tartışma, araştırma, sonraki film', from: 'task', to: 'end', trFrom: [1700, 700],
    draw(ctx, t) { outro(ctx, t); }
  });
})();

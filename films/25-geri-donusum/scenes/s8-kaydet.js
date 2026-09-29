// SAHNE 8–9 — Kaydet + sınıflandırma adımları + değer (temizlik, elindekinin değerini bilmek) + Sıra sende + sonraki film
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const RED = W7.RED;
  const ITEMS = [
    ['Evsel atık: evde oluşan atıklar (katı atıklar).', PAL.ink],
    ['Geri dönüşür: kâğıt, karton, cam, metal, plastik, pil, kumaş.', '#3F7A3A'],
    ['Geri dönüşmez: kirli peçete, ıslak mendil, porselen.', PAL.ink],
    ['Besin artıkları → kompost.', '#8A5A34']
  ];
  const STEPS = ['Tanımla', 'Ayrıştır', 'Grupla', 'Etiketle'];
  function tulip(ctx, x, y, s, k) { // lale motifi
    if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= k;
    line(ctx, [0, 60], [0, -10], { w: 3.4, color: '#3F7A3A' });
    W7.leaf(ctx, -18, 36, 16, '#9CBF5A');
    const f = [[0, -10], [-22, -24], [-26, -58], [-12, -44], [0, -70], [12, -44], [26, -58], [22, -24], [0, -10]];
    P.fillPts(ctx, f, '#B5553F', 0.8); stroke(ctx, f, { w: 2.4, closed: true, dry: false });
    ctx.restore();
  }

  function page(ctx, t) {
    const sr = E.s('record'), sm = E.s('method'), sv = E.s('value');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 860);
    P.write(ctx, 'Gözlem Defteri · Evsel Atıklar', 1150, 165, E.seg(t, sr + 0.3, sr + 1.5), { size: 62, align: 'center' });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([760, 188], [1150, 198], [1540, 184], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.life });
    const listA = 1 - E.se(t, sm - 0.2, sm + 0.6);
    if (listA > 0) E.layer(ctx, listA, c => {
      ITEMS.forEach(([txt, col], i) => {
        const at = sr + 1.8 + i * 1.4, y = 285 + i * 92;
        const box = [[300, y - 42], [348, y - 44], [350, y + 4], [302, y + 6], [300, y - 42]];
        if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(c, 322, y - 20, 44, E.se(t, at + 1.0, at + 1.4), { w: 6 });
        P.write(c, txt, 380, y, E.seg(t, at, at + 1.2), { size: 44, color: col });
      });
      // kutu renkleri
      const bat = sr + 1.8 + 4 * 1.4;
      Object.keys(W7.BINS).forEach((k, i) => {
        const kk = E.se(t, bat + i * 0.25, bat + 0.5 + i * 0.25, 'out'); if (kk <= 0) return;
        const x = 400 + i * 230; W7.bin(c, k, x, 740, 0.42 * P.pop(kk));
        W7.fit(c, W7.BINS[k].name, x, 790, 200, 34);
      });
      P.write(c, '⚠  Kırık cam, porselen ve piller: bir yetişkin eşliğinde!', 300, 870, E.seg(t, bat + 1.8, bat + 3.0), { size: 40, color: RED });
    });
    // adımlar
    const chA = E.se(t, sm - 0.1, sm + 0.6) * (1 - E.se(t, sv - 0.2, sv + 0.5));
    if (chA > 0) E.layer(ctx, chA, c => {
      const xs = [400, 700, 1000, 1300], y = 470;
      STEPS.forEach((s, i) => {
        const at = sm + 0.1 + i * 0.8, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const r = 115 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 110 + i);
        P.fillPts(c, cp, '#FBF8F1'); stroke(c, cp, { w: 3.4, closed: true, seed: 120 + i });
        W7.fit(c, s, xs[i], y + 16, 200, 44);
        INK.label(c, String(i + 1), xs[i], y - 72, { size: 34, align: 'center', alpha: 0.5, weight: 700 });
        if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 122, y], [xs[i] - 122, y], ak, { w: 3, head: 13 }); }
      });
      const fk = E.se(t, sm + 3.4, sm + 4.0, 'out');
      if (fk > 0) {
        P.arrow(c, [1422, 470], [1484, 470], fk, { w: 3, head: 13 });
        const r = 118 * P.pop(fk); const cp = INK.wobble(circlePts(1610, 470, r, r, 50), 2, 131);
        P.fillPts(c, cp, '#E5EED6'); stroke(c, cp, { w: 4, closed: true, seed: 132, color: '#3F7A3A' });
        W7.fit(c, 'Sınıflandır', 1610, 486, 215, 46, { color: '#3F7A3A' });
      }
    });
    // değer kartı
    const vk = E.se(t, sv - 0.1, sv + 0.7, 'out');
    if (vk > 0) E.layer(ctx, vk, c => {
      tulip(c, 420, 520, 1.6, vk); tulip(c, 1500, 520, 1.6, vk);
      P.write(c, 'Büyüklerimiz der ki:', 960, 360, E.seg(t, sv + 0.3, sv + 1.3), { size: 44, weight: 400, align: 'center' });
      P.write(c, '“Temizliğe özen göster,', 960, 480, E.seg(t, sv + 1.2, sv + 2.6), { size: 70, align: 'center' });
      P.write(c, 'elindekinin değerini bil.”', 960, 575, E.seg(t, sv + 2.6, sv + 4.0), { size: 70, align: 'center' });
      P.drawOn(c, P.bez([640, 610], [960, 622], [1280, 604], 30), E.se(t, sv + 4.0, sv + 4.8), { w: 3.4, color: PAL.life });
    });
    const cheer = t > sm + 3.4;
    DAMLA.draw(ctx, {
      x: 1690, y: 1050, s: 1.05, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t) * (cheer && t < sv ? 1 + 0.05 * Math.abs(Math.sin((t - sm) * 5)) : 1), t, talk: E.talk(t), seed: 5,
      arms: cheer && t < sv ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer && t < sv ? null : 'notebook'
    });
  }

  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
    W7.room(ctx, t, { floor: 830, wx: 1480, night: false });
    W7.bin(ctx, 'mavi', 1150, 832, 0.6); W7.bin(ctx, 'sari', 1320, 832, 0.6); W7.bin(ctx, 'yesil', 1490, 832, 0.6); W7.bin(ctx, 'gri', 1660, 832, 0.6);
    DAMLA.draw(ctx, { x: 700, y: 836, s: 1.4, view: 'q3', expr: 'happy', look: [0.6, -0.4], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, t > sn ? 2.4 + 0.3 * Math.sin(t * 7) : 0.4]] });
    // görev kartı
    const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (ck > 0) E.layer(ctx, ck, c => {
      const card = [[330, 150], [1590, 140], [1600, 840], [340, 852], [330, 150]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.write(c, 'Sıra sende!', 960, 270, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: '#8A4A10' });
      P.write(c, 'Evindeki atıkları incele.', 960, 370, E.seg(t, sk + 1.2, sk + 2.4), { size: 52, align: 'center' });
      P.write(c, 'Her birine bir etiket yaz: Hangi kutuya gider?', 960, 440, E.seg(t, sk + 2.4, sk + 3.8), { size: 48, align: 'center' });
      const ex = [['gazete', 'mavi'], ['plastikSise', 'sari'], ['kavanoz', 'yesil'], ['icecek', 'gri'], ['muz', 'kahve'], ['mendil', 'siyah']];
      ex.forEach(([it, b], i) => {
        const k = E.se(t, sk + 3.6 + i * 0.35, sk + 4.1 + i * 0.35, 'out'); if (k <= 0) return;
        const x = 490 + i * 188, y = 600;
        W7.item(c, it, x, y, 0.6 * P.pop(k));
        const tag = W7.rr(x - 80, y + 70, 160, 50, 8); P.fillPts(c, tag, PAL.white); INK.wash(c, tag, W7.BINS[b].col, 0.55, 700 + i, { bleed: 0.6 }); stroke(c, tag, { w: 2, closed: true, dry: false });
        W7.fit(c, '?', x, y + 108, 120, 38, { color: b === 'siyah' ? PAL.white : PAL.ink });
      });
      INK.label(c, 'ipucu: ambalajdaki geri dönüşüm sembolüne bak', 960, 800, { size: 34, align: 'center', alpha: 0.65 * E.se(t, sk + 6, sk + 6.8) });
    });
    // sonraki
    const nk = E.se(t, sn, sn + 0.8);
    if (nk > 0) {
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.6, se + 0.3, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, 'Geri Dönüşüm Neden Önemli?', 960, 320, t, sn + 1.2, se + 0.3, { size: 76, align: 'center' });
      W7.recycle(ctx, 960, 440, 46, E.se(t, sn + 1.8, sn + 3.2), { w: 9 });
    }
    // bitiş kartı
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.9; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '25 · Atıklarımızı Tanıyalım', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.life });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.7.1 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }

  E.scene({ name: 'Kaydet', concept: 'Kaydetme; sınıflandırma; değer', from: 'record', to: 'value', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Görev ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540], draw(ctx, t) { outro(ctx, t); } });
})();

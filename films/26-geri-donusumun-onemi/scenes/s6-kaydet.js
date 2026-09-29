// SAHNE 7–8 — Kaydet + bilimsel süreç + performans görevi (Sıra sende) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const ITEMS = [
    ['Ürünler doğal kaynaklardan yapılır: ağaç, kum, maden, petrol.', PAL.ink],
    ['Kaynakların çoğu sınırlıdır; etkili kullanılmalıdır.', PAL.ink],
    ['Verilerim: 1 haftada 6,5 kg ayrıştırılmış atık.', PAL.ink],
    ['Geri dönüşüm ham maddeyi, enerjiyi ve alanı korur.', '#3F7A3A'],
    ['Benim payım: ayrıştır, israf etme!', '#3F7A3A']
  ];
  const STEPS = ['Tanımla', 'Veri topla', 'Kaydet', 'Değerlendir', 'Çıkarım yap'];
  function page(ctx, t) {
    const sr = E.s('record'), sm = E.s('method');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 860);
    P.write(ctx, 'Gözlem Defteri · Geri Dönüşümün Önemi', 1130, 165, E.seg(t, sr + 0.3, sr + 1.6), { size: 58, align: 'center' });
    if (t > sr + 1.6) P.drawOn(ctx, P.bez([640, 188], [1130, 198], [1620, 184], 30), E.se(t, sr + 1.6, sr + 2.1), { w: 3, color: PAL.life });
    const listA = 1 - E.se(t, sm - 0.2, sm + 0.6);
    if (listA > 0) E.layer(ctx, listA, c => {
      ITEMS.forEach(([txt, col], i) => {
        const at = sr + 1.8 + i * 1.6, y = 300 + i * 110;
        const box = [[300, y - 42], [348, y - 44], [350, y + 4], [302, y + 6], [300, y - 42]];
        if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 90 + i });
        P.check(c, 322, y - 20, 44, E.se(t, at + 1.0, at + 1.4), { w: 6 });
        P.write(c, txt, 380, y, E.seg(t, at, at + 1.2), { size: 44, color: col });
      });
    });
    const chA = E.se(t, sm - 0.1, sm + 0.6);
    if (chA > 0) E.layer(ctx, chA, c => {
      const xs = [380, 670, 960, 1250, 1540], y = 480;
      STEPS.forEach((s, i) => {
        const at = sm + 0.1 + i * 0.9, k = E.se(t, at, at + 0.6, 'out'); if (k <= 0) return;
        const r = 112 * P.pop(k); const cp = INK.wobble(circlePts(xs[i], y, r, r, 50), 2, 110 + i);
        P.fillPts(c, cp, i === 4 ? '#E5EED6' : '#FBF8F1'); stroke(c, cp, { w: 3.4, closed: true, seed: 120 + i, color: i === 4 ? '#3F7A3A' : PAL.ink });
        const [a, b] = s.split(' ');
        if (b) { W7.fit(c, a, xs[i], y - 4, 190, 40); W7.fit(c, b, xs[i], y + 42, 190, 40); } else W7.fit(c, a, xs[i], y + 16, 190, 40);
        INK.label(c, String(i + 1), xs[i], y - 70, { size: 34, align: 'center', alpha: 0.5, weight: 700 });
        if (i > 0) { const ak = E.se(t, at - 0.3, at + 0.2); if (ak > 0) P.arrow(c, [xs[i - 1] + 116, y], [xs[i] - 116, y], ak, { w: 3, head: 12 }); }
      });
      E.inkText(c, 'Bilim insanları da böyle çalışır!', 960, 760, t, sm + 4.8, 1e9, { size: 58, align: 'center' });
    });
    const cheer = t > sm + 4.6;
    DAMLA.draw(ctx, {
      x: 1690, y: 1050, s: 1.05, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
      arms: cheer ? [[-1, 2.7], [1, 2.7]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: cheer ? null : 'notebook'
    });
  }
  function outro(ctx, t) {
    const sk = E.s('task'), sn = E.s('next'), se = E.s('end');
    const hill = P.hillLine(E.W);
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(227,150,70,0.22)'); g.addColorStop(1, 'rgba(227,150,70,0.05)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    P.landscape(ctx, E.W, E.H, t, { hill });
    W7.tree(ctx, 1500, P.hillY(hill, 1500) + 6, 1.1, 2, t);
    ['mavi', 'sari', 'yesil', 'gri', 'kahve', 'siyah'].forEach((k, i) => W7.bin(ctx, k, 1080 + i * 95, P.hillY(hill, 1080 + i * 95) + 8, 0.4));
    const dx = 820, dy = P.hillY(hill, dx) + 4;
    DAMLA.draw(ctx, { x: dx, y: dy, s: 1.5, view: 'q3', expr: 'happy', look: [0.6, -0.5], blink: E.blink(t, 12), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, t > sn ? 2.4 + 0.3 * Math.sin(t * 7) : 0.4]] });
    const ck = Math.min(E.se(t, sk, sk + 0.7, 'out'), 1 - E.se(t, sn - 0.3, sn + 0.4));
    if (ck > 0) E.layer(ctx, ck, c => {
      const card = [[300, 150], [1620, 140], [1630, 860], [310, 872], [300, 150]];
      c.save(); c.shadowColor = 'rgba(40,30,20,0.3)'; c.shadowBlur = 30; P.fillPts(c, card, '#FAF6EC'); c.restore(); stroke(c, card, { w: 3, closed: true });
      P.write(c, 'Sıra sende!', 960, 260, E.seg(t, sk + 0.4, sk + 1.4), { size: 76, align: 'center', color: '#8A4A10' });
      INK.label(c, 'performans görevi', 960, 310, { size: 34, align: 'center', alpha: 0.6 * E.se(t, sk + 1.0, sk + 1.8) });
      const L = [
        ['1', 'Geri dönüştürülebilen bir madde seç:', 'kâğıt, cam, metal, plastik ya da pil'],
        ['2', 'Güvenilir kaynaklardan veri topla, kaydet:', 'kütüphane, TÜİK, Çevre Bakanlığı verileri'],
        ['3', 'Poster ya da sunum hazırla,', 'zamanında sun!']
      ];
      L.forEach(([n, a, b], i) => {
        const at = sk + 1.4 + i * 1.8, y = 420 + i * 140;
        const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const cp = circlePts(420, y - 14, 30 * P.pop(k), 30 * P.pop(k), 24); P.fillPts(c, cp, '#E5EED6'); stroke(c, cp, { w: 2.6, closed: true, color: '#3F7A3A' });
        W7.fit(c, n, 420, y, 40, 36, { color: '#3F7A3A' });
        P.write(c, a, 480, y, E.seg(t, at + 0.2, at + 1.2), { size: 44 });
        P.write(c, b, 480, y + 52, E.seg(t, at + 0.8, at + 1.8), { size: 36, weight: 400 });
      });
      P.icon.books(c, 1440, 470, 0.8); P.icon.laptop(c, 1440, 700, 0.8);
    });
    if (t > sn) {
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 200, t, sn + 0.6, se + 0.3, { size: 50, align: 'center', weight: 400 });
      E.inkText(ctx, 'Atık Yönetimi ve Sıfır Atık', 960, 290, t, sn + 1.2, se + 0.3, { size: 76, align: 'center' });
    }
    const ek = E.se(t, se, se + 0.8);
    if (ek > 0) E.layer(ctx, ek, c => {
      c.fillStyle = PAL.paper; c.globalAlpha = 0.9; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
      INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
      INK.label(c, '26 · Geri Dönüşüm Neden Önemli?', 960, 515, { size: 56, weight: 700, align: 'center' });
      P.drawOn(c, P.bez([600, 545], [960, 556], [1320, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.life });
      INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.7.2 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
      INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
      DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    });
  }
  E.scene({ name: 'Kaydet', concept: 'Kaydetme ve bilimsel süreç', from: 'record', to: 'method', trFrom: [960, 540], draw(ctx, t) { page(ctx, t); } });
  E.scene({ name: 'Sıra sende', concept: 'Performans görevi ve sonraki konu', from: 'task', to: 'end', trFrom: [960, 540], draw(ctx, t) { outro(ctx, t); } });
})();

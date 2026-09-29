// SAHNE 7 — Kaydet · Sıra sende (pH cetveli posteri) · Sıradaki: seri ve paralel bağlama · bitiş
(function () {
  const { PAL, line, circlePts } = INK;
  const U = U5;
  const ITEMS = [
    'pH cetveli 0–14: < 7 asit, = 7 nötr, > 7 baz.',
    '7’den 0’a asitlik, 7’den 14’e bazlık artar.',
    'Limon ≈ 2, sirke ≈ 3, saf su 7, sabun ≈ 10, çamaşır suyu ≈ 12,5.',
    'Asitler: metaller ve mermerle tepkimeye girer.',
    'Bazlar: cam, porselen, seramikle tepkimeye girer.',
    'Temizlik ürünleri asla karıştırılmaz!'
  ];
  function bulb(ctx, x, y, s, on) {
    if (on > 0) { const g = ctx.createRadialGradient(x, y, 5, x, y, 110 * s); g.addColorStop(0, `rgba(255,214,120,${0.6 * on})`); g.addColorStop(1, 'rgba(255,214,120,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 110 * s, 0, 7); ctx.fill(); }
    const b = circlePts(x, y, 44 * s, 50 * s, 30); P.fillPts(ctx, b, on > 0 ? '#FFF1C4' : '#F4F1EA', 0.95); INK.stroke(ctx, b, { w: 3, closed: true, dry: false });
    const base = U.rect(x - 22 * s, y + 46 * s, x + 22 * s, y + 80 * s); P.fillPts(ctx, base, '#8C9198'); INK.stroke(ctx, base, { w: 2.4, closed: true, dry: false });
  }
  E.scene({
    name: 'Kaydet', concept: 'Gözlem defterine kayıt', from: 'record', to: 'record', trFrom: [960, 540],
    draw(ctx, t) {
      U.record(ctx, t, E.s('record'), 'Gözlem Defteri · pH ve Etkiler', ITEMS, { step: 1.0, lh: 84, size: 40, colors: [null, null, PAL.water, U.ACID, U.BASE, U.RED] });
      U.damla(ctx, t, { x: 1650, y: 1000, s: 0.95, flip: true, look: [-0.7, 0.3], arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: 'notebook' });
    }
  });
  E.scene({
    name: 'Sıra sende', concept: 'pH cetveli posteri; sıradaki film', from: 'task', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const st = E.s('task'), sn = E.s('next');
      U.task(ctx, t, st, sn + 0.2, 'Sıra sende!', ['Evdeki ürünlerin etiketlerinde pH değerini ara.', '0–14 arası renkli bir pH cetveli posteri çiz.', 'Ürünleri cetvele yerleştir: asit, nötr, baz.', 'Ürünlerin tadına, kokusuna bakma; karıştırma!'], { x: 200, y: 190, w: 1220, h: 540, lh: 76, step: 0.9, colors: [null, null, null, U.RED] });
      const tk = Math.min(E.se(t, st, st + 0.7), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (tk > 0) E.layer(ctx, tk, c => U.damla(c, t, { x: 1660, y: 880, s: 1.2, flip: true, expr: 'happy', look: [-0.8, -0.2], arms: [[-1, 2.2 + 0.2 * Math.sin(t * 6)], [1, 0.4]] }));
      const nk = E.se(t, sn, sn + 0.8);
      if (nk > 0) E.layer(ctx, nk, c => {
        INK.label(c, 'Sıradaki gözlem:', 960, 230, { size: 50, align: 'center' });
        INK.label(c, 'Seri ve Paralel Bağlama', 960, 330, { size: 76, align: 'center', weight: 700 });
        INK.label(c, 'Hangi ampul daha parlak yanar?', 960, 410, { size: 42, align: 'center', alpha: 0.8 });
        const on = 0; // yanıt sonraki filmde: burada ampuller yanmaz
        // iki devre taslağı: seri (solda), paralel (sağda)
        [[560, 'seri'], [1260, 'paralel']].forEach(([cx, nm], i) => {
          const r = U.rect(cx - 200, 520, cx + 200, 800); INK.stroke(c, r, { w: 3, closed: true, dry: false, seed: 6600 + i });
          if (i === 0) { bulb(c, cx - 80, 520, 0.7, on * 0.5); bulb(c, cx + 80, 520, 0.7, on * 0.5); }
          else { line(c, [cx - 200, 660], [cx + 200, 660], { w: 3, dry: false }); bulb(c, cx, 520, 0.7, on); bulb(c, cx, 660, 0.7, on); }
          const bat = U.rect(cx - 40, 785, cx + 40, 815); P.fillPts(c, bat, '#E3A03A'); INK.stroke(c, bat, { w: 2.4, closed: true, dry: false });
          U.txt(c, nm, cx, 870, { size: 38, align: 'center' });
        });
        U.txt(c, '?', 910, 700, { size: 90, align: 'center', color: PAL.water });
        U.damla(c, t, { x: 1720, y: 860, s: 0.9, flip: true, expr: 'curious', look: [-0.9, 0.1], arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
      U.end(ctx, t, '17 · pH Cetveli', 'FB.8.5.7 · FB.8.5.8');
    }
  });
})();

// SAHNE 8 — Kaydet · Sıra sende (kart eşleştirme oyunu) · Sıradaki: 18 Karışımlar · Bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  const ITEMS = [
    [{ t: 'Formül = element sembolleri + atom sayıları' }],
    [{ t: 'Alt sayı atom sayısıdır; 1 yazılmaz: ' }, { f: 'H2O' }],
    [{ t: 'Her büyük harf yeni bir element: ' }, { f: 'NaCl' }, { t: ' (1 : 1)' }],
    [{ f: 'CO' }, { t: ' ≠ ' }, { f: 'CO2' }, { t: ' : küçük sayı değişirse madde değişir' }],
    [{ t: 'Molekül yapılı elementler de formülle yazılır: ' }, { f: 'O2' }, { t: ', ' }, { f: 'N2' }]
  ];
  function page(ctx, t) {
    const sr = E.s('record');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Bileşik formülleri', 290, 205, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 227], [700, 239], [1180, 223], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach((it, i) => {
      const at = sr + 2.0 + i * 1.8, y = 325 + i * 108;
      const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 90 + i });
      P.check(ctx, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
      K.rich(ctx, it, 385, y, 48, { k: E.seg(t, at, at + 1.2), subColor: K.SUB });
    });
    F17.damla(ctx, t, { x: 1640, y: 1000, s: 1.0, view: 'q3', flip: true, look: [-0.7, 0.3], prop: 'notebook', arms: [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]] });
  }
  function nextPart(ctx, t) {
    const sn = E.s('next');
    K.bench(ctx, -40, 1960, 860, 3810);
    K.beaker(ctx, 1150, 860, 210, 250, { level: 0.65, t, seed: 11, tint: ['#E8E2D0', 0.1] });
    K.beaker(ctx, 1450, 860, 210, 250, { level: 0.65, t, seed: 12, sand: 0.5, cloud: 0.4 });
    K.beaker(ctx, 1750, 860, 210, 250, { level: 0.7, t, seed: 13, oil: 0.3 });
    E.inkText(ctx, 'şekerli su', 1150, 560, t, sn + 1.8, 1e9, { size: 36, align: 'center' });
    E.inkText(ctx, 'kum + su', 1450, 560, t, sn + 2.2, 1e9, { size: 36, align: 'center' });
    E.inkText(ctx, 'zeytinyağı + su', 1750, 560, t, sn + 2.6, 1e9, { size: 36, align: 'center' });
    E.inkText(ctx, 'Sıradaki gözlem:', 960, 230, t, sn + 0.5, 1e9, { size: 50, align: 'center', weight: 400 });
    E.inkText(ctx, '18 · Karışımlar', 960, 320, t, sn + 1.0, 1e9, { size: 76, align: 'center' });
    F17.damla(ctx, t, { x: 520, y: 860, s: 1.35, view: 'q3', expr: 'happy', look: [0.8, -0.2], arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
  }
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sy = E.s('yourturn');
      page(ctx, t);
      K.task(ctx, t, sy, E.e('yourturn'), 'Sıra sende!', [
        [{ t: 'Şu bileşikler için model, formül ve isim kartları hazırla:' }],
        [{ t: 'su, sodyum klorür, karbondioksit, karbonmonoksit, amonyak,' }],
        [{ t: 'kükürt dioksit, hidrojen klorür, sülfürik asit,' }],
        [{ t: 'sodyum hidroksit, glikoz.' }],
        [{ t: 'Arkadaşlarınla eşleştirme oyunu oynayın!' }]
      ], { x: 220, y: 250, w: 1480, h: 600, size: 44, lh: 76, step: 0.9 });
    }
  });
  E.scene({
    name: 'Sıradaki: Karışımlar', concept: 'Sonraki konu', from: 'next', to: 'end', trFrom: [1450, 700],
    draw(ctx, t) { nextPart(ctx, t); K.end(ctx, t, '17 · Bileşiklerin Dili: Formüller', 'FB.7.5.7'); }
  });
})();

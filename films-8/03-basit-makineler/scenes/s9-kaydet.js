// SAHNE 9 — Kaydet + Sıra sende (günlük yaşamda basit makine avı) + sonraki film: kendi modelini tasarlama
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F8M;
  const ITEMS = [
    'Basit makine kuvvetin büyüklüğünü, yönünü ya da yolunu değiştirir.',
    'Kaldıraç, makaralar, eğik düzlem, vida, çıkrık, çark ve kasnak.',
    'Kuvvetten kazanırsak yoldan kaybederiz.',
    'Basit makineler işten kazandırmaz; enerji korunur.',
    'Bileşik makine: birlikte çalışan basit makineler.'
  ];
  function page(ctx, t) {
    const sr = E.s('record'), su = E.s('rule');
    ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
    P.notebook(ctx, 150, 60, 1620, 850);
    P.write(ctx, 'Gözlem Defteri · Basit Makineler', 760, 180, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
    if (t > sr + 1.5) P.drawOn(ctx, P.bez([756, 202], [1170, 214], [1630, 198], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
    ITEMS.forEach((txt, i) => {
      const at = sr + 1.6 + i * 1.1, y = 300 + i * 100;
      const box = [[300, y - 42], [346, y - 44], [348, y + 2], [302, y + 4], [300, y - 42]];
      if (t > at - 0.3) stroke(ctx, box, { w: 2.4, closed: true, seed: 3900 + i });
      P.check(ctx, 322, y - 20, 42, E.se(t, at + 0.8, at + 1.2), { w: 6 });
      P.write(ctx, txt, 380, y, E.seg(t, at, at + 1.1), { size: 46 });
      if ((i === 2 || i === 3) && t > su + 0.4) P.drawOn(ctx, P.bez([378, y + 14], [900, y + 22], [1440, y + 12], 30), E.se(t, su + 0.4 + (i - 2) * 0.8, su + 1.2 + (i - 2) * 0.8), { w: 5, color: PAL.light });
    });
    DAMLA.draw(ctx, { x: 1640, y: 1010, s: 1.05, view: 'q3', flip: true, expr: t > su ? 'happy' : 'neutral', look: [-0.7, 0.3], blink: E.blink(t, 11), squash: E.breath(t), t, seed: 5, arms: t > su + 2 ? [[-1, 2.6], [1, 2.6]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > su + 2 ? null : 'notebook' });
  }
  function task(ctx, t) {
    const st = E.s('task');
    F.card(ctx, 260, 170, 1660, 860, { seed: 3920 });
    P.write(ctx, 'Sıra sende!', 330, 270, E.seg(t, st + 0.3, st + 1.2), { size: 72, color: F.FORCE });
    P.write(ctx, 'Evinde ya da okulunda 5 basit makine bul.', 330, 360, E.seg(t, st + 1.0, st + 2.2), { size: 46 });
    const cols = [360, 900, 1300, 1600], rows = 4, y0 = 420, rh = 80;
    const k = E.se(t, st + 2.0, st + 2.8);
    if (k > 0) {
      ctx.save(); ctx.globalAlpha *= k;
      P.fillPts(ctx, F.rect(cols[0], y0, cols[3], y0 + rh), PAL.light, 0.25);
      for (let r = 0; r <= rows; r++) line(ctx, [cols[0], y0 + r * rh], [cols[3], y0 + r * rh], { w: r <= 1 ? 2.6 : 1.6, dry: false, seed: 3930 + r });
      cols.forEach((x, i) => line(ctx, [x, y0], [x, y0 + rows * rh], { w: 1.8, dry: false, seed: 3940 + i }));
      F.txt(ctx, 'araç', 380, y0 + 55, { size: 40 }); F.txt(ctx, 'basit makine türü', 920, y0 + 55, { size: 40 }); F.txt(ctx, 'ne kazandırır?', 1320, y0 + 55, { size: 36 });
      ctx.restore();
    }
    const ke = E.se(t, st + 3.0, st + 3.8);
    if (ke > 0) { ctx.save(); ctx.globalAlpha *= ke; F.txt(ctx, 'kapı kolu', 380, y0 + rh + 55, { size: 38, color: PAL.water }); F.txt(ctx, 'çıkrık', 920, y0 + rh + 55, { size: 38, color: PAL.water }); F.txt(ctx, 'kuvvetten', 1320, y0 + rh + 55, { size: 38, color: PAL.water }); F.txt(ctx, 'örnek satır', 1600, y0 - 14, { size: 30, align: 'right', alpha: 0.6 }); ctx.restore(); }
    INK.label(ctx, 'Arkadaşlarınla paylaş: hangisi en çok işine yarıyor?', 960, 820, { size: 36, align: 'center', alpha: 0.75 * E.se(t, st + 4, st + 4.8) });
  }
  function teaser(ctx, t) {
    const sn = E.s('next');
    // plan kâğıdı (mavi kâğıt yerine defter sayfası) üzerinde makara taslağı
    F.card(ctx, 980, 250, 1680, 800, { seed: 3950, fill: '#F4F1E6' });
    for (let x = 1010; x < 1670; x += 40) line(ctx, [x, 262], [x, 790], { w: 0.8, alpha: 0.25, color: PAL.water, dry: false, seed: x });
    for (let y = 280; y < 790; y += 40) line(ctx, [990, y], [1670, y], { w: 0.8, alpha: 0.25, color: PAL.water, dry: false, seed: y + 7 });
    const k = E.se(t, sn + 0.8, sn + 2.4);
    ctx.save(); ctx.globalAlpha *= k;
    F.ceiling(ctx, 1150, 1500, 340, 3960);
    F.rope(ctx, [1275, 340], [1275, 540]); F.rope(ctx, [1385, 540], [1385, 360]); F.ropeArc(ctx, 1330, 540, 55, 0, Math.PI);
    F.pulley(ctx, 1330, 540, 55, t, { seed: 3961 });
    const sy = F.strap(ctx, 1330, 540, 55, 1, 10); const by = F.hook(ctx, 1330, sy, 1); F.block(ctx, 1330, by + 90, 100, 90, '', { seed: 3962 });
    F.txt(ctx, '?', 1560, 480, { size: 90, color: F.FORCE });
    ctx.restore();
    DAMLA.draw(ctx, { x: 680, y: 860, s: 1.3, view: 'q3', expr: 'determined', look: [0.8, -0.2], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.4], [1, [90, -150]]], prop: null });
    P.icon.pencil(ctx, 800, 690, 0.8, -0.6);
    E.inkText(ctx, 'Sıradaki sayfa:', 960, 170, t, sn + 0.4, E.s('end') + 0.4, { size: 46, align: 'center', weight: 400 });
    E.inkText(ctx, 'Kendi Makinemi Tasarlıyorum', 480, 330, t, sn + 1.0, E.s('end') + 0.4, { size: 58, align: 'center' });
  }
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme', from: 'record', to: 'rule', trFrom: [960, 540],
    draw(ctx, t) { page(ctx, t); }
  });
  E.scene({
    name: 'Sıra sende', concept: 'Günlük yaşamda basit makine avı', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) { task(ctx, t); }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Kendi modelini tasarlama', from: 'next', to: 'end', trFrom: [1330, 540],
    draw(ctx, t) { teaser(ctx, t); F.endCard(ctx, t, '3 · İşi Kolaylaştıran Sırlar: Basit Makineler', 'FB.8.2.1'); }
  });
})();

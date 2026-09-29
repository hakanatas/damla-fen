// SAHNE 7 — Çözünme hızı: çayda şeker sorusu · erime ≠ çözünme · bağımsız/bağımlı/kontrol edilen değişkenler (FB.7.5.9 a, b, c)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const K = K7;
  function teaPart(ctx, t) {
    const st = E.s('tea'), sm = E.s('melt');
    K.bench(ctx, -40, 1960, 860, 6001);
    // çay bardağı (ince belli)
    const cx = 1300, by = 860;
    const glass = [[cx - 80, by - 300], [cx - 55, by - 170], [cx - 70, by - 10], [cx + 70, by - 10], [cx + 55, by - 170], [cx + 80, by - 300]];
    const liq = [[cx - 74, by - 270], [cx - 55, by - 170], [cx - 66, by - 16], [cx + 66, by - 16], [cx + 55, by - 170], [cx + 74, by - 270]];
    P.fillPts(ctx, liq, '#B5553F', 0.55); INK.wash(ctx, liq, '#8A3A1A', 0.35, 6002, { bleed: 1, blooms: 0 });
    const drop = E.se(t, st + 1.0, st + 2.0, 'in');
    const cy = E.lerp(by - 420, by - 60, drop), s = 44 * (1 - 0.6 * E.se(t, st + 2.5, E.e('tea')));
    if (cy < by - 280) { P.fillPts(ctx, [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]], '#FFFDF6'); stroke(ctx, [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]], { w: 2.4, closed: true, dry: false }); }
    else { ctx.save(); ctx.globalAlpha = 0.85; P.fillPts(ctx, [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy + s / 2]], '#F6E7C8'); ctx.restore(); }
    stroke(ctx, glass, { w: 3.2, seed: 6003 });
    K.steam(ctx, cx, by - 300, 120, 100, 0.7, t, 6004);
    K.watch(ctx, 1600, 640, 1.1, (t - st) / 8 % 1);
    E.inkText(ctx, 'ne kadar sürede çözünür?', 1400, 250, t, st + 3.0, sm, { size: 48, align: 'center', color: K.AMBER });
    // erime ≠ çözünme
    const mk = E.se(t, sm + 0.2, sm + 0.8);
    if (mk > 0) E.layer(ctx, mk, c => {
      K.card(c, 1060, 190, 780, 290, { seed: 6010 });
      P.write(c, 'şeker çayda erir', 1100, 270, E.seg(t, sm + 0.5, sm + 1.3), { size: 46 });
      c.save(); c.font = '700 46px Kalam'; const ww = c.measureText('şeker çayda erir').width; c.restore(); P.drawOn(c, [[1094, 256], [1100 + ww + 8, 252]], E.se(t, sm + 1.4, sm + 1.9), { w: 6, color: K.RED });
      P.write(c, 'şeker çayda çözünür ✓', 1100, 350, E.seg(t, sm + 2.0, sm + 2.8), { size: 46, color: PAL.water });
      P.write(c, 'erime: ısı alan katı → sıvı (buz → su)', 1100, 435, E.seg(t, sm + 3.4, sm + 4.6), { size: 36, alpha: 0.85 });
    });
    F18.damla(ctx, t, { x: 520, y: 860, s: 1.35, look: [0.8, -0.2], expr: t > st + 3 ? 'thinking' : 'curious', arms: t > st + 3 ? [[-1, 0.35], [1, [30, -86]]] : [[-1, 0.35], [1, 1.2]] });
  }
  const ICONS = [
    ['tanecik boyutu', (c, x, y) => { P.fillPts(c, [[x - 70, y - 20], [x - 26, y - 20], [x - 26, y + 24], [x - 70, y + 24]], '#FFFDF6'); stroke(c, [[x - 70, y - 20], [x - 26, y - 20], [x - 26, y + 24], [x - 70, y + 24], [x - 70, y - 20]], { w: 2.4, closed: true, dry: false }); INK.label(c, '↔', x, y + 12, { size: 34, weight: 700, align: 'center' }); for (let i = 0; i < 12; i++) { c.save(); c.fillStyle = '#FFFDF6'; c.strokeStyle = PAL.ink; c.lineWidth = 1; c.beginPath(); c.rect(x + 30 + (i % 4) * 11, y + 4 + Math.floor(i / 4) * 9 - (i % 3) * 2, 6, 6); c.fill(); c.stroke(); c.restore(); } }],
    ['karıştırma', (c, x, y, t) => { K.beaker(c, x, y + 50, 90, 100, { level: 0.6, t, seed: 70, spoon: 1 }); }],
    ['suyun sıcaklığı', (c, x, y) => { const b = [[x - 8, y - 50], [x + 8, y - 50], [x + 8, y + 20], [x - 8, y + 20]]; stroke(c, b.concat([b[0]]), { w: 2.4, closed: true }); P.fillPts(c, circlePts(x, y + 32, 15, 15, 20), K.HEAT, 0.85); stroke(c, circlePts(x, y + 32, 15, 15, 20), { w: 2.4, closed: true }); P.fillPts(c, [[x - 3, y - 20], [x + 3, y - 20], [x + 3, y + 20], [x - 3, y + 20]], K.HEAT, 0.85); }]
  ];
  function varPart(ctx, t) {
    const sv = E.s('vars'), sc = E.s('control');
    INK.label(ctx, 'bağımsız değişkenler (değiştirdiğim)', 560, 225, { size: 40, weight: 700, align: 'center', alpha: 0.8 * E.se(t, sv + 0.4, sv + 1.0) });
    ICONS.forEach(([n, f], i) => {
      const k = E.se(t, sv + 0.6 + i * 1.2, sv + 1.2 + i * 1.2, 'out'); if (k <= 0) return;
      const y = 340 + i * 175;
      E.layer(ctx, k, c => { K.card(c, 250, y - 70, 620, 145, { seed: 6100 + i }); f(c, 360, y, t); INK.label(c, n, 480, y + 16, { size: 46, weight: 700 }); });
      P.arrow(ctx, [890, y], [1120, 520], E.se(t, sv + 5.0 + i * 0.3, sv + 5.8 + i * 0.3), { w: 3, head: 13, bend: (i - 1) * -20 });
    });
    const dk = E.se(t, sv + 5.6, sv + 6.4, 'out');
    if (dk > 0) E.layer(ctx, dk, c => { K.card(c, 1140, 440, 520, 170, { seed: 6110, tint: PAL.light, tintA: 0.3 }); INK.label(c, 'çözünme hızı', 1400, 530, { size: 56, weight: 700, align: 'center' }); INK.label(c, 'bağımlı değişken (gözlediğim)', 1400, 585, { size: 32, align: 'center', alpha: 0.75 }); });
    // kontrol edilen değişkenler
    ['aynı miktar su', 'aynı miktar şeker', 'aynı kap'].forEach((n, i) => {
      const at = sc + 1.0 + i * 1.2, k = E.se(t, at, at + 0.5); if (k <= 0) return;
      const x = 1180, y = 750 + i * 64;
      ctx.save(); ctx.globalAlpha *= k;
      const lk = [[x - 16, y - 24], [x + 16, y - 24], [x + 16, y + 2], [x - 16, y + 2], [x - 16, y - 24]]; P.fillPts(ctx, lk, PAL.water, 0.5); stroke(ctx, lk, { w: 2.2, closed: true, dry: false }); stroke(ctx, P.arc(x, y - 24, 10, Math.PI, 2 * Math.PI, 12), { w: 2.4, dry: false });
      ctx.restore();
      P.write(ctx, n, x + 36, y, E.seg(t, at, at + 0.8), { size: 42 });
    });
    E.inkText(ctx, 'kontrol edilen değişkenler', 1400, 686, t, sc + 0.4, 1e9, { size: 36, align: 'center', color: PAL.water, weight: 700 });
  }
  E.scene({
    name: 'Çözünme hızı', concept: 'Erime ≠ çözünme; değişkenleri belirleme', from: 'tea', to: 'control', trFrom: [1300, 600],
    draw(ctx, t) {
      const sv = E.s('vars');
      const a1 = 1 - E.se(t, sv - 0.2, sv + 0.4), a2 = E.se(t, sv + 0.1, sv + 0.7);
      if (a1 > 0) E.layer(ctx, a1, c => teaPart(c, t));
      if (a2 > 0) E.layer(ctx, a2, c => varPart(c, t));
    }
  });
})();

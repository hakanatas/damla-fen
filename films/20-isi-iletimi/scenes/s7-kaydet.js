// SAHNE 7 — Kaydet + Sıra sende (evdeki eşyaları sınıflandırma) + sonraki: ısı yalıtımı modeli + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F20, RED = F.RED;
  const ITEMS = [
    'Isı, tanecikten taneciğe aktarılır: ısı iletimi.',
    'Isı iletkenleri: demir, bakır, alüminyum gibi metaller.',
    'Isı yalıtkanları: tahta, plastik, yün, mantar, hava.',
    'Kanıt: metal çubuklardaki boncuklar önce düştü.',
    'Binalarda ısı yalıtımı yakıt ve para tasarrufu sağlar.'
  ];
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme ve Sıra sende', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 850);
      P.write(ctx, 'Gözlem Defteri · Isı İletimi', 290, 180, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 200], [640, 212], [1000, 196], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
      const la = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        ITEMS.forEach((txt, i) => {
          const at = sr + 1.4 + i * 1.25, y = 300 + i * 96;
          const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
          if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 3810 + i });
          P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
          P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 46 });
        });
        const wat = sr + 1.4 + 5 * 1.25;
        P.write(c, '⚠  Sıcak cisimlere asla dokunma!', 300, 300 + 5 * 96, E.seg(t, wat, wat + 1.2), { size: 46, color: RED });
      });
      const yk = E.se(t, sy, sy + 0.7);
      if (yk > 0) E.layer(ctx, yk, c => {
        P.write(c, 'Sıra sende!', 300, 300, E.seg(t, sy + 0.4, sy + 1.4), { size: 72, color: '#8A4A10' });
        P.write(c, 'Evindeki eşyaları iki gruba ayır, etiketle.', 300, 380, E.seg(t, sy + 1.2, sy + 2.8), { size: 48 });
        // empty table to fill
        const X = [300, 820, 1340], Y = 450;
        const tk = E.se(t, sy + 2.6, sy + 3.4);
        if (tk > 0) {
          c.save(); c.globalAlpha = tk;
          stroke(c, [[X[0], Y], [X[2], Y - 4], [X[2] + 3, Y + 380], [X[0] + 2, Y + 382], [X[0], Y]], { w: 3, closed: true, seed: 3820 });
          line(c, [X[1], Y], [X[1] + 2, Y + 380], { w: 2.6, dry: false }); line(c, [X[0], Y + 70], [X[2], Y + 68], { w: 2.6, dry: false });
          INK.label(c, 'ısı iletkeni', (X[0] + X[1]) / 2, Y + 50, { size: 42, weight: 700, align: 'center', color: F.HEAT, rot: 0 });
          INK.label(c, 'ısı yalıtkanı', (X[1] + X[2]) / 2, Y + 50, { size: 42, weight: 700, align: 'center', color: PAL.water, rot: 0 });
          for (let i = 1; i < 4; i++) { c.globalAlpha = tk * 0.3; line(c, [X[0] + 10, Y + 70 + i * 78], [X[2] - 10, Y + 70 + i * 78], { w: 1.4, dry: false }); }
          c.globalAlpha = tk;
          [['?', 0, 0], ['?', 1, 0], ['?', 0, 1], ['?', 1, 1]].forEach(([q, col, row], i) => { const kk = E.se(t, sy + 4 + i * 0.5, sy + 4.5 + i * 0.5); if (kk > 0) INK.label(c, '...', (X[col] + X[col + 1]) / 2, Y + 128 + row * 78, { size: 44, align: 'center', alpha: kk * 0.6 }); });
          c.restore();
        }
      });
      const cheer = t > sy + 6.5;
      DAMLA.draw(ctx, {
        x: 1640, y: 1040, s: 1.1, view: 'q3', flip: true, expr: cheer ? 'happy' : 'neutral', look: [-0.7, 0.2], blink: E.blink(t, 21), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t > sy ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.1]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > sy ? null : 'notebook'
      });
    }
  });
  E.scene({
    name: 'Sıradaki: Isı yalıtımı', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [960, 600],
    draw(ctx, t) {
      const sn = E.s('next'), se = E.s('end');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      const tb = [[200, 820], [1720, 814], [1730, 860], [190, 866], [200, 820]]; P.fillPts(ctx, tb, '#E3D3B3'); wash(ctx, tb, '#8A6A45', 0.4, 3850); stroke(ctx, tb, { w: 3, closed: true, seed: 3851 });
      // shoebox house model with a thermometer
      const hx = 1180, hb = 818;
      const box = [[hx - 190, hb], [hx + 190, hb], [hx + 190, hb - 230], [hx - 190, hb - 230], [hx - 190, hb]];
      P.fillPts(ctx, box, '#D8BF96'); wash(ctx, box, '#8A6A45', 0.35, 3852); stroke(ctx, box, { w: 3.2, closed: true, seed: 3853 });
      const roof = [[hx - 220, hb - 230], [hx, hb - 380], [hx + 220, hb - 230]]; P.fillPts(ctx, roof, '#C98E6A'); stroke(ctx, roof.concat([roof[0]]), { w: 3, closed: true, seed: 3854 });
      const win = [[hx - 60, hb - 170], [hx + 60, hb - 170], [hx + 60, hb - 80], [hx - 60, hb - 80], [hx - 60, hb - 170]]; P.fillPts(ctx, win, '#F6E3C4'); stroke(ctx, win, { w: 2.4, closed: true });
      line(ctx, [hx + 120, hb - 60], [hx + 130, hb - 330], { w: 8, seed: 3855 }); INK.inkDot(ctx, hx + 120, hb - 56, 9, { color: '181,85,63' });
      const q = E.se(t, sn + 1.5, sn + 3);
      if (q > 0) INK.label(ctx, '?', hx - 260, hb - 300, { size: 90, weight: 700, color: '#8A4A10', alpha: q, align: 'center' });
      DAMLA.draw(ctx, { x: 600, y: 820, s: 1.35, view: 'q3', expr: 'curious', look: [0.8, -0.4], blink: E.blink(t, 23), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.3 + 0.2 * Math.sin(t * 3)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.6, se + 0.2, { size: 48, align: 'center', weight: 400 });
      E.inkText(ctx, '21 · Sıcaklığı Koruyan Ev: Isı Yalıtımı', 960, 270, t, sn + 1.2, se + 0.2, { size: 66, align: 'center' });
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '20 · Isıyı İleten, İletmeyen', 960, 515, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
        INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.5.5 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();

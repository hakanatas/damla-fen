// SAHNE 8 — Sıra sende (bir hafta gölge ölçümü, rol oynama · E2.5, SDB2.2) + sonraki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  const F = F81;
  function task(ctx, t) {
    const st = E.s('task');
    F.card(ctx, 200, 165, 1400, 720, { seed: 160 });
    P.write(ctx, 'Sıra sende!', 280, 260, E.seg(t, st + 0.2, st + 1.0), { size: 72, color: '#8A4A10' });
    P.drawOn(ctx, P.bez([276, 282], [470, 292], [670, 278], 20), E.se(t, st + 1.0, st + 1.5), { w: 3, color: PAL.light });
    P.write(ctx, '1. Bir hafta boyunca aynı yerde, öğle vakti', 280, 365, E.seg(t, st + 1.2, st + 2.4), { size: 44 });
    P.write(ctx, '    bir çubuğun gölge boyunu ölç.', 280, 422, E.seg(t, st + 2.2, st + 3.2), { size: 44 });
    // mini tablo
    const tk = E.se(t, st + 3.0, st + 3.8);
    if (tk > 0) {
      ctx.save(); ctx.globalAlpha *= tk;
      const x0 = 340, y0 = 460, cw = [170, 150, 230];
      const hd = ['Gün', 'Saat', 'Gölge (cm)'];
      let x = x0; hd.forEach((h, i) => { INK.label(ctx, h, x + 12, y0 + 40, { size: 32, weight: 700 }); x += cw[i]; });
      for (let r = 0; r <= 3; r++) stroke(ctx, [[x0, y0 + 55 + r * 42], [x0 + 550, y0 + 56 + r * 42]], { w: 1.8, dry: false, seed: 170 + r, alpha: 0.7 });
      stroke(ctx, [[x0 + 170, y0 + 10], [x0 + 170, y0 + 181]], { w: 1.8, dry: false, seed: 175, alpha: 0.7 });
      stroke(ctx, [[x0 + 320, y0 + 10], [x0 + 320, y0 + 181]], { w: 1.8, dry: false, seed: 176, alpha: 0.7 });
      ['1.', '2.', '…'].forEach((d, i) => INK.label(ctx, d, x0 + 12, y0 + 90 + i * 42, { size: 30, alpha: 0.7 }));
      ctx.restore();
    }
    P.write(ctx, '2. Kaydet ve yorumla: Gölge nasıl değişti? Neden?', 280, 720, E.seg(t, st + 4.2, st + 5.4), { size: 44 });
    P.write(ctx, '3. Rol oyunu: Güneş + eğik eksenli Dünya!', 280, 790, E.seg(t, st + 5.6, st + 6.8), { size: 44, color: PAL.water });
    // çubuk çizimi
    const sk = E.se(t, st + 3.2, st + 4.0);
    if (sk > 0) { ctx.save(); ctx.globalAlpha *= sk;
      stroke(ctx, [[1220, 600], [1560, 602]], { w: 3, seed: 180 });
      F.stick(ctx, 1290, 600, 150, 190, 1, { w: 7 });
      P.arrow(ctx, [1290, 630], [1480, 630], 1, { w: 2.4 }); P.arrow(ctx, [1480, 630], [1290, 630], 1, { w: 2.4 });
      INK.label(ctx, 'gölge boyu', 1385, 672, { size: 32, align: 'center' });
      ctx.restore(); }
    INK.label(ctx, 'Güneş’e asla doğrudan bakma!', 1500, 850, { size: 34, weight: 700, align: 'right', color: F.RED, alpha: E.se(t, st + 3.8, st + 4.4) });
  }
  function next(ctx, t) {
    const sn = E.s('next');
    const g = ctx.createLinearGradient(0, 0, 0, E.H); g.addColorStop(0, 'rgba(90,100,120,0.28)'); g.addColorStop(1, 'rgba(90,100,120,0.06)'); ctx.fillStyle = g; ctx.fillRect(0, 0, E.W, E.H);
    const hill = P.hillLine(E.W, 960);
    // bulutlar
    const cloud = (cx, cy, s, seed) => { const pts = []; const R = INK.rng(seed); for (let i = 0; i <= 60; i++) { const a = i / 60 * 6.283; const b = 1 + 0.18 * Math.abs(Math.sin(a * 4 + seed)); pts.push([cx + Math.cos(a) * 190 * s * b, cy + Math.sin(a) * 70 * s * b * (Math.sin(a) > 0 ? 0.6 : 1)]); } P.fillPts(ctx, pts, '#DAD6D0', 0.95); wash(ctx, pts, '#6E7482', 0.35, seed, { bleed: 3, blooms: 1 }); stroke(ctx, pts, { w: 2.6, closed: true, seed: seed + 1 }); };
    const ck = E.se(t, sn + 0.2, sn + 1.4, 'out');
    ctx.save(); ctx.globalAlpha *= ck;
    cloud(1250 + 20 * Math.sin(t * 0.3), 300, 1.3, 191); cloud(1600, 380, 0.9, 193);
    ctx.restore();
    // yağmur
    const rk = E.se(t, sn + 1.2, sn + 2.0);
    if (rk > 0) { const R = INK.rng(77); for (let i = 0; i < 60; i++) { const x = 1030 + R() * 720, ph = (t * 1.6 + R()) % 1, y = 360 + ph * 520; if (y > P.hillY(hill, x) - 10) continue; line(ctx, [x, y], [x - 8, y + 26], { w: 2, color: PAL.water, dry: false, alpha: 0.7 * rk, seed: 200 + i }); } }
    P.landscape(ctx, E.W, E.H, t, { hill, treeAt: [1700, P.hillY(hill, 1700) + 6] });
    DAMLA.draw(ctx, { x: 560, y: P.hillY(hill, 560) + 4, s: 1.35, view: 'front', expr: 'happy', look: [0.6, -0.4], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 0.35], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
    E.inkText(ctx, 'Sıradaki gözlem:', 700, 250, t, sn + 0.6, E.e('end'), { size: 48, weight: 400, align: 'center' });
    E.inkText(ctx, '2 · İklim ve Hava Olayları', 700, 330, t, sn + 1.2, E.e('end'), { size: 64, align: 'center' });
    F.endCard(ctx, t, E.s('end'), '1', 'Mevsimler Nasıl Oluşur?', 'FB.8.1.1');
  }
  E.scene({
    name: 'Sıra sende', concept: 'Görev', from: 'task', to: 'task', trFrom: [960, 540],
    draw(ctx, t) {
      task(ctx, t);
      DAMLA.draw(ctx, { x: 1740, y: 905, s: 0.9, view: 'q3', flip: true, expr: 'happy', look: [-0.8, -0.3], blink: E.blink(t, 9), squash: E.breath(t), t, seed: 7, arms: [[-1, 0.35], [1, 2.2]] });
    }
  });
  E.scene({
    name: 'Sıradaki', concept: 'Sonraki film', from: 'next', to: 'end', trFrom: [1250, 300],
    draw(ctx, t) { next(ctx, t); }
  });
})();

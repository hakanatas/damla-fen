// SAHNE 1 — Merak: Damla gövdesindeki "noktaları" sorar; taş, su ve balonun ortak yanı ne? (E1.1 açık uçlu soru)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F16;
  function desk(ctx) { // masa: sıcak ton + tahta yüzey
    ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
    const top = [[-50, 830], [1970, 822], [1970, 1130], [-50, 1130]];
    P.fillPts(ctx, top, '#E4D2B0', 0.9); INK.wash(ctx, top, '#8A6A45', 0.35, 401, { bleed: 2, blooms: 2 });
    stroke(ctx, [[-50, 830], [1970, 822]], { w: 3.4, seed: 402, taper: 0.02 });
    for (let i = 0; i < 5; i++) line(ctx, [-50 + i * 420, 870 + (i % 2) * 30], [300 + i * 420, 868 + (i % 2) * 30], { w: 1.2, alpha: 0.35, dry: false, seed: 403 + i });
  }
  F.desk = desk;
  E.scene({
    name: 'Merak', concept: 'Taş, su ve balonun ortak yanı ne?', from: 'title', to: 'wonder',
    draw(ctx, t) {
      const sh = E.s('hello'), sw = E.s('wonder');
      ctx.save();
      E.cam(ctx, { x: 960 + 20 * E.se(t, 0, sw + 6, 'sine'), y: 540, z: 1 + 0.03 * E.se(t, 0, sw + 6, 'sine') });
      desk(ctx);
      // ---- Damla
      const dx = 470, dy = 832;
      const wave = t > sh && t < sh + 2.2;
      const look = t < sw ? (t > sh + 1.6 ? [0.55, 0.35] : [0.1, 0.1]) : [0.8, 0.1];
      const expr = t < sh ? 'neutral' : (t < sw ? 'curious' : 'thinking');
      let arms = [[-1, 0.35], [1, 0.35]];
      if (wave) arms = [[-1, 0.35], [1, 2.4 + 0.35 * Math.sin(t * 9)]];
      else if (t > sh + 2.2 && t < sw) arms = [[-1, 0.35], [1, [40, -78]]]; // gövdesini gösterir
      else if (t >= sw) arms = [[-1, 0.3], [1, [30, -84]]];
      DAMLA.draw(ctx, { x: dx, y: dy, s: 1.75, view: 'front', expr, look, blink: E.blink(t, 2), squash: E.breath(t), arms, t, seed: 1, lean: t >= sw ? Math.sin(t * 1.2) * 0.03 : 0 });

      // ---- gövdedeki noktalara büyüteç (hello)
      const lk = Math.min(E.se(t, sh + 2.4, sh + 3.2, 'out'), 1 - E.se(t, sw - 0.2, sw + 0.6));
      if (lk > 0) E.layer(ctx, lk, c => {
        const bx = dx - 4, by = dy - 80 * 1.75;
        stroke(c, circlePts(bx, by, 64, 64, 50), { w: 3, closed: true, color: PAL.light, seed: 411 });
        const ix = 930, iy = 470, ir = 175 * P.pop(lk);
        INK.leader(c, [bx + 60, by - 22], [ix - ir * 0.95, iy + 40], { w: 2, bend: 0.1, dot: false });
        c.save(); c.beginPath(); c.arc(ix, iy, ir, 0, 7); c.clip();
        c.fillStyle = '#E7EFF2'; c.fillRect(ix - ir, iy - ir, 2 * ir, 2 * ir);
        F.field(c, 'liquid', [ix - ir, iy - ir, 2 * ir, 2 * ir], t, { r: 24, dr: 18, rows: 8, speed: 0.7, clip: false });
        c.restore();
        F.lensRing(c, ix, iy, ir, { ang: 0.75 });
        P.write(c, 'Bunlar ne?', ix + ir + 50, iy - 40, E.seg(t, sh + 3.2, sh + 4.2), { size: 56 });
        P.write(c, '(büyütülmüş hayali görünüm)', ix + ir + 50, iy + 20, E.seg(t, sh + 3.8, sh + 4.8), { size: 32, weight: 400, alpha: 0.7 });
      });

      // ---- taş, su, balon (wonder)
      const items = [
        { x: 1010, at: sw + 0.3, draw: (c, x) => F.stone(c, x, 828, 1.3), name: 'taş' },
        { x: 1330, at: sw + 1.1, draw: (c, x) => F.glass(c, x - 70, 628, 140, 196, 130), name: 'su' },
        { x: 1660, at: sw + 1.9, draw: (c, x) => { line(c, [x, 828], [x + 6, 760], { w: 1.6, dry: false }); F.balloon(c, x + 6, 760, 1.35, 1); }, name: 'balon' }
      ];
      items.forEach((it, i) => {
        const k = E.se(t, it.at, it.at + 0.6, 'out'); if (k <= 0) return;
        ctx.save(); ctx.translate(it.x, 828); ctx.scale(P.pop(k), P.pop(k)); ctx.translate(-it.x, -828); it.draw(ctx, it.x); ctx.restore();
        P.write(ctx, it.name, it.x, 890, E.seg(t, it.at + 0.4, it.at + 1.1), { size: 42, align: 'center' });
      });
      // ortak yan? — büyük soru işareti ve bağlantı çizgileri
      const qk = E.se(t, sw + 3.0, sw + 4.2);
      if (qk > 0) {
        ctx.save(); ctx.globalAlpha = 0.9;
        P.drawOn(ctx, P.arc(1335, 300, 44, Math.PI * 1.1, Math.PI * 2.45, 30).concat([[1350, 372], [1338, 398]]), qk, { w: 10 });
        if (qk > 0.95) INK.inkDot(ctx, 1338, 430, 8);
        ctx.restore();
        [[1010, 700], [1330, 600], [1640, 560]].forEach((p, i) => { const k = E.se(t, sw + 3.6 + i * 0.25, sw + 4.4 + i * 0.25); if (k > 0) { ctx.save(); ctx.globalAlpha = 0.6; INK.dashed(ctx, P.partial(P.bez([1335, 460], [(1335 + p[0]) / 2, 480], p, 30), k), { w: 2.4, on: 10, off: 8 }); ctx.restore(); } });
        P.write(ctx, 'ortak yanları ne?', 1335, 200, E.seg(t, sw + 4.2, sw + 5.2), { size: 50, align: 'center', color: '#8A4A10' });
      }
      ctx.restore();

      // ---- başlık kartı
      const t1 = E.e('title') + 1.2;
      E.inkText(ctx, 'Damla’nın Gözlem Defteri', 960, 205, t, 0.5, t1, { size: 92, font: 'Fraunces', weight: 600, align: 'center', rot: -0.01 });
      E.inkText(ctx, '16 · Maddenin Tanecikli Yapısı', 960, 285, t, 1.2, t1, { size: 56, align: 'center' });
      E.inkText(ctx, 'Fen Bilimleri · 5. sınıf · Ünite 5', 960, 338, t, 1.8, t1, { size: 32, weight: 400, align: 'center', alpha: 0.7 });
      if (t > 1 && t < t1) { ctx.save(); ctx.globalAlpha = Math.min(E.se(t, 1, 2), 1 - E.se(t, t1 - 0.6, t1)); P.drawOn(ctx, P.bez([640, 230], [960, 240], [1280, 226], 30), E.se(t, 1, 2.2), { w: 3, color: PAL.water }); ctx.restore(); }
    }
  });
})();

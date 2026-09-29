// SAHNE 7 — Gözlemlenmemiş duruma ilişkin tahmin (ç) ve tahminin geçerliğini sorgulama (d)
// Serin bir günde ıslak çamaşır kurur mu? Ölçüt: buharlaşma her sıcaklıkta olur. Test: iki bez, serin/ılık yer, süre karşılaştırması.
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F19;
  function cloth(ctx, x, y, w, h, wet, t, seed) {
    const sw = Math.sin(t * 1.3 + seed) * 4;
    const c = [[x - w / 2, y], [x + w / 2, y], [x + w / 2 + sw, y + h], [x + w / 4 + sw, y + h - 12], [x + sw, y + h + 4], [x - w / 4 + sw, y + h - 10], [x - w / 2 + sw, y + h], [x - w / 2, y]];
    P.fillPts(ctx, c, '#F4EEDF'); wash(ctx, c, PAL.water, 0.18 + 0.3 * wet, seed, { bleed: 1.2, blooms: 1 }); stroke(ctx, c, { w: 2.6, closed: true, seed: seed + 1 });
    [x - w / 2 + 10, x + w / 2 - 10].forEach((px, i) => { const pg = [[px - 5, y - 16], [px + 5, y - 16], [px + 4, y + 14], [px - 4, y + 14], [px - 5, y - 16]]; P.fillPts(ctx, pg, '#C9A777'); stroke(ctx, pg, { w: 1.8, closed: true, dry: false, seed: seed + 5 + i }); });
    // drips
    if (wet > 0.3) for (let i = 0; i < 3; i++) { const u = (t * 0.6 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 0.7 * (1 - u) * wet; ctx.fillStyle = PAL.water; ctx.beginPath(); ctx.ellipse(x - w / 3 + i * w / 3 + sw, y + h + 10 + u * 120, 4, 6, 0, 0, 7); ctx.fill(); ctx.restore(); }
  }
  function vapor(ctx, x, y, w, k, t, seed, n = 10) { const r = rng(seed); for (let i = 0; i < n; i++) { const x0 = x - w / 2 + r() * w, u = (t * (0.18 + 0.1 * r()) + r()) % 1; ctx.save(); ctx.globalAlpha = k * 0.6 * Math.sin(u * Math.PI); stroke(ctx, circlePts(x0 + Math.sin(u * 5 + i) * 10, y - u * 150, 6, 6, 12), { w: 1.6, closed: true, dry: false, color: PAL.water }); ctx.restore(); } }
  function miniThermo(ctx, x, y, T, lab) {
    const tube = [[x - 9, y - 110], [x + 9, y - 110], [x + 9, y], [x - 9, y], [x - 9, y - 110]]; P.fillPts(ctx, tube, PAL.white); stroke(ctx, tube, { w: 2.4, closed: true, seed: 2701 });
    const ly = y - 8 - T / 40 * 95; P.fillPts(ctx, [[x - 4, y], [x - 4, ly], [x + 4, ly], [x + 4, y]], F.HEAT, 0.9);
    P.fillPts(ctx, circlePts(x, y + 14, 16, 16, 20), F.HEAT, 0.9); stroke(ctx, circlePts(x, y + 14, 16, 16, 20), { w: 2.4, closed: true, seed: 2702 });
    if (lab) lab.split('|').forEach((l, i) => INK.label(ctx, l, x, y + 72 + i * 40, { size: 34, weight: 700, color: F.HEAT, align: 'center' }));
  }
  E.scene({
    name: 'Tahmin', concept: 'Gözlemlenmemiş durum için tahmin ve geçerliği sorgulama', from: 'predict', to: 'validity', trFrom: [500, 400],
    draw(ctx, t) {
      const sp = E.s('predict'), sg = E.s('guess2'), sv = E.s('validity');
      // cool overcast day
      const sky = ctx.createLinearGradient(0, 0, 0, E.H); sky.addColorStop(0, 'rgba(120,145,165,0.35)'); sky.addColorStop(1, 'rgba(120,145,165,0.05)'); ctx.fillStyle = sky; ctx.fillRect(0, 0, E.W, E.H);
      [[300, 210, 130], [620, 180, 110]].forEach(([x, y, r], i) => { const c = INK.wobble(circlePts(x + Math.sin(t * 0.2 + i) * 20, y, r, r * 0.42, 40), 10, 2710 + i); P.fillPts(ctx, c, '#F4F1EA', 0.9); wash(ctx, c, '#9FB0BC', 0.35, 2712 + i); stroke(ctx, c, { w: 2.4, closed: true, seed: 2714 + i }); });
      const ground = [[-20, 880], [960, 868], [1940, 884], [1940, 1100], [-20, 1100]]; P.fillPts(ctx, ground, '#E9E3D2'); wash(ctx, ground, PAL.life, 0.22, 2720); stroke(ctx, ground.slice(0, 3), { w: 3.4, seed: 2721 });
      // clothesline
      line(ctx, [180, 890], [186, 330], { w: 7, seed: 2722 }); line(ctx, [880, 890], [874, 330], { w: 7, seed: 2723 });
      const rope = P.bez([186, 350], [530, 390], [874, 350], 30); stroke(ctx, rope, { w: 2.4, seed: 2724 });
      const dry = E.se(t, sg + 2, sv + 8);
      cloth(ctx, 420, 372, 170, 200, 1 - 0.6 * dry, t, 2730); cloth(ctx, 660, 372, 150, 170, 1 - 0.6 * dry, t, 2740);
      if (t > sg + 1) { vapor(ctx, 420, 360, 160, E.se(t, sg + 1, sg + 2), t, 2750); vapor(ctx, 660, 360, 140, E.se(t, sg + 1, sg + 2), t, 2760, 7); }
      miniThermo(ctx, 950, 700, 12, '12 °C|serin');
      // Damla
      DAMLA.draw(ctx, {
        x: 640, y: 880, s: 1.2, view: 'q3', t, seed: 6, blink: E.blink(t, 17), squash: E.breath(t), talk: E.talk(t),
        expr: t > sv ? 'determined' : (t > sg ? 'happy' : 'thinking'), look: t > sg ? [0.8, -0.2] : [-0.3, -0.8],
        arms: t < sg ? [[-1, 0.3], [1, [30, -86]]] : [[-1, 0.4], [1, 2.2 + Math.sin(t * 2) * 0.08]]
      });
      // question bubble
      const qk = E.se(t, sp + 1.5, sp + 2.1, 'out') * (1 - E.se(t, sg, sg + 0.5));
      if (qk > 0) E.layer(ctx, Math.min(1, qk * 2), c => {
        P.bubble(c, 1390, 420, 760, 280, [820, 640], Math.min(1, qk * 1.2), 7);
        P.write(c, 'Serin bir günde', 1390, 390, E.seg(t, sp + 2.3, sp + 3.3), { size: 50, align: 'center' });
        P.write(c, 'ıslak çamaşır kurur mu?', 1390, 460, E.seg(t, sp + 3.1, sp + 4.4), { size: 50, align: 'center' });
        INK.label(c, 'gözlemlemedim', 1390, 520, { size: 30, align: 'center', alpha: 0.6 * E.seg(t, sp + 4.5, sp + 5.3) });
      });
      // prediction card
      const gk = E.se(t, sg + 0.2, sg + 0.9, 'out');
      if (gk > 0) {
        ctx.save(); ctx.translate((1 - gk) * 900, 0);
        F.card(ctx, 1000, 170, 820, 300, { fill: '#F6E7B8', seed: 2770 });
        P.write(ctx, 'Tahminim:', 1040, 240, E.seg(t, sg + 0.8, sg + 1.6), { size: 46, color: '#8A4A10' });
        P.write(ctx, 'Kurur, ama daha yavaş.', 1270, 240, E.seg(t, sg + 1.4, sg + 2.8), { size: 46 });
        P.write(ctx, 'Ölçütüm:', 1040, 330, E.seg(t, sg + 3.0, sg + 3.8), { size: 40, color: '#8A4A10' });
        P.write(ctx, 'Buharlaşma her', 1230, 330, E.seg(t, sg + 3.6, sg + 4.6), { size: 40 });
        P.write(ctx, 'sıcaklıkta olur.', 1230, 390, E.seg(t, sg + 4.4, sg + 5.4), { size: 40 });
        P.write(ctx, 'Geçerli mi?', 1780, 440, E.seg(t, sv + 0.6, sv + 1.6), { size: 38, color: F.RED, align: 'right' });
        ctx.restore();
      }
      // validity test design
      const vk = E.se(t, sv + 1.2, sv + 2.0, 'out');
      if (vk > 0) E.layer(ctx, vk, c => {
        F.card(c, 1000, 510, 820, 380, { seed: 2780 });
        [[1200, 'serin yer', 12, sv + 2.0], [1620, 'ılık yer', 28, sv + 3.2]].forEach(([x, lab, T, at], i) => {
          const k = E.se(t, at, at + 0.8, 'out'); if (k <= 0) return;
          c.save(); c.globalAlpha = k;
          line(c, [x - 130, 612], [x + 130, 612], { w: 2.4, seed: 2781 + i });
          cloth(c, x - 20, 616, 130, 110, 1, t, 2790 + i * 10);
          miniThermo(c, x + 110, 740, T, null);
          INK.label(c, T + ' °C', x + 110, 800, { size: 30, weight: 700, color: F.HEAT, align: 'center' });
          P.icon.clock(c, x - 150, 780, 0.45, t * (i ? 1.6 : 0.8));
          INK.label(c, lab, x - 20, 860, { size: 36, weight: 700, align: 'center' });
          c.restore();
        });
        P.write(c, 'Test: kuruma sürelerini karşılaştır', 1410, 572, E.seg(t, sv + 4.4, sv + 5.8), { size: 38, align: 'center', color: '#8A4A10' });
        INK.label(c, 'aynı bez, aynı ıslaklık', 1400, 862, { size: 28, align: 'center', alpha: 0.75 * E.se(t, sv + 5.8, sv + 6.6) });
      });
    }
  });
})();

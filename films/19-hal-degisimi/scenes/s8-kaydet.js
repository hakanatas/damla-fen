// SAHNE 8 — Kaydet + Sıra sende (açık uçlu görev: soğuk şişenin dışının ıslanması) + sonraki gözlem: ısı iletimi + bitiş kartı
(function () {
  const { PAL, line, stroke, circlePts, wash, rng } = INK;
  const F = F19, RED = F.RED;
  const ITEMS = [
    'Isı alan ya da veren madde hâl değiştirebilir.',
    'Erime, donma ve kaynamada sıcaklık sabit kalır.',
    'Buz 0 °C’de erir; su ≈ 100 °C’de kaynar.',
    'Buharlaşma her sıcaklıkta olur; kaynama belli bir sıcaklıkta.',
    'Gözleme dayalı önerme: ölç, kaydet, tekrarla.'
  ];
  function bottle(ctx, x, y, s, k, t) {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const b = [[-40, 120], [-42, -30], [-18, -70], [-16, -120], [16, -120], [18, -70], [42, -30], [40, 120], [-40, 120]];
    P.fillPts(ctx, b, '#DDEBF0', 0.9); wash(ctx, b, PAL.water, 0.3, 2801, { bleed: 1 }); stroke(ctx, b, { w: 3, closed: true, seed: 2802 });
    P.fillPts(ctx, [[-18, -140], [18, -140], [18, -118], [-18, -118]], F.HEAT, 0.8);
    const r = rng(2803); for (let i = 0; i < 22; i++) { const kk = E.clamp(k * 1.6 - r() * 0.6); const px = (r() - 0.5) * 70, py = -20 + r() * 130; if (kk > 0) { ctx.fillStyle = 'rgba(46,106,140,0.7)'; ctx.beginPath(); ctx.ellipse(px, py, 3.5 * kk, 5 * kk, 0, 0, 7); ctx.fill(); } }
    ctx.restore();
  }
  E.scene({
    name: 'Kaydet', concept: 'Bulguları kaydetme ve Sıra sende', from: 'record', to: 'yourturn', trFrom: [960, 540],
    draw(ctx, t) {
      const sr = E.s('record'), sy = E.s('yourturn');
      ctx.fillStyle = 'rgba(138,106,69,0.16)'; ctx.fillRect(0, 0, E.W, E.H);
      P.notebook(ctx, 150, 70, 1620, 850);
      P.write(ctx, 'Gözlem Defteri · Hâl Değişimi', 290, 180, E.seg(t, sr + 0.3, sr + 1.5), { size: 62 });
      if (t > sr + 1.5) P.drawOn(ctx, P.bez([286, 200], [700, 212], [1100, 196], 30), E.se(t, sr + 1.5, sr + 2.0), { w: 3, color: PAL.light });
      const la = 1 - E.se(t, sy - 0.2, sy + 0.5);
      if (la > 0) E.layer(ctx, la, c => {
        ITEMS.forEach((txt, i) => {
          const at = sr + 1.5 + i * 1.3, y = 300 + i * 96;
          const box = [[300, y - 44], [350, y - 46], [352, y + 4], [302, y + 6], [300, y - 44]];
          if (t > at - 0.3) stroke(c, box, { w: 2.4, closed: true, seed: 2810 + i });
          P.check(c, 324, y - 22, 46, E.se(t, at + 1.0, at + 1.4), { w: 6 });
          P.write(c, txt, 385, y, E.seg(t, at, at + 1.2), { size: 46 });
        });
        const wy = 300 + 5 * 96, wat = sr + 1.5 + 5 * 1.3;
        P.write(c, '⚠  Isı kaynaklarını yalnızca bir yetişkinle kullan!', 300, wy, E.seg(t, wat, wat + 1.4), { size: 46, color: RED });
      });
      // Sıra sende
      const yk = E.se(t, sy, sy + 0.7);
      if (yk > 0) E.layer(ctx, yk, c => {
        bottle(c, 520, 560, 1.7, E.se(t, sy + 1, sy + 6), t);
        INK.label(c, 'buzdolabından yeni çıktı', 520, 830, { size: 30, align: 'center', alpha: 0.7 });
        P.write(c, 'Sıra sende!', 820, 330, E.seg(t, sy + 0.4, sy + 1.4), { size: 72, color: '#8A4A10' });
        P.write(c, 'Soğuk şişenin dışı', 820, 440, E.seg(t, sy + 1.2, sy + 2.4), { size: 54 });
        P.write(c, 'neden ıslanır?', 820, 510, E.seg(t, sy + 2.2, sy + 3.2), { size: 54 });
        [['1', 'Önce tahmin et.'], ['2', 'Sonra gözlemle.'], ['3', 'Defterine kaydet.']].forEach(([n, s], i) => {
          const at = sy + 3.6 + i * 0.9, k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
          const y = 620 + i * 80; c.save(); c.translate(850, y - 16); c.scale(P.pop(k), P.pop(k)); P.fillPts(c, circlePts(0, 0, 26, 26, 24), PAL.light, 0.85); stroke(c, circlePts(0, 0, 26, 26, 24), { w: 2.2, closed: true }); c.font = '700 32px Kalam'; c.textAlign = 'center'; c.fillStyle = PAL.white; c.fillText(n, 0, 11); c.restore();
          P.write(c, s, 900, y, E.seg(t, at + 0.2, at + 1.0), { size: 46 });
        });
      });
      const cheer = t > sy + 7.5;
      DAMLA.draw(ctx, {
        x: 1640, y: 1040, s: 1.1, view: 'q3', flip: true, expr: cheer ? 'happy' : (t > sy ? 'curious' : 'neutral'), look: [-0.7, 0.2], blink: E.blink(t, 21), squash: E.breath(t), t, talk: E.talk(t), seed: 5,
        arms: t > sy ? [[-1, 0.4], [1, 2.3 + Math.sin(t * 2) * 0.1]] : [[-1, 1.1], [1, 1.4 + Math.sin(t * 9) * 0.12]], prop: t > sy ? null : 'notebook'
      });
    }
  });
  E.scene({
    name: 'Sıradaki: Isı iletimi', concept: 'Sonraki konu ve bitiş', from: 'next', to: 'end', trFrom: [960, 600],
    draw(ctx, t) {
      const sn = E.s('next'), se = E.s('end');
      ctx.fillStyle = 'rgba(138,106,69,0.12)'; ctx.fillRect(0, 0, E.W, E.H);
      // table + mug with a metal and a wooden spoon (teaser)
      const tb = [[200, 800], [1720, 794], [1730, 840], [190, 846], [200, 800]]; P.fillPts(ctx, tb, '#E3D3B3'); wash(ctx, tb, '#8A6A45', 0.4, 2850); stroke(ctx, tb, { w: 3, closed: true, seed: 2851 });
      const mx = 1180, my = 800;
      const mug = [[mx - 110, my - 230], [mx + 110, my - 230], [mx + 100, my], [mx - 100, my], [mx - 110, my - 230]];
      // spoons behind the front wall
      line(ctx, [mx - 40, my - 150], [mx - 140, my - 370], { w: 12, color: '#9AA3A8', seed: 2852, taper: 0.02 }); line(ctx, [mx - 40, my - 150], [mx - 140, my - 370], { w: 3, seed: 2853, dry: false, alpha: 0.6 });
      line(ctx, [mx + 40, my - 150], [mx + 130, my - 370], { w: 14, color: '#B08A5A', seed: 2854, taper: 0.02 }); line(ctx, [mx + 40, my - 150], [mx + 130, my - 370], { w: 3, seed: 2855, dry: false, alpha: 0.6 });
      P.fillPts(ctx, mug, '#F2E6D2'); wash(ctx, mug, F.HEAT, 0.35, 2856); stroke(ctx, mug, { w: 3.4, closed: true, seed: 2857 });
      stroke(ctx, P.arc(mx + 120, my - 120, 50, -1.4, 1.4, 20, 60), { w: 8, seed: 2858 });
      F.steam(ctx, mx, my - 240, 140, 110, 0.8, t, 2859);
      const q = E.se(t, sn + 1.5, sn + 3);
      if (q > 0) { INK.label(ctx, 'metal', mx - 230, my - 390, { size: 40, weight: 700, alpha: q, align: 'center' }); INK.label(ctx, 'tahta', mx + 230, my - 390, { size: 40, weight: 700, alpha: q, align: 'center' }); INK.label(ctx, '?', mx, my - 380, { size: 90, weight: 700, color: '#8A4A10', alpha: q, align: 'center' }); }
      DAMLA.draw(ctx, { x: 600, y: 800, s: 1.35, view: 'q3', expr: 'curious', look: [0.8, -0.4], blink: E.blink(t, 23), squash: E.breath(t), t, talk: E.talk(t), seed: 1, arms: [[-1, 0.35], [1, 2.3 + 0.2 * Math.sin(t * 3)]] });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.6, se + 0.2, { size: 48, align: 'center', weight: 400 });
      E.inkText(ctx, '20 · Isıyı İleten, İletmeyen', 960, 270, t, sn + 1.2, se + 0.2, { size: 70, align: 'center' });
      const ek = E.se(t, se, se + 0.8);
      if (ek > 0) E.layer(ctx, ek, c => {
        c.fillStyle = PAL.paper; c.globalAlpha = 0.92; c.fillRect(0, 0, E.W, E.H); c.globalAlpha = 1;
        INK.label(c, 'Damla’nın Gözlem Defteri', 960, 430, { font: 'Fraunces', weight: 600, size: 96, align: 'center', rot: -0.01 });
        INK.label(c, '19 · Buzdan Buhara: Hâl Değişimi', 960, 515, { size: 56, weight: 700, align: 'center' });
        P.drawOn(c, P.bez([620, 545], [960, 556], [1300, 540], 30), E.se(t, se + 0.3, se + 1.2), { w: 3, color: PAL.light });
        INK.label(c, 'Fen Bilimleri · 5. sınıf · FB.5.5.4 · Türkiye Yüzyılı Maarif Modeli', 960, 640, { size: 32, align: 'center', alpha: 0.7 });
        INK.label(c, 'Hazırlayan: Hakan Ataş', 960, 700, { size: 32, align: 'center', alpha: 0.7 });
        DAMLA.draw(c, { x: 960, y: 960, s: 0.9, view: 'front', expr: 'happy', t, seed: 1, arms: [[-1, 0.4], [1, 2.4 + 0.3 * Math.sin(t * 7)]] });
      });
    }
  });
})();

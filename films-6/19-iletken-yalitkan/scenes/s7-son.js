// SAHNE 8 — Sıra sende (performans görevi: poster/afiş) + sıradaki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  function poster(ctx, x, y, t, k0) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(0.03);
    CK.card(ctx, -230, -290, 460, 560, { seed: 510, fill: '#FBF8F1' });
    INK.label(ctx, 'İletken mi?', -110, -226, { size: 34, weight: 700, align: 'center', color: '#8A4A10' });
    INK.label(ctx, 'Yalıtkan mı?', 110, -226, { size: 34, weight: 700, align: 'center', color: PAL.water });
    line(ctx, [0, -260], [0, 240], { w: 2, dry: false, alpha: 0.6 });
    ['nail', 'foil', 'copper'].forEach((id, i) => { if (t > k0 + i * 0.4) F19.sample(ctx, id, -110, -130 + i * 110, 0.8); });
    ['ruler', 'wood', 'eraser'].forEach((id, i) => { if (t > k0 + 1.2 + i * 0.4) F19.sample(ctx, id, 110, -130 + i * 110, 0.8); });
    ctx.restore();
  }
  E.scene({
    name: 'Sıra sende', concept: 'Performans görevi ve sonraki film', from: 'yourturn', to: 'end', trFrom: [960, 540],
    draw(ctx, t) {
      const sy = E.s('yourturn'), sn = E.s('next');
      ctx.save();
      CK.table(ctx, 840);
      const ky = Math.min(E.se(t, sy + 0.1, sy + 0.8, 'out'), 1 - E.se(t, sn - 0.2, sn + 0.5));
      if (ky > 0) E.layer(ctx, ky, c => {
        CK.card(c, 180, 150, 1000, 640, { seed: 200 });
        P.write(c, 'Sıra sende!', 260, 260, E.seg(t, sy + 0.4, sy + 1.4), { size: 76, color: '#8A4A10' });
        const tasks = [['Grubunla görevleri paylaş.', sy + 1.4], ['Evdeki maddeleri devrende test et.', sy + 2.8], ['Sonuçları tabloya kaydet.', sy + 4.2], ['İletken-yalıtkan posteri hazırla.', sy + 5.6]];
        tasks.forEach(([txt, at], i) => {
          const y = 370 + i * 88, k = E.se(t, at, at + 0.6); if (k <= 0) return;
          INK.label(c, String(i + 1) + '.', 270, y, { size: 44, weight: 700, alpha: k });
          P.write(c, txt, 330, y, E.seg(t, at + 0.1, at + 1.3), { size: 42 });
        });
        P.write(c, '⚠ Yalnızca pil · yetişkin eşliğinde', 260, 740, E.seg(t, sy + 7.0, sy + 8.0), { size: 38, color: CK.RED });
        poster(c, 1450, 470, t, sy + 5.8);
      });
      // sıradaki film: uzun ince tel ve sönük ampul
      const kn = E.se(t, sn + 0.3, sn + 1.0);
      if (kn > 0) E.layer(ctx, kn, c => {
        const h = CK.holder(c, 600, 800, 0.9);
        const so = CK.socket(c, 1000, 840, 1);
        CK.wire(c, h.pos, so.a, { sag: 30 });
        const pts = []; for (let i = 0; i <= 160; i++) { const u = i / 160; pts.push([1100 + u * 520, 800 + Math.sin(u * Math.PI * 14) * 18]); }
        CK.wire(c, so.b, [1100, 800], { sag: 10 });
        stroke(c, pts, { w: 2.6, color: '#8C877E', dry: false, taper: 0.01 });
        CK.wire(c, [1620, 800], h.neg, { c: [1100, 470], color: '#3A3842' });
        CK.bulb(c, so.top[0], so.top[1] + 6, 1, 0.3 + 0.25 * Math.sin(t * 1.5), t);
        INK.label(c, '?', 1360, 740, { size: 80, weight: 700, color: CK.AMBD, align: 'center' });
      });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.8, E.s('end') + 0.5, { size: 46, align: 'center', weight: 400 });
      E.inkText(ctx, '20 · Elektriksel Direnç ve Reosta', 960, 270, t, sn + 1.4, E.s('end') + 0.5, { size: 64, align: 'center' });
      DAMLA.draw(ctx, { x: 1760, y: 842, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 2.4 + 0.3 * Math.sin(t * 7)], [1, 0.4]] });
      ctx.restore();
      CK.endCard(ctx, t, 19, 'İletken mi, Yalıtkan mı?', 'FB.6.6.1');
    }
  });
})();

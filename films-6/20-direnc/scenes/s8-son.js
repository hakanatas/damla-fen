// SAHNE 8 — Sıra sende (basit reosta: kalem ucu; V diyagramı raporu) + sıradaki film + bitiş
(function () {
  const { PAL, line, stroke, circlePts, wash } = INK;
  function leadRheo(ctx, x, y, t) {
    const lead = CK.rect(x - 200, y - 5, 400, 10); P.fillPts(ctx, lead, '#4A4850'); stroke(ctx, lead, { w: 1.6, closed: true, dry: false });
    F19c(ctx, [x - 206, y], 1, '#2E6A8C');
    const px = x - 150 + 300 * (0.5 + 0.5 * Math.sin(t * 1.2));
    F19c(ctx, [px, y - 4], -1, '#3A3842', true);
    INK.label(ctx, 'kalem ucu (grafit)', x, y + 60, { size: 34, align: 'center', weight: 700 });
  }
  // küçük kıskaç
  function F19c(ctx, p, dir, col, up) {
    ctx.save(); ctx.translate(p[0], p[1]); if (up) ctx.rotate(Math.PI / 2 * dir); ctx.scale(dir * 0.8, 0.8);
    const sl = CK.rect(-70, -12, 40, 24); P.fillPts(ctx, sl, col, 0.9); stroke(ctx, sl, { w: 2, closed: true, dry: false });
    const j = [[-30, -10], [0, -2], [0, 2], [-30, 10]]; P.fillPts(ctx, j, '#B8B2A6'); stroke(ctx, j.concat([j[0]]), { w: 2, dry: false });
    ctx.restore();
  }
  function leaf(ctx, x, y, s, a, seed) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.scale(s, s);
    const l = P.bez([0, 0], [60, -50], [140, 0], 20).concat(P.bez([140, 0], [60, 50], [0, 0], 20));
    wash(ctx, l, PAL.life, 0.6, seed, { bleed: 1, blooms: 0 }); stroke(ctx, l, { w: 2.4, closed: true, seed: seed + 1 }); line(ctx, [0, 0], [130, 0], { w: 1.6, dry: false, alpha: 0.6 });
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
        CK.card(c, 180, 140, 1100, 660, { seed: 200 });
        P.write(c, 'Sıra sende!', 260, 250, E.seg(t, sy + 0.4, sy + 1.4), { size: 76, color: '#8A4A10' });
        const tasks = [['Kalem ucuyla basit bir reosta kur.', sy + 1.4], ['Bir kıskacı kaydır; parlaklığı gözle.', sy + 2.8], ['Her konumu tabloya kaydet.', sy + 4.2], ['Verilerini V diyagramıyla raporla.', sy + 5.6]];
        tasks.forEach(([txt, at], i) => {
          const y = 360 + i * 88, k = E.se(t, at, at + 0.6); if (k <= 0) return;
          INK.label(c, String(i + 1) + '.', 270, y, { size: 44, weight: 700, alpha: k });
          P.write(c, txt, 330, y, E.seg(t, at + 0.1, at + 1.3), { size: 42 });
        });
        P.write(c, '⚠ Yalnızca pil · yetişkin eşliğinde', 260, 750, E.seg(t, sy + 7.0, sy + 8.0), { size: 38, color: CK.RED });
        leadRheo(c, 1560, 470, t);
      });
      const kn = E.se(t, sn + 0.3, sn + 1.0);
      if (kn > 0) E.layer(ctx, kn, c => {
        [[700, 760, 1.2, -0.6], [820, 700, 1.0, -1.3], [1000, 780, 1.4, -0.2], [1180, 720, 1.1, -2.2], [1300, 790, 0.9, -0.9]].forEach(([x, y, s, a], i) => leaf(c, x, y, s, a, 700 + i * 5));
      });
      E.inkText(ctx, 'Sıradaki gözlem:', 960, 190, t, sn + 0.8, E.s('end') + 0.5, { size: 46, align: 'center', weight: 400 });
      E.inkText(ctx, '21 · Canlıların Zenginliği: Biyoçeşitlilik', 960, 270, t, sn + 1.4, E.s('end') + 0.5, { size: 64, align: 'center' });
      DAMLA.draw(ctx, { x: 1760, y: 842, s: 1.0, view: 'q3', flip: true, expr: 'happy', look: [-0.6, -0.3], blink: E.blink(t, 12), squash: E.breath(t), t, seed: 1, arms: [[-1, 2.4 + 0.3 * Math.sin(t * 7)], [1, 0.4]] });
      ctx.restore();
      CK.endCard(ctx, t, 20, 'Elektriksel Direnç ve Reosta', 'FB.6.6.2 · FB.6.6.3');
    }
  });
})();

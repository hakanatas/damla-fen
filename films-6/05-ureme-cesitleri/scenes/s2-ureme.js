// SAHNE 2 — Üreme tanımı + beyin fırtınası (TYMM: açık fikirlilikle beyin fırtınası, özellikleri belirleme)
(function () {
  const { PAL, line, stroke, circlePts } = INK;
  const F = F05;
  const WORDS = [
    { w: 'iki ata', p: [520, 360], g: 0 }, { w: 'tek ata', p: [1420, 330], g: 1 }, { w: 'eşey hücresi', p: [470, 620], g: 0 },
    { w: 'tomurcuk', p: [1450, 610], g: 1 }, { w: 'kopan parça', p: [960, 740], g: 1 }
  ];
  E.scene({
    name: 'Üreme', concept: 'Üreme; beyin fırtınası', from: 'def', to: 'storm', trFrom: [960, 540],
    draw(ctx, t) {
      const sd = E.s('def'), ss = E.s('storm');
      // merkez kavram
      const kc = E.se(t, sd + 0.3, sd + 1.1, 'out');
      const toTop = E.se(t, ss + 6.2, ss + 7.4);
      const cy = E.lerp(470, 230, toTop), cs = E.lerp(1, 0.75, toTop);
      if (kc > 0) {
        const r = 170 * P.pop(kc) * cs; const cp = INK.wobble(circlePts(960, cy, r, r * 0.62, 60), 3, 5);
        P.fillPts(ctx, cp, '#FBF8F1'); INK.wash(ctx, cp, F.LIFE, 0.22, 21, { bleed: 2, blooms: 1 }); stroke(ctx, cp, { w: 3.4, closed: true, seed: 22 });
        P.write(ctx, 'ÜREME', 960, cy + 26 * cs, E.seg(t, sd + 0.6, sd + 1.6), { size: 84 * cs, align: 'center', font: 'Fraunces', weight: 600 });
      }
      // tanım: ata → yavru örnekleri
      const kd = Math.min(E.se(t, sd + 2.0, sd + 3.0), 1 - E.se(t, ss - 0.4, ss + 0.4));
      if (kd > 0) E.layer(ctx, kd, c => {
        F.hen(c, 300, 820, 0.8, t); F.chick(c, 520, 820, 0.9, t, 2); F.chick(c, 590, 822, 0.8, t, 3);
        P.arrow(c, [370, 700], [470, 740], E.se(t, sd + 2.6, sd + 3.4), { w: 3, bend: 20 });
        F.strawberry(c, 1320, 820, 0.8, 1, 1, t, { run: 250 });
        P.write(c, 'yeni canlılar', 440, 640, E.seg(t, sd + 3.2, sd + 4.2), { size: 38, align: 'center', color: F.LIFE_D });
        P.write(c, 'yeni canlılar', 1450, 640, E.seg(t, sd + 3.4, sd + 4.4), { size: 38, align: 'center', color: F.LIFE_D });
        const kn = E.se(t, sd + 5.0, sd + 6.0);
        if (kn > 0) {
          P.write(c, 'neslin devamı', 960, 700, kn, { size: 52, align: 'center' });
          const ring = P.arc(960, 690, 150, Math.PI * 0.95, Math.PI * 2.75, 40, 70);
          P.drawOn(c, ring, kn, { w: 3, color: F.LIFE });
          if (kn > 0.98) INK.arrowHead(c, ring[ring.length - 3], ring[ring.length - 1], 14, { w: 3, color: F.LIFE });
        }
      });
      // beyin fırtınası kelimeleri
      const sort = E.se(t, ss + 6.4, ss + 8.0);
      const gh = E.se(t, ss + 6.0, ss + 6.8);
      if (gh > 0) {
        [['1. grup', 560], ['2. grup', 1360]].forEach(([g, x], i) => {
          const card = [[x - 250, 420], [x + 250, 414], [x + 256, 860], [x - 246, 866], [x - 250, 420]];
          E.layer(ctx, gh, c => { P.fillPts(c, card, '#FBF8F1', 0.9); INK.wash(c, card, i ? F.LIFE : '#8E6A8C', 0.12, 30 + i, { bleed: 2, blooms: 0 }); stroke(c, card, { w: 2.6, closed: true, seed: 31 + i }); P.write(c, g, x, 490, E.seg(t, ss + 6.2, ss + 7.0), { size: 50, align: 'center' }); });
        });
        const k = E.se(t, ss + 6.3, ss + 7.1);
        if (k > 0) { line(ctx, [900, cy + 110 * cs * 0.62 + 10], [640, 410], { w: 2.4, alpha: k, seed: 34 }); line(ctx, [1020, cy + 110 * cs * 0.62 + 10], [1280, 404], { w: 2.4, alpha: k, seed: 35 }); }
      }
      const slots = [[560, 590], [1360, 580], [560, 690], [1360, 680], [1360, 780]];
      WORDS.forEach((wd, i) => {
        const at = ss + 1.2 + i * 1.0; const k = E.se(t, at, at + 0.5, 'out'); if (k <= 0) return;
        const p = E.mix(wd.p, slots[i], sort);
        const r = [wd.p[0] - 0, wd.p[1]];
        ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(P.pop(k), P.pop(k)); ctx.rotate(Math.sin(i * 3) * 0.04 * (1 - sort));
        const sz = 46; ctx.font = `700 ${sz}px Kalam`; const w = ctx.measureText(wd.w).width;
        const tagP = F.rrect(0, -14, w + 50, 70, 30, 6);
        P.fillPts(ctx, tagP, wd.g ? '#E4EBCB' : '#E9DDEA', 0.95); stroke(ctx, tagP, { w: 2.2, closed: true, seed: 40 + i, dry: false });
        ctx.fillStyle = PAL.ink; ctx.textAlign = 'center'; ctx.fillText(wd.w, 0, 2);
        ctx.restore();
      });
      // Damla
      DAMLA.draw(ctx, { x: 1740, y: 900, s: 0.95, view: 'q3', flip: true, expr: t > ss + 6 ? 'happy' : 'thinking', look: [-0.6, -0.3], blink: E.blink(t, 4), squash: E.breath(t), t, seed: 2,
        arms: t > ss ? [[-1, 0.4], [1, 1.2 + 0.1 * Math.sin(t * 8)]] : [[-1, 0.35], [1, [28, -86]]], prop: t > ss ? 'notebook' : null });
    }
  });
})();
